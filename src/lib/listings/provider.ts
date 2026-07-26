import { demoListings } from "./demo-data";
import type { Listing, ListingQuery, ListingsResult } from "./types";

/**
 * Every listing source implements this interface. Swapping the demo inventory
 * for a licensed CREA DDF or board IDX feed only requires a new implementation
 * plus the LISTINGS_PROVIDER environment variable — no page changes.
 */
export interface ListingsProvider {
  readonly name: string;
  search(query: ListingQuery): Promise<ListingsResult>;
  getBySlug(slug: string): Promise<Listing | null>;
  cities(): Promise<string[]>;
}

function matches(listing: Listing, query: ListingQuery): boolean {
  if (query.city && listing.city !== query.city) return false;
  if (query.propertyType && listing.propertyType !== query.propertyType) return false;
  if (query.status && listing.status !== query.status) return false;
  if (query.category && listing.category !== query.category) return false;
  if (query.minPrice !== undefined && listing.price < query.minPrice) return false;
  if (query.maxPrice !== undefined && listing.price > query.maxPrice) return false;
  if (query.minBedrooms !== undefined && listing.bedrooms < query.minBedrooms) return false;
  if (query.minBathrooms !== undefined && listing.bathrooms < query.minBathrooms) return false;

  if (query.keyword) {
    const haystack = [
      listing.title,
      listing.address,
      listing.city,
      listing.neighbourhood,
      listing.postalCode,
      listing.mlsNumber,
      listing.description,
      ...listing.highlights,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    if (!haystack.includes(query.keyword.trim().toLowerCase())) return false;
  }

  return true;
}

function sortListings(listings: Listing[], sort: ListingQuery["sort"]): Listing[] {
  const sorted = [...listings];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    default:
      return sorted.sort((a, b) => Date.parse(b.listedAt) - Date.parse(a.listedAt));
  }
}

/** In-memory provider backed by the demo inventory. */
export class DemoListingsProvider implements ListingsProvider {
  readonly name = "demo";

  constructor(private readonly listings: Listing[] = demoListings) {}

  async search(query: ListingQuery): Promise<ListingsResult> {
    const filtered = sortListings(
      this.listings.filter((listing) => matches(listing, query)),
      query.sort,
    );
    return {
      listings: query.limit ? filtered.slice(0, query.limit) : filtered,
      total: filtered.length,
      source: this.name,
    };
  }

  async getBySlug(slug: string): Promise<Listing | null> {
    return this.listings.find((listing) => listing.slug === slug) ?? null;
  }

  async cities(): Promise<string[]> {
    return Array.from(new Set(this.listings.map((listing) => listing.city))).sort();
  }
}

let provider: ListingsProvider | null = null;

/**
 * Resolves the active listings provider. Set LISTINGS_PROVIDER=ddf together with
 * the DDF credentials once the CREA feed is licensed; see src/lib/listings/ddf.ts.
 */
export function getListingsProvider(): ListingsProvider {
  if (!provider) {
    provider = new DemoListingsProvider();
  }
  return provider;
}
