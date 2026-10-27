<?php

namespace App\Models;

use Database\Factories\ReviewFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Review extends Model
{
    /** @use HasFactory<ReviewFactory> */
    use HasFactory, HasUuids;

    protected $fillable = [
        'user_id',
        'destination_id',
        'rating',
        'comment',
        'is_approved',
    ];

    protected static function booted(): void
    {
        static::saved(function (Review $review) {
            if ($review->is_approved || $review->wasChanged('is_approved')) {
                $review->destination?->recalculateRating();
            }
        });
        static::deleted(function (Review $review) {
            if ($review->is_approved) {
                $review->destination?->recalculateRating();
            }
        });
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'rating' => 'integer',
            'is_approved' => 'boolean',
        ];
    }

    public function scopeApproved(Builder $query): Builder
    {
        return $query->where('is_approved', true);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function destination(): BelongsTo
    {
        return $this->belongsTo(Destination::class);
    }
}
