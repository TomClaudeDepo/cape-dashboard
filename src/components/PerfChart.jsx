import { useState, useRef, useEffect } from "react";
import { Fn } from "../theme";
import { Card, Pill, TabBar } from "./shared";
import { useMobile } from "../hooks/useMobile";

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
    out.push({ date: new Date(t), nav: n0 + frac * (n1 - n0) });
  }
  const last = src[src.length - 1];
  if (out.length === 0 || out[out.length - 1].date.getTime() !== last.date.getTime())
    out.push({ date: last.date, nav: last.nav });
  return out;
}

function getIntervalDays(range) {
  if (range === "ytd") return 3;
  if (range === 12) return 7;
  if (range === 36) return 14;
  if (range === 60) return 14;
  return 30;
}
function granLabel(range) {
  if (range === "ytd") return "Daily";
  if (range === 12) return "Weekly";
  return range === "all" ? "Monthly" : "Bi-weekly";
}

export default function PerfChart({ data, T, green = false }) {
  const mob = useMobile();
  const ref = useRef(null);
  const pathRef = useRef(null);
  const [range, setRange] = useState("all");
  const [tip, setTip] = useState(null);
  const [pathLen, setPathLen] = useState(0);
  const ranges = { "YTD": "ytd", "1Y": 12, "3Y": 36, "5Y": 60, "All": "all" };

  const filtered = (() => {
    if (range === "all") return data;
    const end = data[data.length - 1].date;
    let s;
    if (range === "ytd") s = new Date(2025, 11, 31);
    else { s = new Date(end); s.setMonth(s.getMonth() - range); }
    return data.filter(d => d.date >= s);
  })();
  if (filtered.length < 2) return null;

  const sampled = resample(filtered, getIntervalDays(range));
  if (sampled.length < 2) return null;

  const bN = sampled[0].nav;
  const rb = sampled.map(p => ({ date: p.date, nav: (p.nav / bN) * 100 }));

  const W = 720, H = mob ? 260 : 320;
  const pad = { t: 20, r: 16, b: 36, l: mob ? 40 : 48 };
  const w = W - pad.l - pad.r, h = H - pad.t - pad.b;
  const allV = rb.map(p => p.nav);
  const mn = Math.min(...allV) * 0.97, mx = Math.max(...allV) * 1.03;
  const t0 = rb[0].date.getTime(), tN = rb[rb.length - 1].date.getTime(), tSpan = tN - t0 || 1;
  const xP = i => pad.l + ((rb[i].date.getTime() - t0) / tSpan) * w;
  const yP = v => pad.t + (1 - (v - mn) / (mx - mn)) * h;

  const smooth = key => {
    const ps = rb.map((p, i) => [xP(i), yP(p[key])]);
    if (ps.length < 2) return "";
    if (ps.length === 2) return "M" + ps[0].join(",") + "L" + ps[1].join(",");
    const a = 0.42;
    let d = "M" + ps[0][0] + "," + ps[0][1];
    for (let i = 0; i < ps.length - 1; i++) {
      const p0 = ps[Math.max(0, i - 1)], p1 = ps[i], p2 = ps[i + 1], p3 = ps[Math.min(ps.length - 1, i + 2)];
      d += " C" + (p1[0] + (p2[0] - p0[0]) * a / 3) + "," + (p1[1] + (p2[1] - p0[1]) * a / 3) + " " + (p2[0] - (p3[0] - p1[0]) * a / 3) + "," + (p2[1] - (p3[1] - p1[1]) * a / 3) + " " + p2[0] + "," + p2[1];
    }
    return d;
  };
  const fillP = () => { const l = smooth("nav"); return l ? l + ` L${xP(rb.length - 1)},${pad.t + h} L${pad.l},${pad.t + h} Z` : ""; };

  const fR = (rb[rb.length - 1].nav - 100).toFixed(1);

  const cagr = (s, e, sd, ed) => {
    const y = (ed.getTime() - sd.getTime()) / (365.25 * 864e5);
    return y > 0 && s > 0 ? ((Math.pow(e / s, 1 / y) - 1) * 100).toFixed(1) : null;
  };
  const yrs = ((filtered[filtered.length - 1].date.getTime() - filtered[0].date.getTime()) / (365.25 * 864e5)).toFixed(1);
  const fundCAGR = cagr(filtered[0].nav, filtered[filtered.length - 1].nav, filtered[0].date, filtered[filtered.length - 1].date);

  const dd = () => {
    let peak = -Infinity, mdd = 0;
    for (const p of rb) { if (p.nav > peak) peak = p.nav; const d = (p.nav - peak) / peak; if (d < mdd) mdd = d; }
    return (mdd * 100).toFixed(1);
  };

  const ticks = [];
  const tickStep = Math.max(5, Math.round((mx - mn) / 5 / 5) * 5);
  for (let v = Math.ceil(mn / tickStep) * tickStep; v <= mx; v += tickStep) ticks.push(v);

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
  }, [range, rb.length]);

  const gNav = "gN" + range;

  const findNearest = clientX => {
    const r = ref.current.getBoundingClientRect();
    const mx2 = (clientX - r.left) / r.width * W;
    const frac = (mx2 - pad.l) / w;
    const target = t0 + frac * tSpan;
    let best = 0, bd = Infinity;
    for (let i = 0; i < rb.length; i++) { const d = Math.abs(rb[i].date.getTime() - target); if (d < bd) { bd = d; best = i; } }
    if (best >= 0 && best < rb.length) setTip({ idx: best, cx: xP(best), cy: yP(rb[best].nav) });
  };
  const onMove = e => findNearest(e.clientX);
  const onTouch = e => { if (e.touches.length > 0) findNearest(e.touches[0].clientX); };
  const tipData = tip && tip.idx >= 0 && tip.idx < rb.length ? rb[tip.idx] : null;

  const fc = green ? T.green : T.capRed;

  return (
    <Card T={T} style={{ marginBottom: 0, padding: mob ? "16px 12px 14px" : "24px 24px 20px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: mob ? 12 : 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontSize: 11, color: T.textTer, textTransform: "uppercase", letterSpacing: "0.12em", fontFamily: Fn, fontWeight: 600, marginBottom: 10 }}>Performance</div>
          <div style={{ display: "flex", gap: mob ? 8 : 16, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 12, height: 3, background: fc, borderRadius: 2 }} />
              <span style={{ fontSize: mob ? 11 : 12, fontFamily: Fn, color: T.text, fontWeight: 500 }}>Cape Equity Fund</span>
              <span style={{ fontSize: mob ? 15 : 18, fontFamily: Fn, fontWeight: 600, color: parseFloat(fR) >= 0 ? T.green : T.capRed, fontFeatureSettings: '"tnum"' }}>{parseFloat(fR) >= 0 ? "+" : ""}{fR}%</span>
            </div>
            {fundCAGR && (
              <Pill T={T} color={parseFloat(fundCAGR) >= 0 ? T.green : T.capRed} bg={parseFloat(fundCAGR) >= 0 ? T.greenBg : T.redBg}>
                {parseFloat(fundCAGR) >= 0 ? "+" : ""}{fundCAGR}% CAGR
                {range !== "ytd" && <span style={{ opacity: 0.7, marginLeft: 4 }}>({yrs}y)</span>}
              </Pill>
            )}
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
              <stop offset="0%" stopColor={fc} stopOpacity="0.18" />
              <stop offset="60%" stopColor={fc} stopOpacity="0.04" />
              <stop offset="100%" stopColor={fc} stopOpacity="0" />
            </linearGradient>
            <filter id="glow2"><feGaussianBlur stdDeviation="2.5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            <clipPath id="chartArea"><rect x={pad.l} y={pad.t} width={w} height={h} /></clipPath>
          </defs>

          {ticks.map((v, i) => (
            <g key={i}>
              <line x1={pad.l} x2={W - pad.r} y1={yP(v)} y2={yP(v)} stroke={T.text} strokeWidth="0.3" strokeOpacity="0.06" />
              <text x={pad.l - 8} y={yP(v) + 3.5} textAnchor="end" fontSize="10" fill={T.textTer} fontFamily={Fn} style={{ fontFeatureSettings: '"tnum"' }} opacity="0.7">{v}</text>
            </g>
          ))}

          {xL.map((xl, i) => <text key={i} x={xP(xl.i)} y={H - 10} textAnchor="middle" fontSize={mob ? 8 : 10} fill={T.textTer} fontFamily={Fn} opacity="0.7">{xl.label}</text>)}

          <line x1={pad.l} x2={W - pad.r} y1={yP(100)} y2={yP(100)} stroke={T.text} strokeWidth="0.5" strokeOpacity="0.12" strokeDasharray="6 4" />

          <g clipPath="url(#chartArea)"><path d={fillP()} fill={`url(#${gNav})`} /></g>
          <path ref={pathRef} d={smooth("nav")} fill="none" stroke={fc} strokeWidth="2.5" strokeLinecap="round"
            filter="url(#glow2)" clipPath="url(#chartArea)"
            strokeDasharray={pathLen ? `${pathLen} ${pathLen}` : "none"} strokeDashoffset={pathLen || 0}
            style={{ animation: pathLen ? "drawLine 1.2s cubic-bezier(0.4,0,0.2,1) forwards" : "none" }} />

          <circle cx={xP(rb.length - 1)} cy={yP(rb[rb.length - 1].nav)} r="4" fill={fc} stroke={T.card} strokeWidth="2" />

          {tipData && (
            <g>
              <line x1={tip.cx} x2={tip.cx} y1={pad.t} y2={pad.t + h} stroke={T.text} strokeWidth="0.5" strokeOpacity="0.08" />
              <circle cx={tip.cx} cy={tip.cy} r="5.5" fill={fc} stroke={T.card} strokeWidth="2.5" filter="url(#glow2)" />
              {(() => {
                const tw = 130, th = 52;
                const tx = Math.max(pad.l, Math.min(tip.cx - tw / 2, W - pad.r - tw));
                const ty = Math.max(2, tip.cy - th - 14);
                const navVal = tipData.nav.toFixed(1);
                const retVal = (tipData.nav - 100).toFixed(1);
                const isUp = parseFloat(retVal) >= 0;
                return (
                  <g>
                    <rect x={tx} y={ty} width={tw} height={th} rx="10" fill={T.card} stroke={T.border} strokeWidth="0.5" style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.12))" }} />
                    <text x={tx + tw / 2} y={ty + 16} textAnchor="middle" fontSize="10" fill={T.textTer} fontFamily={Fn}>
                      {tipData.date.toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" })}
                    </text>
                    <text x={tx + 16} y={ty + 36} fontSize="13" fontFamily={Fn} fontWeight="700" fill={fc} style={{ fontFeatureSettings: '"tnum"' }}>{navVal}</text>
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

      {/* Stats strip */}
      <div style={{ display: "grid", gridTemplateColumns: mob ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 1, background: T.border, borderRadius: 8, overflow: "hidden", margin: "12px 0 8px" }}>
        {[
          { l: "Total Return", v: (parseFloat(fR) >= 0 ? "+" : "") + fR + "%", c: parseFloat(fR) >= 0 ? T.green : T.capRed },
          { l: "CAGR", v: fundCAGR ? (parseFloat(fundCAGR) >= 0 ? "+" : "") + fundCAGR + "%" : "—", c: fundCAGR && parseFloat(fundCAGR) >= 0 ? T.green : T.capRed },
          { l: "Max Drawdown", v: dd() + "%", c: T.capRed },
          { l: "Period", v: yrs + "y", c: T.text },
        ].map((s, i) => (
          <div key={i} style={{ background: T.card, padding: mob ? "10px 8px" : "12px 14px", textAlign: "center" }}>
            <div style={{ fontSize: 8, color: T.textTer, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>{s.l}</div>
            <span style={{ fontSize: 14, fontWeight: 600, fontFamily: Fn, color: s.c, fontFeatureSettings: '"tnum"' }}>{s.v}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ fontSize: 10, color: T.textTer, marginTop: 4, fontFamily: Fn, opacity: 0.6, textAlign: "right" }}>
        Rebased to 100 · {granLabel(range)} · EUR
      </div>
    </Card>
  );
}
