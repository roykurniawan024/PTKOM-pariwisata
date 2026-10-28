<?php

namespace App\Http\Controllers;

use App\Models\DestinationImage;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Gallery/Index', [
            'galleryItems' => self::items(),
        ]);
    }

    /**
     * Gallery items built from images of published destinations.
     *
     * @return list<array<string, mixed>>
     */
    public static function items(): array
    {
        return DestinationImage::query()
            ->whereHas('destination', fn ($query) => $query->published())
            ->with('destination.category')
            ->latest()
            ->get()
            ->map(fn (DestinationImage $image) => [
                'id' => $image->id,
                'title' => $image->destination->name,
                'category' => $image->destination->category?->slug,
                'categoryLabel' => $image->destination->category?->name,
                'location' => $image->destination->location,
                'photographer' => 'Tim Wanderly',
                'image' => $image->image_url,
                'aspect' => 'aspect-[4/3]',
            ])
            ->all();
    }
}
