import { Link } from '@inertiajs/react';

const popularDestinations = [
    { name: 'Pulau Pahawang', href: '/destinations' },
    { name: 'Taman Nasional Way Kambas', href: '/destinations' },
    { name: 'Pantai Gigi Hiu', href: '/destinations' },
    { name: 'Teluk Kiluan', href: '/destinations' },
];

const quickLinks = [
    { label: 'Beranda', href: route('home') },
    { label: 'Destinasi Wisata', href: route('destinations.index') },
    { label: 'Galeri Foto', href: route('gallery.index') },
    { label: 'Testimoni Pengunjung', href: route('testimonials.index') },
];

export default function PublicFooter() {
    return (
        <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80">
            <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
                    <div className="space-y-4 md:col-span-1">
                        <Link
                            href="/"
                            className="flex items-center gap-2.5 font-serif text-2xl tracking-tight text-white group"
                        >
                            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
                                <i className="bx bxs-compass text-2xl"></i>
                            </div>
                            <span className="font-bold">
                                Wonderly <span className="text-amber-400 font-sans text-xs uppercase font-extrabold tracking-widest ml-0.5 px-2 py-0.5 bg-blue-950 rounded-full border border-amber-800">Lampung</span>
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed text-slate-400">
                            Portal pariwisata terpadu Provinsi Lampung. Temukan destinasi eksotis, kekayaan budaya, dan pengalaman petualangan terbaik Sang Bumi Ruwa Jurai.
                        </p>
                        <div className="flex items-center gap-3 pt-2">
                            <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-amber-500 hover:border-amber-500 transition-all">
                                <i className="bx bxl-facebook text-xl"></i>
                            </a>
                            <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-amber-500 hover:border-amber-500 transition-all">
                                <i className="bx bxl-instagram text-xl"></i>
                            </a>
                            <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-amber-500 hover:border-amber-500 transition-all">
                                <i className="bx bxl-youtube text-xl"></i>
                            </a>
                            <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-amber-500 hover:border-amber-500 transition-all">
                                <i className="bx bxl-tiktok text-xl"></i>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                            <i className="bx bx-map-pin text-amber-400 text-lg"></i>
                            Destinasi Populer
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm">
                            {popularDestinations.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="inline-flex items-center gap-2 text-slate-400 transition hover:text-white hover:translate-x-1 duration-200"
                                    >
                                        <i className="bx bx-chevron-right text-amber-500"></i>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                            <i className="bx bx-navigation text-amber-400 text-lg"></i>
                            Navigasi Cepat
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm">
                            {quickLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="inline-flex items-center gap-2 text-slate-400 transition hover:text-white hover:translate-x-1 duration-200"
                                    >
                                        <i className="bx bx-chevron-right text-amber-500"></i>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                            <i className="bx bx-support text-amber-400 text-lg"></i>
                            Kontak & Layanan
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm text-slate-400">
                            <li className="flex items-start gap-3">
                                <i className="bx bx-buildings text-lg text-amber-400 shrink-0 mt-0.5"></i>
                                <span>Dinas Pariwisata Provinsi Lampung</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <i className="bx bx-map text-lg text-amber-400 shrink-0 mt-0.5"></i>
                                <span>Jl. S. Parman No.8, Bandar Lampung</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <i className="bx bx-envelope text-lg text-amber-400 shrink-0"></i>
                                <span>info@wonderlylampung.id</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <i className="bx bx-phone text-lg text-amber-400 shrink-0"></i>
                                <span>+62 721 123456</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
                    <p>&copy; {new Date().getFullYear()} Wonderly Lampung. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="hover:text-slate-400 transition">Kebijakan Privasi</a>
                        <a href="#" className="hover:text-slate-400 transition">Syarat & Ketentuan</a>
                        <a href="#" className="hover:text-slate-400 transition">Bantuan</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
