<?php

namespace App\Models;

use App\Http\traits\Relations\{BelongsToPosition, BelongsToStatus, HasManyPhones};
use Illuminate\Database\Eloquent\{Factories\HasFactory, Model};

class Candidate extends Model
{
    use HasFactory, BelongsToStatus, BelongsToPosition, HasManyPhones;
}
