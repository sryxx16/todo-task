<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Task;
use Illuminate\Database\Seeder;

class CourseTaskSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Bikin Matkul dulu
        $webProg = Course::create([
            'name' => 'Web Programming 2',
            'lecturer_name' => 'Pak Budi Santoso',
            'semester' => 6
        ]);

        $iot = Course::create([
            'name' => 'Internet of Things',
            'lecturer_name' => 'Ibu Desi Anggraini',
            'semester' => 6
        ]);

        // 2. Bikin Tugas buat matkul tersebut
        Task::create([
            'course_id' => $webProg->id,
            'title' => 'Tugas CRUD Laravel',
            'deadline' => now()->addDays(5),
            'status' => 'Proses',
            'priority' => 'Tinggi',
            'progress' => 70
        ]);

        Task::create([
            'course_id' => $iot->id,
            'title' => 'Resume Jurnal IoT',
            'deadline' => now()->addDays(3),
            'status' => 'Selesai',
            'priority' => 'Sedang',
            'progress' => 100
        ]);
    }
}
