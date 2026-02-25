import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { blogPosts } from "@/data/blogPosts";

const Blog = () => {
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
                className="glass-card glass-card-hover rounded-2xl overflow-hidden group cursor-pointer transition-all block"
              >
                <div className="h-48 bg-gradient-to-br from-secondary/20 to-primary/20" />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs text-primary font-medium">{post.category}</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock size={12} /> {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground leading-snug mb-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
                  <span className="mt-4 text-sm text-primary font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default Blog;
