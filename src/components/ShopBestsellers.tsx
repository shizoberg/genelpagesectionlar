const products = [
  { name: "Synbiotic+", category: "Gut Health", price: "₺540" },
  { name: "HyaCera™", category: "Wrinkle Support", price: "₺540" },
  { name: "Omega-3 DHA & EPA", category: "Brain & Heart Health", price: "₺330" },
  { name: ".ki Balance", category: "Cycle Support", price: "₺350" },
];

const ShopBestsellers = () => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container">
        <div className="flex items-end justify-between mb-8 md:mb-10">
          <h2 className="k5-reveal text-2xl md:text-4xl font-extrabold text-primary tracking-tight">
            Çok Satanlar
          </h2>
          <a
            href="#"
            className="k5-reveal text-sm font-semibold text-primary underline underline-offset-4 hover:opacity-70 transition-opacity"
          >
            Tümünü Gör
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {products.map((p, i) => (
            <div key={i} className="k5-reveal group">
              <div className="relative aspect-square bg-secondary rounded-2xl overflow-hidden flex items-center justify-center">
                {/* Placeholder kapsül */}
                <div className="w-12 md:w-16 h-32 md:h-44 bg-white/60 rounded-full shadow-inner border border-white" />
                <button
                  aria-label={`${p.name} sepete ekle`}
                  className="absolute bottom-3 left-3 bg-white text-primary text-xs md:text-sm font-bold px-4 py-2 rounded-full shadow-sm hover:bg-primary hover:text-white transition-colors"
                >
                  Ekle
                </button>
              </div>
              <div className="mt-3 md:mt-4 space-y-0.5">
                <h3 className="text-sm md:text-base font-bold text-primary">{p.name}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">{p.category}</p>
                <p className="text-sm md:text-base font-semibold text-primary pt-1">{p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopBestsellers;
