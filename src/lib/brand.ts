import { site } from "./site";

export interface Pillar {
  index: string;
  title: string;
  body: string;
}

export const pillars: Pillar[] = [
  {
    index: "01",
    title: "We build what we sell",
    body: "SPOT Group is led by a licensed builder. When we walk a property we are pricing the roof, the mechanical and the framing at the same time as the finishes — and when we sell new construction, it is often our own.",
  },
  {
    index: "02",
    title: "We know what land becomes",
    body: "Zoning, plan areas and assembly economics decide value across the Lower Mainland. We underwrite the development scenario and the conventional sale side by side, so you can choose with real numbers.",
  },
  {
    index: "03",
    title: "We invest our own money here",
    body: "Rental holds, fix-and-flips and infill construction across the same markets we represent clients in. The advice you get is the math we run on our own capital.",
  },
  {
    index: "04",
    title: "We close cleanly",
    body: "Conventional sale, exclusive off-market placement or a firm cash offer on an as-is property — we recommend the path that actually completes, and we say plainly which one benefits us.",
  },
];

export interface Stat {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  note?: string;
}

/**
 * VERIFIED FIGURES ONLY.
 *
 * Every value below is either factual (years in the industry, communities served,
 * team size) or a count derived from site data. Transaction volume, sales counts
 * and dollar figures are intentionally absent: add them here only with numbers
 * Nav can substantiate from brokerage records.
 *
 * PLACEHOLDER SLOTS to fill once verified:
 *   { label: "Homes sold", value: 0 }
 *   { label: "Total sales volume", value: 0, prefix: "$", suffix: "M" }
 */
export const stats: Stat[] = [
  { label: "Years in the industry", value: site.agent.yearsExperience, suffix: "+" },
  { label: "Lower Mainland communities served", value: site.areas.length },
  { label: "Sides of the deal we work", value: 3, note: "Resale, development land, new construction" },
  { label: "Licences held", value: 2, note: "REALTOR® and builder" },
];

export const positioning = {
  statement:
    "SPOT Group is a Lower Mainland real estate practice for people who care what a property is worth — today, and after the work.",
  body: "We list and sell detached and attached homes, place development land with builders and developers, market the new construction we build ourselves, and make firm cash offers on properties selling as-is. Eleven years of transactions across ten communities, run by a consultant who is also a licensed builder.",
};

export const sellingSteps = [
  {
    title: "Establish the real number",
    body: "Two valuations, not one: what the home is worth prepared and listed, and what the land is worth to a builder. You see both before we choose a strategy.",
  },
  {
    title: "Prepare with intent",
    body: "We decide what is worth spending money on and what is not. As a builder we can price repairs accurately and get trades on site quickly.",
  },
  {
    title: "Market it properly",
    body: "Editorial photography, floor plans, a dedicated property page, and direct outreach to the buyers and builders most likely to pay for this specific property.",
  },
  {
    title: "Negotiate and close",
    body: "Terms as much as price: deposit, conditions, completion date and, where it applies, the ability to close for cash without conditions.",
  },
];

export const cashOfferSteps = [
  {
    title: "Tell us about the property",
    body: "Address, condition and your timeline. No showings, no cleanup, no repairs.",
  },
  {
    title: "We inspect and underwrite",
    body: "One walkthrough. We price the work as a builder, not a guess, and we show you the assumptions.",
  },
  {
    title: "You get a firm number",
    body: "A written offer with a completion date you choose — plus the conventional-sale comparison so you can see what you are trading.",
  },
];
