import type { Metadata } from "next";

import { LeadForm } from "@/components/forms/lead-form";
import { PageHero } from "@/components/layout/page-hero";
import { PropertyGrid } from "@/components/property/property-grid";
import { getListingsProvider } from "@/lib/listings/provider";
import { media } from "@/lib/media";

export const metadata: Metadata = {
  title: "Exclusive & Off-Market",
  description:
    "Exclusive and off-market Lower Mainland inventory represented by SPOT Group — development sites, as-is homes and pre-MLS® listings.",
  alternates: { canonical: "/exclusive" },
};

export default async function ExclusivePage() {
  const { listings } = await getListingsProvider().search({
    category: "exclusive",
    sort: "price-desc",
  });

  return (
    <>
      <PageHero
        eyebrow="Exclusive & off-market"
        title={
          <>
            Before it hits MLS<span className="text-spot">®</span>
          </>
        }
        lede="Some sellers do not want signs, photos or foot traffic. We place those properties quietly with buyers who can perform."
        image={media.arches}
      />

      <section className="section">
        <div className="shell grid gap-16 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          <div>
            <h2 className="display-md">
              Current exclusive inventory
              <span className="text-spot">.</span>
            </h2>
            <p className="mt-5 max-w-prose text-base leading-relaxed text-ink-500">
              Limited detail is published deliberately. Register below and we will send the full
              package — address, condition, rent roll or zoning analysis where it applies.
            </p>
            <div className="mt-12">
              <PropertyGrid
                listings={listings}
                columns={2}
                emptyTitle="Nothing published right now"
                emptyBody="Off-market inventory moves fast and is often placed before it is published. Register and we will contact you directly."
              />
            </div>
          </div>

          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="panel-dark p-8">
              <p className="eyebrow-light">Off-market list</p>
              <h3 className="display-sm mt-4">Get the private list</h3>
              <p className="mt-4 text-sm text-white/70">
                Tell us what you buy and we will only send what fits.
              </p>
              <div className="mt-8">
                <LeadForm
                  leadType="exclusive-access"
                  tone="dark"
                  bare
                  source="exclusive-page"
                  submitLabel="Request access"
                  successTitle="You are on the list."
                  successBody="We will reach out as soon as something matches your criteria."
                  fields={[
                    { name: "name", label: "Name", required: true },
                    { name: "email", label: "Email", type: "email", required: true },
                    { name: "phone", label: "Phone", type: "tel" },
                    {
                      name: "buyerType",
                      label: "What describes you",
                      type: "select",
                      options: [
                        "Investor",
                        "Builder / developer",
                        "Owner-occupier",
                        "Wholesaler",
                        "Other",
                      ],
                    },
                    {
                      name: "criteria",
                      label: "What are you looking for?",
                      type: "textarea",
                      placeholder: "Duplex lots in Surrey under $1.6M, holding property with a suite…",
                    },
                  ]}
                />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
