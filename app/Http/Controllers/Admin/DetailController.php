<?php

namespace App\Http\Controllers\Admin;

use App\Enums\DetailType;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDetailRequest;
use App\Models\CarModel;
use App\Models\Detail;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DetailController extends Controller
{
    public function index()
    {
        $details = Detail::orderBy('id', 'desc')->get();

        return Inertia::render('admin/car-details', [
            'details' => $details,
            'detailTypes' => array_map(fn ($case) => [
                'value' => $case->value,
                'label' => ucfirst($case->value),
            ], DetailType::cases()),
        ]);
    }

    public function store(StoreDetailRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('picture')) {
            $file = $request->file('picture');
            $filename = time().'_'.$file->getClientOriginalName();
            $path = $file->storeAs('details', $filename, 'public');
            $validated['picture_url'] = '/storage/'.$path;
        }

        Detail::create(['price' => round($validated['price']), ...$validated]);

        return redirect()->back()->with('success', 'Car model added successfully!');
    }

    public function detachFromModel(Detail $detail, CarModel $carModel, Request $request)
    {
        $carModel->attachments()->where('detail_id', $detail->id)->forceDelete();

        return back()->with('success', 'Car detail removed.');
    }

    public function attachToModel(Detail $detail, CarModel $carModel, Request $request)
    {
        $carModel->attachments()->create([
            'detail_id' => $detail->id,
            'coords' => $request->string('coordinates', ''),
            'is_default' => $request->boolean('is_default', false),
        ]);

        return back()->with('success', 'Car detail added.');
    }

    public function update(Detail $detail, Request $request)
    {
        $validated = $request->validate([
            'price' => 'sometimes|numeric|min:0',
            'stock' => 'sometimes|integer|min:0',
        ]);

        $detail->update($validated);

        return redirect()->back()->with('success', 'Detail updated successfully!');
    }

    public function destroy(Detail $detail)
    {
        $detail->delete();

        return redirect()->back()->with('success', 'Car model deleted successfully!');
    }
}
