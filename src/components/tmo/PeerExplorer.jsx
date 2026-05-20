import { useState, useMemo } from "react";
import { Fn, Fh } from "../../theme";
import { Card, Pill } from "../shared";
import {
  peers, growthYears, multipleYears, growthMetrics, multipleMetrics,
  growthData, multiplesData,
} from "../../data/research-tmo-val-bloomberg";

/* ════════════════════════════════════════════════
   Helpers
   ════════════════════════════════════════════════ */
const fmtVal = (v, mode, fmt) => {
  if (v === null || v === undefined) return "—";
  if (mode === "growth") return (v >= 0 ? "+" : "") + v.toFixed(1) + "%";
  if (fmt === "%") return v.toFixed(2) + "%";
  return v.toFixed(2) + "x";
};

// Median of an array (ignores null)
const median = (arr) => {
  const a = arr.filter(v => v !== null && v !== undefined).sort((x, y) => x - y);
  if (!a.length) return null;
  const m = Math.floor(a.length / 2);
  return a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2;
};

/* ════════════════════════════════════════════════
   LINE CHART — peers across years for one metric
   ════════════════════════════════════════════════ */
function LineChart({ mode, metric, data, years, T, focusPeer, setFocusPeer }) {
  const [hoverIdx, setHoverIdx] = useState(null);
  const W = 760, H = 320;
  const padL = 56, padR = 24, padT = 26, padB = 44;
  const gridW = W - padL - padR;
  const gridH = H - padT - padB;

  // Collect all values to compute Y range
  const allValues = peers.flatMap(p => (data[p.id] && data[p.id][metric.id]) || []).filter(v => v !== null && v !== undefined);
  if (!allValues.length) return null;
  const minV = Math.min(...allValues);
  const maxV = Math.max(...allValues);
  // Add 8% padding to the range
  const span = maxV - minV || 1;
  const yMin = minV - span * 0.08;
  const yMax = maxV + span * 0.08;
  // Pick a "zero line" if range crosses zero
  const showZero = yMin < 0 && yMax > 0;

  const xFor = (i) => padL + (i / Math.max(years.length - 1, 1)) * gridW;
  const yFor = (v) => padT + gridH - ((v - yMin) / (yMax - yMin)) * gridH;

  // Generate y-axis ticks (5 nice values)
  const yTicks = useMemo(() => {
    const niceStep = (range) => {
      const raw = range / 4;
      const pow = Math.pow(10, Math.floor(Math.log10(raw)));
      const norm = raw / pow;
      let step;
      if (norm < 1.5) step = 1;
      else if (norm < 3) step = 2;
      else if (norm < 7) step = 5;
      else step = 10;
      return step * pow;
    };
    const step = niceStep(yMax - yMin);
    const start = Math.ceil(yMin / step) * step;
    const ticks = [];
    for (let v = start; v <= yMax; v += step) ticks.push(v);
    return ticks;
  }, [yMin, yMax]);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", overflow: "visible" }}>
      {/* Gridlines */}
      {yTicks.map((v, i) => (
        <line key={i} x1={padL} y1={yFor(v)} x2={padL + gridW} y2={yFor(v)} stroke={T.border} strokeWidth={1} />
      ))}
      {/* Zero line emphasised */}
      {showZero && (
        <line x1={padL} y1={yFor(0)} x2={padL + gridW} y2={yFor(0)} stroke={T.textTer} strokeWidth={1.2} strokeDasharray="3 4" />
      )}

      {/* Y-axis tick labels */}
      {yTicks.map((v, i) => (
        <text key={i} x={padL - 8} y={yFor(v) + 3} textAnchor="end" fontFamily={Fn} fontSize={10} fill={T.textSec}>
          {mode === "growth" ? (v >= 0 ? "+" : "") + v.toFixed(0) + "%" : v.toFixed(1) + (metric.fmt === "%" ? "%" : "x")}
        </text>
      ))}

      {/* X-axis */}
      <line x1={padL} y1={padT + gridH} x2={padL + gridW} y2={padT + gridH} stroke={T.textTer} strokeWidth={1} />
      {years.map((y, i) => (
        <g key={y}>
          <line x1={xFor(i)} y1={padT + gridH} x2={xFor(i)} y2={padT + gridH + 4} stroke={T.textTer} strokeWidth={1} />
          <text x={xFor(i)} y={padT + gridH + 18} textAnchor="middle" fontFamily={Fn} fontSize={11} fontWeight={hoverIdx === i ? 700 : 500} fill={hoverIdx === i ? T.text : T.textSec}>{y}</text>
        </g>
      ))}

      {/* Hover guide */}
      {hoverIdx !== null && (
        <line x1={xFor(hoverIdx)} y1={padT} x2={xFor(hoverIdx)} y2={padT + gridH} stroke={T.textTer} strokeWidth={1} strokeDasharray="2 3" opacity={0.5} />
      )}

      {/* Peer lines + dots */}
      {peers.map(p => {
        const values = (data[p.id] && data[p.id][metric.id]) || [];
        const dimmed = focusPeer && focusPeer !== p.id;
        const isHero = p.id === "tmo";
        // Filter out nulls but keep continuous segments
        const segments = [];
        let curr = [];
        values.forEach((v, i) => {
          if (v === null || v === undefined) {
            if (curr.length > 1) segments.push(curr);
            curr = [];
          } else {
            curr.push({ x: xFor(i), y: yFor(v), v, i });
          }
        });
        if (curr.length) segments.push(curr);

        return (
          <g key={p.id} style={{ transition: "opacity 0.2s", opacity: dimmed ? 0.22 : 1 }}>
            {segments.map((seg, si) => (
              <polyline
                key={si}
                points={seg.map(pt => `${pt.x},${pt.y}`).join(" ")}
                fill="none"
                stroke={p.color}
                strokeWidth={isHero ? 3 : 2}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ filter: isHero && !dimmed ? `drop-shadow(0 1px 2px ${p.color}55)` : "none" }}
              />
            ))}
            {values.map((v, i) => {
              if (v === null || v === undefined) return null;
              const active = hoverIdx === i;
              return (
                <circle
                  key={i}
                  cx={xFor(i)} cy={yFor(v)}
                  r={active ? 5.5 : (isHero ? 4 : 3)}
                  fill={p.color}
                  stroke="#fff"
                  strokeWidth={1.5}
                  style={{ transition: "r 0.15s" }}
                />
              );
            })}
          </g>
        );
      })}

      {/* Hover overlay strip */}
      {years.map((y, i) => (
        <rect
          key={y}
          x={xFor(i) - (gridW / years.length) / 2}
          y={padT}
          width={gridW / years.length}
          height={gridH}
          fill="transparent"
          onMouseEnter={() => setHoverIdx(i)}
          onMouseLeave={() => setHoverIdx(null)}
        />
      ))}

      {/* Hover tooltip — shows all peers at the hovered year */}
      {hoverIdx !== null && (() => {
        const x = xFor(hoverIdx);
        const tipW = 200;
        const tipX = x + 12 + tipW > padL + gridW ? x - 12 - tipW : x + 12;
        const tipH = 20 + peers.length * 18;
        const tipY = Math.max(padT + 4, padT + gridH / 2 - tipH / 2);
        return (
          <g style={{ pointerEvents: "none" }}>
            <rect x={tipX} y={tipY} width={tipW} height={tipH} rx={6} fill={T.text} opacity={0.96} />
            <text x={tipX + 10} y={tipY + 14} fontFamily={Fn} fontSize={10} fontWeight={800} fill={T.card} letterSpacing="0.06em">{years[hoverIdx]}</text>
            {peers.map((p, pi) => {
              const v = data[p.id] && data[p.id][metric.id] ? data[p.id][metric.id][hoverIdx] : null;
              return (
                <g key={p.id}>
                  <circle cx={tipX + 14} cy={tipY + 28 + pi * 18} r={4} fill={p.color} />
                  <text x={tipX + 24} y={tipY + 31 + pi * 18} fontFamily={Fn} fontSize={10.5} fontWeight={p.isHero ? 700 : 500} fill={T.card}>{p.name}</text>
                  <text x={tipX + tipW - 10} y={tipY + 31 + pi * 18} textAnchor="end" fontFamily={Fn} fontSize={10.5} fontWeight={600} fill={T.card} fontVariantNumeric="tabular-nums">{fmtVal(v, mode, metric.fmt)}</text>
                </g>
              );
            })}
          </g>
        );
      })()}
    </svg>
  );
}

/* ════════════════════════════════════════════════
   FOCAL-YEAR BAR — peer comparison for one year
   ════════════════════════════════════════════════ */
function FocalYearBars({ mode, metric, data, years, focalYear, T }) {
  const idx = years.indexOf(focalYear);
  const values = peers.map(p => ({
    peer: p,
    v: data[p.id] && data[p.id][metric.id] ? data[p.id][metric.id][idx] : null,
  }));
  const real = values.map(o => o.v).filter(v => v !== null && v !== undefined);
  if (!real.length) return null;
  const min = Math.min(0, ...real);
  const max = Math.max(0, ...real);
  const med = median(real);
  const range = max - min || 1;
  const zeroPct = ((0 - min) / range) * 100;

  return (
    <div style={{ display: "grid", gap: 8 }}>
      {values.map(({ peer, v }) => {
        const isHero = peer.id === "tmo";
        const valid = v !== null && v !== undefined;
        const leftPct = valid ? ((Math.min(v, 0) - min) / range) * 100 : 0;
        const widthPct = valid ? (Math.abs(v) / range) * 100 : 0;
        return (
          <div key={peer.id} style={{ display: "grid", gridTemplateColumns: "120px minmax(0, 1fr) 64px", gap: 10, alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: peer.color, flexShrink: 0 }} />
              <span style={{ fontSize: 11.5, color: T.text, fontFamily: Fn, fontWeight: isHero ? 700 : 500 }}>{peer.name}</span>
            </div>
            <div style={{ position: "relative", height: 18, background: T.pillBg, borderRadius: 4, overflow: "hidden" }}>
              {/* Zero line if range crosses zero */}
              {min < 0 && max > 0 && (
                <div style={{ position: "absolute", left: zeroPct + "%", top: 0, bottom: 0, width: 1, background: T.textTer, opacity: 0.5 }} />
              )}
              {valid && (
                <div style={{
                  position: "absolute",
                  left: leftPct + "%",
                  width: widthPct + "%",
                  top: 2, bottom: 2,
                  background: peer.color,
                  borderRadius: 3,
                  opacity: isHero ? 1 : 0.78,
                  transition: "all 0.3s",
                }} />
              )}
            </div>
            <div style={{ fontSize: 11.5, fontFamily: Fn, fontVariantNumeric: "tabular-nums", color: T.text, fontWeight: isHero ? 700 : 500, textAlign: "right" }}>
              {fmtVal(v, mode, metric.fmt)}
            </div>
          </div>
        );
      })}
      {med !== null && (
        <div style={{ marginTop: 4, fontSize: 10.5, color: T.textTer, fontFamily: Fn, fontStyle: "italic" }}>
          Peer median: <span style={{ color: T.text, fontWeight: 600 }}>{fmtVal(med, mode, metric.fmt)}</span>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════
   POSITIONING SCATTER — forward growth × forward multiple
   ════════════════════════════════════════════════ */
function PositioningScatter({ T }) {
  // X axis: FY27 revenue growth %
  // Y axis: FY27 EV/EBITDA (inverted: cheap at top)
  const W = 560, H = 360;
  const padL = 60, padR = 30, padT = 30, padB = 50;
  const gridW = W - padL - padR;
  const gridH = H - padT - padB;

  const points = peers.map(p => ({
    peer: p,
    growth: growthData[p.id].revenue[2], // FY27 revenue growth (index 2 in growthYears)
    mult:   multiplesData[p.id].evEbitda[3], // FY27 EV/EBITDA (index 3 in multipleYears)
  })).filter(d => d.growth !== null && d.mult !== null);

  const xs = points.map(p => p.growth);
  const ys = points.map(p => p.mult);
  const xMin = Math.min(...xs) - 1.5;
  const xMax = Math.max(...xs) + 1.5;
  const yMin = Math.min(...ys) - 2;
  const yMax = Math.max(...ys) + 2;

  const xFor = (g) => padL + ((g - xMin) / (xMax - xMin)) * gridW;
  const yFor = (m) => padT + ((m - yMin) / (yMax - yMin)) * gridH;

  const xMid = (xMin + xMax) / 2;
  const yMid = (yMin + yMax) / 2;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id="quad-cheap-grow" x1="0" y1="100%" x2="100%" y2="0">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="quad-pricey" x1="0" y1="0" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Quadrant shading */}
      <rect x={padL} y={yFor(yMid)} width={xFor(xMid) - padL} height={padT + gridH - yFor(yMid)} fill="url(#quad-cheap-grow)" />
      <rect x={xFor(xMid)} y={padT} width={padL + gridW - xFor(xMid)} height={yFor(yMid) - padT} fill="url(#quad-pricey)" />

      {/* Gridlines */}
      <line x1={padL} y1={yFor(yMid)} x2={padL + gridW} y2={yFor(yMid)} stroke={T.border} strokeDasharray="3 4" />
      <line x1={xFor(xMid)} y1={padT} x2={xFor(xMid)} y2={padT + gridH} stroke={T.border} strokeDasharray="3 4" />

      {/* Axis frame */}
      <rect x={padL} y={padT} width={gridW} height={gridH} fill="none" stroke={T.textTer} strokeWidth={1} />

      {/* Axis labels */}
      <text x={padL + gridW / 2} y={H - 8} textAnchor="middle" fontFamily={Fn} fontSize={10} fontWeight={700} fill={T.textSec} letterSpacing="0.08em">FY27 REVENUE GROWTH →</text>
      <text x={16} y={padT + gridH / 2} textAnchor="middle" fontFamily={Fn} fontSize={10} fontWeight={700} fill={T.textSec} letterSpacing="0.08em" transform={`rotate(-90 16 ${padT + gridH / 2})`}>↑ FY27 EV / EBITDA</text>

      {/* X ticks */}
      {[xMin, xMid, xMax].map((v, i) => (
        <text key={"xt-" + i} x={xFor(v)} y={padT + gridH + 16} textAnchor="middle" fontFamily={Fn} fontSize={9.5} fill={T.textTer}>{v.toFixed(1) + "%"}</text>
      ))}
      {/* Y ticks */}
      {[yMin, yMid, yMax].map((v, i) => (
        <text key={"yt-" + i} x={padL - 6} y={yFor(v) + 3} textAnchor="end" fontFamily={Fn} fontSize={9.5} fill={T.textTer}>{v.toFixed(1) + "x"}</text>
      ))}

      {/* Quadrant labels */}
      <text x={padL + 8}            y={padT + gridH - 8}  fontFamily={Fn} fontSize={9} fontStyle="italic" fill={T.textTer}>cheap, slow</text>
      <text x={padL + gridW - 8}    y={padT + gridH - 8}  textAnchor="end" fontFamily={Fn} fontSize={9} fontStyle="italic" fill="#10B981" fontWeight={700}>cheap & growing</text>
      <text x={padL + 8}            y={padT + 14}         fontFamily={Fn} fontSize={9} fontStyle="italic" fill="#EF4444" fontWeight={700}>expensive, slow</text>
      <text x={padL + gridW - 8}    y={padT + 14}         textAnchor="end" fontFamily={Fn} fontSize={9} fontStyle="italic" fill={T.textTer}>expensive, growing</text>

      {/* Peer dots */}
      {points.map(({ peer, growth, mult }) => {
        const cx = xFor(growth), cy = yFor(mult);
        const r = peer.isHero ? 14 : 10;
        return (
          <g key={peer.id}>
            <circle cx={cx} cy={cy} r={r + 6} fill={peer.color} opacity={0.18} />
            <circle cx={cx} cy={cy} r={r} fill={peer.color} stroke="#fff" strokeWidth={2.5} />
            {peer.isHero && <circle cx={cx} cy={cy} r={r + 10} fill="none" stroke={peer.color} strokeWidth={1.5} strokeDasharray="2 3" opacity={0.7} />}
            <text x={cx} y={cy - r - 8} textAnchor="middle" fontFamily={Fn} fontSize={11} fontWeight={peer.isHero ? 800 : 600} fill={T.text}>{peer.ticker.split(" ")[0]}</text>
            <text x={cx} y={cy + r + 14} textAnchor="middle" fontFamily={Fn} fontSize={9.5} fontVariantNumeric="tabular-nums" fill={T.textSec}>
              {growth.toFixed(1)}% · {mult.toFixed(1)}x
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ════════════════════════════════════════════════
   MAIN EXPLORER
   ════════════════════════════════════════════════ */
export default function PeerExplorer({ T }) {
  const [mode, setMode] = useState("multiples"); // "growth" | "multiples"
  const [metricId, setMetricId] = useState("evEbitda");
  const [showAll, setShowAll] = useState(false);
  const [focusPeer, setFocusPeer] = useState(null);

  const metricList = mode === "growth" ? growthMetrics : multipleMetrics;
  const visibleMetrics = showAll ? metricList : metricList.filter(m => m.highlight);
  const metric = metricList.find(m => m.id === metricId) || metricList[0];
  const years = mode === "growth" ? growthYears : multipleYears;
  const data = mode === "growth" ? growthData : multiplesData;
  const focalYear = mode === "growth" ? "FY27" : "FY27";

  // Switch metric when mode changes to ensure validity
  const switchMode = (m) => {
    setMode(m);
    setMetricId(m === "growth" ? "revenue" : "evEbitda");
  };

  // Insight: TMO discount/premium vs peer median at focalYear
  const insight = useMemo(() => {
    const idx = years.indexOf(focalYear);
    const tmoV = data.tmo[metric.id] ? data.tmo[metric.id][idx] : null;
    const peerVals = peers.filter(p => p.id !== "tmo").map(p => data[p.id][metric.id] ? data[p.id][metric.id][idx] : null);
    const med = median(peerVals);
    if (tmoV === null || med === null) return null;
    const diff = ((tmoV - med) / Math.abs(med)) * 100;
    return { tmoV, med, diff, focalYear };
  }, [mode, metric.id, focalYear]);

  return (
    <div>
      {/* Mode toggle + metric selector */}
      <Card T={T} style={{ padding: "20px 22px", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", background: T.pillBg, borderRadius: T.radiusSm, padding: 3, gap: 2 }}>
            {[
              { id: "multiples", label: "Multiples" },
              { id: "growth",    label: "Growth (YoY %)" },
            ].map(t => (
              <button key={t.id} onClick={() => switchMode(t.id)} style={{
                padding: "7px 14px", border: "none", borderRadius: 6, fontSize: 12, fontFamily: Fn,
                fontWeight: mode === t.id ? 700 : 500,
                background: mode === t.id ? T.card : "transparent",
                color: mode === t.id ? T.text : T.textTer,
                cursor: "pointer", transition: "all 0.15s",
                boxShadow: mode === t.id ? T.shadow : "none",
              }}>{t.label}</button>
            ))}
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, fontStyle: "italic" }}>
            Source: Bloomberg consensus · May 2026
          </div>
        </div>

        {/* Metric pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
          {visibleMetrics.map(m => {
            const active = m.id === metricId;
            return (
              <button key={m.id} onClick={() => setMetricId(m.id)} style={{
                padding: "6px 12px", border: "1px solid " + (active ? T.text : T.border),
                borderRadius: 16, fontSize: 11.5, fontFamily: Fn,
                fontWeight: active ? 700 : 500,
                background: active ? T.text : T.card,
                color: active ? T.card : T.textSec,
                cursor: "pointer", transition: "all 0.15s",
              }}>{m.label}</button>
            );
          })}
          {metricList.length > visibleMetrics.length && (
            <button onClick={() => setShowAll(true)} style={{
              padding: "6px 12px", border: "1px dashed " + T.border, borderRadius: 16,
              fontSize: 11, fontFamily: Fn, color: T.textTer, background: "transparent", cursor: "pointer",
            }}>+ {metricList.length - visibleMetrics.length} more</button>
          )}
          {showAll && (
            <button onClick={() => setShowAll(false)} style={{
              padding: "6px 12px", border: "1px dashed " + T.border, borderRadius: 16,
              fontSize: 11, fontFamily: Fn, color: T.textTer, background: "transparent", cursor: "pointer",
            }}>show fewer</button>
          )}
        </div>
      </Card>

      {/* Headline */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
        <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 22, color: T.text }}>{metric.label}</div>
        <div style={{ fontSize: 12, color: T.textTer, fontFamily: Fn }}>
          {mode === "growth" ? "Year-on-year growth across FY25–FY29 consensus" : "Forward multiples LTM → FY28"}
        </div>
      </div>

      {/* Line chart card */}
      <Card T={T} style={{ padding: "18px 18px 8px", marginBottom: 16, overflow: "visible" }}>
        <LineChart
          mode={mode}
          metric={metric}
          data={data}
          years={years}
          T={T}
          focusPeer={focusPeer}
          setFocusPeer={setFocusPeer}
        />
        {/* Peer legend — click to focus */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingTop: 12, marginTop: 6, borderTop: "1px solid " + T.border }}>
          {peers.map(p => {
            const dimmed = focusPeer && focusPeer !== p.id;
            return (
              <div
                key={p.id}
                onClick={() => setFocusPeer(focusPeer === p.id ? null : p.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "4px 10px", borderRadius: 14,
                  border: "1px solid " + (focusPeer === p.id ? p.color : T.border),
                  background: focusPeer === p.id ? p.color + "12" : "transparent",
                  cursor: "pointer", opacity: dimmed ? 0.5 : 1, transition: "all 0.15s",
                }}>
                <span style={{ width: 12, height: 3, borderRadius: 2, background: p.color }} />
                <span style={{ fontSize: 11, fontFamily: Fn, color: T.text, fontWeight: p.isHero ? 700 : 500 }}>{p.name}</span>
                <span style={{ fontSize: 10, fontFamily: Fn, color: T.textTer }}>{p.ticker.split(" ")[0]}</span>
                {p.isHero && <span style={{ fontSize: 8.5, padding: "1px 5px", background: T.text, color: T.card, borderRadius: 3, fontWeight: 700, letterSpacing: "0.04em" }}>HERO</span>}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Focal-year bar + Insight */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)", gap: 16, marginBottom: 28 }}>
        <Card T={T} style={{ padding: "20px 22px" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap" }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase" }}>{focalYear} snapshot</div>
            <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, fontStyle: "italic" }}>{metric.label}</div>
          </div>
          <FocalYearBars mode={mode} metric={metric} data={data} years={years} focalYear={focalYear} T={T} />
        </Card>
        <Card T={T} style={{ padding: "20px 22px", background: T.pillBg }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>TMO vs peer median</div>
          {insight ? (
            <>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 32, fontWeight: 600, color: insight.diff < 0 ? "#10B981" : insight.diff > 0 ? "#EF4444" : T.text }}>
                  {insight.diff >= 0 ? "+" : ""}{insight.diff.toFixed(0)}%
                </div>
                <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, fontWeight: 600 }}>vs median</div>
              </div>
              <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.65, marginTop: 10 }}>
                TMO <span style={{ fontWeight: 700, color: T.text }}>{fmtVal(insight.tmoV, mode, metric.fmt)}</span> versus a peer median of <span style={{ fontWeight: 700, color: T.text }}>{fmtVal(insight.med, mode, metric.fmt)}</span> on <span style={{ fontWeight: 600 }}>{metric.label.toLowerCase()}</span> at {focalYear}.
              </div>
              <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, fontStyle: "italic", marginTop: 12 }}>
                {mode === "multiples" && insight.diff < -5  && "Trading at a meaningful discount."}
                {mode === "multiples" && insight.diff > 5   && "Trading at a meaningful premium."}
                {mode === "multiples" && Math.abs(insight.diff) <= 5 && "In line with the peer set."}
                {mode === "growth"   && insight.diff < -5   && "Growing slower than peers — quality of the franchise has to compensate."}
                {mode === "growth"   && insight.diff > 5    && "Growing faster than the peer set — bullish."}
                {mode === "growth"   && Math.abs(insight.diff) <= 5 && "Growing in line with peers."}
              </div>
            </>
          ) : (
            <div style={{ fontSize: 12, color: T.textTer, fontFamily: Fn }}>Insufficient data for this slice.</div>
          )}
        </Card>
      </div>

      {/* Positioning scatter */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
        <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 22, color: T.text }}>The setup, in one chart</div>
        <div style={{ fontSize: 12, color: T.textTer, fontFamily: Fn }}>Where each peer sits on growth × valuation at FY27</div>
      </div>
      <Card T={T} style={{ padding: "20px 22px", marginBottom: 24, overflow: "visible" }}>
        <PositioningScatter T={T} />
        <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, marginTop: 14, paddingTop: 14, borderTop: "1px solid " + T.border }}>
          The bottom-right corner is what every value-conscious investor wants: cheap and growing. TMO sits closest to that quadrant amongst diversified peers — the pure-play CDMO and bioproduction names sit further up the multiple axis, and Danaher sits at a similar multiple with slower top-line growth.
        </div>
      </Card>
    </div>
  );
}
