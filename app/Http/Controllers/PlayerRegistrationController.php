<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePlayerMLRegistrationRequest;
use App\Models\ML_Participant;
use Illuminate\Http\Request;

class PlayerRegistrationController extends Controller
{
    public function store(StorePlayerMLRegistrationRequest $request)
    {
        $validated = $request->validated();

        if (!empty($validated['ml_players'])) {
            foreach ($validated['ml_players'] as $player) {
                ML_Participant::create([
                    'ml_team_id' => $validated['team_id'],
                    'name' => $player['name'],
                    'id_server' => $player['server'],
                    'role' => $player['role'],
                    'no_hp' => $player['phone'],
                    'email' => $player['email'],
                    'alamat' => '-',
                ]);
            }
        }

        return redirect()->route('home')->with('success', 'Pendaftaran pemain berhasil!');
    }
}
