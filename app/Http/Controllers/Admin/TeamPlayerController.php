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
use PDF;

class TeamPlayerController extends Controller
{
    public function index()
    {

        $ffTeams = FF_Team::withCount('participants')->get();
        $mlTeams = ML_Team::withCount('participants')->get();
        $mlPlayers = ML_Participant::all();
        $ffPlayers = FF_Participant::all();

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
            'mlPlayers' => $mlPlayers,
            'ffPlayers' => $ffPlayers,
        ]);
    }

    public function ffPlayer(){
        $players = FF_Participant::all();
        dd($players);
    }
    
    public function mlPlayer(){
        $players = ML_Participant::with('team')->get();
        dd($players);
    }

    public function exportMLPlayer(){
        $mlPlayers = ML_Participant::with('team')->get();

        $pdf = PDF::loadView('exports.ml-players', compact('mlPlayers'))
                 ->setPaper('a4', 'landscape');

        return $pdf->download('ml-players.pdf');
    }
    
    public function exportFFPlayer(){
        $ffPlayers = FF_Participant::all();

        $pdf = PDF::loadView('exports.ff-players', compact('ffPlayers'))
                 ->setPaper('a4', 'landscape');

        return $pdf->download('ff-players.pdf');
    }
}
