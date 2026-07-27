import { media } from "./media";

export type DevelopmentStatus = "now-selling" | "coming-soon" | "under-construction" | "sold-out";

export const developmentStatusLabels: Record<DevelopmentStatus, string> = {
  "now-selling": "Now selling",
  "coming-soon": "Coming soon",
  "under-construction": "Under construction",
  "sold-out": "Sold out",
};

export interface Development {
  slug: string;
  name: string;
  developer: string;
  city: string;
  neighbourhood: string;
  status: DevelopmentStatus;
  /** Null while a completion date has not been published. */
  completion: string | null;
  homeTypes: string;
  priceFrom: number | null;
  unitCount: number | null;
  summary: string;
  description: string[];
  highlights: string[];
  hero: string;
  gallery: string[];
  /** Set when a licensed project film is available. */
  video: string | null;
}

/**
 * DEMONSTRATION CONTENT. These project records describe the type of new
 * construction and presale inventory SPOT Group represents; replace with live
 * projects and developer-approved copy before launch.
 */
export const developments: Development[] = [
  {
    slug: "fleetwood-six",
    name: "Fleetwood Six",
    developer: "SPOT Group",
    city: "Surrey",
    neighbourhood: "Fleetwood",
    status: "now-selling",
    completion: "Fall 2026",
    homeTypes: "4 bedroom townhomes, 1,980 sq ft",
    priceFrom: 1129000,
    unitCount: 6,
    summary:
      "A six-home boutique townhome project a short walk from the Fraser Highway SkyTrain extension. Two homes remain.",
    description: [
      "Fleetwood Six is a small project on purpose. Six side-by-side homes, each with a double garage, a ground-floor flex bedroom and a full 2-5-10 warranty, built by our own construction team.",
      "The location is the point: the Fraser Highway SkyTrain extension puts rapid transit within walking distance, and Fleetwood's plan area continues to add density around it.",
    ],
    highlights: [
      "Two of six homes remaining",
      "Side-by-side double garages",
      "Ground floor flex bedroom",
      "2-5-10 new home warranty",
      "Assignable deposits for investors",
    ],
    hero: media.modernHouse,
    gallery: [media.modernHouse, media.interiorDining, media.interiorStair, media.bath],
    video: null,
  },
  {
    slug: "silver-valley-estates",
    name: "Silver Valley Estates",
    developer: "SPOT Group",
    city: "Maple Ridge",
    neighbourhood: "Silver Valley",
    status: "under-construction",
    completion: "Spring 2027",
    homeTypes: "Detached homes with legal suites and coach houses",
    priceFrom: 1949000,
    unitCount: 4,
    summary:
      "Four detached homes designed around income: a two-bedroom legal suite and a detached coach house on every lot.",
    description: [
      "Every home in this release is built the way we build for our own portfolio — a main residence over a two-bedroom legal suite, plus a detached coach house at the lane.",
      "Radiant in-floor heat, central air, oversized garages and a 2-5-10 warranty. The rental income is not a bonus; it is the design brief.",
    ],
    highlights: [
      "Legal suite plus coach house on every lot",
      "Radiant heat with central air",
      "Oversized triple garages",
      "Built and warrantied by SPOT Group",
    ],
    hero: media.interiorPatio,
    gallery: [media.interiorPatio, media.modernHouse, media.interiorDining],
    video: null,
  },
  {
    slug: "kingsway-collection",
    name: "Kingsway Collection",
    developer: "Third-party developer — SPOT Group sales",
    city: "Burnaby",
    neighbourhood: "Metrotown",
    status: "coming-soon",
    completion: null,
    homeTypes: "Studio to 3 bedroom concrete homes",
    priceFrom: null,
    unitCount: null,
    summary:
      "A concrete high-rise release inside the Metrotown plan area. Register for pricing and first access.",
    description: [
      "A concrete tower steps from Metropolis at Metrotown and the Expo Line, with a mix from studios through three-bedroom family plans.",
      "Pricing and the deposit structure have not been released. Registered SPOT Group clients see the price list and floor plates before the public opening.",
    ],
    highlights: [
      "Metrotown plan area",
      "Walking distance to SkyTrain",
      "Pricing to be released",
      "Priority access for registered clients",
    ],
    hero: media.curvedTower,
    gallery: [media.curvedTower, media.highrise, media.towersUp],
    video: null,
  },
  {
    slug: "mccallum-duplex-lots",
    name: "McCallum Duplex Lots",
    developer: "SPOT Group",
    city: "Abbotsford",
    neighbourhood: "Central Abbotsford",
    status: "now-selling",
    completion: "Build-ready",
    homeTypes: "Serviced duplex lots with permits ready to issue",
    priceFrom: 799000,
    unitCount: 1,
    summary:
      "A serviced duplex lot with plans, permits and a fixed-price construction budget — a first project a small builder can actually start.",
    description: [
      "This is the package we wish existed when we started building: a serviced lot, drawings, permits ready to issue, and a fixed-price budget from a builder who has completed the same product nearby.",
      "Buy the lot and build it yourself, or have our construction team deliver it turnkey.",
    ],
    highlights: [
      "Permits ready to issue",
      "Duplex plans included",
      "Fixed-price construction budget",
      "Turnkey build available",
    ],
    hero: media.aerialSuburb,
    gallery: [media.aerialSuburb, media.modernHouse],
    video: null,
  },
];

export function getDevelopment(slug: string): Development | undefined {
  return developments.find((development) => development.slug === slug);
}
