import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/use-theme';

// Client logos from assets
import buraqLogo from '@/assets/buraq-logo.png';
import crafterlineLogo from '@/assets/Crafterline-logo.png';
import destinifyLogo from '@/assets/destinify-logo.png';
import falahLogo from '@/assets/falah-logo.png';
import gazpachoLogo from '@/assets/gazpacho-logo.png';
import gloryboardLogo from '@/assets/Gloryboard-logo.png';
import innostaLogo from '@/assets/innosta-logo.png';
import kidozyLogo from '@/assets/kidozy-logo.png';
import kimsLogo from '@/assets/kims-logo.png';
import kmsLogo from '@/assets/kms-logo.png';
import mediflowLogo from '@/assets/mediflow-logo.png';
import mediwellLogo from '@/assets/mediwell-logo.png';
import navigatorLogo from '@/assets/Navigator-logo.png';
import pspLogo from '@/assets/psp-logo.png';
import raidhanLogo from '@/assets/raidhan-logo.png';
import secondstreetLogo from '@/assets/Secondstreet-logo.png';
import shadLogo from '@/assets/shad-logo.png';
import taxverseLogo from '@/assets/Taxverse-logo.png';
import trevioLogo from '@/assets/trevio-logo.png';
import skillayoLogo from '@/assets/skillayo-logo.png';

interface ClientItem {
  name: string;
  logo?: string;
  logoLight?: string;
  logoDark?: string;
}

const CLIENTS: ClientItem[] = [
  { name: 'Taxverse', logo: taxverseLogo },
  { name: 'Trevio', logo: trevioLogo },
  { name: 'Skillayo', logo: skillayoLogo },
  { name: 'Shad', logo: shadLogo },
  { name: '2nd Street', logo: secondstreetLogo },
  { name: 'Buraq', logo: buraqLogo },
  { name: 'Raidhan', logo: raidhanLogo },
  { name: 'Kidozy', logo: kidozyLogo },
  { name: 'Mediwell', logo: mediwellLogo },
  { name: 'Destinify', logo: destinifyLogo },
  { name: 'Crafterline', logo: crafterlineLogo },
  { name: 'Gloryboard', logo: gloryboardLogo },
  { name: 'Innosta', logo: innostaLogo },
  { name: 'KIMS', logo: kimsLogo },
  { name: 'Mediflow', logo: mediflowLogo },
  { name: 'Falah', logo: falahLogo },
];

export default function ClientsSection() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section className="pt-20 sm:pt-28 pb-16 sm:pb-24 text-center border-t border-[var(--line)] bg-[var(--bg)] transition-colors">
      <div className="font-heading text-xs tracking-[0.14em] uppercase text-[var(--accent)] font-semibold">
        Trusted clients
      </div>

      <h2 className="mt-3 font-heading font-semibold text-3xl sm:text-5xl lg:text-6xl leading-tight tracking-tight text-[var(--ink)]">
        Brands I've{' '}
        <span className="font-serif-italic font-medium brand-gradient-text">
          worked with
        </span>
      </h2>

      <p className="mt-3.5 max-w-lg mx-auto text-sm sm:text-base text-[var(--muted)] leading-relaxed px-4">
        50+ brands across marketing, medical, fitness, sports, and education.
      </p>

      {/* Marquee with mask */}
      <div className="overflow-hidden mt-8 sm:mt-10 py-5 sm:py-6 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)] [-webkit-mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <motion.div
          className="flex gap-2.5 sm:gap-5 w-max py-2"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 35,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          {[...CLIENTS, ...CLIENTS].map((client, i) => {
            const logoSrc = client.logoLight
              ? (isLight ? client.logoLight : client.logoDark)
              : client.logo;

            return (
              <div
                key={`${client.name}-${i}`}
                className="group flex-none w-[148px] sm:w-[270px] h-[68px] sm:h-[118px] rounded-[14px] sm:rounded-[20px] bg-[var(--card)] border border-[var(--line)] flex items-center justify-center p-2.5 sm:p-5 shadow-sm hover:border-[#5cb847]/40 hover:bg-[#5cb847]/[0.03] hover:shadow-[0_8px_20px_-8px_rgba(0,0,0,0.3)] hover:scale-[1.02] cursor-pointer transition-all duration-300"
              >
                {logoSrc ? (
                  <img
                    src={logoSrc}
                    alt={client.name}
                    className={`w-auto h-auto max-h-[24px] sm:max-h-[46px] max-w-[95px] sm:max-w-[160px] object-contain transition-all duration-300 group-hover:scale-105 ${
                      client.logoLight
                        ? 'opacity-85 group-hover:opacity-100'
                        : isLight
                        ? 'brightness-0 opacity-70 group-hover:opacity-95'
                        : 'opacity-80 group-hover:opacity-100 brightness-100'
                    }`}
                  />
                ) : (
                  <span className="text-sm sm:text-xl font-semibold tracking-tight text-[var(--ink)] group-hover:text-[#5cb847] transition-colors">
                    {client.name}
                  </span>
                )}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}