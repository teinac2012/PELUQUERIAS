import BookingWizard from "@/components/booking/BookingWizard";

export const metadata = {
  title: "Reservar Cita — MitchellNova",
  description: "Reserva tu cita en MitchellNova. Elige tu servicio, profesional y horario favorito.",
};

export default function BookingPage() {
  return <BookingWizard />;
}
