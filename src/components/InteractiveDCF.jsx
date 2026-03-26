import { useState, useMemo } from "react";
import { Fn } from "../theme";
import { Card, Pill, TabBar } from "./shared";
import { dcfDefaults, years, computeDCF, keyAssumptions, valuationMethods } from "../data/research-cni-dcf";

function SliderInput({ label, value, onChange, min, max, step, format, T }) {
  const display = format ? format(value) : value;
  return (
    <div style={{ marginBottom: 14 }}>
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

function ArraySlider({ label, values, index, onChange, min, max, step, format, T }) {
  const v = values[index];
  return (
    <SliderInput label={`${label} (${years[index]})`} value={v} min={min} max={max} step={step} format={format} T={T}
      onChange={val => { const nv = [...values]; nv[index] = val; onChange(nv); }} />
  );
}

function fmt(v) { return v >= 1000 ? (v / 1000).toFixed(1) + "B" : v.toFixed(0) + "M"; }
function pct(v) { return (v * 100).toFixed(1) + "%"; }
function pct2(v) { return (v * 100).toFixed(2) + "%"; }
function price(v) { return "C$" + v.toFixed(2); }

export default function InteractiveDCF({ T }) {
  const [tab, setTab] = useState("model");
  const [params, setParams] = useState({});
  const [editYear, setEditYear] = useState(0); // which year's assumptions to edit

  const p = { ...dcfDefaults, ...params };
  const result = useMemo(() => computeDCF(p), [p]);

  const set = (key, val) => setParams(prev => ({ ...prev, [key]: val }));

  const upColor = result.upside >= 0 ? T.green : T.capRed;
  const upBg = result.upside >= 0 ? T.greenBg : T.redBg;

  const tabs = [
    { k: "model", l: "DCF Model" },
    { k: "assumptions", l: "Assumptions" },
    { k: "sensitivity", l: "Sensitivity" },
    { k: "summary", l: "Valuation Summary" },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
        <TabBar tabs={tabs} active={tab} onChange={setTab} T={T} />
        <button onClick={() => setParams({})} style={{
          padding: "6px 14px", fontSize: 10, fontFamily: Fn, background: T.pillBg, border: "1px solid " + T.border,
          borderRadius: 6, color: T.textSec, cursor: "pointer",
        }}>↻ Reset to defaults</button>
      </div>

      {/* Key output strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 1, background: T.border, borderRadius: T.radiusSm, overflow: "hidden", marginBottom: 20 }}>
        {[
          { l: "Implied Price", v: price(result.impliedPrice), c: upColor },
          { l: "Upside / Downside", v: (result.upside >= 0 ? "+" : "") + pct(result.upside), c: upColor },
          { l: "WACC", v: pct2(result.wacc), c: T.text },
          { l: "Enterprise Value", v: "C$" + fmt(result.ev), c: T.text },
          { l: "TV % of EV", v: pct(result.tvPctEV), c: result.tvPctEV > 0.7 ? T.orange : T.text },
        ].map((s, i) => (
          <div key={i} style={{ background: T.card, padding: "14px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 18, fontWeight: 300, color: s.c, fontFamily: Fn }}>{s.v}</div>
            <div style={{ fontSize: 9, color: T.textTer, fontFamily: Fn, marginTop: 3, letterSpacing: "0.04em", textTransform: "uppercase" }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* TAB: DCF Model */}
      {tab === "model" && (
        <Card T={T} style={{ padding: "16px 20px", overflowX: "auto" }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: T.textTer, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>
            Unlevered Free Cash Flow Projection · C$ Millions
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, fontFamily: Fn, minWidth: 800 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid " + T.border }}>
                <th style={{ textAlign: "left", padding: "7px 8px", fontSize: 9, color: T.textTer, fontWeight: 600, position: "sticky", left: 0, background: T.card, zIndex: 1 }}>METRIC</th>
                {result.rows.map((r, i) => (
                  <th key={i} style={{ textAlign: "right", padding: "7px 6px", fontSize: 9, color: T.textTer, fontWeight: 600, whiteSpace: "nowrap" }}>{r.year}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Revenue", key: "revenue", fmt: v => fmt(v) },
                { label: "Revenue Growth", key: "revGrowth", fmt: v => pct(v), color: true },
                { label: "Operating Ratio", key: "or", fmt: v => pct(v) },
                { label: "EBIT", key: "ebit", fmt: v => fmt(v) },
                { label: "D&A", key: "da", fmt: v => fmt(v) },
                { label: "Capex", key: "capex", fmt: v => "-" + fmt(v) },
                { label: "NOPAT", key: "nopat", fmt: v => fmt(v) },
                { label: "UFCF", key: "ufcf", fmt: v => fmt(v), bold: true },
                { label: "UFCF Margin", key: "ufcfMargin", fmt: v => pct(v) },
                { label: "Discount Factor", key: "discountFactor", fmt: v => v.toFixed(3) },
                { label: "PV of UFCF", key: "pvUfcf", fmt: v => fmt(v), bold: true },
              ].map((row, ri) => (
                <tr key={ri} style={{ borderBottom: row.bold ? "2px solid " + T.border : "1px solid " + T.border }}>
                  <td style={{ padding: "7px 8px", fontWeight: row.bold ? 600 : 400, color: T.text, fontSize: 10, position: "sticky", left: 0, background: T.card, zIndex: 1 }}>{row.label}</td>
                  {result.rows.map((r, i) => (
                    <td key={i} style={{
                      padding: "7px 6px", textAlign: "right",
                      fontWeight: row.bold ? 600 : 400,
                      color: row.color && r[row.key] > 0.04 ? T.green : row.bold ? T.text : T.textSec,
                      fontSize: 10,
                    }}>{row.fmt(r[row.key])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Summary below table */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginTop: 16, padding: "12px 0", borderTop: "2px solid " + T.border }}>
            {[
              { l: "Sum PV of UFCFs", v: "C$" + fmt(result.sumPvUFCF) },
              { l: "PV of Terminal Value", v: "C$" + fmt(result.pvTV) },
              { l: "Less: Net Debt", v: "-C$" + fmt(p.netDebt) },
              { l: "Equity Value", v: "C$" + fmt(result.equityValue) },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn }}>{s.v}</div>
                <div style={{ fontSize: 9, color: T.textTer, fontFamily: Fn }}>{s.l}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* TAB: Assumptions */}
      {tab === "assumptions" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Card T={T} style={{ padding: "20px" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: T.deepBlue, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 16 }}>WACC Inputs</div>
            <SliderInput T={T} label="Risk-Free Rate" value={p.riskFreeRate} min={0.01} max={0.06} step={0.001} format={pct2} onChange={v => set("riskFreeRate", v)} />
            <SliderInput T={T} label="Equity Risk Premium" value={p.erp} min={0.03} max={0.08} step={0.005} format={pct2} onChange={v => set("erp", v)} />
            <SliderInput T={T} label="Beta" value={p.beta} min={0.5} max={1.5} step={0.05} format={v => v.toFixed(2)} onChange={v => set("beta", v)} />
            <SliderInput T={T} label="Pre-Tax Cost of Debt" value={p.preTaxCostOfDebt} min={0.02} max={0.08} step={0.001} format={pct2} onChange={v => set("preTaxCostOfDebt", v)} />
            <SliderInput T={T} label="Equity Weight" value={p.equityWeight} min={0.6} max={0.95} step={0.01} format={pct} onChange={v => { set("equityWeight", v); set("debtWeight", +(1 - v).toFixed(2)); }} />
            <div style={{ marginTop: 12, padding: "10px 14px", background: T.bg, borderRadius: T.radiusSm, border: "1px solid " + T.border }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11, color: T.textSec, fontFamily: Fn }}>Implied WACC</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: T.deepBlue, fontFamily: Fn }}>{pct2(result.wacc)}</span>
              </div>
            </div>
          </Card>

          <Card T={T} style={{ padding: "20px" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: T.deepBlue, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 16 }}>Terminal & Share Data</div>
            <SliderInput T={T} label="Terminal Growth Rate" value={p.terminalGrowth} min={0.01} max={0.04} step={0.005} format={pct2} onChange={v => set("terminalGrowth", v)} />
            <SliderInput T={T} label="Tax Rate" value={p.taxRate} min={0.2} max={0.35} step={0.005} format={pct} onChange={v => set("taxRate", v)} />
            <SliderInput T={T} label="Net Debt (C$M)" value={p.netDebt} min={12000} max={22000} step={500} format={v => "C$" + fmt(v)} onChange={v => set("netDebt", v)} />
            <SliderInput T={T} label="Shares Outstanding (M)" value={p.sharesOutstanding} min={580} max={660} step={5} format={v => v + "M"} onChange={v => set("sharesOutstanding", v)} />
            <SliderInput T={T} label="Current Price (C$)" value={p.currentPrice} min={100} max={200} step={1} format={v => "C$" + v} onChange={v => set("currentPrice", v)} />
          </Card>

          <Card T={T} style={{ padding: "20px", gridColumn: "1 / -1" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: T.deepBlue, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase" }}>Year-by-Year Assumptions</div>
              <div style={{ display: "flex", gap: 4 }}>
                {years.map((y, i) => (
                  <button key={i} onClick={() => setEditYear(i)} style={{
                    padding: "4px 8px", fontSize: 9, fontFamily: Fn, border: "1px solid " + T.border,
                    borderRadius: 4, cursor: "pointer",
                    background: editYear === i ? T.deepBlue : "transparent",
                    color: editYear === i ? "#fff" : T.textTer,
                  }}>{y.replace("FY", "").replace("E", "")}</button>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16 }}>
              <ArraySlider T={T} label="Rev Growth" values={p.revenueGrowth} index={editYear} min={-0.05} max={0.1} step={0.005} format={pct} onChange={v => set("revenueGrowth", v)} />
              <ArraySlider T={T} label="Op. Ratio" values={p.operatingRatio} index={editYear} min={0.55} max={0.68} step={0.002} format={pct} onChange={v => set("operatingRatio", v)} />
              <ArraySlider T={T} label="D&A %" values={p.daPercent} index={editYear} min={0.07} max={0.12} step={0.001} format={pct} onChange={v => set("daPercent", v)} />
              <ArraySlider T={T} label="Capex %" values={p.capexPercent} index={editYear} min={0.12} max={0.25} step={0.002} format={pct} onChange={v => set("capexPercent", v)} />
            </div>
          </Card>
        </div>
      )}

      {/* TAB: Sensitivity */}
      {tab === "sensitivity" && (
        <Card T={T} style={{ padding: "16px 20px", overflowX: "auto" }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: T.textTer, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>
            Implied Share Price (C$)
          </div>
          <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginBottom: 16 }}>
            WACC (horizontal) × Terminal Growth Rate (vertical)
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, fontFamily: Fn }}>
            <thead>
              <tr style={{ borderBottom: "2px solid " + T.border }}>
                <th style={{ padding: "8px", textAlign: "left", fontSize: 9, color: T.textTer }}>WACC →</th>
                {result.waccRange.map((w, i) => (
                  <th key={i} style={{ padding: "8px 6px", textAlign: "center", fontSize: 9, color: T.textTer, fontWeight: 600 }}>{pct2(w)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.sensitivity.map((row, ri) => (
                <tr key={ri} style={{ borderBottom: "1px solid " + T.border }}>
                  <td style={{ padding: "8px", fontWeight: 600, color: T.deepBlue, fontSize: 10 }}>{pct2(result.tgRange[ri])}</td>
                  {row.map((val, ci) => {
                    const isBase = Math.abs(result.waccRange[ci] - result.wacc) < 0.001 && Math.abs(result.tgRange[ri] - p.terminalGrowth) < 0.001;
                    const isAbove = val > p.currentPrice;
                    return (
                      <td key={ci} style={{
                        padding: "8px 6px", textAlign: "center",
                        fontWeight: isBase ? 700 : 400,
                        color: isAbove ? T.green : T.capRed,
                        background: isBase ? T.bg : "transparent",
                        border: isBase ? "2px solid " + T.deepBlue : "none",
                        borderRadius: isBase ? 4 : 0,
                        fontSize: 11,
                      }}>
                        {val.toFixed(0)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 12 }}>
            <span style={{ color: T.green }}>■</span> Above current price (C${p.currentPrice}) &nbsp;
            <span style={{ color: T.capRed }}>■</span> Below current price &nbsp;
            <span style={{ display: "inline-block", width: 10, height: 10, border: "2px solid " + T.deepBlue, borderRadius: 2, verticalAlign: "middle" }} /> Base case
          </div>
        </Card>
      )}

      {/* TAB: Valuation Summary */}
      {tab === "summary" && (
        <div>
          <Card T={T} style={{ padding: "20px 24px", marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 16 }}>Multi-methodology valuation</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
              {[
                { l: "DCF Implied", v: price(result.impliedPrice), sub: "10-year Gordon Growth", c: T.deepBlue },
                { l: "Current Price", v: "C$" + p.currentPrice, sub: "TSX, Mar 2026", c: T.textSec },
                { l: "Upside", v: (result.upside >= 0 ? "+" : "") + pct(result.upside), sub: "vs current", c: upColor },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: "center", padding: "16px", background: T.bg, borderRadius: T.radiusSm }}>
                  <div style={{ fontSize: 24, fontWeight: 300, color: s.c, fontFamily: Fn }}>{s.v}</div>
                  <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 4 }}>{s.sub}</div>
                  <div style={{ fontSize: 9, color: T.textTer, fontFamily: Fn, marginTop: 2, textTransform: "uppercase" }}>{s.l}</div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: 11, fontWeight: 600, color: T.textTer, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>Key assumptions</div>
            {keyAssumptions.map((a, i) => (
              <div key={i} style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.65, paddingLeft: 12, borderLeft: "2px solid " + T.border, marginBottom: 6 }}>
                {a}
              </div>
            ))}
          </Card>

          {/* Download original */}
          <a href="/research/CN_Rail_DCF_Model.xlsx" download style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "10px 20px", background: T.card, border: "1px solid " + T.border, borderRadius: T.radiusSm,
            fontSize: 12, fontFamily: Fn, color: T.textSec, textDecoration: "none",
          }}>
            📥 Download original Excel model (.xlsx)
          </a>
        </div>
      )}
    </div>
  );
}
