import { useState, useRef, useEffect } from "react";
import { Fn } from "../theme";
import { Card, Pill } from "../components/shared";
import {
  solarSnapshot, heroStats, capacityGrowthData, forecastData,
  regionalCapacity, segmentSplit, generationData, marketScaleParagraphs,
  demandDrivers, policyComparison,
  tariffData, headwindMetrics, nemImpact, supplyChainConcentration, headwindsParagraphs,
  solarVsAlternatives, investmentComparison, competitiveParagraphs,
  techMarketShare, efficiencyRecords, technologyParagraphs,
  overcapacityTable, overcapacityVisual, polyMargins, moduleASPData, supplyChainParagraphs,
  regionalDetails,
  companyProfiles, marginComparisonData, companyParagraphs,
  keyDebates,
  moatSegments, topPicks, catalysts, keyCharts, conclusionParagraphs,
} from "../data/research-solar";

/* ─── Colour helpers ─── */
const solar = "#EA580C";
const solarBg = "rgba(234,88,12,0.08)";
const solarBgStrong = "rgba(234,88,12,0.14)";

/* ─── Expandable section ─── */
function Expandable({ title, children, defaultOpen, T }) {
  const [open, setOpen] = useState(!!defaultOpen);
  const innerRef = useRef(null);
  const [maxH, setMaxH] = useState(5000);
  useEffect(() => { if (innerRef.current) setMaxH(innerRef.current.scrollHeight + 40); }, [open]);
  return (
    <div style={{
      background: T.card, border: "1px solid " + (open ? solar + "50" : T.border),
      borderRadius: T.radius, marginBottom: 12, overflow: "hidden", transition: "border-color 0.2s",
    }}>
      <div onClick={() => setOpen(!open)} style={{
        padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between",
        cursor: "pointer", userSelect: "none",
      }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: T.text, fontFamily: Fn }}>{title}</span>
        <div style={{
          width: 24, height: 24, borderRadius: "50%", background: T.pillBg,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 10, color: T.textTer, transition: "transform 0.3s",
          transform: open ? "rotate(180deg)" : "rotate(0)",
        }}>▼</div>
      </div>
      <div style={{ maxHeight: open ? maxH : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
        <div ref={innerRef} style={{ padding: "0 20px 20px" }}>{children}</div>
      </div>
    </div>
  );
}

/* ─── Section anchor ─── */
function Section({ id, children }) {
  return <div id={`solar-${id}`} style={{ scrollMarginTop: 80 }}>{children}</div>;
}

/* ─── Table component ─── */
function DataTable({ headers, rows, T, highlightCol }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: Fn, fontSize: 12 }}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} style={{
                textAlign: i === 0 ? "left" : "right", padding: "10px 12px",
                borderBottom: "2px solid " + T.border, fontSize: 10, fontWeight: 600,
                color: T.textTer, letterSpacing: "0.05em", textTransform: "uppercase",
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} style={{ borderBottom: "1px solid " + T.border }}>
              {row.map((cell, ci) => (
                <td key={ci} style={{
                  textAlign: ci === 0 ? "left" : "right", padding: "10px 12px",
                  color: ci === highlightCol ? solar : T.textSec, fontWeight: ci === highlightCol ? 600 : 400,
                  fontSize: 12,
                }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SVG CHART COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

/* ─── Capacity Growth Area Chart ─── */
function CapacityChart({ data, T }) {
  const W = 700, H = 280, pad = { t: 24, r: 24, b: 36, l: 54 };
  const w = W - pad.l - pad.r, h = H - pad.t - pad.b;
  const maxVal = 3200;
  const x = (i) => pad.l + (i / (data.length - 1)) * w;
  const y = (v) => pad.t + h - (v / maxVal) * h;
  const pts = data.map((d, i) => `${x(i)},${y(d.cumulative)}`).join(" ");
  const areaPath = `M${x(0)},${y(data[0].cumulative)} ${data.map((d, i) => `L${x(i)},${y(d.cumulative)}`).join(" ")} L${x(data.length - 1)},${pad.t + h} L${x(0)},${pad.t + h} Z`;
  const [hov, setHov] = useState(-1);

  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>Cumulative global solar PV capacity (GW)</div>
      <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 12 }}>From 303 GW in 2016 to 2,855 GW in 2025 — a tenfold increase in under a decade</div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }} onMouseLeave={() => setHov(-1)}>
        {[500, 1000, 1500, 2000, 2500, 3000].map((v, i) => y(v) >= pad.t ? (
          <g key={i}>
            <line x1={pad.l} x2={W - pad.r} y1={y(v)} y2={y(v)} stroke={T.border} strokeWidth="0.5" />
            <text x={pad.l - 8} y={y(v) + 3} textAnchor="end" fontSize="9" fill={T.textTer} fontFamily={Fn}>{v >= 1000 ? (v/1000).toFixed(1) + "K" : v}</text>
          </g>
        ) : null)}
        <defs>
          <linearGradient id="solarGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={solar} stopOpacity="0.25" />
            <stop offset="100%" stopColor={solar} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#solarGrad)" />
        <polyline fill="none" stroke={solar} strokeWidth="2.5" points={pts} strokeLinejoin="round" />
        {data.map((d, i) => (
          <g key={i} onMouseEnter={() => setHov(i)} style={{ cursor: "pointer" }}>
            <circle cx={x(i)} cy={y(d.cumulative)} r={hov === i ? 6 : 3} fill={solar} opacity={hov === i ? 1 : 0.7} style={{ transition: "all 0.15s" }} />
            {hov === i && (
              <g>
                <rect x={x(i) - 52} y={y(d.cumulative) - 40} width={104} height={30} rx={6} fill={T.text === "#0F172A" ? "rgba(15,23,42,0.92)" : "rgba(250,250,250,0.92)"} />
                <text x={x(i)} y={y(d.cumulative) - 21} textAnchor="middle" fontSize="10" fontFamily={Fn} fontWeight="600" fill={T.text === "#0F172A" ? "#fff" : "#000"}>
                  {d.cumulative.toLocaleString()} GW · {d.year}
                </text>
              </g>
            )}
          </g>
        ))}
        {data.map((d, i) => (
          <text key={`l${i}`} x={x(i)} y={H - 8} textAnchor="middle" fontSize="9" fill={T.textTer} fontFamily={Fn}>{d.year}</text>
        ))}
      </svg>
    </div>
  );
}

/* ─── Annual Installations Bar Chart ─── */
function InstallationsChart({ data, T }) {
  const W = 700, H = 260, pad = { t: 24, r: 24, b: 36, l: 54 };
  const w = W - pad.l - pad.r, h = H - pad.t - pad.b;
  const maxVal = 750;
  const barW = (w / data.length) * 0.6;
  const gap = (w / data.length) * 0.4;
  const [hov, setHov] = useState(-1);

  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>Annual solar PV installations (GW)</div>
      <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 12 }}>Growth from 76 GW in 2016 to 651 GW in 2025 — moderating after 87% surge in 2023</div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }} onMouseLeave={() => setHov(-1)}>
        {[200, 400, 600].map((v, i) => (
          <g key={i}>
            <line x1={pad.l} x2={W - pad.r} y1={pad.t + h - (v / maxVal) * h} y2={pad.t + h - (v / maxVal) * h} stroke={T.border} strokeWidth="0.5" />
            <text x={pad.l - 8} y={pad.t + h - (v / maxVal) * h + 3} textAnchor="end" fontSize="9" fill={T.textTer} fontFamily={Fn}>{v}</text>
          </g>
        ))}
        {data.map((d, i) => {
          const barH = (d.annual / maxVal) * h;
          const cx = pad.l + (i + 0.5) * (w / data.length);
          return (
            <g key={i} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(-1)} style={{ cursor: "pointer" }}>
              <rect x={cx - barW / 2} y={pad.t + h - barH} width={barW} height={barH} rx={4}
                fill={hov === i ? solar : T.deepBlue} opacity={hov === i ? 0.9 : 0.55} style={{ transition: "all 0.15s" }} />
              <text x={cx} y={pad.t + h - barH - 6} textAnchor="middle" fontSize="10" fontWeight="600"
                fill={hov === i ? solar : T.deepBlue} fontFamily={Fn}>{d.annual}</text>
              <text x={cx} y={H - 8} textAnchor="middle" fontSize="9" fill={T.textTer} fontFamily={Fn}>{d.year}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ─── Interactive SVG Pie Chart ─── */
function PieChart({ data, T, title, subtitle, size = 200, colorMap }) {
  const [hov, setHov] = useState(-1);
  const cx = size / 2, cy = size / 2, r = size * 0.38;
  let startAngle = -90;

  const slices = data.map((d, i) => {
    const angle = (d.share / 100) * 360;
    const a1 = (startAngle * Math.PI) / 180;
    const a2 = ((startAngle + angle) * Math.PI) / 180;
    const largeArc = angle > 180 ? 1 : 0;
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
    const path = `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc} 1 ${x2},${y2} Z`;
    const mid = ((startAngle + angle / 2) * Math.PI) / 180;
    const lx = cx + r * 0.62 * Math.cos(mid), ly = cy + r * 0.62 * Math.sin(mid);
    startAngle += angle;
    const fill = (colorMap && colorMap[d.color]) ? colorMap[d.color] : T[d.color] || solar;
    return { path, fill, lx, ly, ...d, idx: i };
  });

  return (
    <div>
      {title && <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>{title}</div>}
      {subtitle && <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 12 }}>{subtitle}</div>}
      <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
        <svg viewBox={`0 0 ${size} ${size}`} style={{ width: size, height: size, flexShrink: 0 }} onMouseLeave={() => setHov(-1)}>
          {slices.map((s, i) => (
            <g key={i} onMouseEnter={() => setHov(i)} style={{ cursor: "pointer" }}>
              <path d={s.path} fill={s.fill} opacity={hov === -1 ? 0.75 : hov === i ? 1 : 0.3}
                style={{ transition: "all 0.2s", transform: hov === i ? `translate(${Math.cos(((slices.reduce((a, sl, j) => a + (j < i ? sl.share : 0), 0) + s.share / 2 - 25) * Math.PI) / 50)}px, ${Math.sin(((slices.reduce((a, sl, j) => a + (j < i ? sl.share : 0), 0) + s.share / 2 - 25) * Math.PI) / 50)}px)` : "none" }} />
              {s.share > 8 && (
                <text x={s.lx} y={s.ly} textAnchor="middle" dominantBaseline="middle" fontSize="10" fontWeight="600"
                  fill="#fff" fontFamily={Fn} style={{ pointerEvents: "none" }}>{s.share.toFixed(0)}%</text>
              )}
            </g>
          ))}
        </svg>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {slices.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", opacity: hov === -1 ? 1 : hov === i ? 1 : 0.4, transition: "opacity 0.2s" }}
              onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(-1)}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: s.fill, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: T.text, fontFamily: Fn, fontWeight: 500 }}>{s.region || s.segment}</span>
              <span style={{ fontSize: 11, color: T.textTer, fontFamily: Fn }}>{s.share.toFixed(1)}%</span>
              {s.gw && <span style={{ fontSize: 11, color: s.fill, fontFamily: Fn, fontWeight: 600 }}>{s.gw} GW</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Module ASP Dual-Line Chart ─── */
function ASPChart({ data, T }) {
  const W = 700, H = 250, pad = { t: 24, r: 24, b: 36, l: 54 };
  const w = W - pad.l - pad.r, h = H - pad.t - pad.b;
  const maxVal = 0.36, minVal = 0.05;
  const x = (i) => pad.l + (i / (data.length - 1)) * w;
  const y = (v) => pad.t + h - ((v - minVal) / (maxVal - minVal)) * h;
  const [hov, setHov] = useState(-1);

  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>Module ASPs: China FOB vs US domestic ($/W)</div>
      <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 12 }}>US prices at 3x global levels due to tariffs and domestic content requirements</div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }} onMouseLeave={() => setHov(-1)}>
        {[0.10, 0.15, 0.20, 0.25, 0.30, 0.35].map((v, i) => y(v) >= pad.t && y(v) <= pad.t + h ? (
          <g key={i}>
            <line x1={pad.l} x2={W - pad.r} y1={y(v)} y2={y(v)} stroke={T.border} strokeWidth="0.5" />
            <text x={pad.l - 8} y={y(v) + 3} textAnchor="end" fontSize="9" fill={T.textTer} fontFamily={Fn}>${v.toFixed(2)}</text>
          </g>
        ) : null)}
        <defs>
          <linearGradient id="aspGrad1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={T.deepBlue} stopOpacity="0.15" />
            <stop offset="100%" stopColor={T.deepBlue} stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="aspGrad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={solar} stopOpacity="0.15" />
            <stop offset="100%" stopColor={solar} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {/* US price line */}
        <polyline fill="none" stroke={T.deepBlue} strokeWidth="2" strokeLinejoin="round"
          points={data.map((d, i) => `${x(i)},${y(d.usPrice)}`).join(" ")} />
        {/* China FOB line */}
        <polyline fill="none" stroke={solar} strokeWidth="2.5" strokeLinejoin="round"
          points={data.map((d, i) => `${x(i)},${y(d.chinaFOB)}`).join(" ")} />
        {data.map((d, i) => (
          <g key={i} onMouseEnter={() => setHov(i)} style={{ cursor: "pointer" }}>
            <rect x={x(i) - 20} y={pad.t} width={40} height={h} fill="transparent" />
            <circle cx={x(i)} cy={y(d.usPrice)} r={hov === i ? 5 : 2.5} fill={T.deepBlue} opacity={hov === i ? 1 : 0.6} style={{ transition: "all 0.15s" }} />
            <circle cx={x(i)} cy={y(d.chinaFOB)} r={hov === i ? 5 : 2.5} fill={solar} opacity={hov === i ? 1 : 0.6} style={{ transition: "all 0.15s" }} />
            {hov === i && (
              <g>
                <rect x={x(i) - 58} y={Math.min(y(d.usPrice), y(d.chinaFOB)) - 48} width={116} height={40} rx={6}
                  fill={T.text === "#0F172A" ? "rgba(15,23,42,0.92)" : "rgba(250,250,250,0.92)"} />
                <text x={x(i)} y={Math.min(y(d.usPrice), y(d.chinaFOB)) - 34} textAnchor="middle" fontSize="9" fontFamily={Fn} fontWeight="600" fill={T.deepBlue}>
                  US: ${d.usPrice.toFixed(3)}
                </text>
                <text x={x(i)} y={Math.min(y(d.usPrice), y(d.chinaFOB)) - 20} textAnchor="middle" fontSize="9" fontFamily={Fn} fontWeight="600" fill={solar}>
                  CN: ${d.chinaFOB.toFixed(3)}
                </text>
              </g>
            )}
          </g>
        ))}
        {data.map((d, i) => i % 2 === 0 ? (
          <text key={`l${i}`} x={x(i)} y={H - 8} textAnchor="middle" fontSize="8" fill={T.textTer} fontFamily={Fn}>{d.period}</text>
        ) : null)}
        {/* Legend */}
        <line x1={pad.l} y1={H - 6} x2={pad.l + 16} y2={H - 6} stroke={T.deepBlue} strokeWidth="2" />
        <text x={pad.l + 20} y={H - 3} fontSize="8" fill={T.textTer} fontFamily={Fn}>US domestic</text>
        <line x1={pad.l + 90} y1={H - 6} x2={pad.l + 106} y2={H - 6} stroke={solar} strokeWidth="2.5" />
        <text x={pad.l + 110} y={H - 3} fontSize="8" fill={T.textTer} fontFamily={Fn}>China FOB</text>
      </svg>
    </div>
  );
}

/* ─── Technology Market Share Stacked Chart ─── */
function TechStackChart({ data, T }) {
  const W = 700, H = 260, pad = { t: 24, r: 24, b: 36, l: 54 };
  const w = W - pad.l - pad.r, h = H - pad.t - pad.b;
  const barW = (w / data.length) * 0.65;
  const colors = { perc: T.grey400, topcon: solar, hjt: T.green, other: T.deepBlue };
  const labels = { perc: "PERC", topcon: "TOPCon", hjt: "HJT", other: "Other/BC" };
  const [hov, setHov] = useState(-1);

  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>Cell technology market share evolution (%)</div>
      <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 12 }}>TOPCon overtook PERC in 2024 and now dominates at 65% — the fastest technology transition in a decade</div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }} onMouseLeave={() => setHov(-1)}>
        {[25, 50, 75, 100].map((v) => (
          <g key={v}>
            <line x1={pad.l} x2={W - pad.r} y1={pad.t + h - (v / 100) * h} y2={pad.t + h - (v / 100) * h} stroke={T.border} strokeWidth="0.5" />
            <text x={pad.l - 8} y={pad.t + h - (v / 100) * h + 3} textAnchor="end" fontSize="9" fill={T.textTer} fontFamily={Fn}>{v}%</text>
          </g>
        ))}
        {data.map((d, i) => {
          const cx = pad.l + (i + 0.5) * (w / data.length);
          const techs = ["other", "hjt", "topcon", "perc"];
          let cumY = pad.t + h;
          return (
            <g key={i} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(-1)} style={{ cursor: "pointer" }}>
              {techs.map((tech) => {
                const val = d[tech];
                const barH = (val / 100) * h;
                const yPos = cumY - barH;
                cumY = yPos;
                return (
                  <rect key={tech} x={cx - barW / 2} y={yPos} width={barW} height={barH}
                    fill={colors[tech]} opacity={hov === -1 ? 0.7 : hov === i ? 0.9 : 0.3}
                    style={{ transition: "opacity 0.15s" }} />
                );
              })}
              <text x={cx} y={H - 8} textAnchor="middle" fontSize="9" fill={T.textTer} fontFamily={Fn}>{d.year}</text>
              {hov === i && (
                <g>
                  <rect x={cx - 48} y={pad.t - 6} width={96} height={56} rx={6}
                    fill={T.text === "#0F172A" ? "rgba(15,23,42,0.92)" : "rgba(250,250,250,0.92)"} />
                  {["perc", "topcon", "hjt", "other"].map((tech, ti) => (
                    <text key={tech} x={cx} y={pad.t + 8 + ti * 12} textAnchor="middle" fontSize="9" fontFamily={Fn} fontWeight="500" fill={colors[tech]}>
                      {labels[tech]}: {d[tech]}%
                    </text>
                  ))}
                </g>
              )}
            </g>
          );
        })}
        {/* Legend */}
        {Object.entries(labels).map(([key, label], i) => (
          <g key={key}>
            <rect x={pad.l + i * 80} y={H - 6} width={10} height={3} rx={1.5} fill={colors[key]} opacity={0.7} />
            <text x={pad.l + i * 80 + 14} y={H - 3} fontSize="8" fill={T.textTer} fontFamily={Fn}>{label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ─── Margin Comparison Horizontal Bars ─── */
function MarginChart({ data, T }) {
  const W = 700, H = 320, pad = { t: 16, r: 60, b: 16, l: 120 };
  const w = W - pad.l - pad.r, h = H - pad.t - pad.b;
  const rowH = h / data.length;
  const maxPos = 50, maxNeg = 70;
  const zero = pad.l + (maxNeg / (maxNeg + maxPos)) * w;

  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>Gross margins across the solar value chain (%)</div>
      <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 12 }}>Western technology plays vs Chinese commodity manufacturers — a tale of two industries</div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }}>
        <line x1={zero} x2={zero} y1={pad.t} y2={pad.t + h} stroke={T.border} strokeWidth="1" />
        {data.map((d, i) => {
          const cy = pad.t + (i + 0.5) * rowH;
          const barH = rowH * 0.55;
          const isNeg = d.gross < 0;
          const barW2 = Math.abs(d.gross) / (isNeg ? maxNeg : maxPos) * (isNeg ? (zero - pad.l) : (pad.l + w - zero));
          const bx = isNeg ? zero - barW2 : zero;
          const color = d.gross >= 30 ? T.green : d.gross >= 10 ? T.deepBlue : d.gross >= 0 ? T.orange : T.capRed;
          return (
            <g key={i}>
              <text x={pad.l - 8} y={cy + 4} textAnchor="end" fontSize="11" fontFamily={Fn} fontWeight="500" fill={T.text}>{d.company}</text>
              <rect x={bx} y={cy - barH / 2} width={barW2} height={barH} rx={4} fill={color} opacity={0.65} />
              <text x={isNeg ? bx - 6 : bx + barW2 + 6} y={cy + 4} textAnchor={isNeg ? "end" : "start"} fontSize="10" fontWeight="600" fill={color} fontFamily={Fn}>
                {d.gross > 0 ? "+" : ""}{d.gross.toFixed(1)}%
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ─── Overcapacity Visualization ─── */
function OvercapacityChart({ data, T }) {
  const W = 700, H = 220, pad = { t: 24, r: 24, b: 36, l: 100 };
  const w = W - pad.l - pad.r, h = H - pad.t - pad.b;
  const maxVal = 2000;
  const rowH = h / data.length;

  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>Supply chain overcapacity: capacity vs demand (GW equivalent)</div>
      <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 12 }}>Module overcapacity is the most extreme at 2.5-2.8x — capacity of 1,800 GW against demand of only 675 GW</div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }}>
        {[500, 1000, 1500].map((v) => (
          <g key={v}>
            <line x1={pad.l} x2={W - pad.r} y1={pad.t} y2={pad.t} stroke="transparent" />
            <line x1={pad.l + (v / maxVal) * w} x2={pad.l + (v / maxVal) * w} y1={pad.t} y2={pad.t + h} stroke={T.border} strokeWidth="0.5" strokeDasharray="4,4" />
            <text x={pad.l + (v / maxVal) * w} y={H - 8} textAnchor="middle" fontSize="9" fill={T.textTer} fontFamily={Fn}>{v} GW</text>
          </g>
        ))}
        {data.map((d, i) => {
          const cy = pad.t + (i + 0.5) * rowH;
          const barH = rowH * 0.35;
          const capW = (d.capacityGW / maxVal) * w;
          const demW = (d.demandGW / maxVal) * w;
          return (
            <g key={i}>
              <text x={pad.l - 10} y={cy + 4} textAnchor="end" fontSize="11" fontFamily={Fn} fontWeight="500" fill={T.text}>{d.stage}</text>
              <rect x={pad.l} y={cy - barH - 1} width={capW} height={barH} rx={3} fill={T.capRed} opacity={0.3} />
              <rect x={pad.l} y={cy + 1} width={demW} height={barH} rx={3} fill={T.green} opacity={0.5} />
              <text x={pad.l + capW + 6} y={cy - barH / 2 + 3} fontSize="9" fontWeight="600" fill={T.capRed} fontFamily={Fn}>{d.capacityGW.toLocaleString()} GW capacity</text>
              <text x={pad.l + demW + 6} y={cy + barH / 2 + 5} fontSize="9" fontWeight="600" fill={T.green} fontFamily={Fn}>{d.demandGW} GW demand</text>
            </g>
          );
        })}
        {/* Legend */}
        <rect x={pad.l} y={H - 8} width={10} height={3} rx={1.5} fill={T.capRed} opacity={0.4} />
        <text x={pad.l + 14} y={H - 5} fontSize="8" fill={T.textTer} fontFamily={Fn}>Nameplate capacity</text>
        <rect x={pad.l + 110} y={H - 8} width={10} height={3} rx={1.5} fill={T.green} opacity={0.6} />
        <text x={pad.l + 124} y={H - 5} fontSize="8" fill={T.textTer} fontFamily={Fn}>Actual demand</text>
      </svg>
    </div>
  );
}

/* ─── Generation Growth + Share Chart ─── */
function GenerationChart({ data, T }) {
  const W = 700, H = 260, pad = { t: 24, r: 55, b: 36, l: 50 };
  const w = W - pad.l - pad.r, h = H - pad.t - pad.b;
  const maxTWh = 3200, maxShare = 10;
  const x = (i) => pad.l + (i / (data.length - 1)) * w;
  const yL = (v) => pad.t + h - (v / maxTWh) * h;
  const yR = (v) => pad.t + h - (v / maxShare) * h;
  const barW = 44;
  const [hov, setHov] = useState(-1);

  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>Solar generation (TWh) and share of global electricity (%)</div>
      <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 12 }}>From 2.7% to 8.8% of global electricity in six years — 34 economies now generate 10%+ from solar</div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }} onMouseLeave={() => setHov(-1)}>
        {[1000, 2000, 3000].map((v) => yL(v) >= pad.t ? (
          <g key={v}>
            <line x1={pad.l} x2={W - pad.r} y1={yL(v)} y2={yL(v)} stroke={T.border} strokeWidth="0.5" />
            <text x={pad.l - 6} y={yL(v) + 3} textAnchor="end" fontSize="8" fill={T.textTer} fontFamily={Fn}>{(v/1000).toFixed(0)}K TWh</text>
          </g>
        ) : null)}
        {[2, 4, 6, 8, 10].map((v) => (
          <text key={`r${v}`} x={W - pad.r + 6} y={yR(v) + 3} textAnchor="start" fontSize="8" fill={solar} fontFamily={Fn}>{v}%</text>
        ))}
        {data.map((d, i) => {
          const barH = (d.twh / maxTWh) * h;
          return (
            <g key={i} onMouseEnter={() => setHov(i)} style={{ cursor: "pointer" }}>
              <rect x={x(i) - barW / 2} y={pad.t + h - barH} width={barW} height={barH} rx={4} fill={T.deepBlue} opacity={hov === i ? 0.6 : 0.25} style={{ transition: "opacity 0.15s" }} />
              {hov === i && (
                <text x={x(i)} y={pad.t + h - barH - 5} textAnchor="middle" fontSize="9" fontWeight="600" fill={T.deepBlue} fontFamily={Fn}>{d.twh} TWh</text>
              )}
              <text x={x(i)} y={H - 8} textAnchor="middle" fontSize="9" fill={T.textTer} fontFamily={Fn}>{d.year}</text>
            </g>
          );
        })}
        <polyline fill="none" stroke={solar} strokeWidth="2.5" strokeLinejoin="round"
          points={data.map((d, i) => `${x(i)},${yR(d.shareOfElec)}`).join(" ")} />
        {data.map((d, i) => (
          <g key={`c${i}`}>
            <circle cx={x(i)} cy={yR(d.shareOfElec)} r={hov === i ? 5 : 3} fill={solar} style={{ transition: "r 0.15s" }} />
            {hov === i && (
              <text x={x(i)} y={yR(d.shareOfElec) - 10} textAnchor="middle" fontSize="9" fontWeight="600" fill={solar} fontFamily={Fn}>{d.shareOfElec}%</text>
            )}
          </g>
        ))}
        <rect x={pad.l} y={H - 6} width={10} height={3} rx={1.5} fill={T.deepBlue} opacity={0.35} />
        <text x={pad.l + 14} y={H - 3} fontSize="8" fill={T.textTer} fontFamily={Fn}>Generation (TWh)</text>
        <line x1={pad.l + 110} y1={H - 5} x2={pad.l + 124} y2={H - 5} stroke={solar} strokeWidth="2" />
        <text x={pad.l + 128} y={H - 3} fontSize="8" fill={T.textTer} fontFamily={Fn}>% of global electricity</text>
      </svg>
    </div>
  );
}

/* ─── China Supply Chain Concentration Bar ─── */
function ConcentrationChart({ data, T }) {
  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>China's dominance of the solar value chain (%)</div>
      <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 16 }}>Over 80% of every stage, with 95%+ of wafer production — the most concentrated supply chain in global energy</div>
      <div style={{ display: "grid", gap: 10 }}>
        {data.map((d, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 12, fontFamily: Fn, fontWeight: 500, color: T.text, width: 80, textAlign: "right" }}>{d.stage}</span>
            <div style={{ flex: 1, height: 20, background: T.pillBg, borderRadius: 6, overflow: "hidden", position: "relative" }}>
              <div style={{
                height: "100%", borderRadius: 6,
                background: d.chinaShare > 90 ? T.capRed : solar,
                width: `${d.chinaShare}%`, transition: "width 0.8s ease", opacity: 0.65,
              }} />
            </div>
            <span style={{ fontSize: 12, fontFamily: Fn, fontWeight: 700, color: d.chinaShare > 90 ? T.capRed : solar, width: 36 }}>{d.chinaShare}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Investment H1 2025 Bar Chart ─── */
function InvestmentChart({ data, T }) {
  const max = 280;
  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>H1 2025 clean energy investment ($B)</div>
      <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 16 }}>Solar attracts exactly double the investment of wind — the largest single energy investment category globally</div>
      <div style={{ display: "grid", gap: 8 }}>
        {data.map((d, i) => {
          const colors = [solar, T.deepBlue, T.green, T.grey400];
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 12, fontFamily: Fn, fontWeight: 500, color: T.text, width: 70, textAlign: "right" }}>{d.source}</span>
              <div style={{ flex: 1, height: 22, background: T.pillBg, borderRadius: 6, overflow: "hidden" }}>
                <div style={{
                  height: "100%", borderRadius: 6, background: colors[i], opacity: 0.6,
                  width: `${(d.h1_2025 / max) * 100}%`, transition: "width 0.8s",
                }} />
              </div>
              <span style={{ fontSize: 12, fontFamily: Fn, fontWeight: 700, color: colors[i], width: 44 }}>${d.h1_2025}B</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function ResearchSolar({ T }) {
  const colorMap = { orange: T.orange || solar, capRed: T.capRed, deepBlue: T.deepBlue, green: T.green, grey400: T.grey400 };
  const bgMap = { orange: solarBg, capRed: T.redBg, deepBlue: "rgba(29,78,216,0.08)", green: T.greenBg };

  const sections = [
    { id: "scale", num: "01", label: "Market Scale" },
    { id: "demand", num: "02", label: "Demand Drivers" },
    { id: "headwinds", num: "03", label: "Headwinds" },
    { id: "competitive", num: "04", label: "vs Alternatives" },
    { id: "technology", num: "05", label: "Technology" },
    { id: "supply", num: "06", label: "Supply Chain" },
    { id: "regional", num: "07", label: "Regional" },
    { id: "companies", num: "08", label: "Companies" },
    { id: "debates", num: "09", label: "Key Debates" },
    { id: "conclusion", num: "10", label: "Conclusion" },
  ];

  const scrollTo = id => {
    const el = document.getElementById("solar-" + id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      {/* ─── Header ─── */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <Pill T={T} color={solar} bg={solarBg}>INDUSTRY RESEARCH</Pill>
          <Pill T={T}>Renewables / Energy</Pill>
          <Pill T={T}>April 2026</Pill>
        </div>
        <h1 style={{ fontFamily: Fn, fontSize: 32, fontWeight: 300, letterSpacing: "-0.03em", color: T.text, margin: 0, lineHeight: 1.3 }}>
          Global Solar Energy
        </h1>
        <p style={{ fontSize: 14, color: T.textSec, marginTop: 10, fontFamily: Fn, lineHeight: 1.7, maxWidth: 740 }}>
          Solar PV has crossed from insurgent technology to dominant force in global electricity markets. Cumulative installed capacity reached ~2,900 GW by end-2025 — nearly tripling in three years — with solar now generating ~8-9% of the world's electricity. Yet a historic Chinese overcapacity crisis has crushed margins across the value chain, a US policy rollback threatens the largest subsidy framework in solar history, and the first year-over-year installation decline is forecast for 2026. For equity investors, the sector presents a sharply bifurcated landscape.
        </p>
      </div>

      {/* ─── Snapshot strip ─── */}
      <Card T={T} style={{ marginBottom: 24, padding: "20px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: T.textTer, fontFamily: Fn, letterSpacing: "0.05em" }}>SOLAR PV</span>
            <span style={{ fontSize: 28, fontWeight: 300, fontFamily: Fn, color: T.text }}>~2,900 GW</span>
            <Pill T={T} color={T.green} bg={T.greenBg}>8.8% of global electricity</Pill>
          </div>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {[
              { l: "Annual adds", v: "655 GW" },
              { l: "Investment", v: "$450B+/yr" },
              { l: "CN module ASP", v: "$0.087/W" },
              { l: "US module ASP", v: "$0.27/W" },
            ].map((m, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: solar, fontFamily: Fn }}>{m.v}</div>
                <div style={{ fontSize: 9, color: T.textTer, fontFamily: Fn, letterSpacing: "0.05em", marginTop: 2 }}>{m.l}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* ─── Hero stats ─── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10, marginBottom: 32 }}>
        {heroStats.map((s, i) => (
          <div key={i} style={{
            background: T.card, border: "1px solid " + T.border, borderRadius: T.radius,
            padding: "16px 14px", textAlign: "center", boxShadow: T.shadow,
          }}>
            <div style={{ fontSize: 22, fontWeight: 300, fontFamily: Fn, color: colorMap[s.color] || T.text, lineHeight: 1.2 }}>
              {s.value}{s.unit && <span style={{ fontSize: 12, fontWeight: 400, marginLeft: 2 }}>{s.unit}</span>}
            </div>
            <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 6, lineHeight: 1.4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ─── Section Navigator ─── */}
      <Card T={T} style={{ marginBottom: 32, padding: "16px 20px" }}>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {sections.map(s => (
            <button key={s.id} onClick={() => scrollTo(s.id)} style={{
              background: T.pillBg, border: "1px solid " + T.border, borderRadius: T.radiusSm,
              padding: "8px 14px", fontSize: 11, fontFamily: Fn, color: T.textSec,
              cursor: "pointer", transition: "all 0.15s", display: "flex", alignItems: "center", gap: 6,
            }}
              onMouseEnter={e => { e.currentTarget.style.background = solarBg; e.currentTarget.style.borderColor = solar + "40"; e.currentTarget.style.color = solar; }}
              onMouseLeave={e => { e.currentTarget.style.background = T.pillBg; e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.textSec; }}>
              <span style={{ fontWeight: 700, fontSize: 9, color: T.textTer }}>{s.num}</span>
              {s.label}
            </button>
          ))}
        </div>
      </Card>

      {/* ═══════════════════════════════════════════════════════════
         SECTION 1: MARKET SCALE
         ═══════════════════════════════════════════════════════════ */}
      <Section id="scale">
        <div style={{ marginBottom: 48 }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 6, fontWeight: 600 }}>01 · MARKET SCALE</div>
            <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, lineHeight: 1.3 }}>The market has scaled faster than any power source in history</h2>
          </div>

          <Card T={T} style={{ padding: "24px 28px", marginBottom: 16 }}>
            <CapacityChart data={capacityGrowthData} T={T} />
          </Card>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <Card T={T} style={{ padding: "24px 28px" }}>
              <InstallationsChart data={capacityGrowthData} T={T} />
            </Card>
            <Card T={T} style={{ padding: "24px 28px" }}>
              <GenerationChart data={generationData} T={T} />
            </Card>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
            <Card T={T} style={{ padding: "24px 28px" }}>
              <PieChart data={regionalCapacity} T={T} colorMap={colorMap}
                title="Cumulative capacity by region"
                subtitle="China controls 41% of global installed capacity — more than the US, EU, and India combined" />
            </Card>
            <Card T={T} style={{ padding: "24px 28px" }}>
              <PieChart data={segmentSplit} T={T} colorMap={colorMap}
                title="Installation segment split (2024)"
                subtitle="Utility-scale dominates at 62%; residential is under structural pressure" />
            </Card>
          </div>

          {marketScaleParagraphs.map((p, i) => (
            <p key={i} style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, maxWidth: 740, marginBottom: 12 }}>{p}</p>
          ))}

          <Expandable title="Forward installation forecasts (BNEF, SolarPower Europe)" T={T}>
            <DataTable T={T} highlightCol={1}
              headers={["Year", "Installations (GW)", "Source"]}
              rows={[
                ["2025", "647-655 GW", "Ember / BNEF"],
                ["2026E", "649 GW (first YoY decline)", "BNEF"],
                ["2027E", "688 GW", "BNEF"],
                ["2028E", "743 GW", "BNEF"],
                ["2029E", "930 GW", "SolarPower Europe (medium)"],
              ]}
            />
          </Expandable>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════
         SECTION 2: DEMAND DRIVERS
         ═══════════════════════════════════════════════════════════ */}
      <Section id="demand">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 6, fontWeight: 600 }}>02 · DEMAND DRIVERS</div>
            <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, lineHeight: 1.3 }}>Demand drivers remain powerful but are shifting in character</h2>
          </div>

          <div style={{ display: "grid", gap: 16, marginBottom: 24 }}>
            {demandDrivers.map((driver, di) => (
              <Card key={di} T={T} style={{ padding: "24px 28px", borderLeft: `3px solid ${colorMap[driver.tagColor] || solar}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <span style={{ fontSize: 16, fontWeight: 500, color: T.text, fontFamily: Fn }}>{driver.title}</span>
                  <Pill T={T} color={colorMap[driver.tagColor]} bg={bgMap[driver.tagColor]}>{driver.tag}</Pill>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 16 }}>
                  {driver.keyFacts.map((f, i) => (
                    <div key={i} style={{ background: T.bg, borderRadius: T.radiusSm, padding: "12px 14px", border: "1px solid " + T.border }}>
                      <div style={{ fontSize: 16, fontWeight: 300, color: colorMap[driver.tagColor] || T.text, fontFamily: Fn }}>{f.value}</div>
                      <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 4, lineHeight: 1.3 }}>{f.label}</div>
                    </div>
                  ))}
                </div>
                {driver.paragraphs.map((p, i) => (
                  <p key={i} style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, margin: "0 0 8px", maxWidth: 740 }}>{p}</p>
                ))}
              </Card>
            ))}
          </div>

          <Expandable title="Global policy landscape comparison" T={T}>
            <DataTable T={T} highlightCol={2}
              headers={["Region", "Key Policy", "Target / Mandate", "Current Status"]}
              rows={policyComparison.map(r => [r.region, r.policy, r.target, r.status])}
            />
          </Expandable>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════
         SECTION 3: HEADWINDS
         ═══════════════════════════════════════════════════════════ */}
      <Section id="headwinds">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 6, fontWeight: 600 }}>03 · HEADWINDS</div>
            <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, lineHeight: 1.3 }}>Headwinds are real, concentrated, and increasingly political</h2>
          </div>

          {/* Headwind metrics grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 24 }}>
            {headwindMetrics.map((m, i) => (
              <div key={i} style={{
                background: T.card, border: "1px solid " + T.border, borderRadius: T.radius,
                padding: "18px 16px", boxShadow: T.shadow, borderTop: `3px solid ${colorMap[m.color]}`,
              }}>
                <div style={{ fontSize: 20, fontWeight: 300, color: colorMap[m.color], fontFamily: Fn }}>{m.value}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: T.text, fontFamily: Fn, marginTop: 4 }}>{m.label}</div>
                <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 4, lineHeight: 1.4 }}>{m.detail}</div>
              </div>
            ))}
          </div>

          <Expandable title="US AD/CVD tariff rates on Southeast Asian solar" defaultOpen T={T}>
            <DataTable T={T} highlightCol={1}
              headers={["Country", "AD/CVD Rate", "Status"]}
              rows={tariffData.map(r => [r.country, r.rate, r.status])}
            />
            <p style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, marginTop: 10, lineHeight: 1.6 }}>
              Reciprocal tariffs of 10-46% stack on top. US module prices now roughly 3x global levels at $0.25-0.28/W versus Chinese FOB of $0.087/W.
            </p>
          </Expandable>

          {/* NEM impact */}
          <Card T={T} style={{ padding: "24px 28px", marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 16 }}>{nemImpact.title}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div style={{ background: T.greenBg, borderRadius: T.radiusSm, padding: "16px 20px", border: "1px solid " + T.green + "30" }}>
                <div style={{ fontSize: 10, color: T.green, fontFamily: Fn, fontWeight: 600, marginBottom: 8, letterSpacing: "0.1em" }}>BEFORE NEM 3.0</div>
                <div style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.7 }}>
                  Payback: <strong style={{ color: T.green }}>{nemImpact.before.payback}</strong> · Export: <strong style={{ color: T.green }}>{nemImpact.before.exportComp}</strong> · Battery: {nemImpact.before.batteryRate}
                </div>
              </div>
              <div style={{ background: T.redBg, borderRadius: T.radiusSm, padding: "16px 20px", border: "1px solid " + T.capRed + "30" }}>
                <div style={{ fontSize: 10, color: T.capRed, fontFamily: Fn, fontWeight: 600, marginBottom: 8, letterSpacing: "0.1em" }}>AFTER NEM 3.0</div>
                <div style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.7 }}>
                  Payback: <strong style={{ color: T.capRed }}>{nemImpact.after.payback}</strong> · Export: <strong style={{ color: T.capRed }}>{nemImpact.after.exportComp}</strong> · Battery: {nemImpact.after.batteryRate}
                </div>
              </div>
            </div>
            {nemImpact.paragraphs.map((p, i) => (
              <p key={i} style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, margin: "0 0 10px", maxWidth: 740 }}>{p}</p>
            ))}
          </Card>

          <Card T={T} style={{ padding: "24px 28px", marginBottom: 16 }}>
            <ConcentrationChart data={supplyChainConcentration} T={T} />
          </Card>

          {headwindsParagraphs.map((p, i) => (
            <p key={i} style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, maxWidth: 740, marginBottom: 12 }}>{p}</p>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════
         SECTION 4: COMPETITIVE POSITIONING
         ═══════════════════════════════════════════════════════════ */}
      <Section id="competitive">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 6, fontWeight: 600 }}>04 · COMPETITIVE POSITIONING</div>
            <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, lineHeight: 1.3 }}>Solar is gaining share against every alternative at an accelerating rate</h2>
          </div>

          <Card T={T} style={{ padding: "24px 28px", marginBottom: 16 }}>
            <InvestmentChart data={investmentComparison} T={T} />
          </Card>

          <Expandable title="LCOE comparison across power generation technologies" defaultOpen T={T}>
            <DataTable T={T} highlightCol={1}
              headers={["Technology", "LCOE ($/MWh)", "H1 2025 Investment", "Trend", "Commentary"]}
              rows={solarVsAlternatives.map(r => [r.source, r.lcoe, r.investment, r.trend, r.note])}
            />
          </Expandable>

          {competitiveParagraphs.map((p, i) => (
            <p key={i} style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, maxWidth: 740, marginBottom: 12 }}>{p}</p>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════
         SECTION 5: TECHNOLOGY
         ═══════════════════════════════════════════════════════════ */}
      <Section id="technology">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 6, fontWeight: 600 }}>05 · TECHNOLOGY</div>
            <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, lineHeight: 1.3 }}>Technology is shifting rapidly from PERC to TOPCon, with perovskite on the horizon</h2>
          </div>

          <Card T={T} style={{ padding: "24px 28px", marginBottom: 16 }}>
            <TechStackChart data={techMarketShare} T={T} />
          </Card>

          <Expandable title="Cell technology efficiency records" defaultOpen T={T}>
            <DataTable T={T} highlightCol={2}
              headers={["Technology", "Commercial range", "Record efficiency", "Record holder", "Notes"]}
              rows={efficiencyRecords.map(r => [r.tech, r.efficiency, r.record, r.holder, r.note])}
            />
          </Expandable>

          {technologyParagraphs.map((p, i) => (
            <p key={i} style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, maxWidth: 740, marginBottom: 12 }}>{p}</p>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════
         SECTION 6: SUPPLY CHAIN CRISIS
         ═══════════════════════════════════════════════════════════ */}
      <Section id="supply">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 6, fontWeight: 600 }}>06 · SUPPLY CHAIN CRISIS</div>
            <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, lineHeight: 1.3 }}>The supply chain is in a historic overcapacity crisis</h2>
          </div>

          <Card T={T} style={{ padding: "24px 28px", marginBottom: 16 }}>
            <OvercapacityChart data={overcapacityVisual} T={T} />
          </Card>

          <Card T={T} style={{ padding: "24px 28px", marginBottom: 16 }}>
            <ASPChart data={moduleASPData} T={T} />
          </Card>

          <Card T={T} style={{ padding: "24px 28px", marginBottom: 16 }}>
            <MarginChart data={marginComparisonData} T={T} />
          </Card>

          <Expandable title="Value chain overcapacity — detailed breakdown" T={T}>
            <DataTable T={T} highlightCol={3}
              headers={["Stage", "Nameplate capacity", "Demand", "Overcapacity ratio", "Utilization"]}
              rows={overcapacityTable.map(r => [r.stage, r.capacity, r.demand, r.ratio, r.utilization])}
            />
          </Expandable>

          <Expandable title="Chinese manufacturer financial losses" T={T}>
            <DataTable T={T} highlightCol={2}
              headers={["Company", "H1 2025 loss (est.)", "FY2025E", "Gross margin"]}
              rows={[
                ["JinkoSolar", "-$350M (est.)", "~-$940M", "~0-3%"],
                ["LONGi", "-$580M (est.)", "RMB -6.0-6.5B (~-$860M)", "Negative"],
                ["Trina Solar", "-$300M (est.)", "TBD", "~2-5%"],
                ["JA Solar", "-$310M (est.)", "TBD", "~1-4%"],
                ["Daqo (polysilicon)", "Deep loss", "N/A", "-65.8%"],
              ]}
            />
          </Expandable>

          {supplyChainParagraphs.map((p, i) => (
            <p key={i} style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, maxWidth: 740, marginBottom: 12 }}>{p}</p>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════
         SECTION 7: REGIONAL DYNAMICS
         ═══════════════════════════════════════════════════════════ */}
      <Section id="regional">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 6, fontWeight: 600 }}>07 · REGIONAL DYNAMICS</div>
            <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, lineHeight: 1.3 }}>Regional dynamics diverge sharply</h2>
          </div>

          <div style={{ display: "grid", gap: 16 }}>
            {regionalDetails.map((reg, ri) => (
              <Card key={ri} T={T} style={{ padding: "24px 28px", borderLeft: `3px solid ${colorMap[reg.color]}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <span style={{ fontSize: 18, fontWeight: 400, color: T.text, fontFamily: Fn }}>{reg.region}</span>
                  <Pill T={T} color={colorMap[reg.color]} bg={bgMap[reg.color]}>{reg.highlight}</Pill>
                  <span style={{ marginLeft: "auto", fontSize: 22, fontWeight: 300, color: colorMap[reg.color], fontFamily: Fn }}>{reg.cumulative}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 16 }}>
                  {reg.keyMetrics.map((m, mi) => (
                    <div key={mi} style={{ background: T.bg, borderRadius: T.radiusSm, padding: "12px 14px", border: "1px solid " + T.border }}>
                      <div style={{ fontSize: 16, fontWeight: 300, color: colorMap[reg.color], fontFamily: Fn }}>{m.value}</div>
                      <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 4, lineHeight: 1.3 }}>{m.label}</div>
                    </div>
                  ))}
                </div>
                {reg.paragraphs.map((p, pi) => (
                  <p key={pi} style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, margin: "0 0 8px", maxWidth: 740 }}>{p}</p>
                ))}
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════
         SECTION 8: LISTED COMPANIES
         ═══════════════════════════════════════════════════════════ */}
      <Section id="companies">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 6, fontWeight: 600 }}>08 · LISTED COMPANIES</div>
            <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, lineHeight: 1.3 }}>The listed company landscape is bifurcated between Western quality and Chinese commodity</h2>
          </div>

          {companyProfiles.map((seg, si) => (
            <div key={si} style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: T.textTer, fontFamily: Fn, letterSpacing: "0.1em", marginBottom: 12, textTransform: "uppercase" }}>{seg.segment}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 12 }}>
                {seg.companies.map((c, ci) => (
                  <div key={ci} style={{
                    background: T.card, border: "1px solid " + T.border, borderRadius: T.radius,
                    padding: "20px 20px", boxShadow: T.shadow, borderTop: `3px solid ${colorMap[c.color]}`,
                  }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 10 }}>
                      <span style={{ fontSize: 15, fontWeight: 500, color: T.text, fontFamily: Fn }}>{c.name}</span>
                      <span style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, fontWeight: 600 }}>{c.ticker}</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 10 }}>
                      <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn }}>Gross margin: <span style={{ fontWeight: 600, color: colorMap[c.color] }}>{c.grossMargin}</span></div>
                      <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn }}>Revenue: <span style={{ fontWeight: 600, color: T.textSec }}>{c.revenue}</span></div>
                    </div>
                    <p style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.6, margin: 0 }}>{c.moat}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {companyParagraphs.map((p, i) => (
            <p key={i} style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, maxWidth: 740, marginBottom: 12 }}>{p}</p>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════
         SECTION 9: KEY DEBATES
         ═══════════════════════════════════════════════════════════ */}
      <Section id="debates">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 6, fontWeight: 600 }}>09 · KEY DEBATES</div>
            <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, lineHeight: 1.3 }}>Five key debates where variant perception creates opportunity</h2>
          </div>

          <div style={{ display: "grid", gap: 16 }}>
            {keyDebates.map((d, di) => (
              <Expandable key={di} title={d.question} defaultOpen={di === 0} T={T}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                  <div style={{ background: T.redBg, borderRadius: T.radiusSm, padding: "16px 18px", border: "1px solid " + T.capRed + "20" }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: T.capRed, fontFamily: Fn, letterSpacing: "0.1em", marginBottom: 6 }}>BEAR CASE</div>
                    <p style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, margin: 0 }}>{d.bear}</p>
                  </div>
                  <div style={{ background: T.greenBg, borderRadius: T.radiusSm, padding: "16px 18px", border: "1px solid " + T.green + "20" }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: T.green, fontFamily: Fn, letterSpacing: "0.1em", marginBottom: 6 }}>BULL CASE</div>
                    <p style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, margin: 0 }}>{d.bull}</p>
                  </div>
                </div>
                <div style={{ background: solarBg, borderRadius: T.radiusSm, padding: "14px 18px", border: "1px solid " + solar + "25", display: "flex", alignItems: "center", gap: 12 }}>
                  <Pill T={T} color={solar} bg={solarBgStrong}>{d.lean}</Pill>
                  <span style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.6 }}>{d.view}</span>
                </div>
              </Expandable>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════
         SECTION 10: CONCLUSION
         ═══════════════════════════════════════════════════════════ */}
      <Section id="conclusion">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 6, fontWeight: 600 }}>10 · INVESTMENT CONCLUSIONS</div>
            <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, lineHeight: 1.3 }}>Where quality-oriented investors should focus</h2>
          </div>

          {/* Moat segments */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
            {moatSegments.map((m, i) => (
              <div key={i} style={{
                background: T.card, border: "1px solid " + T.border, borderRadius: T.radius,
                padding: "20px 20px", boxShadow: T.shadow, borderTop: `3px solid ${colorMap[m.color]}`,
              }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 8 }}>{m.area}</div>
                <p style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 12px" }}>{m.description}</p>
                <div style={{ display: "flex", gap: 6 }}>
                  {m.companies.map((c, ci) => (
                    <Pill key={ci} T={T} color={colorMap[m.color]} bg={bgMap[m.color]}>{c}</Pill>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Top picks */}
          <Card T={T} style={{ padding: "24px 28px", marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 16 }}>Recommended positioning for quality-oriented, long-only global large-cap portfolios</div>
            <div style={{ display: "grid", gap: 12 }}>
              {topPicks.map((p, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 16, padding: "14px 18px",
                  background: T.bg, borderRadius: T.radiusSm, border: "1px solid " + T.border,
                }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, minWidth: 160 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: solar, fontFamily: Fn }}>{p.ticker}</span>
                    <span style={{ fontSize: 13, color: T.text, fontFamily: Fn }}>{p.company}</span>
                  </div>
                  <span style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, flex: 1, lineHeight: 1.5 }}>{p.thesis}</span>
                  <Pill T={T} color={p.conviction === "High" ? T.green : T.orange} bg={p.conviction === "High" ? T.greenBg : solarBg}>{p.conviction}</Pill>
                </div>
              ))}
            </div>
          </Card>

          {/* Catalysts timeline */}
          <Card T={T} style={{ padding: "24px 28px", marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 20 }}>Key signposts and catalysts — next 12-18 months</div>
            <div style={{ position: "relative", paddingLeft: 28 }}>
              <div style={{ position: "absolute", left: 8, top: 4, bottom: 4, width: 2, background: T.border, borderRadius: 1 }} />
              {catalysts.map((c, i) => (
                <div key={i} style={{ position: "relative", marginBottom: 20, paddingLeft: 16 }}>
                  <div style={{
                    position: "absolute", left: -22, top: 5, width: 12, height: 12,
                    borderRadius: "50%", background: colorMap[c.color] || solar,
                    border: "2px solid " + T.card, boxShadow: `0 0 0 2px ${(colorMap[c.color] || solar)}40`,
                  }} />
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: T.textTer, fontFamily: Fn, minWidth: 70 }}>{c.date}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn }}>{c.event}</span>
                  </div>
                  <p style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, margin: 0, paddingLeft: 80 }}>{c.detail}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Charts to track */}
          <Expandable title="Five charts every solar analyst should track" T={T}>
            <div style={{ display: "grid", gap: 10 }}>
              {keyCharts.map((c, i) => (
                <div key={i} style={{ display: "flex", gap: 12, padding: "12px 16px", background: T.bg, borderRadius: T.radiusSm, border: "1px solid " + T.border }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: solar, fontFamily: Fn, width: 24, textAlign: "center" }}>{i + 1}</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: Fn }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginTop: 2 }}>{c.why}</div>
                  </div>
                </div>
              ))}
            </div>
          </Expandable>

          {/* Conclusion prose */}
          {conclusionParagraphs.map((p, i) => (
            <p key={i} style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, maxWidth: 740, marginBottom: 12, marginTop: i === 0 ? 20 : 0 }}>{p}</p>
          ))}
        </div>
      </Section>
    </div>
  );
}
