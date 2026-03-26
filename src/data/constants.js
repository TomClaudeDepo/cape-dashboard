export const PASSCODE = "1234";
export const NAV = 396214471.12;
export const MV = 391257154.23;
export const UR = 42958210.88;
export const URP = 47637826.32;
export const URF = -4679615.44;
export const CASH = 24753250.15;
export const UR_PCT = (UR / MV * 100);
export const URP_PCT = (URP / MV * 100);
export const URF_PCT = (URF / MV * 100);
export const CASH_PCT = (CASH / NAV * 100);
export const ACWI_CONSTITUENTS = 2263;
export const activeShare = 78.0;
export const benchmarkOverlapWt = 21.0;

export const CSYS = "You are Claude, Cape Capital's internal PM assistant. Swiss WM, Zurich, EUR 396M concentrated equity, 26 holdings. Help 2-person PM team. Data (25 Mar 2026): NAV EUR 396.2M, Secs EUR 391.3M (98.7%), Ancillary Cash EUR 24.8M (6.2%), Unreal P&L EUR +43.0M (+11.0%). Top wt: TSMC 4.92%, Pfizer 4.91%, NVDA 4.76%. Sectors: IT 24.7%, HC 13.7%, Ind 15.6%, Fin 13.8%, CommSvc 11.7%. Geo: USA 55.3%, China 8.0%, Sweden 7.3%. CCY: USD 66.5%, SEK 9.5%, HKD 9.8%. Bench: MSCI ACWI NTR. Since inception (Jun 2015): Fund +136.7% vs Bench +157.7%. Active Share 78%. Be concise. Use % for weights/returns. EUR for absolute values.";

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
