import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop";
import SmoothScrollProvider from "./components/SmoothScrollProvider";
import CustomCursor from "./components/CustomCursor";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Works from "./pages/Works";
import WorkDetail from "./pages/WorkDetail";
import Experience from "./pages/Experience";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminLayout from "./components/AdminLayout";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import CategoriesList from "./pages/admin/categories/CategoriesList";
import CategoryForm from "./pages/admin/categories/CategoryForm";
import WorksAdminList from "./pages/admin/works/WorksList";
import WorkForm from "./pages/admin/works/WorkForm";
import BlogsAdminList from "./pages/admin/blogs/BlogsList";
import BlogForm from "./pages/admin/blogs/BlogForm";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <SmoothScrollProvider>
            <CustomCursor />
            <Toaster />
            <Sonner />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/works" element={<Works />} />
              <Route path="/works/:slug" element={<WorkDetail />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="categories" element={<CategoriesList />} />
                <Route path="categories/new" element={<CategoryForm />} />
                <Route path="categories/:id" element={<CategoryForm />} />
                <Route path="works" element={<WorksAdminList />} />
                <Route path="works/new" element={<WorkForm />} />
                <Route path="works/:id" element={<WorkForm />} />
                <Route path="blogs" element={<BlogsAdminList />} />
                <Route path="blogs/new" element={<BlogForm />} />
                <Route path="blogs/:id" element={<BlogForm />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </SmoothScrollProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
