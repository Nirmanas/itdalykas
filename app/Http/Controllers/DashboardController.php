<?php

namespace App\Http\Controllers;

use App\Enums\CarType;
use App\Models\CarModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $carTypes = array_map(function ($case) {
            return [
                'value' => $case->value,
                'label' => ucfirst($case->value),
            ];
        }, CarType::cases());

        $carType = $request->query('carType');
        $carModelId = $request->query('carModel');

        $carModels = [];
        if ($carType) {
            $carModels = CarModel::where('type', $carType)
                ->get()
                ->map(function ($model) {
                    return [
                        'id' => $model->id,
                        'name' => $model->name,
                        'picture_url' => $model->picture_url,
                        'type' => $model->type->value,
                    ];
                });
        }

        $details = [];
        if ($carModelId) {
            $model = CarModel::find($carModelId);
            if ($model) {
                $details = $model->details()->withPivot('coords')
                    ->get()
                    ->map(function ($detail) {
                        return [
                            'id' => $detail->id,
                            'name' => $detail->name,
                            'picture_url' => $detail->picture_url,
                            'stock' => $detail->stock,
                            'type' => $detail->type->value,
                            'price' => $detail->price,
                            'coords' => $detail->pivot->coords ?? '',
                        ];
                    });
            }
        }

        return Inertia::render('dashboard', [
            'carTypes' => $carTypes,
            'carModels' => $carModels,
            'details' => $details,
            'selectedCarType' => $carType,
            'selectedCarModel' => $carModelId ? (int) $carModelId : null,
        ]);
    }
}
