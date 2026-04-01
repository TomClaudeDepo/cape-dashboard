export const PASSCODE = "1234";
export const NAV = 383132062.97;
export const MV = 381630573.29;
export const UR = 37855919.15;
export const URP = 42092873.93;
export const URF = -4236954.78;
export const CASH = 7638633.37;
export const FWD = -5971858.64;
export const CA = 152245.73;
export const CL = -317530.78;
export const NAV_DATE = "31 Mar 2026";
export const NUM_HOLDINGS = 26;
export const DTD_PCT = 1.61;
export const CYTD_PCT = -3.37;
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

export const CSYS = "You are Claude, Cape Capital's internal PM assistant. Swiss WM, Zurich, EUR 383M concentrated equity, 26 holdings. Help 2-person PM team. Data (31 Mar 2026): NAV EUR 383.1M, Secs EUR 381.6M (99.6%), Cash EUR 7.6M (2.0%), Unreal P&L EUR +37.9M (+9.9%). Top wt: Pfizer 5.06%, Netflix 5.04%, TSMC 4.97%. Sectors: IT 24.0%, HC 9.4%, Ind 14.5%, Fin 14.1%, CommSvc 8.9%. Geo: USA 56.0%, China 7.8%, Sweden 7.2%. CCY: USD 66.4%, CHF 9.6%, HKD 7.8%. Bench: MSCI ACWI NTR. Since inception (Jun 2015): Fund +133.8% vs Bench +160.0%. Active Share 78%. Be concise. Use % for weights/returns. EUR for absolute values.";

export const navItems = [
  { l: "Overview", i: "overview", sub: "Cape Equity Fund · LU1200255203 · 26 positions · " + NAV_DATE + " · EUR" },
  { l: "Holdings", i: "holdings", sub: "26 positions · as of " + NAV_DATE + " · EUR" },
  { l: "Allocation", i: "allocation", sub: "Portfolio structure vs MSCI ACWI (2,263 names) · " + NAV_DATE },
  { l: "Scenarios", i: "scenarios", sub: "30 market narratives mapped to portfolio holdings · " + NAV_DATE },
  { l: "Thematic Universe", i: "thematic", sub: "Sector themes, company universe & cross-sector connections" },
  { l: "Research", i: "research", sub: "Cape Capital equity research · March 2026" },
  { l: "Risk", i: "risk", sub: "UCITS limit monitoring & concentration analysis · " + NAV_DATE },
  { l: "Macro", i: "macro", sub: "Regional economic indicators · 4 regions" },
  { l: "Claude", i: "claude", sub: "Internal portfolio assistant" },
  { l: "Settings", i: "settings", sub: "Preferences and configuration" },
];
