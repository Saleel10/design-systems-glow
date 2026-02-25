import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { projects, filters } from "@/data/projects";

const Works = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-3 block">Portfolio</span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground leading-tight max-w-3xl">
              Selected <span className="gradient-text">Works</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <Section>
        <div className="flex flex-wrap gap-3 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                active === f ? "glow-button text-primary-foreground" : "glass-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((project, i) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <Link
                to={`/works/${project.slug}`}
                className="group glass-card glass-card-hover rounded-2xl overflow-hidden cursor-pointer transition-all block"
              >
                <div className={`h-56 md:h-72 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
                <div className="p-6 flex items-start justify-between">
                  <div>
                    <span className="text-xs text-primary font-medium">{project.category}</span>
                    <h3 className="font-heading text-xl font-semibold text-foreground mt-1">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{project.desc}</p>
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

      <Footer />
    </div>
  );
};

export default Works;
