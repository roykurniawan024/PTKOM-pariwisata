import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-slate-50 pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/" className="font-serif text-2xl tracking-tight">
                    <span className="font-semibold text-[#2D4D43]">Jelajah</span>{' '}
                    <span className="italic font-normal text-[#4C83AD]">Lampung</span>
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-8 shadow-xl shadow-slate-200/50 sm:max-w-md sm:rounded-2xl border border-slate-100">
                {children}
            </div>
        </div>
    );
}
