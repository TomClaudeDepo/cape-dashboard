import { useState, useRef, useEffect } from "react";
import { Fn, Fh } from "../theme";
import { Card, Pill } from "../components/shared";
import {
  heroStats, thesisCards, thesisSections, chartData,
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
  const [tab, setTab] = useState("Structural Forces");
  const allTabs = ["Structural Forces"];

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

  /* ─── TAB CONTENT MAP ─── */
  const tabContent = { "Structural Forces": structuralForcesTab };

  return (
    <div>
      {header}
      <Tabs tabs={allTabs} active={tab} onChange={setTab} T={T} />
      {tabContent[tab]}
    </div>
  );
}
