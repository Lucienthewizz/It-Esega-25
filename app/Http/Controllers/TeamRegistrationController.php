<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMLTeamRegistrationRequest;
use App\Models\FF_Team;
use App\Models\ML_Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TeamRegistrationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'team_name' => 'required|string|max:255',
            'team_logo' => 'required|image|max:2048',
            'proof_of_payment' => 'required|image|max:2048',
            'game_type' => 'required|in:ml,ff',
        ]);


        $isML = $validated['game_type'] === 'ml';
        $isFF = $validated['game_type'] === 'ff';

        // dd($request->all());
        // dd($request->all(), $isML, $isFF);

        if ($isML) {
            $team = new ML_Team();
        } else if ($isFF) {
            $team = new FF_Team();
        }
        // $team = $isML ? new ML_Team() : new FF_Team();
        $team->team_name = $validated['team_name'];

        if ($request->hasFile('team_logo')) {
            $team->team_logo = $request->file('team_logo')->store('team_logos', 'public');
        }

        if ($request->hasFile('proof_of_payment')) {
            $team->proof_of_payment = $request->file('proof_of_payment')->store('payment_proofs', 'public');
        }

        $team->save();

        $encryptedTeamName = encrypt($team->team_name);
        Session::flash('success', 'Selamat anda berhasil mendaftar sebagai team ' . $validated['team_name']);

        if ($isML) {
            return redirect()->route('player-registration.form', ['encryptedTeamName' => $encryptedTeamName]);
        } else if ($isFF) {
            return redirect()->route('player-registration-ff.form', ['encryptedTeamName' => $encryptedTeamName]);
        }
        // return $isML
        //     ? redirect()->route('player-registration.form', ['encryptedTeamName' => $encryptedTeamName])
        //     : redirect()->route('player-registration-ff.form', ['encryptedTeamName' => $encryptedTeamName]);
    }
}
