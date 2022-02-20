<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\Candidate\IndexRequest;
use App\Http\Resources\CandidateResource;
use App\Models\Candidate;
use Illuminate\Http\Resources\Json\JsonResource;

class CandidateController extends Controller
{
    public function index(IndexRequest $request): JsonResource
    {
        $validated = $request->validated();

        $candidates = Candidate::with('phones', 'skills')
            ->latest('id')
            ->apiPagination($validated['skip'])
            ->get();

        return CandidateResource::collection($candidates);
    }

    public function store()
    {

    }

    public function destroy()
    {

    }
}
