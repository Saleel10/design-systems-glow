import { Link } from "react-router-dom";
import PageContainer from "@/components/PageContainer";
import SEO from "@/components/SEO";
import { CASES } from "@/data/portfolioData";
import { ArrowUpRight } from "lucide-react";

// Visual preview configurations for case studies (rich editorial artwork, NO company logos)
const CASE_VISUALS: Record<
  string,
  {
    gradient: string;
    accent: string;
    num: string;
    headline: string;
    badge: string;
    stats: { label: string; val: string }[];
  }
> = {
  taxverse: {
    gradient: "from-[#081f17] via-[#0d2a20] to-[#05140f]",
    accent: "#5cb847",
    num: "01",
    headline: "Brand Strategy & Design",
    badge: "IDENTITY SYSTEM",
    stats: [
      { label: "Deliverables", val: "Full System" },
      { label: "Timeline", val: "4 Weeks" },
    ],
  },
  trevio: {
    gradient: "from-[#0a202a] via-[#0e2c3a] to-[#06161d]",
    accent: "#38bdf8",
    num: "02",
    headline: "Product UX & Design System",
    badge: "MOBILE & WEB",
    stats: [
      { label: "Velocity", val: "+48%" },
      { label: "Tokens", val: "Component Lib" },
    ],
  },
  shad: {
    gradient: "from-[#22180c] via-[#2f2210] to-[#140e06]",
    accent: "#f59e0b",
    num: "03",
    headline: "Bilingual Brand Identity",
    badge: "EN · AR IDENTITY",
    stats: [
      { label: "Scope", val: "Campus & Web" },
      { label: "Lockups", val: "Dual Script" },
    ],
  },
};

const CaseStudies = () => {
  return (
    <PageContainer>
      <SEO
        title="Case Studies | Saleel Designs"
        description="The thinking behind the work. Deep dives into problem, process, and outcome for Taxverse, Trevio, and Shad Creative Education."
        url="https://saleeldesigns.com/cases"
      />

      <main style={{ padding: "40px clamp(20px,5vw,64px) 96px" }} className="max-w-7xl mx-auto w-full">
        {/* Header Topic with Green Color and Hover */}
        <div className="font-heading text-xs tracking-[0.14em] uppercase text-[#5cb847] hover:text-[#76d65e] transition-colors font-semibold">
          Case studies
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
          The thinking{" "}
          <span className="font-serif-italic brand-gradient-text">
            behind the work.
          </span>
        </h1>

        <p
          style={{
            margin: "22px 0 0",
            maxWidth: "540px",
            fontSize: "17px",
            lineHeight: 1.55,
            color: "var(--muted)",
          }}
        >
          Deep dives into the problem, process and outcome of selected projects.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            marginTop: "56px",
          }}
        >
          {CASES.map((c) => {
            const visual = CASE_VISUALS[c.id] || {
              gradient: "from-[#081f17] via-[#0d2a20] to-[#05140f]",
              accent: "#5cb847",
              num: "01",
              headline: "Case Study",
              badge: "DESIGN",
              stats: [{ label: "Role", val: c.role }],
            };

            return (
              <Link
                key={c.id}
                to={`/cases/${c.id}`}
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
                  gap: 0,
                  background: "var(--card)",
                  borderRadius: "26px",
                  overflow: "hidden",
                  boxShadow: "0 16px 34px -28px rgba(0,0,0,0.25)",
                  textDecoration: "none",
                  color: "inherit",
                  border: "1px solid var(--line)",
                }}
                className="group transition-all duration-300 hover:scale-[1.008] hover:border-[var(--line2)] hover:shadow-[0_24px_48px_-20px_rgba(0,0,0,0.35)]"
              >
                {/* Case Study Cover Visual (Rich editorial UI artwork, NO company logos) */}
                <div
                  className={`relative min-h-[320px] bg-gradient-to-br ${visual.gradient} flex flex-col justify-between p-8 sm:p-10 transition-colors`}
                >
                  {/* Subtle radial glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(255,255,255,0.08),transparent_70%)] pointer-events-none" />

                  {/* Top Bar with Case Number */}
                  <div className="relative z-10 flex items-center justify-between w-full">
                    <span className="font-heading text-xs tracking-widest uppercase font-bold text-white/90 px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm">
                      CASE {visual.num}
                    </span>
                  </div>

                  {/* Center Editorial Preview */}
                  <div className="relative z-10 my-auto py-4">
                    <div className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                      {visual.headline}
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3 max-w-sm">
                      {visual.stats.map((st) => (
                        <div
                          key={st.label}
                          className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                        >
                          <div className="text-[10px] uppercase font-mono tracking-wider text-white/50">
                            {st.label}
                          </div>
                          <div className="text-xs sm:text-sm font-semibold text-white mt-0.5">
                            {st.val}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom indicator */}
                  <div className="relative z-10 flex items-center justify-end pt-2 border-t border-white/10">
                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-[#5cb847] group-hover:border-[#5cb847] group-hover:scale-110 transition-all">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                {/* Case Study Details Content */}
                <div
                  style={{
                    padding: "clamp(24px, 3vw, 44px)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    {/* Topic tag with Green color & hover */}
                    <span className="px-3 py-1 rounded-full text-xs font-medium text-[#5cb847] bg-[#5cb847]/10 border border-[#5cb847]/30 group-hover:bg-[#5cb847]/20 group-hover:border-[#5cb847] transition-all">
                      {c.tag}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "12px",
                        color: "var(--muted2)",
                      }}
                    >
                      {c.client} · {c.year}
                    </span>
                  </div>

                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "clamp(28px, 2.8vw, 38px)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.01em",
                      color: "var(--ink)",
                    }}
                    className="group-hover:text-[#5cb847] transition-colors"
                  >
                    {c.title}
                  </div>

                  <div
                    style={{
                      fontSize: "15px",
                      lineHeight: 1.6,
                      color: "var(--muted)",
                    }}
                  >
                    {c.summary}
                  </div>

                  {/* Read case study button: styled as green outline button matching 'Book consultation' */}
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--line)] bg-[var(--card)] text-sm font-medium text-[var(--ink)] shadow-sm group-hover:border-[#5cb847] group-hover:text-[#5cb847] group-hover:bg-[#5cb847]/10 group-hover:shadow-[0_0_16px_rgba(92,184,71,0.25)] group-hover:scale-[1.02] transition-all duration-200 w-fit mt-2">
                    <span>Read case study</span>
                    <span className="text-base leading-none">→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </PageContainer>
  );
};

export default CaseStudies;
