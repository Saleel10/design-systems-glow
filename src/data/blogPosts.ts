export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  date: string;
  content: {
    intro: string;
    sections: { heading: string; body: string }[];
    conclusion: string;
  };
}

export const blogPosts: BlogPost[] = [
  {
    slug: "cmyk-vs-rgb-vs-hsl",
    title: "CMYK vs RGB vs HSL — A Designer's Complete Guide",
    category: "Design Theory",
    readTime: "6 min",
    date: "Jan 15, 2024",
    excerpt: "Understanding color models is fundamental. Here's when and why to use each one.",
    content: {
      intro: "Color is arguably the most powerful tool in a designer's arsenal. But to wield it effectively, you need to understand the systems behind it. Whether you're designing for screen, print, or building design tokens, choosing the right color model matters more than most designers realize.",
      sections: [
        {
          heading: "RGB: The Language of Screens",
          body: "RGB (Red, Green, Blue) is an additive color model where colors are created by combining light. Every screen you've ever used — from your phone to a cinema projector — displays color using RGB. Each channel ranges from 0 to 255, giving us 16.7 million possible colors.\n\nWhen to use RGB: Digital designs, web development, app interfaces, video production, and any screen-based medium. Most design tools default to RGB, and CSS historically used it as the primary color notation.",
        },
        {
          heading: "CMYK: The Language of Print",
          body: "CMYK (Cyan, Magenta, Yellow, Key/Black) is a subtractive color model used in print. Unlike screens that emit light, printed materials reflect it. Inks absorb certain wavelengths and reflect others, which is why the model works differently.\n\nWhen to use CMYK: Any design destined for physical printing — business cards, packaging, editorial layouts, signage, and merchandise. Always convert your files to CMYK before sending to print to avoid color shifts.",
        },
        {
          heading: "HSL: The Designer's Secret Weapon",
          body: "HSL (Hue, Saturation, Lightness) is arguably the most intuitive color model for designers. Instead of mixing channels, you think in terms of: What color? (Hue: 0-360°), How vivid? (Saturation: 0-100%), and How bright? (Lightness: 0-100%).\n\nHSL is incredibly powerful for building color systems and design tokens. Need a darker variant? Reduce lightness. Need a muted version? Lower saturation. The relationships are predictable and systematic.",
        },
        {
          heading: "Building Color Systems with HSL",
          body: "Modern design systems increasingly use HSL as their foundation. By keeping the hue constant and varying saturation and lightness, you can generate entire palettes programmatically. This is exactly how tools like Tailwind CSS and most design token systems work.\n\nFor example, your primary color at HSL(142, 72%, 37%) can spawn hover states, disabled states, and background tints — all by adjusting just one or two values. This systematic approach ensures consistency across your entire product.",
        },
      ],
      conclusion: "Understanding color models isn't just academic knowledge — it's a practical superpower. Use RGB for development, CMYK for print, and HSL for building systematic, scalable color palettes. Master all three, and you'll make better color decisions in every medium.",
    },
  },
  {
    slug: "how-to-build-brand-systems-that-scale",
    title: "How to Build Brand Systems That Scale",
    category: "Branding",
    readTime: "8 min",
    date: "Feb 2, 2024",
    excerpt: "A systematic approach to building brand identities that grow with your business.",
    content: {
      intro: "A logo is not a brand. A color palette is not a brand. A brand is a system — a structured set of decisions that governs how a company presents itself across every touchpoint. Here's how to build one that scales.",
      sections: [
        {
          heading: "Start with Strategy, Not Aesthetics",
          body: "Before opening Figma, answer these questions: What does this brand believe? Who are we speaking to? What space do we occupy in the market? How should people feel when they interact with us?\n\nThese answers become your brand foundation. Every visual decision should trace back to strategy. When a client asks 'why this color?' you should have an answer rooted in positioning, not personal preference.",
        },
        {
          heading: "Design Tokens: The DNA of Your Brand",
          body: "Design tokens are the atomic-level decisions of your brand: colors, typography scales, spacing units, border radii, shadow depths. Document these as a single source of truth.\n\nTokens make your brand programmable. When you define 'primary-500' as a specific green, every designer and developer references the same value. Changes propagate everywhere. This is how brands like Spotify and Airbnb maintain consistency at scale.",
        },
        {
          heading: "Component Thinking",
          body: "Brand elements should be modular and composable. Your logo should work at 16px and 160px. Your typography system should handle a tweet and a whitepaper. Your color palette should work in light mode, dark mode, and accessibility contexts.\n\nThink in terms of flexibility within constraints. A strong system doesn't restrict creativity — it channels it. Give teams the building blocks and the rules for combining them.",
        },
        {
          heading: "Documentation is the Product",
          body: "A brand system without documentation is just a collection of files. Your guidelines document should cover: logo usage and clear space, color palette with accessibility ratios, typography hierarchy and pairing rules, photography and illustration style, tone of voice and messaging frameworks, and do's and don'ts with real examples.\n\nMake it living — update it as the brand evolves.",
        },
      ],
      conclusion: "Building brands that scale requires thinking like an architect, not a decorator. Start with strategy, build with systems, document everything, and create structures that empower teams to build consistently without bottlenecking through a single designer.",
    },
  },
  {
    slug: "freelancing-client-communication-problems",
    title: "Freelancing: Solving Client Communication Problems",
    category: "Freelancing",
    readTime: "5 min",
    date: "Mar 10, 2024",
    excerpt: "Common client challenges and frameworks for better project outcomes.",
    content: {
      intro: "After 4+ years of freelancing and 500+ projects, I've learned that most project failures aren't design failures — they're communication failures. Here are the patterns I've identified and the frameworks that solve them.",
      sections: [
        {
          heading: "The 'I'll Know It When I See It' Client",
          body: "This client can't articulate what they want but knows what they don't want. The solution: Never present a single concept. Show 3 distinct directions with clear rationale for each. Moodboards before mockups. Ask them to describe brands they admire and why. The goal is to externalize their internal vision before you start designing.",
        },
        {
          heading: "Scope Creep: Death by a Thousand Tweaks",
          body: "The project was a logo design. Now they want a full website. The solution: Crystal-clear proposals with numbered deliverables. A change request process for anything out of scope. Milestone-based payments that create natural checkpoints. Frame additions as opportunities, not problems: 'Absolutely, I'd love to add that. Here's what it would look like as a Phase 2.'",
        },
        {
          heading: "The Feedback Translation Layer",
          body: "When a client says 'make it pop,' they mean something specific — they just lack the design vocabulary. Build a translation layer: 'Pop' usually means more contrast or visual hierarchy. 'Modern' usually means more whitespace and cleaner typography. 'Professional' usually means more structured and less playful. Ask follow-up questions that convert subjective feedback into actionable design decisions.",
        },
        {
          heading: "Setting Up for Success",
          body: "The best project communication starts before the project begins. Send a kickoff questionnaire that asks the right questions. Set expectations about revision rounds, response times, and feedback format. Use structured feedback templates instead of open-ended requests. Regular check-ins prevent big surprises at the end.",
        },
      ],
      conclusion: "Great freelancing isn't about being the best designer in the room. It's about being the best communicator. Invest in your communication systems as much as your design skills, and watch your client relationships — and your business — transform.",
    },
  },
  {
    slug: "becoming-a-brand-designer",
    title: "Becoming a Brand Designer: The Complete Roadmap",
    category: "Career",
    readTime: "10 min",
    date: "Apr 5, 2024",
    excerpt: "From graphic design to strategic brand design — the skills you need.",
    content: {
      intro: "Brand design sits at the intersection of strategy, psychology, and visual craft. It's not about making things look good — it's about making things mean something. Here's the roadmap for getting there.",
      sections: [
        {
          heading: "Foundation: Master the Craft",
          body: "Before you can break rules, you need to know them. Build a strong foundation in typography (study type classification, pairing, and hierarchy), color theory (beyond the basics — understand cultural associations and accessibility), composition and layout principles, and drawing and sketching. These aren't just 'graphic design skills.' They're the visual literacy that makes strategic thinking tangible.",
        },
        {
          heading: "Level Up: Think in Systems",
          body: "The leap from graphic designer to brand designer happens when you start thinking systematically. A graphic designer creates a logo. A brand designer creates a visual system that includes a logo. Start seeing patterns across your work. How do your color choices create consistency? How does your typography create hierarchy? How do all elements work together to create a cohesive feeling?",
        },
        {
          heading: "Strategy: The Multiplier",
          body: "Strategy is what separates a $500 logo from a $50,000 brand identity. Learn competitive analysis and market positioning. Understand brand archetypes and personality frameworks. Study how great brands communicate and evolve. Practice writing brand strategy documents.\n\nWhen you can articulate why a design decision serves a business goal, you become invaluable.",
        },
        {
          heading: "Build Your Portfolio Strategically",
          body: "Your portfolio should demonstrate thinking, not just execution. Show the problem before the solution. Walk through your process, not just final deliverables. Include metrics and outcomes where possible. Case studies beat galleries — always.\n\nDon't have client work? Create spec projects for brands you admire. The quality of your thinking matters more than whether it was 'real.'",
        },
      ],
      conclusion: "Becoming a brand designer is a journey from execution to strategy, from decoration to communication, from making things pretty to making things meaningful. Start building systems today — your future self will thank you.",
    },
  },
  {
    slug: "design-systems-in-ui",
    title: "Design Systems in UI: Why Every Product Needs One",
    category: "Design Systems",
    readTime: "7 min",
    date: "May 20, 2024",
    excerpt: "How design systems reduce debt, speed up development, and ensure consistency.",
    content: {
      intro: "If your product has more than 10 screens and more than 2 people working on it, you need a design system. Not a component library — a system. Here's why, and how to build one that actually gets adopted.",
      sections: [
        {
          heading: "The Cost of Not Having a System",
          body: "Without a design system, every new feature is designed from scratch. Buttons look different on every page. Spacing is inconsistent. Developers interpret mockups differently. Design reviews become debates about pixels instead of user experience.\n\nThis is design debt, and like technical debt, it compounds. The longer you wait to systematize, the more expensive it becomes.",
        },
        {
          heading: "Tokens → Components → Patterns",
          body: "A design system has three layers. Design Tokens are the foundation — colors, typography, spacing, shadows, and motion values. Components are the building blocks — buttons, inputs, cards, modals built from tokens. Patterns are the solutions — login flows, data tables, navigation structures built from components.\n\nEach layer builds on the one below. Change a token, and it cascades through components and patterns. This is the power of systematic design.",
        },
        {
          heading: "Adoption is the Real Challenge",
          body: "The graveyard of design systems is full of beautifully documented libraries that nobody uses. Adoption requires: involvement from the start (don't build in isolation), solving real problems (start with the components teams need most), making it easier than not using it (great documentation, copy-paste examples), continuous maintenance (a design system is a product, not a project).\n\nThe best design system is the one your team actually uses.",
        },
        {
          heading: "Measuring Success",
          body: "Track your design system's impact: design-to-development time, visual consistency across the product, new designer onboarding time, bug reports related to UI inconsistencies, and developer satisfaction scores.\n\nIf these metrics improve, your system is working. If they don't, iterate. A design system should be treated with the same rigor as any other product.",
        },
      ],
      conclusion: "Design systems aren't overhead — they're infrastructure. They're the difference between a team that ships fast and consistently and one that's constantly reinventing the wheel. Start small, think big, and always optimize for adoption over perfection.",
    },
  },
];
