import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { NewsletterForm } from "@/components/forms/newsletter-form";
import { Reveal } from "@/components/ui/reveal";
import { formatDate } from "@/lib/format";
import { getInsight, insightCategoryLabels, insights } from "@/lib/insights";

export function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const insight = getInsight(params.slug);
  if (!insight) return { title: "Article not found" };

  return {
    title: insight.title,
    description: insight.excerpt,
    alternates: { canonical: `/insights/${insight.slug}` },
    openGraph: {
      type: "article",
      title: insight.title,
      description: insight.excerpt,
      publishedTime: insight.publishedAt,
      images: [{ url: insight.image }],
    },
  };
}

export default function InsightPage({ params }: { params: { slug: string } }) {
  const insight = getInsight(params.slug);
  if (!insight) notFound();

  const more = insights.filter((item) => item.slug !== insight.slug).slice(0, 3);

  return (
    <article className="pb-28 pt-32 lg:pt-44">
      <div className="shell">
        <div className="mx-auto max-w-3xl">
          <Link href={`/insights/category/${insight.category}`} className="link-underline text-xs text-spot">
            {insightCategoryLabels[insight.category]}
          </Link>
          <h1 className="display-lg mt-6">{insight.title}</h1>
          <p className="mt-6 text-xs uppercase tracking-[0.16em] text-ink-400">
            {formatDate(insight.publishedAt)} · {insight.readMinutes} min read
          </p>
        </div>

        <div className="media mt-12 aspect-[16/9] rounded-card">
          <Image
            src={insight.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="mx-auto mt-14 max-w-prose">
          {insight.body.map((paragraph) =>
            paragraph.startsWith("## ") ? (
              <h2 key={paragraph} className="display-sm mt-12 first:mt-0">
                {paragraph.slice(3)}
              </h2>
            ) : (
              <p key={paragraph} className="mt-6 text-base leading-relaxed text-ink-700">
                {paragraph}
              </p>
            ),
          )}
        </div>

        <div className="mx-auto mt-16 max-w-prose rounded-card bg-ink-50 p-8">
          <p className="eyebrow">Stay ahead of it</p>
          <p className="mt-4 text-sm text-ink-700">
            Market notes and off-market inventory, sent occasionally — never a daily blast.
          </p>
          <div className="mt-6">
            <NewsletterForm tone="light" />
          </div>
        </div>
      </div>

      <section className="section">
        <div className="shell">
          <h2 className="display-md">
            Keep reading
            <span className="text-spot">.</span>
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {more.map((item, index) => (
              <Reveal key={item.slug} delay={index * 60}>
                <Link href={`/insights/${item.slug}`} className="group block">
                  <div className="media media-zoom aspect-[3/2] rounded-card">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="display-sm mt-5">{item.title}</h3>
                  <p className="mt-3 text-sm text-ink-500">{item.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
