<?php

namespace App\Http\Controllers\Admin;

use App\Enums\CarType;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCarModelRequest;
use App\Models\CarModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CarModelController extends Controller
{
    /**
     * Display the car models management page.
     */
    public function index()
    {
        $carModels = CarModel::orderBy('id', 'desc')->get();

        return Inertia::render('admin/car-models', [
            'carModels' => $carModels,
            'carTypes' => array_map(fn($case) => [
                'value' => $case->value,
                'label' => ucfirst($case->value)
            ], CarType::cases()),
        ]);
    }

    /**
     * Store a newly created car model in storage.
     */
    public function store(StoreCarModelRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('picture')) {
            $file = $request->file('picture');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('car-models', $filename, 'public');
            $validated['picture_url'] = '/storage/' . $path;
        }

        CarModel::create($validated);

        return redirect()->back()->with('success', 'Car model added successfully!');
    }

    /**
     * Remove the specified car model from storage.
     */
    public function destroy(CarModel $carModel)
    {
        if ($carModel->picture_url) {
            $filePath = str_replace('/storage/', '', $carModel->picture_url);
            \Storage::disk('public')->delete($filePath);
        }

        $carModel->delete();

        return redirect()->back()->with('success', 'Car model deleted successfully!');
    }

    /**
     * Show the page to manage details for a specific car model.
     */
    public function manageDetails(CarModel $carModel)
    {
        $carModel->load('details');
        $allDetails = \App\Models\Detail::orderBy('type')->orderBy('name')->get();

        return Inertia::render('admin/car-model-details', [
            'carModel' => $carModel,
            'allDetails' => $allDetails,
            'selectedDetailIds' => $carModel->details->pluck('id')->toArray(),
        ]);
    }

    /**
     * Update the details for a specific car model.
     */
    public function updateDetails(Request $request, CarModel $carModel)
    {
        $validated = $request->validate([
            'detail_ids' => 'required|array',
            'detail_ids.*' => 'exists:details,id',
        ]);

        $carModel->details()->sync($validated['detail_ids']);

        return redirect()->back()->with('success', 'Car model details updated successfully!');
    }
}

