import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InquiryModal } from "@/components/forms/inquiry-modal";
import { PageHero } from "@/components/layout/page-hero";
import { PropertyGrid } from "@/components/property/property-grid";
import { Reveal } from "@/components/ui/reveal";
import { communities, getCommunity } from "@/lib/communities";
import { formatDate } from "@/lib/format";
import { insightCategoryLabels, insights } from "@/lib/insights";
import { getListingsProvider } from "@/lib/listings/provider";

export function generateStaticParams() {
  return communities.map((community) => ({ slug: community.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const community = getCommunity(params.slug);
  if (!community) return { title: "Community not found" };

  return {
    title: `${community.name} Real Estate`,
    description: `${community.tagline} SPOT Group's guide to buying, selling and building in ${community.name}, British Columbia.`,
    alternates: { canonical: `/communities/${community.slug}` },
    openGraph: { title: `${community.name} Real Estate`, images: [{ url: community.hero }] },
  };
}

export default async function CommunityPage({ params }: { params: { slug: string } }) {
  const community = getCommunity(params.slug);
  if (!community) notFound();

  const { listings } = await getListingsProvider().search({
    community: community.slug,
    sort: "price-desc",
  });

  const related = insights
    .filter((insight) => insight.body.some((paragraph) => paragraph.includes(community.name)))
    .slice(0, 2);
  const articles = related.length > 0 ? related : insights.slice(0, 2);

  return (
    <>
      <PageHero
        eyebrow={community.region}
        title={
          <>
            {community.name}
            <span className="text-spot">.</span>
          </>
        }
        lede={community.tagline}
        image={community.hero}
        imageAlt={`${community.name}, British Columbia`}
        size="tall"
      />

      <section className="section">
        <div className="shell grid gap-16 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <h2 className="display-md">
                The overview
                <span className="text-spot">.</span>
              </h2>
              <div className="mt-8 space-y-6">
                {community.overview.map((paragraph) => (
                  <p key={paragraph} className="max-w-prose text-base leading-relaxed text-ink-700">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal className="mt-14">
              <h3 className="display-sm">Lifestyle</h3>
              <p className="mt-5 max-w-prose text-base leading-relaxed text-ink-700">
                {community.lifestyle}
              </p>
            </Reveal>

            <Reveal className="mt-14">
              <h3 className="display-sm">Schools, parks, shopping &amp; transportation</h3>
              <div className="mt-8 grid gap-10 sm:grid-cols-2">
                {community.categories.map((category) => (
                  <div key={category.title} className="border-t border-ink/15 pt-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-spot">
                      {category.title}
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-ink-700">
                      {category.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <aside className="space-y-10 lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-card bg-ink-50 p-7">
              <p className="eyebrow">Where we transact</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {community.neighbourhoods.map((neighbourhood) => (
                  <li key={neighbourhood} className="chip">
                    {neighbourhood}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-ink-500">
                Community statistics are published only where we can source them. Ask us for current
                sales data on a specific street or building.
              </p>
            </div>

            <div className="panel-dark p-7">
              <h3 className="display-sm">Thinking about {community.name}?</h3>
              <p className="mt-4 text-sm text-white/70">
                Tell us what you are trying to do — buy, sell, or find a site — and we will send the
                relevant numbers.
              </p>
              <div className="mt-7">
                <InquiryModal
                  triggerLabel="Talk to a consultant"
                  triggerClassName="btn-spot w-full"
                  title={`${community.name} — talk to a consultant`}
                  leadType="contact"
                  source={`community:${community.slug}`}
                  fields={[
                    { name: "name", label: "Name", required: true },
                    { name: "email", label: "Email", type: "email", required: true },
                    { name: "phone", label: "Phone", type: "tel" },
                    {
                      name: "intent",
                      label: "What are you looking to do?",
                      type: "select",
                      options: ["Buy", "Sell", "Find a development site", "Invest", "Just researching"],
                    },
                    { name: "message", label: "Details", type: "textarea", full: true },
                  ]}
                />
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-ink-50 section">
        <div className="shell">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="display-md max-w-[20ch]">
              Available in {community.name}
              <span className="text-spot">.</span>
            </h2>
            <Link href={`/buy?community=${community.slug}`} className="link-underline">
              Search {community.name} <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
          <div className="mt-12">
            <PropertyGrid
              listings={listings}
              emptyTitle={`Nothing listed in ${community.name} right now`}
              emptyBody="Inventory changes weekly, and some of what we represent is off-market. Tell us what you want and we will watch for it."
              emptyAction={
                <Link href="/exclusive" className="btn-dark">
                  See off-market inventory
                </Link>
              }
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="display-md">
              Related reading
              <span className="text-spot">.</span>
            </h2>
            <Link href="/insights" className="link-underline">
              All insights <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            {articles.map((insight) => (
              <Reveal key={insight.slug}>
                <Link href={`/insights/${insight.slug}`} className="group block">
                  <div className="media media-zoom aspect-[3/2] rounded-card">
                    <Image
                      src={insight.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-spot">
                    {insightCategoryLabels[insight.category]}
                  </p>
                  <h3 className="display-sm mt-3">{insight.title}</h3>
                  <p className="mt-3 text-sm text-ink-500">{insight.excerpt}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.14em] text-ink-400">
                    {formatDate(insight.publishedAt)}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
