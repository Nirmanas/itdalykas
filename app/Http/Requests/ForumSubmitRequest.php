<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ForumSubmitRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'description' => 'required|string|min:1',
            'title' => 'required|string|max:100|min:1',
            'rating' => 'required|integer|min:0|max:5',
        ];
    }
}
