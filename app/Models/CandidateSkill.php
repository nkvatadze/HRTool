<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class CandidateSkill extends Pivot
{
    protected $fillable = [
        'candidate_id',
        'skill_id'
    ];
}
