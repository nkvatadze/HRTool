<?php

namespace App\Http\Traits;

use Illuminate\Database\Eloquent\Builder;

trait ApiPagination
{
    public function scopeApiPagination(Builder $query, int $skip, int $take = null): Builder
    {
        if (!$take) $take = config('database.records_per_page');

        return $query->skip($skip)->take($take);
    }
}
