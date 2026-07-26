import type { Metadata } from "next";

import { LeadForm } from "@/components/lead-form";
import { PageHero } from "@/components/section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sell As-Is — Get a Cash Offer",
  description:
    "Get a no-obligation cash offer on your Lower Mainland property in as-is condition. No repairs, no showings, no commission, and you pick the completion date.",
};

const steps = [
  {
    title: "1. Tell us about the property",
    body: "Address, condition and your timeline. Two minutes, no obligation and nothing goes public.",
  },
  {
    title: "2. We look at it",
    body: "A quick walkthrough (or photos and a video call). We do not need it cleaned, empty or repaired.",
  },
  {
    title: "3. Written offer in 48 hours",
    body: "A cash offer with the price, deposit and completion date in writing — plus what the property would likely sell for listed on MLS®, so you can compare.",
  },
  {
    title: "4. You choose",
    body: "Take the cash offer, list it with us, or walk away. Completion in as little as two weeks or as long as you need.",
  },
];

const situations = [
  "Estate sale or probate",
  "Tenanted or problem tenants",
  "Fire, water or mould damage",
  "Foreclosure or behind on payments",
  "Half-finished renovation",
  "Hoarder or heavy clean-out",
  "Failed subdivision or permit",
  "Inherited from out of province",
  "Divorce or separation",
];

export default function SellAsIsPage() {
  return (
    <>
      <PageHero
        eyebrow="Sell as-is"
        title="Get a cash offer on your property — any condition"
        description="We buy Lower Mainland property directly and we wholesale to a vetted buyer list. No repairs, no cleaning, no showings, no commission when we buy, and you pick the completion date."
      />

      <div className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <h2 className="font-display text-2xl font-semibold">How it works</h2>
            <ol className="mt-6 space-y-6">
              {steps.map((step) => (
                <li key={step.title} className="border-l-2 border-brass/40 pl-5">
                  <p className="font-semibold">{step.title}</p>
                  <p className="mt-1 text-sm text-ink-muted">{step.body}</p>
                </li>
              ))}
            </ol>

            <h2 className="mt-12 font-display text-2xl font-semibold">Situations we buy in</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {situations.map((situation) => (
                <li key={situation} className="flex gap-2 text-sm text-ink-muted">
                  <span className="text-brass">◆</span>
                  {situation}
                </li>
              ))}
            </ul>

            <div className="mt-12 rounded-2xl bg-sand p-6">
              <p className="font-display text-lg font-semibold">Prefer to talk first?</p>
              <p className="mt-2 text-sm text-ink-muted">
                Call {site.agent.name} directly at{" "}
                <a className="font-medium text-brass" href={`tel:${site.agent.phone.replace(/\D/g, "")}`}>
                  {site.agent.phone}
                </a>{" "}
                or email{" "}
                <a className="font-medium text-brass" href={`mailto:${site.agent.email}`}>
                  {site.agent.email}
                </a>
                .
              </p>
            </div>
          </div>

          <div id="offer-form">
            <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-display text-2xl font-semibold">Request your cash offer</h2>
              <p className="mt-2 text-sm text-ink-muted">
                No obligation. We respond within one business day and provide a written offer within
                48 hours of seeing the property.
              </p>
              <div className="mt-6">
                <LeadForm
                  leadType="cash-offer"
                  compact
                  source="sell-as-is"
                  submitLabel="Get my cash offer"
                  successTitle="Offer request received."
                  successBody="We will call you within one business day to confirm details and book a quick look at the property."
                  fields={[
                    { name: "name", label: "Your name", required: true },
                    { name: "phone", label: "Phone", type: "tel", required: true },
                    { name: "email", label: "Email", type: "email", required: true, full: true },
                    { name: "address", label: "Property address", required: true, full: true },
                    {
                      name: "propertyType",
                      label: "Property type",
                      type: "select",
                      required: true,
                      options: [
                        "Detached house",
                        "Townhouse",
                        "Condo",
                        "Duplex / multifamily",
                        "Land / lot",
                        "Other",
                      ],
                    },
                    {
                      name: "condition",
                      label: "Condition",
                      type: "select",
                      required: true,
                      options: [
                        "Move-in ready",
                        "Dated but liveable",
                        "Needs major repairs",
                        "Uninhabitable / damaged",
                        "Unfinished construction",
                      ],
                    },
                    {
                      name: "occupancy",
                      label: "Occupancy",
                      type: "select",
                      options: ["Owner occupied", "Tenanted", "Vacant"],
                    },
                    {
                      name: "timeline",
                      label: "Ideal timeline",
                      type: "select",
                      options: ["ASAP", "30 days", "60-90 days", "Flexible", "Just exploring"],
                    },
                    {
                      name: "priceExpectation",
                      label: "Price expectation (optional)",
                      placeholder: "e.g. $1,100,000",
                      full: true,
                    },
                    {
                      name: "message",
                      label: "Anything we should know?",
                      type: "textarea",
                      placeholder: "Liens, tenants, permits, damage, deadlines…",
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
