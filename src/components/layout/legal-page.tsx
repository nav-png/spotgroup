export function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: { heading: string; body: string[] }[];
}) {
  return (
    <section className="pb-28 pt-32 lg:pt-44">
      <div className="shell">
        <div className="mx-auto max-w-prose">
          <p className="eyebrow">Legal</p>
          <h1 className="display-lg mt-5">
            {title}
            <span className="text-spot">.</span>
          </h1>
          <p className="mt-5 text-xs uppercase tracking-[0.16em] text-ink-400">
            Last updated {updated}
          </p>

          {sections.map((section) => (
            <div key={section.heading} className="mt-12">
              <h2 className="display-sm">{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="mt-5 text-base leading-relaxed text-ink-700">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
