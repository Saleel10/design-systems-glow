import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Section from "../Section";
import SectionHeader from "../SectionHeader";
import { projects } from "@/data/projects";

const SelectedWorks = () => {
  // Use first 4 projects as the selected works
  const displayWorks = projects.slice(0, 4);

  return (
    <Section id="works">
      <SectionHeader label="Portfolio" title="Selected Works" description="A curated selection of projects that demonstrate strategic thinking and systematic design." />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayWorks.map((work, i) => (
          <motion.div
            key={work.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <Link
              to={`/works/${work.slug}`}
              className="group glass-card glass-card-hover rounded-2xl overflow-hidden cursor-pointer transition-all block"
            >
              <div className={`h-56 md:h-72 bg-gradient-to-br ${work.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
              <div className="p-6 flex items-start justify-between">
                <div>
                  <span className="text-xs text-primary font-medium">{work.category} · {work.year}</span>
                  <h3 className="font-heading text-xl font-semibold text-foreground mt-1">{work.title}</h3>
                </div>
                <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center group-hover:bg-primary transition-colors flex-shrink-0">
                  <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default SelectedWorks;
