import Image from "next/image";
import { loadData } from "@/lib/data";

export const dynamic = "force-dynamic";

function LeafDecoration() {
  return (
    <svg className="w-12 h-12 md:w-16 md:h-16 text-atedia-sage/60 flex-shrink-0" viewBox="0 0 64 64" fill="currentColor">
      <path d="M32 8c-4 12-12 20-20 24 8-4 16-12 20-24 4 12 12 20 20 24-8-4-16-12-20-24z" opacity="0.7" />
      <path d="M32 56c4-12 12-20 20-24-8 4-16 12-20 24-4-12-12-20-20-24 8 4 16 12 20 24z" opacity="0.5" />
    </svg>
  );
}

export default function HomePage() {
  const data = loadData();
  const { home } = data;
  const features = [...(home.features || [])].sort((a, b) => a.order - b.order);
  const bullets = home.mengapaHarusBullets || [];
  const featuresTitle = home.featuresTitle || "Keistimewaan yang Kami Tawarkan";

  return (
    <div>
      {/* Hero Section - cover seperti desain: background gambar + overlay gelap + teks putih kiri */}
      <section className="relative min-h-[85vh] flex items-end md:items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {home.heroImage ? (
            <Image
              src={home.heroImage}
              alt=""
              fill
              className="object-cover object-center grayscale-[0.3]"
              sizes="100vw"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-atedia-brown" />
          )}
          {/* Overlay gelap di seluruh area agar teks putih terbaca */}
          <div
            className="absolute inset-0 z-[1] bg-black/55"
            aria-hidden
          />
        </div>
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-16 md:py-24 text-left">
          <div className="max-w-2xl space-y-8 md:space-y-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
              <span className="block">{home.heroTitle}</span>
              <span className="block">{home.heroSubtitle}</span>
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-[#F3F4F6]">
              {home.introParagraph1}
            </p>
            <p className="text-base md:text-lg leading-relaxed text-[#F3F4F6]/95">
              {home.introParagraph2}
            </p>
            <p className="hero-tagline pt-4">
              &ldquo;{home.tagline}&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Meningkatkan Kualitas Hidup - background gambar utuh (putih + bunga kiri/kanan) agar floral tidak terpotong */}
      <section className={`relative min-h-[200px] py-0 px-4 overflow-hidden ${home.sectionTitleBackgroundImage ? "bg-white" : "bg-black"}`}>
        {home.sectionTitleBackgroundImage && (
          <Image
            src={home.sectionTitleBackgroundImage}
            alt=""
            fill
            className="object-contain object-center"
            sizes="100vw"
          />
        )}
        <div className="relative z-10 max-w-4xl mx-auto text-center mt-7">
          <h2 className="caveat-heading text-center leading-tight">
            {(() => {
              const parts = home.sectionTitle.split(" dengan ");
              if (parts.length >= 2 && parts[1]) {
                return (
                  <>
                    <span className="block">{parts[0]}</span>
                    <span className="block">dengan {parts[1]}</span>
                  </>
                );
              }
              return home.sectionTitle;
            })()}
          </h2>
        </div>
      </section>

      {/* Mengapa Harus Atedia - judul hijau zaitun, bullet centang, gambar dari admin */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="relative w-full max-w-[434px] aspect-[434/601] order-2 md:order-1 rounded-2xl overflow-hidden bg-atedia-cream mx-auto md:mx-0">
              {home.mengapaHarusImage ? (
                <Image
                  src={home.mengapaHarusImage}
                  alt="Mengapa Harus Atedia"
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 434px"
                />
              ) : (
                <div className="w-full h-full" />
              )}
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-[2.25rem] md:text-[3rem] font-bold text-atedia-sage mb-8 leading-tight">
                {home.mengapaHarusTitle}
              </h2>
              <ul className="space-y-5">
                {bullets.map((item, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-atedia-sage flex items-center justify-center mt-0.5">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-gray-800 leading-relaxed text-lg md:text-xl">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Temukan Kenyamanan Sejati - banner gambar saja, tanpa teks */}
      <section className="relative w-full max-w-[1150px] mx-auto overflow-hidden" style={{ aspectRatio: "1604/732" }}>
        {home.temukanKenyamananImage ? (
          <Image
            src={home.temukanKenyamananImage}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1000px) 100vw, 1000px"
          />
        ) : (
          <div className="absolute inset-0 bg-atedia-sage" />
        )}
      </section>

      {/* Keistimewaan yang Kami Tawarkan - three cards with decorative leaves */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-12">
            <LeafDecoration />
            <h2 className="text-2xl md:text-3xl font-bold text-atedia-brown text-center">
              {featuresTitle}
            </h2>
            <LeafDecoration />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div
                key={f.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[4/3] relative bg-atedia-cream">
                  {f.image ? (
                    <Image
                      src={f.image}
                      alt={f.title}
                      fill
                      className="object-cover"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                  ) : null}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-atedia-brown mb-3">
                    {f.title}
                  </h3>
                  <p className="text-atedia-brown/80">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
