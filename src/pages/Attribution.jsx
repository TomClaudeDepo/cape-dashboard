import { useState } from "react";
import { Fn, Fs } from "../theme";
import { holdings, acwiHoldingWts, portfolioGics, acwiGics } from "../data/portfolio";
import { MV } from "../data/constants";
import { fmtPct } from "../utils";
import { Card, Label, Pill, Stat, TabBar } from "../components/shared";

// --- Simulated return data for attribution (since inception, YTD, 1Y) ---
// Sector benchmark returns (ACWI sector returns, simulated)
const sectorBenchReturns = {
  "Information Technology": { si: 18.2, y1: 8.4, ytd: -2.1 },
  "Financials": { si: 9.8, y1: 12.1, ytd: 1.5 },
  "Health Care": { si: 7.2, y1: -3.2, ytd: -4.8 },
  "Industrials": { si: 10.5, y1: 6.8, ytd: -1.2 },
  "Comm. Services": { si: 14.1, y1: 11.3, ytd: -0.6 },
  "Cons. Disc.": { si: 11.3, y1: 4.2, ytd: -3.5 },
  "Materials": { si: 5.8, y1: -1.4, ytd: -2.8 },
  "Utilities": { si: 4.2, y1: 2.1, ytd: 0.8 },
};

// Per-holding simulated period returns
const holdingReturns = {
  "NVIDIA": { si: 42.5, y1: 18.2, ytd: -5.3 },
  "TAIWAN SEMI": { si: 38.2, y1: 22.4, ytd: -3.8 },
  "SAMSUNG": { si: 15.6, y1: -4.2, ytd: -8.1 },
  "MSCI": { si: 22.1, y1: 14.8, ytd: 1.2 },
  "PFIZER": { si: -8.4, y1: -12.3, ytd: -6.2 },
  "ICE": { si: 18.5, y1: 10.2, ytd: 0.8 },
  "MICROSOFT": { si: 28.4, y1: 12.1, ytd: -4.5 },
  "NOVARTIS": { si: 12.8, y1: 6.5, ytd: -1.2 },
  "HITACHI": { si: 35.2, y1: 28.4, ytd: 2.1 },
  "NETFLIX": { si: 32.1, y1: 22.8, ytd: -1.8 },
  "THERMO FISHER": { si: 8.2, y1: -8.5, ytd: -6.8 },
  "EPIROC": { si: 14.2, y1: 5.2, ytd: -3.1 },
  "JP MORGAN": { si: 16.8, y1: 15.2, ytd: 2.4 },
  "AMAZON": { si: 24.5, y1: 8.8, ytd: -5.2 },
  "ALIBABA": { si: 6.2, y1: 18.5, ytd: 4.2 },
  "TENCENT": { si: 12.4, y1: 14.2, ytd: 2.8 },
  "ALPHABET": { si: 26.8, y1: 10.5, ytd: -3.2 },
  "AIR LIQUIDE": { si: 10.2, y1: 4.8, ytd: -1.5 },
  "VOLVO": { si: 8.5, y1: -2.4, ytd: -5.8 },
  "ROCKWELL": { si: 6.8, y1: -1.2, ytd: -4.2 },
  "VEOLIA": { si: 5.2, y1: 3.8, ytd: 0.5 },
  "CORNING": { si: 18.8, y1: 12.5, ytd: -2.1 },
  "BROADCOM": { si: 22.4, y1: 8.2, ytd: -6.5 },
  "SERVICENOW": { si: 20.1, y1: 6.5, ytd: -7.2 },
  "AKZO NOBEL": { si: -4.2, y1: -12.8, ytd: -8.5 },
  "SIEMENS": { si: 12.5, y1: 8.4, ytd: -1.8 },
};

// Brinson attribution: Allocation + Selection + Interaction
function computeBrinson(period) {
  const sectors = [...new Set(holdings.map(h => h.gics))];
  const results = [];

  for (const sec of sectors) {
    const portHoldings = holdings.filter(h => h.gics === sec);
    const portWt = portHoldings.reduce((s, h) => s + h.wt, 0) / 100;
    const benchWt = (acwiGics.find(g => g.name === sec)?.wt || 0) / 100;

    // Weighted avg fund return for this sector
    const totalSecWt = portHoldings.reduce((s, h) => s + h.wt, 0);
    const portRet = totalSecWt > 0
      ? portHoldings.reduce((s, h) => s + (h.wt / totalSecWt) * (holdingReturns[h.name]?.[period] || 0), 0)
      : 0;
    const benchRet = sectorBenchReturns[sec]?.[period] || 0;

    // Total benchmark return (weighted across all sectors)
    const totalBenchRet = Object.entries(sectorBenchReturns).reduce((s, [k, v]) => {
      const bw = (acwiGics.find(g => g.name === k)?.wt || 0) / 100;
      return s + bw * v[period];
    }, 0);

    const allocation = (portWt - benchWt) * (benchRet - totalBenchRet);
    const selection = benchWt * (portRet - benchRet);
    const interaction = (portWt - benchWt) * (portRet - benchRet);
    const total = allocation + selection + interaction;

    results.push({ sector: sec, portWt: portWt * 100, benchWt: benchWt * 100, portRet, benchRet, allocation, selection, interaction, total });
  }

  // Totals
  const totals = {
    sector: "Total",
    portWt: results.reduce((s, r) => s + r.portWt, 0),
    benchWt: results.reduce((s, r) => s + r.benchWt, 0),
    portRet: results.reduce((s, r) => s + r.portRet * r.portWt / 100, 0) / (results.reduce((s, r) => s + r.portWt, 0) / 100),
    benchRet: results.reduce((s, r) => s + r.benchRet * r.benchWt / 100, 0) / (results.reduce((s, r) => s + r.benchWt, 0) / 100),
    allocation: results.reduce((s, r) => s + r.allocation, 0),
    selection: results.reduce((s, r) => s + r.selection, 0),
    interaction: results.reduce((s, r) => s + r.interaction, 0),
    total: results.reduce((s, r) => s + r.total, 0),
  };

  return { rows: results.sort((a, b) => Math.abs(b.total) - Math.abs(a.total)), totals };
}

// Per-holding contribution
function computeStockContrib(period) {
  return holdings.map(h => {
    const ret = holdingReturns[h.name]?.[period] || 0;
    const contrib = (h.wt / 100) * ret;
    const benchWt = (acwiHoldingWts[h.name] || 0) / 100;
    const activeWt = h.wt / 100 - benchWt;
    return { name: h.name, ticker: h.t, sector: h.gics, wt: h.wt, ret, contrib, activeWt: activeWt * 100 };
  }).sort((a, b) => b.contrib - a.contrib);
}

// Waterfall chart component
function Waterfall({ items, T }) {
  const maxAbs = Math.max(...items.map(it => Math.abs(it.value)), 0.01);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {items.map((it, i) => {
        const pct = (it.value / maxAbs) * 100;
        const isPos = it.value >= 0;
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, animation: "fadeIn 0.3s ease both", animationDelay: i * 0.04 + "s" }}>
            <div style={{ width: 110, fontSize: 11, color: it.bold ? T.text : T.textSec, textAlign: "right", flexShrink: 0, fontFamily: Fn, fontWeight: it.bold ? 700 : 400 }}>{it.label}</div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", position: "relative", height: 24 }}>
              {/* Center line */}
              <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: T.border }} />
              {/* Bar */}
              <div style={{
                position: "absolute",
                left: isPos ? "50%" : `calc(50% - ${Math.abs(pct) / 2}%)`,
                width: Math.abs(pct) / 2 + "%",
                height: 20, top: 2, borderRadius: 4,
                background: isPos
                  ? `linear-gradient(90deg, ${T.green}88, ${T.green})`
                  : `linear-gradient(90deg, ${T.capRed}, ${T.capRed}88)`,
                transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)",
                minWidth: Math.abs(it.value) > 0.001 ? 3 : 0,
              }} />
            </div>
            <div style={{ width: 60, fontSize: 11, fontFamily: Fn, fontWeight: it.bold ? 700 : 500, color: isPos ? T.green : T.capRed, textAlign: "right", fontFeatureSettings: '"tnum"' }}>
              {isPos ? "+" : ""}{it.value.toFixed(2)}%
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Scatter/bubble for stock contribution
function ContribBubbles({ stocks, T }) {
  const W = 600, H = 200, pad = { l: 50, r: 20, t: 20, b: 30 };
  const w = W - pad.l - pad.r, h = H - pad.t - pad.b;
  const rets = stocks.map(s => s.ret);
  const contribs = stocks.map(s => s.contrib);
  const mnR = Math.min(...rets, 0) * 1.1, mxR = Math.max(...rets, 0) * 1.1;
  const mnC = Math.min(...contribs, 0) * 1.1, mxC = Math.max(...contribs, 0) * 1.1;
  const x = v => pad.l + ((v - mnR) / (mxR - mnR || 1)) * w;
  const y = v => pad.t + (1 - (v - mnC) / (mxC - mnC || 1)) * h;
  const [hov, setHov] = useState(null);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }}>
      {/* Zero lines */}
      <line x1={x(0)} x2={x(0)} y1={pad.t} y2={H - pad.b} stroke={T.border} strokeWidth="1" strokeDasharray="3 3" />
      <line x1={pad.l} x2={W - pad.r} y1={y(0)} y2={y(0)} stroke={T.border} strokeWidth="1" strokeDasharray="3 3" />
      {/* Axis labels */}
      <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="9" fill={T.textTer} fontFamily={Fn}>Return %</text>
      <text x={12} y={H / 2} textAnchor="middle" fontSize="9" fill={T.textTer} fontFamily={Fn} transform={`rotate(-90, 12, ${H / 2})`}>Contribution %</text>
      {/* Bubbles */}
      {stocks.map((s, i) => {
        const cx = x(s.ret), cy = y(s.contrib);
        const r = Math.max(4, Math.min(16, Math.sqrt(s.wt) * 5));
        const isPos = s.contrib >= 0;
        return (
          <g key={i} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} style={{ cursor: "pointer" }}>
            <circle cx={cx} cy={cy} r={r} fill={isPos ? T.green : T.capRed} fillOpacity={hov === i ? 0.9 : 0.5} stroke={isPos ? T.green : T.capRed} strokeWidth={hov === i ? 2 : 0} style={{ transition: "all 0.15s" }} />
            {hov === i && (
              <g>
                <rect x={cx - 55} y={cy - 40} width="110" height="32" rx="6" fill={T.card} stroke={T.border} strokeWidth="0.5" />
                <text x={cx} y={cy - 26} textAnchor="middle" fontSize="10" fontWeight="600" fill={T.text} fontFamily={Fn}>{s.name}</text>
                <text x={cx} y={cy - 14} textAnchor="middle" fontSize="9" fill={T.textTer} fontFamily={Fn}>Ret {s.ret > 0 ? "+" : ""}{s.ret.toFixed(1)}% · Ctb {s.contrib > 0 ? "+" : ""}{s.contrib.toFixed(2)}%</text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export default function AttributionPg({ T, onHoldingClick }) {
  const [period, setPeriod] = useState("si");
  const [view, setView] = useState("brinson");
  const periodLabel = { si: "Since Inception", y1: "1 Year", ytd: "YTD" };

  const brinson = computeBrinson(period);
  const stockContrib = computeStockContrib(period);

  const topContrib = stockContrib.slice(0, 5);
  const bottomContrib = stockContrib.slice(-5).reverse();

  const portReturn = brinson.totals.portRet;
  const benchReturn = brinson.totals.benchRet;
  const activeReturn = portReturn - benchReturn;

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: Fs, fontSize: 28, fontWeight: 300, letterSpacing: "-0.02em", color: T.text, margin: 0 }}>Attribution</h1>
        <p style={{ fontSize: 12, color: T.textTer, marginTop: 6, fontFamily: Fn }}>Brinson-style performance attribution vs MSCI ACWI &middot; 20 Mar 2026</p>
      </div>

      {/* Period + view toggle */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <TabBar tabs={[{ k: "si", l: "Since Inception" }, { k: "y1", l: "1 Year" }, { k: "ytd", l: "YTD" }]} active={period} onChange={setPeriod} T={T} />
        <TabBar tabs={[{ k: "brinson", l: "Sector Attribution" }, { k: "stock", l: "Stock Contribution" }]} active={view} onChange={setView} T={T} />
      </div>

      {/* Summary stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 24 }}>
        <Stat T={T} label="Portfolio return" value={(portReturn >= 0 ? "+" : "") + portReturn.toFixed(2) + "%"} sub={periodLabel[period]} delay={0} />
        <Stat T={T} label="Benchmark return" value={(benchReturn >= 0 ? "+" : "") + benchReturn.toFixed(2) + "%"} sub="MSCI ACWI NTR" delay={0.06} />
        <Stat T={T} label="Active return" value={(activeReturn >= 0 ? "+" : "") + activeReturn.toFixed(2) + "%"} delta={(activeReturn >= 0 ? "+" : "") + activeReturn.toFixed(2) + "%"} sub="Portfolio minus Benchmark" delay={0.12} />
        <Stat T={T} label="Allocation effect" value={(brinson.totals.allocation >= 0 ? "+" : "") + brinson.totals.allocation.toFixed(2) + "%"} sub="Sector weight decisions" delay={0.18} />
        <Stat T={T} label="Selection effect" value={(brinson.totals.selection >= 0 ? "+" : "") + brinson.totals.selection.toFixed(2) + "%"} sub="Stock picking within sectors" delay={0.24} />
        <Stat T={T} label="Interaction" value={(brinson.totals.interaction >= 0 ? "+" : "") + brinson.totals.interaction.toFixed(2) + "%"} sub="Allocation x Selection" delay={0.3} />
      </div>

      {view === "brinson" && (
        <>
          {/* Waterfall */}
          <Card T={T} style={{ marginBottom: 20 }}>
            <Label T={T}>Total Effect by Sector — {periodLabel[period]}</Label>
            <Waterfall
              items={[
                ...brinson.rows.map(r => ({ label: r.sector, value: r.total, bold: false })),
                { label: "Total Active", value: brinson.totals.total, bold: true },
              ]}
              T={T}
            />
          </Card>

          {/* Brinson detail table */}
          <Card T={T} style={{ padding: "16px 20px", overflow: "hidden" }}>
            <Label T={T}>Brinson Decomposition — {periodLabel[period]}</Label>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, fontFamily: Fn }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid " + T.border }}>
                    {["Sector", "Port Wt", "Bench Wt", "Active Wt", "Port Ret", "Bench Ret", "Allocation", "Selection", "Interaction", "Total"].map(h => (
                      <th key={h} style={{ textAlign: h === "Sector" ? "left" : "right", padding: "10px 8px", fontSize: 9, color: T.textTer, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {brinson.rows.map((r, i) => (
                    <tr key={i} style={{ transition: "background 0.15s" }} onMouseEnter={e => e.currentTarget.style.background = T.rowHover} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <td style={{ padding: "9px 8px", fontWeight: 600, color: T.text }}>{r.sector}</td>
                      <td style={{ padding: "9px 8px", textAlign: "right", fontFeatureSettings: '"tnum"', color: T.textSec }}>{r.portWt.toFixed(1)}%</td>
                      <td style={{ padding: "9px 8px", textAlign: "right", fontFeatureSettings: '"tnum"', color: T.textTer }}>{r.benchWt.toFixed(1)}%</td>
                      <td style={{ padding: "9px 8px", textAlign: "right" }}>
                        <Pill T={T} color={r.portWt - r.benchWt >= 0 ? T.green : T.capRed} bg={r.portWt - r.benchWt >= 0 ? T.greenBg : T.redBg}>{(r.portWt - r.benchWt >= 0 ? "+" : "") + (r.portWt - r.benchWt).toFixed(1)}%</Pill>
                      </td>
                      <td style={{ padding: "9px 8px", textAlign: "right", fontFeatureSettings: '"tnum"', color: r.portRet >= 0 ? T.green : T.capRed }}>{r.portRet >= 0 ? "+" : ""}{r.portRet.toFixed(1)}%</td>
                      <td style={{ padding: "9px 8px", textAlign: "right", fontFeatureSettings: '"tnum"', color: T.textTer }}>{r.benchRet >= 0 ? "+" : ""}{r.benchRet.toFixed(1)}%</td>
                      <td style={{ padding: "9px 8px", textAlign: "right", fontFeatureSettings: '"tnum"', color: r.allocation >= 0 ? T.green : T.capRed, fontWeight: 500 }}>{r.allocation >= 0 ? "+" : ""}{r.allocation.toFixed(2)}%</td>
                      <td style={{ padding: "9px 8px", textAlign: "right", fontFeatureSettings: '"tnum"', color: r.selection >= 0 ? T.green : T.capRed, fontWeight: 500 }}>{r.selection >= 0 ? "+" : ""}{r.selection.toFixed(2)}%</td>
                      <td style={{ padding: "9px 8px", textAlign: "right", fontFeatureSettings: '"tnum"', color: r.interaction >= 0 ? T.green : T.capRed }}>{r.interaction >= 0 ? "+" : ""}{r.interaction.toFixed(2)}%</td>
                      <td style={{ padding: "9px 8px", textAlign: "right", fontWeight: 700, fontFeatureSettings: '"tnum"', color: r.total >= 0 ? T.green : T.capRed }}>{r.total >= 0 ? "+" : ""}{r.total.toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr style={{ borderTop: "1px solid " + T.border, background: T.bg }}>
                    <td style={{ padding: "9px 8px", fontWeight: 700, color: T.text }}>Total</td>
                    <td style={{ padding: "9px 8px", textAlign: "right", fontWeight: 700, fontFeatureSettings: '"tnum"', color: T.text }}>{brinson.totals.portWt.toFixed(1)}%</td>
                    <td style={{ padding: "9px 8px", textAlign: "right", fontWeight: 700, fontFeatureSettings: '"tnum"', color: T.textTer }}>{brinson.totals.benchWt.toFixed(1)}%</td>
                    <td />
                    <td style={{ padding: "9px 8px", textAlign: "right", fontWeight: 700, fontFeatureSettings: '"tnum"', color: T.text }}>{brinson.totals.portRet >= 0 ? "+" : ""}{brinson.totals.portRet.toFixed(1)}%</td>
                    <td style={{ padding: "9px 8px", textAlign: "right", fontWeight: 700, fontFeatureSettings: '"tnum"', color: T.textTer }}>{brinson.totals.benchRet >= 0 ? "+" : ""}{brinson.totals.benchRet.toFixed(1)}%</td>
                    <td style={{ padding: "9px 8px", textAlign: "right", fontWeight: 700, fontFeatureSettings: '"tnum"', color: brinson.totals.allocation >= 0 ? T.green : T.capRed }}>{brinson.totals.allocation >= 0 ? "+" : ""}{brinson.totals.allocation.toFixed(2)}%</td>
                    <td style={{ padding: "9px 8px", textAlign: "right", fontWeight: 700, fontFeatureSettings: '"tnum"', color: brinson.totals.selection >= 0 ? T.green : T.capRed }}>{brinson.totals.selection >= 0 ? "+" : ""}{brinson.totals.selection.toFixed(2)}%</td>
                    <td style={{ padding: "9px 8px", textAlign: "right", fontWeight: 700, fontFeatureSettings: '"tnum"', color: brinson.totals.interaction >= 0 ? T.green : T.capRed }}>{brinson.totals.interaction >= 0 ? "+" : ""}{brinson.totals.interaction.toFixed(2)}%</td>
                    <td style={{ padding: "9px 8px", textAlign: "right", fontWeight: 700, fontFeatureSettings: '"tnum"', color: brinson.totals.total >= 0 ? T.green : T.capRed }}>{brinson.totals.total >= 0 ? "+" : ""}{brinson.totals.total.toFixed(2)}%</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </Card>
        </>
      )}

      {view === "stock" && (
        <>
          {/* Bubble chart */}
          <Card T={T} style={{ marginBottom: 20 }}>
            <Label T={T}>Return vs Contribution — {periodLabel[period]}</Label>
            <ContribBubbles stocks={stockContrib} T={T} />
          </Card>

          {/* Top / Bottom contributors side by side */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
            <Card T={T}>
              <Label T={T}>Top 5 Contributors</Label>
              {topContrib.map((s, i) => (
                <div key={i} onClick={() => onHoldingClick?.(holdings.find(h => h.name === s.name))} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 10px", borderRadius: T.radiusSm, fontSize: 12, fontFamily: Fn, cursor: "pointer", transition: "background 0.15s" }} onMouseEnter={e => e.currentTarget.style.background = T.rowHover} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <div>
                    <span style={{ color: T.text, fontWeight: 500 }}>{s.name}</span>
                    <span style={{ color: T.textTer, fontSize: 10, marginLeft: 6 }}>{s.wt.toFixed(1)}%</span>
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <Pill T={T} color={T.textSec} bg={T.pillBg}>{s.ret >= 0 ? "+" : ""}{s.ret.toFixed(1)}%</Pill>
                    <Pill T={T} color={T.green} bg={T.greenBg}>+{s.contrib.toFixed(2)}%</Pill>
                  </div>
                </div>
              ))}
            </Card>
            <Card T={T}>
              <Label T={T}>Bottom 5 Contributors</Label>
              {bottomContrib.map((s, i) => (
                <div key={i} onClick={() => onHoldingClick?.(holdings.find(h => h.name === s.name))} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 10px", borderRadius: T.radiusSm, fontSize: 12, fontFamily: Fn, cursor: "pointer", transition: "background 0.15s" }} onMouseEnter={e => e.currentTarget.style.background = T.rowHover} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <div>
                    <span style={{ color: T.text, fontWeight: 500 }}>{s.name}</span>
                    <span style={{ color: T.textTer, fontSize: 10, marginLeft: 6 }}>{s.wt.toFixed(1)}%</span>
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <Pill T={T} color={T.textSec} bg={T.pillBg}>{s.ret >= 0 ? "+" : ""}{s.ret.toFixed(1)}%</Pill>
                    <Pill T={T} color={T.capRed} bg={T.redBg}>{s.contrib.toFixed(2)}%</Pill>
                  </div>
                </div>
              ))}
            </Card>
          </div>

          {/* Full stock table */}
          <Card T={T} style={{ padding: "16px 20px", overflow: "hidden" }}>
            <Label T={T}>All Holdings Contribution — {periodLabel[period]}</Label>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, fontFamily: Fn }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid " + T.border }}>
                    {["Name", "Ticker", "Sector", "Weight", "Active Wt", "Return", "Contribution"].map(h => (
                      <th key={h} style={{ textAlign: h === "Name" || h === "Ticker" || h === "Sector" ? "left" : "right", padding: "10px 8px", fontSize: 9, color: T.textTer, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stockContrib.map((s, i) => (
                    <tr key={i} onClick={() => onHoldingClick?.(holdings.find(h => h.name === s.name))} style={{ cursor: "pointer", transition: "background 0.15s" }} onMouseEnter={e => e.currentTarget.style.background = T.rowHover} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <td style={{ padding: "9px 8px", fontWeight: 600, color: T.text }}>{s.name}</td>
                      <td style={{ padding: "9px 8px", color: T.textTer }}>{s.ticker}</td>
                      <td style={{ padding: "9px 8px" }}><Pill T={T}>{s.sector}</Pill></td>
                      <td style={{ padding: "9px 8px", textAlign: "right", fontFeatureSettings: '"tnum"', color: T.text }}>{s.wt.toFixed(2)}%</td>
                      <td style={{ padding: "9px 8px", textAlign: "right" }}><Pill T={T} color={s.activeWt >= 0 ? T.green : T.capRed} bg={s.activeWt >= 0 ? T.greenBg : T.redBg}>{s.activeWt >= 0 ? "+" : ""}{s.activeWt.toFixed(1)}%</Pill></td>
                      <td style={{ padding: "9px 8px", textAlign: "right", fontFeatureSettings: '"tnum"', color: s.ret >= 0 ? T.green : T.capRed }}>{s.ret >= 0 ? "+" : ""}{s.ret.toFixed(1)}%</td>
                      <td style={{ padding: "9px 8px", textAlign: "right", fontWeight: 700, fontFeatureSettings: '"tnum"', color: s.contrib >= 0 ? T.green : T.capRed }}>{s.contrib >= 0 ? "+" : ""}{s.contrib.toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
