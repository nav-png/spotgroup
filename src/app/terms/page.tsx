import type { Metadata } from "next";

import { LegalPage } from "@/components/layout/legal-page";
import { disclosure, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms that apply to your use of the SPOT Group website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      updated="July 2026"
      sections={[
        {
          heading: "About this website",
          body: [
            `This website is operated by ${site.name}. ${disclosure.brokerage}`,
            "By using this site you agree to these terms. If you do not agree, please do not use the site.",
          ],
        },
        {
          heading: "Property information",
          body: [
            "Property information on this site is provided for general information only. Listings shown are currently demonstration samples and not a live MLS® feed; once a licensed data feed is connected, listing information will be provided by the applicable real estate board or association.",
            disclosure.mls,
          ],
        },
        {
          heading: "No professional advice",
          body: [
            "Content on this site, including guides, market commentary and valuation ranges, is general information and not legal, tax, accounting, construction or investment advice. Always obtain independent professional advice before acting on it.",
          ],
        },
        {
          heading: "Development and presale information",
          body: [
            "Project names, pricing, unit counts, completion dates and renderings are subject to change and may be demonstration content. No offering can be made except by disclosure statement where required by British Columbia law.",
          ],
        },
        {
          heading: "Your submissions",
          body: [
            "When you submit a form you confirm that the information you provide is accurate and that you are authorized to provide it. Do not submit confidential information about a property you are not entitled to disclose.",
          ],
        },
        {
          heading: "Intellectual property",
          body: [
            `The SPOT Group name, dot mark, written content and design of this site belong to ${site.name}. MLS®, REALTOR® and associated logos are trademarks of The Canadian Real Estate Association.`,
          ],
        },
        {
          heading: "Limitation of liability",
          body: [
            "This site is provided on an as-is basis. To the extent permitted by law, we are not liable for any loss arising from your use of, or reliance on, information on this site.",
          ],
        },
        {
          heading: "Governing law",
          body: [
            "These terms are governed by the laws of British Columbia and the applicable laws of Canada.",
          ],
        },
      ]}
    />
  );
}
