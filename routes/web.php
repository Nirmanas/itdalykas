<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'clientware'])->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/{carModel}/detail/default', [DashboardController::class, 'getDefaultDetail'])
        ->name('dashboard.detail.default');
});

require __DIR__.'/admin.php';
require __DIR__.'/client.php';
require __DIR__.'/settings.php';
