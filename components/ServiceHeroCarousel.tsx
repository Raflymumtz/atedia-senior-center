"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const AUTO_SLIDE_MS = 3000;

interface ServiceHeroCarouselProps {
  images: string[];
  title: string;
  caption: string;
}

export default function ServiceHeroCarousel({ images, title, caption }: ServiceHeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const t = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, AUTO_SLIDE_MS);
    return () => clearInterval(t);
  }, [images?.length]);

  const slides = images?.filter(Boolean) ?? [];
  const fallback = slides.length === 0;

  return (
    <section className="relative min-h-[85vh] flex items-end md:items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {!fallback && slides[currentIndex] ? (
          <Image
            key={slides[currentIndex]}
            src={slides[currentIndex]}
            alt=""
            fill
            className="object-cover object-center grayscale-[0.3] transition-opacity duration-500"
            sizes="100vw"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-atedia-brown" />
        )}
        <div className="absolute inset-0 z-[1] bg-black/55" aria-hidden />
      </div>
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-16 md:py-24 text-left">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
            {title.split(" ").map((word, i) => (
              <span key={i} className="block">
                {word}
              </span>
            ))}
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-[#F3F4F6]">
            {caption}
          </p>
        </div>
      </div>
    </section>
  );
}
