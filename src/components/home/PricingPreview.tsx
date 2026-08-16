import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import Section from "../Section";
import SectionHeader from "../SectionHeader";

const plans = [
  {
    name: "Starter",
    price: "₹20,000",
    desc: "Logo + Basic Brand Kit",
    popular: false,
    features: [
      "Logo Design (2 Concepts)",
      "Color Palette",
      "Typography Selection",
      "Basic Brand Guide",
      "Social Media Templates (5)",
      "Profile & Cover image",
      "5–7 Day Delivery"
    ],
  },
  {
    name: "Professional",
    price: "₹32,000",
    desc: "Complete Brand Identity",
    popular: true,
    features: [
      "Logo Design (4 Concepts)",
      "Complete Brand Identity",
      "Brand Guidelines Document",
      "Business Card & Stationery Design",
      "Social Media Kit (8 Templates)",
      "Packaging Design (1 Product)",
      "Presentation Template",
      "12–16 Day Delivery"
    ],
  },
  {
    name: "Premium",
    price: "₹55,000",
    desc: "Brand + Digital Experience",
    popular: false,
    features: [
      "Everything in Professional",
      "UI/UX Design (Up to 5 Pages)",
      "Design System & Components",
      "Website Prototype (Figma)",
      "Packaging Design (Up to 3 Products)",
      "Custom Icons & Illustrations",
      "Pitch Deck",
      "15 Days Design Support",
      "18–25 Day Delivery"
    ],
  },
];

const PricingPreview = () => {
  return (
    <Section id="pricing">
      <SectionHeader label="Pricing" title="Freelance Packages" description="Transparent pricing for structured brand and design solutions." />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className={`flex flex-col rounded-2xl p-8 relative transition-all ${
              plan.popular
                ? "glass-card border-primary/30 shadow-[0_0_40px_hsl(96_70%_37%/0.1)]"
                : "glass-card glass-card-hover"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 glow-button px-4 py-1 rounded-full text-xs font-semibold text-primary-foreground flex items-center gap-1">
                <Star size={12} /> Most Popular
              </div>
            )}

            <h3 className="font-heading text-xl font-bold text-foreground">{plan.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{plan.desc}</p>
            <div className="mt-6">
              <span className="font-heading text-4xl font-bold text-foreground">{plan.price}</span>
              <span className="text-sm text-muted-foreground ml-1">/project</span>
            </div>

            <div className="mt-8 space-y-3">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3 text-sm">
                  <Check size={14} className="text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-8">
              <button
                className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${
                  plan.popular
                    ? "glow-button text-primary-foreground"
                    : "glass-card glass-card-hover text-foreground"
                }`}
              >
                Book a Call
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default PricingPreview;
