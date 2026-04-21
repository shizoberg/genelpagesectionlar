import { useState } from "react";
import { Instagram, Facebook, Youtube } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-16 md:py-20 bg-background border-t border-border">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Headline */}
          <div>
            <h2 className="k5-reveal text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
              E-postalar için de yüksek standartlarımız var.
            </h2>
            <div className="k5-reveal d1 flex items-center gap-4 mt-6">
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              >
                <Instagram className="w-4 h-4" strokeWidth={2} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              >
                <Facebook className="w-4 h-4" strokeWidth={2} />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              >
                <Youtube className="w-4 h-4" strokeWidth={2} />
              </a>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="k5-reveal d2 bg-secondary/50 rounded-2xl p-2 flex items-center gap-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresin"
              className="flex-1 bg-transparent px-4 py-3 text-sm md:text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground font-bold text-sm px-5 py-3 rounded-xl hover:bg-primary-medium transition-colors whitespace-nowrap"
            >
              {submitted ? "Teşekkürler ✓" : "Abone ol"}
            </button>
          </form>
        </div>

        {/* Footnote */}
        <p className="k5-reveal d3 text-xs text-muted-foreground mt-10 max-w-2xl">
          † Veriler doğrulanmış müşteri değerlendirmeleri ve klinik içerik dozajlarına dayanır.
          Takviye Edici Gıda Onay Numarası: 024990-06.11.2025
        </p>
      </div>
    </section>
  );
}
