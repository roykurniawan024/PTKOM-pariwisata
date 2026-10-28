import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

const fontFamily = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";
const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-600';

const accountTypes = [
    {
        type: 'user',
        title: 'Wisatawan',
        description: 'Jelajahi destinasi, beri ulasan, dan simpan favorit.',
    },
    {
        type: 'business_owner',
        title: 'Pemilik Usaha',
        description: 'Daftarkan kuliner, penginapan, atau wisata Anda. Akun diverifikasi admin.',
    },
];

export default function RegisterSelect() {
    const { transform, post, processing } = useForm({ type: 'user' });
    const [selected, setSelected] = useState(null);

    const selectType = (selectedType) => {
        setSelected(selectedType);
        transform(() => ({ type: selectedType }));
        post(route('registrasi.generate'));
    };

    return (
        <>
            <Head title="Pilih Jenis Akun - Wanderly">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700" rel="stylesheet" />
            </Head>

            <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white" style={{ fontFamily }}>
                {/* Left: Form */}
                <div className="flex flex-col justify-between p-8 sm:p-12 lg:p-16">
                    <div>
                        <Link href="/" className="inline-flex items-center gap-2.5 group">
                            <span className="font-serif text-2xl font-bold tracking-tight text-slate-900">
                                Wanderly
                            </span>
                        </Link>
                    </div>

                    <div className="max-w-md w-full mx-auto py-10">
                        <div className="mb-8">
                            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Pilih Jenis Akun</h1>
                            <p className="mt-2 text-sm text-slate-500">Pilih jenis akun sesuai kebutuhan Anda untuk mulai menjelajahi Lampung.</p>
                        </div>

                        <div className="flex flex-col gap-4">
                            {accountTypes.map(({ type, title, description }) => (
                                <button
                                    key={type}
                                    type="button"
                                    disabled={processing}
                                    onClick={() => selectType(type)}
                                    className={`w-full p-6 rounded-2xl border text-left transition all group ${
                                        selected === type
                                            ? 'border-yellow-600 bg-yellow-50/50 shadow-md ring-2 ring-yellow-600/20'
                                            : 'border-slate-200 bg-white hover:border-yellow-400 hover:shadow-sm'
                                    } disabled:opacity-60`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-lg font-bold text-slate-900 group-hover:text-yellow-600 transition">
                                            {processing && selected === type ? 'Memproses...' : title}
                                        </span>
                                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition ${
                                            selected === type ? 'border-yellow-600 bg-yellow-600 text-white' : 'border-slate-300'
                                        }`}>
                                            <i className="bx bx-check text-sm"></i>
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
                                </button>
                            ))}
                        </div>

                        <p className="mt-8 text-center text-xs text-slate-500">
                            Sudah punya akun?{' '}
                            <Link href={route('login')} className="font-bold text-yellow-600 hover:underline">
                                Masuk di sini
                            </Link>
                        </p>
                    </div>

                    <div className="text-xs text-slate-400 text-center">
                        &copy; {new Date().getFullYear()} Wanderly. All rights reserved.
                    </div>
                </div>

                {/* Right: Image / Visual Banner */}
                <div className="hidden lg:block relative overflow-hidden bg-slate-900">
                    <img
                        src="https://asdp.id/storage//uploads/siaranpers/d905b966b12f4610fce258007a737f4d.jpeg"
                        alt="Lampung Tourism"
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                    <div className="absolute bottom-16 left-16 right-16 text-white">
                        <span className="px-3 py-1 rounded-xs bg-yellow-600/5 border border-yellow-400/30 text-yellow-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                            Wonderful Indonesia
                        </span>
                        <h2 className="mt-4 text-3xl font-extrabold tracking-tight">Jelajahi Pesona Sang Bumi Ruwa Jurai</h2>
                        <p className="mt-2 text-sm text-slate-300 max-w-md leading-relaxed">
                            Temukan destinasi bahari menawan, margasatwa eksotis, dan kehangatan budaya lokal dalam satu platform terpadu.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}