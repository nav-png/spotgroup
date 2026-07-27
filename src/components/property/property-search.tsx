"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { PropertyGrid } from "@/components/property/property-grid";
import { PropertyMap } from "@/components/property/property-map";
import { CloseButton, Modal } from "@/components/ui/modal";
import { formatPrice } from "@/lib/format";
import { propertyTypeOptions, sortOptions } from "@/lib/listings/query";
import { propertyTypeLabels, type Listing, type ListingsResult } from "@/lib/listings/types";

export interface SearchFilters {
  keyword: string;
  city: string;
  community: string;
  propertyType: string;
  minPrice: string;
  maxPrice: string;
  minBedrooms: string;
  minBathrooms: string;
  openHouse: boolean;
  sort: string;
}

export const emptyFilters: SearchFilters = {
  keyword: "",
  city: "",
  community: "",
  propertyType: "",
  minPrice: "",
  maxPrice: "",
  minBedrooms: "",
  minBathrooms: "",
  openHouse: false,
  sort: "newest",
};

const priceSteps = [500000, 750000, 1000000, 1250000, 1500000, 2000000, 3000000, 5000000];

function toQuery(filters: SearchFilters, extra?: Record<string, string>) {
  const params = new URLSearchParams();
  if (filters.keyword) params.set("keyword", filters.keyword);
  if (filters.city) params.set("city", filters.city);
  if (filters.community) params.set("community", filters.community);
  if (filters.propertyType) params.set("propertyType", filters.propertyType);
  if (filters.minPrice) params.set("minPrice", filters.minPrice);
  if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
  if (filters.minBedrooms) params.set("minBedrooms", filters.minBedrooms);
  if (filters.minBathrooms) params.set("minBathrooms", filters.minBathrooms);
  if (filters.openHouse) params.set("openHouse", "1");
  if (filters.sort && filters.sort !== "newest") params.set("sort", filters.sort);
  for (const [key, value] of Object.entries(extra ?? {})) params.set(key, value);
  return params;
}

export function PropertySearch({
  initialFilters,
  initialListings,
  cities,
  communities,
  /** Locks the result set to a single category, e.g. exclusive inventory. */
  lockedParams,
}: {
  initialFilters: SearchFilters;
  initialListings: Listing[];
  cities: string[];
  communities: { slug: string; name: string }[];
  lockedParams?: Record<string, string>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [listings, setListings] = useState<Listing[]>(initialListings);
  const [total, setTotal] = useState(initialListings.length);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [view, setView] = useState<"list" | "map">("list");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  const query = useMemo(() => toQuery(filters, lockedParams).toString(), [filters, lockedParams]);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setStatus("loading");
      try {
        const response = await fetch(`/api/listings?${query}`, { signal: controller.signal });
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        const data = (await response.json()) as ListingsResult;
        setListings(data.listings);
        setTotal(data.total);
        setStatus("idle");
      } catch {
        if (controller.signal.aborted) return;
        setStatus("error");
      }
    }, 220);

    const params = toQuery(filters).toString();
    router.replace(params ? `${pathname}?${params}` : pathname, { scroll: false });

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const update = useCallback(
    <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) =>
      setFilters((current) => ({ ...current, [key]: value })),
    [],
  );

  const activePills = useMemo(() => {
    const pills: { key: keyof SearchFilters; label: string }[] = [];
    if (filters.keyword) pills.push({ key: "keyword", label: `“${filters.keyword}”` });
    if (filters.city) pills.push({ key: "city", label: filters.city });
    if (filters.community) {
      const name = communities.find((c) => c.slug === filters.community)?.name ?? filters.community;
      pills.push({ key: "community", label: name });
    }
    if (filters.propertyType)
      pills.push({
        key: "propertyType",
        label: propertyTypeLabels[filters.propertyType as keyof typeof propertyTypeLabels],
      });
    if (filters.minPrice) pills.push({ key: "minPrice", label: `${formatPrice(Number(filters.minPrice))}+` });
    if (filters.maxPrice)
      pills.push({ key: "maxPrice", label: `Under ${formatPrice(Number(filters.maxPrice))}` });
    if (filters.minBedrooms) pills.push({ key: "minBedrooms", label: `${filters.minBedrooms}+ bed` });
    if (filters.minBathrooms) pills.push({ key: "minBathrooms", label: `${filters.minBathrooms}+ bath` });
    if (filters.openHouse) pills.push({ key: "openHouse", label: "Open house" });
    return pills;
  }, [filters, communities]);

  const clearPill = (key: keyof SearchFilters) =>
    setFilters((current) => ({ ...current, [key]: key === "openHouse" ? false : "" }));

  const reset = () => setFilters({ ...emptyFilters, sort: filters.sort });

  const fields = (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div className="sm:col-span-2">
        <label className="field-label" htmlFor="search-keyword">
          Location, address or MLS® number
        </label>
        <input
          id="search-keyword"
          value={filters.keyword}
          onChange={(event) => update("keyword", event.target.value)}
          placeholder="Fleetwood, 92 Avenue, R2841190…"
          className="field"
        />
      </div>

      <div>
        <label className="field-label" htmlFor="search-community">
          Community
        </label>
        <select
          id="search-community"
          value={filters.community}
          onChange={(event) => update("community", event.target.value)}
          className="field"
        >
          <option value="">All communities</option>
          {communities.map((community) => (
            <option key={community.slug} value={community.slug}>
              {community.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="field-label" htmlFor="search-city">
          City
        </label>
        <select
          id="search-city"
          value={filters.city}
          onChange={(event) => update("city", event.target.value)}
          className="field"
        >
          <option value="">Any city</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="field-label" htmlFor="search-min-price">
          Min price
        </label>
        <select
          id="search-min-price"
          value={filters.minPrice}
          onChange={(event) => update("minPrice", event.target.value)}
          className="field"
        >
          <option value="">No minimum</option>
          {priceSteps.map((step) => (
            <option key={step} value={step}>
              {formatPrice(step)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="field-label" htmlFor="search-max-price">
          Max price
        </label>
        <select
          id="search-max-price"
          value={filters.maxPrice}
          onChange={(event) => update("maxPrice", event.target.value)}
          className="field"
        >
          <option value="">No maximum</option>
          {priceSteps.map((step) => (
            <option key={step} value={step}>
              {formatPrice(step)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="field-label" htmlFor="search-beds">
          Bedrooms
        </label>
        <select
          id="search-beds"
          value={filters.minBedrooms}
          onChange={(event) => update("minBedrooms", event.target.value)}
          className="field"
        >
          <option value="">Any</option>
          {[1, 2, 3, 4, 5, 6].map((count) => (
            <option key={count} value={count}>
              {count}+
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="field-label" htmlFor="search-baths">
          Bathrooms
        </label>
        <select
          id="search-baths"
          value={filters.minBathrooms}
          onChange={(event) => update("minBathrooms", event.target.value)}
          className="field"
        >
          <option value="">Any</option>
          {[1, 2, 3, 4, 5].map((count) => (
            <option key={count} value={count}>
              {count}+
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="field-label" htmlFor="search-type">
          Property type
        </label>
        <select
          id="search-type"
          value={filters.propertyType}
          onChange={(event) => update("propertyType", event.target.value)}
          className="field"
        >
          <option value="">All types</option>
          {propertyTypeOptions.map((type) => (
            <option key={type} value={type}>
              {propertyTypeLabels[type]}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-end">
        <label className="flex cursor-pointer items-center gap-3 rounded-full border border-ink/15 px-5 py-3.5 text-sm transition hover:border-ink">
          <input
            type="checkbox"
            checked={filters.openHouse}
            onChange={(event) => update("openHouse", event.target.checked)}
            className="h-4 w-4 accent-spot"
          />
          Open houses only
        </label>
      </div>
    </div>
  );

  return (
    <div>
      {/* Desktop filter panel */}
      <div className="hidden rounded-card border border-ink/10 bg-white p-6 lg:block xl:p-8">{fields}</div>

      {/* Mobile controls */}
      <div className="flex items-center gap-3 lg:hidden">
        <button type="button" onClick={() => setDrawerOpen(true)} className="btn-dark flex-1">
          Filters{activePills.length ? ` (${activePills.length})` : ""}
        </button>
        <select
          value={filters.sort}
          onChange={(event) => update("sort", event.target.value)}
          aria-label="Sort results"
          className="field w-auto"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <Modal
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        label="Filter properties"
        variant="sheet"
        className="max-w-2xl"
      >
        <div className="max-h-[85vh] overflow-y-auto rounded-t-panel bg-white p-6 sm:rounded-panel">
          <div className="flex items-center justify-between">
            <p className="display-sm">Filters</p>
            <CloseButton onClose={() => setDrawerOpen(false)} label="Close filters" />
          </div>
          <div className="mt-6">{fields}</div>
          <div className="mt-8 flex gap-3">
            <button type="button" onClick={reset} className="btn-outline flex-1">
              Reset
            </button>
            <button type="button" onClick={() => setDrawerOpen(false)} className="btn-spot flex-1">
              Show {total} {total === 1 ? "home" : "homes"}
            </button>
          </div>
        </div>
      </Modal>

      {/* Result bar */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <p aria-live="polite" className="text-sm font-semibold uppercase tracking-[0.12em]">
            {status === "loading" ? "Searching…" : `${total} ${total === 1 ? "property" : "properties"}`}
          </p>
          {activePills.map((pill) => (
            <button
              key={String(pill.key)}
              type="button"
              onClick={() => clearPill(pill.key)}
              className="chip chip-active"
              aria-label={`Remove filter ${pill.label}`}
            >
              {pill.label}
              <span aria-hidden="true">×</span>
            </button>
          ))}
          {activePills.length > 0 ? (
            <button type="button" onClick={reset} className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500 underline hover:text-ink">
              Reset all
            </button>
          ) : null}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 lg:flex">
            <label className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500" htmlFor="search-sort">
              Sort
            </label>
            <select
              id="search-sort"
              value={filters.sort}
              onChange={(event) => update("sort", event.target.value)}
              className="field w-auto py-2.5"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex rounded-full border border-ink/15 p-1" role="group" aria-label="View mode">
            {(["list", "map"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setView(mode)}
                aria-pressed={view === mode}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                  view === mode ? "bg-ink text-white" : "text-ink-500 hover:text-ink"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mt-10">
        {status === "error" ? (
          <div className="rounded-card border border-ink/10 bg-ink-50 px-6 py-16 text-center">
            <p className="display-sm">Search is temporarily unavailable</p>
            <p className="mx-auto mt-3 max-w-md text-sm text-ink-500">
              We could not load listings just now. Try again, or call us and we will send matches directly.
            </p>
            <button type="button" onClick={() => update("keyword", filters.keyword)} className="btn-dark mt-6">
              Try again
            </button>
          </div>
        ) : view === "map" ? (
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
            <PropertyMap listings={listings} className="aspect-[4/3] lg:sticky lg:top-28 lg:aspect-auto lg:h-[70vh]" />
            <div
              className={`grid gap-10 transition-opacity ${status === "loading" ? "opacity-40" : "opacity-100"}`}
            >
              <PropertyGrid listings={listings} columns={2} />
            </div>
          </div>
        ) : (
          <div className={`transition-opacity ${status === "loading" ? "opacity-40" : "opacity-100"}`}>
            <PropertyGrid
              listings={listings}
              emptyAction={
                <button type="button" onClick={reset} className="btn-dark">
                  Clear filters
                </button>
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
