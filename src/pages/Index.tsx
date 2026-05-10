import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import ClientsSection from "@/components/home/ClientsSection";
import SelectedWorks from "@/components/home/SelectedWorks";
import ServicesOverview from "@/components/home/ServicesOverview";
import ProcessSection from "@/components/home/ProcessSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import PricingPreview from "@/components/home/PricingPreview";
import CTABanner from "@/components/home/CTABanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ClientsSection />
      <SelectedWorks />
      <ServicesOverview />
      <ProcessSection />
      <TestimonialsSection />
      <PricingPreview />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default Index;
