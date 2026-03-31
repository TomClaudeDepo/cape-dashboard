import { useState, useRef, useEffect } from "react";
import { Fn } from "../theme";
import { PASSCODE } from "../data/constants";

const Serif = "'Playfair Display', Georgia, 'Times New Roman', serif";

/* ── data for the page ────────────────────────────────────── */
const pillars = [
  {
    title: "Concentration",
    items: ["Portfolio of 20\u201330 large-cap companies", "Benchmark-agnostic mindset", "Holding sizes between 1\u20136%"],
  },
  {
    title: "Quality",
    items: ["Industry leaders with wide moats", "Healthy balance sheets & strong cash-flow generation", "Experienced management with proven track records"],
  },
  {
    title: "Thematic",
    items: ["Structural themes improve the odds for above-GDP growth", "Avoid investments in \u201chype\u201d", "Long-term secular tailwinds over short-term momentum"],
  },
  {
    title: "Discipline",
    items: ["Balancing growth opportunities with valuations", "Embracing cyclicality, avoiding idiosyncratic risks", "Low turnover, average holding period 3\u20134 years"],
  },
];

const stats = [
  { label: "NAV", value: "EUR 396M" },
  { label: "Holdings", value: "26" },
  { label: "Active Share", value: "78%" },
  { label: "Since Inception", value: "+137%" },
  { label: "Avg Holding Period", value: "3\u20134 yrs" },
  { label: "Exposure", value: ">97%" },
];

const geoData = [
  { region: "North America", pct: 46 },
  { region: "Europe", pct: 31 },
  { region: "APAC ex Japan", pct: 18 },
  { region: "Japan", pct: 5 },
];

const sectorData = [
  { sector: "Information Technology", pct: 24.2 },
  { sector: "Industrials", pct: 21.6 },
  { sector: "Financials", pct: 12.7 },
  { sector: "Health Care", pct: 13.4 },
  { sector: "Communication Services", pct: 11.1 },
  { sector: "Consumer Discretionary", pct: 7.7 },
  { sector: "Materials", pct: 6.6 },
  { sector: "Utilities", pct: 2.7 },
];

const themes = [
  { name: "Digitalization", sub: "AI \u00b7 Semis 2.0 \u00b7 Automation", color: "#4338CA" },
  { name: "Demographics", sub: "Consumerism \u00b7 Healthcare access \u00b7 EM middle class", color: "#1D4ED8" },
  { name: "Durability", sub: "Waste & water \u00b7 Electrification \u00b7 Carbon neutrality", color: "#047857" },
  { name: "Diversifiers", sub: "Hidden value \u00b7 Compounding machines \u00b7 Riding the cycle", color: "#EA580C" },
];

/* ── component ────────────────────────────────────────────── */
export default function Passcode({ onUnlock, T }) {
  const [code, setCode] = useState("");
  const [err, setErr] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef(null);

  // auto-focus the hidden input on mount
  useEffect(() => { inputRef.current?.focus() }, []);

  const handleInput = (val) => {
    const filtered = val.replace(/\D/g, "").slice(0, 4);
    setCode(filtered);
    setErr(false);
    if (filtered.length === 4) {
      setTimeout(() => {
        if (filtered === PASSCODE) onUnlock();
        else { setErr(true); setShake(true); setTimeout(() => { setShake(false); setCode("") }, 500) }
      }, 200);
    }
  };

  const maxBar = Math.max(...sectorData.map(s => s.pct));

  return (
    <div style={{ minHeight: "100vh", fontFamily: Fn, background: "#FAFAF8", display: "flex", flexDirection: "column" }}>

      {/* ── Hero section ─────────────────────────────────── */}
      <div style={{
        background: "#1A1214",
        padding: "64px 40px 72px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* subtle radial glow */}
        <div style={{ position: "absolute", top: "-30%", right: "-10%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(155,27,27,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Logo */}
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontSize: 24, fontWeight: 300, color: "rgba(255,255,255,0.9)", letterSpacing: "-0.02em" }}>Cape</div>
            <div style={{ fontSize: 8, letterSpacing: "0.3em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginTop: 2 }}>Capital</div>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: Serif,
            fontSize: "clamp(36px, 5.5vw, 64px)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "rgba(255,255,255,0.93)",
            margin: 0,
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
            maxWidth: 620,
          }}>
            Invested in
            <br />
            quality
          </h1>

          <p style={{
            fontSize: "clamp(13px, 1.5vw, 16px)",
            color: "rgba(255,255,255,0.45)",
            fontWeight: 300,
            lineHeight: 1.7,
            maxWidth: 520,
            margin: "28px 0 0",
          }}>
            Achieving long-term capital appreciation by holding a concentrated portfolio of attractively valued quality companies favourably exposed to structural themes.
          </p>

          {/* Stats row */}
          <div style={{
            display: "flex",
            gap: "clamp(20px, 4vw, 48px)",
            flexWrap: "wrap",
            marginTop: 48,
            paddingTop: 32,
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}>
            {stats.map((s, i) => (
              <div key={i} style={{ animation: `fadeIn 0.5s ease ${0.1 * i}s both` }}>
                <div style={{ fontSize: 9, letterSpacing: "0.15em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginBottom: 6 }}>{s.label}</div>
                <div style={{ fontSize: 18, fontWeight: 500, color: "rgba(255,255,255,0.8)", fontFamily: Fn }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Four pillars ─────────────────────────────────── */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "56px 40px 0", width: "100%", boxSizing: "border-box" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#9B1B1B", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>Investment Approach</div>
        <h2 style={{ fontFamily: Serif, fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 400, color: "#1A1214", margin: "0 0 40px", lineHeight: 1.2 }}>
          Three pillars of a concentrated portfolio
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
          {pillars.map((p, i) => (
            <div key={i} style={{
              background: "#FFFFFF",
              borderRadius: 12,
              padding: "28px 24px",
              border: "1px solid rgba(0,0,0,0.05)",
              animation: `fadeIn 0.5s ease ${0.1 * i}s both`,
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1A1214", marginBottom: 14, fontFamily: Fn }}>{p.title}</div>
              {p.items.map((item, j) => (
                <div key={j} style={{ display: "flex", gap: 8, marginBottom: 10, fontSize: 12.5, color: "#64625D", lineHeight: 1.5, fontWeight: 300 }}>
                  <span style={{ color: "#9B1B1B", fontWeight: 500, flexShrink: 0, marginTop: 1 }}>&bull;</span>
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Thematic exposure ────────────────────────────── */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "56px 40px 0", width: "100%", boxSizing: "border-box" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#9B1B1B", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>Themes</div>
        <h2 style={{ fontFamily: Serif, fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 400, color: "#1A1214", margin: "0 0 32px", lineHeight: 1.2 }}>
          Structural tailwinds
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
          {themes.map((t, i) => (
            <div key={i} style={{
              background: "#FFFFFF",
              borderRadius: 12,
              padding: "24px",
              border: "1px solid rgba(0,0,0,0.05)",
              borderLeft: `3px solid ${t.color}`,
            }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1A1214", marginBottom: 6 }}>{t.name}</div>
              <div style={{ fontSize: 11.5, color: "#94918B", fontWeight: 300, lineHeight: 1.5 }}>{t.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Allocation overview ──────────────────────────── */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "56px 40px 0", width: "100%", boxSizing: "border-box" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#9B1B1B", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>Portfolio Exposure</div>
        <h2 style={{ fontFamily: Serif, fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 400, color: "#1A1214", margin: "0 0 36px", lineHeight: 1.2 }}>
          Focused, yet balanced
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32 }}>
          {/* Geography */}
          <div style={{ background: "#FFFFFF", borderRadius: 12, padding: "28px 24px", border: "1px solid rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#64625D", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>Geographic</div>
            {geoData.map((g, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 12.5, color: "#1A1214", fontWeight: 400 }}>{g.region}</span>
                  <span style={{ fontSize: 12.5, color: "#64625D", fontWeight: 500 }}>{g.pct}%</span>
                </div>
                <div style={{ height: 4, borderRadius: 2, background: "rgba(0,0,0,0.04)" }}>
                  <div style={{ height: "100%", borderRadius: 2, background: i === 0 ? "#9B1B1B" : i === 1 ? "#C4514F" : i === 2 ? "#D4918F" : "#E0B8B7", width: `${(g.pct / 50) * 100}%`, transition: "width 0.8s ease" }} />
                </div>
              </div>
            ))}
          </div>

          {/* Sector */}
          <div style={{ background: "#FFFFFF", borderRadius: 12, padding: "28px 24px", border: "1px solid rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#64625D", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>Sector</div>
            {sectorData.map((s, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: "#1A1214", fontWeight: 400 }}>{s.sector}</span>
                  <span style={{ fontSize: 12, color: "#64625D", fontWeight: 500 }}>{s.pct}%</span>
                </div>
                <div style={{ height: 3, borderRadius: 2, background: "rgba(0,0,0,0.04)" }}>
                  <div style={{ height: "100%", borderRadius: 2, background: "#9B1B1B", opacity: 0.3 + 0.7 * (s.pct / maxBar), width: `${(s.pct / maxBar) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Quality focus ────────────────────────────────── */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "56px 40px 0", width: "100%", boxSizing: "border-box" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#9B1B1B", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>Quality Focus</div>
        <h2 style={{ fontFamily: Serif, fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 400, color: "#1A1214", margin: "0 0 32px", lineHeight: 1.2 }}>
          Selecting companies with a competitive edge
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
          {[
            { label: "P/E (NTM)", value: "22.0x" },
            { label: "EV/EBITDA (NTM)", value: "15.1x" },
            { label: "ROE (LTM)", value: "23.3%" },
            { label: "Net Margin (LTM)", value: "20.5%" },
            { label: "FCF Margin (LTM)", value: "37.4%" },
            { label: "ND/EBITDA (LTM)", value: "1.0x" },
            { label: "Fwd EPS CAGR (2Y)", value: "18.9%" },
            { label: "Fwd Rev CAGR (2Y)", value: "10.9%" },
          ].map((m, i) => (
            <div key={i} style={{
              background: "#FFFFFF",
              borderRadius: 10,
              padding: "20px 18px",
              border: "1px solid rgba(0,0,0,0.05)",
              textAlign: "center",
            }}>
              <div style={{ fontSize: 22, fontWeight: 500, color: "#1A1214", marginBottom: 4, fontFamily: Fn }}>{m.value}</div>
              <div style={{ fontSize: 10, color: "#94918B", letterSpacing: "0.05em", fontWeight: 400 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Fund facts ───────────────────────────────────── */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "56px 40px", width: "100%", boxSizing: "border-box" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#9B1B1B", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>Fund Information</div>
        <h2 style={{ fontFamily: Serif, fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 400, color: "#1A1214", margin: "0 0 28px", lineHeight: 1.2 }}>
          Facts &amp; terms
        </h2>

        <div style={{ background: "#FFFFFF", borderRadius: 12, border: "1px solid rgba(0,0,0,0.05)", overflow: "hidden" }}>
          {[
            ["Base Currency", "EUR"],
            ["Fund Launch Date", "1 June 2015"],
            ["Liquidity", "Daily (by 3pm CET)"],
            ["Domicile", "Luxembourg"],
            ["Fund Type", "SICAV-UCITS"],
            ["ISIN", "LU1200254495"],
            ["Depository Bank", "UBS Europe SE, Luxembourg Branch"],
            ["Independent Auditor", "PwC (Luxembourg)"],
            ["Swiss Representation", "ACOLIN Fund Services AG, Z\u00fcrich"],
          ].map(([k, v], i, arr) => (
            <div key={i} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "14px 24px",
              borderBottom: i < arr.length - 1 ? "1px solid rgba(0,0,0,0.04)" : "none",
              background: i % 2 === 0 ? "transparent" : "rgba(0,0,0,0.015)",
            }}>
              <span style={{ fontSize: 12.5, color: "#64625D", fontWeight: 400 }}>{k}</span>
              <span style={{ fontSize: 12.5, color: "#1A1214", fontWeight: 500, textAlign: "right" }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Spacer for fixed bottom bar ──────────────────── */}
      <div style={{ height: 72 }} />

      {/* ── Bottom passcode bar (fixed) ──────────────────── */}
      <div
        onClick={() => inputRef.current?.focus()}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: 56,
          background: "rgba(26,18,20,0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          zIndex: 100,
          borderTop: "1px solid rgba(155,27,27,0.15)",
          cursor: "text",
        }}
      >
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: Fn, fontWeight: 400 }}>
          Passcode
        </span>

        {/* Dot display */}
        <div style={{ display: "flex", gap: 10, animation: shake ? "shake 0.4s" : "none" }}>
          {[0, 1, 2, 3].map(i => (
            <div key={i} style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              border: `1.5px solid ${err ? "#EF4444" : code.length > i ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.15)"}`,
              background: code.length > i ? (err ? "#EF4444" : "rgba(255,255,255,0.85)") : "transparent",
              transition: "all 0.15s ease",
              transform: code.length === i + 1 && !err ? "scale(1.3)" : "scale(1)",
            }} />
          ))}
        </div>

        {err && <span style={{ fontSize: 11, color: "#EF4444", fontFamily: Fn }}>Incorrect</span>}

        {/* Hidden input that captures keyboard */}
        <input
          ref={inputRef}
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          value={code}
          onChange={e => handleInput(e.target.value)}
          autoFocus
          style={{
            position: "absolute",
            opacity: 0,
            width: 0,
            height: 0,
            pointerEvents: "none",
          }}
        />

        <span style={{ fontSize: 9, color: "rgba(255,255,255,0.12)", fontFamily: Fn }}>1234</span>
      </div>

      {/* ── Animations ───────────────────────────────────── */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px) }
          to { opacity: 1; transform: translateY(0) }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0) }
          20% { transform: translateX(-6px) }
          40% { transform: translateX(6px) }
          60% { transform: translateX(-4px) }
          80% { transform: translateX(4px) }
        }
      `}</style>
    </div>
  );
}
