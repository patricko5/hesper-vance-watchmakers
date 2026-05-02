import { cx } from "@/lib/utils";

type ProductVisualProps = {
  name: string;
  material?: string;
  complication?: string;
  index?: number;
  className?: string;
};

const materialColors: Record<string, { case: string; dial: string; accent: string }> = {
  "Rose Gold": { case: "#b77a5b", dial: "#191a1d", accent: "#d2a06f" },
  Platinum: { case: "#c9cdd2", dial: "#111216", accent: "#a4a9af" },
  "Stainless Steel": { case: "#9aa0a7", dial: "#111217", accent: "#ced3d7" },
  "White Gold": { case: "#d7d4cc", dial: "#15171b", accent: "#a8acb0" }
};

export function ProductVisual({
  name,
  material = "Stainless Steel",
  complication = "time only",
  index = 0,
  className
}: ProductVisualProps) {
  const colors = materialColors[material] ?? materialColors["Stainless Steel"];
  const handAngle = (index * 28 + 18) % 360;

  return (
    <div
      className={cx(
        "relative grid aspect-square overflow-hidden rounded-md border border-white/10 bg-[#101115]",
        className
      )}
      aria-label={`${name} product mockup`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_42%_18%,rgba(255,255,255,0.11),transparent_20rem)]" />
      <svg viewBox="0 0 320 320" className="relative h-full w-full" role="img" aria-label={name}>
        <defs>
          <radialGradient id={`dial-${index}`} cx="50%" cy="42%" r="55%">
            <stop offset="0%" stopColor="#25272c" />
            <stop offset="62%" stopColor={colors.dial} />
            <stop offset="100%" stopColor="#07080a" />
          </radialGradient>
          <linearGradient id={`case-${index}`} x1="16%" x2="86%" y1="12%" y2="92%">
            <stop offset="0%" stopColor="#f1eee7" stopOpacity="0.72" />
            <stop offset="35%" stopColor={colors.case} />
            <stop offset="66%" stopColor="#50545b" />
            <stop offset="100%" stopColor={colors.accent} />
          </linearGradient>
          <filter id={`shadow-${index}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="20" stdDeviation="16" floodColor="#000" floodOpacity="0.6" />
          </filter>
        </defs>
        <g filter={`url(#shadow-${index})`}>
          <path
            d="M118 38h84l10 28h-104l10-28Zm-10 216h104l-10 28h-84l-10-28Z"
            fill={colors.case}
            opacity="0.68"
          />
          <circle cx="160" cy="160" r="104" fill={`url(#case-${index})`} />
          <circle cx="160" cy="160" r="88" fill="#090a0c" stroke="rgba(255,255,255,0.22)" strokeWidth="2" />
          <circle cx="160" cy="160" r="78" fill={`url(#dial-${index})`} />
          {Array.from({ length: 12 }).map((_, marker) => (
            <rect
              key={marker}
              x="158"
              y="88"
              width="4"
              height={marker % 3 === 0 ? 18 : 10}
              rx="2"
              fill={marker % 3 === 0 ? colors.accent : "#777b80"}
              transform={`rotate(${marker * 30} 160 160)`}
            />
          ))}
          <line
            x1="160"
            y1="160"
            x2="160"
            y2="108"
            stroke="#e8e4db"
            strokeWidth="4"
            strokeLinecap="round"
            transform={`rotate(${handAngle} 160 160)`}
          />
          <line
            x1="160"
            y1="160"
            x2="202"
            y2="160"
            stroke={colors.accent}
            strokeWidth="3"
            strokeLinecap="round"
            transform={`rotate(${handAngle * 0.42} 160 160)`}
          />
          <circle cx="160" cy="160" r="5" fill={colors.accent} />
          {complication.includes("chronograph") ? (
            <>
              <circle cx="160" cy="118" r="18" fill="none" stroke="#8a8579" strokeWidth="2" />
              <circle cx="122" cy="178" r="18" fill="none" stroke="#8a8579" strokeWidth="2" />
              <circle cx="198" cy="178" r="18" fill="none" stroke="#8a8579" strokeWidth="2" />
            </>
          ) : null}
          {complication.includes("moon") ? (
            <path d="M132 210a25 25 0 1 0 36 0a18 18 0 1 1-36 0Z" fill="#d7d4cc" opacity="0.75" />
          ) : null}
          {complication.includes("tourbillon") ? (
            <g transform="translate(160 220)">
              <circle r="25" fill="none" stroke={colors.accent} strokeWidth="2" />
              <path d="M-22 0h44M0-22v44" stroke="#e8e4db" strokeWidth="2" />
            </g>
          ) : null}
        </g>
      </svg>
    </div>
  );
}
