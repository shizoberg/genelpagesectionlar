const categories = [
  { name: "Paket & Tasarruf", tag: null, gradient: "from-amber/40 to-amber/20" },
  { name: "Multivitamin & Besin", tag: null, gradient: "from-amber/60 to-amber/30" },
  { name: "Hamilelik", tag: "Yeni", gradient: "from-amber/50 to-amber/25" },
  { name: "Rahatlama", tag: "Yeni", gradient: "from-amber/70 to-amber/35" },
];

export default function RitualCategories() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container">
        <h2 className="k5-reveal text-2xl md:text-4xl font-extrabold text-primary tracking-tight mb-8 md:mb-10">
          Rutinini Bul
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {categories.map((c, i) => (
            <a
              key={i}
              href="#"
              className="k5-reveal group block"
            >
              <div
                className={`relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br ${c.gradient}`}
              >
                {c.tag && (
                  <span className="absolute top-3 left-3 bg-white text-primary text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                    {c.tag}
                  </span>
                )}
                {/* Placeholder silüet */}
                <div className="absolute inset-0 flex items-end justify-center pb-6 opacity-30">
                  <div className="w-3/5 h-3/4 bg-white/40 rounded-t-full" />
                </div>
              </div>
              <h3 className="mt-3 md:mt-4 text-sm md:text-base font-bold text-primary group-hover:underline underline-offset-4">
                {c.name}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
