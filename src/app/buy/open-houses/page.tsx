import Link from "next/link";
import type { Metadata } from "next";

import { PageHero } from "@/components/layout/page-hero";
import { PropertyGrid } from "@/components/property/property-grid";
import { formatDate } from "@/lib/format";
import { getListingsProvider } from "@/lib/listings/provider";
import { media } from "@/lib/media";

export const metadata: Metadata = {
  title: "Open Houses",
  description:
    "Upcoming SPOT Group open houses across the Lower Mainland — walk through a home this weekend with a consultant on site.",
  alternates: { canonical: "/buy/open-houses" },
};

export default async function OpenHousesPage() {
  const { listings } = await getListingsProvider().search({ openHouseOnly: true, sort: "newest" });

  return (
    <>
      <PageHero
        eyebrow="Open houses"
        title={
          <>
            Walk through it<span className="text-spot">.</span>
          </>
        }
        lede="A consultant is on site at every SPOT Group open house — bring your questions about the build, the area and the numbers."
        image={media.interiorDining}
      />

      <section className="section">
        <div className="shell">
          {listings.length > 0 ? (
            <ul className="mb-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {listings.flatMap((listing) =>
                (listing.openHouses ?? []).map((openHouse) => (
                  <li
                    key={`${listing.id}-${openHouse.date}-${openHouse.start}`}
                    className="rounded-card border border-ink/10 p-6"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-spot">
                      {formatDate(openHouse.date)}
                    </p>
                    <p className="mt-2 font-display text-xl font-bold uppercase">
                      {openHouse.start} – {openHouse.end}
                    </p>
                    <Link
                      href={`/listings/${listing.slug}`}
                      className="link-underline mt-4 inline-flex text-xs"
                    >
                      {listing.address}, {listing.city}
                    </Link>
                  </li>
                )),
              )}
            </ul>
          ) : null}

          <PropertyGrid
            listings={listings}
            emptyTitle="No open houses scheduled"
            emptyBody="Nothing is scheduled this week. Book a private showing on any listing instead — usually same or next day."
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
