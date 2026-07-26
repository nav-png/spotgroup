import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.agent.name} — Lower Mainland REALTOR® and licensed builder with ${site.agent.yearsExperience} years of experience in resale, new construction, land and investment property.`,
};

const experience = [
  {
    title: "Resale — detached & attached",
    body: "Family homes, townhomes and condos across Surrey, Langley, Vancouver, Burnaby, Coquitlam and the Fraser Valley.",
  },
  {
    title: "New construction",
    body: "Presales, spec homes and builder inventory — sold by someone who reads the plans and knows the trades.",
  },
  {
    title: "Land to developers",
    body: "Assemblies, infill sites and rezoning plays, with the patience and the buyer relationships those deals require.",
  },
  {
    title: "Investors & builders",
    body: "Underwriting, renovation scope and exit strategy for clients who buy on numbers rather than on feel.",
  },
  {
    title: "Personal portfolio",
    body: "Rental properties and fix and flips bought and held for my own account — the same criteria I bring to clients.",
  },
  {
    title: "Licensed builder",
    body: "New construction detached homes and small multifamily projects built through our own construction company.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={`About ${site.agent.name}`}
        title="A REALTOR® who buys, builds and holds — not just lists."
        description={`${site.agent.yearsExperience} years in Lower Mainland real estate, on both sides of the table.`}
      />

      <div className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-sand">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=70"
              alt="Recent project"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>

          <div>
            <h2 className="font-display text-3xl font-semibold">
              {site.agent.name}, {site.agent.title}
            </h2>
            <div className="mt-5 space-y-4 text-ink-muted">
              <p>
                I have been licensed in British Columbia for {site.agent.yearsExperience} years,
                working across the Lower Mainland from Vancouver and Burnaby out through Surrey,
                Langley, Maple Ridge and Abbotsford. In that time I have sold resale detached and
                attached homes, marketed new construction and presales, and handled land sales to
                developers — including assemblies where the value depends entirely on getting the
                zoning story right.
              </p>
              <p>
                Alongside the brokerage side, I buy for my own account. Rental properties, fix and
                flips, and as-is acquisitions where the condition scares off most buyers. I am also a
                licensed builder: our company builds new construction detached homes and small
                multifamily projects, so I have signed the construction contracts, argued about the
                deficiencies and lived through the timelines.
              </p>
              <p>
                That combination is the whole point. When you ask whether a suite pencils, what a
                renovation really costs, whether a lot supports a fourplex, or what a developer will
                actually pay for your property, the answer comes from having done it — not from a
                market report.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-dark">
                Get in touch
              </Link>
              <Link href="/sell-as-is" className="btn-outline">
                Get a cash offer
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {experience.map((item) => (
            <div key={item.title} className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm">
              <p className="font-display text-lg font-semibold">{item.title}</p>
              <p className="mt-2 text-sm text-ink-muted">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-sand p-8">
          <p className="eyebrow">Areas served</p>
          <p className="mt-3 font-display text-2xl">{site.areas.join(" · ")}</p>
        </div>
      </div>
    </>
  );
}
