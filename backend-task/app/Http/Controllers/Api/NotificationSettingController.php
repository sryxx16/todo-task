<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NotificationSettingController extends Controller
{
    public function show(Request $request)
    {
        return response()->json([
            'data' => [
                'deadline_email_notifications' => (bool) $request->user()->deadline_email_notifications,
            ],
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'deadline_email_notifications' => 'required|boolean',
        ]);

        $request->user()->update($validated);

        return response()->json([
            'message' => 'Pengaturan notifikasi berhasil disimpan.',
            'data' => [
                'deadline_email_notifications' => (bool) $request->user()->deadline_email_notifications,
            ],
        ]);
    }
}
