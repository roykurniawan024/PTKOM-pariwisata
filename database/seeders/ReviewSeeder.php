<?php

namespace Database\Seeders;

use App\Models\Destination;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;

class ReviewSeeder extends Seeder
{
    /**
     * Seed sample visitors and their approved reviews (the former dummy testimonials).
     */
    public function run(): void
    {
        $reviews = [
            [
                'name' => 'Rian Hidayat',
                'email' => 'rian.hidayat@example.com',
                'profession' => 'Travel Vlogger',
                'city' => 'Jakarta',
                'avatar_url' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
                'destination' => 'Pulau Pahawang',
                'rating' => 5,
                'comment' => 'Keindahan bawah laut Pulau Pahawang dan keramahan warga lokal membuat liburan kami sangat berkesan. Airnya jernih sekali dan terumbu karang terjaga alami!',
                'created_at' => '2026-10-12 09:00:00',
            ],
            [
                'name' => 'Sarah Wijaya',
                'email' => 'sarah.wijaya@example.com',
                'profession' => 'Fotografer Alam',
                'city' => 'Bandung',
                'avatar_url' => 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
                'destination' => 'Teluk Kiluan',
                'rating' => 5,
                'comment' => 'Menyaksikan lumba-lumba langsung di Teluk Kiluan saat matahari terbit adalah pengalaman yang tak terlupakan. Kapten perahunya sangat ramah dan berpengalaman!',
                'created_at' => '2026-09-28 09:00:00',
            ],
            [
                'name' => 'Dimas Prasetyo',
                'email' => 'dimas.prasetyo@example.com',
                'profession' => 'Backpacker & Researcher',
                'city' => 'Yogyakarta',
                'avatar_url' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
                'destination' => 'Taman Nasional Way Kambas',
                'rating' => 5,
                'comment' => 'Kombinasi sempurna antara keanekaragaman satwa Way Kambas dan keanggunan Kain Tapis Lampung. Edukasi konservasi gajahnya luar biasa.',
                'created_at' => '2026-09-05 09:00:00',
            ],
            [
                'name' => 'Maya Indah',
                'email' => 'maya.indah@example.com',
                'profession' => 'Content Creator',
                'city' => 'Surabaya',
                'avatar_url' => 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
                'destination' => 'Pantai Gigi Hiu',
                'rating' => 5,
                'comment' => 'Formasi tebing karang di Pantai Gigi Hiu benar-benar spektakuler! Sangat bagus untuk fotografi landsekap saat pemandangan matahari terbenam.',
                'created_at' => '2026-08-18 09:00:00',
            ],
            [
                'name' => 'Andi Saputra',
                'email' => 'andi.saputra@example.com',
                'profession' => 'Pendaki & Petualang',
                'city' => 'Medan',
                'avatar_url' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
                'destination' => 'Gunung Anak Krakatau',
                'rating' => 5,
                'comment' => 'Mendaki dan melihat kawah Gunung Anak Krakatau memberikan sensasi petualangan vulkanik terbaik. Pemandangannya tiada tanding!',
                'created_at' => '2026-08-02 09:00:00',
            ],
            [
                'name' => 'Nadia Putri',
                'email' => 'nadia.putri@example.com',
                'profession' => 'Wisatawan Keluarga',
                'city' => 'Palembang',
                'avatar_url' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
                'destination' => 'Menara Siger',
                'rating' => 5,
                'comment' => 'Menara Siger sebagai gerbang Sumatera sangat megah. Mengenal kebudayaan Lampung dan sejarahnya lewat museum lokal sungguh menambah wawasan.',
                'created_at' => '2026-07-20 09:00:00',
            ],
        ];

        User::unguarded(function () use ($reviews) {
            foreach ($reviews as $item) {
                $destination = Destination::where('name', $item['destination'])->first();

                if (! $destination) {
                    continue;
                }

                $user = User::firstOrCreate(
                    ['email' => $item['email']],
                    [
                        'name' => $item['name'],
                        'role' => 'user',
                        'validation_status' => 'approved',
                        'password' => Hash::make('password'),
                        'email_verified_at' => now(),
                    ]
                );

                $user->forceFill(Arr::only($item, ['profession', 'city', 'avatar_url']))->save();

                Review::updateOrCreate(
                    ['user_id' => $user->id, 'destination_id' => $destination->id],
                    [
                        'rating' => $item['rating'],
                        'comment' => $item['comment'],
                        'is_approved' => true,
                        'created_at' => $item['created_at'],
                    ]
                );
            }
        });
    }
}
