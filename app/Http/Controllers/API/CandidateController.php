<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Candidate;

class CandidateController extends Controller
{
    public function index()
    {
        $candidate = Candidate::latest()->get();
    }

    public function store()
    {

    }

    public function destroy()
    {

    }
}
