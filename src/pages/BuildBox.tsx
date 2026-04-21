import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useReveal } from "@/hooks/useReveal";

import imgPed from "@/assets/box-ped.jpg";
import imgPms from "@/assets/box-pms.jpg";
import imgJel from "@/assets/box-jel.jpg";
import imgSprey from "@/assets/box-sprey.jpg";
import imgYag from "@/assets/box-yag.jpg";
import imgMatara from "@/assets/box-matara.jpg";
import imgAyna from "@/assets/box-ayna.jpg";

type Product = {
  id: string;
  name: string;
  desc: string;
  price: number;
  image: string;
};

const PRODUCTS: Product[] = [
  { id: "ped", name: "Organik Ped", desc: "Pamuklu, hipoalerjenik · 16'lı", price: 180, image: imgPed },
  { id: "pms", name: "PMS Takviyesi", desc: "Magnezyum + Hayıt · 30 sachet", price: 850, image: imgPms },
  { id: "jel", name: "Rahatlatıcı Jel", desc: "Soğutucu, mentollü · 50ml", price: 240, image: imgJel },
  { id: "sprey", name: "Yatıştırıcı Sprey", desc: "Lavanta + papatya · 100ml", price: 220, image: imgSprey },
  { id: "yag", name: "PMS Özel Yağ", desc: "Karın masaj yağı · 30ml", price: 320, image: imgYag },
];

const GIFTS = [
  { id: "matara", name: "Matara", image: imgMatara },
  { id: "ayna", name: "Cep Aynası", image: imgAyna },
];

export default function BuildBox() {
  useReveal();
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
    <div className="min-h-screen bg-white pb-24">
      {/* Top bar */}
      <header className="border-b border-border bg-white sticky top-0 z-30">
        <div className="container py-4 flex items-center justify-between">
          <Link to="/" className="text-sm font-semibold text-primary hover:opacity-70 transition-opacity">
            ← Ana sayfa
          </Link>
          <p className="text-xs font-bold uppercase tracking-[1.5px] text-muted-foreground">
            Kendi Kutunu Oluştur
          </p>
          <div className="w-20" />
        </div>
      </header>

      <section className="py-10 md:py-16">
        <div className="container">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
            <p className="k5-reveal text-[12px] font-bold uppercase tracking-[1.5px] text-primary mb-3">
              Kendi Kutunu Oluştur
            </p>
            <h1 className="k5-reveal d1 text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight mb-4">
              Sana özel <span className="italic font-semibold text-primary">.ki</span> kutusu
            </h1>
            <p className="k5-reveal d2 text-base md:text-lg text-muted-foreground leading-relaxed">
              İhtiyacına göre ürünleri seç, kutunu oluştur. Her kutuda hediyeler senin.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Products */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PRODUCTS.map((p) => {
                const count = qty[p.id] ?? 0;
                const selected = count > 0;
                return (
                  <div
                    key={p.id}
                    className={`k5-reveal flex flex-col rounded-2xl border bg-card overflow-hidden transition-all ${
                      selected ? "border-primary shadow-sm" : "border-border"
                    }`}
                  >
                    {/* Photo */}
                    <div className="relative aspect-square bg-white overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        width={512}
                        height={512}
                        className="w-full h-full object-cover"
                      />
                      {selected && (
                        <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">
                          ×{count}
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-4 flex flex-col gap-3 flex-1">
                      <div>
                        <div className="flex items-baseline justify-between gap-2 mb-1">
                          <h3 className="font-bold text-foreground text-sm sm:text-base">
                            {p.name}
                          </h3>
                          <span className="text-sm font-bold text-primary whitespace-nowrap">
                            {p.price}₺
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-snug">
                          {p.desc}
                        </p>
                      </div>

                      {/* Qty controls */}
                      <div className="mt-auto">
                        {count === 0 ? (
                          <button
                            onClick={() => inc(p.id)}
                            className="w-full h-10 rounded-full bg-primary text-primary-foreground text-xs font-bold hover:bg-primary-medium transition-colors"
                          >
                            + Ekle
                          </button>
                        ) : (
                          <div className="flex items-center justify-between gap-1 bg-primary/10 rounded-full p-1">
                            <button
                              onClick={() => dec(p.id)}
                              aria-label="Azalt"
                              className="w-8 h-8 rounded-full bg-white text-primary font-bold flex items-center justify-center hover:bg-primary/10 transition-colors"
                            >
                              −
                            </button>
                            <span className="font-bold text-primary text-sm">
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
                    </div>
                  </div>
                );
              })}

              {/* Gifts */}
              <div
                className={`k5-reveal sm:col-span-2 mt-2 rounded-2xl border-2 border-dashed p-4 sm:p-5 transition-all ${
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
                      className="flex items-center gap-3 p-2 sm:p-3 rounded-xl bg-white border border-border"
                    >
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-white shrink-0">
                        <img
                          src={g.image}
                          alt={g.name}
                          loading="lazy"
                          width={512}
                          height={512}
                          className="w-full h-full object-cover"
                        />
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
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <div className="k5-reveal rounded-2xl bg-card border border-border p-5 sm:p-6 shadow-sm">
                <h2 className="font-extrabold text-lg text-foreground mb-4">Kutum</h2>

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
                          <img
                            src={i.image}
                            alt=""
                            loading="lazy"
                            width={32}
                            height={32}
                            className="w-8 h-8 rounded-md object-cover shrink-0"
                          />
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
                            <img
                              src={g.image}
                              alt=""
                              loading="lazy"
                              width={32}
                              height={32}
                              className="w-8 h-8 rounded-md object-cover shrink-0"
                            />
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
    </div>
  );
}
