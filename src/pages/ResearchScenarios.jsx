import { useState, useMemo, useRef } from "react";
import { Fn } from "../theme";
import { Card, Label, Pill } from "../components/shared";
import { scenarios, holdingImpacts, clusters } from "../data/research-scenarios";
import { useMobile } from "../hooks/useMobile";

/* ─── Helpers ─── */
const impactLabel = v => v === 2 ? "Strong ↑" : v === 1 ? "Mild ↑" : v === 0 ? "Neutral" : v === -1 ? "Mild ↓" : "Strong ↓";
const impactColor = (v, T) => v === 2 ? T.green : v === 1 ? (T.green + "99") : v === 0 ? T.textTer : v === -1 ? (T.orange + "99") : T.capRed;

const cellBg = (v, isDark) => {
  if (v === 2) return isDark ? "rgba(52,211,153,0.32)" : "rgba(4,120,87,0.16)";
  if (v === 1) return isDark ? "rgba(52,211,153,0.14)" : "rgba(4,120,87,0.07)";
  if (v === 0) return "transparent";
  if (v === -1) return isDark ? "rgba(251,146,60,0.14)" : "rgba(234,88,12,0.07)";
  return isDark ? "rgba(239,68,68,0.28)" : "rgba(155,27,27,0.14)";
};

const cellText = (v, isDark) => {
  if (v === 2) return isDark ? "#34d399" : "#047857";
  if (v === 1) return isDark ? "#6ee7b7" : "#059669";
  if (v === 0) return isDark ? "#6b7280" : "#9ca3af";
  if (v === -1) return isDark ? "#fdba74" : "#ea580c";
  return isDark ? "#f87171" : "#b91c1c";
};

const cellSymbol = v => v === 2 ? "▲▲" : v === 1 ? "▲" : v === 0 ? "—" : v === -1 ? "▼" : "▼▼";

/* ─── Aggregate portfolio score per scenario ─── */
function computeAggregateScores() {
  const totalWt = holdingImpacts.reduce((s, h) => s + h.wt, 0);
  return scenarios.map(sc => {
    let weighted = 0;
    holdingImpacts.forEach(h => {
      weighted += (h.wt / totalWt) * (h.impacts[sc.id] || 0);
    });
    return { id: sc.id, name: sc.short, icon: sc.icon, color: sc.color, score: weighted };
  });
}

/* ─── Section 1: Portfolio Sensitivity Overview ─── */
function SensitivityOverview({ T }) {
  const isDark = T.bg !== "#F8F9FC";
  const scores = useMemo(computeAggregateScores, []);
  const sorted = [...scores].sort((a, b) => a.score - b.score);
  const maxAbs = Math.max(...sorted.map(s => Math.abs(s.score)), 0.01);

  return (
    <Card T={T} style={{ marginBottom: 24 }}>
      <Label T={T}>Portfolio Sensitivity by Narrative</Label>
      <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginTop: 4, marginBottom: 20 }}>
        Weighted average holding impact · scale −2 (strong negative) to +2 (strong positive)
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {sorted.map(s => {
          const pct = (s.score / maxAbs) * 100;
          const isNeg = s.score < 0;
          const barColor = isNeg
            ? (s.score < -0.5 ? T.capRed : T.orange)
            : (s.score > 0.5 ? T.green : (isDark ? "#6ee7b7" : "#059669"));
          return (
            <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: Fn }}>
              <div style={{ width: 22, textAlign: "center", fontSize: 14 }}>{s.icon}</div>
              <div style={{ width: 100, fontSize: 11, color: T.textSec, flexShrink: 0 }}>{s.name}</div>
              <div style={{ flex: 1, position: "relative", height: 22, display: "flex", alignItems: "center" }}>
                {/* center line */}
                <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: T.border }} />
                {/* bar */}
                <div style={{
                  position: "absolute",
                  ...(isNeg
                    ? { right: "50%", width: `${Math.abs(pct) * 0.5}%` }
                    : { left: "50%", width: `${Math.abs(pct) * 0.5}%` }),
                  height: 16,
                  background: barColor,
                  borderRadius: 3,
                  opacity: 0.85,
                  transition: "width 0.4s ease",
                }} />
              </div>
              <div style={{
                width: 48, textAlign: "right", fontSize: 12, fontWeight: 600,
                color: isNeg ? T.capRed : T.green, fontFamily: Fn,
              }}>
                {s.score > 0 ? "+" : ""}{s.score.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

/* ─── Section 2: Heat Map Matrix ─── */
function HeatMap({ T, onSelectScenario, mobile }) {
  const isDark = T.bg !== "#F8F9FC";
  const [tooltip, setTooltip] = useState(null);
  const matRef = useRef(null);

  // Sort holdings by weight descending
  const sorted = useMemo(() => [...holdingImpacts].sort((a, b) => b.wt - a.wt), []);

  const headerH = 72;
  const rowH = 32;
  const nameW = mobile ? 80 : 110;
  const cellW = mobile ? 38 : 52;

  return (
    <Card T={T} style={{ marginBottom: 24, overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
        <div>
          <Label T={T}>Holding × Narrative Sensitivity Matrix</Label>
          <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginTop: 4 }}>
            Click a column header to expand narrative detail
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[
            { v: 2, l: "Strong ↑" }, { v: 1, l: "Mild ↑" }, { v: 0, l: "Neutral" },
            { v: -1, l: "Mild ↓" }, { v: -2, l: "Strong ↓" },
          ].map(({ v, l }) => (
            <div key={v} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, fontFamily: Fn, color: T.textTer }}>
              <div style={{ width: 12, height: 12, borderRadius: 2, background: cellBg(v, isDark), border: `1px solid ${T.border}` }} />
              {l}
            </div>
          ))}
        </div>
      </div>

      <div ref={matRef} style={{ overflowX: "auto", position: "relative" }}>
        <table style={{ borderCollapse: "collapse", fontFamily: Fn, fontSize: mobile ? 10 : 11, minWidth: nameW + scenarios.length * cellW + 10 }}>
          <thead>
            <tr>
              <th style={{ width: nameW, textAlign: "left", padding: "4px 6px", color: T.textTer, fontWeight: 500, fontSize: 10, verticalAlign: "bottom", height: headerH, position: "sticky", left: 0, background: T.card, zIndex: 2 }}>
                Holding
              </th>
              {scenarios.map(sc => (
                <th key={sc.id} style={{
                  width: cellW, padding: "4px 2px", textAlign: "center", verticalAlign: "bottom", height: headerH, cursor: "pointer",
                }} onClick={() => onSelectScenario(sc.id)}>
                  <div style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", fontSize: 10, color: T.textSec, fontWeight: 500, whiteSpace: "nowrap", lineHeight: 1.2 }}>
                    {sc.icon} {sc.short}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((h, ri) => (
              <tr key={h.ticker} style={{ borderTop: `1px solid ${T.border}22` }}>
                <td style={{
                  padding: "4px 6px", fontWeight: 500, color: T.text, fontSize: mobile ? 9 : 10,
                  whiteSpace: "nowrap", position: "sticky", left: 0, background: T.card, zIndex: 1,
                }}>
                  {h.name}
                  <span style={{ color: T.textTer, fontWeight: 400, marginLeft: 4 }}>{h.wt.toFixed(1)}%</span>
                </td>
                {scenarios.map(sc => {
                  const v = h.impacts[sc.id] || 0;
                  const key = `${h.ticker}-${sc.id}`;
                  return (
                    <td key={sc.id} style={{
                      textAlign: "center", padding: 2, height: rowH, position: "relative",
                    }}
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const matRect = matRef.current?.getBoundingClientRect() || { left: 0, top: 0 };
                        setTooltip({
                          key, text: h.rationale[sc.id],
                          label: `${h.name} × ${sc.short}: ${impactLabel(v)}`,
                          x: rect.left - matRect.left + rect.width / 2,
                          y: rect.top - matRect.top - 4,
                        });
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    >
                      <div style={{
                        width: "100%", height: rowH - 4, borderRadius: 3,
                        background: cellBg(v, isDark),
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: cellText(v, isDark), fontSize: mobile ? 9 : 10, fontWeight: 600,
                        transition: "background 0.2s",
                      }}>
                        {cellSymbol(v)}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Tooltip */}
        {tooltip && !mobile && (
          <div style={{
            position: "absolute", left: tooltip.x, top: tooltip.y,
            transform: "translate(-50%, -100%)",
            background: isDark ? "#1f2937" : "#fff",
            border: `1px solid ${T.border}`,
            borderRadius: 6, padding: "8px 12px", maxWidth: 280,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)", zIndex: 10,
            pointerEvents: "none",
          }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>{tooltip.label}</div>
            <div style={{ fontSize: 10, color: T.textSec, fontFamily: Fn, lineHeight: 1.5 }}>{tooltip.text}</div>
          </div>
        )}
      </div>
    </Card>
  );
}

/* ─── Section 3: Narrative Detail Cards ─── */
function NarrativeDetails({ T, activeScenario, setActiveScenario, mobile }) {
  const isDark = T.bg !== "#F8F9FC";

  // Compute per-scenario holding impacts sorted by magnitude
  const holdingsByScenario = useMemo(() => {
    const map = {};
    scenarios.forEach(sc => {
      map[sc.id] = [...holdingImpacts]
        .map(h => ({ ...h, impact: h.impacts[sc.id] || 0, rat: h.rationale[sc.id] || "" }))
        .sort((a, b) => b.impact - a.impact || b.wt - a.wt);
    });
    return map;
  }, []);

  return (
    <Card T={T} style={{ marginBottom: 24 }}>
      <Label T={T}>Narrative Detail</Label>
      <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginTop: 4, marginBottom: 16 }}>
        Select a narrative to see triggers, indicators, and per-holding rationale
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
        {scenarios.map(sc => {
          const active = activeScenario === sc.id;
          return (
            <button key={sc.id} onClick={() => setActiveScenario(sc.id)} style={{
              padding: "6px 12px", borderRadius: 6, fontSize: 11, fontFamily: Fn, fontWeight: active ? 600 : 400,
              background: active ? (sc.color + "1A") : "transparent",
              border: `1px solid ${active ? sc.color : T.border}`,
              color: active ? sc.color : T.textSec,
              cursor: "pointer", transition: "all 0.2s",
              display: "flex", alignItems: "center", gap: 4,
            }}>
              <span>{sc.icon}</span> {sc.short}
            </button>
          );
        })}
      </div>

      {/* Active scenario detail */}
      {(() => {
        const sc = scenarios.find(s => s.id === activeScenario);
        if (!sc) return null;
        const holdings = holdingsByScenario[sc.id] || [];
        const winners = holdings.filter(h => h.impact > 0);
        const losers = holdings.filter(h => h.impact < 0);
        const neutral = holdings.filter(h => h.impact === 0);

        return (
          <div>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 28 }}>{sc.icon}</span>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600, color: T.text, fontFamily: Fn }}>{sc.name}</div>
                <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn }}>Horizon: {sc.horizon}</div>
              </div>
            </div>

            {/* Summary */}
            <p style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 20px 0" }}>
              {sc.summary}
            </p>

            {/* Triggers & Indicators side by side */}
            <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 24 }}>
              <div style={{ background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", borderRadius: 8, padding: 14, border: `1px solid ${T.border}44` }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: T.textTer, fontFamily: Fn, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>
                  Triggers / Validation
                </div>
                {sc.triggers.map((t, i) => (
                  <div key={i} style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.6, marginBottom: 4, paddingLeft: 12, position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: sc.color }}>›</span>
                    {t}
                  </div>
                ))}
              </div>
              <div style={{ background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", borderRadius: 8, padding: 14, border: `1px solid ${T.border}44` }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: T.textTer, fontFamily: Fn, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>
                  Indicators to Watch
                </div>
                {sc.indicators.map((ind, i) => (
                  <div key={i} style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.6, marginBottom: 4, paddingLeft: 12, position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: T.textTer }}>•</span>
                    {ind}
                  </div>
                ))}
              </div>
            </div>

            {/* Winners / Losers / Neutral */}
            <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr", gap: 12 }}>
              {/* Winners */}
              <div>
                <div style={{ fontSize: 10, fontWeight: 600, color: T.green, fontFamily: Fn, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>
                  Beneficiaries ({winners.length})
                </div>
                {winners.map(h => (
                  <div key={h.ticker} style={{
                    display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8,
                    padding: "6px 8px", borderRadius: 6, background: cellBg(h.impact, isDark),
                  }}>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: T.text, fontFamily: Fn }}>
                        {h.name}
                        <span style={{ fontWeight: 400, color: cellText(h.impact, isDark), marginLeft: 6 }}>
                          {impactLabel(h.impact)}
                        </span>
                      </div>
                      <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 2, lineHeight: 1.5 }}>
                        {h.rat}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Losers */}
              <div>
                <div style={{ fontSize: 10, fontWeight: 600, color: T.capRed, fontFamily: Fn, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>
                  Headwinds ({losers.length})
                </div>
                {losers.map(h => (
                  <div key={h.ticker} style={{
                    display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8,
                    padding: "6px 8px", borderRadius: 6, background: cellBg(h.impact, isDark),
                  }}>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: T.text, fontFamily: Fn }}>
                        {h.name}
                        <span style={{ fontWeight: 400, color: cellText(h.impact, isDark), marginLeft: 6 }}>
                          {impactLabel(h.impact)}
                        </span>
                      </div>
                      <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 2, lineHeight: 1.5 }}>
                        {h.rat}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Neutral */}
              <div>
                <div style={{ fontSize: 10, fontWeight: 600, color: T.textTer, fontFamily: Fn, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>
                  Neutral ({neutral.length})
                </div>
                {neutral.map(h => (
                  <div key={h.ticker} style={{
                    display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8,
                    padding: "6px 8px", borderRadius: 6, background: cellBg(0, isDark),
                    border: `1px solid ${T.border}33`,
                  }}>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: T.text, fontFamily: Fn }}>
                        {h.name}
                        <span style={{ fontWeight: 400, color: T.textTer, marginLeft: 6 }}>Neutral</span>
                      </div>
                      <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 2, lineHeight: 1.5 }}>
                        {h.rat}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })()}
    </Card>
  );
}

/* ─── Section 4: Cluster Risk Summary ─── */
function ClusterSummary({ T }) {
  const isDark = T.bg !== "#F8F9FC";

  return (
    <Card T={T} style={{ marginBottom: 24 }}>
      <Label T={T}>Correlation Clusters</Label>
      <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginTop: 4, marginBottom: 16 }}>
        Holdings that move together under stress — regardless of GICS sector labels
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
        {clusters.map(c => {
          // compute cluster weight
          const clusterWt = holdingImpacts.filter(h => c.tickers.includes(h.ticker)).reduce((s, h) => s + h.wt, 0);
          return (
            <div key={c.id} style={{
              padding: 14, borderRadius: 8,
              border: `1px solid ${c.color}33`,
              background: c.color + "0A",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: c.color, fontFamily: Fn }}>{c.name}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: T.textSec, fontFamily: Fn }}>{clusterWt.toFixed(1)}%</div>
              </div>
              <div style={{ fontSize: 10, color: T.textSec, fontFamily: Fn, lineHeight: 1.6, marginBottom: 8 }}>
                {c.description}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {c.tickers.map(t => {
                  const h = holdingImpacts.find(hi => hi.ticker === t);
                  return (
                    <span key={t} style={{
                      fontSize: 9, fontFamily: Fn, padding: "2px 6px", borderRadius: 4,
                      background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                      color: T.textSec,
                    }}>
                      {h ? h.name : t}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

/* ─── Main Page ─── */
export default function ScenariosPg({ T }) {
  const mobile = useMobile();
  const [activeScenario, setActiveScenario] = useState("soft_landing");

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: Fn, fontSize: 28, fontWeight: 300, letterSpacing: "-0.03em", color: T.text, margin: 0 }}>
          Scenario Analysis
        </h1>
        <p style={{ fontSize: 12, color: T.textTer, marginTop: 6, fontFamily: Fn }}>
          Portfolio sensitivity to 10 market narratives · 26 holdings · April 2026
        </p>
      </div>

      <SensitivityOverview T={T} />
      <HeatMap T={T} onSelectScenario={setActiveScenario} mobile={mobile} />
      <NarrativeDetails T={T} activeScenario={activeScenario} setActiveScenario={setActiveScenario} mobile={mobile} />
      <ClusterSummary T={T} />
    </div>
  );
}
