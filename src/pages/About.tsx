import { motion } from 'framer-motion';
import PageContainer from '@/components/PageContainer';
import SEO from '@/components/SEO';
import { SKILLS, JOBS, STATS } from '@/data/portfolioData';
import portraitImg from '@/assets/about-me.png';

export default function About() {
  return (
    <PageContainer showCta={true}>
      <SEO
        title="Creative Designer in India | Branding & UI/UX Designer"
        description="Creative designer in India specializing in brand identity, graphic design, UI/UX design, website experiences, and strategic design systems for ambitious businesses."
        keywords="Creative Designer in India, Graphic Designer in India, Brand Identity Designer, UI/UX Designer in India, Website Designer, Digital Product Designer, Freelance Brand Designer"
        url="https://saleeldesigns.com/about"
        schema={{
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Muhammed Saleel CP",
          "jobTitle": "Creative Designer and UI/UX Designer",
          "nationality": "Indian",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "India"
          },
          "url": "https://saleeldesigns.com/about",
          "sameAs": [
            "https://www.linkedin.com/in/muhammed-saleel-cp/",
            "https://dribbble.com/muhammed-saleel"
          ],
          "knowsAbout": [
            "Brand Identity Design",
            "UI/UX Design",
            "Graphic Design",
            "Design Systems",
            "Digital Product Design",
            "Website Design"
          ],
          "description": "Creative designer in India specializing in brand identity, graphic design, UI/UX design, website experiences, and strategic design systems for ambitious businesses."
        }}
      />

      <div className="max-w-7xl mx-auto w-full py-10 sm:py-16 px-6 md:px-12 bg-[var(--bg)] transition-colors">
        {/* Header */}
        <div className="font-heading text-xs tracking-[0.14em] uppercase text-[var(--accent)] font-semibold">
          About
        </div>
        <h1 className="mt-3.5 font-heading font-semibold text-5xl sm:text-7xl lg:text-[88px] leading-none tracking-tight text-[var(--ink)]">
          Systems over{' '}
          <span className="font-serif-italic font-medium brand-gradient-text">
            decoration.
          </span>
        </h1>

        {/* Story Section Grid - Both columns stretch so photo bottom aligns exactly with stat boxes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mt-14 items-stretch">
          {/* Portrait Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative w-full h-full min-h-[460px] lg:min-h-0 rounded-[28px] overflow-hidden bg-[var(--soft)] border border-[var(--line)] shadow-lg flex"
          >
            <img
              src={portraitImg}
              alt="Muhammed Saleel CP"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>

          {/* Bio copy with stats at the bottom edge */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[var(--ink)]">
                From pixels to systems
              </h2>

              <div className="flex flex-col gap-4 mt-5 text-[15px] sm:text-base leading-relaxed text-[var(--body)]">
                <p>
                  I'm a <strong className="text-[var(--ink)] font-semibold">Creative Designer and UI/UX Designer from India</strong>, specializing in brand identity, visual communication, digital experiences, and strategic design systems. My journey began with graphic design, creating posters, social media creatives, brand identities, and visual campaigns that help businesses communicate their stories with clarity and purpose.
                </p>
                <p>
                  Over time, my passion for visual design evolved into a deeper understanding of user experience, brand strategy, and digital product design. I began exploring how thoughtful design can influence perception, improve usability, and build meaningful connections between brands and people.
                </p>
                <p>
                  With <strong className="text-[var(--ink)] font-semibold">5+ years of experience in graphic design, branding, UI/UX design, and digital experiences</strong>, I've collaborated with startups, businesses, communities, and creative teams to transform ideas into distinctive visual identities and functional digital products.
                </p>
                <p>
                  My approach combines creative thinking, visual storytelling, user-centered design, and structured problem-solving. From developing memorable brand identities to designing intuitive website interfaces and scalable design systems, I focus on creating work that looks purposeful, feels intuitive, and delivers real value.
                </p>
                <p className="font-semibold tracking-tight text-xl sm:text-2xl text-[var(--ink)] leading-snug pt-2">
                  Today, I see design as more than visuals — it's a way to build brands, simplify experiences, and create digital products people genuinely connect with.
                </p>
              </div>
            </div>

            {/* 3 Stats Boxes - Aligned to bottom flush with portrait */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-8 pt-2">
              {STATS.map((s) => (
                <div
                  key={s.l}
                  className="bg-[var(--card)] border border-[var(--line)] rounded-[18px] p-4 sm:p-5 shadow-sm"
                >
                  <div className="font-semibold tracking-tight text-3xl sm:text-4xl text-[var(--ink)] leading-none">
                    {s.v}
                  </div>
                  <div className="text-xs sm:text-sm text-[var(--muted)] mt-1.5">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-24 pt-12 border-t border-[var(--line)]">
          <div className="font-heading text-xs tracking-[0.14em] uppercase text-[var(--accent)] font-semibold">
            Skills
          </div>
          <h2 className="mt-3 mb-8 font-heading font-semibold text-4xl sm:text-5xl lg:text-6xl text-[var(--ink)]">
            What I{' '}
            <span className="font-serif-italic font-medium brand-gradient-text">
              bring
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {SKILLS.map((group) => (
              <div key={group.title}>
                <div className="text-lg font-medium text-[var(--ink)] mb-4">
                  {group.title}
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-3.5 py-2 rounded-full bg-[var(--card)] border border-[var(--line)] text-xs sm:text-sm text-[var(--body)] shadow-sm hover:border-[var(--line2)] transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline / Journey Section with All Career Experience */}
        <div className="mt-24 pt-12 border-t border-[var(--line)]">
          <div className="font-heading text-xs tracking-[0.14em] uppercase text-[var(--accent)] font-semibold">
            Journey
          </div>
          <h2 className="mt-3 mb-8 font-heading font-semibold text-4xl sm:text-5xl lg:text-6xl text-[var(--ink)]">
            Career{' '}
            <span className="font-serif-italic font-medium brand-gradient-text">
              timeline
            </span>
          </h2>

          <div className="flex flex-col gap-6">
            {JOBS.map((j) => (
              <motion.div
                key={j.org + j.period}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-[var(--card)] border border-[var(--line)] rounded-[24px] p-6 sm:p-8 shadow-sm hover:border-[var(--line2)] transition-all"
              >
                {/* Header: Role, Company & Period */}
                <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-[var(--line)]">
                  <div>
                    <h3 className="font-heading font-semibold text-xl sm:text-2xl text-[var(--ink)] tracking-tight">
                      {j.role}
                    </h3>
                    <div className="font-semibold text-lg text-[var(--accent)] mt-0.5">
                      {j.org}
                    </div>
                  </div>
                  <span className="px-3.5 py-1.5 rounded-full bg-[var(--tint)] text-[var(--accent)] text-xs sm:text-sm font-semibold tracking-wide">
                    {j.period}
                  </span>
                </div>

                {/* Details Grid: Responsibilities & Key Achievements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {/* Responsibilities */}
                  {j.resp && j.resp.length > 0 && (
                    <div>
                      <div className="font-heading text-xs uppercase tracking-wider text-[var(--muted2)] font-semibold mb-3">
                        Responsibilities
                      </div>
                      <ul className="space-y-2.5">
                        {j.resp.map((r, ri) => (
                          <li
                            key={ri}
                            className="flex items-start gap-2.5 text-xs sm:text-[14px] leading-relaxed text-[var(--body)]"
                          >
                            <span className="w-1.5 h-1.5 rounded-none bg-[var(--accent)] rotate-45 shrink-0 mt-1.5" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Achievements */}
                  {j.ach && j.ach.length > 0 && (
                    <div>
                      <div className="font-heading text-xs uppercase tracking-wider text-[var(--muted2)] font-semibold mb-3">
                        Key Achievements
                      </div>
                      <ul className="space-y-2.5">
                        {j.ach.map((a, ai) => (
                          <li
                            key={ai}
                            className="flex items-start gap-2.5 text-xs sm:text-[14px] leading-relaxed text-[var(--body)]"
                          >
                            <span className="w-1.5 h-1.5 rounded-none bg-[var(--muted2)] rotate-45 shrink-0 mt-1.5" />
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Tools tags */}
                {j.tools && j.tools.length > 0 && (
                  <div className="mt-6 pt-5 border-t border-[var(--line)] flex flex-wrap items-center gap-2">
                    <span className="text-xs uppercase tracking-wider text-[var(--muted2)] font-medium mr-1">
                      Tools:
                    </span>
                    {j.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-2.5 py-1 rounded-md bg-[var(--soft)] text-[var(--muted)] text-xs font-medium border border-[var(--line)]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
