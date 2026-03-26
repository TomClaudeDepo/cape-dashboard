import { useState, useRef, useEffect } from "react";
import { Fn } from "../theme";
import { Card, Pill, TabBar } from "./shared";

// Resample source data to uniform intervals via linear interpolation
function resample(src, intervalDays) {
  if (src.length < 2) return src;
  const start = src[0].date.getTime();
  const end = src[src.length - 1].date.getTime();
  const step = intervalDays * 86400000;
  const out = [];
  let si = 0;
  for (let t = start; t <= end; t += step) {
    // advance source index
    while (si < src.length - 2 && src[si + 1].date.getTime() <= t) si++;
    const t0 = src[si].date.getTime(), t1 = src[Math.min(si + 1, src.length - 1)].date.getTime();
    const frac = t1 > t0 ? (t - t0) / (t1 - t0) : 0;
    const v0 = src[si].nav, v1 = src[Math.min(si + 1, src.length - 1)].nav;
    out.push({ date: new Date(t), nav: v0 + frac * (v1 - v0) });
  }
  // always include the exact last point
  const last = src[src.length - 1];
  if (out.length === 0 || out[out.length - 1].date.getTime() !== last.date.getTime()) {
    out.push({ date: last.date, nav: last.nav });
  }
  return out;
}

// Granularity per range
// YTD (~3mo): weekly (7d) — ~12 pts
// 1Y: bi-weekly (14d) — ~26 pts
// 3Y: monthly (30d) — ~36 pts
// 5Y: monthly (30d) — ~60 pts
// All (~10y): quarterly (91d) — ~43 pts
function getIntervalDays(range) {
  if (range === "ytd") return 7;
  if (range === 12) return 14;
  if (range === 36) return 30;
  if (range === 60) return 30;
  return 91; // all
}

function getGranularityLabel(range) {
  if (range === "ytd") return "Weekly";
  if (range === 12) return "Bi-weekly";
  return range === "all" ? "Quarterly" : "Monthly";
}

export default function PerfChart({ data, T }) {
  const ref = useRef(null);
  const pathRef = useRef(null);
  const [range, setRange] = useState("all");
  const [tip, setTip] = useState(null);
  const [pathLen, setPathLen] = useState(0);
  const ranges = { "YTD": "ytd", "1Y": 12, "3Y": 36, "5Y": 60, "All": "all" };

  // 1. Filter raw data to the selected time range
  const filtered = (() => {
    if (range === "all") return data;
    const end = data[data.length - 1].date;
    let s;
    if (range === "ytd") s = new Date(2025, 11, 31);
    else { s = new Date(end); s.setMonth(s.getMonth() - range) }
    return data.filter(d => d.date >= s);
  })();

  if (filtered.length < 2) return null;

  // 2. Resample to uniform granularity
  const intervalDays = getIntervalDays(range);
  const sampled = resample(filtered, intervalDays);

  if (sampled.length < 2) return null;

  // 3. Rebase to 100
  const bN = sampled[0].nav;
  const rb = sampled.map(p => ({ date: p.date, nav: (p.nav / bN) * 100 }));

  const W = 720, H = 320, pad = { t: 20, r: 16, b: 36, l: 48 }, w = W - pad.l - pad.r, h = H - pad.t - pad.b;
  const allV = rb.map(p => p.nav);
  const mn = Math.min(...allV) * 0.97, mx = Math.max(...allV) * 1.03;
  const t0 = rb[0].date.getTime(), tN = rb[rb.length - 1].date.getTime(), tSpan = tN - t0 || 1;
  const x = i => pad.l + ((rb[i].date.getTime() - t0) / tSpan) * w;
  const y = v => pad.t + (1 - (v - mn) / (mx - mn)) * h;

  // Catmull-Rom spline
  const smooth = key => {
    const ps = rb.map((p, i) => [x(i), y(p[key])]);
    if (ps.length < 2) return "";
    if (ps.length === 2) return "M" + ps[0].join(",") + "L" + ps[1].join(",");
    const alpha = 0.35;
    let d = "M" + ps[0][0] + "," + ps[0][1];
    for (let i = 0; i < ps.length - 1; i++) {
      const p0 = ps[Math.max(0, i - 1)], p1 = ps[i], p2 = ps[i + 1], p3 = ps[Math.min(ps.length - 1, i + 2)];
      d += " C" + (p1[0] + (p2[0] - p0[0]) * alpha / 3) + "," + (p1[1] + (p2[1] - p0[1]) * alpha / 3) + " " + (p2[0] - (p3[0] - p1[0]) * alpha / 3) + "," + (p2[1] - (p3[1] - p1[1]) * alpha / 3) + " " + p2[0] + "," + p2[1];
    }
    return d;
  };

  const fillNav = () => { const l = smooth("nav"); return l ? l + ` L${x(rb.length - 1)},${pad.t + h} L${pad.l},${pad.t + h} Z` : "" };

  const fR = (rb[rb.length - 1].nav - 100).toFixed(1);

  // CAGR calculation
  const calcCAGR = () => {
    const startNav = filtered[0].nav;
    const endNav = filtered[filtered.length - 1].nav;
    const startDate = filtered[0].date;
    const endDate = filtered[filtered.length - 1].date;
    const years = (endDate.getTime() - startDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
    if (years <= 0 || startNav <= 0) return null;
    const totalReturn = endNav / startNav;
    const cagr = (Math.pow(totalReturn, 1 / years) - 1) * 100;
    return { cagr: cagr.toFixed(1), years: years.toFixed(1) };
  };
  const cagrData = calcCAGR();

  // Y-axis ticks
  const ticks = [];
  const tickStep = Math.max(5, Math.round((mx - mn) / 5 / 5) * 5);
  for (let v = Math.ceil(mn / tickStep) * tickStep; v <= mx; v += tickStep) ticks.push(v);

  // X-axis labels — evenly spaced, max 6, no overlap at end
  const xL = [];
  const labelCount = Math.min(6, rb.length);
  const labelStep = Math.max(1, Math.floor((rb.length - 1) / (labelCount - 1)));
  const dateFmt = range === "ytd" || range === 12
    ? { month: "short", day: "numeric" }
    : { month: "short", year: "2-digit" };
  for (let i = 0; i < rb.length; i += labelStep) {
    // Skip if too close to the end (within 40% of a step) — the end label will cover it
    if (i > 0 && i !== rb.length - 1 && (rb.length - 1 - i) < labelStep * 0.4) continue;
    xL.push({ i, label: rb[i].date.toLocaleDateString("en", dateFmt) });
  }
  // Always add the last point if not already there
  if (xL.length === 0 || xL[xL.length - 1].i !== rb.length - 1) {
    xL.push({ i: rb.length - 1, label: rb[rb.length - 1].date.toLocaleDateString("en", dateFmt) });
  }

  useEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
  }, [range, rb.length]);

  const gNav = "perfGradNav" + range;

  // Tooltip mouse handler
  const onMove = e => {
    const r = ref.current.getBoundingClientRect();
    const mx2 = (e.clientX - r.left) / r.width * W;
    const frac = (mx2 - pad.l) / w;
    const targetTime = t0 + frac * tSpan;
    let best = 0, bestDist = Infinity;
    for (let i = 0; i < rb.length; i++) {
      const dist = Math.abs(rb[i].date.getTime() - targetTime);
      if (dist < bestDist) { bestDist = dist; best = i }
    }
    if (best >= 0 && best < rb.length) setTip({ idx: best, cx: x(best), cy: y(rb[best].nav) });
  };

  const tipData = tip && tip.idx >= 0 && tip.idx < rb.length ? rb[tip.idx] : null;

  return (
    <Card T={T} style={{ marginBottom: 20, padding: "24px 24px 20px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontSize: 11, color: T.textTer, textTransform: "uppercase", letterSpacing: "0.12em", fontFamily: Fn, fontWeight: 600, marginBottom: 10 }}>Performance</div>
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            {/* Fund */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 10, height: 3, background: T.capRed, borderRadius: 2 }} />
              <span style={{ fontSize: 12, fontFamily: Fn, color: T.text, fontWeight: 500 }}>Cape Equity Fund</span>
              <span style={{ fontSize: 18, fontFamily: Fn, fontWeight: 600, color: parseFloat(fR) >= 0 ? T.green : T.capRed, fontFeatureSettings: '"tnum"' }}>{parseFloat(fR) >= 0 ? "+" : ""}{fR}%</span>
            </div>
            {/* CAGR */}
            {cagrData && (
              <Pill T={T} color={parseFloat(cagrData.cagr) >= 0 ? T.green : T.capRed} bg={parseFloat(cagrData.cagr) >= 0 ? T.greenBg : T.redBg}>
                {parseFloat(cagrData.cagr) >= 0 ? "+" : ""}{cagrData.cagr}% CAGR
                {range !== "ytd" && <span style={{ opacity: 0.7, marginLeft: 4 }}>({cagrData.years}y)</span>}
              </Pill>
            )}
          </div>
        </div>
        <TabBar tabs={Object.entries(ranges).map(([l, v]) => ({ k: v, l }))} active={range} onChange={setRange} T={T} />
      </div>

      {/* Chart */}
      <div style={{ position: "relative" }}>
        <svg ref={ref} viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }} onMouseMove={onMove} onMouseLeave={() => setTip(null)}>
          <defs>
            <linearGradient id={gNav} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={T.capRed} stopOpacity="0.18" />
              <stop offset="60%" stopColor={T.capRed} stopOpacity="0.04" />
              <stop offset="100%" stopColor={T.capRed} stopOpacity="0" />
            </linearGradient>
            <filter id="glow2">
              <feGaussianBlur stdDeviation="2.5" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <clipPath id="chartArea"><rect x={pad.l} y={pad.t} width={w} height={h} /></clipPath>
          </defs>

          {/* Y-axis grid */}
          {ticks.map((v, i) => (
            <g key={i}>
              <line x1={pad.l} x2={W - pad.r} y1={y(v)} y2={y(v)} stroke={T.text} strokeWidth="0.3" strokeOpacity="0.06" />
              <text x={pad.l - 10} y={y(v) + 3.5} textAnchor="end" fontSize="10" fill={T.textTer} fontFamily={Fn} style={{ fontFeatureSettings: '"tnum"' }} opacity="0.7">{v}</text>
            </g>
          ))}

          {/* X-axis labels */}
          {xL.map((xl, i) => <text key={i} x={x(xl.i)} y={H - 10} textAnchor="middle" fontSize="10" fill={T.textTer} fontFamily={Fn} opacity="0.7">{xl.label}</text>)}

          {/* Baseline at 100 */}
          <line x1={pad.l} x2={W - pad.r} y1={y(100)} y2={y(100)} stroke={T.text} strokeWidth="0.5" strokeOpacity="0.1" strokeDasharray="6 4" />

          {/* Fill — clipped */}
          <g clipPath="url(#chartArea)">
            <path d={fillNav()} fill={`url(#${gNav})`} />
          </g>

          {/* Fund line with glow */}
          <path
            ref={pathRef}
            d={smooth("nav")} fill="none" stroke={T.capRed} strokeWidth="2.5" strokeLinecap="round"
            filter="url(#glow2)" clipPath="url(#chartArea)"
            strokeDasharray={pathLen || "none"} strokeDashoffset={pathLen || 0}
            style={{ animation: pathLen ? "drawLine 1.2s cubic-bezier(0.4,0,0.2,1) forwards" : "none" }}
          />

          {/* End dot */}
          <circle cx={x(rb.length - 1)} cy={y(rb[rb.length - 1].nav)} r="4" fill={T.capRed} stroke={T.card} strokeWidth="2" />

          {/* Tooltip */}
          {tipData && (
            <g>
              <line x1={tip.cx} x2={tip.cx} y1={pad.t} y2={pad.t + h} stroke={T.text} strokeWidth="0.5" strokeOpacity="0.08" />
              <circle cx={tip.cx} cy={tip.cy} r="5.5" fill={T.capRed} stroke={T.card} strokeWidth="2.5" filter="url(#glow2)" />
              {(() => {
                const tw = 130, th = 52, tx = Math.max(pad.l, Math.min(tip.cx - tw / 2, W - pad.r - tw)), ty = Math.max(2, tip.cy - th - 14);
                const navVal = tipData.nav.toFixed(1);
                const retVal = (tipData.nav - 100).toFixed(1);
                const isUp = parseFloat(retVal) >= 0;
                return (
                  <g>
                    <rect x={tx} y={ty} width={tw} height={th} rx="10" fill={T.card} stroke={T.border} strokeWidth="0.5" style={{ filter: `drop-shadow(0 4px 12px rgba(0,0,0,0.12))` }} />
                    <text x={tx + tw / 2} y={ty + 16} textAnchor="middle" fontSize="10" fill={T.textTer} fontFamily={Fn}>
                      {tipData.date.toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" })}
                    </text>
                    <text x={tx + 16} y={ty + 36} fontSize="13" fontFamily={Fn} fontWeight="700" fill={T.capRed} style={{ fontFeatureSettings: '"tnum"' }}>
                      {navVal}
                    </text>
                    <text x={tx + 16} y={ty + 46} fontSize="8" fontFamily={Fn} fill={T.textTer}>Index</text>
                    <text x={tx + 80} y={ty + 36} fontSize="13" fontFamily={Fn} fontWeight="700" fill={isUp ? T.green : T.capRed} style={{ fontFeatureSettings: '"tnum"' }}>
                      {isUp ? "+" : ""}{retVal}%
                    </text>
                    <text x={tx + 80} y={ty + 46} fontSize="8" fontFamily={Fn} fill={T.textTer}>Return</text>
                  </g>
                );
              })()}
            </g>
          )}
        </svg>
      </div>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "flex-end", fontSize: 10, color: T.textTer, marginTop: 8, fontFamily: Fn, opacity: 0.6 }}>
        Rebased to 100 &middot; {getGranularityLabel(range)} &middot; EUR
      </div>
    </Card>
  );
}
