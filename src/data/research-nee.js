// NEE (NextEra Energy) — Business Primer Data
// Pure business overview — no financials, no valuations

export const heroStats = [
  { value: "~6M", label: "Customer accounts served by Florida Power & Light", color: "deepBlue" },
  { value: "#1", label: "World's largest generator of wind and solar energy", color: "green" },
  { value: "73 GW", label: "Total generation capacity across all technologies", color: "orange" },
  { value: "30+ GW", label: "Development backlog of contracted projects", color: "purple" },
  { value: "41", label: "US states with NextEra Energy Resources operations", color: "capRed" },
  { value: "100+", label: "Years of operating history since 1925 founding", color: "deepBlue" },
];

/* ═══════════════════════════════════════════
   BUSINESS DESCRIPTION
   ═══════════════════════════════════════════ */
export const businessDescription = [
  "NextEra Energy is a Florida-based energy holding company that operates two fundamentally different businesses under one roof. The first is Florida Power & Light, America's single largest electric utility, delivering electricity to roughly 12 million people across Florida as a regulated monopoly. The second is NextEra Energy Resources, the world's largest generator of wind and solar energy, selling wholesale electricity from renewable projects spanning 41 US states and 4 Canadian provinces.",
  "This dual structure — stable regulated cash flows from a utility monopoly paired with high-growth contracted renewable energy — is what makes NextEra unlike any other energy company. No other business combines the nation's largest individual regulated utility with the world's largest wind and solar portfolio.",
  "The company's roots go back to December 1925, when Florida Power & Light was created during Florida's real estate boom by consolidating nearly 60 small electric, gas, and ice companies scattered across the state. In its first year, it served about 76,000 customers with just 70 megawatts of generating capacity. The strategic pivot that created today's NextEra began in 1997, when the company established a subsidiary to build wind farms outside Florida. Its first wind farm came online in Oregon in 1998, and by 2005 it was the largest wind power operator in the world.",
  "The parent company was renamed from FPL Group to NextEra Energy in 2010, signalling its full commitment to clean energy at scale. Under successive leaders over the past two decades, the company has delivered roughly 10 percent compound annual earnings growth — an extraordinary track record for a utility business.",
];

/* ═══════════════════════════════════════════
   BUSINESS SEGMENTS
   ═══════════════════════════════════════════ */
export const segmentsProse = "NextEra operates through two primary business segments that function very differently but complement each other strategically. Understanding the distinction between the regulated utility and the competitive renewables business is essential to understanding how NextEra works.";

export const segments = [
  {
    name: "Florida Power & Light (FPL)",
    share: 69,
    color: "#1D4ED8",
    description: "A vertically integrated, rate-regulated electric utility. FPL generates, transmits, distributes, and sells electricity to approximately 6 million customer accounts across 43 Florida counties — most of the state's east coast, lower west coast, and the northwestern panhandle. Customers have no choice of provider: FPL is their sole option under a legal franchise granted by the state. In exchange for this monopoly, the Florida Public Service Commission sets the rates FPL may charge, designed to let the company earn a fair return on its invested capital.",
    growthNote: "FPL grows steadily through 'rate base expansion' — as it invests more capital in new power plants, solar farms, transmission lines, and grid hardening, its asset base grows, and so do its allowed earnings. Florida's fast-growing population adds roughly 1.2 percent new customers annually, providing organic growth without needing to compete. Revenue fluctuates with fuel cost pass-throughs and storm recovery charges, but the underlying business grows predictably with infrastructure investment.",
    costNote: "FPL's cost structure is dominated by fuel and purchased power (roughly a quarter of revenue), followed by depreciation on its massive infrastructure base, taxes, and day-to-day operations and maintenance. Importantly, FPL's non-fuel operating costs run approximately 70 percent below the national utility average — an exceptional efficiency that allows it to keep customer bills more than 30 percent below the national average while maintaining industry-leading reliability.",
  },
  {
    name: "NextEra Energy Resources (NEER)",
    share: 30,
    color: "#059669",
    description: "A competitive, unregulated clean energy business. NEER develops, builds, and operates wind farms, solar farms, battery storage facilities, natural gas plants, and nuclear stations, selling electricity wholesale to utilities, municipalities, cooperatives, and large corporations under long-term contracts. Unlike FPL, NEER does not deliver electricity directly to homes or send anyone a monthly bill — it sells power in bulk to other entities who then distribute it to end consumers.",
    growthNote: "NEER has grown rapidly, setting four consecutive annual records for new project originations, with 13.5 gigawatts originated in 2025 alone. Growth is driven by rising electricity demand (particularly from data centres), corporate clean energy commitments, state-level renewable mandates, and the economics of wind and solar now being competitive with fossil fuels even without subsidies. The 30-plus gigawatt backlog of contracted projects provides roughly four years of construction visibility.",
    costNote: "NEER's cost structure is very different from a traditional utility. Because wind and solar have zero fuel costs, the main expenses are depreciation on the capital-intensive generation assets and operations and maintenance across hundreds of sites. There is no fuel bill to fluctuate with commodity prices, which makes the cost base highly predictable once a project is built. The business also benefits from federal tax credits that significantly improve project economics.",
  },
  {
    name: "Other (Transmission, Corporate)",
    share: 1,
    color: "#94A3B8",
    description: "A small segment housing holding company activities and NextEra Energy Transmission (NEET), a competitive transmission business that builds and owns high-voltage power lines. NEET has a development pipeline exceeding 25 billion dollars and was the first non-incumbent company awarded competitive transmission projects in California. Transmission is increasingly valuable as renewable generation — often built in remote, windy, or sunny locations — requires new lines to reach population centres.",
    growthNote: "Transmission is an emerging growth area. As more renewable energy projects are built far from cities, the need for new high-voltage lines is growing significantly. NextEra also controls XPLR Infrastructure (formerly NextEra Energy Partners), a publicly traded partnership that owns contracted clean energy projects, though this vehicle is being restructured.",
    costNote: "Corporate costs primarily comprise interest expense on the holding company's debt and general administrative costs. Transmission projects are capital-intensive but earn regulated-style returns once operational.",
  },
];

export const revenueByRegion = [
  {
    name: "Florida (FPL territory)",
    share: 69,
    color: "#1D4ED8",
    description: "The overwhelming majority of NextEra's revenue comes from Florida Power & Light's monopoly service territory. FPL covers 43 of Florida's 67 counties, serving most of the state's east coast from Miami to Jacksonville, the lower west coast, and the northwestern panhandle (after absorbing Gulf Power in 2022). Florida's population growth of roughly 1.2 percent per year provides a built-in demand tailwind that few other utility territories enjoy.",
  },
  {
    name: "Texas and Central US (NEER wind)",
    share: 12,
    color: "#059669",
    description: "The Great Plains states — Texas, Oklahoma, Kansas, Iowa, and the Dakotas — are home to the majority of NEER's wind generation assets. Texas alone hosts more wind capacity than any other US state. These wind-rich states provide high capacity factors (the percentage of time the wind actually blows at useful speeds), making them the most economical locations for large-scale wind farms.",
  },
  {
    name: "Southwest US (NEER solar and storage)",
    share: 8,
    color: "#EA580C",
    description: "California, Arizona, Nevada, and other southwestern states host much of NEER's solar and battery storage portfolio. These states receive the most intense and consistent sunlight in the country. California's ambitious clean energy mandates — requiring 100 percent clean electricity by 2045 — drive ongoing demand for new solar and storage projects.",
  },
  {
    name: "Northeast and Mid-Atlantic (NEER mixed)",
    share: 6,
    color: "#7C3AED",
    description: "NEER operates nuclear generation at its Seabrook station in New Hampshire and Point Beach in Wisconsin, along with wind and solar assets across the northeastern and mid-Atlantic states. The company is also pursuing competitive transmission projects in Pennsylvania, West Virginia, and New England.",
  },
  {
    name: "Canada and other",
    share: 5,
    color: "#9B1B1B",
    description: "NEER operates wind and solar projects across four Canadian provinces — Ontario, Alberta, Saskatchewan, and British Columbia. The company also has emerging operations tied to data centre power supply agreements in multiple states.",
  },
];

/* ═══════════════════════════════════════════
   PRODUCTS — detailed, jargon-free
   ═══════════════════════════════════════════ */
export const products = [
  {
    category: "Regulated Electricity in Florida",
    color: "deepBlue",
    intro: "Every home, business, and factory in FPL's service territory receives electricity generated at FPL's power plants, delivered over FPL's transmission and distribution lines, and billed monthly by FPL. A typical residential customer using 1,000 kilowatt-hours per month pays approximately 137 dollars — more than 30 percent below the national average.",
    items: [
      { name: "Natural gas generation", subtitle: "72 percent of FPL's electricity", desc: "FPL operates a fleet of highly efficient natural gas power plants that produce the majority of its electricity. These plants burn natural gas — piped in from suppliers — to spin turbines that generate power. FPL has systematically retired older, less efficient oil and coal plants and replaced them with modern gas units that produce more electricity per unit of fuel, lowering both costs and emissions." },
      { name: "Nuclear generation", subtitle: "19 percent of FPL's electricity", desc: "FPL operates four nuclear reactors at two sites: Turkey Point (south of Miami, operating since 1972) and St. Lucie (on the Atlantic coast near Fort Pierce, operating since 1976). Nuclear plants produce zero carbon emissions during operation and provide reliable 'baseload' power that runs around the clock regardless of weather conditions." },
      { name: "Solar generation", subtitle: "9 percent of FPL's electricity", desc: "FPL operates roughly 7,900 megawatts of solar capacity — the largest utility-owned solar portfolio in the United States. This is the result of a massive build-out programme: FPL has added thousands of megawatts of solar panels across Florida over the past decade, taking advantage of the state's abundant sunshine. Unlike rooftop solar on individual homes, these are large-scale solar farms covering hundreds of acres." },
      { name: "Grid infrastructure", subtitle: "The wires and poles", desc: "FPL owns and maintains approximately 80,000 miles of transmission and distribution lines across Florida, along with thousands of substations, transformers, and smart metres. This physical infrastructure is what actually delivers electricity from power plants to customers' homes and businesses. FPL has invested billions in 'grid hardening' — strengthening poles, burying power lines underground, and installing smart equipment — to improve resilience against Florida's frequent hurricanes." },
    ],
  },
  {
    category: "Wholesale Renewable Energy",
    color: "green",
    intro: "NextEra Energy Resources builds and operates massive wind and solar farms and sells their output to other entities — not directly to homeowners. The key product is a power purchase agreement: a long-term contract (typically 10 to 25 years) with a utility, municipality, cooperative, or corporation agreeing to buy electricity at a fixed price. Roughly 93 percent of NEER's capacity is contracted under such agreements.",
    items: [
      { name: "Wind energy", subtitle: "126 wind farms across North America", desc: "NEER operates the world's largest fleet of wind farms. Each wind farm consists of dozens or hundreds of individual turbines — tall towers with rotating blades that convert wind energy into electricity. NEER's wind assets are concentrated in the Great Plains states where wind is strongest and most consistent. The company was a first mover in American wind energy, building its first farm in 1998 and scaling aggressively ever since." },
      { name: "Solar energy", subtitle: "Hundreds of utility-scale solar installations", desc: "NEER has built and operates hundreds of large solar farms across the United States, primarily in sun-rich states like California, Arizona, Texas, and Florida. Unlike rooftop solar on homes, these are industrial-scale installations covering hundreds or thousands of acres. Solar has become NEER's fastest-growing technology as panel costs have plummeted over the past decade." },
      { name: "Battery storage", subtitle: "Approximately 3,400 megawatts of capacity", desc: "Large battery installations that store excess solar or wind energy and release it during peak demand or when the sun is not shining and wind is not blowing. These are warehouse-sized arrays of lithium-ion batteries. Storage is one of NEER's fastest-growing product lines, comprising nearly one third of recent backlog additions. Batteries function as replacements for the natural gas 'peaker' plants that traditionally met short-term demand spikes." },
      { name: "Natural gas generation", subtitle: "Flexible dispatchable power", desc: "NEER also operates natural gas power plants that provide electricity when renewables cannot — during calm, cloudy periods or when demand peaks beyond what wind and solar can supply. These assets are increasingly important to complement the intermittent nature of renewable generation." },
      { name: "Nuclear generation", subtitle: "Seabrook and Point Beach stations", desc: "NEER operates nuclear stations at Seabrook (New Hampshire) and Point Beach (Wisconsin), providing zero-carbon baseload power. The company also holds a power purchase agreement with Google for the planned restart of the 615-megawatt Duane Arnold nuclear plant in Iowa — a landmark deal that reflects growing interest in nuclear power to meet data centre electricity demand." },
    ],
  },
  {
    category: "Emerging — Data Centre and Transmission",
    color: "purple",
    intro: "NextEra is rapidly positioning itself at the intersection of two powerful trends: the explosion of data centre construction driven by artificial intelligence, and the need for new high-voltage transmission lines to connect remote renewable energy sites to population centres.",
    items: [
      { name: "Data centre energy solutions", subtitle: "Integrated power for AI infrastructure", desc: "NextEra is in more than 20 active negotiations with hyperscale technology companies to provide integrated power supply for data centres. This involves combining solar, battery storage, natural gas, and transmission in campus-style configurations tailored to the massive, always-on electricity needs of artificial intelligence computing. A landmark partnership with Google Cloud targets approximately 15 gigawatts of new capacity. This is NextEra's most significant growth frontier." },
      { name: "Competitive transmission", subtitle: "High-voltage power lines", desc: "NextEra Energy Transmission builds and owns long-distance, high-voltage power lines that transport electricity from generation sites to population centres. The subsidiary has a development pipeline exceeding 25 billion dollars and was the first non-incumbent company to win competitive transmission projects in California. A recently approved project involves a 220-mile, 765-kilovolt line in Pennsylvania and West Virginia." },
    ],
  },
];

/* ═══════════════════════════════════════════
   VALUE CHAIN — where NextEra sits
   ═══════════════════════════════════════════ */
export const valueChainStages = [
  { stage: "Fuel Procurement", description: "Purchasing natural gas, nuclear fuel, and other inputs needed to generate electricity", nxtRole: "own", nxtNote: "FPL purchases natural gas from pipelines and suppliers to fuel its power plants. NEER's renewable assets (wind and solar) have zero fuel costs — the 'fuel' is free sunlight and wind. This is a fundamental advantage: once a wind or solar farm is built, its ongoing costs are dramatically lower than a gas or coal plant because there is no fuel to buy." },
  { stage: "Power Generation", description: "Converting fuel, wind, sunlight, or nuclear reactions into electricity at power plants", nxtRole: "own", nxtNote: "NextEra owns and operates approximately 73 gigawatts of generation capacity across all technologies. FPL generates electricity for its Florida customers from gas, nuclear, and solar. NEER generates electricity from wind, solar, storage, gas, and nuclear across 41 states and Canada. The company builds most of its own projects using in-house engineering and construction capabilities, which keeps costs lower than outsourcing." },
  { stage: "Transmission", description: "Moving electricity long distances at high voltages from power plants to population centres", nxtRole: "own", nxtNote: "FPL owns high-voltage transmission lines across Florida. NEET is building competitive transmission projects in multiple states. This stage is becoming increasingly important because renewable energy projects are often built in remote locations with strong wind or sun but far from the cities that need the power. New transmission lines are the bottleneck in the American energy transition." },
  { stage: "Distribution", description: "Delivering electricity locally at reduced voltages through neighbourhood power lines to homes and businesses", nxtRole: "partial", nxtNote: "Only FPL participates in distribution — it owns and operates roughly 80,000 miles of local power lines, substations, and transformers across Florida. NEER does not distribute electricity; it sells power wholesale to other entities who handle distribution to end consumers. This distinction is crucial: FPL is a 'full stack' utility, while NEER is a wholesale generator." },
  { stage: "Retail and Billing", description: "Selling electricity to end consumers, managing customer accounts, and sending monthly bills", nxtRole: "partial", nxtNote: "Again, only FPL serves retail customers directly. NEER's customers are other utilities, municipalities, cooperatives, and corporations who buy electricity in bulk under long-term power purchase agreements. NEER never interacts with the individual homeowner or small business." },
  { stage: "Grid Services and Optimisation", description: "Managing the real-time balance between electricity supply and demand, predicting output, and optimising equipment performance", nxtRole: "own", nxtNote: "NextEra's proprietary NextEra 360 software platform processes over 560 billion data points daily to optimise generation output, predict equipment failures, and identify the best sites for new projects. This data and operational expertise — accumulated over 25 years of operating renewable assets at massive scale — is a significant competitive advantage that smaller operators cannot easily replicate." },
];

/* ═══════════════════════════════════════════
   COMPETITIVE POSITIONING
   ═══════════════════════════════════════════ */
export const competitorIntro = "NextEra competes in two distinct arenas — regulated utilities and competitive clean energy — and holds a commanding position in both. Its uniqueness lies in being both things at once: pure regulated utilities lack NEER's growth engine, while pure renewable developers lack FPL's stable, monopoly-backed cash flows.";

export const competitors = [
  { name: "NextEra Energy", hq: "United States", shareGlobal: 0, highlight: true, strengths: "Only company combining America's largest individual regulated utility with the world's largest wind and solar portfolio. Lowest-cost operator in both segments. Unmatched development backlog of 30+ gigawatts. Investment-grade credit rating enables industry-leading borrowing costs", weaknesses: "Heavy geographic concentration in hurricane-prone Florida. Regulatory risk from Florida Public Service Commission decisions. Execution risk converting massive backlog into operating assets. Federal tax policy changes could impact renewables economics" },
  { name: "Duke Energy", hq: "United States", shareGlobal: 0, strengths: "Serves 8.6 million customers across 6 states. Large regulated utility footprint. Growing renewable portfolio. Strong regulatory relationships in the Southeast", weaknesses: "Slower renewable energy growth than NextEra. Higher proportion of coal and gas generation. Multiple state regulatory jurisdictions add complexity. Less competitive in unregulated markets" },
  { name: "Southern Company", hq: "United States", strengths: "Serves 9 million customers. Strong position in fast-growing Southeast markets. Major nuclear construction experience (Vogtle Units 3 and 4). Diversified fuel mix", weaknesses: "Vogtle nuclear project suffered massive cost overruns and delays. Smaller renewable portfolio than NextEra. Traditionally more reliant on coal and gas generation" },
  { name: "Iberdrola / Avangrid", hq: "Spain / United States", strengths: "Approximately 43 gigawatts of renewable capacity worldwide. Strong offshore wind position in Europe. US presence through Avangrid subsidiary with 8 regulated utilities in the Northeast", weaknesses: "US operations are smaller scale than NextEra. Avangrid has faced regulatory challenges in Maine and Connecticut. Split focus between European and American markets" },
  { name: "Brookfield Renewable", hq: "Canada", strengths: "30+ gigawatt global renewable portfolio. Diversified across hydro, wind, solar, and storage. Strong financial backing from Brookfield Asset Management", weaknesses: "No regulated utility providing stable cash flows. Global portfolio means split management attention. Less dominant position in any single technology compared to NEER" },
  { name: "Ørsted", hq: "Denmark", strengths: "World's largest offshore wind developer. Strong European presence. Pioneer in the offshore wind industry", weaknesses: "Suffered major US offshore wind write-downs (over 5 billion dollars). No regulated utility base. Limited onshore wind and solar presence compared to NEER. Geographically focused on northern Europe" },
];

export const marketSharePie = [
  { name: "NextEra (NEER)", share: 24, color: "#059669" },
  { name: "Constellation / Calpine", share: 15, color: "#1D4ED8" },
  { name: "Invenergy (private)", share: 12, color: "#EA580C" },
  { name: "AES Corporation", share: 8, color: "#7C3AED" },
  { name: "Clearway Energy", share: 6, color: "#DC2626" },
  { name: "Others", share: 35, color: "#94A3B8" },
];

/* ═══════════════════════════════════════════
   MOAT ANALYSIS
   ═══════════════════════════════════════════ */
export const moatIntro = "NextEra's competitive advantages operate as an interlocking system rather than isolated strengths, creating a flywheel that becomes harder to replicate as the company grows. Each advantage feeds into and reinforces the others.";

export const moats = [
  { title: "FPL's regulated monopoly is the foundation", strength: 5, category: "Legal Monopoly", description: "Florida Power & Light has an exclusive legal franchise to serve 6 million customer accounts. No competitor can build distribution infrastructure in FPL's territory — this is a century-old monopoly backed by state regulation. This monopoly generates approximately 70 percent of the company's operating cash flow, providing a predictable financial base that underpins everything else NextEra does. FPL's customer bills run more than 30 percent below the national average while maintaining industry-leading reliability, creating regulatory goodwill that makes it very difficult for regulators to deny reasonable rate increases." },
  { title: "Scale in renewables drives lower costs", strength: 5, category: "Scale Economies", description: "As the world's largest buyer of wind turbines, solar panels, and batteries, NextEra negotiates procurement prices that smaller developers simply cannot match. The company has secured solar and battery supply chains through 2029 and shifted tariff risk to suppliers — leverage available only to a buyer of its enormous size. In-house engineering, procurement, and construction capabilities, combined with centralised operations and maintenance across hundreds of sites, compress the cost of energy below what competitors can achieve. NextEra can deploy solar and storage projects in 12 to 18 months, faster than most peers." },
  { title: "Cost of capital is the most powerful hidden advantage", strength: 5, category: "Financial Moat", description: "NextEra carries an A-minus credit rating, at the high end among US energy companies. This allows it to borrow at lower interest rates than smaller or lower-rated developers. In a business where projects require billions in upfront capital and generate returns over 20-plus years, even a small borrowing cost difference compounds enormously across a portfolio of NextEra's size. The company maintains roughly 18 billion dollars of available liquidity. Management has described this cost of capital advantage as their single most important competitive edge." },
  { title: "Interconnection queue positions create a structural barrier", strength: 4, category: "First-Mover Advantage", description: "Connecting a new power plant to the electric grid requires securing a position in the regional interconnection queue — a bureaucratic process that now takes 3 to 5 or more years in congested regions. NextEra has been filing for queue positions since 2001, accumulating approximately 145 gigawatts of positions across the country. These positions represent a two-decade head start that newer entrants simply cannot replicate. Combined with site control over some of the most desirable wind and solar locations in North America — secured through long-term landowner leases — this creates a formidable first-mover advantage." },
  { title: "Data and operational expertise compound over time", strength: 4, category: "Intangible Assets", description: "NextEra's proprietary software platform processes over 560 billion data points daily to optimise generation output, predict equipment failures, and identify the best sites for new projects. FPL's generation strategy has saved customers over 16 billion dollars in fuel costs since 2001. This expertise — accumulated over 25 years of operating renewable assets at a scale no competitor matches — creates a knowledge advantage that widens with every new project commissioned and every year of additional operating data collected." },
  { title: "The flywheel ties everything together", strength: 5, category: "Compounding System", description: "FPL's stable cash flows support the parent's credit rating, which enables low-cost capital for NEER projects, which wins more contracts at competitive prices, which grows the backlog, which justifies larger equipment orders at better procurement terms, which improves project returns, which strengthens financial performance, which maintains the credit rating. Each advantage feeds the next. The result is a compounding system that grows wider with each turn — and one that no competitor can replicate by copying any single element in isolation." },
];
