import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">{title}</h2>
        {description ? <p className="mt-3 text-ink-muted">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-ink text-white">
      <div className="container-page py-16 sm:py-20">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold sm:text-5xl">{title}</h1>
        {description ? <p className="mt-4 max-w-2xl text-white/75">{description}</p> : null}
        {children}
      </div>
    </section>
  );
}
