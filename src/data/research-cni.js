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
