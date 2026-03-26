import { useState } from "react";
import { Fn } from "../theme";
import { defWatch } from "../data/market";
import { Card, Pill, Label } from "../components/shared";

// Simulated allocation impact for each watchlist name
const impactData = {
  ASML: { sector: "Info Tech +1.8%", region: "Europe +1.8%", note: "Would increase IT overweight vs ACWI" },
  LVMH: { sector: "Cons. Disc. +1.5%", region: "Europe +1.5%", note: "Diversifies into luxury, adds EUR exposure" },
  AAPL: { sector: "Info Tech +1.8%", region: "N. America +1.8%", note: "Largest ACWI name — reduces active share" },
  LLY: { sector: "Health Care +1.5%", region: "N. America +1.5%", note: "Adds pharma growth exposure" },
  "NOVO-B": { sector: "Health Care +1.5%", region: "Europe +1.5%", note: "DKK currency adds Nordic FX tilt" },
  SAP: { sector: "Info Tech +1.5%", region: "Europe +1.5%", note: "Enterprise software, EUR denominated" },
};

export default function WatchPg({ T }) {
  const [items, setItems] = useState(defWatch);
  const [nw, setNw] = useState("");
  const [hovered, setHovered] = useState(null);

  const add = () => {
    if (nw.trim()) {
      setItems([...items, { tk: nw.toUpperCase(), nm: nw.toUpperCase(), pr: "\u2014", chg: 0, sec: "\u2014" }]);
      setNw("");
    }
  };

  const impact = hovered !== null ? impactData[items[hovered]?.tk] : null;

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: Fn, fontSize: 28, fontWeight: 300, color: T.text, margin: 0 }}>Watchlist</h1>
        <p style={{ fontSize: 12, color: T.textTer, marginTop: 6, fontFamily: Fn }}>Potential additions &middot; prices as of 20 Mar 2026 &middot; hover for allocation impact</p>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        <div style={{ position: "relative" }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke={T.textTer} strokeWidth="1.5" strokeLinecap="round" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}>
            <line x1="8" y1="2" x2="8" y2="14" /><line x1="2" y1="8" x2="14" y2="8" />
          </svg>
          <input type="text" value={nw} onChange={e => setNw(e.target.value)} onKeyDown={e => e.key === "Enter" && add()} placeholder="Add ticker..."
            onFocus={e => e.target.style.boxShadow = T.ring} onBlur={e => e.target.style.boxShadow = "none"}
            style={{ padding: "10px 16px 10px 32px", border: "1px solid " + T.border, borderRadius: T.radiusSm, fontSize: 13, fontFamily: Fn, color: T.text, background: T.card, width: 220, outline: "none", transition: "box-shadow 0.2s" }} />
        </div>
        <button onClick={add} style={{ padding: "10px 20px", background: T.capRed, color: "#fff", border: "none", borderRadius: T.radiusSm, fontSize: 11, fontFamily: Fn, cursor: "pointer", fontWeight: 600, transition: "all 0.15s" }}>Add</button>
      </div>

      {/* Impact preview bar */}
      <div style={{
        height: impact ? 56 : 0, overflow: "hidden", transition: "height 0.25s cubic-bezier(0.4,0,0.2,1)",
        marginBottom: impact ? 16 : 0,
      }}>
        {impact && (
          <div style={{ display: "flex", gap: 16, alignItems: "center", padding: "12px 16px", background: T.pillBg, borderRadius: T.radiusSm, fontFamily: Fn, fontSize: 11, animation: "fadeIn 0.2s ease" }}>
            <span style={{ fontWeight: 600, color: T.text }}>Impact preview:</span>
            <Pill T={T} color={T.green} bg={T.greenBg}>{impact.sector}</Pill>
            <Pill T={T} color={T.purple} bg={T.purple100}>{impact.region}</Pill>
            <span style={{ color: T.textTer, fontStyle: "italic" }}>{impact.note}</span>
          </div>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 12 }}>
        {items.map((it, i) => (
          <Card key={i} T={T} hover style={{ padding: "18px", position: "relative" }}>
            <div onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{ cursor: "default" }}>
              <button onClick={() => { setItems(items.filter((_, j) => j !== i)); if (hovered === i) setHovered(null) }} style={{ position: "absolute", top: 10, right: 12, background: T.pillBg, border: "none", color: T.textTer, width: 24, height: 24, borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, transition: "background 0.15s" }}>&times;</button>
              <div style={{ fontSize: 15, fontWeight: 700, color: T.text, fontFamily: Fn }}>{it.tk}</div>
              <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 2 }}>{it.nm}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 12 }}>
                <span style={{ fontSize: 20, fontWeight: 300, fontFamily: Fn, color: T.text, fontFeatureSettings: '"tnum"' }}>{it.pr}</span>
                <Pill T={T} color={it.chg >= 0 ? T.green : T.capRed} bg={it.chg >= 0 ? T.greenBg : T.redBg}>{it.chg >= 0 ? "+" : ""}{it.chg.toFixed(2)}%</Pill>
              </div>
              <div style={{ fontSize: 9, color: T.textTer, marginTop: 8, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: Fn }}>{it.sec}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
