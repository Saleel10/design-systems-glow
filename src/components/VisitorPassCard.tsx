import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { useVisitor } from '@/hooks/use-visitor';

export default function VisitorPassCard() {
  const {
    visitorName,
    passNumber,
    isCardOpen,
    setIsCardOpen,
    currentTime,
    currentDate,
    greeting,
  } = useVisitor();

  const location = useLocation();
  const cardRef = useRef<HTMLDivElement>(null);

  // Track desktop vs mobile screen
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mouse cursor tracking for 3D tilt animation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 220, damping: 22, mass: 0.8 };
  const rotateX = useSpring(useTransform(mouseY, [-250, 250], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-250, 250], [-8, 8]), springConfig);
  const sheenX = useSpring(useTransform(mouseX, [-250, 250], ['0%', '100%']), springConfig);
  const sheenY = useSpring(useTransform(mouseY, [-250, 250], ['0%', '100%']), springConfig);

  // Track mouse cursor relative to card
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - cardCenterX;
      const dy = e.clientY - cardCenterY;

      if (Math.abs(dx) < 600 && Math.abs(dy) < 600) {
        mouseX.set(dx);
        mouseY.set(dy);
      } else {
        mouseX.set(0);
        mouseY.set(0);
      }
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  // Completely hide hanging visitor pass card in all admin pages
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  if (!visitorName) return null;

  // On phone/mobile responsive screen, only show on the home page:
  // "but phone responsive screen only in home page that fixed"
  const isHomePage = location.pathname === '/';
  if (!isDesktop && !isHomePage) {
    return null;
  }

  const firstLetter = visitorName.charAt(0).toUpperCase() || 'A';

  // Desktop: visible in all sections and all scrolling time
  // Mobile: fixed on the home page
  const isFullCardVisible = isCardOpen;

  return (
    <AnimatePresence>
      {isFullCardVisible && (
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: -120 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          }}
          exit={{
            opacity: 0,
            y: -140,
            scale: 0.9,
            transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
          }}
          style={{
            transformOrigin: 'top center',
          }}
          className={`${isDesktop ? 'fixed' : 'absolute'} ${
            isDesktop
              ? 'top-0 right-4 xl:right-10'
              : 'top-[64px] sm:top-[70px] right-2.5 sm:right-3.5'
          } z-40 flex flex-col items-center select-none pointer-events-auto`}
        >
          {/* Hanging Pendulum Sway Animation Wrapper */}
          <motion.div
            animate={{
              rotateZ: [-1.5, 1.5, -1.5],
              y: [0, 2.5, 0],
            }}
            transition={{
              duration: 4.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              transformOrigin: 'top center',
              perspective: 1200,
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
            className="flex flex-col items-center"
          >
            {/* Lanyard Top Attachment: Ribbon hangs from top: 0 on desktop, or from below navbar on mobile */}
            <div className="flex flex-col items-center -mb-1 sm:-mb-1.5 xl:-mb-2 relative z-10 pointer-events-none">
              {/* Green Lanyard Ribbon: lengthened on mobile to look like a true hanging lanyard strap */}
              <div className="w-2 sm:w-2.5 md:w-3.5 xl:w-5 h-[26px] sm:h-[34px] md:h-[50px] xl:h-[110px] bg-gradient-to-b from-[#13806f] via-[#1ea87a] to-[#56a933] shadow-md border-x border-[#13806f]/40" />
              {/* Silver Metallic Clip holding card */}
              <div className="w-2.5 sm:w-3 md:w-4.5 xl:w-6.5 h-1 sm:h-1.5 xl:h-2.5 bg-neutral-300 rounded-t-xs shadow-inner border border-neutral-400" />
            </div>

            {/* Main Physical Visitor Pass Card */}
            {/* Slightly increased mobile size (w-[90px]) and decreased desktop size (lg:w-[175px]) */}
            <div className="relative w-[90px] sm:w-[104px] md:w-[130px] lg:w-[175px] xl:w-[205px] flex flex-col justify-between rounded-[9px] sm:rounded-[12px] lg:rounded-[16px] xl:rounded-[18px] bg-[#0c0e0c]/85 sm:bg-[#0c0e0c]/90 xl:bg-[#0c0e0c]/95 border border-white/20 p-1.5 sm:p-2 md:p-2 lg:p-3 xl:p-3.5 shadow-[0_10px_24px_-6px_rgba(0,0,0,0.75),0_0_10px_rgba(92,184,71,0.12)] backdrop-blur-md overflow-hidden text-left">
              {/* Card Top Punch Hole Notch for Lanyard */}
              <div className="w-2.5 sm:w-4 md:w-5 lg:w-6 xl:w-7 h-0.5 xl:h-1 bg-black/60 rounded-full mx-auto -mt-0.5 mb-0.5 sm:mb-1 lg:mb-1.5 xl:mb-2 border border-white/10" />

              {/* Dynamic Glass Specular Sheen (Reacts to Cursor) */}
              <motion.div
                className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_var(--sheen-x,_50%)_var(--sheen-y,_50%),rgba(255,255,255,0.08),transparent_60%)]"
                style={
                  {
                    '--sheen-x': sheenX,
                    '--sheen-y': sheenY,
                  } as any
                }
              />

              <div>
                {/* Header: VISITOR PASS & Status Indicator + Close */}
                <div className="flex items-center justify-between relative z-10">
                  <span className="text-[5.5px] sm:text-[7px] md:text-[7.5px] lg:text-[8.5px] xl:text-[9.5px] font-heading font-bold tracking-[0.08em] lg:tracking-[0.14em] text-neutral-400 uppercase">
                    VISITOR PASS
                  </span>

                  <div className="flex items-center gap-0.5 lg:gap-1.5">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-1.5 lg:h-1.5 xl:w-2 xl:h-2 rounded-full bg-[#22c55e] shadow-[0_0_5px_#22c55e] animate-pulse" />
                    <button
                      type="button"
                      onClick={() => setIsCardOpen(false)}
                      aria-label="Close pass"
                      className="p-0.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <X size={7} className="sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3" />
                    </button>
                  </div>
                </div>

                {/* Avatar Box with Initial */}
                <div className="relative z-10 w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8.5 xl:h-8.5 rounded-[3px] sm:rounded-md lg:rounded-lg bg-gradient-to-br from-[#13806f] to-[#56a933] flex items-center justify-center text-white text-[7.5px] sm:text-[9.5px] md:text-xs lg:text-sm xl:text-base font-bold shadow-md my-0.5 sm:my-1 lg:my-1.5 xl:my-2">
                  {firstLetter}
                </div>

                {/* Greeting & Name */}
                <div className="relative z-10">
                  <div className="text-neutral-400 text-[5.5px] sm:text-[7px] md:text-[7.5px] lg:text-[8px] xl:text-[9.5px] font-normal leading-none">
                    {greeting}
                  </div>
                  <div className="text-[8.5px] sm:text-[10.5px] md:text-xs lg:text-[13.5px] xl:text-[15.5px] font-heading font-bold text-white tracking-tight mt-0.5 break-words leading-tight">
                    {visitorName}
                  </div>
                </div>

                {/* Welcome text - hidden on compact mobile */}
                <p className="hidden md:block relative z-10 text-[7.5px] lg:text-[8.5px] xl:text-[10px] text-neutral-300/85 leading-tight lg:leading-[1.35] mt-0.5 lg:mt-1 xl:mt-1.5 line-clamp-2">
                  Welcome to Saleel Designs — explore the work and say hi anytime.
                </p>
              </div>

              {/* Bottom Meta Section */}
              <div className="relative z-10">
                {/* Dashed divider */}
                <div className="border-b border-dashed border-neutral-700/60 my-0.5 sm:my-1 lg:my-1.5 xl:my-2" />

                {/* Meta details table */}
                <div className="flex flex-col gap-0.5 text-[5px] sm:text-[6px] md:text-[6.5px] lg:text-[7.5px] xl:text-[9px]">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">Date</span>
                    <span className="font-semibold text-white tracking-tight font-mono">{currentDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">Time</span>
                    <span className="font-semibold text-white tracking-tight font-mono">{currentTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">Pass</span>
                    <span className="font-semibold text-white tracking-tight font-mono">{passNumber}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
