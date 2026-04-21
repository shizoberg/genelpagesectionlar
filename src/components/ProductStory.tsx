import { useEffect, useRef, useState } from "react";
import { Leaf, FlaskConical, Droplets, Sparkles } from "lucide-react";
import ingGinger from "@/assets/ingredient-ginger.png";
import ingVitex from "@/assets/ingredient-vitex.png";
import ingDongQuai from "@/assets/ingredient-dongquai.png";
import ingMagnesium from "@/assets/ingredient-magnesium.png";
import ingBlackberry from "@/assets/ingredient-blackberry.png";

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
      className="relative bg-white"
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

      {/* Stage 0: Sachet — gerçek paket görünümü + etrafında mor toz orbiti */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-all duration-700"
        style={{
          opacity: active === 0 ? 1 : 0,
          transform: `scale(${active === 0 ? 1 : 0.85}) translateY(${active === 0 ? 0 : -20}px)`,
        }}
      >
        <div className="relative">
          <PowderOrbit active={active === 0} />
          <SachetPack rotate={-8} />
        </div>
      </div>

      {/* Stage 1: Sachet'ten bitkiler/içerikler süzülüyor */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-all duration-700"
        style={{ opacity: active === 1 ? 1 : 0 }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Hafifçe yana yatmış sachet */}
          <div
            className="relative z-10 transition-transform duration-700"
            style={{
              transform: active === 1 ? "rotate(-14deg) translateY(-10px)" : "rotate(-8deg)",
            }}
          >
            <SachetPack small />
          </div>

          {/* İçinden çıkan bitkiler — sachet'in ağzından aşağı doğru süzülür */}
          {[
            { src: ingGinger, label: "Zencefil", x: -110, y: 30, size: 64, delay: 0, rot: -18 },
            { src: ingMagnesium, label: "Magnezyum", x: -60, y: 90, size: 56, delay: 120, rot: 12 },
            { src: ingVitex, label: "Hayıt", x: 70, y: 70, size: 70, delay: 240, rot: -8 },
            { src: ingDongQuai, label: "Çin Melek Otu", x: 120, y: 0, size: 66, delay: 360, rot: 20 },
            { src: ingBlackberry, label: "Böğürtlen", x: 20, y: 120, size: 50, delay: 480, rot: -22 },
          ].map((p, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 transition-all duration-[900ms] ease-out"
              style={{
                width: p.size,
                height: p.size,
                transform: `translate(calc(-50% + ${p.x * (active === 1 ? 1 : 0)}px), calc(-50% + ${(active === 1 ? p.y : -40)}px)) scale(${active === 1 ? 1 : 0.4}) rotate(${active === 1 ? p.rot : 0}deg)`,
                opacity: active === 1 ? 1 : 0,
                transitionDelay: `${p.delay}ms`,
                filter: "drop-shadow(0 8px 14px rgba(0,0,0,0.18))",
              }}
            >
              <img
                src={p.src}
                alt={p.label}
                width={128}
                height={128}
                loading="lazy"
                className="w-full h-full object-contain"
              />
              <span className="absolute left-1/2 -bottom-5 -translate-x-1/2 whitespace-nowrap text-[9px] sm:text-[10px] font-bold uppercase tracking-wide text-foreground/70 bg-card/80 backdrop-blur-sm px-1.5 py-0.5 rounded">
                {p.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stage 2: Shaker matarasında çalkalanarak çözünme */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-all duration-700"
        style={{ opacity: active === 2 ? 1 : 0 }}
      >
        <div className="relative flex flex-col items-center">
          <div
            className="relative"
            style={{
              animation: active === 2 ? "shake 0.55s ease-in-out infinite" : "none",
              transformOrigin: "50% 60%",
            }}
          >
            {/* Mataranın kapağı */}
            <div className="mx-auto w-20 sm:w-24 h-4 sm:h-5 rounded-t-md bg-gradient-to-b from-[hsl(255_30%_25%)] to-[hsl(258_45%_18%)] shadow-md relative z-10">
              <div className="absolute inset-x-2 top-1 h-0.5 bg-white/15 rounded-full" />
            </div>
            {/* Boyun */}
            <div className="mx-auto w-16 sm:w-20 h-2 bg-gradient-to-b from-[hsl(258_40%_22%)] to-[hsl(258_30%_30%)]" />
            {/* Mataranın gövdesi */}
            <div className="relative w-32 sm:w-40 h-44 sm:h-52 rounded-b-[28px] rounded-t-xl border-[3px] border-primary/35 bg-gradient-to-b from-primary/5 via-primary/15 to-primary/30 overflow-hidden shadow-2xl">
              {/* Sıvı seviyesi */}
              <div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-primary/45 via-primary/65 to-primary/85 transition-all duration-700"
                style={{ height: `${55 + local * 35}%` }}
              >
                {/* Sıvı yüzeyi dalgası */}
                <div
                  className="absolute -top-1 left-0 right-0 h-2 bg-primary-foreground/40 rounded-[50%]"
                  style={{ animation: "wave 0.8s ease-in-out infinite alternate" }}
                />
              </div>
              {/* Çalkalanan kabarcıklar */}
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-primary-foreground/60"
                  style={{
                    width: `${4 + (i % 3) * 2}px`,
                    height: `${4 + (i % 3) * 2}px`,
                    left: `${10 + (i * 8) % 80}%`,
                    bottom: `${10 + (i * 13) % 60}%`,
                    animation: `bubble ${1 + (i % 4) * 0.3}s ease-in ${i * 0.15}s infinite`,
                  }}
                />
              ))}
              {/* Çözünen toz parçacıkları */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={`p-${i}`}
                  className="absolute w-1 h-1 rounded-full bg-rose/70"
                  style={{
                    left: `${20 + (i * 9) % 60}%`,
                    top: `${15 + (i * 11) % 50}%`,
                    animation: `swirl ${2 + (i % 3) * 0.4}s linear ${i * 0.1}s infinite`,
                    opacity: Math.max(0, 0.9 - local * 0.7),
                  }}
                />
              ))}
              {/* Cam yansıması */}
              <div className="absolute inset-y-0 left-1 w-2 bg-gradient-to-r from-white/30 to-transparent rounded-full" />
            </div>
          </div>
          <p className="text-center text-xs text-primary font-bold mt-3">30 saniyede çözünür</p>
          <p className="text-center text-[10px] text-muted-foreground mt-0.5">Çalkala · Karıştır · İç</p>
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
        @keyframes shake {
          0%, 100% { transform: rotate(-4deg) translateY(0); }
          25% { transform: rotate(5deg) translateY(-3px); }
          50% { transform: rotate(-3deg) translateY(2px); }
          75% { transform: rotate(4deg) translateY(-2px); }
        }
        @keyframes wave {
          0% { transform: translateX(-4px) scaleY(1); }
          100% { transform: translateX(4px) scaleY(1.4); }
        }
        @keyframes bubble {
          0% { transform: translateY(0) scale(0.6); opacity: 0; }
          30% { opacity: 0.9; }
          100% { transform: translateY(-60px) scale(1.1); opacity: 0; }
        }
        @keyframes swirl {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0.9; }
          50% { transform: translate(8px, 12px) rotate(180deg); opacity: 0.6; }
          100% { transform: translate(0, 24px) rotate(360deg); opacity: 0; }
        }
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(var(--r)) rotate(0deg); }
          to { transform: rotate(360deg) translateX(var(--r)) rotate(-360deg); }
        }
      `}</style>
    </div>
  );
}

function SachetPack({ small = false, rotate = 0 }: { small?: boolean; rotate?: number }) {
  // Daha ince-uzun oranlar (~ 1:1.9)
  const w = small ? "w-20 sm:w-24" : "w-24 sm:w-28";
  const h = small ? "h-40 sm:h-48" : "h-48 sm:h-56";
  return (
    <div
      className={`relative ${w} ${h}`}
      style={{ transform: `rotate(${rotate}deg)`, filter: "drop-shadow(0 18px 30px rgba(60,40,120,0.35))" }}
    >
      <div className="absolute inset-0 rounded-[14px] bg-gradient-to-br from-[hsl(255_45%_38%)] via-[hsl(258_55%_30%)] to-[hsl(252_50%_22%)] overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-[14%] bg-gradient-to-r from-white/10 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-[14%] bg-gradient-to-l from-white/10 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-2 bg-[hsl(255_30%_18%)]/70" />
        <div className="absolute top-2 left-0 right-0 h-[3px] bg-white/20" />
        <div className="absolute top-[14%] left-0 right-0 flex items-center justify-center gap-1.5">
          <div className="h-px w-3 bg-white/40" />
          <span className="text-[7px] sm:text-[8px] uppercase tracking-[1.5px] text-white/70 italic">
            bye cramps
          </span>
          <div className="h-px w-3 bg-white/40" />
        </div>
        <div className="absolute top-[26%] left-0 right-0 text-center">
          <span className="text-white font-extrabold text-2xl sm:text-3xl tracking-tight">
            .ki<span className="text-[8px] align-top opacity-70">®</span>
          </span>
        </div>
        <div className="absolute top-[48%] left-0 right-0 px-2 text-center text-white/90">
          <p className="text-[7px] sm:text-[8px] leading-tight font-semibold">Dong Quai</p>
          <p className="text-[7px] sm:text-[8px] leading-tight font-semibold">Magnesium</p>
          <p className="text-[7px] sm:text-[8px] leading-tight font-semibold">Vitex Agnus Castus</p>
          <div className="mt-1 mx-auto w-2/3 h-px bg-white/30" />
          <p className="mt-1 text-[6px] sm:text-[7px] uppercase tracking-wider text-white/60">
            Food Supplement
          </p>
        </div>
        <div className="absolute bottom-[16%] left-0 right-0 text-center text-white/70">
          <p className="text-[7px] sm:text-[8px] italic">Blackberry Flavour</p>
          <p className="text-[6px] sm:text-[7px] opacity-80">Böğürtlen Aromalı</p>
        </div>
        <div className="absolute bottom-1.5 right-2 text-[6px] sm:text-[7px] text-white/60">
          Net: 2g
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

function PowderOrbit({ active }: { active: boolean }) {
  const particles = [
    { r: 90, size: 6, dur: 8, delay: 0, color: "bg-primary/70" },
    { r: 110, size: 4, dur: 11, delay: 0.4, color: "bg-primary-medium/80" },
    { r: 95, size: 5, dur: 9, delay: 0.8, color: "bg-rose/60" },
    { r: 120, size: 3, dur: 13, delay: 1.2, color: "bg-primary/60" },
    { r: 85, size: 7, dur: 10, delay: 1.6, color: "bg-primary-medium/70" },
    { r: 105, size: 4, dur: 12, delay: 2.0, color: "bg-rose/50" },
    { r: 100, size: 5, dur: 9.5, delay: 0.2, color: "bg-primary/50" },
    { r: 115, size: 3, dur: 14, delay: 0.6, color: "bg-primary-medium/60" },
    { r: 92, size: 6, dur: 10.5, delay: 1.0, color: "bg-primary/65" },
    { r: 108, size: 4, dur: 11.5, delay: 1.4, color: "bg-rose/55" },
    { r: 88, size: 5, dur: 9.2, delay: 1.8, color: "bg-primary/70" },
    { r: 118, size: 3, dur: 13.5, delay: 0.3, color: "bg-primary-medium/55" },
  ];
  return (
    <div
      className="absolute top-1/2 left-1/2 pointer-events-none transition-opacity duration-700"
      style={{ opacity: active ? 1 : 0 }}
      aria-hidden
    >
      {particles.map((p, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${p.color}`}
          style={
            {
              width: p.size,
              height: p.size,
              top: 0,
              left: 0,
              marginTop: -p.size / 2,
              marginLeft: -p.size / 2,
              "--r": `${p.r}px`,
              animation: `orbit ${p.dur}s linear ${p.delay}s infinite`,
              boxShadow: "0 0 8px hsl(var(--primary) / 0.5)",
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
