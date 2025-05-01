<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePlayerMLRegistrationRequest;
use App\Models\ML_Participant;
use App\Models\ML_Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Str;

class PlayerRegistrationController extends Controller
{

    public function showRegistrationForm($encryptedTeamName)
    {
        try {
            $teamName = decrypt($encryptedTeamName);

            $team = ML_Team::where('team_name', $teamName)->firstOrFail();

        } catch (\Illuminate\Contracts\Encryption\DecryptException $e) {
            abort(403, 'This URL is no longer valid or was tampered with.');
        }

        return Inertia::render('player-regis/player-registration-form', [
            'teamData' => $team,
            'gameType' => 'ml',
        ]);
    }


    public function store(StorePlayerMLRegistrationRequest $request)
    {
        $validated = $request->validated();

        if (!empty($validated['ml_players'])) {
            $teamId = $validated['team_id'];
            $team = ML_Team::findOrFail($teamId);
            $teamSlug = Str::slug($team->team_name);
            
            // Buat folder player jika belum ada
            $playerBasePath = "ml_teams/{$teamId}_{$teamSlug}/player";
            $playerBaseStoragePath = storage_path("app/public/" . $playerBasePath);
            if (!file_exists($playerBaseStoragePath)) {
                mkdir($playerBaseStoragePath, 0777, true);
            }
            
            foreach ($validated['ml_players'] as $index => $player) {
                $photoPath = null;
                if ($request->hasFile("ml_players_{$index}_foto")) {
                    $file = $request->file("ml_players_{$index}_foto");
                    if ($file && $file->isValid()) {
                        // Simpan foto sementara di folder temp
                        $photoPath = $file->store("ml_teams/temp/player_photos", 'public');
                    }
                }

                $signaturePath = null;
                if ($request->hasFile("ml_players_{$index}_tanda_tangan")) {
                    $file = $request->file("ml_players_{$index}_tanda_tangan");
                    if ($file && $file->isValid()) {
                        // Simpan tanda tangan sementara di folder temp
                        $signaturePath = $file->store("ml_teams/temp/player_signatures", 'public');
                    }
                }

                // Debug: Log file information
                Log::info("Processing player {$index}", [
                    'has_foto' => $request->hasFile("ml_players_{$index}_foto"),
                    'has_tanda_tangan' => $request->hasFile("ml_players_{$index}_tanda_tangan"),
                    'foto_path' => $photoPath,
                    'tanda_tangan_path' => $signaturePath,
                    'all_files' => $request->allFiles(),
                    'player_data' => $player
                ]);

                $player = ML_Participant::create([
                    'ml_team_id' => $teamId,
                    'name' => $player['name'],
                    'nickname' => $player['nickname'],
                    'id_server' => $player['id_server'],
                    'no_hp' => $player['no_hp'],
                    'email' => $player['email'],
                    'alamat' => $player['alamat'] ?? '-',
                    'tanda_tangan' => $signaturePath,
                    'foto' => $photoPath,
                    'role' => $player['role']
                ]);

                // Setelah mendapatkan player ID, pindahkan file ke folder yang benar
                if ($player->foto) {
                    $newPath = "{$playerBasePath}/player_{$player->id}_foto." . pathinfo($player->foto, PATHINFO_EXTENSION);
                    $destinationDir = dirname(storage_path("app/public/" . $newPath));
                    if (!file_exists($destinationDir)) {
                        mkdir($destinationDir, 0777, true);
                    }
                    rename(
                        storage_path("app/public/" . $player->foto),
                        storage_path("app/public/" . $newPath)
                    );
                    $player->foto = $newPath;
                }

                if ($player->tanda_tangan) {
                    $newPath = "{$playerBasePath}/player_{$player->id}_ttd." . pathinfo($player->tanda_tangan, PATHINFO_EXTENSION);
                    $destinationDir = dirname(storage_path("app/public/" . $newPath));
                    if (!file_exists($destinationDir)) {
                        mkdir($destinationDir, 0777, true);
                    }
                    rename(
                        storage_path("app/public/" . $player->tanda_tangan),
                        storage_path("app/public/" . $newPath)
                    );
                    $player->tanda_tangan = $newPath;
                }

                // Update player dengan path yang baru
                $player->save();
            }
        }

        return to_route('home')->with('success', 'Pendaftaran Player berhasil di lakukan, tunggu konfirmasi dari Humas IT-ESSEGA!');
    }

}
