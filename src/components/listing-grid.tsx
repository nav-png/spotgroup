import { ListingCard } from "@/components/listing-card";
import type { Listing } from "@/lib/listings/types";

export function ListingGrid({ listings, empty }: { listings: Listing[]; empty?: string }) {
  if (listings.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-ink/20 bg-sand px-6 py-14 text-center">
        <p className="font-display text-xl">{empty ?? "No listings match your search."}</p>
        <p className="mt-2 text-sm text-ink-muted">
          Try widening your price range or removing a filter — or contact us and we will search the
          full MLS® and our off-market inventory for you.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
