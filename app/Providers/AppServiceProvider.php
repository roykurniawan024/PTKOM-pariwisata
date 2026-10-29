<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void {}

    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        VerifyEmail::toMailUsing(function (object $notifiable, string $url) {
            return (new MailMessage)
                ->subject('Verifikasi Alamat Email - Wonderly Lampung')
                ->view('emails.wonderly-auth', [
                    'title' => 'Verifikasi Alamat Email Anda',
                    'userName' => $notifiable->name ?? 'Wisatawan',
                    'intro' => 'Terima kasih telah bergabung di portal resmi pariwisata Wonderly Lampung. Silakan tekan tombol di bawah ini untuk memverifikasi akun Anda.',
                    'actionText' => 'Verifikasi Email Sekarang',
                    'actionUrl' => $url,
                    'outro' => 'Demi keamanan, tautan mentah tidak ditampilkan di dalam email ini. Jika Anda tidak merasa mendaftar, abaikan pesan ini.',
                ]);
        });

        ResetPassword::toMailUsing(function (object $notifiable, string $token) {
            $url = url(route('password.reset', ['token' => $token, 'email' => $notifiable->getEmailForPasswordReset()], false));

            return (new MailMessage)
                ->subject('Atur Ulang Kata Sandi - Wonderly Lampung')
                ->view('emails.wonderly-auth', [
                    'title' => 'Permintaan Atur Ulang Kata Sandi',
                    'userName' => $notifiable->name ?? 'Pengguna',
                    'intro' => 'Kami menerima permintaan untuk mengatur ulang kata sandi akun Wonderly Lampung Anda. Silakan tekan tombol di bawah ini untuk membuat kata sandi baru.',
                    'actionText' => 'Atur Ulang Kata Sandi',
                    'actionUrl' => $url,
                    'outro' => 'Tautan tombol ini hanya berlaku selama 60 menit. Jika Anda tidak meminta pengaturan ulang kata sandi, abaikan email ini.',
                ]);
        });
    }
}
