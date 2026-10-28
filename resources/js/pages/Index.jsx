import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import DestinationCard from '@/components/DestinationCard';
import PublicFooter from '@/components/PublicFooter';
import PublicNavbar from '@/components/PublicNavbar';
import TestimonialCard from '@/components/TestimonialCard';

const statistics = [
    { value: '47+', label: 'Destinasi wisata' },
    { value: '1,2 jt', label: 'Wisatawan per tahun' },
    { value: '9', label: 'Kategori wisata' },
    { value: '4,8', label: 'Rating rata-rata' },
];

const categories = ['Semua', 'Bahari', 'Alam', 'Pantai', 'Budaya'];

const cultureFeatures = [
    {
        title: 'Tari Siger',
        desc: 'Tarian penyambutan tamu kehormatan dengan mahkota Siger emas.',
    },
    {
        title: 'Kain Tapis',
        desc: 'Tenun tradisional bersulam benang emas dengan filosofi luhur leluhur.',
    },
    {
        title: 'Gamolan Pekhing',
        desc: 'Alat musik bilah bambu yang menghasilkan melodi syahdu.',
    },
    {
        title: 'Pesta Sekura',
        desc: 'Tradisi topeng khas masyarakat Lampung Barat pasca Idul Fitri.',
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

const fontFamily = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";
const container = 'mx-auto w-full max-w-7xl px-6 lg:px-8';
<<<<<<< HEAD
const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-600';
=======
const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-500';
>>>>>>> 68d7f453f425278cde84d736a18e0735a5cfa693

function SectionHeader({ title, description, centered = false }) {
    return (
        <div className={`${centered ? 'text-center mx-auto' : ''} max-w-2xl`}>
            <h2 className="text-3xl text-center leading-tight font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                {title}
            </h2>
            {description && <p className="mt-4 text-lg leading-relaxed text-center text-slate-600">{description}</p>}
        </div>
    );
}

export default function Index({
    destinations: initialDestinations = [],
    categories: initialCategories = [],
    statistics: initialStatistics = [],
}) {
    const destinationsList = initialDestinations;
    const categoriesList = initialCategories && initialCategories.length > 0 ? ['Semua', ...initialCategories] : categories;
    const statsList = initialStatistics && initialStatistics.length > 0 ? initialStatistics : statistics;

    const [activeCategory, setActiveCategory] = useState('Semua');

    const filteredDestinations =
        activeCategory === 'Semua' ? destinationsList : destinationsList.filter((d) => d.category === activeCategory);

    return (
        <>
            <Head title="Wanderly - Jelajahi Keindahan Sang Bumi Ruwa Jurai">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700,800" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col bg-white text-slate-900 antialiased" style={{ fontFamily }}>
                <PublicNavbar />

                <main className="flex-1">
                    {/* Hero */}
                    <section className="relative flex h-[90vh] items-center overflow-hidden">
                        <img
                            src="https://asdp.id/storage//uploads/siaranpers/d905b966b12f4610fce258007a737f4d.jpeg"
                            alt="Menara Siger Lampung"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-transparent" />

                        <div className={`${container} relative z-10`}>
                            <div className="max-w-6xl">
                                <div className="bg-white leading-[2.1] font-semibold text-sm py-1 px-4 w-fit rounded-sm rounded-r-full">
                                    <span>Yuk Kenali</span>
                                </div>
                                <h1 className="text-2xl leading-[1.1] font-extrabold tracking-tight text-white sm:text-4xl lg:text-6xl">
                                    Wisata Alam & Budaya Lampung.
                                </h1>
                                <p className="mt-4 max-w-4xl text-lg leading-relaxed text-slate-100 sm:text-xl">
                                    Dari sabana Way Kambas hingga ombak Samudra Hindia, Lampung menyimpan alam dan tradisi yang menunggu dijelajahi.
                                </p>
                                <div className="mt-10 flex flex-wrap items-center gap-4">
                                    <a
                                        href="#destinations"
                                        className="group inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 text-sm font-bold text-gray-900 transition-all hover:bg-white/90 shadow-lg"
                                    >
                                        <span>Mulai Jelajah</span>
                                        <i className="bx bx-right-arrow-alt text-xl group-hover:translate-x-1 transition-transform"></i>
                                    </a>
                                    <a
                                        href="#budaya"
                                        className="group inline-flex items-center gap-2 rounded-lg bg-transparent px-8 py-3 text-sm font-bold text-white outline outline-[1px] transition-all hover:bg-white/10 backdrop-blur-sm shadow-lg"
                                    >
                                        <span>Kenali Budaya</span>
                                        <i className="bx bx-right-arrow-alt text-xl group-hover:translate-x-1 transition-transform"></i>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Scroll Indicator */}
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce">
                            <span className="text-[10px] uppercase font-bold tracking-widest">Scroll</span>
                            <i className="bx bx-chevron-down text-2xl"></i>
                        </div>
                    </section>

                    {/* Statistik Bar */}
                    <section className="relative z-20 -mt-12">
                        <div className={container}>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 p-8 rounded-xl bg-white shadow-2xl shadow-slate-200 border border-slate-100">
                                {statsList.map((statistic, idx) => (
                                    <div key={statistic.label} className={`flex flex-col items-center text-center ${idx !== statsList.length - 1 ? 'md:border-r border-slate-100' : ''}`}>
<<<<<<< HEAD
                                        <dd className="text-3xl font-extrabold tracking-tight text-yellow-600 sm:text-4xl">{statistic.value}</dd>
=======
                                        <dd className="text-3xl font-extrabold tracking-tight text-amber-500 sm:text-4xl">{statistic.value}</dd>
>>>>>>> 68d7f453f425278cde84d736a18e0735a5cfa693
                                        <dt className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-400">{statistic.label}</dt>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Destinasi */}
                    <section id="destinations" className="py-24 sm:py-32">
                        <div className={container}>
                            <div className="flex flex-col items-center justify-center gap-8 mb-12">
                                <SectionHeader
                                    title="Tempat yang Wajib Dikunjungi"
                                    description="Destinasi terbaik di Lampung, dari kepulauan tropis hingga taman nasional bersejarah."
                                />
                                
                                <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-slate-50 border border-slate-100">
                                    {categoriesList.map((category) => (
                                        <button
                                            key={category}
                                            type="button"
                                            onClick={() => setActiveCategory(category)}
                                            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
                                                activeCategory === category
<<<<<<< HEAD
                                                    ? 'bg-white text-yellow-600 shadow-sm border border-slate-100'
=======
                                                    ? 'bg-white text-amber-500 shadow-sm border border-slate-100'
>>>>>>> 68d7f453f425278cde84d736a18e0735a5cfa693
                                                    : 'text-slate-500 hover:text-slate-900'
                                            }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                {filteredDestinations.map((destination) => (
                                    <DestinationCard key={destination.id} {...destination} />
                                ))}
                            </div>

                            <div className="mt-16 text-center">
                                <Link
                                    href={route('destinations.index')}
<<<<<<< HEAD
                                    className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-yellow-600 shadow-lg shadow-slate-900/10"
=======
                                    className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-amber-500 shadow-lg shadow-slate-900/10"
>>>>>>> 68d7f453f425278cde84d736a18e0735a5cfa693
                                >
                                    <span>Lihat Semua Destinasi</span>
                                    <i className="bx bx-grid-alt text-lg"></i>
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* Budaya Section - Modern Split */}
                    <section id="budaya" className="py-24 sm:py-32 bg-slate-50 overflow-hidden">
                        <div className={container}>
                            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                                <div className="space-y-10">
                                    <SectionHeader
                                        title="Budaya Lampung yang Abadi"
                                        description="Adat, tarian, tenun, dan seni turun-temurun yang menjaga jiwa Sang Bumi Ruwa Jurai."
                                    />
                                    
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        {cultureFeatures.map((feature) => (
<<<<<<< HEAD
                                            <div key={feature.title} className="p-6 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all">
                                                <div className="w-12 h-12 rounded-2xl bg-yellow-50 text-yellow-600 flex items-center justify-center mb-4">
=======
                                            <div key={feature.title} className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all">
                                                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mb-4">
>>>>>>> 68d7f453f425278cde84d736a18e0735a5cfa693
                                                    <i className="bx bx-star text-2xl"></i>
                                                </div>
                                                <h3 className="font-bold text-slate-900 mb-2">{feature.title}</h3>
                                                <p className="text-sm leading-relaxed text-slate-500">{feature.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl rotate-3">
                                        <img 
                                            src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1000&q=80" 
                                            alt="Budaya Lampung" 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute -bottom-8 -left-8 aspect-video w-64 rounded-3xl overflow-hidden shadow-2xl -rotate-6 border-4 border-white">
                                        <img 
                                            src="https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=600&q=80" 
                                            alt="Budaya Lampung 2" 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Galeri Preview */}
                    <section id="galeri" className="py-24 sm:py-32 bg-white">
                        <div className={container}>
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                                <SectionHeader
                                    title="Galeri Foto Keindahan"
                                    description="Dokumentasi visual pesona alam, bawah laut, dan kekayaan budaya Sang Bumi Ruwa Jurai."
                                />
                                <Link
                                    href={route('gallery.index')}
<<<<<<< HEAD
                                    className="group inline-flex items-center gap-2 text-sm font-bold text-yellow-600 hover:text-yellow-700 transition"
=======
                                    className="group inline-flex items-center gap-2 text-sm font-bold text-amber-500 hover:text-amber-600 transition"
>>>>>>> 68d7f453f425278cde84d736a18e0735a5cfa693
                                >
                                    <span>Lihat Semua Galeri</span>
                                    <i className="bx bx-right-arrow-alt text-xl group-hover:translate-x-1 transition-transform"></i>
                                </Link>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                                {galleryImages.slice(0, 4).map((src, index) => (
                                    <div
                                        key={index}
                                        className={`group relative overflow-hidden rounded-[2rem] bg-slate-100 ${index === 0 ? 'sm:col-span-2 sm:row-span-2 aspect-square sm:aspect-auto' : 'aspect-square'}`}
                                    >
                                        <img
                                            src={src}
                                            alt={`Foto wisata Lampung ${index + 1}`}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                                            <div className="text-white">
                                                <p className="text-xs font-bold uppercase tracking-widest mb-1">Destinasi</p>
                                                <p className="text-lg font-bold">Pesona Lampung</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Testimoni Preview */}
<<<<<<< HEAD
                    <section id="testimoni" className="py-24 sm:py-32 bg-gray-100">
=======
                    <section id="testimoni" className="py-24 sm:py-32 bg-amber-50/50">
>>>>>>> 68d7f453f425278cde84d736a18e0735a5cfa693
                        <div className={container}>
                            <div className="text-center max-w-3xl mx-auto mb-16">
                                <SectionHeader
                                    centered
                                    title="Apa Kata Mereka?"
                                    description="Dengarkan cerita dan kesan mendalam dari para pelancong yang telah menjelajahi Lampung."
                                />
                            </div>
                            
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                                {testimonialsData.map((item) => (
                                    <TestimonialCard key={item.id} {...item} />
                                ))}
                            </div>

                            <div className="mt-16 text-center">
                                <Link
                                    href={route('testimonials.index')}
<<<<<<< HEAD
                                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-yellow-600 transition"
=======
                                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-amber-500 transition"
>>>>>>> 68d7f453f425278cde84d736a18e0735a5cfa693
                                >
                                    <span>Baca Lebih Banyak Cerita</span>
                                    <i className="bx bx-plus-circle text-lg"></i>
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* CTA - Modern Dark */}
                    <section id="rencanakan" className="py-24 sm:py-32">
                        <div className={container}>
                            <div className="relative overflow-hidden rounded-xl bg-slate-900 px-8 py-20 sm:px-16 sm:py-28 text-center">
                                <div className="absolute inset-0 opacity-20">
                                    <img 
                                        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80" 
                                        className="w-full h-full object-cover"
                                        alt="Background"
                                    />
                                </div>
<<<<<<< HEAD
                                <div className="absolute inset-0 bg-gradient-to-b from-yellow-600/20 to-slate-950/90" />
=======
                                <div className="absolute inset-0 bg-gradient-to-b from-amber-500/20 to-slate-950/90" />
>>>>>>> 68d7f453f425278cde84d736a18e0735a5cfa693
                                
                                <div className="relative z-10 max-w-3xl mx-auto">
                                    <h2 className="text-4xl leading-tight font-extrabold tracking-tight text-white sm:text-6xl">
                                        Lampung Menunggu Anda.
                                    </h2>
                                    <p className="mt-6 text-lg leading-relaxed text-slate-300">
                                        Rencanakan liburan Anda sekarang dan rasakan langsung keajaiban alam dan kekayaan budaya Sang Bumi Ruwa Jurai.
                                    </p>
                                    <div className="mt-12 flex flex-wrap justify-center items-center gap-4">
                                        <Link
                                            href={route('registrasi.select')}
<<<<<<< HEAD
                                            className="inline-flex items-center gap-2 rounded-2xl bg-yellow-600 px-10 py-5 text-sm font-bold text-white transition-all hover:bg-yellow-700 shadow-xl shadow-yellow-600/20"
=======
                                            className="inline-flex items-center gap-2 rounded-2xl bg-amber-500 px-10 py-5 text-sm font-bold text-white transition-all hover:bg-amber-600 shadow-xl shadow-amber-500/20"
>>>>>>> 68d7f453f425278cde84d736a18e0735a5cfa693
                                        >
                                            <span>Daftar Akun Sekarang</span>
                                            <i className="bx bx-user-plus text-xl"></i>
                                        </Link>
                                        <a
                                            href="#destinations"
                                            className="inline-flex items-center gap-2 rounded-2xl bg-white/10 backdrop-blur-md px-10 py-5 text-sm font-bold text-white border border-white/20 transition-all hover:bg-white/20"
                                        >
                                            Jelajahi Destinasi
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                <PublicFooter />
            </div>
        </>
    );
}