import { useState, useMemo, useCallback, useEffect } from "react";
import { Fn } from "../theme";
import { Card, Label } from "../components/shared";
import { sectors, logoUrl } from "../data/research-thematic-map";
import { holdings } from "../data/portfolio";

/* ─── Geometry helpers ─── */
const TAU = 2 * Math.PI;
const polar = (cx, cy, r, a) => ({ x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) });
const arcPath = (cx, cy, rO, rI, s, e) => {
  const gap = 0.01;
  const s1 = s + gap, e1 = e - gap;
  if (e1 <= s1) return "";
  const oS = polar(cx, cy, rO, s1), oE = polar(cx, cy, rO, e1);
  const iE = polar(cx, cy, rI, e1), iS = polar(cx, cy, rI, s1);
  const lg = e1 - s1 > Math.PI ? 1 : 0;
  return `M${oS.x},${oS.y} A${rO},${rO} 0 ${lg} 1 ${oE.x},${oE.y} L${iE.x},${iE.y} A${rI},${rI} 0 ${lg} 0 ${iS.x},${iS.y} Z`;
};

/* ─── Portfolio matching ─── */
const heldMap = {
  "NVDA": true, "AVGO": true, "TSM": true, "MSFT": true, "GOOGL": true, "NOW": true,
  "SIE": true, "ROK": true, "JPM": true, "ICE": true, "AMZN": true, "BKNG": true,
  "NFLX": true, "0700": true, "TMO": true, "AI": true, "META": false,
};
const isHeld = (ticker) => {
  if (heldMap[ticker] !== undefined) return heldMap[ticker];
  return holdings.some(h => h.t === ticker || h.t.startsWith(ticker + ".") || h.name.toUpperCase() === ticker.toUpperCase());
};

/* ─── Donut Chart Component ─── */
function Donut({ items, onSliceClick, activeIdx, T, compact }) {
  const isDark = T.bg !== "#F8F9FC";
  const W = compact ? 380 : 520;
  const H = compact ? 380 : 520;
  const cx = W / 2, cy = H / 2;
  const rO = compact ? 130 : 185;
  const rI = rO * 0.52;
  const total = items.reduce((s, i) => s + i.value, 0);
  const [hov, setHov] = useState(-1);

  const slices = useMemo(() => {
    let a = -Math.PI / 2;
    return items.map((item, i) => {
      const sweep = (item.value / total) * TAU;
      const start = a;
      a += sweep;
      const mid = start + sweep / 2;
      return { ...item, start, end: a, mid, sweep, i };
    });
  }, [items, total]);

  // External label positions with collision avoidance
  const labels = useMemo(() => {
    const labelR = rO + (compact ? 22 : 32);
    const anchorR = rO + 6;
    return slices.map(s => {
      const ax = cx + anchorR * Math.cos(s.mid);
      const ay = cy + anchorR * Math.sin(s.mid);
      const lx = cx + labelR * Math.cos(s.mid);
      const ly = cy + labelR * Math.sin(s.mid);
      const isRight = Math.cos(s.mid) >= 0;
      const endX = isRight ? lx + (compact ? 18 : 28) : lx - (compact ? 18 : 28);
      return { ax, ay, lx, ly, endX, endY: ly, isRight, slice: s };
    });
  }, [slices, cx, cy, rO, compact]);

  const hovSlice = hov >= 0 ? slices[hov] : null;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block", margin: "0 auto" }}>
      {/* Slices */}
      {slices.map(s => {
        const isAct = activeIdx === s.i;
        const isHov = hov === s.i;
        const off = isAct ? 8 : isHov ? 4 : 0;
        const dx = off * Math.cos(s.mid), dy = off * Math.sin(s.mid);
        return (
          <g key={s.i}
            onClick={() => onSliceClick(s.i)}
            onMouseEnter={() => setHov(s.i)}
            onMouseLeave={() => setHov(-1)}
            style={{ cursor: "pointer" }}
          >
            <path
              d={arcPath(cx + dx, cy + dy, rO, rI, s.start, s.end)}
              fill={s.color}
              opacity={activeIdx >= 0 && !isAct ? 0.15 : isHov ? 1 : 0.8}
              style={{ transition: "opacity 0.3s" }}
            />
          </g>
        );
      })}

      {/* External labels + leader lines */}
      {labels.map(({ ax, ay, lx, ly, endX, endY, isRight, slice: s }) => {
        const isAct = activeIdx === s.i;
        const isHov = hov === s.i;
        const op = activeIdx >= 0 && !isAct ? 0.2 : isHov || isAct ? 1 : 0.7;
        const fontSize = compact ? 8 : 10;
        const pctSize = compact ? 7 : 8;
        return (
          <g key={`l${s.i}`} style={{ transition: "opacity 0.3s", opacity: op, pointerEvents: "none" }}>
            {/* Leader line */}
            <line x1={ax} y1={ay} x2={lx} y2={ly} stroke={s.color} strokeWidth={1} opacity={0.5} />
            <line x1={lx} y1={ly} x2={endX} y2={endY} stroke={s.color} strokeWidth={1} opacity={0.5} />
            <circle cx={ax} cy={ay} r={2} fill={s.color} />
            {/* Label */}
            <text
              x={isRight ? endX + 4 : endX - 4} y={endY - 2}
              textAnchor={isRight ? "start" : "end"} dominantBaseline="auto"
              fontSize={fontSize} fontWeight={isAct ? "800" : "600"} fontFamily={Fn}
              fill={isAct ? s.color : T.text}
            >
              {s.short}
            </text>
            <text
              x={isRight ? endX + 4 : endX - 4} y={endY + (compact ? 9 : 11)}
              textAnchor={isRight ? "start" : "end"} dominantBaseline="auto"
              fontSize={pctSize} fontWeight="500" fontFamily={Fn}
              fill={T.textTer}
            >
              {s.weight}% · {Math.round((s.value / total) * items.reduce((sum, it) => sum + it.value, 0))} themes
            </text>
          </g>
        );
      })}

      {/* Center circle */}
      <circle cx={cx} cy={cy} r={rI - 3} fill={T.card} />
      <circle cx={cx} cy={cy} r={rI - 3} fill="none" stroke={T.border} strokeWidth="1" />

      {/* Center text */}
      {!compact && (
        <>
          <text x={cx} y={cy - 14} textAnchor="middle" fontSize="11" fontWeight="400" fontFamily={Fn} fill={T.textTer}>GICS</text>
          <text x={cx} y={cy + 12} textAnchor="middle" fontSize="36" fontWeight="200" fontFamily={Fn} fill={T.text} letterSpacing="-0.03em">10</text>
          <text x={cx} y={cy + 28} textAnchor="middle" fontSize="10" fontFamily={Fn} fill={T.textTer}>sectors</text>
        </>
      )}
      {compact && (
        <>
          <text x={cx} y={cy - 6} textAnchor="middle" fontSize="9" fontWeight="400" fontFamily={Fn} fill={T.textTer}>GICS</text>
          <text x={cx} y={cy + 14} textAnchor="middle" fontSize="26" fontWeight="200" fontFamily={Fn} fill={T.text}>10</text>
        </>
      )}

      {/* Hover tooltip */}
      {hovSlice && (
        <g>
          <rect
            x={cx - 70} y={cy + rI + 12} width={140} height={32} rx={8}
            fill={isDark ? "rgba(17,17,19,0.92)" : "rgba(255,255,255,0.95)"}
            stroke={hovSlice.color} strokeWidth="1.5"
          />
          <text x={cx} y={cy + rI + 26} textAnchor="middle" fontSize="10" fontWeight="700" fontFamily={Fn} fill={hovSlice.color}>
            {hovSlice.short}
          </text>
          <text x={cx} y={cy + rI + 38} textAnchor="middle" fontSize="8" fontFamily={Fn} fill={T.textTer}>
            {hovSlice.weight}% weight · {Math.round((hovSlice.value / total) * total)} themes
          </text>
        </g>
      )}
    </svg>
  );
}

/* ─── Theme Card (expandable) ─── */
function ThemeCard({ theme, sector, isOpen, onClick, T }) {
  const isDark = T.bg !== "#F8F9FC";
  return (
    <div
      onClick={onClick}
      style={{
        borderRadius: 8, cursor: "pointer", overflow: "hidden",
        border: `1.5px solid ${isOpen ? sector.color : T.border}`,
        background: isOpen ? (sector.color + (isDark ? "12" : "06")) : (isDark ? "rgba(255,255,255,0.015)" : "rgba(0,0,0,0.006)"),
        transition: "all 0.2s",
      }}
    >
      {/* Header */}
      <div style={{ padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, fontWeight: 700, fontFamily: Fn, color: isOpen ? sector.color : T.text }}>{theme.name}</span>
            <span style={{
              fontSize: 7, fontWeight: 800, fontFamily: Fn, padding: "2px 5px", borderRadius: 3, letterSpacing: "0.03em",
              background: theme.type.includes("SECULAR") ? T.greenBg : (T.orange + "12"),
              color: theme.type.includes("SECULAR") ? T.green : T.orange,
            }}>
              {theme.type}
            </span>
          </div>
          <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 2 }}>{theme.companies.length} companies</div>
        </div>
        <span style={{ fontSize: 14, color: T.textTer, transition: "transform 0.2s", transform: isOpen ? "rotate(90deg)" : "rotate(0)", flexShrink: 0 }}>▸</span>
      </div>

      {/* Expanded content */}
      {isOpen && (
        <div style={{ padding: "0 12px 12px" }}>
          <div style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.65, marginBottom: 12, padding: "8px 10px", borderRadius: 6, background: isDark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.015)", borderLeft: `3px solid ${sector.color}` }}>
            {theme.desc}
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            {theme.companies.map((c, j) => {
              const held = isHeld(c.ticker);
              const logo = logoUrl(c.ticker, c.name);
              return (
                <div key={j} style={{
                  display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 10px", borderRadius: 6,
                  background: held ? (sector.color + (isDark ? "18" : "0A")) : (isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)"),
                  border: held ? `1px solid ${sector.color}35` : "1px solid transparent",
                }}>
                  {logo && <img src={logo} alt="" style={{ width: 24, height: 24, borderRadius: 5, marginTop: 1 }} onError={e => e.target.style.display = "none"} />}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, fontFamily: Fn, color: T.text }}>{c.name}</span>
                      <span style={{ fontSize: 9, color: T.textTer, fontFamily: Fn }}>{c.ticker} · {c.hq}</span>
                      {held && <span style={{ fontSize: 7, fontWeight: 800, fontFamily: Fn, padding: "1px 5px", borderRadius: 3, background: sector.color + "22", color: sector.color, letterSpacing: "0.04em" }}>IN PORTFOLIO</span>}
                    </div>
                    <div style={{ fontSize: 10, color: T.textSec, fontFamily: Fn, lineHeight: 1.55, marginTop: 3 }}>{c.why}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Sector Detail Panel ─── */
function SectorPanel({ sector, activeTheme, setActiveTheme, T }) {
  const companyCount = sector.themes.reduce((s, t) => s + t.companies.length, 0);
  const heldCount = sector.themes.reduce((s, t) => s + t.companies.filter(c => isHeld(c.ticker)).length, 0);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <div style={{ width: 6, height: 36, borderRadius: 3, background: sector.color }} />
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, fontFamily: Fn, color: T.text, letterSpacing: "-0.02em" }}>{sector.name}</div>
          <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn }}>
            {sector.themes.length} themes · {companyCount} companies · {heldCount} held · {sector.weight}% portfolio weight
          </div>
        </div>
      </div>

      <div style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.6, marginBottom: 14, padding: "8px 0" }}>
        <span style={{ fontWeight: 600, color: T.text }}>Investment themes: </span>{sector.keyThemes}.
        {sector.stocks > 0 && <> The fund holds <span style={{ fontWeight: 600, color: sector.color }}>{sector.stocks} positions</span> in this sector at <span style={{ fontWeight: 600 }}>{sector.weight}%</span> of NAV — {sector.weight > 10 ? "an overweight relative to the ACWI benchmark, reflecting high conviction in the structural themes below" : sector.weight > 0 ? "a selective exposure focused on the highest-conviction names" : "currently zero-weighted, with the companies below representing the watchlist for future entry points"}.</>}
        {sector.stocks === 0 && <> The fund currently holds <span style={{ fontWeight: 600, color: T.orange }}>zero positions</span> in this sector. The companies below represent the investable universe and watchlist — candidates for entry if valuations or catalysts align.</>}
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        {sector.themes.map((theme, i) => (
          <ThemeCard
            key={i}
            theme={theme}
            sector={sector}
            isOpen={activeTheme === i}
            onClick={() => setActiveTheme(activeTheme === i ? -1 : i)}
            T={T}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function ResearchThematicMap({ T }) {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const c = () => setMobile(window.innerWidth < 768);
    c(); window.addEventListener("resize", c);
    return () => window.removeEventListener("resize", c);
  }, []);

  const isDark = T.bg !== "#F8F9FC";
  const [activeSector, setActiveSector] = useState(-1);
  const [activeTheme, setActiveTheme] = useState(-1);

  const donutItems = useMemo(() => sectors.map(s => ({
    label: s.name, short: s.short,
    value: Math.max(s.themes.length, 1),
    color: s.color, weight: s.weight,
  })), []);

  const totalThemes = sectors.reduce((s, sec) => s + sec.themes.length, 0);
  const totalCos = sectors.reduce((s, sec) => s + sec.themes.reduce((s2, t) => s2 + t.companies.length, 0), 0);

  const handleSectorClick = useCallback((idx) => {
    setActiveSector(p => p === idx ? -1 : idx);
    setActiveTheme(-1);
  }, []);

  const cur = activeSector >= 0 ? sectors[activeSector] : null;

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontFamily: Fn, fontSize: 22, fontWeight: 300, letterSpacing: "-0.03em", color: T.text, margin: 0 }}>
          Thematic Universe
        </h2>
        <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, lineHeight: 1.6, marginTop: 6, maxWidth: 680 }}>
          The full investable universe mapped across 10 GICS sectors, {totalThemes} structural themes, and ~{totalCos} best-in-class companies globally. Click a sector in the chart to drill into its themes, then expand any theme to see the companies and the investment reasoning behind each.
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 14, fontSize: 11, fontFamily: Fn }}>
        <span
          onClick={() => { setActiveSector(-1); setActiveTheme(-1); }}
          style={{ color: cur ? T.deepBlue : T.text, cursor: cur ? "pointer" : "default", fontWeight: cur ? 500 : 700 }}
        >
          All Sectors
        </span>
        {cur && (
          <>
            <span style={{ color: T.textTer }}>›</span>
            <span style={{ fontWeight: 700, color: cur.color }}>{cur.name}</span>
            <span style={{ color: T.textTer, fontSize: 10 }}>({cur.themes.length} themes)</span>
          </>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : (cur ? "360px 1fr" : "1fr"), gap: 20, alignItems: "start" }}>
        {/* Left: Donut + legend */}
        <Card T={T} style={{ padding: cur ? 14 : 20 }}>
          <Donut
            items={donutItems}
            onSliceClick={handleSectorClick}
            activeIdx={activeSector}
            T={T}
            compact={!!cur}
          />

          {/* Legend */}
          <div style={{ display: "grid", gap: 3, marginTop: 14 }}>
            {sectors.map((s, i) => {
              const isAct = activeSector === i;
              return (
                <div
                  key={s.id}
                  onClick={() => handleSectorClick(i)}
                  style={{
                    display: "flex", alignItems: "center", gap: 8, padding: "5px 8px", borderRadius: 6,
                    cursor: "pointer", transition: "all 0.15s",
                    background: isAct ? (s.color + (isDark ? "22" : "0E")) : "transparent",
                    opacity: activeSector >= 0 && !isAct ? 0.35 : 1,
                  }}
                >
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: s.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, fontFamily: Fn, fontWeight: isAct ? 700 : 500, color: isAct ? s.color : T.text, flex: 1 }}>{s.short}</span>
                  <span style={{ fontSize: 9, fontFamily: Fn, color: T.textTer, fontFeatureSettings: '"tnum"' }}>{s.themes.length} themes</span>
                  <span style={{ fontSize: 9, fontFamily: Fn, color: T.textTer, fontFeatureSettings: '"tnum"', minWidth: 28, textAlign: "right" }}>{s.weight}%</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Right: Sector detail panel */}
        {cur && (
          <Card T={T}>
            <SectorPanel
              sector={cur}
              activeTheme={activeTheme}
              setActiveTheme={setActiveTheme}
              T={T}
            />
          </Card>
        )}
      </div>

      {/* Overview stats when no sector selected */}
      {!cur && (
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 12, marginTop: 16 }}>
          {[
            { v: "10", l: "GICS Sectors", s: "Full market coverage" },
            { v: String(totalThemes), l: "Structural Themes", s: "Secular & cyclical" },
            { v: `~${totalCos}`, l: "Companies Mapped", s: "Best-in-class global" },
            { v: "26", l: "CEF Holdings", s: "Concentrated portfolio" },
          ].map((d, i) => (
            <Card key={i} T={T} style={{ textAlign: "center", padding: 14 }}>
              <div style={{ fontSize: 26, fontWeight: 800, fontFamily: Fn, color: T.text, letterSpacing: "-0.03em" }}>{d.v}</div>
              <div style={{ fontSize: 11, fontWeight: 600, fontFamily: Fn, color: T.textSec, marginTop: 2 }}>{d.l}</div>
              <div style={{ fontSize: 9, color: T.textTer, fontFamily: Fn, marginTop: 1 }}>{d.s}</div>
            </Card>
          ))}
        </div>
      )}

      {/* Footer */}
      <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, textAlign: "center", marginTop: 20, padding: "12px 0", borderTop: "1px solid " + T.border }}>
        Cape Capital AG · Thematic Universe · {totalThemes} themes · ~{totalCos} companies · March 2026
      </div>
    </div>
  );
}
