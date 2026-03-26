import { useState, useEffect } from "react";
import { Fn } from "../theme";
import { VD, FD, acwiHoldingWts } from "../data/portfolio";
import { fmtPct, fmtX, fmtPv, fmtBn } from "../utils";
import { Pill, Card, Label } from "./shared";

// Mini sparkline SVG for the drawer
function Sparkline({ data, color, T }) {
  if (!data || data.length < 2) return null;
  const W = 200, H = 50;
  const mn = Math.min(...data), mx = Math.max(...data);
  const range = mx - mn || 1;
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * W,
    H - ((v - mn) / range) * H * 0.85 - H * 0.075,
  ]);
  const d = pts.map((p, i) => (i === 0 ? "M" : "L") + p[0] + "," + p[1]).join(" ");
  const fill = d + ` L${W},${H} L0,${H} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: 50 }}>
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={fill} fill="url(#sparkGrad)" />
      <path d={d} fill="none" stroke={color} strokeWidth="2" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="3" fill={color} />
    </svg>
  );
}

// Generate fake sparkline data from P&L percentage
function genSparkline(up) {
  const pts = [];
  let v = 100;
  const trend = up / 100;
  for (let i = 0; i < 30; i++) {
    v += (trend * 100 / 30) + (Math.random() - 0.48) * 2;
    pts.push(v);
  }
  return pts;
}

function MetricRow({ label, value, color, T }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 12, fontFamily: Fn }}>
      <span style={{ color: T.textTer }}>{label}</span>
      <span style={{ color: color || T.text, fontWeight: 500, fontFeatureSettings: '"tnum"' }}>{value}</span>
    </div>
  );
}

export default function HoldingDrawer({ holding, onClose, T }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (holding) requestAnimationFrame(() => setVisible(true));
    else setVisible(false);
  }, [holding]);

  const close = () => { setVisible(false); setTimeout(onClose, 250) };

  if (!holding) return null;

  const h = holding;
  const v = VD[h.name] || {};
  const f = FD[h.name] || {};
  const acwiWt = acwiHoldingWts[h.name] || 0;
  const activeWt = h.wt - acwiWt;
  const spark = genSparkline(h.up);

  return (
    <>
      {/* Backdrop */}
      <div onClick={close} style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)",
        zIndex: 50, opacity: visible ? 1 : 0, transition: "opacity 0.25s",
      }} />

      {/* Drawer */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, width: 420, maxWidth: "90vw",
        background: T.card, boxShadow: T.shadowXl, zIndex: 51,
        transform: visible ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1)",
        display: "flex", flexDirection: "column", overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid " + T.border, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 600, color: T.text, fontFamily: Fn }}>{h.name}</div>
            <div style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, marginTop: 2 }}>{h.t} &middot; {h.gics} &middot; {h.co}</div>
          </div>
          <button onClick={close} style={{ background: T.pillBg, border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", color: T.textSec, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s" }}>
            &times;
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
          {/* Key stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
            <div style={{ background: T.pillBg, borderRadius: T.radiusSm, padding: "12px", textAlign: "center" }}>
              <div style={{ fontSize: 10, color: T.textTer, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: Fn }}>Weight</div>
              <div style={{ fontSize: 18, fontWeight: 600, color: T.text, fontFamily: Fn, marginTop: 4, fontFeatureSettings: '"tnum"' }}>{h.wt.toFixed(2)}%</div>
            </div>
            <div style={{ background: h.up >= 0 ? T.greenBg : T.redBg, borderRadius: T.radiusSm, padding: "12px", textAlign: "center" }}>
              <div style={{ fontSize: 10, color: T.textTer, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: Fn }}>P&L</div>
              <div style={{ fontSize: 18, fontWeight: 600, color: h.up >= 0 ? T.green : T.capRed, fontFamily: Fn, marginTop: 4, fontFeatureSettings: '"tnum"' }}>{fmtPct(h.up)}</div>
            </div>
            <div style={{ background: T.pillBg, borderRadius: T.radiusSm, padding: "12px", textAlign: "center" }}>
              <div style={{ fontSize: 10, color: T.textTer, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: Fn }}>Active</div>
              <div style={{ fontSize: 18, fontWeight: 600, color: T.green, fontFamily: Fn, marginTop: 4, fontFeatureSettings: '"tnum"' }}>+{activeWt.toFixed(1)}%</div>
            </div>
          </div>

          {/* Sparkline */}
          <div style={{ marginBottom: 20 }}>
            <Label T={T}>30-Day Trend</Label>
            <Sparkline data={spark} color={h.up >= 0 ? T.green : T.capRed} T={T} />
          </div>

          {/* Valuation */}
          <div style={{ marginBottom: 20 }}>
            <Label T={T}>Valuation</Label>
            <div style={{ background: T.bg, borderRadius: T.radiusSm, padding: "12px 14px" }}>
              <MetricRow label="Market Cap" value={fmtBn(v.mc)} T={T} />
              <MetricRow label="P/E NTM" value={fmtX(v.pn)} T={T} />
              <MetricRow label="P/E FY2" value={fmtX(v.p2)} T={T} />
              <MetricRow label="EV/EBITDA NTM" value={fmtX(v.en)} T={T} />
              <MetricRow label="P/B" value={fmtX(v.bn)} T={T} />
              <MetricRow label="P/S" value={fmtX(v.sn)} T={T} />
              <MetricRow label="Fwd 2Y EPS Growth" value={fmtPv(v.fe)} color={v.fe > 0 ? T.green : T.capRed} T={T} />
            </div>
          </div>

          {/* Fundamentals */}
          <div style={{ marginBottom: 20 }}>
            <Label T={T}>Fundamentals</Label>
            <div style={{ background: T.bg, borderRadius: T.radiusSm, padding: "12px 14px" }}>
              <MetricRow label="EBITDA Margin" value={fmtPv(f.em)} color={f.em >= 30 ? T.green : f.em < 10 ? T.capRed : T.textSec} T={T} />
              <MetricRow label="Net Margin" value={fmtPv(f.nm)} T={T} />
              <MetricRow label="FCF Margin" value={fmtPv(f.fc)} T={T} />
              <MetricRow label="ROE" value={fmtPv(f.roe)} color={f.roe >= 20 ? T.green : T.textSec} T={T} />
              <MetricRow label="ROIC" value={fmtPv(f.roi)} T={T} />
              <MetricRow label="ND/EBITDA" value={f.nd == null ? "\u2014" : f.nd.toFixed(1) + "x"} color={f.nd > 3 ? T.capRed : f.nd < 0 ? T.green : T.textSec} T={T} />
              <MetricRow label="Div Yield" value={fmtPv(f.dy)} T={T} />
            </div>
          </div>

          {/* Position context */}
          <div>
            <Label T={T}>Position Context</Label>
            <div style={{ background: T.bg, borderRadius: T.radiusSm, padding: "12px 14px" }}>
              <MetricRow label="Currency" value={h.ccy} T={T} />
              <MetricRow label="ACWI Weight" value={acwiWt.toFixed(2) + "%"} T={T} />
              <MetricRow label="Active Weight" value={"+" + activeWt.toFixed(2) + "%"} color={T.green} T={T} />
              <MetricRow label="Market Value" value={"\u20AC" + (h.mv / 1e6).toFixed(1) + "M"} T={T} />
              <MetricRow label="Unrealised P&L" value={"\u20AC" + (h.ugl / 1e3).toFixed(0) + "K"} color={h.ugl >= 0 ? T.green : T.capRed} T={T} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
