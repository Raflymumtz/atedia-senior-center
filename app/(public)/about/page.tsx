import Image from "next/image";
import { loadData } from "@/lib/data";

export const dynamic = "force-dynamic";

function LeafDecoration() {
  return (
    <svg
      className="w-12 h-12 md:w-16 md:h-16 text-atedia-sage/60 flex-shrink-0"
      viewBox="0 0 64 64"
      fill="currentColor"
    >
      <path
        d="M32 8c-4 12-12 20-20 24 8-4 16-12 20-24 4 12 12 20 20 24-8-4-16-12-20-24z"
        opacity="0.7"
      />
      <path
        d="M32 56c4-12 12-20 20-24-8 4-16 12-20 24-4-12-12-20-20-24 8 4 16 12 20 24z"
        opacity="0.5"
      />
    </svg>
  );
}

export default function AboutPage() {
  const data = loadData();
  const about = data.about;
  const tagline = about.tagline || "Meningkatkan Kualitas Hidup dengan Perawatan Profesional";

  return (
    <div>
      {/* Hero Section - seperti desain home */}
      <section className="relative min-h-[50vh] flex items-end md:items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {about.footerBannerImage ? (
            <Image
              src={about.footerBannerImage}
              alt=""
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-atedia-brown" />
          )}
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
            }}
          />
        </div>
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-16 md:py-24 text-white text-left">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              {about.title}
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-white/95">
              {about.description}
            </p>
          </div>
        </div>
      </section>

      {/* Section dekoratif dengan daun - seperti home */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-4 md:gap-8 flex-wrap">
          <LeafDecoration />
          <h2 className="text-2xl md:text-3xl font-medium text-atedia-sage italic text-center">
            {tagline}
          </h2>
          <LeafDecoration />
        </div>
      </section>

      {/* Blok Informasi + Kontak (tema seperti footer desain: putih, ceklist, tombol WA & Get Directions) */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden p-6 md:p-10">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-8">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-atedia-brown mb-4">Informasi</h3>
                <ul className="space-y-3">
                  {(about.infoItems || []).map((item, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-atedia-sage flex items-center justify-center mt-0.5">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      <span className="text-atedia-brown/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-atedia-brown mb-4">Kontak</h3>
                <ul className="space-y-2 text-atedia-brown/90">
                  {about.address && (
                    <li className="flex gap-2 items-start">
                      <span className="text-atedia-sage mt-0.5">📍</span>
                      <span>{about.address}</span>
                    </li>
                  )}
                  {about.phone && (
                    <li className="flex gap-2 items-center">
                      <span className="text-atedia-sage">📞</span>
                      <a href={`tel:${about.phone}`} className="hover:text-atedia-sage">
                        {about.phone}
                      </a>
                    </li>
                  )}
                  {about.email && (
                    <li className="flex gap-2 items-center">
                      <span className="text-atedia-sage">✉️</span>
                      <a
                        href={`mailto:${about.email}`}
                        className="hover:text-atedia-sage"
                      >
                        {about.email}
                      </a>
                    </li>
                  )}
                  {about.hours && (
                    <li className="flex gap-2 items-start">
                      <span className="text-atedia-sage mt-0.5">🕐</span>
                      <span>Jam: {about.hours}</span>
                    </li>
                  )}
                </ul>
                <div className="flex flex-wrap gap-3 mt-6">
                  {about.whatsapp && (
                    <a
                      href={`https://wa.me/${about.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#25D366] text-white font-medium hover:opacity-90 transition"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp
                    </a>
                  )}
                  {(about.address || about.mapEmbedUrl) && (
                    <a
                      href={
                        about.address
                          ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(about.address)}`
                          : about.mapEmbedUrl || "#"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 border-atedia-sage text-atedia-sage font-medium hover:bg-atedia-sage hover:text-white transition"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Get Directions
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Peta */}
            {about.mapEmbedUrl && (
              <div className="mt-8 rounded-xl overflow-hidden border border-gray-100">
                <iframe
                  src={about.mapEmbedUrl}
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Atedia Senior Center"
                  className="rounded-xl"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Deskripsi, Misi, Visi - kartu putih */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="bg-atedia-cream/50 rounded-2xl shadow-md p-8 md:p-12 border border-atedia-warm/20">
            <p className="text-atedia-brown/90 leading-relaxed mb-8 text-lg">
              {about.description}
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {about.mission && (
                <div>
                  <h3 className="text-lg font-semibold text-atedia-sage mb-2">Misi</h3>
                  <p className="text-atedia-brown/80">{about.mission}</p>
                </div>
              )}
              {about.vision && (
                <div>
                  <h3 className="text-lg font-semibold text-atedia-sage mb-2">Visi</h3>
                  <p className="text-atedia-brown/80">{about.vision}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
