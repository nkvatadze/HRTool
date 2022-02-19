<?php

namespace App\Http\traits\Relations;

use App\Models\Phone;
use Illuminate\Database\Eloquent\Relations\MorphMany;

trait HasManyPhones
{
    public function phones(): MorphMany
    {
        return $this->morphMany(Phone::class, 'phoneable');
    }
}
