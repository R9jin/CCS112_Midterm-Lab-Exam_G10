<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController; // <-- ADD THIS LINE

// ADD YOUR API ROUTE HERE
Route::apiResource('products', ProductController::class);


// This default route is fine to leave
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});