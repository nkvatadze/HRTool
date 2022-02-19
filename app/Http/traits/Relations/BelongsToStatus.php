<?php

namespace App\Http\traits\Relations;

use App\Models\Status;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait BelongsToStatus
{
    /**
     * Candidate has a hiring status
     *
     * @return BelongsTo
     */
    public function status(): BelongsTo
    {
        return $this->belongsTo(Status::class);
    }
}
