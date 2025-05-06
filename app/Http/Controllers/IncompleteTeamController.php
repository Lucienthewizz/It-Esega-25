<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ML_Team;
use App\Models\FF_Team;
use App\Models\ML_Participant;
use App\Models\FF_Participant;
use Illuminate\Support\Facades\Storage;

class IncompleteTeamController extends Controller
{
    public function destroy(Request $request)
    {
        $validated = $request->validate([
            'team_id' => 'required',
            'game_type' => 'required|in:ml,ff',
        ]);

        $teamId = $validated['team_id'];
        $gameType = $validated['game_type'];

        if ($gameType === 'ml') {
            // Hapus pemain ML
            $players = ML_Participant::where('ml_team_id', $teamId)->get();
            
            foreach ($players as $player) {
                // Hapus file foto dan tanda tangan jika ada
                if ($player->foto) {
                    Storage::delete('public/' . $player->foto);
                }
                if ($player->tanda_tangan) {
                    Storage::delete('public/' . $player->tanda_tangan);
                }
            }
            
            // Hapus semua pemain
            ML_Participant::where('ml_team_id', $teamId)->delete();
            
            // Hapus tim dan logo tim
            $team = ML_Team::find($teamId);
            if ($team) {
                if ($team->team_logo) {
                    Storage::delete('public/' . $team->team_logo);
                }
                $team->delete();
            }
        } else {
            // Hapus pemain FF
            $players = FF_Participant::where('ff_team_id', $teamId)->get();
            
            foreach ($players as $player) {
                // Hapus file foto dan tanda tangan jika ada
                if ($player->foto) {
                    Storage::delete('public/' . $player->foto);
                }
                if ($player->tanda_tangan) {
                    Storage::delete('public/' . $player->tanda_tangan);
                }
            }
            
            // Hapus semua pemain
            FF_Participant::where('ff_team_id', $teamId)->delete();
            
            // Hapus tim dan logo tim
            $team = FF_Team::find($teamId);
            if ($team) {
                if ($team->team_logo) {
                    Storage::delete('public/' . $team->team_logo);
                }
                $team->delete();
            }
        }

        // Kembalikan respons HTTP biasa (bukan JSON) dengan status 200
        return response()->noContent();
    }
}
