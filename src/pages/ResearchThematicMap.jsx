import { useState, useMemo } from "react";
import { Fn } from "../theme";
import { Pill } from "../components/shared";
import { useMobile } from "../hooks/useMobile";
import {
  sectors, macrodynamics, logoUrl,
} from "../data/research-thematic-map";

/* ═══════════════════════ LOGO ═══════════════════════ */
function Logo({ ticker, name, size = 28, T, style: xs }) {
  const [err, setErr] = useState(false);
  const url = logoUrl(ticker, name);
  if (!url || err) return (
    <div style={{ width: size, height: size, borderRadius: size / 2, background: T.pillBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.36, fontWeight: 700, color: T.textSec, fontFamily: Fn, flexShrink: 0, border: `1px solid ${T.border}`, ...xs }}>
      {(ticker || "?").slice(0, 2)}
    </div>
  );
  return <img src={url} alt={name} onError={() => setErr(true)} style={{ width: size, height: size, borderRadius: size / 2, objectFit: "contain", background: "#fff", border: `1px solid ${T.border}`, flexShrink: 0, ...xs }} />;
}

/* ═══════════════════════ MAIN PAGE ═══════════════════════ */
export default function ResearchThematicMap({ T }) {
  const isMobile = useMobile();
  const [activeSector, setActiveSector] = useState(null);
  const [expandedThemes, setExpandedThemes] = useState(new Set());

  const displayed = activeSector ? sectors.filter(s => s.id === activeSector) : sectors;
  const totalThemes = sectors.reduce((a, s) => a + s.themes.length, 0);

  const toggleTheme = (key) => {
    setExpandedThemes(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  return (
    <div>
      {/* ── Header ── */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
          <h1 style={{ fontFamily: Fn, fontSize: isMobile ? 20 : 26, fontWeight: 300, letterSpacing: "-0.03em", color: T.text, margin: 0 }}>
            Global Thematic Portfolio Map
          </h1>
          <Pill T={T} color={T.purple} bg={T.purple + "15"}>March 2026</Pill>
        </div>
        <p style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, margin: "6px 0 0", maxWidth: 680 }}>
          {totalThemes} structural themes across 10 GICS sectors. Each theme identifies what's driving it, and the best-in-class companies positioned to benefit.
        </p>
      </div>

      {/* ── Three Macrodynamics ── */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", color: T.textTer, fontFamily: Fn, marginBottom: 8, textTransform: "uppercase" }}>
          Three Forces Driving Everything
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 10 }}>
          {macrodynamics.map(m => (
            <div key={m.id} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: T.radiusSm, padding: isMobile ? 14 : 16, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: m.color, opacity: 0.4 }} />
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 18 }}>{m.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn }}>{m.title}</div>
                  <div style={{ fontSize: 10, color: m.color, fontFamily: Fn, fontWeight: 600 }}>Touches {m.sectors}/10 sectors</div>
                </div>
              </div>
              <div style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.6 }}>{m.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Sector filter ── */}
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 20 }}>
        <button onClick={() => setActiveSector(null)}
          style={{ padding: "5px 12px", borderRadius: 16, fontSize: 10, fontWeight: 600, fontFamily: Fn, cursor: "pointer", transition: "all 0.15s", background: !activeSector ? T.purple + "18" : T.pillBg, border: `1px solid ${!activeSector ? T.purple + "50" : T.border}`, color: !activeSector ? T.purple : T.textSec }}>
          All Sectors
        </button>
        {sectors.map(s => (
          <button key={s.id} onClick={() => setActiveSector(activeSector === s.id ? null : s.id)}
            style={{ padding: "5px 12px", borderRadius: 16, fontSize: 10, fontWeight: 600, fontFamily: Fn, cursor: "pointer", transition: "all 0.15s", background: activeSector === s.id ? s.color + "18" : T.pillBg, border: `1px solid ${activeSector === s.id ? s.color + "50" : T.border}`, color: activeSector === s.id ? s.color : T.textSec }}>
            {s.short}
          </button>
        ))}
      </div>

      {/* ── Themes ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        {displayed.map(sector => (
          <div key={sector.id}>
            {/* Sector header */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 4, height: 24, borderRadius: 2, background: sector.color }} />
              <div style={{ fontSize: 16, fontWeight: 600, color: T.text, fontFamily: Fn }}>{sector.name}</div>
              <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn }}>{sector.themes.length} themes</div>
              {sector.weight > 0 && <div style={{ fontSize: 10, color: sector.color, fontFamily: Fn, fontWeight: 600, marginLeft: "auto" }}>~{sector.weight}% of portfolio</div>}
            </div>

            {/* Theme cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {sector.themes.map((theme, ti) => {
                const key = `${sector.id}-${ti}`;
                const isOpen = expandedThemes.has(key);
                return (
                  <div key={ti} style={{ background: T.card, borderRadius: T.radius, border: `1px solid ${T.border}`, overflow: "hidden", boxShadow: T.shadow, transition: "border-color 0.2s", ...(isOpen ? { borderColor: sector.color + "40" } : {}) }}>
                    {/* Theme header — always visible */}
                    <div onClick={() => toggleTheme(key)} style={{ padding: isMobile ? "12px 14px" : "12px 18px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 12, transition: "background 0.15s", background: isOpen ? sector.color + "04" : "transparent" }}>
                      <div style={{ flexShrink: 0, marginTop: 2 }}>
                        <div style={{ width: 22, height: 22, borderRadius: 11, background: sector.color + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: sector.color, fontWeight: 700, fontFamily: Fn }}>
                          {theme.companies.length}
                        </div>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn }}>{theme.name}</span>
                          <Pill T={T}
                            color={theme.type.includes("SECULAR") && theme.type.includes("CYCLICAL") ? T.orange : theme.type.includes("SECULAR") || theme.type.includes("STRUCTURAL") ? T.green : T.deepBlue}
                            bg={theme.type.includes("SECULAR") && theme.type.includes("CYCLICAL") ? "rgba(234,88,12,0.08)" : theme.type.includes("SECULAR") || theme.type.includes("STRUCTURAL") ? T.greenBg : "rgba(29,78,216,0.08)"}>
                            {theme.type}
                          </Pill>
                        </div>
                        <div style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.6, marginTop: 4 }}>
                          {theme.desc}
                        </div>
                        {/* Company logos preview when collapsed */}
                        {!isOpen && (
                          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
                            {theme.companies.map((c, ci) => (
                              <Logo key={c.ticker} ticker={c.ticker} name={c.name} size={22} T={T}
                                style={{ marginLeft: ci > 0 ? -3 : 0, zIndex: theme.companies.length - ci, position: "relative" }} />
                            ))}
                            <span style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginLeft: 4 }}>
                              {theme.companies.map(c => c.ticker).join(", ")}
                            </span>
                          </div>
                        )}
                      </div>
                      <span style={{ fontSize: 14, color: T.textTer, transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", fontFamily: Fn, flexShrink: 0, marginTop: 2 }}>{"\u25BE"}</span>
                    </div>

                    {/* Expanded: company detail */}
                    {isOpen && (
                      <div style={{ padding: isMobile ? "0 14px 14px" : "0 18px 16px", borderTop: `1px solid ${T.border}` }}>
                        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", color: T.textTer, fontFamily: Fn, textTransform: "uppercase", padding: "12px 0 8px" }}>
                          How to invest
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          {theme.companies.map(c => (
                            <div key={c.ticker} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 12px", borderRadius: T.radiusSm, background: T.bg, border: `1px solid ${T.border}` }}>
                              <Logo ticker={c.ticker} name={c.name} size={32} T={T} />
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                                  <span style={{ fontSize: 13, fontWeight: 700, color: sector.color, fontFamily: Fn }}>{c.ticker}</span>
                                  <span style={{ fontSize: 12, fontWeight: 500, color: T.text, fontFamily: Fn }}>{c.name}</span>
                                  <span style={{ fontSize: 9, color: T.textTer, fontFamily: Fn, marginLeft: "auto", flexShrink: 0 }}>{c.hq}</span>
                                </div>
                                <div style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.6, marginTop: 3 }}>{c.why}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* ── Footer ── */}
      <div style={{ fontSize: 9, color: T.textTer, fontFamily: Fn, lineHeight: 1.6, padding: "14px 0", borderTop: `1px solid ${T.border}`, marginTop: 32 }}>
        Synthesises: deep primary research (March 2026), GICS structural tailwinds analysis (IEA, IPCC, WHO, BIS, ITU, IFR, IRENA), and sell-side/buy-side frameworks (Morgan Stanley, Fidelity, Schwab, Nuveen 2025-2026). Research shortlist, not investable recommendations. For internal use only.
      </div>
    </div>
  );
}
