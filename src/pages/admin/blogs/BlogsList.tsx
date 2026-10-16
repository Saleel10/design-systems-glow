import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Blog = {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  published: boolean;
  category_id: string;
  created_at: string;
  categories: { name: string } | null;
  read_time?: string;
  date?: string;
  image_url?: string;
  author_name?: string;
  author_role?: string;
  tags?: string;
  content?: any;
};

export const getDefaultBlogs = (): Blog[] => [
  {
    id: "why-your-brand-needs-a-system",
    slug: "why-your-brand-needs-a-system",
    title: "Why your brand needs a system, not just a logo",
    subtitle: "A logo is a starting point. The real value is in the rules that make every touchpoint feel like the same brand.",
    category_id: "branding",
    categories: { name: "Branding" },
    read_time: "5 min read",
    date: "Sep 2026",
    published: true,
    created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    image_url: "",
    author_name: "Muhammed Saleel CP",
    author_role: "Creative & UI/UX Designer",
    tags: "#branding, #design-systems, #strategy",
    content: {
      intro: "Most businesses start with a logo and stop there. But a logo on its own can't carry a brand across a website, a social feed, packaging and a pitch deck. What carries it is the system around the logo.",
      sections: [
        {
          heading: "A logo is a signature, not a language",
          body: "A logo identifies you. A brand system lets you speak — consistently — in every place your customers meet you. Colour, typography, layout, imagery and tone are the vocabulary.\n\nWithout those rules, every new asset is designed from scratch, and small differences pile up until the brand feels like five different companies.",
        },
        {
          heading: "What a brand system actually includes",
          body: "At minimum: a logo suite, a colour palette with clear usage, a type hierarchy, spacing and layout principles, and a set of ready-made templates for the things you make most often.\n\nThe goal isn't a thick PDF nobody reads. It's a toolkit that makes the right choice the easy choice.",
        },
        {
          heading: "Why it pays off",
          body: "Consistency builds recognition, and recognition builds trust. A system also saves time and money: your team stops reinventing layouts and starts shipping.",
        },
      ],
      callout: "Consistency isn't boring. It's what makes a brand recognisable at a glance.",
      conclusion: "If your brand feels scattered, the fix is rarely a new logo. It's usually a system that ties everything you already have together.",
    },
  },
  {
    id: "designing-for-clarity",
    slug: "designing-for-clarity",
    title: "Designing for clarity: lessons from 800+ projects",
    subtitle: "How removing visual noise and focusing on user intent accelerates decision-making.",
    category_id: "process",
    categories: { name: "Process" },
    read_time: "5 min read",
    date: "Aug 2026",
    published: true,
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    image_url: "",
    author_name: "Muhammed Saleel CP",
    author_role: "Creative & UI/UX Designer",
    tags: "#process, #ui-ux, #clarity",
    content: {
      intro: "After delivering hundreds of design projects across branding and interfaces, one pattern emerges repeatedly: the enemy of good design is rarely lack of skill. It is unnecessary complexity.",
      sections: [
        {
          heading: "Subtract until only the purpose remains",
          body: "When building an interface or an identity, every unnecessary decorative flourish creates cognitive load. The best designs solve problems with quiet confidence.",
        },
        {
          heading: "Hierarchy leads the eye",
          body: "Users don't read every word on a screen. They scan for anchors. A clear typography hierarchy tells them instantly what matters first, second, and third.",
        },
      ],
      callout: "Simplicity is not the absence of clutter; it is the presence of clear purpose.",
      conclusion: "When in doubt, simplify. Your users and your metrics will thank you.",
    },
  },
  {
    id: "building-your-first-design-system-in-figma",
    slug: "building-your-first-design-system-in-figma",
    title: "Building your first design system in Figma",
    subtitle: "Practical token architecture, variable modes, and component anatomy for growing teams.",
    category_id: "design-systems",
    categories: { name: "Design systems" },
    read_time: "8 min read",
    date: "Jul 2026",
    published: true,
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    image_url: "",
    author_name: "Muhammed Saleel CP",
    author_role: "Creative & UI/UX Designer",
    tags: "#figma, #design-systems, #tokens",
    content: {
      intro: "Design systems often start with grand ambitions and end as abandoned component graveyards. Here is how to build one that teams actually use every day.",
      sections: [
        {
          heading: "Tokens before components",
          body: "Start with atomic values: colors, spacing scale, typography, and corner radiuses. Variables in Figma allow you to map these directly to semantic tokens.",
        },
        {
          heading: "Component variants with restraint",
          body: "Avoid creating 50 variants of a button before you need them. Build the primary, secondary, and ghost variants first, with clear states.",
        },
      ],
      callout: "A design system is a living product, not a finished monument.",
      conclusion: "Start small, govern consistently, and let the system evolve alongside your product.",
    },
  },
  {
    id: "landing-pages-that-convert",
    slug: "landing-pages-that-convert",
    title: "Landing pages that convert: structure before style",
    subtitle: "Why hierarchy, contrast, and message sequencing beat trendy animations every time.",
    category_id: "web-design",
    categories: { name: "Web Design" },
    read_time: "4 min read",
    date: "Jun 2026",
    published: true,
    created_at: new Date(Date.now() - 4 * 86400000).toISOString(),
    image_url: "",
    author_name: "Muhammed Saleel CP",
    author_role: "Creative & UI/UX Designer",
    tags: "#web-design, #conversion, #landing-page",
    content: {
      intro: "Too many landing pages treat the hero section like a canvas for abstract 3D art rather than answering the user's primary questions.",
      sections: [
        {
          heading: "The 5-second test",
          body: "A visitor should understand what you do, who it is for, and how to take the next step within five seconds of landing on your page.",
        },
        {
          heading: "Sequencing the narrative",
          body: "Structure your page like an argument: hook with problem & value proposition, prove with social proof and metrics, clarify with features, and close with a strong CTA.",
        },
      ],
      callout: "Design should remove friction between curiosity and commitment.",
      conclusion: "Prioritize clear communication over decorative noise every single time.",
    },
  },
];

import { getSyncedBlogs, notifyPortfolioDataUpdated } from "@/lib/portfolioDataSync";

export default function BlogsList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchBlogs();
    const handleUpdate = () => fetchBlogs();
    window.addEventListener("portfolio_data_updated", handleUpdate);
    return () => window.removeEventListener("portfolio_data_updated", handleUpdate);
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    const data = await getSyncedBlogs();
    setBlogs(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await supabase.from("blogs").delete().eq("id", id);
    } catch (err) {
      console.log(err);
    }

    const stored = localStorage.getItem("admin_blogs");
    if (stored) {
      const list = JSON.parse(stored);
      const updated = list.filter((b: Blog) => b.id !== id && b.slug !== id);
      localStorage.setItem("admin_blogs", JSON.stringify(updated));
      setBlogs(updated);
    } else {
      setBlogs((prev) => prev.filter((b) => b.id !== id && b.slug !== id));
    }

    notifyPortfolioDataUpdated();

    toast({
      title: "Blog post deleted",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Blogs</h1>
        <Button asChild>
          <Link to="/admin/blogs/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Blog
          </Link>
        </Button>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12">
                  <div className="flex justify-center items-center text-muted-foreground">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                </TableCell>
              </TableRow>
            ) : blogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No blogs found.
                </TableCell>
              </TableRow>
            ) : (
              blogs.map((blog) => (
                <TableRow key={blog.id} className="group hover:bg-[#5cb847]/5 transition-colors">
                  <TableCell className="font-medium group-hover:text-[#5cb847] transition-colors">{blog.title}</TableCell>
                  <TableCell className="text-muted-foreground">{blog.slug}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#5cb847]/10 text-[#5cb847] border border-[#5cb847]/30">
                      {blog.categories?.name || "Uncategorized"}
                    </span>
                  </TableCell>
                  <TableCell>
                    {blog.published ? (
                      <Badge className="bg-green-500 hover:bg-green-600">Published</Badge>
                    ) : (
                      <Badge variant="secondary">Draft</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/admin/blogs/${blog.id}`}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete this blog post and remove its data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(blog.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
