import Image from "next/image";
import { loadData } from "@/lib/data";
import ImageCarousel from "@/components/ImageCarousel";

export const dynamic = "force-dynamic";

export default function ActivitiesPage() {
  const data = loadData();
  const activities = [...(data.activities || [])].sort((a, b) => a.order - b.order);
  const gallery = [...(data.gallery || [])].sort((a, b) => a.order - b.order);
  
  // Gambar untuk carousel aktivitas
  const activityImages = activities
    .filter((a) => a.image)
    .map((a) => a.image!)
    .concat(
      gallery
        .filter((g) => g.image)
        .map((g) => g.image!)
    )
    .slice(0, 8);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-end md:items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {data.activitiesHeroImage ? (
            <Image
              src={data.activitiesHeroImage}
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
              <span className="block">Hidup Bermakna</span>
              <span className="block">Setiap Hari</span>
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-[#F3F4F6]">
              Di Atedia, setiap hari adalah kesempatan untuk tetap aktif, sehat, dan terhubung. Berbagai aktivitas dirancang untuk mendukung kesehatan fisik, menjaga ketajaman pikiran, serta mempererat kebersamaan.
            </p>
          </div>
        </div>
      </section>

      {/* Aktivitas Kami */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-atedia-sage text-center mb-12">
            Aktivitas Kami
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {activities.map((a) => (
              <div
                key={a.id}
                className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="aspect-square relative bg-atedia-cream rounded-xl overflow-hidden">
                  {a.image ? (
                    <Image
                      src={a.image}
                      alt={a.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                      sizes="(max-width:768px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-atedia-brown/40 text-sm">
                      Tidak ada gambar
                    </div>
                  )}
                </div>
                <p className="p-4 text-center font-medium text-atedia-brown text-sm md:text-base">
                  {a.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Carousel Aktivitas */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-atedia-sage text-center mb-12">
            Galeri Kami
          </h2>
          <div className="w-full">
            <ImageCarousel images={activityImages} />
          </div>
        </div>
      </section>

      {/* Section CTA - Ciptakan Pengalaman Tak Terlupakan */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl overflow-hidden flex flex-col md:flex-row gap-0 shadow-lg">
            {/* Gambar di kiri dengan rounded corners */}
            <div className="md:w-1/2 aspect-video md:aspect-auto md:min-h-[500px] relative bg-atedia-cream rounded-t-2xl md:rounded-t-none md:rounded-l-2xl overflow-hidden">
              {data.activitiesCTAImage ? (
                <Image
                  src={data.activitiesCTAImage}
                  alt="Atedia Senior Center"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width:768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full bg-atedia-cream" />
              )}
            </div>
            {/* Konten di kanan */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-atedia-sage mb-6">
                {data.activitiesCTATitle || "Ciptakan Pengalaman Tak Terlupakan di Atedia"}
              </h2>
              <p className="text-atedia-brown mb-6 text-base md:text-lg leading-relaxed">
                {data.activitiesCTAParagraph1 ||
                  "Nikmati suasana yang hangat, nyaman, dan penuh makna di setiap momen yang Anda habiskan. Di Atedia, setiap detail dirancang untuk menghadirkan pengalaman istimewa. Dengan layanan profesional, fasilitas yang mendukung gaya hidup aktif dan sehat, serta komunitas yang saling peduli, kami memastikan setiap hari terasa lebih bermakna dan membahagiakan."}
              </p>
              <p className="text-atedia-brown mb-8 text-base md:text-lg leading-relaxed">
                {data.activitiesCTAParagraph2 ||
                  "Setiap tawa yang tercipta, setiap cerita yang dibagikan, dan setiap kebersamaan yang terjalin menjadi bagian dari perjalanan hidup yang indah. Kami memahami bahwa setiap individu memiliki kisah dan kenangan berharga, karena itu Atedia hadir untuk merawat, menghargai, dan menemani setiap langkah dengan penuh cinta dan perhatian."}
              </p>
              <a
                href={data.activitiesCTAButtonLink || "#"}
                className="inline-block bg-atedia-sage hover:bg-atedia-brown text-white font-semibold py-3 px-8 rounded-lg transition-colors text-center"
              >
                {data.activitiesCTAButtonText || "Book Senior Living"}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
