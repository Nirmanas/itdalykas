<?php

namespace Database\Seeders;

use App\Enums\UserRoles;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create(['name' => 'Adminas', 'email' => 'adminas@gmail.com', 'password' => 'adminas', 'role' => UserRoles::ADMIN]);
        User::create(['name' => 'Klientas', 'email' => 'klientas@gmail.com', 'password' => 'klientas', 'role' => UserRoles::CLIENT]);
        User::create(['name' => 'Darbuotojas', 'email' => 'darbuotojas@gmail.com', 'password' => 'darbuotojas', 'role' => UserRoles::WORKER]);
    }
}
