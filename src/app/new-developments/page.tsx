import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { developmentStatusLabels, developments } from "@/lib/developments";
import { formatPrice } from "@/lib/format";
import { media } from "@/lib/media";

export const metadata: Metadata = {
  title: "New Developments",
  description:
    "New construction and presale projects represented by SPOT Group across the Lower Mainland — townhomes, detached homes, duplex lots and small multifamily.",
  alternates: { canonical: "/new-developments" },
};

export default function NewDevelopmentsPage() {
  return (
    <>
      <PageHero
        eyebrow="New developments"
        title={
          <>
            We sell what we build<span className="text-spot">.</span>
          </>
        }
        lede="Boutique new construction and presale projects — some built by our own team, some represented for builders who want people who understand construction selling their homes."
        image={media.developmentsAlt}
        size="tall"
      />

      <section className="section">
        <div className="shell space-y-20">
          {developments.map((development, index) => (
            <Reveal key={development.slug}>
              <article
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                  index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Link href={`/new-developments/${development.slug}`} className="group block">
                  <div className="media media-zoom aspect-[4/3] rounded-card">
                    <Image
                      src={development.hero}
                      alt={development.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <span className="absolute left-4 top-4 tag-spot">
                      {developmentStatusLabels[development.status]}
                    </span>
                  </div>
                </Link>

                <div>
                  <p className="eyebrow">
                    {development.neighbourhood}, {development.city}
                  </p>
                  <h2 className="display-md mt-4">{development.name}</h2>
                  <p className="mt-5 max-w-prose text-base leading-relaxed text-ink-500">
                    {development.summary}
                  </p>
                  <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-ink/15 pt-6 text-sm">
                    <div>
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-500">
                        Homes
                      </dt>
                      <dd className="mt-1">{development.homeTypes}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-500">
                        Completion
                      </dt>
                      <dd className="mt-1">{development.completion ?? "To be announced"}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-500">
                        From
                      </dt>
                      <dd className="mt-1">
                        {development.priceFrom
                          ? formatPrice(development.priceFrom)
                          : "Register for pricing"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-500">
                        Developer
                      </dt>
                      <dd className="mt-1">{development.developer}</dd>
                    </div>
                  </dl>
                  <Link
                    href={`/new-developments/${development.slug}`}
                    className="btn-dark mt-9"
                  >
                    View {development.name}
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink-50 py-16">
        <div className="shell text-center">
          <p className="mx-auto max-w-2xl text-sm text-ink-500">
            Project details, pricing and completion dates shown here are demonstration content until
            each builder&apos;s approved marketing material is published. Register on a project page
            and we will send the current price list and disclosure statement.
          </p>
        </div>
      </section>
    </>
  );
}
