<?php

namespace App\Http\Controllers\Admin;

use App\Enums\UserRoles;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display the users management page.
     */
    public function index()
    {
        $users = User::orderBy('id', 'desc')->get();

        return Inertia::render('admin/users', [
            'users' => $users,
            'userRoles' => array_map(fn($case) => [
                'value' => $case->value,
                'label' => ucfirst($case->value)
            ], UserRoles::cases()),
        ]);
    }

    /**
     * Update the role of a user.
     */
    public function updateRole(Request $request, User $user)
    {
        $validated = $request->validate([
            'role' => 'required|in:' . implode(',', UserRoles::all()),
        ]);

        $user->update([
            'role' => $validated['role'],
        ]);

        return redirect()->back()->with('success', 'User role updated successfully!');
    }
}

