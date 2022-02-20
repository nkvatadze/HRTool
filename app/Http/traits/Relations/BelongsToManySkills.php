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

    public function addSkills(array $skills): void
    {
        $this->skills()->attach($skills);
    }

    public function syncSkills(array $skills): void
    {
        $this->skills()->sync($skills);
    }

    public function getSkillIdsAttribute(): array
    {
        if (!$this->relationLoaded('skills')) return [];

        return $this->skills->pluck('id')->all();
    }
}
