import { Pill, ShieldCheck, Search, Landmark, FlaskConical, Sprout } from "lucide-react";

const items = [
  { Icon: Pill, label: "2.6 Milyar Kapsül Satıldı" },
  { Icon: ShieldCheck, label: "Clean Label Sertifikalı" },
  { Icon: Search, label: "%100 İçerik Şeffaflığı" },
  { Icon: Landmark, label: "5M$ Klinik Araştırma Yatırımı" },
  { Icon: FlaskConical, label: "Diyetisyen & Bilim İnsanı Onaylı" },
  { Icon: Sprout, label: "Vegan & GDO'suz" },
];

export default function TrustBar() {
  return (
    <section className="py-12 md:py-16 bg-white border-y border-border/60">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-8 gap-x-4">
          {items.map(({ Icon, label }, i) => (
            <div
              key={i}
              className="k5-reveal flex flex-col items-center text-center gap-3 px-2"
            >
              <Icon className="w-7 h-7 md:w-8 md:h-8 text-primary" strokeWidth={1.6} />
              <p className="text-[11px] md:text-[13px] font-semibold text-primary leading-snug max-w-[160px]">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
