import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import profileImage from "@/assets/profileimage.png";
import { Briefcase, BookOpen, Code, Users } from "lucide-react";

const uiuxSkills = ["UX Research", "Wireframing", "Prototyping", "Design Systems", "Interaction Design", "User Flows", "Usability Testing", "Information Architecture"];
const graphicSkills = ["Brand Identity", "Visual Systems", "Typography", "Color Theory", "Print Design", "Social Media Design", "Packaging Design", "Creative Direction"];

const timeline = [
  { year: "2025-Present", title: "Creative Designer", place: "HW Growth Studio" },
  { year: "2021-Present", title: "Creative Graphic and UI/UX Designer", place: "Freelance" },
  { year: "2023-Present", title: "UI/UX Designer", place: "Mapki Solutions" },
  { year: "2023-2025", title: "Graphic Designer", place: "Connect EMEA" },
  { year: "2021-2023", title: "Graphic Designer", place: "Luxora Furniture" },
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
<div className="glass-card rounded-2xl aspect-[4/5] overflow-hidden">
  <img
    src={profileImage}
    alt="Profile"
    className="w-full h-full object-cover"
  />
</div>
          </div>
          <div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">From Pixels to Systems</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>My journey into design started with graphic design — creating posters, social media creatives, brand identities, and visual campaigns that helped brands communicate their story with clarity and emotion. What began as a passion for visuals gradually evolved into a deeper understanding of how design influences perception, experience, and human interaction.</p>
              <p>As I worked across different creative projects, I realized that impactful design is not just about making things look good. The strongest digital experiences are built on thoughtful structure, clear strategy, usability, and purposeful systems that solve real problems.</p>
              <p>Over the past 4+ years, I’ve worked across brand identity design, UI/UX design, website experiences, and scalable product systems — collaborating with startups, businesses, communities, and creative teams. Through these experiences, I’ve learned how to balance aesthetics with functionality while aligning user needs with business goals.</p>
              <p>My approach combines creativity with strategy. I focus on building intuitive interfaces, consistent design systems, and meaningful digital experiences that not only look modern but also improve usability, engagement, and communication. Every layout, interaction, and visual decision is created with intention and purpose.</p>
              <p>Today, I see design as more than visuals — it’s a way to create clarity, build trust, and shape experiences that people genuinely connect with.</p>
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
