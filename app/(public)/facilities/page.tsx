import Image from "next/image";
import { loadData } from "@/lib/data";
import ImageCarousel from "@/components/ImageCarousel";

export const dynamic = "force-dynamic";

export default function FacilitiesPage() {
  const data = loadData();
  const main = [...(data.facilitiesMain || [])].sort((a, b) => a.order - b.order);
  const other = [...(data.facilitiesOther || [])].sort((a, b) => a.order - b.order);
  const gallery = [...(data.gallery || [])].sort((a, b) => a.order - b.order);
  const activities = [...(data.activities || [])].sort((a, b) => a.order - b.order);
  
  // Ambil gambar untuk carousel dari gallery atau facilitiesMain
  const carouselImages = gallery
    .filter((g) => g.image)
    .map((g) => g.image!)
    .slice(0, 5);
  
  // Jika gallery kosong, gunakan gambar dari facilitiesMain
  const fallbackImages = main
    .filter((f) => f.image)
    .map((f) => f.image!)
    .slice(0, 5);
  
  const images = carouselImages.length > 0 ? carouselImages : fallbackImages;
  
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
      {/* Hero Section - seperti desain home */}
      <section className="relative min-h-[85vh] flex items-end md:items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {data.facilitiesHeroImage ? (
            <Image
              src={data.facilitiesHeroImage}
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
              <span className="block">Kenyamanan yang</span>
              <span className="block">Menghadirkan</span>
              <span className="block">Rasa Tenang</span>
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-[#F3F4F6]">
            Memberikan dukungan hunian penuh waktu dengan pendampingan menyeluruh setiap hari menghadirkan kenyamanan, keamanan, dan perhatian yang konsisten.
              </p>
          </div>
        </div>
      </section>

      {/* Section Static - Design dengan background putih */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl overflow-hidden flex flex-col md:flex-row gap-0 shadow-lg">
            {/* Gambar di kiri dengan rounded corners */}
            <div className="md:w-1/2 aspect-video md:aspect-auto md:min-h-[500px] relative bg-atedia-cream rounded-t-2xl md:rounded-t-none md:rounded-l-2xl overflow-hidden">
              {main[0]?.image ? (
                <Image
                  src={main[0].image}
                  alt={main[0]?.title || "Senior Living"}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full bg-atedia-cream" />
              )}
            </div>
            {/* Konten di kanan */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
              <h3 className="text-2xl md:text-3xl font-bold text-atedia-sage mb-4">
                Senior Living
              </h3>
              <h4 className="text-2xl md:text-3xl font-bold text-black mb-6">
                Kehangatan untuk Hari Tua yang Bahagia
              </h4>
              <p className="text-black mb-8 text-base md:text-lg leading-relaxed">
                Kami menghadirkan program perawatan fleksibel, dari hunian penuh hingga kegiatan sosial yang mendukung kesejahteraan dan kebahagiaan warga.
              </p>
              {/* Info Boxes */}
              <div className="grid grid-cols-2 gap-4">
                {/* Box 1 - Tipe Kamar */}
                <div className="bg-atedia-sage rounded-lg p-4 flex flex-col items-center text-center">
                  <svg className="w-8 h-8 text-white mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <p className="text-black text-xs font-medium mb-1">Tipe Kamar</p>
                  <p className="text-black text-sm font-semibold">Personal | Sharing</p>
                </div>
                {/* Box 2 - Layanan */}
                <div className="bg-atedia-sage rounded-lg p-4 flex flex-col items-center text-center">
                  <svg className="w-8 h-8 text-white mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-black text-xs font-medium mb-1">Tipe Kamar</p>
                  <p className="text-black text-sm font-semibold">Personal | Sharing</p>
                </div>
              </div>
            </div>
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
                Fasilitas Kami
              </h2>
              <p className="text-atedia-brown text-base md:text-lg leading-relaxed">
                Setiap sudut dirancang untuk menghadirkan rasa aman dan kenyamanan seperti di rumah sendiri. Dengan lingkungan yang tertata rapi dan fasilitas yang memadai, dan dapat menjalani hari-hari dengan lebih tenang dan percaya diri.
              </p>
              <p className="text-atedia-brown text-base md:text-lg leading-relaxed">
                Didukung oleh pendamping yang penuh perhatian dan suasana yang hangat, setiap aktivitas dijalani dengan penuh makna. Kami berkomitmen memberikan perawatan terbaik.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fasilitas Lainnya */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-atedia-sage text-center mb-12">
            Fasilitas Lainnya
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {other.map((f) => (
              <div
                key={f.id}
                className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="aspect-square relative bg-atedia-cream rounded-xl overflow-hidden">
                  {f.image ? (
                    <Image
                      src={f.image}
                      alt={f.title}
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
                  {f.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Carousel Aktivitas */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="w-full">
            <ImageCarousel images={activityImages} />
          </div>
        </div>
      </section>

    </div>
  );
}
