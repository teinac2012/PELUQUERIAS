export type ServiceCategory = "hombre" | "mujer";

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // minutes
  category: ServiceCategory;
  icon: string;
  popular?: boolean;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  rating: number;
  reviews: number;
  experience: number; // years
  avatar: string;
  available: boolean;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  visits: number;
  totalSpent: number;
  lastVisit: string;
  vip: boolean;
  notes?: string;
}

export interface Appointment {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  service: string;
  staffMember: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: "confirmada" | "pendiente" | "completada" | "cancelada";
  notes?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  service: string;
  avatar: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

export interface RevenueDataPoint {
  date: string;
  revenue: number;
  appointments: number;
}

export interface BookingFormData {
  service?: Service;
  staff?: StaffMember;
  date?: Date;
  time?: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes: string;
}
