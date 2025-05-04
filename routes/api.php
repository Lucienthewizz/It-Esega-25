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
});