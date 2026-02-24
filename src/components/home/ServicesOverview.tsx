import { motion } from "framer-motion";
import { Palette, Layout, Layers, Globe, Lightbulb, Compass } from "lucide-react";
import Section from "../Section";
import SectionHeader from "../SectionHeader";

const services = [
  { icon: Palette, title: "Brand Identity Design", desc: "Strategic brand systems that communicate your vision with clarity and consistency." },
  { icon: Layout, title: "UI/UX Design", desc: "User-centered interfaces built on research, testing, and iterative refinement." },
  { icon: Layers, title: "Design Systems", desc: "Scalable component libraries and design tokens for product consistency." },
  { icon: Globe, title: "Website & Landing Pages", desc: "Conversion-optimized web experiences that turn visitors into customers." },
  { icon: Lightbulb, title: "Product Strategy", desc: "Strategic design direction aligned with business goals and user needs." },
  { icon: Compass, title: "Creative Direction", desc: "Visual leadership that ensures brand coherence across all touchpoints." },
];

const ServicesOverview = () => {
  return (
    <Section>
      <SectionHeader label="Services" title="What I Do" description="End-to-end design services from brand strategy to pixel-perfect execution." />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="glass-card glass-card-hover rounded-2xl p-8 group cursor-pointer transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
              <service.icon size={22} className="text-primary" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{service.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default ServicesOverview;
