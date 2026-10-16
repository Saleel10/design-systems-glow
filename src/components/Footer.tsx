import { Link } from 'react-router-dom';
import { SERVICES } from '@/data/portfolioData';

const NAV_ITEMS = [
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

const SOCIALS = [
  { name: 'LinkedIn', link: 'https://www.linkedin.com/in/muhammed-saleel-cp/' },
  { name: 'Instagram', link: 'https://www.instagram.com/saleeldesigns/' },
  { name: 'Dribbble', link: 'https://dribbble.com/muhammed-saleel' },
  { name: 'Behance', link: 'https://www.behance.net/muhammedsaleel3' },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[var(--bg)] border-t border-[var(--line)] px-6 md:px-12 py-12 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10">
          {/* Brand info */}
          <div className="md:col-span-2">
            <Link to="/" className="font-bold text-2xl tracking-tight flex items-baseline gap-0.5">
              <span className="text-[var(--ink)]">Saleel</span>
              <span className="brand-gradient-text font-bold">designs</span>
            </Link>
            <p className="mt-3.5 text-[var(--muted)] text-sm sm:text-base leading-relaxed max-w-sm">
              Designing systems, not just screens. Building structured digital experiences that align brand, product, and purpose.
            </p>
            <div className="flex flex-col gap-1.5 mt-5 text-sm">
              <a
                href="mailto:workwithsaleel@gmail.com"
                className="text-[var(--ink)] hover:text-[var(--accent)] transition-colors font-medium"
              >
                workwithsaleel@gmail.com
              </a>
              <span className="text-[var(--muted)]">Malappuram, Kerala, India</span>
            </div>

            <div className="flex items-center gap-4 mt-6">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="font-heading text-xs tracking-wider uppercase text-[var(--muted2)] mb-3.5">
              Navigation
            </div>
            <div className="flex flex-col gap-2.5 text-sm">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-[var(--body)] hover:text-[var(--accent)] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="font-heading text-xs tracking-wider uppercase text-[var(--muted2)] mb-3.5">
              Services
            </div>
            <div className="flex flex-col gap-2.5 text-sm">
              {SERVICES.map((s) => (
                <Link
                  key={s.n}
                  to="/services"
                  className="text-[var(--body)] hover:text-[var(--accent)] transition-colors"
                >
                  {s.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[var(--line)] flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--muted2)]">
          <span>© {new Date().getFullYear()} Saleel Designs. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span className="text-[var(--muted)] font-medium">Less decoration. More structure.</span>
            <Link
              to="/admin"
              className="text-[var(--muted2)] hover:text-[var(--accent)] transition-colors opacity-70 hover:opacity-100 font-medium"
            >
              Admin ↗
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
