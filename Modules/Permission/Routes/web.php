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
	Route::resource('admin/permission','PermissionController');
	Route::prefix('admin/permission')->group(function() {
		Route::get('/user-permission', 'PermissionController@userIndex');
		Route::get('/role-permission', 'PermissionController@roleIndex');
		Route::post('/data', 'PermissionController@data');
		Route::post('/userData', 'PermissionController@userData');
		Route::post('/roleData', 'PermissionController@roleData');
		Route::post('/user-toggle/{id}', 'PermissionController@userPermissionToggle');
		Route::post('/role-toggle/{id}', 'PermissionController@rolePermissionToggle');
	});
});


