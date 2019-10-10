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



Route::middleware('web','auth:admin')->group(function()
{
	Route::post('admin/logout', 'AuthController@logOut')->name('admin.logout');

	Route::resource('admin/user','UserController');

	Route::prefix('admin/user')->group(function() {
		Route::post('/data', 'UserController@data');
		Route::post('/user-active', 'UserController@userActive');
		Route::post('/viewPermission', 'UserController@viewPermission');
		Route::post('/permission', 'UserController@addPermission')->name('user.permission.add');
	});

	Route::resource('admin/profile','ProfileController');

	Route::prefix('admin/profile')->group(function() {
		Route::post('/profile-edit','ProfileController@update');
	});

});
