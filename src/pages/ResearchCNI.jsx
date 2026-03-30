import { useState, useRef, useEffect } from "react";
import { Fn } from "../theme";
import { Card, Label, Pill } from "../components/shared";
import { useMobile } from "../hooks/useMobile";
import InteractiveDCF from "../components/InteractiveDCF";
import InteractiveExitValuation from "../components/InteractiveExitValuation";
import FinancialsRelVal from "../components/FinancialsRelVal";
import PerformanceCharts from "../components/PerformanceCharts";
import {
  cniSnapshot, heroStats, thesisCards, thesisSections,
  competitorTable, commodityMix, riskTiers, railVsTrucking,
  monitoringPoints, chartData,
  primerSnapshot, networkCards, revenueTable, operatingMetrics,
  capitalAllocation, peerComparison, businessRisks,
  moatSources, moatComparison, qualityScorecard, kpiScorecard,
  peerORComparison, variantBull, variantBear, valuationHistory,
  peerValuationTable, riskMatrix, s3Catalysts,
  channelChecks, channelSummary,
} from "../data/research-cni";

/* ─── SVG chart helpers ─── */
function BarChart({ data, labels, colors, title, subtitle, T, height = 220 }) {
  const max = Math.max(...data) * 1.15;
  const W = 560, H = height, pad = { t: 16, r: 20, b: 32, l: 10 };
  const w = W - pad.l - pad.r, h = H - pad.t - pad.b;
  const bw = Math.min(42, (w / data.length) * 0.55);
  const gap = w / data.length;
  const [hov, setHov] = useState(-1);
  return (
    <div>
      {title && <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>{title}</div>}
      {subtitle && <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 12 }}>{subtitle}</div>}
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }} onMouseLeave={() => setHov(-1)}>
        {[0.25, 0.5, 0.75, 1].map((f, i) => (
          <line key={i} x1={pad.l} x2={W - pad.r} y1={pad.t + h * (1 - f)} y2={pad.t + h * (1 - f)} stroke={T.border} strokeWidth="0.5" />
        ))}
        {data.map((v, i) => {
          const x = pad.l + gap * i + gap / 2;
          const barH = (v / max) * h;
          const y = pad.t + h - barH;
          const c = colors?.[i] || T.deepBlue;
          return (
            <g key={i} onMouseEnter={() => setHov(i)} style={{ cursor: "pointer" }}>
              <rect x={x - bw / 2} y={y} width={bw} height={barH} rx={4} fill={c} opacity={hov === i ? 1 : 0.85} style={{ transition: "opacity 0.15s" }} />
              {hov === i && (
                <g>
                  <rect x={x - 32} y={y - 24} width={64} height={20} rx={6} fill={T.text === "#0F172A" ? "rgba(15,23,42,0.9)" : "rgba(250,250,250,0.9)"} />
                  <text x={x} y={y - 11} textAnchor="middle" fontSize="11" fontFamily={Fn} fontWeight="600" fill={T.text === "#0F172A" ? "#fff" : "#000"}>{typeof v === "number" && v > 100 ? `C$${v}M` : v}</text>
                </g>
              )}
              {labels?.[i] && <text x={x} y={H - 6} textAnchor="middle" fontSize="9" fill={T.textTer} fontFamily={Fn}>{labels[i]}</text>}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function Expandable({ title, tag, content, color, T }) {
  const [open, setOpen] = useState(false);
  const innerRef = useRef(null);
  const [maxH, setMaxH] = useState(0);
  useEffect(() => { if (innerRef.current) setMaxH(innerRef.current.scrollHeight); }, [open]);
  return (
    <div onClick={() => setOpen(!open)} style={{
      background: T.card, border: "1px solid " + (open ? (T[color] || T.deepBlue) : T.border), borderRadius: T.radius,
      marginBottom: 12, overflow: "hidden", cursor: "pointer", transition: "border-color 0.2s",
    }}>
      <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", userSelect: "none" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: T.text, fontFamily: Fn }}>{title}</span>
          {tag && <Pill T={T}>{tag}</Pill>}
        </div>
        <div style={{ width: 24, height: 24, borderRadius: "50%", background: T.pillBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: T.textTer, transition: "transform 0.3s", transform: open ? "rotate(180deg)" : "rotate(0)" }}>▼</div>
      </div>
      <div style={{ maxHeight: open ? maxH + 40 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
        <div ref={innerRef} style={{ padding: "0 20px 20px" }}>
          <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.8, fontFamily: Fn, margin: 0 }}>{content}</p>
        </div>
      </div>
    </div>
  );
}

function Section({ id, children }) {
  return <div id={`cni-${id}`} style={{ scrollMarginTop: 120 }}>{children}</div>;
}

/* ─── Stage nav config ─── */
const stageNav = [
  { id: "stage-1", label: "Thesis", shortLabel: "Thesis", color: "deepBlue",
    subs: [
      { id: "thesis-top", label: "Overview" },
      { id: "competitors", label: "Competitors" },
      { id: "commodity", label: "Commodity Mix" },
      { id: "rail-vs-truck", label: "Rail vs Truck" },
      { id: "risks", label: "Risks" },
      { id: "monitor", label: "Monitoring" },
      { id: "conclusion", label: "Conclusion" },
    ]},
  { id: "stage-2", label: "Business Primer", shortLabel: "Primer", color: "deepBlue",
    subs: [
      { id: "primer-snapshot", label: "Snapshot" },
      { id: "primer-network", label: "Network" },
      { id: "primer-revenue", label: "Revenue" },
      { id: "primer-operations", label: "Operations" },
      { id: "primer-capital", label: "Capital" },
      { id: "primer-management", label: "Management" },
      { id: "primer-competitive", label: "Competition" },
      { id: "primer-risks", label: "Risks" },
    ]},
  { id: "stage-3", label: "Equity Analysis", shortLabel: "Analysis", color: "orange",
    subs: [
      { id: "s3-moat", label: "Moat" },
      { id: "s3-quality", label: "Quality" },
      { id: "s3-kpi", label: "KPIs" },
      { id: "s3-variants", label: "Variants" },
      { id: "s3-channels", label: "Channels" },
      { id: "s3-valuation", label: "Valuation" },
      { id: "s3-risks", label: "Risks" },
      { id: "s3-catalysts", label: "Catalysts" },
    ]},
  { id: "stage-4", label: "Valuation", shortLabel: "Valuation", color: "purple",
    subs: [
      { id: "s4-valuation", label: "DCF Model" },
      { id: "s4-exit-valuation", label: "Exit Valuation" },
    ]},
  { id: "stage-5", label: "Financials & RelVal", shortLabel: "Financials", color: "deepBlue",
    subs: [
      { id: "s5-peers", label: "Peer Comparison" },
      { id: "s5-consensus", label: "Consensus" },
      { id: "s5-valcomp", label: "Val Comparison" },
      { id: "s5-performance", label: "Performance" },
    ]},
];

export default function ResearchCNI({ T }) {
  const mob = useMobile();
  const [activeStage, setActiveStage] = useState("stage-1");

  const scrollTo = id => {
    const el = document.getElementById("cni-" + id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* Track which stage is in view */
  useEffect(() => {
    const ids = stageNav.map(s => "cni-" + s.id);
    const els = ids.map(id => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const hit = e.target.id.replace("cni-", "");
          setActiveStage(hit);
        }
      });
    }, { rootMargin: "-80px 0px -60% 0px", threshold: 0 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const colorMap = { orange: T.orange, capRed: T.capRed, deepBlue: T.deepBlue, green: T.green, purple: T.purple };
  const bgMap = { orange: "rgba(234,88,12,0.08)", capRed: T.redBg, deepBlue: "rgba(29,78,216,0.08)", green: T.greenBg, purple: "rgba(67,56,202,0.08)" };
  const activeConfig = stageNav.find(s => s.id === activeStage);

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <Pill T={T} color={T.deepBlue} bg="rgba(29,78,216,0.08)">EQUITY RESEARCH</Pill>
          <Pill T={T}>Thematic Analysis</Pill>
          <Pill T={T}>March 2026</Pill>
        </div>
        <h1 style={{ fontFamily: Fn, fontSize: mob ? 22 : 32, fontWeight: 300, letterSpacing: "-0.03em", color: T.text, margin: 0, lineHeight: 1.3 }}>
          Canadian National Railway <span style={{ color: T.textTer, fontWeight: 400 }}>(CNI)</span>
        </h1>
        <p style={{ fontSize: 14, color: T.textSec, marginTop: 10, fontFamily: Fn, lineHeight: 1.7, maxWidth: 720 }}>
          North American freight rail: structural forces shaping CN's positioning. The continent's only tri-coastal network faces its most dynamic competitive period since Staggers Act deregulation in 1980.
        </p>
      </div>

      {/* ─── Sticky Stage Navigation ─── */}
      <div style={{
        position: "sticky", top: 0, zIndex: 50,
        background: T.bg, borderBottom: "1px solid " + T.border,
        marginBottom: 32,
        marginLeft: mob ? -16 : -32, marginRight: mob ? -16 : -32,
        paddingLeft: mob ? 16 : 32, paddingRight: mob ? 16 : 32,
      }}>
        {/* Main tabs */}
        <div style={{
          display: "flex", gap: mob ? 0 : 4, overflow: "auto",
          WebkitOverflowScrolling: "touch", msOverflowStyle: "none", scrollbarWidth: "none",
        }}>
          {stageNav.map(s => {
            const active = activeStage === s.id;
            const c = colorMap[s.color] || T.deepBlue;
            return (
              <button key={s.id} onClick={() => scrollTo(s.id)} style={{
                background: "none", border: "none", cursor: "pointer",
                padding: mob ? "12px 10px 10px" : "14px 18px 10px",
                fontFamily: Fn, fontSize: mob ? 12 : 13, fontWeight: active ? 600 : 400,
                color: active ? c : T.textTer,
                borderBottom: active ? `2px solid ${c}` : "2px solid transparent",
                transition: "all 0.2s", whiteSpace: "nowrap", flexShrink: 0,
              }}>
                {mob ? s.shortLabel : s.label}
              </button>
            );
          })}
        </div>
        {/* Sub-section chips */}
        {activeConfig?.subs && (
          <div style={{
            display: "flex", gap: 6, padding: "8px 0 10px",
            overflow: "auto", WebkitOverflowScrolling: "touch",
            msOverflowStyle: "none", scrollbarWidth: "none",
          }}>
            {activeConfig.subs.map(sub => (
              <button key={sub.id} onClick={() => scrollTo(sub.id)} style={{
                background: T.pillBg, border: "1px solid " + T.border,
                borderRadius: 20, padding: "4px 12px",
                fontFamily: Fn, fontSize: 11, color: T.textSec,
                cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
                transition: "all 0.15s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = colorMap[activeConfig.color] || T.deepBlue; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "transparent"; }}
                onMouseLeave={e => { e.currentTarget.style.background = T.pillBg; e.currentTarget.style.color = T.textSec; e.currentTarget.style.borderColor = T.border; }}>
                {sub.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ─── STAGE 1: INVESTMENT THESIS ─── */}
      <div id="cni-stage-1" style={{ scrollMarginTop: 120 }} />
      <div id="cni-thesis-top" style={{ scrollMarginTop: 120 }} />

      {/* Snapshot */}
      <Card T={T} style={{ marginBottom: 24, padding: "20px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: T.textTer, fontFamily: Fn, letterSpacing: "0.05em" }}>CNI</span>
            <span style={{ fontSize: mob ? 22 : 28, fontWeight: 300, fontFamily: Fn, color: T.text }}>{cniSnapshot.price}</span>
            <Pill T={T} color={T.capRed} bg={T.redBg}>{cniSnapshot.ytdChg} YTD</Pill>
          </div>
          <div style={{ display: "flex", gap: mob ? 12 : 20, flexWrap: "wrap" }}>
            {[
              { l: "Revenue", v: cniSnapshot.revenue },
              { l: "Op. Ratio", v: cniSnapshot.operatingRatio },
              { l: "FCF", v: cniSnapshot.fcf },
              { l: "Network", v: cniSnapshot.network },
              { l: "Dividend", v: cniSnapshot.dividend },
            ].map((m, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: T.deepBlue, fontFamily: Fn }}>{m.v}</div>
                <div style={{ fontSize: 9, color: T.textTer, fontFamily: Fn, letterSpacing: "0.05em", marginTop: 2 }}>{m.l}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Hero stats */}
      <div style={{ display: "grid", gridTemplateColumns: mob ? "repeat(2, 1fr)" : "repeat(6, 1fr)", gap: 10, marginBottom: 32 }}>
        {heroStats.map((s, i) => (
          <div key={i} style={{ background: T.card, border: "1px solid " + T.border, borderRadius: T.radius, padding: "16px 14px", textAlign: "center", boxShadow: T.shadow }}>
            <div style={{ fontSize: 22, fontWeight: 300, fontFamily: Fn, color: T[s.color] || T.text, lineHeight: 1.2 }}>{s.value}</div>
            <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 6, lineHeight: 1.4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Thesis overview grid */}
      <Label T={T}>Seven secular forces converging on freight rail</Label>
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3, 1fr)", gap: 12, marginBottom: 48 }}>
        {thesisCards.map((card, i) => (
          <div key={i} onClick={() => scrollTo(card.id)} style={{
            background: T.card, border: "1px solid " + T.border, borderRadius: T.radius,
            padding: "22px 20px", cursor: "pointer", boxShadow: T.shadow, transition: "all 0.2s",
            borderTop: `3px solid ${colorMap[card.color] || T.deepBlue}`,
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = T.shadowLg }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = T.shadow }}>
            <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginBottom: 8 }}>{card.num}</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 6 }}>{card.title}</div>
            <Pill T={T} color={colorMap[card.color]} bg={bgMap[card.color]}>{card.tag}</Pill>
            <p style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, lineHeight: 1.65, marginTop: 10, margin: "10px 0 0" }}>{card.desc}</p>
            <div style={{ fontSize: 11, fontWeight: 500, color: colorMap[card.color], marginTop: 12, fontFamily: Fn }}>Deep dive →</div>
          </div>
        ))}
      </div>

      {/* Deep-dive sections */}
      {thesisSections.map((sec, si) => (
        <Section key={si} id={sec.id}>
          <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>{sec.num} / STRUCTURAL FORCE</div>
              <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, lineHeight: 1.3 }}>{sec.title}</h2>
              <p style={{ fontSize: 14, color: T.textSec, fontFamily: Fn, marginTop: 8, lineHeight: 1.7, maxWidth: 700 }}>{sec.lead}</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: mob ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 10, marginBottom: 24 }}>
              {sec.metrics.map((m, i) => (
                <div key={i} style={{ background: T.bg, borderRadius: T.radiusSm, padding: "14px 16px", border: "1px solid " + T.border }}>
                  <div style={{ fontSize: 20, fontWeight: 300, color: colorMap[thesisCards[si]?.color] || T.text, fontFamily: Fn }}>{m.value}</div>
                  <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 4, lineHeight: 1.3 }}>{m.label}</div>
                </div>
              ))}
            </div>

            {/* Charts per section */}
            {sec.id === "potash-boom" && (
              <Card T={T} style={{ padding: "18px 20px", marginBottom: 24 }}>
                <BarChart T={T} title="CN revenue by commodity segment (C$M)" subtitle="Diversified mix — no single segment exceeds 22%"
                  data={chartData.revenueBySegment.values} labels={chartData.revenueBySegment.labels}
                  colors={[T.deepBlue, T.green, T.orange, T.purple, T.textTer, T.capRed, T.textTer]} />
              </Card>
            )}
            {sec.id === "competitive-dynamics" && (
              <Card T={T} style={{ padding: "18px 20px", marginBottom: 24 }}>
                <BarChart T={T} title="Class I railroad revenue ($B USD)" subtitle="FY2025 — CN is #3 by revenue"
                  data={chartData.classIRevenue.values} labels={chartData.classIRevenue.labels}
                  colors={chartData.classIRevenue.labels.map(l => l === "CN" ? T.capRed : T.deepBlue)} />
              </Card>
            )}

            <div style={{ maxWidth: 720, marginBottom: 24 }}>
              {sec.paragraphs.map((p, i) => (
                <p key={i} style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, marginBottom: 14 }}>{p}</p>
              ))}
            </div>

            {sec.pullQuote && (
              <div style={{ fontFamily: Fn, fontSize: 16, fontWeight: 300, color: T.text, lineHeight: 1.6, margin: "24px 0", paddingLeft: 20, borderLeft: `3px solid ${colorMap[thesisCards[si]?.color] || T.deepBlue}`, maxWidth: 720, fontStyle: "italic" }}>
                {sec.pullQuote}
              </div>
            )}

            {sec.expandables?.map((ex, i) => (
              <Expandable key={i} T={T} title={ex.title} tag={ex.tag} content={ex.content} color={thesisCards[si]?.color} />
            ))}

            <Card T={T} style={{ marginTop: 20, padding: "20px 24px", borderLeft: `4px solid ${colorMap[thesisCards[si]?.color] || T.deepBlue}` }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 12 }}>{sec.capture.title}</div>
              {sec.capture.points.map((p, i) => (
                <p key={i} style={{ fontSize: 13, color: T.textSec, lineHeight: 1.75, fontFamily: Fn, marginBottom: 8, paddingLeft: 12, borderLeft: "2px solid " + T.border }}>{p}</p>
              ))}
            </Card>
          </div>
        </Section>
      ))}

      {/* Class I Competitor Table */}
      <Section id="competitors">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>07 / COMPETITIVE LANDSCAPE</div>
          <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 20 }}>The Class I oligopoly</h2>
          <Card T={T} style={{ padding: "16px 20px", overflowX: "auto", marginBottom: 20 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: Fn }}>
              <thead>
                <tr style={{ borderBottom: "2px solid " + T.border }}>
                  {["Railroad", "Revenue", "Op. Ratio", "Route Miles", "Key Differentiator"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontSize: 9, color: T.textTer, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {competitorTable.map((r, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid " + T.border, background: r.name === "CN" ? (T.bg) : "transparent" }}>
                    <td style={{ padding: "10px 12px", fontWeight: r.name === "CN" ? 700 : 500, color: r.name === "CN" ? T.deepBlue : T.text }}>{r.name}</td>
                    <td style={{ padding: "10px 12px", color: T.textSec }}>{r.revenue}</td>
                    <td style={{ padding: "10px 12px" }}><Pill T={T} color={parseFloat(r.or) < 62 ? T.green : T.textSec} bg={parseFloat(r.or) < 62 ? T.greenBg : T.pillBg}>{r.or}</Pill></td>
                    <td style={{ padding: "10px 12px", color: T.textSec }}>{r.miles}</td>
                    <td style={{ padding: "10px 12px", color: T.textTer, fontSize: 11 }}>{r.diff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </Section>

      {/* Commodity Mix */}
      <Section id="commodity">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>08 / COMMODITY MIX</div>
          <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 20 }}>Diversified with visible growth catalysts</h2>
          <Card T={T} style={{ padding: "16px 20px", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: Fn }}>
              <thead>
                <tr style={{ borderBottom: "2px solid " + T.border }}>
                  {["Segment", "Revenue", "% Total", "YoY", "Outlook"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontSize: 9, color: T.textTer, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {commodityMix.map((r, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid " + T.border }}>
                    <td style={{ padding: "10px 12px", fontWeight: 500, color: T.text }}>{r.segment}</td>
                    <td style={{ padding: "10px 12px", color: T.textSec }}>{r.revenue}</td>
                    <td style={{ padding: "10px 12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 60, height: 5, background: T.pillBg, borderRadius: 3, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${(r.pct / 22) * 100}%`, background: T.deepBlue, borderRadius: 3 }} />
                        </div>
                        <span style={{ color: T.textSec, fontSize: 11 }}>{r.pct}%</span>
                      </div>
                    </td>
                    <td style={{ padding: "10px 12px" }}><Pill T={T} color={r.yoy.startsWith("+") ? T.green : r.yoy.startsWith("-") ? T.capRed : T.textSec} bg={r.yoy.startsWith("+") ? T.greenBg : r.yoy.startsWith("-") ? T.redBg : T.pillBg}>{r.yoy}</Pill></td>
                    <td style={{ padding: "10px 12px", color: T.textTer, fontSize: 11 }}>{r.outlook}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </Section>

      {/* Rail vs Trucking */}
      <Section id="rail-vs-truck">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>09 / STRUCTURAL ADVANTAGE</div>
          <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 20 }}>Rail vs trucking — physics-based moat</h2>
          <Card T={T} style={{ padding: "16px 20px", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: Fn }}>
              <thead>
                <tr style={{ borderBottom: "2px solid " + T.border }}>
                  {["Metric", "Rail", "Trucking", "Rail Advantage"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontSize: 9, color: T.textTer, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {railVsTrucking.map((r, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid " + T.border }}>
                    <td style={{ padding: "10px 12px", fontWeight: 500, color: T.text }}>{r.metric}</td>
                    <td style={{ padding: "10px 12px", color: T.green, fontWeight: 600 }}>{r.rail}</td>
                    <td style={{ padding: "10px 12px", color: T.capRed }}>{r.truck}</td>
                    <td style={{ padding: "10px 12px" }}><Pill T={T} color={T.green} bg={T.greenBg}>{r.advantage}</Pill></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </Section>

      {/* Risk Register */}
      <Section id="risks">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>10 / RISK REGISTER</div>
          <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 20 }}>Risks that keep the thesis honest</h2>
          {riskTiers.map((tier, ti) => (
            <div key={ti} style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: ti === 0 ? T.capRed : ti === 1 ? T.orange : T.textTer, fontFamily: Fn, marginBottom: 10, letterSpacing: "0.1em" }}>
                TIER {tier.tier}: {tier.label.toUpperCase()}
              </div>
              {tier.items.map((r, i) => (
                <Expandable key={i} T={T} title={r.title} tag={`${r.severity} · P: ${r.prob}`} content={r.detail} color={ti === 0 ? "capRed" : ti === 1 ? "orange" : "purple"} />
              ))}
            </div>
          ))}
        </div>
      </Section>

      {/* Key Monitoring Points */}
      <Section id="monitor">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>11 / MONITORING</div>
          <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 20 }}>3 key datapoints to watch</h2>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3, 1fr)", gap: 12 }}>
            {monitoringPoints.map((mp, i) => (
              <Card key={i} T={T} style={{ padding: "20px", borderTop: `3px solid ${T.deepBlue}` }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 6 }}>{mp.label}</div>
                <Pill T={T} color={T.deepBlue} bg="rgba(29,78,216,0.08)">{mp.timeframe}</Pill>
                <p style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, lineHeight: 1.65, marginTop: 10, margin: "10px 0 0" }}>{mp.why}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Conclusion */}
      <Section id="conclusion">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 32 }}>
          <Card T={T} style={{ padding: "24px", borderLeft: `4px solid ${T.deepBlue}` }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 12 }}>Investment conclusion</div>
            <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, marginBottom: 10 }}>
              CN's irreplaceable tri-coastal network, potash franchise, and Pacific gateway access are genuine, durable moats. C$3.34B in free cash flow, a sub-62% operating ratio, and position as the primary carrier for Saskatchewan's generational potash expansion provide a compelling base case.
            </p>
            <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, marginBottom: 10 }}>
              However, CPKC's tri-national network captures the nearshoring megatrend CN cannot access directly, tariff escalation has exposed cross-border concentration, and the proposed UP-NS merger signals potential industry restructuring.
            </p>
            <div style={{
              fontFamily: Fn, fontSize: 14, fontWeight: 500, color: T.text, lineHeight: 1.7,
              margin: "16px 0 0", padding: "16px 20px", background: T.bg, borderRadius: T.radiusSm,
              borderLeft: `3px solid ${T.deepBlue}`,
            }}>
              The next 12-18 months — spanning the USMCA review, UP-NS merger proceedings, and US-Canada trade trajectory — will determine whether CN's moat is deepening or eroding. The risk register demands a wider-than-usual range of scenario outcomes.
            </div>
          </Card>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* STAGE 2: BUSINESS PRIMER                              */}
      {/* ═══════════════════════════════════════════════════════ */}

      <div id="cni-stage-2" style={{ scrollMarginTop: 120, borderTop: `3px solid ${T.text}`, marginTop: 48, paddingTop: 40, marginBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <Pill T={T} color={T.deepBlue} bg="rgba(29,78,216,0.08)">STAGE 2</Pill>
          <Pill T={T}>Business Primer</Pill>
        </div>
        <h2 style={{ fontFamily: Fn, fontSize: mob ? 22 : 28, fontWeight: 300, color: T.text, margin: 0, lineHeight: 1.3 }}>
          How does the only tri-coastal railroad actually work?
        </h2>
        <p style={{ fontSize: 14, color: T.textSec, marginTop: 10, fontFamily: Fn, lineHeight: 1.7, maxWidth: 720 }}>
          A business-model deep dive for institutional investors. Company snapshot, network geography, revenue mix, operations, capital allocation, management, competition, and key risks.
        </p>
      </div>

      {/* S2-01: Company Snapshot */}
      <Section id="primer-snapshot">
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>S2-01 / COMPANY SNAPSHOT</div>
          <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 16 }}>Company Snapshot</h2>
          <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, marginBottom: 14, maxWidth: 720 }}>
            Canadian National Railway (CN) is a Canadian Class I freight railroad headquartered in Montreal, Quebec. It operates roughly 20,000 route miles of track spanning coast-to-coast across Canada — from Halifax to Vancouver and Prince Rupert — and south through the U.S. Midwest to the Gulf of Mexico at New Orleans and Mobile.
          </p>
          <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, marginBottom: 20, maxWidth: 720 }}>
            Privatised in 1995 after 76 years as a Crown corporation, CN has since transformed into one of the most efficiently-run railroads on the continent. It handles approximately 15,000 shipments daily, employing around 24,700 people.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "repeat(2, 1fr)" : "repeat(5, 1fr)", gap: 1, background: T.border, borderRadius: T.radiusSm, overflow: "hidden", marginBottom: 24 }}>
            {primerSnapshot.map((s, i) => (
              <div key={i} style={{ background: T.card, padding: "20px 16px", textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 300, fontFamily: Fn, color: T.text, lineHeight: 1.2 }}>{s.value}</div>
                <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 6, letterSpacing: "0.04em", textTransform: "uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* S2-02: The Network */}
      <Section id="primer-network">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>S2-02 / NETWORK</div>
          <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 16 }}>The Network: Tri-Coastal Advantage</h2>
          <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, marginBottom: 20, maxWidth: 720 }}>
            CN's competitive identity is defined by its network geography. Unlike any other Class I railroad, CN connects three coastlines, giving it unmatched optionality for international trade routing.
          </p>
          {/* Network map */}
          <div style={{ marginBottom: 24, borderRadius: 12, overflow: "hidden", border: "1px solid " + T.border }}>
            <img src="/research/cn-network-map.png" alt="CN Rail network map — tri-coastal coverage across North America"
              style={{ width: "100%", display: "block", background: "#000" }} />
            <div style={{ padding: "10px 16px", background: T.card, fontSize: 11, color: T.textTer, fontFamily: Fn, lineHeight: 1.5 }}>
              CN's ~20,000 route-mile network connecting Prince George / Prince Rupert (Pacific) to Moncton / Halifax (Atlantic) and south through Memphis to Jackson / New Orleans (Gulf of Mexico). Key hubs at Winnipeg, Toronto, Chicago (Joliet), and Detroit. Source: CN investor relations.
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 12, marginBottom: 20 }}>
            {networkCards.map((c, i) => (
              <Card key={i} T={T} style={{ padding: "20px" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: T.deepBlue, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>{c.title}</div>
                <p style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, margin: 0 }}>{c.text}</p>
              </Card>
            ))}
          </div>
          <Card T={T} style={{ padding: "20px 24px", borderLeft: `4px solid ${T.deepBlue}` }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: T.deepBlue, fontFamily: Fn, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 6 }}>Key Network Fact</div>
            <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: 0 }}>
              CN accesses all major Canadian markets and reaches approximately 75% of the U.S. population. It serves 23 intermodal terminals and has direct connections to 15+ port facilities across North America.
            </p>
          </Card>
        </div>
      </Section>

      {/* S2-03: Revenue Mix */}
      <Section id="primer-revenue">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>S2-03 / REVENUE MIX</div>
          <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 16 }}>Revenue Mix by Commodity Group</h2>
          <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, marginBottom: 20, maxWidth: 720 }}>
            CN's diversification is a core feature — no single commodity exceeds 23% of revenue, reducing cyclical exposure relative to more concentrated peers.
          </p>
          {/* Commodity network map */}
          <div style={{ marginBottom: 20, borderRadius: 12, overflow: "hidden", border: "1px solid " + T.border }}>
            <img src="/research/cn-commodity-network.png" alt="CN network aligned to commodity growth corridors"
              style={{ width: "100%", display: "block" }} />
            <div style={{ padding: "10px 16px", background: T.card, fontSize: 11, color: T.textTer, fontFamily: Fn, lineHeight: 1.5 }}>
              CN's network aligned to tangible growth: industrial development concentrated in the resource-rich north. Commodities include grain and fertilisers, coal, petroleum and chemicals, metals and minerals, automotive, forest products, and intermodal. Source: CN investor presentation.
            </div>
          </div>
          <Card T={T} style={{ padding: "16px 20px", overflowX: "auto", marginBottom: 16 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: Fn }}>
              <thead>
                <tr style={{ borderBottom: "2px solid " + T.border }}>
                  {["Commodity Group", "FY2025 Rev (C$M)", "% of Freight", "YoY", "Key Drivers"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontSize: 9, color: T.textTer, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {revenueTable.map((r, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid " + T.border }}>
                    <td style={{ padding: "10px 12px", fontWeight: 500, color: T.text }}>{r.segment}</td>
                    <td style={{ padding: "10px 12px", color: T.textSec, fontFamily: Fn }}>{r.rev}</td>
                    <td style={{ padding: "10px 12px", color: T.textSec }}>{r.pct}</td>
                    <td style={{ padding: "10px 12px" }}>
                      <Pill T={T} color={r.yoy.startsWith("+") ? T.green : r.yoy.startsWith("-") ? T.capRed : T.textSec}
                        bg={r.yoy.startsWith("+") ? T.greenBg : r.yoy.startsWith("-") ? T.redBg : T.pillBg}>{r.yoy}</Pill>
                    </td>
                    <td style={{ padding: "10px 12px", color: T.textTer, fontSize: 11 }}>{r.drivers}</td>
                  </tr>
                ))}
                <tr style={{ borderTop: "2px solid " + T.text }}>
                  <td style={{ padding: "10px 12px", fontWeight: 700, color: T.text }}>Total Freight Revenue</td>
                  <td style={{ padding: "10px 12px", fontWeight: 700, color: T.text }}>~16,600</td>
                  <td style={{ padding: "10px 12px", fontWeight: 700, color: T.text }}>96%</td>
                  <td style={{ padding: "10px 12px" }}><Pill T={T} color={T.green} bg={T.greenBg}>+2%</Pill></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </Card>
          <Card T={T} style={{ padding: "20px 24px", borderLeft: `4px solid ${T.deepBlue}` }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: T.deepBlue, fontFamily: Fn, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 6 }}>Revenue Quality Insight</div>
            <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: 0 }}>
              CN has structural pricing power from regulated revenue caps on Canadian grain (which lock in floor pricing) combined with market-based pricing on everything else. The company consistently prices above rail inflation — a function of the Canadian rail duopoly and the captive nature of many shipper locations.
            </p>
          </Card>
        </div>
      </Section>

      {/* S2-04: Operations */}
      <Section id="primer-operations">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>S2-04 / OPERATIONS</div>
          <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 16 }}>How the Operations Work: Scheduled Railroading</h2>
          <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, marginBottom: 20, maxWidth: 720 }}>
            CN's operating model is built on scheduled railroading — a disciplined approach where trains run on fixed schedules (like an airline), rather than waiting until enough cars accumulate.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 12, marginBottom: 20 }}>
            <Card T={T} style={{ padding: "20px" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: T.deepBlue, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Velocity & Dwell</div>
              <p style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, margin: 0 }}>
                Car velocity: ~213 miles/day. Through dwell: ~7 hours. Faster car turns mean CN needs fewer cars and locomotives to move the same volume, reducing capital intensity.
              </p>
            </Card>
            <Card T={T} style={{ padding: "20px" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: T.deepBlue, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Train Length & Efficiency</div>
              <p style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, margin: 0 }}>
                Avg. train length: ~7,909 ft (FY2025). Longer trains spread fixed costs over more revenue units. Fuel efficiency: ~0.87 US gal per 1,000 GTMs. Rail is 4x more fuel-efficient than trucking.
              </p>
            </Card>
          </div>
          <Card T={T} style={{ padding: "16px 20px", overflowX: "auto", marginBottom: 16 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: Fn }}>
              <thead>
                <tr style={{ borderBottom: "2px solid " + T.border }}>
                  {["Key Operating Metric", "FY2023", "FY2024", "FY2025", "Trend"].map(h => (
                    <th key={h} style={{ textAlign: h === "Key Operating Metric" ? "left" : "right", padding: "10px 12px", fontSize: 9, color: T.textTer, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {operatingMetrics.map((r, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid " + T.border }}>
                    <td style={{ padding: "10px 12px", fontWeight: 500, color: T.text }}>{r.metric}</td>
                    <td style={{ padding: "10px 12px", textAlign: "right", color: T.textSec }}>{r.fy23}</td>
                    <td style={{ padding: "10px 12px", textAlign: "right", color: T.textSec }}>{r.fy24}</td>
                    <td style={{ padding: "10px 12px", textAlign: "right", color: T.text, fontWeight: 600 }}>{r.fy25}</td>
                    <td style={{ padding: "10px 12px", textAlign: "right", color: T.green, fontSize: 11 }}>{r.trend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, maxWidth: 720 }}>
            CN's major cost buckets are labour & benefits (~30% of opex), fuel (~15%), equipment rents, depreciation, and purchased services. The adjusted OR of 61.7% in FY2025 represents an improvement of 1.2 points from 2024, though it remains above its 2022 trough of ~58%.
          </p>
        </div>
      </Section>

      {/* S2-05: Capital Allocation */}
      <Section id="primer-capital">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>S2-05 / CAPITAL ALLOCATION</div>
          <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 16 }}>Capital Allocation Framework</h2>
          <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, marginBottom: 20, maxWidth: 720 }}>
            CN runs a disciplined three-pillar model: invest in the network, return cash to shareholders, and maintain a conservative balance sheet. The company has invested C$31 billion in its network over the past decade.
          </p>
          <Card T={T} style={{ padding: "16px 20px", overflowX: "auto", marginBottom: 16 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: Fn }}>
              <thead>
                <tr style={{ borderBottom: "2px solid " + T.border }}>
                  {["Capital Allocation (FY2025)", "Amount", "Commentary"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontSize: 9, color: T.textTer, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {capitalAllocation.map((r, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid " + T.border }}>
                    <td style={{ padding: "10px 12px", fontWeight: 500, color: T.text }}>{r.item}</td>
                    <td style={{ padding: "10px 12px", color: T.deepBlue, fontWeight: 600 }}>{r.amount}</td>
                    <td style={{ padding: "10px 12px", color: T.textTer, fontSize: 11 }}>{r.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          <Card T={T} style={{ padding: "20px 24px", borderLeft: `4px solid ${T.green}`, marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: T.green, fontFamily: Fn, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 6 }}>Shareholder Return Engine</div>
            <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: 0 }}>
              Over the last decade, CN has returned over C$40B to shareholders through dividends and buybacks. The company has reduced its diluted share count from ~780M in 2015 to ~620M by end of 2025 — a ~20% reduction. Combined with steady dividend growth (CAGR ~7%), this creates a powerful per-share compounding dynamic.
            </p>
          </Card>
          <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, maxWidth: 720 }}>
            Key capex projects: Zanardi Rapids Bridge Expansion on the Prince Rupert corridor (completion 2027), Edmonton intermodal capacity expansion, multi-year Edson-to-Hinton mainline expansion in Alberta, and the Chicago Logistics Hub project to reduce congestion at the continent's most important rail interchange.
          </p>
        </div>
      </Section>

      {/* S2-06: Management */}
      <Section id="primer-management">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>S2-06 / MANAGEMENT</div>
          <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 16 }}>Management & Governance</h2>
          <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, marginBottom: 14, maxWidth: 720 }}>
            Tracy Robinson became CEO in February 2022 — the first woman to lead a major Canadian freight railway. Robinson spent 27 years at rival Canadian Pacific in operations, finance, and commercial roles, then eight years at TC Energy, before returning to the rail sector. Her appointment followed pressure from activist investor TCI Fund Management.
          </p>
          <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, marginBottom: 14, maxWidth: 720 }}>
            Under Robinson, CN has refocused on operational discipline, customer service (net promoter scores at all-time highs in 2024), and growing within its existing network rather than pursuing large M&A. Strategic priorities: (1) Sustain and Build Service Excellence, (2) Grow the Business, (3) Grow People.
          </p>
          <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, maxWidth: 720 }}>
            Board chair is Shauneen Bruder, a former RBC executive. The investor base includes Cascade Investments (Bill Gates' investment vehicle) as a significant holder, underscoring long-term institutional confidence.
          </p>
        </div>
      </Section>

      {/* S2-07: Competitive Landscape */}
      <Section id="primer-competitive">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>S2-07 / COMPETITIVE LANDSCAPE</div>
          <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 16 }}>Competitive Landscape</h2>
          <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, marginBottom: 20, maxWidth: 720 }}>
            CN operates in a regulated duopoly in Canada alongside CPKC. Many shipper locations are captive — served by only one railroad — which confers significant pricing power.
          </p>
          <Card T={T} style={{ padding: "16px 20px", overflowX: "auto", marginBottom: 16 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: Fn }}>
              <thead>
                <tr style={{ borderBottom: "2px solid " + T.border }}>
                  {["Peer", "Route Miles", "Geography", "Tri-Coast", "Revenue", "Adj. OR", "Yield", "Leverage"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "10px 10px", fontSize: 9, color: T.textTer, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {peerComparison.map((r, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid " + T.border, background: r.peer === "CN" ? T.bg : "transparent" }}>
                    <td style={{ padding: "10px 10px", fontWeight: r.peer === "CN" ? 700 : 500, color: r.peer === "CN" ? T.deepBlue : T.text }}>{r.peer}</td>
                    <td style={{ padding: "10px 10px", color: T.textSec }}>{r.miles}</td>
                    <td style={{ padding: "10px 10px", color: T.textSec, fontSize: 11 }}>{r.geo}</td>
                    <td style={{ padding: "10px 10px" }}>{r.triCoast === "Unique" ? <Pill T={T} color={T.green} bg={T.greenBg}>Unique</Pill> : <span style={{ color: T.textTer }}>—</span>}</td>
                    <td style={{ padding: "10px 10px", color: T.textSec }}>{r.rev}</td>
                    <td style={{ padding: "10px 10px", color: T.textSec }}>{r.or}</td>
                    <td style={{ padding: "10px 10px", color: T.textSec }}>{r.yield}</td>
                    <td style={{ padding: "10px 10px", color: T.textSec }}>{r.leverage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, marginBottom: 14, maxWidth: 720 }}>
            CPKC's 2023 acquisition of Kansas City Southern created the only single-line railroad spanning Canada, the U.S., and Mexico. CN formed an interline alliance with Union Pacific and Ferromex to compete on the Chicago-Mexico corridor. CPKC is guiding to faster EPS growth (10-14% vs CN's mid-to-high single digit), but CN maintains the stronger balance sheet and higher dividend.
          </p>
          <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, maxWidth: 720 }}>
            Trucking competes on shorter hauls (&lt;800km), but rail's 4x fuel efficiency advantage and capacity to move 300+ truck-equivalent loads per train makes it structurally advantaged on long-haul corridors. This advantage is growing as carbon pricing and ESG mandates favour modal shift to rail.
          </p>
        </div>
      </Section>

      {/* S2-08: Key Business Risks */}
      <Section id="primer-risks">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>S2-08 / KEY BUSINESS RISKS</div>
          <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 20 }}>Key Business Risks</h2>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 12 }}>
            {businessRisks.map((r, i) => (
              <Card key={i} T={T} style={{ padding: "20px" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: T.capRed, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>{r.title}</div>
                <p style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, margin: 0 }}>{r.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* STAGE 3: INSTITUTIONAL EQUITY ANALYSIS                */}
      {/* ═══════════════════════════════════════════════════════ */}

      <div id="cni-stage-3" style={{ scrollMarginTop: 120, borderTop: `3px solid ${T.text}`, marginTop: 48, paddingTop: 40, marginBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <Pill T={T} color={T.orange} bg="rgba(234,88,12,0.08)">STAGE 3</Pill>
          <Pill T={T}>Institutional Equity Analysis</Pill>
        </div>
        <h2 style={{ fontFamily: Fn, fontSize: mob ? 22 : 28, fontWeight: 300, color: T.text, margin: 0, lineHeight: 1.3 }}>
          Moat, quality, variants & valuation
        </h2>
        <p style={{ fontSize: 14, color: T.textSec, marginTop: 10, fontFamily: Fn, lineHeight: 1.7, maxWidth: 720 }}>
          A wide-moat, high-quality compounder trading at a meaningful discount to its own history. At ~17x forward earnings versus a five-year average of ~21x, the stock prices in tariff headwinds and competitive encroachment — but underweights the FCF inflection and Prince Rupert optionality.
        </p>
      </div>

      {/* S3-01: Moat Assessment */}
      <Section id="s3-moat">
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>S3-01 / MOAT ASSESSMENT</div>
          <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 20 }}>Irreplaceable infrastructure earns a wide rating</h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12, marginBottom: 24 }}>
            {moatSources.map((m, i) => (
              <Card key={i} T={T} style={{ padding: "18px 20px", borderLeft: `4px solid ${m.rating === "Strong" ? T.green : T.orange}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn }}>{m.title}</div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <Pill T={T} color={m.rating === "Strong" ? T.green : T.orange} bg={m.rating === "Strong" ? T.greenBg : "rgba(234,88,12,0.08)"}>{m.rating}</Pill>
                    <Pill T={T}>{m.durability}</Pill>
                  </div>
                </div>
                <p style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, margin: 0 }}>{m.evidence}</p>
              </Card>
            ))}
          </div>

          {/* Moat comparison table */}
          <Card T={T} style={{ padding: "16px 20px", overflowX: "auto", marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: T.textTer, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>Moat comparison vs peers</div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: Fn }}>
              <thead>
                <tr style={{ borderBottom: "2px solid " + T.border }}>
                  {["Peer", "Reach", "Port Access", "Adj. OR", "Captive %", "Cross-Border"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "8px 10px", fontSize: 9, color: T.textTer, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {moatComparison.map((r, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid " + T.border, background: r.peer === "CN" ? T.bg : "transparent" }}>
                    <td style={{ padding: "8px 10px", fontWeight: r.peer === "CN" ? 700 : 500, color: r.peer === "CN" ? T.deepBlue : T.text }}>{r.peer}</td>
                    <td style={{ padding: "8px 10px", color: T.textSec, fontSize: 11 }}>{r.reach}</td>
                    <td style={{ padding: "8px 10px", color: T.textSec, fontSize: 11 }}>{r.portAccess}</td>
                    <td style={{ padding: "8px 10px", color: T.textSec }}>{r.or}</td>
                    <td style={{ padding: "8px 10px", color: T.textSec, fontSize: 11 }}>{r.captive}</td>
                    <td style={{ padding: "8px 10px", color: T.textSec, fontSize: 11 }}>{r.crossBorder}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <Card T={T} style={{ padding: "20px 24px", borderLeft: `4px solid ${T.green}` }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 8 }}>Moat Rating: Wide — stable with localized pressure from CPKC</div>
            <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: 0 }}>
              The physical infrastructure moat is as wide as it has ever been. Pricing power remains intact. CPKC narrows the moat modestly on Mexico-bound traffic but does not breach the core network advantage.
            </p>
          </Card>
        </div>
      </Section>

      {/* S3-02: Quality Scoring */}
      <Section id="s3-quality">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>S3-02 / QUALITY SCORING</div>
          <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 20 }}>Strong but not flawless compounder</h2>

          <Card T={T} style={{ padding: "16px 20px", overflowX: "auto", marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: T.textTer, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>Return on capital: 2020-2025</div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: Fn }}>
              <thead>
                <tr style={{ borderBottom: "2px solid " + T.border }}>
                  {["Metric", "2020", "2021", "2022", "2023", "2024", "2025"].map(h => (
                    <th key={h} style={{ textAlign: h === "Metric" ? "left" : "right", padding: "8px 10px", fontSize: 9, color: T.textTer, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {qualityScorecard.map((r, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid " + T.border }}>
                    <td style={{ padding: "8px 10px", fontWeight: 500, color: T.text }}>{r.metric}</td>
                    <td style={{ padding: "8px 10px", textAlign: "right", color: T.textSec }}>{r.y20}</td>
                    <td style={{ padding: "8px 10px", textAlign: "right", color: T.textSec }}>{r.y21}</td>
                    <td style={{ padding: "8px 10px", textAlign: "right", color: T.green, fontWeight: 600 }}>{r.y22}</td>
                    <td style={{ padding: "8px 10px", textAlign: "right", color: T.textSec }}>{r.y23}</td>
                    <td style={{ padding: "8px 10px", textAlign: "right", color: T.textSec }}>{r.y24}</td>
                    <td style={{ padding: "8px 10px", textAlign: "right", color: T.text, fontWeight: 600 }}>{r.y25}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <Card T={T} style={{ padding: "18px" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: T.orange, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Balance Sheet</div>
              <p style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, margin: 0 }}>
                Debt/EBITDA risen from 1.86x (2022) to 2.60x (2024), exceeding 2.5x target. Deliberately stepping up to ~2.7x for buybacks. A-/A2/A ratings stable. Return to 2.5x by 2027.
              </p>
            </Card>
            <Card T={T} style={{ padding: "18px" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: T.green, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Capital Allocation</div>
              <p style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, margin: 0 }}>
                ~C$39B returned to shareholders over the past decade. 30 consecutive years of dividend growth (~12% CAGR). Share count reduced ~20% since 2015. One notable failure: the 2021 KCS bid.
              </p>
            </Card>
          </div>

          <Card T={T} style={{ padding: "20px 24px", borderLeft: `4px solid ${T.orange}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn }}>Quality Score: 8/10</div>
              <Pill T={T} color={T.green} bg={T.greenBg}>HIGH</Pill>
            </div>
            <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: 0 }}>
              High marks on franchise quality, capital returns history, and management credibility under Tracy Robinson. Deductions for rising leverage, FCF conversion compression, and the 2021 KCS strategic error.
            </p>
          </Card>
        </div>
      </Section>

      {/* S3-03: KPI Tree */}
      <Section id="s3-kpi">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>S3-03 / KPI TREE</div>
          <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 20 }}>Mapping drivers of intrinsic value</h2>

          <Card T={T} style={{ padding: "16px 20px", overflowX: "auto", marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: T.textTer, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>KPI Scorecard: 2022-2025</div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: Fn }}>
              <thead>
                <tr style={{ borderBottom: "2px solid " + T.border }}>
                  {["KPI", "2022", "2023", "2024", "2025", "Trend"].map(h => (
                    <th key={h} style={{ textAlign: h === "KPI" || h === "Trend" ? "left" : "right", padding: "8px 10px", fontSize: 9, color: T.textTer, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {kpiScorecard.map((r, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid " + T.border }}>
                    <td style={{ padding: "8px 10px", fontWeight: 500, color: T.text }}>{r.kpi}</td>
                    <td style={{ padding: "8px 10px", textAlign: "right", color: T.textSec }}>{r.y22}</td>
                    <td style={{ padding: "8px 10px", textAlign: "right", color: T.textSec }}>{r.y23}</td>
                    <td style={{ padding: "8px 10px", textAlign: "right", color: T.textSec }}>{r.y24}</td>
                    <td style={{ padding: "8px 10px", textAlign: "right", color: T.text, fontWeight: 600 }}>{r.y25}</td>
                    <td style={{ padding: "8px 10px", color: r.trend.includes("▲") ? T.green : T.textTer, fontSize: 11 }}>{r.trend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <Card T={T} style={{ padding: "16px 20px", overflowX: "auto" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: T.textTer, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>Peer Operating Ratio Comparison</div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: Fn }}>
              <thead>
                <tr style={{ borderBottom: "2px solid " + T.border }}>
                  {["Railroad", "2024 Adj. OR", "Q4 2025 Trend"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "8px 10px", fontSize: 9, color: T.textTer, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {peerORComparison.map((r, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid " + T.border, background: r.peer === "CN" ? T.bg : "transparent" }}>
                    <td style={{ padding: "8px 10px", fontWeight: r.peer === "CN" ? 700 : 500, color: r.peer === "CN" ? T.deepBlue : T.text }}>{r.peer}</td>
                    <td style={{ padding: "8px 10px", color: T.textSec }}>{r.or24}</td>
                    <td style={{ padding: "8px 10px", color: T.textSec, fontSize: 11 }}>{r.q4Trend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </Section>

      {/* S3-04: Variant Perception */}
      <Section id="s3-variants">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>S3-04 / VARIANT PERCEPTION</div>
          <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 20 }}>What the market is pricing vs reality</h2>

          <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, marginBottom: 20, maxWidth: 720 }}>
            The street models ~8% EPS growth in 2026 (C$8.17 consensus). Average PT of ~US$115 implies ~14% upside. CN is viewed as "steady but unexciting" — 16 buy, 13 hold, 1 sell across 30 analysts.
          </p>

          <div style={{ fontSize: 12, fontWeight: 600, color: T.green, fontFamily: Fn, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>Bull case variants</div>
          {variantBull.map((v, i) => (
            <Expandable key={i} T={T} title={v.title} tag="Underpriced" content={v.detail} color="green" />
          ))}

          <div style={{ fontSize: 12, fontWeight: 600, color: T.capRed, fontFamily: Fn, marginBottom: 12, marginTop: 24, textTransform: "uppercase", letterSpacing: "0.08em" }}>Bear case variants</div>
          {variantBear.map((v, i) => (
            <Expandable key={i} T={T} title={v.title} tag="Risk" content={v.detail} color="capRed" />
          ))}

          <Card T={T} style={{ padding: "20px 24px", borderLeft: `4px solid ${T.orange}`, marginTop: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 8 }}>What is genuinely mispriced?</div>
            <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: 0 }}>
              The market likely underprices Prince Rupert's long-term optionality and the near-term FCF inflection from capex reduction. It likely overprices the sustainability of record grain volumes. It appropriately prices tariff risk at current levels — though a CUSMA resolution could trigger rapid re-rating.
            </p>
          </Card>
        </div>
      </Section>

      {/* S3-04b: Channel Checks */}
      <Section id="s3-channels">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>S3-04b / CHANNEL CHECKS</div>
          <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 8 }}>Primary-source intelligence</h2>
          <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, marginBottom: 24, maxWidth: 720 }}>
            Shipper sentiment, competitor earnings call references, supplier/partner commentary, and independent operational data — the kind of channel checks that separate desk analysis from actionable buy-side work.
          </p>

          {channelChecks.map((cat, ci) => (
            <div key={ci} style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: T.deepBlue, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
                {cat.category}
              </div>
              {cat.items.map((item, ii) => (
                <Expandable key={ii} T={T}
                  title={item.title}
                  tag={item.signal === "positive" ? "Positive" : item.signal === "negative" ? "Negative" : "Mixed"}
                  content={item.detail + "\n\nImplication: " + item.implication}
                  color={item.signal === "positive" ? "green" : item.signal === "negative" ? "capRed" : "orange"}
                />
              ))}
            </div>
          ))}

          {/* Summary table */}
          <Card T={T} style={{ padding: "16px 20px", overflowX: "auto", marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: T.textTer, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>Channel check summary</div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: Fn }}>
              <thead>
                <tr style={{ borderBottom: "2px solid " + T.border }}>
                  {["Source", "Signal", "Implication for CN"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "8px 10px", fontSize: 9, color: T.textTer, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {channelSummary.map((r, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid " + T.border }}>
                    <td style={{ padding: "8px 10px", fontWeight: 500, color: T.text }}>{r.source}</td>
                    <td style={{ padding: "8px 10px" }}>
                      <Pill T={T}
                        color={r.signal.includes("Strongly positive") ? T.green : r.signal.includes("Positive") ? T.green : r.signal.includes("Negative") ? T.capRed : T.orange}
                        bg={r.signal.includes("positive") ? T.greenBg : r.signal.includes("Negative") ? T.redBg : "rgba(234,88,12,0.08)"}>
                        {r.signal}
                      </Pill>
                    </td>
                    <td style={{ padding: "8px 10px", color: T.textSec, fontSize: 11 }}>{r.implication}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <Card T={T} style={{ padding: "20px 24px", borderLeft: `4px solid ${T.orange}` }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 8 }}>Key takeaway for position sizing</div>
            <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, marginBottom: 10 }}>
              Channel checks reveal a bifurcated service story: CN is genuinely struggling on grain car supply (reputational and regulatory risk), but excelling on intermodal execution — the higher-growth, higher-margin segment. The Prince Rupert growth thesis is corroborated by port data, customer capital commitments, and independent metrics.
            </p>
            <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: 0 }}>
              The grain car supply data is the most concerning — it creates headline risk and potential for regulatory tightening. Want to see Ag Transport data normalize above 85% for several consecutive weeks before giving full confidence to the operational improvement narrative.
            </p>
          </Card>
        </div>
      </Section>

      {/* S3-05: Valuation Framework */}
      <Section id="s3-valuation">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>S3-05 / VALUATION FRAMEWORK</div>
          <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 20 }}>Discount to history and peers is partly justified</h2>

          <Card T={T} style={{ padding: "16px 20px", overflowX: "auto", marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: T.textTer, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>Current multiples vs history</div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: Fn }}>
              <thead>
                <tr style={{ borderBottom: "2px solid " + T.border }}>
                  {["Multiple", "Current", "5Y Avg", "5Y Low", "5Y High", "vs Average"].map(h => (
                    <th key={h} style={{ textAlign: h === "Multiple" ? "left" : "right", padding: "8px 10px", fontSize: 9, color: T.textTer, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {valuationHistory.map((r, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid " + T.border }}>
                    <td style={{ padding: "8px 10px", fontWeight: 500, color: T.text }}>{r.metric}</td>
                    <td style={{ padding: "8px 10px", textAlign: "right", color: T.text, fontWeight: 600 }}>{r.current}</td>
                    <td style={{ padding: "8px 10px", textAlign: "right", color: T.textSec }}>{r.avg5y}</td>
                    <td style={{ padding: "8px 10px", textAlign: "right", color: T.textTer }}>{r.low5y}</td>
                    <td style={{ padding: "8px 10px", textAlign: "right", color: T.textTer }}>{r.high5y}</td>
                    <td style={{ padding: "8px 10px", textAlign: "right", color: T.capRed, fontWeight: 600 }}>{r.vsAvg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <Card T={T} style={{ padding: "16px 20px", overflowX: "auto", marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: T.textTer, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>Peer valuation comparison</div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: Fn }}>
              <thead>
                <tr style={{ borderBottom: "2px solid " + T.border }}>
                  {["Peer", "Trailing P/E", "Fwd P/E", "EV/EBITDA", "P/FCF", "Div Yield", "OR", "ROIC"].map(h => (
                    <th key={h} style={{ textAlign: h === "Peer" ? "left" : "right", padding: "8px 8px", fontSize: 9, color: T.textTer, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {peerValuationTable.map((r, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid " + T.border, background: r.peer.includes("CN") ? T.bg : "transparent" }}>
                    <td style={{ padding: "8px 8px", fontWeight: r.peer.includes("CN") ? 700 : 500, color: r.peer.includes("CN") ? T.deepBlue : T.text }}>{r.peer}</td>
                    <td style={{ padding: "8px 8px", textAlign: "right", color: T.textSec }}>{r.trailingPE}</td>
                    <td style={{ padding: "8px 8px", textAlign: "right", color: T.textSec }}>{r.fwdPE}</td>
                    <td style={{ padding: "8px 8px", textAlign: "right", color: T.textSec }}>{r.evEbitda}</td>
                    <td style={{ padding: "8px 8px", textAlign: "right", color: T.textSec }}>{r.pFcf}</td>
                    <td style={{ padding: "8px 8px", textAlign: "right", color: T.textSec }}>{r.divYield}</td>
                    <td style={{ padding: "8px 8px", textAlign: "right", color: T.textSec }}>{r.or}</td>
                    <td style={{ padding: "8px 8px", textAlign: "right", color: T.textSec }}>{r.roic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <Card T={T} style={{ padding: "20px 24px", borderLeft: `4px solid ${T.green}` }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 8 }}>Justified valuation range</div>
            <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, marginBottom: 10 }}>
              Fair forward P/E of 19-21x on consensus 2026 EPS of C$8.17 implies C$155-172 (TSX) / US$111-123 (NYSE). This represents 10-22% upside from ~C$141 / ~US$101.
            </p>
            <div style={{ display: "flex", gap: 20 }}>
              {[{ l: "Bear", v: "C$130", c: T.capRed }, { l: "Base", v: "C$160", c: T.deepBlue }, { l: "Bull", v: "C$172", c: T.green }].map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 20, fontWeight: 300, color: s.c, fontFamily: Fn }}>{s.v}</div>
                  <div style={{ fontSize: 9, color: T.textTer, fontFamily: Fn, marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      {/* S3-06: Risk Matrix */}
      <Section id="s3-risks">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>S3-06 / RISK MATRIX</div>
          <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 20 }}>Probability-adjusted risk ranking</h2>

          <Card T={T} style={{ padding: "16px 20px", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: Fn }}>
              <thead>
                <tr style={{ borderBottom: "2px solid " + T.border }}>
                  {["#", "Risk", "Probability", "Impact", "Key Mitigant"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "8px 10px", fontSize: 9, color: T.textTer, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {riskMatrix.map((r, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid " + T.border }}>
                    <td style={{ padding: "8px 10px", color: T.textTer, fontWeight: 600 }}>{r.rank}</td>
                    <td style={{ padding: "8px 10px", fontWeight: 500, color: T.text }}>{r.risk}</td>
                    <td style={{ padding: "8px 10px" }}>
                      <Pill T={T} color={r.prob.includes("High") ? T.capRed : T.orange} bg={r.prob.includes("High") ? T.redBg : "rgba(234,88,12,0.08)"}>{r.prob}</Pill>
                    </td>
                    <td style={{ padding: "8px 10px" }}>
                      <Pill T={T} color={r.impact === "High" ? T.capRed : T.orange} bg={r.impact === "High" ? T.redBg : "rgba(234,88,12,0.08)"}>{r.impact}</Pill>
                    </td>
                    <td style={{ padding: "8px 10px", color: T.textTer, fontSize: 11 }}>{r.mitigant}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </Section>

      {/* S3-07: Catalysts */}
      <Section id="s3-catalysts">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>S3-07 / CATALYSTS</div>
          <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 20 }}>12-18 month catalyst horizon</h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
            {s3Catalysts.map((c, i) => (
              <Card key={i} T={T} style={{ padding: "16px 20px", display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ flexShrink: 0, textAlign: "center", minWidth: 80 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: T.deepBlue, fontFamily: Fn }}>{c.date}</div>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>{c.label}</div>
                  <p style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, margin: 0 }}>{c.detail}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Stage 3 Conclusion */}
      <Card T={T} style={{ padding: "24px", borderLeft: `4px solid ${T.deepBlue}`, marginBottom: 32 }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 12 }}>Investment conclusion</div>
        <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, marginBottom: 10 }}>
          CN Rail is a wide-moat compounder with irreplaceable physical infrastructure, durable pricing power, and improving operational execution. The stock's ~12% discount to its five-year average and ~15% discount to peers creates an entry point rare for a franchise of this quality.
        </p>
        <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, marginBottom: 10 }}>
          Three observations suggest the discount is excessive: CN's 37% overseas revenue provides more tariff insulation than narrative implies; the C$600M capex reduction creates a tangible FCF inflection; and Q4 2025's 60.1% OR demonstrates structural recovery.
        </p>
        <div style={{
          fontFamily: Fn, fontSize: 14, fontWeight: 500, color: T.text, lineHeight: 1.7,
          margin: "16px 0 0", padding: "16px 20px", background: T.bg, borderRadius: T.radiusSm,
          borderLeft: `3px solid ${T.deepBlue}`,
        }}>
          For a quality-focused fund, CN warrants a full position at current levels with a 12-month fair value target of US$115-120 (C$160-167), predicated on OR stabilization in the low 61s, FCF exceeding C$3.5B, and a constructive CUSMA outcome.
        </div>
      </Card>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* STAGE 4: VALUATION & FINANCIALS (Coming Soon)         */}
      {/* ═══════════════════════════════════════════════════════ */}

      <div id="cni-stage-4" style={{ scrollMarginTop: 120 }} />
      <Section id="s4-valuation">
        <div style={{ borderTop: `3px solid ${T.text}`, marginTop: 48, paddingTop: 40, marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <Pill T={T} color={T.purple} bg="rgba(67,56,202,0.08)">STAGE 4</Pill>
            <Pill T={T}>Valuation & Financials</Pill>
            <Pill T={T} color={T.green} bg={T.greenBg}>INTERACTIVE</Pill>
          </div>
          <h2 style={{ fontFamily: Fn, fontSize: mob ? 22 : 28, fontWeight: 300, color: T.text, margin: 0, lineHeight: 1.3 }}>
            Interactive DCF model
          </h2>
          <p style={{ fontSize: 14, color: T.textSec, marginTop: 10, fontFamily: Fn, lineHeight: 1.7, maxWidth: 720 }}>
            10-year unlevered free cash flow model with adjustable assumptions. Change WACC inputs, revenue growth, operating ratio, and terminal growth — the model recalculates in real time. Based on the Excel DCF model from the CN Rail research workbook.
          </p>
        </div>
        <InteractiveDCF T={T} />
      </Section>

      {/* S4-02: Exit Valuation / Expected Total Return */}
      <Section id="s4-exit-valuation">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", fontWeight: 600 }}>S4-02 / EXIT VALUATION</div>
            <Pill T={T} color={T.green} bg={T.greenBg}>INTERACTIVE</Pill>
          </div>
          <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 8 }}>Exit valuation & expected total return</h2>
          <p style={{ fontSize: 14, color: T.textSec, marginTop: 4, fontFamily: Fn, lineHeight: 1.7, maxWidth: 720, marginBottom: 24 }}>
            Adjust EPS growth, exit multiple, dividend assumptions, and time horizon — the model recalculates in real time. Default assumptions: 9% EPS CAGR, 20x exit P/E, 5% dividend growth.
          </p>
        </div>
        <InteractiveExitValuation T={T} />
      </Section>

      {/* ═══════════════════════════════════════════════ */}
      {/* STAGE 5 — FINANCIALS & RELATIVE VALUATION       */}
      {/* ═══════════════════════════════════════════════ */}
      <div id="cni-stage-5" style={{ scrollMarginTop: 120 }} />
      <Section id="s5-peers">
        <div style={{ borderTop: `3px solid ${T.text}`, marginTop: 48, paddingTop: 40, marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <Pill T={T} color={T.deepBlue} bg="rgba(0,102,204,0.08)">STAGE 5</Pill>
            <Pill T={T}>Financials & Relative Valuation</Pill>
            <Pill T={T} color={T.green} bg={T.greenBg}>INTERACTIVE</Pill>
          </div>
          <h2 style={{ fontFamily: Fn, fontSize: mob ? 22 : 28, fontWeight: 300, color: T.text, margin: 0, lineHeight: 1.3 }}>
            Financials, consensus estimates & peer valuation
          </h2>
          <p style={{ fontSize: 14, color: T.textSec, marginTop: 10, fontFamily: Fn, lineHeight: 1.7, maxWidth: 720 }}>
            Bloomberg-sourced peer comparison across profitability, leverage, and valuation metrics for the five publicly traded North American Class I railroads. Consensus growth estimates and forward multiples from Bloomberg BEst. Interactive cross-peer valuation chart with selectable metrics and peers.
          </p>
        </div>
        <FinancialsRelVal T={T} />
      </Section>

      {/* S5-04: Interactive Performance & Valuation Charts */}
      <Section id="s5-performance">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 36, marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", fontWeight: 600 }}>S5-04 / PERFORMANCE & VALUATION HISTORY</div>
            <Pill T={T} color={T.green} bg={T.greenBg}>INTERACTIVE</Pill>
          </div>
          <h3 style={{ fontFamily: Fn, fontSize: mob ? 18 : 22, fontWeight: 300, color: T.text, margin: 0, marginBottom: 8 }}>
            Price performance & valuation time-series
          </h3>
          <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, maxWidth: 720, marginBottom: 20 }}>
            Ten years of daily price history for the five North American Class I railroads, sourced from Bloomberg. Switch between share price (indexed to 100 at period start or in absolute terms), forward price-to-earnings, and trailing price-to-earnings multiples. Select any combination of companies and time ranges using the controls above the chart. Hover or tap to inspect values at any date. The stats strip below the price chart shows total return, period high, and drawdown from high for each selected company.
          </p>
        </div>
        <PerformanceCharts T={T} />

        {/* ── Performance commentary ── */}
        <div style={{ marginTop: 36, borderTop: "1px solid " + T.border, paddingTop: 28 }}>
          <h4 style={{ fontFamily: Fn, fontSize: mob ? 16 : 18, fontWeight: 400, color: T.text, margin: 0, marginBottom: 14 }}>
            Why CN has been the weakest performer — and why CSX led the pack
          </h4>
          <div style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.85, maxWidth: 740 }}>
            <p style={{ margin: "0 0 14px" }}>
              Over the full ten-year period, CSX roughly quintupled in share price terms while CN barely doubled, making it the weakest of the five publicly traded North American Class I railroads. The divergence reflects a combination of structural, operational, and currency-related factors.
            </p>

            <p style={{ margin: "0 0 6px", fontWeight: 600, color: T.text, fontSize: 13.5 }}>CN's underperformance</p>
            <p style={{ margin: "0 0 14px" }}>
              CN's share price stagnation reflects several compounding headwinds. First, CN is priced in Canadian dollars, and the CAD weakened meaningfully against the USD over this period — so part of the gap versus the four US-listed peers is simply currency drag. But the fundamental picture matters more. CN's volume growth has been structurally slower, partly because Canada's economy is smaller and more resource-dependent. The company's heavy exposure to forest products (in secular decline as housing starts slowed and paper demand fell) and grain (where pricing is capped by the Maximum Revenue Entitlement) limited revenue upside. CN also faced a string of operational disruptions that weighed on sentiment and earnings — the 2023 wildfire season, the August 2024 simultaneous lockout with CPKC, recurring Jasper corridor closures, and most recently the US-Canada tariff overhang which management estimated cost over C$350 million in FY 2025 revenue. CN's operating ratio improvement stalled around 61–63% while peers pushed theirs meaningfully lower. The failed Kansas City Southern acquisition attempt in 2021 — which CPKC ultimately won — was also a sentiment inflection, as investors saw CN miss out on the transformative single-line Mexico access that would have structurally repositioned the network.
            </p>

            <p style={{ margin: "0 0 6px", fontWeight: 600, color: T.text, fontSize: 13.5 }}>CSX's outperformance</p>
            <p style={{ margin: "0 0 14px" }}>
              CSX's extraordinary run was largely a Hunter Harrison story and its aftermath. Harrison took over as chief executive in March 2017 and aggressively implemented Precision Scheduled Railroading (PSR), slashing CSX's operating ratio from the high-60s to the low-60s in under two years — a margin transformation unmatched by any peer in such a compressed timeframe. The stock re-rated massively: the price-to-earnings multiple expanded from roughly 13x at the start of the period to approximately 25x today, because the market recognised that CSX's earnings power had permanently stepped up. Even after Harrison's death in late 2017, the PSR playbook was entrenched and successors continued executing. CSX also benefited from its eastern US network positioning — less exposed to Canadian trade policy risk, closer to population centres, and a beneficiary of intermodal growth along the I-95 corridor. The stock carried a "proven turnaround" premium for years. It is worth noting that CSX's recent fundamentals have weakened (EPS declined 12% year on year, revenue fell 3%), which explains the pullback from its highs — the market is starting to question whether the elevated multiple is justified now that the easy efficiency gains are behind it.
            </p>

            <p style={{ margin: "0 0 0" }}>
              In short, CN's underperformance is a product of currency drag, weaker volume growth, regulatory headwinds on its commodity mix, and repeated operational disruptions. CSX's outperformance was driven by the most dramatic operating efficiency transformation in recent railroad history, which caused a sustained P/E re-rating from the low-teens to the mid-20s.
            </p>
          </div>
        </div>
      </Section>

      {/* Disclaimer */}
      <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, lineHeight: 1.7, maxWidth: 700, paddingBottom: 40 }}>
        This analysis is for informational purposes only and does not constitute investment advice. Data sourced from CN investor relations, Bloomberg Intelligence, Bloomberg BEst consensus, AAR, STB, CTA, FHWA, NERC, IEA, and industry reports. All figures reflect publicly available data as of March 2026.
      </div>
    </div>
  );
}
