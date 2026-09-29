import InputError from '@/components/InputError';
import AuthSplitLayout from '@/layouts/AuthSplitLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const inputClassName =
    'mt-2 block w-full rounded-full border-0 bg-white px-5 py-3 text-sm text-slate-800 shadow-xs placeholder:text-slate-400 focus:ring-2 focus:ring-[#4C83AD]';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthSplitLayout
            heading="Masuk, lalu jelajahi Lampung dengan caramu"
            description="Simpan destinasi favorit, rencanakan perjalanan, dan lihat kembali reservasi Anda dalam satu tempat."
            cardClassName="bg-[#B3D7F3]"
        >
            <Head title="Masuk - Jelajah Lampung" />

            <h2 className="font-serif text-3xl font-semibold leading-tight text-[#1E3A34]">Selamat datang kembali</h2>
            <p className="mt-2 text-xs text-slate-600">Masuk ke akun Jelajah Lampung Anda.</p>

            {status && <div className="mt-4 rounded-xl bg-white/70 px-4 py-3 text-sm font-medium text-emerald-700">{status}</div>}

            <form onSubmit={submit} className="mt-6">
                <div>
                    <label htmlFor="email" className="text-xs font-medium text-slate-800">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        placeholder="nama@email.com"
                        autoComplete="username"
                        autoFocus
                        className={inputClassName}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <label htmlFor="password" className="text-xs font-medium text-slate-800">
                        Kata sandi
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        placeholder="••••••••"
                        autoComplete="current-password"
                        className={inputClassName}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {canResetPassword && (
                    <div className="mt-3 text-right">
                        <Link href={route('password.request')} className="text-xs text-[#4C83AD] transition hover:text-[#1E3A34]">
                            Lupa kata sandi?
                        </Link>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={processing}
                    className="mt-6 w-full rounded-full bg-[#5DB8F5] py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#46a8e8] disabled:opacity-60"
                >
                    Masuk
                </button>
            </form>

            <div className="my-4 text-center font-mono text-[10px] uppercase tracking-widest text-slate-500">atau</div>

            <button
                type="button"
                disabled
                title="Login Google belum tersedia"
                className="shadow-xs w-full rounded-full bg-white py-3 text-sm font-semibold text-slate-800 transition disabled:cursor-not-allowed disabled:opacity-70"
            >
                Lanjutkan dengan Google
            </button>

            <p className="mt-6 text-center text-xs text-slate-700">
                Belum punya akun?{' '}
                <Link href={route('registrasi.select')} className="font-semibold text-[#1E3A34] hover:underline">
                    Daftar
                </Link>
            </p>
        </AuthSplitLayout>
    );
}
