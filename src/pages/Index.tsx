import { useEffect, useRef, useState } from "react";
import { useReveal } from "@/hooks/useReveal";

import ScrollProgress from "@/components/ScrollProgress";
import UrgencyBar from "@/components/UrgencyBar";
import ProductGallery from "@/components/ProductGallery";
import PricingSection from "@/components/PricingSection";

import ReviewsSection from "@/components/ReviewsSection";
import VideoTestimonials from "@/components/VideoTestimonials";
import BeforeAfter from "@/components/BeforeAfter";
import IngredientsSection from "@/components/IngredientsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import StickyCartBar from "@/components/StickyCartBar";
import SocialProofToast from "@/components/SocialProofToast";

const Index = () => {
  useReveal();

  const [cartCount, setCartCount] = useState(0);
  const [stickyVisible, setStickyVisible] = useState(false);
  const productRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    if (productRef.current) observer.observe(productRef.current);
    return () => observer.disconnect();
  }, []);

  void cartCount;
  const handleAddToCart = () => setCartCount((c) => c + 1);

  return (
    <div className="min-h-screen bg-white pb-[72px] font-sans">
      <ScrollProgress />
      <UrgencyBar />

      {/* Ürün — sayfanın başında */}
      <section className="py-8 md:py-12" id="pricing" ref={productRef}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="lg:sticky lg:top-6">
              <ProductGallery />
            </div>

            <div className="space-y-5">
              <div className="inline-flex items-center gap-1.5 bg-secondary text-primary text-xs font-bold py-1.5 px-3.5 rounded-full">
                90+ kişi bu ürünü satın aldı
              </div>

              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight tracking-tight">
                  .ki Balance — Döngü Takviyesi
                </h1>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  Eczacı ve doktorlar tarafından geliştirilmiş, döngüsel dengen için bilimsel formülasyon.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-base text-star tracking-wide">★★★★★</span>
                <a
                  href="#reviews"
                  className="text-[13px] text-muted-foreground font-medium hover:text-primary transition-colors"
                >
                  5.0 · 90+ doğrulanmış değerlendirme
                </a>
              </div>

              <div className="text-[13px] text-amber font-semibold flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Stokta sadece 12 adet kaldı
              </div>

              <PricingSection onAddToCart={handleAddToCart} />
            </div>
          </div>
        </div>
      </section>

      <div id="reviews">
        <ReviewsSection />
      </div>

      <VideoTestimonials />
      <IngredientsSection />
      <BeforeAfter />
      <HowItWorksSection />
      <FAQSection />

      {/* Sayfa sonu — Takviye Edici Gıda onay metni */}
      <div className="border-t border-border bg-secondary/30">
        <div className="container py-6 text-center">
          <p className="text-[12px] sm:text-[13px] font-bold text-primary leading-tight">
            .Ki Magnezyum ve Hayıt İçeren Takviye Edici Gıda
          </p>
          <p className="text-[11px] sm:text-[12px] text-muted-foreground font-medium mt-0.5">
            Takviye Edici Gıda Onay Numarası: 024990-06.11.2025
          </p>
        </div>
      </div>

      <StickyCartBar visible={stickyVisible} price={3500} onAdd={handleAddToCart} />
      <SocialProofToast />
    </div>
  );
};

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    {
      q: "Ürünü nasıl kullanmalıyım?",
      a: "Günde 1 sachet, tercihen sabah kahvaltıyla birlikte bir bardak suya karıştırarak tüketin. Eczacımız sana özel kullanım rutini oluşturabilir.",
    },
    {
      q: "Kaç günde etki görülür?",
      a: "Çoğu kullanıcı 2–4 hafta içinde döngüsel rahatsızlıklarda azalma bildirmektedir. Tam etki için 2–3 aylık düzenli kullanım önerilir.",
    },
    {
      q: "Vegan mı?",
      a: "Evet, tüm formülümüz %100 vegan sertifikalıdır. Hayvansal hiçbir ürün içermez.",
    },
    {
      q: "İade politikası nedir?",
      a: "30 gün içinde iade talebinde bulunabilirsin. Ücretsiz kargo ile iade gönderilir, herhangi bir soru sorulmaz.",
    },
    {
      q: "Aboneliği nasıl iptal ederim?",
      a: "Aboneliğini istediğin zaman, herhangi bir ceza olmaksızın hesabından veya müşteri hizmetlerini arayarak iptal edebilirsin.",
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container max-w-3xl">
        <div className="text-center mb-10">
          <p className="k5-reveal text-[13px] font-bold uppercase tracking-[1.5px] text-primary mb-2">
            SSS
          </p>
          <h2 className="k5-reveal d1 text-3xl font-extrabold text-foreground tracking-tight">
            Sık Sorulan Sorular
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="k5-reveal border border-border rounded-2xl overflow-hidden bg-card">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-secondary/50 transition-colors"
              >
                <span className="font-semibold text-foreground text-sm">{faq.q}</span>
                <span
                  className={`text-primary/60 text-xl font-light transition-transform duration-200 ${
                    open === i ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Index;
