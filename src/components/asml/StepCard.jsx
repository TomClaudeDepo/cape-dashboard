import { Fn } from "../../theme";
import { Card } from "../shared";

/* ═══════════════════════════════════════════
   Hex-to-rgba tinting helper
   ═══════════════════════════════════════════ */
export function tint(hex, alpha) {
  if (!hex || typeof hex !== "string") return `rgba(0,0,0,${alpha})`;
  // If it's already rgb/rgba/hsl, return as-is — we'll trust the caller
  if (hex.startsWith("rgb") || hex.startsWith("hsl")) return hex;
  const h = hex.replace("#", "");
  if (h.length !== 3 && h.length !== 6) return `rgba(0,0,0,${alpha})`;
  const r = parseInt(h.length === 3 ? h[0] + h[0] : h.substr(0, 2), 16);
  const g = parseInt(h.length === 3 ? h[1] + h[1] : h.substr(2, 2), 16);
  const b = parseInt(h.length === 3 ? h[2] + h[2] : h.substr(4, 2), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

/* ═══════════════════════════════════════════
   StepHeader — number badge + title
   ═══════════════════════════════════════════ */
export function StepHeader({ number, title, color, T }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      marginBottom: 14, flexWrap: "wrap",
    }}>
      <span style={{
        fontSize: 11, fontWeight: 700, color: color, fontFamily: Fn,
        letterSpacing: "0.1em", padding: "5px 11px", borderRadius: 6,
        background: tint(color, 0.10),
        border: `1px solid ${tint(color, 0.22)}`,
        fontFeatureSettings: '"tnum"',
      }}>{number}</span>
      <span style={{
        fontSize: 16.5, fontWeight: 600, color: T.text, fontFamily: Fn,
        letterSpacing: "-0.01em",
      }}>{title}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════
   FunFactBadge — striking single-line callout
   ═══════════════════════════════════════════ */
export function FunFactBadge({ text, color, T }) {
  const accent = color || T.orange;
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 10,
      padding: "11px 14px",
      borderRadius: 8,
      background: tint(accent, 0.07),
      border: `1px solid ${tint(accent, 0.20)}`,
      marginTop: 14,
    }}>
      <span style={{
        flexShrink: 0,
        fontSize: 9, fontWeight: 800, color: accent, fontFamily: Fn,
        letterSpacing: "0.14em",
        padding: "4px 8px",
        borderRadius: 4,
        background: tint(accent, 0.14),
        marginTop: 1,
      }}>FUN FACT</span>
      <span style={{
        fontSize: 12.5, color: T.textSec, fontFamily: Fn,
        lineHeight: 1.6, flex: 1,
      }}>{text}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════
   StepCard — full step layout
   - StepHeader at the top (outside any Card)
   - children = the visualization (may or may not bring its own Card)
   - Explanation + FunFactBadge inside a small Card below
   ═══════════════════════════════════════════ */
export function StepCard({ number, title, color, explanation, funFact, T, children, vizInCard = true }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <StepHeader number={number} title={title} color={color} T={T} />
      {vizInCard ? (
        <Card T={T} style={{ padding: 24 }}>
          {children}
        </Card>
      ) : (
        <>{children}</>
      )}
      <Card T={T} style={{ padding: "16px 20px", marginTop: 12 }}>
        <p style={{
          fontSize: 13, color: T.textSec, fontFamily: Fn,
          lineHeight: 1.75, margin: 0,
        }}>{explanation}</p>
        <FunFactBadge text={funFact} color={color} T={T} />
      </Card>
    </div>
  );
}
