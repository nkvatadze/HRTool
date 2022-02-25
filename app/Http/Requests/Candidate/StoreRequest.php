<?php

namespace App\Http\Requests\Candidate;

use App\Models\{Position, Skill};
use App\Rules\PhoneNumber;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Cache;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        $positions = Cache::rememberForever('positions', fn() => Position::all())->pluck('id')->toArray();
        $skills = Cache::rememberForever('skills', fn() => Skill::all())->pluck('id')->toArray();

        return [
            'position_id' => 'required|integer|in:' . implode(',', $positions),
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'string|email',
            'years_of_experience' => 'integer|min:1|max:100',
            'min_salary' => 'integer|min:0|max:1000000',
            'max_salary' => 'integer|min:0|max:1000000',
            'linkedin_url' => 'string|url',
            'cv' => 'file|max:10000|mimes:pdf,doc,docx',
            'skills' => 'array',
            'skills.*' => 'integer|in:' . implode(',', $skills),
            'phones' => 'array',
            'phones.*' => ['string', new PhoneNumber],
        ];
    }
}
