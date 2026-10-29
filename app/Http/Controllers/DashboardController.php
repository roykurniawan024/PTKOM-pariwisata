<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Destination;
use App\Models\Review;
use App\Models\SiteMetric;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        // If user is admin, provide comprehensive real-time analytics data
        if ($user->role === 'admin') {
            $stats = [
                'total_destinations' => Destination::count(),
                'published_destinations' => Destination::published()->count(),
                'total_users' => User::where('role', 'user')->count(),
                'total_partners' => User::where('role', 'business_owner')->count(),
                'pending_partners' => User::where('role', 'business_owner')->where('validation_status', 'pending')->count(),
                'approved_partners' => User::where('role', 'business_owner')->where('validation_status', 'approved')->count(),
                'rejected_partners' => User::where('role', 'business_owner')->where('validation_status', 'rejected')->count(),
                'total_reviews' => Review::count(),
                'pending_reviews' => Review::where('is_approved', false)->count(),
                'approved_reviews' => Review::approved()->count(),
            ];

            $visitorTrends = SiteMetric::orderBy('recorded_at', 'asc')
                ->take(30)
                ->get(['recorded_at', 'total_visitors', 'active_users', 'total_bookings'])
                ->map(fn ($metric) => [
                    'date' => date('d M', strtotime($metric->recorded_at)),
                    'Pengunjung' => $metric->total_visitors,
                    'Pengguna Aktif' => $metric->active_users,
                    'Booking' => $metric->total_bookings,
                ]);

            if ($visitorTrends->isEmpty()) {
                $visitorTrends = collect([
                    [
                        'date' => now()->format('d M'),
                        'Pengunjung' => User::count() * 15,
                        'Pengguna Aktif' => User::count(),
                        'Booking' => Destination::count() * 3,
                    ]
                ]);
            }

            $destinationsByCategory = Category::withCount('destinations')
                ->get()
                ->map(fn ($cat) => [
                    'name' => $cat->name,
                    'Jumlah Destinasi' => $cat->destinations_count,
                ]);

            $reviewsDistribution = collect([1, 2, 3, 4, 5])->map(function ($star) {
                return [
                    'rating' => "{$star} Bintang",
                    'Jumlah Ulasan' => Review::where('rating', $star)->count(),
                ];
            });

            $priceRanges = [
                'Gratis (Rp 0)' => Destination::where('price', 0)->count(),
                'Murah (< Rp 20k)' => Destination::where('price', '>', 0)->where('price', '<=', 20000)->count(),
                'Sedang (20k - 50k)' => Destination::where('price', '>', 20000)->where('price', '<=', 50000)->count(),
                'Premium (> Rp 50k)' => Destination::where('price', '>', 50000)->count(),
            ];

            $priceDistribution = collect($priceRanges)->map(fn ($count, $range) => [
                'range' => $range,
                'Jumlah Destinasi' => $count,
            ])->values();

            $recentReviews = Review::with(['user:id,name', 'destination:id,name'])
                ->latest()
                ->take(5)
                ->get()
                ->map(fn ($rev) => [
                    'id' => $rev->id,
                    'user_name' => $rev->user->name ?? 'Anonim',
                    'destination_name' => $rev->destination->name ?? 'Destinasi',
                    'rating' => $rev->rating,
                    'comment' => $rev->comment,
                    'is_approved' => $rev->is_approved,
                    'created_at' => $rev->created_at->diffForHumans(),
                ]);

            $recentPartners = User::where('role', 'business_owner')
                ->latest()
                ->take(5)
                ->get()
                ->map(fn ($partner) => [
                    'id' => $partner->id,
                    'name' => $partner->name,
                    'business_name' => $partner->business_name,
                    'business_type' => $partner->business_type,
                    'validation_status' => $partner->validation_status,
                    'created_at' => $partner->created_at->diffForHumans(),
                ]);

            return Inertia::render('Dashboard', [
                'stats' => $stats,
                'visitorTrends' => $visitorTrends,
                'destinationsByCategory' => $destinationsByCategory,
                'reviewsDistribution' => $reviewsDistribution,
                'priceDistribution' => $priceDistribution,
                'recentReviews' => $recentReviews,
                'recentPartners' => $recentPartners,
            ]);
        }

        // If user is business owner, provide their destinations and stats
        if ($user->role === 'business_owner') {
            $destinations = Destination::where('user_id', $user->id)
                ->with(['category', 'images'])
                ->latest()
                ->get();

            $stats = [
                'total_destinations' => $destinations->count(),
                'published_destinations' => $destinations->where('is_published', true)->count(),
                'draft_destinations' => $destinations->where('is_published', false)->count(),
                'total_reviews' => Review::whereIn('destination_id', $destinations->pluck('id'))->count(),
                'avg_rating' => $destinations->avg('rating') ?? 0,
            ];

            return Inertia::render('Dashboard', [
                'stats' => $stats,
                'destinations' => $destinations,
            ]);
        }

        // Default for regular users
        return Inertia::render('Dashboard');
    }
}
