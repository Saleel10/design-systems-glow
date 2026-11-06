import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Blog from "../pages/Blog";

describe("Blog page cover image rendering", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders cover image on the featured post when image_url is provided", async () => {
    const testBlogs = [
      {
        id: "a-logo-is-just-the-beginning",
        slug: "a-logo-is-just-the-beginning",
        title: "A Logo Is Just the Beginning of a Brand",
        subtitle: "A strong brand is built through every interaction.",
        cat: "Branding",
        read: "7 min read",
        published: true,
        image_url: "https://example.com/cover-saleel.jpg",
      },
      {
        id: "designing-for-clarity",
        slug: "designing-for-clarity",
        title: "Designing for clarity: lessons from 800+ projects",
        subtitle: "How removing visual noise accelerates decision-making.",
        cat: "Process",
        read: "5 min read",
        published: true,
        image_url: "https://example.com/clarity.jpg",
      },
    ];

    localStorage.setItem("admin_blogs", JSON.stringify(testBlogs));

    render(
      <HelmetProvider>
        <MemoryRouter>
          <Blog />
        </MemoryRouter>
      </HelmetProvider>
    );

    await waitFor(() => {
      // Check that the featured post title appears
      expect(
        screen.getByText("A Logo Is Just the Beginning of a Brand")
      ).toBeInTheDocument();

      // Check that the featured cover image is rendered with correct src and alt
      const featuredImg = screen.getByAltText(
        "A Logo Is Just the Beginning of a Brand"
      );
      expect(featuredImg).toBeInTheDocument();
      expect(featuredImg).toHaveAttribute(
        "src",
        "https://example.com/cover-saleel.jpg"
      );

      // Check that the grid post image is rendered with correct src and alt
      const gridImg = screen.getByAltText(
        "Designing for clarity: lessons from 800+ projects"
      );
      expect(gridImg).toBeInTheDocument();
      expect(gridImg).toHaveAttribute("src", "https://example.com/clarity.jpg");
    });
  });

  it("falls back gracefully when blog post has no cover image", async () => {
    const testBlogs = [
      {
        id: "no-image-blog",
        slug: "no-image-blog",
        title: "Design Principles Without Cover",
        subtitle: "A blog post without an uploaded cover image.",
        cat: "Strategy",
        read: "3 min read",
        published: true,
        image_url: "",
      },
    ];

    localStorage.setItem("admin_blogs", JSON.stringify(testBlogs));

    render(
      <HelmetProvider>
        <MemoryRouter>
          <Blog />
        </MemoryRouter>
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText("Design Principles Without Cover")
      ).toBeInTheDocument();
      // Should show the fallback Featured Article badge
      expect(screen.getByText("Featured Article")).toBeInTheDocument();
    });
  });
});
