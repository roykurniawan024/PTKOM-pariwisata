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
    Star
} from 'lucide-react';
import { 
    AreaChart, 
    Area, 
    BarChart, 
    Bar, 
    PieChart, 
    Pie, 
    Cell, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer, 
    Legend 
} from 'recharts';

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function AdminDashboard({ auth, stats, visitorTrends, destinationsByCategory, recentReviews, recentPartners }) {
    const partnerStatusData = [
        { name: 'Disetujui', value: stats.approved_partners },
        { name: 'Menunggu', value: stats.pending_partners },
        { name: 'Ditolak', value: stats.rejected_partners },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="font-bold text-2xl text-gray-900 leading-tight">Dashboard & Analitik Real-Time</h2>
                        <p className="text-sm text-gray-500 mt-0.5">Pemantauan data pariwisata, mitra, dan pengunjung secara langsung dari database.</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Link
                            href={route('admin.destinations.index')}
                            className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors flex items-center space-x-2"
                        >
                            <span>Kelola Destinasi</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard Admin Real-Time - Jelajah Lampung" />

            <div className="py-10 bg-gray-50/50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    
                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {/* Total Destinasi */}
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Destinasi</p>
                                <h3 className="text-3xl font-extrabold text-gray-900 mt-2">{stats.total_destinations}</h3>
                                <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center">
                                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> {stats.published_destinations} Dipublikasikan
                                </p>
                            </div>
                            <div className="w-14 h-14 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center">
                                <MapPin className="w-7 h-7" />
                            </div>
                        </div>

                        {/* Total Mitra Usaha */}
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Mitra Usaha</p>
                                <h3 className="text-3xl font-extrabold text-gray-900 mt-2">{stats.total_partners}</h3>
                                <p className="text-xs text-amber-600 font-medium mt-1 flex items-center">
                                    <Clock className="w-3.5 h-3.5 mr-1" /> {stats.pending_partners} Menunggu Validasi
                                </p>
                            </div>
                            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                                <Store className="w-7 h-7" />
                            </div>
                        </div>

                        {/* Pengguna Terdaftar */}
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Wisatawan Terdaftar</p>
                                <h3 className="text-3xl font-extrabold text-gray-900 mt-2">{stats.total_users}</h3>
                                <p className="text-xs text-blue-600 font-medium mt-1 flex items-center">
                                    <Users className="w-3.5 h-3.5 mr-1" /> Aktif di platform
                                </p>
                            </div>
                            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                                <Users className="w-7 h-7" />
                            </div>
                        </div>

                        {/* Ulasan */}
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Ulasan</p>
                                <h3 className="text-3xl font-extrabold text-gray-900 mt-2">{stats.total_reviews}</h3>
                                <p className="text-xs text-rose-600 font-medium mt-1 flex items-center">
                                    <ShieldAlert className="w-3.5 h-3.5 mr-1" /> {stats.pending_reviews} Perlu Moderasi
                                </p>
                            </div>
                            <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                                <MessageSquare className="w-7 h-7" />
                            </div>
                        </div>
                    </div>

                    {/* Chart Section 1: Visitor Trends & Category Breakdown */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Visitor & Traffic Area Chart */}
                        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-base font-bold text-gray-900">Grafik Pengunjung & Aktivitas Real-Time</h3>
                                    <p className="text-xs text-gray-500 mt-0.5">Berdasarkan data metrik sistem harian</p>
                                </div>
                                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                                    <TrendingUp className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="h-72 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={visitorTrends} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                                                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                                            </linearGradient>
                                            <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                                        <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
                                        <YAxis stroke="#9CA3AF" fontSize={12} />
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: '#111827', borderRadius: '1rem', color: '#fff', border: 'none' }}
                                        />
                                        <Legend />
                                        <Area type="monotone" dataKey="visitors" name="Total Pengunjung" stroke="#10B981" fillOpacity={1} fill="url(#colorVisitors)" />
                                        <Area type="monotone" dataKey="active_users" name="Pengguna Aktif" stroke="#3B82F6" fillOpacity={1} fill="url(#colorActive)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Destinations by Category Bar Chart */}
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
                            <div>
                                <h3 className="text-base font-bold text-gray-900">Destinasi per Kategori</h3>
                                <p className="text-xs text-gray-500 mt-0.5">Sebaran objek wisata di Lampung</p>
                            </div>
                            <div className="h-64 w-full my-auto">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={destinationsByCategory} layout="vertical" margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                                        <XAxis type="number" stroke="#9CA3AF" fontSize={12} />
                                        <YAxis type="category" dataKey="name" stroke="#9CA3AF" fontSize={11} width={80} />
                                        <Tooltip contentStyle={{ backgroundColor: '#111827', borderRadius: '1rem', color: '#fff', border: 'none' }} />
                                        <Bar dataKey="count" name="Jumlah" fill="#F59E0B" radius={[0, 8, 8, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="text-xs text-center text-gray-400 mt-2">
                                Total {destinationsByCategory.reduce((acc, curr) => acc + curr.count, 0)} destinasi terdata
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Recent Reviews & Recent Partner Registrations */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Recent Reviews Table */}
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-base font-bold text-gray-900">Ulasan Wisatawan Terbaru</h3>
                                    <p className="text-xs text-gray-500 mt-0.5">Ulasan masuk yang siap dimoderasi</p>
                                </div>
                                <Link href={route('admin.reviews.index')} className="text-xs font-semibold text-emerald-600 hover:underline">
                                    Lihat Semua &rarr;
                                </Link>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse text-sm">
                                    <thead>
                                        <tr className="border-b border-gray-100 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                                            <th className="py-3 px-2">Pengguna</th>
                                            <th className="py-3 px-2">Destinasi</th>
                                            <th className="py-3 px-2">Rating</th>
                                            <th className="py-3 px-2">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {recentReviews.length === 0 ? (
                                            <tr>
                                                <td colSpan={4} className="py-6 text-center text-gray-400 text-xs">Belum ada ulasan.</td>
                                            </tr>
                                        ) : (
                                            recentReviews.map((rev) => (
                                                <tr key={rev.id} className="hover:bg-gray-50/50">
                                                    <td className="py-3 px-2 font-medium text-gray-900">{rev.user_name}</td>
                                                    <td className="py-3 px-2 text-gray-600">{rev.destination_name}</td>
                                                    <td className="py-3 px-2">
                                                        <span className="inline-flex items-center font-bold text-gray-900">
                                                            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 mr-1" />
                                                            {rev.rating}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-2">
                                                        {rev.is_approved ? (
                                                            <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-100 text-emerald-800 rounded-full">Disetujui</span>
                                                        ) : (
                                                            <span className="px-2 py-0.5 text-[10px] font-semibold bg-amber-100 text-amber-800 rounded-full">Menunggu</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Recent Partners Table */}
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-base font-bold text-gray-900">Pendaftaran Mitra Terbaru</h3>
                                    <p className="text-xs text-gray-500 mt-0.5">Pemilik usaha yang mendaftarkan bisnis</p>
                                </div>
                                <Link href={route('admin.business-validation.index')} className="text-xs font-semibold text-emerald-600 hover:underline">
                                    Validasi Mitra &rarr;
                                </Link>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse text-sm">
                                    <thead>
                                        <tr className="border-b border-gray-100 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                                            <th className="py-3 px-2">Nama Usaha</th>
                                            <th className="py-3 px-2">Pemilik</th>
                                            <th className="py-3 px-2">Kategori</th>
                                            <th className="py-3 px-2">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {recentPartners.length === 0 ? (
                                            <tr>
                                                <td colSpan={4} className="py-6 text-center text-gray-400 text-xs">Belum ada mitra terdaftar.</td>
                                            </tr>
                                        ) : (
                                            recentPartners.map((partner) => (
                                                <tr key={partner.id} className="hover:bg-gray-50/50">
                                                    <td className="py-3 px-2 font-medium text-gray-900">{partner.business_name}</td>
                                                    <td className="py-3 px-2 text-gray-600">{partner.name}</td>
                                                    <td className="py-3 px-2 capitalize text-xs text-gray-500">{partner.business_type?.replace('_', ' ')}</td>
                                                    <td className="py-3 px-2">
                                                        {partner.validation_status === 'approved' && (
                                                            <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-100 text-emerald-800 rounded-full">Disetujui</span>
                                                        )}
                                                        {partner.validation_status === 'pending' && (
                                                            <span className="px-2 py-0.5 text-[10px] font-semibold bg-amber-100 text-amber-800 rounded-full">Pending</span>
                                                        )}
                                                        {partner.validation_status === 'rejected' && (
                                                            <span className="px-2 py-0.5 text-[10px] font-semibold bg-rose-100 text-rose-800 rounded-full">Ditolak</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
