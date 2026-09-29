<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasUuids;
    
    protected $fillable = ['name', 'slug', 'description'];

    public function destinations()
    {
        return $this->hasMany(Destination::class);
    }
}
