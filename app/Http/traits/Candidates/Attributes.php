<?php

namespace App\Http\traits\Candidates;

trait Attributes
{
    public function getSkillIdsAttribute()
    {
        if (!$this->relationLoaded('skills')) return [];

        return $this->skills->pluck('id');
    }

    public function getPhoneNumbersAttribute()
    {
        if (!$this->relationLoaded('phones')) return [];

        return $this->phones->pluck('number');
    }
}
