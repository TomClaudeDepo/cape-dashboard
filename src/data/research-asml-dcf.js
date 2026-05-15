// ASML DCF Model — Interactive parameters derived from Morgan Stanley research model
// Source: Morgan Stanley Equity Research, Lee Simpson et al., dated 16 Apr 2026
// Currency: EUR. All revenue / cash flow figures in € millions unless noted.

export const dcfDefaults = {
  // Last actual revenue (FY2025, €m) — base year for projections
  revenueActuals: { 2023: 27558.5, 2024: 28262.9, 2025: 32667.2 },

  // Year-by-year revenue growth (2026E → 2035E)
  // FY26–FY28E anchored to Morgan Stanley model; FY29+ extends through cycle to terminal
  revenueGrowth: [0.153, 0.274, -0.140, 0.180, 0.130, 0.110, 0.090, 0.075, 0.060, 0.050],

  // EBIT margin (reported, before adjustments) — MS has 36.3% / 42.2% / 38.7% for 26–28E
  ebitMargin: [0.363, 0.422, 0.387, 0.400, 0.410, 0.420, 0.420, 0.420, 0.420, 0.420],

  // D&A as % of revenue — runs around 2.4–2.6% in projection
  daPercent: [0.026, 0.024, 0.024, 0.025, 0.025, 0.025, 0.025, 0.025, 0.025, 0.025],

  // Capex as % of revenue — MS uses 5% from FY27 onwards
  capexPercent: [0.062, 0.050, 0.050, 0.050, 0.050, 0.050, 0.050, 0.050, 0.050, 0.050],

  // Tax & working capital
  taxRate: 0.165,        // MS: 16.8% (26E), 15.5% (27/28E); ASML guided low-to-mid teens
  nwcPercent: 0.025,     // Change in NWC as % of revenue change

  // WACC — base case
  riskFreeRate: 0.025,   // German 10Y Bund area
  erp: 0.050,            // Standard equity risk premium
  beta: 1.20,            // ASML 5Y beta ~1.1–1.3
  preTaxCostOfDebt: 0.035,
  equityWeight: 0.95,    // ASML carries net cash; nominal D/E weight
  debtWeight: 0.05,

  // Terminal
  terminalGrowth: 0.025, // ~LT euro-area nominal GDP

  // Share data (FY2025 weighted basic)
  sharesOutstanding: 384,
  currentPrice: 1230,    // EUR, as of 16 Apr 2026 per MS
  netDebt: -8931,        // €m — NEGATIVE because ASML has net cash (FY2025: €8.9B net cash)
  minorityInterest: 0,
};

export const years = ["FY2026E", "FY2027E", "FY2028E", "FY2029E", "FY2030E", "FY2031E", "FY2032E", "FY2033E", "FY2034E", "FY2035E"];

export const valuationMethods = [
  { method: "DCF (Base Case)", commentary: "10-year explicit; Gordon Growth TV; ±50bps WACC band" },
  { method: "Morgan Stanley Target", commentary: "€1,400 (Overweight) — DCF + PER blend" },
  { method: "Forward P/E", commentary: "32–40x FY27E EPS of €31; cycle-peak earnings power" },
  { method: "EV/EBITDA", commentary: "22–28x FY27E EBITDA on €21.4bn" },
  { method: "Sum-of-parts", commentary: "EUV (70%) + DUV/IBM (30%); rarely used given EUV monopoly" },
];

export const keyAssumptions = [
  "Revenue path follows the lithography cycle: FY27 peak at €48bn (+27%), FY28 air-pocket at -14% as High-NA digestion plays out, then mid-teens recovery into 2029",
  "EBIT margin reaches 42% at peak FY27 on mix and operating leverage; settles at 40% terminal as High-NA ASP and service-mix tailwinds mature",
  "Capex held at 5% of sales (MS assumption) — facility build-out for High-NA largely complete by FY26; mostly capacity maintenance thereafter",
  "WACC ~8.2% reflecting 1.20 beta, 5.0% ERP, 2.5% Bund, and effectively all-equity-funded balance sheet",
  "Terminal growth of 2.5% — lithography intensity in fabs grows above GDP but TV anchored to long-run euro nominal GDP for conservatism",
  "Tax rate of 16.5% (Dutch innovation box benefit); slight uplift from current 17% as global minimum tax phases in",
  "Net cash of €8.9bn at FY25 acts as a credit to equity value (reduces enterprise value bridge)",
];

// Compute DCF from assumptions
export function computeDCF(params) {
  const p = { ...dcfDefaults, ...params };
  const n = 10;

  // Cost of equity (CAPM)
  const costOfEquity = p.riskFreeRate + p.beta * p.erp;
  const afterTaxDebt = p.preTaxCostOfDebt * (1 - p.taxRate);
  const wacc = p.equityWeight * costOfEquity + p.debtWeight * afterTaxDebt;

  // Build projections
  const baseRevenue = p.revenueActuals[2025] || 32667.2;
  const rows = [];

  for (let i = 0; i < n; i++) {
    const revGrowth = p.revenueGrowth[i];
    const revenue = i === 0 ? baseRevenue * (1 + revGrowth) : rows[i - 1].revenue * (1 + revGrowth);
    const ebitMarginVal = p.ebitMargin[i];
    const ebit = revenue * ebitMarginVal;
    const da = revenue * p.daPercent[i];
    const capex = revenue * p.capexPercent[i];
    const revDelta = i === 0 ? revenue - baseRevenue : revenue - rows[i - 1].revenue;
    const nwc = revDelta * p.nwcPercent;
    const nopat = ebit * (1 - p.taxRate);
    const ufcf = nopat + da - capex - nwc;
    const discountFactor = 1 / Math.pow(1 + wacc, i + 1);
    const pvUfcf = ufcf * discountFactor;

    rows.push({
      year: years[i], yearNum: i + 1,
      revenue, revGrowth, ebitMargin: ebitMarginVal, ebit,
      da, capex, nwc, nopat, ufcf,
      ufcfMargin: ufcf / revenue,
      discountFactor, pvUfcf,
    });
  }

  // Terminal value (Gordon Growth)
  const terminalUFCF = rows[n - 1].ufcf;
  const tv = (terminalUFCF * (1 + p.terminalGrowth)) / (wacc - p.terminalGrowth);
  const pvTV = tv / Math.pow(1 + wacc, n);

  // Valuation bridge
  const sumPvUFCF = rows.reduce((s, r) => s + r.pvUfcf, 0);
  const ev = sumPvUFCF + pvTV;
  // Equity = EV - net debt - minority. Net debt is NEGATIVE here (net cash), so this adds cash back.
  const equityValue = ev - p.netDebt - p.minorityInterest;
  const impliedPrice = equityValue / p.sharesOutstanding;
  const upside = (impliedPrice - p.currentPrice) / p.currentPrice;
  const tvPctEV = pvTV / ev;

  // Sensitivity grids — WACC (x) × Terminal Growth (y)
  const waccRange = [-0.015, -0.01, -0.005, 0, 0.005, 0.01, 0.015];
  const tgRange = [0.015, 0.02, 0.025, 0.03, 0.035];
  const sensitivity = tgRange.map(tg =>
    waccRange.map(wDelta => {
      const w = wacc + wDelta;
      const tvS = (terminalUFCF * (1 + tg)) / (w - tg);
      const pvTVS = tvS / Math.pow(1 + w, n);
      const sumPvS = rows.reduce((s, r, idx) => s + r.ufcf / Math.pow(1 + w, idx + 1), 0);
      const evS = sumPvS + pvTVS;
      return (evS - p.netDebt) / p.sharesOutstanding;
    })
  );

  return {
    rows, wacc, costOfEquity, afterTaxDebt,
    terminalUFCF, tv, pvTV, tvPctEV,
    sumPvUFCF, ev, equityValue, impliedPrice, upside,
    sensitivity, waccRange: waccRange.map(d => wacc + d), tgRange,
  };
}
