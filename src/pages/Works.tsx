import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageContainer from "@/components/PageContainer";
import SEO from "@/components/SEO";
import { getSyncedWorks, SyncedWork, DEFAULT_WORKS } from "@/lib/portfolioDataSync";
import { ArrowUpRight } from "lucide-react";

const FILTERS = ["All", "Branding", "UI/UX", "Web", "Social"];

// Preview configurations for work cards (rich visual previews without client logos)
const WORK_PREVIEWS: Record<
  string,
  {
    gradient: string;
    accent: string;
    type: "brand" | "ui" | "web" | "system" | "social";
  }
> = {
  taxverse: {
    gradient: "from-[#0b241b] via-[#103024] to-[#071610]",
    accent: "#5cb847",
    type: "brand",
  },
  trevio: {
    gradient: "from-[#0c242e] via-[#0d2f3c] to-[#07171d]",
    accent: "#38bdf8",
    type: "ui",
  },
  shad: {
    gradient: "from-[#2a2010] via-[#352814] to-[#1a140a]",
    accent: "#f59e0b",
    type: "system",
  },
  buraq: {
    gradient: "from-[#17142b] via-[#1f1b3a] to-[#0f0d1c]",
    accent: "#a855f7",
    type: "web",
  },
  "2nd-street": {
    gradient: "from-[#24131b] via-[#331b26] to-[#170c12]",
    accent: "#f43f5e",
    type: "brand",
  },
  raidhan: {
    gradient: "from-[#10241e] via-[#18362d] to-[#0b1814]",
    accent: "#10b981",
    type: "social",
  },
};

const Works = () => {
  const [works, setWorks] = useState<SyncedWork[]>(DEFAULT_WORKS);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const loadWorks = async () => {
      const data = await getSyncedWorks();
      if (Array.isArray(data) && data.length > 0) {
        setWorks(data);
      }
    };
    loadWorks();

    window.addEventListener("portfolio_data_updated", loadWorks);
    return () => window.removeEventListener("portfolio_data_updated", loadWorks);
  }, []);

  const filteredWorks =
    filter === "All"
      ? works
      : works.filter(
          (w) =>
            w.cat?.toLowerCase() === filter.toLowerCase() ||
            w.categories?.name?.toLowerCase() === filter.toLowerCase()
        );

  return (
    <PageContainer>
      <SEO
        title="Selected Works | Saleel Designs"
        description="A curated selection of projects demonstrating strategic thinking and systematic design across Branding, UI/UX, and Web."
        url="https://saleeldesigns.com/works"
      />

      <main style={{ padding: "40px clamp(20px,5vw,64px) 96px" }} className="max-w-7xl mx-auto w-full">
        {/* Top Topic Tag with Green Color & Hover */}
        <div className="font-heading text-xs tracking-[0.14em] uppercase text-[#5cb847] hover:text-[#76d65e] transition-colors font-semibold">
          Portfolio
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
          Selected{" "}
          <span className="font-serif-italic brand-gradient-text">
            works.
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
          A curated selection of projects that demonstrate strategic thinking and systematic design.
        </p>

        {/* Filters with Brand Gradient on Selected Category */}
        <div className="flex flex-wrap gap-2.5 mt-9">
          {FILTERS.map((f) => {
            const isActive = filter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "brand-gradient text-white border border-transparent shadow-[0_4px_16px_rgba(92,184,71,0.35)] scale-105"
                    : "border border-[var(--line)] bg-[var(--card)] text-[var(--body)] hover:border-[#5cb847] hover:text-[#5cb847] hover:bg-[#5cb847]/5"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Works Grid: Fixed 3-column layout on desktop so single work cards retain the exact same size */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mt-8">
          {filteredWorks.map((w) => {
            const targetUrl = `/work/${w.slug}`;
            const preview = WORK_PREVIEWS[w.id] || {
              gradient: "from-[#111a16] via-[#16241e] to-[#0a120e]",
              accent: "#5cb847",
              type: "brand" as const,
            };

            return (
              <Link
                key={w.id}
                to={targetUrl}
                className="group cursor-pointer flex flex-col gap-3.5 w-full no-underline text-inherit"
              >
                {/* Showcase Media (Rich visual preview, NO company logos) */}
                <div
                  className={`relative aspect-[4/3] rounded-[22px] overflow-hidden border border-[var(--line)] bg-gradient-to-br ${preview.gradient} flex flex-col justify-between p-6 group-hover:scale-[1.015] group-hover:shadow-[0_20px_40px_-16px_rgba(0,0,0,0.4)] transition-all duration-300`}
                >
                  {/* Subtle radial light */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.08),transparent_70%)] pointer-events-none" />

                  {/* Top Bar */}
                  <div className="relative z-10 flex items-center justify-between w-full">
                    <div className="flex items-center gap-1.5 opacity-60">
                      <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    </div>
                  </div>

                  {/* Center abstract artwork / UI mockup preview */}
                  <div className="relative z-10 flex flex-col items-center justify-center my-auto py-2 w-full h-full">
                    {w.image_url ? (
                      <div className="w-full h-full max-h-[175px] flex items-center justify-center overflow-hidden rounded-xl bg-black/20 p-2">
                        <img
                          src={w.image_url}
                          alt={w.title}
                          className="max-h-full max-w-full object-contain rounded-lg shadow-md"
                        />
                      </div>
                    ) : (
                      <>
                        {preview.type === "brand" && (
                          <div className="w-full max-w-[210px] bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md shadow-lg group-hover:border-[#5cb847]/40 transition-colors">
                            <div
                              className="h-2 w-16 rounded-full mb-3"
                              style={{ backgroundColor: preview.accent }}
                            />
                            <div className="space-y-1.5">
                              <div className="h-1.5 w-full bg-white/20 rounded" />
                              <div className="h-1.5 w-4/5 bg-white/15 rounded" />
                              <div className="h-1.5 w-3/5 bg-white/10 rounded" />
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                              <div className="flex gap-1.5">
                                <span className="w-3.5 h-3.5 rounded-full bg-[#13806f]" />
                                <span
                                  className="w-3.5 h-3.5 rounded-full"
                                  style={{ backgroundColor: preview.accent }}
                                />
                                <span className="w-3.5 h-3.5 rounded-full bg-white/80" />
                              </div>
                              <span className="text-[9px] font-mono text-white/40 tracking-wider">
                                IDENTITY
                              </span>
                            </div>
                          </div>
                        )}

                        {preview.type === "ui" && (
                          <div className="w-full max-w-[210px] bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md shadow-lg group-hover:border-[#38bdf8]/40 transition-colors">
                            <div className="flex items-center justify-between mb-3">
                              <div className="w-6 h-6 rounded-lg bg-[#38bdf8]/25 flex items-center justify-center text-[10px] text-[#38bdf8] font-bold">
                                UI
                              </div>
                              <div className="h-1.5 w-14 bg-white/20 rounded-full" />
                            </div>
                            <div className="grid grid-cols-2 gap-2 my-2">
                              <div className="p-1.5 rounded bg-white/5 border border-white/5">
                                <div className="text-[9px] text-white/40">Efficiency</div>
                                <div className="text-xs font-bold text-white mt-0.5">3.4x</div>
                              </div>
                              <div className="p-1.5 rounded bg-white/5 border border-white/5">
                                <div className="text-[9px] text-white/40">Flow</div>
                                <div className="text-xs font-bold text-[#38bdf8] mt-0.5">+48%</div>
                              </div>
                            </div>
                            <div className="h-1.5 w-full bg-white/20 rounded mt-1.5" />
                          </div>
                        )}

                        {preview.type === "system" && (
                          <div className="w-full max-w-[210px] bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md shadow-lg group-hover:border-[#f59e0b]/40 transition-colors">
                            <div className="flex items-center gap-2 mb-2.5">
                              <span className="text-sm font-serif italic text-[#f59e0b]">Aa</span>
                              <div className="h-1.5 w-16 bg-white/20 rounded" />
                            </div>
                            <div className="h-px w-full bg-white/10 my-2" />
                            <div className="flex justify-between items-center text-[11px] text-white/70">
                              <span className="font-mono text-[10px] text-white/60">EN · AR</span>
                              <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-white/90">2024</span>
                            </div>
                          </div>
                        )}

                        {preview.type === "web" && (
                          <div className="w-full max-w-[210px] bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md shadow-lg group-hover:border-[#a855f7]/40 transition-colors">
                            <div className="flex items-center gap-1.5 mb-2.5">
                              <div className="w-2 h-2 rounded-full bg-white/30" />
                              <div className="h-1.5 w-20 bg-white/20 rounded" />
                            </div>
                            <div className="h-10 rounded-lg bg-white/10 flex items-center justify-center mb-2">
                              <span className="text-[10px] text-white/60 font-mono">WEB ARCHITECTURE</span>
                            </div>
                            <div className="grid grid-cols-3 gap-1">
                              <div className="h-1.5 bg-white/15 rounded" />
                              <div className="h-1.5 bg-white/15 rounded" />
                              <div className="h-1.5 bg-white/15 rounded" />
                            </div>
                          </div>
                        )}

                        {preview.type === "social" && (
                          <div className="w-full max-w-[210px] bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md shadow-lg group-hover:border-[#10b981]/40 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-mono text-white/60">CAMPAIGN</span>
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-emerald-300 font-mono">SOCIAL</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 my-1">
                              <div className="h-10 rounded bg-white/10 flex items-center justify-center">
                                <span className="text-[8px] text-white/40">1:1</span>
                              </div>
                              <div className="h-10 rounded bg-white/10 flex items-center justify-center">
                                <span className="text-[8px] text-white/40">9:16</span>
                              </div>
                            </div>
                            <div className="h-1.5 w-3/4 bg-white/20 rounded mt-1.5" />
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Bottom View badge */}
                  <div className="relative z-10 flex items-end justify-end w-full">
                    <div className="w-8 h-8 rounded-full bg-[var(--card)]/90 backdrop-blur-sm border border-[var(--line)] flex items-center justify-center group-hover:bg-[#5cb847] group-hover:border-[#5cb847] transition-all shadow-sm">
                      <ArrowUpRight className="w-4 h-4 text-[var(--ink)] group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>

                {/* Card Meta with Green Topic & Hovering */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "12px",
                    alignItems: "baseline",
                    padding: "0 4px",
                  }}
                >
                  <div>
                    <div
                      style={{ fontSize: "18px", fontWeight: 500 }}
                      className="text-[var(--ink)] group-hover:text-[#5cb847] transition-colors"
                    >
                      {w.title}
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "var(--muted)",
                        marginTop: "2px",
                      }}
                    >
                      <span className="text-[#5cb847] font-medium group-hover:text-[#76d65e] transition-colors">
                        {w.cat}
                      </span>{" "}
                      · {w.cta}
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "12px",
                      color: "var(--muted2)",
                    }}
                  >
                    {w.year}
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

export default Works;
