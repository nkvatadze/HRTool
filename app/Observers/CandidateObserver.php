<?php

namespace App\Observers;

use App\Models\Candidate;
use App\Models\Status;
use Illuminate\Support\Facades\Cache;

class CandidateObserver
{
    /**
     * Handle the User "created" event.
     *
     * @param Candidate $candidate
     *
     * @return void
     */
    public function creating(Candidate $candidate)
    {
        $initialStatus = Cache::rememberForever('statuses',
            fn() => Status::all()
        )->where('name', Status::INITIAL_NAME)->first()->id;

        $candidate->status_id = $initialStatus;
    }

    /**
     * Handle the User "saving" event.
     *
     * @param Candidate $candidate
     *
     * @return void
     */
    public function saving(Candidate $candidate)
    {
        $candidate->search_values = implode(
            ' ',
            array_map(fn($field) => $candidate->{$field}, $candidate->searchableFields)
        );
    }

    /**
     * Handle the User "updated" event.
     *
     * @param Candidate $candidate
     *
     * @return void
     * @throws \Exception
     */
    public function updated(Candidate $candidate)
    {
        if ($candidate->isDirty('status_id')) {
            $candidate->statuses()->attach($candidate->status_id, [
                'comment' => request()->get('status_comment')
            ]);
        }
    }
}
