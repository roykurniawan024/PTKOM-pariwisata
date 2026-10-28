# Panduan Desain: Wanderly

Dokumen ini adalah acuan gaya visual untuk semua halaman Jelajah Lampung (landing page, halaman auth, dan halaman baru). Baca seluruhnya sebelum membuat atau mengubah UI. Referensi utama: `Index.jsx` (landing page), `Register.jsx`, `Login.jsx`, `RegisterSelect.jsx`.

## Stack

- Inertia.js + React, Tailwind CSS (class utilitas inline, tanpa CSS kustom).
- Ikon: `lucide-react`, dipakai seperlunya (lihat bagian Ikon).
- Bahasa antarmuka: **Bahasa Indonesia**.

## Prinsip

1. **Minimalis.** Setiap elemen harus punya fungsi. Kalau ragu, hapus.
2. **Tipografi dan ruang kosong yang bekerja**, bukan dekorasi. Hierarki dibangun dari ukuran, bobot, dan jarak.
3. **Satu warna aksen** (biru) untuk aksi utama. Sisanya putih, hitam, dan abu-abu.
4. **Konten adalah visual utamanya.** Foto destinasi yang besar dan bersih lebih penting daripada efek.
5. **Tenang.** Tanpa gradien, bayangan, animasi masuk, atau kartu yang dibungkus berlapis.

## Warna

| Peran | Nilai |
|---|---|
| Aksen / tombol utama | `#4C83AD` |
| Aksen hover | `#3f7099` |
| Latar halaman | `white` |
| Latar seksi selang-seling | `slate-50` (hanya untuk satu seksi, mis. testimoni) |
| Teks utama / judul | `slate-900` (halaman publik), `black` (halaman auth) |
| Teks isi | `slate-600` |
| Teks sekunder / label | `slate-500` |
| Garis pemisah dan border | `slate-200` |
| Overlay foto hero | `bg-slate-950/55` |
| Error | `rose-600` (teks), `rose-500` (border) |
| Status sukses | `green-700` |

Aturan:

- Biru **hanya** untuk: tombol utama, tab/filter aktif (garis bawah), titik aksen kecil. Jangan dipakai untuk teks panjang, latar seksi, atau dekorasi.
- Halaman publik memakai skala `slate`. Halaman auth memakai skala `neutral` dan hitam murni untuk teks utama dan fokus. Jangan dicampur dalam satu halaman.
- Jangan menambah warna baru tanpa alasan fungsional.

## Tipografi

- Font: **Plus Jakarta Sans**, bobot 400, 500, 600.
- Pasang lewat `<Head>`:

```jsx
<link rel="preconnect" href="https://fonts.bunny.net" />
<link href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600" rel="stylesheet" />
```

- Terapkan pada wrapper halaman: `style={{ fontFamily }}` dengan
  `const fontFamily = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";`
  dan tambahkan `antialiased`.
- Tanpa font serif.

| Elemen | Kelas |
|---|---|
| H1 hero | `text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] text-balance` |
| H2 seksi | `text-3xl sm:text-4xl font-semibold tracking-tight leading-tight` |
| H2 CTA penutup | `text-4xl sm:text-5xl font-semibold tracking-tight leading-tight` |
| H1/H2 halaman auth | `text-2xl font-medium tracking-tight` |
| Angka statistik | `text-3xl sm:text-4xl font-semibold tracking-tight` |
| Paragraf isi | `leading-relaxed text-slate-600` |
| Teks kecil / label | `text-sm text-slate-500` |
| Tombol, tautan | `text-sm font-medium` |

Larangan:

- Jangan pakai huruf kapital semua (`uppercase`) untuk label.
- Jangan menambahkan label kecil di atas judul (eyebrow).
- Jangan menyorot satu kata di judul dengan warna atau miring.
- Panjang baris paragraf maksimal sekitar 65 karakter (`max-w-lg` atau `max-w-xl`).

## Tata letak

- Wadah halaman: `mx-auto w-full max-w-6xl px-6 lg:px-8` (konstanta `container`).
- Struktur halaman: `flex min-h-screen flex-col`, isi di `<main className="flex-1">`, ada `PublicNavbar` di atas dan `PublicFooter` di bawah.
- Jarak antar seksi: `py-20 sm:py-28`.
- Pemisah antar seksi: `border-t border-slate-200`. Tanpa bentuk pemisah dekoratif.
- Rata kiri untuk semua teks. Jangan rata tengah kecuali ada alasan kuat.
- Grid kartu: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8`.
- Mobile dulu. Pastikan nyaman di lebar 360px.

## Pola komponen

### SectionHeader

Judul seksi dengan deskripsi opsional, selalu dalam `max-w-xl`.

```jsx
<h2 className="text-3xl leading-tight font-semibold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
<p className="mt-4 leading-relaxed text-slate-600">{description}</p>
```

### Hero

- Foto penuh sebagai latar (`absolute inset-0 object-cover`) dengan overlay `bg-slate-950/55`.
- Konten rata kiri di bagian bawah (`items-end`), tinggi `min-h-[85vh]`.
- Satu judul, satu paragraf, satu tombol utama (putih) dan satu tautan teks bergaris bawah.

### Tombol

- **Utama:** `rounded-md bg-[#4C83AD] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#3f7099]`.
- **Utama di atas foto:** `bg-white text-slate-900 hover:bg-slate-100`.
- **Sekunder:** tautan teks, `text-sm font-medium underline underline-offset-4 hover:text-slate-900`. Tanpa tombol berbingkai.
- Status memuat: `disabled:opacity-60` dan teks berubah menjadi "Memproses...".
- Satu tombol utama per tampilan.

### Statistik

Daftar definisi (`dl`) dalam grid 2 kolom (mobile) dan 4 kolom (desktop). Angka besar di atas, label kecil abu-abu di bawah. Tanpa kartu, ikon, atau garis.

### Tab / filter kategori

Baris tombol teks dengan garis bawah. Item aktif: `border-b-2 border-[#4C83AD] text-slate-900`. Item lain: `border-transparent text-slate-500 hover:text-slate-900`. Gunakan `aria-pressed`.

### Daftar bergaris

Untuk daftar teks (mis. budaya): `divide-y divide-slate-200 border-y border-slate-200`. Setiap baris: judul `font-medium` di kiri, deskripsi `text-sm text-slate-600` di kanan, `py-5`.

### Kartu destinasi dan testimoni

Gunakan komponen yang sudah ada (`DestinationCard`, `TestimonialCard`). Jangan membuat varian kartu baru. Jika kartu perlu diubah, jaga agar tetap ringan: foto, judul, satu baris metadata, tanpa bayangan tebal.

### Galeri

Grid `grid-cols-2 sm:grid-cols-3 gap-3`, gambar `aspect-[4/3] rounded-md object-cover`, `loading="lazy"`, dengan `alt` yang deskriptif.

### Form

- Label di atas input: `text-sm` (abu-abu atau hitam sesuai halaman).
- Input halaman auth: `rounded-md border border-neutral-300 bg-white px-3 py-2.5 text-sm focus:border-black focus:ring-1 focus:ring-black`. Varian garis bawah (`border-0 border-b`) boleh dipakai untuk formulir yang sangat sederhana seperti `Register.jsx`.
- Error: teks `text-sm text-rose-600` di bawah field dengan `role="alert"`, input diberi `aria-invalid` dan `aria-describedby`.
- Tombol kirim lebar penuh, warna biru.
- Tautan pendukung ("Lupa kata sandi?", "Daftar") berupa teks bergaris bawah, bukan tombol.

### Halaman auth

- Memakai `AuthSplitLayout` dengan `cardClassName="bg-white"`, atau halaman mandiri `max-w-sm` yang dipusatkan secara vertikal.
- Hitam-putih, hanya tombol yang biru. Fokus input dan outline berwarna hitam.
- Pilihan jenis akun (`RegisterSelect`) berupa tombol biru penuh berisi judul dan deskripsi.

## Aksesibilitas (wajib)

- Cincin fokus yang terlihat di semua elemen interaktif:
  - Halaman publik: `focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4C83AD]`
  - Halaman auth: ganti warna outline menjadi `black`.
- Kontras teks minimal 4,5:1. Teks kecil putih di atas `#4C83AD` agak tipis, jadi untuk teks panjang gunakan `#3f7099` sebagai latar.
- Semua gambar punya `alt`. Ikon dekoratif diberi `aria-hidden="true"`.
- Gunakan elemen semantik (`header`, `main`, `section`, `dl`, `ul`).
- Form harus bisa dipakai penuh dengan keyboard. Pakai `autoComplete` yang tepat.

## Gerak

- Hanya `transition` pada warna dan opasitas untuk hover dan fokus.
- Tanpa animasi masuk, parallax, atau efek yang jalan sendiri.
- Hormati `prefers-reduced-motion` bila menambah gerak apa pun.

## Ikon

Gunakan seperlunya, ukuran `h-4 w-4` atau `h-5 w-5`, warna mengikuti teks. Jangan membungkus ikon dalam lingkaran berwarna atau kotak latar.

## Gaya penulisan

- Bahasa Indonesia, huruf kapital hanya di awal kalimat (sentence case).
- Judul pendek dan konkret. Hindari kalimat promosi berlebihan.
- Tombol memakai kata kerja yang jelas: "Lihat destinasi", "Daftar akun", "Masuk". Nama aksi harus sama di seluruh alur.
- Pesan error menjelaskan apa yang salah dan cara memperbaikinya, tanpa permintaan maaf.
- Teks pemuatan: "Memproses...".
- Kata ganti: "Anda" untuk teks antarmuka formal. Panel promosi boleh lebih santai.

## Yang harus dihindari

- Gradien, bayangan tebal, blur, glassmorphism.
- Kartu yang dibungkus kartu, dan radius sudut berbeda-beda. Gunakan `rounded-md` sebagai standar.
- Emoji di antarmuka.
- Penomoran (01, 02, 03) kecuali kontennya memang berurutan.
- Warna baru di luar tabel warna.
- Font selain Plus Jakarta Sans.
- Lebih dari satu tombol utama dalam satu tampilan.

## Daftar periksa sebelum selesai

- [ ] Hanya memakai warna dari tabel di atas, biru hanya untuk aksi utama.
- [ ] Font, ukuran, dan bobot mengikuti tabel tipografi.
- [ ] Jarak seksi `py-20 sm:py-28`, wadah `max-w-6xl`.
- [ ] Ada cincin fokus di semua elemen interaktif.
- [ ] Gambar punya `alt`, form punya `label` dan atribut `aria`.
- [ ] Tampilan rapi di mobile (360px) dan desktop.
- [ ] Teks dalam Bahasa Indonesia dan konsisten dengan halaman lain.