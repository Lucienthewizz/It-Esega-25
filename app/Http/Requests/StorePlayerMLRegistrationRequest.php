<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePlayerMLRegistrationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'team_id' => 'required|exists:ML_Team,id',
            'ml_players' => 'array',
            'ml_players.*.name' => 'required|string',
            'ml_players.*.id' => 'required|string',
            'ml_players.*.server' => 'required|string',
            'ml_players.*.role' => 'required|string|in:ketua,anggota,cadangan',
            'ml_players.*.phone' => 'required|string',
            'ml_players.*.email' => 'required|email',
        ];
    }

    public function messages(): array
    {
        return [
            'team_id.required' => 'Tim wajib dipilih.',
            'team_id.exists' => 'Tim tidak ditemukan.',
            'ml_players.array' => 'Data pemain ML harus berupa array.',
            'ml_players.*.name.required' => 'Nama pemain ML wajib diisi.',
            'ml_players.*.id.required' => 'ID pemain ML wajib diisi.',
            'ml_players.*.server.required' => 'Server pemain ML wajib diisi.',
            'ml_players.*.role.required' => 'Role pemain ML wajib diisi.',
            'ml_players.*.role.in' => 'Role pemain ML tidak valid.',
            'ml_players.*.phone.required' => 'No HP pemain ML wajib diisi.',
            'ml_players.*.email.required' => 'Email pemain ML wajib diisi.',
            'ml_players.*.email.email' => 'Format email pemain ML tidak valid.',
        ];
    }
}
