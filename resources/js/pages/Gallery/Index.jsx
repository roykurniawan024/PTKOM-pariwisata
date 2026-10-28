import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';

const galleryCategories = [
    { id: 'all', name: 'Semua Foto' },
    { id: 'bahari', name: 'Wisata Bahari' },
    { id: 'alam', name: 'Keindahan Alam' },
    { id: 'pantai', name: 'Pantai & Pesisir' },
    { id: 'budaya', name: 'Seni & Budaya' },
];

const galleryItemsData = [
    {
        id: 1,
        title: 'Bawah Laut Pulau Pahawang',
        category: 'bahari',
        categoryLabel: 'Wisata Bahari',
        location: 'Pesawaran',
        photographer: 'Ahmad Rizky',
        likes: 342,
        image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
        aspect: 'aspect-[4/3]',
    },
    {
        id: 2,
        title: 'Gajah Sumatera Way Kambas',
        category: 'alam',
        categoryLabel: 'Keindahan Alam',
        location: 'Lampung Timur',
        photographer: 'Siti Rahma',
        likes: 489,
        image: 'https://images.unsplash.com/photo-1564760055775-d63b19a55371?auto=format&fit=crop&w=1200&q=80',
        aspect: 'aspect-[3/4]',
    },
    {
        id: 3,
        title: 'Tebing Eksotis Gigi Hiu',
        category: 'pantai',
        categoryLabel: 'Pantai & Pesisir',
        location: 'Tanggamus',
        photographer: 'Budi Santoso',
        likes: 512,
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        aspect: 'aspect-[4/3]',
    },
    {
        id: 4,
        title: 'Atraksi Lumba-Lumba Kiluan',
        category: 'bahari',
        categoryLabel: 'Wisata Bahari',
        location: 'Tanggamus',
        photographer: 'Deni Kurniawan',
        likes: 620,
        image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80',
        aspect: 'aspect-[16/9]',
    },
    {
        id: 5,
        title: 'Matahari Terbit Anak Krakatau',
        category: 'alam',
        categoryLabel: 'Keindahan Alam',
        location: 'Lampung Selatan',
        photographer: 'Eka Pratama',
        likes: 730,
        image: 'https://images.unsplash.com/photo-1608953154378-b19b808a974b?auto=format&fit=crop&w=1200&q=80',
        aspect: 'aspect-[4/3]',
    },
    {
        id: 6,
        title: 'Kemegahan Menara Siger',
        category: 'budaya',
        categoryLabel: 'Seni & Budaya',
        location: 'Bakauheni',
        photographer: 'Fajar Hidayat',
        likes: 290,
        image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
        aspect: 'aspect-[3/4]',
    },
    {
        id: 7,
        title: 'Pantai Walur Khas Pesisir Barat',
        category: 'pantai',
        categoryLabel: 'Pantai & Pesisir',
        location: 'Pesisir Barat',
        photographer: 'Gita Maya',
        likes: 310,
        image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80',
        aspect: 'aspect-[4/3]',
    },
    {
        id: 8,
        title: 'Penari Siger Lampung',
        category: 'budaya',
        categoryLabel: 'Seni & Budaya',
        location: 'Bandar Lampung',
        photographer: 'Hendra Gunawan',
        likes: 440,
        image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
        aspect: 'aspect-[16/9]',
    },
    {
        id: 9,
        title: 'Surfing di Krui Wave',
        category: 'bahari',
        categoryLabel: 'Wisata Bahari',
        location: 'Pesisir Barat',
        photographer: 'Indra Jaya',
        likes: 810,
        image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=80',
        aspect: 'aspect-[4/3]',
    },
];

export default function GalleryIndex({ galleryItems = [] }) {
    const items = galleryItems.length > 0 ? galleryItems : galleryItemsData;
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [activeLightbox, setActiveLightbox] = useState(null);

    const filteredItems = selectedCategory === 'all'
        ? items
        : items.filter(item => item.category === selectedCategory);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
            <Head title="Galeri Foto Keindahan Lampung - Wonderly Lampung" />

            <PublicNavbar />

            {/* Header Hero Section */}
            <section className="relative pt-64 pb-20 overflow-hidden bg-slate-900 text-white">
                <div className="absolute inset-0 z-0 opacity-30 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>

                <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-3xl mx-auto leading-tight">
                        Potret Keajaiban <span className="font-serif italic font-normal text-amber-400">Sang Bumi Ruwa Jurai</span>
                    </h1>


                    <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Jelajahi momen-momen spektakuler alam, kebudayaan, dan keindahan pesisir Lampung melalui lensa para fotografer berbakat.
                    </p>

                    {/* Category Filter Pills */}
                    <div className="mt-10 flex flex-wrap justify-center gap-2.5 sm:gap-3">
                        {galleryCategories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                                    selectedCategory === cat.id
                                        ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30 scale-105'
                                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                                }`}
                            >
                                {cat.id === 'all' && <i className="bx bx-grid-alt text-base"></i>}
                                {cat.id === 'bahari' && <i className="bx bx-water text-base"></i>}
                                {cat.id === 'alam' && <i className="bx bx-landscape text-base"></i>}
                                {cat.id === 'pantai' && <i className="bx bx-sun text-base"></i>}
                                {cat.id === 'budaya' && <i className="bx bx-mask text-base"></i>}
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Grid Section */}
            <section className="py-16 sm:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {filteredItems.map((item) => (
                            <div
                                key={item.id}
                                className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                                onClick={() => setActiveLightbox(item)}
                            >
                                <div className="relative overflow-hidden aspect-[4/3]">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

                                    {/* Top badges */}
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 backdrop-blur-md px-3 py-1 text-xs font-medium text-white border border-white/10">
                                            <i className="bx bx-tag-alt text-amber-400"></i>
                                            {item.categoryLabel}
                                        </span>
                                    </div>

                                    <div className="absolute top-4 right-4">
                                        <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <i className="bx bx-expand-alt text-lg"></i>
                                        </div>
                                    </div>

                                    {/* Bottom Info */}
                                    <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                                        <div className="flex items-center gap-1 text-xs text-amber-300 font-medium mb-1">
                                            <i className="bx bx-map-pin"></i>
                                            <span>{item.location}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                                            {item.title}
                                        </h3>
                                        <div className="mt-3 flex items-center justify-between text-xs text-slate-300 pt-3 border-t border-white/15">
                                            <span className="flex items-center gap-1">
                                                <i className="bx bx-camera text-slate-400"></i>
                                                {item.photographer}
                                            </span>
                                            {item.likes !== undefined && <span className="flex items-center gap-1 text-pink-400 font-medium">
                                                <i className="bx bxs-heart"></i>
                                                {item.likes}
                                            </span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox Modal */}
            {activeLightbox && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 sm:p-6"
                    onClick={() => setActiveLightbox(null)}
                >
                    <div
                        className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setActiveLightbox(null)}
                            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 flex items-center justify-center transition"
                        >
                            <i className="bx bx-x text-2xl"></i>
                        </button>

                        <div className="relative aspect-[16/10] bg-black">
                            <img
                                src={activeLightbox.image}
                                alt={activeLightbox.title}
                                className="w-full h-full object-contain"
                            />
                        </div>

                        <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 text-white border-t border-slate-800">
                            <div>
                                <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold mb-2">
                                    {activeLightbox.categoryLabel}
                                </span>
                                <h3 className="text-xl font-bold">{activeLightbox.title}</h3>
                                <p className="text-sm text-slate-400 flex items-center gap-2 mt-1">
                                    <i className="bx bx-map-pin text-amber-400"></i>
                                    {activeLightbox.location} • Oleh {activeLightbox.photographer}
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-500/20 text-pink-400 border border-pink-500/30 text-xs font-semibold hover:bg-pink-500/30 transition">
                                    <i className="bx bxs-heart text-base"></i>
                                    <span>{activeLightbox.likes} Suka</span>
                                </button>
                                <Link
                                    href="/destinations"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-white text-xs font-semibold hover:bg-amber-600 transition"
                                >
                                    <span>Jelajahi Lokasi</span>
                                    <i className="bx bx-right-arrow-alt text-base"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <PublicFooter />
        </div>
    );
}