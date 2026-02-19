import Image from "next/image";
import { loadData } from "@/lib/data";

export const dynamic = "force-dynamic";

// Helper function to extract YouTube video ID from URL
function getYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

// Helper function to get YouTube embed URL
function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`;
}

// Helper function to get YouTube thumbnail URL
function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

export default function TestimoniPage() {
  const data = loadData();
  const testimonials = [...(data.testimonials || [])].sort((a, b) => a.order - b.order);
  const videoId = data.testimonialsVideoUrl ? getYouTubeVideoId(data.testimonialsVideoUrl) : null;
  const sections = data.testimonialsPage || {};

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-end md:items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {data.testimonialsHeroImage ? (
            <Image
              src={data.testimonialsHeroImage}
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
              {sections.heroTitle ? (
                sections.heroTitle.split('\n').map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))
              ) : (
                <>
                  <span className="block">Kata Mereka</span>
                  <span className="block">Tentang Atedia</span>
                </>
              )}
            </h1>
            {sections.heroSubtitle && (
              <p className="text-lg md:text-xl font-semibold text-white">
                {sections.heroSubtitle}
              </p>
            )}
            <p className="text-base md:text-lg leading-relaxed text-[#F3F4F6]">
              {sections.heroDescription || "Dengarkan pengalaman dan apresiasi dari keluarga dan warga Atedia. Setiap cerita adalah bukti komitmen kami untuk memberikan perawatan terbaik dan menciptakan lingkungan yang penuh kasih sayang."}
            </p>
          </div>
        </div>
      </section>

      {/* Testimoni Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-atedia-sage text-center mb-12">
            Testimoni Kami
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white flex flex-col"
              >
                {/* Gambar testimoni */}
                <div className="w-full aspect-[4/3] relative bg-atedia-cream mb-4 rounded-lg overflow-hidden">
                  {t.image ? (
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      className="object-cover"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-atedia-sage text-4xl font-bold">
                      {t.name.charAt(0)}
                    </div>
                  )}
                </div>
                {/* Nama dan role */}
                <div className="mb-3 text-center">
                  <p className="font-semibold text-atedia-sage">
                    {t.name}
                  </p>
                  {t.role && (
                    <p className="text-sm text-atedia-brown/80 mt-1">
                      {t.role}
                    </p>
                  )}
                </div>
                {/* Quote */}
                <blockquote className="text-atedia-brown text-base leading-relaxed text-center">
                  {t.quote}
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section - Kisah Nyata Bersama Atedia */}
      {data.testimonialsVideoUrl && videoId && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl overflow-hidden flex flex-col md:flex-row gap-0 shadow-lg">
              {/* Video embed di kiri */}
              <div className="md:w-1/2 aspect-video relative bg-atedia-cream rounded-t-2xl md:rounded-t-none md:rounded-l-2xl overflow-hidden">
                <iframe
                  src={getYouTubeEmbedUrl(videoId)}
                  title="Video testimoni Atedia"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
              {/* Konten di kanan */}
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-atedia-sage mb-6">
                  {data.testimonialsVideoTitle || "Kisah Nyata Bersama Atedia"}
                </h2>
                <p className="text-atedia-brown text-base md:text-lg leading-relaxed">
                  {data.testimonialsVideoDescription ||
                    "Saksikan pengalaman langsung dari penghuni dan keluarga yang telah merasakan kenyamanan, perhatian, dan kualitas hidup yang lebih baik di Atedia Senior Center. Testimoni ini menggambarkan bagaimana Atedia menjadi rumah kedua yang hangat, aman, dan penuh kebersamaan."}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
      
    </div>
  );
}
