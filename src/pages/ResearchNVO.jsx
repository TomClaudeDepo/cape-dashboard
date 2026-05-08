import { useState, useRef, useEffect, Fragment } from "react";
import { Fn, Fh } from "../theme";
import { Card, Pill } from "../components/shared";
import { useMobile } from "../hooks/useMobile";
import {
  heroStats, topDatapoints, concludingObservations,
  assetMap, quarterlyRevenue, annualRevenue, usShareData, priceDecomp, dtcWalks,
  geoMixNVO, geoMixLLY,
  patentExpiry, indiaGenerics, compoundedTimeline,
  catalysts, efficacyData, indicationReadouts, adjacentThreats,
  capexNVO, capexLLY, pricingPolicy, geoPenetration,
  tamForecasts, financialQuality, valuationSeries,
  usWeeklyTRx, wegovyPillLaunch, wegovyRunRate, usMonthlyTRxLong,
  novoPatientsOnTherapy, obesityValueShare, llyTRxShareOfMarket,
  q1_26GrowthYoY, dataGaps,
} from "../data/research-nvo";

/* ═══════════════════════════════════════════
   CHART: Quarterly Revenue Lines (LLY vs NVO incretin)
   ═══════════════════════════════════════════ */
function RevenueLines({ data, T, height = 280 }) {
  const W = 720, H = height, pad = { t: 20, r: 100, b: 36, l: 50 };
  const w = W - pad.l - pad.r, h = H - pad.t - pad.b;
  const [hov, setHov] = useState(-1);

  // Two series: LLY (Mounjaro+Zepbound), NVO (Oz+Wg+Ryb+Vic)
  const series = data.map(d => ({
    q: d.q,
    lly: d.mounjaro + d.zepbound,
    nvo: d.ozempic + d.wegovy + d.rybelsus + d.victoza,
  }));
  const max = Math.max(...series.map(s => Math.max(s.lly, s.nvo))) * 1.1;
  const xAt = i => pad.l + (w / (series.length - 1)) * i;
  const yAt = v => pad.t + h - (v / max) * h;

  const llyPath = series.map((s, i) => `${i === 0 ? "M" : "L"} ${xAt(i)} ${yAt(s.lly)}`).join(" ");
  const nvoPath = series.map((s, i) => `${i === 0 ? "M" : "L"} ${xAt(i)} ${yAt(s.nvo)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }} onMouseLeave={() => setHov(-1)}>
      {[0, 0.25, 0.5, 0.75, 1].map((f, i) => (
        <g key={i}>
          <line x1={pad.l} x2={W - pad.r} y1={pad.t + h * (1 - f)} y2={pad.t + h * (1 - f)} stroke={T.border} strokeWidth="0.5" />
          <text x={pad.l - 8} y={pad.t + h * (1 - f) + 4} fontSize="9" fill={T.textTer} fontFamily={Fn} textAnchor="end">${(max * f / 1000).toFixed(0)}bn</text>
        </g>
      ))}
      <path d={nvoPath} fill="none" stroke={T.capRed} strokeWidth="2" />
      <path d={llyPath} fill="none" stroke={T.deepBlue} strokeWidth="2" />
      {series.map((s, i) => (
        <g key={i} onMouseEnter={() => setHov(i)} style={{ cursor: "pointer" }}>
          <rect x={xAt(i) - (w / series.length / 2)} y={pad.t} width={w / series.length} height={h} fill="transparent" />
          <circle cx={xAt(i)} cy={yAt(s.lly)} r={hov === i ? 5 : 3} fill={T.deepBlue} />
          <circle cx={xAt(i)} cy={yAt(s.nvo)} r={hov === i ? 5 : 3} fill={T.capRed} />
          {i % 2 === 0 && <text x={xAt(i)} y={H - 12} fontSize="9" fill={T.textTer} fontFamily={Fn} textAnchor="middle">{s.q}</text>}
        </g>
      ))}
      {hov >= 0 && (
        <g>
          <line x1={xAt(hov)} x2={xAt(hov)} y1={pad.t} y2={pad.t + h} stroke={T.textTer} strokeWidth="0.5" strokeDasharray="3,3" />
          <rect x={xAt(hov) + 8} y={pad.t} width={88} height={56} rx={6} fill={T.card} stroke={T.border} />
          <text x={xAt(hov) + 14} y={pad.t + 14} fontSize="10" fill={T.text} fontFamily={Fn} fontWeight="600">{series[hov].q}</text>
          <circle cx={xAt(hov) + 18} cy={pad.t + 28} r={4} fill={T.capRed} />
          <text x={xAt(hov) + 26} y={pad.t + 31} fontSize="9" fill={T.textSec} fontFamily={Fn}>NVO ${(series[hov].nvo / 1000).toFixed(1)}bn</text>
          <circle cx={xAt(hov) + 18} cy={pad.t + 44} r={4} fill={T.deepBlue} />
          <text x={xAt(hov) + 26} y={pad.t + 47} fontSize="9" fill={T.textSec} fontFamily={Fn}>LLY ${(series[hov].lly / 1000).toFixed(1)}bn</text>
        </g>
      )}
      <g>
        <circle cx={W - pad.r + 14} cy={pad.t + 8} r={5} fill={T.capRed} />
        <text x={W - pad.r + 24} y={pad.t + 11} fontSize="10" fill={T.textSec} fontFamily={Fn}>NVO GLP-1</text>
        <circle cx={W - pad.r + 14} cy={pad.t + 24} r={5} fill={T.deepBlue} />
        <text x={W - pad.r + 24} y={pad.t + 27} fontSize="10" fill={T.textSec} fontFamily={Fn}>LLY tirz</text>
      </g>
    </svg>
  );
}

/* ═══════════════════════════════════════════
   CHART: Stacked Area — US TRx Share
   ═══════════════════════════════════════════ */
function ShareArea({ data, T, height = 240 }) {
  const W = 720, H = height, pad = { t: 16, r: 80, b: 32, l: 36 };
  const w = W - pad.l - pad.r, h = H - pad.t - pad.b;
  const [hov, setHov] = useState(-1);
  const xAt = i => pad.l + (w / (data.length - 1)) * i;
  const yAt = v => pad.t + h - (v / 100) * h;

  const llyArea = `M ${pad.l} ${pad.t + h} ` +
    data.map((d, i) => `L ${xAt(i)} ${yAt(d.lly)}`).join(" ") +
    ` L ${xAt(data.length - 1)} ${pad.t + h} Z`;
  const nvoArea = `M ${pad.l} ${pad.t} ` +
    data.map((d, i) => `L ${xAt(i)} ${yAt(d.lly)}`).join(" ") +
    ` L ${xAt(data.length - 1)} ${pad.t} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }} onMouseLeave={() => setHov(-1)}>
      <path d={llyArea} fill={T.deepBlue} opacity="0.85" />
      <path d={nvoArea} fill={T.capRed} opacity="0.85" />
      <line x1={pad.l} x2={W - pad.r} y1={yAt(50)} y2={yAt(50)} stroke="#fff" strokeWidth="1" strokeDasharray="4,4" opacity="0.5" />
      {data.map((d, i) => (
        <g key={i} onMouseEnter={() => setHov(i)} style={{ cursor: "pointer" }}>
          <rect x={xAt(i) - (w / data.length / 2)} y={pad.t} width={w / data.length} height={h} fill="transparent" />
          {i % 2 === 0 && <text x={xAt(i)} y={H - 12} fontSize="9" fill={T.textTer} fontFamily={Fn} textAnchor="middle">{d.q}</text>}
        </g>
      ))}
      {hov >= 0 && (
        <g>
          <line x1={xAt(hov)} x2={xAt(hov)} y1={pad.t} y2={pad.t + h} stroke="#fff" strokeWidth="1" />
          <rect x={Math.min(xAt(hov) + 8, W - 100)} y={pad.t} width={92} height={56} rx={6} fill={T.card} stroke={T.border} />
          <text x={Math.min(xAt(hov) + 14, W - 94)} y={pad.t + 14} fontSize="10" fill={T.text} fontFamily={Fn} fontWeight="600">{data[hov].q}</text>
          <text x={Math.min(xAt(hov) + 14, W - 94)} y={pad.t + 30} fontSize="9" fill={T.textSec} fontFamily={Fn}>LLY {data[hov].lly.toFixed(1)}%</text>
          <text x={Math.min(xAt(hov) + 14, W - 94)} y={pad.t + 46} fontSize="9" fill={T.textSec} fontFamily={Fn}>NVO {data[hov].nvo.toFixed(1)}%</text>
        </g>
      )}
      <g>
        <rect x={W - pad.r + 8} y={pad.t + 4} width={10} height={10} fill={T.deepBlue} opacity="0.85" />
        <text x={W - pad.r + 22} y={pad.t + 13} fontSize="10" fill={T.textSec} fontFamily={Fn}>LLY</text>
        <rect x={W - pad.r + 8} y={pad.t + 22} width={10} height={10} fill={T.capRed} opacity="0.85" />
        <text x={W - pad.r + 22} y={pad.t + 31} fontSize="10" fill={T.textSec} fontFamily={Fn}>NVO</text>
      </g>
    </svg>
  );
}

/* ═══════════════════════════════════════════
   CHART: Paired Bars — Price Decomposition
   ═══════════════════════════════════════════ */
function PriceBars({ data, T, height = 240 }) {
  const W = 720, H = height, pad = { t: 24, r: 20, b: 36, l: 40 };
  const w = W - pad.l - pad.r, h = H - pad.t - pad.b;
  const max = Math.max(...data.flatMap(d => [Math.abs(d.llyUS), Math.abs(d.nvoUS)])) * 1.15;
  const yZero = pad.t + h / 2;
  const yAt = v => yZero - (v / max) * (h / 2);
  const groupW = w / data.length;
  const barW = (groupW - 4) / 2;
  const [hov, setHov] = useState(-1);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }} onMouseLeave={() => setHov(-1)}>
      <line x1={pad.l} x2={W - pad.r} y1={yZero} y2={yZero} stroke={T.text} strokeWidth="0.8" />
      {[-max/2, max/2].map((v, i) => (
        <g key={i}>
          <line x1={pad.l} x2={W - pad.r} y1={yAt(v)} y2={yAt(v)} stroke={T.border} strokeWidth="0.4" strokeDasharray="2,2" />
          <text x={pad.l - 8} y={yAt(v) + 3} fontSize="9" fill={T.textTer} fontFamily={Fn} textAnchor="end">{v > 0 ? "+" : ""}{v.toFixed(0)}%</text>
        </g>
      ))}
      <text x={pad.l - 8} y={yZero + 3} fontSize="9" fill={T.textTer} fontFamily={Fn} textAnchor="end">0</text>
      {data.map((d, i) => {
        const gx = pad.l + groupW * i + 2;
        const llyH = Math.abs(d.llyUS) / max * (h / 2);
        const nvoH = Math.abs(d.nvoUS) / max * (h / 2);
        const llyY = d.llyUS >= 0 ? yZero - llyH : yZero;
        const nvoY = d.nvoUS >= 0 ? yZero - nvoH : yZero;
        return (
          <g key={i} onMouseEnter={() => setHov(i)} style={{ cursor: "pointer" }}>
            <rect x={gx} y={llyY} width={barW} height={llyH} fill={T.deepBlue} opacity={hov === i ? 1 : 0.85} rx={2} />
            <rect x={gx + barW + 2} y={nvoY} width={barW} height={nvoH} fill={T.capRed} opacity={hov === i ? 1 : 0.85} rx={2} />
            <text x={gx + groupW / 2} y={H - 14} fontSize="8" fill={T.textTer} fontFamily={Fn} textAnchor="middle">{d.q}</text>
            {hov === i && (
              <g>
                <text x={gx + barW / 2} y={d.llyUS >= 0 ? llyY - 4 : llyY + llyH + 10} fontSize="8" fill={T.deepBlue} fontFamily={Fn} fontWeight="700" textAnchor="middle">{d.llyUS > 0 ? "+" : ""}{d.llyUS}%</text>
                <text x={gx + barW + 2 + barW / 2} y={d.nvoUS >= 0 ? nvoY - 4 : nvoY + nvoH + 10} fontSize="8" fill={T.capRed} fontFamily={Fn} fontWeight="700" textAnchor="middle">{d.nvoUS > 0 ? "+" : ""}{d.nvoUS}%</text>
              </g>
            )}
          </g>
        );
      })}
      <g>
        <rect x={pad.l} y={pad.t - 18} width={10} height={10} fill={T.deepBlue} />
        <text x={pad.l + 14} y={pad.t - 9} fontSize="10" fill={T.textSec} fontFamily={Fn}>LLY US price YoY</text>
        <rect x={pad.l + 130} y={pad.t - 18} width={10} height={10} fill={T.capRed} />
        <text x={pad.l + 144} y={pad.t - 9} fontSize="10" fill={T.textSec} fontFamily={Fn}>NVO NA Ops CER</text>
      </g>
    </svg>
  );
}

/* ═══════════════════════════════════════════
   CHART: Interactive Pie (geo mix)
   ═══════════════════════════════════════════ */
function PieChart({ data, size = 180, T, label }) {
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
    const path = `M ${cx + dx} ${cy + dy} L ${x1 + dx} ${y1 + dy} A ${r} ${r} 0 ${large} 1 ${x2 + dx} ${y2 + dy} Z`;
    return { ...d, path, i };
  });
  return (
    <div>
      {label && <div style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 10 }}>{label}</div>}
      <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {slices.map(s => (
            <path key={s.i} d={s.path} fill={s.color} stroke={T.card} strokeWidth="2"
              opacity={hov !== null && hov !== s.i ? 0.4 : 1}
              style={{ transition: "all 0.2s", cursor: "pointer" }}
              onMouseEnter={() => setHov(s.i)} onMouseLeave={() => setHov(null)} />
          ))}
          {hov !== null && (
            <g>
              <text x={cx} y={cy - 4} textAnchor="middle" fontSize="18" fontWeight="700" fill={T.text} fontFamily={Fn}>{data[hov].share}%</text>
              <text x={cx} y={cy + 12} textAnchor="middle" fontSize="9" fill={T.textSec} fontFamily={Fn}>{data[hov].name}</text>
            </g>
          )}
        </svg>
        <div style={{ display: "flex", flexDirection: "column", gap: 5, minWidth: 140 }}>
          {data.map((d, i) => (
            <div key={i} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
              style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "3px 6px", borderRadius: 4, background: hov === i ? T.pillBg : "transparent" }}>
              <div style={{ width: 9, height: 9, borderRadius: 2, background: d.color, flexShrink: 0 }} />
              <span style={{ fontSize: 11, color: hov === i ? T.text : T.textSec, fontFamily: Fn, fontWeight: hov === i ? 600 : 400 }}>
                {d.name}: {d.share}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CHART: DTC Price Walks
   ═══════════════════════════════════════════ */
function PriceWalk({ data, T, height = 220 }) {
  const W = 720, H = height, pad = { t: 20, r: 80, b: 36, l: 50 };
  const w = W - pad.l - pad.r, h = H - pad.t - pad.b;
  const allVals = data.flatMap(d => [d.wegovy, d.zepbound]).filter(v => v != null);
  const max = Math.max(...allVals) * 1.1;
  const xAt = i => pad.l + (w / (data.length - 1)) * i;
  const yAt = v => pad.t + h - (v / max) * h;
  const wegPath = data.filter(d => d.wegovy != null).map((d, i, arr) => {
    const idx = data.indexOf(d);
    return `${i === 0 ? "M" : "L"} ${xAt(idx)} ${yAt(d.wegovy)}`;
  }).join(" ");
  const zepPath = data.map((d, i) => `${i === 0 ? "M" : "L"} ${xAt(i)} ${yAt(d.zepbound)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }}>
      {[0, 0.5, 1].map((f, i) => (
        <g key={i}>
          <line x1={pad.l} x2={W - pad.r} y1={pad.t + h * (1 - f)} y2={pad.t + h * (1 - f)} stroke={T.border} strokeWidth="0.5" />
          <text x={pad.l - 8} y={pad.t + h * (1 - f) + 4} fontSize="9" fill={T.textTer} fontFamily={Fn} textAnchor="end">${(max * f).toFixed(0)}</text>
        </g>
      ))}
      <path d={wegPath} fill="none" stroke={T.capRed} strokeWidth="2" />
      <path d={zepPath} fill="none" stroke={T.deepBlue} strokeWidth="2" />
      {data.map((d, i) => (
        <g key={i}>
          {d.wegovy != null && <circle cx={xAt(i)} cy={yAt(d.wegovy)} r={3} fill={T.capRed} />}
          <circle cx={xAt(i)} cy={yAt(d.zepbound)} r={3} fill={T.deepBlue} />
          <text x={xAt(i)} y={H - 16} fontSize="9" fill={T.textTer} fontFamily={Fn} textAnchor="middle">{d.date}</text>
        </g>
      ))}
      <g>
        <circle cx={W - pad.r + 14} cy={pad.t + 8} r={5} fill={T.capRed} />
        <text x={W - pad.r + 24} y={pad.t + 11} fontSize="10" fill={T.textSec} fontFamily={Fn}>Wegovy</text>
        <circle cx={W - pad.r + 14} cy={pad.t + 24} r={5} fill={T.deepBlue} />
        <text x={W - pad.r + 24} y={pad.t + 27} fontSize="10" fill={T.textSec} fontFamily={Fn}>Zepbound</text>
      </g>
    </svg>
  );
}

/* ═══════════════════════════════════════════
   CHART: Efficacy Bars (horizontal, sorted)
   ═══════════════════════════════════════════ */
function EfficacyBars({ data, T }) {
  const max = Math.max(...data.map(d => d.weightLoss)) * 1.05;
  const colorMap = { LLY: T.deepBlue, NVO: T.capRed, AMGN: T.purple, "BI/Zea": T.orange, VKTX: T.green, ALT: T.green300, Innovent: T.purple };
  return (
    <div>
      {data.map((d, i) => {
        const c = colorMap[d.company] || T.textSec;
        return (
          <div key={i} style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
              <span style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, flex: 1 }}>{d.drug}</span>
              <span style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginRight: 8 }}>{d.trial}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: c, fontFamily: Fn, fontFeatureSettings: '"tnum"', minWidth: 48, textAlign: "right" }}>−{d.weightLoss}%</span>
            </div>
            <div style={{ height: 8, background: T.pillBg, borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 3, background: c, width: (d.weightLoss / max * 100) + "%", transition: "width 0.8s ease" }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════
   CHART: Catalyst Gantt
   ═══════════════════════════════════════════ */
function CatalystGantt({ data, T }) {
  const quarters = [...new Set(data.map(d => d.quarter))].sort();
  const companyColors = { NVO: T.capRed, LLY: T.deepBlue, AMGN: T.purple, VKTX: T.green, "BI/Zealand": T.orange, "PFE/Metsera": T.green300, AZN: T.purple, ALT: T.green };
  return (
    <div style={{ display: "grid", gridTemplateColumns: `100px repeat(${quarters.length}, 1fr)`, gap: 4, marginTop: 8 }}>
      <div></div>
      {quarters.map(q => (
        <div key={q} style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, textAlign: "center", padding: "4px 0", borderBottom: "1px solid " + T.border, fontWeight: 600 }}>{q}</div>
      ))}
      {data.map((c, i) => {
        const qIdx = quarters.indexOf(c.quarter);
        return (
          <Fragment key={i}>
            <div style={{ fontSize: 10, color: T.textSec, fontFamily: Fn, padding: "5px 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.asset}</div>
            {quarters.map((q, qi) => (
              <div key={qi} style={{ padding: "3px 2px" }}>
                {qi === qIdx && (
                  <div style={{
                    background: companyColors[c.company] || T.textSec,
                    opacity: c.impact === "high" ? 1 : c.impact === "medium" ? 0.7 : 0.45,
                    color: "#fff", padding: "4px 6px", borderRadius: 4, fontSize: 9,
                    fontFamily: Fn, fontWeight: 500, textAlign: "center",
                    overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis",
                  }} title={c.event}>{c.event}</div>
                )}
              </div>
            ))}
          </Fragment>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════
   CHART: Capex Bars (NVO + LLY)
   ═══════════════════════════════════════════ */
function CapexBars({ items, color, T, total }) {
  const max = Math.max(...items.map(i => i.investment)) * 1.05;
  return (
    <div>
      <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 12 }}>Total announced: <span style={{ color: T.text, fontWeight: 600 }}>${total.toFixed(1)}bn</span></div>
      {items.map((it, i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 3 }}>
            <span style={{ fontSize: 11, color: T.textSec, fontFamily: Fn }}>{it.site}</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: color, fontFamily: Fn, fontFeatureSettings: '"tnum"' }}>${it.investment.toFixed(1)}bn</span>
          </div>
          <div style={{ height: 6, background: T.pillBg, borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 3, background: color, width: (it.investment / max * 100) + "%", transition: "width 0.8s ease" }} />
          </div>
          <div style={{ fontSize: 9, color: T.textTer, fontFamily: Fn, marginTop: 2 }}>{it.type} · {it.year}</div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   CHART: Forward P/E Re-Rating Line
   ═══════════════════════════════════════════ */
function ValuationLine({ data, T, height = 240 }) {
  const W = 720, H = height, pad = { t: 20, r: 80, b: 36, l: 40 };
  const w = W - pad.l - pad.r, h = H - pad.t - pad.b;
  const max = 65;
  const xAt = i => pad.l + (w / (data.length - 1)) * i;
  const yAt = v => pad.t + h - (v / max) * h;
  const nvoPath = data.map((d, i) => `${i === 0 ? "M" : "L"} ${xAt(i)} ${yAt(d.nvoFwdPE)}`).join(" ");
  const llyPath = data.map((d, i) => `${i === 0 ? "M" : "L"} ${xAt(i)} ${yAt(d.llyFwdPE)}`).join(" ");
  const sectorPath = data.map((d, i) => `${i === 0 ? "M" : "L"} ${xAt(i)} ${yAt(17)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }}>
      {[0, 0.25, 0.5, 0.75, 1].map((f, i) => (
        <g key={i}>
          <line x1={pad.l} x2={W - pad.r} y1={pad.t + h * (1 - f)} y2={pad.t + h * (1 - f)} stroke={T.border} strokeWidth="0.5" />
          <text x={pad.l - 8} y={pad.t + h * (1 - f) + 4} fontSize="9" fill={T.textTer} fontFamily={Fn} textAnchor="end">{(max * f).toFixed(0)}x</text>
        </g>
      ))}
      <path d={sectorPath} fill="none" stroke={T.textTer} strokeWidth="1" strokeDasharray="3,3" />
      <path d={llyPath} fill="none" stroke={T.deepBlue} strokeWidth="2" />
      <path d={nvoPath} fill="none" stroke={T.capRed} strokeWidth="2" />
      {data.map((d, i) => (
        <g key={i}>
          <circle cx={xAt(i)} cy={yAt(d.llyFwdPE)} r={3} fill={T.deepBlue} />
          <circle cx={xAt(i)} cy={yAt(d.nvoFwdPE)} r={3} fill={T.capRed} />
          {i % 2 === 0 && <text x={xAt(i)} y={H - 14} fontSize="9" fill={T.textTer} fontFamily={Fn} textAnchor="middle">{d.q}</text>}
        </g>
      ))}
      <g>
        <circle cx={W - pad.r + 14} cy={pad.t + 8} r={5} fill={T.capRed} />
        <text x={W - pad.r + 24} y={pad.t + 11} fontSize="10" fill={T.textSec} fontFamily={Fn}>NVO</text>
        <circle cx={W - pad.r + 14} cy={pad.t + 24} r={5} fill={T.deepBlue} />
        <text x={W - pad.r + 24} y={pad.t + 27} fontSize="10" fill={T.textSec} fontFamily={Fn}>LLY</text>
        <line x1={W - pad.r + 9} x2={W - pad.r + 19} y1={pad.t + 40} y2={pad.t + 40} stroke={T.textTer} strokeDasharray="2,2" />
        <text x={W - pad.r + 24} y={pad.t + 43} fontSize="10" fill={T.textSec} fontFamily={Fn}>Sector</text>
      </g>
    </svg>
  );
}

/* ═══════════════════════════════════════════
   CHART: TAM Range Forecasts
   ═══════════════════════════════════════════ */
function TamRange({ data, T }) {
  const max = Math.max(...data.map(d => d.year2030)) * 1.05;
  return (
    <div>
      {data.map((d, i) => (
        <div key={i} style={{ marginBottom: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 3 }}>
            <span style={{ fontSize: 11, color: T.textSec, fontFamily: Fn }}>{d.bank}</span>
            <span style={{ fontSize: 10, color: T.textTer, fontFamily: Fn }}>{d.scope}</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: T.text, fontFamily: Fn, fontFeatureSettings: '"tnum"', minWidth: 60, textAlign: "right" }}>${d.year2030}bn</span>
          </div>
          <div style={{ height: 6, background: T.pillBg, borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 3, background: T.deepBlue, width: (d.year2030 / max * 100) + "%", transition: "width 0.8s ease" }} />
          </div>
          <div style={{ fontSize: 9, color: T.textTer, fontFamily: Fn, marginTop: 2 }}>{d.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   CHART: Generic multi-series line (handles sparse / null gaps)
   ═══════════════════════════════════════════ */
function MultiLine({ data, xKey, series, T, height = 260, yMax = null, yFormat = v => v.toLocaleString(), xLabelEvery = 1, yLabel = null }) {
  const W = 720, H = height, pad = { t: 24, r: 110, b: 40, l: 64 };
  const w = W - pad.l - pad.r, h = H - pad.t - pad.b;
  const [hov, setHov] = useState(-1);
  // Auto-scale Y unless given
  const allVals = series.flatMap(s => data.map(d => d[s.key]).filter(v => v != null));
  const max = yMax != null ? yMax : Math.max(...allVals) * 1.1;
  const xAt = i => pad.l + (w / Math.max(1, data.length - 1)) * i;
  const yAt = v => pad.t + h - (v / max) * h;

  // Build path that breaks across nulls
  const buildPath = (key) => {
    let path = "";
    let started = false;
    data.forEach((d, i) => {
      const v = d[key];
      if (v == null) { started = false; return; }
      path += (started ? " L " : " M ") + xAt(i) + " " + yAt(v);
      started = true;
    });
    return path.trim();
  };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }} onMouseLeave={() => setHov(-1)}>
      {/* Y gridlines */}
      {[0, 0.25, 0.5, 0.75, 1].map((f, i) => (
        <g key={i}>
          <line x1={pad.l} x2={W - pad.r} y1={pad.t + h * (1 - f)} y2={pad.t + h * (1 - f)} stroke={T.border} strokeWidth="0.5" />
          <text x={pad.l - 8} y={pad.t + h * (1 - f) + 4} fontSize="9" fill={T.textTer} fontFamily={Fn} textAnchor="end" fontFeatureSettings='"tnum"'>{yFormat(max * f)}</text>
        </g>
      ))}
      {yLabel && <text x={pad.l - 52} y={pad.t + h / 2} fontSize="9" fill={T.textTer} fontFamily={Fn} textAnchor="middle" transform={`rotate(-90 ${pad.l - 52} ${pad.t + h / 2})`}>{yLabel}</text>}
      {/* Lines */}
      {series.map(s => (
        <path key={s.key} d={buildPath(s.key)} fill="none" stroke={s.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      ))}
      {/* Points + hover regions */}
      {data.map((d, i) => (
        <g key={i} onMouseEnter={() => setHov(i)} style={{ cursor: "pointer" }}>
          <rect x={xAt(i) - (w / Math.max(1, data.length) / 2)} y={pad.t} width={w / Math.max(1, data.length)} height={h} fill="transparent" />
          {series.map(s => d[s.key] != null && (
            <circle key={s.key} cx={xAt(i)} cy={yAt(d[s.key])} r={hov === i ? 5 : 3} fill={s.color} stroke={T.card} strokeWidth={hov === i ? 1.5 : 0} />
          ))}
          {i % xLabelEvery === 0 && <text x={xAt(i)} y={H - 14} fontSize="9" fill={T.textTer} fontFamily={Fn} textAnchor="middle">{d[xKey]}</text>}
        </g>
      ))}
      {/* Hover tooltip */}
      {hov >= 0 && (() => {
        const visible = series.filter(s => data[hov][s.key] != null);
        const tipW = 130, tipH = 20 + visible.length * 16;
        const tipX = xAt(hov) + 8 + tipW > W - 6 ? xAt(hov) - tipW - 8 : xAt(hov) + 8;
        return (
          <g>
            <line x1={xAt(hov)} x2={xAt(hov)} y1={pad.t} y2={pad.t + h} stroke={T.textTer} strokeWidth="0.5" strokeDasharray="3,3" />
            <rect x={tipX} y={pad.t} width={tipW} height={tipH} rx={6} fill={T.card} stroke={T.border} />
            <text x={tipX + 8} y={pad.t + 14} fontSize="10" fill={T.text} fontFamily={Fn} fontWeight="600">{data[hov][xKey]}</text>
            {visible.map((s, j) => (
              <g key={s.key}>
                <circle cx={tipX + 12} cy={pad.t + 28 + j * 16} r={3.5} fill={s.color} />
                <text x={tipX + 20} y={pad.t + 31 + j * 16} fontSize="9" fill={T.textSec} fontFamily={Fn}>{s.label} {yFormat(data[hov][s.key])}</text>
              </g>
            ))}
          </g>
        );
      })()}
      {/* Legend */}
      <g>
        {series.map((s, i) => (
          <g key={s.key}>
            <line x1={W - pad.r + 8} x2={W - pad.r + 22} y1={pad.t + 8 + i * 16} y2={pad.t + 8 + i * 16} stroke={s.color} strokeWidth="2" />
            <text x={W - pad.r + 28} y={pad.t + 11 + i * 16} fontSize="10" fill={T.textSec} fontFamily={Fn}>{s.label}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

/* ═══════════════════════════════════════════
   TABS
   ═══════════════════════════════════════════ */
function Tabs({ tabs, active, onChange, T }) {
  return (
    <div style={{ display: "flex", gap: 0, borderBottom: "1px solid " + T.border, marginBottom: 28, overflowX: "auto" }}>
      {tabs.map(t => (
        <div key={t} onClick={() => onChange(t)} style={{
          padding: "10px 18px", fontSize: 13, fontFamily: Fn, fontWeight: active === t ? 600 : 400,
          color: active === t ? T.text : T.textTer, cursor: "pointer", whiteSpace: "nowrap",
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
export default function ResearchNVO({ T }) {
  const [tab, setTab] = useState("Thesis");
  const allTabs = ["Thesis", "Prescriptions", "Competition", "Patent Cliff", "Pipeline", "Operations & Financials"];
  const mob = useMobile();

  const colorMap = { orange: T.orange, capRed: T.capRed, deepBlue: T.deepBlue, green: T.green, purple: T.purple };

  /* ─── HEADER ─── */
  const header = (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
        <span style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 36, color: T.text }}>Novo Nordisk</span>
        <span style={{ fontSize: 14, fontWeight: 600, color: T.textTer, fontFamily: Fn, letterSpacing: "0.04em" }}>NVO</span>
        <Pill T={T} color={T.capRed} bg={T.redBg}>Competitive Landscape</Pill>
      </div>
      <div style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, marginBottom: 16 }}>
        NYSE / Copenhagen · Bagsværd, Denmark · The incretin incumbent meeting Lilly, generics, and the MFN price reset
      </div>
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr 1fr" : "repeat(auto-fill, minmax(170px, 1fr))", gap: 10 }}>
        {heroStats.map((s, i) => (
          <div key={i} style={{ background: T.card, borderRadius: T.radiusSm, padding: "14px 16px", border: "1px solid " + T.border }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: colorMap[s.color] || T.text, fontFamily: Fn }}>{s.value}</div>
            <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 3, lineHeight: 1.4 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );

  /* ─── THESIS TAB ─── */
  const thesisTab = (
    <div>
      {/* BLUF */}
      <Card T={T} style={{ padding: "24px 28px", marginBottom: 24, borderLeft: `4px solid ${T.capRed}` }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: T.capRed, fontFamily: Fn, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 8 }}>Bottom Line Up Front</div>
        <p style={{ fontSize: 14, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: 0 }}>
          Lilly overtook Novo in combined incretin franchise revenue in FY2025, with Lilly tirzepatide at ~$36.5bn versus Novo GLP-1 combined at ~$35.0bn. Lilly's US incretin total prescription (TRx) share crossed 60% in Q1-2026 (60.1% versus Novo 39.4%) from ~22% in Q2-2023. Semaglutide composition-of-matter expired in India, Brazil, China and Mexico in March 2026, with roughly 50 Indian generics priced 50 to 92% below Wegovy. Novo's US Operations turned negative on a constant exchange rate basis (−7% Q4'25, −11% Q1'26) as direct-to-consumer self-pay channels collapsed realized prices, and the November 2025 Most-Favored-Nation voluntary deals took Wegovy and Zepbound to ~$245 in Medicare and ~$346 to $350 via TrumpRx. Novo's forward P/E de-rated from ~37x in Q4'23 to ~12x in Q1'26 while Lilly held ~29x.
        </p>
      </Card>

      {/* Top 10 Datapoints */}
      <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 16, letterSpacing: "-0.01em" }}>
        Ten datapoints that re-frame the thesis
      </div>
      <Card T={T} style={{ padding: "16px 20px", overflowX: "auto", marginBottom: 32 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: Fn }}>
          <thead>
            <tr style={{ borderBottom: "2px solid " + T.border }}>
              {["Datapoint", "Value", "Why it's striking", "Variant perception implication"].map(h => (
                <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontSize: 9, color: T.textTer, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {topDatapoints.map((d, i) => (
              <tr key={i} style={{ borderBottom: "1px solid " + T.border }}>
                <td style={{ padding: "12px", fontWeight: 500, color: T.text, verticalAlign: "top", maxWidth: 180 }}>{d.metric}</td>
                <td style={{ padding: "12px", color: T.capRed, fontWeight: 600, verticalAlign: "top", whiteSpace: "nowrap" }}>{d.value}</td>
                <td style={{ padding: "12px", color: T.textSec, lineHeight: 1.6, verticalAlign: "top" }}>{d.striking}</td>
                <td style={{ padding: "12px", color: T.textTer, lineHeight: 1.6, verticalAlign: "top", fontSize: 11 }}>{d.implication}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Concluding Observations */}
      <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 16, letterSpacing: "-0.01em" }}>
        Concluding observations
      </div>
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
        {concludingObservations.map((o, i) => (
          <Card key={i} T={T} style={{ padding: "20px 24px", borderTop: `3px solid ${T.capRed}` }}>
            <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginBottom: 8, fontWeight: 600, letterSpacing: "0.1em" }}>{o.num}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 10, lineHeight: 1.4 }}>{o.title}</div>
            <p style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, margin: 0 }}>{o.body}</p>
          </Card>
        ))}
      </div>

      {/* Methodology note */}
      <Card T={T} style={{ padding: "16px 20px", background: T.bg, border: "1px dashed " + T.border }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: T.textTer, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Methodology &amp; glossary</div>
        <p style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, lineHeight: 1.7, margin: 0 }}>
          Researched against primary sources: SEC EDGAR filings (10-K, 10-Q, 8-K, 6-K, 20-F), ClinicalTrials.gov, FDA Orange Book and shortage list, EMA EPARs, NICE TAs, NEJM/Lancet/JAMA, company press and capital markets day decks. Native units preserved (NVO in DKK, LLY in USD); USD conversions use ECB and Federal Reserve H.10 averages (FY25 6.62 DKK/USD per Novo Q4'25 6-K). Quarterly product splits Q2/Q3/Q4 2022 to 2024 derived by subtraction of cumulative year-to-date figures.
        </p>
        <p style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, lineHeight: 1.7, margin: "10px 0 0" }}>
          <span style={{ fontWeight: 600, color: T.textSec }}>Glossary:</span> AOM anti-obesity medication; T2D type 2 diabetes; CKD chronic kidney disease; MASH metabolic-dysfunction associated steatohepatitis; HFpEF heart failure with preserved ejection fraction; OSA obstructive sleep apnea; CV cardiovascular; TRx total prescription volume; CER constant exchange rate; LoE loss of exclusivity; PDUFA Prescription Drug User Fee Act target action date; NDA New Drug Application; PTE patent term extension; SPC supplementary protection certificate; PI preliminary injunction; DTC direct-to-consumer; PBM pharmacy benefit manager; MFN Most-Favored-Nation; IRA Inflation Reduction Act; CMS Centers for Medicare and Medicaid Services; TPE treatment policy estimand; CVOT cardiovascular outcomes trial; QARP quality at a reasonable price.
        </p>
      </Card>
    </div>
  );

  /* ─── PRESCRIPTIONS TAB ─── */
  const trxColors = {
    mounjaro: T.deepBlue,
    zepbound: T.green,
    wegovy: T.capRed,
    ozempic: T.orange,
    saxenda: T.purple,
    rybelsus: T.green300 || T.green,
    victoza: T.textSec,
  };

  const prescriptionsTab = (
    <div>
      {/* Headline */}
      <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 8, letterSpacing: "-0.01em" }}>
        US weekly TRx — the headline series
      </div>
      <p style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 16px", maxWidth: 760 }}>
        Public anchors for US weekly TRx are sparse — IQVIA NPA is a paid feed and only periodic sell-side excerpts are visible. The chart below stitches together what is in the public domain (BMO, Jefferies, Leerink, JPM, Barclays via @semodough on X) plus Novo's own quarterly run-rate disclosures. The shape is consistent across every available data point: Mounjaro is the largest single weekly script generator in the class by mid-2025, Zepbound is the second largest, and Wegovy injectable is third. Combined Lilly tirzepatide weekly TRx is roughly 3.8x Wegovy alone by W36 2025.
      </p>
      <Card T={T} style={{ padding: "20px 24px", marginBottom: 24 }}>
        <MultiLine
          data={usWeeklyTRx}
          xKey="week"
          yLabel="Weekly TRx"
          yFormat={v => v >= 1000 ? (v / 1000).toFixed(0) + "k" : Math.round(v).toString()}
          series={[
            { key: "mounjaro", label: "Mounjaro", color: trxColors.mounjaro },
            { key: "zepbound", label: "Zepbound", color: trxColors.zepbound },
            { key: "wegovy",   label: "Wegovy inj.", color: trxColors.wegovy },
          ]}
          T={T}
          height={300}
        />
        <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 8, lineHeight: 1.5 }}>
          Sources: BMO / Jefferies / JPM / Leerink / Barclays via IQVIA NPA Weekly excerpts; Novo quarterly run-rate anchors (Q1'24, Q4'24, Q3'25, Q4'25, Q1'26 interim reports). Lines break across missing weeks. Dashboard requires direct IQVIA NPA Weekly subscription for full historical fill.
        </div>
      </Card>

      {/* Wegovy pill launch curve */}
      <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 8, letterSpacing: "-0.01em" }}>
        Wegovy oral pill — US launch curve
      </div>
      <p style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 16px", maxWidth: 760 }}>
        Approved 22 Dec 2025, launched 5 Jan 2026 at $149–$299 NovoCare cash-pay. The launch ramp has been steeper than any GLP-1 launch on record — 3,071 scripts in week one, 18,410 in week two, 26,109 in week three, and tracking to roughly 135,000 weekly scripts by week 17. The trajectory implies the pill is acquiring patients on top of, not just substituting from, the injectable franchise. This is the cleanest near-term Novo offset to the Lilly share momentum, but it competes head-to-head with orforglipron (Foundayo) launched 6 Apr 2026 — a Lilly oral with materially better Phase 3 weight-loss data (12.4% at 36mg / 72wks).
      </p>
      <Card T={T} style={{ padding: "20px 24px", marginBottom: 24 }}>
        <MultiLine
          data={wegovyPillLaunch}
          xKey="week"
          yLabel="Weekly TRx"
          yFormat={v => v >= 1000 ? (v / 1000).toFixed(0) + "k" : Math.round(v).toString()}
          series={[
            { key: "trx", label: "Wegovy pill US TRx", color: T.capRed },
          ]}
          T={T}
          height={240}
        />
      </Card>

      {/* Wegovy run-rate (Novo disclosed) */}
      <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 8, letterSpacing: "-0.01em" }}>
        Wegovy US weekly Rx run-rate — Novo's own disclosure
      </div>
      <p style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 16px", maxWidth: 760 }}>
        Novo discloses an "as of" weekly Wegovy run-rate at every interim report. The shape is informative for two reasons. First, the dip from 270k in Q3 2025 to 230k in late January 2026 reflects the post-CVS Caremark 1 Jul 2025 Wegovy-exclusive boost partially unwinding, alongside seasonal Q1 friction (deductible resets, prior auths). Second, the recovery to 270k in mid-April 2026 plus a fresh 200k weekly run-rate from the new pill takes Wegovy total to roughly 470k weekly scripts — its highest combined figure ever. The pill is additive, but the question for the model is what fraction is genuinely new patients versus injectable cannibalization. CVS Caremark exclusivity is a one-time benefit; ESI and OptumRx did not follow.
      </p>
      <Card T={T} style={{ padding: "20px 24px", marginBottom: 24 }}>
        <MultiLine
          data={wegovyRunRate}
          xKey="period"
          yLabel="Weekly Rx run-rate"
          yFormat={v => v >= 1000 ? (v / 1000).toFixed(0) + "k" : Math.round(v).toString()}
          series={[
            { key: "injectable", label: "Wegovy injectable", color: T.capRed },
            { key: "pill",       label: "Wegovy pill",       color: T.orange },
          ]}
          T={T}
          height={260}
        />
      </Card>

      {/* Quarterly product net sales — long view */}
      <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 8, letterSpacing: "-0.01em" }}>
        Quarterly product net sales — Novo vs Lilly franchise build, Q1 2022 to Q1 2026
      </div>
      <p style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 16px", maxWidth: 760 }}>
        Reading this chart, three things matter. First, the Mounjaro line — vertical, no plateau, no quarter of negative growth. Second, Ozempic — flat to declining since Q3 2024, with US -8% YoY in Q1 2026 reflecting 10–15% annual price erosion (CFO commentary). Third, Zepbound — launched Q4 2023, now larger than Wegovy injectable globally as of Q3 2025. Trulicity (dulaglutide) is in terminal decline ahead of LoE 2027. Victoza is essentially zero. The picture is a class shifting from semaglutide to tirzepatide on flow, with Novo's installed semaglutide base providing a long-tail revenue cushion that nevertheless cannot compound.
      </p>
      <Card T={T} style={{ padding: "20px 24px", marginBottom: 24 }}>
        <MultiLine
          data={quarterlyRevenue}
          xKey="q"
          yLabel="USD millions"
          yFormat={v => v >= 1000 ? "$" + (v / 1000).toFixed(1) + "bn" : "$" + Math.round(v) + "m"}
          xLabelEvery={2}
          series={[
            { key: "mounjaro", label: "Mounjaro",  color: trxColors.mounjaro },
            { key: "zepbound", label: "Zepbound",  color: trxColors.zepbound },
            { key: "ozempic",  label: "Ozempic",   color: trxColors.ozempic },
            { key: "wegovy",   label: "Wegovy",    color: trxColors.wegovy },
            { key: "rybelsus", label: "Rybelsus",  color: trxColors.rybelsus },
            { key: "victoza",  label: "Victoza",   color: trxColors.victoza },
          ]}
          T={T}
          height={320}
        />
      </Card>

      {/* US monthly TRx long view */}
      <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 8, letterSpacing: "-0.01em" }}>
        US monthly TRx — long view, peak Ozempic vs the Lilly ramp
      </div>
      <p style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 16px", maxWidth: 760 }}>
        Public monthly TRx anchors from JAMA Health Forum (Scannell 2024) and JAMA Network Open (Berning 2025) via IQVIA NPA PayerTrak. By February 2024 — the latest comprehensive cross-class snapshot in the academic literature — the US class was running roughly 4.0M monthly scripts (Ozempic 2.0M, Mounjaro 1.2M, Wegovy 0.42M, Zepbound 0.25M, Saxenda 0.11M). Combined Lilly tirzepatide 1.45M was already 60% of Ozempic alone. The class has since grown to roughly 9M monthly TRx (IQVIA, late 2025) and an estimated 11M unique US patients on therapy (Q2 2025).
      </p>
      <Card T={T} style={{ padding: "20px 24px", marginBottom: 24 }}>
        <MultiLine
          data={usMonthlyTRxLong}
          xKey="month"
          yLabel="Thousands of scripts"
          yFormat={v => Math.round(v) + "k"}
          series={[
            { key: "ozempic",  label: "Ozempic",  color: trxColors.ozempic },
            { key: "wegovy",   label: "Wegovy",   color: trxColors.wegovy },
            { key: "mounjaro", label: "Mounjaro", color: trxColors.mounjaro },
            { key: "zepbound", label: "Zepbound", color: trxColors.zepbound },
            { key: "saxenda",  label: "Saxenda",  color: trxColors.saxenda },
          ]}
          T={T}
          height={260}
        />
      </Card>

      {/* Patients on therapy */}
      <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 8, letterSpacing: "-0.01em" }}>
        Novo patients on therapy — obesity vs diabetes
      </div>
      <p style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 16px", maxWidth: 760 }}>
        Novo's obesity patient count has nearly doubled in five quarters (2.2M → 4.1M), while the diabetes installed base has compressed slightly (43.0M → 41.2M) as patients migrate to tirzepatide. Net franchise volume is growing but the mix is shifting toward a margin-dilutive segment given DTC cash-pay channel ramp ($349 NovoCare Wegovy, MFN Medicare $245). This is the headline tension in the FY26 model — volume up, realized price down.
      </p>
      <Card T={T} style={{ padding: "20px 24px", marginBottom: 24 }}>
        <MultiLine
          data={novoPatientsOnTherapy}
          xKey="period"
          yLabel="Patients (millions)"
          yFormat={v => v.toFixed(1) + "M"}
          yMax={50}
          series={[
            { key: "diabetesM", label: "Diabetes",  color: T.deepBlue },
            { key: "obesityM",  label: "Obesity",   color: T.capRed },
          ]}
          T={T}
          height={240}
        />
      </Card>

      {/* Obesity value share crossover */}
      <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 8, letterSpacing: "-0.01em" }}>
        Global obesity GLP-1 value share — the crossover happened in Q3 2025
      </div>
      <p style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 16px", maxWidth: 760 }}>
        Computed from quarterly product net sales: Wegovy plus Saxenda versus Zepbound (Zepbound OUS launch is essentially negligible — $26m in Q1 2026, so this is effectively a US-driven calculation extended globally). Novo went from ~89.5% Q4 2023 to 41.3% Q1 2026 in five quarters. Zepbound overtook Wegovy in Q3 2025 and has now opened a 17-point gap. In the US specifically, Lilly's own Q3 2025 deck shows Zepbound at 63% TRx share / 71% NBRx share of branded anti-obesity — meaning the gradient is steepening, not stabilizing. The CVS Caremark exclusive (Wegovy preferred from 1 Jul 2025) produced a one-time pop but has not reversed the directional trend.
      </p>
      <Card T={T} style={{ padding: "20px 24px", marginBottom: 24 }}>
        <MultiLine
          data={obesityValueShare}
          xKey="q"
          yLabel="Value share %"
          yFormat={v => v.toFixed(0) + "%"}
          yMax={100}
          series={[
            { key: "novo",  label: "NVO (Wegovy + Saxenda)", color: T.capRed },
            { key: "lilly", label: "LLY (Zepbound)",         color: T.deepBlue },
          ]}
          T={T}
          height={260}
        />
      </Card>

      {/* Q1 2026 growth bar */}
      <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 8, letterSpacing: "-0.01em" }}>
        Q1 2026 YoY sales growth by product
      </div>
      <p style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 16px", maxWidth: 760 }}>
        The fan-out of growth rates in a single quarter is striking. Mounjaro at +125% YoY is roughly 10x the growth rate of Wegovy injectable, while US Ozempic is in outright decline. The DPP-4 / older-generation incretins (Trulicity, Victoza) are in steep secular decline ahead of LoE. The picture is consistent with the "class is growing but Novo is not capturing the marginal patient" thesis — and the marginal patient is where future earnings live.
      </p>
      <Card T={T} style={{ padding: "20px 24px", marginBottom: 24 }}>
        {q1_26GrowthYoY.map((g, i) => {
          const max = Math.max(...q1_26GrowthYoY.map(x => Math.abs(x.growthPct)));
          const colorMap = { capRed: T.capRed, deepBlue: T.deepBlue, purple: T.purple, orange: T.orange };
          const color = colorMap[g.color] || T.text;
          const pct = Math.abs(g.growthPct) / max * 100;
          return (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: T.textSec, fontFamily: Fn }}>{g.product} <span style={{ color: T.textTer, fontSize: 10 }}>({g.company})</span></span>
                <span style={{ fontSize: 12, fontWeight: 600, color: g.growthPct >= 0 ? T.green : T.capRed, fontFamily: Fn, fontFeatureSettings: '"tnum"' }}>{g.growthPct >= 0 ? "+" : ""}{g.growthPct}%</span>
              </div>
              <div style={{ height: 6, background: T.pillBg, borderRadius: 3, overflow: "hidden", display: "flex", flexDirection: g.growthPct >= 0 ? "row" : "row-reverse" }}>
                <div style={{ height: "100%", borderRadius: 3, background: color, width: pct + "%", transition: "width 0.8s ease" }} />
              </div>
            </div>
          );
        })}
        <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 8, lineHeight: 1.5 }}>
          Source: Lilly Q1 2026 earnings; Novo Q1 2026 Interim Report. Mounjaro / Zepbound growth is reported sales (includes price); Ozempic US is adjusted (ex-340B reversal). Trulicity / Victoza in secular decline ahead of LoE.
        </div>
      </Card>

      {/* Lilly TRx SOM */}
      <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 8, letterSpacing: "-0.01em" }}>
        Lilly's own US share-of-market disclosure
      </div>
      <p style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 16px", maxWidth: 760 }}>
        From Lilly Q3 and Q4 2025 investor presentations. NBRx (new-to-brand) is the leading indicator — Lilly was already 71% of new obesity starts in Q3 2025. By definition this means Wegovy NBRx is collapsing. A 71% NBRx share with 63% TRx share signals the gap is widening every week as new patients keep flowing in 7:3 to Lilly while older Wegovy patients persist on therapy. The US T2D battle is similarly tilted: 45% Mounjaro TRx / 54% Mounjaro NBRx — meaning T2D will follow obesity into a Lilly-led market within roughly four quarters.
      </p>
      <Card T={T} style={{ padding: "20px 24px", marginBottom: 24 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: Fn }}>
          <thead>
            <tr style={{ borderBottom: "1px solid " + T.border }}>
              <th style={{ padding: "8px 12px 8px 0", textAlign: "left", color: T.textTer, fontWeight: 500, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.04em" }}>Quarter</th>
              <th style={{ padding: "8px 12px", textAlign: "right", color: T.textTer, fontWeight: 500, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.04em" }}>Mounjaro T2D TRx</th>
              <th style={{ padding: "8px 12px", textAlign: "right", color: T.textTer, fontWeight: 500, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.04em" }}>Mounjaro T2D NBRx</th>
              <th style={{ padding: "8px 12px", textAlign: "right", color: T.textTer, fontWeight: 500, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.04em" }}>Zepbound AOM TRx</th>
              <th style={{ padding: "8px 12px", textAlign: "right", color: T.textTer, fontWeight: 500, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.04em" }}>Zepbound AOM NBRx</th>
            </tr>
          </thead>
          <tbody>
            {llyTRxShareOfMarket.map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid " + T.border }}>
                <td style={{ padding: "10px 12px 10px 0", color: T.textSec, fontWeight: 600 }}>{r.q}</td>
                <td style={{ padding: "10px 12px", textAlign: "right", color: T.text, fontFeatureSettings: '"tnum"' }}>{r.t2dMounjaro != null ? r.t2dMounjaro + "%" : "—"}</td>
                <td style={{ padding: "10px 12px", textAlign: "right", color: T.text, fontFeatureSettings: '"tnum"' }}>{r.t2dNbrxMounjaro != null ? r.t2dNbrxMounjaro + "%" : "—"}</td>
                <td style={{ padding: "10px 12px", textAlign: "right", color: T.text, fontFeatureSettings: '"tnum"' }}>{r.aomZepbound != null ? r.aomZepbound + "%" : "—"}</td>
                <td style={{ padding: "10px 12px", textAlign: "right", color: T.text, fontFeatureSettings: '"tnum"' }}>{r.aomNbrxZepbound != null ? r.aomNbrxZepbound + "%" : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Data gaps */}
      <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 8, letterSpacing: "-0.01em" }}>
        Critical data gaps flagged for follow-up
      </div>
      <p style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 16px", maxWidth: 760 }}>
        The seven gaps below are the limit of what is reliably knowable without paid feeds. Filling them in is a question of subscriptions (IQVIA NPA Weekly, Bloomberg pharma feed) plus disciplined pulling of Novo Appendix 5/6 quarterlies for pre-2023 region splits.
      </p>
      <Card T={T} style={{ padding: "20px 24px", marginBottom: 28 }}>
        {dataGaps.map((g, i) => (
          <div key={i} style={{ paddingBottom: 12, marginBottom: 12, borderBottom: i < dataGaps.length - 1 ? "1px solid " + T.border : "none" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 3 }}>{g.gap}</div>
            <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, lineHeight: 1.5 }}>{g.note}</div>
          </div>
        ))}
      </Card>
    </div>
  );

  /* ─── COMPETITION TAB ─── */
  const competitionTab = (
    <div>
      {/* Asset map */}
      <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 8, letterSpacing: "-0.01em" }}>
        The competitive set: principal incretin assets, approved through Phase 2+
      </div>
      <p style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 16px", maxWidth: 760 }}>
        Approved leaders are semaglutide and tirzepatide. The Phase 3 race is increasingly Lilly's, with retatrutide reading out across five trials in 2026 plus orforglipron's April 2026 obesity launch. Novo's principal next-gen response is CagriSema (PDUFA 2026-Q4) and amycretin SC plus oral (Phase 3 starts 2026-Q2). Twenty further candidates from Amgen, Viking, Boehringer, Roche, Pfizer, AstraZeneca and Innovent shape the post-2027 set.
      </p>
      <Card T={T} style={{ padding: "16px 20px", overflowX: "auto", marginBottom: 28 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, fontFamily: Fn, minWidth: 720 }}>
          <thead>
            <tr style={{ borderBottom: "2px solid " + T.border }}>
              {["Drug", "Brand", "Company", "Stage", "Indications", "Best weight loss"].map(h => (
                <th key={h} style={{ textAlign: "left", padding: "9px 10px", fontSize: 9, color: T.textTer, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {assetMap.map((a, i) => {
              const c = a.status === "approved" ? T.green : a.status === "phase3" ? T.deepBlue : T.orange;
              const bg = a.status === "approved" ? T.greenBg : a.status === "phase3" ? "rgba(29,78,216,0.08)" : "rgba(234,88,12,0.08)";
              return (
                <tr key={i} style={{ borderBottom: "1px solid " + T.border }}>
                  <td style={{ padding: "9px 10px", fontWeight: 500, color: T.text }}>{a.drug}</td>
                  <td style={{ padding: "9px 10px", color: T.textSec }}>{a.brand}</td>
                  <td style={{ padding: "9px 10px", color: T.textSec }}>{a.company}</td>
                  <td style={{ padding: "9px 10px" }}><Pill T={T} color={c} bg={bg}>{a.stage}</Pill></td>
                  <td style={{ padding: "9px 10px", color: T.textTer }}>{a.indications}</td>
                  <td style={{ padding: "9px 10px", color: T.textSec, fontFeatureSettings: '"tnum"', whiteSpace: "nowrap" }}>{a.weightLoss}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      {/* The crossover chart */}
      <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 8, letterSpacing: "-0.01em" }}>
        The FY25 crossover
      </div>
      <p style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 16px", maxWidth: 760 }}>
        Quarterly franchise revenue. Novo's GLP-1 combined (Ozempic, Wegovy, Rybelsus, Victoza, Saxenda) versus Lilly's tirzepatide combined (Mounjaro plus Zepbound). The lines crossed in mid-2025 and Lilly led the year by ~$1.5bn.
      </p>
      <Card T={T} style={{ padding: "20px 24px", marginBottom: 28 }}>
        <RevenueLines data={quarterlyRevenue} T={T} />
      </Card>

      {/* Annual ratio table */}
      <Card T={T} style={{ padding: "16px 20px", overflowX: "auto", marginBottom: 28 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: Fn }}>
          <thead>
            <tr style={{ borderBottom: "2px solid " + T.border }}>
              {["Year", "NVO total ($bn)", "NVO GLP-1 ($bn)", "LLY total ($bn)", "LLY tirz ($bn)", "NVO/LLY ratio"].map(h => (
                <th key={h} style={{ textAlign: h === "Year" ? "left" : "right", padding: "9px 10px", fontSize: 9, color: T.textTer, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {annualRevenue.map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid " + T.border }}>
                <td style={{ padding: "9px 10px", fontWeight: 600, color: T.text }}>{r.year}</td>
                <td style={{ padding: "9px 10px", textAlign: "right", color: T.textSec, fontFeatureSettings: '"tnum"' }}>{r.nvoTotal.toFixed(1)}</td>
                <td style={{ padding: "9px 10px", textAlign: "right", color: T.capRed, fontWeight: 600, fontFeatureSettings: '"tnum"' }}>{r.nvoGLP1.toFixed(1)}</td>
                <td style={{ padding: "9px 10px", textAlign: "right", color: T.textSec, fontFeatureSettings: '"tnum"' }}>{r.llyTotal.toFixed(1)}</td>
                <td style={{ padding: "9px 10px", textAlign: "right", color: T.deepBlue, fontWeight: 600, fontFeatureSettings: '"tnum"' }}>{r.llyTirz.toFixed(2)}</td>
                <td style={{ padding: "9px 10px", textAlign: "right", color: T.text, fontWeight: 600, fontFeatureSettings: '"tnum"' }}>{r.ratio == null ? "—" : r.ratio.toFixed(2) + "x"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* US TRx Share */}
      <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 8, letterSpacing: "-0.01em" }}>
        US incretin TRx market share: inflection across 11 quarters
      </div>
      <p style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 16px", maxWidth: 760 }}>
        Source: IQVIA NPA via Lilly quarterly 8-K decks. Lilly's TRx share rose from ~22% in Q2-2023 to 60.1% in Q1-2026. The 50/50 line was crossed in Q1 2025. Tirzepatide now leads in T2D (51%/49%) and obesity (~58%/42% est.).
      </p>
      <Card T={T} style={{ padding: "20px 24px", marginBottom: 28 }}>
        <ShareArea data={usShareData} T={T} />
      </Card>

      {/* Price decomp */}
      <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 8, letterSpacing: "-0.01em" }}>
        Realized price decomposition
      </div>
      <p style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 16px", maxWidth: 760 }}>
        Lilly US price effect peaked at +27% in Q4-2023 and has been negative since Q4-2024. Novo's North America Operations on a constant exchange rate basis joined Lilly in negative territory in Q3-2025 and accelerated to −11% in Q1-2026.
      </p>
      <Card T={T} style={{ padding: "20px 24px", marginBottom: 28 }}>
        <PriceBars data={priceDecomp} T={T} />
      </Card>

      {/* Geographic mix */}
      <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 8, letterSpacing: "-0.01em" }}>
        Geographic revenue mix FY2025
      </div>
      <p style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 16px", maxWidth: 760 }}>
        Novo carries higher international exposure (44% ex-US) than Lilly (33%). EUCAN grew 15% on a constant exchange rate basis to DKK 66bn. Region China shrank in DKK terms (−13%) but grew 5% on a constant currency basis.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 28 }}>
        <Card T={T} style={{ padding: "20px 24px" }}>
          <PieChart data={geoMixNVO} T={T} label="Novo Nordisk: DKK 309.1bn FY25" />
        </Card>
        <Card T={T} style={{ padding: "20px 24px" }}>
          <PieChart data={geoMixLLY} T={T} label="Eli Lilly: $65.2bn FY25" />
        </Card>
      </div>
    </div>
  );

  /* ─── PATENT CLIFF TAB ─── */
  const patentTab = (
    <div>
      <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 8, letterSpacing: "-0.01em" }}>
        The 2026 wave: semaglutide loss-of-exclusivity by jurisdiction
      </div>
      <p style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 20px", maxWidth: 760 }}>
        Composition-of-matter expired in India, Brazil, China and Mexico in March 2026; Canada was already lapsed in 2020 (missed maintenance fee). The US (Dec 2031), EU5/UK (Mar 2031), and Japan (~2031) retain protection through patent term extensions and supplementary protection certificates.
      </p>
      <Card T={T} style={{ padding: "16px 20px", overflowX: "auto", marginBottom: 28 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: Fn }}>
          <thead>
            <tr style={{ borderBottom: "2px solid " + T.border }}>
              {["Jurisdiction", "Effective LoE", "Status", "Detail"].map(h => (
                <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontSize: 9, color: T.textTer, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {patentExpiry.map((p, i) => (
              <tr key={i} style={{ borderBottom: "1px solid " + T.border }}>
                <td style={{ padding: "10px 12px", fontWeight: 600, color: T.text, whiteSpace: "nowrap" }}>{p.country}</td>
                <td style={{ padding: "10px 12px", color: T.textSec, fontFeatureSettings: '"tnum"', whiteSpace: "nowrap" }}>{p.year}</td>
                <td style={{ padding: "10px 12px" }}>
                  <Pill T={T} color={colorMap[p.color]} bg={p.color === "capRed" ? T.redBg : p.color === "orange" ? "rgba(234,88,12,0.08)" : T.greenBg}>{p.status}</Pill>
                </td>
                <td style={{ padding: "10px 12px", color: T.textTer, fontSize: 11, lineHeight: 1.6 }}>{p.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* India generics callout */}
      <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 8, letterSpacing: "-0.01em" }}>
        India: ~50 generic semaglutide brands launched within one week
      </div>
      <p style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 16px", maxWidth: 760 }}>
        Pricing across the major launches ranges from 50 to 92% below Wegovy. Natco's vial pricing of ₹1,290 per month versus Wegovy's ₹16,400 is the most aggressive. China has 11 NDAs filed and Phase 3 in process; CNIPA rejected Novo's patent term extension application in September 2025, though a Sino-Swiss FTA data exclusivity claim may delay actual launches into 2H 2026.
      </p>
      <Card T={T} style={{ padding: "16px 20px", marginBottom: 28 }}>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(2, 1fr)", gap: 12 }}>
          {indiaGenerics.map((g, i) => (
            <div key={i} style={{ padding: "12px 14px", background: T.bg, borderRadius: T.radiusSm, borderLeft: `3px solid ${T.capRed}` }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn }}>{g.brand}</div>
              <div style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, marginTop: 2 }}>{g.company}</div>
              <div style={{ fontSize: 11, color: T.capRed, fontWeight: 600, fontFamily: Fn, marginTop: 4, fontFeatureSettings: '"tnum"' }}>{g.discount}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Compounded GLP-1 timeline */}
      <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 8, letterSpacing: "-0.01em" }}>
        The compounded GLP-1 leak: closed
      </div>
      <p style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 16px", maxWidth: 760 }}>
        FDA resolved the tirzepatide shortage in October 2024 and semaglutide in February 2025; both delistings were upheld by Judge Pittman. Compounded semaglutide shipments fell roughly 90% from June 2024 to June 2025 per FDA ITACS. Novo filed 111+ suits across 32 states by April 2025; Lilly secured 12+ permanent injunctions by June 2025. The April 2026 FDA proposed rule would permanently exclude semaglutide, tirzepatide and liraglutide from the §503B Bulks List.
      </p>
      <Card T={T} style={{ padding: "20px 24px", marginBottom: 28 }}>
        <div style={{ position: "relative", paddingLeft: 24 }}>
          <div style={{ position: "absolute", left: 8, top: 0, bottom: 0, width: 2, background: T.border }} />
          {compoundedTimeline.map((e, i) => (
            <div key={i} style={{ position: "relative", marginBottom: 14, paddingLeft: 16 }}>
              <div style={{ position: "absolute", left: -20, top: 4, width: 12, height: 12, borderRadius: "50%", background: colorMap[e.color] || T.textTer, border: `2px solid ${T.card}` }} />
              <div style={{ fontSize: 11, fontWeight: 600, color: colorMap[e.color] || T.textSec, fontFamily: Fn, fontFeatureSettings: '"tnum"' }}>{e.date}</div>
              <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, marginTop: 2, lineHeight: 1.55 }}>{e.event}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  /* ─── PIPELINE TAB ─── */
  const pipelineTab = (
    <div>
      <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 8, letterSpacing: "-0.01em" }}>
        Clinical efficacy comparison: weight loss across approved and Phase 2+
      </div>
      <p style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 16px", maxWidth: 760 }}>
        Mean weight loss percent. Tirzepatide leads on the approved side (SURMOUNT-3 −26.6%, SURMOUNT-4 −25.3%); retatrutide 12mg leads on the Phase 2+ frontier at −24.2%. Semaglutide STEP-1 sits at −14.9%. Discontinuation rates due to adverse events vary widely: orforglipron 36mg 24.4%, MariTide ~27%, survodutide 4.8mg 24.6%, retatrutide 12mg ~16%.
      </p>
      <Card T={T} style={{ padding: "20px 24px", marginBottom: 28 }}>
        <EfficacyBars data={efficacyData} T={T} />
      </Card>

      {/* Catalyst Gantt */}
      <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 8, letterSpacing: "-0.01em" }}>
        Catalyst calendar 2026-Q2 → 2027-Q4
      </div>
      <p style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 16px", maxWidth: 760 }}>
        Seven of the next eight quarters of major readouts are Lilly assets. Novo's principal events are CagriSema (PDUFA 2026-Q4), amycretin Phase 3 starts (2026-Q2) and REDEFINE-3 cardiovascular outcomes (~2027-Q4 to 2028).
      </p>
      <Card T={T} style={{ padding: "20px 24px", marginBottom: 28, overflowX: "auto" }}>
        <div style={{ minWidth: 720 }}>
          <CatalystGantt data={catalysts} T={T} />
        </div>
      </Card>

      {/* Indication readouts */}
      <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 8, letterSpacing: "-0.01em" }}>
        Indication expansion: outcomes trials and label adds
      </div>
      <p style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 16px", maxWidth: 760 }}>
        Of 14 major readouts since 2023, 13 were positive. The only material failure was evoke and evoke+ (oral semaglutide in early Alzheimer's, November 24 2025), which removes a significant blue-sky option from the Novo bull thesis. Lilly's MASH program (SYNERGY-NASH Phase 2 plus tirzepatide momentum) and Novo's ESSENCE (Wegovy MASH FDA-accelerated August 2025) keep both companies engaged across cardio, kidney, MASH and OSA.
      </p>
      <Card T={T} style={{ padding: "16px 20px", overflowX: "auto", marginBottom: 28 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, fontFamily: Fn, minWidth: 720 }}>
          <thead>
            <tr style={{ borderBottom: "2px solid " + T.border }}>
              {["Year", "Trial", "Drug", "Indication", "Result", "Outcome", "Sponsor"].map(h => (
                <th key={h} style={{ textAlign: "left", padding: "9px 10px", fontSize: 9, color: T.textTer, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {indicationReadouts.map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid " + T.border }}>
                <td style={{ padding: "9px 10px", color: T.textSec, fontFeatureSettings: '"tnum"' }}>{r.year}</td>
                <td style={{ padding: "9px 10px", fontWeight: 600, color: T.text, whiteSpace: "nowrap" }}>{r.trial}</td>
                <td style={{ padding: "9px 10px", color: T.textSec, whiteSpace: "nowrap" }}>{r.drug}</td>
                <td style={{ padding: "9px 10px", color: T.textTer, whiteSpace: "nowrap" }}>{r.indication}</td>
                <td style={{ padding: "9px 10px", color: T.textSec }}>{r.result}</td>
                <td style={{ padding: "9px 10px" }}>
                  <Pill T={T} color={r.outcome === "positive" ? T.green : T.capRed} bg={r.outcome === "positive" ? T.greenBg : T.redBg}>{r.outcome}</Pill>
                </td>
                <td style={{ padding: "9px 10px", color: T.textSec, whiteSpace: "nowrap" }}>{r.company}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Adjacent threats */}
      <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 8, letterSpacing: "-0.01em" }}>
        Adjacent and indirect threats
      </div>
      <p style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 16px", maxWidth: 760 }}>
        Bariatric surgery is now complementary, not substitutive (270,089 US procedures in 2023, with the American Society for Metabolic and Bariatric Surgery seeing a rebound from GLP-1 discontinuers). Telehealth platforms (Hims, Ro, Noom) drive volume rather than displace it. The clearest substitution risk is generic liraglutide, the first generic GLP-1 indicated for weight loss. WeightWatchers' May 2025 Chapter 11 is direct evidence of GLP-1 displacing lifestyle programs. Long-tail risk sits in RNAi and gene-editing programs (Wave, Arrowhead, Regeneron) at Phase 1 with potential 5–10 year disruption.
      </p>
      <Card T={T} style={{ padding: "16px 20px", marginBottom: 28 }}>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(2, 1fr)", gap: 12 }}>
          {adjacentThreats.map((t, i) => {
            const dirColor = t.direction === "complement" ? T.green : t.direction === "substitute" ? T.capRed : t.direction === "displaced" ? T.purple : T.orange;
            const dirBg = t.direction === "complement" ? T.greenBg : t.direction === "substitute" ? T.redBg : t.direction === "displaced" ? "rgba(67,56,202,0.08)" : "rgba(234,88,12,0.08)";
            return (
              <div key={i} style={{ padding: "14px 16px", background: T.bg, borderRadius: T.radiusSm, borderTop: `3px solid ${dirColor}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn }}>{t.category}</div>
                  <Pill T={T} color={dirColor} bg={dirBg}>{t.direction}</Pill>
                </div>
                <p style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.6, margin: 0 }}>{t.detail}</p>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );

  /* ─── OPERATIONS & FINANCIALS TAB ─── */
  const operationsTab = (
    <div>
      {/* Manufacturing */}
      <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 8, letterSpacing: "-0.01em" }}>
        Manufacturing capacity build-out: a parallel arms race
      </div>
      <p style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 16px", maxWidth: 760 }}>
        Lilly has committed more than $50bn to US manufacturing since 2020 across eight-plus sites; tirzepatide volume more than doubled in H2 2024 versus H2 2023. Novo committed DKK 47.2bn in FY24 capex (up from 25.8bn FY23) and guided DKK 60bn for FY25, with the Catalent acquisition (closed December 18 2024) adding three sites. Catalent Bloomington received an FDA OAI classification in late 2025, a material risk to the Novo fill ramp.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 28 }}>
        <Card T={T} style={{ padding: "20px 24px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 12 }}>Novo Nordisk announced capex</div>
          <CapexBars items={capexNVO} color={T.capRed} T={T} total={capexNVO.reduce((s, i) => s + i.investment, 0)} />
        </Card>
        <Card T={T} style={{ padding: "20px 24px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 12 }}>Eli Lilly announced capex</div>
          <CapexBars items={capexLLY} color={T.deepBlue} T={T} total={capexLLY.reduce((s, i) => s + i.investment, 0)} />
        </Card>
      </div>

      {/* Pricing & Reimbursement */}
      <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 8, letterSpacing: "-0.01em" }}>
        Pricing and reimbursement: DTC walks plus MFN plus IRA
      </div>
      <p style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 16px", maxWidth: 760 }}>
        Wegovy NovoCare cash-pay walked from $499 (Mar 2025) to $349 (Nov 2025); Wegovy oral pill launched at $149 to $299 in January 2026. Zepbound LillyDirect vials walked from $549 (Aug 2024) to $299 (Dec 2025). The November 2025 Most-Favored-Nation deals took Wegovy to ~$245 in Medicare and ~$346 to $350 via TrumpRx; semaglutide was selected for Inflation Reduction Act negotiation IPAY 2027 (Maximum Fair Price effective January 1 2027).
      </p>
      <Card T={T} style={{ padding: "20px 24px", marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 12 }}>Direct-to-consumer cash-pay walk: Wegovy NovoCare vs Zepbound LillyDirect</div>
        <PriceWalk data={dtcWalks} T={T} />
      </Card>
      <Card T={T} style={{ padding: "16px 20px", overflowX: "auto", marginBottom: 28 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, fontFamily: Fn }}>
          <thead>
            <tr style={{ borderBottom: "2px solid " + T.border }}>
              {["Date", "Event", "Category"].map(h => (
                <th key={h} style={{ textAlign: "left", padding: "9px 10px", fontSize: 9, color: T.textTer, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pricingPolicy.map((p, i) => {
              const cmap = { DTC: T.orange, Policy: T.capRed, PBM: T.purple };
              const bgmap = { DTC: "rgba(234,88,12,0.08)", Policy: T.redBg, PBM: "rgba(67,56,202,0.08)" };
              return (
                <tr key={i} style={{ borderBottom: "1px solid " + T.border }}>
                  <td style={{ padding: "9px 10px", color: T.textSec, fontFeatureSettings: '"tnum"', whiteSpace: "nowrap", fontWeight: 500 }}>{p.date}</td>
                  <td style={{ padding: "9px 10px", color: T.textSec, lineHeight: 1.6 }}>{p.event}</td>
                  <td style={{ padding: "9px 10px" }}>
                    <Pill T={T} color={cmap[p.category]} bg={bgmap[p.category]}>{p.category}</Pill>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      {/* Geographic penetration */}
      <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 8, letterSpacing: "-0.01em" }}>
        Geographic patient penetration
      </div>
      <Card T={T} style={{ padding: "16px 20px", overflowX: "auto", marginBottom: 28 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, fontFamily: Fn }}>
          <thead>
            <tr style={{ borderBottom: "2px solid " + T.border }}>
              {["Region", "T2D / on-label users", "Obesity / AOM", "Note"].map(h => (
                <th key={h} style={{ textAlign: "left", padding: "9px 10px", fontSize: 9, color: T.textTer, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {geoPenetration.map((g, i) => (
              <tr key={i} style={{ borderBottom: "1px solid " + T.border }}>
                <td style={{ padding: "9px 10px", fontWeight: 600, color: T.text, whiteSpace: "nowrap" }}>{g.region}</td>
                <td style={{ padding: "9px 10px", color: T.textSec }}>{g.t2dPatients}</td>
                <td style={{ padding: "9px 10px", color: T.textSec }}>{g.obesity}</td>
                <td style={{ padding: "9px 10px", color: T.textTer, fontSize: 11 }}>{g.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* TAM */}
      <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 8, letterSpacing: "-0.01em" }}>
        2030 sell-side total addressable market dispersion
      </div>
      <p style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 16px", maxWidth: 760 }}>
        The range spans more than 50% from low to high. Goldman cut to $95bn from $130bn; UBS cut to $130bn from $150bn-plus and assigns NVO 38.9% / LLY 56.7% of 2030 GLP-1 share. Implied 2025–2030 CAGR is 9 to 19%.
      </p>
      <Card T={T} style={{ padding: "20px 24px", marginBottom: 28 }}>
        <TamRange data={tamForecasts} T={T} />
      </Card>

      {/* Financial Quality */}
      <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 8, letterSpacing: "-0.01em" }}>
        Financial quality comparison FY20 versus FY25
      </div>
      <Card T={T} style={{ padding: "16px 20px", overflowX: "auto", marginBottom: 28 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: Fn }}>
          <thead>
            <tr style={{ borderBottom: "2px solid " + T.border }}>
              <th style={{ textAlign: "left", padding: "10px 12px", fontSize: 9, color: T.textTer, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Metric</th>
              <th style={{ textAlign: "right", padding: "10px 12px", fontSize: 9, color: T.capRed, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>NVO FY20</th>
              <th style={{ textAlign: "right", padding: "10px 12px", fontSize: 9, color: T.capRed, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>NVO FY25</th>
              <th style={{ textAlign: "right", padding: "10px 12px", fontSize: 9, color: T.deepBlue, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>LLY FY20</th>
              <th style={{ textAlign: "right", padding: "10px 12px", fontSize: 9, color: T.deepBlue, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>LLY FY25</th>
            </tr>
          </thead>
          <tbody>
            {financialQuality.map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid " + T.border }}>
                <td style={{ padding: "10px 12px", fontWeight: 500, color: T.text }}>{r.metric}</td>
                <td style={{ padding: "10px 12px", textAlign: "right", color: T.textSec, fontFeatureSettings: '"tnum"' }}>{r.nvo20}</td>
                <td style={{ padding: "10px 12px", textAlign: "right", color: T.text, fontWeight: 600, fontFeatureSettings: '"tnum"' }}>{r.nvo25}</td>
                <td style={{ padding: "10px 12px", textAlign: "right", color: T.textSec, fontFeatureSettings: '"tnum"' }}>{r.lly20}</td>
                <td style={{ padding: "10px 12px", textAlign: "right", color: T.text, fontWeight: 600, fontFeatureSettings: '"tnum"' }}>{r.lly25}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Valuation re-rating */}
      <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 8, letterSpacing: "-0.01em" }}>
        Forward P/E re-rating: 42x to 12x in eight quarters
      </div>
      <p style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 16px", maxWidth: 760 }}>
        Novo trades at an estimated 32% discount to the MSCI ACWI Health Care benchmark (~17x) and a 59% discount to Lilly. The base case thesis is no longer "can Novo defend share". It is "is the FY26 negative growth guidance the trough or the new run-rate".
      </p>
      <Card T={T} style={{ padding: "20px 24px", marginBottom: 28 }}>
        <ValuationLine data={valuationSeries} T={T} />
      </Card>
    </div>
  );

  return (
    <div>
      {header}
      <Tabs tabs={allTabs} active={tab} onChange={setTab} T={T} />
      {tab === "Thesis" && thesisTab}
      {tab === "Prescriptions" && prescriptionsTab}
      {tab === "Competition" && competitionTab}
      {tab === "Patent Cliff" && patentTab}
      {tab === "Pipeline" && pipelineTab}
      {tab === "Operations & Financials" && operationsTab}
    </div>
  );
}
