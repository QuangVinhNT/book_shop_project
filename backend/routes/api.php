<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\ProductController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {});

Route::get('/products', [ProductController::class, 'index']);
Route::get('/product/{id}', [ProductController::class, 'getProductById']);
Route::post('/add-product', [ProductController::class, 'add']);
Route::put('/update-product/{id}', [ProductController::class, 'update']);
Route::delete('/delete-product/{id}', [ProductController::class, 'destroy']);

// Route::post('/login', [AuthController::class, 'login']);
// Route::post('/register', [AuthController::class, 'register']);
// Route::get('/verify-email/{token}', [AuthController::class, 'verifyEmail']);
// Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
// Route::post('/reset-password', [AuthController::class, 'resetPassword']);
// Route::post('/change-password', [AuthController::class, 'changePassword']);
// Route::post('/logout', [AuthController::class, 'logout']);

Route::post('/uploads', [ImageController::class, 'uploadImages']);
Route::post('/upload', [ImageController::class, 'uploadImage']);

Route::get('/cart/{id}', [CartController::class, 'index']);
Route::post('/cart/add', [CartController::class, 'addToCart']);
Route::post('/cart/decrease', [CartController::class, 'decreaseQuantity']);
Route::post('/cart/remove', [CartController::class, 'removeItem']);
Route::post('/cart/clear', [CartController::class, 'clearCart']);
Route::get('/cart/total/{accountId}', [CartController::class, 'calculateTotal']);
