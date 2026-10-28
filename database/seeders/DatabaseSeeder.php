<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // Role dan status validasi tidak mass assignable, jadi seeder membukanya secara eksplisit.
        User::unguard();

        // Akun Pengguna Biasa (Wisatawan)
        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Wisatawan Test',
                'role' => 'user',
                'validation_status' => 'approved',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]
        );

        // Akun Administrator
        User::firstOrCreate(
            ['email' => 'admin@pariwisatalampung.go.id'],
            [
                'name' => 'Administrator Pariwisata',
                'role' => 'admin',
                'validation_status' => 'approved',
                'password' => bcrypt('admin123'),
                'email_verified_at' => now(),
            ]
        );

        // Akun Mitra Usaha (Contoh Menunggu Validasi)
        User::firstOrCreate(
            ['email' => 'mitra@pariwisatalampung.go.id'],
            [
                'name' => 'Budi Santoso',
                'role' => 'business_owner',
                'business_name' => 'Pindang Meranjat Asli Lampung',
                'business_type' => 'kuliner',
                'business_address' => 'Jl. Wolter Monginsidi No. 45, Bandar Lampung',
                'phone_number' => '+62 812-9876-5432',
                'validation_status' => 'pending',
                'password' => bcrypt('mitra123'),
                'email_verified_at' => now(),
            ]
        );

        User::reguard();

        $this->call([
            DestinationSeeder::class,
            ReviewSeeder::class,
        ]);
    }
}
