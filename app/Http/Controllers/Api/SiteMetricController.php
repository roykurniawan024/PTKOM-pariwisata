<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteMetric;
use Illuminate\Http\Request;

class SiteMetricController extends Controller
{
    public function heroStats()
    {
        $metrics = SiteMetric::latest('recorded_at')->first();

        if (!$metrics) {
            return response()->json([
                'status' => 'success',
                'data' => null
            ]);
        }

        $formatNumber = function($num) {
            if ($num >= 1000000) return str_replace('.0', '', number_format($num / 1000000, 1, '.', '')) . 'jt';
            if ($num >= 1000) return str_replace('.0', '', number_format($num / 1000, 1, '.', '')) . 'k';
            return $num;
        };

        return response()->json([
            'status' => 'success',
            'message' => 'Hero stats retrieved successfully',
            'data' => [
                'total_visitors_formatted' => $formatNumber($metrics->total_visitors),
                'total_visitors' => $metrics->total_visitors,
                'active_partners_formatted' => $metrics->active_users . '+',
                'active_partners' => $metrics->active_users,
                'awards_total' => $metrics->total_bookings,
            ]
        ]);
    }
}
