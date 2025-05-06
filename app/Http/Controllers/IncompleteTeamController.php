<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ML_Team;
use App\Models\FF_Team;
use App\Models\ML_Participant;
use App\Models\FF_Participant;
use App\Models\CompetitionSlot;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

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

        // Variabel untuk menyimpan tipe slot dan jumlah slot
        $slotType = 'single';
        $slotCount = 1;
        $releaseSlot = false;

        if ($gameType === 'ml') {
            // Ambil data tim untuk mengetahui tipe slot
            $team = ML_Team::find($teamId);
            
            if ($team) {
                // Simpan tipe slot dan jumlah slot
                $slotType = $team->slot_type ?? 'single';
                $slotCount = $team->slot_count ?? ($slotType === 'double' ? 2 : 1);
                $releaseSlot = true;
                
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
                
                // Hapus logo tim jika ada
                if ($team->team_logo) {
                    Storage::delete('public/' . $team->team_logo);
                }
                
                // Hapus tim
                $team->delete();
            }
        } else {
            // Untuk FF, tipe slot selalu single
            $slotType = 'single';
            $slotCount = 1;
            $releaseSlot = true;
            
            // Hapus pemain FF
            $players = FF_Participant::where('ff_team_id', $teamId)->get();
            
            // Ambil data tim
            $team = FF_Team::find($teamId);
            
            if ($team) {
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
                
                // Hapus logo tim jika ada
                if ($team->team_logo) {
                    Storage::delete('public/' . $team->team_logo);
                }
                
                // Hapus tim
                $team->delete();
            }
        }

        // Kembalikan slot yang telah digunakan
        if ($releaseSlot) {
            // Coba beberapa kemungkinan nama kompetisi
            $competitionNames = [];
            
            if ($gameType === 'ml') {
                $competitionNames = ['mobile-legends', 'mobilelegends', 'ml', 'Mobile Legends', 'Mobile-Legends'];
            } else {
                $competitionNames = ['free-fire', 'freefire', 'ff', 'Free Fire', 'Free-Fire'];
            }
            
            Log::debug("Mencoba mengembalikan slot dengan beberapa nama kompetisi", [
                'team_id' => $teamId,
                'game_type' => $gameType,
                'possible_names' => $competitionNames
            ]);
            
            $slot = null;
            $usedCompetitionName = '';
            
            // Coba semua kemungkinan nama kompetisi hingga menemukan yang cocok
            foreach ($competitionNames as $name) {
                $tempSlot = CompetitionSlot::where('competition_name', $name)->first();
                if ($tempSlot) {
                    $slot = $tempSlot;
                    $usedCompetitionName = $name;
                    break;
                }
            }
            
            if ($slot) {
                // Log kondisi slot sebelum dikurangi
                Log::debug("Slot ditemukan dan akan dikurangi", [
                    'competition_name' => $usedCompetitionName,
                    'used_slots' => $slot->used_slots,
                    'total_slots' => $slot->total_slots,
                    'slot_type' => $slotType,
                    'slot_count' => $slotCount
                ]);
                
                // Gunakan method decrementUsedSlots
                $result = $slot->decrementUsedSlots($slotCount);
                
                // Log hasil dan kondisi setelah dikurangi
                Log::debug("Slot dikembalikan setelah tim dihapus", [
                    'team_id' => $teamId,
                    'game_type' => $gameType,
                    'competition_name' => $usedCompetitionName,
                    'slot_type' => $slotType,
                    'released_slots' => $slotCount,
                    'new_used_slots' => $slot->used_slots,
                    'save_result' => $result ? 'berhasil' : 'gagal'
                ]);
            } else {
                // Jika tidak menemukan slot, tampilkan semua slot yang ada di database untuk troubleshooting
                $allSlots = CompetitionSlot::all();
                $slotNames = $allSlots->pluck('competition_name')->toArray();
                
                Log::warning("Slot tidak ditemukan dengan semua kemungkinan nama", [
                    'team_id' => $teamId,
                    'game_type' => $gameType,
                    'tried_names' => $competitionNames,
                    'existing_slots' => $slotNames,
                    'all_slots_count' => $allSlots->count()
                ]);
            }
        }

        // Kembalikan respons HTTP biasa (bukan JSON) dengan status 200
        return response()->noContent();
    }

    // Tambahkan metode truncateTeams untuk mem-flush tabel dan me-reset auto_increment
    public function truncateTeams(Request $request)
    {
        try {
            $gameType = $request->input('game_type', 'all');
            
            if ($gameType === 'ml' || $gameType === 'all') {
                // Hapus semua relasi ke ML_Team terlebih dahulu
                ML_Participant::query()->delete();
                
                // Gunakan query builder untuk reset auto_increment
                DB::statement('ALTER TABLE ml_teams AUTO_INCREMENT = 1');
                
                // Hapus semua data tim
                ML_Team::query()->delete();
                
                Log::info('Truncated ML_Team table and reset auto_increment');
            }
            
            if ($gameType === 'ff' || $gameType === 'all') {
                // Hapus semua relasi ke FF_Team terlebih dahulu
                FF_Participant::query()->delete();
                
                // Gunakan query builder untuk reset auto_increment
                DB::statement('ALTER TABLE ff_teams AUTO_INCREMENT = 1');
                
                // Hapus semua data tim
                FF_Team::query()->delete();
                
                Log::info('Truncated FF_Team table and reset auto_increment');
            }
            
            // Reset competition slots jika diminta
            if ($request->input('reset_slots', false)) {
                DB::table('competition_slots')
                    ->where('competition_name', 'Mobile Legends')
                    ->update(['used_slots' => 0]);
                    
                DB::table('competition_slots')
                    ->where('competition_name', 'Free Fire')
                    ->update(['used_slots' => 0]);
                    
                Log::info('Reset competition slots to 0');
            }
            
            return response()->json([
                'success' => true,
                'message' => 'Teams truncated successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Error truncating teams', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Error truncating teams: ' . $e->getMessage()
            ], 500);
        }
    }
}
