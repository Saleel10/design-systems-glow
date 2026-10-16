import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PLANS } from '@/data/portfolioData';
import { useTheme } from '@/hooks/use-theme';

export default function PricingPreview() {
  const { theme } = useTheme();
  const isDarkTheme = theme === 'dark';

  return (
    <section className="w-full py-12 sm:py-20 px-6 md:px-12 bg-[var(--bg)] transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Header with Entrance Animation */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="font-heading text-xs tracking-[0.14em] uppercase text-[var(--accent)] font-semibold">
              Pricing
            </div>
            <h2 className="mt-3 font-heading font-semibold text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight text-[var(--ink)]">
              Freelance{' '}
              <span className="font-serif-italic font-medium brand-gradient-text">
                packages
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to="/pricing"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--line)] bg-[var(--card)] text-sm font-medium text-[var(--ink)] hover:border-[var(--line2)] hover:scale-105 active:scale-95 transition-all shadow-sm"
            >
              <span>Compare all</span>
              <span>→</span>
            </Link>
          </motion.div>
        </div>

        {/* 3 Pricing Cards with Staggered Entrance Animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PLANS.map((plan, i) => {
            const isFeatured = plan.dark || plan.name === 'Brand Identity';
            const isFeaturedInDark = isFeatured && isDarkTheme;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  delay: 0.1 + i * 0.1,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              className={`pricing-card group rounded-[24px] p-7 sm:p-8 flex flex-col justify-between shadow-[0_16px_34px_-24px_rgba(0,0,0,0.25)] border transition-all duration-300 ${
                isFeaturedInDark
                  ? 'bg-white text-black border-transparent shadow-[0_20px_45px_-12px_rgba(255,255,255,0.12)]'
                  : plan.dark
                  ? 'bg-[var(--panel)] text-white border-[var(--line)]'
                  : 'bg-[var(--card)] text-[var(--ink)] border-[var(--line)]'
              }`}
            >
              <div>
                <div className="flex justify-between items-center">
                  <div className={`text-xl font-medium tracking-tight ${isFeaturedInDark ? 'text-black font-semibold' : ''}`}>
                    {plan.name}
                  </div>
                  {plan.badge && (
                    <span
                      className={`text-[11px] font-heading font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                        isFeaturedInDark
                          ? 'bg-[#e8f7ee] text-[#1e834b] border-[#1e834b]/20'
                          : 'bg-[var(--tint)] text-[var(--accent)] border-[var(--accent)]/20'
                      }`}
                    >
                      {plan.badge}
                    </span>
                  )}
                </div>

                <div className={`text-sm mt-1 ${isFeaturedInDark ? 'text-neutral-600' : 'opacity-70'}`}>
                  {plan.sub}
                </div>

                <div className={`font-semibold tracking-tight text-4xl sm:text-5xl leading-none mt-5 ${isFeaturedInDark ? 'text-black' : ''}`}>
                  {plan.price}
                  <span className={`text-sm font-normal ${isFeaturedInDark ? 'text-neutral-500' : 'opacity-60'}`}>
                    {' '}
                    /project
                  </span>
                </div>

                <div className={`text-xs mt-2 ${isFeaturedInDark ? 'text-neutral-600' : 'opacity-75'}`}>
                  {plan.delivery}
                </div>
              </div>

              <a
                href="https://cal.com/muhammed-saleel-yjtcye/30min"
                target="_blank"
                rel="noreferrer"
                className={`pricing-cta mt-7 text-center py-3.5 px-6 rounded-full text-sm font-medium transition-all duration-300 block no-underline ${
                  isFeatured
                    ? 'brand-gradient text-white shadow-[0_8px_24px_-6px_rgba(92,184,71,0.45)]'
                    : 'bg-[var(--ink)] text-[var(--bg)] border border-transparent active:scale-95'
                }`}
              >
                Book a call ↗
              </a>
            </motion.div>
          );
        })}
      </div>
      </div>
    </section>
  );
}
