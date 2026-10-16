import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageContainer from "@/components/PageContainer";
import SEO from "@/components/SEO";
import { POSTS } from "@/data/portfolioData";
import { getSyncedBlogs, DEFAULT_BLOGS } from "@/lib/portfolioDataSync";

const Blog = () => {
  const [allPosts, setAllPosts] = useState(POSTS);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const list = await getSyncedBlogs();
        if (Array.isArray(list) && list.length > 0) {
          const formatted = list
            .filter((b: any) => b.published !== false)
            .map((b: any, i: number) => ({
              slug: b.slug,
              title: b.title,
              cat: b.categories?.name || b.cat || "Branding",
              read: b.read_time || b.read || "5 min read",
              ex:
                b.subtitle ||
                b.excerpt ||
                (typeof b.content === "string"
                  ? b.content.slice(0, 140)
                  : b.content?.intro || ""),
              img: `blog-${(i % 4) + 1}`,
              image_url: b.image_url,
            }));
          if (formatted.length > 0) {
            setAllPosts(formatted);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };

    loadBlogs();
    window.addEventListener("portfolio_data_updated", loadBlogs);
    return () => window.removeEventListener("portfolio_data_updated", loadBlogs);
  }, []);

  const featured = allPosts[0] || POSTS[0];
  const restPosts = allPosts.slice(1);

  return (
    <PageContainer>
      <SEO
        title="Notes on Design | Saleel Designs"
        description="Thoughts on branding, systems, and building things people connect with. Articles by Muhammed Saleel CP."
        url="https://saleeldesigns.com/blog"
      />

      <main style={{ padding: "40px clamp(20px,5vw,64px) 96px" }} className="max-w-7xl mx-auto w-full">
        <div className="font-heading text-xs tracking-[0.14em] uppercase text-[#5cb847] hover:text-[#76d65e] transition-colors font-semibold">
          Blog
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
          Notes on{" "}
          <span className="font-serif-italic brand-gradient-text">
            design.
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
          Thoughts on branding, systems, and building things people connect with.
        </p>

        {/* Featured Post */}
        {featured && (
          <Link
            to={`/blog/${featured.slug}`}
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
              gap: "28px",
              marginTop: "56px",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
            }}
            className="group"
          >
            <div
              style={{
                position: "relative",
                aspectRatio: "16/10",
                borderRadius: "24px",
                overflow: "hidden",
                background: "var(--soft)",
                border: "1px solid var(--line)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "30px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(ellipse at 50% 50%, rgba(19, 128, 111, 0.12) 0%, transparent 70%)",
                }}
              />
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "13px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  background: "var(--card)",
                  padding: "8px 16px",
                  borderRadius: "999px",
                  border: "1px solid var(--line)",
                }}
              >
                Featured Article
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "12px",
                  color: "var(--muted2)",
                }}
              >
                Featured · {featured.cat} · {featured.read}
              </div>

              <div
                style={{
                  fontWeight: 600,
                  fontSize: "clamp(32px, 3.4vw, 48px)",
                  lineHeight: 1.05,
                  marginTop: "14px",
                  letterSpacing: "-0.01em",
                  color: "var(--ink)",
                }}
                className="group-hover:text-primary transition-colors"
              >
                {featured.title}
              </div>

              <div
                style={{
                  fontSize: "16px",
                  lineHeight: 1.6,
                  color: "var(--muted)",
                  marginTop: "14px",
                }}
              >
                {featured.ex}
              </div>

              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--line)] bg-[var(--card)] text-sm font-medium text-[var(--ink)] shadow-sm group-hover:border-[#5cb847] group-hover:text-[#5cb847] group-hover:bg-[#5cb847]/10 group-hover:shadow-[0_0_16px_rgba(92,184,71,0.25)] group-hover:scale-[1.02] transition-all duration-200 w-fit mt-5">
                <span>Read article</span>
                <span className="text-base leading-none">→</span>
              </div>
            </div>
          </Link>
        )}

        {/* Post Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "28px 20px",
            marginTop: "64px",
            paddingTop: "40px",
            borderTop: "1px solid var(--line)",
          }}
        >
          {restPosts.map((p) => (
            <Link
              key={p.slug}
              to={`/blog/${p.slug}`}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                textDecoration: "none",
                color: "inherit",
              }}
              className="group"
            >
              <div
                style={{
                  position: "relative",
                  aspectRatio: "3/2",
                  borderRadius: "20px",
                  overflow: "hidden",
                  background: "var(--soft)",
                  border: "1px solid var(--line)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "24px",
                }}
                className="transition-transform duration-300 group-hover:scale-[1.01]"
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(circle at center, rgba(19, 128, 111, 0.08) 0%, transparent 70%)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--muted2)",
                    background: "var(--card)",
                    padding: "6px 12px",
                    borderRadius: "999px",
                  }}
                >
                  {p.cat}
                </span>
              </div>

              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "12px",
                  color: "var(--muted2)",
                }}
              >
                <span className="text-[#5cb847] font-medium group-hover:text-[#76d65e] transition-colors">{p.cat}</span> · {p.read}
              </div>

              <div
                style={{
                  fontSize: "20px",
                  fontWeight: 500,
                  lineHeight: 1.25,
                  letterSpacing: "-0.01em",
                  color: "var(--ink)",
                }}
                className="group-hover:text-[#5cb847] transition-colors"
              >
                {p.title}
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--line)] bg-[var(--card)] text-xs font-medium text-[var(--ink)] shadow-sm group-hover:border-[#5cb847] group-hover:text-[#5cb847] group-hover:bg-[#5cb847]/10 group-hover:shadow-[0_0_14px_rgba(92,184,71,0.25)] group-hover:scale-[1.02] transition-all duration-200 w-fit mt-2">
                <span>Read article</span>
                <span className="text-sm leading-none">→</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </PageContainer>
  );
};

export default Blog;
