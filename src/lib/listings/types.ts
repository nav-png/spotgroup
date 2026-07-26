export type ListingStatus = "active" | "new" | "sold" | "coming-soon";

export type ListingCategory = "exclusive" | "mls";

export type PropertyType =
  | "detached"
  | "attached"
  | "condo"
  | "new-construction"
  | "land"
  | "multifamily";

export const propertyTypeLabels: Record<PropertyType, string> = {
  detached: "Detached home",
  attached: "Townhouse / attached",
  condo: "Condo / apartment",
  "new-construction": "New construction",
  land: "Land / development site",
  multifamily: "Small multifamily",
};

export interface Listing {
  id: string;
  slug: string;
  mlsNumber: string | null;
  title: string;
  address: string;
  city: string;
  neighbourhood?: string;
  province: string;
  postalCode?: string;
  price: number;
  status: ListingStatus;
  category: ListingCategory;
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  livingAreaSqFt: number;
  lotSizeSqFt?: number;
  yearBuilt?: number;
  description: string;
  highlights: string[];
  images: string[];
  listedAt: string;
  latitude?: number;
  longitude?: number;
}

export interface ListingQuery {
  keyword?: string;
  city?: string;
  propertyType?: PropertyType;
  status?: ListingStatus;
  category?: ListingCategory;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  minBathrooms?: number;
  sort?: "newest" | "price-asc" | "price-desc";
  limit?: number;
}

export interface ListingsResult {
  listings: Listing[];
  total: number;
  /** Identifies which data source answered the query (mock, ddf, ...). */
  source: string;
}
