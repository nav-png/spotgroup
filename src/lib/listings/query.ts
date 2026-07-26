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

type RawParams = Record<string, string | string[] | undefined>;

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

export function parseListingQuery(params: RawParams): ListingQuery {
  const propertyType = first(params, "propertyType");
  const status = first(params, "status");
  const sort = first(params, "sort");

  return {
    keyword: first(params, "keyword"),
    city: first(params, "city"),
    propertyType: propertyTypes.includes(propertyType as PropertyType)
      ? (propertyType as PropertyType)
      : undefined,
    status: statuses.includes(status as ListingStatus) ? (status as ListingStatus) : undefined,
    minPrice: number(params, "minPrice"),
    maxPrice: number(params, "maxPrice"),
    minBedrooms: number(params, "minBedrooms"),
    minBathrooms: number(params, "minBathrooms"),
    sort:
      sort === "price-asc" || sort === "price-desc" || sort === "newest"
        ? sort
        : "newest",
  };
}

export const propertyTypeOptions = propertyTypes;
export const statusOptions = statuses;
