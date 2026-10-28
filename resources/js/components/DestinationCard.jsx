export default function DestinationCard({
    image,
    title,
    category,
    location,
    rating = 4.8,
    reviewCount = 120,
    description,
    price,
    slug,
    href,
}) {
    const destinationUrl = slug ? route('destinations.show', slug) : (href || '/destinations');

    return (
        <article className="group relative flex flex-col rounded-2xl bg-white border border-slate-200/80 p-3.5 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
                <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-slate-900/80 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white border border-white/10">
                    <i className="bx bx-category-alt text-blue-400"></i>
                    {category}
                </span>
            </div>

            <div className="p-2 flex-1 flex flex-col justify-between">
                <div>
                    <div className="mt-3 flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1 text-slate-500">
                            <i className="bx bx-map-pin text-amber-500 text-sm"></i>
                            {location}
                        </span>
                        <span className="flex items-center gap-1 font-semibold text-amber-500">
                            <i className="bx bxs-star text-sm"></i>
                            {rating}
                            <span className="font-normal text-slate-400">({reviewCount})</span>
                        </span>
                    </div>

                    <h3 className="mt-2 text-lg font-bold tracking-tight text-slate-900 group-hover:text-amber-500 transition-colors">
                        <a href={destinationUrl} className="outline-none">
                            {title}
                        </a>
                    </h3>

                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-500">
                        {description}
                    </p>
                </div>

                <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
                    <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">Harga Tiket</span>
                        <span className="text-sm font-bold text-amber-500">{price}</span>
                    </div>
                    <a
                        href={destinationUrl}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-amber-500 transition-colors"
                    >
                        <span>Detail</span>
                        <i className="bx bx-right-arrow-alt text-base group-hover:translate-x-1 transition-transform"></i>
                    </a>
                </div>
            </div>
        </article>
    );
}