import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";

type Category = {
  id: string;
  name: string;
  slug: string;
  type: string;
  created_at: string;
};

export default function CategoriesList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const defaultCategories: Category[] = [
    { id: "1", name: "Branding", slug: "branding", type: "work", created_at: new Date().toISOString() },
    { id: "2", name: "UI/UX Design", slug: "ui-ux-design", type: "work", created_at: new Date().toISOString() },
    { id: "3", name: "Design Systems", slug: "design-systems", type: "work", created_at: new Date().toISOString() },
    { id: "4", name: "Web Design", slug: "web-design", type: "work", created_at: new Date().toISOString() },
    { id: "5", name: "Mobile App", slug: "mobile-app", type: "work", created_at: new Date().toISOString() },
    { id: "case-1", name: "FinTech & Banking", slug: "fintech-banking", type: "case", created_at: new Date().toISOString() },
    { id: "case-2", name: "SaaS Platforms", slug: "saas-platforms", type: "case", created_at: new Date().toISOString() },
    { id: "case-3", name: "Strategic Branding", slug: "strategic-branding", type: "case", created_at: new Date().toISOString() },
    { id: "case-4", name: "Design Systems", slug: "case-design-systems", type: "case", created_at: new Date().toISOString() },
    { id: "6", name: "Design Thinking", slug: "design-thinking", type: "blog", created_at: new Date().toISOString() },
    { id: "7", name: "System Architecture", slug: "system-architecture", type: "blog", created_at: new Date().toISOString() },
  ];

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        setCategories(data);
      } else {
        const stored = localStorage.getItem("admin_categories");
        if (stored) {
          setCategories(JSON.parse(stored));
        } else {
          setCategories(defaultCategories);
          localStorage.setItem("admin_categories", JSON.stringify(defaultCategories));
        }
      }
    } catch {
      const stored = localStorage.getItem("admin_categories");
      if (stored) {
        setCategories(JSON.parse(stored));
      } else {
        setCategories(defaultCategories);
        localStorage.setItem("admin_categories", JSON.stringify(defaultCategories));
      }
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      await supabase.from("categories").delete().eq("id", id);
    } catch (err) {
      console.log(err);
    }

    const stored = localStorage.getItem("admin_categories");
    const list = stored ? JSON.parse(stored) : defaultCategories;
    const updated = list.filter((c: Category) => c.id !== id);
    localStorage.setItem("admin_categories", JSON.stringify(updated));
    setCategories(updated);

    toast({
      title: "Category deleted",
    });
  };

  const CategoryTable = ({ title, data }: { title: string, data: Category[] }) => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12">
                  <div className="flex justify-center items-center text-muted-foreground">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No {title.toLowerCase()} found.
                </TableCell>
              </TableRow>
            ) : (
              data.map((category) => (
                <TableRow key={category.id} className="group hover:bg-[#5cb847]/5 transition-colors">
                  <TableCell className="font-medium group-hover:text-[#5cb847] transition-colors">{category.name}</TableCell>
                  <TableCell className="text-muted-foreground group-hover:text-foreground transition-colors">{category.slug}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(category.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="hover:text-[#5cb847] hover:bg-[#5cb847]/10 transition-colors" asChild>
                        <Link to={`/admin/categories/${category.id}`}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDelete(category.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
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
        <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
        <Button asChild>
          <Link to="/admin/categories/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Link>
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <CategoryTable title="Work Categories" data={categories.filter(c => c.type === 'work')} />
        <CategoryTable title="Case Study Categories" data={categories.filter(c => c.type === 'case')} />
        <CategoryTable title="Blog Categories" data={categories.filter(c => c.type === 'blog')} />
      </div>
    </div>
  );
}
