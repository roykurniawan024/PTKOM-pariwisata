import AuthSplitLayout from '@/layouts/AuthSplitLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowRight, Store, UserCheck } from 'lucide-react';

const accountTypes = [
    {
        type: 'user',
        title: 'Akun Wisatawan / Pengguna',
        description:
            'Jelajahi destinasi, beri ulasan, dan simpan favorit perjalanan Anda.',
        icon: UserCheck,
    },
    {
        type: 'business_owner',
        title: 'Akun Pemilik Usaha / Mitra',
        description:
            'Daftarkan kuliner, penginapan, atau wisata Anda & ikuti verifikasi admin.',
        icon: Store,
    },
];

export default function RegisterSelect() {
    const { transform, post, processing } = useForm({ type: 'user' });

    const selectType = (selectedType) => {
        transform(() => ({ type: selectedType }));
        post(route('registrasi.generate'));
    };

    return (
        <AuthSplitLayout
            heading="Buat akun, lalu mulai perjalananmu."
            description="Pilih jenis akun sesuai kebutuhan Anda untuk mulai menjelajahi Lampung."
            cardClassName="bg-[#FBEFF2]"
        >
            <Head title="Pilih Jenis Akun - Jelajah Lampung" />

            <h2 className="font-serif text-3xl font-semibold text-[#1E3A34]">
                Pilih jenis akun
            </h2>
            <p className="mt-2 text-xs text-slate-600">
                Silakan pilih kategori pendaftaran sesuai kebutuhan Anda.
            </p>

            <div className="mt-6 space-y-3">
                {accountTypes.map(({ type, title, description, icon: Icon }) => (
                    <button
                        key={type}
                        type="button"
                        disabled={processing}
                        onClick={() => selectType(type)}
                        className="group flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-[#4C83AD] hover:shadow-sm disabled:opacity-60"
                    >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E4EEF7] text-[#4C83AD] transition group-hover:bg-[#4C83AD] group-hover:text-white">
                            <Icon className="h-5 w-5" />
                        </span>
                        <span className="flex-1">
                            <span className="block font-serif text-base font-semibold text-[#1E3A34]">
                                {title}
                            </span>
                            <span className="mt-0.5 block text-xs text-slate-500">
                                {description}
                            </span>
                        </span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-[#4C83AD]" />
                    </button>
                ))}
            </div>

            <p className="mt-8 text-center text-xs text-slate-700">
                Sudah punya akun?{' '}
                <Link
                    href={route('login')}
                    className="text-[#4C83AD] transition hover:text-[#1E3A34]"
                >
                    Masuk
                </Link>
            </p>
        </AuthSplitLayout>
    );
}
