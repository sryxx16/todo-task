<?php

namespace App\Console\Commands;

use App\Models\Task;
use App\Notifications\TaskDeadlineReminder;
use Illuminate\Console\Command;

class SendDeadlineReminderEmails extends Command
{
    protected $signature = 'tasks:send-deadline-emails';

    protected $description = 'Send email reminders for tasks with deadlines in the next two days.';

    public function handle(): int
    {
        $tasks = Task::with(['course', 'user'])
            ->whereNotNull('user_id')
            ->whereNull('deadline_email_sent_at')
            ->where('status', '!=', 'Selesai')
            ->whereBetween('deadline', [now(), now()->addDays(2)])
            ->get()
            ->filter(fn (Task $task) => (bool) $task->user?->deadline_email_notifications);

        foreach ($tasks as $task) {
            $task->user->notify(new TaskDeadlineReminder($task));
            $task->forceFill(['deadline_email_sent_at' => now()])->save();
        }

        $this->info("Sent {$tasks->count()} deadline reminder email(s).");

        return self::SUCCESS;
    }
}
