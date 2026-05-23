<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TourController;
use App\Http\Controllers\TravelController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TravelerController;
use App\Models\Tour;
use App\Models\Travel;
use App\Models\User;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('admin/users/create', [UserController::class, 'store'])
        ->name('users.store')
        ->can('create', User::class);

    Route::controller(TravelController::class)->group(function () {
        Route::post('admin/travels/create', 'store')
            ->name('travel.store')
            ->can('create', Travel::class);

        Route::patch('editor/travels/{travel}/update', 'update')
            ->name('travel.update')
            ->can('update', 'travel');
            
        Route::delete('admin/travels/{travel}', 'destroy')
            ->name('travel.destroy')
            ->can('update', 'travel');
    });

    Route::controller(TourController::class)->group(function () {
        Route::post('admin/travels/{travel}/tours/create', 'store')
            ->name('tours.store')
            ->can('create', Tour::class);
            
        Route::patch('admin/travels/{travel}/tours/{tour}/update', 'update')
            ->name('tours.update')
            ->can('create', Tour::class);
            
        Route::delete('admin/travels/{travel}/tours/{tour}', 'destroy')
            ->name('tours.destroy')
            ->can('create', Tour::class);
    });

    Route::controller(TravelerController::class)->group(function () {
        Route::get('admin/tours/{tour}/travelers', 'index')->name('travelers.index')->can('create', Tour::class);
        Route::post('admin/tours/{tour}/travelers', 'store')->name('travelers.store')->can('create', Tour::class);
        Route::delete('admin/tours/{tour}/travelers/{traveler}', 'destroy')->name('travelers.destroy')->can('create', Tour::class);
    });

    Route::post('logout', [AuthController::class, 'logout'])->name('logout');
});

Route::post('login', [AuthController::class, 'login'])->name('login');
Route::get('travels', [TravelController::class, 'index'])->name('travel.index');
Route::get('tours/{travel}', [TourController::class, 'index'])->name('tours.index');
