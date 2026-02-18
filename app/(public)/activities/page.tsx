import Image from "next/image";
import { loadData } from "@/lib/data";

export const dynamic = "force-dynamic";

export default function ActivitiesPage() {
  const data = loadData();
  const activities = [...(data.activities || [])].sort((a, b) => a.order - b.order);
  const gallery = [...(data.gallery || [])].sort((a, b) => a.order - b.order);

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Aktivitas */}
        <h1 className="section-title">Hidup Bermakna Setiap Hari</h1>
        <p className="text-atedia-brown/80 mb-12 max-w-2xl">
          Di Atedia, setiap hari adalah kesempatan untuk tetap aktif, sehat, dan terhubung. Berbagai aktivitas dirancang untuk mendukung kesehatan fisik, menjaga ketajaman pikiran, serta mempererat kebersamaan.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {activities.map((a) => (
            <div
              key={a.id}
              className="bg-white rounded-xl shadow-md overflow-hidden group"
            >
              <div className="aspect-square relative bg-atedia-cream">
                {a.image ? (
                  <Image
                    src={a.image}
                    alt={a.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                    sizes="(max-width:768px) 100vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-atedia-brown/40 text-sm p-4 text-center">
                    Aktivitas
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <h3 className="text-white font-bold">{a.title}</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-atedia-brown/80 text-sm">{a.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Galeri Kami */}
        <h2 className="section-title text-center">Galeri Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((g) => (
            <div
              key={g.id}
              className="bg-white rounded-xl shadow-md overflow-hidden group"
            >
              <div className="aspect-[4/3] relative bg-atedia-cream">
                {g.image ? (
                  <Image
                    src={g.image}
                    alt={g.caption || "Galeri"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-atedia-brown/40">
                    -
                  </div>
                )}
              </div>
              {g.caption && (
                <p className="p-3 text-center text-atedia-brown/80 text-sm">
                  {g.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
