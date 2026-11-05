import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, ArrowLeft, Trash2 } from "lucide-react";
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
import {
  getSyncedCategories,
  saveSyncedCategory,
  deleteSyncedCategory,
} from "@/lib/portfolioDataSync";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  slug: z.string().min(2, {
    message: "Slug must be at least 2 characters.",
  }).regex(/^[a-z0-9-]+$/, {
    message: "Slug can only contain lowercase letters, numbers, and hyphens.",
  }),
  type: z.enum(["work", "case", "blog"]),
});

export default function CategoryForm() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const queryType = searchParams.get("type");
  const isEditing = !!id;
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(isEditing);

  const initialType: "work" | "case" | "blog" =
    queryType === "blog" || queryType === "case" || queryType === "work"
      ? queryType
      : "work";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      type: initialType,
    },
  });

  useEffect(() => {
    if (isEditing) {
      fetchCategory();
    }
  }, [id, queryType]);

  const fetchCategory = async () => {
    const list = await getSyncedCategories();
    // Match by ID and queryType first to distinguish categories that share the same slug/name across types
    let catData = list.find((c: any) => c.id === id && (!queryType || c.type === queryType));
    if (!catData) {
      catData = list.find((c: any) => c.id === id);
    }
    if (!catData && queryType) {
      catData = list.find((c: any) => c.slug === id && c.type === queryType);
    }
    if (!catData) {
      catData = list.find((c: any) => c.slug === id);
    }

    if (!catData) {
      toast({
        variant: "destructive",
        title: "Category not found",
        description: "Could not find the requested category.",
      });
      navigate("/admin/categories");
    } else {
      form.reset({
        name: catData.name,
        slug: catData.slug,
        type: catData.type || initialType,
      });
    }
    setLoading(false);
  };

  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!id) return;
    setDeleting(true);
    try {
      await deleteSyncedCategory(id, form.getValues("type") || initialType);
      toast({
        title: "Category deleted",
        description: `"${form.getValues("name")}" category has been removed.`,
      });
      navigate("/admin/categories");
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error deleting category",
        description: err?.message || "Could not delete category.",
      });
    } finally {
      setDeleting(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await saveSyncedCategory({
        ...(isEditing && id ? { id } : {}),
        name: values.name,
        slug: values.slug,
        type: values.type,
      });

      toast({
        title: isEditing ? "Category updated successfully" : "Category created successfully",
      });
      navigate("/admin/categories");
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error saving category",
        description: err?.message || "Could not save category.",
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
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link to="/admin/categories">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">
          {isEditing ? "Edit Category" : "Create Category"}
        </h1>
      </div>

      <div className="rounded-md border bg-card p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Web Design"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        // Auto-generate slug if we are creating
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
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="work">Work</SelectItem>
                      <SelectItem value="case">Case Study</SelectItem>
                      <SelectItem value="blog">Blog</SelectItem>
                    </SelectContent>
                  </Select>
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
                    <Input placeholder="e.g. web-design" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t">
              <div>
                {isEditing && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        type="button"
                        variant="destructive"
                        disabled={deleting || form.formState.isSubmitting}
                        className="gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete Category
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Category?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this category? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDelete}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Button type="button" variant="outline" asChild>
                  <Link to="/admin/categories">Cancel</Link>
                </Button>
                <Button type="submit" disabled={form.formState.isSubmitting || deleting}>
                  {form.formState.isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Save Category
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
