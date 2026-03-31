import { useState, useMemo, useRef, useEffect } from "react";
import { Fn } from "../theme";
import { Card, Label, Pill } from "../components/shared";
import { scenarios as defaultScenarios, holdingImpacts, clusters, vulnerabilities } from "../data/research-scenarios";

/* ─── Helpers ─── */
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const impactLabel = v => v === 2 ? "Strong ↑" : v === 1 ? "Mild ↑" : v === 0 ? "Neutral" : v === -1 ? "Mild ↓" : "Strong ↓";
const impactColor = (v, T) => v === 2 ? T.green : v === 1 ? (T.green + "99") : v === 0 ? T.textTer : v === -1 ? (T.orange + "99") : T.capRed;
const impactBg = (v, T) => v === 2 ? T.greenBg : v === 1 ? (T.green + "0D") : v === 0 ? "transparent" : v === -1 ? (T.orange + "0D") : T.redBg;

const cellColor = (v, isDark) => {
  if (v === 2) return isDark ? "rgba(52,211,153,0.35)" : "rgba(4,120,87,0.18)";
  if (v === 1) return isDark ? "rgba(52,211,153,0.15)" : "rgba(4,120,87,0.08)";
  if (v === 0) return "transparent";
  if (v === -1) return isDark ? "rgba(251,146,60,0.15)" : "rgba(234,88,12,0.08)";
  return isDark ? "rgba(239,68,68,0.30)" : "rgba(155,27,27,0.15)";
};

const driverIcon = d => d === "up" ? "↑" : d === "down" ? "↓" : d === "dovish" ? "🕊" : d === "hawkish" ? "🦅" : d === "weaker" ? "↘" : d === "stronger" ? "↗" : d === "value" ? "🔄" : "→";

/* ─── Section 1: Probability-Weighted Alpha Summary ─── */
function AlphaSummary({ scenarios, probs, setProbs, T, mobile }) {
  const isDark = T.bg !== "#F8F9FC";
  const weightedAlpha = useMemo(() => {
    let lo = 0, hi = 0, totalP = 0;
    scenarios.forEach((s, i) => {
      const p = probs[s.id] / 100;
      lo += p * s.alphaRange[0];
      hi += p * s.alphaRange[1];
      totalP += probs[s.id];
    });
    return { lo: Math.round(lo), hi: Math.round(hi), totalP };
  }, [probs, scenarios]);

  const isNeg = weightedAlpha.hi < 0;
  const isPos = weightedAlpha.lo > 0;
  const alphaColor = isNeg ? T.capRed : isPos ? T.green : T.orange;

  return (
    <Card T={T} style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
        <div>
          <Label T={T}>Probability-Weighted Portfolio Alpha vs ACWI</Label>
          <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginTop: 4 }}>Adjust scenario probabilities with sliders · 6–12 month horizon</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 28, fontWeight: 700, fontFamily: Fn, color: alphaColor, letterSpacing: "-0.03em" }}>
            {weightedAlpha.lo > 0 ? "+" : ""}{weightedAlpha.lo} to {weightedAlpha.hi > 0 ? "+" : ""}{weightedAlpha.hi} bps
          </div>
          <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn }}>
            {weightedAlpha.totalP !== 100 && <span style={{ color: T.orange }}>⚠ Probabilities sum to {weightedAlpha.totalP}% </span>}
            {weightedAlpha.totalP === 100 && "Probabilities sum to 100%"}
          </div>
        </div>
      </div>

      {/* Scenario bars + sliders */}
      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 12 }}>
        {scenarios.map(s => {
          const midAlpha = (s.alphaRange[0] + s.alphaRange[1]) / 2;
          const pctContrib = ((probs[s.id] / 100) * midAlpha);
          return (
            <div key={s.id} style={{ padding: 12, borderRadius: T.radiusSm, background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.015)", border: "1px solid " + T.border }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 14 }}>{s.icon}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, fontFamily: Fn, color: T.text }}>{s.short}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 11, fontFamily: Fn, color: midAlpha >= 0 ? T.green : T.capRed, fontWeight: 600, fontFeatureSettings: '"tnum"' }}>
                    {midAlpha >= 0 ? "+" : ""}{Math.round(midAlpha)} bps
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <input
                  type="range" min="0" max="50" value={probs[s.id]}
                  onChange={e => setProbs(p => ({ ...p, [s.id]: parseInt(e.target.value) }))}
                  style={{ flex: 1, accentColor: s.color, height: 4 }}
                />
                <span style={{ fontSize: 12, fontWeight: 700, fontFamily: Fn, color: s.color, minWidth: 32, textAlign: "right", fontFeatureSettings: '"tnum"' }}>
                  {probs[s.id]}%
                </span>
              </div>
              <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 4 }}>
                Contribution: <span style={{ color: pctContrib >= 0 ? T.green : T.capRed, fontWeight: 600 }}>{pctContrib >= 0 ? "+" : ""}{Math.round(pctContrib)} bps</span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

/* ─── Section 2: Correlation Clusters ─── */
function CorrelationClusters({ activeCluster, setActiveCluster, T, mobile }) {
  const isDark = T.bg !== "#F8F9FC";

  return (
    <Card T={T} style={{ marginBottom: 24 }}>
      <Label T={T}>Hidden Correlation Clusters</Label>
      <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginTop: 4, marginBottom: 16 }}>
        Click a cluster to highlight its holdings across the page · Exposures that look diversified but move together under stress
      </div>

      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(5, 1fr)", gap: 10, marginBottom: 16 }}>
        {clusters.map(c => {
          const isActive = activeCluster === c.id;
          return (
            <div
              key={c.id}
              onClick={() => setActiveCluster(isActive ? null : c.id)}
              style={{
                padding: 12, borderRadius: T.radiusSm, cursor: "pointer",
                border: `2px solid ${isActive ? c.color : T.border}`,
                background: isActive ? (c.color + (isDark ? "22" : "0A")) : (isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)"),
                transition: "all 0.2s",
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, fontFamily: Fn, color: isActive ? c.color : T.text, marginBottom: 4 }}>{c.name}</div>
              <div style={{ fontSize: 20, fontWeight: 800, fontFamily: Fn, color: c.color, marginBottom: 2 }}>{c.weight}%</div>
              <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn }}>{c.tickers.length} names</div>
            </div>
          );
        })}
      </div>

      {/* Active cluster detail */}
      {activeCluster && (() => {
        const c = clusters.find(cl => cl.id === activeCluster);
        return (
          <div style={{ padding: 14, borderRadius: T.radiusSm, background: c.color + (isDark ? "15" : "08"), border: `1px solid ${c.color}40`, marginBottom: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 600, fontFamily: Fn, color: c.color, marginBottom: 6 }}>{c.name}</div>
            <div style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.5, marginBottom: 8 }}>{c.description}</div>
            <div style={{ fontSize: 11, fontFamily: Fn, color: T.text }}>
              <span style={{ fontWeight: 600, color: T.capRed }}>Key risk:</span> {c.keyRisk}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 8 }}>
              {c.tickers.map(t => {
                const h = holdingImpacts.find(hi => hi.ticker === t);
                return (
                  <span key={t} style={{
                    fontSize: 10, fontFamily: Fn, fontWeight: 600,
                    padding: "2px 8px", borderRadius: 4,
                    background: c.color + "20", color: c.color,
                  }}>
                    {h?.name || t}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })()}

      {/* Structural vulnerabilities */}
      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(5, 1fr)", gap: 8, marginTop: 12 }}>
        {vulnerabilities.map((v, i) => (
          <div key={i} style={{
            padding: 10, borderRadius: T.radiusSm,
            background: v.severity === "high" ? T.redBg : (T.orange + "0D"),
            border: `1px solid ${v.severity === "high" ? T.capRed + "30" : T.orange + "30"}`,
          }}>
            <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginBottom: 2 }}>{v.label}</div>
            <div style={{ fontSize: 16, fontWeight: 800, fontFamily: Fn, color: v.severity === "high" ? T.capRed : T.orange }}>{v.value}</div>
            <div style={{ fontSize: 9, color: T.textTer, fontFamily: Fn, marginTop: 2, lineHeight: 1.3 }}>{v.detail}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ─── Section 3: Scenario Deep Dive ─── */
function ScenarioDeepDive({ scenarios, probs, activeCluster, T, mobile }) {
  const [activeScenario, setActiveScenario] = useState("goldilocks");
  const isDark = T.bg !== "#F8F9FC";
  const s = scenarios.find(sc => sc.id === activeScenario);

  // Sort holdings by impact for this scenario (worst to best)
  const sorted = useMemo(() =>
    [...holdingImpacts].sort((a, b) => b.impacts[activeScenario] - a.impacts[activeScenario]),
    [activeScenario]
  );

  return (
    <Card T={T} style={{ marginBottom: 24 }}>
      <Label T={T}>Scenario Deep Dive</Label>
      <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginTop: 4, marginBottom: 14 }}>
        Select a scenario to see the full narrative, macro drivers, and position-level impact assessment
      </div>

      {/* Scenario tabs */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
        {scenarios.map(sc => {
          const isActive = activeScenario === sc.id;
          return (
            <button
              key={sc.id}
              onClick={() => setActiveScenario(sc.id)}
              style={{
                padding: "6px 14px", borderRadius: T.radiusSm,
                border: `1.5px solid ${isActive ? sc.color : T.border}`,
                background: isActive ? (sc.color + (isDark ? "25" : "10")) : "transparent",
                color: isActive ? sc.color : T.textSec,
                fontSize: 11, fontWeight: isActive ? 700 : 500, fontFamily: Fn,
                cursor: "pointer", transition: "all 0.15s",
                display: "flex", alignItems: "center", gap: 5,
              }}
            >
              <span style={{ fontSize: 12 }}>{sc.icon}</span>
              {sc.short}
              <span style={{ fontSize: 9, opacity: 0.7 }}>{probs[sc.id]}%</span>
            </button>
          );
        })}
      </div>

      {s && (
        <div>
          {/* Scenario header */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 240 }}>
              <div style={{ fontSize: 16, fontWeight: 700, fontFamily: Fn, color: s.color, marginBottom: 6 }}>
                {s.icon} {s.name}
              </div>
              <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.6, marginBottom: 10 }}>
                {s.narrative}
              </div>
              <div style={{ fontSize: 11, color: T.text, fontFamily: Fn, lineHeight: 1.5, padding: 10, borderRadius: T.radiusSm, background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", borderLeft: `3px solid ${s.color}` }}>
                <span style={{ fontWeight: 600 }}>Portfolio thesis test: </span>{s.thesis}
              </div>
            </div>

            {/* Macro drivers + alpha */}
            <div style={{ minWidth: 200 }}>
              <div style={{ fontSize: 24, fontWeight: 800, fontFamily: Fn, color: s.alphaRange[0] >= 0 ? T.green : T.capRed, letterSpacing: "-0.02em", marginBottom: 8, textAlign: "right" }}>
                {s.alphaRange[0] >= 0 ? "+" : ""}{s.alphaRange[0]} to {s.alphaRange[1] >= 0 ? "+" : ""}{s.alphaRange[1]} bps
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                {s.drivers.map((d, i) => (
                  <div key={i} style={{ padding: 6, borderRadius: 6, background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.015)", textAlign: "center" }}>
                    <div style={{ fontSize: 14 }}>{driverIcon(d.direction)}</div>
                    <div style={{ fontSize: 9, fontWeight: 700, fontFamily: Fn, color: T.text }}>{d.label}</div>
                    <div style={{ fontSize: 9, color: T.textTer, fontFamily: Fn }}>{d.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Holdings impact for this scenario */}
          <div style={{ fontSize: 11, fontWeight: 600, fontFamily: Fn, color: T.text, marginBottom: 8 }}>Position-Level Impact</div>
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 6 }}>
            {sorted.map(h => {
              const impact = h.impacts[activeScenario];
              const rationale = h.rationale[activeScenario];
              const inCluster = activeCluster && clusters.find(c => c.id === activeCluster)?.tickers.includes(h.ticker);
              const clusterC = activeCluster ? clusters.find(c => c.id === activeCluster) : null;
              return (
                <div key={h.ticker} style={{
                  display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 10px", borderRadius: 6,
                  background: cellColor(impact, isDark),
                  border: inCluster ? `1.5px solid ${clusterC.color}` : "1px solid transparent",
                  transition: "all 0.2s",
                }}>
                  <div style={{ minWidth: 90 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, fontFamily: Fn, color: T.text }}>{h.name}</div>
                    <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn }}>{h.wt}%</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, lineHeight: 1.4 }}>{rationale}</div>
                  </div>
                  <div style={{
                    fontSize: 10, fontWeight: 700, fontFamily: Fn, minWidth: 52, textAlign: "right",
                    color: impactColor(impact, T),
                  }}>
                    {impactLabel(impact)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Card>
  );
}

/* ─── Section 4: Holdings Sensitivity Matrix ─── */
function SensitivityMatrix({ scenarios, activeCluster, T, mobile }) {
  const [hovCell, setHovCell] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const matrixRef = useRef(null);
  const isDark = T.bg !== "#F8F9FC";

  // Sort by weighted sensitivity (most volatile first)
  const sorted = useMemo(() => {
    return [...holdingImpacts].sort((a, b) => {
      const volA = Object.values(a.impacts).reduce((s, v) => s + Math.abs(v), 0);
      const volB = Object.values(b.impacts).reduce((s, v) => s + Math.abs(v), 0);
      return volB - volA;
    });
  }, []);

  const handleMouseMove = (e, ticker, scenarioId) => {
    if (matrixRef.current) {
      const rect = matrixRef.current.getBoundingClientRect();
      setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
    setHovCell({ ticker, scenarioId });
  };

  const hovData = hovCell ? (() => {
    const h = holdingImpacts.find(hi => hi.ticker === hovCell.ticker);
    if (!h) return null;
    return { name: h.name, impact: h.impacts[hovCell.scenarioId], rationale: h.rationale[hovCell.scenarioId] };
  })() : null;

  if (mobile) {
    return (
      <Card T={T}>
        <Label T={T}>Holdings Sensitivity Matrix</Label>
        <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginTop: 4, marginBottom: 12 }}>
          Rotate device for full matrix view. Showing top 10 most scenario-sensitive holdings.
        </div>
        {sorted.slice(0, 10).map(h => {
          const inCluster = activeCluster && clusters.find(c => c.id === activeCluster)?.tickers.includes(h.ticker);
          return (
            <div key={h.ticker} style={{ marginBottom: 10, padding: 8, borderRadius: 6, border: inCluster ? `1.5px solid ${clusters.find(c => c.id === activeCluster)?.color}` : `1px solid ${T.border}` }}>
              <div style={{ fontSize: 11, fontWeight: 700, fontFamily: Fn, color: T.text, marginBottom: 4 }}>{h.name} ({h.wt}%)</div>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {scenarios.map(s => (
                  <div key={s.id} style={{
                    padding: "3px 8px", borderRadius: 4, fontSize: 9, fontFamily: Fn,
                    background: cellColor(h.impacts[s.id], isDark),
                    color: impactColor(h.impacts[s.id], T), fontWeight: 600,
                  }}>
                    {s.icon} {impactLabel(h.impacts[s.id])}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </Card>
    );
  }

  return (
    <Card T={T}>
      <Label T={T}>Holdings Sensitivity Matrix</Label>
      <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginTop: 4, marginBottom: 14 }}>
        Hover any cell for the rationale · Sorted by scenario sensitivity (most volatile first) · Cluster-highlighted holdings have a colored border
      </div>

      <div ref={matrixRef} style={{ position: "relative", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 2, fontFamily: Fn, fontSize: 10 }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "6px 8px", fontSize: 10, fontWeight: 700, color: T.textTer, position: "sticky", left: 0, background: T.card, zIndex: 2, minWidth: 110 }}>Holding</th>
              <th style={{ textAlign: "center", padding: "6px 4px", fontSize: 10, fontWeight: 700, color: T.textTer, minWidth: 36 }}>Wt%</th>
              {scenarios.map(s => (
                <th key={s.id} style={{ textAlign: "center", padding: "6px 4px", fontSize: 9, fontWeight: 700, color: s.color, minWidth: 70 }}>
                  <span style={{ fontSize: 12 }}>{s.icon}</span><br />{s.short}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map(h => {
              const inCluster = activeCluster && clusters.find(c => c.id === activeCluster)?.tickers.includes(h.ticker);
              const clusterC = activeCluster ? clusters.find(c => c.id === activeCluster) : null;
              return (
                <tr key={h.ticker}>
                  <td style={{
                    padding: "5px 8px", fontWeight: 600, color: T.text, position: "sticky", left: 0, background: T.card, zIndex: 1,
                    borderLeft: inCluster ? `3px solid ${clusterC.color}` : "3px solid transparent",
                  }}>
                    {h.name}
                  </td>
                  <td style={{ textAlign: "center", padding: "5px 4px", color: T.textTer, fontFeatureSettings: '"tnum"' }}>{h.wt}</td>
                  {scenarios.map(s => {
                    const v = h.impacts[s.id];
                    const isHov = hovCell?.ticker === h.ticker && hovCell?.scenarioId === s.id;
                    return (
                      <td
                        key={s.id}
                        onMouseMove={e => handleMouseMove(e, h.ticker, s.id)}
                        onMouseLeave={() => setHovCell(null)}
                        style={{
                          textAlign: "center", padding: "5px 4px", cursor: "pointer",
                          background: cellColor(v, isDark),
                          borderRadius: 4,
                          color: impactColor(v, T),
                          fontWeight: 700,
                          outline: isHov ? `2px solid ${T.text}` : "none",
                          transition: "outline 0.1s",
                        }}
                      >
                        {v === 2 ? "▲▲" : v === 1 ? "▲" : v === 0 ? "—" : v === -1 ? "▼" : "▼▼"}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Floating tooltip */}
        {hovData && hovCell && (
          <div style={{
            position: "absolute",
            left: clamp(tooltipPos.x + 12, 0, (matrixRef.current?.offsetWidth || 600) - 260),
            top: tooltipPos.y - 70,
            width: 240, padding: 10, borderRadius: T.radiusSm,
            background: isDark ? "rgba(17,17,19,0.95)" : "rgba(255,255,255,0.97)",
            boxShadow: T.shadowLg, border: "1px solid " + T.border,
            zIndex: 10, pointerEvents: "none",
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, fontFamily: Fn, color: T.text, marginBottom: 4 }}>
              {hovData.name} · <span style={{ color: impactColor(hovData.impact, T) }}>{impactLabel(hovData.impact)}</span>
            </div>
            <div style={{ fontSize: 10, color: T.textSec, fontFamily: Fn, lineHeight: 1.4 }}>{hovData.rationale}</div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 14, marginTop: 12, justifyContent: "center", flexWrap: "wrap" }}>
        {[
          { v: 2, label: "Strong Tailwind" }, { v: 1, label: "Mild Tailwind" }, { v: 0, label: "Neutral" },
          { v: -1, label: "Mild Headwind" }, { v: -2, label: "Strong Headwind" },
        ].map(({ v, label }) => (
          <div key={v} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 14, height: 14, borderRadius: 3, background: cellColor(v, isDark) }} />
            <span style={{ fontSize: 9, fontFamily: Fn, color: T.textTer }}>{label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ─── Main Page ─── */
export default function ResearchScenarios({ T }) {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const [activeCluster, setActiveCluster] = useState(null);
  const [probs, setProbs] = useState(() => {
    const p = {};
    defaultScenarios.forEach(s => { p[s.id] = s.probability; });
    return p;
  });

  return (
    <div>
      {/* Page header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 18 }}>🎯</span>
          <h2 style={{ fontFamily: Fn, fontSize: 22, fontWeight: 300, letterSpacing: "-0.03em", color: T.text, margin: 0 }}>
            Scenario Analysis
          </h2>
        </div>
        <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, lineHeight: 1.5, maxWidth: 720 }}>
          What would make the portfolio change value? Six probability-weighted scenarios covering macro regime shifts, geopolitical shocks, and sector-specific catalysts — assessed against the 26-name concentrated portfolio over a 6–12 month horizon (Q2 2026 – Q1 2027).
        </div>
      </div>

      {/* Section 1: Alpha Summary with Sliders */}
      <AlphaSummary scenarios={defaultScenarios} probs={probs} setProbs={setProbs} T={T} mobile={mobile} />

      {/* Section 2: Correlation Clusters */}
      <CorrelationClusters activeCluster={activeCluster} setActiveCluster={setActiveCluster} T={T} mobile={mobile} />

      {/* Section 3: Scenario Deep Dive */}
      <ScenarioDeepDive scenarios={defaultScenarios} probs={probs} activeCluster={activeCluster} T={T} mobile={mobile} />

      {/* Section 4: Sensitivity Matrix */}
      <SensitivityMatrix scenarios={defaultScenarios} activeCluster={activeCluster} T={T} mobile={mobile} />

      {/* Footer */}
      <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, textAlign: "center", marginTop: 16, lineHeight: 1.5, padding: "12px 0", borderTop: "1px solid " + T.border }}>
        Cape Capital AG · Scenario analysis as of March 2026 · For internal use only · Not investment advice
        <br />Impact assessments are qualitative and directional · Probability weights are subjective and adjustable
      </div>
    </div>
  );
}
