<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    // Tampilkan semua matkul + kalkulasi progress tugasnya
    public function index()
    {
        $courses = Course::with('tasks')->get()->map(function ($course) {
            $totalTasks = $course->tasks->count();
            $completedTasks = $course->tasks->where('status', 'Selesai')->count();
            $inProgressTasks = $course->tasks->where('status', 'Proses')->count();

            // Hitung rata-rata progress
            $avgProgress = $totalTasks > 0 ? $course->tasks->avg('progress') : 0;

            return [
                'id' => $course->id,
                'name' => $course->name,
                'lecturer_name' => $course->lecturer_name,
                'semester' => $course->semester,
                'total_tasks' => $totalTasks,
                'completed_tasks' => $completedTasks,
                'in_progress_tasks' => $inProgressTasks,
                'progress_percentage' => round($avgProgress)
            ];
        });

        return response()->json([
            'status' => 'success',
            'data' => $courses
        ]);
    }

    // Tambah Matkul
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'lecturer_name' => 'nullable|string|max:255',
            'semester' => 'required|integer',
        ]);

        $course = Course::create($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Mata kuliah berhasil ditambahkan!',
            'data' => $course
        ], 201);
    }

    // Hapus Matkul
    public function destroy($id)
    {
        Course::destroy($id);
        return response()->json([
            'status' => 'success',
            'message' => 'Mata kuliah berhasil dihapus!'
        ]);
    }
}
