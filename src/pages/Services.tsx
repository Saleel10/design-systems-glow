import { Link } from "react-router-dom";
import PageContainer from "@/components/PageContainer";
import SEO from "@/components/SEO";
import { SERVICES } from "@/data/portfolioData";

const Services = () => {
  return (
    <PageContainer>
      <SEO
        title="Services | Saleel Designs"
        description="End-to-end design services built on structure, strategy, and systems thinking. Brand identity, UI/UX, and design systems."
        url="https://saleeldesigns.com/services"
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
          Services
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
          Strategic design{" "}
          <span className="font-serif-italic brand-gradient-text">
            solutions.
          </span>
        </h1>

        <p
          style={{
            margin: "22px 0 0",
            maxWidth: "520px",
            fontSize: "17px",
            lineHeight: 1.55,
            color: "var(--muted)",
          }}
        >
          End-to-end design services built on structure, strategy, and systems thinking.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "56px" }}>
          {SERVICES.map((s) => (
            <div
              key={s.n}
              style={{
                background: "var(--card)",
                borderRadius: "26px",
                padding: "clamp(24px,3vw,40px)",
                boxShadow: "0 16px 34px -28px rgba(0,0,0,0.25)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  gap: "12px",
                  alignItems: "baseline",
                }}
              >
                <div style={{ display: "flex", gap: "18px", alignItems: "baseline" }}>
                  <span
                    style={{
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                      fontSize: "30px",
                      color: "var(--accent)",
                    }}
                  >
                    {s.n}
                  </span>
                  <span
                    style={{
                      fontSize: "clamp(22px,2.4vw,30px)",
                      fontWeight: 500,
                      letterSpacing: "-0.015em",
                    }}
                  >
                    {s.title}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "12px",
                    color: "var(--muted2)",
                  }}
                >
                  Timeline · {s.time}
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
                  gap: "28px",
                  marginTop: "28px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "11px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--muted2)",
                      marginBottom: "10px",
                    }}
                  >
                    Problem
                  </div>
                  <div style={{ fontSize: "15px", lineHeight: 1.6, color: "var(--body)" }}>
                    {s.problem}
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "11px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--muted2)",
                      marginBottom: "10px",
                    }}
                  >
                    Approach
                  </div>
                  <div style={{ fontSize: "15px", lineHeight: 1.6, color: "var(--body)" }}>
                    {s.approach}
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "11px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--muted2)",
                      marginBottom: "10px",
                    }}
                  >
                    Deliverables
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {s.deliv.map((d, di) => (
                      <div
                        key={di}
                        style={{
                          fontSize: "15px",
                          color: "var(--body)",
                          display: "flex",
                          gap: "10px",
                          alignItems: "baseline",
                        }}
                      >
                        <span
                          style={{
                            width: "5px",
                            height: "5px",
                            background: "var(--accent)",
                            transform: "rotate(45deg)",
                            flex: "none",
                            position: "relative",
                            top: "-2px",
                          }}
                        />
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "12px",
                  marginTop: "28px",
                  paddingTop: "20px",
                  borderTop: "1px solid var(--line)",
                }}
              >
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {s.tools.map((t, ti) => (
                    <span
                      key={ti}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "999px",
                        background: "var(--soft)",
                        fontSize: "13px",
                        color: "var(--body)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href="https://cal.com/callwithsaleeldesigns"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--line)] bg-[var(--card)] text-sm font-medium text-[var(--ink)] shadow-sm hover:border-[#5cb847] hover:text-[#5cb847] hover:bg-[#5cb847]/10 hover:shadow-[0_0_16px_rgba(92,184,71,0.25)] hover:scale-[1.02] transition-all duration-200 no-underline"
                >
                  <span>Book consultation</span>
                  <span className="text-base leading-none">↗</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </PageContainer>
  );
};

export default Services;
