"use client";

import { useState } from "react";
import { Search, Plus, Crown, Phone, Mail } from "lucide-react";
import { clients } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export default function ClientsView() {
  const [search, setSearch] = useState("");

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-[1400px] space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Clientes</h1>
          <p className="text-white/40 text-sm mt-1">
            {clients.length} clientes registrados ·{" "}
            <span className="text-gold-400/70">{clients.filter((c) => c.vip).length} VIP</span>
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-gold-400 hover:bg-gold-300 text-onyx text-sm font-bold px-5 py-2.5 transition-all hover:scale-105">
          <Plus className="h-4 w-4" />
          Añadir cliente
        </button>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total clientes",  value: String(clients.length),                               color: "text-white" },
          { label: "Clientes VIP",    value: String(clients.filter((c) => c.vip).length),          color: "text-gold-400" },
          { label: "Ingresos totales",value: formatPrice(clients.reduce((s, c) => s + c.totalSpent, 0)), color: "text-emerald-400" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-white/8 bg-white/3 px-5 py-4">
            <p className={`font-display text-xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-white/35 text-xs mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25" />
        <input
          type="text"
          placeholder="Buscar por nombre o email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/25 outline-none focus:border-gold-400/40 transition-colors"
        />
      </div>

      {/* Client cards grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {filtered.map((client) => (
          <div
            key={client.id}
            className="group relative rounded-2xl border border-white/8 bg-white/3 p-5 hover:border-white/15 hover:bg-white/5 transition-all duration-300"
          >
            {/* VIP badge */}
            {client.vip && (
              <div className="absolute -top-2.5 right-4 flex items-center gap-1 rounded-full border border-gold-400/30 bg-gold-400/12 px-2.5 py-0.5">
                <Crown className="h-2.5 w-2.5 text-gold-400" />
                <span className="text-gold-300 text-[9px] font-bold uppercase tracking-wider">VIP</span>
              </div>
            )}

            {/* Avatar + name */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-onyx-5 to-onyx-6 border border-white/10 text-sm font-bold text-white/70">
                {client.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div className="min-w-0">
                <p className="text-white font-semibold text-sm truncate">{client.name}</p>
                <p className="text-white/35 text-xs truncate">{client.email}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="rounded-xl bg-white/5 border border-white/5 p-3">
                <p className="text-gold-400 font-bold text-lg">{client.visits}</p>
                <p className="text-white/30 text-[10px]">Visitas</p>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/5 p-3">
                <p className="text-emerald-400 font-bold text-lg">{formatPrice(client.totalSpent)}</p>
                <p className="text-white/30 text-[10px]">Gastado</p>
              </div>
            </div>

            {/* Last visit */}
            <p className="text-white/25 text-xs mb-4">
              Última visita: <span className="text-white/45">{client.lastVisit}</span>
            </p>

            {/* Contact icons */}
            <div className="flex gap-2 pt-4 border-t border-white/5">
              <a
                href={`mailto:${client.email}`}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/8 py-2 text-white/40 hover:border-gold-400/30 hover:text-gold-400 transition-all text-xs font-medium"
              >
                <Mail className="h-3.5 w-3.5" />
                Email
              </a>
              <a
                href={`tel:${client.phone}`}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/8 py-2 text-white/40 hover:border-gold-400/30 hover:text-gold-400 transition-all text-xs font-medium"
              >
                <Phone className="h-3.5 w-3.5" />
                Llamar
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
