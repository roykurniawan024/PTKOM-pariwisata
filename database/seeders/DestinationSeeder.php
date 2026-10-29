<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Destination;
use App\Models\DestinationImage;
use App\Models\SiteMetric;
use Illuminate\Database\Seeder;

class DestinationSeeder extends Seeder
{
    public function run(): void
    {
        // Kategori Pariwisata
        $catBahari = Category::firstOrCreate(['slug' => 'bahari'], [
            'name' => 'Bahari',
            'description' => 'Wisata pesona laut, terumbu karang, dan kepulauan eksotis.',
        ]);

        $catAlam = Category::firstOrCreate(['slug' => 'alam'], [
            'name' => 'Alam',
            'description' => 'Wisata pegunungan, hutan tropis, dan petualangan vulkanik.',
        ]);

        $catPantai = Category::firstOrCreate(['slug' => 'pantai'], [
            'name' => 'Pantai',
            'description' => 'Wisata pesisir pantai dengan pasir putih dan ombak berselancar.',
        ]);

        $catBudaya = Category::firstOrCreate(['slug' => 'budaya'], [
            'name' => 'Budaya',
            'description' => 'Wisata sejarah, tradisi lokal, kerajinan kain tapis, dan arsitektur Lampung.',
        ]);

        $catTaman = Category::firstOrCreate(['slug' => 'taman-nasional'], [
            'name' => 'Taman Nasional',
            'description' => 'Kawasan pelestarian alam dan konservasi satwa langka yang dilindungi.',
        ]);

        // 1. Way Kambas
        $wayKambas = $this->upsertDestination('way-kambas', [
            'category_id' => $catTaman->id,
            'name' => 'Taman Nasional Way Kambas',
            'tagline' => 'Suaka Gajah Sumatera Terbesar di Indonesia',
            'description' => 'Taman Nasional Way Kambas (TNWK) merupakan salah satu taman nasional tertua di Indonesia yang terletak di Kabupaten Lampung Timur. Kawasan ini dikenal secara internasional sebagai pusat konservasi gajah Sumatera (Elephas maximus sumatranus) yang terancam punah. Selain gajah, TNWK juga menjadi habitat bagi satwa langka lainnya seperti Badak Sumatera, Harimau Sumatera, dan berbagai jenis burung migran yang menjadikan ekosistem hutan dataran rendah ini sebagai rumah mereka.

Wisatawan yang berkunjung ke Way Kambas dapat menyaksikan secara langsung proses pelatihan dan perawatan gajah di Pusat Latihan Gajah (PLG). Pengalaman unik seperti memandikan gajah, memberi makan, hingga trekking menyusuri hutan bersama pawang gajah (mahout) menjadi daya tarik utama. Selain aspek edukasi dan konservasi, keindahan alam hutan rawa dan padang rumput yang luas memberikan suasana petualangan yang autentik bagi para pecinta alam dan fotografer satwa liar.

Bagi pengunjung yang ingin menjelajah lebih dalam, tersedia kegiatan pengamatan burung (birdwatching) dan penjelajahan sungai menggunakan perahu menyusuri aliran Way Kanan dan Way Kiri. Keheningan hutan yang diselingi suara satwa liar memberikan pengalaman yang sulit ditemukan di tempat lain. Setiap tiket masuk turut berkontribusi pada upaya pelestarian, sehingga kunjungan Anda ikut membantu menjaga kelangsungan hidup satwa-satwa langka di dalamnya.',
            'content' => 'Way Kambas menawarkan pengalaman wisata edukasi yang mendalam tentang pelestarian satwa. Pengunjung disarankan datang pada pagi hari untuk melihat aktivitas gajah saat dimandikan. Kawasan ini juga memiliki fasilitas penginapan sederhana dan pusat informasi yang lengkap mengenai keanekaragaman hayati Lampung.

Agar kunjungan lebih bermakna, luangkan waktu untuk mengikuti penjelasan dari pemandu mengenai perilaku gajah dan upaya penyelamatan satwa yang dilakukan oleh pengelola. Perjalanan dari pusat Kota Bandar Lampung memerlukan waktu beberapa jam, sehingga banyak wisatawan memilih menginap agar dapat menikmati suasana pagi hari di dalam kawasan secara lebih santai.',
            'price' => 50000.00,
            'location' => 'Lampung Timur',
            'opening_time' => '08:00:00',
            'closing_time' => '18:00:00',
            'rating' => 4.8,
            'facilities' => ['Pusat Informasi', 'Pemandu Wisata', 'Area Parkir', 'Toilet Umum', 'Kantin'],
            'tips' => ['Gunakan pakaian yang nyaman', 'Bawa lotion anti nyamuk', 'Jangan memberi makan satwa sembarangan'],
        ]);
        $this->setPrimaryImage($wayKambas, 'https://images.unsplash.com/photo-1581852017103-68ac65514cf7?auto=format&fit=crop&w=1200&q=80');

        // 2. Pantai Tanjung Setia
        $tanjungSetia = $this->upsertDestination('pantai-tanjung-setia', [
            'category_id' => $catPantai->id,
            'name' => 'Pantai Tanjung Setia',
            'tagline' => 'Surga Ombak Kelas Dunia bagi Para Peselancar',
            'description' => 'Pantai Tanjung Setia yang terletak di Kabupaten Pesisir Barat telah lama menjadi destinasi rahasia bagi para peselancar profesional dari seluruh dunia. Pantai ini memiliki ombak yang dikenal dengan sebutan "Ujung Bocur", yang mampu mencapai ketinggian 6 hingga 7 meter dengan panjang sapuan ombak hingga 200 meter. Keunikan ombaknya yang stabil dan menantang menjadikan pantai ini sebagai lokasi rutin kejuaraan selancar internasional kelas dunia.

Selain selancar, Tanjung Setia menawarkan keindahan pesisir yang masih sangat alami dengan hamparan pasir putih yang luas dan deretan pohon kelapa yang rimbun. Suasana tenang dan jauh dari hiruk pikuk perkotaan menjadikannya tempat yang sempurna untuk relaksasi. Wisatawan dapat menikmati pemandangan matahari terbenam yang spektakuler sambil mencicipi kuliner laut segar di berbagai penginapan bergaya tropis yang berjejer di sepanjang garis pantai.

Bagi pemula, tersedia kelas dan instruktur yang siap membimbing dasar-dasar berselancar di area ombak yang lebih bersahabat. Kehadiran komunitas peselancar lokal dan mancanegara juga menciptakan suasana yang hangat dan ramah, sehingga siapa pun dapat dengan mudah berbaur dan bertukar cerita. Perpaduan antara olahraga laut, keindahan alam, dan keramahan masyarakat setempat menjadikan Tanjung Setia salah satu destinasi pantai paling berkesan di Lampung.',
            'content' => 'Tanjung Setia adalah destinasi yang wajib dikunjungi bagi pecinta olahraga ekstrem dan ketenangan. Waktu terbaik untuk berselancar adalah antara bulan Mei hingga September saat ombak mencapai puncaknya. Bagi non-peselancar, aktivitas seperti memancing dan berjalan santai di tepi pantai tetap memberikan pengalaman yang tak terlupakan.

Karena lokasinya cukup jauh dari kota besar, sebaiknya rencanakan perjalanan dengan matang dan pesan penginapan lebih awal, terutama pada musim kejuaraan atau liburan panjang. Jangan lewatkan waktu sore di tepi pantai untuk menikmati senja sambil bersantai bersama keluarga atau teman.',
            'price' => 25000.00,
            'location' => 'Pesisir Barat, Lampung',
            'opening_time' => '00:00:00',
            'closing_time' => '23:59:59',
            'rating' => 4.9,
            'facilities' => ['Sewa Papan Selancar', 'Instruktur Selancar', 'Penginapan Tepi Pantai', 'Restoran', 'Area Parkir'],
            'tips' => ['Bawa perlengkapan selancar sendiri jika profesional', 'Gunakan tabir surya', 'Waspadai arus laut yang kuat'],
        ]);
        $this->setPrimaryImage($tanjungSetia, 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=80');

        // 3. Pulau Pahawang
        $pahawang = $this->upsertDestination('pulau-pahawang', [
            'category_id' => $catBahari->id,
            'name' => 'Pulau Pahawang',
            'tagline' => 'Pesona Taman Laut dan Pasir Timbul yang Eksotis',
            'description' => 'Pulau Pahawang merupakan permata pariwisata bahari Lampung yang terletak di Teluk Lampung, Kabupaten Pesawaran. Terbagi menjadi Pahawang Besar dan Pahawang Kecil, destinasi ini menawarkan keindahan bawah laut yang luar biasa dengan terumbu karang yang masih terjaga dan beragam jenis ikan hias, termasuk ikan badut (nemo) yang menjadi ikon snorkeling di sini. Air lautnya yang jernih dengan gradasi warna biru toska menciptakan pemandangan yang sangat memanjakan mata.

Salah satu fenomena alam yang paling dinanti di Pulau Pahawang adalah munculnya "Pasir Timbul" di Pahawang Kecil saat air laut surut. Jembatan pasir alami ini menghubungkan dua daratan dan menjadi spot foto favorit wisatawan. Selain snorkeling, pengunjung dapat menikmati aktivitas island hopping ke pulau-pulau sekitar seperti Pulau Kelagian, atau sekadar bersantai di cottage terapung yang memberikan pengalaman menginap unik di atas permukaan laut.

Di sisi daratan, Anda dapat bersantai di pantai berpasir, bermain kayak, atau menikmati hidangan ikan bakar segar yang disajikan oleh warga setempat. Warga pulau juga aktif menjaga kelestarian terumbu karang melalui kegiatan transplantasi dan kebersihan laut, sehingga wisata di sini berjalan seiring dengan upaya konservasi. Jarak yang relatif dekat dari Bandar Lampung membuat Pahawang cocok untuk liburan akhir pekan.',
            'content' => 'Pahawang adalah destinasi ideal untuk liburan keluarga maupun perjalanan romantis. Paket wisata biasanya sudah termasuk sewa kapal, alat snorkeling, dan makan siang dengan menu seafood lokal. Pastikan untuk menjaga kebersihan laut dan tidak menginjak terumbu karang saat melakukan aktivitas bawah laut.

Untuk pengalaman terbaik, pilih waktu kunjungan saat cuaca cerah dan laut tenang agar jarak pandang di bawah air maksimal. Menginap satu malam di pulau memberi kesempatan menikmati matahari terbit dan terbenam dengan suasana yang jauh lebih sepi dibandingkan kunjungan satu hari.',
            'price' => 250000.00,
            'location' => 'Pesawaran',
            'opening_time' => '07:00:00',
            'closing_time' => '17:00:00',
            'rating' => 4.9,
            'facilities' => ['Sewa Alat Snorkeling', 'Sewa Kapal', 'Cottage Terapung', 'Kamar Bilas', 'Warung Makan'],
            'tips' => ['Bawa kamera waterproof', 'Gunakan pelampung saat snorkeling', 'Bawa pakaian ganti yang cukup'],
        ]);
        $this->setPrimaryImage($pahawang, 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80');

        // 4. Teluk Kiluan
        $kiluan = $this->upsertDestination('teluk-kiluan', [
            'category_id' => $catBahari->id,
            'name' => 'Teluk Kiluan',
            'tagline' => 'Atraksi Lumba-Lumba Liar di Samudra Hindia',
            'description' => 'Teluk Kiluan yang berada di Kabupaten Tanggamus terkenal sebagai salah satu tempat terbaik di Indonesia untuk melihat lumba-lumba di habitat aslinya. Setiap pagi, ratusan lumba-lumba jenis hidung botol dan lumba-lumba paruh panjang muncul ke permukaan laut untuk mencari makan dan bermain. Wisatawan dapat menggunakan perahu tradisional "Jukung" untuk menuju ke tengah laut dan menyaksikan kawanan mamalia cerdas ini melompat-lompat di sekitar perahu.

Selain atraksi lumba-lumba, Teluk Kiluan juga memiliki Laguna Gayau, sebuah kolam renang alami yang terbentuk di antara bebatuan karang di tepi pantai. Airnya yang tenang dan jernih sangat kontras dengan deburan ombak besar Samudra Hindia di baliknya. Perjalanan menuju Kiluan sendiri menyuguhkan pemandangan perbukitan hijau yang asri, memberikan pengalaman wisata petualangan yang lengkap mulai dari darat hingga ke tengah samudra.

Masyarakat Kiluan mengelola wisata ini secara swadaya dengan menyediakan homestay sederhana dan pemandu lokal yang berpengalaman membaca kondisi laut. Pengunjung dapat berinteraksi langsung dengan warga, mencicipi masakan rumahan berbahan hasil laut, serta mengenal kehidupan nelayan setempat. Suasana pedesaan yang tenang dan jauh dari keramaian menjadikan Kiluan tempat yang tepat untuk melepas penat sekaligus berdekatan dengan alam.',
            'content' => 'Kiluan menawarkan kedekatan dengan alam yang luar biasa. Disarankan untuk menginap di sekitar teluk agar bisa berangkat melihat lumba-lumba pada pukul 6 pagi. Selain lumba-lumba, area ini juga kaya akan potensi memancing bagi para hobiis.

Perlu diingat bahwa kemunculan lumba-lumba bergantung pada kondisi alam sehingga tidak dapat dijamin setiap saat. Bersikaplah tenang dan ikuti arahan pemandu agar perahu tidak mengganggu satwa, sehingga pengalaman melihat lumba-lumba tetap menyenangkan dan ramah lingkungan.',
            'price' => 300000.00,
            'location' => 'Tanggamus',
            'opening_time' => '05:30:00',
            'closing_time' => '18:00:00',
            'rating' => 4.9,
            'facilities' => ['Sewa Jukung', 'Homestay', 'Pemandu Lokal', 'Warung Makan', 'Area Parkir'],
            'tips' => ['Berangkatlah sepagi mungkin', 'Siapkan fisik untuk perjalanan darat yang berliku', 'Bawa kantong plastik untuk sampah'],
        ]);
        $this->setPrimaryImage($kiluan, 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80');

        // 5. Pantai Gigi Hiu
        $gigiHiu = $this->upsertDestination('pantai-gigi-hiu', [
            'category_id' => $catPantai->id,
            'name' => 'Pantai Gigi Hiu',
            'tagline' => 'Simfoni Karang Tajam di Tepi Samudra',
            'description' => 'Pantai Gigi Hiu, atau yang juga dikenal sebagai Pantai Pegadungan, menawarkan pemandangan yang sangat berbeda dari pantai pada umumnya. Alih-alih hamparan pasir putih, pantai ini dipenuhi oleh ribuan formasi batuan karang tajam dan runcing yang menjulang tinggi hingga 10 meter. Nama "Gigi Hiu" diambil dari bentuk bebatuan tersebut yang menyerupai deretan gigi hiu yang mencuat dari dasar laut, menciptakan lanskap yang dramatis dan artistik.

Lokasi ini merupakan surga bagi para fotografer lanskap, terutama saat momen matahari terbit atau terbenam. Hempasan ombak besar Samudra Hindia yang menabrak bebatuan karang menciptakan efek kabut air yang indah saat diabadikan dengan teknik long exposure. Meskipun tidak disarankan untuk berenang karena arusnya yang sangat kuat dan bebatuan yang tajam, keindahan visual yang ditawarkan Pantai Gigi Hiu tidak akan ditemukan di tempat lain di Indonesia.

Perjalanan menuju lokasi sendiri merupakan bagian dari petualangan, melewati jalur berbukit dengan pemandangan hutan dan perkampungan yang asri. Setibanya di sana, pengunjung dapat berjalan menyusuri area berbatu untuk mencari sudut pandang terbaik, atau sekadar duduk menikmati angin laut sambil memandang hamparan Samudra Hindia. Karena kondisinya yang masih sangat alami, kehati-hatian dan kewaspadaan terhadap ombak menjadi hal yang wajib diperhatikan.',
            'content' => 'Gigi Hiu adalah destinasi visual yang menakjubkan. Akses menuju lokasi cukup menantang dan disarankan menggunakan kendaraan off-road atau ojek lokal. Pastikan membawa perlengkapan kamera yang memadai untuk menangkap keindahan struktur geologi yang unik ini.

Datanglah pada pagi atau sore hari untuk mendapatkan cahaya terbaik sekaligus menghindari terik matahari yang menyengat. Selalu perhatikan batas aman yang ditentukan warga setempat, terutama saat air pasang, dan jangan mendekati tepi karang yang licin demi keselamatan Anda.',
            'price' => 50000.00,
            'location' => 'Tanggamus',
            'opening_time' => '06:00:00',
            'closing_time' => '18:00:00',
            'rating' => 4.7,
            'facilities' => ['Spot Foto', 'Pemandu Lokal', 'Toilet Sederhana', 'Warung Kecil'],
            'tips' => ['Gunakan alas kaki yang kuat dan tidak licin', 'Waspadai ombak besar yang tiba-tiba', 'Gunakan jasa ojek lokal untuk akses lebih mudah'],
        ]);
        $this->setPrimaryImage($gigiHiu, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80');

        // 6. Menara Siger
        $menaraSiger = $this->upsertDestination('menara-siger', [
            'category_id' => $catBudaya->id,
            'name' => 'Menara Siger',
            'tagline' => 'Ikon Kebanggaan dan Gerbang Budaya Lampung',
            'description' => 'Menara Siger adalah bangunan ikonik yang berdiri megah di atas bukit di Kecamatan Bakauheni, Lampung Selatan. Bangunan ini memiliki bentuk menyerupai "Siger", yaitu mahkota pengantin wanita dalam adat Lampung yang melambangkan kehormatan dan status sosial. Berwarna kuning emas yang mencolok, menara ini berfungsi sebagai titik nol jalan lintas Sumatera dan menjadi simbol selamat datang bagi siapa pun yang baru saja menyeberang dari Pulau Jawa.

Dari puncak Menara Siger, pengunjung dapat menikmati panorama spektakuler Pelabuhan Bakauheni, Selat Sunda, dan gugusan pulau-pulau kecil di sekitarnya. Di dalam kompleks menara, terdapat berbagai informasi mengenai kebudayaan Lampung, mulai dari sejarah, pakaian adat, hingga kerajinan tangan. Tempat ini bukan hanya sekadar objek wisata, tetapi juga menjadi pusat kegiatan budaya dan kebanggaan masyarakat Lampung dalam melestarikan identitas daerah mereka.

Bagi wisatawan yang baru tiba di Sumatera, Menara Siger menjadi persinggahan pertama yang tepat untuk mengenal identitas Lampung sebelum melanjutkan perjalanan. Kios-kios di sekitar kompleks menjual oleh-oleh khas seperti keripik pisang, kopi Lampung, dan kain tapis yang dapat dibawa pulang sebagai kenang-kenangan. Dengan suasana yang nyaman dan pemandangan yang indah, tempat ini cocok dikunjungi bersama keluarga maupun rombongan.',
            'content' => 'Menara Siger adalah tempat terbaik untuk melihat kesibukan gerbang Sumatera dari ketinggian. Area ini sangat indah dikunjungi pada sore hari saat lampu-lampu pelabuhan mulai menyala. Terdapat area parkir yang luas dan beberapa kios yang menjual oleh-oleh khas Lampung seperti keripik pisang dan kopi.

Karena letaknya tidak jauh dari Pelabuhan Bakauheni, tempat ini mudah dijadikan persinggahan singkat di sela perjalanan darat maupun penyeberangan. Luangkan waktu untuk mempelajari informasi budaya yang tersedia agar kunjungan terasa lebih bermakna.',
            'price' => 25000.00,
            'location' => 'Lampung Selatan',
            'opening_time' => '06:00:00',
            'closing_time' => '20:00:00',
            'rating' => 4.6,
            'facilities' => ['Menara Pandang', 'Pusat Informasi Budaya', 'Kios Oleh-oleh', 'Area Parkir', 'Toilet'],
            'tips' => ['Datanglah saat cuaca cerah untuk pandangan maksimal', 'Siapkan kamera untuk foto ikonik', 'Jaga kebersihan area menara'],
        ]);
        $this->setPrimaryImage($menaraSiger, 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80');

        // 7. Gunung Anak Krakatau
        $krakatau = $this->upsertDestination('gunung-anak-krakatau', [
            'category_id' => $catAlam->id,
            'name' => 'Gunung Anak Krakatau',
            'tagline' => 'Legenda Vulkanik yang Terus Bertumbuh',
            'description' => 'Gunung Anak Krakatau adalah salah satu gunung api paling aktif dan terkenal di dunia yang terletak di Selat Sunda. Muncul setelah letusan dahsyat Gunung Krakatau pada tahun 1883, gunung ini terus bertumbuh dan menawarkan fenomena geologi yang luar biasa. Wisatawan dapat melakukan perjalanan ekspedisi menggunakan kapal dari Lampung Selatan untuk mendekati kawasan cagar alam ini dan menyaksikan keperkasaan alam dari dekat.

Aktivitas utama di sini adalah trekking mendaki lereng gunung hingga batas aman yang ditentukan untuk melihat kawah aktif dan hamparan pasir vulkanik hitam yang luas. Dari ketinggian, pengunjung akan disuguhi pemandangan laut biru yang kontras dengan daratan vulkanik yang gersang namun eksotis. Selain nilai sejarah dan geologinya, perairan di sekitar kepulauan Krakatau juga memiliki spot snorkeling yang indah dengan terumbu karang yang mulai pulih dan beragam biota laut.

Kawasan ini juga menjadi laboratorium alam yang menarik bagi pelajar, peneliti, dan pencinta ilmu kebumian karena memperlihatkan bagaimana kehidupan perlahan kembali tumbuh di tanah vulkanik. Pulau-pulau di sekitarnya, seperti Pulau Sebesi dan Pulau Sebuku, menawarkan suasana pantai yang tenang dan keramahan warga setempat. Kombinasi antara petualangan, sejarah, dan keindahan bahari menjadikan perjalanan ke Anak Krakatau pengalaman yang sulit dilupakan.',
            'content' => 'Ekspedisi Krakatau adalah perjalanan yang memacu adrenalin sekaligus edukatif. Pengunjung wajib mematuhi instruksi pemandu dan status aktivitas gunung api dari pihak berwenang. Perjalanan biasanya memakan waktu satu hari penuh (full day tour) termasuk snorkeling di Pulau Sebuku atau Pulau Sebesi.

Karena aktivitas gunung api dapat berubah sewaktu-waktu, akses pendakian bisa dibatasi atau ditutup demi keselamatan. Periksa kondisi terbaru sebelum berangkat, siapkan stamina yang baik, dan bawa perlengkapan pelindung seperti topi, kacamata, serta air minum yang cukup selama perjalanan.',
            'price' => 500000.00,
            'location' => 'Lampung Selatan',
            'opening_time' => '05:00:00',
            'closing_time' => '17:00:00',
            'rating' => 4.9,
            'facilities' => ['Kapal Ekspedisi', 'Pemandu Berlisensi', 'Alat Snorkeling', 'Makan Siang', 'Izin Masuk Cagar Alam'],
            'tips' => ['Gunakan sepatu trekking yang memadai', 'Bawa masker untuk debu vulkanik', 'Pastikan kondisi fisik dalam keadaan prima'],
        ]);
        $this->setPrimaryImage($krakatau, 'https://images.unsplash.com/photo-1608953154378-b19b808a974b?auto=format&fit=crop&w=1200&q=80');

        // Site Metrics
        SiteMetric::firstOrCreate(
            ['recorded_at' => now()->toDateString()],
            [
                'total_visitors' => 1200000, // 1.2jt
                'active_users' => 47,        // 47+
                'total_bookings' => 9,       // 9
            ]
        );
    }

    /**
     * Create the destination, or refresh its content on re-seed. The rating is only
     * set on creation because it is recalculated from approved reviews afterwards.
     *
     * @param  array<string, mixed>  $attributes
     */
    private function upsertDestination(string $slug, array $attributes): Destination
    {
        $destination = Destination::firstOrNew(['slug' => $slug]);

        $destination->fill($destination->exists ? array_diff_key($attributes, ['rating' => true]) : $attributes)->save();

        return $destination;
    }

    /**
     * Keep exactly one seeded primary image per destination, without touching
     * images uploaded through the admin or partner panels.
     */
    private function setPrimaryImage(Destination $destination, string $url): void
    {
        $primaryImages = $destination->images()->where('is_primary', true)->get();

        if ($primaryImages->contains(fn (DestinationImage $image) => str_starts_with($image->image_url, '/storage/'))) {
            return;
        }

        $primaryImages->where('image_url', '!=', $url)->each->delete();

        $destination->images()->firstOrCreate(['image_url' => $url], ['is_primary' => true]);
    }
}
