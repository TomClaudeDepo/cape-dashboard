import { useState, useEffect, useRef } from "react";
import { Fn, Fh } from "../theme";
import { Card, Pill } from "../components/shared";
import {
  heroStats, intro, coreProblem, stages,
  productComparison, highNaNote, monopolyClose,
} from "../data/research-asml";

/* ═══════════════════════════════════════════
   GLOBAL KEYFRAMES — injected once
   ═══════════════════════════════════════════ */
const KEYFRAMES = `
@keyframes asml_fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
@keyframes asml_pulse { 0%, 100% { opacity: 0.85; transform: scale(1); } 50% { opacity: 1; transform: scale(1.08); } }
@keyframes asml_glow { 0%, 100% { filter: drop-shadow(0 0 4px currentColor); } 50% { filter: drop-shadow(0 0 12px currentColor); } }
@keyframes asml_flow { from { stroke-dashoffset: 24; } to { stroke-dashoffset: 0; } }
@keyframes asml_dash { to { stroke-dashoffset: -200; } }
@keyframes asml_drawIn { from { stroke-dashoffset: 1000; } to { stroke-dashoffset: 0; } }
@keyframes asml_shimmer { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
@keyframes asml_orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
`;

function useKeyframes() {
  useEffect(() => {
    const id = "asml_kf";
    if (document.getElementById(id)) return;
    const s = document.createElement("style");
    s.id = id; s.textContent = KEYFRAMES;
    document.head.appendChild(s);
  }, []);
}

/* ═══════════════════════════════════════════
   ANIMATED STAT — fade-in with stagger
   ═══════════════════════════════════════════ */
function AnimatedStat({ stat, index, T }) {
  return (
    <div style={{
      background: T.card, borderRadius: T.radiusSm, padding: "14px 16px",
      border: "1px solid " + T.border,
      animation: `asml_fadeUp 0.5s ease-out both`,
      animationDelay: `${index * 70}ms`,
    }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: T[stat.color] || T.text, fontFamily: Fn }}>{stat.value}</div>
      <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 3, lineHeight: 1.4 }}>{stat.label}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   WAVELENGTH COMPARISON — DUV vs EUV sine waves
   ═══════════════════════════════════════════ */
function WavelengthComparison({ T }) {
  const W = 800, H = 180;
  // Display ratio honours the 14x ratio. DUV period ~140px, EUV period 140/14.3 ~10px.
  const duvPeriod = 140;
  const euvPeriod = 10;
  const wavePath = (period, amp, yMid, phaseShift = 0) => {
    let d = `M 0 ${yMid}`;
    for (let x = 0; x <= W; x += 2) {
      const y = yMid + amp * Math.sin((x / period) * Math.PI * 2 + phaseShift);
      d += ` L ${x} ${y}`;
    }
    return d;
  };
  return (
    <Card T={T} style={{ padding: 24, marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn }}>Wavelength, to scale</div>
          <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginTop: 2 }}>EUV is roughly 14 times shorter than DUV. Both waves below at the same horizontal scale.</div>
        </div>
        <Pill T={T} color={T.capRed} bg="rgba(155,27,27,0.08)">14x ratio</Pill>
      </div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
        {/* DUV wave */}
        <g style={{ animation: "asml_dash 8s linear infinite" }}>
          <path d={wavePath(duvPeriod, 22, 50)} fill="none" stroke={T.deepBlue} strokeWidth="2" />
        </g>
        <text x="0" y="22" fontSize="11" fontWeight="700" fill={T.text} fontFamily={Fn}>DUV</text>
        <text x="40" y="22" fontSize="11" fill={T.textTer} fontFamily={Fn}>193 nanometres</text>
        <text x={W - 4} y="22" fontSize="10" fill={T.textTer} fontFamily={Fn} textAnchor="end">workhorse since the 2000s</text>

        {/* Dividing rule */}
        <line x1="0" y1="100" x2={W} y2="100" stroke={T.border} strokeWidth="0.5" />

        {/* EUV wave */}
        <g style={{ animation: "asml_dash 4s linear infinite" }}>
          <path d={wavePath(euvPeriod, 22, 150)} fill="none" stroke={T.capRed} strokeWidth="1.5" />
        </g>
        <text x="0" y="122" fontSize="11" fontWeight="700" fill={T.text} fontFamily={Fn}>EUV</text>
        <text x="40" y="122" fontSize="11" fill={T.textTer} fontFamily={Fn}>13.5 nanometres</text>
        <text x={W - 4} y="122" fontSize="10" fill={T.textTer} fontFamily={Fn} textAnchor="end">required for 7nm and below</text>
      </svg>
    </Card>
  );
}

/* ═══════════════════════════════════════════
   LPP SOURCE ANIMATION — droplet -> pancake -> plasma -> photons
   ═══════════════════════════════════════════ */
function LPPAnimation({ T }) {
  const [phase, setPhase] = useState(0); // 0..3
  const [running, setRunning] = useState(true);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setPhase(p => (p + 1) % 4), 900);
    return () => clearInterval(id);
  }, [running]);

  const W = 800, H = 280;
  const cx = 400, cy = 150;

  // Phase markers
  const labels = ["1. Droplet falls", "2. Pre-pulse flattens", "3. Main pulse vaporises", "4. EUV emits to collector"];

  // Droplet/pancake/plasma rendering
  const dropletY = phase === 0 ? 40 + (phase + 1) * 25 : cy;
  const isPhase = (p) => phase === p;

  return (
    <Card T={T} style={{ padding: 24, marginBottom: 24 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn }}>Laser-produced plasma source, in motion</div>
          <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginTop: 2 }}>One cycle shown over 3.6 seconds. The real process runs at roughly 50,000 droplets per second.</div>
        </div>
        <button onClick={() => setRunning(!running)} style={{
          background: T.pillBg, border: "1px solid " + T.border, borderRadius: T.radiusSm,
          padding: "6px 14px", fontSize: 11, fontFamily: Fn, color: T.textSec, cursor: "pointer",
        }}>{running ? "Pause" : "Play"}</button>
      </div>

      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
        {/* Vacuum chamber outline */}
        <rect x="40" y="30" width={W - 80} height={H - 80} fill="none" stroke={T.border} strokeWidth="1" strokeDasharray="2 4" rx="8" />
        <text x="48" y="48" fontSize="9" fill={T.textTer} fontFamily={Fn} letterSpacing="0.1em">VACUUM CHAMBER · TIN DROPLET LPP</text>

        {/* Droplet generator */}
        <rect x={cx - 20} y="30" width="40" height="14" fill={T.deepBlue} opacity="0.85" rx="2" />
        <text x={cx} y="60" textAnchor="middle" fontSize="9" fontWeight="600" fill={T.text} fontFamily={Fn}>Droplet generator</text>

        {/* Pre-pulse laser (left) */}
        <g opacity={isPhase(1) ? 1 : 0.18} style={{ transition: "opacity 0.25s" }}>
          <rect x="60" y={cy - 8} width="80" height="16" fill={T.orange} rx="2" />
          <text x="100" y={cy + 30} textAnchor="middle" fontSize="9" fontWeight="600" fill={T.text} fontFamily={Fn}>Pre-pulse CO₂</text>
          <line x1="140" y1={cy} x2={cx - 30} y2={cy} stroke={T.orange} strokeWidth="2" strokeDasharray="4 3" />
          {isPhase(1) && <polygon points={`${cx - 30},${cy - 4} ${cx - 22},${cy} ${cx - 30},${cy + 4}`} fill={T.orange} />}
        </g>

        {/* Main pulse laser (right) */}
        <g opacity={isPhase(2) ? 1 : 0.18} style={{ transition: "opacity 0.25s" }}>
          <rect x={W - 140} y={cy - 8} width="80" height="16" fill={T.capRed} rx="2" />
          <text x={W - 100} y={cy + 30} textAnchor="middle" fontSize="9" fontWeight="600" fill={T.text} fontFamily={Fn}>Main pulse CO₂ · 25-30 kW</text>
          <line x1={W - 140} y1={cy} x2={cx + 30} y2={cy} stroke={T.capRed} strokeWidth="2" strokeDasharray="4 3" />
          {isPhase(2) && <polygon points={`${cx + 30},${cy - 5} ${cx + 22},${cy} ${cx + 30},${cy + 5}`} fill={T.capRed} />}
        </g>

        {/* Droplet / pancake / plasma — center */}
        {isPhase(0) && (
          <circle cx={cx} cy={dropletY} r="5" fill={T.textSec}
            style={{ animation: "asml_fadeUp 0.4s ease-out" }} />
        )}
        {isPhase(1) && (
          <ellipse cx={cx} cy={cy} rx="14" ry="3" fill={T.textSec} />
        )}
        {isPhase(2) && (
          <g style={{ color: T.capRed, animation: "asml_glow 0.6s ease-in-out infinite" }}>
            <circle cx={cx} cy={cy} r="18" fill={T.orange} opacity="0.4" />
            <circle cx={cx} cy={cy} r="10" fill={T.capRed} />
            <circle cx={cx} cy={cy} r="4" fill="#fff" />
          </g>
        )}
        {isPhase(3) && (
          <g>
            <circle cx={cx} cy={cy} r="6" fill={T.capRed} opacity="0.7" />
            {/* EUV photons emanating downward toward collector */}
            {[-40, -20, 0, 20, 40].map((dx, i) => (
              <line key={i} x1={cx} y1={cy} x2={cx + dx * 1.5} y2={H - 60}
                stroke={T.deepBlue} strokeWidth="1.5" strokeDasharray="3 3"
                style={{ animation: `asml_dash 0.8s linear infinite`, animationDelay: `${i * 60}ms` }} />
            ))}
          </g>
        )}

        {/* Collector mirror — bottom */}
        <path d={`M ${cx - 90} ${H - 50} Q ${cx} ${H - 75} ${cx + 90} ${H - 50}`}
          fill="none" stroke={T.deepBlue} strokeWidth="3" opacity={isPhase(3) ? 1 : 0.4} />
        <text x={cx} y={H - 28} textAnchor="middle" fontSize="9" fontWeight="600" fill={T.text} fontFamily={Fn}>Collector mirror</text>
        <text x={cx} y={H - 16} textAnchor="middle" fontSize="9" fill={T.textTer} fontFamily={Fn}>EUV reflected toward optics</text>

        {/* Phase indicator */}
        <text x="48" y={H - 8} fontSize="10" fontWeight="700" fill={T.capRed} fontFamily={Fn}>{labels[phase]}</text>

        {/* Phase dots */}
        <g transform={`translate(${W - 100}, ${H - 14})`}>
          {[0, 1, 2, 3].map(i => (
            <circle key={i} cx={i * 14} cy="0" r="3" fill={phase === i ? T.capRed : T.border} />
          ))}
        </g>
      </svg>
    </Card>
  );
}

/* ═══════════════════════════════════════════
   ENHANCED BEAM PATH — with animated flowing photons
   ═══════════════════════════════════════════ */
function BeamPathDiagram({ T }) {
  const [hov, setHov] = useState(null);
  const nodes = [
    { x: 70, y: 230, label: "Droplet generator", sub: "~50,000/sec", color: T.deepBlue },
    { x: 200, y: 230, label: "Plasma", sub: "500,000 K", color: T.capRed },
    { x: 330, y: 170, label: "Collector mirror", sub: "~70%", color: T.deepBlue },
    { x: 470, y: 90, label: "Reticle", sub: "Reflective", color: T.purple },
    { x: 620, y: 170, label: "Projection optics", sub: "6 mirrors", color: T.deepBlue },
    { x: 770, y: 240, label: "Wafer", sub: "26 x 33mm slit", color: T.green },
  ];
  return (
    <Card T={T} style={{ padding: 24, marginBottom: 24 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>EUV beam path, end to end</div>
      <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 16 }}>Photon flow from source through projection optics to wafer. All in vacuum.</div>
      <svg width="100%" viewBox="0 0 840 320" style={{ display: "block" }}>
        <rect x="40" y="40" width="760" height="240" fill="none" stroke={T.border} strokeWidth="1" strokeDasharray="2 4" rx="8" />
        <text x="48" y="58" fontSize="9" fill={T.textTer} fontFamily={Fn} letterSpacing="0.1em">VACUUM CHAMBER</text>

        {/* Static lines between nodes */}
        {nodes.slice(0, -1).map((s, i) => {
          const next = nodes[i + 1];
          return (
            <line key={"l" + i} x1={s.x} y1={s.y} x2={next.x} y2={next.y}
              stroke={T.deepBlue} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.3" />
          );
        })}

        {/* Animated flowing photons along beam path */}
        {nodes.slice(0, -1).map((s, i) => {
          const next = nodes[i + 1];
          const id = `bp_path_${i}`;
          return (
            <g key={"f" + i}>
              <defs>
                <path id={id} d={`M ${s.x} ${s.y} L ${next.x} ${next.y}`} />
              </defs>
              {[0, 0.33, 0.66].map((delay, j) => (
                <circle key={j} r="3.5" fill={T.deepBlue}>
                  <animateMotion dur="2s" repeatCount="indefinite" begin={`${delay * 2 + i * 0.3}s`}>
                    <mpath href={`#${id}`} />
                  </animateMotion>
                  <animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite" begin={`${delay * 2 + i * 0.3}s`} />
                </circle>
              ))}
            </g>
          );
        })}

        {/* Stage nodes */}
        {nodes.map((s, i) => (
          <g key={i}
            onMouseEnter={() => setHov(i)}
            onMouseLeave={() => setHov(null)}
            style={{ cursor: "pointer" }}>
            <circle cx={s.x} cy={s.y} r={hov === i ? 18 : 14}
              fill={s.color} stroke={T.card} strokeWidth="3"
              style={{ transition: "r 0.15s" }} />
            <text x={s.x} y={s.y + 38} textAnchor="middle"
              fontSize="11" fontWeight="600" fill={T.text} fontFamily={Fn}>{s.label}</text>
            <text x={s.x} y={s.y + 52} textAnchor="middle"
              fontSize="9" fill={T.textTer} fontFamily={Fn}>{s.sub}</text>
          </g>
        ))}
      </svg>
    </Card>
  );
}

/* ═══════════════════════════════════════════
   BRAGG MIRROR CROSS-SECTION — Mo/Si multilayer
   ═══════════════════════════════════════════ */
function BraggMirror({ T }) {
  const W = 800, H = 280;
  const layerH = 12;
  const layers = 12; // Visual representation, not full 40-50
  const startY = 60;
  const incomingAngle = 25; // degrees from vertical

  return (
    <Card T={T} style={{ padding: 24, marginBottom: 24 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>Bragg multilayer mirror, cross-section</div>
      <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 16 }}>40 to 50 alternating molybdenum and silicon layer pairs. Each reflects a fraction; constructive interference yields ~70 percent total.</div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
        {/* Substrate */}
        <rect x="100" y={startY + layers * layerH} width={W - 200} height="30" fill={T.border} />
        <text x={W / 2} y={startY + layers * layerH + 50} textAnchor="middle" fontSize="9" fill={T.textTer} fontFamily={Fn}>Polished substrate, sub-nanometre roughness</text>

        {/* Alternating Mo/Si layers */}
        {Array.from({ length: layers }).map((_, i) => {
          const isMo = i % 2 === 0;
          return (
            <rect key={i} x="100" y={startY + i * layerH} width={W - 200} height={layerH}
              fill={isMo ? "#475569" : "#94A3B8"} opacity={0.85} />
          );
        })}

        {/* Layer labels on right */}
        <text x={W - 90} y={startY + 8} fontSize="10" fill={T.text} fontFamily={Fn} fontWeight="600">Mo</text>
        <text x={W - 90} y={startY + layerH + 8} fontSize="10" fill={T.textSec} fontFamily={Fn} fontWeight="600">Si</text>
        <line x1={W - 105} y1={startY} x2={W - 105} y2={startY + 2 * layerH} stroke={T.text} strokeWidth="1" />
        <line x1={W - 110} y1={startY} x2={W - 100} y2={startY} stroke={T.text} strokeWidth="1" />
        <line x1={W - 110} y1={startY + 2 * layerH} x2={W - 100} y2={startY + 2 * layerH} stroke={T.text} strokeWidth="1" />
        <text x={W - 80} y={startY + layerH + 4} fontSize="9" fill={T.textTer} fontFamily={Fn}>~½ wavelength pair</text>
        <text x={W - 80} y={startY + layerH + 18} fontSize="9" fill={T.textTer} fontFamily={Fn}>(~6.8nm)</text>

        {/* Stack annotation on left */}
        <line x1="90" y1={startY} x2="90" y2={startY + layers * layerH} stroke={T.textSec} strokeWidth="1" />
        <line x1="85" y1={startY} x2="95" y2={startY} stroke={T.textSec} strokeWidth="1" />
        <line x1="85" y1={startY + layers * layerH} x2="95" y2={startY + layers * layerH} stroke={T.textSec} strokeWidth="1" />
        <text x="80" y={startY + (layers * layerH) / 2 + 4} fontSize="10" fill={T.text} fontFamily={Fn} fontWeight="600" textAnchor="end">40-50</text>
        <text x="80" y={startY + (layers * layerH) / 2 + 18} fontSize="9" fill={T.textTer} fontFamily={Fn} textAnchor="end">pairs total</text>

        {/* Incoming photon (angled, animated) */}
        <g>
          {[0, 1, 2].map(i => (
            <g key={i}>
              <line x1="200" y1="0" x2={200 + Math.tan(incomingAngle * Math.PI / 180) * startY} y2={startY}
                stroke={T.capRed} strokeWidth="2" opacity="0">
                <animate attributeName="opacity" values="0;1;1;0" dur="2.4s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
              </line>
            </g>
          ))}
          <text x="200" y="14" fontSize="10" fontWeight="600" fill={T.capRed} fontFamily={Fn}>Incoming EUV (13.5nm)</text>
        </g>

        {/* Partial reflections at each layer interface */}
        {Array.from({ length: 5 }).map((_, i) => {
          const layerIdx = i * 2;
          const yPoint = startY + layerIdx * layerH;
          const xPoint = 200 + Math.tan(incomingAngle * Math.PI / 180) * yPoint;
          const reflectLen = 60 - i * 8;
          const xOut = xPoint + Math.tan(incomingAngle * Math.PI / 180) * reflectLen;
          return (
            <line key={i} x1={xPoint} y1={yPoint} x2={xOut} y2={yPoint - reflectLen}
              stroke={T.deepBlue} strokeWidth="1.5" opacity="0">
              <animate attributeName="opacity" values="0;0.7;0" dur="2.4s" begin={`${i * 0.05 + 0.5}s`} repeatCount="indefinite" />
            </line>
          );
        })}

        {/* Combined outgoing photon (reflected) */}
        <line x1="320" y1={startY} x2="450" y2="0" stroke={T.green} strokeWidth="3" opacity="0">
          <animate attributeName="opacity" values="0;1;1;0" dur="2.4s" begin="1.4s" repeatCount="indefinite" />
        </line>
        <text x="455" y="14" fontSize="10" fontWeight="600" fill={T.green} fontFamily={Fn}>Reflected: ~70%</text>

        {/* Absorbed annotation */}
        <text x={W / 2} y={startY + layers * layerH + 100} textAnchor="middle" fontSize="10" fill={T.textSec} fontFamily={Fn}>Each layer reflects a tiny fraction. Constructive interference across the stack yields ~70 percent total reflectivity.</text>
      </svg>
    </Card>
  );
}

/* ═══════════════════════════════════════════
   REFLECTIVITY CHART — animated draw-in
   ═══════════════════════════════════════════ */
function ReflectivityChart({ T }) {
  const ref = useRef(null);
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setDrawn(true); }, { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const mirrors = Array.from({ length: 11 }, (_, i) => ({
    n: i,
    reflectivity: Math.pow(0.7, i) * 100,
  }));
  const W = 800, H = 240, padL = 50, padR = 30, padT = 30, padB = 40;
  const plotW = W - padL - padR, plotH = H - padT - padB;
  const x = (n) => padL + (n / 10) * plotW;
  const y = (v) => padT + plotH - (v / 100) * plotH;
  const points = mirrors.map(m => `${x(m.n)},${y(m.reflectivity)}`).join(" ");

  return (
    <Card T={T} style={{ padding: 24, marginBottom: 24 }} >
      <div ref={ref} />
      <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>Photon survival across the optical path</div>
      <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 16 }}>Cumulative reflectivity after N mirrors, assuming 70 percent per mirror.</div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
        {[0, 25, 50, 75, 100].map(v => (
          <g key={v}>
            <line x1={padL} y1={y(v)} x2={W - padR} y2={y(v)} stroke={T.border} strokeWidth="0.5" />
            <text x={padL - 8} y={y(v) + 3} textAnchor="end" fontSize="10" fill={T.textTer} fontFamily={Fn}>{v}%</text>
          </g>
        ))}
        {mirrors.map(m => (
          <text key={"l" + m.n} x={x(m.n)} y={H - 20} textAnchor="middle" fontSize="10" fill={T.textTer} fontFamily={Fn}>{m.n}</text>
        ))}
        <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="10" fill={T.textTer} fontFamily={Fn}>Number of mirrors traversed</text>

        {/* Filled area under curve */}
        <polygon
          points={`${padL},${y(0)} ${points} ${x(10)},${y(0)}`}
          fill={T.deepBlue} opacity={drawn ? 0.1 : 0}
          style={{ transition: "opacity 0.8s ease 1.2s" }} />

        {/* Drawing curve */}
        <polyline points={points} fill="none" stroke={T.deepBlue} strokeWidth="2.5"
          strokeDasharray="1000"
          strokeDashoffset={drawn ? 0 : 1000}
          style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(0.4, 0, 0.2, 1)" }} />

        {/* Dots and key annotations */}
        {mirrors.map((m, i) => (
          <g key={"d" + m.n} style={{ opacity: drawn ? 1 : 0, transition: `opacity 0.3s ease ${0.8 + i * 0.1}s` }}>
            <circle cx={x(m.n)} cy={y(m.reflectivity)} r="4" fill={T.deepBlue} />
            {(m.n === 0 || m.n === 5 || m.n === 10) && (
              <text x={x(m.n)} y={y(m.reflectivity) - 12} textAnchor="middle"
                fontSize="11" fontWeight="700" fill={T.text} fontFamily={Fn}>
                {m.reflectivity.toFixed(m.n === 0 ? 0 : 1)}%
              </text>
            )}
          </g>
        ))}

        {/* Annotation arrow to N=10 */}
        <g style={{ opacity: drawn ? 1 : 0, transition: "opacity 0.4s ease 2.2s" }}>
          <line x1={x(10) - 80} y1={y(2.8) + 40} x2={x(10) - 8} y2={y(2.8) + 6}
            stroke={T.capRed} strokeWidth="1.2" markerEnd="url(#arrow_a)" />
          <text x={x(10) - 85} y={y(2.8) + 38} textAnchor="end"
            fontSize="11" fontWeight="700" fill={T.capRed} fontFamily={Fn}>~97% of photons lost</text>
          <text x={x(10) - 85} y={y(2.8) + 52} textAnchor="end"
            fontSize="10" fill={T.textTer} fontFamily={Fn}>by the time the beam reaches the wafer</text>
        </g>
        <defs>
          <marker id="arrow_a" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <polygon points="0,0 6,3 0,6" fill={T.capRed} />
          </marker>
        </defs>
      </svg>
    </Card>
  );
}

/* ═══════════════════════════════════════════
   SCANNING ANIMATION — reticle and wafer in synchronous opposite motion
   ═══════════════════════════════════════════ */
function ScannerAnimation({ T }) {
  const [t, setT] = useState(0); // 0..100
  const [running, setRunning] = useState(true);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setT(v => (v + 1) % 100), 40);
    return () => clearInterval(id);
  }, [running]);

  const W = 800, H = 260;
  const reticleX = 80, reticleY = 50, reticleW = 280, reticleH = 160;
  const waferX = W - 80 - 200, waferY = 60, waferR = 100;

  // Reticle scan position — moves right to left
  const ret_slit_x = reticleX + reticleW - (t / 100) * reticleW;
  // Wafer scan position — moves left to right (opposite)
  const waf_slit_x = waferX + (t / 100) * 200;

  // Die grid on wafer (8x8)
  const dieCols = 8, dieRows = 8;
  const dieSize = 200 / dieCols;
  const dies = [];
  for (let r = 0; r < dieRows; r++) {
    for (let c = 0; c < dieCols; c++) {
      const cx = waferX + c * dieSize + dieSize / 2;
      const cy = waferY + r * dieSize + dieSize / 2;
      const dx = cx - (waferX + 100);
      const dy = cy - (waferY + 100);
      if (Math.sqrt(dx * dx + dy * dy) < waferR) {
        const exposed = cx < waf_slit_x;
        dies.push({ cx, cy, exposed, x: waferX + c * dieSize, y: waferY + r * dieSize });
      }
    }
  }

  return (
    <Card T={T} style={{ padding: 24, marginBottom: 24 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn }}>Synchronous scanning, reticle and wafer</div>
          <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginTop: 2 }}>Slit-by-slit exposure of one 300mm wafer. Real time is roughly 25 to 35 seconds.</div>
        </div>
        <button onClick={() => setRunning(!running)} style={{
          background: T.pillBg, border: "1px solid " + T.border, borderRadius: T.radiusSm,
          padding: "6px 14px", fontSize: 11, fontFamily: Fn, color: T.textSec, cursor: "pointer",
        }}>{running ? "Pause" : "Play"}</button>
      </div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
        {/* RETICLE */}
        <text x={reticleX} y={reticleY - 14} fontSize="11" fontWeight="700" fill={T.text} fontFamily={Fn}>Reticle (mirror)</text>
        <text x={reticleX + reticleW} y={reticleY - 14} fontSize="9" fill={T.textTer} fontFamily={Fn} textAnchor="end">scans right to left</text>
        <rect x={reticleX} y={reticleY} width={reticleW} height={reticleH} fill="none" stroke={T.border} strokeWidth="1" rx="3" />
        {/* Reticle pattern — abstract chip layout */}
        {Array.from({ length: 6 }).map((_, r) =>
          Array.from({ length: 10 }).map((_, c) => (
            <rect key={`p-${r}-${c}`}
              x={reticleX + 10 + c * 27}
              y={reticleY + 10 + r * 24}
              width={20 + (c % 3) * 2}
              height={16 + (r % 2) * 4}
              fill={T.purple} opacity="0.25" rx="1" />
          ))
        )}
        {/* Reticle slit highlighter */}
        <rect x={ret_slit_x - 12} y={reticleY} width="24" height={reticleH}
          fill={T.capRed} opacity="0.18" />
        <line x1={ret_slit_x} y1={reticleY - 6} x2={ret_slit_x} y2={reticleY + reticleH + 6} stroke={T.capRed} strokeWidth="1.5" />
        <polygon points={`${ret_slit_x - 5},${reticleY - 12} ${ret_slit_x + 5},${reticleY - 12} ${ret_slit_x},${reticleY - 4}`} fill={T.capRed} />

        {/* Connector line between reticle and wafer */}
        <path d={`M ${reticleX + reticleW + 10} ${reticleY + reticleH / 2} Q ${(reticleX + reticleW + waferX) / 2} ${reticleY + reticleH / 2 - 30} ${waferX - 10} ${waferY + waferR}`}
          fill="none" stroke={T.deepBlue} strokeWidth="1.2" strokeDasharray="3 3" opacity="0.5" />
        <text x={(reticleX + reticleW + waferX) / 2} y={reticleY + reticleH / 2 - 36} textAnchor="middle"
          fontSize="9" fill={T.textTer} fontFamily={Fn}>4x demagnification through projection optics</text>

        {/* WAFER */}
        <text x={waferX} y={waferY - 14} fontSize="11" fontWeight="700" fill={T.text} fontFamily={Fn}>300mm wafer</text>
        <text x={waferX + 200} y={waferY - 14} fontSize="9" fill={T.textTer} fontFamily={Fn} textAnchor="end">scans left to right</text>
        {/* Wafer outline circle */}
        <circle cx={waferX + 100} cy={waferY + 100} r={waferR + 4} fill="none" stroke={T.border} strokeWidth="1" />
        <circle cx={waferX + 100} cy={waferY + 100} r={waferR} fill={T.pillBg} />
        {/* Notch */}
        <path d={`M ${waferX + 100 - 6} ${waferY + 100 + waferR} L ${waferX + 100} ${waferY + 100 + waferR - 8} L ${waferX + 100 + 6} ${waferY + 100 + waferR}`}
          fill={T.pillBg} stroke={T.border} strokeWidth="1" />
        {/* Die grid */}
        {dies.map((d, i) => (
          <rect key={i} x={d.x + 1} y={d.y + 1} width={dieSize - 2} height={dieSize - 2}
            fill={d.exposed ? T.green : T.card} stroke={T.border} strokeWidth="0.5"
            opacity={d.exposed ? 0.85 : 0.5}
            style={{ transition: "fill 0.15s" }} />
        ))}
        {/* Wafer slit highlighter */}
        <rect x={waf_slit_x - 5} y={waferY} width="10" height="200"
          fill={T.capRed} opacity="0.18" />
        <line x1={waf_slit_x} y1={waferY - 6} x2={waf_slit_x} y2={waferY + 206} stroke={T.capRed} strokeWidth="1.5" />

        {/* Progress bar */}
        <rect x={reticleX} y={H - 24} width={W - 160} height="6" rx="3" fill={T.pillBg} />
        <rect x={reticleX} y={H - 24} width={(W - 160) * (t / 100)} height="6" rx="3" fill={T.capRed} />
        <text x={W - 80} y={H - 18} fontSize="10" fontWeight="600" fill={T.textSec} fontFamily={Fn}>{Math.round(t)}%</text>
      </svg>
    </Card>
  );
}

/* ═══════════════════════════════════════════
   ANAMORPHIC TOGGLE — Low-NA vs High-NA reticle-to-wafer geometry
   ═══════════════════════════════════════════ */
function AnamorphicViz({ T }) {
  const [mode, setMode] = useState("high"); // "low" or "high"
  const W = 800, H = 280;

  // Reticle box on left, wafer field on right
  const retX = 100, retY = 80, retW = 160, retH = 100;
  const wafCx = 580, wafCy = 140;

  // Low-NA: 4x in both axes -> wafer is retW/4 by retH/4
  // High-NA: 4x in X, 8x in Y -> wafer is retW/4 by retH/8
  const wafW = mode === "low" ? retW / 4 : retW / 4;
  const wafH = mode === "low" ? retH / 4 : retH / 8;

  return (
    <Card T={T} style={{ padding: 24, marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn }}>Anamorphic geometry, Low-NA versus High-NA</div>
          <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginTop: 2 }}>How the reticle pattern is demagnified onto the wafer. High-NA breaks symmetry to fit physical envelope.</div>
        </div>
        <div style={{ display: "flex", gap: 4, background: T.pillBg, borderRadius: T.radiusSm, padding: 3 }}>
          {["low", "high"].map(m => (
            <button key={m} onClick={() => setMode(m)} style={{
              padding: "6px 14px", borderRadius: 6, border: "none", fontSize: 11, fontFamily: Fn,
              fontWeight: mode === m ? 600 : 400, background: mode === m ? T.card : "transparent",
              color: mode === m ? T.text : T.textTer, cursor: "pointer", transition: "all 0.15s",
              boxShadow: mode === m ? T.shadow : "none",
            }}>{m === "low" ? "Low-NA (4x / 4x)" : "High-NA (4x / 8x)"}</button>
          ))}
        </div>
      </div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
        {/* Reticle */}
        <text x={retX} y={retY - 14} fontSize="11" fontWeight="700" fill={T.text} fontFamily={Fn}>Reticle pattern</text>
        <text x={retX} y={retY + retH + 28} fontSize="9" fill={T.textTer} fontFamily={Fn}>{retW} x {retH} units</text>
        <rect x={retX} y={retY} width={retW} height={retH} fill="none" stroke={T.purple} strokeWidth="2" rx="3" />
        {/* Pattern detail on reticle */}
        {Array.from({ length: 4 }).map((_, r) =>
          Array.from({ length: 6 }).map((_, c) => (
            <rect key={`r-${r}-${c}`}
              x={retX + 8 + c * 25}
              y={retY + 8 + r * 22}
              width={18} height={14}
              fill={T.purple} opacity="0.25" rx="1" />
          ))
        )}

        {/* Projection optics — abstract */}
        <g transform={`translate(${retX + retW + 40}, ${retY + retH / 2})`}>
          <text x="50" y="-50" textAnchor="middle" fontSize="9" fill={T.textTer} fontFamily={Fn}>Projection optics</text>
          <text x="50" y="-36" textAnchor="middle" fontSize="9" fontWeight="600" fill={T.deepBlue} fontFamily={Fn}>
            {mode === "low" ? "Symmetric" : "Anamorphic"}
          </text>
          {/* Convex lens-like symbol */}
          <ellipse cx="50" cy="0" rx="18" ry={mode === "low" ? 40 : 50} fill="none" stroke={T.deepBlue} strokeWidth="2" />
          <line x1="20" y1="0" x2="35" y2="0" stroke={T.deepBlue} strokeWidth="1.5" markerEnd="url(#ana_arrow)" />
          <line x1="65" y1="0" x2="80" y2="0" stroke={T.deepBlue} strokeWidth="1.5" markerEnd="url(#ana_arrow)" />
        </g>
        <defs>
          <marker id="ana_arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <polygon points="0,0 6,3 0,6" fill={T.deepBlue} />
          </marker>
        </defs>

        {/* Wafer printed area */}
        <text x={wafCx} y={retY - 14} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.text} fontFamily={Fn}>Wafer-side image</text>
        <text x={wafCx} y={retY + retH + 28} textAnchor="middle" fontSize="9" fill={T.textTer} fontFamily={Fn}>
          {wafW.toFixed(0)} x {wafH.toFixed(0)} units
        </text>
        <rect x={wafCx - wafW / 2} y={wafCy - wafH / 2} width={wafW} height={wafH}
          fill={T.green} opacity="0.85" stroke={T.green} strokeWidth="1.5" rx="2"
          style={{ transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)" }} />
        {/* Demag arrows */}
        <g>
          <line x1={wafCx - wafW / 2 - 20} y1={wafCy} x2={wafCx - wafW / 2 - 5} y2={wafCy} stroke={T.textTer} strokeWidth="1" markerEnd="url(#ana_arrow2)" />
          <line x1={wafCx + wafW / 2 + 20} y1={wafCy} x2={wafCx + wafW / 2 + 5} y2={wafCy} stroke={T.textTer} strokeWidth="1" markerEnd="url(#ana_arrow2)" />
          <text x={wafCx} y={wafCy - wafH / 2 - 10} textAnchor="middle" fontSize="10" fontWeight="700" fill={T.text} fontFamily={Fn}>
            4x in X
          </text>
          <text x={wafCx + wafW / 2 + 50} y={wafCy + 4} fontSize="10" fontWeight="700" fill={T.text} fontFamily={Fn}>
            {mode === "low" ? "4x in Y" : "8x in Y"}
          </text>
          <defs>
            <marker id="ana_arrow2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <polygon points="0,0 6,3 0,6" fill={T.textTer} />
            </marker>
          </defs>
        </g>

        {/* Bottom note */}
        <text x={W / 2} y={H - 12} textAnchor="middle" fontSize="11" fill={T.textSec} fontFamily={Fn} fontStyle="italic">
          {mode === "low"
            ? "Low-NA reduces the reticle 4x in both axes. Symmetric, fits comfortably in the optical envelope."
            : "High-NA breaks symmetry to fit 0.55 NA optics in the available envelope. The wafer image is half as tall as Low-NA would produce."}
        </text>
      </svg>
    </Card>
  );
}

/* ════════════════════════════════════════════════════════════════ */
export default function ResearchASML({ T }) {
  useKeyframes();
  const prose = (text, s = {}) => <p style={{ fontSize: 13.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.85, margin: "0 0 16px", ...s }}>{text}</p>;
  const sectionTitle = (t, sub) => (
    <div style={{ marginTop: 40, marginBottom: 18 }}>
      <div style={{ fontSize: 22, fontWeight: 600, color: T.text, fontFamily: Fn, letterSpacing: "-0.015em" }}>{t}</div>
      {sub && <div style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, marginTop: 4 }}>{sub}</div>}
    </div>
  );

  /* ─── HEADER ─── */
  const header = (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
        <span style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 36, color: T.text }}>ASML</span>
        <span style={{ fontSize: 14, fontWeight: 600, color: T.textTer, fontFamily: Fn, letterSpacing: "0.04em" }}>ASML.AS / ASML</span>
        <Pill T={T} color={T.deepBlue} bg="rgba(29,78,216,0.08)">Technology Primer</Pill>
      </div>
      <div style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, marginBottom: 16 }}>
        Veldhoven, Netherlands · Sole supplier of EUV lithography systems
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10 }}>
        {heroStats.map((s, i) => <AnimatedStat key={i} stat={s} index={i} T={T} />)}
      </div>
    </div>
  );

  const stageColor = (i) => [T.deepBlue, T.capRed, T.purple, T.green][i % 4];

  return (
    <div>
      {header}

      <p style={{ fontSize: 15, color: T.text, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 24px", fontStyle: "italic" }}>{intro}</p>

      <Card T={T} style={{ padding: "22px 26px", marginBottom: 28, borderLeft: `4px solid ${T.capRed}` }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: T.capRed, fontFamily: Fn, letterSpacing: "0.08em", marginBottom: 12, textTransform: "uppercase" }}>The core problem</div>
        <p style={{ fontSize: 13.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.85, margin: 0 }}>{coreProblem}</p>
      </Card>

      <WavelengthComparison T={T} />

      {sectionTitle("The beam path, end to end", "Photon flow from tin plasma to silicon wafer.")}
      <BeamPathDiagram T={T} />

      {sectionTitle("Stage 1 — Making the light", "There is no native EUV source. ASML manufactures the photons via laser-produced plasma.")}
      <LPPAnimation T={T} />
      <Card T={T} style={{ padding: "22px 26px", marginBottom: 24, borderLeft: `4px solid ${stageColor(0)}` }}>
        <p style={{ fontSize: 13.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.85, margin: "0 0 16px" }}>{stages[0].intro}</p>
        <div style={{ display: "grid", gap: 10, marginBottom: 16 }}>
          {stages[0].steps.map((step, si) => (
            <div key={si} style={{ display: "flex", gap: 14, padding: "14px 16px", background: T.pillBg, borderRadius: T.radiusSm }}>
              <div style={{ flexShrink: 0, width: 7, height: 7, marginTop: 7, borderRadius: 4, background: stageColor(0) }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>{step.label}</div>
                <div style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.75 }}>{step.detail}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: "14px 18px", background: T.text === "#0F172A" ? "rgba(234,88,12,0.05)" : "rgba(251,146,60,0.08)", borderRadius: T.radiusSm, border: "1px solid " + T.border }}>
          <div style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.75 }}>{stages[0].closing}</div>
        </div>
      </Card>

      {sectionTitle("Stage 2 — Why everything must be a mirror", "At 13.5nm, glass, air, and conventional optics all absorb the light.")}
      <BraggMirror T={T} />
      <Card T={T} style={{ padding: "22px 26px", marginBottom: 24, borderLeft: `4px solid ${stageColor(1)}` }}>
        <p style={{ fontSize: 13.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.85, margin: "0 0 16px" }}>{stages[1].intro}</p>
        <div style={{ display: "grid", gap: 10, marginBottom: 16 }}>
          {stages[1].steps.map((step, si) => (
            <div key={si} style={{ display: "flex", gap: 14, padding: "14px 16px", background: T.pillBg, borderRadius: T.radiusSm }}>
              <div style={{ flexShrink: 0, width: 7, height: 7, marginTop: 7, borderRadius: 4, background: stageColor(1) }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>{step.label}</div>
                <div style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.75 }}>{step.detail}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: "14px 18px", background: T.text === "#0F172A" ? "rgba(234,88,12,0.05)" : "rgba(251,146,60,0.08)", borderRadius: T.radiusSm, border: "1px solid " + T.border }}>
          <div style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.75 }}>{stages[1].closing}</div>
        </div>
      </Card>
      <ReflectivityChart T={T} />

      {sectionTitle("Stage 3 — The reticle", "Even the photomask is a mirror.")}
      <Card T={T} style={{ padding: "22px 26px", marginBottom: 24, borderLeft: `4px solid ${stageColor(2)}` }}>
        <p style={{ fontSize: 13.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.85, margin: "0 0 16px" }}>{stages[2].intro}</p>
        <div style={{ display: "grid", gap: 10 }}>
          {stages[2].steps.map((step, si) => (
            <div key={si} style={{ display: "flex", gap: 14, padding: "14px 16px", background: T.pillBg, borderRadius: T.radiusSm }}>
              <div style={{ flexShrink: 0, width: 7, height: 7, marginTop: 7, borderRadius: 4, background: stageColor(2) }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>{step.label}</div>
                <div style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.75 }}>{step.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {sectionTitle("Stage 4 — Projection and scanning", "Six more mirrors, plus a synchronised wafer and reticle scan.")}
      <ScannerAnimation T={T} />
      <Card T={T} style={{ padding: "22px 26px", marginBottom: 24, borderLeft: `4px solid ${stageColor(3)}` }}>
        <p style={{ fontSize: 13.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.85, margin: "0 0 16px" }}>{stages[3].intro}</p>
        <div style={{ display: "grid", gap: 10 }}>
          {stages[3].steps.map((step, si) => (
            <div key={si} style={{ display: "flex", gap: 14, padding: "14px 16px", background: T.pillBg, borderRadius: T.radiusSm }}>
              <div style={{ flexShrink: 0, width: 7, height: 7, marginTop: 7, borderRadius: 4, background: stageColor(3) }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 4 }}>{step.label}</div>
                <div style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.75 }}>{step.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {sectionTitle("The two product generations", "High-NA unlocks sub-2nm logic without multi-patterning.")}
      <AnamorphicViz T={T} />
      <Card T={T} style={{ padding: 0, overflow: "hidden", marginBottom: 20 }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: Fn, fontSize: 12.5 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid " + T.border, background: T.pillBg }}>
                <th style={{ padding: "14px 18px", textAlign: "left", fontWeight: 600, color: T.textTer, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}> </th>
                <th style={{ padding: "14px 18px", textAlign: "left", fontWeight: 600, color: T.deepBlue, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>Low-NA (NXE:3800E)</th>
                <th style={{ padding: "14px 18px", textAlign: "left", fontWeight: 600, color: T.capRed, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>High-NA (EXE:5000)</th>
              </tr>
            </thead>
            <tbody>
              {productComparison.map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid " + T.border, background: i % 2 === 0 ? "transparent" : T.rowHover }}>
                  <td style={{ padding: "13px 18px", fontWeight: 500, color: T.text }}>{row.spec}</td>
                  <td style={{ padding: "13px 18px", color: T.textSec }}>{row.lowNa}</td>
                  <td style={{ padding: "13px 18px", color: T.textSec }}>{row.highNa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <div style={{ padding: "18px 22px", borderRadius: T.radius, background: T.text === "#0F172A" ? "rgba(124,58,237,0.05)" : "rgba(167,139,250,0.08)", border: "1px solid " + T.border, marginBottom: 0 }}>
        <div style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.8 }}>{highNaNote}</div>
      </div>

      {sectionTitle("Why this is an effective monopoly", "Components, integration, and capacity.")}
      <Card T={T} style={{ padding: "22px 26px", borderLeft: `4px solid ${T.deepBlue}` }}>
        <p style={{ fontSize: 13.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.85, margin: 0 }}>{monopolyClose}</p>
      </Card>
    </div>
  );
}
