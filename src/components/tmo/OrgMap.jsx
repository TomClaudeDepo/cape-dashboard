import { useState, useMemo } from "react";
import { Fn, Fh } from "../../theme";
import { Card, Pill } from "../shared";
import { useMobile } from "../../hooks/useMobile";
import { orgTree, glossary, glossaryCategories, orgMapIntro, productEcon, priceTierLabels, volumeTierLabels } from "../../data/research-tmo-orgmap";

/* ════════════════════════════════════════════════
   Per-product economics — small "price × volume" scatter
   showing where each end-product sits on a log-log economic plane.
   ════════════════════════════════════════════════ */
const NATURE_LABEL = {
  instrument: "Instrument",
  consumable: "Consumable",
  service: "Service",
  software: "Software",
  platform: "Platform",
};

function ProductEconCard({ econ, accent, T }) {
  if (!econ) return null;
  // Map tier (1-6) → SVG coordinates on a 6x6 grid
  const W = 280, H = 200;
  const padL = 50, padR = 12, padT = 14, padB = 36;
  const gridW = W - padL - padR;
  const gridH = H - padT - padB;
  const xFor = (vt) => padL + ((vt - 0.5) / 6) * gridW;
  const yFor = (pt) => padT + ((6 - pt + 0.5) / 6) * gridH; // top = high price
  const dotX = xFor(econ.volumeTier);
  const dotY = yFor(econ.priceTier);

  return (
    <div style={{ marginTop: 10, padding: "12px 12px", border: `1px solid ${T.border}`, borderRadius: T.radiusSm, background: T.card }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10, flexWrap: "wrap", gap: 6 }}>
        <div style={{ fontSize: 9.5, fontWeight: 800, color: accent, fontFamily: Fn, letterSpacing: "0.12em", textTransform: "uppercase" }}>Economic profile</div>
        <Pill T={T} color={accent} bg={accent + "14"}>{NATURE_LABEL[econ.nature] || econ.nature}</Pill>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 9.5, fontWeight: 700, color: T.textTer, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 3 }}>Buyer</div>
          <div style={{ fontSize: 11.5, color: T.text, fontFamily: Fn, lineHeight: 1.45 }}>{econ.customer}</div>
        </div>
        <div>
          <div style={{ fontSize: 9.5, fontWeight: 700, color: T.textTer, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 3 }}>Cadence</div>
          <div style={{ fontSize: 11.5, color: T.text, fontFamily: Fn, lineHeight: 1.45 }}>{econ.cadence}</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) auto", gap: 14, alignItems: "center" }}>
        {/* Mini scatter diagram */}
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", maxWidth: W }}>
          {/* Quadrant tint backgrounds (subtle diagonal hint) */}
          <rect x={padL} y={padT} width={gridW} height={gridH} fill={T.pillBg} />
          {/* gridlines */}
          {[1,2,3,4,5].map(i => (
            <g key={"gx-" + i}>
              <line x1={padL + (i/6)*gridW} y1={padT} x2={padL + (i/6)*gridW} y2={padT + gridH} stroke={T.border} strokeWidth={1} />
              <line x1={padL} y1={padT + (i/6)*gridH} x2={padL + gridW} y2={padT + (i/6)*gridH} stroke={T.border} strokeWidth={1} />
            </g>
          ))}
          {/* Axis frame */}
          <rect x={padL} y={padT} width={gridW} height={gridH} fill="none" stroke={T.textTer} strokeWidth={1} />

          {/* Y-axis tick labels (price tiers, top→bottom = high→low) */}
          {priceTierLabels.map((lbl, i) => {
            const tier = 6 - i; // index 0 = tier 6 at top
            return (
              <text
                key={"yl-" + i}
                x={padL - 6}
                y={yFor(tier) + 3}
                textAnchor="end"
                fontFamily={Fn}
                fontSize={7.5}
                fill={T.textTer}
              >{lbl}</text>
            );
          })}
          {/* X-axis tick labels (volume tiers) */}
          {volumeTierLabels.map((lbl, i) => (
            <text
              key={"xl-" + i}
              x={xFor(i + 1)}
              y={padT + gridH + 11}
              textAnchor="middle"
              fontFamily={Fn}
              fontSize={7.5}
              fill={T.textTer}
            >{lbl}</text>
          ))}

          {/* Axis titles */}
          <text x={padL - 42} y={padT + gridH / 2} textAnchor="middle" fontFamily={Fn} fontSize={8.5} fontWeight={700} fill={T.textSec} transform={`rotate(-90 ${padL - 42} ${padT + gridH / 2})`} style={{ letterSpacing: "0.08em" }}>PRICE / UNIT →</text>
          <text x={padL + gridW / 2} y={H - 4} textAnchor="middle" fontFamily={Fn} fontSize={8.5} fontWeight={700} fill={T.textSec} style={{ letterSpacing: "0.08em" }}>UNITS SOLD / YEAR →</text>

          {/* Corner archetype labels */}
          <text x={padL + 4} y={padT + 10} fontFamily={Fn} fontSize={7.5} fontStyle="italic" fill={T.textTer}>flagship capex</text>
          <text x={padL + gridW - 4} y={padT + 10} textAnchor="end" fontFamily={Fn} fontSize={7.5} fontStyle="italic" fill={T.textTer}>rare big-ticket</text>
          <text x={padL + 4} y={padT + gridH - 4} fontFamily={Fn} fontSize={7.5} fontStyle="italic" fill={T.textTer}>niche consumable</text>
          <text x={padL + gridW - 4} y={padT + gridH - 4} textAnchor="end" fontFamily={Fn} fontSize={7.5} fontStyle="italic" fill={T.textTer}>mass reagent</text>

          {/* The dot */}
          <circle cx={dotX} cy={dotY} r={14} fill={accent} opacity={0.18} />
          <circle cx={dotX} cy={dotY} r={8} fill={accent} opacity={0.32} />
          <circle cx={dotX} cy={dotY} r={4.5} fill={accent} stroke={T.card} strokeWidth={1.5} />
        </svg>

        {/* Stat strip */}
        <div style={{ display: "grid", gap: 8, minWidth: 96 }}>
          <div>
            <div style={{ fontSize: 8.5, fontWeight: 700, color: T.textTer, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase" }}>Price/unit</div>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: T.text, fontFamily: Fn }}>{priceTierLabels[econ.priceTier - 1]}</div>
          </div>
          <div>
            <div style={{ fontSize: 8.5, fontWeight: 700, color: T.textTer, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase" }}>Units/year</div>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: T.text, fontFamily: Fn }}>{volumeTierLabels[econ.volumeTier - 1]}</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px dashed ${T.border}`, fontSize: 11.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.6, fontStyle: "italic" }}>
        {econ.story}
      </div>
      <div style={{ marginTop: 8, fontSize: 9, color: T.textTer, fontFamily: Fn, fontStyle: "italic", lineHeight: 1.4 }}>
        Illustrative archetype, not company-reported data. Triangulated from public catalogue prices, third-party market studies and sell-side notes.
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   Rich text parser — handles {{key|displayed text}}
   Replaces with dotted-underlined span with hover tooltip
   ════════════════════════════════════════════════ */
function RichText({ text, T, fontSize = 13, color }) {
  const [hov, setHov] = useState(null);
  const parts = useMemo(() => {
    const re = /\{\{([a-zA-Z]+)\|([^}]+)\}\}/g;
    const out = [];
    let lastIdx = 0;
    let m;
    let idx = 0;
    while ((m = re.exec(text)) !== null) {
      if (m.index > lastIdx) out.push({ type: "text", value: text.slice(lastIdx, m.index), i: idx++ });
      out.push({ type: "term", key: m[1], value: m[2], i: idx++ });
      lastIdx = m.index + m[0].length;
    }
    if (lastIdx < text.length) out.push({ type: "text", value: text.slice(lastIdx), i: idx++ });
    return out;
  }, [text]);

  return (
    <span style={{ fontSize, color: color || T.textSec, fontFamily: Fn, lineHeight: 1.7 }}>
      {parts.map(p =>
        p.type === "text" ? (
          <span key={p.i}>{p.value}</span>
        ) : (
          <span
            key={p.i}
            onMouseEnter={() => setHov(p.i)}
            onMouseLeave={() => setHov(null)}
            style={{
              position: "relative",
              borderBottom: `1px dotted ${T.deepBlue}`,
              cursor: "help",
              color: T.text,
              fontWeight: 500,
            }}
          >
            {p.value}
            {hov === p.i && glossary[p.key] && (
              <span
                style={{
                  position: "absolute",
                  bottom: "calc(100% + 8px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 280,
                  padding: "10px 12px",
                  background: T.text,
                  color: T.card,
                  borderRadius: 6,
                  fontSize: 11.5,
                  fontFamily: Fn,
                  lineHeight: 1.55,
                  fontWeight: 400,
                  boxShadow: T.shadowLg,
                  zIndex: 100,
                  pointerEvents: "none",
                  textAlign: "left",
                }}
              >
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: T.textTer, marginBottom: 4 }}>
                  {p.value}
                </div>
                {glossary[p.key]}
                <span
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 0,
                    height: 0,
                    borderLeft: "5px solid transparent",
                    borderRight: "5px solid transparent",
                    borderTop: `5px solid ${T.text}`,
                  }}
                />
              </span>
            )}
          </span>
        )
      )}
    </span>
  );
}

/* ════════════════════════════════════════════════
   Orbital Constellation diagram — TMO at centre, four segment
   hubs at cardinal positions, sub-businesses on an outer orbit,
   curved bezier connections, glowing nodes, drifting dashed orbits,
   faint segment-tinted quadrant wedges, satellite dots for products.
   ════════════════════════════════════════════════ */
function ConstellationDiagram({ selectedId, onSelect, T }) {
  const [hov, setHov] = useState(null);
  // Cardinal angles (radians). Top, right, bottom, left.
  const segAngles = { lpbs: -Math.PI / 2, lss: 0, ai: Math.PI / 2, sd: Math.PI };
  // Angular spread for sub-businesses around each segment angle
  const fanSpread = (n) => Math.min(Math.PI * 0.5, (n - 1) * 0.27 + 0.42);

  const W = 1400, H = 950;
  const cx = W / 2, cy = H / 2;
  const R_seg = 268;   // distance to segment hubs
  const R_sub = 425;   // distance to sub-business nodes

  // Deterministic starfield positions — generated once
  const stars = useMemo(() => {
    const out = [];
    let s = 1337;
    const rand = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 0xffffffff; };
    for (let i = 0; i < 80; i++) {
      const r = 80 + rand() * 380;
      const θ = rand() * Math.PI * 2;
      out.push({ x: cx + r * Math.cos(θ), y: cy + r * Math.sin(θ), s: 0.4 + rand() * 1.4, o: 0.15 + rand() * 0.35 });
    }
    return out;
  }, [cx, cy]);

  const segByAngle = orgTree.map(seg => {
    const θ = segAngles[seg.id];
    const x = cx + R_seg * Math.cos(θ);
    const y = cy + R_seg * Math.sin(θ);
    const spread = fanSpread(seg.children.length);
    const subs = seg.children.map((sub, i) => {
      const subθ = seg.children.length === 1
        ? θ
        : θ - spread / 2 + (spread * i) / (seg.children.length - 1);
      const sx = cx + R_sub * Math.cos(subθ);
      const sy = cy + R_sub * Math.sin(subθ);
      return { ...sub, sx, sy, subθ, segId: seg.id };
    });
    return { ...seg, x, y, θ, subs };
  });

  // Determine highlight state
  const isSegActive = (id) => selectedId === id || segByAngle.find(s => s.subs.some(sub => sub.id === selectedId))?.id === id || hov === id;
  const isSubActive = (id) => selectedId === id || hov === id;
  const anySelected = selectedId !== null || hov !== null;

  // Cubic bezier from (x1,y1) → (x2,y2). Control points pulled toward the centre
  // to make connection arcs sweep gracefully around the hub.
  const curve = (x1, y1, x2, y2, bow = 0.35) => {
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    // Pull control point perpendicular to line, away from origin
    const dx = x2 - x1, dy = y2 - y1;
    const px = -dy * bow, py = dx * bow;
    const c1x = x1 + (mx - x1) * 0.4 + px * 0.25;
    const c1y = y1 + (my - y1) * 0.4 + py * 0.25;
    const c2x = x2 - (x2 - mx) * 0.4 + px * 0.25;
    const c2y = y2 - (y2 - my) * 0.4 + py * 0.25;
    return `M ${x1} ${y1} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${x2} ${y2}`;
  };

  // Quadrant pie wedge from centre, ±π/4 around segment angle, radius = R_sub + 90
  const wedge = (θ, R) => {
    const a1 = θ - Math.PI / 4, a2 = θ + Math.PI / 4;
    const x1 = cx + R * Math.cos(a1), y1 = cy + R * Math.sin(a1);
    const x2 = cx + R * Math.cos(a2), y2 = cy + R * Math.sin(a2);
    return `M ${cx} ${cy} L ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2} Z`;
  };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", margin: "0 auto" }}>
      <defs>
        {/* Per-segment radial gradients for quadrant wash */}
        {orgTree.map(seg => (
          <radialGradient key={"g-" + seg.id} id={`quad-${seg.id}`} cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor={seg.color} stopOpacity="0.00" />
            <stop offset="55%" stopColor={seg.color} stopOpacity="0.04" />
            <stop offset="100%" stopColor={seg.color} stopOpacity="0.11" />
          </radialGradient>
        ))}
        {/* Centre TMO gradient */}
        <radialGradient id="tmo-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={T.text} stopOpacity="1" />
          <stop offset="70%" stopColor={T.text} stopOpacity="1" />
          <stop offset="100%" stopColor={T.text} stopOpacity="0.85" />
        </radialGradient>
        {/* Glow filter — used for hubs on hover/select */}
        <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="strong-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <style>{`
        @keyframes tmo-drift1 { from { stroke-dashoffset: 0; } to { stroke-dashoffset: 120; } }
        @keyframes tmo-drift2 { from { stroke-dashoffset: 120; } to { stroke-dashoffset: 0; } }
        @keyframes tmo-pulse { 0%,100% { opacity: 0.18; } 50% { opacity: 0.42; } }
        @keyframes tmo-twinkle { 0%,100% { opacity: var(--o,0.3); } 50% { opacity: 0.05; } }
        .tmo-orbit-inner { animation: tmo-drift1 80s linear infinite; }
        .tmo-orbit-outer { animation: tmo-drift2 120s linear infinite; }
        .tmo-halo { animation: tmo-pulse 4.5s ease-in-out infinite; }
        .tmo-star { animation: tmo-twinkle 6s ease-in-out infinite; }
      `}</style>

      {/* Quadrant tint washes */}
      {orgTree.map(seg => {
        const θ = segAngles[seg.id];
        const active = isSegActive(seg.id);
        return (
          <path
            key={"q-" + seg.id}
            d={wedge(θ, R_sub + 95)}
            fill={`url(#quad-${seg.id})`}
            opacity={active ? 1 : 0.55}
            style={{ transition: "opacity 0.3s" }}
          />
        );
      })}

      {/* Starfield */}
      {stars.map((st, i) => (
        <circle
          key={"st-" + i}
          className="tmo-star"
          cx={st.x} cy={st.y} r={st.s}
          fill={T.textTer}
          style={{ "--o": st.o, animationDelay: `${(i % 7) * 0.7}s` }}
        />
      ))}

      {/* Orbital rings — dashed, drifting */}
      <circle className="tmo-orbit-inner" cx={cx} cy={cy} r={R_seg} fill="none" stroke={T.border} strokeWidth={1.2} strokeDasharray="4 8" />
      <circle className="tmo-orbit-outer" cx={cx} cy={cy} r={R_sub} fill="none" stroke={T.border} strokeWidth={1.2} strokeDasharray="2 10" />

      {/* TMO halo pulse */}
      <circle className="tmo-halo" cx={cx} cy={cy} r={96} fill={T.text} />

      {/* Centre → segment curved connectors */}
      {segByAngle.map(seg => {
        const active = isSegActive(seg.id);
        return (
          <path
            key={"l-" + seg.id}
            d={curve(cx, cy, seg.x, seg.y, 0.18)}
            fill="none"
            stroke={active ? seg.color : T.border}
            strokeWidth={active ? 3 : 1.6}
            strokeLinecap="round"
            opacity={anySelected && !active ? 0.35 : 1}
            style={{ transition: "all 0.25s" }}
          />
        );
      })}

      {/* Segment → sub-business curved connectors */}
      {segByAngle.map(seg =>
        seg.subs.map(sub => {
          const subActive = isSubActive(sub.id) || (isSegActive(seg.id) && selectedId === seg.id);
          const dim = anySelected && !subActive && !(isSegActive(seg.id) && (hov === seg.id || selectedId === seg.id));
          return (
            <path
              key={"sl-" + sub.id}
              d={curve(seg.x, seg.y, sub.sx, sub.sy, 0.25)}
              fill="none"
              stroke={subActive ? seg.color : seg.color}
              strokeWidth={subActive ? 2.4 : 1.1}
              strokeLinecap="round"
              opacity={dim ? 0.12 : (subActive ? 0.95 : 0.42)}
              style={{ transition: "all 0.25s" }}
            />
          );
        })
      )}

      {/* Sub-business nodes with satellite product dots */}
      {segByAngle.map(seg =>
        seg.subs.map(sub => {
          const active = isSubActive(sub.id);
          const dimmed = anySelected && !active && !(isSegActive(seg.id) && selectedId === seg.id);
          // Position label outside the ring
          const labelR = R_sub + 22;
          const lx = cx + labelR * Math.cos(sub.subθ);
          const ly = cy + labelR * Math.sin(sub.subθ);
          const cos = Math.cos(sub.subθ);
          const anchor = Math.abs(cos) < 0.18 ? "middle" : cos > 0 ? "start" : "end";
          // Satellite product dots — small dots arcing further out, count = product count (capped at 8 visible)
          const prodCount = sub.children ? sub.children.length : 0;
          const visible = Math.min(prodCount, 8);
          const satR = R_sub + (active ? 70 : 56);
          const satSpread = Math.min(0.32, 0.045 * Math.max(visible - 1, 1));
          return (
            <g
              key={"sub-" + sub.id}
              onClick={() => onSelect(sub.id)}
              onMouseEnter={() => setHov(sub.id)}
              onMouseLeave={() => setHov(null)}
              style={{ cursor: "pointer", opacity: dimmed ? 0.32 : 1, transition: "opacity 0.25s" }}
            >
              {/* Satellite product dots */}
              {Array.from({ length: visible }).map((_, i) => {
                const a = visible === 1 ? sub.subθ : sub.subθ - satSpread / 2 + (satSpread * i) / (visible - 1);
                const sx = cx + satR * Math.cos(a);
                const sy = cy + satR * Math.sin(a);
                return (
                  <circle
                    key={"sat-" + sub.id + "-" + i}
                    cx={sx} cy={sy} r={active ? 2.6 : 1.8}
                    fill={seg.color}
                    opacity={active ? 0.95 : 0.55}
                    style={{ transition: "all 0.25s" }}
                  />
                );
              })}

              {/* Outer halo on hover/select */}
              {active && (
                <circle cx={sub.sx} cy={sub.sy} r={20} fill={seg.color} opacity={0.18} />
              )}
              <circle
                cx={sub.sx} cy={sub.sy} r={active ? 12 : 8.5}
                fill={active ? seg.color : T.card}
                stroke={seg.color}
                strokeWidth={2.4}
                filter={active ? "url(#soft-glow)" : undefined}
                style={{ transition: "all 0.25s" }}
              />
              <text
                x={lx} y={ly}
                textAnchor={anchor}
                dominantBaseline="middle"
                fontFamily={Fn}
                fontSize={active ? 13 : 12}
                fontWeight={active ? 700 : 500}
                fill={active ? T.text : T.textSec}
                style={{ transition: "all 0.2s", userSelect: "none" }}
              >
                {sub.name}
              </text>
              {prodCount > 0 && (
                <text
                  x={lx} y={ly + 15}
                  textAnchor={anchor}
                  dominantBaseline="middle"
                  fontFamily={Fn}
                  fontSize={9.5}
                  fontWeight={600}
                  fill={T.textTer}
                  style={{ userSelect: "none", letterSpacing: "0.04em" }}
                >
                  {prodCount} product{prodCount === 1 ? "" : "s"}
                </text>
              )}
            </g>
          );
        })
      )}

      {/* Segment hubs */}
      {segByAngle.map(seg => {
        const active = isSegActive(seg.id);
        const r = active ? 56 : 48;
        return (
          <g
            key={"hub-" + seg.id}
            onClick={() => onSelect(seg.id)}
            onMouseEnter={() => setHov(seg.id)}
            onMouseLeave={() => setHov(null)}
            style={{ cursor: "pointer" }}
          >
            {/* outer soft halo */}
            <circle cx={seg.x} cy={seg.y} r={r + 16} fill={seg.color} opacity={active ? 0.22 : 0.10} style={{ transition: "all 0.25s" }} />
            <circle cx={seg.x} cy={seg.y} r={r + 6} fill={seg.color} opacity={active ? 0.32 : 0.18} style={{ transition: "all 0.25s" }} />
            <circle
              cx={seg.x} cy={seg.y} r={r}
              fill={seg.color}
              filter={active ? "url(#strong-glow)" : undefined}
              style={{ transition: "all 0.25s" }}
            />
            <text x={seg.x} y={seg.y - 9} textAnchor="middle" fontFamily={Fn} fontSize={18} fontWeight={800} fill="#fff" style={{ userSelect: "none", letterSpacing: "0.04em" }}>{seg.short}</text>
            <text x={seg.x} y={seg.y + 11} textAnchor="middle" fontFamily={Fn} fontSize={12} fontWeight={700} fill="#fff" opacity={0.92} style={{ userSelect: "none" }}>{seg.share}%</text>
            <text x={seg.x} y={seg.y + 26} textAnchor="middle" fontFamily={Fn} fontSize={9.5} fontWeight={600} fill="#fff" opacity={0.7} style={{ userSelect: "none", letterSpacing: "0.06em" }}>{seg.revenue}</text>
          </g>
        );
      })}

      {/* Central TMO node with double-ring halo */}
      <g onClick={() => onSelect(null)} style={{ cursor: "pointer" }}>
        <circle cx={cx} cy={cy} r={86} fill={T.text} opacity={0.06} />
        <circle cx={cx} cy={cy} r={72} fill={T.text} opacity={0.10} />
        <circle cx={cx} cy={cy} r={62} fill="url(#tmo-core)" />
        <text x={cx} y={cy - 10} textAnchor="middle" fontFamily={Fh} fontStyle="italic" fontSize={26} fontWeight={700} fill={T.card} style={{ userSelect: "none" }}>TMO</text>
        <text x={cx} y={cy + 13} textAnchor="middle" fontFamily={Fn} fontSize={11} fontWeight={700} fill={T.card} opacity={0.78} style={{ userSelect: "none", letterSpacing: "0.06em" }}>$44.6B FY25</text>
        <text x={cx} y={cy + 28} textAnchor="middle" fontFamily={Fn} fontSize={9} fontWeight={600} fill={T.card} opacity={0.5} style={{ userSelect: "none", letterSpacing: "0.12em" }}>4 SEGMENTS</text>
      </g>
    </svg>
  );
}

/* ════════════════════════════════════════════════
   Info panel — shows the selected node, with full
   plain-English explanation and product breakdown.
   ════════════════════════════════════════════════ */
function InfoPanel({ selectedId, T }) {
  // Find what's selected: segment, sub-business, or null
  const found = useMemo(() => {
    if (!selectedId) return null;
    for (const seg of orgTree) {
      if (seg.id === selectedId) return { type: "segment", seg };
      for (const sub of seg.children) {
        if (sub.id === selectedId) return { type: "sub", seg, sub };
      }
    }
    return null;
  }, [selectedId]);

  if (!found) {
    return (
      <Card T={T} style={{ padding: "28px 28px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
          How to use
        </div>
        <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: "0 0 16px" }}>
          Click any segment hub (the four large coloured circles) to read what that part of the business does. Click any sub-business node (the smaller circles further out) to drill into its specific product lines.
        </p>
        <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: "0 0 16px" }}>
          Technical terms in every description carry a <span style={{ borderBottom: `1px dotted ${T.deepBlue}`, color: T.text, fontWeight: 500 }}>dotted underline</span> — hover over them for a plain-English definition. The full categorised glossary sits below the diagram.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
          {orgTree.map(s => (
            <Pill key={s.id} T={T} color={s.color} bg={s.color + "14"}>{s.short} · {s.share}%</Pill>
          ))}
        </div>
      </Card>
    );
  }

  const { type, seg, sub } = found;
  const accent = seg.color;
  const accentBg = accent + "14";

  if (type === "segment") {
    return (
      <Card T={T} style={{ padding: 0, borderTop: `4px solid ${accent}` }}>
        <div style={{ padding: "22px 26px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
            <Pill T={T} color={accent} bg={accentBg}>Segment</Pill>
            <span style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, fontWeight: 600 }}>{seg.share}% of revenue · {seg.revenue} FY2025</span>
          </div>
          <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 24, color: T.text, marginBottom: 16 }}>{seg.name}</div>

          <div style={{ fontSize: 10, fontWeight: 800, color: accent, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Plain English</div>
          <p style={{ fontSize: 13.5, color: T.text, fontFamily: Fn, lineHeight: 1.8, margin: "0 0 18px" }}>{seg.plainEnglish}</p>

          <div style={{ fontSize: 10, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Reporting definition</div>
          <RichText text={seg.description} T={T} />

          <div style={{ marginTop: 22, paddingTop: 18, borderTop: "1px solid " + T.border }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Sub-businesses ({seg.children.length})</div>
            <div style={{ display: "grid", gap: 8 }}>
              {seg.children.map(sub => (
                <div key={sub.id} style={{ padding: "12px 14px", background: T.pillBg, borderRadius: T.radiusSm, borderLeft: `3px solid ${accent}` }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>{sub.name}</div>
                  <div style={{ fontSize: 11.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.6 }}>{sub.plainEnglish.slice(0, 180)}{sub.plainEnglish.length > 180 ? "…" : ""}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 10, fontSize: 11, color: T.textTer, fontFamily: Fn, fontStyle: "italic" }}>
              Click a sub-business node on the diagram to see its full product line.
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Sub-business view
  return (
    <Card T={T} style={{ padding: 0, borderTop: `4px solid ${accent}` }}>
      <div style={{ padding: "22px 26px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
          <Pill T={T} color={accent} bg={accentBg}>{seg.short}</Pill>
          <span style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, fontWeight: 600 }}>Sub-business</span>
        </div>
        <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 22, color: T.text, marginBottom: 16, lineHeight: 1.2 }}>{sub.name}</div>

        <div style={{ fontSize: 10, fontWeight: 800, color: accent, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>What it actually does</div>
        <p style={{ fontSize: 13.5, color: T.text, fontFamily: Fn, lineHeight: 1.8, margin: "0 0 18px" }}>{sub.plainEnglish}</p>

        <div style={{ fontSize: 10, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Reporting definition</div>
        <div style={{ marginBottom: 22 }}>
          <RichText text={sub.description} T={T} />
        </div>

        {sub.children && sub.children.length > 0 && (
          <div style={{ paddingTop: 18, borderTop: "1px solid " + T.border }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
              Product lines & brands ({sub.children.length})
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              {sub.children.map(p => (
                <div key={p.id} style={{ padding: "14px 16px", background: T.card, border: "1px solid " + T.border, borderRadius: T.radiusSm, borderLeft: `3px solid ${accent}` }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.text, fontFamily: Fn, marginBottom: 8 }}>{p.name}</div>
                  <div style={{ marginBottom: 10 }}>
                    <RichText text={p.desc} T={T} fontSize={12.5} />
                  </div>
                  <div style={{ padding: "8px 10px", background: accentBg, borderRadius: 4, fontSize: 11.5, color: T.text, fontFamily: Fn, lineHeight: 1.6 }}>
                    <span style={{ fontWeight: 700, color: accent, letterSpacing: "0.04em", textTransform: "uppercase", fontSize: 9, marginRight: 8 }}>In plain English</span>
                    {p.plain}
                  </div>
                  <ProductEconCard econ={productEcon[p.id]} accent={accent} T={T} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

/* ════════════════════════════════════════════════
   Categorised glossary section
   ════════════════════════════════════════════════ */
function GlossarySection({ T }) {
  const [openCat, setOpenCat] = useState(null);

  return (
    <Card T={T} style={{ padding: "22px 26px" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 6, flexWrap: "wrap", gap: 8 }}>
        <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 22, color: T.text }}>Glossary</div>
        <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn }}>All technical terms used in the org map, grouped by domain. Click a category to expand.</div>
      </div>
      <div style={{ display: "grid", gap: 8, marginTop: 16 }}>
        {glossaryCategories.map(cat => {
          const open = openCat === cat.title;
          return (
            <div key={cat.title} style={{ border: "1px solid " + T.border, borderRadius: T.radiusSm, overflow: "hidden" }}>
              <div
                onClick={() => setOpenCat(open ? null : cat.title)}
                style={{ padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", background: open ? T.pillBg : "transparent" }}
              >
                <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn }}>{cat.title}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, fontWeight: 600 }}>{cat.keys.length} terms</span>
                  <span style={{ fontSize: 14, color: T.textTer, transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>▾</span>
                </div>
              </div>
              {open && (
                <div style={{ padding: "8px 16px 16px", display: "grid", gap: 10 }}>
                  {cat.keys.filter(k => glossary[k]).map(k => (
                    <div key={k} style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 14, paddingTop: 8, borderTop: "1px dashed " + T.border }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: T.text, fontFamily: Fn, paddingTop: 2 }}>
                        {k.toUpperCase().replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")}
                      </div>
                      <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.65 }}>{glossary[k]}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

/* ════════════════════════════════════════════════
   Mobile-friendly accordion fallback for very narrow screens
   ════════════════════════════════════════════════ */
function MobileTreeList({ selectedId, onSelect, T }) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {orgTree.map(seg => (
        <Card key={seg.id} T={T} style={{ padding: 0, overflow: "hidden", borderLeft: `4px solid ${seg.color}` }}>
          <div onClick={() => onSelect(seg.id)} style={{ padding: "14px 16px", cursor: "pointer", background: selectedId === seg.id ? seg.color + "0d" : "transparent" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.text, fontFamily: Fn }}>{seg.name}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: seg.color, fontFamily: Fn }}>{seg.share}% · {seg.revenue}</div>
            </div>
          </div>
          <div style={{ display: "grid", gap: 2, padding: "0 10px 10px" }}>
            {seg.children.map(sub => (
              <div
                key={sub.id}
                onClick={() => onSelect(sub.id)}
                style={{ padding: "10px 12px", background: selectedId === sub.id ? seg.color + "14" : T.pillBg, borderRadius: 6, cursor: "pointer", fontSize: 12, color: T.text, fontFamily: Fn, fontWeight: selectedId === sub.id ? 700 : 500, display: "flex", alignItems: "center", justifyContent: "space-between" }}
              >
                <span>{sub.name}</span>
                {sub.children && <span style={{ fontSize: 10, color: T.textTer, fontWeight: 600 }}>{sub.children.length}</span>}
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════
   Main exported component
   ════════════════════════════════════════════════ */
export default function OrgMap({ T }) {
  const [selectedId, setSelectedId] = useState(null);
  const isMobile = useMobile(900);

  return (
    <div>
      <p style={{ fontSize: 13.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.8, margin: "0 0 22px" }}>{orgMapIntro}</p>

      {/* Segment legend strip — gives non-experts a key to the short codes used inside the diagram */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 22 }}>
        {orgTree.map(seg => {
          const isActiveSeg = selectedId === seg.id || seg.children.some(c => c.id === selectedId);
          return (
            <div
              key={"leg-" + seg.id}
              onClick={() => setSelectedId(seg.id)}
              style={{
                background: T.card,
                border: `1px solid ${isActiveSeg ? seg.color : T.border}`,
                borderTop: `3px solid ${seg.color}`,
                borderRadius: T.radiusSm,
                padding: "12px 14px",
                cursor: "pointer",
                boxShadow: isActiveSeg ? T.shadow : "none",
                transition: "all 0.15s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <div style={{ background: seg.color, color: "#fff", fontSize: 10, fontWeight: 800, fontFamily: Fn, padding: "2px 7px", borderRadius: 4, letterSpacing: "0.04em" }}>{seg.short}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: seg.color, fontFamily: Fn }}>{seg.revenue}</div>
                <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, fontWeight: 600 }}>· {seg.share}%</div>
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: Fn, lineHeight: 1.35 }}>{seg.name}</div>
            </div>
          );
        })}
      </div>

      {isMobile ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20, marginBottom: 28 }}>
          <Card T={T} style={{ padding: "16px 12px", overflow: "hidden" }}>
            <MobileTreeList selectedId={selectedId} onSelect={setSelectedId} T={T} />
          </Card>
          <InfoPanel selectedId={selectedId} T={T} />
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24, marginBottom: 28 }}>
          <Card T={T} style={{ padding: "8px 8px 0", overflow: "hidden", position: "relative" }}>
            {/* Floating hint overlay */}
            <div style={{ position: "absolute", top: 18, left: 22, zIndex: 2, pointerEvents: "none" }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.14em", textTransform: "uppercase" }}>Orbital Constellation</div>
              <div style={{ fontSize: 11.5, color: T.textSec, fontFamily: Fn, marginTop: 4, maxWidth: 280, lineHeight: 1.5 }}>
                Centre is TMO. Four coloured hubs are the reporting segments. Outer ring shows their sub-businesses. Tiny dots beyond each sub-business indicate how many product lines sit underneath. Click anything.
              </div>
            </div>
            <div style={{ position: "absolute", top: 18, right: 22, zIndex: 2, pointerEvents: "none", textAlign: "right" }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.14em", textTransform: "uppercase" }}>FY2025</div>
              <div style={{ fontSize: 22, fontFamily: Fh, fontStyle: "italic", color: T.text, lineHeight: 1, marginTop: 4 }}>$44.6B</div>
              <div style={{ fontSize: 10.5, color: T.textTer, fontFamily: Fn, marginTop: 4, fontWeight: 600, letterSpacing: "0.04em" }}>Reported revenue · 4 segments · 15 sub-businesses</div>
            </div>
            <ConstellationDiagram selectedId={selectedId} onSelect={setSelectedId} T={T} />
          </Card>
          <InfoPanel selectedId={selectedId} T={T} />
        </div>
      )}

      <GlossarySection T={T} />
    </div>
  );
}
