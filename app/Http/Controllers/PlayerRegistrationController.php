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
        dd($request->all());
        $validated = $request->validated();

        if (!empty($validated['ml_players'])) {
            foreach ($validated['ml_players'] as $player) {
                $photoPath = null;
                if ($request->hasFile('ml_players.*.foto') && $request->file('ml_players.*.foto')->isValid()) {
                    $photoPath = $request->file('ml_players.*.foto')->store('photos', 'public');
                }

                $signaturePath = null;
                if ($request->hasFile('ml_players.*.tanda_tangan') && $request->file('ml_players.*.tanda_tangan')->isValid()) {
                    $signaturePath = $request->file('ml_players.*.tanda_tangan')->store('signatures', 'public');
                }

                ML_Participant::create([
                    'ml_team_id' => $validated['team_id'],
                    'name' => $player['name'],
                    'nickname' => $player['nickname'],
                    'id_server' => $player['id_server'],
                    'no_hp' => $player['no_hp'],
                    'email' => $player['email'],
                    'alamat' => $player['alamat'] ?? '-',
                    'tanda_tangan' => $signaturePath,
                    'foto' => $photoPath,
                    'role' => $player['role'],
                ]);
            }
        }

        return to_route('home')->with('success', 'Pendaftaran Player berhasil di lakukan, tunggu konfirmasi dari Humas IT-ESSEGA!');
    }

}
