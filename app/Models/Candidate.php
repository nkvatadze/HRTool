<?php

namespace App\Models;

use App\Http\traits\ApiPagination;
use App\Http\traits\Candidates\Attributes;
use App\Http\traits\Relations\{BelongsToPosition, BelongsToStatus, HasManyPhones, BelongsToManySkills};
use Illuminate\Database\Eloquent\{Factories\HasFactory, Model};

class Candidate extends Model
{
    use HasFactory, ApiPagination, BelongsToStatus, BelongsToPosition, HasManyPhones, BelongsToManySkills, Attributes;
}
