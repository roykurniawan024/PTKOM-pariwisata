<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Destination;
use App\Models\Review;
use App\Models\SiteMetric;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
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
                    'id' => $dest->id,
                    'title' => $dest->name,
                    'slug' => $dest->slug,
                    'category' => $dest->category?->name ?? 'Wisata',
                    'location' => $dest->location ?? 'Lampung',
                    'rating' => (float) $dest->rating,
                    'reviewCount' => $dest->approved_reviews_count,
                    'description' => $dest->description,
                    'price' => 'Rp '.number_format($dest->price, 0, ',', '.').' / orang',
                    'image' => $primaryImg?->image_url ?? 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
                ];
            });

        return Inertia::render('Index', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'destinations' => $destinations,
            'categories' => Category::pluck('name'),
            'statistics' => $this->heroStatistics(),
        ]);
    }

    public function testimonials(): Response
    {
        $testimonials = Review::approved()
            ->with(['user:id,name,profession,city,avatar_url', 'destination:id,name'])
            ->latest()
            ->limit(50)
            ->get()
            ->map(fn (Review $review) => [
                'id' => $review->id,
                'quote' => $review->comment,
                'name' => $review->user?->name,
                'role' => $review->user?->profession ?: 'Pengunjung',
                'location' => $review->user?->city ?: 'Lampung',
                'avatar' => $review->user?->avatar_url ?: 'https://ui-avatars.com/api/?background=0ea5e9&color=fff&name='.urlencode((string) $review->user?->name),
                'rating' => $review->rating,
                'date' => $review->created_at?->translatedFormat('d F Y'),
                'visited' => $review->destination?->name,
            ]);

        return Inertia::render('Testimonials/Index', [
            'testimonials' => $testimonials,
        ]);
    }

    /**
     * @return list<array{value: string, label: string}>|null
     */
    private function heroStatistics(): ?array
    {
        $metric = SiteMetric::latest('recorded_at')->first();

        if (! $metric) {
            return null;
        }

        $averageRating = Destination::published()->where('rating', '>', 0)->avg('rating');
        $visitors = $metric->total_visitors >= 1000000
            ? str_replace('.0', '', number_format($metric->total_visitors / 1000000, 1, '.', '')).'jt'
            : number_format($metric->total_visitors, 0, ',', '.');

        return [
            ['value' => Destination::published()->count().'+', 'label' => 'DESTINASI WISATA'],
            ['value' => $visitors, 'label' => 'WISATAWAN/TAHUN'],
            ['value' => (string) Category::count(), 'label' => 'KATEGORI WISATA'],
            ['value' => number_format((float) $averageRating, 1).'★', 'label' => 'RATING RATA-RATA'],
        ];
    }
}
