import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
export default function Dashboard() {
  const [worksCount, setWorksCount] = useState<number | null>(null);
  const [blogsCount, setBlogsCount] = useState<number | null>(null);

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    const [worksRes, blogsRes] = await Promise.all([
      supabase.from("works").select('*', { count: 'exact', head: true }),
      supabase.from("blogs").select('*', { count: 'exact', head: true })
    ]);

    if (!worksRes.error) setWorksCount(worksRes.count);
    if (!blogsRes.error) setBlogsCount(blogsRes.count);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the admin panel. Manage your portfolio content here.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
