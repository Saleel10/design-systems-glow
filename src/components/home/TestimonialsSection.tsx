import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Section from "../Section";
import SectionHeader from "../SectionHeader";

const testimonials = [
  { quote: "One of the most structured designers I've worked with. Delivered a complete brand system that transformed our identity.", name: "Sarah Chen", role: "CEO, NexTech", },
  { quote: "The design system they built for our product saved us months of development time. Strategic thinking at its finest.", name: "Mark Rivera", role: "CTO, FinStack", },
  { quote: "Not just a designer — a strategic partner who understands business goals and translates them into powerful visual systems.", name: "Aisha Patel", role: "Founder, BrandLab", },
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
              <p className="font-heading font-semibold text-foreground">{testimonials[current].name}</p>
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
