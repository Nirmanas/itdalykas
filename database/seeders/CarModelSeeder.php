<?php

namespace Database\Seeders;

use App\Enums\CarType;
use App\Models\CarModel;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class CarModelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $carModels = [
            [
                'name' => 'BMW 3 Series',
                'type' => CarType::BMW,
                'picture_url' => 'database/car-models/bmw3.png',
            ],
            [
                'name' => 'BMW 5 Series',
                'type' => CarType::BMW,
                'picture_url' => 'database/car-models/bmw5.png',
            ],

            [
                'name' => 'Audi A4',
                'type' => CarType::AUDI,
                'picture_url' => 'database/car-models/car2.png',
            ],

            [
                'name' => 'Mercedes C-Class',
                'type' => CarType::MERCEDES,
                'picture_url' => 'database/car-models/car1.png',
            ],
        ];

        foreach ($carModels as $model) {
            $relativePath = $model['picture_url'];

            $file = fopen($relativePath, 'r');
            $filename = time().'_'.basename($relativePath);
            Storage::disk('public')->put('car-models/'.$filename, $file);
            $model['picture_url'] = '/storage/car-models/'.$filename;
            fclose($file);

            CarModel::create($model);
        }

    }
}
