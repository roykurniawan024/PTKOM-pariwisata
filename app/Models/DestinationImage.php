<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class DestinationImage extends Model
{
    use HasUuids;

    protected $fillable = ['destination_id', 'image_url', 'is_primary'];

    public function destination()
    {
        return $this->belongsTo(Destination::class);
    }
}
