import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PageContainer from "@/components/PageContainer";
import SEO from "@/components/SEO";
import { CaseStudy, STEPS } from "@/data/portfolioData";
import { getSyncedCases, DEFAULT_CASES } from "@/lib/portfolioDataSync";

const CaseStudyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [cases, setCases] = useState<CaseStudy[]>(DEFAULT_CASES);

  useEffect(() => {
    const loadCases = async () => {
      const data = await getSyncedCases();
      if (Array.isArray(data) && data.length > 0) {
        setCases(data);
      }
    };
    loadCases();

    window.addEventListener("portfolio_data_updated", loadCases);
    return () => window.removeEventListener("portfolio_data_updated", loadCases);
  }, []);

  const currentIndex = cases.findIndex(
    (c) => c.id.toLowerCase() === (id || "").toLowerCase()
  );
  const cs = currentIndex !== -1 ? cases[currentIndex] : cases[0] || DEFAULT_CASES[0];
  const nextCase = cases.length > 1 ? cases[(currentIndex + 1) % cases.length] : cs;

  const outcomeList = Array.isArray(cs.outcome)
    ? cs.outcome.map((o: any) => (typeof o === "string" ? o : o.text || ""))
    : [];

  const meta = [
    { k: "Client", v: cs.client },
    { k: "Role", v: cs.role },
    { k: "Duration", v: cs.duration },
    { k: "Year", v: cs.year },
  ];

  return (
    <PageContainer>
      <SEO
        title={`${cs.title} | Case Study | Saleel Designs`}
        description={cs.summary}
        url={`https://saleeldesigns.com/cases/${cs.id}`}
      />

      <main style={{ padding: "32px clamp(20px,5vw,64px) 96px" }} className="max-w-7xl mx-auto w-full">
        <Link
          to="/cases"
          style={{
            fontSize: "14px",
            color: "var(--muted)",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            textDecoration: "none",
          }}
          className="hover:opacity-80 transition-opacity"
        >
          ← All case studies
        </Link>

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginTop: "28px",
          }}
        >
          <span
            style={{
              padding: "5px 11px",
              borderRadius: "999px",
              background: "var(--tint)",
              color: "var(--accent)",
              fontSize: "12px",
              fontWeight: 500,
            }}
          >
            {cs.tag}
          </span>
        </div>

        <h1
          style={{
            margin: "16px 0 0",
            maxWidth: "980px",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(46px,6.4vw,88px)",
            lineHeight: 0.98,
            letterSpacing: "-0.025em",
            textWrap: "balance",
          }}
        >
          {cs.title}
        </h1>

        {/* Metadata Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "16px",
            marginTop: "36px",
            padding: "22px 0",
            borderTop: "1px solid var(--line)",
            borderBottom: "1px solid var(--line)",
          }}
        >
          {meta.map((m) => (
            <div key={m.k}>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "11px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--muted2)",
                }}
              >
                {m.k}
              </div>
              <div
                style={{
                  fontSize: "15px",
                  marginTop: "6px",
                  color: "var(--ink)",
                  fontWeight: 500,
                }}
              >
                {m.v}
              </div>
            </div>
          ))}
        </div>

        {/* Hero Visual Card */}
        <div
          style={{
            position: "relative",
            aspectRatio: "16/8",
            borderRadius: "28px",
            overflow: "hidden",
            background: "var(--soft)",
            marginTop: "36px",
            border: "1px solid var(--line)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at center, rgba(19, 128, 111, 0.15) 0%, transparent 75%)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* 01 Overview */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "clamp(24px, 5vw, 72px)",
            marginTop: "64px",
          }}
        >
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "12px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            01 — Overview
          </div>
          <p
            style={{
              margin: 0,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              fontSize: "clamp(24px, 2.4vw, 32px)",
              lineHeight: 1.3,
              color: "var(--ink)",
            }}
          >
            {cs.overview}
          </p>
        </div>

        {/* 02 Challenge */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "clamp(24px, 5vw, 72px)",
            marginTop: "56px",
          }}
        >
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "12px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            02 — Challenge
          </div>
          <p
            style={{
              margin: 0,
              fontSize: "17px",
              lineHeight: 1.65,
              color: "var(--body)",
            }}
          >
            {cs.challenge}
          </p>
        </div>

        {/* 03 Process */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "clamp(24px, 5vw, 72px)",
            marginTop: "56px",
          }}
        >
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "12px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            03 — Process
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              borderTop: "1px solid var(--line)",
            }}
          >
            {STEPS.map((s) => (
              <div
                key={s.n}
                style={{
                  display: "flex",
                  gap: "20px",
                  padding: "18px 0",
                  borderBottom: "1px solid var(--line)",
                }}
              >
                <span
                  style={{
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    fontSize: "22px",
                    color: "var(--accent)",
                    width: "34px",
                    flex: "none",
                  }}
                >
                  {s.n}
                </span>
                <div>
                  <div
                    style={{
                      fontSize: "17px",
                      fontWeight: 500,
                      color: "var(--ink)",
                    }}
                  >
                    {s.t}
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                      lineHeight: 1.55,
                      color: "var(--muted)",
                      marginTop: "4px",
                    }}
                  >
                    {s.d}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mockups / Gallery Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "16px",
            marginTop: "56px",
          }}
        >
          <div
            style={{
              position: "relative",
              aspectRatio: "4/3",
              borderRadius: "22px",
              overflow: "hidden",
              background: "var(--soft)",
              border: "1px solid var(--line)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "13px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--accent)",
              }}
            >
              Phase 01 · Research & Explorations
            </div>
            <div
              style={{
                fontSize: "16px",
                fontWeight: 500,
                color: "var(--ink)",
                marginTop: "8px",
              }}
            >
              Wireframes, visual mapping & system architecture
            </div>
          </div>

          <div
            style={{
              position: "relative",
              aspectRatio: "4/3",
              borderRadius: "22px",
              overflow: "hidden",
              background: "var(--soft)",
              border: "1px solid var(--line)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "13px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--accent)",
              }}
            >
              Phase 02 · Final Delivery
            </div>
            <div
              style={{
                fontSize: "16px",
                fontWeight: 500,
                color: "var(--ink)",
                marginTop: "8px",
              }}
            >
              High-fidelity components, applications & tokens
            </div>
          </div>
        </div>

        {/* 04 Outcome */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "clamp(24px, 5vw, 72px)",
            marginTop: "56px",
          }}
        >
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "12px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            04 — Outcome
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {outcomeList.map((o, oi) => (
              <div
                key={oi}
                style={{
                  fontSize: "17px",
                  lineHeight: 1.5,
                  display: "flex",
                  gap: "12px",
                  alignItems: "baseline",
                  color: "var(--body)",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    background: "var(--ink)",
                    transform: "rotate(45deg)",
                    flex: "none",
                    position: "relative",
                    top: "-3px",
                  }}
                />
                {o}
              </div>
            ))}
          </div>
        </div>

        {/* Next Case Study Banner */}
        <Link
          to={`/cases/${nextCase.id}`}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            marginTop: "80px",
            padding: "32px clamp(22px, 3vw, 40px)",
            background: "var(--panel)",
            color: "#ffffff",
            border: "1px solid var(--line)",
            borderRadius: "26px",
            textDecoration: "none",
          }}
          className="group hover:opacity-95 transition-opacity"
        >
          <div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                opacity: 0.6,
              }}
            >
              Next case study
            </div>
            <div
              style={{
                fontWeight: 600,
                letterSpacing: "-0.02em",
                fontSize: "clamp(26px, 3vw, 38px)",
                marginTop: "8px",
              }}
            >
              {nextCase.title}
            </div>
          </div>
          <span
            style={{ fontSize: "28px" }}
            className="group-hover:translate-x-1.5 transition-transform"
          >
            →
          </span>
        </Link>
      </main>
    </PageContainer>
  );
};

export default CaseStudyDetail;
