<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\RegistrationToken;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegistrationFlowController extends Controller
{
    /**
     * Choose account type and generate one-time slug token
     */
    public function selectType(): Response
    {
        return Inertia::render('auth/RegisterSelect');
    }

    /**
     * Generate one-time slug token and redirect to /registrasi?id={token}
     */
    public function generateToken(Request $request): RedirectResponse
    {
        $request->validate([
            'type' => 'required|in:user,business_owner',
        ]);

        $type = $request->type;
        $slug = Str::lower($type === 'business_owner' ? 'mitra' : 'wisatawan');
        $randomHex = bin2hex(random_bytes(16));
        $timestamp = time();
        $tokenString = "{$slug}-{$timestamp}-{$randomHex}";

        $tokenRecord = RegistrationToken::create([
            'token' => $tokenString,
            'type' => $type,
            'expires_at' => now()->addMinutes(30),
            'is_used' => false,
        ]);

        return redirect()->route('registrasi.show', ['id' => $tokenRecord->token]);
    }

    /**
     * Show registration page based on token
     */
    public function show(Request $request): Response|RedirectResponse
    {
        $tokenId = $request->query('id');

        if (!$tokenId) {
            return redirect()->route('registrasi.select')->with('error', 'Token registrasi diperlukan.');
        }

        $token = RegistrationToken::where('token', $tokenId)
            ->where('is_used', false)
            ->where('expires_at', '>', now())
            ->first();

        if (!$token) {
            return Inertia::render('auth/RegisterInvalidToken', [
                'message' => 'Token pendaftaran tidak valid, telah kedaluwarsa, atau sudah digunakan sebelumnya.',
            ]);
        }

        if ($token->type === 'business_owner') {
            return Inertia::render('auth/RegisterBusiness', [
                'token' => $token->token,
                'type' => $token->type,
            ]);
        }

        return Inertia::render('auth/RegisterUser', [
            'token' => $token->token,
            'type' => $token->type,
        ]);
    }

    /**
     * Process registration with token
     */
    public function store(Request $request): RedirectResponse
    {
        $tokenId = $request->input('token');

        $token = RegistrationToken::where('token', $tokenId)
            ->where('is_used', false)
            ->where('expires_at', '>', now())
            ->first();

        if (!$token) {
            return redirect()->route('registrasi.select')->with('error', 'Sesi registrasi Anda telah kedaluwarsa atau token tidak valid.');
        }

        if ($token->type === 'business_owner') {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
                'phone_number' => 'required|string|max:20',
                'business_name' => 'required|string|max:255',
                'business_type' => 'required|string|in:kuliner,penginapan,souvenir,tour_guide,transportasi,atraksi_wisata,lainnya',
                'business_address' => 'required|string|max:1000',
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
            ]);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone_number' => $request->phone_number,
                'role' => 'business_owner',
                'business_name' => $request->business_name,
                'business_type' => $request->business_type,
                'business_address' => $request->business_address,
                'validation_status' => 'pending', // Menunggu validasi admin
                'password' => Hash::make($request->password),
            ]);
        } else {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
                'phone_number' => 'nullable|string|max:20',
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
            ]);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone_number' => $request->phone_number,
                'role' => 'user',
                'validation_status' => 'approved', // Pengguna biasa langsung disetujui
                'password' => Hash::make($request->password),
            ]);
        }

        // Mark token as used
        $token->update(['is_used' => true]);

        event(new Registered($user));
        Auth::login($user);

        return redirect()->route('dashboard');
    }
}