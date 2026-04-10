// IBE (Iberdrola) — Financials & Valuation Data
// Source: Bloomberg Terminal, April 2026

export const finHeroStats = [
  { value: "€138B", label: "Market capitalisation", color: "deepBlue" },
  { value: "€216B", label: "Enterprise value", color: "green" },
  { value: "13.0×", label: "EV/EBITDA FY2026E", color: "orange" },
  { value: "20.6×", label: "P/E FY2026E", color: "purple" },
  { value: "3.3%", label: "Dividend yield (FY2026E)", color: "capRed" },
  { value: "12.2%", label: "Return on equity (FY2025)", color: "green" },
];

/* ═══════════════════════════════════════════
   CONSENSUS GROWTH (YoY %)
   ═══════════════════════════════════════════ */
export const growthMetrics = [
  {
    metric: "EPS (Adj)",
    values: [
      { year: "FY2025A", value: 12.54 },
      { year: "FY2026E", value: 6.39 },
      { year: "FY2027E", value: 6.56 },
      { year: "FY2028E", value: 7.94 },
      { year: "FY2029E", value: 4.06 },
    ],
    color: "#059669",
  },
  {
    metric: "Revenue",
    values: [
      { year: "FY2025A", value: 1.80 },
      { year: "FY2026E", value: 2.58 },
      { year: "FY2027E", value: 3.89 },
      { year: "FY2028E", value: 4.73 },
      { year: "FY2029E", value: 5.71 },
    ],
    color: "#1D4ED8",
  },
  {
    metric: "EBITDA",
    values: [
      { year: "FY2025A", value: -1.52 },
      { year: "FY2026E", value: 0.18 },
      { year: "FY2027E", value: 4.80 },
      { year: "FY2028E", value: 6.24 },
      { year: "FY2029E", value: 5.66 },
    ],
    color: "#EA580C",
  },
  {
    metric: "Net Income (Adj)",
    values: [
      { year: "FY2025A", value: 12.68 },
      { year: "FY2026E", value: 6.69 },
      { year: "FY2027E", value: 7.00 },
      { year: "FY2028E", value: 7.36 },
      { year: "FY2029E", value: 5.79 },
    ],
    color: "#7C3AED",
  },
  {
    metric: "DPS",
    values: [
      { year: "FY2025A", value: 31.17 },
      { year: "FY2026E", value: 6.19 },
      { year: "FY2027E", value: 6.63 },
      { year: "FY2028E", value: 6.49 },
      { year: "FY2029E", value: 5.49 },
    ],
    color: "#9B1B1B",
  },
];

/* ═══════════════════════════════════════════
   FORWARD MULTIPLES
   ═══════════════════════════════════════════ */
export const forwardMultiples = [
  { metric: "P/E (Adj)", l4q: 21.95, n4q: 20.72, fy26: 20.57, fy27: 19.31, fy28: 17.89 },
  { metric: "P/Book", l4q: 2.66, n4q: null, fy26: 2.37, fy27: 2.28, fy28: 2.18 },
  { metric: "P/Cash Flow", l4q: 11.72, n4q: 11.03, fy26: 10.49, fy27: 9.97, fy28: 9.33 },
  { metric: "EV/Revenue", l4q: 4.91, n4q: 4.73, fy26: 4.63, fy27: 4.45, fy28: 4.25 },
  { metric: "EV/EBITDA", l4q: 13.90, n4q: 13.12, fy26: 13.01, fy27: 12.41, fy28: 11.68 },
  { metric: "Div. Yield %", l4q: null, n4q: 3.33, fy26: 3.54, fy27: 3.77, fy28: 4.02 },
];

/* ═══════════════════════════════════════════
   PEER VALUATION COMP
   ═══════════════════════════════════════════ */
export const peerValuation = [
  { name: "Iberdrola", highlight: true, mktCap: 137.93, ev: 216.24, evEbitda: 13.90, evEbitdaFY1: 13.01, evEbitdaFY2: 12.41, pe: 23.04, peFY1: 20.57, peFY2: 19.31, pFcf: 50.89, divYield: 3.27 },
  { name: "NextEra", highlight: false, mktCap: 168.62, ev: 258.20, evEbitda: 20.20, evEbitdaFY1: 16.17, evEbitdaFY2: 14.72, pe: 22.67, peFY1: 23.56, peFY2: 21.62, pFcf: null, divYield: 2.46 },
  { name: "Enel", highlight: false, mktCap: 100.33, ev: 176.30, evEbitda: 7.13, evEbitdaFY1: 7.47, evEbitdaFY2: 7.21, pe: 23.98, peFY1: 13.80, peFY2: 13.34, pFcf: 18.52, divYield: 4.91 },
  { name: "Engie", highlight: false, mktCap: 74.32, ev: 124.06, evEbitda: 9.10, evEbitdaFY1: 8.57, evEbitdaFY2: 7.95, pe: 18.58, peFY1: 15.26, peFY2: 14.43, pFcf: null, divYield: 5.06 },
  { name: "SSE", highlight: false, mktCap: 38.36, ev: 54.05, evEbitda: 15.11, evEbitdaFY1: 14.39, evEbitdaFY2: 11.52, pe: 31.72, peFY1: 18.51, peFY2: 15.05, pFcf: null, divYield: 2.34 },
  { name: "Ørsted", highlight: false, mktCap: 29.05, ev: 35.12, evEbitda: 17.29, evEbitdaFY1: 8.79, evEbitdaFY2: 8.07, pe: 41.64, peFY1: 18.66, peFY2: 17.59, pFcf: null, divYield: null },
  { name: "EDP", highlight: false, mktCap: 19.87, ev: 44.08, evEbitda: 9.38, evEbitdaFY1: 8.87, evEbitdaFY2: 8.76, pe: 16.51, peFY1: 15.99, peFY2: 16.05, pFcf: null, divYield: 4.21 },
  { name: "Naturgy", highlight: false, mktCap: 25.73, ev: 39.85, evEbitda: 7.68, evEbitdaFY1: 7.51, evEbitdaFY2: 7.52, pe: 12.23, peFY1: 13.15, peFY2: 13.51, pFcf: 10.49, divYield: 6.67 },
  { name: "Endesa", highlight: false, mktCap: null, ev: null, evEbitda: null, evEbitdaFY1: null, evEbitdaFY2: null, pe: null, peFY1: null, peFY2: null, pFcf: null, divYield: null },
];
export const peerMedian = { mktCap: 18.13, ev: 33.72, evEbitda: 13.94, evEbitdaFY1: 11.85, evEbitdaFY2: 10.54, pe: 22.16, peFY1: 19.03, peFY2: 18.05, pFcf: 21.08, divYield: 3.99 };

/* ═══════════════════════════════════════════
   PROFITABILITY COMP
   ═══════════════════════════════════════════ */
export const profitabilityComp = [
  { metric: "Sales Growth", ibe: 2.53, nee: 10.75, enel: 5.61, median: 1.54, unit: "%" },
  { metric: "EBITDA Growth", ibe: 9.76, nee: 91.45, enel: 4.58, median: -3.25, unit: "%" },
  { metric: "EBITDA Margin", ibe: 35.30, nee: 89.86, enel: 31.68, median: 31.68, unit: "%" },
  { metric: "Op. Income Margin", ibe: 22.13, nee: 64.54, enel: 19.53, median: 19.47, unit: "%" },
  { metric: "Net Profit Margin", ibe: 13.43, nee: 31.59, enel: 13.39, median: 13.41, unit: "%" },
  { metric: "Net Income Growth", ibe: 43.26, nee: 30.55, enel: 41.89, median: 0.84, unit: "%" },
  { metric: "Capex/Sales", ibe: 28.50, nee: 70.06, enel: 10.90, median: 26.96, unit: "%" },
  { metric: "ROIC", ibe: 5.52, nee: 6.31, enel: 11.79, median: 4.41, unit: "%" },
  { metric: "ROA", ibe: 3.71, nee: 4.30, enel: 5.71, median: 2.38, unit: "%" },
  { metric: "ROE", ibe: 12.18, nee: 16.54, enel: 35.64, median: 9.78, unit: "%" },
];

/* ═══════════════════════════════════════════
   BALANCE SHEET / LEVERAGE
   ═══════════════════════════════════════════ */
export const leverageComp = [
  { metric: "Net Debt/EBITDA", ibe: 4.18, nee: 3.79, enel: 2.48, edp: 4.01, median: 4.18, unit: "×" },
  { metric: "Total Debt/EBITDA", ibe: 4.58, nee: 3.90, enel: 2.84, edp: 4.85, median: 5.65, unit: "×" },
  { metric: "Net Debt/Equity", ibe: 102.43, nee: 140.29, enel: 130.82, edp: 115.34, median: 135.56, unit: "%" },
  { metric: "Debt/Total Assets", ibe: 44.36, nee: 45.17, enel: 39.31, edp: 41.88, median: 44.31, unit: "%" },
  { metric: "EBITDA/Interest", ibe: 5.78, nee: 3.27, enel: 4.77, edp: 3.85, median: 4.77, unit: "×" },
];

/* ═══════════════════════════════════════════
   CAPACITY EVOLUTION BY TECHNOLOGY (MW)
   ═══════════════════════════════════════════ */
export const capacityEvolution = {
  years: ["2022", "2023", "2024", "2025", "2026E", "2027E", "2028E"],
  series: [
    { name: "Onshore Wind", color: "#059669", values: [20125, 20780, 20747, 21132, 21980, 22542, 23092] },
    { name: "Offshore Wind", color: "#1D4ED8", values: [1258, 1793, 2373, 2516, 3712, 3712, 4235] },
    { name: "Solar PV", color: "#EA580C", values: [4264, 5953, 7796, 8733, 9982, 10457, 10999] },
    { name: "Hydro", color: "#7C3AED", values: [13849, 13103, 13100, 12855, 13265, 13298, 13332] },
    { name: "Nuclear", color: "#94A3B8", values: [3177, 3177, 3177, 3177, 3177, 3177, 3066] },
  ],
};

/* ═══════════════════════════════════════════
   PRODUCTION BY SOURCE (GWh)
   ═══════════════════════════════════════════ */
export const productionEvolution = {
  years: ["2022", "2023", "2024", "2025"],
  series: [
    { name: "Onshore Wind", color: "#059669", values: [45269, 44091, 44530, 43737] },
    { name: "Offshore Wind", color: "#1D4ED8", values: [4497, 5073, 5822, 8080] },
    { name: "Nuclear", color: "#94A3B8", values: [23886, 23784, 22589, 21507] },
    { name: "Gas CCGT", color: "#DC2626", values: [21306, 19440, 13552, 13205] },
  ],
};

/* ═══════════════════════════════════════════
   PEER CAPACITY COMPARISON (MW, latest)
   ═══════════════════════════════════════════ */
export const peerCapacity = {
  wind: [
    { name: "Iberdrola", onshore: 21132, offshore: 2516, color: "#059669" },
    { name: "Enel", onshore: 16184, offshore: 0, color: "#1D4ED8" },
    { name: "RWE", onshore: 9500, offshore: 3515, color: "#EA580C" },
    { name: "Ørsted", onshore: 3737, offshore: 5462, color: "#7C3AED" },
  ],
  solar: [
    { name: "Engie", value: 9572, color: "#059669" },
    { name: "Iberdrola", value: 8733, color: "#1D4ED8" },
    { name: "RWE", value: 7014, color: "#EA580C" },
    { name: "EDP", value: 6960, color: "#7C3AED" },
    { name: "Endesa", value: 2929, color: "#94A3B8" },
  ],
  hydro: [
    { name: "Enel", value: 28320, color: "#059669" },
    { name: "Iberdrola", value: 12855, color: "#1D4ED8" },
    { name: "Verbund", value: 9065, color: "#EA580C" },
    { name: "RWE", value: 465, color: "#7C3AED" },
  ],
};
