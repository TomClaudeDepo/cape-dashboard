export const PASSCODE = "1234";
export const NAV = 380047339.04;
export const MV = 375223477.53;
export const UR = 31448823.39;
export const URP = 34205354.94;
export const URF = -2756531.55;
export const CASH = 7815133.63;
export const UR_PCT = (UR / MV * 100);
export const URP_PCT = (URP / MV * 100);
export const URF_PCT = (URF / MV * 100);
export const CASH_PCT = (CASH / NAV * 100);
export const ACWI_CONSTITUENTS = 2263;
export const activeShare = 78.0;
export const benchmarkOverlapWt = 21.0;

export const CSYS = "You are Claude, Cape Capital's internal PM assistant. Swiss WM, Zurich, EUR 380M concentrated equity, 26 holdings. Help 2-person PM team. Data (30 Mar 2026): NAV EUR 380.0M, Secs EUR 375.2M (98.7%), Cash EUR 7.8M (2.1%), Unreal P&L EUR +31.4M (+8.4%). Top wt: Pfizer 5.07%, Netflix 4.94%, Hitachi 4.90%. Sectors: IT 23.9%, HC 9.4%, Ind 14.5%, Fin 14.1%, CommSvc 8.7%. Geo: USA 55.7%, Cayman Is. 7.9%, Sweden 7.1%. CCY: USD 65.3%, CHF 9.7%, HKD 8.0%. Bench: MSCI ACWI NTR. Since inception (Jun 2015): Fund +130.1% vs Bench +158.1%. Active Share 78%. Be concise. Use % for weights/returns. EUR for absolute values.";

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
