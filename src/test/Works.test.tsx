import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Works from "../pages/Works";
import { saveSyncedCategory } from "../lib/portfolioDataSync";

describe("Works page dynamic categories", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders dynamic category pills starting with All, Branding, Social Media, UI/UX, Brand Profiles, Package Designs, Web", async () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <Works />
        </MemoryRouter>
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Branding" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Social Media Creatives" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "UI/UX Design" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Brand Profiles" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Package Designs" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Web" })).toBeInTheDocument();

      // Ensure blog categories and obsolete categories do NOT appear in works
      expect(screen.queryByRole("button", { name: "Web Design" })).not.toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "Design Systems" })).not.toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "Mobile App" })).not.toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "UI/UX Designs" })).not.toBeInTheDocument();
    });
  });

  it("filters works when a category button is clicked", async () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <Works />
        </MemoryRouter>
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Taxverse")).toBeInTheDocument();
      expect(screen.getByText("Raidhan")).toBeInTheDocument();
    });

    // 1. Click UI/UX Design
    const uiUxBtn = screen.getByRole("button", { name: "UI/UX Design" });
    fireEvent.click(uiUxBtn);

    await waitFor(() => {
      expect(screen.getByText("Trevio")).toBeInTheDocument();
      expect(screen.queryByText("Taxverse")).not.toBeInTheDocument();
    });

    // 2. Click Social Media Creatives: should show Raidhan
    const socialBtn = screen.getByRole("button", { name: "Social Media Creatives" });
    fireEvent.click(socialBtn);

    await waitFor(() => {
      expect(screen.getByText("Raidhan")).toBeInTheDocument();
      expect(screen.queryByText("Taxverse")).not.toBeInTheDocument();
      expect(screen.queryByText("Shad Creative Education")).not.toBeInTheDocument();
    });

    // 3. Click Brand Profiles: should NOT include Social Media Creatives (Raidhan) or Shad
    const brandProfilesBtn = screen.getByRole("button", { name: "Brand Profiles" });
    fireEvent.click(brandProfilesBtn);

    await waitFor(() => {
      expect(screen.queryByText("Raidhan")).not.toBeInTheDocument();
      expect(screen.queryByText("Shad Creative Education")).not.toBeInTheDocument();
      expect(screen.getByText(/No projects in “Brand Profiles” yet/i)).toBeInTheDocument();
    });

    // 4. Click Branding: should show Taxverse and Shad Creative Education
    const brandingBtn = screen.getByRole("button", { name: "Branding" });
    fireEvent.click(brandingBtn);

    await waitFor(() => {
      expect(screen.getByText("Taxverse")).toBeInTheDocument();
      expect(screen.getByText("Shad Creative Education")).toBeInTheDocument();
      expect(screen.queryByText("Raidhan")).not.toBeInTheDocument();
    });
  });

  it("automatically displays newly created category when added via admin", async () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <Works />
        </MemoryRouter>
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
    });

    // Simulate creating a new category in admin panel
    await saveSyncedCategory({
      name: "3D Animation",
      slug: "3d-animation",
      type: "work",
    });

    // Should dynamically show the new category button
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "3D Animation" })).toBeInTheDocument();
    });

    // Clicking the new category should show empty state since no works are assigned yet
    fireEvent.click(screen.getByRole("button", { name: "3D Animation" }));
    await waitFor(() => {
      expect(screen.getByText(/No projects in “3D Animation” yet/i)).toBeInTheDocument();
    });
  });
});

