export default function TestimonialCard({
    quote,
    name,
    role,
    avatar,
    rating = 5,
    location,
}) {
    return (
        <div className="flex h-full flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                        <i
                            key={i}
                            className={`bx ${
                                i < rating ? 'bxs-star text-lg' : 'bx-star text-slate-200'
                            }`}
                        ></i>
                    ))}
                </div>

                {/* Quote Text */}
                <div className="relative">
<<<<<<< HEAD
                    <i className="bx bxs-quote-alt-left text-3xl text-yellow-100 absolute -top-3 -left-2 -z-0"></i>
=======
                    <i className="bx bxs-quote-alt-left text-3xl text-amber-100 absolute -top-3 -left-2 -z-0"></i>
>>>>>>> 68d7f453f425278cde84d736a18e0735a5cfa693
                    <p className="relative z-10 text-sm leading-relaxed text-slate-600 italic">
                        "{quote}"
                    </p>
                </div>
            </div>

            {/* Profile Info */}
            <div className="mt-8 flex items-center gap-3.5 border-t border-slate-100 pt-5">
                <img
                    src={avatar}
                    alt={name}
<<<<<<< HEAD
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-yellow-200"
=======
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-amber-100"
>>>>>>> 68d7f453f425278cde84d736a18e0735a5cfa693
                    loading="lazy"
                />
                <div>
                    <h4 className="text-sm font-bold text-slate-900">{name}</h4>
                    <p className="text-xs text-slate-500">
                        {role} {location ? <span className="text-slate-400">• {location}</span> : ''}
                    </p>
                </div>
            </div>
        </div>
    );
}
