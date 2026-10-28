import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Store, ShieldCheck, Clock, AlertCircle, ArrowRight } from 'lucide-react';

export default function Dashboard({ auth }) {
    const user = auth.user;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard Jelajah Lampung
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Welcome Banner */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-2xl p-6 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Selamat datang, {user.name}!</h3>
                            <p className="text-sm text-gray-600 mt-1">
                                Anda masuk sebagai <span className="font-semibold text-emerald-600 capitalize">
                                    {user.role === 'business_owner' ? 'Pemilik Usaha (Mitra)' : (user.role === 'admin' ? 'Administrator' : 'Wisatawan')}
                                </span>.
                            </p>
                        </div>

                        {user.role === 'user' && (
                            <Link
                                href={route('profile.edit')}
                                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-medium transition-colors shadow-sm flex items-center space-x-2"
                            >
                                <span>Lengkapi Profil (foto, profesi, kota)</span>
                                <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                        )}

                        {user.role === 'admin' && (
                            <div className="flex flex-wrap gap-2">
                                <Link
                                    href={route('admin.destinations.index')}
                                    className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl text-sm font-medium transition-colors shadow-sm flex items-center space-x-2"
                                >
                                    <span>Kelola Destinasi Wisata</span>
                                    <ArrowRight className="w-4 h-4 ml-1" />
                                </Link>
                                <Link
                                    href={route('admin.business-validation.index')}
                                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-medium transition-colors shadow-sm flex items-center space-x-2"
                                >
                                    <ShieldCheck className="w-4 h-4" />
                                    <span>Kelola Validasi Mitra</span>
                                    <ArrowRight className="w-4 h-4 ml-1" />
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Business Owner Status Card */}
                    {user.role === 'business_owner' && (
                        <div className="bg-white shadow-sm sm:rounded-2xl p-6 border border-gray-100 space-y-4">
                            <div className="flex items-center space-x-3">
                                <Store className="w-6 h-6 text-amber-600" />
                                <h4 className="text-lg font-bold text-gray-900">Status Akun Mitra Usaha</h4>
                            </div>

                            <div className={`p-4 rounded-xl border flex items-start space-x-4 ${
                                user.validation_status === 'approved'
                                    ? 'bg-emerald-50/70 border-emerald-200'
                                    : user.validation_status === 'pending'
                                    ? 'bg-amber-50/80 border-amber-200'
                                    : 'bg-rose-50/70 border-rose-200'
                            }`}>
                                {user.validation_status === 'approved' && (
                                    <>
                                        <ShieldCheck className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h5 className="font-semibold text-emerald-900">Usaha Telah Disetujui & Terverifikasi</h5>
                                                <span className="px-2.5 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded-full">
                                                    Disetujui
                                                </span>
                                            </div>
                                            <p className="text-xs text-emerald-700 mt-1.5 leading-relaxed">
                                                Usaha Anda <span className="font-bold">"{user.business_name}"</span> ({user.business_type}) telah divalidasi oleh admin. Anda dapat mengelola penawaran dan profil wisata Anda.
                                            </p>
                                        </div>
                                    </>
                                )}

                                {user.validation_status === 'pending' && (
                                    <>
                                        <Clock className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5 animate-pulse" />
                                        <div>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h5 className="font-semibold text-amber-900">Masih Dalam Persetujuan</h5>
                                                <span className="px-2.5 py-0.5 text-xs font-semibold bg-amber-100 text-amber-800 rounded-full">
                                                    Menunggu Validasi Admin
                                                </span>
                                            </div>
                                            <p className="text-xs text-amber-800 mt-1.5 leading-relaxed">
                                                Pendaftaran usaha <span className="font-bold">"{user.business_name}"</span> ({user.business_type}) saat ini masih dalam proses peninjauan dan antrean verifikasi oleh tim administrator Jelajah Lampung. Mohon menunggu 1x24 jam kerja.
                                            </p>
                                        </div>
                                    </>
                                )}

                                {user.validation_status === 'rejected' && (
                                    <>
                                        <AlertCircle className="w-6 h-6 text-rose-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h5 className="font-semibold text-rose-900">Validasi Ditolak</h5>
                                                <span className="px-2.5 py-0.5 text-xs font-semibold bg-rose-100 text-rose-800 rounded-full">
                                                    Ditolak
                                                </span>
                                            </div>
                                            <p className="text-xs text-rose-700 mt-1.5 leading-relaxed">
                                                Maaf, pengajuan validasi untuk usaha <span className="font-bold">"{user.business_name}"</span> belum dapat disetujui.
                                            </p>
                                            {user.rejection_reason && (
                                                <p className="text-xs text-rose-800 bg-rose-50 p-2.5 rounded-lg mt-2 font-medium border border-rose-100">
                                                    Alasan: "{user.rejection_reason}"
                                                </p>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}