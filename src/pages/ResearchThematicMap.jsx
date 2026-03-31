import { useState, useMemo, useEffect, useRef } from "react";
import { Fn } from "../theme";
import { Card } from "../components/shared";
import { sectors, logoUrl, macrodynamics } from "../data/research-thematic-map";
import { holdings } from "../data/portfolio";
import ThematicSunburst from "../components/ThematicSunburst";

/* ─── Portfolio matching ─── */
const heldMap = {
  "NVDA": true, "AVGO": true, "TSM": true, "MSFT": true, "GOOGL": true, "NOW": true,
  "SIE": true, "ROK": true, "JPM": true, "ICE": true, "AMZN": true, "BKNG": true,
  "NFLX": true, "0700": true, "TMO": true, "AI": true, "META": false,
  "CEG": true, "LLY": true, "RHM": true, "MELI": true, "SAF": true, "LIN": true,
  "BKR": true, "SU": true, "ETN": true,
};
const isHeld = (ticker) => {
  if (heldMap[ticker] !== undefined) return heldMap[ticker];
  return holdings.some(h => h.t === ticker || h.t.startsWith(ticker + ".") || h.name.toUpperCase() === ticker.toUpperCase());
};

/* ─── Sector tile ─── */
function SectorTile({ sector, isActive, onClick, T }) {
  const isDark = T.bg !== "#F8F9FC";
  const companyCount = sector.themes.reduce((s, t) => s + t.companies.length, 0);
  const heldNames = [];
  sector.themes.forEach(t => {
    t.companies.forEach(c => {
      if (isHeld(c.ticker) && !heldNames.find(h => h.ticker === c.ticker)) heldNames.push(c);
    });
  });
  const hasWeight = sector.weight > 0;

  return (
    <div
      onClick={onClick}
      onMouseEnter={e => { if (!isActive) { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = T.shadowLg; }}}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = T.shadow; }}
      style={{
        background: T.card, borderRadius: T.radius, boxShadow: T.shadow,
        cursor: "pointer", overflow: "hidden", transition: "all 0.2s",
        border: isActive ? `2px solid ${sector.color}` : `2px solid transparent`,
        display: "flex", flexDirection: "row",
      }}
    >
      {/* Colour accent bar */}
      <div style={{ width: 4, background: sector.color, flexShrink: 0, borderRadius: `${T.radius}px 0 0 ${T.radius}px` }} />

      <div style={{ flex: 1, padding: "14px 16px 14px 14px" }}>
        {/* Header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700, fontFamily: Fn, color: T.text, letterSpacing: "-0.01em" }}>{sector.name}</div>
            <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, marginTop: 2, fontFeatureSettings: '"tnum"' }}>
              {sector.themes.length} themes · {companyCount} companies · {heldNames.length} held
            </div>
          </div>
          {hasWeight ? (
            <div style={{
              fontSize: 13, fontWeight: 800, fontFamily: Fn, color: sector.color,
              padding: "3px 10px", borderRadius: 6,
              background: sector.color + (isDark ? "18" : "0A"),
              fontFeatureSettings: '"tnum"', flexShrink: 0,
            }}>
              {sector.weight}%
            </div>
          ) : (
            <div style={{
              fontSize: 9, fontWeight: 700, fontFamily: Fn, color: T.textTer,
              padding: "3px 8px", borderRadius: 4, background: T.pillBg,
              letterSpacing: "0.03em", flexShrink: 0,
            }}>
              WATCHLIST
            </div>
          )}
        </div>

        {/* Weight bar */}
        {hasWeight && (
          <div style={{ height: 3, borderRadius: 2, background: T.pillBg, marginBottom: 10 }}>
            <div style={{
              height: "100%", borderRadius: 2, background: sector.color,
              width: `${Math.min(sector.weight * 4, 100)}%`, opacity: 0.7,
              transition: "width 0.4s ease",
            }} />
          </div>
        )}

        {/* Held company logos */}
        {heldNames.length > 0 && (
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {heldNames.slice(0, 8).map((c) => {
              const logo = logoUrl(c.ticker, c.name);
              return (
                <div key={c.ticker} title={`${c.name} (${c.ticker})`} style={{
                  display: "flex", alignItems: "center", gap: 4,
                  padding: "2px 6px 2px 2px", borderRadius: 5,
                  background: sector.color + (isDark ? "12" : "06"),
                  border: `1px solid ${sector.color}18`,
                }}>
                  {logo && (
                    <img src={logo} alt="" style={{
                      width: 14, height: 14, borderRadius: 3,
                    }} onError={e => e.target.style.display = "none"} />
                  )}
                  <span style={{ fontSize: 9, fontWeight: 700, fontFamily: Fn, color: T.text }}>{c.ticker}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Theme Row ─── */
function ThemeRow({ theme, sector, isOpen, onClick, T }) {
  const isDark = T.bg !== "#F8F9FC";
  const heldInTheme = theme.companies.filter(c => isHeld(c.ticker)).length;

  return (
    <div style={{
      borderRadius: T.radiusSm, overflow: "hidden",
      border: `1px solid ${isOpen ? sector.color + "40" : T.border}`,
      background: isOpen ? (sector.color + (isDark ? "06" : "03")) : T.card,
      transition: "all 0.2s",
    }}>
      <div
        onClick={onClick}
        onMouseEnter={e => { if (!isOpen) e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)"; }}
        onMouseLeave={e => { if (!isOpen) e.currentTarget.style.background = "transparent"; }}
        style={{
          display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
          cursor: "pointer", transition: "background 0.15s",
        }}
      >
        <div style={{
          width: 3, height: 22, borderRadius: 2, background: sector.color, flexShrink: 0,
          opacity: isOpen ? 1 : 0.35, transition: "opacity 0.2s",
        }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, fontWeight: 600, fontFamily: Fn, color: T.text }}>{theme.name}</span>
            <span style={{
              fontSize: 8, fontWeight: 700, fontFamily: Fn, padding: "2px 5px", borderRadius: 3, letterSpacing: "0.03em",
              background: theme.type.includes("SECULAR") ? T.greenBg : (T.orange + (isDark ? "15" : "08")),
              color: theme.type.includes("SECULAR") ? T.green : T.orange,
            }}>
              {theme.type.replace(" + ", "+")}
            </span>
          </div>
          {!isOpen && (
            <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, marginTop: 2 }}>
              {theme.companies.length} companies{heldInTheme > 0 && <> · <span style={{ color: sector.color, fontWeight: 600 }}>{heldInTheme} held</span></>}
            </div>
          )}
        </div>
        <span style={{
          fontSize: 14, color: T.textTer, transition: "transform 0.2s ease",
          transform: isOpen ? "rotate(90deg)" : "rotate(0)", flexShrink: 0,
        }}>›</span>
      </div>

      {isOpen && (
        <div style={{ padding: "0 14px 14px 27px" }}>
          {/* Theme description */}
          <div style={{
            fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.6,
            marginBottom: 12, padding: "8px 12px", borderRadius: 6,
            background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)",
            borderLeft: `3px solid ${sector.color}40`,
          }}>
            {theme.desc}
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            {theme.companies.map((c, j) => {
              const held = isHeld(c.ticker);
              const logo = logoUrl(c.ticker, c.name);
              return (
                <div key={j} style={{
                  display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 12px", borderRadius: T.radiusSm,
                  background: held ? (sector.color + (isDark ? "10" : "06")) : (isDark ? "rgba(255,255,255,0.015)" : "rgba(0,0,0,0.008)"),
                  border: `1px solid ${held ? sector.color + "25" : T.border}`,
                }}>
                  {logo && (
                    <img src={logo} alt="" style={{
                      width: 24, height: 24, borderRadius: 5, marginTop: 1, border: `1px solid ${T.border}`,
                    }} onError={e => e.target.style.display = "none"} />
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, fontFamily: Fn, color: T.text }}>{c.name}</span>
                      <span style={{ fontSize: 9, fontFamily: Fn, color: T.textTer }}>{c.ticker} · {c.hq}</span>
                      {held && (
                        <span style={{
                          fontSize: 7, fontWeight: 800, fontFamily: Fn, padding: "1px 5px", borderRadius: 3,
                          background: sector.color + "20", color: sector.color, letterSpacing: "0.05em",
                        }}>HELD</span>
                      )}
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

/* ─── Expanded Sector Panel ─── */
function SectorExpanded({ sector, onClose, T }) {
  const isDark = T.bg !== "#F8F9FC";
  const [openTheme, setOpenTheme] = useState(-1);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) ref.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [sector.id]);

  const companyCount = sector.themes.reduce((s, t) => s + t.companies.length, 0);
  const heldNames = [];
  sector.themes.forEach(t => {
    t.companies.forEach(c => {
      if (isHeld(c.ticker) && !heldNames.find(h => h.ticker === c.ticker)) heldNames.push(c);
    });
  });
  const secularCount = sector.themes.filter(t => t.type.includes("SECULAR")).length;

  return (
    <div ref={ref} style={{ gridColumn: "1 / -1" }}>
      <Card T={T} style={{ borderTop: `3px solid ${sector.color}`, padding: "20px 22px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, fontFamily: Fn, color: T.text, letterSpacing: "-0.02em" }}>{sector.name}</div>
            <div style={{ fontSize: 11, fontFamily: Fn, color: T.textTer, marginTop: 3, fontFeatureSettings: '"tnum"' }}>
              {sector.weight}% of NAV · {sector.themes.length} themes ({secularCount} secular) · {companyCount} companies · {heldNames.length} in portfolio
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: T.pillBg, border: `1px solid ${T.border}`, borderRadius: T.radiusSm,
              width: 30, height: 30, fontSize: 13, fontFamily: Fn, color: T.textTer,
              cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.color = T.text}
            onMouseLeave={e => e.currentTarget.style.color = T.textTer}
          >
            ✕
          </button>
        </div>

        {/* Held companies strip */}
        {heldNames.length > 0 && (
          <div style={{
            display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16,
            padding: "10px 14px", borderRadius: T.radiusSm,
            background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)",
            border: `1px solid ${T.border}`,
          }}>
            <span style={{ fontSize: 9, fontWeight: 700, fontFamily: Fn, color: T.textTer, textTransform: "uppercase", letterSpacing: "0.04em", alignSelf: "center", marginRight: 4 }}>
              Held
            </span>
            {heldNames.map((c) => {
              const logo = logoUrl(c.ticker, c.name);
              return (
                <div key={c.ticker} style={{
                  display: "flex", alignItems: "center", gap: 5,
                  padding: "3px 8px 3px 3px", borderRadius: 5,
                  background: sector.color + (isDark ? "15" : "08"),
                  border: `1px solid ${sector.color}20`,
                }}>
                  {logo && (
                    <img src={logo} alt="" style={{ width: 16, height: 16, borderRadius: 4 }}
                      onError={e => e.target.style.display = "none"} />
                  )}
                  <span style={{ fontSize: 10, fontWeight: 700, fontFamily: Fn, color: T.text }}>{c.ticker}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Theme rows */}
        <div style={{ display: "grid", gap: 6 }}>
          {sector.themes.map((theme, i) => (
            <ThemeRow
              key={i}
              theme={theme}
              sector={sector}
              isOpen={openTheme === i}
              onClick={() => setOpenTheme(openTheme === i ? -1 : i)}
              T={T}
            />
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ─── Main Page ─── */
export default function ResearchThematicMap({ T }) {
  const isDark = T.bg !== "#F8F9FC";
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const c = () => setMobile(window.innerWidth < 768);
    c(); window.addEventListener("resize", c);
    return () => window.removeEventListener("resize", c);
  }, []);

  const [activeSector, setActiveSector] = useState(null);
  const [view, setView] = useState("list");

  const totalThemes = sectors.reduce((s, sec) => s + sec.themes.length, 0);
  const totalCos = sectors.reduce((s, sec) => s + sec.themes.reduce((s2, t) => s2 + t.companies.length, 0), 0);

  const handleTileClick = (sectorId) => {
    setActiveSector(prev => prev === sectorId ? null : sectorId);
  };

  const activeSectorData = activeSector ? sectors.find(s => s.id === activeSector) : null;
  const activeIdx = activeSector ? sectors.findIndex(s => s.id === activeSector) : -1;
  const cols = mobile ? 1 : 2;
  const insertAfterRow = activeIdx >= 0 ? Math.floor(activeIdx / cols) : -1;

  const gridItems = useMemo(() => {
    const items = [];
    for (let i = 0; i < sectors.length; i++) {
      items.push({ type: "tile", sector: sectors[i], idx: i });
      const row = Math.floor(i / cols);
      const isLastInRow = (i + 1) % cols === 0 || i === sectors.length - 1;
      if (isLastInRow && row === insertAfterRow && activeSectorData) {
        items.push({ type: "expanded", sector: activeSectorData });
      }
    }
    return items;
  }, [activeSector, activeSectorData, insertAfterRow, cols]);

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
        <div>
          <h2 style={{ fontFamily: Fn, fontSize: 22, fontWeight: 300, letterSpacing: "-0.03em", color: T.text, margin: 0 }}>
            Thematic Universe
          </h2>
          <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, lineHeight: 1.6, marginTop: 6, maxWidth: 680 }}>
            {totalThemes} structural investment themes across 10 GICS sectors, mapped to ~{totalCos} best-in-class companies globally.
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
            <button
              key={v.id}
              onClick={() => setView(v.id)}
              style={{
                background: view === v.id ? (T.deepBlue || T.text) : "transparent",
                color: view === v.id ? "#fff" : T.textSec,
                border: "none", padding: "6px 16px", fontSize: 11, fontFamily: Fn,
                fontWeight: view === v.id ? 700 : 500,
                cursor: "pointer", transition: "all 0.15s",
              }}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {view === "radial" ? (
        <ThematicSunburst T={T} />
      ) : (
        <>
          {/* Macro Forces */}
          <div style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)",
            gap: 10, marginBottom: 18,
          }}>
            {macrodynamics.map((m) => (
              <div key={m.id} style={{
                background: T.card, borderRadius: T.radiusSm, boxShadow: T.shadow,
                padding: "10px 14px", borderLeft: `3px solid ${m.color}`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 3 }}>
                  <span style={{ fontSize: 12 }}>{m.icon}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, fontFamily: Fn, color: T.text }}>{m.short}</span>
                  <span style={{ fontSize: 9, fontFamily: Fn, color: T.textTer, marginLeft: "auto" }}>{m.sectors} sectors</span>
                </div>
                <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, lineHeight: 1.5 }}>
                  {m.desc.length > 100 ? m.desc.slice(0, 98) + "…" : m.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Summary stats */}
          <div style={{
            display: "flex", gap: 20, marginBottom: 18, flexWrap: "wrap",
            padding: "10px 0", borderBottom: `1px solid ${T.border}`,
          }}>
            {[
              { v: "10", l: "Sectors", c: T.text },
              { v: String(totalThemes), l: "Themes", c: T.text },
              { v: `~${totalCos}`, l: "Companies", c: T.text },
              { v: "26", l: "Held", c: T.green },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <span style={{ fontSize: 17, fontWeight: 800, fontFamily: Fn, color: s.c, fontFeatureSettings: '"tnum"' }}>{s.v}</span>
                <span style={{ fontSize: 10, color: T.textTer, fontFamily: Fn }}>{s.l}</span>
              </div>
            ))}
          </div>

          {/* Sector grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
            gap: 12,
          }}>
            {gridItems.map((item, i) => {
              if (item.type === "tile") {
                return (
                  <SectorTile
                    key={item.sector.id}
                    sector={item.sector}
                    isActive={activeSector === item.sector.id}
                    onClick={() => handleTileClick(item.sector.id)}
                    T={T}
                  />
                );
              }
              if (item.type === "expanded") {
                return (
                  <SectorExpanded
                    key={`exp-${item.sector.id}`}
                    sector={item.sector}
                    onClose={() => setActiveSector(null)}
                    T={T}
                  />
                );
              }
              return null;
            })}
          </div>

          {/* Footer */}
          <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, textAlign: "center", marginTop: 24, padding: "12px 0", borderTop: `1px solid ${T.border}` }}>
            Cape Capital AG · Thematic Universe · {totalThemes} themes · ~{totalCos} companies · March 2026
          </div>
        </>
      )}
    </div>
  );
}
