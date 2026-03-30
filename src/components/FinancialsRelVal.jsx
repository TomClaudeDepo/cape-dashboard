import { useState, useMemo } from "react";
import { Fn } from "../theme";
import { useMobile } from "../hooks/useMobile";
import {
  bloombergPeerOverview, bloombergProfitability, bloombergBalanceSheet,
  consensusGrowth, consensusMultiples, peerValuationMultiples,
} from "../data/research-cni";

/* ─── Shared helpers ─── */
const fmt = (v, dp = 2, suffix = "") => v == null ? "—" : `${v.toFixed(dp)}${suffix}`;
const fmtPct = (v) => v == null ? "—" : `${v >= 0 ? "+" : ""}${v.toFixed(2)}%`;
const clr = (v, T) => v == null ? T.textTer : v > 0 ? T.green : v < 0 ? T.capRed : T.textSec;

const PEER_COLORS = {
  CN: "#0066CC",
  "Union Pacific": "#FFB800",
  CSX: "#E63946",
  CPKC: "#06D6A0",
  "Norfolk Southern": "#9B5DE5",
};

/* ─── Responsive table wrapper ─── */
function ScrollTable({ children }) {
  return (
    <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", marginBottom: 24, borderRadius: 10 }}>
      {children}
    </div>
  );
}

/* ─── Cell highlight for CN ─── */
function isCN(peer) { return peer === "CN" || peer === "CNR CN"; }

/* ════════════════════════════════════════════════ */
/* SUB-COMPONENT: Peer Comparison Tables            */
/* ════════════════════════════════════════════════ */
function PeerTables({ T }) {
  const mob = useMobile();
  const [tab, setTab] = useState("overview");
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "profitability", label: "Profitability" },
    { id: "balance", label: "Balance Sheet" },
  ];

  const cellStyle = (highlight = false) => ({
    padding: mob ? "10px 8px" : "10px 14px",
    fontFamily: Fn, fontSize: mob ? 11 : 12.5,
    textAlign: "right", whiteSpace: "nowrap",
    borderBottom: "1px solid " + T.border,
    background: highlight ? (T.text === "#0F172A" ? "rgba(0,102,204,0.04)" : "rgba(0,102,204,0.08)") : "transparent",
  });

  const headerStyle = {
    padding: mob ? "10px 8px" : "10px 14px",
    fontFamily: Fn, fontSize: mob ? 10 : 11,
    textAlign: "right", fontWeight: 600,
    color: T.textTer, letterSpacing: "0.03em",
    borderBottom: "2px solid " + T.border,
    whiteSpace: "nowrap", position: "sticky", top: 0,
    background: T.card,
  };

  const nameCell = (peer, highlight) => ({
    ...cellStyle(highlight),
    textAlign: "left", fontWeight: highlight ? 600 : 400,
    color: highlight ? "#0066CC" : T.text,
    position: "sticky", left: 0, zIndex: 1,
    background: highlight ? (T.text === "#0F172A" ? "rgba(0,102,204,0.04)" : "rgba(0,102,204,0.08)") : T.card,
    minWidth: mob ? 90 : 130,
  });

  return (
    <div>
      {/* Tab bar */}
      <div style={{ display: "flex", gap: 4, marginBottom: 16, borderBottom: "1px solid " + T.border, paddingBottom: 0 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            fontFamily: Fn, fontSize: 12, fontWeight: tab === t.id ? 600 : 400,
            color: tab === t.id ? T.text : T.textTer,
            background: "none", border: "none", cursor: "pointer",
            padding: "8px 16px", borderBottom: tab === t.id ? "2px solid " + T.text : "2px solid transparent",
            marginBottom: -1, transition: "all 0.2s",
          }}>{t.label}</button>
        ))}
      </div>

      {/* Overview table */}
      {tab === "overview" && (
        <ScrollTable>
          <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 700, background: T.card, borderRadius: 10 }}>
            <thead>
              <tr>
                <th style={{ ...headerStyle, textAlign: "left", position: "sticky", left: 0, background: T.card }}>Name</th>
                <th style={headerStyle}>Mkt Cap</th>
                <th style={headerStyle}>Last Px</th>
                <th style={headerStyle}>1D Chg</th>
                <th style={headerStyle}>1M Chg</th>
                <th style={headerStyle}>Rev 1Y Gr</th>
                <th style={headerStyle}>EPS 1Y Gr</th>
                <th style={headerStyle}>P/E</th>
                <th style={headerStyle}>ROE</th>
                <th style={headerStyle}>Div Yield</th>
              </tr>
            </thead>
            <tbody>
              {bloombergPeerOverview.map((r, i) => {
                const hl = isCN(r.peer);
                return (
                  <tr key={i}>
                    <td style={nameCell(r.peer, hl)}>{r.peer}</td>
                    <td style={cellStyle(hl)}>{r.mktCap}</td>
                    <td style={cellStyle(hl)}>{r.lastPx.toFixed(2)}</td>
                    <td style={{ ...cellStyle(hl), color: clr(r.chg1D, T) }}>{fmtPct(r.chg1D)}</td>
                    <td style={{ ...cellStyle(hl), color: clr(r.chg1M, T) }}>{fmtPct(r.chg1M)}</td>
                    <td style={{ ...cellStyle(hl), color: clr(r.revGr1Y, T) }}>{fmtPct(r.revGr1Y)}</td>
                    <td style={{ ...cellStyle(hl), color: clr(r.epsGr1Y, T) }}>{fmtPct(r.epsGr1Y)}</td>
                    <td style={{ ...cellStyle(hl), fontWeight: 600 }}>{r.pe.toFixed(2)}x</td>
                    <td style={cellStyle(hl)}>{r.roe.toFixed(2)}%</td>
                    <td style={cellStyle(hl)}>{r.divYield.toFixed(2)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </ScrollTable>
      )}

      {/* Profitability table */}
      {tab === "profitability" && (
        <ScrollTable>
          <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 800, background: T.card, borderRadius: 10 }}>
            <thead>
              <tr>
                <th style={{ ...headerStyle, textAlign: "left", position: "sticky", left: 0, background: T.card }}>Name</th>
                <th style={headerStyle}>Sales Gr</th>
                <th style={headerStyle}>EBITDA Gr</th>
                <th style={headerStyle}>EBITDA Mgn</th>
                <th style={headerStyle}>Op Mgn</th>
                <th style={headerStyle}>NI Gr</th>
                <th style={headerStyle}>Net Mgn</th>
                <th style={headerStyle}>Capex/S</th>
                <th style={headerStyle}>ROIC</th>
                <th style={headerStyle}>ROA</th>
                <th style={headerStyle}>ROE</th>
              </tr>
            </thead>
            <tbody>
              {bloombergProfitability.map((r, i) => {
                const hl = isCN(r.peer);
                return (
                  <tr key={i}>
                    <td style={nameCell(r.peer, hl)}>{r.peer}</td>
                    <td style={{ ...cellStyle(hl), color: clr(r.salesGr, T) }}>{fmtPct(r.salesGr)}</td>
                    <td style={{ ...cellStyle(hl), color: clr(r.ebitdaGr, T) }}>{fmtPct(r.ebitdaGr)}</td>
                    <td style={cellStyle(hl)}>{fmt(r.ebitdaMgn)}%</td>
                    <td style={cellStyle(hl)}>{fmt(r.opMgn)}%</td>
                    <td style={{ ...cellStyle(hl), color: clr(r.niGr, T) }}>{fmtPct(r.niGr)}</td>
                    <td style={cellStyle(hl)}>{fmt(r.netMgn)}%</td>
                    <td style={cellStyle(hl)}>{fmt(r.capexS)}%</td>
                    <td style={cellStyle(hl)}>{fmt(r.roic)}%</td>
                    <td style={cellStyle(hl)}>{fmt(r.roa)}%</td>
                    <td style={{ ...cellStyle(hl), fontWeight: 600 }}>{fmt(r.roe)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </ScrollTable>
      )}

      {/* Balance Sheet table */}
      {tab === "balance" && (
        <ScrollTable>
          <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 600, background: T.card, borderRadius: 10 }}>
            <thead>
              <tr>
                <th style={{ ...headerStyle, textAlign: "left", position: "sticky", left: 0, background: T.card }}>Name</th>
                <th style={headerStyle}>Net Debt / EBITDA</th>
                <th style={headerStyle}>Total Debt / EBITDA</th>
                <th style={headerStyle}>Net Debt / Equity (%)</th>
                <th style={headerStyle}>Debt / Assets (%)</th>
                <th style={headerStyle}>EBITDA / Interest</th>
              </tr>
            </thead>
            <tbody>
              {bloombergBalanceSheet.map((r, i) => {
                const hl = isCN(r.peer);
                return (
                  <tr key={i}>
                    <td style={nameCell(r.peer, hl)}>{r.peer}</td>
                    <td style={cellStyle(hl)}>{fmt(r.netDebtEbitda)}x</td>
                    <td style={cellStyle(hl)}>{fmt(r.totalDebtEbitda)}x</td>
                    <td style={cellStyle(hl)}>{fmt(r.netDebtEquity)}%</td>
                    <td style={cellStyle(hl)}>{fmt(r.totalDebtAssets)}%</td>
                    <td style={cellStyle(hl)}>{r.ebitdaInterest ? `${fmt(r.ebitdaInterest)}x` : "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </ScrollTable>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════ */
/* SUB-COMPONENT: Consensus Estimates               */
/* ════════════════════════════════════════════════ */
function ConsensusSection({ T }) {
  const mob = useMobile();
  const [showMultiples, setShowMultiples] = useState(false);
  const data = showMultiples ? consensusMultiples : consensusGrowth;
  const cols = showMultiples
    ? [
        { key: "metric", label: "Metric", align: "left" },
        { key: "ltm", label: "LTM Actual" },
        { key: "ntm", label: "NTM Est" },
        { key: "fy2026", label: "FY 2026" },
        { key: "fy2027", label: "FY 2027" },
        { key: "fy2028", label: "FY 2028" },
      ]
    : [
        { key: "metric", label: "Metric (YoY Growth)", align: "left" },
        { key: "fy2025", label: "FY 2025 Act" },
        { key: "fy2026", label: "FY 2026E" },
        { key: "fy2027", label: "FY 2027E" },
        { key: "fy2028", label: "FY 2028E" },
        { key: "fy2029", label: "FY 2029E" },
      ];

  const headerStyle = {
    padding: mob ? "10px 8px" : "10px 14px",
    fontFamily: Fn, fontSize: mob ? 10 : 11,
    textAlign: "right", fontWeight: 600,
    color: T.textTer, letterSpacing: "0.03em",
    borderBottom: "2px solid " + T.border,
    whiteSpace: "nowrap",
  };
  const cellStyle = {
    padding: mob ? "8px 8px" : "8px 14px",
    fontFamily: Fn, fontSize: mob ? 11 : 12.5,
    textAlign: "right",
    borderBottom: "1px solid " + T.border,
  };

  const isHighlight = (metric) => ["EPS, Adj+", "Revenue", "EBITDA", "Free Cash Flow", "Price/EPS, Adj+", "EV/EBITDA", "Dividend Yield"].includes(metric);

  return (
    <div>
      {/* Toggle */}
      <div style={{ display: "flex", gap: 4, marginBottom: 16, borderBottom: "1px solid " + T.border }}>
        {[
          { id: false, label: "Growth Estimates (YoY)" },
          { id: true, label: "Valuation Multiples" },
        ].map(t => (
          <button key={String(t.id)} onClick={() => setShowMultiples(t.id)} style={{
            fontFamily: Fn, fontSize: 12, fontWeight: showMultiples === t.id ? 600 : 400,
            color: showMultiples === t.id ? T.text : T.textTer,
            background: "none", border: "none", cursor: "pointer",
            padding: "8px 16px", borderBottom: showMultiples === t.id ? "2px solid " + T.text : "2px solid transparent",
            marginBottom: -1, transition: "all 0.2s",
          }}>{t.label}</button>
        ))}
      </div>

      <ScrollTable>
        <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 500, background: T.card, borderRadius: 10 }}>
          <thead>
            <tr>
              {cols.map(c => (
                <th key={c.key} style={{ ...headerStyle, textAlign: c.align || "right" }}>{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => {
              const hl = isHighlight(row.metric);
              return (
                <tr key={i} style={{ background: hl ? (T.text === "#0F172A" ? "rgba(0,102,204,0.03)" : "rgba(0,102,204,0.06)") : "transparent" }}>
                  {cols.map(c => {
                    const v = row[c.key];
                    const isMetric = c.key === "metric";
                    const isGrowth = !showMultiples && !isMetric;
                    return (
                      <td key={c.key} style={{
                        ...cellStyle,
                        textAlign: isMetric ? "left" : "right",
                        fontWeight: isMetric ? (hl ? 600 : 500) : 400,
                        color: isMetric ? T.text : (isGrowth ? clr(v, T) : T.text),
                      }}>
                        {isMetric ? v : (v == null ? "—" : (isGrowth ? fmtPct(v) : fmt(v)))}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </ScrollTable>
    </div>
  );
}

/* ════════════════════════════════════════════════ */
/* SUB-COMPONENT: Interactive Valuation Comparison  */
/* ════════════════════════════════════════════════ */
function ValuationCompare({ T }) {
  const mob = useMobile();
  const metrics = Object.keys(peerValuationMultiples);
  const peers = ["CN", "Union Pacific", "CSX", "CPKC", "Norfolk Southern"];
  const peerKeys = ["cn", "unp", "csx", "cpkc", "nsc"];

  const [selectedMetrics, setSelectedMetrics] = useState(["P/E", "EV/EBITDA", "Div Yield (%)"]);
  const [selectedPeers, setSelectedPeers] = useState(["CN", "Union Pacific", "CPKC"]);

  const toggleMetric = (m) => {
    setSelectedMetrics(prev =>
      prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]
    );
  };
  const togglePeer = (p) => {
    setSelectedPeers(prev =>
      prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]
    );
  };

  /* Build chart data */
  const chartData = useMemo(() => {
    return selectedMetrics.map(metric => {
      const vals = peerValuationMultiples[metric];
      const bars = selectedPeers.map((peer, idx) => ({
        peer,
        value: vals[peerKeys[peers.indexOf(peer)]],
        color: PEER_COLORS[peer],
      }));
      return { metric, bars };
    });
  }, [selectedMetrics, selectedPeers]);

  /* Chart dimensions */
  const W = mob ? 340 : 680;
  const H = mob ? 260 : 300;
  const pad = { t: 30, r: 20, b: 50, l: 50 };
  const plotW = W - pad.l - pad.r;
  const plotH = H - pad.t - pad.b;

  const allVals = chartData.flatMap(g => g.bars.map(b => b.value));
  const maxVal = allVals.length ? Math.max(...allVals) * 1.15 : 1;

  const groupCount = chartData.length;
  const barCount = chartData[0]?.bars.length || 0;
  const groupW = groupCount > 0 ? plotW / groupCount : plotW;
  const barW = Math.min(mob ? 18 : 28, (groupW * 0.7) / Math.max(barCount, 1));
  const totalBarW = barW * barCount;

  const [hov, setHov] = useState(null);

  return (
    <div>
      {/* Controls */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: mob ? 16 : 32, marginBottom: 20 }}>
        {/* Metric selectors */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: T.textTer, fontFamily: Fn, marginBottom: 8, letterSpacing: "0.06em" }}>METRICS</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {metrics.map(m => {
              const on = selectedMetrics.includes(m);
              return (
                <button key={m} onClick={() => toggleMetric(m)} style={{
                  fontFamily: Fn, fontSize: 11, padding: "5px 12px",
                  border: `1px solid ${on ? "#0066CC" : T.border}`,
                  borderRadius: 20, cursor: "pointer",
                  background: on ? "rgba(0,102,204,0.1)" : "transparent",
                  color: on ? "#0066CC" : T.textSec,
                  fontWeight: on ? 600 : 400, transition: "all 0.15s",
                }}>{m}</button>
              );
            })}
          </div>
        </div>
        {/* Peer selectors */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: T.textTer, fontFamily: Fn, marginBottom: 8, letterSpacing: "0.06em" }}>PEERS</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {peers.map(p => {
              const on = selectedPeers.includes(p);
              const c = PEER_COLORS[p];
              return (
                <button key={p} onClick={() => togglePeer(p)} style={{
                  fontFamily: Fn, fontSize: 11, padding: "5px 12px",
                  border: `1px solid ${on ? c : T.border}`,
                  borderRadius: 20, cursor: "pointer",
                  background: on ? `${c}18` : "transparent",
                  color: on ? c : T.textSec,
                  fontWeight: on ? 600 : 400, transition: "all 0.15s",
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: on ? c : T.border, transition: "background 0.15s" }} />
                  {p}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Chart */}
      {chartData.length > 0 && barCount > 0 ? (
        <div style={{ background: T.card, borderRadius: 12, border: "1px solid " + T.border, padding: mob ? 12 : 20 }}>
          <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }} onMouseLeave={() => setHov(null)}>
            {/* Grid lines */}
            {[0.25, 0.5, 0.75, 1].map((f, i) => (
              <g key={i}>
                <line x1={pad.l} x2={W - pad.r} y1={pad.t + plotH * (1 - f)} y2={pad.t + plotH * (1 - f)}
                  stroke={T.border} strokeWidth="0.5" />
                <text x={pad.l - 6} y={pad.t + plotH * (1 - f) + 4}
                  textAnchor="end" fontSize="9" fill={T.textTer} fontFamily={Fn}>
                  {(maxVal * f).toFixed(1)}
                </text>
              </g>
            ))}
            <line x1={pad.l} x2={W - pad.r} y1={pad.t + plotH} y2={pad.t + plotH} stroke={T.border} strokeWidth="1" />

            {/* Bars */}
            {chartData.map((group, gi) => {
              const groupX = pad.l + groupW * gi + groupW / 2;
              return (
                <g key={gi}>
                  {/* Group label */}
                  <text x={groupX} y={H - (mob ? 6 : 10)} textAnchor="middle"
                    fontSize={mob ? 8 : 10} fill={T.textSec} fontFamily={Fn} fontWeight="500">
                    {group.metric}
                  </text>
                  {/* Bars */}
                  {group.bars.map((bar, bi) => {
                    const barX = groupX - totalBarW / 2 + barW * bi;
                    const barH = (bar.value / maxVal) * plotH;
                    const barY = pad.t + plotH - barH;
                    const isHov = hov && hov.gi === gi && hov.bi === bi;
                    return (
                      <g key={bi} onMouseEnter={() => setHov({ gi, bi })} style={{ cursor: "pointer" }}>
                        <rect x={barX} y={barY} width={barW - 2} height={barH}
                          rx={3} fill={bar.color} opacity={isHov ? 1 : 0.8}
                          style={{ transition: "opacity 0.15s, y 0.3s, height 0.3s" }} />
                        {isHov && (
                          <g>
                            <rect x={barX + (barW - 2) / 2 - 28} y={barY - 22} width={56} height={18}
                              rx={6} fill={T.text === "#0F172A" ? "rgba(15,23,42,0.92)" : "rgba(250,250,250,0.92)"} />
                            <text x={barX + (barW - 2) / 2} y={barY - 10}
                              textAnchor="middle" fontSize="10" fontFamily={Fn} fontWeight="600"
                              fill={T.text === "#0F172A" ? "#fff" : "#000"}>
                              {bar.value.toFixed(2)}
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}
                </g>
              );
            })}
          </svg>

          {/* Legend */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", marginTop: 8 }}>
            {selectedPeers.map(p => (
              <div key={p} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontFamily: Fn, color: T.textSec }}>
                <span style={{ width: 10, height: 10, borderRadius: 3, background: PEER_COLORS[p] }} />
                {p}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ padding: 40, textAlign: "center", color: T.textTer, fontFamily: Fn, fontSize: 13, background: T.card, borderRadius: 12, border: "1px solid " + T.border }}>
          Select at least one metric and one peer to display the comparison chart.
        </div>
      )}

      {/* Data table below chart */}
      {chartData.length > 0 && barCount > 0 && (
        <div style={{ marginTop: 16 }}>
          <ScrollTable>
            <table style={{ borderCollapse: "collapse", width: "100%", background: T.card, borderRadius: 10 }}>
              <thead>
                <tr>
                  <th style={{ padding: "8px 14px", fontFamily: Fn, fontSize: 11, textAlign: "left", fontWeight: 600, color: T.textTer, borderBottom: "2px solid " + T.border }}>Metric</th>
                  {selectedPeers.map(p => (
                    <th key={p} style={{ padding: "8px 14px", fontFamily: Fn, fontSize: 11, textAlign: "right", fontWeight: 600, borderBottom: "2px solid " + T.border }}>
                      <span style={{ color: PEER_COLORS[p] }}>{p}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selectedMetrics.map((metric, mi) => {
                  const vals = peerValuationMultiples[metric];
                  const peerVals = selectedPeers.map(p => vals[peerKeys[peers.indexOf(p)]]);
                  const minV = Math.min(...peerVals);
                  const isInverse = metric === "Div Yield (%)" || metric === "ROIC (%)" || metric === "ROE (%)";
                  return (
                    <tr key={mi}>
                      <td style={{ padding: "8px 14px", fontFamily: Fn, fontSize: 12, fontWeight: 500, color: T.text, borderBottom: "1px solid " + T.border }}>{metric}</td>
                      {selectedPeers.map((p, pi) => {
                        const v = peerVals[pi];
                        const isBest = isInverse ? v === Math.max(...peerVals) : v === minV;
                        return (
                          <td key={p} style={{
                            padding: "8px 14px", fontFamily: Fn, fontSize: 12.5,
                            textAlign: "right", borderBottom: "1px solid " + T.border,
                            fontWeight: isBest ? 700 : 400,
                            color: isBest ? T.green : T.text,
                          }}>
                            {fmt(v)}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </ScrollTable>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════ */
/* SUB-COMPONENT: Consensus Growth Bar Chart        */
/* ════════════════════════════════════════════════ */
function ConsensusChart({ T }) {
  const mob = useMobile();
  const metrics = ["EPS, Adj+", "Revenue", "EBITDA", "Free Cash Flow", "Operating Income"];
  const years = ["fy2026", "fy2027", "fy2028", "fy2029"];
  const yearLabels = ["FY26E", "FY27E", "FY28E", "FY29E"];
  const yearColors = ["#0066CC", "#06D6A0", "#FFB800", "#9B5DE5"];

  const [selMetric, setSelMetric] = useState("EPS, Adj+");
  const row = consensusGrowth.find(r => r.metric === selMetric);
  const vals = row ? years.map(y => row[y]) : [];
  const validVals = vals.filter(v => v != null);
  const maxAbs = validVals.length ? Math.max(...validVals.map(Math.abs)) * 1.3 : 10;

  const W = mob ? 340 : 560;
  const H = mob ? 200 : 220;
  const pad = { t: 20, r: 20, b: 36, l: 48 };
  const plotW = W - pad.l - pad.r;
  const plotH = H - pad.t - pad.b;
  const midY = pad.t + plotH / 2;
  const barGap = plotW / vals.length;
  const barW = Math.min(mob ? 36 : 52, barGap * 0.6);

  const [hov, setHov] = useState(-1);

  return (
    <div style={{ background: T.card, borderRadius: 12, border: "1px solid " + T.border, padding: mob ? 12 : 20 }}>
      {/* Metric selector */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {metrics.map(m => {
          const on = m === selMetric;
          return (
            <button key={m} onClick={() => setSelMetric(m)} style={{
              fontFamily: Fn, fontSize: 11, padding: "4px 12px",
              border: `1px solid ${on ? "#0066CC" : T.border}`,
              borderRadius: 20, cursor: "pointer",
              background: on ? "rgba(0,102,204,0.1)" : "transparent",
              color: on ? "#0066CC" : T.textSec,
              fontWeight: on ? 600 : 400, transition: "all 0.15s",
            }}>{m}</button>
          );
        })}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }} onMouseLeave={() => setHov(-1)}>
        {/* Zero line */}
        <line x1={pad.l} x2={W - pad.r} y1={midY} y2={midY} stroke={T.text} strokeWidth="0.8" opacity="0.3" />
        {/* Grid */}
        {[-0.5, 0.5].map((f, i) => (
          <g key={i}>
            <line x1={pad.l} x2={W - pad.r} y1={midY - f * plotH} y2={midY - f * plotH} stroke={T.border} strokeWidth="0.4" />
            <text x={pad.l - 6} y={midY - f * plotH + 4} textAnchor="end" fontSize="9" fill={T.textTer} fontFamily={Fn}>
              {(maxAbs * f).toFixed(0)}%
            </text>
          </g>
        ))}
        <text x={pad.l - 6} y={midY + 4} textAnchor="end" fontSize="9" fill={T.textTer} fontFamily={Fn}>0%</text>

        {/* Bars */}
        {vals.map((v, i) => {
          if (v == null) return null;
          const x = pad.l + barGap * i + barGap / 2;
          const barH = (Math.abs(v) / maxAbs) * (plotH / 2);
          const y = v >= 0 ? midY - barH : midY;
          const isHov = hov === i;
          return (
            <g key={i} onMouseEnter={() => setHov(i)} style={{ cursor: "pointer" }}>
              <rect x={x - barW / 2} y={y} width={barW} height={barH}
                rx={4} fill={v >= 0 ? "#06D6A0" : "#E63946"}
                opacity={isHov ? 1 : 0.75} style={{ transition: "opacity 0.15s" }} />
              {isHov && (
                <g>
                  <rect x={x - 28} y={(v >= 0 ? y - 22 : y + barH + 4)} width={56} height={18} rx={6}
                    fill={T.text === "#0F172A" ? "rgba(15,23,42,0.92)" : "rgba(250,250,250,0.92)"} />
                  <text x={x} y={(v >= 0 ? y - 10 : y + barH + 16)}
                    textAnchor="middle" fontSize="10" fontFamily={Fn} fontWeight="600"
                    fill={T.text === "#0F172A" ? "#fff" : "#000"}>
                    {v >= 0 ? "+" : ""}{v.toFixed(2)}%
                  </text>
                </g>
              )}
              <text x={x} y={H - 8} textAnchor="middle" fontSize={mob ? 9 : 10} fill={T.textSec} fontFamily={Fn} fontWeight="500">
                {yearLabels[i]}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ════════════════════════════════════════════════ */
/* MAIN EXPORT: FinancialsRelVal                    */
/* ════════════════════════════════════════════════ */
export default function FinancialsRelVal({ T }) {
  const mob = useMobile();
  const sectionGap = mob ? 36 : 48;

  return (
    <div>
      {/* S5-01: Peer comparison tables */}
      <div id="cni-s5-peers" style={{ scrollMarginTop: 120, marginBottom: sectionGap }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", fontWeight: 600 }}>S5-01 / PEER COMPARISON</div>
        </div>
        <h3 style={{ fontFamily: Fn, fontSize: mob ? 18 : 22, fontWeight: 300, color: T.text, margin: 0, marginBottom: 8 }}>
          Relative positioning vs North American Class I railroads
        </h3>
        <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, maxWidth: 720, marginBottom: 20 }}>
          CN trades at a meaningful discount to its Class I peers on a price-to-earnings basis (18.6x versus a peer median of roughly 23x), despite posting comparable margin and growth profiles. The discount partly reflects trade policy overhang and slower earnings per share growth relative to Canadian Pacific Kansas City, which benefits from integration synergies. However, CN's balance sheet is among the cleanest in the peer group: net debt-to-EBITDA sits at 2.5x, the lowest among the five, with interest coverage at 9.5x EBITDA. Union Pacific leads on return on invested capital (ROIC) and return on equity (ROE), reflecting its premium network economics in the western United States, but CN's profitability metrics — a 49% EBITDA margin and 27% net margin — are competitive. The tables below draw directly from Bloomberg Intelligence's North America Class I Rail peer group (BI NA Cls 1 RFT Val).
        </p>
        <PeerTables T={T} />
      </div>

      {/* S5-02: Consensus Estimates */}
      <div id="cni-s5-consensus" style={{ scrollMarginTop: 120, marginBottom: sectionGap, borderTop: "1px solid " + T.border, paddingTop: 36 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", fontWeight: 600 }}>S5-02 / CONSENSUS ESTIMATES</div>
        </div>
        <h3 style={{ fontFamily: Fn, fontSize: mob ? 18 : 22, fontWeight: 300, color: T.text, margin: 0, marginBottom: 8 }}>
          Consensus growth estimates & forward multiples
        </h3>
        <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, maxWidth: 720, marginBottom: 20 }}>
          Sell-side consensus projects a period of accelerating growth from FY 2027 onwards, with adjusted EPS expected to grow roughly 10–11% year on year in both FY 2027 and FY 2028 before moderating to around 7% in FY 2029. The near-term FY 2026 outlook is more subdued — EPS growth of just 3% year on year — reflecting continued tariff headwinds and flat volumes. The standout line item is free cash flow, which consensus expects to jump over 21% in FY 2026 as capital expenditure drops by C$700 million. On a forward multiples basis, CN screens as cheap relative to its own history: the next-twelve-months price-to-earnings ratio of 18.0x compares favourably to a five-year average of roughly 19.5x, while the forward enterprise value-to-EBITDA multiple of 12.2x sits near the lower bound of its historical range. By FY 2028, the P/E compresses to under 15x on consensus numbers.
        </p>
        <ConsensusChart T={T} />
        <div style={{ marginTop: 24 }}>
          <ConsensusSection T={T} />
        </div>
      </div>

      {/* S5-03: Interactive valuation comparison */}
      <div id="cni-s5-valcomp" style={{ scrollMarginTop: 120, marginBottom: sectionGap, borderTop: "1px solid " + T.border, paddingTop: 36 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", fontWeight: 600 }}>S5-03 / VALUATION COMPARISON</div>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.green, fontWeight: 600, padding: "2px 8px", borderRadius: 8, background: T.greenBg }}>INTERACTIVE</div>
        </div>
        <h3 style={{ fontFamily: Fn, fontSize: mob ? 18 : 22, fontWeight: 300, color: T.text, margin: 0, marginBottom: 8 }}>
          Cross-peer valuation multiples
        </h3>
        <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, maxWidth: 720, marginBottom: 20 }}>
          Select metrics and peers using the toggle buttons below to build a custom comparison chart. The chart highlights where CN trades at a discount or premium relative to each peer across valuation, profitability, and return metrics. Green-highlighted cells in the table below mark the best reading for each metric (lowest multiple for valuation metrics, highest for return metrics).
        </p>
        <ValuationCompare T={T} />
      </div>
    </div>
  );
}
