<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use App\Models\Review;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReviewController extends Controller
{
    /**
     * Submit (or replace) the authenticated user's review; it awaits admin moderation.
     */
    public function store(Request $request, string $slug): RedirectResponse
    {
        $destination = Destination::published()->where('slug', $slug)->firstOrFail();

        $validated = $request->validate([
            'rating' => 'required|integer|between:1,5',
            'comment' => 'required|string|max:1000',
        ]);

        $ipAddress = (string) $request->ip();
        $ipUsedByAnotherUser = Review::where('destination_id', $destination->id)->whereNotNull('ip_address')->where('ip_address', $ipAddress)->where('user_id', '!=', $request->user()->id)->exists();
        if ($ipUsedByAnotherUser) {
            return back()->withErrors(['comment' => 'Satu alamat IP hanya dapat digunakan oleh satu akun untuk mengulas destinasi ini.']);
        }
        $rateKey = "review-ip:{$ipAddress}:{$destination->id}";
        if (\Illuminate\Support\Facades\RateLimiter::tooManyAttempts($rateKey, 3)) {
            $sec = \Illuminate\Support\Facades\RateLimiter::availableIn($rateKey);
            return back()->withErrors(['comment' => "Terlalu banyak pengiriman ulasan dari alamat IP ini. Silakan coba lagi dalam {$sec} detik."]);
        }
        \Illuminate\Support\Facades\RateLimiter::hit($rateKey, 60);
        Review::updateOrCreate(['user_id' => $request->user()->id, 'destination_id' => $destination->id], $validated + ['is_approved' => false, 'ip_address' => $ipAddress]);

        return back()->with('success', 'Ulasan Anda berhasil dikirim dan menunggu persetujuan admin.');
    }

    /**
     * List reviews for moderation (admin only); pending reviews are shown by default.
     */
    public function index(Request $request): Response
    {
        $status = in_array($request->query('status'), ['pending', 'approved', 'all'], true)
            ? $request->query('status')
            : 'pending';

        $reviews = Review::with(['user:id,name', 'destination:id,name,slug'])
            ->when($status === 'pending', fn ($query) => $query->where('is_approved', false))
            ->when($status === 'approved', fn ($query) => $query->approved())
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('admin/Reviews', [
            'reviews' => $reviews,
            'currentStatus' => $status,
            'stats' => [
                'total' => Review::count(),
                'pending' => Review::where('is_approved', false)->count(),
                'approved' => Review::approved()->count(),
            ],
        ]);
    }

    /**
     * Approve or hide one or many reviews at once (admin only).
     */
    public function moderate(Request $request, ?Review $review = null): RedirectResponse
    {
        $validated = $request->validate([
            'is_approved' => 'required|boolean',
            'review_ids' => 'sometimes|array|min:1',
            'review_ids.*' => 'exists:reviews,id',
        ]);

        if ($request->has('review_ids')) {
            $reviews = Review::findMany($validated['review_ids']);

            $reviews->each(fn (Review $item) => $item->update(['is_approved' => $validated['is_approved']]));

            return back()->with('success', $reviews->count().' ulasan berhasil diperbarui.');
        }

        abort_if($review === null, 404);

        $review->update(['is_approved' => $validated['is_approved']]);

        return back()->with('success', 'Status ulasan berhasil diperbarui.');
    }

    /**
     * Delete a review permanently (admin only).
     */
    public function destroy(Review $review): RedirectResponse
    {
        $review->delete();

        return back()->with('success', 'Ulasan berhasil dihapus.');
    }
}
