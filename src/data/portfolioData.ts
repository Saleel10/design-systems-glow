export interface Service {
  n: string;
  title: string;
  time: string;
  desc: string;
  problem: string;
  approach: string;
  deliv: string[];
  tools: string[];
}

export interface ProcessStep {
  n: string;
  title: string;
  desc: string;
}

export interface PricingPlan {
  name: string;
  sub: string;
  price: string;
  badge: string;
  delivery: string;
  dark?: boolean;
  feats: string[];
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  linkedin: string;
}

export interface Job {
  role: string;
  org: string;
  period: string;
  resp: string[];
  ach: string[];
  tools: string[];
}

export interface SkillCategory {
  title: string;
  items: string[];
}

export interface WorkItem {
  id: string;
  title: string;
  cat: string;
  cta: string;
  year: string;
  ph: string;
  img: string;
  slug: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  tag: string;
  year: string;
  title: string;
  summary: string;
  role: string;
  duration: string;
  overview: string;
  challenge: string;
  outcome: string[];
}

export interface CaseStep {
  n: string;
  t: string;
  d: string;
}

export interface PostItem {
  slug: string;
  title: string;
  cat: string;
  read: string;
  ex?: string;
  img: string;
}

export const SERVICES: Service[] = [
  {
    title: 'Brand Identity Design',
    time: '2–4 weeks',
    desc: 'Modern brand identities that build trust, communicate vision, and create a memorable digital presence.',
    problem: 'Brands often struggle with inconsistent visuals, weak positioning, and lack of recognition across digital platforms.',
    approach: 'Creating strategic visual identities through research, positioning, and cohesive brand system development.',
    deliv: ['Logo & visual identity system', 'Brand guidelines', 'Typography & color system', 'Social media brand assets', 'Marketing & brand collateral'],
    tools: ['Figma', 'Illustrator', 'Photoshop'],
  },
  {
    title: 'UI/UX Design',
    time: '2–4 weeks',
    desc: 'Intuitive, user-focused digital experiences with clean interfaces, smooth interactions, and strategic usability.',
    problem: 'Products lose users to confusing flows, cluttered interfaces, and decisions made without understanding real needs.',
    approach: 'Research-led flows, wireframes and high-fidelity prototypes, validated with usability testing before handoff.',
    deliv: ['User flows & IA', 'Wireframes', 'High-fidelity UI', 'Interactive prototype', 'Developer handoff'],
    tools: ['Figma', 'FigJam', 'Maze'],
  },
  {
    title: 'Design Systems',
    time: '3–6 weeks',
    desc: 'Scalable design systems and reusable components that ensure consistency across products and platforms.',
    problem: 'As products grow, teams duplicate work and interfaces drift apart, slowing every new release.',
    approach: 'Auditing existing UI, defining tokens and foundations, then building a documented, reusable component library.',
    deliv: ['UI audit', 'Design tokens', 'Component library', 'Usage documentation'],
    tools: ['Figma', 'Tokens Studio'],
  },
  {
    title: 'Website & Landing Pages',
    time: '1–3 weeks',
    desc: 'High-converting websites and landing pages that combine visual impact with seamless user experience.',
    problem: 'Websites that look good but fail to explain, guide, or convert visitors into customers.',
    approach: 'Structuring content around user intent, then designing responsive pages with clear hierarchy and calls to action.',
    deliv: ['Sitemap & content structure', 'Responsive page designs', 'Prototype', 'Build-ready assets'],
    tools: ['Figma', 'Framer', 'Webflow'],
  },
  {
    title: 'Product Strategy',
    time: '1–2 weeks',
    desc: 'Transforming ideas into structured digital products through research-driven strategy and user insights.',
    problem: 'Promising ideas stall without a clear definition of users, priorities, and what to build first.',
    approach: 'Workshops, competitor analysis and user research distilled into personas, roadmaps and a focused MVP scope.',
    deliv: ['Research synthesis', 'Personas', 'Feature prioritisation', 'MVP roadmap'],
    tools: ['FigJam', 'Notion'],
  },
  {
    title: 'Creative Direction',
    time: 'Ongoing',
    desc: 'Leading visual direction with a strong focus on aesthetics, storytelling, and brand consistency.',
    problem: 'Campaigns and content feel disconnected when there is no single visual voice guiding them.',
    approach: 'Setting the visual narrative, moodboards and art direction, then guiding execution across channels.',
    deliv: ['Campaign concepts', 'Moodboards & art direction', 'Content guidelines', 'Execution review'],
    tools: ['Photoshop', 'Illustrator', 'InDesign'],
  },
].map((s, i) => ({ ...s, n: String(i + 1).padStart(2, '0') }));

export const PROCESS: ProcessStep[] = [
  { title: 'Discover', desc: 'Research, stakeholder interviews, and competitive analysis to understand the problem space.' },
  { title: 'Define', desc: 'Synthesize insights into clear objectives, user personas, and strategic direction.' },
  { title: 'Design', desc: 'Wireframes, prototypes, and iterative design with continuous feedback loops.' },
  { title: 'Deliver', desc: 'Polished deliverables, design system documentation, and seamless handoff.' },
].map((p, i) => ({ ...p, n: String(i + 1).padStart(2, '0') }));

export const PLANS: PricingPlan[] = [
  {
    name: 'Brand Essentials',
    sub: 'A strong visual foundation for your brand.',
    price: '$280',
    badge: '',
    delivery: '7–10 working days',
    feats: [
      'Logo design (2 concepts)',
      'Color palette & typography',
      'Mini brand guidelines',
      '3 social media templates',
      'Profile & cover design',
      'Digital and print-ready files',
      '7–10 working days',
    ],
  },
  {
    name: 'Brand Identity',
    sub: 'A cohesive identity system for growing businesses.',
    price: '$480',
    badge: 'Most popular',
    delivery: '12–18 working days',
    dark: true,
    feats: [
      'Everything in Brand Essentials',
      'Logo design (3 concepts)',
      'Brand direction & visual language',
      'Comprehensive brand guidelines',
      'Business card & stationery',
      '6 social media templates',
      'Brand application mockups',
      'Complete brand asset handover',
      '12–18 working days',
    ],
  },
  {
    name: 'Brand & Digital Experience',
    sub: 'A complete brand and digital design experience.',
    price: '$780',
    badge: '',
    delivery: '20–30 working days',
    feats: [
      'Everything in Brand Identity',
      'Extended visual identity & art direction',
      'Website UI/UX design (up to 5 pages)',
      'Responsive layouts & Figma prototype',
      'Reusable design system & UI components',
      '1 product packaging design',
      'Brand presentation deck',
      'Developer-ready design handoff',
      '15 days of design support',
      '20–30 working days',
    ],
  },
];

export const JOBS: Job[] = [
  {
    role: 'Creative Designer',
    org: 'HW Growth Studio',
    period: '2025-Present',
    resp: ['Designed brand identities and visual systems', 'Created social media creatives and campaigns', 'Developed marketing and promotional assets', 'Collaborated with marketing teams on creative strategy'],
    ach: ['Delivered 100+ creative assets for brands', 'Improved visual consistency across projects', 'Supported high-performing marketing campaigns', 'Managed end-to-end creative executions'],
    tools: ['Illustrator', 'Photoshop', 'Figma', 'InDesign'],
  },
  {
    role: 'Creative Graphic and UI/UX Designer',
    org: 'Freelance',
    period: '2021-Present',
    resp: ['End-to-end brand identity design for startups', 'UI/UX design for web and mobile products', 'Design systems development and documentation', 'Client strategy and creative direction'],
    ach: ['Delivered 50+ brand projects', 'Built 3 enterprise-scale design systems', 'Maintained 98% client satisfaction rate'],
    tools: ['Figma', 'Illustrator', 'Photoshop', 'Framer'],
  },
  {
    role: 'UI/UX Designer',
    org: 'Mapki Solutions',
    period: '2023-Present',
    resp: ['Designed responsive web and mobile interfaces', 'Created wireframes and interactive prototypes', 'Improved usability and user experience flows', 'Collaborated closely with developers'],
    ach: ['Designed interfaces for AI automation platforms', 'Improved UI consistency across products', 'Built scalable and modern design systems', 'Enhanced engagement through UX improvements'],
    tools: ['Figma', 'FigJam', 'Miro', 'Maze'],
  },
  {
    role: 'Graphic Designer',
    org: 'Connect EMEA',
    period: '2023-2025',
    resp: ['Designed event and campaign creatives', 'Created social media content', 'Supported branding initiatives', 'Assisted with UI and presentation design'],
    ach: ['Designed visuals for major student events', 'Increased engagement through creative campaigns', 'Maintained branding consistency'],
    tools: ['Illustrator', 'Photoshop', 'Canva', 'Figma'],
  },
  {
    role: 'Graphic Designer',
    org: 'Luxora Furniture',
    period: '2021-2023',
    resp: ['Designed branding and marketing materials', 'Created promotional digital assets', 'Produced advertising creatives', 'Supported UI-related design tasks'],
    ach: ['Delivered creatives for multiple campaigns', 'Improved brand presentation quality', 'Worked across digital platforms', 'Maintained strong visual consistency'],
    tools: ['Illustrator', 'Photoshop', 'Figma', 'Canva'],
  },
];

export const SKILLS: SkillCategory[] = [
  {
    title: 'UI/UX Design',
    items: ['UX Research', 'Wireframing', 'Prototyping', 'Design Systems', 'Interaction Design', 'User Flows', 'Usability Testing', 'Information Architecture'],
  },
  {
    title: 'Graphic Design',
    items: ['Brand Identity', 'Visual Systems', 'Typography', 'Color Theory', 'Print Design', 'Social Media Design', 'Packaging Design', 'Creative Direction'],
  },
];

export const WORKS: WorkItem[] = [
  { id: 'taxverse', slug: 'taxverse', title: 'Taxverse', cat: 'Branding', cta: 'Brand identity', year: '2025', ph: 'Taxverse — brand identity', img: 'Taxverse-logo.png' },
  { id: 'trevio', slug: 'trevio', title: 'Trevio', cat: 'UI/UX', cta: 'Product design', year: '2025', ph: 'Trevio — app screens', img: 'trevio-logo.png' },
  { id: 'shad', slug: 'shad-creative-education', title: 'Shad Creative Education', cat: 'Branding', cta: 'Visual system', year: '2024', ph: 'Shad — identity system', img: 'shad-logo.png' },
  { id: 'buraq', slug: 'buraq-contracting', title: 'Buraq Contracting', cat: 'Web', cta: 'Website', year: '2024', ph: 'Buraq — website', img: 'buraq-logo.png' },
  { id: '2nd-street', slug: '2nd-street', title: '2nd Street', cat: 'Branding', cta: 'Brand & packaging', year: '2024', ph: '2nd Street — packaging', img: 'Secondstreet-logo.png' },
  { id: 'raidhan', slug: 'raidhan', title: 'Raidhan', cat: 'Social', cta: 'Campaign creatives', year: '2023', ph: 'Raidhan — social campaign', img: 'raidhan-logo.png' },
];

export const CASES: CaseStudy[] = [
  {
    id: 'taxverse',
    client: 'Taxverse',
    tag: 'Brand identity',
    year: '2025',
    title: 'Making tax consultancy feel human.',
    summary: 'Repositioning a business consultancy with a calm, trustworthy identity system that scales from documents to digital.',
    role: 'Brand designer',
    duration: '4 weeks',
    overview: 'Taxverse needed an identity that felt credible to businesses yet approachable to first-time founders — without falling into the cold, generic look of the category.',
    challenge: 'The existing brand was inconsistent across proposals, social and the website. Competitors all looked the same, and nothing communicated the team\'s friendly, advisory approach.',
    outcome: [
      'A single identity system used consistently across every touchpoint',
      'Guidelines that let the internal team produce on-brand assets independently',
      'A clearer, more distinctive presence in a crowded category',
    ],
  },
  {
    id: 'trevio',
    client: 'Trevio',
    tag: 'UI/UX · Design system',
    year: '2025',
    title: 'A booking flow with fewer steps and less doubt.',
    summary: 'Redesigning the core user journey and building a reusable component library so the product team could ship faster.',
    role: 'Product designer',
    duration: '6 weeks',
    overview: 'Trevio\'s product had grown feature by feature. The goal was to simplify the main flow and give the team a system to build on.',
    challenge: 'Users dropped off mid-flow, and screens built by different people used different patterns, spacing and components.',
    outcome: [
      'A streamlined core flow with clearer hierarchy at each step',
      'A documented Figma component library with tokens',
      'Faster design-to-dev handoff for new features',
    ],
  },
  {
    id: 'shad',
    client: 'Shad Creative Education',
    tag: 'Visual system',
    year: '2024',
    title: 'One bilingual identity for every classroom.',
    summary: 'A bilingual (English/Arabic) visual system for an education brand, designed to work from signage to social media.',
    role: 'Brand & creative direction',
    duration: '3 weeks',
    overview: 'Shad needed a mark and system that worked equally well in English and Arabic, and could flex across print, signage and digital content.',
    challenge: 'Bilingual lockups often feel unbalanced; the brand also needed a template system non-designers could use for weekly content.',
    outcome: [
      'Balanced bilingual logo lockups',
      'A flexible template kit for weekly social content',
      'Consistent visuals across print and digital',
    ],
  },
];

export const STEPS: CaseStep[] = [
  { t: 'Discover', d: 'Stakeholder interviews, audit of existing touchpoints and competitor landscape.' },
  { t: 'Define', d: 'Positioning, audience and design principles agreed before any visuals.' },
  { t: 'Design', d: 'Concept routes explored, refined through feedback rounds into one system.' },
  { t: 'Deliver', d: 'Final assets, guidelines and templates handed over with documentation.' },
].map((s, i) => ({ ...s, n: String(i + 1).padStart(2, '0') }));

export const POSTS: PostItem[] = [
  {
    slug: 'why-your-brand-needs-a-system',
    title: 'Why your brand needs a system, not just a logo',
    cat: 'Branding',
    read: '6 min read',
    ex: 'A logo is a starting point. The real value is in the rules that make every touchpoint feel like the same brand.',
    img: 'blog-1',
  },
  {
    slug: 'designing-for-clarity',
    title: 'Designing for clarity: lessons from 800+ projects',
    cat: 'Process',
    read: '5 min read',
    ex: 'How removing visual noise and focusing on user intent accelerates decision-making.',
    img: 'blog-2',
  },
  {
    slug: 'building-your-first-design-system-in-figma',
    title: 'Building your first design system in Figma',
    cat: 'Design systems',
    read: '8 min read',
    ex: 'Practical token architecture, variable modes, and component anatomy for growing teams.',
    img: 'blog-3',
  },
  {
    slug: 'landing-pages-that-convert',
    title: 'Landing pages that convert: structure before style',
    cat: 'Web',
    read: '4 min read',
    ex: 'Why hierarchy, contrast, and message sequencing beat trendy animations every time.',
    img: 'blog-4',
  },
];

export const CLIENTS = [
  'raidhan',
  '2nd Street',
  'Shad',
  'Taxverse',
  'Trevio',
  'Buraq',
  'Quizzario',
  'HW Growth',
  'Mediwell',
  'Kidozy',
  'Destinify',
  'Crafterline',
];

export const STATS = [
  { v: '5+', l: 'Years experience' },
  { v: '800+', l: 'Projects shipped' },
  { v: '50+', l: 'Happy clients' },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      'Working with Muhammed Saleel CP has been a wonderful experience. He understands the idea behind a brand and brings it to life with thoughtful, fresh, and purposeful designs. More than a designer, he feels like a creative partner who genuinely cares about the brand.',
    author: 'Mridul M Mahesh',
    role: 'Founder & MD, Quizzario Pvt Ltd',
    linkedin: 'https://www.linkedin.com/in/mridul-m-mahesh/',
  },
  {
    quote:
      'I’ve watched Muhammed Saleel grow from a passionate learner into a confident and committed designer. What stands out most is his consistency, willingness to learn, and dedication to improving his craft. His journey in design is a reflection of his hard work, curiosity, and genuine passion for creating meaningful work.',
    author: 'Salmanul Faris CC',
    role: 'Co-Founder of Connect Foundation',
    linkedin: 'https://www.linkedin.com/in/salmanulfariscc/',
  },
  {
    quote:
      'I’ve known and worked with Saleel since 2023 across 10+ projects. Even when he started working with me while still in college, his professionalism, communication, and commitment always stood out. I always knew he had great potential, and it’s great to see how far he has come. He’s reliable, takes ownership of his work, and delivers professionally and on time. I highly recommend him and wish him continued success!',
    author: 'Rishad Cheruthottathil',
    role: 'Founder & Principal Strategist INNOSTAA | Business Growth Agency',
    linkedin: 'https://www.linkedin.com/in/rishad-digitalgrowth/',
  },
  {
    quote:
      'I would recommend Saleel over other designers because of his openness to understanding our design language and his ability to align his skillset with it. One reference and a conversation are all it takes to get a killer design done!',
    author: 'Shad Muhammed T',
    role: 'Founder & Director of HW Growth Studio',
    linkedin: 'https://www.linkedin.com/in/shad-muhammed/',
  },
  {
    quote:
      'Working with Muhammed Saleel on projects for KIMS Group of Companies has been a great experience. His creativity, attention to detail, and ability to understand requirements quickly make him a reliable designer to work with. I’ve seen his growth firsthand, and his commitment to delivering quality work consistently stands out. I’m happy to recommend Saleel for his professionalism, creativity, and dedication.',
    author: 'Ahammed Yamil K',
    role: 'Chief operation officer Kims Group of companies',
    linkedin: 'https://www.linkedin.com/in/ahammed-yamil/',
  },
];

export const TESTIMONIAL = TESTIMONIALS[0];
