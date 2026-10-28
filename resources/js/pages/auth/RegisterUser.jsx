import AuthSplitLayout from '@/layouts/AuthSplitLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const fontFamily = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";
const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-500';

const inputClass = (hasError) =>
    `block w-full rounded-2xl border bg-slate-50/50 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 transition focus:outline-none focus:ring-2 focus:bg-white ${
        hasError
            ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
            : 'border-slate-200 focus:border-amber-500 focus:ring-amber-500/20'
    }`;

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
        <AuthSplitLayout
            heading="Bergabung dengan Wonderly Lampung"
            description="Buat akun Anda untuk menyimpan destinasi favorit dan menikmati pengalaman wisata terbaik."
            cardClassName="bg-white"
        >
            <Head title="Buat Akun - Wonderly Lampung">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700" rel="stylesheet" />
            </Head>

            <div style={{ fontFamily }} className="antialiased max-w-md mx-auto py-6">
                <div className="mb-8">
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Buat Akun Baru</h2>
                    <p className="mt-2 text-sm text-slate-500">Lengkapi data di bawah ini untuk mendaftarkan akun Anda.</p>
                </div>

                <form onSubmit={submit} className="space-y-5">
                    {fields.map((field, index) => (
                        <div key={field.id} className="grid gap-2">
                            <label htmlFor={field.id} className="block text-xs font-bold uppercase tracking-wider text-slate-600">
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
                                className={inputClass(!!errors[field.id])}
                                onChange={(e) => setData(field.id, e.target.value)}
                            />
                            {errors[field.id] && (
                                <p role="alert" className="text-xs text-rose-600 font-medium">
                                    {errors[field.id]}
                                </p>
                            )}
                        </div>
                    ))}

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full mt-4 py-4 rounded-2xl bg-amber-500 text-white font-bold text-sm tracking-wide shadow-xl shadow-amber-500/20 hover:bg-amber-600 transition disabled:opacity-50"
                    >
                        {processing ? 'Memproses...' : 'Daftar Akun Sekarang'}
                    </button>
                </form>

                <p className="mt-8 text-center text-xs text-slate-500">
                    Sudah punya akun?{' '}
                    <Link href={route('login')} className="font-bold text-amber-500 hover:underline">
                        Masuk di sini
                    </Link>
                </p>
            </div>
        </AuthSplitLayout>
    );
}