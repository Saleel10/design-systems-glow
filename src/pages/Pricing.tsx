import { Link } from "react-router-dom";
import PageContainer from "@/components/PageContainer";
import SEO from "@/components/SEO";
import { PLANS } from "@/data/portfolioData";
import { useTheme } from "@/hooks/use-theme";

const Pricing = () => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  return (
    <PageContainer>
      <SEO
        title="Pricing | Saleel Designs"
        description="Transparent freelance packages for structured brand and design solutions. Brand Essentials, Brand Identity, and Brand & Digital Experience packages."
        url="https://saleeldesigns.com/pricing"
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
          Pricing
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
          Freelance{" "}
          <span className="font-serif-italic brand-gradient-text">
            packages.
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
          Transparent pricing for structured brand and design solutions.
        </p>

        {/* Pricing Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "16px",
            marginTop: "56px",
            alignItems: "stretch",
          }}
        >
          {PLANS.map((p) => {
            const isFeatured = p.dark || p.name === "Brand Identity";
            const isFeaturedInDark = isFeatured && isDarkTheme;
            const isDark = p.dark;

            const bg = isFeaturedInDark ? "#ffffff" : isDark ? "var(--panel)" : "var(--card)";
            const fg = isFeaturedInDark ? "#000000" : isDark ? "#ffffff" : "var(--ink)";
            const subColor = isFeaturedInDark ? "#525252" : isDark ? "rgba(255,255,255,0.7)" : "var(--muted)";
            const line = isFeaturedInDark ? "rgba(0,0,0,0.08)" : isDark ? "rgba(255,255,255,0.12)" : "var(--line)";
            const featColor = isFeaturedInDark ? "#171717" : fg;

            return (
              <div
                key={p.name}
                style={{
                  background: bg,
                  color: fg,
                  borderRadius: "26px",
                  padding: "32px 30px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
                className={`pricing-card group border transition-all duration-300 ${
                  isFeaturedInDark
                    ? "border-transparent shadow-[0_20px_45px_-12px_rgba(255,255,255,0.12)]"
                    : isDark
                    ? "border-[var(--line)] shadow-[0_16px_34px_-24px_rgba(0,0,0,0.25)]"
                    : "border-[var(--line)] shadow-[0_16px_34px_-24px_rgba(0,0,0,0.25)]"
                }`}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontSize: "21px", fontWeight: isFeaturedInDark ? 600 : 500, color: fg }}>
                    {p.name}
                  </div>
                  {p.badge && (
                    <div
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "11px",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        padding: "4px 10px",
                        borderRadius: "999px",
                        background: isFeaturedInDark
                          ? "#e8f7ee"
                          : isDark
                          ? "rgba(95,208,143,0.18)"
                          : "var(--tint)",
                        color: isFeaturedInDark
                          ? "#1e834b"
                          : isDark
                          ? "#5fd08f"
                          : "var(--accent)",
                        border: isFeaturedInDark ? "1px solid rgba(30,131,75,0.2)" : "none",
                        fontWeight: 600,
                      }}
                    >
                      {p.badge}
                    </div>
                  )}
                </div>

                <div style={{ fontSize: "14px", color: subColor, marginTop: "4px" }}>
                  {p.sub}
                </div>

                <div
                  style={{
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    fontSize: "56px",
                    lineHeight: 1,
                    marginTop: "24px",
                    color: fg,
                  }}
                >
                  {p.price}
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "14px",
                      color: isFeaturedInDark ? "#737373" : undefined,
                      opacity: isFeaturedInDark ? 1 : 0.6,
                      fontWeight: 400,
                    }}
                  >
                    {" "}
                    /project
                  </span>
                </div>

                <div
                  style={{
                    height: "1px",
                    background: line,
                    margin: "26px 0 20px",
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "11px",
                    flex: 1,
                  }}
                >
                  {p.feats.map((f, fi) => (
                    <div
                      key={fi}
                      style={{
                        fontSize: "15px",
                        display: "flex",
                        gap: "12px",
                        alignItems: "baseline",
                        lineHeight: 1.45,
                        color: featColor,
                      }}
                    >
                      <span style={{ opacity: 0.9, color: "var(--accent)" }}>✓</span>
                      {f}
                    </div>
                  ))}
                </div>

                <a
                  href="https://cal.com/muhammed-saleel-yjtcye/30min"
                  target="_blank"
                  rel="noreferrer"
                  className={`pricing-cta mt-7 text-center py-3.5 px-6 rounded-full text-[15px] font-medium transition-all duration-300 block no-underline ${
                    isFeatured
                      ? 'brand-gradient text-white shadow-[0_8px_24px_-6px_rgba(92,184,71,0.45)]'
                      : 'bg-[var(--ink)] text-[var(--bg)] active:scale-95'
                  }`}
                >
                  Book a call ↗
                </a>
              </div>
            );
          })}
        </div>

        {/* Custom Retainer Banner */}
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            padding: "24px 30px",
            borderRadius: "22px",
            border: "1px dashed var(--line2)",
          }}
        >
          <div>
            <div style={{ fontSize: "17px", fontWeight: 500, color: "var(--ink)" }}>
              Need something custom?
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "var(--muted)",
                marginTop: "4px",
              }}
            >
              Ongoing retainers and product design engagements are quoted per scope.
            </div>
          </div>

          <Link
            to="/contact"
            style={{
              padding: "12px 20px",
              borderRadius: "999px",
              background: "var(--grad)",
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: 500,
              textDecoration: "none",
            }}
            className="hover:opacity-90 transition-opacity"
          >
            Request a quote →
          </Link>
        </div>
      </main>
    </PageContainer>
  );
};

export default Pricing;
