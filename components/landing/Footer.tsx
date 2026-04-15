import Link from "next/link";
import { Scissors, MapPin, Phone, Mail, Clock } from "lucide-react";

const SocialIcons = {
  Instagram: () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  Facebook: () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  Twitter: () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
};

export default function Footer() {
  const year = new Date().getFullYear();

  const columns = [
    {
      title: "Servicios",
      links: [
        { label: "Corte Clásico",          href: "/booking" },
        { label: "Corte + Barba",          href: "/booking" },
        { label: "Afeitado Tradicional",   href: "/booking" },
        { label: "Coloración Completa",    href: "/booking" },
        { label: "Balayage / Mechas",      href: "/booking" },
        { label: "Tratamiento Keratina",   href: "/booking" },
      ],
    },
    {
      title: "Empresa",
      links: [
        { label: "Sobre nosotros",    href: "#" },
        { label: "Nuestro equipo",    href: "#equipo" },
        { label: "Galería",           href: "#galeria" },
        { label: "Blog",              href: "#" },
        { label: "Trabaja con nosotros", href: "#" },
      ],
    },
    {
      title: "Plataforma",
      links: [
        { label: "Sistema de reservas", href: "/booking" },
        { label: "Panel de admin",      href: "/admin" },
        { label: "Precios y planes",    href: "#precios" },
        { label: "Política de privacidad", href: "#" },
        { label: "Aviso legal",         href: "#" },
      ],
    },
  ];

  return (
    <footer id="contacto" className="section-vivid-3 border-t border-white/5">
      {/* ── CTA Banner ── */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
          <div className="rounded-3xl border border-gold-400/20 bg-gradient-to-r from-gold-400/8 to-gold-400/4 p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                ¿Listo para transformar tu look?
              </h3>
              <p className="text-white/50">Reserva en menos de 2 minutos. Sin esperas.</p>
            </div>
            <Link
              href="/booking"
              className="shrink-0 inline-flex items-center gap-2 rounded-full bg-gold-400 hover:bg-gold-300 text-onyx font-bold px-8 py-4 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gold-400/30"
            >
              Reservar Cita Ahora
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main footer ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {/* Brand column */}
          <div className="xl:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 bg-gold-400 rounded-full flex items-center justify-center">
                <Scissors className="w-4 h-4 text-onyx" strokeWidth={2.5} />
              </div>
              <span suppressHydrationWarning className="text-white font-display text-xl font-bold">
                Mitchell<span className="text-gold-400">Nova</span>
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-xs">
              Barbershop &amp; Salón de Belleza premium en Madrid desde 2018.
              Donde el arte del cuidado personal se eleva a otro nivel.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              {[
                { icon: MapPin, text: "Calle Gran Vía 45, 28013 Madrid" },
                { icon: Phone, text: "+34 91 234 56 78" },
                { icon: Mail,  text: "info@mitchellads.es" },
                { icon: Clock, text: "Lun–Sáb: 9:00–20:00 · Dom: 10:00–14:00" },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Icon className="h-4 w-4 mt-0.5 shrink-0 text-gold-400/60" />
                  <span className="text-white/40 text-sm">{text}</span>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-8">
              {[SocialIcons.Instagram, SocialIcons.Facebook, SocialIcons.Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/40 hover:border-gold-400/40 hover:text-gold-400 transition-all duration-200"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-5">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/40 hover:text-gold-400 text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/5 pt-8">
          <p className="text-white/25 text-xs">
            &copy; {year} MitchellNova S.L. · Todos los derechos reservados · CIF B-12345678
          </p>
          <div className="flex gap-6">
            {["Privacidad", "Cookies", "Legal", "Accesibilidad"].map((item) => (
              <a key={item} href="#" className="text-white/20 hover:text-white/50 text-xs transition-colors duration-200">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
