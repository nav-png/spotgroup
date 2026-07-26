import Image from "next/image";
import Link from "next/link";

import { ListingGrid } from "@/components/listing-grid";
import { QuickSearch } from "@/components/quick-search";
import { SectionHeading } from "@/components/section";
import { getListingsProvider } from "@/lib/listings/provider";
import { site } from "@/lib/site";

const services = [
  {
    title: "Resale — detached & attached",
    body: "Pricing, prep and negotiation for family homes, townhomes and condos across the Lower Mainland.",
    href: "/services#resale",
  },
  {
    title: "New construction",
    body: "Presales, spec homes and builder inventory — marketed by someone who builds them too.",
    href: "/services#new-construction",
  },
  {
    title: "Land & development sites",
    body: "Assemblies, OCP and rezoning analysis, and direct relationships with active Lower Mainland developers.",
    href: "/services#land",
  },
  {
    title: "Investors",
    body: "Cash-flow analysis, suite and multiplex potential, and off-market deal flow before it hits MLS®.",
    href: "/services#investors",
  },
  {
    title: "Builders",
    body: "Lot sourcing, product advice, pro formas and exit strategy from an owner-builder's perspective.",
    href: "/services#builders",
  },
  {
    title: "As-is cash offers",
    body: "Sell in any condition with no repairs, no showings and a completion date that suits you.",
    href: "/sell-as-is",
  },
];

const stats = [
  { value: `${site.agent.yearsExperience}+`, label: "Years licensed in BC" },
  { value: "Builder", label: "Licensed residential builder" },
  { value: "Off-market", label: "Exclusive inventory network" },
  { value: "Cash", label: "As-is offers, any condition" },
];

export default async function HomePage() {
  const provider = getListingsProvider();
  const [cities, featured, exclusive] = await Promise.all([
    provider.cities(),
    provider.search({ category: "mls", limit: 3 }),
    provider.search({ category: "exclusive", limit: 3 }),
  ]);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=70"
          alt="Lower Mainland home at dusk"
          fill
          priority
          className="object-cover opacity-35"
        />
        <div className="container-page relative py-20 sm:py-28">
          <p className="eyebrow">Lower Mainland, British Columbia</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-6xl">
            Buy, sell and build with a REALTOR® who does it himself.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/80">
            {site.agent.yearsExperience} years selling resale homes, new construction and development
            land — plus a licensed building company and a personal portfolio of rentals and flips.
            Search the MLS®, see our exclusive off-market inventory, or get a cash offer on a property
            in as-is condition.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/sell-as-is" className="btn-primary">
              Get a cash offer
            </Link>
            <Link href="/listings" className="btn-outline">
              Search MLS® listings
            </Link>
          </div>

          <div className="mt-10 max-w-4xl">
            <QuickSearch cities={cities} />
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-sand">
        <div className="container-page grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-3xl font-semibold text-ink">{stat.value}</p>
              <p className="mt-1 text-sm text-ink-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <SectionHeading
          eyebrow="Latest inventory"
          title="New and featured listings"
          description="Fresh to market across Surrey, Langley, Vancouver, Coquitlam and the Fraser Valley."
          action={
            <Link href="/listings" className="btn-outline">
              View all listings
            </Link>
          }
        />
        <ListingGrid listings={featured.listings} />
      </section>

      <section className="bg-ink text-white">
        <div className="container-page grid items-center gap-10 py-16 md:grid-cols-2 sm:py-20">
          <div>
            <p className="eyebrow">Sell as-is</p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Need a cash offer on a property in any condition?
            </h2>
            <p className="mt-4 text-white/75">
              We buy directly and we wholesale to a vetted buyer list. Tenanted, fire damaged,
              foreclosure, estate sale, hoarder condition, half-finished renovation — we will look at
              it. No repairs, no cleaning, no showings and no commission when we buy.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-white/80">
              <li>• Written offer within 48 hours of seeing the property</li>
              <li>• You choose the completion date</li>
              <li>• Compare it against a full MLS® listing strategy before you decide</li>
            </ul>
            <Link href="/sell-as-is" className="btn-primary mt-8">
              Start my cash offer
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=70"
              alt="Home being renovated"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <SectionHeading
          eyebrow="How we help"
          title="One team for every side of the deal"
          description="Most agents do one thing. We list, we buy, we build and we invest — so the advice comes from having done it."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group rounded-2xl border border-ink/10 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brass/50 hover:shadow-md"
            >
              <p className="font-display text-xl font-semibold">{service.title}</p>
              <p className="mt-3 text-sm text-ink-muted">{service.body}</p>
              <p className="mt-4 text-sm font-semibold text-brass group-hover:underline">Learn more →</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-sand py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Not on MLS®"
            title="Exclusive & off-market listings"
            description="Assemblies, tenanted buildings, estate sales and builder inventory we release privately first."
            action={
              <Link href="/exclusive" className="btn-outline">
                See exclusive listings
              </Link>
            }
          />
          <ListingGrid listings={exclusive.listings} />
        </div>
      </section>

      <section className="container-page grid items-center gap-10 py-16 md:grid-cols-[1fr_1.1fr] sm:py-20">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-sand">
          <Image
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=70"
            alt="Recently completed build"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 40vw, 100vw"
          />
        </div>
        <div>
          <p className="eyebrow">About {site.agent.name}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            A licensed REALTOR® and a licensed builder.
          </h2>
          <p className="mt-4 text-ink-muted">
            For over a decade I have worked every part of Lower Mainland real estate: resale detached
            and attached homes, new construction and presales, and land sales to developers. I also
            buy for my own account — rental properties, fix and flips, and as-is acquisitions — and I
            build detached homes and small multifamily projects through my construction company.
          </p>
          <p className="mt-4 text-ink-muted">
            That means when we talk about a suite, a subdivision, a renovation budget or a
            construction timeline, you are getting numbers from someone who has actually signed the
            contracts and pulled the permits.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/about" className="btn-dark">
              More about Nav
            </Link>
            <Link href="/contact" className="btn-outline">
              Book a call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
