<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDestinationRequest;
use App\Http\Requests\UpdateDestinationRequest;
use App\Models\Category;
use App\Models\Destination;
use App\Models\DestinationImage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class DestinationManagementController extends Controller
{
    /**
     * Display a listing of destinations for admin.
     */
    public function index(Request $request): Response
    {
        $search = $request->query('search');

        $query = Destination::with(['category', 'images'])->latest();

        if ($search) {
            $operator = config('database.default') === 'pgsql' ? 'ilike' : 'like';
            $query->where(function ($q) use ($search, $operator) {
                $q->where('name', $operator, "%{$search}%")
                    ->orWhere('location', $operator, "%{$search}%");
            });
        }

        $destinations = $query->paginate(10)->withQueryString();
        $categories = Category::all(['id', 'name', 'slug']);

        return Inertia::render('admin/Destinations', [
            'destinations' => $destinations,
            'categories' => $categories,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /**
     * Store a newly created destination.
     */
    public function store(StoreDestinationRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $baseSlug = Str::slug($validated['name']);
        $slug = $baseSlug;
        $count = 1;
        while (Destination::where('slug', $slug)->exists()) {
            $slug = "{$baseSlug}-".(++$count);
        }

        $destination = Destination::create(array_merge(Arr::except($validated, ['image', 'image_url']), [
            'slug' => $slug,
            'rating' => 0,
            'is_published' => $request->boolean('is_published', true),
        ]));

        $this->replacePrimaryImage($request, $destination);

        return back()->with('success', 'Destinasi wisata baru berhasil ditambahkan.');
    }

    /**
     * Update the specified destination; only fields present in the request are changed.
     */
    public function update(UpdateDestinationRequest $request, Destination $destination): RedirectResponse
    {
        $destination->update(Arr::except($request->validated(), ['image', 'image_url']));

        $this->replacePrimaryImage($request, $destination);

        return back()->with('success', 'Data destinasi berhasil diperbarui.');
    }

    /**
     * Remove the specified destination from storage.
     */
    public function destroy(Destination $destination): RedirectResponse
    {
        Gate::authorize('delete', $destination);

        $destination->delete();

        return back()->with('success', 'Destinasi wisata berhasil dihapus.');
    }

    /**
     * Store an uploaded file or given URL as the primary image, removing the previous primary image files.
     */
    private function replacePrimaryImage(Request $request, Destination $destination): void
    {
        if ($request->hasFile('image')) {
            $imageUrl = Storage::url($request->file('image')->store('destinations', 'public'));
        } elseif ($request->filled('image_url')) {
            $imageUrl = $request->input('image_url');
        } else {
            return;
        }

        $destination->images()->where('is_primary', true)->get()->each(function (DestinationImage $image) {
            $image->deleteStoredFile();
            $image->delete();
        });

        DestinationImage::create([
            'destination_id' => $destination->id,
            'image_url' => $imageUrl,
            'is_primary' => true,
        ]);
    }
}
