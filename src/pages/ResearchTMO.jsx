import { useState, useRef, useEffect } from "react";
import { Fn, Fh } from "../theme";
import { Card, Pill } from "../components/shared";
import {
  businessDescription, segmentsProse, segments, endMarkets,
  researchVsProduction, competitors, competitorIntro,
} from "../data/research-tmo";
import {
  tailwindsIntro, tailwinds, tailwindsConnection,
} from "../data/research-tmo-themes";
import {
  setupNarrative, multiples, consensusEvolution, growthEstimates,
  peerComp, peerReturns5Y, peerRankings, underperformance, catalysts,
} from "../data/research-tmo-fin";
import {
  cyclicalIntro, troughSignals, priorCycle, confirmInvalidate,
} from "../data/research-tmo-cyclical";
import {
  productMapIntro, productStack, productMapInsight, peerCoverage,
  valHistory, peerValTable, valInsight,
} from "../data/research-tmo-products";
import OrgMap from "../components/tmo/OrgMap";
import PeerExplorer from "../components/tmo/PeerExplorer";

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
  return (
    <div>
      {label && <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 12 }}>{label}</div>}
      <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ flexShrink: 0 }}>
          {slices.map(s => (<path key={s.i} d={s.path} fill={s.color} stroke={T.card} strokeWidth="2" opacity={hov !== null && hov !== s.i ? 0.4 : 1} style={{ transition: "all 0.2s", cursor: "pointer" }} onMouseEnter={() => setHov(s.i)} onMouseLeave={() => setHov(null)} />))}
          {hov !== null && (<g><text x={cx} y={cy - 6} textAnchor="middle" fontSize="20" fontWeight="700" fill={T.text} fontFamily={Fn}>{data[hov].share}%</text><text x={cx} y={cy + 12} textAnchor="middle" fontSize="10" fill={T.textSec} fontFamily={Fn}>{data[hov].name}</text></g>)}
        </svg>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {data.map((d, i) => (
            <div key={i} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "4px 8px", borderRadius: 6, background: hov === i ? T.pillBg : "transparent", transition: "background 0.15s" }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: d.color, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: hov === i ? T.text : T.textSec, fontFamily: Fn, fontWeight: hov === i ? 600 : 400, transition: "all 0.15s" }}>{d.name} — {d.share}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Expandable({ title, subtitle, children, T, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const innerRef = useRef(null);
  const [maxH, setMaxH] = useState(0);
  useEffect(() => { if (innerRef.current) setMaxH(innerRef.current.scrollHeight); }, [open, children]);
  return (
    <div style={{ background: T.card, borderRadius: T.radius, border: "1px solid " + T.border, overflow: "hidden", transition: "all 0.2s", boxShadow: open ? T.shadowLg : T.shadow }}>
      <div onClick={() => setOpen(!open)} style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn }}>{title}</div>
          {subtitle && <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginTop: 2 }}>{subtitle}</div>}
        </div>
        <span style={{ fontSize: 16, color: T.textTer, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
      </div>
      <div style={{ maxHeight: open ? maxH + 20 : 0, overflow: "hidden", transition: "max-height 0.35s ease" }}>
        <div ref={innerRef} onClick={e => e.stopPropagation()} style={{ padding: "0 20px 20px", cursor: "default" }}>{children}</div>
      </div>
    </div>
  );
}

function Tabs({ tabs, active, onChange, T }) {
  return (
    <div style={{ display: "flex", gap: 4, background: T.pillBg, borderRadius: T.radiusSm, padding: 3, marginBottom: 28, flexWrap: "wrap" }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)} style={{ padding: "10px 14px", borderRadius: 6, border: "none", fontSize: 12, fontFamily: Fn, fontWeight: active === t.id ? 600 : 400, background: active === t.id ? T.card : "transparent", color: active === t.id ? T.text : T.textTer, cursor: "pointer", transition: "all 0.15s", boxShadow: active === t.id ? T.shadow : "none", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 10, fontWeight: 800, color: active === t.id ? T.deepBlue : T.textTer, fontVariantNumeric: "tabular-nums" }}>{t.num}</span>
          {t.label}
        </button>
      ))}
    </div>
  );
}

function HorizBar({ label, value, max, color, T, suffix = "" }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 12, color: T.text, fontFamily: Fn }}>{label}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: color, fontFamily: Fn }}>{value > 0 ? "+" : ""}{value.toFixed(2)}{suffix}</span>
      </div>
      <div style={{ height: 8, borderRadius: 4, background: T.pillBg, overflow: "hidden", position: "relative" }}>
        <div style={{
          height: "100%", borderRadius: 4, background: color,
          width: `${Math.min(100, Math.abs(value) / max * 100)}%`,
          marginLeft: value < 0 ? `${50 - Math.abs(value) / max * 50}%` : "0%",
          transition: "width 0.8s"
        }} />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   PRODUCT MAP — Value-chain driven tab
   The 8-stage diagram is the central control surface; everything
   else (detail panel, peer matrix) updates from the selected stage.
   ════════════════════════════════════════════════════════════════ */
function StrengthDots({ n, color }) {
  return (
    <div style={{ display: "inline-flex", gap: 3 }}>
      {[1,2,3].map(i => (
        <span key={i} style={{
          width: 6, height: 6, borderRadius: "50%",
          background: i <= n ? "#fff" : "rgba(255,255,255,0.28)",
          boxShadow: i <= n ? `0 0 0 1.5px ${color}` : "none",
        }} />
      ))}
    </div>
  );
}

function ProductMapTab({ T, sTitle, prose }) {
  const [selectedStage, setSelectedStage] = useState("5"); // default: Bioproduction, the arms-dealer stage
  const selected = productStack.find(s => s.stage === selectedStage) || productStack[0];

  // Revenue-share to relative tile flex weighting — bigger stages get visibly wider tiles
  const minShare = Math.min(...productStack.map(s => s.revShare));
  const tileFlex = (share) => 1 + (share - minShare) / 6; // gentle scaling

  return (
    <div>
      {prose(productMapIntro)}

      {sTitle("The full stack — click a stage to drive the page")}

      {/* ── THE DIAGRAM ─────────────────────────────────────── */}
      <Card T={T} style={{ padding: "26px 24px", marginBottom: 20, overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.textTer, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase" }}>Drug development & manufacturing value chain</div>
          <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, fontStyle: "italic" }}>Tile width = revenue share · dots = strategic strength</div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "stretch" }}>
          {productStack.map((s) => {
            const active = s.stage === selectedStage;
            return (
              <div
                key={s.stage}
                onClick={() => setSelectedStage(s.stage)}
                style={{
                  flex: `${tileFlex(s.revShare)} 1 110px`,
                  minWidth: 110,
                  cursor: "pointer",
                }}
              >
                <div style={{
                  position: "relative",
                  padding: "14px 12px 12px",
                  background: s.color,
                  borderRadius: 8,
                  color: "#fff",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: active ? "0 6px 20px " + s.color + "55" : T.shadow,
                  transform: active ? "translateY(-3px)" : "none",
                  outline: active ? `2px solid ${s.color}` : "none",
                  outlineOffset: 3,
                  transition: "all 0.2s",
                  opacity: selectedStage && !active ? 0.78 : 1,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <div style={{ fontSize: 10, fontWeight: 800, fontFamily: Fn, opacity: 0.85, letterSpacing: "0.06em" }}>STAGE {s.stage}</div>
                    <StrengthDots n={s.strategicStrength} color={s.color} />
                  </div>
                  <div style={{ fontSize: 12.5, fontWeight: 700, fontFamily: Fn, lineHeight: 1.3, marginBottom: 5 }}>{s.name}</div>
                  <div style={{ fontSize: 10, fontFamily: Fn, opacity: 0.92, lineHeight: 1.4, marginBottom: 8 }}>{s.sub}</div>
                  <div style={{ marginTop: "auto", fontSize: 11, fontWeight: 700, fontFamily: Fn, opacity: 0.96, letterSpacing: "0.02em" }}>~{s.revShare}%</div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* ── DYNAMIC STAGE DETAIL ──────────────────────────── */}
      <Card T={T} style={{ padding: 0, marginBottom: 24, overflow: "hidden", borderLeft: `4px solid ${selected.color}` }}>
        <div style={{ padding: "22px 26px", animation: "fadeIn 0.25s ease" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14, flexWrap: "wrap" }}>
            <div style={{
              width: 44, height: 44, borderRadius: 10, background: selected.color, color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              fontSize: 18, fontWeight: 800, fontFamily: Fn, boxShadow: "0 4px 12px " + selected.color + "55",
            }}>{selected.stage}</div>
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: T.text, fontFamily: Fn, lineHeight: 1.2 }}>{selected.name}</div>
              <div style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, marginTop: 3 }}>{selected.sub}</div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              <Pill T={T} color={selected.color} bg={selected.color + "14"}>{selected.revBucket}</Pill>
              <Pill T={T} color={T.text} bg={T.pillBg}>{selected.strategicRole}</Pill>
            </div>
          </div>

          <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.8, margin: "0 0 18px" }}>{selected.desc}</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            <div>
              <div style={{ fontSize: 9.5, fontWeight: 800, color: selected.color, fontFamily: Fn, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>TMO brands & products</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {selected.products.map((p, pi) => (
                  <div key={pi} style={{ padding: "8px 12px", fontSize: 12, background: selected.color + "10", color: T.text, borderRadius: 4, fontFamily: Fn, borderLeft: `2px solid ${selected.color}` }}>{p}</div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 9.5, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>End customers</div>
              <div style={{ padding: "10px 14px", fontSize: 12, background: T.pillBg, color: T.text, borderRadius: 6, fontFamily: Fn, lineHeight: 1.6 }}>
                {selected.end}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 9.5, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Who else plays here</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {selected.competitors.map((c, ci) => (
                  <div key={ci} style={{ padding: "8px 12px", fontSize: 12, background: T.card, color: T.textSec, borderRadius: 4, fontFamily: Fn, border: `1px solid ${T.border}` }}>{c}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* ── PEER × STAGE COVERAGE MATRIX ──────────────────── */}
      {sTitle("Who plays where — peer coverage across the stack")}
      <Card T={T} style={{ padding: "22px 24px", marginBottom: 24, overflow: "auto" }}>
        <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.6, marginBottom: 16 }}>
          Every row is a peer or competitor. Every column is one of the eight stages above. A filled cell means the peer has a meaningful business in that stage. <strong style={{ color: T.text }}>TMO is the only firm with a presence in all eight</strong> — every other peer covers one to three. Click a stage header above to highlight that column.
        </div>
        <div style={{ minWidth: 720 }}>
          {/* Header row */}
          <div style={{ display: "grid", gridTemplateColumns: "minmax(170px, 1.6fr) repeat(8, minmax(0, 1fr)) minmax(70px, 0.8fr)", gap: 4, marginBottom: 8 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: T.textTer, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase", padding: "6px 8px" }}>Peer</div>
            {productStack.map(s => {
              const isCol = s.stage === selectedStage;
              return (
                <div
                  key={s.stage}
                  onClick={() => setSelectedStage(s.stage)}
                  title={s.name}
                  style={{
                    padding: "6px 4px",
                    textAlign: "center",
                    cursor: "pointer",
                    background: isCol ? s.color + "1F" : "transparent",
                    borderRadius: 4,
                    border: isCol ? `1px solid ${s.color}66` : "1px solid transparent",
                    transition: "all 0.15s",
                  }}
                >
                  <div style={{ fontSize: 9, fontWeight: 800, color: s.color, fontFamily: Fn, letterSpacing: "0.06em" }}>S{s.stage}</div>
                </div>
              );
            })}
            <div style={{ fontSize: 9.5, fontWeight: 700, color: T.textTer, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase", padding: "6px 4px", textAlign: "center" }}>Cov.</div>
          </div>

          {/* Peer rows */}
          {peerCoverage.map((p) => {
            const coverage = p.stages.length;
            return (
              <div key={p.ticker} style={{
                display: "grid",
                gridTemplateColumns: "minmax(170px, 1.6fr) repeat(8, minmax(0, 1fr)) minmax(70px, 0.8fr)",
                gap: 4,
                alignItems: "center",
                padding: "4px 0",
                borderRadius: 4,
                background: p.isHero ? T.pillBg : "transparent",
                marginBottom: 2,
              }}>
                <div style={{ padding: "8px 10px" }}>
                  <div style={{ fontSize: 12, fontWeight: p.isHero ? 800 : 600, color: T.text, fontFamily: Fn, display: "flex", alignItems: "center", gap: 6 }}>
                    {p.peer}
                    {p.isHero && <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 3, background: T.capRed, color: "#fff", letterSpacing: "0.04em", fontWeight: 700 }}>FULL STACK</span>}
                  </div>
                  <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 2 }}>{p.ticker} · {p.note}</div>
                </div>
                {productStack.map(s => {
                  const present = p.stages.includes(parseInt(s.stage, 10));
                  const isCol = s.stage === selectedStage;
                  return (
                    <div
                      key={s.stage}
                      onClick={() => setSelectedStage(s.stage)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "8px 0",
                        cursor: "pointer",
                        background: isCol ? s.color + "10" : "transparent",
                        borderRadius: 4,
                        transition: "all 0.15s",
                      }}
                    >
                      {present ? (
                        <div style={{
                          width: 18, height: 18, borderRadius: "50%",
                          background: s.color,
                          boxShadow: p.isHero ? `0 0 0 2px ${s.color}33` : "none",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "#fff", fontSize: 11, fontWeight: 800, fontFamily: Fn,
                        }}>✓</div>
                      ) : (
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.border }} />
                      )}
                    </div>
                  );
                })}
                <div style={{ textAlign: "center", fontSize: 12, fontFamily: Fn, fontVariantNumeric: "tabular-nums", fontWeight: p.isHero ? 800 : 600, color: p.isHero ? T.capRed : T.textSec }}>
                  {coverage}/8
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* ── ARMS DEALER INSIGHT (always visible) ──────────── */}
      <Card T={T} style={{ padding: "22px 26px", borderLeft: `4px solid ${T.green}`, background: T.greenBg }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: T.green, fontFamily: Fn, letterSpacing: "0.1em", marginBottom: 12, textTransform: "uppercase" }}>The arms dealer angle</div>
        <p style={{ fontSize: 13.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.85, margin: 0 }}>{productMapInsight}</p>
      </Card>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   TL;DR TAB — meeting-ready 4-card summary
   Big italic headline, signature stat, tiny context line.
   ════════════════════════════════════════════════════════════════ */
function BucketBar({ label, share, status, color, T }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(140px, 1.1fr) 64px minmax(0, 3fr) 130px", gap: 12, alignItems: "center", padding: "6px 0" }}>
      <div style={{ fontSize: 12.5, fontWeight: 600, color: T.text, fontFamily: Fn }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 800, color, fontFamily: Fn, fontVariantNumeric: "tabular-nums" }}>{share}%</div>
      <div style={{ height: 8, background: T.pillBg, borderRadius: 4, overflow: "hidden" }}>
        <div style={{ width: share + "%", height: "100%", background: color, borderRadius: 4 }} />
      </div>
      <div style={{ fontSize: 10.5, fontWeight: 700, color, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase", textAlign: "right" }}>{status}</div>
    </div>
  );
}

function TakeawayCard({ num, headline, stat, statColor, statSub, children, footer, T }) {
  return (
    <div style={{
      background: T.card,
      borderRadius: T.radius,
      padding: "32px 36px",
      boxShadow: T.shadow,
      border: "1px solid " + T.border,
      marginBottom: 18,
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "auto minmax(0, 1fr) auto", gap: 28, alignItems: "start", marginBottom: 22 }}>
        <div style={{
          fontFamily: Fh, fontStyle: "italic", fontWeight: 400,
          fontSize: 64, lineHeight: 0.9, color: T.textTer,
          letterSpacing: "-0.04em",
        }}>{num}</div>
        <div style={{ minWidth: 0 }}>
          <div style={{
            fontFamily: Fh, fontStyle: "italic", fontWeight: 400,
            fontSize: 30, lineHeight: 1.15, color: T.text,
            letterSpacing: "-0.02em",
          }}>{headline}</div>
        </div>
        {stat && (
          <div style={{ textAlign: "right", minWidth: 140 }}>
            <div style={{ fontSize: 38, fontWeight: 700, fontFamily: Fn, lineHeight: 1, color: statColor || T.text, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>{stat}</div>
            {statSub && <div style={{ fontSize: 10.5, fontWeight: 700, color: T.textTer, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 6 }}>{statSub}</div>}
          </div>
        )}
      </div>
      {children && (
        <div style={{ marginBottom: 18 }}>{children}</div>
      )}
      {footer && (
        <div style={{ paddingTop: 16, borderTop: "1px solid " + T.border, fontSize: 11.5, color: T.textTer, fontFamily: Fn, lineHeight: 1.65, fontStyle: "italic" }}>{footer}</div>
      )}
    </div>
  );
}

function TldrTab({ T }) {
  // 4 buckets coloured to match the org-map segment palette
  const buckets = [
    { label: "Pharma & Biotech",     share: 57, status: "Accelerating",  color: "#1D4ED8" },
    { label: "Academic & Government", share: 17, status: "Stalled",       color: "#9333EA" },
    { label: "Industrial & Applied",  share: 13, status: "Stable → up",   color: "#059669" },
    { label: "Diagnostics & Health",  share: 13, status: "Flat",          color: "#EA580C" },
  ];

  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8 }}>
        Bottom-up end-market read · 20 May 2026
      </div>
      <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 26, color: T.text, lineHeight: 1.2, marginBottom: 28, letterSpacing: "-0.02em" }}>
        Four things to walk in with.
      </div>

      {/* 01 — Customer health */}
      <TakeawayCard
        num="01"
        headline={<>Customer base is healthier than 6 months ago <span style={{ color: T.textTer }}>— but the recovery is narrow.</span></>}
        stat="57%"
        statColor="#1D4ED8"
        statSub="of mix accelerating"
        footer="~57% of TMO's mix is accelerating, ~13% improving slowly, ~17% stalled, ~13% sideways. Weighted, this is a portfolio inflecting up at the margin — not enough to support a return to the mid-20s P/E unless the bioproduction equipment cycle compounds through 2027."
        T={T}
      >
        <div style={{ display: "grid", gap: 2 }}>
          {buckets.map(b => <BucketBar key={b.label} {...b} T={T} />)}
        </div>
      </TakeawayCard>

      {/* 02 — Bioproduction inflection */}
      <TakeawayCard
        num="02"
        headline={<>Bioproduction inflection is <span style={{ color: "#059669" }}>real and durable.</span></>}
        stat="+30%"
        statColor="#059669"
        statSub="Danaher Q1 equipment orders YoY"
        footer="First quarter of YoY equipment order growth in nearly two years at Danaher (Cytiva). Corroborated by five independent peers — Sartorius BPS +8.1% cc, Merck KGaA Process Solutions +16%, Repligen consumables double-digit, Cytiva high-single-digit. Structural drivers: GLP-1 capacity (Lilly's $27B US footprint, Novo's DKK 55B 2026 capex), ADC pipeline, CGT manufacturing build-out, US reshoring under Section 232."
        T={T}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 8 }}>
          {[
            { name: "Danaher",     val: "+>30% orders",    label: "equipment, first +YoY in ~2y" },
            { name: "Sartorius",   val: "+8.1% cc",        label: "Bioprocess Solutions" },
            { name: "Merck KGaA",  val: "+16% organic",    label: "Process Solutions, first €1B Q since Q1'23" },
            { name: "Repligen",    val: "+50% / +25%",     label: "process analytics / chromatography" },
            { name: "Cytiva (DHR)",val: "double-digit CN", label: "China bioprocessing" },
          ].map(p => (
            <div key={p.name} style={{ padding: "10px 12px", background: "#05966910", border: "1px solid #05966933", borderRadius: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.textTer, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 3 }}>{p.name}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#059669", fontFamily: Fn, lineHeight: 1.15 }}>{p.val}</div>
              <div style={{ fontSize: 10.5, color: T.textSec, fontFamily: Fn, marginTop: 4, lineHeight: 1.4 }}>{p.label}</div>
            </div>
          ))}
        </div>
      </TakeawayCard>

      {/* 03 — Consensus math */}
      <TakeawayCard
        num="03"
        headline={<>Consensus is well-calibrated <span style={{ color: T.textTer }}>— but biased bearish on the right tail.</span></>}
        stat="+3.5–4.5%"
        statColor={T.text}
        statSub="our weighted FY26 organic vs Street 3–4%"
        footer="Bucket-weighted math brackets the Bloomberg/BI consensus almost exactly. The Street H2 step-up is mostly comp + Clario — not a demand inflection at the consolidated level — but it is at the bucket level. Asymmetric upside: if TMO bioproduction compounds at 8–10% in H2'26 / FY27, Street 2027 EPS ($27.26) looks 5–8% too low."
        T={T}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10 }}>
          {[
            { bucket: "Pharma & Biotech",     contrib: "+2.9 to +3.4%", color: "#1D4ED8" },
            { bucket: "Academic & Govt",      contrib: "−0.3 to −0.2%", color: "#9333EA" },
            { bucket: "Industrial & Applied", contrib: "+0.4 to +0.5%", color: "#059669" },
            { bucket: "Diagnostics & Health", contrib: "0.0 to +0.1%",  color: "#EA580C" },
          ].map(c => (
            <div key={c.bucket} style={{ padding: "12px 14px", background: T.pillBg, borderRadius: 8, borderLeft: "3px solid " + c.color }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: T.textTer, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>{c.bucket}</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: T.text, fontFamily: Fn, fontVariantNumeric: "tabular-nums" }}>{c.contrib}</div>
              <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 2 }}>weighted contribution</div>
            </div>
          ))}
        </div>
      </TakeawayCard>

      {/* 04 — Recommendation */}
      <TakeawayCard
        num="04"
        headline={<>Constructive, not deeply convinced. <span style={{ color: T.text }}>Buy on weakness — start at 50%.</span></>}
        stat="50%"
        statColor={T.capRed}
        statSub="initial position of target"
        footer="At $438 / 16.1x FY27E / 14.5x FY28E, TMO is below mid-20s historical. Directional thesis holds; multiple-expansion thesis waits on TMO's own bioproduction disclosure (TMO doesn't break out the order KPI Danaher does)."
        T={T}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          <div style={{ padding: "14px 16px", background: T.greenBg || "#ECFDF5", borderRadius: 8, borderLeft: "3px solid #10B981" }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: "#10B981", fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Add on</div>
            <div style={{ fontSize: 12, color: T.text, fontFamily: Fn, lineHeight: 1.5 }}>Q2 LSS organic ≥ 3% · Q3 confirms bioprod equipment orders · IQVIA TTM book-to-bill &gt; 1.15x</div>
          </div>
          <div style={{ padding: "14px 16px", background: T.redBg || "#FEF2F2", borderRadius: 8, borderLeft: "3px solid " + T.capRed }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: T.capRed, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Trim on</div>
            <div style={{ fontSize: 12, color: T.text, fontFamily: Fn, lineHeight: 1.5 }}>Bioprod consumables decel below 5% · IQVIA NNB &lt; $2.0B/Q · ICR cap legal pathway reopens · MFN capex reversals</div>
          </div>
        </div>
      </TakeawayCard>

      <div style={{ marginTop: 24, padding: "14px 18px", background: T.pillBg, borderRadius: 8, fontSize: 11, color: T.textTer, fontFamily: Fn, lineHeight: 1.65, fontStyle: "italic" }}>
        Source · TMO Q1 2026 (23 Apr), peer reads (DHR, SRT, MRK GR, RGEN, RVTY, A US, IQV, CRL, WAT, BIO, MTD), Bloomberg/BI consensus, J.P. Morgan Q1 biopharma licensing report, NACUBO-Commonfund 2025 endowment study. Internal Cape Capital research, 20 May 2026.
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════ MAIN ════════════════════════════════════════════════════════════════ */
export default function ResearchTMO({ T }) {
  const [tab, setTab] = useState("tldr");

  const tabs = [
    { id: "tldr",     num: "00", label: "TL;DR" },
    { id: "whydown",  num: "01", label: "Why It's Down" },
    { id: "value",    num: "02", label: "Valuation & Entry" },
    { id: "primer",   num: "03", label: "Business Primer" },
    { id: "orgmap",   num: "04", label: "Org Map" },
    { id: "products", num: "05", label: "Product Map" },
    { id: "peers",    num: "06", label: "Competitors" },
    { id: "trough",   num: "07", label: "Cyclical Trough KPIs" },
    { id: "catalysts",num: "08", label: "Near-Term Catalysts" },
    { id: "tailwinds",num: "09", label: "LT Tailwinds" },
  ];

  const prose = (text, s = {}) => <p style={{ fontSize: 13.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.8, margin: "0 0 16px", ...s }}>{text}</p>;
  const sTitle = (t) => <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, marginBottom: 16, letterSpacing: "-0.01em" }}>{t}</div>;

  const heroStats = [
    { value: "$438", label: "Share price (close 18 May 2026)", color: "deepBlue" },
    { value: "16.8x", label: "NTM forward P/E — ~25% below 5Y average", color: "capRed" },
    { value: "14.5x", label: "FY28 P/E on consensus estimates", color: "green" },
    { value: "-25%", label: "Year-to-date 2026 price return", color: "orange" },
    { value: "9-13%", label: "Consensus EPS growth FY26E-FY29E", color: "purple" },
    { value: "20 May", label: "2026 Investor Day — Wednesday this week", color: "deepBlue" },
  ];

  /* ─── HEADER (left rail) ─── */
  const header = (
    <aside style={{ position: "sticky", top: 16, alignSelf: "start" }}>
      <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 24, color: T.text, lineHeight: 1.12, marginBottom: 6 }}>Thermo Fisher Scientific</div>
      <div style={{ fontSize: 11, fontWeight: 700, color: T.textTer, fontFamily: Fn, letterSpacing: "0.06em", marginBottom: 10 }}>TMO US · NYSE · Waltham, MA</div>
      <div style={{ marginBottom: 12 }}>
        <Pill T={T} color={T.deepBlue} bg="rgba(29,78,216,0.08)">PM presentation, May 2026</Pill>
      </div>
      <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 16, lineHeight: 1.5 }}>
        World's largest life sciences tools and services platform · ~$45bn revenue · Eight sections, presentation-ordered.
      </div>
      <div style={{ display: "grid", gap: 6 }}>
        {heroStats.map((s, i) => (
          <div key={i} style={{ background: T.card, borderRadius: T.radiusSm, padding: "8px 10px", border: "1px solid " + T.border }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: T[s.color] || T.text, fontFamily: Fn, lineHeight: 1.1 }}>{s.value}</div>
            <div style={{ fontSize: 9.5, color: T.textTer, fontFamily: Fn, marginTop: 2, lineHeight: 1.35 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </aside>
  );

  /* ═══════════════════════════════════════════ 01 — WHY IT'S DOWN ═══════════════════════════════════════════ */
  const sevColors = { high: T.capRed, "medium-high": T.orange, medium: T.deepBlue, "low-medium": T.textTer, low: T.textTer };
  const whyDownTab = (
    <div>
      <Card T={T} style={{ padding: "22px 26px", marginBottom: 24, borderLeft: `4px solid ${T.capRed}` }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: T.capRed, fontFamily: Fn, letterSpacing: "0.08em", marginBottom: 12, textTransform: "uppercase" }}>One-line summary</div>
        <p style={{ fontSize: 14, color: T.text, fontFamily: Fn, lineHeight: 1.85, margin: 0 }}>{setupNarrative}</p>
      </Card>
      {prose(underperformance.intro)}
      {sTitle("Nine reasons the stock has de-rated — ranked by severity")}
      <div style={{ display: "grid", gap: 10 }}>
        {underperformance.reasons.map((r, i) => (
          <Card key={i} T={T} style={{ padding: 0, overflow: "hidden", borderLeft: `4px solid ${sevColors[r.severity] || T.textSec}` }}>
            <div style={{ padding: "18px 22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: T.textTer, fontFamily: Fn, fontVariantNumeric: "tabular-nums" }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, flex: 1 }}>{r.name}</span>
                <Pill T={T} color={sevColors[r.severity]} bg={(sevColors[r.severity] || T.textSec) + "14"}>{r.severity}</Pill>
              </div>
              <p style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: 0 }}>{r.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  /* ═══════════════════════════════════════════ 02 — VALUATION & ENTRY ═══════════════════════════════════════════ */
  const valueTab = (
    <div>
      {prose("The valuation question has three parts: (1) where does TMO trade versus its own history, (2) where does it trade versus peers, and (3) are the consensus estimates that underpin those multiples credible. The framing mirrors the work we did on Canadian National — a high-quality cyclical compounder where the multiple has compressed during a cycle trough but consensus EPS estimates have held remarkably stable.")}

      {sTitle("Peer explorer — pick a metric, drive the whole chart")}
      <PeerExplorer T={T} />

      {sTitle("Valuation versus own 5-year history")}
      <Card T={T} style={{ padding: 0, overflow: "hidden", marginBottom: 24 }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: Fn, fontSize: 12 }}>
            <thead><tr style={{ borderBottom: "2px solid " + T.border, background: T.pillBg }}>
              {["Metric", "Current", "5Y avg", "5Y low", "5Y high", "vs avg"].map(h =>
                <th key={h} style={{ padding: "12px 14px", textAlign: h === "Metric" ? "left" : "right", fontWeight: 600, color: T.text, fontSize: 11 }}>{h}</th>
              )}
            </tr></thead>
            <tbody>{valHistory.map((v, i) => (
              <tr key={i} style={{ borderBottom: "1px solid " + T.border }}>
                <td style={{ padding: "10px 14px", fontWeight: 500, color: T.text }}>{v.metric}</td>
                <td style={{ padding: "10px 14px", textAlign: "right", fontWeight: 700, color: T.deepBlue }}>{v.current}</td>
                <td style={{ padding: "10px 14px", textAlign: "right", color: T.textSec }}>{v.avg5y}</td>
                <td style={{ padding: "10px 14px", textAlign: "right", color: T.textTer, fontSize: 11 }}>{v.low5y}</td>
                <td style={{ padding: "10px 14px", textAlign: "right", color: T.textTer, fontSize: 11 }}>{v.high5y}</td>
                <td style={{ padding: "10px 14px", textAlign: "right", fontWeight: 700, color: T.green }}>{v.vsAvg}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <div style={{ padding: "10px 16px", background: T.pillBg, fontSize: 11, color: T.textTer, fontFamily: Fn, fontStyle: "italic" }}>Source: Bloomberg consensus, 18 May 2026. Every metric ~10-33% below the 5-year average. The de-rating is broad, not concentrated in one multiple.</div>
      </Card>

      {sTitle("Peer valuation table — the Canadian National read-across")}
      <Card T={T} style={{ padding: 0, overflow: "hidden", marginBottom: 16 }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: Fn, fontSize: 12 }}>
            <thead><tr style={{ borderBottom: "2px solid " + T.border, background: T.pillBg }}>
              {["Peer", "Ticker", "Fwd P/E", "FY27 P/E", "EV/EBITDA", "EV/Rev", "Growth", "Op margin", "FCF yield"].map(h =>
                <th key={h} style={{ padding: "12px 12px", textAlign: h === "Peer" || h === "Ticker" ? "left" : "right", fontWeight: 600, color: T.text, fontSize: 11 }}>{h}</th>
              )}
            </tr></thead>
            <tbody>{peerValTable.map((p, i) => (
              <tr key={i} style={{ borderBottom: "1px solid " + T.border, background: p.ticker === "TMO US" ? T.greenBg : "transparent" }}>
                <td style={{ padding: "10px 12px", fontWeight: p.ticker === "TMO US" ? 700 : 500, color: p.ticker === "TMO US" ? T.green : T.text }}>{p.peer}</td>
                <td style={{ padding: "10px 12px", color: T.textTer, fontSize: 11 }}>{p.ticker}</td>
                <td style={{ padding: "10px 12px", textAlign: "right", fontWeight: 700, color: T.text }}>{p.fwdPE}</td>
                <td style={{ padding: "10px 12px", textAlign: "right", color: T.textSec }}>{p.fy27PE}</td>
                <td style={{ padding: "10px 12px", textAlign: "right", color: T.textSec }}>{p.evEbitda}</td>
                <td style={{ padding: "10px 12px", textAlign: "right", color: T.textSec }}>{p.evRev}</td>
                <td style={{ padding: "10px 12px", textAlign: "right", color: T.textSec }}>{p.growth}</td>
                <td style={{ padding: "10px 12px", textAlign: "right", color: T.textSec }}>{p.opMargin}</td>
                <td style={{ padding: "10px 12px", textAlign: "right", color: T.textSec }}>{p.fcfYield}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <div style={{ padding: "10px 16px", background: T.pillBg, fontSize: 11, color: T.textTer, fontFamily: Fn, fontStyle: "italic" }}>Bloomberg consensus, 18 May 2026. TMO row highlighted.</div>
      </Card>
      <div style={{ display: "grid", gap: 8, marginBottom: 28 }}>
        {peerValTable.map((p, i) => (
          <Card key={i} T={T} style={{ padding: "11px 16px", borderLeft: `3px solid ${p.ticker === "TMO US" ? T.green : T.textTer}` }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 2 }}>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: p.ticker === "TMO US" ? T.green : T.text, fontFamily: Fn }}>{p.peer}</span>
              <span style={{ fontSize: 10, color: T.textTer, fontFamily: Fn }}>{p.ticker}</span>
            </div>
            <div style={{ fontSize: 11.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.6 }}>{p.note}</div>
          </Card>
        ))}
      </div>

      {sTitle("Multiples versus 5-year averages — visual")}
      <Card T={T} style={{ padding: 24, marginBottom: 24 }}>
        {multiples.current.map((m, i) => {
          const discount = ((m.hist - m.value) / m.hist) * 100;
          return (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 12, fontWeight: 500, color: T.text, fontFamily: Fn }}>{m.multiple}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: T[m.color] || T.text, fontFamily: Fn }}>{typeof m.value === "number" ? m.value.toFixed(2) : m.value}x <span style={{ fontWeight: 400, color: T.textTer }}>vs hist {m.hist}x ({discount > 0 ? "-" : "+"}{Math.abs(discount).toFixed(0)}%)</span></span>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{ flex: 1, height: 8, borderRadius: 4, background: T.pillBg, overflow: "hidden", position: "relative" }}>
                  <div style={{ height: "100%", borderRadius: 4, background: T[m.color] || T.deepBlue, width: `${(m.value / m.hist) * 100}%`, transition: "width 0.8s" }} />
                  <div style={{ position: "absolute", top: -3, left: "100%", marginLeft: -1, width: 2, height: 14, background: T.textTer }} />
                </div>
              </div>
            </div>
          );
        })}
      </Card>

      {sTitle("Are the consensus numbers credible?")}
      {prose(consensusEvolution.intro)}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginBottom: 20 }}>
        {consensusEvolution.current.map((c, i) => (
          <Card key={i} T={T} style={{ padding: 20 }}>
            <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginBottom: 4 }}>{c.period}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: T.deepBlue, fontFamily: Fn, marginBottom: 8 }}>{c.value}</div>
            <div style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.6 }}>{c.note}</div>
          </Card>
        ))}
      </div>
      <Card T={T} style={{ padding: 22, marginBottom: 24 }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: Fn, fontSize: 12 }}>
            <thead><tr style={{ borderBottom: "2px solid " + T.border }}>
              {["Metric", "FY25A", "FY26E", "FY27E", "FY28E", "FY29E"].map(h => <th key={h} style={{ padding: "10px 14px", textAlign: h === "Metric" ? "left" : "right", fontWeight: 600, color: T.text, fontSize: 11 }}>{h}</th>)}
            </tr></thead>
            <tbody>{growthEstimates.map((g, i) => (
              <tr key={i} style={{ borderBottom: "1px solid " + T.border }}>
                <td style={{ padding: "10px 14px", fontWeight: 500, color: T.text }}>{g.metric}</td>
                <td style={{ padding: "10px 14px", textAlign: "right", color: T.textSec }}>{g.fy25.toFixed(1)}%</td>
                <td style={{ padding: "10px 14px", textAlign: "right", fontWeight: 600, color: T.text }}>{g.fy26.toFixed(1)}%</td>
                <td style={{ padding: "10px 14px", textAlign: "right", color: T.textSec }}>{g.fy27.toFixed(1)}%</td>
                <td style={{ padding: "10px 14px", textAlign: "right", color: T.textSec }}>{g.fy28.toFixed(1)}%</td>
                <td style={{ padding: "10px 14px", textAlign: "right", fontWeight: 600, color: T.green }}>{g.fy29.toFixed(1)}%</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <div style={{ fontSize: 11, color: T.textTer, fontFamily: Fn, marginTop: 12, fontStyle: "italic" }}>Bloomberg consensus growth estimates. EPS growth reaccelerates from 4.6% (FY25A) to 12.6% (FY29E) — the consensus already prices in the inflection.</div>
      </Card>

      <Card T={T} style={{ padding: "20px 24px", borderLeft: `4px solid ${T.green}`, background: T.greenBg }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: T.green, fontFamily: Fn, letterSpacing: "0.1em", marginBottom: 12, textTransform: "uppercase" }}>Is it overdone? Is this a good entry point?</div>
        <p style={{ fontSize: 13.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.85, margin: "0 0 12px" }}>{multiples.insight}</p>
        <p style={{ fontSize: 13.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.85, margin: 0 }}>{valInsight}</p>
      </Card>
    </div>
  );

  /* ═══════════════════════════════════════════ 03 — BUSINESS PRIMER ═══════════════════════════════════════════ */
  const primerTab = (
    <div>
      {sTitle("What does Thermo Fisher Scientific actually do?")}
      {businessDescription.slice(0, 3).map((p, i) => <div key={i}>{prose(p)}</div>)}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginBottom: 28 }}>
        <Card T={T} style={{ padding: 24 }}>
          <PieChart data={segments.map(s => ({ name: s.name, share: s.share, color: s.color }))} T={T} label="Revenue by segment (FY2025)" size={200} />
        </Card>
        <Card T={T} style={{ padding: 24 }}>
          <PieChart data={endMarkets.map(e => ({ name: e.name, share: e.share, color: e.color }))} T={T} label="Revenue by end-market (FY2025)" size={200} />
        </Card>
      </div>

      {businessDescription.slice(3).map((p, i) => <div key={`tail-${i}`}>{prose(p)}</div>)}

      {sTitle("The four reporting segments")}
      {prose(segmentsProse)}
      {segments.map((s, i) => (
        <div key={i} style={{ marginBottom: 14 }}>
          <Card T={T} style={{ padding: 0, overflow: "hidden", borderLeft: `4px solid ${s.color}` }}>
            <div style={{ padding: "18px 22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: Fn, flex: 1 }}>{s.name}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: s.color, fontFamily: Fn }}>~{s.share}% of revenue</span>
              </div>
              <p style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: "0 0 12px" }}>{s.description}</p>
              <Expandable title="Growth dynamics" T={T}>{prose(s.growthNote)}</Expandable>
              <div style={{ height: 6 }} />
              <Expandable title="Cost structure" T={T}>{prose(s.costNote)}</Expandable>
            </div>
          </Card>
        </div>
      ))}

      {sTitle("Research vs production — the strategic framing")}
      {prose(researchVsProduction.intro)}
      <Card T={T} style={{ padding: 28, marginBottom: 20 }}>
        <PieChart data={researchVsProduction.buckets.map(b => ({ name: b.name, share: b.share, color: b.color }))} T={T} label="Revenue split — research vs production framing" size={220} />
      </Card>
      <div style={{ display: "grid", gap: 10, marginBottom: 20 }}>
        {researchVsProduction.buckets.map((b, i) => (
          <Card key={i} T={T} style={{ padding: "16px 20px", borderLeft: `4px solid ${b.color}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, flex: 1 }}>{b.name}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: b.color, fontFamily: Fn }}>~{b.share}%</span>
            </div>
            <p style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, margin: 0 }}>{b.detail}</p>
          </Card>
        ))}
      </div>
      <Card T={T} style={{ padding: "18px 22px", borderLeft: `4px solid ${T.green}`, background: T.greenBg }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: T.green, fontFamily: Fn, letterSpacing: "0.08em", marginBottom: 8, textTransform: "uppercase" }}>The strategic insight</div>
        <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: 0 }}>{researchVsProduction.insight}</p>
      </Card>
    </div>
  );

  /* ═══════════════════════════════════════════ 04 — PRODUCT MAP ═══════════════════════════════════════════ */
  const productMapTab = <ProductMapTab T={T} sTitle={sTitle} prose={prose} />;

  /* ═══════════════════════════════════════════ 05 — COMPETITORS ═══════════════════════════════════════════ */
  const compTab = (
    <div>
      {prose(competitorIntro)}

      {sTitle("Six-way peer comparison snapshot")}
      <Card T={T} style={{ padding: 0, overflow: "hidden", marginBottom: 24 }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: Fn, fontSize: 12 }}>
            <thead><tr style={{ borderBottom: "2px solid " + T.border, background: T.pillBg }}>
              {["Peer", "Ticker", "Fwd P/E", "EV/EBITDA", "Growth", "Op margin", "FCF"].map(h => <th key={h} style={{ padding: "12px 14px", textAlign: h === "Peer" || h === "Ticker" ? "left" : "right", fontWeight: 600, color: T.text, fontSize: 11 }}>{h}</th>)}
            </tr></thead>
            <tbody>{peerComp.map((p, i) => (
              <tr key={i} style={{ borderBottom: "1px solid " + T.border, background: p.ticker === "TMO US" ? T.greenBg : "transparent" }}>
                <td style={{ padding: "10px 14px", fontWeight: p.ticker === "TMO US" ? 700 : 500, color: p.ticker === "TMO US" ? T.green : T.text }}>{p.name}</td>
                <td style={{ padding: "10px 14px", color: T.textTer, fontSize: 11 }}>{p.ticker}</td>
                <td style={{ padding: "10px 14px", textAlign: "right", fontWeight: 600, color: T.text }}>{p.pe.toFixed(1)}x</td>
                <td style={{ padding: "10px 14px", textAlign: "right", color: T.textSec }}>{p.evEbitda.toFixed(1)}x</td>
                <td style={{ padding: "10px 14px", textAlign: "right", color: T.textSec }}>{p.growth}</td>
                <td style={{ padding: "10px 14px", textAlign: "right", color: T.textSec }}>{p.margin}%</td>
                <td style={{ padding: "10px 14px", textAlign: "right", color: T.textSec }}>{p.fcf}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </Card>

      <div style={{ display: "grid", gap: 8, marginBottom: 28 }}>
        {peerComp.map((p, i) => (
          <Card key={i} T={T} style={{ padding: "12px 16px", borderLeft: `3px solid ${p.color}` }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: p.color, fontFamily: Fn }}>{p.name}</span>
              <span style={{ fontSize: 11, color: T.textTer, fontFamily: Fn }}>{p.ticker}</span>
            </div>
            <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.6 }}>{p.note}</div>
          </Card>
        ))}
      </div>

      {sTitle("Five-year total return (USD)")}
      <Card T={T} style={{ padding: 24, marginBottom: 24 }}>
        <p style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 16px" }}>{peerReturns5Y.intro}</p>
        {peerReturns5Y.data.map((d, i) => (
          <HorizBar key={i} label={`${d.name} (${d.ticker})`} value={d.value} max={55} color={d.color} T={T} suffix="%" />
        ))}
        <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, marginTop: 8, fontStyle: "italic" }}>Bloomberg total return, 18 May 2021 to 15 May 2026, all in USD</div>
      </Card>

      {sTitle("Segment-by-segment competitor mapping")}
      {prose("Different competitors mirror different sub-businesses. No single peer mirrors TMO at the corporate level. Each card below covers one peer's strengths versus TMO and where the comparison breaks down.")}
      <div style={{ display: "grid", gap: 10, marginBottom: 28 }}>
        {competitors.map((c, i) => (
          <Expandable
            key={i}
            title={c.name}
            subtitle={c.hq ? `HQ: ${c.hq}` : undefined}
            T={T}
          >
            <div style={{ display: "grid", gap: 12 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 800, color: T.green, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Where they compete with TMO</div>
                <p style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: 0 }}>{c.strengths}</p>
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 800, color: T.capRed, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Where the comparison breaks</div>
                <p style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: 0 }}>{c.weaknesses}</p>
              </div>
            </div>
          </Expandable>
        ))}
      </div>

      {sTitle("Attribute-by-attribute peer ranking")}
      <p style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 16px" }}>{peerRankings.intro}</p>
      <div style={{ display: "grid", gap: 10, marginBottom: 24 }}>
        {peerRankings.attributes.map((a, i) => (
          <Expandable key={i} title={a.name} subtitle={`Winner: ${a.ranking[0]}`} T={T}>
            <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
              {a.ranking.map((name, idx) => (
                <Pill key={idx} T={T} color={idx === 0 ? T.green : T.textTer} bg={idx === 0 ? T.greenBg : T.pillBg}>{idx + 1}. {name}</Pill>
              ))}
            </div>
            <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7 }}>{a.note}</div>
          </Expandable>
        ))}
      </div>

      {sTitle("Composite peer ranking")}
      <p style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, margin: "0 0 16px" }}>{peerRankings.composite.intro}</p>
      <div style={{ display: "grid", gap: 10 }}>
        {peerRankings.composite.ranking.map((r, i) => (
          <Card key={i} T={T} style={{ padding: "14px 18px", borderLeft: `4px solid ${i === 0 ? T.green : i === 1 ? T.deepBlue : i === 2 ? T.orange : T.textTer}` }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 4 }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: i === 0 ? T.green : i === 1 ? T.deepBlue : i === 2 ? T.orange : T.textTer, fontFamily: Fn }}>#{r.rank}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn }}>{r.name}</span>
            </div>
            <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7 }}>{r.note}</div>
          </Card>
        ))}
      </div>
    </div>
  );

  /* ═══════════════════════════════════════════ 06 — CYCLICAL TROUGH KPIs ═══════════════════════════════════════════ */
  const dirColors = { up: T.green, "stable-up": T.green, stable: T.orange, down: T.capRed };
  const impColors = { high: T.green, "medium-high": T.deepBlue, medium: T.orange };
  const troughTab = (
    <div>
      {prose(cyclicalIntro)}

      {sTitle("Trough indicators — ranked by importance")}
      <div style={{ display: "grid", gap: 10, marginBottom: 28 }}>
        {troughSignals.map((s, i) => (
          <Card key={i} T={T} style={{ padding: 0, overflow: "hidden", borderLeft: `4px solid ${impColors[s.importance] || T.textTer}` }}>
            <div style={{ padding: "18px 22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: T.textTer, fontFamily: Fn, fontVariantNumeric: "tabular-nums" }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, flex: 1, minWidth: 200 }}>{s.name}</span>
                <Pill T={T} color={dirColors[s.direction]} bg={(dirColors[s.direction] || T.textTer) + "14"}>{s.metric} · {s.period}</Pill>
                <Pill T={T} color={impColors[s.importance]} bg={(impColors[s.importance] || T.textTer) + "14"}>{s.importance}</Pill>
              </div>
              <p style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: 0 }}>{s.detail}</p>
            </div>
          </Card>
        ))}
      </div>

      {sTitle("Historical context — how long do destocking cycles last?")}
      {prose(priorCycle.intro)}
      <Card T={T} style={{ padding: 0, overflow: "hidden", marginBottom: 28 }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: Fn, fontSize: 12 }}>
            <thead><tr style={{ borderBottom: "2px solid " + T.border, background: T.pillBg }}>
              {["Cycle", "Length", "Trigger", "Recovery profile"].map(h => <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontWeight: 600, color: T.text, fontSize: 11 }}>{h}</th>)}
            </tr></thead>
            <tbody>{priorCycle.cycles.map((c, i) => (
              <tr key={i} style={{ borderBottom: "1px solid " + T.border, background: i === priorCycle.cycles.length - 1 ? T.greenBg : "transparent" }}>
                <td style={{ padding: "10px 14px", fontWeight: i === priorCycle.cycles.length - 1 ? 700 : 500, color: T.text }}>{c.period}</td>
                <td style={{ padding: "10px 14px", fontWeight: 600, color: i === priorCycle.cycles.length - 1 ? T.green : T.text }}>{c.length}</td>
                <td style={{ padding: "10px 14px", color: T.textSec }}>{c.trigger}</td>
                <td style={{ padding: "10px 14px", color: T.textSec }}>{c.recovery}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </Card>

      {sTitle("What would confirm versus invalidate the trough thesis")}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
        <Card T={T} style={{ padding: "18px 20px", borderTop: `4px solid ${T.green}`, background: T.greenBg }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: T.green, fontFamily: Fn, letterSpacing: "0.1em", marginBottom: 12, textTransform: "uppercase" }}>Confirms trough</div>
          <ul style={{ paddingLeft: 18, margin: 0 }}>
            {confirmInvalidate.confirm.map((c, i) => (<li key={i} style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, marginBottom: 6 }}>{c}</li>))}
          </ul>
        </Card>
        <Card T={T} style={{ padding: "18px 20px", borderTop: `4px solid ${T.capRed}`, background: T.redBg }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: T.capRed, fontFamily: Fn, letterSpacing: "0.1em", marginBottom: 12, textTransform: "uppercase" }}>Invalidates trough</div>
          <ul style={{ paddingLeft: 18, margin: 0 }}>
            {confirmInvalidate.invalidate.map((c, i) => (<li key={i} style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, marginBottom: 6 }}>{c}</li>))}
          </ul>
        </Card>
      </div>
    </div>
  );

  /* ═══════════════════════════════════════════ 07 — CATALYSTS ═══════════════════════════════════════════ */
  const impactColors = { high: T.capRed, medium: T.orange, low: T.textTer };
  const catalystsTab = (
    <div>
      {prose("Upcoming catalysts in date order. The Investor Day on Wednesday 20 May 2026 and the Q2 print in late July are the binary moments for the re-rating thesis. Beyond those, the next 12 months offer four further large catalysts.")}
      <div style={{ display: "grid", gap: 10 }}>
        {catalysts.map((c, i) => (
          <Card key={i} T={T} style={{ padding: 0, overflow: "hidden", borderLeft: `4px solid ${impactColors[c.impact] || T.textSec}` }}>
            <div style={{ padding: "18px 22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: impactColors[c.impact] || T.textSec, fontFamily: Fn }}>{c.date}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: Fn, flex: 1, minWidth: 200 }}>{c.name}</span>
                <Pill T={T}>{c.type}</Pill>
                <Pill T={T} color={impactColors[c.impact]} bg={(impactColors[c.impact] || T.textSec) + "14"}>{c.impact} impact</Pill>
              </div>
              <p style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: 0 }}>{c.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  /* ═══════════════════════════════════════════ 08 — LT TAILWINDS ═══════════════════════════════════════════ */
  const tailwindsTab = (
    <div>
      {prose(tailwindsIntro)}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14, marginBottom: 30 }}>
        {tailwinds.map((tw, twIdx) => {
          const accent = T[tw.colorKey];
          const accentBg = tw.colorKey === "green" ? T.greenBg : tw.colorKey === "deepBlue" ? "rgba(29,78,216,0.08)" : "rgba(234,88,12,0.08)";
          return (
            <div key={twIdx} style={{ background: accentBg, borderRadius: T.radius, padding: "22px 24px", borderLeft: `5px solid ${accent}`, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", right: 14, top: 6, fontSize: 70, fontWeight: 900, color: accent, opacity: 0.15, fontFamily: Fn, lineHeight: 1 }}>0{tw.number}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: accent, fontFamily: Fn, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10, position: "relative", zIndex: 1 }}>Tailwind {tw.number}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: T.text, fontFamily: Fn, lineHeight: 1.3, marginBottom: 12, position: "relative", zIndex: 1 }}>{tw.name}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: accent, fontFamily: Fn, marginBottom: 4, position: "relative", zIndex: 1 }}>{tw.heroStat.value}</div>
              <div style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.5, position: "relative", zIndex: 1 }}>{tw.heroStat.label}</div>
            </div>
          );
        })}
      </div>

      {tailwinds.map((tw, twIdx) => {
        const accent = T[tw.colorKey];
        const accentBg = tw.colorKey === "green" ? T.greenBg : tw.colorKey === "deepBlue" ? "rgba(29,78,216,0.08)" : "rgba(234,88,12,0.08)";
        return (
          <div key={twIdx} style={{ marginBottom: 36 }}>
            <div style={{ background: accentBg, borderRadius: T.radius, padding: "22px 26px", marginBottom: 18, borderLeft: `5px solid ${accent}` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: accent, fontFamily: Fn, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Tailwind {tw.number}</div>
              <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 26, color: T.text, marginBottom: 8, lineHeight: 1.2 }}>{tw.name}</div>
              <div style={{ fontSize: 13.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.7 }}>{tw.tagline}</div>
            </div>

            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: accent, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>The structural shift</div>
              <p style={{ fontSize: 13.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.8, margin: 0 }}>{tw.structuralShift}</p>
            </div>

            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: accent, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>How Thermo Fisher plays it</div>
              <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, margin: "0 0 14px" }}>{tw.tmoPlaysIt.summary}</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
                {tw.tmoPlaysIt.products.map((p, pi) => (
                  <Card key={pi} T={T} style={{ padding: 16, borderTop: `3px solid ${accent}` }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: T.text, fontFamily: Fn, marginBottom: 8, lineHeight: 1.3 }}>{p.name}</div>
                    <p style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.65, margin: "0 0 10px" }}>{p.desc}</p>
                    <div style={{ display: "inline-block", padding: "4px 9px", background: accentBg, borderRadius: 4, fontSize: 10, fontWeight: 700, color: accent, fontFamily: Fn, letterSpacing: "0.05em" }}>{p.economics}</div>
                  </Card>
                ))}
              </div>
            </div>

            <Card T={T} style={{ padding: "18px 22px", borderLeft: `4px solid ${accent}`, background: accentBg }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: accent, fontFamily: Fn, letterSpacing: "0.08em", marginBottom: 10, textTransform: "uppercase" }}>PM talking points</div>
              <div style={{ display: "grid", gap: 8 }}>
                {tw.talkingPoints.map((tp, tpi) => (
                  <div key={tpi} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px", background: T.card, borderRadius: T.radiusSm, border: "1px solid " + T.border }}>
                    <div style={{ flexShrink: 0, width: 20, height: 20, borderRadius: 10, background: accent, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, fontFamily: Fn }}>{tpi + 1}</div>
                    <p style={{ fontSize: 12.5, color: T.text, fontFamily: Fn, lineHeight: 1.6, margin: 0 }}>{tp}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        );
      })}

      <Card T={T} style={{ padding: "22px 26px", borderTop: `4px solid ${T.deepBlue}`, background: "rgba(29,78,216,0.04)" }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: T.deepBlue, fontFamily: Fn, letterSpacing: "0.1em", marginBottom: 12, textTransform: "uppercase" }}>Why these three together</div>
        <p style={{ fontSize: 13.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.85, margin: 0 }}>{tailwindsConnection}</p>
      </Card>
    </div>
  );

  /* ═══════════════════════════════════════════ ROUTING ═══════════════════════════════════════════ */
  const content = {
    tldr: <TldrTab T={T} />,
    whydown: whyDownTab,
    value: valueTab,
    primer: primerTab,
    orgmap: <OrgMap T={T} />,
    products: productMapTab,
    peers: compTab,
    trough: troughTab,
    catalysts: catalystsTab,
    tailwinds: tailwindsTab,
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "200px minmax(0, 1fr)", gap: 28, alignItems: "start" }}>
      {header}
      <main style={{ minWidth: 0 }}>
        <Tabs tabs={tabs} active={tab} onChange={setTab} T={T} />
        {content[tab]}
      </main>
    </div>
  );
}
