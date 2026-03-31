import { useState, useRef, useEffect, useMemo } from "react";
import { Fn } from "../theme";
import { Pill } from "../components/shared";
import { useMobile } from "../hooks/useMobile";
import {
  sectors, macrodynamics, superThemes, multiVectorCompounders,
  illustrativePortfolio, geoBreakdown, logoUrl,
} from "../data/research-thematic-map";

/* ═══════════════════════ HELPERS ═══════════════════════ */
function findCompany(ticker) {
  for (const s of sectors) for (const t of s.themes) {
    const f = t.companies.find(c => c.ticker === ticker);
    if (f) return { ...f, sector: s };
  }
  return null;
}
function findCompanySector(ticker) {
  for (const s of sectors) for (const t of s.themes)
    if (t.companies.find(c => c.ticker === ticker)) return s;
  return null;
}
function getAllCompanies() {
  const map = new Map();
  sectors.forEach(s => s.themes.forEach(t => t.companies.forEach(c => {
    if (!map.has(c.ticker)) {
      let tc = 0;
      sectors.forEach(s2 => s2.themes.forEach(t2 => { if (t2.companies.find(x => x.ticker === c.ticker)) tc++; }));
      map.set(c.ticker, { ...c, sector: s, themeCount: tc });
    }
  })));
  return Array.from(map.values());
}

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

/* ═══════════════════════ ANIMATED COUNTER ═══════════════════════ */
function AnimCounter({ target, prefix = "", color, T }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const num = parseInt(String(target).replace(/\D/g, "")) || 0;
        const t0 = performance.now();
        const go = (now) => {
          const p = Math.min((now - t0) / 1200, 1);
          setVal(Math.round(num * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(go);
        };
        requestAnimationFrame(go);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref} style={{ fontSize: 28, fontWeight: 300, color, fontFamily: Fn, fontVariantNumeric: "tabular-nums" }}>{prefix}{val}</span>;
}

/* ═══════════════════════ SEARCH BAR ═══════════════════════ */
function SearchBar({ value, onChange, T, isMobile }) {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: isMobile ? "100%" : 360 }}>
      <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: T.textTer, pointerEvents: "none" }}>⌕</span>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder="Search companies, tickers, themes…"
        style={{ width: "100%", padding: "10px 14px 10px 36px", borderRadius: T.radius, border: `1px solid ${T.border}`, background: T.card, color: T.text, fontFamily: Fn, fontSize: 13, outline: "none", boxSizing: "border-box", transition: "border-color 0.2s, box-shadow 0.2s" }}
        onFocus={e => { e.target.style.borderColor = T.purple; e.target.style.boxShadow = `0 0 0 3px ${T.purple}18`; }}
        onBlur={e => { e.target.style.borderColor = T.border; e.target.style.boxShadow = "none"; }}
      />
    </div>
  );
}

/* ═══════════════════════ FILTER PILLS ═══════════════════════ */
function FilterPills({ active, onChange, T }) {
  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
      {[{ id: "all", l: "All" }, { id: "secular", l: "Secular" }, { id: "cyclical", l: "Cyclical" }, { id: "both", l: "Secular + Cyclical" }].map(o => (
        <button key={o.id} onClick={() => onChange(o.id)} style={{ padding: "6px 14px", borderRadius: 20, fontSize: 11, fontWeight: 600, fontFamily: Fn, cursor: "pointer", transition: "all 0.2s", background: active === o.id ? T.purple + "18" : T.pillBg, border: `1px solid ${active === o.id ? T.purple + "50" : T.border}`, color: active === o.id ? T.purple : T.textSec }}>
          {o.l}
        </button>
      ))}
    </div>
  );
}

/* ═══════════════════════ MACRODYNAMICS HERO ═══════════════════════ */
function MacrodynamicsHero({ T, isMobile }) {
  const [hov, setHov] = useState(null);
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: T.textTer, fontFamily: Fn, marginBottom: 12, textTransform: "uppercase" }}>Three Macrodynamics Driving All Sectors</div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 14 }}>
        {macrodynamics.map((m, i) => (
          <div key={m.id} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
            style={{ background: hov === i ? `${m.color}11` : T.card, border: `1px solid ${hov === i ? m.color + "40" : T.border}`, borderRadius: T.radius, padding: isMobile ? 20 : 24, transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)", transform: hov === i ? "translateY(-6px) scale(1.01)" : "translateY(0)", boxShadow: hov === i ? `0 12px 40px ${m.color}20` : T.shadow, cursor: "default", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${m.color}, transparent)`, opacity: hov === i ? 1 : 0, transition: "opacity 0.4s" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `${m.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, transition: "transform 0.3s", transform: hov === i ? "scale(1.15) rotate(5deg)" : "scale(1)" }}>{m.icon}</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn }}>{m.title}</div>
                <div style={{ fontSize: 11, color: m.color, fontFamily: Fn, fontWeight: 600 }}>Touches {m.sectors} of 10 sectors</div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7 }}>{m.desc}</div>
            <div style={{ display: "flex", gap: 3, marginTop: 12 }}>
              {Array.from({ length: 10 }).map((_, j) => (
                <div key={j} style={{ width: 6, height: 6, borderRadius: 3, background: j < m.sectors ? m.color : T.border, transition: "all 0.3s", transitionDelay: `${j * 30}ms`, opacity: hov === i ? 1 : 0.5 }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════ SECTOR DONUT ═══════════════════════ */
function SectorDonut({ T, isMobile, activeSector, onSectorClick }) {
  const [hov, setHov] = useState(null);
  const total = sectors.reduce((a, s) => a + s.weight, 0);
  const size = isMobile ? 220 : 280;
  const cx = size / 2, cy = size / 2, outerR = size / 2 - 8, innerR = outerR * 0.62;
  let cumAngle = -Math.PI / 2;
  const arcs = sectors.map(s => { const a = (s.weight / total) * Math.PI * 2; const sa = cumAngle; cumAngle += a; return { ...s, sa, ea: cumAngle, ma: (sa + cumAngle) / 2 }; });
  function arcPath(sa, ea, r1, r2) {
    const x1 = cx + Math.cos(sa) * r2, y1 = cy + Math.sin(sa) * r2, x2 = cx + Math.cos(ea) * r2, y2 = cy + Math.sin(ea) * r2;
    const x3 = cx + Math.cos(ea) * r1, y3 = cy + Math.sin(ea) * r1, x4 = cx + Math.cos(sa) * r1, y4 = cy + Math.sin(sa) * r1;
    return `M${x1},${y1} A${r2},${r2} 0 ${ea - sa > Math.PI ? 1 : 0},1 ${x2},${y2} L${x3},${y3} A${r1},${r1} 0 ${ea - sa > Math.PI ? 1 : 0},0 ${x4},${y4} Z`;
  }
  const activeArc = hov !== null ? arcs[hov] : (activeSector ? arcs.find(a => a.id === activeSector) : null);

  return (
    <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 24, alignItems: "center", marginBottom: 36 }}>
      <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
        <svg viewBox={`0 0 ${size} ${size}`} style={{ width: size, height: size }}>
          {arcs.map((a, i) => {
            const isA = activeSector === a.id || hov === i;
            const dim = activeSector && activeSector !== a.id && hov === null;
            return <path key={a.id} d={arcPath(a.sa + 0.008, a.ea - 0.008, innerR, outerR + (isA ? 8 : 0))} fill={a.color} opacity={dim ? 0.25 : isA ? 1 : 0.75} stroke={T.bg} strokeWidth="1.5" onClick={() => onSectorClick(a.id)} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} style={{ cursor: "pointer", transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)" }} />;
          })}
        </svg>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", pointerEvents: "none" }}>
          {activeArc ? (<><div style={{ fontSize: 22, fontWeight: 300, color: activeArc.color, fontFamily: Fn }}>{activeArc.weight}%</div><div style={{ fontSize: 10, color: T.textSec, fontFamily: Fn, marginTop: 2 }}>{activeArc.short}</div><div style={{ fontSize: 9, color: T.textTer, fontFamily: Fn }}>{activeArc.stocks} stocks</div></>) : (<><div style={{ fontSize: 20, fontWeight: 300, color: T.text, fontFamily: Fn }}>26</div><div style={{ fontSize: 10, color: T.textSec, fontFamily: Fn }}>positions</div></>)}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 0 }}>
        {sectors.map((s, i) => {
          const isA = activeSector === s.id || hov === i;
          return (
            <div key={s.id} onClick={() => onSectorClick(s.id)} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 10px", borderRadius: T.radiusSm, cursor: "pointer", transition: "all 0.2s", background: isA ? s.color + "10" : "transparent", border: `1px solid ${isA ? s.color + "30" : "transparent"}` }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: s.color, flexShrink: 0 }} />
              <span style={{ fontSize: 12, fontWeight: isA ? 600 : 400, color: isA ? s.color : T.text, fontFamily: Fn, flex: 1 }}>{s.name}</span>
              <span style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, fontVariantNumeric: "tabular-nums" }}>{s.stocks} · {s.weight}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════ BUBBLE UNIVERSE ═══════════════════════ */
function BubbleUniverse({ T, isMobile, activeSector, onSectorClick, search, themeFilter }) {
  const [hovTicker, setHovTicker] = useState(null);
  const [selectedTicker, setSelectedTicker] = useState(null);
  const allCompanies = useMemo(() => getAllCompanies(), []);

  const filtered = useMemo(() => {
    let list = allCompanies;
    if (activeSector) list = list.filter(c => c.sector.id === activeSector);
    if (search) { const q = search.toLowerCase(); list = list.filter(c => c.ticker.toLowerCase().includes(q) || c.name.toLowerCase().includes(q) || c.why.toLowerCase().includes(q)); }
    if (themeFilter && themeFilter !== "all") {
      const ok = new Set();
      sectors.forEach(s => s.themes.forEach(t => {
        const m = themeFilter === "secular" ? t.type.includes("SECULAR") && !t.type.includes("CYCLICAL") : themeFilter === "cyclical" ? t.type.includes("CYCLICAL") && !t.type.includes("SECULAR") : t.type.includes("SECULAR") && t.type.includes("CYCLICAL");
        if (m) t.companies.forEach(c => ok.add(c.ticker));
      }));
      list = list.filter(c => ok.has(c.ticker));
    }
    return list;
  }, [allCompanies, activeSector, search, themeFilter]);

  const sectorGroups = useMemo(() => { const g = new Map(); filtered.forEach(c => { const sid = c.sector.id; if (!g.has(sid)) g.set(sid, []); g.get(sid).push(c); }); return g; }, [filtered]);
  const selected = selectedTicker ? findCompany(selectedTicker) : null;
  const sectorList = sectors.filter(s => sectorGroups.has(s.id));

  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ display: "flex", alignItems: isMobile ? "flex-start" : "center", justifyContent: "space-between", gap: 12, marginBottom: 16, flexDirection: isMobile ? "column" : "row" }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: T.textTer, fontFamily: Fn, textTransform: "uppercase" }}>
          Company Universe — {filtered.length} companies{activeSector ? ` in ${sectors.find(s => s.id === activeSector)?.name}` : ""}
        </div>
        <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn }}>Click any logo for details · Size = theme count</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : (activeSector ? "1fr" : "repeat(2, 1fr)"), gap: 12 }}>
        {sectorList.map(s => {
          const companies = sectorGroups.get(s.id) || [];
          return (
            <div key={s.id} style={{ background: T.card, borderRadius: T.radius, border: `1px solid ${activeSector === s.id ? s.color + "40" : T.border}`, padding: isMobile ? 14 : 18, boxShadow: T.shadow, transition: "all 0.3s" }}>
              <div onClick={() => onSectorClick(s.id)} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, cursor: "pointer" }}>
                <div style={{ width: 4, height: 24, borderRadius: 2, background: s.color }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: s.color, fontFamily: Fn }}>{s.short}</span>
                <span style={{ fontSize: 10, color: T.textTer, fontFamily: Fn }}>{companies.length} companies · {s.weight}%</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
                {companies.map(c => {
                  const isH = hovTicker === c.ticker, isS = selectedTicker === c.ticker;
                  const sz = Math.min(isMobile ? 42 : 52, Math.max(30, 24 + c.themeCount * 6));
                  return (
                    <div key={c.ticker} onMouseEnter={() => setHovTicker(c.ticker)} onMouseLeave={() => setHovTicker(null)} onClick={() => setSelectedTicker(isS ? null : c.ticker)}
                      style={{ position: "relative", cursor: "pointer", transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)", transform: isH ? "scale(1.2)" : isS ? "scale(1.15)" : "scale(1)", zIndex: isH || isS ? 10 : 1 }}>
                      {(isH || isS) && <div style={{ position: "absolute", inset: -4, borderRadius: "50%", border: `2px solid ${s.color}`, opacity: 0.5 }} />}
                      <Logo ticker={c.ticker} name={c.name} size={sz} T={T} style={{ boxShadow: isH ? `0 4px 16px ${s.color}30` : "none" }} />
                      {isH && !isMobile && (
                        <div style={{ position: "absolute", bottom: -18, left: "50%", transform: "translateX(-50%)", fontSize: 9, fontWeight: 700, color: s.color, fontFamily: Fn, whiteSpace: "nowrap", background: T.card, padding: "1px 5px", borderRadius: 4, border: `1px solid ${T.border}`, boxShadow: T.shadow }}>
                          {c.ticker}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {selected && (() => {
        const sec = findCompanySector(selectedTicker);
        return (
          <div style={{ marginTop: 16, background: T.card, borderRadius: T.radius, border: `1px solid ${sec?.color || T.border}40`, padding: isMobile ? 18 : 24, boxShadow: T.shadowLg, animation: "tmSlideUp 0.3s ease" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <Logo ticker={selected.ticker} name={selected.name} size={48} T={T} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 18, fontWeight: 600, color: T.text, fontFamily: Fn }}>{selected.name}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: sec?.color || T.purple, fontFamily: Fn }}>{selected.ticker}</span>
                  <span style={{ fontSize: 11, color: T.textTer, fontFamily: Fn }}>{selected.hq}</span>
                </div>
                <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, marginTop: 6 }}>{selected.why}</div>
              </div>
              <button onClick={() => setSelectedTicker(null)} style={{ background: "none", border: "none", color: T.textTer, fontSize: 18, cursor: "pointer", padding: 8, flexShrink: 0 }}>✕</button>
            </div>
          </div>
        );
      })()}

      <style>{`
        @keyframes tmSlideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

/* ═══════════════════════ THEME CONNECTIONS ═══════════════════════ */
function ThemeConnections({ T, isMobile }) {
  const [active, setActive] = useState(0);
  const st = superThemes[active];
  const connectedSectors = useMemo(() => {
    const set = new Set();
    st.companies.forEach(tk => { const sec = findCompanySector(tk); if (sec) set.add(sec.id); });
    return Array.from(set);
  }, [active]);
  const w = isMobile ? 340 : 780, h = isMobile ? 120 : 100;
  const sp = w / (sectors.length + 1);

  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: T.textTer, fontFamily: Fn, marginBottom: 12, textTransform: "uppercase" }}>Cross-Sector Super-Themes</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {superThemes.map((s, i) => (
          <button key={i} onClick={() => setActive(i)} style={{ padding: "8px 16px", borderRadius: 20, fontSize: 12, fontWeight: 600, fontFamily: Fn, cursor: "pointer", transition: "all 0.2s", background: active === i ? s.color + "18" : T.pillBg, border: `1px solid ${active === i ? s.color + "50" : T.border}`, color: active === i ? s.color : T.textSec }}>
            {s.title} ({s.sectors})
          </button>
        ))}
      </div>
      <div style={{ background: T.card, borderRadius: T.radius, border: `1px solid ${st.color}25`, padding: isMobile ? "16px 10px" : "20px 16px", boxShadow: T.shadow, overflow: "hidden" }}>
        <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: "auto", display: "block" }}>
          {connectedSectors.map((sid, i) => {
            const si = sectors.findIndex(s => s.id === sid);
            if (si === -1) return null;
            return connectedSectors.slice(i + 1).map(sid2 => {
              const si2 = sectors.findIndex(s => s.id === sid2);
              if (si2 === -1) return null;
              const x1 = (si + 1) * sp, x2 = (si2 + 1) * sp;
              return <path key={`${sid}-${sid2}`} d={`M${x1},${h - 20} Q${(x1 + x2) / 2},${h - 20 - Math.abs(x2 - x1) * 0.35} ${x2},${h - 20}`} fill="none" stroke={st.color} strokeWidth="1.5" opacity="0.25" strokeDasharray="4,3" />;
            });
          })}
          {sectors.map((s, i) => {
            const x = (i + 1) * sp, conn = connectedSectors.includes(s.id);
            return (<g key={s.id}><circle cx={x} cy={h - 20} r={conn ? 8 : 5} fill={conn ? s.color : T.pillBg} stroke={conn ? s.color : T.border} strokeWidth="1.5" opacity={conn ? 1 : 0.35} style={{ transition: "all 0.3s" }} /><text x={x} y={h - 4} textAnchor="middle" fontSize={isMobile ? 6 : 8} fontFamily={Fn} fontWeight="600" fill={conn ? s.color : T.textTer} opacity={conn ? 1 : 0.4}>{s.short}</text></g>);
          })}
        </svg>
        <p style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, margin: "12px 0" }}>{st.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {st.companies.slice(0, isMobile ? 8 : 20).map(tk => {
            const comp = findCompany(tk), sec = findCompanySector(tk);
            return (
              <div key={tk} style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 20, background: sec ? sec.color + "08" : T.pillBg, border: `1px solid ${sec ? sec.color + "20" : T.border}`, transition: "all 0.2s" }}>
                <Logo ticker={tk} name={comp?.name || tk} size={18} T={T} />
                <span style={{ fontSize: 10, fontWeight: 600, color: sec?.color || T.textSec, fontFamily: Fn }}>{tk}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════ COMPOUNDERS ═══════════════════════ */
function CompoundersSection({ T, isMobile }) {
  const [hov, setHov] = useState(null);
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: T.textTer, fontFamily: Fn, marginBottom: 12, textTransform: "uppercase" }}>Multi-Vector Compounders — Companies Spanning 3+ Themes</div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(320px, 1fr))", gap: 12 }}>
        {multiVectorCompounders.map((c, idx) => {
          const sec = findCompanySector(c.ticker), isH = hov === idx;
          return (
            <div key={c.ticker} onMouseEnter={() => setHov(idx)} onMouseLeave={() => setHov(null)}
              style={{ background: T.card, borderRadius: T.radius, border: `1px solid ${isH ? (sec?.color || T.purple) + "40" : T.border}`, padding: isMobile ? 16 : 20, boxShadow: isH ? T.shadowLg : T.shadow, transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)", transform: isH ? "translateY(-3px)" : "translateY(0)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: sec?.color || T.purple, borderRadius: "4px 0 0 4px", opacity: isH ? 1 : 0.3, transition: "opacity 0.3s" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, paddingLeft: 8 }}>
                <Logo ticker={c.ticker} name={c.name} size={40} T={T} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn }}>{c.ticker} · {c.hq}</div>
                </div>
                <div style={{ width: 30, height: 30, borderRadius: 15, background: (sec?.color || T.purple) + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: sec?.color || T.purple, fontFamily: Fn }}>{c.themes.length}</div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, paddingLeft: 8 }}>
                {c.themes.map((th, i) => <span key={i} style={{ fontSize: 10, padding: "3px 8px", borderRadius: 4, background: T.pillBg, color: T.textSec, fontFamily: Fn }}>{th}</span>)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════ SECTOR DETAIL ═══════════════════════ */
function SectorDetail({ sector, T, isMobile, themeFilter }) {
  const [exp, setExp] = useState(0);
  const filteredThemes = useMemo(() => {
    if (!themeFilter || themeFilter === "all") return sector.themes;
    return sector.themes.filter(t => {
      if (themeFilter === "secular") return t.type.includes("SECULAR") && !t.type.includes("CYCLICAL");
      if (themeFilter === "cyclical") return t.type.includes("CYCLICAL") && !t.type.includes("SECULAR");
      return t.type.includes("SECULAR") && t.type.includes("CYCLICAL");
    });
  }, [sector, themeFilter]);

  return (
    <div style={{ background: T.card, borderRadius: T.radius, border: `1px solid ${sector.color}30`, overflow: "hidden", marginBottom: 32, boxShadow: T.shadow, animation: "tmSlideUp 0.35s ease" }}>
      <div style={{ padding: isMobile ? "18px 20px" : "24px 28px", borderBottom: `1px solid ${T.border}`, background: `linear-gradient(135deg, ${sector.color}08 0%, transparent 60%)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 6, height: 36, borderRadius: 3, background: sector.color }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: isMobile ? 18 : 22, fontWeight: 300, color: T.text, fontFamily: Fn }}>{sector.name}</div>
            <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginTop: 2 }}>{sector.stocks} positions · ~{sector.weight}% · {filteredThemes.length} themes</div>
          </div>
          <div style={{ display: "flex" }}>
            {(() => { const seen = new Set(), logos = []; sector.themes.forEach(t => t.companies.forEach(c => { if (!seen.has(c.ticker) && logos.length < (isMobile ? 4 : 6)) { seen.add(c.ticker); logos.push(c); } })); return logos.map((c, i) => <Logo key={c.ticker} ticker={c.ticker} name={c.name} size={28} T={T} style={{ marginLeft: i > 0 ? -6 : 0, zIndex: logos.length - i, position: "relative" }} />); })()}
          </div>
        </div>
        <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, marginTop: 10, lineHeight: 1.6 }}>Key themes: {sector.keyThemes}</div>
      </div>

      {filteredThemes.map((theme, ti) => {
        const isOpen = exp === ti;
        return (
          <div key={ti} style={{ borderBottom: ti < filteredThemes.length - 1 ? `1px solid ${T.border}` : "none" }}>
            <div onClick={() => setExp(isOpen ? null : ti)} style={{ padding: isMobile ? "12px 20px" : "14px 28px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", background: isOpen ? `${sector.color}06` : "transparent", transition: "background 0.2s" }}>
              <div style={{ width: 22, height: 22, borderRadius: 11, background: sector.color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: sector.color, fontWeight: 700, fontFamily: Fn, flexShrink: 0 }}>{theme.companies.length}</div>
              <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn }}>{theme.name}</div></div>
              <Pill T={T} color={theme.type.includes("SECULAR") && theme.type.includes("CYCLICAL") ? T.orange : theme.type.includes("SECULAR") ? T.green : T.deepBlue} bg={theme.type.includes("SECULAR") && theme.type.includes("CYCLICAL") ? "rgba(234,88,12,0.08)" : theme.type.includes("SECULAR") ? T.greenBg : "rgba(29,78,216,0.08)"}>{theme.type}</Pill>
              <span style={{ fontSize: 16, color: T.textTer, transition: "transform 0.25s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", fontFamily: Fn, flexShrink: 0 }}>▾</span>
            </div>
            {isOpen && (
              <div style={{ padding: isMobile ? "0 20px 16px" : "0 28px 20px", animation: "tmSlideUp 0.25s ease" }}>
                <p style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 14px" }}>{theme.desc}</p>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(320px, 1fr))", gap: 10 }}>
                  {theme.companies.map(c => <CompanyCard key={c.ticker} c={c} sector={sector} T={T} isMobile={isMobile} />)}
                </div>
              </div>
            )}
          </div>
        );
      })}
      <style>{`@keyframes tmSlideUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}

/* ═══════════════════════ COMPANY CARD ═══════════════════════ */
function CompanyCard({ c, sector, T, isMobile }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "14px 16px", borderRadius: T.radiusSm, background: hov ? sector.colorBg : T.bg, border: `1px solid ${hov ? sector.color + "35" : T.border}`, transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)", transform: hov ? "translateX(3px)" : "translateX(0)" }}>
      <Logo ticker={c.ticker} name={c.name} size={36} T={T} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: sector.color, fontFamily: Fn }}>{c.ticker}</span>
          <span style={{ fontSize: 12, fontWeight: 500, color: T.text, fontFamily: Fn }}>{c.name}</span>
          <span style={{ fontSize: 9, color: T.textTer, fontFamily: Fn, marginLeft: "auto", flexShrink: 0 }}>{c.hq}</span>
        </div>
        <div style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.6, marginTop: 4 }}>{c.why}</div>
      </div>
    </div>
  );
}

/* ═══════════════════════ THEME DENSITY ═══════════════════════ */
function ThemeCountStrip({ T, isMobile, onSectorClick, activeSector }) {
  const [hov, setHov] = useState(null);
  const maxC = Math.max(...sectors.map(s => s.themes.reduce((a, t) => a + t.companies.length, 0)));
  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: T.textTer, fontFamily: Fn, marginBottom: 12, textTransform: "uppercase" }}>Theme Density by Sector</div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(5, 1fr)", gap: 8 }}>
        {sectors.map((s, i) => {
          const cc = s.themes.reduce((a, t) => a + t.companies.length, 0);
          const isA = activeSector === s.id, isH = hov === i;
          return (
            <div key={s.id} onClick={() => onSectorClick(s.id)} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
              style={{ background: isA ? `${s.color}08` : T.card, borderRadius: T.radiusSm, border: `1px solid ${isA ? s.color + "40" : T.border}`, padding: "12px 14px", cursor: "pointer", borderLeft: `3px solid ${s.color}`, transition: "all 0.25s", transform: isH ? "translateY(-2px)" : "translateY(0)", boxShadow: isH ? T.shadowLg : T.shadow }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: isA ? s.color : T.text, fontFamily: Fn }}>{s.short}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 4 }}><span style={{ fontSize: 22, fontWeight: 300, color: s.color, fontFamily: Fn }}>{s.themes.length}</span><span style={{ fontSize: 10, color: T.textTer, fontFamily: Fn }}>themes</span></div>
              <div style={{ height: 3, borderRadius: 2, background: T.pillBg, marginTop: 6 }}><div style={{ height: "100%", borderRadius: 2, background: s.color, width: `${(cc / maxC) * 100}%`, transition: "width 0.5s" }} /></div>
              <div style={{ fontSize: 9, color: T.textTer, fontFamily: Fn, marginTop: 3 }}>{cc} companies</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════ PORTFOLIO TABLE ═══════════════════════ */
function PortfolioSection({ T, isMobile }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: T.textTer, fontFamily: Fn, marginBottom: 12, textTransform: "uppercase" }}>Illustrative 26-Stock Portfolio</div>
      <div style={{ background: T.card, borderRadius: T.radius, border: `1px solid ${T.border}`, overflow: "hidden", boxShadow: T.shadow }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: Fn, fontSize: 12 }}>
            <thead><tr style={{ borderBottom: `1px solid ${T.border}` }}>{["Sector", "Position 1", "Position 2", "Position 3"].map((h, i) => <th key={i} style={{ textAlign: "left", padding: "10px 16px", fontSize: 10, fontWeight: 600, color: T.textTer, letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>)}</tr></thead>
            <tbody>
              {illustrativePortfolio.map((row, i) => (
                <tr key={i} style={{ borderBottom: i < illustrativePortfolio.length - 1 ? `1px solid ${T.border}` : "none" }}>
                  <td style={{ padding: "10px 16px", fontWeight: 600, color: T.text, whiteSpace: "nowrap" }}>{row.sector}</td>
                  {[row.s1, row.s2, row.s3].map((s, j) => (
                    <td key={j} style={{ padding: "8px 16px" }}>
                      {s ? <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Logo ticker={s.t} name={s.t} size={24} T={T} /><span style={{ fontWeight: 600, color: T.text }}>{s.t}</span><span style={{ fontSize: 10, color: T.textTer }}>({s.l})</span></div> : <span style={{ color: T.textTer }}>—</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════ GEO BREAKDOWN ═══════════════════════ */
function GeoSection({ T, isMobile }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: T.textTer, fontFamily: Fn, marginBottom: 12, textTransform: "uppercase" }}>Geographic Diversification</div>
      <div style={{ display: "flex", gap: isMobile ? 8 : 12, flexWrap: "wrap" }}>
        {geoBreakdown.map(g => (
          <div key={g.region} style={{ flex: isMobile ? "1 1 45%" : "1 1 0", background: T.card, borderRadius: T.radius, border: `1px solid ${T.border}`, padding: "18px 20px", boxShadow: T.shadow, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: T.pillBg }}><div style={{ height: "100%", background: g.color, width: g.weight.includes("55") ? "57.5%" : g.weight.includes("25") ? "27.5%" : g.weight.includes("10") ? "10%" : "7.5%", borderRadius: 2 }} /></div>
            <div style={{ fontSize: 24, fontWeight: 300, color: g.color, fontFamily: Fn }}>{g.weight}</div>
            <div style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, marginTop: 2 }}>{g.region}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════ MACRO BACKDROP ═══════════════════════ */
function MacroBackdrop({ T, isMobile }) {
  const items = [
    { icon: "🤖", l: "AI Capex", v: ">$600B/yr" }, { icon: "🛡️", l: "EU Defence", v: "+25% budgets" },
    { icon: "📉", l: "DM Rates", v: "Cuts underway" }, { icon: "🇨🇳", l: "China", v: "Stimulus mode" },
    { icon: "⛽", l: "Energy", v: "ME conflict" }, { icon: "📦", l: "Trade", v: "Tariff risk" },
  ];
  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: T.textTer, fontFamily: Fn, marginBottom: 12, textTransform: "uppercase" }}>Macro Backdrop — March 2026</div>
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, scrollbarWidth: "none" }}>
        {items.map((item, i) => (
          <div key={i} style={{ flexShrink: 0, background: T.card, borderRadius: T.radiusSm, border: `1px solid ${T.border}`, padding: "10px 16px", display: "flex", alignItems: "center", gap: 8, boxShadow: T.shadow }}>
            <span style={{ fontSize: 18 }}>{item.icon}</span>
            <div><div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn }}>{item.l}</div><div style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: Fn }}>{item.v}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════ MAIN PAGE ═══════════════════════ */
export default function ResearchThematicMap({ T }) {
  const isMobile = useMobile();
  const [activeSector, setActiveSector] = useState(null);
  const [search, setSearch] = useState("");
  const [themeFilter, setThemeFilter] = useState("all");
  const detailRef = useRef(null);
  const totalCompanies = useMemo(() => getAllCompanies().length, []);
  const totalThemes = sectors.reduce((a, s) => a + s.themes.length, 0);

  const handleSectorClick = (id) => {
    setActiveSector(prev => prev === id ? null : id);
    setTimeout(() => detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  const activeSectorData = activeSector ? sectors.find(s => s.id === activeSector) : null;

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
          <h1 style={{ fontFamily: Fn, fontSize: isMobile ? 22 : 28, fontWeight: 300, letterSpacing: "-0.03em", color: T.text, margin: 0 }}>Global Thematic Portfolio Map</h1>
          <Pill T={T} color={T.purple} bg={T.purple + "15"}>March 2026</Pill>
        </div>
        <p style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, margin: "8px 0 0", maxWidth: 720 }}>
          {totalThemes} structural themes across 10 GICS sectors mapped to ~{totalCompanies} best-in-class global companies. Built bottom-up from structural tailwinds — synthesising deep research, GICS analysis, and institutional frameworks.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 10, marginBottom: 32 }}>
        {[{ target: 56, label: "Structural Themes", color: T.purple }, { target: 10, label: "GICS Sectors", color: T.deepBlue }, { target: totalCompanies, prefix: "~", label: "Companies Mapped", color: T.green }, { target: 26, label: "Target Positions", color: T.capRed }].map((s, i) => (
          <div key={i} style={{ background: T.card, borderRadius: T.radiusSm, border: `1px solid ${T.border}`, padding: "14px 18px", boxShadow: T.shadow }}>
            <AnimCounter target={s.target} prefix={s.prefix || ""} color={s.color} T={T} />
            <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 2, letterSpacing: "0.03em" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <MacrodynamicsHero T={T} isMobile={isMobile} />
      <MacroBackdrop T={T} isMobile={isMobile} />

      <div style={{ display: "flex", alignItems: isMobile ? "stretch" : "center", gap: 12, marginBottom: 24, flexDirection: isMobile ? "column" : "row" }}>
        <SearchBar value={search} onChange={setSearch} T={T} isMobile={isMobile} />
        <FilterPills active={themeFilter} onChange={setThemeFilter} T={T} />
      </div>

      <SectorDonut T={T} isMobile={isMobile} activeSector={activeSector} onSectorClick={handleSectorClick} />
      <BubbleUniverse T={T} isMobile={isMobile} activeSector={activeSector} onSectorClick={handleSectorClick} search={search} themeFilter={themeFilter} />
      <ThemeCountStrip T={T} isMobile={isMobile} onSectorClick={handleSectorClick} activeSector={activeSector} />
      <ThemeConnections T={T} isMobile={isMobile} />
      <CompoundersSection T={T} isMobile={isMobile} />

      <div ref={detailRef}>
        {activeSectorData ? (
          <SectorDetail sector={activeSectorData} T={T} isMobile={isMobile} themeFilter={themeFilter} />
        ) : (
          <div style={{ textAlign: "center", padding: "40px 20px", background: T.card, borderRadius: T.radius, border: `1px solid ${T.border}`, marginBottom: 32, boxShadow: T.shadow }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🎯</div>
            <div style={{ fontSize: 14, color: T.text, fontFamily: Fn, fontWeight: 500 }}>Click any sector to explore themes and companies</div>
            <div style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, marginTop: 4 }}>Use the donut chart, bubble universe, or density grid above</div>
          </div>
        )}
      </div>

      <PortfolioSection T={T} isMobile={isMobile} />
      <GeoSection T={T} isMobile={isMobile} />

      <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, lineHeight: 1.7, padding: "16px 0", borderTop: `1px solid ${T.border}`, marginTop: 16 }}>
        Synthesises: deep primary research (March 2026), GICS structural tailwinds analysis (IEA, IPCC, WHO, BIS, ITU, IFR, IRENA), and sell-side/buy-side frameworks (Morgan Stanley, Fidelity, Schwab, Nuveen 2025-2026). Research shortlist, not investable recommendations. For internal use only.
      </div>
    </div>
  );
}
