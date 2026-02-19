"use client";

import Image from "next/image";

// Helper function to get YouTube thumbnail URL
function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

interface TestimoniVideoSectionProps {
  videoId: string;
  videoUrl: string;
  title?: string;
  description?: string;
}

export default function TestimoniVideoSection({
  videoId,
  videoUrl,
  title = "Kisah Nyata Bersama Atedia",
  description = "Saksikan pengalaman langsung dari penghuni dan keluarga yang telah merasakan kenyamanan, perhatian, dan kualitas hidup yang lebih baik di Atedia Senior Center. Testimoni ini menggambarkan bagaimana Atedia menjadi rumah kedua yang hangat, aman, dan penuh kebersamaan.",
}: TestimoniVideoSectionProps) {
  const handleVideoClick = () => {
    if (videoUrl) {
      window.open(videoUrl, "_blank");
    }
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl overflow-hidden flex flex-col md:flex-row gap-0 shadow-lg">
          {/* Video thumbnail di kiri */}
          <div
            className="md:w-1/2 aspect-video relative bg-atedia-cream rounded-t-2xl md:rounded-t-none md:rounded-l-2xl overflow-hidden cursor-pointer group"
            onClick={handleVideoClick}
          >
            <Image
              src={getYouTubeThumbnail(videoId)}
              alt="Video testimoni Atedia"
              fill
              className="object-cover group-hover:scale-105 transition-transform"
              sizes="(max-width:768px) 100vw, 50vw"
            />
            {/* YouTube play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg
                  className="w-10 h-10 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
          {/* Konten di kanan */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-atedia-sage mb-6">
              {title}
            </h2>
            <p className="text-atedia-brown text-base md:text-lg leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
