import { Fn, Fh } from "../theme";
import { Pill } from "../components/shared";

/* ════════════════════════════════════════════════════════════════
   Danaher — spider diagram of the operating-company portfolio
   ──────────────────────────────────────────────────────────────
   Center  = DHR
   Inner   = 3 reporting segments (Bio / LS / Dx)
   Outer   = ~18 operating companies grouped under each segment
   ════════════════════════════════════════════════════════════════ */

const DHR_NAVY = "#0B2545";
const BIO = "#1E4D8C";
const LS  = "#7A5197";
const DX  = "#C2410C";

/* Each segment's angular wedge sized roughly by opco count so the
   crowded Life Sciences side gets the most room. Angles are in radians,
   0 = right, π/2 = down, -π/2 = up. */
const segments = [
  {
    id: "bio", label: "Biotechnology", color: BIO,
    revBn: 7.3, share: 30, wedgeStart: -Math.PI * 0.66, wedgeEnd: -Math.PI * 0.34,
    opcos: [
      { id: "cytiva",   name: "Cytiva",    tag: "Bioprocessing resins, single-use bioreactors, filtration, media · ~$6.0–6.5B", scale: "L" },
      { id: "aldevron", name: "Aldevron",  tag: "Plasmid DNA, mRNA, recombinant proteins (CRISPR Cas9)",                       scale: "M" },
    ],
  },
  {
    id: "ls", label: "Life Sciences", color: LS,
    revBn: 7.3, share: 30, wedgeStart: -Math.PI * 0.34, wedgeEnd: Math.PI * 0.66,
    opcos: [
      { id: "bcls",     name: "Beckman Coulter LS",  tag: "Centrifuges, flow cytometry, lab automation (Biomek)",        scale: "L" },
      { id: "sciex",    name: "SCIEX",               tag: "Mass spectrometry (ZenoTOF, Triple Quad) & capillary electrophoresis", scale: "M" },
      { id: "leicam",   name: "Leica Microsystems",  tag: "Confocal, super-res & surgical microscopes",                   scale: "M" },
      { id: "moldev",   name: "Molecular Devices",   tag: "Microplate readers, high-content screening, organoid platforms", scale: "S" },
      { id: "phenom",   name: "Phenomenex",          tag: "HPLC/UHPLC columns & SPE consumables",                         scale: "S" },
      { id: "idt",      name: "IDT",                 tag: "Custom oligos, NGS reagents, CRISPR guide RNAs",               scale: "M" },
      { id: "abcam",    name: "Abcam",               tag: "Research antibodies (37k+ recombinant) & ELISA kits",          scale: "M" },
      { id: "pall",     name: "Pall Industrial",     tag: "Aerospace, semi, food, oil & gas filtration",                  scale: "M" },
      { id: "idbs",     name: "IDBS",                tag: "Lab informatics software (ELN / LIMS / LES)",                  scale: "XS" },
      { id: "genedata", name: "Genedata",            tag: "Bioinformatics software for biopharma R&D",                    scale: "XS" },
    ],
  },
  {
    id: "dx", label: "Diagnostics", color: DX,
    revBn: 10.0, share: 41, wedgeStart: Math.PI * 0.66, wedgeEnd: Math.PI * 1.34,
    opcos: [
      { id: "bcdx",     name: "Beckman Coulter Dx",  tag: "Clinical chemistry, immunoassay (DxI 9000) & hematology",      scale: "L" },
      { id: "cepheid",  name: "Cepheid",             tag: "On-demand molecular Dx (GeneXpert) · 40k+ systems",            scale: "L" },
      { id: "radiom",   name: "Radiometer",          tag: "Blood gas (ABL90) & acute-care immunoassay · POC",             scale: "M" },
      { id: "leicab",   name: "Leica Biosystems",    tag: "Anatomic pathology · IHC (BOND), Aperio digital slide scanner", scale: "M" },
      { id: "mammo",    name: "Mammotome",           tag: "Vacuum-assisted breast biopsy devices & site markers",         scale: "S" },
      { id: "hemo",     name: "HemoCue",             tag: "Point-of-care hemoglobin, glucose, HbA1c",                      scale: "S" },
    ],
  },
];

const scaleR = { L: 11, M: 9, S: 7.5, XS: 6 };
const scaleLabel = {
  L: "~$3B+",
  M: "~$0.5–1.5B",
  S: "~$0.2–0.5B",
  XS: "~<$0.2B",
};

/* ── Geometry ──────────────────────────────────────────────── */
const W = 1180, H = 980;
const cx = W / 2, cy = H / 2 + 6;
const R_seg = 180;     // segment hub radius
const R_inner = 330;   // inner ring of opcos
const R_outer = 410;   // alternating outer ring (avoids label collision)

function placeOpcos(seg) {
  const n = seg.opcos.length;
  const span = seg.wedgeEnd - seg.wedgeStart;
  return seg.opcos.map((o, i) => {
    // centre each opco in its sub-wedge
    const θ = seg.wedgeStart + (span * (i + 0.5)) / n;
    // alternate radii to avoid crowding in the wide LS wedge
    const r = (i % 2 === 0) ? R_inner : R_outer;
    const x = cx + r * Math.cos(θ);
    const y = cy + r * Math.sin(θ);
    return { ...o, θ, x, y, r };
  });
}

const segWithGeo = segments.map(s => {
  const θ = (s.wedgeStart + s.wedgeEnd) / 2;
  const sx = cx + R_seg * Math.cos(θ);
  const sy = cy + R_seg * Math.sin(θ);
  return { ...s, θ, sx, sy, placed: placeOpcos(s) };
});

/* Curve helper — soft bezier from segment hub to opco dot */
function curve(x1, y1, x2, y2) {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const dx = x2 - x1, dy = y2 - y1;
  const px = -dy * 0.08, py = dx * 0.08;
  return `M ${x1} ${y1} Q ${mx + px} ${my + py}, ${x2} ${y2}`;
}

/* Segment wedge arc (background highlight) */
function wedgePath(start, end, rInner, rOuter) {
  const x1 = cx + rInner * Math.cos(start), y1 = cy + rInner * Math.sin(start);
  const x2 = cx + rOuter * Math.cos(start), y2 = cy + rOuter * Math.sin(start);
  const x3 = cx + rOuter * Math.cos(end),   y3 = cy + rOuter * Math.sin(end);
  const x4 = cx + rInner * Math.cos(end),   y4 = cy + rInner * Math.sin(end);
  const large = (end - start) > Math.PI ? 1 : 0;
  return `M ${x1} ${y1} L ${x2} ${y2} A ${rOuter} ${rOuter} 0 ${large} 1 ${x3} ${y3} L ${x4} ${y4} A ${rInner} ${rInner} 0 ${large} 0 ${x1} ${y1} Z`;
}

/* ════════════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════════════ */
export default function Danaher({ T }) {
  return (
    <div style={{ paddingBottom: 60 }}>
      {/* ── HEADER ─────────────────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap", marginBottom: 10 }}>
        <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 42, color: T.text, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
          Danaher · Operating-Company Spider
        </div>
        <Pill T={T} color="#fff" bg={DHR_NAVY}>NYSE · DHR</Pill>
        <Pill T={T} color={T.textSec} bg={T.pillBg}>FY2025 · ~18 operating companies</Pill>
      </div>
      <div style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.6, maxWidth: 880, marginBottom: 8 }}>
        Post-Veralto Danaher in one picture. Centre is the parent; the three inner hubs are the reporting segments (Biotechnology · Life Sciences · Diagnostics); the outer ring is every operating company that ships product or service revenue, with a one-line description of what each one makes.
      </div>

      {/* ── LEGEND ─────────────────────────────────────────────── */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center", marginBottom: 18, padding: "12px 16px", background: T.card, borderRadius: T.radius, boxShadow: T.shadow }}>
        {segWithGeo.map(s => (
          <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 12, height: 12, borderRadius: 3, background: s.color, flexShrink: 0 }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: T.text, fontFamily: Fn }}>{s.label}</span>
            <span style={{ fontSize: 11, color: T.textTer, fontFamily: Fn }}>· ${s.revBn.toFixed(1)}B · {s.share}% · {s.opcos.length} opcos</span>
          </div>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 10.5, color: T.textTer, fontFamily: Fn, letterSpacing: "0.04em" }}>
          <span style={{ fontWeight: 800, color: T.textSec, letterSpacing: "0.1em" }}>NODE SIZE → APPROX. REVENUE</span>
          {Object.entries(scaleR).map(([k, r]) => (
            <span key={k} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: r * 1.4, height: r * 1.4, borderRadius: "50%", background: T.textTer, opacity: 0.55 }} />
              <span>{scaleLabel[k]}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── SPIDER DIAGRAM ─────────────────────────────────────── */}
      <div style={{ background: T.card, borderRadius: T.radius, boxShadow: T.shadow, padding: "8px 0", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", margin: "0 auto", maxWidth: W, overflow: "visible" }}>
            <defs>
              <radialGradient id="bg-wash" cx="50%" cy="50%" r="55%">
                <stop offset="0%"  stopColor={DHR_NAVY} stopOpacity="0.07" />
                <stop offset="60%" stopColor={DHR_NAVY} stopOpacity="0.02" />
                <stop offset="100%" stopColor={DHR_NAVY} stopOpacity="0" />
              </radialGradient>
              {segWithGeo.map(s => (
                <radialGradient key={"g-" + s.id} id={`hub-${s.id}`} cx="35%" cy="30%" r="80%">
                  <stop offset="0%"  stopColor="#fff" stopOpacity="0.35" />
                  <stop offset="60%" stopColor={s.color} stopOpacity="0" />
                </radialGradient>
              ))}
              <filter id="soft-shadow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                <feOffset dx="0" dy="2" result="offset" />
                <feComponentTransfer><feFuncA type="linear" slope="0.22" /></feComponentTransfer>
                <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Background wash */}
            <circle cx={cx} cy={cy} r={R_outer + 80} fill="url(#bg-wash)" />

            {/* Segment wedges — soft coloured arcs behind each group */}
            {segWithGeo.map(s => (
              <path key={"w-" + s.id} d={wedgePath(s.wedgeStart, s.wedgeEnd, R_inner - 60, R_outer + 70)} fill={s.color} opacity="0.05" />
            ))}

            {/* Outer guide ring (subtle) */}
            <circle cx={cx} cy={cy} r={R_outer + 70} fill="none" stroke={T.border} strokeDasharray="2 6" opacity="0.5" />

            {/* Spokes — center → segment hub */}
            {segWithGeo.map(s => (
              <line key={"sp-" + s.id} x1={cx} y1={cy} x2={s.sx} y2={s.sy} stroke={s.color} strokeWidth="2" opacity="0.55" />
            ))}

            {/* Branches — segment hub → opco dot */}
            {segWithGeo.map(s => s.placed.map(o => (
              <path key={"br-" + o.id} d={curve(s.sx, s.sy, o.x, o.y)} stroke={s.color} strokeWidth="1.4" fill="none" opacity="0.45" />
            )))}

            {/* Opco dots */}
            {segWithGeo.map(s => s.placed.map(o => {
              const dotR = scaleR[o.scale];
              return (
                <g key={"d-" + o.id}>
                  <circle cx={o.x} cy={o.y} r={dotR + 4} fill={s.color} opacity="0.18" />
                  <circle cx={o.x} cy={o.y} r={dotR} fill={s.color} stroke="#fff" strokeWidth="2" filter="url(#soft-shadow)" />
                </g>
              );
            }))}

            {/* Opco labels — placed radially outward from each dot */}
            {segWithGeo.map(s => s.placed.map(o => {
              const ux = Math.cos(o.θ), uy = Math.sin(o.θ);
              const lx = o.x + ux * 22;
              const ly = o.y + uy * 22;
              const anchor = ux > 0.25 ? "start" : ux < -0.25 ? "end" : "middle";
              const dx = anchor === "start" ? 4 : anchor === "end" ? -4 : 0;
              return (
                <g key={"l-" + o.id}>
                  <text x={lx + dx} y={ly - 2} textAnchor={anchor} fontFamily={Fn} fontSize={12.5} fontWeight={800} fill={s.color} letterSpacing="-0.01em">
                    {o.name}
                  </text>
                  {/* wrap tag onto two lines if long */}
                  {wrapLabel(o.tag, 32).map((line, i) => (
                    <text
                      key={i}
                      x={lx + dx}
                      y={ly + 12 + i * 11.5}
                      textAnchor={anchor}
                      fontFamily={Fn}
                      fontSize={9.5}
                      fill={T.textSec}
                    >{line}</text>
                  ))}
                </g>
              );
            }))}

            {/* Segment hubs */}
            {segWithGeo.map(s => (
              <g key={"h-" + s.id} filter="url(#soft-shadow)">
                <circle cx={s.sx} cy={s.sy} r="52" fill={s.color} />
                <circle cx={s.sx} cy={s.sy} r="52" fill={`url(#hub-${s.id})`} />
                <text x={s.sx} y={s.sy - 6} textAnchor="middle" fontFamily={Fn} fontSize={11} fontWeight={800} fill="#fff" letterSpacing="0.05em">
                  {s.label.toUpperCase()}
                </text>
                <text x={s.sx} y={s.sy + 10} textAnchor="middle" fontFamily={Fh} fontStyle="italic" fontSize={18} fill="#fff" letterSpacing="-0.02em">
                  ${s.revBn.toFixed(1)}B
                </text>
                <text x={s.sx} y={s.sy + 26} textAnchor="middle" fontFamily={Fn} fontSize={9} fontWeight={700} fill="rgba(255,255,255,0.78)" letterSpacing="0.08em">
                  {s.share}% · {s.opcos.length} OPCOS
                </text>
              </g>
            ))}

            {/* Central DHR hub */}
            <g filter="url(#soft-shadow)">
              <circle cx={cx} cy={cy} r="78" fill={DHR_NAVY} />
              <circle cx={cx} cy={cy} r="78" fill="url(#hub-bio)" opacity="0.4" />
              <text x={cx} y={cy - 18} textAnchor="middle" fontFamily={Fn} fontSize={11} fontWeight={800} fill="rgba(255,255,255,0.78)" letterSpacing="0.18em">DANAHER</text>
              <text x={cx} y={cy + 8} textAnchor="middle" fontFamily={Fh} fontStyle="italic" fontSize={40} fill="#fff" letterSpacing="-0.03em">DHR</text>
              <text x={cx} y={cy + 30} textAnchor="middle" fontFamily={Fn} fontSize={10} fontWeight={700} fill="rgba(255,255,255,0.6)" letterSpacing="0.1em">$24.6B FY25</text>
              <text x={cx} y={cy + 46} textAnchor="middle" fontFamily={Fn} fontSize={9} fontWeight={600} fill="rgba(255,255,255,0.45)" letterSpacing="0.08em">82% RECURRING · 28.2% OPM</text>
            </g>
          </svg>
        </div>
      </div>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <div style={{ marginTop: 18, padding: "12px 18px", background: T.pillBg, borderRadius: T.radius, fontSize: 11, color: T.textTer, fontFamily: Fn, lineHeight: 1.65, fontStyle: "italic" }}>
        Operating-company revenues are analyst estimates — Danaher does not disclose at this level. Pall's life-sciences/biotech franchise was folded into Cytiva in 2022; the Pall Industrial franchise remains a standalone op-co inside the Life Sciences reporting segment. Masimo (announced Feb 2026, closes 2H 2026) is not yet shown.
      </div>
    </div>
  );
}

/* Simple word-wrap helper to keep tag labels readable inside the diagram. */
function wrapLabel(text, maxChars) {
  const words = text.split(" ");
  const lines = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > maxChars) {
      if (cur) lines.push(cur);
      cur = w;
    } else {
      cur = (cur ? cur + " " : "") + w;
    }
  }
  if (cur) lines.push(cur);
  return lines.slice(0, 2);
}
