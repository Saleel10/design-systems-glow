import { describe, it, expect, beforeEach } from 'vitest';
import {
  getSyncedBlogs,
  deleteSyncedBlog,
  restoreDefaultBlogs,
  DEFAULT_BLOGS,
} from '@/lib/portfolioDataSync';

describe('Admin Blogs Sync & Defaults Restoration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loads all 9 default blogs when storage is empty', async () => {
    const blogs = await getSyncedBlogs();
    expect(blogs.length).toBe(9);

    const slugs = blogs.map((b) => b.slug);
    // 4 from portfolioData / design blogs
    expect(slugs).toContain('why-your-brand-needs-a-system');
    expect(slugs).toContain('designing-for-clarity');
    expect(slugs).toContain('building-your-first-design-system-in-figma');
    expect(slugs).toContain('landing-pages-that-convert');

    // 5 original articles from blogPosts.ts
    expect(slugs).toContain('cmyk-vs-rgb-vs-hsl');
    expect(slugs).toContain('how-to-build-brand-systems-that-scale');
    expect(slugs).toContain('freelancing-client-communication-problems');
    expect(slugs).toContain('becoming-a-brand-designer');
    expect(slugs).toContain('design-systems-in-ui');
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
    // 1 custom + 9 defaults = 10
    expect(blogs.length).toBe(10);
    expect(blogs.some((b) => b.slug === 'custom-ai-design')).toBe(true);
    expect(blogs.some((b) => b.slug === 'why-your-brand-needs-a-system')).toBe(true);
    expect(blogs.some((b) => b.slug === 'cmyk-vs-rgb-vs-hsl')).toBe(true);
  });

  it('deletes a blog and respects deletion until defaults are restored', async () => {
    await getSyncedBlogs();
    await deleteSyncedBlog('cmyk-vs-rgb-vs-hsl');

    const blogsAfterDelete = await getSyncedBlogs();
    expect(blogsAfterDelete.some((b) => b.slug === 'cmyk-vs-rgb-vs-hsl')).toBe(false);
    expect(blogsAfterDelete.length).toBe(8);

    // Now restore defaults
    const restored = await restoreDefaultBlogs();
    expect(restored.length).toBe(9);
    expect(restored.some((b) => b.slug === 'cmyk-vs-rgb-vs-hsl')).toBe(true);
  });
});

