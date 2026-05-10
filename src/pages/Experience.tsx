import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";

const experiences = [
  {
    period: "2025 – Present",
    role: "Creative Designer",
    company: "HW Growth Studio",
    responsibilities: ["Designed brand identities and visual systems","Created social media creatives and campaigns","Developed marketing and promotional assets","Collaborated with marketing teams on creative strategy"],
    achievements: ["Delivered 100+ creative assets for brands","Improved visual consistency across projects","Supported high-performing marketing campaigns","Managed end-to-end creative executions"],
    tools: ["Illustrator", "Photoshop", "Figma", "InDesign"],
  },
  {
    period: "2021 – Present",
    role: "Freelance Creative Graphic & UI/UX Designer",
    company: "Independent",
    responsibilities: ["End-to-end brand identity design for startups", "UI/UX design for web and mobile products", "Design systems development and documentation", "Client strategy and creative direction"],
    achievements: ["Delivered 50+ brand projects", "Built 3 enterprise-scale design systems", "Maintained 98% client satisfaction rate"],
    tools: ["Figma", "Illustrator", "Photoshop", "InDesign", "Webflow"],
  },
  {
    period: "2023 – Present",
    role: "UI/UX Designer",
    company: "Mapki Solutions",
    responsibilities: ["Designed responsive web and mobile interfaces","Created wireframes and interactive prototypes","Improved usability and user experience flows","Collaborated closely with developers"],
    achievements: ["Designed interfaces for AI automation platforms","Improved UI consistency across products","Built scalable and modern design systems","Enhanced engagement through UX improvements"],
    tools: ["Figma", "FigJam", "Miro", "Maze"],
  },
  {
    period: "2023 – 2025",
    role: "Graphic Designer",
    company: "Connect EMEA",
    responsibilities: ["Designed event and campaign creatives","Created social media content","Supported branding initiatives","Assisted with UI and presentation design"],
    achievements: ["Designed visuals for major student events","Increased engagement through creative campaigns","Maintained branding consistency","Collaborated on promotional strategies"],
    tools: ["Illustrator", "Photoshop", "Canva", "Figma"],
  },
    {
    period: "2021 – 2023",
    role: "Graphic Designer",
    company: "Luxora Furniture",
    responsibilities: ["Designed branding and marketing materials","Created promotional digital assets","Produced advertising creatives","Supported UI-related design tasks"],
    achievements: ["Delivered creatives for multiple campaigns","Improved brand presentation quality","Worked across digital platforms","Maintained strong visual consistency"],
    tools: ["Illustrator", "Photoshop", "Figma", "Canva"],
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
            { title: "Master in Computer Applications", place: "Indira Gandhi National Open University", year: "2025-Present" },
            { title: "BSc Computer Science", place: "EMEA College of Arts and Science, Kondotty", year: "2022-2025" },
            { title: "UI/UX Design Certification", place: "Teachnook", year: "2022" },
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
