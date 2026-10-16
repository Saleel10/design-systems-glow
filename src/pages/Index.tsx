import PageContainer from "@/components/PageContainer";
import HeroSection from "@/components/home/HeroSection";
import ClientsSection from "@/components/home/ClientsSection";
import ServicesOverview from "@/components/home/ServicesOverview";
import SelectedWorks from "@/components/home/SelectedWorks";
import ProcessSection from "@/components/home/ProcessSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import PricingPreview from "@/components/home/PricingPreview";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <PageContainer showCta={true}>
      <SEO
        title="Saleel Designs — Designing systems, not just screens"
        description="Creative Designer & UI/UX Designer with 5+ years experience building structured digital experiences."
        url="https://saleeldesigns.com/"
      />
      <HeroSection />
      <ClientsSection />
      <ServicesOverview />
      <SelectedWorks />
      <ProcessSection />
      <TestimonialsSection />
      <PricingPreview />
    </PageContainer>
  );
};

export default Index;
