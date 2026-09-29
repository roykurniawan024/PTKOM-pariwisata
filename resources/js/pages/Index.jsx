import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import DestinationCard from '@/components/DestinationCard';
import TestimonialCard from '@/components/TestimonialCard';

const navigationLinks = [
    { label: 'Destinasi', href: '/destinasi' },
    { label: 'Budaya', href: '#budaya' },
    { label: 'Galeri', href: '#galeri' },
    { label: 'Testimoni', href: '#testimoni' },
];

const statistics = [
    { value: '47+', label: 'DESTINASI WISATA' },
    { value: '1.2jt', label: 'WISATAWAN/TAHUN' },
    { value: '9', label: 'KATEGORI WISATA' },
    { value: '4.8★', label: 'RATING RATA-RATA' },
];

const categories = ['Semua', 'Bahari', 'Alam', 'Pantai', 'Budaya'];

const destinationsData = [
    {
        id: 1,
        title: 'Pulau Pahawang',
        category: 'Bahari',
        location: 'Pesawaran',
        rating: 4.9,
        reviewCount: 342,
        description: 'Surga bawah laut terkenal dengan terumbu karang yang asri dan penangkaran anak penyu (tukik).',
        price: 'Rp 250.000 / orang',
        image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 2,
        title: 'Taman Nasional Way Kambas',
        category: 'Alam',
        location: 'Lampung Timur',
        rating: 4.8,
        reviewCount: 215,
        description: 'Pusat konservasi Gajah Sumatera dan Badak Sumatera di tengah hutan dataran rendah yang rimbun.',
        price: 'Rp 100.000 / orang',
        image: 'https://images.unsplash.com/photo-1564760055775-d63b19a55371?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 3,
        title: 'Pantai Gigi Hiu',
        category: 'Pantai',
        location: 'Tanggamus',
        rating: 4.7,
        reviewCount: 180,
        description: 'Formasi batuan karang tajam eksotis yang menjulang tinggi dihempas ombak Samudra Hindia.',
        price: 'Rp 50.000 / orang',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 4,
        title: 'Teluk Kiluan',
        category: 'Bahari',
        location: 'Tanggamus',
        rating: 4.9,
        reviewCount: 290,
        description: 'Saksikan atraksi ratusan lumba-lumba hidung botol berenang bebas di habitat aslinya.',
        price: 'Rp 300.000 / orang',
        image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 5,
        title: 'Gunung Krakatau & Anak Krakatau',
        category: 'Alam',
        location: 'Lampung Selatan',
        rating: 4.9,
        reviewCount: 410,
        description: 'Petualangan vulkanik legendaris dunia dengan panorama matahari terbit yang luar biasa.',
        price: 'Rp 500.000 / orang',
        image: 'https://images.unsplash.com/photo-1608953154378-b19b808a974b?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 6,
        title: 'Menara Siger',
        category: 'Budaya',
        location: 'Lampung Selatan',
        rating: 4.6,
        reviewCount: 155,
        description: 'Ikon budaya Lampung berupa mahkota pengantin wanita bersepuh emas menyambut di gerbang Sumatera.',
        price: 'Rp 25.000 / orang',
        image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
    },
];

const cultureFeatures = [
    {
        title: 'Tari Siger',
        desc: 'Tarian agung penyambutan tamu kehormatan dengan mahkota Siger emas yang memukau.',
        icon: '👑',
    },
    {
        title: 'Kain Tapis',
        desc: 'Seni tenun tradisional bersulam benang emas dengan filosofi luhur leluhur.',
        icon: '🧵',
    },
    {
        title: 'Gamolan Pekhing',
        desc: 'Alat musik tradisional berbahan bilah bambu yang menghasilkan melodi syahdu.',
        icon: '🎶',
    },
    {
        title: 'Pesta Sekura',
        desc: 'Tradisi topeng riang gembira khas masyarakat Lampung Barat pasca Idul Fitri.',
        icon: '🎭',
    },
];

const galleryImages = [
    'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1564760055775-d63b19a55371?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1608953154378-b19b808a974b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
];

const testimonialsData = [
    {
        id: 1,
        quote: 'Keindahan bawah laut Pulau Pahawang dan keramahan warga lokal membuat liburan kami sangat berkesan. Recommended banget!',
        name: 'Rian Hidayat',
        role: 'Travel Vlogger',
        location: 'Jakarta',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        rating: 5,
    },
    {
        id: 2,
        quote: 'Menyaksikan lumba-lumba langsung di Teluk Kiluan saat matahari terbit adalah pengalaman yang tidak akan pernah saya lupakan.',
        name: 'Sarah Wijaya',
        role: 'Fotografer',
        location: 'Bandung',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
        rating: 5,
    },
    {
        id: 3,
        quote: 'Kombinasi sempurna antara wisata alam liar Way Kambas dan kekayaan budaya Kain Tapis. Lampung luar biasa!',
        name: 'Dimas Prasetyo',
        role: 'Backpacker',
        location: 'Yogyakarta',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        rating: 5,
    },
];

export default function Index({ auth }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState('Semua');

    const filteredDestinations =
        activeCategory === 'Semua'
            ? destinationsData
            : destinationsData.filter((d) => d.category === activeCategory);

    return (
        <>
            <Head title="Jelajah Lampung - Pariwisata & Budaya" />
            <div className="flex min-h-screen flex-col font-sans text-slate-800 antialiased">
                {/* Navbar */}
                <nav className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-xs">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
                        {/* Brand Logo */}
                        <div className="flex items-center">
                            <Link
                                href="/"
                                className="font-serif text-2xl tracking-tight"
                            >
                                <span className="font-semibold text-[#2D4D43]">
                                    Jelajah
                                </span>{' '}
                                <span className="italic font-normal text-[#4C83AD]">
                                    Lampung
                                </span>
                            </Link>
                        </div>

                        {/* Navigation Links */}
                        <div className="hidden items-center gap-10 md:flex">
                            {navigationLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="text-sm font-medium text-slate-700 transition hover:text-[#4C83AD]"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="hidden md:flex items-center gap-3">
                            {auth?.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-full bg-[#4C83AD] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#3d6d93]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-sm font-medium text-slate-700 transition hover:text-[#4C83AD]"
                                    >
                                        Masuk
                                    </Link>
                                    <Link
                                        href={route('registrasi.select')}
                                        className="rounded-full bg-[#4C83AD] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#3d6d93]"
                                    >
                                        Daftar Akun
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            type="button"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="rounded-md p-2 text-slate-700 md:hidden"
                            aria-label="Buka menu"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                {isMenuOpen ? (
                                    <path d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Dropdown */}
                    {isMenuOpen && (
                        <div className="flex flex-col gap-2 border-t border-slate-200 bg-white px-6 py-6 shadow-xl md:hidden">
                            {navigationLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <div className="mt-4 flex flex-col gap-3 pt-4 border-t border-slate-100">
                                <a
                                    href="#destinasi"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="rounded-full bg-[#4C83AD] px-6 py-3 text-center text-sm font-medium text-white"
                                >
                                    Rencanakan Wisata
                                </a>
                            </div>
                        </div>
                    )}
                </nav>

                <main className="flex-1">
                    {/* Hero Section */}
                    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
                        {/* Background Image */}
                        <img
                            src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=2000&q=85"
                            alt="Pantai Lampung"
                            className="absolute inset-0 h-full w-full object-cover object-center"
                        />
                        {/* Dark Overlay gradient matching design */}
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/70 to-slate-950/90" />

                        {/* Hero Content */}
                        <div className="relative mx-auto w-full max-w-7xl px-6 py-24 sm:px-8 lg:px-12">
                            <h1 className="font-serif text-5xl font-normal leading-[1.15] text-white sm:text-6xl md:text-7xl lg:text-8xl">
                                Alam Liar,
                                <br />
                                <span className="italic font-normal text-[#E8C5C8]">
                                    Budaya Kaya,
                                </span>
                                <br />
                                <span className="font-bold text-[#4C83AD]">
                                    Lampung.
                                </span>
                            </h1>

                            <p className="mt-8 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                                Dari sabana Way Kambas hingga ombak Samudra Hindia —<br className="hidden sm:inline" />
                                Lampung menyimpan keajaiban alam dan tradisi yang<br className="hidden sm:inline" />
                                menunggu untuk dijelajahi.
                            </p>
                            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                                <a
                                    href="#destinasi"
                                    className="rounded-full bg-[#5B8DBE] px-8 py-4 text-center font-medium text-white transition hover:bg-[#4A7BAA]"
                                >
                                    Mulai Pendaftaran
                                </a>
                                <a
                                    href="#budaya"
                                    className="rounded-full border border-white/30 px-8 py-3.5 text-center text-sm font-medium text-white/90 backdrop-blur-sm transition hover:bg-white/10 hover:text-white"
                                >
                                    Kenali Budaya Lokal
                                </a>
                            </div>
                        </div>

                        {/* Scroll Down Arrow */}
                        <a
                            href="#destinasi"
                            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 transition hover:text-white"
                            aria-label="Scroll down"
                        >
                            <svg
                                className="h-5 w-5 animate-bounce"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </a>
                    </section>

                    {/* Stats Section */}
                    <section className="bg-[#4C83AD] text-white shadow-inner">
                        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-6 py-8 sm:px-8 md:grid-cols-4 lg:px-12">
                            {statistics.map((statistic) => (
                                <div
                                    key={statistic.label}
                                    className="text-center"
                                >
                                    <div className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                        {statistic.value}
                                    </div>
                                    <div className="mt-2 text-[10px] font-medium tracking-widest text-white/80 uppercase">
                                        {statistic.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Destinations Section ("Tempat yang Wajib Dikunjungi") */}
                    <section id="destinasi" className="bg-[#FBF0F0] py-20 sm:py-28">
                        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
                            {/* Header */}
                            <div className="text-center">
                                <span className="text-xs font-semibold tracking-widest text-[#4C83AD] uppercase">
                                    Eksplorasi Keindahan
                                </span>
                                <h2 className="mt-3 font-serif text-3xl font-normal text-slate-900 sm:text-4xl md:text-5xl">
                                    Tempat yang{' '}
                                    <span className="italic text-[#4C83AD]">
                                        Wajib Dikunjungi
                                    </span>
                                </h2>
                                <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
                                    Temukan destinasi wisata terbaik di Lampung mulai dari kepulauan tropis eksotis hingga taman nasional bersejarah.
                                </p>
                            </div>

                            {/* Filter Tabs */}
                            <div className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setActiveCategory(category)}
                                        className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
                                            activeCategory === category
                                                ? 'bg-[#4C83AD] text-white shadow-sm'
                                                : 'bg-white/80 text-slate-700 hover:bg-white shadow-xs'
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>

                            {/* Destinations Grid */}
                            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                {filteredDestinations.map((destination) => (
                                    <DestinationCard
                                        key={destination.id}
                                        {...destination}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Culture Section ("Budaya Lampung yang Abadi") */}
                    <section id="budaya" className="bg-[#F7EBEB] py-20 sm:py-28">
                        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
                            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
                                {/* Left Column: Info & 2x2 Feature Cards */}
                                <div>
                                    <span className="text-xs font-semibold tracking-widest text-[#4C83AD] uppercase">
                                        Warisan Leluhur
                                    </span>
                                    <h2 className="mt-3 font-serif text-3xl font-normal text-slate-900 sm:text-4xl md:text-5xl">
                                        Budaya Lampung yang{' '}
                                        <span className="italic text-[#4C83AD]">
                                            Abadi
                                        </span>
                                    </h2>
                                    <p className="mt-4 text-base leading-relaxed text-slate-600">
                                        Kekayaan tradisi adat, tarian sakral, kain tenun penuh makna, serta warisan seni turun-temurun menjaga jiwa kebanggaan Sang Bumi Ruwa Jurai.
                                    </p>

                                    {/* 2x2 Feature Grid */}
                                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        {cultureFeatures.map((feat) => (
                                            <div
                                                key={feat.title}
                                                className="rounded-xl bg-white p-5 shadow-xs transition hover:shadow-md"
                                            >
                                                <span className="text-2xl">{feat.icon}</span>
                                                <h3 className="mt-3 text-base font-bold text-slate-900">
                                                    {feat.title}
                                                </h3>
                                                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                                                    {feat.desc}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Right Column: Photo Collage / Masonry */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-4">
                                        <div className="overflow-hidden rounded-2xl shadow-md">
                                            <img
                                                src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=600&q=80"
                                                alt="Budaya Lampung 1"
                                                className="h-56 w-full object-cover transition duration-500 hover:scale-105"
                                            />
                                        </div>
                                        <div className="overflow-hidden rounded-2xl shadow-md">
                                            <img
                                                src="https://images.unsplash.com/photo-1564760055775-d63b19a55371?auto=format&fit=crop&w=600&q=80"
                                                alt="Budaya Lampung 2"
                                                className="h-40 w-full object-cover transition duration-500 hover:scale-105"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-4 pt-8">
                                        <div className="overflow-hidden rounded-2xl shadow-md">
                                            <img
                                                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
                                                alt="Budaya Lampung 3"
                                                className="h-40 w-full object-cover transition duration-500 hover:scale-105"
                                            />
                                        </div>
                                        <div className="overflow-hidden rounded-2xl shadow-md">
                                            <img
                                                src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80"
                                                alt="Budaya Lampung 4"
                                                className="h-56 w-full object-cover transition duration-500 hover:scale-105"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Gallery Section ("GALERI FOTO") */}
                    <section id="galeri" className="bg-white py-20 sm:py-28">
                        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
                            <div className="text-center">
                                <span className="text-xs font-semibold tracking-widest text-[#4C83AD] uppercase">
                                    Dokumentasi Perjalanan
                                </span>
                                <h2 className="mt-3 font-serif text-3xl font-normal text-slate-900 sm:text-4xl">
                                    Pesona <span className="italic text-[#4C83AD]">Galeri Foto</span>
                                </h2>
                            </div>

                            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                                {galleryImages.map((imgUrl, index) => (
                                    <div
                                        key={index}
                                        className="group relative overflow-hidden rounded-xl bg-slate-100 aspect-square shadow-sm"
                                    >
                                        <img
                                            src={imgUrl}
                                            alt={`Galeri ${index + 1}`}
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-slate-900/30 opacity-0 transition group-hover:opacity-100" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Testimonials Section ("Mereka Sudah Berkunjung") */}
                    <section id="testimoni" className="bg-[#EAF2F8] py-20 sm:py-28">
                        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
                            <div className="text-center">
                                <span className="text-xs font-semibold tracking-widest text-[#4C83AD] uppercase">
                                    Testimoni Wisatawan
                                </span>
                                <h2 className="mt-3 font-serif text-3xl font-normal text-slate-900 sm:text-4xl md:text-5xl">
                                    Cerita dari{' '}
                                    <span className="italic text-[#4C83AD]">
                                        Mereka yang Sudah Berkunjung
                                    </span>
                                </h2>
                            </div>

                            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                                {testimonialsData.map((item) => (
                                    <TestimonialCard
                                        key={item.id}
                                        {...item}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Bottom CTA Section ("Lampung Menunggu Anda") */}
                    <section id="rencanakan" className="bg-[#1E3A34] py-20 text-white sm:py-28">
                        <div className="mx-auto max-w-7xl px-6 text-center sm:px-8 lg:px-12">
                            <h2 className="font-serif text-4xl font-normal tracking-tight sm:text-5xl md:text-6xl">
                                Lampung <span className="italic text-[#E8C5C8]">Menunggu Anda</span>
                            </h2>
                            <p className="mx-auto mt-6 max-w-2xl text-base text-slate-300 sm:text-lg">
                                Mulai rencanakan liburan impian Anda sekarang juga. Rasakan keindahan alam dan kehangatan budaya Lampung secara langsung.
                            </p>
                            <div className="mt-10 flex flex-wrap justify-center gap-4">
                                <Link
                                    href={route('registrasi.select')}
                                    className="rounded-full bg-[#E8C5C8] px-8 py-3.5 text-sm font-bold text-[#1E3A34] shadow-md transition hover:bg-[#dfb5b8]"
                                >
                                    Daftar Akun Sekarang
                                </Link>
                                <a
                                    href="#destinasi"
                                    className="rounded-full border border-white/30 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                                >
                                    Jelajahi Destinasi
                                </a>
                            </div>
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="bg-[#152A25] text-slate-400">
                    <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
                        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
                            {/* Col 1 */}
                            <div className="space-y-4 md:col-span-1">
                                <Link
                                    href="/"
                                    className="font-serif text-2xl tracking-tight text-white"
                                >
                                    <span>Jelajah</span>{' '}
                                    <span className="italic font-normal text-[#E8C5C8]">
                                        Lampung
                                    </span>
                                </Link>
                                <p className="text-sm leading-relaxed text-slate-400">
                                    Portal informasi pariwisata dan kebudayaan resmi Provinsi Lampung. Temukan keindahan Sang Bumi Ruwa Jurai.
                                </p>
                            </div>

                            {/* Col 2 */}
                            <div>
                                <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
                                    Destinasi Populer
                                </h3>
                                <ul className="mt-4 space-y-2.5 text-sm">
                                    <li>
                                        <a href="#destinasi" className="transition hover:text-white">Pulau Pahawang</a>
                                    </li>
                                    <li>
                                        <a href="#destinasi" className="transition hover:text-white">Way Kambas</a>
                                    </li>
                                    <li>
                                        <a href="#destinasi" className="transition hover:text-white">Pantai Gigi Hiu</a>
                                    </li>
                                    <li>
                                        <a href="#destinasi" className="transition hover:text-white">Teluk Kiluan</a>
                                    </li>
                                </ul>
                            </div>

                            {/* Col 3 */}
                            <div>
                                <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
                                    Navigasi Cepat
                                </h3>
                                <ul className="mt-4 space-y-2.5 text-sm">
                                    <li>
                                        <a href="#destinasi" className="transition hover:text-white">Destinasi Wisata</a>
                                    </li>
                                    <li>
                                        <a href="#budaya" className="transition hover:text-white">Budaya & Tradisi</a>
                                    </li>
                                    <li>
                                        <a href="#galeri" className="transition hover:text-white">Galeri Foto</a>
                                    </li>
                                    <li>
                                        <a href="#testimoni" className="transition hover:text-white">Testimoni</a>
                                    </li>
                                </ul>
                            </div>

                            {/* Col 4 */}
                            <div>
                                <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
                                    Kontak & Informasi
                                </h3>
                                <ul className="mt-4 space-y-2.5 text-sm">
                                    <li>Dinas Pariwisata Provinsi Lampung</li>
                                    <li>Bandar Lampung, Indonesia</li>
                                    <li>info@jelajahlampung.id</li>
                                    <li>+62 721 123456</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-slate-500">
                            &copy; {new Date().getFullYear()} Jelajah Lampung. All rights reserved.
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
