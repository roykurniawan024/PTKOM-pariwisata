import { Head, Link, useForm } from '@inertiajs/react';

const fontFamily = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";
const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-600';
const inputClass =
    'w-full rounded-2xl border bg-slate-50/50 px-4 py-3.5 text-sm text-slate-900 transition placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:bg-white';

const fieldClass = (hasError) =>
    `${inputClass} ${hasError ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20' : 'border-slate-200 focus:border-yellow-600 focus:ring-yellow-600/20'}`;

const businessTypes = [
    { value: 'kuliner', label: 'Kuliner / Restoran' },
    { value: 'penginapan', label: 'Penginapan / Hotel' },
    { value: 'souvenir', label: 'Oleh-oleh / Souvenir' },
    { value: 'tour_guide', label: 'Pemandu Wisata' },
    { value: 'transportasi', label: 'Transportasi / Rental' },
    { value: 'atraksi_wisata', label: 'Atraksi / Objek Wisata' },
    { value: 'lainnya', label: 'Lainnya' },
];

export default function RegisterBusiness({ token }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        name: '',
        email: '',
        phone_number: '',
        business_name: '',
        business_type: '',
        business_address: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('registrasi.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Daftar Mitra Usaha - Wanderly">
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

                    <div className="w-full px-[10%] w-full mx-auto py-10 overflow-y-auto">
                        <div className="mb-8">
                            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Daftar Sebagai Mitra Usaha</h1>
                            <p className="mt-2 text-sm text-slate-500">Akun diverifikasi admin sebelum dapat mengelola konten wisata.</p>
                        </div>

                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                                    Nama Pemilik
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    autoComplete="name"
                                    value={data.name}
                                    placeholder="Nama lengkap Anda"
                                    className={fieldClass(!!errors.name)}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                {errors.name && <p className="mt-1 text-xs text-rose-600 font-medium">{errors.name}</p>}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                                    Email Bisnis
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    autoComplete="username"
                                    value={data.email}
                                    placeholder="nama@email.com"
                                    className={fieldClass(!!errors.email)}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                {errors.email && <p className="mt-1 text-xs text-rose-600 font-medium">{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="phone_number" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                                    Nomor WhatsApp Aktif
                                </label>
                                <input
                                    id="phone_number"
                                    type="tel"
                                    required
                                    autoComplete="tel"
                                    value={data.phone_number}
                                    placeholder="081234567890"
                                    className={fieldClass(!!errors.phone_number)}
                                    onChange={(e) => setData('phone_number', e.target.value)}
                                />
                                {errors.phone_number && <p className="mt-1 text-xs text-rose-600 font-medium">{errors.phone_number}</p>}
                            </div>

                            <div className="pt-4 border-t border-slate-100">
                                <h3 className="text-sm font-bold text-slate-900 mb-4">Informasi Usaha</h3>

                                <div className="space-y-5">
                                    <div>
                                        <label htmlFor="business_name" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                                            Nama Usaha / Objek Wisata
                                        </label>
                                        <input
                                            id="business_name"
                                            type="text"
                                            required
                                            autoComplete="organization"
                                            value={data.business_name}
                                            placeholder="Contoh: Warung Kopi Lampung"
                                            className={fieldClass(!!errors.business_name)}
                                            onChange={(e) => setData('business_name', e.target.value)}
                                        />
                                        {errors.business_name && <p className="mt-1 text-xs text-rose-600 font-medium">{errors.business_name}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="business_type" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                                            Kategori Usaha
                                        </label>
                                        <select
                                            id="business_type"
                                            required
                                            value={data.business_type}
                                            className={fieldClass(!!errors.business_type)}
                                            onChange={(e) => setData('business_type', e.target.value)}
                                        >
                                            <option value="">Pilih kategori</option>
                                            {businessTypes.map(({ value, label }) => (
                                                <option key={value} value={value}>
                                                    {label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.business_type && <p className="mt-1 text-xs text-rose-600 font-medium">{errors.business_type}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="business_address" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                                            Alamat Lengkap Usaha
                                        </label>
                                        <textarea
                                            id="business_address"
                                            required
                                            rows={3}
                                            autoComplete="street-address"
                                            value={data.business_address}
                                            placeholder="Alamat detail lokasi usaha Anda..."
                                            className={fieldClass(!!errors.business_address)}
                                            onChange={(e) => setData('business_address', e.target.value)}
                                        />
                                        {errors.business_address && <p className="mt-1 text-xs text-rose-600 font-medium">{errors.business_address}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100">
                                <h3 className="text-sm font-bold text-slate-900 mb-4">Keamanan Akun</h3>

                                <div className="space-y-5">
                                    <div>
                                        <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                                            Kata Sandi
                                        </label>
                                        <input
                                            id="password"
                                            type="password"
                                            required
                                            autoComplete="new-password"
                                            value={data.password}
                                            placeholder="••••••••"
                                            className={fieldClass(!!errors.password)}
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                        {errors.password && <p className="mt-1 text-xs text-rose-600 font-medium">{errors.password}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="password_confirmation" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                                            Konfirmasi Kata Sandi
                                        </label>
                                        <input
                                            id="password_confirmation"
                                            type="password"
                                            required
                                            autoComplete="new-password"
                                            value={data.password_confirmation}
                                            placeholder="••••••••"
                                            className={fieldClass(!!errors.password_confirmation)}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                        />
                                        {errors.password_confirmation && <p className="mt-1 text-xs text-rose-600 font-medium">{errors.password_confirmation}</p>}
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-4 rounded-2xl bg-yellow-600 text-white font-bold text-sm tracking-wide shadow-xl shadow-yellow-600/20 hover:bg-yellow-700 transition disabled:opacity-50 mt-6"
                            >
                                {processing ? 'Memproses...' : 'Daftar Sebagai Mitra Usaha'}
                            </button>
                        </form>

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