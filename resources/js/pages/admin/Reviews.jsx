import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { CheckCircle2, Clock, EyeOff, MessageSquare, Star, Trash2 } from 'lucide-react';

const FILTERS = [
    { key: 'pending', label: 'Menunggu', active: 'bg-amber-600 text-white', idle: 'bg-amber-50 text-amber-700 hover:bg-amber-100' },
    { key: 'approved', label: 'Disetujui', active: 'bg-emerald-600 text-white', idle: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' },
    { key: 'all', label: 'Semua', active: 'bg-gray-900 text-white', idle: 'bg-gray-100 text-gray-600 hover:bg-gray-200' },
];

export default function Reviews({ auth, reviews, currentStatus, stats }) {
    const handleFilterStatus = (status) => {
        router.get(route('admin.reviews.index'), { status }, { preserveState: true });
    };

    const handleModerate = (review, isApproved) => {
        router.patch(route('admin.reviews.moderate', review.id), { is_approved: isApproved }, { preserveScroll: true });
    };

    const handleDelete = (review) => {
        if (confirm('Hapus ulasan ini secara permanen?')) {
            router.delete(route('admin.reviews.destroy', review.id), { preserveScroll: true });
        }
    };

    const formatDate = (value) =>
        new Date(value).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Moderasi Ulasan</h2>}
        >
            <Head title="Moderasi Ulasan - Admin" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-500">Semua Ulasan</span>
                                <MessageSquare className="w-5 h-5 text-gray-400" />
                            </div>
                            <div className="text-2xl font-bold text-gray-900 mt-2">{stats.total}</div>
                        </div>
                        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-amber-600">Menunggu Persetujuan</span>
                                <Clock className="w-5 h-5 text-amber-500" />
                            </div>
                            <div className="text-2xl font-bold text-amber-600 mt-2">{stats.pending}</div>
                        </div>
                        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-emerald-600">Ditampilkan</span>
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            </div>
                            <div className="text-2xl font-bold text-emerald-600 mt-2">{stats.approved}</div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center gap-2">
                        {FILTERS.map((filter) => (
                            <button
                                key={filter.key}
                                onClick={() => handleFilterStatus(filter.key)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${currentStatus === filter.key ? filter.active : filter.idle}`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                        {reviews.data.length === 0 ? (
                            <div className="text-center py-16">
                                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <h3 className="text-gray-900 font-medium text-base">Tidak ada ulasan</h3>
                                <p className="text-gray-500 text-xs mt-1">Belum ada ulasan pada filter ini.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50/80 text-[11px] font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                                            <th className="py-4 px-6">Pengulas</th>
                                            <th className="py-4 px-6">Destinasi</th>
                                            <th className="py-4 px-6">Rating</th>
                                            <th className="py-4 px-6">Ulasan</th>
                                            <th className="py-4 px-6">Status</th>
                                            <th className="py-4 px-6 text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-sm">
                                        {reviews.data.map((review) => (
                                            <tr key={review.id} className="hover:bg-gray-50/50 transition-colors align-top">
                                                <td className="py-4 px-6">
                                                    <div className="font-semibold text-gray-900">{review.user?.name || '-'}</div>
                                                    <div className="text-xs text-gray-500 mt-0.5">{formatDate(review.created_at)}</div>
                                                </td>
                                                <td className="py-4 px-6 text-gray-700">{review.destination?.name || '-'}</td>
                                                <td className="py-4 px-6">
                                                    <span className="inline-flex items-center gap-1 font-semibold text-gray-900">
                                                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                                        {review.rating}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-gray-600 max-w-md">{review.comment}</td>
                                                <td className="py-4 px-6">
                                                    {review.is_approved ? (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                                                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Ditampilkan
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                                                            <Clock className="w-3.5 h-3.5 mr-1" /> Menunggu
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-4 px-6 text-right whitespace-nowrap">
                                                    <div className="flex items-center justify-end space-x-2">
                                                        {review.is_approved ? (
                                                            <button
                                                                onClick={() => handleModerate(review, false)}
                                                                className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg text-xs font-medium transition-colors"
                                                            >
                                                                <EyeOff className="w-3.5 h-3.5 mr-1" /> Sembunyikan
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleModerate(review, true)}
                                                                className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-medium hover:bg-emerald-700 transition-colors shadow-sm"
                                                            >
                                                                Setujui
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => handleDelete(review)}
                                                            className="inline-flex items-center px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg text-xs font-medium transition-colors"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5 mr-1" /> Hapus
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {reviews.links && reviews.last_page > 1 && (
                        <div className="flex flex-wrap items-center justify-center gap-1">
                            {reviews.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    preserveScroll
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium ${link.active ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'} ${link.url ? '' : 'pointer-events-none opacity-50'}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
