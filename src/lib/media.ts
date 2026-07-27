/**
 * PLACEHOLDER PHOTOGRAPHY. Unsplash-licensed imagery stands in until SPOT Group
 * supplies its own Lower Mainland photography. Replace the ids below (or point the
 * values at files under /public/media) and every page picks the new art up.
 */
const unsplash = (id: string, w = 1800, q = 68) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const media = {
  /** Full-viewport home hero. */
  hero: unsplash("1600585154526-990dced4db0d", 2400, 72),
  /**
   * Drop a licensed hero clip at /public/media/hero.mp4 and set this to
   * "/media/hero.mp4" — the hero then renders video instead of the still.
   */
  heroVideo: null as string | null,
  intro: unsplash("1524230572899-a752b3835840", 1600),
  selling: unsplash("1600607687920-4e2a09cf159d", 1800),
  sellingAlt: unsplash("1560518883-ce09059eeffa", 1400),
  team: unsplash("1600566752355-35792bedcfea", 2000),
  teamAlt: unsplash("1600573472550-8090b5e0745e", 1600),
  developments: unsplash("1518005020951-eccb494ad742", 2000),
  developmentsAlt: unsplash("1580216643062-cf460548a66a", 1800),
  cta: unsplash("1512699355324-f07e3106dae5", 2400, 70),
  aerialSuburb: unsplash("1512699355324-f07e3106dae5", 2000),
  arches: unsplash("1524230572899-a752b3835840", 1600),
  modernHouse: unsplash("1494526585095-c41746248156", 1800),
  interiorStair: unsplash("1502005229762-cf1b2da7c5d6", 1600),
  interiorPatio: unsplash("1600573472550-8090b5e0745e", 1800),
  interiorDining: unsplash("1600607687920-4e2a09cf159d", 1800),
  bath: unsplash("1600566752355-35792bedcfea", 1600),
  mountainLake: unsplash("1493246507139-91e8fad9978e", 2000),
  ridge: unsplash("1470071459604-3b5ec3a7fe05", 2000),
  beach: unsplash("1507525428034-b723cf961d3e", 2000),
  lake: unsplash("1476514525535-07fb3b4ae5f1", 2000),
  cityStreet: unsplash("1449824913935-59a10b8d2000", 2000),
  cityNight: unsplash("1519501025264-65ba15a82390", 2000),
  cityLights: unsplash("1444723121867-7a241cacace9", 2000),
  waterfront: unsplash("1477959858617-67f85cf4f1df", 2000),
  towersUp: unsplash("1486406146926-c627a92ad1ab", 2000),
  curvedTower: unsplash("1518005020951-eccb494ad742", 2000),
  highrise: unsplash("1580216643062-cf460548a66a", 2000),
  keys: unsplash("1560518883-ce09059eeffa", 1400),
} as const;

export { unsplash };
