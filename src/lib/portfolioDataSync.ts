import { supabase, isSupabaseConfigured } from './supabase';
import { CASES, CaseStudy } from '@/data/portfolioData';
import { saveBlogImageIdb, getBlogImageIdb } from './idbStorage';

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
  { id: 'work-ui-ux-design', name: 'UI/UX Design', slug: 'ui-ux-design', type: 'work', created_at: '2026-10-30T10:02:00.000Z', order: 3 },
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
    cat: 'UI/UX Design',
    category_id: 'ui-ux-design',
    cta: 'Product design',
    year: '2025',
    created_at: new Date('2025-02-10').toISOString(),
    categories: { name: 'UI/UX Design' },
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

export const OBSOLETE_BLOG_SLUGS = new Set([
  'building-your-first-design-system-in-figma',
  'landing-pages-that-convert',
  'cmyk-vs-rgb-vs-hsl',
  'becoming-a-brand-designer',
  'design-systems-in-ui',
]);

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
            // Ensure Trevio is in UI/UX Design
            if (slug === 'trevio') {
              return {
                ...w,
                cat: 'UI/UX Design',
                category_id: 'ui-ux-design',
                categories: { name: 'UI/UX Design' },
                cta: w.cta || 'Product design',
              };
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

  const isObsolete = (item: any) => {
    const slug = (item.slug || '').toLowerCase().trim();
    const id = (item.id || '').toLowerCase().trim();
    return OBSOLETE_BLOG_SLUGS.has(slug) || OBSOLETE_BLOG_SLUGS.has(id);
  };

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*, categories(name)')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        blogs = data
          .filter((b: any) => !isObsolete(b))
          .map((b: any) => ({
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
        const localBlogs = parsed
          .filter((b: any) => !isObsolete(b))
          .map((b: any) => ({
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

  // Ensure obsolete blogs are persistently recorded in deleted list
  let updatedDeleted = false;
  OBSOLETE_BLOG_SLUGS.forEach((obsSlug) => {
    if (!deletedIds.includes(obsSlug)) {
      deletedIds.push(obsSlug);
      updatedDeleted = true;
    }
  });
  if (updatedDeleted) {
    try {
      localStorage.setItem('admin_deleted_blogs', JSON.stringify(deletedIds));
    } catch {}
  }

  // Merge in DEFAULT_BLOGS so that official default blogs are present unless explicitly deleted
  const merged = [...blogs];
  DEFAULT_BLOGS.forEach((db) => {
    const isDeleted = !forceRestoreDefaults && deletedIds.some((did) => did === db.id || did === db.slug);
    if (!isDeleted && !merged.some((b) => b.id === db.id || b.slug === db.slug)) {
      merged.push(db);
    }
  });

  // Enrich with images stored in IndexedDB if missing or empty
  for (const b of merged) {
    if (!b.image_url) {
      try {
        const idbImg = (await getBlogImageIdb(b.id)) || (await getBlogImageIdb(b.slug));
        if (idbImg) {
          b.image_url = idbImg;
        }
      } catch {}
    }
  }

  // Cache to localStorage safely
  try {
    localStorage.setItem('admin_blogs', JSON.stringify(merged));
  } catch (storageErr) {
    console.warn('LocalStorage quota limit reached in getSyncedBlogs, persisting without large data URLs:', storageErr);
    try {
      const lightweight = merged.map((b) => ({
        ...b,
        image_url: b.image_url && b.image_url.startsWith('data:') ? '' : b.image_url,
      }));
      localStorage.setItem('admin_blogs', JSON.stringify(lightweight));
    } catch {}
  }

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
    // Only remove legitimate deleted IDs; keep obsolete slugs deleted
    localStorage.setItem('admin_deleted_blogs', JSON.stringify(Array.from(OBSOLETE_BLOG_SLUGS)));
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
  if (found && !found.image_url) {
    try {
      const idbImg = (await getBlogImageIdb(found.id)) || (await getBlogImageIdb(found.slug));
      if (idbImg) {
        found.image_url = idbImg;
      }
    } catch {}
  }
  return found || null;
}

export async function saveSyncedBlog(blogRecord: any, id?: string): Promise<SyncedBlog> {
  const isEditing = Boolean(id);
  const targetId = id || blogRecord.id || blogRecord.slug;
  const targetSlug = blogRecord.slug || targetId;

  // 1. Immediately store cover image in IndexedDB (bypasses localStorage 5MB quota)
  if (blogRecord.image_url) {
    try {
      await saveBlogImageIdb(targetId, blogRecord.image_url);
      if (targetSlug && targetSlug !== targetId) {
        await saveBlogImageIdb(targetSlug, blogRecord.image_url);
      }
    } catch (idbErr) {
      console.warn('IndexedDB save failed:', idbErr);
    }
  }

  // 2. Supabase sync if configured
  if (isSupabaseConfigured) {
    try {
      const payload = {
        title: blogRecord.title,
        slug: blogRecord.slug,
        category_id: blogRecord.category_id,
        content: blogRecord.raw_content || blogRecord.content,
        image_url: blogRecord.image_url,
        published: blogRecord.published ?? true,
      };

      const savePromise = isEditing
        ? supabase.from('blogs').update(payload).eq('id', targetId)
        : supabase.from('blogs').insert([payload]);

      await Promise.race([
        savePromise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('Supabase timeout')), 2500)),
      ]);
    } catch (e) {
      console.warn('Supabase save failed/timed out, continuing with local storage:', e);
    }
  }

  // 3. Local storage sync
  if (typeof window !== 'undefined') {
    let list: any[] = [];
    try {
      const stored = localStorage.getItem('admin_blogs');
      list = stored ? JSON.parse(stored) : [...DEFAULT_BLOGS];
    } catch {
      list = [...DEFAULT_BLOGS];
    }

    // Filter out obsolete mock blogs
    list = list.filter((b: any) => {
      const bId = (b.id || '').toLowerCase().trim();
      const bSlug = (b.slug || '').toLowerCase().trim();
      return !OBSOLETE_BLOG_SLUGS.has(bId) && !OBSOLETE_BLOG_SLUGS.has(bSlug);
    });

    const normTarget = (targetId || '').toLowerCase().trim();
    const normSlug = (targetSlug || '').toLowerCase().trim();

    let updated = false;
    list = list.map((b: any) => {
      const bId = (b.id || '').toLowerCase().trim();
      const bSlug = (b.slug || '').toLowerCase().trim();
      if (bId === normTarget || bSlug === normTarget || bSlug === normSlug || bId === normSlug) {
        updated = true;
        return { ...b, ...blogRecord, id: b.id || targetId };
      }
      return b;
    });

    if (!updated) {
      list.unshift({ ...blogRecord, id: targetId });
    }

    try {
      localStorage.setItem('admin_blogs', JSON.stringify(list));
    } catch (storageErr) {
      console.warn('LocalStorage quota issue when saving blogs:', storageErr);
      // Fallback without large data URLs since they are securely stored in IndexedDB
      try {
        const lightweightList = list.map((b: any) => ({
          ...b,
          image_url: b.image_url && b.image_url.startsWith('data:') ? '' : b.image_url,
        }));
        localStorage.setItem('admin_blogs', JSON.stringify(lightweightList));
      } catch (innerErr) {
        console.error('Critical storage quota error:', innerErr);
      }
    }

    // Remove from deleted list if present
    try {
      const deletedRaw = localStorage.getItem('admin_deleted_blogs');
      if (deletedRaw) {
        const deletedIds: string[] = JSON.parse(deletedRaw);
        const filtered = deletedIds.filter(
          (did) => did.toLowerCase().trim() !== normTarget && did.toLowerCase().trim() !== normSlug
        );
        localStorage.setItem('admin_deleted_blogs', JSON.stringify(filtered));
      }
    } catch {
      // Fall through
    }

    notifyPortfolioDataUpdated();
  }

  return blogRecord;
}

// ----------------------------------------------------
// CATEGORIES SYNC & SANITIZATION
// ----------------------------------------------------
export function cleanWorkCategories(categories: SyncedCategory[]): SyncedCategory[] {
  // Disallow blog/case slugs or obsolete slugs from polluting work categories
  const disallowedWorkSlugs = new Set([
    'web-design',
    'design-systems',
    'mobile-app',
    'case-design-systems',
    'fintech-banking',
    'saas-platforms',
    'strategic-branding',
  ]);

  const nonWork = categories.filter((c) => c.type !== 'work');
  let work = categories.filter((c) => c.type === 'work');

  // 1. Remove disallowed work slugs (e.g. blog/case categories that leaked into work)
  work = work.filter((c) => !disallowedWorkSlugs.has((c.slug || '').toLowerCase()));

  // 2. Unify UI/UX Designs / UI/UX Design into a single "UI/UX Design" (slug: ui-ux-design)
  const hasUiUx = work.some((c) => c.slug === 'ui-ux-design' || c.slug === 'ui-ux-designs');
  work = work.filter((c) => c.slug !== 'ui-ux-designs');
  if (hasUiUx) {
    const existing = work.find((c) => c.slug === 'ui-ux-design');
    if (existing) {
      existing.name = 'UI/UX Design';
      existing.slug = 'ui-ux-design';
      if (!existing.order) existing.order = 3;
    } else {
      work.push({
        id: 'work-ui-ux-design',
        name: 'UI/UX Design',
        slug: 'ui-ux-design',
        type: 'work',
        created_at: '2026-10-30T10:02:00.000Z',
        order: 3,
      });
    }
  }

  // 3. Ensure the 6 user-requested work categories are present unless explicitly deleted
  const deletedRaw = typeof window !== 'undefined' ? localStorage.getItem('admin_deleted_categories') : null;
  const deletedKeys: string[] = deletedRaw ? JSON.parse(deletedRaw) : [];

  const defaultWork = DEFAULT_CATEGORIES.filter((c) => c.type === 'work');
  defaultWork.forEach((dw) => {
    const isDeleted =
      deletedKeys.includes(`work:${dw.id}`) ||
      deletedKeys.includes(`work:${dw.slug}`) ||
      deletedKeys.includes(`all:${dw.id}`) ||
      deletedKeys.includes(`all:${dw.slug}`);
    if (!isDeleted && !work.some((w) => w.slug === dw.slug || w.id === dw.id)) {
      work.push(dw);
    }
  });

  return [...work, ...nonWork];
}

export async function getSyncedCategories(type?: 'work' | 'case' | 'blog'): Promise<SyncedCategory[]> {
  if (typeof window === 'undefined') {
    const cleaned = cleanWorkCategories(DEFAULT_CATEGORIES);
    const list = type ? cleaned.filter((c) => c.type === type) : cleaned;
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
        const stored = localStorage.getItem('admin_categories');
        const existing: SyncedCategory[] = stored ? JSON.parse(stored) : [];
        const merged = [...data];
        existing.forEach((e) => {
          if (!merged.some((m) => m.id === e.id || (m.slug === e.slug && m.type === e.type))) {
            merged.push(e);
          }
        });
        const cleaned = cleanWorkCategories(merged);
        localStorage.setItem('admin_categories', JSON.stringify(cleaned));
        list = type ? cleaned.filter((c) => c.type === type) : cleaned;
      }
    } catch {
      // Fall through to localStorage
    }
  }

  // 2. Try localStorage
  if (list.length === 0) {
    const stored = localStorage.getItem('admin_categories');
    if (stored) {
      try {
        const parsed: SyncedCategory[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const cleaned = cleanWorkCategories(parsed);
          localStorage.setItem('admin_categories', JSON.stringify(cleaned));
          list = type ? cleaned.filter((c) => c.type === type) : cleaned;
        }
      } catch {
        // Fall through
      }
    }
  }

  // 3. Fallback if storage was empty
  if (list.length === 0) {
    const cleaned = cleanWorkCategories(DEFAULT_CATEGORIES);
    list = type ? cleaned.filter((c) => c.type === type) : [...cleaned];
    localStorage.setItem('admin_categories', JSON.stringify(cleaned));
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

    // Clear from admin_deleted_categories if re-creating
    const deletedRaw = localStorage.getItem('admin_deleted_categories');
    if (deletedRaw) {
      try {
        const deletedKeys: string[] = JSON.parse(deletedRaw);
        const filtered = deletedKeys.filter(
          (k) =>
            k !== `${newCat.type}:${newCat.id}` &&
            k !== `${newCat.type}:${newCat.slug}` &&
            k !== `all:${newCat.id}` &&
            k !== `all:${newCat.slug}`
        );
        localStorage.setItem('admin_deleted_categories', JSON.stringify(filtered));
      } catch {
        // Fall through
      }
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
      const typeMatches = !type || !c.type || c.type === type;
      if (!typeMatches) return true;
      if (c.id === id || c.slug === id || (type && c.id === `${type}-${id}`)) {
        return false;
      }
      return true;
    });
    localStorage.setItem('admin_categories', JSON.stringify(list));

    // Record deleted key so default categories don't re-seed it
    const deletedRaw = localStorage.getItem('admin_deleted_categories');
    const deletedKeys: string[] = deletedRaw ? JSON.parse(deletedRaw) : [];
    const key = `${type || 'all'}:${id}`;
    if (!deletedKeys.includes(key)) {
      deletedKeys.push(key);
      localStorage.setItem('admin_deleted_categories', JSON.stringify(deletedKeys));
    }

    notifyPortfolioDataUpdated();
  }
}
