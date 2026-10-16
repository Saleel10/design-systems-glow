import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { WORKS } from '@/data/portfolioData';

// Visual preview configurations for selected works without client company logos
const TOP_WORKS = [
  {
    ...WORKS[0], // Taxverse - Branding
    gradient: 'from-[#0b241b] via-[#103024] to-[#071610]',
    accentColor: '#5cb847',
    previewType: 'brand' as const,
  },
  {
    ...WORKS[1], // Trevio - UI/UX
    gradient: 'from-[#0c242e] via-[#0d2f3c] to-[#07171d]',
    accentColor: '#38bdf8',
    previewType: 'ui' as const,
  },
  {
    ...WORKS[2], // Shad Creative Education - Branding
    gradient: 'from-[#2a2010] via-[#352814] to-[#1a140a]',
    accentColor: '#f59e0b',
    previewType: 'system' as const,
  },
];

export default function SelectedWorks() {
  return (
    <section className="w-full py-20 sm:py-24 px-6 md:px-12 bg-[var(--bg)] transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Header with Entrance Animation */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="font-heading text-xs tracking-[0.14em] uppercase text-[#5cb847] hover:text-[#76d65e] transition-colors font-semibold">
              Portfolio
            </div>
            <h2 className="mt-3 font-heading font-semibold text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight text-[var(--ink)]">
              Selected{' '}
              <span className="font-serif-italic font-medium brand-gradient-text">
                works
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
              to="/works"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--line)] bg-[var(--card)] text-sm font-medium text-[var(--ink)] shadow-sm hover:border-[#5cb847] hover:text-[#5cb847] hover:bg-[#5cb847]/10 hover:shadow-[0_0_16px_rgba(92,184,71,0.25)] hover:scale-[1.02] transition-all duration-200"
            >
              <span>All works</span>
              <span>→</span>
            </Link>
          </motion.div>
        </div>

        {/* 3-Column Works Grid with Entrance Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOP_WORKS.map((work, i) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.1 + i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={`/work/${work.slug}`}
                className="flex flex-col gap-3.5 group cursor-pointer block"
              >
                {/* Showcase Card Media (clean visual preview, no client logos) */}
                <div
                  className={`relative aspect-[4/3.2] rounded-[22px] overflow-hidden border border-[var(--line)] bg-gradient-to-br ${work.gradient} flex flex-col justify-between p-6 group-hover:scale-[1.02] group-hover:shadow-[0_20px_40px_-16px_rgba(0,0,0,0.4)] transition-all duration-300`}
                >
                  {/* Radial ambient highlight */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.08),transparent_70%)] pointer-events-none" />

                  {/* Top preview bar */}
                  <div className="relative z-10 flex items-center justify-between w-full">
                    <div className="flex items-center gap-1.5 opacity-60">
                      <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    </div>
                  </div>

                  {/* Center abstract artwork / UI mockup preview */}
                  <div className="relative z-10 flex flex-col items-center justify-center my-auto py-2 w-full">
                    {work.previewType === 'brand' && (
                      <div className="w-full max-w-[210px] bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md shadow-lg group-hover:border-[#5cb847]/40 transition-colors">
                        <div className="h-2 w-16 bg-[#5cb847] rounded-full mb-3" />
                        <div className="space-y-1.5">
                          <div className="h-1.5 w-full bg-white/20 rounded" />
                          <div className="h-1.5 w-4/5 bg-white/15 rounded" />
                          <div className="h-1.5 w-3/5 bg-white/10 rounded" />
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex gap-1.5">
                            <span className="w-3.5 h-3.5 rounded-full bg-[#13806f]" />
                            <span className="w-3.5 h-3.5 rounded-full bg-[#5cb847]" />
                            <span className="w-3.5 h-3.5 rounded-full bg-white/80" />
                          </div>
                          <span className="text-[9px] font-mono text-white/40 tracking-wider">SYSTEM</span>
                        </div>
                      </div>
                    )}

                    {work.previewType === 'ui' && (
                      <div className="w-full max-w-[210px] bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md shadow-lg group-hover:border-[#38bdf8]/40 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-6 h-6 rounded-lg bg-[#38bdf8]/25 flex items-center justify-center text-[10px] text-[#38bdf8] font-bold">
                            UI
                          </div>
                          <div className="h-1.5 w-14 bg-white/20 rounded-full" />
                        </div>
                        <div className="grid grid-cols-2 gap-2 my-2">
                          <div className="p-1.5 rounded bg-white/5 border border-white/5">
                            <div className="text-[9px] text-white/40">Efficiency</div>
                            <div className="text-xs font-bold text-white mt-0.5">3.4x</div>
                          </div>
                          <div className="p-1.5 rounded bg-white/5 border border-white/5">
                            <div className="text-[9px] text-white/40">Flow</div>
                            <div className="text-xs font-bold text-[#38bdf8] mt-0.5">+48%</div>
                          </div>
                        </div>
                        <div className="h-1.5 w-full bg-white/20 rounded mt-1.5" />
                      </div>
                    )}

                    {work.previewType === 'system' && (
                      <div className="w-full max-w-[210px] bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md shadow-lg group-hover:border-[#f59e0b]/40 transition-colors">
                        <div className="flex items-center gap-2 mb-2.5">
                          <span className="text-sm font-serif italic text-[#f59e0b]">Aa</span>
                          <div className="h-1.5 w-16 bg-white/20 rounded" />
                        </div>
                        <div className="h-px w-full bg-white/10 my-2" />
                        <div className="flex justify-between items-center text-[11px] text-white/70">
                          <span className="font-mono text-[10px] text-white/60">EN · AR</span>
                          <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-white/90">2024</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom View badge */}
                  <div className="relative z-10 flex items-end justify-end w-full">
                    <div className="w-8 h-8 rounded-full bg-[var(--card)]/90 backdrop-blur-sm border border-[var(--line)] flex items-center justify-center group-hover:bg-[#5cb847] group-hover:border-[#5cb847] transition-all shadow-sm">
                      <ArrowUpRight className="w-4 h-4 text-[var(--ink)] group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>

                {/* Work Meta Info */}
                <div className="flex justify-between items-baseline gap-3 px-1">
                  <div>
                    <div className="text-lg font-medium text-[var(--ink)] group-hover:text-[#5cb847] transition-colors">
                      {work.title}
                    </div>
                    <div className="text-sm text-[var(--muted)] mt-0.5">
                      <span className="text-[#5cb847] font-medium group-hover:text-[#76d65e] transition-colors">{work.cat}</span> · {work.cta}
                    </div>
                  </div>
                  <div className="font-heading text-xs text-[var(--muted2)]">
                    {work.year}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
