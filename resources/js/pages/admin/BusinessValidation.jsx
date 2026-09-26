import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { 
    CheckCircle2, 
    XCircle, 
    Clock, 
    Store, 
    Phone, 
    Mail, 
    MapPin, 
    Building2, 
    Search,
    AlertTriangle 
} from 'lucide-react';

export default function BusinessValidation({ auth, businessOwners, currentStatus, stats }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOwner, setSelectedOwner] = useState(null);
    const [rejectionModalOpen, setRejectionModalOpen] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');

    const handleFilterStatus = (status) => {
        router.get(route('admin.business-validation.index'), { status }, { preserveState: true });
    };

    const handleApprove = (id) => {
        if (confirm('Apakah Anda yakin ingin menyetujui pemilik usaha ini?')) {
            router.patch(route('admin.business-validation.update', id), {
                status: 'approved'
            });
        }
    };

    const openRejectModal = (owner) => {
        setSelectedOwner(owner);
        setRejectionReason('');
        setRejectionModalOpen(true);
    };

    const handleRejectSubmit = (e) => {
        e.preventDefault();
        if (!selectedOwner) return;

        router.patch(route('admin.business-validation.update', selectedOwner.id), {
            status: 'rejected',
            rejection_reason: rejectionReason
        }, {
            onSuccess: () => {
                setRejectionModalOpen(false);
                setSelectedOwner(null);
            }
        });
    };

    const filteredOwners = businessOwners.filter((owner) => {
        const matchesSearch = 
            owner.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            owner.business_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            owner.email?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Validasi Pemilik Usaha (Mitra)</h2>}
        >
            <Head title="Validasi Mitra Usaha - Admin" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Statistik Ringkasan */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div 
                            onClick={() => handleFilterStatus('all')}
                            className={`p-5 rounded-2xl bg-white border cursor-pointer transition-all shadow-sm ${currentStatus === 'all' ? 'border-emerald-600 ring-2 ring-emerald-500/20' : 'border-gray-200 hover:border-gray-300'}`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-500">Semua Mitra</span>
                                <Store className="w-5 h-5 text-gray-400" />
                            </div>
                            <div className="text-2xl font-bold text-gray-900 mt-2">{stats.total}</div>
                        </div>

                        <div 
                            onClick={() => handleFilterStatus('pending')}
                            className={`p-5 rounded-2xl bg-white border cursor-pointer transition-all shadow-sm ${currentStatus === 'pending' ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-gray-200 hover:border-gray-300'}`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-amber-600">Menunggu Validasi</span>
                                <Clock className="w-5 h-5 text-amber-500" />
                            </div>
                            <div className="text-2xl font-bold text-amber-600 mt-2">{stats.pending}</div>
                        </div>

                        <div 
                            onClick={() => handleFilterStatus('approved')}
                            className={`p-5 rounded-2xl bg-white border cursor-pointer transition-all shadow-sm ${currentStatus === 'approved' ? 'border-emerald-600 ring-2 ring-emerald-500/20' : 'border-gray-200 hover:border-gray-300'}`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-emerald-600">Telah Disetujui</span>
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            </div>
                            <div className="text-2xl font-bold text-emerald-600 mt-2">{stats.approved}</div>
                        </div>

                        <div 
                            onClick={() => handleFilterStatus('rejected')}
                            className={`p-5 rounded-2xl bg-white border cursor-pointer transition-all shadow-sm ${currentStatus === 'rejected' ? 'border-rose-600 ring-2 ring-rose-500/20' : 'border-gray-200 hover:border-gray-300'}`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-rose-600">Ditolak</span>
                                <XCircle className="w-5 h-5 text-rose-500" />
                            </div>
                            <div className="text-2xl font-bold text-rose-600 mt-2">{stats.rejected}</div>
                        </div>
                    </div>

                    {/* Toolbar & Filter */}
                    <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="relative w-full md:w-96">
                            <Search className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari nama usaha, pemilik, atau email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-emerald-500 focus:border-emerald-500"
                            />
                        </div>

                        <div className="flex items-center space-x-2 w-full md:w-auto">
                            <button
                                onClick={() => handleFilterStatus('all')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${currentStatus === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                            >
                                Semua
                            </button>
                            <button
                                onClick={() => handleFilterStatus('pending')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${currentStatus === 'pending' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-700 hover:bg-amber-100'}`}
                            >
                                Pending
                            </button>
                            <button
                                onClick={() => handleFilterStatus('approved')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${currentStatus === 'approved' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}
                            >
                                Disetujui
                            </button>
                            <button
                                onClick={() => handleFilterStatus('rejected')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${currentStatus === 'rejected' ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-700 hover:bg-rose-100'}`}
                            >
                                Ditolak
                            </button>
                        </div>
                    </div>

                    {/* Table / List */}
                    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                        {filteredOwners.length === 0 ? (
                            <div className="text-center py-16">
                                <Store className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <h3 className="text-gray-900 font-medium text-base">Tidak ada data pemilik usaha</h3>
                                <p className="text-gray-500 text-xs mt-1">Belum ada mitra usaha yang terdaftar pada kategori atau pencarian ini.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50/80 text-[11px] font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                                            <th className="py-4 px-6">Usaha & Pemilik</th>
                                            <th className="py-4 px-6">Kategori</th>
                                            <th className="py-4 px-6">Kontak</th>
                                            <th className="py-4 px-6">Alamat</th>
                                            <th className="py-4 px-6">Status</th>
                                            <th className="py-4 px-6 text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-sm">
                                        {filteredOwners.map((owner) => (
                                            <tr key={owner.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="py-4 px-6">
                                                    <div className="font-semibold text-gray-900">{owner.business_name || '-'}</div>
                                                    <div className="text-xs text-gray-500 mt-0.5">{owner.name}</div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className="capitalize px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                                        {owner.business_type?.replace('_', ' ') || '-'}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center text-xs text-gray-600 mb-1">
                                                        <Mail className="w-3.5 h-3.5 mr-1 text-gray-400" />
                                                        {owner.email}
                                                    </div>
                                                    <div className="flex items-center text-xs text-gray-600">
                                                        <Phone className="w-3.5 h-3.5 mr-1 text-gray-400" />
                                                        {owner.phone_number || '-'}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-start text-xs text-gray-600 max-w-xs line-clamp-2">
                                                        <MapPin className="w-3.5 h-3.5 mr-1 text-gray-400 flex-shrink-0 mt-0.5" />
                                                        <span>{owner.business_address || '-'}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    {owner.validation_status === 'approved' && (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                                                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Disetujui
                                                        </span>
                                                    )}
                                                    {owner.validation_status === 'pending' && (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                                                            <Clock className="w-3.5 h-3.5 mr-1" /> Menunggu
                                                        </span>
                                                    )}
                                                    {owner.validation_status === 'rejected' && (
                                                        <div>
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800">
                                                                <XCircle className="w-3.5 h-3.5 mr-1" /> Ditolak
                                                            </span>
                                                            {owner.rejection_reason && (
                                                                <p className="text-[11px] text-rose-600 mt-1 italic max-w-xs truncate">
                                                                    "{owner.rejection_reason}"
                                                                </p>
                                                            )}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="py-4 px-6 text-right whitespace-nowrap">
                                                    <div className="flex items-center justify-end space-x-2">
                                                        {owner.validation_status !== 'approved' && (
                                                            <button
                                                                onClick={() => handleApprove(owner.id)}
                                                                className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-medium hover:bg-emerald-700 transition-colors shadow-sm"
                                                            >
                                                                Setujui
                                                            </button>
                                                        )}
                                                        {owner.validation_status !== 'rejected' && (
                                                            <button
                                                                onClick={() => openRejectModal(owner)}
                                                                className="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg text-xs font-medium transition-colors"
                                                            >
                                                                Tolak
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal Penolakan */}
            {rejectionModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl relative animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center space-x-3 mb-4 text-rose-600">
                            <AlertTriangle className="w-6 h-6" />
                            <h3 className="text-lg font-bold text-gray-900">Tolak Validasi Mitra</h3>
                        </div>

                        <p className="text-xs text-gray-600 mb-4">
                            Berikan alasan penolakan untuk pemilik usaha <span className="font-semibold text-gray-900">"{selectedOwner?.business_name}"</span>.
                        </p>

                        <form onSubmit={handleRejectSubmit}>
                            <textarea
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                                placeholder="Contoh: Dokumen atau alamat usaha belum jelas, nomor telepon tidak bisa dihubungi."
                                rows="4"
                                className="w-full border-gray-300 rounded-lg text-sm focus:ring-rose-500 focus:border-rose-500"
                                required
                            />

                            <div className="flex items-center justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setRejectionModalOpen(false)}
                                    className="px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-xs font-medium bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors shadow-sm"
                                >
                                    Konfirmasi Tolak
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}