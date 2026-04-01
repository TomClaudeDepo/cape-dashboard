import { useState } from "react";
import { Fn } from "../theme";
import { Card, Pill, TabBar } from "../components/shared";

const NAV_DATE = "31 Mar 2026";
const FUND_NAV = 383132062.97;

const positions = [
  { name: "NOVARTIS", pct: 4.28 },
  { name: "SIEMENS", pct: 2.15 },
  { name: "AIR LIQUIDE", pct: 4.03 },
  { name: "VEOLIA", pct: 2.30 },
  { name: "HITACHI", pct: 4.77 },
  { name: "ALIBABA", pct: 3.85 },
  { name: "TENCENT", pct: 3.96 },
  { name: "AKZO NOBEL", pct: 1.52 },
  { name: "VOLVO", pct: 3.19 },
  { name: "EPIROC", pct: 4.03 },
  { name: "ALPHABET", pct: 3.99 },
  { name: "AMAZON", pct: 4.08 },
  { name: "BROADCOM", pct: 2.00 },
  { name: "CORNING", pct: 2.88 },
  { name: "ICE", pct: 4.79 },
  { name: "JP MORGAN", pct: 4.48 },
  { name: "MSCI", pct: 4.80 },
  { name: "MICROSOFT", pct: 4.62 },
  { name: "NETFLIX", pct: 5.04 },
  { name: "NVIDIA", pct: 4.82 },
  { name: "PFIZER", pct: 5.06 },
  { name: "ROCKWELL", pct: 3.41 },
  { name: "SAMSUNG", pct: 3.95 },
  { name: "SERVICENOW", pct: 1.95 },
  { name: "TAIWAN SEMI", pct: 4.97 },
  { name: "THERMO FISHER", pct: 4.70 },
  { type: "Cash & Liquidity", pct: 1.99 }, { type: "Current Assets", pct: 0.04 },
  { type: "Forwards", pct: -1.56 }, { type: "Current Liabilities", pct: -0.08 },
];

const currencyExposure = [
  { ccy: "USD", pct: 66.42 }, { ccy: "CHF", pct: 9.57 }, { ccy: "HKD", pct: 7.82 },
  { ccy: "SEK", pct: 7.47 }, { ccy: "JPY", pct: 5.35 }, { ccy: "EUR", pct: 3.36 },
];

const assetAllocation = [
  { type: "Equities", pct: 99.61 }, { type: "FX Forwards", pct: -1.56 },
  { type: "Cash & Liquidity", pct: 1.99 }, { type: "Current Assets", pct: 0.04 },
  { type: "Current Liabilities", pct: -0.08 },
];

const countryAllocation = [
  { country: "USA", pct: 56.00 }, { country: "China (Cayman Is.)", pct: 7.81 },
  { country: "Sweden", pct: 7.22 }, { country: "France", pct: 6.33 },
  { country: "Japan", pct: 4.77 }, { country: "Taiwan", pct: 4.97 },
  { country: "Switzerland", pct: 4.28 }, { country: "South Korea", pct: 3.95 },
  { country: "Germany", pct: 2.15 }, { country: "Netherlands", pct: 1.52 },
];

// Cash breakdown from NAV report (Liquidity_at_sight sheet) — 31 Mar 2026
const cashBreakdown = [
  { ccy: "CHF", type: "Cash Account", mvLocal: 18348449.12, fx: 1.090275, mvEur: 20004850.76, pctNav: 5.26 },
  { ccy: "DKK", type: "Cash Account", mvLocal: 21494.75, fx: 0.133831, mvEur: 2876.67, pctNav: 0.00 },
  { ccy: "EUR", type: "Cash Account", mvLocal: -18022644.98, fx: 1.000000, mvEur: -18022644.98, pctNav: -4.74 },
  { ccy: "GBP", type: "Cash Account", mvLocal: 32433.58, fx: 1.151145, mvEur: 37335.77, pctNav: 0.01 },
  { ccy: "HKD", type: "Cash Account", mvLocal: 144406.92, fx: 0.111302, mvEur: 16072.72, pctNav: 0.00 },
  { ccy: "JPY", type: "Cash Account", mvLocal: 390749410.00, fx: 0.005467, mvEur: 2136236.67, pctNav: 0.56 },
  { ccy: "KRW", type: "Cash Account", mvLocal: -209.00, fx: 0.000575, mvEur: -0.12, pctNav: 0.00 },
  { ccy: "NOK", type: "Cash Account", mvLocal: 731.68, fx: 0.089239, mvEur: 65.29, pctNav: 0.00 },
  { ccy: "SEK", type: "Cash Account", mvLocal: 1395972.14, fx: 0.091366, mvEur: 127544.28, pctNav: 0.03 },
  { ccy: "USD", type: "Cash Account", mvLocal: 169064.46, fx: 0.872182, mvEur: 147454.94, pctNav: 0.04 },
];
const cashCollateral = { desc: "UBS AG London Branch", ccy: "EUR", mvEur: 3260000.00, pctNav: 0.86 };
const cashReceivables = [
  { desc: "Rec. Sales of Invest.", ccy: "CHF", mvEur: 441423.31, pctNav: 0.12 },
  { desc: "Rec. Sales of Invest.", ccy: "EUR", mvEur: 1328023.65, pctNav: 0.35 },
  { desc: "Rec. Sales of Invest.", ccy: "SEK", mvEur: 852931.93, pctNav: 0.22 },
  { desc: "Rec. Sales of Invest.", ccy: "USD", mvEur: 3126671.03, pctNav: 0.82 },
];
const cashSpotRec = [
  { desc: "Cash Rec. from Spot 'Ach'", ccy: "CHF", mvEur: 5669531.25, pctNav: 1.49 },
  { desc: "Cash Rec. from Spot 'Ach'", ccy: "EUR", mvEur: 1563.08, pctNav: 0.00 },
];
const cashPayables = [
  { desc: "PAY. FOR REDEMPTIONS 'Ach'", ccy: "CHF", mvEur: -5554594.46, pctNav: -1.46 },
  { desc: "PAY. FOR REDEMPTIONS 'Bch'", ccy: "CHF", mvEur: -2401.49, pctNav: -0.00 },
  { desc: "CASH PAYABLES SPOT 'Ach'", ccy: "CHF", mvEur: -1564.41, pctNav: -0.00 },
  { desc: "CASH PAYABLES SPOT 'Ach'", ccy: "EUR", mvEur: -5665403.58, pctNav: -1.49 },
];
const totalLiquidity = { mvEur: 7905972.31, pctNav: 2.08 };

const fwdSummary = {
  totalMvEur: -2991272.12,
  pctNav: -0.79,
  chfHedgeRatio: 99.81,
  usdHedgeRatio: 99.81,
  contracts: 19,
  counterparties: ["UBS AG London", "BNP-Paribas"],
  maturities: ["15 Apr 2026", "29 Apr 2026"],
};

const shareClasses = [
  { name: "A EUR", isin: "LU1200255203", ccy: "EUR", nav: 230.085, chgPct: 0.169, ytdPct: -4.91, weightPct: 12.98, tna: 49318970.47 },
  { name: "Instit. B EUR", isin: "LU1200254495", ccy: "EUR", nav: 153.444, chgPct: 0.165, ytdPct: -5.01, weightPct: 0.22, tna: 821052.19 },
  { name: "Internal A CHF", isin: "LU1200255385", ccy: "CHF", nav: 116.000, chgPct: 0.155, ytdPct: -5.44, weightPct: 79.58, tna: 277400255.22 },
  { name: "Internal A USD", isin: "LU1200255625", ccy: "USD", nav: 109.770, chgPct: 0.192, ytdPct: -4.42, weightPct: 6.80, tna: 29629272.42 },
  { name: "Internal B CHF", isin: "LU3152991280", ccy: "CHF", nav: 91.800, chgPct: 0.153, ytdPct: -5.32, weightPct: 0.43, tna: 1488280.50 },
];

const riskChecks = [
  { id: "mkt_exposure", label: "Equity Market Exposure", description: "90-100% under ordinary conditions", current: 98.73, min: 90, max: 100, unit: "%" },
  { id: "china_a", label: "China A-Shares (Stock Connect)", description: "Max 20% via Stock Connect Scheme", current: 0, min: 0, max: 20, unit: "%" },
  { id: "liquidity", label: "Ancillary Liquid Assets", description: "Max 10% of NAV on a temporary basis", current: 2.08, min: 0, max: 10, unit: "%" },
  { id: "single_issuer", label: "Single Issuer Concentration", description: "UCITS: max 10% in any single issuer", current: Math.max(...positions.map(p => p.pct)), min: 0, max: 10, unit: "%" },
  { id: "ucits_5_40", label: "UCITS 5/10/40 Rule (>5% bucket)", description: "Sum of positions >5% must not exceed 40%", current: positions.filter(p => p.pct > 5).reduce((s, p) => s + p.pct, 0), min: 0, max: 40, unit: "%" },
  { id: "global_exposure", label: "Global Exposure (Commitment)", description: "Must not exceed 100% of NAV", current: 98.73 + 0.79, min: 0, max: 100, unit: "%" },
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
