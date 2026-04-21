import { useState } from "react";
import { Check, RefreshCw, Package, Sparkles, ShieldCheck, RotateCcw, Leaf, Truck } from "lucide-react";

interface Pkg {
  id: string;
  label: string;
  price: number;
  originalPrice: number | null;
  badge: string | null;
  perUnit: number | null;
  features: string[];
  subscription: boolean;
}

const packages: Pkg[] = [
  {
    id: "single",
    label: "Tekli Paket",
    price: 1400,
    originalPrice: null,
    badge: null,
    perUnit: null,
    features: [
      "FDA ve GMP Standartlarına Uygun Üretildi.",
      "%100 Vegan Formülasyon.",
      "Hayıt & Bitkisel Ekstreler.",
      "Magnezyum + B6 + B12.",
      "13+ Aktif İçerik.",
    ],
    subscription: false,
  },
  {
    id: "triple",
    label: "3'lü Paket",
    price: 3500,
    originalPrice: 4200,
    badge: "EN POPÜLER",
    perUnit: 1167,
    features: [
      "13+ Aktif İçerik & Hayıt & Bitkisel Ekstreler.",
      "Magnezyum + B6 + B12.",
      "Matara ve Ayna Hediye.",
      "3 Adet Balance Your Cycle Gönderilir.",
    ],
    subscription: true,
  },
];

interface PricingProps {
  onAddToCart?: () => void;
}

export default function PricingSection({ onAddToCart }: PricingProps) {
  const [selected, setSelected] = useState("triple");
  const [subscriptionMode, setSubscriptionMode] = useState(false);
  const [added, setAdded] = useState(false);

  const selectedPkg = packages.find((p) => p.id === selected)!;

  const handleAdd = () => {
    setAdded(true);
    onAddToCart?.();
    setTimeout(() => setAdded(false), 2000);
  };

  const finalPrice = subscriptionMode ? Math.round(selectedPkg.price * 0.9) : selectedPkg.price;

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {packages.map((pkg) => (
          <div key={pkg.id}>
            <button
              onClick={() => setSelected(pkg.id)}
              className={`package-card w-full text-left ${
                selected === pkg.id ? "package-card-selected" : "package-card-unselected"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                      selected === pkg.id ? "border-primary" : "border-border"
                    }`}
                  >
                    {selected === pkg.id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-foreground text-base">{pkg.label}</span>
                      {pkg.badge && (
                        <span className="badge-popular text-[10px]">{pkg.badge}</span>
                      )}
                    </div>
                    {pkg.perUnit && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Adet başına ~{pkg.perUnit.toLocaleString("tr-TR")}₺
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  {pkg.originalPrice && (
                    <p className="text-xs text-muted-foreground/70 line-through">
                      {pkg.originalPrice.toLocaleString("tr-TR")}₺
                    </p>
                  )}
                  <p className="text-xl font-extrabold text-primary">
                    {pkg.price.toLocaleString("tr-TR")}₺
                  </p>
                </div>
              </div>

              {selected === pkg.id && (
                <div className="mt-4 space-y-2 border-t border-primary/10 pt-4">
                  {pkg.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <Check size={15} className="text-sage flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/80">{f}</span>
                    </div>
                  ))}
                </div>
              )}
            </button>

            {/* 3'lü paket için ayrı vurgulanmış rutin fırsatı */}
            {pkg.id === "triple" && selected === "triple" && (
              <div className="mt-2 flex items-start gap-3 rounded-2xl border border-primary/20 bg-gradient-to-br from-secondary to-plum-pale p-3.5">
                <div className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                  <Sparkles size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-bold text-primary leading-tight">
                    Eczacımız ile sana özel takviye rutini oluştur
                  </p>
                  <p className="text-[12px] text-muted-foreground mt-0.5 leading-snug">
                    15 dakikalık birebir görüşme — 3'lü pakete özel hediye.
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Subscription toggle */}
      <div className="bg-secondary/60 rounded-2xl p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <RefreshCw size={18} className="text-primary flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">Abonelik ile %10 İndirim</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Her ay otomatik gönderim, istediğin zaman iptal
              </p>
            </div>
          </div>
          <button
            onClick={() => setSubscriptionMode(!subscriptionMode)}
            aria-label="Aboneliği değiştir"
            className={`relative w-12 h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${
              subscriptionMode ? "bg-primary" : "bg-border"
            }`}
          >
            <div
              className={`absolute top-1 w-4 h-4 rounded-full bg-card shadow transition-transform duration-200 ${
                subscriptionMode ? "translate-x-7" : "translate-x-1"
              }`}
            />
          </button>
        </div>
        {subscriptionMode && (
          <div className="mt-3 flex items-center justify-between bg-card rounded-xl px-4 py-2.5">
            <span className="text-sm text-muted-foreground">Abonelik fiyatı</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground/70 line-through">
                {selectedPkg.price.toLocaleString("tr-TR")}₺
              </span>
              <span className="text-base font-extrabold text-primary">
                {finalPrice.toLocaleString("tr-TR")}₺
              </span>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleAdd}
        className={`btn-primary text-base flex items-center justify-center gap-2 ${
          added ? "!bg-sage hover:!bg-sage" : ""
        }`}
      >
        {added ? (
          <>
            <Check size={20} />
            Sepete Eklendi!
          </>
        ) : (
          <>
            <Package size={20} />
            Sepete Ekle — {finalPrice.toLocaleString("tr-TR")}₺
          </>
        )}
      </button>

      <button className="w-full border border-border rounded-full py-3 text-sm font-medium text-muted-foreground hover:bg-secondary/50 transition-colors">
        Uzman Doktor &amp; Eczacılar Tarafından Geliştirildi.
      </button>

      {/* Trust satırı — sade, tek tonlu (primary) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <TrustItem Icon={ShieldCheck} label="Güvenli Ödeme" />
        <TrustItem Icon={RotateCcw} label="30 Gün İade" />
        <TrustItem Icon={Leaf} label="%100 Doğal" />
        <TrustItem Icon={Truck} label="Ücretsiz Kargo" />
      </div>

      {/* Sertifika logo placeholder'ları — boş, sample */}
      <div className="flex items-center justify-center gap-4 pt-3">
        {["", "", ""].map((_, i) => (
          <div
            key={i}
            className="w-12 h-12 rounded-full bg-secondary border border-border flex items-center justify-center"
            aria-label="Sertifika logosu (yakında)"
          />
        ))}
      </div>
    </div>
  );
}

function TrustItem({ Icon, label }: { Icon: typeof ShieldCheck; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
      <Icon className="w-4 h-4 text-primary" strokeWidth={2.2} />
      {label}
    </div>
  );
}
