import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  LayoutDashboard,
  Briefcase,
  Tags,
  FileText,
  FolderKanban,
  LogOut,
  Sun,
  Moon,
  ExternalLink,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function AdminLayout() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const checkSession = async () => {
      const isDevAuth = localStorage.getItem("dev_admin_logged_in") === "true";
      if (isDevAuth || !isSupabaseConfigured) {
        setLoading(false);
        return;
      }

      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate("/admin/login");
        }
      } catch {
        navigate("/admin/login");
      }
      setLoading(false);
    };

    checkSession();

    if (isSupabaseConfigured) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        const isDevAuth = localStorage.getItem("dev_admin_logged_in") === "true";
        if (!session && !isDevAuth) {
          navigate("/admin/login");
        }
      });

      return () => subscription.unsubscribe();
    }
  }, [navigate]);

  const handleLogout = async () => {
    localStorage.removeItem("dev_admin_logged_in");
    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.error(err);
      }
    }
    toast({
      title: "Signed out",
      description: "You have been logged out of admin.",
    });
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Categories", href: "/admin/categories", icon: Tags },
    { name: "Works", href: "/admin/works", icon: Briefcase },
    { name: "Case Studies", href: "/admin/cases", icon: FolderKanban },
    { name: "Blogs", href: "/admin/blogs", icon: FileText },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground md:flex-row transition-colors duration-200">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-card md:flex shadow-sm">
        <div className="flex h-14 items-center justify-between border-b px-5 lg:h-[60px]">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="font-bold tracking-tight">Admin Panel</span>
          </Link>
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
            v2.0
          </span>
        </div>

        <div className="flex-1 overflow-auto py-3">
          <nav className="grid items-start px-3 text-sm font-medium gap-1">
            {navigation.map((item) => {
              const isActive =
                location.pathname === item.href ||
                (location.pathname.startsWith(item.href) && item.href !== "/admin");
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all text-sm ${
                    isActive
                      ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="mt-auto p-4 border-t space-y-2">
          {/* Light / Dark Theme Switcher Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full justify-start gap-2.5 text-xs font-medium"
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <>
                <Sun className="h-4 w-4 text-amber-400" />
                <span>Switch to Light Theme</span>
              </>
            ) : (
              <>
                <Moon className="h-4 w-4 text-primary" />
                <span>Switch to Dark Theme</span>
              </>
            )}
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-xs text-muted-foreground hover:text-foreground"
            asChild
          >
            <Link to="/" target="_blank" rel="noreferrer">
              <ExternalLink className="h-3.5 w-3.5" />
              <span>View Website</span>
            </Link>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex flex-1 flex-col md:pl-64 min-h-screen">
        {/* Top Header Bar for Desktop & Mobile */}
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b bg-background/95 backdrop-blur px-4 lg:h-[60px] lg:px-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Link to="/admin" className="md:hidden font-bold tracking-tight text-sm">
              Admin Panel
            </Link>
            <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
              <span>Admin</span>
              <span>/</span>
              <span className="text-foreground font-medium capitalize">
                {location.pathname.replace("/admin", "").replace("/", "") || "Dashboard"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Theme Toggle Button */}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="gap-2 text-xs font-medium h-9 px-3"
              title={`Toggle ${theme === "dark" ? "Light" : "Dark"} Theme`}
            >
              {theme === "dark" ? (
                <>
                  <Sun className="h-4 w-4 text-amber-400" />
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4 text-primary" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              )}
            </Button>

            <Button variant="ghost" size="sm" asChild className="text-xs h-9">
              <Link to="/" target="_blank" rel="noreferrer">
                <span className="hidden sm:inline mr-1">Live Site</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="text-xs h-9 md:hidden"
              onClick={handleLogout}
            >
              <LogOut className="h-3.5 w-3.5" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 md:p-6 lg:p-8 bg-background">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
