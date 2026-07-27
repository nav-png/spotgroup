import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { formatDate } from "@/lib/format";
import {
  insightCategoryLabels,
  insightsByCategory,
  type InsightCategory,
} from "@/lib/insights";
import { media } from "@/lib/media";

const categories = Object.keys(insightCategoryLabels) as InsightCategory[];

function toCategory(value: string): InsightCategory | undefined {
  return categories.find((category) => category === value);
}

export function generateStaticParams() {
  return categories.map((category) => ({ category }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const category = toCategory(params.category);
  if (!category) return { title: "Category not found" };

  return {
    title: insightCategoryLabels[category],
    description: `SPOT Group ${insightCategoryLabels[category].toLowerCase()} for the Lower Mainland.`,
    alternates: { canonical: `/insights/category/${category}` },
  };
}

export default function InsightCategoryPage({ params }: { params: { category: string } }) {
  const category = toCategory(params.category);
  if (!category) notFound();

  const articles = insightsByCategory(category);

  return (
    <>
      <PageHero
        eyebrow="Insights & guides"
        title={
          <>
            {insightCategoryLabels[category]}
            <span className="text-spot">.</span>
          </>
        }
        image={media.cityLights}
      />

      <section className="section">
        <div className="shell">
          <div className="flex flex-wrap gap-3">
            <Link href="/insights" className="chip">
              All
            </Link>
            {categories.map((item) => (
              <Link
                key={item}
                href={`/insights/category/${item}`}
                className={`chip ${item === category ? "chip-active" : ""}`}
              >
                {insightCategoryLabels[item]}
              </Link>
            ))}
          </div>

          {articles.length === 0 ? (
            <p className="mt-16 text-base text-ink-500">
              Nothing published in this category yet — check back soon.
            </p>
          ) : (
            <div className="mt-14 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((insight, index) => (
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
                    <h2 className="display-sm mt-5">{insight.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-ink-500">{insight.excerpt}</p>
                    <p className="mt-4 text-xs uppercase tracking-[0.14em] text-ink-400">
                      {formatDate(insight.publishedAt)} · {insight.readMinutes} min read
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
