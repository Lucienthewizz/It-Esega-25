<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\AuthenticatedSessionControllerAdmin;
use App\Http\Controllers\Admin\TimelineController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PageController;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');


Route::get('/registerff', function () {
    return Inertia::render('RegisterFF');
})->name('registerff');


Route::get('/registerml', function () {
    return Inertia::render('RegisterML');
})->name('registerml');




Route::middleware(['auth', 'verified', 'role:user'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});



Route::middleware(['auth', 'role:super_admin|admin'])->prefix('secure-admin-essega')->group(function () {
    Route::get('dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::resource('admins', AdminUserController::class);
    Route::resource('timeline', TimelineController::class);



    Route::post('logout/admin/it-esega', [AuthenticatedSessionControllerAdmin::class, 'destroy'])
        ->name('logout.admin');
});


Route::get('/about', [PageController::class, 'about'])->name('about');
Route::get('/faq', [PageController::class, 'faq'])->name('faq');
Route::get('/contact', [PageController::class, 'contact'])->name('contact');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
