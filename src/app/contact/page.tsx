import type { Metadata } from "next";

import { LeadForm } from "@/components/forms/lead-form";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { media } from "@/lib/media";
import { disclosure, site } from "@/lib/site";
import { team } from "@/lib/team";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to SPOT Group about buying, selling, building or a cash offer on an as-is property in the Lower Mainland.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Start with a conversation<span className="text-spot">.</span>
          </>
        }
        lede="Tell us what you are trying to do. You will get a straight answer and real numbers — not a drip campaign."
        image={media.cityNight}
      />

      <section className="section">
        <div className="shell grid gap-16 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <Reveal>
            <h2 className="display-md">
              Direct lines
              <span className="text-spot">.</span>
            </h2>
            <ul className="mt-10 space-y-10">
              {team.map((member) => (
                <li key={member.slug} className="border-t border-ink/15 pt-6">
                  <p className="font-display text-2xl font-bold uppercase">{member.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-ink-500">{member.role}</p>
                  <div className="mt-4 space-y-1 text-sm">
                    {member.phone ? (
                      <a
                        href={`tel:${member.phone.replace(/[^\d+]/g, "")}`}
                        className="block hover:text-spot"
                      >
                        {member.phone}
                      </a>
                    ) : null}
                    {member.email ? (
                      <a href={`mailto:${member.email}`} className="block hover:text-spot">
                        {member.email}
                      </a>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-14 border-t border-ink/15 pt-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-500">
                Brokerage
              </p>
              <p className="mt-3 text-sm text-ink-700">{disclosure.brokerage}</p>
              <p className="mt-4 text-sm text-ink-500">
                We serve {site.areas.slice(0, -1).join(", ")} and {site.areas.at(-1)}.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="panel border border-ink/10 p-7 sm:p-10">
              <h2 className="display-sm">Send a message</h2>
              <p className="mt-3 text-sm text-ink-500">
                We reply to every enquiry, usually within one business day.
              </p>
              <div className="mt-8">
                <LeadForm
                  leadType="contact"
                  bare
                  source="contact-page"
                  submitLabel="Send message"
                  fields={[
                    { name: "name", label: "Name", required: true },
                    { name: "email", label: "Email", type: "email", required: true },
                    { name: "phone", label: "Phone", type: "tel" },
                    {
                      name: "intent",
                      label: "What can we help with?",
                      type: "select",
                      options: [
                        "Buying a home",
                        "Selling a home",
                        "Home valuation",
                        "Cash offer / sell as-is",
                        "Development land",
                        "New construction / presale",
                        "Investment property",
                        "Something else",
                      ],
                    },
                    {
                      name: "area",
                      label: "Community",
                      type: "select",
                      options: [...site.areas],
                    },
                    { name: "message", label: "Details", type: "textarea", required: true, full: true },
                  ]}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
