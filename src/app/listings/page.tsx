import type { Metadata } from "next";
import { Suspense } from "react";

import { ListingFilters } from "@/components/listing-filters";
import { ListingGrid } from "@/components/listing-grid";
import { PageHero } from "@/components/section";
import { getListingsProvider } from "@/lib/listings/provider";
import { parseListingQuery } from "@/lib/listings/query";

export const metadata: Metadata = {
  title: "MLS® Listing Search",
  description:
    "Search homes, condos, townhomes, new construction and development land for sale across the Lower Mainland.",
};

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const provider = getListingsProvider();
  const query = parseListingQuery(searchParams);
  const [cities, result] = await Promise.all([provider.cities(), provider.search(query)]);

  return (
    <>
      <PageHero
        eyebrow="MLS® search"
        title="Find your next home, rental or development site"
        description="Filter by city, property type, price, beds and baths. Listings shown are demonstration data until the licensed CREA DDF® / board IDX feed is connected — the search, filters and detail pages are already wired to it."
      />

      <div className="container-page -mt-10 pb-20">
        <Suspense fallback={<div className="h-64 rounded-2xl border border-ink/10 bg-white" />}>
          <ListingFilters cities={cities} basePath="/listings" />
        </Suspense>

        <p className="mb-6 mt-8 text-sm text-ink-muted">
          {result.total} listing{result.total === 1 ? "" : "s"} found
        </p>

        <ListingGrid listings={result.listings} />
      </div>
    </>
  );
}
