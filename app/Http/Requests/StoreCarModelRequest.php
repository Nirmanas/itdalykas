<?php

namespace App\Http\Requests;

use App\Enums\CarType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCarModelRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'picture' => ['required', 'image:allow_svg', 'mimes:jpeg,png,jpg,gif,webp,svg', 'max:2048'],
            'type' => ['required', Rule::in(CarType::all())],
        ];
    }
}
