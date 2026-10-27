<?php

namespace App\Http\Requests;

use App\Models\Destination;
use Illuminate\Foundation\Http\FormRequest;

class StoreDestinationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('create', Destination::class) ?? false;
    }

    /**
     * @return array<string, array<int, string>|string>
     */
    public function rules(): array
    {
        return [
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'discount_price' => 'nullable|numeric|min:0|lt:price',
            'location' => 'nullable|string|max:255',
            'opening_time' => 'nullable|string',
            'closing_time' => 'nullable|string',
            'tagline' => 'nullable|string|max:255',
            'facilities' => 'nullable|array',
            'facilities.*' => 'string|max:100',
            'tips' => 'nullable|array',
            'tips.*' => 'string|max:255',
            'is_published' => 'boolean',
            'image_url' => 'nullable|string|url',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:3072',
        ];
    }
}
