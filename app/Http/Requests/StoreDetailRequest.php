<?php

namespace App\Http\Requests;

use App\Enums\DetailType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreDetailRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'picture' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:2048'],
            'type' => ['required', Rule::in(DetailType::all())],
            'price' => ['required', 'numeric', 'min:0.0'],
            'stock' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
