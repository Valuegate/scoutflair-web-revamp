import Link from "next/link";

type LegalSection = {
  id: string;
  title: string;
  body?: string[];
  bullets?: string[];
};

type LegalContentPageProps = {
  label: string;
  title: string;
  intro: string;
  updatedAt: string;
  sections: LegalSection[];
};

export function LegalContentPage({
  label,
  title,
  intro,
  updatedAt,
  sections,
}: LegalContentPageProps) {
  return (
    <main className="bg-white">
      <section className="bg-[#F8F8FF] py-14 md:py-20">
        <div className="container">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#041931]/40 px-4 py-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-[#041931]"></div>
              <span className="font-merriweather text-sm text-[#192B4D]">
                {label}
              </span>
            </div>
            <h1 className="font-merriweather text-4xl font-bold leading-tight text-[#1B1B1B] md:text-[42px]">
              {title}
            </h1>
            <p className="mt-5 max-w-3xl font-lato text-lg leading-relaxed text-[#1B1B1B]/85">
              {intro}
            </p>
            <p className="mt-5 font-lato text-sm font-bold uppercase tracking-[0.08em] text-[#DB8E08]">
              Last updated: {updatedAt}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container grid gap-10 lg:grid-cols-[260px_1fr]">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <p className="font-manrope text-lg font-bold text-[#192B4D]">
              Contents
            </p>
            <nav className="mt-4 flex flex-col gap-3 border-l border-[#041931]/20 pl-4 font-lato text-sm text-[#1B1B1B]/75">
              {sections.map((section) => (
                <Link
                  key={section.id}
                  href={`#${section.id}`}
                  className="transition-colors hover:text-[#041931]"
                >
                  {section.title}
                </Link>
              ))}
            </nav>
          </aside>

          <article className="max-w-4xl space-y-10">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-32 border-b border-gray-200 pb-10 last:border-b-0 last:pb-0"
              >
                <h2 className="font-manrope text-2xl font-bold leading-tight text-[#192B4D] md:text-3xl">
                  {section.title}
                </h2>
                {section.body && (
                  <div className="mt-4 space-y-4 font-lato text-base leading-relaxed text-[#1B1B1B]/80">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                )}
                {section.bullets && (
                  <ul className="mt-4 space-y-3 font-lato text-base leading-relaxed text-[#1B1B1B]/80">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#DB8E08]"></span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </article>
        </div>
      </section>
    </main>
  );
}
