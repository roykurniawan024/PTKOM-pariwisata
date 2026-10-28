import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

const fontFamily = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";

function ArrowIcon() {
    return (
        <svg
            width={12}
            height={12}
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
            className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
        >
            <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    const links = auth.user
        ? [{ title: 'Dashboard', description: 'Lanjutkan ke akun Anda', href: route('dashboard') }]
        : [
              { title: 'Daftar akun', description: 'Mulai dengan akun baru', href: route('registrasi.select') },
              { title: 'Masuk', description: 'Sudah punya akun', href: route('login') },
          ];

    return (
        <>
            <Head title="Selamat datang">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="flex min-h-screen flex-col bg-white px-6 py-6 text-slate-800 antialiased sm:px-10" style={{ fontFamily }}>
                <header className="mx-auto w-full max-w-xl text-sm">
                    <span className="flex w-fit items-center gap-2 font-medium text-slate-900">
                        <span className="h-2 w-2 rounded-full bg-yellow-600" aria-hidden="true" />
                        Wanderly
                    </span>
                </header>

                <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center py-20 transition-opacity duration-700 starting:opacity-0">
                    <h1 className="text-4xl leading-[1.1] font-semibold tracking-tight text-slate-900 sm:text-5xl">
                        Jelajahi
                        <br />
                        Lampung.
                    </h1>

                    <p className="mt-5 max-w-sm text-base leading-relaxed text-slate-600">
                        Alam liar dan budaya kaya di satu tempat. Masuk atau buat akun untuk mulai.
                    </p>

                    <ul className="mt-12 divide-y divide-slate-200 border-y border-slate-200">
                        {links.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className="group flex items-center justify-between gap-6 py-4 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-yellow-600"
                                >
                                    <span className="flex flex-col">
                                        <span className="text-sm font-medium text-slate-900 transition-colors group-hover:text-yellow-600">
                                            {item.title}
                                        </span>
                                        <span className="text-sm text-slate-500">{item.description}</span>
                                    </span>
                                    <span className="text-slate-400 transition-colors group-hover:text-yellow-600">
                                        <ArrowIcon />
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </main>
            </div>
        </>
    );
}