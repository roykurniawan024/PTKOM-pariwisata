<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use App\Models\Review;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

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

        Review::updateOrCreate(
            ['user_id' => $request->user()->id, 'destination_id' => $destination->id],
            $validated + ['is_approved' => false],
        );

        return back()->with('success', 'Ulasan Anda berhasil dikirim dan menunggu persetujuan admin.');
    }

    /**
     * Approve or reject a review (admin only).
     */
    public function moderate(Request $request, Review $review): RedirectResponse
    {
        $validated = $request->validate([
            'is_approved' => 'required|boolean',
        ]);

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
