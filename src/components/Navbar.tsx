import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/hooks/use-theme';

const DESKTOP_NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/works', label: 'Works' },
  { path: '/cases', label: 'Case Studies' },
  { path: '/blog', label: 'Blog' },
  { path: '/pricing', label: 'Pricing' },
  { path: '/contact', label: 'Contact' },
];

const MOBILE_NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/works', label: 'Works' },
  { path: '/cases', label: 'Case Studies' },
  { path: '/experience', label: 'Experience' },
  { path: '/blog', label: 'Blog' },
  { path: '/pricing', label: 'Pricing' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    if (path === '/cases') return location.pathname.startsWith('/cases');
    if (path === '/works') return location.pathname.startsWith('/works');
    if (path === '/blog') return location.pathname.startsWith('/blog');
    return location.pathname === path;
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-[var(--hdr)] backdrop-blur-md border-b border-[var(--line)] transition-colors px-6 md:px-12">
      <header className="max-w-7xl mx-auto flex items-center justify-between gap-6 py-5">
        {/* Brand Logo */}
        <Link
          to="/"
          className="font-bold text-2xl sm:text-[28px] tracking-tight flex items-baseline gap-1"
        >
          <span className="text-[var(--ink)]">Saleel</span>
          <span className="brand-gradient-text font-bold">designs</span>
        </Link>

        {/* Desktop Nav Pills */}
        <nav className="hidden xl:flex items-center gap-1 p-1.5 border border-[var(--line)] rounded-full bg-[var(--glass)] shadow-md">
          {DESKTOP_NAV_ITEMS.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-full text-[14.5px] sm:text-[15px] whitespace-nowrap transition-all ${
                  active
                    ? 'bg-[var(--card)] text-[var(--ink)] shadow-[0_2px_6px_rgba(0,0,0,0.15)] font-semibold'
                    : 'text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--card)]/50 font-medium'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            type="button"
            title="Toggle theme"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[var(--line)] bg-[var(--card)] flex items-center justify-center text-lg sm:text-xl hover:scale-105 active:scale-95 transition-all text-[var(--ink)] shadow-sm"
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>

          {/* Work with me CTA */}
          <Link
            to="/contact"
            className="brand-gradient text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-[15px] font-semibold whitespace-nowrap hidden sm:flex items-center gap-2 shadow-[0_4px_20px_rgba(29,133,90,0.35)] hover:opacity-95 active:scale-95 transition-all"
          >
            <span>Work with me</span>
            <span className="text-sm">↗</span>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="xl:hidden w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[var(--line)] bg-[var(--card)] flex items-center justify-center text-xl sm:text-2xl active:scale-95 transition-all text-[var(--ink)] shadow-sm"
          >
            {mobileMenuOpen ? '×' : '≡'}
          </button>
        </div>
      </header>

      {/* Mobile Menu Card Dropdown matching Reference Image 3 */}
      {mobileMenuOpen && (
        <div className="xl:hidden pb-6 pt-2 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="w-full bg-[#181818] border border-white/10 rounded-[28px] sm:rounded-[32px] p-6 sm:p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)]">
            {/* Left-aligned vertical navigation list */}
            <nav className="flex flex-col gap-4 text-left">
              {MOBILE_NAV_ITEMS.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-[17px] font-medium transition-colors ${
                      active
                        ? 'text-[#5cb847]'
                        : 'text-zinc-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Bottom Full-width Gradient Button */}
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-7 w-full brand-gradient text-white py-4 px-6 rounded-full font-semibold text-center block text-base shadow-[0_10px_25px_-5px_rgba(92,184,71,0.4)] hover:opacity-95 active:scale-[0.99] transition-all"
            >
              Work With Me
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
