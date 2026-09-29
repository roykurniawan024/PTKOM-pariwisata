import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { useEffect, useState } from 'react';

export default function DestinationDetailModal({ destination, priceLabel, onClose }) {
    // Keep the last destination rendered while the leave transition runs.
    const [displayed, setDisplayed] = useState(destination);

    useEffect(() => {
        if (destination) {
            setDisplayed(destination);
        }
    }, [destination]);

    const infoItems = displayed
        ? [
              { label: 'Durasi', value: displayed.duration },
              { label: 'Jam Buka', value: displayed.openingHours },
              { label: 'Tiket', value: priceLabel(displayed) },
          ]
        : [];

    const mapsUrl = displayed
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${displayed.name}, ${displayed.regency}, Lampung`)}`
        : '#';

    return (
        <Transition show={Boolean(destination)}>
            <Dialog as="div" className="relative z-[60]" onClose={onClose}>
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center sm:items-center sm:p-6">
                        <TransitionChild
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-8 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-8 sm:translate-y-0 sm:scale-95"
                        >
                            <DialogPanel className="relative w-full overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:max-w-2xl sm:rounded-3xl">
                                {displayed && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            aria-label="Tutup"
                                            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-slate-800 shadow-sm backdrop-blur transition hover:bg-white"
                                        >
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                <path d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>

                                        <img src={displayed.thumbnail} alt={displayed.name} className="h-52 w-full object-cover sm:h-64" />

                                        <div className="px-6 pb-6 pt-6 sm:px-8 sm:pb-8">
                                            <p className="font-mono text-[11px] uppercase tracking-widest text-[#4C83AD]">{displayed.tagline}</p>
                                            <DialogTitle className="mt-4 font-serif text-3xl font-semibold text-[#1E3A34] sm:text-4xl">
                                                {displayed.name}
                                            </DialogTitle>
                                            <p className="mt-1 font-mono text-[11px] text-slate-500">
                                                <span className="tracking-widest">★★★★★</span> {displayed.rating} (
                                                {displayed.reviewCount.toLocaleString('id-ID')} ulasan) · {displayed.regency}
                                            </p>

                                            <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-3">
                                                {infoItems.map((item) => (
                                                    <div
                                                        key={item.label}
                                                        className="flex flex-col items-center justify-center rounded-2xl bg-[#E4EEF7] px-2 py-3 text-center sm:rounded-full sm:py-4"
                                                    >
                                                        <span className="text-[10px] uppercase tracking-wider text-[#4C83AD] sm:text-xs">
                                                            {item.label}
                                                        </span>
                                                        <span className="mt-1 text-xs font-semibold text-slate-800 sm:text-sm">{item.value}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <section className="mt-8">
                                                <h3 className="font-serif text-xl font-semibold text-[#1E3A34]">Tentang Destinasi</h3>
                                                <p className="mt-2 text-sm leading-relaxed text-slate-600">{displayed.description}</p>
                                            </section>

                                            <section className="mt-8">
                                                <h3 className="font-serif text-xl font-semibold text-[#1E3A34]">Fasilitas</h3>
                                                <div className="mt-3 flex flex-wrap gap-2">
                                                    {displayed.facilities.map((facility) => (
                                                        <span
                                                            key={facility}
                                                            className="rounded-full bg-[#D6E6F3] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-slate-700"
                                                        >
                                                            {facility}
                                                        </span>
                                                    ))}
                                                </div>
                                            </section>

                                            <section className="mt-8">
                                                <h3 className="font-serif text-xl font-semibold text-[#1E3A34]">Tips Berkunjung</h3>
                                                <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
                                                    {displayed.tips.map((tip) => (
                                                        <li key={tip}>{tip}</li>
                                                    ))}
                                                </ol>
                                            </section>

                                            <div className="mt-8 flex flex-col gap-4 rounded-2xl bg-[#1E3A34] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                                                <div>
                                                    <p className="font-mono text-[10px] uppercase tracking-widest text-white/60">Lokasi</p>
                                                    <p className="mt-1 font-serif text-lg font-semibold text-white">{displayed.address}</p>
                                                </div>
                                                <a
                                                    href={mapsUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="shrink-0 rounded-full bg-[#5B8DBE] px-6 py-2.5 text-center text-sm font-medium text-white transition hover:bg-[#4A7BAA]"
                                                >
                                                    Buka Maps
                                                </a>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
