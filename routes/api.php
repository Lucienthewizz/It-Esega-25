<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CompetitionSlotController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Competition Slot routes
Route::prefix('competition-slots')->group(function () {
    Route::get('/', [CompetitionSlotController::class, 'getAll']);
    Route::get('/{competitionName}', [CompetitionSlotController::class, 'getByName']);
    Route::get('/{competitionName}/validate', [CompetitionSlotController::class, 'validateAvailability']);
    Route::get('/{competitionName}/validate/{slotType}', [CompetitionSlotController::class, 'validateSlotType']);
    Route::post('/{competitionName}/increment', [CompetitionSlotController::class, 'incrementSlot']);
    Route::post('/{competitionName}/increment-by-type', [CompetitionSlotController::class, 'incrementSlotByType']);
    
    // Rute tambahan untuk debugging
    Route::get('/debug/all', function() {
        $slots = \App\Models\CompetitionSlot::all();
        return response()->json([
            'success' => true,
            'count' => $slots->count(),
            'data' => $slots,
            'names' => $slots->pluck('competition_name')->toArray()
        ]);
    });
    
    // Mengurangi slot secara manual (untuk testing)
    Route::post('/debug/decrement/{name}/{count?}', function($name, $count = 1) {
        $slot = \App\Models\CompetitionSlot::where('competition_name', $name)->first();
        if (!$slot) {
            return response()->json([
                'success' => false,
                'message' => 'Slot not found with name: ' . $name,
                'available_names' => \App\Models\CompetitionSlot::pluck('competition_name')->toArray()
            ], 404);
        }
        
        $result = $slot->decrementUsedSlots((int)$count);
        return response()->json([
            'success' => $result,
            'message' => $result ? 'Slot decremented successfully' : 'Failed to decrement slot',
            'before_refresh' => [
                'name' => $slot->competition_name,
                'used_slots' => $slot->used_slots,
                'total_slots' => $slot->total_slots
            ],
            'after_refresh' => [
                'name' => $slot->fresh()->competition_name,
                'used_slots' => $slot->fresh()->used_slots, 
                'total_slots' => $slot->fresh()->total_slots
            ]
        ]);
    });
});

// Debugging routes
Route::prefix('debug')->group(function() {
    // Melihat data tim
    Route::get('/teams/{type?}', function($type = null) {
        if ($type === 'ml') {
            $teams = \App\Models\ML_Team::all();
            return response()->json([
                'success' => true,
                'count' => $teams->count(),
                'data' => $teams
            ]);
        } else if ($type === 'ff') {
            $teams = \App\Models\FF_Team::all();
            return response()->json([
                'success' => true,
                'count' => $teams->count(),
                'data' => $teams
            ]);
        } else {
            $mlTeams = \App\Models\ML_Team::all();
            $ffTeams = \App\Models\FF_Team::all();
            return response()->json([
                'success' => true,
                'ml_teams_count' => $mlTeams->count(),
                'ff_teams_count' => $ffTeams->count(),
                'ml_teams' => $mlTeams,
                'ff_teams' => $ffTeams
            ]);
        }
    });
    
    // Inisialisasi atau reset slot
    Route::post('/init-slots', function() {
        // Hapus data slot lama
        \App\Models\CompetitionSlot::truncate();
        
        // Buat data baru
        \App\Models\CompetitionSlot::create([
            'competition_name' => 'ml',
            'total_slots' => 64,
            'used_slots' => 0,
            'is_active' => true
        ]);
        
        \App\Models\CompetitionSlot::create([
            'competition_name' => 'ff',
            'total_slots' => 48,
            'used_slots' => 0,
            'is_active' => true
        ]);
        
        return response()->json([
            'success' => true,
            'message' => 'Slots initialized successfully',
            'data' => \App\Models\CompetitionSlot::all()
        ]);
    });
    
    // Melihat nama tabel-tabel di database
    Route::get('/tables', function() {
        $tables = \Illuminate\Support\Facades\DB::select('SHOW TABLES');
        return response()->json([
            'success' => true,
            'tables' => $tables
        ]);
    });
});