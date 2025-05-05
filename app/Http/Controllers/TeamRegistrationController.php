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
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class TeamRegistrationController extends Controller
{
    public function store(Request $request)
    {
        try {
            // Log untuk debugging
            Log::info('TeamRegistration store method called', [
                'request_data' => $request->except(['team_logo', 'proof_of_payment']),
                'has_team_logo' => $request->hasFile('team_logo'),
                'has_proof_of_payment' => $request->hasFile('proof_of_payment')
            ]);
            
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
                $rules['team_name'] .= '|unique:ml_teams,team_name';
            } elseif ($gameType === 'ff') {
                $rules['team_name'] .= '|unique:ff_teams,team_name';
            }
            
            $validated = $request->validate($rules);
            
            Log::info('Validation passed', ['validated_data' => $validated]);

            // Validasi ketersediaan slot berdasarkan game type dan slot type
            $competitionName = $gameType === 'ml' ? 'Mobile Legends' : 'Free Fire';
            $slot = CompetitionSlot::where('competition_name', $competitionName)->first();
            
            if (!$slot) {
                Log::error('Competition slot not found', ['competition_name' => $competitionName]);
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
                Log::error('Insufficient slots', [
                    'available' => $availableSlots,
                    'needed' => $slotCount,
                    'competition' => $competitionName
                ]);
                return response()->json([
                    'success' => false,
                    'message' => "Maaf, slot untuk {$competitionName} tidak mencukupi. Tersedia {$availableSlots} slot, dibutuhkan {$slotCount} slot."
                ], 400);
            }

            $isML = $validated['game_type'] === 'ml';
            $isFF = $validated['game_type'] === 'ff';

            // Menggunakan transaksi database untuk memastikan semua operasi berjalan dengan baik
            DB::beginTransaction();

            try {
                // Periksa kembali secara manual apakah tim sudah ada (sebagai double-check)
                if ($isML) {
                    $existingTeam = ML_Team::where('team_name', $validated['team_name'])->first();
                    if ($existingTeam) {
                        Log::warning('Team already exists', ['team_name' => $validated['team_name'], 'game_type' => 'ml']);
                        return back()->withErrors(['team_name' => 'Nama tim Mobile Legends sudah digunakan. Silakan gunakan nama lain.'])->withInput();
                    }
                    $team = new ML_Team();
                    
                    // Set slot type dan count untuk ML
                    $team->slot_type = $validated['slot_type'] ?? 'single';
                    $team->slot_count = 1; // Selalu set 1 untuk setiap pendaftaran, karena kita menangani slot satu per satu
                    
                } else if ($isFF) {
                    $existingTeam = FF_Team::where('team_name', $validated['team_name'])->first();
                    if ($existingTeam) {
                        Log::warning('Team already exists', ['team_name' => $validated['team_name'], 'game_type' => 'ff']);
                        return back()->withErrors(['team_name' => 'Nama tim Free Fire sudah digunakan. Silakan gunakan nama lain.'])->withInput();
                    }
                    $team = new FF_Team();
                    // Free Fire selalu single slot, tidak perlu set slot_type dan slot_count
                }

                $team->team_name = $validated['team_name'];
                
                // Simpan tim dulu untuk mendapatkan ID
                $team->save();
                
                // Debug log
                Log::info('Team saved', ['team_id' => $team->id, 'team_name' => $team->team_name]);
                
                // Buat struktur folder berdasarkan ID tim dan nama
                $gameFolder = $isML ? 'ML_teams' : 'FF_teams';
                $teamFolder = $gameFolder . '/' . $team->id . '_' . Str::slug($team->team_name);
                
                // Buat folder yang diperlukan untuk file tim saja
                if (!Storage::disk('public')->exists($teamFolder)) {
                    Storage::disk('public')->makeDirectory($teamFolder . '/team_logo', 0755, true);
                    Storage::disk('public')->makeDirectory($teamFolder . '/proof_of_payment', 0755, true);
                }

                // Upload logo tim
                if ($request->hasFile('team_logo')) {
                    try {
                        $logoFile = $request->file('team_logo');
                        $logoExtension = $logoFile->getClientOriginalExtension();
                        $logoFileName = Str::slug($team->team_name) . '_logo.' . $logoExtension;
                        $logoPath = $logoFile->storeAs($teamFolder . '/team_logo', $logoFileName, 'public');
                        $team->team_logo = $logoPath;
                        
                        Log::info('Logo uploaded', ['path' => $logoPath]);
                    } catch (\Exception $e) {
                        Log::error('Error uploading logo', ['error' => $e->getMessage()]);
                        throw $e; // Re-throw untuk ditangkap oleh try-catch luar
                    }
                }

                // Upload bukti pembayaran
                if ($request->hasFile('proof_of_payment')) {
                    try {
                        $paymentFile = $request->file('proof_of_payment');
                        $paymentExtension = $paymentFile->getClientOriginalExtension();
                        $paymentFileName = Str::slug($team->team_name) . '_proof.' . $paymentExtension;
                        $paymentPath = $paymentFile->storeAs($teamFolder . '/proof_of_payment', $paymentFileName, 'public');
                        $team->proof_of_payment = $paymentPath;
                        
                        Log::info('Payment proof uploaded', ['path' => $paymentPath]);
                    } catch (\Exception $e) {
                        Log::error('Error uploading payment proof', ['error' => $e->getMessage()]);
                        throw $e; // Re-throw untuk ditangkap oleh try-catch luar
                    }
                }

                // Simpan perubahan pada tim
                $team->save();
                
                Log::info('Team updated with files', [
                    'team_id' => $team->id,
                    'team_logo' => $team->team_logo,
                    'proof_of_payment' => $team->proof_of_payment
                ]);

                // Setelah berhasil mendaftar, tambah jumlah slot yang digunakan 
                // Selalu kurangi 1 slot untuk setiap pendaftaran
                $slot->incrementUsedSlots(1);

                // Commit transaksi jika semua operasi berhasil
                DB::commit();

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
            } catch (\Exception $e) {
                // Rollback transaksi jika terjadi error
                DB::rollBack();
                
                Log::error('Error in team registration transaction', [
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);
                
                // Hapus folder tim jika sudah dibuat
                if (isset($teamFolder) && Storage::disk('public')->exists($teamFolder)) {
                    Storage::disk('public')->deleteDirectory($teamFolder);
                }
                
                throw $e; // Re-throw untuk ditangkap oleh try-catch luar
            }
            
        } catch (\Exception $e) {
            Log::error('Fatal error in team registration', [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return back()->withErrors(['general' => 'Terjadi kesalahan dalam pendaftaran tim: ' . $e->getMessage()])->withInput();
        }
    }
}
