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
   R1 — The reflective reticle
   Cross-section showing Mo/Si multilayer base + tantalum absorber
   pattern on top. EUV reflects only where absorber is absent.
   ════════════════════════════════════════════════════════════════ */
export function R1_ReflectiveReticle({ T }) {
  const [running, setRunning] = useState(true);
  const [containerRef, eff] = useInViewRunning(running);
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!eff) return;
    const id = setInterval(() => setTick(v => v + 1), 60);
    return () => clearInterval(id);
  }, [eff]);

  const W = 720, H = 280;
  const stackX = 80;
  const stackW = W - 160;
  // Substrate bottom
  const substrateY = 200;
  const multilayerY = substrateY - 28;  // Mo/Si layer band (28 tall)
  const absorberY = multilayerY - 18;  // absorber sits on top (18 tall)

  // Absorber pattern — alternating blocks. Some positions have absorber, some don't.
  const blocks = [
    { x: 0,   w: 60,  abs: true },
    { x: 60,  w: 40,  abs: false },
    { x: 100, w: 30,  abs: true },
    { x: 130, w: 50,  abs: false },
    { x: 180, w: 40,  abs: true },
    { x: 220, w: 30,  abs: false },
    { x: 250, w: 70,  abs: true },
    { x: 320, w: 40,  abs: false },
    { x: 360, w: 30,  abs: true },
    { x: 390, w: 50,  abs: false },
    { x: 440, w: 60,  abs: true },
    { x: 500, w: 60,  abs: false },
  ];

  // Animation cycle
  const cyclePeriod = 70;
  const phase = (tick % cyclePeriod) / cyclePeriod; // 0..1
  // 0..0.45: incoming photons travelling down
  // 0.4..0.6: hit reticle
  // 0.55..1: patterned reflection going back up
  const incomingProg = Math.min(1, phase / 0.45);
  const reflectProg = Math.max(0, (phase - 0.5) / 0.45);

  // 7 photons across the reticle, mapping each to a block
  const photonCols = [30, 80, 120, 170, 210, 270, 340, 410, 470, 530];
  const photons = photonCols.map((relX) => {
    const x = stackX + relX;
    const block = blocks.find(b => relX >= b.x && relX < b.x + b.w);
    const absorbed = block ? block.abs : false;
    const topY = 30;
    const hitY = absorberY; // top of absorber stack
    const inY = topY + (hitY - topY) * incomingProg;
    const outY = hitY - (hitY - topY) * reflectProg;
    return { x, inY, outY, hitY, absorbed };
  });

  return (
    <div ref={containerRef}>
      <CaptionRow T={T} caption="CROSS-SECTION · EUV REFLECTS ONLY WHERE ABSORBER IS ABSENT"
        right={<PlayPauseButton T={T} running={running} onToggle={() => setRunning(!running)} />} />
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
        {/* Substrate (quartz) */}
        <rect x={stackX} y={substrateY} width={stackW} height="30" fill={T.border} />
        <text x={stackX + stackW + 10} y={substrateY + 18} fontSize="10" fill={T.textTer} fontFamily={Fn}>Quartz substrate</text>

        {/* Mo/Si multilayer band */}
        <rect x={stackX} y={multilayerY} width={stackW} height="28" fill="#475569" opacity="0.9" />
        {/* Layer stripes */}
        {Array.from({ length: 14 }).map((_, i) => (
          <line key={i} x1={stackX} y1={multilayerY + 2 + i * 2} x2={stackX + stackW} y2={multilayerY + 2 + i * 2}
            stroke="#94A3B8" strokeWidth="0.5" opacity="0.6" />
        ))}
        <text x={stackX + stackW + 10} y={multilayerY + 18} fontSize="10" fill={T.textSec} fontFamily={Fn}>Mo/Si multilayer</text>

        {/* Absorber blocks */}
        {blocks.filter(b => b.abs).map((b, i) => (
          <rect key={i} x={stackX + b.x} y={absorberY} width={b.w} height="18" fill={T.purple} />
        ))}
        <text x={stackX + stackW + 10} y={absorberY + 12} fontSize="10" fill={T.purple} fontFamily={Fn} fontWeight="700">Tantalum absorber</text>

        {/* Photons */}
        {photons.map((p, i) => {
          const incomingActive = phase < 0.55;
          const reflectActive = phase > 0.45 && !p.absorbed;
          return (
            <g key={i}>
              {/* Incoming */}
              {incomingActive && (
                <line x1={p.x} y1="20" x2={p.x} y2={p.inY}
                  stroke={T.capRed} strokeWidth="2" opacity="0.9" />
              )}
              {/* Reflected (only where no absorber) */}
              {reflectActive && (
                <line x1={p.x} y1={p.outY} x2={p.x} y2={p.hitY}
                  stroke={T.green} strokeWidth="2.5" opacity="0.95" />
              )}
              {/* Absorbed indicator */}
              {phase > 0.5 && p.absorbed && (
                <circle cx={p.x} cy={p.hitY + 6} r="3" fill={T.purple} opacity="0.6" />
              )}
            </g>
          );
        })}

        {/* Top label — beam directions */}
        <text x={stackX} y={16} fontSize="10" fontWeight="700" fill={T.capRed} fontFamily={Fn}>↓ Incoming EUV</text>
        <text x={stackX + stackW} y={16} textAnchor="end" fontSize="10" fontWeight="700" fill={T.green} fontFamily={Fn}>↑ Patterned reflection</text>

        {/* Vertical scale annotation on left */}
        <g transform={`translate(${stackX - 32}, ${absorberY})`}>
          <line x1="0" y1="0" x2="0" y2="46" stroke={T.textTer} strokeWidth="0.6" />
          <line x1="-3" y1="0" x2="3" y2="0" stroke={T.textTer} strokeWidth="0.6" />
          <line x1="-3" y1="46" x2="3" y2="46" stroke={T.textTer} strokeWidth="0.6" />
          <text x="-6" y="26" textAnchor="end" fontSize="9" fill={T.textTer} fontFamily={Fn}>reticle</text>
          <text x="-6" y="38" textAnchor="end" fontSize="9" fill={T.textTer} fontFamily={Fn}>stack</text>
        </g>

        {/* DUV-vs-EUV contrast — bottom */}
        <g transform={`translate(40, ${H - 28})`}>
          <text x="0" y="0" fontSize="10" fill={T.textTer} fontFamily={Fn}>
            <tspan fontWeight="700" fill={T.text}>DUV mask:</tspan> light passes through quartz with chrome pattern.
          </text>
          <text x="0" y="14" fontSize="10" fill={T.textTer} fontFamily={Fn}>
            <tspan fontWeight="700" fill={T.purple}>EUV mask:</tspan> the mask is a mirror. The chip pattern is the absorber.
          </text>
        </g>
      </svg>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   R2 — The pellicle
   Thin polysilicon membrane intercepts particles while EUV passes
   through twice. Show particle stopping; show EUV double-pass.
   ════════════════════════════════════════════════════════════════ */
export function R2_Pellicle({ T }) {
  const [running, setRunning] = useState(true);
  const [containerRef, eff] = useInViewRunning(running);
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!eff) return;
    const id = setInterval(() => setTick(v => v + 1), 60);
    return () => clearInterval(id);
  }, [eff]);

  const W = 720, H = 280;
  const reticleY = 220;
  const pellicleY = 110;
  const reticleX = 80;
  const reticleW = W - 160;

  // Particle position — falls and gets stuck on pellicle
  const cyclePeriod = 80;
  const phase = (tick % cyclePeriod) / cyclePeriod;
  const particleX = reticleX + reticleW * 0.32;
  const fallStartY = 20;
  const fallEndY = pellicleY - 6; // stops above pellicle
  const particleProg = Math.min(1, phase / 0.4);
  const particleY = fallStartY + (fallEndY - fallStartY) * particleProg;
  const particleStuck = phase >= 0.4;

  // EUV double-pass: down through pellicle, hit reticle, reflect up through pellicle
  const euvX = reticleX + reticleW * 0.7;
  // EUV cycle: 0.2..0.5 down, 0.5..0.55 hit, 0.55..0.85 up
  let euvDownY = 20, euvUpY = reticleY - 4, showDown = false, showUp = false;
  if (phase > 0.2 && phase < 0.55) {
    showDown = true;
    const p = (phase - 0.2) / 0.35;
    euvDownY = 20 + (reticleY - 24) * p;
  }
  if (phase > 0.55 && phase < 0.9) {
    showUp = true;
    const p = (phase - 0.55) / 0.35;
    euvUpY = (reticleY - 4) - (reticleY - 24) * p;
  }

  return (
    <div ref={containerRef}>
      <CaptionRow T={T} caption="PELLICLE INTERCEPTS PARTICLES · EUV PASSES THROUGH TWICE"
        right={<PlayPauseButton T={T} running={running} onToggle={() => setRunning(!running)} />} />
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
        {/* Reticle (mirror surface at bottom) */}
        <rect x={reticleX} y={reticleY} width={reticleW} height="20" fill="#475569" />
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1={reticleX} y1={reticleY + 4 + i * 2} x2={reticleX + reticleW} y2={reticleY + 4 + i * 2}
            stroke="#94A3B8" strokeWidth="0.5" opacity="0.6" />
        ))}
        {/* Reticle absorber pattern hint */}
        {[0.15, 0.4, 0.7].map((f, i) => (
          <rect key={i} x={reticleX + reticleW * f} y={reticleY - 6} width="36" height="6" fill={T.purple} />
        ))}
        <text x={reticleX} y={reticleY + 38} fontSize="10" fontWeight="700" fill={T.text} fontFamily={Fn}>Reticle (mirror + absorber pattern)</text>

        {/* Pellicle frame supports */}
        <line x1={reticleX + 8} y1={pellicleY} x2={reticleX + 8} y2={reticleY} stroke={T.textTer} strokeWidth="1.5" />
        <line x1={reticleX + reticleW - 8} y1={pellicleY} x2={reticleX + reticleW - 8} y2={reticleY} stroke={T.textTer} strokeWidth="1.5" />
        {/* Pellicle membrane */}
        <line x1={reticleX + 8} y1={pellicleY} x2={reticleX + reticleW - 8} y2={pellicleY}
          stroke={T.purple} strokeWidth="1.5" opacity="0.85" />
        {/* Slight sag if particle stuck */}
        {particleStuck && (
          <path d={`M ${reticleX + 8} ${pellicleY} Q ${particleX} ${pellicleY + 4} ${reticleX + reticleW - 8} ${pellicleY}`}
            fill="none" stroke={T.purple} strokeWidth="1.5" opacity="0.85" />
        )}

        {/* Pellicle label */}
        <text x={reticleX + reticleW + 10} y={pellicleY + 4} fontSize="10" fontWeight="700" fill={T.purple} fontFamily={Fn}>Pellicle</text>
        <text x={reticleX + reticleW + 10} y={pellicleY + 18} fontSize="9" fill={T.textTer} fontFamily={Fn}>~30nm polysilicon</text>

        {/* Particle */}
        {!particleStuck && (
          <g>
            <circle cx={particleX} cy={particleY} r="6" fill={T.capRed} opacity="0.32" />
            <circle cx={particleX} cy={particleY} r="3" fill={T.capRed} />
          </g>
        )}
        {particleStuck && (
          <g>
            <circle cx={particleX} cy={pellicleY - 3} r="4" fill={T.capRed} />
            <text x={particleX + 10} y={pellicleY - 4} fontSize="10" fontWeight="700" fill={T.capRed} fontFamily={Fn}>
              caught on pellicle
            </text>
            <text x={particleX + 10} y={pellicleY + 8} fontSize="9" fill={T.textTer} fontFamily={Fn}>
              never reaches the pattern
            </text>
          </g>
        )}

        {/* EUV down-pass */}
        {showDown && (
          <g>
            <line x1={euvX} y1="20" x2={euvX} y2={euvDownY} stroke={T.capRed} strokeWidth="2.2" />
            {/* small marker at pellicle crossing */}
            <circle cx={euvX} cy={pellicleY} r="2" fill={T.capRed} />
          </g>
        )}
        {/* EUV up-pass */}
        {showUp && (
          <g>
            <line x1={euvX + 12} y1={euvUpY} x2={euvX + 12} y2={reticleY - 4} stroke={T.green} strokeWidth="2.5" />
            <circle cx={euvX + 12} cy={pellicleY} r="2" fill={T.green} />
          </g>
        )}

        {/* Top labels */}
        <text x={particleX - 14} y="16" fontSize="10" fontWeight="700" fill={T.capRed} fontFamily={Fn}>↓ particle</text>
        <text x={euvX - 4} y="16" fontSize="10" fontWeight="700" fill={T.capRed} fontFamily={Fn}>↓ EUV</text>
        <text x={euvX + 22} y="16" fontSize="10" fontWeight="700" fill={T.green} fontFamily={Fn}>↑ EUV</text>

        {/* Thermal callout — bottom-left */}
        <g transform={`translate(40, ${H - 50})`}>
          <rect x="0" y="0" width="280" height="42" rx="6"
            fill={T.purple} opacity={T.text === "#0F172A" ? 0.07 : 0.14} />
          <text x="14" y="18" fontSize="10" fontWeight="700" fill={T.purple} fontFamily={Fn} letterSpacing="0.06em">FLASH HEATING</text>
          <text x="14" y="34" fontSize="11" fill={T.text} fontFamily={Fn}>Pellicle survives over 600 °C without fogging.</text>
        </g>
      </svg>
    </div>
  );
}
