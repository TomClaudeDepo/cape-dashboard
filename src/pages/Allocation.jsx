import { useState } from "react";
import { Fs, Fn, Fh } from "../theme";
import { portfolioGics, acwiGics, portfolioCo, acwiCo, ccyAll, acwiCcy } from "../data/portfolio";
import { Card, Bars, TabBar, Stat } from "../components/shared";

// Asset type from NAV report 24 Mar 2026
const assetTypes = [
  { name: "Equities", wt: 98.77 },
  { name: "FX Forwards", wt: -0.77 },
  { name: "Cash & Liquidity", wt: 2.03 },
  { name: "Current Assets", wt: 0.04 },
  { name: "Current Liabilities", wt: -0.07 },
];

// Country allocation from NAV report (by issuer country)
const countryAllocNAV = [
  { name: "USA", wt: 55.38 },
  { name: "China (Cayman Is.)", wt: 7.97 },
  { name: "Sweden", wt: 7.23 },
  { name: "France", wt: 5.83 },
  { name: "Japan", wt: 5.00 },
  { name: "Taiwan", wt: 4.90 },
  { name: "South Korea", wt: 4.46 },
  { name: "Switzerland", wt: 4.21 },
  { name: "Germany", wt: 2.28 },
  { name: "Netherlands", wt: 1.50 },
];

// Sector from NAV report (economic sector)
const sectorAllocNAV = [
  { name: "Internet/Software/IT", wt: 23.89 },
  { name: "Electronics/Semis", wt: 14.45 },
  { name: "Pharmaceuticals", wt: 9.11 },
  { name: "Misc. Services", wt: 8.63 },
  { name: "Banks/Financials", wt: 9.22 },
  { name: "Industrials", wt: 7.39 },
  { name: "Chemicals", wt: 5.05 },
  { name: "Retail", wt: 3.98 },
  { name: "Vehicles", wt: 3.19 },
  { name: "Telecom", wt: 2.93 },
  { name: "Life Sciences", wt: 4.55 },
  { name: "Electrical", wt: 2.28 },
  { name: "Utilities", wt: 2.28 },
];

export default function AllocPg({ T }) {
  const [av, setAv] = useState("sector");
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: Fh, fontSize: 28, fontWeight: 400, fontStyle: "italic", letterSpacing: "-0.02em", color: T.text, margin: 0 }}>Allocation</h1>
        <p style={{ fontSize: 12, color: T.textTer, marginTop: 6, fontFamily: Fn }}>Portfolio structure vs MSCI ACWI (2,263 names) &middot; 24 Mar 2026 &middot; EUR</p>
      </div>

      {/* Summary stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginBottom: 24 }}>
        {assetTypes.map((a, i) => (
          <div key={i} style={{
            background: T.card, border: "1px solid " + T.border, borderRadius: T.radius,
            padding: "14px 16px", boxShadow: T.shadow,
          }}>
            <div style={{ fontSize: 20, fontWeight: 300, color: a.wt >= 0 ? T.text : T.capRed, fontFamily: Fn, fontFeatureSettings: '"tnum"' }}>{a.wt.toFixed(2)}%</div>
            <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 4 }}>{a.name}</div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 20 }}>
        <TabBar tabs={[
          { k: "sector", l: "GICS Sector" },
          { k: "navSector", l: "Economic Sector" },
          { k: "country", l: "Region" },
          { k: "navCountry", l: "Issuer Country" },
          { k: "ccy", l: "Currency" },
        ]} active={av} onChange={setAv} T={T} />
      </div>
      {av === "sector" && <Bars T={T} portfolio={portfolioGics} benchmark={acwiGics} title="GICS Sector vs MSCI ACWI" />}
      {av === "navSector" && <Bars T={T} portfolio={sectorAllocNAV} benchmark={[]} title="Economic Sector (NAV Report)" showBench={false} />}
      {av === "country" && <Bars T={T} portfolio={portfolioCo} benchmark={acwiCo} title="Region vs MSCI ACWI" />}
      {av === "navCountry" && <Bars T={T} portfolio={countryAllocNAV} benchmark={[]} title="Issuer Country (NAV Report)" showBench={false} />}
      {av === "ccy" && <Bars T={T} portfolio={ccyAll} benchmark={acwiCcy} title="Currency Exposure (Net) vs MSCI ACWI" />}
    </div>
  );
}
