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
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

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
                'logo' => $team->team_logo ? asset('storage/' . $team->team_logo) : '/placeholder.svg',
                'color' => 'from-orange-500 to-red-600',
                'status' => $team->status,
                'created_at' => $team->created_at->format('d M Y'),
            ];
        })->all(); // Konversi ke array

        $mlTeamsArray = $mlTeams->map(function ($team) {
            return [
                'id' => $team->id,
                'name' => $team->team_name,
                'game' => 'Mobile Legends',
                'playerCount' => $team->participants_count,
                'achievements' => $team->achievements ?? 0,
                'logo' => $team->team_logo ? asset('storage/' . $team->team_logo) : '/placeholder.svg',
                'color' => 'from-blue-500 to-purple-600',
                'status' => $team->status,
                'slot_type' => $team->slot_type,
                'created_at' => $team->created_at->format('d M Y'),
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

    /**
     * Menampilkan detail tim berdasarkan ID dan jenis game
     */
    public function showTeam($id, $game)
    {
        if ($game === 'ff') {
            $team = FF_Team::with('participants')->findOrFail($id);
            
            $teamData = [
                'id' => $team->id,
                'name' => $team->team_name,
                'game' => 'Free Fire',
                'logo' => $team->team_logo ? asset('storage/' . $team->team_logo) : '/placeholder.svg',
                'payment_proof' => $team->proof_of_payment ? asset('storage/' . $team->proof_of_payment) : null,
                'status' => $team->status,
                'created_at' => $team->created_at->format('d M Y'),
                'players' => $team->participants->map(function($player) {
                    return [
                        'id' => $player->id,
                        'name' => $player->name,
                        'nickname' => $player->nickname,
                        'id_server' => $player->id_server,
                        'no_hp' => $player->no_hp,
                        'email' => $player->email,
                        'alamat' => $player->alamat,
                        'role' => $player->role,
                        'foto' => $player->foto ? asset('storage/' . $player->foto) : null,
                        'tanda_tangan' => $player->tanda_tangan ? asset('storage/' . $player->tanda_tangan) : null,
                    ];
                })
            ];
            
        } elseif ($game === 'ml') {
            $team = ML_Team::with('participants')->findOrFail($id);
            
            $teamData = [
                'id' => $team->id,
                'name' => $team->team_name,
                'game' => 'Mobile Legends',
                'logo' => $team->team_logo ? asset('storage/' . $team->team_logo) : '/placeholder.svg',
                'payment_proof' => $team->proof_of_payment ? asset('storage/' . $team->proof_of_payment) : null,
                'status' => $team->status,
                'slot_type' => $team->slot_type,
                'slot_count' => $team->slot_count,
                'created_at' => $team->created_at->format('d M Y'),
                'players' => $team->participants->map(function($player) {
                    return [
                        'id' => $player->id,
                        'name' => $player->name,
                        'nickname' => $player->nickname,
                        'id_server' => $player->id_server,
                        'no_hp' => $player->no_hp,
                        'email' => $player->email,
                        'alamat' => $player->alamat,
                        'role' => $player->role,
                        'foto' => $player->foto ? asset('storage/' . $player->foto) : null,
                        'tanda_tangan' => $player->tanda_tangan ? asset('storage/' . $player->tanda_tangan) : null,
                    ];
                })
            ];
        } else {
            return abort(404, 'Jenis game tidak valid');
        }
        
        return Inertia::render('admin/lomba/team-detail', [
            'team' => $teamData
        ]);
    }
    
    /**
     * Update status tim
     */
    public function updateTeamStatus(Request $request, $id, $game)
    {
        $request->validate([
            'status' => 'required|in:pending,verified,rejected'
        ]);
        
        if ($game === 'ff') {
            $team = FF_Team::findOrFail($id);
        } elseif ($game === 'ml') {
            $team = ML_Team::findOrFail($id);
        } else {
            return response()->json(['error' => 'Jenis game tidak valid'], 400);
        }
        
        $team->status = $request->status;
        $team->save();
        
        return response()->json([
            'success' => true,
            'message' => 'Status tim berhasil diperbarui'
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
     * Export data tim ke Excel
     */
    public function exportTeams()
    {
        $ffTeams = FF_Team::withCount('participants')->get();
        $mlTeams = ML_Team::withCount('participants')->get();
        
        $ffTeamsArray = $ffTeams->map(function ($team) {
            return [
                'ID' => $team->id,
                'Nama Tim' => $team->team_name,
                'Game' => 'Free Fire',
                'Jumlah Pemain' => $team->participants_count,
                'Status' => $team->status,
                'Tanggal Daftar' => $team->created_at->format('d M Y'),
            ];
        })->all();
        
        $mlTeamsArray = $mlTeams->map(function ($team) {
            return [
                'ID' => $team->id,
                'Nama Tim' => $team->team_name,
                'Game' => 'Mobile Legends',
                'Jenis Slot' => $team->slot_type,
                'Jumlah Pemain' => $team->participants_count,
                'Status' => $team->status,
                'Tanggal Daftar' => $team->created_at->format('d M Y'),
            ];
        })->all();
        
        $teams = array_merge($ffTeamsArray, $mlTeamsArray);
        
        return Excel::download(new \App\Exports\TeamsExport($teams), 'all_teams.xlsx');
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
    
    /**
     * Export data semua pemain (FF dan ML) ke Excel
     */
    public function exportAllPlayers()
    {
        $ffPlayers = FF_Participant::with('team')->get();
        $mlPlayers = ML_Participant::with('team')->get();
        
        $allPlayersData = [];
        
        foreach ($ffPlayers as $player) {
            $allPlayersData[] = [
                'ID' => $player->id,
                'Nama' => $player->name,
                'Nickname' => $player->nickname,
                'ID Server' => $player->id_server,
                'No. HP' => $player->no_hp,
                'Email' => $player->email,
                'Alamat' => $player->alamat,
                'Role' => $player->role,
                'Tim' => $player->team ? $player->team->team_name : 'Tidak ada tim',
                'Game' => 'Free Fire',
                'Tanggal Daftar' => $player->created_at->format('d M Y')
            ];
        }
        
        foreach ($mlPlayers as $player) {
            $allPlayersData[] = [
                'ID' => $player->id,
                'Nama' => $player->name,
                'Nickname' => $player->nickname,
                'ID Server' => $player->id_server,
                'No. HP' => $player->no_hp,
                'Email' => $player->email,
                'Alamat' => $player->alamat,
                'Role' => $player->role,
                'Tim' => $player->team ? $player->team->team_name : 'Tidak ada tim',
                'Game' => 'Mobile Legends',
                'Tanggal Daftar' => $player->created_at->format('d M Y')
            ];
        }
        
        return Excel::download(new \App\Exports\AllPlayersExport($allPlayersData), 'all_players.xlsx');
    }

    /**
     * Export data dan file tim beserta pemain dalam bentuk ZIP
     */
    public function exportFilesAndData()
    {
        try {
            $zipFileName = 'team_data_export_' . date('Y-m-d_H-i-s') . '.zip';
            $zipFilePath = storage_path('app/public/temp/' . $zipFileName);
            
            // Pastikan direktori temp ada
            if (!file_exists(storage_path('app/public/temp'))) {
                mkdir(storage_path('app/public/temp'), 0755, true);
            }
            
            $zip = new \ZipArchive();
            
            if ($zip->open($zipFilePath, \ZipArchive::CREATE) === TRUE) {
                // Persiapkan data untuk export
                $teamsData = $this->prepareTeamsData();
                $playersData = $this->preparePlayersData();
                
                // Tambahkan data tim langsung (tanpa menyimpan file sementara)
                $teamExcel = Excel::raw(new \App\Exports\TeamsExport($teamsData), \Maatwebsite\Excel\Excel::XLSX);
                $zip->addFromString('data/all_teams.xlsx', $teamExcel);
                
                // Tambahkan data pemain langsung (tanpa menyimpan file sementara)
                $playerExcel = Excel::raw(new \App\Exports\AllPlayersExport($playersData), \Maatwebsite\Excel\Excel::XLSX);
                $zip->addFromString('data/all_players.xlsx', $playerExcel);
                
                // Tambahkan file-file dari direktori ML_teams
                $this->addFilesToZip($zip, 'ML_teams', 'files/ML_teams');
                
                // Tambahkan file-file dari direktori FF_teams
                $this->addFilesToZip($zip, 'FF_teams', 'files/FF_teams');
                
                $zip->close();
                
                // Pastikan file ZIP telah dibuat sebelum mengirimkannya
                if (file_exists($zipFilePath)) {
                    return response()->download($zipFilePath)->deleteFileAfterSend(true);
                } else {
                    Log::error('File ZIP tidak ditemukan: ' . $zipFilePath);
                    return response()->json(['error' => 'Gagal membuat file ZIP'], 500);
                }
            }
            
            return response()->json(['error' => 'Tidak dapat membuat file ZIP'], 500);
        } catch (\Exception $e) {
            Log::error('Error dalam membuat ZIP: ' . $e->getMessage());
            return response()->json(['error' => 'Error: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Persiapkan data tim untuk export
     */
    private function prepareTeamsData()
    {
        $ffTeams = FF_Team::withCount('participants')->get();
        $mlTeams = ML_Team::withCount('participants')->get();
        
        $ffTeamsArray = $ffTeams->map(function ($team) {
            return [
                'ID' => $team->id,
                'Nama Tim' => $team->team_name,
                'Game' => 'Free Fire',
                'Jumlah Pemain' => $team->participants_count,
                'Status' => $team->status,
                'Tanggal Daftar' => $team->created_at->format('d M Y'),
            ];
        })->all();
        
        $mlTeamsArray = $mlTeams->map(function ($team) {
            return [
                'ID' => $team->id,
                'Nama Tim' => $team->team_name,
                'Game' => 'Mobile Legends',
                'Jenis Slot' => $team->slot_type,
                'Jumlah Pemain' => $team->participants_count,
                'Status' => $team->status,
                'Tanggal Daftar' => $team->created_at->format('d M Y'),
            ];
        })->all();
        
        return array_merge($ffTeamsArray, $mlTeamsArray);
    }

    /**
     * Persiapkan data pemain untuk export
     */
    private function preparePlayersData()
    {
        $ffPlayers = FF_Participant::with('team')->get();
        $mlPlayers = ML_Participant::with('team')->get();
        
        $allPlayersData = [];
        
        foreach ($ffPlayers as $player) {
            $allPlayersData[] = [
                'ID' => $player->id,
                'Nama' => $player->name,
                'Nickname' => $player->nickname,
                'ID Server' => $player->id_server,
                'No. HP' => $player->no_hp,
                'Email' => $player->email,
                'Alamat' => $player->alamat,
                'Role' => $player->role,
                'Tim' => $player->team ? $player->team->team_name : 'Tidak ada tim',
                'Game' => 'Free Fire',
                'Tanggal Daftar' => $player->created_at->format('d M Y')
            ];
        }
        
        foreach ($mlPlayers as $player) {
            $allPlayersData[] = [
                'ID' => $player->id,
                'Nama' => $player->name,
                'Nickname' => $player->nickname,
                'ID Server' => $player->id_server,
                'No. HP' => $player->no_hp,
                'Email' => $player->email,
                'Alamat' => $player->alamat,
                'Role' => $player->role,
                'Tim' => $player->team ? $player->team->team_name : 'Tidak ada tim',
                'Game' => 'Mobile Legends',
                'Tanggal Daftar' => $player->created_at->format('d M Y')
            ];
        }
        
        return $allPlayersData;
    }

    /**
     * Tambahkan file-file dari direktori tertentu ke dalam ZIP
     */
    private function addFilesToZip($zip, $sourceDir, $zipDir)
    {
        $basePath = storage_path('app/public/' . $sourceDir);
        
        if (!file_exists($basePath)) {
            Log::warning("Direktori tidak ditemukan: {$basePath}");
            return;
        }
        
        try {
            $files = new \RecursiveIteratorIterator(
                new \RecursiveDirectoryIterator($basePath, \RecursiveDirectoryIterator::SKIP_DOTS),
                \RecursiveIteratorIterator::LEAVES_ONLY
            );
            
            foreach ($files as $file) {
                if (!$file->isDir()) {
                    $filePath = $file->getRealPath();
                    $relativePath = substr($filePath, strlen($basePath) + 1);
                    
                    if (file_exists($filePath)) {
                        try {
                            $zip->addFile($filePath, $zipDir . '/' . $relativePath);
                        } catch (\Exception $e) {
                            Log::error("Gagal menambahkan file ke ZIP: {$filePath}, error: " . $e->getMessage());
                        }
                    } else {
                        Log::warning("File tidak ditemukan: {$filePath}");
                    }
                }
            }
        } catch (\Exception $e) {
            Log::error("Error mengakses direktori {$basePath}: " . $e->getMessage());
        }
    }
}
