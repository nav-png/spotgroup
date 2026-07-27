import { PropertyCard } from "@/components/property/property-card";
import type { Listing } from "@/lib/listings/types";

export function PropertyGrid({
  listings,
  columns = 3,
  emptyTitle = "Nothing matches yet",
  emptyBody = "Try widening the price range or clearing a filter — or tell us what you are looking for and we will watch for it.",
  emptyAction,
}: {
  listings: Listing[];
  columns?: 2 | 3;
  emptyTitle?: string;
  emptyBody?: string;
  emptyAction?: React.ReactNode;
}) {
  if (listings.length === 0) {
    return (
      <div className="rounded-card border border-dashed border-ink/20 px-6 py-20 text-center">
        <p className="font-display text-2xl font-extrabold uppercase">{emptyTitle}</p>
        <p className="mx-auto mt-3 max-w-md text-sm text-ink-500">{emptyBody}</p>
        {emptyAction ? <div className="mt-6 flex justify-center">{emptyAction}</div> : null}
      </div>
    );
  }

  return (
    <div
      className={`grid gap-x-8 gap-y-14 ${
        columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"
      }`}
    >
      {listings.map((listing, index) => (
        <PropertyCard key={listing.id} listing={listing} priority={index < 3} />
      ))}
    </div>
  );
}
