import { useState, useRef, useEffect } from "react";
import { Fn, Fh } from "../theme";
import { Card, Pill } from "../components/shared";
import {
  heroStats, businessDescription,
  euvProblemIntro, euvCoreProblem, euvStages,
  productGenIntro, productComparison, highNaInsight,
  monopolyIntro, monopolyPillars,
  supplierIntro, suppliers,
  riskIntro, risks,
  keyTakeaway,
} from "../data/research-asml";

/* ═══════════════════════════════════════════ */
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
        <span style={{ fontSize: 16, color: T.textTer, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0)" }}>{"\u25BE"}</span>
      </div>
      <div style={{ maxHeight: open ? maxH + 20 : 0, overflow: "hidden", transition: "max-height 0.35s ease" }}>
        <div ref={innerRef} onClick={e => e.stopPropagation()} style={{ padding: "0 20px 20px", cursor: "default" }}>{children}</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════ */
function Tabs({ tabs, active, onChange, T }) {
  return (
    <div style={{ display: "flex", gap: 4, background: T.pillBg, borderRadius: T.radiusSm, padding: 3, marginBottom: 28, flexWrap: "wrap" }}>
      {tabs.map(t => (
        <button key={t} onClick={() => onChange(t)} style={{
          padding: "8px 14px", borderRadius: 6, border: "none", fontSize: 12, fontFamily: Fn,
          fontWeight: active === t ? 600 : 400, background: active === t ? T.card : "transparent",
          color: active === t ? T.text : T.textTer, cursor: "pointer", transition: "all 0.15s",
          boxShadow: active === t ? T.shadow : "none", whiteSpace: "nowrap",
        }}>{t}</button>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════ */
function MoatCard({ pillar, T }) {
  const [open, setOpen] = useState(false);
  const catColors = {
    "Supplier Concentration": T.deepBlue, "System Integration": T.capRed,
    "Two-Sided Lock-In": T.green, "Recurring Revenue": T.green,
    "Innovation Moat": T.purple, "Risk Factor": T.orange,
  };
  const c = catColors[pillar.category] || T.textSec;
  return (
    <div style={{ background: T.card, borderRadius: T.radius, border: "1px solid " + T.border, overflow: "hidden", boxShadow: open ? T.shadowLg : T.shadow, transition: "all 0.2s" }}>
      <div onClick={() => setOpen(!open)} style={{ padding: "18px 22px", cursor: "pointer" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, flex: 1 }}>{pillar.title}</span>
          <Pill T={T} color={c} bg={c + "14"}>{pillar.category}</Pill>
        </div>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <span style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginRight: 6 }}>Strength</span>
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} style={{ width: 28, height: 6, borderRadius: 3, background: i <= pillar.strength ? c : T.pillBg, transition: "background 0.3s" }} />
          ))}
          <span style={{ fontSize: 16, color: T.textTer, marginLeft: "auto", transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0)" }}>{"\u25BE"}</span>
        </div>
      </div>
      {open && <div style={{ padding: "0 22px 20px" }}><p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: 0 }}>{pillar.description}</p></div>}
    </div>
  );
}

/* ═══════════════════════════════════════════
   BEAM PATH DIAGRAM — custom SVG of the EUV light path
   ═══════════════════════════════════════════ */
function BeamPathDiagram({ T }) {
  const [hov, setHov] = useState(null);
  const stages = [
    { x: 80, y: 220, label: "Droplet generator", sub: "50,000/sec", color: T.deepBlue },
    { x: 200, y: 220, label: "Plasma", sub: "500,000 K", color: T.capRed },
    { x: 320, y: 160, label: "Collector mirror", sub: "70% reflectivity", color: T.deepBlue },
    { x: 460, y: 90, label: "Reticle", sub: "Reflective mask", color: T.purple },
    { x: 620, y: 160, label: "Projection optics", sub: "6 mirrors", color: T.deepBlue },
    { x: 760, y: 240, label: "Wafer", sub: "26 x 33mm field", color: T.green },
  ];
  return (
    <div style={{ background: T.card, border: "1px solid " + T.border, borderRadius: T.radius, padding: 24, marginBottom: 20 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>EUV beam path (schematic)</div>
      <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 16 }}>Source through projection optics to wafer. Hover for detail.</div>
      <svg width="100%" viewBox="0 0 840 320" style={{ display: "block" }} xmlns="http://www.w3.org/2000/svg">
        {/* Beam path lines */}
        {stages.slice(0, -1).map((s, i) => {
          const next = stages[i + 1];
          return (
            <line key={i} x1={s.x} y1={s.y} x2={next.x} y2={next.y}
              stroke={T.deepBlue} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
          );
        })}
        {/* Vacuum chamber outline */}
        <rect x="40" y="40" width="760" height="240" fill="none" stroke={T.border} strokeWidth="1" strokeDasharray="2 4" rx="8" />
        <text x="48" y="58" fontSize="9" fill={T.textTer} fontFamily={Fn} letterSpacing="0.1em">VACUUM CHAMBER</text>

        {/* Photon flow arrows */}
        {stages.slice(0, -1).map((s, i) => {
          const next = stages[i + 1];
          const midX = (s.x + next.x) / 2;
          const midY = (s.y + next.y) / 2;
          const angle = Math.atan2(next.y - s.y, next.x - s.x) * 180 / Math.PI;
          return (
            <polygon key={"a" + i} points="0,-4 8,0 0,4"
              fill={T.deepBlue} opacity="0.5"
              transform={`translate(${midX},${midY}) rotate(${angle})`} />
          );
        })}

        {/* Stage nodes */}
        {stages.map((s, i) => (
          <g key={i}
            onMouseEnter={() => setHov(i)}
            onMouseLeave={() => setHov(null)}
            style={{ cursor: "pointer" }}>
            <circle cx={s.x} cy={s.y} r={hov === i ? 18 : 14}
              fill={s.color} stroke={T.card} strokeWidth="3"
              style={{ transition: "r 0.15s" }} />
            <text x={s.x} y={s.y + 38} textAnchor="middle"
              fontSize="11" fontWeight="600" fill={T.text} fontFamily={Fn}>{s.label}</text>
            <text x={s.x} y={s.y + 52} textAnchor="middle"
              fontSize="9" fill={T.textTer} fontFamily={Fn}>{s.sub}</text>
          </g>
        ))}

        {/* Numbered step labels above */}
        {stages.map((s, i) => (
          <text key={"n" + i} x={s.x} y={s.y - 22} textAnchor="middle"
            fontSize="9" fontWeight="700" fill={T.textTer} fontFamily={Fn} letterSpacing="0.05em">
            STAGE {i + 1}
          </text>
        ))}
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════
   REFLECTIVITY DECAY CHART — custom SVG showing 0.7^N
   ═══════════════════════════════════════════ */
function ReflectivityChart({ T }) {
  const mirrors = Array.from({ length: 11 }, (_, i) => ({
    n: i,
    reflectivity: Math.pow(0.7, i) * 100,
  }));
  const W = 520, H = 200, padL = 50, padR = 20, padT = 20, padB = 35;
  const plotW = W - padL - padR, plotH = H - padT - padB;
  const maxY = 100;
  const x = (n) => padL + (n / 10) * plotW;
  const y = (v) => padT + plotH - (v / maxY) * plotH;
  const points = mirrors.map(m => `${x(m.n)},${y(m.reflectivity)}`).join(" ");

  return (
    <div style={{ background: T.card, border: "1px solid " + T.border, borderRadius: T.radius, padding: 24, marginBottom: 20 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>Photon survival across the optical path</div>
      <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 16 }}>Cumulative reflectivity after N mirrors, assuming 70 percent per mirror.</div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map(v => (
          <g key={v}>
            <line x1={padL} y1={y(v)} x2={W - padR} y2={y(v)} stroke={T.border} strokeWidth="0.5" />
            <text x={padL - 8} y={y(v) + 3} textAnchor="end" fontSize="9" fill={T.textTer} fontFamily={Fn}>{v}%</text>
          </g>
        ))}
        {/* X axis labels */}
        {mirrors.filter((_, i) => i % 2 === 0).map(m => (
          <text key={m.n} x={x(m.n)} y={H - 15} textAnchor="middle" fontSize="9" fill={T.textTer} fontFamily={Fn}>{m.n}</text>
        ))}
        <text x={W / 2} y={H - 3} textAnchor="middle" fontSize="9" fill={T.textTer} fontFamily={Fn}>Number of mirrors traversed</text>

        {/* Filled area under curve */}
        <polygon
          points={`${padL},${y(0)} ${points} ${x(10)},${y(0)}`}
          fill={T.deepBlue} opacity="0.08" />

        {/* Curve */}
        <polyline points={points} fill="none" stroke={T.deepBlue} strokeWidth="2" />

        {/* Dots and key annotations */}
        {mirrors.map(m => (
          <g key={m.n}>
            <circle cx={x(m.n)} cy={y(m.reflectivity)} r="3" fill={T.deepBlue} />
            {(m.n === 0 || m.n === 5 || m.n === 10) && (
              <text x={x(m.n)} y={y(m.reflectivity) - 10} textAnchor="middle"
                fontSize="10" fontWeight="600" fill={T.text} fontFamily={Fn}>
                {m.reflectivity.toFixed(m.n === 0 ? 0 : 1)}%
              </text>
            )}
          </g>
        ))}

        {/* Annotation arrow to N=10 */}
        <line x1={x(10) - 30} y1={y(2.8) + 30} x2={x(10) - 5} y2={y(2.8) + 4}
          stroke={T.capRed} strokeWidth="1" markerEnd="url(#arrow)" />
        <text x={x(10) - 35} y={y(2.8) + 44} textAnchor="end"
          fontSize="10" fontWeight="600" fill={T.capRed} fontFamily={Fn}>~97% of photons lost</text>
        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <polygon points="0,0 6,3 0,6" fill={T.capRed} />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════ */
export default function ResearchASML({ T }) {
  const [tab, setTab] = useState("Overview");
  const allTabs = ["Overview", "How EUV Works", "Product Generations", "The Monopoly", "Component Suppliers", "Risks"];

  const prose = (text, s = {}) => <p style={{ fontSize: 13.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.8, margin: "0 0 16px", ...s }}>{text}</p>;
  const sTitle = (t) => <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 16, letterSpacing: "-0.01em" }}>{t}</div>;

  /* ─── HEADER ─── */
  const header = (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
        <span style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 36, color: T.text }}>ASML</span>
        <span style={{ fontSize: 14, fontWeight: 600, color: T.textTer, fontFamily: Fn, letterSpacing: "0.04em" }}>ASML.AS / ASML</span>
        <Pill T={T} color={T.deepBlue} bg="rgba(29,78,216,0.08)">Business Primer</Pill>
      </div>
      <div style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, marginBottom: 16 }}>
        Veldhoven, Netherlands · Sole supplier of EUV lithography systems · Gating constraint on advanced semiconductor manufacturing
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

  /* ─── OVERVIEW TAB ─── */
  const overviewTab = (
    <div>
      {businessDescription.map((p, i) => prose(p, { key: i }))}
      <div style={{ padding: "18px 22px", marginTop: 8, borderRadius: T.radius, background: T.text === "#0F172A" ? "rgba(29,78,216,0.04)" : "rgba(96,165,250,0.06)", border: "1px solid " + T.border }}>
        <div style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75 }}>
          <strong style={{ color: T.deepBlue }}>The thesis in one paragraph: </strong>{keyTakeaway}
        </div>
      </div>
    </div>
  );

  /* ─── HOW EUV WORKS TAB ─── */
  const euvTab = (
    <div>
      {prose(euvProblemIntro)}
      <Card T={T} style={{ padding: "20px 24px", marginBottom: 24, borderLeft: `4px solid ${T.capRed}` }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: T.capRed, fontFamily: Fn, letterSpacing: "0.08em", marginBottom: 8, textTransform: "uppercase" }}>The core problem</div>
        <p style={{ fontSize: 13.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.8, margin: 0 }}>{euvCoreProblem}</p>
      </Card>

      <BeamPathDiagram T={T} />

      {sTitle("The four stages, end to end")}
      <div style={{ display: "grid", gap: 14, marginBottom: 28 }}>
        {euvStages.map((stage, i) => (
          <Card key={stage.id} T={T} style={{ padding: 0, overflow: "hidden", borderLeft: `4px solid ${T.deepBlue}` }}>
            <div style={{ padding: "20px 24px" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
                <span style={{ fontSize: 16, fontWeight: 600, color: T.text, fontFamily: Fn }}>{stage.title}</span>
              </div>
              <div style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, marginBottom: 14, fontStyle: "italic" }}>{stage.subtitle}</div>
              {prose(stage.content)}
              <div style={{ display: "grid", gap: 10, marginBottom: 14 }}>
                {stage.steps.map((step, si) => (
                  <div key={si} style={{ display: "flex", gap: 12, padding: "12px 14px", background: T.pillBg, borderRadius: T.radiusSm }}>
                    <div style={{ flexShrink: 0, width: 6, height: 6, marginTop: 7, borderRadius: 3, background: T.deepBlue }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>{step.label}</div>
                      <div style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.7 }}>{step.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: "12px 16px", background: T.text === "#0F172A" ? "rgba(234,88,12,0.05)" : "rgba(251,146,60,0.08)", borderRadius: T.radiusSm, border: "1px solid " + T.border }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: T.orange, fontFamily: Fn, letterSpacing: "0.08em", marginBottom: 6, textTransform: "uppercase" }}>Why this matters</div>
                <div style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.7 }}>{stage.insight}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {sTitle("The photon survival problem")}
      <ReflectivityChart T={T} />
      <div style={{ padding: "16px 20px", borderRadius: T.radius, background: T.text === "#0F172A" ? "rgba(155,27,27,0.04)" : "rgba(239,68,68,0.06)", border: "1px solid " + T.border }}>
        <div style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75 }}>
          <strong style={{ color: T.capRed }}>The downstream consequence: </strong>roughly 97 percent of the EUV photons that leave the source never reach the wafer. That is why the source laser has to be 25 to 30 kilowatts (one of the most powerful industrial CO₂ lasers ever built), why thermal management is such a massive engineering subsystem, and why every mirror is polished to sub-nanometre roughness. Any defect scatters precious photons.
        </div>
      </div>
    </div>
  );

  /* ─── PRODUCT GENERATIONS TAB ─── */
  const productTab = (
    <div>
      {prose(productGenIntro)}
      {sTitle("Low-NA versus High-NA")}
      <Card T={T} style={{ padding: 0, overflow: "hidden", marginBottom: 24 }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: Fn, fontSize: 12.5 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid " + T.border, background: T.pillBg }}>
                <th style={{ padding: "14px 18px", textAlign: "left", fontWeight: 600, color: T.textTer, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>Specification</th>
                <th style={{ padding: "14px 18px", textAlign: "left", fontWeight: 600, color: T.deepBlue, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>Low-NA (NXE:3800E)</th>
                <th style={{ padding: "14px 18px", textAlign: "left", fontWeight: 600, color: T.capRed, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>High-NA (EXE:5000)</th>
              </tr>
            </thead>
            <tbody>
              {productComparison.map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid " + T.border, background: i % 2 === 0 ? "transparent" : T.rowHover }}>
                  <td style={{ padding: "13px 18px", fontWeight: 500, color: T.text }}>{row.spec}</td>
                  <td style={{ padding: "13px 18px", color: T.textSec }}>{row.lowNa}</td>
                  <td style={{ padding: "13px 18px", color: T.textSec, fontWeight: row.spec === "Approximate price per tool" || row.spec === "Resolution" ? 600 : 400 }}>{row.highNa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div style={{ padding: "18px 22px", borderRadius: T.radius, background: T.text === "#0F172A" ? "rgba(124,58,237,0.05)" : "rgba(167,139,250,0.08)", border: "1px solid " + T.border }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: T.purple, fontFamily: Fn, letterSpacing: "0.08em", marginBottom: 8, textTransform: "uppercase" }}>Why High-NA is anamorphic</div>
        <div style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75 }}>{highNaInsight}</div>
      </div>
    </div>
  );

  /* ─── THE MONOPOLY TAB ─── */
  const monopolyTab = (
    <div>
      {prose(monopolyIntro)}
      <div style={{ display: "grid", gap: 12 }}>
        {monopolyPillars.map((m, i) => <MoatCard key={i} pillar={m} T={T} />)}
      </div>
      <div style={{ padding: "18px 22px", marginTop: 24, borderRadius: T.radius, background: T.greenBg, border: "1px solid " + T.border }}>
        <div style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75 }}>
          <strong style={{ color: T.green }}>Why no second supplier has emerged: </strong>a credible competitor would need to simultaneously industrialise a 25 to 30 kilowatt CO₂ laser (Trumpf took two decades), manufacture sub-nanometre molybdenum-silicon optics (Zeiss is the only firm in the world doing this at scale), build the precision wafer and reticle stages, develop a vacuum-compatible reticle handling and pellicle ecosystem, and integrate all of it into a system that prints at single-digit nanometre accuracy. Each individual problem has consumed billions of dollars and decades of effort. No firm has solved more than one, and ASML now owns parts of the supply chain (Cymer outright, Zeiss SMT 24.9 percent) that would have to be replicated from scratch.
        </div>
      </div>
    </div>
  );

  /* ─── COMPONENT SUPPLIERS TAB ─── */
  const supplierTab = (
    <div>
      {prose(supplierIntro)}
      <div style={{ display: "grid", gap: 10 }}>
        {suppliers.map((s, i) => (
          <Expandable key={i} title={`${s.name}  ·  ${s.role}`} subtitle={s.country} T={T}>
            {prose(s.detail)}
          </Expandable>
        ))}
      </div>
      <div style={{ padding: "18px 22px", marginTop: 24, borderRadius: T.radius, background: T.text === "#0F172A" ? "rgba(29,78,216,0.04)" : "rgba(96,165,250,0.06)", border: "1px solid " + T.border }}>
        <div style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75 }}>
          <strong style={{ color: T.deepBlue }}>The integration moat: </strong>even if a competitor obtained every subsystem (Trumpf laser, Zeiss optics, equivalent stages), the work of integrating them into a functioning scanner is the harder problem. Each EUV tool ships in roughly 40 freight containers, weighs around 180 tons, and takes months to install and qualify on-site. That integration capability sits almost entirely inside ASML's Veldhoven engineering organisation and is not separately licensable.
        </div>
      </div>
    </div>
  );

  /* ─── RISKS TAB ─── */
  const sevColors = {
    "High": T.capRed,
    "Medium-High": T.orange,
    "Medium": T.orange,
    "Low-Medium": T.textSec,
    "Low": T.textTer,
  };
  const risksTab = (
    <div>
      {prose(riskIntro)}
      <div style={{ display: "grid", gap: 12 }}>
        {risks.map((r, i) => (
          <Card key={i} T={T} style={{ padding: 0, overflow: "hidden", borderLeft: `4px solid ${sevColors[r.severity]}` }}>
            <div style={{ padding: "18px 22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, flex: 1 }}>{r.title}</span>
                <Pill T={T}>{r.category}</Pill>
                <Pill T={T} color={sevColors[r.severity]} bg={sevColors[r.severity] + "14"}>{r.severity}</Pill>
              </div>
              <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: 0 }}>{r.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const tabContent = {
    "Overview": overviewTab,
    "How EUV Works": euvTab,
    "Product Generations": productTab,
    "The Monopoly": monopolyTab,
    "Component Suppliers": supplierTab,
    "Risks": risksTab,
  };

  return (
    <div>
      {header}
      <Tabs tabs={allTabs} active={tab} onChange={setTab} T={T} />
      {tabContent[tab]}
    </div>
  );
}
