// CEG (Constellation Energy) Research Data

export const cegSnapshot = {
  ticker: "CEG", exchange: "NASDAQ", price: "$300", ytdChg: "+540% since spin-off",
  forwardPE: "~25x", capacity: "55 GW", nuclearCapacity: "22 GW",
  revenue: "$25.5B", adjEPS: "$9.39", capacityFactor: "94.7%",
};

export const heroStats = [
  { value: "55 GW", label: "Combined fleet (post-Calpine)", color: "deepBlue" },
  { value: "22 GW", label: "Nuclear capacity (#1 US)", color: "green" },
  { value: "94.7%", label: "Nuclear capacity factor", color: "green" },
  { value: "10x", label: "PJM capacity price surge", color: "capRed" },
  { value: "430 TWh", label: "US DC demand 2030E (IEA)", color: "orange" },
  { value: "$26.6B", label: "Calpine acquisition", color: "purple" },
];

export const thesisCards = [
  { id: "ai-demand", num: "01", title: "AI electricity supercycle", tag: "Data centers 6-12% of US power by 2030", color: "deepBlue",
    desc: "US data centers consumed 176 TWh in 2023. By 2030, estimates converge on 300-600 TWh. AI queries use 10x more power than search." },
  { id: "nuclear-renaissance", num: "02", title: "Global nuclear renaissance", tag: "Triple capacity by 2050 (COP28)", color: "green",
    desc: "22 countries pledged to triple nuclear capacity. 63 reactors under construction. 61% US public approval. Bipartisan ADVANCE Act passed 88-2." },
  { id: "policy-floor", num: "03", title: "Policy floor, market upside", tag: "IRA PTC = $43.75/MWh floor", color: "purple",
    desc: "Section 45U PTC provides downside protection while preserving full upside to rising prices. Asymmetric payoff unique to nuclear." },
  { id: "capacity-crisis", num: "04", title: "PJM capacity crisis", tag: "Prices up 10x in 3 auctions", color: "capRed",
    desc: "Capacity prices surged from $29 to $333/MW-day. First-ever reliability shortfall. 80+ GW coal retiring by 2030." },
  { id: "gas-spread", num: "05", title: "Rising gas widens nuclear margin", tag: "Quark spread expanding", color: "orange",
    desc: "Henry Hub +56% to $3.52 in 2025. Nuclear fuel cost ~$5.50/MWh vs gas $25-40/MWh. Every $1 gas increase flows to nuclear margins." },
  { id: "electrification", num: "06", title: "Electrification & reshoring", tag: "$452B manufacturing investments", color: "deepBlue",
    desc: "Heat pumps outsold gas furnaces by 30%. CHIPS Act driving semiconductor fabs. US electricity demand growing 2-3% after 15yr stagnation." },
];

export const thesisSections = [
  {
    id: "ai-demand", num: "01", title: "The AI electricity supercycle",
    lead: "The single most powerful near-term catalyst. US data center electricity consumption is projected to roughly triple by 2030, creating unprecedented baseload demand that only nuclear can reliably serve.",
    metrics: [
      { value: "176 TWh", label: "US DC consumption (2023)" },
      { value: "430 TWh", label: "Projected by 2030 (IEA)" },
      { value: "10x", label: "AI query vs Google search" },
      { value: "50+ GW", label: "Potential US AI DC capacity" },
    ],
    paragraphs: [
      "US data centers consumed approximately 176 TWh in 2023 — roughly 4.4% of total US electricity. By 2030, credible mid-range estimates from the IEA, Goldman Sachs, and Lawrence Berkeley National Lab converge on 300-600 TWh, representing 6-12% of all US electricity.",
      "A single ChatGPT query consumes roughly 10x more electricity than a traditional Google search. Generative AI workloads consume 10-30x more energy than task-specific AI, and 80-90% of AI computing power now goes to inference — the ongoing, always-on demand that requires constant baseload power.",
      "Epoch AI and EPRI project that individual frontier AI training runs may draw 4-16 GW of power by 2030, with total US AI data center capacity potentially exceeding 50 GW.",
    ],
    pullQuote: "Data centers account for an estimated 97% of incremental load growth in the latest PJM forecast.",
    capture: {
      title: "Constellation's landmark deals",
      points: [
        "Microsoft: 20-year PPA for Crane Clean Energy Center (TMI-1 restart). 835 MW, $1.6B investment, $1B DOE loan. Target online 2027. Lifts EPS CAGR from 10% to 13%.",
        "Meta: 20-year virtual PPA for 1,121 MW from Clinton nuclear plant. ~$70/MWh — a $20/MWh premium over market. Replaces expiring state subsidies.",
        "Post-Calpine: 1,100+ MW in data center agreements with CyrusOne in Texas. $1B+ in 10-year GSA contracts for 13 federal agencies.",
      ],
    },
  },
  {
    id: "nuclear-renaissance", num: "02", title: "A global nuclear renaissance",
    lead: "The broader resurgence of nuclear energy provides critical context for Constellation's rerating. Public sentiment, policy, and capital are all flowing toward nuclear at an unprecedented rate.",
    metrics: [
      { value: "33", label: "Countries endorsed triple-nuclear pledge" },
      { value: "2,667 TWh", label: "Record global nuclear output (2024)" },
      { value: "63", label: "Reactors under construction" },
      { value: "61%", label: "US public favor nuclear (Gallup)" },
    ],
    paragraphs: [
      "At COP28 in December 2023, 22 countries signed a declaration to triple global nuclear capacity by 2050. By COP30, 33 countries had endorsed this pledge. Global nuclear output reached a record 2,667 TWh in 2024, surpassing the previous 2006 high.",
      "Gallup's March 2025 survey found 61% of Americans favor nuclear energy. Pew Research shows support jumped from 43% in 2020 to 59% in 2025. The ADVANCE Act passed the Senate 88-2 and the House 393-13.",
      "In May 2025, President Trump signed four executive orders targeting 400 GW of US nuclear capacity by 2050 — quadrupling today's installed base.",
    ],
    pullQuote: "Constellation's 21 reactors at 15 sites represent approximately 23-24% of all US nuclear generation — more than double the next largest fleet operator.",
    capture: {
      title: "Constellation's nuclear moat",
      points: [
        "94.7% capacity factor — highest 3-year rolling average among all 9 US nuclear fleet operators for the 5th consecutive year. Compare to wind at 34-35% and solar at 23%.",
        "Pursuing 80-year license extensions across the fleet. Dresden (2049/2051) and Peach Bottom (2053/2054) already approved.",
        "Targeting 1 GW in total nuclear uprates: 340 MW at Limerick, 30 MW at Clinton (Meta PPA).",
      ],
    },
  },
  {
    id: "policy-floor", num: "03", title: "Policy creates a floor, markets provide the upside",
    lead: "The IRA's nuclear production tax credit fundamentally transformed the risk-reward profile. An asymmetric payoff structure unique to nuclear operators.",
    metrics: [
      { value: "$43.75", label: "Effective floor ($/MWh)" },
      { value: "$15/MWh", label: "Max PTC value" },
      { value: "$2.1B", label: "PTC revenue in 2024" },
      { value: "2031+", label: "PTC runs through" },
    ],
    paragraphs: [
      "The IRA's Section 45U nuclear PTC provides up to $15/MWh on a sliding scale that phases out as gross receipts rise above approximately $25-26/MWh. The practical effect is an earnings floor of roughly $43.75/MWh — providing downside protection when wholesale prices are low while preserving full upside when prices are high.",
      "In 2024, when wholesale prices were relatively low, the PTC contributed approximately $2.1 billion to operating revenue. In 2025, as PJM prices surged, PTC revenue declined (H1 2025: $45M vs $712M in H1 2024) — but total revenue increased because higher market prices more than offset the lower credit.",
      "The 2025 'One Big Beautiful Bill' preserved nuclear PTCs while accelerating the phase-out of wind and solar credits — nuclear received more favorable treatment than any other clean energy technology.",
    ],
    pullQuote: "This asymmetric payoff structure is a structural advantage unique to nuclear operators — heads you win big, tails you still win.",
    capture: {
      title: "Multi-layered policy support",
      points: [
        "Federal: IRA Section 45U PTC through 2031+. ADVANCE Act streamlines NRC licensing. Executive orders target 400 GW nuclear by 2050.",
        "State: Illinois ZECs and CMCs support 5 plants ($670M+ in net credits). New York ZECs support 3 plants through 2029.",
        "FERC: December 2025 co-location order enables nuclear-to-data-center arrangements. 'Major victory' for Constellation.",
      ],
    },
  },
  {
    id: "capacity-crisis", num: "04", title: "PJM capacity prices have exploded",
    lead: "The most dramatic near-term financial catalyst. A tenfold surge in capacity prices reflects a structural supply/demand imbalance that is deepening, not resolving.",
    metrics: [
      { value: "$333", label: "PJM capacity price ($/MW-day)" },
      { value: "10x", label: "Increase in 3 auction cycles" },
      { value: "$2.2B", label: "CEG capacity revenue (27/28 BRA)" },
      { value: "-6,623 MW", label: "First-ever reliability shortfall" },
    ],
    paragraphs: [
      "PJM capacity prices escalated from $28.92/MW-day (2024/25) to $269.92/MW-day (2025/26) to the FERC cap of $333.44/MW-day (2027/28). Without the cap, analysts estimate prices would have cleared at $530/MW-day. Total PJM capacity costs surged from $2.2 billion to $16.4 billion annually.",
      "The 2027/28 auction produced PJM's first-ever reliability shortfall — 6,623 MW below the 20% installed reserve margin target — signaling that even at the price cap, the market cannot attract sufficient supply.",
      "The drivers are structural: PJM projects 3.6% annual peak demand growth and 5.3% net energy growth. Over 80 GW of US coal is retiring by 2030. The interconnection queue holds 2,300 GW with a median 5+ year wait and only 13% completion rate.",
    ],
    pullQuote: "Constellation's 55 GW fleet is already interconnected — giving it an insurmountable time-to-power advantage over new entrants.",
    capture: {
      title: "Why capacity prices stay elevated",
      points: [
        "Constellation cleared 17,950 MW in the 2027/28 auction — $2.2B in capacity revenue for that delivery year alone.",
        "No new nuclear before 2030. Coal retirements remove 80+ GW. Queue bottleneck: 5+ years to interconnect new supply.",
        "NERC warns 13 of 23 assessment areas face elevated resource adequacy risks — compound peak demand growth at highest since tracking began.",
      ],
    },
    expandables: [
      { title: "Why the price cap may be lifted", tag: "Upside catalyst",
        content: "Without the FERC-approved cap, the 2027/28 auction would have cleared at $389-530/MW-day. Political pressure from consumers facing 800%+ cost increases creates tension, but reliability requirements may force FERC to raise or remove the cap. Each $100/MW-day increase adds ~$650M to Constellation's annual capacity revenue." },
    ],
  },
  {
    id: "gas-spread", num: "05", title: "Rising gas prices widen nuclear's structural margin",
    lead: "Natural gas prices set the marginal price of electricity in most US markets — creating an unusually favorable dynamic for nuclear operators with near-zero fuel costs.",
    metrics: [
      { value: "$3.52", label: "Henry Hub 2025 ($/MMBtu)" },
      { value: "+56%", label: "Gas price increase YoY" },
      { value: "$5.50", label: "Nuclear fuel cost ($/MWh)" },
      { value: "+46%", label: "Nuclear net revenue in PJM (9mo)" },
    ],
    paragraphs: [
      "Henry Hub averaged just $2.26/MMBtu in 2024 but surged 56% to $3.52/MMBtu in 2025. The EIA projects $3.80 in 2026 and $4.30-4.60 in 2027, driven by LNG export growth (US LNG exports reached a record 5.5 TCF in 2025, +26% YoY).",
      "Nuclear plants operate with near-zero marginal fuel costs — Constellation's nuclear fuel cost runs ~$5.50/MWh, compared to gas plants where fuel alone can exceed $25-30/MWh. When gas-fired generators set the clearing price, nuclear operators capture the entire spread.",
      "PJM West day-ahead prices surged 49% to $50.19/MWh in 2025. Total PJM wholesale power costs climbed 56% to $80.5 billion — and Constellation's fuel costs barely moved.",
    ],
    pullQuote: "Every dollar increase in gas prices flows almost entirely to nuclear operators' bottom lines.",
    capture: {
      title: "The 'quark spread' advantage",
      points: [
        "Wholesale price minus nuclear fuel cost (~$5.50/MWh). At $50/MWh clearing, Constellation captures ~$44.50/MWh in margin per MWh.",
        "This margin flows at 94.7% capacity factor across 22 GW — roughly 182 TWh/year of near-pure spread.",
        "Structural gas outlook bullish: growing LNG exports, rising power sector demand, limited production growth keep Henry Hub elevated.",
      ],
    },
  },
  {
    id: "electrification", num: "06", title: "Electrification and reshoring compound the demand",
    lead: "Beyond data centers, multiple electrification vectors are compounding US electricity demand growth after nearly two decades of stagnation.",
    metrics: [
      { value: "2.1%", label: "US electricity demand growth (2024)" },
      { value: "$452B", label: "Manufacturing investments since 2022" },
      { value: "4.1M", label: "Heat pumps installed in US (2024)" },
      { value: "100 MW", label: "Power per advanced semiconductor fab" },
    ],
    paragraphs: [
      "US electricity demand grew 2.1% in 2024 — the first significant uptick in years. Forecasts project sustained growth of 2.5% CAGR through 2035. ICF projects total US demand growth of 25% by 2030 and 78% by 2050.",
      "Heat pumps outsold gas furnaces by 30% in 2024. Electric vehicles could add 100-185 TWh of annual demand by 2030. The CHIPS Act and IRA have triggered $452 billion in semiconductor and EV manufacturing investments since 2022.",
      "Major projects like Micron's $100B+ megafab, TSMC Arizona, and Intel Ohio are concentrated in Constellation's core markets — PJM, New York, and ERCOT (post-Calpine).",
    ],
    pullQuote: "After 15 years of flat US electricity demand (~3,900 TWh), demand is now growing 2-3% annually — the strongest 4-year growth since 2000. This is a regime change, not a cycle.",
    capture: {
      title: "Positioned in the right markets",
      points: [
        "PJM (Mid-Atlantic/Midwest), NYISO, and ERCOT (post-Calpine) — where the manufacturing renaissance is concentrated.",
        "Combined 55 GW fleet can offer both 24/7 carbon-free nuclear AND dispatchable gas from a single integrated platform.",
        "Corporate sustainability mandates (Microsoft carbon-negative 2030, Google 24/7 CFE) create premium nuclear demand. Tech companies = 49% of global clean energy PPA activity in 2025.",
      ],
    },
  },
];

export const moatAnalysis = [
  { source: "Cost Advantage", present: true, strength: "Strong", evidence: "22 GW nuclear at ~$5.50/MWh vs gas at $25-40/MWh. 55 GW combined fleet unmatched.", durability: "Long-term (20-50yr asset lives)" },
  { source: "Regulatory Barriers", present: true, strength: "Strong", evidence: "NRC licensing = 5-15 year process. No new nuclear licensed in decades. 80-year license extensions.", durability: "Long-term (permanent for nuclear)" },
  { source: "Irreplaceability", present: true, strength: "Exceptional", evidence: "Vogtle 3&4 cost $35B for 2.2 GW. Fleet already interconnected — bypasses 5+ year queue.", durability: "Effectively permanent" },
  { source: "Switching Costs", present: true, strength: "Moderate", evidence: "20-year PPAs with Microsoft & Meta. C&I retail contracts. But spot sales have zero switching cost.", durability: "Medium-term (PPA book growing)" },
  { source: "Brand / Intangible", present: true, strength: "Moderate", evidence: "11 consecutive years as #1 emissions-free energy producer. Brand is a tiebreaker, not a moat.", durability: "Medium-term" },
];

export const competitorTable = [
  { name: "Constellation Energy", capacity: "~55 GW", nuclear: "~22 GW", mktCap: "~$105B", diff: "Largest nuclear fleet + Calpine gas/geo" },
  { name: "Vistra Corp", capacity: "~41 GW", nuclear: "~6.4 GW", mktCap: "~$55B", diff: "2nd nuclear fleet; ERCOT dominant; retail" },
  { name: "NextEra Energy", capacity: "~35 GW", nuclear: "~2.3 GW", mktCap: "~$150B", diff: "Renewables leader; regulated utility mix" },
  { name: "NRG Energy", capacity: "~18 GW", nuclear: "Minimal", mktCap: "~$22B", diff: "Retail-dominant; Vivint smart home" },
  { name: "Talen Energy", capacity: "~10 GW", nuclear: "~2.6 GW", mktCap: "~$10B", diff: "Susquehanna nuclear; AWS deal" },
];

export const riskTiers = [
  { tier: 1, label: "Structural / Thesis-Killing", risks: [
    { risk: "AI demand deceleration or efficiency revolution", prob: "Low-Medium", severity: "High", detail: "If DC power demand grows 50% less than projected, the entire 'power shortage' premium unwinds." },
    { risk: "IRA nuclear PTC repeal or phase-down", prob: "Low", severity: "High", detail: "Would remove the earnings floor. Currently politically unlikely (bipartisan, preserved in OBBBA)." },
    { risk: "Nuclear safety event", prob: "Very Low", severity: "Catastrophic", detail: "A serious incident would trigger fleet-wide shutdowns and political backlash." },
  ]},
  { tier: 2, label: "Cyclical / Manageable", risks: [
    { risk: "Natural gas price collapse (<$2.50)", prob: "Medium", severity: "Medium", detail: "Would compress wholesale prices and nuclear margins. PTC provides partial protection." },
    { risk: "PJM capacity market reform", prob: "Medium", severity: "Medium", detail: "Consumer pressure from 800%+ cost increases could lead to market redesign." },
    { risk: "Interest rate risk", prob: "Medium", severity: "Medium", detail: "Rising rates increase cost of $21B+ debt stack and compress valuations." },
  ]},
  { tier: 3, label: "Company-Specific", risks: [
    { risk: "Calpine integration execution", prob: "Medium", severity: "Low-Medium", detail: "72 sites, 2,500 employees. No prior integration of this scale." },
    { risk: "Crane restart delays", prob: "Medium", severity: "Low", detail: "NRC licensing delays could push restart beyond 2028. Microsoft PPA has delay provisions." },
    { risk: "FERC co-location rules less favorable", prob: "Medium", severity: "Low", detail: "Final PJM implementation could limit behind-the-meter nuclear-to-DC arrangements." },
  ]},
];

export const kpiTree = {
  nuclearMargin: { label: "Nuclear Gross Margin", pctEarnings: "~70%", items: [
    "Output: 22 GW x 94.7% CF x 8,760 hrs = ~182 TWh/yr",
    "Hedged 85-95% near-term at locked prices",
    "PPA pricing: MSFT ~$100+/MWh, Meta ~$70/MWh",
    "Fuel cost: ~$5.50/MWh (stable, multi-year procurement)",
    "PTC floors revenue at ~$43.75/MWh when prices low",
  ]},
  capacityRev: { label: "Capacity Revenue", items: [
    "PJM price: $329-333/MW-day (current; potential $400+ if cap lifts)",
    "Cleared MW: ~18,000 MW in PJM (pre-Calpine)",
    "2027/28 BRA: $2.2B capacity revenue for delivery year",
  ]},
  gasMargin: { label: "Gas/Geothermal (Post-Calpine)", pctEarnings: "~20%", items: [
    "Gas spark spread: electricity price - (gas price x heat rate)",
    "Geothermal (Geysers): 725 MW baseload, REC-eligible",
  ]},
  retailMargin: { label: "Retail Margin", pctEarnings: "~10%", items: [
    "~200+ TWh retail load served",
    "2.5M accounts including 75% of Fortune 100",
  ]},
};

export const monitoringPoints = [
  { metric: "PJM Base Residual Auction results", next: "2028/29 BRA", why: "Single most important near-term data point. If prices remain at cap or FERC raises cap, upgrade cycle continues." },
  { metric: "Contracted PPA book growth", next: "Quarterly disclosure", why: "Each new premium PPA at $70-100/MWh derisks and extends earnings. Track MW, avg price, weighted term." },
  { metric: "US data center electricity consumption", next: "IEA/EIA semi-annual", why: "Macro validation. If actual trends track 300-600 TWh by 2030, structural thesis intact." },
];

/* ─── Nuclear Fleet Detail ─── */
export const nuclearFleetIllinois = [
  { station: "Braidwood", units: 2, capacity: "~2,386 MW", type: "PWR", location: "Will County", license: "2046/2047" },
  { station: "Byron", units: 2, capacity: "~2,347 MW", type: "PWR", location: "Ogle County", license: "2044/2046" },
  { station: "Clinton", units: 1, capacity: "~1,065 MW", type: "BWR", location: "DeWitt County", license: "~2047" },
  { station: "Dresden", units: 2, capacity: "~1,845 MW", type: "BWR", location: "Grundy County", license: "2049/2051" },
  { station: "LaSalle", units: 2, capacity: "~2,320 MW", type: "BWR", location: "LaSalle County", license: "2042/2043" },
  { station: "Quad Cities", units: "2 (75%)", capacity: "~1,403 MW", type: "BWR", location: "Rock Island", license: "2032" },
];
export const nuclearFleetMidAtlantic = [
  { station: "Calvert Cliffs", units: 2, capacity: "~1,756 MW", type: "PWR", location: "Maryland", license: "2034/2036" },
  { station: "Limerick", units: 2, capacity: "~2,317 MW", type: "BWR", location: "Pennsylvania", license: "2044/2049" },
  { station: "Peach Bottom", units: "2 (50%)", capacity: "~1,335 MW", type: "BWR", location: "Pennsylvania", license: "2053/2054" },
  { station: "Salem", units: "2 (42.6%)", capacity: "~1,055 MW", type: "PWR", location: "New Jersey", license: "2036/2040" },
  { station: "Crane (TMI-1)", units: "1 — Restart", capacity: "~835 MW", type: "PWR", location: "Pennsylvania", license: "Target 2027–28", highlight: true },
];
export const nuclearFleetOther = [
  { station: "FitzPatrick", units: 1, capacity: "~838 MW", type: "BWR", location: "New York", license: "2034" },
  { station: "Nine Mile Point", units: "2 (82%)", capacity: "~1,323 MW", type: "BWR", location: "New York", license: "2029/2046" },
  { station: "Ginna", units: 1, capacity: "~582 MW", type: "PWR", location: "New York", license: "2029" },
  { station: "South Texas Project", units: "2 (44%)", capacity: "~1,164 MW", type: "PWR", location: "Texas", license: "2047/2048" },
];

/* ─── Calpine Acquisition ─── */
export const calpineCards = [
  { icon: "⚡", title: "~25,000 MW Natural Gas", color: "orange", text: "Advanced combined-cycle gas turbines (60% efficiency) and peakers. Largest gas fleet in North America. ~9,000+ MW in ERCOT (~12% of Texas installed capacity)." },
  { icon: "▲", title: "725 MW Geothermal — The Geysers", color: "green", text: "World's largest geothermal complex. 13 plants across 45 sq. miles in California. 24/7 clean baseload. ~40% of all US geothermal energy." },
  { icon: "⇄", title: "Strategic Rationale", color: "deepBlue", text: "Gas provides dispatchable complement to nuclear. ERCOT & California diversify from PJM. Combined retail platform becomes US largest. Only company offering full clean & flexible power." },
];

/* ─── Geographic Segments ─── */
export const geoSegments = [
  { name: "Mid-Atlantic", market: "Eastern PJM", color: "capRed", text: "NJ, MD, VA, WV, DE, DC, PA. Key assets: Calvert Cliffs, Limerick, Peach Bottom, Salem, Crane. PJM is the world's largest wholesale electricity market. Northern Virginia = world's largest data center market." },
  { name: "Midwest", market: "Western PJM & MISO", color: "deepBlue", text: "Illinois, Ohio, IN, MI, WI. Largest generation concentration: Braidwood, Byron, Clinton, Dresden, LaSalle, Quad Cities. Clinton hosts the 20-yr Meta PPA (1,121 MW)." },
  { name: "New York", market: "NYISO", color: "purple", text: "FitzPatrick, Nine Mile Point, Ginna. Benefits from NY Zero Emission Credits. NY Climate Act targets 100% zero-emission electricity by 2040 — nuclear is essential." },
  { name: "ERCOT (Texas)", market: "Texas-only grid", color: "capRed", text: "STP nuclear (44% owned). Post-Calpine: 9,000+ MW gas. Energy-only market. Explosive load growth from data centers, LNG export, Permian Basin." },
  { name: "Other Regions", market: "ISO-NE, SE, CAISO, CA", color: "green", text: "Gas, wind, solar, hydro. Post-Calpine: The Geysers geothermal (725 MW) and significant California gas fleet." },
];

/* ─── Revenue Streams ─── */
export const revenueStreams = [
  { title: "Energy Sales", icon: "⚡", color: "capRed", text: "The largest component. Nuclear provides ~67% of ~270 TWh total sales volume. Sold into day-ahead and real-time wholesale markets at Locational Marginal Prices, plus retail contracts." },
  { title: "Capacity Payments", icon: "△", color: "deepBlue", text: "PJM Base Residual Auctions pay generators for availability. Prices surged 10x to $329–333/MW-day. CEG cleared ~17,950 MW in 2027/28 BRA = ~$2.2B annually." },
  { title: "Nuclear PTCs", icon: "■", color: "green", text: "IRA Section 45U: up to $15/MWh. Phases in when prices fall, out when they rise. $2.1B in FY2024, $45M in H1 2025. Asymmetric floor mechanism." },
  { title: "State Credits (ZECs/CMCs)", icon: "★", color: "purple", text: "Illinois Zero Emission Credits and Carbon Mitigation Credits support IL fleet. NY ZECs support upstate plants. Gradually replaced by federal PTCs and PPAs." },
  { title: "RECs & EFECs", icon: "◈", color: "orange", text: "Renewable Energy Certificates from wind/solar/hydro and Emission-Free Energy Certificates from nuclear. Sold to corporate ESG buyers. Growing premium market." },
  { title: "Energy Services", icon: "◆", color: "deepBlue", text: "Energy management, sustainability consulting, demand response, EV charging, battery/microgrid solutions. Deepens relationships and creates recurring fees." },
];

/* ─── Hedging Stats ─── */
export const hedgingStats = [
  { value: "85–95%", label: "Near-term generation hedged at locked-in prices", color: "capRed" },
  { value: "~$43.75", label: "$/MWh effective floor from IRA PTC mechanism", color: "green" },
  { value: "~200 TWh", label: "Retail load providing natural hedge to generation", color: "deepBlue" },
];

/* ─── Quality Assessment ─── */
export const qualityCards = [
  { title: "ROIC vs WACC", text: "Reported ~8% understates replacement value of depreciated nuclear. Marginal returns exceptional: Crane restart ($1.6B) generates ~$300–400M/yr gross margin = 20%+ unlevered return." },
  { title: "Margin Profile", text: "GAAP gross margin ~18% suppressed by purchased power & M2M. Adjusted nuclear gross margin alone: ~80%+. High stability from hedging." },
  { title: "FCF Conversion", text: "GAAP OCF distorted by decommissioning trusts, DPP, and collateral. FCFbG (correct metric): $5.7–6.1B for 2024–25 combined. Maintenance capex + fuel: ~$2.0–2.5B/yr." },
];
export const mgmtQuality = "Capital allocation: Excellent. Since spin-off — 25%+ dividend initiation then 10%/yr growth, $992M buyback in FY2024, STP acquisition at attractive $/MW, Microsoft & Meta PPAs at premium pricing, Calpine acquisition doubling the fleet, $1.6B Crane restart at 20%+ returns. CEO compensation tied to adjusted operating earnings, FCFbG, and TSR.";

/* ─── Variants (Bull/Bear) ─── */
export const variants = [
  { type: "bull", title: "PPA Pricing Is Being Underestimated", text: "Microsoft at ~$100+/MWh. Meta at ~$70/MWh. If demand persists, the next wave could clear $80–120/MWh. Each incremental 1,000 MW PPA at $90/MWh adds ~$300M in annual gross margin. The repricing cycle is just beginning." },
  { type: "bull", title: "PJM Capacity Prices Are Artificially Capped", text: "The 2027/28 BRA hit the FERC cap at $333/MW-day and still fell 6,623 MW short. Without the cap: $389–530/MW-day. If FERC raises or removes the cap, capacity revenue could increase 20–60% from already-record levels." },
  { type: "bull", title: "Crane Restart Could Be Transformational", text: "835 MW at $100+/MWh PPA could deliver $500M+ annual gross margin on $1.6B investment — a 30%+ return on capital. If NRC review accelerates, this hits earnings sooner than consensus." },
  { type: "bear", title: "AI Power Demand Decelerates", text: "If model efficiency improves faster than compute demand grows, the 'power shortage' narrative moderates. PJM load forecasts revised down. This is the single biggest risk to the thesis." },
  { type: "bear", title: "Calpine Integration & Debt Burden", text: "$26.6B deal adds ~$15B in debt. Total now ~$21B+ against $105B market cap. Integration of 72 assets and 2,500 employees is complex. Forced PJM divestiture to LS Power (~$5B) reduces strategic optionality." },
];

export const chartData = {
  capacityPrices: {
    labels: ["2024/25", "2025/26", "2026/27", "2027/28", "Est. w/o cap"],
    values: [28.92, 269.92, 329.17, 333.44, 530],
    projected: [false, false, false, false, true],
  },
  gasPrices: {
    labels: ["2023", "2024", "2025", "2026E", "2027E"],
    values: [2.54, 2.26, 3.52, 3.80, 4.45],
    projected: [false, false, false, true, true],
  },
  dcDemand: {
    labels: ["2023", "2024", "2025E", "2026E", "2028E", "2030E"],
    values: [176, 210, 260, 310, 380, 430],
    projected: [false, false, true, true, true, true],
  },
  nuclearVsOther: [
    { label: "Nuclear (CEG fleet)", value: 94.7 },
    { label: "Gas CCGT", value: 57 },
    { label: "Wind (onshore)", value: 35 },
    { label: "Solar (utility)", value: 23 },
  ],
  revenueBreakdown: [
    { stream: "Nuclear Generation", pct: 70, color: "green" },
    { stream: "Gas/Geothermal (Calpine)", pct: 20, color: "orange" },
    { stream: "Retail & Other", pct: 10, color: "deepBlue" },
  ],
};
