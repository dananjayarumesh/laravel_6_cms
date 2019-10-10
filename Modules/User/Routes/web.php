<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::prefix('admin')->middleware('web','guest:admin')->group(function() {

Route::get('login', 'AuthController@login')->name('admin.login');
Route::post('login', 'AuthController@submitLogin')->name('admin.login.submit');
});

Route::prefix('admin')->middleware('web','auth:admin')->group(function() {
    Route::get('user', 'UserController@index');
});
