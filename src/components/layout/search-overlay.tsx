"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { CloseButton, Modal } from "@/components/ui/modal";
import { communities } from "@/lib/communities";

const quickLinks = [
  { href: "/buy?propertyType=detached", label: "Detached homes" },
  { href: "/buy?propertyType=attached", label: "Townhomes" },
  { href: "/buy?propertyType=condo", label: "Condos" },
  { href: "/buy?propertyType=land", label: "Land & development" },
  { href: "/buy/open-houses", label: "Open houses" },
  { href: "/exclusive", label: "Off-market" },
];

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [value, setValue] = useState("");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const keyword = value.trim();
    router.push(keyword ? `/buy?keyword=${encodeURIComponent(keyword)}` : "/buy");
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} label="Search properties" variant="top" className="max-w-none">
      <div className="bg-white pb-14 pt-6 text-ink">
        <div className="shell">
          <div className="flex items-center justify-between">
            <p className="eyebrow">Search</p>
            <CloseButton onClose={onClose} label="Close search" />
          </div>

          <form onSubmit={onSubmit} className="mt-8">
            <label htmlFor="site-search" className="sr-only">
              Search by city, community, address or MLS® number
            </label>
            <div className="flex items-end gap-4 border-b-2 border-ink pb-4">
              <input
                id="site-search"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder="City, community, address or MLS® number"
                autoComplete="off"
                className="w-full bg-transparent font-display text-2xl font-bold uppercase tracking-[-0.02em] placeholder:text-ink-200 focus:outline-none sm:text-4xl"
              />
              <button type="submit" className="btn-spot shrink-0">
                Search
              </button>
            </div>
          </form>

          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <div>
              <p className="eyebrow">Communities</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {communities.map((community) => (
                  <Link
                    key={community.slug}
                    href={`/buy?community=${community.slug}`}
                    onClick={onClose}
                    className="chip"
                  >
                    {community.name}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow">Browse by type</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {quickLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={onClose} className="chip">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
