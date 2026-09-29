<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Destination extends Model
{
    use HasUuids;

    protected $fillable = ['category_id', 'name', 'slug', 'description', 'price', 'location', 'rating'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function images()
    {
        return $this->hasMany(DestinationImage::class);
    }
}
