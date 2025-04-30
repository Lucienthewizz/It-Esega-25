<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserSharedResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class AdminUserController extends Controller
{
    public function index()
    {
        $admin = User::role(['admin', 'super_admin'])->get();
        return Inertia::render('admin/admin', [
            'admin' => UserSharedResource::collection($admin)
        ]);
    }

    public function store(UserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);

        $user = User::create($data);

        $allowedRoles = Role::pluck('name')->toArray();

        if ($request->filled('role') && in_array($request->input('role'), $allowedRoles)) {
            $user->assignRole($request->input('role'));
        }

        return Session::flash('success', "New Admin Success Added !");
    }

    public function update()
    {

    }
}
