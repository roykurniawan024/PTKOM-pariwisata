<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Destination;
use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PublicDestinationController extends Controller
{
    public function index(): Response
    {
        $destinations = Destination::published()
            ->with(['category', 'images'])
            ->withCount(['reviews as approved_reviews_count' => fn ($query) => $query->approved()])
            ->latest()
            ->get()
            ->map(function (Destination $dest) {
                $primaryImg = $dest->images->firstWhere('is_primary', true) ?? $dest->images->first();

                return [
                    'slug' => $dest->slug,
                    'name' => $dest->name,
                    'category' => $dest->category?->name ?? 'Wisata',
                    'regency' => $dest->location ?? 'Provinsi Lampung',
                    'duration' => '1–2 hari',
                    'rating' => (float) $dest->rating,
                    'reviewCount' => $dest->approved_reviews_count,
                    'priceMin' => (int) $dest->price,
                    'priceMax' => null,
                    'thumbnail' => $primaryImg?->image_url ?? 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
                    'description' => $dest->description,
                ];
            });

        return Inertia::render('Destinations/Index', [
            'destinations' => $destinations,
            'categories' => Category::pluck('name'),
        ]);
    }

    public function show(Request $request, string $slug): Response
    {
        $destination = Destination::published()
            ->where('slug', $slug)
            ->with(['category', 'images'])
            ->withCount(['reviews as approved_reviews_count' => fn ($query) => $query->approved()])
            ->firstOrFail();

        $destination->opening_hours = $destination->opening_time && $destination->closing_time
            ? substr($destination->opening_time, 0, 5).' - '.substr($destination->closing_time, 0, 5).' WIB'
            : null;

        $reviews = $destination->reviews()
            ->approved()
            ->with('user:id,name')
            ->latest()
            ->limit(10)
            ->get()
            ->map(fn (Review $review) => [
                'id' => $review->id,
                'rating' => $review->rating,
                'comment' => $review->comment,
                'created_at' => $review->created_at?->toDateString(),
                'user_name' => $review->user?->name,
            ]);

        $userReview = $request->user()
            ? $destination->reviews()->where('user_id', $request->user()->id)->first(['rating', 'comment', 'is_approved'])
            : null;

        return Inertia::render('Destinations/Show/Index', [
            'destination' => $destination,
            'reviews' => $reviews,
            'userReview' => $userReview,
        ]);
    }
}
