import Link from "next/link";

import { SpotMark } from "@/components/brand/spot-mark";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { communityMenu, disclosure, legalNav, menuGroups, site } from "@/lib/site";

const columns = menuGroups.filter((group) => group.title !== "Communities");

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="shell py-20">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-4 transition hover:text-spot">
              <SpotMark className="h-10 w-10" title={`${site.name} logo`} />
              <span className="font-display text-xl font-extrabold uppercase tracking-[0.2em]">
                Spot Group
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
              Lower Mainland real estate consultants. Resale, development land, new construction and
              firm cash offers on as-is properties.
            </p>
            <div className="mt-8 space-y-2 text-sm">
              <a href={`tel:${site.agent.phoneHref}`} className="block hover:text-spot">
                {site.agent.phone}
              </a>
              <a href={`mailto:${site.agent.email}`} className="block hover:text-spot">
                {site.agent.email}
              </a>
              <p className="text-white/60">
                {site.agent.name} — {site.agent.title}
              </p>
              <p className="text-white/60">{site.agent.brokerage}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {site.social.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-full border border-white/25 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition hover:border-spot hover:text-spot"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {columns.map((group) => (
              <div key={group.title}>
                <p className="eyebrow-light">{group.title}</p>
                <ul className="mt-5 space-y-2.5 text-sm text-white/70">
                  {group.links.map((link) => (
                    <li key={`f-${group.title}-${link.href}-${link.label}`}>
                      <Link href={link.href} className="transition hover:text-spot">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <p className="eyebrow-light">Communities</p>
              <ul className="mt-5 space-y-2.5 text-sm text-white/70">
                {communityMenu.map((link) => (
                  <li key={`f-c-${link.href}`}>
                    <Link href={link.href} className="transition hover:text-spot">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-8 rounded-panel bg-white/[0.05] p-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="font-display text-2xl font-extrabold uppercase leading-tight">
              New listings before they hit MLS<span className="text-spot">®</span>
            </p>
            <p className="mt-2 text-sm text-white/60">
              Exclusive inventory, development sites and market notes. No spam, unsubscribe anytime.
            </p>
          </div>
          <NewsletterForm />
        </div>

        <div className="mt-14 space-y-4 border-t border-white/10 pt-8 text-xs leading-relaxed text-white/45">
          <p>{disclosure.brokerage}</p>
          <p>{disclosure.mls}</p>
          <p>{disclosure.equalHousing}</p>
          <p>
            Listing content on this website is demonstration data. A licensed CREA DDF® or local board
            IDX feed has not been connected yet, so these properties are illustrative only.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2">
            <span>
              © {new Date().getFullYear()} {site.name}. All rights reserved.
            </span>
            {legalNav.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-spot">
                {link.label}
              </Link>
            ))}
            <span aria-label="Equal Housing Opportunity">Equal Housing Opportunity</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
