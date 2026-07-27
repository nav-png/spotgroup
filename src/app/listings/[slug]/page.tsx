import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InquiryModal } from "@/components/forms/inquiry-modal";
import { LeadForm } from "@/components/forms/lead-form";
import { PropertyGallery } from "@/components/property/property-gallery";
import { PropertyGrid } from "@/components/property/property-grid";
import { PropertyMap } from "@/components/property/property-map";
import { StickyInquiry } from "@/components/property/sticky-inquiry";
import { Reveal } from "@/components/ui/reveal";
import { getCommunity } from "@/lib/communities";
import { formatDate, formatNumber, formatPrice } from "@/lib/format";
import { getListingsProvider } from "@/lib/listings/provider";
import { propertyTypeLabels } from "@/lib/listings/types";
import { site } from "@/lib/site";
import { leadAgent } from "@/lib/team";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const listing = await getListingsProvider().getBySlug(params.slug);
  if (!listing) return { title: "Property not found" };

  const title = `${listing.address}, ${listing.city}`;
  return {
    title,
    description: `${formatPrice(listing.price)} — ${listing.title}. ${listing.description.slice(0, 140)}`,
    alternates: { canonical: `/listings/${listing.slug}` },
    openGraph: {
      title,
      description: listing.title,
      images: [{ url: listing.images[0] }],
    },
  };
}

export default async function ListingPage({ params }: { params: { slug: string } }) {
  const provider = getListingsProvider();
  const listing = await provider.getBySlug(params.slug);
  if (!listing) notFound();

  const similar = await provider.similar(listing, 3);
  const community = listing.communitySlug ? getCommunity(listing.communitySlug) : undefined;
  const isLand = listing.propertyType === "land";

  const stats = [
    isLand ? null : { label: "Bedrooms", value: String(listing.bedrooms) },
    isLand ? null : { label: "Bathrooms", value: String(listing.bathrooms) },
    listing.livingAreaSqFt > 0
      ? { label: "Living area", value: `${formatNumber(listing.livingAreaSqFt)} sq ft` }
      : null,
    listing.lotSizeSqFt
      ? { label: "Lot size", value: `${formatNumber(listing.lotSizeSqFt)} sq ft` }
      : null,
    listing.yearBuilt ? { label: "Year built", value: String(listing.yearBuilt) } : null,
    { label: "Property type", value: propertyTypeLabels[listing.propertyType] },
  ].filter(Boolean) as { label: string; value: string }[];

  const showingFields = [
    { name: "name", label: "Name", required: true },
    { name: "email", label: "Email", type: "email" as const, required: true },
    { name: "phone", label: "Phone", type: "tel" as const },
    { name: "preferredTime", label: "Preferred day and time", placeholder: "Saturday afternoon" },
    { name: "message", label: "Questions about this property", type: "textarea" as const, full: true },
  ];

  return (
    <>
      <article className="pb-28 pt-32 lg:pb-32 lg:pt-40">
        <div className="shell">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs uppercase tracking-[0.16em] text-ink-500">
            <Link href="/buy" className="hover:text-ink">
              Properties
            </Link>
            <span aria-hidden="true"> / </span>
            {community ? (
              <>
                <Link href={`/communities/${community.slug}`} className="hover:text-ink">
                  {community.name}
                </Link>
                <span aria-hidden="true"> / </span>
              </>
            ) : null}
            <span className="text-ink">{listing.address}</span>
          </nav>

          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                {listing.category === "exclusive" ? (
                  <span className="tag-spot">Exclusive</span>
                ) : null}
                {listing.openHouses?.length ? <span className="chip">Open house</span> : null}
                {listing.mlsNumber ? (
                  <span className="text-xs uppercase tracking-[0.16em] text-ink-500">
                    MLS® {listing.mlsNumber}
                  </span>
                ) : null}
              </div>
              <h1 className="display-lg mt-5 max-w-[24ch]">{listing.address}</h1>
              <p className="mt-3 text-lg text-ink-500">
                {listing.neighbourhood ? `${listing.neighbourhood}, ` : ""}
                {listing.city}, {listing.province}
                {listing.postalCode ? ` ${listing.postalCode}` : ""}
              </p>
            </div>
            <div className="text-right">
              <p className="font-display text-4xl font-extrabold tracking-[-0.03em] lg:text-5xl">
                {formatPrice(listing.price)}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-ink-500">
                Listed {formatDate(listing.listedAt)}
              </p>
            </div>
          </div>

          <div className="mt-12">
            <PropertyGallery images={listing.images} address={listing.address} />
          </div>

          <div className="mt-16 grid gap-16 lg:grid-cols-[1.55fr_1fr] lg:gap-20">
            <div>
              <dl className="grid grid-cols-2 gap-8 border-y border-ink/10 py-8 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-500">
                      {stat.label}
                    </dt>
                    <dd className="mt-2 font-display text-xl font-bold uppercase">{stat.value}</dd>
                  </div>
                ))}
              </dl>

              <section className="mt-14">
                <h2 className="display-sm">About this property</h2>
                <p className="mt-6 max-w-prose text-base leading-relaxed text-ink-700">
                  {listing.description}
                </p>
                {listing.highlights.length > 0 ? (
                  <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                    {listing.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3 text-sm text-ink-700">
                        <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-spot" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>

              {listing.features?.length ? (
                <section className="mt-14">
                  <h2 className="display-sm">Features &amp; amenities</h2>
                  <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {listing.features.map((feature) => (
                      <li
                        key={feature}
                        className="border-b border-ink/10 pb-3 text-sm text-ink-700"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {listing.openHouses?.length ? (
                <section className="mt-14">
                  <h2 className="display-sm">Open houses</h2>
                  <ul className="mt-6 flex flex-wrap gap-4">
                    {listing.openHouses.map((openHouse) => (
                      <li
                        key={`${openHouse.date}-${openHouse.start}`}
                        className="rounded-card border border-ink/10 px-6 py-4"
                      >
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-spot">
                          {formatDate(openHouse.date)}
                        </p>
                        <p className="mt-1 font-display text-lg font-bold uppercase">
                          {openHouse.start} – {openHouse.end}
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              <section className="mt-14">
                <h2 className="display-sm">Location</h2>
                <PropertyMap
                  listings={[listing]}
                  className="mt-6 aspect-[16/10]"
                  title={`Map of ${listing.address}`}
                />
              </section>

              {community ? (
                <section className="mt-14">
                  <h2 className="display-sm">The neighbourhood</h2>
                  <p className="mt-6 max-w-prose text-base leading-relaxed text-ink-700">
                    {community.overview[0]}
                  </p>
                  <div className="mt-8 grid gap-6 sm:grid-cols-2">
                    {community.categories.map((category) => (
                      <div key={category.title} className="border-t border-ink/10 pt-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-500">
                          {category.title}
                        </p>
                        <ul className="mt-2 space-y-1 text-sm leading-relaxed text-ink-700">
                          {category.items.slice(0, 3).map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <Link href={`/communities/${community.slug}`} className="link-underline mt-8 inline-flex">
                    {community.name} community guide <span aria-hidden="true">→</span>
                  </Link>
                </section>
              ) : null}
            </div>

            <aside className="space-y-8 lg:sticky lg:top-32 lg:self-start">
              <div className="rounded-card border border-ink/10 p-7">
                <div className="flex items-center gap-5">
                  <div className="media h-20 w-20 shrink-0 rounded-full">
                    <Image
                      src={leadAgent.photo}
                      alt={leadAgent.name}
                      fill
                      sizes="80px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div>
                    <p className="font-display text-xl font-bold uppercase">{leadAgent.name}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-ink-500">
                      {leadAgent.role}
                    </p>
                  </div>
                </div>
                <p className="mt-5 text-xs text-ink-500">{leadAgent.licence}</p>
                <div className="mt-6 space-y-2 text-sm">
                  <a href={`tel:${site.agent.phoneHref}`} className="block hover:text-spot">
                    {site.agent.phone}
                  </a>
                  <a href={`mailto:${site.agent.email}`} className="block hover:text-spot">
                    {site.agent.email}
                  </a>
                </div>
                <div className="mt-6 hidden lg:block">
                  <InquiryModal
                    triggerLabel="Book a showing"
                    triggerClassName="btn-spot w-full"
                    title={`Book a showing — ${listing.address}`}
                    intro={`${listing.city} · ${formatPrice(listing.price)}`}
                    leadType="listing-inquiry"
                    source={`listing:${listing.slug}`}
                    fields={showingFields}
                  />
                </div>
              </div>

              <div className="rounded-card bg-ink-50 p-7">
                <p className="eyebrow">Ask about this property</p>
                <h3 className="display-sm mt-3">Send a question</h3>
                <div className="mt-6">
                  <LeadForm
                    leadType="listing-inquiry"
                    bare
                    source={`listing-sidebar:${listing.slug}`}
                    submitLabel="Send question"
                    fields={[
                      { name: "name", label: "Name", required: true },
                      { name: "email", label: "Email", type: "email", required: true },
                      { name: "phone", label: "Phone", type: "tel" },
                      { name: "message", label: "Your question", type: "textarea", full: true },
                    ]}
                  />
                </div>
              </div>
            </aside>
          </div>
        </div>

        {similar.length > 0 ? (
          <section className="section">
            <div className="shell">
              <Reveal className="flex flex-wrap items-end justify-between gap-6">
                <h2 className="display-md">
                  Similar properties
                  <span className="text-spot">.</span>
                </h2>
                <Link href="/buy" className="link-underline">
                  Search all homes <span aria-hidden="true">→</span>
                </Link>
              </Reveal>
              <div className="mt-12">
                <PropertyGrid listings={similar} />
              </div>
            </div>
          </section>
        ) : null}
      </article>

      <StickyInquiry listing={listing} />
    </>
  );
}
