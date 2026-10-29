<?php

namespace Database\Seeders;

use App\Models\Destination;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ReviewSeeder extends Seeder
{
    /**
     * Membuat avatar berdasarkan inisial nama pengunjung.
     */
    private function initialsAvatar(string $name): string
    {
        return 'https://ui-avatars.com/api/?name=' . urlencode($name)
            . '&size=200&background=random&color=fff&bold=true';
    }

    public function run(): void
    {
        // Data pengunjung contoh.
        $visitors = [
            [
                'name' => 'Rian Hidayat',
                'email' => 'rian.hidayat@example.com',
                'profession' => 'Travel Vlogger',
                'city' => 'Jakarta',
                'avatar_url' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
            ],
            [
                'name' => 'Sarah Wijaya',
                'email' => 'sarah.wijaya@example.com',
                'profession' => 'Fotografer Alam',
                'city' => 'Bandung',
                'avatar_url' => 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
            ],
            [
                'name' => 'Dimas Prasetyo',
                'email' => 'dimas.prasetyo@example.com',
                'profession' => 'Backpacker',
                'city' => 'Yogyakarta',
                'avatar_url' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
            ],
            [
                'name' => 'Maya Indah',
                'email' => 'maya.indah@example.com',
                'profession' => 'Content Creator',
                'city' => 'Surabaya',
                'avatar_url' => 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
            ],
            [
                'name' => 'Andi Saputra',
                'email' => 'andi.saputra@example.com',
                'profession' => 'Pecinta Alam',
                'city' => 'Medan',
                'avatar_url' => 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
            ],
            [
                'name' => 'Nadia Putri',
                'email' => 'nadia.putri@example.com',
                'profession' => 'Wisatawan Keluarga',
                'city' => 'Palembang',
                'avatar_url' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
            ],
            [
                'name' => 'Fitri Anggraini',
                'email' => 'fitri.anggraini@example.com',
                'profession' => 'Guru',
                'city' => 'Bandar Lampung',
                'avatar_url' => $this->initialsAvatar('Fitri Anggraini'),
            ],
            [
                'name' => 'Bagas Nugroho',
                'email' => 'bagas.nugroho@example.com',
                'profession' => 'Software Engineer',
                'city' => 'Tangerang',
                'avatar_url' => $this->initialsAvatar('Bagas Nugroho'),
            ],
            [
                'name' => 'Lestari Dewi',
                'email' => 'lestari.dewi@example.com',
                'profession' => 'Dokter Umum',
                'city' => 'Semarang',
                'avatar_url' => $this->initialsAvatar('Lestari Dewi'),
            ],
            [
                'name' => 'Yoga Pratama',
                'email' => 'yoga.pratama@example.com',
                'profession' => 'Peselancar Amatir',
                'city' => 'Bali',
                'avatar_url' => $this->initialsAvatar('Yoga Pratama'),
            ],
            [
                'name' => 'Citra Maharani',
                'email' => 'citra.maharani@example.com',
                'profession' => 'Mahasiswa',
                'city' => 'Bogor',
                'avatar_url' => $this->initialsAvatar('Citra Maharani'),
            ],
            [
                'name' => 'Hendra Kusuma',
                'email' => 'hendra.kusuma@example.com',
                'profession' => 'Pengusaha',
                'city' => 'Makassar',
                'avatar_url' => $this->initialsAvatar('Hendra Kusuma'),
            ],
        ];

        // Enam ulasan untuk setiap destinasi.
        // Destinasi yang belum memiliki ulasan khusus memakai template cadangan.
        $reviewsBySlug = [
            'way-kambas' => [
                [5, 'Memandikan gajah di pagi hari jadi pengalaman paling berkesan. Anak-anak saya senang sekali dan pawangnya sabar menjelaskan.'],
                [5, 'Tempat yang tepat untuk belajar soal konservasi gajah Sumatera. Penjelasan pemandunya jelas dan tidak terburu-buru.'],
                [4, 'Kawasannya luas dan asri. Sebaiknya datang pagi dan bawa lotion antinyamuk, karena di area hutan cukup banyak nyamuk.'],
                [5, 'Sebagai fotografer, saya puas. Cahaya pagi di padang rumput dan interaksi gajah dengan pawangnya bagus sekali untuk diabadikan.'],
                [4, 'Perjalanan dari Bandar Lampung lumayan jauh, tapi sepadan. Fasilitas dan pusat informasinya membantu memahami satwa di sini.'],
                [5, 'Wisata edukasi yang cocok untuk keluarga. Kunjungan ini menjadi kesempatan belajar tentang pelestarian satwa.'],
            ],

            'pantai-tanjung-setia' => [
                [5, 'Ombaknya terkenal bagus untuk berselancar. Saya menikmati pemandangan para peselancar dari tepi pantai.'],
                [5, 'Pantai ini menjadi salah satu spot favorit saya. Ombaknya menarik dan penginapan di sekitarnya cukup nyaman.'],
                [4, 'Pantainya bersih dan cocok untuk melepas penat. Sebaiknya pesan penginapan lebih awal karena perjalanan cukup jauh.'],
                [5, 'Matahari terbenam di sini luar biasa. Pasir putih, pohon kelapa, dan suara ombak membuat suasananya tenang.'],
                [4, 'Pemandangannya indah, tetapi tetap waspada terhadap arus laut yang kuat.'],
                [5, 'Warga sekitar ramah dan makanan laut di warung sekitar pantai menarik untuk dicoba.'],
            ],

            'pulau-pahawang' => [
                [5, 'Snorkeling di Pahawang sangat menyenangkan. Saya menikmati pemandangan bawah laut dan ikan-ikan di sekitar karang.'],
                [5, 'Pasir timbul di Pahawang Kecil cantik untuk foto. Datang saat air surut agar pemandangannya lebih maksimal.'],
                [4, 'Paket wisatanya praktis untuk liburan akhir pekan. Pastikan fasilitas yang dibutuhkan sudah termasuk dalam paket.'],
                [5, 'Menginap di sekitar pulau menjadi pengalaman unik. Pemandangan laut pada pagi hari sangat menenangkan.'],
                [5, 'Air lautnya terlihat indah dan suasananya cocok untuk berlibur bersama teman maupun keluarga.'],
                [4, 'Tempatnya indah, tetapi saat akhir pekan bisa ramai. Pilih hari biasa jika ingin suasana lebih sepi.'],
            ],

            'teluk-kiluan' => [
                [5, 'Melihat lumba-lumba di laut menjadi pengalaman yang tidak terlupakan.'],
                [5, 'Pemandangan lautnya indah dan suasana di sekitar penginapan terasa tenang.'],
                [4, 'Perjalanan darat cukup panjang, tetapi pemandangannya menarik. Kemunculan lumba-lumba bergantung pada kondisi alam.'],
                [5, 'Pemandu lokal membantu menjelaskan kondisi laut dan pentingnya menjaga jarak dari satwa liar.'],
                [5, 'Menginap di desa pesisir memberikan pengalaman berbeda. Masakan rumahan dari hasil laut juga menarik untuk dicoba.'],
                [4, 'Tempatnya cocok untuk mencari suasana baru. Siapkan kebutuhan pribadi sebelum berangkat.'],
            ],

            'pantai-gigi-hiu' => [
                [5, 'Pemandangan karangnya dramatis dan berbeda dari pantai lainnya.'],
                [5, 'Cocok untuk fotografi lanskap. Cahaya sore membuat formasi karangnya terlihat semakin menarik.'],
                [4, 'Jalan menuju lokasi cukup menantang. Gunakan alas kaki yang kuat dan berhati-hati saat berjalan.'],
                [5, 'Pemandangan laut dan formasi batu karangnya sangat menarik untuk dinikmati.'],
                [4, 'Indah sekali, tetapi tidak cocok untuk berenang sembarangan karena kondisi ombak dan karang.'],
                [5, 'Perjalanan menuju lokasi terasa sepadan dengan pemandangan alam yang didapatkan.'],
            ],

            'menara-siger' => [
                [5, 'Menara ini menjadi tempat persinggahan menarik setelah menyeberang dari Jawa.'],
                [4, 'Pemandangan Pelabuhan Bakauheni dan Selat Sunda terlihat menarik, terutama saat sore hari.'],
                [5, 'Tempat ini membantu saya mengenal siger sebagai salah satu simbol budaya Lampung.'],
                [4, 'Lokasinya cocok untuk berhenti sejenak dan membeli oleh-oleh sebelum melanjutkan perjalanan.'],
                [5, 'Bentuk bangunannya ikonik dan menarik untuk dijadikan latar foto.'],
                [4, 'Mudah dijangkau dari kawasan pelabuhan dan cocok untuk kunjungan singkat.'],
            ],

            'gunung-anak-krakatau' => [
                [5, 'Pemandangan gunung dan laut di sekitarnya sangat menarik.'],
                [5, 'Perjalanan dengan pemandu memberikan pengalaman sekaligus pengetahuan tentang kawasan vulkanik.'],
                [4, 'Bawa perlengkapan yang cukup dan perhatikan kondisi cuaca sebelum melakukan perjalanan.'],
                [5, 'Pemandangan laut di sekitar kawasan ini menjadi bagian menarik dari perjalanan.'],
                [5, 'Tempat ini memiliki nilai sejarah dan edukasi yang menarik untuk dipelajari.'],
                [4, 'Rencana kunjungan harus mengikuti aturan keselamatan dan status aktivitas gunung terbaru.'],
            ],
        ];

        $fallbackTemplates = [
            [5, 'Pengalaman berkunjung ke %s sangat menyenangkan. Pemandangannya indah dan suasananya membuat saya ingin kembali lagi.'],
            [5, '%s memiliki daya tarik yang unik. Cocok untuk menikmati liburan bersama teman dan keluarga.'],
            [4, 'Saya senang bisa mengunjungi %s. Pengalaman wisatanya berkesan dan tempat ini layak masuk daftar destinasi liburan di Lampung.'],
            [5, 'Kunjungan ke %s memberikan pengalaman menarik. Saya menikmati suasana dan pemandangan di sekitarnya.'],
            [4, 'Suasana di %s nyaman untuk bersantai. Sebaiknya rencanakan kunjungan agar bisa menikmati tempatnya dengan leluasa.'],
            [5, '%s memiliki pemandangan yang menarik dan layak dipertimbangkan sebagai tujuan wisata di Lampung.'],
        ];

        $destinations = Destination::query()
            ->orderBy('id')
            ->get();

        if ($destinations->isEmpty()) {
            $this->command?->warn(
                'Belum ada destinasi. Jalankan DestinationSeeder terlebih dahulu.'
            );

            return;
        }

        // Buat atau perbarui profil pengunjung contoh satu kali.
        $users = [];

        foreach ($visitors as $visitor) {
            $user = User::firstOrCreate(
                ['email' => $visitor['email']],
                [
                    'name' => $visitor['name'],
                    'role' => 'user',
                    'validation_status' => 'approved',
                    'password' => Hash::make('password'),
                    'email_verified_at' => now(),
                ]
            );

            $user->forceFill([
                'profession' => $visitor['profession'],
                'city' => $visitor['city'],
                'avatar_url' => $visitor['avatar_url'],
            ])->save();

            $users[] = $user;
        }

        $visitorCount = count($users);
        $total = 0;

        foreach ($destinations as $destinationIndex => $destination) {
            $reviews = $reviewsBySlug[$destination->slug] ?? $fallbackTemplates;

            // Pastikan enam ulasan tersedia untuk setiap destinasi.
            $reviews = array_slice(
                array_merge($reviews, $fallbackTemplates),
                0,
                6
            );

            foreach ($reviews as $reviewIndex => [$rating, $comment]) {
                // Rotasi pengunjung agar ulasan tersebar di antara akun contoh.
                $userIndex = (
                    ($destinationIndex * 6) + $reviewIndex
                ) % $visitorCount;

                $user = $users[$userIndex];

                if (str_contains($comment, '%s')) {
                    $comment = sprintf($comment, $destination->name);
                }

                Review::updateOrCreate(
                    [
                        'user_id' => $user->id,
                        'destination_id' => $destination->id,
                    ],
                    [
                        'rating' => $rating,
                        'comment' => $comment,
                        'is_approved' => true,
                        'created_at' => now()
                            ->subDays(($destinationIndex * 6) + $reviewIndex + 1)
                            ->setTime(9, 0),
                    ]
                );

                $total++;
            }
        }

        $this->command?->info(
            "Seeder ulasan selesai: {$total} ulasan untuk "
            . $destinations->count()
            . ' destinasi.'
        );
    }
}