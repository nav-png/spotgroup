import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { LeadForm } from "@/components/lead-form";
import { ListingGallery } from "@/components/listing-gallery";
import { ListingGrid } from "@/components/listing-grid";
import { SectionHeading } from "@/components/section";
import { formatDate, formatNumber, formatPrice } from "@/lib/format";
import { getListingsProvider } from "@/lib/listings/provider";
import { propertyTypeLabels } from "@/lib/listings/types";
import { site } from "@/lib/site";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const listing = await getListingsProvider().getBySlug(params.slug);
  if (!listing) return { title: "Listing not found" };

  return {
    title: `${listing.address}, ${listing.city}`,
    description: listing.description.slice(0, 160),
  };
}

export default async function ListingDetailPage({ params }: PageProps) {
  const provider = getListingsProvider();
  const listing = await provider.getBySlug(params.slug);
  if (!listing) notFound();

  const similar = await provider.search({ city: listing.city, limit: 4 });
  const others = similar.listings.filter((item) => item.id !== listing.id).slice(0, 3);

  const facts: { label: string; value: string }[] = [
    { label: "Property type", value: propertyTypeLabels[listing.propertyType] },
    ...(listing.propertyType === "land"
      ? []
      : [
          { label: "Bedrooms", value: String(listing.bedrooms) },
          { label: "Bathrooms", value: String(listing.bathrooms) },
          { label: "Living area", value: `${formatNumber(listing.livingAreaSqFt)} sq ft` },
        ]),
    ...(listing.lotSizeSqFt
      ? [{ label: "Lot size", value: `${formatNumber(listing.lotSizeSqFt)} sq ft` }]
      : []),
    ...(listing.yearBuilt ? [{ label: "Year built", value: String(listing.yearBuilt) }] : []),
    { label: "Listed", value: formatDate(listing.listedAt) },
    { label: "MLS® number", value: listing.mlsNumber ?? "Exclusive / off-market" },
  ];

  return (
    <div className="container-page py-10 sm:py-14">
      <Link href="/listings" className="text-sm font-medium text-brass hover:underline">
        ← Back to search
      </Link>

      <div className="mt-6 flex flex-col gap-3 border-b border-ink/10 pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">
            {listing.category === "exclusive" ? "Exclusive listing" : "MLS® listing"}
            {listing.status === "sold" ? " · Sold" : ""}
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">{listing.address}</h1>
          <p className="mt-1 text-ink-muted">
            {listing.neighbourhood ? `${listing.neighbourhood}, ` : ""}
            {listing.city}, {listing.province} {listing.postalCode ?? ""}
          </p>
        </div>
        <p className="font-display text-3xl font-semibold text-brass sm:text-4xl">
          {formatPrice(listing.price)}
        </p>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <ListingGallery images={listing.images} alt={listing.title} />

          <h2 className="mt-10 font-display text-2xl font-semibold">{listing.title}</h2>
          <p className="mt-4 whitespace-pre-line text-ink-muted">{listing.description}</p>

          {listing.highlights.length > 0 ? (
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {listing.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2 text-sm">
                  <span className="text-brass">◆</span>
                  {highlight}
                </li>
              ))}
            </ul>
          ) : null}

          <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.label} className="bg-white p-4">
                <dt className="text-xs uppercase tracking-wide text-ink-muted">{fact.label}</dt>
                <dd className="mt-1 font-medium">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-ink/10 bg-sand p-6">
            <p className="font-display text-xl font-semibold">Request a showing</p>
            <p className="mt-1 text-sm text-ink-muted">
              {site.agent.name} · {site.agent.phone}
            </p>
            <div className="mt-5">
              <LeadForm
                leadType="listing-inquiry"
                compact
                source={`listing:${listing.slug}`}
                submitLabel="Request details"
                successTitle="Request received."
                successBody="We will confirm a showing time shortly."
                fields={[
                  { name: "name", label: "Name", required: true, full: true },
                  { name: "email", label: "Email", type: "email", required: true },
                  { name: "phone", label: "Phone", type: "tel" },
                  {
                    name: "message",
                    label: "Message",
                    type: "textarea",
                    placeholder: `I would like more information about ${listing.address}.`,
                  },
                ]}
              />
            </div>
          </div>
        </aside>
      </div>

      {others.length > 0 ? (
        <div className="mt-20">
          <SectionHeading title={`More in ${listing.city}`} />
          <ListingGrid listings={others} />
        </div>
      ) : null}
    </div>
  );
}
