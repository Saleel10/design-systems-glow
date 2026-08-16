import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/lib/supabase";
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
import { Loader2, ArrowLeft, Trash2, Plus, X, GripVertical } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  slug: z.string().min(2),
  description: z.string().min(10, { message: "Short description excerpt is required." }),
  category_id: z.string().min(1, { message: "Please select a category." }),
  image_url: z.string().optional(),
  details: z.object({
    overview: z.string().optional(),
    tools: z.string().optional(),
    problem: z.string().optional(),
    insights: z.array(z.object({ text: z.string() })).default([]),
    progress: z.array(z.object({ title: z.string(), description: z.string() })).default([]),
    screens: z.array(z.object({ title: z.string(), urls: z.array(z.string()) })).default([]),
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
  const [screenUploadProgress, setScreenUploadProgress] = useState<Record<number, number>>({});
  
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
        tools: "",
        problem: "",
        insights: [],
        progress: [],
        screens: [],
      }
    },
  });

  const { fields: insightFields, append: appendInsight, remove: removeInsight, move: moveInsight } = useFieldArray({
    control: form.control,
    name: "details.insights",
  });

  const { fields: progressFields, append: appendProgress, remove: removeProgress, move: moveProgress } = useFieldArray({
    control: form.control,
    name: "details.progress",
  });

  const onDragEndInsights = (result: DropResult) => {
    if (!result.destination) return;
    moveInsight(result.source.index, result.destination.index);
  };

  const onDragEndProgress = (result: DropResult) => {
    if (!result.destination) return;
    moveProgress(result.source.index, result.destination.index);
  };

  const { fields: screenFields, append: appendScreen, remove: removeScreen } = useFieldArray({
    control: form.control,
    name: "details.screens",
  });

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    setLoading(true);
    const { data: cats, error: catsError } = await supabase
      .from("categories")
      .select("id, name")
      .eq("type", "work")
      .order("name");

    if (cats) setCategories(cats);
    if (catsError) {
      toast({ variant: "destructive", title: "Error fetching categories", description: catsError.message });
    }

    if (isEditing) {
      const { data: work, error: workError } = await supabase
        .from("works")
        .select("*")
        .eq("id", id)
        .single();

      if (workError) {
        toast({ variant: "destructive", title: "Error fetching work", description: workError.message });
        navigate("/admin/works");
      } else if (work) {
        const details = work.details || {};
        
        // Normalize legacy { url: string } to { urls: string[] } just in case
        const normalizedScreens = (details.screens || []).map((s: any) => ({
          title: s.title || "",
          urls: s.urls || (s.url ? [s.url] : [])
        }));
        
        form.reset({
          title: work.title,
          slug: work.slug,
          description: work.description || "",
          category_id: work.category_id || "",
          image_url: work.image_url || "",
          details: {
            overview: details.overview || "",
            tools: details.tools || "",
            problem: details.problem || "",
            insights: details.insights || [],
            progress: details.progress || [],
            screens: normalizedScreens,
          }
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
    ]).select().single();

    if (error) {
      toast({ variant: "destructive", title: "Error creating category", description: error.message });
    } else if (data) {
      setCategories([...categories, data]);
      form.setValue("category_id", data.id);
      setIsCatDialogOpen(false);
      setNewCatName("");
      toast({ title: "Category created successfully" });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `works/${fileName}`;

    setUploading(true);
    setUploadProgress(10);
    
    const interval = setInterval(() => {
      setUploadProgress((prev) => (prev >= 90 ? 90 : prev + 10));
    }, 200);

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    clearInterval(interval);

    if (uploadError) {
      setUploadProgress(0);
      toast({ variant: "destructive", title: "Upload failed", description: uploadError.message });
    } else {
      setUploadProgress(100);
      const { data } = supabase.storage.from('images').getPublicUrl(filePath);
      form.setValue("image_url", data.publicUrl);
      toast({ title: "Image uploaded successfully" });
      setTimeout(() => setUploadProgress(0), 1000);
    }
    setUploading(false);
  };

  const handleScreenImagesUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const files = Array.from(e.target.files);

    setScreenUploadProgress(prev => ({ ...prev, [index]: 10 }));
    
    const uploadedUrls: string[] = [];
    let hasError = false;

    const interval = setInterval(() => {
      setScreenUploadProgress(prev => ({ ...prev, [index]: Math.min((prev[index] || 10) + 5, 90) }));
    }, 200);

    try {
      const uploadPromises = files.map(async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `works/screens/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;
        
        const { data } = supabase.storage.from('images').getPublicUrl(filePath);
        return data.publicUrl;
      });

      const urls = await Promise.all(uploadPromises);
      uploadedUrls.push(...urls);

      if (uploadedUrls.length > 0) {
        const currentUrls = form.getValues(`details.screens.${index}.urls`) || [];
        form.setValue(`details.screens.${index}.urls`, [...currentUrls, ...uploadedUrls]);
        toast({ title: "Images uploaded successfully" });
      }
    } catch (err: any) {
      toast({ variant: "destructive", title: "Upload failed", description: err.message });
    } finally {
      clearInterval(interval);
      setScreenUploadProgress(prev => ({ ...prev, [index]: 100 }));
      setTimeout(() => {
        setScreenUploadProgress(prev => {
          const newState = { ...prev };
          delete newState[index];
          return newState;
        });
      }, 1000);
      e.target.value = '';
    }
  };

  const handleRemoveImage = async () => {
    form.setValue("image_url", "");
    toast({ title: "Image removed" });
  };

  const handleRemoveScreenImage = (screenIndex: number, urlIndex: number) => {
    const currentUrls = form.getValues(`details.screens.${screenIndex}.urls`) || [];
    const newUrls = currentUrls.filter((_, idx) => idx !== urlIndex);
    form.setValue(`details.screens.${screenIndex}.urls`, newUrls);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
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
      navigate("/admin/works");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error saving work",
        description: error.message,
      });
    }
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
        <h1 className="text-3xl font-bold tracking-tight">
          {isEditing ? "Edit Work" : "Create Work"}
        </h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Details */}
          <div className="rounded-xl border bg-card p-6 space-y-6">
            <h2 className="text-xl font-semibold mb-4">Basic Settings</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Awesome Project"
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
                      <Input placeholder="e.g. awesome-project" {...field} />
                    </FormControl>
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
                          <SelectValue placeholder="Select a category" />
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
                              placeholder="e.g. App Design" 
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
                  <FormLabel>Short Description Excerpt (for list view)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief excerpt for the works list..."
                      className="min-h-[80px]"
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
                  <FormLabel>Main Cover Image</FormLabel>
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
                        <FormDescription>Recommended aspect ratio: 16:9 or 4:3 (e.g., 1280x720px)</FormDescription>
                      )}
                      
                      {uploading && uploadProgress > 0 && (
                        <div className="space-y-2">
                          <Progress value={uploadProgress} />
                          <p className="text-sm text-muted-foreground text-center">Uploading... {uploadProgress}%</p>
                        </div>
                      )}
                    </div>
                    {field.value && !uploading && (
                      <div className="relative group rounded-md overflow-hidden border">
                        <img src={field.value} alt="Preview" className="h-32 object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button 
                            type="button" 
                            variant="destructive" 
                            size="icon"
                            onClick={handleRemoveImage}
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

          {/* Structured Details Layout */}
          <div className="rounded-xl border bg-card p-6 space-y-8">
            <h2 className="text-xl font-semibold mb-6 text-primary">Case Study Content</h2>
            
            {/* Overview & Tools */}
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="details.overview"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Overview</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Full project overview..." className="min-h-[120px]" {...field} />
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
                    <FormLabel>Tools Used (comma separated)</FormLabel>
                    <FormControl>
                      <Input placeholder="Figma, React, Node.js..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            {/* The Problem */}
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="details.problem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>The Problem</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe the core problem this project solves..." className="min-h-[120px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            {/* Research Insights */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel className="text-base font-semibold">Research Insights</FormLabel>
                <Button type="button" variant="outline" size="sm" onClick={() => appendInsight({ text: "" })}>
                  <Plus className="mr-2 h-4 w-4" /> Add Insight
                </Button>
              </div>
              <div className="space-y-3">
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
                                className={`flex gap-2 items-start ${snapshot.isDragging ? 'opacity-75 relative z-50' : ''}`}
                              >
                                <div 
                                  {...provided.dragHandleProps}
                                  className="mt-3 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
                                >
                                  <GripVertical className="h-4 w-4" />
                                </div>
                                <FormField
                                  control={form.control}
                                  name={`details.insights.${index}.text`}
                                  render={({ field }) => (
                                    <FormItem className="flex-1">
                                      <FormControl>
                                        <Input placeholder={`Insight point ${index + 1}...`} {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <Button type="button" variant="ghost" size="icon" className="text-destructive mt-0.5" onClick={() => removeInsight(index)}>
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
                  <p className="text-sm text-muted-foreground text-center py-4 border rounded-md border-dashed">No insights added.</p>
                )}
              </div>
            </div>

            <Separator />

            {/* Design Progress */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel className="text-base font-semibold">Design Progress (Steps)</FormLabel>
                <Button type="button" variant="outline" size="sm" onClick={() => appendProgress({ title: "", description: "" })}>
                  <Plus className="mr-2 h-4 w-4" /> Add Step
                </Button>
              </div>
              <div className="space-y-4">
                <DragDropContext onDragEnd={onDragEndProgress}>
                  <Droppable droppableId="progress-list">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                        {progressFields.map((field, index) => (
                          <Draggable key={field.id} draggableId={field.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className={`p-4 border rounded-lg bg-background relative group ${snapshot.isDragging ? 'border-primary shadow-md opacity-90 z-50' : ''}`}
                              >
                                <div 
                                  {...provided.dragHandleProps}
                                  className="absolute top-4 left-2 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
                                >
                                  <GripVertical className="h-4 w-4" />
                                </div>
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                   <Button type="button" variant="ghost" size="icon" className="text-destructive h-8 w-8" onClick={() => removeProgress(index)}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                                <div className="grid gap-4 mt-2 pl-6">
                                  <FormField
                                    control={form.control}
                                    name={`details.progress.${index}.title`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Step {index + 1} Title</FormLabel>
                                        <FormControl>
                                          <Input placeholder="e.g. Wireframing" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name={`details.progress.${index}.description`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Step {index + 1} Description</FormLabel>
                                        <FormControl>
                                          <Textarea placeholder="Describe this phase..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
                {progressFields.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4 border rounded-md border-dashed">No progress steps added.</p>
                )}
              </div>
            </div>

            <Separator />

            {/* Final Output Screens */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel className="text-base font-semibold">Final Output Image Groups</FormLabel>
                <Button type="button" variant="secondary" size="sm" onClick={() => appendScreen({ title: "", urls: [] })}>
                  <Plus className="mr-2 h-4 w-4" /> Add Image Group
                </Button>
              </div>
              <div className="grid gap-6">
                {screenFields.map((field, index) => {
                  const screenUrls = form.watch(`details.screens.${index}.urls`) || [];
                  const isUploading = !!screenUploadProgress[index];
                  
                  return (
                    <div key={field.id} className="p-4 border rounded-lg bg-background relative flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Group {index + 1}</span>
                        <Button type="button" variant="ghost" size="icon" className="text-destructive h-8 w-8" onClick={() => removeScreen(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name={`details.screens.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Group Caption / Title (e.g. Onboarding Flow)" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex-1 flex flex-col gap-4">
                        {screenUrls.length > 0 && (
                          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 mt-2">
                            {screenUrls.map((url, urlIndex) => (
                              <div key={urlIndex} className="relative group rounded-md overflow-hidden border aspect-square">
                                <img src={url} alt={`Preview ${urlIndex + 1}`} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <Button type="button" variant="destructive" size="icon" className="h-6 w-6" onClick={() => handleRemoveScreenImage(index, urlIndex)}>
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <div className="mt-2 space-y-2">
                          <Input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => handleScreenImagesUpload(index, e)}
                            disabled={isUploading}
                          />
                          <p className="text-[0.8rem] text-muted-foreground mt-1">Recommended aspect ratio: 4:3 (e.g., 800x600px)</p>
                          {isUploading && (
                            <div className="space-y-2 mt-2">
                              <Progress value={screenUploadProgress[index]} className="h-1" />
                              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                                <Loader2 className="h-3 w-3 animate-spin" />
                                <span>Uploading Images...</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                {screenFields.length === 0 && (
                  <div className="col-span-full">
                    <p className="text-sm text-muted-foreground text-center py-8 border rounded-md border-dashed">No image groups added.</p>
                  </div>
                )}
              </div>
            </div>
            
          </div>

          <div className="flex justify-end gap-4 pb-12">
            <Button type="button" variant="outline" asChild>
              <Link to="/admin/works">Cancel</Link>
            </Button>
            <Button type="submit" size="lg" disabled={form.formState.isSubmitting || uploading || Object.keys(screenUploadProgress).length > 0}>
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
