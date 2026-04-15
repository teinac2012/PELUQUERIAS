"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check, ChevronRight, ChevronLeft, Scissors, Star,
  Calendar, Clock, User, Mail, Phone, CreditCard,
  Lock, ArrowRight, Sparkles,
} from "lucide-react";
import { services, staff, timeSlots } from "@/lib/data";
import type { BookingFormData, Service, StaffMember } from "@/lib/types";
import {
  cn, formatPrice, formatDuration, formatDate,
  getDaysInMonth, getFirstDayOfMonth,
  MONTHS_ES, DAYS_ES_SHORT, isToday, isPastDate, isSameDay,
  generateBookingId,
} from "@/lib/utils";
import { loadAnime } from "@/lib/anime";

/* ───────────────────────────────────────────── */
/*  Step indicator                               */
/* ───────────────────────────────────────────── */
const STEPS = [
  { label: "Servicio"     },
  { label: "Profesional"  },
  { label: "Fecha y hora" },
  { label: "Tus datos"    },
  { label: "Confirmación" },
];

function StepBar({ current }: { current: number }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-0">
        {STEPS.map((step, i) => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-bold transition-all duration-500",
                  i < current
                    ? "border-gold-400 bg-gold-400 text-onyx"
                    : i === current
                    ? "border-gold-400 bg-transparent text-gold-400 shadow-lg shadow-gold-400/20"
                    : "border-white/15 bg-transparent text-white/25"
                )}
              >
                {i < current ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span
                className={cn(
                  "mt-1.5 hidden sm:block text-[10px] font-medium whitespace-nowrap transition-colors",
                  i === current ? "text-gold-400" : i < current ? "text-white/60" : "text-white/20"
                )}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "mx-1 sm:mx-2 h-px w-8 sm:w-14 transition-all duration-500",
                  i < current ? "bg-gold-400" : "bg-white/10"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────── */
/*  Step 1 — Service selection                  */
/* ───────────────────────────────────────────── */
function Step1({
  selectedService,
  onSelect,
}: {
  selectedService?: Service;
  onSelect: (s: Service) => void;
}) {
  const [tab, setTab] = useState<"hombre" | "mujer">("hombre");
  const filtered = services.filter((s) => s.category === tab);

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-white mb-2">
        Elige tu servicio
      </h2>
      <p className="text-white/50 text-sm mb-7">
        Selecciona el tratamiento que deseas reservar.
      </p>

      {/* Category toggle */}
      <div className="mb-6 inline-flex rounded-full border border-white/10 p-1">
        {(["hombre", "mujer"] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setTab(cat)}
            className={cn(
              "rounded-full px-6 py-2 text-sm font-semibold capitalize transition-all duration-300",
              tab === cat ? "bg-gold-400 text-onyx" : "text-white/50 hover:text-white"
            )}
          >
            {cat === "hombre" ? "Caballero" : "Dama"}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((svc) => (
          <button
            key={svc.id}
            onClick={() => onSelect(svc)}
            className={cn(
              "group flex items-start gap-4 rounded-2xl border p-5 text-left transition-all duration-300",
              selectedService?.id === svc.id
                ? "border-gold-400 bg-gold-400/8 shadow-lg shadow-gold-400/10"
                : "border-white/8 bg-white/3 hover:border-white/20 hover:bg-white/5"
            )}
          >
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-200",
                selectedService?.id === svc.id
                  ? "bg-gold-400 text-onyx"
                  : "bg-white/8 text-white/50 group-hover:bg-white/12"
              )}
            >
              <Scissors className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className={cn(
                  "font-semibold text-sm transition-colors",
                  selectedService?.id === svc.id ? "text-gold-300" : "text-white"
                )}>
                  {svc.name}
                  {svc.popular && (
                    <span className="ml-2 rounded-full bg-gold-400/15 px-2 py-0.5 text-[9px] font-bold text-gold-400 uppercase tracking-wider">
                      Popular
                    </span>
                  )}
                </p>
                <span className="shrink-0 text-gold-400 font-bold text-sm">
                  {formatPrice(svc.price)}
                </span>
              </div>
              <p className="text-white/40 text-xs mt-1 leading-relaxed">{svc.description}</p>
              <p className="mt-2 text-white/30 text-xs flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatDuration(svc.duration)}
              </p>
            </div>
            {selectedService?.id === svc.id && (
              <Check className="h-4 w-4 shrink-0 text-gold-400 mt-0.5" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────── */
/*  Step 2 — Professional                       */
/* ───────────────────────────────────────────── */
function Step2({
  selectedStaff,
  onSelect,
}: {
  selectedStaff?: StaffMember;
  onSelect: (s: StaffMember) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-white mb-2">
        Elige tu profesional
      </h2>
      <p className="text-white/50 text-sm mb-7">
        Selecciona con quién quieres tu cita.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {staff.map((member) => (
          <button
            key={member.id}
            onClick={() => member.available && onSelect(member)}
            disabled={!member.available}
            className={cn(
              "group flex items-start gap-4 rounded-2xl border p-5 text-left transition-all duration-300",
              !member.available && "opacity-40 cursor-not-allowed",
              selectedStaff?.id === member.id
                ? "border-gold-400 bg-gold-400/8"
                : member.available
                ? "border-white/8 bg-white/3 hover:border-white/20 hover:bg-white/5"
                : "border-white/5 bg-white/2"
            )}
          >
            <div className="relative">
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-white/10">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  width={56}
                  height={56}
                  className="h-full w-full object-cover"
                />
              </div>
              {member.available ? (
                <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-onyx-4 bg-emerald-400" />
              ) : (
                <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-onyx-4 bg-white/20" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className={cn(
                  "font-semibold text-sm",
                  selectedStaff?.id === member.id ? "text-gold-300" : "text-white"
                )}>
                  {member.name}
                </p>
                {selectedStaff?.id === member.id && (
                  <Check className="h-4 w-4 shrink-0 text-gold-400" />
                )}
              </div>
              <p className="text-gold-400/70 text-xs font-medium">{member.role}</p>
              <div className="mt-1 flex items-center gap-1">
                <Star className="h-3 w-3 fill-gold-400 text-gold-400" />
                <span className="text-white/70 text-xs font-semibold">{member.rating}</span>
                <span className="text-white/30 text-xs">({member.reviews} reseñas)</span>
              </div>
              <p className="mt-2 text-white/30 text-xs">{member.experience} años exp.</p>
              {!member.available && (
                <p className="mt-1.5 text-xs text-red-400/60 italic">No disponible hoy</p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────── */
/*  Step 3 — Date & Time                        */
/* ───────────────────────────────────────────── */
function Step3({
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
}: {
  selectedDate?: Date;
  selectedTime?: string;
  onSelectDate: (d: Date) => void;
  onSelectTime: (t: string) => void;
}) {
  const today = new Date();
  const [viewYear,  setViewYear]  = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const daysInMonth  = getDaysInMonth(viewYear, viewMonth);
  const firstDayIdx  = getFirstDayOfMonth(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11); }
    else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0); }
    else setViewMonth((m) => m + 1);
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-white mb-2">
        Elige fecha y hora
      </h2>
      <p className="text-white/50 text-sm mb-7">
        Selecciona el día y el horario que mejor te convenga.
      </p>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Calendar */}
        <div className="rounded-2xl border border-white/8 bg-white/3 p-6">
          {/* Month nav */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={prevMonth}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/50 hover:bg-white/8 hover:text-white transition-all"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="font-display text-sm font-semibold text-white capitalize">
              {MONTHS_ES[viewMonth]} {viewYear}
            </span>
            <button
              onClick={nextMonth}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/50 hover:bg-white/8 hover:text-white transition-all"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS_ES_SHORT.map((d) => (
              <div key={d} className="text-center text-[10px] font-semibold text-white/25 uppercase py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-y-1">
            {/* Empty leading cells */}
            {Array(firstDayIdx).fill(null).map((_, i) => <div key={`e${i}`} />)}

            {Array(daysInMonth).fill(null).map((_, i) => {
              const day  = i + 1;
              const date = new Date(viewYear, viewMonth, day);
              const past = isPastDate(date);
              const isTod = isToday(date);
              const isSel = selectedDate ? isSameDay(date, selectedDate) : false;

              return (
                <button
                  key={day}
                  disabled={past}
                  onClick={() => onSelectDate(date)}
                  className={cn(
                    "mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-all duration-200",
                    isSel
                      ? "bg-gold-400 text-onyx font-bold shadow-lg shadow-gold-400/30"
                      : isTod && !isSel
                      ? "border border-gold-400/40 text-gold-400"
                      : past
                      ? "text-white/15 cursor-not-allowed"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {selectedDate && (
            <div className="mt-5 rounded-xl bg-gold-400/8 border border-gold-400/20 px-4 py-2.5 text-center">
              <p className="text-gold-300 text-xs font-medium capitalize">
                {formatDate(selectedDate)}
              </p>
            </div>
          )}
        </div>

        {/* Time slots */}
        <div>
          <h3 className="text-white/60 text-xs font-semibold tracking-wider uppercase mb-4">
            Horarios disponibles
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot.id}
                disabled={!slot.available}
                onClick={() => onSelectTime(slot.time)}
                className={cn(
                  "rounded-xl border py-3 text-sm font-semibold transition-all duration-200",
                  !slot.available
                    ? "border-white/5 text-white/15 cursor-not-allowed line-through"
                    : selectedTime === slot.time
                    ? "border-gold-400 bg-gold-400/15 text-gold-300 shadow-md shadow-gold-400/15"
                    : "border-white/10 bg-white/3 text-white/60 hover:border-white/20 hover:text-white"
                )}
              >
                {slot.time}
              </button>
            ))}
          </div>
          <p className="mt-4 text-white/25 text-xs">
            ✓ Horarios en franja horaria de Madrid (CET)
          </p>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────── */
/*  Step 4 — Contact + Payment                  */
/* ───────────────────────────────────────────── */
function Step4({
  form,
  onChange,
}: {
  form: BookingFormData;
  onChange: (field: keyof BookingFormData, value: string) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-white mb-2">Tus datos</h2>
      <p className="text-white/50 text-sm mb-8">
        Introduce tu información de contacto y el método de pago.
      </p>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Contact */}
        <div>
          <h3 className="text-xs font-bold text-white/40 tracking-widest uppercase mb-5">
            Información de contacto
          </h3>
          <div className="space-y-4">
            {[
              { label: "Nombre completo", field: "clientName" as const, icon: User,  type: "text",  placeholder: "Ej. María García" },
              { label: "Correo electrónico", field: "clientEmail" as const, icon: Mail, type: "email", placeholder: "tu@email.com" },
              { label: "Teléfono", field: "clientPhone" as const, icon: Phone, type: "tel", placeholder: "+34 6XX XXX XXX" },
            ].map(({ label, field, icon: Icon, type, placeholder }) => (
              <div key={field}>
                <label className="mb-1.5 block text-xs font-medium text-white/50">{label}</label>
                <div className="relative">
                  <Icon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25" />
                  <input
                    type={type}
                    value={(form[field] as string) || ""}
                    onChange={(e) => onChange(field, e.target.value)}
                    placeholder={placeholder}
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder-white/25 outline-none transition-all duration-200 focus:border-gold-400/50 focus:bg-white/8 focus:shadow-lg focus:shadow-gold-400/5"
                  />
                </div>
              </div>
            ))}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/50">
                Notas adicionales <span className="text-white/25">(opcional)</span>
              </label>
              <textarea
                value={form.notes || ""}
                onChange={(e) => onChange("notes", e.target.value)}
                placeholder="¿Tienes alguna preferencia o alergia que debamos saber?"
                rows={3}
                className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white placeholder-white/25 outline-none transition-all duration-200 focus:border-gold-400/50 focus:bg-white/8 resize-none"
              />
            </div>
          </div>
        </div>

        {/* PaymentSimulation */}
        <div>
          <h3 className="text-xs font-bold text-white/40 tracking-widest uppercase mb-5">
            Método de pago
          </h3>
          <div className="rounded-2xl border border-white/10 bg-white/3 p-6">
            {/* Card visual */}
            <div className="mb-6 rounded-xl bg-gradient-to-br from-onyx-5 to-onyx-6 border border-white/8 p-5 relative overflow-hidden shadow-xl">
              <div className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: "linear-gradient(135deg, rgba(201,168,76,0.3) 0%, transparent 60%)",
                }}
              />
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="h-7 w-10 rounded bg-gold-400/30 border border-gold-400/20" />
                  <span className="text-white/30 text-xs font-bold uppercase tracking-wider">VISA</span>
                </div>
                <p className="font-mono text-white/70 text-sm tracking-[0.2em] mb-4">
                  •••• •••• •••• 4242
                </p>
                <div className="flex justify-between text-[10px] text-white/30 uppercase tracking-wider">
                  <div>
                    <div className="mb-1">Titular</div>
                    <div className="text-white/60 font-medium">{form.clientName || "Tu nombre"}</div>
                  </div>
                  <div className="text-right">
                    <div className="mb-1">Caduca</div>
                    <div className="text-white/60 font-medium">12/28</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fake form fields */}
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs text-white/40">Número de tarjeta</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25" />
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    defaultValue="4242 4242 4242 4242"
                    readOnly
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white/60 font-mono placeholder-white/25 outline-none cursor-default"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs text-white/40">Caducidad</label>
                  <input
                    type="text"
                    placeholder="MM/AA"
                    defaultValue="12/28"
                    readOnly
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 px-4 text-sm text-white/60 placeholder-white/25 outline-none cursor-default"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-white/40">CVV</label>
                  <input
                    type="text"
                    placeholder="•••"
                    defaultValue="123"
                    readOnly
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 px-4 text-sm text-white/60 placeholder-white/25 outline-none cursor-default"
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 text-white/30">
              <Lock className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-xs">Pago seguro con cifrado SSL 256-bit</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────── */
/*  Step 5 — Confirmation                       */
/* ───────────────────────────────────────────── */
function Step5({
  form,
  bookingId,
}: {
  form: BookingFormData;
  bookingId: string;
}) {
  useEffect(() => {
    loadAnime().then((anime) => {
      anime({
        targets: ".confirm-checkmark",
        scale: [0, 1],
        opacity: [0, 1],
        duration: 800,
        easing: "easeOutBack",
      });
      anime({
        targets: ".confirm-card > *",
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(100, { start: 400 }),
        duration: 600,
        easing: "easeOutCubic",
      });
    });
  }, []);

  return (
    <div className="text-center py-4">
      {/* Success icon */}
      <div className="confirm-checkmark mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-500 shadow-2xl shadow-gold-400/30">
        <Check className="h-10 w-10 text-onyx" strokeWidth={3} />
      </div>

      <h2 className="font-display text-3xl font-bold text-white mb-3">
        ¡Reserva confirmada!
      </h2>
      <p className="text-white/50 mb-10">
        Hemos enviado la confirmación a{" "}
        <span className="text-gold-400">{form.clientEmail || "tu email"}</span>
      </p>

      {/* Summary card */}
      <div className="confirm-card mx-auto max-w-md rounded-3xl border border-gold-400/20 bg-gold-400/5 p-8 text-left space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-white/40 text-sm">Nº de reserva</span>
          <span className="font-mono text-gold-400 font-bold text-sm">{bookingId}</span>
        </div>
        {[
          { label: "Servicio",     value: form.service?.name },
          { label: "Profesional",  value: form.staff?.name },
          { label: "Fecha",        value: form.date ? formatDate(form.date) : "" },
          { label: "Hora",         value: form.time },
          { label: "Duración",     value: form.service ? formatDuration(form.service.duration) : "" },
          { label: "Total",        value: form.service ? formatPrice(form.service.price) : "" },
        ].map(({ label, value }) =>
          value ? (
            <div key={label} className="flex items-center justify-between border-t border-white/5 pt-4">
              <span className="text-white/40 text-sm">{label}</span>
              <span className="text-white font-medium text-sm text-right max-w-[55%] capitalize">{value}</span>
            </div>
          ) : null
        )}
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/70 hover:border-white/30 hover:text-white transition-all"
        >
          Volver al inicio
        </Link>
        <Link
          href="/booking"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-400 px-6 py-3 text-sm font-bold text-onyx hover:bg-gold-300 transition-all"
        >
          <Sparkles className="h-4 w-4" />
          Nueva reserva
        </Link>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────── */
/*  Summary sidebar                             */
/* ───────────────────────────────────────────── */
function BookingSummary({ form, step }: { form: BookingFormData; step: number }) {
  if (step < 1) return null;

  return (
    <div className="rounded-2xl border border-white/8 bg-white/3 p-6 space-y-4 sticky top-8">
      <h3 className="text-xs font-bold text-white/40 tracking-widest uppercase">
        Resumen de tu cita
      </h3>
      {form.service && (
        <div className="rounded-xl bg-gold-400/8 border border-gold-400/15 p-4">
          <p className="text-gold-300 font-semibold text-sm">{form.service.name}</p>
          <p className="text-gold-400/60 text-xs mt-0.5">
            {formatPrice(form.service.price)} · {formatDuration(form.service.duration)}
          </p>
        </div>
      )}
      {form.staff && (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 overflow-hidden rounded-full border border-white/15">
            <Image src={form.staff.avatar} alt={form.staff.name} width={32} height={32} className="object-cover" />
          </div>
          <div>
            <p className="text-white/80 text-xs font-semibold">{form.staff.name}</p>
            <p className="text-white/30 text-[10px]">{form.staff.role}</p>
          </div>
        </div>
      )}
      {form.date && (
        <div className="flex items-center gap-2 text-white/50 text-xs">
          <Calendar className="h-3.5 w-3.5" />
          <span className="capitalize">{formatDate(form.date)}</span>
        </div>
      )}
      {form.time && (
        <div className="flex items-center gap-2 text-white/50 text-xs">
          <Clock className="h-3.5 w-3.5" />
          <span>{form.time}</span>
        </div>
      )}
      {form.service && (
        <div className="border-t border-white/8 pt-4 flex justify-between">
          <span className="text-white/40 text-sm">Total</span>
          <span className="text-gold-400 font-bold">{formatPrice(form.service.price)}</span>
        </div>
      )}
    </div>
  );
}

/* ───────────────────────────────────────────── */
/*  Main wizard                                  */
/* ───────────────────────────────────────────── */
const INITIAL_FORM: BookingFormData = {
  clientName: "",
  clientEmail: "",
  clientPhone: "",
  notes: "",
};

export default function BookingWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<BookingFormData>(INITIAL_FORM);
  const [bookingId, setBookingId] = useState("");

  const updateField = (field: keyof BookingFormData, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const canAdvance = (): boolean => {
    switch (step) {
      case 0: return !!form.service;
      case 1: return !!form.staff;
      case 2: return !!form.date && !!form.time;
      case 3: return !!(form.clientName && form.clientEmail && form.clientPhone);
      default: return true;
    }
  };

  const handleNext = () => {
    if (step === 3) {
      // Generate booking ID  before showing confirmation
      setBookingId(generateBookingId());
    }
    setStep((s) => Math.min(s + 1, 4));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrev = () => {
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-onyx">
      {/* ── Header bar ── */}
      <div className="sticky top-0 z-10 border-b border-white/5 bg-onyx/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="h-8 w-8 rounded-full bg-gold-400 flex items-center justify-center">
              <Scissors className="h-3.5 w-3.5 text-onyx" strokeWidth={2.5} />
            </div>
            <span className="font-display text-base font-bold text-white">
              Studio<span className="text-gold-400">Nova</span>
            </span>
          </Link>
          <StepBar current={step} />
          <div className="shrink-0 text-white/30 text-xs hidden sm:block">
            Paso {step + 1} de {STEPS.length}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className={cn(
          "grid gap-8",
          step < 4 && form.service ? "lg:grid-cols-[1fr_300px]" : ""
        )}>
          {/* Main panel */}
          <div className="min-w-0">
            {/* Step panels */}
            <div key={step} style={{ animation: "fadeUp 0.4s ease-out both" }}>
              {step === 0 && (
                <Step1
                  selectedService={form.service}
                  onSelect={(s) => setForm((f) => ({ ...f, service: s }))}
                />
              )}
              {step === 1 && (
                <Step2
                  selectedStaff={form.staff}
                  onSelect={(s) => setForm((f) => ({ ...f, staff: s }))}
                />
              )}
              {step === 2 && (
                <Step3
                  selectedDate={form.date}
                  selectedTime={form.time}
                  onSelectDate={(d) => setForm((f) => ({ ...f, date: d }))}
                  onSelectTime={(t) => setForm((f) => ({ ...f, time: t }))}
                />
              )}
              {step === 3 && (
                <Step4 form={form} onChange={updateField} />
              )}
              {step === 4 && (
                <Step5 form={form} bookingId={bookingId} />
              )}
            </div>

            {/* Navigation buttons */}
            {step < 4 && (
              <div className="flex items-center justify-between mt-10 pt-8 border-t border-white/8">
                <button
                  onClick={handlePrev}
                  disabled={step === 0}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/60 hover:border-white/30 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Anterior
                </button>

                <button
                  onClick={handleNext}
                  disabled={!canAdvance()}
                  className="inline-flex items-center gap-2 rounded-full bg-gold-400 hover:bg-gold-300 text-onyx font-bold px-8 py-3 text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold-400/30 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {step === 3 ? "Confirmar y pagar" : "Siguiente"}
                  {step === 3 ? <Lock className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                </button>
              </div>
            )}
          </div>

          {/* Summary sidebar — only visible steps 1+ */}
          {step > 0 && step < 4 && (
            <aside className="hidden lg:block">
              <BookingSummary form={form} step={step} />
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
