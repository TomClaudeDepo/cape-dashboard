import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { Fn } from "../theme";

/* ─── DATA ─── */
const macrodynamics = [
  { id: "electrification", title: "Electrification & Power", short: "Electrification", icon: "⚡", color: "#F59E0B", sectorIds: ["it","industrials","energy","utilities","materials","consdisc","consstap"] },
  { id: "ai", title: "Digitisation & AI Diffusion", short: "AI Diffusion", icon: "🧠", color: "#818CF8", sectorIds: ["it","health","financials","industrials","commsvc","utilities","consdisc","materials"] },
  { id: "demography", title: "Demography & Health", short: "Demography", icon: "🌍", color: "#34D399", sectorIds: ["health","consstap","financials","consdisc","commsvc","utilities"] },
];

const heldSet = new Set(["NVDA","AVGO","TSM","MSFT","GOOGL","NOW","SIE","ROK","JPM","ICE","AMZN","BKNG","NFLX","0700","TMO","AI","CEG","LLY","RHM","MELI","SAF","LIN","BKR","SU","ETN"]);

const sectors = [
  { id:"it", name:"Information Technology", short:"IT", weight:25, color:"#818CF8",
    themes:[
      { name:"AI Compute Infrastructure", type:"SECULAR", companies:[{t:"NVDA",n:"NVIDIA",w:"~80% AI accelerator share"},{t:"AVGO",n:"Broadcom",w:"$73B AI backlog"},{t:"ANET",n:"Arista Networks",w:"AI networking doubling"}]},
      { name:"Semi Foundry & Equipment", type:"SECULAR + CYCLICAL", companies:[{t:"TSM",n:"TSMC",w:"~60% global foundry"},{t:"ASML",n:"ASML",w:"100% EUV monopoly"},{t:"AMAT",n:"Applied Materials",w:"Broadest etch portfolio"}]},
      { name:"Cloud & AI-as-a-Service", type:"SECULAR", companies:[{t:"MSFT",n:"Microsoft",w:"Azure +39% YoY"},{t:"GOOGL",n:"Alphabet",w:"Google Cloud $12.5B/q"}]},
      { name:"Cybersecurity", type:"SECULAR", companies:[{t:"PANW",n:"Palo Alto Networks",w:"$5.9B ARR"},{t:"CRWD",n:"CrowdStrike",w:"Fastest to $5B ARR"}]},
      { name:"Enterprise AI Software", type:"SECULAR", companies:[{t:"NOW",n:"ServiceNow",w:"57% FCF margin"},{t:"SAP",n:"SAP",w:"Cloud +25%"}]},
      { name:"DC Power & Cooling", type:"SECULAR + CYCLICAL", companies:[{t:"SU",n:"Schneider Electric",w:"DC power leader"},{t:"VRT",n:"Vertiv",w:"$15B backlog"}]},
      { name:"Edge Computing & IoT", type:"SECULAR", companies:[{t:"CDNS",n:"Cadence Design",w:"EDA + IP"},{t:"ARM",n:"Arm Holdings",w:"CPU IP ecosystem"}]},
    ]},
  { id:"health", name:"Health Care", short:"Health", weight:14, color:"#34D399",
    themes:[
      { name:"GLP-1 / Obesity", type:"SECULAR", companies:[{t:"LLY",n:"Eli Lilly",w:"60.5% US share"},{t:"NVO",n:"Novo Nordisk",w:"GLP-1 pioneer"},{t:"DXCM",n:"DexCom",w:"CGM companion"}]},
      { name:"Oncology Innovation", type:"SECULAR", companies:[{t:"AZN",n:"AstraZeneca",w:"Enhertu $2.78B"},{t:"4568",n:"Daiichi Sankyo",w:"ADC platform"},{t:"MRK",n:"Merck",w:"Keytruda leader"}]},
      { name:"MedTech & Robotics", type:"SECULAR", companies:[{t:"ISRG",n:"Intuitive Surgical",w:"60%+ share"},{t:"SYK",n:"Stryker",w:"Mako robotics"}]},
      { name:"Life-Science Tools", type:"SECULAR + CYCLICAL", companies:[{t:"TMO",n:"Thermo Fisher",w:"Consumables platform"},{t:"DHR",n:"Danaher",w:"DBS-driven"},{t:"SDZ",n:"Sandoz",w:"#1 biosimilars"}]},
      { name:"Digital Health & AI Dx", type:"SECULAR", companies:[{t:"VEEV",n:"Veeva Systems",w:"Life sci cloud"},{t:"IQV",n:"IQVIA",w:"Largest CRO"}]},
      { name:"Biotech Renewal", type:"CYCLICAL", companies:[{t:"VRTX",n:"Vertex",w:"Non-opioid pain"},{t:"REGN",n:"Regeneron",w:"Dupixent $14B+"}]},
    ]},
  { id:"financials", name:"Financials", short:"Financials", weight:14, color:"#60A5FA",
    themes:[
      { name:"Alternative Assets", type:"SECULAR", companies:[{t:"BX",n:"Blackstone",w:"$1.275T AUM"},{t:"APO",n:"Apollo Global",w:"~$840B AUM"},{t:"KKR",n:"KKR",w:"$1.3T+ AUM"},{t:"BAM",n:"Brookfield AM",w:"Real assets"}]},
      { name:"Insurance & Re", type:"CYCLICAL + STRUCTURAL", companies:[{t:"MUV2",n:"Munich Re",w:"80% combined"},{t:"CB",n:"Chubb",w:"81-86% combined"},{t:"ALV",n:"Allianz",w:"Global scale"}]},
      { name:"Digital Payments", type:"SECULAR", companies:[{t:"V",n:"Visa",w:"$40B net rev"},{t:"MA",n:"Mastercard",w:"VAS +25%"},{t:"ADYEN",n:"Adyen",w:"Unified commerce"}]},
      { name:"Capital Markets & M&A", type:"CYCLICAL", companies:[{t:"JPM",n:"JPMorgan",w:"#1 IB globally"},{t:"GS",n:"Goldman Sachs",w:"#1 M&A"},{t:"MS",n:"Morgan Stanley",w:"$6.49T assets"}]},
      { name:"EM Banking", type:"SECULAR", companies:[{t:"HDB",n:"HDFC Bank",w:"India's largest"},{t:"IBN",n:"ICICI Bank",w:"ROA >2.3%"}]},
      { name:"Market Infra & Data", type:"SECULAR", companies:[{t:"BLK",n:"BlackRock",w:"$11.6T AUM"},{t:"LSEG",n:"LSE Group",w:"Data platform"},{t:"ICE",n:"ICE",w:"Futures + mortgage"}]},
    ]},
  { id:"industrials", name:"Industrials", short:"Industrials", weight:18, color:"#F97316",
    themes:[
      { name:"Defence Rearmament", type:"SECULAR", companies:[{t:"RHM",n:"Rheinmetall",w:"€64B backlog"},{t:"BA.",n:"BAE Systems",w:"Air/sea/land"},{t:"RTX",n:"RTX",w:"Pratt + defence"}]},
      { name:"Electrification & Grid", type:"SECULAR", companies:[{t:"SU",n:"Schneider Electric",w:"Energy mgmt"},{t:"ETN",n:"Eaton",w:"DC orders +70%"},{t:"ABB",n:"ABB",w:"Robotics + elec."}]},
      { name:"Factory Automation", type:"SECULAR", companies:[{t:"6954",n:"FANUC",w:"#1 robots/CNC"},{t:"SIE",n:"Siemens",w:"Digital Industries"},{t:"ROK",n:"Rockwell",w:"Reshoring play"}]},
      { name:"Aerospace Aftermarket", type:"SECULAR + CYCLICAL", companies:[{t:"GE",n:"GE Aerospace",w:"$190B backlog"},{t:"SAF",n:"Safran",w:"LEAP aftermarket"},{t:"TDG",n:"TransDigm",w:"52% EBITDA"}]},
      { name:"Supply-Chain Reshoring", type:"SECULAR", companies:[{t:"DG",n:"Vinci",w:"Global infra"},{t:"J",n:"Jacobs",w:"Engineering"}]},
      { name:"DC Construction", type:"SECULAR", companies:[{t:"VRT",n:"Vertiv",w:"$15B backlog"}]},
    ]},
  { id:"consdisc", name:"Consumer Discretionary", short:"Cons. Disc.", weight:8, color:"#EC4899",
    themes:[
      { name:"Luxury Resilience", type:"SECULAR + CYCLICAL", companies:[{t:"RMS",n:"Hermès",w:"41% op margin"},{t:"RACE",n:"Ferrari",w:"Order backlog 2028"},{t:"MC",n:"LVMH",w:"Largest luxury"}]},
      { name:"E-Commerce & Logistics", type:"SECULAR", companies:[{t:"AMZN",n:"Amazon",w:"Dominant fulfilment"},{t:"MELI",n:"MercadoLibre",w:"LatAm dominant"}]},
      { name:"Experience Economy", type:"CYCLICAL + SECULAR", companies:[{t:"BKNG",n:"Booking Holdings",w:"16x 2026E"},{t:"ABNB",n:"Airbnb",w:"Alt lodging"}]},
      { name:"Global EV Transition", type:"SECULAR", companies:[{t:"1211",n:"BYD",w:"#1 EV maker"},{t:"TSLA",n:"Tesla",w:"EV + energy"}]},
      { name:"Athletic & Wellness", type:"SECULAR", companies:[{t:"LULU",n:"Lululemon",w:"58% gross"},{t:"ONON",n:"On Holding",w:">25% growth"}]},
      { name:"Home Improvement", type:"CYCLICAL + STRUCTURAL", companies:[{t:"HD",n:"Home Depot",w:"Renovation cycle"}]},
    ]},
  { id:"commsvc", name:"Communication Services", short:"Comm. Svcs", weight:13, color:"#A78BFA",
    themes:[
      { name:"AI Digital Advertising", type:"SECULAR", companies:[{t:"GOOGL",n:"Alphabet",w:"$294.7B ad rev"},{t:"META",n:"Meta",w:"3.58B DAP"}]},
      { name:"Streaming & Gaming", type:"CYCLICAL → STRUCTURAL", companies:[{t:"NFLX",n:"Netflix",w:"325M+ subs"},{t:"SPOT",n:"Spotify",w:"751M MAUs"},{t:"0700",n:"Tencent",w:"#1 gaming"}]},
      { name:"5G/6G Infrastructure", type:"SECULAR", companies:[{t:"TMUS",n:"T-Mobile US",w:"9% rev growth"},{t:"DTE",n:"Deutsche Telekom",w:"Europe largest"},{t:"BHARTIARTL",n:"Bharti Airtel",w:"India 5G"}]},
      { name:"Interactive Entertainment", type:"SECULAR", companies:[{t:"TTWO",n:"Take-Two",w:"GTA VI launch"},{t:"7974",n:"Nintendo",w:"Switch 2"}]},
      { name:"CTV & Creator Economy", type:"SECULAR", companies:[{t:"RBLX",n:"Roblox",w:"137M+ DAUs"}]},
    ]},
  { id:"energy", name:"Energy", short:"Energy", weight:0, color:"#F59E0B",
    themes:[
      { name:"LNG Supercycle", type:"SECULAR", companies:[{t:"LNG",n:"Cheniere",w:"Largest US LNG"},{t:"TTE",n:"TotalEnergies",w:"3rd LNG"},{t:"SHEL",n:"Shell",w:"LNG trading"}]},
      { name:"Capital Discipline", type:"CYCLICAL + STRUCTURAL", companies:[{t:"XOM",n:"ExxonMobil",w:"$36B+ returns"},{t:"COP",n:"ConocoPhillips",w:"Sub-$40 breakeven"}]},
      { name:"DC Gas-to-Power", type:"SECULAR", companies:[{t:"BKR",n:"Baker Hughes",w:"$35.9B backlog"}]},
      { name:"Hydrogen & CCUS", type:"SECULAR", companies:[{t:"OXY",n:"Occidental",w:"STRATOS DAC"}]},
      { name:"Nuclear Renaissance", type:"SECULAR", companies:[{t:"CCJ",n:"Cameco",w:"#1 uranium"}]},
      { name:"Oilfield Services", type:"CYCLICAL", companies:[{t:"SLB",n:"SLB",w:"Largest OFS"}]},
    ]},
  { id:"materials", name:"Materials", short:"Materials", weight:6, color:"#FB923C",
    themes:[
      { name:"Copper Supercycle", type:"SECULAR", companies:[{t:"FCX",n:"Freeport-McMoRan",w:"Largest copper"},{t:"BHP",n:"BHP Group",w:"Escondida"},{t:"RIO",n:"Rio Tinto",w:"Diversified mining"}]},
      { name:"Industrial Gases", type:"SECULAR", companies:[{t:"LIN",n:"Linde",w:"World #1"},{t:"AI",n:"Air Liquide",w:"#2 globally"}]},
      { name:"Specialty Chemicals", type:"CYCLICAL + STRUCTURAL", companies:[{t:"SHW",n:"Sherwin-Williams",w:"4,800+ stores"},{t:"4063",n:"Shin-Etsu",w:"Semi-grade"}]},
      { name:"Battery & Lithium", type:"SECULAR + CYCLICAL", companies:[{t:"ALB",n:"Albemarle",w:"#1 lithium"},{t:"MP",n:"MP Materials",w:"US rare earth"}]},
      { name:"Building & Green Steel", type:"SECULAR", companies:[{t:"HOLN",n:"Holcim",w:"Low-carbon"},{t:"CRH",n:"CRH",w:"Aggregates"},{t:"NUE",n:"Nucor",w:"EAF steel"}]},
      { name:"Gold & Precious Metals", type:"STRUCTURAL + CYCLICAL", companies:[{t:"NEM",n:"Newmont",w:"Largest gold"},{t:"AEM",n:"Agnico Eagle",w:"30%+ ROIC"}]},
    ]},
  { id:"consstap", name:"Consumer Staples", short:"Cons. Staples", weight:0, color:"#10B981",
    themes:[
      { name:"Premiumisation in F&B", type:"SECULAR", companies:[{t:"NESN",n:"Nestlé",w:"Largest food co"},{t:"RI",n:"Pernod Ricard",w:"27% op margin"},{t:"DGE",n:"Diageo",w:"Premium spirits"}]},
      { name:"EM Consumer Growth", type:"SECULAR", companies:[{t:"ULVR",n:"Unilever",w:"58% EM rev"},{t:"CL",n:"Colgate",w:"60% gross"}]},
      { name:"Functional Nutrition", type:"SECULAR", companies:[{t:"BN",n:"Danone",w:"Health food"}]},
      { name:"Pet Economy", type:"SECULAR", companies:[{t:"NESN",n:"Nestlé (Purina)",w:"#2 pet food"}]},
      { name:"Value Retail", type:"CYCLICAL + STRUCTURAL", companies:[{t:"COST",n:"Costco",w:"92.7% renewal"},{t:"WMT",n:"Walmart",w:"$713B+ rev"}]},
    ]},
  { id:"utilities", name:"Utilities", short:"Utilities", weight:2, color:"#14B8A6",
    themes:[
      { name:"AI DC Power Demand", type:"SECULAR", companies:[{t:"CEG",n:"Constellation Energy",w:"32.4 GW nuclear"},{t:"AEP",n:"AEP",w:"40,000mi T-lines"}]},
      { name:"Grid Modernisation", type:"SECULAR", companies:[{t:"NGG",n:"National Grid",w:"£70B+ plan"},{t:"IBE",n:"Iberdrola",w:"€47B capex"}]},
      { name:"Nuclear Renaissance", type:"SECULAR", companies:[{t:"CEG",n:"Constellation",w:"TMI restart"},{t:"SO",n:"Southern Co",w:"Vogtle 3&4"}]},
      { name:"Renewables & Storage", type:"SECULAR", companies:[{t:"NEE",n:"NextEra Energy",w:"Largest clean"},{t:"IBE",n:"Iberdrola",w:"45GW wind"}]},
      { name:"Regulated Rate Base", type:"STRUCTURAL", companies:[{t:"DUK",n:"Duke Energy",w:"$100B+ capex"},{t:"NEE",n:"NextEra",w:"FPL 12M+"}]},
      { name:"Water & Resilience", type:"SECULAR", companies:[{t:"AWK",n:"American Water",w:"Essential svc"}]},
    ]},
];

/* ─── GEOMETRY HELPERS ─── */
const TAU = Math.PI * 2;
const toRad = (deg) => deg * (Math.PI / 180);
const polarToCart = (cx, cy, r, angle) => ({
  x: cx + r * Math.cos(angle - Math.PI / 2),
  y: cy + r * Math.sin(angle - Math.PI / 2),
});
const arcPath = (cx, cy, r1, r2, a1, a2) => {
  const large = a2 - a1 > Math.PI ? 1 : 0;
  const p1 = polarToCart(cx, cy, r1, a1);
  const p2 = polarToCart(cx, cy, r1, a2);
  const p3 = polarToCart(cx, cy, r2, a2);
  const p4 = polarToCart(cx, cy, r2, a1);
  return `M${p1.x},${p1.y} A${r1},${r1} 0 ${large} 1 ${p2.x},${p2.y} L${p3.x},${p3.y} A${r2},${r2} 0 ${large} 0 ${p4.x},${p4.y} Z`;
};
const midAngle = (a1, a2) => (a1 + a2) / 2;

/* ─── COMPONENT ─── */
export default function ThematicSunburst({ T }) {
  const isDark = T.bg !== "#F8F9FC";
  const [hover, setHover] = useState(null);
  const [selected, setSelected] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [animPhase, setAnimPhase] = useState(0);
  const containerRef = useRef(null);
  const [dims, setDims] = useState({ w: 900, h: 900 });

  /* Theme-aware subtle fills for SVG */
  const guide = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const subtleBg = isDark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.02)";
  const arcDimFill = isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)";

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      const { width } = entries[0].contentRect;
      const s = Math.min(width, 900);
      setDims({ w: s, h: s });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setAnimPhase(1), 100);
    return () => clearTimeout(t);
  }, []);

  const CX = dims.w / 2;
  const CY = dims.h / 2;
  const scale = dims.w / 900;

  const R_CORE = 62 * scale;
  const R_MACRO_IN = 72 * scale;
  const R_MACRO_OUT = 108 * scale;
  const R_SECTOR_IN = 116 * scale;
  const R_SECTOR_OUT = 210 * scale;
  const R_THEME_IN = 218 * scale;
  const R_THEME_OUT = 340 * scale;
  const R_COMPANY_IN = 348 * scale;
  const R_COMPANY_OUT = 430 * scale;
  const GAP = toRad(0.6);

  const totalWeight = sectors.reduce((s, sec) => s + Math.max(sec.weight, 3), 0);
  const sectorArcs = useMemo(() => {
    let angle = 0;
    return sectors.map((sec, i) => {
      const w = Math.max(sec.weight, 3);
      const span = (w / totalWeight) * TAU;
      const a1 = angle + GAP / 2;
      const a2 = angle + span - GAP / 2;
      angle += span;
      return { ...sec, a1, a2, idx: i };
    });
  }, [totalWeight, scale]);

  const themeArcs = useMemo(() => {
    const arcs = [];
    sectorArcs.forEach((sec, si) => {
      const count = sec.themes.length;
      const totalSpan = sec.a2 - sec.a1;
      const tGap = toRad(0.4);
      const tSpan = (totalSpan - tGap * count) / count;
      let a = sec.a1;
      sec.themes.forEach((theme, ti) => {
        arcs.push({ ...theme, sectorIdx: si, themeIdx: ti, color: sec.color, a1: a + tGap / 2, a2: a + tSpan + tGap / 2 });
        a += tSpan + tGap;
      });
    });
    return arcs;
  }, [sectorArcs]);

  const companyArcs = useMemo(() => {
    if (selected === null || selectedTheme === null) return [];
    const sec = sectorArcs[selected];
    const theme = sec.themes[selectedTheme];
    if (!theme) return [];
    const tArc = themeArcs.find(t => t.sectorIdx === selected && t.themeIdx === selectedTheme);
    if (!tArc) return [];
    const cos = theme.companies;
    const totalSpan = tArc.a2 - tArc.a1;
    const cGap = toRad(0.3);
    const cSpan = (totalSpan - cGap * cos.length) / cos.length;
    let a = tArc.a1;
    return cos.map((c) => {
      const arc = { ...c, a1: a + cGap / 2, a2: a + cSpan + cGap / 2, color: sec.color, held: heldSet.has(c.t) };
      a += cSpan + cGap;
      return arc;
    });
  }, [selected, selectedTheme, sectorArcs, themeArcs]);

  const macroArcs = useMemo(() => {
    const span = TAU / 3;
    return macrodynamics.map((m, i) => ({
      ...m, a1: i * span + GAP / 2, a2: (i + 1) * span - GAP / 2,
    }));
  }, []);

  const tooltipContent = useMemo(() => {
    if (!hover) return null;
    if (hover.ring === "macro") {
      const m = macroArcs[hover.idx];
      return { title: m.title, sub: `Touches ${m.sectorIds.length} sectors`, color: m.color };
    }
    if (hover.ring === "sector") {
      const s = sectorArcs[hover.idx];
      const cCount = s.themes.reduce((sum, t) => sum + t.companies.length, 0);
      const hCount = s.themes.reduce((sum, t) => sum + t.companies.filter(c => heldSet.has(c.t)).length, 0);
      return { title: s.name, sub: `${s.weight}% · ${s.themes.length} themes · ${cCount} cos · ${hCount} held`, color: s.color };
    }
    if (hover.ring === "theme") {
      const t = themeArcs[hover.idx];
      const hCount = t.companies.filter(c => heldSet.has(c.t)).length;
      return { title: t.name, sub: `${t.type} · ${t.companies.length} companies${hCount ? ` · ${hCount} held` : ""}`, color: t.color };
    }
    if (hover.ring === "company") {
      const c = companyArcs[hover.idx];
      return { title: `${c.n} (${c.t})`, sub: c.w, color: c.color };
    }
    return null;
  }, [hover, macroArcs, sectorArcs, themeArcs, companyArcs]);

  const connectionLines = useMemo(() => {
    if (selected === null) return [];
    const sec = sectorArcs[selected];
    const secMid = midAngle(sec.a1, sec.a2);
    return macroArcs
      .filter(m => m.sectorIds.includes(sec.id))
      .map(m => ({
        from: polarToCart(CX, CY, R_MACRO_OUT, midAngle(m.a1, m.a2)),
        to: polarToCart(CX, CY, R_SECTOR_IN, secMid),
        color: m.color,
      }));
  }, [selected, sectorArcs, macroArcs, CX, CY]);

  const handleSectorClick = useCallback((idx) => {
    if (selected === idx) { setSelected(null); setSelectedTheme(null); }
    else { setSelected(idx); setSelectedTheme(null); }
  }, [selected]);

  const handleThemeClick = useCallback((sectorIdx, themeIdx) => {
    if (selected !== sectorIdx) { setSelected(sectorIdx); setSelectedTheme(themeIdx); }
    else if (selectedTheme === themeIdx) { setSelectedTheme(null); }
    else { setSelectedTheme(themeIdx); }
  }, [selected, selectedTheme]);

  const arcLabel = (cx, cy, r, a1, a2, text, fontSize, color, id) => {
    const spanAngle = a2 - a1;
    if (spanAngle < toRad(8)) return null;
    const maxChars = Math.floor((spanAngle * r) / (fontSize * 0.55));
    const displayText = text.length > maxChars ? text.slice(0, maxChars - 1) + "…" : text;
    const ma = midAngle(a1, a2);
    const flip = ma > Math.PI;
    const pathA1 = flip ? a2 : a1;
    const pathA2 = flip ? a1 : a2;
    const p1 = polarToCart(cx, cy, r, pathA1);
    const p2 = polarToCart(cx, cy, r, pathA2);
    const large = Math.abs(pathA2 - pathA1) > Math.PI ? 1 : 0;
    const sweep = flip ? 0 : 1;
    const d = `M${p1.x},${p1.y} A${r},${r} 0 ${large} ${sweep} ${p2.x},${p2.y}`;
    return (
      <g key={id}>
        <defs><path id={id} d={d} /></defs>
        <text fill={color} fontSize={fontSize} fontFamily={Fn} fontWeight="600" letterSpacing="0.02em">
          <textPath href={`#${id}`} startOffset="50%" textAnchor="middle">{displayText}</textPath>
        </text>
      </g>
    );
  };

  const detailPanel = useMemo(() => {
    if (selected === null) return null;
    const sec = sectorArcs[selected];
    const themes = sec.themes;
    const allCos = themes.flatMap(t => t.companies);
    const heldCos = allCos.filter(c => heldSet.has(c.t));
    return { sec, themes, allCos, heldCos };
  }, [selected, sectorArcs]);

  return (
    <div ref={containerRef} style={{
      fontFamily: Fn, color: T.text,
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "8px 0",
    }}>
      {/* Sunburst SVG */}
      <div style={{ position: "relative", width: dims.w, height: dims.h }}>
        <svg
          viewBox={`0 0 ${dims.w} ${dims.h}`}
          width={dims.w} height={dims.h}
          style={{ opacity: animPhase ? 1 : 0, transition: "opacity 0.6s ease 0.2s" }}
        >
          <defs>
            <radialGradient id="ambientGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={T.purple || "#818CF8"} stopOpacity={isDark ? 0.04 : 0.02} />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <circle cx={CX} cy={CY} r={R_COMPANY_OUT + 20 * scale} fill="url(#ambientGlow)" />

          {/* Ring guides */}
          {[R_MACRO_IN, R_SECTOR_IN, R_THEME_IN, R_COMPANY_IN].map((r, i) => (
            <circle key={i} cx={CX} cy={CY} r={r} fill="none" stroke={guide} strokeWidth={0.5} strokeDasharray="2,4" opacity={0.5} />
          ))}

          {/* Connection lines */}
          {connectionLines.map((line, i) => (
            <line key={`conn-${i}`} x1={line.from.x} y1={line.from.y} x2={line.to.x} y2={line.to.y}
              stroke={line.color} strokeWidth={1.5 * scale} strokeDasharray="4,4" opacity={0.35} />
          ))}

          {/* MACRO RING */}
          {macroArcs.map((m, i) => {
            const isHovered = hover?.ring === "macro" && hover.idx === i;
            const isLinked = selected !== null && m.sectorIds.includes(sectorArcs[selected].id);
            return (
              <g key={`macro-${i}`}>
                <path
                  d={arcPath(CX, CY, R_MACRO_IN, R_MACRO_OUT, m.a1, m.a2)}
                  fill={m.color + (isLinked ? "30" : isHovered ? "25" : isDark ? "12" : "0A")}
                  stroke={m.color + (isLinked ? "80" : "40")}
                  strokeWidth={isLinked ? 1.5 : 0.5}
                  style={{ cursor: "pointer", transition: "all 0.25s" }}
                  onMouseEnter={() => setHover({ ring: "macro", idx: i })}
                  onMouseLeave={() => setHover(null)}
                />
                {arcLabel(CX, CY, (R_MACRO_IN + R_MACRO_OUT) / 2, m.a1, m.a2, m.short, Math.max(7, 9 * scale), m.color, `macro-lbl-${i}`)}
              </g>
            );
          })}

          {/* SECTOR RING */}
          {sectorArcs.map((sec, i) => {
            const isSelected = selected === i;
            const isHovered = hover?.ring === "sector" && hover.idx === i;
            const dim = selected !== null && !isSelected;
            return (
              <g key={`sec-${i}`}>
                <path
                  d={arcPath(CX, CY, R_SECTOR_IN, R_SECTOR_OUT, sec.a1, sec.a2)}
                  fill={sec.color + (isSelected ? "35" : isHovered ? "20" : isDark ? "10" : "08")}
                  stroke={sec.color + (isSelected ? "AA" : "50")}
                  strokeWidth={isSelected ? 2 : 0.5}
                  opacity={dim ? 0.3 : 1}
                  style={{ cursor: "pointer", transition: "all 0.3s" }}
                  onClick={() => handleSectorClick(i)}
                  onMouseEnter={() => setHover({ ring: "sector", idx: i })}
                  onMouseLeave={() => setHover(null)}
                />
                {sec.weight > 0 && (() => {
                  const ma = midAngle(sec.a1, sec.a2);
                  const p = polarToCart(CX, CY, R_SECTOR_IN + 18 * scale, ma);
                  return (
                    <text x={p.x} y={p.y} textAnchor="middle" dominantBaseline="central"
                      fill={sec.color} fontSize={Math.max(8, 11 * scale)} fontWeight="800"
                      fontFamily={Fn} opacity={dim ? 0.3 : 0.9}
                      style={{ transition: "opacity 0.3s" }}>
                      {sec.weight}%
                    </text>
                  );
                })()}
                {arcLabel(CX, CY, (R_SECTOR_IN + R_SECTOR_OUT) / 2 + 8 * scale, sec.a1, sec.a2, sec.short, Math.max(7, 10 * scale), dim ? sec.color + "50" : sec.color, `sec-lbl-${i}`)}
              </g>
            );
          })}

          {/* THEME RING */}
          {themeArcs.map((t, i) => {
            const isInSelected = selected === t.sectorIdx;
            const isThemeSelected = isInSelected && selectedTheme === t.themeIdx;
            const isHovered = hover?.ring === "theme" && hover.idx === i;
            const dim = selected !== null && !isInSelected;
            const hasHeld = t.companies.some(c => heldSet.has(c.t));
            return (
              <g key={`theme-${i}`}>
                <path
                  d={arcPath(CX, CY, R_THEME_IN, R_THEME_OUT, t.a1, t.a2)}
                  fill={t.color + (isThemeSelected ? "30" : isHovered ? "18" : isDark ? "08" : "06")}
                  stroke={t.color + (isThemeSelected ? "90" : isInSelected ? "50" : "20")}
                  strokeWidth={isThemeSelected ? 2 : 0.5}
                  opacity={dim ? 0.15 : 1}
                  style={{ cursor: "pointer", transition: "all 0.3s" }}
                  onClick={() => handleThemeClick(t.sectorIdx, t.themeIdx)}
                  onMouseEnter={() => setHover({ ring: "theme", idx: i })}
                  onMouseLeave={() => setHover(null)}
                />
                {hasHeld && !dim && (() => {
                  const ma = midAngle(t.a1, t.a2);
                  const p = polarToCart(CX, CY, R_THEME_IN + 6 * scale, ma);
                  return <circle cx={p.x} cy={p.y} r={2.5 * scale} fill={t.color} opacity={0.7} />;
                })()}
                {(isInSelected || selected === null) && arcLabel(CX, CY, (R_THEME_IN + R_THEME_OUT) / 2, t.a1, t.a2, t.name, Math.max(5.5, 7 * scale), dim ? t.color + "30" : t.color + "CC", `theme-lbl-${i}`)}
              </g>
            );
          })}

          {/* COMPANY RING */}
          {companyArcs.map((c, i) => {
            const isHovered = hover?.ring === "company" && hover.idx === i;
            return (
              <g key={`co-${i}`}>
                <path
                  d={arcPath(CX, CY, R_COMPANY_IN, R_COMPANY_OUT, c.a1, c.a2)}
                  fill={c.held ? c.color + "30" : arcDimFill}
                  stroke={c.held ? c.color + "AA" : c.color + "30"}
                  strokeWidth={c.held ? 2 : 0.5}
                  style={{ cursor: "pointer", transition: "all 0.3s" }}
                  onMouseEnter={() => setHover({ ring: "company", idx: i })}
                  onMouseLeave={() => setHover(null)}
                  filter={isHovered ? "url(#glow)" : undefined}
                />
                {arcLabel(CX, CY, (R_COMPANY_IN + R_COMPANY_OUT) / 2, c.a1, c.a2, c.t, Math.max(6, 8 * scale), c.held ? T.text : T.textTer, `co-lbl-${i}`)}
              </g>
            );
          })}

          {/* CENTER */}
          <circle cx={CX} cy={CY} r={R_CORE} fill={T.card} stroke={guide} strokeWidth={1} />
          {selected === null ? (
            <g>
              <text x={CX} y={CY - 10 * scale} textAnchor="middle" dominantBaseline="central"
                fill={T.text} fontSize={Math.max(14, 20 * scale)} fontWeight="700" fontFamily={Fn}
                letterSpacing="-0.03em">CEF</text>
              <text x={CX} y={CY + 10 * scale} textAnchor="middle" dominantBaseline="central"
                fill={T.textTer} fontSize={Math.max(7, 8 * scale)} fontFamily={Fn} fontWeight="400">
                26 positions</text>
            </g>
          ) : (
            <g>
              <text x={CX} y={CY - 12 * scale} textAnchor="middle" dominantBaseline="central"
                fill={sectorArcs[selected].color} fontSize={Math.max(11, 14 * scale)} fontWeight="700" fontFamily={Fn}
                letterSpacing="-0.02em">{sectorArcs[selected].short}</text>
              <text x={CX} y={CY + 4 * scale} textAnchor="middle" dominantBaseline="central"
                fill={T.textSec} fontSize={Math.max(7, 8 * scale)} fontFamily={Fn}>
                {sectorArcs[selected].weight}% · {sectorArcs[selected].themes.length} themes</text>
              <text x={CX} y={CY + 18 * scale} textAnchor="middle" dominantBaseline="central"
                fill={T.textTer} fontSize={Math.max(6, 7 * scale)} fontFamily={Fn} style={{ cursor: "pointer" }}
                onClick={() => { setSelected(null); setSelectedTheme(null); }}>
                ← back
              </text>
            </g>
          )}
        </svg>

        {/* Tooltip */}
        {tooltipContent && (
          <div style={{
            position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)",
            background: T.card, border: `1px solid ${tooltipContent.color}40`,
            borderRadius: T.radius, padding: "8px 14px", pointerEvents: "none",
            maxWidth: 280, textAlign: "center", boxShadow: T.shadowLg,
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, fontFamily: Fn, color: tooltipContent.color, marginBottom: 2 }}>
              {tooltipContent.title}
            </div>
            <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer }}>{tooltipContent.sub}</div>
          </div>
        )}
      </div>

      {/* Detail Panel */}
      {detailPanel && (
        <div style={{
          width: "100%", maxWidth: 700, marginTop: 16,
          background: T.card, borderRadius: T.radius, padding: "20px 24px",
          border: `1px solid ${detailPanel.sec.color}25`,
          boxShadow: T.shadow,
          opacity: animPhase ? 1 : 0, transition: "opacity 0.4s",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div>
              <span style={{ fontSize: 18, fontWeight: 700, fontFamily: Fn, color: detailPanel.sec.color, letterSpacing: "-0.02em" }}>
                {detailPanel.sec.name}
              </span>
              <span style={{ fontSize: 12, fontFamily: Fn, color: T.textTer, marginLeft: 10 }}>
                {detailPanel.sec.weight}% of NAV
              </span>
            </div>
            <button onClick={() => { setSelected(null); setSelectedTheme(null); }}
              style={{
                background: T.pillBg, border: `1px solid ${T.border}`, borderRadius: T.radiusSm,
                color: T.textSec, padding: "4px 12px", fontSize: 11, fontFamily: Fn, cursor: "pointer",
              }}>
              ✕
            </button>
          </div>

          <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
            {[
              { v: detailPanel.themes.length, l: "Themes", c: detailPanel.sec.color },
              { v: detailPanel.allCos.length, l: "Companies", c: T.deepBlue },
              { v: detailPanel.heldCos.length, l: "In Portfolio", c: T.green },
            ].map((s, i) => (
              <div key={i} style={{
                padding: "5px 12px", borderRadius: T.radiusSm,
                background: s.c + (isDark ? "15" : "0A"),
                display: "flex", alignItems: "baseline", gap: 5,
              }}>
                <span style={{ fontSize: 16, fontWeight: 800, fontFamily: Fn, color: s.c }}>{s.v}</span>
                <span style={{ fontSize: 9, fontWeight: 600, fontFamily: Fn, color: T.textTer, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.l}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {detailPanel.themes.map((theme, ti) => {
              const isOpen = selectedTheme === ti;
              const heldCount = theme.companies.filter(c => heldSet.has(c.t)).length;
              return (
                <div key={ti} style={{
                  borderRadius: T.radiusSm + 2, overflow: "hidden",
                  border: `1px solid ${isOpen ? detailPanel.sec.color + "50" : T.border}`,
                  background: isOpen ? detailPanel.sec.color + (isDark ? "08" : "04") : T.bg,
                  transition: "all 0.2s",
                }}>
                  <div onClick={() => setSelectedTheme(isOpen ? null : ti)}
                    style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", cursor: "pointer" }}>
                    <div style={{ width: 3, height: 22, borderRadius: 2, background: detailPanel.sec.color, opacity: isOpen ? 1 : 0.3 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 12, fontWeight: 600, fontFamily: Fn, color: T.text }}>{theme.name}</span>
                        <span style={{
                          fontSize: 8, fontWeight: 700, fontFamily: Fn, padding: "2px 6px", borderRadius: 4, letterSpacing: "0.03em",
                          background: theme.type.includes("SECULAR") ? T.greenBg : (T.orange + "10"),
                          color: theme.type.includes("SECULAR") ? T.green : T.orange,
                        }}>{theme.type}</span>
                      </div>
                      {!isOpen && (
                        <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, marginTop: 2 }}>
                          {theme.companies.length} companies{heldCount > 0 && <> · <span style={{ color: detailPanel.sec.color, fontWeight: 600 }}>{heldCount} held</span></>}
                        </div>
                      )}
                    </div>
                    <span style={{ fontSize: 14, color: T.textTer, transition: "transform 0.2s", transform: isOpen ? "rotate(90deg)" : "rotate(0)" }}>›</span>
                  </div>
                  {isOpen && (
                    <div style={{ padding: "0 14px 14px 27px" }}>
                      {theme.companies.map((c, ci) => {
                        const held = heldSet.has(c.t);
                        return (
                          <div key={ci} style={{
                            display: "flex", alignItems: "center", gap: 10, padding: "8px 12px",
                            borderRadius: T.radiusSm, marginTop: 6,
                            background: held ? detailPanel.sec.color + (isDark ? "14" : "08") : subtleBg,
                            border: `1px solid ${held ? detailPanel.sec.color + "30" : T.border}`,
                          }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                                <span style={{ fontSize: 12, fontWeight: 700, fontFamily: Fn, color: T.text }}>{c.n}</span>
                                <span style={{ fontSize: 9, fontFamily: Fn, color: T.textTer }}>{c.t}</span>
                                {held && (
                                  <span style={{
                                    fontSize: 7, fontWeight: 800, fontFamily: Fn, padding: "2px 6px", borderRadius: 4,
                                    background: detailPanel.sec.color + "25", color: detailPanel.sec.color,
                                    letterSpacing: "0.05em",
                                  }}>IN PORTFOLIO</span>
                                )}
                              </div>
                              <div style={{ fontSize: 10, fontFamily: Fn, color: T.textSec, marginTop: 3 }}>{c.w}</div>
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
      <div style={{
        display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap", justifyContent: "center",
        opacity: animPhase ? 1 : 0, transition: "opacity 0.6s ease 0.4s",
      }}>
        {["Macro Forces", "Sectors", "Themes", "Companies"].map((label, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{
              width: 10, height: 10, borderRadius: "50%",
              background: ["#818CF820", "#60A5FA20", "#34D39920", "#F59E0B20"][i],
              border: `1px solid ${["#818CF8", "#60A5FA", "#34D399", "#F59E0B"][i]}50`,
            }} />
            <span style={{ fontSize: 10, fontFamily: Fn, color: T.textTer }}>{label}</span>
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginLeft: 8 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: T.green + "30", border: `1.5px solid ${T.green}` }} />
          <span style={{ fontSize: 10, fontFamily: Fn, color: T.textTer }}>= Held in portfolio</span>
        </div>
      </div>

      <div style={{ fontSize: 10, fontFamily: Fn, color: T.textTer, textAlign: "center", marginTop: 16 }}>
        Cape Capital AG · Thematic Universe · March 2026
      </div>
    </div>
  );
}
