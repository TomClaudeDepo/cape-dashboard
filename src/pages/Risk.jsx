import { useState } from "react";
import { Fn } from "../theme";
import { Card, Pill, TabBar } from "../components/shared";

const NAV_DATE = "24 March 2026";
const FUND_NAV = 392488342.84;

const positions = [
  { name: "Novartis", isin: "CH0012005267", country: "Switzerland", sector: "Pharmaceuticals", ccy: "CHF", mv: 16538353.25, pct: 4.21 },
  { name: "Siemens", isin: "DE0007236101", country: "Germany", sector: "Electrical", ccy: "EUR", mv: 8953760, pct: 2.28 },
  { name: "Air Liquide", isin: "FR0000120073", country: "France", sector: "Chemicals", ccy: "EUR", mv: 13922037.16, pct: 3.55 },
  { name: "Veolia", isin: "FR0000124141", country: "France", sector: "Utilities", ccy: "EUR", mv: 8940441, pct: 2.28 },
  { name: "Hitachi", isin: "JP3788600009", country: "Japan", sector: "Electronics", ccy: "JPY", mv: 19629003.56, pct: 5.00 },
  { name: "Alibaba", isin: "KYG017191142", country: "China (HK-listed)", sector: "Internet & Tech", ccy: "HKD", mv: 15212427.18, pct: 3.88 },
  { name: "Tencent", isin: "KYG875721634", country: "China (HK-listed)", sector: "Internet & Tech", ccy: "HKD", mv: 16076676.96, pct: 4.10 },
  { name: "Akzo Nobel", isin: "NL0013267909", country: "Netherlands", sector: "Chemicals", ccy: "EUR", mv: 5902164, pct: 1.50 },
  { name: "Volvo", isin: "SE0000115446", country: "Sweden", sector: "Vehicles", ccy: "SEK", mv: 12504848.65, pct: 3.19 },
  { name: "Epiroc", isin: "SE0015658109", country: "Sweden", sector: "Industrials", ccy: "SEK", mv: 15889422.72, pct: 4.05 },
  { name: "Alphabet", isin: "US02079K1079", country: "USA", sector: "Internet & Tech", ccy: "USD", mv: 15336742.1, pct: 3.91 },
  { name: "Amazon", isin: "US0231351067", country: "USA", sector: "Retail", ccy: "USD", mv: 15608333.05, pct: 3.98 },
  { name: "Broadcom", isin: "US11135F1012", country: "USA", sector: "Semiconductors", ccy: "USD", mv: 7834915.36, pct: 2.00 },
  { name: "Corning", isin: "US2193501051", country: "USA", sector: "Telecom", ccy: "USD", mv: 11480511.31, pct: 2.93 },
  { name: "ICE", isin: "US45866F1049", country: "USA", sector: "Financials", ccy: "USD", mv: 18410931.08, pct: 4.69 },
  { name: "JP Morgan", isin: "US46625H1005", country: "USA", sector: "Banks", ccy: "USD", mv: 17514199.34, pct: 4.46 },
  { name: "MSCI", isin: "US55354G1004", country: "USA", sector: "Financials", ccy: "USD", mv: 18667757.82, pct: 4.76 },
  { name: "Microsoft", isin: "US5949181045", country: "USA", sector: "Internet & Tech", ccy: "USD", mv: 17725915.01, pct: 4.52 },
  { name: "Netflix", isin: "US64110L1061", country: "USA", sector: "Internet & Tech", ccy: "USD", mv: 18697574.71, pct: 4.76 },
  { name: "NVIDIA", isin: "US67066G1040", country: "USA", sector: "Internet & Tech", ccy: "USD", mv: 18476351.7, pct: 4.71 },
  { name: "Pfizer", isin: "US7960508882", country: "USA", sector: "Pharmaceuticals", ccy: "USD", mv: 19212900.33, pct: 4.90 },
  { name: "Rockwell Auto.", isin: "US7743411016", country: "USA", sector: "Industrials", ccy: "USD", mv: 13103506.65, pct: 3.34 },
  { name: "Samsung (GDR)", isin: "US7960508882", country: "South Korea", sector: "Electronics", ccy: "USD", mv: 17495681.46, pct: 4.46 },
  { name: "ServiceNow", isin: "US81762P1021", country: "USA", sector: "Internet & Tech", ccy: "USD", mv: 7438845.22, pct: 1.90 },
  { name: "TSMC (ADR)", isin: "US8740391003", country: "Taiwan", sector: "Semiconductors", ccy: "USD", mv: 19240736.74, pct: 4.90 },
  { name: "Thermo Fisher", isin: "US8835561023", country: "USA", sector: "Life Sciences", ccy: "USD", mv: 17857600.02, pct: 4.55 },
];

const currencyExposure = [
  { ccy: "USD", pct: 71.12 }, { ccy: "SEK", pct: 9.44 }, { ccy: "HKD", pct: 9.75 },
  { ccy: "CHF", pct: 6.12 }, { ccy: "JPY", pct: 5.54 }, { ccy: "EUR", pct: -1.97 },
];

const assetAllocation = [
  { type: "Equities", pct: 98.77 }, { type: "FX Forwards", pct: -0.77 },
  { type: "Cash & Liquidity", pct: 2.03 }, { type: "Current Assets", pct: 0.04 },
  { type: "Current Liabilities", pct: -0.07 },
];

const countryAllocation = [
  { country: "USA", pct: 55.38 }, { country: "Sweden", pct: 7.23 },
  { country: "China (Cayman Is.)", pct: 7.97 }, { country: "France", pct: 5.83 },
  { country: "Japan", pct: 5.00 }, { country: "Taiwan", pct: 4.90 },
  { country: "South Korea", pct: 4.46 }, { country: "Switzerland", pct: 4.21 },
  { country: "Germany", pct: 2.28 }, { country: "Netherlands", pct: 1.50 },
];

// Cash breakdown from NAV report (Liquidity_at_sight sheet)
const cashBreakdown = [
  { ccy: "CHF", type: "Cash Account", mvLocal: 3589113.93, fx: 1.091286, mvEur: 3910202.36, pctNav: 1.00 },
  { ccy: "DKK", type: "Cash Account", mvLocal: 21494.75, fx: 0.133841, mvEur: 2876.88, pctNav: 0.00 },
  { ccy: "EUR", type: "Cash Account", mvLocal: -11121992.29, fx: 1.0, mvEur: -11121992.29, pctNav: -2.83 },
  { ccy: "GBP", type: "Cash Account", mvLocal: 32433.58, fx: 1.155869, mvEur: 37482.47, pctNav: 0.01 },
  { ccy: "HKD", type: "Cash Account", mvLocal: 63144406.92, fx: 0.110327, mvEur: 6966505.62, pctNav: 1.77 },
  { ccy: "JPY", type: "Cash Account", mvLocal: 390749410.00, fx: 0.005435, mvEur: 2123866.84, pctNav: 0.54 },
  { ccy: "KRW", type: "Cash Account", mvLocal: -209.00, fx: 0.000578, mvEur: -0.12, pctNav: 0.00 },
  { ccy: "NOK", type: "Cash Account", mvLocal: 731.68, fx: 0.089115, mvEur: 65.20, pctNav: 0.00 },
  { ccy: "SEK", type: "Cash Account", mvLocal: 28282830.46, fx: 0.092567, mvEur: 2618053.36, pctNav: 0.67 },
  { ccy: "USD", type: "Cash Account", mvLocal: 24367893.76, fx: 0.863707, mvEur: 21046721.16, pctNav: 5.36 },
];
const cashCollateral = { desc: "UBS AG London Branch", ccy: "EUR", mvEur: 1220000.00, pctNav: 0.31 };
const cashReceivables = [
  { desc: "Rec. for Sales of Invest.", ccy: "CHF", mvEur: 3553947.81, pctNav: 0.91 },
  { desc: "Rec. for Sales of Invest.", ccy: "EUR", mvEur: 6546237.20, pctNav: 1.67 },
  { desc: "Rec. for Sales of Invest.", ccy: "SEK", mvEur: 6027320.34, pctNav: 1.54 },
  { desc: "Rec. for Sales of Invest.", ccy: "USD", mvEur: 3841378.48, pctNav: 0.98 },
];
const cashSpotRec = { desc: "Cash Rec. from Spot 'Ach'", ccy: "CHF", mvEur: 17448572.95, pctNav: 4.45 };
const cashPayables = [
  { desc: "Pay. for Redemptions", ccy: "EUR", mvEur: -21243516.39, pctNav: -5.41 },
  { desc: "Pay. for Redemptions 'Ach'", ccy: "CHF", mvEur: -17448572.97, pctNav: -4.45 },
  { desc: "Cash Payables Spot 'Ach'", ccy: "EUR", mvEur: -17555323.99, pctNav: -4.47 },
];
const totalLiquidity = { mvEur: 7973824.71, pctNav: 2.03 };

const fwdSummary = {
  totalMvEur: -3039390.50,
  pctNav: -0.77,
  chfHedgeRatio: 99.44,
  usdHedgeRatio: 99.41,
  contracts: 18,
  counterparties: ["UBS AG London", "BNP-Paribas"],
  maturities: ["30 Mar 2026", "15 Apr 2026"],
};

const shareClasses = [
  { name: "A EUR", isin: "LU1200255203", ccy: "EUR", nav: 234.587, chgPct: 0.157, ytdPct: -3.04, weightPct: 12.81, tna: 50284094.68 },
  { name: "Instit. B EUR", isin: "LU1200254495", ccy: "EUR", nav: 156.459, chgPct: 0.156, ytdPct: -3.14, weightPct: 0.21, tna: 837183.79 },
  { name: "Internal A CHF", isin: "LU1200255385", ccy: "CHF", nav: 118.35, chgPct: 0.161, ytdPct: -3.52, weightPct: 79.91, tna: 287391920.82 },
  { name: "Internal A USD", isin: "LU1200255625", ccy: "USD", nav: 111.87, chgPct: 0.152, ytdPct: -2.59, weightPct: 6.65, tna: 30196684.00 },
  { name: "Internal B CHF", isin: "LU3152991280", ccy: "CHF", nav: 93.65, chgPct: 0.150, ytdPct: -3.41, weightPct: 0.42, tna: 1520405.56 },
];

const riskChecks = [
  { id: "mkt_exposure", label: "Equity Market Exposure", description: "90-100% under ordinary conditions", current: 98.77, min: 90, max: 100, unit: "%" },
  { id: "china_a", label: "China A-Shares (Stock Connect)", description: "Max 20% via Stock Connect Scheme", current: 0, min: 0, max: 20, unit: "%" },
  { id: "liquidity", label: "Ancillary Liquid Assets", description: "Max 10% of NAV on a temporary basis", current: 2.03, min: 0, max: 10, unit: "%" },
  { id: "single_issuer", label: "Single Issuer Concentration", description: "UCITS: max 10% in any single issuer", current: Math.max(...positions.map(p => p.pct)), min: 0, max: 10, unit: "%" },
  { id: "ucits_5_40", label: "UCITS 5/10/40 Rule (>5% bucket)", description: "Sum of positions >5% must not exceed 40%", current: positions.filter(p => p.pct > 5).reduce((s, p) => s + p.pct, 0), min: 0, max: 40, unit: "%" },
  { id: "global_exposure", label: "Global Exposure (Commitment)", description: "Must not exceed 100% of NAV", current: 98.77 + 0.77, min: 0, max: 100, unit: "%" },
];

const emCountries = ["China (Cayman Is.)", "South Korea", "Taiwan"];
const emTotal = countryAllocation.filter(c => emCountries.includes(c.country)).reduce((s, c) => s + c.pct, 0);

function getStatus(check) {
  const headroom = check.max - check.current;
  const range = check.max - check.min;
  if (check.current > check.max || check.current < check.min) return "breach";
  if (headroom / range < 0.15) return "warning";
  return "pass";
}

function StatusBadge({ status, T }) {
  const config = {
    pass: { color: T.green, bg: T.greenBg, label: "PASS" },
    warning: { color: T.orange, bg: "rgba(234,88,12,0.08)", label: "WATCH" },
    breach: { color: T.capRed, bg: T.redBg, label: "BREACH" },
  };
  const c = config[status];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "3px 10px", borderRadius: 6,
      background: c.bg, color: c.color,
      fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", fontFamily: Fn,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.color }} />
      {c.label}
    </span>
  );
}

function GaugeBar({ current, min, max, status, T }) {
  const range = max - min;
  const pct = Math.min(((current - min) / range) * 100, 100);
  const colors = { pass: T.green, warning: T.orange, breach: T.capRed };
  return (
    <div style={{ position: "relative", height: 6, background: T.pillBg, borderRadius: 3, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${Math.max(pct, 1)}%`, background: colors[status], borderRadius: 3, transition: "width 0.6s ease" }} />
    </div>
  );
}

function RiskCard({ check, T }) {
  const status = getStatus(check);
  const headroom = check.max - check.current;
  return (
    <Card T={T} style={{
      padding: "16px 18px",
      borderLeft: `3px solid ${status === "breach" ? T.capRed : status === "warning" ? T.orange : T.green}`,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 2 }}>{check.label}</div>
          <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn }}>{check.description}</div>
        </div>
        <StatusBadge status={status} T={T} />
      </div>
      <GaugeBar current={check.current} min={check.min} max={check.max} status={status} T={T} />
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: Fn, fontSize: 11, marginTop: 8 }}>
        <span style={{ color: T.textSec }}>Current: <span style={{ color: T.text, fontWeight: 600, fontFeatureSettings: '"tnum"' }}>{check.current.toFixed(2)}{check.unit}</span></span>
        <span style={{ color: T.textTer }}>Limit: {check.max}{check.unit} · Headroom: <span style={{ color: headroom < 3 ? T.orange : T.green, fontWeight: 600 }}>{headroom.toFixed(2)}{check.unit}</span></span>
      </div>
    </Card>
  );
}

function BarChartSimple({ data, labelKey, valueKey, maxVal, color, T }) {
  const absMax = maxVal || Math.max(...data.map(d => Math.abs(d[valueKey])));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {data.map((d, i) => {
        const val = d[valueKey];
        const barPct = Math.abs(val) / absMax * 100;
        const isNeg = val < 0;
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 100, fontSize: 11, color: T.textSec, textAlign: "right", flexShrink: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: Fn }}>{d[labelKey]}</div>
            <div style={{ flex: 1, height: 18, background: T.pillBg, borderRadius: 4, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${barPct}%`, background: isNeg ? T.capRed : (color || T.deepBlue), borderRadius: 4, opacity: 0.8, transition: "width 0.4s ease" }} />
            </div>
            <div style={{ width: 52, fontSize: 11, color: T.text, fontFamily: Fn, textAlign: "right", flexShrink: 0, fontWeight: 500, fontFeatureSettings: '"tnum"' }}>{val.toFixed(2)}%</div>
          </div>
        );
      })}
    </div>
  );
}

function PositionTable({ data, sortKey, sortDir, onSort, T }) {
  const sorted = [...data].sort((a, b) => sortDir === "desc" ? (typeof b[sortKey] === "string" ? b[sortKey].localeCompare(a[sortKey]) : b[sortKey] - a[sortKey]) : (typeof a[sortKey] === "string" ? a[sortKey].localeCompare(b[sortKey]) : a[sortKey] - b[sortKey]));
  const SortHeader = ({ field, children, align = "left" }) => (
    <th onClick={() => onSort(field)} style={{
      padding: "10px 10px", textAlign: align, cursor: "pointer",
      color: sortKey === field ? T.capRed : T.textTer,
      fontSize: 9, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
      borderBottom: "2px solid " + T.border, fontFamily: Fn, background: "transparent",
    }}>
      {children} {sortKey === field ? (sortDir === "desc" ? "▼" : "▲") : ""}
    </th>
  );
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: Fn }}>
        <thead>
          <tr>
            <SortHeader field="name">Name</SortHeader>
            <SortHeader field="country">Country</SortHeader>
            <SortHeader field="sector">Sector</SortHeader>
            <SortHeader field="ccy">CCY</SortHeader>
            <SortHeader field="pct" align="right">Weight</SortHeader>
            <th style={{ padding: "10px 10px", textAlign: "right", color: T.textTer, fontSize: 9, fontWeight: 600, letterSpacing: "0.08em", borderBottom: "2px solid " + T.border, fontFamily: Fn, textTransform: "uppercase" }}>vs 10% Limit</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((p, i) => (
            <tr key={i} style={{ borderBottom: "1px solid " + T.border }}>
              <td style={{ padding: "9px 10px", color: T.text, fontWeight: 500 }}>{p.name}</td>
              <td style={{ padding: "9px 10px", color: T.textSec }}>{p.country}</td>
              <td style={{ padding: "9px 10px", color: T.textSec }}>{p.sector}</td>
              <td style={{ padding: "9px 10px", color: T.textTer, fontFeatureSettings: '"tnum"' }}>{p.ccy}</td>
              <td style={{ padding: "9px 10px", textAlign: "right", color: T.text, fontWeight: 600, fontFeatureSettings: '"tnum"' }}>{p.pct.toFixed(2)}%</td>
              <td style={{ padding: "9px 10px", textAlign: "right" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6 }}>
                  <div style={{ width: 60, height: 5, background: T.pillBg, borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${(p.pct / 10) * 100}%`, background: p.pct > 8 ? T.orange : p.pct > 10 ? T.capRed : T.green, borderRadius: 2 }} />
                  </div>
                  <span style={{ fontSize: 10, color: T.textTer, fontFeatureSettings: '"tnum"', width: 40, textAlign: "right" }}>{(10 - p.pct).toFixed(1)}%</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function RiskPg({ T }) {
  const [tab, setTab] = useState("limits");
  const [sortKey, setSortKey] = useState("pct");
  const [sortDir, setSortDir] = useState("desc");
  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === "desc" ? "asc" : "desc");
    else { setSortKey(key); setSortDir("desc"); }
  };

  const breaches = riskChecks.filter(c => getStatus(c) === "breach").length;
  const warnings = riskChecks.filter(c => getStatus(c) === "warning").length;
  const overallStatus = breaches > 0 ? "breach" : warnings > 0 ? "warning" : "pass";
  const topHoldings = [...positions].sort((a, b) => b.pct - a.pct).slice(0, 10);
  const top10Sum = topHoldings.reduce((s, p) => s + p.pct, 0);

  const tabs = [
    { k: "limits", l: "Limit Monitoring" },
    { k: "concentration", l: "Concentration" },
    { k: "positions", l: "All Positions" },
  ];

  const statusColors = { pass: T.green, warning: T.orange, breach: T.capRed };
  const statusBgs = { pass: T.greenBg, warning: "rgba(234,88,12,0.08)", breach: T.redBg };
  const statusLabels = { pass: "ALL CLEAR", warning: "WATCH", breach: "BREACH" };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: Fn, fontSize: 28, fontWeight: 300, letterSpacing: "-0.03em", color: T.text, margin: 0 }}>Risk Monitor</h1>
          <p style={{ fontSize: 12, color: T.textTer, marginTop: 6, fontFamily: Fn }}>
            Cape Equity Fund · SICAV-UCITS · NAV Date: {NAV_DATE} · TNA: EUR {(FUND_NAV / 1e6).toFixed(2)}m · 26 positions
          </p>
        </div>
        <div style={{
          padding: "14px 22px", borderRadius: T.radius, textAlign: "center",
          background: statusBgs[overallStatus], border: "1px solid " + T.border,
        }}>
          <div style={{ fontSize: 9, color: T.textTer, letterSpacing: "0.15em", fontWeight: 600, marginBottom: 4, fontFamily: Fn, textTransform: "uppercase" }}>Overall status</div>
          <div style={{ fontSize: 20, fontWeight: 600, color: statusColors[overallStatus], fontFamily: Fn, letterSpacing: "0.05em" }}>
            {statusLabels[overallStatus]}
          </div>
          <div style={{ fontSize: 11, color: T.textTer, marginTop: 4, fontFamily: Fn }}>
            {breaches} breach{breaches !== 1 ? "es" : ""} · {warnings} warning{warnings !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ marginBottom: 20 }}>
        <TabBar tabs={tabs} active={tab} onChange={setTab} T={T} />
      </div>

      {/* LIMITS TAB */}
      {tab === "limits" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))", gap: 14 }}>
            {riskChecks.map(check => <RiskCard key={check.id} check={check} T={T} />)}
          </div>

          {/* EM Exposure */}
          <Card T={T} style={{ padding: "16px 18px", borderLeft: `3px solid ${emTotal > 50 ? T.capRed : emTotal > 35 ? T.orange : T.green}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 2 }}>Emerging Markets Exposure</div>
                <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn }}>Fund shall not be predominantly invested in EM (guideline: &lt;50%)</div>
              </div>
              <StatusBadge status={emTotal > 50 ? "breach" : emTotal > 35 ? "warning" : "pass"} T={T} />
            </div>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 8 }}>
              {emCountries.map(c => {
                const alloc = countryAllocation.find(x => x.country === c);
                return alloc ? (
                  <div key={c} style={{ fontSize: 12, color: T.textSec, fontFamily: Fn }}>
                    {c}: <span style={{ color: T.text, fontWeight: 600, fontFeatureSettings: '"tnum"' }}>{alloc.pct.toFixed(2)}%</span>
                  </div>
                ) : null;
              })}
              <div style={{ fontSize: 12, color: T.deepBlue, fontWeight: 600, fontFamily: Fn }}>
                Total EM: <span style={{ fontFeatureSettings: '"tnum"' }}>{emTotal.toFixed(2)}%</span>
              </div>
            </div>
          </Card>

          {/* FX Hedging */}
          <Card T={T} style={{ padding: "16px 18px" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 2 }}>FX Hedging Overlay</div>
            <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 14 }}>Share class hedging (CHF, USD classes) — FX forwards mark-to-market</div>
            <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
              {[
                { label: "FWD MV", value: `EUR ${(-3039390.5 / 1e6).toFixed(2)}m`, color: T.capRed },
                { label: "% OF NAV", value: "-0.77%", color: T.textSec },
                { label: "CHF HEDGE RATIO", value: "99.44%", color: T.text },
                { label: "USD HEDGE RATIO", value: "99.41%", color: T.text },
              ].map((m, i) => (
                <div key={i}>
                  <div style={{ fontSize: 9, color: T.textTer, letterSpacing: "0.15em", fontWeight: 600, fontFamily: Fn, textTransform: "uppercase" }}>{m.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 300, color: m.color, fontFamily: Fn, marginTop: 4, fontFeatureSettings: '"tnum"' }}>{m.value}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Cash & Liquidity Breakdown */}
          <Card T={T} style={{ padding: "16px 18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 2 }}>Cash & Liquidity Breakdown</div>
                <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn }}>Ancillary liquid assets by currency — from UBS NAV Package</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 18, fontWeight: 300, color: T.text, fontFamily: Fn, fontFeatureSettings: '"tnum"' }}>EUR {(totalLiquidity.mvEur / 1e6).toFixed(2)}m</div>
                <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn }}>{totalLiquidity.pctNav}% of NAV</div>
              </div>
            </div>
            {/* Cash accounts by currency */}
            <div style={{ fontSize: 10, color: T.textTer, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8, fontFamily: Fn }}>Cash accounts by currency</div>
            <div style={{ overflowX: "auto", marginBottom: 16 }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, fontFamily: Fn }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid " + T.border }}>
                    {["Currency", "Local Amount", "FX Rate", "EUR Value", "% NAV"].map(h => (
                      <th key={h} style={{ textAlign: h === "Currency" ? "left" : "right", padding: "8px 8px", fontSize: 9, color: T.textTer, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cashBreakdown.filter(c => Math.abs(c.mvEur) > 100).sort((a, b) => b.mvEur - a.mvEur).map((c, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid " + T.border }}>
                      <td style={{ padding: "7px 8px", fontWeight: 500, color: T.text }}>{c.ccy}</td>
                      <td style={{ padding: "7px 8px", textAlign: "right", color: T.textSec, fontFeatureSettings: '"tnum"' }}>{c.mvLocal.toLocaleString("en", { maximumFractionDigits: 0 })}</td>
                      <td style={{ padding: "7px 8px", textAlign: "right", color: T.textTer, fontFeatureSettings: '"tnum"' }}>{c.fx.toFixed(4)}</td>
                      <td style={{ padding: "7px 8px", textAlign: "right", color: c.mvEur >= 0 ? T.green : T.capRed, fontWeight: 500, fontFeatureSettings: '"tnum"' }}>EUR {(c.mvEur / 1e6).toFixed(2)}m</td>
                      <td style={{ padding: "7px 8px", textAlign: "right", fontFeatureSettings: '"tnum"', color: T.textSec }}>{c.pctNav.toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Summary items */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              <div style={{ background: T.bg, borderRadius: T.radiusSm, padding: "12px 14px", border: "1px solid " + T.border }}>
                <div style={{ fontSize: 9, color: T.textTer, letterSpacing: "0.12em", fontWeight: 600, textTransform: "uppercase", fontFamily: Fn }}>Collateral (UBS)</div>
                <div style={{ fontSize: 16, fontWeight: 300, color: T.text, fontFamily: Fn, marginTop: 4, fontFeatureSettings: '"tnum"' }}>EUR {(cashCollateral.mvEur / 1e6).toFixed(2)}m</div>
                <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn }}>{cashCollateral.pctNav}% of NAV</div>
              </div>
              <div style={{ background: T.bg, borderRadius: T.radiusSm, padding: "12px 14px", border: "1px solid " + T.border }}>
                <div style={{ fontSize: 9, color: T.textTer, letterSpacing: "0.12em", fontWeight: 600, textTransform: "uppercase", fontFamily: Fn }}>Receivables</div>
                <div style={{ fontSize: 16, fontWeight: 300, color: T.green, fontFamily: Fn, marginTop: 4, fontFeatureSettings: '"tnum"' }}>EUR {(cashReceivables.reduce((s, r) => s + r.mvEur, 0) / 1e6).toFixed(2)}m</div>
                <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn }}>{cashReceivables.reduce((s, r) => s + r.pctNav, 0).toFixed(2)}% of NAV</div>
              </div>
              <div style={{ background: T.bg, borderRadius: T.radiusSm, padding: "12px 14px", border: "1px solid " + T.border }}>
                <div style={{ fontSize: 9, color: T.textTer, letterSpacing: "0.12em", fontWeight: 600, textTransform: "uppercase", fontFamily: Fn }}>Payables</div>
                <div style={{ fontSize: 16, fontWeight: 300, color: T.capRed, fontFamily: Fn, marginTop: 4, fontFeatureSettings: '"tnum"' }}>EUR {(cashPayables.reduce((s, r) => s + r.mvEur, 0) / 1e6).toFixed(2)}m</div>
                <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn }}>{cashPayables.reduce((s, r) => s + r.pctNav, 0).toFixed(2)}% of NAV</div>
              </div>
            </div>
          </Card>

          {/* Share Classes */}
          <Card T={T} style={{ padding: "16px 18px" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 2 }}>Share Classes</div>
            <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 14 }}>NAV per share and YTD performance by class</div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, fontFamily: Fn }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid " + T.border }}>
                    {["Class", "ISIN", "CCY", "NAV", "1D Chg", "YTD", "Weight", "TNA"].map(h => (
                      <th key={h} style={{ textAlign: h === "Class" || h === "ISIN" || h === "CCY" ? "left" : "right", padding: "8px 8px", fontSize: 9, color: T.textTer, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {shareClasses.map((sc, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid " + T.border }}>
                      <td style={{ padding: "8px 8px", fontWeight: 500, color: T.text }}>{sc.name}</td>
                      <td style={{ padding: "8px 8px", color: T.textTer, fontSize: 10, fontFeatureSettings: '"tnum"' }}>{sc.isin}</td>
                      <td style={{ padding: "8px 8px", color: T.textSec }}>{sc.ccy}</td>
                      <td style={{ padding: "8px 8px", textAlign: "right", color: T.text, fontWeight: 600, fontFeatureSettings: '"tnum"' }}>{sc.nav.toFixed(3)}</td>
                      <td style={{ padding: "8px 8px", textAlign: "right", color: T.green, fontFeatureSettings: '"tnum"' }}>+{sc.chgPct.toFixed(3)}%</td>
                      <td style={{ padding: "8px 8px", textAlign: "right", color: T.capRed, fontFeatureSettings: '"tnum"' }}>{sc.ytdPct.toFixed(2)}%</td>
                      <td style={{ padding: "8px 8px", textAlign: "right", color: T.textSec, fontFeatureSettings: '"tnum"' }}>{sc.weightPct.toFixed(1)}%</td>
                      <td style={{ padding: "8px 8px", textAlign: "right", color: T.textSec, fontFeatureSettings: '"tnum"' }}>EUR {(sc.tna / 1e6).toFixed(1)}m</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* CONCENTRATION TAB */}
      {tab === "concentration" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: 16 }}>
          <Card T={T} style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn }}>Top 10 Holdings</div>
              <Pill T={T}>{top10Sum.toFixed(1)}% of NAV</Pill>
            </div>
            <BarChartSimple data={topHoldings} labelKey="name" valueKey="pct" maxVal={10} color={T.deepBlue} T={T} />
          </Card>

          <Card T={T} style={{ padding: "18px 20px" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 14 }}>Country Allocation</div>
            <BarChartSimple data={countryAllocation} labelKey="country" valueKey="pct" maxVal={60} color={T.purple} T={T} />
          </Card>

          <Card T={T} style={{ padding: "18px 20px" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 14 }}>Currency Exposure (Net)</div>
            <BarChartSimple data={currencyExposure} labelKey="ccy" valueKey="pct" maxVal={75} color={T.green} T={T} />
          </Card>

          <Card T={T} style={{ padding: "18px 20px" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 14 }}>Sector Concentration</div>
            {(() => {
              const sectorMap = {};
              positions.forEach(p => { sectorMap[p.sector] = (sectorMap[p.sector] || 0) + p.pct; });
              const sectorData = Object.entries(sectorMap).map(([sector, pct]) => ({ sector, pct })).sort((a, b) => b.pct - a.pct);
              return <BarChartSimple data={sectorData} labelKey="sector" valueKey="pct" maxVal={30} color={T.orange} T={T} />;
            })()}
          </Card>

          <Card T={T} style={{ padding: "18px 20px" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 14 }}>Asset Type Breakdown</div>
            <BarChartSimple data={assetAllocation} labelKey="type" valueKey="pct" maxVal={100} color={T.deepBlue} T={T} />
          </Card>

          <Card T={T} style={{ padding: "18px 20px" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 18 }}>Portfolio Metrics</div>
            {[
              { label: "Total Positions", value: "26" },
              { label: "DM Exposure", value: `${(100 - emTotal).toFixed(1)}%` },
              { label: "EM Exposure", value: `${emTotal.toFixed(1)}%` },
              { label: "Largest Position", value: `Hitachi (5.00%)` },
              { label: "Top 10 Concentration", value: `${top10Sum.toFixed(1)}%` },
              { label: "Positions > 5%", value: `${positions.filter(p => p.pct >= 5).length}` },
              { label: "Herfindahl Index", value: `${positions.reduce((s, p) => s + (p.pct * p.pct), 0).toFixed(0)}` },
            ].map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: i < 6 ? "1px solid " + T.border : "none" }}>
                <span style={{ fontSize: 12, color: T.textSec, fontFamily: Fn }}>{m.label}</span>
                <span style={{ fontSize: 12, color: T.text, fontWeight: 600, fontFamily: Fn, fontFeatureSettings: '"tnum"' }}>{m.value}</span>
              </div>
            ))}
          </Card>
        </div>
      )}

      {/* POSITIONS TAB */}
      {tab === "positions" && (
        <Card T={T} style={{ padding: "18px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn }}>All Equity Positions ({positions.length})</div>
            <span style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, fontStyle: "italic" }}>Click column headers to sort · Headroom = distance to 10% UCITS limit</span>
          </div>
          <PositionTable data={positions} sortKey={sortKey} sortDir={sortDir} onSort={handleSort} T={T} />
        </Card>
      )}
    </div>
  );
}
