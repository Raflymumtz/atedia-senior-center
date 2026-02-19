import Link from "next/link";
import Image from "next/image";
import { loadData } from "@/lib/data";

export default function PublicFooter() {
  const data = loadData();
  const about = data.about;
  const whatsappLink = about?.whatsapp
    ? `https://wa.me/${about.whatsapp.replace(/\D/g, "")}`
    : "#";
  const directionsLink =
    about?.directionsUrl ||
    (about?.address
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(about.address)}`
      : "#");

  const hasBgImage = !!about?.footerBackgroundImage;
  const bgColor = about?.footerBackgroundColor?.trim() || (hasBgImage ? undefined : undefined);

  return (
    <footer
      className="w-full text-white mt-auto overflow-hidden relative"
      style={
        !hasBgImage && bgColor
          ? { backgroundColor: bgColor }
          : undefined
      }
    >
      {hasBgImage && (
        <>
          <div className="absolute inset-0 z-0">
            <Image
              src={about.footerBackgroundImage}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 z-[1] bg-black/60" aria-hidden />
        </>
      )}
      {!hasBgImage && !bgColor && (
        <div className="absolute inset-0 z-0 bg-atedia-brown" aria-hidden />
      )}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 pt-7 pb-4 box-border">
        {/* Header: judul + CTA */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <div className="text-[28px] font-extrabold tracking-wide leading-tight">
              Atedia Senior Center
            </div>
            <div className="text-[13px] mt-1.5 leading-snug text-gray-200">
              Pelayanan & aktivitas untuk lansia dengan fasilitas nyaman, aman, dan profesional.
            </div>
          </div>
          <div className="flex gap-2.5 flex-wrap">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline bg-[#8a9a6f] text-white py-2.5 px-3.5 rounded-xl font-semibold text-[13px] inline-flex items-center gap-2 shadow-[0_6px_18px_rgba(0,0,0,0.15)] whitespace-nowrap"
            >
              💬 WhatsApp
            </a>
            <a
              href={directionsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline bg-white/15 text-white py-2.5 px-3.5 rounded-xl font-semibold text-[13px] inline-flex items-center gap-2 border border-white/30 whitespace-nowrap"
            >
              📍 Get Directions
            </a>
          </div>
        </div>

        {/* Grid: 3 kartu putih */}
        <div className="flex flex-wrap gap-3">
          {/* Card 1 - Informasi */}
          <div className="flex-1 min-w-[240px] bg-white rounded-[18px] p-[18px] shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
            <div className="font-bold mb-2.5 text-[15px] text-gray-900">
              Informasi
            </div>
            <div className="text-[13px] leading-relaxed text-gray-600">
              {(about?.infoItems || []).map((item, i) => (
                <div key={i} className="mb-1.5">
                  ✅ {item}
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-3 flex-wrap">
              <Link
                href="/about"
                className="text-atedia-sage no-underline font-semibold text-[13px] hover:underline"
              >
                Tentang Kami
              </Link>
              <Link
                href="/service"
                className="text-atedia-sage no-underline font-semibold text-[13px] hover:underline"
              >
                Program
              </Link>
              <Link
                href="/activities"
                className="text-atedia-sage no-underline font-semibold text-[13px] hover:underline"
              >
                Galeri
              </Link>
            </div>
          </div>

          {/* Card 2 - Kontak */}
          <div className="flex-1 min-w-[260px] bg-white rounded-[18px] p-[18px] shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
            <div className="font-bold mb-2.5 text-[15px] text-gray-900">
              Kontak
            </div>
            <div className="text-[13px] leading-[1.8] text-gray-600">
              {about?.address && (
                <div>
                  📍 <b>Alamat:</b> {about.address}
                </div>
              )}
              {about?.phone && (
                <div>
                  📞 <b>Telp:</b> {about.phone}
                </div>
              )}
              {about?.email && (
                <div>
                  ✉️ <b>Email:</b> {about.email}
                </div>
              )}
              {about?.hours && (
                <div>
                  🕒 <b>Jam:</b> {about.hours}
                </div>
              )}
            </div>
          </div>

          {/* Card 3 - Lokasi */}
          <div className="flex-1 min-w-[300px] bg-white rounded-[18px] p-[18px] shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
            <div className="font-bold mb-2.5 text-[15px] text-gray-900">
              Lokasi
            </div>
            {about?.mapEmbedUrl ? (
              <div className="rounded-[14px] overflow-hidden">
                <iframe
                  src={about.mapEmbedUrl}
                  width="100%"
                  height="170"
                  style={{ border: 0, display: "block" }}
                  loading="lazy"
                  title="Lokasi Atedia Senior Center"
                  className="w-full"
                />
              </div>
            ) : (
              <p className="text-[13px] text-gray-600">
                {about?.address || "-"}
              </p>
            )}
            <div className="text-xs text-gray-500 mt-2 leading-snug">
              Klik <b>Get Directions</b> untuk navigasi langsung dari Google Maps.
            </div>
          </div>
        </div>

        {/* Footer bawah: divider + copyright + links */}
        <div
          className="h-px bg-white/25 my-4"
          aria-hidden
        />
        <div className="flex flex-wrap gap-2.5 justify-between items-center text-xs text-gray-200">
          <div>© {new Date().getFullYear()} Atedia Senior Center. All Rights Reserved.</div>
          <div className="flex gap-3.5">
            <a
              href="#"
              className="text-white no-underline font-medium hover:underline"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-white no-underline font-medium hover:underline"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
