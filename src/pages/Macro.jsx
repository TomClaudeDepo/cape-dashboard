import { useState, useEffect, useRef, useMemo } from "react";

const LIGHT = {
  capRed: "#831011", red300: "#C85657", red100: "#FAF0F0",
  white: "#FFFFFF", black: "#000000", beige: "#F5F2E6", beige50: "#FFFDF6",
  purple: "#403050", purple300: "#746188", purple200: "#B1A2C1",
  green: "#044049", green300: "#458C88", green100: "#F0F8F6",
  grey800: "#4C4F56", grey400: "#ADB2BA", grey200: "#DCDFE5",
  grey100: "#EEF0F4", grey50: "#FAFBFE",
  orange: "#C66A37", deepBlue: "#105782", skyBlue: "#9FDAFF",
  bg: "#F5F2E6", card: "#FFFFFF", border: "#E4DFC8",
  text: "#1A1A18", textSec: "#4C4F56", textTer: "#ADB2BA",
  accent: "#831011", pillBg: "#EEF0F4",
  greenBg: "#F0F8F6", redBg: "#FAF0F0",
};

const DARK = {
  ...LIGHT,
  capRed: "#C85657", red100: "#2A1212",
  white: "#161618", black: "#E8E6E1",
  beige: "#0E0E10", beige50: "#161618",
  purple: "#B1A2C1", green: "#458C88", green300: "#458C88",
  green100: "#0D1F1E",
  grey800: "#D0CEC8", grey400: "#7A7870",
  grey200: "#2A2A2E", grey100: "#202024", grey50: "#1A1A1E",
  bg: "#0E0E10", card: "#161618", border: "#2A2A2E",
  text: "#E8E6E1", textSec: "#B0AEA8", textTer: "#6A6862",
  accent: "#C85657", pillBg: "#232328",
  greenBg: "#0D1F1E", redBg: "#2A1212",
};

const Fs = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const Fn = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const Fh = "'Playfair Display', Georgia, 'Times New Roman', serif";

function hexRgba(hex, a) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}

function simSeries(base, vol, freq, pts) {
  const now = new Date();
  const d = [];
  for (let i = pts - 1; i >= 0; i--) {
    const dt = new Date(now);
    if (freq === "Q") dt.setMonth(dt.getMonth() - i * 3);
    else if (freq === "W") dt.setDate(dt.getDate() - i * 7);
    else if (freq === "D") dt.setDate(dt.getDate() - i);
    else dt.setMonth(dt.getMonth() - i);
    const val = base + (Math.random() - 0.5) * vol * 2 + Math.sin(i / 10) * vol * 0.25;
    d.push({ date: dt.toISOString().slice(0, 10), value: +(val.toFixed(3)) });
  }
  return d;
}

function gPts(f) {
  if (f === "Q") return 28;
  if (f === "D") return 120;
  if (f === "W") return 78;
  return 72;
}

function fmtV(v) {
  if (v == null) return "—";
  const a = Math.abs(v);
  if (a >= 1e6) return (v / 1e6).toFixed(1) + "M";
  if (a >= 1e4) return (v / 1e3).toFixed(0) + "K";
  if (a >= 1e3) return (v / 1e3).toFixed(1) + "K";
  if (a >= 100) return v.toFixed(a % 1 === 0 ? 0 : 1);
  if (a >= 10) return v.toFixed(1);
  return v.toFixed(2);
}

// ── INDICATORS ─────────────────────────────────────────────────

const US = [
  { id: "us_gdp", label: "Real GDP Growth", sub: "Annualised QoQ", fred: "A191RL1Q225SBEA", freq: "Q", unit: "%", cat: "Growth & Output", base: 2.8, vol: 1.2 },
  { id: "us_gdp_lv", label: "Real GDP Level", sub: "Bn chained 2017$", fred: "GDPC1", freq: "Q", unit: "$Bn", cat: "Growth & Output", base: 23200, vol: 200 },
  { id: "us_indpro", label: "Industrial Production", sub: "Idx 2017=100", fred: "INDPRO", freq: "M", unit: "Idx", cat: "Growth & Output", base: 103.5, vol: 1.5 },
  { id: "us_indpro_y", label: "Industrial Prod YoY", sub: "% chg yr ago", fred: "INDPRO", freq: "M", unit: "%", cat: "Growth & Output", base: 1.4, vol: 2.0 },
  { id: "us_cap", label: "Capacity Utilisation", sub: "% of capacity", fred: "TCU", freq: "M", unit: "%", cat: "Growth & Output", base: 77.8, vol: 1.5 },
  { id: "us_dur", label: "Durable Goods Orders", sub: "Millions $", fred: "DGORDER", freq: "M", unit: "$M", cat: "Growth & Output", base: 290000, vol: 12000 },
  { id: "us_ret", label: "Retail Sales", sub: "Millions $", fred: "RSAFS", freq: "M", unit: "$M", cat: "Growth & Output", base: 720000, vol: 15000 },
  { id: "us_ret_y", label: "Retail Sales YoY", sub: "% chg yr ago", fred: "RSAFS", freq: "M", unit: "%", cat: "Growth & Output", base: 3.2, vol: 1.8 },
  { id: "us_pinc", label: "Personal Income", sub: "Bn $", fred: "PI", freq: "M", unit: "$Bn", cat: "Growth & Output", base: 24000, vol: 200 },
  { id: "us_sav", label: "Personal Saving Rate", sub: "% disp income", fred: "PSAVERT", freq: "M", unit: "%", cat: "Growth & Output", base: 4.6, vol: 1.0 },
  { id: "us_cpi", label: "CPI Headline YoY", sub: "All items SA", fred: "CPIAUCSL", freq: "M", unit: "%", cat: "Inflation", base: 2.9, vol: 0.6 },
  { id: "us_ccpi", label: "Core CPI YoY", sub: "Ex food & energy", fred: "CPILFESL", freq: "M", unit: "%", cat: "Inflation", base: 3.2, vol: 0.4 },
  { id: "us_pce", label: "PCE Price Index YoY", sub: "Fed preferred", fred: "PCEPI", freq: "M", unit: "%", cat: "Inflation", base: 2.5, vol: 0.5 },
  { id: "us_cpce", label: "Core PCE YoY", sub: "Ex food & energy", fred: "PCEPILFE", freq: "M", unit: "%", cat: "Inflation", base: 2.8, vol: 0.3 },
  { id: "us_ppi", label: "PPI Final Demand YoY", sub: "Finished goods", fred: "PPIFIS", freq: "M", unit: "%", cat: "Inflation", base: 1.2, vol: 1.5 },
  { id: "us_cpif", label: "CPI Food YoY", sub: "Food at home", fred: "CUUR0000SAF11", freq: "M", unit: "%", cat: "Inflation", base: 1.8, vol: 1.2 },
  { id: "us_cpie", label: "CPI Energy YoY", sub: "Energy commodities", fred: "CUUR0000SA0E", freq: "M", unit: "%", cat: "Inflation", base: -1.5, vol: 8.0 },
  { id: "us_cpis", label: "CPI Shelter YoY", sub: "Owners equiv rent", fred: "CUSR0000SEHC", freq: "M", unit: "%", cat: "Inflation", base: 5.2, vol: 0.6 },
  { id: "us_be5", label: "5Y Breakeven Inflation", sub: "TIPS spread", fred: "T5YIE", freq: "D", unit: "%", cat: "Inflation", base: 2.35, vol: 0.2 },
  { id: "us_be10", label: "10Y Breakeven Inflation", sub: "TIPS spread", fred: "T10YIE", freq: "D", unit: "%", cat: "Inflation", base: 2.30, vol: 0.15 },
  { id: "us_ur", label: "Unemployment (U-3)", sub: "Civilian 16+", fred: "UNRATE", freq: "M", unit: "%", cat: "Labour Market", base: 4.1, vol: 0.3 },
  { id: "us_u6", label: "Unemployment (U-6)", sub: "Incl margin attached", fred: "U6RATE", freq: "M", unit: "%", cat: "Labour Market", base: 7.5, vol: 0.5 },
  { id: "us_nfp", label: "Nonfarm Payrolls", sub: "Chg thousands", fred: "PAYEMS", freq: "M", unit: "K", cat: "Labour Market", base: 228, vol: 80 },
  { id: "us_ic", label: "Initial Jobless Claims", sub: "Weekly SA", fred: "ICSA", freq: "W", unit: "K", cat: "Labour Market", base: 219, vol: 18 },
  { id: "us_cc", label: "Continued Claims", sub: "Insured unemp", fred: "CCSA", freq: "W", unit: "K", cat: "Labour Market", base: 1870, vol: 80 },
  { id: "us_lfp", label: "Labour Force Particip", sub: "% pop 16+", fred: "CIVPART", freq: "M", unit: "%", cat: "Labour Market", base: 62.6, vol: 0.3 },
  { id: "us_ahe", label: "Avg Hourly Earnings YoY", sub: "All private", fred: "CES0500000003", freq: "M", unit: "%", cat: "Labour Market", base: 4.1, vol: 0.4 },
  { id: "us_jo", label: "JOLTS Job Openings", sub: "Thousands SA", fred: "JTSJOL", freq: "M", unit: "K", cat: "Labour Market", base: 8800, vol: 500 },
  { id: "us_qr", label: "JOLTS Quits Rate", sub: "% total emp", fred: "JTSQUR", freq: "M", unit: "%", cat: "Labour Market", base: 2.2, vol: 0.2 },
  { id: "us_ffr", label: "Fed Funds Rate", sub: "Effective daily", fred: "DFF", freq: "D", unit: "%", cat: "Monetary & Rates", base: 4.50, vol: 0.01 },
  { id: "us_2y", label: "2Y Treasury Yield", sub: "Constant mat", fred: "DGS2", freq: "D", unit: "%", cat: "Monetary & Rates", base: 4.25, vol: 0.3 },
  { id: "us_10y", label: "10Y Treasury Yield", sub: "Constant mat", fred: "DGS10", freq: "D", unit: "%", cat: "Monetary & Rates", base: 4.30, vol: 0.25 },
  { id: "us_30y", label: "30Y Treasury Yield", sub: "Constant mat", fred: "DGS30", freq: "D", unit: "%", cat: "Monetary & Rates", base: 4.52, vol: 0.2 },
  { id: "us_sp", label: "10Y-2Y Spread", sub: "Yield curve slope", fred: "T10Y2Y", freq: "D", unit: "%", cat: "Monetary & Rates", base: 0.22, vol: 0.15 },
  { id: "us_sp3m", label: "10Y-3M Spread", sub: "Recession indicator", fred: "T10Y3M", freq: "D", unit: "%", cat: "Monetary & Rates", base: -0.08, vol: 0.3 },
  { id: "us_m2", label: "M2 Growth YoY", sub: "% change", fred: "M2SL", freq: "M", unit: "%", cat: "Monetary & Rates", base: 4.1, vol: 1.5 },
  { id: "us_m2l", label: "M2 Level", sub: "Bn $", fred: "M2SL", freq: "M", unit: "$Bn", cat: "Monetary & Rates", base: 21500, vol: 200 },
  { id: "us_ism", label: "ISM Mfg PMI", sub: "Diffusion idx", fred: "NAPM", freq: "M", unit: "Idx", cat: "Sentiment & Housing", base: 50.3, vol: 2.0 },
  { id: "us_iss", label: "ISM Services PMI", sub: "Non-mfg", fred: "NMFCI", freq: "M", unit: "Idx", cat: "Sentiment & Housing", base: 53.4, vol: 2.0 },
  { id: "us_ismno", label: "ISM Mfg New Orders", sub: "Sub-index", fred: "NAPMNOI", freq: "M", unit: "Idx", cat: "Sentiment & Housing", base: 52.5, vol: 3.0 },
  { id: "us_isme", label: "ISM Mfg Employment", sub: "Sub-index", fred: "NAPMEI", freq: "M", unit: "Idx", cat: "Sentiment & Housing", base: 47.0, vol: 2.5 },
  { id: "us_um", label: "UMich Cons Sentiment", sub: "Idx 1966=100", fred: "UMCSENT", freq: "M", unit: "Idx", cat: "Sentiment & Housing", base: 64.7, vol: 4.0 },
  { id: "us_ume", label: "UMich Inflation Exp 1Y", sub: "Expected % chg", fred: "MICH", freq: "M", unit: "%", cat: "Sentiment & Housing", base: 4.3, vol: 0.5 },
  { id: "us_hs", label: "Housing Starts", sub: "K SAAR", fred: "HOUST", freq: "M", unit: "K", cat: "Sentiment & Housing", base: 1420, vol: 80 },
  { id: "us_bp", label: "Building Permits", sub: "K SAAR", fred: "PERMIT", freq: "M", unit: "K", cat: "Sentiment & Housing", base: 1480, vol: 70 },
  { id: "us_cs", label: "Case-Shiller Home Price", sub: "Nat'l idx YoY", fred: "CSUSHPINSA", freq: "M", unit: "%", cat: "Sentiment & Housing", base: 4.5, vol: 1.5 },
  { id: "us_ehs", label: "Existing Home Sales", sub: "M SAAR", fred: "EXHOSLUSM495S", freq: "M", unit: "M", cat: "Sentiment & Housing", base: 4.0, vol: 0.25 },
  { id: "us_nhs", label: "New Home Sales", sub: "K SAAR", fred: "HSN1F", freq: "M", unit: "K", cat: "Sentiment & Housing", base: 680, vol: 40 },
  { id: "us_tb", label: "Trade Balance", sub: "Goods & svcs $Bn", fred: "BOPGSTB", freq: "M", unit: "$Bn", cat: "Trade & Fiscal", base: -98.4, vol: 8.0 },
  { id: "us_tg", label: "Goods Trade Balance", sub: "$Bn monthly", fred: "BOPGTB", freq: "M", unit: "$Bn", cat: "Trade & Fiscal", base: -108, vol: 10 },
  { id: "us_dg", label: "Federal Debt / GDP", sub: "% of GDP", fred: "GFDEGDQ188S", freq: "Q", unit: "%", cat: "Trade & Fiscal", base: 120, vol: 2 },
  { id: "us_def", label: "Federal Surplus/Deficit", sub: "$Bn monthly", fred: "MTSDS133FMS", freq: "M", unit: "$Bn", cat: "Trade & Fiscal", base: -165, vol: 80 },
];

const EU_IND = [
  { id: "eu_gdp", label: "GDP QoQ", sub: "Seasonally adjusted", fred: "CLVMNACSCAB1GQEA19", freq: "Q", unit: "%", cat: "Growth & Output", base: 0.3, vol: 0.4 },
  { id: "eu_ip", label: "Industrial Prod YoY", sub: "Excl construction", fred: "EA19PRINTO01GYSAM", freq: "M", unit: "%", cat: "Growth & Output", base: -1.2, vol: 2.5 },
  { id: "eu_ret", label: "Retail Sales YoY", sub: "Volumes SA", fred: "EA19SLRTTO02GYSAM", freq: "M", unit: "%", cat: "Growth & Output", base: 1.8, vol: 1.5 },
  { id: "eu_un", label: "Unemployment Rate", sub: "Eurozone agg", fred: "LRHUTTTTEZM156S", freq: "M", unit: "%", cat: "Growth & Output", base: 6.3, vol: 0.2 },
  { id: "eu_hicp", label: "HICP Headline YoY", sub: "All items", fred: "CP0000EZ19M086NEST", freq: "M", unit: "%", cat: "Inflation", base: 2.4, vol: 0.4 },
  { id: "eu_hcore", label: "HICP Core YoY", sub: "Ex energy/food/alc/tob", fred: "CP0000XEFEZ19M086NEST", freq: "M", unit: "%", cat: "Inflation", base: 2.7, vol: 0.3 },
  { id: "eu_hfood", label: "HICP Food YoY", sub: "Food incl alc & tob", fred: "CP01XAEZ19M086NEST", freq: "M", unit: "%", cat: "Inflation", base: 2.8, vol: 0.8 },
  { id: "eu_hen", label: "HICP Energy YoY", sub: "Energy component", fred: "CP0451EZ19M086NEST", freq: "M", unit: "%", cat: "Inflation", base: -1.0, vol: 5.0 },
  { id: "eu_hsvc", label: "HICP Services YoY", sub: "Services component", fred: "CP04XAEZ19M086NEST", freq: "M", unit: "%", cat: "Inflation", base: 3.9, vol: 0.3 },
  { id: "eu_ppi", label: "PPI YoY", sub: "Industry ex constr", fred: "PIEAMP02EZM659N", freq: "M", unit: "%", cat: "Inflation", base: -0.5, vol: 3.0 },
  { id: "eu_dep", label: "ECB Deposit Rate", sub: "Facility rate", fred: "ECBDFR", freq: "M", unit: "%", cat: "Monetary & Rates", base: 2.75, vol: 0.01 },
  { id: "eu_ref", label: "ECB Main Refi Rate", sub: "Min bid", fred: "ECBMRRFR", freq: "M", unit: "%", cat: "Monetary & Rates", base: 2.90, vol: 0.01 },
  { id: "eu_10y", label: "EA 10Y Benchmark", sub: "Weighted avg", fred: "IRLTLT01EZM156N", freq: "M", unit: "%", cat: "Monetary & Rates", base: 2.85, vol: 0.3 },
  { id: "eu_de10", label: "German Bund 10Y", sub: "Safe asset", fred: "IRLTLT01DEM156N", freq: "M", unit: "%", cat: "Monetary & Rates", base: 2.50, vol: 0.25 },
  { id: "eu_it10", label: "Italy BTP 10Y", sub: "Spread watched", fred: "IRLTLT01ITM156N", freq: "M", unit: "%", cat: "Monetary & Rates", base: 3.60, vol: 0.3 },
  { id: "eu_fr10", label: "France OAT 10Y", sub: "Govt bond", fred: "IRLTLT01FRM156N", freq: "M", unit: "%", cat: "Monetary & Rates", base: 3.10, vol: 0.25 },
  { id: "eu_m3", label: "M3 Growth YoY", sub: "Broad money", fred: "MYAGM2EZM196N", freq: "M", unit: "%", cat: "Monetary & Rates", base: 3.5, vol: 1.0 },
  { id: "eu_pmm", label: "Mfg PMI (HCOB)", sub: "S&P Global/HCOB", fred: "BSCICP03EZM460S", freq: "M", unit: "Idx", cat: "Sentiment & Trade", base: 46.5, vol: 1.8 },
  { id: "eu_pms", label: "Services PMI", sub: "S&P Global/HCOB", fred: "BSXRLV02EZM460S", freq: "M", unit: "Idx", cat: "Sentiment & Trade", base: 51.0, vol: 1.5 },
  { id: "eu_cc", label: "Consumer Confidence", sub: "EU Commission", fred: "CSCICP03EZM460S", freq: "M", unit: "Idx", cat: "Sentiment & Trade", base: -14.5, vol: 2.0 },
  { id: "eu_esi", label: "Economic Sentiment", sub: "ESI indicator", fred: "BSXRLV02EZM086S", freq: "M", unit: "Idx", cat: "Sentiment & Trade", base: 96, vol: 3 },
  { id: "eu_tb", label: "Trade Balance", sub: "Eurozone SA", fred: "BPBLTT02EZM636S", freq: "M", unit: "EBn", cat: "Sentiment & Trade", base: 28.5, vol: 8 },
  { id: "eu_ca", label: "Current Account", sub: "% of GDP", fred: "BPBLTT01EZQ637S", freq: "Q", unit: "%", cat: "Sentiment & Trade", base: 2.8, vol: 0.8 },
];

const CN_IND = [
  { id: "cn_gdp", label: "GDP Growth YoY", sub: "Official NBS", fred: "CHNRGDPEXP", freq: "Q", unit: "%", cat: "Growth & Output", base: 4.8, vol: 0.8 },
  { id: "cn_ip", label: "Industrial Prod YoY", sub: "Value added", fred: "CHNPRINTO01GYSAM", freq: "M", unit: "%", cat: "Growth & Output", base: 5.8, vol: 1.5 },
  { id: "cn_ret", label: "Retail Sales YoY", sub: "Nominal NBS", fred: "CHNSLRTTO01GYSAM", freq: "M", unit: "%", cat: "Growth & Output", base: 4.2, vol: 2.0 },
  { id: "cn_fai", label: "Fixed Asset Inv YTD YoY", sub: "Cumul NBS", fred: null, freq: "M", unit: "%", cat: "Growth & Output", base: 3.2, vol: 0.8 },
  { id: "cn_un", label: "Surveyed Urban Unemp", sub: "NBS", fred: "LMUNRRTTCNM156S", freq: "M", unit: "%", cat: "Growth & Output", base: 5.1, vol: 0.2 },
  { id: "cn_cpi", label: "CPI Headline YoY", sub: "All items", fred: "CHNCPIALLMINMEI", freq: "M", unit: "%", cat: "Inflation", base: 0.3, vol: 0.5 },
  { id: "cn_ppi", label: "PPI YoY", sub: "Industrial output", fred: "CHNPIEATI01GYM", freq: "M", unit: "%", cat: "Inflation", base: -2.1, vol: 1.5 },
  { id: "cn_cpif", label: "CPI Food YoY", sub: "Food component", fred: "CHNCPIFODMINMEI", freq: "M", unit: "%", cat: "Inflation", base: -0.8, vol: 2.0 },
  { id: "cn_lpr", label: "Loan Prime Rate 1Y", sub: "PBOC benchmark", fred: "CHNINTRSTRMME01N", freq: "M", unit: "%", cat: "Monetary & Rates", base: 3.10, vol: 0.01 },
  { id: "cn_10y", label: "10Y CGB Yield", sub: "Govt bond", fred: "IRLTLT01CNM156N", freq: "M", unit: "%", cat: "Monetary & Rates", base: 1.70, vol: 0.2 },
  { id: "cn_m2", label: "M2 Growth YoY", sub: "Broad money", fred: "MABMM201CNM189N", freq: "M", unit: "%", cat: "Monetary & Rates", base: 7.2, vol: 0.8 },
  { id: "cn_tsf", label: "Total Social Financing", sub: "Flow RMB Bn", fred: null, freq: "M", unit: "YBn", cat: "Monetary & Rates", base: 3500, vol: 1500 },
  { id: "cn_fx", label: "FX Reserves", sub: "$Bn SAFE", fred: null, freq: "M", unit: "$Bn", cat: "Monetary & Rates", base: 3220, vol: 30 },
  { id: "cn_pmn", label: "NBS Mfg PMI", sub: "Official SOE-skewed", fred: "BSCICP03CNM460S", freq: "M", unit: "Idx", cat: "Sentiment & Trade", base: 50.5, vol: 0.8 },
  { id: "cn_pmc", label: "Caixin Mfg PMI", sub: "S&P Global private", fred: null, freq: "M", unit: "Idx", cat: "Sentiment & Trade", base: 51.2, vol: 1.0 },
  { id: "cn_pms", label: "NBS Non-Mfg PMI", sub: "Services sector", fred: null, freq: "M", unit: "Idx", cat: "Sentiment & Trade", base: 52.0, vol: 1.0 },
  { id: "cn_tb", label: "Trade Balance", sub: "Goods $Bn", fred: "BPBLTT01CNQ637S", freq: "Q", unit: "$Bn", cat: "Sentiment & Trade", base: 72.3, vol: 15 },
  { id: "cn_exp", label: "Exports YoY", sub: "Goods USD", fred: null, freq: "M", unit: "%", cat: "Sentiment & Trade", base: 7.5, vol: 5 },
  { id: "cn_imp", label: "Imports YoY", sub: "Goods USD", fred: null, freq: "M", unit: "%", cat: "Sentiment & Trade", base: 1.2, vol: 6 },
  { id: "cn_hp", label: "New Home Prices 70-city", sub: "MoM avg chg", fred: null, freq: "M", unit: "%", cat: "Sentiment & Trade", base: -0.3, vol: 0.2 },
];

const JP_IND = [
  { id: "jp_gdp", label: "GDP QoQ Annualised", sub: "Cabinet Office", fred: "JPNRGDPEXP", freq: "Q", unit: "%", cat: "Growth & Output", base: 1.1, vol: 1.5 },
  { id: "jp_ip", label: "Industrial Prod MoM", sub: "METI SA", fred: "JPNPROINDMISMEI", freq: "M", unit: "%", cat: "Growth & Output", base: -0.2, vol: 1.5 },
  { id: "jp_ipy", label: "Industrial Prod YoY", sub: "METI", fred: "JPNPRINTO01GYSAM", freq: "M", unit: "%", cat: "Growth & Output", base: -0.5, vol: 3.0 },
  { id: "jp_ret", label: "Retail Sales YoY", sub: "METI", fred: "JPNSLRTTO01GYSAM", freq: "M", unit: "%", cat: "Growth & Output", base: 2.1, vol: 1.5 },
  { id: "jp_mach", label: "Core Machinery Orders MoM", sub: "Excl volatile", fred: null, freq: "M", unit: "%", cat: "Growth & Output", base: 0.5, vol: 5.0 },
  { id: "jp_un", label: "Unemployment Rate", sub: "Statistics Bureau", fred: "LRUNTTTTJPM156S", freq: "M", unit: "%", cat: "Growth & Output", base: 2.5, vol: 0.2 },
  { id: "jp_jr", label: "Jobs-to-Applicants Ratio", sub: "MHLW key metric", fred: null, freq: "M", unit: "x", cat: "Growth & Output", base: 1.25, vol: 0.05 },
  { id: "jp_cpi", label: "CPI Headline YoY", sub: "All items", fred: "JPNCPIALLMINMEI", freq: "M", unit: "%", cat: "Inflation", base: 3.2, vol: 0.5 },
  { id: "jp_ccpi", label: "Core CPI YoY", sub: "Ex fresh food (BOJ)", fred: "JPNCPICORMINMEI", freq: "M", unit: "%", cat: "Inflation", base: 2.8, vol: 0.4 },
  { id: "jp_cccp", label: "Core-Core CPI YoY", sub: "Ex fresh food & energy", fred: null, freq: "M", unit: "%", cat: "Inflation", base: 2.5, vol: 0.3 },
  { id: "jp_cgpi", label: "CGPI (PPI) YoY", sub: "BOJ Corp Goods", fred: null, freq: "M", unit: "%", cat: "Inflation", base: 0.8, vol: 1.2 },
  { id: "jp_boj", label: "BOJ Policy Rate", sub: "Overnight call", fred: null, freq: "M", unit: "%", cat: "Monetary & Rates", base: 0.50, vol: 0.01 },
  { id: "jp_10y", label: "10Y JGB Yield", sub: "Post-YCC free-float", fred: "IRLTLT01JPM156N", freq: "M", unit: "%", cat: "Monetary & Rates", base: 1.30, vol: 0.2 },
  { id: "jp_2y", label: "2Y JGB Yield", sub: "Short end", fred: null, freq: "M", unit: "%", cat: "Monetary & Rates", base: 0.60, vol: 0.1 },
  { id: "jp_m2", label: "M2 Growth YoY", sub: "BOJ monetary", fred: "MABMM2JPM189N", freq: "M", unit: "%", cat: "Monetary & Rates", base: 2.8, vol: 0.5 },
  { id: "jp_fx", label: "USD/JPY", sub: "Exchange rate", fred: "DEXJPUS", freq: "D", unit: "Y", cat: "Monetary & Rates", base: 149, vol: 4 },
  { id: "jp_tlg", label: "Tankan Large Mfg DI", sub: "BOJ most market-moving", fred: null, freq: "Q", unit: "DI", cat: "Sentiment & Trade", base: 14, vol: 4 },
  { id: "jp_tsm", label: "Tankan Small Mfg DI", sub: "BOJ survey", fred: null, freq: "Q", unit: "DI", cat: "Sentiment & Trade", base: 1, vol: 3 },
  { id: "jp_tsv", label: "Tankan Large Non-Mfg", sub: "Services sentiment", fred: null, freq: "Q", unit: "DI", cat: "Sentiment & Trade", base: 33, vol: 3 },
  { id: "jp_pm", label: "au Jibun Bank Mfg PMI", sub: "S&P Global", fred: "BSCICP03JPM460S", freq: "M", unit: "Idx", cat: "Sentiment & Trade", base: 49.0, vol: 1.5 },
  { id: "jp_conc", label: "Consumer Confidence", sub: "Cabinet Office", fred: "CSCICP03JPM460S", freq: "M", unit: "Idx", cat: "Sentiment & Trade", base: 39.1, vol: 2 },
  { id: "jp_ew", label: "Eco Watchers Current", sub: "Street-level DI", fred: null, freq: "M", unit: "DI", cat: "Sentiment & Trade", base: 48, vol: 3 },
  { id: "jp_tb", label: "Trade Balance", sub: "MOF YBn", fred: "BPBLTT01JPM636S", freq: "M", unit: "YBn", cat: "Sentiment & Trade", base: -300, vol: 400 },
  { id: "jp_housing", label: "Housing Starts YoY", sub: "MLIT", fred: null, freq: "M", unit: "%", cat: "Sentiment & Trade", base: -3.0, vol: 5 },
];

const REGIONS = {
  US: { label: "United States", flag: "US", inds: US, clr: "#831011", clrD: "#C85657" },
  EU: { label: "Eurozone", flag: "EU", inds: EU_IND, clr: "#105782", clrD: "#9FDAFF" },
  CN: { label: "China", flag: "CN", inds: CN_IND, clr: "#C66A37", clrD: "#C66A37" },
  JP: { label: "Japan", flag: "JP", inds: JP_IND, clr: "#403050", clrD: "#B1A2C1" },
};

function buildAllData() {
  const d = {};
  Object.values(REGIONS).forEach(function (r) {
    r.inds.forEach(function (ind) {
      d[ind.id] = simSeries(ind.base, ind.vol, ind.freq, gPts(ind.freq));
    });
  });
  return d;
}

// ── SPARKLINE ──────────────────────────────────────────────────

function Spark({ data, color, w, h }) {
  const width = w || 68;
  const height = h || 20;
  if (!data || data.length < 2) {
    return (<div style={{ width: width, height: height }} />);
  }
  const v = data.map(function (d) { return d.value; });
  const mn = Math.min.apply(null, v);
  const mx = Math.max.apply(null, v);
  const rng = mx - mn || 1;
  const pts = v.map(function (val, i) {
    const x = (i / (v.length - 1)) * width;
    const y = height - ((val - mn) / rng) * (height - 3) - 1.5;
    return x + "," + y;
  }).join(" ");
  const lastY = height - ((v[v.length - 1] - mn) / rng) * (height - 3) - 1.5;

  return (
    <svg width={width} height={height} style={{ display: "block", flexShrink: 0 }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={width} cy={lastY} r="1.5" fill={color} />
    </svg>
  );
}

// ── CANVAS CHART ───────────────────────────────────────────────

function CChart({ data, color, T, ht, refLine, refLabel }) {
  const height = ht || 108;
  const boxRef = useRef(null);
  const canRef = useRef(null);
  const [cw, setCw] = useState(260);

  useEffect(function () {
    const el = boxRef.current;
    if (!el) return;
    setCw(el.offsetWidth);
    const ro = new ResizeObserver(function (entries) {
      for (var k = 0; k < entries.length; k++) {
        setCw(Math.floor(entries[k].contentRect.width));
      }
    });
    ro.observe(el);
    return function () { ro.disconnect(); };
  }, []);

  useEffect(function () {
    const c = canRef.current;
    if (!c || !data || data.length < 2 || cw < 20) return;
    const ctx = c.getContext("2d");
    const dp = window.devicePixelRatio || 1;
    const w = cw;
    const h = height;
    c.width = w * dp;
    c.height = h * dp;
    c.style.width = w + "px";
    c.style.height = h + "px";
    ctx.scale(dp, dp);
    ctx.clearRect(0, 0, w, h);

    const P = { t: 6, r: 6, b: 20, l: 40 };
    const chartW = w - P.l - P.r;
    const chartH = h - P.t - P.b;
    const vals = data.map(function (d) { return d.value; });
    var mn = Math.min.apply(null, vals);
    var mx = Math.max.apply(null, vals);
    if (refLine != null) {
      mn = Math.min(mn, refLine);
      mx = Math.max(mx, refLine);
    }
    var rn = mx - mn || 1;
    mn -= rn * 0.08;
    mx += rn * 0.08;
    var totalR = mx - mn;

    // grid
    for (var gi = 0; gi <= 4; gi++) {
      var gy = P.t + (gi / 4) * chartH;
      var gv = mx - (gi / 4) * totalR;
      ctx.beginPath();
      ctx.setLineDash([2, 3]);
      ctx.strokeStyle = T.border;
      ctx.lineWidth = 0.5;
      ctx.moveTo(P.l, gy);
      ctx.lineTo(w - P.r, gy);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = T.textTer;
      ctx.font = "9px " + Fn;
      ctx.textAlign = "right";
      var fm = Math.abs(gv) >= 1e4 ? (gv / 1e3).toFixed(0) + "K" : Math.abs(gv) >= 100 ? gv.toFixed(0) : gv.toFixed(1);
      ctx.fillText(fm, P.l - 3, gy + 3);
    }

    // ref line
    if (refLine != null) {
      var ry = P.t + ((mx - refLine) / totalR) * chartH;
      ctx.save();
      ctx.beginPath();
      ctx.setLineDash([4, 3]);
      ctx.strokeStyle = T.accent;
      ctx.lineWidth = 0.7;
      ctx.globalAlpha = 0.5;
      ctx.moveTo(P.l, ry);
      ctx.lineTo(w - P.r, ry);
      ctx.stroke();
      ctx.restore();
      if (refLabel) {
        ctx.save();
        ctx.fillStyle = T.accent;
        ctx.font = "bold 7px " + Fn;
        ctx.globalAlpha = 0.55;
        ctx.textAlign = "left";
        ctx.fillText(refLabel, P.l + 2, ry - 3);
        ctx.restore();
      }
    }

    var n = data.length;

    // area
    ctx.beginPath();
    ctx.moveTo(P.l, P.t + chartH);
    for (var ai = 0; ai < n; ai++) {
      ctx.lineTo(P.l + (ai / (n - 1)) * chartW, P.t + ((mx - data[ai].value) / totalR) * chartH);
    }
    ctx.lineTo(P.l + chartW, P.t + chartH);
    ctx.closePath();
    ctx.fillStyle = hexRgba(color, 0.09);
    ctx.fill();

    // line
    ctx.beginPath();
    for (var li = 0; li < n; li++) {
      var lx = P.l + (li / (n - 1)) * chartW;
      var ly = P.t + ((mx - data[li].value) / totalR) * chartH;
      if (li === 0) ctx.moveTo(lx, ly);
      else ctx.lineTo(lx, ly);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.6;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.stroke();

    // end dot
    var ex = P.l + chartW;
    var ey = P.t + ((mx - data[n - 1].value) / totalR) * chartH;
    ctx.beginPath();
    ctx.arc(ex, ey, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(ex, ey, 5, 0, Math.PI * 2);
    ctx.fillStyle = hexRgba(color, 0.15);
    ctx.fill();

    // x labels
    ctx.fillStyle = T.textTer;
    ctx.font = "8px " + Fn;
    ctx.textAlign = "center";
    var step = Math.max(1, Math.floor(n / 5));
    for (var xi = 0; xi < n; xi += step) {
      var xx = P.l + (xi / (n - 1)) * chartW;
      var dt = new Date(data[xi].date);
      ctx.fillText(dt.toLocaleDateString("en-GB", { month: "short", year: "2-digit" }), xx, h - 3);
    }
  }, [data, color, T, height, refLine, refLabel, cw]);

  return (
    <div ref={boxRef} style={{ width: "100%" }}>
      <canvas ref={canRef} style={{ display: "block", width: "100%", height: height }} />
    </div>
  );
}

// ── INDICATOR CARD ─────────────────────────────────────────────

function IndCard({ ind, T, color, data }) {
  const lat = data.length > 0 ? data[data.length - 1].value : null;
  const prv = data.length > 1 ? data[data.length - 2].value : null;
  const chg = lat != null && prv != null ? lat - prv : null;
  const [hv, sH] = useState(false);

  var rl = null;
  var rla = null;
  if (ind.unit === "Idx" && (ind.label.indexOf("PMI") >= 0 || ind.label.indexOf("ISM") >= 0)) {
    rl = 50;
    rla = "50";
  }
  if ((ind.label.indexOf("CPI") >= 0 || ind.label.indexOf("PCE") >= 0 || ind.label.indexOf("HICP") >= 0) && ind.unit === "%" && ind.label.indexOf("Energy") < 0 && ind.label.indexOf("Food") < 0 && ind.label.indexOf("Shelter") < 0) {
    rl = 2;
    rla = "2%";
  }

  var chgAbs = chg != null ? Math.abs(chg) : 0;
  var chgStr = chgAbs < 1 ? chgAbs.toFixed(2) : chgAbs < 100 ? chgAbs.toFixed(1) : chgAbs.toFixed(0);

  return (
    <div
      onMouseEnter={function () { sH(true); }}
      onMouseLeave={function () { sH(false); }}
      style={{
        background: T.card,
        border: "1px solid " + (hv ? color : T.border),
        borderRadius: 10,
        overflow: "hidden",
        transition: "border-color 0.2s",
      }}
    >
      <div style={{ padding: "10px 12px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 10.5, fontWeight: 600, color: T.text, fontFamily: Fn, lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ind.label}</div>
          <div style={{ fontSize: 8, color: T.textTer, marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ind.sub}</div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: T.text, fontFamily: Fs, fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>{fmtV(lat)}</div>
          <div style={{ fontSize: 7.5, color: T.textTer, marginTop: 1 }}>{ind.unit + " \u00b7 " + (ind.freq === "Q" ? "Qtr" : ind.freq === "W" ? "Wk" : ind.freq === "D" ? "Daily" : "Mo")}</div>
        </div>
      </div>
      <div style={{ padding: "2px 12px 4px", display: "flex", gap: 4, alignItems: "center" }}>
        {chg != null && (
          <span style={{
            fontSize: 8.5, fontWeight: 600, fontFamily: Fn, fontVariantNumeric: "tabular-nums",
            padding: "1px 5px", borderRadius: 3,
            background: chg >= 0 ? T.greenBg : T.redBg,
            color: chg >= 0 ? (T.green300 || T.green) : (T.red300 || T.capRed),
          }}>
            {(chg >= 0 ? "\u25B2" : "\u25BC") + " " + chgStr}
          </span>
        )}
        {ind.fred && (
          <span style={{ fontSize: 6.5, color: T.textTer, marginLeft: "auto", opacity: 0.5 }}>{ind.fred}</span>
        )}
      </div>
      <div style={{ padding: "0 1px 1px" }}>
        <CChart data={data} color={color} T={T} ht={100} refLine={rl} refLabel={rla} />
      </div>
    </div>
  );
}

// ── KPI STRIP ──────────────────────────────────────────────────

function KpiStrip({ inds, allData, T, color }) {
  const items = inds.slice(0, 6);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(" + Math.min(items.length, 6) + ", 1fr)", gap: 8, marginBottom: 16 }}>
      {items.map(function (ind) {
        var d = allData[ind.id] || [];
        var lat = d.length > 0 ? d[d.length - 1].value : null;
        var prv = d.length > 1 ? d[d.length - 2].value : null;
        var chg = lat != null && prv != null ? lat - prv : null;
        var chgAbs = chg != null ? Math.abs(chg) : 0;
        return (
          <div key={ind.id} style={{ background: T.card, border: "1px solid " + T.border, borderRadius: 9, padding: "10px 11px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 4 }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 8, color: T.textTer, textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: Fn, marginBottom: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ind.label}</div>
              <div style={{ fontSize: 17, fontWeight: 600, fontFamily: Fs, color: T.text, fontVariantNumeric: "tabular-nums" }}>
                {fmtV(lat)}
                <span style={{ fontSize: 8, color: T.textTer, fontWeight: 400, marginLeft: 2 }}>{ind.unit}</span>
              </div>
              {chg != null && (
                <div style={{ fontSize: 8, marginTop: 1, fontVariantNumeric: "tabular-nums", color: chg >= 0 ? (T.green300 || T.green) : (T.red300 || T.capRed) }}>
                  {(chg >= 0 ? "\u25B2 " : "\u25BC ") + (chgAbs < 1 ? chgAbs.toFixed(2) : chgAbs.toFixed(1))}
                </div>
              )}
            </div>
            <Spark data={d.slice(-20)} color={color} w={52} h={22} />
          </div>
        );
      })}
    </div>
  );
}

// ── REGION PAGE ────────────────────────────────────────────────

function RegionPage({ regionKey, T, allData }) {
  var r = REGIONS[regionKey];
  if (!r) return (<div>Region not found</div>);
  var isDk = T.bg === DARK.bg;
  var color = isDk ? r.clrD : r.clr;

  var categories = useMemo(function () {
    var cats = {};
    r.inds.forEach(function (ind) {
      if (!cats[ind.cat]) cats[ind.cat] = [];
      cats[ind.cat].push(ind);
    });
    return cats;
  }, [regionKey]);

  var catKeys = Object.keys(categories);
  var [activeCat, setActiveCat] = useState(catKeys[0]);

  useEffect(function () {
    setActiveCat(catKeys[0]);
  }, [regionKey]);

  var currentInds = categories[activeCat] || [];

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: color, fontFamily: Fn, letterSpacing: "0.03em" }}>{r.flag}</div>
        <div>
          <h2 style={{ fontFamily: Fh, fontSize: 24, fontWeight: 400, color: T.text, margin: 0 }}>{r.label}</h2>
          <div style={{ fontSize: 9.5, color: T.textTer, marginTop: 1 }}>
            {r.inds.length + " indicators \u00b7 " + r.inds.filter(function (i) { return i.fred; }).length + " FRED series"}
          </div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 4, flexWrap: "wrap" }}>
          {catKeys.map(function (cat) {
            return (
              <button
                key={cat}
                onClick={function () { setActiveCat(cat); }}
                style={{
                  padding: "5px 10px", borderRadius: 5, fontSize: 9.5, fontFamily: Fn,
                  fontWeight: activeCat === cat ? 700 : 400,
                  border: "1px solid " + (activeCat === cat ? color : T.border),
                  background: activeCat === cat ? color : "transparent",
                  color: activeCat === cat ? "#fff" : T.textSec,
                  cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <KpiStrip inds={currentInds} allData={allData} T={T} color={color} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(265px, 1fr))", gap: 10 }}>
        {currentInds.map(function (ind) {
          return (
            <IndCard key={ind.id} ind={ind} T={T} color={color} data={allData[ind.id] || []} />
          );
        })}
      </div>
    </div>
  );
}

// ── COMPARISON ─────────────────────────────────────────────────

function CompareView({ T, allData }) {
  var isDk = T.bg === DARK.bg;
  var rows = [
    { l: "GDP Growth", ids: { US: "us_gdp", EU: "eu_gdp", CN: "cn_gdp", JP: "jp_gdp" } },
    { l: "CPI / HICP YoY", ids: { US: "us_cpi", EU: "eu_hicp", CN: "cn_cpi", JP: "jp_cpi" } },
    { l: "Core Inflation", ids: { US: "us_ccpi", EU: "eu_hcore", CN: null, JP: "jp_ccpi" } },
    { l: "PPI YoY", ids: { US: "us_ppi", EU: "eu_ppi", CN: "cn_ppi", JP: "jp_cgpi" } },
    { l: "Unemployment", ids: { US: "us_ur", EU: "eu_un", CN: "cn_un", JP: "jp_un" } },
    { l: "Industrial Prod YoY", ids: { US: "us_indpro_y", EU: "eu_ip", CN: "cn_ip", JP: "jp_ipy" } },
    { l: "Retail Sales YoY", ids: { US: "us_ret_y", EU: "eu_ret", CN: "cn_ret", JP: "jp_ret" } },
    { l: "Mfg PMI", ids: { US: "us_ism", EU: "eu_pmm", CN: "cn_pmn", JP: "jp_pm" } },
    { l: "Policy Rate", ids: { US: "us_ffr", EU: "eu_dep", CN: "cn_lpr", JP: "jp_boj" } },
    { l: "10Y Yield", ids: { US: "us_10y", EU: "eu_de10", CN: "cn_10y", JP: "jp_10y" } },
    { l: "M2/M3 Growth", ids: { US: "us_m2", EU: "eu_m3", CN: "cn_m2", JP: "jp_m2" } },
    { l: "Consumer Confidence", ids: { US: "us_um", EU: "eu_cc", CN: null, JP: "jp_conc" } },
    { l: "Trade Balance", ids: { US: "us_tb", EU: "eu_tb", CN: "cn_tb", JP: "jp_tb" } },
  ];

  var regionKeys = Object.keys(REGIONS);

  return (
    <div>
      <h2 style={{ fontFamily: Fh, fontSize: 24, fontWeight: 400, color: T.text, margin: "0 0 3px" }}>
        Cross-Region <em style={{ fontStyle: "italic", color: T.accent }}>Comparison</em>
      </h2>
      <p style={{ fontSize: 9.5, color: T.textTer, margin: "0 0 14px" }}>Latest values with sparklines across all regions</p>
      <div style={{ background: T.card, border: "1px solid " + T.border, borderRadius: 11, overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, fontFamily: Fn, minWidth: 680 }}>
          <thead>
            <tr style={{ borderBottom: "2px solid " + T.border }}>
              <th style={{ textAlign: "left", padding: "10px 12px", color: T.textTer, fontWeight: 600, fontSize: 8.5, textTransform: "uppercase", letterSpacing: "0.1em", position: "sticky", left: 0, background: T.card, zIndex: 2 }}>Indicator</th>
              {regionKeys.map(function (k) {
                return (
                  <th key={k} style={{ textAlign: "right", padding: "10px 12px", color: T.textTer, fontWeight: 600, fontSize: 8.5, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    {REGIONS[k].flag + " " + REGIONS[k].label}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map(function (row, ri) {
              return (
                <tr key={ri} style={{ borderBottom: "1px solid " + T.border }}>
                  <td style={{ padding: "8px 12px", fontWeight: 600, color: T.text, position: "sticky", left: 0, background: T.card, zIndex: 1, fontSize: 10.5 }}>{row.l}</td>
                  {regionKeys.map(function (rk) {
                    var id = row.ids[rk];
                    if (!id) {
                      return (<td key={rk} style={{ padding: "8px 12px", textAlign: "right", color: T.textTer, fontSize: 10 }}>{"\u2014"}</td>);
                    }
                    var d = allData[id] || [];
                    var val = d.length > 0 ? d[d.length - 1].value : null;
                    var prv = d.length > 1 ? d[d.length - 2].value : null;
                    var chg = val != null && prv != null ? val - prv : null;
                    var rc = isDk ? REGIONS[rk].clrD : REGIONS[rk].clr;
                    var chgAbs = chg != null ? Math.abs(chg) : 0;
                    return (
                      <td key={rk} style={{ padding: "8px 12px", textAlign: "right" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 7 }}>
                          <Spark data={d.slice(-24)} color={rc} w={48} h={15} />
                          <div>
                            <div style={{ fontWeight: 600, color: T.text, fontVariantNumeric: "tabular-nums", fontSize: 11.5 }}>{fmtV(val)}</div>
                            {chg != null && (
                              <div style={{ fontSize: 7.5, fontVariantNumeric: "tabular-nums", color: chg >= 0 ? (T.green300 || T.green) : (T.red300 || T.capRed) }}>
                                {(chg >= 0 ? "\u25B2 " : "\u25BC ") + (chgAbs < 1 ? chgAbs.toFixed(2) : chgAbs.toFixed(1))}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── MAIN ───────────────────────────────────────────────────────

export default function MacroDashboard({ T: externalT }) {
  var [dk, sDk] = useState(false);
  var T = externalT || (dk ? DARK : LIGHT);
  var standalone = !externalT;
  var [activeRegion, setActiveRegion] = useState("US");
  var [showCompare, setShowCompare] = useState(false);
  var allData = useMemo(function () { return buildAllData(); }, []);
  var isDk = T.bg === DARK.bg;

  var tabs = Object.keys(REGIONS).map(function (k) {
    return { k: k, label: REGIONS[k].label, flag: REGIONS[k].flag, n: REGIONS[k].inds.length };
  });
  tabs.push({ k: "cmp", label: "Comparison", flag: "VS", n: 0 });

  return (
    <div style={{ padding: standalone ? 22 : 0, background: standalone ? T.bg : "transparent", minHeight: standalone ? "100vh" : "auto", fontFamily: Fn, transition: "background 0.3s" }}>
      {/* Title */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
          <span style={{ fontSize: 8.5, color: T.textTer, padding: "4px 9px", background: T.pillBg, borderRadius: 5 }}>{"Simulated \u00b7 FRED ready"}</span>
          {standalone && (
            <button
              onClick={function () { sDk(!dk); }}
              style={{ padding: "4px 10px", borderRadius: 5, border: "1px solid " + T.border, background: T.card, color: T.textSec, fontSize: 10, fontFamily: Fn, cursor: "pointer" }}
            >
              {dk ? "\u2600" : "\u263E"}
            </button>
          )}
        </div>
      </div>

      {/* Region tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, borderBottom: "1px solid " + T.border, paddingBottom: 9, overflowX: "auto" }}>
        {tabs.map(function (t) {
          var isActive = t.k === "cmp" ? showCompare : (!showCompare && activeRegion === t.k);
          var tc = t.k === "cmp" ? T.accent : (isDk ? REGIONS[t.k].clrD : REGIONS[t.k].clr);
          return (
            <button
              key={t.k}
              onClick={function () {
                if (t.k === "cmp") { setShowCompare(true); }
                else { setShowCompare(false); setActiveRegion(t.k); }
              }}
              style={{
                padding: "6px 14px", borderRadius: 7, fontSize: 10.5, fontFamily: Fn,
                fontWeight: isActive ? 700 : 500,
                border: "1.5px solid " + (isActive ? tc : T.border),
                background: isActive ? tc : "transparent",
                color: isActive ? "#fff" : T.textSec,
                cursor: "pointer", transition: "all 0.2s",
                display: "flex", gap: 4, alignItems: "center", whiteSpace: "nowrap",
              }}
            >
              <span style={{ fontWeight: 700 }}>{t.flag}</span>
              {" " + t.label}
              {t.n > 0 && (<span style={{ fontSize: 8.5, opacity: isActive ? 0.8 : 0.5 }}>{"(" + t.n + ")"}</span>)}
            </button>
          );
        })}
      </div>

      {/* Content */}
      {showCompare ? (
        <CompareView T={T} allData={allData} />
      ) : (
        <RegionPage key={activeRegion} regionKey={activeRegion} T={T} allData={allData} />
      )}

      {/* Footer */}
      <div style={{ marginTop: 24, paddingTop: 11, borderTop: "1px solid " + T.border, display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontSize: 7.5, color: T.textTer }}>
          {"Simulated data \u00b7 FRED IDs mapped \u00b7 " + new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
        </div>
        <div style={{ fontSize: 7.5, color: T.textTer, letterSpacing: "0.12em", textTransform: "uppercase" }}>
          {"Cape Capital \u00b7 Confidential"}
        </div>
      </div>
    </div>
  );
}
