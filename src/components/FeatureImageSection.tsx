// Ritual-style: large image on the left, text + CTAs on the right.
// Easily swap the image by changing the `image` prop or the default below.

interface FeatureImageSectionProps {
  image?: string;
  imageAlt?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  bgClass?: string; // background color behind image area
}

export default function FeatureImageSection({
  image,
  imageAlt = ".ki Balance",
  eyebrow,
  title = (
    <>
      <em className="italic font-semibold text-primary">Gerçek</em> dengeyi arayanlar için
    </>
  ),
  description = "Eczacı onaylı, klinik dozajlı .ki Balance — her sachet'te tutarlı standart.",
  primaryCta = { label: "Şimdi Dene", href: "#pricing" },
  secondaryCta = { label: "Tüm Ürünler", href: "#categories" },
  bgClass = "bg-primary/10",
}: FeatureImageSectionProps) {
  return (
    <section className="bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
        {/* Image */}
        <div className={`relative ${bgClass} min-h-[320px] md:min-h-[560px] flex items-center justify-center overflow-hidden`}>
          {image ? (
            <img
              src={image}
              alt={imageAlt}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          ) : (
            // Placeholder — replace by passing the `image` prop
            <div className="flex flex-col items-center justify-center text-primary/60 p-8 text-center">
              <svg className="w-20 h-20 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-5-5L5 21" />
              </svg>
              <p className="text-xs font-semibold uppercase tracking-wider">Görsel buraya eklenecek</p>
            </div>
          )}
        </div>

        {/* Text */}
        <div className="bg-white flex items-center px-6 py-12 md:px-14 md:py-20">
          <div className="max-w-md">
            {eyebrow && (
              <p className="k5-reveal text-[12px] font-bold uppercase tracking-[1.5px] text-primary mb-3">
                {eyebrow}
              </p>
            )}
            <h2 className="k5-reveal d1 text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight mb-5">
              {title}
            </h2>
            <p className="k5-reveal d2 text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              {description}
            </p>
            <div className="k5-reveal d3 flex flex-wrap gap-3">
              <a
                href={primaryCta.href}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-bold hover:bg-primary-medium transition-colors"
              >
                {primaryCta.label}
              </a>
              {secondaryCta && (
                <a
                  href={secondaryCta.href}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-background text-primary text-sm font-bold border border-primary hover:bg-primary/5 transition-colors"
                >
                  {secondaryCta.label}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
