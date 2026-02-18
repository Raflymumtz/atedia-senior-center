import Image from "next/image";
import { loadData } from "@/lib/data";

export const dynamic = "force-dynamic";

export default function TestimoniPage() {
  const data = loadData();
  const testimonials = [...(data.testimonials || [])].sort((a, b) => a.order - b.order);

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="section-title text-center">Testimoni</h1>
        <p className="text-center text-atedia-brown/80 mb-12 max-w-2xl mx-auto">
          Pengalaman dan apresiasi dari keluarga dan warga Atedia.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-xl shadow-md p-6 border-l-4 border-atedia-sage hover:shadow-lg transition-shadow flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden bg-atedia-cream mb-4 flex-shrink-0">
                {t.image ? (
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-atedia-sage text-2xl font-bold">
                    {t.name.charAt(0)}
                  </div>
                )}
              </div>
              <blockquote className="text-atedia-brown/90 italic mb-4 flex-1">
                &quot;{t.quote}&quot;
              </blockquote>
              <p className="font-semibold text-atedia-sage">{t.name}</p>
              {t.role && (
                <p className="text-sm text-atedia-brown/70">{t.role}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
