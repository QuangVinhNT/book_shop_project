<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductUpdateRequest extends FormRequest
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
            'name' => 'nullable|string|max:255',
            'category_id' => 'nullable|exists:category,id',
            'price' => 'nullable|numeric|min:0',
            'description' => 'nullable|string',
            'quantity' => 'nullable|integer|min:0',
            'reduced_price' => 'nullable|numeric|min:0',
            'author' => 'nullable|string|max:255',
            'language' => 'nullable|string|max:255',
            'format' => 'nullable|string|max:255',
            'date_published' => 'nullable|date',
            'publisher' => 'nullable|string|max:255',
        ];
    }
}
