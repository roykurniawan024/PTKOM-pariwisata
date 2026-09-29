# Pariwisata API Specification

Dokumentasi ini berisi *API Contract* RESTful untuk melayani data halaman web pariwisata. Seluruh respons mengikuti format standar JSON.

---

## 1. Get Destinations List
Endpoint ini digunakan untuk mengambil daftar destinasi wisata, dilengkapi dengan fitur pencarian, filter kategori, dan paginasi.

- **Method:** `GET`
- **Endpoint URL:** `/api/v1/destinations`
- **Query Params:**
  - `search` (string, opsional): Kata kunci pencarian (berdasarkan nama destinasi atau lokasi).
  - `category` (string, opsional): Slug dari kategori (misalnya: `taman-nasional` atau `pantai`).
  - `page` (integer, opsional, default `1`): Nomor halaman untuk paginasi.
  - `limit` (integer, opsional, default `10`): Jumlah data per halaman.
- **Status Code:** `200 OK`
- **Format Respons:**
```json
{
  "status": "success",
  "message": "Destinations retrieved successfully",
  "data": [
    {
      "id": "33333333-3333-3333-3333-333333333333",
      "name": "Way Kambas",
      "slug": "way-kambas",
      "category": {
        "id": "11111111-1111-1111-1111-111111111111",
        "name": "Taman Nasional"
      },
      "location": "Lampung Timur",
      "price": 50000.00,
      "rating": 4.8,
      "thumbnail": "https://example.com/way-kambas.jpg"
    }
  ],
  "meta": {
    "current_page": 1,
    "last_page": 3,
    "per_page": 10,
    "total": 25
  }
}
```

---

## 2. Get Destination Detail
Endpoint ini digunakan untuk melihat detail lengkap dari sebuah destinasi tertentu, termasuk daftar galeri fotonya.

- **Method:** `GET`
- **Endpoint URL:** `/api/v1/destinations/:id` (ID berupa UUID)
- **Query Params:** *None*
- **Status Code:** `200 OK` (atau `404 Not Found` jika tidak ada)
- **Format Respons:**
```json
{
  "status": "success",
  "message": "Destination detail retrieved successfully",
  "data": {
    "id": "44444444-4444-4444-4444-444444444444",
    "name": "Pantai Tanjung Setia",
    "slug": "pantai-tanjung-setia",
    "description": "Salah satu pantai dengan ombak terbaik di dunia bagi para peselancar.",
    "location": "Pesisir Barat, Lampung",
    "price": 25000.00,
    "rating": 4.8,
    "category": {
      "id": "22222222-2222-2222-2222-222222222222",
      "name": "Pantai"
    },
    "images": [
      {
        "id": "66666666-6666-6666-6666-666666666666",
        "image_url": "https://example.com/tanjung-setia.jpg",
        "is_primary": true
      }
    ],
    "created_at": "2024-01-01T10:00:00Z",
    "updated_at": "2024-01-01T10:00:00Z"
  }
}
```

---

## 3. Get Hero Stats
Endpoint ini mengembalikan angka statistik utama untuk ditampilkan pada komponen *Hero* di beranda.

- **Method:** `GET`
- **Endpoint URL:** `/api/v1/hero-stats`
- **Query Params:** *None*
- **Status Code:** `200 OK`
- **Format Respons:**
```json
{
  "status": "success",
  "message": "Hero stats retrieved successfully",
  "data": {
    "total_visitors_formatted": "1.2jt",
    "total_visitors": 1200000,
    "active_partners_formatted": "47+",
    "active_partners": 47,
    "awards_total": 9
  }
}
```

---

## 4. Get Contact Info
Endpoint ini memberikan data informasi kontak resmi (Dinas Pariwisata) yang digunakan di bagian Footer.

- **Method:** `GET`
- **Endpoint URL:** `/api/v1/contact-info`
- **Query Params:** *None*
- **Status Code:** `200 OK`
- **Format Respons:**
```json
{
  "status": "success",
  "message": "Contact info retrieved successfully",
  "data": {
    "agency_name": "Dinas Pariwisata Provinsi Lampung",
    "address": "Jl. Jend. Sudirman No. 1, Bandar Lampung",
    "phone": "+62 812-3456-7890",
    "email": "info@pariwisatalampung.go.id",
    "social_media": {
      "instagram": "@pariwisatalampung",
      "facebook": "Pariwisata Lampung"
    }
  }
}
```
