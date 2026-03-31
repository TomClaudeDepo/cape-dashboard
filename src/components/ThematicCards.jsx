import { useState, useEffect } from "react";
import { Fn } from "../theme";
import { Card } from "../components/shared";
import { sectors, logoUrl, macrodynamics } from "../data/research-thematic-map";
import { holdings } from "../data/portfolio";

/* ─── Portfolio matching ─── */
const heldMap = {
  "NVDA": true, "AVGO": true, "TSM": true, "MSFT": true, "GOOGL": true, "NOW": true,
  "SIE": true, "ROK": true, "JPM": true, "ICE": true, "AMZN": true, "BKNG": true,
  "NFLX": true, "0700": true, "TMO": true, "AI": true, "META": false, "CEG": true,
  "LLY": true, "RHM": true, "MELI": true, "SAF": true, "LIN": true, "BKR": true,
  "SU": true, "ETN": true,
};
const isHeld = (ticker) => {
  if (heldMap[ticker] !== undefined) return heldMap[ticker];
  return holdings.some(h => h.t === ticker || h.t.startsWith(ticker + ".") || h.name.toUpperCase() === ticker.toUpperCase());
};

/* ─── Macro Banner ─── */
function MacroBanner({ T, isDark }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 20 }}>
      {macrodynamics.map((m) => (
        <div key={m.id} style={{
          background: T.card,
          borderRadius: T.radiusSm,
          padding: "12px 14px",
          borderLeft: `3px solid ${m.color}`,
          boxShadow: T.shadow,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <span style={{ fontSize: 13 }}>{m.icon}</span>
            <span style={{ fontSize: 12, fontWeight: 700, fontFamily: Fn, color: T.text, letterSpacing: "-0.01em" }}>
              {m.short}
            </span>
          </div>
          <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, lineHeight: 1.5 }}>
            {m.desc.length > 90 ? m.desc.slice(0, 88) + "…" : m.desc}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Macro Banner Mobile ─── */
function MacroBannerMobile({ T }) {
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
      {macrodynamics.map((m) => (
        <div key={m.id} style={{
          background: T.card, borderRadius: T.radiusSm, padding: "8px 12px",
          borderLeft: `3px solid ${m.color}`, boxShadow: T.shadow, flexShrink: 0, minWidth: 160,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ fontSize: 12 }}>{m.icon}</span>
            <span style={{ fontSize: 11, fontWeight: 700, fontFamily: Fn, color: T.text }}>{m.short}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Company Chip ─── */
function CompanyChip({ ticker, name, color, T, isDark }) {
  const logo = logoUrl(ticker, name);
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "3px 8px 3px 3px", borderRadius: 6,
      background: color + (isDark ? "15" : "0A"),
      border: `1px solid ${color}25`,
    }}>
      {logo && (
        <img src={logo} alt="" style={{
          width: 16, height: 16, borderRadius: 4, border: `1px solid ${T.border}`,
        }} onError={e => e.target.style.display = "none"} />
      )}
      <span style={{ fontSize: 10, fontWeight: 700, fontFamily: Fn, color: T.text, letterSpacing: "0.01em" }}>
        {ticker}
      </span>
    </div>
  );
}

/* ─── Theme Row ─── */
function ThemeRow({ theme, color, isOpen, onClick, T, isDark }) {
  const heldInTheme = theme.companies.filter(c => isHeld(c.ticker)).length;
  const totalCos = theme.companies.length;

  return (
    <div style={{
      borderRadius: T.radiusSm,
      border: `1px solid ${isOpen ? color + "40" : "transparent"}`,
      background: isOpen ? (color + (isDark ? "08" : "03")) : "transparent",
      transition: "all 0.2s",
    }}>
      {/* Row header */}
      <div
        onClick={onClick}
        style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: isOpen ? "8px 10px" : "4px 10px",
          cursor: "pointer",
          borderRadius: T.radiusSm,
        }}
        onMouseEnter={e => { if (!isOpen) e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.015)"; }}
        onMouseLeave={e => { if (!isOpen) e.currentTarget.style.background = "transparent"; }}
      >
        <div style={{
          width: 3, height: 16, borderRadius: 2, background: color,
          opacity: isOpen ? 1 : 0.35, flexShrink: 0, transition: "opacity 0.2s",
        }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 600, fontFamily: Fn, color: T.text }}>{theme.name}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          {heldInTheme > 0 && (
            <span style={{
              fontSize: 8, fontWeight: 700, fontFamily: Fn, padding: "1px 5px", borderRadius: 3,
              background: color + (isDark ? "20" : "10"), color: color,
              fontFeatureSettings: '"tnum"',
            }}>
              {heldInTheme} held
            </span>
          )}
          <span style={{
            fontSize: 7, fontWeight: 700, fontFamily: Fn, padding: "2px 5px", borderRadius: 3,
            letterSpacing: "0.03em",
            background: theme.type.includes("SECULAR") ? T.greenBg : (T.orange + (isDark ? "15" : "0A")),
            color: theme.type.includes("SECULAR") ? T.green : T.orange,
          }}>
            {theme.type.replace(" + ", "+")}
          </span>
          <span style={{
            fontSize: 12, color: T.textTer, transition: "transform 0.2s",
            transform: isOpen ? "rotate(90deg)" : "rotate(0)",
          }}>›</span>
        </div>
      </div>

      {/* Expanded companies */}
      {isOpen && (
        <div style={{ padding: "2px 10px 10px 21px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {theme.companies.map((c, i) => {
              const held = isHeld(c.ticker);
              const logo = logoUrl(c.ticker, c.name);
              return (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: 8, padding: "7px 10px", borderRadius: 6,
                  background: held ? (color + (isDark ? "12" : "06")) : (isDark ? "rgba(255,255,255,0.015)" : "rgba(0,0,0,0.01)"),
                  border: `1px solid ${held ? color + "25" : T.border}`,
                }}>
                  {logo && (
                    <img src={logo} alt="" style={{
                      width: 22, height: 22, borderRadius: 5, marginTop: 1,
                      border: `1px solid ${T.border}`,
                    }} onError={e => e.target.style.display = "none"} />
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, fontFamily: Fn, color: T.text }}>{c.name}</span>
                      <span style={{ fontSize: 9, fontFamily: Fn, color: T.textTer }}>{c.ticker}</span>
                      {held && (
                        <span style={{
                          fontSize: 7, fontWeight: 800, fontFamily: Fn, padding: "1px 5px", borderRadius: 3,
                          background: color + "20", color: color, letterSpacing: "0.05em",
                        }}>HELD</span>
                      )}
                    </div>
                    <div style={{ fontSize: 10, fontFamily: Fn, color: T.textSec, lineHeight: 1.5, marginTop: 2 }}>{c.why}</div>
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

/* ─── Sector Card ─── */
function SectorCard({ sector, T, isDark }) {
  const [openTheme, setOpenTheme] = useState(-1);

  const companyCount = sector.themes.reduce((s, t) => s + t.companies.length, 0);
  const heldNames = [];
  sector.themes.forEach(t => {
    t.companies.forEach(c => {
      if (isHeld(c.ticker) && !heldNames.find(h => h.ticker === c.ticker)) {
        heldNames.push(c);
      }
    });
  });

  const hasWeight = sector.weight > 0;

  return (
    <Card T={T} style={{
      borderTop: `3px solid ${sector.color}`,
      padding: 0, overflow: "hidden",
      transition: "box-shadow 0.2s",
    }}>
      {/* Card header */}
      <div style={{ padding: "16px 18px 0" }}>
        {/* Title row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, fontFamily: Fn, color: T.text, letterSpacing: "-0.02em" }}>
              {sector.name}
            </div>
            <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, marginTop: 2, fontFeatureSettings: '"tnum"' }}>
              {sector.themes.length} themes · {companyCount} companies · {heldNames.length} held
            </div>
          </div>
          {hasWeight ? (
            <div style={{
              fontSize: 20, fontWeight: 800, fontFamily: Fn, color: sector.color,
              lineHeight: 1, letterSpacing: "-0.03em",
              fontFeatureSettings: '"tnum"',
            }}>
              {sector.weight}%
            </div>
          ) : (
            <div style={{
              fontSize: 9, fontWeight: 700, fontFamily: Fn, color: T.textTer,
              padding: "3px 8px", borderRadius: 4, background: T.pillBg,
              letterSpacing: "0.03em",
            }}>
              WATCHLIST
            </div>
          )}
        </div>

        {/* Held company chips */}
        {heldNames.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>
            {heldNames.map((c) => (
              <CompanyChip
                key={c.ticker}
                ticker={c.ticker}
                name={c.name}
                color={sector.color}
                T={T}
                isDark={isDark}
              />
            ))}
          </div>
        )}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: T.border, margin: "0 18px" }} />

      {/* Theme rows */}
      <div style={{ padding: "8px 10px 10px" }}>
        {sector.themes.map((theme, i) => (
          <ThemeRow
            key={i}
            theme={theme}
            color={sector.color}
            isOpen={openTheme === i}
            onClick={() => setOpenTheme(openTheme === i ? -1 : i)}
            T={T}
            isDark={isDark}
          />
        ))}
      </div>
    </Card>
  );
}

/* ─── Main Export ─── */
export default function ThematicCards({ T }) {
  const isDark = T.bg !== "#F8F9FC";
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const c = () => setMobile(window.innerWidth < 768);
    c(); window.addEventListener("resize", c);
    return () => window.removeEventListener("resize", c);
  }, []);

  const totalThemes = sectors.reduce((s, sec) => s + sec.themes.length, 0);
  const totalCos = sectors.reduce((s, sec) => s + sec.themes.reduce((s2, t) => s2 + t.companies.length, 0), 0);

  return (
    <div>
      {/* Macro Forces */}
      {mobile ? <MacroBannerMobile T={T} /> : <MacroBanner T={T} isDark={isDark} />}

      {/* Sector Cards Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
        gap: 14,
        alignItems: "start",
      }}>
        {sectors.map((sec) => (
          <SectorCard key={sec.id} sector={sec} T={T} isDark={isDark} />
        ))}
      </div>

      {/* Footer */}
      <div style={{
        fontSize: 10, color: T.textTer, fontFamily: Fn, textAlign: "center",
        marginTop: 24, padding: "12px 0", borderTop: `1px solid ${T.border}`,
      }}>
        Cape Capital AG · Thematic Universe · {totalThemes} themes · ~{totalCos} companies · March 2026
      </div>
    </div>
  );
}
