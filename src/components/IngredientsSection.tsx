import { Leaf, FlaskConical, Pill, Microscope, Sprout, Cog, Award, ShieldCheck, Beaker, Calendar } from "lucide-react";

const ingredients = [
  {
    Icon: Leaf,
    color: "sage",
    name: "Vitex (Hayıt)",
    description: "Hormonal denge için bitkisel destek.",
  },
  {
    Icon: FlaskConical,
    color: "primary",
    name: "Magnezyum Bisglisinat",
    description: "Gerginlik ve yorgunluk hissini destekler.",
  },
  {
    Icon: Pill,
    color: "rose",
    name: "B6 Vitamini",
    description: "Sinir sistemi ve ruh hali desteği.",
  },
  {
    Icon: Microscope,
    color: "amber",
    name: "Çinko",
    description: "Cilt ve bağışıklık desteği.",
  },
  {
    Icon: Sprout,
    color: "sage",
    name: "Zencefil",
    description: "Şişkinlik ve mide rahatsızlığını azaltır.",
  },
  {
    Icon: Cog,
    color: "primary",
    name: "Demir",
    description: "Yorgunluğun azalmasına katkı sağlar.",
  },
];

const colorMap: Record<string, { bg: string; ring: string; text: string }> = {
  sage: { bg: "bg-sage-light", ring: "ring-sage/20", text: "text-sage" },
  primary: { bg: "bg-secondary", ring: "ring-primary/20", text: "text-primary" },
  rose: { bg: "bg-rose-light", ring: "ring-rose/20", text: "text-rose" },
  amber: { bg: "bg-amber-light", ring: "ring-amber/20", text: "text-amber" },
};

const badges = [
  { Icon: Award, label: "GMP sertifikalı" },
  { Icon: Sprout, label: "Vegan formül" },
  { Icon: Beaker, label: "Klinik dozaj" },
  { Icon: Calendar, label: "30 günlük kullanım" },
  { Icon: ShieldCheck, label: "FDA standartlarında" },
];

export default function IngredientsSection() {
  return (
    <section className="py-12 sm:py-14 bg-background">
      <div className="container">
        <div className="text-center sm:text-left mb-6 sm:mb-8">
          <p className="k5-reveal text-[12px] sm:text-[13px] font-bold uppercase tracking-[1.5px] text-primary mb-1.5">
            Formül
          </p>
          <div className="k5-reveal d1 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground leading-tight tracking-tight">
              İçindekiler
            </h2>
            <p className="text-muted-foreground text-[13px] sm:text-sm sm:max-w-xs">
              Uzman eczacı ekibimiz tarafından klinik dozajda formüle edildi.
            </p>
          </div>
        </div>

        {/* Mobile: 2 columns, kompakt */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3.5 mb-6">
          {ingredients.map((ing, i) => {
            const c = colorMap[ing.color];
            return (
              <div
                key={ing.name}
                className={`k5-reveal d${(i % 3) + 1} bg-card border border-border rounded-2xl p-3 sm:p-4 hover:shadow-md transition-shadow`}
              >
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${c.bg} ring-1 ${c.ring} flex items-center justify-center mb-2`}
                >
                  <ing.Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${c.text}`} strokeWidth={2.2} />
                </div>
                <h3 className="font-bold text-foreground text-[13px] sm:text-sm mb-0.5 leading-tight">
                  {ing.name}
                </h3>
                <p className="text-[11px] sm:text-[12px] text-muted-foreground leading-snug">
                  {ing.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="k5-reveal d2 flex flex-wrap gap-2 justify-center">
          {badges.map((b) => (
            <div
              key={b.label}
              className="flex items-center gap-1.5 bg-secondary/70 border border-primary/15 rounded-full px-3 py-1.5 text-[11px] sm:text-[12px] font-semibold text-primary"
            >
              <b.Icon className="w-3.5 h-3.5" strokeWidth={2.2} />
              {b.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
