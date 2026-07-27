import Image from "next/image";
import type { Metadata } from "next";

import { LeadForm } from "@/components/forms/lead-form";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { cashOfferSteps, sellingSteps } from "@/lib/brand";
import { communities } from "@/lib/communities";
import { media } from "@/lib/media";

export const metadata: Metadata = {
  title: "Sell With SPOT Group",
  description:
    "Two valuations before you list: what your home is worth prepared and marketed, and what your land is worth to a builder. Plus firm cash offers on as-is properties across the Lower Mainland.",
  alternates: { canonical: "/sell" },
};

const communityOptions = communities.map((community) => community.name);

export default function SellPage() {
  return (
    <>
      <PageHero
        eyebrow="Sell"
        title={
          <>
            Two numbers before you list<span className="text-spot">.</span>
          </>
        }
        lede="What your home is worth prepared and marketed, and what your land is worth to a builder. You see both, with the assumptions behind them."
        image={media.selling}
        size="tall"
      />

      {/* Process */}
      <section className="section">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">How we sell</p>
            <h2 className="display-lg mt-5 max-w-[20ch]">
              Prepared, priced, then marketed
              <span className="text-spot">.</span>
            </h2>
          </Reveal>
          <ol className="mt-16 grid gap-x-12 gap-y-14 md:grid-cols-2">
            {sellingSteps.map((step, index) => (
              <Reveal key={step.title} delay={index * 70}>
                <li className="border-t border-ink/15 pt-8">
                  <p className="font-display text-5xl font-extrabold text-spot">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="display-sm mt-6">{step.title}</h3>
                  <p className="mt-4 max-w-prose text-base leading-relaxed text-ink-500">{step.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Valuation */}
      <section id="valuation" className="scroll-offset bg-ink-50 section">
        <div className="shell grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">Home valuation</p>
            <h2 className="display-md mt-5">
              Request both numbers
              <span className="text-spot">.</span>
            </h2>
            <p className="lede mt-6">
              We prepare a written valuation covering the conventional sale and, where the lot
              supports it, the builder or development scenario.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-ink-700">
              {[
                "Comparable sales with the adjustments shown",
                "What is worth repairing before listing, priced as a builder",
                "Land value under current zoning and plan-area policy",
                "A recommended strategy and timeline",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-spot" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="media mt-12 aspect-[3/2] rounded-card">
              <Image
                src={media.sellingAlt}
                alt="Keys handed over after a completed sale"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="panel border border-ink/10 p-7 sm:p-10">
              <h3 className="display-sm">Request a home valuation</h3>
              <p className="mt-3 text-sm text-ink-500">
                No obligation, no listing presentation unless you ask for one.
              </p>
              <div className="mt-8">
                <LeadForm
                  leadType="valuation"
                  bare
                  source="sell-valuation"
                  submitLabel="Request valuation"
                  successTitle="Valuation request received."
                  successBody="We will confirm the details and follow up within one business day."
                  fields={[
                    { name: "name", label: "Name", required: true },
                    { name: "email", label: "Email", type: "email", required: true },
                    { name: "phone", label: "Phone", type: "tel" },
                    { name: "address", label: "Property address", required: true, full: true },
                    { name: "city", label: "City", type: "select", options: communityOptions },
                    {
                      name: "propertyType",
                      label: "Property type",
                      type: "select",
                      options: [
                        "Detached home",
                        "Townhouse / attached",
                        "Condo / apartment",
                        "Land / development site",
                        "Small multifamily",
                      ],
                    },
                    {
                      name: "timeline",
                      label: "Timeline",
                      type: "select",
                      options: ["As soon as possible", "1–3 months", "3–6 months", "Just researching"],
                    },
                    {
                      name: "message",
                      label: "Anything we should know about the property?",
                      type: "textarea",
                      full: true,
                    },
                  ]}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Cash offer */}
      <section id="cash-offer" className="scroll-offset relative isolate overflow-hidden bg-ink text-white section">
        <Image src={media.keys} alt="" fill sizes="100vw" className="object-cover opacity-20" />
        <div className="shell relative">
          <Reveal>
            <p className="eyebrow-light">Sell as-is</p>
            <h2 className="display-lg mt-5 max-w-[22ch]">
              A firm cash offer, no repairs
              <span className="text-spot">.</span>
            </h2>
            <p className="mt-7 max-w-2xl text-lg text-white/75">
              Estate sales, tenanted properties, homes needing structural work, or a completion date
              you cannot move — we buy as-is, and we show you what a conventional sale would net so
              you can compare honestly.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
            <Reveal>
              <ol className="space-y-10">
                {cashOfferSteps.map((step, index) => (
                  <li key={step.title} className="border-t border-white/15 pt-6">
                    <p className="font-display text-4xl font-extrabold text-spot">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="display-sm mt-5">{step.title}</h3>
                    <p className="mt-3 max-w-prose text-sm leading-relaxed text-white/70">{step.body}</p>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={80}>
              <div className="rounded-panel bg-white/[0.07] p-7 sm:p-10">
                <h3 className="display-sm">Get a cash offer</h3>
                <p className="mt-3 text-sm text-white/70">
                  Tell us about the property. One walkthrough, then a written number.
                </p>
                <div className="mt-8">
                  <LeadForm
                    leadType="cash-offer"
                    tone="dark"
                    bare
                    source="sell-cash-offer"
                    submitLabel="Request cash offer"
                    successTitle="Request received."
                    successBody="We will contact you to arrange one walkthrough and then send a written offer."
                    fields={[
                      { name: "name", label: "Name", required: true },
                      { name: "email", label: "Email", type: "email", required: true },
                      { name: "phone", label: "Phone", type: "tel" },
                      { name: "address", label: "Property address", required: true, full: true },
                      {
                        name: "condition",
                        label: "Condition",
                        type: "select",
                        options: [
                          "Move-in ready",
                          "Dated but livable",
                          "Needs significant repairs",
                          "Major structural / fire / water damage",
                        ],
                      },
                      {
                        name: "occupancy",
                        label: "Occupancy",
                        type: "select",
                        options: ["Owner occupied", "Tenanted", "Vacant", "Estate / probate"],
                      },
                      {
                        name: "timeline",
                        label: "Preferred completion",
                        type: "select",
                        options: ["Within 30 days", "30–60 days", "60–90 days", "Flexible"],
                      },
                      { name: "message", label: "Anything else?", type: "textarea", full: true },
                    ]}
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
