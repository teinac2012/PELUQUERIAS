"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Testimonials() {
  const sectionRef = useScrollAnimation();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setActive((p) => (p + 1) % testimonials.length), []);
  const prev = useCallback(() => setActive((p) => (p - 1 + testimonials.length) % testimonials.length), []);

  // Auto-advance carousel
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const t = testimonials[active];

  return (
    <section
      id="testimonios"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-28 section-vivid-1 overflow-hidden"
    >
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="anim mb-16 text-center">
          <p className="text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">
            Testimonios
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            Lo que dicen{" "}
            <span className="text-gradient-gold">nuestros clientes</span>
          </h2>
        </div>

        {/* Carousel */}
        <div
          className="anim relative max-w-3xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Quote icon */}
          <div className="flex justify-center mb-8">
            <div className="rounded-2xl bg-gold-400/10 border border-gold-400/20 p-4">
              <Quote className="h-6 w-6 text-gold-400" />
            </div>
          </div>

          {/* Testimonial card */}
          <div
            key={active}
            className="rounded-3xl border border-white/8 bg-white/3 p-8 md:p-12 text-center"
            style={{ animation: "fadeUp 0.5s ease-out forwards" }}
          >
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {Array(t.rating).fill(0).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
              ))}
            </div>

            {/* Text */}
            <blockquote className="text-white/80 text-lg md:text-xl leading-relaxed mb-8 font-light">
              &ldquo;{t.text}&rdquo;
            </blockquote>

            {/* Service badge */}
            <span className="inline-block rounded-full border border-gold-400/20 bg-gold-400/8 px-3 py-1 text-xs text-gold-300 font-medium mb-8">
              Servicio: {t.service}
            </span>

            {/* Author */}
            <div className="flex items-center justify-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-gold-400/30">
                <Image src={t.avatar} alt={t.name} fill className="object-cover" sizes="48px" />
              </div>
              <div className="text-left">
                <div className="text-white font-semibold text-sm">{t.name}</div>
                <div className="text-white/40 text-xs">{t.role}</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="rounded-full border border-white/10 bg-white/5 p-3 text-white/50 hover:border-gold-400/40 hover:text-gold-400 transition-all duration-200"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? "w-6 bg-gold-400" : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="rounded-full border border-white/10 bg-white/5 p-3 text-white/50 hover:border-gold-400/40 hover:text-gold-400 transition-all duration-200"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Trust bar */}
        <div className="anim mt-20 flex flex-wrap items-center justify-center gap-10 border-t border-white/5 pt-12">
          {[
            { value: "4.9/5", label: "Google Reviews" },
            { value: "500+", label: "Clientes activos" },
            { value: "98%", label: "Satisfacción" },
            { value: "+8 años", label: "De experiencia" },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-2xl font-bold text-gold-400">{item.value}</div>
              <div className="text-white/40 text-xs mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
