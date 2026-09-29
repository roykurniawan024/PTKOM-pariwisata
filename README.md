# PTKOM Pariwisata

Portal informasi pariwisata Provinsi Lampung. Wisatawan bisa menjelajahi destinasi wisata, sementara pelaku usaha pariwisata (mitra) bisa mendaftar dan divalidasi oleh admin.

## Spesifikasi Singkat (SKPL)

### Aktor

| Aktor | Deskripsi |
| --- | --- |
| Pengunjung | Pengguna tanpa akun yang melihat landing page dan destinasi. |
| User (Wisatawan) | Pengguna terdaftar dengan role `user`. |
| Business Owner (Mitra) | Pelaku usaha pariwisata dengan role `business_owner`; akunnya perlu divalidasi admin. |
| Admin | Mengelola data dan memvalidasi pendaftaran mitra. |

### Kebutuhan Fungsional

- **F-01** Menampilkan landing page beserta statistik singkat (hero stats).
- **F-02** Menampilkan daftar destinasi wisata dan detail destinasi berdasarkan slug, termasuk kategori dan galeri foto.
- **F-03** Menampilkan informasi kontak dinas pariwisata.
- **F-04** Registrasi akun sebagai wisatawan atau sebagai mitra usaha (nama usaha, jenis usaha, alamat, nomor telepon).
- **F-05** Login, logout, reset password, dan verifikasi email.
- **F-06** Mengelola profil pengguna (ubah data, hapus akun).
- **F-07** Admin memvalidasi mitra: menyetujui atau menolak (`pending` / `approved` / `rejected`) beserta alasan penolakan.
- **F-08** Menyediakan REST API publik (`/api/v1`) untuk data destinasi, statistik, dan kontak.

### Kebutuhan Non-Fungsional

- Responsif di desktop dan mobile.
- Password di-hash (bcrypt), dan rute admin/profil dilindungi autentikasi.
- Respons API berformat JSON yang konsisten (`status`, `message`, `data`).

### Tech Stack

- **Backend:** Laravel 12 (PHP 8.2+), Sanctum, Ziggy
- **Frontend:** React 19 + Inertia.js v2, Tailwind CSS 4, Vite
- **Database:** PostgreSQL (SQLite juga bisa dipakai untuk development)
- **Testing:** Pest

## Setup Lokal

### Prasyarat

- PHP >= 8.2 (dengan ekstensi `pdo_pgsql` / `pdo_sqlite`, `mbstring`, `openssl`, `fileinfo`)
- Composer
- Node.js >= 18 dan npm
- PostgreSQL (opsional kalau pakai SQLite)
- Git

### Langkah-langkah

1. **Clone repo**

   ```bash
   git clone https://github.com/roykurniawan024/PTKOM-pariwisata.git
   cd PTKOM-pariwisata
   ```

2. **Install dependency**

   ```bash
   composer install
   npm install
   ```

3. **Siapkan file environment**

   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Atur database** di `.env`

   Kalau pakai PostgreSQL (buat dulu database-nya, misalnya `ptkom_pariwisata`):

   ```env
   DB_CONNECTION=pgsql
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_DATABASE=ptkom_pariwisata
   DB_USERNAME=postgres
   DB_PASSWORD=your_password
   ```

   Kalau pakai SQLite, biarkan `DB_CONNECTION=sqlite`, lalu buat file database-nya:

   ```bash
   touch database/database.sqlite
   ```

5. **Migrasi dan seed data**

   ```bash
   php artisan migrate --seed
   ```

6. **Jalankan aplikasi**

   ```bash
   composer run dev
   ```

   Perintah ini menjalankan server Laravel, queue, log viewer, dan Vite secara bersamaan. Buka http://localhost:8000.

   Alternatifnya, jalankan di dua terminal terpisah: `php artisan serve` dan `npm run dev`.

### Perintah Lain

| Perintah | Fungsi |
| --- | --- |
| `php artisan test` | Menjalankan test (Pest) |
| `npm run build` | Build aset frontend untuk produksi |
| `vendor/bin/pint` | Merapikan format kode PHP |
| `npm run lint` / `npm run format` | Lint dan format kode frontend |
| `php artisan migrate:fresh --seed` | Reset database dan isi ulang data awal |

### Troubleshooting

- **`Unable to locate file in Vite manifest`** → jalankan `npm run dev` atau `npm run build`.
- **`could not find driver`** → aktifkan ekstensi `pdo_pgsql` (atau `pdo_sqlite`) di `php.ini`.
- **Perubahan tampilan tidak muncul** → pastikan `npm run dev` sedang berjalan, lalu hard refresh browser.

## Struktur Folder Penting

```
app/Http/Controllers/      # Controller web & API (Api/)
database/migrations/       # Skema database
database/seeders/          # Data awal (destinasi, user)
resources/js/pages/        # Halaman React (Inertia)
routes/web.php             # Rute web
routes/api.php             # Rute REST API (/api/v1)
```
