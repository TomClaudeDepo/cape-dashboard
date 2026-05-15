/* ASML Valuation tab — data
   Sources: Bloomberg consensus screens, EQRV peer set, BI Generative AI Val index.
   All figures EUR. Snapshot as at 15-May-2026. */

export const snapshot = {
  price: "€1,308",
  fwdPE_4q: "38.1x",
  fwdPE_27: "31.7x",
  fwdEV_EBITDA_27: "25.5x",
  premiumToPeers: "+10%",
  roic: "47.9%",
  roe: "52.4%",
  divYield: "0.57%",
};

export const headlineGrowth = [
  { period: "FY25 Act", eps: 28.43, rev: 15.58, ebit: 25.26, ebitda: 23.99, ni: 26.91 },
  { period: "FY26E", eps: 27.08, rev: 19.89, ebit: 25.77, ebitda: 23.44, ni: 27.67 },
  { period: "FY27E", eps: 31.18, rev: 20.96, ebit: 31.21, ebitda: 29.52, ni: 29.58 },
  { period: "FY28E", eps: 15.01, rev: 9.73, ebit: 13.67, ebitda: 12.67, ni: 13.63 },
  { period: "FY29E", eps: 16.50, rev: 10.27, ebit: 12.95, ebitda: 12.43, ni: 12.25 },
];

export const multiples = [
  { label: "P/E Adj+", trailing: 50.64, fwd4q: 38.12, fy26: 41.72, fy27: 31.80, fy28: 27.65 },
  { label: "P/Book", trailing: 24.41, fwd4q: 24.19, fy26: 21.09, fy27: 15.65, fy28: 11.81 },
  { label: "P/CF", trailing: 48.08, fwd4q: null, fy26: 40.63, fy27: 30.18, fy28: 26.00 },
  { label: "EV/Revenue", trailing: 14.92, fwd4q: 12.07, fy26: 12.84, fy27: 10.61, fy28: 9.67 },
  { label: "EV/EBITDA", trailing: 39.39, fwd4q: 30.91, fy26: 33.04, fy27: 25.51, fy28: 22.64 },
  { label: "EV/EBIT", trailing: 42.90, fwd4q: 32.64, fy26: 35.22, fy27: 26.68, fy28: 23.68 },
];

/* Earnings revision time series — approximated from Bloomberg EE chart over 3Y. */
export const revisionSeries = [
  { date: "2023-05", price: 600, eps26: 33.4, eps27: null, eps28: null },
  { date: "2023-08", price: 575, eps26: 33.2, eps27: null, eps28: null },
  { date: "2023-11", price: 620, eps26: 33.1, eps27: 38.0, eps28: null },
  { date: "2024-02", price: 830, eps26: 34.2, eps27: 39.5, eps28: null },
  { date: "2024-05", price: 855, eps26: 34.8, eps27: 40.2, eps28: 45.0 },
  { date: "2024-08", price: 835, eps26: 34.5, eps27: 38.5, eps28: 45.8 },
  { date: "2024-11", price: 660, eps26: 32.8, eps27: 36.2, eps28: 46.0 },
  { date: "2025-02", price: 700, eps26: 28.4, eps27: 33.4, eps28: 44.8 },
  { date: "2025-05", price: 700, eps26: 27.0, eps27: 33.0, eps28: 44.6 },
  { date: "2025-08", price: 615, eps26: 25.8, eps27: 32.6, eps28: 43.8 },
  { date: "2025-11", price: 620, eps26: 25.9, eps27: 33.0, eps28: 44.0 },
  { date: "2026-02", price: 900, eps26: 26.5, eps27: 34.4, eps28: 44.6 },
  { date: "2026-04", price: 1180, eps26: 28.8, eps27: 37.5, eps28: 45.8 },
  { date: "2026-05", price: 1308, eps26: 31.4, eps27: 41.2, eps28: 47.4 },
];

/* Direct semicap peer profitability — BI Generative AI Val index */
export const directPeers = [
  { ticker: "ASML",  name: "ASML",            salesG: 9.70,  ebitdaG: 12.91, ebitdaM: 38.03, opM: 34.93, niG: 15.11, npm: 29.82, capex: 4.82, roic: 47.85, roa: 21.48, roe: 52.42, isMe: true },
  { ticker: "ASMI",  name: "ASM Intl",        salesG: 2.03,  ebitdaG: 10.84, ebitdaM: 37.72, opM: 29.81, niG: 30.66, npm: 26.08, capex: 6.89, roic: 13.93, roa: 15.20, roe: 20.98 },
  { ticker: "LRCX",  name: "Lam Research",    salesG: 26.53, ebitdaG: 39.58, ebitdaM: 36.50, opM: 34.56, niG: 45.22, npm: 31.08, capex: 4.12, roic: 46.39, roa: 33.07, roe: 67.07 },
  { ticker: "AMAT",  name: "Applied Mats",    salesG: 3.33,  ebitdaG: 6.32,  ebitdaM: 32.13, opM: 30.44, niG: 4.58,  npm: 27.17, capex: 7.97, roic: 21.33, roa: 21.33, roe: 36.79 },
  { ticker: "ALAB",  name: "Astera Labs",     salesG: 104.18,ebitdaG: null,  ebitdaM: 23.40, opM: 22.46, niG: 525.09,npm: 25.84, capex: 4.40, roic: 16.99, roa: 18.61, roe: 20.41 },
];
export const peerMedian = { salesG: 25.49, ebitdaG: 26.33, ebitdaM: 36.75, opM: 31.78, niG: 30.66, npm: 26.69, capex: 4.36, roic: 22.04, roa: 18.16, roe: 33.01 };

/* Wider AI ecosystem comp set — EQRV (26 securities). EUR. */
export const widePeers = [
  { ticker: "ASML",   name: "ASML Holding",        group: "Semicap",     mcap: 507076,  evEbitdaFY1: 32.95, peFY1: 41.60, peFY2: 31.71, divYld: 0.57, isMe: true },
  { ticker: "ASMI",   name: "ASM International",   group: "Semicap",     mcap: 42501,   evEbitdaFY1: 27.97, peFY1: 39.67, peFY2: 32.18, divYld: 0.38 },
  { ticker: "LRCX",   name: "Lam Research",        group: "Semicap",     mcap: 322008,  evEbitdaFY1: 43.30, peFY1: 52.71, peFY2: 38.06, divYld: 0.34 },
  { ticker: "AMAT",   name: "Applied Materials",   group: "Semicap",     mcap: 300941,  evEbitdaFY1: 32.04, peFY1: 37.89, peFY2: 28.94, divYld: 0.42 },
  { ticker: "BESI",   name: "BE Semi",             group: "Semicap",     mcap: 21131,   evEbitdaFY1: 52.24, peFY1: 68.10, peFY2: 45.37, divYld: 0.61 },
  { ticker: "ALAB",   name: "Astera Labs",         group: "Semicap",     mcap: 33733,   evEbitdaFY1: 77.40, peFY1: 76.29, peFY2: 54.88, divYld: null },
  { ticker: "2330",   name: "TSMC",                group: "Semi",        mcap: 1602645, evEbitdaFY1: 14.95, peFY1: 23.11, peFY2: 18.44, divYld: 0.91 },
  { ticker: "AMD",    name: "AMD",                 group: "Semi",        mcap: 631159,  evEbitdaFY1: 52.97, peFY1: 61.78, peFY2: 34.96, divYld: null },
  { ticker: "SKH",    name: "SK Hynix",            group: "Semi",        mcap: 748136,  evEbitdaFY1: 4.94,  peFY1: 6.69,  peFY2: 4.92,  divYld: 0.16 },
  { ticker: "MU",     name: "Micron",              group: "Semi",        mcap: 753256,  evEbitdaFY1: 9.85,  peFY1: 13.19, peFY2: 7.52,  divYld: 0.06 },
  { ticker: "ARM",    name: "Arm Holdings",        group: "Semi",        mcap: 208872,  evEbitdaFY1: 87.63, peFY1: 103.39,peFY2: 74.80, divYld: null },
  { ticker: "QCOM",   name: "Qualcomm",            group: "Semi",        mcap: 181515,  evEbitdaFY1: 14.95, peFY1: 18.67, peFY2: 18.96, divYld: 1.78 },
  { ticker: "MRVL",   name: "Marvell",             group: "Semi",        mcap: 141018,  evEbitdaFY1: 40.37, peFY1: 47.75, peFY2: 33.24, divYld: 0.13 },
  { ticker: "AVGO",   name: "Broadcom",            group: "Semi",        mcap: 1792270, evEbitdaFY1: 29.53, peFY1: 38.98, peFY2: 24.54, divYld: 0.56 },
  { ticker: "NVDA",   name: "NVIDIA",              group: "Semi",        mcap: 4914992, evEbitdaFY1: 22.78, peFY1: 28.01, peFY2: 20.63, divYld: 0.02 },
  { ticker: "SMSN",   name: "Samsung Elec",        group: "Semi",        mcap: 912338,  evEbitdaFY1: 3.95,  peFY1: 6.55,  peFY2: 5.00,  divYld: 0.61 },
  { ticker: "AAPL",   name: "Apple",               group: "AI Ecosystem",mcap: 3769940, evEbitdaFY1: 25.51, peFY1: 31.07, peFY2: 31.07, divYld: 0.35 },
  { ticker: "AMZN",   name: "Amazon",              group: "AI Ecosystem",mcap: 2474191, evEbitdaFY1: 13.98, peFY1: 25.91, peFY2: 22.85, divYld: null },
  { ticker: "ORCL",   name: "Oracle",              group: "AI Ecosystem",mcap: 484234,  evEbitdaFY1: 18.98, peFY1: 26.15, peFY2: 24.33, divYld: 1.02 },
  { ticker: "ANET",   name: "Arista Networks",     group: "AI Ecosystem",mcap: 160202,  evEbitdaFY1: 31.64, peFY1: 40.66, peFY2: 33.43, divYld: null },
  { ticker: "MSFT",   name: "Microsoft",           group: "AI Ecosystem",mcap: 2617855, evEbitdaFY1: 15.52, peFY1: 24.08, peFY2: 21.09, divYld: 0.85 },
  { ticker: "GOOGL",  name: "Alphabet",            group: "AI Ecosystem",mcap: 4162898, evEbitdaFY1: 20.82, peFY1: 27.95, peFY2: 26.24, divYld: 0.21 },
  { ticker: "SNOW",   name: "Snowflake",           group: "AI Ecosystem",mcap: 44859,   evEbitdaFY1: 54.95, peFY1: 82.97, peFY2: 60.86, divYld: null },
  { ticker: "DELL",   name: "Dell Technologies",   group: "AI Ecosystem",mcap: 138597,  evEbitdaFY1: 12.69, peFY1: 19.01, peFY2: 16.60, divYld: 0.89 },
  { ticker: "PLTR",   name: "Palantir",            group: "AI Ecosystem",mcap: 275945,  evEbitdaFY1: 68.57, peFY1: 91.72, peFY2: 65.04, divYld: null },
  { ticker: "VRT",    name: "Vertiv Holdings",     group: "AI Ecosystem",mcap: 124387,  evEbitdaFY1: 43.04, peFY1: 58.64, peFY2: 43.85, divYld: 0.05 },
];

/* Premium to peers — BF P/E vs comps avg, 2Y series.
   Approximated from EQRV Premium-to-Whole-Firm-Comps chart. */
export const premiumSeries = [
  { date: "2024-06", asml: 39.5, comps: 35.8 },
  { date: "2024-07", asml: 41.0, comps: 37.5 },
  { date: "2024-08", asml: 38.5, comps: 35.5 },
  { date: "2024-09", asml: 35.0, comps: 32.5 },
  { date: "2024-10", asml: 29.0, comps: 28.2 },
  { date: "2024-11", asml: 27.5, comps: 27.0 },
  { date: "2024-12", asml: 26.5, comps: 26.0 },
  { date: "2025-01", asml: 27.0, comps: 26.5 },
  { date: "2025-02", asml: 28.5, comps: 27.8 },
  { date: "2025-03", asml: 24.5, comps: 24.0 },
  { date: "2025-04", asml: 25.0, comps: 24.8 },
  { date: "2025-05", asml: 26.5, comps: 25.5 },
  { date: "2025-06", asml: 27.0, comps: 26.0 },
  { date: "2025-07", asml: 28.5, comps: 27.2 },
  { date: "2025-08", asml: 30.0, comps: 28.5 },
  { date: "2025-09", asml: 32.0, comps: 30.0 },
  { date: "2025-10", asml: 34.5, comps: 31.5 },
  { date: "2025-11", asml: 37.0, comps: 33.5 },
  { date: "2025-12", asml: 40.0, comps: 36.0 },
  { date: "2026-01", asml: 38.5, comps: 35.0 },
  { date: "2026-02", asml: 35.0, comps: 32.0 },
  { date: "2026-03", asml: 33.5, comps: 31.0 },
  { date: "2026-04", asml: 36.5, comps: 33.0 },
  { date: "2026-05", asml: 37.4, comps: 33.9 },
];

export const valSummary = "Three things are happening at once. Earnings estimates for 2026, 2027 and 2028 have all turned sharply higher since October 2025, with consensus 2027 EPS up roughly 25% in seven months. Forward growth is genuinely strong, with revenue compounding around 20% in 2026 and 2027 before settling into low double digits. And on quality, ASML still prints the highest ROIC and ROE in its direct peer set despite slower near-term sales growth than Lam or the broader index median. The premium versus the BI Generative AI peer set is currently ~10% on forward P/E, in line with the two-year average and well below the spike seen in late 2024.";

export const bottomLine = "The setup is unusually clean. Earnings revisions are positive across the curve, the forward multiple compresses meaningfully on growth (38x next-twelve-months falling to 28x on FY28E), and the quality metrics versus direct peers remain among the strongest in the sector. The premium to broader AI infrastructure peers is modest given ASML's monopoly position in EUV and the structural visibility into 2027-28 from backlog. The harder questions sit on the demand side, covered in the AI Demand Map tab, not on valuation.";
