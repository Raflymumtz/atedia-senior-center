import Image from "next/image";
import { loadData } from "@/lib/data";
import ImageCarousel from "@/components/ImageCarousel";

export const dynamic = "force-dynamic";

export default function ServicePage() {
  const data = loadData();
  const services = [...(data.services || [])].sort((a, b) => a.order - b.order);
  const gallery = [...(data.gallery || [])].sort((a, b) => a.order - b.order);
  
  // Ambil gambar untuk carousel dari services atau gallery
  const serviceImages = services
    .filter((s) => s.image)
    .map((s) => s.image!)
    .slice(0, 5);
  
  // Jika service images kosong, gunakan gambar dari gallery
  const fallbackImages = gallery
    .filter((g) => g.image)
    .map((g) => g.image!)
    .slice(0, 5);
  
  const images = serviceImages.length > 0 ? serviceImages : fallbackImages;

  return (
    <div>
      {/* Hero Section - seperti desain facilities */}
      <section className="relative min-h-[85vh] flex items-end md:items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {data.servicesHeroImage ? (
            <Image
              src={data.servicesHeroImage}
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
              <span className="block">Pendampingan</span>
              <span className="block">Sepenuh Hati</span>
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-[#F3F4F6]">
            Kami mendampingi setiap langkah dengan perhatian yang tulus, 
            menciptakan hari-hari yang lebih nyaman, aktif, dan penuh ketenangan. 
            </p>
          </div>
        </div>
      </section>

      {/* Section Konten Layanan */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-atedia-sage text-center mb-12">
            Layanan Kami
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <div className="p-6">
                <h3 className="text-xl font-bold text-atedia-brown mb-2">
                  {s.title}
                </h3>
                <p className="text-atedia-brown/80">{s.description}</p>
              </div>
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* Section dengan Carousel - Design dengan background putih */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            {/* Carousel di kiri */}
            <div className="w-full md:w-1/2">
              <ImageCarousel images={images} />
            </div>
            {/* Konten teks di kanan */}
            <div className="w-full md:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-atedia-sage">
                Layanan Profesional Kami
              </h2>
              <p className="text-atedia-brown text-base md:text-lg leading-relaxed">
                Kami menyediakan berbagai layanan profesional yang dirancang khusus untuk memenuhi kebutuhan warga Atedia. Setiap layanan diberikan dengan pendampingan penuh perhatian dan komitmen untuk memberikan kualitas terbaik.
              </p>
              <p className="text-atedia-brown text-base md:text-lg leading-relaxed">
                Dari perawatan kesehatan hingga aktivitas rekreasi, kami memastikan setiap warga mendapatkan dukungan yang dibutuhkan untuk menjalani hari-hari dengan nyaman, aman, dan bahagia. Tim profesional kami siap mendampingi dengan penuh dedikasi.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
