import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SERVICES } from '@/data/portfolioData';

export default function ServicesOverview() {
  return (
    <section className="w-full py-20 sm:py-24 px-6 md:px-12 bg-[var(--card)] border-y border-[var(--line)] transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Header Grid with Entrance Animation */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-end"
        >
          <div>
            <div className="font-heading text-xs tracking-[0.14em] uppercase text-[var(--accent)] font-semibold">
              Services
            </div>
            <h2 className="mt-3 font-heading font-semibold text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight text-[var(--ink)]">
              What I{' '}
              <span className="font-serif-italic font-medium brand-gradient-text">
                do
              </span>
            </h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[var(--muted)] text-base sm:text-lg leading-relaxed max-w-md md:justify-self-end"
          >
            End-to-end design services, from brand strategy to pixel-perfect execution.
          </motion.p>
        </motion.div>

        {/* Services Grid with Staggered Entrance Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-[var(--line)]">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="py-8 pr-6 border-b border-[var(--line)] flex flex-col gap-3 group"
            >
              <div className="font-heading text-xs text-[var(--muted2)] tracking-wider">
                {s.n}
              </div>
              <Link
                to="/services"
                className="text-xl sm:text-[21px] font-medium tracking-tight text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors flex items-center justify-between"
              >
                <span>{s.title}</span>
                <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </Link>
              <p className="text-sm sm:text-[15px] leading-relaxed text-[var(--muted)] max-w-sm">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
