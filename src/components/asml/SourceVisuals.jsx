import { useEffect, useRef, useState } from "react";
import { Fn } from "../../theme";

/* ════════════════════════════════════════════════════════════════
   Shared helpers
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
  // Returns [ref, effectiveRunning] — animation paused while off-screen,
  // resumes when scrolled back in. The explicit "running" prop still wins.
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
   S1 — Tin droplet generator
   Cross-section: reservoir (with liquid level) → heated nozzle →
   droplets dispensing into vacuum at 50,000/sec.
   ════════════════════════════════════════════════════════════════ */
export function S1_DropletGenerator({ T }) {
  const [running, setRunning] = useState(true);
  const [containerRef, eff] = useInViewRunning(running);

  // Animate falling droplets — 5 droplets stacked, recycle position.
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!eff) return;
    let raf, last = performance.now();
    const loop = (now) => {
      const dt = (now - last) / 1000; last = now;
      setT(v => (v + dt * 0.55) % 1);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [eff]);

  const W = 720, H = 280;
  const cx = W / 2;
  const nozzleY = 140;
  const dropletStart = 156;
  const dropletEnd = H - 30;
  const span = dropletEnd - dropletStart;
  const N = 6;

  return (
    <div ref={containerRef}>
      <CaptionRow T={T} caption="CROSS-SECTION · DROPLET DISPENSE INTO VACUUM"
        right={<PlayPauseButton T={T} running={running} onToggle={() => setRunning(!running)} />} />
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
        {/* Vacuum chamber wall on either side */}
        <line x1="30" y1={nozzleY + 20} x2="30" y2={H - 10} stroke={T.border} strokeWidth="1" strokeDasharray="2 4" />
        <line x1={W - 30} y1={nozzleY + 20} x2={W - 30} y2={H - 10} stroke={T.border} strokeWidth="1" strokeDasharray="2 4" />
        <text x="38" y={H - 14} fontSize="9" fill={T.textTer} fontFamily={Fn} letterSpacing="0.08em">VACUUM</text>

        {/* Reservoir body */}
        <rect x={cx - 90} y="20" width="180" height="90" rx="8"
          fill="none" stroke={T.text} strokeWidth="1.5" />
        {/* Liquid tin level */}
        <rect x={cx - 88} y="46" width="176" height="62" rx="6"
          fill={T.orange} opacity="0.22" />
        <line x1={cx - 88} y1="46" x2={cx + 88} y2="46" stroke={T.orange} strokeWidth="1.5" opacity="0.7" />
        {/* Surface shimmer */}
        <line x1={cx - 60} y1="49" x2={cx - 20} y2="49" stroke={T.orange} strokeWidth="1.5" opacity="0.8">
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2.4s" repeatCount="indefinite" />
        </line>
        <line x1={cx + 18} y1="50" x2={cx + 50} y2="50" stroke={T.orange} strokeWidth="1.5" opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2.4s" repeatCount="indefinite" />
        </line>

        {/* Reservoir labels */}
        <text x={cx - 100} y="32" textAnchor="end" fontSize="10" fontWeight="700" fill={T.text} fontFamily={Fn}>Molten tin</text>
        <text x={cx - 100} y="46" textAnchor="end" fontSize="9" fill={T.textTer} fontFamily={Fn}>reservoir</text>
        {/* Temperature pill on right */}
        <rect x={cx + 100} y="22" width="78" height="22" rx="11" fill={T.orange} opacity="0.16" />
        <text x={cx + 139} y="37" textAnchor="middle" fontSize="10" fontWeight="700" fill={T.orange} fontFamily={Fn}>~240 °C</text>

        {/* Heated nozzle (tapered) */}
        <path d={`M ${cx - 22} 110 L ${cx + 22} 110 L ${cx + 8} ${nozzleY + 18} L ${cx - 8} ${nozzleY + 18} Z`}
          fill={T.pillBg} stroke={T.text} strokeWidth="1.5" />
        {/* Heater coils — two on each side */}
        {[0, 1, 2].map(i => (
          <g key={i}>
            <path d={`M ${cx - 28 + i * 1.2} ${122 + i * 8} Q ${cx - 36} ${126 + i * 8} ${cx - 28 + i * 1.2} ${130 + i * 8}`}
              fill="none" stroke={T.capRed} strokeWidth="1.5" opacity="0.7" />
            <path d={`M ${cx + 28 - i * 1.2} ${122 + i * 8} Q ${cx + 36} ${126 + i * 8} ${cx + 28 - i * 1.2} ${130 + i * 8}`}
              fill="none" stroke={T.capRed} strokeWidth="1.5" opacity="0.7" />
          </g>
        ))}
        <text x={cx + 56} y="130" fontSize="9" fill={T.textTer} fontFamily={Fn}>heated nozzle</text>
        <text x={cx + 56} y="143" fontSize="9" fill={T.textTer} fontFamily={Fn}>piezo-driven</text>

        {/* Falling droplets */}
        {Array.from({ length: N }).map((_, i) => {
          const local = (t + i / N) % 1;
          const y = dropletStart + local * span;
          const fade = local < 0.05 ? local / 0.05 : (local > 0.95 ? (1 - local) / 0.05 : 1);
          return (
            <circle key={i} cx={cx} cy={y} r="3.5"
              fill={T.orange} opacity={0.85 * fade}>
            </circle>
          );
        })}

        {/* Right-side scale callout */}
        <g transform={`translate(${W - 180}, ${dropletStart + 8})`}>
          <line x1="0" y1="0" x2="0" y2={span - 30} stroke={T.textTer} strokeWidth="0.7" />
          <line x1="-4" y1="0" x2="4" y2="0" stroke={T.textTer} strokeWidth="0.7" />
          <line x1="-4" y1={span - 30} x2="4" y2={span - 30} stroke={T.textTer} strokeWidth="0.7" />
          <text x="10" y="6" fontSize="10" fontWeight="700" fill={T.text} fontFamily={Fn}>50,000 droplets / sec</text>
          <text x="10" y="22" fontSize="9" fill={T.textTer} fontFamily={Fn}>~25 micron diameter</text>
          <text x="10" y="36" fontSize="9" fill={T.textTer} fontFamily={Fn}>(smaller than a human hair)</text>
        </g>
      </svg>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   S2 — Droplet in flight
   Single droplet falling through chamber, lasers dimly positioned.
   ════════════════════════════════════════════════════════════════ */
export function S2_DropletInFlight({ T }) {
  const [running, setRunning] = useState(true);
  const [containerRef, eff] = useInViewRunning(running);

  const [t, setT] = useState(0);
  useEffect(() => {
    if (!eff) return;
    let raf, last = performance.now();
    const loop = (now) => {
      const dt = (now - last) / 1000; last = now;
      setT(v => (v + dt * 0.35) % 1);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [eff]);

  const W = 720, H = 280;
  const cx = W / 2;
  const focal = { x: cx, y: 160 };
  const dropletStartY = 36;
  const dropletEndY = H - 40;
  const dropletY = dropletStartY + t * (dropletEndY - dropletStartY);
  // Mark focal point window
  const atFocal = Math.abs(dropletY - focal.y) < 8;

  return (
    <div ref={containerRef}>
      <CaptionRow T={T} caption="VACUUM CHAMBER · LASERS WAIT FOR FOCAL POINT TIMING"
        right={<PlayPauseButton T={T} running={running} onToggle={() => setRunning(!running)} />} />
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
        <rect x="20" y="20" width={W - 40} height={H - 40} fill="none" stroke={T.border} strokeWidth="1" strokeDasharray="2 4" rx="6" />
        <text x="30" y="36" fontSize="9" fill={T.textTer} fontFamily={Fn} letterSpacing="0.08em">VACUUM CHAMBER</text>

        {/* Droplet generator stub at top */}
        <rect x={cx - 18} y="22" width="36" height="10" fill={T.orange} opacity="0.7" rx="2" />
        <text x={cx} y="52" textAnchor="middle" fontSize="9" fill={T.textTer} fontFamily={Fn}>droplet generator</text>

        {/* Pre-pulse laser (left), dim */}
        <rect x="60" y={focal.y - 8} width="80" height="16" fill={T.orange} opacity="0.32" rx="2" />
        <text x="100" y={focal.y + 30} textAnchor="middle" fontSize="9" fontWeight="600" fill={T.textSec} fontFamily={Fn}>Pre-pulse CO₂</text>
        <text x="100" y={focal.y + 42} textAnchor="middle" fontSize="8" fill={T.textTer} fontFamily={Fn}>waiting</text>
        {/* Pre-pulse beam preview (dashed, dim) */}
        <line x1="140" y1={focal.y} x2={focal.x - 16} y2={focal.y} stroke={T.orange} strokeWidth="1" strokeDasharray="2 4" opacity="0.4" />

        {/* Main pulse laser (right), dim */}
        <rect x={W - 140} y={focal.y - 8} width="80" height="16" fill={T.capRed} opacity="0.32" rx="2" />
        <text x={W - 100} y={focal.y + 30} textAnchor="middle" fontSize="9" fontWeight="600" fill={T.textSec} fontFamily={Fn}>Main pulse CO₂</text>
        <text x={W - 100} y={focal.y + 42} textAnchor="middle" fontSize="8" fill={T.textTer} fontFamily={Fn}>waiting</text>
        <line x1={W - 140} y1={focal.y} x2={focal.x + 16} y2={focal.y} stroke={T.capRed} strokeWidth="1" strokeDasharray="2 4" opacity="0.4" />

        {/* Focal point crosshair */}
        <g opacity={atFocal ? 1 : 0.45} style={{ transition: "opacity 0.15s" }}>
          <circle cx={focal.x} cy={focal.y} r="14" fill="none" stroke={T.deepBlue} strokeWidth="1" strokeDasharray="3 3" />
          <line x1={focal.x - 22} y1={focal.y} x2={focal.x - 16} y2={focal.y} stroke={T.deepBlue} strokeWidth="1.2" />
          <line x1={focal.x + 16} y1={focal.y} x2={focal.x + 22} y2={focal.y} stroke={T.deepBlue} strokeWidth="1.2" />
          <line x1={focal.x} y1={focal.y - 22} x2={focal.x} y2={focal.y - 16} stroke={T.deepBlue} strokeWidth="1.2" />
          <line x1={focal.x} y1={focal.y + 16} x2={focal.x} y2={focal.y + 22} stroke={T.deepBlue} strokeWidth="1.2" />
        </g>
        <text x={focal.x + 30} y={focal.y - 18} fontSize="10" fontWeight="700" fill={T.deepBlue} fontFamily={Fn}>Focal point</text>

        {/* The single droplet, falling */}
        <circle cx={cx} cy={dropletY} r="4.5" fill={T.orange}
          style={{ filter: atFocal ? `drop-shadow(0 0 6px ${T.orange})` : "none" }} />
        {/* Motion trail */}
        <line x1={cx} y1={dropletY - 14} x2={cx} y2={dropletY - 4}
          stroke={T.orange} strokeWidth="1.5" opacity="0.35" />
        <line x1={cx} y1={dropletY - 26} x2={cx} y2={dropletY - 18}
          stroke={T.orange} strokeWidth="1.5" opacity="0.18" />

        {/* Bottom annotation */}
        <text x="40" y={H - 14} fontSize="10" fontWeight="700" fill={T.capRed} fontFamily={Fn}>
          {atFocal ? "Droplet at focal point" : "Droplet in flight"}
        </text>
        <text x={W - 40} y={H - 14} textAnchor="end" fontSize="9" fill={T.textTer} fontFamily={Fn}>
          1 of ~50,000 per second
        </text>
      </svg>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   S3 — Pre-pulse strike
   Close-up: sphere → ellipse pancake under pre-pulse.
   ════════════════════════════════════════════════════════════════ */
export function S3_PrePulse({ T }) {
  const [running, setRunning] = useState(true);
  const [containerRef, eff] = useInViewRunning(running);
  const [phase, setPhase] = useState(0); // 0=approach, 1=pulse, 2=pancake, 3=hold
  useEffect(() => {
    if (!eff) return;
    const id = setInterval(() => setPhase(p => (p + 1) % 4), 900);
    return () => clearInterval(id);
  }, [eff]);

  const W = 720, H = 240;
  const cx = W / 2, cy = H / 2;
  const sphereR = 22;
  const pancakeRx = 36, pancakeRy = 6;

  // Smooth morph between sphere and pancake at phase 1 -> 2
  let rx, ry;
  if (phase < 1) { rx = sphereR; ry = sphereR; }
  else if (phase === 1) { rx = sphereR + 4; ry = sphereR - 4; }
  else if (phase === 2) { rx = pancakeRx; ry = pancakeRy; }
  else { rx = pancakeRx; ry = pancakeRy; }

  const pulseActive = phase === 1 || phase === 2;

  return (
    <div ref={containerRef}>
      <CaptionRow T={T} caption="CLOSE-UP · SPHERE FLATTENS INTO PANCAKE"
        right={<PlayPauseButton T={T} running={running} onToggle={() => setRunning(!running)} />} />
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
        {/* Pre-pulse laser unit */}
        <rect x="40" y={cy - 12} width="110" height="24" fill={T.orange} opacity="0.8" rx="3" />
        <text x="95" y={cy + 4} textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff" fontFamily={Fn}>PRE-PULSE</text>

        {/* Pulse beam */}
        <line x1="150" y1={cy} x2={cx - rx - 2} y2={cy}
          stroke={T.orange} strokeWidth={pulseActive ? 4 : 1.5}
          opacity={pulseActive ? 0.95 : 0.3}
          strokeDasharray={pulseActive ? "none" : "5 4"}
          style={{ transition: "all 0.2s" }} />

        {/* Droplet / pancake */}
        <g style={{ transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)" }}>
          <ellipse cx={cx} cy={cy} rx={rx + 4} ry={ry + 4} fill={T.orange} opacity="0.18" />
          <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={T.orange} />
          {/* Specular highlight */}
          <ellipse cx={cx - rx * 0.35} cy={cy - ry * 0.4} rx={rx * 0.18} ry={ry * 0.25}
            fill="#fff" opacity="0.45" />
        </g>

        {/* Geometry annotations */}
        <g style={{ opacity: phase >= 2 ? 1 : 0.3, transition: "opacity 0.3s" }}>
          {/* Width arrow */}
          <line x1={cx - rx} y1={cy + ry + 22} x2={cx + rx} y2={cy + ry + 22} stroke={T.textSec} strokeWidth="1" />
          <line x1={cx - rx} y1={cy + ry + 18} x2={cx - rx} y2={cy + ry + 26} stroke={T.textSec} strokeWidth="1" />
          <line x1={cx + rx} y1={cy + ry + 18} x2={cx + rx} y2={cy + ry + 26} stroke={T.textSec} strokeWidth="1" />
          <text x={cx} y={cy + ry + 38} textAnchor="middle" fontSize="10" fontWeight="700" fill={T.text} fontFamily={Fn}>
            wider surface area
          </text>
        </g>

        {/* State label */}
        <text x={cx} y="36" textAnchor="middle" fontSize="11" fontWeight="700" fill={T.orange} fontFamily={Fn}>
          {phase === 0 ? "1 · Droplet at focal point" :
           phase === 1 ? "2 · Pre-pulse fires" :
           phase === 2 ? "3 · Droplet flattens" :
                         "4 · Pancake ready for main pulse"}
        </text>

        {/* Efficiency callout, right side */}
        <g transform={`translate(${W - 220}, ${cy - 50})`}>
          <rect x="0" y="0" width="200" height="100" rx="8"
            fill={T.orange} opacity={T.text === "#0F172A" ? 0.07 : 0.12} stroke={T.orange} strokeOpacity="0.35" />
          <text x="14" y="22" fontSize="10" fontWeight="700" fill={T.orange} fontFamily={Fn} letterSpacing="0.06em">WHY PANCAKE</text>
          <text x="14" y="44" fontSize="11" fill={T.text} fontFamily={Fn}>More surface area</text>
          <text x="14" y="60" fontSize="11" fill={T.text} fontFamily={Fn}>coupled to main pulse.</text>
          <text x="14" y="84" fontSize="14" fontWeight="800" fill={T.orange} fontFamily={Fn}>~2x conversion</text>
        </g>
      </svg>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   S4 — Main pulse strike
   Pancake gets hit by 25-30 kW main CO₂ laser. Bright flash.
   ════════════════════════════════════════════════════════════════ */
export function S4_MainPulse({ T }) {
  const [running, setRunning] = useState(true);
  const [containerRef, eff] = useInViewRunning(running);
  const [phase, setPhase] = useState(0); // 0=arm, 1=fire, 2=impact, 3=fade
  useEffect(() => {
    if (!eff) return;
    const id = setInterval(() => setPhase(p => (p + 1) % 4), 700);
    return () => clearInterval(id);
  }, [eff]);

  const W = 720, H = 240;
  const cx = W / 2, cy = H / 2;
  const pancakeRx = 30, pancakeRy = 5;

  const beamActive = phase >= 1;
  const flash = phase === 2;
  const aftermath = phase === 3;

  return (
    <div ref={containerRef}>
      <CaptionRow T={T} caption="PANCAKE TARGET · MAIN PULSE DELIVERS 25-30 kW"
        right={<PlayPauseButton T={T} running={running} onToggle={() => setRunning(!running)} />} />
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
        {/* Main pulse laser unit on right */}
        <rect x={W - 170} y={cy - 16} width="130" height="32" fill={T.capRed} rx="3" />
        <text x={W - 105} y={cy + 6} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff" fontFamily={Fn}>MAIN PULSE</text>

        {/* Power chip */}
        <rect x={W - 170} y={cy + 24} width="130" height="20" fill={T.capRed} opacity="0.18" rx="3" />
        <text x={W - 105} y={cy + 38} textAnchor="middle" fontSize="10" fontWeight="700" fill={T.capRed} fontFamily={Fn}>25-30 kW · 50 kHz</text>

        {/* Beam */}
        <line x1={W - 170} y1={cy} x2={cx + pancakeRx + 4} y2={cy}
          stroke={T.capRed}
          strokeWidth={flash ? 8 : (beamActive ? 5 : 1.5)}
          opacity={beamActive ? 0.95 : 0.3}
          strokeDasharray={beamActive ? "none" : "5 4"}
          style={{ transition: "all 0.2s" }} />
        {/* Beam glow */}
        {beamActive && (
          <line x1={W - 170} y1={cy} x2={cx + pancakeRx + 4} y2={cy}
            stroke={T.capRed} strokeWidth="14" opacity="0.18" />
        )}

        {/* Pancake target */}
        {!aftermath && (
          <g>
            <ellipse cx={cx} cy={cy} rx={pancakeRx + (flash ? 8 : 4)} ry={pancakeRy + (flash ? 5 : 3)}
              fill={T.orange} opacity={flash ? 0.5 : 0.22}
              style={{ transition: "all 0.15s" }} />
            <ellipse cx={cx} cy={cy} rx={pancakeRx} ry={pancakeRy} fill={T.orange} />
          </g>
        )}

        {/* Flash burst on impact */}
        {flash && (
          <g style={{ color: T.capRed }}>
            <circle cx={cx} cy={cy} r="44" fill="#fff" opacity="0.55" />
            <circle cx={cx} cy={cy} r="24" fill="#FFE4A0" opacity="0.85" />
            <circle cx={cx} cy={cy} r="10" fill="#fff" />
          </g>
        )}
        {/* Aftermath shimmer */}
        {aftermath && (
          <circle cx={cx} cy={cy} r="18" fill={T.orange} opacity="0.32" />
        )}

        {/* Synchronisation note */}
        <text x={cx} y="36" textAnchor="middle" fontSize="11" fontWeight="700" fill={T.capRed} fontFamily={Fn}>
          {phase === 0 ? "Locked: pulse train timed to droplet" :
           phase === 1 ? "Firing" :
           phase === 2 ? "Impact" : "Plasma formed"}
        </text>

        {/* Trumpf attribution */}
        <text x="36" y={H - 18} fontSize="10" fontWeight="700" fill={T.text} fontFamily={Fn}>Trumpf, Germany</text>
        <text x="36" y={H - 6} fontSize="9" fill={T.textTer} fontFamily={Fn}>largest industrial CO₂ laser ever built</text>
      </svg>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   S5 — Plasma formation
   Glowing tin plasma at 500,000 K, radiating photons in all directions.
   ════════════════════════════════════════════════════════════════ */
export function S5_Plasma({ T }) {
  const [running, setRunning] = useState(true);
  const [containerRef, eff] = useInViewRunning(running);
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!eff) return;
    const id = setInterval(() => setTick(v => v + 1), 80);
    return () => clearInterval(id);
  }, [eff]);

  const W = 720, H = 280;
  const cx = W / 2, cy = H / 2 + 4;

  // 12 photons radiating outward, each at its own phase
  const photons = Array.from({ length: 14 }).map((_, i) => {
    const angle = (i / 14) * Math.PI * 2;
    const phase = ((tick + i * 5) % 26) / 26; // 0..1
    const dist = 18 + phase * 110;
    const opacity = phase < 0.1 ? phase / 0.1 : (phase > 0.85 ? (1 - phase) / 0.15 : 1);
    return {
      x1: cx + Math.cos(angle) * 16,
      y1: cy + Math.sin(angle) * 16,
      x2: cx + Math.cos(angle) * dist,
      y2: cy + Math.sin(angle) * dist,
      opacity: opacity * 0.85,
    };
  });

  return (
    <div ref={containerRef}>
      <CaptionRow T={T} caption="TIN ATOMS IONISED · BURST OF 13.5nm PHOTONS"
        right={<PlayPauseButton T={T} running={running} onToggle={() => setRunning(!running)} />} />
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
        {/* Radiating photons */}
        {photons.map((p, i) => (
          <line key={i} x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2}
            stroke={T.deepBlue} strokeWidth="1.6" opacity={p.opacity} strokeLinecap="round" />
        ))}

        {/* Plasma core */}
        <g>
          <circle cx={cx} cy={cy} r="40" fill={T.orange} opacity="0.12">
            <animate attributeName="r" values="38;44;38" dur="1.4s" repeatCount="indefinite" />
          </circle>
          <circle cx={cx} cy={cy} r="26" fill={T.orange} opacity="0.35" />
          <circle cx={cx} cy={cy} r="14" fill={T.capRed} />
          <circle cx={cx} cy={cy} r="6" fill="#FFE9A0">
            <animate attributeName="opacity" values="0.85;1;0.85" dur="0.9s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Temperature gauge — left */}
        <g transform="translate(34, 40)">
          <text x="0" y="0" fontSize="10" fontWeight="700" fill={T.text} fontFamily={Fn} letterSpacing="0.06em">PLASMA TEMP</text>
          <text x="0" y="32" fontSize="28" fontWeight="800" fill={T.capRed} fontFamily={Fn} fontFeatureSettings='"tnum"'>500,000 K</text>
          <text x="0" y="50" fontSize="10" fill={T.textTer} fontFamily={Fn}>13.5 nanometre emission</text>
        </g>

        {/* Sun comparison — right */}
        <g transform={`translate(${W - 220}, 40)`}>
          <text x="0" y="0" fontSize="10" fontWeight="700" fill={T.text} fontFamily={Fn} letterSpacing="0.06em">VS. SUN SURFACE</text>
          {/* Sun glyph */}
          <circle cx="14" cy="36" r="14" fill={T.orange} opacity="0.4" />
          <circle cx="14" cy="36" r="10" fill={T.orange} />
          <text x="34" y="32" fontSize="11" fill={T.text} fontFamily={Fn}>~5,800 K</text>
          <text x="34" y="46" fontSize="11" fill={T.text} fontFamily={Fn} fontWeight="700">~85x cooler</text>
          <text x="0" y="80" fontSize="10" fill={T.textTer} fontFamily={Fn}>(the plasma is hotter than nearly anything you could compare it to)</text>
        </g>

        {/* Bottom note */}
        <text x={cx} y={H - 12} textAnchor="middle" fontSize="10" fill={T.textTer} fontFamily={Fn}>
          Burst lasts nanoseconds. Photons emit isotropically; only those heading toward the collector are used.
        </text>
      </svg>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   S6 — Collector mirror
   Curved Mo/Si mirror behind plasma, focusing EUV forward.
   ════════════════════════════════════════════════════════════════ */
export function S6_Collector({ T }) {
  const [running, setRunning] = useState(true);
  const [containerRef, eff] = useInViewRunning(running);
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!eff) return;
    const id = setInterval(() => setTick(v => v + 1), 60);
    return () => clearInterval(id);
  }, [eff]);

  const W = 720, H = 280;
  const cy = H / 2;
  const plasmaX = 220;
  const mirrorX = 90;          // mirror apex (left)
  const focalX = W - 100;      // focal point (right)
  const mirrorOpenY = 90;      // mirror aperture half-height

  // Photon paths: emitted from plasma toward mirror, bounce, head to focal point.
  const N = 7;
  const photons = Array.from({ length: N }).map((_, i) => {
    // Each photon cycles through: 0..0.5 going left to mirror, 0.5..1 going right to focal point
    const speed = 0.018;
    const phase = ((tick * speed) + i / N) % 1;
    // Hit-point on mirror at different y offsets
    const hitY = cy + (i - (N - 1) / 2) * 22;
    const hitX = mirrorX + 30 - Math.abs(hitY - cy) * 0.15; // slight curve
    let x, y, opacity;
    if (phase < 0.5) {
      const p = phase / 0.5;
      x = plasmaX + (hitX - plasmaX) * p;
      y = cy + (hitY - cy) * p;
      opacity = p < 0.08 ? p / 0.08 : 1;
    } else {
      const p = (phase - 0.5) / 0.5;
      x = hitX + (focalX - hitX) * p;
      y = hitY + (cy - hitY) * p;
      opacity = p > 0.92 ? (1 - p) / 0.08 : 1;
    }
    return { x, y, opacity };
  });

  // Parabolic mirror path
  const mirrorPath = `M ${mirrorX + 90} ${cy - mirrorOpenY}
    Q ${mirrorX - 20} ${cy} ${mirrorX + 90} ${cy + mirrorOpenY}`;

  return (
    <div ref={containerRef}>
      <CaptionRow T={T} caption="PARABOLIC Mo/Si COLLECTOR · FOCUSES EUV FORWARD"
        right={<PlayPauseButton T={T} running={running} onToggle={() => setRunning(!running)} />} />
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
        {/* Mirror body */}
        <path d={mirrorPath} fill="none" stroke={T.deepBlue} strokeWidth="6" strokeLinecap="round" />
        {/* Mirror reflective overlay */}
        <path d={mirrorPath} fill="none" stroke="#fff" strokeWidth="2" opacity="0.4" />

        {/* Mirror label */}
        <text x={mirrorX + 20} y={cy - mirrorOpenY - 14} fontSize="10" fontWeight="700" fill={T.deepBlue} fontFamily={Fn}>Collector mirror</text>
        <text x={mirrorX + 20} y={cy - mirrorOpenY - 2} fontSize="9" fill={T.textTer} fontFamily={Fn}>Mo/Si multilayer</text>

        {/* Plasma at focal point of mirror */}
        <g>
          <circle cx={plasmaX} cy={cy} r="14" fill={T.orange} opacity="0.32" />
          <circle cx={plasmaX} cy={cy} r="7" fill={T.capRed} />
        </g>
        <text x={plasmaX} y={cy + 32} textAnchor="middle" fontSize="9" fill={T.textTer} fontFamily={Fn}>tin plasma</text>

        {/* Photon paths */}
        {photons.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill={T.deepBlue} opacity={p.opacity * 0.9} />
        ))}

        {/* Focal point (downstream optics) */}
        <line x1={focalX} y1={cy - 28} x2={focalX} y2={cy + 28} stroke={T.green} strokeWidth="1.5" />
        <circle cx={focalX} cy={cy} r="5" fill={T.green} />
        <text x={focalX} y={cy - 38} textAnchor="middle" fontSize="10" fontWeight="700" fill={T.green} fontFamily={Fn}>To illuminator</text>
        <text x={focalX} y={cy + 50} textAnchor="middle" fontSize="9" fill={T.textTer} fontFamily={Fn}>and reticle</text>

        {/* Efficiency stat — bottom */}
        <g transform={`translate(40, ${H - 60})`}>
          <rect x="0" y="0" width="240" height="50" rx="6"
            fill={T.deepBlue} opacity={T.text === "#0F172A" ? 0.07 : 0.14} />
          <text x="14" y="20" fontSize="10" fontWeight="700" fill={T.deepBlue} fontFamily={Fn} letterSpacing="0.06em">WALL-PLUG TO USABLE EUV</text>
          <text x="14" y="42" fontSize="18" fontWeight="800" fill={T.deepBlue} fontFamily={Fn}>~0.02%</text>
          <text x="120" y="42" fontSize="10" fill={T.textSec} fontFamily={Fn}>everything else is waste heat</text>
        </g>
      </svg>
    </div>
  );
}
