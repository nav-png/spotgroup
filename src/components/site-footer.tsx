import Link from "next/link";

import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-ink text-white/80">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-2xl text-white">{site.name}</p>
          <p className="mt-3 max-w-sm text-sm">
            {site.agent.name} — {site.agent.title}. {site.agent.yearsExperience} years helping
            families, investors, builders and developers across the Lower Mainland.
          </p>
          <div className="mt-5 space-y-1 text-sm">
            <a className="block hover:text-brass" href={`tel:${site.agent.phone.replace(/\D/g, "")}`}>
              {site.agent.phone}
            </a>
            <a className="block hover:text-brass" href={`mailto:${site.agent.email}`}>
              {site.agent.email}
            </a>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-brass">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/sell-as-is" className="hover:text-brass">
                Sell As-Is / Cash Offer
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Areas served</p>
          <p className="mt-4 text-sm leading-relaxed">{site.areas.join(" · ")}</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="max-w-2xl">
            Listing content shown is demonstration data until the licensed MLS® feed is connected.
            MLS®, REALTOR® and associated marks are owned by the Canadian Real Estate Association.
          </p>
        </div>
      </div>
    </footer>
  );
}
