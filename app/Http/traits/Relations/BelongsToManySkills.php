<?php

namespace App\Http\traits\Relations;

use App\Models\CandidateSkill;
use App\Models\Skill;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

trait BelongsToManySkills
{
    public function skills(): BelongsToMany
    {
        return $this->belongsToMany(Skill::class, relation: CandidateSkill::class);
    }
}
