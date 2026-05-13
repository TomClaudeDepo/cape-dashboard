import { Fn } from "../../theme";

/* ════════════════════════════════════════════════════════════════
   SectionHeader
   Used between sections of the EUV process — Source, Mirrors,
   Reticle, Projection. Coloured accent matches the section.
   ════════════════════════════════════════════════════════════════ */
export default function SectionHeader({ T, eyebrow, title, subtitle, colorKey = "deepBlue" }) {
  const accent = T[colorKey] || T.deepBlue;
  return (
    <div style={{ marginTop: 48, marginBottom: 18 }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        marginBottom: 8,
      }}>
        <span style={{
          width: 24, height: 2, background: accent, borderRadius: 1,
        }} />
        <span style={{
          fontSize: 10, fontWeight: 700, color: accent, fontFamily: Fn,
          letterSpacing: "0.12em", textTransform: "uppercase",
        }}>{eyebrow}</span>
      </div>
      <div style={{
        fontSize: 22, fontWeight: 600, color: T.text, fontFamily: Fn,
        letterSpacing: "-0.015em",
      }}>{title}</div>
      {subtitle && (
        <div style={{
          fontSize: 12.5, color: T.textTer, fontFamily: Fn,
          marginTop: 4, lineHeight: 1.55,
        }}>{subtitle}</div>
      )}
    </div>
  );
}
