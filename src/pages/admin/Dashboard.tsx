import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { CASES } from "@/data/portfolioData";

import { getSyncedWorks, getSyncedCases, getSyncedBlogs } from "@/lib/portfolioDataSync";

export default function Dashboard() {
  const [worksCount, setWorksCount] = useState<number | null>(null);
  const [casesCount, setCasesCount] = useState<number | null>(null);
  const [blogsCount, setBlogsCount] = useState<number | null>(null);

  useEffect(() => {
    fetchCounts();
    const handleUpdate = () => fetchCounts();
    window.addEventListener("portfolio_data_updated", handleUpdate);
    return () => window.removeEventListener("portfolio_data_updated", handleUpdate);
  }, []);

  const fetchCounts = async () => {
    try {
      const [w, c, b] = await Promise.all([
        getSyncedWorks(),
        getSyncedCases(),
        getSyncedBlogs(),
      ]);
      setWorksCount(w.length);
      setCasesCount(c.length);
      setBlogsCount(b.length);
    } catch {
      setWorksCount(0);
      setCasesCount(0);
      setBlogsCount(0);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the admin panel. Manage your portfolio content here.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {worksCount !== null ? worksCount : "--"}
            </div>
            <p className="text-xs text-muted-foreground">
              Total published & draft projects
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Case Studies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {casesCount !== null ? casesCount : "--"}
            </div>
            <p className="text-xs text-muted-foreground">
              In-depth strategic case studies
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {blogsCount !== null ? blogsCount : "--"}
            </div>
            <p className="text-xs text-muted-foreground">
              Total published & draft articles
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
