<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Destination;
use App\Http\Resources\DestinationResource;
use Illuminate\Http\Request;

class DestinationController extends Controller
{
    public function index(Request $request)
    {
        $query = Destination::with(['category', 'images']);

        if ($request->filled('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'ilike', "%{$search}%")
                  ->orWhere('description', 'ilike', "%{$search}%")
                  ->orWhere('location', 'ilike', "%{$search}%");
            });
        }

        $destinations = $query->paginate($request->get('limit', 10));

        return DestinationResource::collection($destinations)->additional([
            'status' => 'success',
            'message' => 'Destinations retrieved successfully'
        ]);
    }

    public function show($slug)
    {
        $destination = Destination::with(['category', 'images'])->where('slug', $slug)->firstOrFail();
        
        return (new DestinationResource($destination))->additional([
            'status' => 'success',
            'message' => 'Destination detail retrieved successfully'
        ]);
    }
}
