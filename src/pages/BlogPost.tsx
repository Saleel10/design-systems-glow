import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Share2, Twitter, Linkedin, LinkIcon, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  image_url: string;
  created_at: string;
  categories: { name: string } | null;
};

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("blogs")
        .select(`
          *,
          categories(name)
        `)
        .eq("slug", slug)
        .single();
      
      if (data) {
        setPost(data);
      }
      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: "Link copied!", description: "The article link has been copied to your clipboard." });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-primary hover:underline">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  // Rough estimation of read time
  const getReadTime = (content: string) => {
    if (!content) return "1 min read";
    const textContent = content.replace(/<[^>]*>?/gm, '');
    const words = textContent.trim().split(/\s+/).length;
    const time = Math.ceil(words / 200);
    return `${time} min read`;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-8">
        <div className="container max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft size={16} /> Back to Blog
            </Link>
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-3 block">
              {post.categories?.name || "Uncategorized"}
            </span>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8">
              <span className="flex items-center gap-2"><Calendar size={14} /> {formatDate(post.created_at)}</span>
              <span className="flex items-center gap-2"><Clock size={14} /> {getReadTime(post.content)}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="container max-w-3xl mb-12">
        {post.image_url ? (
          <div className="h-48 md:h-96 rounded-2xl relative overflow-hidden">
            <img src={post.image_url} alt={post.title} className="object-cover w-full h-full" />
          </div>
        ) : (
          <div className="h-48 md:h-72 rounded-2xl bg-gradient-to-br from-secondary/20 to-primary/20" />
        )}
      </div>

      {/* Content */}
      <Section className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
          
          <div className="mb-10 text-lg text-muted-foreground leading-relaxed prose prose-invert max-w-none prose-headings:font-heading prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-xl prose-ul:list-disc prose-ul:ml-6 prose-ol:list-decimal prose-ol:ml-6 prose-li:marker:text-primary">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          {/* Share */}
          <div className="flex items-center gap-4 pt-8 border-t border-border">
            <span className="text-sm text-muted-foreground flex items-center gap-2"><Share2 size={14} /> Share this article</span>
            <button onClick={handleCopyLink} className="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:bg-primary/10 transition-colors">
              <LinkIcon size={14} className="text-muted-foreground" />
            </button>
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:bg-primary/10 transition-colors">
              <Twitter size={14} className="text-muted-foreground" />
            </a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:bg-primary/10 transition-colors">
              <Linkedin size={14} className="text-muted-foreground" />
            </a>
          </div>
        </motion.div>
      </Section>

      <Footer />
    </div>
  );
};

export default BlogPost;
