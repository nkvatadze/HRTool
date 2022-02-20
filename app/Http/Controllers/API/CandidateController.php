<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\Candidate\IndexRequest;
use App\Http\Requests\Candidate\StoreRequest;
use App\Http\Resources\CandidateResource;
use App\Http\traits\FileUpload;
use App\Models\Candidate;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;

class CandidateController extends Controller
{
    use FileUpload;

    public function index(IndexRequest $request): JsonResource
    {
        $validated = $request->validated();

        $candidates = Candidate::with('phones', 'skills')
            ->latest('id')
            ->apiPagination($validated['skip'])
            ->get();

        return CandidateResource::collection($candidates);
    }

    public function store(StoreRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $validated['cv_path'] = $this->uploadFile($validated['cv'] ?? null, config('filesystems.cv_path'));

        $candidate = Candidate::create($validated);

        $candidate->addSkills($validated['skills'] ?? []);

        $candidate->addPhones($validated['phones'] ?? []);

        return response()->success(code: Response::HTTP_CREATED);
    }

    public function destroy(Candidate $candidate): JsonResponse
    {
        $candidate->delete();

        return response()->success(code: Response::HTTP_NO_CONTENT);
    }
}
