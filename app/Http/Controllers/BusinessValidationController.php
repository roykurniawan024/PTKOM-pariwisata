<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BusinessValidationController extends Controller
{
    /**
     * Display business validation management panel.
     */
    public function index(Request $request): Response
    {
        $status = $request->query('status', 'all');

        $query = User::where('role', 'business_owner')->latest();

        if ($status !== 'all') {
            $query->where('validation_status', $status);
        }

        $businessOwners = $query->get();

        $stats = [
            'total' => User::where('role', 'business_owner')->count(),
            'pending' => User::where('role', 'business_owner')->where('validation_status', 'pending')->count(),
            'approved' => User::where('role', 'business_owner')->where('validation_status', 'approved')->count(),
            'rejected' => User::where('role', 'business_owner')->where('validation_status', 'rejected')->count(),
        ];

        return Inertia::render('admin/BusinessValidation', [
            'businessOwners' => $businessOwners,
            'currentStatus' => $status,
            'stats' => $stats,
        ]);
    }

    /**
     * Approve or reject business owner validation
     */
    public function updateStatus(Request $request, User $user): RedirectResponse
    {
        $request->validate([
            'status' => 'required|in:approved,rejected,pending',
            'rejection_reason' => 'nullable|string|max:500',
        ]);

        $user->update([
            'validation_status' => $request->status,
            'rejection_reason' => $request->status === 'rejected' ? $request->rejection_reason : null,
        ]);

        return back()->with('success', 'Status validasi pemilik usaha berhasil diperbarui.');
    }
}