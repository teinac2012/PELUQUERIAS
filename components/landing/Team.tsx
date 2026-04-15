"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { staff } from "@/lib/data";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Link from "next/link";

export default function Team() {
  const sectionRef = useScrollAnimation();

  return (
    <section
      id="equipo"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-28 section-vivid-1"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="anim mb-16 text-center max-w-2xl mx-auto">
          <p className="text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">
            Nuestro Equipo
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">
            Expertos con{" "}
            <span className="text-gradient-gold">pasión por su arte</span>
          </h2>
          <p className="text-white/50 text-lg">
            Cada miembro de nuestro equipo es un profesional certificado con años
            de experiencia en las técnicas más avanzadas.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {staff.map((member) => (
            <div
              key={member.id}
              className="anim group relative flex flex-col items-center text-center rounded-2xl border border-white/8 bg-white/3 p-6 transition-all duration-400 hover:border-gold-400/30 hover:bg-white/5 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/40"
            >
              {/* Availability badge */}
              {member.available ? (
                <span className="absolute top-4 right-4 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                </span>
              ) : (
                <span className="absolute top-4 right-4 h-2.5 w-2.5 rounded-full bg-white/20" />
              )}

              {/* Avatar */}
              <div className="relative mb-5 h-20 w-20 overflow-hidden rounded-full border-2 border-gold-400/30 transition-all duration-300 group-hover:border-gold-400/60 group-hover:shadow-lg group-hover:shadow-gold-400/20">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>

              {/* Info */}
              <h3 className="font-display text-base font-semibold text-white mb-0.5 group-hover:text-gold-300 transition-colors">
                {member.name}
              </h3>
              <p className="text-gold-400/70 text-xs font-medium mb-3">{member.role}</p>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
                <span className="text-white/80 text-sm font-semibold">{member.rating}</span>
                <span className="text-white/30 text-xs">({member.reviews})</span>
              </div>

              {/* Specialties */}
              <div className="flex flex-wrap justify-center gap-1.5 mb-5">
                {member.specialties.slice(0, 2).map((spec) => (
                  <span
                    key={spec}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] text-white/50"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              {/* Experience */}
              <p className="text-white/30 text-xs mb-4">
                {member.experience} años de experiencia
              </p>

              {/* CTA */}
              <Link
                href="/booking"
                className={`w-full rounded-full py-2.5 text-xs font-bold transition-all duration-300 ${
                  member.available
                    ? "bg-gold-400/10 border border-gold-400/25 text-gold-400 hover:bg-gold-400 hover:text-onyx hover:border-gold-400"
                    : "border border-white/10 text-white/25 cursor-not-allowed"
                }`}
              >
                {member.available ? "Reservar con él/ella" : "No disponible hoy"}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
