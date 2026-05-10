import { motion } from "framer-motion";

const clients = [
  "Acme Corp",
  "Northwind",
  "Stripeline",
  "Lumen",
  "Vertex",
  "Quanta",
  "Helios",
  "Orbital",
  "Nimbus",
  "Pulse",
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
        </div>

        <div className="relative overflow-hidden">
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

          <motion.div
            className="flex gap-12 md:gap-16 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          >
            {[...clients, ...clients].map((name, i) => (
              <div
                key={i}
                className="flex items-center justify-center min-w-[160px] h-16 px-6 glass-card rounded-xl"
              >
                <span className="font-heading text-lg font-bold tracking-tight text-muted-foreground hover:text-primary transition-colors whitespace-nowrap">
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
