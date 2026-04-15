"use client";

import { useMemo, useState } from "react";
import { Plus, Search, Pencil, Trash2, Sparkles } from "lucide-react";
import { services as initialServices } from "@/lib/data";
import type { Service } from "@/lib/types";
import { formatDuration, formatPrice } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

export default function ServicesView() {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"todos" | "hombre" | "mujer">("todos");

  const filtered = useMemo(() => {
    return services.filter((service) => {
      const matchesText =
        service.name.toLowerCase().includes(query.toLowerCase()) ||
        service.description.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "todos" || service.category === category;
      return matchesText && matchesCategory;
    });
  }, [services, query, category]);

  const removeService = (id: string) => {
    if (!confirm("¿Quieres eliminar este servicio?")) return;
    setServices((prev) => prev.filter((service) => service.id !== id));
  };

  return (
    <div className="p-6 max-w-[1400px] space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Servicios</h1>
          <p className="text-white/40 text-sm mt-1">
            Gestiona catálogo, precios y duración de cada tratamiento.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-gold-400 hover:bg-gold-300 text-onyx text-sm font-bold px-5 py-2.5 transition-all hover:scale-105">
          <Plus className="h-4 w-4" />
          Nuevo servicio
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25" />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar servicio por nombre o descripción..."
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/25 outline-none focus:border-gold-400/40 transition-colors"
          />
        </div>

        <div className="flex gap-2 rounded-xl border border-white/10 bg-white/3 p-1">
          {([
            { id: "todos", label: "Todos" },
            { id: "hombre", label: "Caballero" },
            { id: "mujer", label: "Mujer" },
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCategory(tab.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                category === tab.id
                  ? "bg-gold-400 text-onyx"
                  : "text-white/45 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/8 bg-white/3 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {[
                  "Servicio",
                  "Categoría",
                  "Precio",
                  "Duración",
                  "Estado",
                  "Acciones",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-5 py-4 text-left text-xs font-semibold text-white/30 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((service) => (
                <tr key={service.id} className="hover:bg-white/2 transition-colors group">
                  <td className="px-5 py-4">
                    <p className="text-white/85 font-semibold text-sm">{service.name}</p>
                    <p className="text-white/35 text-xs mt-1 max-w-md">{service.description}</p>
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={service.category === "hombre" ? "gold" : "rose"}>
                      {service.category === "hombre" ? "Caballero" : "Mujer"}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-gold-400 font-semibold">{formatPrice(service.price)}</td>
                  <td className="px-5 py-4 text-white/55">{formatDuration(service.duration)}</td>
                  <td className="px-5 py-4">
                    {service.popular ? <Badge variant="green">Popular</Badge> : <Badge variant="gray">Activo</Badge>}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => alert(`Demo: editar ${service.name}`)}
                        className="rounded-lg border border-white/10 p-1.5 text-white/40 hover:border-gold-400/40 hover:text-gold-400 transition-all"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => removeService(service.id)}
                        className="rounded-lg border border-white/10 p-1.5 text-white/40 hover:border-red-500/40 hover:text-red-400 transition-all"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl border border-gold-400/20 bg-gold-400/8 p-5 flex items-start gap-3">
        <Sparkles className="h-5 w-5 text-gold-400 mt-0.5" />
        <p className="text-white/70 text-sm">
          Consejo pro: crea packs de servicios para aumentar ticket medio, por ejemplo
          <span className="text-gold-400"> “Corte + Barba Premium”</span> o
          <span className="text-gold-400"> “Color + Tratamiento”</span>.
        </p>
      </div>
    </div>
  );
}
