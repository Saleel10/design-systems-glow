import { Link } from 'react-router-dom';

export default function CTABanner() {
  return (
    <section className="w-full px-4 sm:px-8 lg:px-12 pb-12 pt-8">
      <div className="max-w-7xl mx-auto relative overflow-hidden bg-[var(--panel)] text-white border border-[var(--line)] rounded-[28px] py-14 sm:py-24 px-6 text-center shadow-xl">
        {/* Radial Ambient Glow */}
        <div className="absolute left-1/2 -top-[40%] w-[70%] aspect-square -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(95,208,143,0.2),transparent_60%)] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="font-heading font-semibold text-4xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
            Let's build something
            <br />
            <span className="font-serif-italic font-medium brand-gradient-text">
              structured.
            </span>
          </h2>

          <p className="mt-5 text-sm sm:text-base md:text-lg text-white/70 max-w-md mx-auto leading-relaxed">
            Ready to transform your brand with a strategic, systems-driven approach?
          </p>

          <a
            href="https://cal.com/callwithsaleeldesigns"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 mt-7 brand-gradient text-white px-6 sm:px-8 py-3.5 rounded-full text-sm sm:text-base font-medium shadow-[0_4px_24px_rgba(29,133,90,0.35)] hover:opacity-95 active:scale-95 transition-all no-underline"
          >
            <span>Schedule a call</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
