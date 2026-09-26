import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

const navigationLinks = [
    { label: 'Destinasi', href: '#destinasi' },
    { label: 'Budaya', href: '#budaya' },
    { label: 'Galeri', href: '#galeri' },
];

const statistics = [
    { value: '47+', label: 'Destinasi Wisata' },
    { value: '1.2jt', label: 'Wisatawan/Tahun' },
    { value: '9', label: 'Kategori Wisata' },
    { value: '4.8★', label: 'Rating Rata-rata' },
];

export default function Index({ auth }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const accountLink = auth.user
        ? { label: 'Dashboard', href: route('dashboard') }
        : { label: 'Login', href: route('login') };

    return (
        <>
            <Head title="Jelajah Lampung" />
            <div className="flex min-h-screen flex-col bg-white font-sans text-slate-800">
                <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/20 bg-white/30 backdrop-blur-md">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 md:justify-start lg:px-12">
                        <div className="md:flex-1">
                            <Link
                                href="/"
                                className="font-serif text-xl sm:text-2xl"
                            >
                                <span className="font-semibold text-[#5B8DBE]">
                                    Jelajah
                                </span>{' '}
                                <span className="italic text-slate-800">
                                    Lampung
                                </span>
                            </Link>
                        </div>

                        <div className="hidden items-center gap-8 md:flex lg:gap-10">
                            {navigationLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="text-sm text-slate-600 transition hover:text-[#5B8DBE]"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        <div className="hidden md:flex md:flex-1 md:pl-8 lg:pl-10">
                            <Link
                                href={accountLink.href}
                                className="rounded-full bg-[#5B8DBE] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#4A7BAA]"
                            >
                                {accountLink.label}
                            </Link>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="rounded-md p-2 text-slate-800 md:hidden"
                            aria-label="Buka menu"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                {isMenuOpen ? (
                                    <path d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>

                    {isMenuOpen && (
                        <div className="flex flex-col gap-1 border-t border-white/20 bg-white/90 px-4 pb-4 pt-2 md:hidden">
                            {navigationLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <Link
                                href={accountLink.href}
                                className="mt-2 rounded-full bg-[#5B8DBE] px-6 py-2.5 text-center text-sm font-medium text-white"
                            >
                                {accountLink.label}
                            </Link>
                        </div>
                    )}
                </nav>

                <main className="flex-1">
                    <section className="relative flex min-h-[640px] items-center overflow-hidden sm:min-h-screen">
                        <img
                            src="/images/hero-lampung.jpg"
                            alt="Pantai di Lampung"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-900/85" />

                        <div className="relative mx-auto w-full max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:px-12">
                            <h1 className="font-serif text-5xl font-medium leading-tight text-white sm:text-6xl lg:text-7xl">
                                Alam Liar,
                                <br />
                                <span className="italic text-pink-200">
                                    Budaya Kaya,
                                </span>
                                <br />
                                <span className="font-semibold text-[#2F8FE0]">
                                    Lampung.
                                </span>
                            </h1>
                            <p className="mt-6 max-w-md text-base leading-relaxed text-white/85 sm:text-lg">
                                Dari sabana Way Kambas hingga ombak Samudra
                                Hindia — Lampung menyimpan keajaiban alam dan
                                tradisi yang menunggu untuk dijelajahi.
                            </p>
                            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                                <a
                                    href="#destinasi"
                                    className="rounded-full bg-[#5B8DBE] px-8 py-4 text-center font-medium text-white transition hover:bg-[#4A7BAA]"
                                >
                                    Jelajahi Destinasi
                                </a>
                                <a
                                    href="#budaya"
                                    className="rounded-full border border-white/40 px-8 py-4 text-center text-white/90 transition hover:bg-white/10"
                                >
                                    Kenali Budaya Lokal
                                </a>
                            </div>
                        </div>

                        <a
                            href="#destinasi"
                            className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-bounce text-white/70 sm:block"
                            aria-label="Gulir ke bawah"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path d="M19 9l-7 7-7-7" />
                            </svg>
                        </a>
                    </section>

                    <section id="destinasi" className="bg-[#5B8DBE]">
                        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-12">
                            {statistics.map((statistic) => (
                                <div
                                    key={statistic.label}
                                    className="text-center"
                                >
                                    <div className="font-serif text-3xl font-semibold text-white sm:text-4xl">
                                        {statistic.value}
                                    </div>
                                    <div className="mt-2 text-xs uppercase tracking-widest text-white/75">
                                        {statistic.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>

                <footer className="bg-slate-900 text-slate-400">
                    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm sm:flex-row sm:px-6 lg:px-12">
                        <span className="font-serif text-lg text-white">
                            Jelajah <span className="italic">Lampung</span>
                        </span>
                        <span>
                            &copy; {new Date().getFullYear()} Jelajah Lampung.
                            All rights reserved.
                        </span>
                    </div>
                </footer>
            </div>
        </>
    );
}
