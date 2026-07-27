import type { Listing } from "@/lib/listings/types";

/**
 * OpenStreetMap embed — no API key, no tracking. Swap for Google/Mapbox once a
 * key is available if richer map interaction is needed.
 */
function bbox(points: { latitude: number; longitude: number }[], pad = 0.02) {
  const lats = points.map((p) => p.latitude);
  const lngs = points.map((p) => p.longitude);
  return [
    Math.min(...lngs) - pad,
    Math.min(...lats) - pad,
    Math.max(...lngs) + pad,
    Math.max(...lats) + pad,
  ].join(",");
}

export function PropertyMap({
  listings,
  className,
  title = "Map of properties",
}: {
  listings: Listing[];
  className?: string;
  title?: string;
}) {
  const located = listings.filter(
    (listing): listing is Listing & { latitude: number; longitude: number } =>
      typeof listing.latitude === "number" && typeof listing.longitude === "number",
  );

  if (located.length === 0) {
    return (
      <div
        className={`flex items-center justify-center rounded-card border border-dashed border-ink/20 p-10 text-center text-sm text-ink-500 ${className ?? ""}`}
      >
        Map coordinates are not available for these properties yet.
      </div>
    );
  }

  const single = located.length === 1;
  const marker = single ? `&marker=${located[0].latitude},${located[0].longitude}` : "";
  const box = single
    ? bbox(located, 0.008)
    : bbox(located);

  return (
    <div className={`media rounded-card ${className ?? ""}`}>
      <iframe
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${box}&layer=mapnik${marker}`}
        className="h-full w-full border-0"
      />
    </div>
  );
}
