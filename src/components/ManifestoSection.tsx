import { useEffect, useRef, useState } from "react";

export default function ManifestoSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when section bottom enters viewport, 1 when section top leaves
      const start = vh;
      const end = -rect.height;
      const p = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Floating + slight rotation as user scrolls
  const float = Math.sin(progress * Math.PI) * 14; // 0 → 14 → 0
  const rotate = -8 + progress * 16; // -8 → 8

  return (
    <section ref={ref} className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Visual — Sachet */}
          <div className="relative h-[320px] md:h-[440px] flex items-center justify-center order-2 md:order-1">
            {/* Soft glow */}
            <div className="absolute inset-0 rounded-full blur-3xl bg-primary/15" />

            {/* Sachet illustration */}
            <div
              className="relative w-44 h-60 md:w-56 md:h-72"
              style={{
                transform: `translateY(${-float}px) rotate(${rotate}deg)`,
                transition: "transform 0.1s linear",
              }}
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary via-primary-medium to-primary shadow-[0_30px_60px_-15px_hsl(var(--primary)/0.4)]" />
              {/* Top crimp */}
              <div className="absolute top-0 left-0 right-0 h-4 bg-primary-foreground/10 rounded-t-3xl" />
              <div className="absolute top-1.5 left-3 right-3 h-1 bg-primary-foreground/20 rounded-full" />
              {/* Brand */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-primary-foreground p-6">
                <p className="text-[10px] font-bold uppercase tracking-[2px] opacity-70">Balance</p>
                <p className="text-5xl md:text-6xl font-extrabold tracking-tight mt-1">.ki</p>
                <div className="mt-4 px-3 py-1 rounded-full bg-primary-foreground/15 text-[9px] font-semibold uppercase tracking-wider">
                  20g · 1 sachet
                </div>
              </div>
              {/* Floating "particles" */}
              {[...Array(6)].map((_, i) => {
                const angle = (i / 6) * Math.PI * 2;
                const r = 100 + Math.sin(progress * Math.PI * 2 + i) * 10;
                return (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-primary/60"
                    style={{
                      transform: `translate(calc(-50% + ${Math.cos(angle) * r}px), calc(-50% + ${Math.sin(angle) * r}px))`,
                      opacity: 0.3 + progress * 0.5,
                    }}
                  />
                );
              })}
            </div>

            {/* Shadow under sachet */}
            <div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 h-3 rounded-full bg-foreground/15 blur-md"
              style={{ transform: `translateX(-50%) scaleX(${1 - progress * 0.2})` }}
            />
          </div>

          {/* Text */}
          <div className="order-1 md:order-2">
            <p className="k5-reveal text-[12px] sm:text-[13px] font-bold uppercase tracking-[1.5px] text-primary mb-3">
              Bizim Yaklaşımımız
            </p>
            <h2 className="k5-reveal d1 text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight mb-5">
              Radikal fikrimiz: takviyeler{" "}
              <span className="italic font-semibold text-primary">gerçekten</span> işe yaramalı.
            </h2>
            <p className="k5-reveal d2 text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-md">
              Klinik dozajlı içerikler, eczacı onaylı formülasyon ve şeffaf kaynak takibi —
              .ki Balance her sachet'te aynı standartla üretilir.
            </p>
            <div className="k5-reveal d3 flex flex-wrap items-center gap-x-8 gap-y-3">
              <a
                href="#ingredients"
                className="text-sm md:text-base font-bold text-primary border-b-2 border-primary pb-1 hover:text-primary-medium hover:border-primary-medium transition-colors"
              >
                Standartlarımız
              </a>
              <a
                href="#how"
                className="text-sm md:text-base font-bold text-primary border-b-2 border-primary pb-1 hover:text-primary-medium hover:border-primary-medium transition-colors"
              >
                Klinik Dayanağımız
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
