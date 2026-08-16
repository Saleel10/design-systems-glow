import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import Section from "../Section";
import SectionHeader from "../SectionHeader";
import { supabase } from "@/lib/supabase";

type Work = {
  id: string;
  title: string;
  slug: string;
  image_url: string;
  categories: { name: string };
};

const SelectedWorks = () => {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorks = async () => {
      const { data } = await supabase
        .from("works")
        .select(`
          id, title, slug, image_url,
          categories(name)
        `)
        .order("created_at", { ascending: false })
        .limit(4);

      if (data) {
        setWorks(data as any);
      }
      setLoading(false);
    };

    fetchWorks();
  }, []);

  return (
    <Section id="works">
      <SectionHeader label="Portfolio" title="Selected Works" description="A curated selection of projects that demonstrate strategic thinking and systematic design." />

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {works.map((work, i) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link
                to={`/works/${work.slug}`}
                className="group glass-card glass-card-hover rounded-2xl overflow-hidden cursor-pointer transition-all block"
              >
                {work.image_url ? (
                  <div className="h-56 md:h-72 w-full relative">
                    <img src={work.image_url} alt={work.title} className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>
                ) : (
                  <div className="h-56 md:h-72 bg-gradient-to-br from-secondary/20 to-primary/20 opacity-20 group-hover:opacity-30 transition-opacity" />
                )}
                <div className="p-6 flex items-start justify-between">
                  <div>
                    <span className="text-xs text-primary font-medium">{work.categories?.name || "Uncategorized"}</span>
                    <h3 className="font-heading text-xl font-semibold text-foreground mt-1">{work.title}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center group-hover:bg-primary transition-colors flex-shrink-0">
                    <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
          {works.length === 0 && (
            <div className="col-span-1 md:col-span-2 text-center py-10 text-muted-foreground">
              No works available yet.
            </div>
          )}
        </div>
      )}
    </Section>
  );
};

export default SelectedWorks;
