import Image from "next/image";
import Link from "next/link";

import { formatNumber, formatPrice } from "@/lib/format";
import { propertyTypeLabels, type Listing } from "@/lib/listings/types";

const statusLabels: Record<Listing["status"], string> = {
  new: "New",
  active: "For sale",
  sold: "Sold",
  "coming-soon": "Coming soon",
};

export function PropertyCard({
  listing,
  size = "default",
  priority = false,
}: {
  listing: Listing;
  size?: "default" | "large";
  priority?: boolean;
}) {
  const isLand = listing.propertyType === "land";
  const facts = [
    isLand ? null : `${listing.bedrooms} bed`,
    isLand ? null : `${listing.bathrooms} bath`,
    listing.livingAreaSqFt > 0 ? `${formatNumber(listing.livingAreaSqFt)} sq ft` : null,
    listing.lotSizeSqFt ? `${formatNumber(listing.lotSizeSqFt)} sq ft lot` : null,
  ].filter(Boolean) as string[];

  return (
    <article className="group">
      <Link href={`/listings/${listing.slug}`} className="block focus-visible:outline-none">
        <div
          className={`media media-zoom rounded-card ${size === "large" ? "aspect-[4/3]" : "aspect-[3/2]"}`}
        >
          <Image
            src={listing.images[0]}
            alt={`${listing.address}, ${listing.city}`}
            fill
            sizes={size === "large" ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 768px) 100vw, 33vw"}
            priority={priority}
            className="object-cover"
          />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {listing.category === "exclusive" ? (
              <span className="tag-spot">Exclusive</span>
            ) : (
              <span className="tag">{statusLabels[listing.status]}</span>
            )}
            {listing.openHouses?.length ? <span className="tag">Open house</span> : null}
          </div>
        </div>

        <div className="mt-5 flex items-start justify-between gap-6">
          <div>
            <p
              className={`font-display font-extrabold tracking-[-0.02em] ${
                size === "large" ? "text-3xl sm:text-4xl" : "text-2xl"
              }`}
            >
              {formatPrice(listing.price)}
            </p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.08em]">{listing.address}</p>
            <p className="text-sm text-ink-500">
              {listing.neighbourhood ? `${listing.neighbourhood}, ` : ""}
              {listing.city}
            </p>
          </div>
          <span
            className="mt-1 hidden shrink-0 text-spot transition group-hover:translate-x-1 sm:block"
            aria-hidden="true"
          >
            →
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-ink/10 pt-4 text-xs uppercase tracking-[0.12em] text-ink-500">
          <span>{propertyTypeLabels[listing.propertyType]}</span>
          {facts.map((fact) => (
            <span key={fact}>{fact}</span>
          ))}
          {listing.mlsNumber ? <span>MLS® {listing.mlsNumber}</span> : null}
        </div>
      </Link>
    </article>
  );
}
