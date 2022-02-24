<?php

namespace App\Http\Traits\Relations;

use App\Models\CandidateSkill;
use App\Models\Skill;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

trait BelongsToManySkills
{
    public function skills(): BelongsToMany
    {
        return $this->belongsToMany(Skill::class, relation: CandidateSkill::class);
    }

    public function addSkills(array $skills): self
    {
        $this->skills()->attach($skills);

        return $this;
    }

    public function syncSkills(array $skills): self
    {
        $this->skills()->sync($skills);

        return $this;
    }

    public function getSkillIdsAttribute(): array
    {
        if (!$this->relationLoaded('skills')) return [];

        return $this->skills->pluck('id')->all();
    }
}
