<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\AuthenticatedSessionControllerAdmin;
use App\Http\Controllers\Admin\TeamPlayerController;
use App\Http\Controllers\Admin\TimelineController;
use App\Http\Controllers\IncompleteTeamController;
use App\Http\Controllers\PlayerRegistrationController;
use App\Http\Controllers\TeamRegistrationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PageController;
use App\Exports\MLPlayersExport;
use App\Exports\FFPlayersExport;
use Maatwebsite\Excel\Facades\Excel;

// Route::get('/', function () {
//     return Inertia::render('home');
// })->name('home');

Route::get('/', [PageController::class, 'home'])->name('home');

Route::get('/about', [PageController::class, 'about'])->name('about');

Route::middleware('guest')->group(function () {
    Route::post('/team-registration', [TeamRegistrationController::class, 'store'])->name('team-registration.store');

    Route::post('/player-registration', [PlayerRegistrationController::class, 'store'])->name('player-registration.store');
    Route::post('/player-registration-ff', [PlayerRegistrationController::class, 'storeFF'])->name('player-registration-ff.store');

    Route::get('/player-registration-ml/form/{encryptedTeamName}', [PlayerRegistrationController::class, 'showRegistrationForm'])
        ->name('player-registration.form');

    Route::get('/player-registration-ff/form/{encryptedTeamName}', [PlayerRegistrationController::class, 'showRegistrationFormFF'])
        ->name('player-registration-ff.form');
        
    // Tambahkan route untuk menghapus tim yang belum selesai didaftarkan
    Route::post('/delete-incomplete-team', [IncompleteTeamController::class, 'destroy'])->name('delete-incomplete-team');
});


Route::get('/team-cek', function () {
    $team = \App\Models\ML_Team::all();

    dd($team);

});

// API Routes for Player Data
Route::get('/api/ff-players', [TeamPlayerController::class, 'getFFPlayers']);
Route::get('/api/ml-players', [TeamPlayerController::class, 'getMLPlayers']);



Route::middleware(['auth', 'verified', 'role:user'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});



Route::middleware(['auth', 'role:super_admin|admin'])->prefix('secure-admin-essega')->group(function () {
    Route::get('dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::resource('admins', AdminUserController::class);
    Route::resource('timeline', TimelineController::class);
    Route::resource('players', TeamPlayerController::class);
    
    // Rute Tim dan Pemain
    Route::get('teams/{game}/{id}', [TeamPlayerController::class, 'showTeam'])->name('admin.teams.show');
    Route::put('teams/{game}/{id}/status', [TeamPlayerController::class, 'updateTeamStatus'])->name('admin.teams.update-status');
    
    // Rute untuk export data
    Route::get('export/teams', [TeamPlayerController::class, 'exportTeams'])->name('admin.export.teams');
    Route::get('export/all-players', [TeamPlayerController::class, 'exportAllPlayers'])->name('admin.export.all-players');
    Route::get('export/ff-players', [TeamPlayerController::class, 'ffPlayer'])->name('admin.export.ff-players');
    Route::get('export/ml-players', [TeamPlayerController::class, 'mlPlayer'])->name('admin.export.ml-players');
    
    // Tambahkan rute untuk export ZIP dengan semua data dan file
    Route::get('export/all-files-data', [TeamPlayerController::class, 'exportFilesAndData'])->name('admin.export.all-files-data');
    
    // Tambahkan rute yang langsung match dengan URL yang dipanggil oleh frontend
    Route::get('export/FFplayers', [TeamPlayerController::class, 'ffPlayer']);
    Route::get('export/MLplayers', [TeamPlayerController::class, 'mlPlayer']);
    
    // Rute lama (untuk kompatibilitas)
    Route::get('testff', [TeamPlayerController::class, 'ffPlayer'])->name('ffPlayer.list');
    Route::get('testml', [TeamPlayerController::class, 'mlPlayer'])->name('mlPlayer.list');
    
    Route::post('logout/admin/it-esega', [AuthenticatedSessionControllerAdmin::class, 'destroy'])
        ->name('logout.admin');
});





require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
