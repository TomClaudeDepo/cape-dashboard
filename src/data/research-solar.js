// Global Solar Energy — Institutional Equity Research Primer — April 2026

export const solarSnapshot = {
  sector: "Solar Photovoltaic Energy",
  cumulativeCapacity: "~2,900 GW",
  annualInstallations: "647–655 GW",
  electricityShare: "~8.8%",
  totalInvestment: "$450–500B/yr",
  moduleASP: "$0.087/W (CN)",
  overcapacityRatio: "2.5–2.8x",
};

export const heroStats = [
  { value: "2,900", unit: "GW", label: "Cumulative global capacity", color: "orange" },
  { value: "655", unit: "GW", label: "2025 annual installations", color: "green" },
  { value: "8.8%", unit: "", label: "Share of global electricity (H1 2025)", color: "deepBlue" },
  { value: "$450B+", unit: "", label: "Annual investment spending", color: "green" },
  { value: "80%+", unit: "", label: "China's value chain control", color: "capRed" },
  { value: "3x", unit: "", label: "US vs global module prices", color: "orange" },
];

/* ─── Section 1: Market Scale ─── */
export const capacityGrowthData = [
  { year: "2016", cumulative: 303, annual: 76 },
  { year: "2017", cumulative: 402, annual: 99 },
  { year: "2018", cumulative: 510, annual: 108 },
  { year: "2019", cumulative: 627, annual: 117 },
  { year: "2020", cumulative: 760, annual: 133 },
  { year: "2021", cumulative: 940, annual: 180 },
  { year: "2022", cumulative: 1179, annual: 239 },
  { year: "2023", cumulative: 1626, annual: 447 },
  { year: "2024", cumulative: 2204, annual: 578 },
  { year: "2025", cumulative: 2855, annual: 651 },
];

export const forecastData = [
  { year: "2025", installations: 651 },
  { year: "2026E", installations: 649 },
  { year: "2027E", installations: 688 },
  { year: "2028E", installations: 743 },
  { year: "2029E", installations: 930 },
];

export const regionalCapacity = [
  { region: "China", gw: 1200, share: 41.4, color: "capRed" },
  { region: "EU", gw: 406, share: 14.0, color: "deepBlue" },
  { region: "United States", gw: 279, share: 9.6, color: "green" },
  { region: "India", gw: 136, share: 4.7, color: "orange" },
  { region: "Rest of World", gw: 879, share: 30.3, color: "grey400" },
];

export const segmentSplit = [
  { segment: "Utility-scale", share: 62, color: "deepBlue" },
  { segment: "C&I", share: 23, color: "green" },
  { segment: "Residential", share: 15, color: "orange" },
];

export const generationData = [
  { year: "2019", twh: 724, shareOfElec: 2.7 },
  { year: "2020", twh: 863, shareOfElec: 3.3 },
  { year: "2021", twh: 1053, shareOfElec: 3.8 },
  { year: "2022", twh: 1346, shareOfElec: 4.7 },
  { year: "2023", twh: 1744, shareOfElec: 6.1 },
  { year: "2024", twh: 2131, shareOfElec: 7.3 },
  { year: "2025E", twh: 2700, shareOfElec: 8.8 },
];

export const marketScaleParagraphs = [
  "Global solar PV crossed the 2 TW cumulative capacity milestone in late 2024 and reached approximately 2,900 GW by end-2025 -- a figure that took over four decades to reach 1 TW (in 2022) but only two more years to double. China alone surpassed 1,200 GW (roughly half the global total), with the United States at approximately 279 GW, India at 136 GW, and the EU at 406 GW.",
  "Annual installation run-rates tell the story of exponential growth moderating: additions surged from 239 GW in 2022 to 447 GW in 2023 (+87%) and 553-602 GW in 2024 (+29%), before reaching 647-655 GW in 2025 (+8-11%). Solar electricity generation reached an estimated 2,700 TWh in 2025, up from 2,131 TWh in 2024. In the first half of 2025 alone, solar's share of global electricity hit 8.8%, and 34 economies now generate more than 10% of their electricity from solar.",
  "The total addressable market in dollar terms is approximately $450-500 billion annually in investment spending (IEA World Energy Investment 2025), making solar PV the single largest line item in global energy investment -- surpassing upstream oil and gas. By segment, utility-scale accounts for roughly 62% of annual installations, with C&I at around 23% and residential at approximately 15%.",
  "Looking forward, all major forecasters -- BNEF, IEA, and S&P Global -- project the first year-over-year decline in annual installations in 2026, driven primarily by China's transition from guaranteed feed-in tariffs to competitive market pricing. Non-China markets continue growing through the transition. The IEA projects cumulative solar capacity will surpass natural gas by 2026 and coal by 2027.",
];

/* ─── Section 2: Demand Drivers ─── */
export const demandDrivers = [
  {
    title: "US policy: the IRA rollback",
    tagColor: "capRed",
    tag: "Headwind",
    keyFacts: [
      { value: "30% ITC", label: "Residential credit terminated Dec 31 2025" },
      { value: "Jul 4 2026", label: "Safe-harbour deadline for utility-scale" },
      { value: "330K jobs", label: "Threatened by OBBBA (SEIA estimate)" },
      { value: "$220B", label: "Investment at risk over the decade" },
    ],
    paragraphs: [
      "The most consequential policy development since the Inflation Reduction Act itself is its partial rollback. The One Big Beautiful Bill Act (OBBBA), signed July 4, 2025, terminated the 30% residential solar ITC (Section 25D) for systems placed in service after December 31, 2025, with no phase-out. Commercial and utility-scale credits (Sections 45Y/48E) survive only for projects that begin construction by July 4, 2026 or are placed in service by December 31, 2027. This creates a 12-month safe-harboring rush that is already reshaping the US development pipeline.",
    ],
  },
  {
    title: "AI and data centers: structural demand shock",
    tagColor: "green",
    tag: "Tailwind",
    keyFacts: [
      { value: "945 TWh", label: "Projected DC power by 2030 (from 485)" },
      { value: "50%", label: "Share of US demand growth from DCs" },
      { value: "40 GW", label: "Microsoft's clean energy contracts" },
      { value: "55.9 GW", label: "Global corporate PPAs in 2025" },
    ],
    paragraphs: [
      "Global data center electricity consumption is projected to nearly double from 485 TWh in 2025 to 945 TWh by 2030 (IEA). In the US, data centers are expected to account for 50% of electricity demand growth through 2030. Big Tech hyperscalers -- Meta, Amazon, Google, Microsoft -- accounted for 49% of global corporate PPA activity in 2025. Microsoft alone has contracted 40 GW of clean energy.",
    ],
  },
  {
    title: "Battery storage: enabling solar baseload",
    tagColor: "green",
    tag: "Tailwind",
    keyFacts: [
      { value: "$70/kWh", label: "Stationary storage pack price (2025)" },
      { value: "-45%", label: "Year-over-year decline in storage cost" },
      { value: "$78/MWh", label: "4-hour battery LCOS (down 27% YoY)" },
      { value: "$57-91", label: "Solar+storage LCOE ($/MWh, unsub.)" },
    ],
    paragraphs: [
      "The collapse in battery costs is transforming solar economics. BNEF's 2025 survey recorded stationary storage pack prices at $70/kWh -- down 45% in a single year and now the cheapest lithium-ion segment. Solar-plus-storage hybrid projects are achieving LCOEs of $57-91/MWh unsubsidized, making them competitive with gas combined-cycle plants in most markets and decisively undercutting gas peakers at $102-200/MWh.",
    ],
  },
  {
    title: "Electrification: expanding the addressable market",
    tagColor: "deepBlue",
    tag: "Structural",
    keyFacts: [
      { value: "4.3%", label: "Global electricity demand growth (2024)" },
      { value: "5-7%", label: "China annual demand growth" },
      { value: "EU-equiv.", label: "China demand add by 2030 (IEA)" },
      { value: "3%", label: "Global demand growth (2025)" },
    ],
    paragraphs: [
      "Global electricity demand grew 4.3% in 2024 and 3% in 2025 -- well above historical trends. EV adoption, heat pump deployment, and industrial electrification are all expanding total demand. The IEA projects China alone will add EU-equivalent electricity demand by 2030. This structural demand growth supports sustained solar deployment well beyond current installation rates.",
    ],
  },
];

export const policyComparison = [
  { region: "EU", policy: "Net Zero Industry Act", target: "40% domestic mfg", status: "Non-price criteria Jan 2026" },
  { region: "China", policy: "15th Five-Year Plan", target: "~200 GW/yr to 2035", status: "2030 target hit 6 yrs early" },
  { region: "India", policy: "PLI Scheme + BCD", target: "500 GW non-fossil by 2030", status: "120 GW module capacity" },
  { region: "US", policy: "IRA + OBBBA rollback", target: "Safe harbour Jul 2026", status: "Residential ITC terminated" },
];

/* ─── Section 3: Headwinds ─── */
export const tariffData = [
  { country: "Cambodia", rate: "650-3,500%", status: "Effectively shut" },
  { country: "Thailand", rate: "375-972%", status: "Effectively shut" },
  { country: "Vietnam", rate: "120-813%", status: "Effectively shut" },
  { country: "Malaysia", rate: "14-250%", status: "Severely restricted" },
];

export const headwindMetrics = [
  { value: "2,300 GW", label: "US interconnection queue", detail: "More than 2x total installed US capacity", color: "capRed" },
  { value: "5 years", label: "Median request-to-COD time", detail: "Only 14-19% of projects reach completion", color: "orange" },
  { value: "3.4M MWh", label: "California curtailment (2024)", detail: "Up 29%, solar = 93% of curtailed output", color: "capRed" },
  { value: "128+ weeks", label: "Transformer lead times (US)", detail: "30% supply deficit on power transformers", color: "orange" },
  { value: "6.6%", label: "China curtailment rate (H1 2025)", detail: "Tibet 33.9%, Qinghai 15.2%", color: "capRed" },
  { value: "100+", label: "Solar companies bankrupt (2023-24)", detail: "Sunnova, SunPower, Solar Mosaic", color: "capRed" },
];

export const nemImpact = {
  title: "NEM 3.0 has structurally impaired US residential solar",
  before: { payback: "5-6 years", exportComp: "Retail rate", batteryRate: "~15%" },
  after: { payback: "14-15 years", exportComp: "-75% cut", batteryRate: "50-60%" },
  paragraphs: [
    "California's NEM 3.0, effective since April 2023, slashed export compensation by roughly 75%, extending residential solar payback periods from 5-6 years to 14-15 years without storage. US residential installations fell 32% in 2024 to their lowest level since 2021, with battery attachment rates surging to 50-60% as a partial offset.",
    "The residential segment has been devastated: Sunnova filed Chapter 11 in June 2025 with $8.9 billion in debt, joining SunPower and Solar Mosaic in bankruptcy. Over 100 solar companies went bankrupt in 2023-2024. The pure solar-only rooftop proposition is dead in reformed NEM markets, but solar-plus-storage as a home energy management system retains strong economics.",
  ],
};

export const supplyChainConcentration = [
  { stage: "Polysilicon", chinaShare: 83 },
  { stage: "Wafers", chinaShare: 95 },
  { stage: "Cells", chinaShare: 80 },
  { stage: "Modules", chinaShare: 80 },
];

export const headwindsParagraphs = [
  "The US International Trade Commission imposed AD/CVD duties on crystalline silicon solar from Southeast Asia effective June 2025, with rates reaching staggering levels: 650-3,500% on Cambodia, 375-972% on Thailand, 120-813% on Vietnam, and 14-250% on Malaysia. These effectively shut the Southeast Asian supply route that previously delivered the majority of US imports. US module prices are now roughly 3x global levels at $0.25-0.28/W versus Chinese FOB prices of $0.087/W.",
  "An estimated 2,300 GW of projects sit in US interconnection queues -- more than double total installed US capacity. The median time from request to commercial operation stretches to five years, with only 14-19% of projects historically reaching completion. Transformer supply is a critical sub-bottleneck: US power transformers face a 30% supply deficit with lead times of 128-144 weeks.",
  "Silver consumption is an emerging constraint: PV now accounts for 29% of global silver demand (up from 11% in 2014), with the market experiencing its fifth consecutive annual supply deficit (~95 million ounces in 2025). TOPCon and HJT cells require more silver per watt than PERC, creating structural demand growth.",
];

/* ─── Section 4: Competitive Positioning vs Alternatives ─── */
export const solarVsAlternatives = [
  { source: "Solar PV", lcoe: "$24-96", investment: "$450B", trend: "Declining", note: "Cheapest new-build in most markets" },
  { source: "Onshore wind", lcoe: "$24-75 (↑55%)", investment: "$126B", trend: "Increasing", note: "5x less capacity added vs solar" },
  { source: "Offshore wind", lcoe: "$72-140 (↑23%)", investment: "~$40B", trend: "Increasing", note: "20+ GW cancelled in US" },
  { source: "Nuclear (new)", lcoe: "$141-220", investment: "~$75B", trend: "Flat", note: "NuScale SMR cancelled; 3-5x solar cost" },
  { source: "Gas peaker", lcoe: "$149-251", investment: "N/A", trend: "Flat", note: "Decisively undercut by solar+storage" },
  { source: "Gas CCGT", lcoe: "$48-109", investment: "N/A", trend: "Flat", note: "Solar+storage approaching parity" },
  { source: "Solar + storage", lcoe: "$57-91", investment: "Included above", trend: "Declining", note: "Cheapest dispatchable new-build" },
];

export const investmentComparison = [
  { source: "Solar", h1_2025: 252 },
  { source: "Wind", h1_2025: 126 },
  { source: "Nuclear", h1_2025: 38 },
  { source: "Other RE", h1_2025: 34 },
];

export const competitiveParagraphs = [
  "Solar's dominance of new capacity additions is unprecedented and expanding. In 2024, solar represented approximately 76% of all new renewable capacity (IRENA), up from around 43% in 2020. Since renewables themselves constitute 87%+ of all new power capacity, solar alone accounts for well over 60% of all new generation built globally -- a share never achieved by any single technology.",
  "Against onshore wind, solar now adds roughly 5x more capacity annually. Onshore wind LCOE actually increased 55% in Lazard's 2025 analysis (due to turbine costs and supply chain pressures), while solar LCOE continued declining. Against offshore wind, the comparison is even starker: over 20 GW of planned US offshore wind has been cancelled or indefinitely halted.",
  "Solar-plus-storage is already the cheapest form of dispatchable new-build generation in many markets. At $57-91/MWh unsubsidized, it undercuts gas peakers ($149-251/MWh) and is approaching parity with combined-cycle gas ($48-109/MWh).",
];

/* ─── Section 5: Technology ─── */
export const techMarketShare = [
  { year: "2020", perc: 85, topcon: 3, hjt: 2, other: 10 },
  { year: "2021", perc: 83, topcon: 5, hjt: 3, other: 9 },
  { year: "2022", perc: 80, topcon: 8, hjt: 4, other: 8 },
  { year: "2023", perc: 55, topcon: 30, hjt: 7, other: 8 },
  { year: "2024", perc: 30, topcon: 55, hjt: 8, other: 7 },
  { year: "2025E", perc: 15, topcon: 65, hjt: 8, other: 12 },
];

export const efficiencyRecords = [
  { tech: "TOPCon (commercial)", efficiency: "22-24%", record: "26.7%", holder: "JinkoSolar", note: "Dominant technology, 60-65% market share" },
  { tech: "HJT (heterojunction)", efficiency: "23-25%", record: "27.3%", holder: "LONGi", note: "Higher theoretical ceiling, ~8% share" },
  { tech: "HPBC (back-contact)", efficiency: "24-25%", record: "27.81%", holder: "LONGi", note: "Highest commercial single-junction record" },
  { tech: "Perovskite-Si tandem", efficiency: "24.5%*", record: "34.85%", holder: "LONGi", note: "Lab record; stability challenges remain" },
  { tech: "CdTe thin-film", efficiency: "18-20%", record: "22.3%", holder: "First Solar", note: "Non-silicon; US-manufactured; unique moat" },
];

export const technologyParagraphs = [
  "The industry is undergoing its most significant technology transition in a decade: the wholesale replacement of P-type PERC cells with N-type TOPCon. N-type wafers now constitute approximately 70% of global production, surpassing P-type for the first time in 2024. TOPCon cells account for around 60-65% of production, up from near-zero three years ago. PERC's share has collapsed from 80% in 2022 to under 30% and is expected to be fully phased out by 2028.",
  "The most transformative technology in development is the perovskite-silicon tandem cell. LONGi achieved 34.85% efficiency on a 1 cm2 cell (NREL-certified, April 2025). Oxford PV shipped its first commercial tandem modules in September 2024 at 24.5% module efficiency, with 26% products planned for 2026 and GW-scale manufacturing targeted for 2026-2027. If stability challenges are resolved, tandems could push commercial module efficiencies above 30%, fundamentally altering project economics.",
  "Bifacial modules now represent 75%+ of global production (up from 8% in 2019), providing 5-20% energy yield gains. Module wattages continue climbing -- SNEC 2025 showcased 800W+ modules using larger G12 wafer formats projected to reach 75% market share by 2035.",
];

/* ─── Section 6: Supply Chain Crisis ─── */
export const overcapacityTable = [
  { stage: "Polysilicon", capacity: "~4M MT (~1,600 GW eq.)", demand: "~1.7M MT", ratio: "~2.4x", utilization: "44%" },
  { stage: "Wafers", capacity: ">1,100 GW", demand: "~650-700 GW", ratio: "~1.7x", utilization: "54%" },
  { stage: "Cells", capacity: ">1,100 GW", demand: "~650-700 GW", ratio: "~1.7x", utilization: "~55%" },
  { stage: "Modules", capacity: "~1,800 GW", demand: "~650-700 GW", ratio: "~2.5-2.8x", utilization: "~40%" },
];

export const overcapacityVisual = [
  { stage: "Polysilicon", capacityGW: 1600, demandGW: 680 },
  { stage: "Wafers", capacityGW: 1100, demandGW: 675 },
  { stage: "Cells", capacityGW: 1100, demandGW: 675 },
  { stage: "Modules", capacityGW: 1800, demandGW: 675 },
];

export const chineseManufacturerLosses = [
  { company: "JinkoSolar", h1Loss: "-$350M (est.)", fy2025: "~-$940M", margin: "~0-3%" },
  { company: "LONGi", h1Loss: "-$580M (est.)", fy2025: "RMB -6.0-6.5B", margin: "Negative" },
  { company: "Trina Solar", h1Loss: "-$300M (est.)", fy2025: "TBD", margin: "~2-5%" },
  { company: "JA Solar", h1Loss: "-$310M (est.)", fy2025: "TBD", margin: "~1-4%" },
];

export const polyMargins = [
  { company: "Daqo", margin: -65.8, type: "Polysilicon" },
  { company: "GCL Technology", margin: -12.2, type: "Polysilicon" },
  { company: "Tongwei", margin: -4.7, type: "Solar ops" },
  { company: "JinkoSolar", margin: 2.5, type: "Modules" },
  { company: "Trina Solar", margin: 3.8, type: "Modules" },
  { company: "First Solar", margin: 45.2, type: "CdTe modules" },
  { company: "Nextracker", margin: 33.5, type: "Trackers" },
  { company: "Enphase", margin: 47.8, type: "Microinverters" },
];

export const moduleASPData = [
  { period: "Q1 2023", chinaFOB: 0.22, usPrice: 0.32 },
  { period: "Q2 2023", chinaFOB: 0.19, usPrice: 0.31 },
  { period: "Q3 2023", chinaFOB: 0.16, usPrice: 0.30 },
  { period: "Q4 2023", chinaFOB: 0.13, usPrice: 0.29 },
  { period: "Q1 2024", chinaFOB: 0.11, usPrice: 0.28 },
  { period: "Q2 2024", chinaFOB: 0.10, usPrice: 0.27 },
  { period: "Q3 2024", chinaFOB: 0.09, usPrice: 0.26 },
  { period: "Q4 2024", chinaFOB: 0.085, usPrice: 0.26 },
  { period: "Q1 2025", chinaFOB: 0.080, usPrice: 0.25 },
  { period: "Q2 2025", chinaFOB: 0.084, usPrice: 0.26 },
  { period: "Q3 2025", chinaFOB: 0.087, usPrice: 0.27 },
  { period: "Q4 2025", chinaFOB: 0.087, usPrice: 0.28 },
];

export const supplyChainParagraphs = [
  "The scale of Chinese manufacturing overcapacity is difficult to overstate. Global module production capacity reached approximately 1,800 GW/year in 2025 against actual demand of 650-700 GW -- an overcapacity ratio of approximately 2.5-2.8x. Polysilicon capacity of around 4 million MT operates at just 44% utilization. The result has been a catastrophic price collapse: Chinese FOB module prices hit all-time lows of approximately $0.08/W in early 2025, well below production cost for most manufacturers.",
  "The financial consequences are severe. The top four Chinese module manufacturers -- JinkoSolar, LONGi, Trina Solar, and JA Solar -- posted combined net losses of approximately RMB 11 billion ($1.54 billion) in H1 2025, with losses deepening 2.5x versus H1 2024. Polysilicon producers fared worse: Daqo posted a gross margin of -65.8%, GCL Technology -12.2%, and Tongwei -4.7% on solar operations. Average EBITDA margins for major Chinese solar firms collapsed to 4.7% in 2024 from 12.4% previously.",
  "US domestic module manufacturing capacity surged to 60+ GW by end-2025 (from 14.5 GW at end-2023), driven by IRA Section 45X manufacturing credits. First Solar is approaching 14 GW of US capacity across Ohio, Alabama, and Louisiana. Qcells completed a $2.5 billion integrated ingot-to-module complex in Cartersville, Georgia. However, upstream capacity remains almost entirely dependent on Chinese imports. Meyer Burger's collapse illustrates the difficulty of competing with Chinese pricing without significant scale.",
];

/* ─── Section 7: Regional Dynamics ─── */
export const regionalDetails = [
  {
    region: "China",
    flag: "CN",
    installed2025: "315 GW",
    cumulative: "1,200 GW",
    highlight: "Half the world's solar",
    color: "capRed",
    keyMetrics: [
      { value: "1,200 GW", label: "Cumulative capacity" },
      { value: "315 GW", label: "2025 installations (record)" },
      { value: "215-220 GW", label: "2026E installations" },
      { value: "6.6%", label: "National curtailment rate" },
    ],
    paragraphs: [
      "China installed a record 315 GW in 2025, bringing cumulative capacity to 1,200 GW -- approximately half the global total. The country crossed the 1 TW milestone in May 2025, becoming the first nation to do so. However, the transition from guaranteed feed-in tariffs to competitive market pricing (effective June 2025) is expected to reduce 2026 installations to 215-220 GW. Rising curtailment (6.6% nationally, 33.9% in Tibet) and grid infrastructure constraints are the primary challenges.",
    ],
  },
  {
    region: "United States",
    flag: "US",
    installed2025: "43.2 GW",
    cumulative: "~279 GW",
    highlight: "Policy whiplash reshapes the landscape",
    color: "deepBlue",
    keyMetrics: [
      { value: "43.2 GW", label: "2025 installations (-14% YoY)" },
      { value: "54%", label: "Share of all new US capacity" },
      { value: "2,300 GW", label: "Interconnection queue" },
      { value: "60+ GW", label: "Domestic module capacity" },
    ],
    paragraphs: [
      "The US installed 43.2 GW in 2025 (down 14% from the 2024 record of 50 GW), with solar accounting for 54% of all new electricity capacity. The OBBBA's July 2026 safe-harbor deadline is creating an intense front-loading of development activity. Sunnova's bankruptcy and SunPower's Chapter 11 have consolidated the residential market around Sunrun (971,000 subscribers, $14.6 billion total debt), while utility-scale developers like NextEra (30 GW backlog) and AES (11.7 GW PPA backlog) continue robust growth.",
    ],
  },
  {
    region: "Europe",
    flag: "EU",
    installed2025: "65.1 GW",
    cumulative: "406 GW",
    highlight: "Steady additions, manufacturing crisis",
    color: "green",
    keyMetrics: [
      { value: "65.1 GW", label: "2025 installations" },
      { value: "406 GW", label: "Surpassed 320 GW target" },
      { value: "98%", label: "Solar imports from China" },
      { value: "EUR584B", label: "Grid investment needed by 2030" },
    ],
    paragraphs: [
      "The EU installed 65.1 GW in 2025, surpassing its intermediate target of 320 GW. Germany led at approximately 16 GW, followed by Spain (around 9 GW) and France (approximately 6 GW). However, SolarPower Europe warns the 750 GW 2030 target is at risk. European solar manufacturing faces an existential crisis -- nearly 98% of EU solar imports come from China, Meyer Burger has collapsed entirely, and grid bottleneck investment needs total EUR 584 billion by 2030.",
    ],
  },
  {
    region: "India",
    flag: "IN",
    installed2025: "36.6 GW",
    cumulative: "~136 GW",
    highlight: "The fastest-growing major market",
    color: "orange",
    keyMetrics: [
      { value: "36.6 GW", label: "2025 installations (+43% YoY)" },
      { value: "120 GW", label: "Module manufacturing capacity" },
      { value: "19.3 GW", label: "Adani Green operating capacity" },
      { value: "500 GW", label: "Non-fossil target by 2030" },
    ],
    paragraphs: [
      "India installed 36.6 GW in 2025 (+43% year-over-year), with cumulative capacity reaching approximately 136 GW. Adani Green Energy operates 19.3 GW and is building the world's largest renewable energy plant at Khavda (30 GW target). Module manufacturing capacity has scaled to 120 GW. India's 500 GW non-fossil-fuel target by 2030 requires sustained additions of 35-40 GW/year -- achievable based on current trajectory.",
    ],
  },
  {
    region: "Middle East & Africa",
    flag: "MEA",
    installed2025: "~28 GW (combined)",
    cumulative: "~60 GW",
    highlight: "Sovereign capital meets abundant irradiance",
    color: "orange",
    keyMetrics: [
      { value: "$10.4/MWh", label: "Saudi world-record auction" },
      { value: "40 GW", label: "Saudi 2030 target" },
      { value: "20+ GW", label: "Africa solar (grew 54% YoY)" },
      { value: "2.79 GW", label: "ACWA Power commissioned (2025)" },
    ],
    paragraphs: [
      "Saudi Arabia's solar sector is surging, with ACWA Power commissioning 2.79 GW in 2025 and achieving world-record auction prices of $10.4/MWh. The kingdom targets 40 GW solar by 2030 and has become a top-10 renewable energy investor. Africa's solar capacity surpassed 20 GW in 2025, growing 54% year-over-year with 8 countries installing 100+ MW. Brazil reached 65 GW cumulative as the largest market in Latin America but faces rising curtailment.",
    ],
  },
];

/* ─── Section 8: Listed Companies ─── */
export const companyProfiles = [
  {
    segment: "Module Manufacturers",
    companies: [
      { name: "First Solar", ticker: "FSLR", grossMargin: "41-49.5%", revenue: "$5.2B", backlog: "53.7 GW ($16.4B)", moat: "CdTe thin-film, US-manufactured, net cash $2.4B", color: "green" },
      { name: "JinkoSolar", ticker: "JKS", grossMargin: "0-3%", revenue: "~$10B", backlog: "N/A", moat: "Volume leader (~85-100 GW), 26.7% TOPCon record", color: "capRed" },
      { name: "LONGi", ticker: "601012.SS", grossMargin: "Negative", revenue: "~$12B", backlog: "N/A", moat: "Technology leader (27.81% HPBC), perovskite tandem record", color: "capRed" },
      { name: "Canadian Solar", ticker: "CSIQ", grossMargin: "17-30%", revenue: "~$8B", backlog: "81 GWh pipeline", moat: "Best Chinese -- storage diversification (2.7 GWh Q3 shipment)", color: "orange" },
    ],
  },
  {
    segment: "Inverters",
    companies: [
      { name: "Sungrow", ticker: "300274.SZ", grossMargin: "~30%", revenue: "~$13B", backlog: "N/A", moat: "198 GW shipped, storage > inverters, 15% net margin", color: "green" },
      { name: "Enphase", ticker: "ENPH", grossMargin: "46.6%", revenue: "$1.5B", backlog: "N/A", moat: "Microinverter patents, MLPE mandates. Stock -68% 1yr", color: "orange" },
      { name: "SolarEdge", ticker: "SEDG", grossMargin: "Negative (turnaround)", revenue: "~$1B", backlog: "N/A", moat: "2024: $1.8B net loss. Turnaround underway", color: "capRed" },
    ],
  },
  {
    segment: "Developers / IPPs",
    companies: [
      { name: "NextEra Energy", ticker: "NEE", grossMargin: "N/A (regulated)", revenue: "$7.7B adj. earnings", backlog: "30 GW", moat: "~43 GW operating, $170B mkt cap, 24-27x P/E", color: "green" },
      { name: "AES Corp", ticker: "AES", grossMargin: "N/A", revenue: "~$11B", backlog: "11.7 GW PPA", moat: "Aggressively building renewables, exited coal", color: "green" },
      { name: "Adani Green", ticker: "ADANIGR.NS", grossMargin: "N/A", revenue: "~$2B", backlog: "50 GW by 2030 target", moat: "India's largest: 19.3 GW operating, Khavda 30 GW", color: "deepBlue" },
    ],
  },
  {
    segment: "Trackers",
    companies: [
      { name: "Nextracker", ticker: "NXT", grossMargin: "32-35%", revenue: "$3.0B (+25% CAGR)", backlog: "$4.5B", moat: "TrueCapture AI, 21% FCF margin, 16.5x fwd P/E, PEG 1.33", color: "green" },
      { name: "Array Technologies", ticker: "ARRY", grossMargin: "~25%", revenue: "~$1.5B", backlog: "N/A", moat: "Value alternative at 11.9x fwd P/E", color: "deepBlue" },
    ],
  },
];

export const marginComparisonData = [
  { company: "Enphase", gross: 46.6, segment: "Microinverters" },
  { company: "First Solar", gross: 45.2, segment: "CdTe Modules" },
  { company: "Nextracker", gross: 33.5, segment: "Trackers" },
  { company: "Sungrow", gross: 30.0, segment: "Inverters/Storage" },
  { company: "Canadian Solar", gross: 17.0, segment: "Modules + Storage" },
  { company: "JinkoSolar", gross: 2.5, segment: "Modules" },
  { company: "Trina Solar", gross: 3.8, segment: "Modules" },
  { company: "LONGi", gross: -5.0, segment: "Modules" },
  { company: "Daqo", gross: -65.8, segment: "Polysilicon" },
];

export const companyParagraphs = [
  "The solar value chain exhibits extreme margin dispersion. First Solar earns 41-49.5% gross margins on its CdTe thin-film modules -- benefiting from unique non-silicon technology, US manufacturing, and $1.6 billion in Section 45X tax credits (2025). Nextracker delivers 32-35% gross margins with a software-enhanced tracker platform, 21% free cash flow margins, and a $4.5 billion backlog. Meanwhile, Chinese module manufacturers operate at 0-7% gross margins (often negative).",
  "The residential segment has experienced a mass extinction event. Sunnova's Chapter 11 ($8.9B debt, assets sold for $118M), SunPower's bankruptcy, and Mosaic's failure have consolidated the market. Sunrun survives with 971,000 subscribers but carries $14.6B in total debt against $4.6B equity (315% D/E ratio). At least 12 notable solar companies filed for bankruptcy in 2024-2026.",
  "Chinese manufacturers are attempting coordinated supply discipline -- a proposed $7 billion consolidation fund among the top six polysilicon producers was halted by China's antitrust regulator in January 2026. In the US, IRA-driven manufacturing investment exceeds $92 billion announced, with 27+ new solar facilities.",
];

/* ─── Section 9: Key Debates ─── */
export const keyDebates = [
  {
    question: "Is China's overcapacity structural or cyclical?",
    bear: "China's manufacturing complex ($130B+ invested in 2023 alone) is permanent, with module capacity sufficient to meet global demand through 2032 without any new investment.",
    bull: "Severe financial losses, government-orchestrated supply discipline, coordinated price floors (~RMB 0.70/W), and likely bankruptcy of tier-2/3 producers will force rationalization. InfoLink identifies 2026 as the likely industry trough.",
    view: "Cyclically extreme but will partially self-correct by 2027-2028 as weaker players exit and demand resumes growth outside China.",
    lean: "Partially bull",
  },
  {
    question: "Can US domestic manufacturing truly scale without Chinese supply chains?",
    bear: "Despite 60+ GW of US module capacity, upstream independence remains illusory. Only Qcells has ingot-to-module capability. Achieving meaningful upstream independence would require $50B+ and 5-10 years.",
    bull: "First Solar's CdTe technology sidesteps the silicon supply chain entirely. Corning and Highland Materials represent early upstream steps. FEOC restrictions accelerate independence.",
    view: "First Solar has a genuinely independent value chain; the rest remain dependent. Full upstream independence is a decade away at best.",
    lean: "Lean bear",
  },
  {
    question: "Is residential solar structurally impaired?",
    bear: "NEM 3.0's 75% export cut, terminated residential ITC, and rising rates have created a perfect storm. US installations are running at roughly half their 2023 peak.",
    bull: "The shift to solar-plus-storage economics (60%+ battery attachment), third-party ownership accessing commercial ITC, and eventual rate relief could stabilize the segment.",
    view: "Partially correct. Pure solar-only rooftop is dead in reformed NEM markets, but solar-plus-storage retains strong economics.",
    lean: "Partially bear",
  },
  {
    question: "Are current module ASPs sustainable?",
    bear: "Chinese FOB at $0.087/W remains below full production cost. Government-mandated price floors and production cuts are attempting to push toward CNY 1/W (~$0.14/W). Return to $0.20+/W is unlikely.",
    bull: "Prices above the $0.08/W trough; rationalization underway. Moderate recovery to $0.10-0.12/W FOB by end-2026 is achievable.",
    view: "Expect modest recovery to $0.10-0.12/W FOB by end-2026. US prices will remain elevated at $0.25-0.35/W due to tariffs.",
    lean: "Partially bull",
  },
  {
    question: "What valuation framework fits solar's cyclicality?",
    bear: "P/E multiples are meaningless for loss-making Chinese manufacturers. Commodity cyclicals require different frameworks.",
    bull: "The market is learning to differentiate between structural quality (FSLR, NXT, NEE at 10-27x P/E) and commodity cyclicals.",
    view: "P/B and EV/replacement cost for Chinese names. DCF with scenario analysis around policy outcomes for Western quality names.",
    lean: "Framework",
  },
];

/* ─── Section 10: Investment Conclusions ─── */
export const moatSegments = [
  {
    area: "Technology differentiation",
    description: "First Solar's CdTe thin-film technology (non-silicon, US-manufactured, immune to polysilicon volatility, 45X-eligible) and Enphase's patented microinverter platform represent genuine moats. Nextracker's TrueCapture AI software creates meaningful switching costs.",
    companies: ["FSLR", "ENPH", "NXT"],
    color: "green",
  },
  {
    area: "Contracted, regulated earnings",
    description: "NextEra's 30 GW backlog of long-term PPAs provides visible, inflation-adjusted cash flows largely decoupled from module price volatility. IPPs and asset owners capture the most stable returns in the value chain.",
    companies: ["NEE", "AES"],
    color: "deepBlue",
  },
  {
    area: "Critical infrastructure chokepoints",
    description: "Tracker manufacturers, high-voltage equipment suppliers, and grid infrastructure companies benefit from the bottleneck dynamic -- the constraint on solar deployment is shifting from module supply to grid infrastructure (chronically under-supplied).",
    companies: ["NXT", "ARRY"],
    color: "orange",
  },
];

export const topPicks = [
  { company: "Nextracker", ticker: "NXT", thesis: "Asset-light, IP-driven, 21% FCF margins, PEG 1.33", conviction: "High" },
  { company: "First Solar", ticker: "FSLR", thesis: "Unique technology, $16.4B backlog, net cash -- attractive below 12x fwd P/E", conviction: "High" },
  { company: "NextEra Energy", ticker: "NEE", thesis: "Largest renewable developer, regulated earnings, 10% dividend growth", conviction: "High" },
  { company: "Sungrow", ticker: "300274.SZ", thesis: "Best risk-adjusted China exposure; $40B mkt cap, 15% net margins, storage doubling", conviction: "Medium-High" },
  { company: "Canadian Solar", ticker: "CSIQ", thesis: "Storage pivot provides upside if ESS margins hold", conviction: "Medium" },
];

export const catalysts = [
  { date: "Jul 4, 2026", event: "Safe-harbour deadline", detail: "Critical US policy date. Projects must demonstrate 'beginning of construction' to preserve tax credits. Expect rush of activity and potential legislative amendment.", color: "capRed" },
  { date: "H2 2026", event: "China supply rationalisation", detail: "Track monthly module production data (InfoLink), polysilicon utilization rates, and tier-2/3 manufacturer bankruptcy filings. Recovery in Chinese FOB prices above $0.10/W would signal inflection.", color: "orange" },
  { date: "2026-2027", event: "Perovskite-Si tandem commercialisation", detail: "Oxford PV and Hanwha Qcells targeting commercial production. If field reliability data proves favorable, this becomes the industry's most significant technology catalyst since PERC.", color: "green" },
  { date: "Ongoing", event: "US interconnection reform", detail: "FERC Order 2023 implementation progress. Quarterly interconnection agreement data from Berkeley Lab is the leading indicator of actual deployment capacity.", color: "deepBlue" },
  { date: "Ongoing", event: "Battery storage cost trajectory", detail: "Each further decline in stationary storage costs (~$70/kWh today) expands solar's addressable market into firm dispatchable power -- a category worth multiples of intermittent generation alone.", color: "green" },
];

export const keyCharts = [
  { name: "Chinese FOB module ASPs", why: "The clearing price that determines value chain profitability globally" },
  { name: "Quarterly installation volumes by region", why: "Ember/BNEF for early signals of demand shifts" },
  { name: "US interconnection queue conversion rates", why: "Berkeley Lab's 'Queued Up' -- the true leading indicator of US deployments" },
  { name: "BNEF lithium-ion battery pack price index", why: "The key variable determining solar+storage vs fossil economics" },
  { name: "Solar share of global electricity", why: "The single best metric for tracking the energy transition's pace" },
];

export const conclusionParagraphs = [
  "The solar industry in 2026 presents a paradox: the technology has never been cheaper, more efficient, or more widely deployed, yet corporate profitability across the Chinese-dominated manufacturing value chain has never been worse. For equity investors, this paradox is the opportunity.",
  "The companies that capture value are not those that make the cheapest commodity module, but those that control chokepoints, own differentiated technology, or hold contracted cash flows on the right side of the regulatory divide.",
  "The structural growth story -- from 9% of global electricity today toward 20%+ by the early 2030s -- remains intact and arguably understated by consensus. The investment question is not whether solar wins, but which companies capture that victory's economic surplus.",
];
