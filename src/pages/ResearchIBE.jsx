import { useState, useRef, useEffect } from "react";
import { Fn, Fh } from "../theme";
import { Card, Pill } from "../components/shared";
import {
  heroStats, businessDescription, segmentsProse, segments,
  revenueByRegion, products, valueChainStages,
  competitorIntro, competitors, marketSharePie,
  moatIntro, moats,
} from "../data/research-ibe";
import {
  forcesHeroStats, electrificationIntro, electrificationDrivers,
  dataCentreIntro, dataCentreStats, dataCentrePositioning,
  gridIntro, gridProblems, gridInvestmentBreakdown, gridByCountry,
  securityIntro, securityMilestones,
  offshoreIntro, offshoreDrivers, offshoreCapacityPie,
  compoundingIntro, compoundingLoops, opportunityTable, keyRisks,
} from "../data/research-ibe-forces";
import {
  finHeroStats, growthMetrics, forwardMultiples,
  peerValuation, peerMedian, profitabilityComp, leverageComp,
  capacityEvolution, productionEvolution, peerCapacity,
} from "../data/research-ibe-fin";

/* ═══════════════════════════════════════════ SHARED COMPONENTS ═══════════════════════════════════════════ */
function PieChart({ data, size = 220, T, label }) {
  const [hov, setHov] = useState(null);
  const r = size / 2 - 8, cx = size / 2, cy = size / 2;
  let cumAngle = -90;
  const slices = data.map((d, i) => {
    const angle = (d.share / 100) * 360, startAngle = cumAngle; cumAngle += angle;
    const endAngle = cumAngle, sr = (Math.PI/180)*startAngle, er = (Math.PI/180)*endAngle;
    const large = angle > 180 ? 1 : 0;
    const x1=cx+r*Math.cos(sr),y1=cy+r*Math.sin(sr),x2=cx+r*Math.cos(er),y2=cy+r*Math.sin(er);
    const mid = (Math.PI/180)*((startAngle+endAngle)/2), pull = hov===i?6:0;
    const dx=pull*Math.cos(mid), dy=pull*Math.sin(mid);
    return { ...d, path: `M ${cx+dx} ${cy+dy} L ${x1+dx} ${y1+dy} A ${r} ${r} 0 ${large} 1 ${x2+dx} ${y2+dy} Z`, i };
  });
  return (<div>{label && <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 12 }}>{label}</div>}<div style={{ display:"flex",alignItems:"center",gap:24,flexWrap:"wrap" }}><svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{flexShrink:0}}>{slices.map(s=>(<path key={s.i} d={s.path} fill={s.color} stroke={T.card} strokeWidth="2" opacity={hov!==null&&hov!==s.i?0.4:1} style={{transition:"all 0.2s",cursor:"pointer"}} onMouseEnter={()=>setHov(s.i)} onMouseLeave={()=>setHov(null)}/>))}{hov!==null&&(<g><text x={cx} y={cy-6} textAnchor="middle" fontSize="20" fontWeight="700" fill={T.text} fontFamily={Fn}>{data[hov].share}%</text><text x={cx} y={cy+12} textAnchor="middle" fontSize="10" fill={T.textSec} fontFamily={Fn}>{data[hov].name}</text></g>)}</svg><div style={{display:"flex",flexDirection:"column",gap:6}}>{data.map((d,i)=>(<div key={i} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)} style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",padding:"4px 8px",borderRadius:6,background:hov===i?T.pillBg:"transparent",transition:"background 0.15s"}}><div style={{width:10,height:10,borderRadius:3,background:d.color,flexShrink:0}}/><span style={{fontSize:12,color:hov===i?T.text:T.textSec,fontFamily:Fn,fontWeight:hov===i?600:400,transition:"all 0.15s"}}>{d.name} — {d.share}%</span></div>))}</div></div></div>);
}
function Expandable({ title, subtitle, children, T }) {
  const [open,setOpen]=useState(false); const innerRef=useRef(null); const [maxH,setMaxH]=useState(0);
  useEffect(()=>{if(innerRef.current)setMaxH(innerRef.current.scrollHeight);},[open,children]);
  return (<div style={{background:T.card,borderRadius:T.radius,border:"1px solid "+T.border,overflow:"hidden",transition:"all 0.2s",boxShadow:open?T.shadowLg:T.shadow}}><div onClick={()=>setOpen(!open)} style={{padding:"16px 20px",display:"flex",alignItems:"center",gap:10,cursor:"pointer"}}><div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:T.text,fontFamily:Fn}}>{title}</div>{subtitle&&<div style={{fontSize:11,color:T.textTer,fontFamily:Fn,marginTop:2}}>{subtitle}</div>}</div><span style={{fontSize:16,color:T.textTer,transition:"transform 0.2s",transform:open?"rotate(180deg)":"rotate(0)"}}>▾</span></div><div style={{maxHeight:open?maxH+20:0,overflow:"hidden",transition:"max-height 0.35s ease"}}><div ref={innerRef} onClick={e=>e.stopPropagation()} style={{padding:"0 20px 20px",cursor:"default"}}>{children}</div></div></div>);
}
function Tabs({tabs,active,onChange,T}){return(<div style={{display:"flex",gap:4,background:T.pillBg,borderRadius:T.radiusSm,padding:3,marginBottom:28,flexWrap:"wrap"}}>{tabs.map(t=>(<button key={t} onClick={()=>onChange(t)} style={{padding:"8px 14px",borderRadius:6,border:"none",fontSize:12,fontFamily:Fn,fontWeight:active===t?600:400,background:active===t?T.card:"transparent",color:active===t?T.text:T.textTer,cursor:"pointer",transition:"all 0.15s",boxShadow:active===t?T.shadow:"none",whiteSpace:"nowrap"}}>{t}</button>))}</div>);}
function MoatCard({moat,T}){const [open,setOpen]=useState(false);const catColors={"Legal Monopoly":T.deepBlue,"Scale Economies":T.green,"Financial Moat":T.orange,"First-Mover Advantage":T.purple,"Intangible Assets":T.capRed,"Compounding System":T.deepBlue};const c=catColors[moat.category]||T.textSec;return(<div style={{background:T.card,borderRadius:T.radius,border:"1px solid "+T.border,overflow:"hidden",boxShadow:open?T.shadowLg:T.shadow,transition:"all 0.2s"}}><div onClick={()=>setOpen(!open)} style={{padding:"18px 22px",cursor:"pointer"}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><span style={{fontSize:14,fontWeight:600,color:T.text,fontFamily:Fn,flex:1}}>{moat.title}</span><Pill T={T} color={c} bg={c+"14"}>{moat.category}</Pill></div><div style={{display:"flex",gap:4,alignItems:"center"}}><span style={{fontSize:10,color:T.textTer,fontFamily:Fn,marginRight:6}}>Strength</span>{[1,2,3,4,5].map(i=>(<div key={i} style={{width:28,height:6,borderRadius:3,background:i<=moat.strength?c:T.pillBg,transition:"background 0.3s"}}/>))}<span style={{fontSize:16,color:T.textTer,marginLeft:"auto",transition:"transform 0.2s",transform:open?"rotate(180deg)":"rotate(0)"}}>▾</span></div></div>{open&&<div style={{padding:"0 22px 20px"}}><p style={{fontSize:13,color:T.textSec,fontFamily:Fn,lineHeight:1.75,margin:0}}>{moat.description}</p></div>}</div>);}

/* ═══════════════════════════════════════════ RICH VISUAL COMPONENTS ═══════════════════════════════════════════ */

/* Animated horizontal bar chart */
function HBar({ items, T, maxValue }) {
  const [anim, setAnim] = useState(false);
  const ref = useRef(null);
  useEffect(() => { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnim(true); }, { threshold: 0.3 }); if (ref.current) obs.observe(ref.current); return () => obs.disconnect(); }, []);
  const mx = maxValue || Math.max(...items.map(d => d.value));
  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {items.map((d, i) => (
        <div key={i}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: T.text, fontFamily: Fn }}>{d.label}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: d.color || T.green, fontFamily: Fn }}>{d.display || d.value}</span>
          </div>
          <div style={{ height: 10, borderRadius: 5, background: T.pillBg, overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 5, background: d.color || T.green, width: anim ? `${(d.value / mx) * 100}%` : "0%", transition: `width 1s cubic-bezier(0.22,1,0.36,1) ${i * 0.12}s` }} />
          </div>
          {d.sub && <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 4 }}>{d.sub}</div>}
        </div>
      ))}
    </div>
  );
}

/* Animated counter stat */
function AnimStat({ value, label, sub, color, T }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.5 }); if (ref.current) obs.observe(ref.current); return () => obs.disconnect(); }, []);
  return (
    <div ref={ref} style={{ background: T.card, borderRadius: T.radius, padding: "24px 20px", border: "1px solid " + T.border, textAlign: "center", boxShadow: T.shadow }}>
      <div style={{ fontSize: 32, fontWeight: 800, color: T[color] || T.text, fontFamily: Fn, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(12px)", transition: "all 0.6s cubic-bezier(0.22,1,0.36,1)" }}>{value}</div>
      <div style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, marginTop: 6, lineHeight: 1.4 }}>{label}</div>
      {sub && <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

/* Vertical timeline */
function Timeline({ items, T }) {
  const [expanded, setExpanded] = useState(null);
  return (
    <div style={{ position: "relative", paddingLeft: 28 }}>
      <div style={{ position: "absolute", left: 8, top: 6, bottom: 6, width: 2, background: T.border, borderRadius: 1 }} />
      {items.map((m, i) => (
        <div key={i} style={{ position: "relative", marginBottom: 20, cursor: "pointer" }} onClick={() => setExpanded(expanded === i ? null : i)}>
          <div style={{ position: "absolute", left: -24, top: 5, width: 14, height: 14, borderRadius: 7, background: expanded === i ? T.green : T.card, border: `2px solid ${expanded === i ? T.green : T.textTer}`, transition: "all 0.2s", zIndex: 1 }} />
          <div style={{ background: T.card, borderRadius: T.radius, border: "1px solid " + T.border, padding: "16px 20px", boxShadow: expanded === i ? T.shadowLg : T.shadow, transition: "all 0.2s" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, flex: 1 }}>{m.title}</span>
              <span style={{ fontSize: 16, color: T.textTer, transition: "transform 0.2s", transform: expanded === i ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
            </div>
            <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn }}>{m.subtitle}</div>
            {expanded === i && <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: "12px 0 0" }}>{m.detail}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

/* Waterfall / stacked capacity chart */
function CapacityWaterfall({ T }) {
  const [anim, setAnim] = useState(false);
  const ref = useRef(null);
  useEffect(() => { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnim(true); }, { threshold: 0.3 }); if (ref.current) obs.observe(ref.current); return () => obs.disconnect(); }, []);
  const stages = [
    { label: "Operational", value: 2.4, color: T.green, icon: "✓" },
    { label: "Under construction", value: 3.5, color: T.deepBlue, icon: "⚡" },
    { label: "Advanced pipeline", value: 10.1, color: T.orange, icon: "→" },
    { label: "Total pipeline", value: 16, color: T.text, icon: "Σ" },
  ];
  const mx = 16;
  return (
    <div ref={ref}>
      <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 16 }}>Iberdrola offshore wind capacity (GW)</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {stages.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: s.color + "14", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>{s.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: T.text, fontFamily: Fn, fontWeight: i === 3 ? 700 : 500 }}>{s.label}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: s.color, fontFamily: Fn }}>{s.value} GW</span>
              </div>
              <div style={{ height: i === 3 ? 14 : 10, borderRadius: 5, background: T.pillBg, overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: 5, background: i === 3 ? `linear-gradient(90deg, ${T.green}, ${T.deepBlue}, ${T.orange})` : s.color, width: anim ? `${(s.value / mx) * 100}%` : "0%", transition: `width 1s cubic-bezier(0.22,1,0.36,1) ${i * 0.15}s` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Interactive flywheel SVG */
function Flywheel({ loops, T }) {
  const [hov, setHov] = useState(null);
  const [spin, setSpin] = useState(0);
  useEffect(() => { const id = setInterval(() => setSpin(p => p + 0.3), 50); return () => clearInterval(id); }, []);
  const n = loops.length, r = 120, cx = 170, cy = 170, size = 340;
  const nodes = loops.map((l, i) => {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    return { ...l, x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle), i };
  });
  return (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ flexShrink: 0 }}>
        {/* spinning ring */}
        <circle cx={cx} cy={cy} r={r + 20} fill="none" stroke={T.border} strokeWidth="1.5" strokeDasharray="6 4" style={{ transform: `rotate(${spin}deg)`, transformOrigin: `${cx}px ${cy}px` }} />
        {/* arrows between nodes */}
        {nodes.map((nd, i) => {
          const next = nodes[(i + 1) % n];
          const mx2 = (nd.x + next.x) / 2, my2 = (nd.y + next.y) / 2;
          return <line key={`a${i}`} x1={nd.x} y1={nd.y} x2={next.x} y2={next.y} stroke={hov === i ? T.green : T.border} strokeWidth={hov === i ? 2 : 1} markerEnd="none" style={{ transition: "stroke 0.2s" }} />;
        })}
        {/* nodes */}
        {nodes.map((nd) => (
          <g key={nd.i} onMouseEnter={() => setHov(nd.i)} onMouseLeave={() => setHov(null)} style={{ cursor: "pointer" }}>
            <circle cx={nd.x} cy={nd.y} r={28} fill={hov === nd.i ? (T.text === "#0F172A" ? "rgba(29,78,216,0.08)" : "rgba(96,165,250,0.12)") : T.card} stroke={hov === nd.i ? T.deepBlue : T.border} strokeWidth={hov === nd.i ? 2 : 1} style={{ transition: "all 0.2s" }} />
            <text x={nd.x} y={nd.y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="9" fontWeight="600" fill={hov === nd.i ? T.deepBlue : T.textSec} fontFamily={Fn} style={{ pointerEvents: "none" }}>
              {nd.from.length > 10 ? nd.from.slice(0, 9) + "…" : nd.from}
            </text>
          </g>
        ))}
        <text x={cx} y={cx - 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.text} fontFamily={Fn}>Flywheel</text>
        <text x={cx} y={cx + 10} textAnchor="middle" fontSize="9" fill={T.textTer} fontFamily={Fn}>hover to explore</text>
      </svg>
      <div style={{ flex: 1, minWidth: 200 }}>
        {hov !== null ? (
          <div style={{ background: T.card, borderRadius: T.radius, border: "1px solid " + T.border, padding: "20px 24px", boxShadow: T.shadowLg, animation: "fadeIn 0.2s ease" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <Pill T={T} color={T.deepBlue} bg="rgba(29,78,216,0.08)">{loops[hov].from}</Pill>
              <span style={{ fontSize: 14, color: T.textTer }}>→</span>
              <Pill T={T} color={T.green} bg={T.greenBg}>{loops[hov].to}</Pill>
            </div>
            <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: 0 }}>{loops[hov].description}</p>
          </div>
        ) : (
          <div style={{ padding: 20, textAlign: "center" }}>
            <div style={{ fontSize: 12, color: T.textTer, fontFamily: Fn }}>Hover over a node to see how each force reinforces the others</div>
          </div>
        )}
      </div>
    </div>
  );
}

/* Donut ring stat */
function DonutStat({ pct, label, sub, color, T, size = 100 }) {
  const [anim, setAnim] = useState(false);
  const ref = useRef(null);
  useEffect(() => { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnim(true); }, { threshold: 0.5 }); if (ref.current) obs.observe(ref.current); return () => obs.disconnect(); }, []);
  const r = 38, circ = 2 * Math.PI * r, offset = circ - (pct / 100) * circ;
  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke={T.pillBg} strokeWidth="8" />
        <circle cx="50" cy="50" r={r} fill="none" stroke={color || T.green} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={anim ? offset : circ}
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)", transform: "rotate(-90deg)", transformOrigin: "50px 50px" }} />
        <text x="50" y="48" textAnchor="middle" fontSize="16" fontWeight="800" fill={T.text} fontFamily={Fn}>{pct}%</text>
        <text x="50" y="62" textAnchor="middle" fontSize="7" fill={T.textTer} fontFamily={Fn}>{sub || ""}</text>
      </svg>
      <div style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, marginTop: 4, lineHeight: 1.3 }}>{label}</div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════ MAIN ════════════════════════════════════════════════════════════════ */
export default function ResearchIBE({ T }) {
  const [section, setSection] = useState("primer");
  const [tab, setTab] = useState("Business Overview");
  const [fTab, setFTab] = useState("Electrification");
  const [vTab, setVTab] = useState("Growth");

  const primerTabs = ["Business Overview", "Business Segments", "Products", "Competitive Position", "Value Chain", "Moat Analysis"];
  const forcesTabs = ["Electrification", "Data Centres & AI", "Grid Supercycle", "Energy Security", "Offshore Wind", "Compounding Effects"];
  const finTabs = ["Growth", "Multiples", "Peer Valuation", "Profitability", "Leverage", "Capacity"];

  const prose = (text, s = {}) => <p style={{ fontSize: 13.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.8, margin: "0 0 16px", ...s }}>{text}</p>;
  const sTitle = (t) => <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 16, letterSpacing: "-0.01em" }}>{t}</div>;
  const activeHero = section === "primer" ? heroStats : section === "forces" ? forcesHeroStats : finHeroStats;
  const secColors = { primer: T.green, forces: T.orange, fin: T.deepBlue };
  const secBgs = { primer: T.greenBg, forces: "rgba(234,88,12,0.08)", fin: "rgba(29,78,216,0.08)" };
  const secLabels = { primer: "Business Primer", forces: "Structural Forces", fin: "Financials & Valuation" };

  /* ─── HEADER ─── */
  const header = (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
        <span style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 36, color: T.text }}>Iberdrola</span>
        <span style={{ fontSize: 14, fontWeight: 600, color: T.textTer, fontFamily: Fn, letterSpacing: "0.04em" }}>IBE SM</span>
        <Pill T={T} color={secColors[section]} bg={secBgs[section]}>{secLabels[section]}</Pill>
      </div>
      <div style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, marginBottom: 16 }}>BME · Bilbao, Spain · Europe's largest utility by market capitalisation</div>
      <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
        {[["primer","Business Primer"],["forces","Structural Forces"],["fin","Financials & Valuation"]].map(([k,l]) => (
          <button key={k} onClick={() => setSection(k)} style={{ padding: "10px 20px", borderRadius: T.radiusSm, border: section===k ? "2px solid "+secColors[k] : "1px solid "+T.border, fontSize: 12, fontFamily: Fn, fontWeight: section===k?700:400, background: section===k?secBgs[k]:T.card, color: section===k?secColors[k]:T.textTer, cursor: "pointer", transition: "all 0.15s" }}>{l}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10 }}>
        {activeHero.map((s, i) => (<div key={i} style={{ background: T.card, borderRadius: T.radiusSm, padding: "14px 16px", border: "1px solid " + T.border }}><div style={{ fontSize: 18, fontWeight: 700, color: T[s.color]||T.text, fontFamily: Fn }}>{s.value}</div><div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 3, lineHeight: 1.4 }}>{s.label}</div></div>))}
      </div>
    </div>
  );

  /* ═══════════════════════════════════════════ PRIMER TABS ═══════════════════════════════════════════ */
  const overviewTab = (<div>{sTitle("What does Iberdrola do?")}{businessDescription.map((p,i)=><div key={i}>{prose(p)}</div>)}</div>);
  const segmentsTab = (<div>{prose(segmentsProse)}<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:24,marginBottom:32}}><Card T={T} style={{padding:24}}><PieChart data={segments.map(s=>({name:s.name,share:s.share,color:s.color}))} T={T} label="EBITDA breakdown by segment (2024)" size={200}/></Card><Card T={T} style={{padding:24}}><PieChart data={revenueByRegion.map(r=>({name:r.name,share:r.share,color:r.color}))} T={T} label="EBITDA by geography (approximate)" size={200}/></Card></div>{sTitle("Geographic detail")}<div style={{display:"grid",gap:10,marginBottom:28}}>{revenueByRegion.map((r,i)=>(<Expandable key={i} title={r.name} subtitle={`~${r.share}% of EBITDA`} T={T}>{prose(r.description)}</Expandable>))}</div>{sTitle("Segment detail — description, growth, and cost structure")}{segments.map((s,i)=>(<div key={i} style={{marginBottom:16}}><Card T={T} style={{padding:0,overflow:"hidden",borderLeft:`4px solid ${s.color}`}}><div style={{padding:"20px 24px"}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}><span style={{fontSize:16,fontWeight:600,color:T.text,fontFamily:Fn}}>{s.name}</span><span style={{fontSize:12,fontWeight:600,color:s.color,fontFamily:Fn}}>~{s.share}% of EBITDA</span></div>{prose(s.description)}<Expandable title="Growth dynamics" T={T}>{prose(s.growthNote)}</Expandable><div style={{height:8}}/><Expandable title="Cost structure" T={T}>{prose(s.costNote)}</Expandable></div></Card></div>))}</div>);
  const productsTab = (<div>{products.map((cat,ci)=>(<div key={ci} style={{marginBottom:28}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><div style={{width:4,height:22,borderRadius:2,background:T[cat.color]||T.deepBlue}}/><span style={{fontSize:17,fontWeight:600,color:T.text,fontFamily:Fn}}>{cat.category}</span></div>{prose(cat.intro)}<div style={{display:"grid",gap:10}}>{cat.items.map((item,ii)=>(<Expandable key={ii} title={item.name} subtitle={item.subtitle} T={T}>{prose(item.desc)}</Expandable>))}</div></div>))}</div>);
  const competitiveTab = (<div>{prose(competitorIntro)}{sTitle("European renewable energy — estimated share among major utilities")}<Card T={T} style={{padding:24,marginBottom:28}}><PieChart data={marketSharePie} T={T} size={240}/></Card>{sTitle("Competitor profiles")}<div style={{display:"grid",gap:12}}>{competitors.map((c,i)=>(<Card key={i} T={T} style={{padding:0,overflow:"hidden",borderLeft:c.highlight?`4px solid ${T.green}`:"4px solid "+T.border}}><div style={{padding:"18px 22px"}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10,flexWrap:"wrap"}}><span style={{fontSize:15,fontWeight:700,color:c.highlight?T.green:T.text,fontFamily:Fn}}>{c.name}</span><Pill T={T}>{c.hq}</Pill></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}><div><div style={{fontSize:10,fontWeight:600,color:T.green,fontFamily:Fn,letterSpacing:"0.05em",marginBottom:6,textTransform:"uppercase"}}>Strengths</div><div style={{fontSize:12.5,color:T.textSec,fontFamily:Fn,lineHeight:1.7}}>{c.strengths}</div></div><div><div style={{fontSize:10,fontWeight:600,color:T.capRed,fontFamily:Fn,letterSpacing:"0.05em",marginBottom:6,textTransform:"uppercase"}}>Vulnerabilities</div><div style={{fontSize:12.5,color:T.textSec,fontFamily:Fn,lineHeight:1.7}}>{c.weaknesses}</div></div></div></div></Card>))}</div></div>);
  const roleColors={own:T.deepBlue,orchestrate:T.orange};const roleLabels={own:"Iberdrola owns this fully",orchestrate:"Iberdrola orchestrates"};
  const valueChainTab = (<div>{prose("The electricity industry has four sequential stages: generation, transmission, distribution, and retail.")}<div style={{display:"flex",gap:16,marginBottom:24,flexWrap:"wrap"}}>{["own","orchestrate"].map(role=>(<div key={role} style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:12,height:12,borderRadius:3,background:roleColors[role]}}/><span style={{fontSize:11,color:T.textSec,fontFamily:Fn}}>{roleLabels[role]}</span></div>))}</div><div style={{display:"flex",flexDirection:"column",gap:0}}>{valueChainStages.map((v,i)=>{const c=roleColors[v.ibeRole];return(<div key={i}><Expandable title={v.stage} subtitle={v.description} T={T}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><div style={{width:10,height:10,borderRadius:3,background:c}}/><span style={{fontSize:11,fontWeight:600,color:c,fontFamily:Fn}}>{roleLabels[v.ibeRole]}</span></div>{prose(v.ibeNote)}</Expandable><div style={{height:8}}/></div>);})}</div><div style={{padding:"18px 22px",marginTop:16,borderRadius:T.radius,background:T.text==="#0F172A"?"rgba(29,78,216,0.04)":"rgba(96,165,250,0.06)",border:"1px solid "+T.border}}><div style={{fontSize:13,color:T.textSec,fontFamily:Fn,lineHeight:1.75}}><strong style={{color:T.deepBlue}}>The key structural insight:</strong> Iberdrola participates in every stage of the electricity value chain across four continents. Full vertical integration creates powerful synergies: generation data optimises grid operations, grid customers become retail customers, and building renewables near owned grids reduces interconnection costs.</div></div></div>);
  const moatTab = (<div>{prose(moatIntro)}<div style={{display:"grid",gap:12}}>{moats.map((m,i)=><MoatCard key={i} moat={m} T={T}/>)}</div><div style={{padding:"18px 22px",marginTop:24,borderRadius:T.radius,background:T.greenBg,border:"1px solid "+T.border}}><div style={{fontSize:13,color:T.textSec,fontFamily:Fn,lineHeight:1.75}}><strong style={{color:T.green}}>Why this moat is so difficult to replicate:</strong> A competitor would need century-old hydro concessions, 35M network supply points, 45 GW of renewables at the best sites, investment-grade credit, and offshore wind capability across four countries. The combination cannot be assembled from scratch.</div></div></div>);
  const primerContent = {"Business Overview":overviewTab,"Business Segments":segmentsTab,"Products":productsTab,"Competitive Position":competitiveTab,"Value Chain":valueChainTab,"Moat Analysis":moatTab};

  /* ═══════════════════════════════════════════ FORCES TABS (ENRICHED) ═══════════════════════════════════════════ */
  const electrificationTab = (
    <div>
      {prose(electrificationIntro)}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))", gap: 12, marginBottom: 28 }}>
        <DonutStat pct={23} label="Electrification share today" sub="of final energy" color={T.textTer} T={T} />
        <DonutStat pct={35} label="2030 target" sub="EU mandated" color={T.orange} T={T} />
        <DonutStat pct={61} label="2050 target" sub="EU mandated" color={T.green} T={T} />
        <DonutStat pct={84} label="IBE generation" sub="emission-free" color={T.deepBlue} T={T} />
      </div>
      {sTitle("Projected new electricity demand by driver (TWh/year by 2030)")}
      <Card T={T} style={{ padding: 24, marginBottom: 28 }}>
        <HBar items={[
          { label: "Electric vehicles", value: 67, display: "~67 TWh", color: T.green, sub: "EU 2035 zero-emission mandate" },
          { label: "Heat pumps", value: 80, display: "~80 TWh", color: T.deepBlue, sub: "30M units target by 2030" },
          { label: "Data centres / AI", value: 72, display: "~72 TWh", color: T.orange, sub: "EU target: triple capacity in 5–7 years" },
          { label: "Industrial electrification", value: 80, display: "~80 TWh", color: T.purple, sub: "ETS + CBAM driving fuel switching" },
        ]} T={T} maxValue={100} />
      </Card>
      {sTitle("Detailed drivers")}
      <div style={{ display: "grid", gap: 12 }}>
        {electrificationDrivers.map((d, i) => (
          <Expandable key={i} title={d.title} subtitle={`${d.subtitle} · ${d.timeline}`} T={T}>{prose(d.detail)}</Expandable>
        ))}
      </div>
    </div>
  );

  const dataCentreTab = (
    <div>
      {prose(dataCentreIntro)}
      {sTitle("European data centre power demand trajectory")}
      <Card T={T} style={{ padding: 24, marginBottom: 28 }}>
        <HBar items={[
          { label: "2024 (actual)", value: 70, display: "~70 TWh", color: T.textTer },
          { label: "2025 (estimate)", value: 96, display: "~96 TWh", color: T.textSec },
          { label: "2030 (forecast)", value: 168, display: "~168 TWh", color: T.orange },
          { label: "2035 (forecast)", value: 238, display: "~238 TWh", color: T.capRed, sub: "+240% growth in a decade" },
        ]} T={T} maxValue={260} />
      </Card>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 28 }}>
        <AnimStat value="11+" label="TWh/year already contracted to hyperscalers" sub="Amazon · Microsoft · Meta · Apple" color="orange" T={T} />
        <AnimStat value="35" label="TWh total committed PPAs" sub="3 TWh signed in last 12 months" color="green" T={T} />
        <AnimStat value="5 GW" label="Potential data centre portfolio" sub="700+ MW grid connections secured near Madrid" color="deepBlue" T={T} />
      </div>
      {sTitle("How Iberdrola captures the opportunity")}
      <div style={{ display: "grid", gap: 12 }}>
        {dataCentrePositioning.map((d, i) => (
          <Expandable key={i} title={d.title} subtitle={d.subtitle} T={T}>{prose(d.detail)}</Expandable>
        ))}
      </div>
      <div style={{ padding: "18px 22px", marginTop: 24, borderRadius: T.radius, background: "rgba(234,88,12,0.04)", border: "1px solid " + T.border }}>
        <div style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75 }}><strong style={{ color: T.orange }}>The triple monetisation model:</strong> Iberdrola extracts value at three levels — grid connection fees (regulated return), long-term clean power PPAs (contracted generation), and equity participation in the data centre (capital gain). No other company type can offer all three as a single package.</div>
      </div>
    </div>
  );

  const gridTab = (
    <div>
      {prose(gridIntro)}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 12, marginBottom: 28 }}>
        <AnimStat value="€1.2T" label="Total EU grid investment needed by 2040" color="deepBlue" T={T} />
        <AnimStat value="40%" label="of EU distribution grids over 40 years old" color="capRed" T={T} />
        <AnimStat value="+60%" label="Electricity demand growth forecast by 2030" color="orange" T={T} />
        <AnimStat value="€51B" label="Iberdrola's current RAB" sub="→ €70B by 2028 → €90B+ by 2031" color="green" T={T} />
      </div>
      {sTitle("Why Europe's grid is not fit for purpose")}
      <Card T={T} style={{ padding: 24, marginBottom: 28 }}>
        <HBar items={[
          { label: "Distribution networks", value: 730, display: "€730bn", color: T.deepBlue, sub: "Local medium- and low-voltage grids to homes and businesses" },
          { label: "Transmission networks", value: 477, display: "€477bn", color: T.green, sub: "High-voltage backbone moving power long distances" },
        ]} T={T} maxValue={800} />
        <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginTop: 12, textAlign: "right" }}>Source: European Commission Grids Package (Dec 2025)</div>
      </Card>
      <div style={{ display: "grid", gap: 12, marginBottom: 28 }}>
        {gridProblems.map((g, i) => (
          <Expandable key={i} title={g.title} T={T}>{prose(g.detail)}</Expandable>
        ))}
      </div>
      <Card T={T} style={{ padding: 24 }}>
        <PieChart data={gridByCountry} T={T} label="Approximate share of grid investment need by country" size={220} />
      </Card>
      <div style={{ padding: "18px 22px", marginTop: 24, borderRadius: T.radius, background: T.text === "#0F172A" ? "rgba(29,78,216,0.04)" : "rgba(96,165,250,0.06)", border: "1px solid " + T.border }}>
        <div style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75 }}><strong style={{ color: T.deepBlue }}>Why this is Iberdrola's most powerful tailwind:</strong> Every euro invested in grid assets grows the RAB, on which Iberdrola earns a regulated return in perpetuity. With €1.2T of EU-wide need by 2040, the investment runway extends well into the 2040s. Iberdrola operates in four of the highest-need countries and is allocating the majority of its €58bn plan to network expansion.</div>
      </div>
    </div>
  );

  const securityTab = (
    <div>
      {prose(securityIntro)}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))", gap: 12, marginBottom: 28 }}>
        <DonutStat pct={45} label="Russian gas share 2021" sub="of EU imports" color={T.capRed} T={T} />
        <DonutStat pct={13} label="Russian gas share 2025" sub="of EU imports" color={T.orange} T={T} />
        <DonutStat pct={0} label="Target by 2027" sub="full phase-out" color={T.green} T={T} size={100} />
        <DonutStat pct={84} label="IBE emission-free gen." sub="domestic energy" color={T.deepBlue} T={T} />
      </div>
      {sTitle("Europe's path to energy sovereignty")}
      <Timeline items={securityMilestones} T={T} />
      <div style={{ padding: "18px 22px", marginTop: 24, borderRadius: T.radius, background: T.greenBg, border: "1px solid " + T.border }}>
        <div style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75 }}><strong style={{ color: T.green }}>What this means for Iberdrola:</strong> Governments actively want Iberdrola to invest more, build faster, and expand — because every megawatt of domestic renewable generation and every kilometre of modernised grid reduces national vulnerability to imported fossil fuels. This translates into supportive permitting, favourable regulation, and political goodwill.</div>
      </div>
    </div>
  );

  const offshoreTab = (
    <div>
      {prose(offshoreIntro)}
      <Card T={T} style={{ padding: 24, marginBottom: 28 }}>
        <CapacityWaterfall T={T} />
      </Card>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 28 }}>
        <AnimStat value="£850bn" label="North Sea Investment Pact capital mobilisation" sub="15 GW/year from 2031 to 2040" color="deepBlue" T={T} />
        <AnimStat value="7 GW" label="ScotWind pipeline (with Shell)" sub="Scotland's largest offshore wind allocation" color="green" T={T} />
        <AnimStat value="€15bn" label="Masdar co-investment partnership" sub="Funding next wave of offshore projects" color="orange" T={T} />
      </div>
      {sTitle("Structural drivers")}
      <div style={{ display: "grid", gap: 12 }}>
        {offshoreDrivers.map((d, i) => (
          <Expandable key={i} title={d.title} subtitle={d.subtitle} T={T}>{prose(d.detail)}</Expandable>
        ))}
      </div>
    </div>
  );

  const compoundingTab = (
    <div>
      {prose(compoundingIntro)}
      {sTitle("The Iberdrola flywheel")}
      <Card T={T} style={{ padding: 24, marginBottom: 28 }}>
        <Flywheel loops={compoundingLoops} T={T} />
      </Card>
      {sTitle("Quantifying the opportunity")}
      <Card T={T} style={{ padding: 0, overflow: "hidden", marginBottom: 28 }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: Fn, fontSize: 12 }}>
            <thead><tr style={{ borderBottom: "2px solid " + T.border }}>{["Tailwind","Investment Pool","Timeframe","Iberdrola's Position"].map(h => (<th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: T.text, fontSize: 11, letterSpacing: "0.03em" }}>{h}</th>))}</tr></thead>
            <tbody>{opportunityTable.map((r, i) => (<tr key={i} style={{ borderBottom: "1px solid " + T.border }}><td style={{ padding: "12px 16px", color: T.text, fontWeight: 500 }}>{r.tailwind}</td><td style={{ padding: "12px 16px", color: T.green, fontWeight: 700 }}>{r.pool}</td><td style={{ padding: "12px 16px", color: T.textSec }}>{r.timeframe}</td><td style={{ padding: "12px 16px", color: T.textSec }}>{r.position}</td></tr>))}</tbody>
          </table>
        </div>
      </Card>
      {sTitle("Key risks to the tailwind thesis")}
      <div style={{ display: "grid", gap: 10 }}>
        {keyRisks.map((r, i) => (<Expandable key={i} title={r.title} T={T}>{prose(r.detail)}</Expandable>))}
      </div>
      <div style={{ padding: "18px 22px", marginTop: 24, borderRadius: T.radius, background: "rgba(234,88,12,0.04)", border: "1px solid " + T.border }}>
        <div style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75 }}><strong style={{ color: T.orange }}>The bottom line:</strong> These tailwinds flow through the regulated asset base and contracted generation — predictable, inflation-protected earnings growth. The question is not whether the tailwinds exist — they are legislated, funded, and underway — but whether Iberdrola can execute fast enough to capture them.</div>
      </div>
    </div>
  );

  const forcesContent = {"Electrification":electrificationTab,"Data Centres & AI":dataCentreTab,"Grid Supercycle":gridTab,"Energy Security":securityTab,"Offshore Wind":offshoreTab,"Compounding Effects":compoundingTab};

  /* ═══════════════════════════════════════════ FINANCIALS TABS ═══════════════════════════════════════════ */
  const [selGrowth, setSelGrowth] = useState(null);
  const growthTab = (
    <div>
      {prose("Consensus estimates show Iberdrola delivering steady mid-single-digit EPS and net income growth through 2029, underpinned by accelerating revenue growth as network investment scales. EBITDA growth, depressed in FY2025, is forecast to re-accelerate from FY2027 as new capacity and RAB additions compound.")}
      {sTitle("Consensus YoY growth by metric — click a row to highlight")}
      <Card T={T} style={{ padding: 0, overflow: "hidden", marginBottom: 28 }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: Fn, fontSize: 12 }}>
            <thead><tr style={{ borderBottom: "2px solid " + T.border }}>
              <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: T.text, fontSize: 11 }}>Metric</th>
              {growthMetrics[0].values.map(v => <th key={v.year} style={{ padding: "12px 16px", textAlign: "right", fontWeight: 600, color: T.text, fontSize: 11 }}>{v.year}</th>)}
            </tr></thead>
            <tbody>{growthMetrics.map((gm, gi) => (
              <tr key={gi} onClick={() => setSelGrowth(selGrowth === gi ? null : gi)} style={{ borderBottom: "1px solid " + T.border, cursor: "pointer", background: selGrowth === gi ? (T.text === "#0F172A" ? "rgba(29,78,216,0.04)" : "rgba(96,165,250,0.06)") : "transparent", transition: "background 0.15s" }}>
                <td style={{ padding: "12px 16px", fontWeight: 600, color: gm.color }}><div style={{ display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 8, height: 8, borderRadius: 4, background: gm.color }} />{gm.metric}</div></td>
                {gm.values.map((v, vi) => (
                  <td key={vi} style={{ padding: "12px 16px", textAlign: "right", fontWeight: 600, color: v.value >= 0 ? T.green : T.capRed }}>
                    {v.value >= 0 ? "+" : ""}{v.value.toFixed(1)}%
                  </td>
                ))}
              </tr>
            ))}</tbody>
          </table>
        </div>
      </Card>
      {selGrowth !== null && (
        <Card T={T} style={{ padding: 24, marginBottom: 28 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: growthMetrics[selGrowth].color, fontFamily: Fn, marginBottom: 16 }}>{growthMetrics[selGrowth].metric} — YoY growth trajectory</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 140 }}>
            {growthMetrics[selGrowth].values.map((v, i) => {
              const maxAbs = Math.max(...growthMetrics[selGrowth].values.map(x => Math.abs(x.value)), 1);
              const h = Math.max((Math.abs(v.value) / maxAbs) * 100, 4);
              return (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: v.value >= 0 ? T.green : T.capRed, marginBottom: 4, fontFamily: Fn }}>{v.value >= 0 ? "+" : ""}{v.value.toFixed(1)}%</div>
                  <div style={{ width: "100%", maxWidth: 48, height: h, borderRadius: "6px 6px 0 0", background: v.value >= 0 ? growthMetrics[selGrowth].color : T.capRed, opacity: 0.85, transition: "height 0.5s ease" }} />
                  <div style={{ fontSize: 9, color: T.textTer, fontFamily: Fn, marginTop: 6 }}>{v.year.replace("FY","")}</div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
      {sTitle("Key growth observations")}
      <div style={{ display: "grid", gap: 10 }}>
        <Expandable title="Revenue acceleration from 1.8% to 5.7%" T={T}>{prose("Revenue growth is forecast to nearly triple from 1.8% in FY2025 to 5.7% by FY2029, reflecting the ramp-up of new renewable capacity and expanding network tariff income as the RAB grows. This acceleration is unusual for a utility — most European peers show decelerating or flat revenue trajectories.")}</Expandable>
        <Expandable title="Earnings compounding: 6–8% adjusted EPS growth sustained" T={T}>{prose("Adjusted EPS growth is forecast at 6–8% annually through FY2028, before moderating to 4% in FY2029. The compound effect over the full period implies roughly 35% cumulative EPS growth — translating directly into P/E compression on a static share price or share price appreciation on a static multiple.")}</Expandable>
        <Expandable title="Dividend growth tracking earnings: ~6% CAGR" T={T}>{prose("DPS growth is forecast at roughly 6% annually from FY2026 through FY2029, keeping the payout ratio broadly stable while the dividend yield rises from 3.3% to over 4% on current prices. Iberdrola has increased its dividend every year since 2001 — a 25-year streak.")}</Expandable>
      </div>
    </div>
  );

  const [sortCol, setSortCol] = useState("evEbitdaFY1");
  const [sortDir, setSortDir] = useState("asc");
  const sortedPeers = [...peerValuation].filter(p => p.mktCap).sort((a, b) => {
    const av = a[sortCol], bv = b[sortCol];
    if (av == null) return 1; if (bv == null) return -1;
    return sortDir === "asc" ? av - bv : bv - av;
  });
  const toggleSort = (col) => { if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc"); else { setSortCol(col); setSortDir("asc"); } };

  const multiplesTab = (
    <div>
      {prose("Iberdrola's forward multiples compress steadily as earnings growth compounds — from 13.0× EV/EBITDA in FY2026 to 11.7× by FY2028, and from 20.6× P/E to 17.9×. The dividend yield rises from 3.3% to 4.0% over the same period, offering a rare combination of growth and income in the European utility space.")}
      {sTitle("Forward multiple compression")}
      <Card T={T} style={{ padding: 24, marginBottom: 28 }}>
        {["EV/EBITDA", "P/E (Adj)", "Div. Yield %"].map(metric => {
          const row = forwardMultiples.find(f => f.metric === metric);
          if (!row) return null;
          const isDY = metric === "Div. Yield %";
          const vals = [row.fy26, row.fy27, row.fy28].filter(v => v != null);
          const mx = Math.max(...vals) * 1.15;
          return (
            <div key={metric} style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 10 }}>{metric}</div>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
                {[{ label: "FY2026E", v: row.fy26 }, { label: "FY2027E", v: row.fy27 }, { label: "FY2028E", v: row.fy28 }].map((d, i) => (
                  <div key={i} style={{ flex: 1, textAlign: "center" }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: isDY ? T.green : T.deepBlue, fontFamily: Fn, marginBottom: 6 }}>{d.v != null ? (isDY ? d.v.toFixed(1) + "%" : d.v.toFixed(1) + "×") : "—"}</div>
                    <div style={{ height: d.v != null ? Math.max((d.v / mx) * 60, 6) : 4, background: isDY ? T.green : T.deepBlue, borderRadius: 4, opacity: 0.15 + (i * 0.25), transition: "height 0.5s" }} />
                    <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 6 }}>{d.label}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </Card>
      {sTitle("Full forward multiples table")}
      <Card T={T} style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: Fn, fontSize: 12 }}>
            <thead><tr style={{ borderBottom: "2px solid " + T.border }}>
              {["Metric", "L4Q Act", "N4Q Est", "FY2026E", "FY2027E", "FY2028E"].map(h => <th key={h} style={{ padding: "10px 14px", textAlign: h === "Metric" ? "left" : "right", fontWeight: 600, color: T.text, fontSize: 11 }}>{h}</th>)}
            </tr></thead>
            <tbody>{forwardMultiples.map((fm, i) => (
              <tr key={i} style={{ borderBottom: "1px solid " + T.border }}>
                <td style={{ padding: "10px 14px", fontWeight: 500, color: T.text }}>{fm.metric}</td>
                {[fm.l4q, fm.n4q, fm.fy26, fm.fy27, fm.fy28].map((v, vi) => (
                  <td key={vi} style={{ padding: "10px 14px", textAlign: "right", color: v != null ? T.textSec : T.textTer, fontWeight: 500 }}>{v != null ? (fm.metric.includes("Yield") ? v.toFixed(2) + "%" : v.toFixed(2)) : "—"}</td>
                ))}
              </tr>
            ))}</tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const peerCols = [
    { key: "mktCap", label: "Mkt Cap (€B)", fmt: v => v?.toFixed(1) },
    { key: "ev", label: "EV (€B)", fmt: v => v?.toFixed(1) },
    { key: "evEbitdaFY1", label: "EV/EBITDA FY1", fmt: v => v?.toFixed(1) + "×" },
    { key: "evEbitdaFY2", label: "EV/EBITDA FY2", fmt: v => v?.toFixed(1) + "×" },
    { key: "peFY1", label: "P/E FY1", fmt: v => v?.toFixed(1) + "×" },
    { key: "peFY2", label: "P/E FY2", fmt: v => v?.toFixed(1) + "×" },
    { key: "divYield", label: "Div Yld %", fmt: v => v?.toFixed(1) + "%" },
  ];

  const peerTab = (
    <div>
      {prose("Iberdrola trades at a significant premium to European utility peers on EV/EBITDA (13.0× vs 11.9× median) and P/E (20.6× vs 19.0× median). This premium is justified by faster earnings growth, higher proportion of regulated earnings, and stronger ESG credentials — but investors should monitor whether the premium is compressing or expanding. Click column headers to sort.")}
      {sTitle("Peer valuation comparison — sortable")}
      <Card T={T} style={{ padding: 0, overflow: "hidden", marginBottom: 28 }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: Fn, fontSize: 11.5 }}>
            <thead><tr style={{ borderBottom: "2px solid " + T.border }}>
              <th style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: T.text, fontSize: 11 }}>Name</th>
              {peerCols.map(c => (
                <th key={c.key} onClick={() => toggleSort(c.key)} style={{ padding: "10px 14px", textAlign: "right", fontWeight: 600, color: sortCol === c.key ? T.deepBlue : T.text, fontSize: 11, cursor: "pointer", whiteSpace: "nowrap", userSelect: "none" }}>
                  {c.label} {sortCol === c.key ? (sortDir === "asc" ? "↑" : "↓") : ""}
                </th>
              ))}
            </tr></thead>
            <tbody>
              <tr style={{ borderBottom: "2px solid " + T.border, background: T.pillBg }}>
                <td style={{ padding: "8px 14px", fontWeight: 600, color: T.textTer, fontStyle: "italic" }}>Median</td>
                {peerCols.map(c => <td key={c.key} style={{ padding: "8px 14px", textAlign: "right", color: T.textTer, fontWeight: 500 }}>{peerMedian[c.key] != null ? c.fmt(peerMedian[c.key]) : "—"}</td>)}
              </tr>
              {sortedPeers.map((p, i) => (
                <tr key={i} style={{ borderBottom: "1px solid " + T.border, background: p.highlight ? (T.text === "#0F172A" ? "rgba(29,78,216,0.03)" : "rgba(96,165,250,0.04)") : "transparent" }}>
                  <td style={{ padding: "10px 14px", fontWeight: p.highlight ? 700 : 500, color: p.highlight ? T.deepBlue : T.text }}>{p.name}</td>
                  {peerCols.map(c => {
                    const v = p[c.key];
                    const med = peerMedian[c.key];
                    const isAbove = v != null && med != null && v > med;
                    const prem = c.key === "divYield" ? !isAbove : isAbove;
                    return <td key={c.key} style={{ padding: "10px 14px", textAlign: "right", fontWeight: p.highlight ? 600 : 400, color: v != null ? (p.highlight ? T.deepBlue : T.textSec) : T.textTer }}>{v != null ? c.fmt(v) : "—"}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      {sTitle("Premium / discount to median")}
      <Card T={T} style={{ padding: 24 }}>
        {[{ label: "EV/EBITDA FY1", ibe: 13.01, med: 11.85 }, { label: "P/E FY1", ibe: 20.57, med: 19.03 }, { label: "Div Yield", ibe: 3.27, med: 3.99 }].map((d, i) => {
          const prem = ((d.ibe / d.med - 1) * 100);
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: i < 2 ? 16 : 0 }}>
              <div style={{ width: 110, fontSize: 12, fontWeight: 500, color: T.text, fontFamily: Fn }}>{d.label}</div>
              <div style={{ flex: 1, height: 8, borderRadius: 4, background: T.pillBg, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: T.textTer }} />
                <div style={{
                  position: "absolute", top: 0, bottom: 0, borderRadius: 4,
                  left: prem >= 0 ? "50%" : `${50 + prem * 2}%`,
                  width: `${Math.min(Math.abs(prem) * 2, 48)}%`,
                  background: prem >= 0 ? T.orange : T.green,
                  transition: "all 0.5s"
                }} />
              </div>
              <div style={{ width: 70, fontSize: 12, fontWeight: 700, color: prem >= 0 ? T.orange : T.green, fontFamily: Fn, textAlign: "right" }}>
                {prem >= 0 ? "+" : ""}{prem.toFixed(0)}%
              </div>
            </div>
          );
        })}
        <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 12, textAlign: "center" }}>← discount to median | premium to median →</div>
      </Card>
    </div>
  );

  const profitabilityTab = (
    <div>
      {prose("Iberdrola's profitability profile is competitive within the utility peer group: a 35% EBITDA margin, 12.2% ROE, and 43% net income growth in FY2025 place it above median on most metrics. The anomaly is NextEra's exceptionally high margins — driven by its US tax credit structure — which distort direct comparisons.")}
      {sTitle("Profitability scorecard vs peers")}
      <Card T={T} style={{ padding: 0, overflow: "hidden", marginBottom: 28 }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: Fn, fontSize: 12 }}>
            <thead><tr style={{ borderBottom: "2px solid " + T.border }}>
              {["Metric", "Iberdrola", "NextEra", "Enel", "Median"].map(h => <th key={h} style={{ padding: "10px 14px", textAlign: h === "Metric" ? "left" : "right", fontWeight: 600, color: T.text, fontSize: 11 }}>{h}</th>)}
            </tr></thead>
            <tbody>{profitabilityComp.map((p, i) => (
              <tr key={i} style={{ borderBottom: "1px solid " + T.border }}>
                <td style={{ padding: "10px 14px", fontWeight: 500, color: T.text }}>{p.metric}</td>
                <td style={{ padding: "10px 14px", textAlign: "right", fontWeight: 700, color: T.deepBlue }}>{p.ibe.toFixed(1)}{p.unit}</td>
                <td style={{ padding: "10px 14px", textAlign: "right", color: T.textSec }}>{p.nee.toFixed(1)}{p.unit}</td>
                <td style={{ padding: "10px 14px", textAlign: "right", color: T.textSec }}>{p.enel.toFixed(1)}{p.unit}</td>
                <td style={{ padding: "10px 14px", textAlign: "right", color: T.textTer, fontStyle: "italic" }}>{p.median.toFixed(1)}{p.unit}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </Card>
      {sTitle("Iberdrola vs median — visual comparison")}
      <Card T={T} style={{ padding: 24 }}>
        {profitabilityComp.filter(p => ["EBITDA Margin", "Net Profit Margin", "ROE", "ROIC", "Capex/Sales"].includes(p.metric)).map((p, i) => {
          const mx = Math.max(p.ibe, p.median, 1);
          return (
            <div key={i} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: T.text, fontFamily: Fn }}>{p.metric}</span>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ height: 8, borderRadius: 4, background: T.pillBg, overflow: "hidden" }}><div style={{ height: "100%", borderRadius: 4, background: T.deepBlue, width: `${(p.ibe / (mx * 1.3)) * 100}%`, transition: "width 0.8s" }} /></div>
                  <div style={{ fontSize: 10, color: T.deepBlue, fontWeight: 600, fontFamily: Fn, marginTop: 2 }}>IBE {p.ibe.toFixed(1)}{p.unit}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ height: 8, borderRadius: 4, background: T.pillBg, overflow: "hidden" }}><div style={{ height: "100%", borderRadius: 4, background: T.textTer, width: `${(p.median / (mx * 1.3)) * 100}%`, transition: "width 0.8s" }} /></div>
                  <div style={{ fontSize: 10, color: T.textTer, fontWeight: 500, fontFamily: Fn, marginTop: 2 }}>Median {p.median.toFixed(1)}{p.unit}</div>
                </div>
              </div>
            </div>
          );
        })}
      </Card>
    </div>
  );

  const leverageTab = (
    <div>
      {prose("Iberdrola's balance sheet is leveraged but disciplined for a utility — Net Debt/EBITDA of 4.2× is in line with the peer median, and EBITDA/Interest coverage of 5.8× is the strongest in the peer group. The BBB+/Baa1 credit rating reflects a balance sheet stretched by the €58 billion investment plan but backstopped by the predictability of regulated network returns.")}
      {sTitle("Leverage comparison vs peers")}
      <Card T={T} style={{ padding: 0, overflow: "hidden", marginBottom: 28 }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: Fn, fontSize: 12 }}>
            <thead><tr style={{ borderBottom: "2px solid " + T.border }}>
              {["Metric", "Iberdrola", "NextEra", "Enel", "EDP", "Median"].map(h => <th key={h} style={{ padding: "10px 14px", textAlign: h === "Metric" ? "left" : "right", fontWeight: 600, color: T.text, fontSize: 11 }}>{h}</th>)}
            </tr></thead>
            <tbody>{leverageComp.map((l, i) => (
              <tr key={i} style={{ borderBottom: "1px solid " + T.border }}>
                <td style={{ padding: "10px 14px", fontWeight: 500, color: T.text }}>{l.metric}</td>
                <td style={{ padding: "10px 14px", textAlign: "right", fontWeight: 700, color: T.deepBlue }}>{l.ibe.toFixed(2)}{l.unit}</td>
                <td style={{ padding: "10px 14px", textAlign: "right", color: T.textSec }}>{l.nee.toFixed(2)}{l.unit}</td>
                <td style={{ padding: "10px 14px", textAlign: "right", color: T.textSec }}>{l.enel.toFixed(2)}{l.unit}</td>
                <td style={{ padding: "10px 14px", textAlign: "right", color: T.textSec }}>{l.edp.toFixed(2)}{l.unit}</td>
                <td style={{ padding: "10px 14px", textAlign: "right", color: T.textTer, fontStyle: "italic" }}>{l.median.toFixed(2)}{l.unit}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </Card>
      {sTitle("Interest coverage — Iberdrola leads peers")}
      <Card T={T} style={{ padding: 24 }}>
        {[{ name: "Iberdrola", v: 5.78, color: T.deepBlue }, { name: "Enel", v: 4.77, color: T.textSec }, { name: "EDP", v: 3.85, color: T.textSec }, { name: "NextEra", v: 3.27, color: T.textSec }].map((d, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <span style={{ width: 80, fontSize: 12, fontWeight: d.name === "Iberdrola" ? 700 : 400, color: d.color, fontFamily: Fn }}>{d.name}</span>
            <div style={{ flex: 1, height: 12, borderRadius: 6, background: T.pillBg, overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 6, background: d.color, width: `${(d.v / 7) * 100}%`, opacity: d.name === "Iberdrola" ? 1 : 0.5, transition: "width 0.8s" }} />
            </div>
            <span style={{ width: 40, fontSize: 13, fontWeight: 700, color: d.color, fontFamily: Fn, textAlign: "right" }}>{d.v.toFixed(1)}×</span>
          </div>
        ))}
        <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 8 }}>EBITDA / Interest Expense — higher is stronger</div>
      </Card>
    </div>
  );

  const [capHov, setCapHov] = useState(null);
  const capData = capacityEvolution;
  const capacityTab = (
    <div>
      {prose("Iberdrola's generation fleet is growing steadily across all renewable technologies while nuclear remains flat and will begin declining post-2028. The most dramatic growth is in offshore wind (tripling from 1.3 GW in 2022 to 4.2 GW by 2028E) and solar PV (more than doubling). Hover over the chart to explore.")}
      {sTitle("Installed capacity evolution by technology (MW)")}
      <Card T={T} style={{ padding: 24, marginBottom: 28 }}>
        <div style={{ position: "relative", height: 260 }}>
          {/* stacked bar chart */}
          <div style={{ display: "flex", alignItems: "flex-end", height: 220, gap: 6, paddingBottom: 30 }}>
            {capData.years.map((yr, yi) => {
              const total = capData.series.reduce((s, ser) => s + ser.values[yi], 0);
              const maxTotal = Math.max(...capData.years.map((_, i) => capData.series.reduce((s, ser) => s + ser.values[i], 0)));
              const barH = (total / maxTotal) * 190;
              return (
                <div key={yr} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}
                  onMouseEnter={() => setCapHov(yi)} onMouseLeave={() => setCapHov(null)}>
                  <div style={{ width: "100%", maxWidth: 52, display: "flex", flexDirection: "column-reverse", height: barH, borderRadius: "6px 6px 0 0", overflow: "hidden", transition: "opacity 0.2s", opacity: capHov !== null && capHov !== yi ? 0.4 : 1 }}>
                    {capData.series.map((ser, si) => {
                      const segH = (ser.values[yi] / total) * barH;
                      return <div key={si} style={{ width: "100%", height: segH, background: ser.color, transition: "height 0.5s" }} />;
                    })}
                  </div>
                  <div style={{ fontSize: 10, color: capHov === yi ? T.text : T.textTer, fontWeight: capHov === yi ? 700 : 400, fontFamily: Fn, marginTop: 6 }}>{yr}</div>
                  {capHov === yi && <div style={{ fontSize: 10, fontWeight: 700, color: T.text, fontFamily: Fn }}>{(total / 1000).toFixed(1)}k</div>}
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 8 }}>
          {capData.series.map((ser, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: ser.color }} />
              <span style={{ fontSize: 11, color: T.textSec, fontFamily: Fn }}>{ser.name}</span>
            </div>
          ))}
        </div>
      </Card>
      {capHov !== null && (
        <Card T={T} style={{ padding: 20, marginBottom: 28 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 10 }}>{capData.years[capHov]} breakdown</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 10 }}>
            {capData.series.map((ser, si) => (
              <div key={si} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: 4, background: ser.color }} />
                <div><div style={{ fontSize: 14, fontWeight: 700, color: ser.color, fontFamily: Fn }}>{(ser.values[capHov] / 1000).toFixed(1)} GW</div><div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn }}>{ser.name}</div></div>
              </div>
            ))}
          </div>
        </Card>
      )}
      {sTitle("Peer comparison — wind capacity (MW, 2025)")}
      <Card T={T} style={{ padding: 24, marginBottom: 20 }}>
        {peerCapacity.wind.map((p, i) => (
          <div key={i} style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: T.text, fontFamily: Fn }}>{p.name}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: p.color, fontFamily: Fn }}>{((p.onshore + p.offshore) / 1000).toFixed(1)} GW</span>
            </div>
            <div style={{ display: "flex", height: 10, borderRadius: 5, overflow: "hidden", background: T.pillBg }}>
              <div style={{ height: "100%", background: p.color, width: `${(p.onshore / 25000) * 100}%`, opacity: 0.7, transition: "width 0.8s" }} />
              <div style={{ height: "100%", background: p.color, width: `${(p.offshore / 25000) * 100}%`, opacity: 1, transition: "width 0.8s" }} />
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 3 }}>
              <span style={{ fontSize: 9, color: T.textTer, fontFamily: Fn }}>Onshore: {(p.onshore / 1000).toFixed(1)} GW</span>
              <span style={{ fontSize: 9, color: T.textTer, fontFamily: Fn }}>Offshore: {(p.offshore / 1000).toFixed(1)} GW</span>
            </div>
          </div>
        ))}
      </Card>
      {sTitle("Peer comparison — solar capacity (MW, 2025)")}
      <Card T={T} style={{ padding: 24 }}>
        {peerCapacity.solar.map((p, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: T.text, fontFamily: Fn }}>{p.name}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: p.color, fontFamily: Fn }}>{(p.value / 1000).toFixed(1)} GW</span>
            </div>
            <div style={{ height: 10, borderRadius: 5, background: T.pillBg, overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 5, background: p.color, width: `${(p.value / 10000) * 100}%`, transition: "width 0.8s" }} />
            </div>
          </div>
        ))}
      </Card>
    </div>
  );

  const finContent = { "Growth": growthTab, "Multiples": multiplesTab, "Peer Valuation": peerTab, "Profitability": profitabilityTab, "Leverage": leverageTab, "Capacity": capacityTab };

  return (<div>{header}{section==="primer"?(<><Tabs tabs={primerTabs} active={tab} onChange={setTab} T={T}/>{primerContent[tab]}</>):section==="forces"?(<><Tabs tabs={forcesTabs} active={fTab} onChange={setFTab} T={T}/>{forcesContent[fTab]}</>):(<><Tabs tabs={finTabs} active={vTab} onChange={setVTab} T={T}/>{finContent[vTab]}</>)}</div>);
}
