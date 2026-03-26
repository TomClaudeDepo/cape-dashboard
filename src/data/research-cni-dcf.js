// CN Rail DCF Model — Interactive data extracted from CN_Rail_DCF_Model.xlsx

export const dcfDefaults = {
  // Revenue assumptions
  revenueActuals: { 2023: 16811, 2024: 17047, 2025: 17300 },
  revenueGrowth: [0.02, 0.04, 0.045, 0.045, 0.04, 0.035, 0.035, 0.03, 0.03, 0.03],

  // Operating metrics
  operatingRatio: [0.612, 0.605, 0.598, 0.594, 0.59, 0.588, 0.586, 0.585, 0.585, 0.585],

  // D&A
  daPercent: [0.098, 0.096, 0.095, 0.094, 0.093, 0.092, 0.092, 0.092, 0.092, 0.092],

  // Capex
  capexPercent: [0.16, 0.17, 0.175, 0.178, 0.18, 0.18, 0.18, 0.18, 0.18, 0.18],

  // Tax & NWC
  taxRate: 0.255,
  nwcPercent: 0.02,

  // WACC
  riskFreeRate: 0.032,
  erp: 0.055,
  beta: 0.85,
  preTaxCostOfDebt: 0.042,
  equityWeight: 0.82,
  debtWeight: 0.18,

  // Terminal
  terminalGrowth: 0.025,

  // Share data
  sharesOutstanding: 620,
  currentPrice: 141,
  netDebt: 16500,
  minorityInterest: 0,
};

export const years = ["FY2026E", "FY2027E", "FY2028E", "FY2029E", "FY2030E", "FY2031E", "FY2032E", "FY2033E", "FY2034E", "FY2035E"];

export const valuationMethods = [
  { method: "DCF (Base Case)", commentary: "Gordon Growth TV; WACC range ±50bps" },
  { method: "Forward P/E", commentary: "17x / 19.5x / 22x FY2026E EPS of C$8.17" },
  { method: "EV/EBITDA", commentary: "10.5x / 12.0x / 13.5x FY2026E EBITDA" },
  { method: "Dividend Discount (DDM)", commentary: "4%/5%/6% div growth; Ke from CAPM ±50bps" },
  { method: "Morningstar Fair Value", commentary: "~US$123 ≈ C$171 at 0.72 FX" },
];

export const keyAssumptions = [
  "Revenue CAGR of ~3.5% (FY2026-2035), driven by potash ramp, intermodal recovery, and pricing",
  "Operating ratio improving from 61.2% to 58.5% terminal (industry floor ~high 58s per consensus)",
  "Capex declining from 21% to 18% of revenue as major projects complete",
  "WACC of ~7.0% reflecting 0.85 beta, 5.5% ERP, 3.2% risk-free rate",
  "Terminal growth of 2.5% (long-term nominal GDP; CN is inflation-protected via pricing escalators)",
  "Tax rate held flat at 25.5% (Canadian statutory); no material tax structure changes assumed",
  "Net debt of C$16.5B; management targets return to 2.5x leverage by 2027",
];

// Calculate DCF from assumptions
export function computeDCF(params) {
  const p = { ...dcfDefaults, ...params };
  const n = 10;

  // Cost of equity (CAPM)
  const costOfEquity = p.riskFreeRate + p.beta * p.erp;
  const afterTaxDebt = p.preTaxCostOfDebt * (1 - p.taxRate);
  const wacc = p.equityWeight * costOfEquity + p.debtWeight * afterTaxDebt;

  // Build projections
  let baseRevenue = p.revenueActuals[2025] || 17300;
  const rows = [];

  for (let i = 0; i < n; i++) {
    const revGrowth = p.revenueGrowth[i];
    const revenue = i === 0 ? baseRevenue * (1 + revGrowth) : rows[i - 1].revenue * (1 + revGrowth);
    const or = p.operatingRatio[i];
    const ebitMargin = 1 - or;
    const ebit = revenue * ebitMargin;
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
      revenue, revGrowth, or, ebitMargin, ebit,
      da, capex, nwc, nopat, ufcf,
      ufcfMargin: ufcf / revenue,
      discountFactor, pvUfcf,
    });
  }

  // Terminal value
  const terminalUFCF = rows[n - 1].ufcf;
  const tv = (terminalUFCF * (1 + p.terminalGrowth)) / (wacc - p.terminalGrowth);
  const pvTV = tv / Math.pow(1 + wacc, n);

  // Valuation
  const sumPvUFCF = rows.reduce((s, r) => s + r.pvUfcf, 0);
  const ev = sumPvUFCF + pvTV;
  const equityValue = ev - p.netDebt - p.minorityInterest;
  const impliedPrice = equityValue / p.sharesOutstanding;
  const upside = (impliedPrice - p.currentPrice) / p.currentPrice;
  const tvPctEV = pvTV / ev;

  // Sensitivity grids
  const waccRange = [-0.01, -0.005, 0, 0.005, 0.01, 0.015, 0.02];
  const tgRange = [0.015, 0.02, 0.025, 0.03, 0.035];
  const sensitivity = tgRange.map(tg =>
    waccRange.map(wDelta => {
      const w = wacc + wDelta;
      const tvS = (terminalUFCF * (1 + tg)) / (w - tg);
      const pvTVS = tvS / Math.pow(1 + w, n);
      // Recalculate PV of UFCFs with new WACC
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
