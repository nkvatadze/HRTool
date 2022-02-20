<?php

namespace App\Http\Traits\Relations;

use App\Models\CandidateStatus;
use App\Models\Status;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

trait BelongsToManyStatuses
{
    public function statuses(): BelongsToMany
    {
        return $this->belongsToMany(Status::class, relation: CandidateStatus::class)
            ->withPivot(['comment', 'created_at']);
    }
}
