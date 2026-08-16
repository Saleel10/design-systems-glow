export const config = {
  runtime: 'edge',
};

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

export default async function handler(request: Request) {
  if (!supabaseUrl || !supabaseAnonKey) {
    return new Response('Missing Supabase environment variables', { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const baseUrl = 'https://saleeldesigns.com';

  try {
    const [worksResponse, blogsResponse] = await Promise.all([
      supabase.from('works').select('slug, created_at'),
      supabase.from('blogs').select('slug, created_at').eq('published', true)
    ]);

    const works = worksResponse.data || [];
    const blogs = blogsResponse.data || [];

    const staticPages = [
      { url: '/', priority: 1.0, changefreq: 'weekly' },
      { url: '/about', priority: 0.8, changefreq: 'monthly' },
      { url: '/services', priority: 0.8, changefreq: 'monthly' },
      { url: '/works', priority: 0.9, changefreq: 'weekly' },
      { url: '/experience', priority: 0.7, changefreq: 'monthly' },
      { url: '/blog', priority: 0.9, changefreq: 'weekly' },
      { url: '/pricing', priority: 0.8, changefreq: 'monthly' },
      { url: '/contact', priority: 0.6, changefreq: 'yearly' },
    ];

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Add static pages
    for (const page of staticPages) {
      sitemap += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    }

    // Add works
    for (const work of works) {
      sitemap += `
  <url>
    <loc>${baseUrl}/works/${work.slug}</loc>
    <lastmod>${new Date(work.created_at).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    }

    // Add blogs
    for (const blog of blogs) {
      sitemap += `
  <url>
    <loc>${baseUrl}/blog/${blog.slug}</loc>
    <lastmod>${new Date(blog.created_at).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    }

    sitemap += `\n</urlset>`;

    return new Response(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
}
