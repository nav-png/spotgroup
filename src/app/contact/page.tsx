import type { Metadata } from "next";

import { LeadForm } from "@/components/lead-form";
import { PageHero } from "@/components/section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.agent.name} about buying, selling, building or investing in Lower Mainland real estate.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your property"
        description="Buying, selling, building, investing or looking for a cash offer — send a note and you will hear back within one business day."
      />

      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <h2 className="font-display text-2xl font-semibold">{site.agent.name}</h2>
          <p className="mt-1 text-sm text-ink-muted">{site.agent.title}</p>
          <p className="text-sm text-ink-muted">{site.agent.brokerage}</p>

          <dl className="mt-6 space-y-4 text-sm">
            <div>
              <dt className="text-xs uppercase tracking-wide text-ink-muted">Phone</dt>
              <dd>
                <a className="font-medium text-brass" href={`tel:${site.agent.phone.replace(/\D/g, "")}`}>
                  {site.agent.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-ink-muted">Email</dt>
              <dd>
                <a className="font-medium text-brass" href={`mailto:${site.agent.email}`}>
                  {site.agent.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-ink-muted">Areas served</dt>
              <dd className="mt-1 leading-relaxed text-ink-muted">{site.areas.join(", ")}</dd>
            </div>
          </dl>
        </div>

        <LeadForm
          leadType="contact"
          source="contact-page"
          submitLabel="Send message"
          successTitle="Message sent."
          successBody="Thanks for reaching out — you will hear back within one business day."
          fields={[
            { name: "name", label: "Name", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "phone", label: "Phone", type: "tel" },
            {
              name: "topic",
              label: "I want to talk about",
              type: "select",
              required: true,
              options: [
                "Buying a home",
                "Selling my home",
                "A cash offer / as-is sale",
                "Investment property",
                "Land or development",
                "Building a new home",
                "Something else",
              ],
            },
            { name: "message", label: "Message", type: "textarea", required: true },
          ]}
        />
      </div>
    </>
  );
}
