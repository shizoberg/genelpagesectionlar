import { Moon, Heart, Zap, Sparkles } from "lucide-react";

const categories = [
  {
    label: "Döngü Dengesi",
    desc: "PMS · adet düzeni",
    Icon: Moon,
    bg: "bg-primary/10",
    iconColor: "text-primary",
    badge: null as string | null,
  },
  {
    label: "Hormon Desteği",
    desc: "Hayıt · B vitaminleri",
    Icon: Heart,
    bg: "bg-rose/10",
    iconColor: "text-rose",
    badge: "Popüler",
  },
  {
    label: "Enerji & Uyku",
    desc: "Magnezyum · rahatlama",
    Icon: Zap,
    bg: "bg-amber/10",
    iconColor: "text-amber",
    badge: null,
  },
  {
    label: "Cilt & Kalite",
    desc: "Çinko · antioksidan",
    Icon: Sparkles,
    bg: "bg-sage/10",
    iconColor: "text-sage",
    badge: "Yeni",
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container">
        <div className="flex items-end justify-between mb-8 md:mb-10">
          <div>
            <p className="k5-reveal text-[12px] sm:text-[13px] font-bold uppercase tracking-[1.5px] text-primary mb-2">
              Kategoriler
            </p>
            <h2 className="k5-reveal d1 text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
              Ritüelini bul
            </h2>
          </div>
          <a
            href="#pricing"
            className="hidden sm:inline-block text-sm font-bold text-primary border-b-2 border-primary pb-0.5 hover:text-primary-medium transition-colors"
          >
            Tümünü gör
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {categories.map((c, i) => (
            <a
              key={i}
              href="#pricing"
              className="k5-reveal group relative block rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/40 hover:shadow-[var(--shadow-md)] transition-all duration-300"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* Visual area */}
              <div className={`relative ${c.bg} aspect-square flex items-center justify-center overflow-hidden`}>
                {c.badge && (
                  <span className="absolute top-3 left-3 z-10 bg-card text-primary text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full shadow-sm">
                    {c.badge}
                  </span>
                )}
                <c.Icon
                  className={`w-16 h-16 md:w-20 md:h-20 ${c.iconColor} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}
                  strokeWidth={1.4}
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
              </div>

              {/* Caption */}
              <div className="p-4 md:p-5">
                <h3 className="text-sm md:text-base font-extrabold text-foreground tracking-tight mb-1">
                  {c.label}
                </h3>
                <p className="text-xs md:text-[13px] text-muted-foreground">{c.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
