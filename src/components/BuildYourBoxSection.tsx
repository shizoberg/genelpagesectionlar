import { useMemo, useState } from "react";

type Product = {
  id: string;
  name: string;
  desc: string;
  price: number;
  emoji: string;
};

const PRODUCTS: Product[] = [
  { id: "ped", name: "Organik Ped", desc: "Pamuklu, hipoalerjenik · 16'lı", price: 180, emoji: "🌸" },
  { id: "pms", name: "PMS Takviyesi", desc: "Magnezyum + Hayıt · 30 sachet", price: 850, emoji: "💊" },
  { id: "jel", name: "Rahatlatıcı Jel", desc: "Soğutucu, mentollü · 50ml", price: 240, emoji: "🧴" },
  { id: "sprey", name: "Yatıştırıcı Sprey", desc: "Lavanta + papatya · 100ml", price: 220, emoji: "💨" },
  { id: "yag", name: "PMS Özel Yağ", desc: "Karın masaj yağı · 30ml", price: 320, emoji: "🌿" },
];

const GIFTS = [
  { id: "matara", name: "Matara", emoji: "🍶" },
  { id: "ayna", name: "Cep Aynası", emoji: "🪞" },
];

export default function BuildYourBoxSection() {
  const [qty, setQty] = useState<Record<string, number>>({});
  const [mode, setMode] = useState<"once" | "sub">("sub");

  const inc = (id: string) => setQty((q) => ({ ...q, [id]: (q[id] ?? 0) + 1 }));
  const dec = (id: string) =>
    setQty((q) => ({ ...q, [id]: Math.max(0, (q[id] ?? 0) - 1) }));

  const items = useMemo(
    () => PRODUCTS.filter((p) => (qty[p.id] ?? 0) > 0).map((p) => ({ ...p, count: qty[p.id] })),
    [qty]
  );

  const totalCount = items.reduce((s, i) => s + i.count, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.count, 0);
  const discount = mode === "sub" ? Math.round(subtotal * 0.2) : 0;
  const total = subtotal - discount;
  const giftsUnlocked = totalCount > 0;

  return (
    <section id="build-box" className="py-16 md:py-24 bg-secondary/30">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <p className="k5-reveal text-[12px] font-bold uppercase tracking-[1.5px] text-primary mb-3">
            Kendi Kutunu Oluştur
          </p>
          <h2 className="k5-reveal d1 text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight mb-4">
            Sana özel <span className="italic font-semibold text-primary">.ki</span> kutusu
          </h2>
          <p className="k5-reveal d2 text-base md:text-lg text-muted-foreground leading-relaxed">
            İhtiyacına göre ürünleri seç, kutunu oluştur. Her kutuda hediyeler senin.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Products */}
          <div className="lg:col-span-7 space-y-3">
            {PRODUCTS.map((p) => {
              const count = qty[p.id] ?? 0;
              const selected = count > 0;
              return (
                <div
                  key={p.id}
                  className={`k5-reveal flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl border bg-card transition-all ${
                    selected ? "border-primary shadow-sm" : "border-border"
                  }`}
                >
                  {/* Visual */}
                  <div
                    className={`shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center text-2xl sm:text-3xl ${
                      selected ? "bg-primary/15" : "bg-secondary"
                    }`}
                  >
                    {p.emoji}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <h3 className="font-bold text-foreground text-sm sm:text-base truncate">
                        {p.name}
                      </h3>
                      <span className="text-sm font-bold text-primary whitespace-nowrap">
                        {p.price}₺
                      </span>
                    </div>
                    <p className="text-xs sm:text-[13px] text-muted-foreground mt-0.5 line-clamp-1">
                      {p.desc}
                    </p>
                  </div>

                  {/* Qty controls */}
                  {count === 0 ? (
                    <button
                      onClick={() => inc(p.id)}
                      className="shrink-0 px-3 sm:px-4 h-10 rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-bold hover:bg-primary-medium transition-colors"
                    >
                      + Ekle
                    </button>
                  ) : (
                    <div className="shrink-0 flex items-center gap-1 bg-primary/10 rounded-full p-1">
                      <button
                        onClick={() => dec(p.id)}
                        aria-label="Azalt"
                        className="w-8 h-8 rounded-full bg-background text-primary font-bold flex items-center justify-center hover:bg-primary/10 transition-colors"
                      >
                        −
                      </button>
                      <span className="w-6 text-center font-bold text-primary text-sm">
                        {count}
                      </span>
                      <button
                        onClick={() => inc(p.id)}
                        aria-label="Arttır"
                        className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center hover:bg-primary-medium transition-colors"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Gifts */}
            <div
              className={`k5-reveal mt-5 rounded-2xl border-2 border-dashed p-4 sm:p-5 transition-all ${
                giftsUnlocked
                  ? "border-primary/40 bg-primary/5"
                  : "border-border bg-card opacity-70"
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">🎁</span>
                <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary">
                  Hediyeler {giftsUnlocked ? "· senin oldu" : "· kutu oluştur"}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {GIFTS.map((g) => (
                  <div
                    key={g.id}
                    className="flex items-center gap-2 p-2 sm:p-3 rounded-xl bg-background"
                  >
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-xl">
                      {g.emoji}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-foreground truncate">
                        {g.name}
                      </p>
                      <p className="text-[11px] text-primary font-semibold">Ücretsiz</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky summary */}
          <div className="lg:col-span-5 lg:sticky lg:top-6">
            <div className="k5-reveal rounded-2xl bg-card border border-border p-5 sm:p-6 shadow-sm">
              <h3 className="font-extrabold text-lg text-foreground mb-4">Kutum</h3>

              {items.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  Henüz ürün eklemedin.
                  <br />
                  Soldan ürünleri seç.
                </div>
              ) : (
                <ul className="space-y-2.5 mb-4 max-h-56 overflow-y-auto pr-1">
                  {items.map((i) => (
                    <li
                      key={i.id}
                      className="flex items-center justify-between text-sm gap-3"
                    >
                      <span className="flex items-center gap-2 min-w-0">
                        <span className="text-lg shrink-0">{i.emoji}</span>
                        <span className="text-foreground truncate">
                          {i.name}{" "}
                          <span className="text-muted-foreground">×{i.count}</span>
                        </span>
                      </span>
                      <span className="font-semibold text-foreground whitespace-nowrap">
                        {i.price * i.count}₺
                      </span>
                    </li>
                  ))}
                  {giftsUnlocked &&
                    GIFTS.map((g) => (
                      <li
                        key={g.id}
                        className="flex items-center justify-between text-sm gap-3"
                      >
                        <span className="flex items-center gap-2 min-w-0">
                          <span className="text-lg shrink-0">{g.emoji}</span>
                          <span className="text-foreground truncate">{g.name}</span>
                        </span>
                        <span className="font-semibold text-primary whitespace-nowrap">
                          Hediye
                        </span>
                      </li>
                    ))}
                </ul>
              )}

              {/* Mode toggle */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-secondary rounded-full mb-4">
                <button
                  onClick={() => setMode("sub")}
                  className={`py-2 rounded-full text-xs font-bold transition-all ${
                    mode === "sub"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground"
                  }`}
                >
                  Abone Ol · %20
                </button>
                <button
                  onClick={() => setMode("once")}
                  className={`py-2 rounded-full text-xs font-bold transition-all ${
                    mode === "once"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground"
                  }`}
                >
                  Tek Seferlik
                </button>
              </div>

              {/* Totals */}
              <div className="space-y-1.5 text-sm border-t border-border pt-4 mb-4">
                <div className="flex justify-between text-muted-foreground">
                  <span>Ara toplam</span>
                  <span>{subtotal}₺</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-primary font-semibold">
                    <span>Abone indirimi</span>
                    <span>−{discount}₺</span>
                  </div>
                )}
                <div className="flex justify-between font-extrabold text-foreground text-lg pt-2">
                  <span>Toplam</span>
                  <span>{total}₺</span>
                </div>
              </div>

              <button
                disabled={items.length === 0}
                className="w-full py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-sm hover:bg-primary-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {mode === "sub" ? "Aboneliği Başlat" : "Kutuyu Satın Al"}
              </button>
              <p className="text-[11px] text-muted-foreground text-center mt-2.5">
                Ücretsiz kargo · İstediğin zaman iptal et
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
