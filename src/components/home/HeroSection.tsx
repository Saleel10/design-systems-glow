import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

const stats = [
  { value: "4+", label: "Years Experience" },
  { value: "500+", label: "Projects" },
  { value: "50+", label: "Brands" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 hero-glow pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] section-glow rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-xs font-medium text-primary mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Available for freelance projects
          </motion.span>

          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight text-foreground">
            Designing Systems.
            <br />
            <span className="gradient-text">Not Just Screens.</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
            Building structured digital experiences that align brand, product, and purpose.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link
              to="/contact"
              className="glow-button px-8 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground inline-flex items-center justify-center gap-2"
            >
              Work With Me <ArrowRight size={16} />
            </Link>
            <a
              href="#"
              className="glass-card glass-card-hover px-8 py-3.5 rounded-xl text-sm font-semibold text-foreground inline-flex items-center justify-center gap-2 transition-all"
            >
              <Download size={16} /> Download Resume
            </a>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-3 gap-6 mt-20 max-w-lg"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="border-l border-border pl-4">
              <div className="font-heading text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
