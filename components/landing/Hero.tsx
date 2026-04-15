"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { loadAnime } from "@/lib/anime";

const TICKER_ITEMS = [
  "Corte Clásico", "Diseño de Barba", "Coloración", "Balayage",
  "Tratamiento Keratina", "Afeitado Tradicional", "Corte + Barba",
  "Peinado de Novia", "Manicura & Pedicura", "Tratamiento Capilar",
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadAnime().then((anime) => {
      anime.timeline({ easing: "easeOutExpo" })
        .add({
          targets: ".hero-badge",
          opacity: [0, 1],
          translateY: [-16, 0],
          duration: 700,
        })
        .add({
          targets: ".hero-eyebrow",
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 600,
        }, "-=300")
        .add({
          targets: ".hero-word",
          opacity: [0, 1],
          translateY: [60, 0],
          delay: anime.stagger(120),
          duration: 900,
        }, "-=400")
        .add({
          targets: ".hero-sub",
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 600,
        }, "-=500")
        .add({
          targets: ".hero-cta > *",
          opacity: [0, 1],
          translateY: [20, 0],
          delay: anime.stagger(80),
          duration: 500,
        }, "-=400")
        .add({
          targets: ".hero-stat",
          opacity: [0, 1],
          translateY: [15, 0],
          delay: anime.stagger(100),
          duration: 500,
        }, "-=300");
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-onyx"
    >
      {/* ── Deep gradient background ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-onyx via-onyx-2 to-[#0d0d08]" />

      {/* ── Ambient glow ── */}
      <div
        className="absolute top-1/3 left-1/3 w-[700px] h-[700px] rounded-full blur-[140px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(201,168,76,0.12) 0%, transparent 70%)",
          animation: "pulseGlow 6s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(212,114,138,0.07) 0%, transparent 70%)",
        }}
      />

      {/* ── Grid dots ── */}
      <div className="absolute inset-0 bg-grid-dots opacity-40 pointer-events-none" />

      {/* ── Thin horizontal lines decoration ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[28%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/10 to-transparent" />
        <div className="absolute top-[72%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/8 to-transparent" />
      </div>

      {/* ── Main content ── */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-36 pb-28">
        {/* Badge */}
        <div className="hero-badge opacity-0 mb-6 inline-flex items-center gap-2 rounded-full border border-gold-400/20 bg-gold-400/8 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
          <span className="text-gold-300 text-xs font-semibold tracking-widest uppercase">
            Est. 2018 · Madrid, España
          </span>
        </div>

        {/* Eyebrow */}
        <p className="hero-eyebrow opacity-0 text-white/30 text-sm font-semibold tracking-[0.3em] uppercase mb-4">
          Barbershop &amp; Beauty Salon
        </p>

        {/* Headline  — each word is independently animated */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-8 overflow-visible">
          {["El", "arte", "del"].map((w, i) => (
            <span key={i} className="hero-word opacity-0 inline-block mr-[0.25em]">{w}</span>
          ))}
          <br />
          <span className="hero-word opacity-0 inline-block text-gradient-gold">
            cuidado personal
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-sub opacity-0 max-w-xl text-white/55 text-lg md:text-xl leading-relaxed mb-12">
          Barbería premium y salón de belleza en el corazón de Madrid.
          Más de <strong className="text-white/80">500 clientes</strong> satisfechos
          confían en nuestros expertos cada mes.
        </p>

        {/* CTAs */}
        <div className="hero-cta flex flex-wrap gap-4 mb-20">
          <Link
            href="/booking"
            className="opacity-0 inline-flex items-center gap-2 rounded-full bg-gold-400 px-8 py-4 text-base font-bold text-onyx transition-all duration-300 hover:bg-gold-300 hover:scale-105 hover:shadow-xl hover:shadow-gold-400/30"
          >
            Reservar Cita
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="#galeria"
            className="opacity-0 inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 text-base font-medium text-white/80 transition-all duration-300 hover:border-gold-400/40 hover:text-gold-400"
          >
            Ver Galería
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 max-w-sm">
          {[
            { value: "500+", label: "Clientes satisfechos" },
            { value: "6",    label: "Especialistas" },
            { value: "4.9★", label: "Valoración media" },
          ].map((stat, i) => (
            <div key={i} className="hero-stat opacity-0">
              <div className="font-display text-2xl md:text-3xl font-bold text-gold-400">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-white/35 leading-snug">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25">
        <span className="text-[10px] tracking-widest uppercase font-medium">Scroll</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </div>

      {/* ── Ticker ── */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 overflow-hidden py-3">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "marquee 35s linear infinite" }}
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="mx-8 text-[10px] font-semibold tracking-[0.25em] uppercase text-white/20">
              {item}
              <span className="ml-8 text-gold-400/30">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
