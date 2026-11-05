import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";
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
  deleteSyncedCategory,
  sortWorkCategories,
  SyncedCategory,
} from "@/lib/portfolioDataSync";

export default function CategoriesList() {
  const [categories, setCategories] = useState<SyncedCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchCategories = async () => {
    setLoading(true);
    const data = await getSyncedCategories();
    setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();

    window.addEventListener("portfolio_data_updated", fetchCategories);
    return () => window.removeEventListener("portfolio_data_updated", fetchCategories);
  }, []);

  const handleDelete = async (id: string, type?: 'work' | 'case' | 'blog') => {
    await deleteSyncedCategory(id, type);
    setCategories((prev) =>
      prev.filter((c) => !(c.id === id || (type && c.slug === id && c.type === type)))
    );

    toast({
      title: "Category deleted",
    });
  };

  const CategoryTable = ({
    title,
    data,
    type,
  }: {
    title: string;
    data: SyncedCategory[];
    type: "work" | "case" | "blog";
  }) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        <Button variant="outline" size="sm" asChild>
          <Link to={`/admin/categories/new?type=${type}`}>
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Add
          </Link>
        </Button>
      </div>
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead className="w-[84px] text-right pr-3">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-12">
                  <div className="flex justify-center items-center text-muted-foreground">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                  No {title.toLowerCase()} found.
                </TableCell>
              </TableRow>
            ) : (
              data.map((category) => (
                <TableRow key={category.id} className="group hover:bg-[#5cb847]/5 transition-colors">
                  <TableCell className="font-medium group-hover:text-[#5cb847] transition-colors py-3">
                    {category.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground group-hover:text-foreground transition-colors font-mono text-xs py-3">
                    {category.slug}
                  </TableCell>
                  <TableCell className="text-right py-3 pr-2">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:text-[#5cb847] hover:bg-[#5cb847]/10 transition-colors"
                        asChild
                      >
                        <Link to={`/admin/categories/${category.id}?type=${category.type || type}`}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors"
                            title="Delete category"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Category?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete the "{category.name}" category? This cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(category.id, category.type || type)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
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

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your taxonomy across works, case studies, and blogs.
          </p>
        </div>
        <Button asChild>
          <Link to="/admin/categories/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Link>
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <CategoryTable title="Work Categories" type="work" data={sortWorkCategories(categories.filter(c => c.type === 'work'))} />
        <CategoryTable title="Case Study Categories" type="case" data={categories.filter(c => c.type === 'case')} />
        <CategoryTable title="Blog Categories" type="blog" data={categories.filter(c => c.type === 'blog')} />
      </div>
    </div>
  );
}
