import { useState, useEffect, useRef } from "react";
import { Fn, Fh } from "../theme";
import { Card, Pill } from "../components/shared";

/* ════════════════════════════════════════════════════════════════
   DATA — all primer content lives here, kept inline so the page
   reads top-to-bottom alongside the visuals that render it.
   ════════════════════════════════════════════════════════════════ */

const DHR_NAVY = "#0B2545";
const BIO = "#1E4D8C";
const LS = "#7A5197";
const DX = "#C2410C";

const heroStats = [
  { v: "$24.6B",  l: "FY2025 revenue",            c: "text" },
  { v: "82%",     l: "recurring revenue mix",     c: "deepBlue" },
  { v: "28.2%",   l: "group adj. op margin",      c: "green" },
  { v: "$5.3B",   l: "FY25 free cash flow",       c: "green" },
  { v: "152%",    l: "FCF / net income · FY25",   c: "purple" },
  { v: "34 yrs",  l: ">100% FCF conversion streak", c: "capRed" },
];

const tldr = [
  {
    n: "01",
    head: "Pure-play life sciences & diagnostics — narrower, deeper, higher-quality.",
    stat: "3 segments",
    statSub: "Bio · LS · Dx · roughly co-equal",
    body: "Post-Veralto (Sept 2023), Danaher is a focused life sciences & diagnostics compounder. Three roughly co-equal segments — Biotechnology ~$7.3B, Life Sciences ~$7.3B, Diagnostics ~$10.0B — built around Cytiva, Cepheid, Beckman, Leica and the recent Aldevron + Abcam tuck-ins. 82% recurring revenue, 28.2% group adj. operating margin.",
    color: DHR_NAVY,
  },
  {
    n: "02",
    head: "Bioprocessing cycle has turned. Equipment orders +>30% YoY in Q1 26.",
    stat: "+30%",
    statSub: "Q1 26 Cytiva equipment orders YoY",
    body: "First quarter of YoY equipment order growth in ~2 years. Blair on Apr 21 call: \"the early stages of a multi-year investment cycle.\" Brownfield activity today, greenfield in funnel, reshoring (China + US) explicitly cited. Equipment revenue still modestly down — orders lead revenue 2–4 quarters.",
    color: "#059669",
  },
  {
    n: "03",
    head: "Capital allocation re-engaged. Masimo deal pushes leverage to ~3.0–3.2x.",
    stat: "$9.9B",
    statSub: "Masimo agreement · Feb 16 2026",
    body: "$180/share cash, close expected 2H 2026. Pro-forma net debt/EBITDA ~3.0–3.2x — meaningful but well within historical post-Cytiva leverage. M&A capacity remains the upside lever in the QARP thesis. Capacity for transformational bioprocessing M&A constrained for 18–24 months while DHR delevers.",
    color: "#1D4ED8",
  },
  {
    n: "04",
    head: "Stage-3 variant perception: is –25% 5Y TSR a structural de-rate or a setup?",
    stat: "22–24x",
    statSub: "fwd P/E · 5Y comp ~30x",
    body: "Bull: bioprocessing recovery + Masimo accretion + DBS productivity drive HSD EPS CAGR through 2027–28 and a re-rate. Bear: 22–24x is fair-to-rich for a 3–6% core grower; the de-rate reflects lower secular growth, China drag, and DBS efficacy moderating in R&D-led portfolio.",
    color: "#9333EA",
  },
];

const segments = [
  {
    key: "bio", color: BIO, label: "Biotechnology",
    rev: 7.3, share: 30, coreFY25: 6.5, coreQ1: 7.0,
    margin: 37.9, recurring: 88, opcos: ["Cytiva", "Pall Biotech", "Aldevron"],
    drivers: "mAb volume · biologics pipeline · US+CN reshoring · ~20 Cytiva launches in 2025",
    headwinds: "Equipment capex still below pre-pandemic · CGT demand volatile · Sartorius/Repligen competition",
    geo: { NA: 33, EU: 35, HGM: 27, Other: 5 },
  },
  {
    key: "ls", color: LS, label: "Life Sciences",
    rev: 7.3, share: 30, coreFY25: -1.5, coreQ1: 0.5,
    margin: 24.0, recurring: 66, opcos: ["Beckman LS", "SCIEX", "Leica Micro", "Mol Devices", "Phenomenex", "IDT", "Abcam", "IDBS"],
    drivers: "SCIEX ZenoTOF · Leica Mica microscopy · Abcam recombinant proteins · IDT NGS oligos",
    headwinds: "Academic/govt funding · Pharma R&D capex muted · China domestic-substitution in instruments",
    geo: { NA: 41, EU: 23, HGM: 29, Other: 7 },
  },
  {
    key: "dx", color: DX, label: "Diagnostics",
    rev: 10.0, share: 41, coreFY25: 1.5, coreQ1: -4.0,
    margin: 27.6, recurring: 89, opcos: ["Beckman Dx", "Radiometer", "Leica Biosystems", "Cepheid", "HemoCue"],
    drivers: "Cepheid respiratory ~$1.8B FY26e · DxI 9000 menu expansion · Leica Aperio digital pathology",
    headwinds: "China VBP & reimbursement reform · tough respiratory comps · Q1 26 respiratory only ~$250M",
    geo: { NA: 50, EU: 17, HGM: 29, Other: 4 },
  },
];

// Bioprocessing cycle — horizontal timeline phases
const bioCycle = [
  { phase: "Pre-pandemic",     period: "2018-19",     label: "Cytiva growing low-double-digit", margin: 30, color: "#94A3B8" },
  { phase: "Pandemic surge",   period: "2020-22",     label: "Customers overstock; peak run-rate", margin: 35, color: "#10B981" },
  { phase: "Destock trough",   period: "Q4 22 – 2024", label: "Q3'23 bioproc core –20%; B:B ~0.8", margin: 29, color: "#DC2626" },
  { phase: "Stabilisation",    period: "H2 2024",      label: "Consumables stabilised; orders ↑", margin: 31, color: "#F59E0B" },
  { phase: "Recovery",         period: "FY 2025",      label: "Bio core +6.5%; consumables +HSD",  margin: 35, color: "#3B82F6" },
  { phase: "Equipment turn",   period: "Q1 2026",      label: "Equipment orders +>30% YoY",        margin: 37.9, color: "#059669", highlight: true },
  { phase: "Forward guide",    period: "FY 2026E",     label: "Core +3-6%; Bio MSD; EPS $8.35-55", margin: 38, color: "#7A5197" },
];

// Portfolio evolution — single timeline of M&A + spinouts
const portfolioEvents = [
  { y: 2015, m: "Aug", t: "Pall Corporation",      sz: "$13.8B",  k: "buy",  color: BIO },
  { y: 2016, m: "Jul", t: "Fortive spin-off",      sz: "~$6.1B",  k: "spin", color: "#94A3B8" },
  { y: 2016, m: "Nov", t: "Cepheid",               sz: "$4.0B",   k: "buy",  color: DX },
  { y: 2019, m: "Sep", t: "Envista spin-off",      sz: "~$2.8B",  k: "spin", color: "#94A3B8" },
  { y: 2020, m: "Mar", t: "Cytiva (GE Biopharma)", sz: "$21.4B",  k: "buy",  color: BIO },
  { y: 2021, m: "Aug", t: "Aldevron",              sz: "$9.6B",   k: "buy",  color: BIO },
  { y: 2023, m: "Sep", t: "Veralto spin-off",      sz: "~$5B",    k: "spin", color: "#94A3B8" },
  { y: 2023, m: "Dec", t: "Abcam",                 sz: "$5.7B",   k: "buy",  color: LS },
  { y: 2026, m: "Feb", t: "Masimo (pending)",      sz: "$9.9B",   k: "buy",  color: DX, future: true },
];

// DBS five pillars
const dbsPillars = [
  { id: "Leadership", color: "#1D4ED8", note: "GMDP talent pipeline" },
  { id: "Growth",     color: "#9333EA", note: "VoC · funnel · roadmap" },
  { id: "Lean",       color: "#059669", note: "Kaizen · PSP · VSM · daily mgmt" },
  { id: "Quality",    color: "#EA580C", note: "Six Sigma · gemba" },
  { id: "Innovation", color: "#C2410C", note: "R&D engine (added ~2018)" },
];

// Competitors per segment (each row: peer, lead, lag, share dot)
const comps = {
  bio: {
    color: BIO, title: "Biotechnology / Bioprocessing — Cytiva vs the field",
    rows: [
      { name: "Sartorius BPS",      scale: "€2.87B FY25 · 31.7% EBITDA",   lead: "Single-use bioreactors & bags; PFAS-free filters; faster EMEA recovery", lag: "Smaller resins/Protein A; weaker CGT fill-finish",       dhr: 4 },
      { name: "Thermo (LSS)",       scale: "~$4-5B bioproduction est.",     lead: "Gibco cell-culture media #1; analytical cross-sell; +Solventum filtration", lag: "No Protein A franchise vs MabSelect; smaller SUB share", dhr: 3 },
      { name: "Merck KGaA (PS)",    scale: "€4.5B Process Solutions",       lead: "Millipore filtration, virus safety/clearance, premium pricing",      lag: "Weaker single-use hardware; smaller CGT footprint",      dhr: 3 },
      { name: "Repligen",           scale: "$738M FY25 · +16% organic",     lead: "Best-in-class TFF (Spectrum), OPUS pre-packed, ATF cell retention",  lag: "No resin · no bioreactor · no global service",           dhr: 2 },
    ],
  },
  ls: {
    color: LS, title: "Life Sciences — instruments & reagents",
    rows: [
      { name: "Thermo (AI + LPBS)", scale: "$44.6B group",        lead: "Fisher Scientific channel; Orbitrap proteomics; Ion Torrent NGS",   lag: "Weaker microscopy vs Leica; specialist niche gaps",   dhr: 3 },
      { name: "Agilent",            scale: "$6.95B FY25 (+6.7%)", lead: "LC/MS, GC, GC-MS scale; NASD oligo CDMO; DAKO pathology dyes",      lag: "No bioprocessing; weaker microscopy & cytometry",     dhr: 4 },
      { name: "Waters",             scale: "~$3.0B FY25e",        lead: "UPLC/LC leadership pharma QC; Wyatt light scattering",              lag: "No microscopy / flow / antibodies",                   dhr: 5 },
      { name: "Bruker",             scale: "~$3.4B",              lead: "NMR, MALDI-TOF clinical micro, preclinical imaging",                lag: "No general LC; no antibodies; no bioprocessing",      dhr: 5 },
      { name: "Bio-Techne",         scale: "~$1.2B",              lead: "Recombinant proteins; Simple Western, ELLA assays",                 lag: "Sub-scale vs DHR LS breadth",                         dhr: 4 },
      { name: "Revvity",            scale: "~$2.9B",              lead: "Neonatal screening; reagents",                                      lag: "Lost imaging franchise (sold inspection units)",      dhr: 4 },
    ],
  },
  dx: {
    color: DX, title: "Diagnostics — instrumented & molecular",
    rows: [
      { name: "Roche Dx",           scale: "CHF ~15B",  lead: "cobas immuno/chem #1; Ventana tissue Dx leads Leica; cobas 6800 molecular", lag: "Decentralised molecular (Cepheid wins POL/hospital mid)", dhr: 3 },
      { name: "Abbott Dx",          scale: "~$11B",     lead: "i-STAT POC; Alinity ci core lab; FreeStyle Libre adjacent",                 lag: "No Cepheid analog; weaker tissue Dx",                     dhr: 3 },
      { name: "Siemens Healthineers", scale: "~€5B",    lead: "Atellica immuno/chem; imaging integration",                                 lag: "Sub-scale molecular; weak blood gas",                     dhr: 4 },
      { name: "BD Dx",              scale: "~$3.5B",    lead: "BD MAX, Veritor; flow cytometry leadership vs Beckman LS",                  lag: "Smaller molecular menu than Cepheid; weak blood gas",     dhr: 4 },
      { name: "Sysmex",             scale: "~¥450B",    lead: "Hematology global #1 (vs Beckman DxH)",                                     lag: "Weaker molecular & tissue Dx",                            dhr: 4 },
      { name: "bioMérieux",         scale: "€4.07B FY25 (+6.2%)", lead: "BioFire syndromic panels — direct GeneXpert competitor",          lag: "Weaker cardiac immuno; weaker blood gas",                 dhr: 3 },
    ],
  },
};

// KPI dashboard
const kpis = [
  { l: "Biotech core revenue YoY",        v: "+7.0%",  s: "Q1 26 · FY25 +6.5%",      dir: 1, pct: 70, color: "#059669" },
  { l: "Cytiva equipment orders YoY",     v: "+>30%",  s: "Q1 26 · first +YoY in ~2y", dir: 1, pct: 95, color: "#059669", star: true },
  { l: "Bioproc consumables book:bill",   v: "~1.0",   s: "Q4 25 · at target",       dir: 0, pct: 50, color: "#3B82F6" },
  { l: "Consumables vs equipment growth", v: "HSD/–LSD", s: "Q1 26 mix shift",      dir: 1, pct: 60, color: "#3B82F6" },
  { l: "China core revenue YoY",          v: "–MSD",   s: "FY25 · VBP drag",         dir: -1, pct: 30, color: "#DC2626" },
  { l: "Group adj. op margin (Q4 25)",    v: "28.3%",  s: "Bio 37.9 / LS 24 / Dx 27.6", dir: 1, pct: 80, color: "#059669" },
  { l: "FCF / net income · FY25",         v: "152%",   s: "34th yr >100%",           dir: 1, pct: 95, color: "#059669", star: true },
  { l: "Net debt / EBITDA",               v: "1.9x",   s: "→ 3.0–3.2x post-Masimo",  dir: 0, pct: 55, color: "#EA580C" },
  { l: "R&D / revenue",                   v: "6.5%",   s: "$1,598M FY25 · stable",   dir: 0, pct: 65, color: "#9333EA" },
  { l: "Capex / revenue",                 v: "4.7%",   s: "$1,156M FY25 · ↓ from 5.8%", dir: 1, pct: 47, color: "#3B82F6" },
  { l: "Recurring revenue share",         v: "82%",    s: "82% FY25 · structural ↑", dir: 1, pct: 82, color: "#1D4ED8" },
  { l: "ROIC ex-goodwill (est.)",         v: "25-28%", s: "ROIC incl. goodwill ~8-9%", dir: 1, pct: 85, color: "#7A5197" },
];

const openQuestions = [
  { n: "Q1", t: "Is the bioprocessing recovery durable, or FY26 a restock bounce?",                          bull: 65, color: "#059669" },
  { n: "Q2", t: "Is the –25% 5Y TSR a structural QARP de-rate or a setup for re-rate?",                       bull: 55, color: "#3B82F6" },
  { n: "Q3", t: "Is the $9.9B Masimo deal the \"right\" use of post-Veralto firepower?",                      bull: 50, color: "#EA580C" },
  { n: "Q4", t: "Has China Life Sciences exposure bottomed, and is domestic substitution accelerating?",       bull: 40, color: "#DC2626" },
  { n: "Q5", t: "Diagnostics growth quality — Cepheid respiratory durability beyond restock comps?",          bull: 60, color: "#7A5197" },
  { n: "Q6", t: "Cytiva margin trajectory: pre-destock peak or structurally lower run-rate?",                 bull: 58, color: BIO },
];

/* ════════════════════════════════════════════════════════════════
   ATOMS — visual building blocks
   ════════════════════════════════════════════════════════════════ */

function SectionTitle({ kicker, title, sub, T }) {
  return (
    <div style={{ marginBottom: 20, marginTop: 36 }}>
      {kicker && <div style={{ fontSize: 10, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>{kicker}</div>}
      <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 32, color: T.text, lineHeight: 1.1, letterSpacing: "-0.02em" }}>{title}</div>
      {sub && <div style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, marginTop: 8, lineHeight: 1.55, maxWidth: 760 }}>{sub}</div>}
    </div>
  );
}

/* Animated number that counts up on mount */
function CountUp({ value, suffix = "", prefix = "", decimals = 0 }) {
  const [n, setN] = useState(0);
  const startRef = useRef(null);
  useEffect(() => {
    const target = parseFloat(value);
    if (isNaN(target)) { setN(value); return; }
    startRef.current = performance.now();
    const dur = 900;
    const ease = t => 1 - Math.pow(1 - t, 3);
    let raf;
    const step = (now) => {
      const p = Math.min((now - startRef.current) / dur, 1);
      setN(target * ease(p));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <span style={{ fontVariantNumeric: "tabular-nums" }}>{prefix}{typeof n === "number" ? n.toFixed(decimals) : n}{suffix}</span>;
}

/* Donut with center label + animated draw */
function Donut({ data, size = 220, thickness = 28, T, centerTop, centerBottom }) {
  const r = size / 2 - thickness / 2 - 4;
  const cx = size / 2, cy = size / 2;
  const C = 2 * Math.PI * r;
  let acc = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={T.pillBg} strokeWidth={thickness} />
      {data.map((d, i) => {
        const len = (d.share / 100) * C;
        const off = -acc;
        acc += len;
        return (
          <circle
            key={i}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={d.color}
            strokeWidth={thickness}
            strokeDasharray={`${len} ${C - len}`}
            strokeDashoffset={off}
            transform={`rotate(-90 ${cx} ${cy})`}
            style={{ transition: "all 0.8s ease" }}
          />
        );
      })}
      {centerTop && <text x={cx} y={cy - 4} textAnchor="middle" fontFamily={Fh} fontStyle="italic" fontSize={26} fill={T.text} letterSpacing="-0.02em">{centerTop}</text>}
      {centerBottom && <text x={cx} y={cy + 16} textAnchor="middle" fontFamily={Fn} fontSize={10} fontWeight={700} fill={T.textTer} letterSpacing="0.12em">{centerBottom}</text>}
    </svg>
  );
}

/* Radial gauge (0-100) with arc + needle */
function Gauge({ value, max = 100, label, sub, color, T, size = 130 }) {
  const w = size, h = size * 0.62;
  const cx = w / 2, cy = h - 6;
  const r = w / 2 - 8;
  const start = Math.PI, end = 0; // semicircle, left-to-right
  const ang = start + (end - start) * Math.min(1, value / max);
  const arc = (a1, a2) => {
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
    const large = Math.abs(a2 - a1) > Math.PI ? 1 : 0;
    const sweep = a2 > a1 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} ${sweep} ${x2} ${y2}`;
  };
  return (
    <svg width={w} height={h + 8} viewBox={`0 0 ${w} ${h + 8}`}>
      <path d={arc(start, end)} stroke={T.pillBg} strokeWidth="9" fill="none" strokeLinecap="round" />
      <path d={arc(start, ang)} stroke={color} strokeWidth="9" fill="none" strokeLinecap="round" style={{ transition: "all 0.8s" }} />
      <circle cx={cx} cy={cy} r={3} fill={color} />
      <line x1={cx} y1={cy} x2={cx + (r - 4) * Math.cos(ang)} y2={cy + (r - 4) * Math.sin(ang)} stroke={color} strokeWidth="2" strokeLinecap="round" />
      {label && <text x={cx} y={cy - r + 14} textAnchor="middle" fontFamily={Fn} fontWeight={800} fontSize={15} fill={T.text}>{label}</text>}
      {sub && <text x={cx} y={cy - r + 28} textAnchor="middle" fontFamily={Fn} fontSize={8.5} fontWeight={700} fill={T.textTer} letterSpacing="0.1em">{sub}</text>}
    </svg>
  );
}

/* Bullet bar — value vs target, used in segment scoreboard */
function Bullet({ label, value, signed = false, suffix = "%", max, color, T }) {
  const av = Math.abs(value);
  const w = Math.min(100, (av / max) * 100);
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: T.textSec, fontFamily: Fn }}>{label}</span>
        <span style={{ fontSize: 11.5, fontWeight: 700, color, fontFamily: Fn, fontVariantNumeric: "tabular-nums" }}>{signed && value > 0 ? "+" : ""}{value}{suffix}</span>
      </div>
      <div style={{ height: 6, borderRadius: 3, background: T.pillBg, overflow: "hidden", position: "relative" }}>
        {value < 0
          ? <div style={{ position: "absolute", right: "50%", top: 0, bottom: 0, width: w / 2 + "%", background: color, borderRadius: 3 }} />
          : <div style={{ position: "absolute", left: signed ? "50%" : 0, top: 0, bottom: 0, width: (signed ? w / 2 : w) + "%", background: color, borderRadius: 3, transition: "width 0.8s" }} />
        }
        {signed && <div style={{ position: "absolute", left: "50%", top: -1, bottom: -1, width: 1, background: T.textTer }} />}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   BIG VISUAL — Bioprocessing cycle horizontal timeline
   ════════════════════════════════════════════════════════════════ */
function BioCycleTimeline({ T }) {
  const W = 980, H = 230;
  const padL = 60, padR = 60, padT = 30, padB = 60;
  const innerW = W - padL - padR, innerH = H - padT - padB;
  const n = bioCycle.length;
  const xs = bioCycle.map((_, i) => padL + (innerW / (n - 1)) * i);
  const yScale = m => padT + innerH - ((m - 25) / 18) * innerH;
  const pts = bioCycle.map((b, i) => [xs[i], yScale(b.margin)]);
  const path = pts.map(([x, y], i) => (i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`)).join(" ");
  const area = path + ` L ${xs[n - 1]} ${padT + innerH} L ${xs[0]} ${padT + innerH} Z`;

  return (
    <Card T={T} style={{ padding: "24px 0 8px", overflow: "hidden" }}>
      <div style={{ padding: "0 28px 6px", display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.12em", textTransform: "uppercase" }}>Cytiva margin trajectory across the cycle</div>
        <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, fontStyle: "italic" }}>x-axis = phase · y-axis = approx. operating margin (%) · star = inflection point</div>
      </div>
      <div style={{ overflowX: "auto" }}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
          <defs>
            <linearGradient id="bioArea" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%"  stopColor={DHR_NAVY} stopOpacity="0.20" />
              <stop offset="100%" stopColor={DHR_NAVY} stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Grid */}
          {[28, 32, 36, 40].map(m => (
            <g key={m}>
              <line x1={padL} x2={W - padR} y1={yScale(m)} y2={yScale(m)} stroke={T.border} strokeDasharray="2 4" />
              <text x={padL - 8} y={yScale(m) + 3} fontFamily={Fn} fontSize={9} fill={T.textTer} textAnchor="end">{m}%</text>
            </g>
          ))}
          {/* Area + line */}
          <path d={area} fill="url(#bioArea)" />
          <path d={path} fill="none" stroke={DHR_NAVY} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Phase markers + labels */}
          {bioCycle.map((b, i) => {
            const [x, y] = pts[i];
            return (
              <g key={i}>
                {b.highlight && <circle cx={x} cy={y} r="14" fill="none" stroke={b.color} strokeWidth="2" opacity="0.4">
                  <animate attributeName="r" from="10" to="22" dur="1.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="1.8s" repeatCount="indefinite" />
                </circle>}
                <circle cx={x} cy={y} r={b.highlight ? 7 : 5} fill={b.color} stroke={T.card} strokeWidth="2" />
                {/* Phase label below the line */}
                <text x={x} y={padT + innerH + 16} textAnchor="middle" fontFamily={Fn} fontSize={9.5} fontWeight={700} fill={b.color} letterSpacing="0.04em">{b.phase.toUpperCase()}</text>
                <text x={x} y={padT + innerH + 30} textAnchor="middle" fontFamily={Fn} fontSize={9} fill={T.textTer}>{b.period}</text>
                {/* Margin tag above */}
                <text x={x} y={y - 12} textAnchor="middle" fontFamily={Fn} fontSize={10.5} fontWeight={800} fill={b.color}>{b.margin}%</text>
              </g>
            );
          })}

          {/* Big inflection callout */}
          <g transform={`translate(${pts[5][0] - 130}, ${pts[5][1] - 78})`}>
            <rect x="0" y="0" width="160" height="38" rx="6" fill="#05966910" stroke="#059669" />
            <text x="80" y="15" textAnchor="middle" fontFamily={Fn} fontSize={9.5} fontWeight={800} fill="#059669" letterSpacing="0.1em">EQUIPMENT TURN</text>
            <text x="80" y="30" textAnchor="middle" fontFamily={Fh} fontStyle="italic" fontSize={14} fontWeight={700} fill="#059669">+30% orders YoY</text>
          </g>
        </svg>
      </div>
      <div style={{ padding: "12px 28px 20px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10 }}>
        {bioCycle.map((b, i) => (
          <div key={i} style={{ padding: "8px 10px", background: b.color + "10", borderLeft: `3px solid ${b.color}`, borderRadius: 4 }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: b.color, fontFamily: Fn, letterSpacing: "0.06em" }}>{b.phase.toUpperCase()}</div>
            <div style={{ fontSize: 10.5, color: T.textSec, fontFamily: Fn, marginTop: 3, lineHeight: 1.4 }}>{b.label}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ════════════════════════════════════════════════════════════════
   PORTFOLIO EVOLUTION — single horizontal timeline
   ════════════════════════════════════════════════════════════════ */
function PortfolioTimeline({ T }) {
  const W = 980, H = 230;
  const padL = 40, padR = 40, padT = 70, padB = 50;
  const yMid = padT + (H - padT - padB) / 2;
  const xMin = 2015, xMax = 2026.5;
  const x = (y, m = 6) => padL + ((y + (m - 1) / 12) - xMin) / (xMax - xMin) * (W - padL - padR);

  return (
    <Card T={T} style={{ padding: "20px 0 16px", overflow: "hidden" }}>
      <div style={{ padding: "0 28px 6px", display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap" }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.12em", textTransform: "uppercase" }}>Portfolio evolution — 11 years of focusing the franchise</div>
        <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, fontStyle: "italic" }}>● acquisitions (segment-coloured) · ◇ spin-offs · ⌛ pending</div>
      </div>
      <div style={{ overflowX: "auto" }}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
          {/* Spine */}
          <line x1={padL} y1={yMid} x2={W - padR} y2={yMid} stroke={T.border} strokeWidth="2" />
          {/* Year ticks */}
          {[2015, 2017, 2019, 2021, 2023, 2025].map(yr => (
            <g key={yr}>
              <line x1={x(yr, 1)} y1={yMid - 4} x2={x(yr, 1)} y2={yMid + 4} stroke={T.textTer} />
              <text x={x(yr, 1)} y={yMid + 22} textAnchor="middle" fontFamily={Fn} fontSize={10} fill={T.textTer}>{yr}</text>
            </g>
          ))}
          {/* Events */}
          {portfolioEvents.map((e, i) => {
            const px = x(e.y, e.m === "Jan" ? 1 : e.m === "Feb" ? 2 : e.m === "Mar" ? 3 : e.m === "Jul" ? 7 : e.m === "Aug" ? 8 : e.m === "Sep" ? 9 : e.m === "Nov" ? 11 : e.m === "Dec" ? 12 : 6);
            const above = i % 2 === 0;
            const py = above ? padT + 4 : yMid + 56;
            const cy = above ? yMid - 10 : yMid + 10;
            return (
              <g key={i}>
                <line x1={px} y1={yMid} x2={px} y2={cy} stroke={e.color} strokeWidth="1" strokeDasharray={e.future ? "3 3" : "0"} />
                {e.k === "spin"
                  ? <polygon points={`${px},${cy - 6} ${px + 6},${cy} ${px},${cy + 6} ${px - 6},${cy}`} fill={T.card} stroke={e.color} strokeWidth="1.5" />
                  : <circle cx={px} cy={cy} r="7" fill={e.color} stroke={T.card} strokeWidth="2" opacity={e.future ? 0.6 : 1} />
                }
                {/* Label card */}
                <foreignObject x={px - 80} y={above ? py - 56 : py - 6} width="160" height="58">
                  <div style={{
                    background: T.card, borderRadius: 6, padding: "5px 8px",
                    boxShadow: T.shadow, border: `1px solid ${e.color}55`,
                    fontFamily: Fn, textAlign: "center",
                  }}>
                    <div style={{ fontSize: 9, fontWeight: 800, color: e.color, letterSpacing: "0.05em" }}>{e.m} {e.y}{e.future ? " · pending" : ""}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: T.text, lineHeight: 1.15, marginTop: 2 }}>{e.t}</div>
                    <div style={{ fontSize: 9.5, color: T.textTer, marginTop: 2 }}>{e.sz}</div>
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>
      </div>
    </Card>
  );
}

/* ════════════════════════════════════════════════════════════════
   DBS PENTAGON — radial 5-pillar diagram
   ════════════════════════════════════════════════════════════════ */
function DBSPentagon({ T }) {
  const size = 360, cx = size / 2, cy = size / 2 + 6, R = 130;
  const angles = dbsPillars.map((_, i) => -Math.PI / 2 + (i * 2 * Math.PI) / 5);
  const pts = angles.map(a => [cx + R * Math.cos(a), cy + R * Math.sin(a)]);
  const labelPts = angles.map(a => [cx + (R + 38) * Math.cos(a), cy + (R + 38) * Math.sin(a)]);
  return (
    <Card T={T} style={{ padding: "24px 26px", overflow: "hidden" }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>The Danaher Business System</div>
      <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 22, color: T.text, lineHeight: 1.15, marginBottom: 6 }}>Five pillars · ~100+ tools · gemba-led, kaizen-driven</div>
      <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.6, marginBottom: 18 }}>
        Adopted late 1980s after studying Toyota Production System (Shingijutsu lineage via Jacobs Vehicle Systems). From 1990–2023, diluted EPS compounded ~10,000% — DBS is the operating throughline. The Innovation pillar was added ~2018 to address R&D-led businesses (Cytiva, SCIEX).
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 30 }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Concentric guides */}
          {[0.35, 0.7, 1].map((s, i) => (
            <polygon key={i} points={angles.map(a => `${cx + R * s * Math.cos(a)},${cy + R * s * Math.sin(a)}`).join(" ")} fill="none" stroke={T.border} strokeWidth="1" />
          ))}
          {/* Spokes */}
          {pts.map(([x, y], i) => (
            <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={T.border} strokeWidth="1" />
          ))}
          {/* Pillar nodes */}
          {dbsPillars.map((p, i) => {
            const [x, y] = pts[i];
            return (
              <g key={p.id}>
                <circle cx={x} cy={y} r="22" fill={p.color} stroke={T.card} strokeWidth="3" />
                <text x={x} y={y + 4} textAnchor="middle" fontFamily={Fn} fontSize={10} fontWeight={800} fill="#fff" letterSpacing="0.04em">{p.id.slice(0, 4).toUpperCase()}</text>
              </g>
            );
          })}
          {/* Outer labels */}
          {dbsPillars.map((p, i) => {
            const [x, y] = labelPts[i];
            return (
              <g key={"l" + p.id}>
                <text x={x} y={y - 4} textAnchor="middle" fontFamily={Fn} fontSize={11.5} fontWeight={700} fill={p.color}>{p.id}</text>
                <text x={x} y={y + 10} textAnchor="middle" fontFamily={Fn} fontSize={9.5} fill={T.textTer}>{p.note}</text>
              </g>
            );
          })}
          {/* Center hub */}
          <circle cx={cx} cy={cy} r="34" fill={DHR_NAVY} />
          <text x={cx} y={cy - 4} textAnchor="middle" fontFamily={Fh} fontStyle="italic" fontSize={20} fill="#fff" letterSpacing="-0.02em">DBS</text>
          <text x={cx} y={cy + 14} textAnchor="middle" fontFamily={Fn} fontSize={8} fontWeight={700} fill="#fff" letterSpacing="0.12em">SINCE 1988</text>
        </svg>
        <div style={{ maxWidth: 320, display: "grid", gap: 8 }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.12em", textTransform: "uppercase" }}>What DBS reliably delivers</div>
          {[
            { k: "Pall (2015)",   v: "mid-teens → mid-20s OPM in 3-5 yrs", c: BIO },
            { k: "Cytiva (2020)", v: "28-30% → 37.9% Q4 25 adj. OPM",     c: BIO },
            { k: "Inventory turns", v: "Cytiva +30% within 24 months",     c: "#3B82F6" },
            { k: "FCF / NI",       v: "34 consecutive years > 100%",       c: "#059669" },
          ].map(d => (
            <div key={d.k} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: d.c, flexShrink: 0 }} />
              <div style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.45 }}><span style={{ fontWeight: 700, color: T.text }}>{d.k}.</span> {d.v}</div>
            </div>
          ))}
          <div style={{ fontSize: 10, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 12 }}>Where DBS does <em>not</em> help yet</div>
          {[
            "R&D-led innovation pace in unfamiliar science (Cytiva continuous bioprocessing vs Sartorius)",
            "End-market cyclicality (2022-24 destock — operating excellence resilient but cycle not engineerable)",
            "China structural risk — VBP and domestic-substitution by Mindray / Sansure / BGI / EDAN",
          ].map((t, i) => (
            <div key={i} style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.5, paddingLeft: 16, position: "relative" }}>
              <span style={{ position: "absolute", left: 0, top: 6, width: 8, height: 1.5, background: T.capRed }} />{t}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

/* ════════════════════════════════════════════════════════════════
   COMPETITOR MATRIX — one per segment
   ════════════════════════════════════════════════════════════════ */
function CompetitorMatrix({ seg, T }) {
  return (
    <Card T={T} style={{ padding: "22px 24px", overflow: "hidden", borderLeft: `4px solid ${seg.color}` }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: T.text, fontFamily: Fn }}>{seg.title}</div>
        <div style={{ fontSize: 10, fontWeight: 700, color: seg.color, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase" }}>DHR strength dots ●●●●● = high · ● = sub-scale</div>
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        {seg.rows.map((r, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "minmax(140px, 1.1fr) minmax(150px, 1.2fr) minmax(170px, 2fr) minmax(140px, 1.6fr) 80px", gap: 12, alignItems: "center", padding: "10px 12px", background: i % 2 === 0 ? T.pillBg : "transparent", borderRadius: 6 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: T.text, fontFamily: Fn }}>{r.name}</div>
            </div>
            <div style={{ fontSize: 10.5, color: T.textTer, fontFamily: Fn, fontVariantNumeric: "tabular-nums" }}>{r.scale}</div>
            <div style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.45 }}>
              <span style={{ fontSize: 9, fontWeight: 800, color: "#059669", letterSpacing: "0.08em", marginRight: 4 }}>LEADS</span>{r.lead}
            </div>
            <div style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.45 }}>
              <span style={{ fontSize: 9, fontWeight: 800, color: "#DC2626", letterSpacing: "0.08em", marginRight: 4 }}>LAGS</span>{r.lag}
            </div>
            <div style={{ display: "flex", gap: 3, justifyContent: "flex-end" }}>
              {[1, 2, 3, 4, 5].map(d => (
                <span key={d} style={{ width: 7, height: 7, borderRadius: "50%", background: d <= r.dhr ? seg.color : T.border }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ════════════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════════════ */
export default function Danaher({ T }) {
  const totalRev = segments.reduce((s, x) => s + x.rev, 0);

  return (
    <div style={{ paddingBottom: 60 }}>
      {/* ── HERO STRIP ─────────────────────────────────────────── */}
      <div style={{
        background: `linear-gradient(135deg, ${DHR_NAVY} 0%, #1E3A5F 60%, ${BIO} 100%)`,
        borderRadius: T.radius,
        padding: "32px 36px",
        color: "#fff",
        marginBottom: 24,
        position: "relative",
        overflow: "hidden",
        boxShadow: T.shadowLg,
      }}>
        {/* Decorative giant ticker letters */}
        <div style={{ position: "absolute", right: -20, top: -40, fontFamily: Fh, fontStyle: "italic", fontSize: 280, lineHeight: 0.8, color: "rgba(255,255,255,0.06)", letterSpacing: "-0.04em", pointerEvents: "none", userSelect: "none" }}>DHR</div>
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <Pill T={T} color="#fff" bg="rgba(255,255,255,0.15)">NYSE · DHR</Pill>
            <Pill T={T} color="#fff" bg="rgba(255,255,255,0.15)">Washington D.C.</Pill>
            <Pill T={T} color="#fff" bg="rgba(255,255,255,0.15)">Stage 2 primer · 21 May 2026</Pill>
            <Pill T={T} color={"#fff"} bg="rgba(16,185,129,0.35)">● Bioproc cycle TURNING</Pill>
          </div>
          <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 56, lineHeight: 1.0, letterSpacing: "-0.03em", marginBottom: 8 }}>Danaher Corporation</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.78)", fontFamily: Fn, lineHeight: 1.6, maxWidth: 780, marginBottom: 22 }}>
            Post-Veralto, pure-play life sciences &amp; diagnostics compounder · three roughly co-equal segments · 82% recurring · 28.2% group adj. operating margin · 34th consecutive year of &gt;100% FCF/net-income conversion. The Q1 2026 print delivered the swing factor — Cytiva equipment orders accelerated to <strong>+&gt;30% YoY</strong> after nearly two years of decline.
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10 }}>
            {heroStats.map((s, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.10)",
                backdropFilter: "blur(6px)",
                borderRadius: 10,
                padding: "12px 14px",
                border: "1px solid rgba(255,255,255,0.15)",
                animation: "fadeIn 0.6s ease both",
                animationDelay: (i * 0.06) + "s",
              }}>
                <div style={{ fontSize: 22, fontWeight: 700, fontFamily: Fn, letterSpacing: "-0.02em", lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.7)", fontFamily: Fn, marginTop: 6, letterSpacing: "0.04em" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TL;DR TAKEAWAYS ──────────────────────────────────── */}
      <SectionTitle kicker="Decision-ready synthesis" title="Four things to walk in with." sub="Filed through a QARP / ROIC lens — what changed, what investors are pricing, what could re-rate the multiple, and what could break it." T={T} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
        {tldr.map(t => (
          <div key={t.n} style={{
            background: T.card, borderRadius: T.radius, boxShadow: T.shadow,
            padding: "22px 24px", borderTop: `3px solid ${t.color}`,
            display: "flex", flexDirection: "column",
            animation: "fadeIn 0.5s ease both", animationDelay: (parseInt(t.n) * 0.08) + "s",
          }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 38, color: T.textTer, lineHeight: 1, letterSpacing: "-0.04em" }}>{t.n}</div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: t.color, fontFamily: Fn, lineHeight: 1, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>{t.stat}</div>
                <div style={{ fontSize: 9, fontWeight: 700, color: T.textTer, fontFamily: Fn, letterSpacing: "0.1em", marginTop: 4, textTransform: "uppercase" }}>{t.statSub}</div>
              </div>
            </div>
            <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 19, color: T.text, lineHeight: 1.22, letterSpacing: "-0.01em", marginBottom: 12 }}>{t.head}</div>
            <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.65 }}>{t.body}</div>
          </div>
        ))}
      </div>

      {/* ── SEGMENT ARCHITECTURE ──────────────────────────────── */}
      <SectionTitle kicker="Section 2 · Segment architecture" title="Three roughly co-equal segments." sub="Biotechnology (Cytiva-centric) and Life Sciences are tied at ~$7.3B; Diagnostics is the largest at ~$10.0B. Abcam sits in Life Sciences; Aldevron sits in Biotechnology." T={T} />
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 28, alignItems: "center", background: T.card, borderRadius: T.radius, padding: "24px 28px", boxShadow: T.shadow, marginBottom: 20 }}>
        <Donut
          data={segments.map(s => ({ share: (s.rev / totalRev) * 100, color: s.color }))}
          size={240} thickness={36} T={T}
          centerTop="$24.6B" centerBottom="FY2025 GROUP"
        />
        <div style={{ display: "grid", gap: 12 }}>
          {segments.map(s => (
            <div key={s.key} style={{ display: "grid", gridTemplateColumns: "12px 1fr auto", gap: 14, alignItems: "center" }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: s.color }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.text, fontFamily: Fn }}>{s.label}</div>
                <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginTop: 2 }}>{s.opcos.slice(0, 5).join(" · ")}{s.opcos.length > 5 ? " · …" : ""}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: s.color, fontFamily: Fn, fontVariantNumeric: "tabular-nums" }}>${s.rev.toFixed(1)}B</div>
                <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn }}>{((s.rev / totalRev) * 100).toFixed(0)}% of group</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Segment cards — 3-column with bullets + recurring gauge */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 14, marginBottom: 4 }}>
        {segments.map(s => (
          <div key={s.key} style={{ background: T.card, borderRadius: T.radius, boxShadow: T.shadow, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div style={{ background: s.color, color: "#fff", padding: "14px 18px" }}>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", opacity: 0.88 }}>{s.label.toUpperCase()}</div>
              <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 30, lineHeight: 1.05, marginTop: 2 }}><CountUp value={s.rev} decimals={1} prefix="$" suffix="B" /></div>
              <div style={{ fontSize: 11, opacity: 0.85, marginTop: 4 }}>{s.share}% of FY25 group revenue</div>
            </div>
            <div style={{ padding: "16px 18px", flex: 1, display: "flex", flexDirection: "column" }}>
              <Bullet label="Core growth · FY25" value={s.coreFY25} signed suffix="%" max={10} color={s.coreFY25 >= 0 ? "#059669" : "#DC2626"} T={T} />
              <Bullet label="Core growth · Q1 26" value={s.coreQ1}  signed suffix="%" max={10} color={s.coreQ1   >= 0 ? "#059669" : "#DC2626"} T={T} />
              <Bullet label="Adj. op margin (Q4 25)" value={s.margin} suffix="%" max={45} color={s.color} T={T} />
              <div style={{ display: "flex", justifyContent: "center", margin: "8px 0 4px" }}>
                <Gauge value={s.recurring} max={100} label={s.recurring + "%"} sub="RECURRING" color={s.color} T={T} size={130} />
              </div>
              <div style={{ marginTop: 4, fontSize: 10, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.1em" }}>DRIVERS</div>
              <div style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.5, marginTop: 4 }}>{s.drivers}</div>
              <div style={{ marginTop: 10, fontSize: 10, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.1em" }}>HEADWINDS</div>
              <div style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.5, marginTop: 4 }}>{s.headwinds}</div>
              {/* Geo mini bars */}
              <div style={{ marginTop: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.1em", marginBottom: 6 }}>GEOGRAPHIC MIX</div>
                <div style={{ display: "flex", borderRadius: 4, overflow: "hidden", height: 10 }}>
                  <div style={{ width: s.geo.NA + "%", background: "#1D4ED8" }} title={`NA ${s.geo.NA}%`} />
                  <div style={{ width: s.geo.EU + "%", background: "#9333EA" }} title={`W.Eur ${s.geo.EU}%`} />
                  <div style={{ width: s.geo.HGM + "%", background: "#EA580C" }} title={`HGM ${s.geo.HGM}%`} />
                  <div style={{ width: s.geo.Other + "%", background: "#94A3B8" }} title={`Other ${s.geo.Other}%`} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5, fontSize: 9.5, color: T.textTer, fontFamily: Fn }}>
                  <span>NA {s.geo.NA}%</span><span>W.Eur {s.geo.EU}%</span><span>HGM {s.geo.HGM}%</span><span>Other {s.geo.Other}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── BIOPROCESSING CYCLE TIMELINE ────────────────────── */}
      <SectionTitle
        kicker="Section 3 · The swing factor"
        title="The bioprocessing cycle has turned."
        sub={<>Cytiva equipment orders accelerated to <strong style={{ color: "#059669" }}>+&gt;30% YoY in Q1 2026</strong> — the first quarter of YoY equipment order growth in nearly two years. Blair (April 21 call): <em>"the early stages of a multi-year investment cycle."</em> Sartorius BPS corroborates: ~+9% c.c. FY25 with EBITDA margin +240 bps to 31.7%. Repligen +16% organic non-COVID.</>}
        T={T}
      />
      <BioCycleTimeline T={T} />

      {/* ── PORTFOLIO EVOLUTION ──────────────────────────────── */}
      <SectionTitle kicker="Section 4 · M&A + spin-offs" title="A franchise deliberately narrowed three times in ten years." sub="Pall + Cepheid + Cytiva + Aldevron + Abcam built the platform; Fortive, Envista, and Veralto removed the cyclical / dental / water-quality businesses. Masimo (pending) is the first post-Veralto major capital deployment." T={T} />
      <PortfolioTimeline T={T} />

      {/* ── DBS PENTAGON ─────────────────────────────────────── */}
      <SectionTitle kicker="Section 5 · The operating system" title="DBS is the throughline." sub="DBS remains the gold-standard lean operating system in life sciences/instruments. Its limitations — cycles, scientific paradigms, China policy — are exogenous rather than internal." T={T} />
      <DBSPentagon T={T} />

      {/* ── COMPETITIVE POSITIONING ──────────────────────────── */}
      <SectionTitle kicker="Section 6 · Competitive positioning" title="Where Danaher leads, where it lags." sub="One matrix per segment. Each row is a peer; dots indicate DHR's competitive position in that head-to-head. Cytiva uniquely leads downstream mAb (Protein A); Sartorius leads single-use bioreactors. Cepheid leads decentralised molecular. Leica Bio is #2 in tissue Dx behind Roche Ventana." T={T} />
      <div style={{ display: "grid", gap: 14 }}>
        <CompetitorMatrix seg={comps.bio} T={T} />
        <CompetitorMatrix seg={comps.ls}  T={T} />
        <CompetitorMatrix seg={comps.dx}  T={T} />
      </div>

      {/* ── REVENUE MODEL · RECURRING + CUSTOMER MIX ───────── */}
      <SectionTitle kicker="Section 7 · Revenue model" title="82% recurring · razor-and-blade across the franchise." sub="Two visualisations: recurring-revenue share by segment (left), and customer-type mix at group level (right). The installed base of Cepheid GeneXpert (>40,000 systems), Beckman DxI 9000 and Radiometer ABL90 pulls a 5-7x consumables tail over the 10-year equipment lifecycle." T={T} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 14 }}>
        <Card T={T} style={{ padding: "22px 24px" }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>Recurring revenue · by segment</div>
          {segments.map((s, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, alignItems: "baseline" }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: T.text, fontFamily: Fn }}>{s.label}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: s.color, fontFamily: Fn, fontVariantNumeric: "tabular-nums" }}><CountUp value={s.recurring} suffix="%" /></span>
              </div>
              <div style={{ height: 10, borderRadius: 5, background: T.pillBg, overflow: "hidden" }}>
                <div style={{ height: "100%", width: s.recurring + "%", background: s.color, borderRadius: 5, transition: "width 0.9s ease" }} />
              </div>
            </div>
          ))}
          <div style={{ marginTop: 14, padding: 12, background: DHR_NAVY + "0F", borderRadius: 8, fontSize: 11.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.6 }}>
            <strong style={{ color: DHR_NAVY }}>Group blended: 82%.</strong> Aldevron, Abcam and IDT are nearly 100% consumable. Life Sciences drags the mix because it sells more instruments (Leica scopes, SCIEX LC-MS, Beckman Biomek).
          </div>
        </Card>

        <Card T={T} style={{ padding: "22px 24px" }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>Customer mix · group estimate</div>
          {[
            { l: "Biopharma & CDMOs",                share: 40, color: BIO,        where: "Mostly Biotechnology; partly Life Sciences" },
            { l: "Hospitals & clinical labs",        share: 35, color: DX,         where: "Beckman Dx, Radiometer, Cepheid, Leica Bio" },
            { l: "Academic & government",            share: 10, color: LS,         where: "SCIEX, Leica Micro, IDT, Abcam" },
            { l: "Applied / industrial / forensic",  share: 10, color: "#059669",  where: "Phenomenex, SCIEX, residual Pall" },
            { l: "POL / decentralized",              share: 5,  color: "#EA580C",  where: "Cepheid, HemoCue" },
          ].map((c, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: T.text, fontFamily: Fn, fontWeight: 600 }}>{c.l}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: c.color, fontFamily: Fn, fontVariantNumeric: "tabular-nums" }}>~{c.share}%</span>
              </div>
              <div style={{ height: 8, borderRadius: 4, background: T.pillBg, overflow: "hidden" }}>
                <div style={{ height: "100%", width: c.share * 2.5 + "%", background: c.color, borderRadius: 4, transition: "width 0.9s" }} />
              </div>
              <div style={{ fontSize: 9.5, color: T.textTer, fontFamily: Fn, marginTop: 3 }}>{c.where}</div>
            </div>
          ))}
        </Card>
      </div>

      {/* ── KPI DASHBOARD ────────────────────────────────────── */}
      <SectionTitle kicker="Section 8 · Twelve KPIs · QARP dashboard" title="What we watch every quarter." sub="Direction arrow = trend over last 4-8 quarters; the marker fill is the most recent print scaled to its respective range." T={T} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
        {kpis.map((k, i) => (
          <div key={i} style={{
            background: T.card, borderRadius: T.radius, boxShadow: T.shadow,
            padding: "16px 18px", borderTop: `3px solid ${k.color}`,
            position: "relative", overflow: "hidden",
            animation: "fadeIn 0.4s ease both", animationDelay: (i * 0.04) + "s",
          }}>
            {k.star && <div style={{ position: "absolute", top: 8, right: 10, fontSize: 9, fontWeight: 800, color: k.color, fontFamily: Fn, letterSpacing: "0.08em", padding: "2px 6px", borderRadius: 4, background: k.color + "18" }}>★ STAR</div>}
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 4 }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase", lineHeight: 1.3, maxWidth: "75%" }}>{k.l}</div>
              <span style={{ fontSize: 12, color: k.dir > 0 ? "#059669" : k.dir < 0 ? "#DC2626" : T.textTer }}>
                {k.dir > 0 ? "▲" : k.dir < 0 ? "▼" : "▬"}
              </span>
            </div>
            <div style={{ fontFamily: Fn, fontSize: 22, fontWeight: 700, color: k.color, letterSpacing: "-0.01em", lineHeight: 1, fontVariantNumeric: "tabular-nums", marginBottom: 8 }}>{k.v}</div>
            <div style={{ height: 6, borderRadius: 3, background: T.pillBg, overflow: "hidden", marginBottom: 6 }}>
              <div style={{ height: "100%", width: k.pct + "%", background: k.color, borderRadius: 3, transition: "width 0.9s" }} />
            </div>
            <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, lineHeight: 1.4 }}>{k.s}</div>
          </div>
        ))}
      </div>

      {/* ── OPEN QUESTIONS · BULL/BEAR GAUGES ────────────────── */}
      <SectionTitle kicker="Section 9 · Open questions" title="Six questions for Stage 3." sub="Each meter shows where the underwriting probability sits today, on a scale from bear (deep red, left) to bull (green, right). 50 is neutral. These are the questions the institutional analysis layer needs to resolve before sizing the position." T={T} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 12 }}>
        {openQuestions.map((q, i) => (
          <div key={i} style={{ background: T.card, borderRadius: T.radius, boxShadow: T.shadow, padding: "18px 20px", borderLeft: `4px solid ${q.color}` }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: q.color, fontFamily: Fn, letterSpacing: "0.1em" }}>{q.n}</span>
              <span style={{ fontSize: 12.5, color: T.text, fontFamily: Fn, lineHeight: 1.45, flex: 1 }}>{q.t}</span>
            </div>
            {/* Bull/Bear meter */}
            <div style={{ position: "relative", height: 14, borderRadius: 7, background: `linear-gradient(90deg, #DC2626 0%, #FBBF24 50%, #059669 100%)`, opacity: 0.18, overflow: "hidden" }} />
            <div style={{ position: "relative", marginTop: -14, height: 14 }}>
              {/* Midline */}
              <div style={{ position: "absolute", left: "50%", top: -2, bottom: -2, width: 1, background: T.textTer }} />
              {/* Marker */}
              <div style={{
                position: "absolute", left: `calc(${q.bull}% - 8px)`, top: -2,
                width: 16, height: 16, borderRadius: "50%",
                background: q.color, border: "3px solid " + T.card,
                boxShadow: T.shadowLg,
                transition: "left 0.9s ease",
              }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 9.5, color: T.textTer, fontFamily: Fn, letterSpacing: "0.08em" }}>
              <span style={{ fontWeight: 800, color: "#DC2626" }}>BEAR</span>
              <span>NEUTRAL</span>
              <span style={{ fontWeight: 800, color: "#059669" }}>BULL · {q.bull}/100</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── FOOTER NOTE ───────────────────────────────────────── */}
      <div style={{ marginTop: 32, padding: "16px 20px", background: T.pillBg, borderRadius: T.radius, fontSize: 11, color: T.textTer, fontFamily: Fn, lineHeight: 1.7, fontStyle: "italic" }}>
        Sources · Danaher FY2025 10-K (filed 25 Mar 2026) · Q1 2026 earnings release &amp; transcript (21 Apr 2026) · Sartorius preliminary FY25 release (3 Feb 2026) · bioMérieux FY25 (27 Feb 2026) · Repligen Feb 2026 release · Bloomberg consensus 18 May 2026 · internal Cape Capital research dated 21 May 2026. Stage 2 primer — Stage 3 (institutional equity analysis: valuation, scenario downside, explicit position-sizing) to follow.
      </div>
    </div>
  );
}
