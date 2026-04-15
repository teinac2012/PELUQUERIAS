"use client";

import { useState } from "react";
import { Search, Plus, Pencil, Trash2, Phone, Mail } from "lucide-react";
import { appointments } from "@/lib/data";
import type { Appointment } from "@/lib/types";
import Badge from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

type StatusFilter = "todas" | "confirmada" | "pendiente" | "completada" | "cancelada";

function StatusBadge({ status }: { status: Appointment["status"] }) {
  const map: Record<Appointment["status"], "gold" | "gray" | "green" | "red"> = {
    confirmada: "gold",
    pendiente:  "gray",
    completada: "green",
    cancelada:  "red",
  };
  return <Badge variant={map[status]}>{status}</Badge>;
}

export default function AppointmentsView() {
  const [search,  setSearch]  = useState("");
  const [filter,  setFilter]  = useState<StatusFilter>("todas");
  const [data,    setData]    = useState<Appointment[]>(appointments);

  const filtered = data.filter((a) => {
    const matchesSearch =
      a.clientName.toLowerCase().includes(search.toLowerCase()) ||
      a.service.toLowerCase().includes(search.toLowerCase()) ||
      a.staffMember.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "todas" || a.status === filter;
    return matchesSearch && matchesFilter;
  });

  const deleteAppt = (id: string) => {
    if (confirm("¿Eliminar esta cita?")) {
      setData((d) => d.filter((a) => a.id !== id));
    }
  };

  const updateStatus = (id: string, status: Appointment["status"]) => {
    setData((d) => d.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  return (
    <div className="p-6 max-w-[1400px] space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Gestión de Citas</h1>
          <p className="text-white/40 text-sm mt-1">{data.length} citas en total</p>
        </div>
        <button
          onClick={() => alert("Demo: formulario de nueva cita disponible en versión completa.")}
          className="inline-flex items-center gap-2 rounded-full bg-gold-400 hover:bg-gold-300 text-onyx text-sm font-bold px-5 py-2.5 transition-all hover:scale-105 hover:shadow-lg hover:shadow-gold-400/30"
        >
          <Plus className="h-4 w-4" />
          Nueva cita
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25" />
          <input
            type="text"
            placeholder="Buscar cliente, servicio..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/25 outline-none focus:border-gold-400/40 transition-colors"
          />
        </div>

        {/* Status filter tabs */}
        <div className="flex gap-1.5 rounded-xl border border-white/10 bg-white/3 p-1">
          {(["todas", "confirmada", "pendiente", "completada", "cancelada"] as StatusFilter[]).map(
            (s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-all",
                  filter === s
                    ? "bg-gold-400 text-onyx"
                    : "text-white/40 hover:text-white"
                )}
              >
                {s}
              </button>
            )
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-white/8 bg-white/3 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {["Cliente", "Servicio", "Profesional", "Fecha & Hora", "Duración", "Precio", "Estado", "Acciones"].map(
                  (h) => (
                    <th key={h} className="px-5 py-4 text-left text-xs font-semibold text-white/30 uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-white/25 text-sm">
                    No se encontraron citas.
                  </td>
                </tr>
              ) : (
                filtered.map((apt) => (
                  <tr key={apt.id} className="hover:bg-white/2 transition-colors group">
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-white/85 font-semibold text-sm">{apt.clientName}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <a href={`mailto:${apt.clientEmail}`} className="text-white/30 hover:text-gold-400 transition-colors">
                            <Mail className="h-3 w-3" />
                          </a>
                          <a href={`tel:${apt.clientPhone}`} className="text-white/30 hover:text-gold-400 transition-colors">
                            <Phone className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-white/70 text-sm">{apt.service}</td>
                    <td className="px-5 py-4 text-white/60 text-sm">{apt.staffMember}</td>
                    <td className="px-5 py-4 text-white/60 text-sm whitespace-nowrap">
                      {apt.date} · {apt.time}
                    </td>
                    <td className="px-5 py-4 text-white/50 text-sm">{apt.duration} min</td>
                    <td className="px-5 py-4 text-gold-400 font-semibold text-sm">
                      {formatPrice(apt.price)}
                    </td>
                    <td className="px-5 py-4">
                      {/* Inline status changer */}
                      <label className="relative inline-flex items-center gap-1 cursor-pointer select-none">
                        <StatusBadge status={apt.status} />
                        <select
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          value={apt.status}
                          onChange={(e) => updateStatus(apt.id, e.target.value as Appointment["status"])}
                        >
                          {["confirmada", "pendiente", "completada", "cancelada"].map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </label>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => alert(`Demo: editar cita ${apt.id}`)}
                          className="rounded-lg border border-white/10 p-1.5 text-white/40 hover:border-gold-400/40 hover:text-gold-400 transition-all"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => deleteAppt(apt.id)}
                          className="rounded-lg border border-white/10 p-1.5 text-white/40 hover:border-red-500/40 hover:text-red-400 transition-all"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-white/5 px-5 py-4">
          <p className="text-white/30 text-xs">{filtered.length} resultado(s)</p>
          <div className="flex gap-1.5">
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                className={cn(
                  "h-7 w-7 rounded-lg text-xs font-semibold transition-all",
                  p === 1 ? "bg-gold-400 text-onyx" : "text-white/30 hover:bg-white/8"
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
