<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\AuthenticatedSessionControllerAdmin;
use App\Http\Controllers\Admin\TeamPlayerController;
use App\Http\Controllers\Admin\TimelineController;
use App\Http\Controllers\PlayerRegistrationController;
use App\Http\Controllers\TeamRegistrationController;
use App\Exports\MLPlayersExport;
use App\Exports\FFPlayersExport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PageController;

// Route::get('/', function () {
//     return Inertia::render('home');
// })->name('home');

Route::get('/', [PageController::class, 'home'])->name('home');

Route::get('/about', [PageController::class, 'about'])->name('about');


Route::get('/export/ml-players', function () {
    return Excel::download(new MLPlayersExport, 'mobile-legends-players.xlsx');
});

Route::get('/export/ff-players', function () {
    return Excel::download(new FFPlayersExport, 'free-fire-players.xlsx');
});


Route::middleware('guest')->group(function () {
    Route::post('/team-registration', [TeamRegistrationController::class, 'store'])->name('team-registration.store');

    Route::post('/player-registration', [PlayerRegistrationController::class, 'store'])->name('player-registration.store');
    Route::post('/player-registration-ff', [PlayerRegistrationController::class, 'storeFF'])->name('player-registration-ff.store');

    Route::get('/player-registration-ml/form/{encryptedTeamName}', [PlayerRegistrationController::class, 'showRegistrationForm'])
        ->name('player-registration.form');

    Route::get('/player-registration-ff/form/{encryptedTeamName}', [PlayerRegistrationController::class, 'showRegistrationFormFF'])
        ->name('player-registration-ff.form');

});


Route::get('/team-cek', function () {
    $team = \App\Models\ML_Team::all();

    dd($team);

});



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



    Route::post('logout/admin/it-esega', [AuthenticatedSessionControllerAdmin::class, 'destroy'])
        ->name('logout.admin');
});


Route::get('/bracket', function () {
    return Inertia::render('bracket');
})->name('bracket');


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
