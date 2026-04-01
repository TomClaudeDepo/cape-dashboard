import { useState } from "react";
import { Fs, Fn, Fh } from "../theme";
import { UR_PCT, ACWI_CONSTITUENTS, activeShare, benchmarkOverlapWt } from "../data/constants";
import { holdings, VD, VM, VW, FD, FM, FW, acwiHoldingWts, earCal } from "../data/portfolio";
import { fmtEur, fmtPct, fmtX, fmtPv, fmtBn } from "../utils";
import { Card, Label, Pill, Stat, TabBar, SortTable } from "../components/shared";

export default function HoldingsPg({ T, onHoldingClick }) {
  const [sc, setSc] = useState("wt");
  const [sa, setSa] = useState(false);
  const [tab, setTab] = useState("positions");
  const [hov, setHov] = useState(-1);
  const [search, setSearch] = useState("");

  const filtered = search
    ? holdings.filter(h => h.name.toLowerCase().includes(search.toLowerCase()) || h.t.toLowerCase().includes(search.toLowerCase()) || h.gics.toLowerCase().includes(search.toLowerCase()))
    : holdings;
  const sorted = [...filtered].sort((a, b) => sa ? a[sc] - b[sc] : b[sc] - a[sc]);
  const hs = c => { if (sc === c) setSa(!sa); else { setSc(c); setSa(false) } };

  const tabs = [{ k: "positions", l: "Positions" }, { k: "valuation", l: "Valuation" }, { k: "fundamentals", l: "Fundamentals" }];

  const vRows = holdings.map(h => ({ name: h.name, wt: h.wt, ...(VD[h.name] || {}) }));
  const vCols = [{ key: "name", label: "Name", align: "left", fmt: v => v, sort: false }, { key: "wt", label: "Wt%", fmt: v => v?.toFixed(2) + "%", defaultSort: true }, { key: "mc", label: "Mkt Cap", fmt: fmtBn }, { key: "fs", label: "Fwd 2Y Sales", fmt: fmtPv, color: "growth" }, { key: "fe", label: "Fwd 2Y EPS", fmt: fmtPv, color: "growth" }, { key: "en", label: "EV/EBITDA NTM", fmt: fmtX }, { key: "e1", label: "EV/EBITDA FY1", fmt: fmtX }, { key: "e2", label: "EV/EBITDA FY2", fmt: fmtX }, { key: "pn", label: "P/E NTM", fmt: fmtX }, { key: "p1", label: "P/E FY1", fmt: fmtX }, { key: "p2", label: "P/E FY2", fmt: fmtX }, { key: "bn", label: "P/B", fmt: fmtX }, { key: "sn", label: "P/S", fmt: fmtX }];
  const vSum = [{ _label: "Median", ...VM }, { _label: "Wtd Avg", ...VW }];

  const fRows = holdings.map(h => ({ name: h.name, wt: h.wt, ...(FD[h.name] || {}) }));
  const fCols = [{ key: "name", label: "Name", align: "left", fmt: v => v, sort: false }, { key: "wt", label: "Wt%", fmt: v => v?.toFixed(2) + "%", defaultSort: true }, { key: "ev", label: "EV (Bn)", fmt: v => v == null ? "\u2014" : "\u20AC" + v.toFixed(1) }, { key: "s3", label: "3Y Sales", fmt: fmtPv, color: "growth" }, { key: "e3", label: "3Y EPS", fmt: fmtPv, color: "growth" }, { key: "em", label: "EBITDA Mgn", fmt: fmtPv, color: "margin" }, { key: "nm", label: "Net Mgn", fmt: fmtPv, color: "margin" }, { key: "nd", label: "ND/EBITDA", fmt: v => v == null ? "\u2014" : v.toFixed(1) + "x", color: "leverage" }, { key: "fc", label: "FCF Mgn", fmt: fmtPv, color: "margin" }, { key: "dy", label: "Div Yld", fmt: fmtPv }, { key: "roe", label: "ROE", fmt: fmtPv, color: "margin" }, { key: "roc", label: "ROCE", fmt: fmtPv, color: "margin" }, { key: "roi", label: "ROIC", fmt: fmtPv, color: "margin" }];
  const fSum = [{ _label: "Median", ...FM }, { _label: "Wtd Avg", ...FW }];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 12, color: T.textTer, marginTop: 6, fontFamily: Fn }}>26 positions &middot; as of 31 Mar 2026 &middot; EUR</p>
      </div>

      <Card T={T} style={{ marginBottom: 20 }}>
        <Label T={T}>Upcoming events</Label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
          {earCal.map((e, i) => (
            <div key={i} style={{ padding: "12px 14px", background: T.bg, borderRadius: 8, borderLeft: "3px solid " + (e.ty === "E" ? T.purple : T.green300) }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: T.text, fontFamily: Fn }}>{e.n}</span>
                <Pill T={T}>{e.ty === "E" ? "Earnings" : "Ex-div"}</Pill>
              </div>
              <div style={{ fontSize: 10, color: T.textTer, marginTop: 4, fontFamily: Fn }}>{e.d} &middot; {e.dt}</div>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ marginBottom: 6, display: "flex", alignItems: "baseline", gap: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn }}>CEF Portfolio Averages</span>
        <span style={{ fontSize: 10, color: T.textTer, fontFamily: Fn }}>Weighted avg across 26 holdings &middot; median in subtitle</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 10 }}>
        <Stat T={T} label="CEF P/E NTM" value={VW.pn.toFixed(1) + "x"} sub={"Median " + VM.pn.toFixed(1) + "x"} delay={0} />
        <Stat T={T} label="CEF EV/EBITDA" value={VW.en.toFixed(1) + "x"} sub={"Median " + VM.en.toFixed(1) + "x"} delay={0.06} />
        <Stat T={T} label="CEF EBITDA Margin" value={FW.em.toFixed(1) + "%"} sub={"Median " + FM.em.toFixed(1) + "%"} delay={0.12} />
        <Stat T={T} label="CEF FCF Margin" value={FW.fc.toFixed(1) + "%"} sub={"Median " + FM.fc.toFixed(1) + "%"} delay={0.18} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 20 }}>
        <Stat T={T} label="Active share" value={activeShare.toFixed(0) + "%"} sub={ACWI_CONSTITUENTS + " names in ACWI"} />
        <Stat T={T} label="Benchmark overlap" value={benchmarkOverlapWt.toFixed(0) + "%"} sub="ACWI wt held in fund" />
        <Stat T={T} label="CEF Positions" value="26" sub={"vs " + ACWI_CONSTITUENTS + " in ACWI"} />
        <Stat T={T} label="CEF ROE" value={FW.roe.toFixed(1) + "%"} sub={"Median " + FM.roe.toFixed(1) + "%"} />
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <TabBar tabs={tabs} active={tab} onChange={setTab} T={T} />
          {tab === "positions" && (
            <div style={{ position: "relative" }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke={T.textTer} strokeWidth="1.5" strokeLinecap="round" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}>
                <circle cx="7" cy="7" r="4.5"/><line x1="10.5" y1="10.5" x2="14" y2="14"/>
              </svg>
              <input
                type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search name, ticker, sector..."
                onFocus={e => e.target.style.boxShadow = T.ring}
                onBlur={e => e.target.style.boxShadow = "none"}
                style={{ padding: "7px 14px 7px 30px", border: "1px solid " + T.border, borderRadius: T.radiusSm, fontSize: 11, fontFamily: Fn, color: T.text, background: T.bg, outline: "none", width: 220, transition: "box-shadow 0.2s" }}
              />
            </div>
          )}
        </div>
        <span style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, fontStyle: "italic" }}>Consensus estimates &middot; Bn EUR</span>
      </div>

      <Card T={T} style={{ padding: "16px 20px", overflow: "hidden" }}>
        {tab === "positions" && (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: Fn }}>
              <thead>
                <tr style={{ borderBottom: "2px solid " + T.border }}>
                  {[{ l: "Name", c: "n", a: "left", s: 0 }, { l: "Ticker", c: "t", a: "left", s: 0 }, { l: "Sector", c: "g", a: "left", s: 0 }, { l: "Weight", c: "wt", a: "right", s: 1 }, { l: "ACWI", c: "aw", a: "right", s: 0 }, { l: "Active", c: "ac", a: "right", s: 0 }, { l: "P&L %", c: "up", a: "right", s: 1 }, { l: "P&L EUR", c: "ugl", a: "right", s: 1 }].map(col => (
                    <th key={col.l} onClick={col.s ? () => hs(col.c) : undefined} style={{ textAlign: col.a, padding: "10px 8px", fontSize: 9, color: T.textTer, fontWeight: 600, letterSpacing: "0.08em", cursor: col.s ? "pointer" : "default", textTransform: "uppercase" }}>
                      {col.l}{col.s && sc === col.c ? <span style={{ marginLeft: 3, fontSize: 7 }}>{sa ? "\u25B2" : "\u25BC"}</span> : null}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sorted.map((h, i) => (
                  <tr key={i} onClick={() => onHoldingClick?.(h)} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(-1)} style={{ borderBottom: "1px solid " + T.border, background: hov === i ? T.rowHover : "transparent", transition: "background 0.1s", cursor: "pointer" }}>
                    <td style={{ padding: "10px 8px", fontWeight: 600, color: T.text }}>{h.name}</td>
                    <td style={{ padding: "10px 8px", color: T.textTer, fontSize: 11 }}>{h.t}</td>
                    <td style={{ padding: "10px 8px" }}><Pill T={T}>{h.gics}</Pill></td>
                    <td style={{ padding: "10px 8px", textAlign: "right", fontWeight: 600, color: T.text }}>{h.wt.toFixed(2)}%</td>
                    <td style={{ padding: "10px 8px", textAlign: "right", color: T.textTer, fontSize: 11 }}>{(acwiHoldingWts[h.name] || 0).toFixed(2)}%</td>
                    <td style={{ padding: "10px 8px", textAlign: "right" }}><Pill T={T} color={T.green} bg={T.greenBg}>+{(h.wt - (acwiHoldingWts[h.name] || 0)).toFixed(1)}%</Pill></td>
                    <td style={{ padding: "10px 8px", textAlign: "right" }}><Pill T={T} color={h.up >= 0 ? T.green : T.capRed} bg={h.up >= 0 ? T.greenBg : T.redBg}>{fmtPct(h.up)}</Pill></td>
                    <td style={{ padding: "10px 8px", textAlign: "right", color: h.ugl >= 0 ? T.green : T.capRed, fontWeight: 500 }}>&euro;{fmtEur(h.ugl)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ borderTop: "2px solid " + T.border }}>
                  <td colSpan={4} style={{ padding: "10px 8px", fontWeight: 700, color: T.text }}>Total securities{search && ` (${sorted.length} shown)`}</td>
                  <td style={{ padding: "10px 8px", textAlign: "right", color: T.textTer, fontSize: 11 }}>{Object.values(acwiHoldingWts).reduce((a, b) => a + b, 0).toFixed(1)}%</td>
                  <td></td>
                  <td style={{ padding: "10px 8px", textAlign: "right" }}><Pill T={T} color={T.green} bg={T.greenBg}>{fmtPct(UR_PCT)}</Pill></td>
                  <td style={{ padding: "10px 8px", textAlign: "right", fontWeight: 700, color: T.green }}>&euro;{fmtEur(47364239.81)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
        {tab === "valuation" && <SortTable cols={vCols} rows={vRows} summaryRows={vSum} T={T} />}
        {tab === "fundamentals" && <SortTable cols={fCols} rows={fRows} summaryRows={fSum} T={T} />}
      </Card>
    </div>
  );
}
