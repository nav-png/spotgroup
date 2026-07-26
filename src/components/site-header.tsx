"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cashOfferCta, site } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-white/95 backdrop-blur">
      <div className="container-page flex h-[72px] items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink font-display text-lg font-semibold text-white">
            S
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold">{site.shortName}</span>
            <span className="block text-[11px] uppercase tracking-[0.16em] text-ink-muted">
              {site.agent.name} · PREC
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {site.nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition hover:text-brass ${
                  active ? "text-brass" : "text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={`tel:${site.agent.phone.replace(/\D/g, "")}`} className="text-sm font-medium">
            {site.agent.phone}
          </a>
          <Link href={cashOfferCta.href} className="btn-primary">
            {cashOfferCta.label}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Toggle navigation"
          className="rounded-lg border border-ink/15 px-3 py-2 text-sm font-medium lg:hidden"
        >
          Menu
        </button>
      </div>

      {open ? (
        <div className="border-t border-ink/10 bg-white lg:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {site.nav.map((item) => (
              <Link key={item.href} href={item.href} className="py-2 text-sm font-medium">
                {item.label}
              </Link>
            ))}
            <Link href={cashOfferCta.href} className="btn-primary mt-3">
              {cashOfferCta.label}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
