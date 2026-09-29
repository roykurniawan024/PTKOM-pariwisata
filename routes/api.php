<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DestinationController;
use App\Http\Controllers\Api\SiteMetricController;

Route::prefix('v1')->group(function () {
    Route::get('/destinations', [DestinationController::class, 'index']);
    Route::get('/destinations/{slug}', [DestinationController::class, 'show']);
    Route::get('/hero-stats', [SiteMetricController::class, 'heroStats']);
    
    // Contact Info endpoint
    Route::get('/contact-info', function () {
        return response()->json([
            'status' => 'success',
            'message' => 'Contact info retrieved successfully',
            'data' => [
                'agency_name' => 'Dinas Pariwisata Provinsi Lampung',
                'address' => 'Jl. Jend. Sudirman No. 1, Bandar Lampung',
                'phone' => '+62 812-3456-7890',
                'email' => 'info@pariwisatalampung.go.id',
                'social_media' => [
                    'instagram' => '@pariwisatalampung',
                    'facebook' => 'Pariwisata Lampung'
                ]
            ]
        ]);
    });
});
