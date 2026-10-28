import { Head, Link, useForm } from '@inertiajs/react';

const fontFamily = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";
const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black';

const inputClass =
    'w-full rounded-none border-0 border-b bg-transparent px-0 py-2 text-base text-black transition-colors focus:outline-none focus:ring-0';

const fieldClass = (hasError) =>
    `${inputClass} ${hasError ? 'border-rose-500 focus:border-rose-500' : 'border-neutral-300 focus:border-black'}`;

function Field({ id, label, error, children }) {
    return (
        <div className="grid gap-1">
            <label htmlFor={id} className="text-sm text-neutral-500">
                {label}
            </label>
            {children}
            {error && (
                <p id={`${id}-error`} role="alert" className="pt-1 text-sm text-rose-600">
                    {error}
                </p>
            )}
        </div>
    );
}

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const fieldProps = (key) => ({
        id: key,
        name: key,
        required: true,
        value: data[key],
        'aria-invalid': !!errors[key],
        'aria-describedby': errors[key] ? `${key}-error` : undefined,
        className: fieldClass(!!errors[key]),
        onChange: (e) => setData(key, e.target.value),
    });

    return (
        <>
            <Head title="Daftar - Jelajah Lampung">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="flex min-h-screen flex-col bg-white px-6 py-8 text-neutral-800 antialiased" style={{ fontFamily }}>
                <header className="mx-auto w-full max-w-xs">
                    <Link href="/" className={`w-fit rounded-md text-sm font-medium text-black ${focusRing}`}>
                        Jelajah Lampung
                    </Link>
                </header>

                <main className="mx-auto flex w-full max-w-xs flex-1 flex-col justify-center py-16">
                    <h1 className="text-2xl font-medium tracking-tight text-black">Buat akun</h1>

                    <form onSubmit={submit} className="mt-10 flex flex-col gap-7">
                        <Field id="name" label="Nama" error={errors.name}>
                            <input {...fieldProps('name')} type="text" autoFocus autoComplete="name" />
                        </Field>

                        <Field id="email" label="Email" error={errors.email}>
                            <input {...fieldProps('email')} type="email" autoComplete="username" />
                        </Field>

                        <Field id="password" label="Kata sandi" error={errors.password}>
                            <input {...fieldProps('password')} type="password" autoComplete="new-password" />
                        </Field>

                        <Field id="password_confirmation" label="Konfirmasi kata sandi" error={errors.password_confirmation}>
                            <input {...fieldProps('password_confirmation')} type="password" autoComplete="new-password" />
                        </Field>

                        <button
                            type="submit"
                            disabled={processing}
                            className={`mt-3 w-full rounded-md bg-yellow-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-yellow-700 disabled:opacity-60 ${focusRing}`}
                        >
                            {processing ? 'Memproses...' : 'Daftar akun'}
                        </button>
                    </form>

                    <p className="mt-8 text-sm text-neutral-500">
                        Sudah punya akun?{' '}
                        <Link
                            href={route('login')}
                            className={`rounded-md font-medium text-black underline underline-offset-4 ${focusRing}`}
                        >
                            Masuk
                        </Link>
                    </p>
                </main>
            </div>
        </>
    );
}