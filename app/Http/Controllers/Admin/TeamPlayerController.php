<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\FFTeamResource;
use App\Models\FF_Team;
use App\Models\ML_Team;
use App\Models\FF_Participant;
use App\Models\ML_Participant;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\FFPlayersExport;
use App\Exports\MLPlayersExport;

class TeamPlayerController extends Controller
{
    public function index()
    {

        $ffTeams = FF_Team::withCount('participants')->get();
        $mlTeams = ML_Team::withCount('participants')->get();

        // Ubah kedua hasil mapping menjadi array biasa terlebih dahulu
        $ffTeamsArray = $ffTeams->map(function ($team) {
            return [
                'id' => $team->id,
                'name' => $team->team_name,
                'game' => 'Free Fire',
                'playerCount' => $team->participants_count,
                'achievements' => $team->achievements ?? 0,
                'logo' => $team->team_logo ?? '/placeholder.svg',
                'color' => 'from-orange-500 to-red-600',
            ];
        })->all(); // Konversi ke array

        $mlTeamsArray = $mlTeams->map(function ($team) {
            return [
                'id' => $team->id,
                'name' => $team->team_name,
                'game' => 'Mobile Legends',
                'playerCount' => $team->participants_count,
                'achievements' => $team->achievements ?? 0,
                'logo' => $team->logo ?? '/placeholder.svg',
                'color' => 'from-blue-500 to-purple-600',
            ];
        })->all(); // Konversi ke array

        // Gabungkan dengan array_merge dan hasilnya jadikan collection lagi
        $combinedTeams = collect(array_merge($ffTeamsArray, $mlTeamsArray));
    
        return Inertia::render('admin/lomba/index', [
            'teams' => $combinedTeams,
            'totalTeams' => $combinedTeams->count(),
            'totalPlayers' => $combinedTeams->sum('playerCount'),
            'achievementsTotal' => $combinedTeams->sum('achievements'),
            'winRate' => 68,
        ]);
    }

    public function ffPlayer(){
        $players = FF_Participant::all();
        return Excel::download(new FFPlayersExport($players), 'ff_players.xlsx');
    }
    
    public function mlPlayer(){
        $players = ML_Participant::all();
        return Excel::download(new MLPlayersExport($players), 'ml_players.xlsx');
    }
    
    /**
     * API endpoint untuk mendapatkan data pemain Free Fire
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function getFFPlayers()
    {
        $players = FF_Participant::with('team')->get();
        
        // Format data untuk frontend
        $formattedPlayers = $players->map(function($player) {
            return [
                'id' => $player->id,
                'name' => $player->name,
                'nickname' => $player->nickname,
                'role' => $player->role ?? 'Player',
                'foto' => $player->foto ? asset('storage/' . $player->foto) : null,
                'team_name' => $player->team ? $player->team->team_name : 'Tidak ada tim',
                'created_at' => $player->created_at,
                'status' => 'active'
            ];
        });
        
        return response()->json($formattedPlayers);
    }
    
    /**
     * API endpoint untuk mendapatkan data pemain Mobile Legends
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function getMLPlayers()
    {
        $players = ML_Participant::with('team')->get();
        
        // Format data untuk frontend
        $formattedPlayers = $players->map(function($player) {
            return [
                'id' => $player->id,
                'name' => $player->name,
                'nickname' => $player->nickname,
                'role' => $player->role ?? 'Player',
                'foto' => $player->foto ? asset('storage/' . $player->foto) : null,
                'team_name' => $player->team ? $player->team->team_name : 'Tidak ada tim',
                'created_at' => $player->created_at,
                'status' => 'active'
            ];
        });
        
        return response()->json($formattedPlayers);
    }
}
