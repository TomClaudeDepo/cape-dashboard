import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { Fn } from "../theme";
import { Card } from "../components/shared";
import { sectors as rawSectors, macrodynamics, logoUrl } from "../data/research-thematic-map";
import { holdings } from "../data/portfolio";

/* ─── Map shared data to compact radial format ─── */
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

const sectors = rawSectors.map(s => ({
  ...s,
  themes: s.themes.map(t => ({
    ...t,
    companies: t.companies.map(c => ({ t: c.ticker, n: c.name, w: c.why, hq: c.hq })),
  })),
}));

/* ─── GEOMETRY ─── */
const TAU = Math.PI * 2;
const toRad = (deg) => deg * (Math.PI / 180);
const polar = (cx, cy, r, a) => ({ x: cx + r * Math.cos(a - Math.PI / 2), y: cy + r * Math.sin(a - Math.PI / 2) });
const arcPath = (cx, cy, r1, r2, a1, a2) => {
  const lg = a2 - a1 > Math.PI ? 1 : 0;
  const p1 = polar(cx, cy, r1, a1), p2 = polar(cx, cy, r1, a2);
  const p3 = polar(cx, cy, r2, a2), p4 = polar(cx, cy, r2, a1);
  return `M${p1.x},${p1.y} A${r1},${r1} 0 ${lg} 1 ${p2.x},${p2.y} L${p3.x},${p3.y} A${r2},${r2} 0 ${lg} 0 ${p4.x},${p4.y} Z`;
};
const midA = (a1, a2) => (a1 + a2) / 2;

/* ─── COMPONENT ─── */
export default function ThematicSunburst({ T }) {
  const isDark = T.bg !== "#F8F9FC";
  const [hover, setHover] = useState(null);
  const [selected, setSelected] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [anim, setAnim] = useState(0);
  const containerRef = useRef(null);
  const [dims, setDims] = useState({ w: 880, h: 880 });

  const guide = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const dimFill = isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)";

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      const s = Math.min(entries[0].contentRect.width, 880);
      setDims({ w: s, h: s });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => { const t = setTimeout(() => setAnim(1), 80); return () => clearTimeout(t); }, []);

  const CX = dims.w / 2, CY = dims.h / 2, sc = dims.w / 880;
  const R = { core: 64*sc, macIn: 74*sc, macOut: 110*sc, secIn: 118*sc, secOut: 208*sc, thIn: 216*sc, thOut: 334*sc, coIn: 342*sc, coOut: 420*sc };
  const GAP = toRad(0.6);

  /* Sector arcs */
  const totalWeight = sectors.reduce((s, sec) => s + Math.max(sec.weight, 3), 0);
  const sectorArcs = useMemo(() => {
    let a = 0;
    return sectors.map((sec, i) => {
      const w = Math.max(sec.weight, 3);
      const span = (w / totalWeight) * TAU;
      const a1 = a + GAP / 2, a2 = a + span - GAP / 2;
      a += span;
      return { ...sec, a1, a2, idx: i };
    });
  }, [totalWeight, sc]);

  /* Theme arcs */
  const themeArcs = useMemo(() => {
    const out = [];
    sectorArcs.forEach((sec, si) => {
      const n = sec.themes.length, span = sec.a2 - sec.a1, tGap = toRad(0.4);
      const tSpan = (span - tGap * n) / n;
      let a = sec.a1;
      sec.themes.forEach((theme, ti) => {
        out.push({ ...theme, sectorIdx: si, themeIdx: ti, color: sec.color, a1: a + tGap / 2, a2: a + tSpan + tGap / 2 });
        a += tSpan + tGap;
      });
    });
    return out;
  }, [sectorArcs]);

  /* Company arcs */
  const companyArcs = useMemo(() => {
    if (selected === null || selectedTheme === null) return [];
    const sec = sectorArcs[selected], theme = sec.themes[selectedTheme];
    if (!theme) return [];
    const tArc = themeArcs.find(t => t.sectorIdx === selected && t.themeIdx === selectedTheme);
    if (!tArc) return [];
    const cos = theme.companies, span = tArc.a2 - tArc.a1, cGap = toRad(0.3);
    const cSpan = (span - cGap * cos.length) / cos.length;
    let a = tArc.a1;
    return cos.map(c => { const arc = { ...c, a1: a + cGap / 2, a2: a + cSpan + cGap / 2, color: sec.color, held: isHeld(c.t) }; a += cSpan + cGap; return arc; });
  }, [selected, selectedTheme, sectorArcs, themeArcs]);

  /* Macro arcs */
  const macroArcs = useMemo(() => {
    const span = TAU / 3;
    return macrodynamics.map((m, i) => ({ ...m, a1: i * span + GAP / 2, a2: (i + 1) * span - GAP / 2 }));
  }, []);

  /* Tooltip */
  const tip = useMemo(() => {
    if (!hover) return null;
    const { ring, idx } = hover;
    if (ring === "macro") { const m = macroArcs[idx]; return { title: m.title, sub: `Touches ${m.sectorIds?.length || m.sectors} sectors`, color: m.color }; }
    if (ring === "sector") { const s = sectorArcs[idx]; const cN = s.themes.reduce((a, t) => a + t.companies.length, 0); const hN = s.themes.reduce((a, t) => a + t.companies.filter(c => isHeld(c.t)).length, 0); return { title: s.name, sub: `${s.weight}% · ${s.themes.length} themes · ${cN} cos · ${hN} held`, color: s.color }; }
    if (ring === "theme") { const t = themeArcs[idx]; const hN = t.companies.filter(c => isHeld(c.t)).length; return { title: t.name, sub: `${t.type} · ${t.companies.length} cos${hN ? ` · ${hN} held` : ""}`, color: t.color }; }
    if (ring === "company") { const c = companyArcs[idx]; return { title: `${c.n} (${c.t})`, sub: c.w, color: c.color }; }
    return null;
  }, [hover, macroArcs, sectorArcs, themeArcs, companyArcs]);

  /* Connection lines */
  const connLines = useMemo(() => {
    if (selected === null) return [];
    const sec = sectorArcs[selected], sm = midA(sec.a1, sec.a2);
    return macroArcs.filter(m => m.sectorIds?.includes(sec.id)).map(m => ({
      from: polar(CX, CY, R.macOut, midA(m.a1, m.a2)),
      to: polar(CX, CY, R.secIn, sm), color: m.color,
    }));
  }, [selected, sectorArcs, macroArcs, CX, CY]);

  const clickSector = useCallback(i => { if (selected === i) { setSelected(null); setSelectedTheme(null); } else { setSelected(i); setSelectedTheme(null); } }, [selected]);
  const clickTheme = useCallback((si, ti) => { if (selected !== si) { setSelected(si); setSelectedTheme(ti); } else if (selectedTheme === ti) { setSelectedTheme(null); } else { setSelectedTheme(ti); } }, [selected, selectedTheme]);

  /* Arc label */
  const arcLabel = (cx, cy, r, a1, a2, text, fs, color, id) => {
    const span = a2 - a1;
    if (span < toRad(8)) return null;
    const max = Math.floor((span * r) / (fs * 0.55));
    const txt = text.length > max ? text.slice(0, max - 1) + "…" : text;
    const m = midA(a1, a2), flip = m > Math.PI;
    const pA1 = flip ? a2 : a1, pA2 = flip ? a1 : a2;
    const p1 = polar(cx, cy, r, pA1), p2 = polar(cx, cy, r, pA2);
    const lg = Math.abs(pA2 - pA1) > Math.PI ? 1 : 0, sw = flip ? 0 : 1;
    const d = `M${p1.x},${p1.y} A${r},${r} 0 ${lg} ${sw} ${p2.x},${p2.y}`;
    return <g key={id}><defs><path id={id} d={d} /></defs><text fill={color} fontSize={fs} fontFamily={Fn} fontWeight="600" letterSpacing="0.02em"><textPath href={`#${id}`} startOffset="50%" textAnchor="middle">{txt}</textPath></text></g>;
  };

  /* Center allocation donut (when no sector selected) */
  const allocationDonut = useMemo(() => {
    if (selected !== null) return null;
    const weighted = sectors.filter(s => s.weight > 0).sort((a, b) => b.weight - a.weight);
    const total = weighted.reduce((s, sec) => s + sec.weight, 0);
    const r1 = R.core * 0.55, r2 = R.core * 0.82;
    let a = 0;
    return weighted.map((sec, i) => {
      const span = (sec.weight / total) * TAU;
      const a1 = a + toRad(0.8), a2 = a + span - toRad(0.8);
      a += span;
      if (a2 <= a1) return null;
      return <path key={sec.id} d={arcPath(CX, CY, r1, r2, a1, a2)} fill={sec.color + "50"} stroke={sec.color + "30"} strokeWidth={0.5} />;
    });
  }, [selected, CX, CY, R.core]);

  /* Detail panel */
  const detail = useMemo(() => {
    if (selected === null) return null;
    const sec = sectorArcs[selected];
    const allCos = sec.themes.flatMap(t => t.companies);
    const heldCos = allCos.filter(c => isHeld(c.t));
    return { sec, heldCos };
  }, [selected, sectorArcs]);

  return (
    <div ref={containerRef} style={{ fontFamily: Fn, color: T.text, display: "flex", flexDirection: "column", alignItems: "center", padding: "8px 0" }}>
      <div style={{ position: "relative", width: dims.w, height: dims.h }}>
        <svg viewBox={`0 0 ${dims.w} ${dims.h}`} width={dims.w} height={dims.h} style={{ opacity: anim ? 1 : 0, transition: "opacity 0.6s ease 0.15s" }}>
          <defs>
            <radialGradient id="ag" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor={T.purple || "#818CF8"} stopOpacity={isDark ? 0.04 : 0.02} /><stop offset="100%" stopColor="transparent" stopOpacity="0" /></radialGradient>
            <filter id="glow"><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>
          <circle cx={CX} cy={CY} r={R.coOut + 20 * sc} fill="url(#ag)" />

          {/* Guides */}
          {[R.macIn, R.secIn, R.thIn, R.coIn].map((r, i) => <circle key={i} cx={CX} cy={CY} r={r} fill="none" stroke={guide} strokeWidth={0.5} strokeDasharray="2,4" opacity={0.4} />)}

          {/* Connections */}
          {connLines.map((l, i) => <line key={`cn-${i}`} x1={l.from.x} y1={l.from.y} x2={l.to.x} y2={l.to.y} stroke={l.color} strokeWidth={1.5 * sc} strokeDasharray="4,4" opacity={0.3} />)}

          {/* MACRO */}
          {macroArcs.map((m, i) => {
            const hov = hover?.ring === "macro" && hover.idx === i;
            const linked = selected !== null && m.sectorIds?.includes(sectorArcs[selected].id);
            return <g key={`m${i}`}>
              <path d={arcPath(CX, CY, R.macIn, R.macOut, m.a1, m.a2)} fill={m.color + (linked ? "30" : hov ? "25" : isDark ? "12" : "0A")} stroke={m.color + (linked ? "80" : "40")} strokeWidth={linked ? 1.5 : 0.5} style={{ cursor: "pointer", transition: "all 0.25s" }} onMouseEnter={() => setHover({ ring: "macro", idx: i })} onMouseLeave={() => setHover(null)} />
              {arcLabel(CX, CY, (R.macIn + R.macOut) / 2, m.a1, m.a2, m.short, Math.max(7, 9 * sc), m.color, `ml${i}`)}
            </g>;
          })}

          {/* SECTORS */}
          {sectorArcs.map((sec, i) => {
            const sel = selected === i, hov = hover?.ring === "sector" && hover.idx === i;
            const dim = selected !== null && !sel;
            return <g key={`s${i}`}>
              <path d={arcPath(CX, CY, R.secIn, R.secOut, sec.a1, sec.a2)} fill={sec.color + (sel ? "35" : hov ? "20" : isDark ? "10" : "08")} stroke={sec.color + (sel ? "AA" : "50")} strokeWidth={sel ? 2 : 0.5} opacity={dim ? 0.25 : 1} style={{ cursor: "pointer", transition: "all 0.3s" }} onClick={() => clickSector(i)} onMouseEnter={() => setHover({ ring: "sector", idx: i })} onMouseLeave={() => setHover(null)} />
              {sec.weight > 0 && (() => { const p = polar(CX, CY, R.secIn + 18 * sc, midA(sec.a1, sec.a2)); return <text x={p.x} y={p.y} textAnchor="middle" dominantBaseline="central" fill={sec.color} fontSize={Math.max(8, 11 * sc)} fontWeight="800" fontFamily={Fn} opacity={dim ? 0.25 : 0.9} style={{ transition: "opacity 0.3s" }}>{sec.weight}%</text>; })()}
              {arcLabel(CX, CY, (R.secIn + R.secOut) / 2 + 8 * sc, sec.a1, sec.a2, sec.short, Math.max(7, 10 * sc), dim ? sec.color + "40" : sec.color, `sl${i}`)}
            </g>;
          })}

          {/* THEMES */}
          {themeArcs.map((t, i) => {
            const inSel = selected === t.sectorIdx, tSel = inSel && selectedTheme === t.themeIdx;
            const hov = hover?.ring === "theme" && hover.idx === i, dim = selected !== null && !inSel;
            const hasH = t.companies.some(c => isHeld(c.t));
            return <g key={`t${i}`}>
              <path d={arcPath(CX, CY, R.thIn, R.thOut, t.a1, t.a2)} fill={t.color + (tSel ? "30" : hov ? "18" : isDark ? "08" : "06")} stroke={t.color + (tSel ? "90" : inSel ? "50" : "20")} strokeWidth={tSel ? 2 : 0.5} opacity={dim ? 0.12 : 1} style={{ cursor: "pointer", transition: "all 0.3s" }} onClick={() => clickTheme(t.sectorIdx, t.themeIdx)} onMouseEnter={() => setHover({ ring: "theme", idx: i })} onMouseLeave={() => setHover(null)} />
              {hasH && !dim && (() => { const p = polar(CX, CY, R.thIn + 6 * sc, midA(t.a1, t.a2)); return <circle cx={p.x} cy={p.y} r={2.5 * sc} fill={t.color} opacity={0.7} />; })()}
              {(inSel || selected === null) && arcLabel(CX, CY, (R.thIn + R.thOut) / 2, t.a1, t.a2, t.name, Math.max(5.5, 7 * sc), dim ? t.color + "25" : t.color + "CC", `tl${i}`)}
            </g>;
          })}

          {/* COMPANIES */}
          {companyArcs.map((c, i) => {
            const hov = hover?.ring === "company" && hover.idx === i;
            return <g key={`c${i}`}>
              <path d={arcPath(CX, CY, R.coIn, R.coOut, c.a1, c.a2)} fill={c.held ? c.color + "30" : dimFill} stroke={c.held ? c.color + "AA" : c.color + "30"} strokeWidth={c.held ? 2 : 0.5} style={{ cursor: "pointer", transition: "all 0.3s" }} onMouseEnter={() => setHover({ ring: "company", idx: i })} onMouseLeave={() => setHover(null)} filter={hov ? "url(#glow)" : undefined} />
              {arcLabel(CX, CY, (R.coIn + R.coOut) / 2, c.a1, c.a2, c.t, Math.max(6, 8 * sc), c.held ? T.text : T.textTer, `cl${i}`)}
            </g>;
          })}

          {/* CENTER */}
          <circle cx={CX} cy={CY} r={R.core} fill={T.card} stroke={guide} strokeWidth={1} />
          {allocationDonut}
          {selected === null ? (
            <g>
              <text x={CX} y={CY - 8 * sc} textAnchor="middle" dominantBaseline="central" fill={T.text} fontSize={Math.max(14, 18 * sc)} fontWeight="700" fontFamily={Fn} letterSpacing="-0.03em">CEF</text>
              <text x={CX} y={CY + 10 * sc} textAnchor="middle" dominantBaseline="central" fill={T.textTer} fontSize={Math.max(7, 8 * sc)} fontFamily={Fn}>26 positions</text>
            </g>
          ) : (
            <g>
              <text x={CX} y={CY - 10 * sc} textAnchor="middle" dominantBaseline="central" fill={sectorArcs[selected].color} fontSize={Math.max(11, 14 * sc)} fontWeight="700" fontFamily={Fn} letterSpacing="-0.02em">{sectorArcs[selected].short}</text>
              <text x={CX} y={CY + 4 * sc} textAnchor="middle" dominantBaseline="central" fill={T.textSec} fontSize={Math.max(7, 8 * sc)} fontFamily={Fn}>{sectorArcs[selected].weight}% · {sectorArcs[selected].themes.length} themes</text>
              <text x={CX} y={CY + 17 * sc} textAnchor="middle" dominantBaseline="central" fill={T.textTer} fontSize={Math.max(6, 7 * sc)} fontFamily={Fn} style={{ cursor: "pointer" }} onClick={() => { setSelected(null); setSelectedTheme(null); }}>← back</text>
            </g>
          )}
        </svg>

        {/* Tooltip */}
        {tip && (
          <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", background: T.card, border: `1px solid ${tip.color}40`, borderRadius: T.radius, padding: "8px 14px", pointerEvents: "none", maxWidth: 300, textAlign: "center", boxShadow: T.shadowLg }}>
            <div style={{ fontSize: 13, fontWeight: 600, fontFamily: Fn, color: tip.color, marginBottom: 2 }}>{tip.title}</div>
            <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer }}>{tip.sub}</div>
          </div>
        )}
      </div>

      {/* Detail panel */}
      {detail && (
        <div style={{
          width: "100%", maxWidth: 700, marginTop: 12,
          background: T.card, borderRadius: T.radius, padding: "16px 20px",
          border: `1px solid ${detail.sec.color}20`, boxShadow: T.shadow,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ fontSize: 16, fontWeight: 700, fontFamily: Fn, color: detail.sec.color }}>{detail.sec.name}</span>
              {detail.sec.weight > 0 && <span style={{ fontSize: 12, fontFamily: Fn, color: T.textTer }}>{detail.sec.weight}% of NAV</span>}
            </div>
            <button onClick={() => { setSelected(null); setSelectedTheme(null); }} style={{ background: T.pillBg, border: `1px solid ${T.border}`, borderRadius: T.radiusSm, width: 26, height: 26, fontSize: 11, color: T.textTer, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
          </div>

          {/* Held strip */}
          {detail.heldCos.length > 0 && (
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 12 }}>
              {detail.heldCos.map(c => {
                const logo = logoUrl(c.t, c.n);
                return (
                  <div key={c.t} style={{ display: "flex", alignItems: "center", gap: 4, padding: "3px 7px 3px 3px", borderRadius: 5, background: detail.sec.color + (isDark ? "15" : "08"), border: `1px solid ${detail.sec.color}18` }}>
                    {logo && <img src={logo} alt="" style={{ width: 14, height: 14, borderRadius: 3 }} onError={e => e.target.style.display = "none"} />}
                    <span style={{ fontSize: 10, fontWeight: 700, fontFamily: Fn, color: T.text }}>{c.t}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Themes */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {detail.sec.themes.map((theme, ti) => {
              const isOpen = selectedTheme === ti;
              const heldN = theme.companies.filter(c => isHeld(c.t)).length;
              return (
                <div key={ti} style={{ borderRadius: T.radiusSm, border: `1px solid ${isOpen ? detail.sec.color + "40" : "transparent"}`, background: isOpen ? detail.sec.color + (isDark ? "06" : "03") : "transparent", transition: "all 0.2s" }}>
                  <div onClick={() => setSelectedTheme(isOpen ? null : ti)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", cursor: "pointer", borderRadius: T.radiusSm }}
                    onMouseEnter={e => { if (!isOpen) e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.012)"; }}
                    onMouseLeave={e => { if (!isOpen) e.currentTarget.style.background = "transparent"; }}>
                    <div style={{ width: 3, height: 16, borderRadius: 2, background: detail.sec.color, opacity: isOpen ? 1 : 0.3 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 11, fontWeight: 600, fontFamily: Fn, color: T.text }}>{theme.name}</span>
                        <span style={{ fontSize: 7, fontWeight: 700, fontFamily: Fn, padding: "2px 5px", borderRadius: 3, background: theme.type.includes("SECULAR") ? T.greenBg : (T.orange + (isDark ? "15" : "08")), color: theme.type.includes("SECULAR") ? T.green : T.orange, letterSpacing: "0.03em" }}>{theme.type.replace(" + ", "+")}</span>
                      </div>
                      {!isOpen && <div style={{ fontSize: 9, fontFamily: Fn, color: T.textTer, marginTop: 1 }}>{theme.companies.length} cos{heldN > 0 && <> · <span style={{ color: detail.sec.color, fontWeight: 600 }}>{heldN} held</span></>}</div>}
                    </div>
                    <span style={{ fontSize: 12, color: T.textTer, transition: "transform 0.2s", transform: isOpen ? "rotate(90deg)" : "rotate(0)" }}>›</span>
                  </div>
                  {isOpen && (
                    <div style={{ padding: "0 10px 10px 21px" }}>
                      {theme.companies.map((c, ci) => {
                        const held = isHeld(c.t);
                        const logo = logoUrl(c.t, c.n);
                        return (
                          <div key={ci} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "6px 8px", borderRadius: 6, marginTop: 4, background: held ? detail.sec.color + (isDark ? "0C" : "05") : (isDark ? "rgba(255,255,255,0.012)" : "rgba(0,0,0,0.006)"), border: `1px solid ${held ? detail.sec.color + "20" : T.border}` }}>
                            {logo && <img src={logo} alt="" style={{ width: 18, height: 18, borderRadius: 4, marginTop: 1, border: `1px solid ${T.border}` }} onError={e => e.target.style.display = "none"} />}
                            <div style={{ flex: 1 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
                                <span style={{ fontSize: 10, fontWeight: 700, fontFamily: Fn, color: T.text }}>{c.n}</span>
                                <span style={{ fontSize: 8, fontFamily: Fn, color: T.textTer }}>{c.t}</span>
                                {held && <span style={{ fontSize: 6, fontWeight: 800, fontFamily: Fn, padding: "1px 4px", borderRadius: 3, background: detail.sec.color + "20", color: detail.sec.color, letterSpacing: "0.04em" }}>HELD</span>}
                              </div>
                              <div style={{ fontSize: 9, color: T.textSec, fontFamily: Fn, lineHeight: 1.5, marginTop: 1 }}>{c.w}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Legend */}
      <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap", justifyContent: "center", opacity: anim ? 1 : 0, transition: "opacity 0.5s ease 0.3s" }}>
        {["Macro Forces", "Sectors", "Themes", "Companies"].map((l, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: ["#818CF820", "#60A5FA20", "#34D39920", "#F59E0B20"][i], border: `1px solid ${["#818CF8", "#60A5FA", "#34D399", "#F59E0B"][i]}50` }} />
            <span style={{ fontSize: 9, fontFamily: Fn, color: T.textTer }}>{l}</span>
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.green + "30", border: `1.5px solid ${T.green}` }} />
          <span style={{ fontSize: 9, fontFamily: Fn, color: T.textTer }}>= Held</span>
        </div>
      </div>
      <div style={{ fontSize: 9, fontFamily: Fn, color: T.textTer, textAlign: "center", marginTop: 12 }}>Cape Capital AG · Thematic Universe · March 2026</div>
    </div>
  );
}
