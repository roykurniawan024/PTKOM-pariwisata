<?php

use App\Http\Controllers\Admin\CategoryManagementController;
use App\Http\Controllers\BusinessValidationController;
use App\Http\Controllers\DestinationManagementController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicDestinationController;
use App\Http\Controllers\ReviewController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/destinations', [PublicDestinationController::class, 'index'])->name('destinations.index');
Route::get('/destinations/{slug}', [PublicDestinationController::class, 'show'])->name('destinations.show');
Route::get('/gallery', [GalleryController::class, 'index'])->name('gallery.index');
Route::get('/testimonials', [HomeController::class, 'testimonials'])->name('testimonials.index');

Route::post('/destinations/{slug}/reviews', [ReviewController::class, 'store'])
    ->middleware('auth')
    ->name('destinations.reviews.store');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Admin & Mitra Destination Management
    Route::middleware('business.approved')->prefix('kelola/destinasi')->name('manage.destinations.')->group(function () {
        Route::get('/', [DestinationManagementController::class, 'index'])->name('index');
        Route::get('/create', [DestinationManagementController::class, 'create'])->name('create');
        Route::post('/', [DestinationManagementController::class, 'store'])->name('store');
        Route::get('/{destination}/edit', [DestinationManagementController::class, 'edit'])->name('edit');
        Route::put('/{destination}', [DestinationManagementController::class, 'update'])->name('update');
        Route::delete('/{destination}', [DestinationManagementController::class, 'destroy'])->name('destroy');
        Route::patch('/{destination}/toggle-publish', [DestinationManagementController::class, 'togglePublish'])->name('toggle-publish');
    });

    // Admin Protected Routes
    Route::middleware('admin')->group(function () {
        Route::get('/admin/validasi-mitra', [BusinessValidationController::class, 'index'])->name('admin.business-validation.index');
        Route::patch('/admin/validasi-mitra/{user}', [BusinessValidationController::class, 'updateStatus'])->name('admin.business-validation.update');

        Route::patch('/admin/ulasan/{review}', [ReviewController::class, 'moderate'])->name('admin.reviews.moderate');
        Route::delete('/admin/ulasan/{review}', [ReviewController::class, 'destroy'])->name('admin.reviews.destroy');

        Route::get('/admin/destinasi', [App\Http\Controllers\Admin\DestinationManagementController::class, 'index'])->name('admin.destinations.index');
        Route::post('/admin/destinasi', [App\Http\Controllers\Admin\DestinationManagementController::class, 'store'])->name('admin.destinations.store');
        Route::put('/admin/destinasi/{destination}', [App\Http\Controllers\Admin\DestinationManagementController::class, 'update'])->name('admin.destinations.update');
        Route::delete('/admin/destinasi/{destination}', [App\Http\Controllers\Admin\DestinationManagementController::class, 'destroy'])->name('admin.destinations.destroy');

        Route::post('/admin/kategori', [CategoryManagementController::class, 'store'])->name('admin.categories.store');
        Route::put('/admin/kategori/{category}', [CategoryManagementController::class, 'update'])->name('admin.categories.update');
        Route::delete('/admin/kategori/{category}', [CategoryManagementController::class, 'destroy'])->name('admin.categories.destroy');
    });
});

require __DIR__.'/auth.php';
