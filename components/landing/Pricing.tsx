"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { pricingPlans } from "@/lib/data";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Pricing() {
  const sectionRef = useScrollAnimation();
  const [annual, setAnnual] = useState(false);

  return (
    <section
      id="precios"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-28 bg-onyx-2"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-400/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="anim mb-6 text-center">
          <p className="text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">
            Precios y Planes
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">
            Lleva tu negocio al{" "}
            <span className="text-gradient-gold">siguiente nivel</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Empieza gratis, escala cuando crezcas. Sin permanencia, sin sorpresas.
          </p>
        </div>

        {/* Toggle annual/monthly */}
        <div className="anim mb-14 flex items-center justify-center gap-4">
          <span className={`text-sm font-medium ${!annual ? "text-white" : "text-white/40"}`}>Mensual</span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`relative h-6 w-11 rounded-full border transition-all duration-300 ${
              annual ? "bg-gold-400 border-gold-400" : "bg-white/10 border-white/20"
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-300 ${
                annual ? "left-5.5" : "left-0.5"
              }`}
            />
          </button>
          <span className={`text-sm font-medium ${annual ? "text-white" : "text-white/40"}`}>
            Anual
            <span className="ml-2 rounded-full bg-emerald-500/15 border border-emerald-500/25 px-2 py-0.5 text-emerald-400 text-[10px] font-bold">
              -20%
            </span>
          </span>
        </div>

        {/* Plans grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {pricingPlans.map((plan) => {
            const displayPrice = annual && plan.price > 0
              ? Math.round(plan.price * 0.8)
              : plan.price;

            return (
              <div
                key={plan.id}
                className={`anim relative flex flex-col rounded-3xl border p-8 transition-all duration-300 ${
                  plan.highlighted
                    ? "border-gold-400/40 bg-gradient-to-b from-gold-400/8 to-transparent shadow-2xl shadow-gold-400/10 scale-[1.02]"
                    : "border-white/8 bg-white/3 hover:border-white/15"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gold-400 px-4 py-1 text-xs font-bold text-onyx uppercase tracking-widest whitespace-nowrap">
                    Más popular
                  </div>
                )}

                {/* Plan name & desc */}
                <div className="mb-6">
                  <h3 className="font-display text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-8 pb-8 border-b border-white/8">
                  {plan.price === 0 ? (
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-5xl font-bold text-white">Gratis</span>
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-white/50 text-xl">€</span>
                      <span className="font-display text-5xl font-bold text-white">{displayPrice}</span>
                      <span className="text-white/40 text-sm">/ {annual ? "mes (anual)" : "mes"}</span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="mb-8 flex-1 space-y-3">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3">
                      <Check className="h-4 w-4 mt-0.5 shrink-0 text-gold-400" />
                      <span className="text-white/70 text-sm">{feat}</span>
                    </li>
                  ))}
                  {(plan.notIncluded ?? []).map((feat) => (
                    <li key={feat} className="flex items-start gap-3">
                      <X className="h-4 w-4 mt-0.5 shrink-0 text-white/20" />
                      <span className="text-white/25 text-sm line-through">{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/booking"
                  className={`block text-center rounded-full py-3.5 text-sm font-bold transition-all duration-300 ${
                    plan.highlighted
                      ? "bg-gold-400 text-onyx hover:bg-gold-300 hover:shadow-lg hover:shadow-gold-400/30 hover:scale-[1.02]"
                      : "border border-white/15 text-white hover:border-white/30 hover:bg-white/5"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom notice */}
        <div className="anim mt-12 text-center text-white/30 text-sm">
          Todos los planes incluyen SSL, copias de seguridad diarias y actualizaciones automáticas.
          <br />
          <span className="text-white/20">¿Tienes preguntas? Escríbenos a{" "}
            <a href="mailto:hola@studionova.es" className="text-gold-400/60 hover:text-gold-400 transition-colors">
              hola@studionova.es
            </a>
          </span>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  );
}
