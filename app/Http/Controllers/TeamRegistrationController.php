<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMLTeamRegistrationRequest;
use App\Models\FF_Team;
use App\Models\ML_Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;
use Inertia\Inertia;
use App\Models\CompetitionSlot;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class TeamRegistrationController extends Controller
{
    public function store(Request $request)
    {
        $gameType = $request->input('game_type');
        
        // Aturan validasi dasar
        $rules = [
            'team_name' => 'required|string|max:255',
            'team_logo' => 'required|image|max:2048',
            'proof_of_payment' => 'required|image|max:2048',
            'game_type' => 'required|in:ml,ff',
        ];
        
        // Tambahkan aturan validasi untuk slot_type jika game-nya Mobile Legends
        if ($gameType === 'ml') {
            $rules['slot_type'] = 'required|in:single,double';
        }
        
        // Tambahkan validasi unique berdasarkan jenis game
        if ($gameType === 'ml') {
            $rules['team_name'] .= '|unique:ML_Team,team_name';
        } elseif ($gameType === 'ff') {
            $rules['team_name'] .= '|unique:FF_Team,team_name';
        }
        
        $validated = $request->validate($rules);

        // Validasi ketersediaan slot berdasarkan game type dan slot type
        $competitionName = $gameType === 'ml' ? 'Mobile Legends' : 'Free Fire';
        $slot = CompetitionSlot::where('competition_name', $competitionName)->first();
        
        if (!$slot) {
            return response()->json([
                'success' => false,
                'message' => "Maaf, kompetisi {$competitionName} tidak ditemukan."
            ], 404);
        }
        
        // Periksa apakah pengguna memilih double slot
        $isDoubleSlot = false;
        if ($gameType === 'ml') {
            $slotType = $validated['slot_type'] ?? 'single';
            $isDoubleSlot = $slotType === 'double';
        }
        
        // Untuk setiap pendaftaran, kita hanya mengurangi 1 slot
        $slotCount = 1;
        
        // Cek ketersediaan slot
        $availableSlots = $slot->getAvailableSlots();
        if ($availableSlots < $slotCount) {
            return response()->json([
                'success' => false,
                'message' => "Maaf, slot untuk {$competitionName} tidak mencukupi. Tersedia {$availableSlots} slot, dibutuhkan {$slotCount} slot."
            ], 400);
        }

        $isML = $validated['game_type'] === 'ml';
        $isFF = $validated['game_type'] === 'ff';

        // Periksa kembali secara manual apakah tim sudah ada (sebagai double-check)
        if ($isML) {
            $existingTeam = ML_Team::where('team_name', $validated['team_name'])->first();
            if ($existingTeam) {
                return back()->withErrors(['team_name' => 'Nama tim Mobile Legends sudah digunakan. Silakan gunakan nama lain.'])->withInput();
            }
            $team = new ML_Team();
            
            // Set slot type dan count untuk ML
            $team->slot_type = $validated['slot_type'] ?? 'single';
            $team->slot_count = 1; // Selalu set 1 untuk setiap pendaftaran, karena kita menangani slot satu per satu
            
        } else if ($isFF) {
            $existingTeam = FF_Team::where('team_name', $validated['team_name'])->first();
            if ($existingTeam) {
                return back()->withErrors(['team_name' => 'Nama tim Free Fire sudah digunakan. Silakan gunakan nama lain.'])->withInput();
            }
            $team = new FF_Team();
            // Free Fire selalu single slot, tidak perlu set slot_type dan slot_count
        }

        $team->team_name = $validated['team_name'];
        
        // Save team first to get the ID
        $team->save();
        
        // Create folder structure based on team_id and name
        $gameFolder = $isML ? 'ML_teams' : 'FF_teams';
        $teamFolder = $gameFolder . '/' . $team->id . '_' . Str::slug($team->team_name);
        
        // Create necessary folders for team files only
        if (!file_exists(storage_path('app/public/' . $teamFolder))) {
            mkdir(storage_path('app/public/' . $teamFolder . '/team_logo'), 0755, true);
            mkdir(storage_path('app/public/' . $teamFolder . '/proof_of_payment'), 0755, true);
        }

        if ($request->hasFile('team_logo')) {
            $logoFile = $request->file('team_logo');
            $logoExtension = $logoFile->getClientOriginalExtension();
            $logoFileName = Str::slug($team->team_name) . '_logo.' . $logoExtension;
            $team->team_logo = $request->file('team_logo')->storeAs($teamFolder . '/team_logo', $logoFileName, 'public');
        }

        if ($request->hasFile('proof_of_payment')) {
            $paymentFile = $request->file('proof_of_payment');
            $paymentExtension = $paymentFile->getClientOriginalExtension();
            $paymentFileName = Str::slug($team->team_name) . '_proof.' . $paymentExtension;
            $team->proof_of_payment = $request->file('proof_of_payment')->storeAs($teamFolder . '/proof_of_payment', $paymentFileName, 'public');
        }

        $team->save();

        // Setelah berhasil mendaftar, tambah jumlah slot yang digunakan 
        // Selalu kurangi 1 slot untuk setiap pendaftaran
        $slot->incrementUsedSlots(1);

        $encryptedTeamName = encrypt($team->team_name);
        
        // Pesan sukses yang berbeda tergantung apakah ini double slot atau tidak
        if ($isDoubleSlot) {
            $successMessage = 'Selamat anda berhasil mendaftar sebagai team ' . $validated['team_name'] . '. Ini adalah tim pertama dari pendaftaran Double Slot. Setelah mengisi data pemain, silakan mendaftar untuk tim kedua Anda.';
            // Simpan dalam session bahwa pengguna telah mendaftar untuk double slot
            Session::put('double_slot_registered', true);
        } else {
            $successMessage = 'Selamat anda berhasil mendaftar sebagai team ' . $validated['team_name'];
        }
        
        Session::flash('success', $successMessage);

        if ($isML) {
            return redirect()->route('player-registration.form', ['encryptedTeamName' => $encryptedTeamName]);
        } else if ($isFF) {
            return redirect()->route('player-registration-ff.form', ['encryptedTeamName' => $encryptedTeamName]);
        }
    }
}
