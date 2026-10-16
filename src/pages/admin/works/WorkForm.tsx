import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/lib/supabase";
import { getDefaultWorks } from "./WorksList";
import { notifyPortfolioDataUpdated } from "@/lib/portfolioDataSync";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, ArrowLeft, Trash2, Plus, GripVertical, Image as ImageIcon, Upload } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  slug: z.string().min(2),
  description: z.string().optional().default(""),
  category_id: z.string().min(1, { message: "Please select a category." }),
  image_url: z.string().optional().default(""),
  details: z.object({
    // Section 1: Project Overview
    overview: z.string().optional().default(""),
    problem: z.string().optional().default(""),
    client: z.string().optional().default(""),
    year: z.string().optional().default(""),
    tools: z.string().optional().default(""),

    // Section 2: Research Insights
    insights: z.array(z.object({ text: z.string() })).default([]),

    // Section 3: Design Process
    steps: z.array(z.object({
      number: z.string().default(""),
      title: z.string().default(""),
      desc: z.string().default(""),
    })).default([]),

    // Section 4: Final Outputs
    outputs: z.array(z.object({
      title: z.string().default(""),
      type: z.string().default(""),
      image_url: z.string().optional().default(""),
    })).default([]),
  }).default({}),
});

type Category = {
  id: string;
  name: string;
};

export default function WorkForm() {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [outputUploadProgress, setOutputUploadProgress] = useState<Record<number, number>>({});
  
  const [newCatName, setNewCatName] = useState("");
  const [isCatDialogOpen, setIsCatDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      category_id: "",
      image_url: "",
      details: {
        overview: "",
        problem: "",
        client: "",
        year: new Date().getFullYear().toString(),
        tools: "Illustrator, Photoshop, Figma",
        insights: [
          { text: "Competitors in the category look nearly identical — there was room to stand out." },
          { text: "Customers associated the brand with reliability, but nothing visual expressed it." },
          { text: "The internal team needed templates they could use without a designer." },
        ],
        steps: [
          { number: "Step 01", title: "Discover", desc: "Brief, research and audit of existing material and competitors." },
          { number: "Step 02", title: "Define", desc: "Positioning, goals and design direction agreed with the client." },
          { number: "Step 03", title: "Design", desc: "Concepts explored and refined through feedback rounds." },
          { number: "Step 04", title: "Deliver", desc: "Final files, guidelines and handoff." },
        ],
        outputs: [
          { title: "Logo system", type: "Identity", image_url: "" },
          { title: "Brand guidelines", type: "Document", image_url: "" },
          { title: "Stationery & collateral", type: "Print", image_url: "" },
          { title: "Social media kit", type: "Digital", image_url: "" },
        ],
      },
    },
  });

  const { fields: insightFields, append: appendInsight, remove: removeInsight, move: moveInsight } = useFieldArray({
    control: form.control,
    name: "details.insights",
  });

  const { fields: stepFields, append: appendStep, remove: removeStep, move: moveStep } = useFieldArray({
    control: form.control,
    name: "details.steps",
  });

  const { fields: outputFields, append: appendOutput, remove: removeOutput } = useFieldArray({
    control: form.control,
    name: "details.outputs",
  });

  const onDragEndInsights = (result: DropResult) => {
    if (!result.destination) return;
    moveInsight(result.source.index, result.destination.index);
  };

  const onDragEndSteps = (result: DropResult) => {
    if (!result.destination) return;
    moveStep(result.source.index, result.destination.index);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const defaultCategories = [
    { id: "branding", name: "Branding" },
    { id: "ui-ux-design", name: "UI/UX Design" },
    { id: "design-systems", name: "Design Systems" },
    { id: "web-design", name: "Web Design" },
    { id: "mobile-app", name: "Mobile App" },
  ];

  const fetchData = async () => {
    setLoading(true);

    try {
      const { data: cats } = await supabase
        .from("categories")
        .select("id, name")
        .eq("type", "work")
        .order("name");

      if (cats && cats.length > 0) {
        setCategories(cats);
      } else {
        setCategories(defaultCategories);
      }
    } catch {
      setCategories(defaultCategories);
    }

    if (isEditing) {
      let work: any = null;

      try {
        const { data, error } = await supabase
          .from("works")
          .select("*")
          .eq("id", id)
          .single();
        if (!error && data) work = data;
      } catch {
        // Fallback to local
      }

      if (!work) {
        const stored = localStorage.getItem("admin_works");
        const list = stored ? JSON.parse(stored) : getDefaultWorks();
        work = list.find((w: any) => w.id === id || w.slug === id);
      }

      if (!work) {
        toast({ variant: "destructive", title: "Work not found", description: "Could not locate work item." });
        navigate("/admin/works");
        return;
      }

      if (work) {
        const details = work.details || {};

        // Normalize insights
        const normalizedInsights = Array.isArray(details.insights)
          ? details.insights.map((ins: any) => typeof ins === "string" ? { text: ins } : ins)
          : [];

        // Normalize steps
        const normalizedSteps = Array.isArray(details.steps)
          ? details.steps
          : Array.isArray(details.progress)
          ? details.progress.map((p: any, i: number) => ({
              number: `Step 0${i + 1}`,
              title: p.title || "",
              desc: p.description || p.desc || "",
            }))
          : [];

        // Normalize outputs
        const normalizedOutputs = Array.isArray(details.outputs)
          ? details.outputs
          : Array.isArray(details.screens)
          ? details.screens.map((s: any) => ({
              title: s.title || "Output",
              type: "Design",
              image_url: s.urls?.[0] || s.url || "",
            }))
          : [];

        form.reset({
          title: work.title || "",
          slug: work.slug || "",
          description: work.description || "",
          category_id: work.category_id || "",
          image_url: work.image_url || "",
          details: {
            overview: details.overview || "",
            problem: details.problem || "",
            client: details.client || work.title || "",
            year: details.year || "2025",
            tools: Array.isArray(details.tools) ? details.tools.join(", ") : details.tools || "Illustrator, Photoshop, Figma",
            insights: normalizedInsights.length > 0 ? normalizedInsights : [
              { text: "Competitors in the category look nearly identical — there was room to stand out." },
              { text: "Customers associated the brand with reliability, but nothing visual expressed it." },
              { text: "The internal team needed templates they could use without a designer." },
            ],
            steps: normalizedSteps.length > 0 ? normalizedSteps : [
              { number: "Step 01", title: "Discover", desc: "Brief, research and audit of existing material and competitors." },
              { number: "Step 02", title: "Define", desc: "Positioning, goals and design direction agreed with the client." },
              { number: "Step 03", title: "Design", desc: "Concepts explored and refined through feedback rounds." },
              { number: "Step 04", title: "Deliver", desc: "Final files, guidelines and handoff." },
            ],
            outputs: normalizedOutputs.length > 0 ? normalizedOutputs : [
              { title: "Logo system", type: "Identity", image_url: "" },
              { title: "Brand guidelines", type: "Document", image_url: "" },
              { title: "Stationery & collateral", type: "Print", image_url: "" },
              { title: "Social media kit", type: "Digital", image_url: "" },
            ],
          },
        });
      }
    }
    setLoading(false);
  };

  const handleCreateCategory = async () => {
    if (!newCatName.trim()) return;
    const slug = newCatName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    
    const { data, error } = await supabase.from("categories").insert([
      { name: newCatName, slug, type: "work" }
    ]).select();

    if (error) {
      toast({ variant: "destructive", title: "Error creating category", description: error.message });
    } else if (data) {
      setCategories([...categories, data[0]]);
      form.setValue("category_id", data[0].id);
      setNewCatName("");
      setIsCatDialogOpen(false);
      toast({ title: "Category created" });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setUploadProgress(10);
      const interval = setInterval(() => {
        setUploadProgress((prev) => (prev >= 90 ? prev : prev + 15));
      }, 100);

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `works/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      clearInterval(interval);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('images').getPublicUrl(filePath);
      form.setValue("image_url", data.publicUrl);
      setUploadProgress(100);
      toast({ title: "Image uploaded successfully" });
    } catch (err: any) {
      toast({ variant: "destructive", title: "Upload failed", description: err.message });
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
      e.target.value = '';
    }
  };

  const handleOutputImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setOutputUploadProgress(prev => ({ ...prev, [index]: 20 }));
      const interval = setInterval(() => {
        setOutputUploadProgress(prev => ({
          ...prev,
          [index]: Math.min((prev[index] || 20) + 20, 90)
        }));
      }, 100);

      const fileExt = file.name.split('.').pop();
      const fileName = `output_${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `outputs/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      clearInterval(interval);
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('images').getPublicUrl(filePath);
      form.setValue(`details.outputs.${index}.image_url`, data.publicUrl);
      setOutputUploadProgress(prev => ({ ...prev, [index]: 100 }));
      toast({ title: "Output image uploaded" });
    } catch (err: any) {
      toast({ variant: "destructive", title: "Upload failed", description: err.message });
    } finally {
      setTimeout(() => {
        setOutputUploadProgress(prev => {
          const updated = { ...prev };
          delete updated[index];
          return updated;
        });
      }, 1000);
      e.target.value = '';
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const catObj = categories.find((c) => c.id === values.category_id);
    const catName = catObj?.name || values.category_id;

    try {
      if (isEditing) {
        const { error } = await supabase
          .from("works")
          .update(values)
          .eq("id", id);
        if (error) throw error;
        toast({ title: "Work updated successfully" });
      } else {
        const { error } = await supabase.from("works").insert([values]);
        if (error) throw error;
        toast({ title: "Work created successfully" });
      }
    } catch {
      toast({
        title: isEditing ? "Work updated (Local Storage)" : "Work created (Local Storage)",
        description: "Saved locally in your browser storage.",
      });
    }

    // Always keep localStorage sync for seamless preview & offline fallback
    const stored = localStorage.getItem("admin_works");
    let list = stored ? JSON.parse(stored) : getDefaultWorks();

    if (isEditing) {
      list = list.map((w: any) =>
        w.id === id || w.slug === id
          ? { ...w, ...values, id: w.id || id, categories: { name: catName }, cat: catName }
          : w
      );
    } else {
      list.unshift({
        ...values,
        id: values.slug,
        created_at: new Date().toISOString(),
        categories: { name: catName },
        cat: catName,
      });
    }

    localStorage.setItem("admin_works", JSON.stringify(list));
    notifyPortfolioDataUpdated();

    navigate("/admin/works");
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-16">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link to="/admin/works">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEditing ? "Edit Work" : "Create Work"}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Configure project overview, research insights, design process, and final outputs.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Section 1: Basic Settings & Cover */}
          <div className="rounded-xl border bg-card p-6 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary uppercase tracking-wider">
                Section 1
              </span>
              <h2 className="text-xl font-semibold">Basic Info & Hero Cover</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Taxverse"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          if (!isEditing && !form.formState.dirtyFields.slug) {
                            form.setValue(
                              "slug",
                              e.target.value
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, "-")
                                .replace(/(^-|-$)+/g, "")
                            );
                          }
                          // Sync client name if empty
                          if (!form.getValues("details.client")) {
                            form.setValue("details.client", e.target.value);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. taxverse" {...field} />
                    </FormControl>
                    <FormDescription>URL path: /work/{field.value || "slug"}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <div className="flex gap-2 items-center">
                    <Select onValueChange={field.onChange} value={field.value || undefined} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Select a category (e.g. Branding, UI/UX, Web)" />
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
                        <Button type="button" variant="outline" size="icon" title="Add new category">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Category</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <FormLabel>Category Name</FormLabel>
                            <Input 
                              placeholder="e.g. Branding" 
                              value={newCatName} 
                              onChange={(e) => setNewCatName(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  handleCreateCategory();
                                }
                              }}
                            />
                          </div>
                          <Button type="button" onClick={handleCreateCategory} className="w-full">Create Category</Button>
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description (for Works grid list)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief excerpt shown on the portfolio list cards..."
                      className="min-h-[70px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Hero / Cover Image</FormLabel>
                  <div className="flex gap-4 items-start">
                    <div className="flex-1 space-y-4">
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploading}
                          className={field.value ? "hidden" : ""}
                        />
                      </FormControl>
                      {!field.value && (
                        <FormDescription>Upload project hero image (16:9 or 2:1 recommended)</FormDescription>
                      )}
                      
                      {uploading && uploadProgress > 0 && (
                        <div className="space-y-2">
                          <Progress value={uploadProgress} />
                          <p className="text-sm text-muted-foreground text-center">Uploading... {uploadProgress}%</p>
                        </div>
                      )}
                    </div>
                    {field.value && !uploading && (
                      <div className="relative group rounded-xl overflow-hidden border">
                        <img src={field.value} alt="Cover Preview" className="h-32 object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button 
                            type="button" 
                            variant="destructive" 
                            size="icon"
                            onClick={() => form.setValue("image_url", "")}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Section 2: Project overview (Matches Screenshot 2) */}
          <div className="rounded-xl border bg-card p-6 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#5cb847]/10 text-[#5cb847] uppercase tracking-wider">
                Section 2
              </span>
              <h2 className="text-xl font-semibold">
                Project <span className="font-serif italic text-[#5cb847]">overview</span>
              </h2>
            </div>
            
            <FormField
              control={form.control}
              name="details.overview"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Overview Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="A complete visual identity for Taxverse — built from positioning and research into a logo, colour, type and asset system that works across every touchpoint." 
                      className="min-h-[110px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* The problem callout box matching Screenshot 2 */}
            <div className="p-4 sm:p-5 rounded-xl border border-[#5cb847]/40 bg-[#5cb847]/5 space-y-3">
              <FormField
                control={form.control}
                name="details.problem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#5cb847] font-semibold flex items-center gap-2">
                      <span>The problem</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="The brand lacked a consistent visual voice. Assets looked different on every platform, weakening recognition and trust." 
                        className="min-h-[90px] bg-background/80" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <FormField
                control={form.control}
                name="details.client"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Taxverse" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="details.year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 2025" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="details.tools"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tools Used</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Illustrator, Photoshop, Figma" {...field} />
                    </FormControl>
                    <FormDescription>Comma-separated list</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Section 3: Research insights (Matches Screenshot 2) */}
          <div className="rounded-xl border bg-card p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#5cb847]/10 text-[#5cb847] uppercase tracking-wider">
                  Section 3
                </span>
                <h2 className="text-xl font-semibold">
                  Research <span className="font-serif italic text-[#5cb847]">insights</span>
                </h2>
              </div>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => appendInsight({ text: "" })}
                className="gap-1.5"
              >
                <Plus className="h-4 w-4" /> Add Insight Card
              </Button>
            </div>

            <DragDropContext onDragEnd={onDragEndInsights}>
              <Droppable droppableId="insights-list">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                    {insightFields.map((field, index) => (
                      <Draggable key={field.id} draggableId={field.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`p-4 rounded-xl border bg-background flex items-center gap-3 transition-shadow ${
                              snapshot.isDragging ? 'shadow-lg border-primary z-50 relative' : ''
                            }`}
                          >
                            <div 
                              {...provided.dragHandleProps}
                              className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
                            >
                              <GripVertical className="h-4 w-4" />
                            </div>

                            {/* Green number circle matching Screenshot 2 */}
                            <div className="w-7 h-7 rounded-full bg-[#5cb847] text-zinc-950 font-bold text-xs flex items-center justify-center shrink-0">
                              {index + 1}
                            </div>

                            <FormField
                              control={form.control}
                              name={`details.insights.${index}.text`}
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormControl>
                                    <Input 
                                      placeholder={`e.g. Competitors look nearly identical — there was room to stand out.`} 
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="icon" 
                              className="text-destructive hover:bg-destructive/10" 
                              onClick={() => removeInsight(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            
            {insightFields.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-6 border rounded-xl border-dashed">
                No research insights added. Click "Add Insight Card" above.
              </p>
            )}
          </div>

          {/* Section 4: Design process (Matches Screenshot 3) */}
          <div className="rounded-xl border bg-card p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#5cb847]/10 text-[#5cb847] uppercase tracking-wider">
                  Section 4
                </span>
                <h2 className="text-xl font-semibold">
                  Design <span className="font-serif italic text-[#5cb847]">process</span>
                </h2>
              </div>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => appendStep({ 
                  number: `Step 0${stepFields.length + 1}`, 
                  title: "", 
                  desc: "" 
                })}
                className="gap-1.5"
              >
                <Plus className="h-4 w-4" /> Add Process Step
              </Button>
            </div>

            <DragDropContext onDragEnd={onDragEndSteps}>
              <Droppable droppableId="steps-list">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                    {stepFields.map((field, index) => (
                      <Draggable key={field.id} draggableId={field.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`p-5 rounded-xl border bg-background space-y-4 relative group ${
                              snapshot.isDragging ? 'shadow-lg border-primary z-50' : ''
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div 
                                  {...provided.dragHandleProps}
                                  className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
                                >
                                  <GripVertical className="h-4 w-4" />
                                </div>
                                <span className="text-xs font-mono font-bold text-[#5cb847] uppercase">
                                  Step {index + 1}
                                </span>
                              </div>
                              <Button 
                                type="button" 
                                variant="ghost" 
                                size="icon" 
                                className="text-destructive h-8 w-8 hover:bg-destructive/10" 
                                onClick={() => removeStep(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-3">
                              <FormField
                                control={form.control}
                                name={`details.steps.${index}.number`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Step Number Tag</FormLabel>
                                    <FormControl>
                                      <Input placeholder="e.g. STEP 01" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name={`details.steps.${index}.title`}
                                render={({ field }) => (
                                  <FormItem className="sm:col-span-2">
                                    <FormLabel>Step Title</FormLabel>
                                    <FormControl>
                                      <Input placeholder="e.g. Discover, Define, Design, Deliver" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <FormField
                              control={form.control}
                              name={`details.steps.${index}.desc`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Step Description</FormLabel>
                                  <FormControl>
                                    <Textarea 
                                      placeholder="Brief, research and audit of existing material and competitors..." 
                                      className="min-h-[70px]" 
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
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

            {stepFields.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-6 border rounded-xl border-dashed">
                No process steps added. Click "Add Process Step" above.
              </p>
            )}
          </div>

          {/* Section 5: Final outputs (Matches Screenshot 3) */}
          <div className="rounded-xl border bg-card p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#5cb847]/10 text-[#5cb847] uppercase tracking-wider">
                  Section 5
                </span>
                <h2 className="text-xl font-semibold">
                  Final <span className="font-serif italic text-[#5cb847]">outputs</span>
                </h2>
              </div>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => appendOutput({ title: "", type: "Identity", image_url: "" })}
                className="gap-1.5"
              >
                <Plus className="h-4 w-4" /> Add Output Card
              </Button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {outputFields.map((field, index) => {
                const currentImg = form.watch(`details.outputs.${index}.image_url`);
                const isUploading = !!outputUploadProgress[index];

                return (
                  <div key={field.id} className="p-5 rounded-xl border bg-background flex flex-col justify-between gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase text-muted-foreground">
                        Output Card #{index + 1}
                      </span>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        className="text-destructive h-8 w-8 hover:bg-destructive/10" 
                        onClick={() => removeOutput(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Image Preview / Upload Area */}
                    <div className="rounded-xl border border-dashed p-4 flex flex-col items-center justify-center text-center bg-muted/20 relative group overflow-hidden min-h-[140px]">
                      {currentImg ? (
                        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border">
                          <img src={currentImg} alt="Output Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => form.setValue(`details.outputs.${index}.image_url`, "")}
                            >
                              Remove Image
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 py-4">
                          <ImageIcon className="h-8 w-8 text-muted-foreground/60" />
                          <p className="text-xs text-muted-foreground">Upload output visual</p>
                          <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                            <Upload className="h-3 w-3" />
                            <span>Browse files</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleOutputImageUpload(index, e)}
                              disabled={isUploading}
                            />
                          </label>
                          {isUploading && (
                            <div className="w-full space-y-1 mt-2">
                              <Progress value={outputUploadProgress[index]} className="h-1" />
                              <span className="text-[10px] text-muted-foreground">Uploading...</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name={`details.outputs.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">Output Title</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Logo system, Brand guidelines" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {outputFields.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-6 border rounded-xl border-dashed">
                No final outputs added. Click "Add Output Card" above.
              </p>
            )}
          </div>

          <div className="flex justify-end gap-4 pb-12">
            <Button type="button" variant="outline" asChild>
              <Link to="/admin/works">Cancel</Link>
            </Button>
            <Button type="submit" size="lg" disabled={form.formState.isSubmitting || uploading}>
              {form.formState.isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save Work Project
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
