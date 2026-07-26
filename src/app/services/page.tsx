import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/section";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Resale, new construction, development land, investor and builder representation, and as-is cash purchases across the Lower Mainland.",
};

const services = [
  {
    id: "resale",
    title: "Resale — detached & attached homes",
    body: "Listing and buying representation for detached houses, townhomes and condos. Pricing from real comparable analysis, pre-list prep that pays for itself, professional media, and negotiation that protects your position rather than chasing a quick close.",
    points: [
      "Pre-list renovation advice with real contractor pricing",
      "Suite, laneway and multiplex potential identified up front",
      "Full marketing package: photography, video, floorplans, social",
    ],
  },
  {
    id: "new-construction",
    title: "New construction & presales",
    body: "As a licensed builder I sell new homes differently: buyers get straight answers about warranty, allowances, deficiencies and completion risk, and builders get a listing agent who can read plans and speak to their trades.",
    points: [
      "Spec home and builder inventory marketing",
      "Presale and assignment representation",
      "2-5-10 warranty, deficiency and completion guidance",
    ],
  },
  {
    id: "land",
    title: "Land & development sites",
    body: "Selling land to developers is its own business — assemblies, OCP and zoning analysis, holding income, subject periods measured in months rather than days, and a buyer pool that is small and specific.",
    points: [
      "Land assemblies and neighbour coordination",
      "OCP / zoning and density analysis with massing studies",
      "Direct relationships with active Lower Mainland developers",
    ],
  },
  {
    id: "investors",
    title: "Investors",
    body: "I buy rentals and fix and flips for my own account, so investor clients get the same underwriting I use on my own deals — not a listing sheet with an optimistic cap rate on it.",
    points: [
      "Cash flow, cap rate and renovation pro formas",
      "Fix and flip scope and budget review",
      "Off-market and wholesale deal flow",
    ],
  },
  {
    id: "builders",
    title: "Builders",
    body: "Lot sourcing through to exit. I build detached homes and small multifamily myself, which means realistic build budgets, product decisions that match the buyer pool, and an honest read on what the finished home will sell for.",
    points: [
      "Lot and infill site sourcing",
      "Product and spec level advice for the target buyer",
      "Exit pricing and sales strategy before you break ground",
    ],
  },
  {
    id: "wholesale",
    title: "As-is purchases & wholesale",
    body: "We buy properties in as-is condition for cash and we wholesale to a vetted buyer list. It is the right answer for some sellers and the wrong one for others — we will show you both numbers and let you decide.",
    points: [
      "Written cash offer within 48 hours",
      "No repairs, cleaning, showings or commission when we buy",
      "Side-by-side comparison against listing on MLS®",
    ],
    cta: { href: "/sell-as-is", label: "Get a cash offer" },
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Every side of Lower Mainland real estate"
        description="Resale, new construction, land, investment, building and as-is purchases — handled by one team that does all of it."
      />

      <div className="container-page py-16">
        <div className="grid gap-10">
          {services.map((service) => (
            <section
              key={service.id}
              id={service.id}
              className="grid scroll-mt-28 gap-6 rounded-2xl border border-ink/10 bg-white p-6 shadow-sm sm:p-8 md:grid-cols-[1fr_1fr]"
            >
              <div>
                <h2 className="font-display text-2xl font-semibold">{service.title}</h2>
                <p className="mt-3 text-ink-muted">{service.body}</p>
                {service.cta ? (
                  <Link href={service.cta.href} className="btn-primary mt-6">
                    {service.cta.label}
                  </Link>
                ) : null}
              </div>
              <ul className="space-y-3 self-center rounded-xl bg-sand p-6">
                {service.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm">
                    <span className="text-brass">◆</span>
                    {point}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-ink px-6 py-12 text-center text-white sm:px-12">
          <h2 className="font-display text-3xl font-semibold">Not sure which conversation to have?</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/75">
            Send over the property or the plan and we will tell you honestly whether we are the right
            fit — and what we would do if it were ours.
          </p>
          <Link href="/contact" className="btn-primary mt-8">
            Start the conversation
          </Link>
        </div>
      </div>
    </>
  );
}
