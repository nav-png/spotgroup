import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { HomeHero } from "@/components/home/hero";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { PropertyCarousel } from "@/components/property/property-carousel";
import { SpotMark } from "@/components/brand/spot-mark";
import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";
import { pillars, positioning, stats } from "@/lib/brand";
import { communities, featuredCommunitySlugs } from "@/lib/communities";
import { developments, developmentStatusLabels } from "@/lib/developments";
import { formatDate, formatPrice } from "@/lib/format";
import { insightCategoryLabels, insights } from "@/lib/insights";
import { getListingsProvider } from "@/lib/listings/provider";
import { media } from "@/lib/media";
import { site } from "@/lib/site";
import { leadAgent, team } from "@/lib/team";

export const metadata: Metadata = {
  title: `${site.name} | Lower Mainland Real Estate Consultants`,
  description:
    "SPOT Group represents buyers, sellers, investors and builders across the Lower Mainland — resale homes, development land, new construction, and firm cash offers on as-is properties.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const provider = getListingsProvider();
  const [featured, recent] = await Promise.all([
    provider.search({ featuredOnly: true, sort: "price-desc" }),
    provider.search({ sort: "newest", limit: 3 }),
  ]);

  const featuredCommunities = featuredCommunitySlugs
    .map((slug) => communities.find((community) => community.slug === slug))
    .filter((community): community is (typeof communities)[number] => Boolean(community));

  const activeDevelopments = developments.filter((item) => item.status !== "sold-out").slice(0, 3);
  const latestInsights = insights.slice(0, 3);

  return (
    <>
      <HomeHero />

      {/* Overlapping introduction panel */}
      <section className="relative z-10 -mt-24 md:-mt-28">
        <div className="shell">
          <Reveal className="panel px-7 py-14 shadow-[0_-30px_80px_-60px_rgba(0,0,0,0.5)] sm:px-12 md:px-16 md:py-20">
            <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:items-end">
              <div>
                <p className="eyebrow">Who we are</p>
                <h2 className="display-md mt-6 max-w-[26ch]">{positioning.statement}</h2>
              </div>
              <div>
                <p className="text-base leading-relaxed text-ink-500">{positioning.body}</p>
                <Link href="/about" className="link-underline mt-8 inline-flex">
                  About SPOT Group <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured properties */}
      <section className="section" id="featured">
        <div className="shell">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Featured properties</p>
              <h2 className="display-lg mt-5">
                On the market
                <span className="text-spot">.</span>
              </h2>
            </div>
            <Link href="/buy" className="link-underline">
              View all properties <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
        <div className="mt-14">
          <div className="shell">
            <PropertyCarousel listings={featured.listings} />
          </div>
        </div>
      </section>

      {/* Communities */}
      <section className="bg-ink-50 section" id="communities">
        <div className="shell">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Communities</p>
              <h2 className="display-lg mt-5 max-w-[18ch]">
                Ten markets we actually transact in
                <span className="text-spot">.</span>
              </h2>
            </div>
            <Link href="/communities" className="link-underline">
              All communities <span aria-hidden="true">→</span>
            </Link>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredCommunities.map((community, index) => (
              <Reveal key={community.slug} delay={index * 60}>
                <Link
                  href={`/communities/${community.slug}`}
                  className="group block h-full"
                  aria-label={`${community.name} community guide`}
                >
                  <div
                    className={`media media-zoom rounded-card ${
                      index % 5 === 0 ? "aspect-[4/5]" : "aspect-[4/3]"
                    }`}
                  >
                    <Image
                      src={community.card}
                      alt={community.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <div className="overlay-scrim" />
                    <div className="absolute inset-x-0 bottom-0 p-7">
                      <p className="font-display text-3xl font-extrabold uppercase leading-none tracking-[-0.02em] text-white">
                        {community.name}
                      </p>
                      <p className="mt-2 text-sm text-white/75">{community.region}</p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Selling with SPOT Group */}
      <section className="section" id="selling">
        <div className="shell grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="media aspect-[4/5] rounded-card">
              <Image
                src={media.selling}
                alt="A prepared home interior ready for market"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <p className="eyebrow">Selling with SPOT Group</p>
            <h2 className="display-lg mt-5">
              Two numbers
              <br />
              before you list
              <span className="text-spot">.</span>
            </h2>
            <p className="lede mt-7">
              What your home is worth prepared and marketed, and what your land is worth to a builder.
              You see both, with the assumptions behind them, before we choose a strategy.
            </p>
            <p className="mt-5 text-base leading-relaxed text-ink-500">
              Then we prepare it properly. As a licensed builder we can price repairs accurately, get
              trades on site, and market to the specific buyers — families, investors, developers —
              most likely to pay for your property.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/sell#valuation" className="btn-spot">
                Request a home valuation
              </Link>
              <Link href="/sell" className="btn-outline">
                How we sell
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* New developments */}
      <section className="relative overflow-hidden bg-ink text-white section" id="developments">
        <Image
          src={media.developments}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="shell relative">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow-light">New developments</p>
              <h2 className="display-lg mt-5 max-w-[20ch]">
                We sell what we build
                <span className="text-spot">.</span>
              </h2>
            </div>
            <Link href="/new-developments" className="link-underline text-white">
              All developments <span aria-hidden="true">→</span>
            </Link>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {activeDevelopments.map((development, index) => (
              <Reveal key={development.slug} delay={index * 70}>
                <Link
                  href={`/new-developments/${development.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-card bg-white/[0.06] transition hover:bg-white/10"
                >
                  <div className="media media-zoom aspect-[4/3]">
                    <Image
                      src={development.hero}
                      alt={development.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <span className="absolute left-4 top-4 tag-spot">
                      {developmentStatusLabels[development.status]}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <p className="font-display text-2xl font-extrabold uppercase tracking-[-0.01em]">
                      {development.name}
                    </p>
                    <p className="mt-2 text-sm text-white/60">
                      {development.neighbourhood}, {development.city}
                    </p>
                    <p className="mt-5 flex-1 text-sm leading-relaxed text-white/70">
                      {development.summary}
                    </p>
                    <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-5 text-xs uppercase tracking-[0.12em] text-white/60">
                      <div>
                        <dt className="text-white/40">Completion</dt>
                        <dd className="mt-1">{development.completion ?? "To be announced"}</dd>
                      </div>
                      <div>
                        <dt className="text-white/40">From</dt>
                        <dd className="mt-1">
                          {development.priceFrom ? formatPrice(development.priceFrom) : "Register for pricing"}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why SPOT Group */}
      <section className="section" id="why">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Why SPOT Group</p>
            <h2 className="display-lg mt-5 max-w-[24ch]">
              Advice from people with skin in the game
              <span className="text-spot">.</span>
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-x-12 gap-y-14 md:grid-cols-2">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.index} delay={index * 70}>
                <div className="border-t border-ink/15 pt-8">
                  <p className="font-display text-5xl font-extrabold text-spot">{pillar.index}</p>
                  <h3 className="display-sm mt-6">{pillar.title}</h3>
                  <p className="mt-4 max-w-prose text-base leading-relaxed text-ink-500">{pillar.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Market reach / statistics */}
      <section className="bg-ink text-white section">
        <div className="shell">
          <Reveal className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="eyebrow-light">Market reach</p>
              <h2 className="display-md mt-5 max-w-[22ch]">
                Eleven years, ten communities, every side of the deal
                <span className="text-spot">.</span>
              </h2>
            </div>
            <SpotMark className="hidden h-16 w-16 text-spot lg:block" mirrored />
          </Reveal>

          <dl className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 60}>
                <div className="border-t border-white/15 pt-7">
                  <dd className="font-display text-5xl font-extrabold tracking-[-0.03em] xl:text-6xl">
                    <CountUp
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                    />
                  </dd>
                  <dt className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-white/70">
                    {stat.label}
                  </dt>
                  {stat.note ? <p className="mt-2 text-xs text-white/45">{stat.note}</p> : null}
                </div>
              </Reveal>
            ))}
          </dl>
          <p className="mt-10 text-xs text-white/40">
            We publish only figures we can substantiate. Transaction volume is available on request.
          </p>
        </div>
      </section>

      {/* Team feature */}
      <section className="section" id="team">
        <div className="shell grid items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <div className="media aspect-[4/5] rounded-card">
              <Image
                src={leadAgent.photo}
                alt={`${leadAgent.name}, ${leadAgent.role}`}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-top"
              />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <p className="eyebrow">The team</p>
            <h2 className="display-lg mt-5">
              {leadAgent.name}
              <span className="text-spot">.</span>
            </h2>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-ink-500">
              {leadAgent.role}
            </p>
            <p className="lede mt-7">{leadAgent.bio[0]}</p>
            <p className="mt-5 text-base leading-relaxed text-ink-500">{leadAgent.bio[1]}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/team" className="btn-dark">
                Meet the team ({team.length})
              </Link>
              <Link href="/contact" className="btn-outline">
                Work with us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Insights */}
      <section className="bg-ink-50 section" id="insights">
        <div className="shell">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Insights &amp; guides</p>
              <h2 className="display-lg mt-5 max-w-[20ch]">
                Straight answers, written down
                <span className="text-spot">.</span>
              </h2>
            </div>
            <Link href="/insights" className="link-underline">
              All insights <span aria-hidden="true">→</span>
            </Link>
          </Reveal>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {latestInsights.map((insight, index) => (
              <Reveal key={insight.slug} delay={index * 70}>
                <Link href={`/insights/${insight.slug}`} className="group block">
                  <div className="media media-zoom aspect-[3/2] rounded-card">
                    <Image
                      src={insight.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-spot">
                    {insightCategoryLabels[insight.category]}
                  </p>
                  <h3 className="display-sm mt-3">{insight.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-500">{insight.excerpt}</p>
                  <p className="mt-4 text-xs uppercase tracking-[0.14em] text-ink-400">
                    {formatDate(insight.publishedAt)} · {insight.readMinutes} min read
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Recently listed strip */}
      <section className="section">
        <div className="shell">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="display-md max-w-[20ch]">
              Recently listed
              <span className="text-spot">.</span>
            </h2>
            <Link href="/buy/recently-listed" className="link-underline">
              See what is new <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {recent.listings.map((listing, index) => (
              <Reveal key={listing.id} delay={index * 60}>
                <Link href={`/listings/${listing.slug}`} className="group block">
                  <div className="media media-zoom aspect-[3/2] rounded-card">
                    <Image
                      src={listing.images[0]}
                      alt={`${listing.address}, ${listing.city}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-5 font-display text-2xl font-extrabold">{formatPrice(listing.price)}</p>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-[0.08em]">{listing.address}</p>
                  <p className="text-sm text-ink-500">{listing.city}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <Image src={media.cta} alt="" fill sizes="100vw" className="object-cover opacity-30" />
        <div className="shell relative py-28 md:py-40">
          <Reveal>
            <h2 className="display-lg max-w-[20ch]">
              Let&apos;s find your spot
              <span className="text-spot">.</span>
            </h2>
            <p className="mt-7 max-w-xl text-lg text-white/75">
              Whether you are buying, selling, building or selling as-is for cash — start with a
              conversation and real numbers.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/buy" className="btn-spot">
                Find a home
              </Link>
              <Link href="/contact" className="btn-outline-light">
                Work with us
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120} className="mt-20 max-w-xl">
            <p className="eyebrow-light">Off-market list</p>
            <p className="mt-4 text-sm text-white/70">
              Exclusive inventory and development sites, sent before they reach MLS®.
            </p>
            <div className="mt-6">
              <NewsletterForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
