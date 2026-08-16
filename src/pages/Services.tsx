import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Palette, Layout, Layers, Globe, Lightbulb, Compass } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import SEO from "@/components/SEO";

const services = [
  {
    icon: Palette, title: "Brand Identity Design",
    problem: "Brands often struggle with inconsistent visuals, weak positioning, and lack of recognition across digital platforms.",
    approach: "Creating strategic visual identities through research, positioning, and cohesive brand system development.",
    deliverables: ["Logo & Visual Identity System", "Brand Guidelines", "Typography & Color System", "Social Media Brand Assets", "Marketing & Brand Collateral"],
    tools: ["Figma", "Illustrator", "Photoshop"],
    timeline: "2-4 weeks",
  },
  {
    icon: Layout, title: "UI/UX Design",
    problem: "Complex interfaces and poor user experience reduce engagement, trust, and conversion rates.",
    approach: "Designing intuitive and research-driven digital experiences focused on usability, accessibility, and seamless interaction.",
    deliverables: ["UX Research & User Flows", "Information Architecture", "Wireframes & Prototypes", "High-Fidelity UI Designs"],
    tools: ["Figma", "FigJam", "Maze"],
    timeline: "2-4 weeks",
  },
  {
    icon: Layers, title: "Design Systems",
    problem: "Growing products without consistency creates design debt and slows development workflows.",
    approach: "Building scalable component-based systems that improve collaboration, consistency, and product efficiency.",
    deliverables: ["Component Library", "Design Tokens", "UI Guidelines & Documentation", "Responsive Design Standards", "System Governance Structure"],
    tools: ["Figma", "Storybook", "Zeroheight"],
    timeline: "3-6 weeks",
  },
  {
    icon: Globe, title: "Website & Landing Pages",
    problem: "Websites with unclear messaging and poor structure fail to convert visitors into customers.",
    approach: "Designing modern, conversion-focused websites with strong visual hierarchy and optimized user journeys.",
    deliverables: ["Website UI Design","Responsive Layouts","Landing Page Systems","Developer Handoff Files"],
    tools: ["Figma", "Webflow", "VS Code"],
    timeline: "2-4 weeks",
  },
  {
    icon: Lightbulb, title: "Product Strategy Design",
    problem: "Products built without clear direction often miss user needs and business goals.",
    approach: "Combining business objectives, market insights, and user behavior to define strategic product direction.",
    deliverables: ["Product Discovery Audit", "User Personas", "Customer Journey Mapping", "Feature Prioritization", "Product Roadmap Planning"],
    tools: ["FigJam", "Miro", "Notion"],
    timeline: "1-2 weeks",
  },
  {
    icon: Compass, title: "Creative Direction",
    problem: "Without a strong visual direction, brands lose consistency and emotional connection with audiences.",
    approach: "Leading the overall creative vision to ensure consistency, clarity, and impactful storytelling across touchpoints.",
    deliverables: ["Creative Strategy","Visual Direction","Art Direction","Campaign Oversight","Brand Experience Consistency"],
    tools: ["Figma", "Adobe Illustrator", "Adobe Photoshop"],
    timeline: "Ongoing",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO title="Services | Saleeldesigns" description="UI/UX and Graphic Design services." url="https://saleeldesigns.com/services" />
      <Navbar />

      <section className="pt-32 pb-16">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-3 block">Services</span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground leading-tight max-w-3xl">
              Strategic Design <span className="gradient-text">Solutions</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl">End-to-end design services built on structure, strategy, and systems thinking.</p>
          </motion.div>
        </div>
      </section>

      <Section>
        <div className="space-y-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="glass-card glass-card-hover rounded-2xl p-8 md:p-10 transition-all"
            >
              <div className="flex items-start gap-5 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <service.icon size={22} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-foreground">{service.title}</h3>
                  <span className="text-sm text-muted-foreground">Timeline: {service.timeline}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-xs text-primary font-semibold tracking-widest uppercase mb-2">Problem</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.problem}</p>
                </div>
                <div>
                  <h4 className="text-xs text-primary font-semibold tracking-widest uppercase mb-2">Approach</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.approach}</p>
                </div>
                <div>
                  <h4 className="text-xs text-primary font-semibold tracking-widest uppercase mb-2">Deliverables</h4>
                  <ul className="space-y-1">
                    {service.deliverables.map((d) => (
                      <li key={d} className="text-sm text-muted-foreground">• {d}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {service.tools.map((tool) => (
                    <span key={tool} className="text-xs px-3 py-1 rounded-full glass-card text-muted-foreground">{tool}</span>
                  ))}
                </div>
                <Link to="/contact" className="text-sm text-primary font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                  Book Consultation <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default Services;
