import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, ArrowLeft, Trash2, Plus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import MDEditor from "@uiw/react-md-editor";

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  slug: z.string().min(2),
  category_id: z.string().min(1, { message: "Please select a category." }),
  content: z.string().min(10),
  image_url: z.string().optional(),
  published: z.boolean().default(false),
});

type Category = {
  id: string;
  name: string;
};

export default function BlogForm() {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [newCatName, setNewCatName] = useState("");
  const [isCatDialogOpen, setIsCatDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      category_id: "",
      content: "",
      image_url: "",
      published: false,
    },
  });

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    setLoading(true);
    // Fetch categories
    const { data: cats, error: catsError } = await supabase
      .from("categories")
      .select("id, name")
      .eq("type", "blog")
      .order("name");

    if (cats) setCategories(cats);
    if (catsError) {
      toast({ variant: "destructive", title: "Error fetching categories", description: catsError.message });
    }

    if (isEditing) {
      const { data: blog, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        toast({ variant: "destructive", title: "Error fetching blog", description: error.message });
        navigate("/admin/blogs");
      } else if (blog) {
        form.reset({
          title: blog.title,
          slug: blog.slug,
          category_id: blog.category_id || "",
          content: blog.content || "",
          image_url: blog.image_url || "",
          published: blog.published || false,
        });
      }
    }
    setLoading(false);
  };

  const handleCreateCategory = async () => {
    if (!newCatName.trim()) return;
    const slug = newCatName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    
    const { data, error } = await supabase.from("categories").insert([
      { name: newCatName, slug, type: "blog" }
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
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `blogs/${fileName}`;

    setUploading(true);
    setUploadProgress(10);
    
    // Fake progress interval
    const interval = setInterval(() => {
      setUploadProgress((prev) => (prev >= 90 ? 90 : prev + 10));
    }, 200);

    const { error: uploadError } = await supabase.storage
      .from('images') // Assumes a bucket named 'images' exists
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
      setTimeout(() => setUploadProgress(0), 1000); // hide progress bar after a moment
    }
    setUploading(false);
  };

  const handleRemoveImage = async () => {
    const currentUrl = form.getValues("image_url");
    if (!currentUrl) return;

    // Try to delete from storage if it exists
    try {
      const urlParts = currentUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];
      const folderName = urlParts[urlParts.length - 2];
      
      // if it's our bucket
      if (folderName === 'blogs') {
        const filePath = `blogs/${fileName}`;
        await supabase.storage.from('images').remove([filePath]);
      }
    } catch (e) {
      console.error("Error removing old image", e);
    }

    form.setValue("image_url", "");
    toast({ title: "Image removed" });
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (isEditing) {
        const { error } = await supabase
          .from("blogs")
          .update(values)
          .eq("id", id);
        if (error) throw error;
        toast({ title: "Blog updated successfully" });
      } else {
        const { error } = await supabase.from("blogs").insert([values]);
        if (error) throw error;
        toast({ title: "Blog created successfully" });
      }
      navigate("/admin/blogs");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error saving blog",
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
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link to="/admin/blogs">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">
          {isEditing ? "Edit Blog Post" : "Create Blog Post"}
        </h1>
      </div>

      <div className="rounded-md border bg-card p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. How to learn React"
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
                      <Input placeholder="e.g. how-to-learn-react" {...field} />
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
                              placeholder="e.g. Design Systems" 
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
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <div data-color-mode="light" className="w-full">
                      <MDEditor
                        value={field.value}
                        onChange={(val) => field.onChange(val || "")}
                        height={400}
                        preview="live"
                      />
                    </div>
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
                  <FormLabel>Cover Image</FormLabel>
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
                        <FormDescription>Recommended aspect ratio: 16:9 (e.g., 1280x720px)</FormDescription>
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

            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Publish Post
                    </FormLabel>
                    <FormDescription>
                      Make this blog post visible to the public.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" asChild>
                <Link to="/admin/blogs">Cancel</Link>
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting || uploading}>
                {form.formState.isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save Post
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
