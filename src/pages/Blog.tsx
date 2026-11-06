import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageContainer from "@/components/PageContainer";
import SEO from "@/components/SEO";
import { POSTS } from "@/data/portfolioData";
import { getSyncedBlogs, DEFAULT_BLOGS, OBSOLETE_BLOG_SLUGS } from "@/lib/portfolioDataSync";

const Blog = () => {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const [allPosts, setAllPosts] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("admin_blogs");
        if (stored) {
          const list = JSON.parse(stored);
          if (Array.isArray(list) && list.length > 0) {
            return list
              .filter((b: any) => {
                const s = (b.slug || "").toLowerCase().trim();
                const id = (b.id || "").toLowerCase().trim();
                return b.published !== false && !OBSOLETE_BLOG_SLUGS.has(s) && !OBSOLETE_BLOG_SLUGS.has(id);
              })
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
          }
        }
      } catch {
        // Fall back to POSTS
      }
    }
    return POSTS;
  });

  const handleImageError = (slug: string) => {
    setFailedImages((prev) => ({ ...prev, [slug]: true }));
  };

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

      <main className="max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-12 pt-8 sm:pt-12 pb-24">
        <div className="font-heading text-xs tracking-[0.14em] uppercase text-[#5cb847] hover:text-[#76d65e] transition-colors font-semibold">
          Blog
        </div>

        <h1 className="font-heading font-semibold text-4xl sm:text-6xl md:text-7xl lg:text-[76px] leading-[1.05] tracking-tight mt-3 text-[var(--ink)]">
          Notes on{" "}
          <span className="font-serif-italic brand-gradient-text">
            design.
          </span>
        </h1>

        <p className="mt-4 sm:mt-5 max-w-xl text-base sm:text-lg text-[var(--muted)] leading-relaxed">
          Thoughts on branding, systems, and building things people connect with.
        </p>

        {/* Featured Post */}
        {featured && (
          <Link
            to={`/blog/${featured.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 mt-8 sm:mt-14 items-center no-underline text-inherit p-4 sm:p-6 lg:p-7 rounded-[24px] sm:rounded-[32px] border border-[var(--line)] bg-[var(--card)]/40 hover:border-[#5cb847]/40 hover:bg-[var(--card)]/80 transition-all duration-300"
          >
            <div className="lg:col-span-7 relative w-full aspect-[16/9] rounded-[18px] sm:rounded-[24px] overflow-hidden bg-[var(--soft)] border border-[var(--line)] flex items-center justify-center shadow-lg group-hover:border-[#5cb847]/40 transition-colors">
              {featured.image_url && !failedImages[featured.slug] ? (
                <img
                  src={featured.image_url}
                  alt={featured.title}
                  onError={() => handleImageError(featured.slug)}
                  className="w-full h-full object-cover group-hover:scale-[1.015] transition-transform duration-500"
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(19,128,111,0.12)_0%,transparent_70%)]" />
                  <div className="font-heading text-xs uppercase tracking-wider text-[var(--accent)] bg-[var(--card)] px-4 py-2 rounded-full border border-[var(--line)] font-medium">
                    Featured Article
                  </div>
                </>
              )}
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="font-heading text-xs text-[var(--muted2)] flex items-center gap-2">
                <span className="text-[#5cb847] font-semibold">Featured</span>
                <span>·</span>
                <span>{featured.cat}</span>
                <span>·</span>
                <span>{featured.read}</span>
              </div>

              <h2 className="font-heading font-semibold text-2xl sm:text-3xl lg:text-[34px] leading-tight mt-3 text-[var(--ink)] group-hover:text-primary transition-colors tracking-tight">
                {featured.title}
              </h2>

              <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed mt-3 line-clamp-3">
                {featured.ex}
              </p>

              <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-[var(--line)] bg-[var(--card)] text-xs sm:text-sm font-medium text-[var(--ink)] shadow-sm group-hover:border-[#5cb847] group-hover:text-[#5cb847] group-hover:bg-[#5cb847]/10 group-hover:shadow-[0_0_16px_rgba(92,184,71,0.25)] group-hover:scale-[1.02] transition-all duration-200 w-fit mt-4 sm:mt-5">
                <span>Read article</span>
                <span className="text-base leading-none">→</span>
              </div>
            </div>
          </Link>
        )}

        {/* Post Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-[var(--line)]">
          {restPosts.map((p) => (
            <Link
              key={p.slug}
              to={`/blog/${p.slug}`}
              className="group flex flex-col gap-3.5 no-underline text-inherit p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl border border-[var(--line)] bg-[var(--card)]/30 hover:border-[#5cb847]/40 hover:bg-[var(--card)]/60 transition-all duration-300"
            >
              <div className="relative w-full aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden bg-[var(--soft)] border border-[var(--line)] flex items-center justify-center shadow-sm">
                {p.image_url && !failedImages[p.slug] ? (
                  <img
                    src={p.image_url}
                    alt={p.title}
                    onError={() => handleImageError(p.slug)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(19,128,111,0.08)_0%,transparent_70%)]" />
                    <span className="font-heading text-xs uppercase tracking-wider text-[var(--muted2)] bg-[var(--card)] px-3 py-1.5 rounded-full border border-[var(--line)] font-medium">
                      {p.cat}
                    </span>
                  </>
                )}
              </div>

              <div className="flex flex-col gap-2 p-1">
                <div className="font-heading text-xs text-[var(--muted2)] flex items-center gap-1.5">
                  <span className="text-[#5cb847] font-semibold">{p.cat}</span>
                  <span>·</span>
                  <span>{p.read}</span>
                </div>

                <h3 className="font-heading font-medium text-lg sm:text-xl leading-snug tracking-tight text-[var(--ink)] group-hover:text-[#5cb847] transition-colors line-clamp-2">
                  {p.title}
                </h3>

                <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed line-clamp-2 mt-0.5">
                  {p.ex}
                </p>

                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[var(--line)] bg-[var(--card)] text-xs font-medium text-[var(--ink)] shadow-sm group-hover:border-[#5cb847] group-hover:text-[#5cb847] group-hover:bg-[#5cb847]/10 group-hover:shadow-[0_0_14px_rgba(92,184,71,0.25)] group-hover:scale-[1.02] transition-all duration-200 w-fit mt-2">
                  <span>Read article</span>
                  <span className="text-sm leading-none">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </PageContainer>
  );
};

export default Blog;
