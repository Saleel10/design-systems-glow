import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/hooks/use-theme';
import profileLight from '@/assets/profile-light.png';
import profileDark from '@/assets/profile-dark.png';
import clientAvatar1 from '@/assets/client-avatar-1.png';
import clientAvatar2 from '@/assets/client-avatar-2.png';
import clientAvatar3 from '@/assets/client-avatar-3.png';

export default function HeroSection() {
  const { theme } = useTheme();
  const profileImg = theme === 'light' ? profileLight : profileDark;

  return (
    <section className="relative w-full flex flex-col justify-between border-b border-[var(--line)] overflow-hidden transition-colors px-3 sm:px-6 md:px-12 lg:min-h-[calc(100vh-76px)] lg:max-h-[880px]">
      <div className="max-w-7xl mx-auto w-full relative flex flex-col justify-between flex-1">
        {/* Central Hero Header */}
        <div className="relative text-center pt-3 sm:pt-4 md:pt-6 lg:pt-6 px-4 z-10 flex flex-col items-center">
          {/* Availability Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[var(--card)] border border-[var(--line)] text-[11px] sm:text-xs text-[var(--body)] mb-2 sm:mb-2.5 lg:mb-3 shadow-sm"
          >
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#5cb847] shadow-[0_0_0_3px_rgba(92,184,71,0.22)] animate-pulse" />
            <span>Available for freelance projects</span>
          </motion.div>

          {/* Hero Title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading font-semibold text-[32px] sm:text-5xl md:text-6xl lg:text-[70px] xl:text-[80px] leading-[0.98] tracking-tight text-[var(--ink)] text-balance"
          >
            Designing systems.
            <br />
            <span className="font-serif-italic font-medium tracking-tight brand-gradient-text">
              not just screens.
            </span>
          </motion.h1>

          {/* Hero Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-1.5 sm:mt-2.5 lg:mt-3 max-w-xs sm:max-w-md lg:max-w-lg text-xs sm:text-sm lg:text-base text-[var(--muted)] leading-relaxed text-pretty mx-auto"
          >
            Building structured digital experiences that align brand, product, and purpose.
          </motion.p>
        </div>

        {/* Background Connector Lines (Responsive: mobile & tablet) */}
        <svg
          viewBox="0 0 420 500"
          preserveAspectRatio="none"
          className="block lg:hidden absolute inset-0 w-full h-full pointer-events-none z-[2] opacity-75"
        >
          {/* Left curved solid line emerging from behind Card 1 towards center */}
          <path
            d="M 45 200 C 65 260, 95 310, 160 370"
            fill="none"
            stroke="var(--line2)"
            strokeWidth="1.2"
          />
          {/* Right curved dashed line connecting 5+ down into 50+ */}
          <path
            d="M 370 205 C 370 240, 350 260, 355 305"
            fill="none"
            stroke="var(--line2)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
          {/* Right curved dashed line from 50+ sweeping inward behind portrait */}
          <path
            d="M 355 350 C 330 385, 280 405, 215 405"
            fill="none"
            stroke="var(--line2)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
        </svg>

        {/* Background Connector Lines (Desktop) */}
        <svg
          viewBox="0 0 1320 680"
          preserveAspectRatio="none"
          className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-[1] opacity-75"
        >
          {/* Left curved solid line: starts deep inside Card 1, sweeps behind portrait */}
          <path
            d="M 140 250 C 170 380, 250 460, 560 520"
            fill="none"
            stroke="var(--line2)"
            strokeWidth="1.2"
          />
          {/* Right curved dashed line: starts deep inside Card 2, passes behind Card 3, sweeps deep behind portrait */}
          <path
            d="M 1150 260 C 1150 380, 1080 430, 1080 490 C 1080 550, 960 620, 580 620"
            fill="none"
            stroke="var(--line2)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
        </svg>

        {/* Floating Card 1: 800+ Projects (Responsive Left) - Slope -5deg with hover/touch tilt */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: -20, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, x: 0, rotate: -5 }}
          whileHover={{
            rotate: 0,
            scale: 1.05,
            y: -4,
            transition: { type: 'spring', stiffness: 400, damping: 25 },
          }}
          whileTap={{ scale: 0.96, rotate: -2 }}
          className="absolute left-1 sm:left-3 md:left-[3%] xl:left-[4%] 2xl:left-[6%] top-[155px] sm:top-[185px] md:top-[215px] lg:top-[210px] xl:top-[230px] w-[82px] sm:w-[115px] md:w-[150px] lg:w-[205px] xl:w-60 p-1.5 sm:p-2.5 md:p-4 lg:p-6 bg-[var(--card)]/90 backdrop-blur-md border border-[var(--line)] rounded-[12px] sm:rounded-[18px] lg:rounded-[24px] shadow-[0_10px_25px_-8px_rgba(0,0,0,0.2)] cursor-pointer select-none transition-shadow hover:shadow-[0_24px_50px_-14px_rgba(58,168,107,0.25)] z-20"
        >
          <div className="w-4 h-4 sm:w-6 sm:h-6 lg:w-10 lg:h-10 rounded-md sm:rounded-xl lg:rounded-2xl bg-[var(--tint)] flex items-center justify-center mb-0.5 sm:mb-2 lg:mb-4 shadow-sm">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3.5 lg:h-3.5 bg-[var(--accent)] rotate-45" />
          </div>
          <div className="text-sm sm:text-xl md:text-2xl lg:text-3xl xl:text-[40px] font-bold tracking-tight leading-none text-[var(--ink)]">
            800+
          </div>
          <div className="text-[8px] sm:text-[11px] md:text-xs lg:text-base font-semibold text-[var(--ink)] mt-0.5 sm:mt-1 leading-tight">
            Projects shipped.
          </div>
          <div className="text-[9px] sm:text-xs lg:text-[13px] text-[var(--muted2)] mt-0.5 sm:mt-1.5 leading-tight hidden sm:block">
            Brand, web &amp; product work.
          </div>
        </motion.div>

        {/* Floating Card 2: 5+ Years (Responsive Right Top) - Slope +5deg with hover/touch tilt */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 20, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, x: 0, rotate: 5 }}
          whileHover={{
            rotate: 0,
            scale: 1.05,
            y: -4,
            transition: { type: 'spring', stiffness: 400, damping: 25 },
          }}
          whileTap={{ scale: 0.96, rotate: 2 }}
          className="absolute right-1 sm:right-3 md:right-[3%] xl:right-[4%] 2xl:right-[6%] top-[160px] sm:top-[190px] md:top-[220px] lg:top-[220px] xl:top-[245px] w-[82px] sm:w-[115px] md:w-[150px] lg:w-[205px] xl:w-60 p-1.5 sm:p-2.5 md:p-4 lg:p-6 bg-[var(--card)]/90 backdrop-blur-md border border-[var(--line)] rounded-[12px] sm:rounded-[18px] lg:rounded-[24px] shadow-[0_10px_25px_-8px_rgba(0,0,0,0.2)] cursor-pointer select-none transition-shadow hover:shadow-[0_24px_50px_-14px_rgba(58,168,107,0.25)] z-20"
        >
          <div className="w-4 h-4 sm:w-6 sm:h-6 lg:w-10 lg:h-10 rounded-md sm:rounded-xl lg:rounded-2xl bg-[var(--tint)] flex items-center justify-center mb-0.5 sm:mb-2 lg:mb-4 shadow-sm">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3.5 lg:h-3.5 bg-[var(--accent)] rotate-45" />
          </div>
          <div className="text-sm sm:text-xl md:text-2xl lg:text-3xl xl:text-[40px] font-bold tracking-tight leading-none text-[var(--ink)]">
            5+
          </div>
          <div className="text-[8px] sm:text-[11px] md:text-xs lg:text-base font-semibold text-[var(--ink)] mt-0.5 sm:mt-1 leading-tight">
            Years experience.
          </div>
          <div className="text-[9px] sm:text-xs lg:text-[13px] text-[var(--muted2)] mt-0.5 sm:mt-1.5 leading-tight hidden sm:block">
            Brand, UI/UX &amp; systems.
          </div>
        </motion.div>

        {/* Floating Card 3: 50+ Clients (Responsive Right Bottom) - Raised with hover tilt */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20, rotate: -3.5 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: -3.5 }}
          whileHover={{
            rotate: 2,
            scale: 1.05,
            y: -4,
            transition: { type: 'spring', stiffness: 400, damping: 25 },
          }}
          whileTap={{ scale: 0.96, rotate: 0 }}
          className="absolute right-1 sm:right-3 md:right-[4%] lg:right-[6%] xl:right-[10%] 2xl:right-[13%] top-[255px] sm:top-[300px] md:top-[350px] lg:top-[375px] xl:top-[415px] w-[86px] sm:w-[120px] md:w-[155px] lg:w-[205px] xl:w-60 p-1.5 sm:p-2.5 md:p-4 lg:p-6 bg-[var(--card)]/90 backdrop-blur-md border border-[var(--line)] rounded-[12px] sm:rounded-[18px] lg:rounded-[24px] shadow-[0_10px_25px_-8px_rgba(0,0,0,0.2)] cursor-pointer select-none transition-shadow hover:shadow-[0_24px_50px_-14px_rgba(58,168,107,0.3)] z-20"
        >
          {/* 3 avatar circles with client photos + green plus badge */}
          <div className="flex items-center mb-0.5 sm:mb-2 lg:mb-4">
            <div className="flex items-center -space-x-1 sm:-space-x-1.5">
              <div className="w-3.5 h-3.5 sm:w-5 sm:h-5 lg:w-8 lg:h-8 rounded-full border-2 border-[var(--card)] overflow-hidden bg-black shadow-sm">
                <img
                  src={clientAvatar1}
                  alt="Client 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-3.5 h-3.5 sm:w-5 sm:h-5 lg:w-8 lg:h-8 rounded-full border-2 border-[var(--card)] overflow-hidden bg-black shadow-sm">
                <img
                  src={clientAvatar2}
                  alt="Client 2"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-3.5 h-3.5 sm:w-5 sm:h-5 lg:w-8 lg:h-8 rounded-full border-2 border-[var(--card)] overflow-hidden bg-white shadow-sm">
                <img
                  src={clientAvatar3}
                  alt="Client 3"
                  className="w-full h-full object-contain p-0.5"
                />
              </div>
            </div>
            <div className="w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full bg-[#1b3826] text-[#5cb847] flex items-center justify-center text-[7px] sm:text-[10px] font-bold ml-1 sm:ml-1.5 shadow-sm border border-[#5cb847]/30">
              +
            </div>
          </div>

          <div className="text-sm sm:text-xl md:text-2xl lg:text-3xl xl:text-[40px] font-bold tracking-tight leading-none text-[var(--ink)]">
            50+
          </div>
          <div className="text-[8px] sm:text-[11px] md:text-xs lg:text-base font-semibold text-[var(--ink)] mt-0.5 sm:mt-1 leading-snug">
            Happy clients.
          </div>
          <div className="text-[9px] sm:text-xs lg:text-[13px] text-[var(--muted2)] mt-0.5 sm:mt-1.5 leading-tight hidden sm:block">
            Global startups &amp; brands.
          </div>
        </motion.div>

        {/* Rotating Circular Badge (Responsive Left Bottom) */}
        <div className="absolute left-2 sm:left-4 md:left-[3%] xl:left-[4%] bottom-2.5 sm:bottom-3 md:bottom-4 lg:bottom-6 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 z-20 pointer-events-none sm:pointer-events-auto">
          <div className="relative w-full h-full flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full animate-sd-spin">
              <defs>
                <path id="sdCirc" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <text className="text-[9.2px] tracking-[2.4px] font-medium fill-[var(--ink)] uppercase">
                <textPath href="#sdCirc">Systems • Strategy • Structure • </textPath>
              </text>
            </svg>
            <div className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-2.5 lg:h-2.5 bg-[var(--accent)] rotate-45 shadow-sm" />
          </div>
        </div>

        {/* Hero Visual Stage with Profile Cutout - Perfectly positioned so full head, face, and chest buttons fit in first screen */}
        <div className="relative flex justify-center items-end -mt-4 sm:-mt-6 md:-mt-8 lg:-mt-12 xl:-mt-14 z-10 w-full">
          <div className="relative w-full max-w-[320px] sm:max-w-[420px] md:max-w-[500px] lg:max-w-[580px] xl:max-w-[640px] h-[290px] sm:h-[360px] md:h-[430px] lg:h-[480px] xl:h-[520px] flex items-end justify-center overflow-visible">
            {/* Ambient Glow behind portrait */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[280px] sm:w-[380px] lg:w-[480px] h-[280px] sm:h-[380px] lg:h-[480px] rounded-full bg-[radial-gradient(circle,rgba(86,169,51,0.22),transparent_70%)] pointer-events-none blur-3xl" />

            {/* Profile cutout image with theme-reactive transition */}
            <AnimatePresence mode="wait">
              <motion.img
                key={theme}
                src={profileImg}
                alt="Muhammed Saleel CP - Designer"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="w-full h-full object-contain object-bottom relative z-10 dark:drop-shadow-[0_16px_30px_rgba(0,0,0,0.38)] drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)]"
              />
            </AnimatePresence>

            {/* Action Pills anchored at chest position - completely visible in first screen */}
            <div className="absolute left-1/2 bottom-[10px] sm:bottom-[16px] md:bottom-[22px] lg:bottom-[28px] -translate-x-1/2 z-30 flex flex-nowrap sm:flex-wrap justify-center items-center gap-1.5 sm:gap-2.5 lg:gap-3.5 w-max max-w-[96vw]">
              <Link
                to="/contact"
                className="brand-gradient text-white px-3 py-1.5 sm:px-4.5 sm:py-2.5 lg:px-6 lg:py-3 rounded-full text-[11px] sm:text-[13px] lg:text-[14.5px] font-semibold flex items-center gap-1 sm:gap-1.5 shadow-[0_8px_20px_-6px_rgba(20,110,70,0.65)] hover:opacity-95 active:scale-95 transition-all whitespace-nowrap"
              >
                <span>Work with me</span>
                <span className="text-xs sm:text-sm lg:text-base leading-none">→</span>
              </Link>

              <Link
                to="/works"
                className="bg-white text-zinc-950 border border-black/10 px-3 py-1.5 sm:px-4 sm:py-2.5 lg:px-5.5 lg:py-3 rounded-full text-[11px] sm:text-[13px] lg:text-[14.5px] font-medium flex items-center gap-1.5 sm:gap-2 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.2)] hover:bg-zinc-50 active:scale-95 transition-all whitespace-nowrap"
              >
                <span className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 rounded-full brand-gradient text-white flex items-center justify-center text-[8px] sm:text-[9px] lg:text-xs font-bold shrink-0">
                  ↗
                </span>
                <span>View selected works</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

