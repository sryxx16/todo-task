<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\Course;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // 1. Tampilkan semua tugas
    public function index()
    {
        $tasks = Task::with('course')->orderBy('deadline', 'asc')->get();
        return response()->json([
            'status' => 'success',
            'data' => $tasks
        ]);
    }

    // 2. Tampilkan semua mata kuliah (Buat pilihan di form)
    public function getCourses()
    {
        return response()->json([
            'status' => 'success',
            'data' => Course::all()
        ]);
    }

    // 3. Simpan tugas baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'title' => 'required|string|max:255',
            'deadline' => 'required|date',
            'priority' => 'required|in:Rendah,Sedang,Tinggi',
        ]);

        $task = Task::create([
            'course_id' => $validated['course_id'],
            'title' => $validated['title'],
            'deadline' => $validated['deadline'],
            'priority' => $validated['priority'],
            'status' => 'Belum Dikerjakan', // Default pas awal bikin
            'progress' => 0
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Tugas berhasil ditambahkan!',
            'data' => $task->load('course')
        ], 201);
    }

    // 4. Update data tugas (Misal salah nulis judul atau ganti deadline)
    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);

        $task->update($request->only(['title', 'course_id', 'deadline', 'priority']));

        return response()->json([
            'status' => 'success',
            'message' => 'Detail tugas berhasil diupdate!',
            'data' => $task->load('course')
        ]);
    }

    // 5. Update Progress & Status (Fitur utama biar gampang digeser)
    public function updateProgress(Request $request, $id)
    {
        $request->validate([
            'progress' => 'required|integer|min:0|max:100',
            'status' => 'required|in:Belum Dikerjakan,Proses,Selesai'
        ]);

        $task = Task::findOrFail($id);
        $task->update([
            'progress' => $request->progress,
            'status' => $request->status
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Progress berhasil diupdate!',
            'data' => $task
        ]);
    }

    // 6. Hapus tugas
    public function destroy($id)
    {
        Task::destroy($id);
        return response()->json([
            'status' => 'success',
            'message' => 'Tugas berhasil dihapus!'
        ]);
    }
}
