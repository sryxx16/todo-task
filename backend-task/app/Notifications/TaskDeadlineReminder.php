<?php

namespace App\Notifications;

use App\Models\Task;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TaskDeadlineReminder extends Notification
{
    use Queueable;

    public function __construct(private readonly Task $task)
    {
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $deadline = $this->task->deadline instanceof \DateTimeInterface
            ? $this->task->deadline
            : new \DateTime($this->task->deadline);

        return (new MailMessage)
            ->subject('Pengingat Deadline Tugas')
            ->greeting('Halo, ' . $notifiable->name . '!')
            ->line('Deadline tugas kamu sudah dekat.')
            ->line('Tugas: ' . $this->task->title)
            ->line('Mata kuliah: ' . ($this->task->course?->name ?? '-'))
            ->line('Deadline: ' . $deadline->format('d M Y H:i'))
            ->line('Segera cek aplikasi TaskKuliah supaya tidak terlewat.');
    }
}
