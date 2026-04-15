"use client";

import Link from "next/link";
import { Scissors, Layers, Star, Sparkles, Heart, Gem } from "lucide-react";
import { services } from "@/lib/data";
import { formatPrice, formatDuration } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import type { Service } from "@/lib/types";
import { useState } from "react";

const ICONS: Record<string, React.ElementType> = {
  scissors: Scissors,
  layers:   Layers,
  star:     Star,
  sparkles: Sparkles,
  heart:    Heart,
  gem:      Gem,
  palette:  Star, // fallback
};

function ServiceCard({ service }: { service: Service }) {
  const Icon = ICONS[service.icon] ?? Scissors;

  return (
    <div className="anim group relative flex flex-col rounded-2xl border border-white/8 bg-white/3 p-6 transition-all duration-400 hover:border-gold-400/30 hover:bg-white/5 hover:-translate-y-1 hover:shadow-2xl hover:shadow-gold-400/10">
      {service.popular && (
        <span className="absolute -top-3 left-5 rounded-full bg-gold-400 px-3 py-0.5 text-[10px] font-bold text-onyx uppercase tracking-widest">
          Popular
        </span>
      )}
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold-400/10 text-gold-400 transition-all duration-300 group-hover:bg-gold-400/20 group-hover:scale-110">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="font-display text-lg font-semibold text-white mb-2 group-hover:text-gold-300 transition-colors">
        {service.name}
      </h3>
      <p className="text-white/45 text-sm leading-relaxed mb-5 flex-1">
        {service.description}
      </p>
      <div className="flex items-center justify-between pt-4 border-t border-white/8">
        <span className="text-gold-400 font-bold text-lg">{formatPrice(service.price)}</span>
        <span className="text-white/35 text-xs">{formatDuration(service.duration)}</span>
      </div>
    </div>
  );
}

export default function Services() {
  const [tab, setTab] = useState<"hombre" | "mujer">("hombre");
  const sectionRef = useScrollAnimation();

  const filtered = services.filter((s) => s.category === tab);

  return (
    <section
      id="servicios"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-28 bg-onyx-2"
    >
      {/* Ambient top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="anim mb-16 max-w-2xl">
          <p className="text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">
            Nuestros Servicios
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
            Todo lo que necesitas,{" "}
            <span className="text-gradient-gold">en un solo lugar</span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed">
            Desde el corte más clásico hasta los tratamientos de última generación.
            Cada servicio es una experiencia diseñada para ti.
          </p>
        </div>

        {/* Tabs */}
        <div className="anim mb-10 inline-flex rounded-full border border-white/10 p-1">
          {(["hombre", "mujer"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setTab(cat)}
              className={`rounded-full px-7 py-2.5 text-sm font-semibold capitalize transition-all duration-300 ${
                tab === cat
                  ? "bg-gold-400 text-onyx shadow-md"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {cat === "hombre" ? "Caballero" : "Dama"}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* CTA */}
        <div className="anim mt-14 text-center">
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-8 py-4 font-bold text-onyx text-base transition-all duration-300 hover:bg-gold-300 hover:scale-105 hover:shadow-xl hover:shadow-gold-400/30"
          >
            Reservar ahora
          </Link>
          <p className="mt-3 text-white/30 text-sm">Sin coste de reserva · Cancelación gratuita 24h antes</p>
        </div>
      </div>

      {/* Ambient bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  );
}
