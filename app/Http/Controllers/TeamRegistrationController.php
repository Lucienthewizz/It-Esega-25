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

        if ($isML) {
            $team = new ML_Team();
        } else if ($isFF) {
            $team = new FF_Team();
        }

        $team->team_name = $validated['team_name'];
        
        // Save team first to get the ID
        $team->save();
        
        // Create folder structure based on team_id and name
        $gameFolder = $isML ? 'ML_teams' : 'FF_teams';
        $teamFolder = $gameFolder . '/' . $team->id . '_' . Str::slug($team->team_name);
        
        // Create necessary folders for team files only
        if (!file_exists(storage_path('app/public/' . $teamFolder))) {
            mkdir(storage_path('app/public/' . $teamFolder . '/team_logo'), 0755, true);
            mkdir(storage_path('app/public/' . $teamFolder . '/proof_of_payment'), 0755, true);
        }

        if ($request->hasFile('team_logo')) {
            $logoFile = $request->file('team_logo');
            $logoExtension = $logoFile->getClientOriginalExtension();
            $logoFileName = Str::slug($team->team_name) . '_logo.' . $logoExtension;
            $team->team_logo = $request->file('team_logo')->storeAs($teamFolder . '/team_logo', $logoFileName, 'public');
        }

        if ($request->hasFile('proof_of_payment')) {
            $paymentFile = $request->file('proof_of_payment');
            $paymentExtension = $paymentFile->getClientOriginalExtension();
            $paymentFileName = Str::slug($team->team_name) . '_proof.' . $paymentExtension;
            $team->proof_of_payment = $request->file('proof_of_payment')->storeAs($teamFolder . '/proof_of_payment', $paymentFileName, 'public');
        }

        $team->save();

        $encryptedTeamName = encrypt($team->team_name);
        Session::flash('success', 'Selamat anda berhasil mendaftar sebagai team ' . $validated['team_name']);

        if ($isML) {
            return redirect()->route('player-registration.form', ['encryptedTeamName' => $encryptedTeamName]);
        } else if ($isFF) {
            return redirect()->route('player-registration-ff.form', ['encryptedTeamName' => $encryptedTeamName]);
        }
    }
}
