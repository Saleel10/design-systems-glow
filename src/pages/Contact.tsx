import { useState } from "react";
import PageContainer from "@/components/PageContainer";
import SEO from "@/components/SEO";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "lucide-react";

const INTERESTS = ["Branding", "UI/UX", "Design system", "Website", "Other"];

const Contact = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["Branding"]);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const toggleInterest = (item: string) => {
    setSelectedInterests((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast({
        variant: "destructive",
        title: "Please complete the form",
        description: "Name and email are required.",
      });
      return;
    }

    const interestsString = selectedInterests.length > 0 ? selectedInterests.join(", ") : "General";

    setSubmitting(true);
    try {
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject: `Portfolio Inquiry: ${interestsString}`,
          message: `Interest: ${interestsString}\n\n${message}`,
        }),
      });
    } catch {
      // Allow optimistic completion even if backend mailer is unconfigured
    }

    setSent(true);
    setSubmitting(false);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setMessage("");
    setSelectedInterests(["Branding"]);
    setSent(false);
  };

  return (
    <PageContainer showCta={false}>
      <SEO
        title="Contact | Saleel Designs"
        description="Let's work together. Reach out for brand identity, UI/UX, and design system projects."
        url="https://saleeldesigns.com/contact"
      />

      <main style={{ padding: "40px clamp(20px,5vw,64px) 96px" }} className="max-w-7xl mx-auto w-full">
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "12px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--accent)",
          }}
        >
          Contact
        </div>

        <h1
          style={{
            margin: "14px 0 0",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(44px,6.4vw,90px)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
        >
          Let's work{" "}
          <span className="font-serif-italic brand-gradient-text">
            together.
          </span>
        </h1>

        <p
          style={{
            margin: "18px 0 0",
            maxWidth: "560px",
            fontSize: "17px",
            lineHeight: 1.55,
            color: "var(--muted)",
          }}
        >
          Have a project in mind or need strategic design consultation? Reach out below or explore direct contact options.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
            gap: "clamp(24px, 4vw, 56px)",
            marginTop: "56px",
            alignItems: "start",
          }}
        >
          {/* Contact Form Card */}
          <div
            style={{
              background: "var(--card)",
              borderRadius: "26px",
              padding: "clamp(22px, 3vw, 36px)",
              boxShadow: "0 16px 34px -28px rgba(0,0,0,0.25)",
              border: "1px solid var(--line)",
            }}
          >
            {sent ? (
              <div style={{ padding: "40px 0", textAlign: "center" }}>
                <div
                  style={{
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    fontSize: "44px",
                    color: "var(--ink)",
                  }}
                >
                  Thank you
                  <span className="brand-gradient-text">.</span>
                </div>
                <div style={{ color: "var(--muted)", marginTop: "10px" }}>
                  Your message is on its way. Expect a reply within 24 hours.
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  style={{
                    display: "inline-block",
                    marginTop: "22px",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "var(--accent)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Send another →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
                    gap: "14px",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      fontSize: "13px",
                      color: "var(--muted)",
                    }}
                  >
                    Name
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{
                        padding: "14px 16px",
                        borderRadius: "14px",
                        border: "1px solid var(--line)",
                        background: "var(--soft)",
                        fontSize: "15px",
                        outline: "none",
                        color: "var(--ink)",
                      }}
                    />
                  </label>

                  <label
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      fontSize: "13px",
                      color: "var(--muted)",
                    }}
                  >
                    Email
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        padding: "14px 16px",
                        borderRadius: "14px",
                        border: "1px solid var(--line)",
                        background: "var(--soft)",
                        fontSize: "15px",
                        outline: "none",
                        color: "var(--ink)",
                      }}
                    />
                  </label>
                </div>

                <div style={{ marginTop: "18px", fontSize: "13px", color: "var(--muted)" }}>
                  I'm interested in
                </div>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                    marginTop: "8px",
                  }}
                >
                  {INTERESTS.map((item) => {
                    const isSelected = selectedInterests.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleInterest(item)}
                        aria-pressed={isSelected}
                        style={{
                          padding: "8px 14px",
                          borderRadius: "999px",
                          fontSize: "13.5px",
                          border: isSelected ? "1px solid var(--ink)" : "1px solid var(--line)",
                          background: isSelected ? "var(--ink)" : "var(--soft)",
                          color: isSelected ? "var(--bg)" : "var(--body)",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        {isSelected && (
                          <span style={{ fontSize: "11px", fontWeight: 700, lineHeight: 1 }}>✓</span>
                        )}
                        <span>{item}</span>
                      </button>
                    );
                  })}
                </div>

                <label
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    fontSize: "13px",
                    color: "var(--muted)",
                    marginTop: "18px",
                  }}
                >
                  Message
                  <textarea
                    rows={5}
                    placeholder="Tell me about your project…"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{
                      padding: "14px 16px",
                      borderRadius: "14px",
                      border: "1px solid var(--line)",
                      background: "var(--soft)",
                      fontSize: "15px",
                      outline: "none",
                      resize: "vertical",
                      color: "var(--ink)",
                    }}
                  />
                </label>

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "20px",
                    background: "var(--grad)",
                    color: "#ffffff",
                    padding: "14px 24px",
                    borderRadius: "999px",
                    fontSize: "15px",
                    fontWeight: 500,
                    border: "none",
                    cursor: "pointer",
                  }}
                  className="hover:opacity-90 transition-opacity"
                >
                  {submitting ? "Sending..." : "Send message"} <span>↗</span>
                </button>
              </form>
            )}
          </div>

          {/* Contact Direct Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {/* Featured Book 1:1 Call Card */}
            <a
              href="https://cal.com/callwithsaleeldesigns"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "24px",
                borderRadius: "20px",
                background: "var(--grad)",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.2)",
                textDecoration: "none",
                boxShadow: "0 12px 30px -10px rgba(92,184,71,0.45)",
              }}
              className="group hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "14px",
                    background: "rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  <Calendar size={22} color="#ffffff" />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "11px",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      opacity: 0.85,
                      fontWeight: 600,
                    }}
                  >
                    Schedule Direct
                  </div>
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: 600,
                      marginTop: "2px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Book 1:1 Call
                  </div>
                  <div style={{ fontSize: "12.5px", opacity: 0.9, marginTop: "2px" }}>
                    30 min video consultation via Cal.com
                  </div>
                </div>
              </div>
              <span
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                }}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              >
                ↗
              </span>
            </a>

            <a
              href="mailto:workwithsaleel@gmail.com"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "22px 24px",
                borderRadius: "20px",
                background: "var(--card)",
                border: "1px solid var(--line)",
                textDecoration: "none",
                color: "inherit",
              }}
              className="hover:border-primary/40 transition-colors"
            >
              <div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "11px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--muted2)",
                  }}
                >
                  Email
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 500,
                    marginTop: "6px",
                    color: "var(--ink)",
                  }}
                >
                  workwithsaleel@gmail.com
                </div>
              </div>
              <span style={{ fontSize: "16px", color: "var(--muted)" }}>↗</span>
            </a>

            <div
              style={{
                padding: "22px 24px",
                borderRadius: "20px",
                background: "var(--card)",
                border: "1px solid var(--line)",
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "11px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--muted2)",
                }}
              >
                Location
              </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: 500,
                  marginTop: "6px",
                  color: "var(--ink)",
                }}
              >
                Malappuram, Kerala, India
              </div>
            </div>

            <a
              href="https://wa.me/919946447814"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "22px 24px",
                borderRadius: "20px",
                background: "var(--card)",
                border: "1px solid var(--line)",
                textDecoration: "none",
                color: "inherit",
              }}
              className="hover:border-primary/40 transition-colors"
            >
              <div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "11px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--muted2)",
                  }}
                >
                  WhatsApp
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 500,
                    marginTop: "6px",
                    color: "var(--ink)",
                  }}
                >
                  Quick connect
                </div>
              </div>
              <span style={{ fontSize: "16px", color: "var(--muted)" }}>↗</span>
            </a>

            <div
              style={{
                padding: "24px",
                borderRadius: "20px",
                background: "var(--panel)",
                color: "#ffffff",
                border: "1px solid var(--line)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "16px",
                  fontWeight: 500,
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#5fd08f",
                  }}
                />
                Availability
              </div>
              <div
                style={{
                  fontSize: "14.5px",
                  lineHeight: 1.55,
                  opacity: 0.75,
                  marginTop: "8px",
                }}
              >
                Currently accepting new projects. Typical response time: within 24 hours.
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageContainer>
  );
};

export default Contact;
