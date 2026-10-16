import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ImageIcon } from "lucide-react";
import PageContainer from "@/components/PageContainer";
import SEO from "@/components/SEO";
import { supabase } from "@/lib/supabase";
import { WORKS, CASES } from "@/data/portfolioData";

interface WorkProjectData {
  title: string;
  category: string;
  heroPlaceholder?: string;
  heroImage?: string;
  overview: string;
  problem: string;
  tools: string[];
  client: string;
  year: string;
  insights: string[];
  steps: {
    number: string;
    title: string;
    desc: string;
  }[];
  outputs: {
    title: string;
    type: string;
    image_url?: string;
  }[];
}

const DEFAULT_TAXVERSE: WorkProjectData = {
  title: "Taxverse",
  category: "BRANDING • BRAND IDENTITY",
  heroPlaceholder: "Project hero image",
  overview:
    "A complete visual identity for Taxverse — built from positioning and research into a logo, colour, type and asset system that works across every touchpoint.",
  problem:
    "The brand lacked a consistent visual voice. Assets looked different on every platform, weakening recognition and trust.",
  tools: ["Illustrator", "Photoshop", "Figma"],
  client: "Taxverse",
  year: "2025",
  insights: [
    "Competitors in the category look nearly identical — there was room to stand out.",
    "Customers associated the brand with reliability, but nothing visual expressed it.",
    "The internal team needed templates they could use without a designer.",
  ],
  steps: [
    {
      number: "Step 01",
      title: "Discover",
      desc: "Brief, research and audit of existing material and competitors.",
    },
    {
      number: "Step 02",
      title: "Define",
      desc: "Positioning, goals and design direction agreed with the client.",
    },
    {
      number: "Step 03",
      title: "Design",
      desc: "Concepts explored and refined through feedback rounds.",
    },
    {
      number: "Step 04",
      title: "Deliver",
      desc: "Final files, guidelines and handoff.",
    },
  ],
  outputs: [
    { title: "Logo system", type: "Identity" },
    { title: "Brand guidelines", type: "Document" },
    { title: "Stationery & collateral", type: "Print" },
    { title: "Social media kit", type: "Digital" },
  ],
};

const PROJECT_DICTIONARY: Record<string, WorkProjectData> = {
  taxverse: DEFAULT_TAXVERSE,
  trevio: {
    title: "Trevio",
    category: "PRODUCT DESIGN • UI/UX & DESIGN SYSTEM",
    heroPlaceholder: "Trevio app screens and product hero",
    overview:
      "A fast, dependable booking experience and multi-platform design system for travel and hospitality management.",
    problem:
      "Legacy booking funnels suffered high drop-off rates on mobile with inconsistent form controls across checkout.",
    tools: ["Figma", "FigJam", "Miro", "Tokens Studio"],
    client: "Trevio",
    year: "2025",
    insights: [
      "Fewer steps and upfront pricing transparency increased booking completion by 34%.",
      "Mobile users prioritized rapid date selection over extraneous visual media.",
      "Reusable design system components slashed engineering handover time in half.",
    ],
    steps: [
      {
        number: "Step 01",
        title: "Discover",
        desc: "User interviews, funnel audit, and heat map analytics across booking stages.",
      },
      {
        number: "Step 02",
        title: "Define",
        desc: "Information architecture simplification and streamlined checkout user flows.",
      },
      {
        number: "Step 03",
        title: "Design",
        desc: "High-fidelity wireframes, interactive mobile prototypes, and accessibility audits.",
      },
      {
        number: "Step 04",
        title: "Deliver",
        desc: "Tokenized design system in Figma and verified developer handover specs.",
      },
    ],
    outputs: [
      { title: "Mobile app UI", type: "Product" },
      { title: "Design system", type: "Figma Library" },
      { title: "Checkout flow", type: "Prototype" },
      { title: "Web dashboard", type: "Responsive Web" },
    ],
  },
  shad: {
    title: "Shad Creative Education",
    category: "BRANDING • VISUAL SYSTEM",
    heroPlaceholder: "Shad identity system showcase",
    overview:
      "A modern, vibrant visual system for a creative education institute inspiring the next generation of designers.",
    problem:
      "The institution lacked a distinctive campus and digital identity that resonated with prospective creative students.",
    tools: ["Illustrator", "Photoshop", "InDesign", "Figma"],
    client: "Shad Education",
    year: "2024",
    insights: [
      "Dynamic geometric symbols resonated strongly with young creative applicants.",
      "Faculty and staff required accessible modular templates for course announcements.",
      "Unified stationery and certificate design elevated graduation prestige.",
    ],
    steps: [
      {
        number: "Step 01",
        title: "Discover",
        desc: "Student surveys, stakeholder discovery sessions, and educational benchmarking.",
      },
      {
        number: "Step 02",
        title: "Define",
        desc: "Core brand values: clarity, creativity, and structured growth.",
      },
      {
        number: "Step 03",
        title: "Design",
        desc: "Exploration of modular typography, geometric marks, and vibrant palettes.",
      },
      {
        number: "Step 04",
        title: "Deliver",
        desc: "Brand guidelines book, print collateral, campus signage, and social kit.",
      },
    ],
    outputs: [
      { title: "Identity & mark", type: "Identity" },
      { title: "Curriculum guides", type: "Print" },
      { title: "Campus signage", type: "Environmental" },
      { title: "Social media templates", type: "Digital" },
    ],
  },
};

export default function WorkDetail() {
  const { slug, id } = useParams<{ slug?: string; id?: string }>();
  const [project, setProject] = useState<WorkProjectData>(DEFAULT_TAXVERSE);

  useEffect(() => {
    const key = (slug || id || "").toLowerCase();

    const fetchWorkFromDb = async () => {
      try {
        const { data: work } = await supabase
          .from("works")
          .select("*, categories(name)")
          .or(`slug.eq.${key},id.eq.${key}`)
          .maybeSingle();

        if (work) {
          const details = work.details || {};
          const toolsList = Array.isArray(details.tools)
            ? details.tools
            : typeof details.tools === "string"
            ? details.tools.split(",").map((s: string) => s.trim()).filter(Boolean)
            : ["Illustrator", "Photoshop", "Figma"];

          const insightsList = Array.isArray(details.insights)
            ? details.insights.map((item: any) => typeof item === "string" ? item : item.text || "").filter(Boolean)
            : DEFAULT_TAXVERSE.insights;

          const stepsList = Array.isArray(details.steps)
            ? details.steps.map((st: any, i: number) => ({
                number: st.number || `Step 0${i + 1}`,
                title: st.title || "",
                desc: st.desc || st.description || "",
              }))
            : DEFAULT_TAXVERSE.steps;

          const outputsList = Array.isArray(details.outputs)
            ? details.outputs.map((out: any) => ({
                title: out.title || "Output",
                type: out.type || "Design",
                image_url: out.image_url || "",
              }))
            : DEFAULT_TAXVERSE.outputs;

          setProject({
            title: work.title,
            category: work.categories?.name
              ? `${work.categories.name.toUpperCase()} • BRAND IDENTITY`
              : "BRANDING • BRAND IDENTITY",
            heroPlaceholder: `${work.title} showcase`,
            heroImage: work.image_url || undefined,
            overview: details.overview || work.description || DEFAULT_TAXVERSE.overview,
            problem: details.problem || DEFAULT_TAXVERSE.problem,
            tools: toolsList.length > 0 ? toolsList : DEFAULT_TAXVERSE.tools,
            client: details.client || work.title,
            year: details.year || "2025",
            insights: insightsList.length > 0 ? insightsList : DEFAULT_TAXVERSE.insights,
            steps: stepsList.length > 0 ? stepsList : DEFAULT_TAXVERSE.steps,
            outputs: outputsList.length > 0 ? outputsList : DEFAULT_TAXVERSE.outputs,
          });
          return;
        }
      } catch (e) {
        // Fallback below
      }

      // Check project dictionary
      if (PROJECT_DICTIONARY[key]) {
        setProject(PROJECT_DICTIONARY[key]);
        return;
      }

      // Check WORKS or CASES
      const workItem = WORKS.find((w) => w.slug === slug || w.id === slug);
      const caseItem = CASES.find((c) => c.id === slug);

      if (workItem || caseItem) {
        const title = workItem?.title || caseItem?.client || "Selected Work";
        const cat = workItem?.cat ? `${workItem.cat.toUpperCase()} • ${workItem.cta?.toUpperCase() || "IDENTITY"}` : "BRANDING • BRAND IDENTITY";
        const desc = caseItem?.overview || workItem?.ph || DEFAULT_TAXVERSE.overview;
        const prob = caseItem?.challenge || DEFAULT_TAXVERSE.problem;
        const client = caseItem?.client || workItem?.title || "Client";
        const year = caseItem?.year || workItem?.year || "2025";

        setProject({
          title,
          category: cat,
          heroPlaceholder: `${title} showcase`,
          overview: desc,
          problem: prob,
          tools: ["Illustrator", "Photoshop", "Figma"],
          client,
          year,
          insights: caseItem?.outcome || DEFAULT_TAXVERSE.insights,
          steps: DEFAULT_TAXVERSE.steps,
          outputs: DEFAULT_TAXVERSE.outputs,
        });
        return;
      }

      // Default to Taxverse matching image 3
      setProject(DEFAULT_TAXVERSE);
    };

    fetchWorkFromDb();
  }, [slug, id]);

  return (
    <PageContainer showCta={false}>
      <SEO
        title={`${project.title} — Work Explanation | Muhammed Saleel CP`}
        description={project.overview}
        url={`https://saleeldesigns.com/works/${slug || "taxverse"}`}
      />

      <article className="max-w-5xl mx-auto w-full px-6 md:px-12 pt-8 sm:pt-14 pb-28">
        {/* Navigation link: ← BACK TO WORKS */}
        <Link
          to="/works"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[var(--muted)] hover:text-[var(--ink)] transition-colors mb-6 font-semibold"
        >
          <ArrowLeft size={14} />
          <span>Back to works</span>
        </Link>

        {/* Category: BRANDING • BRAND IDENTITY in green */}
        <div className="font-heading text-xs tracking-[0.14em] uppercase text-[#5cb847] font-semibold mb-3">
          {project.category}
        </div>

        {/* Project Title */}
        <h1 className="font-heading font-semibold text-5xl sm:text-7xl md:text-8xl tracking-tight text-[var(--ink)] mb-10">
          {project.title}
        </h1>

        {/* Hero showcase container */}
        {project.heroImage ? (
          <div className="relative w-full aspect-[16/9] sm:aspect-[2.1/1] rounded-[28px] sm:rounded-[36px] border border-[var(--line)] overflow-hidden shadow-sm mb-16">
            <img src={project.heroImage} alt={project.title} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="relative w-full aspect-[16/9] sm:aspect-[2.1/1] rounded-[28px] sm:rounded-[36px] border border-dashed border-[var(--line2)] bg-[var(--card)]/40 flex flex-col items-center justify-center p-8 text-center group hover:border-[#5cb847]/50 transition-colors shadow-sm mb-16 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(92,184,71,0.06),transparent_70%)] pointer-events-none" />

            <div className="w-12 h-12 rounded-2xl bg-[var(--soft)] border border-[var(--line)] flex items-center justify-center text-[var(--muted2)] mb-2 group-hover:scale-105 transition-transform">
              <ImageIcon className="w-5 h-5 stroke-[1.5]" />
            </div>
            <span className="text-sm font-medium text-[var(--ink)]">Project hero image</span>
            <span className="text-xs text-[var(--muted2)] mt-0.5 underline cursor-pointer hover:text-[var(--accent)]">
              or browse files
            </span>
          </div>
        )}

        {/* Project Overview Section */}
        <section className="mb-20">
          <h2 className="font-heading font-semibold text-3xl sm:text-4xl text-[var(--ink)] tracking-tight mb-8">
            Project{" "}
            <span className="font-serif-italic font-medium text-[#5cb847]">
              overview
            </span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left description + The Problem callout */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <p className="text-base sm:text-[17px] leading-relaxed text-[var(--body)]">
                {project.overview}
              </p>

              {/* The problem callout box */}
              <div className="p-6 sm:p-7 rounded-[22px] bg-[#142318] border border-[#5cb847]/35 shadow-[0_10px_30px_-10px_rgba(92,184,71,0.15)]">
                <div className="text-sm font-semibold text-[#5cb847] mb-1.5 flex items-center gap-2">
                  <span>The problem</span>
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-[#c7e9ce]">
                  {project.problem}
                </p>
              </div>
            </div>

            {/* Right Meta Column: Tools used + Client/Year */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              {/* Tools used card */}
              <div className="bg-[var(--card)] border border-[var(--line)] rounded-[22px] p-5 sm:p-6 shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-wider text-[var(--muted2)] mb-3">
                  Tools used
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((t) => (
                    <span
                      key={t}
                      className="px-3.5 py-1.5 rounded-full bg-[var(--soft)] border border-[var(--line)] text-xs font-medium text-[var(--ink)] hover:border-[#5cb847]/40 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Client & Year card */}
              <div className="bg-[var(--card)] border border-[var(--line)] rounded-[22px] p-5 sm:p-6 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted2)]">
                    Client
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-[var(--ink)] mt-0.5">
                    {project.client}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted2)]">
                    Year
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-[var(--ink)] mt-0.5">
                    {project.year}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Research insights Section */}
        <section className="mb-20">
          <h2 className="font-heading font-semibold text-3xl sm:text-4xl text-[var(--ink)] tracking-tight mb-8">
            Research{" "}
            <span className="font-serif-italic font-medium text-[#5cb847]">
              insights
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {project.insights.map((insight, idx) => (
              <div
                key={idx}
                className="bg-[var(--card)] border border-[var(--line)] rounded-[22px] p-6 shadow-sm flex items-start gap-4 hover:border-[var(--line2)] transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-[#5cb847] text-zinc-950 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_12px_rgba(92,184,71,0.35)]">
                  {idx + 1}
                </div>
                <p className="text-sm sm:text-[14.5px] leading-relaxed text-[var(--body)]">
                  {insight}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Design process Section */}
        <section className="mb-20">
          <h2 className="font-heading font-semibold text-3xl sm:text-4xl text-[var(--ink)] tracking-tight mb-8">
            Design{" "}
            <span className="font-serif-italic font-medium text-[#5cb847]">
              process
            </span>
          </h2>

          <div className="relative pl-6 sm:pl-8 border-l border-[var(--line2)] space-y-8">
            {project.steps.map((st, i) => (
              <div key={i} className="relative group">
                {/* Green marker dot on vertical line */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#142318] border-2 border-[#5cb847] flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5cb847]" />
                </div>

                <div className="text-xs font-semibold uppercase tracking-wider text-[#5cb847] mb-1">
                  {st.number}
                </div>
                <h3 className="font-heading font-semibold text-lg sm:text-xl text-[var(--ink)] tracking-tight mb-1">
                  {st.title}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-[var(--muted)] max-w-2xl">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Final outputs Section */}
        <section className="mb-10">
          <h2 className="font-heading font-semibold text-3xl sm:text-4xl text-[var(--ink)] tracking-tight mb-8">
            Final{" "}
            <span className="font-serif-italic font-medium text-[#5cb847]">
              outputs
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.outputs.map((out, oi) => (
              <div
                key={oi}
                className="group bg-[var(--card)] border border-[var(--line)] rounded-[22px] p-5 shadow-sm hover:border-[var(--line2)] hover:-translate-y-1 transition-all"
              >
                {/* Output image or placeholder */}
                <div className="w-full aspect-[4/3] rounded-[16px] border border-dashed border-[var(--line2)] bg-[var(--soft)]/50 flex flex-col items-center justify-center p-4 text-center mb-4 group-hover:border-[#5cb847]/50 transition-colors overflow-hidden">
                  {out.image_url ? (
                    <img src={out.image_url} alt={out.title} className="w-full h-full object-cover rounded-[12px]" />
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded-xl bg-[var(--card)] border border-[var(--line)] flex items-center justify-center text-[var(--muted2)] mb-2 group-hover:scale-105 transition-transform">
                        <ImageIcon className="w-5 h-5 stroke-[1.4]" />
                      </div>
                      <span className="text-xs font-medium text-[var(--ink)]">{out.title}</span>
                      <span className="text-[10px] text-[var(--muted2)] underline mt-0.5">
                        or browse files
                      </span>
                    </>
                  )}
                </div>

                {/* Bottom title */}
                <div className="flex items-center justify-between text-xs sm:text-sm pt-1">
                  <span className="font-semibold text-[var(--ink)]">{out.title}</span>
                  {out.type ? <span className="text-xs text-[var(--muted2)] font-medium">{out.type}</span> : null}
                </div>
              </div>
            ))}
          </div>
        </section>
      </article>
    </PageContainer>
  );
}
