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

                        {user.role === 'admin' && (
                            <Link
                                href={route('admin.business-validation.index')}
                                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-medium transition-colors shadow-sm flex items-center space-x-2"
                            >
                                <ShieldCheck className="w-4 h-4" />
                                <span>Kelola Validasi Mitra Usaha</span>
                                <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                        )}
                    </div>

                    {/* Business Owner Status Card */}
                    {user.role === 'business_owner' && (
                        <div className="bg-white shadow-sm sm:rounded-2xl p-6 border border-gray-100 space-y-4">
                            <div className="flex items-center space-x-3">
                                <Store className="w-6 h-6 text-amber-600" />
                                <h4 className="text-lg font-bold text-gray-900">Status Akun Mitra Usaha</h4>
                            </div>

                            <div className="p-4 rounded-xl border flex items-start space-x-4">
                                {user.validation_status === 'approved' && (
                                    <>
                                        <ShieldCheck className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <h5 className="font-semibold text-emerald-900">Usaha Telah Disetujui & Terverifikasi</h5>
                                            <p className="text-xs text-emerald-700 mt-1">
                                                Usaha Anda <span className="font-bold">"{user.business_name}"</span> ({user.business_type}) telah divalidasi oleh admin. Anda dapat mengelola penawaran dan profil wisata Anda.
                                            </p>
                                        </div>
                                    </>
                                )}

                                {user.validation_status === 'pending' && (
                                    <>
                                        <Clock className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <h5 className="font-semibold text-amber-900">Menunggu Validasi Admin</h5>
                                            <p className="text-xs text-amber-700 mt-1">
                                                Pendaftaran usaha <span className="font-bold">"{user.business_name}"</span> sedang dalam antrean verifikasi oleh tim administrator Jelajah Lampung. Mohon menunggu 1x24 jam.
                                            </p>
                                        </div>
                                    </>
                                )}

                                {user.validation_status === 'rejected' && (
                                    <>
                                        <AlertCircle className="w-6 h-6 text-rose-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <h5 className="font-semibold text-rose-900">Validasi Ditolak</h5>
                                            <p className="text-xs text-rose-700 mt-1">
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