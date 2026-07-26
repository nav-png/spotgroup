export const site = {
  name: "Spot Group Real Estate",
  shortName: "Spot Group",
  tagline: "Lower Mainland real estate, development and investment specialists",
  agent: {
    name: "Nav Sidhu",
    title: "Licensed REALTOR® & Licensed Builder",
    yearsExperience: 11,
    email: "nav@spotsold.com",
    phone: "(604) 555-0142",
    brokerage: "Spot Group Realty",
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
  nav: [
    { href: "/listings", label: "MLS Search" },
    { href: "/new-listings", label: "New Listings" },
    { href: "/exclusive", label: "Exclusive Listings" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

export const cashOfferCta = {
  href: "/sell-as-is",
  label: "Get a Cash Offer",
};
