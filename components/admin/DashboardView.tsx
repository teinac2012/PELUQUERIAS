"use client";

import { useEffect } from "react";
import {
  TrendingUp, Calendar, Users, Star,
  ArrowUpRight, CheckCircle2,
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import { appointments, clients, revenueData } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import { loadAnime } from "@/lib/anime";

/* ── KPI card ─────────────────────────────────── */
function KpiCard({
  icon: Icon,
  label,
  value,
  change,
  positive = true,
  color = "gold",
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  change: string;
  positive?: boolean;
  color?: "gold" | "rose" | "blue" | "green";
}) {
  const colors = {
    gold:  { bg: "bg-gold-400/10",   icon: "text-gold-400",         border: "border-gold-400/15" },
    rose:  { bg: "bg-rose-salon/10", icon: "text-rose-salon-light", border: "border-rose-salon/15" },
    blue:  { bg: "bg-blue-500/10",   icon: "text-blue-400",         border: "border-blue-500/15" },
    green: { bg: "bg-emerald-500/10",icon: "text-emerald-400",      border: "border-emerald-500/15" },
  }[color];

  return (
    <div className={`rounded-2xl border ${colors.border} bg-white/3 p-5`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${colors.bg}`}>
          <Icon className={`h-5 w-5 ${colors.icon}`} />
        </div>
        <span
          className={`flex items-center gap-1 text-xs font-semibold ${
            positive ? "text-emerald-400" : "text-red-400"
          }`}
        >
          <ArrowUpRight className={`h-3.5 w-3.5 ${positive ? "" : "rotate-180"}`} />
          {change}
        </span>
      </div>
      <div className="font-display text-2xl font-bold text-white stat-number mb-1">
        {value}
      </div>
      <div className="text-white/40 text-xs font-medium">{label}</div>
    </div>
  );
}

/* ── Custom tooltip for charts ─────────────────── */
interface ChartPayloadItem {
  name: string;
  value: number;
  color: string;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: ChartPayloadItem[];
  label?: string;
}

const ChartTooltip = ({ active, payload, label }: ChartTooltipProps) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-onyx-4 px-4 py-3 shadow-2xl">
      <p className="text-white/50 text-xs mb-2">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
          <span className="text-white text-sm font-semibold">
            {p.name === "revenue" ? formatPrice(p.value) : p.value}
            {p.name === "appointments" ? " citas" : ""}
          </span>
        </div>
      ))}
    </div>
  );
};

/* ── Services distribution ─────────────────────── */
const SERVICE_COLORS = ["#c9a84c", "#d4728a", "#60a5fa", "#34d399", "#a78bfa"];

const servicesDistribution = [
  { name: "Corte + Barba",  value: 32 },
  { name: "Coloración",     value: 25 },
  { name: "Balayage",       value: 18 },
  { name: "Corte Clásico",  value: 14 },
  { name: "Otros",          value: 11 },
];

export default function DashboardView() {
  const todayAppointments = appointments.filter((a) => a.date === "2026-04-15");
  const completed  = todayAppointments.filter((a) => a.status === "completada").length;
  const confirmed  = todayAppointments.filter((a) => a.status === "confirmada").length;
  const todayRevenue = todayAppointments
    .filter((a) => a.status !== "cancelada")
    .reduce((sum, a) => sum + a.price, 0);
  const vipCount = clients.filter((c) => c.vip).length;

  useEffect(() => {
    loadAnime().then(({ animate, stagger }) => {
      animate(".kpi-card", {
        opacity: [0, 1],
        y: [20, 0],
        delay: stagger(80),
        duration: 600,
        ease: "outCubic",
      });
    });
  }, []);

  return (
    <div className="p-6 max-w-[1400px] space-y-7">
      {/* ── Page title ── */}
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-white/40 text-sm mt-1">
          Martes, 15 de abril de 2026 — Buenos días 👋
        </p>
      </div>

      {/* ── KPI cards ── */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="kpi-card"><KpiCard icon={Calendar} label="Citas hoy" value={String(todayAppointments.length)} change="+3 vs ayer" color="gold" /></div>
        <div className="kpi-card"><KpiCard icon={TrendingUp} label="Ingresos hoy" value={formatPrice(todayRevenue)} change="+12%" color="green" /></div>
        <div className="kpi-card"><KpiCard icon={Users} label="Clientes activos" value={String(clients.length)} change="+2 esta semana" color="blue" /></div>
        <div className="kpi-card"><KpiCard icon={Star} label="Clientes VIP" value={String(vipCount)} change={`${Math.round((vipCount / clients.length) * 100)}% del total`} color="rose" /></div>
      </div>

      {/* ── Charts row ── */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Revenue line chart — 2/3 width */}
        <div className="xl:col-span-2 rounded-2xl border border-white/8 bg-white/3 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-white font-semibold text-sm">Ingresos — últimos 14 días</h2>
              <p className="text-white/30 text-xs mt-0.5">Total: {formatPrice(revenueData.reduce((s, d) => s + d.revenue, 0))}</p>
            </div>
            <span className="rounded-full bg-emerald-500/15 border border-emerald-500/20 px-2.5 py-1 text-emerald-400 text-xs font-semibold">
              ↑ 18% este mes
            </span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={revenueData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="date" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `€${v}`} />
              <Tooltip content={<ChartTooltip />} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#c9a84c"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, fill: "#c9a84c", stroke: "#050505", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Services pie — 1/3 width */}
        <div className="rounded-2xl border border-white/8 bg-white/3 p-6">
          <h2 className="text-white font-semibold text-sm mb-6">Servicios más populares</h2>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={servicesDistribution}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {servicesDistribution.map((_, i) => (
                  <Cell key={i} fill={SERVICE_COLORS[i % SERVICE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {servicesDistribution.map((item, i) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full shrink-0" style={{ background: SERVICE_COLORS[i] }} />
                  <span className="text-white/50 text-xs truncate">{item.name}</span>
                </div>
                <span className="text-white/70 text-xs font-semibold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Appointments bar chart + Today list ── */}
      <div className="grid gap-6 xl:grid-cols-2">
        {/* Appointments bar chart */}
        <div className="rounded-2xl border border-white/8 bg-white/3 p-6">
          <h2 className="text-white font-semibold text-sm mb-6">Citas por día (últimas 2 semanas)</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="date" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="appointments" fill="#c9a84c" radius={[4, 4, 0, 0]} fillOpacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Today's appointments list */}
        <div className="rounded-2xl border border-white/8 bg-white/3 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-semibold text-sm">Citas de hoy</h2>
            <div className="flex items-center gap-2 text-xs text-white/40">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              {completed} completadas · {confirmed} pendientes
            </div>
          </div>
          <div className="space-y-2 overflow-y-auto max-h-[230px] pr-1 scrollbar-thin">
            {todayAppointments.map((apt) => (
              <div
                key={apt.id}
                className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/3 px-4 py-3"
              >
                <div className="text-center min-w-[48px]">
                  <p className="text-gold-400 font-bold text-sm">{apt.time}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/85 text-sm font-semibold truncate">{apt.clientName}</p>
                  <p className="text-white/35 text-xs truncate">{apt.service} · {apt.staffMember}</p>
                </div>
                <Badge
                  variant={
                    apt.status === "completada" ? "green" :
                    apt.status === "confirmada" ? "gold" :
                    apt.status === "cancelada"  ? "red"  : "gray"
                  }
                >
                  {apt.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
