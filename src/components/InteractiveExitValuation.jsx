import { useState, useMemo } from "react";
import { Fn } from "../theme";
import { Card } from "./shared";

/* ── slider reusable ── */
function Slider({ label, value, onChange, min, max, step, format, T }) {
  const display = format ? format(value) : value;
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: T.textSec, fontFamily: Fn }}>{label}</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: Fn }}>{display}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        style={{ width: "100%", accentColor: T.deepBlue, height: 4, cursor: "pointer" }} />
    </div>
  );
}

/* ── defaults ── */
const DEFAULTS = {
  currentPrice: 152.0,
  baseEPS: 7.63,
  epsCagr: 9.0,
  exitPE: 20.0,
  divBase: 3.44,
  divGrowth: 5.0,
  buybackM: 24,       // millions of shares / year
  avgBuybackPrice: 155, // avg repurchase price
  sharesOutM: 620,    // diluted shares outstanding
  horizon: 5,
};

/* ── compute ── */
function compute(p) {
  const { currentPrice, baseEPS, epsCagr, exitPE, divBase, divGrowth, buybackM, avgBuybackPrice, sharesOutM, horizon } = p;
  const g = epsCagr / 100;
  const dg = divGrowth / 100;

  // EPS path
  const epsPath = [];
  for (let y = 0; y <= horizon; y++) epsPath.push(baseEPS * Math.pow(1 + g, y));
  const exitEPS = epsPath[horizon];

  // P/E compression
  const currentPE = currentPrice / baseEPS;
  const exitPEatBase = currentPrice / exitEPS; // what P/E would be at exit EPS if price unchanged

  // Exit share price
  const exitPrice = exitEPS * exitPE;
  const priceReturn = (exitPrice - currentPrice) / currentPrice;

  // Accumulated dividends
  let totalDiv = 0;
  const divPath = [];
  for (let y = 1; y <= horizon; y++) {
    const d = divBase * Math.pow(1 + dg, y);
    totalDiv += d;
    divPath.push(d);
  }

  // Buyback accretion (total shares bought back × price gain, divided by remaining shares)
  const totalSharesBought = buybackM * horizon;
  const remainingShares = sharesOutM - totalSharesBought;
  const buybackAccretion = remainingShares > 0
    ? (totalSharesBought / remainingShares) * currentPrice * (exitPrice / currentPrice - 1) / (exitPrice / currentPrice)
    : 0;
  // Simpler: value of ownership concentration
  const ownershipGain = sharesOutM / Math.max(remainingShares, 1) - 1;
  const buybackValue = ownershipGain * exitPrice - ownershipGain * currentPrice;
  const buybackPerShare = totalSharesBought > 0
    ? (currentPrice * (sharesOutM / Math.max(remainingShares, 1) - 1)).toFixed(1)
    : "0.0";

  // Total return
  const totalReturnAbs = exitPrice - currentPrice + totalDiv;
  const totalReturnPct = totalReturnAbs / currentPrice;
  const annReturn = Math.pow(1 + totalReturnPct, 1 / horizon) - 1;

  // Table rows for display
  const rows = [
    { label: "Current share price", c1: `C$${currentPrice.toFixed(2)}`, c2: "", c3: "", hi: true },
    { label: "Adj. diluted EPS", c1: "", c2: `C$${baseEPS.toFixed(2)}`, c3: `C$${exitEPS.toFixed(2)}`, hi: false },
    { label: "Current P/E multiple", c1: "", c2: `${currentPE.toFixed(1)}x`, c3: `${exitPEatBase.toFixed(1)}x`, hi: true },
    { label: "Exit NTM P/E multiple", c1: "", c2: "", c3: `${exitPE.toFixed(1)}x`, hi: false },
    { label: `Share price FY ${2025 + horizon}E`, c1: "", c2: "", c3: `C$${exitPrice.toFixed(2)}`, hi: true },
    { label: "Share price return %", c1: "", c2: "", c3: `${(priceReturn * 100).toFixed(1)}%`, hi: false, accent: true },
    { label: "Accumulated dividends / share", c1: "", c2: "", c3: `C$${totalDiv.toFixed(1)}`, hi: false },
    { label: "Total return %", c1: "", c2: "", c3: `${(totalReturnPct * 100).toFixed(1)}%`, hi: true, bold: true },
    { label: "Time horizon in years", c1: "", c2: "", c3: `${horizon.toFixed(1)}`, hi: false },
    { label: "Annualized total return %", c1: "", c2: "", c3: `${(annReturn * 100).toFixed(1)}%`, hi: true, bold: true },
  ];

  return { exitEPS, exitPrice, priceReturn, totalDiv, totalReturnPct, annReturn, currentPE, rows, epsPath, divPath };
}

export default function InteractiveExitValuation({ T }) {
  const [p, setP] = useState({ ...DEFAULTS });
  const set = (k, v) => setP(prev => ({ ...prev, [k]: v }));
  const result = useMemo(() => compute(p), [p]);

  const annColor = result.annReturn >= 0.10 ? T.green : result.annReturn >= 0.05 ? T.orange : T.capRed;
  const annBg = result.annReturn >= 0.10 ? T.greenBg : result.annReturn >= 0.05 ? "rgba(245,158,11,0.08)" : T.redBg;

  return (
    <div>
      {/* KPI strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: T.border, borderRadius: T.radiusSm, overflow: "hidden", marginBottom: 24 }}>
        {[
          { l: "Exit Price", v: `C$${result.exitPrice.toFixed(0)}`, c: T.text },
          { l: "Price Return", v: `${(result.priceReturn * 100).toFixed(1)}%`, c: result.priceReturn >= 0 ? T.green : T.capRed },
          { l: "Total Return", v: `${(result.totalReturnPct * 100).toFixed(1)}%`, c: result.totalReturnPct >= 0 ? T.green : T.capRed },
          { l: "Ann. Return", v: `${(result.annReturn * 100).toFixed(1)}%`, c: annColor, bg: annBg },
        ].map((s, i) => (
          <div key={i} style={{ background: s.bg || T.card, padding: "16px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 300, color: s.c, fontFamily: Fn }}>{s.v}</div>
            <div style={{ fontSize: 9, color: T.textTer, fontFamily: Fn, marginTop: 3, letterSpacing: "0.04em", textTransform: "uppercase" }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Two-column: sliders + table */}
      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 24, alignItems: "start" }}>

        {/* Left: Assumptions */}
        <Card T={T} style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: T.textTer, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase" }}>Assumptions</div>
            <button onClick={() => setP({ ...DEFAULTS })} style={{
              padding: "4px 10px", fontSize: 9, fontFamily: Fn, background: T.pillBg, border: "1px solid " + T.border,
              borderRadius: 6, color: T.textSec, cursor: "pointer",
            }}>↻ Reset</button>
          </div>

          <Slider label="Current Share Price (C$)" value={p.currentPrice} min={80} max={250} step={1}
            format={v => `C$${v.toFixed(0)}`} onChange={v => set("currentPrice", v)} T={T} />
          <Slider label="Base EPS — FY 2025 (C$)" value={p.baseEPS} min={5} max={12} step={0.05}
            format={v => `C$${v.toFixed(2)}`} onChange={v => set("baseEPS", v)} T={T} />
          <Slider label="EPS CAGR (%)" value={p.epsCagr} min={0} max={20} step={0.5}
            format={v => `${v.toFixed(1)}%`} onChange={v => set("epsCagr", v)} T={T} />
          <Slider label="Exit P/E Multiple" value={p.exitPE} min={10} max={30} step={0.5}
            format={v => `${v.toFixed(1)}x`} onChange={v => set("exitPE", v)} T={T} />
          <Slider label="Dividend Growth (%)" value={p.divGrowth} min={0} max={12} step={0.5}
            format={v => `${v.toFixed(1)}%`} onChange={v => set("divGrowth", v)} T={T} />
          <Slider label="Time Horizon (years)" value={p.horizon} min={1} max={10} step={1}
            format={v => `${v}`} onChange={v => set("horizon", v)} T={T} />
        </Card>

        {/* Right: Expected Total Return table */}
        <Card T={T} style={{ padding: 0, overflowX: "auto" }}>
          <div style={{ padding: "16px 20px 8px", fontSize: 11, fontWeight: 600, color: T.textTer, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Expected Total Return
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: Fn, minWidth: 420 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid " + T.border }}>
                {[
                  { l: "CAD", align: "left", italic: true },
                  { l: "Mar 2025", align: "right" },
                  { l: "FY 2025E", align: "right" },
                  { l: `FY ${2025 + p.horizon}E`, align: "right" },
                ].map((h, i) => (
                  <th key={i} style={{
                    textAlign: h.align, padding: "12px 16px", fontSize: 9, fontWeight: 600,
                    color: i === 0 ? T.textTer : T.text, letterSpacing: "0.06em",
                    textTransform: i === 0 ? "uppercase" : "none",
                    fontStyle: h.italic ? "italic" : "normal",
                    fontFamily: Fn,
                  }}>{h.l}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.rows.map((r, i) => (
                <tr key={i} style={{
                  borderBottom: "1px solid " + T.border,
                  background: r.hi ? T.bg : "transparent",
                }}>
                  <td style={{
                    padding: "10px 16px", fontWeight: r.bold ? 700 : 400,
                    color: r.bold ? T.text : r.accent ? T.deepBlue : T.textSec,
                    fontSize: r.bold ? 13 : 12,
                    fontStyle: r.accent ? "italic" : "normal",
                  }}>{r.label}</td>
                  <td style={{ padding: "10px 16px", textAlign: "right", color: T.text, fontWeight: 500 }}>{r.c1}</td>
                  <td style={{ padding: "10px 16px", textAlign: "right", color: T.text, fontWeight: 500 }}>{r.c2}</td>
                  <td style={{
                    padding: "10px 16px", textAlign: "right",
                    color: r.bold ? annColor : T.text,
                    fontWeight: r.bold ? 700 : 500, fontSize: r.bold ? 13 : 12,
                  }}>{r.c3}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ padding: "10px 16px 14px", fontSize: 10, color: T.textTer, fontFamily: Fn, lineHeight: 1.6 }}>
            Source: S&P Capital IQ, Cape Capital estimates
          </div>
        </Card>
      </div>

      {/* EPS bridge mini-chart */}
      <Card T={T} style={{ padding: "20px", marginTop: 20 }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: T.textTer, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>
          EPS Growth Path · C$ · {p.epsCagr.toFixed(1)}% CAGR
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 100 }}>
          {result.epsPath.map((eps, i) => {
            const maxEps = Math.max(...result.epsPath);
            const h = maxEps > 0 ? (eps / maxEps) * 90 : 0;
            const isFirst = i === 0;
            const isLast = i === result.epsPath.length - 1;
            return (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ fontSize: 9, fontWeight: 600, color: isLast ? T.deepBlue : T.textTer, fontFamily: Fn, marginBottom: 3 }}>
                  {(isFirst || isLast || i === Math.floor(result.epsPath.length / 2)) ? `C$${eps.toFixed(2)}` : ""}
                </div>
                <div style={{
                  width: "100%", maxWidth: 40, height: h,
                  background: isLast ? T.deepBlue : isFirst ? T.textTer : `rgba(26,54,93,${0.15 + 0.7 * (i / result.epsPath.length)})`,
                  borderRadius: "3px 3px 0 0",
                  transition: "height 0.3s ease",
                }} />
                <div style={{ fontSize: 8, color: T.textTer, fontFamily: Fn, marginTop: 3 }}>
                  {2025 + i}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Justification callout */}
      <Card T={T} style={{ padding: "20px 24px", borderLeft: `4px solid ${T.deepBlue}`, marginTop: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: T.deepBlue, fontFamily: Fn, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 6 }}>Exit multiple rationale</div>
        <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: 0 }}>
          A {p.exitPE.toFixed(1)}x exit P/E {p.exitPE >= 20 ? "is in line with" : p.exitPE >= 17 ? "represents a discount to" : "is well below"} CN's
          five-year average of ~20x. At {p.epsCagr.toFixed(1)}% EPS CAGR with ROIC expanding toward 15%, {p.exitPE >= 20 ? "this is conservative for a premium-quality Class I franchise" : p.exitPE >= 17 ? "this implies the market continues to discount tariff risk" : "this would require sustained de-rating — a bear-case scenario"}.
          The {(result.annReturn * 100).toFixed(1)}% annualized total return {result.annReturn >= 0.12 ? "exceeds our 12% hurdle rate comfortably" : result.annReturn >= 0.08 ? "is attractive for a defensive compounder" : "falls below our hurdle rate"}.
        </p>
      </Card>
    </div>
  );
}
