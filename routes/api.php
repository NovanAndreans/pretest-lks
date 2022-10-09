<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\MenusTagsController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CommentController;

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

Route::post('/login', [LoginController::class, 'login']);
Route::get('/logout', [LoginController::class, 'logout']);

Route::resource('users', UserController::class);

Route::get('/categorys/all', [CategoryController::class, 'all']);
Route::resource('categorys', CategoryController::class);

Route::get('/tags/all', [TagController::class, 'all']);
Route::post('/tags/where', [TagController::class, 'where']);
Route::resource('tags', TagController::class);

Route::get('/menus/all', [MenuController::class, 'all']);
Route::post('/menus/where', [MenuController::class, 'where']);
Route::resource('menus', MenuController::class);

Route::post('/menutags', [MenusTagsController::class, 'index']);

Route::get('/dashboard', [DashboardController::class, 'index']);

Route::resource('comments', CommentController::class);
