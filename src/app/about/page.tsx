import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { PageHero } from "@/components/layout/page-hero";
import { SpotMark } from "@/components/brand/spot-mark";
import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";
import { pillars, positioning, stats } from "@/lib/brand";
import { media } from "@/lib/media";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About SPOT Group",
  description:
    "SPOT Group is a Lower Mainland real estate practice led by a consultant and licensed builder — resale, development land, new construction, investment property and as-is cash purchases.",
  alternates: { canonical: "/about" },
};

const services = [
  {
    title: "Resale — detached & attached",
    body: "Listing and buyer representation on houses, townhomes and condos across ten Lower Mainland communities.",
  },
  {
    title: "Development land",
    body: "Single lots, duplex and multiplex sites and small assemblies, placed with the builders and developers who actually close.",
  },
  {
    title: "New construction & presales",
    body: "Marketing boutique projects — including the homes our own construction team builds — from disclosure through completion.",
  },
  {
    title: "Investor & builder representation",
    body: "Underwriting rental holds, fix-and-flips and infill construction with the same math we run on our own purchases.",
  },
  {
    title: "As-is sales & cash offers",
    body: "A firm written offer on properties that are tenanted, dated, damaged or simply need to close quickly.",
  },
  {
    title: "Wholesale & off-market",
    body: "Quiet placement of properties that never reach MLS®, matched to buyers who can perform on our timeline.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            Know the spot<span className="text-spot">.</span>
          </>
        }
        lede={positioning.statement}
        image={media.intro}
        size="tall"
      />

      <section className="section">
        <div className="shell grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <Reveal>
            <h2 className="display-md">
              What SPOT Group is
              <span className="text-spot">.</span>
            </h2>
            <p className="mt-8 max-w-prose text-base leading-relaxed text-ink-700">
              {positioning.body}
            </p>
            <p className="mt-6 max-w-prose text-base leading-relaxed text-ink-700">
              The name is literal. Every decision in this business comes back to a spot: which street,
              which lot, which building, which side of a plan area boundary. We are not trying to be a
              brokerage that covers everything — we are trying to be the people who know the ground in
              {" "}
              {site.areas.length} Lower Mainland communities better than the next call you will make.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/team" className="btn-dark">
                Meet the team
              </Link>
              <Link href="/contact" className="btn-outline">
                Contact us
              </Link>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="media aspect-[4/5] rounded-card">
              <Image
                src={media.modernHouse}
                alt="New construction in the Lower Mainland"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink text-white section">
        <div className="shell">
          <Reveal className="flex flex-wrap items-end justify-between gap-8">
            <h2 className="display-md max-w-[22ch]">
              How we work
              <span className="text-spot">.</span>
            </h2>
            <SpotMark className="hidden h-14 w-14 text-spot lg:block" />
          </Reveal>
          <div className="mt-16 grid gap-x-12 gap-y-14 md:grid-cols-2">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.index} delay={index * 60}>
                <div className="border-t border-white/15 pt-7">
                  <p className="font-display text-4xl font-extrabold text-spot">{pillar.index}</p>
                  <h3 className="display-sm mt-5">{pillar.title}</h3>
                  <p className="mt-4 max-w-prose text-sm leading-relaxed text-white/70">{pillar.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <dl className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="border-t border-white/15 pt-6">
                <dd className="font-display text-4xl font-extrabold">
                  <CountUp
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                </dd>
                <dt className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <Reveal>
            <h2 className="display-md">
              What we do
              <span className="text-spot">.</span>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={(index % 3) * 60}>
                <div className="border-t border-ink/15 pt-6">
                  <h3 className="display-sm">{service.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-ink-500">{service.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
