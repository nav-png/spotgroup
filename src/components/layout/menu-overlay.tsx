"use client";

import Link from "next/link";
import { useState } from "react";

import { SpotMark } from "@/components/brand/spot-mark";
import { CloseButton, Modal } from "@/components/ui/modal";
import { menuGroups, site } from "@/lib/site";

export function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <Modal open={open} onClose={onClose} label="Site menu" variant="full" className="h-full">
      <div className="flex h-full flex-col overflow-y-auto bg-ink text-white">
        <div className="shell flex h-[84px] shrink-0 items-center justify-between">
          <Link href="/" onClick={onClose} className="flex items-center gap-3 hover:text-spot">
            <SpotMark className="h-7 w-7" title={`${site.name} logo`} />
            <span className="font-display text-base font-extrabold uppercase tracking-[0.22em]">
              Spot Group
            </span>
          </Link>
          <CloseButton onClose={onClose} tone="light" label="Close menu" />
        </div>

        <div className="shell flex-1 pb-16 pt-6 lg:pt-14">
          {/* Desktop: grouped columns */}
          <div className="hidden grid-cols-2 gap-x-10 gap-y-14 lg:grid lg:grid-cols-5">
            {menuGroups.map((group) => (
              <div key={group.title}>
                <p className="eyebrow-light">{group.title}</p>
                <ul className="mt-6 space-y-3">
                  {group.links.map((link) => (
                    <li key={`${group.title}-${link.href}-${link.label}`}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="group inline-flex items-baseline gap-2 font-display text-lg font-bold uppercase tracking-[-0.01em] text-white/85 transition hover:text-spot"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Mobile: accordions */}
          <div className="divide-y divide-white/10 lg:hidden">
            {menuGroups.map((group) => {
              const isOpen = expanded === group.title;
              return (
                <div key={group.title} className="py-2">
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : group.title)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between py-4 text-left"
                  >
                    <span className="font-display text-2xl font-extrabold uppercase tracking-[-0.01em]">
                      {group.title}
                    </span>
                    <span
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/30 transition ${
                        isOpen ? "rotate-45 border-spot text-spot" : ""
                      }`}
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5">
                        <path
                          d="M8 1v14M1 8h14"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </button>
                  {isOpen ? (
                    <ul className="animate-fade-up pb-5 pl-1 space-y-3">
                      {group.links.map((link) => (
                        <li key={`m-${group.title}-${link.href}-${link.label}`}>
                          <Link
                            href={link.href}
                            onClick={onClose}
                            className="block text-base text-white/80 transition hover:text-spot"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="mt-14 grid gap-6 rounded-panel bg-white/[0.06] p-8 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <p className="eyebrow-light">Talk to us</p>
              <p className="mt-4 font-display text-3xl font-extrabold uppercase leading-[0.95] sm:text-4xl">
                Know the spot
                <span className="text-spot">.</span> Let&apos;s find yours.
              </p>
              <p className="mt-3 max-w-md text-sm text-white/70">
                {site.agent.name} — {site.agent.title}. {site.agent.brokerage}.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/contact" onClick={onClose} className="btn-spot w-full">
                Contact SPOT Group
              </Link>
              <a href={`tel:${site.agent.phoneHref}`} className="btn-outline-light w-full">
                {site.agent.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
