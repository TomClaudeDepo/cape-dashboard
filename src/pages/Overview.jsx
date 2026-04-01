import { Fn, Fs, Fh } from "../theme";
import { NAV, MV, CASH, CASH_PCT } from "../data/constants";
import { holdings, navData, portfolioGics, acwiGics, VW, FW } from "../data/portfolio";
import { fmtEur, fmtPct } from "../utils";
import { Card, Label, Pill, Stat } from "../components/shared";
import PerfChart from "../components/PerfChart";
import { useMobile } from "../hooks/useMobile";

/* ── Compact sector bars for Overview ── */
function SectorBars({ portfolio, benchmark, T }) {
  const all = [...new Set([...portfolio.map(p => p.name), ...benchmark.map(b => b.name)])];
  const sectors = all.map(name => {
    const p = portfolio.find(x => x.name === name);
    const b = benchmark.find(x => x.name === name);
    return { name, pW: p ? p.wt : 0, bW: b ? b.wt : 0 };
  }).sort((a, b) => b.pW - a.pW);
  const mx = Math.max(...sectors.map(s => Math.max(s.pW, s.bW))) * 1.15;

  return (
    <div>
      <div style={{ display: "flex", gap: 14, fontSize: 10, color: T.textTer, fontFamily: Fn, marginBottom: 14 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 8, height: 8, borderRadius: 4, background: T.green }} />Fund
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 8, height: 8, borderRadius: 4, background: T.grey300 }} />ACWI
        </span>
      </div>
      {sectors.map((s, i) => {
        const diff = s.pW - s.bW;
        return (
          <div key={i} style={{ marginBottom: 5 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 90, fontSize: 10, color: T.textSec, textAlign: "right", flexShrink: 0, fontFamily: Fn, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.name}</div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ height: 13, borderRadius: 5, background: `linear-gradient(90deg, ${T.green}, ${T.green}cc)`, width: (s.pW / mx) * 100 + "%", minWidth: s.pW > 0 ? 2 : 0, transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)" }} />
                  <span style={{ fontSize: 9, color: T.textSec, fontFamily: Fn, fontWeight: 600, fontFeatureSettings: '"tnum"', minWidth: 28 }}>{s.pW.toFixed(1)}%</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ height: 13, borderRadius: 5, background: T.grey200, width: (s.bW / mx) * 100 + "%", minWidth: s.bW > 0 ? 2 : 0, transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)" }} />
                  <span style={{ fontSize: 9, color: T.textTer, fontFamily: Fn, fontFeatureSettings: '"tnum"', minWidth: 28 }}>{s.bW.toFixed(1)}%</span>
                  <span style={{ fontSize: 8, fontFamily: Fn, fontWeight: 600, color: diff > 0 ? T.green : diff < 0 ? T.capRed : T.textTer, fontFeatureSettings: '"tnum"' }}>
                    {diff > 0 ? "+" : ""}{diff.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Fundamentals metric cell ── */
function MetricCell({ label, value, unit, T, color }) {
  return (
    <div style={{
      background: T.pillBg, borderRadius: T.radiusSm, padding: "12px 14px",
      display: "flex", flexDirection: "column", gap: 4, minWidth: 0,
    }}>
      <div style={{ fontSize: 8.5, color: T.textTer, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: Fn, fontWeight: 600, whiteSpace: "nowrap" }}>{label}</div>
      <div style={{ fontSize: 17, fontWeight: 400, color: color || T.text, fontFamily: Fn, fontFeatureSettings: '"tnum"', letterSpacing: "-0.01em" }}>
        {value}{unit && <span style={{ fontSize: 11, color: T.textTer, marginLeft: 2 }}>{unit}</span>}
      </div>
    </div>
  );
}


export default function OverviewPg({ T, onHoldingClick }) {
  const mob = useMobile();
  const investedPct = ((MV / NAV) * 100).toFixed(1);

  return (
    <div>
      {/* ── Header ── */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: Fh, fontSize: 28, fontWeight: 400, fontStyle: "italic", letterSpacing: "-0.02em", color: T.text, margin: 0 }}>Portfolio Summary</h1>
        <p style={{ fontSize: 12, color: T.textTer, marginTop: 6, fontFamily: Fn }}>Cape Equity Fund &middot; LU1200255203 &middot; 26 positions &middot; 30 Mar 2026 &middot; EUR</p>
      </div>

      {/* ── Top stats: AUM, Invested, Cash ── */}
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
        <Stat T={T} label="Net asset value" value={"\u20AC" + fmtEur(NAV)} sub="Fund currency EUR" delay={0} />
        <Stat T={T} label="Invested" value={investedPct + "%"} delta={"\u20AC" + fmtEur(MV)} sub="Securities / NAV" delay={0.06} />
        <Stat T={T} label="Cash" value={CASH_PCT.toFixed(1) + "%"} delta={"\u20AC" + fmtEur(CASH)} sub="of NAV" delay={0.12} />
      </div>

      {/* ── Portfolio Fundamentals ── */}
      <Card T={T} style={{ marginBottom: 24, padding: mob ? "16px 12px" : "20px 24px" }}>
        <Label T={T}>Portfolio fundamentals <span style={{ fontWeight: 400, color: T.textTer, fontSize: 10, marginLeft: 6 }}>weighted average</span></Label>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 10, marginTop: 14 }}>
          <MetricCell T={T} label="Fwd Revenue Growth" value={VW.fs != null ? VW.fs.toFixed(1) : "\u2014"} unit="%" />
          <MetricCell T={T} label="Fwd Earnings Growth" value={VW.fe != null ? VW.fe.toFixed(1) : "\u2014"} unit="%" />
          <MetricCell T={T} label="Fwd P / E (NTM)" value={VW.pn != null ? VW.pn.toFixed(1) : "\u2014"} unit="x" />
          <MetricCell T={T} label="Fwd EV / EBITDA (NTM)" value={VW.en != null ? VW.en.toFixed(1) : "\u2014"} unit="x" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 10, marginTop: 10 }}>
          <MetricCell T={T} label="Net Debt / EBITDA" value={FW.nd != null ? FW.nd.toFixed(1) : "\u2014"} unit="x" />
          <MetricCell T={T} label="Dividend Yield" value={FW.dy != null ? FW.dy.toFixed(1) : "\u2014"} unit="%" />
          <MetricCell T={T} label="ROE" value={FW.roe != null ? FW.roe.toFixed(1) : "\u2014"} unit="%" color={FW.roe > 15 ? T.green : T.text} />
          <MetricCell T={T} label="FCF Margin" value={FW.fc != null ? FW.fc.toFixed(1) : "\u2014"} unit="%" />
        </div>
      </Card>

      {/* ── Performance (left) + Sector allocation (right) ── */}
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 24, alignItems: "start" }}>
        <PerfChart data={navData} T={T} green />
        <Card T={T} style={{ padding: mob ? "16px 12px 14px" : "24px 24px 20px" }}>
          <div style={{ fontSize: 11, color: T.textTer, textTransform: "uppercase", letterSpacing: "0.12em", fontFamily: Fn, fontWeight: 600, marginBottom: 14 }}>GICS Sector Allocation</div>
          <SectorBars portfolio={portfolioGics} benchmark={acwiGics} T={T} />
          <div style={{ fontSize: 9, color: T.textTer, marginTop: 12, fontFamily: Fn, opacity: 0.6 }}>
            vs MSCI ACWI (2,263 constituents) &middot; 30 Mar 2026
          </div>
        </Card>
      </div>

      {/* ── Top gainers & losers ── */}
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(2, 1fr)", gap: 12 }}>
        <Card T={T}>
          <Label T={T}>Top gainers</Label>
          <div style={{ fontSize: 9, color: T.textTer, fontFamily: Fn, marginTop: -6, marginBottom: 10 }}>Unrealised return since position inception</div>
          {[...holdings].sort((a, b) => b.up - a.up).slice(0, 5).map((h, i) => (
            <div key={i} onClick={() => onHoldingClick?.(h)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: T.radiusSm, fontSize: 12, fontFamily: Fn, transition: "background 0.15s", cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.background = T.rowHover} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <span style={{ color: T.textSec, flex: 1 }}>{h.name} <span style={{ color: T.textTer, fontSize: 10 }}>{h.wt.toFixed(1)}%</span></span>
              <Pill T={T} color={T.green} bg={T.greenBg}>{fmtPct(h.up)}</Pill>
            </div>
          ))}
        </Card>
        <Card T={T}>
          <Label T={T}>Top losers</Label>
          <div style={{ fontSize: 9, color: T.textTer, fontFamily: Fn, marginTop: -6, marginBottom: 10 }}>Unrealised return since position inception</div>
          {[...holdings].sort((a, b) => a.up - b.up).slice(0, 5).map((h, i) => (
            <div key={i} onClick={() => onHoldingClick?.(h)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: T.radiusSm, fontSize: 12, fontFamily: Fn, transition: "background 0.15s", cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.background = T.rowHover} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <span style={{ color: T.textSec, flex: 1 }}>{h.name} <span style={{ color: T.textTer, fontSize: 10 }}>{h.wt.toFixed(1)}%</span></span>
              <Pill T={T} color={T.capRed} bg={T.redBg}>{fmtPct(h.up)}</Pill>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
