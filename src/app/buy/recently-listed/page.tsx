import Link from "next/link";
import type { Metadata } from "next";

import { PageHero } from "@/components/layout/page-hero";
import { PropertyGrid } from "@/components/property/property-grid";
import { getListingsProvider } from "@/lib/listings/provider";
import { media } from "@/lib/media";

export const metadata: Metadata = {
  title: "Recently Listed",
  description:
    "The newest SPOT Group listings across the Lower Mainland, newest first — see what came to market this month.",
  alternates: { canonical: "/buy/recently-listed" },
};

export default async function RecentlyListedPage() {
  const { listings } = await getListingsProvider().search({ sort: "newest" });

  return (
    <>
      <PageHero
        eyebrow="Recently listed"
        title={
          <>
            New to market<span className="text-spot">.</span>
          </>
        }
        lede="Newest first. If you want these before they are published, ask to be added to our off-market list."
        image={media.interiorStair}
      />

      <section className="section">
        <div className="shell">
          <PropertyGrid
            listings={listings}
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
