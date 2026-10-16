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
    <section className="relative w-full flex flex-col border-b border-[var(--line)] overflow-hidden transition-colors px-3 sm:px-6 md:px-12">
      <div className="max-w-7xl mx-auto w-full relative flex flex-col">
        {/* Central Hero Header */}
        <div className="relative text-center pt-8 sm:pt-10 px-4 z-10 flex flex-col items-center">
          {/* Availability Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--card)] border border-[var(--line)] text-xs sm:text-[13px] text-[var(--body)] mb-5 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#5cb847] shadow-[0_0_0_3px_rgba(92,184,71,0.22)] animate-pulse" />
            <span>Available for freelance projects</span>
          </motion.div>

          {/* Hero Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading font-semibold text-5xl sm:text-7xl md:text-8xl lg:text-[92px] leading-[0.96] tracking-tight text-[var(--ink)] text-balance"
          >
            Designing systems.
            <br />
            <span className="font-serif-italic font-medium tracking-tight brand-gradient-text">
              not just screens.
            </span>
          </motion.h1>

          {/* Hero Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 max-w-lg text-base sm:text-lg text-[var(--muted)] leading-relaxed text-pretty mx-auto"
          >
            Building structured digital experiences that align brand, product, and purpose.
          </motion.p>
        </div>

        {/* Background Connector Lines (Responsive: mobile & tablet) */}
        <svg
          viewBox="0 0 420 800"
          preserveAspectRatio="none"
          className="block lg:hidden absolute inset-0 w-full h-full pointer-events-none z-[2] opacity-80"
        >
          {/* Left curved solid line emerging from behind Card 1 towards center */}
          <path
            d="M 50 435 C 70 510, 110 570, 175 620"
            fill="none"
            stroke="var(--line2)"
            strokeWidth="1.3"
          />
          {/* Right curved dashed line connecting 5+ down into 50+ */}
          <path
            d="M 365 370 C 365 440, 335 480, 340 550"
            fill="none"
            stroke="var(--line2)"
            strokeWidth="1.3"
            strokeDasharray="4 4"
          />
          {/* Right curved dashed line from 50+ sweeping inward behind portrait */}
          <path
            d="M 340 620 C 320 670, 275 700, 215 700"
            fill="none"
            stroke="var(--line2)"
            strokeWidth="1.3"
            strokeDasharray="4 4"
          />
        </svg>

        {/* Background Connector Lines (Desktop) */}
        <svg
          viewBox="0 0 1320 860"
          preserveAspectRatio="none"
          className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-[1] opacity-75"
        >
          {/* Left curved solid line: starts deep inside Card 1, sweeps behind portrait */}
          <path
            d="M 140 270 C 170 420, 250 520, 560 630"
            fill="none"
            stroke="var(--line2)"
            strokeWidth="1.2"
          />
          {/* Right curved dashed line: starts deep inside Card 2, passes behind Card 3, sweeps deep behind portrait */}
          <path
            d="M 1150 290 C 1150 420, 1080 480, 1080 560 C 1080 640, 960 740, 580 740"
            fill="none"
            stroke="var(--line2)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
        </svg>

        {/* Floating Card 1: 800+ Projects (Responsive Left) - Slope -5deg with hover/touch tilt */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: -25, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, x: 0, rotate: -5 }}
          whileHover={{
            rotate: 0,
            scale: 1.05,
            y: -4,
            transition: { type: 'spring', stiffness: 400, damping: 25 },
          }}
          whileTap={{ scale: 0.96, rotate: -2 }}
          className="absolute left-2 sm:left-5 md:left-[3%] xl:left-[4%] 2xl:left-[6%] top-[395px] sm:top-[410px] md:top-[360px] lg:top-[255px] w-[95px] sm:w-[140px] md:w-[170px] lg:w-60 p-2 sm:p-3.5 md:p-5 lg:p-7 bg-[var(--card)]/90 backdrop-blur-md border border-[var(--line)] rounded-[14px] sm:rounded-[20px] lg:rounded-[26px] shadow-[0_10px_25px_-8px_rgba(0,0,0,0.2)] cursor-pointer select-none transition-shadow hover:shadow-[0_24px_50px_-14px_rgba(58,168,107,0.25)] z-20"
        >
          <div className="w-4.5 h-4.5 sm:w-7 sm:h-7 lg:w-11 lg:h-11 rounded-md sm:rounded-xl lg:rounded-2xl bg-[var(--tint)] flex items-center justify-center mb-1 sm:mb-3 lg:mb-5 shadow-sm">
            <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 lg:w-3.5 lg:h-3.5 bg-[var(--accent)] rotate-45" />
          </div>
          <div className="text-base sm:text-2xl md:text-3xl lg:text-[44px] font-bold tracking-tight leading-none text-[var(--ink)]">
            800+
          </div>
          <div className="text-[9px] sm:text-xs md:text-sm lg:text-lg font-semibold text-[var(--ink)] mt-0.5 sm:mt-1.5 leading-tight">
            Projects shipped.
          </div>
          <div className="text-[10px] sm:text-xs lg:text-[13.5px] text-[var(--muted2)] mt-1 sm:mt-2 leading-tight hidden sm:block">
            Brand, web &amp; product work.
          </div>
        </motion.div>

        {/* Floating Card 2: 5+ Years (Responsive Right Top) - Slope +5deg with hover/touch tilt */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 25, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, x: 0, rotate: 5 }}
          whileHover={{
            rotate: 0,
            scale: 1.05,
            y: -4,
            transition: { type: 'spring', stiffness: 400, damping: 25 },
          }}
          whileTap={{ scale: 0.96, rotate: 2 }}
          className="absolute right-2 sm:right-5 md:right-[3%] xl:right-[4%] 2xl:right-[6%] top-[400px] sm:top-[415px] md:top-[365px] lg:top-[275px] w-[95px] sm:w-[140px] md:w-[170px] lg:w-60 p-2 sm:p-3.5 md:p-5 lg:p-7 bg-[var(--card)]/90 backdrop-blur-md border border-[var(--line)] rounded-[14px] sm:rounded-[20px] lg:rounded-[26px] shadow-[0_10px_25px_-8px_rgba(0,0,0,0.2)] cursor-pointer select-none transition-shadow hover:shadow-[0_24px_50px_-14px_rgba(58,168,107,0.25)] z-20"
        >
          <div className="w-4.5 h-4.5 sm:w-7 sm:h-7 lg:w-11 lg:h-11 rounded-md sm:rounded-xl lg:rounded-2xl bg-[var(--tint)] flex items-center justify-center mb-1 sm:mb-3 lg:mb-5 shadow-sm">
            <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 lg:w-3.5 lg:h-3.5 bg-[var(--accent)] rotate-45" />
          </div>
          <div className="text-base sm:text-2xl md:text-3xl lg:text-[44px] font-bold tracking-tight leading-none text-[var(--ink)]">
            5+
          </div>
          <div className="text-[9px] sm:text-xs md:text-sm lg:text-lg font-semibold text-[var(--ink)] mt-0.5 sm:mt-1.5 leading-tight">
            Years experience.
          </div>
          <div className="text-[10px] sm:text-xs lg:text-[13.5px] text-[var(--muted2)] mt-1 sm:mt-2 leading-tight hidden sm:block">
            Brand, UI/UX &amp; systems.
          </div>
        </motion.div>

        {/* Floating Card 3: 50+ Clients (Responsive Right Bottom) - Raised with hover tilt */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 25, rotate: -3.5 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: -3.5 }}
          whileHover={{
            rotate: 2,
            scale: 1.05,
            y: -4,
            transition: { type: 'spring', stiffness: 400, damping: 25 },
          }}
          whileTap={{ scale: 0.96, rotate: 0 }}
          className="absolute right-2 sm:right-5 md:right-[5%] lg:right-[8%] xl:right-[12%] 2xl:right-[15%] top-[570px] sm:top-[585px] md:top-[550px] lg:top-[500px] w-[98px] sm:w-[145px] md:w-[175px] lg:w-60 p-2 sm:p-3.5 md:p-5 lg:p-7 bg-[var(--card)]/90 backdrop-blur-md border border-[var(--line)] rounded-[14px] sm:rounded-[20px] lg:rounded-[26px] shadow-[0_10px_25px_-8px_rgba(0,0,0,0.2)] cursor-pointer select-none transition-shadow hover:shadow-[0_24px_50px_-14px_rgba(58,168,107,0.3)] z-20"
        >
          {/* 3 avatar circles with client photos + green plus badge */}
          <div className="flex items-center mb-1 sm:mb-3 lg:mb-5">
            <div className="flex items-center -space-x-1 sm:-space-x-2">
              <div className="w-4 h-4 sm:w-6 sm:h-6 lg:w-9 lg:h-9 rounded-full border-2 border-[var(--card)] overflow-hidden bg-black shadow-sm">
                <img
                  src={clientAvatar1}
                  alt="Client 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-4 h-4 sm:w-6 sm:h-6 lg:w-9 lg:h-9 rounded-full border-2 border-[var(--card)] overflow-hidden bg-black shadow-sm">
                <img
                  src={clientAvatar2}
                  alt="Client 2"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-4 h-4 sm:w-6 sm:h-6 lg:w-9 lg:h-9 rounded-full border-2 border-[var(--card)] overflow-hidden bg-white shadow-sm">
                <img
                  src={clientAvatar3}
                  alt="Client 3"
                  className="w-full h-full object-contain p-0.5"
                />
              </div>
            </div>
            <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-[#1b3826] text-[#5cb847] flex items-center justify-center text-[7.5px] sm:text-xs font-bold ml-1 sm:ml-2 shadow-sm border border-[#5cb847]/30">
              +
            </div>
          </div>

          <div className="text-base sm:text-2xl md:text-3xl lg:text-[44px] font-bold tracking-tight leading-none text-[var(--ink)]">
            50+
          </div>
          <div className="text-[9px] sm:text-xs md:text-sm lg:text-lg font-semibold text-[var(--ink)] mt-0.5 sm:mt-1.5 leading-snug">
            Happy clients.
          </div>
          <div className="text-[10px] sm:text-xs lg:text-[13.5px] text-[var(--muted2)] mt-1 sm:mt-2 leading-tight hidden sm:block">
            Global startups &amp; brands.
          </div>
        </motion.div>

        {/* Rotating Circular Badge (Responsive Left Bottom) */}
        <div className="absolute left-2.5 sm:left-4 md:left-[3%] xl:left-[5%] bottom-[75px] sm:bottom-[85px] md:bottom-[110px] lg:bottom-[165px] w-[72px] h-[72px] sm:w-[88px] sm:h-[88px] md:w-26 md:h-26 lg:w-32 lg:h-32 z-20 pointer-events-none sm:pointer-events-auto">
          <div className="relative w-full h-full flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full animate-sd-spin">
              <defs>
                <path id="sdCirc" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <text className="text-[9.2px] tracking-[2.4px] font-medium fill-[var(--ink)] uppercase">
                <textPath href="#sdCirc">Systems • Strategy • Structure • </textPath>
              </text>
            </svg>
            <div className="absolute w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3.5 lg:h-3.5 bg-[var(--accent)] rotate-45 shadow-sm" />
          </div>
        </div>

        {/* Hero Visual Stage with Profile Cutout - Positioned right below the end of sub heading */}
        <div className="relative flex justify-center items-end -mt-6 sm:-mt-8 md:-mt-10 lg:-mt-24 xl:-mt-28 z-10">
          <div className="relative w-full max-w-[760px] lg:max-w-[840px] xl:max-w-[880px] h-[520px] sm:h-[600px] md:h-[680px] lg:h-[790px] xl:h-[830px] flex items-end justify-center overflow-visible">
            {/* Ambient Glow behind portrait */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[540px] lg:w-[620px] h-[540px] lg:h-[620px] rounded-full bg-[radial-gradient(circle,rgba(86,169,51,0.24),transparent_70%)] pointer-events-none blur-3xl" />

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
                className="w-full h-full object-contain object-bottom relative z-10 dark:drop-shadow-[0_20px_35px_rgba(0,0,0,0.38)] drop-shadow-[0_16px_28px_rgba(0,0,0,0.12)]"
              />
            </AnimatePresence>

            {/* Action Pills anchored at chest position */}
            <div className="absolute left-1/2 bottom-[28px] sm:bottom-[36px] md:bottom-[50px] lg:bottom-[165px] -translate-x-1/2 z-30 flex flex-wrap justify-center items-center gap-2 sm:gap-3 lg:gap-3.5 w-max max-w-[94vw]">
              <Link
                to="/contact"
                className="brand-gradient text-white px-4 py-2 sm:px-5 sm:py-2.5 lg:px-7 lg:py-3.5 rounded-full text-[12.5px] sm:text-[14px] lg:text-[15px] font-semibold flex items-center gap-1.5 sm:gap-2 shadow-[0_12px_28px_-10px_rgba(20,110,70,0.65)] hover:opacity-95 active:scale-95 transition-all"
              >
                <span>Work with me</span>
                <span className="text-xs sm:text-sm lg:text-base leading-none">→</span>
              </Link>

              <Link
                to="/works"
                className="bg-white text-zinc-950 border border-black/10 px-3.5 py-2 sm:px-4.5 sm:py-2.5 lg:px-6 lg:py-3.5 rounded-full text-[12.5px] sm:text-[14px] lg:text-[15px] font-medium flex items-center gap-2 sm:gap-3 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.22)] hover:bg-zinc-50 active:scale-95 transition-all"
              >
                <span className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-full brand-gradient text-white flex items-center justify-center text-[9px] sm:text-[10px] lg:text-xs font-bold shrink-0">
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

