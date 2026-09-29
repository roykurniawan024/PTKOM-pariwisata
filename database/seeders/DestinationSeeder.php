<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Destination;
use App\Models\DestinationImage;
use App\Models\SiteMetric;

class DestinationSeeder extends Seeder
{
    public function run(): void
    {
        // Kategori
        $catTaman = Category::create([
            'name' => 'Taman Nasional',
            'slug' => 'taman-nasional',
            'description' => 'Kawasan pelestarian alam yang mempunyai ekosistem asli.'
        ]);

        $catPantai = Category::create([
            'name' => 'Pantai',
            'slug' => 'pantai',
            'description' => 'Wisata alam pesisir pantai dengan pemandangan indah.'
        ]);

        // Destinasi 1: Way Kambas
        $destWayKambas = Destination::create([
            'category_id' => $catTaman->id,
            'name' => 'Way Kambas',
            'slug' => 'way-kambas',
            'description' => 'Taman Nasional Way Kambas adalah taman nasional perlindungan gajah yang terletak di daerah Lampung.',
            'price' => 50000.00,
            'location' => 'Lampung Timur',
            'rating' => 4.8
        ]);

        DestinationImage::create([
            'destination_id' => $destWayKambas->id,
            'image_url' => 'https://images.unsplash.com/photo-1549475478-f7ebbe3f7ce9', // Example placeholder for elephant
            'is_primary' => true
        ]);

        // Destinasi 2: Pantai Tanjung Setia
        $destTanjungSetia = Destination::create([
            'category_id' => $catPantai->id,
            'name' => 'Pantai Tanjung Setia',
            'slug' => 'pantai-tanjung-setia',
            'description' => 'Salah satu pantai dengan ombak terbaik di dunia bagi para peselancar.',
            'price' => 25000.00,
            'location' => 'Pesisir Barat, Lampung',
            'rating' => 4.8
        ]);

        DestinationImage::create([
            'destination_id' => $destTanjungSetia->id,
            'image_url' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', // Example placeholder for beach
            'is_primary' => true
        ]);

        // Site Metrics
        SiteMetric::create([
            'total_visitors' => 1200000, // 1.2jt
            'active_users' => 47,        // 47+
            'total_bookings' => 9,       // 9
            'recorded_at' => now()->toDateString()
        ]);
    }
}
