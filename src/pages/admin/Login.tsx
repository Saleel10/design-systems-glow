import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, ArrowRight, ShieldCheck } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const enterLocalAdmin = () => {
    localStorage.setItem("dev_admin_logged_in", "true");
    toast({
      title: "Local Admin Access",
      description: "Entering admin dashboard in local preview mode.",
    });
    navigate("/admin");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (!isSupabaseConfigured) {
      enterLocalAdmin();
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Login error",
          description: error.message,
        });
        setLoading(false);
      } else {
        localStorage.setItem("dev_admin_logged_in", "true");
        toast({
          title: "Success",
          description: "Logged in successfully",
        });
        navigate("/admin");
      }
    } catch {
      // In case of network error, allow local dev login
      enterLocalAdmin();
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-sm border-[var(--line)] shadow-lg">
        <form onSubmit={handleLogin}>
          <CardHeader>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <CardTitle className="text-2xl">Admin Login</CardTitle>
            </div>
            <CardDescription>
              {isSupabaseConfigured
                ? "Enter your credentials to manage portfolio content."
                : "Running in local development mode."}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="grid gap-4">
            {!isSupabaseConfigured && (
              <div className="rounded-lg bg-primary/10 border border-primary/20 p-3 text-xs text-primary leading-relaxed">
                Supabase credentials not configured in <code className="bg-primary/20 px-1 py-0.5 rounded font-mono">.env</code>. You can click below for instant 1-click local access!
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-2.5">
            <Button className="w-full" type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign in
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full justify-center gap-1.5 text-xs font-normal border-dashed"
              onClick={enterLocalAdmin}
            >
              <span>Instant Enter (Local Admin Mode)</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
