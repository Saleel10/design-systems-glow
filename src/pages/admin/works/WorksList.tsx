import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { projects } from "@/data/projects";
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

import { getSyncedWorks, DEFAULT_WORKS, notifyPortfolioDataUpdated, SyncedWork } from "@/lib/portfolioDataSync";

export type Work = SyncedWork;

export const getDefaultWorks = (): Work[] => DEFAULT_WORKS;

export default function WorksList() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchWorks();
    const handleUpdate = () => fetchWorks();
    window.addEventListener("portfolio_data_updated", handleUpdate);
    return () => window.removeEventListener("portfolio_data_updated", handleUpdate);
  }, []);

  const fetchWorks = async () => {
    setLoading(true);
    const data = await getSyncedWorks();
    setWorks(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await supabase.from("works").delete().eq("id", id);
    } catch (err) {
      console.log(err);
    }

    // Always update local storage as well
    const stored = localStorage.getItem("admin_works");
    if (stored) {
      const list = JSON.parse(stored);
      const updated = list.filter((w: Work) => w.id !== id && w.slug !== id);
      localStorage.setItem("admin_works", JSON.stringify(updated));
      setWorks(updated);
    } else {
      setWorks((prev) => prev.filter((w) => w.id !== id && w.slug !== id));
    }

    notifyPortfolioDataUpdated();

    toast({
      title: "Work deleted",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Works</h1>
        <Button asChild>
          <Link to="/admin/works/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Work
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
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12">
                  <div className="flex justify-center items-center text-muted-foreground">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                </TableCell>
              </TableRow>
            ) : works.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No works found.
                </TableCell>
              </TableRow>
            ) : (
              works.map((work) => (
                <TableRow key={work.id} className="group hover:bg-[#5cb847]/5 transition-colors">
                  <TableCell className="font-medium group-hover:text-[#5cb847] transition-colors">{work.title}</TableCell>
                  <TableCell className="text-muted-foreground">{work.slug}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#5cb847]/10 text-[#5cb847] border border-[#5cb847]/30">
                      {work.categories?.name || "Uncategorized"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/admin/works/${work.id}`}>
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
                              This action cannot be undone. This will permanently delete this work and remove its data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(work.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
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
