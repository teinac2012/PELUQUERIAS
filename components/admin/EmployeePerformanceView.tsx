"use client";

import { ChevronLeft, TrendingUp, Calendar, Euro, Star } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import type { StaffMember } from "@/lib/types";

interface EmployeePerformanceViewProps {
  member: StaffMember | null;
  onBack: () => void;
}

function hashId(input: string): number {
  let value = 0;
  for (let i = 0; i < input.length; i += 1) {
    value = (value << 5) - value + input.charCodeAt(i);
    value |= 0;
  }
  return Math.abs(value);
}

function buildSeries(memberId: string) {
  const base = hashId(memberId);
  const labels = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  return labels.map((label, index) => {
    const appointments = 4 + ((base + index * 11) % 8);
    const revenue = appointments * (24 + ((base + index * 7) % 18));
    const satisfaction = 4.4 + ((base + index * 3) % 6) / 10;

    return {
      label,
      appointments,
      revenue,
      satisfaction: Number(satisfaction.toFixed(1)),
    };
  });
}

export default function EmployeePerformanceView({ member, onBack }: EmployeePerformanceViewProps) {
  if (!member) {
    return (
      <div className="p-6 max-w-[1200px]">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/60 hover:text-white hover:border-white/30 transition-all"
        >
          <ChevronLeft className="h-4 w-4" />
          Volver a equipo
        </button>
        <div className="rounded-2xl border border-white/8 bg-white/3 p-8 mt-6 text-white/50 text-sm">
          No se encontró empleado para mostrar rendimiento.
        </div>
      </div>
    );
  }

  const data = buildSeries(member.id);
  const weeklyRevenue = data.reduce((acc, point) => acc + point.revenue, 0);
  const weeklyAppointments = data.reduce((acc, point) => acc + point.appointments, 0);
  const avgTicket = Math.round(weeklyRevenue / weeklyAppointments);

  return (
    <div className="p-6 max-w-[1300px] space-y-6">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/60 hover:text-white hover:border-white/30 transition-all"
      >
        <ChevronLeft className="h-4 w-4" />
        Volver a equipo
      </button>

      <div>
        <h1 className="font-display text-2xl font-bold text-white">Rendimiento de {member.name}</h1>
        <p className="text-white/40 text-sm mt-1">Últimos 7 días · Perfil: {member.role}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-white/8 bg-white/3 p-5">
          <Euro className="h-5 w-5 text-gold-400 mb-3" />
          <p className="text-white/35 text-xs">Ingresos semanales</p>
          <p className="font-display text-2xl text-gold-400 font-bold mt-1">€{weeklyRevenue.toLocaleString("es-ES")}</p>
        </div>
        <div className="rounded-2xl border border-white/8 bg-white/3 p-5">
          <Calendar className="h-5 w-5 text-blue-400 mb-3" />
          <p className="text-white/35 text-xs">Citas semanales</p>
          <p className="font-display text-2xl text-blue-400 font-bold mt-1">{weeklyAppointments}</p>
        </div>
        <div className="rounded-2xl border border-white/8 bg-white/3 p-5">
          <TrendingUp className="h-5 w-5 text-emerald-400 mb-3" />
          <p className="text-white/35 text-xs">Ticket medio</p>
          <p className="font-display text-2xl text-emerald-400 font-bold mt-1">€{avgTicket}</p>
        </div>
        <div className="rounded-2xl border border-white/8 bg-white/3 p-5">
          <Star className="h-5 w-5 text-rose-salon-light mb-3" />
          <p className="text-white/35 text-xs">Valoración</p>
          <p className="font-display text-2xl text-rose-salon-light font-bold mt-1">{member.rating}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/8 bg-white/3 p-6">
          <h2 className="text-white text-sm font-semibold mb-4">Ingresos diarios</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="label" tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: "#151515",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
              <Line type="monotone" dataKey="revenue" stroke="#c9a84c" strokeWidth={2.6} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-white/8 bg-white/3 p-6">
          <h2 className="text-white text-sm font-semibold mb-4">Citas por día</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="label" tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: "#151515",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
              <Bar dataKey="appointments" fill="#34d399" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
