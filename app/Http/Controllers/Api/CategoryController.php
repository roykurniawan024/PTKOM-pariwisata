<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DestinationResource;
use App\Models\Category;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    /**
     * Get list of all destination categories.
     */
    public function index(): JsonResponse
    {
        $categories = Category::select('id', 'name', 'slug', 'description')
            ->withCount('destinations')
            ->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Categories retrieved successfully',
            'data' => $categories,
        ]);
    }

    /**
     * Get category detail along with its published destinations.
     */
    public function show(string $slug): JsonResponse
    {
        $category = Category::where('slug', $slug)
            ->withCount(['destinations' => fn ($query) => $query->published()])
            ->firstOrFail();

        $destinations = $category->destinations()
            ->published()
            ->with(['category', 'images'])
            ->latest()
            ->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Category detail retrieved successfully',
            'data' => [
                'id' => $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
                'description' => $category->description,
                'destinations_count' => $category->destinations_count,
                'destinations' => DestinationResource::collection($destinations),
            ],
        ]);
    }
}
