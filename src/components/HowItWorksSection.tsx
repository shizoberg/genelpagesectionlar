import { Moon, Pill, Package as PackageIcon, Sparkles } from "lucide-react";

const steps = [
  {
    number: "01",
    Icon: Moon,
    title: "Döngünü Tanı",
    description: "Eczacımızla kısa görüşme yap.",
  },
  {
    number: "02",
    Icon: Pill,
    title: "Rutinini Oluştur",
    description: "Sana özel takviye planı.",
  },
  {
    number: "03",
    Icon: PackageIcon,
    title: "Kapına Gelsin",
    description: "Ücretsiz kargo, hızlı teslimat.",
  },
  {
    number: "04",
    Icon: Sparkles,
    title: "Farkı Hisset",
    description: "Düzenli kullanımla denge.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-10 sm:py-12 bg-primary">
      <div className="container">
        <div className="text-center mb-6 sm:mb-8">
          <p className="k5-reveal text-[12px] sm:text-[13px] font-bold uppercase tracking-[1.5px] text-primary-foreground/60 mb-1.5">
            Nasıl Çalışır?
          </p>
          <h2 className="k5-reveal d1 text-2xl sm:text-3xl font-extrabold text-primary-foreground tracking-tight">
            Döngünde Kendine İyi Bak
          </h2>
        </div>

        {/* Tek section'da, mobilde 2x2, sm+ 4 sütun */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 max-w-3xl mx-auto">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`k5-reveal d${(i % 4) + 1} bg-primary-foreground/10 border border-primary-foreground/15 rounded-2xl p-3 sm:p-4 text-center`}
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-primary-foreground/15 flex items-center justify-center mx-auto mb-2 text-primary-foreground">
                <step.Icon className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.2} />
              </div>
              <div className="text-[10px] sm:text-[11px] font-bold text-primary-foreground/50 mb-0.5">
                {step.number}
              </div>
              <h3 className="font-bold text-primary-foreground text-[12px] sm:text-sm mb-0.5 leading-tight">
                {step.title}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-primary-foreground/70 leading-snug">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-6 sm:mt-8">
          <a
            href="#pricing"
            className="inline-block bg-primary-foreground text-primary font-bold text-[13px] sm:text-sm px-6 py-2.5 rounded-full hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.25)] transition-all"
          >
            Hemen Başla
          </a>
        </div>
      </div>
    </section>
  );
}
