import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { CASES, CaseStudy } from "@/data/portfolioData";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
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

import { getSyncedCases, notifyPortfolioDataUpdated } from "@/lib/portfolioDataSync";

export default function CasesList() {
  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCases();
    const handleUpdate = () => fetchCases();
    window.addEventListener("portfolio_data_updated", handleUpdate);
    return () => window.removeEventListener("portfolio_data_updated", handleUpdate);
  }, []);

  const fetchCases = async () => {
    setLoading(true);
    const data = await getSyncedCases();
    setCases(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await supabase.from("case_studies").delete().eq("id", id);
    } catch {
      // Ignore
    }

    const updated = cases.filter((c) => c.id !== id);
    setCases(updated);
    localStorage.setItem("admin_cases", JSON.stringify(updated));
    notifyPortfolioDataUpdated();

    toast({
      title: "Case study deleted",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Case Studies</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your in-depth strategic project case studies.
          </p>
        </div>
        <Button asChild>
          <Link to="/admin/cases/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Case Study
          </Link>
        </Button>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Tag / Scope</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="w-[130px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : cases.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No case studies found. Create your first case study above.
                </TableCell>
              </TableRow>
            ) : (
              cases.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-semibold text-foreground">{c.client}</TableCell>
                  <TableCell className="max-w-md truncate">{c.title}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#5cb847]/10 text-[#5cb847] border border-[#5cb847]/30">
                      {c.tag}
                    </span>
                  </TableCell>
                  <TableCell>{c.year}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">{c.role}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" asChild title="View on site">
                        <Link to={`/cases/${c.id}`} target="_blank">
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild title="Edit case study">
                        <Link to={`/admin/cases/${c.id}/edit`}>
                          <Pencil className="h-4 w-4 text-primary" />
                        </Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" title="Delete case study">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the case study "{c.client}".
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(c.id)}
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
}
