import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    MapPin, 
    Users, 
    Store, 
    MessageSquare, 
    TrendingUp, 
    CheckCircle2, 
    Clock, 
    ShieldAlert,
    ArrowRight,
    Star,
    ShieldCheck,
    AlertCircle
} from 'lucide-react';
import { 
    AreaChart, 
    Area, 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer 
} from 'recharts';

export default function Dashboard({ auth, stats, visitorTrends, destinationsByCategory, reviewsDistribution, priceDistribution, recentReviews, recentPartners, destinations }) {
    const user = auth.user;

    // Admin Dashboard View
    if (user.role === 'admin') {
        return (
            <AuthenticatedLayout
                header={<h2 className="font-bold text-2xl text-gray-900 leading-tight">Dashboard Admin</h2>}
            >
                <Head title="Dashboard Admin" />
                <div className="py-10 bg-gray-50/50 min-h-screen">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                        {/* KPI Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Destinasi</p>
                                    <h3 className="text-3xl font-extrabold text-gray-900 mt-2">{stats.total_destinations}</h3>
                                </div>
                                <div className="w-14 h-14 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center">
                                    <MapPin className="w-7 h-7" />
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Mitra</p>
                                    <h3 className="text-3xl font-extrabold text-gray-900 mt-2">{stats.total_partners}</h3>
                                </div>
                                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                                    <Store className="w-7 h-7" />
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Wisatawan</p>
                                    <h3 className="text-3xl font-extrabold text-gray-900 mt-2">{stats.total_users}</h3>
                                </div>
                                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                                    <Users className="w-7 h-7" />
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Ulasan</p>
                                    <h3 className="text-3xl font-extrabold text-gray-900 mt-2">{stats.total_reviews}</h3>
                                </div>
                                <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                                    <MessageSquare className="w-7 h-7" />
                                </div>
                            </div>
                        </div>

                        {/* Charts */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Visitor Trends Chart */}
                            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                                <h3 className="text-base font-bold text-gray-900 mb-6">Grafik Tren Aktivitas & Pengunjung Real-Time</h3>
                                <div className="h-72 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={visitorTrends}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                                            <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
                                            <YAxis stroke="#9CA3AF" fontSize={12} />
                                            <Tooltip />
                                            <Area type="monotone" dataKey="Pengunjung" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.2} />
                                            <Area type="monotone" dataKey="Pengguna Aktif" stroke="#10B981" fill="#10B981" fillOpacity={0.2} />
                                            <Area type="monotone" dataKey="Booking" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.2} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Destinations by Category */}
                            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                                <h3 className="text-base font-bold text-gray-900 mb-6">Destinasi Berdasarkan Kategori</h3>
                                <div className="h-72 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={destinationsByCategory} layout="vertical">
                                            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                                            <XAxis type="number" stroke="#9CA3AF" fontSize={12} />
                                            <YAxis type="category" dataKey="name" stroke="#9CA3AF" fontSize={11} width={100} />
                                            <Tooltip />
                                            <Bar dataKey="Jumlah Destinasi" fill="#3B82F6" radius={[0, 8, 8, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Review Ratings Distribution */}
                            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                                <h3 className="text-base font-bold text-gray-900 mb-6">Distribusi Rating Ulasan Wisatawan</h3>
                                <div className="h-72 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={reviewsDistribution}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                                            <XAxis dataKey="rating" stroke="#9CA3AF" fontSize={12} />
                                            <YAxis stroke="#9CA3AF" fontSize={12} />
                                            <Tooltip />
                                            <Bar dataKey="Jumlah Ulasan" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Destination Price Range Distribution */}
                            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                                <h3 className="text-base font-bold text-gray-900 mb-6">Distribusi Rentang Harga Destinasi</h3>
                                <div className="h-72 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={priceDistribution}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                                            <XAxis dataKey="range" stroke="#9CA3AF" fontSize={11} />
                                            <YAxis stroke="#9CA3AF" fontSize={12} />
                                            <Tooltip />
                                            <Bar dataKey="Jumlah Destinasi" fill="#10B981" radius={[8, 8, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    // Default Dashboard View
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard Mitra Usaha</h2>}
        >
            <Head title="Dashboard Mitra" />
            <div className="py-12 bg-gray-50/50 min-h-screen">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    {/* Welcome Banner */}
                    <div className="bg-white shadow-sm sm:rounded-3xl p-6 md:p-8 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="space-y-1">
                            <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full uppercase tracking-wider mb-2">Portal Mitra Resmi</span>
                            <h3 className="text-2xl font-extrabold text-gray-900">Selamat datang, {user.name}!</h3>
                            <p className="text-sm text-gray-600">
                                Kelola destinasi pariwisata <span className="font-semibold text-gray-900">{user.business_name || 'Usaha Anda'}</span> dengan mudah dan informatif.
                            </p>
                        </div>
                        {user.role === 'business_owner' && user.validation_status === 'approved' && (
                            <Link
                                href={route('manage.destinations.create')}
                                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl shadow-sm transition flex items-center space-x-2 flex-shrink-0"
                            >
                                <MapPin className="w-5 h-5" />
                                <span>Tambah Destinasi Baru</span>
                            </Link>
                        )}
                    </div>

                    {/* Status Akun Mitra */}
                    {user.role === 'business_owner' && (
                        <div className="bg-white shadow-sm sm:rounded-3xl p-6 border border-gray-100 space-y-4">
                            <div className="flex items-center space-x-3">
                                <Store className="w-6 h-6 text-emerald-600" />
                                <h4 className="text-lg font-bold text-gray-900">Status Akun Mitra Usaha</h4>
                            </div>
                            <div className={`p-4 rounded-2xl border flex items-start space-x-4 ${user.validation_status === 'approved' ? 'bg-emerald-50/70 border-emerald-200' : user.validation_status === 'pending' ? 'bg-amber-50/80 border-amber-200' : 'bg-rose-50/70 border-rose-200'}`}>
                                {user.validation_status === 'approved' && (
                                    <>
                                        <ShieldCheck className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <h5 className="font-semibold text-emerald-900">Akun Terverifikasi & Disetujui</h5>
                                            <p className="text-xs text-emerald-700 mt-1">Usaha "{user.business_name}" ({user.business_type}) aktif dan dapat mengelola destinasi wisata.</p>
                                        </div>
                                    </>
                                )}
                                {user.validation_status === 'pending' && (
                                    <>
                                        <Clock className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5 animate-pulse" />
                                        <div>
                                            <h5 className="font-semibold text-amber-900">Menunggu Validasi Admin</h5>
                                            <p className="text-xs text-amber-800 mt-1">Pendaftaran usaha "{user.business_name}" sedang ditinjau oleh tim admin. Fitur tambah destinasi akan terbuka setelah disetujui.</p>
                                        </div>
                                    </>
                                )}
                                {user.validation_status === 'rejected' && (
                                    <>
                                        <AlertCircle className="w-6 h-6 text-rose-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <h5 className="font-semibold text-rose-900">Validasi Ditolak</h5>
                                            <p className="text-xs text-rose-800 mt-1">Mohon hubungi admin untuk informasi lebih lanjut mengenai validasi usaha Anda.</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Partner Stats & Destinations Management Section */}
                    {user.role === 'business_owner' && stats && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Destinasi</p>
                                        <h3 className="text-3xl font-extrabold text-gray-900 mt-2">{stats.total_destinations}</h3>
                                    </div>
                                    <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                                        <MapPin className="w-7 h-7" />
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Aktif / Published</p>
                                        <h3 className="text-3xl font-extrabold text-emerald-600 mt-2">{stats.published_destinations}</h3>
                                    </div>
                                    <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                                        <CheckCircle2 className="w-7 h-7" />
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Ulasan</p>
                                        <h3 className="text-3xl font-extrabold text-gray-900 mt-2">{stats.total_reviews}</h3>
                                    </div>
                                    <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                                        <MessageSquare className="w-7 h-7" />
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Rata-rata Rating</p>
                                        <h3 className="text-3xl font-extrabold text-yellow-600 mt-2">{Number(stats.avg_rating).toFixed(1)}</h3>
                                    </div>
                                    <div className="w-14 h-14 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center">
                                        <Star className="w-7 h-7" />
                                    </div>
                                </div>
                            </div>

                            {/* Destinations Management Table / Cards */}
                            <div className="bg-white shadow-sm sm:rounded-3xl p-6 md:p-8 border border-gray-100 space-y-6">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900">Kelola Destinasi Wisata Anda</h4>
                                        <p className="text-xs text-gray-500 mt-0.5">Daftar seluruh destinasi wisata yang Anda daftarkan sebagai mitra.</p>
                                    </div>
                                    {user.validation_status === 'approved' && (
                                        <Link
                                            href={route('manage.destinations.index')}
                                            className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold rounded-xl transition flex items-center space-x-2"
                                        >
                                            <span>Kelola Selengkapnya</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    )}
                                </div>

                                {destinations && destinations.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {destinations.map((dest) => (
                                            <div key={dest.id} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm bg-white flex flex-col justify-between hover:shadow-md transition">
                                                <div>
                                                    <div className="relative h-48 bg-gray-100">
                                                        <img 
                                                            src={dest.images?.[0]?.image_url || '/images/hero-bg.jpg'} 
                                                            alt={dest.name} 
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <div className="absolute top-3 right-3">
                                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${dest.is_published ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>
                                                                {dest.is_published ? 'Published' : 'Draft'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="p-5 space-y-2">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                                                                {dest.category?.name || 'Wisata'}
                                                            </span>
                                                            <span className="text-xs text-gray-400">Rp {Number(dest.price).toLocaleString('id-ID')}</span>
                                                        </div>
                                                        <h5 className="font-bold text-gray-900 text-base line-clamp-1">{dest.name}</h5>
                                                        <p className="text-xs text-gray-500 flex items-center space-x-1">
                                                            <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                                                            <span className="line-clamp-1">{dest.location}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="p-5 pt-0 flex items-center justify-between border-t border-gray-50 mt-4">
                                                    <span className="text-xs font-semibold text-gray-600">Rating: {dest.rating || '0.0'} ⭐</span>
                                                    <Link
                                                        href={route('manage.destinations.edit', dest.id)}
                                                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-xl transition"
                                                    >
                                                        Edit Destinasi
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-3xl space-y-3">
                                        <MapPin className="w-12 h-12 text-gray-300 mx-auto" />
                                        <h5 className="font-semibold text-gray-800">Belum ada destinasi</h5>
                                        <p className="text-xs text-gray-500 max-w-sm mx-auto">Mulai tambahkan destinasi wisata pertama Anda agar dapat dilihat oleh ribuan wisatawan.</p>
                                        {user.validation_status === 'approved' && (
                                            <Link
                                                href={route('manage.destinations.create')}
                                                className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition mt-2"
                                            >
                                                <span>Tambah Destinasi Sekarang</span>
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}