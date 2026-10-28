import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

const navigationLinks = [
    { label: 'Beranda', href: route('home') },
    { label: 'Destinasi', href: route('destinations.index') },
    { label: 'Galeri', href: route('gallery.index') },
    { label: 'Testimoni', href: route('testimonials.index') },
];

export default function PublicNavbar() {
    const { props, url: currentUrl } = usePage();
    const { auth } = props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (href) => {
        if (!href) return false;
        try {
            const urlPath = new URL(href, window.location.origin).pathname;
            if (urlPath === '/' && currentUrl === '/') return true;
            if (urlPath !== '/' && currentUrl.startsWith(urlPath)) return true;
        } catch {
            return false;
        }
        return false;
    };

    return (
        <nav className="fixed inset-x-0 flex justify-center items-center w-full z-50">
            <div className="relative w-full z-50 backdrop-blur-md transition-all">
                <div className="mx-auto flex w-full items-center justify-between px-6 py-3.5 sm:px-8">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2.5 group">
                            <span className="font-serif text-2xl tracking-tight text-yellow-600 font-bold">
                                Wanderly
                            </span>
                        </Link>
                    </div>

                    <div className="hidden items-center gap-8 md:flex bg-white px-6 py-4 rounded-full shadow-md">
                        {navigationLinks.map((link) => {
                            const active = isActive(link.href);
                            return (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className={`text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                                        active
                                            ? 'text-yellow-600 font-semibold'
                                            : 'text-slate-600 hover:text-yellow-600'
                                    }`}
                                >
                                    {link.label === 'Beranda' && <i className="bx bx-home-alt text-base"></i>}
                                    {link.label === 'Destinasi' && <i className="bx bx-map-alt text-base"></i>}
                                    {link.label === 'Galeri' && <i className="bx bx-images text-base"></i>}
                                    {link.label === 'Testimoni' && <i className="bx bx-message-square-detail text-base"></i>}
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="hidden items-center gap-3 md:flex">
                        {auth?.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-yellow-600 shadow-sm hover:shadow-yellow-600/25"
                            >
                                <i className="bx bx-grid-alt text-base"></i>
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-flex items-center gap-1.5 rounded-md bg-yellow-600 px-5 py-2.5 text-xs font-bold tracking-wider uppercase text-white transition hover:bg-yellow-700"
                                >
                                    <i className="bx bx-log-in text-base"></i>
                                    Masuk
                                </Link>
                            </>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
                        aria-label="Buka menu"
                    >
                        <i className={`bx ${isMenuOpen ? 'bx-x' : 'bx-menu'} text-2xl`}></i>
                    </button>
                </div>

                {isMenuOpen && (
                    <div className="flex flex-col gap-2 border-t border-slate-100 bg-white/95 backdrop-blur-md px-6 py-6 shadow-xl md:hidden rounded-b-2xl">
                        {navigationLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={`flex items-center gap-2.5 rounded-xl px-4 py-3 text-base font-medium transition ${
                                    isActive(link.href)
                                        ? 'bg-yellow-50 text-yellow-600 font-semibold'
                                        : 'text-slate-700 hover:bg-slate-50'
                                }`}
                            >
                                {link.label === 'Beranda' && <i className="bx bx-home-alt text-lg"></i>}
                                {link.label === 'Destinasi' && <i className="bx bx-map-alt text-lg"></i>}
                                {link.label === 'Galeri' && <i className="bx bx-images text-lg"></i>}
                                {link.label === 'Testimoni' && <i className="bx bx-message-square-detail text-lg"></i>}
                                {link.label}
                            </Link>
                        ))}
                        <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4">
                            {auth?.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-center text-sm font-semibold text-white shadow-md"
                                >
                                    <i className="bx bx-grid-alt text-lg"></i>
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-6 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                    >
                                        <i className="bx bx-log-in text-lg"></i>
                                        Masuk
                                    </Link>
                                    <Link
                                        href={route('registrasi.select')}
                                        className="flex items-center justify-center gap-2 rounded-md bg-yellow-600 px-6 py-3 text-center text-sm font-semibold text-white"
                                    >
                                        <i className="bx bx-user-plus text-lg"></i>
                                        Daftar
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
