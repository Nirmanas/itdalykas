<?php

use App\Http\Controllers\Admin\CarModelController;
use App\Http\Controllers\Admin\DetailController;
use App\Http\Controllers\Admin\UserController;

Route::middleware(['employee_or_admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::group(['prefix' => 'car-models'], function () {
            Route::get('/', [CarModelController::class, 'index'])->name('car-models.index');
            Route::post('/', [CarModelController::class, 'store'])->name('car-models.store');
            Route::delete('/{carModel}', [CarModelController::class, 'destroy'])->name('car-models.destroy');
            Route::get('/{carModel}/details', [CarModelController::class, 'manageDetails'])->name('car-models.details');
            Route::post('/{carModel}/details', [CarModelController::class, 'updateDetails'])->name('car-models.details.update');
        });
        Route::group(['prefix' => 'detail-model'], function () {
            Route::post('/{detail}/{carModel}', [DetailController::class, 'attachToModel'])->name('detail-model.attach');
            Route::delete('/{detail}/{carModel}', [DetailController::class, 'detachFromModel'])->name('detail-model.detach');
        });
        Route::group(['prefix' => 'details'], function () {
            Route::get('/', [DetailController::class, 'index'])->name('details.index');
            Route::post('/', [DetailController::class, 'store'])->name('details.store');
            Route::patch('/{detail}', [DetailController::class, 'update'])->name('details.update');
            Route::delete('/{detail}', [DetailController::class, 'destroy'])->name('details.destroy');
        });
        Route::group(['prefix' => 'users', 'middleware' => 'admin'], function () {
            Route::get('/', [UserController::class, 'index'])->name('users.index');
            Route::patch('/{user}/role', [UserController::class, 'updateRole'])->name('users.update-role');
        });
});
