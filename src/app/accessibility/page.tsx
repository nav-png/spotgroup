import type { Metadata } from "next";

import { LegalPage } from "@/components/layout/legal-page";
import { disclosure, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "SPOT Group's commitment to an accessible website and how to report a barrier.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <LegalPage
      title="Accessibility"
      updated="July 2026"
      sections={[
        {
          heading: "Our commitment",
          body: [
            "We want every person looking for a home in the Lower Mainland to be able to use this website. It is built to follow the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA as closely as we can.",
          ],
        },
        {
          heading: "What we have built in",
          body: [
            "Semantic headings and landmarks, keyboard operation for every menu, filter, modal and gallery, focus trapping and Escape-to-close in overlays, visible focus indicators, text alternatives for meaningful images, labelled form fields with error messages announced to screen readers, and support for the reduced-motion setting in your operating system.",
            "Colour is never the only way information is conveyed, and contrast is checked against the black, white and SPOT yellow palette.",
          ],
        },
        {
          heading: "Known limitations",
          body: [
            "The embedded map is provided by OpenStreetMap and its interactive controls are outside our control; property addresses and community information are always available as text alongside it. Third-party content may not meet the same standard.",
          ],
        },
        {
          heading: "Report a barrier",
          body: [
            `If anything on this site prevents you from getting the information you need, tell us and we will provide it another way and fix the issue. Email ${site.agent.email} or call ${site.agent.phone}.`,
          ],
        },
        {
          heading: "Equal opportunity in housing",
          body: [disclosure.equalHousing],
        },
      ]}
    />
  );
}
