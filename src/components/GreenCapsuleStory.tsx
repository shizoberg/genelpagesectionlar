import { useEffect, useRef, useState } from "react";
import { Moon, Flame, Sparkles, Check } from "lucide-react";

const ingredients = [
  { name: "Magnezyum", dose: "300 mg", color: "bg-sage", desc: "Kas gevşemesi & uyku" },
  { name: "Hayıt", dose: "200 mg", color: "bg-primary", desc: "Hormonal denge" },
  { name: "Çin Meleki Otu", dose: "150 mg", color: "bg-rose", desc: "Sıcak basma desteği" },
  { name: "Bor", dose: "3 mg", color: "bg-amber", desc: "Östrojen metabolizması" },
];

const benefits = [
  {
    Icon: Moon,
    title: "Uyku problemlerine iyi gelir",
    desc: "Magnezyum ve hayıt kombinasyonu derin uykuyu destekler, gece uyanmaları azaltır.",
    bg: "bg-sage/10",
    iconColor: "text-sage",
  },
  {
    Icon: Flame,
    title: "Sıcak basmalarını dengeler",
    desc: "Çin meleki otu vazomotor semptomları (sıcak basma, gece terlemeleri) hafifletir.",
    bg: "bg-rose/10",
    iconColor: "text-rose",
  },
  {
    Icon: Sparkles,
    title: "Hormonal dengeyi destekler",
    desc: "Hayıt ve bor birlikte östrojen-progesteron dengesini doğal yoldan destekler.",
    bg: "bg-primary/10",
    iconColor: "text-primary",
  },
];

export default function GreenCapsuleStory() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = el.offsetHeight - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
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

  // Stage segmentation: 0-0.4 capsule opens, 0.4-0.75 calendar fills, 0.75-1 benefits
  const capsuleProgress = Math.min(1, Math.max(0, progress / 0.4));
  const calendarProgress = Math.min(1, Math.max(0, (progress - 0.4) / 0.35));
  const benefitsProgress = Math.min(1, Math.max(0, (progress - 0.75) / 0.25));

  const checkedDays = Math.floor(calendarProgress * 31);

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-secondary/30 via-background to-secondary/20"
      style={{ height: "320vh" }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="container max-w-6xl mx-auto px-4 w-full">
          <div className="text-center mb-6 md:mb-10">
            <p className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[1.5px] text-sage mb-2">
              .ki Night · Yeşil Kapsül
            </p>
            <h2 className="text-2xl md:text-4xl font-extrabold text-foreground tracking-tight">
              Gece dengesi, 30 günde fark
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* LEFT — Capsule animation */}
            <CapsuleScene
              capsuleProgress={capsuleProgress}
              calendarProgress={calendarProgress}
              benefitsProgress={benefitsProgress}
              checkedDays={checkedDays}
            />

            {/* RIGHT — Stage content */}
            <StageContent
              capsuleProgress={capsuleProgress}
              calendarProgress={calendarProgress}
              benefitsProgress={benefitsProgress}
              checkedDays={checkedDays}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============== Capsule scene (left side) ============== */
function CapsuleScene({
  capsuleProgress,
  calendarProgress,
  benefitsProgress,
  checkedDays,
}: {
  capsuleProgress: number;
  calendarProgress: number;
  benefitsProgress: number;
  checkedDays: number;
}) {
  // Hide capsule once calendar is in focus
  const showCapsule = calendarProgress < 0.05;
  const showCalendar = calendarProgress > 0.05 && benefitsProgress < 0.05;
  const showBenefits = benefitsProgress > 0.05;

  return (
    <div className="relative h-[320px] sm:h-[400px] flex items-center justify-center">
      {/* Capsule */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
        style={{ opacity: showCapsule ? 1 : 0, pointerEvents: showCapsule ? "auto" : "none" }}
      >
        <Capsule progress={capsuleProgress} />
      </div>

      {/* Calendar */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
        style={{ opacity: showCalendar ? 1 : 0, pointerEvents: showCalendar ? "auto" : "none" }}
      >
        <Calendar30 checkedDays={checkedDays} />
      </div>

      {/* Benefits visual */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
        style={{ opacity: showBenefits ? 1 : 0, pointerEvents: showBenefits ? "auto" : "none" }}
      >
        <BenefitsVisual progress={benefitsProgress} />
      </div>
    </div>
  );
}

/* ============== Capsule (opens & releases ingredients) ============== */
function Capsule({ progress }: { progress: number }) {
  const gap = progress * 90; // px between halves
  const tilt = progress * 12;
  const showIngredients = progress > 0.35;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Ingredients flying out */}
      {ingredients.map((ing, i) => {
        const t = Math.min(1, Math.max(0, (progress - 0.3) / 0.7));
        const angles = [-60, -20, 20, 60];
        const angle = angles[i];
        const distance = 110 * t;
        const x = Math.sin((angle * Math.PI) / 180) * distance;
        const y = -Math.cos((angle * Math.PI) / 180) * distance - 20;

        return (
          <div
            key={i}
            className="absolute z-10 transition-all duration-500 ease-out"
            style={{
              transform: `translate(${x}px, ${y}px) scale(${0.4 + t * 0.8})`,
              opacity: showIngredients ? t : 0,
            }}
          >
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full ${ing.color} shadow-lg flex items-center justify-center text-white text-[10px] sm:text-xs font-extrabold text-center leading-tight px-1`}
              >
                {ing.dose}
              </div>
              <span className="text-[10px] sm:text-xs font-semibold text-foreground bg-background/90 px-2 py-0.5 rounded-full whitespace-nowrap shadow-sm">
                {ing.name}
              </span>
            </div>
          </div>
        );
      })}

      {/* Capsule body — two halves */}
      <div className="relative" style={{ width: 220, height: 80 }}>
        {/* Top half (lighter green) */}
        <div
          className="absolute left-0 top-0 transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(-${gap / 2}px) rotate(-${tilt}deg)`,
            transformOrigin: "right center",
          }}
        >
          <div
            className="w-[110px] h-20 rounded-l-full shadow-lg border-r-2 border-sage/30"
            style={{
              background: "linear-gradient(135deg, hsl(var(--sage)) 0%, hsl(var(--sage) / 0.7) 100%)",
            }}
          >
            <div className="w-full h-full rounded-l-full bg-gradient-to-b from-white/30 to-transparent" />
          </div>
        </div>

        {/* Bottom half (darker green) */}
        <div
          className="absolute right-0 top-0 transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(${gap / 2}px) rotate(${tilt}deg)`,
            transformOrigin: "left center",
          }}
        >
          <div
            className="w-[110px] h-20 rounded-r-full shadow-lg border-l-2 border-emerald-900/40"
            style={{
              background: "linear-gradient(135deg, hsl(155 45% 22%) 0%, hsl(155 50% 15%) 100%)",
            }}
          >
            <div className="w-full h-full rounded-r-full bg-gradient-to-b from-white/15 to-transparent flex items-center justify-center">
              <span className="text-white text-xs font-extrabold tracking-wider opacity-80">.ki</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hint when closed */}
      {progress < 0.1 && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground animate-pulse whitespace-nowrap">
          ↓ Aşağı kaydır, kapsülü aç
        </div>
      )}
    </div>
  );
}

/* ============== 30-day calendar ============== */
function Calendar30({ checkedDays }: { checkedDays: number }) {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="w-full max-w-[360px] bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-md">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-foreground uppercase tracking-wider">30 Gün · 1 Kutu</span>
        <span className="text-xs font-extrabold text-sage">
          {Math.min(30, checkedDays)}/30
        </span>
      </div>

      <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
        {days.map((d, i) => {
          const isChecked = i < checkedDays;
          return (
            <div
              key={d}
              className={`relative aspect-square rounded-md flex items-center justify-center text-[10px] sm:text-xs font-bold transition-all duration-200 ${
                isChecked
                  ? "bg-sage text-white scale-100 shadow-sm"
                  : "bg-secondary/60 text-muted-foreground scale-95"
              }`}
            >
              {isChecked ? <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" strokeWidth={3} /> : d}
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="mt-4 h-1.5 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-sage to-primary transition-all duration-300"
          style={{ width: `${(checkedDays / 30) * 100}%` }}
        />
      </div>

      {checkedDays >= 30 && (
        <div className="mt-3 text-center text-xs font-bold text-sage animate-fade-in">
          ✓ 30 gün tamamlandı · Dengeyi hisset
        </div>
      )}
    </div>
  );
}

/* ============== Benefits visual ============== */
function BenefitsVisual({ progress }: { progress: number }) {
  return (
    <div className="w-full max-w-[360px] space-y-3">
      {benefits.map((b, i) => {
        const delay = i * 0.25;
        const t = Math.min(1, Math.max(0, (progress - delay) / 0.4));
        return (
          <div
            key={i}
            className={`flex items-center gap-3 p-3 sm:p-4 rounded-2xl bg-card border border-border shadow-sm transition-all duration-500`}
            style={{
              opacity: t,
              transform: `translateY(${(1 - t) * 16}px)`,
            }}
          >
            <div className={`w-12 h-12 rounded-full ${b.bg} flex items-center justify-center flex-shrink-0`}>
              <b.Icon className={`w-6 h-6 ${b.iconColor}`} strokeWidth={1.6} />
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-extrabold text-foreground leading-tight">{b.title}</h4>
              <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{b.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ============== Right-side stage text ============== */
function StageContent({
  capsuleProgress,
  calendarProgress,
  benefitsProgress,
  checkedDays,
}: {
  capsuleProgress: number;
  calendarProgress: number;
  benefitsProgress: number;
  checkedDays: number;
}) {
  let stage: "capsule" | "calendar" | "benefits" = "capsule";
  if (benefitsProgress > 0.05) stage = "benefits";
  else if (calendarProgress > 0.05) stage = "calendar";

  const stages = {
    capsule: {
      eyebrow: "01 · Formül",
      title: "Koyu yeşil kapsülün içinde 4 etken madde",
      body: "Magnezyum, Hayıt, Çin Meleki Otu ve Bor — her biri klinik dozajda. Kaydırdıkça kapsül açılır, içerik açığa çıkar.",
      meta: `${Math.round(capsuleProgress * 100)}% açıldı`,
    },
    calendar: {
      eyebrow: "02 · Ritüel",
      title: "30 gün, günde 1 kapsül",
      body: "Tutarlı sonuç için 30 günlük döngü önerilir. Her gece yatmadan önce 1 kapsül — vücudun ritmine alışsın.",
      meta: `${checkedDays}/30 gün`,
    },
    benefits: {
      eyebrow: "03 · Etki",
      title: "Kadınların 3 gece probleminde fark",
      body: "Düzenli kullanımda uyku kalitesi artar, sıcak basmaları azalır ve hormonal denge desteklenir.",
      meta: "2–4 hafta içinde fark",
    },
  };

  const s = stages[stage];

  return (
    <div key={stage} className="animate-fade-in space-y-4">
      <div className="inline-flex items-center gap-2 bg-sage/15 text-sage text-[11px] font-extrabold uppercase tracking-[1.5px] py-1.5 px-3 rounded-full">
        {s.eyebrow}
      </div>
      <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight leading-tight">
        {s.title}
      </h3>
      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md">
        {s.body}
      </p>
      <div className="text-xs font-bold text-sage">{s.meta}</div>

      {/* Stage indicator */}
      <div className="flex gap-1.5 pt-3">
        {(["capsule", "calendar", "benefits"] as const).map((k) => (
          <div
            key={k}
            className={`h-1 rounded-full transition-all duration-300 ${
              stage === k ? "w-10 bg-sage" : "w-6 bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
