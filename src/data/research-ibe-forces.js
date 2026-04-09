// IBE (Iberdrola) — Structural Forces Data
// Tailwinds analysis — macro and company-specific

export const forcesHeroStats = [
  { value: "+60%", label: "EU electricity demand growth forecast by 2030", color: "green" },
  { value: "€1.2T", label: "European grid investment needed by 2040", color: "deepBlue" },
  { value: "3×", label: "EU data centre capacity target within 5–7 years", color: "orange" },
  { value: "11 TWh", label: "Iberdrola clean power already contracted to hyperscalers", color: "purple" },
  { value: "35 TWh", label: "Total committed power purchase agreements", color: "capRed" },
  { value: "75%", label: "Target EBITDA from regulated or contracted sources by 2028", color: "deepBlue" },
];

/* ═══════════════════════════════════════════
   FORCE 1 — ELECTRIFICATION SUPERCYCLE
   ═══════════════════════════════════════════ */
export const electrificationIntro = "Europe is systematically replacing molecules — gas, oil, petrol — with electrons across three enormous sectors simultaneously. The EU's electrification share of final energy stands at just 23% today but must reach 35% by 2030 and 61% by 2050 to meet binding climate targets. This is not a forecast — it is mandated by law. Every incremental kilowatt-hour of electricity demand flows through Iberdrola's distribution networks in its four core markets, growing the regulated asset base and the allowed earnings derived from it.";

export const electrificationDrivers = [
  {
    title: "Transport electrification",
    subtitle: "EU mandates 100% zero-emission new cars by 2035",
    detail: "The EU's CO₂ regulation mandates a 55% reduction in new car emissions by 2030 and 100% by 2035 — effectively requiring all new cars sold in Europe to be electric within a decade. Battery electric vehicles already hold roughly 19% market share of new EU car sales as of early 2026. Each EV adds approximately 2,500 to 4,000 kWh of annual electricity demand. With roughly 13 million new cars registered annually in the EU, full electrification would eventually add 30 to 50 TWh per year — equivalent to Portugal's entire electricity consumption. Iberdrola operates approximately 72,000 EV charging points and has a joint venture with BP targeting 11,000 fast and ultra-fast chargers across Spain and Portugal by 2030.",
    impact: "high",
    timeline: "2025–2035",
  },
  {
    title: "Heat pump rollout",
    subtitle: "Fossil fuel boilers phased out by 2040 across the EU",
    detail: "The revised Energy Performance of Buildings Directive phases out fossil fuel boilers by 2040. REPowerEU targets 30 million additional heat pumps installed by 2030 from a base of roughly 20 million. Each heat pump adds approximately 3,000 to 5,000 kWh of annual electricity demand. The IEA estimates heat pump deployment will reduce Europe's gas demand for heating by at least 21 billion cubic metres by 2030. Over 50% of all EU energy consumption goes to heating and cooling, and over 70% of that still comes from fossil fuels — meaning the electrification runway is enormous. Replacing 30 million gas and oil boilers with heat pumps would reduce total final energy consumption by 348 TWh — with Germany alone saving 125 TWh.",
    impact: "high",
    timeline: "2025–2040",
  },
  {
    title: "Industrial electrification",
    subtitle: "ETS and CBAM making electricity cheaper than gas for industry",
    detail: "The EU Emissions Trading System and Carbon Border Adjustment Mechanism are making electricity-based industrial processes progressively cheaper relative to gas-based alternatives. Low-temperature industrial heat below 200°C is increasingly switching to industrial heat pumps. This affects sectors from food processing and chemicals to paper and textiles. Denmark estimates 25% of its 2030 CO₂ reduction target will be achieved through electrification and heat pumps alone. The EU's revised Renewable Energy Directive mandates gradual increases in renewable energy for industrial heating and cooling, with annual increases of 1.1 percentage points from 2026 to 2030.",
    impact: "medium",
    timeline: "2025–2040",
  },
  {
    title: "The Grids Package accelerant",
    subtitle: "EU rewriting grid rules to keep pace with demand",
    detail: "The EU's Grids Package (December 2025) explicitly recognises that electricity demand is surging from EVs, heat pumps, data centres, and industry — and that grids must be dramatically expanded to keep pace. Europe needs grids that can reliably move far more power while managing millions of new connection requests. The Package rewrites rules for planning, permitting, investment, and cross-border coordination. For distribution network operators like Iberdrola, this means accelerated permitting for grid expansion, clearer investment frameworks, and regulatory support for anticipatory investment — building grid capacity ahead of demand rather than waiting for bottlenecks to form.",
    impact: "high",
    timeline: "2026–2035",
  },
];

/* ═══════════════════════════════════════════
   FORCE 2 — DATA CENTRES AND AI
   ═══════════════════════════════════════════ */
export const dataCentreIntro = "The explosion of artificial intelligence is creating the most concentrated new source of electricity demand since post-war industrialisation. European data centre power consumption is projected to nearly triple within a decade, from approximately 70 TWh in 2024 to 168 to 238 TWh by 2030–2035. The EU has set an explicit target to at least triple its data centre capacity within five to seven years. The critical bottleneck is not data centre construction but grid connections — whoever can offer hyperscalers reliable grid access and clean power fastest captures this demand. Iberdrola is positioning at every level of the value chain.";

export const dataCentreStats = [
  { label: "European DC demand 2024", value: "~70 TWh", color: "textSec" },
  { label: "European DC demand 2030E", value: "~168 TWh", color: "orange" },
  { label: "European DC demand 2035E", value: "~238 TWh", color: "capRed" },
  { label: "Growth 2024–2035", value: "+240%", color: "green" },
  { label: "Share of EU power demand by 2030", value: "~5%", color: "deepBlue" },
  { label: "DC demand growth vs EV growth to 2030", value: "72 vs 67 TWh", color: "purple" },
];

export const dataCentrePositioning = [
  {
    title: "Hyperscaler power purchase agreements",
    subtitle: "11+ TWh/year already contracted; 35 TWh total committed PPAs",
    detail: "Iberdrola already supplies over 11 TWh per year to technology companies and data centre operators globally. Total committed PPAs across all sectors reach 35 TWh, with 3 TWh signed in the last 12 months alone. Key counterparties include Amazon, Microsoft, Meta, and Apple. The December 2025 PPA with Microsoft covers 150 MW of wind energy from two wind farms in northern Spain — the first Iberdrola-Microsoft PPA in Europe — and includes deployment of Azure cloud and AI tools across Iberdrola's global operations. Expanded agreements with Amazon cover wind and solar capacity in Europe, the US, and Asia-Pacific. Approximately 100% of Iberdrola's 2026 power production is already contracted or hedged.",
  },
  {
    title: "Echelon Iberdrola Digital Infra — the €2 billion data centre JV",
    subtitle: "Europe's largest energy-company–data-centre-developer joint venture",
    detail: "In 2025, Iberdrola created Echelon Iberdrola Digital Infra with Echelon Data Centres — the largest European joint venture between an energy company and a data centre developer, with planned investments exceeding €2 billion. Iberdrola holds a 20% equity stake and provides land with grid connections plus 24/7 clean electricity. The first project, Madrid Sur, is a 160,000 square-metre complex offering 144 MW of data processing capacity with a 230 MW grid connection already secured. This facility alone will require 1 TWh of power per year. The strategic model is that Iberdrola monetises data centres at three levels simultaneously: grid connection fees through the distribution network, long-term clean power PPAs, and equity participation in the data centre itself.",
  },
  {
    title: "Grid connection advantage — 700+ MW secured near Madrid",
    subtitle: "Pipeline extending to a potential 5,000 MW portfolio",
    detail: "Iberdrola has secured over 700 MW of electricity connections in strategic areas near Madrid for data centre development, with a potential portfolio extending to 5,000 MW. In a market where grid connection queues are the binding constraint on data centre deployment, Iberdrola's ownership of the physical distribution infrastructure is a decisive competitive advantage. Data centre developers will go wherever they can plug into the grid fastest — and Iberdrola can offer both the grid connection and the clean power supply as a bundled package. Spain is emerging as a major data centre hub: more than 12 GW of data centre capacity is under development nationally, representing over €30 billion of investment.",
  },
  {
    title: "The structural logic — why utilities win the AI power race",
    subtitle: "Grid access is the bottleneck, not capital or technology",
    detail: "The IEA warns that up to 20% of planned data centre projects globally could face delays due to grid connection bottlenecks. Waiting times for critical grid components like transformers and cables have doubled in the last three years. In this environment, vertically integrated utilities that own both generation and distribution — like Iberdrola — have an insurmountable advantage over pure-play renewable developers or data centre operators trying to secure grid access independently. Iberdrola can offer a hyperscaler a single counterparty for grid connection, 24/7 clean power, and potentially even equity partnership — no other type of company can do all three.",
  },
];

/* ═══════════════════════════════════════════
   FORCE 3 — GRID INVESTMENT SUPERCYCLE
   ═══════════════════════════════════════════ */
export const gridIntro = "Europe's electricity grid is simultaneously too old, too small, and too analogue for what is being asked of it. The European Commission estimates €584 billion of grid investment is needed by 2030 and €1.2 trillion by 2040 — split roughly €730 billion for distribution and €477 billion for transmission. This is the single most important structural tailwind for Iberdrola because every euro invested in grid assets mechanically grows the regulated asset base, on which Iberdrola earns a regulated return in perpetuity.";

export const gridProblems = [
  {
    title: "Too old — 40% of grids approaching end of life",
    detail: "Over 40% of EU distribution grids are more than 40 years old, putting them close to the end of their useful life. This is not a distant problem — it requires immediate replacement capital expenditure. Distribution networks in many EU countries were built during the 1960s–1980s expansion period and are now simultaneously ageing out. The replacement cycle alone — even without any demand growth — would require tens of billions of euros annually.",
  },
  {
    title: "Too small — demand surging 60% but grid is the bottleneck",
    detail: "Electricity demand is rising roughly 60% by 2030, driven by EVs, heat pumps, data centres, and industry. But grid capacity is not keeping pace. The IEA says grid planning, permitting, and completion can take 5 to 15 years, while renewable energy projects are delivered in 1 to 5 years. There are approximately 1,500 GW of advanced renewable projects waiting in grid connection queues globally. Grid connection has become Europe's single biggest energy transition bottleneck — more projects are waiting to connect than the grid can physically absorb.",
  },
  {
    title: "Too analogue — designed for a world that no longer exists",
    detail: "Europe's grid was designed for one-way power flows from large centralised power stations to passive consumers. It now must handle two-way flows from millions of distributed solar installations feeding power back in, manage the concentrated loads of EV charging and data centres, integrate intermittent wind and solar output, and operate with real-time digital intelligence. Smart meter penetration, automated fault detection, demand response systems, and vehicle-to-grid technology all require massive digital infrastructure overlaid on the physical grid.",
  },
];

export const gridInvestmentBreakdown = [
  { name: "Distribution networks", share: 61, color: "#1D4ED8" },
  { name: "Transmission networks", share: 39, color: "#059669" },
];

export const gridByCountry = [
  { name: "Germany", share: 22, color: "#1D4ED8" },
  { name: "France", share: 14, color: "#059669" },
  { name: "Italy", share: 11, color: "#EA580C" },
  { name: "Spain", share: 9, color: "#7C3AED" },
  { name: "UK", share: 12, color: "#DC2626" },
  { name: "Other EU", share: 32, color: "#94A3B8" },
];

/* ═══════════════════════════════════════════
   FORCE 4 — ENERGY SECURITY
   ═══════════════════════════════════════════ */
export const securityIntro = "The geopolitical case for electrification was transformed in February 2022 and has only intensified since. Europe's energy security doctrine has fundamentally shifted from 'diversify supply' to 'electrify demand.' The logic is straightforward: you cannot sanction the sun or embargo the wind. Every TWh generated domestically from renewables is a TWh that does not depend on imported gas from potentially hostile suppliers. Iberdrola's generation fleet — 84% emission-free, entirely domestic to its operating countries — is not just a commercial asset but a strategic national infrastructure asset in every market it serves.";

export const securityMilestones = [
  {
    title: "Russian gas share collapse — from 45% to 13%",
    subtitle: "EU gas imports from Russia slashed in three years",
    detail: "In 2021, Russian gas accounted for roughly 45% of EU gas imports. By 2025, this had fallen to approximately 13%, through a combination of demand reduction (EU gas consumption down 19% versus 2021), LNG import diversification, and accelerated renewable deployment. Renewables hit 25.2% of the EU's overall energy consumption in 2025, increasing domestic production while reducing import dependence. The EU Council and Parliament struck a deal in December 2025 to formally ban Russian LNG by end-2026 and Russian pipeline gas by autumn 2027.",
  },
  {
    title: "REPowerEU — climate meets sovereignty",
    subtitle: "Renewables target raised from 40% to 45% by 2030",
    detail: "The REPowerEU plan (May 2022) explicitly couples climate policy with energy security. It raised the 2030 renewable energy target from 40% to 45% of total energy consumption and targets 69% of electricity from renewables by 2030. The plan mobilised close to €300 billion in funding, with the Recovery and Resilience Facility at its core. The Commission estimates that required deployment of renewable generation goes far beyond what has been achieved to date — and recent modelling suggests it is virtually impossible for the EU to 'overbuild' renewable capacity at this point.",
  },
  {
    title: "Strait of Hormuz — the second energy shock of 2026",
    subtitle: "Gas futures +60%, oil past $100, storage at 30%",
    detail: "The March 2026 tensions around the Strait of Hormuz demonstrated that fossil fuel dependence continues to create acute vulnerability. Dutch TTF gas futures jumped 60%, oil surged past $100 per barrel, and EU gas storage fell to just 30% — down from 39% a year earlier. The IEA approved a release of 400 million barrels of strategic reserves, the largest in its history. This crisis arrived despite three years of diversification efforts, proving that replacing Russian gas with non-Russian gas simply reroutes geopolitical risk rather than eliminating it. Only domestic electrification based on renewable generation truly eliminates import dependency.",
  },
  {
    title: "Defence spending and strategic autonomy",
    subtitle: "Energy sovereignty as a pillar of European defence",
    detail: "The broader European push toward strategic autonomy — including the ReArm Europe initiative and dramatically increased defence spending commitments — reinforces the energy independence imperative. European leaders increasingly frame domestic clean energy infrastructure as a defence capability. Cyberattacks on European energy infrastructure reportedly surged 400% in the past year, strengthening the case for decentralised, domestically controlled energy systems. Iberdrola's position as operator of critical national infrastructure in four allied democracies aligns its commercial interests with the security priorities of every government it serves.",
  },
];

/* ═══════════════════════════════════════════
   FORCE 5 — OFFSHORE WIND INDUSTRIALISATION
   ═══════════════════════════════════════════ */
export const offshoreIntro = "Offshore wind is transitioning from a niche technology to Europe's primary large-scale clean electricity source. Higher capacity factors (40–50% versus 25–30% for onshore wind and solar), multi-gigawatt project scale, and improving economics are converging with binding government targets and massive capital mobilisation. Iberdrola — with 2.4 GW operational, 3.5 GW under construction, and a 15+ GW pipeline — is one of the top four offshore wind developers globally.";

export const offshoreDrivers = [
  {
    title: "UK Clean Power 2030 — offshore wind as the backbone",
    subtitle: "43–50 GW target; record 8.4 GW awarded in latest CfD round",
    detail: "The UK targets 95% clean electricity by 2030, with offshore wind explicitly the backbone of the system. The Clean Power 2030 Action Plan requires 43 to 50 GW of offshore wind capacity, up from approximately 15 GW today — meaning 28 to 35 GW must be added in roughly five years. The 7th CfD allocation round in January 2026 awarded a record 8.4 GW at £91/MWh, described by analysts as approximately cost-neutral for consumers. The UK has committed £28 billion for grid infrastructure to connect this new capacity. Iberdrola is directly positioned through ScottishPower's existing offshore portfolio, the 7 GW ScotWind pipeline with Shell, and the Eastern Green Link transmission projects.",
  },
  {
    title: "North Sea Investment Pact — £850 billion mobilisation",
    subtitle: "15 GW/year of offshore wind from 2031 to 2040",
    detail: "The UK has signed a North Sea Investment Pact with eight neighbouring countries committing to 15 GW of new offshore wind capacity per year between 2031 and 2040, aimed at mobilising £850 billion (approximately €1 trillion) of investment. This is the single largest capital commitment to any energy technology in European history. Iberdrola's operational track record across five offshore wind farms in four countries (UK, France, Germany, Ireland), combined with its €15 billion co-investment partnership with Masdar, positions it as one of a very small number of companies with the execution capability to capture this opportunity.",
  },
  {
    title: "Cost convergence — offshore wind approaching grid parity",
    subtitle: "CfD strike prices at 'cost-neutral' levels versus gas alternatives",
    detail: "Offshore wind economics have improved dramatically. The UK's latest auction cleared at £91/MWh — close to the cost of new gas-fired generation when carbon costs are included. Globally, levelised costs for onshore wind and solar PV have fallen to approximately €0.03 and €0.04 per kWh respectively. Offshore wind remains more expensive but is on a steep cost curve driven by larger turbines (14–15 MW next-generation units), industrialised supply chains, and economies of scale from multi-gigawatt projects. Each successive project benefits from accumulated operational data and engineering experience that incumbents like Iberdrola have built over two decades.",
  },
  {
    title: "Floating offshore wind — the next frontier",
    subtitle: "Opens deeper waters with stronger, more consistent wind",
    detail: "Floating wind technology, which anchors turbines in deeper waters where fixed-bottom foundations are impractical, is approaching commercial scale. The UK's Celtic Sea Round 5 has awarded leases for 3 GW of floating capacity. Floating wind opens vast new areas with stronger and more consistent wind resources, fewer environmental constraints, and smoother consenting processes than fixed-bottom projects. Iberdrola is active in floating wind R&D and development and is well positioned to deploy the technology at scale through its existing offshore wind platforms in the UK, Germany, and France.",
  },
];

export const offshoreCapacityPie = [
  { name: "Operational", share: 15, color: "#059669" },
  { name: "Under construction", share: 22, color: "#1D4ED8" },
  { name: "Advanced pipeline", share: 63, color: "#EA580C" },
];

/* ═══════════════════════════════════════════
   FORCE 6 — COMPOUNDING EFFECTS
   ═══════════════════════════════════════════ */
export const compoundingIntro = "These structural forces do not operate independently — they compound and reinforce each other, creating a flywheel where each tailwind accelerates the others. This is why the aggregate growth opportunity for Iberdrola likely exceeds the sum of each individual tailwind considered in isolation.";

export const compoundingLoops = [
  {
    from: "Electrification",
    to: "Grid investment",
    description: "More EVs, heat pumps, and industrial loads connected to the grid require more network capacity, directly driving RAB growth and regulated earnings.",
  },
  {
    from: "Data centres",
    to: "PPA demand",
    description: "Hyperscalers need guaranteed 24/7 clean power, driving long-term PPA demand at attractive prices — Iberdrola's contracted generation book grows in lock-step with AI deployment.",
  },
  {
    from: "Energy security",
    to: "Regulatory support",
    description: "The geopolitical imperative to build domestic clean energy and modernise grids creates favourable permitting, planning, and regulatory frameworks for Iberdrola's investments.",
  },
  {
    from: "Grid investment",
    to: "Offshore wind enablement",
    description: "New transmission infrastructure (Eastern Green Link, NECEC) unlocks previously inaccessible offshore wind sites, expanding the addressable market for Iberdrola's pipeline.",
  },
  {
    from: "Climate targets",
    to: "Mandatory demand",
    description: "EU and UK emission reduction targets are legally binding with penalty mechanisms, meaning electrification demand is mandated by law — not discretionary or cyclical.",
  },
  {
    from: "Capital flows",
    to: "Cost of capital advantage",
    description: "ESG-mandated capital flows into clean energy, and Iberdrola's position as the world's largest corporate green bond issuer gives it preferential access to the cheapest capital available — its 2025 hybrid bond priced at 3.75% and was 8× oversubscribed.",
  },
];

export const opportunityTable = [
  { tailwind: "EU grid modernisation", pool: "€1.2T", timeframe: "2024–2040", position: "Major position in 4 of top 10 EU markets" },
  { tailwind: "UK Clean Power 2030", pool: "£40bn/yr", timeframe: "2025–2030", position: "#2 distribution, top-5 generation" },
  { tailwind: "Data centre power (Europe)", pool: "~€200bn", timeframe: "2025–2032", position: "11+ TWh contracted, €2bn JV, 5 GW pipeline" },
  { tailwind: "Offshore wind (Europe)", pool: "£850bn+", timeframe: "2025–2040", position: "15+ GW pipeline, top-4 globally" },
  { tailwind: "US grid + IRA renewables", pool: "$600bn+", timeframe: "2025–2035", position: "9 GW renewables, $15.1bn rate base" },
  { tailwind: "EV charging infra", pool: "€100bn+", timeframe: "2025–2035", position: "72K chargers, BP JV" },
];

export const keyRisks = [
  {
    title: "Regulatory backlash",
    detail: "Spain's windfall tax (2022–2024) demonstrated that governments can retroactively change the rules, particularly when energy prices spike and utilities are seen as profiteering. The risk is that regulated returns are compressed or unexpected levies erode the economic value of the RAB.",
  },
  {
    title: "Supply chain bottleneck",
    detail: "The grid investment supercycle creates enormous demand for transformers, cables, skilled labour, and installation vessels — all of which face constraints. Lead times for large power transformers have doubled to 2–3 years. If supply chains cannot keep up, investment plans may be delayed even if capital and approvals are available.",
  },
  {
    title: "Interest rate sensitivity",
    detail: "Iberdrola's model depends on borrowing at rates below its allowed regulatory returns. If European interest rates rise significantly, the spread between borrowing costs and allowed returns compresses. The €58 billion investment plan and rising net debt (€50–53 billion) amplify this sensitivity.",
  },
  {
    title: "Offshore wind execution risk",
    detail: "Vineyard Wind's delays, industry-wide cost inflation in 2022–2024, and the complexity of next-generation 14–15 MW turbines all represent real execution risks. Each gigawatt of offshore wind represents €2–5 billion of capital — any project failure impairs returns on a significant investment.",
  },
  {
    title: "Political cycle risk",
    detail: "EU electrification mandates, the UK Clean Power 2030 target, and the US IRA are products of specific political moments. Changes of government or shifting priorities could slow the regulatory tailwinds, particularly if energy affordability concerns dominate the political agenda.",
  },
];
