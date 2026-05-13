import { useState } from "react";
import { Fn, Fh } from "../theme";
import { Card, Pill } from "../components/shared";
import {
  heroStats, intro, coreProblem, stages,
  productComparison, highNaNote, monopolyClose,
} from "../data/research-asml";

/* ═══════════════════════════════════════════
   BEAM PATH DIAGRAM — schematic of the EUV light path
   ═══════════════════════════════════════════ */
function BeamPathDiagram({ T }) {
  const [hov, setHov] = useState(null);
  const nodes = [
    { x: 70, y: 230, label: "Droplet generator", sub: "~50,000/sec", color: T.deepBlue },
    { x: 200, y: 230, label: "Plasma", sub: "500,000 K", color: T.capRed },
    { x: 330, y: 170, label: "Collector mirror", sub: "~70% reflectivity", color: T.deepBlue },
    { x: 470, y: 90, label: "Reticle", sub: "Reflective mask", color: T.purple },
    { x: 620, y: 170, label: "Projection optics", sub: "6 mirrors", color: T.deepBlue },
    { x: 770, y: 240, label: "Wafer", sub: "26 x 33mm slit", color: T.green },
  ];
  return (
    <Card T={T} style={{ padding: 24, marginBottom: 24 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>EUV beam path (schematic)</div>
      <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 16 }}>Source through projection optics to wafer. All in vacuum.</div>
      <svg width="100%" viewBox="0 0 840 320" style={{ display: "block" }} xmlns="http://www.w3.org/2000/svg">
        <rect x="40" y="40" width="760" height="240" fill="none" stroke={T.border} strokeWidth="1" strokeDasharray="2 4" rx="8" />
        <text x="48" y="58" fontSize="9" fill={T.textTer} fontFamily={Fn} letterSpacing="0.1em">VACUUM CHAMBER</text>

        {nodes.slice(0, -1).map((s, i) => {
          const next = nodes[i + 1];
          return (
            <line key={i} x1={s.x} y1={s.y} x2={next.x} y2={next.y}
              stroke={T.deepBlue} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
          );
        })}

        {nodes.slice(0, -1).map((s, i) => {
          const next = nodes[i + 1];
          const midX = (s.x + next.x) / 2;
          const midY = (s.y + next.y) / 2;
          const angle = Math.atan2(next.y - s.y, next.x - s.x) * 180 / Math.PI;
          return (
            <polygon key={"a" + i} points="0,-4 8,0 0,4"
              fill={T.deepBlue} opacity="0.5"
              transform={`translate(${midX},${midY}) rotate(${angle})`} />
          );
        })}

        {nodes.map((s, i) => (
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
      </svg>
    </Card>
  );
}

/* ═══════════════════════════════════════════
   REFLECTIVITY DECAY CHART
   ═══════════════════════════════════════════ */
function ReflectivityChart({ T }) {
  const mirrors = Array.from({ length: 11 }, (_, i) => ({
    n: i,
    reflectivity: Math.pow(0.7, i) * 100,
  }));
  const W = 520, H = 200, padL = 50, padR = 20, padT = 20, padB = 35;
  const plotW = W - padL - padR, plotH = H - padT - padB;
  const x = (n) => padL + (n / 10) * plotW;
  const y = (v) => padT + plotH - (v / 100) * plotH;
  const points = mirrors.map(m => `${x(m.n)},${y(m.reflectivity)}`).join(" ");

  return (
    <Card T={T} style={{ padding: 24, marginBottom: 24 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>Photon survival across the optical path</div>
      <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 16 }}>Cumulative reflectivity after N mirrors, assuming 70 percent per mirror.</div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
        {[0, 25, 50, 75, 100].map(v => (
          <g key={v}>
            <line x1={padL} y1={y(v)} x2={W - padR} y2={y(v)} stroke={T.border} strokeWidth="0.5" />
            <text x={padL - 8} y={y(v) + 3} textAnchor="end" fontSize="9" fill={T.textTer} fontFamily={Fn}>{v}%</text>
          </g>
        ))}
        {mirrors.filter((_, i) => i % 2 === 0).map(m => (
          <text key={m.n} x={x(m.n)} y={H - 15} textAnchor="middle" fontSize="9" fill={T.textTer} fontFamily={Fn}>{m.n}</text>
        ))}
        <text x={W / 2} y={H - 3} textAnchor="middle" fontSize="9" fill={T.textTer} fontFamily={Fn}>Number of mirrors traversed</text>

        <polygon
          points={`${padL},${y(0)} ${points} ${x(10)},${y(0)}`}
          fill={T.deepBlue} opacity="0.08" />

        <polyline points={points} fill="none" stroke={T.deepBlue} strokeWidth="2" />

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
    </Card>
  );
}

/* ════════════════════════════════════════════════════════════════ */
export default function ResearchASML({ T }) {
  const prose = (text, s = {}) => <p style={{ fontSize: 13.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.85, margin: "0 0 16px", ...s }}>{text}</p>;
  const sectionTitle = (t) => <div style={{ fontSize: 18, fontWeight: 600, color: T.text, fontFamily: Fn, marginTop: 36, marginBottom: 18, letterSpacing: "-0.01em" }}>{t}</div>;

  /* ─── HEADER ─── */
  const header = (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
        <span style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 36, color: T.text }}>ASML</span>
        <span style={{ fontSize: 14, fontWeight: 600, color: T.textTer, fontFamily: Fn, letterSpacing: "0.04em" }}>ASML.AS / ASML</span>
        <Pill T={T} color={T.deepBlue} bg="rgba(29,78,216,0.08)">Technology Primer</Pill>
      </div>
      <div style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, marginBottom: 16 }}>
        Veldhoven, Netherlands · Sole supplier of EUV lithography systems
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10 }}>
        {heroStats.map((s, i) => (
          <div key={i} style={{ background: T.card, borderRadius: T.radiusSm, padding: "14px 16px", border: "1px solid " + T.border }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: T[s.color] || T.text, fontFamily: Fn }}>{s.value}</div>
            <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 3, lineHeight: 1.4 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );

  /* ─── INTRO + CORE PROBLEM ─── */
  const introSection = (
    <div>
      {prose(intro, { fontSize: 14.5, fontStyle: "italic", color: T.text })}
      <Card T={T} style={{ padding: "20px 24px", marginBottom: 24, borderLeft: `4px solid ${T.capRed}` }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: T.capRed, fontFamily: Fn, letterSpacing: "0.08em", marginBottom: 10, textTransform: "uppercase" }}>The core problem</div>
        <p style={{ fontSize: 13.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.85, margin: 0 }}>{coreProblem}</p>
      </Card>
    </div>
  );

  /* ─── STAGES ─── */
  const stageColor = (i) => [T.deepBlue, T.capRed, T.purple, T.green][i % 4];
  const stagesSection = (
    <div style={{ display: "grid", gap: 16 }}>
      {stages.map((stage, i) => (
        <Card key={stage.id} T={T} style={{ padding: 0, overflow: "hidden", borderLeft: `4px solid ${stageColor(i)}` }}>
          <div style={{ padding: "22px 26px" }}>
            <div style={{ fontSize: 17, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>{stage.title}</div>
            <div style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, marginBottom: 16, fontStyle: "italic" }}>{stage.subtitle}</div>
            {prose(stage.intro)}
            <div style={{ display: "grid", gap: 10, marginBottom: stage.closing ? 16 : 0 }}>
              {stage.steps.map((step, si) => (
                <div key={si} style={{ display: "flex", gap: 14, padding: "14px 16px", background: T.pillBg, borderRadius: T.radiusSm }}>
                  <div style={{ flexShrink: 0, width: 7, height: 7, marginTop: 7, borderRadius: 4, background: stageColor(i) }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>{step.label}</div>
                    <div style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.75 }}>{step.detail}</div>
                  </div>
                </div>
              ))}
            </div>
            {stage.closing && (
              <div style={{ padding: "14px 18px", background: T.text === "#0F172A" ? "rgba(234,88,12,0.05)" : "rgba(251,146,60,0.08)", borderRadius: T.radiusSm, border: "1px solid " + T.border }}>
                <div style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.75 }}>{stage.closing}</div>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );

  /* ─── PRODUCT GENERATIONS ─── */
  const productSection = (
    <div>
      <Card T={T} style={{ padding: 0, overflow: "hidden", marginBottom: 20 }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: Fn, fontSize: 12.5 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid " + T.border, background: T.pillBg }}>
                <th style={{ padding: "14px 18px", textAlign: "left", fontWeight: 600, color: T.textTer, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}> </th>
                <th style={{ padding: "14px 18px", textAlign: "left", fontWeight: 600, color: T.deepBlue, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>Low-NA (NXE:3800E)</th>
                <th style={{ padding: "14px 18px", textAlign: "left", fontWeight: 600, color: T.capRed, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>High-NA (EXE:5000)</th>
              </tr>
            </thead>
            <tbody>
              {productComparison.map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid " + T.border, background: i % 2 === 0 ? "transparent" : T.rowHover }}>
                  <td style={{ padding: "13px 18px", fontWeight: 500, color: T.text }}>{row.spec}</td>
                  <td style={{ padding: "13px 18px", color: T.textSec }}>{row.lowNa}</td>
                  <td style={{ padding: "13px 18px", color: T.textSec }}>{row.highNa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <div style={{ padding: "18px 22px", borderRadius: T.radius, background: T.text === "#0F172A" ? "rgba(124,58,237,0.05)" : "rgba(167,139,250,0.08)", border: "1px solid " + T.border }}>
        <div style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.8 }}>{highNaNote}</div>
      </div>
    </div>
  );

  /* ─── MONOPOLY CLOSE ─── */
  const monopolySection = (
    <Card T={T} style={{ padding: "22px 26px", borderLeft: `4px solid ${T.deepBlue}` }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: T.deepBlue, fontFamily: Fn, letterSpacing: "0.08em", marginBottom: 12, textTransform: "uppercase" }}>Why this is an effective monopoly</div>
      <p style={{ fontSize: 13.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.85, margin: 0 }}>{monopolyClose}</p>
    </Card>
  );

  return (
    <div>
      {header}
      {introSection}

      {sectionTitle("The beam path, end to end")}
      <BeamPathDiagram T={T} />

      {sectionTitle("The four stages")}
      {stagesSection}

      {sectionTitle("The photon survival problem")}
      <ReflectivityChart T={T} />

      {sectionTitle("The two product generations")}
      {productSection}

      {sectionTitle("Why this is an effective monopoly")}
      {monopolySection}
    </div>
  );
}
