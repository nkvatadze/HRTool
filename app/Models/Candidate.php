<?php

namespace App\Models;

use App\Casts\StorageFilePath;
use App\Http\traits\ApiPagination;
use App\Http\traits\Relations\{BelongsToPosition, BelongsToStatus, HasManyPhones, BelongsToManySkills};
use Illuminate\Database\Eloquent\{Factories\HasFactory, Model};
use Illuminate\Support\Facades\Cache;

class Candidate extends Model
{
    use HasFactory,
        ApiPagination,
        BelongsToStatus,
        BelongsToPosition,
        HasManyPhones,
        BelongsToManySkills;

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

    protected $casts = [
        'cv_path' => StorageFilePath::class
    ];

    /**
     * The "booted" method of the model.
     *
     * @return void
     */
    protected static function booted()
    {
        $initialStatus = Cache::rememberForever('statuses', fn() => Status::all())->where('name', 'Initial')->first()->id;

        static::creating(function (Candidate $candidate) use ($initialStatus) {
            $candidate->status_id = $initialStatus;
        });
    }
}
