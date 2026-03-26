export const PASSCODE = "1234";
export const NAV = 438493000.22;
export const MV = 429772440.55;
export const UR = 47364239.81;
export const URP = 50678334.34;
export const URF = -3314094.53;
export const CASH = 10325325.69;
export const UR_PCT = (UR / MV * 100);
export const URP_PCT = (URP / MV * 100);
export const URF_PCT = (URF / MV * 100);
export const CASH_PCT = (CASH / NAV * 100);
export const ACWI_CONSTITUENTS = 2263;
export const activeShare = 78.0;
export const benchmarkOverlapWt = 21.0;

export const CSYS = "You are Claude, Cape Capital's internal PM assistant. Swiss WM, Zurich, EUR 438M concentrated equity, 26 holdings. Help 2-person PM team. Data (19 Mar 2026): NAV EUR 438.5M, Secs EUR 429.8M (98%), Cash EUR 10.3M (2.4%), Unreal P&L EUR +47.4M (+11.0%). Top wt: TSMC 4.91%, NVDA 4.89%, Samsung 4.88%. Sectors: IT 26.6%, HC 14.1%, Ind 15.3%, Fin 13.7%, CommSvc 12.5%. Geo: USA 55%, China 8%, Sweden 8%. CCY: USD 67%, SEK 9%, HKD 9%. Bench: MSCI ACWI NTR. Since inception (Jun 2015): Fund +133.2% vs Bench +157.7%. Active Share 78%. Be concise. Use % for weights/returns. EUR for absolute values.";

export const navItems = [
  { l: "Overview", i: "overview", hash: "#overview" },
  { l: "Holdings", i: "holdings", hash: "#holdings" },
  { l: "Allocation", i: "allocation", hash: "#allocation" },
  { l: "Attribution", i: "attribution", hash: "#attribution" },
  { l: "Markets", i: "markets", hash: "#markets" },
  { l: "Research", i: "research", hash: "#research" },
  { l: "Macro", i: "macro", hash: "#macro" },
  { l: "Risk", i: "risk", hash: "#risk" },
  { l: "Watchlist", i: "watchlist", hash: "#watchlist" },
  { l: "Claude", i: "claude", hash: "#claude" },
  { l: "Settings", i: "settings", hash: "#settings" },
];
