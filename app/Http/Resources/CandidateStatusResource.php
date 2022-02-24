<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CandidateStatusResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->pivot->id,
            'name' => $this->name,
            'candidate_id' => $this->pivot->candidate_id,
            'status_id' => $this->pivot->status_id,
            'comment' => $this->pivot->comment,
            'created_at' => $this->pivot->created_at->timestamp
        ];
    }
}
