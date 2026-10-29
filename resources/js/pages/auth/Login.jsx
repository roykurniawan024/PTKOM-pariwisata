import { Head, Link, useForm } from '@inertiajs/react';

const fontFamily = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";
const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-600';
const inputClass =
    'w-full rounded-2xl border bg-slate-50/50 px-4 py-3.5 text-sm text-slate-900 transition placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:bg-white';

const fieldClass = (hasError) =>
    `${inputClass} ${hasError ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20' : 'border-slate-200 focus:border-yellow-600 focus:ring-yellow-600/20'}`;

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
        <>
            <Head title="Masuk - Wanderly">
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
                            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Selamat Datang</h1>
                            <p className="mt-2 text-sm text-slate-500">Masuk untuk menjelajahi dan mengelola pariwisata Lampung.</p>
                        </div>

                        {status && (
                            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-medium">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    autoComplete="username"
                                    value={data.email}
                                    placeholder="nama@email.com"
                                    className={fieldClass(!!errors.email)}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                {errors.email && <p className="mt-1 text-xs text-rose-600 font-medium">{errors.email}</p>}
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                                        Kata Sandi
                                    </label>
                                    {canResetPassword && (
                                        <Link href={route('password.request')} className="text-xs font-semibold text-yellow-600 hover:underline">
                                            Lupa kata sandi?
                                        </Link>
                                    )}
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    autoComplete="current-password"
                                    value={data.password}
                                    placeholder="••••••••"
                                    className={fieldClass(!!errors.password)}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                {errors.password && <p className="mt-1 text-xs text-rose-600 font-medium">{errors.password}</p>}
                            </div>

                            <div className="flex items-center">
                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="w-4 h-4 rounded border-slate-300 text-yellow-600 focus:ring-yellow-500"
                                    />
                                    <span className="text-xs font-medium text-slate-600">Ingat saya di perangkat ini</span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-4 rounded-2xl bg-yellow-600 text-white font-bold text-sm tracking-wide shadow-xl shadow-yellow-600/20 hover:bg-yellow-700 transition disabled:opacity-50"
                            >
                                {processing ? 'Memproses...' : 'Masuk ke Akun'}
                            </button>
                        </form>

                        <p className="mt-8 text-center text-xs text-slate-500">
                            Belum punya akun?{' '}
                            <Link href={route('registrasi.select')} className="font-bold text-yellow-600 hover:underline">
                                Buat Akun Baru
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