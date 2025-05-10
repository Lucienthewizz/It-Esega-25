<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\MLPlayersExport;
use App\Exports\FFPlayersExport;

class ExportController extends Controller
{
    /**
     * Export Mobile Legends players to Excel.
     */
    public function exportMLPlayers()
    {
        return Excel::download(new MLPlayersExport, 'ml_players.xlsx');
    }

    /**
     * Export Free Fire players to Excel.
     */
    public function exportFFPlayers()
    {
        return Excel::download(new FFPlayersExport, 'ff_players.xlsx');
    }
}
