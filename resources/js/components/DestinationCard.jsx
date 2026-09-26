export default function DestinationCard({
    image,
    title,
    category,
    location,
    rating = 4.8,
    reviewCount = 120,
    description,
    price,
    href = '#',
}) {
    return (
        <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            {/* Image Thumbnail */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
                <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold tracking-wider text-[#2D4D43] uppercase backdrop-blur-sm shadow-xs">
                    {category}
                </span>
            </div>

            {/* Content Body */}
            <div className="flex flex-1 flex-col p-5 sm:p-6">
                {/* Rating & Location */}
                <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-medium text-slate-700">
                        <svg
                            className="h-4 w-4 fill-amber-400 text-amber-400"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-semibold text-slate-800">{rating}</span>
                        <span className="text-slate-400">({reviewCount})</span>
                    </span>

                    <span className="flex items-center gap-1">
                        <svg
                            className="h-3.5 w-3.5 text-slate-400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                        {location}
                    </span>
                </div>

                {/* Title */}
                <h3 className="mt-2.5 text-lg font-bold text-slate-800 transition group-hover:text-[#4C83AD]">
                    {title}
                </h3>

                {/* Description */}
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
                    {description}
                </p>

                {/* Footer with Price & Link */}
                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                    <div>
                        <span className="block text-[11px] text-slate-400 uppercase tracking-wider">Mulai Dari</span>
                        <span className="text-sm font-bold text-[#2D4D43] sm:text-base">
                            {price}
                        </span>
                    </div>

                    <a
                        href={href}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-[#4C83AD] transition hover:text-[#3d6d93]"
                    >
                        Lebih Lanjut
                        <svg
                            className="h-4 w-4 transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
}
