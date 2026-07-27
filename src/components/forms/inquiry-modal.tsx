"use client";

import { useState } from "react";

import { LeadForm, type LeadField } from "@/components/forms/lead-form";
import { CloseButton, Modal } from "@/components/ui/modal";
import type { LeadType } from "@/lib/leads";

/**
 * Button that opens a lead form in a modal — used for showing requests,
 * development registrations and valuation requests.
 */
export function InquiryModal({
  triggerLabel,
  triggerClassName = "btn-spot",
  title,
  intro,
  leadType,
  fields,
  source,
  submitLabel = "Send request",
  successTitle = "Request received.",
  successBody,
}: {
  triggerLabel: string;
  triggerClassName?: string;
  title: string;
  intro?: string;
  leadType: LeadType;
  fields: LeadField[];
  source: string;
  submitLabel?: string;
  successTitle?: string;
  successBody?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={triggerClassName}>
        {triggerLabel}
      </button>

      <Modal open={open} onClose={() => setOpen(false)} label={title} className="max-w-2xl">
        <div className="max-h-[88vh] overflow-y-auto rounded-panel bg-white p-6 sm:p-10">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="eyebrow">Spot Group</p>
              <h2 className="display-sm mt-3">{title}</h2>
              {intro ? <p className="mt-3 max-w-md text-sm text-ink-500">{intro}</p> : null}
            </div>
            <CloseButton onClose={() => setOpen(false)} label="Close form" />
          </div>

          <div className="mt-8">
            <LeadForm
              leadType={leadType}
              fields={fields}
              source={source}
              submitLabel={submitLabel}
              successTitle={successTitle}
              successBody={
                successBody ??
                "We will confirm by phone or email within one business day. Requests are recorded and reviewed by our team — nothing is sent to a third party."
              }
              bare
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
