"use client";

import { InquiryModal } from "@/components/forms/inquiry-modal";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";
import type { Listing } from "@/lib/listings/types";

/** Fixed bottom bar on small screens so the inquiry action is always reachable. */
export function StickyInquiry({ listing }: { listing: Listing }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-lg font-extrabold">{formatPrice(listing.price)}</p>
          <p className="truncate text-xs text-ink-500">{listing.address}</p>
        </div>
        <a
          href={`tel:${site.agent.phoneHref}`}
          className="btn-outline px-5 py-3 text-xs"
          aria-label={`Call ${site.agent.name}`}
        >
          Call
        </a>
        <InquiryModal
          triggerLabel="Book showing"
          triggerClassName="btn-spot px-5 py-3 text-xs"
          title={`Book a showing — ${listing.address}`}
          intro={`${listing.city}${listing.neighbourhood ? `, ${listing.neighbourhood}` : ""} · ${formatPrice(listing.price)}`}
          leadType="listing-inquiry"
          source={`listing:${listing.slug}`}
          fields={[
            { name: "name", label: "Name", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "phone", label: "Phone", type: "tel" },
            {
              name: "preferredTime",
              label: "Preferred day and time",
              placeholder: "Saturday afternoon",
            },
            { name: "message", label: "Anything we should know?", type: "textarea" },
          ]}
        />
      </div>
    </div>
  );
}
