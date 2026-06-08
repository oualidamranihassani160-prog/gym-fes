<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\MembershipController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    
    Route::apiResource('members', MemberController::class);
    Route::post('/members/{member}/renew', [MemberController::class, 'renew']);
    Route::delete('/members/force/{id}', [MemberController::class, 'forceDelete']);
    Route::post('/members/restore/{id}', [MemberController::class, 'restore']);
    
    Route::apiResource('products', ProductController::class);
    
    Route::get('memberships', [MembershipController::class, 'index']);
});