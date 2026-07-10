/**
 * Self-contained B&W vector assets for the case samples — no external files.
 * BrandMark: one modular alphabet (4×4) reconfigured per variant, so the branding
 * case proves a real *system*. UISkeleton: wireframe "screens" for device frames,
 * echoing the original loading-skeleton concept. Both draw in currentColor.
 */

/* ---------- brand mark: same 4×4 module, different arrangements ---------- */
const PATTERNS: Record<string, string[]> = {
  // rows top→bottom, '#' = filled module
  path: ["##..", ".##.", "..##", "...#"],
  block: ["##..", "##..", "..#.", "...."],
  spine: [".##.", ".##.", ".##.", ".##."],
  step: ["#...", "##..", ".##.", "..##"],
  dot: ["....", ".##.", ".##.", "...."],
};

export function BrandMark({
  variant = "path",
  wordmark = false,
}: {
  variant?: keyof typeof PATTERNS;
  wordmark?: boolean;
}) {
  const rows = PATTERNS[variant] ?? PATTERNS.path;
  const u = 22; // module size
  const gap = 3;
  const cells: React.ReactNode[] = [];
  rows.forEach((r, y) =>
    r.split("").forEach((c, x) => {
      if (c === "#")
        cells.push(
          <rect
            key={`${x}-${y}`}
            x={x * (u + gap)}
            y={y * (u + gap)}
            width={u}
            height={u}
            rx={1.5}
            fill="currentColor"
          />,
        );
    }),
  );
  const dim = 4 * u + 3 * gap;
  return (
    <svg
      viewBox={`0 0 ${dim} ${wordmark ? dim + 34 : dim}`}
      role="img"
      aria-hidden
      style={{ width: "58%", height: "auto", color: "inherit" }}
    >
      {cells}
      {wordmark ? (
        <text
          x={dim / 2}
          y={dim + 24}
          textAnchor="middle"
          fontSize="10"
          textLength={dim}
          lengthAdjust="spacingAndGlyphs"
          fill="currentColor"
          style={{ fontFamily: "var(--font-mono)", textTransform: "uppercase" }}
        >
          Individualizada
        </text>
      ) : null}
    </svg>
  );
}

/* ---------- UI skeletons: wireframe screens for device frames ---------- */
const P = "rgba(245,244,241,0.20)"; // hairline / quiet fill
const Q = "rgba(245,244,241,0.09)"; // ghost fill
const A = "rgba(245,244,241,0.92)"; // the single bright accent (the "decision")

function bar(
  x: number,
  y: number,
  w: number,
  h: number,
  fill = Q,
  rx = 3,
): React.ReactNode {
  return <rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} />;
}

export function UISkeleton({ variant = "dashboard" }: { variant?: string }) {
  const common = {
    role: "img" as const,
    "aria-hidden": true,
    preserveAspectRatio: "xMidYMid slice",
    style: { width: "100%", height: "100%", display: "block" },
  };

  if (variant === "dashboard") {
    return (
      <svg viewBox="0 0 320 200" {...common}>
        {bar(20, 18, 60, 8, P)}
        {[210, 246, 282].map((x, i) => (
          <rect key={i} x={x} y={18} width={8} height={8} rx={4} fill={Q} />
        ))}
        {/* the one decision, foregrounded */}
        {bar(20, 44, 180, 46, A)}
        {bar(210, 44, 90, 46, Q)}
        {[104, 140, 176].map((y, i) => (
          <g key={i}>
            {bar(20, y, 12, 10, P)}
            {bar(40, y, 150, 10, Q)}
            {bar(210, y, 90, 10, Q)}
          </g>
        ))}
      </svg>
    );
  }
  if (variant === "detail") {
    return (
      <svg viewBox="0 0 180 360" {...common}>
        {bar(20, 24, 90, 9, P)}
        {/* chart plane */}
        {bar(20, 48, 140, 96, Q)}
        <polyline
          points="26,128 54,96 82,110 110,70 138,86 154,58"
          fill="none"
          stroke={A}
          strokeWidth="3"
        />
        {[168, 196, 224, 252].map((y, i) => (
          <g key={i}>
            {bar(20, y, 14, 8, P)}
            {bar(44, y, 116, 8, Q)}
          </g>
        ))}
      </svg>
    );
  }
  if (variant === "confirm") {
    return (
      <svg viewBox="0 0 180 360" {...common}>
        {bar(20, 40, 100, 9, P)}
        {bar(20, 64, 140, 8, Q)}
        {bar(20, 82, 120, 8, Q)}
        {bar(30, 150, 120, 120, Q, 60)}
        {/* primary action */}
        {bar(20, 300, 140, 34, A, 6)}
      </svg>
    );
  }
  // "home" — the daily decision isolated
  return (
    <svg viewBox="0 0 180 360" {...common}>
      {bar(20, 22, 70, 8, P)}
      {bar(150, 22, 10, 8, Q, 5)}
      {bar(20, 46, 140, 150, A, 8)}
      {[214, 244, 274].map((y, i) => (
        <g key={i}>
          {bar(20, y, 12, 10, P)}
          {bar(40, y, 120, 10, Q)}
        </g>
      ))}
    </svg>
  );
}
