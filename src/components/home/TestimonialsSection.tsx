import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Section from "../Section";
import SectionHeader from "../SectionHeader";

const testimonials = [
  { 
    quote: "Working with Muhammed Saleel CP has been a wonderful experience. He understands the idea behind a brand and brings it to life with thoughtful, fresh, and purposeful designs. More than a designer, he feels like a creative partner who genuinely cares about the brand.", 
    name: "Mridul M Mahesh", 
    role: "Founder & MD, Quizzario Pvt Ltd",
    link: "https://www.linkedin.com/in/mridul-m-mahesh"
  },
  { 
    quote: "I’ve watched Muhammed Saleel grow from a passionate learner into a confident and committed designer. What stands out most is his consistency, willingness to learn, and dedication to improving his craft. His journey in design is a reflection of his hard work, curiosity, and genuine passion for creating meaningful work.", 
    name: "Salmanul Faris CC", 
    role: "Co-Founder of Connect Foundation",
    link: "https://www.linkedin.com/in/salmanulfariscc/"
  },
  { 
    quote: "I’ve known and worked with Saleel since 2023 across 10+ projects. Even when he started working with me while still in college, his professionalism, communication, and commitment always stood out. I always knew he had great potential, and it’s great to see how far he has come. He’s reliable, takes ownership of his work, and delivers professionally and on time. I highly recommend him and wish him continued success!", 
    name: "Rishad Cheruthottathil", 
    role: "Founder & Principal Strategist INNOSTAA | Business Growth Agency",
    link: "https://www.linkedin.com/in/rishad-digitalgrowth?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
  },
  { 
    quote: "I would recommend Saleel over other designers because of his openness to understanding our design language and his ability to align his skillset with it. One reference and a conversation are all it takes to get a killer design done!", 
    name: "Shad Muhammed T", 
    role: "Founder & Director of HW Growth Studio",
    link: "https://www.linkedin.com/in/shad-muhammed?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
  },
  { 
    quote: "Working with Muhammed Saleel on projects for KIMS Group of Companies has been a great experience. His creativity, attention to detail, and ability to understand requirements quickly make him a reliable designer to work with. I’ve seen his growth firsthand, and his commitment to delivering quality work consistently stands out. I’m happy to recommend Saleel for his professionalism, creativity, and dedication.", 
    name: "Ahammed Yamil K", 
    role: "Chief operation officer Kims Group of companies",
    link: "https://www.linkedin.com/in/ahammed-yamil?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
  }
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <Section>
      <SectionHeader label="Testimonials" title="What Clients Say" />

      <div className="max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
            className="glass-card rounded-2xl p-10 md:p-14 text-center"
          >
            <Quote size={36} className="text-primary/30 mx-auto mb-6" />
            <p className="text-lg md:text-xl text-foreground leading-relaxed font-medium">
              "{testimonials[current].quote}"
            </p>
            <div className="mt-8">
              {testimonials[current].link ? (
                <a 
                  href={testimonials[current].link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-heading font-semibold text-foreground hover:text-primary transition-colors inline-block"
                >
                  {testimonials[current].name}
                </a>
              ) : (
                <p className="font-heading font-semibold text-foreground">{testimonials[current].name}</p>
              )}
              <p className="text-sm text-muted-foreground">{testimonials[current].role}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button onClick={prev} className="w-10 h-10 rounded-full glass-card glass-card-hover flex items-center justify-center transition-all">
            <ChevronLeft size={18} className="text-muted-foreground" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-primary w-6" : "bg-muted-foreground/30"}`}
              />
            ))}
          </div>
          <button onClick={next} className="w-10 h-10 rounded-full glass-card glass-card-hover flex items-center justify-center transition-all">
            <ChevronRight size={18} className="text-muted-foreground" />
          </button>
        </div>
      </div>
    </Section>
  );
};

export default TestimonialsSection;
