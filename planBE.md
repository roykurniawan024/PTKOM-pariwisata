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
- **Permasalahan:** Middleware `HandleInertiaRequests` dan `AddLinkHeadersForPreloadedAssets` didaftarkan dua kali dalam method `$middleware->web(append: [...])`.
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
- [x] **28.** Info kontak dan branding diselaraskan dengan platform WonderLy.
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
- [ ] **34.** ⚠️ Perbarui dependensi rentan: `npm audit` (11 celah, 1 kritis `shell-quote`, 8 tinggi termasuk `vite`, `rollup`, `postcss`) dan `composer audit` (`symfony/yaml`), lalu jalankan ulang seluruh test dan build. *Dry-run: `composer update symfony/yaml` melompat ke 8.1.9 (versi mayor) dan `npm audit fix` menyentuh banyak paket; perlu persetujuan dan pengecekan kompatibilitas sebelum dieksekusi.*
- [x] **35.** Middleware `verified` dipasang pada `POST /destinations/{slug}/reviews` dan grup `kelola/destinasi`, dengan test untuk user dan mitra yang belum terverifikasi. Catatan: `MAIL_MAILER` produksi tetap perlu diarahkan ke SMTP sungguhan (konfigurasi `.env` di luar repo).

## 🟠 P2 — Konsistensi & Fitur

- [ ] **36.** Satukan CRUD destinasi admin ke `StoreDestinationRequest`/`UpdateDestinationRequest` + `DestinationPolicy` (hapus input `rating` manual, tambah `tagline`/`facilities`/`tips`, samakan aturan upload gambar).
- [ ] **37.** Lengkapi alur ulasan: form ulasan di halaman detail (frontend), UI moderasi admin (setujui/tolak/hapus), `throttle` pada `POST /destinations/{slug}/reviews`, dan perilaku rating saat ulasan terakhir yang disetujui dihapus.
- [ ] **38.** Validasi nama kategori unik (`store` & `update`) dan tentukan perilaku slug saat nama berubah.
- [ ] **39.** Kurangi risiko mass assignment: `role` dan `validation_status` pada `User::$fillable`.

## 🔵 P3 — Kebersihan, Konfigurasi & Dokumentasi

- [ ] **40.** Bersihkan kode starter-kit yang tidak terpakai: `routes/settings.php` (tidak dimuat), `Settings/ProfileController`, halaman `settings/*.tsx`, dan pasangan `.tsx`/`.jsx` ganda.
- [ ] **41.** Seragamkan huruf besar-kecil folder `pages/auth` vs `Auth/...` di controller agar aman di Linux.
- [ ] **42.** Konfirmasi tujuan `vercel.json` (`@vercel/static-build` tidak menjalankan PHP/Laravel) dengan pembuatnya.
- [ ] **43.** Rapikan dokumentasi & konfigurasi: tambah fitur ulasan, galeri, CRUD mitra/kategori ke README (SKPL); `.env.example` (`APP_NAME`, database); ganti data Instagram/Facebook di `config/pariwisata.php` dengan data asli; verifikasi item 15/16 di PostgreSQL asli.

---

