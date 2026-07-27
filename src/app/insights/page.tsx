import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { formatDate } from "@/lib/format";
import { insightCategoryLabels, insights } from "@/lib/insights";
import { media } from "@/lib/media";

export const metadata: Metadata = {
  title: "Insights & Guides",
  description:
    "SPOT Group market notes, buyer guides, seller guides and community stories for the Lower Mainland — written by consultants who also build and invest.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  const [lead, ...rest] = insights;

  return (
    <>
      <PageHero
        eyebrow="Insights & guides"
        title={
          <>
            Straight answers, written down<span className="text-spot">.</span>
          </>
        }
        lede="The questions we get asked most, answered properly — plus qualitative market notes. We do not publish statistics we cannot verify."
        image={media.towersUp}
      />

      <section className="section">
        <div className="shell">
          <Reveal>
            <Link href={`/insights/${lead.slug}`} className="group grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="media media-zoom aspect-[3/2] rounded-card">
                <Image
                  src={lead.image}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-spot">
                  {insightCategoryLabels[lead.category]}
                </p>
                <h2 className="display-md mt-5">{lead.title}</h2>
                <p className="mt-5 max-w-prose text-base leading-relaxed text-ink-500">{lead.excerpt}</p>
                <p className="mt-6 text-xs uppercase tracking-[0.14em] text-ink-400">
                  {formatDate(lead.publishedAt)} · {lead.readMinutes} min read
                </p>
              </div>
            </Link>
          </Reveal>

          <div className="mt-10 flex flex-wrap gap-3">
            {Object.entries(insightCategoryLabels).map(([slug, label]) => (
              <Link key={slug} href={`/insights/category/${slug}`} className="chip">
                {label}
              </Link>
            ))}
          </div>

          <div className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((insight, index) => (
              <Reveal key={insight.slug} delay={(index % 3) * 60}>
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
                  <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-spot">
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
    </>
  );
}
