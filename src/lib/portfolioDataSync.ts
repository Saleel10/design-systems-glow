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

export interface SyncedCategory {
  id: string;
  name: string;
  slug: string;
  type: 'work' | 'case' | 'blog';
  created_at?: string;
  order?: number;
}

export const DEFAULT_CATEGORIES: SyncedCategory[] = [
  // Work Categories
  { id: 'work-branding', name: 'Branding', slug: 'branding', type: 'work', created_at: '2026-10-30T10:00:00.000Z', order: 1 },
  { id: 'work-social-media-creatives', name: 'Social Media Creatives', slug: 'social-media-creatives', type: 'work', created_at: '2026-10-30T10:01:00.000Z', order: 2 },
  { id: 'work-ui-ux-designs', name: 'UI/UX Designs', slug: 'ui-ux-designs', type: 'work', created_at: '2026-10-30T10:02:00.000Z', order: 3 },
  { id: 'work-brand-profiles', name: 'Brand Profiles', slug: 'brand-profiles', type: 'work', created_at: '2026-10-30T10:03:00.000Z', order: 4 },
  { id: 'work-package-designing', name: 'Package Designs', slug: 'package-designing', type: 'work', created_at: '2026-10-30T10:04:00.000Z', order: 5 },
  { id: 'work-web', name: 'Web', slug: 'web', type: 'work', created_at: '2026-10-30T10:05:00.000Z', order: 6 },

  // Case Study Categories
  { id: 'case-1', name: 'FinTech & Banking', slug: 'fintech-banking', type: 'case', created_at: '2026-10-30T10:00:00.000Z', order: 1 },
  { id: 'case-2', name: 'SaaS Platforms', slug: 'saas-platforms', type: 'case', created_at: '2026-10-30T10:01:00.000Z', order: 2 },
  { id: 'case-3', name: 'Strategic Branding', slug: 'strategic-branding', type: 'case', created_at: '2026-10-30T10:02:00.000Z', order: 3 },
  { id: 'case-4', name: 'Design Systems', slug: 'case-design-systems', type: 'case', created_at: '2026-10-30T10:03:00.000Z', order: 4 },

  // Blog Categories (Can share identical category names/slugs like "Branding" without conflict)
  { id: 'blog-branding', name: 'Branding', slug: 'branding', type: 'blog', created_at: '2026-10-30T10:00:00.000Z', order: 1 },
  { id: 'blog-process', name: 'Process', slug: 'process', type: 'blog', created_at: '2026-10-30T10:01:00.000Z', order: 2 },
  { id: 'blog-design-systems', name: 'Design systems', slug: 'design-systems', type: 'blog', created_at: '2026-10-30T10:02:00.000Z', order: 3 },
  { id: 'blog-web-design', name: 'Web Design', slug: 'web-design', type: 'blog', created_at: '2026-10-30T10:03:00.000Z', order: 4 },
  { id: 'blog-theory', name: 'Design Theory', slug: 'design-theory', type: 'blog', created_at: '2026-10-30T10:04:00.000Z', order: 5 },
  { id: 'blog-strategy', name: 'Strategy', slug: 'strategy', type: 'blog', created_at: '2026-10-30T10:05:00.000Z', order: 6 },
  { id: 'blog-freelancing', name: 'Freelancing', slug: 'freelancing', type: 'blog', created_at: '2026-10-30T10:06:00.000Z', order: 7 },
  { id: 'blog-career', name: 'Career', slug: 'career', type: 'blog', created_at: '2026-10-30T10:07:00.000Z', order: 8 },
];

export const WORK_CATEGORY_PRIORITY: Record<string, number> = {
  branding: 1,
  'social-media-creatives': 2,
  'social-media': 2,
  social: 2,
  'ui-ux-designs': 3,
  'ui-ux-design': 3,
  'ui-ux': 3,
  'brand-profiles': 4,
  'brand-profile': 4,
  'package-designing': 5,
  'package-designs': 5,
  packaging: 5,
  web: 6,
  'web-design': 6,
};

export function sortWorkCategories(categories: SyncedCategory[]): SyncedCategory[] {
  return [...categories].sort((a, b) => {
    // 1. Explicit custom order if present
    if (typeof a.order === 'number' && typeof b.order === 'number' && a.order !== b.order) {
      return a.order - b.order;
    }
    const slugA = (a.slug || a.name || '').toLowerCase();
    const slugB = (b.slug || b.name || '').toLowerCase();
    const priorityA = WORK_CATEGORY_PRIORITY[slugA] ?? WORK_CATEGORY_PRIORITY[a.name?.toLowerCase()] ?? 999;
    const priorityB = WORK_CATEGORY_PRIORITY[slugB] ?? WORK_CATEGORY_PRIORITY[b.name?.toLowerCase()] ?? 999;
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }
    // 2. Chronological for newly added categories (so newly created categories append nicely)
    const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
    const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
    if (timeA && timeB && timeA !== timeB) {
      return timeA - timeB;
    }
    return (a.name || '').localeCompare(b.name || '');
  });
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
    cat: 'UI/UX Designs',
    category_id: 'ui-ux-designs',
    cta: 'Product design',
    year: '2025',
    created_at: new Date('2025-02-10').toISOString(),
    categories: { name: 'UI/UX Designs' },
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
    cat: 'Package Designs',
    category_id: 'package-designing',
    cta: 'Package design',
    year: '2024',
    created_at: new Date('2024-06-25').toISOString(),
    categories: { name: 'Package Designs' },
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
    cat: 'Social Media Creatives',
    category_id: 'social-media-creatives',
    cta: 'Campaign creatives',
    year: '2023',
    created_at: new Date('2023-12-05').toISOString(),
    categories: { name: 'Social Media Creatives' },
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
    cat: 'Web Design',
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
  {
    id: 'cmyk-vs-rgb-vs-hsl',
    slug: 'cmyk-vs-rgb-vs-hsl',
    title: "CMYK vs RGB vs HSL — A Designer's Complete Guide",
    subtitle: "Understanding color models is fundamental. Here's when and why to use each one.",
    excerpt: "Understanding color models is fundamental. Here's when and why to use each one.",
    category_id: 'design-theory',
    categories: { name: 'Design Theory' },
    cat: 'Design Theory',
    read: '6 min read',
    read_time: '6 min read',
    date: 'Jan 15, 2024',
    published: true,
    created_at: new Date('2024-01-15').toISOString(),
    image_url: '',
    author_name: 'Muhammed Saleel CP',
    author_role: 'Creative & UI/UX Designer',
    tags: ['#colors', '#design-theory', '#print-vs-digital'],
    content: {
      intro: "Color is arguably the most powerful tool in a designer's arsenal. But to wield it effectively, you need to understand the systems behind it. Whether you're designing for screen, print, or building design tokens, choosing the right color model matters more than most designers realize.",
      sections: [
        {
          heading: 'RGB: The Language of Screens',
          body: "RGB (Red, Green, Blue) is an additive color model where colors are created by combining light. Every screen you've ever used — from your phone to a cinema projector — displays color using RGB. Each channel ranges from 0 to 255, giving us 16.7 million possible colors.\n\nWhen to use RGB: Digital designs, web development, app interfaces, video production, and any screen-based medium. Most design tools default to RGB, and CSS historically used it as the primary color notation.",
        },
        {
          heading: 'CMYK: The Language of Print',
          body: "CMYK (Cyan, Magenta, Yellow, Key/Black) is a subtractive color model used in print. Unlike screens that emit light, printed materials reflect it. Inks absorb certain wavelengths and reflect others, which is why the model works differently.\n\nWhen to use CMYK: Any design destined for physical printing — business cards, packaging, editorial layouts, signage, and merchandise. Always convert your files to CMYK before sending to print to avoid color shifts.",
        },
        {
          heading: "HSL: The Designer's Secret Weapon",
          body: "HSL (Hue, Saturation, Lightness) is arguably the most intuitive color model for designers. Instead of mixing channels, you think in terms of: What color? (Hue: 0-360°), How vivid? (Saturation: 0-100%), and How bright? (Lightness: 0-100%).\n\nHSL is incredibly powerful for building color systems and design tokens. Need a darker variant? Reduce lightness. Need a muted version? Lower saturation. The relationships are predictable and systematic.",
        },
        {
          heading: 'Building Color Systems with HSL',
          body: 'Modern design systems increasingly use HSL as their foundation. By keeping the hue constant and varying saturation and lightness, you can generate entire palettes programmatically. This is exactly how tools like Tailwind CSS and most design token systems work.\n\nFor example, your primary color at HSL(142, 72%, 37%) can spawn hover states, disabled states, and background tints — all by adjusting just one or two values. This systematic approach ensures consistency across your entire product.',
        },
      ],
      callout: "Understanding color models isn't just academic knowledge — it's a practical superpower.",
      conclusion: 'Use RGB for development, CMYK for print, and HSL for building systematic, scalable color palettes. Master all three, and you\'ll make better color decisions in every medium.',
    },
  },
  {
    id: 'how-to-build-brand-systems-that-scale',
    slug: 'how-to-build-brand-systems-that-scale',
    title: 'How to Build Brand Systems That Scale',
    subtitle: 'A systematic approach to building brand identities that grow with your business.',
    excerpt: 'A systematic approach to building brand identities that grow with your business.',
    category_id: 'branding',
    categories: { name: 'Branding' },
    cat: 'Branding',
    read: '8 min read',
    read_time: '8 min read',
    date: 'Feb 2, 2024',
    published: true,
    created_at: new Date('2024-02-02').toISOString(),
    image_url: '',
    author_name: 'Muhammed Saleel CP',
    author_role: 'Creative & UI/UX Designer',
    tags: ['#branding', '#design-systems', '#scalability'],
    content: {
      intro: "A logo is not a brand. A color palette is not a brand. A brand is a system — a structured set of decisions that governs how a company presents itself across every touchpoint. Here's how to build one that scales.",
      sections: [
        {
          heading: 'Start with Strategy, Not Aesthetics',
          body: "Before opening Figma, answer these questions: What does this brand believe? Who are we speaking to? What space do we occupy in the market? How should people feel when they interact with us?\n\nThese answers become your brand foundation. Every visual decision should trace back to strategy. When a client asks 'why this color?' you should have an answer rooted in positioning, not personal preference.",
        },
        {
          heading: 'Design Tokens: The DNA of Your Brand',
          body: 'Design tokens are the atomic-level decisions of your brand: colors, typography scales, spacing units, border radii, shadow depths. Document these as a single source of truth.\n\nTokens make your brand programmable. When you define \'primary-500\' as a specific green, every designer and developer references the same value. Changes propagate everywhere. This is how brands like Spotify and Airbnb maintain consistency at scale.',
        },
        {
          heading: 'Component Thinking',
          body: "Brand elements should be modular and composable. Your logo should work at 16px and 160px. Your typography system should handle a tweet and a whitepaper. Your color palette should work in light mode, dark mode, and accessibility contexts.\n\nThink in terms of flexibility within constraints. A strong system doesn't restrict creativity — it channels it. Give teams the building blocks and the rules for combining them.",
        },
        {
          heading: 'Documentation is the Product',
          body: "A brand system without documentation is just a collection of files. Your guidelines document should cover: logo usage and clear space, color palette with accessibility ratios, typography hierarchy and pairing rules, photography and illustration style, tone of voice and messaging frameworks, and do's and don'ts with real examples.\n\nMake it living — update it as the brand evolves.",
        },
      ],
      callout: 'Building brands that scale requires thinking like an architect, not a decorator.',
      conclusion: 'Start with strategy, build with systems, document everything, and create structures that empower teams to build consistently without bottlenecking through a single designer.',
    },
  },
  {
    id: 'freelancing-client-communication-problems',
    slug: 'freelancing-client-communication-problems',
    title: 'Freelancing: Solving Client Communication Problems',
    subtitle: 'Common client challenges and frameworks for better project outcomes.',
    excerpt: 'Common client challenges and frameworks for better project outcomes.',
    category_id: 'freelancing',
    categories: { name: 'Freelancing' },
    cat: 'Freelancing',
    read: '5 min read',
    read_time: '5 min read',
    date: 'Mar 10, 2024',
    published: true,
    created_at: new Date('2024-03-10').toISOString(),
    image_url: '',
    author_name: 'Muhammed Saleel CP',
    author_role: 'Creative & UI/UX Designer',
    tags: ['#freelancing', '#client-communication', '#process'],
    content: {
      intro: "After 4+ years of freelancing and 500+ projects, I've learned that most project failures aren't design failures — they're communication failures. Here are the patterns I've identified and the frameworks that solve them.",
      sections: [
        {
          heading: "The 'I'll Know It When I See It' Client",
          body: "This client can't articulate what they want but knows what they don't want. The solution: Never present a single concept. Show 3 distinct directions with clear rationale for each. Moodboards before mockups. Ask them to describe brands they admire and why. The goal is to externalize their internal vision before you start designing.",
        },
        {
          heading: 'Scope Creep: Death by a Thousand Tweaks',
          body: "The project was a logo design. Now they want a full website. The solution: Crystal-clear proposals with numbered deliverables. A change request process for anything out of scope. Milestone-based payments that create natural checkpoints. Frame additions as opportunities, not problems: 'Absolutely, I'd love to add that. Here's what it would look like as a Phase 2.'",
        },
        {
          heading: 'The Feedback Translation Layer',
          body: "When a client says 'make it pop,' they mean something specific — they just lack the design vocabulary. Build a translation layer: 'Pop' usually means more contrast or visual hierarchy. 'Modern' usually means more whitespace and cleaner typography. 'Professional' usually means more structured and less playful. Ask follow-up questions that convert subjective feedback into actionable design decisions.",
        },
        {
          heading: 'Setting Up for Success',
          body: 'The best project communication starts before the project begins. Send a kickoff questionnaire that asks the right questions. Set expectations about revision rounds, response times, and feedback format. Use structured feedback templates instead of open-ended requests. Regular check-ins prevent big surprises at the end.',
        },
      ],
      callout: "Great freelancing isn't about being the best designer in the room. It's about being the best communicator.",
      conclusion: 'Invest in your communication systems as much as your design skills, and watch your client relationships — and your business — transform.',
    },
  },
  {
    id: 'becoming-a-brand-designer',
    slug: 'becoming-a-brand-designer',
    title: 'Becoming a Brand Designer: The Complete Roadmap',
    subtitle: 'From graphic design to strategic brand design — the skills you need.',
    excerpt: 'From graphic design to strategic brand design — the skills you need.',
    category_id: 'career',
    categories: { name: 'Career' },
    cat: 'Career',
    read: '10 min read',
    read_time: '10 min read',
    date: 'Apr 5, 2024',
    published: true,
    created_at: new Date('2024-04-05').toISOString(),
    image_url: '',
    author_name: 'Muhammed Saleel CP',
    author_role: 'Creative & UI/UX Designer',
    tags: ['#career', '#branding', '#learning'],
    content: {
      intro: "Brand design sits at the intersection of strategy, psychology, and visual craft. It's not about making things look good — it's about making things mean something. Here's the roadmap for getting there.",
      sections: [
        {
          heading: 'Foundation: Master the Craft',
          body: "Before you can break rules, you need to know them. Build a strong foundation in typography (study type classification, pairing, and hierarchy), color theory (beyond the basics — understand cultural associations and accessibility), composition and layout principles, and drawing and sketching. These aren't just 'graphic design skills.' They're the visual literacy that makes strategic thinking tangible.",
        },
        {
          heading: 'Level Up: Think in Systems',
          body: 'The leap from graphic designer to brand designer happens when you start thinking systematically. A graphic designer creates a logo. A brand designer creates a visual system that includes a logo. Start seeing patterns across your work. How do your color choices create consistency? How does your typography create hierarchy? How do all elements work together to create a cohesive feeling?',
        },
        {
          heading: 'Strategy: The Multiplier',
          body: "Strategy is what separates a $500 logo from a $50,000 brand identity. Learn competitive analysis and market positioning. Understand brand archetypes and personality frameworks. Study how great brands communicate and evolve. Practice writing brand strategy documents.\n\nWhen you can articulate why a design decision serves a business goal, you become invaluable.",
        },
        {
          heading: 'Build Your Portfolio Strategically',
          body: "Your portfolio should demonstrate thinking, not just execution. Show the problem before the solution. Walk through your process, not just final deliverables. Include metrics and outcomes where possible. Case studies beat galleries — always.\n\nDon't have client work? Create spec projects for brands you admire. The quality of your thinking matters more than whether it was 'real.'",
        },
      ],
      callout: 'Becoming a brand designer is a journey from execution to strategy, from decoration to communication.',
      conclusion: 'Start building systems today — your future self will thank you.',
    },
  },
  {
    id: 'design-systems-in-ui',
    slug: 'design-systems-in-ui',
    title: 'Design Systems in UI: Why Every Product Needs One',
    subtitle: 'How design systems reduce debt, speed up development, and ensure consistency.',
    excerpt: 'How design systems reduce debt, speed up development, and ensure consistency.',
    category_id: 'design-systems',
    categories: { name: 'Design systems' },
    cat: 'Design systems',
    read: '7 min read',
    read_time: '7 min read',
    date: 'May 20, 2024',
    published: true,
    created_at: new Date('2024-05-20').toISOString(),
    image_url: '',
    author_name: 'Muhammed Saleel CP',
    author_role: 'Creative & UI/UX Designer',
    tags: ['#design-systems', '#ui-ux', '#product-design'],
    content: {
      intro: "If your product has more than 10 screens and more than 2 people working on it, you need a design system. Not a component library — a system. Here's why, and how to build one that actually gets adopted.",
      sections: [
        {
          heading: 'The Cost of Not Having a System',
          body: "Without a design system, every new feature is designed from scratch. Buttons look different on every page. Spacing is inconsistent. Developers interpret mockups differently. Design reviews become debates about pixels instead of user experience.\n\nThis is design debt, and like technical debt, it compounds. The longer you wait to systematize, the more expensive it becomes.",
        },
        {
          heading: 'Tokens → Components → Patterns',
          body: 'A design system has three layers. Design Tokens are the foundation — colors, typography, spacing, shadows, and motion values. Components are the building blocks — buttons, inputs, cards, modals built from tokens. Patterns are the solutions — login flows, data tables, navigation structures built from components.\n\nEach layer builds on the one below. Change a token, and it cascades through components and patterns. This is the power of systematic design.',
        },
        {
          heading: 'Adoption is the Real Challenge',
          body: 'The graveyard of design systems is full of beautifully documented libraries that nobody uses. Adoption requires: involvement from the start (don\'t build in isolation), solving real problems (start with the components teams need most), making it easier than not using it (great documentation, copy-paste examples), continuous maintenance (a design system is a product, not a project).\n\nThe best design system is the one your team actually uses.',
        },
        {
          heading: 'Measuring Success',
          body: 'Track your design system\'s impact: design-to-development time, visual consistency across the product, new designer onboarding time, bug reports related to UI inconsistencies, and developer satisfaction scores.\n\nIf these metrics improve, your system is working. If they don\'t, iterate. A design system should be treated with the same rigor as any other product.',
        },
      ],
      callout: "Design systems aren't overhead — they're infrastructure.",
      conclusion: 'Start small, think big, and always optimize for adoption over perfection.',
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
          // Auto-fix any misclassified works from legacy cache
          const cleaned = parsed.map((w: any) => {
            const slug = (w.slug || w.id || '').toLowerCase();
            // Ensure Raidhan is in Social Media Creatives
            if (slug === 'raidhan') {
              return {
                ...w,
                cat: 'Social Media Creatives',
                category_id: 'social-media-creatives',
                categories: { name: 'Social Media Creatives' },
                cta: w.cta || 'Campaign creatives',
              };
            }
            // Ensure Shad is in Branding, not Brand Profiles
            if (slug === 'shad' || slug === 'shad-creative-education') {
              if (w.cat === 'Brand Profiles' || w.category_id === 'brand-profiles' || w.category_id === 'work-brand-profiles') {
                return {
                  ...w,
                  cat: 'Branding',
                  category_id: 'branding',
                  categories: { name: 'Branding' },
                  cta: 'Visual system',
                };
              }
            }
            return {
              ...w,
              cat: w.categories?.name || w.cat || 'Branding',
            };
          });
          localStorage.setItem('admin_works', JSON.stringify(cleaned));
          return cleaned;
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
export async function getSyncedBlogs(forceRestoreDefaults = false): Promise<SyncedBlog[]> {
  if (typeof window === 'undefined') return DEFAULT_BLOGS;

  let blogs: SyncedBlog[] = [];

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*, categories(name)')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        blogs = data.map((b: any) => ({
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

  const stored = localStorage.getItem('admin_blogs');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const localBlogs = parsed.map((b: any) => ({
          ...b,
          cat: b.categories?.name || b.cat || 'Branding',
          read: b.read_time || b.read || '5 min read',
          excerpt: b.subtitle || b.excerpt || '',
        }));
        if (blogs.length === 0) {
          blogs = localBlogs;
        } else {
          localBlogs.forEach((lb: SyncedBlog) => {
            if (!blogs.some((b) => b.id === lb.id || b.slug === lb.slug)) {
              blogs.push(lb);
            }
          });
        }
      }
    } catch {
      // Fall through
    }
  }

  if (forceRestoreDefaults) {
    localStorage.removeItem('admin_deleted_blogs');
  }

  const deletedRaw = localStorage.getItem('admin_deleted_blogs');
  const deletedIds: string[] = deletedRaw ? JSON.parse(deletedRaw) : [];

  // Merge in DEFAULT_BLOGS so that old blogs are always present unless explicitly deleted
  const merged = [...blogs];
  DEFAULT_BLOGS.forEach((db) => {
    const isDeleted = !forceRestoreDefaults && deletedIds.some((did) => did === db.id || did === db.slug);
    if (!isDeleted && !merged.some((b) => b.id === db.id || b.slug === db.slug)) {
      merged.push(db);
    }
  });

  localStorage.setItem('admin_blogs', JSON.stringify(merged));
  return merged;
}

export async function deleteSyncedBlog(idOrSlug: string): Promise<void> {
  if (typeof window === 'undefined') return;

  if (isSupabaseConfigured) {
    try {
      await supabase.from('blogs').delete().eq('id', idOrSlug);
    } catch {
      // Fall through
    }
  }

  // Record deleted ID
  const deletedRaw = localStorage.getItem('admin_deleted_blogs');
  const deletedIds: string[] = deletedRaw ? JSON.parse(deletedRaw) : [];
  if (!deletedIds.includes(idOrSlug)) {
    deletedIds.push(idOrSlug);
    localStorage.setItem('admin_deleted_blogs', JSON.stringify(deletedIds));
  }

  const stored = localStorage.getItem('admin_blogs');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        const updated = parsed.filter((b: any) => b.id !== idOrSlug && b.slug !== idOrSlug);
        localStorage.setItem('admin_blogs', JSON.stringify(updated));
      }
    } catch {
      // Fall through
    }
  }

  notifyPortfolioDataUpdated();
}

export async function restoreDefaultBlogs(): Promise<SyncedBlog[]> {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_deleted_blogs');
    localStorage.setItem('admin_blogs', JSON.stringify(DEFAULT_BLOGS));
    notifyPortfolioDataUpdated();
  }
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

// ----------------------------------------------------
// CATEGORIES SYNC
// ----------------------------------------------------
export async function getSyncedCategories(type?: 'work' | 'case' | 'blog'): Promise<SyncedCategory[]> {
  if (typeof window === 'undefined') {
    const list = type ? DEFAULT_CATEGORIES.filter((c) => c.type === type) : DEFAULT_CATEGORIES;
    return type === 'work' ? sortWorkCategories(list) : list;
  }

  let list: SyncedCategory[] = [];

  // 1. Try Supabase if configured
  if (isSupabaseConfigured) {
    try {
      let query = supabase.from('categories').select('*').order('created_at', { ascending: false });
      if (type) {
        query = query.eq('type', type);
      }
      const { data, error } = await query;
      if (!error && Array.isArray(data) && data.length > 0) {
        list = data;
        // Merge Supabase categories into localStorage without overwriting cross-type duplicates
        const stored = localStorage.getItem('admin_categories');
        const existing: SyncedCategory[] = stored ? JSON.parse(stored) : [];
        const merged = [...data];
        existing.forEach((e) => {
          if (!merged.some((m) => m.id === e.id || (m.slug === e.slug && m.type === e.type))) {
            merged.push(e);
          }
        });
        localStorage.setItem('admin_categories', JSON.stringify(merged));
      }
    } catch {
      // Fall through to localStorage
    }
  }

  // 2. Try localStorage
  const stored = localStorage.getItem('admin_categories');
  if (stored) {
    try {
      const parsed: SyncedCategory[] = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Legacy migration: ensure the 6 user categories from Image 2 are present if old template was stored
        const hasImage2Cats = parsed.some(
          (c) => c.type === 'work' && (c.slug === 'brand-profiles' || c.slug === 'package-designing' || c.slug === 'social-media-creatives')
        );
        if (!hasImage2Cats) {
          const defaultWorkCats = DEFAULT_CATEGORIES.filter((c) => c.type === 'work');
          defaultWorkCats.forEach((dw) => {
            if (!parsed.some((c) => c.slug === dw.slug && c.type === 'work')) {
              parsed.push(dw);
            }
          });
          localStorage.setItem('admin_categories', JSON.stringify(parsed));
        }
        list = type ? parsed.filter((c) => c.type === type) : parsed;
      }
    } catch {
      // Fall through
    }
  }

  // 3. Fallback if storage was empty
  if (list.length === 0) {
    list = type ? DEFAULT_CATEGORIES.filter((c) => c.type === type) : [...DEFAULT_CATEGORIES];
    if (!stored) {
      localStorage.setItem('admin_categories', JSON.stringify(DEFAULT_CATEGORIES));
    }
  }

  return type === 'work' ? sortWorkCategories(list) : list;
}

export async function saveSyncedCategory(category: {
  id?: string;
  name: string;
  slug: string;
  type: 'work' | 'case' | 'blog';
  order?: number;
}): Promise<SyncedCategory> {
  const generatedId = category.id || `${category.type}-${category.slug}`;
  const newCat: SyncedCategory = {
    id: generatedId,
    name: category.name.trim(),
    slug: category.slug.trim(),
    type: category.type,
    created_at: new Date().toISOString(),
    order: category.order,
  };

  // 1. Try Supabase
  if (isSupabaseConfigured) {
    try {
      // If updating an existing database record (UUID format)
      if (category.id && !category.id.startsWith(`${category.type}-`)) {
        await supabase.from('categories').update({
          name: newCat.name,
          slug: newCat.slug,
          type: newCat.type,
        }).eq('id', category.id);
      } else {
        const { data } = await supabase.from('categories').insert([{
          name: newCat.name,
          slug: newCat.slug,
          type: newCat.type,
        }]).select();
        if (data && data[0]?.id) {
          newCat.id = data[0].id;
        }
      }
    } catch {
      // Fall through to localStorage
    }
  }

  // 2. localStorage - Match on ID OR (same slug AND same type)
  // NEVER overwrite a category of a different type!
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('admin_categories');
    let list: SyncedCategory[] = stored ? JSON.parse(stored) : [...DEFAULT_CATEGORIES];
    const index = list.findIndex(
      (c) => c.id === newCat.id || (c.slug === newCat.slug && c.type === newCat.type)
    );
    if (index >= 0) {
      list[index] = { ...list[index], ...newCat };
    } else {
      list.push(newCat);
    }
    localStorage.setItem('admin_categories', JSON.stringify(list));
    notifyPortfolioDataUpdated();
  }

  return newCat;
}

export async function deleteSyncedCategory(id: string, type?: 'work' | 'case' | 'blog'): Promise<void> {
  // 1. Try Supabase
  if (isSupabaseConfigured) {
    try {
      let query = supabase.from('categories').delete().eq('id', id);
      if (type) {
        query = query.eq('type', type);
      }
      await query;
    } catch {
      // Fall through
    }
  }

  // 2. localStorage - Safe deletion only targeting the specified type
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('admin_categories');
    let list: SyncedCategory[] = stored ? JSON.parse(stored) : [...DEFAULT_CATEGORIES];
    list = list.filter((c) => {
      // Exact ID match:
      if (c.id === id) {
        if (type && c.type && c.type !== type) return true; // keep if different type
        return false;
      }
      // Slug match:
      if (type && c.slug === id && c.type === type) {
        return false;
      }
      return true;
    });
    localStorage.setItem('admin_categories', JSON.stringify(list));
    notifyPortfolioDataUpdated();
  }
}
