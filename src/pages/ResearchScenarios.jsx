import { useState, useMemo } from "react";
import { Fn, Fh } from "../theme";
import { Card } from "../components/shared";
import { HOLDINGS, CATS, NARRATIVES } from "../data/research-scenarios";
import { useMobile } from "../hooks/useMobile";

const DIR_LABELS = { 1: "tailwind", "-1": "headwind", 0: "mixed" };
const DIR_COLORS = { 1: "#34d399", "-1": "#f87171", 0: "#fbbf24" };
const DIR_BG_D = { 1: "rgba(52,211,153,0.12)", "-1": "rgba(248,113,113,0.12)", 0: "rgba(251,191,36,0.10)" };
const DIR_BG_L = { 1: "rgba(4,120,87,0.08)", "-1": "rgba(220,38,38,0.08)", 0: "rgba(234,179,8,0.08)" };
const DIR_ICON = { 1: "▲", "-1": "▼", 0: "◆" };

function dirBg(d, dark) { return dark ? DIR_BG_D[d] : DIR_BG_L[d]; }
function dirCol(d, dark) {
  if (!dark) return d === 1 ? "#047857" : d === -1 ? "#b91c1c" : "#a16207";
  return DIR_COLORS[d];
}

export default function ResearchScenarios({ T }) {
  const mobile = useMobile();
  const dark = T.bg === "#0a0b0d" || T.bg === "#0B0D11" || T.bg === "#000" || T.text === "#E2E4E9" || T.text === "#F1F3F5";
  const [selectedNarr, setSelectedNarr] = useState(null);
  const [selectedHolding, setSelectedHolding] = useState(null);
  const [catFilter, setCatFilter] = useState(null);
  const [view, setView] = useState("narratives");

  const filtered = useMemo(() => {
    let list = NARRATIVES;
    if (catFilter) list = list.filter(n => n.cat === catFilter);
    return list;
  }, [catFilter]);

  const holdingNarratives = useMemo(() => {
    if (!selectedHolding) return [];
    return NARRATIVES.filter(n => n.hits.some(h => h.t === selectedHolding))
      .map(n => ({ ...n, dir: n.hits.find(h => h.t === selectedHolding).d }));
  }, [selectedHolding]);

  const narr = selectedNarr ? NARRATIVES.find(n => n.id === selectedNarr) : null;
  const catForId = id => CATS.find(c => c.id === id);

  return (
    <div>
      {/* HEADER */}


      {/* VIEW TOGGLE + CATEGORY FILTERS */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14, alignItems: "center" }}>
        {["narratives", "matrix"].map(v => (
          <button key={v} onClick={() => setView(v)} style={{
            padding: "5px 12px", borderRadius: T.radiusSm || 6, fontSize: 10, fontWeight: 600, fontFamily: Fn,
            background: view === v ? T.text : "transparent", color: view === v ? T.bg : T.textTer,
            border: `1px solid ${view === v ? T.text : T.border}`, cursor: "pointer", transition: "all 0.15s",
            textTransform: "uppercase", letterSpacing: "0.06em",
          }}>
            {v === "narratives" ? "Card View" : "Matrix"}
          </button>
        ))}
        <div style={{ width: 1, height: 18, background: T.border, margin: "0 4px" }} />
        <button onClick={() => setCatFilter(null)} style={{
          padding: "4px 9px", borderRadius: T.radiusSm || 6, fontSize: 9, fontFamily: Fn, cursor: "pointer",
          background: !catFilter ? (dark ? "#1a1c21" : "#f3f4f6") : "transparent",
          border: `1px solid ${!catFilter ? (dark ? "#3a3d45" : "#d1d5db") : T.border}`,
          color: !catFilter ? T.text : T.textTer, letterSpacing: "0.04em",
        }}>ALL</button>
        {CATS.map(c => (
          <button key={c.id} onClick={() => setCatFilter(catFilter === c.id ? null : c.id)} style={{
            padding: "4px 9px", borderRadius: T.radiusSm || 6, fontSize: 9, fontFamily: Fn, cursor: "pointer",
            background: catFilter === c.id ? c.color + "18" : "transparent",
            border: `1px solid ${catFilter === c.id ? c.color + "50" : T.border}`,
            color: catFilter === c.id ? c.color : T.textTer, letterSpacing: "0.04em", transition: "all 0.15s",
          }}>{c.label}</button>
        ))}
      </div>

      {/* ═══════════════ CARD VIEW ═══════════════ */}
      {view === "narratives" ? (
        <div style={{ display: "grid", gridTemplateColumns: (selectedNarr || selectedHolding) && !mobile ? "1fr 320px" : "1fr", gap: 14 }}>
          <div>
            {/* HOLDING CHIPS */}
            <div style={{ marginBottom: 14, display: "flex", flexWrap: "wrap", gap: 4 }}>
              {HOLDINGS.map(h => {
                const isActive = selectedHolding === h.t;
                const hitCount = NARRATIVES.filter(n => n.hits.some(x => x.t === h.t)).length;
                return (
                  <button key={h.t} onClick={() => { setSelectedHolding(isActive ? null : h.t); setSelectedNarr(null); }}
                    style={{
                      padding: "3px 7px", borderRadius: 4, fontSize: 9, fontFamily: Fn, cursor: "pointer",
                      background: isActive ? T.text : (dark ? "#14161a" : "#f9fafb"),
                      color: isActive ? T.bg : T.textSec,
                      border: `1px solid ${isActive ? T.text : T.border}`, transition: "all 0.15s",
                      fontWeight: isActive ? 700 : 400,
                    }}>
                    {h.t.length > 4 ? h.n.split(" ")[0] : h.n} <span style={{ opacity: 0.5 }}>({hitCount})</span>
                  </button>
                );
              })}
            </div>

            {/* NARRATIVE CARDS */}
            <div style={{ display: "grid", gap: 6 }}>
              {filtered.map(n => {
                const cat = catForId(n.cat);
                const isSelected = selectedNarr === n.id;
                const holdingHighlight = selectedHolding ? n.hits.find(h => h.t === selectedHolding) : null;
                const dimmed = selectedHolding && !holdingHighlight;
                return (
                  <div key={n.id} onClick={() => { setSelectedNarr(isSelected ? null : n.id); setSelectedHolding(null); }}
                    style={{
                      background: isSelected ? (dark ? "#1a1c21" : "#f9fafb") : T.card,
                      border: `1px solid ${isSelected ? cat.color + "40" : dimmed ? (dark ? "#1a1c21" : "#e5e7eb") : T.border}`,
                      borderRadius: T.radius || 8, padding: mobile ? "12px 12px" : "12px 14px", cursor: "pointer",
                      transition: "all 0.15s", opacity: dimmed ? 0.3 : 1,
                      borderLeft: `3px solid ${cat.color}`, boxShadow: T.shadow,
                    }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: mobile ? "flex-start" : "center", gap: 10, flexDirection: mobile ? "column" : "row" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 3 }}>{n.name}</div>
                        <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, lineHeight: 1.45 }}>{n.desc}</div>
                      </div>
                      <div style={{ display: "flex", gap: 3, flexWrap: "wrap", flexShrink: 0, maxWidth: mobile ? "100%" : 180, justifyContent: "flex-end" }}>
                        {n.hits.map(h => {
                          const holding = HOLDINGS.find(x => x.t === h.t);
                          const isHighlighted = selectedHolding === h.t;
                          return (
                            <span key={h.t} style={{
                              fontSize: 8, fontFamily: Fn, padding: "2px 5px", borderRadius: 3,
                              background: dirBg(h.d, dark), color: dirCol(h.d, dark), fontWeight: 600,
                              border: isHighlighted ? `1px solid ${dirCol(h.d, dark)}` : "1px solid transparent",
                            }}>
                              {DIR_ICON[h.d]} {holding.n.split(" ")[0].slice(0, 8)}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 10, marginTop: 6, fontSize: 9, fontFamily: Fn, color: T.textTer }}>
                      <span style={{ color: cat.color }}>{cat.label}</span>
                      <span>{n.hits.length} holdings</span>
                      <span style={{ color: dirCol(1, dark) }}>{n.hits.filter(h => h.d === 1).length} tailwinds</span>
                      <span style={{ color: dirCol(-1, dark) }}>{n.hits.filter(h => h.d === -1).length} headwinds</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* DETAIL PANEL */}
          {(narr || selectedHolding) && !mobile && (
            <div style={{
              background: T.card, border: `1px solid ${T.border}`, borderRadius: T.radius || 8, padding: 18, boxShadow: T.shadow,
              position: "sticky", top: 20, maxHeight: "calc(100vh - 100px)", overflowY: "auto",
            }}>
              {narr && (
                <>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: catForId(narr.cat).color, textTransform: "uppercase", fontFamily: Fn, marginBottom: 6 }}>
                    {catForId(narr.cat).label}
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 6px", color: T.text, fontFamily: Fn }}>{narr.name}</h3>
                  <p style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.5, margin: "0 0 18px" }}>{narr.desc}</p>
                  <div style={{ fontSize: 9, fontWeight: 600, color: T.textTer, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: Fn, marginBottom: 8 }}>
                    Impacted Holdings ({narr.hits.length})
                  </div>
                  {narr.hits.sort((a, b) => b.d - a.d).map(h => {
                    const holding = HOLDINGS.find(x => x.t === h.t);
                    return (
                      <div key={h.t} style={{
                        display: "flex", alignItems: "center", gap: 8, padding: "7px 8px",
                        borderRadius: T.radiusSm || 6, background: dirBg(h.d, dark), marginBottom: 3,
                      }}>
                        <span style={{ fontSize: 12, color: dirCol(h.d, dark) }}>{DIR_ICON[h.d]}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 11, fontWeight: 600, color: T.text, fontFamily: Fn }}>{holding.n}</div>
                          <div style={{ fontSize: 9, color: T.textTer, fontFamily: Fn }}>{holding.s} · {holding.co}</div>
                        </div>
                        <span style={{ fontSize: 9, fontWeight: 600, color: dirCol(h.d, dark), fontFamily: Fn, textTransform: "uppercase" }}>
                          {DIR_LABELS[h.d]}
                        </span>
                      </div>
                    );
                  })}
                </>
              )}
              {selectedHolding && !narr && (() => {
                const h = HOLDINGS.find(x => x.t === selectedHolding);
                return (
                  <>
                    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: T.textTer, textTransform: "uppercase", fontFamily: Fn, marginBottom: 6 }}>
                      Holding Exposure
                    </div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 3px", color: T.text, fontFamily: Fn }}>{h.n}</h3>
                    <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginBottom: 18 }}>{h.s} · {h.co}</div>
                    <div style={{ fontSize: 9, fontWeight: 600, color: T.textTer, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: Fn, marginBottom: 8 }}>
                      Narratives ({holdingNarratives.length})
                    </div>
                    {holdingNarratives.sort((a, b) => b.dir - a.dir).map(n => {
                      const cat = catForId(n.cat);
                      return (
                        <div key={n.id} onClick={e => { e.stopPropagation(); setSelectedNarr(n.id); setSelectedHolding(null); }}
                          style={{
                            padding: "8px 8px", borderRadius: T.radiusSm || 6, background: dirBg(n.dir, dark), marginBottom: 3,
                            cursor: "pointer", borderLeft: `3px solid ${cat.color}`,
                          }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: 11, fontWeight: 600, color: T.text, fontFamily: Fn }}>{n.name}</span>
                            <span style={{ fontSize: 9, color: dirCol(n.dir, dark), fontFamily: Fn, fontWeight: 600 }}>
                              {DIR_ICON[n.dir]} {DIR_LABELS[n.dir]}
                            </span>
                          </div>
                          <div style={{ fontSize: 9, color: cat.color, fontFamily: Fn, marginTop: 2 }}>{cat.label}</div>
                        </div>
                      );
                    })}
                  </>
                );
              })()}
            </div>
          )}
        </div>
      ) : (
        /* ═══════════════ MATRIX VIEW ═══════════════ */
        <div style={{ overflowX: "auto", borderRadius: T.radius || 8, border: `1px solid ${T.border}`, background: T.card, boxShadow: T.shadow }}>
          <table style={{ borderCollapse: "collapse", fontSize: 9, fontFamily: Fn, width: "100%" }}>
            <thead>
              <tr>
                <th style={{ position: "sticky", left: 0, zIndex: 2, background: T.card, padding: "6px 10px", textAlign: "left", color: T.textTer, borderBottom: `1px solid ${T.border}`, minWidth: 180 }}>Narrative</th>
                {HOLDINGS.map(h => (
                  <th key={h.t} onClick={() => { setSelectedHolding(selectedHolding === h.t ? null : h.t); setView("narratives"); }}
                    style={{
                      padding: "6px 3px", textAlign: "center", color: T.textTer, borderBottom: `1px solid ${T.border}`,
                      cursor: "pointer", minWidth: 28, whiteSpace: "nowrap",
                      writingMode: "vertical-rl", transform: "rotate(180deg)", height: 72, fontSize: 8,
                    }}>
                    {h.n.split(" ")[0].slice(0, 9)}
                  </th>
                ))}
                <th style={{ padding: "6px 6px", textAlign: "center", color: T.textTer, borderBottom: `1px solid ${T.border}`, fontSize: 8 }}>Σ</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(n => {
                const cat = catForId(n.cat);
                return (
                  <tr key={n.id} style={{ borderBottom: `1px solid ${dark ? "#14161a" : "#f3f4f6"}`, transition: "background 0.1s" }}
                    onMouseEnter={e => e.currentTarget.style.background = dark ? "#14161a" : "#f9fafb"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <td style={{
                      position: "sticky", left: 0, zIndex: 1, background: T.card, padding: "5px 10px",
                      borderLeft: `3px solid ${cat.color}`, whiteSpace: "nowrap", color: T.text, fontWeight: 500, fontSize: 9,
                    }}>
                      {n.name}
                    </td>
                    {HOLDINGS.map(h => {
                      const hit = n.hits.find(x => x.t === h.t);
                      return (
                        <td key={h.t} style={{
                          textAlign: "center", padding: 2,
                          background: hit ? dirBg(hit.d, dark) : "transparent",
                        }}>
                          {hit && <span style={{ color: dirCol(hit.d, dark), fontSize: 9 }}>{DIR_ICON[hit.d]}</span>}
                        </td>
                      );
                    })}
                    <td style={{ textAlign: "center", padding: "5px 6px", color: T.textSec, fontWeight: 600, fontSize: 9 }}>{n.hits.length}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* SUMMARY STATS */}
      <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)", gap: 8 }}>
        {(() => {
          const exposureCounts = HOLDINGS.map(h => ({
            ...h, total: NARRATIVES.filter(n => n.hits.some(x => x.t === h.t)).length,
            tw: NARRATIVES.filter(n => n.hits.some(x => x.t === h.t && x.d === 1)).length,
            hw: NARRATIVES.filter(n => n.hits.some(x => x.t === h.t && x.d === -1)).length,
          })).sort((a, b) => b.total - a.total);
          const top5 = exposureCounts.slice(0, 5);
          const mostAsym = [...exposureCounts].sort((a, b) => Math.abs(b.tw - b.hw) - Math.abs(a.tw - a.hw)).slice(0, 5);
          return (
            <>
              <Card T={T}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: T.textTer, textTransform: "uppercase", fontFamily: Fn, marginBottom: 10 }}>Most Exposed</div>
                {top5.map(h => (
                  <div key={h.t} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", fontSize: 11, fontFamily: Fn }}>
                    <span style={{ color: T.text }}>{h.n}</span>
                    <span style={{ color: T.textTer }}>{h.total} narratives</span>
                  </div>
                ))}
              </Card>
              <Card T={T}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: T.textTer, textTransform: "uppercase", fontFamily: Fn, marginBottom: 10 }}>Most Asymmetric</div>
                {mostAsym.map(h => (
                  <div key={h.t} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", fontSize: 11, fontFamily: Fn }}>
                    <span style={{ color: T.text }}>{h.n}</span>
                    <span><span style={{ color: dirCol(1, dark) }}>{h.tw}▲</span>{" / "}<span style={{ color: dirCol(-1, dark) }}>{h.hw}▼</span></span>
                  </div>
                ))}
              </Card>
              <Card T={T}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: T.textTer, textTransform: "uppercase", fontFamily: Fn, marginBottom: 10 }}>By Category</div>
                {CATS.filter(c => filtered.some(n => n.cat === c.id)).map(c => (
                  <div key={c.id} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", fontSize: 11, fontFamily: Fn }}>
                    <span style={{ color: c.color }}>{c.label}</span>
                    <span style={{ color: T.textTer }}>{filtered.filter(n => n.cat === c.id).length}</span>
                  </div>
                ))}
              </Card>
            </>
          );
        })()}
      </div>
    </div>
  );
}
