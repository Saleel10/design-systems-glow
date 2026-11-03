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
      expect(screen.getByRole("button", { name: "UI/UX Designs" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Brand Profiles" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Package Designs" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Web" })).toBeInTheDocument();
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
    });

    // Click UI/UX Designs
    const uiUxBtn = screen.getByRole("button", { name: "UI/UX Designs" });
    fireEvent.click(uiUxBtn);

    await waitFor(() => {
      expect(screen.getByText("Trevio")).toBeInTheDocument();
      expect(screen.queryByText("Taxverse")).not.toBeInTheDocument();
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

