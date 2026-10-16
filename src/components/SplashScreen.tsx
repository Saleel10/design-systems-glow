import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVisitor } from '@/hooks/use-visitor';

interface SplashScreenProps {
  onComplete?: () => void;
  minDuration?: number; // duration in ms, default ~2200ms
}

const CATEGORIES = [
  'Brand identity',
  'UI / UX',
  'Design systems',
  'Web',
];

export default function SplashScreen({ onComplete, minDuration = 2200 }: SplashScreenProps) {
  const { setIsNamePromptOpen } = useVisitor();
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Skip splash screen entirely for admin routes
  const isAdminRoute = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin');

  useEffect(() => {
    if (isAdminRoute) {
      setIsFinished(true);
      return;
    }

    // Lock body scroll while splash screen is active
    document.body.style.overflow = 'hidden';

    const startTime = performance.now();

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / minDuration, 1);

      // Custom easing curve for satisfying loading feel:
      // Smooth start -> gentle deceleration -> crisp snap to 100%
      let easedProgress: number;
      if (rawProgress < 0.6) {
        easedProgress = (rawProgress / 0.6) * 65;
      } else if (rawProgress < 0.85) {
        easedProgress = 65 + ((rawProgress - 0.6) / 0.25) * 22;
      } else {
        easedProgress = 87 + ((rawProgress - 0.85) / 0.15) * 13;
      }

      setProgress(Math.min(Math.round(easedProgress), 100));

      if (rawProgress < 1) {
        requestAnimationFrame(updateProgress);
      } else {
        // Hold at 100% briefly for visual satisfaction, then finish
        setTimeout(() => {
          setIsFinished(true);
          document.body.style.overflow = '';
          setIsNamePromptOpen(true);
          if (onComplete) onComplete();
        }, 300);
      }
    };

    const animId = requestAnimationFrame(updateProgress);

    // Allow user to click anywhere or press Escape to skip if desired
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        setIsFinished(true);
        document.body.style.overflow = '';
        setIsNamePromptOpen(true);
        if (onComplete) onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [minDuration, onComplete, isAdminRoute]);

  if (isAdminRoute) return null;

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="splash-screen"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.02,
            filter: 'blur(8px)',
            transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050605] text-white select-none px-6 overflow-hidden cursor-default"
        >
          {/* Subtle Ambient Radial Green Glow behind Logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[260px] sm:w-[540px] sm:h-[380px] md:w-[700px] md:h-[480px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(92,184,71,0.18)_0%,rgba(19,128,111,0.08)_40%,transparent_70%)] blur-3xl pointer-events-none" />

          {/* Main Content Container */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-xl mx-auto">
            {/* Brand Logo matching reference */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative inline-flex items-baseline"
            >
              {/* "Saleel" in pure bold white */}
              <span className="font-heading font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-[84px] tracking-tight text-white leading-none">
                Saleel
              </span>

              {/* "designs" wrapper with tilted green diamond directly above 'd' */}
              <div className="relative inline-block leading-none">
                {/* Floating Green Diamond tilted at 45 degrees */}
                <motion.span
                  initial={{ opacity: 0, y: -12, scale: 0.5 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -top-6 sm:-top-8 md:-top-10 left-2.5 sm:left-3.5 md:left-4.5 -translate-x-1/2 w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 rounded-[2px] bg-gradient-to-tr from-[#13806f] to-[#56a933] shadow-[0_0_14px_rgba(92,184,71,0.85)] rotate-45 pointer-events-none"
                />

                {/* "designs" with green gradient */}
                <span className="font-heading font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-[84px] tracking-tight leading-none bg-gradient-to-r from-[#148a73] via-[#22c55e] to-[#76d65e] bg-clip-text text-transparent inline-block">
                  designs
                </span>
              </div>
            </motion.div>

            {/* Subtitle / Tagline: "Designing systems, not just screens." */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 sm:mt-8 text-sm sm:text-base md:text-[17px] tracking-wide text-neutral-400 font-normal"
            >
              <span>Designing systems, </span>
              <span className="font-serif-italic text-[#5cb847] font-medium text-base sm:text-lg md:text-[19px]">
                not just screens.
              </span>
            </motion.div>

            {/* Category Pills Row */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-8"
            >
              {CATEGORIES.map((cat, i) => (
                <motion.span
                  key={cat}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.35 + i * 0.06 }}
                  className="px-3.5 sm:px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs sm:text-[13px] text-neutral-300 font-medium tracking-tight backdrop-blur-sm shadow-sm"
                >
                  {cat}
                </motion.span>
              ))}
            </motion.div>

            {/* Loading Progress Bar */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0.9 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-64 sm:w-76 md:w-80 h-[2.5px] sm:h-[3px] bg-white/[0.08] rounded-full overflow-hidden mt-8 sm:mt-10 relative"
            >
              {/* Glowing animated fill */}
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#14b8a6] via-[#22c55e] to-[#86efac] shadow-[0_0_12px_rgba(34,197,94,0.7)] transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
