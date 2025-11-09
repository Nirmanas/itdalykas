<?php


Route::middleware(['admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {

});
