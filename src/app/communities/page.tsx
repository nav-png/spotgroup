import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { communities } from "@/lib/communities";
import { media } from "@/lib/media";

export const metadata: Metadata = {
  title: "Communities",
  description:
    "Community guides for the Lower Mainland markets SPOT Group transacts in — Vancouver, Burnaby, Richmond, Surrey, Langley, Coquitlam, New Westminster, Maple Ridge, Abbotsford and Delta.",
  alternates: { canonical: "/communities" },
};

export default function CommunitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Communities"
        title={
          <>
            Ten markets, known properly<span className="text-spot">.</span>
          </>
        }
        lede="We do not claim to cover the province. These are the Lower Mainland communities we list, build and invest in — with the zoning and lifestyle detail that matters."
        image={media.aerialSuburb}
      />

      <section className="section">
        <div className="shell grid gap-8 md:grid-cols-2">
          {communities.map((community, index) => (
            <Reveal key={community.slug} delay={(index % 2) * 70}>
              <Link href={`/communities/${community.slug}`} className="group block">
                <div
                  className={`media media-zoom rounded-card ${
                    index % 3 === 0 ? "aspect-[4/5]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={community.card}
                    alt={community.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="overlay-scrim" />
                  <div className="absolute inset-x-0 bottom-0 p-8">
                    <p className="display-md text-white">{community.name}</p>
                    <p className="mt-2 text-sm text-white/75">{community.region}</p>
                  </div>
                </div>
                <p className="mt-5 max-w-prose text-base text-ink-500">{community.tagline}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
