import { media } from "./media";

export interface CommunityCategory {
  title: string;
  items: string[];
}

export interface Community {
  slug: string;
  name: string;
  region: string;
  tagline: string;
  hero: string;
  card: string;
  /** Two or three paragraphs of original overview copy. */
  overview: string[];
  lifestyle: string;
  categories: CommunityCategory[];
  /** Neighbourhoods we actively transact in. */
  neighbourhoods: string[];
  /** Matches Listing.city so the community page can pull inventory. */
  city: string;
}

export const communities: Community[] = [
  {
    slug: "vancouver",
    name: "Vancouver",
    region: "City of Vancouver",
    tagline: "Density, character, and the most watched land in the country.",
    hero: media.cityStreet,
    card: media.cityLights,
    city: "Vancouver",
    overview: [
      "Vancouver rewards people who understand what a lot can become. Character homes on standard 33-foot lots now sit inside a zoning framework that allows multiplex housing, and the buyers competing for them are as often small builders as they are families.",
      "We work both sides of that: helping owners of long-held homes understand the difference between a straight resale and a builder sale, and helping investors underwrite the multiplex or laneway upside before they write.",
    ],
    lifestyle:
      "East side neighbourhoods still trade on walkability — a bakery, a park and a SkyTrain station within a few blocks — while the west side and waterfront trade on views and school catchments. Both reward patience and precise pricing.",
    categories: [
      {
        title: "Schools",
        items: [
          "Vancouver School Board elementary and secondary catchments",
          "University of British Columbia",
          "Simon Fraser University downtown campus",
          "Langara College and VCC",
        ],
      },
      {
        title: "Parks & recreation",
        items: [
          "Stanley Park and the seawall",
          "Queen Elizabeth Park and Bloedel Conservatory",
          "Trout Lake and John Hendry Park",
          "Kitsilano and Spanish Banks beaches",
        ],
      },
      {
        title: "Shopping & dining",
        items: [
          "Robson and Alberni Street retail",
          "Main Street and Fraser Street independents",
          "Commercial Drive",
          "Granville Island Public Market",
        ],
      },
      {
        title: "Transportation",
        items: [
          "Expo, Millennium and Canada Line SkyTrain",
          "SeaBus to the North Shore",
          "Highway 1 and Knight Street Bridge access",
          "Vancouver International Airport, 25 minutes",
        ],
      },
    ],
    neighbourhoods: [
      "Renfrew Heights",
      "Sunset",
      "Killarney",
      "Hastings-Sunrise",
      "Mount Pleasant",
      "Kensington-Cedar Cottage",
    ],
  },
  {
    slug: "burnaby",
    name: "Burnaby",
    region: "Burnaby",
    tagline: "Four town centres, and towers going up in all of them.",
    hero: media.towersUp,
    card: media.highrise,
    city: "Burnaby",
    overview: [
      "Burnaby is the Lower Mainland's clearest example of planned density. Metrotown, Brentwood, Lougheed and Edmonds each have their own plan, their own construction cycle and their own pricing logic.",
      "For buyers that means concrete inventory at a range of price points; for owners of older homes and low-rise buildings inside plan areas it means understanding what the land is worth to a developer versus what the home is worth on MLS®.",
    ],
    lifestyle:
      "Mountain and inlet views, Simon Fraser University on the hill, and a green spine of parks between the town centres. It is the middle of everything — 20 minutes from downtown Vancouver, 30 from Surrey.",
    categories: [
      {
        title: "Schools",
        items: [
          "Burnaby School District catchments",
          "Simon Fraser University",
          "British Columbia Institute of Technology",
          "French immersion and IB programs",
        ],
      },
      {
        title: "Parks & recreation",
        items: [
          "Central Park and Deer Lake Park",
          "Burnaby Mountain Conservation Area",
          "Barnet Marine Park",
          "Burnaby Lake rowing and trails",
        ],
      },
      {
        title: "Shopping & dining",
        items: [
          "Metropolis at Metrotown",
          "The Amazing Brentwood",
          "Crystal Mall",
          "Hastings Street in the Heights",
        ],
      },
      {
        title: "Transportation",
        items: [
          "Expo and Millennium Line SkyTrain",
          "Highway 1 and Lougheed Highway",
          "Direct routes to downtown Vancouver and the Tri-Cities",
        ],
      },
    ],
    neighbourhoods: ["Metrotown", "Brentwood", "Lougheed", "Edmonds", "Burnaby Heights", "Capitol Hill"],
  },
  {
    slug: "richmond",
    name: "Richmond",
    region: "Richmond",
    tagline: "Island geography, international demand, careful due diligence.",
    hero: media.waterfront,
    card: media.waterfront,
    city: "Richmond",
    overview: [
      "Richmond is its own market. Inventory ranges from new concrete around Brighouse and Aberdeen to large detached homes on quiet interior streets, and buyer demand is genuinely international.",
      "It also demands the most diligence of anywhere we work: flood construction levels, agricultural land reserve boundaries and aircraft noise areas all affect value, and we check them before you write, not after.",
    ],
    lifestyle:
      "Dyke trails around the island's perimeter, Steveston's fishing village and restaurants, and one of the best Asian food scenes in North America — all a bridge from the airport.",
    categories: [
      {
        title: "Schools",
        items: [
          "Richmond School District catchments",
          "Kwantlen Polytechnic University Richmond campus",
          "Strong secondary programs at McMath, McNair and Steveston-London",
        ],
      },
      {
        title: "Parks & recreation",
        items: [
          "Steveston waterfront and the West Dyke Trail",
          "Garry Point Park",
          "Richmond Olympic Oval",
          "Minoru Park and Centre for Active Living",
        ],
      },
      {
        title: "Shopping & dining",
        items: [
          "CF Richmond Centre",
          "Aberdeen Centre and Yaohan",
          "Richmond Night Market",
          "Steveston Village restaurants",
        ],
      },
      {
        title: "Transportation",
        items: [
          "Canada Line to downtown Vancouver",
          "Vancouver International Airport",
          "Highway 99 and the George Massey crossing",
          "Knight Street and Oak Street bridges",
        ],
      },
    ],
    neighbourhoods: ["Brighouse", "Steveston", "Terra Nova", "Broadmoor", "Hamilton", "West Cambie"],
  },
  {
    slug: "surrey",
    name: "Surrey",
    region: "Surrey & South Surrey",
    tagline: "Where the region's growth — and our development work — is concentrated.",
    hero: media.aerialSuburb,
    card: media.aerialSuburb,
    city: "Surrey",
    overview: [
      "Surrey is six distinct town centres wearing one name. Whalley and City Centre are densifying around SkyTrain, Fleetwood is being rewritten by the Fraser Highway extension, Cloverdale and Newton still trade on lot size, and South Surrey trades on newer inventory.",
      "This is where most of our land assembly and new construction work happens. If you own a home inside a plan area, the question is not just what it is worth today — it is what it is worth to a developer, and when.",
    ],
    lifestyle:
      "Big lots, big yards, and genuine value per square foot compared with Vancouver, plus beaches at Crescent and White Rock and farmland minutes from new townhome projects.",
    categories: [
      {
        title: "Schools",
        items: [
          "Surrey Schools — the largest district in British Columbia",
          "Simon Fraser University Surrey campus",
          "Kwantlen Polytechnic University Surrey and Cloverdale",
          "French immersion and trades programs",
        ],
      },
      {
        title: "Parks & recreation",
        items: [
          "Bear Creek Park and Green Timbers Urban Forest",
          "Crescent Beach and Blackie Spit",
          "Surrey Sport and Leisure Complex",
          "Tynehead Regional Park",
        ],
      },
      {
        title: "Shopping & dining",
        items: [
          "Guildford Town Centre",
          "Central City and King George corridor",
          "Morgan Crossing and Grandview Corners",
          "Newton and Payal Business Centre",
        ],
      },
      {
        title: "Transportation",
        items: [
          "Expo Line to Surrey Central and King George",
          "Fraser Highway SkyTrain extension under construction",
          "Highway 1, Highway 10 and Highway 99",
          "Pattullo and Port Mann crossings",
        ],
      },
    ],
    neighbourhoods: ["Fleetwood", "East Newton", "Whalley", "Cloverdale", "Guildford", "South Surrey"],
  },
  {
    slug: "langley",
    name: "Langley",
    region: "City & Township of Langley",
    tagline: "Family-sized homes, acreage, and SkyTrain on the horizon.",
    hero: media.ridge,
    card: media.modernHouse,
    city: "Langley",
    overview: [
      "Langley gives buyers square footage: end-unit townhomes in Clayton and Willoughby, detached homes on real lots in Murrayville and Brookswood, and acreage further east.",
      "With the SkyTrain extension approved to Langley Centre, the calculus for both owners and investors is shifting — and plan areas are being redrawn around it.",
    ],
    lifestyle:
      "Wineries and farm stands on one side, new retail and family amenities on the other. It is the compromise a lot of Vancouver families end up making happily.",
    categories: [
      {
        title: "Schools",
        items: [
          "Langley School District catchments",
          "Trinity Western University",
          "Kwantlen Polytechnic University Langley campus",
          "Strong secondary athletics and trades programs",
        ],
      },
      {
        title: "Parks & recreation",
        items: [
          "Campbell Valley Regional Park",
          "Derby Reach and the Fort-to-Fort Trail",
          "Aldergrove Credit Union Community Centre",
          "Golf and equestrian facilities throughout the Township",
        ],
      },
      {
        title: "Shopping & dining",
        items: [
          "Willowbrook Shopping Centre",
          "Fort Langley village",
          "Langley Bypass retail",
          "Local wineries and cideries",
        ],
      },
      {
        title: "Transportation",
        items: [
          "Highway 1 and 200 Street interchange",
          "Fraser Highway corridor",
          "SkyTrain extension to Langley Centre in progress",
          "Golden Ears Bridge to Maple Ridge",
        ],
      },
    ],
    neighbourhoods: ["Willoughby", "Clayton", "Murrayville", "Brookswood", "Fort Langley", "Aldergrove"],
  },
  {
    slug: "coquitlam",
    name: "Coquitlam",
    region: "Tri-Cities",
    tagline: "Mountains at the back door, SkyTrain at the front.",
    hero: media.mountainLake,
    card: media.mountainLake,
    city: "Coquitlam",
    overview: [
      "Coquitlam has been the quiet winner of the Evergreen Extension. New concrete around Lincoln and Coquitlam Central rents well and holds value, and Burke Mountain continues to deliver large new detached homes.",
      "For investors, the two-bedroom and two-bedroom-plus-den product near transit remains one of the more dependable rental performers in the region.",
    ],
    lifestyle:
      "Lafarge Lake, the Coquitlam Crunch, Pinecone Burke trails and a town centre you can live in without a car — a rare combination this far east.",
    categories: [
      {
        title: "Schools",
        items: [
          "School District 43 catchments",
          "Douglas College Coquitlam campus",
          "IB and French immersion programs",
        ],
      },
      {
        title: "Parks & recreation",
        items: [
          "Town Centre Park and Lafarge Lake",
          "Mundy Park",
          "Coquitlam Crunch",
          "Pinecone Burke Provincial Park",
        ],
      },
      {
        title: "Shopping & dining",
        items: [
          "Coquitlam Centre",
          "Austin Heights",
          "Burquitlam Plaza",
          "Farmers markets at Town Centre Park",
        ],
      },
      {
        title: "Transportation",
        items: [
          "Millennium Line Evergreen Extension",
          "West Coast Express",
          "Highway 1 and Lougheed Highway",
          "Barnet Highway to Burnaby",
        ],
      },
    ],
    neighbourhoods: [
      "Coquitlam Town Centre",
      "Burke Mountain",
      "Austin Heights",
      "Burquitlam",
      "Maillardville",
    ],
  },
  {
    slug: "new-westminster",
    name: "New Westminster",
    region: "New Westminster",
    tagline: "The region's oldest city, and one of its most walkable.",
    hero: media.cityNight,
    card: media.cityNight,
    city: "New Westminster",
    overview: [
      "New Westminster trades on character and location: heritage homes in Queens Park, river-facing towers on the Quay, and five SkyTrain stations inside a small footprint.",
      "Older low-rise buildings and heritage-adjacent lots reward owners who understand what the city will and will not approve — worth checking before you plan a renovation or a rebuild.",
    ],
    lifestyle:
      "A real downtown, a boardwalk on the Fraser, and a farmers market that people plan their Thursdays around.",
    categories: [
      {
        title: "Schools",
        items: [
          "New Westminster Schools catchments",
          "Douglas College main campus",
          "Justice Institute of British Columbia",
        ],
      },
      {
        title: "Parks & recreation",
        items: [
          "Queens Park",
          "Westminster Pier Park",
          "Moody Park",
          "Anvil Centre programming",
        ],
      },
      {
        title: "Shopping & dining",
        items: [
          "Columbia Street",
          "River Market at the Quay",
          "Sapperton and Twelfth Street shops",
          "Royal City Centre",
        ],
      },
      {
        title: "Transportation",
        items: [
          "Five SkyTrain stations",
          "Pattullo Bridge replacement under construction",
          "Highway 1 via Brunette Avenue",
          "Queensborough Bridge to Richmond",
        ],
      },
    ],
    neighbourhoods: ["Queens Park", "Uptown", "Quay", "Sapperton", "Queensborough"],
  },
  {
    slug: "maple-ridge",
    name: "Maple Ridge",
    region: "Maple Ridge & Pitt Meadows",
    tagline: "New construction, big lots, and the best value per square foot east of the river.",
    hero: media.lake,
    card: media.modernHouse,
    city: "Maple Ridge",
    overview: [
      "Maple Ridge is where a lot of our own building happens. Silver Valley and Albion continue to deliver new detached homes with legal suites and coach houses, which is exactly the product that pays for itself.",
      "Buyers get more house and more land here than anywhere comparable; sellers benefit from a shortage of well-built, warranty-backed new inventory.",
    ],
    lifestyle:
      "Golden Ears Provincial Park at the end of the road, the Fraser at the bottom of the hill, and a downtown that has quietly improved every year.",
    categories: [
      {
        title: "Schools",
        items: [
          "School District 42 catchments",
          "Meadowridge School",
          "Trades and athletics academies",
        ],
      },
      {
        title: "Parks & recreation",
        items: [
          "Golden Ears Provincial Park",
          "Kanaka Creek Regional Park",
          "Whonnock Lake",
          "Maple Ridge Leisure Centre",
        ],
      },
      {
        title: "Shopping & dining",
        items: [
          "Haney Place Mall",
          "Valley Fair Mall",
          "Downtown Maple Ridge restaurants",
          "Local farms and garden centres",
        ],
      },
      {
        title: "Transportation",
        items: [
          "West Coast Express to downtown Vancouver",
          "Golden Ears Bridge",
          "Lougheed Highway",
          "Pitt Meadows Regional Airport",
        ],
      },
    ],
    neighbourhoods: ["Silver Valley", "Albion", "West Maple Ridge", "Cottonwood", "Whonnock"],
  },
  {
    slug: "abbotsford",
    name: "Abbotsford",
    region: "Fraser Valley",
    tagline: "Build-ready lots, small multifamily, and room to grow.",
    hero: media.ridge,
    card: media.ridge,
    city: "Abbotsford",
    overview: [
      "Abbotsford is the most affordable entry point for builders in the region. Serviced duplex and small multifamily lots are available at prices that still support a fixed-price build.",
      "We package these for small builders and first-time developers: plans, permits, budget and exit strategy in one conversation.",
    ],
    lifestyle:
      "Mount Baker on the horizon, farmland in every direction, a university campus and an airshow the whole valley shows up for.",
    categories: [
      {
        title: "Schools",
        items: [
          "Abbotsford School District catchments",
          "University of the Fraser Valley",
          "Trades training and dual-credit programs",
        ],
      },
      {
        title: "Parks & recreation",
        items: [
          "Mill Lake Park",
          "Sumas Mountain trails",
          "Abbotsford Recreation Centre",
          "Golf throughout the valley",
        ],
      },
      {
        title: "Shopping & dining",
        items: [
          "Sevenoaks Shopping Centre",
          "Historic Downtown Abbotsford",
          "High Street",
          "Farm markets and berry stands",
        ],
      },
      {
        title: "Transportation",
        items: [
          "Highway 1 access at multiple interchanges",
          "Abbotsford International Airport",
          "Highway 11 to Mission and the US border",
        ],
      },
    ],
    neighbourhoods: ["Central Abbotsford", "West Abbotsford", "Clayburn", "Sumas Mountain", "Aberdeen"],
  },
  {
    slug: "delta",
    name: "Delta",
    region: "North Delta, Ladner & Tsawwassen",
    tagline: "Three distinct communities, one of the region's best-kept secrets.",
    hero: media.beach,
    card: media.beach,
    city: "Delta",
    overview: [
      "North Delta offers large lots minutes from Surrey pricing; Ladner is a working village with a marina; Tsawwassen has new inventory and beaches.",
      "Owners here often underestimate suite potential and lot value — both worth measuring before listing.",
    ],
    lifestyle:
      "Boundary Bay birdwatching, Centennial Beach in the summer, and a slower pace 30 minutes from the city.",
    categories: [
      {
        title: "Schools",
        items: [
          "Delta School District catchments",
          "Strong French immersion enrolment",
          "Southridge School nearby in South Surrey",
        ],
      },
      {
        title: "Parks & recreation",
        items: [
          "Boundary Bay Regional Park",
          "Centennial Beach",
          "Watershed Park",
          "Ladner Harbour Park",
        ],
      },
      {
        title: "Shopping & dining",
        items: [
          "Tsawwassen Mills",
          "Ladner Village shops",
          "Scott Road corridor",
          "Local seafood and farm stands",
        ],
      },
      {
        title: "Transportation",
        items: [
          "Highway 17 and Highway 99",
          "BC Ferries at Tsawwassen",
          "Alex Fraser Bridge",
          "Bus rapid transit along Scott Road",
        ],
      },
    ],
    neighbourhoods: ["North Delta", "Ladner", "Tsawwassen", "Sunshine Hills", "Annieville"],
  },
];

export const featuredCommunitySlugs = [
  "vancouver",
  "surrey",
  "burnaby",
  "langley",
  "richmond",
  "coquitlam",
];

export function getCommunity(slug: string): Community | undefined {
  return communities.find((community) => community.slug === slug);
}
