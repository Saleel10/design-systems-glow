import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Loader2, ChevronLeft, ChevronRight, X, ExternalLink, Images } from "lucide-react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { supabase } from "@/lib/supabase";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type WorkDetails = {
  overview?: string;
  tools?: string;
  problem?: string;
  insights?: { text: string }[];
  progress?: { title: string; description: string }[];
  screens?: { title: string; urls: string[] }[];
};

type Work = {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_url: string;
  categories: { name: string };
  details?: WorkDetails;
};

const WorkDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState<Work | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxState, setLightboxState] = useState<{ groupIndex: number; imageIndex: number } | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("works")
        .select(`
          *,
          categories(name)
        `)
        .eq("slug", slug)
        .single();
      
      if (data) {
        // Normalize schema just in case old { url } data exists
        const details = data.details || {};
        if (details.screens) {
          details.screens = details.screens.map((s: any) => ({
            title: s.title || "",
            urls: s.urls || (s.url ? [s.url] : [])
          }));
        }
        setProject({ ...data, details } as any);
      }
      setLoading(false);
    };

    fetchProject();
  }, [slug]);

  const openLightbox = (groupIndex: number, imageIndex: number = 0) => {
    setLightboxState({ groupIndex, imageIndex });
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxState(null);
    document.body.style.overflow = "auto";
  };

  const nextLightboxImage = () => {
    if (!project?.details?.screens || !lightboxState) return;
    const { groupIndex, imageIndex } = lightboxState;
    const currentGroup = project.details.screens[groupIndex];
    if (imageIndex === currentGroup.urls.length - 1) {
      setLightboxState({ groupIndex, imageIndex: 0 });
    } else {
      setLightboxState({ groupIndex, imageIndex: imageIndex + 1 });
    }
  };

  const prevLightboxImage = () => {
    if (!project?.details?.screens || !lightboxState) return;
    const { groupIndex, imageIndex } = lightboxState;
    const currentGroup = project.details.screens[groupIndex];
    if (imageIndex === 0) {
      setLightboxState({ groupIndex, imageIndex: currentGroup.urls.length - 1 });
    } else {
      setLightboxState({ groupIndex, imageIndex: imageIndex - 1 });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">Project Not Found</h1>
          <Link to="/works" className="text-primary hover:underline">← Back to Works</Link>
        </div>
      </div>
    );
  }

  const { details } = project;
  const toolsList = details?.tools ? details.tools.split(',').map(t => t.trim()).filter(Boolean) : [];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={`${project.title} | Saleeldesigns`} 
        description={project.description} 
        image={project.image_url} 
        url={`https://saleeldesigns.com/works/${project.slug}`} 
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/works" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft size={16} /> Back to Works
            </Link>
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-3 block">{project.categories?.name || "Uncategorized"}</span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground leading-tight max-w-4xl mb-6">
              {project.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Hero Mockup */}
      <div className="container mb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="h-64 md:h-[40rem] rounded-3xl relative overflow-hidden shadow-2xl shadow-primary/10 border border-primary/5"
        >
          {project.image_url ? (
            <img src={project.image_url} alt={project.title} className="object-cover w-full h-full" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-secondary/20 to-primary/20 opacity-30" />
          )}
        </motion.div>
      </div>

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-24">
          
          {/* Overview & Tools (Left Column / Main) */}
          <div className="lg:col-span-8 space-y-12">
            <div>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">Overview</h2>
              <p className="text-muted-foreground leading-relaxed text-lg whitespace-pre-wrap">
                {details?.overview || project.description || "No overview provided."}
              </p>
            </div>

            {details?.problem && (
              <div className="p-8 rounded-2xl bg-secondary/30 border border-border/50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-primary">The</span> Problem
                </h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {details.problem}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar / Meta */}
          <div className="lg:col-span-4">
            {toolsList.length > 0 && (
              <div className="sticky top-32 p-6 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm">
                <h3 className="font-heading text-lg font-bold text-foreground mb-4">Tools Used</h3>
                <div className="flex flex-wrap gap-2">
                  {toolsList.map((tool, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Research Insights */}
        {details?.insights && details.insights.length > 0 && (
          <div className="mb-32">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-12">Research <span className="text-primary">Insights</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {details.insights.map((insight, idx) => (
                <div key={idx} className="p-8 h-full rounded-2xl border border-border/50 bg-card hover:border-primary/50 transition-colors group flex items-center gap-6">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold group-hover:scale-110 transition-transform">
                    {idx + 1}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {insight.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Design Progress */}
        {details?.progress && details.progress.length > 0 && (
          <div className="mb-32">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-16">Design <span className="text-primary">Process</span></h2>
            <div className="relative border-l-2 border-primary/20 ml-4 space-y-12">
              {details.progress.map((step, idx) => (
                <div key={idx} className="relative pl-8 md:pl-12">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary ring-4 ring-background" />
                  
                  <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Final Screens */}
        {details?.screens && details.screens.length > 0 && (
          <div className="mb-32">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-12">Final <span className="text-primary">Outputs</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {details.screens.map((screenGroup, idx) => {
                if (!screenGroup.urls || screenGroup.urls.length === 0) return null;
                const imageCount = screenGroup.urls.length;
                
                return (
                  <div 
                    key={idx} 
                    className="group rounded-2xl overflow-hidden border border-border/50 bg-card flex flex-col"
                  >
                    <div className="relative overflow-hidden aspect-[4/3] bg-muted/30">
                      {imageCount > 1 ? (
                        <Carousel 
                          className="w-full h-full"
                          opts={{ loop: true }}
                          plugins={[
                            Autoplay({
                              delay: 3000,
                              stopOnInteraction: true,
                            }),
                          ]}
                        >
                          <CarouselContent className="h-full">
                            {screenGroup.urls.map((url, imgIdx) => (
                              <CarouselItem key={imgIdx} className="h-full">
                                <div className="w-full h-full relative cursor-pointer" onClick={() => openLightbox(idx, imgIdx)}>
                                  <img 
                                    src={url} 
                                    alt={`${screenGroup.title} - ${imgIdx + 1}`} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                  />
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious className="left-4 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                          <CarouselNext className="right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                        </Carousel>
                      ) : (
                        <div className="w-full h-full relative cursor-pointer" onClick={() => openLightbox(idx, 0)}>
                          <img 
                            src={screenGroup.urls[0]} 
                            alt={screenGroup.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                          />
                        </div>
                      )}
                      
                      {imageCount > 1 && (
                        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm pointer-events-none z-20">
                          <Images size={12} /> {imageCount}
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{screenGroup.title || `Screen Group ${idx + 1}`}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* CTA */}
      <Section className="bg-secondary/20">
        <div className="text-center">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-6">Ready to start your next project?</h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">Let's collaborate and build something extraordinary together.</p>
          <Link to="/contact" className="glow-button px-10 py-4 rounded-xl font-semibold text-primary-foreground text-lg">
            Get in Touch
          </Link>
        </div>
      </Section>

      <Footer />

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxState !== null && details?.screens && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl"
          >
            {/* Close Button */}
            <button 
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
            >
              <X size={24} />
            </button>

            {/* Navigation Buttons (only show if multiple images in group) */}
            {details.screens[lightboxState.groupIndex].urls.length > 1 && (
              <>
                <button 
                  onClick={(e) => { e.stopPropagation(); prevLightboxImage(); }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
                >
                  <ChevronLeft size={32} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); nextLightboxImage(); }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            {/* Main Image */}
            <motion.div 
              key={`${lightboxState.groupIndex}-${lightboxState.imageIndex}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full h-full max-w-6xl max-h-[85vh] p-6 flex flex-col items-center justify-center relative"
              onClick={closeLightbox}
            >
              <img 
                src={details.screens[lightboxState.groupIndex].urls[lightboxState.imageIndex]} 
                alt={`${details.screens[lightboxState.groupIndex].title} - ${lightboxState.imageIndex + 1}`} 
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" 
                onClick={(e) => e.stopPropagation()}
              />
              <div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none">
                <div className="inline-block bg-black/60 backdrop-blur-md px-6 py-3 rounded-full">
                  <h3 className="text-white font-medium text-lg shadow-black drop-shadow-md">
                    {details.screens[lightboxState.groupIndex].title || `Group ${lightboxState.groupIndex + 1}`}
                  </h3>
                  {details.screens[lightboxState.groupIndex].urls.length > 1 && (
                    <p className="text-white/60 text-sm mt-1">
                      {lightboxState.imageIndex + 1} of {details.screens[lightboxState.groupIndex].urls.length}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorkDetail;
