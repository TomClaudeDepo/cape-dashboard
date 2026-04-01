import { useState } from "react";
import { Fs, Fn, Fh } from "../theme";
import { portfolioGics, acwiGics, portfolioCo, acwiCo, ccyAll, acwiCcy } from "../data/portfolio";
import { NAV, MV_PCT, FWD_PCT, CASH_PCT, CA_PCT, CL_PCT } from "../data/constants";
import { Card, Bars, TabBar, Stat } from "../components/shared";

// Asset type breakdown — derived from constants
const assetTypes = [
  { name: "Equities", wt: MV_PCT },
  { name: "FX Forwards", wt: FWD_PCT },
  { name: "Cash & Liquidity", wt: CASH_PCT },
  { name: "Current Assets", wt: CA_PCT },
  { name: "Current Liabilities", wt: CL_PCT },
];

// Country allocation from NAV report (by issuer country)
const countryAllocNAV = [
  { name: "USA", wt: 56.84 },
  { name: "China (Cayman Is.)", wt: 7.84 },
  { name: "Sweden", wt: 7.24 },
  { name: "France", wt: 6.35 },
  { name: "Taiwan", wt: 4.99 },
  { name: "Japan", wt: 4.79 },
  { name: "Switzerland", wt: 4.30 },
  { name: "South Korea", wt: 3.97 },
  { name: "Germany", wt: 2.16 },
  { name: "Netherlands", wt: 1.53 },
];

// Sector from NAV report (economic sector)
const sectorAllocNAV = [
  { name: "Internet/Software/IT", wt: 20.50 },
  { name: "Electronics/Semis", wt: 13.75 },
  { name: "Misc. Services", wt: 12.66 },
  { name: "Pharmaceuticals", wt: 9.38 },
  { name: "Banks/Financials", wt: 9.31 },
  { name: "Industrials", wt: 7.47 },
  { name: "Chemicals", wt: 5.57 },
  { name: "Life Sciences", wt: 4.71 },
  { name: "Retail", wt: 4.10 },
  { name: "Vehicles", wt: 3.20 },
  { name: "Telecom", wt: 2.89 },
  { name: "Utilities", wt: 2.31 },
  { name: "Electrical", wt: 2.16 },
  { name: "Computer/Networking", wt: 2.01 },
];

export default function AllocPg({ T }) {
  const [av, setAv] = useState("sector");
  return (
    <div>

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
