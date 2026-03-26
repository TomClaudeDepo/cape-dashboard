export const fmtEur = v => {
  const a = Math.abs(v), s = v < 0 ? "-" : "";
  if (a >= 1e9) return s + (a / 1e9).toFixed(2) + "B";
  if (a >= 1e6) return s + (a / 1e6).toFixed(1) + "M";
  if (a >= 1e3) return s + (a / 1e3).toFixed(0) + "K";
  return s + a.toFixed(0);
};

export const fmtPct = v => (v >= 0 ? "+" : "") + v.toFixed(2) + "%";
export const fmtX = v => v == null ? "\u2014" : v.toFixed(1) + "x";
export const fmtPv = v => v == null ? "\u2014" : v.toFixed(1) + "%";
export const fmtBn = v => v == null ? "\u2014" : "\u20AC" + v.toFixed(1) + "B";
