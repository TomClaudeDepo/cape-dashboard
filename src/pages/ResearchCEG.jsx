import { useState, useRef, useEffect } from "react";
import { Fn, Fh } from "../theme";
import { Card, Pill } from "../components/shared";
import { useMobile } from "../hooks/useMobile";
import {
  heroStats, thesisCards, thesisSections, chartData,
  primerDescription, milestones, segmentData,
  genMixPreCalpine, genMixPostCalpine, geoExposure,
  revenueStreams, nuclearFleet, calpineHighlights,
  valSummary, valSnapshot, valPhases, valSOTP, valBullBear,
  valConsensus, valLeverage, valFramework, valGating,
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
  const allTabs = ["Primer", "Structural Forces", "Valuation"];
  const mob = useMobile();
  const [valSection, setValSection] = useState(null);

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

  /* ─── VALUATION TAB ─── */
  const valSectionNav = [
    { id: "val-thesis", label: "Premium Thesis" },
    { id: "val-phases", label: "Re-Rating Phases" },
    { id: "val-sotp", label: "Sum-of-Parts" },
    { id: "val-bull-bear", label: "Bull vs Bear" },
    { id: "val-consensus", label: "Consensus" },
    { id: "val-calpine", label: "Calpine Impact" },
    { id: "val-balance", label: "Balance Sheet" },
    { id: "val-framework", label: "Framework" },
    { id: "val-gating", label: "Gating Factors" },
  ];

  const scrollToVal = id => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const valuationTab = (
    <div>
      {/* Section chip nav */}
      <div style={{
        display: "flex", gap: 6, marginBottom: 28, flexWrap: "wrap",
        overflow: "auto", WebkitOverflowScrolling: "touch",
      }}>
        {valSectionNav.map(s => (
          <button key={s.id} onClick={() => scrollToVal(s.id)} style={{
            background: T.pillBg, border: "1px solid " + T.border,
            borderRadius: 20, padding: "5px 14px",
            fontFamily: Fn, fontSize: 11, color: T.textSec,
            cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
            transition: "all 0.15s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = T.capRed; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "transparent"; }}
            onMouseLeave={e => { e.currentTarget.style.background = T.pillBg; e.currentTarget.style.color = T.textSec; e.currentTarget.style.borderColor = T.border; }}>
            {s.label}
          </button>
        ))}
      </div>

      {/* ── 1. PREMIUM THESIS ── */}
      <div id="val-thesis" style={{ scrollMarginTop: 80, marginBottom: 48 }}>
        <Card T={T} style={{ padding: mob ? "24px 20px" : "32px 36px", borderLeft: `4px solid ${T.capRed}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ fontSize: 10, fontFamily: Fn, color: T.capRed, letterSpacing: "0.15em", fontWeight: 700 }}>VALUATION OVERVIEW</div>
            <Pill T={T} color={T.orange} bg="rgba(234,88,12,0.08)">Premium justified, execution risk rising</Pill>
          </div>
          <p style={{ fontSize: 13.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.85, margin: 0, maxWidth: 760 }}>{valSummary}</p>

          {/* Snapshot metrics */}
          <div style={{
            display: "grid", gridTemplateColumns: mob ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap: 12, marginTop: 24, paddingTop: 20, borderTop: "1px solid " + T.border,
          }}>
            {[
              { l: "Current Price", v: valSnapshot.price, color: T.text },
              { l: "Forward P/E", v: valSnapshot.fwdPE, color: T.capRed },
              { l: "Peer Median P/E", v: valSnapshot.peerPE, color: T.textTer },
              { l: "Premium to Peers", v: valSnapshot.premium, color: T.orange },
              { l: "EV/EBITDA", v: valSnapshot.evEbitda, color: T.deepBlue },
              { l: "Peak Price", v: valSnapshot.peakPrice, color: T.green },
              { l: "From Peak", v: valSnapshot.drawdown, color: T.capRed },
              { l: "Consensus Target", v: valSnapshot.consensus, color: T.green },
            ].map((m, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 300, color: m.color, fontFamily: Fn, lineHeight: 1.2 }}>{m.v}</div>
                <div style={{ fontSize: 9, color: T.textTer, fontFamily: Fn, letterSpacing: "0.06em", marginTop: 4 }}>{m.l}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ── 2. RE-RATING PHASES ── */}
      <div id="val-phases" style={{ scrollMarginTop: 80, borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
        <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>MULTIPLE EVOLUTION</div>
        <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 8 }}>Four inflection points from $50 to $413</h2>
        <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, marginBottom: 28, maxWidth: 720 }}>
          CEG spun off from Exelon at roughly $50-56 per share in February 2022, initially trading as a conventional merchant power generator. The re-rating unfolded across four distinct phases, each with a clear catalyst.
        </p>

        {/* Visual timeline */}
        <div style={{ position: "relative", marginBottom: 32 }}>
          {/* Horizontal progress bar */}
          <div style={{ display: "flex", gap: 0, marginBottom: 8 }}>
            {valPhases.map((p, i) => {
              const c = { deepBlue: T.deepBlue, green: T.green, orange: T.orange, capRed: T.capRed }[p.color];
              return (
                <div key={i} style={{ flex: 1, height: 6, background: c, borderRadius: i === 0 ? "3px 0 0 3px" : i === 3 ? "0 3px 3px 0" : 0, opacity: 0.8 }} />
              );
            })}
          </div>
          {/* Phase labels under bar */}
          <div style={{ display: "flex", gap: 0 }}>
            {valPhases.map((p, i) => {
              const c = { deepBlue: T.deepBlue, green: T.green, orange: T.orange, capRed: T.capRed }[p.color];
              return (
                <div key={i} style={{ flex: 1, textAlign: "center", paddingTop: 4 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: c, fontFamily: Fn }}>{p.priceRange}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Phase cards */}
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(2, 1fr)", gap: 14 }}>
          {valPhases.map((p, i) => {
            const c = { deepBlue: T.deepBlue, green: T.green, orange: T.orange, capRed: T.capRed }[p.color];
            const bg = { deepBlue: "rgba(29,78,216,0.08)", green: T.greenBg, orange: "rgba(234,88,12,0.08)", capRed: T.redBg }[p.color];
            return (
              <Card key={i} T={T} style={{ padding: "20px 24px", borderTop: `3px solid ${c}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: c, fontFamily: Fn }}>{p.phase}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn }}>{p.label}</div>
                    <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn }}>{p.period}</div>
                  </div>
                </div>
                <p style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 12px" }}>{p.desc}</p>
                <div style={{ display: "flex", gap: 16 }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 300, color: c, fontFamily: Fn }}>{p.evEbitda}</div>
                    <div style={{ fontSize: 9, color: T.textTer, fontFamily: Fn }}>EV/EBITDA</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 300, color: c, fontFamily: Fn }}>{p.fwdPE}</div>
                    <div style={{ fontSize: 9, color: T.textTer, fontFamily: Fn }}>Fwd P/E</div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* ── 3. SUM OF THE PARTS ── */}
      <div id="val-sotp" style={{ scrollMarginTop: 80, borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
        <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>MORGAN STANLEY SOTP (MARCH 2026)</div>
        <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 8 }}>$385 price target built from four value layers</h2>
        <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, marginBottom: 24, maxWidth: 720 }}>
          The sum-of-the-parts framework separates the existing asset base from optionality. The implicit message: the market is paying for potential, and CEG has the fleet to deliver it.
        </p>

        {/* Visual stacked bar */}
        <Card T={T} style={{ padding: "24px", marginBottom: 20 }}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", height: 40, borderRadius: 6, overflow: "hidden" }}>
              {valSOTP.map((s, i) => (
                <div key={i} style={{ width: (s.value / 387) * 100 + "%", background: s.color, display: "flex", alignItems: "center", justifyContent: "center", transition: "opacity 0.2s" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#fff", fontFamily: Fn }}>${s.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 16 }}>
            {valSOTP.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: s.color, flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: Fn }}>{s.category}</div>
                  <div style={{ fontSize: 18, fontWeight: 300, color: s.color, fontFamily: Fn }}>${s.value}/sh</div>
                  <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn }}>{s.pct}% of target</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid " + T.border, display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontSize: 10, color: T.textTer, fontFamily: Fn }}>Total price target:</span>
            <span style={{ fontSize: 22, fontWeight: 300, color: T.text, fontFamily: Fn }}>$385</span>
          </div>
        </Card>
      </div>

      {/* ── 4. BULL vs BEAR ── */}
      <div id="val-bull-bear" style={{ scrollMarginTop: 80, borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
        <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>BULL / BEAR ANALYSIS</div>
        <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 24 }}>Where bulls and bears draw the line</h2>

        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 20 }}>
          {/* Bull side */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.green }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: T.green, fontFamily: Fn, letterSpacing: "0.04em" }}>BULL CASE</span>
            </div>
            {valBullBear.bull.map((b, i) => (
              <Expandable key={i} T={T} title={b.point} content={b.detail} color="green" />
            ))}
          </div>

          {/* Bear side */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.capRed }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: T.capRed, fontFamily: Fn, letterSpacing: "0.04em" }}>BEAR CASE</span>
            </div>
            {valBullBear.bear.map((b, i) => (
              <Expandable key={i} T={T} title={b.point} content={b.detail} color="capRed" />
            ))}
          </div>
        </div>
      </div>

      {/* ── 5. CONSENSUS ── */}
      <div id="val-consensus" style={{ scrollMarginTop: 80, borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
        <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>SELL-SIDE CONSENSUS</div>
        <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 8 }}>12 Buy, 3-4 Hold, zero Sells</h2>
        <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, marginBottom: 24, maxWidth: 720 }}>
          Median target of ~$383-400 implies 35-45% upside. Nearly all brokers cut targets in March-April 2026 following the guidance miss, but none downgraded.
        </p>

        {/* Visual bar chart of targets */}
        <Card T={T} style={{ padding: "20px 24px", marginBottom: 20 }}>
          {valConsensus.sort((a, b) => b.target - a.target).map((c, i) => {
            const maxTarget = 462;
            const pct = (c.target / maxTarget) * 100;
            const isBuy = c.rating.includes("Buy");
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <div style={{ width: 100, flexShrink: 0, textAlign: "right" }}>
                  <span style={{ fontSize: 12, fontWeight: 500, color: T.text, fontFamily: Fn }}>{c.broker}</span>
                </div>
                <div style={{ flex: 1, height: 22, background: T.pillBg, borderRadius: 4, overflow: "hidden", position: "relative" }}>
                  <div style={{ height: "100%", width: pct + "%", background: isBuy ? T.green : T.orange, borderRadius: 4, opacity: 0.75, transition: "width 0.8s ease" }} />
                  {/* Current price marker */}
                  <div style={{ position: "absolute", left: (280 / maxTarget * 100) + "%", top: 0, bottom: 0, width: 2, background: T.text, opacity: 0.3 }} />
                </div>
                <div style={{ width: 48, flexShrink: 0, textAlign: "right" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: isBuy ? T.green : T.orange, fontFamily: Fn, fontFeatureSettings: '"tnum"' }}>${c.target}</span>
                </div>
                <Pill T={T} color={isBuy ? T.green : T.orange} bg={isBuy ? T.greenBg : "rgba(234,88,12,0.08)"}>{c.rating}</Pill>
              </div>
            );
          })}
          <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid " + T.border, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 100 }} />
            <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn }}>Thin line = current price (~$280)</div>
          </div>
        </Card>
      </div>

      {/* ── 6. CALPINE IMPACT ── */}
      <div id="val-calpine" style={{ scrollMarginTop: 80, borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
        <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>CALPINE IMPACT ON VALUATION</div>
        <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 8 }}>Reshapes the story for better and worse</h2>
        <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, marginBottom: 24, maxWidth: 720 }}>
          The $26.6 billion acquisition closed January 7, 2026. At 7.9x EV/EBITDA, priced below what Calpine would have commanded in a standalone IPO. Management projects {">"}20% first-year EPS accretion with {">"}{" "}$2B in annual incremental free cash flow.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 14 }}>
          {/* Positive */}
          <Card T={T} style={{ padding: "20px 24px", borderLeft: `4px solid ${T.green}` }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: T.green, fontFamily: Fn, letterSpacing: "0.06em", marginBottom: 14, textTransform: "uppercase" }}>Strategic positives</div>
            {[
              { l: "Scale", v: "55 GW across 22 states, largest private fleet in the US" },
              { l: "One-stop shop", v: "Nuclear baseload + dispatchable gas for data center customers" },
              { l: "Market access", v: "Expanded into high-growth ERCOT and CAISO markets" },
              { l: "Geothermal", v: "The Geysers: world's largest complex (725 MW)" },
              { l: "Retail depth", v: "62 TWh of retail load, 2.5M customers" },
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, paddingBottom: 10, borderBottom: i < 4 ? "1px solid " + T.border : "none" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: Fn, minWidth: 80, flexShrink: 0 }}>{r.l}</span>
                <span style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.6 }}>{r.v}</span>
              </div>
            ))}
          </Card>

          {/* Concerns */}
          <Card T={T} style={{ padding: "20px 24px", borderLeft: `4px solid ${T.capRed}` }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: T.capRed, fontFamily: Fn, letterSpacing: "0.06em", marginBottom: 14, textTransform: "uppercase" }}>Legitimate concerns</div>
            {[
              { l: "Narrative dilution", v: "Nuclear drops from ~68% to ~40% of capacity, complicating pure-play thesis" },
              { l: "Leverage jump", v: "Pro forma ~2.5-3.0x Net Debt/EBITDA (from ~1.0x)" },
              { l: "DOJ precedent", v: "First electricity merger consent decree in 14 years. 4.4 GW PJM gas divested" },
              { l: "Lock-up overhang", v: "50M seller shares begin releasing June 2026" },
              { l: "Integration risk", v: "2,500 employees, 79 facilities across nuclear and gas operations" },
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, paddingBottom: 10, borderBottom: i < 4 ? "1px solid " + T.border : "none" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: Fn, minWidth: 80, flexShrink: 0 }}>{r.l}</span>
                <span style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.6 }}>{r.v}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>

      {/* ── 7. BALANCE SHEET COMPARISON ── */}
      <div id="val-balance" style={{ scrollMarginTop: 80, borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
        <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>LEVERAGE COMPARISON</div>
        <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 8 }}>Balance sheet strength underpins the premium</h2>
        <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, marginBottom: 24, maxWidth: 720 }}>
          Pre-deal ~1.0x Net Debt/EBITDA was the strongest in the IPP sector by a wide margin. The advantage narrows temporarily post-Calpine but management targets returning to pre-acquisition levels by 2027.
        </p>

        <Card T={T} style={{ padding: "24px", marginBottom: 20 }}>
          {valLeverage.map((l, i) => {
            const maxLev = 8.0;
            const pct = (l.leverage / maxLev) * 100;
            return (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: l.name.includes("CEG") ? T.text : T.textTer, fontWeight: l.name.includes("CEG") ? 600 : 400, fontFamily: Fn }}>{l.name}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 10, color: T.textTer, fontFamily: Fn }}>{l.rating}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: l.color, fontFamily: Fn, fontFeatureSettings: '"tnum"', minWidth: 36, textAlign: "right" }}>{l.leverage}x</span>
                  </div>
                </div>
                <div style={{ height: 8, background: T.pillBg, borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: pct + "%", background: l.color, borderRadius: 4, opacity: 0.8, transition: "width 0.8s ease" }} />
                </div>
              </div>
            );
          })}
        </Card>

        {/* Capital deployment */}
        <Card T={T} style={{ padding: "20px 24px", borderLeft: `4px solid ${T.deepBlue}` }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 12 }}>$13.6B capital deployment plan</div>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3, 1fr)", gap: 12 }}>
            {[
              { label: "Calpine debt paydown", value: "$3.4B", color: T.capRed },
              { label: "Share buybacks", value: "$5.0B", color: T.green },
              { label: "LS Power divestiture", value: "$5.0B", color: T.deepBlue },
            ].map((c, i) => (
              <div key={i} style={{ background: T.bg, borderRadius: T.radiusSm, padding: "14px", border: "1px solid " + T.border }}>
                <div style={{ fontSize: 20, fontWeight: 300, color: c.color, fontFamily: Fn }}>{c.value}</div>
                <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 4 }}>{c.label}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ── 8. VALUATION FRAMEWORK ── */}
      <div id="val-framework" style={{ scrollMarginTop: 80, borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
        <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>VALUATION FRAMEWORK</div>
        <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 8 }}>Utility, IPP, or something else entirely?</h2>
        <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, marginBottom: 24, maxWidth: 720 }}>
          CEG is evolving into a hybrid: long-duration contracted cash flows with creditworthy counterparties (like a regulated utility), plus significant growth optionality from uncontracted capacity that can be repriced higher (like a growth company). The correct framework is probably nuclear infrastructure.
        </p>

        <Card T={T} style={{ padding: "4px 16px", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: Fn }}>
            <thead>
              <tr style={{ borderBottom: "2px solid " + T.border }}>
                {["Framework", "EV/EBITDA", "Fwd P/E", "Characteristics"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontSize: 9, color: T.textTer, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {valFramework.map((f, i) => (
                <tr key={i} style={{ borderBottom: "1px solid " + T.border, background: f.framework === "CEG today" ? (T.redBg || "rgba(196,30,58,0.06)") : "transparent" }}>
                  <td style={{ padding: "10px 12px", fontWeight: 600, color: f.color }}>
                    {f.framework}
                  </td>
                  <td style={{ padding: "10px 12px", color: T.text, fontWeight: 600, fontFeatureSettings: '"tnum"' }}>{f.evEbitda}</td>
                  <td style={{ padding: "10px 12px", color: T.text, fontWeight: 600, fontFeatureSettings: '"tnum"' }}>{f.fwdPE}</td>
                  <td style={{ padding: "10px 12px", color: T.textSec, fontSize: 11, lineHeight: 1.6 }}>{f.characteristics}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Key insight */}
        <div style={{ borderLeft: `3px solid ${T.capRed}`, padding: "16px 24px", marginTop: 20, background: T.redBg || "rgba(196,30,58,0.06)", borderRadius: "0 8px 8px 0" }}>
          <p style={{ fontSize: 14, color: T.text, fontFamily: Fn, lineHeight: 1.7, fontWeight: 500, fontStyle: "italic", margin: 0 }}>
            Each new hyperscaler PPA effectively converts merchant optionality into contracted duration, pulling the appropriate multiple higher. If CEG converts even half of its 147 TWh uncontracted nuclear capacity into long-term PPAs at $60+/MWh, the earnings trajectory would justify multiples well above current levels.
          </p>
        </div>
      </div>

      {/* ── 9. GATING FACTORS ── */}
      <div id="val-gating" style={{ scrollMarginTop: 80, borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
        <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>KEY GATING FACTORS</div>
        <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 8 }}>Three factors determine whether the premium holds</h2>
        <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, marginBottom: 24, maxWidth: 720 }}>
          The market has moved from pricing CEG on potential to demanding proof of execution. At ~25x forward earnings, the margin of safety has narrowed considerably from a year ago.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
          {valGating.map((g, i) => {
            const dirColor = g.direction === "positive" ? T.green : g.direction === "negative" ? T.capRed : T.orange;
            const dirBg = g.direction === "positive" ? T.greenBg : g.direction === "negative" ? T.redBg : "rgba(234,88,12,0.08)";
            return (
              <Card key={i} T={T} style={{ padding: "18px 20px", display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ flexShrink: 0, textAlign: "center", minWidth: 80 }}>
                  <Pill T={T} color={dirColor} bg={dirBg}>{g.impact} impact</Pill>
                  <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 4 }}>{g.timeframe}</div>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>{g.factor}</div>
                  <p style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, margin: 0 }}>{g.detail}</p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Conclusion */}
        <Card T={T} style={{ padding: "24px 28px", marginTop: 24, borderLeft: `4px solid ${T.orange}` }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 12 }}>Conclusion</div>
          <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.85, marginBottom: 12, margin: "0 0 12px" }}>
            CEG's valuation premium reflects a genuine structural advantage {"\u2014"} irreplaceable nuclear assets meeting unprecedented AI-driven demand {"\u2014"} rather than mere momentum. The 34% correction from peak has partially de-risked the entry point, and the consensus ~$390 target implies substantial upside if execution proceeds.
          </p>
          <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.85, margin: 0 }}>
            The most overlooked insight may be the sheer scale of uncontracted optionality: 147 TWh of nuclear capacity seeking long-term homes in a market where hyperscalers are spending hundreds of billions on AI infrastructure that demands precisely the power CEG produces.
          </p>
        </Card>
      </div>

      {/* Footer */}
      <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, lineHeight: 1.7, maxWidth: 700, paddingBottom: 20 }}>
        Valuation analysis for informational purposes only. Does not constitute investment advice. Data sourced from Bloomberg, Morgan Stanley, UBS, company filings, and sell-side research. All figures reflect publicly available data as of April 2026.
      </div>
    </div>
  );

  /* ─── TAB CONTENT MAP ─── */
  const tabContent = { "Primer": primerTab, "Structural Forces": structuralForcesTab, "Valuation": valuationTab };

  return (
    <div>
      {header}
      <Tabs tabs={allTabs} active={tab} onChange={setTab} T={T} />
      {tabContent[tab]}
    </div>
  );
}
