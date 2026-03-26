// BKNG Research Data — extracted from structural-trends.html + BKNG_Research_Report.pdf

export const bkngSnapshot = {
  ticker: "BKNG", exchange: "NASDAQ", price: "$4,350", ytdChg: "-20.6%",
  forwardPE: "~16x", peg: "0.95", fcf: "$9.1B", fcfYield: "6.3%",
  revenue: "$26.9B", grossBookings: "$186B",
};

export const heroStats = [
  { value: "$11.7T", label: "Global travel GDP (2025)", color: "green" },
  { value: "4B+", label: "Global middle class", color: "orange" },
  { value: "76%", label: "Travel online by 2030", color: "deepBlue" },
  { value: "40M+", label: "Digital nomads", color: "capRed" },
  { value: "$76T", label: "Boomer net worth", color: "purple" },
  { value: "390M", label: "APAC passengers (2025)", color: "green" },
];

export const trendCards = [
  { id: "middle-class", num: "01", title: "Rising global middle class", tag: "+1B people by 2035", color: "orange",
    desc: "The middle class surpassed 4 billion in 2025. Two-thirds will be Asian by 2030. Travel is the first luxury purchase when crossing into the consumer class." },
  { id: "experience", num: "02", title: "Experience economy", tag: "29% of income → travel", color: "capRed",
    desc: "Millennials and Gen Z average ~5 trips/year and treat travel as identity, not indulgence. 55% will travel even while cutting other spending." },
  { id: "digital", num: "03", title: "Digital migration", tag: "72% prefer online booking", color: "deepBlue",
    desc: "Online travel heading to $1T+ by 2030. Mobile is 61% of accommodation bookings and accelerating in emerging markets." },
  { id: "remote", num: "04", title: "Remote work revolution", tag: "40M+ digital nomads", color: "green",
    desc: "153% growth since 2019. Extended stays of 5.7 weeks per location feed demand for alternative accommodations." },
  { id: "boomers", num: "05", title: "Silver tsunami", tag: "$6,800 per trip average", color: "purple",
    desc: "80% of luxury travel spending. 84% book online. Europe is #1 destination — Booking's stronghold." },
  { id: "apac", num: "06", title: "APAC aviation boom", tag: "19,560 new aircraft by 2044", color: "green",
    desc: "390M APAC passengers in 2025 (+9.4%). India has 0.1 air trips per capita vs 2.1 in the US." },
];

export const trendSections = [
  {
    id: "middle-class", num: "01", title: "The rising global middle class",
    lead: "The single most powerful structural tailwind for travel demand. Over 100 million people join the consumer class every year — and travel is the first 'luxury' they reach for.",
    metrics: [
      { value: "4.4B", label: "Global middle class (2025)" },
      { value: "106M", label: "New entrants per year" },
      { value: "$62T", label: "Spending by 2030" },
      { value: "700M+", label: "China's middle class" },
    ],
    paragraphs: [
      "The World Economic Forum reports that the global middle and rich classes now total 4.4 billion people, outnumbering the 3.6 billion poor for the first time in human history. They collectively spend over $60 trillion annually. In 2025 alone, 106 million individuals are projected to join the consumer class.",
      "The geographic concentration is critical for Booking. China's middle class exceeds 700 million. India's will add another 17.8% to close in on half a billion. An Expedia survey found that 39% of mass-affluent Asian travelers would prioritize travel over purchasing a new car or upgrading electronics.",
      "The travel connection is direct: when people cross from poverty into the consumer class, one of the first expenditures they make is air travel. Colombia's El Dorado Airport saw flights double from 24.5 million in 2009 to 56.5 million in 2024 — a pattern repeating across emerging economies.",
    ],
    pullQuote: "By 2030, middle-class households are expected to spend $62 trillion — roughly 50% more than in 2020. Two in three middle-class members will be Asian.",
    capture: {
      title: "How Booking captures this trend",
      points: [
        "Dual-brand Asia strategy: Booking.com for international travelers, plus Agoda as a locally-tuned platform with deep Asian inventory, local payment methods, and language support.",
        "Merchant revenue model (66% of total, +26% YoY): processes payments directly, offering WeChat Pay, UPI, GrabPay — removing friction for first-time digital travelers.",
        "Connected Trip: bundles flights + hotels + attractions into a single transaction. 68 million airline tickets booked in FY2025 (+37%).",
      ],
    },
  },
  {
    id: "experience", num: "02", title: "The experience economy",
    lead: "Travel has fundamentally shifted from a yearly vacation into a lifestyle constant. For younger generations, it's identity — not indulgence — and it's remarkably recession-resistant.",
    metrics: [
      { value: "~5", label: "Trips/year for Gen Z & Millennials" },
      { value: "29%", label: "Of income allocated to travel" },
      { value: "55%", label: "Will travel while cutting other spend" },
      { value: "76%", label: "Millennials likely to use AI for travel" },
    ],
    paragraphs: [
      "McKinsey reports that Millennials and Gen Z travel more frequently than older cohorts, averaging close to five trips per year compared to fewer than four among Gen X and Baby Boomers. They allocate approximately 29% of their income to travel.",
      "The behavior is fundamentally different from previous generations. Travel is no longer a single, fixed event requiring long-term planning. It's approached as a continuous process where searching, booking, and changing plans are all parts of one ongoing cycle.",
      "Gen Z was the only consumer segment that spent more on travel year-over-year, averaging more than $11,000 per trip in 2024. Their global spending is projected to surge from $2.7 trillion in 2024 to $12.6 trillion by 2030.",
    ],
    pullQuote: "'Gig-tripping' — planning travel around concerts, festivals, and sporting events — is creating entirely new booking occasions that didn't exist a decade ago.",
    capture: {
      title: "How Booking captures this trend",
      points: [
        "Connected Trip bundles flights + hotels + experiences in one transaction — purpose-built for event-driven travel and gig-tripping.",
        "AI Trip Planner rolled out across 10+ countries. 76% of millennials say they are likely to use AI agent tools for travel.",
        "Genius loyalty program drives repeat bookings with instant savings and upgrades. Particularly resonant with price-aware young travelers.",
      ],
    },
  },
  {
    id: "digital", num: "03", title: "The digital migration of travel booking",
    lead: "The shift from offline to online is far from complete — especially in emerging markets where walk-in and phone reservations still dominate. Online travel is heading to $1 trillion+ by 2030.",
    metrics: [
      { value: "$654B", label: "Online travel market (2024)" },
      { value: "$1T+", label: "Projected by 2030" },
      { value: "61%", label: "Mobile share of bookings" },
      { value: "560M", label: "Monthly visits to Booking.com" },
    ],
    paragraphs: [
      "The worldwide online travel industry reached an estimated $654 billion in 2024 and is forecast to exceed $1 trillion by 2030. Online channels will generate 76% of total travel revenue by 2030.",
      "Mobile applications held 61% of the online accommodation booking market in 2025 and are advancing at a 13% CAGR through 2030. Travel apps generated $629 billion in revenue — a 13% increase year-over-year.",
      "Booking.com is consistently among the most-downloaded travel apps globally with ~560 million monthly visits. Its mid-60% direct channel booking mix is a critical cost advantage that widens as mobile usage grows.",
    ],
    pullQuote: "In many emerging markets, the transition is from walk-in and phone reservations directly to mobile apps, skipping desktop entirely.",
    capture: {
      title: "How Booking captures this trend",
      points: [
        "~560M monthly visits and mid-60% direct channel mix (unpaid traffic). Every direct booking avoids performance marketing spend.",
        "Mobile-first platform with local payment integrations in 220+ countries.",
        "AI-powered personalization, dynamic pricing, and instant confirmation drive conversion.",
      ],
    },
  },
  {
    id: "remote", num: "04", title: "The remote work revolution",
    lead: "A genuinely new demand category that didn't meaningfully exist before 2020. Digital nomadism has gone from niche experiment to 12% of the US workforce — and it's still growing.",
    metrics: [
      { value: "40-60M", label: "Digital nomads worldwide" },
      { value: "153%", label: "Growth since 2019" },
      { value: "5.7 wks", label: "Avg stay per location" },
      { value: "64+", label: "Countries with nomad visas" },
    ],
    paragraphs: [
      "The number of US digital nomads has increased from 7.3 million in 2019 to 18.1 million in 2025 — a 148% increase. Globally, estimates put the count at 40-60 million.",
      "What makes this relevant for Booking is the type of travel generated. Nomads visited an average of 6.6 locations in 2024, spending 5.7 weeks per location. That's extended-stay travel requiring long-duration accommodations.",
      "The trend is being institutionalized: 64+ countries offer digital nomad visas, companies are adopting nomad-friendly policies, and Gen Z is entering the workforce expecting location independence.",
    ],
    pullQuote: "Every corporate trip is a potential additional OTA booking — 'bleisure' travel (extending business trips) is the new norm.",
    capture: {
      title: "How Booking captures this trend",
      points: [
        "8.6 million alternative accommodation listings — apartments, villas, unique stays — representing 36% of total room nights and growing at ~16% CAGR.",
        "While Airbnb has ~7M unique listings, Booking's utilization is materially higher — 114 million alternative lodging nights in Q2 2025 alone.",
        "Booking dominates European alternative accommodations with 48% market share.",
      ],
    },
  },
  {
    id: "boomers", num: "05", title: "The silver tsunami",
    lead: "Baby boomers are the highest-value travelers in the entire ecosystem. They book the expensive rooms, stay the longest, and travel with the deepest pockets. This wave has 10-15 more years of peak spending ahead.",
    metrics: [
      { value: "$157B", label: "Annual US boomer travel spend" },
      { value: "$6,800", label: "Average per-trip spend" },
      { value: "80%", label: "Of luxury travel spending" },
      { value: "10.5d", label: "Average trip length" },
    ],
    paragraphs: [
      "Baby boomers spend $157 billion annually on travel in the US alone. They make up nearly a third of all leisure travelers, spending $6,600-$6,800 per trip — that's 20-50% more than Gen X or millennials.",
      "The accommodation premium is striking: boomers spend over double what millennials do on hotels ($1,540 vs. $675 per trip). They travel 27 days per year on average, with trips lasting 10.5 days. Europe is their #1 international destination.",
      "The digital-averse stereotype is outdated: 84% use online services to book travel. 74% prefer to bundle reservations (Connected Trip), 79% comparison-shop for deals (OTA transparency), and 66% prefer hotels for international travel.",
    ],
    pullQuote: "Baby boomers hold a record $76 trillion in net worth. Their travel budgets are structurally insulated from rate hikes and recessions.",
    capture: {
      title: "How Booking captures this trend",
      points: [
        "Europe — boomers' #1 destination (41% of international trips) — is Booking.com's absolute stronghold.",
        "Genius loyalty program aligns with boomers' value orientation (95% want the best deal before booking).",
        "Multigenerational trips drive high-value, multi-room bookings — often in alternative accommodations like villas.",
      ],
    },
    expandables: [
      { title: "Why boomer travel is recession-resistant", tag: "Key insight",
        content: "Boomers are structurally insulated from economic pressures. Most have locked in mortgage rates or paid off homes entirely. They carry less consumer debt than any other generation. Ed Yardeni: 'The baby boom generation has started to retire with a record $76 trillion in net worth.' The youngest boomers are only 61-62 — this wave has 10-15 years of peak travel spending ahead." },
      { title: "The multigenerational multiplier", tag: "Growth vector",
        content: "Boomers increasingly fund and organize multigenerational trips — villas in Tuscany for the whole family. These are high-value, multi-room bookings, longer, more expensive, and involving multiple service categories. 81% travel with a spouse/partner, and 'skip-generation' trips (grandparents + grandchildren) are a fast-growing sub-category." },
    ],
  },
  {
    id: "apac", num: "06", title: "The Asia-Pacific aviation boom",
    lead: "The single biggest geographic growth story in global travel — and arguably the most underappreciated part of the Booking thesis for Western investors.",
    metrics: [
      { value: "390M", label: "APAC passengers 2025 (+9.4%)" },
      { value: "7.9%", label: "Growth rate — highest globally" },
      { value: "19,560", label: "New aircraft needed by 2044" },
      { value: "$161B", label: "APAC aviation market by 2030" },
    ],
    paragraphs: [
      "Asia-Pacific carriers carried 390 million passengers in 2025, up 9.4%. Demand rose 11% by revenue passenger kilometers, and load factors hit a record 82.2%. IATA forecasts APAC growth at 7.9% — the highest globally.",
      "The penetration gap tells the real story. India: 0.1 yearly air trips per capita vs China's 0.5 and the US's 2.1. Even by 2043, India reaches only 0.4.",
      "Airbus forecasts 19,560 new aircraft deliveries in APAC over 20 years — 46% of global demand. Southeast Asian markets are structurally shifting from rail/bus to air.",
    ],
    pullQuote: "India has 20x the US runway for air travel penetration — and it won't catch up for decades.",
    capture: {
      title: "How Booking captures this trend",
      points: [
        "Agoda — fully-owned, Singapore-headquartered subsidiary — is the primary growth weapon in APAC with deep local inventory.",
        "Merchant revenue with UPI integration removes the credit card barrier in India.",
        "Every new budget route in Southeast Asia creates accommodation demand at the destination.",
      ],
    },
    expandables: [
      { title: "China: 810M passenger target for 2026", tag: "Recovery",
        content: "Chinese domestic capacity is now 14% above 2019 levels. The fleet has grown to 4,394 transport aircraft linking 263 cities in 90 countries. Outbound recovery is where the real upside lies: traffic to Latin America surged 109%, Africa +39%. Trip.com faces an anti-monopoly investigation, creating a window for Booking/Agoda." },
      { title: "India: 0.1 trips per capita — 20x the US runway", tag: "Explosive",
        content: "India operates 159 airports with 50 more planned. Airlines have ordered 1,700+ new planes. Growth rate will hit 10.5% in 2026. Even after two decades of growth, India in 2043 will still be at less than one-fifth of current US levels." },
      { title: "Southeast Asia: the low-cost carrier revolution", tag: "Structural shift",
        content: "Vietnam, Indonesia, Philippines are shifting from rail/bus/ferry to air travel on domestic and short-haul routes. Low-cost carriers (AirAsia, VietJet, Lion Air) have democratized flying for hundreds of millions of first-time passengers. Agoda has deep local inventory with GrabPay, GoPay integration." },
    ],
  },
];

export const generationalTabs = [
  { key: "gz", label: "Gen Z", title: "Gen Z travelers (18-28)", color: "capRed",
    intent: "55% plan to travel during holidays. 45% say 'now is a good time to spend on leisure travel' — 12 points above non-Gen Z. The only generation increasing travel spend YoY, averaging $11,000+ per trip in 2024.",
    behavior: "Plans anchored around events ('gig-tripping'). Over 42% use TikTok to plan trips. 52% splurge on experiences. Heavy reliance on mobile apps — digital-native from day one.",
    significance: "Gen Z's global spending will reach $12.6T by 2030. As earning power grows, already-high travel frequency compounds with larger budgets. AI Trip Planner adoption rates are highest in this cohort." },
  { key: "ml", label: "Millennials", title: "Millennial travelers (29-44)", color: "orange",
    intent: "55% plan travel even while cutting discretionary spending. Pioneered the experience economy — prioritizing moments over possessions. Will account for one-third of global social media shopping spend in 2025.",
    behavior: "Average ~5 trips/year. 47% splurge on experiences. 76% likely to use AI agent tools for travel. Most influenced by social media and peer content for destination selection.",
    significance: "Now in peak earning years. As they start families, multigenerational trips expand booking size. Already the core volume engine for OTAs." },
  { key: "gx", label: "Gen X", title: "Gen X travelers (45-60)", color: "deepBlue",
    intent: "39% plan to travel during holidays. Spending flat YoY — the 'steady state' generation. Balancing career peak with family responsibilities.",
    behavior: "60% opt for all-inclusive family resorts. Increasingly blending work with leisure ('bleisure'). Budget-conscious but willing to pay for convenience.",
    significance: "Family travel creates high-value multi-room bookings. Serves as the 'connector' generation organizing multigenerational trips for both parents and children." },
  { key: "bm", label: "Boomers", title: "Baby Boomer travelers (61-79)", color: "purple",
    intent: "41% cite travel as their #1 splurge category — the highest of any generation. 44% plan to increase vacation spending. 56% willing to pay extra for luxury.",
    behavior: "$6,800/trip average — 70% more than millennials. 10.5 day average trips. 80% of all luxury travel spending. 27 days per year traveling. 84% book online. Europe #1 destination.",
    significance: "The highest per-transaction revenue of any generation. Structurally insulated from rate hikes ($76T net worth). 10-15 more years of peak travel ahead. Europe — their preferred destination — is Booking's stronghold." },
];

export const convergenceTable = [
  { trend: "Rising middle class", color: "orange", mechanism: "Merchant revenue + local payments in 220+ countries", metric: "Merchant rev. 66%, +26% YoY" },
  { trend: "Experience economy", color: "capRed", mechanism: "Connected Trip (flights + hotels + experiences)", metric: "68M tickets (+37%), attractions +80%" },
  { trend: "Digital migration", color: "deepBlue", mechanism: "Mobile-first app, AI Trip Planner in 10+ countries", metric: "Mid-60% direct channel mix" },
  { trend: "Remote work era", color: "green", mechanism: "8.6M alternative accommodation listings", metric: "36% of room nights, +8% listings" },
  { trend: "Silver tsunami", color: "purple", mechanism: "Genius loyalty, premium hotels, Europe dominance", metric: "Europe = #1 boomer destination" },
  { trend: "APAC aviation", color: "green", mechanism: "Agoda + localized Connected Trip expansion", metric: "Low double-digit APAC room growth" },
];

export const digitalPenetration = [
  { region: "North America", pct: 74, color: "deepBlue" },
  { region: "Europe", pct: 69, color: "deepBlue" },
  { region: "Asia-Pacific", pct: 55, color: "green" },
  { region: "Latin America", pct: 38, color: "orange" },
  { region: "Middle East & Africa", pct: 25, color: "capRed" },
];

export const onlineTravelMarket = [
  { year: "2020", value: 368 }, { year: "2021", value: 420 }, { year: "2022", value: 475 },
  { year: "2023", value: 513 }, { year: "2024", value: 654 }, { year: "2025E", value: 720 },
  { year: "2026E", value: 800 }, { year: "2027E", value: 870 }, { year: "2028E", value: 940 },
  { year: "2029E", value: 1010 }, { year: "2030E", value: 1100 },
];

export const digitalSubmarkets = [
  { name: "Online travel (global)", size2024: "$654B", target2030: "$1T+", cagr: "~10%", driver: "Digital adoption in emerging markets" },
  { name: "Online accommodation", size2024: "$341B", target2030: "$459B", cagr: "~6%", driver: "AI personalization, mobile-first UX" },
  { name: "Mobile travel booking", size2024: "$228B", target2030: "$526B", cagr: "~11%", driver: "Smartphone penetration, mobile wallets" },
  { name: "Alt. accommodations", size2024: "—", target2030: "—", cagr: "~16%", driver: "Experience-seeking guests, unique stays" },
  { name: "APAC online accommodation", size2024: "—", target2030: "—", cagr: "~13%", driver: "Rising incomes, LCC expansion, mobile pay" },
];

export const chartData = {
  middleClass: {
    labels: ["2020", "2022", "2024", "2025", "2027E", "2030E", "2035E"],
    values: [3.6, 3.9, 4.2, 4.4, 4.7, 5.1, 5.7],
    projected: [false, false, false, false, true, true, true],
  },
  middleClassSpending: {
    labels: ["2020", "2025E", "2030E"],
    series: [
      { label: "Lower middle", values: [20, 26, 33] },
      { label: "Upper middle", values: [16, 20, 24] },
      { label: "Rich", values: [8, 9, 10] },
    ],
  },
  digitalNomads: {
    labels: ["2019", "2020", "2021", "2022", "2023", "2024", "2025"],
    values: [7.3, 10.9, 15.5, 16.9, 17.3, 18.1, 18.1],
  },
  generationalSpend: {
    labels: ["Baby Boomers", "Gen X", "Millennials", "Gen Z"],
    perTrip: [6800, 5200, 4000, 3781],
    accommodation: [1540, 1100, 675, 700],
  },
  airTripsPerCapita: [
    { label: "India (2023)", value: 0.1 },
    { label: "Indonesia", value: 0.15 },
    { label: "China", value: 0.5 },
    { label: "Europe avg", value: 1.3 },
    { label: "USA", value: 2.1 },
    { label: "India (2043E)", value: 0.4, projected: true },
  ],
  bkngRevenue: {
    labels: ["FY2021", "FY2022", "FY2023", "FY2024", "FY2025", "FY2026E"],
    values: [11.0, 17.1, 21.4, 23.7, 26.9, 30.5],
    projected: [false, false, false, false, false, true],
  },
};

export const brandPortfolio = [
  { brand: "Booking.com", desc: "Flagship OTA. ~560M monthly visits. 29M+ listings across 220+ countries in 40+ languages. Where Connected Trip, Genius loyalty, and AI Trip Planner live.", geo: "Global", revPct: "~85-90%" },
  { brand: "Agoda", desc: "Asia-Pacific focused OTA. Locally-tuned platform with deep Asian inventory, regional payment methods (GrabPay, GoPay).", geo: "Asia-Pacific", revPct: "~5-8%" },
  { brand: "Priceline", desc: "North American discount travel platform. Value-conscious positioning with AI assistant 'Penny'.", geo: "North America", revPct: "~3-5%" },
  { brand: "KAYAK", desc: "Meta-search engine comparing prices across hundreds of platforms. Also owns Cheapflights, Momondo, HotelsCombined.", geo: "Global", revPct: "~2-3%" },
  { brand: "OpenTable", desc: "Restaurant reservation platform powering 55,000+ restaurants globally. Fits into Connected Trip.", geo: "Global (US focus)", revPct: "~1-2%" },
];

export const revenueBreakdown = [
  { stream: "Merchant Revenue", amount: "$17.8B", pct: 66, growth: "+26% YoY", desc: "Booking collects payment directly from traveler. Controls payment flow, richer data, enables bundling." },
  { stream: "Agency Revenue", amount: "$8.0B", pct: 30, growth: "-7% YoY", desc: "Traditional commission model. Traveler pays hotel directly. Declining by design as properties migrate to merchant." },
  { stream: "Advertising & Other", amount: "$1.2B", pct: 4, growth: "+11% YoY", desc: "KAYAK meta-search ads, OpenTable fees, and partner advertising products." },
];

export const financials5Y = [
  { year: "FY2021", revenue: 11.0, growth: null, ebitda: 2.9, ebitdaMargin: 26.4, fcf: null, fcfMargin: null },
  { year: "FY2022", revenue: 17.1, growth: 55, ebitda: 5.3, ebitdaMargin: 31.0, fcf: null, fcfMargin: null },
  { year: "FY2023", revenue: 21.4, growth: 25, ebitda: 7.1, ebitdaMargin: 33.2, fcf: null, fcfMargin: null },
  { year: "FY2024", revenue: 23.7, growth: 11, ebitda: 8.4, ebitdaMargin: 35.4, fcf: 7.9, fcfMargin: 33.3 },
  { year: "FY2025", revenue: 26.9, growth: 13, ebitda: 9.9, ebitdaMargin: 36.9, fcf: 9.1, fcfMargin: 33.8 },
];
