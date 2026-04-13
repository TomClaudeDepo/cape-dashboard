import { useState, useRef, useEffect } from "react";
import { Fn, Fh } from "../theme";
import { Card, Pill } from "../components/shared";
import {
  heroStats, thesisCards, thesisSections, chartData,
  primerDescription, milestones, segmentData,
  genMixPreCalpine, genMixPostCalpine, geoExposure,
  revenueStreams, nuclearFleet, calpineHighlights,
} from "../data/research-ceg";

/* ═══════════════════════════════════════════
   SVG CHART HELPERS
   ═══════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════
   INTERACTIVE PIE CHART
   ═══════════════════════════════════════════ */
function PieChart({ data, size = 200, T, label }) {
  const [hov, setHov] = useState(null);
  const r = size / 2 - 8;
  const cx = size / 2, cy = size / 2;
  let cumAngle = -90;
  const slices = data.map((d, i) => {
    const angle = (d.share / 100) * 360;
    const startAngle = cumAngle;
    cumAngle += angle;
    const endAngle = cumAngle;
    const sr = (Math.PI / 180) * startAngle;
    const er = (Math.PI / 180) * endAngle;
    const large = angle > 180 ? 1 : 0;
    const x1 = cx + r * Math.cos(sr), y1 = cy + r * Math.sin(sr);
    const x2 = cx + r * Math.cos(er), y2 = cy + r * Math.sin(er);
    const mid = (Math.PI / 180) * ((startAngle + endAngle) / 2);
    const pull = hov === i ? 6 : 0;
    const dx = pull * Math.cos(mid), dy = pull * Math.sin(mid);
    const path = angle >= 359.99
      ? `M ${cx + dx} ${cy - r + dy} A ${r} ${r} 0 1 1 ${cx + dx - 0.01} ${cy - r + dy} Z`
      : `M ${cx + dx} ${cy + dy} L ${x1 + dx} ${y1 + dy} A ${r} ${r} 0 ${large} 1 ${x2 + dx} ${y2 + dy} Z`;
    return { ...d, path, i, midAngle: mid };
  });
  return (
    <div>
      {label && <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 12 }}>{label}</div>}
      <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ flexShrink: 0 }}>
          {slices.map(s => (
            <path key={s.i} d={s.path} fill={s.color} stroke={T.card} strokeWidth="2"
              opacity={hov !== null && hov !== s.i ? 0.4 : 1}
              style={{ transition: "all 0.2s", cursor: "pointer" }}
              onMouseEnter={() => setHov(s.i)} onMouseLeave={() => setHov(null)} />
          ))}
          {hov !== null && (
            <g>
              <text x={cx} y={cy - 6} textAnchor="middle" fontSize="20" fontWeight="700" fill={T.text} fontFamily={Fn}>{data[hov].share}%</text>
              <text x={cx} y={cy + 12} textAnchor="middle" fontSize="10" fill={T.textSec} fontFamily={Fn}>{data[hov].name}</text>
            </g>
          )}
        </svg>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {data.map((d, i) => (
            <div key={i} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
              style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "4px 8px", borderRadius: 6, background: hov === i ? T.pillBg : "transparent", transition: "background 0.15s" }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: d.color, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: hov === i ? T.text : T.textSec, fontFamily: Fn, fontWeight: hov === i ? 600 : 400, transition: "all 0.15s" }}>
                {d.name} {"\u2014"} {d.share}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   EXPANDABLE
   ═══════════════════════════════════════════ */
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
        <div style={{ width: 24, height: 24, borderRadius: "50%", background: T.pillBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: T.textTer, transition: "transform 0.3s", transform: open ? "rotate(180deg)" : "rotate(0)" }}>{"\u25BC"}</div>
      </div>
      <div style={{ maxHeight: open ? maxH + 40 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
        <div ref={innerRef} style={{ padding: "0 20px 20px" }}>
          <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.8, fontFamily: Fn, margin: 0 }}>{content}</p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   TABS COMPONENT
   ═══════════════════════════════════════════ */
function Tabs({ tabs, active, onChange, T }) {
  return (
    <div style={{ display: "flex", gap: 0, borderBottom: "1px solid " + T.border, marginBottom: 28 }}>
      {tabs.map(t => (
        <div key={t} onClick={() => onChange(t)} style={{
          padding: "10px 18px", fontSize: 13, fontFamily: Fn, fontWeight: active === t ? 600 : 400,
          color: active === t ? T.text : T.textTer, cursor: "pointer",
          borderBottom: active === t ? "2px solid " + T.capRed : "2px solid transparent",
          transition: "all 0.15s", letterSpacing: "-0.01em",
        }}>{t}</div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function ResearchCEG({ T }) {
  const [tab, setTab] = useState("Primer");
  const allTabs = ["Primer", "Structural Forces"];

  const colorMap = { orange: T.orange, capRed: T.capRed, deepBlue: T.deepBlue, green: T.green, purple: T.purple };
  const bgMap = { orange: "rgba(234,88,12,0.08)", capRed: T.redBg, deepBlue: "rgba(29,78,216,0.08)", green: T.greenBg, purple: "rgba(67,56,202,0.08)" };

  const scrollTo = id => {
    const el = document.getElementById("ceg-" + id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* ─── HEADER ─── */
  const header = (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
        <span style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 36, color: T.text }}>Constellation Energy</span>
        <span style={{ fontSize: 14, fontWeight: 600, color: T.textTer, fontFamily: Fn, letterSpacing: "0.04em" }}>CEG US</span>
        <Pill T={T} color={T.green} bg={T.greenBg}>Equity Research</Pill>
      </div>
      <div style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, marginBottom: 16 }}>
        NASDAQ · Baltimore, Maryland · America's largest competitive clean energy producer
      </div>
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

  /* ─── STRUCTURAL FORCES TAB ─── */
  const structuralForcesTab = (
    <div>
      {/* Overview grid */}
      <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 16, letterSpacing: "-0.01em" }}>
        Six structural forces converging on one company
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 48 }}>
        {thesisCards.map((card, i) => (
          <div key={i} onClick={() => scrollTo(card.id)} style={{
            background: T.card, border: "1px solid " + T.border, borderRadius: T.radius,
            padding: "22px 20px", cursor: "pointer", boxShadow: T.shadow, transition: "all 0.2s",
            borderTop: `3px solid ${colorMap[card.color] || T.capRed}`,
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = T.shadowLg; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = T.shadow; }}>
            <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginBottom: 8 }}>{card.num}</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 6 }}>{card.title}</div>
            <Pill T={T} color={colorMap[card.color]} bg={bgMap[card.color]}>{card.tag}</Pill>
            <p style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, lineHeight: 1.65, marginTop: 10, margin: "10px 0 0" }}>{card.desc}</p>
            <div style={{ fontSize: 11, fontWeight: 500, color: colorMap[card.color], marginTop: 12, fontFamily: Fn }}>Deep dive {"\u2192"}</div>
          </div>
        ))}
      </div>

      {/* Deep-dive sections */}
      {thesisSections.map((sec, si) => (
        <div key={si} id={`ceg-${sec.id}`} style={{ scrollMarginTop: 80, borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>{sec.num} / STRUCTURAL FORCE</div>
            <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, lineHeight: 1.3 }}>{sec.title}</h2>
            <p style={{ fontSize: 14, color: T.textSec, fontFamily: Fn, marginTop: 8, lineHeight: 1.7, maxWidth: 700 }}>{sec.lead}</p>
          </div>

          {/* Metrics row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 24 }}>
            {sec.metrics.map((m, i) => (
              <div key={i} style={{ background: T.bg, borderRadius: T.radiusSm, padding: "14px 16px", border: "1px solid " + T.border }}>
                <div style={{ fontSize: 20, fontWeight: 300, color: colorMap[thesisCards[si]?.color] || T.text, fontFamily: Fn }}>{m.value}</div>
                <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 4, lineHeight: 1.3 }}>{m.label}</div>
              </div>
            ))}
          </div>

          {/* Section-specific charts */}
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
          {sec.id === "capacity-crisis" && (
            <Card T={T} style={{ padding: "18px 20px", marginBottom: 24 }}>
              <BarChart T={T} title="PJM capacity prices ($/MW-day)" subtitle="10x increase in 3 auction cycles \u2014 at FERC cap"
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

          {/* Prose */}
          <div style={{ maxWidth: 720, marginBottom: 24 }}>
            {sec.paragraphs.map((p, i) => (
              <p key={i} style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, marginBottom: 14 }}>{p}</p>
            ))}
          </div>

          {/* Pull quote */}
          {sec.pullQuote && (
            <div style={{ borderLeft: `3px solid ${colorMap[thesisCards[si]?.color] || T.capRed}`, padding: "16px 24px", marginBottom: 24, background: bgMap[thesisCards[si]?.color] || T.pillBg, borderRadius: `0 ${T.radiusSm} ${T.radiusSm} 0` }}>
              <p style={{ fontSize: 14, color: T.text, fontFamily: Fn, lineHeight: 1.7, fontWeight: 500, fontStyle: "italic", margin: 0 }}>{sec.pullQuote}</p>
            </div>
          )}

          {/* Capture box */}
          {sec.capture && (
            <Card T={T} style={{ padding: "20px 24px", borderLeft: `4px solid ${colorMap[thesisCards[si]?.color] || T.capRed}` }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 12 }}>{sec.capture.title}</div>
              {sec.capture.points.map((pt, i) => (
                <div key={i} style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.8, paddingLeft: 12, borderLeft: "2px solid " + T.border, marginBottom: 8 }}>{pt}</div>
              ))}
            </Card>
          )}

          {/* Expandables */}
          {sec.expandables?.map((ex, i) => (
            <div key={i} style={{ marginTop: 16 }}>
              <Expandable T={T} title={ex.title} tag={ex.tag} content={ex.content} color={thesisCards[si]?.color || "capRed"} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  /* ─── PRIMER TAB ─── */
  const prose = (text, s = {}) => <p style={{ fontSize: 13.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.8, margin: "0 0 16px", ...s }}>{text}</p>;
  const sTitle = (t) => <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 16, letterSpacing: "-0.01em" }}>{t}</div>;

  const primerTab = (
    <div>
      {/* ── What is Constellation Energy? ── */}
      {sTitle("What is Constellation Energy?")}
      {primerDescription.map((p, i) => <div key={i}>{prose(p)}</div>)}

      {/* ── Corporate milestones ── */}
      <div style={{ marginTop: 32, marginBottom: 40 }}>
        {sTitle("How it got here")}
        <div style={{ position: "relative", paddingLeft: 28 }}>
          {/* Timeline line */}
          <div style={{ position: "absolute", left: 7, top: 8, bottom: 8, width: 2, background: T.border, borderRadius: 1 }} />
          {milestones.map((m, i) => (
            <div key={i} style={{ position: "relative", marginBottom: i < milestones.length - 1 ? 20 : 0 }}>
              {/* Dot */}
              <div style={{ position: "absolute", left: -24, top: 6, width: 14, height: 14, borderRadius: "50%", background: T.card, border: `3px solid ${colorMap[m.color] || T.capRed}`, zIndex: 1 }} />
              <div style={{ fontSize: 10, fontWeight: 600, color: colorMap[m.color] || T.textTer, fontFamily: Fn, letterSpacing: "0.08em", marginBottom: 4 }}>{m.date.toUpperCase()}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>{m.title}</div>
              <p style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, margin: 0 }}>{m.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Reporting segments ── */}
      <div style={{ borderTop: "1px solid " + T.border, paddingTop: 32, marginBottom: 40 }}>
        {sTitle("Five reporting segments")}
        {prose("Constellation reports through five geographic segments, each anchored in a specific wholesale electricity market. The Calpine acquisition will likely result in segment restructuring, but the pre-acquisition structure illuminates where value concentrates.")}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
          <div>
            <PieChart T={T} label="Revenue by segment (FY2024)" data={segmentData.map(s => ({ name: s.name, share: s.pct, color: s.color }))} size={200} />
          </div>
          <div>
            <PieChart T={T} label="Post-Calpine production by ISO" data={geoExposure} size={200} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
          {segmentData.map((seg, i) => (
            <Card key={i} T={T} style={{ padding: "18px 20px", borderLeft: `4px solid ${seg.color}` }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn }}>{seg.name}</span>
                  <Pill T={T} color={seg.color} bg={seg.color + "14"}>{seg.iso}</Pill>
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: T.textTer, fontFamily: Fn }}>{seg.revenue}</span>
              </div>
              <div style={{ fontSize: 11, color: colorMap[Object.keys(colorMap).find(k => colorMap[k] === seg.color)] || T.textTer, fontFamily: Fn, marginBottom: 6, fontWeight: 500 }}>
                {seg.key}
              </div>
              <p style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, margin: 0 }}>{seg.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* ── Generation mix ── */}
      <div style={{ borderTop: "1px solid " + T.border, paddingTop: 32, marginBottom: 40 }}>
        {sTitle("How the generation mix is changing")}
        {prose("The Calpine acquisition fundamentally reshapes Constellation's generation profile. By capacity, the fleet shifts from nuclear-dominant to diversified. By energy output, nuclear still dominates given its 94.7% capacity factor versus 40-50% for gas combined-cycle.")}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginTop: 8 }}>
          <Card T={T} style={{ padding: "20px 24px" }}>
            <PieChart T={T} label="Pre-Calpine (by energy, FY2024)" data={genMixPreCalpine} size={180} />
            <p style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, lineHeight: 1.6, marginTop: 12, margin: "12px 0 0" }}>
              208,434 GWh total generation. Nuclear contributed 181,711 GWh {"\u2014"} 87% of owned output.
            </p>
          </Card>
          <Card T={T} style={{ padding: "20px 24px" }}>
            <PieChart T={T} label="Post-Calpine (by capacity)" data={genMixPostCalpine} size={180} />
            <p style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, lineHeight: 1.6, marginTop: 12, margin: "12px 0 0" }}>
              ~55 GW combined fleet. Natural gas now the majority by capacity but nuclear still dominates energy output.
            </p>
          </Card>
        </div>
      </div>

      {/* ── Revenue model ── */}
      <div style={{ borderTop: "1px solid " + T.border, paddingTop: 32, marginBottom: 40 }}>
        {sTitle("Four interlocking revenue streams")}
        {prose("Constellation's revenue engine operates through four channels that create a layered risk management framework. Each stream serves a different function: electricity sales generate the core business, PTCs provide a floor, capacity payments are surging, and hyperscaler PPAs are converting merchant exposure into long-term contracted revenue.")}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
          {revenueStreams.map((rs, i) => (
            <Card key={i} T={T} style={{ padding: "20px", borderTop: `3px solid ${T[rs.color] || T.capRed}` }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{rs.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 8 }}>{rs.title}</div>
              <p style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, marginBottom: 10, margin: "0 0 10px" }}>{rs.desc}</p>
              <div style={{ padding: "10px 14px", background: T.bg, borderRadius: T.radiusSm, borderLeft: `2px solid ${T[rs.color] || T.capRed}` }}>
                <p style={{ fontSize: 11.5, color: T.textTer, fontFamily: Fn, lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>{rs.detail}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* ── Nuclear fleet ── */}
      <div style={{ borderTop: "1px solid " + T.border, paddingTop: 32, marginBottom: 40 }}>
        {sTitle("The nuclear fleet: 14 stations, 25 reactors")}
        {prose("This is the irreplaceable asset base. New nuclear construction costs $10,000-15,000 per kilowatt (Vogtle Units 3 and 4 cost roughly $35 billion). Replicating Constellation's fleet would be a multi-hundred-billion-dollar, multi-decade undertaking. The fleet produced 182,690 GWh in 2025 at a 94.7% capacity factor, approximately 4 percentage points above the US industry average.")}

        <Card T={T} style={{ padding: "4px 16px", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: Fn }}>
            <thead>
              <tr style={{ borderBottom: "2px solid " + T.border }}>
                {["Station", "State", "Units", "Net MW", "Type", "ISO", "License expiry"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "10px 10px", fontSize: 9, color: T.textTer, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {nuclearFleet.map((f, i) => (
                <tr key={i} style={{ borderBottom: "1px solid " + T.border, background: f.note ? T.greenBg : "transparent" }}>
                  <td style={{ padding: "9px 10px", fontWeight: 500, color: T.text }}>
                    {f.station}
                    {f.ownership && <span style={{ fontSize: 10, color: T.textTer, marginLeft: 6 }}>({f.ownership})</span>}
                  </td>
                  <td style={{ padding: "9px 10px", color: T.textSec }}>{f.state}</td>
                  <td style={{ padding: "9px 10px", color: T.textSec, fontFeatureSettings: '"tnum"' }}>{f.units}</td>
                  <td style={{ padding: "9px 10px", color: T.textSec, fontFeatureSettings: '"tnum"' }}>{f.mw}</td>
                  <td style={{ padding: "9px 10px", color: T.textSec }}>{f.type}</td>
                  <td style={{ padding: "9px 10px" }}><Pill T={T}>{f.iso}</Pill></td>
                  <td style={{ padding: "9px 10px", color: T.textSec, fontFeatureSettings: '"tnum"' }}>
                    {f.license}
                    {f.note && <Pill T={T} color={T.green} bg={T.greenBg} style={{ marginLeft: 8 }}>{f.note}</Pill>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* ── Calpine transformation ── */}
      <div style={{ borderTop: "1px solid " + T.border, paddingTop: 32, marginBottom: 40 }}>
        {sTitle("The Calpine transformation")}
        {prose("Closed on January 7, 2026, the $26.6 billion Calpine acquisition is the most transformational deal in Constellation's short history as an independent company. It doubled the fleet from roughly 28 GW to 55 GW, added critical dispatchable natural gas capacity to complement nuclear baseload, diversified geographic exposure into ERCOT and California, and brought The Geysers, the world's largest geothermal complex.")}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 20 }}>
          {calpineHighlights.map((ch, i) => (
            <Card key={i} T={T} style={{ padding: "20px", borderTop: `3px solid ${T[ch.color] || T.capRed}` }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{ch.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 6 }}>{ch.title}</div>
              <p style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, margin: 0 }}>{ch.text}</p>
            </Card>
          ))}
        </div>

        {/* Before/after comparison */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <Card T={T} style={{ padding: "18px 20px", borderLeft: `3px solid ${T.textTer}` }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: T.textTer, fontFamily: Fn, letterSpacing: "0.06em", marginBottom: 12, textTransform: "uppercase" }}>Before Calpine</div>
            {[
              { l: "Capacity", v: "~28 GW" }, { l: "Generation", v: "Nuclear-dominant (87%)" },
              { l: "Markets", v: "PJM, NYISO, MISO" }, { l: "Retail customers", v: "~1M" },
              { l: "Employees", v: "~14,264" },
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: i < 4 ? "1px solid " + T.border : "none" }}>
                <span style={{ fontSize: 12, color: T.textTer, fontFamily: Fn }}>{r.l}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: T.textSec, fontFamily: Fn }}>{r.v}</span>
              </div>
            ))}
          </Card>
          <Card T={T} style={{ padding: "18px 20px", borderLeft: `3px solid ${T.green}` }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: T.green, fontFamily: Fn, letterSpacing: "0.06em", marginBottom: 12, textTransform: "uppercase" }}>After Calpine</div>
            {[
              { l: "Capacity", v: "~55 GW" }, { l: "Generation", v: "Diversified (40% nuclear)" },
              { l: "Markets", v: "PJM, ERCOT, CAISO, NYISO+" }, { l: "Retail customers", v: "~2.5M" },
              { l: "Employees", v: "~16,764" },
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: i < 4 ? "1px solid " + T.border : "none" }}>
                <span style={{ fontSize: 12, color: T.textTer, fontFamily: Fn }}>{r.l}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: T.green, fontFamily: Fn }}>{r.v}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>

      {/* Footer note */}
      <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, lineHeight: 1.7, maxWidth: 700, paddingBottom: 20 }}>
        Business primer {"\u2014"} educational overview. No financials, no valuations. For informational purposes only.
      </div>
    </div>
  );

  /* ─── TAB CONTENT MAP ─── */
  const tabContent = { "Primer": primerTab, "Structural Forces": structuralForcesTab };

  return (
    <div>
      {header}
      <Tabs tabs={allTabs} active={tab} onChange={setTab} T={T} />
      {tabContent[tab]}
    </div>
  );
}
