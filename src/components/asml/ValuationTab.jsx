import { useState, useMemo } from "react";
import { Fn } from "../../theme";
import { Card, Pill } from "../shared";
import { useMobile } from "../../hooks/useMobile";
import {
  snapshot, headlineGrowth, multiples, revisionSeries,
  directPeers, peerMedian, widePeers, premiumSeries,
  valSummary, bottomLine,
} from "../../data/research-asml-val";

/* ─── helpers ─── */
const toRgba = (hex, alpha) => {
  if (!hex || typeof hex !== "string" || hex[0] !== "#" || hex.length !== 7) return hex;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
const fmtMcap = v => v >= 1000000 ? "€" + (v / 1000000).toFixed(2) + "T" : v >= 1000 ? "€" + (v / 1000).toFixed(0) + "B" : "€" + v.toFixed(0) + "M";

/* ─── Snapshot ─── */
function SnapshotGrid({ T, mob }) {
  const items = [
    { l: "Current Price", v: snapshot.price, c: T.text },
    { l: "Fwd P/E (NTM)", v: snapshot.fwdPE_4q, c: T.capRed },
    { l: "FY27 P/E", v: snapshot.fwdPE_27, c: T.deepBlue },
    { l: "FY27 EV/EBITDA", v: snapshot.fwdEV_EBITDA_27, c: T.deepBlue },
    { l: "Prem. to Peers", v: snapshot.premiumToPeers, c: T.orange },
    { l: "ROIC", v: snapshot.roic, c: T.green },
    { l: "ROE", v: snapshot.roe, c: T.green },
    { l: "Div Yield", v: snapshot.divYield, c: T.textSec },
  ];
  return (
    <Card T={T} style={{ padding: mob ? "20px 18px" : "28px 32px", borderLeft: `4px solid ${T.capRed}`, marginBottom: 32 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
        <div style={{ fontSize: 10, fontFamily: Fn, color: T.capRed, letterSpacing: "0.15em", fontWeight: 700 }}>VALUATION SNAPSHOT</div>
        <Pill T={T} color={T.green} bg={T.greenBg}>Earnings revisions positive</Pill>
        <Pill T={T} color={T.deepBlue} bg="rgba(29,78,216,0.08)">Quality leader</Pill>
      </div>
      <p style={{ fontSize: 13.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.85, margin: 0, maxWidth: 780 }}>{valSummary}</p>
      <div style={{ display: "grid", gridTemplateColumns: mob ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 14, marginTop: 22, paddingTop: 18, borderTop: "1px solid " + T.border }}>
        {items.map((m, i) => (
          <div key={i}>
            <div style={{ fontSize: 22, fontWeight: 300, color: m.c, fontFamily: Fn, lineHeight: 1.1, fontFeatureSettings: '"tnum"' }}>{m.v}</div>
            <div style={{ fontSize: 9.5, color: T.textTer, fontFamily: Fn, letterSpacing: "0.08em", marginTop: 6, textTransform: "uppercase", fontWeight: 600 }}>{m.l}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ─── Earnings Revision Chart ─── */
function RevisionChart({ T, mob }) {
  const W = mob ? 700 : 980, H = mob ? 380 : 440;
  const padL = 56, padR = 60, padT = 30, padB = 60;
  const plotW = W - padL - padR, plotH = H - padT - padB;
  const N = revisionSeries.length;
  const x = i => padL + (i / (N - 1)) * plotW;
  const yPrice = v => padT + plotH * (1 - (v - 500) / (1400 - 500));
  const yEps = v => padT + plotH * (1 - (v - 24) / (50 - 24));

  const linePath = (key, yFn) => {
    let path = "", pen = false;
    revisionSeries.forEach((d, i) => {
      if (d[key] == null) { pen = false; return; }
      path += (pen ? " L " : " M ") + x(i).toFixed(1) + " " + yFn(d[key]).toFixed(1);
      pen = true;
    });
    return path;
  };

  const inflectionIdx = 10;
  const xInflection = x(inflectionIdx);
  const series = [
    { key: "eps28", label: "2028E EPS", color: T.purple, current: 47.4, change: "+5%" },
    { key: "eps27", label: "2027E EPS", color: T.orange, current: 41.2, change: "+25%" },
    { key: "eps26", label: "2026E EPS", color: T.deepBlue, current: 31.4, change: "+22%" },
  ];

  return (
    <Card T={T} style={{ padding: mob ? "20px 16px" : "26px 28px", marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn }}>EPS estimates have re-rated sharply since October 2025</div>
          <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginTop: 3 }}>3-year history. Price (grey) vs consensus EPS for 2026, 2027, and 2028. Change since trough on right.</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {series.map(s => (
            <div key={s.key} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 14, height: 2, background: s.color, display: "inline-block" }} />
              <span style={{ fontSize: 11, color: T.textSec, fontFamily: Fn }}>{s.label}</span>
              <span style={{ fontSize: 11, color: s.color, fontFamily: Fn, fontWeight: 600, fontFeatureSettings: '"tnum"' }}>{s.current}</span>
              <Pill T={T} color={T.green} bg={T.greenBg}>{s.change}</Pill>
            </div>
          ))}
        </div>
      </div>

      <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
          {[24, 30, 36, 42, 48].map(t => (
            <line key={t} x1={padL} x2={W - padR} y1={yEps(t)} y2={yEps(t)} stroke={T.border} strokeWidth="1" strokeDasharray="2 4" />
          ))}
          <rect x={xInflection} y={padT} width={W - padR - xInflection} height={plotH} fill={toRgba(T.capRed, 0.05)} />
          <line x1={xInflection} x2={xInflection} y1={padT} y2={padT + plotH} stroke={T.capRed} strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
          <text x={xInflection + 6} y={padT + 14} fontSize="10" fontFamily={Fn} fill={T.capRed} fontWeight="600">Oct 2025 — revisions turn positive</text>

          <path d={linePath("price", yPrice)} fill="none" stroke={T.textTer} strokeWidth="1.5" opacity="0.55" />
          <path d={linePath("eps28", yEps)} fill="none" stroke={T.purple} strokeWidth="2.2" />
          <path d={linePath("eps27", yEps)} fill="none" stroke={T.orange} strokeWidth="2.2" />
          <path d={linePath("eps26", yEps)} fill="none" stroke={T.deepBlue} strokeWidth="2.2" />

          {series.map(s => (
            <g key={s.key}>
              <circle cx={x(N - 1)} cy={yEps(s.current)} r="4" fill={s.color} />
              <circle cx={x(N - 1)} cy={yEps(s.current)} r="8" fill={s.color} opacity="0.2" />
            </g>
          ))}
          <circle cx={x(N - 1)} cy={yPrice(1308)} r="3" fill={T.textTer} />

          {[500, 700, 900, 1100, 1300].map(t => (
            <text key={t} x={padL - 8} y={yPrice(t) + 3} fontSize="10" textAnchor="end" fontFamily={Fn} fill={T.textTer} fontFeatureSettings='"tnum"'>€{t}</text>
          ))}
          <text x={14} y={padT + plotH / 2} fontSize="10" fontFamily={Fn} fill={T.textTer} textAnchor="middle" transform={`rotate(-90, 14, ${padT + plotH / 2})`} letterSpacing="0.1em">PRICE (€)</text>

          {[24, 30, 36, 42, 48].map(t => (
            <text key={t} x={W - padR + 8} y={yEps(t) + 3} fontSize="10" fontFamily={Fn} fill={T.textTer} fontFeatureSettings='"tnum"'>{t}</text>
          ))}
          <text x={W - 14} y={padT + plotH / 2} fontSize="10" fontFamily={Fn} fill={T.textTer} textAnchor="middle" transform={`rotate(90, ${W - 14}, ${padT + plotH / 2})`} letterSpacing="0.1em">EPS (€)</text>

          {revisionSeries.map((d, i) => {
            if (i % 3 !== 0 && i !== N - 1) return null;
            return <text key={i} x={x(i)} y={H - padB + 16} fontSize="10" textAnchor="middle" fontFamily={Fn} fill={T.textTer}>{d.date}</text>;
          })}
        </svg>
      </div>

      <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid " + T.border, fontSize: 11, color: T.textTer, fontFamily: Fn, lineHeight: 1.7 }}>
        Consensus 2026 EPS bottomed at €25.8 in August 2025 and has since recovered to €31.4. Price has more than doubled from the lows over the same window, but the trailing multiple has held relatively stable — the rally is being driven by earnings, not multiple expansion.
      </div>
    </Card>
  );
}

/* ─── Growth Trajectory bars ─── */
function GrowthTrajectory({ T, mob }) {
  const W = mob ? 720 : 920, H = 320;
  const padL = 50, padR = 24, padT = 28, padB = 50;
  const plotW = W - padL - padR, plotH = H - padT - padB;
  const series = [
    { key: "eps", label: "EPS Adj+", color: T.capRed },
    { key: "rev", label: "Revenue", color: T.deepBlue },
    { key: "ebitda", label: "EBITDA", color: T.purple },
  ];
  const periods = headlineGrowth.length;
  const groupW = plotW / periods;
  const barW = (groupW - 24) / series.length;
  const y = v => padT + plotH * (1 - v / 35);

  return (
    <Card T={T} style={{ padding: mob ? "20px 16px" : "26px 28px", marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn }}>Growth peaks in 2027, then moderates to low double-digits</div>
          <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginTop: 3 }}>Year-over-year growth, consensus. EPS leads revenue throughout, with margin expansion contributing.</div>
        </div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {series.map(s => (
            <div key={s.key} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 12, height: 12, background: s.color, borderRadius: 2, display: "inline-block" }} />
              <span style={{ fontSize: 11, color: T.textSec, fontFamily: Fn }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
          {[0, 10, 20, 30].map(t => (
            <g key={t}>
              <line x1={padL} x2={W - padR} y1={y(t)} y2={y(t)} stroke={T.border} strokeWidth="1" strokeDasharray="2 4" />
              <text x={padL - 8} y={y(t) + 3} fontSize="10" textAnchor="end" fontFamily={Fn} fill={T.textTer} fontFeatureSettings='"tnum"'>{t}%</text>
            </g>
          ))}
          {headlineGrowth.map((d, pi) => {
            const groupX = padL + pi * groupW + 12;
            return (
              <g key={pi}>
                <text x={padL + pi * groupW + groupW / 2} y={H - padB + 18} fontSize="11" textAnchor="middle" fontFamily={Fn} fill={pi === 0 ? T.textTer : T.textSec} fontWeight={pi >= 2 && pi <= 3 ? 600 : 400}>{d.period}</text>
                {pi === 2 && (
                  <text x={padL + pi * groupW + groupW / 2} y={H - padB + 34} fontSize="9" textAnchor="middle" fontFamily={Fn} fill={T.capRed} fontWeight="600" letterSpacing="0.08em">PEAK</text>
                )}
                {series.map((s, si) => {
                  const v = d[s.key], bx = groupX + si * barW, by = y(v), bh = (padT + plotH) - by;
                  return (
                    <g key={s.key}>
                      <rect x={bx} y={by} width={barW - 2} height={bh} fill={s.color} opacity={pi === 0 ? 0.5 : 1} rx={2} />
                      <text x={bx + (barW - 2) / 2} y={by - 4} fontSize="9" textAnchor="middle" fontFamily={Fn} fill={s.color} fontWeight="600" fontFeatureSettings='"tnum"'>{v.toFixed(0)}%</text>
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>
    </Card>
  );
}

/* ─── Multiple Compression line chart ─── */
function MultipleCompression({ T, mob }) {
  const W = mob ? 720 : 920, H = 300;
  const padL = 50, padR = 50, padT = 24, padB = 50;
  const plotW = W - padL - padR, plotH = H - padT - padB;
  const stages = [
    { label: "Trailing", k: "trailing" }, { label: "NTM", k: "fwd4q" },
    { label: "FY26", k: "fy26" }, { label: "FY27", k: "fy27" }, { label: "FY28", k: "fy28" },
  ];
  const lines = [
    { name: "P/E", row: multiples.find(m => m.label === "P/E Adj+"), color: T.capRed },
    { name: "EV/EBITDA", row: multiples.find(m => m.label === "EV/EBITDA"), color: T.deepBlue },
    { name: "EV/EBIT", row: multiples.find(m => m.label === "EV/EBIT"), color: T.purple },
  ];
  const xVals = stages.map((_, i) => padL + (i / (stages.length - 1)) * plotW);
  const y = v => padT + plotH * (1 - v / 55);

  return (
    <Card T={T} style={{ padding: mob ? "20px 16px" : "26px 28px", marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn }}>Forward multiples compress meaningfully on earnings delivery</div>
          <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginTop: 3 }}>P/E falls from 50.6x trailing to 27.7x on FY28E. The story does not require multiple expansion.</div>
        </div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {lines.map(s => (
            <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 14, height: 2, background: s.color, display: "inline-block" }} />
              <span style={{ fontSize: 11, color: T.textSec, fontFamily: Fn }}>{s.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
          {[10, 20, 30, 40, 50].map(t => (
            <g key={t}>
              <line x1={padL} x2={W - padR} y1={y(t)} y2={y(t)} stroke={T.border} strokeWidth="1" strokeDasharray="2 4" />
              <text x={padL - 8} y={y(t) + 3} fontSize="10" textAnchor="end" fontFamily={Fn} fill={T.textTer} fontFeatureSettings='"tnum"'>{t}x</text>
            </g>
          ))}
          {stages.map((s, i) => (
            <text key={i} x={xVals[i]} y={H - padB + 18} fontSize="11" textAnchor="middle" fontFamily={Fn} fill={T.textSec} fontWeight={i === 0 ? 600 : 400}>{s.label}</text>
          ))}
          {lines.map(L => {
            const pts = stages.map((s, i) => { const v = L.row[s.k]; return v == null ? null : { x: xVals[i], y: y(v), v }; });
            const valid = pts.filter(p => p);
            const d = valid.map((p, i) => (i === 0 ? "M " : "L ") + p.x + " " + p.y).join(" ");
            return (
              <g key={L.name}>
                <path d={d} fill="none" stroke={L.color} strokeWidth="2.5" />
                {valid.map((p, i) => (
                  <g key={i}>
                    <circle cx={p.x} cy={p.y} r="4" fill={L.color} />
                    <text x={p.x} y={p.y - 10} fontSize="10" textAnchor="middle" fontFamily={Fn} fill={L.color} fontWeight="600" fontFeatureSettings='"tnum"'>{p.v.toFixed(1)}x</text>
                  </g>
                ))}
              </g>
            );
          })}
        </svg>
      </div>
    </Card>
  );
}

/* ─── Profitability bars vs direct peers ─── */
function ProfitabilityVsPeers({ T, mob }) {
  const metrics = [
    { key: "ebitdaM", label: "EBITDA Margin", suffix: "%", scale: 50 },
    { key: "opM", label: "Operating Margin", suffix: "%", scale: 40 },
    { key: "roic", label: "ROIC", suffix: "%", scale: 55 },
    { key: "roe", label: "ROE", suffix: "%", scale: 70 },
    { key: "npm", label: "Net Profit Margin", suffix: "%", scale: 35 },
    { key: "capex", label: "Capex / Sales", suffix: "%", scale: 10 },
  ];
  return (
    <Card T={T} style={{ padding: mob ? "20px 16px" : "26px 28px", marginBottom: 16 }}>
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>ASML prints the best returns in its direct peer set</div>
        <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn }}>ASML in red, semicap peers in grey, BI peer median shown as dashed marker.</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(2, 1fr)", gap: mob ? 18 : 24 }}>
        {metrics.map(m => (
          <div key={m.key}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: T.textSec, fontFamily: Fn, letterSpacing: "0.04em", textTransform: "uppercase" }}>{m.label}</span>
              <span style={{ fontSize: 10, color: T.textTer, fontFamily: Fn }}>median {peerMedian[m.key].toFixed(1)}{m.suffix}</span>
            </div>
            {directPeers.map(p => {
              const v = p[m.key];
              if (v == null) return null;
              const pct = Math.max(0, Math.min(100, (v / m.scale) * 100));
              const color = p.isMe ? T.capRed : T.textTer;
              return (
                <div key={p.ticker} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <div style={{ width: 78, fontSize: 11, color: p.isMe ? T.text : T.textSec, fontFamily: Fn, fontWeight: p.isMe ? 600 : 400, textAlign: "right", flexShrink: 0 }}>{p.name}</div>
                  <div style={{ flex: 1, height: 14, background: T.pillBg, borderRadius: 3, position: "relative", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: pct + "%", background: color, opacity: p.isMe ? 1 : 0.5, borderRadius: 3, transition: "width 0.6s ease" }} />
                    <div style={{ position: "absolute", left: ((peerMedian[m.key] / m.scale) * 100) + "%", top: -2, bottom: -2, width: 0, borderLeft: `1.5px dashed ${T.textTer}` }} />
                  </div>
                  <div style={{ width: 44, textAlign: "right", fontSize: 11, fontFamily: Fn, color: p.isMe ? T.capRed : T.textSec, fontWeight: p.isMe ? 600 : 400, fontFeatureSettings: '"tnum"' }}>{v.toFixed(1)}{m.suffix}</div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid " + T.border, fontSize: 11, color: T.textTer, fontFamily: Fn, lineHeight: 1.7 }}>
        ASML leads the direct semicap peer set on ROIC (47.9% vs 22% peer median) and ROE (52.4% vs 33%), with margins broadly comparable to Lam and Applied. The trade-off is growth — sales running at 9.7% vs the 25%+ index median, reflecting both ASML's size and the lumpiness of EUV system shipments. The growth gap closes meaningfully in 2027.
      </div>
    </Card>
  );
}

/* ─── Premium to peers chart ─── */
function PremiumChart({ T, mob }) {
  const W = mob ? 720 : 920, H = 300;
  const padL = 50, padR = 24, padT = 28, padB = 50;
  const plotW = W - padL - padR, plotH = H - padT - padB;
  const N = premiumSeries.length;
  const x = i => padL + (i / (N - 1)) * plotW;
  const y = v => padT + plotH * (1 - (v - 22) / (45 - 22));

  const asmlPath = premiumSeries.map((d, i) => (i === 0 ? "M " : "L ") + x(i) + " " + y(d.asml)).join(" ");
  const compsPath = premiumSeries.map((d, i) => (i === 0 ? "M " : "L ") + x(i) + " " + y(d.comps)).join(" ");
  const areaPath = (
    premiumSeries.map((d, i) => (i === 0 ? "M " : "L ") + x(i) + " " + y(d.asml)).join(" ")
    + " " + premiumSeries.map((_, i) => "L " + x(N - 1 - i) + " " + y(premiumSeries[N - 1 - i].comps)).join(" ")
    + " Z"
  );

  return (
    <Card T={T} style={{ padding: mob ? "20px 16px" : "26px 28px", marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn }}>Premium to BI Generative AI peer set sits at ~10%</div>
          <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginTop: 3 }}>Forward P/E. ASML vs BI peer set average over 24 months.</div>
        </div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 14, height: 2, background: T.capRed, display: "inline-block" }} />
            <span style={{ fontSize: 11, color: T.textSec, fontFamily: Fn }}>ASML</span>
            <span style={{ fontSize: 11, color: T.capRed, fontFamily: Fn, fontWeight: 600 }}>37.4x</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 14, height: 2, background: T.textTer, display: "inline-block" }} />
            <span style={{ fontSize: 11, color: T.textSec, fontFamily: Fn }}>Peer Avg</span>
            <span style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, fontWeight: 600 }}>33.9x</span>
          </div>
        </div>
      </div>
      <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
          {[25, 30, 35, 40, 45].map(t => (
            <g key={t}>
              <line x1={padL} x2={W - padR} y1={y(t)} y2={y(t)} stroke={T.border} strokeWidth="1" strokeDasharray="2 4" />
              <text x={padL - 8} y={y(t) + 3} fontSize="10" textAnchor="end" fontFamily={Fn} fill={T.textTer} fontFeatureSettings='"tnum"'>{t}x</text>
            </g>
          ))}
          <path d={areaPath} fill={toRgba(T.capRed, 0.10)} stroke="none" />
          <path d={compsPath} fill="none" stroke={T.textTer} strokeWidth="2" />
          <path d={asmlPath} fill="none" stroke={T.capRed} strokeWidth="2.5" />
          <circle cx={x(N - 1)} cy={y(premiumSeries[N - 1].asml)} r="4" fill={T.capRed} />
          <circle cx={x(N - 1)} cy={y(premiumSeries[N - 1].comps)} r="4" fill={T.textTer} />
          {premiumSeries.map((d, i) => {
            if (i % 4 !== 0 && i !== N - 1) return null;
            return <text key={i} x={x(i)} y={H - padB + 18} fontSize="10" textAnchor="middle" fontFamily={Fn} fill={T.textTer}>{d.date}</text>;
          })}
        </svg>
      </div>
      <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid " + T.border, fontSize: 11, color: T.textTer, fontFamily: Fn, lineHeight: 1.7 }}>
        The ASML premium has compressed from ~4-5x P/E points in mid-2024 to ~3-4x today, despite the absolute multiple rising on EPS upgrades. Worth watching as the premium narrows further into the 2027 earnings ramp.
      </div>
    </Card>
  );
}

/* ─── Wide peer scatter ─── */
function WidePeerScatter({ T, mob }) {
  const W = mob ? 700 : 920, H = mob ? 480 : 520;
  const padL = 60, padR = 30, padT = 30, padB = 64;
  const plotW = W - padL - padR, plotH = H - padT - padB;

  const [xKey, setXKey] = useState("peFY1");
  const cfg = {
    peFY1: { label: "Forward P/E (FY1)", max: 110, ticks: [0, 25, 50, 75, 100] },
    peFY2: { label: "Forward P/E (FY2)", max: 80, ticks: [0, 20, 40, 60, 80] },
  }[xKey];

  const yMax = 90;
  const data = widePeers.filter(d => d[xKey] != null && d[xKey] <= cfg.max && d.evEbitdaFY1 != null && d.evEbitdaFY1 <= yMax);
  const x = v => padL + (v / cfg.max) * plotW;
  const y = v => padT + plotH * (1 - v / yMax);

  const minMcap = 20000, maxMcap = 5000000, minR = 5, maxR = 28;
  const r = mcap => {
    const lm = Math.log10(Math.max(minMcap, mcap)) - Math.log10(minMcap);
    const lr = Math.log10(maxMcap) - Math.log10(minMcap);
    return minR + (maxR - minR) * (lm / lr);
  };

  const groupColors = { Semicap: T.capRed, Semi: T.deepBlue, "AI Ecosystem": T.purple };

  const [hov, setHov] = useState(null);

  return (
    <Card T={T} style={{ padding: mob ? "20px 16px" : "26px 28px", marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn }}>26 names across the AI hardware and software stack</div>
          <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginTop: 3 }}>Forward P/E (x) vs EV/EBITDA FY1 (y). Bubble size = market cap (€). Hover to inspect.</div>
        </div>
        <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
          {Object.entries(groupColors).map(([k, c]) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 10, height: 10, background: c, borderRadius: "50%", display: "inline-block", opacity: 0.7 }} />
              <span style={{ fontSize: 11, color: T.textSec, fontFamily: Fn }}>{k}</span>
            </div>
          ))}
          <div style={{ display: "flex", gap: 2, background: T.pillBg, borderRadius: 8, padding: 2 }}>
            {["peFY1", "peFY2"].map(k => (
              <button key={k} onClick={() => setXKey(k)} style={{
                padding: "5px 10px", fontSize: 10, border: "none", cursor: "pointer", fontFamily: Fn, borderRadius: 6,
                background: xKey === k ? T.capRed : "transparent",
                color: xKey === k ? "#fff" : T.textTer, fontWeight: xKey === k ? 600 : 400,
              }}>{k === "peFY1" ? "FY1" : "FY2"}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", position: "relative" }}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
          {cfg.ticks.map(t => (
            <g key={t}>
              <line x1={x(t)} x2={x(t)} y1={padT} y2={padT + plotH} stroke={T.border} strokeWidth="1" strokeDasharray="2 4" />
              <text x={x(t)} y={H - padB + 18} fontSize="10" textAnchor="middle" fontFamily={Fn} fill={T.textTer} fontFeatureSettings='"tnum"'>{t}x</text>
            </g>
          ))}
          {[15, 30, 45, 60, 75].map(t => (
            <g key={t}>
              <line x1={padL} x2={W - padR} y1={y(t)} y2={y(t)} stroke={T.border} strokeWidth="1" strokeDasharray="2 4" />
              <text x={padL - 8} y={y(t) + 3} fontSize="10" textAnchor="end" fontFamily={Fn} fill={T.textTer} fontFeatureSettings='"tnum"'>{t}x</text>
            </g>
          ))}
          <text x={padL + plotW / 2} y={H - padB + 38} fontSize="11" textAnchor="middle" fontFamily={Fn} fill={T.textTer} letterSpacing="0.08em" textTransform="uppercase">{cfg.label.toUpperCase()}</text>
          <text x={18} y={padT + plotH / 2} fontSize="11" fontFamily={Fn} fill={T.textTer} textAnchor="middle" transform={`rotate(-90, 18, ${padT + plotH / 2})`} letterSpacing="0.08em">EV/EBITDA FY1</text>

          {data.filter(d => !d.isMe).map((d, i) => {
            const cx = x(d[xKey]), cy = y(d.evEbitdaFY1), rad = r(d.mcap);
            const color = groupColors[d.group];
            return (
              <g key={d.ticker} onMouseEnter={() => setHov(d)} onMouseLeave={() => setHov(null)} style={{ cursor: "pointer" }}>
                <circle cx={cx} cy={cy} r={rad} fill={color} opacity="0.35" stroke={color} strokeWidth="1.5" />
                {rad > 14 && <text x={cx} y={cy + 3} fontSize="9" textAnchor="middle" fontFamily={Fn} fill={T.text} fontWeight="600">{d.ticker}</text>}
              </g>
            );
          })}
          {data.filter(d => d.isMe).map(d => {
            const cx = x(d[xKey]), cy = y(d.evEbitdaFY1), rad = r(d.mcap);
            return (
              <g key={d.ticker} onMouseEnter={() => setHov(d)} onMouseLeave={() => setHov(null)} style={{ cursor: "pointer" }}>
                <circle cx={cx} cy={cy} r={rad + 4} fill="none" stroke={T.capRed} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
                <circle cx={cx} cy={cy} r={rad} fill={T.capRed} opacity="0.85" stroke={T.capRed} strokeWidth="2" />
                <text x={cx} y={cy + 3} fontSize="10" textAnchor="middle" fontFamily={Fn} fill="#fff" fontWeight="700">ASML</text>
              </g>
            );
          })}

          {hov && (
            <g>
              <rect x={Math.min(W - 200, Math.max(padL, x(hov[xKey]) + 14))} y={Math.max(padT, y(hov.evEbitdaFY1) - 60)} width="186" height="78" rx="6" fill={T.card} stroke={T.border} />
              <text x={Math.min(W - 192, Math.max(padL + 8, x(hov[xKey]) + 22))} y={Math.max(padT + 18, y(hov.evEbitdaFY1) - 42)} fontSize="12" fontFamily={Fn} fontWeight="700" fill={T.text}>{hov.name}</text>
              <text x={Math.min(W - 192, Math.max(padL + 8, x(hov[xKey]) + 22))} y={Math.max(padT + 34, y(hov.evEbitdaFY1) - 26)} fontSize="10" fontFamily={Fn} fill={T.textTer}>{hov.group} • {fmtMcap(hov.mcap)}</text>
              <text x={Math.min(W - 192, Math.max(padL + 8, x(hov[xKey]) + 22))} y={Math.max(padT + 50, y(hov.evEbitdaFY1) - 10)} fontSize="10" fontFamily={Fn} fill={T.textSec} fontFeatureSettings='"tnum"'>{cfg.label}: {hov[xKey].toFixed(1)}x</text>
              <text x={Math.min(W - 192, Math.max(padL + 8, x(hov[xKey]) + 22))} y={Math.max(padT + 66, y(hov.evEbitdaFY1) + 6)} fontSize="10" fontFamily={Fn} fill={T.textSec} fontFeatureSettings='"tnum"'>EV/EBITDA FY1: {hov.evEbitdaFY1.toFixed(1)}x</text>
            </g>
          )}
        </svg>
      </div>
      <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid " + T.border, fontSize: 11, color: T.textTer, fontFamily: Fn, lineHeight: 1.7 }}>
        ASML sits in the upper-mid range on FY1 P/E (41.6x) versus the broader 26-name set median of 38.4x. EV/EBITDA FY1 of 33.0x is above the median 28.8x but in line with semicap peers. The hyperscalers (MSFT, GOOGL, AMZN) sit notably cheaper on P/E given their scale, while smaller AI-pure-play names (ARM, PLTR, ALAB) trade at extreme multiples.
      </div>
    </Card>
  );
}

/* ─── Wide peer table — sortable ─── */
function WidePeerTable({ T }) {
  const [sortKey, setSortKey] = useState("mcap");
  const [asc, setAsc] = useState(false);
  const sorted = useMemo(() => {
    return [...widePeers].sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      if (av == null) return 1;
      if (bv == null) return -1;
      if (typeof av === "string") return asc ? av.localeCompare(bv) : bv.localeCompare(av);
      return asc ? av - bv : bv - av;
    });
  }, [sortKey, asc]);

  const handleSort = k => { if (sortKey === k) setAsc(!asc); else { setSortKey(k); setAsc(false); } };

  const cols = [
    { k: "name", l: "Name", align: "left" },
    { k: "group", l: "Group", align: "left" },
    { k: "mcap", l: "Mkt Cap", fmt: fmtMcap },
    { k: "evEbitdaFY1", l: "EV/EBITDA FY1", fmt: v => v.toFixed(1) + "x" },
    { k: "peFY1", l: "P/E FY1", fmt: v => v.toFixed(1) + "x" },
    { k: "peFY2", l: "P/E FY2", fmt: v => v.toFixed(1) + "x" },
    { k: "divYld", l: "Div Yld", fmt: v => v == null ? "—" : v.toFixed(2) + "%" },
  ];

  return (
    <Card T={T} style={{ padding: "20px 24px", marginBottom: 16, overflowX: "auto" }}>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn }}>Full peer set — sortable</div>
        <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginTop: 3 }}>EQRV comp set. Click any header to sort.</div>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, fontFamily: Fn, minWidth: 720 }}>
        <thead>
          <tr style={{ borderBottom: "1px solid " + T.border }}>
            {cols.map(c => (
              <th key={c.k} onClick={() => handleSort(c.k)} style={{ textAlign: c.align || "right", padding: "10px 8px", fontSize: 9, color: T.textTer, fontWeight: 600, letterSpacing: "0.06em", cursor: "pointer", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                {c.l}{sortKey === c.k && <span style={{ marginLeft: 3, fontSize: 7 }}>{asc ? "▲" : "▼"}</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((r, i) => (
            <tr key={r.ticker} style={{ borderBottom: "1px solid " + T.border, background: r.isMe ? toRgba(T.capRed, 0.05) : "transparent" }}>
              {cols.map(c => (
                <td key={c.k} style={{ padding: "8px", textAlign: c.align || "right", color: c.k === "name" ? (r.isMe ? T.capRed : T.text) : T.textSec, fontWeight: c.k === "name" ? 600 : 400, whiteSpace: "nowrap", fontFeatureSettings: c.k !== "name" && c.k !== "group" ? '"tnum"' : "normal" }}>
                  {c.fmt ? c.fmt(r[c.k]) : r[c.k]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

/* ─── Multiples Table ─── */
function MultiplesTable({ T }) {
  return (
    <Card T={T} style={{ padding: "20px 24px", marginBottom: 16, overflowX: "auto" }}>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn }}>Current and forward multiples</div>
        <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginTop: 3 }}>All multiples in turns. Trailing reflects last four quarters.</div>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: Fn, minWidth: 560 }}>
        <thead>
          <tr style={{ borderBottom: "1px solid " + T.border }}>
            <th style={{ textAlign: "left", padding: "10px 8px", fontSize: 9, color: T.textTer, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Multiple</th>
            {["Trailing", "NTM", "FY26", "FY27", "FY28"].map(h => (
              <th key={h} style={{ textAlign: "right", padding: "10px 8px", fontSize: 9, color: T.textTer, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {multiples.map(m => (
            <tr key={m.label} style={{ borderBottom: "1px solid " + T.border }}>
              <td style={{ padding: "10px 8px", color: T.text, fontWeight: 600 }}>{m.label}</td>
              {["trailing", "fwd4q", "fy26", "fy27", "fy28"].map(k => (
                <td key={k} style={{ padding: "10px 8px", textAlign: "right", color: T.textSec, fontFeatureSettings: '"tnum"' }}>
                  {m[k] == null ? "—" : m[k].toFixed(2) + "x"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

/* ═══════════════════════════════════════════
   MAIN TAB
   ═══════════════════════════════════════════ */
export default function ValuationTab({ T }) {
  const mob = useMobile();

  const sectionNav = [
    { id: "val-snapshot", label: "Snapshot" },
    { id: "val-revisions", label: "Revisions" },
    { id: "val-growth", label: "Growth" },
    { id: "val-multiples", label: "Multiples" },
    { id: "val-quality", label: "Quality vs Peers" },
    { id: "val-premium", label: "Premium" },
    { id: "val-wide", label: "AI Peer Set" },
  ];

  const scroll = id => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
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

      <div id="val-snapshot" style={{ scrollMarginTop: 80 }}>
        <SnapshotGrid T={T} mob={mob} />
      </div>

      <div id="val-revisions" style={{ scrollMarginTop: 80, borderTop: "1px solid " + T.border, paddingTop: 32, marginBottom: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.green, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 700 }}>EARNINGS REVISION MOMENTUM</div>
          <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 8 }}>The buy-side has been chasing the upgrades</h2>
          <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.7, fontFamily: Fn, margin: 0, maxWidth: 760 }}>Every consensus EPS forecast — 2026, 2027, 2028 — has been revised higher in the last seven months, with the steepest moves in 2027. The price has tracked, but the multiple has been remarkably stable, meaning the rally is fundamentally an earnings story.</p>
        </div>
        <RevisionChart T={T} mob={mob} />
      </div>

      <div id="val-growth" style={{ scrollMarginTop: 80, borderTop: "1px solid " + T.border, paddingTop: 32, marginBottom: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.capRed, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 700 }}>FORWARD GROWTH</div>
          <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 8 }}>EPS compounds in the high 20s through 2027</h2>
          <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.7, fontFamily: Fn, margin: 0, maxWidth: 760 }}>Revenue grows around 20% in both 2026 and 2027 before settling into low double digits as the EUV ramp matures. EPS growth runs ahead of revenue throughout, reflecting operating leverage and a richer mix.</p>
        </div>
        <GrowthTrajectory T={T} mob={mob} />
      </div>

      <div id="val-multiples" style={{ scrollMarginTop: 80, borderTop: "1px solid " + T.border, paddingTop: 32, marginBottom: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.deepBlue, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 700 }}>MULTIPLE COMPRESSION</div>
          <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 8 }}>You grow into the multiple</h2>
          <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.7, fontFamily: Fn, margin: 0, maxWidth: 760 }}>Trailing P/E of 51x looks demanding in isolation. On FY28 numbers it falls to 28x. The thesis does not require the multiple to expand from here.</p>
        </div>
        <MultipleCompression T={T} mob={mob} />
        <MultiplesTable T={T} />
      </div>

      <div id="val-quality" style={{ scrollMarginTop: 80, borderTop: "1px solid " + T.border, paddingTop: 32, marginBottom: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.purple, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 700 }}>QUALITY VS DIRECT PEERS</div>
          <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 8 }}>Best-in-class returns, premium margins</h2>
          <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.7, fontFamily: Fn, margin: 0, maxWidth: 760 }}>Against the four other names on the BI Generative AI Valuation peer set, ASML leads on ROIC and ROE and matches Lam on operating margin. Sales growth is the area where ASML trails — partly a function of size, partly the lumpiness of EUV system shipments.</p>
        </div>
        <ProfitabilityVsPeers T={T} mob={mob} />
      </div>

      <div id="val-premium" style={{ scrollMarginTop: 80, borderTop: "1px solid " + T.border, paddingTop: 32, marginBottom: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.orange, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 700 }}>PREMIUM TO PEERS</div>
          <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 8 }}>The premium is modest by historical standards</h2>
          <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.7, fontFamily: Fn, margin: 0, maxWidth: 760 }}>ASML trades at a ~10% forward P/E premium to the BI peer set. That sits in line with the two-year average and well below the 15-20% premium briefly observed in mid-2024. Given ASML's monopoly position, the current premium does not look stretched.</p>
        </div>
        <PremiumChart T={T} mob={mob} />
      </div>

      <div id="val-wide" style={{ scrollMarginTop: 80, borderTop: "1px solid " + T.border, paddingTop: 32, marginBottom: 32 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.text, letterSpacing: "0.15em", marginBottom: 8, fontWeight: 700 }}>WIDER AI ECOSYSTEM</div>
          <h2 style={{ fontFamily: Fn, fontSize: 24, fontWeight: 300, color: T.text, margin: 0, marginBottom: 8 }}>Where ASML sits in the broader picture</h2>
          <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.7, fontFamily: Fn, margin: 0, maxWidth: 760 }}>The full 26-name comp set spans semicap equipment, chips, foundries, hyperscalers, and AI infrastructure. ASML is one of the larger names by market cap and prices toward the upper-middle of the range — reasonable given its strategic position.</p>
        </div>
        <WidePeerScatter T={T} mob={mob} />
        <WidePeerTable T={T} />
      </div>

      <Card T={T} style={{ padding: mob ? "22px 20px" : "28px 32px", borderLeft: `4px solid ${T.green}`, marginBottom: 24 }}>
        <div style={{ fontSize: 10, fontFamily: Fn, color: T.green, letterSpacing: "0.15em", marginBottom: 10, fontWeight: 700 }}>NET</div>
        <p style={{ fontSize: 14, color: T.textSec, fontFamily: Fn, lineHeight: 1.85, margin: 0, maxWidth: 780 }}>{bottomLine}</p>
      </Card>

      <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, lineHeight: 1.7, maxWidth: 700, paddingBottom: 20 }}>
        Data: Bloomberg consensus screens, EQRV peer set, BI Generative AI Val index. All figures in EUR. Snapshot as at 15-May-2026. For informational purposes only — does not constitute investment advice.
      </div>
    </div>
  );
}
