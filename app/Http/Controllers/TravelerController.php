<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTravelerRequest;
use App\Http\Resources\TravelerResource;
use App\Models\Tour;
use App\Models\Traveler;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\JsonResource;

class TravelerController extends Controller
{
    public function index(Tour $tour): JsonResource
    {
        return TravelerResource::collection($tour->travelers()->paginate(10));
    }

    public function store(Tour $tour, StoreTravelerRequest $request)
    {
        if ($tour->travelers()->count() >= $tour->capacity) {
            return response()->json(['message' => 'Ce circuit est complet'], 422);
        }

        $traveler = $tour->travelers()->create($request->validated());

        return TravelerResource::make($traveler)->additional([
            'message' => 'Traveler created successfully.',
        ])->response()->setStatusCode(201);
    }

    public function destroy(Tour $tour, Traveler $traveler): JsonResponse
    {
        $traveler->delete();

        return response()->json(['message' => 'Traveler deleted successfully.'], 200);
    }
}
