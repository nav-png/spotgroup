"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { SpotMark } from "@/components/brand/spot-mark";
import { MenuOverlay } from "@/components/layout/menu-overlay";
import { SearchOverlay } from "@/components/layout/search-overlay";
import { primaryNav, site } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const solid = scrolled || openDropdown !== null;

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120);
  };

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-spot focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>

      <header
        data-solid={solid}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-editorial ${
          solid ? "bg-white text-ink shadow-[0_1px_0_rgba(0,0,0,0.08)]" : "bg-transparent text-white"
        }`}
      >
        <div className="shell flex h-[84px] items-center justify-between gap-6">
          <Link
            href="/"
            className="flex items-center gap-3 transition hover:text-spot"
            aria-label={`${site.name} home`}
          >
            <SpotMark className="h-7 w-7" title={`${site.name} logo`} />
            <span className="font-display text-base font-extrabold uppercase leading-none tracking-[0.22em]">
              Spot Group
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 xl:flex">
            {primaryNav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              if (!item.children) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-semibold uppercase tracking-[0.12em] transition hover:text-spot ${
                      active ? "text-spot" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }

              const isOpen = openDropdown === item.label;
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => {
                    cancelClose();
                    setOpenDropdown(item.label);
                  }}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                    className={`flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-semibold uppercase tracking-[0.12em] transition hover:text-spot ${
                      active || isOpen ? "text-spot" : ""
                    }`}
                  >
                    {item.label}
                    <svg
                      viewBox="0 0 12 8"
                      className={`h-2 w-2.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    >
                      <path
                        d="M1 1l5 5 5-5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>

                  {isOpen ? (
                    <div
                      className="absolute left-0 top-full w-[320px] animate-fade-up pt-3"
                      onMouseEnter={cancelClose}
                      onMouseLeave={scheduleClose}
                    >
                      <div className="rounded-card border border-ink/10 bg-white p-3 text-ink shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)]">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="group block rounded-2xl px-4 py-3 transition hover:bg-ink-50"
                            onClick={() => setOpenDropdown(null)}
                          >
                            <span className="flex items-center justify-between gap-3">
                              <span className="text-sm font-semibold">{child.label}</span>
                              <span className="text-spot opacity-0 transition group-hover:opacity-100">→</span>
                            </span>
                            {child.description ? (
                              <span className="mt-0.5 block text-xs text-ink-500">{child.description}</span>
                            ) : null}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={`tel:${site.agent.phoneHref}`}
              className="hidden whitespace-nowrap text-[13px] font-semibold tracking-[0.08em] transition hover:text-spot 2xl:inline"
            >
              {site.agent.phone}
            </a>
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search properties"
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition ${
                solid ? "border-ink/15 hover:border-ink" : "border-white/40 hover:border-spot"
              } hover:text-spot`}
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.7" fill="none" />
                <path d="M13 13l4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              className={`inline-flex items-center gap-3 rounded-full px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.18em] transition ${
                solid ? "bg-ink text-white hover:bg-spot hover:text-ink" : "bg-white/10 text-white backdrop-blur hover:bg-spot hover:text-ink"
              }`}
            >
              Menu
              <span className="flex flex-col gap-[3px]" aria-hidden="true">
                <span className="block h-[1.5px] w-4 bg-current" />
                <span className="block h-[1.5px] w-4 bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
