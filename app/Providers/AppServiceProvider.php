<?php

namespace App\Providers;

use App\Http\Resources\UserSharedResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Inertia::share([
        //     'user' => fn() => Auth::check() ? new UserSharedResource(Auth::user()) : null,
        // ]);
    }
}
