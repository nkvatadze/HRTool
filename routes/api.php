<?php

use App\Http\Controllers\API\CandidateController;
use App\Http\Controllers\API\HomeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/', HomeController::class)->name('home.index');

Route::prefix('candidates')
    ->controller(CandidateController::class)
    ->name('candidates.')
    ->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/', 'store')->name('store');
        Route::get('/{candidate}', 'show')->name('show');
        Route::get('/{candidate}/cv', 'downloadCV')->name('download.cv');
        Route::patch('{candidate}', 'update')->name('update');
        Route::delete('{candidate}', 'destroy')->name('destroy');
    });
