// IBE (Iberdrola) — Business Primer Data
// Pure business overview — no financials, no valuations

export const heroStats = [
  { value: "~45 GW", label: "Installed renewable capacity worldwide", color: "green" },
  { value: "#1", label: "Largest European utility by market capitalisation", color: "deepBlue" },
  { value: "35M", label: "Network supply points across four continents", color: "orange" },
  { value: "100M", label: "People served across 15+ countries", color: "purple" },
  { value: "1.3M km", label: "Kilometres of power lines operated globally", color: "capRed" },
  { value: "125+", label: "Years of operating history since 1901 founding", color: "deepBlue" },
];

/* ═══════════════════════════════════════════
   BUSINESS DESCRIPTION
   ═══════════════════════════════════════════ */
export const businessDescription = [
  "Iberdrola is a Spanish energy holding company headquartered in Bilbao that operates a fully vertically integrated electricity business — generating power, transmitting and distributing it through its own grid infrastructure, and selling it to end consumers. The company operates across four core geographies through dedicated subsidiaries: Spain (Iberdrola España), the United Kingdom (ScottishPower and Electricity North West), the United States (Avangrid), and Brazil (Neoenergia). Smaller but growing operations span Germany, France, Italy, Portugal, Greece, Poland, Australia, Japan, and Mexico.",
  "What distinguishes Iberdrola from most utility peers is its combination of massive regulated network assets and one of the world's largest renewable energy portfolios under a single corporate umbrella. Roughly half of its earnings now come from regulated electricity networks — wires, poles, substations — where returns are set by government regulators and protected from commodity price swings. The other half comes from generating and selling electricity, overwhelmingly from wind, solar, and hydroelectric sources.",
  "The company traces its origins to 1901, when Hidroeléctrica Ibérica was founded in Bilbao to harness northern Spain's river systems for hydropower. A parallel company, Hidroeléctrica Española, was established in 1907 to supply Madrid and Valencia. In 1944, Hidroeléctrica Ibérica merged with Saltos del Duero to form Iberduero. The modern Iberdrola was born on November 1, 1992, when Iberduero and Hidroeléctrica Española merged in a 50-50 combination — a defensive consolidation against the aggressive expansion of ENDESA, Spain's dominant electricity company at the time.",
  "The pivotal strategic shift came in 2001 when José Ignacio Sánchez Galán became CEO. While competitors diversified into telecoms and real estate during the dot-com era, Galán directed capital into renewable energy and international expansion. This contrarian bet — made nearly a decade before renewables became fashionable — is the foundation of the company Iberdrola is today. Since 2001, the company has invested over 175 billion euros in renewables, networks, and storage, growing from a domestic Spanish utility to a global infrastructure giant. International operations now represent roughly 65 percent of the business, up from less than 1 percent when Galán took over.",
];

/* ═══════════════════════════════════════════
   BUSINESS SEGMENTS
   ═══════════════════════════════════════════ */
export const segmentsProse = "Iberdrola reports under two main operating activities — Networks and Electricity Production & Customers — organised geographically through six country platforms. Understanding the interplay between the regulated networks business and the generation and retail business is key to understanding Iberdrola's model.";

export const segments = [
  {
    name: "Networks (T&D)",
    share: 40,
    color: "#1D4ED8",
    description: "Iberdrola's networks business owns and operates electricity transmission and distribution grids — plus US natural gas distribution — across Spain, the UK, the US, and Brazil. This is a pure regulated business: the company invests capital in grid infrastructure (lines, substations, smart meters), and regulators allow it to earn a fixed return on that invested capital — known as the regulated asset base or RAB. The total RAB reached approximately 45 to 51 billion euros by end-2024, and the company targets exceeding 70 billion euros by 2028 and 90 billion euros by 2031.",
    growthNote: "Networks is growing faster than the generation business and deliberately so. In FY2025, Networks EBITDA surged to roughly 7.8 billion euros — around 50 percent of the group total — up from approximately 38 to 40 percent in FY2024. The 2025–2028 strategic plan allocates the majority of investment to network expansion, particularly in the UK and the US. Growth is structural: electrification of transport and heating, data centre connections, distributed solar interconnection, and general grid modernisation all require more wires, substations, and transformers. Returns are inflation-protected in most jurisdictions.",
    costNote: "The networks cost structure is dominated by depreciation on the massive infrastructure base, followed by operations and maintenance costs (line crews, vegetation management, equipment replacement) and regulatory charges. Because this is a regulated business, costs are ultimately recovered through the tariffs regulators allow the company to charge. The key economic metric is the RAB — the larger the asset base, the more the company earns. Spain allows a roughly 5.6 percent pre-tax return, the UK RIIO frameworks allow approximately 5.2 to 5.6 percent real cost of equity, and US state utility commissions allow 7.5 to 11 percent nominal return on equity.",
  },
  {
    name: "Electricity Production & Customers",
    share: 59,
    color: "#059669",
    description: "This segment encompasses everything from generating electricity (wind, solar, hydro, gas, nuclear) to wholesale energy management, retail supply, smart solutions, green hydrogen, EV charging, and energy storage. Iberdrola generates electricity from approximately 57 gigawatts of installed capacity across seven technologies, with 84 percent of that capacity emission-free. The electricity is sold either through long-term contracts (power purchase agreements), government-backed contracts for difference, or wholesale markets. On the retail side, the company serves 31.5 million customer contracts globally.",
    growthNote: "Growth in this segment comes from three sources. First, commissioning new renewable capacity — Iberdrola added roughly 3 to 4 gigawatts of new wind and solar each year, with a pipeline of over 15 gigawatts of offshore wind projects alone. Second, expanding retail and smart solutions (EV charging, solar self-consumption, heat pumps), which now total 15.6 million contracts and are growing at over 10 percent annually. Third, emerging businesses like green hydrogen and battery storage. The company is deliberately shifting toward contracted and regulated revenue: roughly 100 percent of 2026 power production is already sold forward.",
    costNote: "Cost structure varies by technology. Wind and solar have zero fuel costs — the main expenses are depreciation on capital-intensive generation assets and maintenance across hundreds of sites. Hydroelectric plants are similar — the water is free, but the dams and turbines require maintenance. Nuclear involves fuel rod costs and highly regulated safety operations. Gas-fired plants have significant fuel costs that fluctuate with commodity prices, but Iberdrola has steadily reduced its gas exposure. On the retail side, the main costs are wholesale electricity procurement and customer management.",
  },
  {
    name: "Corporate & Other",
    share: 1,
    color: "#94A3B8",
    description: "A small segment housing holding company activities, central treasury functions, and group-level innovation and R&D. Iberdrola invests approximately 450 to 500 million euros annually in innovation, focused on grid digitalisation, energy storage technologies, green hydrogen, floating offshore wind foundations, and artificial intelligence for predictive maintenance.",
    growthNote: "This segment's contribution to group earnings is minimal. Its importance lies in housing the corporate finance function — Iberdrola is the world's largest corporate green bond issuer with over 60 billion euros in cumulative sustainable financing — and in incubating emerging technologies that may become material business lines in the future.",
    costNote: "Corporate costs primarily comprise interest expense on the holding company's debt, general administrative costs, group R&D spending, and the cost of maintaining the company's listings and regulatory compliance across multiple jurisdictions.",
  },
];

export const revenueByRegion = [
  {
    name: "Spain (Iberdrola España)",
    share: 35,
    color: "#1D4ED8",
    description: "Spain is Iberdrola's home market and the origin of its hydroelectric, nuclear, and early wind assets. The company operates roughly 11.5 million network supply points (around 31.5 percent of Spain's electricity distribution grid), 17.4 gigawatts of generation capacity including a large fleet of hydro plants built over the past century, and serves 23.3 million customer contracts. Spain is a mature market with limited volume growth, but it provides stable regulated cash flows from the distribution network and contracted returns from renewable assets.",
  },
  {
    name: "United Kingdom (ScottishPower + ENW)",
    share: 25,
    color: "#059669",
    description: "The UK is Iberdrola's second-largest and fastest-growing market by investment. The 2007 acquisition of ScottishPower for 17.1 billion euros established the platform, and the 2024 acquisition of Electricity North West for roughly 2.5 billion euros made Iberdrola the UK's second-largest electricity network operator. The combined UK network serves approximately 8.6 million supply points. On the generation side, Iberdrola operates major onshore and offshore wind farms across Scotland and the Irish Sea, including East Anglia ONE (714 MW offshore). The 2025–2028 plan allocates approximately 20 billion euros to the UK — more than any other geography.",
  },
  {
    name: "United States (Avangrid)",
    share: 20,
    color: "#EA580C",
    description: "Avangrid operates eight regulated utilities across New York, Connecticut, Maine, and Massachusetts, serving 3.4 million customers (electricity and natural gas). On the generation side, Avangrid has surpassed 9 gigawatts of installed wind and solar capacity across 22 states. Iberdrola acquired the remaining 18.4 percent of Avangrid it did not already own in 2024, delisting it from the NYSE and giving full control. The headline project is Vineyard Wind 1 (806 MW off Massachusetts), America's first large-scale offshore wind farm.",
  },
  {
    name: "Brazil (Neoenergia)",
    share: 14,
    color: "#7C3AED",
    description: "Neoenergia is one of Brazil's largest private electricity distributors, serving 16.6 million supply points across five distribution concessions in the northeast and central-west regions. Brazil provides exposure to a fast-growing emerging market with enormous electrification potential — smart meter penetration is just 4 percent versus near-100 percent in Spain — but carries currency risk (the Brazilian real depreciated 7.2 percent against the euro in 2024) and greater regulatory unpredictability. Iberdrola owns 83.8 percent and has launched a tender offer for the remaining shares.",
  },
  {
    name: "Rest of World (International)",
    share: 6,
    color: "#9B1B1B",
    description: "Iberdrola's growing international platform spans Germany (Baltic Eagle and Windanker offshore wind farms), France (Saint-Brieuc offshore wind farm, 496 MW), Italy, Portugal, Greece, Poland, Australia, Japan, Sweden, and Ireland. Mexico was historically a major market but Iberdrola sold its gas-fired assets there in 2023 for roughly 6 billion dollars to refocus on renewables and regulated markets. The international portfolio is principally offshore wind and selected onshore renewables in countries with supportive policy frameworks.",
  },
];

/* ═══════════════════════════════════════════
   PRODUCTS — detailed, jargon-free
   ═══════════════════════════════════════════ */
export const products = [
  {
    category: "Renewable Electricity Generation",
    color: "green",
    intro: "Iberdrola generates electricity from five renewable technologies, with a total renewable capacity of approximately 45 gigawatts — enough to power over 30 million homes. The company was among the first major European utilities to pivot toward renewables, beginning in 2001, giving it a head start of nearly a decade over most peers.",
    items: [
      { name: "Onshore wind", subtitle: "20,747 MW — 36.6% of total capacity", desc: "Iberdrola's single largest generation technology. The company operates hundreds of onshore wind farms across Spain, the US, the UK, Brazil, Mexico, Portugal, Greece, and other markets. Each wind farm consists of dozens or hundreds of individual turbines — tall towers (typically 80 to 120 metres) with rotating blades that convert wind energy into electricity. Iberdrola has been building onshore wind farms since the early 2000s, securing many of the best wind sites in Spain and the US Great Plains before competitors recognised their value." },
      { name: "Hydroelectric power", subtitle: "13,100 MW — 23.1% of total capacity", desc: "Iberdrola operates one of Europe's largest fleets of hydroelectric plants, concentrated in Spain and Portugal. These range from large reservoirs with dams (storing water to generate electricity on demand) to run-of-river plants (generating as water naturally flows). The centrepiece is the Tâmega complex in Portugal (1,158 MW), commissioned in 2022, one of Europe's largest hydroelectric projects in decades. Hydro assets are particularly valuable because many also function as pumped storage — pumping water uphill when electricity is cheap and releasing it to generate when prices are high — effectively acting as giant batteries." },
      { name: "Solar photovoltaic", subtitle: "7,796 MW — 13.8% of total capacity", desc: "Iberdrola has rapidly built out utility-scale solar farms, particularly in Spain, Portugal, the US, Brazil, and Australia. The flagship Núñez de Balboa plant in Extremadura, Spain (500 MW) was Europe's largest solar plant when commissioned in 2020. Unlike rooftop solar on individual homes, these are industrial-scale installations covering hundreds of hectares with millions of individual solar panels, typically in regions with the highest solar irradiance." },
      { name: "Offshore wind", subtitle: "2,373 MW operational — 4.2% of total, but fastest-growing", desc: "Offshore wind is Iberdrola's highest-profile growth technology. The company currently operates five offshore wind farms: East Anglia ONE (714 MW, UK North Sea), Saint-Brieuc (496 MW, France), Baltic Eagle (476 MW, Germany), Wikinger (350 MW, Germany), and a share of West of Duddon Sands (194 MW, Irish Sea). Under construction are Vineyard Wind 1 (806 MW, Massachusetts — America's first large-scale offshore farm), East Anglia THREE (1,397 MW), Windanker (315 MW, Germany), and East Anglia TWO (960 MW). The advanced pipeline exceeds 15 gigawatts, including a 7 GW ScotWind joint venture with Shell." },
      { name: "Nuclear power", subtitle: "3,177 MW — 5.6% of total capacity", desc: "Iberdrola co-owns stakes in several nuclear power stations in Spain, including Cofrentes (which it fully operates) and minority stakes in Almaraz and other plants. Nuclear provides zero-carbon baseload electricity that runs continuously regardless of weather. While Iberdrola is not building new nuclear capacity, these plants contribute reliable output and will operate until their scheduled decommissioning dates in the 2030s." },
    ],
  },
  {
    category: "Electricity Networks",
    color: "deepBlue",
    intro: "Iberdrola's network business is the physical infrastructure that delivers electricity from power plants to homes and businesses — over 1.3 million kilometres of power lines, 4,500 substations, and 1.6 million transformers across four countries. This is the part of the business you cannot see but rely on every time you flip a light switch.",
    items: [
      { name: "Electricity distribution", subtitle: "35.1 million supply points across four countries", desc: "Distribution is the 'last mile' — the medium and low-voltage power lines that connect substations to homes, offices, factories, and shops. Iberdrola operates distribution networks in Spain (i-DE, 11.5 million supply points), the UK (ScottishPower Energy Networks and Electricity North West, combined approximately 8.6 million), the US (Avangrid utilities across New York, Connecticut, Maine, Massachusetts, 3.4 million electricity and gas connections), and Brazil (Neoenergia, 16.6 million supply points across five concessions). This is a natural monopoly: it makes no economic sense for two companies to build parallel sets of power lines down the same street." },
      { name: "Electricity transmission", subtitle: "High-voltage backbone across multiple countries", desc: "Transmission is the high-voltage backbone that moves large amounts of electricity over long distances — from power plants to the distribution network. Iberdrola owns and operates transmission lines in Spain, the UK, the US, and Brazil. Key strategic projects include the NECEC (New England Clean Energy Connect) in the US — a 145-mile transmission line bringing Canadian hydropower to New England — and Eastern Green Link 1, a subsea high-voltage direct current cable connecting Scotland and England." },
      { name: "Smart grids and digitalisation", subtitle: "Over 15 million smart meters installed", desc: "Iberdrola is progressively digitalising its grid infrastructure by replacing traditional analogue meters with smart meters that communicate usage data in real time. Penetration is nearly 100 percent in Spain, roughly 62 percent in the UK, approximately 65 percent in the US, and only 4 percent in Brazil — representing a major investment runway. Smart grid technology enables remote fault detection, faster outage restoration, demand response programmes, and integration of distributed solar and electric vehicle charging." },
      { name: "US natural gas distribution", subtitle: "Avangrid gas utilities in the Northeast", desc: "A smaller but meaningful part of Avangrid's US business involves distributing natural gas through underground pipe networks to homes and businesses in New York, Connecticut, Maine, and Massachusetts. While Iberdrola's strategy is firmly focused on electrification, these gas distribution assets earn regulated returns and serve essential heating needs in the northeastern United States." },
    ],
  },
  {
    category: "Retail Energy and Smart Solutions",
    color: "orange",
    intro: "Beyond generating and delivering electricity, Iberdrola sells directly to end consumers — households and businesses — through retail supply contracts. Increasingly, the company bundles electricity supply with 'smart solutions' — products and services that help customers manage their energy use, generate their own power, and electrify their transport.",
    items: [
      { name: "Retail electricity supply", subtitle: "31.5 million customer contracts globally", desc: "In Spain, the UK, and other markets where retail competition exists, Iberdrola competes to win customer contracts. The company offers various tariff structures — fixed price, variable, green energy, time-of-use — to residential and business customers. Spain accounts for the largest share with 23.3 million contracts. The natural hedge between generation and retail is important: when wholesale prices rise, generation profits increase but retail margins compress, and vice versa — stabilising overall earnings." },
      { name: "EV charging infrastructure", subtitle: "~72,000 charging points (19,000+ public)", desc: "Iberdrola has built one of Europe's largest electric vehicle charging networks, concentrated in Spain but expanding internationally. The network includes roughly 19,000 public charging points (at motorway service stations, shopping centres, and urban locations) and approximately 53,000 private chargers installed at homes and workplaces. A joint venture with BP targets up to 11,000 fast and ultra-fast chargers across Spain and Portugal by 2030." },
      { name: "Rooftop solar and self-consumption", subtitle: "Part of 15.6 million smart solutions contracts", desc: "Iberdrola helps residential and commercial customers install solar panels on their own rooftops, often bundled with battery storage and smart energy management systems. This allows customers to generate part of their own electricity during the day and sell excess back to the grid. In Spain, the number of smart solutions contracts (including solar self-consumption, heat pumps, and smart home services) reached 15.6 million and is growing at over 10 percent annually." },
    ],
  },
  {
    category: "Emerging — Green Hydrogen and Storage",
    color: "purple",
    intro: "Iberdrola is positioning in two technologies expected to become large-scale businesses over the next decade: green hydrogen (produced by using renewable electricity to split water molecules) and battery energy storage. Both are still early-stage but are attracting significant capital allocation.",
    items: [
      { name: "Green hydrogen", subtitle: "Puertollano plant operational, 600 ktpa pipeline", desc: "Iberdrola commissioned Europe's largest green hydrogen plant for industrial use at Puertollano, Spain (20 MW electrolyser powered by a dedicated 100 MW solar farm), supplying hydrogen to Fertiberia's ammonia and fertiliser operations. A pipeline of 8 further projects targets 600,000 tonnes per annum of green hydrogen production capacity, supported by a strategic partnership with BP. Green hydrogen replaces fossil-fuel-derived hydrogen in industrial processes and could eventually be used for heavy transport, shipping, and seasonal energy storage." },
      { name: "Battery energy storage", subtitle: "~500 MW operational, 12 GW pipeline", desc: "Iberdrola operates approximately 500 megawatts of grid-scale battery storage and approximately 4,700 MW of pumped hydro storage (including Europe's largest pumped storage facility at La Muela, Spain, 1,512 MW). The battery pipeline exceeds 12 gigawatts. Grid-scale batteries charge when renewable electricity is abundant and cheap, and discharge during peak demand periods — helping balance the intermittency of wind and solar and reducing the need for gas-fired peaking plants." },
    ],
  },
];

/* ═══════════════════════════════════════════
   VALUE CHAIN
   ═══════════════════════════════════════════ */
export const valueChainStages = [
  { stage: "Electricity Generation", description: "Converting primary energy (wind, sun, water, atoms, gas) into electrical power", ibeRole: "own", ibeNote: "Iberdrola is a major electricity generator with approximately 57 gigawatts of installed capacity worldwide. The company generates electricity from onshore wind (the largest single source), hydroelectric dams, solar farms, offshore wind farms, nuclear stations, and natural gas plants. In Spain and the UK, Iberdrola's generation fleet is among the largest. In the US, Avangrid has over 9 gigawatts. In Brazil, Neoenergia operates wind, solar, hydro, and thermal plants. The generation fleet is 84 percent emission-free." },
  { stage: "Electricity Transmission", description: "Moving high-voltage electricity over long distances from generators to population centres", ibeRole: "own", ibeNote: "Iberdrola owns transmission infrastructure in all four core markets. In Spain, the transmission grid is primarily owned by Red Eléctrica (now Redeia), but Iberdrola owns key interconnection assets. In the UK, ScottishPower Transmission owns and operates the high-voltage network across central and southern Scotland, and is building the Eastern Green Link subsea cable. In the US, Avangrid subsidiaries own transmission lines across the Northeast. In Brazil, Neoenergia holds multiple transmission concessions." },
  { stage: "Electricity Distribution", description: "Delivering power through local medium- and low-voltage networks to homes and businesses", ibeRole: "own", ibeNote: "This is where Iberdrola's network moat is strongest. The company operates distribution grids serving 35.1 million supply points — making it one of the world's largest electricity distributors. These are natural monopolies regulated by local authorities: in Spain by the CNMC, in the UK by Ofgem, in the US by state public utility commissions, and in Brazil by ANEEL. No competitor can build a parallel distribution network; every new home or business connected to the grid pays Iberdrola a regulated tariff." },
  { stage: "Retail Supply and Billing", description: "Selling electricity to end consumers, managing customer accounts, and sending monthly bills", ibeRole: "own", ibeNote: "Iberdrola sells directly to end customers in most of its markets. In Spain, the company holds approximately 34 percent of retail customers by number — the second-largest retailer after Endesa. In the UK, ScottishPower is one of the 'Big Six' energy suppliers. In the US, Avangrid's regulated utilities serve retail customers in their franchise territories. In Brazil, Neoenergia's five distribution concessions are the default retail supplier for their areas. The total reaches 31.5 million customer contracts." },
  { stage: "Wholesale Energy Management", description: "Trading electricity and hedging positions across wholesale power markets", ibeRole: "orchestrate", ibeNote: "Iberdrola operates active wholesale energy management desks that optimise the dispatch of its generation fleet, manage fuel procurement, hedge price risk, and trade across European and American power markets. The natural hedge between generation (which profits from high prices) and retail supply (which profits from low procurement costs) means Iberdrola is structurally less exposed to wholesale price swings than pure generators or pure retailers. Approximately 100 percent of 2026 power production is already contracted or hedged." },
  { stage: "Smart Solutions and New Energy Services", description: "EV charging, rooftop solar, heat pumps, green hydrogen, and energy storage", ibeRole: "own", ibeNote: "Iberdrola is expanding beyond traditional utility activities into adjacent services. The company operates roughly 72,000 EV charging points, offers rooftop solar installation, sells smart home energy management, produces green hydrogen at Puertollano, and operates approximately 5,200 megawatts of combined pumped hydro and battery storage. Smart solutions contracts total 15.6 million and are growing at over 10 percent annually. These businesses leverage Iberdrola's existing customer relationships and grid infrastructure." },
];

/* ═══════════════════════════════════════════
   COMPETITIVE POSITIONING
   ═══════════════════════════════════════════ */
export const competitorIntro = "Iberdrola competes across multiple geographies and business lines — regulated networks, renewable generation, and retail energy — against a range of large European and global utilities. Its uniqueness lies in the combination of scale in both regulated networks and renewables, diversified across four continents, which no single competitor fully replicates.";

export const competitors = [
  { name: "Iberdrola", hq: "Spain", shareGlobal: 0, highlight: true, strengths: "Largest European utility by market capitalisation. Unique combination of massive regulated networks (45+ billion euros RAB) and 45 gigawatt renewable portfolio across four geographies. First-mover advantage from 2001 renewables pivot. World's largest corporate green bond issuer. 84 percent emission-free generation", weaknesses: "Spanish regulatory risk (windfall taxes). Currency exposure to GBP, USD, and BRL. Offshore wind execution risk (Vineyard Wind delays). Rising net debt alongside ambitious investment plan. Lingering Villarejo corporate espionage reputational issue" },
  { name: "Enel", hq: "Italy", strengths: "Approximately 67 to 68 gigawatts of managed renewable capacity — the largest globally. Operations across 30 countries. Large regulated distribution businesses in Italy and Latin America. Endesa subsidiary is Spain's largest electricity company", weaknesses: "Higher exposure to Latin American political and currency risk. More complex corporate structure with multiple listed subsidiaries. Greater legacy fossil fuel exposure in certain markets. Pursuing asset disposal programme to reduce debt" },
  { name: "NextEra Energy", hq: "United States", strengths: "World's largest generator of wind and solar energy (NEER). Florida Power & Light is America's largest individual regulated utility serving 6 million accounts. A-minus credit rating. Enormous 30+ gigawatt contracted backlog", weaknesses: "Essentially US-only — no meaningful international diversification. Concentrated in hurricane-prone Florida. No offshore wind operating track record. Less geographic spread than Iberdrola" },
  { name: "Ørsted", hq: "Denmark", strengths: "World's largest offshore wind developer with roughly 10 gigawatts operational. Pioneer and market leader in European offshore wind. Strong project execution track record", weaknesses: "Pure-play renewables with no regulated network income. Suffered major US offshore wind write-downs exceeding 5 billion dollars. Limited onshore wind and solar portfolio. No retail supply business or distribution networks" },
  { name: "EDP / EDPR", hq: "Portugal", strengths: "Around 27 gigawatts of group renewable capacity. Strong positions in Iberia and Brazil. EDP Renováveis (EDPR) is Europe's third-largest renewable energy operator. Growing presence in US and Asia", weaknesses: "Smaller scale than Iberdrola in every geography. Complex dual-listing structure (EDP and EDPR). More limited offshore wind pipeline. Less diversified network base" },
  { name: "RWE", hq: "Germany", strengths: "Approximately 19 gigawatts of renewable capacity following Con Edison Clean Energy acquisition. Significant offshore wind presence in North Sea. Major presence in European power trading", weaknesses: "Still carries material legacy coal and gas exposure. No regulated distribution network income. Concentrated in Germany and northern Europe. Less international diversification than Iberdrola" },
];

export const marketSharePie = [
  { name: "Iberdrola", share: 22, color: "#059669" },
  { name: "Enel / Endesa", share: 18, color: "#1D4ED8" },
  { name: "EDP / EDPR", share: 13, color: "#EA580C" },
  { name: "RWE", share: 9, color: "#7C3AED" },
  { name: "Ørsted", share: 8, color: "#DC2626" },
  { name: "Others (SSE, Engie, Vattenfall, etc.)", share: 30, color: "#94A3B8" },
];

/* ═══════════════════════════════════════════
   MOAT ANALYSIS
   ═══════════════════════════════════════════ */
export const moatIntro = "Iberdrola's competitive advantages form a five-layer moat system. Each layer reinforces the others, creating a compounding flywheel that has widened steadily over the past two decades. The critical insight is that no competitor can replicate this combination by copying any single element in isolation.";

export const moats = [
  { title: "Regulated networks are the deepest moat", strength: 5, category: "Legal Monopoly", description: "Iberdrola's distribution networks — 35.1 million supply points across Spain, the UK, the US, and Brazil — are natural monopolies protected by regulatory frameworks. No competitor can build a parallel grid. Every new home connected, every electric vehicle charger installed, every data centre plugged in adds to the regulated asset base and thus to allowed earnings. Returns are set by regulators with built-in inflation protection: Spain allows roughly 5.6 percent pre-tax return, the UK approximately 5.2 to 5.6 percent real cost of equity, US states allow 7.5 to 11 percent nominal ROE. By 2028, the company targets 55 percent of EBITDA from networks and 75 percent of total EBITDA from regulated or long-term contracted sources — virtually eliminating merchant energy price exposure." },
  { title: "First-mover advantage in renewables compounds over time", strength: 5, category: "First-Mover Advantage", description: "Iberdrola's 2001 pivot to renewables secured the best onshore wind sites across Spain, the UK, and the US — sites that are physically irreplaceable. The hydroelectric concessions totalling 13,100 megawatts in Iberia are century-old assets that no competitor can replicate. Twenty-plus years of operational data, supply chain relationships (particularly the historic relationship with Siemens Gamesa), and project execution expertise create barriers that late entrants cannot easily overcome. Approximately 100 percent of 2026 power production is already contracted, with average power purchase agreement durations of roughly 15 years." },
  { title: "Scale in offshore wind creates capital barriers", strength: 4, category: "Scale Economies", description: "Individual offshore wind farms cost 2 to 5 billion euros or more, and financing them requires a proven track record. Iberdrola has commissioned five farms across four countries (UK, France, Germany, Ireland) and secured 15 billion euros in co-investment from Masdar for future projects. Its East Anglia THREE project finance was significantly oversubscribed. The ScotWind pipeline alone represents 7 gigawatts with Shell. Few companies globally can marshal the capital, regulatory relationships, and engineering expertise to compete at this scale. The under-construction pipeline of roughly 3,500 megawatts will nearly triple current offshore capacity." },
  { title: "Cost of capital is a hidden structural advantage", strength: 5, category: "Financial Moat", description: "Credit ratings of BBB+ from S&P and Baa1 from Moody's enable deep, liquid capital market access. As the world's largest corporate green bond issuer (over 60 billion euros in cumulative sustainable financing), Iberdrola attracts ESG-mandated investors who accept lower yields — its 2025 EU Green hybrid bond priced at just 3.75 percent, the lowest hybrid coupon since 2022, and was oversubscribed eightfold. Cost of debt stands at 3.55 percent excluding Brazil, with liquidity of 20.2 billion euros covering 22 months of financing needs. In a capital-intensive business where projects are funded over 20 to 30 year horizons, even a small borrowing cost advantage compounds enormously." },
  { title: "ESG leadership reinforces every other advantage", strength: 4, category: "Intangible Assets", description: "Iberdrola is the only European utility in the Dow Jones Sustainability Index for 25 consecutive years. It holds an MSCI AAA ESG rating, CDP A List status, and has been named among the World's Most Ethical Companies for seven consecutive years. Carbon intensity of 38 grams per kilowatt-hour in Europe is five times lower than the European peer average. These credentials directly translate into cheaper capital (ESG-mandated fund flows), regulatory goodwill (easier permitting for new projects), corporate PPA demand (companies seeking verifiably green power), and talent attraction. This is a self-reinforcing cycle: the cleaner the portfolio, the easier it is to raise cheap capital, which funds more clean projects." },
  { title: "The integrated model ties everything together", strength: 5, category: "Compounding System", description: "The real moat is the combination, not any individual element. Owning distribution networks provides real-time demand data that optimises generation dispatch. Distribution customers become natural candidates for retail supply and smart solutions, reducing customer acquisition costs. Building renewables in areas where the company owns the grid reduces interconnection costs and delays. The natural hedge between generation and retail stabilises consolidated earnings regardless of wholesale price movements. Stable, predictable earnings maintain the investment-grade credit rating, which enables low-cost capital for more network and renewable investment, which grows the RAB and contracted capacity, which strengthens earnings further. Each turn of this flywheel makes the next turn easier." },
];
