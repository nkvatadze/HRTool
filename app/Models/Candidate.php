<?php

namespace App\Models;

use App\Http\Traits\ApiPagination;
use App\Http\Traits\Relations\{BelongsToManyStatuses,
    BelongsToPosition,
    BelongsToStatus,
    HasManyPhones,
    BelongsToManySkills
};
use Illuminate\Database\Eloquent\{Factories\HasFactory, Model, SoftDeletes};

class Candidate extends Model
{
    use HasFactory,
        ApiPagination,
        BelongsToStatus,
        BelongsToPosition,
        HasManyPhones,
        BelongsToManySkills,
        BelongsToManyStatuses,
        SoftDeletes;

    protected $fillable = [
        'status_id',
        'position_id',
        'first_name',
        'last_name',
        'email',
        'years_of_experience',
        'min_salary',
        'max_salary',
        'linkedin_url',
        'cv_path',
    ];
}
