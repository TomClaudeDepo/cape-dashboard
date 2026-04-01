import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { Fn } from "../theme";
import { Card } from "../components/shared";
import { sectors, metaThemes, crossSectorLinks, logoUrl } from "../data/research-thematic-map";
import { holdings } from "../data/portfolio";

/* ─── Portfolio matching ─── */
const heldMap = {
  "NVDA":true,"AVGO":true,"TSM":true,"MSFT":true,"GOOGL":true,"NOW":true,
  "SIE":true,"ROK":true,"JPM":true,"ICE":true,"AMZN":true,"BKNG":true,
  "NFLX":true,"0700":true,"TMO":true,"AI":true,"META":false,
  "CEG":true,"LLY":true,"RHM":true,"MELI":true,"SAF":true,"LIN":true,
  "BKR":true,"SU":true,"ETN":true,
};
const isHeld = t => heldMap[t] !== undefined ? heldMap[t] : holdings.some(h => h.t === t || h.t.startsWith(t + "."));
const getHeld = s => { const seen = new Set(), out = []; s.themes.forEach(t => t.companies.forEach(c => { if (isHeld(c.ticker) && !seen.has(c.ticker)) { seen.add(c.ticker); out.push(c); }})); return out; };
const countHeld = s => getHeld(s).length;
const totalCos = s => s.themes.reduce((n, t) => n + t.companies.length, 0);
const unique = arr => [...new Set(arr)];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SECTOR TILE — calm, minimal surface
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function SectorTile({ sector, isActive, onClick, T, isDark, dimmed }) {
  const held = getHeld(sector);
  return (
    <div onClick={onClick}
      style={{
        background: T.card,
        borderRadius: 8,
        cursor: "pointer",
        overflow: "hidden",
        transition: "all 0.2s ease",
        border: `1px solid ${isActive ? sector.color : T.border}`,
        opacity: dimmed ? 0.3 : 1,
      }}
      onMouseEnter={e => { if (!isActive && !dimmed) e.currentTarget.style.borderColor = sector.color + "60"; }}
      onMouseLeave={e => { if (!isActive && !dimmed) e.currentTarget.style.borderColor = T.border; }}
    >
      {/* Thin color accent */}
      <div style={{ height: 2, background: sector.color, opacity: isActive ? 1 : 0.4 }} />

      <div style={{ padding: "14px 16px 12px" }}>
        {/* Name + weight row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: held.length > 0 ? 10 : 4 }}>
          <div>
            <span style={{ fontSize: 14, fontWeight: 700, fontFamily: Fn, color: T.text, letterSpacing: "-0.01em" }}>
              {sector.short}
            </span>
            <span style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, marginLeft: 6 }}>
              {sector.themes.length} themes
            </span>
          </div>
          {sector.weight > 0 ? (
            <span style={{ fontSize: 18, fontWeight: 800, fontFamily: Fn, color: sector.color, letterSpacing: "-0.04em", fontFeatureSettings: '"tnum"' }}>
              {sector.weight}<span style={{ fontSize: 10, fontWeight: 600, opacity: 0.7 }}>%</span>
            </span>
          ) : (
            <span style={{ fontSize: 8, fontWeight: 600, fontFamily: Fn, color: T.textTer, letterSpacing: "0.04em" }}>WATCHLIST</span>
          )}
        </div>

        {/* Held logos — only visual element beyond name/weight */}
        {held.length > 0 && (
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {held.slice(0, 6).map(c => {
              const logo = logoUrl(c.ticker);
              return (
                <div key={c.ticker} title={c.name} style={{
                  display: "flex", alignItems: "center", gap: 3,
                  padding: "2px 6px 2px 3px", borderRadius: 4,
                  background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.025)",
                }}>
                  {logo && <img src={logo} alt="" style={{ width: 12, height: 12, borderRadius: 2 }} onError={e => e.target.style.display = "none"} />}
                  <span style={{ fontSize: 9, fontWeight: 600, fontFamily: Fn, color: T.textSec }}>{c.ticker}</span>
                </div>
              );
            })}
            {held.length > 6 && <span style={{ fontSize: 9, fontFamily: Fn, color: T.textTer, alignSelf: "center" }}>+{held.length - 6}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   THEME ROW — flat, quiet, opens to full detail
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function ThemeRow({ theme, sector, isOpen, onClick, T, isDark }) {
  const heldInTheme = theme.companies.filter(c => isHeld(c.ticker)).length;
  return (
    <div style={{ borderRadius: 6, overflow: "hidden" }}>
      <div onClick={onClick}
        style={{
          display: "flex", alignItems: "center", gap: 10, padding: "8px 10px",
          cursor: "pointer", transition: "background 0.15s",
          background: isOpen ? (sector.color + (isDark ? "08" : "04")) : "transparent",
          borderRadius: 6,
        }}
        onMouseEnter={e => { if (!isOpen) e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)"; }}
        onMouseLeave={e => { if (!isOpen) e.currentTarget.style.background = "transparent"; }}
      >
        <div style={{ width: 2, height: 16, borderRadius: 1, background: sector.color, opacity: isOpen ? 1 : 0.25, transition: "opacity 0.2s", flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 600, fontFamily: Fn, color: T.text }}>{theme.name}</span>
          {!isOpen && heldInTheme > 0 && (
            <span style={{ fontSize: 9, fontFamily: Fn, color: sector.color, marginLeft: 6, fontWeight: 600 }}>{heldInTheme} held</span>
          )}
        </div>
        <span style={{ fontSize: 8, fontFamily: Fn, color: T.textTer, fontWeight: 500, flexShrink: 0 }}>
          {theme.type.includes("SECULAR") ? "secular" : theme.type.includes("CYCLICAL") ? "cyclical" : "structural"}
        </span>
        <span style={{ fontSize: 11, color: T.textTer, transition: "transform 0.2s", transform: isOpen ? "rotate(90deg)" : "rotate(0)", flexShrink: 0 }}>›</span>
      </div>

      {isOpen && (
        <div style={{ padding: "2px 10px 12px 22px" }}>
          <div style={{ fontSize: 10, color: T.textSec, fontFamily: Fn, lineHeight: 1.6, marginBottom: 8, paddingLeft: 2 }}>
            {theme.desc}
          </div>
          <div style={{ display: "grid", gap: 4 }}>
            {theme.companies.map((c, j) => {
              const held = isHeld(c.ticker);
              const logo = logoUrl(c.ticker);
              return (
                <div key={j} style={{
                  display: "flex", alignItems: "flex-start", gap: 8, padding: "7px 10px",
                  borderRadius: 5,
                  background: held ? (sector.color + (isDark ? "0A" : "04")) : (isDark ? "rgba(255,255,255,0.015)" : "rgba(0,0,0,0.008)"),
                  border: held ? `1px solid ${sector.color}18` : "1px solid transparent",
                }}>
                  {logo && <img src={logo} alt="" style={{ width: 20, height: 20, borderRadius: 4, marginTop: 1 }} onError={e => e.target.style.display = "none"} />}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, fontFamily: Fn, color: T.text }}>{c.name}</span>
                      <span style={{ fontSize: 8, fontFamily: Fn, color: T.textTer }}>{c.ticker}</span>
                      {held && <span style={{ fontSize: 7, fontWeight: 700, fontFamily: Fn, padding: "1px 4px", borderRadius: 2, background: sector.color + "18", color: sector.color }}>HELD</span>}
                    </div>
                    <div style={{ fontSize: 10, color: T.textSec, fontFamily: Fn, lineHeight: 1.45, marginTop: 2 }}>{c.why}</div>
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

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   EXPANDED SECTOR — clean hierarchy, categories as subtle dividers
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function SectorExpanded({ sector, onClose, T, isDark, searchTerm }) {
  const [openTheme, setOpenTheme] = useState(-1);
  const [showEvidence, setShowEvidence] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) ref.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    setOpenTheme(-1);
    setShowEvidence(false);
  }, [sector.id]);

  const held = getHeld(sector);
  const categories = unique(sector.themes.map(t => t.category).filter(Boolean));

  // Group themes by category
  const grouped = useMemo(() => {
    const g = {};
    sector.themes.forEach((t, i) => {
      const cat = t.category || "Other";
      if (!g[cat]) g[cat] = [];
      g[cat].push({ ...t, _idx: i });
    });
    return g;
  }, [sector]);

  return (
    <div ref={ref} style={{ gridColumn: "1 / -1" }}>
      <div style={{
        background: T.card, borderRadius: 8, overflow: "hidden",
        border: `1px solid ${T.border}`, borderTop: `2px solid ${sector.color}`,
      }}>
        {/* Header — minimal */}
        <div style={{ padding: "16px 18px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ fontSize: 16, fontWeight: 700, fontFamily: Fn, color: T.text, letterSpacing: "-0.02em" }}>{sector.name}</span>
              {sector.weight > 0 && (
                <span style={{ fontSize: 12, fontWeight: 700, fontFamily: Fn, color: sector.color, fontFeatureSettings: '"tnum"' }}>{sector.weight}%</span>
              )}
              <span style={{ fontSize: 9, fontFamily: Fn, color: T.textTer }}>
                {sector.themes.length} themes · {totalCos(sector)} companies · {categories.length} categories
              </span>
            </div>
            <button onClick={onClose} style={{
              background: "transparent", border: `1px solid ${T.border}`, borderRadius: 5,
              width: 24, height: 24, fontSize: 10, color: T.textTer, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>✕</button>
          </div>

          {/* Held positions + evidence toggle — single clean row */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
            {held.length > 0 && held.map(c => {
              const logo = logoUrl(c.ticker);
              return (
                <div key={c.ticker} style={{
                  display: "flex", alignItems: "center", gap: 3,
                  padding: "3px 6px 3px 3px", borderRadius: 4,
                  background: sector.color + (isDark ? "10" : "06"),
                }}>
                  {logo && <img src={logo} alt="" style={{ width: 14, height: 14, borderRadius: 3 }} onError={e => e.target.style.display = "none"} />}
                  <span style={{ fontSize: 9, fontWeight: 700, fontFamily: Fn, color: T.text }}>{c.ticker}</span>
                </div>
              );
            })}
            {held.length === 0 && (
              <span style={{ fontSize: 9, fontFamily: Fn, color: T.textTer }}>No positions held</span>
            )}
            {sector.evidence?.length > 0 && (
              <button onClick={() => setShowEvidence(!showEvidence)} style={{
                marginLeft: "auto", padding: "3px 8px", borderRadius: 4,
                fontSize: 9, fontFamily: Fn, fontWeight: 500,
                border: `1px solid ${showEvidence ? sector.color + "40" : T.border}`,
                background: showEvidence ? sector.color + (isDark ? "0A" : "04") : "transparent",
                color: showEvidence ? sector.color : T.textTer, cursor: "pointer",
              }}>
                Evidence {showEvidence ? "▾" : "▸"}
              </button>
            )}
          </div>

          {/* Evidence timeline — only when toggled */}
          {showEvidence && sector.evidence && (
            <div style={{ marginBottom: 14, paddingBottom: 10, borderBottom: `1px solid ${T.border}` }}>
              {[...sector.evidence].sort((a, b) => b.date.localeCompare(a.date)).map((ev, i) => (
                <div key={i} style={{
                  display: "flex", gap: 8, padding: "5px 0", fontSize: 10, fontFamily: Fn,
                  borderLeft: `2px solid ${i === 0 ? sector.color : sector.color + "30"}`,
                  paddingLeft: 10, marginLeft: 2, marginBottom: 2,
                }}>
                  <span style={{ fontWeight: 600, color: sector.color, fontSize: 9, fontFeatureSettings: '"tnum"', flexShrink: 0 }}>
                    {ev.date.slice(0, 7)}
                  </span>
                  <span style={{ color: T.textSec, lineHeight: 1.4 }}>
                    {ev.text} <span style={{ color: T.textTer, fontSize: 8 }}>— {ev.source}</span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Themes — grouped by category with subtle dividers */}
        <div style={{ padding: "0 10px 14px" }}>
          {Object.entries(grouped).map(([cat, themes], gi) => (
            <div key={cat}>
              <div style={{
                fontSize: 8, fontWeight: 600, fontFamily: Fn, color: T.textTer,
                textTransform: "uppercase", letterSpacing: "0.06em",
                padding: "8px 10px 4px",
                borderTop: gi > 0 ? `1px solid ${T.border}` : "none",
              }}>
                {cat}
              </div>
              {themes.map(theme => (
                <ThemeRow
                  key={theme._idx} theme={theme} sector={sector}
                  isOpen={openTheme === theme._idx}
                  onClick={() => setOpenTheme(openTheme === theme._idx ? -1 : theme._idx)}
                  T={T} isDark={isDark}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CONNECTIONS VIEW — clean radial network
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function ConnectionsView({ T, isDark, activeMeta, mobile }) {
  const [hover, setHover] = useState(null);
  const links = activeMeta ? crossSectorLinks.filter(l => l.meta === activeMeta) : crossSectorLinks;
  const W = mobile ? 360 : 660, H = mobile ? 420 : 400;
  const cx = W / 2, cy = H / 2, R = mobile ? 130 : 155;

  const pos = useMemo(() => {
    const m = {};
    sectors.forEach((s, i) => {
      const a = (i / sectors.length) * Math.PI * 2 - Math.PI / 2;
      m[s.id] = { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a), color: s.color, short: s.short };
    });
    return m;
  }, [cx, cy, R]);

  return (
    <div style={{ background: T.card, borderRadius: 8, border: `1px solid ${T.border}`, overflow: "hidden" }}>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
        {links.map((link, i) => {
          const active = hover === i;
          const mc = metaThemes.find(m => m.id === link.meta)?.color || T.textTer;
          const pairs = [];
          for (let a = 0; a < link.sectors.length; a++)
            for (let b = a + 1; b < link.sectors.length; b++)
              pairs.push([link.sectors[a], link.sectors[b]]);
          return pairs.map(([a, b], j) => {
            const pa = pos[a], pb = pos[b];
            if (!pa || !pb) return null;
            const mx = (pa.x + pb.x) / 2, my = (pa.y + pb.y) / 2;
            const dx = mx - cx, dy = my - cy;
            const len = Math.sqrt(dx * dx + dy * dy) || 1;
            const curve = 0.25;
            const qx = mx - dy * curve, qy = my + dx * curve;
            return (
              <path key={`${i}-${j}`}
                d={`M ${pa.x} ${pa.y} Q ${qx} ${qy} ${pb.x} ${pb.y}`}
                fill="none" stroke={mc} strokeWidth={active ? 2 : 0.7}
                strokeOpacity={active ? 0.6 : 0.1}
                onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
                style={{ cursor: "pointer", transition: "all 0.2s" }}
              />
            );
          });
        })}
        {sectors.map(s => {
          const p = pos[s.id];
          const lit = !activeMeta || (metaThemes.find(m => m.id === activeMeta)?.sectorIds || []).includes(s.id);
          return (
            <g key={s.id} opacity={lit ? 1 : 0.15} style={{ transition: "opacity 0.3s" }}>
              <circle cx={p.x} cy={p.y} r={16} fill={T.card} stroke={s.color} strokeWidth={1.5} />
              <text x={p.x} y={p.y + 3} textAnchor="middle" fontSize={8} fontFamily={Fn} fontWeight={700} fill={s.color}>{s.short}</text>
              <text x={p.x} y={p.y - 22} textAnchor="middle" fontSize={7} fontFamily={Fn} fontWeight={500} fill={T.textTer}>
                {s.weight > 0 ? s.weight + "%" : ""}
              </text>
            </g>
          );
        })}
      </svg>
      {hover !== null && links[hover] && (
        <div style={{ padding: "6px 16px 10px", borderTop: `1px solid ${T.border}`, fontSize: 10, fontFamily: Fn }}>
          <span style={{ fontWeight: 700, color: T.text }}>{links[hover].theme}</span>
          <span style={{ color: T.textTer, marginLeft: 8 }}>{links[hover].sectors.map(sid => sectors.find(s => s.id === sid)?.short).join(" · ")}</span>
        </div>
      )}
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MATRIX VIEW — clean heatmap table
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function MatrixView({ T, isDark, mobile }) {
  return (
    <div style={{ background: T.card, borderRadius: 8, border: `1px solid ${T.border}`, overflow: "auto" }}>
      <div style={{ padding: "0 10px 12px", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: mobile ? 520 : 0 }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "12px 8px 8px", fontSize: 9, fontFamily: Fn, color: T.textTer, fontWeight: 500, borderBottom: `1px solid ${T.border}` }} />
              {metaThemes.map(m => (
                <th key={m.id} style={{ textAlign: "center", padding: "12px 4px 8px", fontSize: 8, fontFamily: Fn, color: m.color, fontWeight: 600, borderBottom: `1px solid ${T.border}`, minWidth: 55 }}>
                  {m.short}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sectors.map(s => (
              <tr key={s.id}>
                <td style={{ padding: "7px 8px", fontSize: 10, fontFamily: Fn, fontWeight: 600, color: T.text, borderBottom: `1px solid ${T.border}`, whiteSpace: "nowrap" }}>
                  <span style={{ display: "inline-block", width: 2, height: 12, borderRadius: 1, background: s.color, marginRight: 6, verticalAlign: "middle" }} />
                  {s.short}
                  {s.weight > 0 && <span style={{ fontSize: 8, color: T.textTer, marginLeft: 4 }}>{s.weight}%</span>}
                </td>
                {metaThemes.map(m => {
                  const connected = (s.metaThemeIds || []).includes(m.id);
                  const linkCount = crossSectorLinks.filter(l => l.meta === m.id && l.sectors.includes(s.id)).length;
                  return (
                    <td key={m.id} style={{ textAlign: "center", padding: "4px", borderBottom: `1px solid ${T.border}` }}>
                      {connected ? (
                        <div style={{
                          display: "inline-block", width: 22, height: 22, borderRadius: 4,
                          background: m.color + (isDark ? "20" : "12"),
                          lineHeight: "22px", fontSize: 9, fontWeight: 700, fontFamily: Fn, color: m.color,
                        }}>
                          {linkCount || "·"}
                        </div>
                      ) : (
                        <span style={{ fontSize: 10, color: T.textTer, opacity: 0.3 }}>·</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MAIN PAGE
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function ResearchThematicMap({ T }) {
  const isDark = T.bg !== "#F8F9FC";
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const c = () => setMobile(window.innerWidth < 768);
    c(); window.addEventListener("resize", c);
    return () => window.removeEventListener("resize", c);
  }, []);

  const [activeSector, setActiveSector] = useState(null);
  const [activeMeta, setActiveMeta] = useState(null);
  const [search, setSearch] = useState("");
  const [filterHeld, setFilterHeld] = useState(false);
  const [view, setView] = useState("sectors");

  const totalThemes = sectors.reduce((s, sec) => s + sec.themes.length, 0);
  const allCos = sectors.reduce((s, sec) => s + totalCos(sec), 0);

  /* Filtering */
  const filteredSectors = useMemo(() => {
    return sectors.filter(sec => {
      if (activeMeta && !(sec.metaThemeIds || []).includes(activeMeta)) return false;
      if (filterHeld && countHeld(sec) === 0) return false;
      if (!search) return true;
      const q = search.toLowerCase();
      if (sec.name.toLowerCase().includes(q) || sec.short.toLowerCase().includes(q)) return true;
      return sec.themes.some(t =>
        t.name.toLowerCase().includes(q) || (t.category || "").toLowerCase().includes(q) ||
        t.companies.some(c => c.ticker.toLowerCase().includes(q) || c.name.toLowerCase().includes(q))
      );
    });
  }, [activeMeta, filterHeld, search]);

  /* Grid with inline expansion */
  const cols = mobile ? 1 : 2;
  const activeIdx = activeSector ? filteredSectors.findIndex(s => s.id === activeSector) : -1;
  const insertAfterRow = activeIdx >= 0 ? Math.floor(activeIdx / cols) : -1;
  const activeSectorData = activeSector ? sectors.find(s => s.id === activeSector) : null;

  const gridItems = useMemo(() => {
    const items = [];
    for (let i = 0; i < filteredSectors.length; i++) {
      items.push({ type: "tile", sector: filteredSectors[i], idx: i });
      const row = Math.floor(i / cols);
      const isLastInRow = (i + 1) % cols === 0 || i === filteredSectors.length - 1;
      if (isLastInRow && row === insertAfterRow && activeSectorData) {
        items.push({ type: "expanded", sector: activeSectorData });
      }
    }
    return items;
  }, [filteredSectors, activeSector, activeSectorData, insertAfterRow, cols]);

  const views = [
    { id: "sectors", label: "Sectors" },
    { id: "connections", label: "Connections" },
    { id: "matrix", label: "Matrix" },
  ];

  const hasFilters = search || filterHeld || activeMeta;

  return (
    <div>
      {/* ── Header ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
        <div>
          <h2 style={{ fontFamily: Fn, fontSize: 20, fontWeight: 300, letterSpacing: "-0.03em", color: T.text, margin: 0 }}>
            Thematic Universe
          </h2>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, marginTop: 4, fontFeatureSettings: '"tnum"' }}>
            {totalThemes} themes · ~{allCos} companies · 10 sectors · 26 held
          </div>
        </div>
        {/* View toggle */}
        <div style={{ display: "flex", gap: 1, background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)", borderRadius: 6, padding: 2 }}>
          {views.map(v => (
            <button key={v.id} onClick={() => { setView(v.id); setActiveSector(null); }}
              style={{
                padding: "5px 14px", borderRadius: 5, fontSize: 10, fontFamily: Fn, fontWeight: 500,
                border: "none", cursor: "pointer", transition: "all 0.15s",
                background: view === v.id ? T.card : "transparent",
                color: view === v.id ? T.text : T.textTer,
                boxShadow: view === v.id ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              }}>
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Meta-themes — clean horizontal row of text pills ── */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {metaThemes.map(m => {
          const isActive = activeMeta === m.id;
          return (
            <button key={m.id}
              onClick={() => { setActiveMeta(prev => prev === m.id ? null : m.id); setActiveSector(null); }}
              style={{
                display: "flex", alignItems: "center", gap: 5, padding: "5px 10px",
                borderRadius: 5,
                border: `1px solid ${isActive ? m.color : T.border}`,
                background: isActive ? m.color + (isDark ? "12" : "08") : "transparent",
                cursor: "pointer", transition: "all 0.15s",
              }}>
              <span style={{ width: 6, height: 6, borderRadius: 3, background: m.color, flexShrink: 0 }} />
              <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 500, fontFamily: Fn, color: isActive ? m.color : T.textSec }}>
                {m.short}
              </span>
              <span style={{ fontSize: 8, fontFamily: Fn, color: T.textTer }}>{m.sectorIds.length}</span>
            </button>
          );
        })}
      </div>

      {/* ── Active meta description — single quiet line ── */}
      {activeMeta && (() => {
        const mt = metaThemes.find(m => m.id === activeMeta);
        if (!mt) return null;
        return (
          <div style={{
            fontSize: 10, fontFamily: Fn, color: T.textSec, lineHeight: 1.5,
            marginBottom: 14, padding: "8px 12px", borderRadius: 6,
            borderLeft: `2px solid ${mt.color}`,
            background: isDark ? "rgba(255,255,255,0.015)" : "rgba(0,0,0,0.01)",
          }}>
            {mt.desc}
            <span style={{ display: "flex", gap: 12, marginTop: 6 }}>
              {mt.keyStats.map((ks, i) => (
                <span key={i} style={{ fontSize: 9 }}>
                  <span style={{ fontWeight: 700, color: mt.color }}>{ks.value}</span>
                  <span style={{ color: T.textTer, marginLeft: 3 }}>{ks.label}</span>
                </span>
              ))}
            </span>
          </div>
        );
      })()}

      {/* ── Connections / Matrix views ── */}
      {view === "connections" && <ConnectionsView T={T} isDark={isDark} activeMeta={activeMeta} mobile={mobile} />}
      {view === "matrix" && <MatrixView T={T} isDark={isDark} mobile={mobile} />}

      {/* ── Sectors view ── */}
      {view === "sectors" && (
        <>
          {/* Search bar — single line, unobtrusive */}
          <div style={{ display: "flex", gap: 6, marginBottom: 14, alignItems: "center" }}>
            <div style={{ flex: "1 1 200px", position: "relative", maxWidth: 300 }}>
              <input type="text" placeholder="Search themes, tickers…"
                value={search} onChange={e => { setSearch(e.target.value); setActiveSector(null); }}
                style={{
                  width: "100%", boxSizing: "border-box", padding: "6px 10px 6px 26px",
                  fontSize: 10, fontFamily: Fn, borderRadius: 5,
                  border: `1px solid ${T.border}`, background: T.card, color: T.text, outline: "none",
                }}
                onFocus={e => e.target.style.borderColor = T.textTer}
                onBlur={e => e.target.style.borderColor = T.border}
              />
              <span style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", fontSize: 11, color: T.textTer, pointerEvents: "none" }}>⌕</span>
            </div>
            <button onClick={() => { setFilterHeld(!filterHeld); setActiveSector(null); }}
              style={{
                padding: "5px 10px", borderRadius: 5, fontSize: 9, fontFamily: Fn, fontWeight: 500,
                border: `1px solid ${filterHeld ? T.green : T.border}`,
                background: filterHeld ? T.greenBg : "transparent",
                color: filterHeld ? T.green : T.textTer, cursor: "pointer",
              }}>
              {filterHeld ? "✓ " : ""}Held
            </button>
            {hasFilters && (
              <>
                <button onClick={() => { setSearch(""); setFilterHeld(false); setActiveMeta(null); setActiveSector(null); }}
                  style={{ padding: "5px 8px", borderRadius: 5, fontSize: 9, fontFamily: Fn, border: `1px solid ${T.border}`, background: "transparent", color: T.textTer, cursor: "pointer" }}>
                  Clear
                </button>
                <span style={{ fontSize: 9, fontFamily: Fn, color: T.textTer }}>{filteredSectors.length}/10</span>
              </>
            )}
          </div>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 10 }}>
            {gridItems.map((item, i) => {
              if (item.type === "tile") {
                const isActive = activeSector === item.sector.id;
                const dimmed = activeSector && !isActive;
                return (
                  <SectorTile key={item.sector.id} sector={item.sector}
                    isActive={isActive} dimmed={dimmed}
                    onClick={() => setActiveSector(prev => prev === item.sector.id ? null : item.sector.id)}
                    T={T} isDark={isDark}
                  />
                );
              }
              if (item.type === "expanded") {
                return (
                  <SectorExpanded key={`exp-${item.sector.id}`} sector={item.sector}
                    onClose={() => setActiveSector(null)}
                    T={T} isDark={isDark} searchTerm={search}
                  />
                );
              }
              return null;
            })}
          </div>

          {filteredSectors.length === 0 && (
            <div style={{ padding: 40, textAlign: "center", color: T.textTer, fontFamily: Fn, fontSize: 11 }}>
              No sectors match the current filters
            </div>
          )}
        </>
      )}

      {/* Footer */}
      <div style={{ fontSize: 9, color: T.textTer, fontFamily: Fn, textAlign: "center", marginTop: 24, padding: "10px 0", borderTop: `1px solid ${T.border}` }}>
        Cape Capital AG · Thematic Universe · April 2026
      </div>
    </div>
  );
}
