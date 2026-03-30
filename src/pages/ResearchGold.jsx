import { useState, useRef, useEffect } from "react";
import { Fn } from "../theme";
import { Card, Label, Pill } from "../components/shared";
import {
  goldSnapshot, heroStats, rallyPhases, demandDecomposition,
  centralBankTable, etfFlowsTable, specPositioningTable,
  drawdownTimeline, drawdownComparison, physicalPaperDivergence,
  centralBankRegimeShift, drawdownMechanics, specVsPriceData,
  priceChartData, conclusion,
} from "../data/research-gold";

/* ─── Colour helpers ─── */
const gold = "#D4930D";
const goldBg = "rgba(212,147,13,0.08)";
const goldBgStrong = "rgba(212,147,13,0.14)";

/* ─── SVG mini-charts ─── */
function PriceChart({ data, T }) {
  const W = 700, H = 260, pad = { t: 20, r: 20, b: 32, l: 50 };
  const w = W - pad.l - pad.r, h = H - pad.t - pad.b;
  const prices = data.map(d => d.price);
  const min = Math.min(...prices) * 0.92, max = Math.max(...prices) * 1.04;
  const x = (i) => pad.l + (i / (data.length - 1)) * w;
  const y = (v) => pad.t + h - ((v - min) / (max - min)) * h;
  const pts = data.map((d, i) => `${x(i)},${y(d.price)}`).join(" ");
  const areaPath = `M${x(0)},${y(data[0].price)} ${data.map((d, i) => `L${x(i)},${y(d.price)}`).join(" ")} L${x(data.length - 1)},${pad.t + h} L${x(0)},${pad.t + h} Z`;

  const [hov, setHov] = useState(-1);
  const gridLines = [2000, 3000, 4000, 5000];

  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>Gold price — January 2023 to March 2026</div>
      <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 12 }}>XAU/USD spot price, key inflection points</div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }} onMouseLeave={() => setHov(-1)}>
        {gridLines.map((v, i) => y(v) >= pad.t && y(v) <= pad.t + h ? (
          <g key={i}>
            <line x1={pad.l} x2={W - pad.r} y1={y(v)} y2={y(v)} stroke={T.border} strokeWidth="0.5" />
            <text x={pad.l - 6} y={y(v) + 3} textAnchor="end" fontSize="9" fill={T.textTer} fontFamily={Fn}>${(v / 1000).toFixed(0)}k</text>
          </g>
        ) : null)}
        <defs>
          <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={gold} stopOpacity="0.25" />
            <stop offset="100%" stopColor={gold} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#goldGrad)" />
        <polyline fill="none" stroke={gold} strokeWidth="2" points={pts} strokeLinejoin="round" />
        {data.map((d, i) => (
          <g key={i} onMouseEnter={() => setHov(i)} style={{ cursor: "pointer" }}>
            <circle cx={x(i)} cy={y(d.price)} r={hov === i ? 5 : 2.5} fill={gold} opacity={hov === i ? 1 : 0.6} style={{ transition: "all 0.15s" }} />
            {hov === i && (
              <g>
                <rect x={x(i) - 48} y={y(d.price) - 36} width={96} height={28} rx={6} fill={T.text === "#0F172A" ? "rgba(15,23,42,0.92)" : "rgba(250,250,250,0.92)"} />
                <text x={x(i)} y={y(d.price) - 18} textAnchor="middle" fontSize="10" fontFamily={Fn} fontWeight="600" fill={T.text === "#0F172A" ? "#fff" : "#000"}>
                  ${d.price.toLocaleString()} · {d.date}
                </text>
              </g>
            )}
          </g>
        ))}
        {data.map((d, i) => i % 4 === 0 ? (
          <text key={`l${i}`} x={x(i)} y={H - 6} textAnchor="middle" fontSize="8" fill={T.textTer} fontFamily={Fn}>{d.date}</text>
        ) : null)}
      </svg>
    </div>
  );
}

function DualAxisChart({ data, T }) {
  const W = 640, H = 240, pad = { t: 20, r: 55, b: 32, l: 50 };
  const w = W - pad.l - pad.r, h = H - pad.t - pad.b;
  const maxLongs = 900, minLongs = 200;
  const maxPrice = 5500, minPrice = 2000;
  const x = (i) => pad.l + (i / (data.length - 1)) * w;
  const yL = (v) => pad.t + h - ((v - minLongs) / (maxLongs - minLongs)) * h;
  const yR = (v) => pad.t + h - ((v - minPrice) / (maxPrice - minPrice)) * h;
  const bw = 38;

  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>Speculative positioning vs gold price</div>
      <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 12 }}>Managed money net longs (bars) vs XAU/USD (line) — correlation turned negative</div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }}>
        {[300, 500, 700].map((v, i) => (
          <g key={i}>
            <line x1={pad.l} x2={W - pad.r} y1={yL(v)} y2={yL(v)} stroke={T.border} strokeWidth="0.5" />
            <text x={pad.l - 6} y={yL(v) + 3} textAnchor="end" fontSize="8" fill={T.textTer} fontFamily={Fn}>{v}t</text>
          </g>
        ))}
        {[2500, 3500, 4500].map((v, i) => (
          <text key={`r${i}`} x={W - pad.r + 6} y={yR(v) + 3} textAnchor="start" fontSize="8" fill={gold} fontFamily={Fn}>${(v / 1000).toFixed(1)}k</text>
        ))}
        {data.map((d, i) => {
          const barH = ((d.longs - minLongs) / (maxLongs - minLongs)) * h;
          return (
            <g key={i}>
              <rect x={x(i) - bw / 2} y={pad.t + h - barH} width={bw} height={barH} rx={4} fill={T.deepBlue} opacity={0.25} />
              <text x={x(i)} y={pad.t + h - barH - 5} textAnchor="middle" fontSize="9" fontWeight="600" fill={T.deepBlue} fontFamily={Fn}>{d.longs}</text>
              <text x={x(i)} y={H - 6} textAnchor="middle" fontSize="8" fill={T.textTer} fontFamily={Fn}>{d.date}</text>
            </g>
          );
        })}
        <polyline fill="none" stroke={gold} strokeWidth="2.5" strokeLinejoin="round"
          points={data.map((d, i) => `${x(i)},${yR(d.price)}`).join(" ")} />
        {data.map((d, i) => (
          <circle key={`c${i}`} cx={x(i)} cy={yR(d.price)} r={3} fill={gold} />
        ))}
        <rect x={pad.l} y={H - 6} width={10} height={3} rx={1.5} fill={T.deepBlue} opacity={0.35} />
        <text x={pad.l + 14} y={H - 3} fontSize="8" fill={T.textTer} fontFamily={Fn}>Net longs (t)</text>
        <line x1={pad.l + 90} y1={H - 5} x2={pad.l + 104} y2={H - 5} stroke={gold} strokeWidth="2" />
        <text x={pad.l + 108} y={H - 3} fontSize="8" fill={T.textTer} fontFamily={Fn}>Gold price</text>
      </svg>
    </div>
  );
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
                  color: ci === highlightCol ? gold : T.textSec, fontWeight: ci === highlightCol ? 600 : 400,
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

/* ─── Timeline component ─── */
function Timeline({ events, T }) {
  return (
    <div style={{ position: "relative", paddingLeft: 28 }}>
      <div style={{ position: "absolute", left: 8, top: 4, bottom: 4, width: 2, background: T.border, borderRadius: 1 }} />
      {events.map((ev, i) => {
        const isNeg = ev.price?.startsWith("−") || ev.price?.startsWith("-");
        const isPos = ev.price?.startsWith("+");
        const dotColor = isNeg ? T.capRed : isPos ? T.green : gold;
        return (
          <div key={i} style={{ position: "relative", marginBottom: 20, paddingLeft: 16 }}>
            <div style={{
              position: "absolute", left: -22, top: 5, width: 12, height: 12,
              borderRadius: "50%", background: dotColor, border: "2px solid " + T.card,
              boxShadow: `0 0 0 2px ${dotColor}40`,
            }} />
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: T.textTer, fontFamily: Fn, minWidth: 56 }}>{ev.date}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn }}>{ev.event}</span>
              {ev.price && <Pill T={T} color={isNeg ? T.capRed : isPos ? T.green : gold} bg={isNeg ? T.redBg : isPos ? T.greenBg : goldBg}>{ev.price}</Pill>}
            </div>
            <p style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, margin: 0, paddingLeft: 66 }}>{ev.detail}</p>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Expandable section ─── */
function Expandable({ title, children, defaultOpen, T }) {
  const [open, setOpen] = useState(!!defaultOpen);
  const innerRef = useRef(null);
  const [maxH, setMaxH] = useState(0);
  useEffect(() => { if (innerRef.current) setMaxH(innerRef.current.scrollHeight + 40); }, [open]);
  return (
    <div style={{
      background: T.card, border: "1px solid " + (open ? gold + "50" : T.border),
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
  return <div id={`gold-${id}`} style={{ scrollMarginTop: 80 }}>{children}</div>;
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function ResearchGold({ T }) {
  const scrollTo = id => {
    const el = document.getElementById("gold-" + id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const colorMap = { orange: T.orange, capRed: T.capRed, deepBlue: T.deepBlue, green: T.green, purple: T.purple };
  const bgMap = { orange: "rgba(234,88,12,0.08)", capRed: T.redBg, deepBlue: "rgba(29,78,216,0.08)", green: T.greenBg, purple: "rgba(67,56,202,0.08)" };

  return (
    <div>
      {/* ─── Header ─── */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <Pill T={T} color={gold} bg={goldBg}>THEMATIC RESEARCH</Pill>
          <Pill T={T}>Commodities</Pill>
          <Pill T={T}>March 2026</Pill>
        </div>
        <h1 style={{ fontFamily: Fn, fontSize: 32, fontWeight: 300, letterSpacing: "-0.03em", color: T.text, margin: 0, lineHeight: 1.3 }}>
          Gold <span style={{ color: T.textTer, fontWeight: 400 }}>(XAU/USD)</span>
        </h1>
        <p style={{ fontSize: 14, color: T.textSec, marginTop: 10, fontFamily: Fn, lineHeight: 1.7, maxWidth: 720 }}>
          Gold's parabolic bull run, structural demand shift, and the March 2026 liquidity crisis. A 205% rally underpinned by a regime shift in central bank reserve management — then stress-tested by a 24% drawdown that confirmed the structural bid.
        </p>
      </div>

      {/* ─── Snapshot strip ─── */}
      <Card T={T} style={{ marginBottom: 24, padding: "20px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: T.textTer, fontFamily: Fn, letterSpacing: "0.05em" }}>XAU/USD</span>
            <span style={{ fontSize: 28, fontWeight: 300, fontFamily: Fn, color: T.text }}>{goldSnapshot.price}</span>
            <Pill T={T} color={T.capRed} bg={T.redBg}>{goldSnapshot.drawdown} from ATH</Pill>
          </div>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {[
              { l: "ATH", v: goldSnapshot.ath },
              { l: "Rally", v: goldSnapshot.rallyReturn },
              { l: "CB Buying", v: "4,088t" },
              { l: "ETF AUM", v: goldSnapshot.etfAUM },
            ].map((m, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: gold, fontFamily: Fn }}>{m.v}</div>
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
            <div style={{ fontSize: 22, fontWeight: 300, fontFamily: Fn, color: s.color === "orange" ? gold : T[s.color] || T.text, lineHeight: 1.2 }}>{s.value}</div>
            <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 6, lineHeight: 1.4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ─── Price chart ─── */}
      <Section id="chart">
        <Card T={T} style={{ marginBottom: 32, padding: "24px 28px" }}>
          <PriceChart data={priceChartData} T={T} />
        </Card>
      </Section>

      {/* ─── Rally Phases ─── */}
      <Section id="phases">
        <Label T={T}>From $1,830 to $5,595 — anatomy of a 205% rally</Label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 16 }}>
          {rallyPhases.map((p, i) => (
            <div key={i} onClick={() => scrollTo("phase-" + p.num)} style={{
              background: T.card, border: "1px solid " + T.border, borderRadius: T.radius,
              padding: "22px 20px", cursor: "pointer", boxShadow: T.shadow, transition: "all 0.2s",
              borderLeft: `3px solid ${p.color === "orange" ? gold : colorMap[p.color] || T.capRed}`,
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = T.shadowLg }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = T.shadow }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 10, color: T.textTer, fontFamily: Fn }}>{p.num}</span>
                <span style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn }}>{p.title}</span>
                <Pill T={T} color={p.color === "orange" ? gold : colorMap[p.color]} bg={p.color === "orange" ? goldBg : bgMap[p.color]}>{p.tag}</Pill>
              </div>
              <div style={{ fontSize: 11, color: gold, fontFamily: Fn, fontWeight: 600, marginBottom: 8 }}>{p.range}</div>
              <p style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, lineHeight: 1.65, margin: 0 }}>{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Detailed phase sections */}
        {rallyPhases.map((p, i) => (
          <Section key={i} id={"phase-" + p.num}>
            <div style={{ borderTop: "1px solid " + T.border, paddingTop: 32, marginBottom: 40 }}>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 6, fontWeight: 600 }}>PHASE {p.num}</div>
                <h2 style={{ fontFamily: Fn, fontSize: 22, fontWeight: 300, color: T.text, margin: 0 }}>{p.title} <span style={{ color: T.textTer }}>— {p.range}</span></h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 20 }}>
                {p.metrics.map((m, mi) => (
                  <div key={mi} style={{ background: T.bg, borderRadius: T.radiusSm, padding: "14px 16px", border: "1px solid " + T.border }}>
                    <div style={{ fontSize: 20, fontWeight: 300, color: p.color === "orange" ? gold : colorMap[p.color] || T.text, fontFamily: Fn }}>{m.value}</div>
                    <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 4, lineHeight: 1.3 }}>{m.label}</div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, maxWidth: 740 }}>{p.desc}</p>
            </div>
          </Section>
        ))}
      </Section>

      {/* ─── Demand Decomposition ─── */}
      <Section id="demand">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 6, fontWeight: 600 }}>DEMAND STRUCTURE</div>
            <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, lineHeight: 1.3 }}>{demandDecomposition.title}</h2>
            <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, marginTop: 8, lineHeight: 1.7, maxWidth: 700 }}>{demandDecomposition.subtitle}</p>
          </div>

          {/* Demand bars */}
          <div style={{ display: "grid", gap: 12, marginBottom: 32 }}>
            {demandDecomposition.categories.map((cat, i) => {
              const colors = [gold, T.deepBlue, T.green, T.capRed];
              const bgColors = [goldBg, "rgba(29,78,216,0.08)", T.greenBg, T.redBg];
              const shareNum = parseInt(cat.share);
              return (
                <Card key={i} T={T} style={{ padding: "20px 24px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn }}>{cat.label}</span>
                      <Pill T={T} color={colors[i]} bg={bgColors[i]}>{cat.share}</Pill>
                    </div>
                    <span style={{ fontSize: 11, color: T.textTer, fontFamily: Fn }}>Stickiness: <span style={{ fontWeight: 600, color: colors[i] }}>{cat.sticky}</span></span>
                  </div>
                  <div style={{ height: 6, background: T.pillBg, borderRadius: 3, overflow: "hidden", marginBottom: 10 }}>
                    <div style={{ height: "100%", borderRadius: 3, background: colors[i], width: `${shareNum}%`, transition: "width 0.8s ease", opacity: 0.7 }} />
                  </div>
                  <p style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, margin: 0 }}>{cat.description}</p>
                </Card>
              );
            })}
          </div>

          {/* Central bank table */}
          <Expandable title="Central bank purchases — 4,000+ tonnes in four years" defaultOpen T={T}>
            <DataTable T={T} highlightCol={1}
              headers={["Year", "Net purchases (t)", "Key buyers", "Gold as % of reserves"]}
              rows={centralBankTable.map(r => [r.year, r.purchases, r.buyers, r.reserveShare])}
            />
          </Expandable>

          {/* ETF flows table */}
          <Expandable title="ETF flows reversed after a three-year drought" T={T}>
            <DataTable T={T} highlightCol={1}
              headers={["Year", "Net flows (USD)", "Demand (t)", "Year-end holdings (t)", "AUM"]}
              rows={etfFlowsTable.map(r => [r.year, r.flows, r.demand, r.holdings, r.aum])}
            />
          </Expandable>

          {/* Spec vs price chart */}
          <Card T={T} style={{ padding: "24px 28px", marginBottom: 12 }}>
            <DualAxisChart data={specVsPriceData} T={T} />
          </Card>

          {/* Spec table */}
          <Expandable title="Managed money positioning data" T={T}>
            <DataTable T={T} highlightCol={1}
              headers={["Date", "Net longs (t)", "Gold price", "Observation"]}
              rows={specPositioningTable.map(r => [r.date, r.longs + "t", "$" + r.price.toLocaleString(), r.note])}
            />
          </Expandable>
        </div>
      </Section>

      {/* ─── Central Bank Regime Shift ─── */}
      <Section id="regime">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 6, fontWeight: 600 }}>REGIME SHIFT</div>
            <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, lineHeight: 1.3 }}>{centralBankRegimeShift.title}</h2>
          </div>

          {/* Key facts grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 24 }}>
            {centralBankRegimeShift.keyFacts.map((f, i) => (
              <div key={i} style={{ background: T.bg, borderRadius: T.radiusSm, padding: "14px 16px", border: "1px solid " + T.border }}>
                <div style={{ fontSize: 20, fontWeight: 300, color: gold, fontFamily: Fn }}>{f.value}</div>
                <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 4, lineHeight: 1.4 }}>{f.label}</div>
              </div>
            ))}
          </div>

          {/* Multi-year targets */}
          <Card T={T} style={{ padding: "20px 24px", marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 12 }}>Multi-year tonnage targets — institutional frameworks, not tactical trades</div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {centralBankRegimeShift.targets.map((t, i) => (
                <div key={i} style={{ background: goldBg, borderRadius: T.radiusSm, padding: "12px 18px", border: "1px solid " + gold + "30", flex: "1 1 180px" }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: gold, fontFamily: Fn }}>{t.country}</div>
                  <div style={{ fontSize: 18, fontWeight: 300, color: T.text, fontFamily: Fn, margin: "4px 0" }}>{t.target}</div>
                  <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn }}>{t.timeline}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Prose */}
          {centralBankRegimeShift.paragraphs.map((p, i) => (
            <p key={i} style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, maxWidth: 740, marginBottom: 12 }}>{p}</p>
          ))}
        </div>
      </Section>

      {/* ─── March 2026 Drawdown ─── */}
      <Section id="drawdown">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 6, fontWeight: 600 }}>DRAWDOWN ANALYSIS</div>
            <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, lineHeight: 1.3 }}>{drawdownMechanics.title}</h2>
          </div>

          {/* Timeline */}
          <Card T={T} style={{ padding: "28px 28px 16px", marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 20 }}>Week-by-week timeline of the correction</div>
            <Timeline events={drawdownTimeline} T={T} />
          </Card>

          {/* Hormuz paradox */}
          <Expandable title={drawdownMechanics.hormuzParadox.title} defaultOpen T={T}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
              {drawdownMechanics.hormuzParadox.chain.map((step, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{
                    background: i === 0 ? goldBgStrong : T.bg, border: "1px solid " + (i === 0 ? gold + "40" : T.border),
                    borderRadius: T.radiusSm, padding: "8px 14px", fontSize: 11, color: T.textSec, fontFamily: Fn,
                  }}>{step}</div>
                  {i < drawdownMechanics.hormuzParadox.chain.length - 1 && <span style={{ color: T.textTer, fontSize: 12 }}>→</span>}
                </div>
              ))}
            </div>
            {drawdownMechanics.hormuzParadox.paragraphs.map((p, i) => (
              <p key={i} style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, margin: "0 0 10px" }}>{p}</p>
            ))}
          </Expandable>

          {/* CME amplifier */}
          <Expandable title={drawdownMechanics.cmeAmplifier.title} T={T}>
            {drawdownMechanics.cmeAmplifier.paragraphs.map((p, i) => (
              <p key={i} style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, margin: "0 0 10px" }}>{p}</p>
            ))}
          </Expandable>

          {/* Physical-paper divergence */}
          <Card T={T} style={{ padding: "20px 24px", marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 14 }}>Physical-paper divergence confirmed structural demand beneath the selloff</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
              {physicalPaperDivergence.map((item, i) => (
                <div key={i} style={{ background: T.bg, borderRadius: T.radiusSm, padding: "14px 16px", border: "1px solid " + T.border }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: gold, fontFamily: Fn, marginBottom: 4 }}>{item.market}</div>
                  <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.5 }}>{item.metric}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Historical comparison */}
          <Expandable title="Same playbook as March 2020 and 2008 — with a CME twist" T={T}>
            <DataTable T={T} highlightCol={3}
              headers={["Metric", "March 2020", "2008 GFC", "March 2026"]}
              rows={drawdownComparison.map(r => [r.metric, r.mar2020, r.gfc2008, r.mar2026])}
            />
          </Expandable>
        </div>
      </Section>

      {/* ─── Conclusion ─── */}
      <Section id="conclusion">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 6, fontWeight: 600 }}>CONCLUSION</div>
            <h2 style={{ fontFamily: Fn, fontSize: 22, fontWeight: 300, color: T.text, margin: 0, lineHeight: 1.4, maxWidth: 680 }}>
              {conclusion.headline}
            </h2>
          </div>

          {/* Target cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 24 }}>
            {conclusion.bullets.map((b, i) => (
              <div key={i} style={{
                background: T.card, border: "1px solid " + T.border, borderRadius: T.radius,
                padding: "18px 16px", boxShadow: T.shadow, borderTop: `3px solid ${gold}`,
              }}>
                <div style={{ fontSize: 22, fontWeight: 300, color: gold, fontFamily: Fn, marginBottom: 4 }}>{b.value}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 6 }}>{b.label}</div>
                <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, lineHeight: 1.5 }}>{b.detail}</div>
              </div>
            ))}
          </div>

          {conclusion.paragraphs.map((p, i) => (
            <p key={i} style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, maxWidth: 740, marginBottom: 12 }}>{p}</p>
          ))}
        </div>
      </Section>
    </div>
  );
}
