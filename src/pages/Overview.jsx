import { Fn, Fs } from "../theme";
import { NAV, MV, UR, URP, URF, CASH, UR_PCT, URP_PCT, URF_PCT, CASH_PCT } from "../data/constants";
import { holdings, navData } from "../data/portfolio";
import { fmtEur, fmtPct } from "../utils";
import { Card, Label, Pill, Stat } from "../components/shared";
import PerfChart from "../components/PerfChart";

function MiniSpark({ up, color }) {
  const pts = [];
  let v = 0;
  for (let i = 0; i < 20; i++) { v += (up / 20) + (Math.sin(i * 0.7) * 0.8) + (Math.random() - 0.5) * 0.6; pts.push(v) }
  const mn = Math.min(...pts), mx = Math.max(...pts), r = mx - mn || 1;
  const d = pts.map((p, i) => (i === 0 ? "M" : "L") + (i / 19 * 40) + "," + (18 - (p - mn) / r * 16)).join(" ");
  return <svg width="40" height="18" viewBox="0 0 40 18" style={{ flexShrink: 0 }}><path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" /></svg>;
}

export default function OverviewPg({ T, onHoldingClick }) {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: Fs, fontSize: 28, fontWeight: 300, letterSpacing: "-0.03em", color: T.text, margin: 0 }}>Portfolio summary</h1>
        <p style={{ fontSize: 12, color: T.textTer, marginTop: 6, fontFamily: Fn }}>Cape Equity Fund &middot; LU1200255203 &middot; 26 positions &middot; 19 Mar 2026 &middot; EUR</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 24 }}>
        <Stat T={T} label="Net asset value" value={"\u20AC" + fmtEur(NAV)} sub="Fund currency EUR" delay={0} />
        <Stat T={T} label="Invested" value="98.0%" delta={"\u20AC" + fmtEur(MV)} sub="Securities / NAV" delay={0.06} />
        <Stat T={T} label="Unrealised P&L" value={fmtPct(UR_PCT)} delta={"\u20AC" + fmtEur(UR)} sub={"Price " + fmtPct(URP_PCT) + " \xb7 FX " + fmtPct(URF_PCT)} delay={0.12} />
        <Stat T={T} label="Cash" value={CASH_PCT.toFixed(1) + "%"} delta={"\u20AC" + fmtEur(CASH)} sub="of NAV" delay={0.18} />
      </div>

      <PerfChart data={navData} T={T} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 12 }}>
        <Card T={T}>
          <Label T={T}>Top gainers &mdash; unrealised</Label>
          {[...holdings].sort((a, b) => b.up - a.up).slice(0, 5).map((h, i) => (
            <div key={i} onClick={() => onHoldingClick?.(h)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: T.radiusSm, fontSize: 12, fontFamily: Fn, transition: "background 0.15s", cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.background = T.rowHover} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <span style={{ color: T.textSec, flex: 1 }}>{h.name} <span style={{ color: T.textTer, fontSize: 10 }}>{h.wt.toFixed(1)}%</span></span>
              <MiniSpark up={h.up} color={T.green} />
              <Pill T={T} color={T.green} bg={T.greenBg}>{fmtPct(h.up)}</Pill>
            </div>
          ))}
        </Card>
        <Card T={T}>
          <Label T={T}>Top losers &mdash; unrealised</Label>
          {[...holdings].sort((a, b) => a.up - b.up).slice(0, 5).map((h, i) => (
            <div key={i} onClick={() => onHoldingClick?.(h)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: T.radiusSm, fontSize: 12, fontFamily: Fn, transition: "background 0.15s", cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.background = T.rowHover} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <span style={{ color: T.textSec, flex: 1 }}>{h.name} <span style={{ color: T.textTer, fontSize: 10 }}>{h.wt.toFixed(1)}%</span></span>
              <MiniSpark up={h.up} color={T.capRed} />
              <Pill T={T} color={T.capRed} bg={T.redBg}>{fmtPct(h.up)}</Pill>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
