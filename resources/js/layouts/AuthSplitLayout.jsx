import { Link } from '@inertiajs/react';

export default function AuthSplitLayout({ heading, description, cardClassName = 'bg-white', children }) {
    return (
        <div className="min-h-screen bg-[#C9DEEE] font-sans text-slate-800 antialiased">
            <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8 sm:px-8 lg:px-12">
                <Link href="/" className="self-start font-serif text-2xl tracking-tight">
                    <span className="font-semibold text-[#4C83AD]">Jelajah</span> <span className="font-normal italic text-[#1E3A34]">Lampung</span>
                </Link>

                <div className="flex flex-1 flex-col justify-center gap-8 py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
                    <div className="lg:max-w-md">
                        <h1 className="font-serif text-4xl font-semibold leading-tight text-[#1E3A34] sm:text-5xl">{heading}</h1>
                        <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-700 sm:text-base lg:mt-16">{description}</p>
                    </div>

                    <div className={`w-full rounded-3xl px-6 py-8 shadow-sm sm:px-8 lg:max-w-md ${cardClassName}`}>{children}</div>
                </div>
            </div>
        </div>
    );
}
