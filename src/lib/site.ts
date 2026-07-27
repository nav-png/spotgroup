export const site = {
  name: "SPOT Group",
  shortName: "SPOT",
  tagline: "Know the spot.",
  /** Update once the production domain is live. */
  url: "https://spotsold.com",
  agent: {
    name: "Nav Sidhu",
    title: "Real Estate Consultant & Licensed Builder",
    yearsExperience: 11,
    email: "nav@spotsold.com",
    phone: "(604) 999-8883",
    phoneHref: "+16049998883",
    brokerage: "Century 21 Coastal Realty",
  },
  areas: [
    "Vancouver",
    "Burnaby",
    "Surrey",
    "Langley",
    "Coquitlam",
    "Richmond",
    "New Westminster",
    "Abbotsford",
    "Maple Ridge",
    "Delta",
  ],
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
  ],
} as const;

export interface NavLink {
  href: string;
  label: string;
  description?: string;
}

export interface NavItem extends NavLink {
  children?: NavLink[];
}

export const buyMenu: NavLink[] = [
  { href: "/buy", label: "Search Homes", description: "Every listing, filtered your way" },
  { href: "/buy/featured", label: "Featured Properties", description: "Hand-picked by our team" },
  { href: "/buy/recently-listed", label: "Recently Listed", description: "On the market this month" },
  { href: "/buy/open-houses", label: "Open Houses", description: "Walk through it this weekend" },
];

/** Communities we genuinely transact in across the Lower Mainland. */
export const communityMenu: NavLink[] = [
  { href: "/communities/vancouver", label: "Vancouver" },
  { href: "/communities/burnaby", label: "Burnaby" },
  { href: "/communities/richmond", label: "Richmond" },
  { href: "/communities/surrey", label: "Surrey" },
  { href: "/communities/langley", label: "Langley" },
  { href: "/communities/coquitlam", label: "Coquitlam" },
  { href: "/communities/new-westminster", label: "New Westminster" },
  { href: "/communities/maple-ridge", label: "Maple Ridge" },
  { href: "/communities/abbotsford", label: "Abbotsford" },
  { href: "/communities/delta", label: "Delta" },
  { href: "/communities", label: "All communities" },
];

export const primaryNav: NavItem[] = [
  { href: "/buy", label: "Buy", children: buyMenu },
  { href: "/sell", label: "Sell" },
  { href: "/new-developments", label: "New Developments" },
  { href: "/communities", label: "Communities", children: communityMenu },
  { href: "/team", label: "Team" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export interface MenuGroup {
  title: string;
  links: NavLink[];
}

/** Grouped columns for the full-screen menu overlay. */
export const menuGroups: MenuGroup[] = [
  {
    title: "Properties",
    links: [
      { href: "/buy", label: "Search Homes" },
      { href: "/buy/featured", label: "Featured Properties" },
      { href: "/buy/recently-listed", label: "Recently Listed" },
      { href: "/buy/open-houses", label: "Open Houses" },
      { href: "/exclusive", label: "Exclusive & Off-Market" },
      { href: "/new-developments", label: "New Developments" },
    ],
  },
  {
    title: "Communities",
    links: communityMenu.slice(0, 8),
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About SPOT Group" },
      { href: "/team", label: "Our Team" },
      { href: "/sell", label: "Selling With Us" },
      { href: "/sell#valuation", label: "Home Valuation" },
      { href: "/sell#cash-offer", label: "Sell As-Is / Cash Offer" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/insights", label: "Insights & Guides" },
      { href: "/insights/category/market-updates", label: "Market Updates" },
      { href: "/insights/category/buyer-guides", label: "Buyer Guides" },
      { href: "/insights/category/seller-guides", label: "Seller Guides" },
      { href: "/tools/calculator1.html", label: "Mortgage Calculator" },
    ],
  },
  {
    title: "Connect",
    links: [
      { href: "/contact", label: "Contact" },
      { href: `tel:${site.agent.phoneHref}`, label: site.agent.phone },
      { href: `mailto:${site.agent.email}`, label: site.agent.email },
      ...site.social.map((s) => ({ href: s.href, label: s.label })),
    ],
  },
];

export const legalNav: NavLink[] = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/accessibility", label: "Accessibility" },
];

export const disclosure = {
  brokerage: `${site.agent.name}, Real Estate Consultant. Licensed REALTOR® with ${site.agent.brokerage}.`,
  mls:
    "MLS®, REALTOR®, and the associated logos are trademarks of The Canadian Real Estate Association. " +
    "Listing information is deemed reliable but is not guaranteed accurate. Not intended to solicit properties already listed for sale.",
  equalHousing:
    "SPOT Group supports the principles of equal opportunity in housing. We serve every client without regard to race, colour, ancestry, place of origin, religion, family or marital status, physical or mental disability, sex, sexual orientation, gender identity or expression, or age.",
};
