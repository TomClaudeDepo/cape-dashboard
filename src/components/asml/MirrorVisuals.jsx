import { useEffect, useRef, useState } from "react";
import { Fn } from "../../theme";

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
   M2 — Constructive interference
   Zoomed view of a few Mo/Si layer pairs. Show partial reflections
   at each interface and how they sum constructively above.
   ════════════════════════════════════════════════════════════════ */
export function M2_ConstructiveInterference({ T }) {
  const [running, setRunning] = useState(true);
  const [containerRef, eff] = useInViewRunning(running);
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!eff) return;
    const id = setInterval(() => setTick(v => v + 1), 60);
    return () => clearInterval(id);
  }, [eff]);

  const W = 720, H = 320;
  const stackX = 220;
  const stackTopY = 130;
  const layerH = 22;        // visual thickness for one Mo/Si pair
  const N = 4;              // pairs shown
  const stackBottomY = stackTopY + N * layerH;
  const stackW = 320;

  // Animation cycle
  const cyclePeriod = 60; // ticks per full cycle (~3.6s)
  const phase = (tick % cyclePeriod) / cyclePeriod;

  // Incoming photon position
  const incomingX = stackX + 60;
  const incomingY1 = 40;
  const incomingY2 = stackTopY;
  // The photon descends 0 -> 0.4, then partial reflections 0.4 -> 0.7, then composite reflection 0.7 -> 1
  const incoming = phase < 0.4;
  const interference = phase >= 0.4 && phase < 0.75;
  const composite = phase >= 0.7;

  const photonY = incoming ? incomingY1 + (incomingY2 - incomingY1) * (phase / 0.4) : incomingY2;

  return (
    <div ref={containerRef}>
      <CaptionRow T={T} caption="ZOOMED VIEW · PARTIAL REFLECTIONS SUMMING IN PHASE"
        right={<PlayPauseButton T={T} running={running} onToggle={() => setRunning(!running)} />} />
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
        {/* Stack of Mo/Si layer pairs */}
        {Array.from({ length: N * 2 }).map((_, i) => {
          const isMo = i % 2 === 0;
          return (
            <rect key={i} x={stackX} y={stackTopY + i * (layerH / 2)} width={stackW} height={layerH / 2}
              fill={isMo ? "#475569" : "#94A3B8"} opacity="0.9" />
          );
        })}

        {/* Layer labels */}
        <text x={stackX + stackW + 14} y={stackTopY + layerH / 4 + 4} fontSize="10" fontWeight="700" fill={T.text} fontFamily={Fn}>Mo</text>
        <text x={stackX + stackW + 14} y={stackTopY + (3 * layerH) / 4 + 4} fontSize="10" fontWeight="700" fill={T.textSec} fontFamily={Fn}>Si</text>

        {/* Pair bracket */}
        <line x1={stackX - 18} y1={stackTopY} x2={stackX - 18} y2={stackTopY + layerH} stroke={T.text} strokeWidth="1" />
        <line x1={stackX - 22} y1={stackTopY} x2={stackX - 14} y2={stackTopY} stroke={T.text} strokeWidth="1" />
        <line x1={stackX - 22} y1={stackTopY + layerH} x2={stackX - 14} y2={stackTopY + layerH} stroke={T.text} strokeWidth="1" />
        <text x={stackX - 30} y={stackTopY + layerH / 2 + 4} textAnchor="end" fontSize="10" fill={T.text} fontWeight="700" fontFamily={Fn}>~6.8 nm</text>
        <text x={stackX - 30} y={stackTopY + layerH / 2 + 18} textAnchor="end" fontSize="9" fill={T.textTer} fontFamily={Fn}>per pair</text>

        {/* Incoming photon */}
        {incoming && (
          <g>
            <line x1={incomingX} y1="20" x2={incomingX} y2={photonY} stroke={T.capRed} strokeWidth="2" />
            <circle cx={incomingX} cy={photonY} r="4" fill={T.capRed} />
          </g>
        )}
        <text x={incomingX + 12} y="32" fontSize="10" fontWeight="700" fill={T.capRed} fontFamily={Fn}>EUV in</text>

        {/* Partial reflections at each Mo/Si interface — appear during interference phase */}
        {interference && Array.from({ length: N }).map((_, i) => {
          const yInt = stackTopY + i * layerH + layerH / 2; // mid-interface
          const reflectLen = 40 - i * 4;
          const op = 0.6 - i * 0.05;
          return (
            <g key={i}>
              <line x1={incomingX} y1={yInt} x2={incomingX + reflectLen + 24} y2={yInt - reflectLen - 22}
                stroke={T.deepBlue} strokeWidth="1.5" opacity={op} strokeDasharray="3 2" />
              {/* Dot at interface to indicate reflection */}
              <circle cx={incomingX} cy={yInt} r="2.5" fill={T.deepBlue} opacity="0.8" />
            </g>
          );
        })}

        {/* Composite reflected beam — appears during composite phase */}
        {composite && (
          <g>
            <line x1={incomingX} y1={stackTopY} x2={incomingX + 90} y2="20"
              stroke={T.green} strokeWidth="4" />
            <text x={incomingX + 96} y="28" fontSize="11" fontWeight="700" fill={T.green} fontFamily={Fn}>Sum: ~70%</text>
          </g>
        )}

        {/* Phase indicator pills (top-right) */}
        <g transform={`translate(${W - 230}, 26)`}>
          <text x="0" y="0" fontSize="9" fontWeight="700" fill={T.textTer} fontFamily={Fn} letterSpacing="0.06em">CYCLE</text>
          {["1. Photon in", "2. Partial reflections", "3. Sum, in phase"].map((lbl, i) => {
            const active = (i === 0 && incoming) || (i === 1 && interference) || (i === 2 && composite);
            return (
              <g key={i} transform={`translate(0, ${14 + i * 16})`}>
                <circle cx="4" cy="6" r="3.5" fill={active ? T.deepBlue : T.border} />
                <text x="14" y="10" fontSize="10" fontWeight={active ? 700 : 400}
                  fill={active ? T.text : T.textTer} fontFamily={Fn}>{lbl}</text>
              </g>
            );
          })}
        </g>

        {/* Atomic scale note */}
        <g transform={`translate(40, ${H - 86})`}>
          <rect x="0" y="0" width="280" height="58" rx="6"
            fill={T.deepBlue} opacity={T.text === "#0F172A" ? 0.07 : 0.14} />
          <text x="14" y="18" fontSize="10" fontWeight="700" fill={T.deepBlue} fontFamily={Fn} letterSpacing="0.06em">ATOMIC SCALE</text>
          <text x="14" y="36" fontSize="12" fill={T.text} fontFamily={Fn}>Each pair is roughly</text>
          <text x="14" y="50" fontSize="12" fontWeight="700" fill={T.text} fontFamily={Fn}>20 to 30 atoms thick.</text>
        </g>

        {/* Bottom note */}
        <text x={W - 40} y={H - 14} textAnchor="end" fontSize="10" fill={T.textTer} fontFamily={Fn}>
          Out of phase: cancellation. In phase: ~70% per stack.
        </text>
      </svg>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   M4 — Sub-nanometre polishing
   Mirror surface with extreme polish tolerance + Earth/coin scale.
   ════════════════════════════════════════════════════════════════ */
export function M4_Polishing({ T }) {
  const W = 720, H = 280;

  // Two surface profiles, side-by-side comparison
  // Left: "naive polish" — visible roughness; Right: "EUV polish" — flat
  const leftX = 60, rightX = 380;
  const surfaceW = 280;
  const surfaceY = 130;

  // Generate a wavy "rough" surface profile
  const roughPts = [];
  for (let i = 0; i <= surfaceW; i += 4) {
    const y = surfaceY
      + Math.sin(i / 18) * 5
      + Math.sin(i / 7 + 1.5) * 2.5
      + Math.cos(i / 4) * 1.2;
    roughPts.push(`${leftX + i},${y}`);
  }
  // Flat surface
  const flatPts = [];
  for (let i = 0; i <= surfaceW; i += 4) {
    const y = surfaceY + Math.sin(i / 50) * 0.4;
    flatPts.push(`${rightX + i},${y}`);
  }

  // Incoming photon paths — left scatters, right reflects coherently
  const photonsL = [0, 1, 2].map(i => {
    const x = leftX + 60 + i * 80;
    const yHit = surfaceY + Math.sin(x / 18) * 5;
    const scatterAngle = (Math.random() - 0.5) * 1.4; // pseudo
    // Use a deterministic per-i scatter
    const angles = [-0.8, 0.6, -0.3];
    return {
      from: { x: x - 30, y: 60 },
      hit: { x, y: yHit },
      out: { x: x + 60 * Math.sin(angles[i]), y: yHit - 60 },
    };
  });
  const photonsR = [0, 1, 2].map(i => {
    const x = rightX + 60 + i * 80;
    const yHit = surfaceY;
    return {
      from: { x: x - 30, y: 60 },
      hit: { x, y: yHit },
      out: { x: x + 30, y: yHit - 60 },
    };
  });

  return (
    <div>
      <CaptionRow T={T} caption="WHY POLISH MATTERS · ANY DEFECT SCATTERS PHOTONS" right={null} />
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
        {/* Left panel — naive polish */}
        <text x={leftX} y="32" fontSize="11" fontWeight="700" fill={T.textSec} fontFamily={Fn}>Conventional polish</text>
        <text x={leftX} y="46" fontSize="9" fill={T.textTer} fontFamily={Fn}>nanometre-scale roughness</text>
        {/* Photons hitting and scattering */}
        {photonsL.map((p, i) => (
          <g key={i}>
            <line x1={p.from.x} y1={p.from.y} x2={p.hit.x} y2={p.hit.y} stroke={T.capRed} strokeWidth="1.5" />
            <line x1={p.hit.x} y1={p.hit.y} x2={p.out.x} y2={p.out.y} stroke={T.capRed} strokeWidth="1.5" opacity="0.55" strokeDasharray="3 2" />
            <circle cx={p.hit.x} cy={p.hit.y} r="2" fill={T.capRed} />
          </g>
        ))}
        {/* Surface — rough */}
        <polyline points={roughPts.join(" ")} fill="none" stroke={T.text} strokeWidth="1.8" />
        {/* Mirror body fill */}
        <polygon points={`${roughPts.join(" ")} ${leftX + surfaceW},${surfaceY + 50} ${leftX},${surfaceY + 50}`}
          fill={T.pillBg} opacity="0.6" />
        <text x={leftX + surfaceW / 2} y={surfaceY + 80} textAnchor="middle" fontSize="10" fill={T.capRed} fontWeight="700" fontFamily={Fn}>
          Photons scatter, dose lost
        </text>

        {/* Right panel — EUV polish */}
        <text x={rightX} y="32" fontSize="11" fontWeight="700" fill={T.deepBlue} fontFamily={Fn}>EUV-grade polish</text>
        <text x={rightX} y="46" fontSize="9" fill={T.textTer} fontFamily={Fn}>{`<`} 1 nanometre roughness</text>
        {/* Photons hitting and reflecting coherently */}
        {photonsR.map((p, i) => (
          <g key={i}>
            <line x1={p.from.x} y1={p.from.y} x2={p.hit.x} y2={p.hit.y} stroke={T.deepBlue} strokeWidth="1.5" />
            <line x1={p.hit.x} y1={p.hit.y} x2={p.out.x} y2={p.out.y} stroke={T.deepBlue} strokeWidth="1.5" />
            <circle cx={p.hit.x} cy={p.hit.y} r="2" fill={T.deepBlue} />
          </g>
        ))}
        {/* Surface — flat */}
        <polyline points={flatPts.join(" ")} fill="none" stroke={T.text} strokeWidth="1.8" />
        {/* Mirror body fill */}
        <polygon points={`${flatPts.join(" ")} ${rightX + surfaceW},${surfaceY + 50} ${rightX},${surfaceY + 50}`}
          fill={T.pillBg} opacity="0.6" />
        <text x={rightX + surfaceW / 2} y={surfaceY + 80} textAnchor="middle" fontSize="10" fill={T.deepBlue} fontWeight="700" fontFamily={Fn}>
          Coherent reflection, dose preserved
        </text>

        {/* Scale callout — bottom */}
        <g transform={`translate(${W / 2 - 220}, ${H - 56})`}>
          <rect x="0" y="0" width="440" height="50" rx="6"
            fill={T.deepBlue} opacity={T.text === "#0F172A" ? 0.07 : 0.14} />
          <text x="14" y="20" fontSize="10" fontWeight="700" fill={T.deepBlue} fontFamily={Fn} letterSpacing="0.06em">SCALE COMPARISON</text>
          <text x="14" y="40" fontSize="12" fill={T.text} fontFamily={Fn}>
            Smoother than Earth's curvature scaled down to a one-euro coin.
          </text>
        </g>
      </svg>
    </div>
  );
}
