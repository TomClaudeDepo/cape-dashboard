import { useState, useEffect, useRef } from "react";
import { Fn, Fs } from "../theme";

export function LiveDot({ active, T }) {
  return (
    <span style={{
      width: 8, height: 8, borderRadius: "50%",
      background: active ? T.green : T.capRed,
      display: "inline-block", flexShrink: 0,
      boxShadow: active ? `0 0 6px ${T.green}` : `0 0 6px ${T.capRed}`,
      animation: active ? "pulse 2s ease infinite" : "none",
    }} />
  );
}

export function RefreshTimer({ seconds, onRefresh, T }) {
  const [count, setCount] = useState(seconds);
  const [spinning, setSpinning] = useState(false);
  const onRefreshRef = useRef(onRefresh);
  onRefreshRef.current = onRefresh;

  useEffect(() => {
    const iv = setInterval(() => {
      setCount(c => {
        if (c <= 1) {
          setTimeout(() => onRefreshRef.current(), 0);
          return seconds;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, [seconds]);

  const handleManual = () => {
    setSpinning(true);
    onRefresh();
    setCount(seconds);
    setTimeout(() => setSpinning(false), 600);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, fontFamily: Fn, color: T.textTer }}>
      <span style={{ fontFeatureSettings: '"tnum"' }}>{count}s</span>
      <button onClick={handleManual} style={{
        width: 28, height: 28, borderRadius: "50%", border: "1px solid " + T.border, background: T.bg,
        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.2s", color: T.textTer,
      }}>
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
          style={{ transition: "transform 0.6s", transform: spinning ? "rotate(360deg)" : "rotate(0)" }}>
          <path d="M2 8a6 6 0 0111.3-2.8" /><polyline points="14,2 14,6 10,6" /><path d="M14 8a6 6 0 01-11.3 2.8" /><polyline points="2,14 2,10 6,10" />
        </svg>
      </button>
    </div>
  );
}

export function Skeleton({ width = "100%", height = 16, T, style = {} }) {
  return (
    <div style={{
      width, height, borderRadius: 6, background: T.pillBg,
      animation: "pulse 1.5s ease infinite", ...style,
    }} />
  );
}

export function Pill({ children, color, bg, T }) {
  return (
    <span style={{ fontSize: 10, fontWeight: 600, padding: "4px 10px", borderRadius: 20, background: bg || T.pillBg, color: color || T.pillText, fontFamily: Fn, letterSpacing: "0.02em", whiteSpace: "nowrap", fontFeatureSettings: '"tnum"' }}>
      {children}
    </span>
  );
}

export function TabBar({ tabs, active, onChange, T }) {
  return (
    <div style={{ display: "inline-flex", gap: 2, background: T.pillBg, borderRadius: 10, padding: 3 }}>
      {tabs.map(t => (
        <button key={t.k} onClick={() => onChange(t.k)} style={{
          padding: "7px 16px", fontSize: 11, border: "none", cursor: "pointer", fontFamily: Fn, borderRadius: 8,
          background: active === t.k ? T.capRed : "transparent",
          color: active === t.k ? "#fff" : T.textTer,
          fontWeight: active === t.k ? 600 : 400,
          boxShadow: active === t.k ? "0 1px 4px rgba(155,27,27,0.18)" : "none",
          transition: "all 0.2s", whiteSpace: "nowrap",
        }}>
          {t.l}
        </button>
      ))}
    </div>
  );
}

export function Card({ children, T, style: s = {}, hover = false }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={hover ? () => setH(true) : undefined}
      onMouseLeave={hover ? () => setH(false) : undefined}
      style={{
        background: T.card, boxShadow: h ? T.shadowLg : T.shadow, borderRadius: T.radius, padding: "20px 24px",
        transition: "box-shadow 0.25s, transform 0.25s",
        transform: h ? "translateY(-2px)" : "none",
        ...s,
      }}
    >
      {children}
    </div>
  );
}

export function Label({ children, T }) {
  return <div style={{ fontSize: 10, color: T.textTer, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12, fontFamily: Fn, fontWeight: 600 }}>{children}</div>;
}

function AnimatedValue({ value, T }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    // Parse numeric part from string like "€438.5M", "98.0%", "20.2x"
    const match = value.match(/^([^\d-]*)([-\d.]+)(.*)$/);
    if (!match) { setDisplay(value); return; }
    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr);
    if (isNaN(target)) { setDisplay(value); return; }

    const start = performance.now();
    const duration = 600;
    const ease = t => 1 - Math.pow(1 - t, 3); // ease-out cubic

    const animate = now => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const current = target * ease(progress);
      // Match decimal places of original
      const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;
      setDisplay(prefix + current.toFixed(decimals) + suffix);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value]);

  return <>{display}</>;
}

export function Stat({ label, value, sub, delta, T, delay = 0 }) {
  const [h, setH] = useState(false);
  const isPos = delta && parseFloat(delta) >= 0;
  return (
    <div
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        background: T.card, boxShadow: h ? T.shadowLg : T.shadow, borderRadius: T.radius, padding: "18px 20px", minWidth: 0, overflow: "hidden",
        transition: "box-shadow 0.25s, transform 0.25s",
        transform: h ? "translateY(-2px)" : "none",
        animation: "fadeIn 0.4s ease both", animationDelay: delay + "s",
      }}
    >
      <div style={{ fontSize: 10, color: T.textTer, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8, fontFamily: Fn, fontWeight: 600 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
        <span style={{ fontSize: 22, fontWeight: 300, fontFamily: Fn, letterSpacing: "-0.02em", color: T.text, lineHeight: 1, fontFeatureSettings: '"tnum"' }}>
          <AnimatedValue value={value} T={T} />
        </span>
        {delta && <Pill T={T} color={isPos ? T.green : T.capRed} bg={isPos ? T.greenBg : T.redBg}>{delta}</Pill>}
      </div>
      {sub && <div style={{ fontSize: 11, color: T.textTer, marginTop: 6, fontFamily: Fn, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{sub}</div>}
    </div>
  );
}

export function Bars({ portfolio, benchmark, title, benchLabel = "ACWI", showBench = true, T }) {
  const all = showBench ? [...new Set([...portfolio.map(p => p.name), ...benchmark.map(b => b.name)])] : portfolio.map(p => p.name);
  const sectors = all.map(name => {
    const p = portfolio.find(x => x.name === name);
    const b = benchmark.find(x => x.name === name);
    return { name, pW: p ? p.wt : 0, bW: b ? b.wt : 0 };
  }).sort((a, b) => b.pW - a.pW);
  const mx = Math.max(...sectors.map(s => Math.max(s.pW, showBench ? s.bW : 0))) * 1.15;
  return (
    <Card T={T} style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <Label T={T}>{title}</Label>
        {showBench && (
          <div style={{ display: "flex", gap: 14, fontSize: 10, color: T.textTer, fontFamily: Fn }}>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 8, height: 8, borderRadius: 4, background: T.capRed }} />Fund</span>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 8, height: 8, borderRadius: 4, background: T.grey200 }} />{benchLabel}</span>
          </div>
        )}
      </div>
      {sectors.map((s, i) => {
        const diff = s.pW - s.bW;
        return (
          <div key={i} style={{ marginBottom: showBench ? 6 : 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 120, fontSize: 11, color: T.textSec, textAlign: "right", flexShrink: 0, fontFamily: Fn }}>{s.name}</div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ height: 16, borderRadius: 6, background: `linear-gradient(90deg, ${T.capRed}, ${T.capRed}cc)`, width: (s.pW / mx) * 100 + "%", minWidth: s.pW > 0 ? 2 : 0, transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)" }} />
                  <span style={{ fontSize: 10, color: T.textSec, fontFamily: Fn, fontWeight: 600, fontFeatureSettings: '"tnum"' }}>{s.pW.toFixed(1)}%</span>
                </div>
                {showBench && (
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ height: 16, borderRadius: 6, background: T.grey200, width: (s.bW / mx) * 100 + "%", minWidth: s.bW > 0 ? 2 : 0, transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)" }} />
                    <span style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, fontFeatureSettings: '"tnum"' }}>{s.bW.toFixed(1)}%</span>
                    <Pill T={T} color={diff > 0 ? T.green : diff < 0 ? T.capRed : T.textTer} bg={diff > 0 ? T.greenBg : diff < 0 ? T.redBg : T.pillBg}>{diff > 0 ? "+" : ""}{diff.toFixed(1)}%</Pill>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </Card>
  );
}

export function Tickers({ title, items, T, unit }) {
  return (
    <Card T={T} style={{ marginBottom: 12 }}>
      <Label T={T}>{title}</Label>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(" + Math.min(items.length, 4) + ",1fr)", gap: 10 }}>
        {items.map((it, i) => {
          const [h, setH] = useState(false);
          return (
            <div key={i} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ padding: "12px 14px", background: T.pillBg, borderRadius: T.radiusSm, transition: "transform 0.2s, box-shadow 0.2s", transform: h ? "scale(1.02)" : "none", boxShadow: h ? T.shadow : "none" }}>
              <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn }}>{it.name}</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: T.text, fontFamily: Fn, marginTop: 3, fontFeatureSettings: '"tnum"' }}>{it.val}</div>
              <div style={{ marginTop: 4 }}>
                <Pill T={T} color={it.chg >= 0 ? T.green : T.capRed} bg={it.chg >= 0 ? T.greenBg : T.redBg}>{it.chg >= 0 ? "+" : ""}{it.chg.toFixed(2)}{unit || "% 1d"}</Pill>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export function SortTable({ cols, rows, summaryRows, T }) {
  const [sc, setSc] = useState(cols.find(c => c.defaultSort)?.key || cols[1]?.key);
  const [sa, setSa] = useState(false);
  const [hov, setHov] = useState(-1);
  const sorted = [...rows].sort((a, b) => { const av = a[sc], bv = b[sc]; if (av == null) return 1; if (bv == null) return -1; return sa ? av - bv : bv - av });
  const hs = k => { if (sc === k) setSa(!sa); else { setSc(k); setSa(false) } };
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, fontFamily: Fn, minWidth: cols.length * 72 }}>
        <thead>
          <tr style={{ borderBottom: "1px solid " + T.border }}>
            {cols.map(c => (
              <th key={c.key} onClick={c.sort !== false ? () => hs(c.key) : undefined} style={{ textAlign: c.align || "right", padding: "10px 8px", fontSize: 9, color: T.textTer, fontWeight: 600, letterSpacing: "0.06em", cursor: c.sort !== false ? "pointer" : "default", textTransform: "uppercase", whiteSpace: "nowrap", position: c.key === "name" ? "sticky" : "static", left: c.key === "name" ? 0 : "auto", background: T.card, zIndex: c.key === "name" ? 2 : 0 }}>
                {c.label}{c.sort !== false && sc === c.key ? <span style={{ marginLeft: 3, fontSize: 7 }}>{sa ? "\u25B2" : "\u25BC"}</span> : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((r, i) => (
            <tr key={i} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(-1)} style={{
              background: hov === i ? T.rowHover : "transparent",
              transition: "background 0.15s",
              boxShadow: hov === i ? `inset 3px 0 0 ${T.capRed}` : "none",
            }}>
              {cols.map(c => {
                let color = T.textSec;
                if (c.color && r[c.key] != null) {
                  const v = r[c.key];
                  if (c.color === "margin") color = v >= 30 ? T.green : v >= 15 ? T.green300 : v < 5 ? T.capRed : T.textSec;
                  if (c.color === "leverage") color = v > 3 ? T.capRed : v < 0 ? T.green : T.textSec;
                  if (c.color === "growth") color = v > 20 ? T.green : v > 0 ? T.green300 : v < 0 ? T.capRed : T.textSec;
                }
                return (
                  <td key={c.key} style={{ padding: "9px 8px", textAlign: c.align || "right", color: c.key === "name" ? T.text : color, fontWeight: c.key === "name" ? 600 : 400, whiteSpace: "nowrap", fontFeatureSettings: c.key !== "name" ? '"tnum"' : "normal", position: c.key === "name" ? "sticky" : "static", left: c.key === "name" ? 0 : "auto", background: hov === i ? T.rowHover : T.card, zIndex: c.key === "name" ? 1 : 0 }}>
                    {c.fmt ? c.fmt(r[c.key]) : r[c.key]}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
        {summaryRows && (
          <tfoot>
            {summaryRows.map((sr, si) => (
              <tr key={si} style={{ borderTop: si === 0 ? "1px solid " + T.border : "none", background: T.bg }}>
                {cols.map((c, ci) => (
                  <td key={c.key} style={{ padding: "9px 8px", textAlign: c.align || "right", fontWeight: 700, color: T.text, whiteSpace: "nowrap", fontSize: 10, fontFeatureSettings: '"tnum"', position: c.key === "name" ? "sticky" : "static", left: c.key === "name" ? 0 : "auto", background: T.bg, zIndex: c.key === "name" ? 1 : 0 }}>
                    {ci === 0 ? sr._label : c.key === "wt" ? "" : c.fmt ? c.fmt(sr[c.key]) : sr[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tfoot>
        )}
      </table>
    </div>
  );
}
