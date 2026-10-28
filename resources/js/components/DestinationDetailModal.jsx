import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Link } from '@inertiajs/react';
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
              { label: 'Jam Buka', value: displayed.openingHours || '08:00 - 17:00 WIB' },
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
                    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
                        <TransitionChild
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-8 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-8 sm:scale-95"
                        >
                            <DialogPanel className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-100">
                                {displayed && (
                                    <>
                                        {/* Header Image with Gradient */}
                                        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
                                            <img src={displayed.thumbnail} alt={displayed.name} className="h-full w-full object-cover" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                                            
                                            <button
                                                type="button"
                                                onClick={onClose}
                                                aria-label="Tutup"
                                                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/60 text-white backdrop-blur-md transition hover:bg-slate-900"
                                            >
                                                <i className="bx bx-x text-2xl"></i>
                                            </button>

                                            <div className="absolute bottom-6 left-6 right-6 text-white">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="px-3 py-1 rounded-full bg-amber-500 text-xs font-bold uppercase tracking-wider">
                                                        {displayed.category}
                                                    </span>
                                                    <span className="flex items-center gap-1 text-xs font-medium text-amber-400">
                                                        <i className="bx bxs-star"></i>
                                                        {displayed.rating} ({displayed.reviewCount ? displayed.reviewCount.toLocaleString('id-ID') : 0} Ulasan)
                                                    </span>
                                                </div>
                                                <DialogTitle className="text-2xl sm:text-4xl font-bold tracking-tight">
                                                    {displayed.name}
                                                </DialogTitle>
                                                <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1 mt-1">
                                                    <i className="bx bx-map-pin text-amber-400"></i>
                                                    {displayed.regency}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Body Content */}
                                        <div className="p-6 sm:p-8 space-y-8">
                                            {/* Quick Info Grid */}
                                            <div className="grid grid-cols-3 gap-3">
                                                {infoItems.map((item) => (
                                                    <div
                                                        key={item.label}
                                                        className="flex flex-col items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 p-4 text-center"
                                                    >
                                                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                                                            {item.label}
                                                        </span>
                                                        <span className="mt-1 text-xs sm:text-sm font-bold text-slate-900">{item.value}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Description */}
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-900 mb-2">Deskripsi</h3>
                                                <p className="text-sm leading-relaxed text-slate-600">{displayed.description}</p>
                                            </div>

                                            {/* Facilities */}
                                            {displayed.facilities && displayed.facilities.length > 0 && (
                                                <div>
                                                    <h3 className="text-lg font-bold text-slate-900 mb-3">Fasilitas Utama</h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {displayed.facilities.map((facility) => (
                                                            <span
                                                                key={facility}
                                                                className="inline-flex items-center gap-1.5 rounded-xl bg-amber-50 px-3.5 py-2 text-xs font-semibold text-amber-600 border border-amber-100"
                                                            >
                                                                <i className="bx bx-check-circle text-base"></i>
                                                                {facility}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Action Buttons */}
                                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
                                                <a
                                                    href={mapsUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-6 py-3.5 text-xs font-bold text-slate-700 hover:bg-slate-200 transition"
                                                >
                                                    <i className="bx bx-map-alt text-lg"></i>
                                                    Petunjuk Arah (Maps)
                                                </a>

                                                <Link
                                                    href={route('destinations.show', displayed.slug)}
                                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-500 px-8 py-3.5 text-xs font-bold text-white shadow-lg shadow-amber-500/20 hover:bg-amber-600 transition"
                                                >
                                                    <span>Lihat Halaman Full Detail</span>
                                                    <i className="bx bx-right-arrow-alt text-lg"></i>
                                                </Link>
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
