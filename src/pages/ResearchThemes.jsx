import { useState, useRef, useEffect, useMemo } from "react";
import { Fn } from "../theme";
import { Pill } from "../components/shared";
import { useMobile } from "../hooks/useMobile";
import { themes, structuralForces, regulatoryTimeline } from "../data/research-themes";

/* ═══════════════════════ HELPERS ═══════════════════════ */
const fmt = (n) => {
  if (n >= 100) return `$${Math.round(n)}B`;
  if (n >= 10) return `$${n.toFixed(1)}B`;
  return `$${n.toFixed(2)}B`;
};

const allCompanies = (() => {
  const map = new Map();
  themes.forEach(t => t.companies.forEach(c => {
    const key = c.ticker;
    if (!map.has(key)) map.set(key, { ...c, themeIds: [t.id], themeNames: [t.title] });
    else { map.get(key).themeIds.push(t.id); map.get(key).themeNames.push(t.title); }
  }));
  return Array.from(map.values()).sort((a, b) => b.themeIds.length - a.themeIds.length);
})();

/* ═══════════════════════ ANIMATED BAR ═══════════════════════ */
function AnimBar({ value, max, color, delay = 0, T }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setWidth((value / max) * 100), delay); obs.disconnect(); }
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value, max, delay]);
  return (
    <div ref={ref} style={{ height: 24, borderRadius: 6, background: T.pillBg, overflow: "hidden", position: "relative" }}>
      <div style={{
        height: "100%", borderRadius: 6, background: `linear-gradient(90deg, ${color}, ${color}cc)`,
        width: `${width}%`, transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)", minWidth: width > 0 ? 2 : 0,
      }} />
    </div>
  );
}

/* ═══════════════════════ COUNTER ═══════════════════════ */
function AnimCount({ target, suffix = "", T, color, style: xs }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = performance.now();
        const go = (now) => {
          const p = Math.min((now - t0) / 1000, 1);
          setVal(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(go);
        };
        requestAnimationFrame(go);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref} style={{ color: color || T.text, fontFamily: Fn, fontVariantNumeric: "tabular-nums", ...xs }}>{val.toFixed(target < 10 ? 1 : 0)}{suffix}</span>;
}

/* ═══════════════════════ MARKET SIZE CHART ═══════════════════════ */
function MarketSizeChart({ T, mobile, onThemeClick }) {
  const [showFuture, setShowFuture] = useState(false);
  const sorted = useMemo(() => [...themes].sort((a, b) => {
    const aV = showFuture ? a.marketSize2032 : a.marketSize2025;
    const bV = showFuture ? b.marketSize2032 : b.marketSize2025;
    return bV - aV;
  }), [showFuture]);
  const maxVal = Math.max(...sorted.map(t => showFuture ? t.marketSize2032 : t.marketSize2025));

  return (
    <div style={{ background: T.card, borderRadius: T.radius, boxShadow: T.shadow, padding: mobile ? "20px 16px" : "28px 32px", marginBottom: 24 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 600, color: T.text, fontFamily: Fn }}>Addressable Market Size</div>
          <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginTop: 2 }}>{showFuture ? "Projected 2030–2035 TAM" : "Current 2025 TAM"}</div>
        </div>
        <div style={{ display: "flex", borderRadius: T.radiusSm, overflow: "hidden", border: `1px solid ${T.border}` }}>
          {["2025 (Now)", "2030–35"].map((label, i) => (
            <button key={i} onClick={() => setShowFuture(i === 1)} style={{
              padding: "6px 14px", fontSize: 11, fontFamily: Fn, border: "none", cursor: "pointer",
              background: (i === 0 ? !showFuture : showFuture) ? T.text : "transparent",
              color: (i === 0 ? !showFuture : showFuture) ? T.bg : T.textSec,
              fontWeight: (i === 0 ? !showFuture : showFuture) ? 600 : 400,
              transition: "all 0.2s",
            }}>{label}</button>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {sorted.map((t, i) => {
          const val = showFuture ? t.marketSize2032 : t.marketSize2025;
          return (
            <div key={t.id} onClick={() => onThemeClick(t.id)} style={{ cursor: "pointer", display: "grid", gridTemplateColumns: mobile ? "100px 1fr 50px" : "180px 1fr 70px", alignItems: "center", gap: mobile ? 8 : 12 }}>
              <div style={{ fontSize: mobile ? 10 : 11, color: T.textSec, fontFamily: Fn, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 14 }}>{t.icon}</span>
                <span>{mobile ? t.title.split(" ").slice(0, 2).join(" ") : t.title}</span>
              </div>
              <AnimBar value={val} max={maxVal} color={t.color} delay={i * 60} T={T} />
              <div style={{ fontSize: 12, fontWeight: 600, color: t.color, fontFamily: Fn, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                {fmt(val)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════ STRUCTURAL FORCES VIZ ═══════════════════════ */
function StructuralForcesMap({ T, mobile, onThemeClick }) {
  return (
    <div style={{ background: T.card, borderRadius: T.radius, boxShadow: T.shadow, padding: mobile ? "20px 16px" : "28px 32px", marginBottom: 24 }}>
      <div style={{ fontSize: 16, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>Three Structural Forces</div>
      <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 20 }}>How the ten themes connect through irreversible macro drivers</div>
      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)", gap: 16 }}>
        {structuralForces.map(f => (
          <div key={f.name} style={{ borderRadius: T.radiusSm, border: `1px solid ${f.color}22`, padding: 20, background: `${f.color}06` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: f.color, flexShrink: 0 }} />
              <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn }}>{f.name}</div>
            </div>
            <div style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.5, marginBottom: 14 }}>{f.description}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {f.themeIds.map(id => {
                const t = themes.find(x => x.id === id);
                return (
                  <button key={id} onClick={() => onThemeClick(id)} style={{
                    padding: "4px 10px", borderRadius: 20, border: `1px solid ${t.color}33`,
                    background: t.colorLight, fontSize: 10, fontFamily: Fn, color: t.color,
                    cursor: "pointer", fontWeight: 500, display: "flex", alignItems: "center", gap: 4,
                  }}>
                    <span>{t.icon}</span> {t.title}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════ REGULATORY TIMELINE ═══════════════════════ */
function Timeline({ T, mobile, onThemeClick }) {
  return (
    <div style={{ background: T.card, borderRadius: T.radius, boxShadow: T.shadow, padding: mobile ? "20px 16px" : "28px 32px", marginBottom: 24 }}>
      <div style={{ fontSize: 16, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>Regulatory Catalyst Timeline</div>
      <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 20 }}>Binding deadlines creating non-discretionary demand</div>
      <div style={{ position: "relative", paddingLeft: mobile ? 20 : 28 }}>
        {/* Vertical line */}
        <div style={{ position: "absolute", left: mobile ? 6 : 10, top: 4, bottom: 4, width: 2, background: `linear-gradient(180deg, ${T.border}, ${T.textTer}44, ${T.border})`, borderRadius: 1 }} />
        {regulatoryTimeline.map((evt, i) => {
          const theme = themes.find(t => t.id === evt.themeId);
          return (
            <div key={i} onClick={() => onThemeClick(evt.themeId)} style={{ position: "relative", marginBottom: 18, cursor: "pointer", paddingLeft: mobile ? 16 : 20 }}>
              {/* Dot */}
              <div style={{ position: "absolute", left: mobile ? -18 : -22, top: 5, width: 12, height: 12, borderRadius: "50%", background: theme.color, border: `2px solid ${T.card}`, boxShadow: `0 0 0 2px ${theme.color}44` }} />
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: theme.color, fontFamily: Fn, minWidth: mobile ? 70 : 90, fontVariantNumeric: "tabular-nums" }}>{evt.date}</span>
                <span style={{ fontSize: 12, color: T.text, fontFamily: Fn, lineHeight: 1.5 }}>{evt.event}</span>
                <Pill T={T} color={theme.color} bg={theme.colorLight}>{theme.title}</Pill>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════ COMPANY CARD ═══════════════════════ */
function CompanyRow({ c, T, mobile }) {
  const multi = c.themeIds.length > 1;
  return (
    <div style={{
      padding: mobile ? "12px 14px" : "14px 18px", borderRadius: T.radiusSm,
      background: multi ? `${themes.find(t => t.id === c.themeIds[0]).color}06` : "transparent",
      border: `1px solid ${multi ? themes.find(t => t.id === c.themeIds[0]).color + "18" : T.border}`,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn }}>{c.name}</span>
          <span style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, letterSpacing: "0.03em" }}>{c.ticker}</span>
        </div>
        <span style={{ fontSize: 11, color: T.textSec, fontFamily: Fn }}>{c.cap}</span>
      </div>
      <div style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, marginBottom: 6 }}>{c.exposure}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {c.themeNames.map((n, i) => {
          const th = themes.find(t => t.id === c.themeIds[i]);
          return <span key={i} style={{ fontSize: 9, padding: "2px 8px", borderRadius: 10, background: th.colorLight, color: th.color, fontFamily: Fn, fontWeight: 500 }}>{th.icon} {n}</span>;
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════ CROSS-THEME COMPANIES ═══════════════════════ */
function CrossThemeCompanies({ T, mobile }) {
  const multi = allCompanies.filter(c => c.themeIds.length > 1);
  if (multi.length === 0) return null;
  return (
    <div style={{ background: T.card, borderRadius: T.radius, boxShadow: T.shadow, padding: mobile ? "20px 16px" : "28px 32px", marginBottom: 24 }}>
      <div style={{ fontSize: 16, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>Multi-Theme Companies</div>
      <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 16 }}>Companies appearing across multiple investable themes — potential compounding exposure</div>
      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)", gap: 10 }}>
        {multi.map(c => <CompanyRow key={c.ticker} c={c} T={T} mobile={mobile} />)}
      </div>
    </div>
  );
}

/* ═══════════════════════ THEME DETAIL CARD ═══════════════════════ */
function ThemeCard({ theme: t, T, mobile, expanded, onToggle }) {
  const [companyExpanded, setCompanyExpanded] = useState(false);

  return (
    <div style={{
      background: T.card, borderRadius: T.radius, boxShadow: T.shadow,
      borderLeft: `4px solid ${t.color}`, overflow: "hidden",
      transition: "all 0.25s ease",
    }}>
      {/* Header — always visible */}
      <div
        onClick={onToggle}
        style={{ padding: mobile ? "18px 16px" : "24px 28px", cursor: "pointer" }}
        onMouseEnter={e => { if (!expanded) e.currentTarget.style.background = T.rowHover; }}
        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 22 }}>{t.icon}</span>
              <span style={{ fontSize: mobile ? 16 : 18, fontWeight: 300, color: T.text, fontFamily: Fn, letterSpacing: "-0.02em" }}>
                {t.title}
              </span>
              <Pill T={T} color={t.color} bg={t.colorLight}>{t.driverTag}</Pill>
            </div>
            <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.5 }}>{t.subtitle}</div>
          </div>
          <div style={{
            width: 28, height: 28, borderRadius: "50%", border: `1px solid ${T.border}`,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            fontSize: 14, color: T.textTer, transition: "transform 0.3s",
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
          }}>▾</div>
        </div>

        {/* Key stats strip */}
        <div style={{ display: "flex", gap: mobile ? 16 : 28, marginTop: 14, flexWrap: "wrap" }}>
          {[
            { l: "TAM (2025)", v: fmt(t.marketSize2025) },
            { l: "TAM (Projected)", v: fmt(t.marketSize2032) },
            { l: "CAGR", v: `${t.cagr}%` },
            { l: "Companies", v: t.companies.length },
            { l: "Driver", v: t.driver },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: 14, fontWeight: 600, color: i === 2 ? t.color : T.text, fontFamily: Fn, fontVariantNumeric: "tabular-nums" }}>{s.v}</div>
              <div style={{ fontSize: 9, color: T.textTer, fontFamily: Fn, letterSpacing: "0.05em", marginTop: 2, textTransform: "uppercase" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div style={{
          padding: mobile ? "0 16px 20px" : "0 28px 28px",
          animation: "fadeSlideIn 0.3s ease",
        }}>
          {/* Key fact callout */}
          <div style={{
            padding: mobile ? "14px 16px" : "16px 20px", borderRadius: T.radiusSm,
            background: t.colorLight, borderLeft: `3px solid ${t.color}`,
            marginBottom: 20,
          }}>
            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.1em", color: t.color, fontFamily: Fn, marginBottom: 6, textTransform: "uppercase" }}>Key Fact</div>
            <div style={{ fontSize: 12, color: T.text, fontFamily: Fn, lineHeight: 1.65 }}>{t.keyFact}</div>
          </div>

          {/* Narrative */}
          <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, marginBottom: 20 }}>{t.narrative}</div>

          {/* Information asymmetry */}
          <div style={{
            padding: mobile ? "14px 16px" : "16px 20px", borderRadius: T.radiusSm,
            background: T.pillBg, border: `1px solid ${T.border}`, marginBottom: 20,
          }}>
            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.1em", color: T.textTer, fontFamily: Fn, marginBottom: 6, textTransform: "uppercase" }}>
              🔍 Information Asymmetry
            </div>
            <div style={{ fontSize: 12, color: T.text, fontFamily: Fn, lineHeight: 1.65, fontStyle: "italic" }}>{t.informationAsymmetry}</div>
          </div>

          {/* Companies */}
          <div style={{ marginBottom: 20 }}>
            <div
              onClick={() => setCompanyExpanded(!companyExpanded)}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", marginBottom: 12 }}
            >
              <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn }}>Investable Companies ({t.companies.length})</div>
              <span style={{ fontSize: 11, color: t.color, fontFamily: Fn }}>{companyExpanded ? "Collapse" : "Expand"} →</span>
            </div>

            {/* Company chips (always visible) */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: companyExpanded ? 12 : 0 }}>
              {t.companies.map(c => (
                <div key={c.ticker} style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "5px 12px",
                  borderRadius: 20, border: `1px solid ${T.border}`, background: T.bg,
                  fontSize: 11, fontFamily: Fn,
                }}>
                  <span style={{ fontWeight: 600, color: T.text }}>{c.ticker}</span>
                  <span style={{ color: T.textTer }}>·</span>
                  <span style={{ color: T.textSec }}>{c.cap}</span>
                  {c.exposure.includes("Pure") && <span style={{ color: t.color, fontSize: 9, fontWeight: 600 }}>★</span>}
                </div>
              ))}
            </div>

            {/* Expanded company details */}
            {companyExpanded && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, animation: "fadeSlideIn 0.25s ease" }}>
                {t.companies.map(c => (
                  <div key={c.ticker} style={{
                    padding: "12px 16px", borderRadius: T.radiusSm, border: `1px solid ${T.border}`,
                    background: c.exposure.includes("Pure") ? t.colorLight : "transparent",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: Fn }}>{c.name}</span>
                        <span style={{ fontSize: 10, color: T.textTer, fontFamily: Fn }}>{c.ticker}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 10, color: T.textSec, fontFamily: Fn }}>{c.cap}</span>
                        <Pill T={T} color={c.exposure.includes("Pure") ? t.color : T.textSec} bg={c.exposure.includes("Pure") ? t.colorLight : T.pillBg}>
                          {c.exposure}
                        </Pill>
                      </div>
                    </div>
                    <div style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.6 }}>{c.note}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Catalysts */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 10 }}>Catalysts</div>
            {t.catalysts.map((cat, i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 8, alignItems: "baseline" }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: t.color, fontFamily: Fn, minWidth: mobile ? 70 : 90, fontVariantNumeric: "tabular-nums", flexShrink: 0 }}>{cat.date}</span>
                <span style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.5 }}>{cat.event}</span>
              </div>
            ))}
          </div>

          {/* Bear case */}
          <div style={{
            padding: "14px 18px", borderRadius: T.radiusSm,
            background: T.redBg, border: `1px solid ${T.capRed}18`,
          }}>
            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.1em", color: T.capRed, fontFamily: Fn, marginBottom: 6, textTransform: "uppercase" }}>
              🐻 Bear Case
            </div>
            <div style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.65 }}>{t.bearCase}</div>
          </div>

          {/* Connected themes */}
          {t.connectedThemes.length > 0 && (
            <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 10, color: T.textTer, fontFamily: Fn }}>Connected:</span>
              {t.connectedThemes.map(id => {
                const linked = themes.find(x => x.id === id);
                return (
                  <span key={id} style={{
                    fontSize: 10, padding: "3px 10px", borderRadius: 12, background: linked.colorLight,
                    color: linked.color, fontFamily: Fn, fontWeight: 500,
                  }}>{linked.icon} {linked.title}</span>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════ DRIVER FILTER BAR ═══════════════════════ */
function DriverFilter({ active, onChange, T, mobile }) {
  const drivers = ["All", "AI Infrastructure", "Regulatory", "Healthcare", "Mandatory"];
  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
      {drivers.map(d => (
        <button key={d} onClick={() => onChange(d)} style={{
          padding: "6px 14px", borderRadius: 20, border: `1px solid ${active === d ? T.text : T.border}`,
          background: active === d ? T.text : "transparent",
          color: active === d ? T.bg : T.textSec,
          fontSize: 11, fontFamily: Fn, cursor: "pointer", fontWeight: active === d ? 600 : 400,
          transition: "all 0.2s",
        }}>{d}{d !== "All" ? ` (${themes.filter(t => d === "All" || t.driver === d).length})` : ""}</button>
      ))}
    </div>
  );
}

/* ═══════════════════════ HEADLINE STATS ═══════════════════════ */
function HeadlineStats({ T, mobile }) {
  const totalTAM2025 = themes.reduce((s, t) => s + t.marketSize2025, 0);
  const totalTAM2032 = themes.reduce((s, t) => s + t.marketSize2032, 0);
  const avgCAGR = themes.reduce((s, t) => s + t.cagr, 0) / themes.length;
  const totalCos = allCompanies.length;

  const stats = [
    { l: "Themes", v: "10", color: T.text },
    { l: "Aggregate TAM (2025)", v: fmt(totalTAM2025), color: T.deepBlue },
    { l: "Aggregate TAM (Projected)", v: fmt(totalTAM2032), color: T.green },
    { l: "Avg. CAGR", v: `${avgCAGR.toFixed(1)}%`, color: T.orange },
    { l: "Unique Companies", v: `${totalCos}`, color: T.purple },
  ];

  return (
    <div style={{
      display: "grid", gridTemplateColumns: mobile ? "repeat(2, 1fr)" : `repeat(${stats.length}, 1fr)`,
      gap: 12, marginBottom: 24,
    }}>
      {stats.map((s, i) => (
        <div key={i} style={{
          background: T.card, borderRadius: T.radiusSm, boxShadow: T.shadow,
          padding: mobile ? "14px 14px" : "18px 20px",
          gridColumn: (!mobile || i < 4) ? undefined : "1 / -1",
        }}>
          <div style={{ fontSize: mobile ? 18 : 22, fontWeight: 300, color: s.color, fontFamily: Fn, letterSpacing: "-0.02em" }}>{s.v}</div>
          <div style={{ fontSize: 9, color: T.textTer, fontFamily: Fn, letterSpacing: "0.06em", marginTop: 4, textTransform: "uppercase" }}>{s.l}</div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════ CAGR SCATTER ═══════════════════════ */
function CagrScatter({ T, mobile, onThemeClick }) {
  const maxTam = Math.max(...themes.map(t => t.marketSize2032));
  const maxCagr = Math.max(...themes.map(t => t.cagr));
  const chartH = mobile ? 200 : 260;
  const chartW = "100%";
  const pad = { l: 44, r: 16, t: 16, b: 32 };

  return (
    <div style={{ background: T.card, borderRadius: T.radius, boxShadow: T.shadow, padding: mobile ? "20px 16px" : "28px 32px", marginBottom: 24 }}>
      <div style={{ fontSize: 16, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>Growth × Opportunity Matrix</div>
      <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 16 }}>CAGR vs. projected market size — bubble size reflects 2025 TAM</div>
      <div style={{ position: "relative", height: chartH, width: chartW }}>
        {/* Y-axis label */}
        <div style={{ position: "absolute", left: 0, top: "50%", transform: "rotate(-90deg) translateX(-50%)", transformOrigin: "0 0", fontSize: 9, color: T.textTer, fontFamily: Fn }}>CAGR %</div>
        {/* X-axis label */}
        <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", fontSize: 9, color: T.textTer, fontFamily: Fn }}>Projected TAM →</div>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map(p => (
          <div key={p} style={{ position: "absolute", left: pad.l, right: pad.r, bottom: pad.b + p * (chartH - pad.t - pad.b), height: 1, background: T.border }} />
        ))}
        {/* Bubbles */}
        {themes.map(t => {
          const x = pad.l + ((t.marketSize2032 / maxTam) * 0.85) * (100 - ((pad.l + pad.r) / 3));
          const y = chartH - pad.b - ((t.cagr / (maxCagr * 1.15)) * (chartH - pad.t - pad.b));
          const r = Math.max(10, Math.sqrt(t.marketSize2025) * (mobile ? 6 : 8));
          return (
            <div key={t.id}
              onClick={() => onThemeClick(t.id)}
              style={{
                position: "absolute", left: `${(t.marketSize2032 / maxTam * 82) + 8}%`,
                top: y, width: r * 2, height: r * 2, borderRadius: "50%",
                background: `${t.color}33`, border: `2px solid ${t.color}`,
                transform: "translate(-50%, -50%)", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s", zIndex: 1,
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translate(-50%, -50%) scale(1.15)"; e.currentTarget.style.zIndex = 10; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translate(-50%, -50%) scale(1)"; e.currentTarget.style.zIndex = 1; }}
              title={`${t.title}\nCAGR: ${t.cagr}%\nTAM: ${fmt(t.marketSize2032)}`}
            >
              <span style={{ fontSize: mobile ? 10 : 12 }}>{t.icon}</span>
            </div>
          );
        })}
      </div>
      {/* Legend */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12, justifyContent: "center" }}>
        {themes.map(t => (
          <span key={t.id} onClick={() => onThemeClick(t.id)} style={{
            fontSize: 9, color: T.textSec, fontFamily: Fn, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 4,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: t.color, display: "inline-block" }} />
            {t.title}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════ MAIN PAGE ═══════════════════════ */
export default function ResearchThemes({ T }) {
  const mobile = useMobile();
  const [expandedId, setExpandedId] = useState(null);
  const [driverFilter, setDriverFilter] = useState("All");
  const cardRefs = useRef({});

  const filteredThemes = driverFilter === "All" ? themes : themes.filter(t => t.driver === driverFilter);

  const scrollToTheme = (id) => {
    setExpandedId(prev => prev === id ? null : id);
    // If filtering hides the theme, reset filter
    const theme = themes.find(t => t.id === id);
    if (theme && driverFilter !== "All" && theme.driver !== driverFilter) setDriverFilter("All");
    setTimeout(() => {
      const el = cardRefs.current[id];
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
          <h1 style={{ fontFamily: Fn, fontSize: mobile ? 22 : 28, fontWeight: 300, letterSpacing: "-0.03em", color: T.text, margin: 0 }}>
            Ten Obscure Investable Themes
          </h1>
          <Pill T={T} color={T.capRed} bg={T.redBg}>March 2026</Pill>
        </div>
        <p style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, margin: 0, maxWidth: 800 }}>
          The deepest structural mispricings in public equities sit at the intersection of forced capital expenditure and zero sell-side coverage. These ten themes supply critical infrastructure or solve bottleneck problems for well-known megatrends — but are buried within conglomerates, covered by the wrong analyst teams, or simply too small for large sell-side desks to prioritise.
        </p>
      </div>

      {/* Headline stats */}
      <HeadlineStats T={T} mobile={mobile} />

      {/* Market size chart */}
      <MarketSizeChart T={T} mobile={mobile} onThemeClick={scrollToTheme} />

      {/* Growth × Opportunity scatter */}
      <CagrScatter T={T} mobile={mobile} onThemeClick={scrollToTheme} />

      {/* Structural forces */}
      <StructuralForcesMap T={T} mobile={mobile} onThemeClick={scrollToTheme} />

      {/* Regulatory timeline */}
      <Timeline T={T} mobile={mobile} onThemeClick={scrollToTheme} />

      {/* Cross-theme companies */}
      <CrossThemeCompanies T={T} mobile={mobile} />

      {/* Theme cards */}
      <div style={{ marginTop: 8, marginBottom: 8 }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>Theme Deep Dives</div>
        <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 16 }}>Click any theme to expand the full analysis, companies, catalysts, and bear case</div>
        <DriverFilter active={driverFilter} onChange={setDriverFilter} T={T} mobile={mobile} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filteredThemes.map(t => (
          <div key={t.id} ref={el => { cardRefs.current[t.id] = el; }}>
            <ThemeCard
              theme={t} T={T} mobile={mobile}
              expanded={expandedId === t.id}
              onToggle={() => setExpandedId(prev => prev === t.id ? null : t.id)}
            />
          </div>
        ))}
      </div>

      {/* Footer thesis */}
      <div style={{
        marginTop: 32, padding: mobile ? "20px 16px" : "28px 32px",
        background: T.card, borderRadius: T.radius, boxShadow: T.shadow,
        borderTop: `3px solid ${T.capRed}`,
      }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 10 }}>Where the Deepest Asymmetries Lie</div>
        <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, maxWidth: 800 }}>
          The most actionable pattern across all ten themes is that the enabling infrastructure behind consensus megatrends remains deeply mispriced because it falls between traditional analyst coverage silos — semiconductor analysts don't cover water, maritime analysts don't cover electrical infrastructure, and healthcare analysts covering radiopharmaceuticals rarely model upstream isotope supply constraints. This structural gap in coverage is itself the source of alpha.
        </div>
      </div>
    </div>
  );
}
