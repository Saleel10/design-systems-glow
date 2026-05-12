import { motion } from "framer-motion";
import {
  Hexagon,
  Triangle,
  Circle,
  Square,
  Diamond,
  Zap,
  Sparkles,
  Orbit,
  Cloud,
  Activity,
} from "lucide-react";

const clients = [
  { name: "Hexnode", Icon: Hexagon },
  { name: "Trigon", Icon: Triangle },
  { name: "Orbital", Icon: Orbit },
  { name: "Lumen", Icon: Sparkles },
  { name: "Vertex", Icon: Diamond },
  { name: "Quanta", Icon: Square },
  { name: "Helios", Icon: Zap },
  { name: "Nimbus", Icon: Cloud },
  { name: "Pulse", Icon: Activity },
  { name: "Northwind", Icon: Circle },
];

const ClientsSection = () => {
  return (
    <section className="py-16 md:py-20 border-y border-border bg-card/30">
      <div className="container">
        <div className="text-center mb-10">
          <span className="text-primary text-xs font-semibold tracking-widest uppercase">
            Trusted Clients
          </span>
          <h3 className="mt-3 font-heading text-2xl md:text-3xl font-bold text-foreground">
            Brands I've worked with
          </h3>
          <p className="mt-2 text-muted-foreground text-sm">
            Worked with 50+ brands in marketing, medical, fitness, sports, and education sectors
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

          <motion.div
            className="flex gap-6 md:gap-8 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 35, ease: "linear", repeat: Infinity }}
          >
            {[...clients, ...clients].map(({ name, Icon }, i) => (
              <div
                key={i}
                className="group flex items-center gap-3 min-w-[200px] h-20 px-8 glass-card rounded-2xl border border-border/40 hover:border-primary/50 transition-all"
              >
                <Icon
                  className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors"
                  strokeWidth={1.5}
                />
                <span className="font-heading text-lg font-bold tracking-tight text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
                  {name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
