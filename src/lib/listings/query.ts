import type { ListingQuery, ListingStatus, PropertyType } from "./types";

const propertyTypes: PropertyType[] = [
  "detached",
  "attached",
  "condo",
  "new-construction",
  "land",
  "multifamily",
];

const statuses: ListingStatus[] = ["active", "new", "sold", "coming-soon"];

const sorts: NonNullable<ListingQuery["sort"]>[] = [
  "newest",
  "price-asc",
  "price-desc",
  "beds-desc",
  "sqft-desc",
];

export type RawParams = Record<string, string | string[] | undefined>;

function first(params: RawParams, key: string): string | undefined {
  const value = params[key];
  const raw = Array.isArray(value) ? value[0] : value;
  return raw && raw.length > 0 ? raw : undefined;
}

function number(params: RawParams, key: string): number | undefined {
  const raw = first(params, key);
  if (!raw) return undefined;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function flag(params: RawParams, key: string): boolean | undefined {
  const raw = first(params, key);
  return raw === "1" || raw === "true" ? true : undefined;
}

export function parseListingQuery(params: RawParams): ListingQuery {
  const propertyType = first(params, "propertyType");
  const status = first(params, "status");
  const sort = first(params, "sort");

  return {
    keyword: first(params, "keyword"),
    city: first(params, "city"),
    community: first(params, "community"),
    propertyType: propertyTypes.includes(propertyType as PropertyType)
      ? (propertyType as PropertyType)
      : undefined,
    status: statuses.includes(status as ListingStatus) ? (status as ListingStatus) : undefined,
    minPrice: number(params, "minPrice"),
    maxPrice: number(params, "maxPrice"),
    minBedrooms: number(params, "minBedrooms"),
    minBathrooms: number(params, "minBathrooms"),
    openHouseOnly: flag(params, "openHouse"),
    featuredOnly: flag(params, "featured"),
    sort: sorts.includes(sort as NonNullable<ListingQuery["sort"]>)
      ? (sort as NonNullable<ListingQuery["sort"]>)
      : "newest",
  };
}

export const propertyTypeOptions = propertyTypes;
export const statusOptions = statuses;
export const sortOptions: { value: NonNullable<ListingQuery["sort"]>; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "beds-desc", label: "Most bedrooms" },
  { value: "sqft-desc", label: "Largest" },
];
