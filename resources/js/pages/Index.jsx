import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import DestinationCard from '@/components/DestinationCard';
import PublicFooter from '@/components/PublicFooter';
import PublicNavbar from '@/components/PublicNavbar';
import TestimonialCard from '@/components/TestimonialCard';

const categories = ['Semua', 'Bahari', 'Alam', 'Pantai', 'Budaya'];

// Gambar hero statis (tidak dari database). Tambah item baru di sini untuk menambah slide.
const heroImages = [
    {
        src: 'https://asdp.id/storage//uploads/siaranpers/d905b966b12f4610fce258007a737f4d.jpeg',
        alt: 'Menara Siger Lampung',
    },
    {
        src: 'https://www.batiqa.com/upload/news/z/lampung-pantai-gigi-hiu_3mnwt.jpg',
        alt: 'Pesona wisata Lampung',
    },
];

const HERO_INTERVAL = 5000;

const cultureFeatures = [
    {
        title: 'Adat Istiadat',
        desc: 'Tradisi dan nilai luhur masyarakat Lampung yang diwariskan dari generasi ke generasi.',
    },
    {
        title: 'Tarian Tradisional',
        desc: 'Seni tari Lampung yang mencerminkan identitas, penghormatan, dan keramahan masyarakat.',
    },
    {
        title: 'Kain Tapis',
        desc: 'Kain tradisional Lampung dengan sulaman khas yang memiliki nilai seni dan budaya.',
    },
    {
        title: 'Seni dan Kerajinan',
        desc: 'Karya seni lokal yang mencerminkan kreativitas dan kekayaan budaya Lampung.',
    },
];

const fontFamily = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";
const container = 'mx-auto w-full max-w-7xl px-6 lg:px-8';

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

function GridBackground() {
    const mask = 'radial-gradient(ellipse at center, black 40%, transparent 85%)';

    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
                backgroundImage:
                    'linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)',
                backgroundSize: '48px 48px',
                maskImage: mask,
                WebkitMaskImage: mask,
            }}
        />
    );
}

export default function Index({
    destinations: initialDestinations = [],
    categories: initialCategories = [],
    statistics: initialStatistics = [],
    testimonials = [],
    galleryImages = [],
}) {
    const destinationsList = initialDestinations;
    const categoriesList = initialCategories && initialCategories.length > 0 ? ['Semua', ...initialCategories] : categories;
    const statsList = initialStatistics ?? [];
    const [activeCategory, setActiveCategory] = useState('Semua');
    const [heroIndex, setHeroIndex] = useState(0);

    // Ganti gambar hero otomatis. Dilewati jika pengguna memilih mengurangi animasi.
    useEffect(() => {
        if (heroImages.length < 2) return undefined;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

        // heroIndex ada di dependency agar timer diulang setelah dot diklik manual.
        const timer = setTimeout(() => {
            setHeroIndex((current) => (current + 1) % heroImages.length);
        }, HERO_INTERVAL);

        return () => clearTimeout(timer);
    }, [heroIndex]);

    const filteredDestinations =
        (activeCategory === 'Semua' ? destinationsList : destinationsList.filter((d) => d.category === activeCategory)).slice(0, 3);

    const cultureImages = galleryImages.filter((image) =>
        /budaya|tari|adat|tenun|kerajinan|seni/i.test(
            `${image.category} ${image.title}`
        )
    );

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
                        {heroImages.map((image, index) => (
                            <img
                                key={image.src}
                                src={image.src}
                                alt={image.alt}
                                aria-hidden={index !== heroIndex}
                                loading={index === 0 ? 'eager' : 'lazy'}
                                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
                                    index === heroIndex ? 'opacity-100' : 'opacity-0'
                                }`}
                            />
                        ))}
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

                        {/* Indikator Slide */}
                        {heroImages.length > 1 && (
                            <div className="absolute bottom-24 right-6 z-10 flex items-center gap-2 lg:right-8">
                                {heroImages.map((image, index) => (
                                    <button
                                        key={image.src}
                                        type="button"
                                        onClick={() => setHeroIndex(index)}
                                        aria-label={`Tampilkan gambar ${index + 1}`}
                                        aria-current={index === heroIndex}
                                        className={`h-2 rounded-full transition-all duration-300 ${
                                            index === heroIndex ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
                                        }`}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Scroll Indicator */}
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce">
                            <span className="text-[10px] uppercase font-bold tracking-widest">Scroll</span>
                            <i className="bx bx-chevron-down text-2xl"></i>
                        </div>
                    </section>

                    {/* Statistik Bar */}
                    <section className="relative z-20 -mt-14 px-4 sm:-mt-16">
                        <div className={container}>
                            <div className="relative overflow-hidden rounded-xl border border-amber-200/70 bg-gradient-to-br from-white via-white to-amber-100/80 p-6 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.18)] backdrop-blur-xl sm:p-8 lg:p-10">
                                {/* Aksen gradasi emas */}
                                <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-gradient-to-br from-yellow-400/30 to-amber-500/5 blur-3xl" />
                                <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-gradient-to-tr from-amber-400/20 to-yellow-200/10 blur-3xl" />

                                {/* Kilau emas tipis di bagian atas */}
                                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-white via-amber-400 to-white" />

                                <dl className="relative grid grid-cols-2 gap-y-8 md:grid-cols-4 md:gap-y-0">
                                    {statsList.map((statistic, idx) => (
                                        <div
                                            key={statistic.label}
                                            className={`group relative flex flex-col items-center justify-center px-3 text-center transition-all duration-300 hover:-translate-y-1 ${
                                                idx < statsList.length - 1
                                                    ? 'md:border-r md:border-amber-200'
                                                    : ''
                                            }`}
                                        >
                                            <div className="mb-3 h-1 w-8 rounded-full bg-gradient-to-r from-amber-400 to-yellow-600 transition-all duration-300 group-hover:w-14" />

                                            <dd className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                                                <span className="bg-gradient-to-br from-amber-500 via-yellow-600 to-orange-500 bg-clip-text text-transparent">
                                                    {statistic.value}
                                                </span>
                                            </dd>

                                            <dt className="mt-2 text-[9px] font-bold uppercase tracking-[0.14em] text-slate-600 sm:text-[10px]">
                                                {statistic.label}
                                            </dt>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                    </section>

                    {/* Destinasi */}
                    <section id="destinations" className="relative isolate bg-white py-24 sm:py-32">
                        <GridBackground />

                        <div className={container}>
                            <div className="flex flex-col items-center justify-center gap-8 mb-12">
                                <SectionHeader
                                    title="Tempat yang Wajib Dikunjungi"
                                    description="Destinasi terbaik di Lampung, dari kepulauan tropis hingga taman nasional bersejarah."
                                />

                                <div className="flex flex-wrap gap-2 p-1.5 rounded-xl shadow-sm bg-slate-50 border border-slate-100">
                                    {categoriesList.map((category) => (
                                        <button
                                            key={category}
                                            type="button"
                                            onClick={() => setActiveCategory(category)}
                                            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
                                                activeCategory === category
                                                    ? 'bg-white text-yellow-600 shadow-sm border border-slate-100'
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
                                    className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-yellow-600 shadow-lg shadow-slate-900/10"
                                >
                                    <span>Lihat Semua Destinasi</span>
                                    <i className="bx bx-grid-alt text-lg"></i>
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* Budaya Section */}
                    <section id="budaya" className="overflow-hidden bg-slate-50 py-24 sm:py-32">
                        <div className={container}>
                            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                                <div className="space-y-10">
                                    <SectionHeader
                                        title="Budaya Lampung yang Abadi"
                                        description="Adat, tarian, tenun, dan seni turun-temurun yang menjaga jiwa Sang Bumi Ruwa Jurai."
                                    />

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        {cultureFeatures.map((feature) => (
                                            <div
                                                key={feature.title}
                                                className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-md"
                                            >
                                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-600">
                                                    <i className="bx bx-star text-2xl"></i>
                                                </div>
                                                <h3 className="mb-2 font-bold text-slate-900">
                                                    {feature.title}
                                                </h3>
                                                <p className="text-sm leading-relaxed text-slate-500">
                                                    {feature.desc}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="relative">
                                    {cultureImages.length > 0 ? (
                                        <>
                                            <div className="aspect-square rotate-3 overflow-hidden rounded-[3rem] bg-slate-200 shadow-2xl">
                                                <img
                                                    src={cultureImages[0].src}
                                                    alt={cultureImages[0].title}
                                                    loading="lazy"
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>

                                            {cultureImages.length > 1 && (
                                                <div className="absolute -bottom-8 -left-8 aspect-video w-64 -rotate-6 overflow-hidden rounded-3xl border-4 border-white bg-slate-200 shadow-2xl">
                                                    <img
                                                        src={cultureImages[1].src}
                                                        alt={cultureImages[1].title}
                                                        loading="lazy"
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="flex aspect-square items-center justify-center rounded-[3rem] bg-slate-200 p-8 text-center text-slate-500">
                                            <p>Foto budaya belum tersedia.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Galeri Preview */}
                    <section id="galeri" className="relative isolate bg-white py-24 sm:py-32">
                        <GridBackground />

                        <div className={container}>
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                                <SectionHeader
                                    title="Galeri Foto Keindahan"
                                    description="Dokumentasi visual pesona alam, bawah laut, dan kekayaan budaya Sang Bumi Ruwa Jurai."
                                />
                                <Link
                                    href={route('gallery.index')}
                                    className="group inline-flex items-center gap-2 text-sm font-bold text-yellow-600 hover:text-yellow-700 transition"
                                >
                                    <span>Lihat Semua Galeri</span>
                                    <i className="bx bx-right-arrow-alt text-xl group-hover:translate-x-1 transition-transform"></i>
                                </Link>
                            </div>

                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                                {galleryImages.slice(0, 4).map((image, index) => (
                                    <div
                                        key={image.id}
                                        className={`group relative aspect-square overflow-hidden rounded-[2rem] bg-slate-100 ${
                                            index === 0 ? 'sm:col-span-2 sm:row-span-2 sm:aspect-auto' : ''
                                        }`}
                                    >
                                        <img
                                            src={image.src}
                                            alt={`Foto ${image.title}`}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />

                                        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-slate-950/70 to-transparent p-6 opacity-0 transition-opacity group-hover:opacity-100">
                                            <div className="text-white">
                                                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-yellow-300">
                                                    {image.category}
                                                </p>
                                                <p className="text-lg font-bold">{image.title}</p>
                                                <p className="text-sm text-white/80">{image.location}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Testimoni Preview */}
                    <section id="testimoni" className="bg-gray-100 py-24 sm:py-32">
                        <div className={container}>
                            <div className="mx-auto mb-16 max-w-3xl text-center">
                                <SectionHeader
                                    centered
                                    title="Apa Kata Mereka?"
                                    description="Dengarkan cerita dan kesan mendalam dari para pelancong yang telah menjelajahi Lampung."
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                                {testimonials.slice(0, 3).map((item) => (
                                    <TestimonialCard key={item.id} {...item} />
                                ))}
                            </div>

                            {testimonials.length > 0 && (
                                <div className="mt-16 text-center">
                                    <Link
                                        href={route('testimonials.index')}
                                        className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-yellow-600"
                                    >
                                        <span>Baca Lebih Banyak Cerita</span>
                                        <i className="bx bx-plus-circle text-lg" />
                                    </Link>
                                </div>
                            )}

                            {testimonials.length === 0 && (
                                <p className="text-center text-sm text-slate-500">
                                    Belum ada ulasan pengunjung.
                                </p>
                            )}
                        </div>
                    </section>

                    {/* CTA */}
                    <section id="rencanakan" className="relative isolate bg-white py-24 sm:py-32">
                        <GridBackground />

                        <div className={container}>
                            <div className="relative overflow-hidden rounded-xl bg-slate-900 px-8 py-20 sm:px-16 sm:py-28 text-center">
                                <div className="absolute inset-0 opacity-20">
                                    <img
                                        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80"
                                        className="w-full h-full object-cover"
                                        alt="Background"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-b from-yellow-600/20 to-slate-950/90" />

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
                                            className="inline-flex items-center gap-2 rounded-2xl bg-yellow-600 px-10 py-5 text-sm font-bold text-white transition-all hover:bg-yellow-700 shadow-xl shadow-yellow-600/20"
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