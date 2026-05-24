import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Phone, MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: "Message sent!",
          description: "I'll get back to you within 24 hours.",
        });
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        toast({
          variant: "destructive",
          title: "Failed to send message",
          description: data.error || "Please try again later.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Please check your network and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-3 block">Contact</span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground leading-tight max-w-3xl">
              Let's Work <span className="gradient-text">Together</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Name</label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full glass-card rounded-xl px-4 py-3 text-sm text-foreground bg-transparent focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Email</label>
                  <input
                    type="email"
                    required
                    maxLength={255}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full glass-card rounded-xl px-4 py-3 text-sm text-foreground bg-transparent focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Subject</label>
                <input
                  type="text"
                  required
                  maxLength={200}
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full glass-card rounded-xl px-4 py-3 text-sm text-foreground bg-transparent focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                  placeholder="Project inquiry"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Message</label>
                <textarea
                  required
                  maxLength={2000}
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full glass-card rounded-xl px-4 py-3 text-sm text-foreground bg-transparent focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="glow-button px-8 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Message"} <Send size={16} />
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="space-y-6">
            {[
              { icon: Mail, label: "Email", value: "workwithsaleel@gmail.com", href: "mailto:workwithsaleel@gmail.com" },
              { icon: MapPin, label: "Location", value: "Malappuram,Kerala, India", href: "#" },
              { icon: MessageSquare, label: "WhatsApp", value: "Quick Connect", href: "https://wa.me/7034916695" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="glass-card glass-card-hover rounded-xl p-6 flex items-center gap-5 transition-all block"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-foreground font-medium">{item.value}</p>
                </div>
              </a>
            ))}

            <div className="glass-card rounded-xl p-6 mt-8">
              <h4 className="font-heading font-semibold text-foreground mb-2">Availability</h4>
              <p className="text-sm text-muted-foreground">Currently accepting new projects. Typical response time: within 24 hours.</p>
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default Contact;
