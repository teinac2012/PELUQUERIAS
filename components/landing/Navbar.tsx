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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-onyx/80 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/40"
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
            <span suppressHydrationWarning className="text-white font-display text-xl font-bold tracking-wide">
              Mitchell<span className="text-gold-400">Nova</span>
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
            className="md:hidden w-10 h-10 flex items-center justify-center text-white/85 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer overlay ── */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-[60] transition-opacity duration-300",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute inset-0 bg-black/65 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={cn(
            "absolute right-0 top-0 h-full w-[82%] max-w-[360px] border-l border-white/10 bg-[linear-gradient(165deg,#11151f_0%,#171423_52%,#111318_100%)] px-6 pt-24 pb-8 transition-transform duration-300",
            menuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-white/80 hover:text-gold-400 text-xl font-semibold transition-colors"
                onClick={handleLinkClick}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/admin"
              className="text-center text-white/65 text-sm font-medium border border-white/15 py-3.5 rounded-full hover:border-white/30 transition-colors"
              onClick={handleLinkClick}
            >
              Panel de Administración
            </Link>
            <Link
              href="/booking"
              className="btn-sheen text-center bg-gold-400 hover:bg-gold-300 text-onyx font-bold py-3.5 rounded-full transition-all"
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
