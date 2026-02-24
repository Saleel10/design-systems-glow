import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import { Briefcase, BookOpen, Code, Users } from "lucide-react";

const uiuxSkills = ["UX Research", "Wireframing", "Prototyping", "Design Systems", "Interaction Design", "User Flows", "Usability Testing", "Information Architecture"];
const graphicSkills = ["Brand Identity", "Visual Systems", "Typography", "Color Theory", "Print Design", "Social Media Design", "Packaging Design", "Creative Direction"];

const timeline = [
  { year: "2024", title: "Senior UI/UX Designer", place: "Freelance" },
  { year: "2023", title: "UI/UX Designer", place: "Mapki Solutions" },
  { year: "2022", title: "Creative Designer", place: "BlowLin Digital LLP" },
  { year: "2021", title: "Graphic Designer", place: "GTech µLearn" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-3 block">About</span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground leading-tight max-w-3xl">
              Systems Over <span className="gradient-text">Decoration</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="glass-card rounded-2xl aspect-[4/5] flex items-center justify-center">
              <Users size={80} className="text-primary/20" />
            </div>
          </div>
          <div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">From Pixels to Systems</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>My journey started with graphic design — posters, brand identities, and visual storytelling. Over time, I realized that great design isn't about decoration. It's about systems.</p>
              <p>With 4+ years of experience across brand identity, UI/UX, and product design, I've learned that the best digital experiences are built on structure, not aesthetics alone.</p>
              <p>Today, I design scalable systems that align brand, product, and purpose. Every pixel has a reason. Every component serves the whole.</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-10">
              {[
                { icon: Briefcase, label: "4+ Years Experience" },
                { icon: Code, label: "500+ Projects" },
                { icon: Users, label: "50+ Brands" },
                { icon: BookOpen, label: "BSc Computer Science" },
              ].map((item) => (
                <div key={item.label} className="glass-card rounded-xl p-4 flex items-center gap-3">
                  <item.icon size={18} className="text-primary" />
                  <span className="text-sm text-foreground font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Skills */}
      <Section>
        <SectionHeader label="Skills" title="What I Bring" align="left" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-4">UI/UX Design</h3>
            <div className="grid grid-cols-2 gap-3">
              {uiuxSkills.map((skill) => (
                <div key={skill} className="glass-card glass-card-hover rounded-xl px-4 py-3 text-sm text-muted-foreground transition-all">
                  {skill}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Graphic Design</h3>
            <div className="grid grid-cols-2 gap-3">
              {graphicSkills.map((skill) => (
                <div key={skill} className="glass-card glass-card-hover rounded-xl px-4 py-3 text-sm text-muted-foreground transition-all">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Timeline */}
      <Section>
        <SectionHeader label="Journey" title="Career Timeline" align="left" />
        <div className="space-y-6 max-w-2xl">
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-xl p-6 flex items-center gap-6"
            >
              <span className="font-heading text-2xl font-bold text-primary">{item.year}</span>
              <div className="border-l border-border pl-6">
                <h4 className="font-heading font-semibold text-foreground">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.place}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default About;
