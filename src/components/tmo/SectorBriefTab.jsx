import { useState, useMemo } from "react";
import { Fn, Fh } from "../../theme";
import { Card, Pill } from "../shared";
import { ProductIcon } from "./ProductIcons";
import {
  facts, pricePeSeries, chartAnnotations, sectorStats,
  bioprocPrimer, players, playerInsight,
  blaMoat, catalysts, conclusion,
} from "../../data/research-tmo-sector-brief";

/* ════════════════════════════════════════════════
   Dual-axis PRICE × P/E chart
   Left axis = TMO close ($). Right axis = NTM P/E (x).
   ════════════════════════════════════════════════ */
function PricePEChart({ T }) {
  const [hov, setHov] = useState(null);
  const data = pricePeSeries;
  const W = 1000, H = 380;
  const padL = 62, padR = 62, padT = 36, padB = 50;
  const gridW = W - padL - padR;
  const gridH = H - padT - padB;

  const prices = data.map(d => d.price);
  const pes    = data.map(d => d.pe);
  const pMin = Math.floor(Math.min(...prices) / 50) * 50 - 50;
  const pMax = Math.ceil(Math.max(...prices) / 50) * 50;
  const peMin = Math.floor(Math.min(...pes) / 5) * 5 - 2;
  const peMax = Math.ceil(Math.max(...pes) / 5) * 5 + 2;

  const xFor  = (i) => padL + (i / (data.length - 1)) * gridW;
  const yPrice = (v) => padT + gridH - ((v - pMin) / (pMax - pMin)) * gridH;
  const yPe    = (v) => padT + gridH - ((v - peMin) / (peMax - peMin)) * gridH;

  const priceColor = "#1D4ED8";
  const peColor    = "#EA580C";

  // Grid Y ticks
  const priceTicks = useMemo(() => {
    const step = 100;
    const t = [];
    for (let v = Math.ceil(pMin / step) * step; v <= pMax; v += step) t.push(v);
    return t;
  }, [pMin, pMax]);
  const peTicks = useMemo(() => {
    const step = 5;
    const t = [];
    for (let v = Math.ceil(peMin / step) * step; v <= peMax; v += step) t.push(v);
    return t;
  }, [peMin, peMax]);

  // Annotation index lookup
  const annotMap = chartAnnotations.reduce((acc, a) => {
    const idx = data.findIndex(d => d.q === a.q);
    if (idx >= 0) acc[idx] = a;
    return acc;
  }, {});

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", overflow: "visible" }}>
      {/* Y gridlines (priced on the left axis) */}
      {priceTicks.map((v, i) => (
        <line key={"pg-" + i} x1={padL} y1={yPrice(v)} x2={padL + gridW} y2={yPrice(v)} stroke={T.border} strokeWidth={1} />
      ))}

      {/* Y-axis labels — PRICE (left) */}
      {priceTicks.map((v, i) => (
        <text key={"pl-" + i} x={padL - 8} y={yPrice(v) + 3} textAnchor="end" fontFamily={Fn} fontSize={10} fill={priceColor}>${v}</text>
      ))}
      {/* Y-axis labels — P/E (right) */}
      {peTicks.map((v, i) => (
        <text key={"el-" + i} x={padL + gridW + 8} y={yPe(v) + 3} textAnchor="start" fontFamily={Fn} fontSize={10} fill={peColor}>{v}x</text>
      ))}

      {/* X-axis */}
      <line x1={padL} y1={padT + gridH} x2={padL + gridW} y2={padT + gridH} stroke={T.textTer} strokeWidth={1} />
      {data.map((d, i) => {
        // Every 4th label, plus last point
        const showLabel = i % 4 === 0 || i === data.length - 1;
        return (
          <g key={"x-" + i}>
            <line x1={xFor(i)} y1={padT + gridH} x2={xFor(i)} y2={padT + gridH + 4} stroke={T.textTer} />
            {showLabel && (
              <text x={xFor(i)} y={padT + gridH + 18} textAnchor="middle" fontFamily={Fn} fontSize={10.5} fontWeight={hov === i ? 700 : 500} fill={hov === i ? T.text : T.textSec}>{d.q}</text>
            )}
          </g>
        );
      })}

      {/* Axis titles */}
      <text x={padL} y={padT - 14} fontFamily={Fn} fontSize={11} fontWeight={800} fill={priceColor} letterSpacing="0.06em">TMO PRICE (left axis, $)</text>
      <text x={padL + gridW} y={padT - 14} textAnchor="end" fontFamily={Fn} fontSize={11} fontWeight={800} fill={peColor} letterSpacing="0.06em">NTM FORWARD P/E (right axis, x)</text>

      {/* Price area (subtle fill under line) */}
      <path
        d={`M ${xFor(0)} ${padT + gridH} ${data.map((d, i) => `L ${xFor(i)} ${yPrice(d.price)}`).join(" ")} L ${xFor(data.length - 1)} ${padT + gridH} Z`}
        fill={priceColor}
        opacity={0.06}
      />

      {/* P/E line */}
      <polyline
        points={data.map((d, i) => `${xFor(i)},${yPe(d.pe)}`).join(" ")}
        fill="none"
        stroke={peColor}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="0"
      />

      {/* Price line */}
      <polyline
        points={data.map((d, i) => `${xFor(i)},${yPrice(d.price)}`).join(" ")}
        fill="none"
        stroke={priceColor}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 1px 3px ${priceColor}55)` }}
      />

      {/* Annotation pins */}
      {Object.entries(annotMap).map(([idxStr, a]) => {
        const idx = +idxStr;
        const cx = xFor(idx);
        const cy = yPrice(data[idx].price);
        const above = idx < data.length - 2;
        const ly = above ? cy - 32 : cy - 32;
        return (
          <g key={"a-" + idxStr}>
            <line x1={cx} y1={cy} x2={cx} y2={ly + 8} stroke={a.color} strokeWidth={1} strokeDasharray="2 2" />
            <circle cx={cx} cy={cy} r={6} fill={a.color} stroke="#fff" strokeWidth={2} />
            <rect x={cx - 70} y={ly - 18} width={140} height={28} rx={4} fill={a.color} />
            <text x={cx} y={ly - 1} textAnchor="middle" fontFamily={Fn} fontSize={10} fontWeight={700} fill="#fff">{a.label}</text>
          </g>
        );
      })}

      {/* Dots */}
      {data.map((d, i) => (
        <g key={"d-" + i}>
          <circle cx={xFor(i)} cy={yPrice(d.price)} r={hov === i ? 6 : 3.5} fill={priceColor} stroke="#fff" strokeWidth={1.5} style={{ transition: "r 0.15s" }} />
          <circle cx={xFor(i)} cy={yPe(d.pe)}       r={hov === i ? 5 : 3}   fill={peColor}    stroke="#fff" strokeWidth={1.5} style={{ transition: "r 0.15s" }} />
        </g>
      ))}

      {/* Hover overlay */}
      {data.map((d, i) => (
        <rect
          key={"h-" + i}
          x={xFor(i) - gridW / data.length / 2}
          y={padT}
          width={gridW / data.length}
          height={gridH}
          fill="transparent"
          onMouseEnter={() => setHov(i)}
          onMouseLeave={() => setHov(null)}
        />
      ))}

      {/* Tooltip */}
      {hov !== null && (() => {
        const d = data[hov];
        const x = xFor(hov);
        const tipW = 150, tipH = 60;
        const tipX = x + 10 + tipW > padL + gridW ? x - 10 - tipW : x + 10;
        const tipY = padT + 4;
        return (
          <g style={{ pointerEvents: "none" }}>
            <line x1={x} y1={padT} x2={x} y2={padT + gridH} stroke={T.textTer} strokeWidth={1} strokeDasharray="2 3" opacity={0.5} />
            <rect x={tipX} y={tipY} width={tipW} height={tipH} rx={6} fill={T.text} opacity={0.96} />
            <text x={tipX + 10} y={tipY + 16} fontFamily={Fn} fontSize={10} fontWeight={800} fill={T.card} letterSpacing="0.06em">{d.q}</text>
            <text x={tipX + 10} y={tipY + 33} fontFamily={Fn} fontSize={11} fill={T.card}>
              <tspan fill={priceColor} fontWeight={700}>${d.price}</tspan> <tspan opacity={0.7}>price</tspan>
            </text>
            <text x={tipX + 10} y={tipY + 50} fontFamily={Fn} fontSize={11} fill={T.card}>
              <tspan fill={peColor} fontWeight={700}>{d.pe}x</tspan> <tspan opacity={0.7}>P/E NTM</tspan>
            </text>
          </g>
        );
      })()}
    </svg>
  );
}

/* ════════════════════════════════════════════════
   4-PLAYER share — stacked horizontal bar + chips
   ════════════════════════════════════════════════ */
function PlayerShareBar({ T }) {
  return (
    <div>
      <div style={{ display: "flex", height: 44, borderRadius: 8, overflow: "hidden", marginBottom: 14, boxShadow: T.shadow }}>
        {players.map(p => (
          <div key={p.name} style={{
            flex: p.share,
            background: p.color,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontFamily: Fn,
            position: "relative",
          }} title={`${p.name}: ${p.share}%`}>
            <div style={{ textAlign: "center", padding: "0 8px" }}>
              <div style={{ fontSize: 11, fontWeight: 800, opacity: 0.9, letterSpacing: "0.04em" }}>{p.name.toUpperCase()}</div>
              <div style={{ fontSize: 14, fontWeight: 800 }}>{p.share}%</div>
            </div>
            {p.isHero && (
              <div style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", background: "#fff", color: p.color, fontSize: 8.5, fontWeight: 800, padding: "1px 6px", borderRadius: 3, letterSpacing: "0.04em", boxShadow: T.shadow }}>TMO</div>
            )}
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
        {players.map(p => (
          <div key={p.name} style={{ padding: "12px 14px", border: `1px solid ${p.color}33`, borderLeft: `3px solid ${p.color}`, borderRadius: 6, background: p.isHero ? p.color + "0F" : T.card }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: T.text, fontFamily: Fn }}>{p.name}</span>
              <span style={{ fontSize: 11, fontWeight: 800, color: p.color, fontFamily: Fn }}>{p.share}%</span>
            </div>
            <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginBottom: 6 }}>{p.parent}</div>
            <div style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.55 }}>{p.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   Main tab
   ════════════════════════════════════════════════ */
export default function SectorBriefTab({ T }) {
  // Compute headline numbers from the price/PE series
  const first = pricePeSeries[0];
  const peak = pricePeSeries.reduce((acc, d) => d.pe > acc.pe ? d : acc, pricePeSeries[0]);
  const last = pricePeSeries[pricePeSeries.length - 1];
  const peDelta = ((last.pe / peak.pe) - 1) * 100;
  const priceDelta = ((last.price / peak.price) - 1) * 100;

  return (
    <div>
      {/* ── Header ─────────────────────────────── */}
      <div style={{ fontSize: 11, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8 }}>
        Sector brief · 20 May 2026
      </div>
      <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 30, color: T.text, lineHeight: 1.15, marginBottom: 18, letterSpacing: "-0.02em" }}>
        Why it's been broken — and why it might not stay broken.
      </div>

      {/* ── Two facts side-by-side ──────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 14, marginBottom: 28 }}>
        {facts.map((f) => (
          <Card key={f.num} T={T} style={{ padding: "26px 28px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "auto minmax(0, 1fr)", gap: 20, alignItems: "start" }}>
              <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 48, lineHeight: 0.9, color: T.textTer, letterSpacing: "-0.04em" }}>{f.num}</div>
              <div>
                <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 22, color: T.text, lineHeight: 1.25, letterSpacing: "-0.01em", marginBottom: 10 }}>{f.headline}</div>
                <div style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, marginBottom: 14 }}>{f.one}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                  <div style={{ fontSize: 30, fontWeight: 800, color: T.capRed, fontFamily: Fn, lineHeight: 1, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>{f.stat}</div>
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: T.textTer, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase" }}>{f.statSub}</div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* ── Price × P/E chart ───────────────────── */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
        <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 22, color: T.text }}>Price × P/E NTM</div>
        <div style={{ fontSize: 12, color: T.textTer, fontFamily: Fn }}>The de-rating story in one chart — TMO close (left) vs forward multiple (right)</div>
      </div>
      <Card T={T} style={{ padding: "22px 24px", marginBottom: 14, overflow: "visible" }}>
        <PricePEChart T={T} />
      </Card>

      {/* Inline stat row (peak vs today) */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10, marginBottom: 28 }}>
        <div style={{ padding: "12px 14px", background: T.card, border: `1px solid ${T.border}`, borderRadius: 8 }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase" }}>P/E Peak (Q4'21)</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: T.text, fontFamily: Fn, fontVariantNumeric: "tabular-nums" }}>{peak.pe}x</div>
        </div>
        <div style={{ padding: "12px 14px", background: T.card, border: `1px solid ${T.border}`, borderRadius: 8 }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase" }}>P/E Today</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: T.text, fontFamily: Fn, fontVariantNumeric: "tabular-nums" }}>{last.pe}x</div>
        </div>
        <div style={{ padding: "12px 14px", background: T.capRed + "10", border: `1px solid ${T.capRed}33`, borderRadius: 8 }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: T.capRed, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase" }}>P/E Compression</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: T.capRed, fontFamily: Fn, fontVariantNumeric: "tabular-nums" }}>{peDelta.toFixed(0)}%</div>
        </div>
        <div style={{ padding: "12px 14px", background: T.card, border: `1px solid ${T.border}`, borderRadius: 8 }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase" }}>Price vs Peak</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: T.capRed, fontFamily: Fn, fontVariantNumeric: "tabular-nums" }}>{priceDelta.toFixed(0)}%</div>
        </div>
      </div>

      {/* ── Sector valuation low strip ──────────── */}
      <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 22, color: T.text, marginBottom: 10 }}>The sector is at multi-decade valuation lows.</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 32 }}>
        {sectorStats.map((s, i) => (
          <div key={i} style={{ padding: "16px 18px", background: T.card, border: `1px solid ${T.border}`, borderRadius: 8 }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6, lineHeight: 1.3 }}>{s.label}</div>
            <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 26, color: T.text, fontWeight: 600, lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, fontStyle: "italic" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* ── Bioprocessing primer ─────────────────── */}
      <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 26, color: T.text, marginBottom: 8, letterSpacing: "-0.01em" }}>The bioprocessing primer — in plain English.</div>
      <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 18px", maxWidth: 880 }}>{bioprocPrimer.intro}</p>

      {/* 4-step flow */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 0, marginBottom: 22, position: "relative" }}>
        {bioprocPrimer.steps.map((s, i) => (
          <div key={s.id} style={{ display: "flex", alignItems: "stretch" }}>
            <div style={{ flex: 1, padding: "16px 14px 18px", background: T.card, border: `1px solid ${T.border}`, borderRadius: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: T.text, color: T.card, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, fontFamily: Fn }}>{s.id}</div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: T.text, fontFamily: Fn }}>{s.title}</div>
              </div>
              <div style={{ fontSize: 11.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.55 }}>{s.desc}</div>
            </div>
            {i < bioprocPrimer.steps.length - 1 && (
              <div style={{ display: "flex", alignItems: "center", padding: "0 6px", color: T.textTer, fontSize: 18, fontWeight: 700 }}>→</div>
            )}
          </div>
        ))}
      </div>

      {/* Two product cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 14, marginBottom: 32 }}>
        {bioprocPrimer.products.map((p, i) => (
          <Card key={i} T={T} style={{ padding: "20px 22px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 18 }}>
              <ProductIcon id={p.iconId} color="#059669" size={72} T={T} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: "#059669", fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 }}>{p.what}</div>
                <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 20, color: T.text, marginBottom: 10, lineHeight: 1.2 }}>{p.brand}</div>
                <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7 }}>{p.desc}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* ── 4-player market share ───────────────── */}
      <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 26, color: T.text, marginBottom: 8, letterSpacing: "-0.01em" }}>Four firms sell the picks-and-shovels.</div>
      <p style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, lineHeight: 1.6, margin: "0 0 16px", fontStyle: "italic" }}>Approximate global bioprocessing tools market share — consumables + equipment combined.</p>
      <Card T={T} style={{ padding: "20px 22px", marginBottom: 16 }}>
        <PlayerShareBar T={T} />
      </Card>
      <Card T={T} style={{ padding: "18px 22px", marginBottom: 32, borderLeft: `4px solid ${T.capRed}`, background: T.capRed + "08" }}>
        <div style={{ fontSize: 10.5, fontWeight: 800, color: T.capRed, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>The share-gain concern</div>
        <div style={{ fontSize: 13, color: T.text, fontFamily: Fn, lineHeight: 1.75 }}>{playerInsight}</div>
      </Card>

      {/* ── The moat — BLA stickiness ──────────── */}
      <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 26, color: T.text, marginBottom: 14, letterSpacing: "-0.01em" }}>The moat: once you're in, you're in.</div>
      <Card T={T} style={{ padding: "26px 28px", marginBottom: 32, background: "linear-gradient(135deg, " + T.deepBlue + "0D 0%, transparent 100%)", borderLeft: `4px solid ${T.deepBlue}` }}>
        <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 22, color: T.text, lineHeight: 1.25, marginBottom: 14, letterSpacing: "-0.01em" }}>{blaMoat.headline}</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, color: T.deepBlue, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>What gets locked in</div>
            <div style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.75 }}>{blaMoat.detail}</div>
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, color: T.deepBlue, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Why it matters</div>
            <div style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.75 }}>{blaMoat.consequence}</div>
          </div>
        </div>
      </Card>

      {/* ── Catalysts ───────────────────────────── */}
      <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 26, color: T.text, marginBottom: 14, letterSpacing: "-0.01em" }}>Four reasons it might inflect now.</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12, marginBottom: 32 }}>
        {catalysts.map((c, i) => (
          <Card key={i} T={T} style={{ padding: "18px 20px", borderTop: `4px solid ${c.color}` }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 32, color: c.color, lineHeight: 0.9, letterSpacing: "-0.04em" }}>0{i + 1}</div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.text, fontFamily: Fn, marginBottom: 8, lineHeight: 1.3 }}>{c.title}</div>
            <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7 }}>{c.text}</div>
          </Card>
        ))}
      </div>

      {/* ── Conclusion ──────────────────────────── */}
      <Card T={T} style={{ padding: "30px 32px", marginBottom: 16, borderTop: `4px solid ${T.text}` }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 10 }}>What needs to happen</div>
        <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 28, color: T.text, lineHeight: 1.2, marginBottom: 14, letterSpacing: "-0.02em" }}>{conclusion.headline}</div>
        <div style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.8, marginBottom: 20, maxWidth: 880 }}>{conclusion.detail}</div>

        <div style={{ paddingTop: 16, borderTop: `1px solid ${T.border}` }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Things to watch from here</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 8 }}>
            {conclusion.watchpoints.map((w, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "8px 10px", background: T.pillBg, borderRadius: 6 }}>
                <span style={{ color: T.deepBlue, fontWeight: 800, fontFamily: Fn, fontSize: 11, marginTop: 1 }}>→</span>
                <span style={{ fontSize: 12, color: T.text, fontFamily: Fn, lineHeight: 1.5 }}>{w}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div style={{ padding: "12px 16px", background: T.pillBg, borderRadius: 8, fontSize: 11, color: T.textTer, fontFamily: Fn, lineHeight: 1.65, fontStyle: "italic", marginBottom: 24 }}>
        Sources · MS Bioprocessing Tools podcast (May 2026), TMO/DHR/SRT/MRK Q1 2026 prints, Bloomberg / IBES forward consensus, internal Cape Capital research dated 20 May 2026.
      </div>
    </div>
  );
}
