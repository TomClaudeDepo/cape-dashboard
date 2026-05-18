import { useState, useRef, useEffect } from "react";
import { Fn, Fh } from "../theme";
import { Card, Pill } from "../components/shared";
import {
  heroStats, businessDescription, segmentsProse, segments, endMarkets,
  researchVsProduction, bioproduction, orbitrap, cryoem, services,
  valueChainIntro, valueChainStages, competitorIntro, competitors,
  moatIntro, moats,
} from "../data/research-tmo";
import {
  themesHeroStats, themesIntro, themes, platformThesis, epsBridge, thematicRisks,
  bullBearIntro, bullCase, bearCase, tippingPoints,
  tailwindsIntro, tailwinds, tailwindsConnection,
} from "../data/research-tmo-themes";
import {
  finHeroStats, setupNarrative, q1Results, biNote, consensusEvolution,
  multiples, growthEstimates, peerComp, peerReturns5Y, peerRankings,
  underperformance, catalysts, smartMoney,
} from "../data/research-tmo-fin";

/* ═══════════════════════════════════════════ SHARED COMPONENTS ═══════════════════════════════════════════ */

function PieChart({ data, size = 220, T, label }) {
  const [hov, setHov] = useState(null);
  const r = size / 2 - 8, cx = size / 2, cy = size / 2;
  let cumAngle = -90;
  const slices = data.map((d, i) => {
    const angle = (d.share / 100) * 360, startAngle = cumAngle; cumAngle += angle;
    const endAngle = cumAngle, sr = (Math.PI/180)*startAngle, er = (Math.PI/180)*endAngle;
    const large = angle > 180 ? 1 : 0;
    const x1=cx+r*Math.cos(sr),y1=cy+r*Math.sin(sr),x2=cx+r*Math.cos(er),y2=cy+r*Math.sin(er);
    const mid = (Math.PI/180)*((startAngle+endAngle)/2), pull = hov===i?6:0;
    const dx=pull*Math.cos(mid), dy=pull*Math.sin(mid);
    return { ...d, path: `M ${cx+dx} ${cy+dy} L ${x1+dx} ${y1+dy} A ${r} ${r} 0 ${large} 1 ${x2+dx} ${y2+dy} Z`, i };
  });
  return (
    <div>
      {label && <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 12 }}>{label}</div>}
      <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ flexShrink: 0 }}>
          {slices.map(s => (<path key={s.i} d={s.path} fill={s.color} stroke={T.card} strokeWidth="2" opacity={hov !== null && hov !== s.i ? 0.4 : 1} style={{ transition: "all 0.2s", cursor: "pointer" }} onMouseEnter={() => setHov(s.i)} onMouseLeave={() => setHov(null)} />))}
          {hov !== null && (<g><text x={cx} y={cy - 6} textAnchor="middle" fontSize="20" fontWeight="700" fill={T.text} fontFamily={Fn}>{data[hov].share}%</text><text x={cx} y={cy + 12} textAnchor="middle" fontSize="10" fill={T.textSec} fontFamily={Fn}>{data[hov].name}</text></g>)}
        </svg>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {data.map((d, i) => (
            <div key={i} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "4px 8px", borderRadius: 6, background: hov === i ? T.pillBg : "transparent", transition: "background 0.15s" }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: d.color, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: hov === i ? T.text : T.textSec, fontFamily: Fn, fontWeight: hov === i ? 600 : 400, transition: "all 0.15s" }}>{d.name} — {d.share}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Expandable({ title, subtitle, children, T, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const innerRef = useRef(null);
  const [maxH, setMaxH] = useState(0);
  useEffect(() => { if (innerRef.current) setMaxH(innerRef.current.scrollHeight); }, [open, children]);
  return (
    <div style={{ background: T.card, borderRadius: T.radius, border: "1px solid " + T.border, overflow: "hidden", transition: "all 0.2s", boxShadow: open ? T.shadowLg : T.shadow }}>
      <div onClick={() => setOpen(!open)} style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn }}>{title}</div>
          {subtitle && <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginTop: 2 }}>{subtitle}</div>}
        </div>
        <span style={{ fontSize: 16, color: T.textTer, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
      </div>
      <div style={{ maxHeight: open ? maxH + 20 : 0, overflow: "hidden", transition: "max-height 0.35s ease" }}>
        <div ref={innerRef} onClick={e => e.stopPropagation()} style={{ padding: "0 20px 20px", cursor: "default" }}>{children}</div>
      </div>
    </div>
  );
}

function Tabs({ tabs, active, onChange, T }) {
  return (
    <div style={{ display: "flex", gap: 4, background: T.pillBg, borderRadius: T.radiusSm, padding: 3, marginBottom: 28, flexWrap: "wrap" }}>
      {tabs.map(t => (
        <button key={t} onClick={() => onChange(t)} style={{ padding: "8px 14px", borderRadius: 6, border: "none", fontSize: 12, fontFamily: Fn, fontWeight: active === t ? 600 : 400, background: active === t ? T.card : "transparent", color: active === t ? T.text : T.textTer, cursor: "pointer", transition: "all 0.15s", boxShadow: active === t ? T.shadow : "none", whiteSpace: "nowrap" }}>{t}</button>
      ))}
    </div>
  );
}

function MoatCard({ moat, T }) {
  const [open, setOpen] = useState(false);
  const catColors = { "Switching Costs": T.green, "Intangible Assets": T.deepBlue, "Scale Economies": T.orange, "Network Effects": T.purple || "#9333EA", "Customer Economics": T.capRed, "Operational": T.textSec };
  const c = catColors[moat.category] || T.textSec;
  return (
    <div style={{ background: T.card, borderRadius: T.radius, border: "1px solid " + T.border, overflow: "hidden", boxShadow: open ? T.shadowLg : T.shadow, transition: "all 0.2s" }}>
      <div onClick={() => setOpen(!open)} style={{ padding: "18px 22px", cursor: "pointer" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, flex: 1 }}>{moat.title}</span>
          <Pill T={T} color={c} bg={c + "14"}>{moat.category}</Pill>
        </div>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <span style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginRight: 6 }}>Strength</span>
          {[1, 2, 3, 4, 5].map(i => (<div key={i} style={{ width: 28, height: 6, borderRadius: 3, background: i <= moat.strength ? c : T.pillBg, transition: "background 0.3s" }} />))}
          <span style={{ fontSize: 16, color: T.textTer, marginLeft: "auto", transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
        </div>
      </div>
      {open && <div style={{ padding: "0 22px 20px" }}><p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: 0 }}>{moat.description}</p></div>}
    </div>
  );
}

/* Stage card for product primer walkthroughs */
function StageCard({ stage, color, T, idx }) {
  const [open, setOpen] = useState(idx === 0); // first stage open by default
  return (
    <div style={{ marginBottom: 14 }}>
      <Card T={T} style={{ padding: 0, overflow: "hidden", borderLeft: `4px solid ${color}` }}>
        <div onClick={() => setOpen(!open)} style={{ padding: "18px 22px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: color + "1A", border: "1px solid " + color + "33", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: color, fontFamily: Fn }}>{idx + 1}</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn }}>{stage.title}</div>
            <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginTop: 2 }}>{stage.subtitle}</div>
          </div>
          <span style={{ fontSize: 16, color: T.textTer, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
        </div>
        {open && (
          <div style={{ padding: "0 22px 22px 72px" }}>
            <p style={{ fontSize: 13.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.85, margin: "0 0 14px" }}>{stage.content}</p>
            <div style={{ padding: "14px 16px", borderRadius: T.radiusSm, background: T.pillBg, borderLeft: `3px solid ${color}` }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: color, fontFamily: Fn, letterSpacing: "0.08em", marginBottom: 6, textTransform: "uppercase" }}>Deeper detail</div>
              <p style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: 0 }}>{stage.detail}</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

/* Theme card for thematic case */
function ThemeCard({ theme, T, idx }) {
  const [open, setOpen] = useState(idx === 0);
  return (
    <div style={{ marginBottom: 16 }}>
      <Card T={T} style={{ padding: 0, overflow: "hidden", borderLeft: `4px solid ${theme.color}` }}>
        <div onClick={() => setOpen(!open)} style={{ padding: "20px 24px", cursor: "pointer" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: theme.color + "1A", border: "1px solid " + theme.color + "33", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: theme.color, fontFamily: Fn }}>{idx + 1}</span>
            </div>
            <span style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, flex: 1 }}>{theme.name}</span>
            <span style={{ fontSize: 16, color: T.textTer, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
          </div>
          <div style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, marginLeft: 44 }}>{theme.summary}</div>
          <div style={{ marginTop: 8, marginLeft: 44, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 10, fontWeight: 600, color: theme.color, fontFamily: Fn, letterSpacing: "0.05em", textTransform: "uppercase" }}>Primary exposure</span>
            <span style={{ fontSize: 11, color: T.textSec, fontFamily: Fn }}>{theme.primary}</span>
          </div>
        </div>
        {open && (
          <div style={{ padding: "0 24px 22px 68px" }}>
            <p style={{ fontSize: 13.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.85, margin: "0 0 14px" }}>{theme.intro}</p>
            <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.8, margin: "0 0 16px" }}>{theme.detail}</p>
            <div style={{ fontSize: 11, fontWeight: 600, color: theme.color, fontFamily: Fn, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 10 }}>Sub-themes</div>
            <div style={{ display: "grid", gap: 8, marginBottom: 16 }}>
              {theme.subthemes.map((st, i) => (
                <div key={i} style={{ padding: "12px 14px", background: T.pillBg, borderRadius: T.radiusSm, borderLeft: `3px solid ${theme.color}` }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>{st.name}</div>
                  <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7 }}>{st.desc}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: "14px 18px", borderRadius: T.radiusSm, background: theme.color + "10", border: "1px solid " + theme.color + "22" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: theme.color, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Verdict</div>
              <p style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: 0 }}>{theme.conclusion}</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

/* Horizontal bar (for ranking heatmaps) */
function HorizBar({ label, value, max, color, T, suffix = "" }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 12, color: T.text, fontFamily: Fn }}>{label}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: color, fontFamily: Fn }}>{value > 0 ? "+" : ""}{value.toFixed(2)}{suffix}</span>
      </div>
      <div style={{ height: 8, borderRadius: 4, background: T.pillBg, overflow: "hidden", position: "relative" }}>
        <div style={{
          height: "100%", borderRadius: 4, background: color,
          width: `${Math.min(100, Math.abs(value) / max * 100)}%`,
          marginLeft: value < 0 ? `${50 - Math.abs(value) / max * 50}%` : "0%",
          transition: "width 0.8s"
        }} />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════ MAIN ════════════════════════════════════════════════════════════════ */
export default function ResearchTMO({ T }) {
  const [section, setSection] = useState("primer");
  const [tab, setTab] = useState("Business Overview");
  const [thTab, setThTab] = useState("3 Tailwinds");
  const [fTab, setFTab] = useState("Current Setup");

  const primerTabs = ["Business Overview", "Segments", "Research vs Production", "Bioproduction Primer", "Orbitrap Primer", "Cryo-EM Primer", "Services", "Value Chain", "Competitive Position", "Moat Analysis"];
  const thematicTabs = ["3 Tailwinds"];
  const finTabs = ["Current Setup", "Bull vs Bear", "Q1 2026 & BI Note", "Consensus Evolution", "Valuation & Multiples", "EPS Bridge", "Peer Comparison", "Why Underperforming", "Thematic Risks", "Catalysts", "Smart Money"];

  const prose = (text, s = {}) => <p style={{ fontSize: 13.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.8, margin: "0 0 16px", ...s }}>{text}</p>;
  const sTitle = (t) => <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 16, letterSpacing: "-0.01em" }}>{t}</div>;
  const activeHero = section === "primer" ? heroStats : section === "thematic" ? themesHeroStats : finHeroStats;
  const secColors = { primer: T.green, thematic: T.orange, fin: T.deepBlue };
  const secBgs = { primer: T.greenBg, thematic: "rgba(234,88,12,0.08)", fin: "rgba(29,78,216,0.08)" };
  const secLabels = { primer: "Business Primer", thematic: "Thematic Case", fin: "Financials & Setup" };

  /* ─── HEADER ─── */
  const header = (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
        <span style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 36, color: T.text }}>Thermo Fisher Scientific</span>
        <span style={{ fontSize: 14, fontWeight: 600, color: T.textTer, fontFamily: Fn, letterSpacing: "0.04em" }}>TMO US</span>
        <Pill T={T} color={secColors[section]} bg={secBgs[section]}>{secLabels[section]}</Pill>
      </div>
      <div style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, marginBottom: 16 }}>NYSE · Waltham, Massachusetts · World's largest life sciences tools and services platform · $44.6B revenue</div>
      <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
        {[["primer", "Business Primer"], ["thematic", "Thematic Case"], ["fin", "Financials & Setup"]].map(([k, l]) => (
          <button key={k} onClick={() => setSection(k)} style={{ padding: "10px 20px", borderRadius: T.radiusSm, border: section === k ? "2px solid " + secColors[k] : "1px solid " + T.border, fontSize: 12, fontFamily: Fn, fontWeight: section === k ? 700 : 400, background: section === k ? secBgs[k] : T.card, color: section === k ? secColors[k] : T.textTer, cursor: "pointer", transition: "all 0.15s" }}>{l}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10 }}>
        {activeHero.map((s, i) => (
          <div key={i} style={{ background: T.card, borderRadius: T.radiusSm, padding: "14px 16px", border: "1px solid " + T.border }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: T[s.color] || T.text, fontFamily: Fn }}>{s.value}</div>
            <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 3, lineHeight: 1.4 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );

  /* ═══════════════════════════════════════════ PRIMER TABS ═══════════════════════════════════════════ */
  const overviewTab = (
    <div>
      {sTitle("What does Thermo Fisher Scientific do?")}
      {/* First three paragraphs as prose */}
      {businessDescription.slice(0, 3).map((p, i) => <div key={i}>{prose(p)}</div>)}

      {/* End-market exposure visualized as a pie chart */}
      <div style={{ margin: "8px 0 20px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: T.deepBlue, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>End-market exposure</div>
        <Card T={T} style={{ padding: 26 }}>
          <PieChart data={endMarkets.map(e => ({ name: e.name, share: e.share, color: e.color }))} T={T} label="Revenue by end-market (FY2025)" size={220} />
        </Card>
      </div>

      {/* Final paragraph (customer concentration) as prose */}
      {businessDescription.slice(3).map((p, i) => <div key={`tail-${i}`}>{prose(p)}</div>)}
    </div>
  );

  const segmentsTab = (
    <div>
      {prose(segmentsProse)}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24, marginBottom: 32 }}>
        <Card T={T} style={{ padding: 24 }}>
          <PieChart data={segments.map(s => ({ name: s.name, share: s.share, color: s.color }))} T={T} label="Revenue by segment (FY2025)" size={200} />
        </Card>
        <Card T={T} style={{ padding: 24 }}>
          <PieChart data={endMarkets.map(e => ({ name: e.name, share: e.share, color: e.color }))} T={T} label="Revenue by end-market (FY2025)" size={200} />
        </Card>
      </div>
      {sTitle("End-market detail")}
      <div style={{ display: "grid", gap: 10, marginBottom: 28 }}>
        {endMarkets.map((e, i) => (
          <Expandable key={i} title={e.name} subtitle={`~${e.share}% of revenue`} T={T}>{prose(e.description)}</Expandable>
        ))}
      </div>
      {sTitle("Segment detail — description, growth, and cost structure")}
      {segments.map((s, i) => (
        <div key={i} style={{ marginBottom: 16 }}>
          <Card T={T} style={{ padding: 0, overflow: "hidden", borderLeft: `4px solid ${s.color}` }}>
            <div style={{ padding: "20px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span style={{ fontSize: 16, fontWeight: 600, color: T.text, fontFamily: Fn }}>{s.name}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: s.color, fontFamily: Fn }}>~{s.share}% of revenue</span>
              </div>
              {prose(s.description)}
              <Expandable title="Growth dynamics" T={T}>{prose(s.growthNote)}</Expandable>
              <div style={{ height: 8 }} />
              <Expandable title="Cost structure" T={T}>{prose(s.costNote)}</Expandable>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );

  const researchProductionTab = (
    <div>
      {prose(researchVsProduction.intro)}
      <Card T={T} style={{ padding: 28, marginBottom: 24 }}>
        <PieChart data={researchVsProduction.buckets.map(b => ({ name: b.name, share: b.share, color: b.color }))} T={T} label="Revenue split — research vs production framing" size={220} />
      </Card>
      <div style={{ display: "grid", gap: 12, marginBottom: 24 }}>
        {researchVsProduction.buckets.map((b, i) => (
          <Card key={i} T={T} style={{ padding: "18px 22px", borderLeft: `4px solid ${b.color}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, flex: 1 }}>{b.name}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: b.color, fontFamily: Fn }}>~{b.share}%</span>
            </div>
            <p style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: 0 }}>{b.detail}</p>
          </Card>
        ))}
      </div>
      <div style={{ padding: "18px 22px", borderRadius: T.radius, background: T.greenBg, border: "1px solid " + T.border }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: T.green, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>The strategic insight</div>
        <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: 0 }}>{researchVsProduction.insight}</p>
      </div>
    </div>
  );

  /* ── PRODUCT PRIMER tab renderer (used for Bioproduction, Orbitrap, Cryo-EM) ── */
  /* ═══════════════════════════════════════════════════════════════════════
     PRIMER VISUAL COMPONENTS LIBRARY
     Each stage of each primer maps to a dedicated SVG/HTML visualization.
     ═══════════════════════════════════════════════════════════════════════ */

  /* ──────── BIOPRODUCTION VISUALS ──────── */

  /* Hero visual — arms dealer position */
  function ArmsDealerVisual({ T, accent }) {
    const customers = ["Pfizer", "Roche", "AstraZeneca", "Amgen", "Lilly", "Novo", "Lonza", "Catalent", "Samsung", "Wuxi"];
    return (
      <div style={{ padding: "26px 24px", background: T.card, borderRadius: T.radius, border: "1px solid " + T.border, marginBottom: 24, boxShadow: T.shadow }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: accent, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16, textAlign: "center" }}>Why "arms dealer" — TMO supplies every manufacturer including the CDMOs</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 30, alignItems: "center" }}>
          {/* TMO source */}
          <div style={{ textAlign: "center" }}>
            <div style={{ display: "inline-block", padding: "18px 22px", background: accent, borderRadius: T.radius, color: "#fff" }}>
              <div style={{ fontSize: 14, fontWeight: 800, fontFamily: Fn, marginBottom: 4 }}>Thermo Fisher</div>
              <div style={{ fontSize: 10, opacity: 0.9, fontFamily: Fn, marginBottom: 10 }}>Bioproduction</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {["Gibco media", "HyClone bioreactors", "Purification resins"].map((p, i) => (
                  <div key={i} style={{ fontSize: 10, padding: "3px 8px", background: "rgba(255,255,255,0.15)", borderRadius: 4, fontFamily: Fn }}>{p}</div>
                ))}
              </div>
            </div>
          </div>
          {/* Arrow */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <svg width="80" height="50" viewBox="0 0 80 50">
              <defs><marker id="arrow-ad" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill={accent} /></marker></defs>
              <line x1="5" y1="25" x2="70" y2="25" stroke={accent} strokeWidth="2" markerEnd="url(#arrow-ad)" />
              <text x="40" y="18" textAnchor="middle" fontSize="9" fill={T.textTer} fontFamily={Fn}>sells inputs</text>
            </svg>
          </div>
          {/* Customers grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 6 }}>
            {customers.map((c, i) => {
              const isCdmo = ["Lonza", "Catalent", "Samsung", "Wuxi"].includes(c);
              return (
                <div key={i} style={{ padding: "8px 10px", background: T.pillBg, borderRadius: T.radiusSm, border: `1px solid ${isCdmo ? T.orange : T.border}`, textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: T.text, fontFamily: Fn }}>{c}</div>
                  <div style={{ fontSize: 8, color: isCdmo ? T.orange : T.textTer, fontFamily: Fn, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginTop: 1 }}>{isCdmo ? "CDMO" : "Pharma"}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginTop: 14, textAlign: "center", fontStyle: "italic" }}>Whoever wins the biologics race — pharma or CDMO — Thermo Fisher participates through bioproduction inputs.</div>
      </div>
    );
  }

  /* Media composition wheel — 80-100 components */
  function MediaCompositionWheel({ T, accent }) {
    const groups = [
      { name: "Amino acids", count: 20, color: accent, angle: 80 },
      { name: "Sugars", count: 5, color: T.deepBlue, angle: 30 },
      { name: "Vitamins", count: 15, color: T.orange, angle: 50 },
      { name: "Trace minerals", count: 20, color: T.purple, angle: 70 },
      { name: "Lipids", count: 10, color: T.capRed, angle: 35 },
      { name: "Growth factors", count: 8, color: T.textSec, angle: 30 },
      { name: "Buffering agents", count: 5, color: T.textTer, angle: 25 },
      { name: "Other", count: 12, color: T.grey400, angle: 40 },
    ];
    const total = groups.reduce((s, g) => s + g.count, 0);
    const cx = 130, cy = 130, r = 100, innerR = 50;
    let cumAngle = -90;
    return (
      <Card T={T} style={{ padding: 24, marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: accent, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>Modern cell culture media composition</div>
        <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 18 }}>~{total} distinct components, each at precise concentration</div>
        <div style={{ display: "flex", alignItems: "center", gap: 26, flexWrap: "wrap", justifyContent: "center" }}>
          <svg width={260} height={260} viewBox="0 0 260 260">
            {groups.map((g, i) => {
              const angle = (g.count / total) * 360, startAngle = cumAngle; cumAngle += angle;
              const endAngle = cumAngle, sr = (Math.PI / 180) * startAngle, er = (Math.PI / 180) * endAngle;
              const large = angle > 180 ? 1 : 0;
              const x1 = cx + r * Math.cos(sr), y1 = cy + r * Math.sin(sr), x2 = cx + r * Math.cos(er), y2 = cy + r * Math.sin(er);
              const ix1 = cx + innerR * Math.cos(sr), iy1 = cy + innerR * Math.sin(sr), ix2 = cx + innerR * Math.cos(er), iy2 = cy + innerR * Math.sin(er);
              const path = `M ${ix1} ${iy1} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${innerR} ${innerR} 0 ${large} 0 ${ix1} ${iy1} Z`;
              return <path key={i} d={path} fill={g.color} stroke={T.card} strokeWidth="2" />;
            })}
            <text x={cx} y={cy - 6} textAnchor="middle" fontSize="22" fontWeight="800" fill={T.text} fontFamily={Fn}>{total}</text>
            <text x={cx} y={cy + 12} textAnchor="middle" fontSize="9" fill={T.textTer} fontFamily={Fn}>distinct components</text>
          </svg>
          <div style={{ display: "grid", gridTemplateColumns: "auto auto", gap: "6px 16px" }}>
            {groups.map((g, i) => (
              <div key={i} style={{ display: "contents" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: g.color }} />
                  <span style={{ fontSize: 11, color: T.textSec, fontFamily: Fn }}>{g.name}</span>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: T.text, fontFamily: Fn, textAlign: "right" }}>~{g.count}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  /* Bioreactor scale ladder — 1L to 2000L */
  function BioreactorScaleLadder({ T, accent }) {
    const scales = [
      { size: 1, label: "1L", use: "Lab / process development", height: 30 },
      { size: 50, label: "50L", use: "Process scale-up", height: 55 },
      { size: 200, label: "200L", use: "Clinical material", height: 85 },
      { size: 1000, label: "1,000L", use: "Commercial production", height: 130 },
      { size: 2000, label: "2,000L", use: "Large commercial", height: 175 },
    ];
    const [hov, setHov] = useState(null);
    return (
      <Card T={T} style={{ padding: 24, marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: accent, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>HyClone single-use bioreactor scale ladder</div>
        <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 18 }}>Same product family across the entire commercial manufacturing volume range</div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-around", gap: 20, height: 220, marginBottom: 12 }}>
          {scales.map((s, i) => (
            <div key={i} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: hov === i ? accent : T.text, fontFamily: Fn, marginBottom: 6 }}>{s.label}</div>
              <div style={{
                width: 50 + i * 14, height: s.height,
                background: hov === i ? accent : accent + "33",
                border: `2px solid ${accent}`,
                borderRadius: "8px 8px 6px 6px",
                position: "relative",
                transition: "all 0.25s",
                opacity: hov !== null && hov !== i ? 0.4 : 1,
              }}>
                <div style={{ position: "absolute", left: -6, right: -6, top: -3, height: 5, background: accent, borderRadius: 3 }} />
                <div style={{ position: "absolute", bottom: 6, left: 0, right: 0, textAlign: "center", fontSize: 9, color: hov === i ? "#fff" : accent, fontWeight: 700, fontFamily: Fn }}>SU</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-around", gap: 20 }}>
          {scales.map((s, i) => (
            <div key={i} style={{ flex: 1, fontSize: 10, color: hov === i ? T.text : T.textTer, fontFamily: Fn, textAlign: "center", fontWeight: hov === i ? 600 : 400, transition: "all 0.2s" }}>{s.use}</div>
          ))}
        </div>
        <div style={{ marginTop: 16, padding: "12px 14px", background: accent + "10", borderRadius: T.radiusSm, fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.6 }}>
          <strong style={{ color: accent }}>Why single-use won:</strong> Pre-sterilised disposable bags eliminate stainless steel cleaning validation (weeks of downtime per batch), enable multi-product flexibility in one facility, and collapse facility build time from years to months. Each bag is a consumable annuity per approved drug.
        </div>
      </Card>
    );
  }

  /* Purification flow pipeline */
  function PurificationFlow({ T, accent }) {
    const stages = [
      { name: "Cell harvest", method: "Filtration", desc: "Separate cells from liquid", icon: "▼" },
      { name: "Capture", method: "Protein A affinity", desc: "Bind antibody, discard waste", icon: "◉" },
      { name: "Polishing", method: "Ion exchange", desc: "Remove final impurities", icon: "✦" },
      { name: "Viral removal", method: "Nanofiltration", desc: "Pass through ultra-fine filter", icon: "▤" },
      { name: "Pure drug substance", method: "Final product", desc: "Ready for formulation", icon: "✓" },
    ];
    return (
      <Card T={T} style={{ padding: 24, marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: accent, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>Downstream purification — process flow</div>
        <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 20 }}>Every step uses Thermo Fisher consumables locked into the FDA filing</div>
        <div style={{ display: "flex", alignItems: "stretch", gap: 0, position: "relative", flexWrap: "wrap" }}>
          {stages.map((s, i) => (
            <div key={i} style={{ flex: 1, minWidth: 140, position: "relative", display: "flex", alignItems: "stretch" }}>
              <div style={{ flex: 1, background: i === stages.length - 1 ? accent : T.card, color: i === stages.length - 1 ? "#fff" : T.text, border: `2px solid ${accent}`, borderRadius: T.radiusSm, padding: "12px 10px", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", margin: "0 4px" }}>
                <div style={{ fontSize: 20, color: i === stages.length - 1 ? "#fff" : accent, fontFamily: Fn, marginBottom: 4 }}>{s.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 700, fontFamily: Fn, marginBottom: 3 }}>{s.name}</div>
                <div style={{ fontSize: 9, fontWeight: 600, opacity: 0.85, fontFamily: Fn, letterSpacing: "0.03em", textTransform: "uppercase", marginBottom: 3 }}>{s.method}</div>
                <div style={{ fontSize: 9, color: i === stages.length - 1 ? "rgba(255,255,255,0.85)" : T.textTer, fontFamily: Fn, lineHeight: 1.4 }}>{s.desc}</div>
              </div>
              {i < stages.length - 1 && (
                <div style={{ display: "flex", alignItems: "center", color: accent, fontSize: 18, fontWeight: 800 }}>→</div>
              )}
            </div>
          ))}
        </div>
      </Card>
    );
  }

  /* FDA Lock-In Timeline — 15-20 year annuity */
  function FDALockInTimeline({ T, accent }) {
    const phases = [
      { label: "Process dev", years: "Years 1-3", desc: "Customer designs in TMO products", color: T.deepBlue },
      { label: "Clinical trials", years: "Years 3-7", desc: "Process validated in human trials", color: T.orange },
      { label: "FDA filing", years: "Year 7-8", desc: "TMO products locked into BLA", color: T.capRed, isLock: true },
      { label: "Commercial supply", years: "Years 8-25+", desc: "Annuity revenue for life of drug", color: accent, isAnnuity: true },
    ];
    return (
      <Card T={T} style={{ padding: 24, marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: accent, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>FDA process lock-in — the 15-20 year annuity</div>
        <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 20 }}>Once approved, switching media or bioreactor requires regulatory amendment with FDA</div>
        <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
          {phases.map((p, i) => {
            const widths = [12, 25, 8, 55];
            return (
              <div key={i} style={{ flex: widths[i], position: "relative" }}>
                <div style={{ background: p.color, borderRadius: T.radiusSm, padding: "14px 10px", color: "#fff", textAlign: "center", position: "relative" }}>
                  {p.isLock && (
                    <div style={{ position: "absolute", top: -12, right: -8, background: T.card, border: `2px solid ${p.color}`, borderRadius: "50%", width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🔒</div>
                  )}
                  <div style={{ fontSize: 11, fontWeight: 800, fontFamily: Fn, marginBottom: 4 }}>{p.label}</div>
                  <div style={{ fontSize: 9, opacity: 0.85, fontFamily: Fn }}>{p.years}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {phases.map((p, i) => {
            const widths = [12, 25, 8, 55];
            return (
              <div key={i} style={{ flex: widths[i], fontSize: 10, color: T.textTer, fontFamily: Fn, textAlign: "center", lineHeight: 1.5, padding: "0 4px" }}>{p.desc}</div>
            );
          })}
        </div>
        <div style={{ marginTop: 18, padding: "14px 16px", background: accent + "10", borderRadius: T.radiusSm, borderLeft: `3px solid ${accent}` }}>
          <div style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.6 }}>
            <strong style={{ color: accent }}>Switching cost = regulatory refile.</strong> Changing media composition or bioreactor type after FDA approval requires a Prior Approval Supplement (12-24 months) and risks supply disruption. In practice, customers stay with the original supplier for the entire 15-20 year commercial life of the drug.
          </div>
        </div>
      </Card>
    );
  }

  /* Bioprocessing Triopoly market */
  function TriopolyMarket({ T, accent }) {
    const players = [
      { name: "Thermo Fisher", brand: "Gibco / HyClone", share: 35, color: accent, highlight: true },
      { name: "Cytiva", brand: "(inside Danaher)", share: 35, color: T.deepBlue },
      { name: "Sartorius", brand: "Bioprocess Solutions", share: 25, color: T.orange },
      { name: "Other", brand: "Repligen, Merck KGaA, etc.", share: 5, color: T.textTer },
    ];
    return (
      <Card T={T} style={{ padding: 24, marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: accent, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>Bioprocessing market — global triopoly structure</div>
        <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 18 }}>New entrants face years of qualification work plus customers unwilling to take regulatory risk</div>
        <div style={{ display: "flex", height: 50, borderRadius: T.radiusSm, overflow: "hidden", marginBottom: 12 }}>
          {players.map((p, i) => (
            <div key={i} style={{ flex: p.share, background: p.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", borderRight: i < players.length - 1 ? `2px solid ${T.card}` : "none", position: "relative" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 14, fontWeight: 800, fontFamily: Fn }}>{p.share}%</div>
              </div>
              {p.highlight && (
                <div style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", fontSize: 12, color: accent }}>▼</div>
              )}
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {players.map((p, i) => (
            <div key={i} style={{ padding: "10px 12px", border: `1px solid ${p.highlight ? p.color : T.border}`, borderRadius: T.radiusSm, background: p.highlight ? p.color + "10" : T.card }}>
              <div style={{ fontSize: 12, fontWeight: p.highlight ? 800 : 600, color: p.color, fontFamily: Fn }}>{p.name}</div>
              <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 2 }}>{p.brand}</div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  /* GLP-1 Capacity Buildout */
  function GLP1CapacityViz({ T, accent }) {
    const investments = [
      { co: "Eli Lilly", amount: 42, color: T.capRed, sites: "Indianapolis, NC, Ireland, Germany" },
      { co: "Novo Nordisk", amount: 23, color: T.deepBlue, sites: "Denmark, NC, Catalent (acquired)" },
      { co: "Roche / Pfizer / AZ / Amgen", amount: 8, color: T.orange, sites: "Multiple — second wave" },
    ];
    const total = investments.reduce((s, i) => s + i.amount, 0);
    return (
      <Card T={T} style={{ padding: 24, marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: accent, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>GLP-1 manufacturing capacity commitment</div>
        <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 18 }}>${total}B+ committed and growing — every gram needs cell culture media and downstream consumables</div>
        <div style={{ marginBottom: 16 }}>
          {investments.map((inv, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: Fn }}>{inv.co}</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: inv.color, fontFamily: Fn }}>${inv.amount}B</span>
              </div>
              <div style={{ height: 14, background: T.pillBg, borderRadius: 7, overflow: "hidden" }}>
                <div style={{ height: "100%", background: inv.color, width: `${(inv.amount / total) * 100}%`, transition: "width 1s" }} />
              </div>
              <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 3 }}>{inv.sites}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: accent + "10", borderRadius: T.radiusSm }}>
          <div style={{ fontSize: 22, color: accent, fontWeight: 800, fontFamily: Fn }}>${total}B+</div>
          <div style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.5 }}>Combined GLP-1 manufacturing capex commitment, with second-wave entrants pushing totals significantly higher.</div>
        </div>
      </Card>
    );
  }

  /* ──────── ORBITRAP VISUALS ──────── */

  /* Resolution comparison vs competitors */
  function ResolutionComparison({ T, accent }) {
    const analyzers = [
      { name: "Quadrupole", maker: "Most makers", resolution: 5000, color: T.textTer },
      { name: "Time-of-Flight (TOF)", maker: "Waters, Bruker, SCIEX", resolution: 50000, color: T.orange },
      { name: "Orbitrap (Astral)", maker: "Thermo Fisher only", resolution: 240000, color: accent, highlight: true },
    ];
    const max = Math.max(...analyzers.map(a => a.resolution));
    return (
      <Card T={T} style={{ padding: 24, marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: accent, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>Resolving power — Orbitrap dominance</div>
        <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 20 }}>Maximum resolving power achievable on commercial instruments (FWHM at m/z 200)</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {analyzers.map((a, i) => (
            <div key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, alignItems: "baseline" }}>
                <div>
                  <span style={{ fontSize: 13, fontWeight: a.highlight ? 800 : 600, color: a.highlight ? a.color : T.text, fontFamily: Fn }}>{a.name}</span>
                  <span style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginLeft: 8 }}>{a.maker}</span>
                </div>
                <span style={{ fontSize: 16, fontWeight: 800, color: a.color, fontFamily: Fn }}>{(a.resolution / 1000).toFixed(0)}k</span>
              </div>
              <div style={{ height: 14, background: T.pillBg, borderRadius: 7, overflow: "hidden", position: "relative" }}>
                <div style={{ height: "100%", borderRadius: 7, background: a.color, width: `${(a.resolution / max) * 100}%`, transition: "width 1.2s" }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, padding: "12px 14px", background: accent + "10", borderRadius: T.radiusSm, fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.6 }}>
          <strong style={{ color: accent }}>~5x the resolution</strong> of the nearest competing technology, plus mass accuracy below 1 part per million. No competitor has replicated this combination in 20 years of trying.
        </div>
      </Card>
    );
  }

  /* Ion oscillation animation */
  function IonOscillationViz({ T, accent }) {
    const [t, setT] = useState(0);
    useEffect(() => {
      const id = setInterval(() => setT(x => (x + 1) % 360), 30);
      return () => clearInterval(id);
    }, []);
    const cx = 200, cy = 130;
    // Two ions orbiting at different m/z (different frequencies)
    const ion1Angle = t * 2;
    const ion2Angle = t * 1.4;
    const orbitR = 70;
    const ion1Y = cy + Math.sin((t * 5) * Math.PI / 180) * 35; // axial oscillation
    const ion2Y = cy + Math.sin((t * 3.5) * Math.PI / 180) * 35;
    return (
      <Card T={T} style={{ padding: 24, marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: accent, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>Orbitrap physics — ion oscillation around central electrode</div>
        <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 18 }}>Axial oscillation frequency depends only on m/z — measured via image current detection</div>
        <svg width="100%" height="260" viewBox="0 0 400 260" style={{ display: "block" }}>
          {/* Outer barrel electrodes */}
          <ellipse cx={cx} cy={cy} rx="150" ry="90" fill="none" stroke={T.textTer} strokeWidth="2" strokeDasharray="4 3" />
          <text x="350" y={cy + 4} fontSize="9" fill={T.textTer} fontFamily={Fn}>Outer barrel</text>
          {/* Spindle central electrode */}
          <ellipse cx={cx} cy={cy} rx="20" ry="60" fill={accent} opacity="0.85" />
          <text x={cx} y={cy - 75} fontSize="9" fill={accent} fontFamily={Fn} textAnchor="middle" fontWeight="700">Central spindle electrode</text>
          {/* Orbit paths */}
          <ellipse cx={cx} cy={cy} rx={orbitR} ry="50" fill="none" stroke={accent} strokeWidth="1" strokeDasharray="2 4" opacity="0.5" />
          {/* Ions in motion */}
          {(() => {
            const x1 = cx + orbitR * Math.cos(ion1Angle * Math.PI / 180);
            return <circle cx={x1} cy={ion1Y} r="7" fill={T.capRed}><title>Ion 1 — heavier m/z, slower frequency</title></circle>;
          })()}
          {(() => {
            const x2 = cx + orbitR * Math.cos((ion2Angle + 180) * Math.PI / 180);
            return <circle cx={x2} cy={ion2Y} r="7" fill={T.deepBlue}><title>Ion 2 — lighter m/z, faster frequency</title></circle>;
          })()}
          {/* Labels */}
          <g transform="translate(20, 220)">
            <circle cx="6" cy="6" r="5" fill={T.capRed} />
            <text x="18" y="10" fontSize="10" fill={T.textSec} fontFamily={Fn}>Ion 1 (high m/z) — lower frequency</text>
          </g>
          <g transform="translate(220, 220)">
            <circle cx="6" cy="6" r="5" fill={T.deepBlue} />
            <text x="18" y="10" fontSize="10" fill={T.textSec} fontFamily={Fn}>Ion 2 (low m/z) — higher frequency</text>
          </g>
          {/* Image current detection annotation */}
          <line x1="20" y1={cy} x2="50" y2={cy} stroke={T.green} strokeWidth="1.5" />
          <text x="22" y={cy - 6} fontSize="9" fill={T.green} fontFamily={Fn}>Image current detector</text>
        </svg>
        <div style={{ marginTop: 8, padding: "12px 14px", background: accent + "10", borderRadius: T.radiusSm, fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.6 }}>
          <strong style={{ color: accent }}>Why it works:</strong> Each ion orbits the central spindle while oscillating axially. The axial frequency depends only on mass-to-charge ratio, not initial velocity or position — making the measurement extraordinarily precise.
        </div>
      </Card>
    );
  }

  /* Orbitrap instrument family */
  function OrbitrapFamily({ T, accent }) {
    const instruments = [
      { name: "Q Exactive", year: 2011, price: "$0.4M", segment: "Entry / pharma QC", level: 1 },
      { name: "Exploris", year: 2019, price: "$0.7M", segment: "Mainstream proteomics", level: 2 },
      { name: "Ascend BioPharma", year: 2021, price: "$1.0M", segment: "Biopharma characterisation", level: 3 },
      { name: "Astral", year: 2023, price: "$1.5M+", segment: "Flagship — proteomics", level: 4 },
    ];
    return (
      <Card T={T} style={{ padding: 24, marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: accent, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>Orbitrap instrument family — 18 years of platform evolution</div>
        <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 20 }}>Continuous R&D investment — the Astral analyser (2023) was a meaningful generational advance</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 200, marginBottom: 12 }}>
          {instruments.map((inst, i) => {
            const h = 50 + inst.level * 30;
            return (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: accent, fontFamily: Fn, marginBottom: 4 }}>{inst.price}</div>
                <div style={{ width: "100%", maxWidth: 110, height: h, background: i === instruments.length - 1 ? accent : accent + (40 + i * 30).toString(16).slice(0, 2), border: `2px solid ${accent}`, borderRadius: "8px 8px 4px 4px", display: "flex", alignItems: "center", justifyContent: "center", color: i === instruments.length - 1 ? "#fff" : accent, fontWeight: 800, fontSize: 12, fontFamily: Fn, transition: "all 0.3s" }}>{inst.name}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: T.text, fontFamily: Fn, marginTop: 6 }}>{inst.year}</div>
                <div style={{ fontSize: 9, color: T.textTer, fontFamily: Fn, marginTop: 2, textAlign: "center", lineHeight: 1.4, maxWidth: 110 }}>{inst.segment}</div>
              </div>
            );
          })}
        </div>
      </Card>
    );
  }

  /* Orbitrap applications */
  function OrbitrapApplications({ T, accent }) {
    const apps = [
      { name: "Proteomics", share: 40, desc: "Large-scale protein identification" },
      { name: "Pharma QC", share: 25, desc: "Impurity characterisation" },
      { name: "Clinical / TDM", share: 15, desc: "Newborn screening, drug monitoring" },
      { name: "Metabolomics", share: 10, desc: "Small molecule biomarker discovery" },
      { name: "Drug discovery", share: 10, desc: "Compound screening libraries" },
    ];
    return (
      <Card T={T} style={{ padding: 24, marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: accent, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>Where Orbitrap dominates — application share</div>
        <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 18 }}>Dominant share in high-value applications where resolution matters most</div>
        {apps.map((a, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: Fn }}>{a.name}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: accent, fontFamily: Fn }}>{a.share}%</span>
            </div>
            <div style={{ height: 8, background: T.pillBg, borderRadius: 4, overflow: "hidden" }}>
              <div style={{ height: "100%", background: accent, width: `${a.share * 2}%`, transition: "width 1s" }} />
            </div>
            <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 3 }}>{a.desc}</div>
          </div>
        ))}
      </Card>
    );
  }

  /* ──────── CRYO-EM VISUALS ──────── */

  /* X-ray vs Cryo-EM comparison */
  function XrayVsCryoEM({ T, accent }) {
    return (
      <Card T={T} style={{ padding: 24, marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: accent, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 18 }}>The structural biology revolution — why cryo-EM displaced crystallography</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ padding: "18px 18px", border: `2px solid ${T.textTer}`, borderRadius: T.radius, background: T.pillBg, opacity: 0.85 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 12 }}>X-ray crystallography</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.text, fontFamily: Fn, marginBottom: 12 }}>Historical workhorse</div>
            <div style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, marginBottom: 12 }}>Purify protein → grow crystals → diffract X-rays → reconstruct structure</div>
            <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.capRed, fontFamily: Fn, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 4 }}>Limitations</div>
              <ul style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, paddingLeft: 16, lineHeight: 1.7, margin: 0 }}>
                <li>Cannot crystallise membrane proteins (GPCRs)</li>
                <li>Cannot resolve large complexes</li>
                <li>Misses conformational flexibility</li>
                <li>Crystallisation can take years</li>
              </ul>
            </div>
          </div>
          <div style={{ padding: "18px 18px", border: `2px solid ${accent}`, borderRadius: T.radius, background: accent + "10" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: accent, fontFamily: Fn, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 12 }}>Cryo-EM</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.text, fontFamily: Fn, marginBottom: 12 }}>Nobel 2017 — new standard</div>
            <div style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, marginBottom: 12 }}>Freeze protein in solution → image with electron beam → reconstruct in 3D computationally</div>
            <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.green, fontFamily: Fn, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 4 }}>Unlocks</div>
              <ul style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, paddingLeft: 16, lineHeight: 1.7, margin: 0 }}>
                <li>Membrane proteins (35% of drugs)</li>
                <li>Large complexes (ribosomes, channels)</li>
                <li>Multiple conformations per sample</li>
                <li>No crystallisation needed — days not years</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  /* Vitrification process */
  function VitrificationProcess({ T, accent }) {
    const steps = [
      { num: 1, title: "Pipette sample", temp: "Room temp", note: "Protein in solution onto grid" },
      { num: 2, title: "Blot excess", temp: "Room temp", note: "Thin film of liquid remains" },
      { num: 3, title: "Plunge freeze", temp: "-180°C", note: "Into liquid ethane" },
      { num: 4, title: "Vitrified glass", temp: "-180°C", note: "Water frozen without crystals" },
    ];
    return (
      <Card T={T} style={{ padding: 24, marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: accent, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>Sample vitrification — the Vitrobot Mark IV process</div>
        <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 20 }}>Reproducible sample preparation is the single biggest practical obstacle to cryo-EM</div>
        <div style={{ display: "flex", alignItems: "stretch", gap: 0, flexWrap: "wrap" }}>
          {steps.map((s, i) => (
            <div key={i} style={{ flex: 1, minWidth: 140, display: "flex", alignItems: "stretch" }}>
              <div style={{ flex: 1, padding: "14px 12px", background: i === steps.length - 1 ? accent : T.card, color: i === steps.length - 1 ? "#fff" : T.text, border: `2px solid ${accent}`, borderRadius: T.radiusSm, margin: "0 4px", textAlign: "center" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: i === steps.length - 1 ? "rgba(255,255,255,0.2)" : accent, color: i === steps.length - 1 ? "#fff" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, fontFamily: Fn, margin: "0 auto 8px" }}>{s.num}</div>
                <div style={{ fontSize: 12, fontWeight: 700, fontFamily: Fn, marginBottom: 4 }}>{s.title}</div>
                <div style={{ fontSize: 9, fontWeight: 600, opacity: 0.85, fontFamily: Fn, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 3 }}>{s.temp}</div>
                <div style={{ fontSize: 10, color: i === steps.length - 1 ? "rgba(255,255,255,0.85)" : T.textTer, fontFamily: Fn, lineHeight: 1.4 }}>{s.note}</div>
              </div>
              {i < steps.length - 1 && <div style={{ display: "flex", alignItems: "center", color: accent, fontSize: 18, fontWeight: 800 }}>→</div>}
            </div>
          ))}
        </div>
      </Card>
    );
  }

  /* Krios column diagram */
  function KriosColumn({ T, accent }) {
    return (
      <Card T={T} style={{ padding: 24, marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: accent, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>Thermo Scientific Krios — flagship cryo-EM</div>
        <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 18 }}>300kV electrons through electromagnetic lenses to direct detector</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 30 }}>
          <svg width="120" height="320" viewBox="0 0 120 320">
            {/* Electron gun */}
            <rect x="40" y="10" width="40" height="30" fill={accent} rx="4" />
            <text x="60" y="30" fontSize="9" fill="#fff" fontFamily={Fn} textAnchor="middle" fontWeight="700">Gun 300kV</text>
            {/* Lens 1 */}
            <ellipse cx="60" cy="60" rx="35" ry="10" fill={T.textTer} opacity="0.5" />
            <text x="100" y="62" fontSize="9" fill={T.textSec} fontFamily={Fn}>Lens</text>
            {/* Lens 2 */}
            <ellipse cx="60" cy="100" rx="35" ry="10" fill={T.textTer} opacity="0.5" />
            <text x="100" y="102" fontSize="9" fill={T.textSec} fontFamily={Fn}>Lens</text>
            {/* Beam */}
            <line x1="60" y1="40" x2="60" y2="155" stroke={T.capRed} strokeWidth="2" />
            {/* Sample stage */}
            <rect x="20" y="155" width="80" height="14" fill={accent} rx="2" />
            <text x="60" y="166" fontSize="9" fill="#fff" fontFamily={Fn} textAnchor="middle" fontWeight="700">Frozen sample</text>
            <line x1="60" y1="169" x2="60" y2="240" stroke={T.capRed} strokeWidth="2" />
            {/* Lens 3 */}
            <ellipse cx="60" cy="195" rx="35" ry="10" fill={T.textTer} opacity="0.5" />
            <text x="100" y="197" fontSize="9" fill={T.textSec} fontFamily={Fn}>Lens</text>
            {/* Energy filter */}
            <rect x="35" y="220" width="50" height="10" fill={T.orange} rx="2" />
            <text x="115" y="227" fontSize="9" fill={T.textSec} fontFamily={Fn}>Filter</text>
            {/* Detector */}
            <rect x="20" y="250" width="80" height="40" fill={T.deepBlue} rx="4" />
            <text x="60" y="268" fontSize="10" fill="#fff" fontFamily={Fn} textAnchor="middle" fontWeight="700">Falcon</text>
            <text x="60" y="282" fontSize="9" fill="#fff" fontFamily={Fn} textAnchor="middle">detector</text>
          </svg>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { label: "Voltage", value: "300 kV" },
              { label: "Cost per instrument", value: "$5-10M" },
              { label: "Best resolution", value: "~1.2 Å" },
              { label: "Sample autoloader", value: "12 grids" },
              { label: "Service contract", value: "Annuity" },
              { label: "Lifecycle", value: "8-12 years" },
            ].map((stat, i) => (
              <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: accent, fontFamily: Fn, minWidth: 90 }}>{stat.value}</div>
                <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  /* Resolution revolution timeline */
  function ResolutionRevolution({ T, accent }) {
    const milestones = [
      { year: 2005, resolution: 8.0, label: "Pre-detector era" },
      { year: 2013, resolution: 4.0, label: "Direct electron detector launches" },
      { year: 2017, resolution: 3.0, label: "Nobel Prize awarded" },
      { year: 2020, resolution: 2.0, label: "Atomic resolution routine" },
      { year: 2024, resolution: 1.2, label: "Sub-atomic resolution" },
    ];
    const maxR = 8;
    return (
      <Card T={T} style={{ padding: 24, marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: accent, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>The resolution revolution — Å (better = lower)</div>
        <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 20 }}>From 8 Å to 1.2 Å in two decades — competing directly with crystallography</div>
        <div style={{ position: "relative", height: 200, paddingLeft: 50 }}>
          {/* Y-axis labels */}
          {[8, 6, 4, 2, 0].map((y, i) => (
            <div key={i} style={{ position: "absolute", left: 0, top: (i / 4) * 170, fontSize: 10, color: T.textTer, fontFamily: Fn }}>{y} Å</div>
          ))}
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} style={{ position: "absolute", left: 30, right: 0, top: (i / 4) * 170, height: 1, background: T.border }} />
          ))}
          {/* Points */}
          {milestones.map((m, i) => {
            const x = (i / (milestones.length - 1)) * 90;
            const y = (m.resolution / maxR) * 170;
            const isLatest = i === milestones.length - 1;
            return (
              <div key={i} style={{ position: "absolute", left: `${x}%`, top: y, transform: "translate(-50%, -50%)", textAlign: "center" }}>
                <div style={{ width: isLatest ? 18 : 12, height: isLatest ? 18 : 12, borderRadius: "50%", background: accent, border: `3px solid ${T.card}`, boxShadow: T.shadow, transition: "all 0.3s" }} />
                <div style={{ fontSize: 11, fontWeight: 800, color: accent, fontFamily: Fn, marginTop: 4 }}>{m.resolution} Å</div>
              </div>
            );
          })}
          {/* Connecting line */}
          <svg style={{ position: "absolute", left: 30, right: 0, top: 0, bottom: 0, width: "calc(100% - 30px)", height: 170, pointerEvents: "none" }} preserveAspectRatio="none" viewBox="0 0 100 170">
            <polyline points={milestones.map((m, i) => `${(i / (milestones.length - 1)) * 100},${(m.resolution / maxR) * 170}`).join(" ")} fill="none" stroke={accent} strokeWidth="0.5" opacity="0.4" />
          </svg>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${milestones.length}, 1fr)`, gap: 6, marginTop: 16, paddingLeft: 50 }}>
          {milestones.map((m, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.text, fontFamily: Fn }}>{m.year}</div>
              <div style={{ fontSize: 9, color: T.textTer, fontFamily: Fn, lineHeight: 1.4, marginTop: 2 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  /* Drug discovery target market */
  function DrugDiscoveryTargets({ T, accent }) {
    const targets = [
      { name: "GPCRs", share: 35, desc: "Most drugged target family — membrane proteins that resist crystallisation but yield to cryo-EM" },
      { name: "Kinases", share: 15, desc: "Cancer & inflammation drug targets" },
      { name: "Ion channels", share: 12, desc: "Neurological and cardiac drugs" },
      { name: "Protein complexes", share: 18, desc: "Ribosomes, spliceosomes — impossible to crystallise" },
      { name: "Antibodies & ADCs", share: 12, desc: "Biologic drug characterisation" },
      { name: "Other", share: 8, desc: "Conformationally flexible proteins, vaccines" },
    ];
    return (
      <Card T={T} style={{ padding: 24, marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: accent, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>Where cryo-EM unlocks drug discovery</div>
        <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 20 }}>Pharmaceutical target categories enabled by cryo-EM that crystallography could not address</div>
        <div style={{ display: "flex", height: 36, borderRadius: T.radiusSm, overflow: "hidden", marginBottom: 14 }}>
          {targets.map((t, i) => (
            <div key={i} style={{ flex: t.share, background: i === 0 ? accent : `${accent}${(95 - i * 10).toString(16)}`, borderRight: i < targets.length - 1 ? `2px solid ${T.card}` : "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: "#fff", fontFamily: Fn }}>{t.share}%</span>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gap: 8 }}>
          {targets.map((t, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "140px 60px 1fr", gap: 12, padding: "8px 12px", background: i === 0 ? accent + "10" : "transparent", borderRadius: T.radiusSm }}>
              <span style={{ fontSize: 12, fontWeight: i === 0 ? 800 : 600, color: i === 0 ? accent : T.text, fontFamily: Fn }}>{t.name}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: accent, fontFamily: Fn }}>{t.share}%</span>
              <span style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.6 }}>{t.desc}</span>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  /* ═══════════════════════════════════════════════════════════════════════
     STAGE WITH VISUALIZATION
     Replaces the prose-only StageCard with prose + custom viz per stage
     ═══════════════════════════════════════════════════════════════════════ */
  function StageWithViz({ stage, color, T, idx, viz, defaultOpen = false }) {
    const [open, setOpen] = useState(defaultOpen || idx === 0);
    return (
      <div style={{ marginBottom: 18 }}>
        <Card T={T} style={{ padding: 0, overflow: "hidden", borderLeft: `4px solid ${color}` }}>
          <div onClick={() => setOpen(!open)} style={{ padding: "18px 22px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: color + "1A", border: "1px solid " + color + "33", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: color, fontFamily: Fn }}>{idx + 1}</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn }}>{stage.title}</div>
              <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginTop: 2 }}>{stage.subtitle}</div>
            </div>
            <span style={{ fontSize: 16, color: T.textTer, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
          </div>
          {open && (
            <div style={{ padding: "0 22px 22px 22px" }}>
              <p style={{ fontSize: 13.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.85, margin: "0 0 18px" }}>{stage.content}</p>
              {viz && <div style={{ marginBottom: 16 }}>{viz}</div>}
              <div style={{ padding: "14px 16px", borderRadius: T.radiusSm, background: T.pillBg, borderLeft: `3px solid ${color}` }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: color, fontFamily: Fn, letterSpacing: "0.08em", marginBottom: 6, textTransform: "uppercase" }}>Deeper detail</div>
                <p style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: 0 }}>{stage.detail}</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════════════════════
     UPDATED PRIMER RENDERER — visualizations per stage
     ═══════════════════════════════════════════════════════════════════════ */

  /* Per-primer viz maps — stage id -> visualization */
  const primerVizMaps = {
    bioproduction: {
      hero: <ArmsDealerVisual T={T} accent={T.green} />,
      stageViz: {
        media: <MediaCompositionWheel T={T} accent={T.green} />,
        bioreactor: <BioreactorScaleLadder T={T} accent={T.green} />,
        purification: <PurificationFlow T={T} accent={T.green} />,
        moat: <><FDALockInTimeline T={T} accent={T.green} /><TriopolyMarket T={T} accent={T.green} /></>,
        commercial: <GLP1CapacityViz T={T} accent={T.green} />,
      },
    },
    orbitrap: {
      hero: <ResolutionComparison T={T} accent={T.deepBlue} />,
      stageViz: {
        physics: <IonOscillationViz T={T} accent={T.deepBlue} />,
        instrument: <OrbitrapFamily T={T} accent={T.deepBlue} />,
        applications: <OrbitrapApplications T={T} accent={T.deepBlue} />,
        moat: null, // moat content is already strong as prose
      },
    },
    cryoem: {
      hero: <XrayVsCryoEM T={T} accent={T.purple} />,
      stageViz: {
        vitrification: <VitrificationProcess T={T} accent={T.purple} />,
        imaging: <KriosColumn T={T} accent={T.purple} />,
        reconstruction: <ResolutionRevolution T={T} accent={T.purple} />,
        applications: <DrugDiscoveryTargets T={T} accent={T.purple} />,
      },
    },
  };

  const renderProductPrimer = (primer, accentKey, vizKey) => {
    const accent = T[accentKey] || T.green;
    const vizMap = primerVizMaps[vizKey] || {};
    return (
      <div>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
            <span style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 28, color: T.text }}>{primer.title}</span>
            <Pill T={T} color={accent} bg={accent + "14"}>Blockbuster Product Primer</Pill>
          </div>
          <div style={{ fontSize: 13, color: T.textTer, fontFamily: Fn, marginBottom: 20 }}>{primer.subtitle}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10 }}>
            {primer.heroStats.map((s, i) => (
              <div key={i} style={{ background: T.card, borderRadius: T.radiusSm, padding: "14px 16px", border: "1px solid " + T.border }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: accent, fontFamily: Fn }}>{s.value}</div>
                <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 3, lineHeight: 1.4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Intro prose */}
        <p style={{ fontSize: 15, color: T.text, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 24px", fontStyle: "italic" }}>{primer.intro}</p>

        {/* Core problem callout */}
        <Card T={T} style={{ padding: "22px 26px", marginBottom: 28, borderLeft: `4px solid ${T.capRed}` }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: T.capRed, fontFamily: Fn, letterSpacing: "0.08em", marginBottom: 12, textTransform: "uppercase" }}>The core problem</div>
          <p style={{ fontSize: 13.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.85, margin: 0 }}>{primer.coreProblem}</p>
        </Card>

        {/* Hero visualization */}
        {vizMap.hero}

        {/* Walkthrough */}
        {sTitle("Walkthrough — how it actually works")}
        {primer.stages.map((stg, i) => (
          <StageWithViz key={stg.id} stage={stg} color={accent} T={T} idx={i} viz={vizMap.stageViz?.[stg.id]} />
        ))}
      </div>
    );
  };

  const bioproductionTab = renderProductPrimer(bioproduction, "green", "bioproduction");
  const orbitrapTab = renderProductPrimer(orbitrap, "deepBlue", "orbitrap");
  const cryoemTab = renderProductPrimer(cryoem, "purple", "cryoem");

  const servicesTab = (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
        <span style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 26, color: T.text }}>{services.title}</span>
        <Pill T={T} color={T.orange} bg="rgba(234,88,12,0.08)">Services Primer</Pill>
      </div>
      <div style={{ fontSize: 13, color: T.textTer, fontFamily: Fn, marginBottom: 20 }}>{services.subtitle}</div>
      <p style={{ fontSize: 14, color: T.text, fontFamily: Fn, lineHeight: 1.75, margin: "0 0 28px", fontStyle: "italic" }}>{services.intro}</p>

      {/* Patheon block */}
      <Card T={T} style={{ padding: 0, overflow: "hidden", borderLeft: `4px solid ${T.orange}`, marginBottom: 20 }}>
        <div style={{ padding: "22px 26px" }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 10 }}>{services.patheon.name}</div>
          {prose(services.patheon.intro)}
          <div style={{ fontSize: 11, fontWeight: 700, color: T.orange, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Core activities</div>
          <div style={{ display: "grid", gap: 8, marginBottom: 16 }}>
            {services.patheon.activities.map((a, i) => (
              <div key={i} style={{ padding: "12px 14px", background: T.pillBg, borderRadius: T.radiusSm }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>{a.name}</div>
                <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7 }}>{a.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: "14px 16px", borderRadius: T.radiusSm, background: "rgba(234,88,12,0.08)", borderLeft: `3px solid ${T.orange}` }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: T.orange, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Competitive position</div>
            <p style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: 0 }}>{services.patheon.position}</p>
          </div>
        </div>
      </Card>

      {/* PPD/Clario block */}
      <Card T={T} style={{ padding: 0, overflow: "hidden", borderLeft: `4px solid ${T.deepBlue}`, marginBottom: 20 }}>
        <div style={{ padding: "22px 26px" }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 10 }}>{services.ppd.name}</div>
          {prose(services.ppd.intro)}
          <div style={{ fontSize: 11, fontWeight: 700, color: T.deepBlue, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Core activities</div>
          <div style={{ display: "grid", gap: 8, marginBottom: 16 }}>
            {services.ppd.activities.map((a, i) => (
              <div key={i} style={{ padding: "12px 14px", background: T.pillBg, borderRadius: T.radiusSm }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>{a.name}</div>
                <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7 }}>{a.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: "14px 16px", borderRadius: T.radiusSm, background: "rgba(29,78,216,0.08)", borderLeft: `3px solid ${T.deepBlue}` }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: T.deepBlue, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Competitive position</div>
            <p style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: 0 }}>{services.ppd.position}</p>
          </div>
        </div>
      </Card>

      <div style={{ padding: "18px 22px", borderRadius: T.radius, background: T.greenBg, border: "1px solid " + T.border }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: T.green, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>The platform logic</div>
        <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: 0 }}>{services.platform}</p>
      </div>
    </div>
  );

  const roleColors = { own: T.green, orchestrate: T.deepBlue, support: T.textTer };
  const roleLabels = { own: "Thermo Fisher owns this fully", orchestrate: "Thermo Fisher orchestrates (arms dealer plus contracted services)", support: "Thermo Fisher supports (meaningful but not dominant)" };

  const valueChainTab = (
    <div>
      {prose(valueChainIntro)}
      <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
        {["own", "orchestrate", "support"].map(role => (
          <div key={role} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: roleColors[role] }} />
            <span style={{ fontSize: 11, color: T.textSec, fontFamily: Fn }}>{roleLabels[role]}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {valueChainStages.map((v, i) => {
          const c = roleColors[v.tmoRole];
          return (
            <div key={i}>
              <Expandable title={v.stage} subtitle={v.description} T={T}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: c }} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: c, fontFamily: Fn }}>{roleLabels[v.tmoRole]}</span>
                </div>
                {prose(v.tmoNote)}
              </Expandable>
              <div style={{ height: 8 }} />
            </div>
          );
        })}
      </div>
      <div style={{ padding: "18px 22px", marginTop: 16, borderRadius: T.radius, background: T.text === "#0F172A" ? "rgba(29,78,216,0.04)" : "rgba(96,165,250,0.06)", border: "1px solid " + T.border }}>
        <div style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75 }}>
          <strong style={{ color: T.green }}>The arms dealer insight:</strong> Thermo Fisher's strongest competitive positions are at the manufacturing process development and quality control stages — exactly where FDA process lock-in creates 15-20 year annuities tied to commercial drug volumes. The CDMO position via Patheon is meaningful but secondary; the bioproduction "arms dealer" position is the structural crown jewel.
        </div>
      </div>
    </div>
  );

  const competitiveTab = (
    <div>
      {prose(competitorIntro)}
      {sTitle("Top peers — life sciences tools and services")}
      <div style={{ display: "grid", gap: 12 }}>
        {competitors.map((c, i) => (
          <Card key={i} T={T} style={{ padding: 0, overflow: "hidden", borderLeft: c.highlight ? `4px solid ${T.green}` : "4px solid " + T.border }}>
            <div style={{ padding: "18px 22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: c.highlight ? T.green : T.text, fontFamily: Fn }}>{c.name}</span>
                <Pill T={T}>{c.hq}</Pill>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: T.green, fontFamily: Fn, letterSpacing: "0.05em", marginBottom: 6, textTransform: "uppercase" }}>Strengths</div>
                  <div style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.7 }}>{c.strengths}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: T.capRed, fontFamily: Fn, letterSpacing: "0.05em", marginBottom: 6, textTransform: "uppercase" }}>Limitations vs Thermo Fisher</div>
                  <div style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.7 }}>{c.weaknesses}</div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const moatTab = (
    <div>
      {prose(moatIntro)}
      <div style={{ display: "grid", gap: 12 }}>
        {moats.map((m, i) => <MoatCard key={i} moat={m} T={T} />)}
      </div>
      <div style={{ padding: "18px 22px", marginTop: 24, borderRadius: T.radius, background: T.greenBg, border: "1px solid " + T.border }}>
        <div style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75 }}>
          <strong style={{ color: T.green }}>The composite moat assessment:</strong> Thermo Fisher's moat is genuinely heterogeneous. The bioproduction franchise (FDA lock-in plus oligopoly supply), Orbitrap mass spec, and cryo-electron microscopy are best-in-class structural moats. The Fisher Scientific distribution channel and parts of Specialty Diagnostics have more modest competitive advantages. The blended corporate ROIC in the mid-teens reflects this weighted average — strong but diluted by the lower-quality pieces, which is part of why the corporate multiple trades at a discount to pure-play Sartorius or to post-spin Danaher.
        </div>
      </div>
    </div>
  );

  const primerContent = {
    "Business Overview": overviewTab, "Segments": segmentsTab, "Research vs Production": researchProductionTab,
    "Bioproduction Primer": bioproductionTab, "Orbitrap Primer": orbitrapTab, "Cryo-EM Primer": cryoemTab,
    "Services": servicesTab, "Value Chain": valueChainTab, "Competitive Position": competitiveTab, "Moat Analysis": moatTab,
  };

  /* ═══════════════════════════════════════════ THEMATIC TABS ═══════════════════════════════════════════ */
  const themesTab = (
    <div>
      {prose(themesIntro)}
      {themes.map((t, i) => <ThemeCard key={i} theme={t} T={T} idx={i} />)}
    </div>
  );

  const platformTab = (
    <div>
      {prose(platformThesis.intro)}
      {sTitle("The integrated platform — what Thermo Fisher offers at each stage")}
      <div style={{ display: "grid", gap: 8, marginBottom: 24 }}>
        {platformThesis.stages.map((s, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 16, padding: "14px 18px", background: T.card, borderRadius: T.radiusSm, border: "1px solid " + T.border }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: T.green, fontFamily: Fn }}>{s.name}</div>
            <div style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.7 }}>{s.tmoOffer}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: "18px 22px", borderRadius: T.radius, background: T.greenBg, border: "1px solid " + T.border }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: T.green, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Why the platform thesis matters</div>
        <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: 0 }}>{platformThesis.insight}</p>
      </div>
    </div>
  );

  const epsBridgeTab = (
    <div>
      {prose(epsBridge.intro)}
      {sTitle("Long-term EPS algorithm decomposition (annual contribution, percentage points)")}
      <Card T={T} style={{ padding: 24, marginBottom: 28 }}>
        {epsBridge.components.map((c, i) => (
          <div key={i} style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn }}>{c.name}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: c.color, fontFamily: Fn }}>+{c.value.toFixed(1)} pp</span>
            </div>
            <div style={{ height: 10, borderRadius: 5, background: T.pillBg, overflow: "hidden", marginBottom: 6 }}>
              <div style={{ height: "100%", borderRadius: 5, background: c.color, width: `${(c.value / 12) * 100}%`, transition: "width 0.8s" }} />
            </div>
            <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, lineHeight: 1.6 }}>{c.note}</div>
          </div>
        ))}
      </Card>

      {sTitle("Five-year valuation scenarios (price target framework)")}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14, marginBottom: 20 }}>
        {Object.entries(epsBridge.scenarios).map(([key, sc]) => {
          const color = key === "bull" ? T.green : key === "bear" ? T.capRed : T.deepBlue;
          const label = key.charAt(0).toUpperCase() + key.slice(1);
          return (
            <Card key={key} T={T} style={{ padding: 22, borderTop: `4px solid ${color}` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: color, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>{label} case</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: T.text, fontFamily: Fn, marginBottom: 4 }}>${sc.price}</div>
              <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 16 }}>5-year price target</div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, paddingBottom: 8, borderBottom: "1px solid " + T.border }}>
                <span style={{ fontSize: 11, color: T.textSec, fontFamily: Fn }}>2029E EPS</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: Fn }}>${sc.eps}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 11, color: T.textSec, fontFamily: Fn }}>Exit P/E</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: Fn }}>{sc.multiple}x</span>
              </div>
              <p style={{ fontSize: 11.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.65, margin: 0 }}>{sc.note}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const sevColors = { high: T.capRed, "medium-high": T.orange, medium: T.deepBlue, "low-medium": T.textTer, low: T.textTer };
  const thematicRisksTab = (
    <div>
      {prose("Even the strongest bull case has structural exposure to risks that could derail the long-term thematic thesis. The list below represents the durable risks worth monitoring across the holding period.")}
      <div style={{ display: "grid", gap: 12 }}>
        {thematicRisks.map((r, i) => (
          <Card key={i} T={T} style={{ padding: 0, overflow: "hidden", borderLeft: `4px solid ${sevColors[r.severity] || T.textSec}` }}>
            <div style={{ padding: "18px 22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, flex: 1 }}>{r.name}</span>
                <Pill T={T} color={sevColors[r.severity]} bg={(sevColors[r.severity] || T.textSec) + "14"}>{r.severity}</Pill>
              </div>
              <p style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: 0 }}>{r.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  /* ─── 3 TAILWINDS — fully visual, meeting-ready presentation ─── */
  const tailwindsContent = (
    <div>
      <p style={{ fontSize: 15, color: T.text, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 24px", fontStyle: "italic" }}>{tailwindsIntro}</p>

      {/* Three big theme cards at top — at-a-glance summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 36 }}>
        {tailwinds.map((tw, i) => {
          const accent = T[tw.colorKey];
          return (
            <div key={i} style={{ background: T.card, borderRadius: T.radius, padding: "20px 22px", borderTop: `4px solid ${accent}`, boxShadow: T.shadow, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 14, right: 18, fontSize: 48, fontWeight: 900, color: accent, opacity: 0.15, fontFamily: Fn, lineHeight: 1 }}>0{tw.number}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: accent, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Tailwind {tw.number}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: T.text, fontFamily: Fn, lineHeight: 1.3, marginBottom: 14, position: "relative", zIndex: 1 }}>{tw.name}</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: accent, fontFamily: Fn, marginBottom: 4, position: "relative", zIndex: 1 }}>{tw.heroStat.value}</div>
              <div style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.5 }}>{tw.heroStat.label}</div>
            </div>
          );
        })}
      </div>

      {/* DETAILED THEME SECTIONS */}
      {tailwinds.map((tw, twIdx) => {
        const accent = T[tw.colorKey];
        const accentBg = tw.colorKey === "green" ? T.greenBg : tw.colorKey === "deepBlue" ? "rgba(29,78,216,0.08)" : "rgba(234,88,12,0.08)";

        return (
          <div key={twIdx} style={{ marginBottom: 48 }}>
            {/* Theme banner */}
            <div style={{ background: accentBg, borderRadius: T.radius, padding: "26px 30px", marginBottom: 24, borderLeft: `6px solid ${accent}`, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", right: 24, top: 14, fontSize: 96, fontWeight: 900, color: accent, opacity: 0.12, fontFamily: Fn, lineHeight: 1 }}>0{tw.number}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: accent, fontFamily: Fn, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Tailwind {tw.number}</div>
              <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 30, color: T.text, marginBottom: 10, lineHeight: 1.2 }}>{tw.name}</div>
              <div style={{ fontSize: 14, color: T.textSec, fontFamily: Fn, lineHeight: 1.6, maxWidth: "85%" }}>{tw.tagline}</div>
              <div style={{ marginTop: 18, display: "flex", alignItems: "baseline", gap: 14 }}>
                <span style={{ fontSize: 44, fontWeight: 900, color: accent, fontFamily: Fn, lineHeight: 1 }}>{tw.heroStat.value}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn }}>{tw.heroStat.label}</div>
                  <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginTop: 2 }}>{tw.heroStat.sub}</div>
                </div>
              </div>
            </div>

            {/* The structural shift */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: accent, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>The structural shift</div>
              <p style={{ fontSize: 14, color: T.textSec, fontFamily: Fn, lineHeight: 1.8, margin: 0 }}>{tw.structuralShift}</p>
            </div>

            {/* THEME-SPECIFIC VISUALIZATION */}
            {tw.pipelineShift && (
              <Card T={T} style={{ padding: 26, marginBottom: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 18 }}>Pharma pipeline composition over time (% of pipeline)</div>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12, height: 220, paddingBottom: 28, position: "relative" }}>
                  {tw.pipelineShift.map((d, di) => (
                    <div key={di} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div style={{ width: "100%", maxWidth: 100, display: "flex", flexDirection: "column", borderRadius: "6px 6px 0 0", overflow: "hidden", height: 190 }}>
                        <div style={{ height: `${d.biologic}%`, background: accent, display: "flex", alignItems: "center", justifyContent: "center", transition: "height 1s cubic-bezier(0.22,1,0.36,1)" }}>
                          <span style={{ fontSize: 14, fontWeight: 800, color: "#fff", fontFamily: Fn }}>{d.biologic}%</span>
                        </div>
                        <div style={{ height: `${d.smallMolecule}%`, background: T.grey300 || T.textTer, display: "flex", alignItems: "center", justifyContent: "center", transition: "height 1s cubic-bezier(0.22,1,0.36,1)" }}>
                          <span style={{ fontSize: 12, fontWeight: 700, color: T.textSec, fontFamily: Fn }}>{d.smallMolecule}%</span>
                        </div>
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: T.text, fontFamily: Fn, marginTop: 8 }}>{d.period}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 24, justifyContent: "center", marginTop: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 14, height: 14, borderRadius: 3, background: accent }} />
                    <span style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, fontWeight: 600 }}>Biologics</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 14, height: 14, borderRadius: 3, background: T.grey300 || T.textTer }} />
                    <span style={{ fontSize: 12, color: T.textSec, fontFamily: Fn }}>Small molecules</span>
                  </div>
                </div>
              </Card>
            )}

            {tw.glp1Stats && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
                {tw.glp1Stats.map((s, si) => (
                  <Card key={si} T={T} style={{ padding: "18px 20px", borderLeft: `3px solid ${accent}` }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: accent, fontFamily: Fn, marginBottom: 4 }}>{s.value}</div>
                    <div style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.5 }}>{s.label}</div>
                  </Card>
                ))}
              </div>
            )}

            {tw.outsourcingGrowth && (
              <Card T={T} style={{ padding: 26, marginBottom: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 18 }}>Global pharma outsourcing market ($bn)</div>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, height: 200, position: "relative" }}>
                  {tw.outsourcingGrowth.map((d, di) => {
                    const maxV = Math.max(...tw.outsourcingGrowth.map(x => x.value));
                    const h = (d.value / maxV) * 180;
                    const isLatest = di === tw.outsourcingGrowth.length - 1;
                    return (
                      <div key={di} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{ fontSize: 16, fontWeight: 800, color: isLatest ? accent : T.text, fontFamily: Fn, marginBottom: 8 }}>${d.value}B</div>
                        <div style={{ width: "100%", maxWidth: 80, height: h, background: isLatest ? accent : T.grey300 || T.textTer, opacity: isLatest ? 1 : 0.5, borderRadius: "6px 6px 0 0", transition: "height 1s cubic-bezier(0.22,1,0.36,1)" }} />
                        <div style={{ fontSize: 12, fontWeight: 700, color: isLatest ? accent : T.text, fontFamily: Fn, marginTop: 8 }}>{d.year}</div>
                      </div>
                    );
                  })}
                </div>
                <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginTop: 12, textAlign: "center", fontStyle: "italic" }}>Combined CDMO + CRO + clinical research outsourcing. Industry estimates, multiple sources.</div>
              </Card>
            )}

            {tw.capexRamp && (
              <Card T={T} style={{ padding: 26, marginBottom: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 18 }}>Thermo Fisher capital expenditure ramp ($bn) — the reshoring bet</div>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, height: 220, position: "relative" }}>
                  {tw.capexRamp.map((d, di) => {
                    const maxV = Math.max(...tw.capexRamp.map(x => x.value));
                    const h = (d.value / maxV) * 190;
                    const isLatest = di === tw.capexRamp.length - 1;
                    return (
                      <div key={di} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{ fontSize: 14, fontWeight: 800, color: isLatest ? accent : T.text, fontFamily: Fn, marginBottom: 8 }}>${d.value.toFixed(2)}B</div>
                        <div style={{ width: "100%", maxWidth: 80, height: h, background: accent, opacity: 0.3 + (di / tw.capexRamp.length) * 0.7, borderRadius: "6px 6px 0 0", transition: "height 1s cubic-bezier(0.22,1,0.36,1)" }} />
                        <div style={{ fontSize: 12, fontWeight: 700, color: isLatest ? accent : T.text, fontFamily: Fn, marginTop: 8 }}>{d.year}</div>
                      </div>
                    );
                  })}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, padding: "10px 14px", background: accentBg, borderRadius: T.radiusSm }}>
                  <span style={{ fontSize: 12, color: T.textSec, fontFamily: Fn }}>Capex ramp 2021 → 2025</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: accent, fontFamily: Fn }}>~8x increase ($260M → $2.2B)</span>
                </div>
              </Card>
            )}

            {/* HOW TMO PLAYS IT */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: accent, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>How Thermo Fisher plays it</div>
              <p style={{ fontSize: 13.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.8, margin: "0 0 16px" }}>{tw.tmoPlaysIt.summary}</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                {tw.tmoPlaysIt.products.map((p, pi) => (
                  <Card key={pi} T={T} style={{ padding: 20, borderTop: `3px solid ${accent}`, height: "100%" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: T.text, fontFamily: Fn, marginBottom: 10, lineHeight: 1.3 }}>{p.name}</div>
                    <p style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 12px" }}>{p.desc}</p>
                    <div style={{ display: "inline-block", padding: "5px 10px", background: accentBg, borderRadius: 4, fontSize: 10, fontWeight: 700, color: accent, fontFamily: Fn, letterSpacing: "0.05em" }}>{p.economics}</div>
                  </Card>
                ))}
              </div>
            </div>

            {/* THE BENEFIT */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: accent, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>What this means for Thermo Fisher</div>
              <p style={{ fontSize: 13.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.8, margin: "0 0 16px" }}>{tw.benefit.summary}</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                {tw.benefit.metrics.map((m, mi) => (
                  <div key={mi} style={{ background: T.card, borderRadius: T.radiusSm, padding: "16px 14px", border: "1px solid " + T.border, textAlign: "center" }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: T[m.color] || accent, fontFamily: Fn, marginBottom: 4 }}>{m.value}</div>
                    <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, lineHeight: 1.4 }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* MEETING TALKING POINTS */}
            <Card T={T} style={{ padding: "22px 26px", borderLeft: `4px solid ${accent}`, background: accentBg }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: "#fff", fontFamily: Fn }}>!</span>
                </div>
                <div style={{ fontSize: 12, fontWeight: 800, color: accent, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase" }}>Meeting talking points</div>
              </div>
              <div style={{ display: "grid", gap: 10 }}>
                {tw.talkingPoints.map((tp, tpi) => (
                  <div key={tpi} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 14px", background: T.card, borderRadius: T.radiusSm, border: "1px solid " + T.border }}>
                    <div style={{ flexShrink: 0, width: 22, height: 22, borderRadius: 11, background: accent, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, fontFamily: Fn }}>{tpi + 1}</div>
                    <p style={{ fontSize: 13, color: T.text, fontFamily: Fn, lineHeight: 1.65, margin: 0 }}>{tp}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        );
      })}

      {/* INTERCONNECTION CLOSING */}
      <Card T={T} style={{ padding: "26px 30px", background: T.text === "#0F172A" ? "rgba(29,78,216,0.04)" : "rgba(96,165,250,0.06)", border: `1px solid ${T.border}`, borderTop: `4px solid ${T.deepBlue}` }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: T.deepBlue, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Why these three together</div>
        <p style={{ fontSize: 14, color: T.textSec, fontFamily: Fn, lineHeight: 1.85, margin: "0 0 16px" }}>{tailwindsConnection}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginTop: 16 }}>
          {tailwinds.map((tw, ti) => {
            const c = T[tw.colorKey];
            return (
              <div key={ti} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: T.card, borderRadius: T.radiusSm, border: "1px solid " + T.border }}>
                <div style={{ flexShrink: 0, width: 26, height: 26, borderRadius: 6, background: c, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, fontFamily: Fn }}>{tw.number}</div>
                <div style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.5, fontWeight: 600 }}>{tw.name}</div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );

  /* Bull vs Bear extracted as named var so it can live in financials */
  const bullBearTab = (
    <div>
      {prose(bullBearIntro)}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
        {/* BULL COLUMN */}
        <div>
          <Card T={T} style={{ padding: "18px 22px", marginBottom: 16, borderTop: `4px solid ${T.green}`, background: T.greenBg }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: T.green, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>The Bull Case</div>
            <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: 0 }}>{bullCase.intro}</p>
          </Card>
          {bullCase.pillars.map((p, i) => (
            <Card key={i} T={T} style={{ padding: "16px 20px", marginBottom: 10, borderLeft: `3px solid ${T.green}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: T.green, fontFamily: Fn, fontVariantNumeric: "tabular-nums" }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn }}>{p.name}</span>
              </div>
              <p style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, margin: 0 }}>{p.description}</p>
            </Card>
          ))}
        </div>

        {/* BEAR COLUMN */}
        <div>
          <Card T={T} style={{ padding: "18px 22px", marginBottom: 16, borderTop: `4px solid ${T.capRed}`, background: T.redBg }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: T.capRed, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>The Bear Case</div>
            <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: 0 }}>{bearCase.intro}</p>
          </Card>
          {bearCase.pillars.map((p, i) => (
            <Card key={i} T={T} style={{ padding: "16px 20px", marginBottom: 10, borderLeft: `3px solid ${T.capRed}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: T.capRed, fontFamily: Fn, fontVariantNumeric: "tabular-nums" }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn }}>{p.name}</span>
              </div>
              <p style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, margin: 0 }}>{p.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {sTitle("What tips the balance — binary events over the next 60-90 days")}
      <p style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 16px" }}>{tippingPoints.intro}</p>
      <div style={{ display: "grid", gap: 8, marginBottom: 24 }}>
        {tippingPoints.points.map((pt, i) => {
          const c = pt.color === "green" ? T.green : T.capRed;
          return (
            <Card key={i} T={T} style={{ padding: "12px 16px", borderLeft: `3px solid ${c}` }}>
              <div style={{ display: "grid", gridTemplateColumns: "180px 1fr 140px", gap: 14, alignItems: "center" }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: Fn }}>{pt.event}</div>
                <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn }}>{pt.outcome}</div>
                <Pill T={T} color={c} bg={c + "14"}>{pt.impact}</Pill>
              </div>
            </Card>
          );
        })}
      </div>

      <Card T={T} style={{ padding: "18px 22px", borderLeft: `4px solid ${T.deepBlue}`, background: "rgba(29,78,216,0.04)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: T.deepBlue, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>The QARP read</div>
        <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.85, margin: 0 }}>{tippingPoints.qarpRead}</p>
      </Card>
    </div>
  );

  const thematicContent = {
    "3 Tailwinds": tailwindsContent,
  };

  /* ═══════════════════════════════════════════ FINANCIAL TABS ═══════════════════════════════════════════ */
  const currentSetupTab = (
    <div>
      <Card T={T} style={{ padding: "22px 26px", marginBottom: 24, borderLeft: `4px solid ${T.deepBlue}` }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: T.deepBlue, fontFamily: Fn, letterSpacing: "0.08em", marginBottom: 12, textTransform: "uppercase" }}>Current setup narrative</div>
        <p style={{ fontSize: 14, color: T.text, fontFamily: Fn, lineHeight: 1.85, margin: 0 }}>{setupNarrative}</p>
      </Card>

      {sTitle("Consensus EPS growth expectations (FY25A through FY29E)")}
      <Card T={T} style={{ padding: 24, marginBottom: 24 }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: Fn, fontSize: 12 }}>
            <thead><tr style={{ borderBottom: "2px solid " + T.border }}>
              {["Metric", "FY25A", "FY26E", "FY27E", "FY28E", "FY29E"].map(h => <th key={h} style={{ padding: "10px 14px", textAlign: h === "Metric" ? "left" : "right", fontWeight: 600, color: T.text, fontSize: 11 }}>{h}</th>)}
            </tr></thead>
            <tbody>{growthEstimates.map((g, i) => (
              <tr key={i} style={{ borderBottom: "1px solid " + T.border }}>
                <td style={{ padding: "10px 14px", fontWeight: 500, color: T.text }}>{g.metric}</td>
                <td style={{ padding: "10px 14px", textAlign: "right", color: T.textSec }}>{g.fy25.toFixed(1)}%</td>
                <td style={{ padding: "10px 14px", textAlign: "right", fontWeight: 600, color: T.text }}>{g.fy26.toFixed(1)}%</td>
                <td style={{ padding: "10px 14px", textAlign: "right", color: T.textSec }}>{g.fy27.toFixed(1)}%</td>
                <td style={{ padding: "10px 14px", textAlign: "right", color: T.textSec }}>{g.fy28.toFixed(1)}%</td>
                <td style={{ padding: "10px 14px", textAlign: "right", fontWeight: 600, color: T.green }}>{g.fy29.toFixed(1)}%</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginTop: 12, fontStyle: "italic" }}>Source: Bloomberg consensus, 18 May 2026. EPS Adj growth accelerates from 4.6% (FY25A) to 12.6% (FY29E) — the consensus already models the demand inflection.</div>
      </Card>
    </div>
  );

  const q1Tab = (
    <div>
      {sTitle(`Q1 2026 results — released ${q1Results.date}`)}
      <Card T={T} style={{ padding: 24, marginBottom: 20 }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: Fn, fontSize: 12 }}>
            <thead><tr style={{ borderBottom: "2px solid " + T.border }}>
              {["Metric", "Value", "Versus expectations"].map(h => <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: T.text, fontSize: 11 }}>{h}</th>)}
            </tr></thead>
            <tbody>{q1Results.headline.map((m, i) => (
              <tr key={i} style={{ borderBottom: "1px solid " + T.border }}>
                <td style={{ padding: "10px 14px", fontWeight: 500, color: T.text }}>{m.metric}</td>
                <td style={{ padding: "10px 14px", fontWeight: 700, color: T[m.color] || T.text }}>{m.value}</td>
                <td style={{ padding: "10px 14px", color: T.textSec }}>{m.vs}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </Card>

      <Card T={T} style={{ padding: "18px 22px", marginBottom: 20, borderLeft: `4px solid ${T.deepBlue}` }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: T.deepBlue, fontFamily: Fn, letterSpacing: "0.08em", marginBottom: 10, textTransform: "uppercase" }}>Management bridge</div>
        <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: 0 }}>{q1Results.bridge}</p>
      </Card>

      {sTitle("Segment performance")}
      <div style={{ display: "grid", gap: 10, marginBottom: 20 }}>
        {q1Results.segments.map((s, i) => (
          <Card key={i} T={T} style={{ padding: "14px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn }}>{s.name}</span>
              <Pill T={T} color={T.green} bg={T.greenBg}>{s.growth}</Pill>
            </div>
            <div style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.7 }}>{s.note}</div>
          </Card>
        ))}
      </div>

      <Card T={T} style={{ padding: "18px 22px", marginBottom: 28, borderLeft: `4px solid ${T.green}` }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: T.green, fontFamily: Fn, letterSpacing: "0.08em", marginBottom: 10, textTransform: "uppercase" }}>Guidance raise</div>
        <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: 0 }}>{q1Results.guidanceRaise}</p>
      </Card>

      {sTitle("Bloomberg Intelligence post-earnings note")}
      <Card T={T} style={{ padding: 0, overflow: "hidden", borderLeft: `4px solid ${T.orange}` }}>
        <div style={{ padding: "22px 26px" }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 6 }}>{biNote.title}</div>
          <div style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "center" }}>
            <span style={{ fontSize: 11, color: T.textTer, fontFamily: Fn }}>{biNote.analyst}</span>
            <span style={{ fontSize: 11, color: T.textTer, fontFamily: Fn }}>·</span>
            <span style={{ fontSize: 11, color: T.textTer, fontFamily: Fn }}>{biNote.date}</span>
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.orange, fontFamily: Fn, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 8 }}>Highlights</div>
          <ul style={{ paddingLeft: 18, margin: "0 0 14px" }}>
            {biNote.highlights.map((h, i) => (<li key={i} style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, marginBottom: 4 }}>{h}</li>))}
          </ul>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.orange, fontFamily: Fn, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 8 }}>Outlook</div>
          <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.85, margin: 0 }}>{biNote.outlook}</p>
        </div>
      </Card>
    </div>
  );

  const consensusEvolutionTab = (
    <div>
      {prose(consensusEvolution.intro)}
      {sTitle("Current consensus snapshot (Bloomberg, 18 May 2026)")}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14, marginBottom: 20 }}>
        {consensusEvolution.current.map((c, i) => (
          <Card key={i} T={T} style={{ padding: 22 }}>
            <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 4 }}>{c.period}</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: T.deepBlue, fontFamily: Fn, marginBottom: 8 }}>{c.value}</div>
            <div style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.6 }}>{c.note}</div>
          </Card>
        ))}
      </div>
      <Card T={T} style={{ padding: "18px 22px", borderLeft: `4px solid ${T.deepBlue}` }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: T.deepBlue, fontFamily: Fn, letterSpacing: "0.08em", marginBottom: 10, textTransform: "uppercase" }}>The asymmetry</div>
        <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.85, margin: 0 }}>{consensusEvolution.insight}</p>
      </Card>
    </div>
  );

  const valuationTab = (
    <div>
      {prose(multiples.intro)}
      {sTitle("Current multiples versus 5Y historical average")}
      <Card T={T} style={{ padding: 24, marginBottom: 24 }}>
        {multiples.current.map((m, i) => {
          const discount = ((m.hist - m.value) / m.hist) * 100;
          return (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 12, fontWeight: 500, color: T.text, fontFamily: Fn }}>{m.multiple}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: T[m.color] || T.text, fontFamily: Fn }}>{typeof m.value === "number" ? m.value.toFixed(2) : m.value}x <span style={{ fontWeight: 400, color: T.textTer }}>vs hist {m.hist}x ({discount > 0 ? "-" : "+"}{Math.abs(discount).toFixed(0)}%)</span></span>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{ flex: 1, height: 8, borderRadius: 4, background: T.pillBg, overflow: "hidden", position: "relative" }}>
                  <div style={{ height: "100%", borderRadius: 4, background: T[m.color] || T.deepBlue, width: `${(m.value / m.hist) * 100}%`, transition: "width 0.8s" }} />
                  <div style={{ position: "absolute", top: -3, left: "100%", marginLeft: -1, width: 2, height: 14, background: T.textTer }} />
                </div>
              </div>
            </div>
          );
        })}
        <div style={{ display: "flex", gap: 20, marginTop: 10, fontSize: 10, color: T.textTer, fontFamily: Fn }}>
          <span><span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 2, background: T.deepBlue, marginRight: 5, verticalAlign: "middle" }} /> Current multiple</span>
          <span><span style={{ display: "inline-block", width: 2, height: 10, background: T.textTer, marginRight: 5, verticalAlign: "middle" }} /> 5Y historical</span>
        </div>
      </Card>
      <Card T={T} style={{ padding: "18px 22px", borderLeft: `4px solid ${T.green}` }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: T.green, fontFamily: Fn, letterSpacing: "0.08em", marginBottom: 10, textTransform: "uppercase" }}>The valuation insight</div>
        <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: 0 }}>{multiples.insight}</p>
      </Card>
    </div>
  );

  const peerCompTab = (
    <div>
      {prose("Six-way peer comparison covering current multiples, growth, profitability, and free cash flow. The honest framing is that there is no single peer that mirrors Thermo Fisher at the corporate level — different competitors mirror different sub-businesses.")}
      {sTitle("Peer valuation snapshot")}
      <Card T={T} style={{ padding: 0, overflow: "hidden", marginBottom: 24 }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: Fn, fontSize: 12 }}>
            <thead><tr style={{ borderBottom: "2px solid " + T.border }}>
              {["Peer", "Ticker", "Fwd P/E", "EV/EBITDA", "Growth", "Op Margin", "FCF"].map(h => <th key={h} style={{ padding: "10px 14px", textAlign: h === "Peer" || h === "Ticker" ? "left" : "right", fontWeight: 600, color: T.text, fontSize: 11 }}>{h}</th>)}
            </tr></thead>
            <tbody>{peerComp.map((p, i) => (
              <tr key={i} style={{ borderBottom: "1px solid " + T.border, background: p.ticker === "TMO US" ? T.greenBg : "transparent" }}>
                <td style={{ padding: "10px 14px", fontWeight: p.ticker === "TMO US" ? 700 : 500, color: p.ticker === "TMO US" ? T.green : T.text }}>{p.name}</td>
                <td style={{ padding: "10px 14px", color: T.textTer, fontSize: 11 }}>{p.ticker}</td>
                <td style={{ padding: "10px 14px", textAlign: "right", fontWeight: 600, color: T.text }}>{p.pe.toFixed(1)}x</td>
                <td style={{ padding: "10px 14px", textAlign: "right", color: T.textSec }}>{p.evEbitda.toFixed(1)}x</td>
                <td style={{ padding: "10px 14px", textAlign: "right", color: T.textSec }}>{p.growth}</td>
                <td style={{ padding: "10px 14px", textAlign: "right", color: T.textSec }}>{p.margin}%</td>
                <td style={{ padding: "10px 14px", textAlign: "right", color: T.textSec }}>{p.fcf}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </Card>

      <div style={{ display: "grid", gap: 8, marginBottom: 28 }}>
        {peerComp.map((p, i) => (
          <Card key={i} T={T} style={{ padding: "12px 16px", borderLeft: `3px solid ${p.color}` }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: p.color, fontFamily: Fn }}>{p.name}</span>
              <span style={{ fontSize: 11, color: T.textTer, fontFamily: Fn }}>{p.ticker}</span>
            </div>
            <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.6 }}>{p.note}</div>
          </Card>
        ))}
      </div>

      {sTitle("Five-year total return (USD)")}
      <Card T={T} style={{ padding: 24, marginBottom: 20 }}>
        <p style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 16px" }}>{peerReturns5Y.intro}</p>
        {peerReturns5Y.data.map((d, i) => (
          <HorizBar key={i} label={`${d.name} (${d.ticker})`} value={d.value} max={55} color={d.color} T={T} suffix="%" />
        ))}
        <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 8, fontStyle: "italic" }}>Bloomberg total return, 18 May 2021 to 15 May 2026, all in USD</div>
      </Card>

      {sTitle("Attribute-by-attribute peer ranking")}
      <p style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 16px" }}>{peerRankings.intro}</p>
      <div style={{ display: "grid", gap: 10, marginBottom: 24 }}>
        {peerRankings.attributes.map((a, i) => (
          <Expandable key={i} title={a.name} subtitle={`Winner: ${a.ranking[0]}`} T={T}>
            <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
              {a.ranking.map((name, idx) => (
                <Pill key={idx} T={T} color={idx === 0 ? T.green : T.textTer} bg={idx === 0 ? T.greenBg : T.pillBg}>{idx + 1}. {name}</Pill>
              ))}
            </div>
            <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7 }}>{a.note}</div>
          </Expandable>
        ))}
      </div>

      {sTitle("Composite peer ranking")}
      <p style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 16px" }}>{peerRankings.composite.intro}</p>
      <div style={{ display: "grid", gap: 10 }}>
        {peerRankings.composite.ranking.map((r, i) => (
          <Card key={i} T={T} style={{ padding: "14px 18px", borderLeft: `4px solid ${i === 0 ? T.green : i === 1 ? T.deepBlue : i === 2 ? T.orange : T.textTer}` }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 4 }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: i === 0 ? T.green : i === 1 ? T.deepBlue : i === 2 ? T.orange : T.textTer, fontFamily: Fn }}>#{r.rank}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn }}>{r.name}</span>
            </div>
            <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7 }}>{r.note}</div>
          </Card>
        ))}
      </div>
    </div>
  );

  const underperformanceTab = (
    <div>
      {prose(underperformance.intro)}
      <div style={{ display: "grid", gap: 10 }}>
        {underperformance.reasons.map((r, i) => (
          <Card key={i} T={T} style={{ padding: 0, overflow: "hidden", borderLeft: `4px solid ${sevColors[r.severity] || T.textSec}` }}>
            <div style={{ padding: "18px 22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: T.textTer, fontFamily: Fn, fontVariantNumeric: "tabular-nums" }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, flex: 1 }}>{r.name}</span>
                <Pill T={T} color={sevColors[r.severity]} bg={(sevColors[r.severity] || T.textSec) + "14"}>{r.severity}</Pill>
              </div>
              <p style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: 0 }}>{r.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const impactColors = { high: T.capRed, medium: T.orange, low: T.textTer };
  const catalystsTab = (
    <div>
      {prose("Upcoming catalysts ordered by date. The Investor Day on 20 May 2026 and the Q2 print in late July are the binary moments for the re-rating thesis.")}
      <div style={{ display: "grid", gap: 10 }}>
        {catalysts.map((c, i) => (
          <Card key={i} T={T} style={{ padding: 0, overflow: "hidden", borderLeft: `4px solid ${impactColors[c.impact] || T.textSec}` }}>
            <div style={{ padding: "18px 22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: impactColors[c.impact] || T.textSec, fontFamily: Fn }}>{c.date}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, flex: 1 }}>{c.name}</span>
                <Pill T={T}>{c.type}</Pill>
                <Pill T={T} color={impactColors[c.impact]} bg={(impactColors[c.impact] || T.textSec) + "14"}>{c.impact} impact</Pill>
              </div>
              <p style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: 0 }}>{c.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const signalColors = { bullish: T.green, bearish: T.capRed, neutral: T.textTer };
  const smartMoneyTab = (
    <div>
      {prose(smartMoney.intro)}
      <div style={{ display: "grid", gap: 10, marginBottom: 24 }}>
        {smartMoney.positions.map((p, i) => (
          <Card key={i} T={T} style={{ padding: 0, overflow: "hidden", borderLeft: `4px solid ${signalColors[p.signal] || T.textSec}` }}>
            <div style={{ padding: "18px 22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: T.text, fontFamily: Fn }}>{p.manager}</span>
                <Pill T={T}>{p.style}</Pill>
                <Pill T={T} color={signalColors[p.signal]} bg={(signalColors[p.signal] || T.textSec) + "14"}>{p.action}</Pill>
              </div>
              <p style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: 0 }}>{p.detail}</p>
            </div>
          </Card>
        ))}
      </div>
      <Card T={T} style={{ padding: "18px 22px", borderLeft: `4px solid ${T.deepBlue}` }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: T.deepBlue, fontFamily: Fn, letterSpacing: "0.08em", marginBottom: 10, textTransform: "uppercase" }}>Positioning insight</div>
        <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: 0 }}>{smartMoney.insight}</p>
      </Card>
    </div>
  );

  const finContent = {
    "Current Setup": currentSetupTab,
    "Bull vs Bear": bullBearTab,
    "Q1 2026 & BI Note": q1Tab,
    "Consensus Evolution": consensusEvolutionTab,
    "Valuation & Multiples": valuationTab,
    "EPS Bridge": epsBridgeTab,
    "Peer Comparison": peerCompTab,
    "Why Underperforming": underperformanceTab,
    "Thematic Risks": thematicRisksTab,
    "Catalysts": catalystsTab,
    "Smart Money": smartMoneyTab,
  };

  /* ═══════════════════════════════════════════ RENDER ═══════════════════════════════════════════ */
  return (
    <div>
      {header}
      {section === "primer" ? (
        <><Tabs tabs={primerTabs} active={tab} onChange={setTab} T={T} />{primerContent[tab]}</>
      ) : section === "thematic" ? (
        <><Tabs tabs={thematicTabs} active={thTab} onChange={setThTab} T={T} />{thematicContent[thTab]}</>
      ) : (
        <><Tabs tabs={finTabs} active={fTab} onChange={setFTab} T={T} />{finContent[fTab]}</>
      )}
    </div>
  );
}
