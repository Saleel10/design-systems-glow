import { supabase, isSupabaseConfigured } from './supabase';
import { CASES, CaseStudy } from '@/data/portfolioData';

export interface SyncedWork {
  id: string;
  title: string;
  slug: string;
  cat: string;
  category_id?: string;
  cta?: string;
  year: string;
  description?: string;
  image_url?: string;
  created_at?: string;
  categories?: { name: string } | null;
  details?: {
    overview?: string;
    problem?: string;
    client?: string;
    year?: string;
    tools?: string;
    insights?: { text: string }[];
    steps?: { number: string; title: string; desc: string }[];
    outputs?: { title: string; type: string; image_url?: string }[];
    learnings?: { takeaway: string; elaboration: string }[];
    [key: string]: any;
  };
}

export interface SyncedBlog {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt?: string;
  cat?: string;
  category_id?: string;
  categories?: { name: string } | null;
  read?: string;
  read_time?: string;
  date?: string;
  published?: boolean;
  image_url?: string;
  author_name?: string;
  author_role?: string;
  tags?: string[] | string;
  content?: any;
  created_at?: string;
}

export const DEFAULT_WORKS: SyncedWork[] = [
  {
    id: 'taxverse',
    slug: 'taxverse',
    title: 'Taxverse',
    cat: 'Branding',
    category_id: 'branding',
    cta: 'Brand identity',
    year: '2025',
    created_at: new Date('2025-01-15').toISOString(),
    categories: { name: 'Branding' },
    description: 'A complete visual identity for Taxverse — built from positioning and research into a logo, colour, type and asset system that works across every touchpoint.',
    details: {
      overview: 'A complete visual identity for Taxverse — built from positioning and research into a logo, colour, type and asset system that works across every touchpoint.',
      problem: 'The brand lacked a consistent visual voice. Assets looked different on every platform, weakening recognition and trust.',
      client: 'Taxverse',
      year: '2025',
      tools: 'Illustrator, Photoshop, Figma',
      insights: [
        { text: 'Competitors in the category look nearly identical — there was room to stand out.' },
        { text: 'Customers associated the brand with reliability, but nothing visual expressed it.' },
        { text: 'The internal team needed templates they could use without a designer.' },
      ],
      steps: [
        { number: 'Step 01', title: 'Discover', desc: 'Brief, research and audit of existing material and competitors.' },
        { number: 'Step 02', title: 'Define', desc: 'Positioning, goals and design direction agreed with the client.' },
        { number: 'Step 03', title: 'Design', desc: 'Concepts explored and refined through feedback rounds.' },
        { number: 'Step 04', title: 'Deliver', desc: 'Final files, guidelines and handoff.' },
      ],
      outputs: [
        { title: 'Logo system', type: 'Identity', image_url: '' },
        { title: 'Brand guidelines', type: 'Document', image_url: '' },
        { title: 'Stationery & collateral', type: 'Print', image_url: '' },
        { title: 'Social media kit', type: 'Digital', image_url: '' },
      ],
      learnings: [
        { takeaway: 'Early stakeholder alignment prevents late redesign loops.', elaboration: 'Agreeing on positioning pillars before touching vector tools cut project revisions in half.' },
      ],
    },
  },
  {
    id: 'trevio',
    slug: 'trevio',
    title: 'Trevio',
    cat: 'UI/UX',
    category_id: 'ui-ux',
    cta: 'Product design',
    year: '2025',
    created_at: new Date('2025-02-10').toISOString(),
    categories: { name: 'UI/UX' },
    description: 'A fast, dependable booking experience and multi-platform design system for travel and hospitality management.',
    details: {
      overview: 'A fast, dependable booking experience and multi-platform design system for travel and hospitality management.',
      problem: 'Legacy booking funnels suffered high drop-off rates on mobile with inconsistent form controls across checkout.',
      client: 'Trevio',
      year: '2025',
      tools: 'Figma, FigJam, Miro, Tokens Studio',
      insights: [
        { text: 'Fewer steps and upfront pricing transparency increased booking completion by 34%.' },
        { text: 'Mobile users prioritized rapid date selection over extraneous visual media.' },
        { text: 'Reusable design system components slashed engineering handover time in half.' },
      ],
      steps: [
        { number: 'Step 01', title: 'Discover', desc: 'User interviews, funnel audit, and heat map analytics across booking stages.' },
        { number: 'Step 02', title: 'Define', desc: 'Information architecture simplification and streamlined checkout user flows.' },
        { number: 'Step 03', title: 'Design', desc: 'High-fidelity wireframes, interactive mobile prototypes, and accessibility audits.' },
        { number: 'Step 04', title: 'Deliver', desc: 'Tokenized design system in Figma and verified developer handover specs.' },
      ],
      outputs: [
        { title: 'Mobile app UI', type: 'Product', image_url: '' },
        { title: 'Design system', type: 'Figma Library', image_url: '' },
        { title: 'Checkout flow', type: 'Prototype', image_url: '' },
        { title: 'Web dashboard', type: 'Responsive Web', image_url: '' },
      ],
      learnings: [
        { takeaway: 'Component design tokens unlock rapid feature iteration.', elaboration: 'Standardizing token variables allowed front-end teams to theme and deploy new flows seamlessly.' },
      ],
    },
  },
  {
    id: 'shad',
    slug: 'shad-creative-education',
    title: 'Shad Creative Education',
    cat: 'Branding',
    category_id: 'branding',
    cta: 'Visual system',
    year: '2024',
    created_at: new Date('2024-11-20').toISOString(),
    categories: { name: 'Branding' },
    description: 'A modern, bilingual visual system for a creative education institute inspiring the next generation of designers.',
    details: {
      overview: 'A modern, bilingual visual system for a creative education institute inspiring the next generation of designers.',
      problem: 'The institution lacked a distinctive campus and digital identity that resonated with prospective creative students.',
      client: 'Shad Education',
      year: '2024',
      tools: 'Illustrator, Photoshop, InDesign, Figma',
      insights: [
        { text: 'Dynamic geometric symbols resonated strongly with young creative applicants.' },
        { text: 'Faculty and staff required accessible modular templates for course announcements.' },
        { text: 'Unified stationery and certificate design elevated graduation prestige.' },
      ],
      steps: [
        { number: 'Step 01', title: 'Discover', desc: 'Student surveys, stakeholder discovery sessions, and educational benchmarking.' },
        { number: 'Step 02', title: 'Define', desc: 'Core brand values: clarity, creativity, and structured growth.' },
        { number: 'Step 03', title: 'Design', desc: 'Exploration of modular typography, geometric marks, and vibrant palettes.' },
        { number: 'Step 04', title: 'Deliver', desc: 'Brand guidelines book, print collateral, campus signage, and social kit.' },
      ],
      outputs: [
        { title: 'Identity & mark', type: 'Identity', image_url: '' },
        { title: 'Curriculum guides', type: 'Print', image_url: '' },
        { title: 'Campus signage', type: 'Environmental', image_url: '' },
        { title: 'Social media templates', type: 'Digital', image_url: '' },
      ],
      learnings: [
        { takeaway: 'Bilingual typography requires optical compensation.', elaboration: 'Aligning Latin and Arabic baseline metrics preserved balance across all dual-language posters.' },
      ],
    },
  },
  {
    id: 'buraq',
    slug: 'buraq-contracting',
    title: 'Buraq Contracting',
    cat: 'Web',
    category_id: 'web',
    cta: 'Website',
    year: '2024',
    created_at: new Date('2024-09-12').toISOString(),
    categories: { name: 'Web' },
    description: 'Corporate digital website and brand positioning for an established engineering and general contracting firm.',
    details: {
      overview: 'Corporate digital website and brand positioning for an established engineering and general contracting firm.',
      problem: 'An outdated web presence failed to communicate the company\'s large-scale project execution capabilities to commercial clients.',
      client: 'Buraq Contracting',
      year: '2024',
      tools: 'Figma, WordPress, Custom CSS',
      insights: [
        { text: 'Enterprise partners needed clear proof of past projects and certifications upfront.' },
        { text: 'A modern responsive layout increased contractor inquiries by 55%.' },
      ],
      steps: [
        { number: 'Step 01', title: 'Audit', desc: 'Site architecture review and competitor analysis.' },
        { number: 'Step 02', title: 'Wireframing', desc: 'UX structuring of project portfolios and capability pages.' },
        { number: 'Step 03', title: 'Visual Design', desc: 'Modern, solid industrial styling with crisp typography.' },
        { number: 'Step 04', title: 'Deployment', desc: 'Responsive development, performance optimization, and launch.' },
      ],
      outputs: [
        { title: 'Corporate website', type: 'Web', image_url: '' },
        { title: 'Project portfolio layout', type: 'UI Design', image_url: '' },
        { title: 'Client inquiry system', type: 'Feature', image_url: '' },
      ],
    },
  },
  {
    id: '2nd-street',
    slug: '2nd-street',
    title: '2nd Street',
    cat: 'Branding',
    category_id: 'branding',
    cta: 'Brand & packaging',
    year: '2024',
    created_at: new Date('2024-06-25').toISOString(),
    categories: { name: 'Branding' },
    description: 'Boutique retail identity, packaging design and bespoke storefront touchpoints for an artisanal specialty store.',
    details: {
      overview: 'Boutique retail identity, packaging design and bespoke storefront touchpoints for an artisanal specialty store.',
      problem: 'The store needed packaging and brand assets that felt premium, sustainable, and distinctively local.',
      client: '2nd Street Retail',
      year: '2024',
      tools: 'Illustrator, Photoshop, Figma',
      insights: [
        { text: 'Minimalist, tactile packaging encouraged repeat unboxing engagement on social channels.' },
        { text: 'Earth-toned palettes reinforced sustainable, craft positioning.' },
      ],
      steps: [
        { number: 'Step 01', title: 'Concept', desc: 'Moodboarding, material sampling, and packaging explorations.' },
        { number: 'Step 02', title: 'Identity', desc: 'Logo design, typographic hierarchy, and custom badge stamps.' },
        { number: 'Step 03', title: 'Packaging', desc: 'Dieline specifications, print finishing, and unboxing kit.' },
        { number: 'Step 04', title: 'Handoff', desc: 'Print-ready production files and vendor manufacturing guidelines.' },
      ],
      outputs: [
        { title: 'Brand identity', type: 'Identity', image_url: '' },
        { title: 'Custom packaging dielines', type: 'Print', image_url: '' },
        { title: 'Storefront signage', type: 'Collateral', image_url: '' },
      ],
    },
  },
  {
    id: 'raidhan',
    slug: 'raidhan',
    title: 'Raidhan',
    cat: 'Social',
    category_id: 'social',
    cta: 'Campaign creatives',
    year: '2023',
    created_at: new Date('2023-12-05').toISOString(),
    categories: { name: 'Social' },
    description: 'High-impact campaign creatives and multi-channel social media systems for an emerging lifestyle brand.',
    details: {
      overview: 'High-impact campaign creatives and multi-channel social media systems for an emerging lifestyle brand.',
      problem: 'Social media posts suffered from low engagement and disjointed visuals between organic and paid marketing.',
      client: 'Raidhan',
      year: '2023',
      tools: 'Photoshop, Illustrator, Figma',
      insights: [
        { text: 'Motion-friendly modular templates increased post creation speed by 3x.' },
        { text: 'Consistent color-blocking boosted campaign click-through rates by 28%.' },
      ],
      steps: [
        { number: 'Step 01', title: 'Strategy', desc: 'Audience demographic research and social grid auditing.' },
        { number: 'Step 02', title: 'Design System', desc: 'Modular social templates, story kits, and banner guidelines.' },
        { number: 'Step 03', title: 'Campaign Rollout', desc: 'Launch creatives, carousel designs, and promotion assets.' },
        { number: 'Step 04', title: 'Guidance', desc: 'Social media playbook and content creation training.' },
      ],
      outputs: [
        { title: 'Social media system', type: 'Digital', image_url: '' },
        { title: 'Campaign carousel kit', type: 'Marketing', image_url: '' },
        { title: 'Brand promo banners', type: 'Digital Ads', image_url: '' },
      ],
    },
  },
];

export const DEFAULT_CASES: CaseStudy[] = CASES;

export const DEFAULT_BLOGS: SyncedBlog[] = [
  {
    id: 'why-your-brand-needs-a-system',
    slug: 'why-your-brand-needs-a-system',
    title: 'Why your brand needs a system, not just a logo',
    subtitle: 'A logo is a starting point. The real value is in the rules that make every touchpoint feel like the same brand.',
    excerpt: 'A logo is a starting point. The real value is in the rules that make every touchpoint feel like the same brand.',
    category_id: 'branding',
    categories: { name: 'Branding' },
    cat: 'Branding',
    read: '5 min read',
    read_time: '5 min read',
    date: 'Sep 2026',
    published: true,
    created_at: new Date('2026-09-10').toISOString(),
    image_url: '',
    author_name: 'Muhammed Saleel CP',
    author_role: 'Creative & UI/UX Designer',
    tags: ['#branding', '#design-systems', '#strategy'],
    content: {
      intro: 'Most businesses start with a logo and stop there. But a logo on its own can\'t carry a brand across a website, a social feed, packaging and a pitch deck. What carries it is the system around the logo.',
      sections: [
        {
          heading: 'A logo is a signature, not a language',
          body: 'A logo identifies you. A brand system lets you speak — consistently — in every place your customers meet you. Colour, typography, layout, imagery and tone are the vocabulary.\n\nWithout those rules, every new asset is designed from scratch, and small differences pile up until the brand feels like five different companies.',
        },
        {
          heading: 'What a brand system actually includes',
          body: 'At minimum: a logo suite, a colour palette with clear usage, a type hierarchy, spacing and layout principles, and a set of ready-made templates for the things you make most often.\n\nThe goal isn\'t a thick PDF nobody reads. It\'s a toolkit that makes the right choice the easy choice.',
        },
        {
          heading: 'Why it pays off',
          body: 'Consistency builds recognition, and recognition builds trust. A system also saves time and money: your team stops reinventing layouts and starts shipping.',
        },
      ],
      callout: 'Consistency isn\'t boring. It\'s what makes a brand recognisable at a glance.',
      conclusion: 'If your brand feels scattered, the fix is rarely a new logo. It\'s usually a system that ties everything you already have together.',
    },
  },
  {
    id: 'designing-for-clarity',
    slug: 'designing-for-clarity',
    title: 'Designing for clarity: lessons from 800+ projects',
    subtitle: 'How removing visual noise and focusing on user intent accelerates decision-making.',
    excerpt: 'How removing visual noise and focusing on user intent accelerates decision-making.',
    category_id: 'process',
    categories: { name: 'Process' },
    cat: 'Process',
    read: '5 min read',
    read_time: '5 min read',
    date: 'Aug 2026',
    published: true,
    created_at: new Date('2026-08-15').toISOString(),
    image_url: '',
    author_name: 'Muhammed Saleel CP',
    author_role: 'Creative & UI/UX Designer',
    tags: ['#process', '#ui-ux', '#clarity'],
    content: {
      intro: 'After delivering hundreds of design projects across branding and interfaces, one pattern emerges repeatedly: the enemy of good design is rarely lack of skill. It is unnecessary complexity.',
      sections: [
        {
          heading: 'Subtract until only the purpose remains',
          body: 'When building an interface or an identity, every unnecessary decorative flourish creates cognitive load. The best designs solve problems with quiet confidence.',
        },
        {
          heading: 'Hierarchy leads the eye',
          body: 'Users don\'t read every word on a screen. They scan for anchors. A clear typography hierarchy tells them instantly what matters first, second, and third.',
        },
      ],
      callout: 'Simplicity is not the absence of clutter; it is the presence of clear purpose.',
      conclusion: 'When in doubt, simplify. Your users and your metrics will thank you.',
    },
  },
  {
    id: 'building-your-first-design-system-in-figma',
    slug: 'building-your-first-design-system-in-figma',
    title: 'Building your first design system in Figma',
    subtitle: 'Practical token architecture, variable modes, and component anatomy for growing teams.',
    excerpt: 'Practical token architecture, variable modes, and component anatomy for growing teams.',
    category_id: 'design-systems',
    categories: { name: 'Design systems' },
    cat: 'Design systems',
    read: '8 min read',
    read_time: '8 min read',
    date: 'Jul 2026',
    published: true,
    created_at: new Date('2026-07-20').toISOString(),
    image_url: '',
    author_name: 'Muhammed Saleel CP',
    author_role: 'Creative & UI/UX Designer',
    tags: ['#figma', '#design-systems', '#tokens'],
    content: {
      intro: 'Design systems often start with grand ambitions and end as abandoned component graveyards. Here is how to build one that teams actually use every day.',
      sections: [
        {
          heading: 'Tokens before components',
          body: 'Start with atomic values: colors, spacing scale, typography, and corner radiuses. Variables in Figma allow you to map these directly to semantic tokens.',
        },
        {
          heading: 'Component variants with restraint',
          body: 'Avoid creating 50 variants of a button before you need them. Build the primary, secondary, and ghost variants first, with clear states.',
        },
      ],
      callout: 'A design system is a living product, not a finished monument.',
      conclusion: 'Start small, govern consistently, and let the system evolve alongside your product.',
    },
  },
  {
    id: 'landing-pages-that-convert',
    slug: 'landing-pages-that-convert',
    title: 'Landing pages that convert: structure before style',
    subtitle: 'Why hierarchy, contrast, and message sequencing beat trendy animations every time.',
    excerpt: 'Why hierarchy, contrast, and message sequencing beat trendy animations every time.',
    category_id: 'web-design',
    categories: { name: 'Web Design' },
    cat: 'Web',
    read: '4 min read',
    read_time: '4 min read',
    date: 'Jun 2026',
    published: true,
    created_at: new Date('2026-06-18').toISOString(),
    image_url: '',
    author_name: 'Muhammed Saleel CP',
    author_role: 'Creative & UI/UX Designer',
    tags: ['#web-design', '#conversion', '#landing-page'],
    content: {
      intro: 'Too many landing pages treat the hero section like a canvas for abstract 3D art rather than answering the user\'s primary questions.',
      sections: [
        {
          heading: 'The 5-second test',
          body: 'A visitor should understand what you do, who it is for, and how to take the next step within five seconds of landing on your page.',
        },
        {
          heading: 'Sequencing the narrative',
          body: 'Hook with the problem, demonstrate the solution with concrete UI, support with social proof, and remove friction at the call to action.',
        },
      ],
      callout: 'Conversion is the natural result of visual clarity and honest copy.',
      conclusion: 'Before picking colors or micro-interactions, nail the message hierarchy.',
    },
  },
];

// Helper to notify all active components when admin saves or deletes
export const notifyPortfolioDataUpdated = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('portfolio_data_updated'));
  }
};

// ----------------------------------------------------
// WORKS SYNC
// ----------------------------------------------------
export async function getSyncedWorks(): Promise<SyncedWork[]> {
  if (typeof window === 'undefined') return DEFAULT_WORKS;

  // 1. Try Supabase if configured
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('works')
        .select('*, categories(name)')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        const formatted = data.map((w: any) => ({
          ...w,
          cat: w.categories?.name || w.cat || 'Branding',
        }));
        localStorage.setItem('admin_works', JSON.stringify(formatted));
        return formatted;
      }
    } catch {
      // Fall through to localStorage
    }
  }

  // 2. Try localStorage
  const stored = localStorage.getItem('admin_works');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Migrate away from old dummy "nexus-brand-system" if present
      if (Array.isArray(parsed) && parsed.length > 0) {
        const hasDummy = parsed.some((p: any) => p.slug === 'nexus-brand-system' || p.id === 'nexus-brand-system');
        if (!hasDummy) {
          return parsed.map((w: any) => ({
            ...w,
            cat: w.categories?.name || w.cat || 'Branding',
          }));
        }
      }
    } catch {
      // Fall through
    }
  }

  // 3. Fallback to DEFAULT_WORKS
  localStorage.setItem('admin_works', JSON.stringify(DEFAULT_WORKS));
  return DEFAULT_WORKS;
}

export async function getSyncedWork(slugOrId: string): Promise<SyncedWork | null> {
  const all = await getSyncedWorks();
  const target = (slugOrId || '').toLowerCase().trim();
  const found = all.find(
    (w) =>
      w.slug.toLowerCase() === target ||
      w.id.toLowerCase() === target ||
      (target === 'shad' && w.slug === 'shad-creative-education') ||
      (target === 'buraq' && w.slug === 'buraq-contracting') ||
      (target === 'taxverse' && w.slug === 'taxverse')
  );
  return found || null;
}

// ----------------------------------------------------
// CASE STUDIES SYNC
// ----------------------------------------------------
export async function getSyncedCases(): Promise<CaseStudy[]> {
  if (typeof window === 'undefined') return DEFAULT_CASES;

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        localStorage.setItem('admin_cases', JSON.stringify(data));
        return data;
      }
    } catch {
      // Fall through
    }
  }

  const stored = localStorage.getItem('admin_cases');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch {
      // Fall through
    }
  }

  localStorage.setItem('admin_cases', JSON.stringify(DEFAULT_CASES));
  return DEFAULT_CASES;
}

export async function getSyncedCase(id: string): Promise<CaseStudy | null> {
  const all = await getSyncedCases();
  const target = (id || '').toLowerCase().trim();
  const found = all.find((c) => c.id.toLowerCase() === target);
  return found || null;
}

// ----------------------------------------------------
// BLOGS SYNC
// ----------------------------------------------------
export async function getSyncedBlogs(): Promise<SyncedBlog[]> {
  if (typeof window === 'undefined') return DEFAULT_BLOGS;

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*, categories(name)')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        const formatted = data.map((b: any) => ({
          ...b,
          cat: b.categories?.name || b.cat || 'Branding',
          read: b.read_time || b.read || '5 min read',
          excerpt: b.subtitle || b.excerpt || '',
        }));
        localStorage.setItem('admin_blogs', JSON.stringify(formatted));
        return formatted;
      }
    } catch {
      // Fall through
    }
  }

  const stored = localStorage.getItem('admin_blogs');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((b: any) => ({
          ...b,
          cat: b.categories?.name || b.cat || 'Branding',
          read: b.read_time || b.read || '5 min read',
          excerpt: b.subtitle || b.excerpt || '',
        }));
      }
    } catch {
      // Fall through
    }
  }

  localStorage.setItem('admin_blogs', JSON.stringify(DEFAULT_BLOGS));
  return DEFAULT_BLOGS;
}

export async function getSyncedBlog(slugOrId: string): Promise<SyncedBlog | null> {
  const all = await getSyncedBlogs();
  const target = (slugOrId || '').toLowerCase().trim();
  const found = all.find(
    (b) =>
      b.slug.toLowerCase() === target ||
      b.id.toLowerCase() === target ||
      (!target && b.slug === 'why-your-brand-needs-a-system')
  );
  return found || null;
}
