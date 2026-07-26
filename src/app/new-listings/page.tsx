import type { Metadata } from "next";
import Link from "next/link";

import { ListingGrid } from "@/components/listing-grid";
import { PageHero, SectionHeading } from "@/components/section";
import { getListingsProvider } from "@/lib/listings/provider";

export const metadata: Metadata = {
  title: "New Listings",
  description: "Our newest listings across the Lower Mainland, updated as they come to market.",
};

export default async function NewListingsPage() {
  const provider = getListingsProvider();
  const [fresh, comingSoon] = await Promise.all([
    provider.search({ status: "new" }),
    provider.search({ status: "coming-soon" }),
  ]);

  return (
    <>
      <PageHero
        eyebrow="Just listed"
        title="Our newest listings"
        description="Every new listing we bring to market — resale homes, townhomes, condos, new construction and development land."
      />

      <div className="container-page py-16">
        <SectionHeading
          title="Fresh to market"
          description="Book a private showing before the first open house."
          action={
            <Link href="/listings" className="btn-outline">
              Search all listings
            </Link>
          }
        />
        <ListingGrid listings={fresh.listings} empty="No new listings this week." />

        {comingSoon.listings.length > 0 ? (
          <div className="mt-16">
            <SectionHeading
              title="Coming soon"
              description="Preparing for market now — ask to be notified the day they go live."
            />
            <ListingGrid listings={comingSoon.listings} />
          </div>
        ) : null}
      </div>
    </>
  );
}
