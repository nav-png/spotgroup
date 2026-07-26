import type { Listing, ListingStatus, PropertyType } from "./types";

/**
 * Mapping helpers for the CREA Data Distribution Facility (DDF) RESO Web API.
 *
 * Once the DDF licence is approved, set:
 *   LISTINGS_PROVIDER=ddf
 *   DDF_TOKEN_URL, DDF_CLIENT_ID, DDF_CLIENT_SECRET, DDF_API_URL
 *
 * A DdfListingsProvider then implements ListingsProvider by querying
 * `${DDF_API_URL}/Property` with OData filters and running each RESO record
 * through `mapResoProperty` below. Pages and components consume the same
 * `Listing` shape, so nothing else has to change.
 */
export interface ResoProperty {
  ListingKey: string;
  ListingId?: string;
  UnparsedAddress?: string;
  City?: string;
  StateOrProvince?: string;
  PostalCode?: string;
  ListPrice?: number;
  StandardStatus?: string;
  PropertySubType?: string;
  BedroomsTotal?: number;
  BathroomsTotalInteger?: number;
  LivingArea?: number;
  LotSizeSquareFeet?: number;
  YearBuilt?: number;
  PublicRemarks?: string;
  OriginalEntryTimestamp?: string;
  Latitude?: number;
  Longitude?: number;
  Media?: { MediaURL: string }[];
}

const statusMap: Record<string, ListingStatus> = {
  Active: "active",
  ActiveUnderContract: "active",
  ComingSoon: "coming-soon",
  Closed: "sold",
};

const propertyTypeMap: Record<string, PropertyType> = {
  "Single Family Residence": "detached",
  Townhouse: "attached",
  "Apartment": "condo",
  "Multi Family": "multifamily",
  "Unimproved Land": "land",
  Farm: "land",
};

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function mapResoProperty(property: ResoProperty): Listing {
  const address = property.UnparsedAddress ?? "Address on request";
  const city = property.City ?? "Lower Mainland";

  return {
    id: property.ListingKey,
    slug: slugify(`${address}-${city}`),
    mlsNumber: property.ListingId ?? null,
    title: address,
    address,
    city,
    province: property.StateOrProvince ?? "BC",
    postalCode: property.PostalCode,
    price: property.ListPrice ?? 0,
    status: statusMap[property.StandardStatus ?? ""] ?? "active",
    category: "mls",
    propertyType: propertyTypeMap[property.PropertySubType ?? ""] ?? "detached",
    bedrooms: property.BedroomsTotal ?? 0,
    bathrooms: property.BathroomsTotalInteger ?? 0,
    livingAreaSqFt: property.LivingArea ?? 0,
    lotSizeSqFt: property.LotSizeSquareFeet,
    yearBuilt: property.YearBuilt,
    description: property.PublicRemarks ?? "",
    highlights: [],
    images: (property.Media ?? []).map((media) => media.MediaURL),
    listedAt: property.OriginalEntryTimestamp ?? new Date().toISOString(),
    latitude: property.Latitude,
    longitude: property.Longitude,
  };
}
