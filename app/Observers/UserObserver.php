<?php

namespace App\Observers;

use App\Enums\UserRoles;
use App\Models\User;

class UserObserver
{
    public function created(User $user): void
    {
        $user->update([
            'role' => UserRoles::CLIENT,
        ]);
    }
}
