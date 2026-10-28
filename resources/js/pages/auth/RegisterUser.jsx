import { Head, Link, useForm } from '@inertiajs/react';

const fontFamily = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";
const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-600';
const inputClass =
    'w-full rounded-2xl border bg-slate-50/50 px-4 py-3.5 text-sm text-slate-900 transition placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:bg-white';

const fieldClass = (hasError) =>
    `${inputClass} ${hasError ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20' : 'border-slate-200 focus:border-yellow-600 focus:ring-yellow-600/20'}`;

const fields = [
    {
        id: 'name',
        label: 'Nama Lengkap',
        placeholder: 'Nama lengkap Anda',
        autoComplete: 'name',
        required: true,
    },
    {
        id: 'email',
        label: 'Alamat Email',
        type: 'email',
        placeholder: 'nama@email.com',
        autoComplete: 'username',
        required: true,
    },
    {
        id: 'phone_number',
        label: 'Nomor Kontak (Opsional)',
        type: 'tel',
        placeholder: '+62 8xx xxxx xxxx',
        autoComplete: 'tel',
    },
    {
        id: 'password',
        label: 'Kata Sandi',
        type: 'password',
        placeholder: '••••••••',
        autoComplete: 'new-password',
        required: true,
    },
    {
        id: 'password_confirmation',
        label: 'Konfirmasi Kata Sandi',
        type: 'password',
        placeholder: '••••••••',
        autoComplete: 'new-password',
        required: true,
    },
];

export default function RegisterUser({ token }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        name: '',
        email: '',
        phone_number: '',
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
            <Head title="Buat Akun - Wanderly">
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
                            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Buat Akun Baru</h1>
                            <p className="mt-2 text-sm text-slate-500">Lengkapi data di bawah ini untuk mendaftarkan akun Anda.</p>
                        </div>

                        <form onSubmit={submit} className="space-y-5">
                            {fields.map((field, index) => (
                                <div key={field.id}>
                                    <label htmlFor={field.id} className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                                        {field.label}
                                    </label>
                                    <input
                                        id={field.id}
                                        name={field.id}
                                        type={field.type ?? 'text'}
                                        value={data[field.id]}
                                        placeholder={field.placeholder}
                                        autoComplete={field.autoComplete}
                                        autoFocus={index === 0}
                                        required={field.required}
                                        className={fieldClass(!!errors[field.id])}
                                        onChange={(e) => setData(field.id, e.target.value)}
                                    />
                                    {errors[field.id] && (
                                        <p className="mt-1 text-xs text-rose-600 font-medium">
                                            {errors[field.id]}
                                        </p>
                                    )}
                                </div>
                            ))}

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-4 rounded-2xl bg-yellow-600 text-white font-bold text-sm tracking-wide shadow-xl shadow-yellow-600/20 hover:bg-yellow-700 transition disabled:opacity-50"
                            >
                                {processing ? 'Memproses...' : 'Daftar Akun Sekarang'}
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

                {/* {Right: Image / Visual Banner */}
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