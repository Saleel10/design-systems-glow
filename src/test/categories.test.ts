import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  sortWorkCategories,
  getSyncedCategories,
  saveSyncedCategory,
  deleteSyncedCategory,
  SyncedCategory,
} from "../lib/portfolioDataSync";

describe("Categories management and ordering", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("sorts work categories in the exact order requested: Branding -> Social Media -> UI/UX -> Brand Profiles -> Package Designs -> Web", () => {
    // Arbitrary order as shown in admin table created_at desc
    const unsorted: SyncedCategory[] = [
      { id: "web", name: "Web", slug: "web", type: "work" },
      { id: "package-designing", name: "Package Designs", slug: "package-designing", type: "work" },
      { id: "social-media-creatives", name: "Social Media Creatives", slug: "social-media-creatives", type: "work" },
      { id: "ui-ux-design", name: "UI/UX Design", slug: "ui-ux-design", type: "work" },
      { id: "brand-profiles", name: "Brand Profiles", slug: "brand-profiles", type: "work" },
      { id: "branding", name: "Branding", slug: "branding", type: "work" },
    ];

    const sorted = sortWorkCategories(unsorted);
    const names = sorted.map((c) => c.name);

    expect(names).toEqual([
      "Branding",
      "Social Media Creatives",
      "UI/UX Design",
      "Brand Profiles",
      "Package Designs",
      "Web",
    ]);
  });

  it("appends newly created categories after the primary 6 categories", () => {
    const categories: SyncedCategory[] = [
      { id: "web", name: "Web", slug: "web", type: "work" },
      { id: "3d-animation", name: "3D Animation", slug: "3d-animation", type: "work", created_at: "2026-11-01T10:00:00Z" },
      { id: "package-designing", name: "Package Designs", slug: "package-designing", type: "work" },
      { id: "social-media-creatives", name: "Social Media Creatives", slug: "social-media-creatives", type: "work" },
      { id: "motion-graphics", name: "Motion Graphics", slug: "motion-graphics", type: "work", created_at: "2026-11-02T10:00:00Z" },
      { id: "ui-ux-design", name: "UI/UX Design", slug: "ui-ux-design", type: "work" },
      { id: "brand-profiles", name: "Brand Profiles", slug: "brand-profiles", type: "work" },
      { id: "branding", name: "Branding", slug: "branding", type: "work" },
    ];

    const sorted = sortWorkCategories(categories);
    const names = sorted.map((c) => c.name);

    expect(names).toEqual([
      "Branding",
      "Social Media Creatives",
      "UI/UX Design",
      "Brand Profiles",
      "Package Designs",
      "Web",
      "3D Animation",
      "Motion Graphics",
    ]);
  });

  it("getSyncedCategories returns work categories properly sorted and dispatches event on save", async () => {
    const listener = vi.fn();
    window.addEventListener("portfolio_data_updated", listener);

    const initial = await getSyncedCategories("work");
    expect(initial.length).toBeGreaterThanOrEqual(6);
    expect(initial[0].name).toBe("Branding");

    // Create a new category
    await saveSyncedCategory({
      name: "AR/VR Design",
      slug: "ar-vr-design",
      type: "work",
    });

    expect(listener).toHaveBeenCalled();

    const updated = await getSyncedCategories("work");
    expect(updated.some((c) => c.slug === "ar-vr-design")).toBe(true);
    expect(updated[updated.length - 1].name).toBe("AR/VR Design");

    // Delete the new category
    await deleteSyncedCategory("ar-vr-design", "work");
    const afterDelete = await getSyncedCategories("work");
    expect(afterDelete.some((c) => c.slug === "ar-vr-design")).toBe(false);

    window.removeEventListener("portfolio_data_updated", listener);
  });

  it("resolves conflicts when the same category exists in both blog and work", async () => {
    // 1. Save work category "Branding"
    await saveSyncedCategory({
      name: "Branding",
      slug: "branding",
      type: "work",
    });

    // 2. Save blog category "Branding" with identical name and slug
    await saveSyncedCategory({
      name: "Branding",
      slug: "branding",
      type: "blog",
    });

    // 3. Both must exist independently without overwriting each other
    const workCats = await getSyncedCategories("work");
    const blogCats = await getSyncedCategories("blog");

    const workBranding = workCats.find((c) => c.slug === "branding");
    const blogBranding = blogCats.find((c) => c.slug === "branding");

    expect(workBranding).toBeDefined();
    expect(workBranding?.type).toBe("work");

    expect(blogBranding).toBeDefined();
    expect(blogBranding?.type).toBe("blog");

    // 4. Update the blog category name to "Brand Strategy"
    await saveSyncedCategory({
      id: blogBranding!.id,
      name: "Brand Strategy",
      slug: "branding",
      type: "blog",
    });

    // The work category should still be named "Branding", untouched
    const reloadedWorkCats = await getSyncedCategories("work");
    expect(reloadedWorkCats.find((c) => c.slug === "branding")?.name).toBe("Branding");

    // The blog category should have updated name
    const reloadedBlogCats = await getSyncedCategories("blog");
    expect(reloadedBlogCats.find((c) => c.slug === "branding")?.name).toBe("Brand Strategy");

    // 5. Delete the blog category only
    await deleteSyncedCategory(blogBranding!.id, "blog");

    const afterDeleteBlog = await getSyncedCategories("blog");
    const afterDeleteWork = await getSyncedCategories("work");

    // Blog category is gone
    expect(afterDeleteBlog.some((c) => c.id === blogBranding!.id)).toBe(false);
    // Work category remains intact
    expect(afterDeleteWork.some((c) => c.slug === "branding")).toBe(true);
  });

  it("filters out blog categories and obsolete categories from work section", async () => {
    // Simulate polluted localStorage as shown in user's Image 2
    const polluted = [
      { id: "1", name: "Social Media Creatives", slug: "social-media-creatives", type: "work" },
      { id: "2", name: "UI/UX Design", slug: "ui-ux-design", type: "work" },
      { id: "3", name: "UI/UX Designs", slug: "ui-ux-designs", type: "work" },
      { id: "4", name: "Brand Profiles", slug: "brand-profiles", type: "work" },
      { id: "5", name: "Package Designs", slug: "package-designing", type: "work" },
      { id: "6", name: "Web Design", slug: "web-design", type: "work" }, // blog category polluting work
      { id: "7", name: "Web", slug: "web", type: "work" },
      { id: "8", name: "Design Systems", slug: "design-systems", type: "work" }, // blog category polluting work
      { id: "9", name: "Mobile App", slug: "mobile-app", type: "work" }, // obsolete category
    ];
    localStorage.setItem("admin_categories", JSON.stringify(polluted));

    const workCategories = await getSyncedCategories("work");
    const slugs = workCategories.map((c) => c.slug);
    const names = workCategories.map((c) => c.name);

    // Only the 6 requested categories must be in work
    expect(slugs).toContain("branding");
    expect(slugs).toContain("social-media-creatives");
    expect(slugs).toContain("ui-ux-design");
    expect(slugs).toContain("brand-profiles");
    expect(slugs).toContain("package-designing");
    expect(slugs).toContain("web");

    // Must NOT contain blog categories or obsolete items
    expect(slugs).not.toContain("web-design");
    expect(slugs).not.toContain("design-systems");
    expect(slugs).not.toContain("mobile-app");
    expect(names).not.toContain("UI/UX Designs"); // unified into UI/UX Design
    expect(names).toContain("UI/UX Design");
    expect(workCategories.length).toBe(6);
  });
});
