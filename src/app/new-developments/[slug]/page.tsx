import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LeadForm } from "@/components/forms/lead-form";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { developmentStatusLabels, developments, getDevelopment } from "@/lib/developments";
import { formatPrice } from "@/lib/format";

export function generateStaticParams() {
  return developments.map((development) => ({ slug: development.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const development = getDevelopment(params.slug);
  if (!development) return { title: "Development not found" };

  return {
    title: development.name,
    description: development.summary,
    alternates: { canonical: `/new-developments/${development.slug}` },
    openGraph: { title: development.name, images: [{ url: development.hero }] },
  };
}

export default function DevelopmentPage({ params }: { params: { slug: string } }) {
  const development = getDevelopment(params.slug);
  if (!development) notFound();

  const facts = [
    { label: "Status", value: developmentStatusLabels[development.status] },
    { label: "Location", value: `${development.neighbourhood}, ${development.city}` },
    { label: "Homes", value: development.homeTypes },
    { label: "Completion", value: development.completion ?? "To be announced" },
    {
      label: "Priced from",
      value: development.priceFrom ? formatPrice(development.priceFrom) : "Register for pricing",
    },
    { label: "Number of homes", value: development.unitCount ? String(development.unitCount) : "TBA" },
    { label: "Developer", value: development.developer },
  ];

  return (
    <>
      <PageHero
        eyebrow={`${development.neighbourhood}, ${development.city}`}
        title={
          <>
            {development.name}
            <span className="text-spot">.</span>
          </>
        }
        lede={development.summary}
        image={development.hero}
        imageAlt={development.name}
        size="tall"
      >
        <span className="tag-spot">{developmentStatusLabels[development.status]}</span>
      </PageHero>

      <section className="section">
        <div className="shell grid gap-16 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <dl className="grid grid-cols-2 gap-8 border-b border-ink/10 pb-10 sm:grid-cols-3">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-500">
                      {fact.label}
                    </dt>
                    <dd className="mt-2 text-sm font-semibold">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal className="mt-14">
              <h2 className="display-md">
                The project
                <span className="text-spot">.</span>
              </h2>
              <div className="mt-8 space-y-6">
                {development.description.map((paragraph) => (
                  <p key={paragraph} className="max-w-prose text-base leading-relaxed text-ink-700">
                    {paragraph}
                  </p>
                ))}
              </div>
              <ul className="mt-10 grid gap-3 sm:grid-cols-2">
                {development.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-sm text-ink-700">
                    <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-spot" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mt-16">
              <h2 className="display-sm">Gallery</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {development.gallery.map((image, index) => (
                  <div
                    key={image}
                    className={`media rounded-card ${
                      index === 0 ? "aspect-[3/2] sm:col-span-2" : "aspect-[4/3]"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${development.name} — image ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 45vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="mt-5 text-xs text-ink-400">
                Renderings and imagery are representative placeholders until the builder&apos;s
                approved material is available.
              </p>
            </Reveal>
          </div>

          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="panel border border-ink/10 p-7 sm:p-9">
              <p className="eyebrow">Register</p>
              <h2 className="display-sm mt-3">Get the price list</h2>
              <p className="mt-4 text-sm text-ink-500">
                Floor plans, current pricing and the disclosure statement, sent directly.
              </p>
              <div className="mt-8">
                <LeadForm
                  leadType="development-inquiry"
                  bare
                  source={`development:${development.slug}`}
                  submitLabel="Register for details"
                  successTitle="You are registered."
                  successBody="We will send the current package and let you know about release dates."
                  fields={[
                    { name: "name", label: "Name", required: true },
                    { name: "email", label: "Email", type: "email", required: true },
                    { name: "phone", label: "Phone", type: "tel" },
                    {
                      name: "homeType",
                      label: "Interested in",
                      type: "select",
                      options: ["Townhome", "Detached home", "Duplex lot", "Multiple homes", "Not sure yet"],
                    },
                    {
                      name: "workingWithAgent",
                      label: "Working with a REALTOR®?",
                      type: "select",
                      options: ["No", "Yes"],
                    },
                    { name: "message", label: "Questions", type: "textarea", full: true },
                  ]}
                />
              </div>
            </div>

            <Link href="/new-developments" className="link-underline mt-8 inline-flex">
              All developments <span aria-hidden="true">→</span>
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
