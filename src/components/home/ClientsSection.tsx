import { motion } from "framer-motion";

const clients = [
  "/src/assets/booboo logo.png",
  "/src/assets/buraq logo.png",
  "/src/assets/Crafterline logo.png",
  "/src/assets/destinify logo.png",
  "/src/assets/falah logo.png",
  "/src/assets/gazpacho logo.png",
  "/src/assets/Gloryboard logo.png",
  "/src/assets/innosta logo.png",
  "/src/assets/kidozy logo.png",
  "/src/assets/kims logo.png",
  "/src/assets/kms logo.png",
  "/src/assets/mediflow logo.png",
  "/src/assets/mediwell logo.png",
  "/src/assets/Navigator logo.png",
  "/src/assets/psp logo.png",
  "/src/assets/raidhan logo.png",
  "/src/assets/Secondstreet logo.png",
  "/src/assets/shad logo.png",
  "/src/assets/spunge logo.png",
  "/src/assets/Taxverse logo.png",
  "/src/assets/trevio logo.png",
];

const ClientsSection = () => {
  return (
    <section className="py-16 md:py-20 border-y border-border bg-card/30 overflow-hidden">
      <div className="container">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="text-primary text-xs font-semibold tracking-widest uppercase">
            Trusted Clients
          </span>

          <h3 className="mt-3 font-heading text-3xl md:text-4xl font-bold text-foreground">
            Brands I've worked with
          </h3>
          <p className="mt-2 text-muted-foreground text-sm">
            Worked with 50+ brands in marketing, medical, fitness, sports, and education sectors
          </p>
        </div>

        {/* Logo Marquee */}
        <div className="relative">
          {/* Left Fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />

          {/* Right Fade */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

          <motion.div
  className="flex gap-8 md:gap-10 w-max"
  animate={{ x: ["0%", "-50%"] }}
  transition={{
    duration: 60,
    ease: "linear",
    repeat: Infinity,
  }}
>
            {[...clients, ...clients].map((logo, i) => (
              <div
                key={i}
                className="flex items-center justify-center min-w-[220px] h-28 px-8 rounded-3xl border border-border/40 bg-background/60 backdrop-blur-xl hover:border-primary/50 transition-all duration-300"
              >
                <img
                  src={logo}
                  alt="client-logo"
                  className="h-24 md:h-28 w-auto object-contain grayscale hover:grayscale-0 hover:scale-110 transition-all duration-300"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;