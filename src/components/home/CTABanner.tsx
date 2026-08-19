import { Link } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";
import Section from "../Section";

const CTABanner = () => {
  return (
    <Section>
      <div className="relative glass-card rounded-3xl p-12 md:p-20 text-center overflow-hidden">
        <div className="absolute inset-0 section-glow pointer-events-none" />
        <div className="relative z-10">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground leading-tight">
            Let's Build Something
            <br />
            <span className="gradient-text">Structured.</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-lg mx-auto">
            Ready to transform your brand with a strategic, systems-driven approach?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              to="/contact"
              className="glow-button px-8 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground inline-flex items-center gap-2"
            >
              Schedule a Call <ArrowRight size={16} />
            </Link>

          </div>
        </div>
      </div>
    </Section>
  );
};

export default CTABanner;
