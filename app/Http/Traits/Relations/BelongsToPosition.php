<?php

namespace App\Http\Traits\Relations;

use App\Models\Position;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait BelongsToPosition
{
    /**
     * Candidate has a position
     *
     * @return BelongsTo
     */
    public function position(): BelongsTo
    {
        return $this->belongsTo(Position::class);
    }
}
