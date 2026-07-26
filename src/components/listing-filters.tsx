"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { propertyTypeLabels, type PropertyType } from "@/lib/listings/types";

const priceSteps = [500000, 750000, 1000000, 1250000, 1500000, 2000000, 3000000, 5000000];

const propertyTypes = Object.keys(propertyTypeLabels) as PropertyType[];

const statusOptions = [
  { value: "", label: "Any status" },
  { value: "new", label: "New listings" },
  { value: "active", label: "Active" },
  { value: "coming-soon", label: "Coming soon" },
  { value: "sold", label: "Sold" },
];

function priceLabel(value: number) {
  return `$${(value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 2)}M`;
}

export function ListingFilters({ cities, basePath }: { cities: string[]; basePath: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const values = useMemo(() => {
    const get = (key: string) => searchParams.get(key) ?? "";
    return {
      keyword: get("keyword"),
      city: get("city"),
      propertyType: get("propertyType"),
      status: get("status"),
      minPrice: get("minPrice"),
      maxPrice: get("maxPrice"),
      minBedrooms: get("minBedrooms"),
      minBathrooms: get("minBathrooms"),
      sort: get("sort") || "newest",
    };
  }, [searchParams]);

  const activeCount = Object.entries(values).filter(
    ([key, value]) => value && key !== "sort",
  ).length;

  function apply(next: Partial<Record<string, string>>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(next)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    const query = params.toString();
    router.push(query ? `${basePath}?${query}` : basePath, { scroll: false });
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    apply({ keyword: String(data.get("keyword") ?? "") });
  }

  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-sm">
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          name="keyword"
          defaultValue={values.keyword}
          key={values.keyword}
          className="field"
          placeholder="Search by city, neighbourhood, address or MLS® number"
          aria-label="Keyword search"
        />
        <button type="submit" className="btn-dark shrink-0">
          Search
        </button>
      </form>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="field-label" htmlFor="filter-city">
            City
          </label>
          <select
            id="filter-city"
            className="field"
            value={values.city}
            onChange={(event) => apply({ city: event.target.value })}
          >
            <option value="">All cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="field-label" htmlFor="filter-type">
            Property type
          </label>
          <select
            id="filter-type"
            className="field"
            value={values.propertyType}
            onChange={(event) => apply({ propertyType: event.target.value })}
          >
            <option value="">All types</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {propertyTypeLabels[type]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="field-label" htmlFor="filter-min-price">
            Min price
          </label>
          <select
            id="filter-min-price"
            className="field"
            value={values.minPrice}
            onChange={(event) => apply({ minPrice: event.target.value })}
          >
            <option value="">No minimum</option>
            {priceSteps.map((step) => (
              <option key={step} value={step}>
                {priceLabel(step)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="field-label" htmlFor="filter-max-price">
            Max price
          </label>
          <select
            id="filter-max-price"
            className="field"
            value={values.maxPrice}
            onChange={(event) => apply({ maxPrice: event.target.value })}
          >
            <option value="">No maximum</option>
            {priceSteps.map((step) => (
              <option key={step} value={step}>
                {priceLabel(step)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="field-label" htmlFor="filter-beds">
            Bedrooms
          </label>
          <select
            id="filter-beds"
            className="field"
            value={values.minBedrooms}
            onChange={(event) => apply({ minBedrooms: event.target.value })}
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
          <label className="field-label" htmlFor="filter-baths">
            Bathrooms
          </label>
          <select
            id="filter-baths"
            className="field"
            value={values.minBathrooms}
            onChange={(event) => apply({ minBathrooms: event.target.value })}
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
          <label className="field-label" htmlFor="filter-status">
            Status
          </label>
          <select
            id="filter-status"
            className="field"
            value={values.status}
            onChange={(event) => apply({ status: event.target.value })}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="field-label" htmlFor="filter-sort">
            Sort
          </label>
          <select
            id="filter-sort"
            className="field"
            value={values.sort}
            onChange={(event) => apply({ sort: event.target.value })}
          >
            <option value="newest">Newest first</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </div>
      </div>

      {activeCount > 0 ? (
        <button
          type="button"
          onClick={() => router.push(basePath, { scroll: false })}
          className="mt-4 text-sm font-medium text-brass hover:underline"
        >
          Clear {activeCount} filter{activeCount === 1 ? "" : "s"}
        </button>
      ) : null}
    </div>
  );
}
