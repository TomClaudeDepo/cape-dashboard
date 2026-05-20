import { useState } from "react";
import { Fn, Fh } from "../../theme";
import { Card, Pill } from "../shared";
import {
  endMarketsIntro, endMarketsTldr,
  bucketScorecard, buckets,
  synthesisMath, synthesisTotal,
  wrongUpside, wrongDownside, wrongSymmetric,
  bioprodDurability,
  recHeadline, recRationale, recActions,
  upsideBenchmarks, pairTrades,
  caveats,
} from "../../data/research-tmo-endmarkets";

/* ════════════════════════════════════════════════
   Helpers — small visual atoms
   ════════════════════════════════════════════════ */
function MomentumDot({ momentum }) {
  const map = {
    "Accelerating":            { color: "#059669", n: 3 },
    "Stable → Accelerating":   { color: "#10B981", n: 2 },
    "Stable":                  { color: "#94A3B8", n: 2 },
    "Decelerating":            { color: "#EF4444", n: 1 },
  };
  const s = map[momentum] || { color: "#94A3B8", n: 2 };
  return (
    <span style={{ display: "inline-flex", gap: 3, verticalAlign: "middle" }}>
      {[1,2,3].map(i => (
        <span key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: i <= s.n ? s.color : "transparent", border: `1.5px solid ${s.color}` }} />
      ))}
    </span>
  );
}

function PeerChip({ p, T }) {
  const tone = p.color === "positive" ? "#059669" : p.color === "negative" ? "#EF4444" : T.textSec;
  const bg = p.color === "positive" ? "#ECFDF5" : p.color === "negative" ? "#FEF2F2" : T.pillBg;
  return (
    <div style={{ padding: "10px 12px", background: bg, border: `1px solid ${tone}33`, borderRadius: 8, minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: T.text, fontFamily: Fn }}>{p.peer}</span>
        <span style={{ fontSize: 9.5, color: T.textTer, fontFamily: Fn, fontWeight: 600 }}>{p.ticker}</span>
      </div>
      <div style={{ fontSize: 12.5, fontWeight: 700, color: tone, fontFamily: Fn, fontVariantNumeric: "tabular-nums", marginBottom: 4 }}>{p.signal}</div>
      <div style={{ fontSize: 10.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.45 }}>{p.detail}</div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   Bucket selector — 4 large clickable summary cards
   ════════════════════════════════════════════════ */
function BucketSelector({ selectedId, onSelect, T }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 20 }}>
      {bucketScorecard.map(b => {
        const active = b.id === selectedId;
        return (
          <div
            key={b.id}
            onClick={() => onSelect(b.id)}
            style={{
              padding: "14px 16px",
              background: active ? b.color : T.card,
              border: `1px solid ${active ? b.color : T.border}`,
              borderTop: `4px solid ${b.color}`,
              borderRadius: 8,
              cursor: "pointer",
              boxShadow: active ? `0 6px 20px ${b.color}40` : T.shadow,
              transform: active ? "translateY(-2px)" : "none",
              transition: "all 0.2s",
              color: active ? "#fff" : T.text,
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 6 }}>
              <div style={{ fontSize: 10.5, fontWeight: 800, fontFamily: Fn, letterSpacing: "0.08em", textTransform: "uppercase", opacity: active ? 0.85 : 0.6 }}>
                {b.weight}% of mix
              </div>
              <MomentumDot momentum={b.demand} />
            </div>
            <div style={{ fontSize: 13.5, fontWeight: 700, fontFamily: Fn, lineHeight: 1.25, marginBottom: 6 }}>{b.name}</div>
            <div style={{ fontSize: 10.5, fontFamily: Fn, opacity: active ? 0.92 : 0.7, lineHeight: 1.4 }}>{b.demand} · {b.outlook}</div>
          </div>
        );
      })}
    </div>
  );
}

/* ════════════════════════════════════════════════
   Bucket detail panel — driven by selection
   ════════════════════════════════════════════════ */
function BucketDetail({ bucket, T }) {
  const b = bucket;
  return (
    <Card T={T} style={{ padding: 0, marginBottom: 28, overflow: "hidden", borderTop: `4px solid ${b.color}` }}>
      <div style={{ padding: "26px 28px" }}>
        {/* Heading */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
          <Pill T={T} color={b.color} bg={b.color + "14"}>{b.weight}% of mix</Pill>
          <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 28, color: T.text, letterSpacing: "-0.01em" }}>{b.name}</div>
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, color: b.color, fontFamily: Fn, marginBottom: 22, lineHeight: 1.4 }}>{b.headline}</div>

        {/* What TMO sells */}
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>What TMO sells into this bucket</div>
          <div style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75 }}>{b.whatTMOSells}</div>
        </div>

        {/* Q1 read */}
        <div style={{ marginBottom: 22, padding: "16px 18px", background: T.pillBg, borderRadius: 8, borderLeft: `3px solid ${b.color}` }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: b.color, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Q1 2026 — what TMO told us</div>
          <div style={{ fontSize: 13, color: T.text, fontFamily: Fn, lineHeight: 1.75 }}>{b.q1Read}</div>
        </div>

        {/* Peer cross-check */}
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Peer cross-check — Q1 2026</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 8 }}>
            {b.peerCheck.map(p => <PeerChip key={p.peer} p={p} T={T} />)}
          </div>
        </div>

        {/* Leading indicators */}
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Leading indicators</div>
          <div style={{ display: "grid", gap: 8 }}>
            {b.leadingIndicators.map((li, i) => (
              <div key={i} style={{ padding: "14px 16px", border: `1px solid ${T.border}`, borderRadius: 8 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: T.text, fontFamily: Fn, marginBottom: 6 }}>{li.title}</div>
                <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.75 }}>{li.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer capacity */}
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Customer financial capacity</div>
          <div style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75 }}>{b.customerCapacity}</div>
        </div>

        {/* Scorecard */}
        <div style={{ padding: "18px 20px", background: b.color + "0D", border: `1px solid ${b.color}33`, borderRadius: 10 }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: b.color, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Scorecard</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 9.5, fontWeight: 700, color: T.textTer, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>Demand</div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: T.text, fontFamily: Fn, lineHeight: 1.4 }}>{b.scorecard.demand}</div>
            </div>
            <div>
              <div style={{ fontSize: 9.5, fontWeight: 700, color: T.textTer, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>Capacity</div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: T.text, fontFamily: Fn, lineHeight: 1.4 }}>{b.scorecard.capacity}</div>
            </div>
            <div>
              <div style={{ fontSize: 9.5, fontWeight: 700, color: T.textTer, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>Our FY26 organic</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: b.color, fontFamily: Fn, fontVariantNumeric: "tabular-nums" }}>{b.scorecard.fy26}</div>
            </div>
            <div>
              <div style={{ fontSize: 9.5, fontWeight: 700, color: T.textTer, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>Our FY27 organic</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: b.color, fontFamily: Fn, fontVariantNumeric: "tabular-nums" }}>{b.scorecard.fy27}</div>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 9.5, fontWeight: 700, color: T.textTer, fontFamily: Fn, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>Swing factors</div>
            <ul style={{ margin: 0, padding: "0 0 0 18px", fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7 }}>
              {b.scorecard.swing.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ════════════════════════════════════════════════
   Synthesis math table
   ════════════════════════════════════════════════ */
function SynthesisTable({ T }) {
  return (
    <Card T={T} style={{ padding: 0, marginBottom: 24, overflow: "hidden" }}>
      <div style={{ padding: "20px 24px", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 22, color: T.text, marginBottom: 4 }}>Weighted-average organic growth math</div>
        <div style={{ fontSize: 12, color: T.textTer, fontFamily: Fn }}>Bucket scorecard × TMO ~57 / 17 / 13 / 13 mix → FY26 weighted organic</div>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: Fn, fontSize: 12.5 }}>
        <thead>
          <tr style={{ background: T.pillBg }}>
            <th style={{ padding: "10px 16px", textAlign: "left",   fontSize: 10.5, fontWeight: 700, color: T.textTer, letterSpacing: "0.06em", textTransform: "uppercase" }}>Bucket</th>
            <th style={{ padding: "10px 16px", textAlign: "right",  fontSize: 10.5, fontWeight: 700, color: T.textTer, letterSpacing: "0.06em", textTransform: "uppercase" }}>Weight</th>
            <th style={{ padding: "10px 16px", textAlign: "right",  fontSize: 10.5, fontWeight: 700, color: T.textTer, letterSpacing: "0.06em", textTransform: "uppercase" }}>FY26 organic</th>
            <th style={{ padding: "10px 16px", textAlign: "right",  fontSize: 10.5, fontWeight: 700, color: T.textTer, letterSpacing: "0.06em", textTransform: "uppercase" }}>Weighted contribution</th>
          </tr>
        </thead>
        <tbody>
          {synthesisMath.map((r) => (
            <tr key={r.bucket} style={{ borderTop: `1px solid ${T.border}` }}>
              <td style={{ padding: "12px 16px", fontWeight: 600, color: T.text }}>
                <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2, background: r.color, marginRight: 8 }} />
                {r.bucket}
              </td>
              <td style={{ padding: "12px 16px", textAlign: "right", color: T.textSec, fontVariantNumeric: "tabular-nums" }}>{r.weight}%</td>
              <td style={{ padding: "12px 16px", textAlign: "right", color: T.text, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{r.range}</td>
              <td style={{ padding: "12px 16px", textAlign: "right", color: r.contribLow < 0 ? "#EF4444" : "#059669", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
                {(r.contribLow >= 0 ? "+" : "")}{r.contribLow.toFixed(2)}% to {(r.contribHigh >= 0 ? "+" : "")}{r.contribHigh.toFixed(2)}%
              </td>
            </tr>
          ))}
          <tr style={{ borderTop: `2px solid ${T.text}`, background: T.pillBg }}>
            <td style={{ padding: "14px 16px", fontWeight: 800, color: T.text }}>Total weighted</td>
            <td style={{ padding: "14px 16px", textAlign: "right", color: T.textSec, fontWeight: 700 }}>100%</td>
            <td></td>
            <td style={{ padding: "14px 16px", textAlign: "right", color: T.text, fontWeight: 800, fontSize: 14, fontVariantNumeric: "tabular-nums" }}>+{synthesisTotal.lo}% to +{synthesisTotal.hi}%</td>
          </tr>
        </tbody>
      </table>
      <div style={{ padding: "14px 24px", background: T.pillBg, fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, fontStyle: "italic", borderTop: `1px solid ${T.border}` }}>
        Brackets the Bloomberg/BI consensus of {synthesisTotal.street} organic almost exactly. Consensus is well-calibrated on average, but underestimates the right-tail probability — if bioproduction equipment translates Danaher's +30% YoY order growth into TMO revenue 2–3 quarters later, total organic could lift toward +{synthesisTotal.bullCase}%.
      </div>
    </Card>
  );
}

/* ════════════════════════════════════════════════
   Main tab
   ════════════════════════════════════════════════ */
export default function EndMarketsTab({ T, sTitle, prose }) {
  const [bucketId, setBucketId] = useState("pharma");
  const [showCaveats, setShowCaveats] = useState(false);
  const bucket = buckets[bucketId];

  return (
    <div>
      {/* ── Header ─────────────────────────────── */}
      <div style={{ fontSize: 11, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 6 }}>
        End-market health & customer spending capacity
      </div>
      <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 26, color: T.text, lineHeight: 1.2, marginBottom: 8, letterSpacing: "-0.02em" }}>
        A bottom-up bucket-by-bucket read.
      </div>
      <div style={{ fontSize: 12, color: T.textTer, fontFamily: Fn, marginBottom: 22 }}>20 May 2026 · Price $438.34</div>

      {/* TL;DR */}
      <Card T={T} style={{ padding: "20px 24px", marginBottom: 22, borderLeft: `4px solid ${T.deepBlue}`, background: T.deepBlue + "08" }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: T.deepBlue, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>TL;DR</div>
        <ul style={{ margin: 0, padding: "0 0 0 18px", fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.85 }}>
          {endMarketsTldr.map((t, i) => <li key={i} style={{ marginBottom: 6 }}>{t}</li>)}
        </ul>
      </Card>

      {/* Intro */}
      <p style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.8, margin: "0 0 22px", maxWidth: 920 }}>{endMarketsIntro}</p>

      {/* Bucket scorecard (one-page) */}
      {sTitle("Bucket scorecard — one-page summary")}
      <Card T={T} style={{ padding: 0, marginBottom: 28, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: Fn, fontSize: 12 }}>
          <thead>
            <tr style={{ background: T.pillBg }}>
              <th style={{ padding: "12px 16px", textAlign: "left",  fontSize: 10.5, fontWeight: 700, color: T.textTer, letterSpacing: "0.06em", textTransform: "uppercase" }}>End market</th>
              <th style={{ padding: "12px 16px", textAlign: "left",  fontSize: 10.5, fontWeight: 700, color: T.textTer, letterSpacing: "0.06em", textTransform: "uppercase" }}>Demand momentum</th>
              <th style={{ padding: "12px 16px", textAlign: "left",  fontSize: 10.5, fontWeight: 700, color: T.textTer, letterSpacing: "0.06em", textTransform: "uppercase" }}>Spending capacity</th>
              <th style={{ padding: "12px 16px", textAlign: "left",  fontSize: 10.5, fontWeight: 700, color: T.textTer, letterSpacing: "0.06em", textTransform: "uppercase" }}>12–24m outlook</th>
              <th style={{ padding: "12px 16px", textAlign: "left",  fontSize: 10.5, fontWeight: 700, color: T.textTer, letterSpacing: "0.06em", textTransform: "uppercase" }}>vs. 6m ago</th>
            </tr>
          </thead>
          <tbody>
            {bucketScorecard.map((b) => (
              <tr key={b.id} onClick={() => setBucketId(b.id)} style={{ borderTop: `1px solid ${T.border}`, cursor: "pointer", background: bucketId === b.id ? b.color + "0F" : "transparent" }}>
                <td style={{ padding: "12px 16px", color: T.text, fontWeight: 700, borderLeft: `4px solid ${b.color}` }}>
                  {b.name} <span style={{ fontWeight: 500, color: T.textTer }}>({b.weight}%)</span>
                </td>
                <td style={{ padding: "12px 16px", color: T.textSec }}><MomentumDot momentum={b.demand} /> &nbsp; {b.demand}</td>
                <td style={{ padding: "12px 16px", color: T.textSec }}>{b.capacity}</td>
                <td style={{ padding: "12px 16px", color: T.text, fontWeight: 600 }}>{b.outlook}</td>
                <td style={{ padding: "12px 16px", color: b.vs6m.startsWith("Better") || b.vs6m === "Modestly Better" ? "#059669" : b.vs6m === "Marginally Worse" ? "#EF4444" : T.textSec, fontWeight: 600 }}>{b.vs6m}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding: "12px 18px", fontSize: 11, color: T.textTer, fontStyle: "italic", fontFamily: Fn, lineHeight: 1.65, borderTop: `1px solid ${T.border}` }}>
          ~57% of TMO's mix is accelerating, ~13% improving slowly, ~17% remains stalled, ~13% sideways. Click any row to drill into the bucket below.
        </div>
      </Card>

      {/* Bucket selector + detail */}
      {sTitle("Bucket detail — click to switch")}
      <BucketSelector selectedId={bucketId} onSelect={setBucketId} T={T} />
      <BucketDetail bucket={bucket} T={T} />

      {/* Cross-bucket synthesis */}
      {sTitle("Cross-bucket synthesis")}
      <SynthesisTable T={T} />

      {/* Where consensus is wrong */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12, marginBottom: 28 }}>
        <Card T={T} style={{ padding: "18px 20px", borderTop: `3px solid #059669` }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: "#059669", fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Wrong to the upside</div>
          <div style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.7 }}>{wrongUpside}</div>
        </Card>
        <Card T={T} style={{ padding: "18px 20px", borderTop: `3px solid #EF4444` }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: "#EF4444", fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Wrong to the downside</div>
          <div style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.7 }}>{wrongDownside}</div>
        </Card>
        <Card T={T} style={{ padding: "18px 20px", borderTop: `3px solid ${T.textTer}` }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Risk roughly symmetric</div>
          <div style={{ fontSize: 12.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.7 }}>{wrongSymmetric}</div>
        </Card>
      </div>

      {/* Bioproduction durability */}
      {sTitle("Is the bioproduction recovery real and durable?")}
      <Card T={T} style={{ padding: "22px 24px", marginBottom: 28, borderLeft: `4px solid #059669`, background: "#05966908" }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: "#059669", fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Yes — with high conviction, across multiple independent data points</div>
        <div style={{ display: "grid", gap: 12 }}>
          {bioprodDurability.map((d, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "32px minmax(0, 1fr)", gap: 14, alignItems: "start" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#059669", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, fontFamily: Fn, flexShrink: 0 }}>{i+1}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.text, fontFamily: Fn, marginBottom: 4 }}>{d.title}</div>
                <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7 }}>{d.text}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${T.border}`, fontSize: 11.5, color: T.textTer, fontFamily: Fn, lineHeight: 1.65, fontStyle: "italic" }}>
          Risk to the durability call: lumpiness, not direction. Q2/Q3 numbers could disappoint sequentially if equipment revenue recognition is back-half loaded (Sartorius guided H2 &gt; H1). MFN-related capex deferrals are a tail risk, but Section 232's design (100% tariff if you don't build) makes this unlikely in the 12–24m window.
        </div>
      </Card>

      {/* Recommendation */}
      {sTitle("Recommendation")}
      <Card T={T} style={{ padding: "24px 26px", marginBottom: 18, borderTop: `4px solid ${T.capRed}` }}>
        <div style={{ fontFamily: Fh, fontStyle: "italic", fontSize: 22, color: T.text, marginBottom: 10, lineHeight: 1.3 }}>{recHeadline}</div>
        <div style={{ fontSize: 13, color: T.textSec, fontFamily: Fn, lineHeight: 1.75, marginBottom: 18 }}>{recRationale}</div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10, marginBottom: 18 }}>
          {recActions.map((a, i) => (
            <div key={i} style={{ padding: "14px 16px", background: a.color + "10", border: `1px solid ${a.color}33`, borderRadius: 8 }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 6 }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: a.color, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase" }}>{a.stage}</div>
                <div style={{ fontSize: 13, fontWeight: 800, color: a.color, fontFamily: Fn }}>{a.weight}</div>
              </div>
              <div style={{ fontSize: 11.5, color: T.textSec, fontFamily: Fn, lineHeight: 1.6 }}>{a.text}</div>
            </div>
          ))}
        </div>

        <div style={{ paddingTop: 14, borderTop: `1px solid ${T.border}` }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Benchmarks for upside conviction</div>
          <ul style={{ margin: 0, padding: "0 0 0 18px", fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7 }}>
            {upsideBenchmarks.map((u, i) => <li key={i} style={{ marginBottom: 4 }}>{u}</li>)}
          </ul>
        </div>
      </Card>

      {/* Pair trades */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12, marginBottom: 28 }}>
        {pairTrades.map((p, i) => (
          <Card key={i} T={T} style={{ padding: "16px 18px" }}>
            <div style={{ fontSize: 10.5, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Pair-trade idea</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.text, fontFamily: Fn, marginBottom: 6 }}>{p.side}</div>
            <div style={{ fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.7 }}>{p.text}</div>
          </Card>
        ))}
      </div>

      {/* Caveats */}
      <Card T={T} style={{ padding: 0, marginBottom: 12, overflow: "hidden" }}>
        <div onClick={() => setShowCaveats(!showCaveats)} style={{ padding: "16px 20px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", background: showCaveats ? T.pillBg : "transparent", transition: "background 0.15s" }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: T.textTer, fontFamily: Fn, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 }}>Caveats</div>
            <div style={{ fontSize: 13, color: T.text, fontFamily: Fn }}>{caveats.length} important footnotes — known unknowns and analytic limitations</div>
          </div>
          <div style={{ fontSize: 16, color: T.textTer, transform: showCaveats ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>▾</div>
        </div>
        {showCaveats && (
          <div style={{ padding: "0 20px 20px" }}>
            <ol style={{ margin: 0, padding: "0 0 0 22px", fontSize: 12, color: T.textSec, fontFamily: Fn, lineHeight: 1.75 }}>
              {caveats.map((c, i) => <li key={i} style={{ marginBottom: 8 }}>{c}</li>)}
            </ol>
          </div>
        )}
      </Card>

      <div style={{ padding: "14px 18px", background: T.pillBg, borderRadius: 8, fontSize: 11, color: T.textTer, fontFamily: Fn, lineHeight: 1.65, fontStyle: "italic" }}>
        Source · TMO Q1 2026 (23 Apr), peer Q1 reads (DHR, SRT, MRK GR, RGEN, RVTY, A US, IQV, CRL, WAT, BIO, MTD, LH, DGX, ROG, QDEL), Bloomberg/BI consensus, J.P. Morgan Q1 biopharma licensing report, NACUBO-Commonfund 2025 endowment study, S&P Global PMI, BLS, EPA, FDA. Internal Cape Capital research, 20 May 2026.
      </div>
    </div>
  );
}
