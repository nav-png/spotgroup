import type { Metadata } from "next";

import { LeadForm } from "@/components/lead-form";
import { ListingGrid } from "@/components/listing-grid";
import { PageHero, SectionHeading } from "@/components/section";
import { getListingsProvider } from "@/lib/listings/provider";

export const metadata: Metadata = {
  title: "Exclusive & Off-Market Listings",
  description:
    "Off-market Lower Mainland properties: assemblies, tenanted rental buildings, estate sales, as-is fixers and builder inventory released privately.",
};

const reasons = [
  {
    title: "Sellers who want privacy",
    body: "Estate sales, tenanted buildings and owners who do not want a sign on the lawn or 30 showings.",
  },
  {
    title: "Deals that need the right buyer",
    body: "Assemblies, permit-ready lots and as-is fixers where the value is obvious to a builder and confusing to everyone else.",
  },
  {
    title: "Our own inventory",
    body: "Properties we have bought, are building or are wholesaling — released to our buyer list first.",
  },
];

export default async function ExclusivePage() {
  const result = await getListingsProvider().search({ category: "exclusive" });

  return (
    <>
      <PageHero
        eyebrow="Not on MLS®"
        title="Exclusive & off-market listings"
        description="A private inventory of Lower Mainland properties we represent outside of the MLS® system — plus early access to everything before it goes public."
      />

      <div className="container-page py-16">
        <ListingGrid
          listings={result.listings}
          empty="No exclusive listings are public right now — join the list below and we will send them first."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {reasons.map((reason) => (
            <div key={reason.title} className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm">
              <p className="font-display text-lg font-semibold">{reason.title}</p>
              <p className="mt-2 text-sm text-ink-muted">{reason.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-10 rounded-2xl bg-sand p-6 sm:p-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Buyer list"
              title="Get off-market deals before they are public"
              description="Tell us what you are looking for and we will send matching properties — including the ones that never reach MLS®."
            />
            <ul className="space-y-2 text-sm text-ink-muted">
              <li>• Assemblies and development sites</li>
              <li>• Rental buildings and small multifamily</li>
              <li>• As-is fixers, estate sales and wholesale contracts</li>
              <li>• Presale and builder inventory</li>
            </ul>
          </div>

          <LeadForm
            leadType="exclusive-access"
            source="exclusive-page"
            submitLabel="Join the buyer list"
            successTitle="You're on the list."
            successBody="We will email you when something matching your criteria comes up."
            fields={[
              { name: "name", label: "Name", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "phone", label: "Phone", type: "tel" },
              {
                name: "buyerType",
                label: "I am a",
                type: "select",
                required: true,
                options: ["Investor", "Builder", "Developer", "Owner-occupier", "Wholesaler"],
              },
              {
                name: "criteria",
                label: "What are you looking for?",
                type: "textarea",
                placeholder: "Budget, areas, property type, timeline, financing.",
              },
            ]}
          />
        </div>
      </div>
    </>
  );
}
