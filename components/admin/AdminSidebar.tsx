"use client";

import Link from "next/link";
import {
  LayoutDashboard, Calendar, Users, UserCheck,
  Settings, Scissors, LogOut, ChevronRight,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard",   view: "dashboard"     },
  { icon: Calendar,        label: "Citas",        view: "appointments"  },
  { icon: Users,           label: "Clientes",     view: "clients"       },
  { icon: UserCheck,       label: "Empleados",    view: "employees"     },
  { icon: Scissors,        label: "Servicios",    view: "services"      },
  { icon: Settings,        label: "Configuración",view: "settings"      },
];

interface Props {
  activeView: string;
  onNavigate: (view: string) => void;
}

export default function AdminSidebar({ activeView, onNavigate }: Props) {
  return (
    <aside className="flex h-full flex-col border-r border-white/5 bg-onyx-3 w-60">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2.5 border-b border-white/5 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-400">
          <Scissors className="h-3.5 w-3.5 text-onyx" strokeWidth={2.5} />
        </div>
        <span className="font-display text-base font-bold text-white">
          Studio<span className="text-gold-400">Nova</span>
        </span>
        <span className="ml-auto rounded-full bg-gold-400/15 px-1.5 py-0.5 text-[9px] font-bold text-gold-400 uppercase tracking-wider">
          Admin
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {NAV_ITEMS.map(({ icon: Icon, label, view }) => {
          const active = activeView === view;
          return (
            <button
              key={view}
              onClick={() => onNavigate(view)}
              className={cn(
                "group w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                active
                  ? "bg-gold-400/12 text-gold-400 border border-gold-400/20"
                  : "text-white/50 hover:bg-white/5 hover:text-white border border-transparent"
              )}
            >
              <Icon className={cn("h-4 w-4 shrink-0", active ? "text-gold-400" : "text-white/35 group-hover:text-white/60")} />
              <span className="flex-1 text-left">{label}</span>
              {active && <ChevronRight className="h-3 w-3 text-gold-400/60" />}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/5 p-3 space-y-2">
        {/* View site */}
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/40 hover:bg-white/5 hover:text-white transition-all"
        >
          <ExternalLink className="h-4 w-4" />
          Ver sitio web
        </Link>
        {/* User avatar */}
        <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/3 px-3 py-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-400/20 text-gold-400 text-xs font-bold">
            A
          </div>
          <div className="min-w-0">
            <p className="text-white/80 text-xs font-semibold truncate">Admin</p>
            <p className="text-white/30 text-[10px] truncate">admin@studionova.es</p>
          </div>
          <LogOut className="ml-auto h-3.5 w-3.5 text-white/20 hover:text-red-400 transition-colors cursor-pointer shrink-0" />
        </div>
      </div>
    </aside>
  );
}
