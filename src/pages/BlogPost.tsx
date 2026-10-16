import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, ImageIcon } from "lucide-react";
import PageContainer from "@/components/PageContainer";
import SEO from "@/components/SEO";
import { POSTS } from "@/data/portfolioData";
import { blogPosts as fallbackBlogs } from "@/data/blogPosts";
import { supabase } from "@/lib/supabase";
import profileDark from "@/assets/profile-dark.png";

interface PostData {
  title: string;
  slug: string;
  cat: string;
  read: string;
  content: string;
  subtitle?: string;
  date?: string;
  coverImage?: string;
  tags?: string[];
}

const FEATURED_WHY_SYSTEM: PostData = {
  slug: "why-your-brand-needs-a-system",
  title: "Why your brand needs a system, not just a logo",
  subtitle:
    "A logo is a starting point. The real value is in the rules that make every touchpoint feel like the same brand.",
  cat: "Branding",
  read: "5 min read",
  date: "Sep 2026",
  tags: ["#branding", "#design-systems", "#strategy"],
  content: `Most businesses start with a logo and stop there. But a logo on its own can't carry a brand across a website, a social feed, packaging and a pitch deck. What carries it is the system around the logo.

### A logo is a signature, not a language

A logo identifies you. A brand system lets you speak — consistently — in every place your customers meet you. Colour, typography, layout, imagery and tone are the vocabulary.

Without those rules, every new asset is designed from scratch, and small differences pile up until the brand feels like five different companies.

### What a brand system actually includes

At minimum: a logo suite, a colour palette with clear usage, a type hierarchy, spacing and layout principles, and a set of ready-made templates for the things you make most often.

The goal isn't a thick PDF nobody reads. It's a toolkit that makes the right choice the easy choice.

### Why it pays off

Consistency builds recognition, and recognition builds trust. A system also saves time and money: your team stops reinventing layouts and starts shipping.

> **Consistency isn't boring. It's what makes a brand recognisable at a glance.**

If your brand feels scattered, the fix is rarely a new logo. It's usually a system that ties everything you already have together.`,
};

const RELATED_POSTS = [
  {
    slug: "designing-for-clarity",
    title: "Designing for clarity: lessons from 800+ projects",
    cat: "Process",
    read: "5 min read",
  },
  {
    slug: "building-your-first-design-system-in-figma",
    title: "Building your first design system in Figma",
    cat: "Design systems",
    read: "8 min read",
  },
  {
    slug: "landing-pages-that-convert",
    title: "Landing pages that convert: structure before style",
    cat: "Web",
    read: "4 min read",
  },
];

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);

      // Check localStorage for admin updates first
      const stored = typeof window !== 'undefined' ? localStorage.getItem("admin_blogs") : null;
      if (stored) {
        try {
          const list = JSON.parse(stored);
          const found = list.find((b: any) => b.slug === slug || b.id === slug || (!slug && b.slug === "why-your-brand-needs-a-system"));
          if (found) {
            const rawTags = found.tags;
            const parsedTags = Array.isArray(rawTags)
              ? rawTags
              : typeof rawTags === "string"
              ? rawTags.split(",").map((t: string) => t.trim()).filter(Boolean)
              : ["#branding", "#design-systems", "#strategy"];

            // Format markdown if content is structured
            let formattedContent = "";
            if (typeof found.content === "string") {
              formattedContent = found.content;
            } else if (found.content && typeof found.content === "object") {
              const c = found.content;
              if (c.intro) formattedContent += `${c.intro}\n\n`;
              if (Array.isArray(c.sections)) {
                c.sections.forEach((sec: any) => {
                  if (sec.heading) formattedContent += `### ${sec.heading}\n\n`;
                  if (sec.body) formattedContent += `${sec.body}\n\n`;
                });
              }
              if (c.callout) {
                formattedContent += `> **${c.callout}**\n\n`;
              }
              if (c.conclusion) {
                formattedContent += `${c.conclusion}\n\n`;
              }
            }

            setPost({
              title: found.title,
              slug: found.slug,
              cat: found.categories?.name || found.category || "Branding",
              read: found.read_time || "5 min read",
              subtitle: found.subtitle || found.excerpt || "",
              date: found.date || "Sep 2026",
              coverImage: found.image_url || "",
              tags: parsedTags,
              content: formattedContent || FEATURED_WHY_SYSTEM.content,
            });
            setLoading(false);
            return;
          }
        } catch (e) {
          console.error(e);
        }
      }

      // If user is viewing why-your-brand-needs-a-system or empty slug
      if (!slug || slug === "why-your-brand-needs-a-system" || slug === "why-brand-needs-system") {
        setPost(FEATURED_WHY_SYSTEM);
        setLoading(false);
        return;
      }

      try {
        const { data } = await supabase
          .from("blogs")
          .select("*, categories(name)")
          .eq("slug", slug)
          .single();

        if (data) {
          setPost({
            title: data.title,
            slug: data.slug,
            cat: data.categories?.name || "Design",
            read: "5 min read",
            content: data.content,
            subtitle: data.excerpt || "",
            date: data.created_at ? new Date(data.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Sep 2026",
            tags: ["#design", "#systems", "#creative"],
          });
          setLoading(false);
          return;
        }
      } catch {
        // Fall back to local
      }

      // Check fallbackBlogs
      const fallback = fallbackBlogs.find((b) => b.slug === slug);
      if (fallback) {
        setPost({
          title: fallback.title,
          slug: fallback.slug,
          cat: fallback.category,
          read: fallback.readTime,
          subtitle: fallback.excerpt,
          date: fallback.date || "Sep 2026",
          tags: ["#branding", "#design-systems", "#strategy"],
          content: `${fallback.content.intro}\n\n${fallback.content.sections
            .map((s) => `### ${s.heading}\n\n${s.body}`)
            .join("\n\n")}\n\n> **Consistency isn't boring. It's what makes a brand recognisable at a glance.**\n\n${fallback.content.conclusion}`,
        });
        setLoading(false);
        return;
      }

      // Check POSTS from portfolioData
      const portfolioPost = POSTS.find((p) => p.slug === slug);
      if (portfolioPost) {
        setPost({
          title: portfolioPost.title,
          slug: portfolioPost.slug,
          cat: portfolioPost.cat,
          read: portfolioPost.read,
          subtitle: portfolioPost.ex,
          date: "Sep 2026",
          tags: ["#branding", "#design-systems", "#strategy"],
          content: `${portfolioPost.ex}\n\n### A logo is a signature, not a language\n\nA logo identifies you. A brand system lets you speak — consistently — in every place your customers meet you. Colour, typography, layout, imagery and tone are the vocabulary.\n\nWithout those rules, every new asset is designed from scratch, and small differences pile up until the brand feels like five different companies.\n\n### What a brand system actually includes\n\nAt minimum: a logo suite, a colour palette with clear usage, a type hierarchy, spacing and layout principles, and a set of ready-made templates for the things you make most often.\n\n### Why it pays off\n\nConsistency builds recognition, and recognition builds trust. A system also saves time and money: your team stops reinventing layouts and starts shipping.\n\n> **Consistency isn't boring. It's what makes a brand recognisable at a glance.**\n\nIf your brand feels scattered, the fix is rarely a new logo. It's usually a system that ties everything you already have together.`,
        });
        setLoading(false);
        return;
      }

      // Default fallback
      setPost(FEATURED_WHY_SYSTEM);
      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <PageContainer>
        <div className="py-32 text-center text-[var(--muted)]">Loading article...</div>
      </PageContainer>
    );
  }

  if (!post) {
    return (
      <PageContainer>
        <div className="py-32 text-center">
          <h1 className="text-3xl font-heading font-semibold text-[var(--ink)]">Article not found</h1>
          <Link to="/blog" className="mt-4 inline-block text-[var(--accent)] font-medium">
            ← Back to blog
          </Link>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer showCta={false}>
      <SEO
        title={`${post.title} | Muhammed Saleel CP`}
        description={post.subtitle || post.content.slice(0, 160)}
        url={`https://saleeldesigns.com/blog/${post.slug}`}
      />

      <article className="max-w-4xl mx-auto w-full px-6 md:px-12 pt-8 sm:pt-14 pb-20">
        {/* Back Link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--ink)] transition-colors mb-7"
        >
          <ArrowLeft size={15} />
          <span>Back to blog</span>
        </Link>

        {/* Category Pill & Read Time */}
        <div className="flex items-center gap-3 mb-5">
          <span className="px-3.5 py-1 rounded-full bg-[#1b3826] text-[#5cb847] text-xs font-semibold tracking-wide border border-[#5cb847]/20">
            {post.cat}
          </span>
          <span className="text-xs text-[var(--muted2)] font-medium">
            {post.date || "Sep 2026"} · {post.read}
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="font-heading font-semibold text-3xl sm:text-5xl md:text-[54px] leading-[1.1] tracking-tight text-[var(--ink)]">
          {post.title}
        </h1>

        {/* Subtitle */}
        {post.subtitle && (
          <p className="mt-4 text-base sm:text-lg text-[var(--muted)] leading-relaxed max-w-3xl">
            {post.subtitle}
          </p>
        )}

        {/* Author Bar */}
        <div className="flex items-center gap-3.5 py-6 mt-6 border-b border-[var(--line)]">
          <div className="w-11 h-11 rounded-full overflow-hidden bg-[var(--soft)] border border-[var(--line)] shrink-0 flex items-center justify-center">
            <img
              src={profileDark}
              alt="Muhammed Saleel CP"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div>
            <div className="text-sm font-semibold text-[var(--ink)] tracking-tight">
              Muhammed Saleel CP
            </div>
            <div className="text-xs text-[var(--muted)]">
              Creative &amp; UI/UX Designer
            </div>
          </div>
        </div>

        {/* Article Cover Image Container */}
        {post.coverImage ? (
          <div className="my-10 w-full aspect-[16/9] sm:aspect-[2/1] rounded-[24px] sm:rounded-[32px] overflow-hidden border border-[var(--line)] bg-[var(--card)] shadow-lg">
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="my-10 w-full aspect-[16/9] sm:aspect-[2/1] rounded-[24px] sm:rounded-[32px] border border-dashed border-[var(--line2)] bg-[var(--card)]/40 flex flex-col items-center justify-center text-center p-8 group hover:border-[var(--accent)]/50 transition-colors">
            <div className="w-14 h-14 rounded-2xl bg-[var(--soft)] border border-[var(--line)] flex items-center justify-center text-[var(--muted2)] mb-3 group-hover:scale-105 transition-transform">
              <ImageIcon className="w-6 h-6 stroke-[1.4]" />
            </div>
            <span className="text-sm font-medium text-[var(--ink)]">Article cover image</span>
            <span className="text-xs text-[var(--muted2)] mt-1 underline cursor-pointer hover:text-[var(--accent)]">
              or browse files
            </span>
          </div>
        )}

        {/* Article Body Content */}
        <div className="prose-content text-[15px] sm:text-[16.5px] leading-[1.8] text-[var(--body)] space-y-6">
          <ReactMarkdown
            components={{
              h3: ({ node, ...props }) => (
                <h3
                  className="font-heading font-semibold text-2xl sm:text-[28px] text-[var(--ink)] tracking-tight mt-10 mb-4 pt-2"
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <p className="leading-[1.8] text-[var(--body)]" {...props} />
              ),
              blockquote: ({ node, ...props }) => (
                <div className="my-8 p-6 sm:p-7 rounded-[20px] bg-[#142318] border border-[#5cb847]/40 text-[#4ade80] shadow-[0_12px_32px_-12px_rgba(92,184,71,0.2)]">
                  <p className="text-base sm:text-lg font-medium leading-snug !m-0" {...props} />
                </div>
              ),
              ul: ({ node, ...props }) => (
                <ul className="space-y-2 pl-5 list-disc" {...props} />
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Hashtags Row */}
        {post.tags && (
          <div className="flex flex-wrap items-center gap-2 mt-12 pt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1.5 rounded-full bg-[var(--card)] border border-[var(--line)] text-xs font-medium text-[var(--muted)] hover:border-[var(--line2)] hover:text-[var(--ink)] transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Bottom Divider */}
        <div className="mt-14 pt-14 border-t border-[var(--line)]" />

        {/* Keep reading section */}
        <div className="mt-4">
          <h2 className="font-heading font-semibold text-3xl sm:text-4xl text-[var(--ink)] tracking-tight mb-8">
            Keep{" "}
            <span className="font-serif-italic font-medium text-[#5cb847]">
              reading
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {RELATED_POSTS.map((rel) => (
              <Link
                key={rel.slug}
                to={`/blog/${rel.slug}`}
                className="group flex flex-col bg-[var(--card)] border border-[var(--line)] rounded-[22px] p-4 sm:p-5 hover:border-[var(--line2)] hover:-translate-y-1 transition-all shadow-sm"
              >
                {/* Dashed Cover placeholder */}
                <div className="w-full aspect-[16/10] rounded-[16px] border border-dashed border-[var(--line2)] bg-[var(--soft)]/40 flex flex-col items-center justify-center text-center p-4 mb-4 group-hover:border-[var(--accent)]/50 transition-colors">
                  <ImageIcon className="w-5 h-5 stroke-[1.4] text-[var(--muted2)] mb-1" />
                  <span className="text-xs font-medium text-[var(--ink)]">Article cover</span>
                  <span className="text-[10px] text-[var(--muted2)] underline mt-0.5">
                    or browse files
                  </span>
                </div>

                <div className="text-[11px] font-medium text-[var(--muted2)] mb-2">
                  {rel.cat} · {rel.read}
                </div>
                <h3 className="font-heading font-semibold text-sm sm:text-base text-[var(--ink)] tracking-tight leading-snug group-hover:text-[var(--accent)] transition-colors">
                  {rel.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </PageContainer>
  );
}
