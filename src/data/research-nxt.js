// NXT (Nextpower) — Business Primer Data
// Pure business overview — no financials, no valuations

export const heroStats = [
  { value: "150+ GW", label: "Cumulative solar tracker capacity shipped worldwide", color: "deepBlue" },
  { value: "#1", label: "Global market share for ten consecutive years", color: "green" },
  { value: "40+", label: "Countries served across six continents", color: "orange" },
  { value: "90+", label: "Manufacturing partner facilities worldwide", color: "purple" },
  { value: "600+", label: "Patents protecting proprietary technology", color: "capRed" },
  { value: "25+", label: "American manufacturing facilities for domestic content", color: "deepBlue" },
];

/* ═══════════════════════════════════════════
   BUSINESS DESCRIPTION
   ═══════════════════════════════════════════ */
export const businessDescription = [
  "Nextpower is the world's largest supplier of solar tracking systems for utility-scale solar power plants. When a government, energy company, or developer builds a large solar farm — the kind that powers tens of thousands of homes — Nextpower provides the mechanical systems that physically move the solar panels throughout the day so they always face the sun.",
  "A solar tracker is a steel structure with a motor and control system that rotates a row of solar panels from east to west as the sun moves across the sky. This simple motion increases the amount of electricity a solar farm produces by 15 to 25 percent compared to panels that are fixed in one position. For a utility-scale project generating hundreds of megawatts, that improvement translates into significantly more revenue over the 25- to 30-year life of the plant — making trackers essential equipment for almost every large solar installation built today.",
  "The company was founded in 2014 when its tracker technology was spun off from Solaria Corporation. Flextronics (now Flex), a major electronics manufacturer, acquired Nextracker in 2015 for 330 million dollars. After a successful public listing in February 2023 — the largest American initial public offering that year — the company completed its full separation from Flex in January 2024 and became a fully independent public company.",
  "In November 2025, the company rebranded from Nextracker to Nextpower. The name change reflects a strategic shift: the company is evolving from a supplier of a single product (solar trackers) into a broader technology platform that provides multiple components and software systems for solar power plants.",
];

/* ═══════════════════════════════════════════
   BUSINESS SEGMENTS
   ═══════════════════════════════════════════ */
export const segmentsProse = "Nextpower historically operated as a single-product company — it sold solar trackers. As the company has expanded through acquisitions and internal development, its product range has broadened significantly. Management has outlined a long-term goal of generating approximately one third of the company's revenue from products and services other than trackers by 2030. Today, the business can be understood in three broad categories:";

export const segments = [
  {
    name: "Solar Trackers",
    share: 87,
    color: "#1D4ED8",
    description: "The core product line. Single-axis tracking systems that rotate solar panels to follow the sun. This includes the standard tracker, terrain-following variants for difficult landscapes, hail-resistant models for storm-prone regions, and low-carbon versions made from recycled steel. Trackers are sold as engineered hardware — steel structures, motors, and control electronics — delivered to project sites and installed by the customer's construction contractor.",
    growthNote: "Tracker revenue has grown at roughly 25 percent per year over the past four years, driven by the global expansion of solar energy and Nextpower's rising market share. Growth comes from both volume increases (more gigawatts shipped) and a gradual increase in the revenue generated per gigawatt as customers adopt premium variants like the terrain-following and hail-resistant models.",
    costNote: "Trackers are a hardware business. The primary cost is raw materials — predominantly steel and aluminium — which account for the majority of the cost of goods sold. Logistics and shipping are the second-largest cost component, as trackers are heavy and bulky. Importantly, Nextpower does not own its factories: it outsources manufacturing to partner facilities, which means it avoids the large fixed costs of running its own plants.",
  },
  {
    name: "Adjacent Hardware",
    share: 8,
    color: "#7C3AED",
    description: "A growing collection of additional physical components for solar plants, acquired through a series of small acquisitions. This includes foundation systems (the steel structures driven into the ground that the trackers sit on), electrical wiring and junction boxes that connect the panels to the power grid, and steel frames that hold the solar modules themselves. The company is also developing power conversion systems — essentially large industrial inverters that convert the direct current produced by solar panels into the alternating current used by the electricity grid.",
    growthNote: "This segment is in early-stage ramp-up. Revenue is growing rapidly from a small base as these recently acquired product lines scale up. The strategic intent is for adjacent hardware to become a meaningful share of the business — management targets roughly 25 to 30 percent of total revenue by 2030. The power conversion product line, expected to begin shipping in 2026, represents the largest expansion of the addressable market.",
    costNote: "The cost structure is similar to trackers — raw materials and manufacturing partner costs dominate. Margins in this segment are expected to be somewhat lower than trackers initially as the products scale, but management expects them to converge over time as volumes grow and production processes mature.",
  },
  {
    name: "Software and Digital",
    share: 5,
    color: "#059669",
    description: "The software layer that makes Nextpower's hardware intelligent. The flagship product, TrueCapture, uses artificial intelligence to continuously optimise the angle of each individual tracker row based on real-time weather and site conditions — squeezing an extra 2 to 6 percent of energy output beyond what standard tracking algorithms achieve. The company also offers a fleet monitoring platform for plant operators and an embedded operating system that coordinates all the trackers across a solar plant. More recently, the company has added robotic inspection, autonomous fire detection, and drone-based site mapping through a series of acquisitions.",
    growthNote: "Software revenue is small in absolute terms but growing quickly as TrueCapture adoption increases. The key metric to watch is the 'attach rate' — the percentage of new tracker sales that also include TrueCapture. This has been rising steadily and hit record levels recently. Software is strategically important because it creates recurring revenue and makes it harder for customers to switch to a competitor.",
    costNote: "Software and digital services carry much higher profit margins than hardware because there are almost no material costs — the primary expense is the salaries of the engineers and data scientists who develop and maintain the software. This is the highest-margin part of the business.",
  },
];

export const segmentTarget2030 = [
  { name: "Solar Trackers", share: 67, color: "#1D4ED8" },
  { name: "Adjacent Hardware", share: 27, color: "#7C3AED" },
  { name: "Software and Digital", share: 6, color: "#059669" },
];

export const revenueByRegion = [
  {
    name: "United States",
    share: 70,
    color: "#1D4ED8",
    description: "The dominant market by a wide margin. The United States is in the midst of a massive buildout of utility-scale solar, accelerated by government incentives introduced in the 2022 Inflation Reduction Act. These incentives reward developers who use American-made components — and Nextpower, with over 25 manufacturing partner facilities in the US and a track record of producing trackers that meet domestic content requirements, is exceptionally well-positioned. The US market can be uneven from quarter to quarter because revenue depends on the timing of large individual projects.",
  },
  {
    name: "Middle East and Africa",
    share: 12,
    color: "#EA580C",
    description: "A fast-growing region anchored by Saudi Arabia's ambitious plan to install 130 gigawatts of renewable energy by 2030. Nextpower has already delivered over 6 gigawatts of tracker capacity across the Middle East and North Africa, including major projects in Saudi Arabia. In early 2026, the company completed a joint venture with Saudi partner Abunayyan Holding and announced a new manufacturing facility in Jeddah with capacity to produce up to 12 gigawatts of trackers per year.",
  },
  {
    name: "India",
    share: 8,
    color: "#059669",
    description: "One of the world's top three solar tracker markets alongside the United States and Saudi Arabia. India and Saudi Arabia together accounted for 28 gigawatts of tracker demand in 2024 — more than all of Europe combined. Nextpower competes for market share against Chinese and local competitors in this price-sensitive market.",
  },
  {
    name: "Latin America and Australia",
    share: 5,
    color: "#7C3AED",
    description: "Nextpower holds leading market positions in both regions. In Australia, the company has signed a partnership with local steel manufacturer Orrcon Steel to produce tracker components domestically, reducing shipping costs and lead times for Australian solar projects.",
  },
  {
    name: "Europe",
    share: 5,
    color: "#9B1B1B",
    description: "Historically a smaller market for the company, but growing. Nextpower achieved record bookings in Europe during the July to September 2025 quarter, reflecting increased solar deployment as European countries accelerate their energy transition plans.",
  },
];

/* ═══════════════════════════════════════════
   PRODUCTS — detailed, jargon-free
   ═══════════════════════════════════════════ */
export const products = [
  {
    category: "Solar Trackers",
    color: "deepBlue",
    intro: "The core product. Every variant shares the same fundamental design: a steel structure with its own motor and control system that rotates a row of solar panels to follow the sun. What makes Nextpower's design distinctive is its decentralised architecture — each row operates independently rather than being connected to a single central drive. This means that if one row has a problem, the rest of the plant keeps operating normally.",
    items: [
      { name: "NX Horizon", subtitle: "The standard tracker", desc: "The foundational product. A proven, reliable single-axis tracker suitable for flat or gently sloping terrain. This is the workhorse product that has been installed on thousands of solar farms worldwide and accounts for the majority of the company's shipments." },
      { name: "NX Horizon-XTR", subtitle: "For difficult terrain", desc: "A terrain-following variant designed for hilly, rocky, or uneven ground that would normally require expensive land preparation or be considered unbuildable. The XTR can navigate slopes and terrain changes that standard trackers cannot handle. This product significantly expands the number of locations where solar farms can be built. Over 17 gigawatts of the XTR series were sold in the fiscal year ending March 2025 alone." },
      { name: "NX Horizon Hail Pro", subtitle: "Storm protection", desc: "A hail-resilient tracker that automatically detects incoming severe weather using weather service data and stows the panels into a protective position before the storm arrives. Available in two variants depending on the size of hailstones they protect against. This product directly addresses a growing concern in the solar industry: large hailstorms have caused hundreds of millions of dollars in damage to solar farms in Texas and the American Midwest, making insurance increasingly difficult to obtain. Over 9 gigawatts were booked in the fiscal year ending March 2025." },
      { name: "NX Horizon Low Carbon", subtitle: "Sustainability-focused", desc: "A tracker manufactured using recycled steel from electric arc furnaces, independently certified as having a carbon footprint up to 35 percent lower than conventional trackers. This variant is designed for developers and asset owners who need to meet environmental commitments or comply with regulations that limit the embedded carbon in construction materials." },
    ],
  },
  {
    category: "Software and Controls",
    color: "green",
    intro: "The software layer is what transforms Nextpower's trackers from simple mechanical equipment into an intelligent energy optimisation platform. This is a critical competitive differentiator — no other tracker company has an equivalent software capability.",
    items: [
      { name: "TrueCapture", subtitle: "The intelligence engine", desc: "An artificial intelligence system embedded in the tracker's control system that continuously adjusts the angle of each individual row of panels based on real-time conditions. Instead of simply following the sun in a straight east-to-west arc, TrueCapture accounts for cloud cover, reflected light from neighbouring rows, terrain effects, and dozens of other variables to maximise energy output. It delivers 2 to 6 percent more energy than standard tracking algorithms — a meaningful improvement over the 25- to 30-year life of a solar plant. The technology originated from the 2016 acquisition of a machine learning startup called BrightBox Technologies." },
      { name: "NX Navigator", subtitle: "Plant monitoring", desc: "A cloud-based monitoring and control platform that gives solar plant operators a real-time view of their entire fleet of trackers. Operators can see performance data, receive alerts about equipment issues, and remotely manage tracker settings from anywhere in the world." },
      { name: "TrackerOS", subtitle: "The embedded operating system", desc: "The low-level software running on each tracker row that coordinates movement, integrates data from on-site sensors (wind speed, GPS position, sunlight intensity), and manages safety procedures — for example, automatically tilting panels flat during high winds to prevent damage." },
    ],
  },
  {
    category: "Adjacent Products — Expanding the Platform",
    color: "purple",
    intro: "Through a series of acquisitions since 2024, Nextpower has been building out a broader portfolio of products that sit alongside the tracker in a solar plant's bill of materials. The strategic logic is straightforward: if a customer is already buying trackers from Nextpower, offering them additional components from the same supplier reduces procurement complexity and installation time.",
    items: [
      { name: "Foundations", subtitle: "What the tracker sits on", desc: "Steel structures that are driven into the ground to anchor the tracker rows. Nextpower's foundation systems use semi-autonomous drilling technology that can handle challenging soil conditions — rocky ground, clay, or compacted earth — where traditional pile-driving methods struggle. This capability was added through an acquisition and expanded with government-supported research in Australia for rocky terrain applications." },
      { name: "Electrical Balance of System", subtitle: "The wiring that connects everything", desc: "Pre-assembled electrical infrastructure — the wiring, junction boxes, and conduit systems that collect electricity from the solar panels and transport it to the plant's power conditioning equipment. Acquired in May 2025 through the purchase of Bentek Corporation. This is a natural fit because the electrical system physically connects to the tracker structure." },
      { name: "Module Frames", subtitle: "What holds the solar panels", desc: "Steel frames manufactured using a roll-forming process that hold the solar modules (panels) themselves. Acquired in September 2025 through the purchase of Origami Solar. This further integrates Nextpower into the physical structure of the solar plant — the company can now supply the frames that hold the panels, the trackers that rotate them, and the foundations that anchor the whole system to the ground." },
      { name: "Robotics and Inspection", subtitle: "Keeping plants running", desc: "A suite of technologies acquired through three small purchases in 2025: autonomous robots that inspect solar plants and detect fires, drones that create detailed three-dimensional maps of project sites, and robots that clean dust and debris from solar panel surfaces. These are overseen by a dedicated division led by a robotics expert recruited from the University of California, Berkeley." },
      { name: "Power Conversion Systems", subtitle: "The next major product line", desc: "Utility-scale inverters and power electronics that convert the direct current produced by solar panels into the alternating current used by the electricity grid. This product line, announced in November 2025 with first shipments expected in 2026, represents the most significant expansion of the company's product portfolio. Inverters are a large, high-value component of any solar plant, and entering this market puts Nextpower in direct competition with established companies like SMA Solar of Germany, Sungrow of China, and Power Electronics of Spain." },
    ],
  },
];

/* ═══════════════════════════════════════════
   VALUE CHAIN — where Nextpower sits
   ═══════════════════════════════════════════ */
export const valueChainStages = [
  { stage: "Raw Materials", description: "Steel, aluminium, motors, and electronic components sourced from global suppliers", nxtRole: "none", nxtNote: "Nextpower purchases raw materials but does not mine, smelt, or produce them. Steel is the largest single cost input." },
  { stage: "Manufacturing", description: "Cutting, bending, welding, and assembling steel into tracker components", nxtRole: "orchestrate", nxtNote: "Nextpower does not own factories. It designs the products and outsources manufacturing to over 90 partner facilities in 19 countries. Key US partners include Unimacts, BCI Steel, and Steel Dynamics. This 'asset-light' model means the company avoids the large capital costs of owning and operating factories." },
  { stage: "Engineering and Design", description: "Product design, structural engineering, software development, and intellectual property creation", nxtRole: "own", nxtNote: "This is Nextpower's core. All product design, engineering, software (TrueCapture, TrackerOS), and research and development happen internally at the company's headquarters in Fremont, California. Over 600 patents protect the technology." },
  { stage: "Project Engineering", description: "Custom site layouts, tracker configuration, and technical specifications for each solar plant", nxtRole: "own", nxtNote: "Nextpower's engineers work with each customer to design the optimal tracker layout for their specific site — accounting for terrain, wind patterns, soil conditions, and local regulations. This consultative process deepens customer relationships." },
  { stage: "Logistics and Delivery", description: "Shipping manufactured components from factories to solar plant construction sites", nxtRole: "orchestrate", nxtNote: "Nextpower coordinates the logistics chain but uses third-party shipping and freight companies. By manufacturing close to project sites (using its global network of partner factories), the company reduces shipping distances and costs." },
  { stage: "Installation", description: "Physical construction and assembly of the tracking system at the solar plant site", nxtRole: "support", nxtNote: "Installation is typically performed by the customer's construction contractor, not by Nextpower directly. However, the company provides technical support, training, and supervision during installation." },
  { stage: "Software and Optimisation", description: "Ongoing energy yield optimisation, monitoring, and predictive maintenance", nxtRole: "own", nxtNote: "After the plant is built, Nextpower's software (TrueCapture, NX Navigator) continues generating value by maximising energy production and enabling remote monitoring. This creates a long-term relationship with the customer that extends well beyond the initial hardware sale." },
];

/* ═══════════════════════════════════════════
   COMPETITIVE POSITIONING
   ═══════════════════════════════════════════ */
export const competitorIntro = "The global solar tracker market is dominated by a small number of companies. The top ten suppliers account for roughly 90 percent of all trackers shipped worldwide. In the United States specifically, just three companies — Nextpower, GameChange Solar, and Array Technologies — supply over 90 percent of the domestic market.";

export const competitors = [
  { name: "Nextpower", hq: "United States", shareGlobal: 26, highlight: true, strengths: "Largest global installed base, only company with integrated software optimisation (TrueCapture), strongest domestic content positioning in the US, broadest product platform", weaknesses: "Premium pricing means it can lose on cost-sensitive international bids, heavy US revenue concentration creates policy risk" },
  { name: "Trina Tracker", hq: "China", shareGlobal: 15, strengths: "Backed by Trina Solar, one of the world's largest solar panel manufacturers — can bundle trackers with panels. Competitive pricing. Strong distribution in Asia and emerging markets", weaknesses: "Limited presence in the US due to trade tensions and tariffs. No equivalent software platform" },
  { name: "Array Technologies", hq: "United States", shareGlobal: 12, strengths: "Strong US presence with a proven, mechanically durable tracker design. Established relationships with American solar developers", weaknesses: "Weaker recent execution and market share losses. No integrated software layer. Less diversified product portfolio" },
  { name: "GameChange Solar", hq: "United States", shareGlobal: 10, strengths: "Aggressive growth — 55 percent revenue increase in 2023. Competitive pricing. Closing the gap with Array Technologies in the US market", weaknesses: "Smaller installed base means less field data and track record. Limited international presence" },
  { name: "Arctech Solar", hq: "China", shareGlobal: 8, strengths: "Rapidly gaining global market share. Competitive manufacturing costs from Chinese supply chain. Growing presence in emerging markets", weaknesses: "Faces the same US market access challenges as Trina Tracker. Less brand recognition with Western project lenders" },
  { name: "PV Hardware / Soltec", hq: "Spain", shareGlobal: 5, strengths: "European-focused players with local knowledge. Soltec is a single-axis tracker specialist with innovative designs", weaknesses: "Smaller scale limits purchasing power and R&D investment. Europe is a relatively small tracker market" },
];

export const marketSharePie = [
  { name: "Nextpower", share: 26, color: "#1D4ED8" },
  { name: "Trina Tracker", share: 15, color: "#EA580C" },
  { name: "Array Technologies", share: 12, color: "#059669" },
  { name: "GameChange Solar", share: 10, color: "#7C3AED" },
  { name: "Arctech Solar", share: 8, color: "#DC2626" },
  { name: "Others", share: 29, color: "#94A3B8" },
];

/* ═══════════════════════════════════════════
   MOAT ANALYSIS
   ═══════════════════════════════════════════ */
export const moatIntro = "A 'moat' in investing refers to a durable competitive advantage that protects a company's market position and makes it difficult for rivals to take its customers. Nextpower benefits from several reinforcing sources of competitive advantage:";

export const moats = [
  { title: "Software creates switching costs", strength: 5, category: "Switching Costs", description: "Nextpower is the only tracker company with a deeply integrated software layer (TrueCapture) that uses artificial intelligence to improve energy output. Once a solar plant owner is running TrueCapture, they accumulate years of performance data that are specific to their sites. Switching to a competitor's tracker for future projects means losing access to this optimisation intelligence and starting over. This data dependency makes customers 'sticky' — they are reluctant to change suppliers even if a competitor offers a slightly lower price on the hardware." },
  { title: "Largest installed base feeds a data advantage", strength: 4, category: "Scale Economies", description: "With over 150 gigawatts shipped — more than any competitor — Nextpower has the largest body of real-world field performance data in the industry. This data continuously feeds back into its software algorithms and product development, creating a self-reinforcing cycle: the more trackers installed, the better the software gets, which attracts more customers, which generates more data. Competitors with smaller installed bases simply cannot replicate this learning advantage." },
  { title: "Regulatory positioning in the United States", strength: 5, category: "Regulatory Moat", description: "The US government's Inflation Reduction Act provides significant financial incentives for solar projects that use American-made components. Nextpower was the first tracker company to deliver a product that qualifies as 100 percent domestic content under the government's rules. With over 25 manufacturing partner facilities in the US and annual purchases of over 100,000 tonnes of American steel, the company has built a domestic supply chain that competitors — particularly those based in China — cannot quickly replicate. This regulatory advantage may last for years, as the incentive programmes are designed to run through 2032." },
  { title: "Bankability and track record", strength: 4, category: "Intangible Assets", description: "Large solar projects are typically financed with billions of dollars of debt. The lenders who provide this financing are extremely risk-averse about equipment choices — they want to know that the tracker system will perform reliably for 25 to 30 years. Nextpower's decade-long track record as the market leader, its independently verified performance data, and its financial stability make it the 'safe choice' for lenders. This bankability advantage is very difficult for newer or smaller competitors to overcome, regardless of their technology." },
  { title: "Asset-light manufacturing gives flexibility", strength: 3, category: "Cost Advantage", description: "By outsourcing manufacturing to over 90 partner facilities rather than owning its own factories, Nextpower can scale production up or down quickly without being burdened by the fixed costs of idle factory capacity during downturns. It can also place manufacturing close to project sites — reducing shipping costs and lead times — and quickly shift production between countries in response to changing trade policies or tariffs. Competitors who own their manufacturing facilities cannot match this flexibility." },
  { title: "Platform breadth locks in larger relationships", strength: 3, category: "Switching Costs", description: "As Nextpower expands from trackers into foundations, electrical systems, module frames, and power conversion, it becomes a 'one-stop shop' for solar plant developers. A customer who buys multiple integrated products from a single supplier faces higher switching costs than one who buys only trackers — replacing one component means rethinking how all the others fit together. This platform strategy is still in its early stages but could become a powerful competitive barrier over time." },
];
