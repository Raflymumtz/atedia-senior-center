import Image from "next/image";
import { loadData } from "@/lib/data";

export const dynamic = "force-dynamic";

export default function FacilitiesPage() {
  const data = loadData();
  const main = [...(data.facilitiesMain || [])].sort((a, b) => a.order - b.order);
  const other = [...(data.facilitiesOther || [])].sort((a, b) => a.order - b.order);

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Fasilitas Kami */}
        <h1 className="section-title">Fasilitas Kami</h1>
        <div className="space-y-8 mb-16">
          {main.map((f) => (
            <div
              key={f.id}
              className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row gap-6"
            >
              <div className="md:w-1/2 aspect-video md:aspect-auto md:min-h-[300px] relative bg-atedia-cream">
                {f.image ? (
                  <Image
                    src={f.image}
                    alt={f.title}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 50vw"
                  />
                ) : null}
              </div>
              <div className="md:w-1/2 p-6 flex flex-col justify-center">
                <h3 className="text-xl font-bold text-atedia-brown mb-3">
                  {f.title}
                </h3>
                <p className="text-atedia-brown/80">{f.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Fasilitas Lainnya */}
        <h2 className="section-title">Fasilitas Lainnya</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {other.map((f) => (
            <div
              key={f.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="aspect-square relative bg-atedia-cream">
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
              <p className="p-3 text-center font-medium text-atedia-brown text-sm">
                {f.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
