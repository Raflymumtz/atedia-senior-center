import Image from "next/image";
import { loadData } from "@/lib/data";
import ImageCarousel from "@/components/ImageCarousel";
import ServiceHeroCarousel from "@/components/ServiceHeroCarousel";

export const dynamic = "force-dynamic";

const AUTO_SLIDE_MS = 3000;

export default function ServicePage() {
  const data = loadData();
  const services = [...(data.services || [])].sort((a, b) => a.order - b.order);
  const sp = data.servicePage;

  const heroTitle = sp?.heroTitle ?? "Pendampingan Sepenuh Hati";
  const heroCaption =
    sp?.heroCaption ??
    "Kami mendampingi setiap langkah dengan perhatian yang tulus, menciptakan hari-hari yang lebih nyaman, aktif, dan penuh ketenangan.";
  const heroSlides = (sp?.heroSlides || []).filter(Boolean);
  const heroFallbackImage = heroSlides.length === 0 ? data.servicesHeroImage : null;

  const sectionTitle = sp?.sectionTitle ?? "Layanan Profesional Kami";
  const sectionCaption1 =
    sp?.sectionCaption1 ??
    "Kami menyediakan berbagai layanan profesional yang dirancang khusus untuk memenuhi kebutuhan warga Atedia. Setiap layanan diberikan dengan pendampingan penuh perhatian dan komitmen untuk memberikan kualitas terbaik.";
  const sectionCaption2 =
    sp?.sectionCaption2 ??
    "Dari perawatan kesehatan hingga aktivitas rekreasi, kami memastikan setiap warga mendapatkan dukungan yang dibutuhkan untuk menjalani hari-hari dengan nyaman, aman, dan bahagia. Tim profesional kami siap mendampingi dengan penuh dedikasi.";
  const carouselSlides = (sp?.carouselSlides || []).filter(Boolean);
  const carouselFallback = services.filter((s) => s.image).map((s) => s.image!);

  return (
    <div className="pb-16 bg-white">
      {/* Hero: carousel multi gambar (auto-slide 3 detik) atau gambar tunggal */}
      {heroSlides.length > 0 ? (
        <ServiceHeroCarousel images={heroSlides} title={heroTitle} caption={heroCaption} />
      ) : (
        <section className="relative min-h-[85vh] flex items-end md:items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            {heroFallbackImage ? (
              <Image
                src={heroFallbackImage}
                alt=""
                fill
                className="object-cover object-center grayscale-[0.3]"
                sizes="100vw"
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-atedia-brown" />
            )}
            <div className="absolute inset-0 z-[1] bg-black/55" aria-hidden />
          </div>
          <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-16 md:py-24 text-left">
            <div className="max-w-2xl space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
                {heroTitle.split(" ").map((word, i) => (
                  <span key={i} className="block">
                    {word}
                  </span>
                ))}
              </h1>
              <p className="text-base md:text-lg leading-relaxed text-[#F3F4F6]">{heroCaption}</p>
            </div>
          </div>
        </section>
      )}

      {/* Section Layanan Kami (kartu layanan) */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-atedia-sage text-center mb-8">
            Layanan Kami
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div
                key={s.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="aspect-[4/3] relative bg-atedia-cream">
                  {s.image ? (
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-atedia-brown/40">
                      <span className="text-4xl font-bold">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                  )}
                  <span className="absolute top-4 left-4 bg-atedia-sage/90 text-white px-3 py-1 rounded-lg text-sm font-medium">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-atedia-brown mb-1.5">{s.title}</h3>
                  <p className="text-atedia-brown/80">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Layanan Profesional Kami: carousel (auto 3 detik) + caption */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
            <div className="w-full md:w-1/2">
              <ImageCarousel
                images={carouselSlides.length > 0 ? carouselSlides : carouselFallback}
                autoSlideInterval={AUTO_SLIDE_MS}
              />
            </div>
            <div className="w-full md:w-1/2 space-y-4 -mt-12">
              <h2 className="text-4xl md:text-5xl font-bold text-atedia-sage mb-7">{sectionTitle}</h2>
              <p className="text-atedia-brown text-base md:text-lg leading-relaxed text-justify">
                {sectionCaption1}
              </p>
              <p className="text-atedia-brown text-base md:text-lg leading-relaxed text-justify">
                {sectionCaption2}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
