import { motion } from "framer-motion";

import boobooLogo from "@/assets/booboologo.png";
import buraqLogo from "@/assets/buraqlogo.png";
import crafterlineLogo from "@/assets/crafterlinelogo.png";
import destinifyLogo from "@/assets/destinifylogo.png";
import falahLogo from "@/assets/falahlogo.png";
import gazpachoLogo from "@/assets/gazpachologo.png";
import gloryboardLogo from "@/assets/gloryboardlogo.png";
import innostaLogo from "@/assets/innostalogo.png";
import kidozyLogo from "@/assets/kidozylogo.png";
import kimsLogo from "@/assets/kimslogo.png";
import kmsLogo from "@/assets/kmslogo.png";
import mediflowLogo from "@/assets/mediflowlogo.png";
import mediwellLogo from "@/assets/mediwelllogo.png";
import navigatorLogo from "@/assets/navigatorlogo.png";
import pspLogo from "@/assets/psplogo.png";
import raidhanLogo from "@/assets/raidhanlogo.png";
import secondstreetLogo from "@/assets/secondstreetlogo.png";
import shadLogo from "@/assets/shadlogo.png";
import taxverseLogo from "@/assets/taxverselogo.png";
import trevioLogo from "@/assets/treviologo.png";

const clients = [
  boobooLogo,
  buraqLogo,
  crafterlineLogo,
  destinifyLogo,
  falahLogo,
  gazpachoLogo,
  gloryboardLogo,
  innostaLogo,
  kidozyLogo,
  kimsLogo,
  kmsLogo,
  mediflowLogo,
  mediwellLogo,
  navigatorLogo,
  pspLogo,
  raidhanLogo,
  secondstreetLogo,
  shadLogo,
  taxverseLogo,
  trevioLogo,
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
            Brands I’ve worked with
          </h3>

          <p className="mt-3 text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            Worked with 50+ brands in marketing, medical, fitness,
            sports, and education sectors
          </p>
        </div>

        {/* Logo Slider */}
        <div className="relative">
          {/* Left Gradient */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />

          {/* Right Gradient */}
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