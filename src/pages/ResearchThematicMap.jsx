import { useState, useMemo, useEffect, useRef } from "react";
import { Fn } from "../theme";
import { Card } from "../components/shared";
import { sectors, logoUrl, macrodynamics } from "../data/research-thematic-map";
import { holdings } from "../data/portfolio";
import ThematicSunburst from "../components/ThematicSunburst";

/* ─── Portfolio matching ─── */
const heldMap = {
  "NVDA":true,"AVGO":true,"TSM":true,"MSFT":true,"GOOGL":true,"NOW":true,
  "SIE":true,"ROK":true,"JPM":true,"ICE":true,"AMZN":true,"BKNG":true,
  "NFLX":true,"0700":true,"TMO":true,"AI":true,"META":false,
  "CEG":true,"LLY":true,"RHM":true,"MELI":true,"SAF":true,"LIN":true,
  "BKR":true,"SU":true,"ETN":true,
};
const isHeld = (ticker) => {
  if (heldMap[ticker] !== undefined) return heldMap[ticker];
  return holdings.some(h => h.t === ticker || h.t.startsWith(ticker + "."));
};

/* ─── helpers ─── */
const countHeld = (sector) => {
  const seen = new Set();
  sector.themes.forEach(t => t.companies.forEach(c => { if (isHeld(c.ticker)) seen.add(c.ticker); }));
  return seen.size;
};
const getHeldNames = (sector) => {
  const seen = new Set(); const out = [];
  sector.themes.forEach(t => t.companies.forEach(c => {
    if (isHeld(c.ticker) && !seen.has(c.ticker)) { seen.add(c.ticker); out.push(c); }
  }));
  return out;
};
const totalCos = (sector) => sector.themes.reduce((s, t) => s + t.companies.length, 0);

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SECTOR TILE
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function SectorTile({ sector, isActive, onClick, T, isDark, dimmed }) {
  const held = getHeldNames(sector);
  const cos = totalCos(sector);
  const secularPct = Math.round((sector.themes.filter(t => t.type.includes("SECULAR")).length / sector.themes.length) * 100);

  return (
    <div
      onClick={onClick}
      style={{
        background: T.card, borderRadius: T.radius, boxShadow: T.shadow,
        cursor: "pointer", overflow: "hidden", transition: "all 0.25s ease",
        border: isActive ? `1.5px solid ${sector.color}` : `1.5px solid transparent`,
        opacity: dimmed ? 0.45 : 1,
        transform: isActive ? "scale(1)" : undefined,
      }}
      onMouseEnter={e => { if (!isActive && !dimmed) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = T.shadowLg; }}}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = T.shadow; }}
    >
      {/* Colour accent */}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${sector.color}, ${sector.color}40)` }} />

      <div style={{ padding: "14px 16px 12px" }}>
        {/* Row 1: name + weight */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700, fontFamily: Fn, color: T.text, letterSpacing: "-0.01em", lineHeight: 1.25 }}>
              {sector.short}
            </div>
            <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, marginTop: 2 }}>
              {sector.name}
            </div>
          </div>
          {sector.weight > 0 ? (
            <div style={{
              fontSize: 22, fontWeight: 800, fontFamily: Fn, color: sector.color,
              lineHeight: 1, letterSpacing: "-0.04em", fontFeatureSettings: '"tnum"',
            }}>
              {sector.weight}<span style={{ fontSize: 11, fontWeight: 600 }}>%</span>
            </div>
          ) : (
            <span style={{
              fontSize: 8, fontWeight: 700, fontFamily: Fn, color: T.textTer,
              padding: "3px 7px", borderRadius: 4, background: T.pillBg,
              letterSpacing: "0.04em",
            }}>WATCHLIST</span>
          )}
        </div>

        {/* Row 2: stats */}
        <div style={{ display: "flex", gap: 12, marginBottom: 10 }}>
          {[
            { v: sector.themes.length, l: "themes" },
            { v: cos, l: "cos" },
            { v: held.length, l: "held" },
            { v: secularPct + "%", l: "secular" },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: 13, fontWeight: 700, fontFamily: Fn, color: i === 2 && held.length > 0 ? sector.color : T.text, fontFeatureSettings: '"tnum"' }}>{s.v}</div>
              <div style={{ fontSize: 7, fontFamily: Fn, color: T.textTer, textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 1 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Row 3: held logos or theme pills */}
        {held.length > 0 ? (
          <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
            {held.slice(0, 8).map((c) => {
              const logo = logoUrl(c.ticker, c.name);
              return (
                <div key={c.ticker} title={c.name} style={{
                  display: "flex", alignItems: "center", gap: 3,
                  padding: "2px 6px 2px 2px", borderRadius: 5,
                  background: sector.color + (isDark ? "12" : "06"),
                  border: `1px solid ${sector.color}15`,
                }}>
                  {logo && <img src={logo} alt="" style={{ width: 13, height: 13, borderRadius: 3 }} onError={e => e.target.style.display = "none"} />}
                  <span style={{ fontSize: 9, fontWeight: 700, fontFamily: Fn, color: T.text }}>{c.ticker}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
            {sector.themes.slice(0, 3).map((t, i) => (
              <span key={i} style={{
                fontSize: 8, fontFamily: Fn, fontWeight: 500, padding: "2px 6px", borderRadius: 4,
                background: sector.color + (isDark ? "12" : "06"), color: isDark ? sector.color : T.textSec,
              }}>
                {t.name.length > 20 ? t.name.slice(0, 18) + "…" : t.name}
              </span>
            ))}
            {sector.themes.length > 3 && <span style={{ fontSize: 8, fontFamily: Fn, color: T.textTer, padding: "2px 4px" }}>+{sector.themes.length - 3}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   THEME ROW
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function ThemeRow({ theme, sector, isOpen, onClick, T, isDark, highlight }) {
  const heldInTheme = theme.companies.filter(c => isHeld(c.ticker)).length;

  return (
    <div style={{
      borderRadius: T.radiusSm, overflow: "hidden",
      border: `1px solid ${isOpen ? sector.color + "40" : "transparent"}`,
      background: isOpen ? (sector.color + (isDark ? "06" : "03")) : "transparent",
      transition: "all 0.2s",
    }}>
      <div
        onClick={onClick}
        style={{
          display: "flex", alignItems: "center", gap: 8, padding: "9px 12px",
          cursor: "pointer", borderRadius: T.radiusSm, transition: "background 0.15s",
        }}
        onMouseEnter={e => { if (!isOpen) e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.012)"; }}
        onMouseLeave={e => { if (!isOpen) e.currentTarget.style.background = "transparent"; }}
      >
        <div style={{
          width: 3, height: 18, borderRadius: 2, background: sector.color, flexShrink: 0,
          opacity: isOpen ? 1 : 0.3, transition: "opacity 0.2s",
        }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <span style={{
              fontSize: 12, fontWeight: 600, fontFamily: Fn, color: T.text,
              background: highlight ? (sector.color + "18") : "transparent",
              borderRadius: 3, padding: highlight ? "0 3px" : 0,
            }}>{theme.name}</span>
            <span style={{
              fontSize: 7, fontWeight: 700, fontFamily: Fn, padding: "2px 5px", borderRadius: 3, letterSpacing: "0.03em",
              background: theme.type.includes("SECULAR") ? T.greenBg : (T.orange + (isDark ? "15" : "08")),
              color: theme.type.includes("SECULAR") ? T.green : T.orange,
            }}>
              {theme.type.replace(" + ", "+")}
            </span>
          </div>
          {!isOpen && (
            <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, marginTop: 1 }}>
              {theme.companies.length} companies{heldInTheme > 0 && <> · <span style={{ color: sector.color, fontWeight: 600 }}>{heldInTheme} held</span></>}
            </div>
          )}
        </div>
        <span style={{
          fontSize: 13, color: T.textTer, transition: "transform 0.25s ease",
          transform: isOpen ? "rotate(90deg)" : "rotate(0)", flexShrink: 0,
        }}>›</span>
      </div>

      {isOpen && (
        <div style={{ padding: "0 12px 12px 23px" }}>
          {/* Thesis */}
          <div style={{
            fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.6,
            marginBottom: 10, padding: "8px 12px", borderRadius: 6,
            background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.012)",
            borderLeft: `3px solid ${sector.color}35`,
          }}>
            {theme.desc}
          </div>
          <div style={{ display: "grid", gap: 5 }}>
            {theme.companies.map((c, j) => {
              const held = isHeld(c.ticker);
              const logo = logoUrl(c.ticker, c.name);
              return (
                <div key={j} style={{
                  display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 10px", borderRadius: T.radiusSm,
                  background: held ? sector.color + (isDark ? "0C" : "05") : (isDark ? "rgba(255,255,255,0.012)" : "rgba(0,0,0,0.006)"),
                  border: `1px solid ${held ? sector.color + "22" : T.border}`,
                }}>
                  {logo && <img src={logo} alt="" style={{ width: 22, height: 22, borderRadius: 5, marginTop: 1, border: `1px solid ${T.border}` }} onError={e => e.target.style.display = "none"} />}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, fontFamily: Fn, color: T.text }}>{c.name}</span>
                      <span style={{ fontSize: 9, fontFamily: Fn, color: T.textTer }}>{c.ticker}{c.hq ? ` · ${c.hq}` : ""}</span>
                      {held && <span style={{ fontSize: 7, fontWeight: 800, fontFamily: Fn, padding: "1px 5px", borderRadius: 3, background: sector.color + "20", color: sector.color, letterSpacing: "0.04em" }}>HELD</span>}
                    </div>
                    <div style={{ fontSize: 10, color: T.textSec, fontFamily: Fn, lineHeight: 1.5, marginTop: 2 }}>{c.why}</div>
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

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   EXPANDED SECTOR PANEL
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function SectorExpanded({ sector, onClose, T, isDark, searchTerm }) {
  const [openTheme, setOpenTheme] = useState(-1);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) ref.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [sector.id]);

  const held = getHeldNames(sector);
  const cos = totalCos(sector);
  const secularCount = sector.themes.filter(t => t.type.includes("SECULAR")).length;

  return (
    <div ref={ref} style={{ gridColumn: "1 / -1" }}>
      <Card T={T} style={{ borderTop: `3px solid ${sector.color}`, padding: 0, overflow: "hidden" }}>
        {/* Header */}
        <div style={{ padding: "18px 20px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span style={{ fontSize: 18, fontWeight: 700, fontFamily: Fn, color: T.text, letterSpacing: "-0.02em" }}>{sector.name}</span>
                {sector.weight > 0 && (
                  <span style={{
                    fontSize: 13, fontWeight: 800, fontFamily: Fn, color: sector.color,
                    padding: "2px 8px", borderRadius: 5,
                    background: sector.color + (isDark ? "18" : "0A"),
                    fontFeatureSettings: '"tnum"',
                  }}>{sector.weight}%</span>
                )}
              </div>
              <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, marginTop: 4, fontFeatureSettings: '"tnum"' }}>
                {sector.themes.length} themes ({secularCount} secular, {sector.themes.length - secularCount} cyclical) · {cos} companies · {held.length} in portfolio
              </div>
            </div>
            <button onClick={onClose} style={{
              background: T.pillBg, border: `1px solid ${T.border}`, borderRadius: T.radiusSm,
              width: 28, height: 28, fontSize: 12, color: T.textTer, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              transition: "all 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = T.text; e.currentTarget.style.borderColor = T.textTer; }}
            onMouseLeave={e => { e.currentTarget.style.color = T.textTer; e.currentTarget.style.borderColor = T.border; }}>✕</button>
          </div>

          {/* Context paragraph */}
          <div style={{
            fontSize: 11, fontFamily: Fn, color: T.textSec, lineHeight: 1.65,
            padding: "10px 14px", borderRadius: T.radiusSm, marginBottom: 14,
            background: isDark ? "rgba(255,255,255,0.015)" : "rgba(0,0,0,0.01)",
          }}>
            {sector.weight > 0 ? (
              <>The fund holds <span style={{ fontWeight: 700, color: sector.color }}>{held.length} positions</span> in {sector.short} at <span style={{ fontWeight: 700 }}>{sector.weight}%</span> of NAV{sector.weight > 10 ? " — an overweight reflecting high conviction in the structural themes below" : ""}. Of the {sector.themes.length} themes mapped, {secularCount} are secular multi-year drivers.</>
            ) : (
              <>The fund holds <span style={{ fontWeight: 700, color: T.orange }}>no positions</span> in {sector.short}. The {sector.themes.length} themes below form the watchlist for future entry points.</>
            )}
          </div>

          {/* Held company strip */}
          {held.length > 0 && (
            <div style={{
              display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14,
              padding: "10px 12px", borderRadius: T.radiusSm,
              background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)",
              border: `1px solid ${T.border}`,
            }}>
              <span style={{
                fontSize: 8, fontWeight: 700, fontFamily: Fn, color: T.textTer,
                textTransform: "uppercase", letterSpacing: "0.04em", alignSelf: "center", marginRight: 4,
              }}>Held</span>
              {held.map((c) => {
                const logo = logoUrl(c.ticker, c.name);
                return (
                  <div key={c.ticker} style={{
                    display: "flex", alignItems: "center", gap: 4,
                    padding: "3px 7px 3px 3px", borderRadius: 5,
                    background: sector.color + (isDark ? "15" : "08"),
                    border: `1px solid ${sector.color}18`,
                  }}>
                    {logo && <img src={logo} alt="" style={{ width: 15, height: 15, borderRadius: 3 }} onError={e => e.target.style.display = "none"} />}
                    <span style={{ fontSize: 10, fontWeight: 700, fontFamily: Fn, color: T.text }}>{c.ticker}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Theme rows */}
        <div style={{ padding: "0 12px 14px" }}>
          <div style={{ display: "grid", gap: 4 }}>
            {sector.themes.map((theme, i) => {
              const matchesSearch = searchTerm && theme.name.toLowerCase().includes(searchTerm.toLowerCase());
              return (
                <ThemeRow
                  key={i} theme={theme} sector={sector}
                  isOpen={openTheme === i}
                  onClick={() => setOpenTheme(openTheme === i ? -1 : i)}
                  T={T} isDark={isDark}
                  highlight={matchesSearch}
                />
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MAIN PAGE
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function ResearchThematicMap({ T }) {
  const isDark = T.bg !== "#F8F9FC";
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const c = () => setMobile(window.innerWidth < 768);
    c(); window.addEventListener("resize", c);
    return () => window.removeEventListener("resize", c);
  }, []);

  const [view, setView] = useState("list");
  const [activeSector, setActiveSector] = useState(null);
  const [search, setSearch] = useState("");
  const [filterHeld, setFilterHeld] = useState(false);

  const totalThemes = sectors.reduce((s, sec) => s + sec.themes.length, 0);
  const allCos = sectors.reduce((s, sec) => s + totalCos(sec), 0);

  /* Search filtering */
  const matchesSector = (sec) => {
    if (!search && !filterHeld) return true;
    const q = search.toLowerCase();
    if (filterHeld && countHeld(sec) === 0) return false;
    if (!search) return true;
    if (sec.name.toLowerCase().includes(q) || sec.short.toLowerCase().includes(q)) return true;
    return sec.themes.some(t =>
      t.name.toLowerCase().includes(q) ||
      t.companies.some(c => c.ticker.toLowerCase().includes(q) || c.name.toLowerCase().includes(q))
    );
  };

  const filteredSectors = sectors.filter(matchesSector);

  /* Grid items with inline expansion */
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

  const handleTileClick = (sectorId) => setActiveSector(prev => prev === sectorId ? null : sectorId);

  return (
    <div>
      {/* ── Header ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
        <div>
          <h2 style={{ fontFamily: Fn, fontSize: 22, fontWeight: 300, letterSpacing: "-0.03em", color: T.text, margin: 0 }}>
            Thematic Universe
          </h2>
          <div style={{ display: "flex", gap: 16, marginTop: 8, flexWrap: "wrap" }}>
            {[
              { v: "10", l: "Sectors" },
              { v: String(totalThemes), l: "Themes" },
              { v: `~${allCos}`, l: "Companies" },
              { v: "26", l: "Held", c: T.green },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
                <span style={{ fontSize: 15, fontWeight: 800, fontFamily: Fn, color: s.c || T.text, fontFeatureSettings: '"tnum"' }}>{s.v}</span>
                <span style={{ fontSize: 9, fontFamily: Fn, color: T.textTer }}>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
        {/* View toggle */}
        <div style={{
          display: "flex", borderRadius: T.radiusSm, overflow: "hidden",
          border: `1px solid ${T.border}`, flexShrink: 0,
        }}>
          {[
            { id: "list", label: "☰ List" },
            { id: "radial", label: "◉ Radial" },
          ].map((v) => (
            <button key={v.id} onClick={() => setView(v.id)} style={{
              background: view === v.id ? (T.deepBlue || T.text) : "transparent",
              color: view === v.id ? "#fff" : T.textSec,
              border: "none", padding: "6px 16px", fontSize: 11, fontFamily: Fn,
              fontWeight: view === v.id ? 700 : 500,
              cursor: "pointer", transition: "all 0.15s",
            }}>
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {view === "radial" ? (
        <ThematicSunburst T={T} />
      ) : (
        <>
          {/* ── Macro Forces strip ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)",
            gap: 10, marginBottom: 16,
          }}>
            {macrodynamics.map((m) => (
              <div key={m.id} style={{
                background: T.card, borderRadius: T.radiusSm, boxShadow: T.shadow,
                padding: "11px 14px", borderLeft: `3px solid ${m.color}`,
                display: "flex", flexDirection: "column", gap: 4,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ fontSize: 12 }}>{m.icon}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, fontFamily: Fn, color: T.text }}>{m.short}</span>
                  <span style={{ fontSize: 9, fontFamily: Fn, color: T.textTer, marginLeft: "auto" }}>{m.sectors} sectors</span>
                </div>
                <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, lineHeight: 1.5 }}>
                  {m.desc.length > 95 ? m.desc.slice(0, 93) + "…" : m.desc}
                </div>
              </div>
            ))}
          </div>

          {/* ── Search & Filter bar ── */}
          <div style={{
            display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap", alignItems: "center",
          }}>
            {/* Search */}
            <div style={{
              flex: "1 1 200px", position: "relative", maxWidth: 340,
            }}>
              <input
                type="text"
                placeholder="Search sectors, themes, tickers…"
                value={search}
                onChange={e => { setSearch(e.target.value); setActiveSector(null); }}
                style={{
                  width: "100%", boxSizing: "border-box",
                  padding: "7px 12px 7px 30px", fontSize: 11, fontFamily: Fn,
                  borderRadius: T.radiusSm, border: `1px solid ${T.border}`,
                  background: T.card, color: T.text,
                  outline: "none", transition: "border-color 0.15s",
                }}
                onFocus={e => e.target.style.borderColor = T.deepBlue || T.text}
                onBlur={e => e.target.style.borderColor = T.border}
              />
              <span style={{
                position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)",
                fontSize: 12, color: T.textTer, pointerEvents: "none",
              }}>⌕</span>
            </div>
            {/* Held toggle */}
            <button
              onClick={() => { setFilterHeld(!filterHeld); setActiveSector(null); }}
              style={{
                padding: "6px 12px", borderRadius: T.radiusSm, fontSize: 10, fontFamily: Fn, fontWeight: 600,
                border: `1px solid ${filterHeld ? T.green : T.border}`,
                background: filterHeld ? T.greenBg : "transparent",
                color: filterHeld ? T.green : T.textSec,
                cursor: "pointer", transition: "all 0.15s",
                letterSpacing: "0.02em",
              }}
            >
              {filterHeld ? "✓ " : ""}Held only
            </button>
            {/* Clear */}
            {(search || filterHeld) && (
              <button
                onClick={() => { setSearch(""); setFilterHeld(false); setActiveSector(null); }}
                style={{
                  padding: "6px 10px", borderRadius: T.radiusSm, fontSize: 10, fontFamily: Fn,
                  border: `1px solid ${T.border}`, background: "transparent",
                  color: T.textTer, cursor: "pointer",
                }}
              >
                Clear
              </button>
            )}
            {search && (
              <span style={{ fontSize: 10, fontFamily: Fn, color: T.textTer }}>
                {filteredSectors.length} of 10 sectors
              </span>
            )}
          </div>

          {/* ── Sector Grid ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
            gap: 12,
          }}>
            {gridItems.map((item, i) => {
              if (item.type === "tile") {
                const isActive = activeSector === item.sector.id;
                const dimmed = activeSector && !isActive;
                return (
                  <SectorTile
                    key={item.sector.id} sector={item.sector}
                    isActive={isActive} dimmed={dimmed}
                    onClick={() => handleTileClick(item.sector.id)}
                    T={T} isDark={isDark}
                  />
                );
              }
              if (item.type === "expanded") {
                return (
                  <SectorExpanded
                    key={`exp-${item.sector.id}`} sector={item.sector}
                    onClose={() => setActiveSector(null)}
                    T={T} isDark={isDark} searchTerm={search}
                  />
                );
              }
              return null;
            })}
          </div>

          {filteredSectors.length === 0 && (
            <div style={{ padding: 40, textAlign: "center", color: T.textTer, fontFamily: Fn, fontSize: 12 }}>
              No sectors match "{search}"{filterHeld ? " with held positions" : ""}
            </div>
          )}

          {/* Footer */}
          <div style={{
            fontSize: 10, color: T.textTer, fontFamily: Fn, textAlign: "center",
            marginTop: 24, padding: "12px 0", borderTop: `1px solid ${T.border}`,
          }}>
            Cape Capital AG · Thematic Universe · {totalThemes} themes · ~{allCos} companies · March 2026
          </div>
        </>
      )}
    </div>
  );
}
