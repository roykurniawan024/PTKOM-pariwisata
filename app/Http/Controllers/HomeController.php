<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Destination;
use App\Models\Review;
use Illuminate\Foundation\Application;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $destinationQuery = Destination::published()
            ->with(['category', 'images'])
            ->withCount([
                'reviews as approved_reviews_count' => fn ($query) => $query->approved(),
            ])
            ->latest();

        $destinationModels = $destinationQuery->get();

        $destinations = $destinationModels->map(function (Destination $dest) {
            $primaryImg = $dest->images->firstWhere('is_primary', true)
                ?? $dest->images->first();

            return [
                'id' => $dest->id,
                'title' => $dest->name,
                'slug' => $dest->slug,
                'category' => $dest->category?->name ?? 'Wisata',
                'location' => $dest->location ?? 'Lampung',
                'rating' => (float) $dest->rating,
                'reviewCount' => $dest->approved_reviews_count,
                'description' => $dest->description,
                'price' => 'Rp ' . number_format(
                    $dest->price,
                    0,
                    ',',
                    '.'
                ) . ' / orang',
                'image' => $primaryImg?->image_url
                    ?? 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
            ];
        })->values();

        // Foto galeri diambil dari seluruh gambar destinasi terpublikasi.
        $galleryImages = $destinationModels
            ->flatMap(function (Destination $dest) {
                return $dest->images->map(fn ($image) => [
                    'id' => $image->id,
                    'src' => $image->image_url,
                    'title' => $dest->name,
                    'category' => $dest->category?->name ?? 'Wisata',
                    'location' => $dest->location ?? 'Lampung',
                ]);
            })
            ->filter(fn ($image) => ! empty($image['src']))
            ->unique('src')
            ->take(12)
            ->values();

        // Tiga ulasan terbaru yang telah disetujui.
        $testimonials = Review::approved()
            ->with([
                'user:id,name,profession,city,avatar_url',
                'destination:id,name',
            ])
            ->latest()
            ->limit(3)
            ->get()
            ->map(fn (Review $review) => $this->formatTestimonial($review))
            ->values();

        return Inertia::render('Index', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'destinations' => $destinations,

            'categories' => Category::whereHas(
                'destinations',
                fn ($query) => $query->published()
            )->pluck('name'),

            'statistics' => $this->heroStatistics(),

            'testimonials' => $testimonials,

            // Data untuk galeri foto di halaman utama.
            'galleryImages' => $galleryImages,
        ]);
    }

    public function testimonials(): Response
    {
        $testimonials = Review::approved()
            ->with([
                'user:id,name,profession,city,avatar_url',
                'destination:id,name',
            ])
            ->latest()
            ->limit($limit)
            ->get()
            ->map(fn (Review $review) => $this->formatTestimonial($review))
            ->values();

        return Inertia::render('Testimonials/Index', [
            'testimonials' => $testimonials,
        ]);
    }

    /**
     * Memformat data ulasan untuk frontend.
     */
    private function formatTestimonial(Review $review): array
    {
        $name = $review->user?->name ?? 'Pengunjung';

        return [
            'id' => $review->id,
            'quote' => $review->comment,
            'name' => $name,
            'role' => $review->user?->profession ?: 'Pengunjung',
            'location' => $review->user?->city ?: 'Lampung',
            'avatar' => $review->user?->avatar_url
                ?: 'https://ui-avatars.com/api/?background=0ea5e9&color=fff&name='
                    . urlencode($name),
            'rating' => $review->rating,
            'date' => $review->created_at?->translatedFormat('d F Y'),
            'visited' => $review->destination?->name,
        ];
    }

    /**
     * Statistik berdasarkan data database.
     *
     * @return list<array{value: string, label: string}>
     */
    private function heroStatistics(): array
    {
        $publishedDestinations = Destination::published();

        $destinationCount = (clone $publishedDestinations)->count();

        $categoryCount = Category::whereHas(
            'destinations',
            fn ($query) => $query->published()
        )->count();

        $averageRating = (clone $publishedDestinations)
            ->where('rating', '>', 0)
            ->avg('rating');

        $approvedReviewCount = Review::approved()->count();

        return [
            [
                'value' => number_format($destinationCount, 0, ',', '.'),
                'label' => 'DESTINASI WISATA',
            ],
            [
                'value' => number_format($approvedReviewCount, 0, ',', '.'),
                'label' => 'ULASAN PENGUNJUNG',
            ],
            [
                'value' => number_format($categoryCount, 0, ',', '.'),
                'label' => 'KATEGORI WISATA',
            ],
            [
                'value' => $averageRating !== null
                    ? number_format((float) $averageRating, 1, ',', '.') . '★'
                    : '—',
                'label' => 'RATING RATA-RATA',
            ],
        ];
    }
}

