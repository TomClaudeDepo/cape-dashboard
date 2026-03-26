import { useState, useRef, useEffect } from "react";
import { Fn } from "../theme";
import { Card, Label, Pill, TabBar } from "../components/shared";
import {
  cegSnapshot, heroStats, thesisCards, thesisSections,
  moatAnalysis, competitorTable, riskTiers, kpiTree,
  monitoringPoints, chartData,
  nuclearFleetIllinois, nuclearFleetMidAtlantic, nuclearFleetOther,
  calpineCards, geoSegments, revenueStreams, hedgingStats,
  qualityCards, mgmtQuality, variants,
} from "../data/research-ceg";

/* ─── SVG chart helpers ─── */
function BarChart({ data, labels, colors, projected, title, subtitle, T, height = 220 }) {
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
          const c = colors?.[i] || T.capRed;
          return (
            <g key={i} onMouseEnter={() => setHov(i)} style={{ cursor: "pointer" }}>
              <rect x={x - bw / 2} y={y} width={bw} height={barH} rx={4} fill={c} opacity={projected?.[i] ? 0.4 : (hov === i ? 1 : 0.85)} style={{ transition: "opacity 0.15s" }} />
              {hov === i && (
                <g>
                  <rect x={x - 30} y={y - 24} width={60} height={20} rx={6} fill={T.text === "#0F172A" ? "rgba(15,23,42,0.9)" : "rgba(250,250,250,0.9)"} />
                  <text x={x} y={y - 11} textAnchor="middle" fontSize="11" fontFamily={Fn} fontWeight="600" fill={T.text === "#0F172A" ? "#fff" : "#000"}>{v}</text>
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

function HBarChart({ items, T, title, subtitle }) {
  const max = Math.max(...items.map(i => i.value)) * 1.15;
  return (
    <div>
      {title && <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>{title}</div>}
      {subtitle && <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 16 }}>{subtitle}</div>}
      {items.map((item, i) => (
        <div key={i} style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 12, color: T.textSec, fontFamily: Fn }}>{item.label}</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: T.green, fontFamily: Fn }}>{item.value}%</span>
          </div>
          <div style={{ height: 6, background: T.pillBg, borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 3, background: T.green, width: (item.value / max * 100) + "%", transition: "width 0.8s ease" }} />
          </div>
        </div>
      ))}
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
      background: T.card, border: "1px solid " + (open ? (T[color] || T.capRed) : T.border), borderRadius: T.radius,
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
  return <div id={`ceg-${id}`} style={{ scrollMarginTop: 80 }}>{children}</div>;
}

export default function ResearchCEG({ T }) {
  const scrollTo = id => {
    const el = document.getElementById("ceg-" + id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const colorMap = { orange: T.orange, capRed: T.capRed, deepBlue: T.deepBlue, green: T.green, purple: T.purple };
  const bgMap = { orange: "rgba(234,88,12,0.08)", capRed: T.redBg, deepBlue: "rgba(29,78,216,0.08)", green: T.greenBg, purple: "rgba(67,56,202,0.08)" };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <Pill T={T} color={T.green} bg={T.greenBg}>EQUITY RESEARCH</Pill>
          <Pill T={T}>Deep Dive</Pill>
          <Pill T={T}>March 2026</Pill>
        </div>
        <h1 style={{ fontFamily: Fn, fontSize: 32, fontWeight: 300, letterSpacing: "-0.03em", color: T.text, margin: 0, lineHeight: 1.3 }}>
          Constellation Energy <span style={{ color: T.textTer, fontWeight: 400 }}>(CEG)</span>
        </h1>
        <p style={{ fontSize: 14, color: T.textSec, marginTop: 10, fontFamily: Fn, lineHeight: 1.7, maxWidth: 720 }}>
          Anatomy of a structural supercycle. Constellation sits at the nexus of the most powerful forces in American energy: AI-driven demand explosion, nuclear renaissance, collapsing reserve margins, and a decade of policy tailwinds.
        </p>
      </div>

      {/* Snapshot */}
      <Card T={T} style={{ marginBottom: 24, padding: "20px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: T.textTer, fontFamily: Fn, letterSpacing: "0.05em" }}>CEG</span>
            <span style={{ fontSize: 28, fontWeight: 300, fontFamily: Fn, color: T.text }}>{cegSnapshot.price}</span>
            <Pill T={T} color={T.green} bg={T.greenBg}>{cegSnapshot.ytdChg}</Pill>
          </div>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {[
              { l: "Forward P/E", v: cegSnapshot.forwardPE },
              { l: "Fleet", v: cegSnapshot.capacity },
              { l: "Nuclear", v: cegSnapshot.nuclearCapacity },
              { l: "Revenue", v: cegSnapshot.revenue },
              { l: "Adj. EPS", v: cegSnapshot.adjEPS },
              { l: "Cap Factor", v: cegSnapshot.capacityFactor },
            ].map((m, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: T.green, fontFamily: Fn }}>{m.v}</div>
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
      <Label T={T}>Six structural forces — converging on one company</Label>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 48 }}>
        {thesisCards.map((card, i) => (
          <div key={i} onClick={() => scrollTo(card.id)} style={{
            background: T.card, border: "1px solid " + T.border, borderRadius: T.radius,
            padding: "22px 20px", cursor: "pointer", boxShadow: T.shadow, transition: "all 0.2s",
            borderTop: `3px solid ${colorMap[card.color] || T.capRed}`,
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
            {sec.id === "capacity-crisis" && (
              <Card T={T} style={{ padding: "18px 20px", marginBottom: 24 }}>
                <BarChart T={T} title="PJM capacity prices ($/MW-day)" subtitle="10x increase in 3 auction cycles — at FERC cap"
                  data={chartData.capacityPrices.values} labels={chartData.capacityPrices.labels}
                  projected={chartData.capacityPrices.projected} colors={chartData.capacityPrices.labels.map(() => T.capRed)} />
              </Card>
            )}
            {sec.id === "gas-spread" && (
              <Card T={T} style={{ padding: "18px 20px", marginBottom: 24 }}>
                <BarChart T={T} title="Henry Hub natural gas ($/MMBtu)" subtitle="Rising gas prices widen nuclear's structural margin"
                  data={chartData.gasPrices.values} labels={chartData.gasPrices.labels}
                  projected={chartData.gasPrices.projected} colors={chartData.gasPrices.labels.map(() => T.orange)} />
              </Card>
            )}
            {sec.id === "ai-demand" && (
              <Card T={T} style={{ padding: "18px 20px", marginBottom: 24 }}>
                <BarChart T={T} title="US data center electricity demand (TWh)" subtitle="IEA projects 130% increase from 2024 to 2030"
                  data={chartData.dcDemand.values} labels={chartData.dcDemand.labels}
                  projected={chartData.dcDemand.projected} colors={chartData.dcDemand.labels.map(() => T.deepBlue)} />
              </Card>
            )}
            {sec.id === "nuclear-renaissance" && (
              <Card T={T} style={{ padding: "18px 20px", marginBottom: 24 }}>
                <HBarChart T={T} title="Capacity factor comparison (%)" subtitle="Nuclear's 95% utilisation is unmatched by any other source"
                  items={chartData.nuclearVsOther} />
              </Card>
            )}

            <div style={{ maxWidth: 720, marginBottom: 24 }}>
              {sec.paragraphs.map((p, i) => (
                <p key={i} style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, marginBottom: 14 }}>{p}</p>
              ))}
            </div>

            {sec.pullQuote && (
              <div style={{ fontFamily: Fn, fontSize: 16, fontWeight: 300, color: T.text, lineHeight: 1.6, margin: "24px 0", paddingLeft: 20, borderLeft: `3px solid ${colorMap[thesisCards[si]?.color] || T.capRed}`, maxWidth: 720, fontStyle: "italic" }}>
                {sec.pullQuote}
              </div>
            )}

            {sec.expandables?.map((ex, i) => (
              <Expandable key={i} T={T} title={ex.title} tag={ex.tag} content={ex.content} color={thesisCards[si]?.color} />
            ))}

            <Card T={T} style={{ marginTop: 20, padding: "20px 24px", borderLeft: `4px solid ${colorMap[thesisCards[si]?.color] || T.capRed}` }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 12 }}>{sec.capture.title}</div>
              {sec.capture.points.map((p, i) => (
                <p key={i} style={{ fontSize: 13, color: T.textSec, lineHeight: 1.75, fontFamily: Fn, marginBottom: 8, paddingLeft: 12, borderLeft: "2px solid " + T.border }}>{p}</p>
              ))}
            </Card>
          </div>
        </Section>
      ))}

      {/* ═══ BUSINESS PRIMER SECTIONS ═══ */}

      {/* Nuclear Fleet Detail */}
      <Section id="fleet">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>CROWN JEWEL</div>
          <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 8 }}>The nuclear fleet</h2>
          <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, marginBottom: 20, lineHeight: 1.7, maxWidth: 720 }}>14 stations, 25 reactor units, 6 states — the largest and best-operated fleet in the United States.</p>

          <Card T={T} style={{ padding: "16px 20px", marginBottom: 16, borderLeft: `4px solid ${T.green}` }}>
            <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.75, fontFamily: Fn, margin: 0 }}>
              <strong style={{ color: T.text }}>Unit economics:</strong> Nuclear plants run 24/7 at ~95% capacity factor with ~$5.50/MWh fuel cost. At $50/MWh wholesale (set by gas), margin is ~$44.50/MWh. The IRA PTC floors revenue at ~$43.75/MWh when prices are low — downside protected, full upside preserved. Every 1% capacity factor improvement across 22 GW at $50/MWh = ~$96M in annual revenue.
            </p>
          </Card>

          {[
            { label: "Illinois Fleet (Midwest)", data: nuclearFleetIllinois },
            { label: "Mid-Atlantic Fleet", data: nuclearFleetMidAtlantic },
            { label: "New York & Texas", data: nuclearFleetOther },
          ].map((fleet, fi) => (
            <div key={fi} style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: T.green, fontFamily: Fn, letterSpacing: "0.05em", marginBottom: 8, textTransform: "uppercase" }}>{fleet.label}</div>
              <Card T={T} style={{ padding: "12px 16px", overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: Fn }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid " + T.border }}>
                      {["Station", "Units", "Capacity", "Type", "Location", "License"].map(h => (
                        <th key={h} style={{ textAlign: "left", padding: "8px 10px", fontSize: 9, color: T.textTer, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {fleet.data.map((r, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid " + T.border }}>
                        <td style={{ padding: "8px 10px", fontWeight: 600, color: r.highlight ? T.green : T.text }}>{r.station}</td>
                        <td style={{ padding: "8px 10px", color: T.textSec }}>{r.units}</td>
                        <td style={{ padding: "8px 10px", color: T.green, fontWeight: 600, fontFeatureSettings: '"tnum"' }}>{r.capacity}</td>
                        <td style={{ padding: "8px 10px", color: T.textTer }}>{r.type}</td>
                        <td style={{ padding: "8px 10px", color: T.textSec }}>{r.location}</td>
                        <td style={{ padding: "8px 10px", color: T.textTer, fontFeatureSettings: '"tnum"' }}>{r.license}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>
          ))}
        </div>
      </Section>

      {/* Calpine Acquisition */}
      <Section id="calpine">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>TRANSFORMATIVE DEAL</div>
          <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 8 }}>The Calpine acquisition</h2>
          <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, marginBottom: 20, lineHeight: 1.7, maxWidth: 720 }}>
            $26.6B deal creating a 55 GW integrated platform. On January 7, 2026, Constellation completed its acquisition of Calpine, adding ~23 GW across 72 generating and battery storage assets, ~62 TWh of additional retail load, and ~2,500 employees.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {calpineCards.map((c, i) => (
              <Card key={i} T={T} style={{ padding: "20px", borderTop: `3px solid ${colorMap[c.color] || T.capRed}` }}>
                <div style={{ fontSize: 20, marginBottom: 10 }}>{c.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 6 }}>{c.title}</div>
                <p style={{ fontSize: 12, color: T.textSec, lineHeight: 1.65, fontFamily: Fn, margin: 0 }}>{c.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Geographic Segments */}
      <Section id="segments">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>GEOGRAPHIC REACH</div>
          <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 8 }}>Five operating segments</h2>
          <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, marginBottom: 20, lineHeight: 1.7 }}>Each segment represents a distinct RTO/ISO market region.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
            {geoSegments.map((seg, i) => (
              <Card key={i} T={T} style={{ padding: "18px", borderLeft: `3px solid ${colorMap[seg.color] || T.capRed}` }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 2 }}>{seg.name}</div>
                <Pill T={T} color={colorMap[seg.color]} bg={bgMap[seg.color]}>{seg.market}</Pill>
                <p style={{ fontSize: 12, color: T.textSec, lineHeight: 1.65, fontFamily: Fn, marginTop: 8, margin: "8px 0 0" }}>{seg.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Revenue Mechanics */}
      <Section id="revenue">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>REVENUE MECHANICS</div>
          <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 8 }}>How Constellation makes money</h2>
          <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, marginBottom: 20, lineHeight: 1.7 }}>Six interlocking revenue streams creating a resilient earnings architecture.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {revenueStreams.map((rs, i) => (
              <Card key={i} T={T} style={{ padding: "18px", borderTop: `3px solid ${colorMap[rs.color] || T.capRed}` }}>
                <div style={{ fontSize: 18, marginBottom: 8 }}>{rs.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 6 }}>{rs.title}</div>
                <p style={{ fontSize: 12, color: T.textSec, lineHeight: 1.65, fontFamily: Fn, margin: 0 }}>{rs.text}</p>
              </Card>
            ))}
          </div>
          <Card T={T} style={{ marginTop: 16, padding: "16px 20px", borderLeft: `4px solid ${T.deepBlue}` }}>
            <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.75, fontFamily: Fn, margin: 0 }}>
              <strong style={{ color: T.text }}>Gross margin mechanism:</strong> The key profitability metric is adjusted gross margin — the spread between selling price and generation/procurement cost. For nuclear alone, this margin is ~80%+ because marginal fuel cost is ~$5.50/MWh while selling prices are $40–60/MWh or higher.
            </p>
          </Card>
        </div>
      </Section>

      {/* Hedging Architecture */}
      <Section id="hedging">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>RISK MANAGEMENT</div>
          <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 8 }}>The hedging architecture</h2>
          <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, marginBottom: 20, lineHeight: 1.7, maxWidth: 720 }}>
            Constellation forward-sells 85–95% of expected near-term generation at locked-in prices. The hedging ratio declines for future years, preserving upside optionality. The retail book provides an additional natural hedge. The IRA nuclear PTC functions as a "government put option" — creating a business with a well-defined earnings floor and significant upside.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {hedgingStats.map((h, i) => (
              <Card key={i} T={T} style={{ padding: "20px", textAlign: "center" }}>
                <div style={{ fontSize: 26, fontWeight: 300, fontFamily: Fn, color: colorMap[h.color] || T.text, lineHeight: 1.2 }}>{h.value}</div>
                <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginTop: 8, lineHeight: 1.5 }}>{h.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Quality Assessment */}
      <Section id="quality">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>QUALITY ASSESSMENT</div>
          <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 8 }}>What kind of business is this?</h2>

          <div style={{ fontSize: 12, fontWeight: 600, color: T.textTer, fontFamily: Fn, letterSpacing: "0.06em", marginBottom: 10, textTransform: "uppercase" }}>Financial quality</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
            {qualityCards.map((qc, i) => (
              <Card key={i} T={T} style={{ padding: "18px" }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 6 }}>{qc.title}</div>
                <p style={{ fontSize: 12, color: T.textSec, lineHeight: 1.7, fontFamily: Fn, margin: 0 }}>{qc.text}</p>
              </Card>
            ))}
          </div>

          <div style={{ fontSize: 12, fontWeight: 600, color: T.textTer, fontFamily: Fn, letterSpacing: "0.06em", marginBottom: 10, textTransform: "uppercase" }}>Management quality</div>
          <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.8, fontFamily: Fn, marginBottom: 20, maxWidth: 720 }}>{mgmtQuality}</p>

          <Card T={T} style={{ padding: "20px 24px", borderLeft: `4px solid ${T.green}` }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 8 }}>Quality score: <span style={{ color: T.green }}>High</span></div>
            <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.75, fontFamily: Fn, margin: 0 }}>
              The core nuclear business is one of the highest-quality power generation businesses in the world. Near-zero marginal cost, 95% utilisation, policy-protected downside, structural demand tailwinds, and superb management execution.
            </p>
          </Card>
        </div>
      </Section>

      {/* Variants & Alpha */}
      <Section id="variants">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>ALPHA GENERATION</div>
          <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 8 }}>Variants & differentiated insights</h2>
          <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, marginBottom: 20, lineHeight: 1.7 }}>Consensus: 14 Buy, 5 Hold, 0 Sell. Avg PT ~$397 vs ~$300 price. What could the market be missing?</p>
          {variants.map((v, i) => (
            <Card key={i} T={T} style={{ padding: "18px 20px", marginBottom: 12, borderLeft: `4px solid ${v.type === "bull" ? T.green : T.capRed}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <Pill T={T} color={v.type === "bull" ? T.green : T.capRed} bg={v.type === "bull" ? T.greenBg : T.redBg}>{v.type === "bull" ? "Bull" : "Bear"}</Pill>
                <span style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn }}>{v.title}</span>
              </div>
              <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.75, fontFamily: Fn, margin: 0 }}>{v.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Moat Analysis */}
      <Section id="moat">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>07 / COMPETITIVE MOAT</div>
          <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 8 }}>Moat analysis: Strong and widening</h2>
          <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, marginBottom: 20, lineHeight: 1.7 }}>
            The moat is not brand or network — it is physical. 22 GW of irreplaceable, already-interconnected, near-zero-marginal-cost nuclear assets in a structurally supply-constrained market.
          </p>
          <Card T={T} style={{ padding: "16px 20px", overflowX: "auto", marginBottom: 20 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: Fn }}>
              <thead>
                <tr style={{ borderBottom: "2px solid " + T.border }}>
                  {["Moat Source", "Strength", "Evidence", "Durability"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontSize: 9, color: T.textTer, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {moatAnalysis.map((m, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid " + T.border }}>
                    <td style={{ padding: "10px 12px", fontWeight: 500, color: T.text }}>{m.source}</td>
                    <td style={{ padding: "10px 12px" }}><Pill T={T} color={m.strength === "Exceptional" ? T.green : m.strength === "Strong" ? T.green : T.textSec} bg={m.strength === "Exceptional" || m.strength === "Strong" ? T.greenBg : T.pillBg}>{m.strength}</Pill></td>
                    <td style={{ padding: "10px 12px", color: T.textSec, fontSize: 11 }}>{m.evidence}</td>
                    <td style={{ padding: "10px 12px", color: T.textTer, fontSize: 11 }}>{m.durability}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          {/* Competitors */}
          <Card T={T} style={{ padding: "16px 20px", overflowX: "auto" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 12 }}>Top 5 US competitive generators</div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: Fn }}>
              <thead>
                <tr style={{ borderBottom: "2px solid " + T.border }}>
                  {["Company", "Capacity", "Nuclear", "Market Cap", "Differentiation"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "10px 10px", fontSize: 9, color: T.textTer, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {competitorTable.map((c, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid " + T.border, background: i === 0 ? T.greenBg : "transparent" }}>
                    <td style={{ padding: "9px 10px", fontWeight: i === 0 ? 600 : 400, color: T.text }}>{c.name}</td>
                    <td style={{ padding: "9px 10px", color: T.textSec, fontFeatureSettings: '"tnum"' }}>{c.capacity}</td>
                    <td style={{ padding: "9px 10px", color: T.textSec, fontFeatureSettings: '"tnum"' }}>{c.nuclear}</td>
                    <td style={{ padding: "9px 10px", color: T.textSec, fontFeatureSettings: '"tnum"' }}>{c.mktCap}</td>
                    <td style={{ padding: "9px 10px", color: T.textTer, fontSize: 11 }}>{c.diff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </Section>

      {/* Risk Assessment */}
      <Section id="risks">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>08 / RISK ASSESSMENT</div>
          <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 20 }}>Risks & red flags</h2>
          {riskTiers.map((tier, ti) => (
            <div key={ti} style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <Pill T={T} color={ti === 0 ? T.capRed : ti === 1 ? T.orange : T.textSec} bg={ti === 0 ? T.redBg : ti === 1 ? "rgba(234,88,12,0.08)" : T.pillBg}>Tier {tier.tier}</Pill>
                <span style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn }}>{tier.label}</span>
              </div>
              {tier.risks.map((r, ri) => (
                <Expandable key={ri} T={T} title={r.risk} tag={`${r.prob} / ${r.severity}`} content={r.detail} color={ti === 0 ? "capRed" : ti === 1 ? "orange" : "deepBlue"} />
              ))}
            </div>
          ))}
        </div>
      </Section>

      {/* Key Monitoring Points */}
      <Section id="monitor">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>09 / MONITORING</div>
          <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 20 }}>3 key datapoints to watch</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {monitoringPoints.map((mp, i) => (
              <Card key={i} T={T} style={{ padding: "20px", borderTop: `3px solid ${T.green}` }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 6 }}>{mp.metric}</div>
                <Pill T={T} color={T.deepBlue} bg="rgba(29,78,216,0.08)">{mp.next}</Pill>
                <p style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, marginTop: 10, margin: "10px 0 0" }}>{mp.why}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Conclusion */}
      <Card T={T} style={{ padding: "24px", borderLeft: `4px solid ${T.green}`, marginBottom: 24 }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 12 }}>Investment conclusion</div>
        <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, marginBottom: 10 }}>
          At ~$300/share, Constellation trades at ~25x forward earnings and ~$5.5M/MW of nuclear capacity. This is a structural compounder with cyclical amplifiers — the best-positioned asset in American electricity markets at a time when electricity is becoming the most important commodity in the economy.
        </p>
        <div style={{ fontFamily: Fn, fontSize: 14, fontWeight: 500, color: T.text, lineHeight: 1.7, margin: "16px 0 0", padding: "16px 20px", background: T.bg, borderRadius: T.radiusSm, borderLeft: `3px solid ${T.green}` }}>
          Higher data center demand tightens reserve margins, which raises capacity prices, which increases the value of nuclear assets, which attracts premium PPAs, which funds uprates and restarts, which further entrenches Constellation's position. This flywheel effect, combined with 5+ year lag for new supply, suggests structural advantages are widening.
        </div>
      </Card>

      <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, lineHeight: 1.7, maxWidth: 700, paddingBottom: 40 }}>
        Institutional Equity Research — Deep Dive Analysis. Part III of the Constellation Energy Research Series. For informational purposes only. Not investment advice.
      </div>
    </div>
  );
}
