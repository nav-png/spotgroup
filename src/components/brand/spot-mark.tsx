/**
 * The SPOT Group mark: 21 dots in a descending triangular formation
 * (rows of 6, 5, 4, 3, 2, 1). Transparent background, inherits currentColor,
 * and never sits inside a box or tile.
 */
const ROWS = [6, 5, 4, 3, 2, 1];
const STEP = 20;
const RADIUS = 6.5;
const SIZE = STEP * (ROWS[0] - 1) + RADIUS * 2;

export function SpotMark({
  className,
  mirrored = false,
  title,
}: {
  className?: string;
  /** Flips the formation horizontally when the composition calls for it. */
  mirrored?: boolean;
  title?: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className={className}
      fill="currentColor"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      style={mirrored ? { transform: "scaleX(-1)" } : undefined}
    >
      {ROWS.map((count, row) =>
        Array.from({ length: count }, (_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={RADIUS + col * STEP}
            cy={RADIUS + row * STEP}
            r={RADIUS}
          />
        )),
      )}
    </svg>
  );
}

export function SpotLogo({
  className,
  markClassName = "h-7 w-7",
  compact = false,
}: {
  className?: string;
  markClassName?: string;
  compact?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <SpotMark className={markClassName} title="SPOT Group" />
      {compact ? null : (
        <span className="font-display text-lg font-extrabold uppercase leading-none tracking-[0.18em]">
          Spot Group
        </span>
      )}
    </span>
  );
}
