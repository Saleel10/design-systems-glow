import { useEffect } from 'react';
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

  // Ensure initial scroll position on mobile responsive is at top (0, 0)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, []);

  return (
    <section className="relative w-full flex flex-col justify-start border-b border-[var(--line)] overflow-hidden transition-colors px-3 sm:px-6 md:px-12 lg:h-[calc(100vh-82px)] lg:h-[calc(100dvh-82px)] lg:min-h-[580px] lg:max-h-[800px] xl:max-h-[820px] pb-0">
      <div className="max-w-7xl mx-auto w-full relative flex flex-col justify-start items-center flex-1 h-auto lg:h-full min-h-0">
        {/* Central Hero Header with added space between navbar and content in mobile and desktop */}
        <div className="relative text-center pt-10 sm:pt-12 md:pt-8 lg:pt-7 xl:pt-9 px-4 z-10 flex flex-col items-center shrink-0">
          {/* Availability Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[var(--card)] border border-[var(--line)] text-[10.5px] sm:text-xs text-[var(--body)] mb-2 sm:mb-2 lg:mb-2 shadow-sm"
          >
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#5cb847] shadow-[0_0_0_3px_rgba(92,184,71,0.22)] animate-pulse" />
            <span>Available for freelance projects</span>
          </motion.div>

          {/* Hero Title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading font-semibold text-[30px] sm:text-5xl md:text-6xl lg:text-[54px] xl:text-[66px] leading-[0.98] tracking-tight text-[var(--ink)] text-balance"
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
            className="mt-1 sm:mt-2 lg:mt-2 max-w-xs sm:max-w-md lg:max-w-lg text-xs sm:text-sm lg:text-[15px] text-[var(--muted)] leading-relaxed text-pretty mx-auto"
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
            d="M 55 225 C 75 285, 105 335, 160 385"
            fill="none"
            stroke="var(--line2)"
            strokeWidth="1.2"
          />
          {/* Right curved dashed line connecting 5+ down into 50+ */}
          <path
            d="M 365 225 C 365 265, 350 285, 355 335"
            fill="none"
            stroke="var(--line2)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
          {/* Right curved dashed line from 50+ sweeping inward behind portrait */}
          <path
            d="M 355 385 C 330 415, 280 435, 215 435"
            fill="none"
            stroke="var(--line2)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
        </svg>

        {/* Background Connector Lines (Desktop) */}
        <svg
          viewBox="0 0 1320 620"
          preserveAspectRatio="none"
          className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-[1] opacity-75"
        >
          {/* Left curved solid line: starts deep inside Card 1 */}
          <path
            d="M 200 285 C 260 375, 320 435, 560 495"
            fill="none"
            stroke="var(--line2)"
            strokeWidth="1.2"
          />
          {/* Right curved dashed line: passes through Card 2 (shifted left), through Card 3, sweeps behind portrait */}
          <path
            d="M 1100 215 C 1100 305, 1020 355, 1010 415 C 1000 475, 920 545, 580 565"
            fill="none"
            stroke="var(--line2)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
        </svg>

        {/* Floating Card 1: 800+ Projects - Styled with visible subtitle matching screenshot */}
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
          className="absolute left-2 sm:left-3 md:left-[3%] lg:left-[6%] xl:left-[8%] 2xl:left-[10%] top-[180px] sm:top-[205px] md:top-[215px] lg:top-[220px] xl:top-[255px] w-[104px] sm:w-[136px] md:w-[150px] lg:w-[200px] xl:w-60 p-2 sm:p-3.5 md:p-4 lg:p-5 xl:p-6 bg-[var(--card)]/90 backdrop-blur-md border border-[var(--line)] rounded-[14px] sm:rounded-[18px] lg:rounded-[24px] shadow-[0_10px_25px_-8px_rgba(0,0,0,0.2)] cursor-pointer select-none transition-shadow hover:shadow-[0_24px_50px_-14px_rgba(58,168,107,0.25)] z-20"
        >
          <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-md sm:rounded-xl lg:rounded-2xl bg-[var(--tint)] flex items-center justify-center mb-1 sm:mb-2 lg:mb-4 shadow-sm border border-[#5cb847]/20 shrink-0">
            <div className="w-2 h-2 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 bg-[var(--accent)] rotate-45" />
          </div>
          <div className="text-[15px] sm:text-xl md:text-2xl lg:text-3xl xl:text-[40px] font-bold tracking-tight leading-none text-[var(--ink)]">
            800+
          </div>
          <div className="text-[9.5px] sm:text-xs md:text-xs lg:text-base font-semibold text-[var(--ink)] mt-1 leading-tight">
            Projects shipped.
          </div>
          <div className="text-[7.5px] sm:text-xs lg:text-[13px] text-[var(--muted2)] mt-0.5 sm:mt-1 leading-tight block">
            Brand, web &amp; product work.
          </div>
        </motion.div>

        {/* Floating Card 2: 5+ Years - Styled with visible subtitle matching screenshot */}
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
          className="absolute right-2 sm:right-3 md:right-[3%] lg:right-[6.5%] xl:right-[8%] 2xl:right-[10%] top-[185px] sm:top-[210px] md:top-[220px] lg:top-[160px] xl:top-[185px] w-[104px] sm:w-[136px] md:w-[150px] lg:w-[200px] xl:w-60 p-2 sm:p-3.5 md:p-4 lg:p-5 xl:p-6 bg-[var(--card)]/90 backdrop-blur-md border border-[var(--line)] rounded-[14px] sm:rounded-[18px] lg:rounded-[24px] shadow-[0_10px_25px_-8px_rgba(0,0,0,0.2)] cursor-pointer select-none transition-shadow hover:shadow-[0_24px_50px_-14px_rgba(58,168,107,0.25)] z-20"
        >
          <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-md sm:rounded-xl lg:rounded-2xl bg-[var(--tint)] flex items-center justify-center mb-1 sm:mb-2 lg:mb-4 shadow-sm border border-[#5cb847]/20 shrink-0">
            <div className="w-2 h-2 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 bg-[var(--accent)] rotate-45" />
          </div>
          <div className="text-[15px] sm:text-xl md:text-2xl lg:text-3xl xl:text-[40px] font-bold tracking-tight leading-none text-[var(--ink)]">
            5+
          </div>
          <div className="text-[9.5px] sm:text-xs md:text-xs lg:text-base font-semibold text-[var(--ink)] mt-1 leading-tight">
            Years experience.
          </div>
          <div className="text-[7.5px] sm:text-xs lg:text-[13px] text-[var(--muted2)] mt-0.5 sm:mt-1 leading-tight block">
            Brand, UI/UX &amp; systems.
          </div>
        </motion.div>

        {/* Floating Card 3: 50+ Clients - Styled with avatars and visible subtitle matching screenshot */}
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
          className="absolute right-2 sm:right-3 md:right-[4%] lg:right-[8.5%] xl:right-[11%] 2xl:right-[14%] top-[305px] sm:top-[340px] md:top-[350px] lg:top-[360px] xl:top-[405px] w-[106px] sm:w-[138px] md:w-[155px] lg:w-[200px] xl:w-60 p-2 sm:p-3.5 md:p-4 lg:p-5 xl:p-6 bg-[var(--card)]/90 backdrop-blur-md border border-[var(--line)] rounded-[14px] sm:rounded-[18px] lg:rounded-[24px] shadow-[0_10px_25px_-8px_rgba(0,0,0,0.2)] cursor-pointer select-none transition-shadow hover:shadow-[0_24px_50px_-14px_rgba(58,168,107,0.3)] z-20"
        >
          {/* 3 avatar circles with client photos + green plus badge */}
          <div className="flex items-center mb-1 sm:mb-2 lg:mb-4">
            <div className="flex items-center -space-x-1 sm:-space-x-1.5">
              <div className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full border border-2 sm:border-2 border-[var(--card)] overflow-hidden bg-black shadow-sm">
                <img
                  src={clientAvatar1}
                  alt="Client 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full border border-2 sm:border-2 border-[var(--card)] overflow-hidden bg-black shadow-sm">
                <img
                  src={clientAvatar2}
                  alt="Client 2"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full border border-2 sm:border-2 border-[var(--card)] overflow-hidden bg-white shadow-sm">
                <img
                  src={clientAvatar3}
                  alt="Client 3"
                  className="w-full h-full object-contain p-0.5"
                />
              </div>
            </div>
            <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-[#1b3826] text-[#5cb847] flex items-center justify-center text-[7.5px] sm:text-[10px] font-bold ml-1 sm:ml-1.5 shadow-sm border border-[#5cb847]/30">
              +
            </div>
          </div>

          <div className="text-[15px] sm:text-xl md:text-2xl lg:text-3xl xl:text-[40px] font-bold tracking-tight leading-none text-[var(--ink)]">
            50+
          </div>
          <div className="text-[9.5px] sm:text-xs md:text-xs lg:text-base font-semibold text-[var(--ink)] mt-1 leading-tight">
            Happy clients.
          </div>
          <div className="text-[7.5px] sm:text-xs lg:text-[13px] text-[var(--muted2)] mt-0.5 sm:mt-1 leading-tight block">
            Global startups &amp; brands.
          </div>
        </motion.div>

        {/* Rotating Circular Badge - Arranged on the left side in between the "800+ Projects shipped" card and the "Work with me" button on mobile, bottom on desktop */}
        <div className="absolute left-2.5 sm:left-3.5 md:left-[3%] xl:left-[4%] top-[330px] sm:top-[345px] md:top-auto md:bottom-6 lg:bottom-14 xl:bottom-16 w-11 h-11 sm:w-13 sm:h-13 md:w-18 md:h-18 lg:w-20 lg:h-20 xl:w-24 xl:h-24 z-20 pointer-events-none sm:pointer-events-auto">
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

        {/* Hero Visual Stage with Profile Cutout */}
        {/* Mobile: enlarged photo filling bottom gap and extending up under purpose sentence; Desktop: untouched */}
        <div className="relative flex justify-center items-end -mt-11 sm:-mt-13 md:-mt-16 lg:-mt-16 xl:-mt-20 2xl:-mt-22 z-10 w-full flex-1 min-h-0">
          <div className="relative w-full max-w-[430px] sm:max-w-[460px] md:max-w-[500px] lg:max-w-[700px] xl:max-w-[780px] 2xl:max-w-[820px] h-[450px] sm:h-[460px] md:h-[480px] lg:h-[530px] xl:h-[580px] 2xl:h-[610px] flex items-end justify-center overflow-visible">
            {/* Ambient Glow behind portrait */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[380px] sm:w-[440px] lg:w-[580px] xl:w-[640px] h-[380px] sm:h-[440px] lg:h-[580px] xl:h-[640px] rounded-full bg-[radial-gradient(circle,rgba(86,169,51,0.22),transparent_70%)] pointer-events-none blur-3xl" />

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
                className="w-[124%] sm:w-[110%] md:w-full h-full max-w-none md:max-w-full object-contain object-bottom relative z-10 dark:drop-shadow-[0_16px_30px_rgba(0,0,0,0.38)] drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)]"
              />
            </AnimatePresence>

            {/* Action Pills anchored at chest position - comfortably sitting on hoodie */}
            <div className="absolute left-1/2 bottom-[26px] sm:bottom-[34px] md:bottom-[40px] lg:bottom-[82px] xl:bottom-[94px] 2xl:bottom-[102px] -translate-x-1/2 z-30 flex flex-nowrap sm:flex-wrap justify-center items-center gap-1.5 sm:gap-2.5 lg:gap-3.5 w-max max-w-[96vw]">
              <Link
                to="/contact"
                className="brand-gradient text-white px-3.5 py-1.5 sm:px-4 sm:py-2 lg:px-6 lg:py-3 rounded-full text-[11px] sm:text-[12.5px] lg:text-[14.5px] font-semibold flex items-center gap-1 sm:gap-1.5 shadow-[0_8px_20px_-6px_rgba(20,110,70,0.65)] hover:opacity-95 active:scale-95 transition-all whitespace-nowrap"
              >
                <span>Work with me</span>
                <span className="text-[10px] sm:text-xs lg:text-base leading-none">→</span>
              </Link>

              <Link
                to="/works"
                className="bg-white text-zinc-950 border border-black/10 px-3.5 py-1.5 sm:px-3.5 sm:py-2 lg:px-5.5 lg:py-3 rounded-full text-[11px] sm:text-[12.5px] lg:text-[14.5px] font-medium flex items-center gap-1 sm:gap-2 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.2)] hover:bg-zinc-50 active:scale-95 transition-all whitespace-nowrap"
              >
                <span className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 lg:w-6 lg:h-6 rounded-full brand-gradient text-white flex items-center justify-center text-[7.5px] sm:text-[8.5px] lg:text-xs font-bold shrink-0">
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



