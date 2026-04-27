<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('deadline_email_notifications')->default(true)->after('password');
        });

        Schema::table('tasks', function (Blueprint $table) {
            $table->timestamp('deadline_email_sent_at')->nullable()->after('deadline');
        });
    }

    public function down(): void
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->dropColumn('deadline_email_sent_at');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('deadline_email_notifications');
        });
    }
};
