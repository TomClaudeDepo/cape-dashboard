import { useState, useMemo } from "react";
import { Fn } from "../../theme";
import { Card, Pill } from "../shared";
import { useMobile } from "../../hooks/useMobile";
import {
  tamSummary, snapshot, bridge, topDownSeries, techSegments,
  endApps, customers, geoMix, risks, leadingIndicators,
  externalForecasts, bottomLine,
} from "../../data/research-asml-tam";

const toRgba = (hex, alpha) => {
  if (!hex || typeof hex !== "string" || hex[0] !== "#" || hex.length !== 7) return hex;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/* ═══════════════════════════════════════════
   SNAPSHOT
   ═══════════════════════════════════════════ */
function Snapshot({ T, mob }) {
  const cards = [
    { ...snapshot.today, color: T.text,     border: T.border },
    { ...snapshot.guide, color: T.deepBlue, border: T.deepBlue },
    { ...snapshot.base,  color: T.capRed,   border: T.capRed },
    { ...snapshot.bull,  color: T.green,    border: T.green },
  ];
  return (
    <Card T={T} style={{ padding: mob ? "20px 18px" : "28px 32px", borderLeft: `4px solid ${T.capRed}`, marginBottom: 32 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
        <div style={{ fontSize: 10, fontFamily: Fn, color: T.capRed, letterSpacing: "0.15em", fontWeight: 700 }}>TAM 2030 — RECONSTRUCTION</div>
        <Pill T={T} color={T.green} bg={T.greenBg}>Two-method convergence</Pill>
        <Pill T={T} color={T.deepBlue} bg="rgba(29,78,216,0.08)">~3% below consensus</Pill>
      </div>
      <p style={{ fontSize: 13.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.85, margin: 0, maxWidth: 820 }}>{tamSummary}</p>
      <div style={{ display: "grid", gridTemplateColumns: mob ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 14, marginTop: 22, paddingTop: 18, borderTop: "1px solid " + T.border }}>
        {cards.map((c, i) => (
          <div key={i} style={{ paddingLeft: 12, borderLeft: `2px solid ${c.border}` }}>
            <div style={{ fontSize: mob ? 22 : 26, fontWeight: 300, color: c.color, fontFamily: Fn, lineHeight: 1.05, fontFeatureSettings: '"tnum"' }}>{c.value}</div>
            <div style={{ fontSize: 9.5, color: T.textTer, fontFamily: Fn, letterSpacing: "0.08em", marginTop: 6, textTransform: "uppercase", fontWeight: 600 }}>{c.label}</div>
            <div style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, marginTop: 4, lineHeight: 1.45 }}>{c.note}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ═══════════════════════════════════════════
   BRIDGE / WATERFALL — 2025 → 2030
   ═══════════════════════════════════════════ */
function BridgeChart({ T, mob }) {
  const W = mob ? 720 : 980;
  const H = mob ? 420 : 480;
  const padL = 60, padR = 30, padT = 30, padB = mob ? 130 : 110;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const colW = plotW / bridge.length;

  // Compute running totals
  const points = [];
  let run = 0;
  bridge.forEach((b, i) => {
    if (b.type === "anchor") {
      run = b.value;
      points.push({ ...b, bottom: 0, top: b.value });
    } else {
      const bottom = b.delta >= 0 ? run : run + b.delta;
      const top = b.delta >= 0 ? run + b.delta : run;
      points.push({ ...b, bottom, top });
      run = run + b.delta;
    }
  });
  const maxVal = Math.max(...points.map(p => p.top)) * 1.05;
  const yScale = v => padT + plotH - (v / maxVal) * plotH;

  const colorFor = p => {
    if (p.type === "anchor") return T.text;
    if (p.type === "pos") return T.green;
    return T.capRed;
  };

  return (
    <Card T={T} style={{ padding: mob ? "16px 12px" : "24px 24px", marginBottom: 28, overflow: "auto" }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: "block", maxWidth: "100%" }}>
        {/* y-axis gridlines */}
        {[0, 10, 20, 30, 40, 50, 60].filter(v => v <= maxVal).map((v, i) => (
          <g key={i}>
            <line x1={padL} x2={W - padR} y1={yScale(v)} y2={yScale(v)} stroke={T.border} strokeWidth="1" />
            <text x={padL - 10} y={yScale(v) + 4} fontSize="10" fontFamily={Fn} fill={T.textTer} textAnchor="end">€{v}B</text>
          </g>
        ))}

        {/* Bars */}
        {points.map((p, i) => {
          const x = padL + i * colW + colW * 0.15;
          const barW = colW * 0.7;
          const y = yScale(p.top);
          const h = Math.abs(yScale(p.bottom) - yScale(p.top));
          const color = colorFor(p);
          const fill = p.type === "anchor" ? color : toRgba(color, 0.85);

          // Connector to next bar (dashed line at running total)
          const next = points[i + 1];
          const connector = next && p.type !== "anchor" ? (
            <line
              x1={x + barW} x2={padL + (i + 1) * colW + colW * 0.15}
              y1={p.delta >= 0 ? yScale(p.top) : yScale(p.bottom)}
              y2={p.delta >= 0 ? yScale(p.top) : yScale(p.bottom)}
              stroke={T.textTer} strokeWidth="1" strokeDasharray="3,3" opacity="0.6"
            />
          ) : null;

          // Label above bar
          const valStr = p.type === "anchor" ? "€" + p.value.toFixed(1) + "B" : (p.delta > 0 ? "+" : "") + p.delta.toFixed(1);
          const valY = yScale(p.top) - 8;

          return (
            <g key={i}>
              <rect x={x} y={y} width={barW} height={h} fill={fill} rx="2" />
              <text x={x + barW / 2} y={valY} fontSize="11" fontFamily={Fn} fill={color} textAnchor="middle" fontWeight="600">{valStr}</text>
              {connector}

              {/* X-axis label: wrap across two lines */}
              <text x={x + barW / 2} y={padT + plotH + 14} fontSize="9.5" fontFamily={Fn} fill={T.textSec} textAnchor="middle" transform={`rotate(-25 ${x + barW / 2} ${padT + plotH + 14})`}>
                {p.label.length > 32 ? p.label.slice(0, 30) + "…" : p.label}
              </text>
            </g>
          );
        })}

        {/* Baseline */}
        <line x1={padL} x2={W - padR} y1={yScale(0)} y2={yScale(0)} stroke={T.text} strokeWidth="1.5" />
      </svg>
    </Card>
  );
}

/* ═══════════════════════════════════════════
   METHOD RECONCILIATION
   ═══════════════════════════════════════════ */
function MethodReconcile({ T, mob }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 28 }}>
      <Card T={T} style={{ padding: "20px 22px", borderTop: `3px solid ${T.deepBlue}` }}>
        <div style={{ fontSize: 10, fontFamily: Fn, color: T.deepBlue, letterSpacing: "0.15em", fontWeight: 700, marginBottom: 6 }}>METHOD 1 — TOP-DOWN</div>
        <div style={{ fontSize: 14, fontFamily: Fn, color: T.text, fontWeight: 600, marginBottom: 12 }}>Semi rev × intensity × WFE × litho × ASML share</div>
        <div style={{ fontSize: 12, fontFamily: Fn, color: T.textSec, lineHeight: 1.7, marginBottom: 14 }}>
          $1.1T global semi rev (mid) → 19% capex intensity → $157B WFE → 28% litho share → 92% ASML wallet = ~€40B systems + €13B IBM = <strong style={{ color: T.text }}>€53B</strong>.
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, paddingTop: 12, borderTop: "1px solid " + T.border }}>
          <span style={{ fontSize: 28, fontWeight: 300, color: T.deepBlue, fontFamily: Fn, fontFeatureSettings: '"tnum"' }}>€53B</span>
          <span style={{ fontSize: 11, color: T.textTer, fontFamily: Fn }}>2030 mid</span>
        </div>
      </Card>

      <Card T={T} style={{ padding: "20px 22px", borderTop: `3px solid ${T.purple}` }}>
        <div style={{ fontSize: 10, fontFamily: Fn, color: T.purple, letterSpacing: "0.15em", fontWeight: 700, marginBottom: 6 }}>METHOD 2 — BOTTOM-UP</div>
        <div style={{ fontSize: 14, fontFamily: Fn, color: T.text, fontWeight: 600, marginBottom: 12 }}>Fab-by-fab tool aggregation across &gt;40 fabs</div>
        <div style={{ fontSize: 12, fontFamily: Fn, color: T.textSec, lineHeight: 1.7, marginBottom: 14 }}>
          Cumulative 2025-30: 380-520 Low-NA EUV + 35-60 High-NA + 600-850 immersion + 1,000-1,400 dry + 300-450 M&amp;I tools. Six-year revenue €238-326B, run-rate <strong style={{ color: T.text }}>€48-55B</strong> by 2030.
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, paddingTop: 12, borderTop: "1px solid " + T.border }}>
          <span style={{ fontSize: 28, fontWeight: 300, color: T.purple, fontFamily: Fn, fontFeatureSettings: '"tnum"' }}>€48-55B</span>
          <span style={{ fontSize: 11, color: T.textTer, fontFamily: Fn }}>2030 run-rate</span>
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════
   TECH SEGMENTATION — interactive donut + table
   ═══════════════════════════════════════════ */
function TechSegmentation({ T, mob }) {
  const [year, setYear] = useState("y30");
  const [hoverIdx, setHoverIdx] = useState(null);

  const total = useMemo(() => techSegments.reduce((s, x) => s + x[year], 0), [year]);

  const W = mob ? 280 : 320, H = mob ? 280 : 320;
  const cx = W / 2, cy = H / 2, rOuter = mob ? 110 : 130, rInner = mob ? 70 : 85;

  // Compute arcs
  let angle = -Math.PI / 2;
  const arcs = techSegments.map((seg, i) => {
    const v = seg[year];
    const span = (v / total) * Math.PI * 2;
    const start = angle, end = angle + span;
    angle = end;
    const large = span > Math.PI ? 1 : 0;
    const path = [
      `M ${cx + rOuter * Math.cos(start)} ${cy + rOuter * Math.sin(start)}`,
      `A ${rOuter} ${rOuter} 0 ${large} 1 ${cx + rOuter * Math.cos(end)} ${cy + rOuter * Math.sin(end)}`,
      `L ${cx + rInner * Math.cos(end)} ${cy + rInner * Math.sin(end)}`,
      `A ${rInner} ${rInner} 0 ${large} 0 ${cx + rInner * Math.cos(start)} ${cy + rInner * Math.sin(start)}`,
      "Z",
    ].join(" ");
    return { ...seg, path, span, start, end, idx: i };
  });

  return (
    <Card T={T} style={{ padding: mob ? "20px 18px" : "26px 28px", marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, flexWrap: "wrap", gap: 12 }}>
        <div style={{ fontSize: 14, fontFamily: Fn, color: T.text, fontWeight: 600 }}>Revenue by product line</div>
        <div style={{ display: "flex", gap: 4 }}>
          {[
            { id: "y24", label: "2024" },
            { id: "y25", label: "2025" },
            { id: "y30", label: "2030E" },
          ].map(y => (
            <button key={y.id} onClick={() => setYear(y.id)} style={{
              padding: "5px 14px", fontSize: 11, fontFamily: Fn, fontWeight: year === y.id ? 600 : 400,
              background: year === y.id ? T.capRed : T.pillBg, color: year === y.id ? "#fff" : T.textSec,
              border: "1px solid " + (year === y.id ? "transparent" : T.border), borderRadius: 20, cursor: "pointer",
              transition: "all 0.15s",
            }}>{y.label}</button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "auto 1fr", gap: 28, alignItems: "center" }}>
        {/* Donut */}
        <div style={{ position: "relative", width: W, height: H, margin: mob ? "0 auto" : 0 }}>
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
            {arcs.map(a => (
              <path
                key={a.id}
                d={a.path}
                fill={T[a.colorKey]}
                opacity={hoverIdx === null ? 0.88 : (hoverIdx === a.idx ? 1 : 0.35)}
                stroke={T.card}
                strokeWidth="2"
                style={{ cursor: "pointer", transition: "opacity 0.2s" }}
                onMouseEnter={() => setHoverIdx(a.idx)}
                onMouseLeave={() => setHoverIdx(null)}
              />
            ))}
            <text x={cx} y={cy - 6} textAnchor="middle" fontSize="11" fontFamily={Fn} fill={T.textTer} letterSpacing="0.1em">TOTAL</text>
            <text x={cx} y={cy + 16} textAnchor="middle" fontSize="22" fontFamily={Fn} fill={T.text} fontWeight="300" fontFeatureSettings='"tnum"'>€{total.toFixed(1)}B</text>
          </svg>
        </div>

        {/* Legend / table */}
        <div style={{ minWidth: 0 }}>
          {techSegments.map((seg, i) => {
            const v = seg[year];
            const pct = (v / total) * 100;
            const active = hoverIdx === null || hoverIdx === i;
            return (
              <div key={seg.id}
                onMouseEnter={() => setHoverIdx(i)}
                onMouseLeave={() => setHoverIdx(null)}
                style={{
                  display: "grid", gridTemplateColumns: "12px 1fr auto auto", gap: 12, alignItems: "center",
                  padding: "8px 0", borderBottom: i < techSegments.length - 1 ? "1px solid " + T.border : "none",
                  opacity: active ? 1 : 0.4, transition: "opacity 0.2s", cursor: "pointer",
                }}>
                <div style={{ width: 10, height: 10, background: T[seg.colorKey], borderRadius: 2 }} />
                <div>
                  <div style={{ fontSize: 12, fontFamily: Fn, color: T.text, fontWeight: 500 }}>{seg.name}</div>
                  <div style={{ fontSize: 10.5, fontFamily: Fn, color: T.textTer, marginTop: 1 }}>{seg.sub} · {seg.cagr} CAGR · {seg.margin}</div>
                </div>
                <div style={{ fontSize: 12.5, fontFamily: Fn, color: T.text, fontWeight: 500, fontFeatureSettings: '"tnum"', textAlign: "right" }}>€{v.toFixed(1)}B</div>
                <div style={{ fontSize: 10.5, fontFamily: Fn, color: T.textTer, fontFeatureSettings: '"tnum"', textAlign: "right", minWidth: 36 }}>{pct.toFixed(0)}%</div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

/* ═══════════════════════════════════════════
   END APPLICATION TABLE
   ═══════════════════════════════════════════ */
function EndAppTable({ T, mob }) {
  return (
    <Card T={T} style={{ padding: 0, marginBottom: 28, overflow: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: Fn, fontSize: 12, minWidth: 720 }}>
        <thead>
          <tr style={{ background: T.pillBg }}>
            <th style={{ padding: "11px 16px", textAlign: "left", fontSize: 10, color: T.textTer, letterSpacing: "0.08em", fontWeight: 600 }}>END MARKET</th>
            <th style={{ padding: "11px 16px", textAlign: "right", fontSize: 10, color: T.textTer, letterSpacing: "0.08em", fontWeight: 600 }}>2025 ($B)</th>
            <th style={{ padding: "11px 16px", textAlign: "right", fontSize: 10, color: T.textTer, letterSpacing: "0.08em", fontWeight: 600 }}>2030 ($B)</th>
            <th style={{ padding: "11px 16px", textAlign: "right", fontSize: 10, color: T.textTer, letterSpacing: "0.08em", fontWeight: 600 }}>CAGR</th>
            <th style={{ padding: "11px 16px", textAlign: "right", fontSize: 10, color: T.textTer, letterSpacing: "0.08em", fontWeight: 600 }}>LITHO $/END $</th>
            <th style={{ padding: "11px 16px", textAlign: "left", fontSize: 10, color: T.textTer, letterSpacing: "0.08em", fontWeight: 600 }}>NOTE</th>
          </tr>
        </thead>
        <tbody>
          {endApps.map((e, i) => (
            <tr key={i} style={{ borderTop: "1px solid " + T.border }}>
              <td style={{ padding: "12px 16px", color: T.text, fontWeight: 500 }}>
                <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2, background: T[e.colorKey], marginRight: 10, verticalAlign: "middle" }} />
                {e.name}
              </td>
              <td style={{ padding: "12px 16px", color: T.textSec, textAlign: "right", fontFeatureSettings: '"tnum"' }}>{e.y25}</td>
              <td style={{ padding: "12px 16px", color: T.text, textAlign: "right", fontWeight: 500, fontFeatureSettings: '"tnum"' }}>{e.y30}</td>
              <td style={{ padding: "12px 16px", color: T.green, textAlign: "right", fontFeatureSettings: '"tnum"' }}>{e.cagr}</td>
              <td style={{ padding: "12px 16px", color: T.textSec, textAlign: "right", fontFeatureSettings: '"tnum"' }}>{e.intensity}</td>
              <td style={{ padding: "12px 16px", color: T.textTer, fontSize: 11.5 }}>{e.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

/* ═══════════════════════════════════════════
   CUSTOMER CONCENTRATION TABLE
   ═══════════════════════════════════════════ */
function CustomerTable({ T, mob }) {
  const [sortBy, setSortBy] = useState("default");

  const toneColor = t => t === "pos" ? T.green : t === "neg" ? T.capRed : T.textSec;

  const sorted = useMemo(() => {
    if (sortBy === "default") return customers;
    return [...customers].sort((a, b) => {
      if (sortBy === "wallet") {
        const av = parseFloat(a.wallet); const bv = parseFloat(b.wallet);
        return bv - av;
      }
      return 0;
    });
  }, [sortBy]);

  return (
    <Card T={T} style={{ padding: 0, marginBottom: 28, overflow: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: Fn, fontSize: 11.5, minWidth: 960 }}>
        <thead>
          <tr style={{ background: T.pillBg }}>
            {["CUSTOMER", "REGION", "2025 CAPEX", "2026-28 AVG", "CUM 2025-30", "LITHO % CAPEX", "ASML WALLET", "NODE ROADMAP", "CONF"].map((h, i) => (
              <th key={i} style={{ padding: "11px 14px", textAlign: i >= 2 && i <= 6 ? "right" : "left", fontSize: 9.5, color: T.textTer, letterSpacing: "0.08em", fontWeight: 600, whiteSpace: "nowrap" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((c, i) => (
            <tr key={i} style={{ borderTop: "1px solid " + T.border }}>
              <td style={{ padding: "13px 14px", color: T.text, fontWeight: 600, whiteSpace: "nowrap" }}>
                <span style={{ display: "inline-block", width: 4, height: 28, borderRadius: 2, background: toneColor(c.tone), marginRight: 10, verticalAlign: "middle" }} />
                {c.name}
              </td>
              <td style={{ padding: "13px 14px", color: T.textSec, whiteSpace: "nowrap" }}>{c.region}</td>
              <td style={{ padding: "13px 14px", color: T.textSec, textAlign: "right", fontFeatureSettings: '"tnum"' }}>{c.capex25}</td>
              <td style={{ padding: "13px 14px", color: T.text, textAlign: "right", fontWeight: 500, fontFeatureSettings: '"tnum"' }}>{c.capex2628}</td>
              <td style={{ padding: "13px 14px", color: T.text, textAlign: "right", fontWeight: 500, fontFeatureSettings: '"tnum"' }}>{c.cum2530}</td>
              <td style={{ padding: "13px 14px", color: T.deepBlue, textAlign: "right", fontFeatureSettings: '"tnum"' }}>{c.lithoPct}</td>
              <td style={{ padding: "13px 14px", color: T.capRed, textAlign: "right", fontFeatureSettings: '"tnum"', fontWeight: 500 }}>{c.wallet}</td>
              <td style={{ padding: "13px 14px", color: T.textSec, fontSize: 11 }}>{c.nodes}</td>
              <td style={{ padding: "13px 14px", color: T.textTer, fontSize: 10.5, textAlign: "center" }}>{c.confidence}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ padding: "10px 16px", borderTop: "1px solid " + T.border, fontSize: 10.5, color: T.textTer, fontFamily: Fn, lineHeight: 1.6 }}>
        Note column on first row of each entity colour-coded: green = positive driver, red = structural drag, grey = neutral. Cumulative capex and litho % are author estimates derived from 10-K/20-F filings, earnings calls, and TrendForce capex tracking.
      </div>
    </Card>
  );
}

/* ═══════════════════════════════════════════
   CUSTOMER NOTES (rich text below table)
   ═══════════════════════════════════════════ */
function CustomerNotes({ T, mob }) {
  const featured = customers.filter(c => ["TSMC", "Intel Foundry", "SK Hynix", "Samsung Foundry"].includes(c.name));
  return (
    <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 14, marginBottom: 28 }}>
      {featured.map((c, i) => {
        const accent = c.tone === "pos" ? T.green : c.tone === "neg" ? T.capRed : T.textSec;
        return (
          <Card key={i} T={T} style={{ padding: "18px 20px", borderLeft: `3px solid ${accent}` }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ fontSize: 14, fontFamily: Fn, color: T.text, fontWeight: 600 }}>{c.name}</div>
              <div style={{ fontSize: 10, fontFamily: Fn, color: accent, letterSpacing: "0.08em", fontWeight: 600 }}>{c.wallet} ASML WALLET</div>
            </div>
            <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.65 }}>{c.note}</div>
          </Card>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════
   GEOGRAPHIC SHIFT
   ═══════════════════════════════════════════ */
function GeoMix({ T, mob }) {
  return (
    <Card T={T} style={{ padding: 0, marginBottom: 28, overflow: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: Fn, fontSize: 12, minWidth: 720 }}>
        <thead>
          <tr style={{ background: T.pillBg }}>
            <th style={{ padding: "11px 16px", textAlign: "left", fontSize: 10, color: T.textTer, letterSpacing: "0.08em", fontWeight: 600 }}>REGION</th>
            <th style={{ padding: "11px 16px", textAlign: "right", fontSize: 10, color: T.textTer, letterSpacing: "0.08em", fontWeight: 600 }}>2024 SHARE</th>
            <th style={{ padding: "11px 16px", textAlign: "right", fontSize: 10, color: T.textTer, letterSpacing: "0.08em", fontWeight: 600 }}>2026 EXPECTED</th>
            <th style={{ padding: "11px 16px", textAlign: "right", fontSize: 10, color: T.textTer, letterSpacing: "0.08em", fontWeight: 600 }}>2030 MID</th>
            <th style={{ padding: "11px 16px", textAlign: "left", fontSize: 10, color: T.textTer, letterSpacing: "0.08em", fontWeight: 600 }}>POLICY DRIVERS</th>
          </tr>
        </thead>
        <tbody>
          {geoMix.map((g, i) => {
            const delta = g.y30 - g.y24;
            const tone = delta > 0 ? T.green : delta < 0 ? T.capRed : T.textSec;
            return (
              <tr key={i} style={{ borderTop: "1px solid " + T.border }}>
                <td style={{ padding: "13px 16px", color: T.text, fontWeight: 600 }}>{g.region}</td>
                <td style={{ padding: "13px 16px", color: T.textSec, textAlign: "right", fontFeatureSettings: '"tnum"' }}>{g.y24}%</td>
                <td style={{ padding: "13px 16px", color: T.textSec, textAlign: "right", fontFeatureSettings: '"tnum"' }}>{g.y26}%</td>
                <td style={{ padding: "13px 16px", color: tone, textAlign: "right", fontWeight: 600, fontFeatureSettings: '"tnum"' }}>
                  {g.y30}% <span style={{ fontSize: 10, fontWeight: 400, marginLeft: 4 }}>({delta > 0 ? "+" : ""}{delta})</span>
                </td>
                <td style={{ padding: "13px 16px", color: T.textTer, fontSize: 11 }}>{g.policy}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}

/* ═══════════════════════════════════════════
   RISK SCENARIOS
   ═══════════════════════════════════════════ */
function RiskCards({ T, mob }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 14, marginBottom: 28 }}>
      {risks.map((r, i) => (
        <Card key={i} T={T} style={{ padding: "20px 22px", borderTop: `3px solid ${T[r.color]}` }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ fontSize: 14, fontFamily: Fn, color: T.text, fontWeight: 600 }}>{r.title}</div>
            <div style={{ fontSize: 10, fontFamily: Fn, color: T[r.color], letterSpacing: "0.08em", fontWeight: 600 }}>{r.probability}</div>
          </div>
          <div style={{ display: "flex", gap: 18, paddingBottom: 12, marginBottom: 12, borderBottom: "1px solid " + T.border }}>
            <div>
              <div style={{ fontSize: 9.5, color: T.textTer, fontFamily: Fn, letterSpacing: "0.08em", marginBottom: 4 }}>REVENUE HIT</div>
              <div style={{ fontSize: 16, color: T[r.color], fontFamily: Fn, fontWeight: 500, fontFeatureSettings: '"tnum"' }}>{r.revHit}</div>
            </div>
            <div>
              <div style={{ fontSize: 9.5, color: T.textTer, fontFamily: Fn, letterSpacing: "0.08em", marginBottom: 4 }}>2030 TAM LANDING</div>
              <div style={{ fontSize: 16, color: T.text, fontFamily: Fn, fontWeight: 500, fontFeatureSettings: '"tnum"' }}>{r.landingTAM}</div>
            </div>
          </div>
          <div style={{ fontSize: 11.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.65 }}>{r.body}</div>
        </Card>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   LEADING INDICATORS DASHBOARD
   ═══════════════════════════════════════════ */
function IndicatorsTable({ T, mob }) {
  return (
    <Card T={T} style={{ padding: 0, marginBottom: 28, overflow: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: Fn, fontSize: 12, minWidth: 720 }}>
        <thead>
          <tr style={{ background: T.pillBg }}>
            <th style={{ padding: "11px 16px", textAlign: "left", fontSize: 10, color: T.textTer, letterSpacing: "0.08em", fontWeight: 600, width: 40 }}>#</th>
            <th style={{ padding: "11px 16px", textAlign: "left", fontSize: 10, color: T.textTer, letterSpacing: "0.08em", fontWeight: 600 }}>METRIC</th>
            <th style={{ padding: "11px 16px", textAlign: "left", fontSize: 10, color: T.textTer, letterSpacing: "0.08em", fontWeight: 600 }}>SOURCE</th>
            <th style={{ padding: "11px 16px", textAlign: "left", fontSize: 10, color: T.textTer, letterSpacing: "0.08em", fontWeight: 600 }}>CADENCE</th>
            <th style={{ padding: "11px 16px", textAlign: "center", fontSize: 10, color: T.textTer, letterSpacing: "0.08em", fontWeight: 600 }}>NTM CORR</th>
            <th style={{ padding: "11px 16px", textAlign: "left", fontSize: 10, color: T.textTer, letterSpacing: "0.08em", fontWeight: 600 }}>NOTE</th>
          </tr>
        </thead>
        <tbody>
          {leadingIndicators.map((l, i) => {
            const corrColor = l.correlation === "High" ? T.green : l.correlation === "Med-Hi" ? T.deepBlue : T.textSec;
            return (
              <tr key={i} style={{ borderTop: "1px solid " + T.border }}>
                <td style={{ padding: "12px 16px", color: T.textTer, fontFeatureSettings: '"tnum"' }}>{i + 1}</td>
                <td style={{ padding: "12px 16px", color: T.text, fontWeight: 500 }}>{l.metric}</td>
                <td style={{ padding: "12px 16px", color: T.textSec, fontSize: 11.5 }}>{l.source}</td>
                <td style={{ padding: "12px 16px", color: T.textSec, fontSize: 11.5 }}>{l.cadence}</td>
                <td style={{ padding: "12px 16px", textAlign: "center" }}>
                  <span style={{ fontSize: 10.5, fontFamily: Fn, color: corrColor, fontWeight: 600, padding: "3px 10px", borderRadius: 12, background: toRgba(corrColor === T.green ? "#047857" : corrColor === T.deepBlue ? "#1D4ED8" : "#475569", 0.10) }}>
                    {l.correlation}
                  </span>
                </td>
                <td style={{ padding: "12px 16px", color: T.textTer, fontSize: 11 }}>{l.note}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}

/* ═══════════════════════════════════════════
   EXTERNAL FORECASTS VALIDATION
   ═══════════════════════════════════════════ */
function ForecastTable({ T, mob }) {
  return (
    <Card T={T} style={{ padding: 0, marginBottom: 28, overflow: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: Fn, fontSize: 12, minWidth: 600 }}>
        <thead>
          <tr style={{ background: T.pillBg }}>
            <th style={{ padding: "11px 16px", textAlign: "left", fontSize: 10, color: T.textTer, letterSpacing: "0.08em", fontWeight: 600 }}>SOURCE</th>
            <th style={{ padding: "11px 16px", textAlign: "right", fontSize: 10, color: T.textTer, letterSpacing: "0.08em", fontWeight: 600 }}>2030 TAM</th>
            <th style={{ padding: "11px 16px", textAlign: "left", fontSize: 10, color: T.textTer, letterSpacing: "0.08em", fontWeight: 600 }}>DATE</th>
            <th style={{ padding: "11px 16px", textAlign: "left", fontSize: 10, color: T.textTer, letterSpacing: "0.08em", fontWeight: 600 }}>NOTE</th>
          </tr>
        </thead>
        <tbody>
          {externalForecasts.map((e, i) => {
            const isCape = e.source.startsWith("Cape");
            return (
              <tr key={i} style={{ borderTop: "1px solid " + T.border, background: isCape ? toRgba(T.capRed, 0.05) : "transparent" }}>
                <td style={{ padding: "12px 16px", color: isCape ? T.capRed : T.text, fontWeight: isCape ? 600 : 500 }}>{e.source}</td>
                <td style={{ padding: "12px 16px", color: isCape ? T.capRed : T.text, textAlign: "right", fontWeight: isCape ? 600 : 500, fontFeatureSettings: '"tnum"' }}>{e.tam2030}</td>
                <td style={{ padding: "12px 16px", color: T.textTer, fontSize: 11.5 }}>{e.date}</td>
                <td style={{ padding: "12px 16px", color: T.textSec, fontSize: 11.5 }}>{e.note}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}

/* ═══════════════════════════════════════════
   MAIN TAB EXPORT
   ═══════════════════════════════════════════ */
export default function TAMTab({ T }) {
  const mob = useMobile();

  const sectionNav = [
    { id: "tam-snapshot", label: "Snapshot" },
    { id: "tam-bridge",   label: "Bridge 2025→2030" },
    { id: "tam-method",   label: "Method reconcile" },
    { id: "tam-tech",     label: "Tech segmentation" },
    { id: "tam-endapp",   label: "End applications" },
    { id: "tam-customer", label: "Customer concentration" },
    { id: "tam-geo",      label: "Geography & policy" },
    { id: "tam-risks",    label: "Risk scenarios" },
    { id: "tam-indicators",label: "Leading indicators" },
    { id: "tam-validate", label: "Versus consensus" },
  ];

  const scroll = id => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      {/* Sub-nav */}
      <div style={{ display: "flex", gap: 6, marginBottom: 28, flexWrap: "wrap", overflow: "auto", WebkitOverflowScrolling: "touch" }}>
        {sectionNav.map(s => (
          <button key={s.id} onClick={() => scroll(s.id)} style={{
            background: T.pillBg, border: "1px solid " + T.border, borderRadius: 20, padding: "5px 14px",
            fontFamily: Fn, fontSize: 11, color: T.textSec, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
            transition: "all 0.15s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = T.capRed; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "transparent"; }}
            onMouseLeave={e => { e.currentTarget.style.background = T.pillBg; e.currentTarget.style.color = T.textSec; e.currentTarget.style.borderColor = T.border; }}>
            {s.label}
          </button>
        ))}
      </div>

      <div id="tam-snapshot" style={{ scrollMarginTop: 80 }}>
        <Snapshot T={T} mob={mob} />
      </div>

      <div id="tam-bridge" style={{ scrollMarginTop: 80, borderTop: "1px solid " + T.border, paddingTop: 32, marginBottom: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.green, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 700 }}>2025 → 2030 BRIDGE</div>
          <h2 style={{ fontFamily: Fn, fontSize: mob ? 20 : 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 8 }}>Where the €17B of uplift comes from</h2>
          <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.7, fontFamily: Fn, margin: 0, maxWidth: 760 }}>Node migration is the single largest driver. Capacity expansion and Installed Base Management compounding are the most predictable. High-NA ASP mix is the lowest-confidence line because TSMC has publicly deferred High-NA to post-A14, pushing volume to 2028-2030.</p>
        </div>
        <BridgeChart T={T} mob={mob} />
      </div>

      <div id="tam-method" style={{ scrollMarginTop: 80, borderTop: "1px solid " + T.border, paddingTop: 32, marginBottom: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.deepBlue, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 700 }}>METHODOLOGY</div>
          <h2 style={{ fontFamily: Fn, fontSize: mob ? 20 : 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 8 }}>Two independent constructions converge at €50-53B</h2>
          <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.7, fontFamily: Fn, margin: 0, maxWidth: 760 }}>The top-down approach decomposes ASML's demand into industry building blocks. The bottom-up approach aggregates tool slots fab-by-fab. They are constructed independently from primary sources; convergence is meaningful confirmation, not a coincidence.</p>
        </div>
        <MethodReconcile T={T} mob={mob} />
      </div>

      <div id="tam-tech" style={{ scrollMarginTop: 80, borderTop: "1px solid " + T.border, paddingTop: 32, marginBottom: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.purple, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 700 }}>TECHNOLOGY SEGMENTATION</div>
          <h2 style={{ fontFamily: Fn, fontSize: mob ? 20 : 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 8 }}>EUV grows from 36% to 55% of revenue mix</h2>
          <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.7, fontFamily: Fn, margin: 0, maxWidth: 760 }}>Low-NA EUV remains the largest line through 2030. High-NA grows fastest but stays small in absolute terms (~€8B). Installed Base Management is the structurally under-appreciated line: counter-cyclical, gross-margin accretive, and compounding on the installed fleet.</p>
        </div>
        <TechSegmentation T={T} mob={mob} />
      </div>

      <div id="tam-endapp" style={{ scrollMarginTop: 80, borderTop: "1px solid " + T.border, paddingTop: 32, marginBottom: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.capRed, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 700 }}>END APPLICATION DEMAND</div>
          <h2 style={{ fontFamily: Fn, fontSize: mob ? 20 : 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 8 }}>AI compute is the marginal driver</h2>
          <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.7, fontFamily: Fn, margin: 0, maxWidth: 760 }}>Servers, datacentre and AI compute alone account for ~60-70% of the 2030 revenue uplift. Automotive and industrial deliver wafer volume but consume KrF and i-line tools — litho-intensity poor. The lithography dollar follows the AI dollar, not the wafer.</p>
        </div>
        <EndAppTable T={T} mob={mob} />
      </div>

      <div id="tam-customer" style={{ scrollMarginTop: 80, borderTop: "1px solid " + T.border, paddingTop: 32, marginBottom: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.capRed, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 700 }}>CUSTOMER CONCENTRATION</div>
          <h2 style={{ fontFamily: Fn, fontSize: mob ? 20 : 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 8 }}>The order book is six customers</h2>
          <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.7, fontFamily: Fn, margin: 0, maxWidth: 760 }}>TSMC alone is ~40% of the 2025-2030 cumulative ASML revenue. Combined with Samsung Memory, SK Hynix, Intel Foundry, Samsung Foundry and Micron, the top six are &gt;75% of the order book. The remaining customers matter for unit volume; the top six matter for revenue and margin trajectory.</p>
        </div>
        <CustomerTable T={T} mob={mob} />
        <CustomerNotes T={T} mob={mob} />
      </div>

      <div id="tam-geo" style={{ scrollMarginTop: 80, borderTop: "1px solid " + T.border, paddingTop: 32, marginBottom: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.orange, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 700 }}>GEOGRAPHY POST EXPORT CONTROLS</div>
          <h2 style={{ fontFamily: Fn, fontSize: mob ? 20 : 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 8 }}>China halved; Taiwan and US doubled</h2>
          <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.7, fontFamily: Fn, margin: 0, maxWidth: 760 }}>Q1 2026 China share of 19% is more representative of post-control demand than the 41% peak. The painful adjustment has already happened; remaining downside is policy-driven (MATCH Act) and structural (Chinese domestic equipment substitution at mature nodes), both quantifiable at €2-4B of incremental 2030 risk.</p>
        </div>
        <GeoMix T={T} mob={mob} />
      </div>

      <div id="tam-risks" style={{ scrollMarginTop: 80, borderTop: "1px solid " + T.border, paddingTop: 32, marginBottom: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.capRed, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 700 }}>QUANTIFIED RISK SCENARIOS</div>
          <h2 style={{ fontFamily: Fn, fontSize: mob ? 20 : 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 8 }}>The bear case is €42-46B, not €30B</h2>
          <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.7, fontFamily: Fn, margin: 0, maxWidth: 760 }}>Each downside scenario quantified separately. The combined bear case stacking three risks lands at ~€42-44B — at or just below ASML's own CMD low end, and corresponds to multiple compression to ~12-14x forward EV/EBITDA from current ~22-24x.</p>
        </div>
        <RiskCards T={T} mob={mob} />
      </div>

      <div id="tam-indicators" style={{ scrollMarginTop: 80, borderTop: "1px solid " + T.border, paddingTop: 32, marginBottom: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.green, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 700 }}>LEADING INDICATORS DASHBOARD</div>
          <h2 style={{ fontFamily: Fn, fontSize: mob ? 20 : 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 8 }}>Ten signals to track quarterly</h2>
          <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.7, fontFamily: Fn, margin: 0, maxWidth: 760 }}>ASML discontinued quarterly bookings disclosure in Q1 2026 — removing what was historically the highest-correlation indicator. The metrics below are the imperfect substitutes, in approximate order of NTM revenue correlation.</p>
        </div>
        <IndicatorsTable T={T} mob={mob} />
      </div>

      <div id="tam-validate" style={{ scrollMarginTop: 80, borderTop: "1px solid " + T.border, paddingTop: 32, marginBottom: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.deepBlue, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 700 }}>VERSUS EXTERNAL FORECASTS</div>
          <h2 style={{ fontFamily: Fn, fontSize: mob ? 20 : 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 8 }}>~3% below the consensus anchor</h2>
          <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.7, fontFamily: Fn, margin: 0, maxWidth: 760 }}>Yole's €52B-implied figure aligns with the bottom-up convergence. The Morningstar €54B is the lazy midpoint of company guidance. Our €50-52B base case is the data-anchored answer, not the guidance-anchored one.</p>
        </div>
        <ForecastTable T={T} mob={mob} />
      </div>

      <Card T={T} style={{ padding: mob ? "22px 20px" : "28px 32px", borderLeft: `4px solid ${T.green}`, marginBottom: 24 }}>
        <div style={{ fontSize: 10, fontFamily: Fn, color: T.green, letterSpacing: "0.15em", marginBottom: 10, fontWeight: 700 }}>NET</div>
        <p style={{ fontSize: 14, color: T.textSec, fontFamily: Fn, lineHeight: 1.85, margin: 0, maxWidth: 820 }}>{bottomLine}</p>
      </Card>

      <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, lineHeight: 1.7, maxWidth: 760, paddingBottom: 20 }}>
        Sources: ASML CMD 2024 Exhibit 99.7 (SEC 6-K, Nov 14 2024); ASML Q4 2025 6-K (Jan 28 2026); ASML Q1 2026 6-K (Apr 15 2026); SEMI Year-End Equipment Forecast (Dec 4, 2025); Yole "Status of WFE 2025" (Aug 2025); TSMC 20-F FY2025 + Q4 2025 earnings; Samsung Electronics Q4 2025 earnings; Intel 10-Q Q2 2025; SK Hynix Q4 2025 earnings; Micron FQ1 2026 earnings; SMIC 20-F; CXMT STAR Market prospectus (Dec 2025); TrendForce; Bloomberg consensus screens. All forward figures are author estimates; ranges reflect base case modelling. For informational purposes only.
      </div>
    </div>
  );
}
