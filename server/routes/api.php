<?php

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');

});

//Category
Route::post('/add-category', 'CategoryController@add_category')->name('add.category');
Route::get('/all-category', 'CategoryController@all_category');
Route::get('/category/edit/{id}', 'CategoryController@edit_category');
Route::post('/category/update/{id}', 'CategoryController@update_category');
Route::get('/category/delete/{id}', 'CategoryController@delete_category');

//Tag
Route::post('/add-tag', 'TagController@add_tag')->name('add.tag');
Route::get('/all-tag', 'TagController@all_tag');
Route::get('/tag/edit/{id}', 'TagController@edit_tag');
Route::post('/tag/update/{id}', 'TagController@update_tag');
Route::get('/tag/delete/{id}', 'TagController@delete_tag');

//admin blog
Route::post('/blog/create', 'BlogController@store');
Route::get('/single-blog/{slug}', 'BlogController@show');
Route::get('/all-blog-list', 'BlogController@index');
