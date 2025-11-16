<?php

namespace Database\Seeders;

use App\Enums\DetailType;
use App\Models\Detail;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CarDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $details = [
            [
                'name' => 'Ratai Kvadratai',
                'picture_url' => '/storage/details/1763225595_wheel1.png',
                'stock' => 15,
                'type' => DetailType::WHEEL,
                'price' => 1200.53,
            ],
            [
                'name' => 'Keturatai',
                'picture_url' => '/storage/details/1763225616_wheel2.png',
                'stock' => 15,
                'type' => DetailType::WHEEL,
                'price' => 500.53,
            ],
            [
                'name' => 'GX2353 Spoileris',
                'picture_url' => '/storage/details/spoileris1.png',
                'stock' => 8,
                'type' => DetailType::SPOILER,
                'price' => 300.00,
            ],
        ];
        foreach ($details as $detail) {
            Detail::create($detail);
        }
    }
}
