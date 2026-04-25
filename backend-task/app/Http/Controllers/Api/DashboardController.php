<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;

class DashboardController extends Controller
{
    public function index()
    {
        $totalTasks = Task::count();
        $belumDikerjakan = Task::where('status', 'Belum Dikerjakan')->count();
        $sedangDikerjakan = Task::where('status', 'Proses')->count();
        $selesai = Task::where('status', 'Selesai')->count();

        // Hitung total progress keseluruhan
        $overallProgress = $totalTasks > 0 ? Task::avg('progress') : 0;

        // Ambil 4 tugas dengan deadline paling dekat yang belum selesai
        $upcomingDeadlines = Task::with('course')
            ->where('status', '!=', 'Selesai')
            ->orderBy('deadline', 'asc')
            ->take(4)
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => [
                'statistics' => [
                    'total' => $totalTasks,
                    'belum_dikerjakan' => $belumDikerjakan,
                    'proses' => $sedangDikerjakan,
                    'selesai' => $selesai,
                    'overall_progress' => round($overallProgress)
                ],
                'upcoming_deadlines' => $upcomingDeadlines
            ]
        ]);
    }
}
