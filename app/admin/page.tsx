"use client";

import { useState } from "react";
import { Menu, Bell, Search } from "lucide-react";
import AdminSidebar    from "@/components/admin/AdminSidebar";
import DashboardView   from "@/components/admin/DashboardView";
import AppointmentsView from "@/components/admin/AppointmentsView";
import ClientsView     from "@/components/admin/ClientsView";
import EmployeesView   from "@/components/admin/EmployeesView";

type AdminView = "dashboard" | "appointments" | "clients" | "employees" | "services" | "settings";

const VIEW_TITLES: Record<AdminView, string> = {
  dashboard:    "Dashboard",
  appointments: "Citas",
  clients:      "Clientes",
  employees:    "Empleados",
  services:     "Servicios",
  settings:     "Configuración",
};

/* Placeholder for unimplemented views */
function PlaceholderView({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-80 text-center p-8">
      <div className="h-16 w-16 rounded-2xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center mb-5">
        <Search className="h-7 w-7 text-gold-400/60" />
      </div>
      <h2 className="font-display text-xl font-bold text-white mb-2">{title}</h2>
      <p className="text-white/35 text-sm">Esta sección estará disponible en la próxima actualización.</p>
    </div>
  );
}

export default function AdminPage() {
  const [view,         setView]         = useState<AdminView>("dashboard");
  const [sidebarOpen,  setSidebarOpen]  = useState(false);

  const renderView = () => {
    switch (view) {
      case "dashboard":    return <DashboardView />;
      case "appointments": return <AppointmentsView />;
      case "clients":      return <ClientsView />;
      case "employees":    return <EmployeesView />;
      default:             return <PlaceholderView title={VIEW_TITLES[view]} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-onyx text-white">
      {/* ── Sidebar ── */}
      {/* Desktop */}
      <div className="hidden lg:flex">
        <AdminSidebar activeView={view} onNavigate={(v) => setView(v as AdminView)} />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative z-10 flex">
            <AdminSidebar
              activeView={view}
              onNavigate={(v) => {
                setView(v as AdminView);
                setSidebarOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {/* ── Main content ── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-16 shrink-0 items-center gap-4 border-b border-white/5 bg-onyx-3/60 backdrop-blur-xl px-5">
          {/* Mobile menu button */}
          <button
            className="lg:hidden text-white/50 hover:text-white transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/40 text-sm">
            <span>StudioNova</span>
            <span>/</span>
            <span className="text-white font-medium">{VIEW_TITLES[view]}</span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            {/* Search */}
            <div className="hidden sm:flex relative">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/20" />
              <input
                type="text"
                placeholder="Buscar..."
                className="w-48 rounded-xl border border-white/8 bg-white/5 py-1.5 pl-8 pr-3 text-sm text-white placeholder-white/20 outline-none focus:border-gold-400/30 transition-colors"
              />
            </div>

            {/* Notifications */}
            <button className="relative flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 hover:text-white transition-colors">
              <Bell className="h-3.5 w-3.5" />
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-gold-400" />
            </button>

            {/* User mini avatar */}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-400/20 text-gold-400 text-xs font-bold">
              A
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto bg-onyx-2">
          <div key={view} style={{ animation: "fadeUp 0.35s ease-out both" }}>
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
}
