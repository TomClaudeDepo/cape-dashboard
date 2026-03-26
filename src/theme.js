const F = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
export const Fs = F;
export const Fn = F;

export const LIGHT = {
  // Brand
  capRed: "#9B1B1B", red300: "#DC2626", red200: "#FEE2E2", red100: "#FEF2F2",
  // Neutrals
  white: "#FFFFFF", black: "#0F172A", beige: "#F8F9FC", beige50: "#FBFCFE",
  // Purple
  purple: "#4338CA", purple300: "#818CF8", purple200: "#C7D2FE", purple100: "#EEF2FF",
  // Green
  green: "#047857", green300: "#34D399", green200: "#A7F3D0", green100: "#ECFDF5",
  // Grey (Slate scale)
  grey800: "#1E293B", grey400: "#94A3B8", grey300: "#CBD5E1", grey200: "#E2E8F0", grey100: "#F1F5F9", grey50: "#F8FAFC",
  // Semantic
  orange: "#EA580C", deepBlue: "#1D4ED8", moss: "#65A30D", matcha: "#86EFAC",
  // Layout
  bg: "#F8F9FC", card: "#FFFFFF", border: "rgba(0,0,0,0.06)", text: "#0F172A", textSec: "#475569", textTer: "#94A3B8",
  sidebar: "rgba(255,255,255,0.75)", topbar: "rgba(255,255,255,0.75)", accent: "#9B1B1B",
  // Components
  pillBg: "#F1F5F9", pillText: "#475569", greenBg: "#ECFDF5", redBg: "#FEF2F2", rowHover: "#F8FAFC",
  // Modern tokens
  shadow: "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)",
  shadowLg: "0 4px 16px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.04)",
  shadowXl: "0 8px 30px rgba(0,0,0,0.08)",
  ring: "0 0 0 3px rgba(155,27,27,0.12)",
  glassBlur: "blur(16px)",
  glassBorder: "1px solid rgba(255,255,255,0.5)",
  radius: 14, radiusSm: 8, radiusLg: 20,
};

export const DARK = {
  // Brand
  capRed: "#EF4444", red300: "#F87171", red200: "#2D1515", red100: "#1C0E0E",
  // Neutrals
  white: "#09090B", black: "#FAFAFA", beige: "#09090B", beige50: "#0C0C0E",
  // Purple
  purple: "#818CF8", purple300: "#A5B4FC", purple200: "#312E81", purple100: "#1E1B4B",
  // Green
  green: "#34D399", green300: "#6EE7B7", green200: "#064E3B", green100: "#022C22",
  // Grey (Zinc scale)
  grey800: "#E4E4E7", grey400: "#71717A", grey300: "#3F3F46", grey200: "#27272A", grey100: "#18181B", grey50: "#0C0C0E",
  // Semantic
  orange: "#FB923C", deepBlue: "#60A5FA", moss: "#A3E635", matcha: "#86EFAC",
  // Layout
  bg: "#09090B", card: "#111113", border: "rgba(255,255,255,0.06)", text: "#FAFAFA", textSec: "#A1A1AA", textTer: "#52525B",
  sidebar: "rgba(9,9,11,0.82)", topbar: "rgba(9,9,11,0.82)", accent: "#EF4444",
  // Components
  pillBg: "#18181B", pillText: "#A1A1AA", greenBg: "#022C22", redBg: "#1C0E0E", rowHover: "#18181B",
  // Modern tokens
  shadow: "0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)",
  shadowLg: "0 4px 16px rgba(0,0,0,0.4)",
  shadowXl: "0 8px 30px rgba(0,0,0,0.5)",
  ring: "0 0 0 3px rgba(239,68,68,0.15)",
  glassBlur: "blur(16px)",
  glassBorder: "1px solid rgba(255,255,255,0.06)",
  radius: 14, radiusSm: 8, radiusLg: 20,
};

export function useTheme(dark) { return dark ? DARK : LIGHT; }
