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
const isHeld = (t) => heldMap[t] !== undefined ? heldMap[t] : holdings.some(h => h.t === t || h.t.startsWith(t + "."));

/* ─── helpers ─── */
const countHeld = (s) => { const seen = new Set(); s.themes.forEach(t => t.companies.forEach(c => { if (isHeld(c.ticker)) seen.add(c.ticker); })); return seen.size; };
const getHeldNames = (s) => { const seen = new Set(), out = []; s.themes.forEach(t => t.companies.forEach(c => { if (isHeld(c.ticker) && !seen.has(c.ticker)) { seen.add(c.ticker); out.push(c); }})); return out; };
const totalCos = (s) => s.themes.reduce((n, t) => n + t.companies.length, 0);
const unique = (arr) => [...new Set(arr)];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   META-THEME RIBBON — interactive filter bar
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function MetaThemeRibbon({ active, onToggle, T, isDark, mobile }) {
  return (
    <div style={{ display:"flex", gap:mobile?6:8, flexWrap:"wrap", marginBottom:16 }}>
      {metaThemes.map(m => {
        const isActive = active === m.id;
        return (
          <button key={m.id} onClick={() => onToggle(m.id)}
            style={{
              flex: mobile ? "1 1 45%" : "0 0 auto",
              display:"flex", alignItems:"center", gap:6, padding:"8px 14px",
              borderRadius:8, border:`1.5px solid ${isActive ? m.color : T.border}`,
              background: isActive ? m.color + (isDark?"18":"0C") : T.card,
              cursor:"pointer", transition:"all 0.2s",
              boxShadow: isActive ? `0 0 12px ${m.color}20` : T.shadow,
            }}>
            <span style={{ fontSize:14 }}>{m.icon}</span>
            <div style={{ textAlign:"left" }}>
              <div style={{ fontSize:11, fontWeight:700, fontFamily:Fn, color:isActive?m.color:T.text, letterSpacing:"-0.01em" }}>
                {m.short}
              </div>
              <div style={{ fontSize:8, fontFamily:Fn, color:T.textTer, fontFeatureSettings:'"tnum"' }}>
                {m.sectorIds.length} sectors
              </div>
            </div>
            {isActive && (
              <span style={{ fontSize:10, color:m.color, marginLeft:4, fontWeight:800, fontFamily:Fn }}>✕</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CONNECTIONS VIEW — SVG network of cross-sector links
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function ConnectionsView({ T, isDark, activeMeta, mobile }) {
  const [hoverLink, setHoverLink] = useState(null);
  const filteredLinks = activeMeta
    ? crossSectorLinks.filter(l => l.meta === activeMeta)
    : crossSectorLinks;

  const W = mobile ? 360 : 700, H = mobile ? 500 : 440;
  const cx = W / 2, cy = H / 2, R = mobile ? 140 : 170;

  // Position sectors around a circle
  const sectorPositions = useMemo(() => {
    const map = {};
    sectors.forEach((s, i) => {
      const angle = (i / sectors.length) * Math.PI * 2 - Math.PI / 2;
      map[s.id] = { x: cx + R * Math.cos(angle), y: cy + R * Math.sin(angle), color: s.color, short: s.short };
    });
    return map;
  }, [cx, cy, R]);

  return (
    <div style={{ background:T.card, borderRadius:12, boxShadow:T.shadow, overflow:"hidden" }}>
      <div style={{ padding:"14px 18px 0", fontSize:12, fontWeight:700, fontFamily:Fn, color:T.text }}>
        Cross-Sector Theme Connections
        <span style={{ fontSize:9, fontWeight:400, color:T.textTer, marginLeft:8 }}>
          {filteredLinks.length} linkages{activeMeta && " (filtered)"}
        </span>
      </div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display:"block" }}>
        {/* Connection arcs */}
        {filteredLinks.map((link, i) => {
          const isHover = hoverLink === i;
          const metaColor = metaThemes.find(m => m.id === link.meta)?.color || T.textTer;
          const pairs = [];
          for (let a = 0; a < link.sectors.length; a++) {
            for (let b = a + 1; b < link.sectors.length; b++) {
              pairs.push([link.sectors[a], link.sectors[b]]);
            }
          }
          return pairs.map(([a, b], j) => {
            const pa = sectorPositions[a], pb = sectorPositions[b];
            if (!pa || !pb) return null;
            return (
              <line key={`${i}-${j}`} x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
                stroke={metaColor} strokeWidth={isHover ? 2.5 : 1} strokeOpacity={isHover ? 0.7 : 0.15}
                onMouseEnter={() => setHoverLink(i)} onMouseLeave={() => setHoverLink(null)}
                style={{ cursor:"pointer", transition:"all 0.2s" }}
              />
            );
          });
        })}
        {/* Sector nodes */}
        {sectors.map(s => {
          const pos = sectorPositions[s.id];
          const highlighted = !activeMeta || (metaThemes.find(m => m.id === activeMeta)?.sectorIds || []).includes(s.id);
          return (
            <g key={s.id} opacity={highlighted ? 1 : 0.2} style={{ transition:"opacity 0.3s" }}>
              <circle cx={pos.x} cy={pos.y} r={mobile?18:22} fill={s.color + "20"} stroke={s.color} strokeWidth={1.5} />
              <text x={pos.x} y={pos.y - (mobile?22:28)} textAnchor="middle" fontSize={mobile?8:9} fontFamily={Fn} fontWeight={700} fill={T.text}>{s.short}</text>
              <text x={pos.x} y={pos.y + 3} textAnchor="middle" fontSize={mobile?7:8} fontFamily={Fn} fontWeight={600} fill={s.color}>{s.weight > 0 ? s.weight+"%" : "—"}</text>
            </g>
          );
        })}
      </svg>
      {/* Hover detail */}
      {hoverLink !== null && filteredLinks[hoverLink] && (
        <div style={{
          padding:"8px 18px 12px", borderTop:`1px solid ${T.border}`,
          fontSize:10, fontFamily:Fn, color:T.textSec, lineHeight:1.5,
        }}>
          <span style={{ fontWeight:700, color:T.text }}>{filteredLinks[hoverLink].theme}</span>
          <span style={{ margin:"0 6px", color:T.textTer }}>→</span>
          {filteredLinks[hoverLink].sectors.map(sid => sectors.find(s => s.id === sid)?.short).filter(Boolean).join(", ")}
        </div>
      )}
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MATRIX VIEW — Sector × Meta-Theme heatmap
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function MatrixView({ T, isDark, mobile }) {
  // Build intensity: count themes in each sector tagged to each meta-theme
  const matrix = useMemo(() => {
    return sectors.map(s => {
      const row = { sector: s };
      metaThemes.forEach(m => {
        const count = (s.metaThemeIds || []).includes(m.id)
          ? s.themes.filter(t => {
              // Check if this theme's category maps to this meta-theme
              const links = crossSectorLinks.filter(l => l.meta === m.id);
              return links.some(l => l.sectors.includes(s.id));
            }).length || 1
          : 0;
        row[m.id] = count;
      });
      return row;
    });
  }, []);

  const maxVal = Math.max(...matrix.flatMap(r => metaThemes.map(m => r[m.id])));

  return (
    <div style={{ background:T.card, borderRadius:12, boxShadow:T.shadow, overflow:"auto" }}>
      <div style={{ padding:"14px 18px 10px", fontSize:12, fontWeight:700, fontFamily:Fn, color:T.text }}>
        Sector × Meta-Theme Exposure
        <span style={{ fontSize:9, fontWeight:400, color:T.textTer, marginLeft:8 }}>intensity = theme intersection count</span>
      </div>
      <div style={{ padding:"0 12px 14px", overflowX:"auto" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", minWidth:mobile?500:0 }}>
          <thead>
            <tr>
              <th style={{ textAlign:"left", padding:"6px 8px", fontSize:9, fontFamily:Fn, color:T.textTer, fontWeight:600, borderBottom:`1px solid ${T.border}` }}>Sector</th>
              {metaThemes.map(m => (
                <th key={m.id} style={{ textAlign:"center", padding:"6px 4px", fontSize:8, fontFamily:Fn, color:m.color, fontWeight:700, borderBottom:`1px solid ${T.border}`, minWidth:60 }}>
                  <span style={{ fontSize:12 }}>{m.icon}</span><br/>{m.short}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map(row => (
              <tr key={row.sector.id}>
                <td style={{ padding:"8px", fontSize:10, fontFamily:Fn, fontWeight:600, color:T.text, borderBottom:`1px solid ${T.border}`, whiteSpace:"nowrap" }}>
                  <span style={{ display:"inline-block", width:3, height:14, borderRadius:2, background:row.sector.color, marginRight:6, verticalAlign:"middle" }} />
                  {row.sector.short}
                  {row.sector.weight > 0 && <span style={{ fontSize:8, color:T.textTer, marginLeft:4 }}>{row.sector.weight}%</span>}
                </td>
                {metaThemes.map(m => {
                  const val = row[m.id];
                  const intensity = maxVal > 0 ? val / maxVal : 0;
                  return (
                    <td key={m.id} style={{ textAlign:"center", padding:"4px", borderBottom:`1px solid ${T.border}` }}>
                      {val > 0 ? (
                        <div style={{
                          display:"inline-flex", alignItems:"center", justifyContent:"center",
                          width:28, height:28, borderRadius:6,
                          background: m.color + (isDark ? Math.round(intensity * 40 + 8).toString(16).padStart(2,"0") : Math.round(intensity * 30 + 5).toString(16).padStart(2,"0")),
                          fontSize:10, fontWeight:700, fontFamily:Fn, color:m.color,
                        }}>
                          {val}
                        </div>
                      ) : (
                        <span style={{ fontSize:9, color:T.textTer }}>·</span>
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

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   EVIDENCE STRIP — inline timeline of catalysts
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function EvidenceStrip({ evidence, sectorColor, T, isDark }) {
  if (!evidence || evidence.length === 0) return null;
  const sorted = [...evidence].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <div style={{ marginBottom:14 }}>
      <div style={{ fontSize:8, fontWeight:700, fontFamily:Fn, color:T.textTer, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:6, paddingLeft:12 }}>
        Evidence & Catalysts
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
        {sorted.map((ev, i) => (
          <div key={i} style={{
            display:"flex", gap:8, padding:"6px 12px", fontSize:10, fontFamily:Fn,
            borderLeft:`2px solid ${sectorColor}${i === 0 ? "" : "40"}`,
            background: i === 0 ? (sectorColor + (isDark?"08":"04")) : "transparent",
            borderRadius:"0 4px 4px 0",
          }}>
            <span style={{ fontWeight:700, color:sectorColor, fontFeatureSettings:'"tnum"', flexShrink:0, fontSize:9 }}>
              {ev.date.replace("-",".")}
            </span>
            <span style={{ color:T.textSec, lineHeight:1.45, flex:1 }}>
              {ev.text}
              <span style={{ color:T.textTer, marginLeft:4, fontSize:8 }}>— {ev.source}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SECTOR TILE (enhanced)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function SectorTile({ sector, isActive, onClick, T, isDark, dimmed, activeMeta }) {
  const held = getHeldNames(sector);
  const cos = totalCos(sector);
  const categories = unique(sector.themes.map(t => t.category).filter(Boolean));
  const metaConnected = activeMeta && (sector.metaThemeIds || []).includes(activeMeta);

  return (
    <div onClick={onClick}
      style={{
        background: T.card, borderRadius:10, boxShadow: T.shadow,
        cursor:"pointer", overflow:"hidden", transition:"all 0.25s ease",
        border: isActive ? `1.5px solid ${sector.color}` : metaConnected ? `1.5px solid ${sector.color}60` : `1.5px solid transparent`,
        opacity: dimmed ? 0.35 : 1,
      }}
      onMouseEnter={e => { if (!isActive && !dimmed) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = T.shadowLg; }}}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = T.shadow; }}
    >
      <div style={{ height:3, background:`linear-gradient(90deg, ${sector.color}, ${sector.color}40)` }} />
      <div style={{ padding:"14px 16px 12px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8, marginBottom:6 }}>
          <div style={{ minWidth:0 }}>
            <div style={{ fontSize:14, fontWeight:700, fontFamily:Fn, color:T.text, letterSpacing:"-0.01em", lineHeight:1.25 }}>{sector.short}</div>
            <div style={{ fontSize:9, fontFamily:Fn, color:T.textTer, marginTop:2 }}>{sector.name}</div>
          </div>
          {sector.weight > 0 ? (
            <div style={{ fontSize:22, fontWeight:800, fontFamily:Fn, color:sector.color, lineHeight:1, letterSpacing:"-0.04em", fontFeatureSettings:'"tnum"' }}>
              {sector.weight}<span style={{ fontSize:11, fontWeight:600 }}>%</span>
            </div>
          ) : (
            <span style={{ fontSize:8, fontWeight:700, fontFamily:Fn, color:T.textTer, padding:"3px 7px", borderRadius:4, background:T.pillBg, letterSpacing:"0.04em" }}>WATCHLIST</span>
          )}
        </div>

        {/* Stats row */}
        <div style={{ display:"flex", gap:12, marginBottom:8 }}>
          {[
            { v:sector.themes.length, l:"themes" },
            { v:cos, l:"cos" },
            { v:held.length, l:"held", c:held.length > 0 ? sector.color : null },
            { v:categories.length, l:"groups" },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontSize:13, fontWeight:700, fontFamily:Fn, color:s.c || T.text, fontFeatureSettings:'"tnum"' }}>{s.v}</div>
              <div style={{ fontSize:7, fontFamily:Fn, color:T.textTer, textTransform:"uppercase", letterSpacing:"0.05em", marginTop:1 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Meta-theme dots */}
        {(sector.metaThemeIds || []).length > 0 && (
          <div style={{ display:"flex", gap:3, flexWrap:"wrap", marginBottom:6 }}>
            {sector.metaThemeIds.map(mid => {
              const mt = metaThemes.find(m => m.id === mid);
              if (!mt) return null;
              return (
                <span key={mid} style={{
                  fontSize:7, fontFamily:Fn, fontWeight:600, padding:"2px 6px", borderRadius:4,
                  background:mt.color + (isDark?"15":"08"), color:mt.color,
                }}>{mt.icon} {mt.short}</span>
              );
            })}
          </div>
        )}

        {/* Held logos */}
        {held.length > 0 && (
          <div style={{ display:"flex", gap:3, flexWrap:"wrap" }}>
            {held.slice(0, 8).map(c => {
              const logo = logoUrl(c.ticker);
              return (
                <div key={c.ticker} title={c.name} style={{
                  display:"flex", alignItems:"center", gap:3,
                  padding:"2px 6px 2px 2px", borderRadius:5,
                  background:sector.color + (isDark?"12":"06"),
                  border:`1px solid ${sector.color}15`,
                }}>
                  {logo && <img src={logo} alt="" style={{ width:13, height:13, borderRadius:3 }} onError={e => e.target.style.display = "none"} />}
                  <span style={{ fontSize:9, fontWeight:700, fontFamily:Fn, color:T.text }}>{c.ticker}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   THEME ROW (enhanced with category badge)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function ThemeRow({ theme, sector, isOpen, onClick, T, isDark, highlight }) {
  const heldInTheme = theme.companies.filter(c => isHeld(c.ticker)).length;
  return (
    <div style={{
      borderRadius:6, overflow:"hidden",
      border:`1px solid ${isOpen ? sector.color+"40" : "transparent"}`,
      background:isOpen ? (sector.color+(isDark?"06":"03")) : "transparent",
      transition:"all 0.2s",
    }}>
      <div onClick={onClick}
        style={{ display:"flex", alignItems:"center", gap:8, padding:"9px 12px", cursor:"pointer", borderRadius:6, transition:"background 0.15s" }}
        onMouseEnter={e => { if (!isOpen) e.currentTarget.style.background = isDark?"rgba(255,255,255,0.025)":"rgba(0,0,0,0.012)"; }}
        onMouseLeave={e => { if (!isOpen) e.currentTarget.style.background = "transparent"; }}
      >
        <div style={{ width:3, height:18, borderRadius:2, background:sector.color, flexShrink:0, opacity:isOpen?1:0.3, transition:"opacity 0.2s" }} />
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:5, flexWrap:"wrap" }}>
            <span style={{
              fontSize:12, fontWeight:600, fontFamily:Fn, color:T.text,
              background:highlight?(sector.color+"18"):"transparent", borderRadius:3, padding:highlight?"0 3px":0,
            }}>{theme.name}</span>
            <span style={{
              fontSize:7, fontWeight:700, fontFamily:Fn, padding:"2px 5px", borderRadius:3, letterSpacing:"0.03em",
              background:theme.type.includes("SECULAR")?T.greenBg:(T.orange+(isDark?"15":"08")),
              color:theme.type.includes("SECULAR")?T.green:T.orange,
            }}>{theme.type.replace(" + ","+")}</span>
            {theme.category && (
              <span style={{ fontSize:7, fontFamily:Fn, color:T.textTer, fontWeight:500 }}>{theme.category}</span>
            )}
          </div>
          {!isOpen && (
            <div style={{ fontSize:10, fontFamily:Fn, color:T.textTer, marginTop:1 }}>
              {theme.companies.length} companies{heldInTheme > 0 && <> · <span style={{ color:sector.color, fontWeight:600 }}>{heldInTheme} held</span></>}
            </div>
          )}
        </div>
        <span style={{ fontSize:13, color:T.textTer, transition:"transform 0.25s", transform:isOpen?"rotate(90deg)":"rotate(0)", flexShrink:0 }}>›</span>
      </div>
      {isOpen && (
        <div style={{ padding:"0 12px 12px 23px" }}>
          <div style={{
            fontSize:11, color:T.textSec, fontFamily:Fn, lineHeight:1.6,
            marginBottom:10, padding:"8px 12px", borderRadius:6,
            background:isDark?"rgba(255,255,255,0.02)":"rgba(0,0,0,0.012)",
            borderLeft:`3px solid ${sector.color}35`,
          }}>{theme.desc}</div>
          <div style={{ display:"grid", gap:5 }}>
            {theme.companies.map((c, j) => {
              const held = isHeld(c.ticker);
              const logo = logoUrl(c.ticker);
              return (
                <div key={j} style={{
                  display:"flex", alignItems:"flex-start", gap:10, padding:"8px 10px", borderRadius:6,
                  background:held?sector.color+(isDark?"0C":"05"):(isDark?"rgba(255,255,255,0.012)":"rgba(0,0,0,0.006)"),
                  border:`1px solid ${held?sector.color+"22":T.border}`,
                }}>
                  {logo && <img src={logo} alt="" style={{ width:22, height:22, borderRadius:5, marginTop:1, border:`1px solid ${T.border}` }} onError={e => e.target.style.display = "none"} />}
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:5, flexWrap:"wrap" }}>
                      <span style={{ fontSize:11, fontWeight:700, fontFamily:Fn, color:T.text }}>{c.name}</span>
                      <span style={{ fontSize:9, fontFamily:Fn, color:T.textTer }}>{c.ticker}{c.hq?` · ${c.hq}`:""}</span>
                      {held && <span style={{ fontSize:7, fontWeight:800, fontFamily:Fn, padding:"1px 5px", borderRadius:3, background:sector.color+"20", color:sector.color, letterSpacing:"0.04em" }}>HELD</span>}
                    </div>
                    <div style={{ fontSize:10, color:T.textSec, fontFamily:Fn, lineHeight:1.5, marginTop:2 }}>{c.why}</div>
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

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   EXPANDED SECTOR PANEL (with categories + evidence)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function SectorExpanded({ sector, onClose, T, isDark, searchTerm, activeMeta }) {
  const [openTheme, setOpenTheme] = useState(-1);
  const [showEvidence, setShowEvidence] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) ref.current.scrollIntoView({ behavior:"smooth", block:"nearest" });
    setOpenTheme(-1);
    setShowEvidence(false);
  }, [sector.id]);

  const held = getHeldNames(sector);
  const cos = totalCos(sector);
  const categories = unique(sector.themes.map(t => t.category).filter(Boolean));

  // Group themes by category
  const grouped = useMemo(() => {
    const groups = {};
    sector.themes.forEach((t, i) => {
      const cat = t.category || "Other";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push({ ...t, _idx: i });
    });
    return groups;
  }, [sector]);

  // Filter themes by active meta-theme
  const filteredThemes = useMemo(() => {
    if (!activeMeta) return sector.themes;
    // Show all themes but highlight relevant ones
    return sector.themes;
  }, [sector, activeMeta]);

  return (
    <div ref={ref} style={{ gridColumn:"1 / -1" }}>
      <Card T={T} style={{ borderTop:`3px solid ${sector.color}`, padding:0, overflow:"hidden" }}>
        {/* Header */}
        <div style={{ padding:"18px 20px 0" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
            <div>
              <div style={{ display:"flex", alignItems:"baseline", gap:8 }}>
                <span style={{ fontSize:18, fontWeight:700, fontFamily:Fn, color:T.text, letterSpacing:"-0.02em" }}>{sector.name}</span>
                {sector.weight > 0 && (
                  <span style={{ fontSize:13, fontWeight:800, fontFamily:Fn, color:sector.color, padding:"2px 8px", borderRadius:5, background:sector.color+(isDark?"18":"0A"), fontFeatureSettings:'"tnum"' }}>{sector.weight}%</span>
                )}
              </div>
              <div style={{ fontSize:10, fontFamily:Fn, color:T.textTer, marginTop:4, fontFeatureSettings:'"tnum"' }}>
                {sector.themes.length} themes · {categories.length} categories · {cos} companies · {held.length} in portfolio
              </div>
            </div>
            <button onClick={onClose} style={{
              background:T.pillBg, border:`1px solid ${T.border}`, borderRadius:6,
              width:28, height:28, fontSize:12, color:T.textTer, cursor:"pointer",
              display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
            }}>✕</button>
          </div>

          {/* GICS definition */}
          {sector.gicsDefinition && (
            <div style={{ fontSize:9, fontFamily:Fn, color:T.textTer, lineHeight:1.5, marginBottom:10, padding:"6px 10px", borderRadius:5, background:isDark?"rgba(255,255,255,0.015)":"rgba(0,0,0,0.01)", border:`1px solid ${T.border}` }}>
              <span style={{ fontWeight:700, fontSize:8, letterSpacing:"0.04em", textTransform:"uppercase" }}>GICS: </span>{sector.gicsDefinition}
            </div>
          )}

          {/* Context paragraph */}
          <div style={{
            fontSize:11, fontFamily:Fn, color:T.textSec, lineHeight:1.65,
            padding:"10px 14px", borderRadius:6, marginBottom:10,
            background:isDark?"rgba(255,255,255,0.015)":"rgba(0,0,0,0.01)",
          }}>
            {sector.weight > 0 ? (
              <>The fund holds <span style={{ fontWeight:700, color:sector.color }}>{held.length} positions</span> in {sector.short} at <span style={{ fontWeight:700 }}>{sector.weight}%</span> of NAV{sector.weight > 10 ? " — an overweight reflecting high conviction" : ""}. Themes span {categories.length} structural categories.</>
            ) : (
              <>The fund holds <span style={{ fontWeight:700, color:T.orange }}>no positions</span> in {sector.short}. The {sector.themes.length} themes below form the watchlist across {categories.length} categories.</>
            )}
          </div>

          {/* Toggle bar: Evidence / Held */}
          <div style={{ display:"flex", gap:6, marginBottom:12, flexWrap:"wrap" }}>
            {held.length > 0 && held.map(c => {
              const logo = logoUrl(c.ticker);
              return (
                <div key={c.ticker} style={{
                  display:"flex", alignItems:"center", gap:4,
                  padding:"3px 7px 3px 3px", borderRadius:5,
                  background:sector.color+(isDark?"15":"08"), border:`1px solid ${sector.color}18`,
                }}>
                  {logo && <img src={logo} alt="" style={{ width:15, height:15, borderRadius:3 }} onError={e => e.target.style.display = "none"} />}
                  <span style={{ fontSize:10, fontWeight:700, fontFamily:Fn, color:T.text }}>{c.ticker}</span>
                </div>
              );
            })}
            {sector.evidence && sector.evidence.length > 0 && (
              <button onClick={() => setShowEvidence(!showEvidence)} style={{
                padding:"4px 10px", borderRadius:5, fontSize:9, fontFamily:Fn, fontWeight:600,
                border:`1px solid ${showEvidence ? sector.color : T.border}`,
                background:showEvidence ? sector.color+(isDark?"15":"08") : "transparent",
                color:showEvidence ? sector.color : T.textSec,
                cursor:"pointer", marginLeft:"auto",
              }}>
                {showEvidence ? "▾" : "▸"} Evidence ({sector.evidence.length})
              </button>
            )}
          </div>

          {/* Evidence timeline */}
          {showEvidence && <EvidenceStrip evidence={sector.evidence} sectorColor={sector.color} T={T} isDark={isDark} />}
        </div>

        {/* Themes grouped by category */}
        <div style={{ padding:"0 12px 14px" }}>
          {Object.entries(grouped).map(([cat, themes]) => (
            <div key={cat} style={{ marginBottom:8 }}>
              <div style={{
                fontSize:8, fontWeight:700, fontFamily:Fn, color:sector.color,
                textTransform:"uppercase", letterSpacing:"0.06em",
                padding:"6px 12px 4px", borderBottom:`1px solid ${sector.color}15`,
                marginBottom:4,
              }}>
                {cat} <span style={{ color:T.textTer, fontWeight:500 }}>({themes.length})</span>
              </div>
              <div style={{ display:"grid", gap:3 }}>
                {themes.map(theme => {
                  const matchesSearch = searchTerm && theme.name.toLowerCase().includes(searchTerm.toLowerCase());
                  return (
                    <ThemeRow
                      key={theme._idx} theme={theme} sector={sector}
                      isOpen={openTheme === theme._idx}
                      onClick={() => setOpenTheme(openTheme === theme._idx ? -1 : theme._idx)}
                      T={T} isDark={isDark} highlight={matchesSearch}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MAIN PAGE
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
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
  const [view, setView] = useState("sectors"); // sectors | connections | matrix

  const totalThemes = sectors.reduce((s, sec) => s + sec.themes.length, 0);
  const allCos = sectors.reduce((s, sec) => s + totalCos(sec), 0);

  const handleMetaToggle = useCallback((id) => {
    setActiveMeta(prev => prev === id ? null : id);
    setActiveSector(null);
  }, []);

  /* Filtering */
  const matchesSector = (sec) => {
    if (activeMeta && !(sec.metaThemeIds || []).includes(activeMeta)) return false;
    if (filterHeld && countHeld(sec) === 0) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    if (sec.name.toLowerCase().includes(q) || sec.short.toLowerCase().includes(q)) return true;
    return sec.themes.some(t =>
      t.name.toLowerCase().includes(q) || (t.category || "").toLowerCase().includes(q) ||
      t.companies.some(c => c.ticker.toLowerCase().includes(q) || c.name.toLowerCase().includes(q))
    );
  };

  const filteredSectors = sectors.filter(matchesSector);

  /* Grid with inline expansion */
  const cols = mobile ? 1 : 2;
  const activeIdx = activeSector ? filteredSectors.findIndex(s => s.id === activeSector) : -1;
  const insertAfterRow = activeIdx >= 0 ? Math.floor(activeIdx / cols) : -1;
  const activeSectorData = activeSector ? sectors.find(s => s.id === activeSector) : null;

  const gridItems = useMemo(() => {
    const items = [];
    for (let i = 0; i < filteredSectors.length; i++) {
      items.push({ type:"tile", sector:filteredSectors[i], idx:i });
      const row = Math.floor(i / cols);
      const isLastInRow = (i+1) % cols === 0 || i === filteredSectors.length - 1;
      if (isLastInRow && row === insertAfterRow && activeSectorData) {
        items.push({ type:"expanded", sector:activeSectorData });
      }
    }
    return items;
  }, [filteredSectors, activeSector, activeSectorData, insertAfterRow, cols]);

  const views = [
    { id:"sectors", label:"Sectors", icon:"◫" },
    { id:"connections", label:"Connections", icon:"◎" },
    { id:"matrix", label:"Matrix", icon:"▦" },
  ];

  return (
    <div>
      {/* ── Header ── */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:12, marginBottom:16 }}>
        <div>
          <h2 style={{ fontFamily:Fn, fontSize:22, fontWeight:300, letterSpacing:"-0.03em", color:T.text, margin:0 }}>
            Thematic Universe
          </h2>
          <div style={{ display:"flex", gap:16, marginTop:8, flexWrap:"wrap" }}>
            {[
              { v:"10", l:"Sectors" },
              { v:String(totalThemes), l:"Themes" },
              { v:`~${allCos}`, l:"Companies" },
              { v:"5", l:"Meta-Themes", c:T.deepBlue || "#818CF8" },
              { v:String(crossSectorLinks.length), l:"Cross-Links" },
              { v:"26", l:"Held", c:T.green },
            ].map((s, i) => (
              <div key={i} style={{ display:"flex", alignItems:"baseline", gap:3 }}>
                <span style={{ fontSize:15, fontWeight:800, fontFamily:Fn, color:s.c || T.text, fontFeatureSettings:'"tnum"' }}>{s.v}</span>
                <span style={{ fontSize:9, fontFamily:Fn, color:T.textTer }}>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
        {/* View toggle */}
        <div style={{ display:"flex", gap:2, background:T.pillBg, borderRadius:8, padding:2 }}>
          {views.map(v => (
            <button key={v.id} onClick={() => { setView(v.id); setActiveSector(null); }}
              style={{
                padding:"6px 12px", borderRadius:6, fontSize:10, fontFamily:Fn, fontWeight:600,
                border:"none", cursor:"pointer", transition:"all 0.15s",
                background:view === v.id ? T.card : "transparent",
                color:view === v.id ? T.text : T.textTer,
                boxShadow:view === v.id ? T.shadow : "none",
              }}>
              <span style={{ marginRight:4 }}>{v.icon}</span>{v.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Meta-Theme Ribbon ── */}
      <MetaThemeRibbon active={activeMeta} onToggle={handleMetaToggle} T={T} isDark={isDark} mobile={mobile} />

      {/* ── Active meta-theme stats ── */}
      {activeMeta && (() => {
        const mt = metaThemes.find(m => m.id === activeMeta);
        if (!mt) return null;
        return (
          <div style={{
            display:"flex", gap:mobile?8:16, flexWrap:"wrap", marginBottom:16,
            padding:"10px 14px", borderRadius:8, border:`1px solid ${mt.color}30`,
            background:mt.color+(isDark?"08":"04"),
          }}>
            <div style={{ flex:"1 1 200px" }}>
              <div style={{ fontSize:11, fontFamily:Fn, color:T.textSec, lineHeight:1.55 }}>{mt.desc}</div>
            </div>
            <div style={{ display:"flex", gap:12, flexShrink:0, alignItems:"center" }}>
              {mt.keyStats.map((ks, i) => (
                <div key={i} style={{ textAlign:"center" }}>
                  <div style={{ fontSize:13, fontWeight:800, fontFamily:Fn, color:mt.color, fontFeatureSettings:'"tnum"' }}>{ks.value}</div>
                  <div style={{ fontSize:7, fontFamily:Fn, color:T.textTer, textTransform:"uppercase", letterSpacing:"0.04em" }}>{ks.label}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* ── Connections View ── */}
      {view === "connections" && (
        <ConnectionsView T={T} isDark={isDark} activeMeta={activeMeta} mobile={mobile} />
      )}

      {/* ── Matrix View ── */}
      {view === "matrix" && (
        <MatrixView T={T} isDark={isDark} mobile={mobile} />
      )}

      {/* ── Sectors View ── */}
      {view === "sectors" && (
        <>
          {/* Search & Filter bar */}
          <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap", alignItems:"center" }}>
            <div style={{ flex:"1 1 200px", position:"relative", maxWidth:340 }}>
              <input type="text" placeholder="Search sectors, themes, tickers, categories…"
                value={search} onChange={e => { setSearch(e.target.value); setActiveSector(null); }}
                style={{
                  width:"100%", boxSizing:"border-box", padding:"7px 12px 7px 30px",
                  fontSize:11, fontFamily:Fn, borderRadius:6, border:`1px solid ${T.border}`,
                  background:T.card, color:T.text, outline:"none", transition:"border-color 0.15s",
                }}
                onFocus={e => e.target.style.borderColor = T.deepBlue || T.text}
                onBlur={e => e.target.style.borderColor = T.border}
              />
              <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", fontSize:12, color:T.textTer, pointerEvents:"none" }}>⌕</span>
            </div>
            <button onClick={() => { setFilterHeld(!filterHeld); setActiveSector(null); }}
              style={{
                padding:"6px 12px", borderRadius:6, fontSize:10, fontFamily:Fn, fontWeight:600,
                border:`1px solid ${filterHeld?T.green:T.border}`,
                background:filterHeld?T.greenBg:"transparent",
                color:filterHeld?T.green:T.textSec, cursor:"pointer", transition:"all 0.15s",
              }}>
              {filterHeld ? "✓ " : ""}Held only
            </button>
            {(search || filterHeld || activeMeta) && (
              <button onClick={() => { setSearch(""); setFilterHeld(false); setActiveMeta(null); setActiveSector(null); }}
                style={{ padding:"6px 10px", borderRadius:6, fontSize:10, fontFamily:Fn, border:`1px solid ${T.border}`, background:"transparent", color:T.textTer, cursor:"pointer" }}>
                Clear all
              </button>
            )}
            <span style={{ fontSize:10, fontFamily:Fn, color:T.textTer }}>
              {filteredSectors.length} of 10 sectors
            </span>
          </div>

          {/* Sector Grid */}
          <div style={{ display:"grid", gridTemplateColumns:mobile?"1fr":"1fr 1fr", gap:12 }}>
            {gridItems.map((item, i) => {
              if (item.type === "tile") {
                const isActive = activeSector === item.sector.id;
                const dimmed = activeSector && !isActive;
                return (
                  <SectorTile key={item.sector.id} sector={item.sector}
                    isActive={isActive} dimmed={dimmed}
                    onClick={() => setActiveSector(prev => prev === item.sector.id ? null : item.sector.id)}
                    T={T} isDark={isDark} activeMeta={activeMeta}
                  />
                );
              }
              if (item.type === "expanded") {
                return (
                  <SectorExpanded key={`exp-${item.sector.id}`} sector={item.sector}
                    onClose={() => setActiveSector(null)}
                    T={T} isDark={isDark} searchTerm={search} activeMeta={activeMeta}
                  />
                );
              }
              return null;
            })}
          </div>

          {filteredSectors.length === 0 && (
            <div style={{ padding:40, textAlign:"center", color:T.textTer, fontFamily:Fn, fontSize:12 }}>
              No sectors match the current filters
            </div>
          )}
        </>
      )}

      {/* Footer */}
      <div style={{
        fontSize:10, color:T.textTer, fontFamily:Fn, textAlign:"center",
        marginTop:24, padding:"12px 0", borderTop:`1px solid ${T.border}`,
      }}>
        Cape Capital AG · Thematic Universe · {totalThemes} themes across 10 sectors · ~{allCos} companies · 5 cross-cutting meta-themes · April 2026
      </div>
    </div>
  );
}
