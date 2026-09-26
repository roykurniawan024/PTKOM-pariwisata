import GuestLayout from '@/layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function RegisterInvalidToken({ message }) {
    return (
        <GuestLayout>
            <Head title="Token Tidak Valid - Jelajah Lampung" />

            <div className="text-center py-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-4">
                    <AlertCircle className="w-8 h-8" />
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-2">Sesi Tidak Valid</h2>
                <p className="text-sm text-gray-600 mb-8 px-4">
                    {message || 'Token pendaftaran Anda tidak valid atau telah kedaluwarsa demi keamanan.'}
                </p>

                <div className="space-y-3">
                    <Link
                        href={route('registrasi.select')}
                        className="flex items-center justify-center w-full px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Mulai Ulang Pendaftaran
                    </Link>
                    
                    <Link
                        href="/"
                        className="block text-sm text-gray-500 hover:text-gray-700 underline"
                    >
                        Kembali ke Beranda
                    </Link>
                </div>
            </div>
        </GuestLayout>
    );
}