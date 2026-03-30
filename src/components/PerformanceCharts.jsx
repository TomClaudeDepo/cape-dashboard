import { useState, useMemo, useRef, useCallback } from "react";
import { Fn } from "../theme";
import { useMobile } from "../hooks/useMobile";
import { priceHistory } from "../data/price-history";

/* ─── Constants ─── */
const PEERS = ["CN", "Union Pacific", "CSX", "CPKC", "Norfolk Southern"];
const COLORS = {
  CN: "#0066CC",
  "Union Pacific": "#FFB800",
  CSX: "#E63946",
  CPKC: "#06D6A0",
  "Norfolk Southern": "#9B5DE5",
};
const RANGES = [
  { id: "1Y", label: "1Y", months: 12 },
  { id: "3Y", label: "3Y", months: 36 },
  { id: "5Y", label: "5Y", months: 60 },
  { id: "MAX", label: "Max", months: 999 },
];

/* ─── Helpers ─── */
function parseDate(s) { return new Date(s + "T00:00:00"); }

function filterByRange(arr, months) {
  if (!arr || !arr.length) return [];
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - months);
  return months >= 999 ? arr : arr.filter(p => parseDate(p.d) >= cutoff);
}

function rebaseToHundred(arr) {
  if (!arr.length) return [];
  const base = arr[0].v;
  if (!base) return arr;
  return arr.map(p => ({ d: p.d, v: (p.v / base) * 100 }));
}

function formatDate(d) {
  const dt = typeof d === "string" ? parseDate(d) : d;
  return dt.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "2-digit" });
}

/* ─── SVG Line Chart ─── */
function LineChart({ series, T, mob, yLabel, yFormat, showLegend = true, height }) {
  const svgRef = useRef(null);
  const [hover, setHover] = useState(null);

  const W = mob ? 360 : 720;
  const H = height || (mob ? 280 : 340);
  const pad = { t: 16, r: 16, b: 32, l: mob ? 44 : 54 };
  const plotW = W - pad.l - pad.r;
  const plotH = H - pad.t - pad.b;

  /* Compute unified x-domain from all series dates */
  const { allDates, yMin, yMax, dateMap } = useMemo(() => {
    const dateSet = new Set();
    let mn = Infinity, mx = -Infinity;
    series.forEach(s => {
      s.data.forEach(p => {
        dateSet.add(p.d);
        if (p.v < mn) mn = p.v;
        if (p.v > mx) mx = p.v;
      });
    });
    const sorted = [...dateSet].sort();
    const map = {};
    sorted.forEach((d, i) => { map[d] = i; });
    const margin = (mx - mn) * 0.06 || 1;
    return { allDates: sorted, yMin: mn - margin, yMax: mx + margin, dateMap: map };
  }, [series]);

  if (!allDates.length) return null;

  const xScale = (d) => pad.l + (dateMap[d] / Math.max(allDates.length - 1, 1)) * plotW;
  const yScale = (v) => pad.t + plotH - ((v - yMin) / (yMax - yMin)) * plotH;

  /* Build path strings */
  const paths = useMemo(() => {
    return series.map(s => {
      const pts = s.data.map(p => `${xScale(p.d).toFixed(1)},${yScale(p.v).toFixed(1)}`);
      return { ...s, pathD: "M" + pts.join("L") };
    });
  }, [series, allDates, yMin, yMax]);

  /* Y-axis ticks */
  const yTicks = useMemo(() => {
    const count = mob ? 4 : 5;
    const step = (yMax - yMin) / count;
    return Array.from({ length: count + 1 }, (_, i) => yMin + step * i);
  }, [yMin, yMax, mob]);

  /* X-axis ticks */
  const xTicks = useMemo(() => {
    const count = mob ? 4 : 6;
    const step = Math.max(1, Math.floor(allDates.length / count));
    const ticks = [];
    for (let i = 0; i < allDates.length; i += step) ticks.push(allDates[i]);
    if (ticks[ticks.length - 1] !== allDates[allDates.length - 1]) ticks.push(allDates[allDates.length - 1]);
    return ticks;
  }, [allDates, mob]);

  /* Hover handler */
  const handleMouseMove = useCallback((e) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const scaleX = W / rect.width;
    const mouseX = (e.clientX - rect.left) * scaleX;
    const idx = Math.round(((mouseX - pad.l) / plotW) * (allDates.length - 1));
    const clamped = Math.max(0, Math.min(allDates.length - 1, idx));
    const date = allDates[clamped];
    
    const values = series.map(s => {
      const pt = s.data.find(p => p.d === date);
      if (pt) return { label: s.label, color: s.color, value: pt.v };
      // Find nearest
      let closest = null, minDist = Infinity;
      for (const p of s.data) {
        const di = Math.abs(dateMap[p.d] - clamped);
        if (di < minDist) { minDist = di; closest = p; }
      }
      return closest && minDist < 10 ? { label: s.label, color: s.color, value: closest.v } : null;
    }).filter(Boolean);

    setHover({ x: xScale(date), date, values, idx: clamped });
  }, [series, allDates, dateMap, W, plotW, pad.l]);

  const handleTouchMove = useCallback((e) => {
    if (e.touches.length === 1) {
      e.preventDefault();
      const touch = e.touches[0];
      handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY });
    }
  }, [handleMouseMove]);

  return (
    <div>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: "100%", height: "auto", display: "block", touchAction: "none" }}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseLeave={() => setHover(null)}
        onTouchEnd={() => setHover(null)}
      >
        {/* Grid */}
        {yTicks.map((v, i) => (
          <g key={i}>
            <line x1={pad.l} x2={W - pad.r} y1={yScale(v)} y2={yScale(v)} stroke={T.border} strokeWidth="0.5" />
            <text x={pad.l - 6} y={yScale(v) + 3.5} textAnchor="end" fontSize={mob ? 8 : 9} fill={T.textTer} fontFamily={Fn}>
              {yFormat ? yFormat(v) : v.toFixed(1)}
            </text>
          </g>
        ))}

        {/* X ticks */}
        {xTicks.map((d, i) => (
          <text key={i} x={xScale(d)} y={H - 6} textAnchor="middle" fontSize={mob ? 7 : 8.5} fill={T.textTer} fontFamily={Fn}>
            {formatDate(d)}
          </text>
        ))}

        {/* Lines */}
        {paths.map((s, i) => (
          <path key={i} d={s.pathD} fill="none" stroke={s.color} strokeWidth={s.label === "CN" ? 2.2 : 1.4} strokeLinejoin="round" opacity={0.9} />
        ))}

        {/* Hover crosshair */}
        {hover && (
          <g>
            <line x1={hover.x} x2={hover.x} y1={pad.t} y2={pad.t + plotH} stroke={T.textTer} strokeWidth="0.8" strokeDasharray="3,3" opacity="0.6" />
            {hover.values.map((v, i) => {
              const y = yScale(v.value);
              return (
                <circle key={i} cx={hover.x} cy={y} r={3.5} fill={v.color} stroke={T.card} strokeWidth="1.5" />
              );
            })}
          </g>
        )}
      </svg>

      {/* Tooltip panel */}
      {hover && (
        <div style={{
          background: T.card, border: "1px solid " + T.border, borderRadius: 10,
          padding: "10px 14px", marginTop: 4, display: "inline-block",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        }}>
          <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 6 }}>{formatDate(hover.date)}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: mob ? 10 : 20 }}>
            {hover.values.map((v, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: v.color }} />
                <span style={{ fontSize: 11, color: T.textSec, fontFamily: Fn }}>{v.label}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: Fn }}>
                  {yFormat ? yFormat(v.value) : v.value.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Legend */}
      {showLegend && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 10 }}>
          {series.map(s => (
            <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontFamily: Fn, color: T.textSec }}>
              <span style={{ width: 14, height: 3, borderRadius: 2, background: s.color, display: "inline-block" }} />
              {s.label} ({priceHistory[s.label]?.ticker})
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════ */
/* MAIN EXPORT: PerformanceCharts                   */
/* ════════════════════════════════════════════════ */
export default function PerformanceCharts({ T }) {
  const mob = useMobile();

  /* State */
  const [selectedPeers, setSelectedPeers] = useState(["CN", "Union Pacific", "CPKC"]);
  const [range, setRange] = useState("3Y");
  const [mode, setMode] = useState("indexed"); // "absolute" | "indexed"
  const [chartType, setChartType] = useState("price"); // "price" | "fwdPE" | "trailingPE"

  const togglePeer = (p) => {
    setSelectedPeers(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  };

  const months = RANGES.find(r => r.id === range)?.months || 36;

  /* Build series */
  const series = useMemo(() => {
    return selectedPeers.map(peer => {
      const data = priceHistory[peer];
      if (!data) return null;

      let raw;
      if (chartType === "price") raw = data.price;
      else if (chartType === "fwdPE") raw = data.fwdPE;
      else raw = data.trailingPE;

      if (!raw || !raw.length) return null;

      let filtered = filterByRange(raw, months);
      if (!filtered.length) return null;
      if (mode === "indexed" && chartType === "price") {
        filtered = rebaseToHundred(filtered);
      }

      return { label: peer, color: COLORS[peer], data: filtered };
    }).filter(Boolean);
  }, [selectedPeers, range, mode, chartType]);

  /* Y-axis format */
  const yFormat = useMemo(() => {
    if (chartType !== "price") return (v) => v.toFixed(1) + "x";
    if (mode === "indexed") return (v) => v.toFixed(0);
    return (v) => v.toFixed(0);
  }, [chartType, mode]);

  /* Summary stats */
  const stats = useMemo(() => {
    if (chartType !== "price") return null;
    return selectedPeers.map(peer => {
      const data = priceHistory[peer];
      if (!data?.price?.length) return null;
      const filtered = filterByRange(data.price, months);
      if (filtered.length < 2) return null;
      const first = filtered[0].v;
      const last = filtered[filtered.length - 1].v;
      const ret = ((last - first) / first) * 100;
      const max = Math.max(...filtered.map(p => p.v));
      const maxDate = filtered.find(p => p.v === max)?.d;
      const ddFromMax = ((last - max) / max) * 100;
      return { peer, first, last, ret, max, maxDate, ddFromMax, currency: data.currency };
    }).filter(Boolean);
  }, [selectedPeers, range, chartType]);

  const chartTypeOptions = [
    { id: "price", label: "Share Price" },
    { id: "fwdPE", label: "Forward P/E" },
    { id: "trailingPE", label: "Trailing P/E" },
  ];

  return (
    <div>
      {/* ─── Controls bar ─── */}
      <div style={{ display: "flex", flexDirection: mob ? "column" : "row", gap: mob ? 14 : 28, marginBottom: 20 }}>
        {/* Chart type */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 600, color: T.textTer, fontFamily: Fn, marginBottom: 6, letterSpacing: "0.08em" }}>CHART</div>
          <div style={{ display: "flex", gap: 0, borderRadius: 8, overflow: "hidden", border: "1px solid " + T.border }}>
            {chartTypeOptions.map(ct => {
              const on = ct.id === chartType;
              return (
                <button key={ct.id} onClick={() => setChartType(ct.id)} style={{
                  fontFamily: Fn, fontSize: 11, padding: "6px 14px", border: "none", cursor: "pointer",
                  background: on ? (T.text === "#0F172A" ? "#0F172A" : "#E4E4E7") : "transparent",
                  color: on ? (T.text === "#0F172A" ? "#fff" : "#000") : T.textSec,
                  fontWeight: on ? 600 : 400, transition: "all 0.15s",
                  borderRight: "1px solid " + T.border,
                }}>{ct.label}</button>
              );
            })}
          </div>
        </div>

        {/* Mode toggle (only for price) */}
        {chartType === "price" && (
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, color: T.textTer, fontFamily: Fn, marginBottom: 6, letterSpacing: "0.08em" }}>MODE</div>
            <div style={{ display: "flex", gap: 0, borderRadius: 8, overflow: "hidden", border: "1px solid " + T.border }}>
              {[
                { id: "indexed", label: "Indexed (100)" },
                { id: "absolute", label: "Absolute" },
              ].map(m => {
                const on = m.id === mode;
                return (
                  <button key={m.id} onClick={() => setMode(m.id)} style={{
                    fontFamily: Fn, fontSize: 11, padding: "6px 14px", border: "none", cursor: "pointer",
                    background: on ? (T.text === "#0F172A" ? "#0F172A" : "#E4E4E7") : "transparent",
                    color: on ? (T.text === "#0F172A" ? "#fff" : "#000") : T.textSec,
                    fontWeight: on ? 600 : 400, transition: "all 0.15s",
                    borderRight: "1px solid " + T.border,
                  }}>{m.label}</button>
                );
              })}
            </div>
          </div>
        )}

        {/* Range */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 600, color: T.textTer, fontFamily: Fn, marginBottom: 6, letterSpacing: "0.08em" }}>RANGE</div>
          <div style={{ display: "flex", gap: 0, borderRadius: 8, overflow: "hidden", border: "1px solid " + T.border }}>
            {RANGES.map(r => {
              const on = r.id === range;
              return (
                <button key={r.id} onClick={() => setRange(r.id)} style={{
                  fontFamily: Fn, fontSize: 11, padding: "6px 12px", border: "none", cursor: "pointer",
                  background: on ? (T.text === "#0F172A" ? "#0F172A" : "#E4E4E7") : "transparent",
                  color: on ? (T.text === "#0F172A" ? "#fff" : "#000") : T.textSec,
                  fontWeight: on ? 600 : 400, transition: "all 0.15s",
                  borderRight: "1px solid " + T.border,
                }}>{r.label}</button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Peer selection pills */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: T.textTer, fontFamily: Fn, marginBottom: 6, letterSpacing: "0.08em" }}>COMPANIES</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {PEERS.map(p => {
            const on = selectedPeers.includes(p);
            const c = COLORS[p];
            const hasPEData = chartType === "trailingPE" ? (priceHistory[p]?.trailingPE?.length > 0) : true;
            return (
              <button key={p} onClick={() => hasPEData && togglePeer(p)} style={{
                fontFamily: Fn, fontSize: 11, padding: "5px 14px",
                border: `1px solid ${on ? c : T.border}`,
                borderRadius: 20, cursor: hasPEData ? "pointer" : "not-allowed",
                background: on ? `${c}18` : "transparent",
                color: on ? c : T.textSec,
                fontWeight: on ? 600 : 400, transition: "all 0.15s",
                display: "flex", alignItems: "center", gap: 6,
                opacity: hasPEData ? 1 : 0.4,
              }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: on ? c : T.border, transition: "background 0.15s" }} />
                {p}
                {!hasPEData && <span style={{ fontSize: 9, color: T.textTer }}>(no data)</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chart area */}
      <div style={{ background: T.card, borderRadius: 12, border: "1px solid " + T.border, padding: mob ? 10 : 16 }}>
        {series.length > 0 ? (
          <LineChart
            series={series}
            T={T}
            mob={mob}
            yFormat={yFormat}
            height={mob ? 280 : 380}
          />
        ) : (
          <div style={{ padding: 60, textAlign: "center", color: T.textTer, fontFamily: Fn, fontSize: 13 }}>
            Select at least one company to display the chart.
          </div>
        )}
      </div>

      {/* Stats strip (price mode only) */}
      {stats && stats.length > 0 && (
        <div style={{ marginTop: 16, overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 500, background: T.card, borderRadius: 10, border: "1px solid " + T.border }}>
            <thead>
              <tr>
                <th style={{ padding: "8px 14px", fontFamily: Fn, fontSize: 10, textAlign: "left", fontWeight: 600, color: T.textTer, borderBottom: "2px solid " + T.border, letterSpacing: "0.04em" }}>Company</th>
                <th style={{ padding: "8px 14px", fontFamily: Fn, fontSize: 10, textAlign: "right", fontWeight: 600, color: T.textTer, borderBottom: "2px solid " + T.border }}>Start</th>
                <th style={{ padding: "8px 14px", fontFamily: Fn, fontSize: 10, textAlign: "right", fontWeight: 600, color: T.textTer, borderBottom: "2px solid " + T.border }}>Current</th>
                <th style={{ padding: "8px 14px", fontFamily: Fn, fontSize: 10, textAlign: "right", fontWeight: 600, color: T.textTer, borderBottom: "2px solid " + T.border }}>Return</th>
                <th style={{ padding: "8px 14px", fontFamily: Fn, fontSize: 10, textAlign: "right", fontWeight: 600, color: T.textTer, borderBottom: "2px solid " + T.border }}>Period High</th>
                <th style={{ padding: "8px 14px", fontFamily: Fn, fontSize: 10, textAlign: "right", fontWeight: 600, color: T.textTer, borderBottom: "2px solid " + T.border }}>DD from High</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((s, i) => (
                <tr key={i} style={{ background: s.peer === "CN" ? (T.text === "#0F172A" ? "rgba(0,102,204,0.04)" : "rgba(0,102,204,0.08)") : "transparent" }}>
                  <td style={{ padding: "8px 14px", fontFamily: Fn, fontSize: 12, fontWeight: s.peer === "CN" ? 600 : 400, color: COLORS[s.peer], borderBottom: "1px solid " + T.border }}>
                    {s.peer}
                  </td>
                  <td style={{ padding: "8px 14px", fontFamily: Fn, fontSize: 12, textAlign: "right", color: T.text, borderBottom: "1px solid " + T.border }}>
                    {s.currency === "CAD" ? "C$" : "$"}{s.first.toFixed(2)}
                  </td>
                  <td style={{ padding: "8px 14px", fontFamily: Fn, fontSize: 12, textAlign: "right", color: T.text, fontWeight: 600, borderBottom: "1px solid " + T.border }}>
                    {s.currency === "CAD" ? "C$" : "$"}{s.last.toFixed(2)}
                  </td>
                  <td style={{ padding: "8px 14px", fontFamily: Fn, fontSize: 12, textAlign: "right", fontWeight: 600, borderBottom: "1px solid " + T.border, color: s.ret >= 0 ? T.green : T.capRed }}>
                    {s.ret >= 0 ? "+" : ""}{s.ret.toFixed(1)}%
                  </td>
                  <td style={{ padding: "8px 14px", fontFamily: Fn, fontSize: 12, textAlign: "right", color: T.text, borderBottom: "1px solid " + T.border }}>
                    {s.currency === "CAD" ? "C$" : "$"}{s.max.toFixed(2)}
                  </td>
                  <td style={{ padding: "8px 14px", fontFamily: Fn, fontSize: 12, textAlign: "right", color: T.capRed, borderBottom: "1px solid " + T.border }}>
                    {s.ddFromMax.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
