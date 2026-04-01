import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { Fn, Fh } from "../theme";
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

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   LOGO — polished company logo with white bg + fallback
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function Logo({ ticker, name, size = 20, color, isDark }) {
  const [failed, setFailed] = useState(false);
  const url = logoUrl(ticker);
  const initial = (name || ticker || "?")[0].toUpperCase();
  const containerBg = isDark ? "rgba(255,255,255,0.95)" : "#fff";
  const containerBorder = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)";

  return (
    <div style={{
      width: size, height: size, borderRadius: size <= 18 ? 4 : 5, flexShrink: 0,
      background: (!url || failed) ? (color || "#888") + "18" : containerBg,
      border: `1px solid ${(!url || failed) ? (color || "#888") + "20" : containerBorder}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
      boxShadow: url && !failed ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
    }}>
      {url && !failed ? (
        <img src={url} alt="" style={{
          width: size - 4, height: size - 4, objectFit: "contain",
          borderRadius: size <= 18 ? 2 : 3,
        }} onError={() => setFailed(true)} />
      ) : (
        <span style={{
          fontSize: size * 0.42, fontWeight: 700, fontFamily: Fn,
          color: color || "#888", lineHeight: 1,
        }}>
          {initial}
        </span>
      )}
    </div>
  );
}
const isHeld = t => heldMap[t] !== undefined ? heldMap[t] : holdings.some(h => h.t === t || h.t.startsWith(t + "."));
const getHeld = s => { const seen = new Set(), out = []; s.themes.forEach(t => t.companies.forEach(c => { if (isHeld(c.ticker) && !seen.has(c.ticker)) { seen.add(c.ticker); out.push(c); }})); return out; };
const countHeld = s => getHeld(s).length;
const totalCos = s => s.themes.reduce((n, t) => n + t.companies.length, 0);
const unique = arr => [...new Set(arr)];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SECTOR ICONS — custom SVGs per sector for visual identity
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function SectorIcon({ sectorId, color, size = 36 }) {
  const s = { width: size, height: size, flexShrink: 0 };
  const icons = {
    it: (
      <svg viewBox="0 0 36 36" fill="none" style={s}>
        <rect x="6" y="6" width="24" height="24" rx="3" stroke={color} strokeWidth="1.5" opacity="0.3"/>
        <rect x="10" y="10" width="16" height="16" rx="1.5" stroke={color} strokeWidth="1.5"/>
        <circle cx="18" cy="18" r="3.5" fill={color} opacity="0.8"/>
        <line x1="18" y1="6" x2="18" y2="10" stroke={color} strokeWidth="1.2"/>
        <line x1="18" y1="26" x2="18" y2="30" stroke={color} strokeWidth="1.2"/>
        <line x1="6" y1="18" x2="10" y2="18" stroke={color} strokeWidth="1.2"/>
        <line x1="26" y1="18" x2="30" y2="18" stroke={color} strokeWidth="1.2"/>
        <line x1="12" y1="6" x2="12" y2="10" stroke={color} strokeWidth="1" opacity="0.5"/>
        <line x1="24" y1="6" x2="24" y2="10" stroke={color} strokeWidth="1" opacity="0.5"/>
        <line x1="12" y1="26" x2="12" y2="30" stroke={color} strokeWidth="1" opacity="0.5"/>
        <line x1="24" y1="26" x2="24" y2="30" stroke={color} strokeWidth="1" opacity="0.5"/>
      </svg>
    ),
    health: (
      <svg viewBox="0 0 36 36" fill="none" style={s}>
        <path d="M18 8C14 8 10 11.5 10 16c0 6 8 13 8 13s8-7 8-13c0-4.5-4-8-8-8z" stroke={color} strokeWidth="1.5" opacity="0.25"/>
        <path d="M12 18h4l2-4 4 8 2-4h4" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="18" cy="12" r="1.5" fill={color} opacity="0.4"/>
      </svg>
    ),
    financials: (
      <svg viewBox="0 0 36 36" fill="none" style={s}>
        <path d="M6 28h24" stroke={color} strokeWidth="1.5" opacity="0.4"/>
        <path d="M18 8L6 14h24L18 8z" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.08"/>
        <rect x="9" y="16" width="3" height="10" rx="0.5" fill={color} opacity="0.5"/>
        <rect x="16.5" y="14" width="3" height="12" rx="0.5" fill={color} opacity="0.7"/>
        <rect x="24" y="18" width="3" height="8" rx="0.5" fill={color} opacity="0.4"/>
      </svg>
    ),
    industrials: (
      <svg viewBox="0 0 36 36" fill="none" style={s}>
        <circle cx="18" cy="18" r="9" stroke={color} strokeWidth="1.5" opacity="0.25"/>
        <circle cx="18" cy="18" r="5" stroke={color} strokeWidth="1.5"/>
        <circle cx="18" cy="18" r="1.8" fill={color} opacity="0.7"/>
        <line x1="18" y1="7" x2="18" y2="11" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="18" y1="25" x2="18" y2="29" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="7" y1="18" x2="11" y2="18" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="25" y1="18" x2="29" y2="18" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="10.2" y1="10.2" x2="13" y2="13" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
        <line x1="23" y1="23" x2="25.8" y2="25.8" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
        <line x1="25.8" y1="10.2" x2="23" y2="13" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
        <line x1="13" y1="23" x2="10.2" y2="25.8" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
    consdisc: (
      <svg viewBox="0 0 36 36" fill="none" style={s}>
        <path d="M18 6l3.5 7.5H29l-6 5 2.5 8L18 22l-7.5 4.5 2.5-8-6-5h7.5L18 6z" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.08"/>
        <circle cx="18" cy="16" r="3" fill={color} opacity="0.4"/>
      </svg>
    ),
    commsvc: (
      <svg viewBox="0 0 36 36" fill="none" style={s}>
        <circle cx="18" cy="18" r="3" fill={color} opacity="0.7"/>
        <path d="M12 12a8.5 8.5 0 0 1 12 0" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
        <path d="M24 24a8.5 8.5 0 0 1-12 0" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
        <path d="M8.5 8.5a13.5 13.5 0 0 1 19 0" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.35"/>
        <path d="M27.5 27.5a13.5 13.5 0 0 1-19 0" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.35"/>
      </svg>
    ),
    energy: (
      <svg viewBox="0 0 36 36" fill="none" style={s}>
        <path d="M20 6L12 20h6l-2 10 10-14h-6l2-10z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" fill={color} fillOpacity="0.12"/>
        <path d="M15 18l3-6" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
    materials: (
      <svg viewBox="0 0 36 36" fill="none" style={s}>
        <path d="M18 6l10 6v12l-10 6-10-6V12l10-6z" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.06"/>
        <path d="M18 6v12m0 0l10-6m-10 6l-10-6m10 6v12m0 0l10-6m-10 6l-10-6" stroke={color} strokeWidth="0.8" opacity="0.3"/>
        <circle cx="18" cy="18" r="2" fill={color} opacity="0.5"/>
      </svg>
    ),
    consstap: (
      <svg viewBox="0 0 36 36" fill="none" style={s}>
        <path d="M18 8c-6 0-10 3-10 6v2c0 3 4 6 10 6s10-3 10-6v-2c0-3-4-6-10-6z" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.06"/>
        <ellipse cx="18" cy="14" rx="10" ry="4" stroke={color} strokeWidth="0.8" opacity="0.3"/>
        <path d="M8 16v6c0 3 4 6 10 6s10-3 10-6v-6" stroke={color} strokeWidth="1.5"/>
        <ellipse cx="18" cy="22" rx="6" ry="2" fill={color} opacity="0.15"/>
      </svg>
    ),
    utilities: (
      <svg viewBox="0 0 36 36" fill="none" style={s}>
        <circle cx="18" cy="18" r="11" stroke={color} strokeWidth="1" opacity="0.2"/>
        <path d="M10 26l4-10 4 5 4-8 4 6" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="18" cy="10" r="3" stroke={color} strokeWidth="1.2" fill={color} fillOpacity="0.15"/>
        <line x1="18" y1="13" x2="18" y2="18" stroke={color} strokeWidth="1" opacity="0.4"/>
      </svg>
    ),
  };
  return icons[sectorId] || (
    <svg viewBox="0 0 36 36" fill="none" style={s}>
      <circle cx="18" cy="18" r="10" stroke={color} strokeWidth="1.5" opacity="0.4"/>
      <circle cx="18" cy="18" r="4" fill={color} opacity="0.5"/>
    </svg>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SECTOR TILE — visually rich card with icon, themes, holdings
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function SectorTile({ sector, isActive, onClick, T, isDark, dimmed }) {
  const held = getHeld(sector);
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: T.card,
        borderRadius: 10,
        cursor: "pointer",
        overflow: "hidden",
        transition: "all 0.25s ease",
        border: `1px solid ${isActive ? sector.color : hov && !dimmed ? sector.color + "50" : T.border}`,
        opacity: dimmed ? 0.25 : 1,
        transform: hov && !dimmed && !isActive ? "translateY(-2px)" : "none",
        boxShadow: hov && !dimmed ? `0 4px 16px ${sector.color}12` : "none",
      }}
    >
      {/* ── Visual header zone — icon + color gradient ── */}
      <div style={{
        position: "relative",
        padding: "18px 18px 14px",
        background: `linear-gradient(135deg, ${sector.color}${isDark ? "0C" : "08"} 0%, transparent 70%)`,
        borderBottom: `1px solid ${sector.color}${isDark ? "12" : "0A"}`,
      }}>
        {/* Subtle large watermark icon behind */}
        <div style={{
          position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
          opacity: isDark ? 0.06 : 0.05, pointerEvents: "none",
        }}>
          <SectorIcon sectorId={sector.id} color={sector.color} size={72} />
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, position: "relative" }}>
          {/* Foreground icon */}
          <div style={{
            padding: 6, borderRadius: 8,
            background: sector.color + (isDark ? "14" : "0C"),
            border: `1px solid ${sector.color}${isDark ? "20" : "14"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <SectorIcon sectorId={sector.id} color={sector.color} size={32} />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Name row */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 2 }}>
              <span style={{ fontSize: 14, fontWeight: 700, fontFamily: Fn, color: T.text, letterSpacing: "-0.01em" }}>
                {sector.short}
              </span>
              {sector.weight > 0 ? (
                <span style={{ fontSize: 17, fontWeight: 800, fontFamily: Fn, color: sector.color, letterSpacing: "-0.04em", fontFeatureSettings: '"tnum"' }}>
                  {sector.weight}<span style={{ fontSize: 9, fontWeight: 600, opacity: 0.7 }}>%</span>
                </span>
              ) : (
                <span style={{ fontSize: 8, fontWeight: 600, fontFamily: Fn, color: T.textTer, letterSpacing: "0.04em", padding: "1px 5px", borderRadius: 3, border: `1px solid ${T.border}` }}>WATCHLIST</span>
              )}
            </div>
            {/* Theme count */}
            <span style={{ fontSize: 10, fontFamily: Fn, color: T.textTer }}>
              {sector.themes.length} themes · {totalCos(sector)} companies
            </span>
          </div>
        </div>
      </div>

      {/* ── Body — key themes tagline + held logos ── */}
      <div style={{ padding: "10px 18px 14px" }}>
        {/* Key themes tagline */}
        <div style={{
          fontSize: 10, fontFamily: Fn, color: T.textSec, lineHeight: 1.45,
          marginBottom: held.length > 0 ? 10 : 0,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {sector.keyThemes}
        </div>

        {/* Held logos */}
        {held.length > 0 && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
            {held.slice(0, 8).map(c => (
              <div key={c.ticker} title={c.name} style={{
                display: "flex", alignItems: "center", gap: 5,
                padding: "3px 8px 3px 4px", borderRadius: 6,
                background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"}`,
              }}>
                <Logo ticker={c.ticker} name={c.name} size={18} color={sector.color} isDark={isDark} />
                <span style={{ fontSize: 9, fontWeight: 600, fontFamily: Fn, color: T.textSec }}>{c.ticker}</span>
              </div>
            ))}
            {held.length > 8 && <span style={{ fontSize: 9, fontFamily: Fn, color: T.textTer }}>+{held.length - 8}</span>}
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
              return (
                <div key={j} style={{
                  display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 10px",
                  borderRadius: 6,
                  background: held ? (sector.color + (isDark ? "0A" : "04")) : (isDark ? "rgba(255,255,255,0.015)" : "rgba(0,0,0,0.008)"),
                  border: held ? `1px solid ${sector.color}18` : "1px solid transparent",
                }}>
                  <Logo ticker={c.ticker} name={c.name} size={24} color={sector.color} isDark={isDark} />
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
            {held.length > 0 && held.map(c => (
              <div key={c.ticker} style={{
                display: "flex", alignItems: "center", gap: 5,
                padding: "3px 8px 3px 4px", borderRadius: 6,
                background: sector.color + (isDark ? "10" : "06"),
                border: `1px solid ${sector.color}${isDark ? "18" : "10"}`,
              }}>
                <Logo ticker={c.ticker} name={c.name} size={18} color={sector.color} isDark={isDark} />
                <span style={{ fontSize: 9, fontWeight: 700, fontFamily: Fn, color: T.text }}>{c.ticker}</span>
              </div>
            ))}
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
          <h2 style={{ fontFamily: Fh, fontSize: 22, fontWeight: 400, fontStyle: "italic", letterSpacing: "-0.03em", color: T.text, margin: 0 }}>
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
