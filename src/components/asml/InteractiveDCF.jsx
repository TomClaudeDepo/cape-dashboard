import { useState, useMemo } from "react";
import { Fn } from "../../theme";
import { Card, TabBar } from "../shared";
import { useMobile } from "../../hooks/useMobile";
import { dcfDefaults, years, computeDCF, keyAssumptions, valuationMethods } from "../../data/research-asml-dcf";

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

// EUR formatter: shows €Xb for >=1000m, else €Xm. Handles negative gracefully.
function fmt(v) {
  const abs = Math.abs(v);
  if (abs >= 1000) return (v / 1000).toFixed(1) + "B";
  return v.toFixed(0) + "M";
}
function pct(v) { return (v * 100).toFixed(1) + "%"; }
function pct2(v) { return (v * 100).toFixed(2) + "%"; }
function price(v) { return "€" + v.toFixed(0); }

export default function InteractiveDCF({ T }) {
  const mob = useMobile();
  const [tab, setTab] = useState("model");
  const [params, setParams] = useState({});
  const [editYear, setEditYear] = useState(0);

  const p = { ...dcfDefaults, ...params };
  const result = useMemo(() => computeDCF(p), [p]);

  const set = (key, val) => setParams(prev => ({ ...prev, [key]: val }));

  const upColor = result.upside >= 0 ? T.green : T.capRed;

  const tabs = [
    { k: "model", l: "DCF Model" },
    { k: "assumptions", l: "Assumptions" },
    { k: "sensitivity", l: "Sensitivity" },
    { k: "summary", l: "Valuation Summary" },
  ];

  // Net debt is stored as negative for net cash positions; show it sensibly in the bridge
  const isNetCash = p.netDebt < 0;
  const netDebtLabel = isNetCash ? "Add: Net Cash" : "Less: Net Debt";
  const netDebtDisplay = isNetCash ? "+€" + fmt(-p.netDebt) : "-€" + fmt(p.netDebt);

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
      <div style={{ display: "grid", gridTemplateColumns: mob ? "repeat(2, 1fr)" : "repeat(5, 1fr)", gap: 1, background: T.border, borderRadius: T.radiusSm, overflow: "hidden", marginBottom: 20 }}>
        {[
          { l: "Implied Price", v: price(result.impliedPrice), c: upColor },
          { l: "Upside / Downside", v: (result.upside >= 0 ? "+" : "") + pct(result.upside), c: upColor },
          { l: "WACC", v: pct2(result.wacc), c: T.text },
          { l: "Enterprise Value", v: "€" + fmt(result.ev), c: T.text },
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
            Unlevered Free Cash Flow Projection · € Millions
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
                { label: "Revenue Growth", key: "revGrowth", fmt: v => (v >= 0 ? "" : "") + pct(v), color: true },
                { label: "EBIT Margin", key: "ebitMargin", fmt: v => pct(v) },
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
                      color: row.color ? (r[row.key] >= 0 ? T.green : T.capRed) : row.bold ? T.text : T.textSec,
                      fontSize: 10,
                    }}>{row.fmt(r[row.key])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Bridge below table */}
          <div style={{ display: "grid", gridTemplateColumns: mob ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 10, marginTop: 16, padding: "12px 0", borderTop: "2px solid " + T.border }}>
            {[
              { l: "Sum PV of UFCFs", v: "€" + fmt(result.sumPvUFCF) },
              { l: "PV of Terminal Value", v: "€" + fmt(result.pvTV) },
              { l: netDebtLabel, v: netDebtDisplay },
              { l: "Equity Value", v: "€" + fmt(result.equityValue) },
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
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 16 }}>
          <Card T={T} style={{ padding: "20px" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: T.deepBlue, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 16 }}>WACC Inputs</div>
            <SliderInput T={T} label="Risk-Free Rate" value={p.riskFreeRate} min={0.01} max={0.06} step={0.001} format={pct2} onChange={v => set("riskFreeRate", v)} />
            <SliderInput T={T} label="Equity Risk Premium" value={p.erp} min={0.03} max={0.08} step={0.005} format={pct2} onChange={v => set("erp", v)} />
            <SliderInput T={T} label="Beta" value={p.beta} min={0.7} max={1.8} step={0.05} format={v => v.toFixed(2)} onChange={v => set("beta", v)} />
            <SliderInput T={T} label="Pre-Tax Cost of Debt" value={p.preTaxCostOfDebt} min={0.02} max={0.08} step={0.001} format={pct2} onChange={v => set("preTaxCostOfDebt", v)} />
            <SliderInput T={T} label="Equity Weight" value={p.equityWeight} min={0.7} max={1.0} step={0.01} format={pct} onChange={v => { set("equityWeight", v); set("debtWeight", +(1 - v).toFixed(2)); }} />
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
            <SliderInput T={T} label="Tax Rate" value={p.taxRate} min={0.10} max={0.25} step={0.005} format={pct} onChange={v => set("taxRate", v)} />
            <SliderInput T={T} label="Net Debt / (Cash) (€M)" value={p.netDebt} min={-20000} max={5000} step={500} format={v => (v < 0 ? "-€" : "€") + fmt(Math.abs(v))} onChange={v => set("netDebt", v)} />
            <SliderInput T={T} label="Shares Outstanding (M)" value={p.sharesOutstanding} min={360} max={420} step={1} format={v => v + "M"} onChange={v => set("sharesOutstanding", v)} />
            <SliderInput T={T} label="Current Price (€)" value={p.currentPrice} min={600} max={1800} step={10} format={v => "€" + v} onChange={v => set("currentPrice", v)} />
            <SliderInput T={T} label="NWC % of Δ Revenue" value={p.nwcPercent} min={-0.05} max={0.10} step={0.005} format={pct} onChange={v => set("nwcPercent", v)} />
          </Card>

          <Card T={T} style={{ padding: "20px", gridColumn: "1 / -1" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: T.deepBlue, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase" }}>Year-by-Year Assumptions</div>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
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
            <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr 1fr" : "1fr 1fr 1fr 1fr", gap: 16 }}>
              <ArraySlider T={T} label="Rev Growth" values={p.revenueGrowth} index={editYear} min={-0.20} max={0.40} step={0.005} format={pct} onChange={v => set("revenueGrowth", v)} />
              <ArraySlider T={T} label="EBIT Margin" values={p.ebitMargin} index={editYear} min={0.25} max={0.50} step={0.005} format={pct} onChange={v => set("ebitMargin", v)} />
              <ArraySlider T={T} label="D&A %" values={p.daPercent} index={editYear} min={0.01} max={0.05} step={0.001} format={pct} onChange={v => set("daPercent", v)} />
              <ArraySlider T={T} label="Capex %" values={p.capexPercent} index={editYear} min={0.02} max={0.12} step={0.002} format={pct} onChange={v => set("capexPercent", v)} />
            </div>
          </Card>
        </div>
      )}

      {/* TAB: Sensitivity */}
      {tab === "sensitivity" && (
        <Card T={T} style={{ padding: "16px 20px", overflowX: "auto" }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: T.textTer, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>
            Implied Share Price (€)
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
            <span style={{ color: T.green }}>■</span> Above current price (€{p.currentPrice}) &nbsp;
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
            <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
              {[
                { l: "DCF Implied", v: price(result.impliedPrice), sub: "10-year Gordon Growth", c: T.deepBlue },
                { l: "Current Price", v: "€" + p.currentPrice, sub: "AEX, Apr 2026", c: T.textSec },
                { l: "Upside", v: (result.upside >= 0 ? "+" : "") + pct(result.upside), sub: "vs current", c: upColor },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: "center", padding: "16px", background: T.bg, borderRadius: T.radiusSm }}>
                  <div style={{ fontSize: 24, fontWeight: 300, color: s.c, fontFamily: Fn }}>{s.v}</div>
                  <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 4 }}>{s.sub}</div>
                  <div style={{ fontSize: 9, color: T.textTer, fontFamily: Fn, marginTop: 2, textTransform: "uppercase" }}>{s.l}</div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: 11, fontWeight: 600, color: T.textTer, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>Methodology comparison</div>
            <div style={{ marginBottom: 20 }}>
              {valuationMethods.map((m, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "200px 1fr", gap: 8, padding: "8px 0", borderBottom: i < valuationMethods.length - 1 ? "1px solid " + T.border : "none" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: Fn }}>{m.method}</div>
                  <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.6 }}>{m.commentary}</div>
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

          <a href="/research/ASML_DCF_Model.xlsx" download style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "10px 20px", background: T.card, border: "1px solid " + T.border, borderRadius: T.radiusSm,
            fontSize: 12, fontFamily: Fn, color: T.textSec, textDecoration: "none", marginBottom: 16,
          }}>
            📥 Download Morgan Stanley source model (.xlsx)
          </a>

          <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, lineHeight: 1.7, maxWidth: 760, paddingBottom: 20 }}>
            Defaults reflect Morgan Stanley research model (Lee Simpson et al., 16 Apr 2026). All parameters adjustable above. Implied price recomputes live. For informational use only; not investment advice.
          </div>
        </div>
      )}
    </div>
  );
}
