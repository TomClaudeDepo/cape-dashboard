import { useState, useMemo } from "react";
import { Fn, Fh } from "../../theme";
import { Card, Pill } from "../shared";
import { ProductIcon } from "./ProductIcons";
import {
  facts, pricePeSeries, chartAnnotations, sectorStats,
  bioprocPrimer, players, playerInsight,
  blaMoat, catalysts, conclusion,
  cyclePhases, sectorVsSpxSeries, adoptionSeries,
  shareEvolution, capexCommitments, capexTotal,
} from "../../data/research-tmo-sector-brief";

/* ════════════════════════════════════════════════
   Dual-axis PRICE × P/E chart
   Left axis = TMO close ($). Right axis = NTM P/E (x).
   ════════════════════════════════════════════════ */
function PricePEChart({ T }) {
  const [hov, setHov] = useState(null);
  const data = pricePeSeries;
  const W = 1000, H = 380;
  const padL = 62, padR = 62, padT = 36, padB = 50;
  const gridW = W - padL - padR;
  const gridH = H - padT - padB;

  const prices = data.map(d => d.price);
  const pes    = data.map(d => d.pe);
  const pMin = Math.floor(Math.min(...prices) / 50) * 50 - 50;
  const pMax = Math.ceil(Math.max(...prices) / 50) * 50;
  const peMin = Math.floor(Math.min(...pes) / 5) * 5 - 2;
  const peMax = Math.ceil(Math.max(...pes) / 5) * 5 + 2;

  const xFor  = (i) => padL + (i / (data.length - 1)) * gridW;
  const yPrice = (v) => padT + gridH - ((v - pMin) / (pMax - pMin)) * gridH;
  const yPe    = (v) => padT + gridH - ((v - peMin) / (peMax - peMin)) * gridH;

  const priceColor = "#1D4ED8";
  const peColor    = "#EA580C";

  // Grid Y ticks
  const priceTicks = useMemo(() => {
    const step = 100;
    const t = [];
    for (let v = Math.ceil(pMin / step) * step; v <= pMax; v += step) t.push(v);
    return t;
  }, [pMin, pMax]);
  const peTicks = useMemo(() => {
    const step = 5;
    const t = [];
    for (let v = Math.ceil(peMin / step) * step; v <= peMax; v += step) t.push(v);
    return t;
  }, [peMin, peMax]);

  // Annotation index lookup
  const annotMap = chartAnnotations.reduce((acc, a) => {
    const idx = data.findIndex(d => d.q === a.q);
    if (idx >= 0) acc[idx] = a;
    return acc;
  }, {});

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", overflow: "visible" }}>
      {/* Y gridlines (priced on the left axis) */}
      {priceTicks.map((v, i) => (
        <line key={"pg-" + i} x1={padL} y1={yPrice(v)} x2={padL + gridW} y2={yPrice(v)} stroke={T.border} strokeWidth={1} />
      ))}

      {/* Y-axis labels — PRICE (left) */}
      {priceTicks.map((v, i) => (
        <text key={"pl-" + i} x={padL - 8} y={yPrice(v) + 3} textAnchor="end" fontFamily={Fn} fontSize={10} fill={priceColor}>${v}</text>
      ))}
      {/* Y-axis labels — P/E (right) */}
      {peTicks.map((v, i) => (
        <text key={"el-" + i} x={padL + gridW + 8} y={yPe(v) + 3} textAnchor="start" fontFamily={Fn} fontSize={10} fill={peColor}>{v}x</text>
      ))}

      {/* X-axis */}
      <line x1={padL} y1={padT + gridH} x2={padL + gridW} y2={padT + gridH} stroke={T.textTer} strokeWidth={1} />
      {data.map((d, i) => {
        // Every 4th label, plus last point
        const showLabel = i % 4 === 0 || i === data.length - 1;
        return (
          <g key={"x-" + i}>
            <line x1={xFor(i)} y1={padT + gridH} x2={xFor(i)} y2={padT + gridH + 4} stroke={T.textTer} />
            {showLabel && (
              <text x={xFor(i)} y={padT + gridH + 18} textAnchor="middle" fontFamily={Fn} fontSize={10.5} fontWeight={hov === i ? 700 : 500} fill={hov === i ? T.text : T.textSec}>{d.q}</text>
            )}
          </g>
        );
      })}

      {/* Axis titles */}
      <text x={padL} y={padT - 14} fontFamily={Fn} fontSize={11} fontWeight={800} fill={priceColor} letterSpacing="0.06em">TMO PRICE (left axis, $)</text>
      <text x={padL + gridW} y={padT - 14} textAnchor="end" fontFamily={Fn} fontSize={11} fontWeight={800} fill={peColor} letterSpacing="0.06em">NTM FORWARD P/E (right axis, x)</text>

      {/* Price area (subtle fill under line) */}
      <path
        d={`M ${xFor(0)} ${padT + gridH} ${data.map((d, i) => `L ${xFor(i)} ${yPrice(d.price)}`).join(" ")} L ${xFor(data.length - 1)} ${padT + gridH} Z`}
        fill={priceColor}
        opacity={0.06}
      />

      {/* P/E line */}
      <polyline
        points={data.map((d, i) => `${xFor(i)},${yPe(d.pe)}`).join(" ")}
        fill="none"
        stroke={peColor}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="0"
      />

      {/* Price line */}
      <polyline
        points={data.map((d, i) => `${xFor(i)},${yPrice(d.price)}`).join(" ")}
        fill="none"
        stroke={priceColor}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 1px 3px ${priceColor}55)` }}
      />

      {/* Annotation pins */}
      {Object.entries(annotMap).map(([idxStr, a]) => {
        const idx = +idxStr;
        const cx = xFor(idx);
        const cy = yPrice(data[idx].price);
        const above = idx < data.length - 2;
        const ly = above ? cy - 32 : cy - 32;
        return (
          <g key={"a-" + idxStr}>
            <line x1={cx} y1={cy} x2={cx} y2={ly + 8} stroke={a.color} strokeWidth={1} strokeDasharray="2 2" />
            <circle cx={cx} cy={cy} r={6} fill={a.color} stroke="#fff" strokeWidth={2} />
            <rect x={cx - 70} y={ly - 18} width={140} height={28} rx={4} fill={a.color} />
            <text x={cx} y={ly - 1} textAnchor="middle" fontFamily={Fn} fontSize={10} fontWeight={700} fill="#fff">{a.label}</text>
          </g>
        );
      })}

      {/* Dots */}
      {data.map((d, i) => (
        <g key={"d-" + i}>
          <circle cx={xFor(i)} cy={yPrice(d.price)} r={hov === i ? 6 : 3.5} fill={priceColor} stroke="#fff" strokeWidth={1.5} style={{ transition: "r 0.15s" }} />
          <circle cx={xFor(i)} cy={yPe(d.pe)}       r={hov === i ? 5 : 3}   fill={peColor}    stroke="#fff" strokeWidth={1.5} style={{ transition: "r 0.15s" }} />
        </g>
      ))}

      {/* Hover overlay */}
      {data.map((d, i) => (
        <rect
          key={"h-" + i}
          x={xFor(i) - gridW / data.length / 2}
          y={padT}
          width={gridW / data.length}
          height={gridH}
          fill="transparent"
          onMouseEnter={() => setHov(i)}
          onMouseLeave={() => setHov(null)}
        />
      ))}

      {/* Tooltip */}
      {hov !== null && (() => {
        const d = data[hov];
        const x = xFor(hov);
        const tipW = 150, tipH = 60;
        const tipX = x + 10 + tipW > padL + gridW ? x - 10 - tipW : x + 10;
        const tipY = padT + 4;
        return (
          <g style={{ pointerEvents: "none" }}>
            <line x1={x} y1={padT} x2={x} y2={padT + gridH} stroke={T.textTer} strokeWidth={1} strokeDasharray="2 3" opacity={0.5} />
            <rect x={tipX} y={tipY} width={tipW} height={tipH} rx={6} fill={T.text} opacity={0.96} />
            <text x={tipX + 10} y={tipY + 16} fontFamily={Fn} fontSize={10} fontWeight={800} fill={T.card} letterSpacing="0.06em">{d.q}</text>
            <text x={tipX + 10} y={tipY + 33} fontFamily={Fn} fontSize={11} fill={T.card}>
              <tspan fill={priceColor} fontWeight={700}>${d.price}</tspan> <tspan opacity={0.7}>price</tspan>
            </text>
            <text x={tipX + 10} y={tipY + 50} fontFamily={Fn} fontSize={11} fill={T.card}>
              <tspan fill={peColor} fontWeight={700}>{d.pe}x</tspan> <tspan opacity={0.7}>P/E NTM</tspan>
            </text>
          </g>
        );
      })()}
    </svg>
  );
}

/* ════════════════════════════════════════════════
   4-PLAYER share — stacked horizontal bar + chips
   ════════════════════════════════════════════════ */
function PlayerShareBar({ T }) {
  return (
    <div>
      <div style={{ display: "flex", height: 44, borderRadius: 8, overflow: "hidden", marginBottom: 14, boxShadow: T.shadow }}>
        {players.map(p => (
          <div key={p.name} style={{
            flex: p.share,
            background: p.color,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontFamily: Fn,
            position: "relative",
          }} title={`${p.name}: ${p.share}%`}>
            <div style={{ textAlign: "center", padding: "0 8px" }}>
              <div style={{ fontSize: 11, fontWeight: 800, opacity: 0.9, letterSpacing: "0.04em" }}>{p.name.toUpperCase()}</div>
              <div style={{ fontSize: 14, fontWeight: 800 }}>{p.share}%</div>
            </div>
            {p.isHero && (
              <div style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", background: "#fff", color: p.color, fontSize: 8.5, fontWeight: 800, padding: "1px 6px", borderRadius: 3, letterSpacing: "0.04em", boxShadow: T.shadow }}>TMO</div>
            )}
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
        {players.map(p => (
          <div key={p.name} style={{ padding: "12px 14px", border: `1px solid ${p.color}33`, borderLeft: `3px solid ${p.color}`, borderRadius: 6, background: p.isHero ? p.color + "0F" : T.card }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: T.text, fontFamily: Fn }}>{p.name}</span>
              <span style={{ fontSize: 11, fontWeight: 800, color: p.color, fontFamily: Fn }}>{p.share}%</span>
            </div>
            <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginBottom: 6 }}>{p.parent}</div>
            <div style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.55 }}>{p.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   CYCLE STRIP — where we are right now
   ════════════════════════════════════════════════ */
function CycleStrip({ T }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, marginTop: 20, paddingTop: 20 }}>
      {cyclePhases.map((p, i) => {
        const isCurrent = p.state === "current";
        const isPast = p.state === "past";
        return (
          <div key={p.id} style={{ position: "relative" }}>
            {isCurrent && (
              <div style={{ position: "absolute", top: -22, left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap", fontSize: 9.5, fontWeight: 800, color: T.capRed, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                ★ You are here
              </div>
            )}
            <div style={{
              padding: "16px 12px",
              background: isCurrent ? p.color : T.card,
              border: `1px solid ${isCurrent ? p.color : T.border}`,
              borderRadius: 8,
              color: isCurrent ? "#fff" : isPast ? T.textSec : T.textTer,
              opacity: isPast ? 0.7 : 1,
              textAlign: "center",
              boxShadow: isCurrent ? `0 8px 22px ${p.color}55` : "none",
              transform: isCurrent ? "translateY(-4px)" : "none",
              transition: "all 0.2s",
            }}>
              <div style={{ fontSize: 24, marginBottom: 4, fontWeight: 700 }}>{p.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 700, fontFamily: Fn, lineHeight: 1.2, marginBottom: 4 }}>{p.label}</div>
              <div style={{ fontSize: 9.5, fontFamily: Fn, opacity: 0.85, letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600 }}>{p.span}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ════════════════════════════════════════════════
   SECTOR vs S&P 500 — 15-year relative P/E
   ════════════════════════════════════════════════ */
function SectorVsSpx({ T }) {
  const data = sectorVsSpxSeries;
  const W = 1000, H = 280;
  const padL = 58, padR = 18, padT = 22, padB = 38;
  const gridW = W - padL - padR;
  const gridH = H - padT - padB;

  const yMin = 0.7, yMax = 1.65;
  const xFor = (i) => padL + (i / (data.length - 1)) * gridW;
  const yFor = (v) => padT + gridH - ((v - yMin) / (yMax - yMin)) * gridH;
  const lineColor = "#1D4ED8";

  const lastV = data[data.length - 1].rel;
  const peakV = Math.max(...data.map(d => d.rel));

  // Build polyline points
  const pts = data.map((d, i) => `${xFor(i)},${yFor(d.rel)}`).join(" ");
  // Path for >1 (premium) area
  const aboveArea = `M ${xFor(0)} ${yFor(1)} ${data.map((d, i) => `L ${xFor(i)} ${yFor(Math.max(d.rel, 1))}`).join(" ")} L ${xFor(data.length - 1)} ${yFor(1)} Z`;
  const belowArea = `M ${xFor(0)} ${yFor(1)} ${data.map((d, i) => `L ${xFor(i)} ${yFor(Math.min(d.rel, 1))}`).join(" ")} L ${xFor(data.length - 1)} ${yFor(1)} Z`;

  const yTicks = [0.8, 1.0, 1.2, 1.4, 1.6];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", overflow: "visible" }}>
      {/* Grid */}
      {yTicks.map(v => (
        <line key={"g-" + v} x1={padL} y1={yFor(v)} x2={padL + gridW} y2={yFor(v)} stroke={T.border} strokeWidth={1} />
      ))}
      {/* Y labels */}
      {yTicks.map(v => (
        <text key={"yl-" + v} x={padL - 8} y={yFor(v) + 3} textAnchor="end" fontFamily={Fn} fontSize={10} fill={v === 1 ? T.text : T.textSec} fontWeight={v === 1 ? 700 : 500}>{v.toFixed(1)}x</text>
      ))}
      {/* X labels */}
      {data.map((d, i) => (i % 2 === 0 || i === data.length - 1) && (
        <text key={"xl-" + i} x={xFor(i)} y={padT + gridH + 18} textAnchor="middle" fontFamily={Fn} fontSize={10} fill={T.textSec}>{d.year}</text>
      ))}

      {/* Premium / Discount shading */}
      <path d={aboveArea} fill="#10B981" opacity={0.10} />
      <path d={belowArea} fill="#EF4444" opacity={0.10} />

      {/* Parity reference line */}
      <line x1={padL} y1={yFor(1)} x2={padL + gridW} y2={yFor(1)} stroke={T.text} strokeWidth={1.2} strokeDasharray="4 3" opacity={0.6} />
      <text x={padL + 6} y={yFor(1) - 6} fontFamily={Fn} fontSize={10} fontWeight={700} fill={T.text}>PARITY · 1.0x</text>

      {/* Main line */}
      <polyline points={pts} fill="none" stroke={lineColor} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" style={{ filter: `drop-shadow(0 1px 3px ${lineColor}55)` }} />

      {/* Peak marker */}
      {(() => {
        const peakIdx = data.findIndex(d => d.rel === peakV);
        return (
          <g>
            <circle cx={xFor(peakIdx)} cy={yFor(peakV)} r={6} fill="#10B981" stroke="#fff" strokeWidth={2} />
            <text x={xFor(peakIdx)} y={yFor(peakV) - 12} textAnchor="middle" fontFamily={Fn} fontSize={10.5} fontWeight={700} fill="#059669">PEAK · {peakV.toFixed(2)}x</text>
          </g>
        );
      })()}

      {/* Current marker */}
      {(() => {
        const last = data.length - 1;
        return (
          <g>
            <circle cx={xFor(last)} cy={yFor(lastV)} r={6} fill={T.capRed} stroke="#fff" strokeWidth={2} />
            <text x={xFor(last)} y={yFor(lastV) + 22} textAnchor="end" fontFamily={Fn} fontSize={10.5} fontWeight={700} fill={T.capRed}>15-YR LOW · {lastV.toFixed(2)}x</text>
          </g>
        );
      })()}

      {/* Title */}
      <text x={padL} y={14} fontFamily={Fn} fontSize={11} fontWeight={800} fill={T.textTer} letterSpacing="0.08em">TOOLS SECTOR P/E ÷ S&P 500 P/E · NTM, 2010 → 2026</text>
    </svg>
  );
}

/* ════════════════════════════════════════════════
   ADOPTION CURVE — stainless steel → single-use
   ════════════════════════════════════════════════ */
function AdoptionCurve({ T }) {
  const data = adoptionSeries;
  const W = 1000, H = 260;
  const padL = 50, padR = 60, padT = 28, padB = 40;
  const gridW = W - padL - padR;
  const gridH = H - padT - padB;

  const xFor = (i) => padL + (i / (data.length - 1)) * gridW;
  const yFor = (v) => padT + gridH - (v / 100) * gridH;

  const singleColor = "#059669";
  const steelColor  = "#94A3B8";

  const currentIdx = data.findIndex(d => d.current);
  const estStartIdx = data.findIndex(d => d.est);

  const singleHistPts = data.slice(0, estStartIdx).map((d, i) => `${xFor(i)},${yFor(d.single)}`).join(" ");
  const singleEstPts  = data.slice(estStartIdx - 1).map((d, i) => `${xFor(i + estStartIdx - 1)},${yFor(d.single)}`).join(" ");
  const steelHistPts  = data.slice(0, estStartIdx).map((d, i) => `${xFor(i)},${yFor(d.steel)}`).join(" ");
  const steelEstPts   = data.slice(estStartIdx - 1).map((d, i) => `${xFor(i + estStartIdx - 1)},${yFor(d.steel)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", overflow: "visible" }}>
      {/* Grid */}
      {[0, 25, 50, 75, 100].map(v => (
        <g key={v}>
          <line x1={padL} y1={yFor(v)} x2={padL + gridW} y2={yFor(v)} stroke={T.border} strokeWidth={1} />
          <text x={padL - 6} y={yFor(v) + 3} textAnchor="end" fontFamily={Fn} fontSize={10} fill={T.textSec}>{v}%</text>
        </g>
      ))}

      {/* X labels */}
      {data.map((d, i) => (i % 3 === 0 || i === data.length - 1) && (
        <text key={"xl-" + i} x={xFor(i)} y={padT + gridH + 18} textAnchor="middle" fontFamily={Fn} fontSize={10} fill={T.textSec}>{d.year}</text>
      ))}

      {/* Vertical separator at est start */}
      <line x1={xFor(estStartIdx - 0.5)} y1={padT} x2={xFor(estStartIdx - 0.5)} y2={padT + gridH} stroke={T.textTer} strokeDasharray="3 3" opacity={0.6} />
      <text x={xFor(estStartIdx - 0.5)} y={padT - 6} textAnchor="middle" fontFamily={Fn} fontSize={9.5} fontWeight={700} fill={T.textTer} letterSpacing="0.06em">FORECAST →</text>

      {/* Lines — historical (solid) + forecast (dashed) */}
      <polyline points={singleHistPts} fill="none" stroke={singleColor} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={singleEstPts}  fill="none" stroke={singleColor} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 5" opacity={0.85} />
      <polyline points={steelHistPts}  fill="none" stroke={steelColor}  strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={steelEstPts}   fill="none" stroke={steelColor}  strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 5" opacity={0.85} />

      {/* Current marker */}
      {currentIdx >= 0 && (
        <g>
          <circle cx={xFor(currentIdx)} cy={yFor(data[currentIdx].single)} r={7} fill={singleColor} stroke="#fff" strokeWidth={2.5} />
          <text x={xFor(currentIdx)} y={yFor(data[currentIdx].single) - 14} textAnchor="middle" fontFamily={Fn} fontSize={10.5} fontWeight={800} fill={singleColor}>NOW · {data[currentIdx].single}%</text>
        </g>
      )}

      {/* End labels */}
      <text x={xFor(data.length - 1) + 8} y={yFor(data[data.length - 1].single) + 4} fontFamily={Fn} fontSize={11} fontWeight={700} fill={singleColor}>Single-use {data[data.length - 1].single}%</text>
      <text x={xFor(data.length - 1) + 8} y={yFor(data[data.length - 1].steel) + 4} fontFamily={Fn} fontSize={11} fontWeight={700} fill={steelColor}>Steel {data[data.length - 1].steel}%</text>

      {/* Title */}
      <text x={padL} y={14} fontFamily={Fn} fontSize={11} fontWeight={800} fill={T.textTer} letterSpacing="0.08em">% OF NEW BIOREACTOR CAPACITY · SINGLE-USE vs STAINLESS STEEL</text>
    </svg>
  );
}

/* ════════════════════════════════════════════════
   MARKET SHARE EVOLUTION — bioprocessing tools
   ════════════════════════════════════════════════ */
function ShareEvolution({ T }) {
  const data = shareEvolution;
  const W = 1000, H = 300;
  const padL = 44, padR = 110, padT = 28, padB = 38;
  const gridW = W - padL - padR;
  const gridH = H - padT - padB;

  const xFor = (i) => padL + (i / (data.length - 1)) * gridW;
  const yMin = 0, yMax = 35;
  const yFor = (v) => padT + gridH - ((v - yMin) / (yMax - yMin)) * gridH;

  const series = [
    { key: "cytiva",    label: "Cytiva (DHR)",  color: "#9333EA" },
    { key: "sartorius", label: "Sartorius",     color: "#059669" },
    { key: "tmo",       label: "Thermo Fisher", color: "#1D4ED8", isHero: true },
    { key: "merck",     label: "Merck KGaA",    color: "#EA580C" },
    { key: "other",     label: "Other",         color: "#94A3B8" },
  ];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", overflow: "visible" }}>
      {/* Grid */}
      {[0, 10, 20, 30].map(v => (
        <g key={v}>
          <line x1={padL} y1={yFor(v)} x2={padL + gridW} y2={yFor(v)} stroke={T.border} strokeWidth={1} />
          <text x={padL - 6} y={yFor(v) + 3} textAnchor="end" fontFamily={Fn} fontSize={10} fill={T.textSec}>{v}%</text>
        </g>
      ))}

      {/* X labels */}
      {data.map((d, i) => (
        <text key={"xl-" + i} x={xFor(i)} y={padT + gridH + 18} textAnchor="middle" fontFamily={Fn} fontSize={10} fontWeight={i === data.length - 1 ? 700 : 500} fill={T.textSec}>{d.year}</text>
      ))}

      {/* Lines */}
      {series.map(s => {
        const pts = data.map((d, i) => `${xFor(i)},${yFor(d[s.key])}`).join(" ");
        return (
          <g key={s.key}>
            <polyline points={pts} fill="none" stroke={s.color} strokeWidth={s.isHero ? 3 : 2.5} strokeLinecap="round" strokeLinejoin="round" style={{ filter: s.isHero ? `drop-shadow(0 1px 2px ${s.color}55)` : "none" }} />
            {data.map((d, i) => (
              <circle key={i} cx={xFor(i)} cy={yFor(d[s.key])} r={s.isHero ? 4 : 3} fill={s.color} stroke="#fff" strokeWidth={1.5} />
            ))}
            {/* End label */}
            <text x={xFor(data.length - 1) + 8} y={yFor(data[data.length - 1][s.key]) + 4} fontFamily={Fn} fontSize={11} fontWeight={s.isHero ? 800 : 600} fill={s.color}>{s.label}</text>
          </g>
        );
      })}

      {/* Title */}
      <text x={padL} y={14} fontFamily={Fn} fontSize={11} fontWeight={800} fill={T.textTer} letterSpacing="0.08em">GLOBAL BIOPROCESSING TOOLS — % MARKET SHARE BY PLAYER, 2018 → 2026</text>

      {/* Δ callout for Cytiva and TMO */}
      {(() => {
        const cytFirst = data[0].cytiva;
        const cytLast = data[data.length - 1].cytiva;
        const tmoFirst = data[0].tmo;
        const tmoLast = data[data.length - 1].tmo;
        return (
          <g>
            <text x={padL + gridW / 2} y={padT - 6} textAnchor="middle" fontFamily={Fn} fontSize={10.5} fontWeight={700} fill={T.textSec}>
              <tspan fill="#9333EA">Cytiva +{cytLast - cytFirst}pp</tspan>  ·  <tspan fill="#1D4ED8">TMO {tmoLast - tmoFirst}pp</tspan>  since 2018
            </text>
          </g>
        );
      })()}
    </svg>
  );
}

/* ════════════════════════════════════════════════
   CAPEX BARS — big-pharma US manufacturing commitments
   ════════════════════════════════════════════════ */
function CapexBars({ T }) {
  // Sort descending by amount
  const data = [...capexCommitments].sort((a, b) => b.amount - a.amount);
  const maxV = Math.max(...data.map(d => d.amount));

  return (
    <div>
      <div style={{ display: "grid", gap: 8 }}>
        {data.map((c) => {
          const widthPct = (c.amount / maxV) * 100;
          return (
            <div key={c.name} style={{ display: "grid", gridTemplateColumns: "minmax(140px, 1.2fr) minmax(0, 3fr) 80px", gap: 12, alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: T.text, fontFamily: Fn, lineHeight: 1.2 }}>{c.name}</div>
                <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, fontWeight: 600, marginTop: 1 }}>{c.ticker}</div>
              </div>
              <div style={{ position: "relative", height: 24, background: T.pillBg, borderRadius: 4 }}>
                <div style={{
                  position: "absolute", left: 0, top: 0, bottom: 0, width: widthPct + "%",
                  background: `linear-gradient(90deg, ${c.color}, ${c.color}CC)`,
                  borderRadius: 4, display: "flex", alignItems: "center", paddingLeft: 10, color: "#fff", fontSize: 11, fontWeight: 700, fontFamily: Fn,
                  boxShadow: `0 1px 4px ${c.color}55`,
                  transition: "width 0.4s",
                }}>
                  {c.note}
                </div>
              </div>
              <div style={{ fontSize: 17, fontWeight: 800, color: T.text, fontFamily: Fn, fontVariantNumeric: "tabular-nums", textAlign: "right" }}>${c.amount}B</div>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 16, padding: "14px 18px", background: T.text, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <div style={{ fontSize: 12, color: T.card, fontFamily: Fn, fontWeight: 600, opacity: 0.85 }}>{capexTotal.label}</div>
        <div style={{ fontSize: 28, fontWeight: 800, color: T.card, fontFamily: Fn, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>${capexTotal.whAggregate}B+</div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   Main tab
   ════════════════════════════════════════════════ */
export default function SectorBriefTab({ T }) {
  // Compute headline numbers from the price/PE series
  const first = pricePeSeries[0];
  const peak = pricePeSeries.reduce((acc, d) => d.pe > acc.pe ? d : acc, pricePeSeries[0]);
  const last = pricePeSeries[pricePeSeries.length - 1];
  const peDelta = ((last.pe / peak.pe) - 1) * 100;
  const priceDelta = ((last.price / peak.price) - 1) * 100;

  return (
    <div>
      {/* ── Header ─────────────────────────────── */}
      <div style={{ fontSize: 11, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8 }}>
        Sector brief · 20 May 2026
      </div>
      <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 30, color: T.text, lineHeight: 1.15, marginBottom: 18, letterSpacing: "-0.02em" }}>
        Why it's been broken — and why it might not stay broken.
      </div>

      {/* ── Two facts side-by-side ──────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 14, marginBottom: 28 }}>
        {facts.map((f) => (
          <Card key={f.num} T={T} style={{ padding: "26px 28px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "auto minmax(0, 1fr)", gap: 20, alignItems: "start" }}>
              <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 48, lineHeight: 0.9, color: T.textTer, letterSpacing: "-0.04em" }}>{f.num}</div>
              <div>
                <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 22, color: T.text, lineHeight: 1.25, letterSpacing: "-0.01em", marginBottom: 10 }}>{f.headline}</div>
                <div style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, marginBottom: 14 }}>{f.one}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                  <div style={{ fontSize: 30, fontWeight: 800, color: T.capRed, fontFamily: Fn, lineHeight: 1, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>{f.stat}</div>
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: T.textTer, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase" }}>{f.statSub}</div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* ── Cycle phase strip ─────────────────── */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 4, flexWrap: "wrap" }}>
        <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 22, color: T.text }}>Where we are in the cycle</div>
        <div style={{ fontSize: 12, color: T.textTer, fontFamily: Fn }}>Five phases. Past two are done. Now: early recovery.</div>
      </div>
      <Card T={T} style={{ padding: "26px 22px 20px", marginBottom: 28, overflow: "visible" }}>
        <CycleStrip T={T} />
      </Card>

      {/* ── Price × P/E chart ───────────────────── */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
        <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 22, color: T.text }}>Price × P/E NTM</div>
        <div style={{ fontSize: 12, color: T.textTer, fontFamily: Fn }}>The de-rating story in one chart — TMO close (left) vs forward multiple (right)</div>
      </div>
      <Card T={T} style={{ padding: "22px 24px", marginBottom: 14, overflow: "visible" }}>
        <PricePEChart T={T} />
      </Card>

      {/* Inline stat row (peak vs today) */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10, marginBottom: 28 }}>
        <div style={{ padding: "12px 14px", background: T.card, border: `1px solid ${T.border}`, borderRadius: 8 }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase" }}>P/E Peak (Q4'21)</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: T.text, fontFamily: Fn, fontVariantNumeric: "tabular-nums" }}>{peak.pe}x</div>
        </div>
        <div style={{ padding: "12px 14px", background: T.card, border: `1px solid ${T.border}`, borderRadius: 8 }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase" }}>P/E Today</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: T.text, fontFamily: Fn, fontVariantNumeric: "tabular-nums" }}>{last.pe}x</div>
        </div>
        <div style={{ padding: "12px 14px", background: T.capRed + "10", border: `1px solid ${T.capRed}33`, borderRadius: 8 }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: T.capRed, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase" }}>P/E Compression</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: T.capRed, fontFamily: Fn, fontVariantNumeric: "tabular-nums" }}>{peDelta.toFixed(0)}%</div>
        </div>
        <div style={{ padding: "12px 14px", background: T.card, border: `1px solid ${T.border}`, borderRadius: 8 }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase" }}>Price vs Peak</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: T.capRed, fontFamily: Fn, fontVariantNumeric: "tabular-nums" }}>{priceDelta.toFixed(0)}%</div>
        </div>
      </div>

      {/* ── Sector vs SPX chart ─────────────────── */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
        <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 22, color: T.text }}>Tools vs S&amp;P 500 — 15-year relative multiple</div>
        <div style={{ fontSize: 12, color: T.textTer, fontFamily: Fn }}>Premium for the cohort has flipped to a discount for the first time in 15 years.</div>
      </div>
      <Card T={T} style={{ padding: "20px 22px", marginBottom: 28, overflow: "visible" }}>
        <SectorVsSpx T={T} />
        <div style={{ paddingTop: 14, marginTop: 6, borderTop: "1px solid " + T.border, fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.65, fontStyle: "italic" }}>
          For 15 years tools traded at a premium to the S&amp;P 500 — never below 1.0x. The premium peaked at 1.55x in 2021 and has compressed to ~0.82x today. The cohort sits at a record discount to the index.
        </div>
      </Card>

      {/* ── Sector valuation low strip ──────────── */}
      <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 22, color: T.text, marginBottom: 10 }}>The sector is at multi-decade valuation lows.</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 32 }}>
        {sectorStats.map((s, i) => (
          <div key={i} style={{ padding: "16px 18px", background: T.card, border: `1px solid ${T.border}`, borderRadius: 8 }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6, lineHeight: 1.3 }}>{s.label}</div>
            <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 26, color: T.text, fontWeight: 600, lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, fontStyle: "italic" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* ── Bioprocessing primer ─────────────────── */}
      <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 26, color: T.text, marginBottom: 8, letterSpacing: "-0.01em" }}>The bioprocessing primer — in plain English.</div>
      <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 18px", maxWidth: 880 }}>{bioprocPrimer.intro}</p>

      {/* 4-step flow */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 0, marginBottom: 22, position: "relative" }}>
        {bioprocPrimer.steps.map((s, i) => (
          <div key={s.id} style={{ display: "flex", alignItems: "stretch" }}>
            <div style={{ flex: 1, padding: "16px 14px 18px", background: T.card, border: `1px solid ${T.border}`, borderRadius: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: T.text, color: T.card, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, fontFamily: Fn }}>{s.id}</div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: T.text, fontFamily: Fn }}>{s.title}</div>
              </div>
              <div style={{ fontSize: 11.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.55 }}>{s.desc}</div>
            </div>
            {i < bioprocPrimer.steps.length - 1 && (
              <div style={{ display: "flex", alignItems: "center", padding: "0 6px", color: T.textTer, fontSize: 18, fontWeight: 700 }}>→</div>
            )}
          </div>
        ))}
      </div>

      {/* Adoption curve */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6, flexWrap: "wrap", marginTop: 4 }}>
        <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 18, color: T.text }}>Stainless steel → single-use</div>
        <div style={{ fontSize: 11.5, color: T.textTer, fontFamily: Fn }}>The secular shift driving consumable revenue. Plenty of runway remains.</div>
      </div>
      <Card T={T} style={{ padding: "18px 20px", marginBottom: 22, overflow: "visible" }}>
        <AdoptionCurve T={T} />
      </Card>

      {/* Two product cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 14, marginBottom: 32 }}>
        {bioprocPrimer.products.map((p, i) => (
          <Card key={i} T={T} style={{ padding: "20px 22px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 18 }}>
              <ProductIcon id={p.iconId} color="#059669" size={72} T={T} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: "#059669", fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 }}>{p.what}</div>
                <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 20, color: T.text, marginBottom: 10, lineHeight: 1.2 }}>{p.brand}</div>
                <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7 }}>{p.desc}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* ── 4-player market share ───────────────── */}
      <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 26, color: T.text, marginBottom: 8, letterSpacing: "-0.01em" }}>Four firms sell the picks-and-shovels.</div>
      <p style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, lineHeight: 1.6, margin: "0 0 16px", fontStyle: "italic" }}>Approximate global bioprocessing tools market share — consumables + equipment combined.</p>
      <Card T={T} style={{ padding: "20px 22px", marginBottom: 16 }}>
        <PlayerShareBar T={T} />
      </Card>
      {/* Share evolution chart */}
      <Card T={T} style={{ padding: "18px 22px", marginBottom: 16, overflow: "visible" }}>
        <ShareEvolution T={T} />
      </Card>

      <Card T={T} style={{ padding: "18px 22px", marginBottom: 32, borderLeft: `4px solid ${T.capRed}`, background: T.capRed + "08" }}>
        <div style={{ fontSize: 10.5, fontWeight: 800, color: T.capRed, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>The share-gain concern</div>
        <div style={{ fontSize: 13, color: T.text, fontFamily: Fn, lineHeight: 1.75 }}>{playerInsight}</div>
      </Card>

      {/* ── The moat — BLA stickiness ──────────── */}
      <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 26, color: T.text, marginBottom: 14, letterSpacing: "-0.01em" }}>The moat: once you're in, you're in.</div>
      <Card T={T} style={{ padding: "26px 28px", marginBottom: 32, background: "linear-gradient(135deg, " + T.deepBlue + "0D 0%, transparent 100%)", borderLeft: `4px solid ${T.deepBlue}` }}>
        <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 22, color: T.text, lineHeight: 1.25, marginBottom: 14, letterSpacing: "-0.01em" }}>{blaMoat.headline}</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, color: T.deepBlue, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>What gets locked in</div>
            <div style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.75 }}>{blaMoat.detail}</div>
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, color: T.deepBlue, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Why it matters</div>
            <div style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.75 }}>{blaMoat.consequence}</div>
          </div>
        </div>
      </Card>

      {/* ── Catalysts ───────────────────────────── */}
      <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 26, color: T.text, marginBottom: 14, letterSpacing: "-0.01em" }}>Four reasons it might inflect now.</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12, marginBottom: 32 }}>
        {catalysts.map((c, i) => (
          <Card key={i} T={T} style={{ padding: "18px 20px", borderTop: `4px solid ${c.color}` }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 32, color: c.color, lineHeight: 0.9, letterSpacing: "-0.04em" }}>0{i + 1}</div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.text, fontFamily: Fn, marginBottom: 8, lineHeight: 1.3 }}>{c.title}</div>
            <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7 }}>{c.text}</div>
          </Card>
        ))}
      </div>

      {/* ── Big-pharma capex bars ──────────────── */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
        <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 22, color: T.text }}>The onshoring tailwind — in dollars committed</div>
        <div style={{ fontSize: 12, color: T.textTer, fontFamily: Fn }}>Announced US manufacturing investments triggered by Section 232 / MFN dynamics.</div>
      </div>
      <Card T={T} style={{ padding: "22px 24px", marginBottom: 32, overflow: "hidden" }}>
        <CapexBars T={T} />
      </Card>

      {/* ── Conclusion ──────────────────────────── */}
      <Card T={T} style={{ padding: "30px 32px", marginBottom: 16, borderTop: `4px solid ${T.text}` }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 10 }}>What needs to happen</div>
        <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 28, color: T.text, lineHeight: 1.2, marginBottom: 14, letterSpacing: "-0.02em" }}>{conclusion.headline}</div>
        <div style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.8, marginBottom: 20, maxWidth: 880 }}>{conclusion.detail}</div>

        <div style={{ paddingTop: 16, borderTop: `1px solid ${T.border}` }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Things to watch from here</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 8 }}>
            {conclusion.watchpoints.map((w, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "8px 10px", background: T.pillBg, borderRadius: 6 }}>
                <span style={{ color: T.deepBlue, fontWeight: 800, fontFamily: Fn, fontSize: 11, marginTop: 1 }}>→</span>
                <span style={{ fontSize: 12, color: T.text, fontFamily: Fn, lineHeight: 1.5 }}>{w}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div style={{ padding: "12px 16px", background: T.pillBg, borderRadius: 8, fontSize: 11, color: T.textTer, fontFamily: Fn, lineHeight: 1.65, fontStyle: "italic", marginBottom: 24 }}>
        Sources · MS Bioprocessing Tools podcast (May 2026), TMO/DHR/SRT/MRK Q1 2026 prints, Bloomberg / IBES forward consensus, internal Cape Capital research dated 20 May 2026.
      </div>
    </div>
  );
}
