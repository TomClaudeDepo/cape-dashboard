import { useState, useRef, useEffect } from "react";
import { Fn } from "../theme";
import { Card, Label, Pill } from "../components/shared";
import {
  cniSnapshot, heroStats, thesisCards, thesisSections,
  competitorTable, commodityMix, riskTiers, railVsTrucking,
  monitoringPoints, chartData,
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

      {/* Disclaimer */}
      <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, lineHeight: 1.7, maxWidth: 700, paddingBottom: 40 }}>
        This analysis is for informational purposes only and does not constitute investment advice. Data sourced from CN investor relations, AAR, STB, CTA, FHWA, NERC, IEA, and industry reports. All figures reflect publicly available data as of March 2026.
      </div>
    </div>
  );
}
