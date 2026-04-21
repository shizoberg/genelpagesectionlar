import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { id: 1, label: "Ürün - Ön" },
  { id: 2, label: "Kullanım" },
  { id: 3, label: "İçerik" },
  { id: 4, label: "Detay" },
];

export default function ProductGallery() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + slides.length) % slides.length);
  const next = () => setActive((a) => (a + 1) % slides.length);

  return (
    <div className="space-y-3">
      <div className="relative rounded-3xl overflow-hidden aspect-square bg-secondary">
        <div className="absolute inset-0 bg-primary flex items-center justify-center">
          <div className="relative">
            <div className="w-40 h-52 bg-primary-foreground/15 backdrop-blur-sm rounded-2xl border border-primary-foreground/20 flex flex-col items-center justify-center p-4 shadow-2xl">
              <p className="text-primary-foreground font-extrabold text-3xl tracking-tight">.ki</p>
              <p className="text-primary-foreground/80 text-xs text-center mt-1 leading-tight">
                Balance Your Cycle
              </p>
              <div className="mt-3 space-y-0.5">
                <p className="text-primary-foreground/60 text-[10px] text-center">Dong Quai · Magnesium</p>
                <p className="text-primary-foreground/60 text-[10px] text-center">Vitex Agnus Castus</p>
              </div>
              <div className="mt-3 bg-primary-foreground/20 rounded-lg px-3 py-1">
                <p className="text-primary-foreground text-[10px] font-semibold">x10 Sachet · 20g</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={prev}
          aria-label="Önceki"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-card/90 rounded-full flex items-center justify-center shadow-md hover:bg-card transition-colors"
        >
          <ChevronLeft size={18} className="text-primary" />
        </button>
        <button
          onClick={next}
          aria-label="Sonraki"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-card/90 rounded-full flex items-center justify-center shadow-md hover:bg-card transition-colors"
        >
          <ChevronRight size={18} className="text-primary" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Slayt ${i + 1}`}
              className={`rounded-full transition-all duration-200 ${
                i === active ? "w-6 h-2 bg-primary-foreground" : "w-2 h-2 bg-primary-foreground/50"
              }`}
            />
          ))}
        </div>
      </div>

    </div>
  );
}
