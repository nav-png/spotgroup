import { propertyTypeLabels, type PropertyType } from "@/lib/listings/types";

const propertyTypes = Object.keys(propertyTypeLabels) as PropertyType[];

export function QuickSearch({ cities }: { cities: string[] }) {
  return (
    <form
      action="/listings"
      method="get"
      className="grid gap-3 rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur sm:grid-cols-[1.6fr_1fr_1fr_auto]"
    >
      <div>
        <label className="sr-only" htmlFor="quick-keyword">
          Search
        </label>
        <input
          id="quick-keyword"
          name="keyword"
          className="field"
          placeholder="City, neighbourhood, address or MLS® number"
        />
      </div>
      <div>
        <label className="sr-only" htmlFor="quick-city">
          City
        </label>
        <select id="quick-city" name="city" className="field" defaultValue="">
          <option value="">All cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="sr-only" htmlFor="quick-type">
          Property type
        </label>
        <select id="quick-type" name="propertyType" className="field" defaultValue="">
          <option value="">All property types</option>
          {propertyTypes.map((type) => (
            <option key={type} value={type}>
              {propertyTypeLabels[type]}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn-dark">
        Search listings
      </button>
    </form>
  );
}
