import { useState, useMemo } from "react";
import { Fn, Fh } from "../../theme";
import { Card, Pill } from "../shared";
import { useMobile } from "../../hooks/useMobile";
import { orgTree, glossary, glossaryCategories, orgMapIntro, productEcon, priceTierLabels, volumeTierLabels } from "../../data/research-tmo-orgmap";
import { ProductIcon, productIconMap } from "./ProductIcons";

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
  const W = 300, H = 220;
  const padL = 64, padR = 12, padT = 28, padB = 40;
  const gridW = W - padL - padR;
  const gridH = H - padT - padB;
  const xFor = (vt) => padL + ((vt - 0.5) / 6) * gridW;
  const yFor = (pt) => padT + ((6 - pt + 0.5) / 6) * gridH;
  const dotX = xFor(econ.volumeTier);
  const dotY = yFor(econ.priceTier);

  return (
    <div style={{ marginTop: 10, padding: "12px 12px", border: `1px solid ${T.border}`, borderRadius: T.radiusSm, background: T.card }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10, flexWrap: "wrap", gap: 6 }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: accent, fontFamily: Fn, letterSpacing: "0.12em", textTransform: "uppercase" }}>Economic profile</div>
        <Pill T={T} color={accent} bg={accent + "14"}>{NATURE_LABEL[econ.nature] || econ.nature}</Pill>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: T.textTer, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 3 }}>Buyer</div>
          <div style={{ fontSize: 12, color: T.text, fontFamily: Fn, lineHeight: 1.45 }}>{econ.customer}</div>
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: T.textTer, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 3 }}>Cadence</div>
          <div style={{ fontSize: 12, color: T.text, fontFamily: Fn, lineHeight: 1.45 }}>{econ.cadence}</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) auto", gap: 14, alignItems: "center" }}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", maxWidth: W }}>
          {/* Axis caption (above chart, horizontal — no rotated text to overlap ticks) */}
          <text x={padL} y={14} fontFamily={Fn} fontSize={9} fontWeight={700} fill={T.textSec} style={{ letterSpacing: "0.08em" }}>↑ PRICE / UNIT</text>

          <rect x={padL} y={padT} width={gridW} height={gridH} fill={T.pillBg} />
          {[1,2,3,4,5].map(i => (
            <g key={"gx-" + i}>
              <line x1={padL + (i/6)*gridW} y1={padT} x2={padL + (i/6)*gridW} y2={padT + gridH} stroke={T.border} strokeWidth={1} />
              <line x1={padL} y1={padT + (i/6)*gridH} x2={padL + gridW} y2={padT + (i/6)*gridH} stroke={T.border} strokeWidth={1} />
            </g>
          ))}
          <rect x={padL} y={padT} width={gridW} height={gridH} fill="none" stroke={T.textTer} strokeWidth={1} />

          {/* Y-axis tick labels — priceTier 1 (cheapest) at the bottom, priceTier 6 (most expensive) at the top */}
          {priceTierLabels.map((lbl, i) => {
            const tier = i + 1;
            return (
              <text key={"yl-" + i} x={padL - 6} y={yFor(tier) + 3} textAnchor="end" fontFamily={Fn} fontSize={8.5} fill={T.textSec}>{lbl}</text>
            );
          })}
          {volumeTierLabels.map((lbl, i) => (
            <text key={"xl-" + i} x={xFor(i + 1)} y={padT + gridH + 12} textAnchor="middle" fontFamily={Fn} fontSize={8.5} fill={T.textSec}>{lbl}</text>
          ))}

          <text x={padL + gridW / 2} y={H - 4} textAnchor="middle" fontFamily={Fn} fontSize={9} fontWeight={700} fill={T.textSec} style={{ letterSpacing: "0.08em" }}>UNITS SOLD / YEAR →</text>

          <circle cx={dotX} cy={dotY} r={14} fill={accent} opacity={0.18} />
          <circle cx={dotX} cy={dotY} r={8} fill={accent} opacity={0.32} />
          <circle cx={dotX} cy={dotY} r={4.5} fill={accent} stroke={T.card} strokeWidth={1.5} />
        </svg>

        <div style={{ display: "grid", gap: 8, minWidth: 100 }}>
          <div>
            <div style={{ fontSize: 9, fontWeight: 700, color: T.textTer, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase" }}>Price/unit</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.text, fontFamily: Fn }}>{priceTierLabels[econ.priceTier - 1]}</div>
          </div>
          <div>
            <div style={{ fontSize: 9, fontWeight: 700, color: T.textTer, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase" }}>Units/year</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.text, fontFamily: Fn }}>{volumeTierLabels[econ.volumeTier - 1]}</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px dashed ${T.border}`, fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.6, fontStyle: "italic" }}>
        {econ.story}
      </div>
      <div style={{ marginTop: 8, fontSize: 9.5, color: T.textTer, fontFamily: Fn, fontStyle: "italic", lineHeight: 1.4 }}>
        Illustrative archetype, not company-reported. Triangulated from public catalogue prices, third-party market studies and sell-side notes.
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
   Radial diagram — TMO at centre, segments at four cardinal
   positions, sub-businesses fanning out in each quadrant.
   ════════════════════════════════════════════════ */
function RadialDiagram({ selectedId, onSelect, T }) {
  const [hov, setHov] = useState(null);
  // Cardinal angles (radians). Top, right, bottom, left.
  const segAngles = { lpbs: -Math.PI / 2, lss: 0, ai: Math.PI / 2, sd: Math.PI };
  // Tighter spread so the outer subs of adjacent segments don't collide at the diagonals.
  const fanSpread = (n) => Math.min(1.1, (n - 1) * 0.25 + 0.45);
  // Strip parenthetical brand suffixes for the diagram label
  // ("Transplant Diagnostics (One Lambda)" → "Transplant Diagnostics").
  const shortLabel = (name) => name.replace(/\s*\([^)]+\)\s*$/, "");

  const W = 760, H = 720;
  const cx = W / 2, cy = H / 2;
  const R_seg = 165;
  const R_sub = 305;

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

  const isSegActive = (id) => selectedId === id || segByAngle.find(s => s.subs.some(sub => sub.id === selectedId))?.id === id || hov === id;
  const isSubActive = (id) => selectedId === id || hov === id;
  const anySelected = selectedId !== null || hov !== null;

  // Gentle bezier curve from segment hub to sub-business
  const curve = (x1, y1, x2, y2) => {
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    const dx = x2 - x1, dy = y2 - y1;
    // Curl control point slightly perpendicular to line for a soft arc
    const px = -dy * 0.10, py = dx * 0.10;
    return `M ${x1} ${y1} Q ${mx + px} ${my + py}, ${x2} ${y2}`;
  };

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      style={{ maxWidth: 760, display: "block", margin: "0 auto", overflow: "visible" }}
    >
      <defs>
        {/* Subtle radial wash giving the diagram a soft centre */}
        <radialGradient id="tmo-bg" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor={T.text} stopOpacity="0.045" />
          <stop offset="65%" stopColor={T.text} stopOpacity="0.018" />
          <stop offset="100%" stopColor={T.text} stopOpacity="0" />
        </radialGradient>
        {/* Soft drop shadow for the segment hubs */}
        <filter id="hub-shadow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="0" dy="2" result="offset" />
          <feComponentTransfer><feFuncA type="linear" slope="0.25" /></feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Per-segment soft gradient used to fill the hub disc */}
        {orgTree.map(seg => (
          <radialGradient key={"hg-" + seg.id} id={`hub-grad-${seg.id}`} cx="35%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.30" />
            <stop offset="55%" stopColor={seg.color} stopOpacity="0" />
          </radialGradient>
        ))}
      </defs>

      {/* Background wash */}
      <circle cx={cx} cy={cy} r={R_sub + 40} fill="url(#tmo-bg)" />

      {/* Faint orbital rings */}
      <circle cx={cx} cy={cy} r={R_seg} fill="none" stroke={T.border} strokeDasharray="3 5" />
      <circle cx={cx} cy={cy} r={R_sub} fill="none" stroke={T.border} strokeDasharray="3 5" />

      {/* Centre → segment connection lines */}
      {segByAngle.map(seg => {
        const active = isSegActive(seg.id);
        return (
          <line
            key={"l-" + seg.id}
            x1={cx} y1={cy} x2={seg.x} y2={seg.y}
            stroke={active ? seg.color : T.border}
            strokeWidth={active ? 2.5 : 1.5}
            strokeLinecap="round"
            style={{ transition: "stroke 0.2s, stroke-width 0.2s" }}
          />
        );
      })}

      {/* Segment → sub-business curves */}
      {segByAngle.map(seg =>
        seg.subs.map(sub => {
          const active = isSubActive(sub.id) || (isSegActive(seg.id) && selectedId === seg.id);
          const dim = anySelected && !active && !(isSegActive(seg.id) && (hov === seg.id || selectedId === seg.id));
          return (
            <path
              key={"sl-" + sub.id}
              d={curve(seg.x, seg.y, sub.sx, sub.sy)}
              fill="none"
              stroke={seg.color}
              strokeWidth={active ? 2 : 1}
              strokeLinecap="round"
              opacity={dim ? 0.18 : (active ? 0.95 : 0.5)}
              style={{ transition: "all 0.2s" }}
            />
          );
        })
      )}

      {/* Sub-business nodes */}
      {segByAngle.map(seg =>
        seg.subs.map(sub => {
          const active = isSubActive(sub.id);
          const dimmed = selectedId && !isSubActive(sub.id) && selectedId !== seg.id && !seg.subs.some(s => s.id === selectedId);
          const labelR = R_sub + 14;
          const lx = cx + labelR * Math.cos(sub.subθ);
          const ly = cy + labelR * Math.sin(sub.subθ);
          const anchor = Math.abs(Math.cos(sub.subθ)) < 0.2 ? "middle" : Math.cos(sub.subθ) > 0 ? "start" : "end";
          return (
            <g
              key={"sub-" + sub.id}
              onClick={() => onSelect(sub.id)}
              onMouseEnter={() => setHov(sub.id)}
              onMouseLeave={() => setHov(null)}
              style={{ cursor: "pointer", opacity: dimmed ? 0.4 : 1, transition: "opacity 0.2s" }}
            >
              {active && (
                <circle cx={sub.sx} cy={sub.sy} r={18} fill={seg.color} opacity={0.18} />
              )}
              <circle
                cx={sub.sx} cy={sub.sy} r={active ? 10 : 7}
                fill={active ? seg.color : seg.color + "1A"}
                stroke={seg.color}
                strokeWidth={2}
                style={{ transition: "all 0.2s" }}
              />
              <text
                x={lx} y={ly}
                textAnchor={anchor}
                dominantBaseline="middle"
                fontFamily={Fn}
                fontSize={11}
                fontWeight={active ? 700 : 500}
                fill={active ? T.text : T.textSec}
                style={{ transition: "all 0.2s", userSelect: "none" }}
              >
                {shortLabel(sub.name)}
              </text>
            </g>
          );
        })
      )}

      {/* Segment hubs */}
      {segByAngle.map(seg => {
        const active = isSegActive(seg.id);
        return (
          <g
            key={"hub-" + seg.id}
            onClick={() => onSelect(seg.id)}
            onMouseEnter={() => setHov(seg.id)}
            onMouseLeave={() => setHov(null)}
            style={{ cursor: "pointer" }}
            filter="url(#hub-shadow)"
          >
            <circle cx={seg.x} cy={seg.y} r={active ? 42 : 36} fill={seg.color} style={{ transition: "all 0.2s" }} />
            {/* highlight overlay gives a subtle glossy 3D feel */}
            <circle cx={seg.x} cy={seg.y} r={active ? 42 : 36} fill={`url(#hub-grad-${seg.id})`} style={{ transition: "all 0.2s" }} />
            <text x={seg.x} y={seg.y - 4} textAnchor="middle" fontFamily={Fn} fontSize={14} fontWeight={800} fill="#fff" style={{ userSelect: "none" }}>{seg.short}</text>
            <text x={seg.x} y={seg.y + 13} textAnchor="middle" fontFamily={Fn} fontSize={11} fontWeight={700} fill="#fff" opacity={0.92} style={{ userSelect: "none" }}>{seg.share}%</text>
          </g>
        );
      })}

      {/* Central TMO node */}
      <g onClick={() => onSelect(null)} style={{ cursor: "pointer" }} filter="url(#hub-shadow)">
        <circle cx={cx} cy={cy} r={48} fill={T.text} />
        <circle cx={cx} cy={cy} r={48} fill="url(#hub-grad-lpbs)" opacity={0.4} />
        <text x={cx} y={cy - 6} textAnchor="middle" fontFamily={Fn} fontSize={15} fontWeight={800} fill={T.card} style={{ userSelect: "none" }}>TMO</text>
        <text x={cx} y={cy + 12} textAnchor="middle" fontFamily={Fn} fontSize={9} fontWeight={600} fill={T.card} opacity={0.75} style={{ userSelect: "none" }}>$44.6B FY25</text>
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
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 10 }}>
                    <ProductIcon id={productIconMap[p.id]} color={accent} size={56} T={T} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: T.text, fontFamily: Fn, marginBottom: 6 }}>{p.name}</div>
                      <RichText text={p.desc} T={T} fontSize={12.5} />
                    </div>
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



      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1.1fr) minmax(0, 1fr)", gap: 24, marginBottom: 28, alignItems: "start" }}>
        <Card T={T} style={{ padding: isMobile ? "16px 12px" : "26px 56px", overflow: "visible", position: isMobile ? "static" : "sticky", top: 16, alignSelf: "start" }}>
          {isMobile
            ? <MobileTreeList selectedId={selectedId} onSelect={setSelectedId} T={T} />
            : <RadialDiagram selectedId={selectedId} onSelect={setSelectedId} T={T} />
          }
        </Card>
        <div>
          <InfoPanel selectedId={selectedId} T={T} />
        </div>
      </div>

      <GlossarySection T={T} />
    </div>
  );
}
