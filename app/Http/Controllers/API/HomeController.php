<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Position;
use App\Models\Skill;
use App\Models\Status;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class HomeController extends Controller
{
    public function __invoke(): JsonResponse
    {
        return response()->json([
            'statuses' => Cache::rememberForever('statuses', fn() => Status::all()),
            'positions' => Cache::rememberForever('positions', fn() => Position::all()),
            'skills' => Cache::rememberForever('skills', fn() => Skill::all()),
        ]);
    }
}
