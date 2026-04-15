"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Plus, Calendar, TrendingUp, ToggleLeft, ToggleRight } from "lucide-react";
import { staff } from "@/lib/data";
import type { StaffMember } from "@/lib/types";

function hashId(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i += 1) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function getEmployeeMetrics(memberId: string) {
  const seed = hashId(memberId);
  return {
    monthlyRevenue: 1500 + (seed % 3000),
    monthlyAppointments: 30 + (seed % 80),
  };
}

function EmployeeCard({
  member,
  onToggleAvailable,
  onOpenPerformance,
  onOpenAppointments,
}: {
  member: StaffMember;
  onToggleAvailable: (id: string) => void;
  onOpenPerformance?: (member: StaffMember) => void;
  onOpenAppointments?: () => void;
}) {
  const { monthlyRevenue, monthlyAppointments } = getEmployeeMetrics(member.id);

  return (
    <div className="rounded-2xl border border-white/8 bg-white/3 p-6 hover:border-white/15 transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-gold-400/25">
            <Image src={member.avatar} alt={member.name} fill className="object-cover" sizes="56px" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-base">{member.name}</h3>
            <p className="text-gold-400/70 text-xs font-medium">{member.role}</p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="h-3 w-3 fill-gold-400 text-gold-400" />
              <span className="text-white/60 text-xs">{member.rating}</span>
              <span className="text-white/25 text-xs">({member.reviews})</span>
            </div>
          </div>
        </div>

        {/* Availability toggle */}
        <button
          onClick={() => onToggleAvailable(member.id)}
          className="flex items-center gap-1.5 text-xs font-medium transition-colors"
        >
          {member.available ? (
            <>
              <ToggleRight className="h-5 w-5 text-emerald-400" />
              <span className="text-emerald-400">Activo</span>
            </>
          ) : (
            <>
              <ToggleLeft className="h-5 w-5 text-white/25" />
              <span className="text-white/25">Inactivo</span>
            </>
          )}
        </button>
      </div>

      {/* Specialties */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {member.specialties.map((spec) => (
          <span
            key={spec}
            className="rounded-full border border-white/8 bg-white/5 px-2.5 py-0.5 text-[10px] text-white/50"
          >
            {spec}
          </span>
        ))}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="rounded-xl bg-white/5 border border-white/5 p-3 text-center">
          <p className="text-gold-400 font-bold text-sm">€{monthlyRevenue.toLocaleString("es-ES")}</p>
          <p className="text-white/30 text-[9px] mt-0.5">Ingresos/mes</p>
        </div>
        <div className="rounded-xl bg-white/5 border border-white/5 p-3 text-center">
          <p className="text-blue-400 font-bold text-sm">{monthlyAppointments}</p>
          <p className="text-white/30 text-[9px] mt-0.5">Citas/mes</p>
        </div>
        <div className="rounded-xl bg-white/5 border border-white/5 p-3 text-center">
          <p className="text-white/70 font-bold text-sm">{member.experience}a</p>
          <p className="text-white/30 text-[9px] mt-0.5">Experiencia</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onOpenAppointments?.()}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 py-2 text-xs font-medium text-white/50 hover:border-gold-400/30 hover:text-gold-400 transition-all"
        >
          <Calendar className="h-3.5 w-3.5" />
          Ver agenda
        </button>
        <button
          onClick={() => onOpenPerformance?.(member)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 py-2 text-xs font-medium text-white/50 hover:border-green-400/30 hover:text-emerald-400 transition-all"
        >
          <TrendingUp className="h-3.5 w-3.5" />
          Rendimiento
        </button>
      </div>
    </div>
  );
}

interface EmployeesViewProps {
  onOpenPerformance?: (member: StaffMember) => void;
  onOpenAppointments?: () => void;
}

export default function EmployeesView({ onOpenPerformance, onOpenAppointments }: EmployeesViewProps) {
  const [teamData, setTeamData] = useState(staff);

  const toggleAvailable = (id: string) => {
    setTeamData((d) => d.map((m) => (m.id === id ? { ...m, available: !m.available } : m)));
  };

  const activeCount = teamData.filter((m) => m.available).length;

  return (
    <div className="p-6 max-w-[1400px] space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Equipo</h1>
          <p className="text-white/40 text-sm mt-1">
            {teamData.length} empleados ·{" "}
            <span className="text-emerald-400">{activeCount} activos hoy</span>
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-gold-400 hover:bg-gold-300 text-onyx text-sm font-bold px-5 py-2.5 transition-all hover:scale-105">
          <Plus className="h-4 w-4" />
          Añadir empleado
        </button>
      </div>

      {/* Team grid */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {teamData.map((member) => (
          <EmployeeCard
            key={member.id}
            member={member}
            onToggleAvailable={toggleAvailable}
            onOpenPerformance={onOpenPerformance}
            onOpenAppointments={onOpenAppointments}
          />
        ))}
      </div>
    </div>
  );
}
