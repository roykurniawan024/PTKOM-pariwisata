import DestinationDetailModal from '@/components/DestinationDetailModal';
import PublicFooter from '@/components/PublicFooter';
import PublicNavbar from '@/components/PublicNavbar';
import { Head, usePage } from '@inertiajs/react';
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

const formatPriceRange = ({ priceMin, priceMax }) => {
    if (priceMax && priceMax !== priceMin) {
        return `${formatRupiah(priceMin)} – ${formatRupiah(priceMax)}`;
    }

    return `Mulai ${formatRupiah(priceMin)}`;
};

const fontFamily = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";
const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-600';
const controlClass =
    'rounded-md border border-slate-200 bg-white text-sm text-slate-700 transition focus:border-yellow-600 focus:outline-none focus:ring-1 focus:ring-yellow-600';

function DestinationListCard({ destination, onOpenDetail }) {
    return (
        <article className="group relative flex flex-col rounded-md has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-yellow-600">
            <div className="aspect-[4/3] overflow-hidden rounded-md bg-slate-100">
                <img
                    src={destination.thumbnail}
                    alt={destination.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 text-sm">
                <span className="font-medium text-yellow-600">{destination.regency}</span>
                <span className="flex shrink-0 items-center gap-1 text-slate-700">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {destination.rating}
                    <span className="text-slate-400">({destination.reviewCount.toLocaleString('id-ID')})</span>
                </span>
            </div>

            <h2 className="mt-2 text-lg font-semibold tracking-tight text-slate-900">
                <button
                    type="button"
                    onClick={() => onOpenDetail(destination)}
                    aria-label={`Lihat detail ${destination.name}`}
                    className="text-left outline-none after:absolute after:inset-0"
                >
                    {destination.name}
                </button>
            </h2>

            <div className="mt-4 flex items-center justify-between gap-4 border-t border-slate-200 pt-4 text-sm">
                <span className="text-slate-500">{destination.duration}</span>
                <span className="font-medium text-slate-900">{formatPriceRange(destination)}</span>
            </div>
        </article>
    );
}

const setParam = (params, key, value) => {
    if (value) {
        params.set(key, value);
    } else {
        params.delete(key);
    }
};

export default function Index({
    destinations: serverDestinations = [],
    categories: serverCategories = [],
}) {
    // Baca query dari URL milik Inertia (aman untuk SSR, tidak memakai `window` saat render).
    const { url } = usePage();
    const [initialParams] = useState(() => new URLSearchParams(url.split('?')[1] ?? ''));

    const allDestinations = useMemo(() => {
        return serverDestinations && serverDestinations.length > 0
            ? serverDestinations
            : destinationsData;
    }, [serverDestinations]);

    const allCategories = useMemo(() => {
        return serverCategories && serverCategories.length > 0
            ? ['Semua', ...serverCategories]
            : categories;
    }, [serverCategories]);

    const [searchQuery, setSearchQuery] = useState(() => initialParams.get('search') ?? '');
    const [activeCategory, setActiveCategory] = useState(() => {
        const category = initialParams.get('category') ?? 'Semua';

        return allCategories.includes(category) ? category : 'Semua';
    });
    const [activeRegency, setActiveRegency] = useState(() => initialParams.get('regency') ?? '');
    const [sortBy, setSortBy] = useState(() => {
        const sort = initialParams.get('sort') ?? 'rating';

        return sortOptions.some((option) => option.value === sort) ? sort : 'rating';
    });

    // Sinkronkan filter ke URL tanpa menghapus query lain (mis. `page`) maupun hash.
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        setParam(params, 'search', searchQuery.trim());
        setParam(params, 'category', activeCategory !== 'Semua' ? activeCategory : '');
        setParam(params, 'regency', activeRegency);
        setParam(params, 'sort', sortBy !== 'rating' ? sortBy : '');

        const queryString = params.toString();
        const next = `${window.location.pathname}${queryString ? `?${queryString}` : ''}${window.location.hash}`;
        const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;

        if (next !== current) {
            window.history.replaceState(window.history.state, '', next);
        }
    }, [searchQuery, activeCategory, activeRegency, sortBy]);

    const [selectedDestination, setSelectedDestination] = useState(null);

    const openDetail = (destination) =>
        setSelectedDestination({
            ...destination,
            ...(destinationDetails[destination.slug] ?? {
                tagline: destination.name,
                openingHours: '08.00 – 17.00 WIB',
                address: destination.regency,
                description: destination.description ?? destination.name,
                facilities: ['Pemandu', 'Toilet', 'Parkir'],
                tips: ['Patuhi aturan setempat dan jaga kebersihan.'],
            }),
        });

    const resetFilters = () => {
        setSearchQuery('');
        setActiveCategory('Semua');
        setActiveRegency('');
    };

    const regencies = useMemo(
        () => [...new Set(allDestinations.map((d) => d.regency).filter(Boolean))].sort(),
        [allDestinations],
    );

    const filteredDestinations = useMemo(() => {
        const keyword = searchQuery.trim().toLowerCase();

        const results = allDestinations.filter(
            (destination) =>
                (activeCategory === 'Semua' || destination.category === activeCategory) &&
                (!activeRegency || destination.regency === activeRegency) &&
                (!keyword ||
                    [destination.name, destination.category, destination.regency].some((field) =>
                        (field ?? '').toLowerCase().includes(keyword),
                    )),
        );

        const comparators = {
            rating: (a, b) => b.rating - a.rating,
            reviews: (a, b) => b.reviewCount - a.reviewCount,
            'price-low': (a, b) => a.priceMin - b.priceMin,
            'price-high': (a, b) => (b.priceMax ?? b.priceMin) - (a.priceMax ?? a.priceMin),
        };

        return results.sort(comparators[sortBy]);
    }, [allDestinations, searchQuery, activeCategory, activeRegency, sortBy]);

    return (
        <>
            <Head title="Destinasi Wisata - Jelajah Lampung">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col bg-white text-slate-800 antialiased" style={{ fontFamily }}>
                <PublicNavbar />

                <main className="flex-1 pb-20 pt-28 sm:pb-28 sm:pt-32">
                    <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
                        <header className="max-w-xl">
                            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">Jelajahi Lampung</h1>
                            <p className="mt-3 text-slate-600">{allDestinations.length} destinasi menanti Anda.</p>
                        </header>

                        <div className="mt-10 space-y-6">
                            <label className="relative block w-full">
                                <span className="sr-only">Cari destinasi</span>
                                <svg
                                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <circle cx="11" cy="11" r="7" />
                                    <path d="M20 20l-3.5-3.5" />
                                </svg>
                                <input
                                    type="search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Cari destinasi atau daerah"
                                    className={`${controlClass} w-full py-2.5 pl-10 pr-10 placeholder:text-slate-400 [&::-webkit-search-cancel-button]:hidden`}
                                />
                                {searchQuery && (
                                    <button
                                        type="button"
                                        onClick={() => setSearchQuery('')}
                                        aria-label="Hapus pencarian"
                                        className={`absolute right-2.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-sm text-slate-400 transition hover:text-slate-700 ${focusRing}`}
                                    >
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </label>

                            <div className="flex gap-x-6 overflow-x-auto border-b border-slate-200">
                                {allCategories.map((category) => (
                                    <button
                                        key={category}
                                        type="button"
                                        onClick={() => setActiveCategory(category)}
                                        aria-pressed={activeCategory === category}
                                        className={`-mb-px shrink-0 border-b-2 pb-3 text-sm font-medium transition-colors ${focusRing} ${
                                            activeCategory === category
                                                ? 'border-yellow-600 text-slate-900'
                                                : 'border-transparent text-slate-500 hover:text-slate-900'
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex flex-col gap-2 sm:flex-row">
                                    <select
                                        value={activeRegency}
                                        onChange={(e) => setActiveRegency(e.target.value)}
                                        aria-label="Filter kabupaten atau kota"
                                        className={`${controlClass} py-2 pl-3 pr-8 ${activeRegency ? 'border-yellow-600 text-slate-900' : ''}`}
                                    >
                                        <option value="">Semua daerah</option>
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
                                        className={`${controlClass} py-2 pl-3 pr-8`}
                                    >
                                        {sortOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                Urutkan: {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <p className="text-sm text-slate-500" aria-live="polite">
                                    {filteredDestinations.length} destinasi ditemukan
                                </p>
                            </div>
                        </div>

                        {filteredDestinations.length > 0 ? (
                            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                                {filteredDestinations.map((destination) => (
                                    <DestinationListCard key={destination.slug} destination={destination} onOpenDetail={openDetail} />
                                ))}
                            </div>
                        ) : (
                            <div className="mt-16 max-w-sm">
                                <h2 className="text-xl font-semibold tracking-tight text-slate-900">Destinasi tidak ditemukan</h2>
                                <p className="mt-2 text-slate-600">Coba kata kunci atau filter yang berbeda.</p>
                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    className={`mt-6 rounded-md border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-50 ${focusRing}`}
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