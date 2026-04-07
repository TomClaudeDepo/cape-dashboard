import { useState, useRef, useEffect } from "react";
import { Fn, Fh } from "../theme";
import { Card, Pill } from "../components/shared";
import {
  heroStats, businessDescription, segmentsProse, segments, segmentTarget2030,
  revenueByRegion, products, valueChainStages,
  competitorIntro, competitors, marketSharePie,
  moatIntro, moats,
} from "../data/research-nxt";

/* ═══════════════════════════════════════════
   INTERACTIVE PIE CHART
   ═══════════════════════════════════════════ */
function PieChart({ data, size = 220, T, label }) {
  const [hov, setHov] = useState(null);
  const r = size / 2 - 8;
  const cx = size / 2, cy = size / 2;
  let cumAngle = -90; // start at top

  const slices = data.map((d, i) => {
    const angle = (d.share / 100) * 360;
    const startAngle = cumAngle;
    cumAngle += angle;
    const endAngle = cumAngle;
    const sr = (Math.PI / 180) * startAngle;
    const er = (Math.PI / 180) * endAngle;
    const large = angle > 180 ? 1 : 0;
    const x1 = cx + r * Math.cos(sr), y1 = cy + r * Math.sin(sr);
    const x2 = cx + r * Math.cos(er), y2 = cy + r * Math.sin(er);
    const mid = (Math.PI / 180) * ((startAngle + endAngle) / 2);
    const pull = hov === i ? 6 : 0;
    const dx = pull * Math.cos(mid), dy = pull * Math.sin(mid);
    const path = `M ${cx + dx} ${cy + dy} L ${x1 + dx} ${y1 + dy} A ${r} ${r} 0 ${large} 1 ${x2 + dx} ${y2 + dy} Z`;
    return { ...d, path, i, midAngle: mid };
  });

  return (
    <div>
      {label && <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 12 }}>{label}</div>}
      <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ flexShrink: 0 }}>
          {slices.map(s => (
            <path key={s.i} d={s.path} fill={s.color} stroke={T.card} strokeWidth="2"
              opacity={hov !== null && hov !== s.i ? 0.4 : 1}
              style={{ transition: "all 0.2s", cursor: "pointer" }}
              onMouseEnter={() => setHov(s.i)} onMouseLeave={() => setHov(null)} />
          ))}
          {/* centre label on hover */}
          {hov !== null && (
            <g>
              <text x={cx} y={cy - 6} textAnchor="middle" fontSize="20" fontWeight="700" fill={T.text} fontFamily={Fn}>{data[hov].share}%</text>
              <text x={cx} y={cy + 12} textAnchor="middle" fontSize="10" fill={T.textSec} fontFamily={Fn}>{data[hov].name}</text>
            </g>
          )}
        </svg>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {data.map((d, i) => (
            <div key={i} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
              style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "4px 8px", borderRadius: 6, background: hov === i ? T.pillBg : "transparent", transition: "background 0.15s" }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: d.color, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: hov === i ? T.text : T.textSec, fontFamily: Fn, fontWeight: hov === i ? 600 : 400, transition: "all 0.15s" }}>
                {d.name} — {d.share}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   EXPANDABLE SECTION
   ═══════════════════════════════════════════ */
function Expandable({ title, subtitle, children, color, T, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const innerRef = useRef(null);
  const [maxH, setMaxH] = useState(0);
  useEffect(() => { if (innerRef.current) setMaxH(innerRef.current.scrollHeight); }, [open, children]);
  return (
    <div style={{
      background: T.card, borderRadius: T.radius, border: "1px solid " + T.border,
      overflow: "hidden", transition: "all 0.2s", boxShadow: open ? T.shadowLg : T.shadow,
    }}>
      <div onClick={() => setOpen(!open)} style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn }}>{title}</div>
          {subtitle && <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginTop: 2 }}>{subtitle}</div>}
        </div>
        <span style={{ fontSize: 16, color: T.textTer, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
      </div>
      <div style={{ maxHeight: open ? maxH + 20 : 0, overflow: "hidden", transition: "max-height 0.35s ease" }}>
        <div ref={innerRef} onClick={e => e.stopPropagation()} style={{ padding: "0 20px 20px", cursor: "default" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   TABS
   ═══════════════════════════════════════════ */
function Tabs({ tabs, active, onChange, T }) {
  return (
    <div style={{ display: "flex", gap: 4, background: T.pillBg, borderRadius: T.radiusSm, padding: 3, marginBottom: 28, flexWrap: "wrap" }}>
      {tabs.map(t => (
        <button key={t} onClick={() => onChange(t)} style={{
          padding: "8px 14px", borderRadius: 6, border: "none", fontSize: 12, fontFamily: Fn,
          fontWeight: active === t ? 600 : 400,
          background: active === t ? T.card : "transparent",
          color: active === t ? T.text : T.textTer,
          cursor: "pointer", transition: "all 0.15s",
          boxShadow: active === t ? T.shadow : "none",
          whiteSpace: "nowrap",
        }}>{t}</button>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   MOAT BAR
   ═══════════════════════════════════════════ */
function MoatCard({ moat, T }) {
  const [open, setOpen] = useState(false);
  const catColors = { "Switching Costs": T.deepBlue, "Scale Economies": T.green, "Regulatory Moat": T.orange, "Intangible Assets": T.purple, "Cost Advantage": T.capRed };
  const c = catColors[moat.category] || T.textSec;
  return (
    <div style={{ background: T.card, borderRadius: T.radius, border: "1px solid " + T.border, overflow: "hidden", boxShadow: open ? T.shadowLg : T.shadow, transition: "all 0.2s" }}>
      <div onClick={() => setOpen(!open)} style={{ padding: "18px 22px", cursor: "pointer" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, flex: 1 }}>{moat.title}</span>
          <Pill T={T} color={c} bg={c + "14"}>{moat.category}</Pill>
        </div>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <span style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginRight: 6 }}>Strength</span>
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} style={{ width: 28, height: 6, borderRadius: 3, background: i <= moat.strength ? c : T.pillBg, transition: "background 0.3s" }} />
          ))}
          <span style={{ fontSize: 16, color: T.textTer, marginLeft: "auto", transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
        </div>
      </div>
      {open && (
        <div style={{ padding: "0 22px 20px" }}>
          <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: 0 }}>{moat.description}</p>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════════════════════════ */
export default function ResearchNXT({ T }) {
  const [tab, setTab] = useState("Business Overview");
  const allTabs = ["Business Overview", "Business Segments", "Products", "Competitive Position", "Value Chain", "Moat Analysis"];

  const prose = (text, style = {}) => (
    <p style={{ fontSize: 13.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.8, margin: "0 0 16px", ...style }}>{text}</p>
  );

  const sectionTitle = (title) => (
    <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 16, letterSpacing: "-0.01em" }}>{title}</div>
  );

  /* ─── HEADER ─── */
  const header = (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
        <span style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 36, color: T.text }}>Nextpower</span>
        <span style={{ fontSize: 14, fontWeight: 600, color: T.textTer, fontFamily: Fn, letterSpacing: "0.04em" }}>NXT US</span>
        <Pill T={T} color={T.orange} bg="rgba(234,88,12,0.08)">Business Primer</Pill>
      </div>
      <div style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, marginBottom: 16 }}>
        Nasdaq · Fremont, California · World's largest solar tracker company
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10 }}>
        {heroStats.map((s, i) => (
          <div key={i} style={{ background: T.card, borderRadius: T.radiusSm, padding: "14px 16px", border: "1px solid " + T.border }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: T[s.color] || T.text, fontFamily: Fn }}>{s.value}</div>
            <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 3, lineHeight: 1.4 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );

  /* ─── TAB: BUSINESS OVERVIEW ─── */
  const overviewTab = (
    <div>
      {sectionTitle("What does Nextpower do?")}
      {businessDescription.map((p, i) => <div key={i}>{prose(p)}</div>)}
    </div>
  );

  /* ─── TAB: BUSINESS SEGMENTS ─── */
  const segmentsTab = (
    <div>
      {prose(segmentsProse)}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24, marginBottom: 32 }}>
        <Card T={T} style={{ padding: 24 }}>
          <PieChart data={segments.map(s => ({ name: s.name, share: s.share, color: s.color }))} T={T} label="Revenue breakdown today (approximate)" size={200} />
        </Card>
        <Card T={T} style={{ padding: 24 }}>
          <PieChart data={segmentTarget2030} T={T} label="Management's 2030 target" size={200} />
        </Card>
      </div>

      {sectionTitle("Revenue by geography")}
      <Card T={T} style={{ padding: 24, marginBottom: 28 }}>
        <PieChart data={revenueByRegion.map(r => ({ name: r.name, share: r.share, color: r.color }))} T={T} label="Revenue by region (approximate)" size={220} />
      </Card>

      <div style={{ display: "grid", gap: 10, marginBottom: 28 }}>
        {revenueByRegion.map((r, i) => (
          <Expandable key={i} title={r.name} subtitle={`~${r.share}% of revenue`} T={T}>
            {prose(r.description)}
          </Expandable>
        ))}
      </div>

      {sectionTitle("Segment detail — revenue, growth, and cost structure")}
      {segments.map((s, i) => (
        <div key={i} style={{ marginBottom: 16 }}>
          <Card T={T} style={{ padding: 0, overflow: "hidden", borderLeft: `4px solid ${s.color}` }}>
            <div style={{ padding: "20px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span style={{ fontSize: 16, fontWeight: 600, color: T.text, fontFamily: Fn }}>{s.name}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: s.color, fontFamily: Fn }}>~{s.share}% of revenue</span>
              </div>
              {prose(s.description)}

              <Expandable title="Revenue growth dynamics" T={T}>
                {prose(s.growthNote)}
              </Expandable>
              <div style={{ height: 8 }} />
              <Expandable title="Cost structure" T={T}>
                {prose(s.costNote)}
              </Expandable>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );

  /* ─── TAB: PRODUCTS ─── */
  const productsTab = (
    <div>
      {products.map((cat, ci) => (
        <div key={ci} style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div style={{ width: 4, height: 22, borderRadius: 2, background: T[cat.color] || T.deepBlue }} />
            <span style={{ fontSize: 17, fontWeight: 600, color: T.text, fontFamily: Fn }}>{cat.category}</span>
          </div>
          {prose(cat.intro)}
          <div style={{ display: "grid", gap: 10 }}>
            {cat.items.map((item, ii) => (
              <Expandable key={ii} title={item.name} subtitle={item.subtitle} T={T}>
                {prose(item.desc)}
              </Expandable>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  /* ─── TAB: COMPETITIVE POSITION ─── */
  const competitiveTab = (
    <div>
      {prose(competitorIntro)}

      {sectionTitle("Global tracker market share (2024 estimates)")}
      <Card T={T} style={{ padding: 24, marginBottom: 28 }}>
        <PieChart data={marketSharePie} T={T} size={240} />
      </Card>

      {sectionTitle("Competitor profiles")}
      <div style={{ display: "grid", gap: 12 }}>
        {competitors.map((c, i) => (
          <Card key={i} T={T} style={{ padding: 0, overflow: "hidden", borderLeft: c.highlight ? `4px solid ${T.deepBlue}` : "4px solid " + T.border }}>
            <div style={{ padding: "18px 22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: c.highlight ? T.deepBlue : T.text, fontFamily: Fn }}>{c.name}</span>
                <Pill T={T}>{c.hq}</Pill>
                <span style={{ fontSize: 12, fontWeight: 600, color: T.textTer, fontFamily: Fn, marginLeft: "auto" }}>~{c.shareGlobal}% global share</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: T.green, fontFamily: Fn, letterSpacing: "0.05em", marginBottom: 6, textTransform: "uppercase" }}>Strengths</div>
                  <div style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.7 }}>{c.strengths}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: T.capRed, fontFamily: Fn, letterSpacing: "0.05em", marginBottom: 6, textTransform: "uppercase" }}>Vulnerabilities</div>
                  <div style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.7 }}>{c.weaknesses}</div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  /* ─── TAB: VALUE CHAIN ─── */
  const roleColors = { own: T.deepBlue, orchestrate: T.orange, support: T.textTer, none: T.pillBg };
  const roleLabels = { own: "Nextpower owns this", orchestrate: "Nextpower orchestrates", support: "Nextpower supports", none: "Not involved" };
  const valueChainTab = (
    <div>
      {prose("The value chain below shows every stage of delivering a solar tracking system — from raw materials to ongoing software optimisation. Understanding where Nextpower participates (and where it deliberately does not) reveals the company's strategic focus: it owns the highest-value intellectual property and software layers while outsourcing capital-intensive manufacturing.")}

      {/* Legend */}
      <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
        {["own", "orchestrate", "support", "none"].map(role => (
          <div key={role} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: roleColors[role], border: role === "none" ? "1px solid " + T.border : "none" }} />
            <span style={{ fontSize: 11, color: T.textSec, fontFamily: Fn }}>{roleLabels[role]}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {valueChainStages.map((v, i) => {
          const c = roleColors[v.nxtRole];
          const isLast = i === valueChainStages.length - 1;
          return (
            <div key={i} style={{ position: "relative" }}>
              {/* Connector line */}
              {!isLast && (
                <div style={{ position: "absolute", left: 20, top: 50, bottom: -12, width: 2, background: T.border, zIndex: 0 }} />
              )}
              <Expandable title={v.stage} subtitle={v.description} T={T}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: c, border: v.nxtRole === "none" ? "1px solid " + T.border : "none" }} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: c, fontFamily: Fn }}>{roleLabels[v.nxtRole]}</span>
                </div>
                {prose(v.nxtNote)}
              </Expandable>
              <div style={{ height: 8 }} />
            </div>
          );
        })}
      </div>

      {/* Summary insight */}
      <div style={{
        padding: "18px 22px", marginTop: 16, borderRadius: T.radius,
        background: T.text === "#0F172A" ? "rgba(29,78,216,0.04)" : "rgba(96,165,250,0.06)",
        border: "1px solid " + T.border,
      }}>
        <div style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75 }}>
          <strong style={{ color: T.deepBlue }}>The strategic insight:</strong> Nextpower concentrates its resources on the two stages with the highest intellectual property value — engineering and design, and software. It outsources the capital-intensive stages (manufacturing, logistics) to partners, and leaves installation to its customers' contractors. This allows the company to earn attractive returns on its invested capital without needing to own factories, trucks, or construction crews.
        </div>
      </div>
    </div>
  );

  /* ─── TAB: MOAT ANALYSIS ─── */
  const moatTab = (
    <div>
      {prose(moatIntro)}
      <div style={{ display: "grid", gap: 12 }}>
        {moats.map((m, i) => <MoatCard key={i} moat={m} T={T} />)}
      </div>

      {/* Reinforcement note */}
      <div style={{
        padding: "18px 22px", marginTop: 24, borderRadius: T.radius,
        background: T.greenBg, border: "1px solid " + T.border,
      }}>
        <div style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75 }}>
          <strong style={{ color: T.green }}>How these advantages reinforce each other:</strong> The software creates switching costs, which keeps customers buying trackers from Nextpower, which grows the installed base, which generates more data to improve the software, which strengthens the switching costs further. Meanwhile, the regulatory advantage in the United States provides a protected home market where Nextpower earns premium returns, which funds the research and development that maintains its technology lead globally. These interlocking advantages are much harder for competitors to overcome than any single advantage would be in isolation.
        </div>
      </div>
    </div>
  );

  const tabContent = {
    "Business Overview": overviewTab,
    "Business Segments": segmentsTab,
    "Products": productsTab,
    "Competitive Position": competitiveTab,
    "Value Chain": valueChainTab,
    "Moat Analysis": moatTab,
  };

  return (
    <div>
      {header}
      <Tabs tabs={allTabs} active={tab} onChange={setTab} T={T} />
      {tabContent[tab]}
    </div>
  );
}
