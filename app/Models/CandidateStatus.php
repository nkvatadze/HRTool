<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class CandidateStatus extends Pivot
{
    const UPDATED_AT = null;

    protected $fillable = [
        'candidate_id',
        'status_id',
        'comment'
    ];

    protected $casts = [
        'created_at' => 'timestamp'
    ];
}
