import { useState, useRef, useEffect } from "react";
import { Fn, Fh } from "../theme";
import { Card, Pill, Label } from "../components/shared";
import {
  nxtSnapshot, heroStats, productCards, competitorTable,
  moatSources, segmentEvolution, revenueByRegion, financials,
  revenueChartData, fcfChartData, kpiTable, mgmt,
  capitalAllocation, policyLandscape, timeline,
  demandDrivers, keyQuestions,
} from "../data/research-nxt";

/* ─── SVG chart helpers ─── */
function BarChart({ data, labels, colors, projected, title, subtitle, T, height = 220, unit = "" }) {
  const max = Math.max(...data) * 1.15;
  const W = 520, H = height, pad = { t: 16, r: 20, b: 32, l: 10 };
  const w = W - pad.l - pad.r, h = H - pad.t - pad.b;
  const bw = Math.min(48, (w / data.length) * 0.55);
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
              <rect x={x - bw / 2} y={y} width={bw} height={barH} rx={4} fill={c} opacity={projected?.[i] ? 0.4 : (hov === i ? 1 : 0.85)} style={{ transition: "opacity 0.15s" }} />
              {hov === i && (
                <g>
                  <rect x={x - 32} y={y - 24} width={64} height={20} rx={6} fill={T.text === "#0F172A" ? "rgba(15,23,42,0.9)" : "rgba(250,250,250,0.9)"} />
                  <text x={x} y={y - 11} textAnchor="middle" fontSize="11" fontFamily={Fn} fontWeight="600" fill={T.text === "#0F172A" ? "#fff" : "#000"}>{unit}{v}</text>
                </g>
              )}
              {labels?.[i] && <text x={x} y={H - 6} textAnchor="middle" fontSize="10" fill={T.textTer} fontFamily={Fn}>{labels[i]}</text>}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function HBar({ items, T, title, subtitle, showPct = true }) {
  const max = Math.max(...items.map(i => i.pct || i.value || 0)) * 1.15;
  return (
    <div>
      {title && <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>{title}</div>}
      {subtitle && <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 16 }}>{subtitle}</div>}
      {items.map((item, i) => (
        <div key={i} style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 12, color: T.textSec, fontFamily: Fn }}>{item.label || item.region || item.category}</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: T[item.color] || T.deepBlue, fontFamily: Fn }}>
              {showPct ? (item.pct || item.share) + "%" : item.value}
            </span>
          </div>
          <div style={{ height: 6, background: T.pillBg, borderRadius: 3, overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 3,
              background: T[item.color] || T.deepBlue,
              width: ((item.pct || item.share || item.value) / max * 100) + "%",
              transition: "width 0.8s ease",
            }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Expandable section ─── */
function Expandable({ title, tag, children, color, T, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const innerRef = useRef(null);
  const [maxH, setMaxH] = useState(0);
  useEffect(() => { if (innerRef.current) setMaxH(innerRef.current.scrollHeight); }, [open, children]);
  return (
    <div onClick={() => setOpen(!open)} style={{
      background: T.card, borderRadius: T.radius, border: "1px solid " + T.border,
      overflow: "hidden", cursor: "pointer", transition: "all 0.2s",
      boxShadow: open ? T.shadowLg : T.shadow,
    }}>
      <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, flex: 1 }}>{title}</span>
        {tag && <Pill T={T} color={T[color]} bg={color === "green" ? T.greenBg : color === "capRed" ? T.redBg : T.pillBg}>{tag}</Pill>}
        <span style={{ fontSize: 16, color: T.textTer, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
      </div>
      <div style={{ maxHeight: open ? maxH + 20 : 0, overflow: "hidden", transition: "max-height 0.35s ease" }}>
        <div ref={innerRef} onClick={e => e.stopPropagation()} style={{ padding: "0 20px 20px", cursor: "default" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ─── Tab bar (local) ─── */
function Tabs({ tabs, active, onChange, T }) {
  return (
    <div style={{ display: "flex", gap: 4, background: T.pillBg, borderRadius: T.radiusSm, padding: 3, marginBottom: 24 }}>
      {tabs.map(t => (
        <button key={t} onClick={() => onChange(t)} style={{
          padding: "8px 16px", borderRadius: 6, border: "none", fontSize: 12, fontFamily: Fn,
          fontWeight: active === t ? 600 : 400,
          background: active === t ? T.card : "transparent",
          color: active === t ? T.text : T.textTer,
          cursor: "pointer", transition: "all 0.15s",
          boxShadow: active === t ? T.shadow : "none",
        }}>{t}</button>
      ))}
    </div>
  );
}

/* ─── Moat bar rating ─── */
function MoatBar({ source, T }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: 14 }}>
      <div onClick={() => setOpen(!open)} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: T.text, fontFamily: Fn, flex: 1 }}>{source.title}</span>
        <div style={{ display: "flex", gap: 3 }}>
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} style={{
              width: 18, height: 6, borderRadius: 3,
              background: i <= source.strength ? T.green : T.pillBg,
              transition: "background 0.3s",
            }} />
          ))}
        </div>
      </div>
      {open && (
        <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.65, paddingLeft: 4, paddingBottom: 6 }}>
          {source.detail}
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ════════════════════════════════════════════════════════════════ */
export default function ResearchNXT({ T }) {
  const [tab, setTab] = useState("Overview");
  const tabs = ["Overview", "Products", "Competitive Position", "Financials", "Management", "Risks & Policy", "Timeline"];

  const section = (title, children, style = {}) => (
    <div style={{ marginBottom: 32, ...style }}>
      {title && <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 16, letterSpacing: "-0.01em" }}>{title}</div>}
      {children}
    </div>
  );

  const prose = (text, style = {}) => (
    <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: "0 0 12px", ...style }}>{text}</p>
  );

  /* ─── HEADER (always visible) ─── */
  const header = (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
        <span style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 36, color: T.text }}>Nextpower</span>
        <span style={{ fontSize: 14, fontWeight: 600, color: T.textTer, fontFamily: Fn, letterSpacing: "0.04em" }}>NXT US</span>
        <Pill T={T} color={T.orange} bg="rgba(234,88,12,0.08)">Business Primer</Pill>
      </div>
      <div style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, marginBottom: 16 }}>
        Nasdaq · Fremont, California · FY ends March 31 · Market cap ~$17B · No dividend
      </div>

      {/* Hero stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10 }}>
        {heroStats.map((s, i) => (
          <div key={i} style={{ background: T.card, borderRadius: T.radiusSm, padding: "14px 16px", border: "1px solid " + T.border }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: T[s.color] || T.text, fontFamily: Fn }}>{s.value}</div>
            <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 3, lineHeight: 1.4 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );

  /* ─── TAB: OVERVIEW ─── */
  const overviewTab = (
    <div>
      {section("Company Overview",
        <>
          {prose("Nextpower is the world's largest supplier of solar tracking systems for utility-scale solar power plants. The company designs, engineers, and delivers single-axis trackers — mechanical structures that rotate rows of solar panels to follow the sun — along with a growing portfolio of adjacent technologies spanning foundations, electrical balance-of-system, software, robotics, and power conversion. It serves over 40 countries, has shipped more than 150 GW of cumulative tracker capacity, and has held the #1 global market share position for ten consecutive years.")}
          {prose("Founded in 2014 when Solaria Corporation spun off its tracker technology, acquired by Flextronics for $330M in 2015, IPO'd in February 2023 (largest US IPO that year at $638M), and completed full separation from Flex in January 2024. Rebranded from Nextracker to Nextpower in November 2025, signalling the evolution from pure-play tracker supplier to full-platform integrated solar technology provider.")}
        </>
      )}

      {section("Structural Demand Drivers",
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 10 }}>
          {demandDrivers.map((d, i) => (
            <Expandable key={i} title={d.driver} T={T} color="deepBlue">
              {prose(d.detail)}
            </Expandable>
          ))}
        </div>
      )}

      {section("Revenue Mix Evolution",
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          <Card T={T} style={{ padding: 20 }}>
            <HBar items={segmentEvolution.current} T={T} title="Current (~FY2025)" subtitle="Tracker-dominated" />
          </Card>
          <Card T={T} style={{ padding: 20 }}>
            <HBar items={segmentEvolution.target2030} T={T} title="FY2030 Target" subtitle="~1/3 non-tracker by 2030" />
          </Card>
        </div>
      )}

      {section("Revenue by Region",
        <Card T={T} style={{ padding: 20 }}>
          <HBar items={revenueByRegion} T={T} title="Geographic Revenue Mix (approximate)" subtitle="US dominant at ~65–75% of quarterly revenue" />
          <div style={{ marginTop: 16, display: "grid", gap: 8 }}>
            {revenueByRegion.map((r, i) => (
              <div key={i} style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.6, padding: "8px 10px", background: T.pillBg, borderRadius: T.radiusSm }}>
                <span style={{ fontWeight: 600, color: T[r.color] }}>{r.region}: </span>{r.detail}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );

  /* ─── TAB: PRODUCTS ─── */
  const productsTab = (
    <div>
      {productCards.map(p => (
        <div key={p.id} style={{ marginBottom: 20 }}>
          <Card T={T} style={{ padding: 0, overflow: "hidden", borderTop: `3px solid ${T[p.color]}` }}>
            <div style={{ padding: "20px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: T[p.color], fontFamily: Fn }}>{p.num}</span>
                <span style={{ fontSize: 16, fontWeight: 600, color: T.text, fontFamily: Fn }}>{p.title}</span>
                <Pill T={T} color={T[p.color]} bg={p.color === "green" ? T.greenBg : p.color === "purple" ? (T.purple100 || "rgba(67,56,202,0.08)") : "rgba(29,78,216,0.08)"}>{p.tag}</Pill>
              </div>
              {prose(p.desc)}
              <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
                {p.variants.map((v, i) => (
                  <Expandable key={i} title={v.name} T={T} color={p.color}>
                    {prose(v.detail)}
                  </Expandable>
                ))}
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );

  /* ─── TAB: COMPETITIVE POSITION ─── */
  const competitiveTab = (
    <div>
      {section("Global Tracker Market (Wood Mackenzie 2025)",
        <Card T={T} style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: Fn, fontSize: 12 }}>
              <thead>
                <tr style={{ borderBottom: "2px solid " + T.border }}>
                  {["Rank", "Company", "HQ", "Notes"].map(h => (
                    <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: T.textTer, fontSize: 10, letterSpacing: "0.05em", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {competitorTable.map((r, i) => (
                  <tr key={i} style={{
                    borderBottom: "1px solid " + T.border,
                    background: r.highlight ? (T.text === "#0F172A" ? "rgba(29,78,216,0.04)" : "rgba(96,165,250,0.06)") : "transparent",
                  }}>
                    <td style={{ padding: "10px 16px", fontWeight: 600, color: T.textTer }}>{r.rank}</td>
                    <td style={{ padding: "10px 16px", fontWeight: r.highlight ? 700 : 500, color: r.highlight ? T.deepBlue : T.text }}>{r.company}</td>
                    <td style={{ padding: "10px 16px", color: T.textSec }}>{r.hq}</td>
                    <td style={{ padding: "10px 16px", color: T.textSec }}>{r.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ padding: "12px 16px", fontSize: 11, color: T.textTer, fontFamily: Fn, borderTop: "1px solid " + T.border }}>
            Top 10 vendors account for ~90% of global tracker shipments. In the US, Nextracker + GameChange + Array combine for &gt;90%.
          </div>
        </Card>
      )}

      {section("Sources of Competitive Advantage",
        <Card T={T} style={{ padding: 20 }}>
          {moatSources.map((s, i) => <MoatBar key={i} source={s} T={T} />)}
          <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginTop: 8 }}>Click each row to expand detail. Bars = relative strength assessment.</div>
        </Card>
      )}
    </div>
  );

  /* ─── TAB: FINANCIALS ─── */
  const financialsTab = (
    <div>
      {section("Revenue Growth",
        <Card T={T} style={{ padding: 20 }}>
          <BarChart
            data={revenueChartData.values}
            labels={revenueChartData.labels}
            projected={revenueChartData.projected}
            colors={revenueChartData.values.map((_, i) => revenueChartData.projected[i] ? T.deepBlue : T.deepBlue)}
            title="Revenue ($B)" subtitle="FY2021–FY2025 CAGR: ~25%. Analyst consensus ~15% revenue CAGR through FY2028."
            T={T} height={200} unit="$"
          />
        </Card>
      )}

      {section("Free Cash Flow",
        <Card T={T} style={{ padding: 20 }}>
          <BarChart
            data={fcfChartData.values}
            labels={fcfChartData.labels}
            colors={[T.green, T.green]}
            title="Free Cash Flow ($M)" subtitle="Asset-light model drives exceptional FCF conversion (~21% FCF margin in FY2025)"
            T={T} height={180} unit="$"
          />
        </Card>
      )}

      {section("Financial Summary",
        <Card T={T} style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: Fn, fontSize: 12 }}>
              <thead>
                <tr style={{ borderBottom: "2px solid " + T.border }}>
                  {["Metric", "FY2023", "FY2024", "FY2025", "FY2026E"].map(h => (
                    <th key={h} style={{ padding: "12px 14px", textAlign: h === "Metric" ? "left" : "right", fontWeight: 600, color: T.textTer, fontSize: 10, letterSpacing: "0.05em", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {financials.map((r, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid " + T.border }}>
                    <td style={{ padding: "10px 14px", fontWeight: 600, color: T.text }}>{r.metric}</td>
                    <td style={{ padding: "10px 14px", textAlign: "right", color: r.fy23 === "—" ? T.textTer : T.textSec }}>{r.fy23}</td>
                    <td style={{ padding: "10px 14px", textAlign: "right", color: r.fy24 === "—" ? T.textTer : T.textSec }}>{r.fy24}</td>
                    <td style={{ padding: "10px 14px", textAlign: "right", color: T.text, fontWeight: 500 }}>{r.fy25}</td>
                    <td style={{ padding: "10px 14px", textAlign: "right", color: T.deepBlue, fontWeight: 500, fontStyle: "italic" }}>{r.fy26e}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {section("Key Performance Indicators",
        <div style={{ display: "grid", gap: 8 }}>
          {kpiTable.map((k, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "180px 1fr 1fr", gap: 12, alignItems: "center",
              padding: "10px 14px", background: T.card, borderRadius: T.radiusSm, border: "1px solid " + T.border,
              fontSize: 12, fontFamily: Fn,
            }}>
              <span style={{ fontWeight: 600, color: T.text }}>{k.metric}</span>
              <span style={{ color: T.textTer, fontSize: 11 }}>{k.why}</span>
              <span style={{ color: T.textSec, fontWeight: 500 }}>{k.value}</span>
            </div>
          ))}
        </div>
      )}

      {section(null,
        <div style={{
          padding: "16px 20px", background: T.text === "#0F172A" ? "rgba(29,78,216,0.04)" : "rgba(96,165,250,0.06)",
          borderRadius: T.radius, border: "1px solid " + T.border, marginTop: 8,
        }}>
          <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7 }}>
            <strong style={{ color: T.deepBlue }}>Capital intensity note:</strong> The asset-light manufacturing model means minimal fixed assets on balance sheet. Partner manufacturers own the factories and bear most capex. Nextpower's main costs are raw materials (steel, aluminium), logistics, and R&D. Result: exceptional FCF conversion — ~21% FCF margin in FY2025.
          </div>
        </div>
      )}
    </div>
  );

  /* ─── TAB: MANAGEMENT ─── */
  const managementTab = (
    <div>
      {section("Leadership",
        <div style={{ display: "grid", gap: 12 }}>
          {mgmt.map((m, i) => (
            <Card key={i} T={T} style={{ padding: "18px 22px" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn }}>{m.name}</span>
                <Pill T={T} color={T.deepBlue} bg="rgba(29,78,216,0.08)">{m.role}</Pill>
              </div>
              {prose(m.detail)}
            </Card>
          ))}
        </div>
      )}

      {section("Capital Allocation",
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
          {capitalAllocation.map((c, i) => (
            <Card key={i} T={T} style={{ padding: "18px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 20 }}>{c.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn }}>{c.category}</span>
              </div>
              {prose(c.detail)}
            </Card>
          ))}
        </div>
      )}

      {section(null,
        <div style={{
          padding: "16px 20px", background: T.greenBg, borderRadius: T.radius, border: "1px solid " + T.border,
        }}>
          <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7 }}>
            <strong style={{ color: T.green }}>Textbook growth compounder.</strong> 600+ patents, $170M+ in bolt-on M&A, $500M buyback programme, fortress balance sheet ($953M cash, zero debt), Fitch BBB- investment grade. Management generates more cash than reinvestment requires — significant optionality.
          </div>
        </div>
      )}
    </div>
  );

  /* ─── TAB: RISKS & POLICY ─── */
  const risksTab = (
    <div>
      {section("Regulatory & Policy Landscape",
        <div style={{ display: "grid", gap: 10 }}>
          {policyLandscape.map((p, i) => {
            const typeColors = { tailwind: "green", mixed: "orange", headwind: "capRed", risk: "purple" };
            const c = typeColors[p.type] || "capRed";
            return (
              <Expandable key={i} title={p.title} tag={p.type} color={c} T={T}>
                {prose(p.detail)}
              </Expandable>
            );
          })}
        </div>
      )}

      {section("Key Questions for Further Research",
        <div style={{ display: "grid", gap: 10 }}>
          {keyQuestions.map((q, i) => (
            <Expandable key={i} title={`${i + 1}. ${q.q}`} T={T} color="capRed">
              {prose(q.detail)}
            </Expandable>
          ))}
        </div>
      )}
    </div>
  );

  /* ─── TAB: TIMELINE ─── */
  const timelineTab = (
    <div>
      {section("Strategic Evolution",
        <div style={{ position: "relative", paddingLeft: 28 }}>
          <div style={{ position: "absolute", left: 8, top: 4, bottom: 4, width: 2, background: T.border, borderRadius: 1 }} />
          {timeline.map((t, i) => (
            <div key={i} style={{ position: "relative", marginBottom: 20 }}>
              <div style={{
                position: "absolute", left: -24, top: 4, width: 10, height: 10, borderRadius: "50%",
                background: i === timeline.length - 1 ? T.deepBlue : T.textTer, border: "2px solid " + T.card,
                boxShadow: i === timeline.length - 1 ? `0 0 8px ${T.deepBlue}` : "none",
              }} />
              <div style={{ fontSize: 11, fontWeight: 700, color: T.deepBlue, fontFamily: Fn, marginBottom: 3 }}>{t.year}</div>
              <div style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.6 }}>{t.event}</div>
            </div>
          ))}
        </div>
      )}

      {section(null,
        <div style={{
          padding: "16px 20px", background: T.text === "#0F172A" ? "rgba(29,78,216,0.04)" : "rgba(96,165,250,0.06)",
          borderRadius: T.radius, border: "1px solid " + T.border,
        }}>
          <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7 }}>
            <strong style={{ color: T.deepBlue }}>The strategic arc is clear:</strong> from a single-product tracker company inside a conglomerate to an independent, full-platform solar technology provider with a fortress balance sheet and a credible path to $5B+ in revenue. Each phase expanded the addressable market — XTR expanded terrain, Hail Pro expanded geography, foundations/eBOS/frames expanded bill-of-materials share, and PCS will be the biggest addressable market expansion yet.
          </div>
        </div>
      )}
    </div>
  );

  const tabContent = {
    "Overview": overviewTab,
    "Products": productsTab,
    "Competitive Position": competitiveTab,
    "Financials": financialsTab,
    "Management": managementTab,
    "Risks & Policy": risksTab,
    "Timeline": timelineTab,
  };

  return (
    <div>
      {header}
      <Tabs tabs={tabs} active={tab} onChange={setTab} T={T} />
      {tabContent[tab]}
    </div>
  );
}
