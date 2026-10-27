<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\MassPrunable;
use Illuminate\Database\Eloquent\Model;

class RegistrationToken extends Model
{
    use HasFactory, MassPrunable;

    protected $fillable = [
        'token',
        'type',
        'expires_at',
        'is_used',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
        'is_used' => 'boolean',
    ];

    /**
     * Tokens that are used, or expired for more than a day.
     */
    public function prunable(): Builder
    {
        return static::query()
            ->where('is_used', true)
            ->orWhere('expires_at', '<', now()->subDay());
    }
}
