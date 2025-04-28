<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePlayerMLRegistrationRequest;
use App\Models\ML_Participant;
use App\Models\ML_Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;

class PlayerRegistrationController extends Controller
{

    public function showRegistrationForm($encryptedTeamName)
    {
        try {
            $teamName = decrypt($encryptedTeamName);

            $team = ML_Team::where('team_name', $teamName)->firstOrFail();

        } catch (\Illuminate\Contracts\Encryption\DecryptException $e) {
            abort(403, 'This URL is no longer valid or was tampered with.');
        }

        return Inertia::render('player-regis/player-registration-form', [
            'teamData' => $team,
            'gameType' => 'ml',
        ]);
    }


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

        return to_route('home')->with('success', 'Pendaftaran Player berhasil di lakukan, tunggu konfrimasi dari Humas IT-ESSEGA!');
    }
}
