-- Data Kategori Wisata
INSERT INTO categories (id, name, slug, description) VALUES 
('11111111-1111-1111-1111-111111111111', 'Taman Nasional', 'taman-nasional', 'Kawasan pelestarian alam yang mempunyai ekosistem asli.'),
('22222222-2222-2222-2222-222222222222', 'Pantai', 'pantai', 'Wisata alam pesisir pantai dengan pemandangan indah.');

-- Data Destinasi (Way Kambas & Pantai Tanjung Setia)
INSERT INTO destinations (id, category_id, name, slug, description, price, location, rating) VALUES 
('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'Way Kambas', 'way-kambas', 'Taman Nasional Way Kambas adalah taman nasional perlindungan gajah yang terletak di daerah Lampung.', 50000.00, 'Lampung Timur', 4.8),
('44444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', 'Pantai Tanjung Setia', 'pantai-tanjung-setia', 'Salah satu pantai dengan ombak terbaik di dunia bagi para peselancar.', 25000.00, 'Pesisir Barat, Lampung', 4.8);

-- Gambar Destinasi (Contoh data)
INSERT INTO destination_images (id, destination_id, image_url, is_primary) VALUES 
('55555555-5555-5555-5555-555555555555', '33333333-3333-3333-3333-333333333333', 'https://example.com/way-kambas.jpg', true),
('66666666-6666-6666-6666-666666666666', '44444444-4444-4444-4444-444444444444', 'https://example.com/tanjung-setia.jpg', true);

-- Data Metrik Situs (Berdasarkan statistik 1.2jt, 47+, 9)
-- Asumsi: 1.2jt = total pengunjung, 47 = mitra aktif / pengguna aktif, 9 = total penghargaan/pencapaian.
INSERT INTO site_metrics (id, total_visitors, active_users, total_bookings, recorded_at) VALUES 
('77777777-7777-7777-7777-777777777777', 1200000, 47, 9, CURRENT_DATE);

-- Catatan: Untuk 'kontak dinas pariwisata' tidak di-insert karena tabelnya belum dibuat di schema.sql. 
-- Jika dibutuhkan, disarankan membuat tabel `settings` atau `contacts`.
