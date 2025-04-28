<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMLTeamRegistrationRequest;
use App\Models\ML_Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class TeamRegistrationController extends Controller
{
    public function store(StoreMLTeamRegistrationRequest $request)
    {
        $validated = $request->validated();

        $team = new ML_Team();
        $team->team_name = $validated['team_name'];

        if ($request->hasFile('team_logo')) {
            $team->team_logo = $request->file('team_logo')->store('team_logos', 'public');
        }

        if ($request->hasFile('proof_of_payment')) {
            $team->proof_of_payment = $request->file('proof_of_payment')->store('payment_proofs', 'public');
        }

        $team->save();

        Session::flash('success', 'Selamat anda berhasil mendaftar sebagai team ' . $validated['team_name']);
        return Inertia::location(route('player-registration.form', parameters: [
            'team' => $team->id,
            // 'gameType' => $validated['game_type']
        ]));
    }
}
