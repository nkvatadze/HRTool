<?php

namespace App\Http\Resources;

use App\Models\CandidateStatus;
use Illuminate\Http\Resources\Json\JsonResource;

class CandidateShowResource extends CandidateResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $data = parent::toArray($request);
        $data['statuses'] = CandidateStatusResource::collection($this->statuses);

        return $data;
    }
}
