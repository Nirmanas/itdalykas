<?php


namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            CarDetailSeeder::class,
            CarModelSeeder::class,
            DetailModelSeeder::class,
        ]);
    }
}
