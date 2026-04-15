"use client";

import { useState } from "react";
import { Save, Building2, Bell, CreditCard, Globe, Shield, Palette } from "lucide-react";

export default function SettingsView() {
  const [businessName, setBusinessName] = useState("MitchellNova Madrid");
  const [email, setEmail] = useState("hola@mitchellads.es");
  const [phone, setPhone] = useState("+34 91 234 56 78");
  const [address, setAddress] = useState("Calle Gran Vía 45, Madrid");
  const [timezone, setTimezone] = useState("Europe/Madrid");
  const [allowOnlinePayment, setAllowOnlinePayment] = useState(true);
  const [sendSms, setSendSms] = useState(true);
  const [sendEmailReminders, setSendEmailReminders] = useState(true);

  return (
    <div className="p-6 max-w-[1200px] space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Configuración</h1>
          <p className="text-white/40 text-sm mt-1">
            Ajustes generales del negocio, notificaciones y pagos.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-gold-400 hover:bg-gold-300 text-onyx text-sm font-bold px-5 py-2.5 transition-all hover:scale-105">
          <Save className="h-4 w-4" />
          Guardar cambios
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-white/8 bg-white/3 p-6 space-y-4">
          <div className="flex items-center gap-2 text-white">
            <Building2 className="h-4 w-4 text-gold-400" />
            <h2 className="font-semibold text-sm">Datos del negocio</h2>
          </div>

          <div className="space-y-3">
            {[
              {
                label: "Nombre comercial",
                value: businessName,
                onChange: setBusinessName,
                placeholder: "Nombre del salón",
              },
              {
                label: "Email",
                value: email,
                onChange: setEmail,
                placeholder: "email@negocio.com",
              },
              {
                label: "Teléfono",
                value: phone,
                onChange: setPhone,
                placeholder: "+34 ...",
              },
              {
                label: "Dirección",
                value: address,
                onChange: setAddress,
                placeholder: "Dirección completa",
              },
            ].map((field) => (
              <div key={field.label}>
                <label className="mb-1.5 block text-xs font-medium text-white/50">{field.label}</label>
                <input
                  type="text"
                  value={field.value}
                  onChange={(event) => field.onChange(event.target.value)}
                  placeholder={field.placeholder}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 px-4 text-sm text-white placeholder-white/25 outline-none transition-all duration-200 focus:border-gold-400/50"
                />
              </div>
            ))}

            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/50">Zona horaria</label>
              <select
                value={timezone}
                onChange={(event) => setTimezone(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 px-4 text-sm text-white outline-none transition-all duration-200 focus:border-gold-400/50"
              >
                <option value="Europe/Madrid">Europe/Madrid</option>
                <option value="Europe/Lisbon">Europe/Lisbon</option>
                <option value="Europe/Paris">Europe/Paris</option>
              </select>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-white/8 bg-white/3 p-6 space-y-4">
          <div className="flex items-center gap-2 text-white">
            <Bell className="h-4 w-4 text-gold-400" />
            <h2 className="font-semibold text-sm">Notificaciones y pagos</h2>
          </div>

          <div className="space-y-3">
            {[
              {
                icon: CreditCard,
                label: "Permitir pago online",
                enabled: allowOnlinePayment,
                toggle: () => setAllowOnlinePayment((v) => !v),
              },
              {
                icon: Bell,
                label: "Recordatorios por SMS",
                enabled: sendSms,
                toggle: () => setSendSms((v) => !v),
              },
              {
                icon: Bell,
                label: "Recordatorios por Email",
                enabled: sendEmailReminders,
                toggle: () => setSendEmailReminders((v) => !v),
              },
            ].map((item) => (
              <button
                key={item.label}
                onClick={item.toggle}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 flex items-center justify-between hover:border-gold-400/25 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 text-white/45" />
                  <span className="text-white/75 text-sm">{item.label}</span>
                </div>
                <span
                  className={`h-5 w-10 rounded-full p-0.5 transition-colors ${
                    item.enabled ? "bg-gold-400" : "bg-white/15"
                  }`}
                >
                  <span
                    className={`block h-4 w-4 rounded-full bg-onyx transition-transform ${
                      item.enabled ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </span>
              </button>
            ))}
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
            <h3 className="text-white text-sm font-semibold">Branding MitchellAds</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs text-white/40">Color primario</label>
                <div className="h-9 rounded-lg border border-white/10 bg-[#c9a84c]" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-white/40">Color secundario</label>
                <div className="h-9 rounded-lg border border-white/10 bg-[#d4728a]" />
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            icon: Globe,
            title: "Dominio",
            value: "mitchellnova.es",
          },
          {
            icon: Shield,
            title: "Seguridad",
            value: "SSL activo · Backups diarios",
          },
          {
            icon: Palette,
            title: "Tema",
            value: "Dark Premium (Mitchell)",
          },
        ].map((card) => (
          <div key={card.title} className="rounded-2xl border border-white/8 bg-white/3 p-5">
            <card.icon className="h-5 w-5 text-gold-400 mb-3" />
            <p className="text-white/45 text-xs mb-1">{card.title}</p>
            <p className="text-white text-sm font-semibold">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
