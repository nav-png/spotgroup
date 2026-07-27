import Link from "next/link";
import type { Metadata } from "next";

import { PageHero } from "@/components/layout/page-hero";
import { PropertyGrid } from "@/components/property/property-grid";
import { getListingsProvider } from "@/lib/listings/provider";
import { media } from "@/lib/media";

export const metadata: Metadata = {
  title: "Featured Properties",
  description:
    "Properties hand-picked by the SPOT Group team across the Lower Mainland — homes, development land and new construction worth a closer look.",
  alternates: { canonical: "/buy/featured" },
};

export default async function FeaturedPage() {
  const { listings } = await getListingsProvider().search({
    featuredOnly: true,
    sort: "price-desc",
  });

  return (
    <>
      <PageHero
        eyebrow="Featured properties"
        title={
          <>
            Worth a closer look<span className="text-spot">.</span>
          </>
        }
        lede="A short list, chosen because the price, the land or the build quality makes them stand out — not because they pay to be here."
        image={media.interiorPatio}
      />

      <section className="section">
        <div className="shell">
          <PropertyGrid
            listings={listings}
            emptyTitle="Nothing featured right now"
            emptyBody="Our featured list changes as inventory moves. Browse everything we represent in the meantime."
            emptyAction={
              <Link href="/buy" className="btn-dark">
                Search all homes
              </Link>
            }
          />
        </div>
      </section>
    </>
  );
}
