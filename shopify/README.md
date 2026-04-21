# Shopify Liquid Sections — .ki Balance

Bu klasör, projedeki React component'lerinin **Shopify Liquid section** karşılıklarını içerir.
Her dosya, Shopify theme editor'da **sürükle-bırak edilebilir bir section**'dır.
Renk, metin, görsel, buton vb. her şey **schema settings** üzerinden merchant tarafından düzenlenebilir.

## Klasör yapısı

```
shopify/
├── README.md              # Bu dosya
├── sections/              # Her React component için .liquid section
│   ├── ki-urgency-bar.liquid
│   ├── ki-product-hero.liquid
│   ├── ki-pricing.liquid
│   ├── ki-reviews.liquid
│   ├── ki-video-testimonials.liquid
│   ├── ki-ingredients.liquid
│   ├── ki-before-after.liquid
│   ├── ki-how-it-works.liquid
│   ├── ki-faq.liquid
│   ├── ki-product-story.liquid
│   ├── ki-manifesto.liquid
│   ├── ki-categories.liquid
│   ├── ki-feature-image.liquid
│   ├── ki-shop-bestsellers.liquid
│   ├── ki-trust-bar.liquid
│   ├── ki-ritual-categories.liquid
│   └── ki-story-strip.liquid
├── snippets/              # Tekrar kullanılan parçalar
│   └── ki-styles.liquid   # Ortak CSS tokens (mor paleti vb.)
├── templates/             # Sayfa şablonları
│   └── page.ki-landing.json   # Tüm section'ları birleştiren landing page
└── config/
    └── settings_schema.json   # Global theme ayarları (marka rengi vb.)
```

## Kurulum

### 1. Shopify CLI ile (önerilen)

```bash
# Theme klasörüne gel
cd path/to/your-shopify-theme

# Bu klasördeki dosyaları kopyala
cp -r shopify/sections/* sections/
cp -r shopify/snippets/* snippets/
cp -r shopify/templates/* templates/

# Theme'i push et
shopify theme push
```

### 2. Manuel (Shopify Admin > Themes > Edit code)

1. Admin > Online Store > Themes > **Edit code**
2. `Sections` altına her `.liquid` dosyayı **Add a new section** ile ekle
3. `Snippets` altına `ki-styles.liquid` dosyasını ekle
4. `Templates` altına `page.ki-landing.json` ekle
5. Online Store > Pages > yeni sayfa oluştur, template olarak **page.ki-landing** seç

### 3. Theme editor'de düzenleme

- Pages > .ki Landing sayfasını aç
- Customize'a tıkla
- Her section'a tıklayıp **renk, başlık, görsel, buton metni** vb. değiştir
- Sürükle-bırak ile sıralamayı değiştir, section ekle/çıkar

## Renk paleti (global)

Ortak `--ki-primary` (mor), `--ki-rose`, `--ki-amber`, `--ki-sage` token'ları
`snippets/ki-styles.liquid` içinde tanımlı. Theme settings'den global olarak
değiştirilebilir.

## React ↔ Liquid eşleşmesi

| React component                | Liquid section                  |
| ------------------------------ | ------------------------------- |
| `UrgencyBar.tsx`               | `ki-urgency-bar.liquid`         |
| `ProductGallery + Pricing` üstü | `ki-product-hero.liquid`        |
| `PricingSection.tsx`           | `ki-pricing.liquid`             |
| `ReviewsSection.tsx`           | `ki-reviews.liquid`             |
| `VideoTestimonials.tsx`        | `ki-video-testimonials.liquid`  |
| `IngredientsSection.tsx`       | `ki-ingredients.liquid`         |
| `BeforeAfter.tsx`              | `ki-before-after.liquid`        |
| `HowItWorksSection.tsx`        | `ki-how-it-works.liquid`        |
| `FAQSection` (Index içinde)    | `ki-faq.liquid`                 |
| `ProductStory.tsx`             | `ki-product-story.liquid`       |
| `ManifestoSection.tsx`         | `ki-manifesto.liquid`           |
| `CategoriesSection.tsx`        | `ki-categories.liquid`          |
| `FeatureImageSection.tsx`      | `ki-feature-image.liquid`       |
| `ShopBestsellers.tsx`          | `ki-shop-bestsellers.liquid`    |
| `TrustBar.tsx`                 | `ki-trust-bar.liquid`           |
| `RitualCategories.tsx`         | `ki-ritual-categories.liquid`   |
| `StoryStrip.tsx`               | `ki-story-strip.liquid`         |

## Notlar

- **Ürün bağlantısı**: `ki-pricing` ve `ki-shop-bestsellers` section'ları gerçek Shopify ürünlerine bağlanabilir (schema'da `product` tipi setting var).
- **Animasyonlar**: ProductStory gibi karmaşık scroll animasyonları için inline `<script>` ve CSS Liquid içine gömüldü; Shopify theme'larda standart yöntem budur.
- **Tailwind**: Liquid versiyonu Tailwind kullanmaz — saf CSS ile aynı görünüm üretildi (theme bağımsızlığı için).
