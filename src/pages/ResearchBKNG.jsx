import { useState, useRef, useEffect } from "react";
import { Fn, Fs } from "../theme";
import { Card, Label, Pill, Stat, TabBar } from "../components/shared";
import {
  bkngSnapshot, heroStats, trendCards, trendSections,
  generationalTabs, convergenceTable, digitalPenetration,
  onlineTravelMarket, digitalSubmarkets, chartData,
  brandPortfolio, revenueBreakdown, financials5Y,
} from "../data/research";

/* ─── tiny SVG chart helpers ─── */
function BarChart({ data, labels, colors, projected, title, subtitle, T, height = 220 }) {
  const max = Math.max(...data) * 1.15;
  const W = 560, H = height, pad = { t: 16, r: 20, b: 32, l: 10 };
  const w = W - pad.l - pad.r, h = H - pad.t - pad.b;
  const bw = Math.min(36, (w / data.length) * 0.55);
  const gap = w / data.length;
  const [hov, setHov] = useState(-1);

  return (
    <div>
      {title && <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>{title}</div>}
      {subtitle && <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 12 }}>{subtitle}</div>}
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }}
        onMouseLeave={() => setHov(-1)}>
        {/* grid lines */}
        {[0.25, 0.5, 0.75, 1].map((f, i) => (
          <line key={i} x1={pad.l} x2={W - pad.r}
            y1={pad.t + h * (1 - f)} y2={pad.t + h * (1 - f)}
            stroke={T.border} strokeWidth="0.5" />
        ))}
        {data.map((v, i) => {
          const x = pad.l + gap * i + gap / 2;
          const barH = (v / max) * h;
          const y = pad.t + h - barH;
          const isProj = projected?.[i];
          const c = colors?.[i] || T.capRed;
          return (
            <g key={i} onMouseEnter={() => setHov(i)} style={{ cursor: "pointer" }}>
              <rect x={x - bw / 2} y={y} width={bw} height={barH}
                rx={4} fill={c} opacity={isProj ? 0.45 : (hov === i ? 1 : 0.85)}
                style={{ transition: "opacity 0.15s" }} />
              {hov === i && (
                <g>
                  <rect x={x - 28} y={y - 24} width={56} height={20} rx={6}
                    fill={T.text === "#0F172A" ? "rgba(15,23,42,0.9)" : "rgba(250,250,250,0.9)"} />
                  <text x={x} y={y - 11} textAnchor="middle" fontSize="11"
                    fontFamily={Fn} fontWeight="600" fill={T.text === "#0F172A" ? "#fff" : "#000"}>
                    {v}
                  </text>
                </g>
              )}
              {labels?.[i] && (
                <text x={x} y={H - 6} textAnchor="middle" fontSize="10"
                  fill={T.textTer} fontFamily={Fn}>{labels[i]}</text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function HorizontalBarChart({ items, T, title, subtitle }) {
  const max = Math.max(...items.map(i => i.value || i.pct)) * 1.15;
  return (
    <div>
      {title && <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>{title}</div>}
      {subtitle && <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 16 }}>{subtitle}</div>}
      {items.map((item, i) => (
        <div key={i} style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 12, color: T.textSec, fontFamily: Fn }}>{item.label || item.region}</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: T[item.color] || T.capRed, fontFamily: Fn }}>
              {item.value != null ? item.value : item.pct + "%"}
            </span>
          </div>
          <div style={{ height: 6, background: T.pillBg, borderRadius: 3, overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 3,
              background: T[item.color] || T.capRed,
              width: ((item.value || item.pct) / max * 100) + "%",
              opacity: item.projected ? 0.45 : 1,
              transition: "width 0.8s ease",
            }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function LineChart({ data, T, title, subtitle }) {
  const W = 560, H = 220, pad = { t: 20, r: 20, b: 32, l: 44 };
  const w = W - pad.l - pad.r, h = H - pad.t - pad.b;
  const vals = data.map(d => d.value);
  const mn = Math.min(...vals) * 0.9, mx = Math.max(...vals) * 1.08;
  const x = i => pad.l + (i / (data.length - 1)) * w;
  const y = v => pad.t + (1 - (v - mn) / (mx - mn)) * h;
  const [hov, setHov] = useState(-1);

  // smooth path
  const pts = data.map((d, i) => [x(i), y(d.value)]);
  let path = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const cx = (pts[i - 1][0] + pts[i][0]) / 2;
    path += ` C${cx},${pts[i - 1][1]} ${cx},${pts[i][1]} ${pts[i][0]},${pts[i][1]}`;
  }
  const fill = path + ` L${x(data.length - 1)},${pad.t + h} L${pad.l},${pad.t + h} Z`;

  const ticks = [];
  const step = Math.ceil((mx - mn) / 4 / 100) * 100;
  for (let v = Math.ceil(mn / step) * step; v <= mx; v += step) ticks.push(v);

  return (
    <div>
      {title && <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>{title}</div>}
      {subtitle && <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 12 }}>{subtitle}</div>}
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }}
        onMouseMove={e => {
          const r = e.currentTarget.getBoundingClientRect();
          const mx2 = (e.clientX - r.left) / r.width * W;
          const idx = Math.round(((mx2 - pad.l) / w) * (data.length - 1));
          if (idx >= 0 && idx < data.length) setHov(idx);
        }}
        onMouseLeave={() => setHov(-1)}>
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={T.deepBlue} stopOpacity="0.15" />
            <stop offset="100%" stopColor={T.deepBlue} stopOpacity="0.01" />
          </linearGradient>
        </defs>
        {ticks.map((v, i) => (
          <g key={i}>
            <line x1={pad.l} x2={W - pad.r} y1={y(v)} y2={y(v)} stroke={T.border} strokeWidth="0.5" />
            <text x={pad.l - 6} y={y(v) + 4} textAnchor="end" fontSize="10" fill={T.textTer} fontFamily={Fn}>
              ${v}B
            </text>
          </g>
        ))}
        {data.map((d, i) => {
          if (i % 2 === 0 || i === data.length - 1) return (
            <text key={i} x={x(i)} y={H - 6} textAnchor="middle" fontSize="10" fill={T.textTer} fontFamily={Fn}>
              {d.year}
            </text>
          );
          return null;
        })}
        <path d={fill} fill="url(#lineGrad)" />
        <path d={path} fill="none" stroke={T.deepBlue} strokeWidth="2.5" />
        {data.map((d, i) => (
          <circle key={i} cx={x(i)} cy={y(d.value)} r={hov === i ? 5 : 3}
            fill={d.year.includes("E") ? T.bg : T.deepBlue}
            stroke={T.deepBlue} strokeWidth="2"
            style={{ transition: "r 0.15s" }} />
        ))}
        {hov >= 0 && hov < data.length && (
          <g>
            <line x1={x(hov)} x2={x(hov)} y1={pad.t} y2={pad.t + h} stroke={T.textTer} strokeWidth="0.5" strokeDasharray="3 3" />
            <rect x={x(hov) - 36} y={y(data[hov].value) - 28} width={72} height={22} rx={6}
              fill={T.text === "#0F172A" ? "rgba(15,23,42,0.9)" : "rgba(250,250,250,0.9)"} />
            <text x={x(hov)} y={y(data[hov].value) - 14} textAnchor="middle" fontSize="11"
              fontFamily={Fn} fontWeight="600" fill={T.text === "#0F172A" ? "#fff" : "#000"}>
              ${data[hov].value}B
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}

function StackedBarChart({ data, T, title, subtitle }) {
  const { labels, series } = data;
  const colors = [T.orange, T.capRed, T.purple];
  const totals = labels.map((_, i) => series.reduce((sum, s) => sum + s.values[i], 0));
  const max = Math.max(...totals) * 1.1;
  const W = 400, H = 220, pad = { t: 16, r: 20, b: 32, l: 10 };
  const w = W - pad.l - pad.r, h = H - pad.t - pad.b;
  const bw = Math.min(60, (w / labels.length) * 0.5);
  const gap = w / labels.length;

  return (
    <div>
      {title && <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>{title}</div>}
      {subtitle && <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 12 }}>{subtitle}</div>}
      <div style={{ display: "flex", gap: 16, marginBottom: 10 }}>
        {series.map((s, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: T.textTer, fontFamily: Fn }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: colors[i] }} />{s.label}
          </span>
        ))}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }}>
        {labels.map((l, li) => {
          const x = pad.l + gap * li + gap / 2;
          let cy = pad.t + h;
          return (
            <g key={li}>
              {series.map((s, si) => {
                const barH = (s.values[li] / max) * h;
                cy -= barH;
                return <rect key={si} x={x - bw / 2} y={cy} width={bw} height={barH} rx={si === series.length - 1 ? 4 : 0} fill={colors[si]} opacity={0.85} />;
              })}
              <text x={x} y={H - 6} textAnchor="middle" fontSize="10" fill={T.textTer} fontFamily={Fn}>{l}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ─── Expandable card ─── */
function Expandable({ title, tag, content, color, T }) {
  const [open, setOpen] = useState(false);
  const innerRef = useRef(null);
  const [maxH, setMaxH] = useState(0);
  useEffect(() => {
    if (innerRef.current) setMaxH(innerRef.current.scrollHeight);
  }, [open]);

  return (
    <div onClick={() => setOpen(!open)} style={{
      background: T.card, border: "1px solid " + T.border, borderRadius: T.radius,
      marginBottom: 12, overflow: "hidden", cursor: "pointer", transition: "border-color 0.2s",
      borderColor: open ? (T[color] || T.capRed) : T.border,
    }}>
      <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", userSelect: "none" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: T.text, fontFamily: Fn }}>{title}</span>
          {tag && <Pill T={T} color={T[color]} bg={color === "green" ? T.greenBg : color === "capRed" ? T.redBg : T.pillBg}>{tag}</Pill>}
        </div>
        <div style={{
          width: 24, height: 24, borderRadius: "50%", background: T.pillBg,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 10, color: T.textTer, transition: "transform 0.3s",
          transform: open ? "rotate(180deg)" : "rotate(0)",
        }}>▼</div>
      </div>
      <div style={{ maxHeight: open ? maxH + 40 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
        <div ref={innerRef} style={{ padding: "0 20px 20px" }}>
          <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.8, fontFamily: Fn, margin: 0 }}>{content}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Scroll progress ─── */
function ScrollProgress({ T }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const el = document.querySelector('[data-research-scroll]');
    if (!el) return;
    const handler = () => {
      const h = el.scrollHeight - el.clientHeight;
      setPct(h > 0 ? (el.scrollTop / h) * 100 : 0);
    };
    el.addEventListener("scroll", handler);
    return () => el.removeEventListener("scroll", handler);
  }, []);
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 5, height: 2, background: T.border, marginBottom: 24 }}>
      <div style={{ height: "100%", background: T.capRed, width: pct + "%", transition: "width 0.1s", borderRadius: 1 }} />
    </div>
  );
}

/* ─── Section anchor wrapper ─── */
function Section({ id, children }) {
  return <div id={`research-${id}`} style={{ scrollMarginTop: 80 }}>{children}</div>;
}

/* ─── Main page ─── */
export default function ResearchPg({ T }) {
  const [activeTab, setActiveTab] = useState("gz");
  const scrollTo = id => {
    const el = document.getElementById("research-" + id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const colorMap = {
    orange: T.orange, capRed: T.capRed, deepBlue: T.deepBlue,
    green: T.green, purple: T.purple,
  };
  const bgMap = {
    orange: "rgba(234,88,12,0.08)", capRed: T.redBg, deepBlue: "rgba(29,78,216,0.08)",
    green: T.greenBg, purple: "rgba(67,56,202,0.08)",
  };

  return (
    <div>
      {/* ─── Header ─── */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <Pill T={T} color={T.capRed} bg={T.redBg}>EQUITY RESEARCH</Pill>
          <Pill T={T}>18 min read</Pill>
          <Pill T={T}>March 2026</Pill>
        </div>
        <h1 style={{ fontFamily: Fn, fontSize: 32, fontWeight: 300, letterSpacing: "-0.03em", color: T.text, margin: 0, lineHeight: 1.3 }}>
          Booking Holdings <span style={{ color: T.textTer, fontWeight: 400 }}>(BKNG)</span>
        </h1>
        <p style={{ fontSize: 13, color: T.textSec, marginTop: 8, fontFamily: Fn, lineHeight: 1.7, maxWidth: 700 }}>
          Six mega-trends converging on a single platform. Booking sits at the intersection of demographic, cultural, technological, and geographic shifts that are compounding simultaneously.
        </p>
      </div>

      {/* ─── Snapshot card ─── */}
      <Card T={T} style={{ marginBottom: 24, padding: "20px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: T.textTer, fontFamily: Fn, letterSpacing: "0.05em" }}>BKNG</span>
            <span style={{ fontSize: 28, fontWeight: 300, fontFamily: Fn, color: T.text }}>{bkngSnapshot.price}</span>
            <Pill T={T} color={T.capRed} bg={T.redBg}>{bkngSnapshot.ytdChg} YTD</Pill>
          </div>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {[
              { l: "Forward P/E", v: bkngSnapshot.forwardPE },
              { l: "PEG", v: bkngSnapshot.peg },
              { l: "FCF", v: bkngSnapshot.fcf },
              { l: "FCF Yield", v: bkngSnapshot.fcfYield },
              { l: "Revenue", v: bkngSnapshot.revenue },
              { l: "Gross Bookings", v: bkngSnapshot.grossBookings },
            ].map((m, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: T.green, fontFamily: Fn }}>{m.v}</div>
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
            <div style={{ fontSize: 22, fontWeight: 300, fontFamily: Fn, color: T[s.color] || T.text, lineHeight: 1.2 }}>{s.value}</div>
            <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 6, lineHeight: 1.4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ─── Trend overview grid ─── */}
      <Label T={T}>Six structural tailwinds — at a glance</Label>
      <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, marginBottom: 20, marginTop: -4 }}>
        These aren't cyclical factors that reverse in a downturn. They are decade-long shifts that compound on each other.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 48 }}>
        {trendCards.map((card, i) => (
          <div key={i} onClick={() => scrollTo(card.id)} style={{
            background: T.card, border: "1px solid " + T.border, borderRadius: T.radius,
            padding: "22px 20px", cursor: "pointer", position: "relative", overflow: "hidden",
            boxShadow: T.shadow, transition: "all 0.2s",
            borderTop: `3px solid ${colorMap[card.color] || T.capRed}`,
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = T.shadowLg }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = T.shadow }}>
            <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginBottom: 8 }}>{card.num}</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 6 }}>{card.title}</div>
            <Pill T={T} color={colorMap[card.color]} bg={bgMap[card.color]}>{card.tag}</Pill>
            <p style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, lineHeight: 1.65, marginTop: 10, margin: "10px 0 0" }}>{card.desc}</p>
            <div style={{ fontSize: 11, fontWeight: 500, color: colorMap[card.color] || T.capRed, marginTop: 12, fontFamily: Fn, display: "flex", alignItems: "center", gap: 4 }}>
              Read deep dive →
            </div>
          </div>
        ))}
      </div>

      {/* ─── Deep-dive sections ─── */}
      {trendSections.map((sec, si) => (
        <Section key={si} id={sec.id}>
          <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>
                {sec.num} / STRUCTURAL TREND
              </div>
              <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, lineHeight: 1.3 }}>{sec.title}</h2>
              <p style={{ fontSize: 14, color: T.textSec, fontFamily: Fn, marginTop: 8, lineHeight: 1.7, maxWidth: 700 }}>{sec.lead}</p>
            </div>

            {/* Metrics grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 24 }}>
              {sec.metrics.map((m, i) => (
                <div key={i} style={{
                  background: T.bg, borderRadius: T.radiusSm, padding: "14px 16px",
                  border: "1px solid " + T.border,
                }}>
                  <div style={{ fontSize: 20, fontWeight: 300, color: colorMap[trendCards[si]?.color] || T.text, fontFamily: Fn }}>{m.value}</div>
                  <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 4, lineHeight: 1.3 }}>{m.label}</div>
                </div>
              ))}
            </div>

            {/* Charts for specific sections */}
            {sec.id === "middle-class" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
                <Card T={T} style={{ padding: "18px 20px" }}>
                  <BarChart T={T}
                    title="Global middle class population"
                    subtitle="Billions of people, 2020-2035 projected"
                    data={chartData.middleClass.values}
                    labels={chartData.middleClass.labels}
                    projected={chartData.middleClass.projected}
                    colors={chartData.middleClass.labels.map(() => T.orange)}
                  />
                </Card>
                <Card T={T} style={{ padding: "18px 20px" }}>
                  <StackedBarChart T={T}
                    title="Middle class spending by segment"
                    subtitle="Trillions USD, stacked by income tier"
                    data={chartData.middleClassSpending}
                  />
                </Card>
              </div>
            )}

            {sec.id === "digital" && (
              <div style={{ marginBottom: 24 }}>
                <Card T={T} style={{ padding: "18px 20px", marginBottom: 16 }}>
                  <LineChart T={T}
                    title="Online travel booking market growth"
                    subtitle="USD billions — global online travel market and projections to 2030"
                    data={onlineTravelMarket}
                  />
                </Card>
                {/* sub-market table */}
                <Card T={T} style={{ padding: "16px 20px", marginBottom: 16, overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: Fn }}>
                    <thead>
                      <tr style={{ borderBottom: "2px solid " + T.border }}>
                        {["Sub-market", "2024 size", "2030 target", "CAGR", "Key driver"].map(h => (
                          <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontSize: 9, color: T.textTer, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {digitalSubmarkets.map((r, i) => (
                        <tr key={i} style={{ borderBottom: "1px solid " + T.border }}>
                          <td style={{ padding: "10px 12px", fontWeight: 500, color: T.text }}>{r.name}</td>
                          <td style={{ padding: "10px 12px", color: T.textSec }}>{r.size2024}</td>
                          <td style={{ padding: "10px 12px", color: T.green, fontWeight: 600 }}>{r.target2030}</td>
                          <td style={{ padding: "10px 12px", color: T.green }}>{r.cagr}</td>
                          <td style={{ padding: "10px 12px", color: T.textTer, fontSize: 11 }}>{r.driver}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Card>
                {/* Penetration bars */}
                <Card T={T} style={{ padding: "18px 20px" }}>
                  <HorizontalBarChart T={T}
                    title="Online booking penetration by region"
                    subtitle="The enormous headroom in emerging markets is where the next leg of growth comes from"
                    items={digitalPenetration}
                  />
                </Card>
              </div>
            )}

            {sec.id === "remote" && (
              <Card T={T} style={{ padding: "18px 20px", marginBottom: 24 }}>
                <BarChart T={T}
                  title="US digital nomads (millions)"
                  subtitle="Source: MBO Partners annual reports, 2019-2025"
                  data={chartData.digitalNomads.values}
                  labels={chartData.digitalNomads.labels}
                  colors={chartData.digitalNomads.labels.map(() => T.green)}
                />
              </Card>
            )}

            {sec.id === "boomers" && (
              <Card T={T} style={{ padding: "18px 20px", marginBottom: 24 }}>
                <BarChart T={T}
                  title="Travel spending per trip by generation"
                  subtitle="USD — boomers outspend every other generation by 20-70%"
                  data={chartData.generationalSpend.perTrip}
                  labels={chartData.generationalSpend.labels}
                  colors={[T.purple, T.deepBlue, T.orange, T.green]}
                />
              </Card>
            )}

            {sec.id === "apac" && (
              <Card T={T} style={{ padding: "18px 20px", marginBottom: 24 }}>
                <HorizontalBarChart T={T}
                  title="Air trips per capita — the penetration gap"
                  subtitle="Yearly flights per person — India has 20x the US runway"
                  items={chartData.airTripsPerCapita}
                />
              </Card>
            )}

            {/* Experience section — generational tabs */}
            {sec.id === "experience" && (
              <Card T={T} style={{ padding: "20px 24px", marginBottom: 24 }}>
                <Label T={T}>Generational breakdown</Label>
                <TabBar T={T}
                  tabs={generationalTabs.map(g => ({ k: g.key, l: g.label }))}
                  active={activeTab}
                  onChange={setActiveTab}
                />
                {generationalTabs.filter(g => g.key === activeTab).map(g => (
                  <div key={g.key} style={{ marginTop: 16, padding: "20px", background: T.bg, borderRadius: T.radiusSm, border: "1px solid " + T.border }}>
                    <div style={{ fontSize: 15, fontWeight: 500, color: T.text, fontFamily: Fn, marginBottom: 12 }}>{g.title}</div>
                    {[
                      { l: "Travel intent", v: g.intent },
                      { l: "Behavior", v: g.behavior },
                      { l: "Significance for Booking", v: g.significance },
                    ].map((item, i) => (
                      <div key={i} style={{ marginBottom: 10 }}>
                        <div style={{ fontSize: 10, fontWeight: 600, color: T.textTer, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4, fontFamily: Fn }}>{item.l}</div>
                        <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.75, fontFamily: Fn, margin: 0 }}>{item.v}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </Card>
            )}

            {/* Prose paragraphs */}
            <div style={{ maxWidth: 720, marginBottom: 24 }}>
              {sec.paragraphs.map((p, i) => (
                <p key={i} style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, marginBottom: 14 }}>{p}</p>
              ))}
            </div>

            {/* Pull quote */}
            {sec.pullQuote && (
              <div style={{
                fontFamily: Fn, fontSize: 16, fontWeight: 300, color: T.text, lineHeight: 1.6,
                margin: "24px 0", paddingLeft: 20, borderLeft: `3px solid ${colorMap[trendCards[si]?.color] || T.capRed}`,
                maxWidth: 720, fontStyle: "italic",
              }}>
                {sec.pullQuote}
              </div>
            )}

            {/* Expandable insights */}
            {sec.expandables?.map((ex, i) => (
              <Expandable key={i} T={T} title={ex.title} tag={ex.tag} content={ex.content} color={trendCards[si]?.color} />
            ))}

            {/* How Booking captures this */}
            <Card T={T} style={{
              marginTop: 20, padding: "20px 24px",
              borderLeft: `4px solid ${colorMap[trendCards[si]?.color] || T.capRed}`,
            }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 12 }}>
                {sec.capture.title}
              </div>
              {sec.capture.points.map((p, i) => (
                <p key={i} style={{ fontSize: 13, color: T.textSec, lineHeight: 1.75, fontFamily: Fn, marginBottom: 8, paddingLeft: 12, borderLeft: "2px solid " + T.border }}>
                  {p}
                </p>
              ))}
            </Card>
          </div>
        </Section>
      ))}

      {/* ─── Convergence table ─── */}
      <Section id="convergence">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>
              07 / INVESTMENT THESIS
            </div>
            <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0 }}>
              Why all six trends converge on Booking
            </h2>
            <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, marginTop: 8, lineHeight: 1.7 }}>
              Most companies ride one or two structural tailwinds. Booking has built specific product capabilities to capture each of the six — and they compound against each other.
            </p>
          </div>

          <Card T={T} style={{ padding: "16px 20px", overflowX: "auto", marginBottom: 24 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: Fn }}>
              <thead>
                <tr style={{ borderBottom: "2px solid " + T.border }}>
                  {["Structural trend", "Booking's capture mechanism", "Key metric"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontSize: 9, color: T.textTer, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {convergenceTable.map((r, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid " + T.border }}>
                    <td style={{ padding: "12px", fontWeight: 500, color: colorMap[r.color] || T.text }}>{r.trend}</td>
                    <td style={{ padding: "12px", color: T.textSec }}>{r.mechanism}</td>
                    <td style={{ padding: "12px", color: T.green, fontWeight: 600, fontSize: 11 }}>{r.metric}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          {/* Valuation callout */}
          <Card T={T} style={{ padding: "24px", borderLeft: `4px solid ${T.green}` }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 12 }}>The valuation disconnect</div>
            <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, marginBottom: 10 }}>
              Booking captures roughly $27 billion of an $11.7 trillion global travel market — barely 2-3% of a market growing at 7%+ annually with six secular tailwinds compounding underneath.
            </p>
            <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.85, fontFamily: Fn, marginBottom: 10 }}>
              The stock trades at ~16x forward earnings with a PEG ratio under 1.0, an FCF yield of 6.3%, and total shareholder yield above 5%. The market is pricing cyclical risk and AI disruption fear.
            </p>
            <div style={{
              fontFamily: Fn, fontSize: 14, fontWeight: 500, color: T.text, lineHeight: 1.7,
              margin: "16px 0 0", padding: "16px 20px", background: T.bg, borderRadius: T.radiusSm,
              borderLeft: `3px solid ${T.green}`,
            }}>
              The middle class doesn't shrink back. Gen Z doesn't stop valuing experiences. Remote work doesn't fully return to the office. Boomers don't un-retire. Asia doesn't stop building airports. These are decade-long structural shifts.
            </div>
          </Card>

          {/* Revenue chart */}
          <Card T={T} style={{ padding: "18px 20px", marginTop: 20 }}>
            <BarChart T={T}
              title="Booking Holdings — revenue trajectory"
              subtitle="USD billions — FY2021-FY2026E"
              data={chartData.bkngRevenue.values}
              labels={chartData.bkngRevenue.labels}
              projected={chartData.bkngRevenue.projected}
              colors={chartData.bkngRevenue.labels.map(() => T.green)}
            />
          </Card>
        </div>
      </Section>

      {/* ─── Brand portfolio & financials ─── */}
      <Section id="company">
        <div style={{ borderTop: "1px solid " + T.border, paddingTop: 40, marginBottom: 48 }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 600 }}>
              08 / COMPANY OVERVIEW
            </div>
            <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0 }}>Brand portfolio & financial model</h2>
          </div>

          {/* Brand cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12, marginBottom: 24 }}>
            {brandPortfolio.map((b, i) => (
              <Card key={i} T={T} style={{ padding: "18px" }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>{b.brand}</div>
                <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                  <Pill T={T}>{b.geo}</Pill>
                  <Pill T={T} color={T.green} bg={T.greenBg}>{b.revPct}</Pill>
                </div>
                <p style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, lineHeight: 1.6, margin: 0 }}>{b.desc}</p>
              </Card>
            ))}
          </div>

          {/* Revenue breakdown */}
          <Label T={T}>Revenue model — FY2025</Label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
            {revenueBreakdown.map((r, i) => (
              <Card key={i} T={T} style={{ padding: "18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn }}>{r.stream}</span>
                  <span style={{ fontSize: 18, fontWeight: 300, color: T.text, fontFamily: Fn }}>{r.pct}%</span>
                </div>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <Pill T={T}>{r.amount}</Pill>
                  <Pill T={T} color={r.growth.startsWith("+") ? T.green : T.capRed} bg={r.growth.startsWith("+") ? T.greenBg : T.redBg}>{r.growth}</Pill>
                </div>
                <p style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, lineHeight: 1.6, margin: 0 }}>{r.desc}</p>
                {/* mini bar */}
                <div style={{ height: 4, background: T.pillBg, borderRadius: 2, marginTop: 10 }}>
                  <div style={{ height: "100%", borderRadius: 2, background: T.capRed, width: r.pct + "%", transition: "width 0.5s" }} />
                </div>
              </Card>
            ))}
          </div>

          {/* 5Y financials table */}
          <Card T={T} style={{ padding: "16px 20px", overflowX: "auto" }}>
            <Label T={T}>Five-year financial summary</Label>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: Fn }}>
              <thead>
                <tr style={{ borderBottom: "2px solid " + T.border }}>
                  {["Metric", ...financials5Y.map(f => f.year)].map(h => (
                    <th key={h} style={{ textAlign: h === "Metric" ? "left" : "right", padding: "10px 12px", fontSize: 9, color: T.textTer, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Revenue ($B)", key: "revenue", fmt: v => v ? `$${v.toFixed(1)}B` : "—" },
                  { label: "Rev Growth", key: "growth", fmt: v => v ? `+${v}%` : "—", color: true },
                  { label: "Adj. EBITDA ($B)", key: "ebitda", fmt: v => v ? `$${v.toFixed(1)}B` : "—" },
                  { label: "EBITDA Margin", key: "ebitdaMargin", fmt: v => v ? `${v.toFixed(1)}%` : "—" },
                ].map((row, ri) => (
                  <tr key={ri} style={{ borderBottom: "1px solid " + T.border }}>
                    <td style={{ padding: "10px 12px", fontWeight: 500, color: T.text }}>{row.label}</td>
                    {financials5Y.map((f, fi) => (
                      <td key={fi} style={{ padding: "10px 12px", textAlign: "right", color: row.color && f[row.key] > 0 ? T.green : T.textSec }}>
                        {row.fmt(f[row.key])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </Section>

      {/* ─── Download originals ─── */}
      <div style={{ borderTop: "1px solid " + T.border, paddingTop: 24, marginBottom: 24, display: "flex", gap: 12 }}>
        <a href="/research/structural-trends.html" target="_blank" rel="noopener noreferrer" style={{
          padding: "10px 20px", background: T.card, border: "1px solid " + T.border, borderRadius: T.radius,
          fontSize: 12, fontFamily: Fn, color: T.textSec, textDecoration: "none", display: "flex", alignItems: "center", gap: 8,
          transition: "all 0.2s",
        }}>
          <span style={{ fontSize: 14 }}>📄</span> View structural trends (HTML)
        </a>
        <a href="/research/BKNG_Research_Report.pdf" target="_blank" rel="noopener noreferrer" style={{
          padding: "10px 20px", background: T.card, border: "1px solid " + T.border, borderRadius: T.radius,
          fontSize: 12, fontFamily: Fn, color: T.textSec, textDecoration: "none", display: "flex", alignItems: "center", gap: 8,
          transition: "all 0.2s",
        }}>
          <span style={{ fontSize: 14 }}>📑</span> View full research report (PDF)
        </a>
      </div>

      {/* ─── Disclaimer ─── */}
      <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, lineHeight: 1.7, maxWidth: 700, paddingBottom: 40 }}>
        This analysis is for informational purposes only and does not constitute investment advice. Data sourced from SEC filings, IATA, World Economic Forum, Brookings, WTTC, MBO Partners, McKinsey, and various industry reports. All figures reflect publicly available data as of March 2026.
      </div>
    </div>
  );
}
