import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '@/data/portfolioData';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="w-full py-20 sm:py-28 px-6 md:px-12 bg-[var(--bg)] transition-colors">
      <div className="max-w-5xl mx-auto text-center">
        {/* Header tag matching 3rd reference image with Entrance Animation */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="font-heading text-xs sm:text-[13px] tracking-[0.2em] uppercase text-[#5cb847] font-semibold mb-2.5">
            TESTIMONIALS
          </div>

          {/* Title matching user request: Playfair Display italic + brand gradient */}
          <h2 className="font-heading font-semibold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[var(--ink)] mb-10 sm:mb-14">
            What{" "}
            <span className="font-serif-italic font-medium brand-gradient-text">
              Clients Say
            </span>
          </h2>
        </motion.div>

        {/* Main Testimonial Card with Entrance Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-[var(--card)] border border-[var(--line)] rounded-[28px] sm:rounded-[36px] p-8 sm:p-14 md:p-16 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.3)] overflow-hidden transition-colors"
        >
          {/* Subtle ambient green glow in the background */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(92,184,71,0.12),transparent_70%)] pointer-events-none blur-3xl" />

          {/* Green Double Quote Icon */}
          <div className="flex justify-center mb-8 relative z-10">
            <svg
              className="w-10 h-10 sm:w-12 sm:h-12 text-[#5cb847] opacity-95 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          {/* Animated Quote Content */}
          <div className="min-h-[170px] sm:min-h-[190px] flex flex-col justify-center relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
                <blockquote className="max-w-3xl mx-auto text-base sm:text-lg md:text-[20px] leading-relaxed sm:leading-[1.7] text-[var(--ink)] font-normal text-balance">
                  "{current.quote}"
                </blockquote>

                {/* Author Info without round profile image, with LinkedIn link */}
                <div className="mt-8 pt-2">
                  {current.linkedin ? (
                    <a
                      href={current.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 font-semibold text-base sm:text-lg text-[var(--ink)] hover:text-[#5cb847] tracking-tight transition-colors group/link cursor-pointer"
                      title={`Visit ${current.author}'s LinkedIn Profile`}
                    >
                      <span>{current.author}</span>
                      <svg
                        className="w-4 h-4 text-[#5cb847] opacity-80 group-hover/link:opacity-100 group-hover/link:scale-110 transition-all shrink-0"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                      </svg>
                    </a>
                  ) : (
                    <div className="font-semibold text-base sm:text-lg text-[var(--ink)] tracking-tight">
                      {current.author}
                    </div>
                  )}
                  <div className="text-xs sm:text-sm text-[var(--muted)] mt-1">
                    {current.role}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Carousel Pagination Controls matching reference with Entrance Animation */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center gap-4 mt-8 sm:mt-10"
        >
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="w-10 h-10 rounded-full border border-[var(--line)] bg-[var(--card)] text-[var(--muted)] hover:text-[#5cb847] hover:border-[#5cb847] hover:scale-105 active:scale-95 flex items-center justify-center transition-all shadow-sm cursor-pointer"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Indicators with active pill */}
          <div className="flex items-center gap-2 px-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  i === currentIndex
                    ? 'w-6 h-2 bg-[#5cb847] shadow-[0_0_8px_rgba(92,184,71,0.45)]'
                    : 'w-2 h-2 bg-[var(--line2)] hover:bg-[var(--muted)]'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="w-10 h-10 rounded-full border border-[var(--line)] bg-[var(--card)] text-[var(--muted)] hover:text-[#5cb847] hover:border-[#5cb847] hover:scale-105 active:scale-95 flex items-center justify-center transition-all shadow-sm cursor-pointer"
          >
            <ChevronRight size={18} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
