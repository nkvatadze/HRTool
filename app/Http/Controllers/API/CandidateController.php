<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\{CandidateShowResource, CandidateStatusResource, CandidateResource};
use App\Http\Requests\{Candidate\IndexRequest, Candidate\StoreRequest, Candidate\UpdateRequest};
use App\Http\Traits\FileUpload;
use App\Models\Candidate;
use Exception;
use Illuminate\Http\{JsonResponse, Resources\Json\JsonResource, Response};
use Illuminate\Support\{Facades\DB, Facades\Log, Facades\Storage};
use Symfony\Component\HttpFoundation\StreamedResponse;

class CandidateController extends Controller
{
    use FileUpload;

    public function index(IndexRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $candidatesQuery = Candidate::with('phones', 'skills')
            ->search($validated['search'] ?? null)
            ->latest('id');

        $total = $candidatesQuery->count();

        $candidates = $candidatesQuery->forPage($validated['page'], $validated['per_page'])
            ->get();

        return response()->success([
            'candidates' => CandidateResource::collection($candidates),
            'total' => $total
        ]);
    }

    public function show(Candidate $candidate): JsonResource
    {
        return new CandidateShowResource(
            $candidate->load(['phones', 'skills', 'statuses' => fn($query) => $query->latest('pivot_id')])
        );
    }

    public function store(StoreRequest $request): JsonResponse
    {
        $validated = $request->validated();

        // Upload CV
        $validated['cv_path'] = $this->uploadFile($validated['cv'] ?? null, config('filesystems.cv_path'), 'local');

        Candidate::create($validated)
            ->addSkills($validated['skills'] ?? []) // Add candidate's skills
            ->addPhones($validated['phones'] ?? []); // Add candidate's phone numbers

        return response()->success(code: Response::HTTP_CREATED);
    }

    public function update(Candidate $candidate, UpdateRequest $request)
    {
        $validated = $request->validated();

        DB::beginTransaction();
        try {
            $candidate->update($validated);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e);
            return \response()->fail([
                'server' => 'Failed to update candidate, please try again'
            ]);
        }

        return (new CandidateStatusResource(
            $candidate->statuses()->latest()->first()
        ))->response()->setStatusCode(Response::HTTP_CREATED);
    }

    public function downloadCV(Candidate $candidate): StreamedResponse
    {
        return Storage::download($candidate->cv_path);
    }

    public function destroy(Candidate $candidate): JsonResponse
    {
        $candidate->delete();

        return response()->success(code: Response::HTTP_NO_CONTENT);
    }
}
