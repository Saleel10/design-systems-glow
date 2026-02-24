import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";

const experiences = [
  {
    period: "2024 – Present",
    role: "Freelance Creative & UI/UX Designer",
    company: "Independent",
    responsibilities: ["End-to-end brand identity design for startups", "UI/UX design for web and mobile products", "Design systems development and documentation", "Client strategy and creative direction"],
    achievements: ["Delivered 50+ brand projects", "Built 3 enterprise-scale design systems", "Maintained 98% client satisfaction rate"],
    tools: ["Figma", "Illustrator", "Photoshop", "After Effects", "Webflow"],
  },
  {
    period: "2023 – 2024",
    role: "UI/UX Designer",
    company: "Mapki Solutions",
    responsibilities: ["Designed user interfaces for SaaS products", "Conducted user research and usability testing", "Created interactive prototypes and design specs", "Collaborated with cross-functional dev teams"],
    achievements: ["Improved user engagement by 40%", "Reduced onboarding drop-off by 25%", "Established design system foundation"],
    tools: ["Figma", "FigJam", "Maze", "Jira"],
  },
  {
    period: "2022 – 2023",
    role: "Creative Designer",
    company: "BlowLin Digital LLP",
    responsibilities: ["Brand identity design for diverse clients", "Social media design and content creation", "Print design and production management", "Visual storytelling and creative campaigns"],
    achievements: ["Designed 100+ brand identities", "Led creative for 20+ marketing campaigns", "Mentored junior designers"],
    tools: ["Illustrator", "Photoshop", "InDesign", "Premiere Pro"],
  },
  {
    period: "2021 – 2022",
    role: "Graphic Designer",
    company: "GTech µLearn",
    responsibilities: ["Event branding and promotional materials", "Social media graphics and templates", "Community design assets", "Visual identity maintenance"],
    achievements: ["Created visual identity for 10+ tech events", "Designed assets reaching 50K+ community members"],
    tools: ["Illustrator", "Photoshop", "Canva"],
  },
];

const Experience = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-3 block">Experience</span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground leading-tight max-w-3xl">
              Professional <span className="gradient-text">Journey</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <Section>
        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card rounded-2xl p-8 md:p-10"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-foreground">{exp.role}</h3>
                  <p className="text-primary font-medium">{exp.company}</p>
                </div>
                <span className="text-sm text-muted-foreground font-mono">{exp.period}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs text-primary font-semibold tracking-widest uppercase mb-3">Responsibilities</h4>
                  <ul className="space-y-2">
                    {exp.responsibilities.map((r) => (
                      <li key={r} className="text-sm text-muted-foreground">• {r}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs text-primary font-semibold tracking-widest uppercase mb-3">Key Achievements</h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((a) => (
                      <li key={a} className="text-sm text-muted-foreground">• {a}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border flex flex-wrap gap-2">
                {exp.tools.map((tool) => (
                  <span key={tool} className="text-xs px-3 py-1 rounded-full glass-card text-muted-foreground">{tool}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Education */}
      <Section>
        <SectionHeader label="Education" title="Academic Background" align="left" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          {[
            { title: "BSc Computer Science", place: "Calicut University", year: "2021" },
            { title: "UI/UX Design Certification", place: "Google", year: "2022" },
            { title: "Design Systems Workshop", place: "Figma Config", year: "2023" },
            { title: "Advanced Typography", place: "Online Course", year: "2022" },
          ].map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card glass-card-hover rounded-xl p-6 transition-all"
            >
              <span className="text-xs text-primary font-mono">{edu.year}</span>
              <h4 className="font-heading font-semibold text-foreground mt-1">{edu.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">{edu.place}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default Experience;
