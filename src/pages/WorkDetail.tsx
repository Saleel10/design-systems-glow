import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Clock, Calendar, User, Quote } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { projects } from "@/data/projects";

const WorkDetail = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">Project Not Found</h1>
          <Link to="/works" className="text-primary hover:underline">← Back to Works</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/works" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft size={16} /> Back to Works
            </Link>
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-3 block">{project.category}</span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground leading-tight max-w-3xl mb-6">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><User size={14} /> {project.client}</span>
              <span className="flex items-center gap-2"><Calendar size={14} /> {project.year}</span>
              <span className="flex items-center gap-2"><Clock size={14} /> {project.duration}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero Mockup */}
      <div className="container mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className={`h-64 md:h-96 rounded-2xl bg-gradient-to-br ${project.color} opacity-30`}
        />
      </div>

      {/* Overview */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Project Overview</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">{project.overview}</p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Tools Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span key={tool} className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Problem */}
      <Section>
        <div className="max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-4">The Problem</h2>
          <p className="text-muted-foreground leading-relaxed text-lg">{project.problem}</p>
        </div>
      </Section>

      {/* Research */}
      <Section>
        <h2 className="font-heading text-2xl font-bold text-foreground mb-8">Research Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.research.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="glass-card rounded-xl p-5 flex items-start gap-4"
            >
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0">
                {i + 1}
              </span>
              <p className="text-muted-foreground text-sm leading-relaxed">{item}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section>
        <h2 className="font-heading text-2xl font-bold text-foreground mb-8">Design Process</h2>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-primary/20 hidden md:block" />
          <div className="space-y-6">
            {project.process.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="flex items-start gap-6 md:pl-12 relative"
              >
                <div className="absolute left-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold hidden md:flex">
                  {i + 1}
                </div>
                <div className="glass-card rounded-xl p-5 flex-1">
                  <p className="text-foreground font-medium">{step}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Mockups */}
      <Section>
        <h2 className="font-heading text-2xl font-bold text-foreground mb-8">Wireframes & Final Screens</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.mockups.map((mockup, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="glass-card rounded-2xl overflow-hidden group"
            >
              <div className={`h-48 bg-gradient-to-br ${mockup.gradient} opacity-20 group-hover:opacity-30 transition-opacity`} />
              <div className="p-4">
                <p className="text-sm font-medium text-foreground">{mockup.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Results */}
      <Section>
        <h2 className="font-heading text-2xl font-bold text-foreground mb-8">Results & Key Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.results.map((result, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="glass-card rounded-xl p-5 flex items-center gap-4"
            >
              <ArrowUpRight size={18} className="text-primary flex-shrink-0" />
              <p className="text-foreground font-medium">{result}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Testimonial */}
      {project.testimonial && (
        <Section>
          <div className="glass-card rounded-2xl p-8 md:p-12 max-w-3xl mx-auto text-center">
            <Quote size={32} className="text-primary mx-auto mb-6 opacity-50" />
            <p className="text-lg md:text-xl text-foreground leading-relaxed italic mb-6">
              "{project.testimonial.text}"
            </p>
            <p className="text-primary font-semibold">{project.testimonial.author}</p>
            <p className="text-sm text-muted-foreground">{project.testimonial.role}</p>
          </div>
        </Section>
      )}

      {/* CTA */}
      <Section>
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Like what you see?</h2>
          <p className="text-muted-foreground mb-8">Let's build something structured together.</p>
          <Link to="/contact" className="glow-button px-8 py-3 rounded-lg font-semibold text-primary-foreground">
            Start a Project
          </Link>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default WorkDetail;
