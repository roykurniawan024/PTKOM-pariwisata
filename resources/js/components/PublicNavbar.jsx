import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

const navigationLinks = [
    { label: 'Destinasi', href: '/destinations' },
    { label: 'Budaya', href: '/#budaya' },
    { label: 'Galeri', href: '/#galeri' },
    { label: 'Testimoni', href: '/#testimoni' },
];

export default function PublicNavbar() {
    const { props, url: currentUrl } = usePage();
    const { auth } = props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (href) =>
        !href.includes('#') && currentUrl.startsWith(href);

    return (
        <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/50 bg-white/80 shadow-xs backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
                <div className="flex items-center">
                    <Link href="/" className="font-serif text-2xl tracking-tight">
                        <span className="font-semibold text-[#2D4D43]">
                            Jelajah
                        </span>{' '}
                        <span className="font-normal italic text-[#4C83AD]">
                            Lampung
                        </span>
                    </Link>
                </div>

                <div className="hidden items-center gap-10 md:flex">
                    {navigationLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className={`text-sm font-medium transition hover:text-[#4C83AD] ${
                                isActive(link.href)
                                    ? 'text-[#4C83AD]'
                                    : 'text-slate-700'
                            }`}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                <div className="hidden items-center gap-3 md:flex">
                    {auth?.user ? (
                        <Link
                            href={route('dashboard')}
                            className="rounded-full bg-[#4C83AD] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#3d6d93]"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="text-sm font-medium text-slate-700 transition hover:text-[#4C83AD]"
                            >
                                Masuk
                            </Link>
                            <Link
                                href={route('registrasi.select')}
                                className="rounded-full bg-[#4C83AD] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#3d6d93]"
                            >
                                Daftar Akun
                            </Link>
                        </>
                    )}
                </div>

                <button
                    type="button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="rounded-md p-2 text-slate-700 md:hidden"
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
                <div className="flex flex-col gap-2 border-t border-slate-200 bg-white px-6 py-6 shadow-xl md:hidden">
                    {navigationLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className={`rounded-md px-3 py-2 text-base font-medium hover:bg-slate-50 ${
                                isActive(link.href)
                                    ? 'text-[#4C83AD]'
                                    : 'text-slate-700'
                            }`}
                        >
                            {link.label}
                        </a>
                    ))}
                    <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4">
                        {auth?.user ? (
                            <Link
                                href={route('dashboard')}
                                className="rounded-full bg-[#4C83AD] px-6 py-3 text-center text-sm font-medium text-white"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="rounded-full border border-slate-200 px-6 py-3 text-center text-sm font-medium text-slate-700"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href={route('registrasi.select')}
                                    className="rounded-full bg-[#4C83AD] px-6 py-3 text-center text-sm font-medium text-white"
                                >
                                    Daftar Akun
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
