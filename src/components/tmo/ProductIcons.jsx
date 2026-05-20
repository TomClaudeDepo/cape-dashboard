/* ════════════════════════════════════════════════
   Product icon library — small, recognisable line-art
   illustrations of TMO's actual tools and product types.
   Every icon uses `currentColor` so the parent can tint it
   with the segment colour.
   ════════════════════════════════════════════════ */
import { Fn } from "../../theme";

const SIZE = 64;

// Reusable strokes
const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };
const SF = { fill: "currentColor", fillOpacity: 0.10, stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };

const ICONS = {
  /* ─── Mass spec / chromatography ──────────────────── */
  "mass-spec-orbital": () => (
    <g {...S}>
      <rect x="6" y="22" width="44" height="20" rx="3" {...SF} />
      <ellipse cx="28" cy="32" rx="14" ry="6" />
      <ellipse cx="28" cy="32" rx="6" ry="2.5" />
      <line x1="50" y1="32" x2="58" y2="32" />
      <circle cx="58" cy="32" r="2.5" />
    </g>
  ),
  "mass-spec-quad": () => (
    <g {...S}>
      <line x1="4" y1="32" x2="60" y2="32" strokeDasharray="2 2" opacity="0.5" />
      <rect x="8"  y="22" width="12" height="20" rx="1.5" {...SF} />
      <rect x="26" y="20" width="12" height="24" rx="1.5" {...SF} />
      <rect x="44" y="22" width="12" height="20" rx="1.5" {...SF} />
      <circle cx="6"  cy="32" r="1.5" fill="currentColor" />
    </g>
  ),
  "liquid-chrom": () => (
    <g {...S}>
      <rect x="6" y="12" width="14" height="22" rx="2" {...SF} />
      <circle cx="13" cy="18" r="2" />
      <circle cx="13" cy="26" r="2" />
      <path d="M20 23 H 28" />
      <rect x="28" y="14" width="6" height="38" rx="1.5" {...SF} />
      <path d="M34 23 H 42" />
      <rect x="42" y="14" width="6" height="38" rx="1.5" {...SF} />
      <path d="M48 33 H 58" />
      <path d="M54 33 v 6 M52 39 h 4" />
    </g>
  ),
  "gas-chrom": () => (
    <g {...S}>
      <rect x="8" y="10" width="48" height="44" rx="3" {...SF} />
      <path d="M16 18 q 6 0 6 6 t 6 6 t 6 6 t 6 6 t 6 6" />
      <circle cx="48" cy="48" r="2.5" fill="currentColor" />
      <line x1="14" y1="48" x2="20" y2="48" />
      <line x1="14" y1="44" x2="18" y2="44" />
    </g>
  ),

  /* ─── Microscopy ──────────────────────────────────── */
  "microscope-em": () => (
    <g {...S}>
      <rect x="22" y="4"  width="20" height="10" rx="2" {...SF} />
      <rect x="20" y="14" width="24" height="6"  rx="1" />
      <rect x="26" y="20" width="12" height="22" {...SF} />
      <rect x="22" y="42" width="20" height="6" />
      <rect x="14" y="48" width="36" height="8" rx="1.5" {...SF} />
      <line x1="32" y1="30" x2="32" y2="36" strokeDasharray="2 1.5" />
    </g>
  ),
  "microscope-dual": () => (
    <g {...S}>
      <rect x="8"  y="6"  width="12" height="28" rx="2" transform="rotate(-15 14 20)" {...SF} />
      <rect x="44" y="6"  width="12" height="28" rx="2" transform="rotate(15 50 20)" {...SF} />
      <rect x="14" y="40" width="36" height="8" rx="1.5" {...SF} />
      <rect x="22" y="48" width="20" height="6" />
      <line x1="22" y1="32" x2="42" y2="32" strokeDasharray="2 1.5" opacity="0.6" />
    </g>
  ),
  "microscope-sem": () => (
    <g {...S}>
      <rect x="24" y="6"  width="16" height="28" rx="2" {...SF} />
      <rect x="20" y="34" width="24" height="6" />
      <rect x="14" y="40" width="36" height="14" rx="2" {...SF} />
      <circle cx="22" cy="48" r="2.5" />
      <line x1="32" y1="20" x2="32" y2="32" strokeDasharray="1.5 1.5" />
    </g>
  ),

  /* ─── Lab kit ─────────────────────────────────────── */
  centrifuge: () => (
    <g {...S}>
      <circle cx="32" cy="32" r="22" {...SF} />
      <circle cx="32" cy="32" r="15" />
      <line x1="32" y1="17" x2="32" y2="47" />
      <line x1="17" y1="32" x2="47" y2="32" />
      <circle cx="32" cy="17" r="3" fill="currentColor" />
      <circle cx="47" cy="32" r="3" fill="currentColor" />
      <circle cx="32" cy="47" r="3" fill="currentColor" />
      <circle cx="17" cy="32" r="3" fill="currentColor" />
      <path d="M52 18 a 18 18 0 0 1 4 8" strokeDasharray="2 2" />
    </g>
  ),
  freezer: () => (
    <g {...S}>
      <rect x="10" y="8" width="44" height="48" rx="3" {...SF} />
      <line x1="10" y1="28" x2="54" y2="28" />
      <rect x="46" y="14" width="3" height="8" rx="1" fill="currentColor" />
      <rect x="46" y="34" width="3" height="8" rx="1" fill="currentColor" />
      {/* snowflake */}
      <g transform="translate(22 42)">
        <line x1="0" y1="-6" x2="0" y2="6" />
        <line x1="-6" y1="0" x2="6" y2="0" />
        <line x1="-4" y1="-4" x2="4" y2="4" />
        <line x1="-4" y1="4" x2="4" y2="-4" />
      </g>
    </g>
  ),
  "pcr-block": () => (
    <g {...S}>
      <rect x="6" y="14" width="52" height="36" rx="3" {...SF} />
      <rect x="12" y="20" width="40" height="20" rx="2" />
      {[0,1,2,3,4].map(c => [0,1].map(r => (
        <circle key={`${c}-${r}`} cx={16 + c*8} cy={25 + r*9} r="2.4" />
      )))}
      <rect x="20" y="44" width="24" height="3" rx="1" fill="currentColor" />
    </g>
  ),
  "chip-microarray": () => (
    <g {...S}>
      <rect x="8" y="8" width="48" height="48" rx="3" {...SF} />
      {[0,1,2,3,4,5].map(r => [0,1,2,3,4,5].map(c => (
        <circle key={`${r}-${c}`} cx={15 + c*7} cy={15 + r*7} r="1.4" fill="currentColor" fillOpacity={(r+c)%3===0 ? 1 : 0.3} />
      )))}
    </g>
  ),
  "chip-semiconductor": () => (
    <g {...S}>
      <rect x="14" y="14" width="36" height="36" rx="2" {...SF} />
      <rect x="22" y="22" width="20" height="20" />
      {[0,1,2,3].map(i => (
        <g key={i}>
          <line x1="14" y1={20 + i*8} x2="6"  y2={20 + i*8} />
          <line x1="50" y1={20 + i*8} x2="58" y2={20 + i*8} />
          <line x1={20 + i*8} y1="14" x2={20 + i*8} y2="6" />
          <line x1={20 + i*8} y1="50" x2={20 + i*8} y2="58" />
        </g>
      ))}
    </g>
  ),
  "capillary-ce": () => (
    <g {...S}>
      <rect x="8" y="20" width="48" height="24" rx="3" {...SF} />
      <line x1="14" y1="32" x2="50" y2="32" />
      {[18,24,32,38,44].map((x,i) => (
        <rect key={i} x={x} y={29} width={2} height={6} fill="currentColor" fillOpacity={0.6 + i*0.08} />
      ))}
      <circle cx="10" cy="32" r="2" fill="currentColor" />
      <circle cx="54" cy="32" r="2" fill="currentColor" />
    </g>
  ),
  "xrf-gun": () => (
    <g {...S}>
      <path d="M8 18 H 38 a 4 4 0 0 1 4 4 V 32 L 50 36 V 22 a 6 6 0 0 1 6 -6 v 22 a 6 6 0 0 1 -6 6 L 42 38 v 6 a 4 4 0 0 1 -4 4 H 18 a 4 4 0 0 1 -4 -4 V 38 H 8 Z" {...SF} />
      <rect x="14" y="44" width="14" height="12" rx="2" {...SF} />
      <line x1="56" y1="20" x2="60" y2="16" strokeDasharray="1 2" />
      <line x1="56" y1="32" x2="62" y2="32" strokeDasharray="1 2" />
    </g>
  ),
  spectrometer: () => (
    <g {...S}>
      <line x1="4" y1="32" x2="22" y2="32" />
      <polygon points="22,16 38,32 22,48" {...SF} />
      <line x1="38" y1="32" x2="50" y2="22" />
      <line x1="38" y1="32" x2="50" y2="32" />
      <line x1="38" y1="32" x2="50" y2="42" />
      <circle cx="52" cy="22" r="2" fill="currentColor" />
      <circle cx="52" cy="32" r="2" fill="currentColor" />
      <circle cx="52" cy="42" r="2" fill="currentColor" />
    </g>
  ),
  "icp-torch": () => (
    <g {...S}>
      <rect x="20" y="38" width="24" height="18" rx="2" {...SF} />
      <path d="M28 38 Q 28 24 32 14 Q 36 24 36 38 Z" {...SF} />
      <path d="M30 30 Q 30 22 32 18 Q 34 22 34 30 Z" fill="currentColor" fillOpacity="0.3" />
      <line x1="14" y1="46" x2="20" y2="46" />
      <line x1="44" y1="46" x2="50" y2="46" />
    </g>
  ),

  /* ─── Glassware / consumables ─────────────────────── */
  bottle: () => (
    <g {...S}>
      <path d="M24 6 H 40 V 16 L 44 22 V 54 a 4 4 0 0 1 -4 4 H 24 a 4 4 0 0 1 -4 -4 V 22 L 24 16 Z" {...SF} />
      <line x1="20" y1="34" x2="44" y2="34" opacity="0.4" />
      <rect x="26" y="40" width="12" height="10" rx="1" fill="currentColor" fillOpacity="0.15" />
    </g>
  ),
  "multiwell-plate": () => (
    <g {...S}>
      <rect x="6" y="14" width="52" height="36" rx="3" {...SF} />
      {[0,1,2,3].map(r => [0,1,2,3,4,5].map(c => (
        <circle key={`${r}-${c}`} cx={12 + c*8} cy={20 + r*8} r="2.6" />
      )))}
    </g>
  ),
  "petri-dish": () => (
    <g {...S}>
      <ellipse cx="32" cy="34" rx="24" ry="14" {...SF} />
      <ellipse cx="32" cy="30" rx="24" ry="14" {...SF} />
      <ellipse cx="22" cy="28" rx="3" ry="2" fill="currentColor" fillOpacity="0.3" />
      <ellipse cx="38" cy="32" rx="4" ry="2.5" fill="currentColor" fillOpacity="0.3" />
      <circle cx="42" cy="27" r="1.5" fill="currentColor" />
    </g>
  ),
  "reagent-vial": () => (
    <g {...S}>
      <rect x="22" y="8"  width="20" height="6" rx="1.5" fill="currentColor" fillOpacity="0.4" />
      <path d="M24 14 H 40 V 52 a 4 4 0 0 1 -4 4 H 28 a 4 4 0 0 1 -4 -4 Z" {...SF} />
      <rect x="26" y="38" width="12" height="14" rx="1" fill="currentColor" fillOpacity="0.25" />
    </g>
  ),
  "vial-syringe": () => (
    <g {...S}>
      <rect x="10" y="20" width="14" height="32" rx="2" {...SF} />
      <rect x="11" y="16" width="12" height="5" rx="1" fill="currentColor" fillOpacity="0.4" />
      <rect x="13" y="34" width="8"  height="14" rx="1" fill="currentColor" fillOpacity="0.25" />
      <rect x="32" y="14" width="6" height="34" rx="1.5" {...SF} />
      <rect x="30" y="48" width="10" height="4" rx="1" {...SF} />
      <line x1="35" y1="52" x2="35" y2="60" strokeWidth="2.4" />
      <line x1="30" y1="14" x2="40" y2="14" />
    </g>
  ),
  "pill-capsule": () => (
    <g {...S}>
      <rect x="12" y="22" width="40" height="20" rx="10" {...SF} />
      <line x1="32" y1="22" x2="32" y2="42" />
      <ellipse cx="20" cy="32" rx="2.5" ry="3" fill="currentColor" fillOpacity="0.3" />
      <rect x="6" y="46" width="20" height="8" rx="4" {...SF} />
    </g>
  ),

  /* ─── Bioproduction ───────────────────────────────── */
  "media-bag": () => (
    <g {...S}>
      <path d="M16 14 H 48 L 50 50 a 4 4 0 0 1 -4 4 H 18 a 4 4 0 0 1 -4 -4 Z" {...SF} />
      <line x1="16" y1="20" x2="48" y2="20" />
      <line x1="22" y1="14" x2="22" y2="9" />
      <line x1="42" y1="14" x2="42" y2="9" />
      <rect x="20" y="6" width="24" height="5" rx="1.5" />
      <path d="M32 54 v 4 q 0 4 -4 4 H 22" />
    </g>
  ),
  bioreactor: () => (
    <g {...S}>
      <rect x="14" y="14" width="36" height="38" rx="3" {...SF} />
      <rect x="14" y="14" width="36" height="6" />
      <rect x="20" y="52" width="24" height="6" rx="1" {...SF} />
      <line x1="32" y1="20" x2="32" y2="46" strokeDasharray="2 2" />
      <path d="M26 44 H 38" />
      <path d="M28 46 H 36" />
      <path d="M30 48 H 34" />
      <rect x="22" y="22" width="20" height="14" fill="currentColor" fillOpacity="0.18" />
    </g>
  ),
  "chrom-column": () => (
    <g {...S}>
      <rect x="22" y="6"  width="20" height="6" rx="1" />
      <rect x="20" y="12" width="24" height="42" rx="2" {...SF} />
      <rect x="22" y="50" width="20" height="6" rx="1" />
      {[16,22,28,34,40,46].map(y => [0,1,2,3].map(i => (
        <circle key={`${y}-${i}`} cx={25 + i*4.5} cy={y} r="1.4" fill="currentColor" fillOpacity="0.4" />
      )))}
    </g>
  ),

  /* ─── Molecules ───────────────────────────────────── */
  "antibody-Y": () => (
    <g {...S}>
      <path d="M32 36 L 18 14" />
      <path d="M32 36 L 46 14" />
      <path d="M32 36 V 56" />
      <circle cx="18" cy="14" r="4" fill="currentColor" fillOpacity="0.3" />
      <circle cx="46" cy="14" r="4" fill="currentColor" fillOpacity="0.3" />
      <circle cx="32" cy="36" r="3" fill="currentColor" />
      <circle cx="32" cy="56" r="3" fill="currentColor" fillOpacity="0.4" />
    </g>
  ),
  "dye-droplet": () => (
    <g {...S}>
      <path d="M32 6 C 14 30 14 44 22 52 a 14 14 0 0 0 20 0 c 8 -8 8 -22 -10 -46 Z" {...SF} />
      <circle cx="36" cy="46" r="3" fill="currentColor" fillOpacity="0.3" />
      <line x1="22" y1="20" x2="26" y2="24" strokeDasharray="1 2" opacity="0.6" />
    </g>
  ),
  "dna-helix": () => (
    <g {...S}>
      <path d="M22 6 Q 42 16 22 26 Q 42 36 22 46 Q 42 56 22 60" />
      <path d="M42 6 Q 22 16 42 26 Q 22 36 42 46 Q 22 56 42 60" />
      {[10,18,28,36,46,54].map((y,i) => (
        <line key={i} x1={i%2 ? 27 : 26} y1={y} x2={i%2 ? 37 : 38} y2={y} opacity="0.7" />
      ))}
    </g>
  ),

  /* ─── Distribution / packaging ────────────────────── */
  "package-box": () => (
    <g {...S}>
      <path d="M10 22 L 32 12 L 54 22 V 50 L 32 60 L 10 50 Z" {...SF} />
      <path d="M10 22 L 32 32 L 54 22" />
      <line x1="32" y1="32" x2="32" y2="60" />
      <path d="M21 17 L 43 27" strokeWidth="2.4" stroke="currentColor" opacity="0.5" />
    </g>
  ),
  "clipboard-doc": () => (
    <g {...S}>
      <rect x="14" y="10" width="36" height="48" rx="2" {...SF} />
      <rect x="22" y="6"  width="20" height="8" rx="1.5" />
      <line x1="20" y1="24" x2="44" y2="24" />
      <line x1="20" y1="30" x2="44" y2="30" />
      <line x1="20" y1="36" x2="40" y2="36" />
      <line x1="20" y1="44" x2="44" y2="44" />
      <line x1="20" y1="50" x2="36" y2="50" />
    </g>
  ),
  "screen-app": () => (
    <g {...S}>
      <rect x="8" y="10" width="48" height="36" rx="3" {...SF} />
      <line x1="8" y1="40" x2="56" y2="40" />
      <polyline points="14,34 22,28 30,32 38,22 46,26" />
      {[22,28,32,22,26].map((y,i) => (
        <circle key={i} cx={14 + i*8} cy={y} r="1.6" fill="currentColor" />
      ))}
      <rect x="22" y="52" width="20" height="3" rx="1.5" />
    </g>
  ),

  /* ─── Clinical / med ──────────────────────────────── */
  "ecg-heart": () => (
    <g {...S}>
      <path d="M32 54 C 12 38 6 24 18 18 C 24 14 30 18 32 22 C 34 18 40 14 46 18 C 58 24 52 38 32 54 Z" {...SF} />
      <polyline points="14,34 22,34 26,28 30,40 34,30 38,34 50,34" strokeWidth="2" />
    </g>
  ),
  "lung-respiratory": () => (
    <g {...S}>
      <path d="M32 12 V 32" />
      <path d="M22 12 H 42" />
      <path d="M28 14 C 14 18 8 36 12 50 a 6 6 0 0 0 12 0 V 22 Z" {...SF} />
      <path d="M36 14 C 50 18 56 36 52 50 a 6 6 0 0 1 -12 0 V 22 Z" {...SF} />
    </g>
  ),
  "head-scan": () => (
    <g {...S}>
      <path d="M48 24 c 0 -10 -8 -16 -16 -16 -8 0 -16 6 -16 16 v 16 c 0 4 2 6 6 6 h 4 v 8 h 16 v -8 h 6 c 0 -4 0 -6 0 -10" {...SF} />
      <line x1="16" y1="32" x2="48" y2="32" strokeDasharray="2 2" opacity="0.6" />
      <line x1="32" y1="8"  x2="32" y2="46" strokeDasharray="2 2" opacity="0.6" />
      <circle cx="32" cy="32" r="3" fill="currentColor" fillOpacity="0.4" />
    </g>
  ),
  "blood-drop": () => (
    <g {...S}>
      <path d="M32 8 C 18 28 16 40 22 50 a 12 12 0 0 0 20 0 c 6 -10 4 -22 -10 -42 Z" {...SF} />
      <ellipse cx="36" cy="42" rx="3" ry="4" fill="currentColor" fillOpacity="0.35" />
    </g>
  ),
  "allergy-panel": () => (
    <g {...S}>
      <rect x="8" y="14" width="48" height="36" rx="2" {...SF} />
      {[0,1,2].map(r => [0,1,2,3,4].map(c => (
        <g key={`${r}-${c}`}>
          <circle cx={14 + c*9} cy={22 + r*10} r="2.6" />
          <circle cx={14 + c*9} cy={22 + r*10} r="1" fill="currentColor" fillOpacity={(r+c)%2 ? 1 : 0.4} />
        </g>
      )))}
    </g>
  ),
  "water-droplet": () => (
    <g {...S}>
      <path d="M32 8 C 22 22 16 32 18 42 a 14 14 0 0 0 28 0 c 2 -10 -4 -20 -14 -34 Z" {...SF} />
      <path d="M26 38 q 4 4 12 0" opacity="0.6" />
      <circle cx="40" cy="32" r="1.6" fill="currentColor" fillOpacity="0.5" />
    </g>
  ),
  "safety-glove": () => (
    <g {...S}>
      <path d="M20 56 V 28 L 22 12 a 3 3 0 0 1 6 0 L 28 28 L 30 14 a 3 3 0 0 1 6 0 L 34 28 L 36 16 a 3 3 0 0 1 6 0 L 40 30 L 42 22 a 3 3 0 0 1 6 0 L 44 36 V 56 Z" {...SF} />
    </g>
  ),
  "service-wrench": () => (
    <g {...S}>
      <path d="M44 8 a 12 12 0 0 0 -14 14 L 12 40 a 4 4 0 0 0 0 6 l 6 6 a 4 4 0 0 0 6 0 L 42 34 a 12 12 0 0 0 14 -14 L 50 26 L 44 20 L 50 14 Z" {...SF} />
    </g>
  ),

  /* ─── Default ─────────────────────────────────────── */
  default: () => (
    <g {...S}>
      <rect x="10" y="18" width="44" height="32" rx="3" {...SF} />
      <circle cx="22" cy="32" r="3" fill="currentColor" fillOpacity="0.3" />
      <line x1="32" y1="28" x2="46" y2="28" />
      <line x1="32" y1="34" x2="46" y2="34" />
      <line x1="32" y1="40" x2="40" y2="40" />
    </g>
  ),
};

export function ProductIcon({ id, color, size = 56, bg = true, T }) {
  const Icon = ICONS[id] || ICONS.default;
  const ringColor = color || "#1D4ED8";
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: 10,
      background: bg ? ringColor + "14" : "transparent",
      border: bg ? `1px solid ${ringColor}33` : "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      color: ringColor,
    }}>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width={size * 0.78} height={size * 0.78}>
        <Icon />
      </svg>
    </div>
  );
}

/* ════════════════════════════════════════════════
   Mapping: every productEcon leaf id → icon id.
   Anything not listed falls back to "default".
   ════════════════════════════════════════════════ */
export const productIconMap = {
  // LPBS / Lab Products
  nalgene: "bottle",
  nunc: "multiwell-plate",
  forma: "freezer",
  sorvall: "centrifuge",
  barnstead: "water-droplet",
  "thermo-reagents": "reagent-vial",
  pierce: "reagent-vial",

  // LPBS / RSMC
  fishersci: "package-box",
  "fisher-healthcare": "package-box",
  "fisher-safety": "safety-glove",
  unitylabs: "service-wrench",

  // LPBS / Pharma Services
  "drug-substance-sm": "reagent-vial",
  "drug-substance-bio": "bioreactor",
  "sterile-ff": "vial-syringe",
  "drug-product": "pill-capsule",
  "clinical-supply": "package-box",
  "viral-vector": "dna-helix",
  "pharma-packaging": "package-box",

  // LPBS / Clinical Research
  "ppd-clinical": "clipboard-doc",
  "ppd-lab": "reagent-vial",
  "ppd-real-world": "screen-app",
  "clario-ecoa": "screen-app",
  "clario-imaging": "head-scan",
  "clario-cardio": "ecg-heart",
  "clario-respiratory": "lung-respiratory",

  // LSS / Bioproduction
  gibco: "media-bag",
  hyclone: "media-bag",
  "single-use-tech": "bioreactor",
  "downstream-purif": "chrom-column",
  "process-analytics": "screen-app",

  // LSS / Biosciences
  invitrogen: "reagent-vial",
  "alexa-fluor": "dye-droplet",
  "gibco-research": "media-bag",
  antibodies: "antibody-Y",
  "biosci-instr": "pcr-block",
  qubit: "reagent-vial",

  // LSS / Genetic Sciences
  "abi-quantstudio": "pcr-block",
  taqman: "reagent-vial",
  "ion-torrent": "chip-semiconductor",
  seqstudio: "capillary-ce",
  axiom: "chip-microarray",
  "absolute-q": "chip-microarray",

  // AI / Chromatography & Mass Spec
  orbitrap: "mass-spec-orbital",
  tsq: "mass-spec-quad",
  iliad: "mass-spec-quad",
  vanquish: "liquid-chrom",
  "dionex-ic": "liquid-chrom",
  "trace-gc": "gas-chrom",

  // AI / Chemical Analysis
  niton: "xrf-gun",
  "ftir-instr": "spectrometer",
  "process-nir": "spectrometer",
  "iris-icp": "icp-torch",
  "env-process": "spectrometer",

  // AI / Electron Microscopy
  krios: "microscope-em",
  glacios: "microscope-em",
  talos: "microscope-em",
  "helios-dualbeam": "microscope-dual",
  "apreo-sem": "microscope-sem",
  "verios-sem": "microscope-sem",

  // SD / Clinical Diagnostics
  "binding-site": "blood-drop",
  "brahms-pct": "blood-drop",
  "drug-monitoring": "blood-drop",
  "drugs-of-abuse": "allergy-panel",

  // SD / ImmunoDiagnostics (Phadia)
  immunocap: "allergy-panel",
  elia: "allergy-panel",
  "phadia-instr": "pcr-block",

  // SD / Microbiology
  oxoid: "petri-dish",
  remel: "petri-dish",
  sensititre: "multiwell-plate",
  "oxoid-pathogen": "petri-dish",

  // SD / Transplant Diagnostics
  labtype: "dna-helix",
  labscreen: "antibody-Y",
  fusion: "screen-app",

  // SD / Healthcare Market Channel
  "fisher-clin": "package-box",
  "fisher-clin-pos": "blood-drop",
};
