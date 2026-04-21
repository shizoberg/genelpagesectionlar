import { Play } from "lucide-react";

const stories = Array.from({ length: 8 }).map((_, i) => ({
  id: i,
  // Sıcak placeholder gradients (sarı tonları)
  gradient:
    i % 3 === 0
      ? "from-amber/70 to-amber/30"
      : i % 3 === 1
      ? "from-secondary to-amber/40"
      : "from-amber/50 to-secondary",
}));

export default function StoryStrip() {
  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden">
      <div className="container">
        <div className="flex items-end justify-between mb-6 md:mb-8">
          <h2 className="k5-reveal text-xl md:text-3xl font-extrabold text-primary tracking-tight">
            Topluluğumuz
          </h2>
          <a
            href="#"
            className="k5-reveal text-xs md:text-sm font-semibold text-primary underline underline-offset-4 hover:opacity-70 transition-opacity"
          >
            Tümünü Gör
          </a>
        </div>
      </div>

      {/* Yatay kaydırılabilir şerit — full bleed */}
      <div className="relative">
        <div className="flex gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 md:px-8 pb-2">
          {stories.map((s) => (
            <div
              key={s.id}
              className="k5-reveal snap-start shrink-0 w-[140px] sm:w-[160px] md:w-[200px] aspect-[9/14] rounded-xl overflow-hidden relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient}`} />
              {/* Placeholder fotoğraf hissi için yumuşak overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.5),transparent_60%)]" />
              <button
                aria-label="Hikayeyi oynat"
                className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-white/90 text-primary flex items-center justify-center shadow-sm"
              >
                <Play size={12} fill="currentColor" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
