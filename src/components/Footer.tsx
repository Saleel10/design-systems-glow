import { Link } from "react-router-dom";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="font-heading text-2xl font-bold tracking-tight">
              <span className="gradient-text">Port</span>
              <span className="text-foreground">folio</span>
            </Link>
            <p className="mt-4 text-muted-foreground max-w-sm leading-relaxed">
              Designing systems, not just screens. Building structured digital experiences
              that align brand, product, and purpose.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="mailto:hello@designer.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail size={16} /> hello@designer.com
              </a>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={16} /> India
              </span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4 text-foreground">Navigation</h4>
            <div className="flex flex-col gap-3">
              {["About", "Services", "Works", "Experience", "Blog", "Pricing", "Contact"].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                >
                  {item}
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4 text-foreground">Services</h4>
            <div className="flex flex-col gap-3">
              {["Brand Identity", "UI/UX Design", "Design Systems", "Website Design", "Product Strategy", "Creative Direction"].map((item) => (
                <span key={item} className="text-sm text-muted-foreground">{item}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["LinkedIn", "Dribbble", "Behance", "Twitter"].map((social) => (
              <a key={social} href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
