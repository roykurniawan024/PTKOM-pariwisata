<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Destination extends Model
{
    use HasUuids;

    protected $fillable = [
        'user_id',
        'category_id',
        'name',
        'tagline',
        'slug',
        'description',
        'content',
        'facilities',
        'tips',
        'price',
        'discount_price',
        'location',
        'opening_time',
        'closing_time',
        'rating',
        'is_published',
    ];

    protected static function booted(): void
    {
        static::deleting(function (Destination $destination) {
            $destination->images->each->deleteStoredFile();
        });
    }

    /**
     * Casts for the model attributes.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'discount_price' => 'decimal:2',
            'rating' => 'float',
            'is_published' => 'boolean',
            'facilities' => 'array',
            'tips' => 'array',
        ];
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    /**
     * Recalculate the rating from approved reviews; it falls back to 0 when none are approved.
     */
    public function recalculateRating(): void
    {
        $average = $this->reviews()->approved()->avg('rating');

        $this->forceFill(['rating' => $average === null ? 0 : round($average, 1)])->saveQuietly();
    }

    public function images()
    {
        return $this->hasMany(DestinationImage::class);
    }
}
