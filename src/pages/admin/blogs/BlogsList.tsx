import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Plus, Pencil, Trash2, RotateCcw, ImageIcon } from "lucide-react";
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

import {
  getSyncedBlogs,
  deleteSyncedBlog,
  restoreDefaultBlogs,
  DEFAULT_BLOGS,
  notifyPortfolioDataUpdated,
} from "@/lib/portfolioDataSync";

export const getDefaultBlogs = (): Blog[] => DEFAULT_BLOGS as any as Blog[];

export default function BlogsList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [restoring, setRestoring] = useState(false);
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
    setBlogs(data as any as Blog[]);
    setLoading(false);
  };

  const handleRestoreDefaults = async () => {
    setRestoring(true);
    try {
      const restored = await restoreDefaultBlogs();
      setBlogs(restored as any as Blog[]);
      toast({
        title: "Default blogs restored",
        description: "All original articles are now available in the admin panel.",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Error restoring default blogs",
      });
    } finally {
      setRestoring(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteSyncedBlog(id);
    setBlogs((prev) => prev.filter((b) => b.id !== id && b.slug !== id));
    toast({
      title: "Blog post deleted",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blogs</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your articles, design notes, and published guides.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRestoreDefaults}
            disabled={restoring}
            className="hover:border-[#5cb847]/40 hover:text-[#5cb847]"
          >
            <RotateCcw className={`mr-2 h-4 w-4 ${restoring ? "animate-spin" : ""}`} />
            Restore All Defaults
          </Button>
          <Button asChild>
            <Link to="/admin/blogs/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Blog
            </Link>
          </Button>
        </div>
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
                <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                  <p className="mb-3">No blogs found.</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRestoreDefaults}
                    disabled={restoring}
                  >
                    <RotateCcw className={`mr-2 h-4 w-4 ${restoring ? "animate-spin" : ""}`} />
                    Restore Default Blogs
                  </Button>
                </TableCell>
              </TableRow>
            ) : (
              blogs.map((blog) => (
                <TableRow key={blog.id} className="group hover:bg-[#5cb847]/5 transition-colors">
                  <TableCell className="font-medium group-hover:text-[#5cb847] transition-colors">
                    <div className="flex items-center gap-3">
                      {blog.image_url ? (
                        <div className="w-10 h-10 rounded-md overflow-hidden bg-muted border shrink-0">
                          <img src={blog.image_url} alt="" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-md bg-muted/60 border shrink-0 flex items-center justify-center text-muted-foreground/60">
                          <ImageIcon className="w-4 h-4" />
                        </div>
                      )}
                      <span>{blog.title}</span>
                    </div>
                  </TableCell>
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
