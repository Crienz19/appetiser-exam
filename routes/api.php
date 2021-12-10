<?php

use Illuminate\Support\Facades\Route;

Route::get('/getEvents', [App\Http\Controllers\EventController::class, 'getEvents']);
Route::post('/storeEvents', [App\Http\Controllers\EventController::class, 'storeEvents']);
