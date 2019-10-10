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

// Route::prefix('menu')->group(function() {
//     Route::get('/', 'MenuController@index');
// });


// Route::resource('booktype','BookTypeController');

// Route::prefix('admin')->middleware('web','auth:admin')->group(function() {
//     Route::get('/', 'DashboardController@index')->name('admin.dashboard');
// });


Route::group(['middleware' => ['web','auth:admin']], function()
{
	 Route::prefix('admin')->group(function() {

	Route::resource('menu','MenuController');
});
 Route::prefix('admin/menu')->group(function() {
    	// Route::resource('/','MenuController');
		Route::post('data', 'MenuController@data');
		Route::post('getSubMenus', 'MenuController@getSubMenus');
		Route::post('menuStatusChange', 'MenuController@menuStatusChange');
		Route::put('priority/update', 'MenuController@updatePriority');
	});
});