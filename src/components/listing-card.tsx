import Image from "next/image";
import Link from "next/link";

import { formatNumber, formatPrice } from "@/lib/format";
import { propertyTypeLabels, type Listing } from "@/lib/listings/types";

const statusStyles: Record<Listing["status"], string> = {
  new: "bg-brass text-white",
  active: "bg-white/90 text-ink",
  sold: "bg-ink text-white",
  "coming-soon": "bg-white/90 text-ink",
};

const statusLabels: Record<Listing["status"], string> = {
  new: "New listing",
  active: "Active",
  sold: "Sold",
  "coming-soon": "Coming soon",
};

export function ListingCard({ listing }: { listing: Listing }) {
  const isLand = listing.propertyType === "land";

  return (
    <Link
      href={`/listings/${listing.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        <Image
          src={listing.images[0]}
          alt={listing.title}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <span
            className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${statusStyles[listing.status]}`}
          >
            {statusLabels[listing.status]}
          </span>
          {listing.category === "exclusive" ? (
            <span className="rounded-full bg-ink px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
              Exclusive
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-display text-xl font-semibold">{formatPrice(listing.price)}</p>
          <p className="text-xs uppercase tracking-wide text-ink-muted">
            {propertyTypeLabels[listing.propertyType]}
          </p>
        </div>

        <div>
          <p className="font-medium leading-snug">{listing.address}</p>
          <p className="text-sm text-ink-muted">
            {listing.neighbourhood ? `${listing.neighbourhood}, ` : ""}
            {listing.city}, {listing.province}
          </p>
        </div>

        <p className="mt-auto flex flex-wrap gap-x-4 gap-y-1 border-t border-ink/10 pt-3 text-sm text-ink-muted">
          {isLand ? (
            <span>{formatNumber(listing.lotSizeSqFt ?? 0)} sq ft lot</span>
          ) : (
            <>
              <span>{listing.bedrooms} bed</span>
              <span>{listing.bathrooms} bath</span>
              <span>{formatNumber(listing.livingAreaSqFt)} sq ft</span>
            </>
          )}
          <span className="ml-auto text-ink-muted/80">
            {listing.mlsNumber ? `MLS® ${listing.mlsNumber}` : "Off-market"}
          </span>
        </p>
      </div>
    </Link>
  );
}
