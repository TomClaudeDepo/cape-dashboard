// NXT (Nextpower / Nextracker) — Business Primer Data

export const nxtSnapshot = {
  ticker: "NXT", exchange: "NASDAQ", price: "~$55", marketCap: "~$17B",
  forwardPE: "~13x", revenue: "$2.96B (FY25)", adjEPS: "$3.44 (FY25)",
  fcf: "$622M", cash: "$953M", debt: "$0",
  backlog: ">$4.5B", gwShipped: "150+ GW cumulative",
};

export const heroStats = [
  { value: "150+ GW", label: "Cumulative tracker capacity shipped", color: "deepBlue" },
  { value: "#1", label: "Global tracker share — 10 consecutive years", color: "green" },
  { value: "$622M", label: "FY2025 free cash flow", color: "green" },
  { value: "$0", label: "Total debt — fortress balance sheet", color: "orange" },
  { value: ">$4.5B", label: "Backlog (9+ consecutive quarters of growth)", color: "capRed" },
  { value: "~26%", label: "Global market share (2024)", color: "purple" },
];

export const productCards = [
  {
    id: "trackers", num: "01", title: "Solar Trackers", tag: "Core product — NX Horizon platform",
    color: "deepBlue",
    desc: "Single-axis trackers rotating rows of solar panels to follow the sun. Decentralised architecture where each row operates autonomously. Increases energy yield 15–25% vs fixed-tilt.",
    variants: [
      { name: "NX Horizon-XTR", detail: "Terrain-following tracker for sloped, uneven sites. 17+ GW sold in FY2025. Expands addressable market to previously unbuildable terrain." },
      { name: "NX Horizon Hail Pro", detail: "Hail-resilient tracker with auto-stow. Pro-60 and Pro-75 variants. 9+ GW booked in FY2025. Addresses insurability concerns in Texas and Midwest." },
      { name: "NX Horizon Low Carbon", detail: "Electric arc furnace recycled steel. Carbon Trust certified 35% below conventional. Targets Scope 3 and embodied carbon requirements." },
    ],
  },
  {
    id: "software", num: "02", title: "Software & Controls", tag: "AI-driven optimisation — key differentiator",
    color: "green",
    desc: "Software layer turns the tracker from a purely mechanical product into an intelligent, software-defined energy optimisation platform.",
    variants: [
      { name: "TrueCapture", detail: "AI/ML energy yield optimisation. 2–6% incremental energy gains per row. Record bookings in FY2025. Originated from 2016 BrightBox acquisition." },
      { name: "NX Navigator", detail: "Fleet-level monitoring, control, and performance analytics platform for solar plant operators." },
      { name: "TrackerOS", detail: "Embedded OS coordinating tracker motion, integrating site sensors (wind, GPS, irradiance), managing safety stow." },
    ],
  },
  {
    id: "platform", num: "03", title: "Platform Expansion", tag: "Bolt-on acquisitions building full-stack capability",
    color: "purple",
    desc: "Acquisitions expanding from a single tracker product toward an integrated solar technology platform — foundations, electrical, frames, AI, robotics, and power conversion.",
    variants: [
      { name: "Foundations (NX Anchor / Earth Truss)", detail: "Semi-autonomous drilling for challenging soils. 1+ GW cumulative sales. Expanded with ARENA-supported development in Australia." },
      { name: "eBOS (Bentek, $78M)", detail: "Pre-assembled electrical infrastructure — wiring, junction boxes, combiner boxes, conduit. Reduces procurement complexity." },
      { name: "Module Frames (Origami Solar, $53M)", detail: "Roll-formed steel-frame technology for solar modules. Further integrating the bill of materials." },
      { name: "AI & Robotics ($40M+)", detail: "OnSight (autonomous fire detection), SenseHawk (drone 3D mapping), Amir (robotic panel cleaning). Led by Francesco Borrelli from UC Berkeley." },
      { name: "Power Conversion Systems", detail: "New utility-scale inverter line, first shipments expected 2026. Competes with SMA, Sungrow, Power Electronics. Biggest TAM expansion yet." },
    ],
  },
];

export const competitorTable = [
  { rank: 1, company: "Nextpower", hq: "USA", notes: "~26% global share (2024), 28.5 GW shipped", highlight: true },
  { rank: 2, company: "Trina Tracker", hq: "China", notes: "Rising rapidly, strong in Asia" },
  { rank: 3, company: "Array Technologies", hq: "USA", notes: "~12% historical share, weaker recent execution" },
  { rank: 4, company: "GameChange Solar", hq: "USA", notes: "55% growth in 2023, closing gap on Array" },
  { rank: 5, company: "PV Hardware", hq: "Spain", notes: "European-focused" },
  { rank: "—", company: "Arctech Solar", hq: "China", notes: "Gained share, overtook Array in some rankings" },
  { rank: "—", company: "Soltec", hq: "Spain", notes: "Single-axis specialist" },
];

export const moatSources = [
  {
    title: "Technology integration (software + hardware)",
    strength: 5,
    detail: "Only tracker company with a deeply integrated software layer (TrueCapture) delivering measurable energy yield improvements. Array Technologies has no equivalent. Creates switching costs via performance data dependency.",
  },
  {
    title: "Asset-light manufacturing model",
    strength: 4,
    detail: "No owned factories. 90+ partner facilities across 19 countries, 25+ in the US. Flex up/down without capex. Localises supply chains near project sites.",
  },
  {
    title: "IRA domestic content advantage",
    strength: 5,
    detail: "First 100% domestic content tracker under Treasury safe harbor. 25+ US partner manufacturing facilities, 100,000+ tonnes American steel/year. Competitors with offshore supply chains cannot easily replicate.",
  },
  {
    title: "Scale and track record",
    strength: 4,
    detail: "150+ GW shipped globally. Largest installed base generates the most field data, feeding better software optimisation. Project developers and lenders favour proven, bankable suppliers.",
  },
  {
    title: "Platform breadth",
    strength: 3,
    detail: "Acquisition-driven expansion into foundations, eBOS, frames, robotics, PCS. 'One-stop shop' reducing procurement complexity — strategic thesis that customers pay a premium for integrated solutions.",
  },
];

export const segmentEvolution = {
  current: [
    { category: "Trackers", share: 87, color: "deepBlue" },
    { category: "Adjacent products", share: 8, color: "purple" },
    { category: "Software & digital", share: 5, color: "green" },
  ],
  target2030: [
    { category: "Trackers", share: 67, color: "deepBlue" },
    { category: "Adjacent products", share: 27, color: "purple" },
    { category: "Software & digital", share: 6, color: "green" },
  ],
};

export const revenueByRegion = [
  { region: "United States", pct: 70, color: "deepBlue", detail: "Dominant market. 25+ domestic manufacturing facilities. IRA-driven demand. Can be lumpy quarter to quarter." },
  { region: "Middle East & North Africa", pct: 12, color: "orange", detail: "Fast-growing. Saudi 130 GW target by 2030. 6+ GW delivered across MENA. Nextpower Arabia JV with Jeddah facility (12 GW/yr)." },
  { region: "India", pct: 8, color: "green", detail: "Top-three tracker market. India + Saudi drove 28 GW of tracker demand in 2024, exceeding all of Europe." },
  { region: "Latin America & Australia", pct: 5, color: "purple", detail: "Top market positions in both. Orrcon Steel partnership for localised Australian manufacturing." },
  { region: "Europe", pct: 5, color: "capRed", detail: "Record bookings in Q2 FY2026. Historically smaller contributor but growing." },
];

export const financials = [
  { metric: "Revenue", fy23: "$1.9B", fy24: "$2.5B", fy25: "$2.96B", fy26e: "$3.4–3.5B" },
  { metric: "Revenue growth", fy23: "—", fy24: "~32%", fy25: "~18%", fy26e: "~16–18%" },
  { metric: "Adj. EBITDA", fy23: "—", fy24: "$523M", fy25: "$776M", fy26e: "$810–830M" },
  { metric: "Adj. Diluted EPS", fy23: "—", fy24: "—", fy25: "~$3.44", fy26e: "$4.26–4.36" },
  { metric: "Free cash flow", fy23: "—", fy24: "$423M", fy25: "$622M", fy26e: "—" },
  { metric: "Cash position", fy23: "—", fy24: "—", fy25: "$766M", fy26e: "$953M" },
  { metric: "Debt", fy23: "$0", fy24: "$0", fy25: "$0", fy26e: "$0" },
  { metric: "GAAP net margin", fy23: "—", fy24: "—", fy25: "~17%", fy26e: "~14–16%" },
];

export const revenueChartData = {
  labels: ["FY2023", "FY2024", "FY2025", "FY2026E"],
  values: [1.9, 2.5, 2.96, 3.45],
  projected: [false, false, false, true],
};

export const fcfChartData = {
  labels: ["FY2024", "FY2025"],
  values: [423, 622],
};

export const marginChartData = {
  labels: ["FY2024", "FY2025", "FY2026E"],
  ebitda: [21, 26, 24],
  gross: [29, 32, 31],
};

export const kpiTable = [
  { metric: "Backlog ($B)", why: "Forward revenue visibility", value: ">$4.5B, grew 9+ consecutive quarters" },
  { metric: "GW shipped / booked", why: "Volume metric", value: "28.5 GW shipped (2024), ~39% YoY growth" },
  { metric: "US vs intl mix", why: "Concentration & IRA dependency", value: "US ~66–76% of quarterly revenue" },
  { metric: "Adj. EBITDA margin", why: "Core profitability", value: "~24–26% in FY2025–FY2026" },
  { metric: "FCF", why: "Capital return capacity", value: "$622M in FY2025, +46% YoY" },
  { metric: "TrueCapture attach rate", why: "Software stickiness", value: "Record bookings, increasing attach rates" },
  { metric: "Non-tracker revenue %", why: "Platform strategy progress", value: "Target ~33% by FY2030" },
  { metric: "45X credit / tariff net", why: "IRA benefit magnitude", value: "~$53M net in Q3 FY2026" },
  { metric: "Cash & debt", why: "Balance sheet fortress", value: "$953M cash, $0 debt (Q3 FY2026)" },
];

export const mgmt = [
  { name: "Dan Shugar", role: "Founder & CEO", detail: "Career solar exec. PG&E solar group in the 1980s → PowerLight ($335M acquisition by SunPower) → Solaria → Nextracker in 2014. Led through entire lifecycle: founding, Flex acquisition, IPO, separation, rebrand to Nextpower." },
  { name: "Chuck Boynton", role: "CFO", detail: "Oversees capital-efficient model with strong cash conversion. Key voice on FY2030 framework: $4.8–5.6B revenue, fortress balance sheet, disciplined investment." },
  { name: "Howard Wenger", role: "President & Board Member", detail: "Joined board at Flex separation January 2024. President since February 2022." },
  { name: "Francesco Borrelli", role: "Chief AI & Robotics Officer", detail: "UC Berkeley expert in predictive control systems. Appointed 2025 to lead new AI/robotics division." },
];

export const capitalAllocation = [
  { category: "Organic R&D", detail: "600+ patents. Continuous innovation (Hail Pro, XTR, Low Carbon, PCS). UC Berkeley CALNEXT partnership.", icon: "🔬" },
  { category: "Bolt-on M&A", detail: "5 acquisitions in FY25–26 (~$170M+). All tuck-in, asset-light targets adding platform capability.", icon: "🔗" },
  { category: "Share buybacks", detail: "$500M programme announced Jan 2026 alongside Q3 results.", icon: "↩️" },
  { category: "JV investment", detail: "~$88M committed to Nextpower Arabia JV. Jeddah facility (12 GW/yr).", icon: "🤝" },
  { category: "No dividend", detail: "Consistent with growth-stage allocation. Cash deployed into organic and inorganic growth.", icon: "📈" },
];

export const policyLandscape = [
  {
    title: "IRA — Central Policy Tailwind",
    type: "tailwind",
    detail: "Section 45X credits directly benefit Nextpower ($48–75M/quarter in vendor rebates). First 100% domestic content tracker under Treasury safe harbor. Key risk: any rollback, modification, or expiration directly impacts domestic tracker demand and premium pricing. Guidance explicitly assumes current US policy environment remains in effect.",
  },
  {
    title: "Tariffs and Trade Policy",
    type: "mixed",
    detail: "AD/CVD actions on Southeast Asian modules create both opportunity and risk. Tariffs on imported components benefit domestically-sourced supply chain but could raise BoM costs. Q3 FY2026 included ~$53M net of credits and tariffs.",
  },
  {
    title: "Permitting & Interconnection",
    type: "headwind",
    detail: "FY2026 outlook assumes permitting timelines consistent with historical levels. Interconnection queue backlogs and permitting delays are structural constraints on US solar buildout — not NXT-specific but affect backlog-to-revenue conversion pace.",
  },
  {
    title: "Securities Class Action",
    type: "risk",
    detail: "December 2024 class action in Northern District of California alleging false/misleading statements. Separate Flex lawsuit over $48M in tax distributions. Both introduce unquantified legal liabilities.",
  },
];

export const timeline = [
  { year: "2014", event: "Solaria spins off tracker tech; Nextracker founded (Dan Shugar CEO)" },
  { year: "2015", event: "Flextronics acquires Nextracker for $330M" },
  { year: "2016", event: "Acquires BrightBox Technologies (predictive ML software)" },
  { year: "2017", event: "Launches TrueCapture energy yield management system" },
  { year: "2018", event: "First utility-scale project in Saudi Arabia (Sakaka, 405 MW)" },
  { year: "2022", event: "Announces intention to separate from Flex; begins US mfg buildout" },
  { year: "Feb 2023", event: "IPO on Nasdaq — largest US IPO of the year ($638M raised)" },
  { year: "Jan 2024", event: "Completes full separation from Flex" },
  { year: "FY2025", event: "Record $2.96B revenue (+18%), $622M FCF, zero debt; acquires Bentek" },
  { year: "Sep 2025", event: "Acquires Origami Solar (module frames, $53M)" },
  { year: "Oct 2025", event: "Abunayyan JV announced (Nextracker Arabia) for Saudi/MENA" },
  { year: "Nov 2025", event: "Rebrands to Nextpower; announces PCS; FY2030 targets ($4.8–5.6B)" },
  { year: "Jan 2026", event: "Arabia JV completed; Jeddah facility; Fitch BBB-; $500M buyback; Q3 revenue $909M (+34%)" },
];

export const demandDrivers = [
  { driver: "AI / data centre electricity demand", detail: "IEA projects US data centres will consume more electricity than the country's entire energy-intensive manufacturing sector by 2030." },
  { driver: "IRA incentives & domestic content", detail: "Section 45X credits and domestic content bonus are powerful demand accelerants for US utility-scale solar." },
  { driver: "Saudi Vision 2030 / MENA transition", detail: "National Renewable Energy Program targeting 130 GW by 2030. Nextpower Arabia JV positioned for this buildout." },
  { driver: "India solar buildout", detail: "Top-three global tracker market. India + Saudi Arabia drove 28 GW of tracker demand in 2024." },
  { driver: "Corporate PPA demand", detail: "Hyperscaler and industrial corporate power purchase agreements driving utility-scale solar deployment." },
  { driver: "Coal and gas retirements", detail: "Grid capacity needs as legacy thermal plants retire, creating replacement demand for renewables." },
];

export const keyQuestions = [
  { q: "IRA durability", detail: "What is the realistic political/legislative risk to 45X credits under different election scenarios? How much of the current margin structure depends on these credits?" },
  { q: "PCS market entry", detail: "Competing directly with established inverter companies (SMA, Sungrow, Huawei). What is the technology source? Can Nextpower replicate tracker success in a market with aggressive Chinese price competition?" },
  { q: "Platform execution risk", detail: "Moving from single-product to multi-product platform is strategically sound but operationally complex. Can management maintain execution across 5+ product lines? What are actual vs theoretical cross-selling synergies?" },
  { q: "Chinese competition", detail: "Trina Tracker and Arctech gaining share globally. How defensible is Nextpower's position outside the US, where IRA advantages don't apply?" },
  { q: "Class action litigation", detail: "What are the specific allegations, and what is the realistic range of financial exposure?" },
  { q: "Backlog quality", detail: "The $4.5B+ backlog provides visibility, but what are cancellation provisions? In a tariff or policy shock, how firm is this backlog?" },
];
