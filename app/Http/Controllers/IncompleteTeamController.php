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
                $slotCount = $slotType === 'double' ? 2 : 1;
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
}
