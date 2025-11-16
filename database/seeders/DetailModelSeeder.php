<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DetailModelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Manually associate details with car models
        $associations = [
            ['detail_id' => 1, 'model_id' => 1],
            ['detail_id' => 3, 'model_id' => 1],

            ['detail_id' => 2, 'model_id' => 2],
            ['detail_id' => 3, 'model_id' => 2],

            ['detail_id' => 1, 'model_id' => 3],

            ['detail_id' => 2, 'model_id' => 4],
        ];

        foreach ($associations as $association) {
            \DB::table('detail_model')->insert($association);
        }
    }
}
