import Navbar       from "@/components/landing/Navbar";
import Hero         from "@/components/landing/Hero";
import Services     from "@/components/landing/Services";
import Team         from "@/components/landing/Team";
import Gallery      from "@/components/landing/Gallery";
import Testimonials from "@/components/landing/Testimonials";
import Pricing      from "@/components/landing/Pricing";
import Footer       from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Team />
      <Gallery />
      <Testimonials />
      <Pricing />
      <Footer />
    </main>
  );
}
