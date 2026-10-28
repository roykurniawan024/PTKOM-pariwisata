import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';

const testimonialsData = [
    {
        id: 1,
        quote: 'Keindahan bawah laut Pulau Pahawang dan keramahan warga lokal membuat liburan kami sangat berkesan. Airnya jernih sekali dan terumbu karang terjaga alami!',
        name: 'Rian Hidayat',
        role: 'Travel Vlogger',
        location: 'Jakarta',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: '12 Oktober 2026',
        visited: 'Pulau Pahawang',
    },
    {
        id: 2,
        quote: 'Menyaksikan lumba-lumba langsung di Teluk Kiluan saat matahari terbit adalah pengalaman yang tak terlupakan. Kapten perahunya sangat ramah dan berpengalaman!',
        name: 'Sarah Wijaya',
        role: 'Fotografer Alam',
        location: 'Bandung',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: '28 September 2026',
        visited: 'Teluk Kiluan',
    },
    {
        id: 3,
        quote: 'Kombinasi sempurna antara keanekaragaman satwa Way Kambas dan keanggunan Kain Tapis Lampung. Edukasi konservasi gajahnya luar biasa.',
        name: 'Dimas Prasetyo',
        role: 'Backpacker & Researcher',
        location: 'Yogyakarta',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: '05 September 2026',
        visited: 'Taman Nasional Way Kambas',
    },
    {
        id: 4,
        quote: 'Formasi tebing karang di Pantai Gigi Hiu benar-benar spektakuler! Sangat bagus untuk fotografi landsekap saat pemandangan matahari terbenam.',
        name: 'Maya Indah',
        role: 'Content Creator',
        location: 'Surabaya',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: '18 Agustus 2026',
        visited: 'Pantai Gigi Hiu',
    },
    {
        id: 5,
        quote: 'Mendaki dan melihat kawah Gunung Anak Krakatau memberikan sensasi petualangan vulkanik terbaik. Pemandangannya tiada tanding!',
        name: 'Andi Saputra',
        role: 'Pendaki & Petualang',
        location: 'Medan',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: '02 Agustus 2026',
        visited: 'Gunung Anak Krakatau',
    },
    {
        id: 6,
        quote: 'Menara Siger sebagai gerbang Sumatera sangat megah. Mengenal kebudayaan Lampung dan sejarahnya lewat museum lokal sungguh menambah wawasan.',
        name: 'Nadia Putri',
        role: 'Wisatawan Keluarga',
        location: 'Palembang',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: '20 Juli 2026',
        visited: 'Menara Siger',
    },
];

export default function TestimonialsIndex({ testimonials = [] }) {
    const items = testimonials.length > 0 ? testimonials : testimonialsData;
    const [filterRating, setFilterRating] = useState('all');

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
            <Head title="Testimoni Pengunjung - Wanderly" />

            <PublicNavbar />

            {/* Hero Header */}
            <section className="relative pt-64 pb-20 overflow-hidden bg-slate-900 text-white">
<<<<<<< HEAD
                <div className="absolute inset-0 z-0 opacity-30 bg-[radial-gradient(#eab308_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-yellow-600/20 rounded-full blur-3xl"></div>
=======
                <div className="absolute inset-0 z-0 opacity-30 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"></div>
>>>>>>> 68d7f453f425278cde84d736a18e0735a5cfa693
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>

                <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-3xl mx-auto leading-tight">
<<<<<<< HEAD
                        Apa Kata Mereka Tentang <span className="font-serif italic font-normal text-yellow-400">Lampung?</span>
=======
                        Apa Kata Mereka Tentang <span className="font-serif italic font-normal text-amber-400">Lampung?</span>
>>>>>>> 68d7f453f425278cde84d736a18e0735a5cfa693
                    </h1>

                    <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Pengalaman jujur dari para wisatawan Nusantara dan mancanegara yang telah menjelajahi surga tersembunyi di Provinsi Lampung.
                    </p>

                    {/* Stats Highlights */}
                    <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto border border-slate-800 rounded-2xl bg-slate-900/80 backdrop-blur-md p-6">
                        <div>
<<<<<<< HEAD
                            <div className="text-3xl font-extrabold text-yellow-400">4.9/5</div>
=======
                            <div className="text-3xl font-extrabold text-amber-400">4.9/5</div>
>>>>>>> 68d7f453f425278cde84d736a18e0735a5cfa693
                            <div className="text-xs text-slate-400 mt-1">Kepuasan Wisatawan</div>
                        </div>
                        <div>
                            <div className="text-3xl font-extrabold text-emerald-400">10.000+</div>
                            <div className="text-xs text-slate-400 mt-1">Ulasan Positif</div>
                        </div>
                        <div>
                            <div className="text-3xl font-extrabold text-amber-400">98%</div>
                            <div className="text-xs text-slate-400 mt-1">Rekomendasi Kembali</div>
                        </div>
                        <div>
                            <div className="text-3xl font-extrabold text-cyan-400">100%</div>
                            <div className="text-xs text-slate-400 mt-1">Pengalaman Otentik</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials List Section */}
            <section className="py-16 sm:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-sm border border-slate-200/80 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group"
                            >
                                <div>
                                    {/* Rating Stars & Location Badge */}
                                    <div className="flex items-center justify-between gap-2 mb-6">
                                        <div className="flex items-center gap-1 text-amber-400">
                                            {[...Array(item.rating)].map((_, i) => (
                                                <i key={i} className="bx bxs-star text-lg"></i>
                                            ))}
                                        </div>
<<<<<<< HEAD
                                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-yellow-600 bg-yellow-50 rounded-full px-3 py-1 border border-yellow-100">
=======
                                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-500 bg-amber-50 rounded-full px-3 py-1 border border-amber-100">
>>>>>>> 68d7f453f425278cde84d736a18e0735a5cfa693
                                            <i className="bx bx-map-pin"></i>
                                            {item.visited}
                                        </span>
                                    </div>

                                    {/* Quote */}
                                    <div className="relative">
<<<<<<< HEAD
                                        <i className="bx bxs-quote-alt-left text-4xl text-yellow-100 absolute -top-3 -left-2 -z-0"></i>
=======
                                        <i className="bx bxs-quote-alt-left text-4xl text-amber-100 absolute -top-3 -left-2 -z-0"></i>
>>>>>>> 68d7f453f425278cde84d736a18e0735a5cfa693
                                        <p className="relative z-10 text-sm leading-relaxed text-slate-600 italic">
                                            "{item.quote}"
                                        </p>
                                    </div>
                                </div>

                                {/* User Details */}
                                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={item.avatar}
                                            alt={item.name}
<<<<<<< HEAD
                                            className="w-12 h-12 rounded-full object-cover ring-2 ring-yellow-100"
                                        />
                                        <div>
                                            <h4 className="text-sm font-bold text-slate-900 group-hover:text-yellow-600 transition-colors">
=======
                                            className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-100"
                                        />
                                        <div>
                                            <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-500 transition-colors">
>>>>>>> 68d7f453f425278cde84d736a18e0735a5cfa693
                                                {item.name}
                                            </h4>
                                            <p className="text-xs text-slate-500">
                                                {item.role} • <span className="text-slate-400">{item.location}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Share Experience CTA */}
<<<<<<< HEAD
                    <div className="mt-16 rounded-3xl bg-gradient-to-r from-yellow-600 to-amber-700 p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
=======
                    <div className="mt-16 rounded-3xl bg-gradient-to-r from-amber-500 to-indigo-700 p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
>>>>>>> 68d7f453f425278cde84d736a18e0735a5cfa693
                        <div>
                            <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider mb-3">
                                Punya Pengalaman Seru?
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-bold">
                                Bagikan Cerita Perjalanan Anda di Lampung
                            </h3>
<<<<<<< HEAD
                            <p className="mt-2 text-sm text-yellow-100 max-w-xl">
=======
                            <p className="mt-2 text-sm text-amber-100 max-w-xl">
>>>>>>> 68d7f453f425278cde84d736a18e0735a5cfa693
                                Cerita dan testimoni Anda dapat menginspirasi ribuan wisatawan lainnya untuk mengeksplorasi keindahan Provinsi Lampung.
                            </p>
                        </div>
                        <Link
                            href="/destinations"
<<<<<<< HEAD
                            className="shrink-0 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-bold text-yellow-700 shadow-lg hover:bg-yellow-50 transition transform hover:scale-105"
=======
                            className="shrink-0 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-bold text-amber-600 shadow-lg hover:bg-amber-50 transition transform hover:scale-105"
>>>>>>> 68d7f453f425278cde84d736a18e0735a5cfa693
                        >
                            <i className="bx bx-edit text-xl"></i>
                            <span>Tulis Testimoni</span>
                        </Link>
                    </div>
                </div>
            </section>

            <PublicFooter />
        </div>
    );
}