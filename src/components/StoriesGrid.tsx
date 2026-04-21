import { useRef, useState, useCallback } from "react";

type Tile =
  | {
      kind: "image";
      src?: string;
      alt: string;
      shape: "circle" | "rect";
      bg?: string;
      label?: string;
    }
  | {
      kind: "video";
      name: string;
      caption: string;
      bg: string;
      poster?: string;
    }
  | {
      kind: "quote";
      text: string;
      source: string;
      variant: "light" | "dark";
    };

const tiles: Tile[] = [
  {
    kind: "image",
    shape: "circle",
    bg: "from-[#e8dcc4] to-[#d4c4a8]",
    alt: "Ürün lavabo kenarında",
    label: ".ki Balance",
  },
  {
    kind: "video",
    name: "Defne",
    caption: "Her şey bağlantılı",
    bg: "from-[#3a2a55] to-[#5a3ca0]",
  },
  {
    kind: "video",
    name: "Ulyana",
    caption: "PMS belirtilerinde 70% azalma",
    bg: "from-[#2a1560] to-[#4a3290]",
  },
  {
    kind: "image",
    shape: "circle",
    bg: "from-[#f0e8d8] to-[#e0d4bc]",
    alt: "Banyoda ürün",
  },
  {
    kind: "quote",
    text: "Mikrobiyal metabolizma ve yolaklar konusunda sınırları zorluyorlar — ilgi alanları ve tutkuları burada.",
    source: "FAST COMPANY",
    variant: "light",
  },
  {
    kind: "video",
    name: "Simge",
    caption: "Regl düzensizliği düzeldi",
    bg: "from-[#1e1250] to-[#3a2080]",
  },
  {
    kind: "image",
    shape: "circle",
    bg: "from-[#3a2a20] to-[#1f1410]",
    alt: "Şapkalı kadın",
    label: ".ki",
  },
  {
    kind: "quote",
    text: "Probiyotiklerin yeni uygulamalarına öncülük ederek insan ve gezegen sağlığını iyileştiriyorlar.",
    source: "Forbes",
    variant: "dark",
  },
  {
    kind: "image",
    shape: "circle",
    bg: "from-[#c8d8c0] to-[#a8c098]",
    alt: "Yeşil kapsüller mikroskop altında",
  },
];

export default function StoriesGrid() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const scrollL = useRef(0);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    setDragging(true);
    startX.current = e.pageX - (trackRef.current?.offsetLeft || 0);
    scrollL.current = trackRef.current?.scrollLeft || 0;
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragging || !trackRef.current) return;
      e.preventDefault();
      const x = e.pageX - trackRef.current.offsetLeft;
      trackRef.current.scrollLeft = scrollL.current - (x - startX.current) * 1.5;
    },
    [dragging]
  );

  const onEnd = useCallback(() => setDragging(false), []);

  return (
    <section className="py-10 md:py-24 bg-[hsl(var(--background))]">
      <div className="container">
        {/* Heading */}
        <div className="k5-reveal mb-6 md:mb-14 max-w-3xl">
          <h2 className="text-xl md:text-5xl font-extrabold text-[hsl(var(--foreground))] tracking-tight leading-[1.1]">
            Bilim insanları, yenilikçiler ve senin gibi üyelerden hikayeler.
          </h2>
        </div>

        {/* Mobile: horizontal scroll */}
        <div
          ref={trackRef}
          className={`md:hidden flex gap-2.5 overflow-x-auto hide-scrollbar pb-3 snap-x snap-mandatory grab-cursor ${
            dragging ? "dragging" : ""
          }`}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onEnd}
          onMouseLeave={onEnd}
        >
          {tiles.map((tile, i) => (
            <div key={i} className="flex-none w-[160px] snap-start">
              <Tile tile={tile} />
            </div>
          ))}
        </div>

        {/* Desktop: asymmetric grid (Seed-style) */}
        <div className="hidden md:grid grid-cols-4 gap-4 lg:gap-5">
          {tiles.map((tile, i) => (
            <div key={i} className="k5-reveal">
              <Tile tile={tile} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Tile({ tile }: { tile: Tile }) {
  if (tile.kind === "image") {
    const radius = tile.shape === "circle" ? "rounded-full" : "rounded-3xl";
    return (
      <div
        className={`relative w-full aspect-square overflow-hidden bg-gradient-to-br ${tile.bg} ${radius}`}
      >
        {tile.src ? (
          <img src={tile.src} alt={tile.alt} className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            {tile.label && (
              <span className="text-[hsl(var(--foreground))]/40 text-xs font-bold tracking-widest uppercase">
                {tile.label}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }

  if (tile.kind === "video") {
    return (
      <div
        className={`relative w-full aspect-[4/5] overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br ${tile.bg} text-white`}
      >
        {/* Top overlay caption */}
        <div className="absolute top-0 left-0 right-0 px-2.5 md:px-4 py-2 md:py-3 flex items-center justify-between">
          <span className="text-[9px] md:text-[10px] uppercase tracking-wider opacity-80">
            {tile.caption.split(" ").slice(0, 2).join(" ")}
          </span>
          <button className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition">
            <svg className="w-2.5 h-2.5 md:w-3 md:h-3 fill-white ml-0.5" viewBox="0 0 24 24">
              <polygon points="8,5 20,12 8,19" />
            </svg>
          </button>
        </div>

        {/* Center play */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-3 md:px-4">
          <div className="text-sm md:text-lg font-bold">{tile.name}</div>
          <div className="text-[11px] md:text-xs opacity-70 mt-0.5 md:mt-1 leading-tight">{tile.caption}</div>
        </div>
      </div>
    );
  }

  // quote
  const isDark = tile.variant === "dark";
  return (
    <div
      className={`relative w-full aspect-square rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-7 flex flex-col justify-center ${
        isDark
          ? "bg-[hsl(155_45%_12%)] text-white"
          : "bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))]"
      }`}
    >
      <button
        className={`absolute top-2.5 right-2.5 md:top-4 md:right-4 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center ${
          isDark ? "bg-white/15 hover:bg-white/25" : "bg-white/70 hover:bg-white"
        } transition`}
        aria-label="Open"
      >
        <svg className="w-3 h-3 md:w-3.5 md:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 17L17 7M17 7H9M17 7v8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <p className="text-center text-[11px] md:text-sm lg:text-base leading-snug md:leading-relaxed font-medium italic">
        "{tile.text}"
      </p>
      <p
        className={`text-center mt-2 md:mt-4 font-bold tracking-wider text-[11px] md:text-sm ${
          isDark ? "text-white" : "text-[hsl(var(--foreground))]"
        }`}
        style={{ fontFamily: "Georgia, serif" }}
      >
        {tile.source}
      </p>
    </div>
  );
}

