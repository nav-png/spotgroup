"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { PropertyCard } from "@/components/property/property-card";
import type { Listing } from "@/lib/listings/types";

export function PropertyCarousel({ listings }: { listings: Listing[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const node = trackRef.current;
    if (!node) return;
    setAtStart(node.scrollLeft < 8);
    setAtEnd(node.scrollLeft + node.clientWidth >= node.scrollWidth - 8);
  }, []);

  useEffect(() => {
    sync();
    const node = trackRef.current;
    if (!node) return;
    node.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      node.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const scrollBy = (direction: 1 | -1) => {
    const node = trackRef.current;
    if (!node) return;
    const card = node.querySelector("li");
    const amount = card ? card.clientWidth + 32 : node.clientWidth * 0.8;
    node.scrollBy({ left: amount * direction, behavior: "smooth" });
  };

  return (
    <div>
      <ul
        ref={trackRef}
        className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-8 overflow-x-auto px-6 pb-2 md:-mx-10 md:px-10 xl:-mx-16 xl:px-16"
      >
        {listings.map((listing, index) => (
          <li
            key={listing.id}
            className="w-[85vw] min-w-[85vw] snap-start sm:w-[52vw] sm:min-w-[52vw] lg:w-[36vw] lg:min-w-[36vw] xl:w-[30vw] xl:min-w-[30vw]"
          >
            <PropertyCard listing={listing} size="large" priority={index === 0} />
          </li>
        ))}
      </ul>

      <div className="mt-10 flex items-center gap-3">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          disabled={atStart}
          aria-label="Previous properties"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 transition hover:border-ink hover:bg-ink hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          disabled={atEnd}
          aria-label="Next properties"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 transition hover:border-ink hover:bg-ink hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
