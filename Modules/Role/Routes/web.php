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
Route::group(['middleware' => ['web','auth:admin']], function()
{
	Route::resource('admin/role','RoleController');
	Route::prefix('admin/role')->group(function() {
		Route::post('/data', 'RoleController@data');
	});
});
