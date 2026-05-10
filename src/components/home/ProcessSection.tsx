import { motion } from "framer-motion";
import { Search, Target, PenTool, Rocket } from "lucide-react";
import Section from "../Section";
import SectionHeader from "../SectionHeader";

const steps = [
  { icon: Search, num: "01", title: "Discover", desc: "Research, stakeholder interviews, and competitive analysis to understand the problem space." },
  { icon: Target, num: "02", title: "Define", desc: "Synthesize insights into clear objectives, user personas, and strategic direction." },
  { icon: PenTool, num: "03", title: "Design", desc: "Wireframes, prototypes, and iterative design with continuous feedback loops." },
  { icon: Rocket, num: "04", title: "Deliver", desc: "Polished deliverables, design systems documentation, and seamless handoff." },
];

const ProcessSection = () => {
  return (
    <Section>
      <SectionHeader label="Process" title="How I Work" description="A structured, repeatable process that ensures quality at every stage." />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            className="glass-card rounded-2xl p-8 relative overflow-hidden group"
          >
            <span className="absolute top-4 right-4 font-heading text-5xl font-bold text-foreground/5">{step.num}</span>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
              <step.icon size={22} className="text-primary" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default ProcessSection;
