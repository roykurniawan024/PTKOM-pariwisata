<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\DestinationController;
use App\Http\Controllers\Api\GalleryController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\SiteMetricController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->middleware('throttle:60,1')->group(function () {
    Route::get('/destinations', [DestinationController::class, 'index']);
    Route::get('/destinations/{slug}', [DestinationController::class, 'show']);
    Route::get('/destinations/{slug}/reviews', [ReviewController::class, 'index']);
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/categories/{slug}', [CategoryController::class, 'show']);
    Route::get('/gallery', [GalleryController::class, 'index']);
    Route::get('/hero-stats', [SiteMetricController::class, 'heroStats']);

    // Contact Info endpoint
    Route::get('/contact-info', function () {
        return response()->json([
            'status' => 'success',
            'message' => 'Contact info retrieved successfully',
            'data' => config('pariwisata.contact'),
        ]);
    });
});
