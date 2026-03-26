import { useState, useRef, useEffect } from "react";
import { Fn } from "../theme";
import { Card, Label, Pill } from "../components/shared";
import {
  cniSnapshot, heroStats, thesisCards, thesisSections,
  competitorTable, commodityMix, riskTiers, railVsTrucking,
  monitoringPoints, chartData,
  primerSnapshot, networkCards, revenueTable, operatingMetrics,
  capitalAllocation, peerComparison, businessRisks,
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
  return <div id={`cni-${id}`} style={{ scrollMarginTop: 80 }}>{children}</div>;
}

export default function ResearchCNI({ T }) {
  const scrollTo = id => {
    const el = document.getElementById("cni-" + id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const colorMap = { orange: T.orange, capRed: T.capRed, deepBlue: T.deepBlue, green: T.green, purple: T.purple };
  const bgMap = { orange: "rgba(234,88,12,0.08)", capRed: T.redBg, deepBlue: "rgba(29,78,216,0.08)", green: T.greenBg, purple: "rgba(67,56,202,0.08)" };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <Pill T={T} color={T.deepBlue} bg="rgba(29,78,216,0.08)">EQUITY RESEARCH</Pill>
          <Pill T={T}>Thematic Analysis</Pill>
          <Pill T={T}>March 2026</Pill>
        </div>
        <h1 style={{ fontFamily: Fn, fontSize: 32, fontWeight: 300, letterSpacing: "-0.03em", color: T.text, margin: 0, lineHeight: 1.3 }}>
          Canadian National Railway <span style={{ color: T.textTer, fontWeight: 400 }}>(CNI)</span>
        </h1>
        <p style={{ fontSize: 14, color: T.textSec, marginTop: 10, fontFamily: Fn, lineHeight: 1.7, maxWidth: 720 }}>
          North American freight rail: structural forces shaping CN's positioning. The continent's only tri-coastal network faces its most dynamic competitive period since Staggers Act deregulation in 1980.
        </p>
      </div>

      {/* Snapshot */}
      <Card T={T} style={{ marginBottom: 24, padding: "20px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: T.textTer, fontFamily: Fn, letterSpacing: "0.05em" }}>CNI</span>
            <span style={{ fontSize: 28, fontWeight: 300, fontFamily: Fn, color: T.text }}>{cniSnapshot.price}</span>
            <Pill T={T} color={T.capRed} bg={T.redBg}>{cniSnapshot.ytdChg} YTD</Pill>
          </div>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10, marginBottom: 32 }}>
        {heroStats.map((s, i) => (
          <div key={i} style={{ background: T.card, border: "1px solid " + T.border, borderRadius: T.radius, padding: "16px 14px", textAlign: "center", boxShadow: T.shadow }}>
            <div style={{ fontSize: 22, fontWeight: 300, fontFamily: Fn, color: T[s.color] || T.text, lineHeight: 1.2 }}>{s.value}</div>
            <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 6, lineHeight: 1.4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Thesis overview grid */}
      <Label T={T}>Seven secular forces converging on freight rail</Label>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 48 }}>
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

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 24 }}>
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
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

      <div style={{ borderTop: `3px solid ${T.text}`, marginTop: 48, paddingTop: 40, marginBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <Pill T={T} color={T.deepBlue} bg="rgba(29,78,216,0.08)">STAGE 2</Pill>
          <Pill T={T}>Business Primer</Pill>
        </div>
        <h2 style={{ fontFamily: Fn, fontSize: 28, fontWeight: 300, color: T.text, margin: 0, lineHeight: 1.3 }}>
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 1, background: T.border, borderRadius: T.radiusSm, overflow: "hidden", marginBottom: 24 }}>
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {businessRisks.map((r, i) => (
              <Card key={i} T={T} style={{ padding: "20px" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: T.capRed, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>{r.title}</div>
                <p style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, margin: 0 }}>{r.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Proceed to Stage 3 */}
      <Card T={T} style={{ padding: "20px 24px", borderLeft: `4px solid ${T.textTer}`, marginBottom: 32 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: T.textTer, fontFamily: Fn, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 6 }}>Next Steps</div>
        <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: 0 }}>
          With the business model now mapped, Stage 3 will apply an institutional investment framework to CN — assessing moat durability, building the KPI tree, identifying variant perceptions, and scoring quality.
        </p>
      </Card>

      {/* Disclaimer */}
      <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, lineHeight: 1.7, maxWidth: 700, paddingBottom: 40 }}>
        This analysis is for informational purposes only and does not constitute investment advice. Data sourced from CN investor relations, AAR, STB, CTA, FHWA, NERC, IEA, and industry reports. All figures reflect publicly available data as of March 2026.
      </div>
    </div>
  );
}
