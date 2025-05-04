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

class TeamPlayerController extends Controller
{
    public function index()
    {

        $ffTeams = FF_Team::withCount('participants')->get();
        $mlTeams = ML_Team::withCount('participants')->get();

        $combinedTeams = $ffTeams->map(function ($team) {
            return [
                'id' => $team->id,
                'name' => $team->team_name,
                'game' => 'Free Fire',
                'playerCount' => $team->participants_count,
                'achievements' => $team->achievements ?? 0,
                'logo' => $team->team_logo ?? '/placeholder.svg',
                'color' => 'from-orange-500 to-red-600',
            ];
        })->merge(
            $mlTeams->map(function ($team) {
                return [
                    'id' => $team->id,
                    'name' => $team->team_name,
                    'game' => 'Mobile Legends',
                    'playerCount' => $team->participants_count,
                    'achievements' => $team->achievements ?? 0,
                    'logo' => $team->logo ?? '/placeholder.svg',
                    'color' => 'from-blue-500 to-purple-600',
                ];
            })
        )->values();
    
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
}
