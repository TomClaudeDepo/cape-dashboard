import { useState } from "react";
import { Fn, Fh } from "../theme";
import { Card, Pill, TabBar } from "../components/shared";
import ResearchBKNG from "./ResearchBKNG";
import ResearchCEG from "./ResearchCEG";
import ResearchCNI from "./ResearchCNI";
import ResearchGold from "./ResearchGold";
import ResearchThemes from "./ResearchThemes";

const reports = [
  {
    id: "cni", ticker: "CNI", name: "Canadian National Railway", sector: "Freight Rail / Industrials",
    tagline: "North American freight rail: structural forces shaping CN's positioning",
    date: "March 2026", type: "Thematic Analysis", color: "deepBlue",
    stats: [
      { l: "Price", v: "C$152" }, { l: "Op. Ratio", v: "61.9%" },
      { l: "FCF", v: "C$3.34B" }, { l: "Network", v: "20K mi" },
    ],
  },
  {
    id: "ceg", ticker: "CEG", name: "Constellation Energy", sector: "Power / Nuclear",
    tagline: "Anatomy of a structural supercycle",
    date: "March 2026", type: "Deep Dive", color: "green",
    stats: [
      { l: "Price", v: "$300" }, { l: "Fwd P/E", v: "~25x" },
      { l: "Fleet", v: "55 GW" }, { l: "Nuclear", v: "22 GW" },
    ],
  },
  {
    id: "bkng", ticker: "BKNG", name: "Booking Holdings", sector: "Online Travel",
    tagline: "Six mega-trends converging on a single platform",
    date: "March 2026", type: "Structural Thesis", color: "capRed",
    stats: [
      { l: "Price", v: "$4,350" }, { l: "Fwd P/E", v: "~16x" },
      { l: "FCF", v: "$9.1B" }, { l: "PEG", v: "0.95" },
    ],
  },
  {
    id: "gold", ticker: "XAU", name: "Gold", sector: "Commodities / Macro",
    tagline: "Parabolic bull run, structural demand shift, and the March 2026 liquidity crisis",
    date: "March 2026", type: "Thematic Analysis", color: "orange",
    stats: [
      { l: "Price", v: "$4,569" }, { l: "ATH", v: "$5,595" },
      { l: "Rally", v: "+205%" }, { l: "CB Buying", v: "4,088t" },
    ],
  },
  {
    id: "themes10", ticker: "MULTI", name: "Ten Obscure Investable Themes", sector: "Cross-Sector / Thematic",
    tagline: "Structural mispricings at the intersection of forced capex and zero sell-side coverage",
    date: "March 2026", type: "Thematic Scan", color: "deepBlue",
    stats: [
      { l: "Themes", v: "10" }, { l: "Agg. TAM", v: "$52B" },
      { l: "Avg. CAGR", v: "13%" }, { l: "Companies", v: "38" },
    ],
  },
];

const backBtn = (T, setActive) => (
  <button onClick={() => setActive(null)} style={{
    background: T.pillBg, border: "1px solid " + T.border, borderRadius: T.radiusSm,
    padding: "8px 16px", fontSize: 11, fontFamily: Fn, color: T.textSec,
    cursor: "pointer", marginBottom: 20, display: "flex", alignItems: "center", gap: 6,
  }}>
    ← All Research
  </button>
);

const reportComponents = {
  bkng: ResearchBKNG,
  ceg: ResearchCEG,
  cni: ResearchCNI,
  gold: ResearchGold,
  themes10: ResearchThemes,
};

export default function ResearchPg({ T }) {
  const [active, setActive] = useState(null);

  // If a report is selected, show it
  const ReportComponent = active ? reportComponents[active] : null;
  if (ReportComponent) return (
    <div>
      {backBtn(T, setActive)}
      <ReportComponent T={T} />
    </div>
  );

  // Hub view
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16 }}>
        {reports.map(r => {
          const bgColor = r.color === "green" ? T.greenBg : r.color === "deepBlue" ? "rgba(29,78,216,0.08)" : r.color === "purple" ? T.purple100 || "rgba(67,56,202,0.08)" : T.redBg;
          return (
            <div key={r.id}
              onClick={() => setActive(r.id)}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = T.shadowLg }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = T.shadow }}
              style={{
                background: T.card, boxShadow: T.shadow, borderRadius: T.radius,
                cursor: "pointer", overflow: "hidden", transition: "all 0.2s",
                borderTop: `3px solid ${T[r.color] || T.capRed}`,
              }}>
              <div style={{ padding: "24px 28px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <Pill T={T} color={T[r.color]} bg={bgColor}>{r.type}</Pill>
                  <Pill T={T}>{r.date}</Pill>
                  <span style={{ marginLeft: "auto", fontSize: 10, color: T.textTer, fontFamily: Fn }}>{r.sector}</span>
                </div>

                <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 20, fontWeight: 300, color: T.text, fontFamily: Fn }}>{r.name}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: T.textTer, fontFamily: Fn, letterSpacing: "0.03em" }}>{r.ticker}</span>
                </div>

                <p style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.6, margin: "0 0 16px" }}>{r.tagline}</p>

                <div style={{ display: "flex", gap: 20 }}>
                  {r.stats.map((s, i) => (
                    <div key={i}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: T[r.color] || T.text, fontFamily: Fn }}>{s.v}</div>
                      <div style={{ fontSize: 9, color: T.textTer, fontFamily: Fn, letterSpacing: "0.05em", marginTop: 2 }}>{s.l}</div>
                    </div>
                  ))}
                </div>

                <div style={{ fontSize: 12, fontWeight: 500, color: T[r.color] || T.capRed, marginTop: 16, fontFamily: Fn, display: "flex", alignItems: "center", gap: 4 }}>
                  Read report →
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
