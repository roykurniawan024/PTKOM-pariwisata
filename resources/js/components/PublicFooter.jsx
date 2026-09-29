import { Link } from '@inertiajs/react';

const popularDestinations = [
    'Pulau Pahawang',
    'Way Kambas',
    'Pantai Gigi Hiu',
    'Teluk Kiluan',
];

const quickLinks = [
    { label: 'Destinasi Wisata', href: '/destinations' },
    { label: 'Budaya & Tradisi', href: '/#budaya' },
    { label: 'Galeri Foto', href: '/#galeri' },
    { label: 'Testimoni', href: '/#testimoni' },
];

export default function PublicFooter() {
    return (
        <footer className="bg-[#152A25] text-slate-400">
            <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
                    <div className="space-y-4 md:col-span-1">
                        <Link
                            href="/"
                            className="font-serif text-2xl tracking-tight text-white"
                        >
                            <span>Jelajah</span>{' '}
                            <span className="font-normal italic text-[#E8C5C8]">
                                Lampung
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed text-slate-400">
                            Portal informasi pariwisata dan kebudayaan resmi
                            Provinsi Lampung. Temukan keindahan Sang Bumi Ruwa
                            Jurai.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                            Destinasi Populer
                        </h3>
                        <ul className="mt-4 space-y-2.5 text-sm">
                            {popularDestinations.map((name) => (
                                <li key={name}>
                                    <a
                                        href="/destinations"
                                        className="transition hover:text-white"
                                    >
                                        {name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                            Navigasi Cepat
                        </h3>
                        <ul className="mt-4 space-y-2.5 text-sm">
                            {quickLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="transition hover:text-white"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                            Kontak & Informasi
                        </h3>
                        <ul className="mt-4 space-y-2.5 text-sm">
                            <li>Dinas Pariwisata Provinsi Lampung</li>
                            <li>Bandar Lampung, Indonesia</li>
                            <li>info@jelajahlampung.id</li>
                            <li>+62 721 123456</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-slate-500">
                    &copy; {new Date().getFullYear()} Jelajah Lampung. All
                    rights reserved.
                </div>
            </div>
        </footer>
    );
}
