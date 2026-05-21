export const PASSCODE = "1234";
export const NAV = 390824446.02;
export const MV = 386426986.50;
export const UR = 44006947.35;
export const URP = 48633016.31;
export const URF = -4626068.96;
export const CASH = 9691894.21;
export const FWD = -5099576.84;
export const CA = 137354.60;
export const CL = -332212.45;
export const NAV_DATE = "2 Apr 2026";
export const UR_PCT = (UR / MV * 100);
export const URP_PCT = (URP / MV * 100);
export const URF_PCT = (URF / MV * 100);
export const CASH_PCT = (CASH / NAV * 100);
export const MV_PCT = (MV / NAV * 100);
export const FWD_PCT = (FWD / NAV * 100);
export const CA_PCT = (CA / NAV * 100);
export const CL_PCT = (CL / NAV * 100);
export const ACWI_CONSTITUENTS = 2263;
export const activeShare = 78.0;
export const benchmarkOverlapWt = 21.0;

export const CSYS = "You are Claude, Cape Capital's internal PM assistant. Swiss WM, Zurich, EUR 391M concentrated equity, 26 holdings. Help 2-person PM team. Data (2 Apr 2026): NAV EUR 390.8M, Secs EUR 386.4M (98.9%), Cash EUR 9.7M (2.5%), Unreal P&L EUR +44.0M (+11.4%). Top wt: Netflix 4.96%, Hitachi 4.93%, ICE 4.91%. Sectors: IT 25.4%, Ind 17.9%, Fin 14.1%, HC 13.8%, CommSvc 13.0%. Geo: USA 65.6%, China 7.8%, Sweden 7.3%. CCY: USD 66.2%, EUR 8.3%, HKD 7.7%. Bench: MSCI ACWI NTR. Since inception (Jun 2015): Fund +137.8% vs Bench +160.7%. Active Share 78%. Be concise. Use % for weights/returns. EUR for absolute values.";

export const navItems = [
  { l: "Overview", i: "overview", sub: "Cape Equity Fund · LU1200255203 · 26 positions · " + NAV_DATE + " · EUR" },
  { l: "Holdings", i: "holdings", sub: "26 positions · as of " + NAV_DATE + " · EUR" },
  { l: "Allocation", i: "allocation", sub: "Portfolio structure vs MSCI ACWI (2,263 names) · " + NAV_DATE },
  { l: "Scenarios", i: "scenarios", sub: "30 market narratives mapped to portfolio holdings · " + NAV_DATE },
  { l: "Thematic Universe", i: "thematic", sub: "Sector themes, company universe & cross-sector connections" },
  { l: "Research", i: "research", sub: "Cape Capital equity research · April 2026" },
  { l: "Risk", i: "risk", sub: "UCITS limit monitoring & concentration analysis · " + NAV_DATE },
  { l: "Macro", i: "macro", sub: "Regional economic indicators · 4 regions" },
  { l: "Claude", i: "claude", sub: "Internal portfolio assistant" },
  { l: "Settings", i: "settings", sub: "Preferences and configuration" },
];
