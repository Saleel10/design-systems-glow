import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { supabase } from "@/lib/supabase";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  image_url: string;
  created_at: string;
  categories: { name: string } | null;
};

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    // Fetch categories
    const { data: catsData } = await supabase
      .from("categories")
      .select("name")
      .eq("type", "blog");

    setLoading(true);
    const { data, error } = await supabase
      .from("blogs")
      .select(`
        *,
        categories(name)
      `)
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (data) {
      setBlogPosts(data);
    }
    setLoading(false);
  };

  // Rough estimation of read time
  const getReadTime = (content: string) => {
    if (!content) return "1 min read";
    const textContent = content.replace(/<[^>]*>?/gm, '');
    const words = textContent.trim().split(/\s+/).length;
    const time = Math.ceil(words / 200); // 200 words per min
    return `${time} min read`;
  };

  const getExcerpt = (content: string) => {
    if (!content) return "";
    let textContent = content.replace(/<[^>]*>?/gm, '');
    textContent = textContent.replace(/!?\[([^\]]+)\]\([^)]+\)/g, '$1'); // links/images
    textContent = textContent.replace(/^[#]+\s+/gm, ''); // headings
    textContent = textContent.replace(/([*_~`]+)(.*?)\1/g, '$2'); // bold/italic/code
    textContent = textContent.replace(/[*_~`]/g, ''); // leftover markers
    textContent = textContent.replace(/^[>*-]\s+/gm, ''); // quotes/lists
    textContent = textContent.replace(/\s+/g, ' ').trim(); // clean whitespace
    return textContent.length > 120 ? textContent.substring(0, 120) + "..." : textContent;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-3 block">Blog</span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground leading-tight max-w-3xl">
              Thoughts & <span className="gradient-text">Insights</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <Section>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="glass-card glass-card-hover rounded-2xl overflow-hidden group cursor-pointer transition-all block h-full flex flex-col"
                >
                  {post.image_url ? (
                    <div className="h-48 relative">
                      <img src={post.image_url} alt={post.title} className="object-cover w-full h-full opacity-90 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-secondary/20 to-primary/20" />
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs text-primary font-medium">{post.categories?.name || "Uncategorized"}</span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock size={12} /> {getReadTime(post.content)}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-foreground leading-snug mb-2">{post.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{getExcerpt(post.content)}</p>
                    <span className="mt-4 text-sm text-primary font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read More <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
        
        {!loading && blogPosts.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No published blog posts yet.
          </div>
        )}
      </Section>

      <Footer />
    </div>
  );
};

export default Blog;
