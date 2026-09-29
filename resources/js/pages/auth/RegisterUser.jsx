import InputError from '@/components/InputError';
import AuthSplitLayout from '@/layouts/AuthSplitLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const labelClassName = 'font-mono text-[10px] uppercase tracking-widest text-[#4C83AD]';

const inputClassName =
    'mt-1.5 block w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#4C83AD] focus:ring-[#4C83AD]';

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

    const fields = [
        {
            id: 'name',
            label: 'Nama',
            placeholder: 'Nama lengkap',
            autoComplete: 'name',
            required: true,
        },
        {
            id: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'nama@email.com',
            autoComplete: 'username',
            required: true,
        },
        {
            id: 'phone_number',
            label: 'Nomor Kontak',
            type: 'tel',
            placeholder: '+62 ...',
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

    return (
        <AuthSplitLayout
            heading="Buat akun, lalu mulai perjalananmu."
            description="Isi informasi dasar Anda untuk menyimpan rencana perjalanan dan melanjutkan reservasi."
            cardClassName="bg-[#FBEFF2]"
        >
            <Head title="Buat Akun - Jelajah Lampung" />

            <h2 className="font-serif text-3xl font-semibold text-[#1E3A34]">Buat akun</h2>
            <p className="mt-2 text-xs text-slate-600">Lengkapi data berikut untuk melanjutkan reservasi.</p>

            <form onSubmit={submit} className="mt-6 space-y-4">
                {fields.map((field, index) => (
                    <div key={field.id}>
                        <label htmlFor={field.id} className={labelClassName}>
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
                            className={inputClassName}
                            onChange={(e) => setData(field.id, e.target.value)}
                        />
                        <InputError message={errors[field.id]} className="mt-2" />
                    </div>
                ))}

                <button
                    type="submit"
                    disabled={processing}
                    className="!mt-8 w-full rounded-full bg-[#1E3A34] py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#152A25] disabled:opacity-60"
                >
                    Buat Akun &amp; Lanjut
                </button>
            </form>

            <div className="mt-6 flex flex-col items-center gap-2 text-xs">
                <Link href={route('login')} className="text-[#4C83AD] transition hover:text-[#1E3A34]">
                    Sudah punya akun? Masuk
                </Link>
                <Link href={route('registrasi.select')} className="text-slate-500 transition hover:text-slate-700">
                    Kembali pilih tipe akun
                </Link>
            </div>
        </AuthSplitLayout>
    );
}
