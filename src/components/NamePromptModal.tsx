import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVisitor } from '@/hooks/use-visitor';

export default function NamePromptModal() {
  const { isNamePromptOpen, submitName } = useVisitor();
  const [name, setName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isNamePromptOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 200);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isNamePromptOpen]);

  // Completely hide name prompt modal in admin routes
  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
    return null;
  }

  if (!isNamePromptOpen) return null;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    submitName(name.trim() || 'Guest');
  };

  const handleGuest = () => {
    submitName('Guest');
  };

  return (
    <AnimatePresence>
      <motion.div
        key="name-prompt-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{
          opacity: 0,
          scale: 0.98,
          filter: 'blur(6px)',
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        }}
        className="fixed inset-0 z-[9990] flex flex-col items-center justify-center bg-[#050605] text-white px-6 overflow-hidden select-none"
      >
        {/* Soft Ambient Radial Green Aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[300px] sm:w-[560px] sm:h-[420px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(92,184,71,0.18)_0%,rgba(19,128,111,0.08)_40%,transparent_70%)] blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center text-center"
        >
          {/* Tilted Green Diamond */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: 45 }}
            animate={{ opacity: 1, scale: 1, rotate: 45 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-[2px] bg-gradient-to-tr from-[#13806f] to-[#56a933] shadow-[0_0_14px_rgba(92,184,71,0.85)] mb-6"
          />

          {/* Heading */}
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-[54px] tracking-tight leading-[1.15] text-white">
            Before you enter,
            <span className="block font-serif-italic font-medium bg-gradient-to-r from-[#148a73] via-[#22c55e] to-[#76d65e] bg-clip-text text-transparent italic mt-1">
              what's your name?
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-3.5 text-sm sm:text-base text-neutral-400 font-normal">
            I'll make you a visitor pass.
          </p>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="w-full mt-7 flex flex-col items-center">
            {/* Pill input */}
            <input
              ref={inputRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              maxLength={24}
              className="w-full h-14 sm:h-15 rounded-full border border-white/10 bg-[#121512]/90 px-6 text-center text-white text-base sm:text-lg font-medium focus:outline-none focus:border-[#5cb847] focus:ring-1 focus:ring-[#5cb847] transition-all shadow-inner placeholder:text-neutral-500"
            />

            {/* Enter Button */}
            <button
              type="submit"
              className="w-full h-14 sm:h-15 mt-3.5 rounded-full bg-gradient-to-r from-[#13806f] via-[#22c55e] to-[#56a933] text-white font-semibold text-base sm:text-[17px] shadow-[0_12px_32px_-6px_rgba(34,197,94,0.45)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Enter website</span>
              <span>→</span>
            </button>

            {/* Continue as guest */}
            <button
              type="button"
              onClick={handleGuest}
              className="mt-4 text-xs sm:text-sm text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              Continue as guest
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
