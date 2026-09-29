import DestinationDetailModal from '@/components/DestinationDetailModal';
import PublicFooter from '@/components/PublicFooter';
import PublicNavbar from '@/components/PublicNavbar';
import { Head } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';

const categories = ['Semua', 'Pantai', 'Ekowisata', 'Bahari', 'Alam', 'Petualangan', 'Budaya'];

const sortOptions = [
    { value: 'rating', label: 'Rating Tertinggi' },
    { value: 'reviews', label: 'Ulasan Terbanyak' },
    { value: 'price-low', label: 'Harga Terendah' },
    { value: 'price-high', label: 'Harga Tertinggi' },
];

/**
 * Data sementara sampai endpoint /api/v1/destinations dipakai.
 */
const destinationsData = [
    {
        slug: 'way-kambas',
        name: 'Way Kambas',
        category: 'Ekowisata',
        regency: 'Kab. Lampung Timur',
        duration: '2–3 hari',
        rating: 4.8,
        reviewCount: 2341,
        priceMin: 20000,
        priceMax: 150000,
        thumbnail: 'https://images.unsplash.com/photo-1564760055775-d63b19a55371?auto=format&fit=crop&w=800&q=80',
    },
    {
        slug: 'pantai-tanjung-setia',
        name: 'Pantai Tanjung Setia',
        category: 'Pantai',
        regency: 'Kab. Pesisir Barat',
        duration: '2–4 hari',
        rating: 4.9,
        reviewCount: 1876,
        priceMin: 10000,
        priceMax: 500000,
        thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    },
    {
        slug: 'pulau-pahawang',
        name: 'Pulau Pahawang',
        category: 'Bahari',
        regency: 'Kab. Pesawaran',
        duration: '1–2 hari',
        rating: 4.7,
        reviewCount: 3102,
        priceMin: 300000,
        priceMax: 600000,
        thumbnail: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
    },
    {
        slug: 'menara-siger',
        name: 'Menara Siger',
        category: 'Budaya',
        regency: 'Kab. Lampung Selatan',
        duration: '2–3 jam',
        rating: 4.5,
        reviewCount: 4210,
        priceMin: 10000,
        priceMax: 25000,
        thumbnail: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
    },
    {
        slug: 'anak-krakatau',
        name: 'Anak Krakatau',
        category: 'Petualangan',
        regency: 'Kab. Lampung Selatan',
        duration: '2 hari 1 malam',
        rating: 4.3,
        reviewCount: 987,
        priceMin: 500000,
        priceMax: 1500000,
        thumbnail: 'https://images.unsplash.com/photo-1608953154378-b19b808a974b?auto=format&fit=crop&w=800&q=80',
    },
    {
        slug: 'pantai-mutun',
        name: 'Pantai Mutun',
        category: 'Pantai',
        regency: 'Kab. Pesawaran',
        duration: 'Setengah – 1 hari',
        rating: 4.3,
        reviewCount: 5430,
        priceMin: 10000,
        priceMax: 50000,
        thumbnail: '/images/hero-lampung.jpg',
    },
    {
        slug: 'bukit-rigis',
        name: 'Bukit Rigis',
        category: 'Alam',
        regency: 'Kab. Pesawaran',
        duration: '1 hari',
        rating: 4.6,
        reviewCount: 1293,
        priceMin: 15000,
        priceMax: 30000,
        thumbnail: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
    },
    {
        slug: 'museum-lampung-ruwa-jurai',
        name: 'Museum Lampung Ruwa Jurai',
        category: 'Budaya',
        regency: 'Kota Bandar Lampung',
        duration: '2–3 jam',
        rating: 4.4,
        reviewCount: 2670,
        priceMin: 3000,
        priceMax: 5000,
        thumbnail: '/images/hero-lampung.jpg',
    },
    {
        slug: 'pasar-bambu-kuning',
        name: 'Pasar Bambu Kuning',
        category: 'Budaya',
        regency: 'Kota Bandar Lampung',
        duration: '2–3 jam',
        rating: 4.2,
        reviewCount: 3145,
        priceMin: 5000,
        priceMax: null,
        thumbnail: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
    },
];

/**
 * Detail tambahan untuk modal destinasi, diindeks berdasarkan slug.
 */
const destinationDetails = {
    'way-kambas': {
        tagline: 'Surga Gajah Sumatera',
        openingHours: '07.00 – 17.00 WIB',
        address: 'Lampung Timur, Kab. Lampung Timur',
        description:
            'Way Kambas adalah taman nasional di Lampung Timur dan menjadi habitat penting gajah Sumatera. Pengunjung dapat menikmati pusat konservasi gajah, trekking hutan, bird watching, dan pengalaman alam yang khas.',
        facilities: ['Pusat Konservasi Gajah', 'Penginapan', 'Restoran', 'Toilet', 'Parkir'],
        tips: [
            'Kunjungi pagi hari untuk melihat gajah mandi di sungai',
            'Gunakan pakaian nyaman dan ikuti arahan ranger',
            'Bawa topi dan sunscreen saat cuaca terik',
        ],
    },
    'pantai-tanjung-setia': {
        tagline: 'Surga Peselancar Dunia',
        openingHours: '24 jam',
        address: 'Krui, Kab. Pesisir Barat',
        description:
            'Pantai Tanjung Setia terkenal dengan ombak Samudra Hindia yang konsisten dan menjadi tujuan peselancar mancanegara. Pantainya tenang untuk bersantai sambil menikmati matahari terbenam.',
        facilities: ['Sewa Papan Selancar', 'Penginapan', 'Warung Makan', 'Toilet', 'Parkir'],
        tips: [
            'Datang April – Oktober untuk ombak terbaik',
            'Pemula sebaiknya didampingi instruktur selancar',
            'Pesan penginapan jauh hari saat musim ramai',
        ],
    },
    'pulau-pahawang': {
        tagline: 'Surga Bawah Laut Lampung',
        openingHours: '06.00 – 18.00 WIB',
        address: 'Teluk Lampung, Kab. Pesawaran',
        description:
            'Pulau Pahawang terkenal dengan air laut jernih dan terumbu karang yang asri. Aktivitas favorit adalah snorkeling, island hopping, dan melihat penangkaran anak penyu.',
        facilities: ['Sewa Snorkel', 'Perahu', 'Homestay', 'Toilet', 'Warung Makan'],
        tips: [
            'Berangkat pagi dari Dermaga Ketapang agar laut masih tenang',
            'Jangan menginjak atau menyentuh terumbu karang',
            'Bawa pakaian ganti dan kantong kedap air',
        ],
    },
    'menara-siger': {
        tagline: 'Gerbang Pulau Sumatera',
        openingHours: '08.00 – 17.00 WIB',
        address: 'Bakauheni, Kab. Lampung Selatan',
        description:
            'Menara Siger adalah ikon Provinsi Lampung berbentuk mahkota pengantin wanita adat Lampung. Dari puncaknya terlihat pemandangan Selat Sunda dan Pelabuhan Bakauheni.',
        facilities: ['Area Foto', 'Musala', 'Toilet', 'Parkir'],
        tips: [
            'Datang sore hari untuk menikmati sunset',
            'Mampir sekalian sebelum atau sesudah menyeberang ke Jawa',
            'Gunakan alas kaki nyaman untuk naik ke menara',
        ],
    },
    'anak-krakatau': {
        tagline: 'Petualangan Gunung Api Legendaris',
        openingHours: 'Sesuai jadwal trip',
        address: 'Selat Sunda, Kab. Lampung Selatan',
        description:
            'Anak Krakatau adalah gunung api aktif yang muncul dari kaldera letusan Krakatau 1883. Trip biasanya mencakup menyeberang laut, trekking ringan, dan snorkeling di pulau sekitar.',
        facilities: ['Pemandu Wisata', 'Perahu', 'Camping Ground'],
        tips: [
            'Selalu cek status aktivitas gunung sebelum berangkat',
            'Gunakan operator trip resmi yang berizin',
            'Bawa masker, air minum, dan sepatu trekking',
        ],
    },
    'pantai-mutun': {
        tagline: 'Pantai Keluarga Dekat Kota',
        openingHours: '07.00 – 18.00 WIB',
        address: 'Padang Cermin, Kab. Pesawaran',
        description:
            'Pantai Mutun berpasir putih dengan ombak tenang sehingga cocok untuk liburan keluarga. Dari sini juga tersedia perahu menuju Pulau Tangkil.',
        facilities: ['Gazebo', 'Banana Boat', 'Warung Makan', 'Toilet', 'Parkir'],
        tips: ['Datang di hari kerja agar tidak terlalu ramai', 'Sewa gazebo lebih awal saat akhir pekan', 'Tawar harga perahu sebelum menyeberang'],
    },
    'bukit-rigis': {
        tagline: 'Panorama Perbukitan Hijau',
        openingHours: '06.00 – 18.00 WIB',
        address: 'Kab. Pesawaran',
        description:
            'Bukit Rigis menawarkan jalur trekking santai dengan pemandangan perbukitan dan laut dari ketinggian. Cocok untuk menikmati matahari terbit.',
        facilities: ['Jalur Trekking', 'Spot Foto', 'Warung', 'Parkir'],
        tips: [
            'Mulai trekking sebelum subuh untuk melihat sunrise',
            'Gunakan sepatu dengan sol yang tidak licin',
            'Bawa jas hujan saat musim penghujan',
        ],
    },
    'museum-lampung-ruwa-jurai': {
        tagline: 'Jendela Sejarah & Budaya Lampung',
        openingHours: '08.00 – 16.00 WIB',
        address: 'Jl. Z.A. Pagar Alam, Kota Bandar Lampung',
        description:
            'Museum Lampung menyimpan koleksi etnografi, arkeologi, dan kerajinan tradisional seperti kain tapis. Tempat yang tepat untuk mengenal sejarah dan budaya Lampung.',
        facilities: ['Pemandu Museum', 'Musala', 'Toilet', 'Parkir'],
        tips: [
            'Museum tutup pada hari Senin dan libur nasional',
            'Minta pemandu agar penjelasan koleksi lebih lengkap',
            'Izin terlebih dahulu sebelum memotret koleksi',
        ],
    },
    'pasar-bambu-kuning': {
        tagline: 'Pusat Kain Tapis & Oleh-oleh',
        openingHours: '08.00 – 17.00 WIB',
        address: 'Tanjung Karang, Kota Bandar Lampung',
        description:
            'Pasar Bambu Kuning adalah pasar tradisional di pusat kota yang terkenal sebagai tempat berburu kain tapis, songket, dan oleh-oleh khas Lampung.',
        facilities: ['Toko Kain Tapis', 'Kuliner', 'Toilet', 'Parkir'],
        tips: ['Jangan ragu menawar harga', 'Datang pagi agar lebih leluasa memilih', 'Siapkan uang tunai karena tidak semua toko menerima QRIS'],
    },
};

const formatRupiah = (amount) => `Rp ${amount.toLocaleString('id-ID')}`;

const formatPriceRange = ({ priceMin, priceMax }) =>
    priceMax ? `${formatRupiah(priceMin)} – ${priceMax.toLocaleString('id-ID')}` : `Mulai ${formatRupiah(priceMin)}`;

function DestinationListCard({ destination, onOpenDetail }) {
    return (
        <article className="shadow-xs group flex flex-col overflow-hidden rounded-2xl bg-white transition hover:shadow-md">
            <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                <img
                    src={destination.thumbnail}
                    alt={destination.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
            </div>
            <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h2 className="font-serif text-xl font-semibold text-[#1E3A34] sm:text-2xl">{destination.name}</h2>
                <p className="mt-1 font-mono text-[11px] text-[#8A7A5C]">
                    <span className="tracking-widest">★★★★★</span> {destination.rating} · {destination.reviewCount.toLocaleString('id-ID')} ulasan
                </p>
                <p className="mt-4 text-sm text-slate-600">
                    {destination.regency} · {destination.duration}
                </p>
                <div className="mt-2 flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold text-slate-900">{formatPriceRange(destination)}</p>
                    <button
                        type="button"
                        onClick={() => onOpenDetail(destination)}
                        className="shrink-0 text-sm text-pink-400 transition hover:text-pink-500"
                    >
                        Detail ›
                    </button>
                </div>
            </div>
        </article>
    );
}

const readQueryParam = (key, fallback) => {
    if (typeof window === 'undefined') {
        return fallback;
    }

    return new URLSearchParams(window.location.search).get(key) ?? fallback;
};

export default function Index() {
    const [searchQuery, setSearchQuery] = useState(() => readQueryParam('search', ''));
    const [activeCategory, setActiveCategory] = useState(() => {
        const category = readQueryParam('category', 'Semua');

        return categories.includes(category) ? category : 'Semua';
    });
    const [activeRegency, setActiveRegency] = useState(() => readQueryParam('regency', ''));
    const [sortBy, setSortBy] = useState(() => {
        const sort = readQueryParam('sort', 'rating');

        return sortOptions.some((option) => option.value === sort) ? sort : 'rating';
    });

    useEffect(() => {
        const params = new URLSearchParams();

        if (searchQuery.trim()) {
            params.set('search', searchQuery.trim());
        }
        if (activeCategory !== 'Semua') {
            params.set('category', activeCategory);
        }
        if (activeRegency) {
            params.set('regency', activeRegency);
        }
        if (sortBy !== 'rating') {
            params.set('sort', sortBy);
        }

        const queryString = params.toString();
        window.history.replaceState(window.history.state, '', `${window.location.pathname}${queryString ? `?${queryString}` : ''}`);
    }, [searchQuery, activeCategory, activeRegency, sortBy]);

    const [selectedDestination, setSelectedDestination] = useState(null);

    const openDetail = (destination) =>
        setSelectedDestination({
            ...destination,
            ...destinationDetails[destination.slug],
        });

    const resetFilters = () => {
        setSearchQuery('');
        setActiveCategory('Semua');
        setActiveRegency('');
    };

    const regencies = useMemo(() => [...new Set(destinationsData.map((d) => d.regency))].sort(), []);

    const filteredDestinations = useMemo(() => {
        const keyword = searchQuery.trim().toLowerCase();

        const results = destinationsData.filter(
            (destination) =>
                (activeCategory === 'Semua' || destination.category === activeCategory) &&
                (!activeRegency || destination.regency === activeRegency) &&
                (!keyword || [destination.name, destination.category, destination.regency].some((field) => field.toLowerCase().includes(keyword))),
        );

        const comparators = {
            rating: (a, b) => b.rating - a.rating,
            reviews: (a, b) => b.reviewCount - a.reviewCount,
            'price-low': (a, b) => a.priceMin - b.priceMin,
            'price-high': (a, b) => (b.priceMax ?? b.priceMin) - (a.priceMax ?? a.priceMin),
        };

        return results.sort(comparators[sortBy]);
    }, [searchQuery, activeCategory, activeRegency, sortBy]);

    const pillClassName = 'rounded-full font-mono text-[11px] uppercase tracking-wider transition';

    return (
        <>
            <Head title="Destinasi Wisata - Jelajah Lampung" />
            <div className="flex min-h-screen flex-col font-sans text-slate-800 antialiased">
                <PublicNavbar />

                <main className="flex-1 bg-[#FBF0F0] pb-20 pt-28 sm:pb-28 sm:pt-32">
                    <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
                        <header>
                            <h1 className="font-serif text-4xl font-semibold text-[#1E3A34] sm:text-5xl">Jelajahi Lampung</h1>
                            <p className="mt-3 text-sm text-slate-600 sm:text-base">{destinationsData.length} destinasi menakjubkan menanti Anda</p>
                        </header>

                        <div className="mt-10">
                            <label className="relative block">
                                <span className="sr-only">Cari destinasi</span>
                                <svg
                                    className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4C83AD]"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <circle cx="11" cy="11" r="7" />
                                    <path d="M20 20l-3.5-3.5" />
                                </svg>
                                <input
                                    type="search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Cari destinasi, pantai, budaya, alam..."
                                    className="shadow-xs w-full rounded-full border-0 bg-white py-3 pl-11 pr-11 text-sm text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-[#4C83AD] [&::-webkit-search-cancel-button]:hidden"
                                />
                                {searchQuery && (
                                    <button
                                        type="button"
                                        onClick={() => setSearchQuery('')}
                                        aria-label="Hapus pencarian"
                                        className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                                    >
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </label>

                            <div className="-mx-6 mt-5 flex gap-2 overflow-x-auto px-6 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        type="button"
                                        onClick={() => setActiveCategory(category)}
                                        className={`${pillClassName} shrink-0 px-4 py-2 ${
                                            activeCategory === category
                                                ? 'bg-[#4C83AD] text-white shadow-sm'
                                                : 'bg-white text-slate-700 hover:bg-slate-50'
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex flex-col gap-2 sm:flex-row">
                                    <select
                                        value={activeRegency}
                                        onChange={(e) => setActiveRegency(e.target.value)}
                                        aria-label="Filter kabupaten"
                                        className={`${pillClassName} shadow-xs border-0 py-2 pl-4 pr-9 focus:ring-2 focus:ring-[#4C83AD] ${
                                            activeRegency ? 'bg-[#4C83AD] text-white' : 'bg-white text-slate-700'
                                        }`}
                                    >
                                        <option value="">Kab. Semua Daerah</option>
                                        {regencies.map((regency) => (
                                            <option key={regency} value={regency}>
                                                {regency}
                                            </option>
                                        ))}
                                    </select>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        aria-label="Urutkan destinasi"
                                        className={`${pillClassName} shadow-xs border-0 bg-white py-2 pl-4 pr-9 text-slate-700 focus:ring-2 focus:ring-[#4C83AD]`}
                                    >
                                        {sortOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                Urutkan: {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <p className="font-mono text-[11px] text-slate-400">{filteredDestinations.length} destinasi ditemukan</p>
                            </div>
                        </div>

                        {filteredDestinations.length > 0 ? (
                            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                                {filteredDestinations.map((destination) => (
                                    <DestinationListCard key={destination.slug} destination={destination} onOpenDetail={openDetail} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center px-6 py-12 text-center sm:py-16">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C9DDEC] text-[#4C83AD]">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <circle cx="11" cy="11" r="7" />
                                        <path d="M20 20l-3.5-3.5" />
                                    </svg>
                                </div>
                                <h2 className="mt-6 font-serif text-2xl font-semibold text-[#1E3A34] sm:text-3xl">Destinasi tidak ditemukan</h2>
                                <p className="mt-3 text-sm text-slate-500">Coba kata kunci atau filter yang berbeda.</p>
                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    className="mt-8 rounded-full bg-[#5B8DBE] px-10 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-[#4A7BAA]"
                                >
                                    Reset filter
                                </button>
                            </div>
                        )}
                    </div>
                </main>

                <PublicFooter />
            </div>

            <DestinationDetailModal destination={selectedDestination} priceLabel={formatPriceRange} onClose={() => setSelectedDestination(null)} />
        </>
    );
}
