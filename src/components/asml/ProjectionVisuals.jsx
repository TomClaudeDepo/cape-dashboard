import { useEffect, useRef, useState } from "react";
import { Fn } from "../../theme";

/* ════════════════════════════════════════════════════════════════
   Shared helpers (kept local to avoid cross-file coupling)
   ════════════════════════════════════════════════════════════════ */
function PlayPauseButton({ T, running, onToggle }) {
  return (
    <button onClick={onToggle} style={{
      background: T.pillBg, border: "1px solid " + T.border, borderRadius: T.radiusSm,
      padding: "5px 12px", fontSize: 10, fontFamily: Fn, color: T.textSec, cursor: "pointer",
      letterSpacing: "0.04em",
    }}>{running ? "Pause" : "Play"}</button>
  );
}

function CaptionRow({ T, caption, right }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
      <div style={{ fontSize: 10.5, color: T.textTer, fontFamily: Fn, letterSpacing: "0.04em" }}>{caption}</div>
      {right}
    </div>
  );
}

function useInViewRunning(running) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.1 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, running && inView];
}

/* ════════════════════════════════════════════════════════════════
   P1 — Projection optics box
   Schematic of six curved mirrors with the EUV beam folding through
   them on its way from reticle to wafer. The geometry is stylised
   but preserves the up/down folding character of real EUV POBs.
   ════════════════════════════════════════════════════════════════ */
export function P1_ProjectionOptics({ T }) {
  const [running, setRunning] = useState(true);
  const [containerRef, eff] = useInViewRunning(running);
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!eff) return;
    const id = setInterval(() => setTick(v => v + 1), 60);
    return () => clearInterval(id);
  }, [eff]);

  const W = 720, H = 320;

  // Reticle (top) and wafer (bottom) anchors
  const reticle = { x: 110, y: 36 };
  const wafer = { x: W - 110, y: H - 36 };

  // Six curved mirror positions, folding the beam through the box.
  // Each entry: { cx, cy, rx, ry, orient } — orient is the concave-facing direction.
  const mirrors = [
    { id: "M1", x: 220, y: 80,  angle: 30 },
    { id: "M2", x: 320, y: 220, angle: -25 },
    { id: "M3", x: 440, y: 90,  angle: 35 },
    { id: "M4", x: 540, y: 230, angle: -30 },
    { id: "M5", x: 620, y: 130, angle: 20 },
    { id: "M6", x: 540, y: H - 70, angle: -45 },
  ];

  // Beam path through reticle -> M1 -> M2 -> ... -> M6 -> wafer
  const path = [reticle, ...mirrors.map(m => ({ x: m.x, y: m.y })), wafer];

  // Compute cumulative segment lengths so we can animate a photon along
  // the full path at constant visual speed.
  const segments = [];
  let total = 0;
  for (let i = 0; i < path.length - 1; i++) {
    const a = path[i], b = path[i + 1];
    const len = Math.hypot(b.x - a.x, b.y - a.y);
    segments.push({ a, b, len, start: total });
    total += len;
  }
  // Photon position
  const cyclePeriod = 100;
  const phase = (tick % cyclePeriod) / cyclePeriod;
  const target = phase * total;
  let photonX = reticle.x, photonY = reticle.y;
  for (const seg of segments) {
    if (target >= seg.start && target <= seg.start + seg.len) {
      const p = (target - seg.start) / seg.len;
      photonX = seg.a.x + (seg.b.x - seg.a.x) * p;
      photonY = seg.a.y + (seg.b.y - seg.a.y) * p;
      break;
    }
  }

  return (
    <div ref={containerRef}>
      <CaptionRow T={T} caption="SCHEMATIC · SIX MIRRORS FOLD THE BEAM FROM RETICLE TO WAFER"
        right={<PlayPauseButton T={T} running={running} onToggle={() => setRunning(!running)} />} />
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
        {/* Box envelope */}
        <rect x="40" y="20" width={W - 80} height={H - 40} fill="none" stroke={T.border} strokeWidth="1" strokeDasharray="2 4" rx="6" />
        <text x="50" y="36" fontSize="9" fill={T.textTer} fontFamily={Fn} letterSpacing="0.08em">PROJECTION OPTICS BOX · VACUUM · TEMPERATURE-CONTROLLED</text>

        {/* Beam path (full path, faint) */}
        <polyline
          points={path.map(p => `${p.x},${p.y}`).join(" ")}
          fill="none" stroke={T.deepBlue} strokeWidth="1.2" opacity="0.32" strokeDasharray="3 3" />

        {/* Reticle (top input) */}
        <rect x={reticle.x - 40} y={reticle.y - 8} width="80" height="14" fill={T.purple} opacity="0.85" rx="2" />
        <text x={reticle.x} y={reticle.y - 14} textAnchor="middle" fontSize="10" fontWeight="700" fill={T.text} fontFamily={Fn}>Reticle in</text>

        {/* Wafer (bottom output) */}
        <rect x={wafer.x - 40} y={wafer.y - 6} width="80" height="14" fill={T.green} opacity="0.85" rx="2" />
        <text x={wafer.x} y={wafer.y + 22} textAnchor="middle" fontSize="10" fontWeight="700" fill={T.text} fontFamily={Fn}>Wafer out</text>

        {/* Six curved mirrors */}
        {mirrors.map((m) => {
          const rx = 26, ry = 5;
          return (
            <g key={m.id} transform={`translate(${m.x}, ${m.y}) rotate(${m.angle})`}>
              {/* mirror body */}
              <ellipse cx="0" cy="0" rx={rx} ry={ry} fill={T.deepBlue} opacity="0.85" />
              {/* reflective highlight */}
              <ellipse cx="0" cy={-ry * 0.4} rx={rx * 0.85} ry={ry * 0.35} fill="#fff" opacity="0.45" />
              {/* mirror label */}
              <text x="0" y={ry + 14} textAnchor="middle" fontSize="9" fontWeight="700" fill={T.text} fontFamily={Fn}
                transform={`rotate(${-m.angle})`}>{m.id}</text>
            </g>
          );
        })}

        {/* Animated photon traversing the path */}
        <circle cx={photonX} cy={photonY} r="4.5" fill={T.capRed}
          style={{ filter: `drop-shadow(0 0 4px ${T.capRed})` }} />

        {/* Right-side stats panel */}
        <g transform={`translate(${W - 200}, 56)`}>
          <rect x="0" y="0" width="170" height="86" rx="6"
            fill={T.deepBlue} opacity={T.text === "#0F172A" ? 0.06 : 0.12} />
          <text x="12" y="18" fontSize="10" fontWeight="700" fill={T.deepBlue} fontFamily={Fn} letterSpacing="0.06em">PROJECTION OPTICS</text>
          <text x="12" y="38" fontSize="11" fill={T.text} fontFamily={Fn}>6 curved mirrors</text>
          <text x="12" y="54" fontSize="11" fill={T.text} fontFamily={Fn}>Atomic tolerance figure</text>
          <text x="12" y="74" fontSize="10" fill={T.textSec} fontFamily={Fn} fontStyle="italic">Zeiss SMT, sole supplier</text>
        </g>

        {/* Bottom note */}
        <text x="50" y={H - 12} fontSize="10" fill={T.textTer} fontFamily={Fn}>
          Each mirror is figured to sub-nanometre form accuracy across its full aperture.
        </text>
      </svg>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   P2 — The exposure slit
   Top-down view of a 300mm wafer with the slit field highlighted.
   The slit prints one ~26 x 33mm field per shot. ~100 fields total.
   ════════════════════════════════════════════════════════════════ */
export function P2_ExposureSlit({ T }) {
  const [running, setRunning] = useState(true);
  const [containerRef, eff] = useInViewRunning(running);
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!eff) return;
    const id = setInterval(() => setTick(v => v + 1), 500);
    return () => clearInterval(id);
  }, [eff]);

  const W = 720, H = 320;
  const wafer = { cx: 230, cy: H / 2, r: 130 };

  // Grid of fields: 26x33mm fields on a 300mm wafer. Approximate by 8 wide x 7 tall grid.
  const cols = 8, rows = 7;
  const fieldW = 32, fieldH = 38; // visual proportions roughly 26:33
  const gridLeft = wafer.cx - (cols * fieldW) / 2;
  const gridTop = wafer.cy - (rows * fieldH) / 2;
  const fields = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = gridLeft + c * fieldW;
      const y = gridTop + r * fieldH;
      const fx = x + fieldW / 2, fy = y + fieldH / 2;
      const dx = fx - wafer.cx, dy = fy - wafer.cy;
      // Use slightly tighter radius so partial-fields at the edge are excluded
      if (Math.hypot(dx, dy) < wafer.r - 8) {
        fields.push({ x, y, idx: fields.length });
      }
    }
  }

  // Active highlighted field cycles
  const activeIdx = tick % Math.max(1, fields.length);

  return (
    <div ref={containerRef}>
      <CaptionRow T={T} caption="300mm WAFER · ONE EXPOSURE PRINTS A 26 × 33 mm SLIT FIELD"
        right={<PlayPauseButton T={T} running={running} onToggle={() => setRunning(!running)} />} />
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
        {/* Wafer outline + notch */}
        <circle cx={wafer.cx} cy={wafer.cy} r={wafer.r + 4} fill="none" stroke={T.border} strokeWidth="1" />
        <circle cx={wafer.cx} cy={wafer.cy} r={wafer.r} fill={T.pillBg} />
        <path d={`M ${wafer.cx - 7} ${wafer.cy + wafer.r} L ${wafer.cx} ${wafer.cy + wafer.r - 10} L ${wafer.cx + 7} ${wafer.cy + wafer.r}`}
          fill={T.pillBg} stroke={T.border} strokeWidth="1" />

        {/* Field grid (clipped to wafer) */}
        {fields.map((f) => (
          <rect key={f.idx} x={f.x + 1} y={f.y + 1} width={fieldW - 2} height={fieldH - 2}
            fill={f.idx === activeIdx ? T.capRed : T.card}
            opacity={f.idx === activeIdx ? 0.85 : 0.55}
            stroke={T.border} strokeWidth="0.5"
            style={{ transition: "fill 0.2s, opacity 0.2s" }} />
        ))}

        {/* Crosshair on active field */}
        {fields[activeIdx] && (() => {
          const f = fields[activeIdx];
          const fx = f.x + fieldW / 2, fy = f.y + fieldH / 2;
          return (
            <g>
              <line x1={fx - fieldW / 2 - 14} y1={fy} x2={fx - fieldW / 2 - 4} y2={fy} stroke={T.capRed} strokeWidth="1.2" />
              <line x1={fx + fieldW / 2 + 4} y1={fy} x2={fx + fieldW / 2 + 14} y2={fy} stroke={T.capRed} strokeWidth="1.2" />
              <line x1={fx} y1={fy - fieldH / 2 - 14} x2={fx} y2={fy - fieldH / 2 - 4} stroke={T.capRed} strokeWidth="1.2" />
              <line x1={fx} y1={fy + fieldH / 2 + 4} x2={fx} y2={fy + fieldH / 2 + 14} stroke={T.capRed} strokeWidth="1.2" />
            </g>
          );
        })()}

        {/* 300mm diameter scale */}
        <line x1={wafer.cx - wafer.r - 4} y1={wafer.cy + wafer.r + 28} x2={wafer.cx + wafer.r + 4} y2={wafer.cy + wafer.r + 28}
          stroke={T.textTer} strokeWidth="0.8" />
        <line x1={wafer.cx - wafer.r - 4} y1={wafer.cy + wafer.r + 24} x2={wafer.cx - wafer.r - 4} y2={wafer.cy + wafer.r + 32}
          stroke={T.textTer} strokeWidth="0.8" />
        <line x1={wafer.cx + wafer.r + 4} y1={wafer.cy + wafer.r + 24} x2={wafer.cx + wafer.r + 4} y2={wafer.cy + wafer.r + 32}
          stroke={T.textTer} strokeWidth="0.8" />
        <text x={wafer.cx} y={wafer.cy + wafer.r + 44} textAnchor="middle" fontSize="10" fontWeight="700" fill={T.text} fontFamily={Fn}>300 mm</text>

        {/* Right-side stats */}
        <g transform={`translate(${wafer.cx + wafer.r + 60}, 50)`}>
          <text x="0" y="0" fontSize="10" fontWeight="700" fill={T.textTer} fontFamily={Fn} letterSpacing="0.06em">PER WAFER</text>
          <text x="0" y="26" fontSize="24" fontWeight="800" fill={T.capRed} fontFamily={Fn}>~{fields.length}</text>
          <text x="0" y="42" fontSize="10" fill={T.textSec} fontFamily={Fn}>die fields per wafer</text>

          <text x="0" y="76" fontSize="10" fontWeight="700" fill={T.textTer} fontFamily={Fn} letterSpacing="0.06em">PER FIELD</text>
          <text x="0" y="100" fontSize="18" fontWeight="800" fill={T.text} fontFamily={Fn}>26 × 33 mm</text>
          <text x="0" y="116" fontSize="10" fill={T.textSec} fontFamily={Fn}>slit field dimensions</text>

          <text x="0" y="150" fontSize="10" fontWeight="700" fill={T.textTer} fontFamily={Fn} letterSpacing="0.06em">EXPOSURE TIME</text>
          <text x="0" y="174" fontSize="18" fontWeight="800" fill={T.text} fontFamily={Fn}>25-35 s</text>
          <text x="0" y="190" fontSize="10" fill={T.textSec} fontFamily={Fn}>per die field</text>
        </g>

        {/* Bottom note */}
        <text x={wafer.cx} y={H - 10} textAnchor="middle" fontSize="10" fill={T.textTer} fontFamily={Fn}>
          Scanner steps to next field, exposes, steps again. Repeat until the wafer is done.
        </text>
      </svg>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   P4 — The printed wafer
   Close-up of a single die. Toggle between "before" (uniform
   photoresist) and "after" (patterned features after development).
   ════════════════════════════════════════════════════════════════ */
export function P4_PrintedWafer({ T }) {
  const [mode, setMode] = useState("after"); // "before" or "after"
  const W = 720, H = 280;

  // Die outline
  const die = { x: 60, y: 50, w: 480, h: H - 110 };

  // Generate a pseudo-chip layout: vertical lines, blocks, vias
  // Deterministic but visually rich. Coordinates are in die-local space.
  const lines = [];
  for (let i = 0; i < 60; i++) {
    lines.push({
      x: die.x + 12 + i * 8,
      y1: die.y + 10,
      y2: die.y + die.h - 10,
      w: 1.2,
    });
  }
  // Horizontal cross-tracks
  const xtracks = [];
  for (let i = 0; i < 8; i++) {
    xtracks.push({
      y: die.y + 20 + i * 22,
      x1: die.x + 14, x2: die.x + die.w - 14,
      w: 0.8,
    });
  }
  // Larger block features (logic blocks)
  const blocks = [
    { x: die.x + 30,  y: die.y + 26, w: 90, h: 50 },
    { x: die.x + 140, y: die.y + 26, w: 60, h: 50 },
    { x: die.x + 220, y: die.y + 26, w: 100, h: 40 },
    { x: die.x + 30,  y: die.y + 90, w: 130, h: 36 },
    { x: die.x + 180, y: die.y + 90, w: 80, h: 36 },
    { x: die.x + 280, y: die.y + 90, w: 90, h: 36 },
    { x: die.x + 30,  y: die.y + 140, w: 60, h: 32 },
    { x: die.x + 100, y: die.y + 140, w: 90, h: 32 },
    { x: die.x + 200, y: die.y + 140, w: 70, h: 32 },
    { x: die.x + 290, y: die.y + 140, w: 80, h: 32 },
  ];

  return (
    <div>
      <CaptionRow T={T} caption="CLOSE-UP · ONE DIE · BEFORE AND AFTER DEVELOPMENT"
        right={
          <div style={{ display: "flex", gap: 4, background: T.pillBg, borderRadius: T.radiusSm, padding: 3 }}>
            {["before", "after"].map(m => (
              <button key={m} onClick={() => setMode(m)} style={{
                padding: "5px 12px", borderRadius: 6, border: "none", fontSize: 10, fontFamily: Fn,
                fontWeight: mode === m ? 700 : 500, background: mode === m ? T.card : "transparent",
                color: mode === m ? T.text : T.textTer, cursor: "pointer", transition: "all 0.15s",
                letterSpacing: "0.04em", textTransform: "uppercase",
                boxShadow: mode === m ? T.shadow : "none",
              }}>{m}</button>
            ))}
          </div>
        } />
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
        {/* Die background — photoresist colour */}
        <rect x={die.x} y={die.y} width={die.w} height={die.h}
          fill={mode === "before" ? "#FCE99F" : T.card}
          stroke={T.border} strokeWidth="1.2" rx="4"
          style={{ transition: "fill 0.4s" }} />

        {/* Die label */}
        <text x={die.x} y={die.y - 8} fontSize="10" fontWeight="700" fill={T.text} fontFamily={Fn}>One die · {mode === "before" ? "uniform photoresist" : "patterned after develop"}</text>

        {/* Pattern features — only visible in "after" */}
        <g opacity={mode === "after" ? 1 : 0} style={{ transition: "opacity 0.5s" }}>
          {/* Logic blocks */}
          {blocks.map((b, i) => (
            <rect key={`b${i}`} x={b.x} y={b.y} width={b.w} height={b.h}
              fill={T.deepBlue} opacity="0.18" rx="1" />
          ))}
          {/* Vertical tracks */}
          {lines.map((l, i) => (
            <line key={`v${i}`} x1={l.x} y1={l.y1} x2={l.x} y2={l.y2}
              stroke={T.deepBlue} strokeWidth={l.w} opacity="0.55" />
          ))}
          {/* Horizontal tracks */}
          {xtracks.map((t, i) => (
            <line key={`h${i}`} x1={t.x1} y1={t.y} x2={t.x2} y2={t.y}
              stroke={T.purple} strokeWidth={t.w} opacity="0.45" />
          ))}
          {/* Vias (small dots) */}
          {blocks.map((b, i) => (
            <g key={`via${i}`}>
              <circle cx={b.x + 8} cy={b.y + 6} r="1.2" fill={T.capRed} />
              <circle cx={b.x + b.w - 8} cy={b.y + 6} r="1.2" fill={T.capRed} />
              <circle cx={b.x + 8} cy={b.y + b.h - 6} r="1.2" fill={T.capRed} />
              <circle cx={b.x + b.w - 8} cy={b.y + b.h - 6} r="1.2" fill={T.capRed} />
            </g>
          ))}
        </g>

        {/* Scale bar */}
        <g transform={`translate(${die.x + die.w - 64}, ${die.y + die.h + 14})`}>
          <line x1="0" y1="0" x2="50" y2="0" stroke={T.text} strokeWidth="1.4" />
          <line x1="0" y1="-3" x2="0" y2="3" stroke={T.text} strokeWidth="1.4" />
          <line x1="50" y1="-3" x2="50" y2="3" stroke={T.text} strokeWidth="1.4" />
          <text x="25" y="14" textAnchor="middle" fontSize="9" fill={T.textTer} fontFamily={Fn}>schematic scale</text>
        </g>

        {/* Layer-count callout, right side */}
        <g transform={`translate(${die.x + die.w + 40}, ${die.y + 10})`}>
          <rect x="0" y="0" width="130" height="170" rx="6"
            fill={T.green} opacity={T.text === "#0F172A" ? 0.07 : 0.14} />
          <text x="12" y="20" fontSize="10" fontWeight="700" fill={T.green} fontFamily={Fn} letterSpacing="0.06em">THIS IS ONE LAYER</text>
          <text x="12" y="44" fontSize="26" fontWeight="800" fill={T.green} fontFamily={Fn}>×60+</text>
          <text x="12" y="62" fontSize="10" fill={T.text} fontFamily={Fn}>total layers per chip</text>
          <text x="12" y="92" fontSize="10" fill={T.textSec} fontFamily={Fn}>Each EUV layer needs its</text>
          <text x="12" y="106" fontSize="10" fill={T.textSec} fontFamily={Fn}>own reticle, alignment,</text>
          <text x="12" y="120" fontSize="10" fill={T.textSec} fontFamily={Fn}>exposure and develop.</text>
          <text x="12" y="146" fontSize="10" fontWeight="700" fill={T.text} fontFamily={Fn}>Leading-edge chips need</text>
          <text x="12" y="160" fontSize="10" fontWeight="700" fill={T.text} fontFamily={Fn}>dozens of EUV layers.</text>
        </g>
      </svg>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   P5 — Throughput
   How many wafers per hour the tool processes. A horizontal bar of
   wafer glyphs accumulating to ~200/hour, then a multiplier to
   ~5,000/day with realistic uptime.
   ════════════════════════════════════════════════════════════════ */
export function P5_Throughput({ T }) {
  const [running, setRunning] = useState(true);
  const [containerRef, eff] = useInViewRunning(running);
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!eff) return;
    const id = setInterval(() => setTick(v => v + 1), 90);
    return () => clearInterval(id);
  }, [eff]);

  const W = 720, H = 280;

  // We show 24 columns (one per hour) of stacked wafer dots.
  // At ~200 wafers/hour, we display 10 dots per hour to keep things readable
  // (real throughput is reflected in the label, not literal dot count).
  const hours = 24;
  const dotsPerHour = 9;
  const colX0 = 60;
  const colW = (W - 220) / hours;
  const baseY = 200;

  // Animate fill: dots fill column-by-column over a cycle
  const cyclePeriod = 60; // ticks per full cycle ~5.4s
  const phase = (tick % cyclePeriod) / cyclePeriod;
  const filledHours = Math.floor(phase * hours);
  const partialFrac = (phase * hours) - filledHours;

  return (
    <div ref={containerRef}>
      <CaptionRow T={T} caption="WAFERS PER HOUR · ACCUMULATING ACROSS A 24-HOUR DAY"
        right={<PlayPauseButton T={T} running={running} onToggle={() => setRunning(!running)} />} />
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
        {/* Axis baseline */}
        <line x1={colX0 - 6} y1={baseY + 6} x2={colX0 + hours * colW + 4} y2={baseY + 6}
          stroke={T.border} strokeWidth="1" />
        {/* Hour ticks */}
        {Array.from({ length: hours + 1 }).map((_, i) => {
          const x = colX0 + i * colW;
          const show = i % 6 === 0;
          return (
            <g key={i}>
              <line x1={x} y1={baseY + 4} x2={x} y2={baseY + 10} stroke={T.textTer} strokeWidth={show ? 1 : 0.5} />
              {show && (
                <text x={x} y={baseY + 22} textAnchor="middle" fontSize="9" fill={T.textTer} fontFamily={Fn}>
                  {i === 0 ? "00:00" : i === 6 ? "06:00" : i === 12 ? "12:00" : i === 18 ? "18:00" : "24:00"}
                </text>
              )}
            </g>
          );
        })}

        {/* Columns of wafer dots, filling over time */}
        {Array.from({ length: hours }).map((_, h) => {
          const x = colX0 + h * colW + colW / 2;
          // How many dots in this column are visible?
          let visibleDots = 0;
          if (h < filledHours) visibleDots = dotsPerHour;
          else if (h === filledHours) visibleDots = Math.floor(partialFrac * dotsPerHour);
          return (
            <g key={h}>
              {Array.from({ length: dotsPerHour }).map((_, d) => {
                const dotY = baseY - 4 - d * 14;
                const visible = d < visibleDots;
                return (
                  <circle key={d} cx={x} cy={dotY} r="4"
                    fill={visible ? T.deepBlue : T.border}
                    opacity={visible ? 0.9 : 0.5}
                    style={{ transition: "opacity 0.15s, fill 0.15s" }} />
                );
              })}
            </g>
          );
        })}

        {/* Left-axis labels */}
        <text x={colX0 - 14} y={baseY - 4} textAnchor="end" fontSize="9" fill={T.textTer} fontFamily={Fn}>0</text>
        <text x={colX0 - 14} y={baseY - 4 - (dotsPerHour - 1) * 14} textAnchor="end" fontSize="9" fill={T.textTer} fontFamily={Fn}>~200</text>
        <text x={colX0 - 14} y={baseY - 4 - 70} textAnchor="end" fontSize="9" fill={T.textTer} fontFamily={Fn} transform={`rotate(-90, ${colX0 - 14}, ${baseY - 60})`}>
          wafers / hour
        </text>

        {/* Right-side stat panel */}
        <g transform={`translate(${W - 150}, 40)`}>
          <text x="0" y="0" fontSize="10" fontWeight="700" fill={T.textTer} fontFamily={Fn} letterSpacing="0.06em">PER HOUR</text>
          <text x="0" y="22" fontSize="20" fontWeight="800" fill={T.deepBlue} fontFamily={Fn}>160-220</text>
          <text x="0" y="38" fontSize="10" fill={T.textSec} fontFamily={Fn}>NXE:3800E rated</text>

          <text x="0" y="74" fontSize="10" fontWeight="700" fill={T.textTer} fontFamily={Fn} letterSpacing="0.06em">PER DAY</text>
          <text x="0" y="96" fontSize="20" fontWeight="800" fill={T.capRed} fontFamily={Fn}>~5,000</text>
          <text x="0" y="112" fontSize="10" fill={T.textSec} fontFamily={Fn}>realistic uptime</text>

          <text x="0" y="148" fontSize="10" fontWeight="700" fill={T.textTer} fontFamily={Fn} letterSpacing="0.06em">PER YEAR</text>
          <text x="0" y="170" fontSize="20" fontWeight="800" fill={T.text} fontFamily={Fn}>~1.5M</text>
          <text x="0" y="186" fontSize="10" fill={T.textSec} fontFamily={Fn}>wafers per tool</text>
        </g>

        {/* Bottom note */}
        <text x={colX0} y={H - 12} fontSize="10" fill={T.textTer} fontFamily={Fn}>
          Around the clock operation. The economics work fast at leading-edge nodes.
        </text>
      </svg>
    </div>
  );
}
