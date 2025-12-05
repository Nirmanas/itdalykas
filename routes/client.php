<?php

use App\Http\Controllers\ForumController;

Route::middleware(['auth', 'verified'])->name('client.')->group(function () {
    Route::get('/faq', function () {
        return inertia('client/faq', []);
    })->name('faq');
    Route::group(['prefix' => '/forum'], function () {
        Route::get('/', [ForumController::class, 'index'])
            ->name('forum.index');
        Route::post('/', [ForumController::class, 'store'])
            ->name('forum.store');
    });
});
