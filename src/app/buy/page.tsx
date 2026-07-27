import type { Metadata } from "next";

import { PageHero } from "@/components/layout/page-hero";
import { PropertySearch, emptyFilters } from "@/components/property/property-search";
import { communities } from "@/lib/communities";
import { getListingsProvider } from "@/lib/listings/provider";
import { parseListingQuery, type RawParams } from "@/lib/listings/query";
import { media } from "@/lib/media";

export const metadata: Metadata = {
  title: "Search Homes",
  description:
    "Search Lower Mainland homes by community, price, bedrooms, bathrooms, property type and open houses. Detached, attached, condos, land and new construction.",
  alternates: { canonical: "/buy" },
};

function str(params: RawParams, key: string): string {
  const value = params[key];
  const raw = Array.isArray(value) ? value[0] : value;
  return raw ?? "";
}

export default async function BuyPage({ searchParams }: { searchParams: RawParams }) {
  const query = parseListingQuery(searchParams);
  const provider = getListingsProvider();
  const [result, cities] = await Promise.all([provider.search(query), provider.cities()]);

  return (
    <>
      <PageHero
        eyebrow="Buy"
        title={
          <>
            Find your spot<span className="text-spot">.</span>
          </>
        }
        lede="Every listing we represent across the Lower Mainland, plus the filters that actually matter — community, type, price and what is open this weekend."
        image={media.modernHouse}
        imageAlt="A modern West Coast home"
      />

      <section className="section">
        <div className="shell">
          <div className="mb-10 rounded-card bg-spot/15 px-6 py-5 text-sm text-ink-700">
            <strong className="font-semibold">Demonstration inventory.</strong> These properties are
            realistic samples, not a live MLS® feed. Once SPOT Group&apos;s CREA DDF® or board IDX
            feed is connected, this page shows real-time listings without any other change.
          </div>

          <PropertySearch
            initialFilters={{
              ...emptyFilters,
              keyword: str(searchParams, "keyword"),
              city: str(searchParams, "city"),
              community: str(searchParams, "community"),
              propertyType: str(searchParams, "propertyType"),
              minPrice: str(searchParams, "minPrice"),
              maxPrice: str(searchParams, "maxPrice"),
              minBedrooms: str(searchParams, "minBedrooms"),
              minBathrooms: str(searchParams, "minBathrooms"),
              openHouse: str(searchParams, "openHouse") === "1",
              sort: query.sort ?? "newest",
            }}
            initialListings={result.listings}
            cities={cities}
            communities={communities.map(({ slug, name }) => ({ slug, name }))}
          />
        </div>
      </section>
    </>
  );
}
