<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


//User
Route::get('users', 'UserController@index');
Route::delete('users/{id}', 'UserController@delete');
Route::get('userRut/{rut}','UserController@Srut');
Route::get('users/{id}', 'UserController@show');
Route::post('registerUser', 'UserController@store');
Route::put('users/{id}', 'UserController@update');
