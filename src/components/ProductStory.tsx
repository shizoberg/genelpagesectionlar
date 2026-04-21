import { useEffect, useRef, useState } from "react";
import { Leaf, FlaskConical, Droplets, Sparkles } from "lucide-react";

const stages = [
  {
    eyebrow: "01 · Sachet",
    title: "Günde 1 sachet, 20g formül",
    body: "Pratik tek seferlik sachet. Çantanda taşı, ofiste, evde, yolda — 30 saniyede hazır.",
    Icon: Leaf,
  },
  {
    eyebrow: "02 · İçerik",
    title: "13+ aktif içerik, klinik dozaj",
    body: "Magnezyum Bisglisinat, Hayıt (Vitex), B6 ve B12 başta olmak üzere döngüsel dengeyi destekleyen formül.",
    Icon: FlaskConical,
  },
  {
    eyebrow: "03 · Karış",
    title: "Bir bardak suda çöz",
    body: "Hafif meyveli aroma. Kapsül yutmak yok, tat berrak ve içimi kolay — sabah rutinine sığar.",
    Icon: Droplets,
  },
  {
    eyebrow: "04 · Hisset",
    title: "Döngünde dengeyi hisset",
    body: "Çoğu kullanıcı 2–4 hafta içinde fark ediyor. Tam etki için 2–3 aylık düzenli kullanım önerilir.",
    Icon: Sparkles,
  },
];

export default function ProductStory() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0); // 0..1 across the whole section

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // total scroll distance = section height - viewport
      const total = el.offsetHeight - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      setProgress(p);
      const idx = Math.min(stages.length - 1, Math.floor(p * stages.length));
      setActive(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-secondary/40"
      style={{ height: `${stages.length * 100}vh` }}
      aria-label="Ürün hikayesi"
    >
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <div className="container">
          <div className="text-center mb-6 sm:mb-10">
            <p className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[1.5px] text-primary mb-1.5">
              Yakından Bak
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
              Sachet'ten döngüne, adım adım
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center max-w-5xl mx-auto">
            {/* Visual */}
            <div className="relative h-[260px] sm:h-[340px] md:h-[420px] flex items-center justify-center order-1 md:order-none">
              <Visual active={active} progress={progress} />
            </div>

            {/* Text stages */}
            <div className="relative h-[200px] sm:h-[240px] md:h-[280px]">
              {stages.map((s, i) => {
                const isActive = i === active;
                return (
                  <div
                    key={i}
                    className={`absolute inset-0 transition-all duration-500 ease-out ${
                      isActive
                        ? "opacity-100 translate-y-0"
                        : i < active
                          ? "opacity-0 -translate-y-4 pointer-events-none"
                          : "opacity-0 translate-y-4 pointer-events-none"
                    }`}
                  >
                    <div className="flex items-center gap-2 text-primary text-[11px] sm:text-xs font-bold uppercase tracking-[1.5px] mb-3">
                      <s.Icon className="w-4 h-4" strokeWidth={2.2} />
                      {s.eyebrow}
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-foreground leading-tight tracking-tight mb-3">
                      {s.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md">
                      {s.body}
                    </p>
                  </div>
                );
              })}

              {/* Progress dots */}
              <div className="absolute -bottom-2 left-0 flex gap-1.5">
                {stages.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === active ? "w-8 bg-primary" : "w-3 bg-primary/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Visual({ active, progress }: { active: number; progress: number }) {
  // Scene-local progress 0..1 inside each stage
  const stageCount = 4;
  const local = Math.min(1, Math.max(0, progress * stageCount - active));

  return (
    <div className="relative w-[220px] h-[260px] sm:w-[280px] sm:h-[320px] md:w-[320px] md:h-[380px]">
      {/* Soft glow */}
      <div
        className="absolute inset-0 rounded-full blur-3xl bg-primary/20"
        style={{ opacity: 0.4 + local * 0.2 }}
      />

      {/* Stage 0: Sachet */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-all duration-700"
        style={{
          opacity: active === 0 ? 1 : 0,
          transform: `scale(${active === 0 ? 1 : 0.85}) translateY(${active === 0 ? 0 : -20}px)`,
        }}
      >
        <div className="w-32 h-44 sm:w-40 sm:h-56 bg-gradient-to-br from-primary to-primary-medium rounded-2xl shadow-2xl flex flex-col items-center justify-center text-primary-foreground p-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-3 bg-primary-foreground/15" />
          <p className="font-extrabold text-2xl sm:text-3xl tracking-tight">.ki</p>
          <p className="text-[10px] sm:text-xs opacity-80 mt-1">Balance</p>
          <div className="mt-4 text-[9px] sm:text-[10px] opacity-60">20g · 1 sachet</div>
        </div>
      </div>

      {/* Stage 1: Ingredients exploding out */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-all duration-700"
        style={{ opacity: active === 1 ? 1 : 0 }}
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-32 sm:w-28 sm:h-40 bg-gradient-to-br from-primary/80 to-primary-medium/80 rounded-2xl" />
          </div>
          {[
            { label: "Mg", x: -90, y: -60, color: "bg-primary" },
            { label: "Vitex", x: 90, y: -50, color: "bg-rose" },
            { label: "B6", x: -100, y: 40, color: "bg-amber" },
            { label: "B12", x: 95, y: 60, color: "bg-sage" },
            { label: "Zn", x: 0, y: -100, color: "bg-primary-medium" },
          ].map((p, i) => (
            <div
              key={i}
              className={`absolute top-1/2 left-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full ${p.color} text-primary-foreground text-[10px] sm:text-xs font-bold flex items-center justify-center shadow-lg transition-all duration-700`}
              style={{
                transform: `translate(calc(-50% + ${p.x * (active === 1 ? 1 : 0)}px), calc(-50% + ${p.y * (active === 1 ? 1 : 0)}px)) scale(${active === 1 ? 1 : 0.3})`,
                opacity: active === 1 ? 1 : 0,
                transitionDelay: `${i * 60}ms`,
              }}
            >
              {p.label}
            </div>
          ))}
        </div>
      </div>

      {/* Stage 2: Mix into water */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-all duration-700"
        style={{ opacity: active === 2 ? 1 : 0 }}
      >
        <div className="relative">
          <div className="w-32 h-44 sm:w-40 sm:h-52 rounded-b-[40px] rounded-t-2xl border-4 border-primary/30 bg-gradient-to-b from-primary/5 to-primary/30 overflow-hidden relative">
            <div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-primary/40 to-primary/70 transition-all duration-1000"
              style={{ height: `${50 + local * 40}%` }}
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-primary-foreground/30 rounded-full animate-pulse" />
            </div>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-primary-foreground/50"
                style={{
                  left: `${15 + i * 12}%`,
                  bottom: `${20 + (i % 3) * 15}%`,
                  animation: `float 2s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </div>
          <p className="text-center text-xs text-primary font-bold mt-2">30 saniyede çözünür</p>
        </div>
      </div>

      {/* Stage 3: Balance / sparkle */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-all duration-700"
        style={{ opacity: active === 3 ? 1 : 0 }}
      >
        <div className="relative">
          <div
            className="w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-gradient-to-br from-primary via-primary-medium to-rose flex items-center justify-center shadow-2xl"
            style={{
              transform: `scale(${active === 3 ? 1 : 0.7}) rotate(${local * 360}deg)`,
              transition: "transform 1s ease-out",
            }}
          >
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-card flex items-center justify-center">
              <Sparkles className="w-12 h-12 sm:w-14 sm:h-14 text-primary" strokeWidth={1.5} />
            </div>
          </div>
          {[...Array(8)].map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const r = 110;
            return (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-primary"
                style={{
                  transform: `translate(calc(-50% + ${Math.cos(angle) * r}px), calc(-50% + ${Math.sin(angle) * r}px)) scale(${active === 3 ? 1 : 0})`,
                  opacity: active === 3 ? 0.6 : 0,
                  transition: `all 0.6s ease-out ${i * 50}ms`,
                }}
              />
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-8px); opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}
