<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/login/google', [AuthController::class, 'loginWithGoogle']);
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/register/google', [AuthController::class, 'registerWithGoogle']);
Route::post('/auth/email-verify', [AuthController::class, 'emailVerify']);
Route::get('/auth/account', [AuthController::class, 'getAccount']);
Route::get('/auth/logout', [AuthController::class, 'logout']);

Route::post('/auth/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/auth/reset-password', [AuthController::class, 'resetPassword']);
Route::post('/auth/change-password', [AuthController::class, 'changePassword']);

Route::get('/admin/users', [AdminController::class, 'getAllUser']);
Route::post('/admin/addUser', [AdminController::class, 'addUser']);
Route::put('/admin/updateUser/{id}', [AdminController::class, 'updateUser']);
Route::delete('/admin/deleteUser/{id}', [AdminController::class, 'deleteUser']);
