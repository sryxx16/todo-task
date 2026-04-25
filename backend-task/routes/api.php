<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\DashboardController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Endpoint Dashboard
Route::get('/dashboard', [DashboardController::class, 'index']);

// Endpoint Mata Kuliah
Route::get('/courses', [CourseController::class, 'index']);
Route::post('/courses', [CourseController::class, 'store']);
Route::delete('/courses/{id}', [CourseController::class, 'destroy']);



// Endpoint Tugas
Route::get('/tasks', [TaskController::class, 'index']);
Route::post('/tasks', [TaskController::class, 'store']);
Route::put('/tasks/{id}', [TaskController::class, 'update']);
Route::patch('/tasks/{id}/progress', [TaskController::class, 'updateProgress']);
Route::delete('/tasks/{id}', [TaskController::class, 'destroy']);
