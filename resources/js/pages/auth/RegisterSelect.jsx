import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import GuestLayout from '@/layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Store, UserCheck, ArrowRight } from 'lucide-react';

export default function RegisterSelect() {
    const { data, setData, post, processing } = useForm({
        type: 'user',
    });

    const submit = (e, selectedType) => {
        e.preventDefault();
        setData('type', selectedType);
        post(route('registrasi.generate'), {
            data: { type: selectedType }
        });
    };

    return (
        <GuestLayout>
            <Head title="Pilih Jenis Pendaftaran - Jelajah Lampung" />

            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 font-serif">Pilih Jenis Akun</h2>
                <p className="text-sm text-gray-600 mt-1">
                    Silakan pilih kategori pendaftaran sesuai kebutuhan Anda di platform Jelajah Lampung.
                </p>
            </div>

            <div className="space-y-4">
                <form onSubmit={(e) => submit(e, 'user')}>
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-emerald-600 hover:bg-emerald-50/50 transition-all flex items-center justify-between group"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-emerald-100 text-emerald-700 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                <UserCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 text-base">Akun Wisatawan / Pengguna</h3>
                                <p className="text-xs text-gray-500 mt-0.5">Jelajahi destinasi, beri ulasan, dan simpan favorit perjalanan Anda.</p>
                            </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                    </button>
                </form>

                <form onSubmit={(e) => submit(e, 'business_owner')}>
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-amber-600 hover:bg-amber-50/50 transition-all flex items-center justify-between group"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-amber-100 text-amber-700 rounded-lg group-hover:bg-amber-600 group-hover:text-white transition-colors">
                                <Store className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 text-base">Akun Pemilik Usaha / Mitra</h3>
                                <p className="text-xs text-gray-500 mt-0.5">Daftarkan kuliner, penginapan, atau wisata Anda & ikuti verifikasi admin.</p>
                            </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-amber-600 transition-colors" />
                    </button>
                </form>
            </div>

            <div className="mt-8 text-center border-t border-gray-200 pt-4">
                <span className="text-xs text-gray-600">Sudah punya akun? </span>
                <Link
                    href={route('login')}
                    className="text-xs font-semibold text-emerald-600 hover:text-emerald-500 underline"
                >
                    Masuk di sini
                </Link>
            </div>
        </GuestLayout>
    );
}