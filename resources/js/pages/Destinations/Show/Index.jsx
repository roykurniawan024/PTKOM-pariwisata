import { Head, Link, useForm, usePage } from '@inertiajs/react';
import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';
import { useState } from 'react';

export default function Show({ destination, reviews = [], userReview = null }) {
    const [activeTab, setActiveTab] = useState('overview');

    if (!destination) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-slate-900 mb-4">Destinasi Tidak Ditemukan</h1>
                    <Link href={route('home')} className="text-amber-500 font-semibold hover:underline">
                        Kembali ke Beranda
                    </Link>
                </div>
            </div>
        );
    }

    // Fallback data if some fields are missing from DB
    const displayData = {
        ...destination,
        name: destination.name || 'Destinasi Wisata',
        category: destination.category?.name || destination.category || 'Wisata',
        tagline: destination.tagline || 'Destinasi Wisata Unggulan Lampung',
        openingHours: destination.opening_hours || '08:00 - 17:00 WIB',
        facilities: destination.facilities || ['Area Parkir', 'Toilet Umum', 'Mushola', 'Spot Foto'],
        tips: destination.tips || [
            'Gunakan pakaian yang nyaman',
            'Bawa kamera untuk mengabadikan momen',
            'Jaga kebersihan lingkungan sekitar',
            'Patuhi protokol kesehatan dan aturan lokal'
        ],
        images: destination.images && destination.images.length > 0 
            ? destination.images 
            : [{ image_url: destination.thumbnail || 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80' }]
    };

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(number);
    };

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans antialiased">
            <Head title={`${displayData.name} - Wonderly Lampung`} />
            
            <PublicNavbar />

            <main className="pt-20">
                {/* Hero Section - Full Width Minimalist */}
                <section className="relative h-[60vh] sm:h-[75vh] w-full overflow-hidden">
                    <img 
                        src={displayData.images[0].image_url} 
                        alt={displayData.name}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 w-full p-6 sm:p-12 lg:p-20">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-bold uppercase tracking-wider">
                                    {displayData.category}
                                </span>
                                <span className="flex items-center gap-1 text-white/90 text-sm font-medium">
                                    <i className="bx bxs-star text-amber-400"></i>
                                    {displayData.rating} ({displayData.approved_reviews_count || 0} Ulasan)
                                </span>
                            </div>
                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-4">
                                {displayData.name}
                            </h1>
                            <p className="text-lg sm:text-xl text-white/80 max-w-2xl font-medium italic">
                                "{displayData.tagline}"
                            </p>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
                        
                        {/* Left Column: Main Info */}
                        <div className="lg:col-span-2 space-y-12">
                            
                            {/* Quick Info Bar */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-8 rounded-3xl bg-slate-50 border border-slate-100">
                                <div className="space-y-1">
                                    <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Lokasi</span>
                                    <p className="text-sm font-bold text-slate-900 flex items-center gap-1">
                                        <i className="bx bx-map-pin text-amber-500"></i>
                                        {displayData.regency || displayData.location}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Durasi</span>
                                    <p className="text-sm font-bold text-slate-900 flex items-center gap-1">
                                        <i className="bx bx-time-five text-amber-500"></i>
                                        {displayData.duration || '1-2 Hari'}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Jam Buka</span>
                                    <p className="text-sm font-bold text-slate-900 flex items-center gap-1">
                                        <i className="bx bx-calendar-check text-amber-500"></i>
                                        {displayData.openingHours}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Tiket Mulai</span>
                                    <p className="text-sm font-bold text-amber-500">
                                        {formatRupiah(displayData.priceMin || displayData.price)}
                                    </p>
                                </div>
                            </div>

                            {/* Tabs Navigation */}
                            <div className="border-b border-slate-100">
                                <div className="flex gap-8">
                                    {['overview', 'facilities', 'tips', 'reviews'].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${
                                                activeTab === tab ? 'text-amber-500' : 'text-slate-400 hover:text-slate-600'
                                            }`}
                                        >
                                            {tab}
                                            {activeTab === tab && (
                                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 rounded-full"></span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Tab Content */}
                            <div className="min-h-[300px]">
                                {activeTab === 'overview' && (
                                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Tentang Destinasi</h3>
                                        <p className="text-lg leading-relaxed text-slate-600">
                                            {displayData.description}
                                        </p>
                                        
                                        {/* Small Gallery Grid */}
                                        <div className="mt-12 grid grid-cols-2 gap-4">
                                            {displayData.images.slice(1, 3).map((img, idx) => (
                                                <div key={idx} className="aspect-video rounded-2xl overflow-hidden">
                                                    <img src={img.image_url} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'facilities' && (
                                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Fasilitas Tersedia</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {displayData.facilities.map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                                    <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center">
                                                        <i className="bx bx-check text-xl"></i>
                                                    </div>
                                                    <span className="font-medium text-slate-700">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'tips' && (
                                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Tips Berkunjung</h3>
                                        <div className="space-y-4">
                                            {displayData.tips.map((tip, idx) => (
                                                <div key={idx} className="flex gap-4 p-6 rounded-2xl bg-amber-50 border border-amber-100">
                                                    <div className="shrink-0 w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                                                        <i className="bx bx-bulb text-2xl"></i>
                                                    </div>
                                                    <p className="text-slate-700 font-medium leading-relaxed">{tip}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'reviews' && (
                                    <ReviewsTab destination={destination} reviews={reviews} userReview={userReview} />
                                )}
                            </div>
                        </div>

                        {/* Right Column: Sidebar / Booking CTA */}
                        <div className="space-y-8">
                            <div className="sticky top-32 p-8 rounded-3xl bg-slate-900 text-white shadow-2xl shadow-slate-200">
                                <h4 className="text-xl font-bold mb-2">Rencanakan Kunjungan</h4>
                                <p className="text-slate-400 text-sm mb-8">Dapatkan pengalaman terbaik menjelajahi {displayData.name} bersama kami.</p>
                                
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                                        <span className="text-sm text-white/60">Harga Tiket</span>
                                        <span className="font-bold text-amber-400">{formatRupiah(displayData.priceMin || displayData.price)}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                                        <span className="text-sm text-white/60">Status</span>
                                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">Buka Sekarang</span>
                                    </div>
                                </div>

                                <button className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold transition-all shadow-lg shadow-amber-500/20 mb-4">
                                    Pesan Tiket Sekarang
                                </button>
                                
                                <a 
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${displayData.name}, Lampung`)}`}
                                    target="_blank"
                                    className="w-full py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all flex items-center justify-center gap-2"
                                >
                                    <i className="bx bx-map-alt"></i>
                                    Petunjuk Arah
                                </a>
                            </div>

                            {/* Share Section */}
                            <div className="p-8 rounded-3xl border border-slate-100 bg-white">
                                <h4 className="font-bold text-slate-900 mb-4">Bagikan Destinasi</h4>
                                <div className="flex gap-3">
                                    {['facebook', 'instagram', 'twitter', 'whatsapp'].map((social) => (
                                        <button key={social} className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-amber-500 hover:text-white transition-all flex items-center justify-center">
                                            <i className={`bx bxl-${social} text-xl`}></i>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </main>

            <PublicFooter />
        </div>
    );
}
function ReviewsTab({ destination, reviews, userReview }) {
    const { auth } = usePage().props;
    const { data, setData, post, processing, errors, wasSuccessful } = useForm({
        rating: userReview?.rating ?? 0,
        comment: userReview?.comment ?? '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('destinations.reviews.store', destination.slug), { preserveScroll: true });
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10">
            <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Ulasan Pengunjung</h3>
                {reviews.length === 0 ? (
                    <p className="text-slate-500">Belum ada ulasan. Jadilah yang pertama menulis ulasan.</p>
                ) : (
                    <div className="space-y-4">
                        {reviews.map((review) => (
                            <div key={review.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-bold text-slate-900">{review.user_name || 'Pengunjung'}</span>
                                    <span className="flex items-center gap-1 text-sm font-semibold text-slate-700">
                                        <i className="bx bxs-star text-amber-400"></i>
                                        {review.rating}
                                    </span>
                                </div>
                                <p className="text-slate-600 leading-relaxed">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="p-6 rounded-2xl border border-slate-100">
                <h4 className="text-lg font-bold text-slate-900 mb-4">
                    {userReview ? 'Ulasan Anda' : 'Tulis Ulasan'}
                </h4>

                {!auth?.user ? (
                    <p className="text-slate-600">
                        Silakan{' '}
                        <Link href={route('login')} className="font-semibold text-amber-500 hover:underline">
                            masuk
                        </Link>{' '}
                        untuk menulis ulasan.
                    </p>
                ) : (
                    <form onSubmit={submit} className="space-y-4">
                        {userReview && (
                            <p className={`text-sm font-medium ${userReview.is_approved ? 'text-emerald-600' : 'text-amber-600'}`}>
                                {userReview.is_approved
                                    ? 'Ulasan Anda sudah tampil. Mengubahnya akan membutuhkan persetujuan ulang.'
                                    : 'Ulasan Anda menunggu persetujuan admin.'}
                            </p>
                        )}

                        <div>
                            <div className="flex gap-1" role="radiogroup" aria-label="Rating">
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() => setData('rating', value)}
                                        aria-label={`${value} bintang`}
                                        className="text-3xl leading-none"
                                    >
                                        <i className={`bx ${value <= data.rating ? 'bxs-star text-amber-400' : 'bx-star text-slate-300'}`}></i>
                                    </button>
                                ))}
                            </div>
                            {errors.rating && <p className="mt-1 text-xs text-rose-600 font-medium">{errors.rating}</p>}
                        </div>

                        <div>
                            <textarea
                                value={data.comment}
                                onChange={(e) => setData('comment', e.target.value)}
                                rows={4}
                                maxLength={1000}
                                placeholder="Ceritakan pengalaman Anda..."
                                className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-amber-500 focus:ring-amber-500"
                            />
                            {errors.comment && <p className="mt-1 text-xs text-rose-600 font-medium">{errors.comment}</p>}
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                type="submit"
                                disabled={processing || data.rating === 0}
                                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold transition-all disabled:opacity-50"
                            >
                                {userReview ? 'Perbarui Ulasan' : 'Kirim Ulasan'}
                            </button>
                            {wasSuccessful && (
                                <span className="text-sm text-emerald-600 font-medium">
                                    Ulasan terkirim dan menunggu persetujuan admin.
                                </span>
                            )}
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
