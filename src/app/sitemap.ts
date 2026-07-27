import type { MetadataRoute } from "next";

import { communities } from "@/lib/communities";
import { developments } from "@/lib/developments";
import { insightCategoryLabels, insights } from "@/lib/insights";
import { getListingsProvider } from "@/lib/listings/provider";
import { site } from "@/lib/site";
import { team } from "@/lib/team";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { listings } = await getListingsProvider().search({});
  const now = new Date();

  const staticRoutes = [
    "/",
    "/buy",
    "/buy/featured",
    "/buy/recently-listed",
    "/buy/open-houses",
    "/exclusive",
    "/sell",
    "/new-developments",
    "/communities",
    "/team",
    "/about",
    "/contact",
    "/insights",
    "/privacy",
    "/terms",
    "/accessibility",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route}`,
      lastModified: now,
      priority: route === "/" ? 1 : 0.8,
    })),
    ...communities.map((community) => ({
      url: `${site.url}/communities/${community.slug}`,
      lastModified: now,
      priority: 0.7,
    })),
    ...developments.map((development) => ({
      url: `${site.url}/new-developments/${development.slug}`,
      lastModified: now,
      priority: 0.7,
    })),
    ...team.map((member) => ({
      url: `${site.url}/team/${member.slug}`,
      lastModified: now,
      priority: 0.6,
    })),
    ...Object.keys(insightCategoryLabels).map((category) => ({
      url: `${site.url}/insights/category/${category}`,
      lastModified: now,
      priority: 0.5,
    })),
    ...insights.map((insight) => ({
      url: `${site.url}/insights/${insight.slug}`,
      lastModified: new Date(insight.publishedAt),
      priority: 0.6,
    })),
    ...listings.map((listing) => ({
      url: `${site.url}/listings/${listing.slug}`,
      lastModified: new Date(listing.listedAt),
      priority: 0.7,
    })),
  ];
}
