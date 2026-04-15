"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Scissors } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Servicios",    href: "#servicios" },
  { label: "Equipo",       href: "#equipo" },
  { label: "Galería",      href: "#galeria" },
  { label: "Testimonios",  href: "#testimonios" },
  { label: "Precios",      href: "#precios" },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-onyx/90 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/40"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gold-400 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-gold-400/40">
              <Scissors className="w-4 h-4 text-onyx" strokeWidth={2.5} />
            </div>
            <span className="text-white font-display text-xl font-bold tracking-wide">
              Studio<span className="text-gold-400">Nova</span>
            </span>
          </Link>

          {/* ── Desktop links ── */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-white/60 hover:text-gold-400 text-sm font-medium tracking-wide transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ── Desktop CTA + Admin link ── */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/admin"
              className="text-white/40 hover:text-white/70 text-xs font-medium transition-colors duration-200"
            >
              Admin
            </Link>
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 bg-gold-400 hover:bg-gold-300 text-onyx text-sm font-bold px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold-400/30"
            >
              Reservar Cita
            </Link>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-400 ease-in-out",
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="bg-onyx-3/95 backdrop-blur-xl border-t border-white/5 px-6 pb-8 pt-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-white/70 hover:text-gold-400 text-lg font-medium transition-colors"
              onClick={handleLinkClick}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-3">
            <Link
              href="/admin"
              className="text-center text-white/50 text-sm font-medium border border-white/10 py-3 rounded-full hover:border-white/20 transition-colors"
              onClick={handleLinkClick}
            >
              Panel de Administración
            </Link>
            <Link
              href="/booking"
              className="text-center bg-gold-400 hover:bg-gold-300 text-onyx font-bold py-3.5 rounded-full transition-all"
              onClick={handleLinkClick}
            >
              Reservar Cita
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
