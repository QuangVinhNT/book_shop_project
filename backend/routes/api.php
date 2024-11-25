<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\ProductController;
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
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/login/google', [AuthController::class, 'loginWithGoogle']);
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/register/google', [AuthController::class, 'registerWithGoogle']);
Route::post('/auth/email-verify', [AuthController::class, 'emailVerify']);
Route::get('/auth/account', [AuthController::class, 'getAccount']);
Route::get('/auth/logout', [AuthController::class, 'logout']);
Route::post('/auth/send-email-forgot-password', [AuthController::class, 'sendEmailForgotPassword']);
Route::post('/auth/send-code-forgot', [AuthController::class, 'emailForgotVerifyCode']);
Route::post('/auth/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/auth/reset-password', [AuthController::class, 'resetPassword']);
Route::post('/auth/change-password', [AuthController::class, 'changePassword']);

Route::get('/admin/users', [AdminController::class, 'getAllUser']);
Route::post('/admin/addUser', [AdminController::class, 'addUser']);
Route::put('/admin/updateUser/{id}', [AdminController::class, 'updateUser']);
Route::delete('/admin/deleteUser/{id}', [AdminController::class, 'deleteUser']);


Route::get('/products', [ProductController::class, 'index']);
Route::get('/product/{id}', [ProductController::class, 'getProductById']);
Route::post('/add-product', [ProductController::class, 'add']);
Route::put('/update-product/{id}', [ProductController::class, 'edit']);
Route::delete('/delete-product/{id}', [ProductController::class, 'destroy']);

Route::post('/uploads', [ImageController::class, 'uploadImages']);
Route::post('/upload', [ImageController::class, 'uploadImage']);

Route::prefix('cart')->group(function () {
    Route::get('/{id}', [CartController::class, 'index']);
    Route::post('/add', [CartController::class, 'addToCart']);
    Route::post('/decrease', [CartController::class, 'decreaseQuantity']);
    Route::post('/remove', [CartController::class, 'removeItem']);
    Route::post('/clear', [CartController::class, 'clearCart']);
    Route::get('/total/{accountId}', [CartController::class, 'calculateTotal']);
    Route::get('/quantity/{accountId}', [CartController::class, 'countQuantity']);
});

Route::post('/uploads-with-product-id', [ImageController::class, 'uploadImagesWithProductId']);
Route::post('/upload', [ImageController::class, 'uploadImage']);
