import Image from "next/image";
import { loadData } from "@/lib/data";

export const dynamic = "force-dynamic";

export default function ServicePage() {
  const data = loadData();
  const services = [...(data.services || [])].sort((a, b) => a.order - b.order);

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="section-title text-center">Layanan Kami</h1>
        <p className="text-center text-atedia-brown/80 mb-12 max-w-2xl mx-auto">
          Beragam layanan profesional untuk kenyamanan dan kesehatan warga Atedia.
        </p>
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
    </div>
  );
}
