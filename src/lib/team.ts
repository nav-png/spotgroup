import { media } from "./media";
import { site } from "./site";

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  licence?: string;
  bio: string[];
  focus: string[];
  photo: string;
  email?: string;
  phone?: string;
}

export const team: TeamMember[] = [
  {
    slug: "nav-sidhu",
    name: site.agent.name,
    role: "Founder | Real Estate Consultant & Licensed Builder",
    licence: `Licensed REALTOR® — ${site.agent.brokerage}`,
    bio: [
      "Nav has spent eleven years working every side of Lower Mainland real estate — listing and selling detached and attached homes, moving development land to builders and developers, and selling the new construction he builds himself.",
      "He is a licensed REALTOR® and a licensed builder, and he buys for his own portfolio: rental properties, fix-and-flips, and infill construction from detached homes to small multifamily. That means the advice you get is the same math he runs on his own money.",
      "Clients come to SPOT Group for a straight answer: what the property is worth today, what it could be worth with the right work or the right zoning, and what the fastest clean path to closing looks like.",
    ],
    focus: [
      "Detached & attached resale",
      "Development land & assemblies",
      "New construction and presales",
      "Investor and builder representation",
      "As-is sales and cash offers",
    ],
    photo: "/media/nav-sidhu.jpg",
    email: site.agent.email,
    phone: site.agent.phone,
  },
  {
    slug: "karn-tumber",
    name: "Karn Tumber",
    role: "Real Estate Consultant",
    licence: `Licensed REALTOR® — ${site.agent.brokerage}`,
    bio: [
      "Karn works with SPOT Group buyers and sellers across the Lower Mainland, from first purchases and investor condos to detached homes and pre-construction.",
      "He runs the day-to-day of a listing: preparation, photography, showings and follow-up, so nothing about a sale is left to chance.",
    ],
    focus: ["Buyer representation", "Condo and townhome sales", "Presale and new construction"],
    photo: "/media/karn-tumber.jpg",
    email: "karn@spotsold.com",
    phone: "(604) 999-6500",
  },
];

export const leadAgent = team[0];

/** Placeholder office/lifestyle art for the team feature until a shoot happens. */
export const teamFeatureImage = media.team;
