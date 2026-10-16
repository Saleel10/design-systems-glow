import { motion } from 'framer-motion';
import { PROCESS } from '@/data/portfolioData';

export default function ProcessSection() {
  return (
    <section className="w-full py-20 sm:py-24 px-6 md:px-12 bg-[var(--bg)] transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <div className="font-heading text-xs tracking-[0.14em] uppercase text-[var(--accent)] font-semibold">
            Process
          </div>
          <h2 className="mt-3 font-heading font-semibold text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight text-[var(--ink)]">
            How I{' '}
            <span className="font-serif-italic font-medium brand-gradient-text">
              work
            </span>
          </h2>
          <p className="mt-3.5 max-w-md mx-auto text-sm sm:text-base text-[var(--muted)] leading-relaxed">
            A structured, repeatable process that ensures quality at every stage.
          </p>
        </div>

        {/* 4 Process Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROCESS.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative bg-[var(--card)] border border-[var(--line)] rounded-[22px] p-7 pt-8 shadow-[0_16px_34px_-24px_rgba(0,0,0,0.2)] overflow-hidden group hover:border-[var(--line2)] hover:-translate-y-1 transition-all"
            >
              {/* Ambient radial glow */}
              <div className="absolute -right-14 -top-14 w-44 h-44 rounded-full bg-[radial-gradient(circle,rgba(86,169,51,0.2),transparent_70%)] pointer-events-none" />

              {/* Big Gradient Step Number */}
              <div className="absolute right-5 top-4 text-5xl sm:text-6xl font-bold tracking-tighter leading-none brand-gradient-text opacity-85 select-none pointer-events-none">
                {p.n}
              </div>

              {/* Diamond Badge Box */}
              <div className="w-10 h-10 rounded-xl brand-gradient flex items-center justify-center mb-10 shadow-[0_8px_20px_-8px_rgba(40,140,80,0.6)]">
                <div className="w-2.5 h-2.5 bg-white rotate-45" />
              </div>

              {/* Content */}
              <div className="text-xl font-medium text-[var(--ink)]">
                {p.title}
              </div>
              <p className="text-sm sm:text-[14.5px] leading-relaxed text-[var(--muted)] mt-2.5">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
