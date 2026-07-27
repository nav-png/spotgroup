import { media } from "./media";

export type InsightCategory =
  | "market-updates"
  | "buyer-guides"
  | "seller-guides"
  | "community-stories";

export const insightCategoryLabels: Record<InsightCategory, string> = {
  "market-updates": "Market Updates",
  "buyer-guides": "Buyer Guides",
  "seller-guides": "Seller Guides",
  "community-stories": "Community Stories",
};

export interface Insight {
  slug: string;
  title: string;
  category: InsightCategory;
  excerpt: string;
  publishedAt: string;
  readMinutes: number;
  image: string;
  /** Original SPOT Group editorial. Plain paragraphs; "## " prefixes a subhead. */
  body: string[];
}

/**
 * Original SPOT Group editorial. Guides are evergreen; market commentary is
 * qualitative on purpose — we do not publish statistics we cannot verify.
 */
export const insights: Insight[] = [
  {
    slug: "what-your-lot-is-worth-to-a-builder",
    title: "What Your Lot Is Worth To A Builder",
    category: "seller-guides",
    excerpt:
      "Two buyers will look at your house completely differently. Here is how a builder actually values your property — and when that number beats a conventional sale.",
    publishedAt: "2026-07-16",
    readMinutes: 6,
    image: media.aerialSuburb,
    body: [
      "When a family buys your house, they are buying a home: the kitchen, the school catchment, how the light comes into the living room. When a builder buys your house, none of that matters. They are buying land, zoning and a schedule.",
      "## The builder's arithmetic",
      "A builder starts at the end. They estimate what the finished product sells for, subtract hard construction costs, soft costs, financing, municipal fees and a required profit margin, and whatever is left is what they can pay for your lot. If your asking price is above that number, no amount of negotiating changes the answer.",
      "That is why two offers on the same property can be hundreds of thousands of dollars apart and both be rational. They are solving different equations.",
      "## What moves the number",
      "Lot width and depth, corner exposure, lane access, slope, trees with retention requirements, the location of services, and above all what the zoning and the applicable plan area actually permit today. A property that supports a duplex is worth one thing. The same property inside a townhouse designation is worth another entirely.",
      "Timing matters too. A builder who can start this season pays more than one who has to carry your property for eighteen months waiting on an application.",
      "## When a builder sale is the right call",
      "If your home needs significant work, if a renovation would not be recovered on resale, or if your lot's development potential clearly exceeds its value as a house, the builder market is usually where the strongest offer comes from. We will run both numbers before you list, so you are choosing rather than guessing.",
    ],
  },
  {
    slug: "selling-as-is-what-it-really-means",
    title: "Selling As-Is: What It Really Means",
    category: "seller-guides",
    excerpt:
      "An as-is sale is not a discount for its own sake. It is a trade: you give up staging, repairs and conditions, and you get speed and certainty.",
    publishedAt: "2026-07-04",
    readMinutes: 5,
    image: media.keys,
    body: [
      "Most sellers assume they have one option: prepare the home, list it, and manage the process to completion. For a lot of people that is right. But when the property needs real work, when it is an estate, or when the timeline is not negotiable, an as-is sale is often the cleaner path.",
      "## What you are actually trading",
      "In an as-is sale you do not repair, stage or renovate. You do not host open houses. In exchange the buyer prices the unknown into their offer and takes the property in its current condition. That discount is the cost of certainty — and it is frequently smaller than the cost of financing, holding and completing the work yourself.",
      "## Where a cash offer fits",
      "We buy some properties directly and we place others with investors and builders in our network. Either way you should see the math: what the property would likely bring after repairs and a conventional sale, minus the realistic cost and time of getting there, next to a firm cash number that closes on a date you choose.",
      "## Questions to ask any cash buyer",
      "Is the offer firm or subject to inspection and financing? Who is actually on title at completion? Is the property being assigned to another buyer, and does that affect your price? Are there fees deducted at closing? A serious buyer answers all four in writing.",
      "You are entitled to representation in an as-is sale like any other. If we are buying, we say so and we recommend you take independent advice.",
    ],
  },
  {
    slug: "buying-presale-in-the-lower-mainland",
    title: "Buying Presale In The Lower Mainland",
    category: "buyer-guides",
    excerpt:
      "Deposits, assignment rights, disclosure statements and completion risk — the parts of a presale contract that decide whether the purchase works.",
    publishedAt: "2026-06-27",
    readMinutes: 7,
    image: media.curvedTower,
    body: [
      "A presale is a contract, not a house. You are agreeing today to buy something that does not exist yet, on terms set by the developer, and the details of that contract matter far more than the finishes in the display suite.",
      "## Read the disclosure statement",
      "British Columbia requires developers to provide a disclosure statement. Inside it are the things that decide whether your purchase behaves the way you expect: the outside completion date, the developer's rights to change the plan, the parking and storage allocation, the estimated strata fees and any rental or pet restrictions.",
      "## Deposits and assignment",
      "Deposit structures are usually staged over the construction period. Understand exactly when each tranche is due and where the money is held. If you may want to sell your contract before completion, the assignment clause governs whether you can, what it costs, and whether the developer must consent.",
      "## Financing at completion, not today",
      "Your lender approves you against conditions at completion, which may be years away. Rates, policy and your own income can all move. Build in room, and keep documentation current.",
      "## Where presale genuinely works",
      "Buyers who want new construction near transit and can wait, and investors who understand the deposit schedule and the assignment terms. It works less well for anyone who needs a home on a fixed date.",
    ],
  },
  {
    slug: "lower-mainland-market-notes-summer-2026",
    title: "Market Notes: Summer 2026",
    category: "market-updates",
    excerpt:
      "What we are seeing on the ground this season across detached, attached and development land — qualitative, from our own transactions.",
    publishedAt: "2026-07-22",
    readMinutes: 4,
    image: media.cityLights,
    body: [
      "These are observations from our own listings, offers and conversations this season. They are not board statistics; when we quote numbers, we cite the source.",
      "## Detached homes",
      "Well-prepared, correctly priced detached inventory is still transacting on a normal timeline. Overpriced listings are not getting the benefit of the doubt — buyers wait, or they write low and let the seller decide.",
      "## Attached and condo",
      "Product near rapid transit continues to attract both end users and investors. Parking, air conditioning and rental flexibility are doing real work in buyer decisions.",
      "## Development land",
      "Builder and developer appetite is selective and highly conditional on approval timelines. Sites with completed studies, clear designations and a credible schedule move; raw speculative sites sit.",
      "## What it means if you are deciding",
      "Preparation and pricing have never mattered more relative to marketing. We would rather spend two weeks getting a property genuinely ready than three months explaining why it has not sold.",
    ],
  },
  {
    slug: "fleetwood-is-being-rewritten",
    title: "Fleetwood Is Being Rewritten",
    category: "community-stories",
    excerpt:
      "SkyTrain is coming up Fraser Highway, and a neighbourhood of large lots and quiet streets is turning into something else. What owners should understand now.",
    publishedAt: "2026-06-12",
    readMinutes: 6,
    image: media.cityStreet,
    body: [
      "Fleetwood has spent decades as one of Surrey's most liveable neighbourhoods — big lots, mature trees, good schools, and very little density. The SkyTrain extension along Fraser Highway changes that permanently.",
      "## What the plan contemplates",
      "The Fleetwood Plan concentrates density around future station areas, with taller forms closest to transit stepping down into townhouse and infill designations further out. That means your street may be designated for a form of housing that does not exist there yet.",
      "## Why assemblies happen",
      "Most designated density cannot be built one lot at a time. Builders need contiguous frontage, which is why owners are approached as a group. Whether an assembly is worth joining depends on the designation, the site's shape, and how long the group is willing to wait.",
      "## If someone knocks on your door",
      "Ask what the offer is conditional on, how long the conditions run, whether there is a deposit and whether it becomes non-refundable. Ask who else has signed. Then have someone independent value both the assembly scenario and a conventional sale before you commit.",
      "We do this work in Fleetwood constantly, on both sides. If your street is in play, you should know what your position is worth before you negotiate.",
    ],
  },
  {
    slug: "the-suite-that-pays-your-mortgage",
    title: "The Suite That Pays Your Mortgage",
    category: "buyer-guides",
    excerpt:
      "Legal suites and coach houses change what you can afford — if the suite is actually legal, and the numbers survive a lender's underwriting.",
    publishedAt: "2026-05-29",
    readMinutes: 5,
    image: media.interiorDining,
    body: [
      "A mortgage helper is the most reliable affordability tool available to Lower Mainland buyers. It is also the area where we see the most confusion between what exists and what is permitted.",
      "## Legal, non-conforming, and neither",
      "A legal suite has been permitted and inspected. A non-conforming suite exists but was never permitted, and a municipality can require it to be removed. The difference affects insurance, financing and what a lender will count as income.",
      "## What a lender will actually use",
      "Policies vary, but lenders typically count only a portion of documented rental income, and many require the suite to be legal and the income to be verifiable. Ask your broker for the specific treatment before you rely on the rent in your budget.",
      "## Coach houses",
      "Where permitted, a detached coach house is often the strongest income addition available on a single lot — a second full dwelling with its own entrance and, usually, its own utilities. Zoning, lane access and lot coverage decide whether it is possible.",
      "## Build it, or buy it built",
      "We build this product ourselves, so we know what it costs and what it rents for. If you are choosing between a home with an existing suite and one where you would add it, the honest comparison includes permits, timeline and financing — not just the construction quote.",
    ],
  },
];

export function getInsight(slug: string): Insight | undefined {
  return insights.find((insight) => insight.slug === slug);
}

export function insightsByCategory(category: InsightCategory): Insight[] {
  return insights.filter((insight) => insight.category === category);
}
