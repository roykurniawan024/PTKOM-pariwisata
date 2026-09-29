<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DestinationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'price' => (float) $this->price,
            'location' => $this->location,
            'rating' => (float) $this->rating,
            'category' => [
                'id' => $this->category?->id,
                'name' => $this->category?->name,
                'slug' => $this->category?->slug,
            ],
            'images' => $this->whenLoaded('images', function() {
                return $this->images->map(fn($img) => [
                    'id' => $img->id,
                    'image_url' => $img->image_url,
                    'is_primary' => $img->is_primary,
                ]);
            }),
            'thumbnail' => $this->whenLoaded('images', function() {
                $primary = $this->images->firstWhere('is_primary', true) ?? $this->images->first();
                return $primary ? $primary->image_url : null;
            }),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
