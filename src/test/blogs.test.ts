import { describe, it, expect, beforeEach } from 'vitest';
import {
  getSyncedBlogs,
  deleteSyncedBlog,
  restoreDefaultBlogs,
  saveSyncedBlog,
  DEFAULT_BLOGS,
  OBSOLETE_BLOG_SLUGS,
} from '@/lib/portfolioDataSync';

describe('Admin Blogs Sync & Defaults Restoration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loads exactly the 4 core default blogs when storage is empty', async () => {
    const blogs = await getSyncedBlogs();
    expect(blogs.length).toBe(4);

    const slugs = blogs.map((b) => b.slug);
    expect(slugs).toContain('why-your-brand-needs-a-system');
    expect(slugs).toContain('designing-for-clarity');
    expect(slugs).toContain('how-to-build-brand-systems-that-scale');
    expect(slugs).toContain('freelancing-client-communication-problems');

    // Asserts obsolete mock blogs are never present
    OBSOLETE_BLOG_SLUGS.forEach((obs) => {
      expect(slugs).not.toContain(obs);
    });
  });

  it('filters out obsolete blogs if they exist in localStorage', async () => {
    // Simulate user previously had obsolete blogs cached in localStorage
    const legacyBlogs = [
      { id: 'cmyk-vs-rgb-vs-hsl', slug: 'cmyk-vs-rgb-vs-hsl', title: 'CMYK vs RGB' },
      { id: 'building-your-first-design-system-in-figma', slug: 'building-your-first-design-system-in-figma', title: 'Design System' },
      { id: 'why-your-brand-needs-a-system', slug: 'why-your-brand-needs-a-system', title: 'Why your brand needs a system' },
    ];
    localStorage.setItem('admin_blogs', JSON.stringify(legacyBlogs));

    const blogs = await getSyncedBlogs();
    const slugs = blogs.map((b) => b.slug);

    expect(slugs).not.toContain('cmyk-vs-rgb-vs-hsl');
    expect(slugs).not.toContain('building-your-first-design-system-in-figma');
    expect(slugs).toContain('why-your-brand-needs-a-system');
  });

  it('restores missing default blogs if storage has only a partial list', async () => {
    // Simulate user having only 1 custom blog in localStorage
    const customBlog = {
      id: 'custom-ai-design',
      slug: 'custom-ai-design',
      title: 'AI in Design',
      cat: 'Design Theory',
      published: true,
    };
    localStorage.setItem('admin_blogs', JSON.stringify([customBlog]));

    const blogs = await getSyncedBlogs();
    // 1 custom + 4 defaults = 5
    expect(blogs.length).toBe(5);
    expect(blogs.some((b) => b.slug === 'custom-ai-design')).toBe(true);
    expect(blogs.some((b) => b.slug === 'why-your-brand-needs-a-system')).toBe(true);
    expect(blogs.some((b) => b.slug === 'how-to-build-brand-systems-that-scale')).toBe(true);
  });

  it('deletes a blog and respects deletion until defaults are restored', async () => {
    await getSyncedBlogs();
    await deleteSyncedBlog('how-to-build-brand-systems-that-scale');

    const blogsAfterDelete = await getSyncedBlogs();
    expect(blogsAfterDelete.some((b) => b.slug === 'how-to-build-brand-systems-that-scale')).toBe(false);
    expect(blogsAfterDelete.length).toBe(3);

    // Now restore defaults
    const restored = await restoreDefaultBlogs();
    expect(restored.length).toBe(4);
    expect(restored.some((b) => b.slug === 'how-to-build-brand-systems-that-scale')).toBe(true);
  });

  it('saves and updates cover image on last two blogs reliably', async () => {
    await getSyncedBlogs();

    // 1. Update How to Build Brand Systems That Scale
    await saveSyncedBlog(
      {
        id: 'how-to-build-brand-systems-that-scale',
        slug: 'how-to-build-brand-systems-that-scale',
        title: 'How to Build Brand Systems That Scale',
        image_url: 'data:image/jpeg;base64,mockImageData1',
      },
      'how-to-build-brand-systems-that-scale'
    );

    // 2. Update Freelancing with case-insensitive id
    await saveSyncedBlog(
      {
        id: 'freelancing-client-communication-problems',
        slug: 'freelancing-client-communication-problems',
        title: 'Freelancing: Solving Client Communication Problems',
        image_url: 'data:image/jpeg;base64,mockImageData2',
      },
      'Freelancing-Client-Communication-Problems'
    );

    const updatedBlogs = await getSyncedBlogs();
    const blog1 = updatedBlogs.find((b) => b.slug === 'how-to-build-brand-systems-that-scale');
    const blog2 = updatedBlogs.find((b) => b.slug === 'freelancing-client-communication-problems');

    expect(blog1?.image_url).toBe('data:image/jpeg;base64,mockImageData1');
    expect(blog2?.image_url).toBe('data:image/jpeg;base64,mockImageData2');
  });
});
