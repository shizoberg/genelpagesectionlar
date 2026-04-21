import { useEffect, useRef, useState } from "react";

function useAnimatedCounter(target: number, duration = 2000) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - t, 3);
            setValue(Math.floor(target * ease));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { value, ref };
}

export default function HeroSection() {
  const counter = useAnimatedCounter(2400, 2000);

  return (
    <section className="relative min-h-[520px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a0f40] via-primary to-primary-medium">
      <div
        className="absolute inset-0 opacity-[0.12] mix-blend-luminosity bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200')",
        }}
      />
      <div className="relative z-[2] text-center px-5 py-16 max-w-[680px]">
        <h1 className="k5-reveal text-2xl md:text-3xl font-extrabold text-primary-foreground mb-1 tracking-tight">
          .ki Balance
        </h1>
        <p className="k5-reveal d1 text-sm md:text-base font-medium text-primary-foreground/70 mb-6 tracking-wide">
          Döngü Dönemi Desteği
        </p>
        <div className="k5-reveal d2" ref={counter.ref}>
          <span className="text-[72px] font-extrabold leading-none tracking-[-2px] bg-gradient-to-br from-primary-foreground to-primary-foreground/70 bg-clip-text text-transparent">
            {counter.value.toLocaleString("tr-TR")}
          </span>
          <span className="text-[72px] font-extrabold leading-none text-primary-foreground">+</span>
        </div>
        <div className="k5-reveal d1 text-base font-medium text-primary-foreground/75 mb-5 tracking-wide">
          kadın tarafından tercih ediliyor
        </div>

        <div className="k5-reveal d2 text-xl text-star tracking-[3px] mb-1.5">★★★★★</div>
        <div className="k5-reveal d2 text-sm text-primary-foreground/65 font-medium mb-6">
          5.0 ortalama puan
        </div>

        <div className="k5-reveal d2 grid grid-cols-3 gap-3 sm:gap-4 max-w-[420px] mx-auto mb-7">
          {[
            { label: "Şişkinlik", icon: "💧" },
            { label: "Kas/sinir gerilimleri", icon: "⚡" },
            { label: "Ruh hali dalgalanmaları", icon: "🌙" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center text-center gap-2">
              <div className="w-11 h-11 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 flex items-center justify-center text-primary-foreground text-lg">
                {item.icon}
              </div>
              <span className="text-[11px] leading-tight font-medium text-primary-foreground/85">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <p className="k5-reveal d3 text-[15px] sm:text-base text-primary-foreground/[0.88] leading-relaxed mb-7 max-w-[460px] mx-auto">
          PMS döneminde yaşadığın <strong className="font-semibold">şişkinlik</strong>, <strong className="font-semibold">kas/sinir gerilimleri</strong> ve <strong className="font-semibold">ruh hali dalgalanmalarını</strong> desteklemek için geliştirildi.
        </p>

        <a
          href="#pricing"
          className="k5-reveal d4 inline-flex items-center gap-2 bg-primary-foreground text-primary text-[15px] font-bold py-3.5 px-9 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
        >
          Hemen incele
          <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
