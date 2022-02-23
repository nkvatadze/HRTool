<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CandidateResource extends JsonResource
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
            'id' => $this->id,
            'status_id' => $this->status_id,
            'position_id' => $this->position_id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'skills' => $this->skillIds,
            'phones' => $this->phoneNumbers,
            'email' => $this->email,
            'years_of_experience' => $this->years_of_experience,
            'min_salary' => $this->min_salary,
            'max_salary' => $this->max_salary,
            'linkedin_url' => $this->linkedin_url,
            'has_cv' => (bool)$this->cv_path,
            'created_at' => $this->created_at->timestamp
        ];
    }
}
