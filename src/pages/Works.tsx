import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { supabase } from "@/lib/supabase";

type Work = {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_url: string;
  categories: { name: string };
};

const Works = () => {
  const [active, setActive] = useState("All");
  const [works, setWorks] = useState<Work[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorksAndCategories();
  }, []);

  const fetchWorksAndCategories = async () => {
    setLoading(true);
    // Fetch categories
    const { data: catsData } = await supabase
      .from("categories")
      .select("name")
      .eq("type", "work");
    if (catsData) {
      setCategories(["All", ...catsData.map(c => c.name)]);
    } else {
      setCategories(["All"]);
    }

    // Fetch works
    const { data: worksData } = await supabase
      .from("works")
      .select(`
        id, title, slug, description, image_url,
        categories(name)
      `)
      .order("created_at", { ascending: false });

    if (worksData) {
      setWorks(worksData as any);
    }
    setLoading(false);
  };

  const filtered = active === "All" 
    ? works 
    : works.filter((w) => w.categories?.name === active);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-3 block">Portfolio</span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground leading-tight max-w-3xl">
              Selected <span className="gradient-text">Works</span>
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
          <>
            <div className="flex flex-wrap gap-3 mb-12">
              {categories.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    active === f ? "glow-button text-primary-foreground" : "glass-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <Link
                    to={`/works/${project.slug}`}
                    className="group glass-card glass-card-hover rounded-2xl overflow-hidden cursor-pointer transition-all block"
                  >
                    {project.image_url ? (
                      <div className="h-56 md:h-72 w-full relative">
                        <img src={project.image_url} alt={project.title} className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ) : (
                      <div className="h-56 md:h-72 bg-gradient-to-br from-secondary/20 to-primary/20 opacity-20 group-hover:opacity-30 transition-opacity" />
                    )}
                    <div className="p-6 flex items-start justify-between">
                      <div>
                        <span className="text-xs text-primary font-medium">{project.categories?.name || "Uncategorized"}</span>
                        <h3 className="font-heading text-xl font-semibold text-foreground mt-1">{project.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{project.description}</p>
                      </div>
                      <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center group-hover:bg-primary transition-colors flex-shrink-0">
                        <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {filtered.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">
                No works found in this category.
              </div>
            )}
          </>
        )}
      </Section>

      <Footer />
    </div>
  );
};

export default Works;
