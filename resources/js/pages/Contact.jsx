import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

function Icon({ children, className = 'h-5 w-5' }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            {children}
        </svg>
    );
}

export default function Contact() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setSubmitted(true);

        setForm({
            name: '',
            email: '',
            subject: '',
            message: '',
        });
    };

    return (
        <div className="min-h-screen bg-[#f7f8fa] text-[#172033]">
            <Head title="Kontak - Wanderly" />

            {/* ================= NAVBAR ================= */}
            <header className="px-4 pt-6 md:px-8">
                <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-[24px] bg-white px-6 py-5 shadow-lg md:flex-row md:items-center md:justify-between md:px-10">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="font-serif text-3xl font-bold tracking-tight text-[#172033]"
                    >
                        Wanderly
                    </Link>

                    {/* Navigation */}
                    <nav className="flex flex-wrap items-center justify-center gap-6">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-[16px] font-medium text-slate-500 transition hover:text-[#f59e0b]"
                        >
                            <Icon>
                                <path d="m3 10 9-7 9 7" />
                                <path d="M5 9v11h14V9" />
                                <path d="M9 20v-6h6v6" />
                            </Icon>
                            Beranda
                        </Link>

                        <Link
                            href="/destinations"
                            className="flex items-center gap-2 text-[16px] font-medium text-slate-500 transition hover:text-[#f59e0b]"
                        >
                            <Icon>
                                <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" />
                                <path d="M9 3v15" />
                                <path d="M15 6v15" />
                            </Icon>
                            Destinasi
                        </Link>

                        <Link
                            href="/gallery"
                            className="flex items-center gap-2 text-[16px] font-medium text-slate-500 transition hover:text-[#f59e0b]"
                        >
                            <Icon>
                                <rect x="3" y="4" width="18" height="16" rx="2" />
                                <circle cx="8.5" cy="9" r="1.5" />
                                <path d="m21 15-5-5L5 20" />
                            </Icon>
                            Galeri
                        </Link>

                        <Link
                            href="/testimonials"
                            className="flex items-center gap-2 text-[16px] font-medium text-slate-500 transition hover:text-[#f59e0b]"
                        >
                            <Icon>
                                <path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.5 9.5 0 0 1-4-.9L3 21l1.9-4A8.2 8.2 0 0 1 3 11.5 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5Z" />
                            </Icon>
                            Testimoni
                        </Link>

                        <Link
                            href="/contact"
                            className="flex items-center gap-2 text-[16px] font-semibold text-[#f59e0b]"
                        >
                            <Icon>
                                <rect x="3" y="5" width="18" height="14" rx="2" />
                                <path d="m3 7 9 6 9-6" />
                            </Icon>
                            Kontak
                        </Link>
                    </nav>

                    {/* Authentication */}
                    <div className="flex items-center justify-center gap-3">
                        <Link
                            href="/login"
                            className="flex items-center gap-2 rounded-xl px-4 py-3 font-semibold text-[#172033] transition hover:bg-slate-50"
                        >
                            <Icon className="h-5 w-5">
                                <path d="M10 17l5-5-5-5" />
                                <path d="M15 12H3" />
                                <path d="M21 19V5a2 2 0 0 0-2-2h-5" />
                            </Icon>
                            MASUK
                        </Link>

                        <Link
                            href="/register"
                            className="flex items-center gap-2 rounded-xl bg-[#f59e0b] px-5 py-3 font-bold text-white shadow-sm transition hover:bg-[#d97706]"
                        >
                            <Icon className="h-5 w-5">
                                <circle cx="9" cy="8" r="3" />
                                <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                                <path d="M19 8v6" />
                                <path d="M16 11h6" />
                            </Icon>
                            DAFTAR
                        </Link>
                    </div>
                </div>
            </header>

            {/* ================= HERO ================= */}
            <section className="px-4 pt-12 md:px-8 md:pt-16">
                <div className="mx-auto max-w-7xl">
                    <div className="relative overflow-hidden rounded-[30px] bg-[#172033] px-7 py-12 md:px-14 md:py-16">

                        {/* Dekorasi kuning */}
                        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#f59e0b]/15" />
                        <div className="absolute -bottom-32 right-24 h-64 w-64 rounded-full bg-[#f59e0b]/10" />

                        <div className="relative max-w-3xl">
                            <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-[#f59e0b]">
                                WANDERLY
                            </p>

                            <h1 className="font-serif text-4xl font-bold leading-tight text-white md:text-6xl">
                                Kontak &
                                <br />
                                <span className="text-[#f59e0b]">
                                    Layanan
                                </span>
                            </h1>

                            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
                                Punya pertanyaan tentang destinasi wisata,
                                budaya, atau perjalanan di Lampung?
                                Sampaikan pesanmu kepada kami.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= CONTENT ================= */}
            <main className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
                <div className="grid gap-8 lg:grid-cols-5">

                    {/* ================= CONTACT INFO ================= */}
                    <section className="lg:col-span-2">
                        <div className="h-full rounded-[26px] bg-white p-7 shadow-sm md:p-8">

                            <div className="border-b border-slate-100 pb-6">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff3d6] text-[#f59e0b]">
                                    <Icon className="h-6 w-6">
                                        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                                        <circle cx="12" cy="10" r="2.5" />
                                    </Icon>
                                </div>

                                <h2 className="mt-5 font-serif text-3xl font-bold text-[#172033]">
                                    Hubungi Kami
                                </h2>

                                <p className="mt-3 leading-relaxed text-slate-500">
                                    Kami siap membantu memberikan informasi
                                    seputar destinasi dan pariwisata Lampung.
                                </p>
                            </div>

                            <div className="mt-7 space-y-6">

                                {/* Address */}
                                <div className="flex gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fff3d6] text-[#f59e0b]">
                                        <Icon>
                                            <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                                            <circle cx="12" cy="10" r="2.5" />
                                        </Icon>
                                    </div>

                                    <div>
                                        <p className="text-sm font-bold text-[#172033]">
                                            Alamat
                                        </p>

                                        <p className="mt-1 text-sm leading-relaxed text-slate-500">
                                            Provinsi Lampung,
                                            Indonesia
                                        </p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fff3d6] text-[#f59e0b]">
                                        <Icon>
                                            <rect x="3" y="5" width="18" height="14" rx="2" />
                                            <path d="m3 7 9 6 9-6" />
                                        </Icon>
                                    </div>

                                    <div>
                                        <p className="text-sm font-bold text-[#172033]">
                                            Email
                                        </p>

                                        <p className="mt-1 text-sm text-slate-500">
                                            info@wanderly.id
                                        </p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fff3d6] text-[#f59e0b]">
                                        <Icon>
                                            <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7A2 2 0 0 1 22 16.9Z" />
                                        </Icon>
                                    </div>

                                    <div>
                                        <p className="text-sm font-bold text-[#172033]">
                                            Telepon
                                        </p>

                                        <p className="mt-1 text-sm text-slate-500">
                                            +62 721 123456
                                        </p>
                                    </div>
                                </div>

                                {/* Hours */}
                                <div className="flex gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fff3d6] text-[#f59e0b]">
                                        <Icon>
                                            <circle cx="12" cy="12" r="9" />
                                            <path d="M12 7v5l3 2" />
                                        </Icon>
                                    </div>

                                    <div>
                                        <p className="text-sm font-bold text-[#172033]">
                                            Jam Layanan
                                        </p>

                                        <p className="mt-1 text-sm leading-relaxed text-slate-500">
                                            Senin - Jumat
                                            <br />
                                            08.00 - 16.00 WIB
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ================= FORM ================= */}
                    <section className="lg:col-span-3">
                        <div className="rounded-[26px] bg-white p-7 shadow-sm md:p-8">

                            <div className="mb-7">
                                <h2 className="font-serif text-3xl font-bold text-[#172033]">
                                    Kirim Pesan
                                </h2>

                                <p className="mt-2 text-slate-500">
                                    Isi formulir berikut untuk menghubungi
                                    tim Wanderly.
                                </p>
                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >
                                <div className="grid gap-5 md:grid-cols-2">

                                    {/* Name */}
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="mb-2 block text-sm font-semibold text-[#172033]"
                                        >
                                            Nama Lengkap
                                        </label>

                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="Nama kamu"
                                            required
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-[#f59e0b] focus:bg-white focus:ring-2 focus:ring-[#f59e0b]/20"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="mb-2 block text-sm font-semibold text-[#172033]"
                                        >
                                            Email
                                        </label>

                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="nama@email.com"
                                            required
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-[#f59e0b] focus:bg-white focus:ring-2 focus:ring-[#f59e0b]/20"
                                        />
                                    </div>
                                </div>

                                {/* Subject */}
                                <div>
                                    <label
                                        htmlFor="subject"
                                        className="mb-2 block text-sm font-semibold text-[#172033]"
                                    >
                                        Subjek
                                    </label>

                                    <input
                                        id="subject"
                                        name="subject"
                                        type="text"
                                        value={form.subject}
                                        onChange={handleChange}
                                        placeholder="Subjek pesan"
                                        required
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-[#f59e0b] focus:bg-white focus:ring-2 focus:ring-[#f59e0b]/20"
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <label
                                        htmlFor="message"
                                        className="mb-2 block text-sm font-semibold text-[#172033]"
                                    >
                                        Pesan
                                    </label>

                                    <textarea
                                        id="message"
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="Tuliskan pesan kamu..."
                                        rows="6"
                                        required
                                        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-[#f59e0b] focus:bg-white focus:ring-2 focus:ring-[#f59e0b]/20"
                                    />
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#f59e0b] px-6 py-4 font-bold text-white shadow-sm transition hover:bg-[#d97706] hover:shadow-md"
                                >
                                    Kirim Pesan

                                    <Icon className="h-5 w-5">
                                        <path d="m22 2-7 20-4-9-9-4Z" />
                                        <path d="M22 2 11 13" />
                                    </Icon>
                                </button>
                            </form>

                            {submitted && (
                                <div className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                                    Pesan berhasil dikirim. Terima kasih telah
                                    menghubungi Wanderly.
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </main>

            {/* ================= FOOTER ================= */}
            <footer className="bg-[#172033]">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-8 md:flex-row md:px-8">
                    <div>
                        <p className="font-serif text-2xl font-bold text-white">
                            Wanderly
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                            Jelajahi keindahan Lampung.
                        </p>
                    </div>

                    <p className="text-sm text-slate-400">
                        © 2026 Wanderly. Semua hak dilindungi.
                    </p>
                </div>
            </footer>
        </div>
    );
}