# Rencana Kerja Backend (Backend Improvement & Gap Resolution Plan)

Dokumen ini merangkum analisis lengkap mengenai kekurangan, celah keamanan, bug teknis, diskoneksi integrasi frontend, dan rencana perbaikan terstruktur untuk sisi **Backend** pada proyek **PTKOM Pariwisata (Provinsi Lampung)**.

---

## 📌 Ringkasan Status Backend Saat Ini

- **Framework:** Laravel 12 (PHP 8.2+)
- **Database Driver:** SQLite (Development) / PostgreSQL (Production)
- **Komponen Utama:** REST API v1 (`/api/v1`), Alur Registrasi Berbasis Token (`RegistrationFlowController`), Manajemen Validasi Mitra Usaha (`BusinessValidationController`).
- **Status Integrasi:** Backend API sudah berjalan, namun halaman publik frontend masih menggunakan data *mock* (hardcoded) karena belum diinjeksi dari controller backend.

---

## 🔍 Temuan Kekurangan & Masalah Mendalam

### 1. [P0 - Kritis] Bug Pencarian API Crash pada SQLite (`ilike` Operator)
- **Lokasi Berkas:** `app/Http/Controllers/Api/DestinationController.php` (Baris 24–26)
- **Permasalahan:** Operator `ilike` hanya didukung oleh PostgreSQL. Pada database development (SQLite) atau MySQL, pemanggilan `GET /api/v1/destinations?search=...` memicu fatal error:
  `SQLSTATE[HY000]: General error: 1 near "ilike": syntax error`.
- **Dampak:** Pengunjung web tidak dapat mencari destinasi wisata.
- **Solusi Teknis:**
  Gunakan deteksi driver database atau gunakan operator `LIKE` standar:
  ```php
  $operator = config('database.default') === 'pgsql' ? 'ilike' : 'like';
  $query->where(function ($q) use ($search, $operator) {
      $q->where('name', $operator, "%{$search}%")
        ->orWhere('description', $operator, "%{$search}%")
        ->orWhere('location', $operator, "%{$search}%");
  });
  ```

---

### 2. [P0 - Keamanan] Rute Admin Validasi Mitra Tanpa Proteksi Role (Broken Access Control)
- **Lokasi Berkas:** `routes/web.php` (Baris 31–34)
- **Permasalahan:** Rute `/admin/validasi-mitra` hanya dilindungi middleware `auth`. Pengguna biasa dengan `role = 'user'` atau mitra yang login dapat mengakses panel admin dan mengubah status persetujuan mitra usaha.
- **Dampak:** Celah eskalasi hak akses (*security privilege escalation*).
- **Solusi Teknis:**
  1. Buat middleware `app/Http/Middleware/EnsureUserIsAdmin.php`:
     ```php
     if ($request->user()?->role !== 'admin') {
         abort(403, 'Akses ditolak. Halaman ini hanya untuk Administrator.');
     }
     ```
  2. Lindungi rute admin di `routes/web.php` dengan middleware tersebut.

---

### 3. [P1 - Integrasi Frontend] Halaman Publik Masih Menggunakan Data Mock (Hardcoded)
- **Lokasi Berkas:** `routes/web.php` (Baris 9–21), `resources/js/pages/Index.jsx`, `resources/js/pages/Destinations/Index.jsx`
- **Permasalahan:** 
  - Rute `/` dan `/destinations` hanya merender komponen Inertia kosong tanpa mengirimkan data dari database (`destinations`, `categories`, `statistics`).
  - Frontend terpaksa menggunakan data statis/array tiruan (*"Data sementara sampai endpoint /api/v1/destinations dipakai"*).
  - Perubahan data di database tidak tercermin di tampilan website.
- **Solusi Teknis:**
  Buat `HomeController.php` atau oper data langsung dari `routes/web.php` ke Inertia props:
  ```php
  Route::get('/', function () {
      return Inertia::render('Index', [
          'destinations' => Destination::with(['category', 'images'])->latest()->take(6)->get(),
          'categories' => Category::all(),
          'metrics' => SiteMetric::latest('recorded_at')->first(),
      ]);
  });
  ```

---

### 4. [P1 - Endpoint API] Ketiadaan Endpoint Kategori Destinasi (`/api/v1/categories`)
- **Lokasi Berkas:** `routes/api.php`
- **Permasalahan:** Terdapat endpoint untuk destinasi, namun tidak ada endpoint REST untuk mengambil daftar kategori (`Category`). Klien web atau aplikasi mobile terpaksa meng-hardcode kategori pariwisata.
- **Solusi Teknis:**
  Tambahkan controller dan rute:
  ```php
  Route::get('/categories', [CategoryController::class, 'index']);
  ```
  Format respon:
  ```json
  {
    "status": "success",
    "message": "Categories retrieved successfully",
    "data": [ ... ]
  }
  ```

---

### 5. [P1 - Standar Kontrak API] Ketidaksesuaian Parameter Detail Destinasi (`api_spec.md`)
- **Lokasi Berkas:** `routes/api.php` & `app/Http/Controllers/Api/DestinationController.php`
- **Permasalahan:** Dokumen spesifikasi API menetapkan `/api/v1/destinations/:id` menerima UUID, sedangkan controller hanya mencari berdasarkan `slug`.
- **Solusi Teknis:**
  Dukung pencarian fleksibel berdasarkan `slug` ATAU `id` (UUID):
  ```php
  public function show(string $identifier)
  {
      $destination = Destination::with(['category', 'images'])
          ->where('slug', $identifier)
          ->orWhere('id', $identifier)
          ->firstOrFail();

      return (new DestinationResource($destination))->additional([
          'status' => 'success',
          'message' => 'Destination detail retrieved successfully'
      ]);
  }
  ```

---

### 6. [P1 - Data Awal] Tidak Ada Akun Admin Default di Database Seeder
- **Lokasi Berkas:** `database/seeders/DatabaseSeeder.php`
- **Permasalahan:** Hanya ada akun contoh biasa (`Test User`). Penguji/dosen penguji tidak memiliki kredensial admin untuk login dan menguji modul validasi mitra.
- **Solusi Teknis:**
  Suntikkan akun admin di seeder:
  ```php
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
  ```

---

### 7. [P2 - Format Respon Error API] Standardisasi Respons 404 & Validasi Error
- **Lokasi Berkas:** `bootstrap/app.php` (`withExceptions`)
- **Permasalahan:** Jika destinasi tidak ditemukan (404) atau terjadi error di `/api/v1/*`, Laravel mengembalikan format default framework `{ "message": "..." }`, bukan standar kontrak `{ "status": "error", "message": "...", "data": null }`.
- **Solusi Teknis:**
  Kustomisasi penanganan exception untuk request berawalan `api/*` di `bootstrap/app.php`.

---

### 8. [P2 - Redundansi Kode] Duplikasi Middleware di `bootstrap/app.php`
- **Lokasi Berkas:** `bootstrap/app.php` (Baris 17–25)
- **Permasalahan:** Mi ddleware `HandleInertiaRequests` dan `AddLinkHeadersForPreloadedAssets` didaftarkan dua kali dalam method `$middleware->web(append: [...])`.
- **Solusi Teknis:** Hapus blok duplikasi baris 22–25.

---

### 9. [P2 - Fitur Operasional Admin] Belum Ada CRUD Destinasi & Upload Gambar
- **Lokasi Berkas:** Belum ada controller CRUD destinasi untuk admin
- **Permasalahan:** Data destinasi saat ini murni statis dari seeder. Admin belum dapat menambah, mengedit, atau menghapus destinasi wisata serta mengunggah galeri foto (`multipart/form-data`) ke `storage/app/public`.

---

### 10. [P2 - Automated Testing] Belum Ada Feature Test untuk Logika Kustom
- **Lokasi Berkas:** `tests/Feature/`
- **Permasalahan:** Belum ada automated test untuk:
  - `DestinationApiTest` (index, pagination, search, category filter, show by slug & id).
  - `BusinessValidationTest` (hak akses admin, persetujuan dan penolakan mitra).
  - `RegistrationFlowTest` (validitas token 30 menit).

---

## 📋 Matriks Prioritas Perbaikan

| No | Kategori | Item Pekerjaan | File Target | Prioritas |
|:--:|:---|:---|:---|:---:|
| 1 | Bug Fix | Perbaiki operator pencarian `ilike` -> `like` di SQLite | `DestinationController.php` | **P0** |
| 2 | Keamanan | Buat Middleware `EnsureUserIsAdmin` untuk rute `/admin/*` | `EnsureUserIsAdmin.php`, `routes/web.php` | **P0** |
| 3 | Integrasi | Kirim data dinamis database ke halaman `/` dan `/destinations` | `routes/web.php`, `Index.jsx` | **P1** |
| 4 | API Feature | Buat endpoint `/api/v1/categories` | `CategoryController.php`, `routes/api.php` | **P1** |
| 5 | Standar API | Dukung pencarian Detail Destinasi via UUID & Slug | `DestinationController.php` | **P1** |
| 6 | Database | Tambahkan akun default Admin di seeder | `DatabaseSeeder.php` | **P1** |
| 7 | Refactor | Bersihkan duplikasi middleware Inertia | `bootstrap/app.php` | **P2** |
| 8 | Standar API | Format respons error JSON seragam (`status: error`) | `bootstrap/app.php` | **P2** |
| 9 | Fitur Baru | CRUD Destinasi + Upload Foto untuk Admin | `Admin/DestinationController.php` | **P2** |
| 10 | Quality Assurance | Buat automated test (Pest) untuk API & Admin | `tests/Feature/Api/`, `tests/Feature/Admin/` | **P2** |

---

## 🎯 Status Eksekusi

- [x] **1. Fix Query SQLite Compatibility:** Selesai (`DestinationController.php`, operator `LIKE` database-agnostic).
- [x] **2. Middleware Proteksi Admin:** Selesai (`EnsureUserIsAdmin.php`, rute `/admin/validasi-mitra` terlindungi dengan HTTP 403 Forbidden untuk non-admin).
- [x] **3. Akun Admin Default & Mitra di Seeder:** Selesai (`DatabaseSeeder.php`, `admin@pariwisatalampung.go.id` / `admin123` & `mitra@pariwisatalampung.go.id` / `mitra123`).
- [x] **4. Dukungan UUID & Slug di Detail Destinasi:** Selesai (`DestinationController.php`, mendukung lookup via UUID maupun slug).
- [x] **5. Endpoint Kategori REST API (`GET /api/v1/categories`):** Selesai (`CategoryController.php`, `routes/api.php`).
- [x] **6. Standardisasi Respon Error JSON 404:** Selesai (`bootstrap/app.php`, mengembalikan `{"status":"error","message":"...","data":null}`).
- [x] **7. Pembersihan Duplikasi Middleware:** Selesai (`bootstrap/app.php`).
- [x] **8. Feature Tests REST API:** Selesai (`DestinationApiTest.php`, 7 test skenario lulus).
- [x] **9. Feature Tests Admin Validation:** Selesai (`BusinessValidationTest.php`, 6 test skenario lulus).
- [x] **10. Integrasi Data Dinamis ke Halaman React:** Selesai (Rute `/` dan `/destinations` kini menyuplai data dinamis destinasi, kategori, dan statistik database ke `Index.jsx` & `Destinations/Index.jsx`).
- [x] **12. CRUD Destinasi Admin & File Upload Storage:** Selesai (`DestinationManagementController.php`, `admin/Destinations.jsx`, `php artisan storage:link`, form modal Tambah/Edit/Hapus, dan `DestinationManagementTest.php`).

---

## 🏆 Kesimpulan Progres
Seluruh **12 dari 12 tugas (100%)** dalam rencana kerja backend telah berhasil diselesaikan, teruji, dan diverifikasi dengan 54 automated feature tests (pada saat Fase 1 selesai; setelah Fase 2 total menjadi 82 test) tanpa kendala.

---
---

# 🚧 FASE 2 — Analisis Lanjutan (Pasca Pull Commit `344d470`, `c925511`, `e7142ba`)

Setelah menarik 3 commit terbaru dari GitHub (UI Update), ditemukan bug baru yang dibawa oleh commit tersebut serta fitur frontend yang belum memiliki dukungan backend.

---

## 🔴 P0 — Bug Kritis dari Commit Terbaru

### 13. Controller Manajemen Destinasi "Yatim" (Tidak Terhubung ke Rute)
- **Lokasi Berkas:** `app/Http/Controllers/DestinationManagementController.php` (root, bukan `Admin/`)
- **Permasalahan:**
  - Controller melakukan redirect ke `manage.destinations.index`, namun rute `manage.*` **tidak terdaftar** di `routes/web.php`.
  - Halaman `Destinations/Manage/Index.jsx` & `Destinations/Manage/Form.jsx` memanggil `route('manage.destinations.*')` → **crash (Ziggy error)** saat dibuka.
  - Fungsinya tumpang tindih dengan `Admin/DestinationManagementController.php`.
- **Solusi Teknis:** Daftarkan grup rute `manage.*` (index, create, store, edit, update, destroy, toggle-publish) untuk Mitra & Admin, atau gabungkan dengan controller Admin.

### 14. Inkonsistensi Nama Role (`business` vs `business_owner`)
- **Lokasi Berkas:** `DestinationManagementController.php` (Baris 23 & 243)
- **Permasalahan:** Controller mengecek `$user->role === 'business'`, sedangkan registrasi, seeder, dan validasi mitra memakai `business_owner`. Mitra **tidak akan pernah** bisa mengelola destinasinya.
- **Solusi Teknis:** Ganti menjadi `'business_owner'`. Idealnya buat konstanta/enum `App\Enums\UserRole`.

### 15. Tipe Foreign Key `destinations.user_id` Salah
- **Lokasi Berkas:** `database/migrations/2026_10_01_064926_add_management_fields_to_destinations_table.php` (Baris 15)
- **Permasalahan:** Memakai `foreignUuid('user_id')`, padahal `users.id` bertipe **bigint** (`$table->id()`). Lolos di SQLite, tetapi **gagal di PostgreSQL (production)**.
- **Solusi Teknis:**
  ```php
  $table->foreignId('user_id')->nullable()->after('id')->constrained('users')->nullOnDelete();
  ```

### 16. API Detail Destinasi Error 500 di PostgreSQL
- **Lokasi Berkas:** `app/Http/Controllers/Api/DestinationController.php` (Baris 39–50)
- **Permasalahan:** `->orWhere('id', $identifier)` membandingkan kolom UUID dengan teks slug → `invalid input syntax for type uuid`.
- **Solusi Teknis:**
  ```php
  $destination = Destination::with(['category', 'images'])
      ->where(function ($q) use ($identifier) {
          $q->where('slug', $identifier);
          if (Str::isUuid($identifier)) {
              $q->orWhere('id', $identifier);
          }
      })
      ->firstOrFail();
  ```

---

## 🟠 P1 — Keamanan & Integritas Data

### 17. Destinasi Draft Bocor ke Publik
- **Lokasi:** `routes/web.php` (Baris 14 & 52), `Api/DestinationController@index/show`
- **Permasalahan:** Destinasi `is_published = false` tetap tampil di halaman publik dan API.
- **Solusi:** Tambahkan local scope `Destination::scopePublished()` dan gunakan di semua query publik.

### 18. Parameter `limit` API Tanpa Batas & Tanpa Rate Limit
- **Lokasi:** `Api/DestinationController.php` (Baris 31), `routes/api.php`
- **Permasalahan:** `?limit=1000000` dapat membebani server; API tidak memakai `throttle`.
- **Solusi:** `min((int) $request->get('limit', 10), 50)` dan middleware `throttle:60,1` pada grup `v1`.

### 19. Soft-404 pada Halaman Detail Destinasi
- **Lokasi:** `routes/web.php` (Baris 80–90)
- **Permasalahan:** Slug apa pun menghasilkan destinasi palsu, bukan 404 (buruk untuk SEO & menyesatkan pengguna).
- **Solusi:** Gunakan `firstOrFail()` / route model binding.

### 20. Model `Destination` Tanpa Casts
- **Lokasi:** `app/Models/Destination.php`
- **Solusi:** Tambahkan `casts()`: `is_published => boolean`, `price/discount_price => decimal:2`, `rating => float`.

### 21. File Gambar Lama Tidak Dihapus Saat Update
- **Lokasi:** `Admin/DestinationManagementController@update` (Baris 117–129)
- **Permasalahan:** Gambar baru ditambahkan, gambar lama tetap di storage → penumpukan file.
- **Solusi:** Hapus file lokal lama (`Storage::disk('public')->delete(...)`) atau batasi jumlah gambar.

### 22. Mitra `pending` / `rejected` Belum Dibatasi
- **Permasalahan:** Belum ada middleware yang memastikan hanya mitra `validation_status = approved` yang dapat mengelola destinasi.
- **Solusi:** Buat middleware `EnsureBusinessIsApproved` (alias `approved.business`).

### 23. Relasi `User::destinations()` Belum Ada
- **Lokasi:** `app/Models/User.php`
- **Solusi:** Tambahkan `hasMany(Destination::class)`.

---

## 🟡 P2 — Fitur Frontend yang Belum Memiliki Backend (Masih Mock)

### 24. Modul Ulasan / Testimoni (Reviews)
- **Kondisi:** `reviewCount` di-hardcode (`215` / `1250`), halaman `/testimonials` tanpa data.
- **Solusi:** Tabel `reviews` (`user_id`, `destination_id`, `rating`, `comment`, `is_approved`), model + relasi, endpoint `GET /api/v1/destinations/{slug}/reviews` (API) dan `POST /destinations/{slug}/reviews` (web, wajib login), rekalkulasi `destinations.rating` otomatis, moderasi oleh admin.

### 25. Modul Galeri
- **Kondisi:** `/gallery` dirender tanpa props.
- **Solusi:** Suplai data dari `destination_images` (join destinasi published) + endpoint `GET /api/v1/gallery`.

### 26. Data Detail Destinasi Masih Hardcode
- **Kondisi:** `tagline`, `facilities`, `tips`, `opening_hours` di-mock di `routes/web.php`.
- **Solusi:** Kolom `tagline`, `facilities` (JSON), `tips` (JSON); gunakan `opening_time`/`closing_time` yang sudah ada.

### 27. Statistik Hero Tidak Akurat
- **Kondisi:** `active_users` dipakai sebagai "jumlah destinasi"; rating `4.8★` hardcode.
- **Solusi:** Gunakan `Destination::published()->count()` dan `avg('rating')`.

### 28. Info Kontak Hardcode di Rute
- **Lokasi:** `routes/api.php` (`/contact-info`)
- **Solusi:** Pindahkan ke `config/pariwisata.php` atau tabel `settings`.

---

## 🔵 P3 — Kualitas Kode & Testing

### 29. Refactor Closure Rute ke Controller
- Logika mapping di `routes/web.php` (`/` dan `/destinations`) terduplikasi. Pindahkan ke `HomeController` / `PublicDestinationController` + Resource.

### 30. FormRequest & Policy
- Validasi inline → `StoreDestinationRequest`, `UpdateDestinationRequest`.
- Otorisasi manual `authorizeAccess()` → `DestinationPolicy`.

### 31. Automated Test Tambahan
- Test manajemen destinasi oleh Mitra (hanya miliknya sendiri, hanya jika approved).
- Test filter `is_published` di publik & API.
- Test `show()` dengan slug & UUID (di driver pgsql bila memungkinkan).
- Test 404 untuk slug yang tidak ada.

---

## 📋 Matriks Prioritas Fase 2

| No | Kategori | Item Pekerjaan | File Target | Prioritas |
|:--:|:---|:---|:---|:---:|
| 13 | Bug Fix | Daftarkan rute `manage.*` / gabungkan controller | `routes/web.php`, `DestinationManagementController.php` | **P0** |
| 14 | Bug Fix | Seragamkan role `business_owner` | `DestinationManagementController.php` | **P0** |
| 15 | Database | `foreignUuid` → `foreignId` untuk `user_id` | Migrasi `2026_10_01_064926` | **P0** |
| 16 | Bug Fix | Lookup UUID aman dengan `Str::isUuid` | `Api/DestinationController.php` | **P0** |
| 17 | Keamanan | Scope `published` di semua query publik | `Destination.php`, `web.php`, API | **P1** |
| 18 | Keamanan | Batasi `limit` + `throttle` API | `Api/DestinationController.php`, `api.php` | **P1** |
| 19 | SEO | 404 asli untuk slug tidak ada | `routes/web.php` | **P1** |
| 20 | Model | Tambahkan `casts()` | `Destination.php` | **P1** |
| 21 | Storage | Hapus file gambar lama saat update | `Admin/DestinationManagementController.php` | **P1** |
| 22 | Keamanan | Middleware mitra approved | `EnsureBusinessIsApproved.php` | **P1** |
| 23 | Model | Relasi `User::destinations()` | `User.php` | **P1** |
| 24 | Fitur Baru | Modul Reviews (tabel + API + moderasi) | `Review.php`, `ReviewController.php` | **P2** |
| 25 | Fitur Baru | Endpoint & data Galeri | `GalleryController.php` | **P2** |
| 26 | Fitur Baru | Kolom fasilitas, tips, tagline | Migrasi baru, `Destination.php` | **P2** |
| 27 | Integrasi | Statistik hero akurat | `routes/web.php`, `SiteMetricController.php` | **P2** |
| 28 | Refactor | Info kontak ke config | `config/pariwisata.php` | **P2** |
| 29 | Refactor | Closure rute → Controller | `HomeController.php` | **P3** |
| 30 | Refactor | FormRequest & Policy | `app/Http/Requests/`, `app/Policies/` | **P3** |
| 31 | QA | Test tambahan Mitra, published, 404 | `tests/Feature/` | **P3** |

---

## 🎯 Status Eksekusi Fase 2 (Belum Diproses)

- [x] **13.** Rute `manage.*` terdaftar di `routes/web.php` dan terhubung ke `DestinationManagementController`.
- [x] **14.** Seragamkan role `business_owner` pada pemeriksaan hak akses dan kepemilikan destinasi.
- [x] **15.** Perbaiki tipe foreign key `user_id` menjadi `foreignId()` untuk kompatibilitas PostgreSQL.
- [x] **16.** Lookup UUID aman di API `show()` dengan `Str::isUuid()` mencegah error syntax UUID.
- [x] **17.** Scope `published` aktif di semua query publik web dan REST API.
- [x] **18.** Batasi `limit` (maks 50) + rate limiter `throttle:60,1` pada API v1.
- [x] **19.** 404 asli (`firstOrFail()`) untuk slug destinasi yang tidak ada.
- [x] **20.** Casts model `Destination` (`price`, `discount_price`, `rating`, `is_published`, `facilities`, `tips`).
- [x] **21.** Pembersihan file gambar lama dari disk `storage` saat update & destroy destinasi.
- [x] **22.** Middleware `EnsureBusinessIsApproved` (`business.approved`) untuk membatasi akses mitra hanya yang sudah disetujui.
- [x] **23.** Relasi `User::destinations()` dan `User::reviews()` terpasang.
- [x] **24.** Modul Reviews (tabel database, model `Review`, endpoint `GET /api/v1/destinations/{slug}/reviews`, `POST /destinations/{slug}/reviews`, dan auto rating recalculation).
- [x] **25.** Modul Galeri (`GalleryController`, endpoint `GET /api/v1/gallery`, dan suplai data dinamis ke `/gallery`).
- [x] **26.** Data fasilitas, tips, dan tagline masuk database lewat migrasi dan model.
- [x] **27.** Statistik hero dihitung secara akurat dari data riil destinasi dan rating database.
- [x] **28.** Info kontak dan branding diselaraskan dengan platform Wanderly.
- [x] **29.** Refactor closure rute ke Controller (`HomeController`).
- [x] **30.** FormRequest & Policy untuk manajemen destinasi.
- [x] **31.** Automated test tambahan: `ReviewApiTest`, `PartnerDestinationManagementTest`, dan `GalleryApiTest`.
- [x] **32.** Verifikasi email aktif (`User implements MustVerifyEmail`): registrasi mengirim email verifikasi, `/dashboard` mewajibkan email terverifikasi, dan 3 test tambahan di `EmailVerificationTest`. Uji lokal memakai `MAIL_MAILER=log` (tautan di `storage/logs/laravel.log`); produksi perlu SMTP sungguhan.

---

## 📌 Catatan Pelaksanaan
Daftar tugas di atas siap diproses kembali secara terstruktur dan bertahap.



---

# 🚧 FASE 3 — Temuan Audit Proyek (Belum Diproses)

Hasil audit read-only setelah verifikasi email aktif (item 32). Item yang bertanda `[x]` sudah dikerjakan; item bertanda ⚠️ memerlukan persetujuan sebelum dieksekusi.

---

## 🔴 P1 — Keamanan

- [x] **33.** Registrasi diamankan: `POST /register` (`RegisteredUserController`) dihapus sehingga hanya alur token `/registrasi` yang tersisa; `throttle:10,1` pada `registrasi.generate` & `registrasi.store`; `RegistrationToken` memakai `MassPrunable` (token terpakai/kedaluwarsa >1 hari) dengan `model:prune` terjadwal harian.
- [x] **34.** ⚠️ Perbarui dependensi rentan. Selesai 29/10 dengan persetujuan: (C1) `config.platform.php = 8.2.0` ditambahkan di `composer.json` agar lockfile tidak menarik Symfony 8.x (butuh PHP ≥ 8.4) dari PHP 8.5 lokal, lalu `composer update` untuk `laravel/framework` 12.68.0 → 12.70.2, `league/commonmark` → 2.10.4, `symfony/http-foundation`/`mime`/`yaml` → 7.4.22; total 50 paket naik (dependensi turunan: guzzle, monolog, carbon, nette, dll.), 1 paket baru (`symfony/polyfill-time`), tanpa lompatan mayor; `composer audit` bersih. (N1) `npm audit fix` tanpa `--force` (`vite` 6.1.1 → 6.4.5, `rollup`, `esbuild`, `postcss`, dll.; `react`/`tailwindcss`/`@inertiajs/react` tidak berubah): audit produksi 0 celah, audit penuh tersisa 1 celah rendah (`deepmerge` di `@inertiajs/core`, perlu pembaruan Inertia). Verifikasi: 124 test lulus, build sukses, `pint` bersih, smoke test HTTP 43/43. Catatan: `package.json` menulis `react` (^18.2 dan ^19.0) serta `tailwindcss` (^3.2 dan ^4.0) ganda dengan versi bertabrakan (terpasang React 18.3.1 dan Tailwind 3.4.19); belum diubah, kandidat perapian frontend.
- [x] **35.** Middleware `verified` dipasang pada `POST /destinations/{slug}/reviews` dan grup `kelola/destinasi`, dengan test untuk user dan mitra yang belum terverifikasi. Catatan: `MAIL_MAILER` produksi tetap perlu diarahkan ke SMTP sungguhan (konfigurasi `.env` di luar repo).

## 🟠 P2 — Konsistensi & Fitur

- [x] **36.** CRUD destinasi admin memakai `StoreDestinationRequest`/`UpdateDestinationRequest` + `DestinationPolicy` (`Gate::authorize` pada destroy). Input `rating` manual diabaikan (rating awal 0, dihitung dari ulasan), field `tagline`/`facilities`/`tips`/`content`/dll. didukung, update hanya mengubah field yang dikirim (tidak menimpa data lain/`is_published`), dan aturan upload gambar disamakan (`jpg,jpeg,png,webp`, maks 3 MB). *Sisa frontend: field Rating di `admin/Destinations.jsx` kini tidak berpengaruh dan bisa dihapus.*
- [x] **37.** Alur ulasan lengkap. Backend: `throttle:10,1` pada `POST /destinations/{slug}/reviews`; rating dihitung ulang hanya saat status persetujuan berubah dan kembali ke 0 bila ulasan disetujui terakhir di-unapprove/dihapus; `GET /admin/ulasan` (`admin.reviews.index`) untuk moderasi; halaman detail destinasi menyuplai `reviews` (disetujui), `approved_reviews_count`, dan `userReview`. Frontend: tab "reviews" dengan form bintang + komentar di `Destinations/Show/Index.jsx`, halaman `admin/Reviews.jsx` (setujui/sembunyikan/hapus) dan menu "Moderasi Ulasan" di navigasi admin.
- [x] **38.** Nama kategori wajib unik pada `store` & `update` (`Rule::unique`, mengabaikan kategori sendiri). Keputusan slug: tetap stabil saat nama diganti agar URL lama tidak rusak.
- [x] **39.** `role`, `validation_status`, dan `rejection_reason` dikeluarkan dari `User::$fillable`; `RegistrationFlowController`, `BusinessValidationController`, dan `DatabaseSeeder` menetapkannya secara eksplisit (`forceFill` / `unguard`), dengan test bahwa mass assignment diabaikan.

## 🔵 P3 — Kebersihan, Konfigurasi & Dokumentasi

- [x] **40.** Bersihkan kode starter-kit yang tidak terpakai: `routes/settings.php` (tidak dimuat), `Settings/ProfileController`, halaman `settings/*.tsx`, dan pasangan `.tsx`/`.jsx` ganda. Dikerjakan: `routes/settings.php`, `Settings/PasswordController`, `Settings/ProfileController`, dan `Settings/ProfileUpdateRequest` dihapus; halaman `.tsx` tidak disentuh (tidak dimuat Vite).
- [x] **41.** Seragamkan huruf besar-kecil folder `pages/auth` vs `Auth/...` di controller agar aman di Linux. Dikerjakan: controller `Auth/*` kini merender `auth/...` sesuai nama folder.
- [ ] **42.** Konfirmasi tujuan `vercel.json` (`@vercel/static-build` tidak menjalankan PHP/Laravel) dengan pembuatnya.
- [ ] **43.** Rapikan dokumentasi & konfigurasi: tambah fitur ulasan, galeri, CRUD mitra/kategori ke README (SKPL); `.env.example` (`APP_NAME`, database); ganti data Instagram/Facebook di `config/pariwisata.php` dengan data asli; verifikasi item 15/16 di PostgreSQL asli.

## 🟢 Tambahan — Data Contoh & Profil Wisatawan

- [x] **44.** Seeder ulasan contoh: `ReviewSeeder` (dipanggil `DatabaseSeeder` setelah `DestinationSeeder`) membuat 6 akun wisatawan (`*@example.com`, password `password`, email terverifikasi) beserta ulasan yang sudah disetujui menggantikan testimoni dummy; idempotent dan dites di `ReviewSeederTest`. Data uji ulasan `Wisatawan Test` (Pantai Tanjung Setia) di database lokal dihapus dan rating destinasi dikembalikan ke 4.9.
- [x] **45.** Profil wisatawan: kolom `profession`, `city`, `avatar_url` pada `users` (migrasi `add_profile_fields_to_users_table`, jalankan `php artisan migrate`); `ProfileUpdateRequest` + `ProfileController` menerima upload foto (JPG/PNG/WebP, maks 2 MB; file lama dihapus saat diganti atau akun dihapus); halaman Testimoni memakai profesi, kota, dan foto reviewer (fallback "Pengunjung", "Lampung", dan avatar inisial); dites di `ProfileDetailsTest`.

## 🔎 Temuan Pasca Merge GEDE & Roy (`42c9c1c`)

Hasil review merge GEDE `033da58` + Roy `68d7f45`, dicek ulang pada `main` terbaru `42c9c1c` (versi GEDE; konflik sudah selesai di item 46). Item 49–53 masih terbuka (nomor 48 dihapus karena sama dengan keputusan desain GEDE); status tiap item ada di catatan "Re-audit 29/10".

- [x] **46.** *[GEDE/Roy]* Selesaikan konflik merge yang ikut ter-commit: tanda `<<<<<<<`/`=======`/`>>>>>>>` masih ada di `config/pariwisata.php` (membuat semua perintah `php artisan` error) dan 11 file frontend (`DestinationCard`, `DestinationDetailModal`, `PublicFooter`, `PublicNavbar`, `TestimonialCard`, `Destinations/Show/Index`, `Gallery/Index`, `Index`, `Testimonials/Index`, `auth/Login`, `auth/RegisterUser`). Putuskan satu tema (kuning GEDE atau amber Roy) dan satu set data kontak. Verifikasi: tidak ada sisa tanda konflik, `php artisan test` hijau, `npm run build` sukses. Selesai: Roy menyelesaikan konflik dengan mengambil versi GEDE (`ef014a4`, `a089f80`); terverifikasi di `a089f80`: 0 tanda konflik, `php artisan test` 117 lulus, `npm run build` sukses, tanpa migrasi tertunda. Data kontak resmi versi Roy tidak ikut terbawa (lihat item 52). Catatan: `pint --test` masih menandai `routes/web.php` dan `DestinationSeeder.php` (hanya format).
- [x] **47.** *[Frontend]* `Destinations/Show/Index.jsx:150` memanggil `description.split(...)` tanpa pengaman; destinasi tanpa deskripsi (boleh dibuat admin/mitra) membuat halaman detail error. Selesai: `displayData.description` kini punya fallback "Deskripsi destinasi ini belum tersedia." di `Show/Index.jsx`; terbukti lewat render Node (kode lama error `reading 'split'`, kode baru render normal) dan test `DestinationsPageTest` untuk destinasi tanpa deskripsi.
- [ ] **49.** *[Frontend]* Gambar hero `auth/Login.jsx` memakai tautan eksternal `asdp.id/storage//uploads/...` (bisa hilang, hak cipta tidak jelas); ganti dengan aset sendiri. *Re-audit 29/10 (`42c9c1c`, versi GEDE): masih ada, `Login.jsx:138` masih memakai `asdp.id`.* *Catatan 29/10: gambar yang sama dipakai GEDE sebagai hero di 5 halaman (`Index.jsx`, `auth/Login`, `auth/RegisterUser`, `auth/RegisterBusiness`, `auth/RegisterSelect`), jadi penggantian harus serentak dengan aset berlisensi/milik sendiri (disimpan di `public/`); gambar saat ini masih bisa dimuat. Dikerjakan sendiri oleh pemilik repo, bukan oleh Claude.*
- [x] **50.** *[Frontend]* `Index.jsx` memuat `testimonialsData` statis sehingga beranda berbeda dengan `/testimonials`. Selesai: `HomeController` kini mengirim 6 ulasan disetujui terbaru (`approvedTestimonials()`, dipakai bersama halaman Testimoni) dan `Index.jsx` menampilkannya dengan cadangan dummy bila belum ada ulasan, sama seperti halaman Testimoni; 2 test baru di `ReviewSeederTest`. Bagian `lg:sticky` sidebar detail dihapus dari item ini karena gaya desain GEDE.
- [x] **51.** *[Backend]* `DestinationSeeder` memakai `firstOrCreate` pada `image_url` sehingga database terisi mendapat gambar utama ganda dan konten baru seeder tidak memperbarui baris lama. Selesai: destinasi kini di-upsert lewat `upsertDestination()` (konten diperbarui saat seed ulang, `rating` hanya diisi saat dibuat karena dihitung dari ulasan) dan gambar lewat `setPrimaryImage()` (satu gambar utama seeder per destinasi; duplikat lama dibersihkan; gambar unggahan panel `/storage/...` tidak ditimpa); 4 test di `DestinationSeederTest`. Catatan: seed ulang menimpa perubahan konten manual pada 7 destinasi contoh.
- [x] **52.** *[Backend/Tim]* Data kontak. Keputusan: project tugas, jadi data karangan (`Wanderly`, `info@wanderly.id`, `@wanderly`, alamat dan telepon di `config/pariwisata.php`) diterima tanpa verifikasi. Selesai: alamat, email, dan telepon di `PublicFooter` sudah sama dengan config; sisa merek lama "Wonderly Lampung" dan email `info@wonderlylampung.com` di `Contact.jsx` diseragamkan ke "Wanderly"/`info@wanderly.id` (0 sisa "wonderly" di kode); kunci `agency_name` sudah seragam dengan `GalleryApiTest`. Catatan: footer dan `Contact.jsx` masih menulis data kontak langsung (tidak membaca config) — diterima sebagai gaya frontend.
- [x] **53.** *[Tim]* Nama aplikasi "Wanderly". Selesai: `.env.example` sudah `APP_NAME="Wanderly"` dan `.env` lokal diubah dari `Laravel` ke `"Wanderly"` (terbaca `config app.name`; tidak ada selisih kunci antara `.env` dan `.env.example`). Catatan: `.env` tidak masuk git, jadi anggota tim lain perlu menyamakan `APP_NAME` di `.env` masing-masing.
- [ ] **54.** Audit konsistensi pra-fitur (setelah konflik 46 selesai, sebelum 55–57): (a) tarik `main` terbaru, tidak ada sisa tanda konflik; `php artisan test`, `npm run build`, dan `vendor/bin/pint` bersih; (b) `migrate:fresh --seed` sukses dan skema sesuai migrasi; (c) nama merek dan config kontak seragam di config, API, tes, footer, `Contact.jsx` (item 52, 53); (d) seeder tidak menggandakan gambar utama (item 51); (e) `route:list` tanpa rute ganda dan middleware/policy `admin`, `business.approved`, `verified` tidak berubah oleh merge; (f) smoke test fitur lama: registrasi token, login, verifikasi email, ulasan + moderasi, profil + foto, testimoni, CRUD destinasi admin/mitra, kategori; (g) status dependensi (item 34); (h) temuan dicatat sebagai item baru. Item 55–57 hanya dimulai bila audit ini hijau. *Hasil audit 29/10 (`42c9c1c` + perubahan lokal belum di-commit): (a) `main` lokal = GitHub, 0 tanda konflik, 124 test lulus, build sukses; `pint --test` untuk seluruh proyek lulus (setelah `routes/web.php` dirapikan: `use ContactPageController` ditambah dan rute `/contact` memakai nama pendek). (b) `migrate:fresh --seed` sukses di DB sementara (15 tabel, 7 destinasi, 7 gambar, 6 ulasan, 9 pengguna, 0 migrasi tertunda, kolom kunci lengkap). (c) 0 sisa "wonderly", `APP_NAME` seragam, alamat/email/telepon config = footer (Contact.jsx menulis alamat umum "Provinsi Lampung"). (d) seeder idempoten (4 test). (e) 56 rute tanpa nama ganda, rute kunci lengkap, `POST /register` lama sudah tidak ada, middleware `verified`/`business.approved`/`admin`/`throttle` terpasang. (f) smoke test HTTP 43/43 lulus (halaman publik, API, akses tamu/wisatawan/admin/mitra pending, kirim ulasan tampil di moderasi, registrasi token). (g) dependensi: setelah item 34, `composer audit` bersih dan `npm audit` produksi 0 celah (penuh: 1 rendah); 124 test, build, dan smoke test 43/43 diulang dan lulus. (h) tidak ada temuan baru. Belum `[x]` karena hanya tersisa item 49 (hero `asdp.id`, Anda kerjakan).*

## 🧭 Hasil Asistensi (Belum Dikerjakan)

Saran dosen pembimbing; keputusan: ulasan langsung tampil, email dirapikan, dan pengajuan destinasi mitra dibuat.

> **Syarat:** item 55–57 baru dikerjakan setelah konflik merge GEDE/Roy selesai (item 46 `[x]`, lalu 47–53 ditinjau) **dan audit konsistensi pra-fitur (item 54) hijau**, agar fitur baru tidak menumpuk di atas kode yang belum konsisten. Setelah 55–57 selesai dijalankan audit akhir (item 58).

- [ ] **55.** Ulasan tanpa validasi manual admin: ulasan langsung tampil (`is_approved = true`) dengan pembatasan `RateLimiter` per IP dan per akun, hash IP disimpan di `reviews` untuk audit/anti-spam, ulasan mencurigakan (tautan, IP yang sama dengan ulasan lain di destinasi) otomatis `pending`, halaman moderasi admin dipertahankan untuk menyembunyikan/menghapus setelah tayang, `trustProxies` dikonfigurasi, dan pesan 429 berbahasa Indonesia.
- [ ] **56.** Email berformat lengkap (subjek, sapaan, isi, tombol, masa berlaku tautan, penutup): verifikasi email dan reset password dalam bahasa Indonesia (`toMailUsing`), notifikasi "ulasan baru" ke mitra pemilik destinasi (dibatasi frekuensinya), serta email pengajuan destinasi (ke admin saat diajukan, ke mitra saat disetujui/ditolak). SMTP produksi + kredensial di `.env` (bukan repo) dan antrean `database` dengan worker untuk produksi.
- [ ] **57.** Pengajuan destinasi mitra: status `draft → diajukan → disetujui/ditolak` (+ alasan penolakan) sebelum terbit; kolom `regency`, `address`, `latitude`, `longitude`, `contact_phone`, dokumen izin (disk privat), `submitted_at`, `reviewed_at`; aksi mitra "Ajukan" dan antrean tinjauan admin; `scopePublished` hanya memuat destinasi disetujui; destinasi yang sudah ada otomatis berstatus disetujui; policy, notifikasi email, dan test.
- [ ] **58.** Audit akhir setelah 55–57 dikerjakan: (a) tidak ada sisa tanda konflik dan `php artisan test`, `npm run build`, `vendor/bin/pint` bersih; (b) tinjau ulang item 47–53 beserta perubahan GEDE/Roy yang masuk (rute, config, seeder, auth); (c) ulangi `composer audit` dan `npm audit` (kaitkan dengan item 34); (d) cek keamanan alur baru: rate limit/IP ulasan, dokumen izin di disk privat, policy pengajuan, dan email; (e) uji di PostgreSQL asli (item 15/16/43); (f) catat temuan sebagai item baru di planBE.

---

