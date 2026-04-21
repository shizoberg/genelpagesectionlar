import { X, Check, ArrowRight } from "lucide-react";

const before = [
  "Kramp ve şiddetli ağrı",
  "Şişkinlik",
  "Ruh hali dalgalanmaları",
  "Yorgunluk",
  "Uyku bozukluğu",
];

const after = [
  "Dengeli, rahat döngü",
  "Hafiflik ve sindirim konforu",
  "Sakin ruh hali",
  "Yüksek enerji",
  "Derin, kaliteli uyku",
];

export default function BeforeAfter() {
  return (
    <section className="py-12 sm:py-14 bg-primary">
      <div className="container">
        <div className="text-center mb-6 sm:mb-8">
          <p className="k5-reveal text-[12px] sm:text-[13px] font-bold uppercase tracking-[1.5px] text-primary-foreground/60 mb-1.5">
            Fark Yarat
          </p>
          <h2 className="k5-reveal d1 text-2xl sm:text-3xl font-extrabold text-primary-foreground tracking-tight">
            Öncesi &amp; Sonrası
          </h2>
        </div>

        {/* Mobilde de yan yana 2 sütun + ortada ok */}
        <div className="k5-reveal d2 grid grid-cols-[1fr_auto_1fr] items-stretch gap-2 sm:gap-3 max-w-2xl mx-auto">
          <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-3 sm:p-5 border border-primary-foreground/15">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary-foreground/55 mb-2 sm:mb-3">
              Önce
            </p>
            <ul className="space-y-1.5 sm:space-y-2.5">
              {before.map((item) => (
                <li key={item} className="flex items-start gap-1.5 sm:gap-2 text-[11px] sm:text-sm text-primary-foreground/80 leading-tight">
                  <span className="w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full bg-rose/30 flex items-center justify-center flex-shrink-0 text-rose mt-0.5">
                    <X className="w-2 h-2 sm:w-3 sm:h-3" strokeWidth={3} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <ArrowRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-primary-foreground" strokeWidth={2.5} />
            </div>
          </div>

          <div className="bg-primary-foreground/20 backdrop-blur-sm rounded-2xl p-3 sm:p-5 border border-primary-foreground/30">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary-foreground/75 mb-2 sm:mb-3">
              Sonra
            </p>
            <ul className="space-y-1.5 sm:space-y-2.5">
              {after.map((item) => (
                <li key={item} className="flex items-start gap-1.5 sm:gap-2 text-[11px] sm:text-sm text-primary-foreground font-medium leading-tight">
                  <span className="w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full bg-sage/40 flex items-center justify-center flex-shrink-0 text-sage-light mt-0.5">
                    <Check className="w-2 h-2 sm:w-3 sm:h-3" strokeWidth={3} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
