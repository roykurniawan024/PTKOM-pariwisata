<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryManagementController extends Controller
{
    /**
     * Store a newly created tourism category.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
        ]);

        $baseSlug = Str::slug($validated['name']);
        $slug = $baseSlug;
        $count = 1;
        while (Category::where('slug', $slug)->exists()) {
            $slug = "{$baseSlug}-".(++$count);
        }

        Category::create([
            'name' => $validated['name'],
            'slug' => $slug,
            'description' => $validated['description'] ?? null,
        ]);

        return back()->with('success', 'Kategori wisata baru berhasil ditambahkan.');
    }

    /**
     * Update the specified tourism category.
     */
    public function update(Request $request, Category $category): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
        ]);

        $category->update([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
        ]);

        return back()->with('success', 'Data kategori wisata berhasil diperbarui.');
    }

    /**
     * Remove the specified tourism category if it has no destinations.
     */
    public function destroy(Category $category): RedirectResponse
    {
        if ($category->destinations()->exists()) {
            return back()->with('error', 'Kategori tidak dapat dihapus karena masih memiliki destinasi wisata.');
        }

        $category->delete();

        return back()->with('success', 'Kategori wisata berhasil dihapus.');
    }
}
