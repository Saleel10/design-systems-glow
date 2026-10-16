import PageContainer from "@/components/PageContainer";
import SEO from "@/components/SEO";

interface JobItem {
  role: string;
  org: string;
  period: string;
  resp: string[];
  ach: string[];
  tools: string[];
}

const ALL_JOBS: JobItem[] = [
  {
    role: "Creative Designer",
    org: "HW Growth Studio",
    period: "2025 — Present",
    resp: [
      "Designed brand identities and visual systems",
      "Created social media creatives and campaigns",
      "Developed marketing and promotional assets",
      "Collaborated with marketing teams on creative strategy",
    ],
    ach: [
      "Delivered 100+ creative assets for brands",
      "Improved visual consistency across projects",
      "Supported high-performing marketing campaigns",
      "Managed end-to-end creative executions",
    ],
    tools: ["Illustrator", "Photoshop", "Figma", "InDesign"],
  },
  {
    role: "Freelance Creative Graphic & UI/UX Designer",
    org: "Independent",
    period: "2021 — Present",
    resp: [
      "End-to-end brand identity design for startups",
      "UI/UX design for web and mobile products",
      "Design systems development and documentation",
      "Client strategy and creative direction",
    ],
    ach: [
      "Delivered 50+ brand projects",
      "Built 3 enterprise-scale design systems",
      "Maintained 98% client satisfaction rate",
    ],
    tools: ["Figma", "Illustrator", "Photoshop", "Framer"],
  },
  {
    role: "UI/UX Designer",
    org: "Mapki Solutions",
    period: "2023 — Present",
    resp: [
      "Designed responsive web and mobile interfaces",
      "Created wireframes and interactive prototypes",
      "Improved usability and user experience flows",
      "Collaborated closely with developers",
    ],
    ach: [
      "Designed interfaces for AI automation platforms",
      "Improved UI consistency across products",
      "Built scalable and modern design systems",
      "Enhanced engagement through UX improvements",
    ],
    tools: ["Figma", "FigJam", "Miro", "Maze"],
  },
  {
    role: "Graphic Designer",
    org: "Connect EMEA",
    period: "2023 — 2025",
    resp: [
      "Designed event and campaign creatives",
      "Created social media content",
      "Supported branding initiatives",
      "Assisted with UI and presentation design",
    ],
    ach: [
      "Designed visuals for major student events",
      "Increased engagement through creative campaigns",
      "Maintained branding consistency",
      "Collaborated on promotional strategies",
    ],
    tools: ["Illustrator", "Photoshop", "Canva", "Figma"],
  },
  {
    role: "Graphic Designer",
    org: "Luxora Furniture",
    period: "2021 — 2023",
    resp: [
      "Designed branding and marketing materials",
      "Created promotional digital assets",
      "Produced advertising creatives",
      "Supported UI-related design tasks",
    ],
    ach: [
      "Delivered creatives for multiple campaigns",
      "Improved brand presentation quality",
      "Worked across digital platforms",
      "Maintained strong visual consistency",
    ],
    tools: ["Illustrator", "Photoshop", "Figma", "Canva"],
  },
];

const Experience = () => {
  return (
    <PageContainer>
      <SEO
        title="Experience | Saleel Designs"
        description="Professional journey, roles, responsibilities, and achievements across HW Growth Studio, Mapki Solutions, and independent design consulting."
        url="https://saleeldesigns.com/experience"
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
          Experience
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
          Professional{" "}
          <span className="font-serif-italic brand-gradient-text">
            journey.
          </span>
        </h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginTop: "56px",
          }}
        >
          {ALL_JOBS.map((j, i) => (
            <div
              key={i}
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
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "clamp(22px,2.4vw,28px)",
                      fontWeight: 500,
                      letterSpacing: "-0.015em",
                      color: "var(--ink)",
                    }}
                  >
                    {j.role}
                  </div>
                  <div
                    style={{
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                      fontSize: "22px",
                      color: "var(--accent)",
                      marginTop: "4px",
                    }}
                  >
                    {j.org}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "13px",
                    color: "var(--muted)",
                  }}
                >
                  {j.period}
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
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
                      marginBottom: "12px",
                    }}
                  >
                    Responsibilities
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    {j.resp.map((r, ri) => (
                      <div
                        key={ri}
                        style={{
                          fontSize: "15px",
                          lineHeight: 1.5,
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
                        {r}
                      </div>
                    ))}
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
                      marginBottom: "12px",
                    }}
                  >
                    Key achievements
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    {j.ach.map((a, ai) => (
                      <div
                        key={ai}
                        style={{
                          fontSize: "15px",
                          lineHeight: 1.5,
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
                            background: "var(--ink)",
                            transform: "rotate(45deg)",
                            flex: "none",
                            position: "relative",
                            top: "-2px",
                          }}
                        />
                        {a}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px",
                  marginTop: "26px",
                  paddingTop: "20px",
                  borderTop: "1px solid var(--line)",
                }}
              >
                {j.tools.map((t, ti) => (
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
            </div>
          ))}
        </div>
      </main>
    </PageContainer>
  );
};

export default Experience;
