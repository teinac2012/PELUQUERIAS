"use client";

import Image from "next/image";
import { galleryImages } from "@/lib/data";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ZoomIn } from "lucide-react";
import { useState } from "react";

export default function Gallery() {
  const sectionRef = useScrollAnimation();
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <>
      <section
        id="galeria"
        ref={sectionRef as React.RefObject<HTMLElement>}
        className="relative py-28 section-vivid-3"
      >
        {/* Top divider */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-400/15 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Header */}
          <div className="anim mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">
                Galería
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
                Nuestros{" "}
                <span className="text-gradient-gold">trabajos</span>
              </h2>
            </div>
            <p className="text-white/40 text-base max-w-sm text-right">
              Cada corte es una obra de arte. Déjate inspirar por nuestros mejores trabajos.
            </p>
          </div>

          {/* Gallery grid — asymmetric */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px] md:auto-rows-[240px]">
            {galleryImages.map((img, i) => {
              // Make some cells span more rows/cols for visual interest
              const isFeature = i === 0 || i === 3;
              const isWide    = i === 5;

              return (
                <button
                  key={i}
                  onClick={() => setLightbox(img.src)}
                  className={`anim group relative overflow-hidden rounded-2xl ${
                    isFeature ? "row-span-2" : ""
                  } ${isWide ? "col-span-2" : ""}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-onyx/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  {/* Zoom icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <div className="rounded-full bg-gold-400 p-3 shadow-lg shadow-gold-400/30 scale-75 group-hover:scale-100 transition-transform duration-300">
                      <ZoomIn className="h-5 w-5 text-onyx" />
                    </div>
                  </div>
                  {/* Caption */}
                  <div className="absolute bottom-3 left-3 opacity-0 transition-all duration-300 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                    <span className="text-white text-xs font-medium drop-shadow-lg">{img.alt}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom divider */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </section>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox}
              alt="Ampliar imagen"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <button
            className="absolute top-6 right-6 rounded-full border border-white/20 bg-black/60 p-2 text-white/60 hover:text-white transition-colors"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
