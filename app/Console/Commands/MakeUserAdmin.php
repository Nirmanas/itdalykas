<?php

namespace App\Console\Commands;

use App\Enums\UserRoles;
use App\Models\User;
use Illuminate\Console\Command;

class MakeUserAdmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make-user-admin';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Make a specified user an admin.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $users = User::all(['id', 'name', 'email']);
        if ($users->isEmpty()) {
            $this->error('No users found in the database.');
            return 1;
        }

        foreach ($users as $user) {
            $this->line("[{$user->id}] {$user->name} ({$user->email})");
        }

        $userId = (int) $this->ask('Enter the ID of the user to make admin:');

        $user = User::find($userId);

        if (!$user) {
            $this->error('User not found.');
            return 1;
        }

        $user->update(['role' => UserRoles::ADMINISTRATOR]);

        $this->info("User {$user->name} is now an admin!");
        return 0;
    }

}
