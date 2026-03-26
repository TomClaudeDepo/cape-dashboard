// Static fallback data (used when API is offline)
export const indices = [{name:"S&P 500",val:"6,506",chg:-1.51},{name:"NASDAQ",val:"21,648",chg:-2.01},{name:"STOXX 50",val:"5,287",chg:-1.23},{name:"SMI",val:"12,842",chg:-0.87},{name:"Nikkei",val:"38,210",chg:-1.82},{name:"Hang Seng",val:"23,416",chg:-0.36}];

// Yahoo Finance symbol mappings
export const YF_INDICES = [
  { name: "S&P 500", symbol: "^GSPC" },
  { name: "NASDAQ", symbol: "^IXIC" },
  { name: "STOXX 50", symbol: "^STOXX50E" },
  { name: "SMI", symbol: "^SSMI" },
  { name: "Nikkei", symbol: "^N225" },
  { name: "Hang Seng", symbol: "^HSI" },
];
export const YF_FX = [
  { name: "EUR/USD", symbol: "EURUSD=X" },
  { name: "EUR/CHF", symbol: "EURCHF=X" },
  { name: "USD/JPY", symbol: "JPY=X" },
  { name: "EUR/SEK", symbol: "EURSEK=X" },
];
export const YF_COMMODITIES = [
  { name: "Brent", symbol: "BZ=F", prefix: "$" },
  { name: "Gold", symbol: "GC=F", prefix: "$" },
  { name: "Nat Gas", symbol: "NG=F", prefix: "$" },
];

export const currencies = [{name:"EUR/USD",val:"1.0854",chg:+0.12},{name:"EUR/CHF",val:"0.9128",chg:-0.08},{name:"USD/JPY",val:"149.32",chg:-0.34},{name:"EUR/SEK",val:"10.774",chg:+0.15}];

export const yields = [{name:"US 10Y",val:"4.32%",chg:+5},{name:"DE 10Y",val:"2.84%",chg:+2},{name:"UK 10Y",val:"4.61%",chg:+4},{name:"CH 10Y",val:"0.72%",chg:-1}];

export const commodities = [{name:"Brent",val:"$112.19",chg:+3.26},{name:"Gold",val:"$4,502",chg:-1.84},{name:"Nat Gas",val:"$4.87",chg:+1.45}];

export const topHL = [
  {time:"06:30",title:"Iran-Israel conflict escalates; Pentagon prepares ground deployment",tag:"GEO",hi:1},
  {time:"07:15",title:"Brent tops $112 \u2014 Iraq force majeure on foreign oilfields",tag:"OIL",hi:1},
  {time:"08:00",title:"S&P breaks 200-day MA; Nasdaq nears correction",tag:"EQ",hi:1},
  {time:"11:30",title:"Fed hawkish pause \u2014 cuts unlikely near-term",tag:"FED",hi:1},
  {time:"14:00",title:"Super Micro -26% on chip smuggling charges",tag:"TECH",hi:0},
];

export const holdNews = [
  {co:"NVIDIA",dt:"Mar 19",title:"Doubles rev target to $1T at GTC; Feynman on TSMC A16",imp:1},
  {co:"TSMC",dt:"Mar 20",title:"CoWoS to 130K wafers/mo by end 2026",imp:1},
  {co:"MSFT",dt:"Mar 18",title:"US preparing tariff carve-outs on TSMC chips",imp:1},
  {co:"SAMSUNG",dt:"Mar 21",title:"Ramping HBM4, >50% foundry to in-house",imp:1},
  {co:"JPM",dt:"Mar 20",title:"Warns stagflation risk; defensive positioning recommended",imp:0},
];

export const defWatch = [
  {tk:"ASML",nm:"ASML Holding",pr:"\u20AC642",chg:-2.14,sec:"Semis"},
  {tk:"LVMH",nm:"LVMH",pr:"\u20AC598",chg:-1.87,sec:"Luxury"},
  {tk:"AAPL",nm:"Apple",pr:"$212",chg:-1.52,sec:"Tech"},
  {tk:"LLY",nm:"Eli Lilly",pr:"$786",chg:-2.45,sec:"Pharma"},
  {tk:"NOVO-B",nm:"Novo Nordisk",pr:"DKK 712",chg:-1.93,sec:"Pharma"},
  {tk:"SAP",nm:"SAP SE",pr:"\u20AC248",chg:-0.88,sec:"Software"},
];
