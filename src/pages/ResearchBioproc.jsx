import { useState, useMemo } from "react";
import { Fn, Fh } from "../theme";
import { Card, Pill } from "../components/shared";
import {
  heroStats, modalities, layers, nodes, flows,
  intro, dynamics, makeVsBuy, closingThoughts,
} from "../data/research-bioproc";

/* ═══════════════════════════════════════════════════════════════
   GEOMETRY HELPERS
   ═══════════════════════════════════════════════════════════════ */
const NODE_W = 156;
const NODE_H = 56;
const VB_W = 1140;
const VB_H = 600;

function nodeBox(n) {
  const layer = layers.find(l => l.id === n.layer);
  return {
    x: layer.xCenter - NODE_W / 2,
    y: n.yCenter - NODE_H / 2,
    cx: layer.xCenter,
    cy: n.yCenter,
    right: layer.xCenter + NODE_W / 2,
    left: layer.xCenter - NODE_W / 2,
  };
}

function bezierPath(a, b) {
  // a, b are node objects; draw from right edge of a to left edge of b
  const A = nodeBox(a), B = nodeBox(b);
  const x1 = A.right, y1 = A.cy;
  const x2 = B.left, y2 = B.cy;
  const dx = (x2 - x1) * 0.5;
  const c1x = x1 + dx, c1y = y1;
  const c2x = x2 - dx, c2y = y2;
  return `M ${x1} ${y1} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${x2} ${y2}`;
}

/* ═══════════════════════════════════════════════════════════════
   COLOR LOOKUP
   ═══════════════════════════════════════════════════════════════ */
function modColor(T, modId) {
  const m = modalities.find(m => m.id === modId);
  if (!m) return T.textTer;
  return T[m.color] || T.textSec;
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function ResearchBioproc({ T }) {
  const [tab, setTab] = useState("Value Chain Map");
  const [activeMod, setActiveMod] = useState("all");
  const [hoverNode, setHoverNode] = useState(null);
  const [pinNode, setPinNode] = useState(null);

  const selectedNode = pinNode || hoverNode;

  const matchesMod = (modList) =>
    activeMod === "all" || modList.includes(activeMod);

  // ─── Pre-compute flow visibility ──────────────────────────────
  const visibleFlows = useMemo(() => {
    return flows.map(f => {
      const a = nodes.find(n => n.id === f.from);
      const b = nodes.find(n => n.id === f.to);
      const passesMod = matchesMod(f.mods);
      const touchesHover = selectedNode && (f.from === selectedNode || f.to === selectedNode);
      const isVisible = passesMod;
      const isHighlighted = touchesHover && passesMod;
      // primary modality color for the flow — pick the first that's in the filter or in the flow
      const dominantMod = activeMod !== "all" && f.mods.includes(activeMod)
        ? activeMod
        : (f.mods[0] || "all");
      return { ...f, a, b, isVisible, isHighlighted, dominantMod };
    });
  }, [activeMod, selectedNode]);

  const nodeFaded = (n) => {
    if (activeMod !== "all" && !n.mods.includes(activeMod) && !n.mods.includes("all")) return true;
    if (selectedNode) {
      const isSelected = n.id === selectedNode;
      const isConnected = flows.some(f =>
        (f.from === selectedNode && f.to === n.id) ||
        (f.to === selectedNode && f.from === n.id)
      );
      if (!isSelected && !isConnected) return true;
    }
    return false;
  };

  /* ─── HEADER ────────────────────────────────────────────────── */
  const header = (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
        <span style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 36, color: T.text }}>
          Bioprocessing Value Chain
        </span>
        <Pill T={T} color={T.deepBlue} bg={"rgba(29,78,216,0.08)"}>Thematic Map</Pill>
      </div>
      <div style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, marginBottom: 16 }}>
        How tools, contract manufacturers, drug innovators, and end markets fit together — and where the durable economics live
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 10 }}>
        {heroStats.map((s, i) => (
          <div key={i} style={{
            background: T.card, borderRadius: T.radiusSm, padding: "12px 14px",
            border: "1px solid " + T.border,
          }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: T[s.color] || T.text, fontFamily: Fn }}>{s.value}</div>
            <div style={{ fontSize: 9.5, color: T.textTer, fontFamily: Fn, marginTop: 3, lineHeight: 1.4 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );

  /* ─── TABS ──────────────────────────────────────────────────── */
  const tabBar = (
    <div style={{ display: "flex", gap: 4, background: T.pillBg, borderRadius: T.radiusSm, padding: 3, marginBottom: 24, flexWrap: "wrap" }}>
      {["Value Chain Map", "Key Dynamics"].map(t => (
        <button key={t} onClick={() => setTab(t)} style={{
          padding: "8px 14px", borderRadius: 6, border: "none", fontSize: 12, fontFamily: Fn,
          fontWeight: tab === t ? 600 : 400, background: tab === t ? T.card : "transparent",
          color: tab === t ? T.text : T.textTer, cursor: "pointer", transition: "all 0.15s",
          boxShadow: tab === t ? T.shadow : "none", whiteSpace: "nowrap",
        }}>{t}</button>
      ))}
    </div>
  );

  /* ─── MODALITY FILTER ───────────────────────────────────────── */
  const modBar = (
    <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
      <span style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginRight: 4 }}>Filter by modality:</span>
      {modalities.map(m => {
        const c = T[m.color] || T.textSec;
        const isActive = activeMod === m.id;
        return (
          <button key={m.id} onClick={() => setActiveMod(m.id)} style={{
            padding: "6px 12px", borderRadius: 999, border: "1px solid " + (isActive ? c : T.border),
            fontSize: 11, fontFamily: Fn, fontWeight: isActive ? 600 : 400,
            background: isActive ? c + "18" : T.card, color: isActive ? c : T.textSec,
            cursor: "pointer", transition: "all 0.15s", display: "flex", alignItems: "center", gap: 6,
          }}>
            {m.id !== "all" && (
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: c }} />
            )}
            {m.label}
          </button>
        );
      })}
      {(hoverNode || pinNode) && (
        <button onClick={() => { setHoverNode(null); setPinNode(null); }} style={{
          marginLeft: "auto", padding: "6px 12px", borderRadius: 999, border: "1px solid " + T.border,
          fontSize: 11, fontFamily: Fn, background: "transparent", color: T.textSec, cursor: "pointer",
        }}>
          Clear selection
        </button>
      )}
    </div>
  );

  /* ─── DIAGRAM SVG ───────────────────────────────────────────── */
  const diagram = (
    <Card T={T} style={{ padding: 20, marginBottom: 20, overflow: "hidden" }}>
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        style={{ width: "100%", height: "auto", display: "block" }}
        onClick={() => setPinNode(null)}
      >
        {/* Layer headers */}
        {layers.map((l, i) => (
          <g key={l.id}>
            <text x={l.xCenter} y={22} textAnchor="middle" fontFamily={Fn} fontSize="13" fontWeight="600" fill={T.text}>
              {l.title}
            </text>
            <text x={l.xCenter} y={40} textAnchor="middle" fontFamily={Fn} fontSize="10" fill={T.textTer}>
              {l.subtitle}
            </text>
            <line x1={l.xCenter - 80} y1={50} x2={l.xCenter + 80} y2={50} stroke={T.border} strokeWidth="1" />
          </g>
        ))}

        {/* Flows */}
        {visibleFlows.map((f, i) => {
          if (!f.isVisible) return null;
          const color = modColor(T, f.dominantMod);
          const baseOpacity = f.isHighlighted ? 0.85 : (selectedNode ? 0.05 : (activeMod === "all" ? 0.18 : 0.32));
          const strokeWidth = f.isHighlighted ? 2.2 : 1.2;
          return (
            <path
              key={`${f.from}-${f.to}-${i}`}
              d={bezierPath(f.a, f.b)}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              opacity={baseOpacity}
              style={{ transition: "all 0.2s" }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map(n => {
          const box = nodeBox(n);
          const isSelected = selectedNode === n.id;
          const fade = nodeFaded(n);
          const nodeColor = T[n.color] || T.textSec;
          return (
            <g
              key={n.id}
              transform={`translate(${box.x}, ${box.y})`}
              style={{ cursor: "pointer", transition: "all 0.2s", opacity: fade ? 0.32 : 1 }}
              onMouseEnter={() => !pinNode && setHoverNode(n.id)}
              onMouseLeave={() => !pinNode && setHoverNode(null)}
              onClick={(e) => {
                e.stopPropagation();
                setPinNode(pinNode === n.id ? null : n.id);
              }}
            >
              {/* Card */}
              <rect
                width={NODE_W} height={NODE_H} rx={8} ry={8}
                fill={T.card}
                stroke={isSelected ? nodeColor : T.border}
                strokeWidth={isSelected ? 2 : 1}
                style={{ filter: isSelected ? `drop-shadow(0 4px 12px ${nodeColor}30)` : "none", transition: "all 0.2s" }}
              />
              {/* Top color strip */}
              <rect
                x={0} y={0} width={NODE_W} height={3}
                rx={2} ry={2}
                fill={nodeColor}
                opacity={isSelected ? 1 : 0.55}
              />
              {/* Name */}
              <text x={12} y={22} fontFamily={Fn} fontSize="12" fontWeight="600" fill={T.text}>
                {n.name.length > 22 ? n.name.slice(0, 20) + "…" : n.name}
              </text>
              {/* Ticker or subtitle */}
              <text x={12} y={36} fontFamily={Fn} fontSize="10" fill={T.textTer}>
                {n.ticker || (n.sub && n.sub.length > 26 ? n.sub.slice(0, 24) + "…" : n.sub) || ""}
              </text>
              {/* Modality dots */}
              <g transform={`translate(12, 46)`}>
                {modalities.filter(m => m.id !== "all" && n.mods.includes(m.id)).map((m, i) => (
                  <circle
                    key={m.id}
                    cx={i * 9} cy={0} r={3}
                    fill={T[m.color]}
                    opacity={activeMod === "all" || activeMod === m.id ? 0.9 : 0.25}
                  />
                ))}
              </g>
            </g>
          );
        })}

        {/* Hint when nothing selected */}
        {!selectedNode && (
          <text x={VB_W / 2} y={VB_H - 14} textAnchor="middle" fontFamily={Fn} fontSize="10.5" fill={T.textTer}>
            Hover any node for details · click to pin · use modality filter to isolate a single therapeutic class
          </text>
        )}
      </svg>
    </Card>
  );

  /* ─── DETAIL PANEL ──────────────────────────────────────────── */
  const detailPanel = (() => {
    const n = selectedNode ? nodes.find(x => x.id === selectedNode) : null;
    if (!n) {
      return (
        <Card T={T} style={{ padding: 24 }}>
          <div style={{ fontSize: 13, color: T.textTer, fontFamily: Fn, lineHeight: 1.7 }}>
            <strong style={{ color: T.textSec, fontWeight: 600 }}>How to read this diagram.</strong> Each column is a layer in the bioprocessing value chain — tools and equipment on the left, manufacturing in the middle, drug innovators on the right, end market at the far right. Arrows show where products and money flow. The colored dots on each card indicate which therapeutic modalities the entity touches.
            <br /><br />
            Use the modality filter to isolate a single therapeutic class — for example, click "ADCs" to see how Lonza dominates that pocket while Samsung Biologics has limited exposure. Click any node to pin its detail panel here.
          </div>
        </Card>
      );
    }
    const c = T[n.color] || T.textSec;
    const d = n.detail;
    return (
      <Card T={T} style={{ padding: 0, overflow: "hidden", borderTop: `3px solid ${c}` }}>
        <div style={{ padding: "22px 24px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
            <span style={{ fontSize: 17, fontWeight: 600, color: T.text, fontFamily: Fn }}>{n.name}</span>
            {n.ticker && (
              <span style={{ fontSize: 11, fontWeight: 600, color: T.textTer, fontFamily: Fn, letterSpacing: "0.03em" }}>
                {n.ticker}
              </span>
            )}
          </div>
          {n.sub && <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 12 }}>{n.sub}</div>}
          <div style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.6, marginBottom: 16 }}>{n.role}</div>

          <div style={{ display: "flex", gap: 6, marginBottom: 18, flexWrap: "wrap" }}>
            {modalities.filter(m => m.id !== "all" && n.mods.includes(m.id)).map(m => (
              <Pill key={m.id} T={T} color={T[m.color]} bg={T[m.color] + "12"}>{m.label}</Pill>
            ))}
          </div>

          {d && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { l: "Revenue", v: d.revenue },
                { l: "Market cap", v: d.cap },
                { l: "Headquarters", v: d.hq },
                { l: "Exposure", v: d.exposure },
                { l: "Key assets", v: d.assets },
                { l: "Relationships", v: d.relationships },
              ].filter(x => x.v && x.v !== "—" && x.v !== "n/a").map((x, i) => (
                <div key={i}>
                  <div style={{ fontSize: 9.5, color: T.textTer, fontFamily: Fn, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 2 }}>{x.l}</div>
                  <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.55 }}>{x.v}</div>
                </div>
              ))}
              {d.thesis && (
                <div style={{ marginTop: 10, padding: "12px 14px", background: c + "0D", borderRadius: T.radiusSm, borderLeft: `3px solid ${c}` }}>
                  <div style={{ fontSize: 9.5, color: c, fontFamily: Fn, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 4, fontWeight: 600 }}>Cape view</div>
                  <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.6 }}>{d.thesis}</div>
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    );
  })();

  /* ─── VALUE CHAIN MAP TAB ───────────────────────────────────── */
  const mapTab = (
    <div>
      {modBar}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 360px", gap: 20, alignItems: "start" }}>
        <div style={{ minWidth: 0 }}>{diagram}</div>
        <div style={{ position: "sticky", top: 20 }}>{detailPanel}</div>
      </div>
    </div>
  );

  /* ─── KEY DYNAMICS TAB ─────────────────────────────────────── */
  const prose = (text, s = {}) => (
    <p style={{ fontSize: 13.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.8, margin: "0 0 16px", ...s }}>{text}</p>
  );
  const sTitle = (t) => (
    <div style={{ fontSize: 16, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 12, letterSpacing: "-0.01em" }}>{t}</div>
  );

  const dynamicsTab = (
    <div>
      {intro.map((p, i) => prose(p, { key: i }))}
      <div style={{ height: 12 }} />
      {sTitle("Six structural observations")}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: 14, marginBottom: 28 }}>
        {dynamics.map((d, i) => (
          <Card key={i} T={T} style={{ padding: "20px 22px" }}>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 8, lineHeight: 1.4 }}>{d.title}</div>
            <div style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.7 }}>{d.body}</div>
          </Card>
        ))}
      </div>

      <Card T={T} style={{ padding: "22px 24px", marginBottom: 20, borderLeft: `3px solid ${T.capRed}` }}>
        <div style={{ fontSize: 9.5, color: T.capRed, fontFamily: Fn, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 8, fontWeight: 600 }}>The make-vs-buy decision</div>
        <div style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 10 }}>{makeVsBuy.title}</div>
        <div style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75 }}>{makeVsBuy.body}</div>
      </Card>

      <div style={{ padding: "18px 22px", borderRadius: T.radius, background: T.text === "#0F172A" ? "rgba(155,27,27,0.04)" : "rgba(239,68,68,0.06)", border: "1px solid " + T.border }}>
        <div style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75 }}>
          <strong style={{ color: T.capRed }}>Bottom line.</strong> {closingThoughts}
        </div>
      </div>
    </div>
  );

  /* ─── RENDER ────────────────────────────────────────────────── */
  return (
    <div>
      {header}
      {tabBar}
      {tab === "Value Chain Map" ? mapTab : dynamicsTab}
    </div>
  );
}
