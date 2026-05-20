// TMO Valuation — peer growth + multiples dataset
// Sourced from Bloomberg FA / EE screens, May 2026.
// Currencies: TMO + DHR in USD, Sartorius in EUR, Lonza in CHF.
// Multiples are unit-less so currency mix is fine for comparison.

export const peers = [
  { id: "tmo",  name: "Thermo Fisher",   ticker: "TMO US",   currency: "USD", color: "#1D4ED8", isHero: true, marketCap: 165, note: "Full-stack platform" },
  { id: "dhr",  name: "Danaher",         ticker: "DHR US",   currency: "USD", color: "#9333EA",               marketCap: 168, note: "Closest pure-play peer" },
  { id: "srt",  name: "Sartorius AG",    ticker: "SRT GR",   currency: "EUR", color: "#059669",               marketCap: 18,  note: "Bioproduction pure-play" },
  { id: "lonn", name: "Lonza Group",     ticker: "LONN SW",  currency: "CHF", color: "#EA580C",               marketCap: 47,  note: "Largest pure-play CDMO" },
];

export const growthYears   = ["FY25", "FY26", "FY27", "FY28", "FY29"];
export const multipleYears = ["LTM",  "NTM",  "FY26", "FY27", "FY28"];

// Growth metrics — YoY %
export const growthMetrics = [
  { id: "revenue",      label: "Revenue",                group: "Top line",  highlight: true },
  { id: "ebitda",       label: "EBITDA",                 group: "Operating", highlight: true },
  { id: "ebit",         label: "Operating Income (EBIT)", group: "Operating" },
  { id: "epsAdj",       label: "EPS, Adj",               group: "Earnings",  highlight: true },
  { id: "epsGaap",      label: "EPS, GAAP",              group: "Earnings" },
  { id: "netIncAdj",    label: "Net Income, Adj",        group: "Earnings" },
  { id: "netIncGaap",   label: "Net Income, GAAP",       group: "Earnings" },
  { id: "preTax",       label: "Pre-Tax Profit",         group: "Operating" },
  { id: "grossMargin",  label: "Gross Margin %",         group: "Top line" },
  { id: "fcf",          label: "Free Cash Flow",         group: "Cash",      highlight: true },
  { id: "cps",          label: "Cash / Share",           group: "Cash" },
  { id: "dps",          label: "Dividend / Share",       group: "Cash" },
  { id: "bps",          label: "Book Value / Share",     group: "Balance" },
  { id: "netDebt",      label: "Net Debt",               group: "Balance" },
  { id: "roe",          label: "Return on Equity %",     group: "Returns" },
  { id: "roa",          label: "Return on Assets %",     group: "Returns" },
  { id: "depreciation", label: "Depreciation",           group: "Other" },
  { id: "amortization", label: "Amortization",           group: "Other" },
];

// Forward-multiple metrics
export const multipleMetrics = [
  { id: "pe",       label: "P / EPS Adj",  highlight: true,  fmt: "x" },
  { id: "evEbitda", label: "EV / EBITDA",  highlight: true,  fmt: "x" },
  { id: "evRev",    label: "EV / Revenue", highlight: true,  fmt: "x" },
  { id: "evEbit",   label: "EV / EBIT",                       fmt: "x" },
  { id: "evOpp",    label: "EV / OPP",                        fmt: "x" },
  { id: "pb",       label: "P / Book",                        fmt: "x" },
  { id: "pcf",      label: "P / Cash Flow",                   fmt: "x" },
  { id: "divYield", label: "Dividend Yield %",                fmt: "%" },
];

// ─── GROWTH (YoY %)  by peer.metric → [FY25, FY26, FY27, FY28, FY29] ───
// `null` = N.M. / not available
export const growthData = {
  tmo: {
    epsAdj:       [4.62, 8.78, 9.54, 10.16, 11.33],
    epsGaap:      [7.32, 15.65, 15.00, 15.48, 11.36],
    revenue:      [3.91, 7.21, 5.44, 6.07, 5.75],
    grossMargin:  [-1.18, -0.07, 0.94, 0.28, 0.78],
    ebit:         [4.14, 10.18, 7.88, 7.00, 7.38],
    ebitda:       [2.72, 10.20, 8.17, 8.17, 9.55],
    preTax:       [3.19, 8.19, 8.94, 8.52, 9.75],
    netIncAdj:    [3.13, 7.22, 8.87, 8.61, 9.83],
    netIncGaap:   [5.82, 11.39, 13.26, 12.81, 13.62],
    netDebt:      [13.03, -1.52, -15.20, -18.40, -36.14],
    bps:          [9.01, 5.20, 10.60, 9.93, -11.81],
    cps:          [-8.60, 26.92, 15.42, 9.52, null],
    dps:          [13.16, 6.94, 6.01, 9.35, 8.26],
    roe:          [-1.03, 29.84, 1.16, 1.92, 13.50],
    roa:          [-0.10, 21.65, 2.28, 4.08, 0.82],
    depreciation: [-9.17, 11.11, 5.15, 6.87, 12.60],
    amortization: [null, null, -4.64, -8.27, -9.54],
    fcf:          [-13.40, 12.47, 22.48, 6.49, 11.11],
  },
  dhr: {
    epsAdj:       [4.28, 8.21, 7.77, 9.52, 10.56],
    epsGaap:      [-4.91, 25.98, 22.84, 11.94, 10.69],
    revenue:      [2.90, 3.77, 5.66, 6.63, 8.36],
    grossMargin:  [-0.65, 0.57, 0.85, 0.38, 0.80],
    ebit:         [1.45, 6.44, 7.98, 8.77, 10.74],
    ebitda:       [1.69, 6.22, 8.13, 8.80, 10.74],
    preTax:       [0.45, 8.06, 8.24, 9.42, 10.05],
    netIncAdj:    [1.31, 7.94, 8.27, 9.56, 11.46],
    netIncGaap:   [-7.67, 22.54, 29.14, 12.12, 8.55],
    netDebt:      [0.09, -38.21, -48.71, -72.27, null],
    bps:          [7.87, 6.51, 8.36, 7.70, -0.54],
    cps:          [-1.60, 10.28, 7.30, 8.61, null],
    dps:          [18.52, 8.30, 9.20, 4.71, 16.61],
    roe:          [-6.45, 45.18, -1.10, 4.32, 0.60],
    roa:          [-6.72, 23.18, 6.33, 9.52, 6.83],
    depreciation: [4.02, 3.67, 4.57, 5.99, 12.11],
    amortization: [null, null, -2.08, 0.97, 0.08],
    fcf:          [-0.68, 11.99, 10.71, 9.01, 7.20],
  },
  srt: {
    epsAdj:       [18.02, 13.33, 19.59, 19.14, 16.02],
    epsGaap:      [85.07, 67.81, 25.15, 21.91, 17.65],
    revenue:      [4.66, 5.87, 9.65, 9.81, 9.74],
    grossMargin:  [2.59, 2.27, 2.22, 1.49, 1.03],
    ebit:         [38.21, 29.12, 26.51, 17.61, 17.12],
    ebitda:       [11.25, 6.98, 12.83, 12.54, 12.16],
    preTax:       [80.41, 68.84, 38.53, 21.54, 20.97],
    netIncAdj:    [18.15, 8.10, 21.51, 19.30, 18.35],
    netIncGaap:   [84.40, 65.08, 27.12, 21.89, 17.89],
    netDebt:      [-1.88, -8.62, -10.44, -8.10, -31.81],
    bps:          [6.16, 11.46, 21.09, 21.95, -10.32],
    cps:          [-14.45, 13.17, 16.95, 5.26, 8.11],
    dps:          [0.00, 24.40, 16.58, 12.11, 34.24],
    roe:          [62.87, 87.61, 9.36, 9.17, -7.63],
    roa:          [84.67, 63.30, 5.39, 15.99, 24.04],
    depreciation: [3.46, -10.44, 11.40, 9.48, 9.93],
    amortization: [null, null, 4.02, 2.32, 8.15],
    fcf:          [-39.89, 115.33, 32.90, 24.26, 23.69],
  },
  lonn: {
    epsAdj:       [0.13, 18.32, 20.33, 15.97, 21.68],
    epsGaap:      [51.46, 22.74, 20.81, 18.36, 22.83],
    revenue:      [15.96, -5.07, 11.49, 12.33, 11.94],
    grossMargin:  [-7.79, 22.34, 1.99, 1.84, 1.48],
    ebit:         [13.25, 21.31, 17.63, 16.33, 18.90],
    ebitda:       [22.33, 0.03, 14.65, 13.83, 17.55],
    preTax:       [0.47, 13.90, 20.20, 16.49, 15.55],
    netIncAdj:    [-1.31, 17.93, 20.52, 15.38, 22.35],
    netIncGaap:   [49.21, 21.71, 21.98, 18.14, 23.16],
    netDebt:      [2.67, -28.08, -8.58, -19.17, -45.92],
    bps:          [-14.68, 14.33, 10.46, 12.69, 9.97],
    cps:          [-9.22, 49.68, 11.94, 16.14, 25.76],
    dps:          [25.00, 9.14, 14.20, 12.06, 7.96],
    roe:          [null, null, 10.35, 3.97, 5.38],
    roa:          [null, null, 20.40, 13.66, 0.24],
    depreciation: [0.85, 29.19, 9.51, 7.01, 8.33],
    amortization: [null, null, 3.22, -9.94, -1.91],
    fcf:          [-111.11, null, 50.04, 34.95, 31.02],
  },
};

// ─── MULTIPLES  by peer.metric → [LTM, NTM, FY26, FY27, FY28] ───
export const multiplesData = {
  tmo: {
    pe:       [19.34, 17.61, 18.00, 16.43, 14.92],
    pb:       [3.20, 3.31, 3.00, 2.71, 2.47],
    pcf:      [20.33, 16.62, 17.01, 14.74, 13.46],
    evRev:    [4.57, 4.27, 4.32, 4.10, 3.86],
    evEbitda: [19.29, 16.35, 16.79, 15.52, 14.35],
    evEbit:   [26.15, 17.38, 18.57, 17.18, 15.88],
    evOpp:    [26.15, 17.38, 18.54, 17.18, 16.06],
    divYield: [0.39, 0.41, 0.41, 0.44, 0.48],
  },
  dhr: {
    pe:       [20.93, 19.56, 19.79, 18.36, 16.77],
    pb:       [2.23, 2.19, 2.11, 1.95, 1.81],
    pcf:      [18.42, 16.94, 16.83, 15.68, 14.44],
    evRev:    [5.34, 5.13, 5.19, 4.91, 4.60],
    evEbitda: [18.25, 15.79, 16.04, 14.84, 13.64],
    evEbit:   [27.78, 17.69, 17.90, 16.59, 15.24],
    evOpp:    [27.78, 17.69, 17.90, 16.58, 15.24],
    divYield: [0.81, 0.86, 0.83, 0.91, 0.95],
  },
  srt: {
    pe:       [46.09, 38.76, 40.67, 34.01, 28.54],
    pb:       [5.62, 5.33, 5.04, 4.16, 3.41],
    pcf:      [22.71, null, 20.49, 17.52, 16.65],
    evRev:    [5.61, 5.22, 5.32, 4.85, 4.42],
    evEbitda: [19.38, 17.43, 17.72, 15.70, 13.95],
    evEbit:   [32.92, 22.70, 28.44, 22.48, 19.12],
    evOpp:    [32.92, 22.70, 28.44, 22.48, 19.12],
    divYield: [null, 0.40, 0.41, 0.48, 0.54],
  },
  lonn: {
    pe:       [32.50, 27.62, 27.48, 22.84, 19.69],
    pb:       [null, 3.71, 3.79, 3.43, 3.05],
    pcf:      [29.24, 18.65, 19.56, 17.47, 15.04],
    evRev:    [5.80, 5.19, 5.23, 4.69, 4.18],
    evEbitda: [18.46, 16.25, 16.22, 14.15, 12.43],
    evEbit:   [30.57, 23.70, 23.33, 19.84, 17.05],
    evOpp:    [30.57, 23.70, 23.42, 19.91, 17.12],
    divYield: [null, null, 1.12, 1.28, 1.43],
  },
};
