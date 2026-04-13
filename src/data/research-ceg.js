// CEG (Constellation Energy) — Research Data
// Structural Forces tab preserved; other tabs to be built

export const heroStats = [
  { value: "55 GW", label: "Combined fleet capacity (post-Calpine)", color: "deepBlue" },
  { value: "22 GW", label: "Nuclear capacity — largest US fleet", color: "green" },
  { value: "94.7%", label: "Nuclear capacity factor (3-year rolling)", color: "green" },
  { value: "21", label: "Operating nuclear reactors across 15 sites", color: "purple" },
  { value: "~200 TWh", label: "Annual retail electricity load served", color: "orange" },
  { value: "#1", label: "Largest competitive power producer in the US", color: "capRed" },
];

/* ═══════════════════════════════════════════
   STRUCTURAL FORCES — Overview Cards
   ═══════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════
   STRUCTURAL FORCES — Deep Dive Sections
   ═══════════════════════════════════════════ */
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
      "US data centers consumed approximately 176 TWh in 2023 \u2014 roughly 4.4% of total US electricity. By 2030, credible mid-range estimates from the IEA, Goldman Sachs, and Lawrence Berkeley National Lab converge on 300-600 TWh, representing 6-12% of all US electricity.",
      "A single ChatGPT query consumes roughly 10x more electricity than a traditional Google search. Generative AI workloads consume 10-30x more energy than task-specific AI, and 80-90% of AI computing power now goes to inference \u2014 the ongoing, always-on demand that requires constant baseload power.",
      "Epoch AI and EPRI project that individual frontier AI training runs may draw 4-16 GW of power by 2030, with total US AI data center capacity potentially exceeding 50 GW.",
    ],
    pullQuote: "Data centers account for an estimated 97% of incremental load growth in the latest PJM forecast.",
    capture: {
      title: "Constellation's landmark deals",
      points: [
        "Microsoft: 20-year PPA for Crane Clean Energy Center (TMI-1 restart). 835 MW, $1.6B investment, $1B DOE loan. Target online 2027. Lifts EPS CAGR from 10% to 13%.",
        "Meta: 20-year virtual PPA for 1,121 MW from Clinton nuclear plant. ~$70/MWh \u2014 a $20/MWh premium over market. Replaces expiring state subsidies.",
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
      "In May 2025, President Trump signed four executive orders targeting 400 GW of US nuclear capacity by 2050 \u2014 quadrupling today's installed base.",
    ],
    pullQuote: "Constellation's 21 reactors at 15 sites represent approximately 23-24% of all US nuclear generation \u2014 more than double the next largest fleet operator.",
    capture: {
      title: "Constellation's nuclear moat",
      points: [
        "94.7% capacity factor \u2014 highest 3-year rolling average among all 9 US nuclear fleet operators for the 5th consecutive year. Compare to wind at 34-35% and solar at 23%.",
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
      "The IRA's Section 45U nuclear PTC provides up to $15/MWh on a sliding scale that phases out as gross receipts rise above approximately $25-26/MWh. The practical effect is an earnings floor of roughly $43.75/MWh \u2014 providing downside protection when wholesale prices are low while preserving full upside when prices are high.",
      "In 2024, when wholesale prices were relatively low, the PTC contributed approximately $2.1 billion to operating revenue. In 2025, as PJM prices surged, PTC revenue declined (H1 2025: $45M vs $712M in H1 2024) \u2014 but total revenue increased because higher market prices more than offset the lower credit.",
      "The 2025 'One Big Beautiful Bill' preserved nuclear PTCs while accelerating the phase-out of wind and solar credits \u2014 nuclear received more favorable treatment than any other clean energy technology.",
    ],
    pullQuote: "This asymmetric payoff structure is a structural advantage unique to nuclear operators \u2014 heads you win big, tails you still win.",
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
      "The 2027/28 auction produced PJM's first-ever reliability shortfall \u2014 6,623 MW below the 20% installed reserve margin target \u2014 signaling that even at the price cap, the market cannot attract sufficient supply.",
      "The drivers are structural: PJM projects 3.6% annual peak demand growth and 5.3% net energy growth. Over 80 GW of US coal is retiring by 2030. The interconnection queue holds 2,300 GW with a median 5+ year wait and only 13% completion rate.",
    ],
    pullQuote: "Constellation's 55 GW fleet is already interconnected \u2014 giving it an insurmountable time-to-power advantage over new entrants.",
    capture: {
      title: "Why capacity prices stay elevated",
      points: [
        "Constellation cleared 17,950 MW in the 2027/28 auction \u2014 $2.2B in capacity revenue for that delivery year alone.",
        "No new nuclear before 2030. Coal retirements remove 80+ GW. Queue bottleneck: 5+ years to interconnect new supply.",
        "NERC warns 13 of 23 assessment areas face elevated resource adequacy risks \u2014 compound peak demand growth at highest since tracking began.",
      ],
    },
    expandables: [
      { title: "Why the price cap may be lifted", tag: "Upside catalyst",
        content: "Without the FERC-approved cap, the 2027/28 auction would have cleared at $389-530/MW-day. Political pressure from consumers facing 800%+ cost increases creates tension, but reliability requirements may force FERC to raise or remove the cap. Each $100/MW-day increase adds ~$650M to Constellation's annual capacity revenue." },
    ],
  },
  {
    id: "gas-spread", num: "05", title: "Rising gas prices widen nuclear's structural margin",
    lead: "Natural gas prices set the marginal price of electricity in most US markets \u2014 creating an unusually favorable dynamic for nuclear operators with near-zero fuel costs.",
    metrics: [
      { value: "$3.52", label: "Henry Hub 2025 ($/MMBtu)" },
      { value: "+56%", label: "Gas price increase YoY" },
      { value: "$5.50", label: "Nuclear fuel cost ($/MWh)" },
      { value: "+46%", label: "Nuclear net revenue in PJM (9mo)" },
    ],
    paragraphs: [
      "Henry Hub averaged just $2.26/MMBtu in 2024 but surged 56% to $3.52/MMBtu in 2025. The EIA projects $3.80 in 2026 and $4.30-4.60 in 2027, driven by LNG export growth (US LNG exports reached a record 5.5 TCF in 2025, +26% YoY).",
      "Nuclear plants operate with near-zero marginal fuel costs \u2014 Constellation's nuclear fuel cost runs ~$5.50/MWh, compared to gas plants where fuel alone can exceed $25-30/MWh. When gas-fired generators set the clearing price, nuclear operators capture the entire spread.",
      "PJM West day-ahead prices surged 49% to $50.19/MWh in 2025. Total PJM wholesale power costs climbed 56% to $80.5 billion \u2014 and Constellation's fuel costs barely moved.",
    ],
    pullQuote: "Every dollar increase in gas prices flows almost entirely to nuclear operators' bottom lines.",
    capture: {
      title: "The 'quark spread' advantage",
      points: [
        "Wholesale price minus nuclear fuel cost (~$5.50/MWh). At $50/MWh clearing, Constellation captures ~$44.50/MWh in margin per MWh.",
        "This margin flows at 94.7% capacity factor across 22 GW \u2014 roughly 182 TWh/year of near-pure spread.",
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
      "US electricity demand grew 2.1% in 2024 \u2014 the first significant uptick in years. Forecasts project sustained growth of 2.5% CAGR through 2035. ICF projects total US demand growth of 25% by 2030 and 78% by 2050.",
      "Heat pumps outsold gas furnaces by 30% in 2024. Electric vehicles could add 100-185 TWh of annual demand by 2030. The CHIPS Act and IRA have triggered $452 billion in semiconductor and EV manufacturing investments since 2022.",
      "Major projects like Micron's $100B+ megafab, TSMC Arizona, and Intel Ohio are concentrated in Constellation's core markets \u2014 PJM, New York, and ERCOT (post-Calpine).",
    ],
    pullQuote: "After 15 years of flat US electricity demand (~3,900 TWh), demand is now growing 2-3% annually \u2014 the strongest 4-year growth since 2000. This is a regime change, not a cycle.",
    capture: {
      title: "Positioned in the right markets",
      points: [
        "PJM (Mid-Atlantic/Midwest), NYISO, and ERCOT (post-Calpine) \u2014 where the manufacturing renaissance is concentrated.",
        "Combined 55 GW fleet can offer both 24/7 carbon-free nuclear AND dispatchable gas from a single integrated platform.",
        "Corporate sustainability mandates (Microsoft carbon-negative 2030, Google 24/7 CFE) create premium nuclear demand. Tech companies = 49% of global clean energy PPA activity in 2025.",
      ],
    },
  },
];

/* ═══════════════════════════════════════════
   CHARTS — Used in Structural Forces tab
   ═══════════════════════════════════════════ */
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
};

/* ═══════════════════════════════════════════════════════════════
   PRIMER TAB — Business education, no financials
   ═══════════════════════════════════════════════════════════════ */

export const primerDescription = [
  "Constellation Energy is the largest nuclear power operator in the United States and, following its January 2026 acquisition of Calpine, the largest private-sector power producer in the world. The company owns and operates 25 nuclear reactor units at 14 sites across the eastern United States, producing roughly 23% of all American nuclear generation. Its combined fleet now totals approximately 55 gigawatts of capacity spanning nuclear, natural gas, geothermal, wind, solar, and hydroelectric generation across more than 40 states.",
  "The company was created on February 1, 2022, through a tax-free separation from Exelon Corporation. Exelon kept its regulated utility businesses (ComEd, PECO, BGE), while Constellation inherited the competitive generation and retail operations. Headquartered at 1310 Point Street in Baltimore, Maryland, Constellation immediately joined the S&P 500 upon separation and today ranks as a Fortune 200 company with approximately 16,764 employees.",
  "What makes Constellation unusual is the combination of two things rarely found together: irreplaceable physical assets with near-zero marginal operating costs, and accelerating structural demand from the artificial intelligence revolution. Nuclear plants cost billions to build but almost nothing to run once operational. Data centres need exactly what nuclear provides: round-the-clock, carbon-free electricity at massive scale. Constellation sits at the intersection of these forces with more supply to offer than any competitor.",
  "CEO Joseph Dominguez leads the company alongside CFO Daniel Eggers. The stock trades on Nasdaq under the ticker CEG.",
];

export const milestones = [
  { date: "Feb 2022", title: "Spin-off from Exelon", color: "deepBlue",
    text: "Constellation created as an independent company through tax-free separation. Inherited Exelon's competitive generation and retail businesses. Immediately joined the S&P 500." },
  { date: "Sep 2024", title: "Microsoft / Crane PPA", color: "green",
    text: "Announced a 20-year power purchase agreement with Microsoft to restart Three Mile Island Unit 1, rebranded the Crane Clean Energy Center. 835 MW of carbon-free baseload requiring a $1.6 billion investment." },
  { date: "Jan 2025", title: "Calpine acquisition announced", color: "orange",
    text: "Agreed to acquire Calpine for $16.4 billion in equity (50 million CEG shares plus $4.5 billion cash), assuming $12.7 billion in net debt. The deal valued Calpine at 7.9x 2026 EV/EBITDA." },
  { date: "Dec 2025", title: "DOJ clearance with divestitures", color: "purple",
    text: "Department of Justice approved the Calpine merger after Constellation agreed to divest approximately 4.4 GW of PJM gas assets to LS Power for $5 billion." },
  { date: "Jan 2026", title: "Calpine deal closes", color: "capRed",
    text: "Acquisition completed on January 7, 2026. Combined entity operates approximately 55 GW across 40+ states, serves 2.5 million customers, and provides roughly 10% of America's clean energy." },
];

export const segmentData = [
  { name: "Mid-Atlantic", revenue: "$5.5B", pct: 28.4, color: "#C41E3A", iso: "PJM",
    key: "Calvert Cliffs, Limerick, Peach Bottom (50%), Salem (42.6%), Conowingo Dam, Muddy Run pumped storage",
    desc: "The eastern seaboard nuclear heartland plus critical hydroelectric assets. Houses 10,387 MW of capacity serving PJM wholesale participants, commercial and industrial buyers, and government entities." },
  { name: "Midwest", revenue: "$4.8B", pct: 24.8, color: "#1D4ED8", iso: "PJM / MISO",
    key: "Braidwood, Byron, Dresden, LaSalle, Quad Cities (75%), Clinton (MISO)",
    desc: "The Illinois nuclear cluster generating the most nuclear megawatt-hours of any segment. Six stations with 11,608 MW. Benefits from Illinois CEJA subsidies and the 20-year Meta PPA at Clinton." },
  { name: "New York", revenue: "$2.1B", pct: 10.6, color: "#7C3AED", iso: "NYISO",
    key: "Nine Mile Point (Units 1 & 2), FitzPatrick, Ginna",
    desc: "Three stations with approximately 3,191 MW operating within NYISO. Supported by New York Zero Emission Credits. New York's Climate Act targets 100% zero-emission electricity by 2040." },
  { name: "ERCOT", revenue: "$1.6B", pct: 8.0, color: "#EA580C", iso: "ERCOT",
    key: "South Texas Project (44%), plus ~3,600 MW pre-Calpine gas capacity",
    desc: "Constellation's Texas footprint. STP provides nuclear baseload, while post-Calpine the segment gains an additional 9,000+ MW of gas generation. Energy-only market with explosive data centre load growth." },
  { name: "Other Power Regions", revenue: "$5.5B", pct: 28.4, color: "#059669", iso: "ISO-NE, SERC, WECC",
    key: "Gas, wind, solar, hydro assets plus Everett LNG Marine Terminal and Canadian operations",
    desc: "A geographically diverse collection of assets spanning New England, the Southeast, the West, and Canada. Post-Calpine, this includes The Geysers geothermal complex (725 MW) and significant California gas capacity." },
];

export const genMixPreCalpine = [
  { name: "Nuclear", share: 87, color: "#16A34A" },
  { name: "Natural gas / oil", share: 10, color: "#EA580C" },
  { name: "Renewables / hydro", share: 3, color: "#1D4ED8" },
];

export const genMixPostCalpine = [
  { name: "Nuclear", share: 40, color: "#16A34A" },
  { name: "Natural gas", share: 53, color: "#EA580C" },
  { name: "Geothermal", share: 1.3, color: "#7C3AED" },
  { name: "Renewables / hydro", share: 5.7, color: "#1D4ED8" },
];

export const geoExposure = [
  { name: "PJM", share: 50, color: "#C41E3A" },
  { name: "ERCOT", share: 23, color: "#EA580C" },
  { name: "NYISO", share: 9, color: "#7C3AED" },
  { name: "CAISO", share: 8, color: "#059669" },
  { name: "Other", share: 10, color: "#64748B" },
];

export const revenueStreams = [
  { title: "Wholesale & retail electricity", icon: "\u26A1", color: "capRed",
    desc: "The core business. Approximately 202 TWh of total load served in FY2024: 144 TWh retail and 58 TWh wholesale. The retail platform serves 2.5 million customers including three-fourths of the Fortune 100, with average contract terms of two years and customer duration of five years. Retail renewal rates run 78% for power and 88% for gas.",
    detail: "Functions as a critical natural hedge, matching generation output with customer load obligations and reducing merchant price exposure." },
  { title: "Nuclear production tax credits", icon: "\u2588", color: "green",
    desc: "The Inflation Reduction Act's Section 45U PTC pays $15/MWh for nuclear generation, effective January 2024 through December 2032. The credit phases out as gross receipts rise above $25-26/MWh and fully disappears above $43.75-44.75/MWh, creating an asymmetric earnings floor.",
    detail: "In FY2024, Constellation recognised approximately $2.1 billion in PTC benefit. The 2025 'One Big Beautiful Bill' preserved nuclear PTCs while repealing wind and solar credits." },
  { title: "Capacity market payments", icon: "\u25B3", color: "deepBlue",
    desc: "PJM Base Residual Auction clearing prices surged from $28.92/MW-day (2024/2025) to $333.44/MW-day (2027/2028), a roughly 10x increase over three auction cycles. With 22 GW of nuclear in PJM, this translates to an estimated $2.6 billion or more in annual capacity revenue from nuclear alone.",
    detail: "Capacity auctions clear three years forward, providing unusual revenue visibility. Data centre demand added roughly 5,250 MW to PJM's peak load forecast for the latest auction." },
  { title: "Long-term hyperscaler PPAs", icon: "\u25C8", color: "purple",
    desc: "Transforming the revenue profile from merchant to contracted. The Microsoft/Crane PPA (835 MW, 20 years) underpins the TMI restart. The Meta/Clinton PPA (1,121 MW, 20 years, starting June 2027) replaces expiring Illinois ZEC subsidies. CyrusOne adds 380 MW with expansion options.",
    detail: "Only approximately 25% of expected clean firm output is currently under long-term contract, suggesting substantial runway for additional premium-priced deals." },
];

export const nuclearFleet = [
  { station: "Braidwood", state: "IL", units: 2, mw: "2,386", type: "PWR", license: "2046-2047", iso: "PJM" },
  { station: "Byron", state: "IL", units: 2, mw: "2,347", type: "PWR", license: "2044-2046", iso: "PJM" },
  { station: "LaSalle", state: "IL", units: 2, mw: "2,384", type: "BWR", license: "2042-2043", iso: "PJM" },
  { station: "Dresden", state: "IL", units: 2, mw: "1,845", type: "BWR", license: "2049-2051", iso: "PJM", note: "80-yr SLR" },
  { station: "Quad Cities", state: "IL", units: 2, mw: "~1,410", type: "BWR", license: "2032", iso: "PJM", ownership: "75%" },
  { station: "Clinton", state: "IL", units: 1, mw: "1,092", type: "BWR", license: "2047", iso: "MISO", note: "Meta PPA" },
  { station: "Limerick", state: "PA", units: 2, mw: "2,317", type: "BWR", license: "2044-2049", iso: "PJM" },
  { station: "Peach Bottom", state: "PA", units: 2, mw: "~1,385", type: "BWR", license: "2033-2034", iso: "PJM", ownership: "50%" },
  { station: "Calvert Cliffs", state: "MD", units: 2, mw: "1,790", type: "PWR", license: "2034-2036", iso: "PJM" },
  { station: "Nine Mile Point", state: "NY", units: 2, mw: "~1,773", type: "BWR/PWR", license: "2029-2046", iso: "NYISO", ownership: "82-100%" },
  { station: "FitzPatrick", state: "NY", units: 1, mw: "842", type: "BWR", license: "2034", iso: "NYISO" },
  { station: "Ginna", state: "NY", units: 1, mw: "576", type: "PWR", license: "2029", iso: "NYISO" },
  { station: "Salem", state: "NJ", units: 2, mw: "~973", type: "PWR", license: "2036-2040", iso: "PJM", ownership: "42.6%" },
  { station: "South Texas Project", state: "TX", units: 2, mw: "~1,100", type: "PWR", license: "2047-2048", iso: "ERCOT", ownership: "44%" },
];

/* ═══════════════════════════════════════════════════════════════
   VALUATION TAB — Nuclear premium analysis
   ═══════════════════════════════════════════════════════════════ */

export const valSummary = "Constellation Energy trades at a 50\u201370% forward P/E premium to IPP peers, and the premium is largely justified \u2014 but faces growing execution risk. CEG commands ~24\u201328x forward earnings versus a peer median of ~16x because it owns the only large-scale, non-replicable fleet of carbon-free baseload generation in the U.S. \u2014 22 GW of nuclear capacity that hyperscalers desperately need but cannot build. The stock has corrected ~34% from its October 2025 peak of $413, as TMI restart delays to 2031, a below-consensus 2026 guidance, and questions about Calpine diluting the nuclear narrative have shifted sentiment from 'price the potential' to 'show me the execution.'";

export const valSnapshot = {
  price: "~$280",
  fwdPE: "~25x",
  evEbitda: "~19\u201322x",
  peerPE: "~16x",
  premium: "50\u201370%",
  peakPrice: "$413",
  drawdown: "-34%",
  consensus: "$383\u2013400",
};

export const valPhases = [
  { phase: "1", period: "2022\u2013early 2024", label: "IRA + Power Price Recovery",
    priceRange: "$50 \u2192 $140", evEbitda: "8\u201310x", fwdPE: "~12\u201315x",
    color: "deepBlue",
    desc: "Post-spin, traded as a conventional merchant generator. The Inflation Reduction Act nuclear PTCs established an earnings floor. Power prices recovered post-COVID. Already commanding a 35% premium to IPP peers." },
  { phase: "2", period: "Mar\u2013Sep 2024", label: "Nuclear-as-AI-Infrastructure",
    priceRange: "$140 \u2192 $255", evEbitda: "10x \u2192 15x+", fwdPE: "~15\u201322x",
    color: "green",
    desc: "Amazon-Talen deal in March catalysed sector-wide re-rating. CEG announced 20-year Microsoft PPA on 20 September \u2014 stock surged 22% in a single session, adding ~$25B in market cap." },
  { phase: "3", period: "Late 2024\u2013Oct 2025", label: "Peak Euphoria",
    priceRange: "$255 \u2192 $413", evEbitda: "17.5\u201320x", fwdPE: "~30\u201335x",
    color: "orange",
    desc: "Calpine acquisition drove stock up 15\u201325%. Meta deal, $1B+ GSA federal contract, and institutional flows pushed to all-time high. Forward P/E exceeded 35x." },
  { phase: "4", period: "Late 2025\u2013present", label: "Correction & Execution Scrutiny",
    priceRange: "$413 \u2192 ~$280", evEbitda: "~19\u201322x", fwdPE: "~24\u201328x",
    color: "capRed",
    desc: "Three catalysts drove a 34% drawdown: TMI restart delayed to 2031, 2026 EPS guidance ($11\u201312) missed consensus ($12.11), and no new hyperscaler deals at March 2026 investor day." },
];

export const valSOTP = [
  { category: "Existing assets", value: 255, color: "#1D4ED8", pct: 66 },
  { category: "Data center contracting", value: 70, color: "#16A34A", pct: 18 },
  { category: "Higher power prices", value: 40, color: "#EA580C", pct: 10 },
  { category: "Clean energy credits", value: 22, color: "#7C3AED", pct: 6 },
];

export const valBullBear = {
  bull: [
    { point: "Uncontracted optionality", detail: "147 million MWh of uncontracted nuclear capacity available for 2030 exceeds all other competitive-market nuclear operators combined. Each incremental hyperscaler PPA at $60+/MWh is directly accretive." },
    { point: "Earnings growth trajectory", detail: "Management targets >20% base EPS CAGR 2026\u20132029 before buyback benefits. UBS estimates $19\u201320 EPS by 2029 with full FCF deployment." },
    { point: "PTC earnings floor", detail: "The IRA Section 45U nuclear PTC creates a $40\u201344.75/MWh price floor through 2032, protecting downside even in a power price crash." },
    { point: "$5B buyback authorization", detail: "Provides valuation support and signals management confidence. $13.6B in total deployable capital through 2029." },
    { point: "Only 24/7 carbon-free at scale", detail: "Nuclear's position as the only technology delivering round-the-clock carbon-free power becomes more valuable, not less, as AI electricity demand compounds." },
  ],
  bear: [
    { point: "TMI restart delayed to 2031", detail: "PJM informed CEG that the Crane Clean Energy Center may not connect until 2031 \u2014 four years late. Defers a marquee revenue stream and raises questions about restart viability." },
    { point: "Calpine dilutes nuclear narrative", detail: "Nuclear's share of total capacity drops from ~68% to ~40%. Pro forma leverage triples from ~1.0x to ~2.5\u20133.0x Net Debt/EBITDA. 50M locked-up shares release June 2026." },
    { point: "Below-consensus guidance", detail: "2026 EPS guidance of $11.00\u2013$12.00 missed the $12.11 consensus. 2029 implied range ($16.29\u2013$18.31) also below buyside expectations." },
    { point: "Regulatory uncertainty", detail: "PJM/FERC large-load interconnection rules remain unresolved. Filing expected April 2026 with a ruling ~60 days later." },
    { point: "AI demand deceleration risk", detail: "At ~25x forward earnings, the stock prices in substantial AI demand growth. Any hyperscaler capex pullback could trigger further multiple compression." },
  ],
};

export const valConsensus = [
  { broker: "Wells Fargo", rating: "Buy", target: 404 },
  { broker: "TD Cowen", rating: "Buy", target: 440 },
  { broker: "Melius Research", rating: "Buy", target: 462 },
  { broker: "Morgan Stanley", rating: "Buy", target: 385 },
  { broker: "UBS", rating: "Buy", target: 390 },
  { broker: "Citi", rating: "Hold", target: 348 },
  { broker: "Mizuho", rating: "Hold", target: 300 },
];

export const valLeverage = [
  { name: "CEG (pre-Calpine)", leverage: 1.0, rating: "Baa1/BBB+", color: "#16A34A" },
  { name: "CEG (post-Calpine)", leverage: 2.75, rating: "Baa1/BBB+ affirmed", color: "#EA580C" },
  { name: "CEG (target 2027)", leverage: 1.5, rating: "Target return", color: "#1D4ED8" },
  { name: "Vistra", leverage: 3.9, rating: "BBB-", color: "#64748B" },
  { name: "NRG", leverage: 4.0, rating: "BB+", color: "#64748B" },
  { name: "Talen", leverage: 7.0, rating: "BB-", color: "#64748B" },
];

export const valFramework = [
  { framework: "Traditional IPP", evEbitda: "6\u201310x", fwdPE: "8\u201314x", characteristics: "Volatile, commodity-linked earnings with 1\u20133 year hedge visibility", color: "#64748B" },
  { framework: "Regulated utility", evEbitda: "12\u201315x", fwdPE: "15\u201320x", characteristics: "Rate-based, inflation-linked returns with full regulatory visibility", color: "#1D4ED8" },
  { framework: "Nuclear infrastructure", evEbitda: "15\u201320x", fwdPE: "20\u201328x", characteristics: "Long-duration contracted cash flows with creditworthy counterparties + growth optionality", color: "#16A34A" },
  { framework: "CEG today", evEbitda: "19\u201322x", fwdPE: "24\u201328x", characteristics: "Upper end of nuclear infra range. 75% of clean output uncontracted \u2014 each new PPA pulls appropriate multiple higher", color: "#C41E3A" },
];

export const valGating = [
  { factor: "Hyperscaler contract pace", timeframe: "Ongoing", impact: "High", direction: "positive",
    detail: "The single most important near-term catalyst. Each deal converts merchant optionality into contracted duration, validating the premium." },
  { factor: "FERC/PJM large-load rules", timeframe: "Apr\u2013Jun 2026", impact: "High", direction: "mixed",
    detail: "Filing expected April 2026, ruling ~60 days later. Favorable outcome unlocks direct nuclear-to-DC contracting at scale." },
  { factor: "Calpine integration", timeframe: "Through 2027", impact: "Medium", direction: "mixed",
    detail: "2,500 employees, 79 facilities. $3.4B debt reduction target. >95% of Calpine corporate debt already retired or exchanged." },
  { factor: "TMI restart progress", timeframe: "Target 2031", impact: "Medium", direction: "negative",
    detail: "835 MW delayed from 2027 to 2031 due to transmission delays. $1.6B investment backed by $1B DOE loan guarantee." },
  { factor: "Share lock-up expiry", timeframe: "Jun 2026", impact: "Medium", direction: "negative",
    detail: "50 million Calpine seller shares begin releasing. Potential technical selling pressure." },
];

export const calpineHighlights = [
  { icon: "\u26A1", title: "~27 GW natural gas", color: "orange",
    text: "79 facilities of predominantly advanced combined-cycle gas turbines across North America. Post-divestiture of 4.4 GW PJM assets to LS Power, the gas fleet adds critical dispatchable capacity to complement nuclear baseload." },
  { icon: "\u25B2", title: "725 MW geothermal", color: "green",
    text: "The Geysers, the world's largest geothermal complex. 13 plants across 45 square miles in Northern California producing 24/7 clean baseload. Approximately 40% of all US geothermal energy." },
  { icon: "\u21C4", title: "2.5M retail customers", color: "deepBlue",
    text: "Combined retail platform becomes one of the largest in the US. Serves three-fourths of the Fortune 100. Average customer duration of five years with strong renewal rates." },
];
