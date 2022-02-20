<?php

namespace App\Http\Traits\Relations;

use App\Models\Phone;
use Illuminate\Database\Eloquent\Relations\MorphMany;

trait HasManyPhones
{
    public function phones(): MorphMany
    {
        return $this->morphMany(Phone::class, 'phoneable');
    }

    public function addPhones(array $phones): void
    {
        $this->phones()->createMany(
            array_map(fn($number) => ['number' => $number], $phones)
        );
    }

    public function getPhoneNumbersAttribute(): array
    {
        if (!$this->relationLoaded('phones')) return [];

        return $this->phones->pluck('number')->all();
    }
}
