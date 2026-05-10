import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Section from "../Section";
import SectionHeader from "../SectionHeader";

const works = [
  { title: "Nexus Brand System", category: "Branding", year: "2024", color: "from-secondary to-primary" },
  { title: "Fintech Dashboard", category: "UI/UX", year: "2024", color: "from-primary to-accent" },
  { title: "E-Commerce Redesign", category: "Web", year: "2023", color: "from-accent to-secondary" },
  { title: "SaaS Design System", category: "Systems", year: "2023", color: "from-secondary to-accent" },
];

const SelectedWorks = () => {
  return (
    <Section id="works">
      <SectionHeader label="Portfolio" title="Selected Works" description="A curated selection of projects that demonstrate strategic thinking and systematic design." />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {works.map((work, i) => (
          <motion.div
            key={work.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group glass-card glass-card-hover rounded-2xl overflow-hidden cursor-pointer transition-all"
          >
            <div className={`h-56 md:h-72 bg-gradient-to-br ${work.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
            <div className="p-6 flex items-start justify-between">
              <div>
                <span className="text-xs text-primary font-medium">{work.category} · {work.year}</span>
                <h3 className="font-heading text-xl font-semibold text-foreground mt-1">{work.title}</h3>
              </div>
              <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center group-hover:bg-primary transition-colors">
                <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-primary-foreground transition-colors" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default SelectedWorks;
