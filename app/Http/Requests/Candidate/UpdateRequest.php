<?php

namespace App\Http\Requests\Candidate;

use App\Models\Status;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Cache;

class UpdateRequest extends FormRequest
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
        $statuses = Cache::rememberForever('statuses', fn() => Status::all())->pluck('id')->all();

        return [
            'status_id' => 'required|integer|in:' . implode(',', $statuses),
            'status_comment' => 'required_with:status_id|max:500'
        ];
    }

    public function messages(): array
    {
        return [
            'status_comment.required_with' => "The status comment field is required"
        ];
    }
}
