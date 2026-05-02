"use client";

import type { ComplicationKey } from "@/components/movement/MovementExplorer";

const labelClass = "fill-[#E8E4DB] font-mono text-[18px]";
const mutedStroke = "#8A8579";
const brass = "#B08D4E";
const steel = "#6E7378";
const ruby = "#8B2942";

function DiagramFrame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 800 500"
      role="img"
      aria-label="Animated complication diagram"
      className="h-auto w-full max-w-[800px]"
    >
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={brass} />
        </marker>
      </defs>
      <style>{`
        .draw { stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: drawLine 900ms cubic-bezier(0.65, 0, 0.35, 1) forwards; }
        .draw-delay-1 { animation-delay: 200ms; }
        .draw-delay-2 { animation-delay: 400ms; }
        .draw-delay-3 { animation-delay: 600ms; }
        .fade-label { opacity: 0; animation: fadeLabel 500ms cubic-bezier(0.65, 0, 0.35, 1) forwards 900ms; }
        .gear-line { fill: none; stroke: ${brass}; stroke-width: 3; }
        @keyframes drawLine { to { stroke-dashoffset: 0; } }
        @keyframes fadeLabel { to { opacity: 1; } }
      `}</style>
      {children}
    </svg>
  );
}

function Gear({ x, y, r, teeth = 18, color = brass, duration = "8s" }: { x: number; y: number; r: number; teeth?: number; color?: string; duration?: string }) {
  const spokes = Array.from({ length: 6 });
  return (
    <g transform={`translate(${x} ${y})`}>
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur={duration} repeatCount="indefinite" />
        {Array.from({ length: teeth }).map((_, i) => (
          <rect
            key={i}
            x="-3"
            y={-r - 10}
            width="6"
            height="16"
            rx="1"
            fill={color}
            transform={`rotate(${(i / teeth) * 360})`}
          />
        ))}
        <circle r={r} className="gear-line" stroke={color} />
        {spokes.map((_, i) => (
          <line key={i} x1="0" y1="0" x2={r - 8} y2="0" stroke={color} strokeWidth="3" transform={`rotate(${i * 60})`} />
        ))}
        <circle r="9" fill={ruby} />
      </g>
    </g>
  );
}

function Label({ x, y, lineTo, children }: { x: number; y: number; lineTo: [number, number]; children: React.ReactNode }) {
  return (
    <g className="fade-label">
      <path d={`M${x} ${y + 8} L${lineTo[0]} ${lineTo[1]}`} fill="none" stroke={mutedStroke} strokeWidth="1.5" className="draw" />
      <text x={x} y={y} className={labelClass}>
        {children}
      </text>
    </g>
  );
}

export function TimeOnlyDiagram() {
  return (
    <DiagramFrame>
      <path
        d="M120 260 C190 190 260 230 322 196 S430 248 500 188 S616 206 684 150"
        fill="none"
        stroke={brass}
        strokeWidth="4"
        markerEnd="url(#arrow)"
        className="draw"
      />
      <Gear x={130} y={290} r={54} teeth={40} duration="3600s" />
      <Gear x={260} y={235} r={46} teeth={60} duration="3600s" />
      <Gear x={385} y={276} r={42} teeth={70} duration="480s" />
      <Gear x={510} y={220} r={42} teeth={70} duration="60s" />
      <Gear x={630} y={168} r={32} teeth={15} duration="10s" />
      <g transform="translate(682 278)">
        <animateTransform attributeName="transform" type="rotate" values="-140;140;-140" dur="0.25s" repeatCount="indefinite" additive="sum" />
        <circle r="52" fill="none" stroke={steel} strokeWidth="4" />
        <path d="M-52 0H52M0-52V52" stroke={steel} strokeWidth="3" />
      </g>
      <Label x={70} y={398} lineTo={[130, 330]}>Barrel (40t)</Label>
      <Label x={210} y={130} lineTo={[260, 196]}>Center Wheel (60t)</Label>
      <Label x={335} y={390} lineTo={[385, 312]}>Third Wheel (70t)</Label>
      <Label x={455} y={112} lineTo={[510, 180]}>Fourth Wheel (70t)</Label>
      <Label x={560} y={92} lineTo={[630, 140]}>Escape Wheel (15t)</Label>
    </DiagramFrame>
  );
}

export function ChronographDiagram() {
  return (
    <DiagramFrame>
      <path
        d="M166 128l18 16l-8 22l-24 2l-14-18l8-22z"
        fill="none"
        stroke={brass}
        strokeWidth="5"
        className="draw"
      />
      <path d="M235 250 C310 208 382 206 456 254" fill="none" stroke={steel} strokeWidth="8" className="draw draw-delay-1" />
      <path d="M508 122 C560 172 564 244 516 302" fill="none" stroke={steel} strokeWidth="8" className="draw draw-delay-2" />
      <Gear x={160} y={150} r={45} teeth={12} duration="60s" />
      <Gear x={360} y={250} r={58} teeth={32} duration="60s" />
      <Gear x={590} y={248} r={48} teeth={30} duration="1800s" />
      <Label x={70} y={72} lineTo={[160, 116]}>Column Wheel</Label>
      <Label x={250} y={184} lineTo={[322, 224]}>Coupling Lever</Label>
      <Label x={336} y={356} lineTo={[360, 304]}>Chronograph Wheel</Label>
      <Label x={526} y={90} lineTo={[520, 130]}>Reset Hammer</Label>
      <Label x={596} y={350} lineTo={[590, 296]}>Minute Counter</Label>
    </DiagramFrame>
  );
}

export function PerpetualCalendarDiagram() {
  return (
    <DiagramFrame>
      <Gear x={190} y={248} r={64} teeth={31} duration="1s" />
      <path
        d="M372 160 C420 126 476 158 466 218 C520 238 492 318 436 308 C394 354 326 314 348 256 C300 224 318 178 372 160Z"
        fill="none"
        stroke={brass}
        strokeWidth="5"
        className="draw draw-delay-1"
      >
        <animateTransform attributeName="transform" type="rotate" from="0 410 242" to="360 410 242" dur="12s" repeatCount="indefinite" />
      </path>
      <Gear x={590} y={178} r={42} teeth={4} duration="8s" color={steel} />
      <Gear x={590} y={330} r={45} teeth={7} duration="7s" color={steel} />
      <path d="M276 280 C356 370 492 362 548 286" fill="none" stroke={steel} strokeWidth="7" className="draw draw-delay-3" />
      <Label x={82} y={118} lineTo={[190, 192]}>Date Wheel</Label>
      <Label x={360} y={100} lineTo={[410, 164]}>Month Cam</Label>
      <Label x={596} y={118} lineTo={[590, 144]}>Leap Year Wheel</Label>
      <Label x={596} y={416} lineTo={[590, 366]}>Day Wheel</Label>
      <Label x={312} y={416} lineTo={[412, 334]}>Grand Lever</Label>
    </DiagramFrame>
  );
}

export function MoonPhaseDiagram() {
  return (
    <DiagramFrame>
      <defs>
        <mask id="aperture-mask">
          <rect width="800" height="500" fill="black" />
          <path d="M242 176h316a158 158 0 0 1 0 148H242a158 158 0 0 1 0-148Z" fill="white" />
        </mask>
      </defs>
      <g mask="url(#aperture-mask)">
        <g transform="translate(400 250)">
          <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="15s" repeatCount="indefinite" />
          <circle cx="-108" cy="0" r="62" fill="#d7d4cc" />
          <circle cx="108" cy="0" r="62" fill="#d7d4cc" />
          <circle r="168" fill="none" stroke={brass} strokeWidth="5" className="draw" />
        </g>
      </g>
      <path d="M242 176h316a158 158 0 0 1 0 148H242a158 158 0 0 1 0-148Z" fill="none" stroke={steel} strokeWidth="5" />
      <Gear x={214} y={250} r={52} teeth={59} duration="15s" />
      <path d="M290 250 L348 232 L348 268 Z" fill={brass} className="fade-label">
        <animateTransform attributeName="transform" type="rotate" values="0 214 250;22 214 250;0 214 250" dur="1s" repeatCount="indefinite" />
      </path>
      <path d="M294 304 C322 334 356 334 388 304" fill="none" stroke={steel} strokeWidth="6" className="draw draw-delay-2" />
      <Label x={330} y={82} lineTo={[400, 170]}>Moon Disc (59 teeth)</Label>
      <Label x={74} y={178} lineTo={[214, 206]}>Driving Wheel</Label>
      <Label x={72} y={340} lineTo={[328, 260]}>Driving Finger</Label>
      <Label x={562} y={178} lineTo={[552, 214]}>Aperture</Label>
      <Label x={520} y={386} lineTo={[466, 308]}>Lunar Cycle: 29.53 days</Label>
    </DiagramFrame>
  );
}

export function MechanismDiagram({ selected }: { selected: ComplicationKey }) {
  if (selected === "chronograph") return <ChronographDiagram />;
  if (selected === "calendar") return <PerpetualCalendarDiagram />;
  if (selected === "moon") return <MoonPhaseDiagram />;
  return <TimeOnlyDiagram />;
}
