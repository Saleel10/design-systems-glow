import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/lib/supabase";
import { getDefaultBlogs } from "./BlogsList";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  Loader2,
  ArrowLeft,
  Trash2,
  Plus,
  GripVertical,
  ImageIcon,
  Upload,
  Eye,
  Edit3,
  Quote,
  Sparkles,
  Tag,
  Check,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import profileDark from "@/assets/profile-dark.png";

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  slug: z.string().min(2, { message: "Slug is required." }),
  subtitle: z.string().optional().default(""),
  category_id: z.string().min(1, { message: "Please select a category." }),
  date: z.string().default("Sep 2026"),
  read_time: z.string().default("5 min read"),
  published: z.boolean().default(true),
  image_url: z.string().optional().default(""),
  author_name: z.string().default("Muhammed Saleel CP"),
  author_role: z.string().default("Creative & UI/UX Designer"),
  tags: z.string().default("#branding, #design-systems, #strategy"),
  content: z.object({
    intro: z.string().default(""),
    sections: z.array(
      z.object({
        heading: z.string().default(""),
        body: z.string().default(""),
      })
    ).default([]),
    callout: z.string().default(""),
    conclusion: z.string().default(""),
  }),
});

type Category = {
  id: string;
  name: string;
};

const DEFAULT_CATEGORIES: Category[] = [
  { id: "branding", name: "Branding" },
  { id: "process", name: "Process" },
  { id: "design-systems", name: "Design systems" },
  { id: "web-design", name: "Web Design" },
  { id: "theory", name: "Design Theory" },
  { id: "strategy", name: "Strategy" },
];

export default function BlogForm() {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [newCatName, setNewCatName] = useState("");
  const [isCatDialogOpen, setIsCatDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      subtitle: "",
      category_id: "branding",
      date: "Sep 2026",
      read_time: "5 min read",
      published: true,
      image_url: "",
      author_name: "Muhammed Saleel CP",
      author_role: "Creative & UI/UX Designer",
      tags: "#branding, #design-systems, #strategy",
      content: {
        intro:
          "Most businesses start with a logo and stop there. But a logo on its own can't carry a brand across a website, a social feed, packaging and a pitch deck. What carries it is the system around the logo.",
        sections: [
          {
            heading: "A logo is a signature, not a language",
            body:
              "A logo identifies you. A brand system lets you speak — consistently — in every place your customers meet you. Colour, typography, layout, imagery and tone are the vocabulary.\n\nWithout those rules, every new asset is designed from scratch, and small differences pile up until the brand feels like five different companies.",
          },
          {
            heading: "What a brand system actually includes",
            body:
              "At minimum: a logo suite, a colour palette with clear usage, a type hierarchy, spacing and layout principles, and a set of ready-made templates for the things you make most often.\n\nThe goal isn't a thick PDF nobody reads. It's a toolkit that makes the right choice the easy choice.",
          },
          {
            heading: "Why it pays off",
            body:
              "Consistency builds recognition, and recognition builds trust. A system also saves time and money: your team stops reinventing layouts and starts shipping.",
          },
        ],
        callout: "Consistency isn't boring. It's what makes a brand recognisable at a glance.",
        conclusion:
          "If your brand feels scattered, the fix is rarely a new logo. It's usually a system that ties everything you already have together.",
      },
    },
  });

  const {
    fields: sectionFields,
    append: appendSection,
    remove: removeSection,
    move: moveSection,
  } = useFieldArray({
    control: form.control,
    name: "content.sections",
  });

  const onDragEndSections = (result: DropResult) => {
    if (!result.destination) return;
    moveSection(result.source.index, result.destination.index);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    setLoading(true);

    try {
      const { data: cats } = await supabase
        .from("categories")
        .select("id, name")
        .eq("type", "blog")
        .order("name");

      if (cats && cats.length > 0) {
        setCategories(cats);
      } else {
        setCategories(DEFAULT_CATEGORIES);
      }
    } catch {
      setCategories(DEFAULT_CATEGORIES);
    }

    if (isEditing) {
      let blog: any = null;

      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .eq("id", id)
          .single();
        if (!error && data) blog = data;
      } catch {
        // Fallback to local
      }

      if (!blog) {
        const stored = localStorage.getItem("admin_blogs");
        const list = stored ? JSON.parse(stored) : getDefaultBlogs();
        blog = list.find((b: any) => b.id === id || b.slug === id);
      }

      if (!blog) {
        toast({
          variant: "destructive",
          title: "Blog not found",
          description: "Could not locate this blog post.",
        });
        navigate("/admin/blogs");
        return;
      }

      if (blog) {
        let contentObj = {
          intro: "",
          sections: [] as { heading: string; body: string }[],
          callout: "",
          conclusion: "",
        };

        if (blog.content && typeof blog.content === "object" && !Array.isArray(blog.content)) {
          contentObj = {
            intro: blog.content.intro || "",
            sections: Array.isArray(blog.content.sections) ? blog.content.sections : [],
            callout: blog.content.callout || "",
            conclusion: blog.content.conclusion || "",
          };
        } else if (typeof blog.content === "string") {
          // Parse string markdown into structured sections
          const parts = blog.content.split(/\n###\s+/);
          const intro = parts[0]?.trim() || "";
          const sections: { heading: string; body: string }[] = [];
          let callout = "";
          let conclusion = "";

          for (let i = 1; i < parts.length; i++) {
            const lines = parts[i].split("\n");
            const heading = lines[0]?.trim() || "";
            const rest = lines.slice(1).join("\n").trim();

            if (rest.includes("> **")) {
              const quoteMatch = rest.match(/> \*\*([^*]+)\*\*/);
              if (quoteMatch) {
                callout = quoteMatch[1];
              }
            }

            sections.push({
              heading,
              body: rest.replace(/> \*\*[^*]+\*\*/g, "").trim(),
            });
          }

          contentObj = { intro, sections, callout, conclusion };
        }

        form.reset({
          title: blog.title || "",
          slug: blog.slug || "",
          subtitle: blog.subtitle || blog.excerpt || "",
          category_id: blog.category_id || "branding",
          date: blog.date || "Sep 2026",
          read_time: blog.read_time || "5 min read",
          published: blog.published ?? true,
          image_url: blog.image_url || "",
          author_name: blog.author_name || "Muhammed Saleel CP",
          author_role: blog.author_role || "Creative & UI/UX Designer",
          tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags || "#branding, #design-systems, #strategy",
          content: contentObj,
        });
      }
    }
    setLoading(false);
  };

  const generateSlugFromTitle = () => {
    const title = form.getValues("title");
    if (!title) return;
    const generated = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    form.setValue("slug", generated);
    toast({ title: "Slug generated", description: generated });
  };

  const handleCreateCategory = async () => {
    if (!newCatName.trim()) return;
    const slug = newCatName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const newCat = { id: slug, name: newCatName.trim() };
    setCategories((prev) => [...prev, newCat]);
    form.setValue("category_id", slug);
    setIsCatDialogOpen(false);
    setNewCatName("");
    toast({ title: "Category added", description: newCatName });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    setUploading(true);
    setUploadProgress(20);

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setUploadProgress(100);
      const dataUrl = uploadEvent.target?.result as string;
      form.setValue("image_url", dataUrl);
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
        toast({ title: "Cover image loaded" });
      }, 400);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    form.setValue("image_url", "");
    toast({ title: "Image removed" });
  };

  const formatToMarkdown = (data: z.infer<typeof formSchema>): string => {
    let md = "";
    if (data.content.intro) md += `${data.content.intro}\n\n`;
    if (Array.isArray(data.content.sections)) {
      data.content.sections.forEach((sec) => {
        if (sec.heading) md += `### ${sec.heading}\n\n`;
        if (sec.body) md += `${sec.body}\n\n`;
      });
    }
    if (data.content.callout) {
      md += `> **${data.content.callout}**\n\n`;
    }
    if (data.content.conclusion) {
      md += `${data.content.conclusion}\n\n`;
    }
    return md.trim();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const rawMarkdown = formatToMarkdown(values);
    const catObj = categories.find((c) => c.id === values.category_id);

    const blogRecord = {
      ...values,
      raw_content: rawMarkdown,
      content: values.content,
      categories: { name: catObj?.name || values.category_id },
      category: catObj?.name || values.category_id,
      id: id || values.slug,
      created_at: new Date().toISOString(),
    };

    try {
      if (isEditing) {
        await supabase
          .from("blogs")
          .update({
            title: values.title,
            slug: values.slug,
            category_id: values.category_id,
            content: rawMarkdown,
            image_url: values.image_url,
            published: values.published,
          })
          .eq("id", id);
      } else {
        await supabase.from("blogs").insert([
          {
            title: values.title,
            slug: values.slug,
            category_id: values.category_id,
            content: rawMarkdown,
            image_url: values.image_url,
            published: values.published,
          },
        ]);
      }
    } catch {
      // In local mode without Supabase, proceed with localStorage
    }

    // Always synchronize with local storage
    const stored = localStorage.getItem("admin_blogs");
    let list = stored ? JSON.parse(stored) : getDefaultBlogs();

    if (isEditing) {
      list = list.map((b: any) =>
        b.id === id || b.slug === id ? { ...b, ...blogRecord } : b
      );
    } else {
      list.unshift(blogRecord);
    }

    localStorage.setItem("admin_blogs", JSON.stringify(list));

    toast({
      title: isEditing ? "Blog updated successfully" : "Blog created successfully",
      description: "Saved and ready for viewing.",
    });

    navigate("/admin/blogs");
  };

  const formValues = form.watch();
  const selectedCat = categories.find((c) => c.id === formValues.category_id)?.name || "Branding";
  const parsedTagList = formValues.tags
    ? formValues.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : ["#branding", "#design-systems", "#strategy"];

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-24">
      {/* Top Header & Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" asChild>
            <Link to="/admin/blogs">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {isEditing ? "Edit Blog Article" : "New Blog Article"}
            </h1>
            <p className="text-xs text-muted-foreground">
              Structured inner sections matching the live article view
            </p>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-muted rounded-lg p-1 border">
            <button
              type="button"
              onClick={() => setViewMode("edit")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === "edit"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Edit3 size={14} />
              <span>Structured Editor</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("preview")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === "preview"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Eye size={14} />
              <span>Live Preview</span>
            </button>
          </div>

          <Button
            type="button"
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting || uploading}
            className="brand-gradient text-white hover:opacity-95"
          >
            {form.formState.isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save Article
          </Button>
        </div>
      </div>

      {/* Live Preview Mode */}
      {viewMode === "preview" && (
        <div className="border rounded-2xl bg-[#090b09] text-white p-6 sm:p-12 shadow-xl">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 text-xs text-neutral-400 mb-6">
              <ArrowLeft size={14} />
              <span>Back to blog</span>
            </div>

            {/* Category Pill & Date */}
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-0.5 rounded-full bg-[#1b3826] text-[#5cb847] text-xs font-semibold tracking-wide border border-[#5cb847]/20">
                {selectedCat}
              </span>
              <span className="text-xs text-neutral-400 font-medium">
                {formValues.date || "Sep 2026"} · {formValues.read_time || "5 min read"}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-heading font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight text-white tracking-tight">
              {formValues.title || "Why your brand needs a system, not just a logo"}
            </h1>

            {/* Subtitle */}
            {formValues.subtitle && (
              <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed">
                {formValues.subtitle}
              </p>
            )}

            {/* Author Bar */}
            <div className="flex items-center gap-3 py-5 mt-6 border-b border-white/10">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 border border-white/15 shrink-0 flex items-center justify-center">
                <img
                  src={profileDark}
                  alt={formValues.author_name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <div className="text-sm font-semibold text-white tracking-tight">
                  {formValues.author_name || "Muhammed Saleel CP"}
                </div>
                <div className="text-xs text-neutral-400">
                  {formValues.author_role || "Creative & UI/UX Designer"}
                </div>
              </div>
            </div>

            {/* Cover Image or Dashed Container */}
            {formValues.image_url ? (
              <div className="my-8 w-full aspect-[16/9] sm:aspect-[2/1] rounded-2xl overflow-hidden border border-white/10 bg-neutral-900">
                <img
                  src={formValues.image_url}
                  alt={formValues.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="my-8 w-full aspect-[16/9] sm:aspect-[2/1] rounded-2xl border border-dashed border-white/20 bg-white/[0.02] flex flex-col items-center justify-center text-center p-8">
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-neutral-400 mb-2">
                  <ImageIcon className="w-5 h-5 stroke-[1.4]" />
                </div>
                <span className="text-sm font-medium text-white">Article cover image</span>
                <span className="text-xs text-neutral-400 mt-1">or browse files</span>
              </div>
            )}

            {/* Intro paragraph */}
            {formValues.content?.intro && (
              <p className="text-[16px] leading-[1.8] text-neutral-200 mt-6 mb-8">
                {formValues.content.intro}
              </p>
            )}

            {/* Subsections */}
            {formValues.content?.sections?.map((sec, idx) => (
              <div key={idx} className="my-8 space-y-4">
                {sec.heading && (
                  <h2 className="font-heading font-semibold text-2xl sm:text-[26px] text-white tracking-tight pt-2">
                    {sec.heading}
                  </h2>
                )}
                {sec.body && (
                  <p className="text-[16px] leading-[1.8] text-neutral-300 whitespace-pre-line">
                    {sec.body}
                  </p>
                )}
              </div>
            ))}

            {/* Green Callout Quote Box */}
            {formValues.content?.callout && (
              <div className="my-8 p-6 sm:p-7 rounded-[20px] bg-[#142318] border border-[#5cb847]/40 text-[#4ade80] shadow-[0_12px_32px_-12px_rgba(92,184,71,0.2)]">
                <p className="text-base sm:text-lg font-medium leading-snug !m-0">
                  {formValues.content.callout}
                </p>
              </div>
            )}

            {/* Conclusion */}
            {formValues.content?.conclusion && (
              <p className="text-[16px] leading-[1.8] text-neutral-300 my-8">
                {formValues.content.conclusion}
              </p>
            )}

            {/* Hashtags */}
            <div className="flex flex-wrap gap-2 pt-6 border-t border-white/10 mt-10">
              {parsedTagList.map((tag, i) => (
                <span
                  key={i}
                  className="px-3.5 py-1.5 rounded-full bg-white/5 text-xs text-neutral-400 border border-white/10"
                >
                  {tag.startsWith("#") ? tag : `#${tag}`}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Structured Edit Form */}
      {viewMode === "edit" && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* SECTION 1: ARTICLE HEADER & META */}
            <Card>
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Section 1: Article Header & Details</CardTitle>
                </div>
                <p className="text-xs text-muted-foreground">
                  The primary headline, deck subtitle, category badge, date, and read time.
                </p>
              </CardHeader>
              <CardContent className="pt-6 space-y-5">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Article Title *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Why your brand needs a system, not just a logo"
                          className="text-base font-medium"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subtitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        Subtitle / Lead Summary (Shown under title)
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g. A logo is a starting point. The real value is in the rules that make every touchpoint feel like the same brand."
                          rows={2}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <FormField
                    control={form.control}
                    name="category_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <div className="flex gap-2">
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((cat) => (
                                <SelectItem key={cat.id} value={cat.id}>
                                  {cat.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <Dialog open={isCatDialogOpen} onOpenChange={setIsCatDialogOpen}>
                            <DialogTrigger asChild>
                              <Button type="button" variant="outline" size="icon" title="Add category">
                                <Plus className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Add Category</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 py-3">
                                <Input
                                  placeholder="e.g. Identity"
                                  value={newCatName}
                                  onChange={(e) => setNewCatName(e.target.value)}
                                />
                                <Button type="button" onClick={handleCreateCategory} className="w-full">
                                  Save Category
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Publication Date</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Sep 2026" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="read_time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Read Time</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 5 min read" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="published"
                    render={({ field }) => (
                      <FormItem className="flex flex-col justify-end">
                        <div className="flex items-center justify-between rounded-lg border p-2.5">
                          <div className="text-xs font-medium">Published</div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>URL Slug *</FormLabel>
                        <button
                          type="button"
                          onClick={generateSlugFromTitle}
                          className="text-xs text-primary hover:underline font-medium"
                        >
                          Generate from Title
                        </button>
                      </div>
                      <FormControl>
                        <Input placeholder="e.g. why-your-brand-needs-a-system" {...field} />
                      </FormControl>
                      <FormDescription className="text-xs">
                        This forms the public article URL: /blog/{field.value || "slug"}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* SECTION 2: AUTHOR DETAILS */}
            <Card>
              <CardHeader className="pb-3 border-b">
                <CardTitle className="text-lg">Section 2: Author Details</CardTitle>
                <p className="text-xs text-muted-foreground">
                  The author signature displayed below the subtitle.
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="author_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Author Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Muhammed Saleel CP" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="author_role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Author Role</FormLabel>
                        <FormControl>
                          <Input placeholder="Creative & UI/UX Designer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* SECTION 3: ARTICLE COVER IMAGE */}
            <Card>
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Section 3: Article Cover Image</CardTitle>
                </div>
                <p className="text-xs text-muted-foreground">
                  Featured banner displayed above the article content (matching reference screenshot).
                </p>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <FormField
                  control={form.control}
                  name="image_url"
                  render={({ field }) => (
                    <FormItem>
                      {field.value ? (
                        <div className="space-y-3">
                          <div className="relative group rounded-2xl overflow-hidden border aspect-[2/1] max-w-xl mx-auto bg-muted">
                            <img
                              src={field.value}
                              alt="Cover preview"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={handleRemoveImage}
                              >
                                <Trash2 className="h-4 w-4 mr-1.5" />
                                Remove Image
                              </Button>
                            </div>
                          </div>
                          <div className="flex justify-center">
                            <Input
                              placeholder="Or paste image URL"
                              value={field.value}
                              onChange={(e) => field.onChange(e.target.value)}
                              className="max-w-md text-xs font-mono"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {/* Styled dashed container from the screenshot */}
                          <label className="cursor-pointer border-2 border-dashed border-border hover:border-primary/60 bg-muted/20 hover:bg-muted/40 transition-all rounded-2xl p-8 flex flex-col items-center justify-center text-center group block">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                            <div className="w-14 h-14 rounded-2xl bg-muted border flex items-center justify-center text-muted-foreground mb-3 group-hover:scale-105 transition-transform">
                              <ImageIcon className="w-6 h-6 stroke-[1.4]" />
                            </div>
                            <span className="text-sm font-medium text-foreground">
                              Article cover image
                            </span>
                            <span className="text-xs text-muted-foreground underline mt-1">
                              or browse files
                            </span>
                          </label>

                          <div className="flex items-center gap-2 max-w-md mx-auto">
                            <Input
                              placeholder="Or paste external image URL..."
                              value={field.value}
                              onChange={(e) => field.onChange(e.target.value)}
                              className="text-xs"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                if (field.value) toast({ title: "Image URL applied" });
                              }}
                            >
                              Apply
                            </Button>
                          </div>
                        </div>
                      )}

                      {uploading && (
                        <div className="space-y-1 mt-2">
                          <Progress value={uploadProgress} />
                          <p className="text-xs text-muted-foreground text-center">Uploading image...</p>
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* SECTION 4: INNER ARTICLE CONTENT */}
            <Card>
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Section 4: Inner Article Content</CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Structured introduction, body sections, highlight quote box, and conclusion.
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendSection({ heading: "", body: "" })}
                    className="gap-1.5"
                  >
                    <Plus size={14} />
                    <span>Add Subsection</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Intro Paragraph */}
                <FormField
                  control={form.control}
                  name="content.intro"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-sm">
                        1. Opening Intro Paragraph (Before first heading)
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g. Most businesses start with a logo and stop there. But a logo on its own can't carry a brand across a website, a social feed, packaging and a pitch deck. What carries it is the system around the logo."
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />

                {/* Subsections List with Drag-and-Drop */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <FormLabel className="font-semibold text-sm">
                      2. Article Subsections (Headings &amp; Paragraphs)
                    </FormLabel>
                    <span className="text-xs text-muted-foreground">
                      Drag grip to reorder sections
                    </span>
                  </div>

                  <DragDropContext onDragEnd={onDragEndSections}>
                    <Droppable droppableId="blog-sections">
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="space-y-4"
                        >
                          {sectionFields.map((field, index) => (
                            <Draggable
                              key={field.id}
                              draggableId={field.id}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  className="border rounded-xl p-4 bg-card/60 relative group shadow-sm space-y-3"
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <div
                                        {...provided.dragHandleProps}
                                        className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-muted text-muted-foreground"
                                      >
                                        <GripVertical size={16} />
                                      </div>
                                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        Subsection #{index + 1}
                                      </span>
                                    </div>
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      className="text-destructive hover:bg-destructive/10 h-8 w-8"
                                      onClick={() => removeSection(index)}
                                    >
                                      <Trash2 size={15} />
                                    </Button>
                                  </div>

                                  <FormField
                                    control={form.control}
                                    name={`content.sections.${index}.heading`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="text-xs">Section Heading</FormLabel>
                                        <FormControl>
                                          <Input
                                            placeholder="e.g. A logo is a signature, not a language"
                                            className="font-medium"
                                            {...field}
                                          />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={form.control}
                                    name={`content.sections.${index}.body`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel className="text-xs">Section Paragraphs</FormLabel>
                                        <FormControl>
                                          <Textarea
                                            placeholder="Write the body text for this section..."
                                            rows={4}
                                            {...field}
                                          />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-dashed gap-2 py-4"
                    onClick={() => appendSection({ heading: "", body: "" })}
                  >
                    <Plus size={16} />
                    <span>Add Subsection</span>
                  </Button>
                </div>

                <Separator />

                {/* Highlight Callout Quote (Green Box in Screenshot 2) */}
                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name="content.callout"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2 mb-1">
                          <Quote className="h-4 w-4 text-[#5cb847]" />
                          <FormLabel className="font-semibold text-sm">
                            3. Highlight Callout Quote (Featured Green Card)
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Input
                            placeholder="e.g. Consistency isn't boring. It's what makes a brand recognisable at a glance."
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          Renders inside the green rounded callout card shown in Screenshot 2.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Live preview of callout box */}
                  {formValues.content?.callout && (
                    <div className="p-5 rounded-[18px] bg-[#142318] border border-[#5cb847]/40 text-[#4ade80] shadow-[0_8px_24px_-8px_rgba(92,184,71,0.25)]">
                      <p className="text-sm sm:text-base font-medium leading-relaxed !m-0">
                        {formValues.content.callout}
                      </p>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Conclusion Paragraph */}
                <FormField
                  control={form.control}
                  name="content.conclusion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-sm">
                        4. Conclusion &amp; Closing Thought
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g. If your brand feels scattered, the fix is rarely a new logo. It's usually a system that ties everything you already have together."
                          rows={2}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* SECTION 5: HASHTAGS & TAXONOMY */}
            <Card>
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center gap-2">
                  <Tag className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Section 5: Hashtags &amp; Topics</CardTitle>
                </div>
                <p className="text-xs text-muted-foreground">
                  Pill tags rendered at the bottom of the article (comma-separated).
                </p>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags (Comma separated)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="#branding, #design-systems, #strategy"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Enter tags prefixed with # or separated by commas.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Preview pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {parsedTagList.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-foreground border"
                    >
                      {tag.startsWith("#") ? tag : `#${tag}`}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Bottom Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" asChild>
                <Link to="/admin/blogs">Cancel</Link>
              </Button>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting || uploading}
                className="brand-gradient text-white hover:opacity-95"
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save Blog Post
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
