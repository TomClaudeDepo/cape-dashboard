import { useState, useRef, useEffect } from "react";
import { Fn } from "../theme";
import { Card, Pill, TabBar } from "./shared";
import { useMobile } from "../hooks/useMobile";

/* ── Resample to uniform intervals via linear interpolation ── */
function resample(src, intervalDays) {
  if (src.length < 2) return src;
  const start = src[0].date.getTime(), end = src[src.length - 1].date.getTime();
  const step = intervalDays * 86400000;
  const out = [];
  let si = 0;
  for (let t = start; t <= end; t += step) {
    while (si < src.length - 2 && src[si + 1].date.getTime() <= t) si++;
    const t0 = src[si].date.getTime(), t1 = src[Math.min(si + 1, src.length - 1)].date.getTime();
    const frac = t1 > t0 ? (t - t0) / (t1 - t0) : 0;
    const n0 = src[si].nav, n1 = src[Math.min(si + 1, src.length - 1)].nav;
    const b0 = src[si].bench, b1 = src[Math.min(si + 1, src.length - 1)].bench;
    out.push({ date: new Date(t), nav: n0 + frac * (n1 - n0), bench: b0 + frac * (b1 - b0) });
  }
  const last = src[src.length - 1];
  if (out.length === 0 || out[out.length - 1].date.getTime() !== last.date.getTime())
    out.push({ date: last.date, nav: last.nav, bench: last.bench });
  return out;
}

function getIntervalDays(range) {
  if (range === "ytd") return 7;
  if (range === 12) return 14;
  if (range === 36) return 30;
  if (range === 60) return 30;
  return 91;
}
function granLabel(range) {
  if (range === "ytd") return "Weekly";
  if (range === 12) return "Bi-weekly";
  return range === "all" ? "Quarterly" : "Monthly";
}

export default function PerfChart({ data, T }) {
  const mob = useMobile();
  const ref = useRef(null);
  const pathRef = useRef(null);
  const pathRefB = useRef(null);
  const [range, setRange] = useState("all");
  const [tip, setTip] = useState(null);
  const [pathLen, setPathLen] = useState(0);
  const [pathLenB, setPathLenB] = useState(0);
  const [showBench, setShowBench] = useState(true);
  const ranges = { "YTD": "ytd", "1Y": 12, "3Y": 36, "5Y": 60, "All": "all" };

  /* 1. Filter */
  const filtered = (() => {
    if (range === "all") return data;
    const end = data[data.length - 1].date;
    let s;
    if (range === "ytd") s = new Date(2025, 11, 31);
    else { s = new Date(end); s.setMonth(s.getMonth() - range); }
    return data.filter(d => d.date >= s);
  })();
  if (filtered.length < 2) return null;

  /* 2. Resample */
  const sampled = resample(filtered, getIntervalDays(range));
  if (sampled.length < 2) return null;

  /* 3. Rebase to 100 */
  const bN = sampled[0].nav, bB = sampled[0].bench;
  const rb = sampled.map(p => ({ date: p.date, nav: (p.nav / bN) * 100, bench: (p.bench / bB) * 100 }));

  /* Dimensions */
  const W = 720, H = mob ? 260 : 320;
  const pad = { t: 20, r: 16, b: 36, l: mob ? 40 : 48 };
  const w = W - pad.l - pad.r, h = H - pad.t - pad.b;
  const allV = rb.flatMap(p => showBench ? [p.nav, p.bench] : [p.nav]);
  const mn = Math.min(...allV) * 0.97, mx = Math.max(...allV) * 1.03;
  const t0 = rb[0].date.getTime(), tN = rb[rb.length - 1].date.getTime(), tSpan = tN - t0 || 1;
  const xP = i => pad.l + ((rb[i].date.getTime() - t0) / tSpan) * w;
  const yP = v => pad.t + (1 - (v - mn) / (mx - mn)) * h;

  /* Catmull-Rom spline */
  const smooth = key => {
    const ps = rb.map((p, i) => [xP(i), yP(p[key])]);
    if (ps.length < 2) return "";
    if (ps.length === 2) return "M" + ps[0].join(",") + "L" + ps[1].join(",");
    const a = 0.35;
    let d = "M" + ps[0][0] + "," + ps[0][1];
    for (let i = 0; i < ps.length - 1; i++) {
      const p0 = ps[Math.max(0, i - 1)], p1 = ps[i], p2 = ps[i + 1], p3 = ps[Math.min(ps.length - 1, i + 2)];
      d += " C" + (p1[0] + (p2[0] - p0[0]) * a / 3) + "," + (p1[1] + (p2[1] - p0[1]) * a / 3) + " " + (p2[0] - (p3[0] - p1[0]) * a / 3) + "," + (p2[1] - (p3[1] - p1[1]) * a / 3) + " " + p2[0] + "," + p2[1];
    }
    return d;
  };
  const fillP = key => { const l = smooth(key); return l ? l + ` L${xP(rb.length - 1)},${pad.t + h} L${pad.l},${pad.t + h} Z` : ""; };

  /* Returns */
  const fR = (rb[rb.length - 1].nav - 100).toFixed(1);
  const bR = (rb[rb.length - 1].bench - 100).toFixed(1);
  const alpha = (parseFloat(fR) - parseFloat(bR)).toFixed(1);

  /* CAGR */
  const cagr = (s, e, sd, ed) => {
    const y = (ed.getTime() - sd.getTime()) / (365.25 * 864e5);
    return y > 0 && s > 0 ? ((Math.pow(e / s, 1 / y) - 1) * 100).toFixed(1) : null;
  };
  const yrs = ((filtered[filtered.length - 1].date.getTime() - filtered[0].date.getTime()) / (365.25 * 864e5)).toFixed(1);
  const fundCAGR = cagr(filtered[0].nav, filtered[filtered.length - 1].nav, filtered[0].date, filtered[filtered.length - 1].date);
  const benchCAGR = cagr(filtered[0].bench, filtered[filtered.length - 1].bench, filtered[0].date, filtered[filtered.length - 1].date);

  /* Max drawdown */
  const dd = key => {
    let peak = -Infinity, mdd = 0;
    for (const p of rb) { if (p[key] > peak) peak = p[key]; const d = (p[key] - peak) / peak; if (d < mdd) mdd = d; }
    return (mdd * 100).toFixed(1);
  };

  /* Ticks */
  const ticks = [];
  const tickStep = Math.max(5, Math.round((mx - mn) / 5 / 5) * 5);
  for (let v = Math.ceil(mn / tickStep) * tickStep; v <= mx; v += tickStep) ticks.push(v);

  /* X-axis labels */
  const xL = [];
  const lc = Math.min(mob ? 4 : 6, rb.length);
  const ls = Math.max(1, Math.floor((rb.length - 1) / (lc - 1)));
  const df = range === "ytd" || range === 12 ? { month: "short", day: "numeric" } : { month: "short", year: "2-digit" };
  for (let i = 0; i < rb.length; i += ls) {
    if (i > 0 && i !== rb.length - 1 && (rb.length - 1 - i) < ls * 0.4) continue;
    xL.push({ i, label: rb[i].date.toLocaleDateString("en", df) });
  }
  if (xL.length === 0 || xL[xL.length - 1].i !== rb.length - 1)
    xL.push({ i: rb.length - 1, label: rb[rb.length - 1].date.toLocaleDateString("en", df) });

  useEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
    if (pathRefB.current) setPathLenB(pathRefB.current.getTotalLength());
  }, [range, rb.length, showBench]);

  const gNav = "gN" + range, gBen = "gB" + range;

  /* Tooltip handler (mouse + touch) */
  const findNearest = clientX => {
    const r = ref.current.getBoundingClientRect();
    const mx2 = (clientX - r.left) / r.width * W;
    const frac = (mx2 - pad.l) / w;
    const target = t0 + frac * tSpan;
    let best = 0, bd = Infinity;
    for (let i = 0; i < rb.length; i++) { const d = Math.abs(rb[i].date.getTime() - target); if (d < bd) { bd = d; best = i; } }
    if (best >= 0 && best < rb.length) setTip({ idx: best, cx: xP(best), cyN: yP(rb[best].nav), cyB: yP(rb[best].bench) });
  };
  const onMove = e => findNearest(e.clientX);
  const onTouch = e => { if (e.touches.length > 0) findNearest(e.touches[0].clientX); };
  const tipData = tip && tip.idx >= 0 && tip.idx < rb.length ? rb[tip.idx] : null;

  const fc = T.capRed, bc = T.deepBlue;

  return (
    <Card T={T} style={{ marginBottom: 20, padding: mob ? "16px 12px 14px" : "24px 24px 20px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: mob ? 12 : 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontSize: 11, color: T.textTer, textTransform: "uppercase", letterSpacing: "0.12em", fontFamily: Fn, fontWeight: 600, marginBottom: 10 }}>Performance</div>
          <div style={{ display: "flex", gap: mob ? 8 : 16, alignItems: "center", flexWrap: "wrap" }}>
            {/* Fund */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 12, height: 3, background: fc, borderRadius: 2 }} />
              <span style={{ fontSize: mob ? 11 : 12, fontFamily: Fn, color: T.text, fontWeight: 500 }}>Cape Equity</span>
              <span style={{ fontSize: mob ? 15 : 18, fontFamily: Fn, fontWeight: 600, color: parseFloat(fR) >= 0 ? T.green : T.capRed, fontFeatureSettings: '"tnum"' }}>{parseFloat(fR) >= 0 ? "+" : ""}{fR}%</span>
            </div>
            {/* Bench */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", opacity: showBench ? 1 : 0.4, transition: "opacity 0.2s" }} onClick={() => setShowBench(!showBench)}>
              <span style={{ width: 12, height: 3, background: bc, borderRadius: 2, opacity: showBench ? 1 : 0.3 }} />
              <span style={{ fontSize: mob ? 11 : 12, fontFamily: Fn, color: T.textSec, fontWeight: 500 }}>MSCI ACWI</span>
              <span style={{ fontSize: mob ? 15 : 18, fontFamily: Fn, fontWeight: 600, color: parseFloat(bR) >= 0 ? T.green : T.capRed, fontFeatureSettings: '"tnum"', opacity: showBench ? 1 : 0.4 }}>{parseFloat(bR) >= 0 ? "+" : ""}{bR}%</span>
            </div>
            {/* Alpha */}
            <Pill T={T} color={parseFloat(alpha) >= 0 ? T.green : T.capRed} bg={parseFloat(alpha) >= 0 ? T.greenBg : T.redBg}>
              {parseFloat(alpha) >= 0 ? "+" : ""}{alpha}% {mob ? "α" : "alpha"}
            </Pill>
          </div>
        </div>
        <TabBar tabs={Object.entries(ranges).map(([l, v]) => ({ k: v, l }))} active={range} onChange={setRange} T={T} />
      </div>

      {/* SVG Chart */}
      <div style={{ position: "relative" }}>
        <svg ref={ref} viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block", touchAction: "none" }}
          onMouseMove={onMove} onMouseLeave={() => setTip(null)} onTouchMove={onTouch} onTouchEnd={() => setTip(null)}>
          <defs>
            <linearGradient id={gNav} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={fc} stopOpacity="0.15" />
              <stop offset="60%" stopColor={fc} stopOpacity="0.03" />
              <stop offset="100%" stopColor={fc} stopOpacity="0" />
            </linearGradient>
            <linearGradient id={gBen} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={bc} stopOpacity="0.08" />
              <stop offset="100%" stopColor={bc} stopOpacity="0" />
            </linearGradient>
            <filter id="glow2"><feGaussianBlur stdDeviation="2.5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            <clipPath id="chartArea"><rect x={pad.l} y={pad.t} width={w} height={h} /></clipPath>
          </defs>

          {/* Y grid */}
          {ticks.map((v, i) => (
            <g key={i}>
              <line x1={pad.l} x2={W - pad.r} y1={yP(v)} y2={yP(v)} stroke={T.text} strokeWidth="0.3" strokeOpacity="0.06" />
              <text x={pad.l - 8} y={yP(v) + 3.5} textAnchor="end" fontSize="10" fill={T.textTer} fontFamily={Fn} style={{ fontFeatureSettings: '"tnum"' }} opacity="0.7">{v}</text>
            </g>
          ))}

          {/* X labels */}
          {xL.map((xl, i) => <text key={i} x={xP(xl.i)} y={H - 10} textAnchor="middle" fontSize={mob ? 8 : 10} fill={T.textTer} fontFamily={Fn} opacity="0.7">{xl.label}</text>)}

          {/* 100 baseline */}
          <line x1={pad.l} x2={W - pad.r} y1={yP(100)} y2={yP(100)} stroke={T.text} strokeWidth="0.5" strokeOpacity="0.12" strokeDasharray="6 4" />

          {/* Bench */}
          {showBench && (
            <g clipPath="url(#chartArea)">
              <path d={fillP("bench")} fill={`url(#${gBen})`} />
              <path ref={pathRefB} d={smooth("bench")} fill="none" stroke={bc} strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.5"
                strokeDasharray={pathLenB ? `${pathLenB} ${pathLenB}` : "none"} strokeDashoffset={pathLenB || 0}
                style={{ animation: pathLenB ? "drawLine 1.2s cubic-bezier(0.4,0,0.2,1) forwards" : "none" }} />
            </g>
          )}

          {/* Fund */}
          <g clipPath="url(#chartArea)"><path d={fillP("nav")} fill={`url(#${gNav})`} /></g>
          <path ref={pathRef} d={smooth("nav")} fill="none" stroke={fc} strokeWidth="2.5" strokeLinecap="round"
            filter="url(#glow2)" clipPath="url(#chartArea)"
            strokeDasharray={pathLen ? `${pathLen} ${pathLen}` : "none"} strokeDashoffset={pathLen || 0}
            style={{ animation: pathLen ? "drawLine 1.2s cubic-bezier(0.4,0,0.2,1) forwards" : "none" }} />

          {/* End dots */}
          <circle cx={xP(rb.length - 1)} cy={yP(rb[rb.length - 1].nav)} r="4" fill={fc} stroke={T.card} strokeWidth="2" />
          {showBench && <circle cx={xP(rb.length - 1)} cy={yP(rb[rb.length - 1].bench)} r="3.5" fill={bc} stroke={T.card} strokeWidth="2" opacity="0.7" />}

          {/* Tooltip */}
          {tipData && (
            <g>
              <line x1={tip.cx} x2={tip.cx} y1={pad.t} y2={pad.t + h} stroke={T.text} strokeWidth="0.5" strokeOpacity="0.08" />
              <circle cx={tip.cx} cy={tip.cyN} r="5" fill={fc} stroke={T.card} strokeWidth="2.5" filter="url(#glow2)" />
              {showBench && <circle cx={tip.cx} cy={tip.cyB} r="4" fill={bc} stroke={T.card} strokeWidth="2" />}
              {(() => {
                const tw = mob ? 148 : 170, th = showBench ? 72 : 50;
                const tx = Math.max(pad.l, Math.min(tip.cx - tw / 2, W - pad.r - tw));
                const ty = Math.max(2, Math.min(tip.cyN, showBench ? tip.cyB : tip.cyN) - th - 14);
                const nR = (tipData.nav - 100).toFixed(1), bRt = (tipData.bench - 100).toFixed(1);
                return (
                  <g>
                    <rect x={tx} y={ty} width={tw} height={th} rx="10" fill={T.card} stroke={T.border} strokeWidth="0.5" style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.12))" }} />
                    <text x={tx + tw / 2} y={ty + 14} textAnchor="middle" fontSize="9" fill={T.textTer} fontFamily={Fn}>
                      {tipData.date.toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" })}
                    </text>
                    {/* Fund */}
                    <circle cx={tx + 12} cy={ty + 30} r="3" fill={fc} />
                    <text x={tx + 20} y={ty + 33} fontSize="10" fontFamily={Fn} fill={T.textSec}>Cape</text>
                    <text x={tx + tw / 2 + 6} y={ty + 33} fontSize="12" fontFamily={Fn} fontWeight="700" fill={T.text} style={{ fontFeatureSettings: '"tnum"' }}>{tipData.nav.toFixed(1)}</text>
                    <text x={tx + tw - 12} y={ty + 33} textAnchor="end" fontSize="11" fontFamily={Fn} fontWeight="600" fill={parseFloat(nR) >= 0 ? T.green : T.capRed} style={{ fontFeatureSettings: '"tnum"' }}>{parseFloat(nR) >= 0 ? "+" : ""}{nR}%</text>
                    {/* Bench */}
                    {showBench && (
                      <g>
                        <circle cx={tx + 12} cy={ty + 50} r="3" fill={bc} />
                        <text x={tx + 20} y={ty + 53} fontSize="10" fontFamily={Fn} fill={T.textSec}>ACWI</text>
                        <text x={tx + tw / 2 + 6} y={ty + 53} fontSize="12" fontFamily={Fn} fontWeight="700" fill={T.text} style={{ fontFeatureSettings: '"tnum"' }}>{tipData.bench.toFixed(1)}</text>
                        <text x={tx + tw - 12} y={ty + 53} textAnchor="end" fontSize="11" fontFamily={Fn} fontWeight="600" fill={parseFloat(bRt) >= 0 ? T.green : T.capRed} style={{ fontFeatureSettings: '"tnum"' }}>{parseFloat(bRt) >= 0 ? "+" : ""}{bRt}%</text>
                        <line x1={tx + 8} x2={tx + tw - 8} y1={ty + 61} y2={ty + 61} stroke={T.border} strokeWidth="0.5" />
                        <text x={tx + 12} y={ty + 70} fontSize="8" fontFamily={Fn} fill={T.textTer}>Alpha</text>
                        <text x={tx + tw - 12} y={ty + 70} textAnchor="end" fontSize="10" fontFamily={Fn} fontWeight="600"
                          fill={parseFloat(nR) - parseFloat(bRt) >= 0 ? T.green : T.capRed} style={{ fontFeatureSettings: '"tnum"' }}>
                          {(parseFloat(nR) - parseFloat(bRt)).toFixed(1)}%
                        </text>
                      </g>
                    )}
                  </g>
                );
              })()}
            </g>
          )}
        </svg>
      </div>

      {/* Stats strip */}
      <div style={{ display: "grid", gridTemplateColumns: mob ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 1, background: T.border, borderRadius: 8, overflow: "hidden", margin: "12px 0 8px" }}>
        {[
          { l: "CAGR", fund: fundCAGR ? fundCAGR + "%" : "—", bench: benchCAGR ? benchCAGR + "%" : "—" },
          { l: "Period", fund: yrs + "y", same: true },
          { l: "Max Drawdown", fund: dd("nav") + "%", bench: dd("bench") + "%" },
          { l: "Active Return", fund: alpha + "%", isAlpha: true },
        ].map((s, i) => (
          <div key={i} style={{ background: T.card, padding: mob ? "10px 8px" : "12px 14px", textAlign: "center" }}>
            <div style={{ fontSize: 8, color: T.textTer, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>{s.l}</div>
            <div style={{ display: "flex", justifyContent: "center", gap: s.same ? 0 : 12, alignItems: "baseline" }}>
              {s.isAlpha ? (
                <span style={{ fontSize: 14, fontWeight: 600, fontFamily: Fn, color: parseFloat(alpha) >= 0 ? T.green : T.capRed, fontFeatureSettings: '"tnum"' }}>
                  {parseFloat(alpha) >= 0 ? "+" : ""}{alpha}%
                </span>
              ) : s.same ? (
                <span style={{ fontSize: 13, fontWeight: 500, fontFamily: Fn, color: T.text, fontFeatureSettings: '"tnum"' }}>{s.fund}</span>
              ) : (
                <>
                  <span style={{ fontSize: 13, fontWeight: 600, fontFamily: Fn, color: fc, fontFeatureSettings: '"tnum"' }}>{s.fund}</span>
                  {showBench && <span style={{ fontSize: 13, fontWeight: 600, fontFamily: Fn, color: bc, fontFeatureSettings: '"tnum"', opacity: 0.7 }}>{s.bench}</span>}
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 10, color: T.textTer, marginTop: 4, fontFamily: Fn, opacity: 0.6 }}>
        <span>Rebased to 100 · {granLabel(range)} · EUR</span>
        <span style={{ cursor: "pointer", opacity: 0.8 }} onClick={() => setShowBench(!showBench)}>
          {showBench ? "Hide" : "Show"} benchmark
        </span>
      </div>
    </Card>
  );
}
