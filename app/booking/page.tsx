import BookingWizard from "@/components/booking/BookingWizard";

export const metadata = {
  title: "Reservar Cita — StudioNova",
  description: "Reserva tu cita en StudioNova. Elige tu servicio, profesional y horario favorito.",
};

export default function BookingPage() {
  return <BookingWizard />;
}
