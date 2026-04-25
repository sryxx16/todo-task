<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('tasks', function (Blueprint $table) {
        $table->id();
        $table->foreignId('course_id')->constrained()->cascadeOnDelete(); // Relasi ke tabel courses
        $table->string('title'); // Contoh: "Tugas CRUD Laravel"
        $table->dateTime('deadline'); // Tanggal deadline
        $table->enum('status', ['Belum Dikerjakan', 'Proses', 'Selesai'])->default('Belum Dikerjakan');
        $table->enum('priority', ['Rendah', 'Sedang', 'Tinggi'])->default('Sedang');
        $table->integer('progress')->default(0); // Persentase 0 - 100
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};