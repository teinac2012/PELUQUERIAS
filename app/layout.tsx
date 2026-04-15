import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "StudioNova — Barbershop & Salón de Belleza Premium · Madrid",
  description:
    "StudioNova: Tu barbería y salón de belleza de lujo en el corazón de Madrid. Reserva tu cita online. Cortes, barba, coloración, tratamientos y más.",
  keywords: ["barbería", "salón de belleza", "Madrid", "reservas online", "corte de pelo"],
  openGraph: {
    title: "StudioNova — Barbershop & Salón Premium",
    description: "Reserva tu cita en StudioNova, la referencia del cuidado personal en Madrid.",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-onyx text-white">{children}</body>
    </html>
  );
}

