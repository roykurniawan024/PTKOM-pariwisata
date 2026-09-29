<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class SiteMetric extends Model
{
    use HasUuids;

    protected $fillable = ['total_visitors', 'active_users', 'total_bookings', 'recorded_at'];
}
