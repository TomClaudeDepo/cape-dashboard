import { useState, useMemo, useEffect, useRef } from "react";
import { Fn } from "../theme";
import { Card, Label } from "../components/shared";
import { sectors, logoUrl } from "../data/research-thematic-map";
import { holdings } from "../data/portfolio";
import ThematicSunburst from "../components/ThematicSunburst";
import ThematicCards from "../components/ThematicCards";

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

/* ─── Sector Tile ─── */
function SectorTile({ sector, isActive, onClick, T }) {
  const isDark = T.bg !== "#F8F9FC";
  const companyCount = sector.themes.reduce((s, t) => s + t.companies.length, 0);
  const heldCount = sector.themes.reduce((s, t) => s + t.companies.filter(c => isHeld(c.ticker)).length, 0);

  return (
    <div
      onClick={onClick}
      onMouseEnter={e => { if (!isActive) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = T.shadowLg; } }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = T.shadow; }}
      style={{
        background: T.card, borderRadius: T.radius, boxShadow: T.shadow,
        cursor: "pointer", overflow: "hidden", transition: "all 0.2s",
        border: isActive ? `2px solid ${sector.color}` : `2px solid transparent`,
        opacity: 1,
      }}
    >
      {/* Color bar */}
      <div style={{ height: 4, background: sector.color }} />

      <div style={{ padding: "14px 16px 16px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, fontFamily: Fn, color: T.text, letterSpacing: "-0.01em" }}>{sector.short}</div>
            <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 1 }}>{sector.name}</div>
          </div>
          <div style={{
            fontSize: 18, fontWeight: 800, fontFamily: Fn, color: sector.color,
            lineHeight: 1, letterSpacing: "-0.03em",
          }}>
            {sector.weight}%
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 12, marginBottom: 10 }}>
          {[
            { v: sector.themes.length, l: "themes" },
            { v: companyCount, l: "companies" },
            { v: heldCount, l: "held" },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: 15, fontWeight: 700, fontFamily: Fn, color: T.text, fontFeatureSettings: '"tnum"' }}>{s.v}</div>
              <div style={{ fontSize: 8, color: T.textTer, fontFamily: Fn, textTransform: "uppercase", letterSpacing: "0.04em" }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Theme pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          {sector.themes.slice(0, 4).map((t, i) => (
            <span key={i} style={{
              fontSize: 8, fontFamily: Fn, fontWeight: 500, padding: "2px 6px", borderRadius: 4,
              background: sector.color + (isDark ? "18" : "0A"),
              color: isDark ? sector.color : T.textSec,
            }}>
              {t.name.length > 22 ? t.name.slice(0, 20) + "…" : t.name}
            </span>
          ))}
          {sector.themes.length > 4 && (
            <span style={{ fontSize: 8, fontFamily: Fn, fontWeight: 600, padding: "2px 6px", borderRadius: 4, color: T.textTer }}>
              +{sector.themes.length - 4}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Theme Row (expandable) ─── */
function ThemeRow({ theme, sector, isOpen, onClick, T }) {
  const isDark = T.bg !== "#F8F9FC";
  const heldInTheme = theme.companies.filter(c => isHeld(c.ticker)).length;

  return (
    <div style={{
      borderRadius: 10, overflow: "hidden",
      border: `1px solid ${isOpen ? sector.color + "50" : T.border}`,
      background: isOpen ? (sector.color + (isDark ? "08" : "03")) : T.card,
      transition: "all 0.2s",
    }}>
      {/* Header — always visible */}
      <div
        onClick={onClick}
        style={{
          display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
          cursor: "pointer",
        }}
      >
        <div style={{
          width: 4, height: 28, borderRadius: 2, background: sector.color, flexShrink: 0,
          opacity: isOpen ? 1 : 0.4,
        }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 13, fontWeight: 600, fontFamily: Fn, color: T.text }}>{theme.name}</span>
            <span style={{
              fontSize: 8, fontWeight: 700, fontFamily: Fn, padding: "2px 6px", borderRadius: 4, letterSpacing: "0.03em",
              background: theme.type.includes("SECULAR") ? T.greenBg : (T.orange + "10"),
              color: theme.type.includes("SECULAR") ? T.green : T.orange,
            }}>
              {theme.type}
            </span>
          </div>
          {!isOpen && (
            <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 2 }}>
              {theme.companies.length} companies{heldInTheme > 0 && <> · <span style={{ color: sector.color, fontWeight: 600 }}>{heldInTheme} held</span></>}
            </div>
          )}
        </div>
        <span style={{
          fontSize: 16, color: T.textTer, transition: "transform 0.25s ease",
          transform: isOpen ? "rotate(90deg)" : "rotate(0)",
          flexShrink: 0,
        }}>›</span>
      </div>

      {/* Expanded body */}
      {isOpen && (
        <div style={{ padding: "0 16px 16px 32px" }}>
          {/* Theme description */}
          <div style={{
            fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.65,
            marginBottom: 14, padding: "10px 14px", borderRadius: 8,
            background: isDark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.015)",
            borderLeft: `3px solid ${sector.color}`,
          }}>
            {theme.desc}
          </div>

          {/* Companies */}
          <div style={{ display: "grid", gap: 8 }}>
            {theme.companies.map((c, j) => {
              const held = isHeld(c.ticker);
              const logo = logoUrl(c.ticker, c.name);
              return (
                <div key={j} style={{
                  display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 14px", borderRadius: 8,
                  background: held ? (sector.color + (isDark ? "14" : "07")) : (isDark ? "rgba(255,255,255,0.018)" : "rgba(0,0,0,0.008)"),
                  border: held ? `1px solid ${sector.color}30` : `1px solid ${T.border}`,
                }}>
                  {logo && (
                    <img src={logo} alt="" style={{
                      width: 28, height: 28, borderRadius: 6, marginTop: 1,
                      border: `1px solid ${T.border}`,
                    }} onError={e => e.target.style.display = "none"} />
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 12, fontWeight: 700, fontFamily: Fn, color: T.text }}>{c.name}</span>
                      <span style={{ fontSize: 9, color: T.textTer, fontFamily: Fn }}>{c.ticker} · {c.hq}</span>
                      {held && (
                        <span style={{
                          fontSize: 7, fontWeight: 800, fontFamily: Fn, padding: "2px 6px", borderRadius: 4,
                          background: sector.color + "20", color: sector.color,
                          letterSpacing: "0.05em",
                        }}>
                          IN PORTFOLIO
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 10, color: T.textSec, fontFamily: Fn, lineHeight: 1.6, marginTop: 4 }}>{c.why}</div>
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
    if (ref.current) ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [sector.id]);

  const companyCount = sector.themes.reduce((s, t) => s + t.companies.length, 0);
  const heldCount = sector.themes.reduce((s, t) => s + t.companies.filter(c => isHeld(c.ticker)).length, 0);
  const secularCount = sector.themes.filter(t => t.type.includes("SECULAR")).length;

  return (
    <div ref={ref} style={{ gridColumn: "1 / -1" }}>
      <Card T={T} style={{ borderTop: `3px solid ${sector.color}` }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, fontFamily: Fn, color: T.text, letterSpacing: "-0.02em" }}>{sector.name}</div>
            <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginTop: 4 }}>
              {sector.themes.length} themes · {companyCount} companies · {heldCount} in portfolio · {sector.weight}% weight
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: T.pillBg, border: `1px solid ${T.border}`, borderRadius: 8,
              padding: "6px 14px", fontSize: 11, fontFamily: Fn, color: T.textSec,
              cursor: "pointer", flexShrink: 0, transition: "all 0.15s",
            }}
          >
            ✕ Close
          </button>
        </div>

        {/* Context paragraph */}
        <div style={{
          fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, marginBottom: 20,
          padding: "12px 16px", borderRadius: 10,
          background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)",
        }}>
          {sector.stocks > 0 ? (
            <>The fund holds <span style={{ fontWeight: 700, color: sector.color }}>{sector.stocks} positions</span> in {sector.short} at <span style={{ fontWeight: 700 }}>{sector.weight}%</span> of NAV{sector.weight > 10 ? " — an overweight relative to the ACWI benchmark, reflecting high conviction in the structural themes below" : " — a selective exposure focused on the highest-conviction opportunities"}. Of the {sector.themes.length} themes mapped, <span style={{ fontWeight: 600 }}>{secularCount} are secular</span> (multi-year structural drivers) and {sector.themes.length - secularCount} have cyclical elements. The companies below represent the investable universe from which the fund's positions are drawn.</>
          ) : (
            <>The fund currently holds <span style={{ fontWeight: 700, color: T.orange }}>no positions</span> in {sector.short}. This isn't a negative view — it reflects the portfolio's concentrated approach (26 names across all sectors) and the current opportunity set in other sectors. The {sector.themes.length} themes and {companyCount} companies below form the watchlist for future entry points as valuations or catalysts evolve.</>
          )}
        </div>

        {/* Stats chips */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
          {[
            { v: sector.themes.length, l: "Themes", c: sector.color },
            { v: companyCount, l: "Companies", c: T.deepBlue },
            { v: heldCount, l: "Held", c: T.green },
            { v: secularCount, l: "Secular", c: T.green },
            { v: sector.themes.length - secularCount, l: "Cyclical", c: T.orange },
          ].map((chip, i) => (
            <div key={i} style={{
              padding: "6px 14px", borderRadius: 8,
              background: chip.c + (isDark ? "15" : "08"),
              display: "flex", alignItems: "baseline", gap: 5,
            }}>
              <span style={{ fontSize: 16, fontWeight: 800, fontFamily: Fn, color: chip.c }}>{chip.v}</span>
              <span style={{ fontSize: 9, fontWeight: 600, fontFamily: Fn, color: T.textTer, textTransform: "uppercase", letterSpacing: "0.04em" }}>{chip.l}</span>
            </div>
          ))}
        </div>

        {/* Themes list */}
        <div style={{ display: "grid", gap: 8 }}>
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
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const c = () => setMobile(window.innerWidth < 768);
    c(); window.addEventListener("resize", c);
    return () => window.removeEventListener("resize", c);
  }, []);

  const [activeSector, setActiveSector] = useState(null);

  const totalThemes = sectors.reduce((s, sec) => s + sec.themes.length, 0);
  const totalCos = sectors.reduce((s, sec) => s + sec.themes.reduce((s2, t) => s2 + t.companies.length, 0), 0);

  const handleTileClick = (sectorId) => {
    setActiveSector(prev => prev === sectorId ? null : sectorId);
  };

  const activeSectorData = activeSector ? sectors.find(s => s.id === activeSector) : null;

  // Find the grid row where the expanded panel should appear
  const activeIdx = activeSector ? sectors.findIndex(s => s.id === activeSector) : -1;
  const cols = mobile ? 1 : 2;
  const insertAfterRow = activeIdx >= 0 ? Math.floor(activeIdx / cols) : -1;

  // Build grid items with expansion panel inserted in the right position
  const gridItems = useMemo(() => {
    const items = [];
    for (let i = 0; i < sectors.length; i++) {
      items.push({ type: "tile", sector: sectors[i], idx: i });
      // Insert expanded panel after the last tile in this row
      const row = Math.floor(i / cols);
      const isLastInRow = (i + 1) % cols === 0 || i === sectors.length - 1;
      if (isLastInRow && row === insertAfterRow && activeSectorData) {
        items.push({ type: "expanded", sector: activeSectorData });
      }
    }
    return items;
  }, [activeSector, activeSectorData, insertAfterRow, cols]);

  const [view, setView] = useState("cards"); // "cards" | "radial" | "list"

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
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
            display: "flex", gap: 0, borderRadius: 8, overflow: "hidden",
            border: `1px solid ${T.border}`, flexShrink: 0,
          }}>
            {[
              { id: "cards", label: "◫ Cards" },
              { id: "radial", label: "◉ Radial" },
              { id: "list", label: "☰ List" },
            ].map((v) => (
              <button
                key={v.id}
                onClick={() => setView(v.id)}
                style={{
                  background: view === v.id ? (T.deepBlue || T.text) : "transparent",
                  color: view === v.id ? "#fff" : T.textSec,
                  border: "none", padding: "6px 14px", fontSize: 11, fontFamily: Fn,
                  fontWeight: view === v.id ? 700 : 500,
                  cursor: "pointer", transition: "all 0.15s",
                }}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {view === "cards" ? (
        <ThematicCards T={T} />
      ) : view === "radial" ? (
        <ThematicSunburst T={T} />
      ) : (
        <>
          {/* Summary stats */}
          <div style={{ display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
            {[
              { v: "10", l: "Sectors" }, { v: String(totalThemes), l: "Themes" },
              { v: `~${totalCos}`, l: "Companies" }, { v: "26", l: "Held" },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
                <span style={{ fontSize: 18, fontWeight: 800, fontFamily: Fn, color: T.text }}>{s.v}</span>
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
          <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, textAlign: "center", marginTop: 24, padding: "12px 0", borderTop: "1px solid " + T.border }}>
            Cape Capital AG · Thematic Universe · {totalThemes} themes · ~{totalCos} companies · March 2026
          </div>
        </>
      )}
    </div>
  );
}
