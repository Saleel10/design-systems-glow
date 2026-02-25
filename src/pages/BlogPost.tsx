import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Share2, Twitter, Linkedin, LinkIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { blogPosts } from "@/data/blogPosts";
import { toast } from "@/hooks/use-toast";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: "Link copied!", description: "The article link has been copied to your clipboard." });
  };

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
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-3 block">{post.category}</span>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8">
              <span className="flex items-center gap-2"><Calendar size={14} /> {post.date}</span>
              <span className="flex items-center gap-2"><Clock size={14} /> {post.readTime} read</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="container max-w-3xl mb-12">
        <div className="h-48 md:h-72 rounded-2xl bg-gradient-to-br from-secondary/20 to-primary/20" />
      </div>

      {/* Content */}
      <Section className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">{post.content.intro}</p>

          {post.content.sections.map((section, i) => (
            <div key={i} className="mb-10">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">{section.heading}</h2>
              {section.body.split("\n\n").map((para, j) => (
                <p key={j} className="text-muted-foreground leading-relaxed mb-4">{para}</p>
              ))}
            </div>
          ))}

          <div className="glass-card rounded-xl p-6 mb-10">
            <p className="text-lg text-foreground leading-relaxed font-medium italic">{post.content.conclusion}</p>
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
