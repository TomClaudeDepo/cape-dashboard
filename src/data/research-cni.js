// CNI (Canadian National Railway) Research Data

export const cniSnapshot = {
  ticker: "CNI", exchange: "TSX/NYSE", price: "C$152", ytdChg: "-8.3%",
  revenue: "C$17.3B", operatingRatio: "61.9%", fcf: "C$3.34B",
  network: "20,000 mi", positions: "Tri-coastal", dividend: "C$3.44/sh",
};

export const heroStats = [
  { value: "20,000", label: "Route miles (tri-coastal)", color: "deepBlue" },
  { value: "61.9%", label: "Operating ratio (FY2025)", color: "green" },
  { value: "C$3.34B", label: "Free cash flow", color: "green" },
  { value: "C$17.3B", label: "Revenue FY2025 (+2%)", color: "deepBlue" },
  { value: "6", label: "Class I railroads (oligopoly)", color: "purple" },
  { value: "C$350M+", label: "Tariff revenue drag", color: "capRed" },
];

export const thesisCards = [
  { id: "nearshoring", num: "01", title: "Nearshoring & trade corridors", tag: "US-Mexico freight $872.8B", color: "deepBlue",
    desc: "Mexico attracted $45.3B FDI in 2024. CN's Gulf Coast network connects to petrochemical and LNG export hubs, but CPKC captures primary Mexico benefit." },
  { id: "energy-transition", num: "02", title: "Energy transition reshapes mix", tag: "Coal just 6% of revenue", color: "green",
    desc: "Coal's share collapsed from 28% to 10-12% industry-wide. CN's minimal exposure and growing petrochemical franchise position it well for the commodity mix shift." },
  { id: "potash-boom", num: "03", title: "Saskatchewan potash supercycle", tag: "BHP Jansen 8.5M tonnes by 2031", color: "orange",
    desc: "CN is the sole Class I serving BHP's massive Jansen mine. Global potash demand growing 5.3% CAGR with Russia/Belarus supply constrained." },
  { id: "capacity-crisis", num: "04", title: "PJM capacity crisis favors rail", tag: "Freight volumes +30-40% by 2040", color: "capRed",
    desc: "Highway capacity additions infeasible. Truck driver shortage structural. Rail moves 1 ton 500 miles per gallon vs 134 for trucks — 3-4x advantage." },
  { id: "psr-to-growth", num: "05", title: "PSR matured; pivot to growth", tag: "OR floor in high 50s", color: "purple",
    desc: "All Class I ORs cluster 60-65%. Oliver Wyman says near maximum efficiency. Next paradigm: revenue growth through intermodal conversion and pricing." },
  { id: "competitive-dynamics", num: "06", title: "Oligopoly in flux", tag: "Proposed UP-NS $85B merger", color: "deepBlue",
    desc: "CPKC merger closed CN's Mexico gap. UP-NS mega-merger could reshape the industry. Most dynamic competitive period since Staggers Act in 1980." },
];

export const thesisSections = [
  {
    id: "nearshoring", num: "01", title: "Nearshoring is real, but CPKC captures the primary benefit",
    lead: "US-Mexico freight trade reached $872.8B in 2025. The growth trajectory favors rail, but CN faces a structural disadvantage versus CPKC's tri-national network.",
    metrics: [
      { value: "$872.8B", label: "US-Mexico freight trade (2025)" },
      { value: "$45.3B", label: "Mexico net FDI (2024)" },
      { value: "12.7%", label: "Rail share of US-MX trade (by value)" },
      { value: "48 hrs", label: "CPKC transit time savings" },
    ],
    paragraphs: [
      "Mexico attracted $45.3B in net FDI in 2024, with Deloitte projecting ~$60B by 2027. Rail captures only 12.7% of US-Mexico trade by value (trucks handle 73.6%), but the growth trajectory favors rail on heavier, longer-haul corridors.",
      "CPKC is the only single-line railroad connecting all three USMCA nations. CN terminates at the Gulf Coast and relies on Union Pacific/Ferromex partnerships for Mexico connectivity — a structural disadvantage CPKC exploits with 48-hour transit time savings on Canada-Mexico lanes.",
      "CN has responded with the 'Falcon' premium intermodal service (CN/UP/Ferromex partnership) and Gulf port expansion at Gulfport and New Orleans, but these are interline workarounds, not single-line solutions.",
    ],
    pullQuote: "Mexico is now the #1 source of US auto imports, and CPKC moves vehicles and parts across the entire NAFTA supply chain on a single bill of lading.",
    capture: {
      title: "CN's competitive response",
      points: [
        "Falcon premium intermodal service: CN/UP/Ferromex partnership providing competitive Canada-Mexico routing through Gulf Coast interchange.",
        "Gulf Coast expansion: investment at Gulfport and New Orleans to capture petrochemical, LNG, and container flows.",
        "Over 85% of CN's traffic originates on its network, and 65%+ terminates on it — demonstrating franchise density even without Mexico direct access.",
      ],
    },
  },
  {
    id: "energy-transition", num: "02", title: "The energy transition reshapes the commodity mix",
    lead: "Coal's structural decline is well understood. What matters for CN is the mix shift toward higher-value petrochemicals, LPG, and refined products flowing through its Gulf Coast network.",
    metrics: [
      { value: "6%", label: "CN coal exposure (vs CSX 16%)" },
      { value: "+7%", label: "Petroleum & chemicals growth (2024)" },
      { value: "88,700 b/d", label: "Crude-by-rail (structural decline)" },
      { value: "50%", label: "Utility coal demand drop by 2030" },
    ],
    paragraphs: [
      "Coal's share of Class I revenue has collapsed from ~28% in 2005 to ~10-12% by 2023. Moody's projects utility coal demand will drop 50% by 2030, representing ~$5B in aggregate railroad revenue loss.",
      "CN's coal exposure at just 6% of revenue (C$929M in 2024, predominantly metallurgical) is materially below CSX (~16%) and Norfolk Southern (~13%).",
      "CN's Gulf Coast network provides direct access to petrochemical complexes, LNG export facilities, and propane terminals. Its petroleum & chemicals segment grew 7% in 2024 driven by plastics, LPG/propane, and refined products.",
    ],
    pullQuote: "Crude-by-rail is in structural decline averaging just 88,700 b/d in 2024 post-TMX expansion, but higher-value chemical flows are growing.",
    capture: {
      title: "CN's energy positioning",
      points: [
        "Gulf Coast access to petrochemical complexes, LNG export terminals, and propane infrastructure — highest-growth energy corridors.",
        "Minimal thermal coal exposure (6% vs 13-16% for eastern peers) shields CN from the steepest secular decline in rail commodities.",
        "Petroleum & chemicals (20% of revenue) is CN's fastest-growing commodity segment, driven by the US petrochemical buildout.",
      ],
    },
  },
  {
    id: "potash-boom", num: "03", title: "Saskatchewan potash supercycle",
    lead: "CN's most visible multi-year growth catalyst. BHP's Jansen mine — the largest potash project in history — runs directly on CN's network.",
    metrics: [
      { value: "4.2M t/yr", label: "BHP Jansen Stage 1 (~2027)" },
      { value: "8.5M t/yr", label: "Jansen Stage 2 by 2031" },
      { value: "38.8M MT", label: "Global potash consumption (2024)" },
      { value: "5.3%", label: "Potash demand CAGR" },
    ],
    paragraphs: [
      "Saskatchewan produces ~32% of global potash. BHP's massive Jansen mine — Stage 1 at 4.2M tonnes/year beginning ~2027, Stage 2 doubling to 8.5M tonnes by 2031 — runs directly on CN's network.",
      "Nutrien is simultaneously ramping to 18M tonnes capacity. Global potash consumption reached 38.8M MT in 2024 and is growing at ~5.3% CAGR.",
      "With Belarus and Russia (together ~40% of global supply) facing sanctions, Canadian producers are structurally advantaged. CN set a record grain month in February 2026 at 2.67M metric tonnes from Western Canada.",
    ],
    pullQuote: "The BHP Jansen mine is the largest potash project in history — and it runs exclusively on CN's network. This is a generational volume catalyst.",
    capture: {
      title: "CN's potash franchise",
      points: [
        "Sole Class I railroad serving BHP Jansen — no competitive alternative exists for moving 4.2-8.5M tonnes/year to export markets.",
        "Grain & fertilizers segment (20% of revenue, +5% in 2024) is CN's most visible structural growth driver through 2031+.",
        "Record grain volumes: 2.67M metric tonnes in February 2026 from Western Canada demonstrate the network's capacity for bulk flows.",
      ],
    },
    expandables: [
      { title: "Russia/Belarus sanctions create structural advantage", tag: "Geopolitical",
        content: "Belarus and Russia together controlled ~40% of global potash supply. Sanctions and logistics disruption have permanently redirected demand toward Canadian producers. Saskatchewan's share of global supply is rising, and every incremental tonne moves on CN's rails." },
      { title: "Nutrien's parallel expansion", tag: "Volume catalyst",
        content: "Nutrien is ramping to 18M tonnes capacity simultaneously with BHP Jansen. Combined, these expansions could add 10-15M tonnes of annual potash production to CN's network by the early 2030s — the largest incremental volume opportunity in CN's history." },
    ],
  },
  {
    id: "capacity-crisis", num: "04", title: "Rail's structural moat over trucking deepens",
    lead: "The economic case for freight rail rests on physics — steel on steel generates far less friction than rubber on asphalt. This advantage compounds as highway capacity stagnates.",
    metrics: [
      { value: "500 mi", label: "Ton-miles per gallon (rail)" },
      { value: "134 mi", label: "Ton-miles per gallon (truck)" },
      { value: "10x", label: "Trucking emission intensity vs rail" },
      { value: "30-40%", label: "Freight volume growth by 2040" },
    ],
    paragraphs: [
      "Rail moves one ton of freight ~500 miles per gallon of diesel versus ~134 for trucks — a 3-4x fuel efficiency advantage. Rail produces 0.048 lbs of GHG per ton-mile versus trucking's 0.465 lbs — trucks are nearly 10x more emission-intensive.",
      "On cost, rail averages $0.03-0.05 per ton-mile versus $0.15-0.20 for trucking, a 3-5x gap. Freight volumes are projected to grow 30-40% by 2040, but highway capacity additions are increasingly infeasible.",
      "The truck driver shortage reflects structural headwinds — the average driver is 46 years old, annual turnover at large carriers exceeds 90%. Each freight upcycle tightens trucking capacity, pushing the competitive frontier toward rail.",
    ],
    pullQuote: "The breakeven distance for intermodal versus trucking has declined to approximately 500 km (300 miles), down from ~800 km historically.",
    capture: {
      title: "CN's intermodal positioning",
      points: [
        "Intermodal is CN's largest segment (22% of revenue). Q4 2025 intermodal revenue grew 10% YoY after a cyclical trough.",
        "Prince Rupert gateway offers 2-3 day sailing advantage over US West Coast ports — expanding from 1.35M to 1.8M TEU capacity.",
        "US intermodal volumes hit their second-highest annual total ever in 2025 at 14.06 million units — cyclical recovery underway.",
      ],
    },
    expandables: [
      { title: "Autonomous trucking: the one technology threat", tag: "Risk to monitor",
        content: "McKinsey projects autonomous trucks could shift rail-truck cost parity from ~500 to ~1,000 miles. ARK Invest envisions electric autonomous trucks at 3¢/ton-mile — potentially below rail. However, full commercial scaling remains years away. The technology primarily threatens intermodal (25-30% of CN revenue), not bulk commodity transport." },
    ],
  },
  {
    id: "psr-to-growth", num: "05", title: "PSR matured — the industry pivots to growth",
    lead: "CN pioneered Precision Scheduled Railroading. Today, all Class I operating ratios cluster 60-65%, and the next paradigm is revenue growth, not further cost extraction.",
    metrics: [
      { value: "61.9%", label: "CN operating ratio (FY2025)" },
      { value: "10-15%", label: "CN target EPS CAGR (2024-2026)" },
      { value: "~60%", label: "Structural OR floor (industry)" },
      { value: "C$2B", label: "Share buybacks (FY2025)" },
    ],
    paragraphs: [
      "CN pioneered PSR under Hunter Harrison in the early 2000s. Today, all Class I operating ratios cluster in the 60-65% range, and Oliver Wyman concluded the industry is operating near its maximum efficiency level.",
      "The consensus: marginal OR gains from further headcount reductions are de minimis. Operating ratios in the high 50s may represent the structural floor.",
      "CN targets 10-15% compounded annual diluted EPS growth for 2024-2026, driven by pricing discipline and volume leverage rather than further cost extraction.",
    ],
    pullQuote: "BNSF's new CEO Greg Abel has publicly targeted closing the 5.7-point gap to Union Pacific, noting each point generates ~$230M in incremental operating cash flow.",
    capture: {
      title: "CN's growth levers",
      points: [
        "Pricing discipline: core pricing gains of 2-4% above inflation, with captive shipper routes providing structural pricing power.",
        "Volume leverage: high fixed-cost structure means incremental revenue flows at ~40% operating margin — powerful in an upcycle.",
        "Capital allocation: C$3.34B FCF, C$2B buybacks, 3% dividend growth in FY2025. Management targeting return of >80% of FCF to shareholders.",
      ],
    },
  },
  {
    id: "competitive-dynamics", num: "06", title: "The oligopoly is restructuring",
    lead: "The CPKC merger and proposed UP-NS combination signal the most dynamic competitive period since Staggers Act deregulation in 1980. CN's positioning is strong but pressured.",
    metrics: [
      { value: "$85B", label: "Proposed UP-NS merger value" },
      { value: "55.9%", label: "CPKC core adj. OR (Q4 2025)" },
      { value: "+11.7%", label: "Mexico rail volumes YTD 2026" },
      { value: "52,215", label: "UP-NS combined route miles" },
    ],
    paragraphs: [
      "Since closing in April 2023, CPKC has delivered record performance: core adjusted OR of 55.9% in Q4 2025, revenue growth of 4% versus CN's 2%. CPKC's Mexico access is its trump card.",
      "The proposed UP-NS transcontinental merger ($85B, announced July 2025) would create a 52,215-route-mile system spanning 43 states. CN, CPKC, and BNSF all formally oppose.",
      "If approved, it could trigger further consolidation (BNSF-CSX?), potentially reducing North America to 2-3 mega-systems and fundamentally altering CN's competitive position.",
    ],
    pullQuote: "CPKC's truck-to-rail conversion has underperformed merger projections (~16,000 actual versus 64,000 projected), suggesting the competitive threat is real but not yet fully realized.",
    capture: {
      title: "Competitive landscape",
      points: [
        "CN's tri-coastal network remains unique — Pacific (Vancouver, Prince Rupert), Atlantic (Halifax, Montreal), Gulf (New Orleans, Mobile) on a single line.",
        "The 1998 Illinois Central acquisition gave CN the 'Main Line of Mid-America' (Chicago-Memphis-New Orleans) — a corridor no competitor can replicate.",
        "The 2008 EJ&E acquisition provided a Chicago bypass carrying ~25-30 trains daily around the continent's most congested interchange.",
      ],
    },
    expandables: [
      { title: "What if UP-NS is approved?", tag: "Scenario analysis",
        content: "A merged UP-NS would control ~40-45% of US rail market share with 52,215 route miles across 43 states. This could trigger BNSF-CSX consolidation, leaving CN as a mid-sized carrier in a 3-system North America. CN's opposition filing emphasizes competitive harm, but the STB has historically allowed transformational mergers (BN-SF in 1996, CPKC in 2023) when competitive remedies are sufficient." },
    ],
  },
];

export const competitorTable = [
  { name: "Union Pacific", revenue: "$24.5B", or: "59.8%", miles: "~32,100", diff: "Western US duopoly; best-in-class OR" },
  { name: "BNSF", revenue: "$23.4B", or: "65.5%", miles: "~32,500", diff: "Western US duopoly; Berkshire-owned" },
  { name: "CN", revenue: "C$17.3B", or: "61.9%", miles: "~20,000", diff: "Only tri-coastal network" },
  { name: "CPKC", revenue: "C$15.1B", or: "62.8%", miles: "~20,000", diff: "Only tri-national network" },
  { name: "CSX", revenue: "$14.1B", or: "~67.9%", miles: "~21,000", diff: "Eastern US duopoly" },
  { name: "Norfolk Southern", revenue: "$12.2B", or: "64.2%", miles: "~19,400", diff: "Eastern US duopoly" },
];

export const commodityMix = [
  { segment: "Intermodal", revenue: "C$3,757M", pct: 22, yoy: "-2%", outlook: "Cyclical recovery; Prince Rupert expansion" },
  { segment: "Grain & Fertilizers", revenue: "C$3,422M", pct: 20, yoy: "+5%", outlook: "Structural growth — potash boom" },
  { segment: "Petroleum & Chemicals", revenue: "C$3,414M", pct: 20, yoy: "+7%", outlook: "Moderate growth; petrochemical mix shift" },
  { segment: "Metals & Minerals", revenue: "C$2,048M", pct: 12, yoy: "0%", outlook: "Stable; infrastructure spending support" },
  { segment: "Forest Products", revenue: "C$1,931M", pct: 11, yoy: "-1%", outlook: "Challenged — tariffs, BC supply decline" },
  { segment: "Coal", revenue: "C$929M", pct: 6, yoy: "-9%", outlook: "Secular decline; met coal more durable" },
  { segment: "Automotive", revenue: "C$894M", pct: 5, yoy: "-5%", outlook: "Cyclically weak; EV transition mixed" },
];

export const riskTiers = [
  { tier: 1, label: "Structural", items: [
    { title: "US-Canada trade war / USMCA renegotiation", severity: "High", prob: "Medium-High",
      detail: "C$350M+ FY2025 revenue drag. USMCA review in July 2026 is 'the biggest risk' per CEO. 32% of revenue from transborder traffic." },
    { title: "Climate disruption — BC corridor vulnerability", severity: "High", prob: "Medium",
      detail: "CN's western network disrupted in 4 of last 5 years: Lytton wildfire 2021, BC floods 2021, 17.6M hectare wildfire season 2023, Jasper fire 2024. Limited alternative routes through BC mountains." },
    { title: "CPKC structural competitive threat", severity: "Medium-High", prob: "High",
      detail: "CPKC Mexico access captures nearshoring directly. Revenue growth 4% vs CN 2%. Mexico rail volumes +11.7% YTD. CN's ROIC declined from 14.1% to 11.1%." },
  ]},
  { tier: 2, label: "Cyclical", items: [
    { title: "Recession sensitivity — operating leverage", severity: "Medium", prob: "Medium",
      detail: "~60% OR means 40¢ of each incremental revenue dollar flows to operating income — powerful up, painful down. 2008-09: Canadian rail revenues fell 14.4%." },
    { title: "Regulatory tightening — reciprocal switching", severity: "Medium", prob: "Medium",
      detail: "CTA broadened interswitching eligibility. 160-km extended interswitching pilot for Prairie provinces threatens captive grain pricing." },
  ]},
  { tier: 3, label: "Emerging", items: [
    { title: "UP-NS merger reshapes industry", severity: "Medium", prob: "Low-Medium",
      detail: "If approved, could reduce North America to 2-3 mega-systems. CN could become a mid-sized carrier. STB rejected initial application Jan 2026." },
    { title: "Autonomous trucking narrows rail advantage", severity: "Low-Medium", prob: "Low",
      detail: "Could shift rail-truck parity from 500 to 1,000 miles. Primarily threatens intermodal (25-30% of revenue). Full scaling years away." },
  ]},
];

export const railVsTrucking = [
  { metric: "Fuel efficiency", rail: "500 mi/gal/ton", truck: "134 mi/gal/ton", advantage: "3.7x" },
  { metric: "Emissions (GHG/ton-mile)", rail: "0.048 lbs", truck: "0.465 lbs", advantage: "~10x cleaner" },
  { metric: "Cost per ton-mile", rail: "$0.03-0.05", truck: "$0.15-0.20", advantage: "3-5x cheaper" },
  { metric: "Societal cost (CBO)", rail: "0.8¢/gross ton-mi", truck: "4.0¢/gross ton-mi", advantage: "5x lower" },
];

export const monitoringPoints = [
  { label: "USMCA July 2026 review outcome", why: "Determines whether ~90% tariff exemption protecting most Canadian exports survives. Existential for CN's transborder franchise.", timeframe: "July 2026" },
  { label: "BHP Jansen Stage 1 commissioning", why: "4.2M tonnes/year of potash on CN's network. Confirms the generational volume catalyst.", timeframe: "~2027" },
  { label: "UP-NS merger STB proceedings", why: "Revised filing expected April 2026. Approval would trigger industry restructuring. CN formally opposes.", timeframe: "2026-2028" },
];

export const chartData = {
  revenueBySegment: {
    labels: ["Intermodal", "Grain/Fert", "Petro/Chem", "Metals", "Forest", "Coal", "Auto"],
    values: [3757, 3422, 3414, 2048, 1931, 929, 894],
  },
  operatingRatioTrend: {
    labels: ["2020", "2021", "2022", "2023", "2024", "2025"],
    cn: [61.5, 59.8, 60.2, 63.5, 63.1, 61.9],
    cpkc: [61.2, 60.5, 61.8, 63.2, 64.1, 62.8],
    up: [60.1, 57.2, 60.5, 63.0, 60.2, 59.8],
  },
  capacityFactor: [
    { label: "CN Rail (fuel eff.)", value: 500 },
    { label: "CSX Rail (fuel eff.)", value: 528 },
    { label: "Average Truck", value: 134 },
  ],
  classIRevenue: {
    labels: ["UP", "BNSF", "CN", "CPKC", "CSX", "NS"],
    values: [24.5, 23.4, 12.5, 10.9, 14.1, 12.2],
  },
};

// ─── STAGE 2: BUSINESS PRIMER DATA ───

export const primerSnapshot = [
  { value: "C$17.3B", label: "FY2025 Revenue" },
  { value: "61.9%", label: "2025 Op. Ratio" },
  { value: "C$7.63", label: "Adj. Diluted EPS" },
  { value: "C$3.3B", label: "Free Cash Flow" },
  { value: "~20,000", label: "Route Miles" },
];

export const networkCards = [
  { title: "Pacific Gateway", text: "Vancouver and Prince Rupert provide access to transpacific trade. Prince Rupert is the closest North American port to Asia (500 nautical miles closer than other PNW ports), with the deepest natural harbour on the continent and on-dock rail. Intermodal volumes through Prince Rupert surged 20% in 2025, reaching ~886,000 TEUs. CN has the gentlest grade through the Rockies of any West Coast-serving railroad." },
  { title: "Prairie Corridor", text: "The spine of CN's bulk commodity business. Connects the grain elevator network across Alberta, Saskatchewan, and Manitoba to export terminals at Vancouver, Prince Rupert, and Thunder Bay. CN set an all-time record for Western Canadian grain shipments in 2025 at 32.7 million tonnes. Edmonton is a critical intermodal hub being expanded." },
  { title: "Eastern Canada", text: "Serves the industrial heartland of Ontario and Quebec, connecting Toronto and Montreal to Halifax on the Atlantic coast. Handles manufactured goods, forest products, and chemicals. Critical for automotive traffic between Canadian plants and U.S. assembly facilities." },
  { title: "U.S. Midwest & Gulf", text: "Following the 1998 Illinois Central acquisition, CN extends from Chicago south to New Orleans and Mobile, Alabama. Wisconsin Central (2001) added the Chicago-Duluth corridor. The U.S. network accounted for roughly 30% of CN's 2024 revenues (C$5.2B). Chicago intermodal hub investments are ongoing." },
];

export const revenueTable = [
  { segment: "Intermodal", rev: "3,892", pct: "23%", yoy: "+4%", drivers: "Consumer goods, containers; Vancouver & Prince Rupert int'l +13% in Q4" },
  { segment: "Grain & Fertilizers", rev: "3,658", pct: "22%", yoy: "+7%", drivers: "Record Western Canadian grain; potash exports; bumper crop" },
  { segment: "Petroleum & Chemicals", rev: "3,478", pct: "21%", yoy: "+2%", drivers: "NGLs via Prince Rupert, refined products, plastics" },
  { segment: "Metals & Minerals", rev: "~2,000", pct: "12%", yoy: "~0%", drivers: "Iron ore, steel, aggregates; sensitive to construction cycle" },
  { segment: "Forest Products", rev: "~1,800", pct: "11%", yoy: "-1%", drivers: "Lumber, pulp, paper; soft on U.S. housing & tariff headwinds" },
  { segment: "Coal", rev: "~920", pct: "6%", yoy: "-9%", drivers: "Met coal (steel-making) & thermal coal; declining secular trend" },
  { segment: "Automotive", rev: "~820", pct: "5%", yoy: "-20%", drivers: "Finished vehicles, parts; weak due to tariff uncertainty" },
];

export const operatingMetrics = [
  { metric: "Operating Ratio (adj.)", fy23: "60.8%", fy24: "62.9%", fy25: "61.7%", trend: "Improving" },
  { metric: "Revenue (C$B)", fy23: "16.8", fy24: "17.0", fy25: "17.3", trend: "+2% CAGR" },
  { metric: "Adj. Diluted EPS (C$)", fy23: "7.28", fy24: "7.10", fy25: "7.63", trend: "+7% YoY" },
  { metric: "Free Cash Flow (C$B)", fy23: "3.9", fy24: "3.1", fy25: "3.3", trend: "+8% YoY" },
  { metric: "RTMs (B)", fy23: "232.6", fy24: "235.5", fy25: "238.2", trend: "+1% YoY" },
  { metric: "Adj. ROIC", fy23: "14.5%", fy24: "13.1%", fy25: "~13.0%", trend: "Stable" },
];

export const capitalAllocation = [
  { item: "Capital Expenditure", amount: "~C$3.4B", detail: "~20% of revenue. Track, signals, yards, capacity expansion (Prince Rupert corridor, Edmonton intermodal, Chicago hub)" },
  { item: "Dividends", amount: "~C$2.1B", detail: "29th consecutive year of increases; 5% hike in 2025; ~47% payout ratio; ~2.8% yield" },
  { item: "Share Buybacks", amount: "~C$2.0B", detail: "~15M shares repurchased in 2025; new NCIB authorised for 20M shares through Feb 2026" },
  { item: "Net Debt / EBITDA Target", amount: "2.5x", detail: "Current leverage ~2.4x; investment-grade credit (A-rated). Conservative among Class I peers" },
];

export const peerComparison = [
  { peer: "CN", miles: "~20,000", geo: "CAN + U.S.", triCoast: "Unique", rev: "C$17.3B", or: "61.7%", yield: "~2.8%", leverage: "~2.4x" },
  { peer: "CPKC", miles: "~20,000", geo: "CAN + U.S. + MEX", triCoast: "—", rev: "C$14.6B", or: "~63%", yield: "~0.8%", leverage: "~2.8x" },
  { peer: "Union Pacific", miles: "~32,000", geo: "Western U.S.", triCoast: "—", rev: "US$24.3B", or: "~60%", yield: "~2.3%", leverage: "~2.8x" },
  { peer: "BNSF", miles: "~32,500", geo: "Western U.S.", triCoast: "—", rev: "~US$23B", or: "~61%", yield: "Private (BRK)", leverage: "N/A" },
];

export const businessRisks = [
  { title: "Tariff & Trade Disruption", text: "U.S.-Canada trade tensions directly impact CN's cross-border traffic. Management estimated tariffs and trade uncertainty cost over C$350M in FY2025 revenue. Forest products, automotive, and international intermodal are most exposed. CN guides to flat volumes in 2026 as a result." },
  { title: "Labour & Operations", text: "The August 2024 lockout (both CN and CPKC simultaneously) highlighted labour risk. Harsh Canadian winters regularly disrupt service. The 2023 wildfire season and port worker strikes also impacted operations. Unionised workforce introduces recurring negotiation risk." },
  { title: "Macro / Volume Sensitivity", text: "Rail volumes are cyclical, tied to industrial production, housing, consumer spending, and agricultural output. A recession would hit carloads across nearly all segments. CN's operating leverage means margin compression accelerates when volumes fall." },
  { title: "Regulatory & Competitive", text: "Canada's Transportation Modernization Act increases regulatory scrutiny on service levels and pricing. CPKC's Mexico access is a structural competitive threat CN cannot replicate organically. The grain revenue cap limits upside pricing on the highest-volume commodity." },
];

// ─── STAGE 3: INSTITUTIONAL EQUITY ANALYSIS DATA ───

export const moatSources = [
  { title: "Physical network monopoly", evidence: "~20,000 route miles; only Class I connecting Atlantic, Pacific, and Gulf. 85%+ traffic originates on-network. Replication cost: hundreds of billions.", durability: "Permanent", rating: "Strong" },
  { title: "Regulatory moat", evidence: "78% of US freight stations served by single Class I. No switching order granted in 40 years. STB/CTA frameworks formalize the oligopoly.", durability: "Long-term", rating: "Strong" },
  { title: "Captive shipper economics", evidence: "Mines, grain elevators, chemical plants physically connected to single railroad. Trucking costs 3-4x more per ton-mile. Switching requires new track construction.", durability: "Long-term", rating: "Strong" },
  { title: "Cost advantage (OR discipline)", evidence: "61.7% adj. OR (Q4: 60.1%). Near-zero variable cost per incremental tonne. Each 100bp OR improvement = ~C$170M incremental operating income.", durability: "Medium-term", rating: "Strong" },
  { title: "Intermodal network effects", evidence: "Falcon Premium (UP/Ferromex), CN-CSX interline, Crowley container service. Interline with short lines grew 10% even as volumes declined 5%.", durability: "Medium-term", rating: "Moderate" },
];

export const moatComparison = [
  { peer: "CN", reach: "Atlantic-Pacific-Gulf", portAccess: "Prince Rupert monopoly", or: "62.9%", captive: "High (Canadian duopoly)", crossBorder: "US-Canada" },
  { peer: "CPKC", reach: "Canada-US-Mexico (unique)", portAccess: "None exclusive", or: "61.3%", captive: "High (Canadian duopoly)", crossBorder: "US-Canada-Mexico" },
  { peer: "UNP", reach: "Western US only", portAccess: "Ferromex stake (25%)", or: "59.9%", captive: "High (Western US)", crossBorder: "US-Mexico (via Ferromex)" },
  { peer: "CSX", reach: "Eastern US only", portAccess: "Limited", or: "~63.9%", captive: "Moderate", crossBorder: "None" },
  { peer: "NSC", reach: "Eastern US only", portAccess: "Limited", or: "65.8%", captive: "Moderate", crossBorder: "None" },
];

export const qualityScorecard = [
  { metric: "Adj. ROIC", y20: "13.3%", y21: "14.1%", y22: "15.9%", y23: "14.5%", y24: "13.1%", y25: "~13.5%E" },
  { metric: "Adj. Operating Ratio", y20: "61.9%", y21: "61.2%", y22: "59.9%", y23: "60.8%", y24: "62.9%", y25: "61.7%" },
  { metric: "Adj. EPS (C$)", y20: "5.28", y21: "5.95", y22: "7.46", y23: "7.28", y24: "7.10", y25: "7.63" },
  { metric: "FCF (C$B)", y20: "3.2", y21: "3.3", y22: "4.3", y23: "3.9", y24: "3.1", y25: "3.3" },
  { metric: "FCF / Net Income", y20: "91%", y21: "78%*", y22: "83%", y23: "81%*", y24: "69%", y25: "71%" },
];

export const kpiScorecard = [
  { kpi: "RTMs (millions)", y22: "234,964", y23: "232,614", y24: "235,538", y25: "238,159", trend: "Flat/slight growth" },
  { kpi: "Revenue/RTM (C$/100)", y22: "~7.28", y23: "~7.23", y24: "~7.24", y25: "~7.27E", trend: "Stable" },
  { kpi: "Adj. operating ratio", y22: "59.9%", y23: "60.8%", y24: "62.9%", y25: "61.7%", trend: "Recovering ▲" },
  { kpi: "Train speed (mph)", y22: "18.9", y23: "19.8", y24: "18.9", y25: "19.2", trend: "Volatile" },
  { kpi: "Terminal dwell (hours)", y22: "7.6", y23: "7.0", y24: "7.1", y25: "7.0", trend: "Improved ▲" },
  { kpi: "Car velocity (miles/day)", y22: "195", y23: "213", y24: "206", y25: "215", trend: "Improved ▲" },
  { kpi: "Fuel eff. (gal/1000 GTMs)", y22: "0.865", y23: "0.874", y24: "0.873", y25: "0.875", trend: "Near record" },
  { kpi: "Capex / Revenue", y22: "~19%", y23: "~19%", y24: "~21%", y25: "~16%E (2026)", trend: "Declining ▲" },
];

export const peerORComparison = [
  { peer: "Union Pacific", or24: "59.9%", q4Trend: "Industry-leading; Q4 58.7%" },
  { peer: "CPKC", or24: "61.3%", q4Trend: "Improving rapidly; Q4 57.1% (core)" },
  { peer: "CN", or24: "62.9%", q4Trend: "Recovering; Q4 60.1%" },
  { peer: "CSX", or24: "~63.9%", q4Trend: "Lagging; service metrics weakest" },
  { peer: "Norfolk Southern", or24: "65.8%", q4Trend: "Improving post-activist" },
];

export const variantBull = [
  { title: "Prince Rupert monopoly optionality is mispriced", detail: "CN has exclusive rail access to North America's closest major port to Asia. Expanding from 1.6M to 1.8M TEU, with CANXPORT adding 400K TEU by ~2027. CN envisions doubling mainline capacity from ~25 to 50 trains/day. 58-hour shipping advantage over LA/Long Beach." },
  { title: "FCF inflection is underappreciated", detail: "Capex declining from C$3.5B to C$2.8B in 2026 — a C$700M reduction. CN should generate C$3.5B+ in FCF, supporting ~5.5% FCF yield. The 24M-share buyback (~4% of float) creates a price floor. Management wants to 'take advantage of the cheap share price.'" },
  { title: "Overseas revenue insulates more than assumed", detail: "37% of revenues from overseas traffic vs 29% transborder. Port network enables trade diversification — the opposite of tariff vulnerability." },
  { title: "Western Canada energy renaissance", detail: "LNG Canada operational. Keyera-CN partnership targets 45,000 annual carloads of NGL exports via Prince Rupert. Propane, methanol, plastics pellets scaling. JX LNG's proposed inland facility would use CN directly." },
];

export const variantBear = [
  { title: "Tariff and CUSMA risk is dominant", detail: "Tariffs erased >C$350M of 2025 revenue. CUSMA review in July 2026 is the highest-impact catalyst — hostile renegotiation could structurally impair 29% of revenue from cross-border flows. Forest products (-5%) and automotive (-10% Q4) already suffering." },
  { title: "CPKC is becoming formidable", detail: "Single-line Canada-US-Mexico network captures nearshoring directly. 51% of Vancouver container volumes in recent months. Tracking toward C$1.2B annual merger synergies by 2027. Q4 2025 core OR of 57.1% is best-in-class." },
  { title: "Jasper corridor is catastrophic single point of failure", detail: "CN's sole route through Jasper National Park faces intensifying wildfire risk. No bypass exists. July 2024 Jasper fire cut Vancouver traffic 46% and Prince Rupert 42%. Climate models suggest growing annual risk." },
  { title: "Labor relations structurally adversarial", detail: "August 2024 simultaneous CN/CPKC shutdown was unprecedented. TCRC challenged constitutionality of binding arbitration. Next major negotiations (~2027-2028) carry elevated disruption risk." },
];

export const valuationHistory = [
  { metric: "Trailing P/E", current: "~18.1x", avg5y: "20.6x", low5y: "16.9x", high5y: "23.3x", vsAvg: "-12%" },
  { metric: "Forward P/E", current: "~17.2x", avg5y: "~19.5x", low5y: "~16x", high5y: "~22x", vsAvg: "-12%" },
  { metric: "EV/EBITDA", current: "~11.8x", avg5y: "~12.5x", low5y: "~10x", high5y: "~14x", vsAvg: "-6%" },
  { metric: "Dividend Yield", current: "2.6%", avg5y: "~2.0%", low5y: "1.5%", high5y: "2.8%", vsAvg: "Higher (cheaper)" },
  { metric: "P/FCF", current: "~25x", avg5y: "~28x", low5y: "~22x", high5y: "~35x", vsAvg: "-11%" },
];

export const peerValuationTable = [
  { peer: "CN (CNI)", trailingPE: "18.1x", fwdPE: "17.2x", evEbitda: "11.8x", pFcf: "25.2x", divYield: "2.6%", or: "62.9%", roic: "~13%" },
  { peer: "UNP", trailingPE: "20.0x", fwdPE: "19.3x", evEbitda: "14.0x", pFcf: "26.0x", divYield: "2.1%", or: "59.9%", roic: "15.8%" },
  { peer: "CPKC", trailingPE: "24.7x", fwdPE: "21.4x", evEbitda: "15.3x", pFcf: "45.9x", divYield: "0.75%", or: "61.3%", roic: "~7%*" },
  { peer: "CSX", trailingPE: "26.2x", fwdPE: "21.8x", evEbitda: "14.4x", pFcf: "43.2x", divYield: "1.4%", or: "~63.9%", roic: "~11%" },
  { peer: "NSC", trailingPE: "22.1x", fwdPE: "~19.5x", evEbitda: "13.5x", pFcf: "~29x", divYield: "2.0%", or: "65.8%", roic: "~10%" },
];

export const riskMatrix = [
  { rank: 1, risk: "US-Canada tariff / CUSMA failure", prob: "High", impact: "High", mitigant: "37% overseas revenue; CUSMA-compliant goods largely exempt; steel/aluminum = 2% of southbound" },
  { rank: 2, risk: "Jasper corridor wildfire/climate", prob: "High (recurring)", impact: "High", mitigant: "Fire suppression trains; vegetation management; but no bypass exists" },
  { rank: 3, risk: "CPKC competitive encroachment", prob: "High", impact: "Medium", mitigant: "Prince Rupert monopoly; Gulf Coast access; deeper Midwest penetration" },
  { rank: 4, risk: "Labor relations / work stoppage", prob: "Medium", impact: "High", mitigant: "Government binding arbitration within hours; but legally challenged" },
  { rank: 5, risk: "STB regulatory tightening", prob: "Medium", impact: "Medium", mitigant: "July 2025 court vacatur favorable; Part 1144 repeal NPRM in progress" },
  { rank: 6, risk: "Commodity mix cyclicality", prob: "Medium", impact: "Medium", mitigant: "Diversified (no segment >23%); grain near-record; forest/auto declining" },
  { rank: 7, risk: "Leverage creep above target", prob: "Low-Med", impact: "Low-Med", mitigant: "Return to 2.5x by 2027; A-/A2 stable outlook; capex reduction improves FCF" },
];

export const s3Catalysts = [
  { label: "Q1 2026 Earnings", date: "Apr 27, 2026", detail: "Management flagged as 'the toughest quarter' on YoY comps. Consensus EPS: C$1.78. Any beat or constructive tariff guidance would be bullish." },
  { label: "CUSMA / USMCA Review", date: "July 2026", detail: "Highest-impact catalyst. Constructive outcome removes dominant overhang, triggers re-rating toward 19-20x fwd P/E. Hostile renegotiation pressures stock toward ~US$91 low." },
  { label: "FCF Inflection", date: "H2 2026", detail: "Capex down C$600M to C$2.8B. Visibly higher FCF from Q2-Q3 reports. Combined with 24M-share NCIB (~4% of float), creates price floor." },
  { label: "Grain Volume Strength", date: "Q1-Q2 2026", detail: "Record 2025 harvest (107M tonnes) still being exported. Second-best January ever. Elevated volumes persist before normalizing." },
  { label: "Prince Rupert Expansion", date: "2026-2027", detail: "Fairview to 1.8M TEU completing imminently. CANXPORT Phase 1 and Ridley Island energy terminal validate monopoly growth thesis." },
  { label: "OR Momentum", date: "Throughout 2026", detail: "Q4 2025's 60.1% was best in years. 400 mgmt layoffs (C$75M savings), 5% headcount cut. Could approach high-59% range." },
  { label: "Capital Return Acceleration", date: "Feb 2026-Feb 2027", detail: "24M shares authorized for buyback — largest NCIB in recent memory. ~C$3.5B potential repurchases, roughly equal to annual FCF." },
];

// ─── CHANNEL CHECKS ───

export const channelChecks = [
  {
    category: "Shipper / Customer",
    items: [
      { source: "Ag Transport Coalition (grain shippers)", signal: "negative",
        title: "Grain service is genuinely poor — worse than CPKC",
        detail: "Since mid-November 2024, CN supplied on average only 56% of all cars ordered by shippers in the week ordered. For Prince Rupert specifically, performance averaged 53%, falling as low as 19% in one week. CN has rationed over 12,000 shipper orders this grain year, including 8,600 in the last 2.5 months. CN has been below the 90% car supply threshold for 30+ consecutive weeks. Most recent data (late March 2026) shows improvement to 86%, but still below 90% for a fifth straight week.",
        implication: "Contradicts management's 'run the plan' service narrative. Louis Dreyfus precedent ($23M damages for 2013-14 failures) creates litigation exposure if sub-90% performance persists." },
      { source: "RailState (intermodal data)", signal: "positive",
        title: "CN outperforming CPKC at Vancouver",
        detail: "CN achieved a 25% increase in daily TEU movement at Deltaport by adding trains and expanding average train size, leading to consistent declines in dwell times. CPKC is surprisingly moving less volume YoY, driven by smaller trains carrying 15% fewer TEUs on average. CN's TEUs per day up 11.4% from March 2024 and 25.2% from February, with TEUs per train up 9.1% YoY. CN enjoys 0.6% grade through the Rockies vs CPKC's 2.4% — a permanent physical advantage for heavier intermodal trains.",
        implication: "Operational superiority in intermodal — the higher-growth, higher-margin segment. Directly supports CN's intermodal growth thesis." },
    ],
  },
  {
    category: "Key Customer / Partner",
    items: [
      { source: "AltaGas (largest CN energy customer at Prince Rupert)", signal: "positive",
        title: "AltaGas: $2.9B/yr LPG exports, REEF adding 62 cars/day",
        detail: "AltaGas CEO Vern Yu's commentary is unambiguously bullish on CN-Prince Rupert. Exporting $2.9B/year of LPG to Asia — 11% of Japan's imports, 6% of China's propane, 13% of South Korea's. REEF terminal (C$1.35B, opening late 2026) will add ~62 tank cars per day. China tariff dynamic is actually a tailwind — China's demand for non-U.S. propane increased after the trade war, growing from zero to 8% of imports.",
        implication: "Captive, growing, high-margin customer locked into CN's monopoly corridor." },
      { source: "Prince Rupert Port Authority", signal: "positive",
        title: "26.3M tonnes (+14%), $3B+ infrastructure pipeline",
        detail: "Prince Rupert handled 26.3M tonnes in 2025, up 14% over 2024. Intermodal traffic through Fairview rose 20% YoY to 885,797 TEUs. CN launched Zanardi Rapids Bridge Expansion (1,600-foot two-track bridge, completion 2027). CANXPORT (400K TEU, mid-2026), South Kaien Logistics Park (100K+ TEU), and REEF collectively represent >$3B in customer-funded infrastructure where CN is sole rail carrier.",
        implication: "Third-party capital commitments validate CN's corridor economics and monopoly position." },
    ],
  },
  {
    category: "Competitor",
    items: [
      { source: "CPKC (Keith Creel, Q4 2025 earnings call)", signal: "mixed",
        title: "CPKC: 55.9% Q4 OR, Mexico winning traffic, but weaker at Vancouver",
        detail: "CPKC achieved industry-best 55.9% Q4 OR, 120bp improvement YoY. Expects mid-single-digit volume growth and low double-digit earnings growth for 2026. Creel highlighted the unique growth drivers from connecting Canada, US, and Mexico — pointed differentiation vs CN. However, RailState data confirms CPKC's operational execution at Vancouver is weaker: fewer trains, smaller train sizes, declining volumes.",
        implication: "Strategic threat on Mexico corridor is real. But CN is winning the operational battle at Canadian ports — the more immediately relevant competitive frontier." },
    ],
  },
  {
    category: "Regulatory / Institutional",
    items: [
      { source: "CTA 2024-25 Annual Report", signal: "mixed",
        title: "CPKC fined on grain revenue; interswitching expanded",
        detail: "CPKC exceeded its Maximum Revenue Entitlement for 2023-24 crop year, triggering $1.9M in penalties. CN's revenues remained below its cap — suggesting CN is pricing more conservatively or ceding volume. CTA rejected all CN/CPKC arguments to restrict interswitching eligibility, expanding access to all traffic types including empty cars and intermodal.",
        implication: "Modest negative for CN's pricing power on captive shippers within 30km, but practical impact is limited since most facilities are beyond interchange range." },
    ],
  },
  {
    category: "Supply Chain / Sub-Supplier",
    items: [
      { source: "DP World / Ray-Mont / IntermodeX", signal: "positive",
        title: "Three major logistics players investing >$1B in CN-served corridor",
        detail: "DP World: 885,797 TEUs in 2025 (+20%), funding terminal expansion to 1.8M TEU capacity. Ray-Mont: relocating and expanding to operate CANXPORT starting mid-2026, adding 400K TEU of export transloading. IntermodeX: committed to 100K+ TEU annual capacity at South Kaien with 200 new jobs.",
        implication: "Independent logistics providers are all doubling down on CN's Prince Rupert corridor — strong validation of the growth thesis." },
    ],
  },
];

export const channelSummary = [
  { source: "Ag Transport Coalition", signal: "Negative", implication: "Service quality risk, regulatory/litigation exposure" },
  { source: "RailState (intermodal)", signal: "Positive", implication: "Operational superiority at Vancouver; winning share" },
  { source: "AltaGas (energy customer)", signal: "Strongly positive", implication: "Captive, growing, high-margin traffic" },
  { source: "Prince Rupert Port Authority", signal: "Strongly positive", implication: "Validates monopoly corridor growth" },
  { source: "CPKC (competitor)", signal: "Mixed", implication: "Strategic threat on Mexico; CN winning at ports" },
  { source: "CTA (regulator)", signal: "Mildly negative", implication: "Shipper access expanding, but limited practical impact" },
  { source: "DP World / Ray-Mont / IntermodeX", signal: "Strongly positive", implication: "Third-party capital validates corridor economics" },
];
