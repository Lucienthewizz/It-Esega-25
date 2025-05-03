<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\FFTeamResource;
use App\Models\FF_Team;
use App\Models\ML_Team;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeamPlayerController extends Controller
{
    public function index()
    {

        $ff_team = FF_Team::all();
        $ml_team = ML_Team::all();
        return Inertia::render('admin/lomba/index', [
            'teamsFF' => FFTeamResource::collection($ff_team),
            'teamsML' => FFTeamResource::collection($ml_team)
        ]);
    }
}
