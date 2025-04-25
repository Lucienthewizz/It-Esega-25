<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserSharedResource;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminUserController extends Controller
{
    public function index()
    {
        $admin = User::role(['admin', 'super_admin'])->get();
        return Inertia::render('admin/admin', [
            'admin' => UserSharedResource::collection($admin)
        ]);
    }
}
