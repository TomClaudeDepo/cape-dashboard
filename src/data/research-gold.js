// Gold Thematic Research Data — March 2026

export const goldSnapshot = {
  asset: "Gold (XAU/USD)",
  price: "$4,569",
  ath: "$5,595",
  drawdown: "−24%",
  centralBankBuying: "4,088t (2022–25)",
  etfAUM: "$701B",
  rallyReturn: "+205% (2023–26)",
};

export const heroStats = [
  { value: "$5,595", label: "All-time high (Jan 29 '26)", color: "orange" },
  { value: "205%", label: "Rally from 2023 low", color: "green" },
  { value: "4,088t", label: "Central bank buying (2022–25)", color: "deepBlue" },
  { value: "$89B", label: "ETF inflows in 2025", color: "green" },
  { value: "1,374t", label: "Bar & coin demand (12yr high)", color: "orange" },
  { value: "24%", label: "March 2026 drawdown", color: "capRed" },
];

export const rallyPhases = [
  {
    num: "01", title: "Foundation — 2023",
    tag: "+13.7%", color: "deepBlue",
    range: "$1,830 → $2,063",
    desc: "The March banking crisis (SVB, Signature, Credit Suisse) and the October 7 Hamas attack laid the geopolitical and financial-stability groundwork. The December Fed pivot — projecting three 2024 rate cuts — propelled gold to $2,135. Central banks purchased over 1,050 tonnes for the second consecutive year.",
    metrics: [
      { value: "$2,135", label: "Year-end high" },
      { value: "1,050t", label: "Central bank buying" },
      { value: "3 cuts", label: "Fed dot-plot projection" },
      { value: "$2,080", label: "May interim high" },
    ],
  },
  {
    num: "02", title: "Rate-cut rally — 2024",
    tag: "+27%", color: "green",
    range: "$2,063 → $2,624",
    desc: "Rate-cut anticipation drove gold through $2,200 in March and $2,400 in April. The Fed's 50-basis-point cut in September — the first easing since 2020 — was the decisive inflection, propelling gold past $2,600. Escalating Middle East conflict and pre-election uncertainty pushed gold to $2,790 on October 30. The Fed delivered 100 basis points of cuts across three meetings.",
    metrics: [
      { value: "$2,790", label: "October 30 peak" },
      { value: "100bps", label: "Total Fed cuts" },
      { value: "1,092t", label: "Central bank buying" },
      { value: "~20%", label: "Gold share of CB reserves" },
    ],
  },
  {
    num: "03", title: "Parabolic advance — 2025",
    tag: "+55–67%", color: "orange",
    range: "$2,624 → $4,550",
    desc: "Trump's tariff escalation transformed the rally into a parabolic advance. The April 2 'reciprocal tariffs' triggered a $5 trillion equity wipeout. Gold broke $3,000 on March 14, hit $3,500 on April 22, and surged to $4,550 by year-end during a 43-day government shutdown. Gold set 53 all-time highs in 2025 alone. Total demand exceeded 5,000 tonnes for the first time in history.",
    metrics: [
      { value: "53", label: "All-time highs in 2025" },
      { value: "5,000t+", label: "Total demand (first ever)" },
      { value: "$555B", label: "Demand value" },
      { value: "3.50%", label: "Year-end Fed rate" },
    ],
  },
  {
    num: "04", title: "Melt-up & crash — Early 2026",
    tag: "Peak & −24%", color: "capRed",
    range: "$4,550 → $5,595 → $4,250",
    desc: "The final melt-up was driven by the 'debasement trade' narrative, the PBOC's 15th consecutive month of gold purchases, and dovish Fed Chair expectations. Gold broke $5,000 on January 25 and hit $5,595 on January 29. Trump's nomination of hawk Kevin Warsh triggered a 16% single-day crash. The Iran strike and Strait of Hormuz closure then ground gold down to $4,250 by March 23.",
    metrics: [
      { value: "$5,595", label: "All-time high (Jan 29)" },
      { value: "−16%", label: "Warsh Shock (single day)" },
      { value: "$126/bbl", label: "Brent crude on Hormuz" },
      { value: "$4,250", label: "March 23 trough" },
    ],
  },
];

export const demandDecomposition = {
  title: "Demand structure has fundamentally shifted",
  subtitle: "Investment demand surged from ~21% of total in 2023 to ~43% in 2025, while jewelry fell from ~47% to ~31%.",
  categories: [
    { label: "Central bank buying", share: "35–40%", sticky: "Very high", description: "Over 4,000 tonnes at 2x the prior decade's pace. Driven by de-dollarisation and sanctions risk — geopolitical and secular forces, not cyclical." },
    { label: "ETF inflows", share: "25–30%", sticky: "Medium", description: "Turned from a major headwind (−244t in 2023) to a record tailwind (+801t in 2025). Semi-sticky: institutional allocators move slowly but can liquidate quickly." },
    { label: "Physical bar & coin", share: "~20%", sticky: "High", description: "Reached a 12-year high at 1,374 tonnes in 2025. Retail and high-net-worth demand that typically buys dips rather than sells." },
    { label: "Speculative / momentum", share: "10–15%", sticky: "Low", description: "Amplified the final phase ($4,550→$5,595) but was a diminishing share throughout the cycle. Managed money net longs actually fell as prices doubled." },
  ],
};

export const centralBankTable = [
  { year: "2022", purchases: "1,082", buyers: "Turkey, China, Egypt", reserveShare: "~15%" },
  { year: "2023", purchases: "1,051", buyers: "China (225t), Poland (130t)", reserveShare: "~17%" },
  { year: "2024", purchases: "1,092", buyers: "Poland (90t), Turkey (75t), India (73t)", reserveShare: "~20%" },
  { year: "2025", purchases: "863", buyers: "Poland (102t), Kazakhstan (57t), Brazil (43t)", reserveShare: "~28%" },
];

export const etfFlowsTable = [
  { year: "2023", flows: "−$15B", demand: "−244t", holdings: "3,225t", aum: "$214B" },
  { year: "2024", flows: "+$3.4B", demand: "~flat", holdings: "3,219t", aum: "$271B" },
  { year: "2025", flows: "+$89B", demand: "+801t", holdings: "4,025t", aum: "$559B" },
  { year: "Jan–Feb '26", flows: "+$24.3B", demand: "+146t", holdings: "4,171t", aum: "$701B" },
];

export const specPositioningTable = [
  { date: "Sept 2024", longs: 793, price: 2600, note: "Spec positioning peak" },
  { date: "Dec 2024", longs: 565, price: 2624, note: "Post-election unwind" },
  { date: "Sept 2025", longs: 493, price: 3950, note: "Below 2024 peak despite 52% higher price" },
  { date: "Dec 2025", longs: 395, price: 4550, note: "30% below Dec 2024" },
  { date: "Feb 2026", longs: 311, price: 5050, note: "Structural demand dominates" },
];

export const drawdownTimeline = [
  { date: "Jan 29", event: "All-time high", price: "$5,595", detail: "Parabolic peak on debasement-trade narrative and PBOC buying" },
  { date: "Jan 30", event: "Warsh Shock", price: "−16%", detail: "Trump nominates monetary hawk Kevin Warsh as Fed Chair; worst session since 1980" },
  { date: "Feb 6", event: "CME margin hike ×2", price: "—", detail: "Margins raised from 6% → 8% → 9%; collateral up 50% in two weeks" },
  { date: "Late Feb", event: "Partial recovery", price: "$5,200", detail: "Bounce on dip-buying and physical demand" },
  { date: "Feb 28", event: "Iran strike", price: "+5% spike", detail: "US-Israeli strike on Iran; Strait of Hormuz closure March 2" },
  { date: "Mar 18", event: "Fed holds hawkish", price: "Below $5,000", detail: "Dot plot: 1 cut in 2026. PCE forecast raised to 2.7%. Zero probability of 2026 cuts priced" },
  { date: "Mar 23", event: "Trough", price: "$4,250", detail: "Largest single-week decline since 1983. Nine-day losing streak" },
  { date: "Mar 25", event: "Recovery begins", price: "$4,569", detail: "Trump pauses strikes on Iran; gold snaps losing streak" },
];

export const drawdownComparison = [
  { metric: "Peak-to-trough", mar2020: "~12%", gfc2008: "~25–30%", mar2026: "~24%" },
  { metric: "Duration", mar2020: "~10 days", gfc2008: "~7 months", mar2026: "~53 days" },
  { metric: "Primary driver", mar2020: "Liquidity / margin", gfc2008: "Liquidity / margin", mar2026: "Margin + dollar + yields" },
  { metric: "Dollar behaviour", mar2020: "Surged", gfc2008: "Surged", mar2026: "Surged" },
  { metric: "Physical premiums", mar2020: "Elevated", gfc2008: "Elevated", mar2026: "Elevated" },
  { metric: "Recovery", mar2020: "+40% in 5mo", gfc2008: "+165% in 3yr", mar2026: "TBD" },
];

export const physicalPaperDivergence = [
  { market: "American Gold Eagle", metric: "Premiums $147–$177 above spot" },
  { market: "Shanghai Gold Exchange", metric: "Physical premium $30–$35/oz above international" },
  { market: "COMEX delivery ratios", metric: "Silver delivery-to-inventory at 61%" },
  { market: "India physical gold", metric: "$65/oz discount — $100/oz spread vs Shanghai" },
];

export const centralBankRegimeShift = {
  title: "Central bank buying: a regime shift, not a cycle",
  keyFacts: [
    { value: "$300B", label: "Russian reserves frozen in 2022 — the catalytic event" },
    { value: "57% → ~57%", label: "USD share of global reserves (down from ~70% in 2000)" },
    { value: "95%", label: "Central bankers expecting gold reserves to increase" },
    { value: "57%", label: "Of 2025 buying unreported to the IMF" },
    { value: "0%", label: "Central bankers expecting to reduce gold holdings" },
    { value: "~800t", label: "J.P. Morgan's 2026 central bank buying forecast" },
  ],
  targets: [
    { country: "Poland", target: "700 tonnes", timeline: "Announced Jan 2026" },
    { country: "Czech Republic", target: "100 tonnes", timeline: "By 2028" },
    { country: "Serbia", target: "100 tonnes", timeline: "By 2030" },
  ],
  paragraphs: [
    "The freezing of approximately $300 billion in Russian central bank assets in 2022 was the catalytic event — demonstrating that foreign-held reserves carry confiscation risk. This drove a permanent reassessment of reserve allocation across emerging markets.",
    "The USD share of global reserves has fallen from roughly 70% in 2000 to approximately 57% in 2025. Countries are setting multi-year gold targets — Poland (700 tonnes), Czech Republic (100 tonnes by 2028), Serbia (100 tonnes by 2030) — that constitute institutional frameworks, not tactical trades.",
    "The 2025 slowdown to 863 tonnes (from 1,092 in 2024) demonstrates that central banks are price-sensitive at the margin but not in direction — they modulate the pace of accumulation rather than reversing it. Even the March 2026 disruption, which forced Turkey to sell roughly 60 tonnes to defend the lira, is a stress-induced deviation rather than a trend change.",
    "China was the dominant force, reporting 225 tonnes of purchases in 2023. Reported buying slowed to 44 tonnes in 2024 and 27 tonnes in 2025, but multiple analysts estimate actual accumulation at two to three times reported levels. Analyst Jan Nieuwenhuijs estimates true PBOC holdings at approximately 5,400 tonnes versus the reported 2,306 tonnes.",
  ],
};

export const drawdownMechanics = {
  title: "The March 2026 drawdown: liquidity crisis, not fundamental repricing",
  hormuzParadox: {
    title: "The Hormuz paradox: why a geopolitical crisis was bearish for gold",
    chain: [
      "Strait of Hormuz closure (20% of global oil & LNG)",
      "Brent crude surges to $126/barrel",
      "Inflation expectations spike (March CPI est. 3.4%)",
      "Fed repricing: zero 2026 cuts, 35% hike probability",
      "Real yields climb sharply",
      "US dollar surges (US is net energy exporter)",
      "Gold hammered by dollar headwind + higher yields",
    ],
    paragraphs: [
      "The Strait of Hormuz closure — affecting 20% of global oil and LNG trade — should have been unambiguously bullish for gold. Instead, it proved bearish through second-order transmission effects.",
      "The chain reaction ran: higher oil → higher inflation expectations → hawkish Fed repricing → rising real yields → surging US dollar. The United States, as a net energy exporter, benefited from high oil prices while the rest of the world suffered, creating a powerful dollar bid.",
      "Simultaneously, Gulf states including Saudi Arabia, the UAE, Kuwait, and Qatar liquidated gold reserves to fund war expenditures and shore up their currencies — adding physical supply to a market already under selling pressure.",
    ],
  },
  cmeAmplifier: {
    title: "CME margin restructure amplified the crash",
    paragraphs: [
      "The single most important mechanical driver was CME's January 13, 2026 transition from fixed-dollar to percentage-based margin requirements. This structural change meant margins now scaled automatically with price, creating a self-reinforcing feedback loop: rising prices demanded more collateral, and falling prices forced more selling.",
      "For a fund holding $1 billion in gold futures, collateral requirements surged from roughly $60 million to $90 million with zero change in positioning. The cascade was textbook: margin calls → forced liquidation → lower prices → fresh margin calls → more liquidation.",
      "COMEX open interest collapsed to levels not seen in over a decade. The massive volume of highly leveraged CTA and futures positions accumulated during the $2,600-to-$5,600 rally formed what analysts described as a 'horrific stampede of liquidations' once the macro environment reversed.",
    ],
  },
};

export const specVsPriceData = [
  { date: "Sep '24", longs: 793, price: 2600 },
  { date: "Dec '24", longs: 565, price: 2624 },
  { date: "Mar '25", longs: 530, price: 3100 },
  { date: "Jun '25", longs: 510, price: 3600 },
  { date: "Sep '25", longs: 493, price: 3950 },
  { date: "Dec '25", longs: 395, price: 4550 },
  { date: "Feb '26", longs: 311, price: 5050 },
];

export const priceChartData = [
  { date: "Jan '23", price: 1830 },
  { date: "Mar '23", price: 2000 },
  { date: "May '23", price: 2080 },
  { date: "Jul '23", price: 1960 },
  { date: "Oct '23", price: 1990 },
  { date: "Dec '23", price: 2063 },
  { date: "Mar '24", price: 2200 },
  { date: "Jun '24", price: 2400 },
  { date: "Sep '24", price: 2600 },
  { date: "Oct '24", price: 2790 },
  { date: "Dec '24", price: 2624 },
  { date: "Mar '25", price: 3100 },
  { date: "Apr '25", price: 3500 },
  { date: "Jun '25", price: 3800 },
  { date: "Sep '25", price: 3950 },
  { date: "Dec '25", price: 4550 },
  { date: "Jan 25 '26", price: 5000 },
  { date: "Jan 29 '26", price: 5595 },
  { date: "Jan 30 '26", price: 4700 },
  { date: "Feb '26", price: 5200 },
  { date: "Mar 9 '26", price: 5000 },
  { date: "Mar 18 '26", price: 4700 },
  { date: "Mar 23 '26", price: 4250 },
  { date: "Mar 30 '26", price: 4569 },
];

export const conclusion = {
  headline: "The March 2026 drawdown did not break the bull case. It stress-tested it — and the structural demand held.",
  bullets: [
    { label: "Structural floor", value: "~2,500–3,000t/yr", detail: "Combined central bank, ETF, and physical buyer demand provides a foundation that no speculative unwind can fully erode." },
    { label: "Goldman Sachs target", value: "$5,400", detail: "Year-end 2026 — conservative estimate reflecting structural demand continuation." },
    { label: "J.P. Morgan target", value: "$6,300", detail: "Year-end 2026 — bull case reflecting full regime-shift repricing." },
    { label: "Central bank intent", value: "95% expect increase", detail: "WGC 2025 survey: 43% plan to increase their own holdings; zero expect to reduce." },
  ],
  paragraphs: [
    "The 2023–2026 gold cycle marks a genuine inflection in the global monetary system, not merely another commodity bull run. The convergence of record central bank accumulation, the largest ETF inflows in history, and robust physical demand created a demand structure that is fundamentally different from prior gold rallies.",
    "Speculative positioning, far from driving the rally, actually declined as prices doubled — a feature unique to this cycle. The March 2026 drawdown, while severe at 24%, was mechanically familiar: the same liquidity-driven forced-selling pattern seen in March 2020 and 2008, amplified by CME's new percentage-based margin system.",
    "The most consequential finding is that central bank buying has decoupled from the cyclical macro framework that traditionally governed gold. The multi-year tonnage targets being set by institutions from Warsaw to Beijing represent a regime shift in reserve management — not a trade to be unwound.",
  ],
};
