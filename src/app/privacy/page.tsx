import type { Metadata } from "next";

import { LegalPage } from "@/components/layout/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How SPOT Group collects, uses and protects the personal information you provide.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      updated="July 2026"
      sections={[
        {
          heading: "What we collect",
          body: [
            "When you submit a form on this site — a showing request, home valuation, cash offer request, development registration, newsletter signup or general enquiry — we collect the information you enter: typically your name, email address, phone number, the property or area you are interested in, and any details you choose to share.",
            "We also collect standard technical information such as pages viewed and approximate location derived from your IP address, which helps us understand which properties and guides are useful.",
          ],
        },
        {
          heading: "How we use it",
          body: [
            "We use your information to respond to your enquiry, provide the real estate services you asked about, and send you information you requested such as listing alerts or market notes. We do not sell your personal information.",
            "If you ask for a valuation or cash offer, we may use property information from public records and MLS® data to prepare it.",
          ],
        },
        {
          heading: "Who we share it with",
          body: [
            `Where a transaction requires it, information may be shared with our brokerage (${site.agent.brokerage}), the other party's representative, lawyers or notaries, lenders and appraisers you engage, and service providers who host this website or manage our email.`,
            "We may disclose information where required by law or by real estate regulatory obligations in British Columbia.",
          ],
        },
        {
          heading: "Cookies",
          body: [
            "This site uses essential cookies so pages function correctly, and may use measurement cookies to understand traffic. You can decline the optional cookies using the banner shown on your first visit, and you can clear cookies at any time in your browser.",
          ],
        },
        {
          heading: "Your choices",
          body: [
            "You can unsubscribe from any email we send using the link in that email, or by replying and asking to be removed. You can request access to, correction of, or deletion of your personal information by contacting us.",
            `Contact: ${site.agent.email} or ${site.agent.phone}.`,
          ],
        },
        {
          heading: "Retention",
          body: [
            "We keep enquiry information for as long as needed to provide services and to meet the record-keeping requirements that apply to real estate professionals in British Columbia.",
          ],
        },
      ]}
    />
  );
}
