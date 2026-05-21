// TMO — Sector Brief data
// Single-page meeting briefing on why the name has been broken, the
// bioprocessing setup, the 4-player share map, the BLA-stickiness moat,
// and the catalysts.
// Compiled from sell-side notes (MS bioprocessing tools podcast),
// internal analyst takes (20 May 2026), TMO/peer Q1 reads.

// ─── HEADLINE FACTS ───
export const facts = [
  {
    num: "01",
    headline: "We've been waiting 4 years for destocking to end.",
    one: "Tools sector compressed through a multi-year destocking cycle post-COVID. Multiples compounded down with it.",
    stat: "−45%",
    statSub: "P/E NTM compression FY21 peak → today",
  },
  {
    num: "02",
    headline: "Tools sat out the AI capex cycle.",
    one: "Investor capital opportunity-cost: building AI infra paid in 2023–25; tools and healthcare didn't. The cohort is structurally under-owned.",
    stat: "15-yr low",
    statSub: "Tools P/E relative to S&P 500",
  },
];

// ─── PRICE × P/E (NTM) TIME SERIES ───
// Quarterly close + NTM forward P/E. Representative end-of-quarter
// values constructed from historical Bloomberg consensus + price feeds.
export const pricePeSeries = [
  { q: "Q1'21", price: 456, pe: 28 },
  { q: "Q2'21", price: 505, pe: 30 },
  { q: "Q3'21", price: 595, pe: 31 },
  { q: "Q4'21", price: 667, pe: 31 },
  { q: "Q1'22", price: 590, pe: 28 },
  { q: "Q2'22", price: 543, pe: 24 },
  { q: "Q3'22", price: 510, pe: 22 },
  { q: "Q4'22", price: 551, pe: 24 },
  { q: "Q1'23", price: 575, pe: 24 },
  { q: "Q2'23", price: 521, pe: 22 },
  { q: "Q3'23", price: 506, pe: 21 },
  { q: "Q4'23", price: 530, pe: 22 },
  { q: "Q1'24", price: 579, pe: 22 },
  { q: "Q2'24", price: 552, pe: 20 },
  { q: "Q3'24", price: 619, pe: 22 },
  { q: "Q4'24", price: 522, pe: 20 },
  { q: "Q1'25", price: 501, pe: 19 },
  { q: "Q2'25", price: 447, pe: 17 },
  { q: "Q3'25", price: 482, pe: 18 },
  { q: "Q4'25", price: 455, pe: 17 },
  { q: "Q1'26", price: 441, pe: 17 },
  { q: "Today",  price: 438, pe: 17.6 },
];

// Key annotations on the chart
export const chartAnnotations = [
  { q: "Q4'21", label: "FY21 peak — 31x P/E", color: "#EF4444" },
  { q: "Q3'24", label: "False bounce — destock hopes", color: "#F59E0B" },
  { q: "Today", label: "$438 · 17.6x NTM", color: "#1D4ED8" },
];

// ─── SECTOR VALUATION CONTEXT ───
export const sectorStats = [
  { label: "Tools P/E (blended NTM EBITDA)", value: "15x",       sub: "vs 22x five-year average" },
  { label: "Sector absolute multiple level",  value: "8-yr low",  sub: "lowest since 2017–18" },
  { label: "Tools vs S&P 500 relative P/E",   value: "15-yr low", sub: "biggest discount since GFC era" },
  { label: "Stocks at 52-week lows in cohort", value: "Most",     sub: "TMO, DHR, MRK, MTD, RGEN" },
];

// ─── BIOPROCESSING PRIMER ───
export const bioprocPrimer = {
  intro: "Biologic drugs aren't synthesised chemically like pills — they're secreted by living cells. The whole industry that grows, feeds and harvests those cells is 'bioprocessing.' TMO, Sartorius, Cytiva (Danaher) and Merck Millipore are the four firms that sell the picks-and-shovels.",
  steps: [
    { id: 1, title: "Engineered cells",     desc: "Cells (typically Chinese Hamster Ovary — CHO) engineered to secrete the target drug." },
    { id: 2, title: "Feed them Gibco media", desc: "Liquid mix of amino acids, sugars, vitamins, salts. Acts as food for the cells." },
    { id: 3, title: "Grow them in bags",     desc: "Sterile single-use plastic bags (50ml → 2,000 L). Replaces stainless-steel tanks." },
    { id: 4, title: "Purify & fill",         desc: "Filter, chromatograph, fill into vials or syringes. The 'downstream' step." },
  ],
  products: [
    {
      iconId: "media-bag",
      brand: "Gibco cell culture media",
      what: "Liquid food for cells",
      desc: "A liquid mixture of nutrients (amino acids, sugars, vitamins, salts) that acts as food for living cells. Needed because biologic drugs aren't synthesised chemically — they're secreted by living cells, and those cells have to be fed to stay alive and produce the drug.",
    },
    {
      iconId: "bioreactor",
      brand: "Single-use bags & systems",
      what: "Sterile plastic vs steel",
      desc: "Sterile plastic bags, room-sized at the top end, that hold the cells and liquid during manufacturing. Disposable plastic preferred over traditional steel tanks because you skip the cost and downtime of cleaning and sterilising between batches.",
    },
  ],
};

// ─── 4-PLAYER MARKET SHARE ───
// Approximate global bioprocessing tools market share (consumables + equipment).
export const players = [
  { name: "Cytiva",             parent: "Danaher",        share: 30, color: "#9333EA", note: "Share gainer. Pricing 10–15% below TMO. Quality + service flagged as reasons." },
  { name: "Sartorius",          parent: "Sartorius AG",   share: 28, color: "#059669", note: "Pure-play. Bioprocess Solutions +8.1% cc Q1 2026." },
  { name: "Thermo Fisher",       parent: "Thermo Fisher",  share: 22, color: "#1D4ED8", note: "Premium-priced incumbent. Pricing pressure flagged.", isHero: true },
  { name: "Merck Millipore",    parent: "Merck KGaA",     share: 15, color: "#EA580C", note: "Process Solutions +16% Q1, first €1B Q since Q1'23." },
  { name: "Other",              parent: "—",              share: 5,  color: "#94A3B8", note: "Long tail of regional and specialist players." },
];

export const playerInsight = "Danaher (Cytiva) is taking meaningful share — Morgan Stanley's bioprocessing tools podcast expects Cytiva to become the share leader in single-use consumables in the near future. Pricing differential vs TMO is 10–15%. Quality of consumables, lower pricing, and service strength flagged as reasons for the share gain.";

// ─── THE MOAT — BLA STICKINESS ───
export const blaMoat = {
  headline: "Once a biologic is approved, the supplier list is locked in.",
  detail: "When a biologic is filed with the FDA (BLA) or the EMA (MAA), the CMC section of the dossier names the specific critical raw materials and consumables used in the manufacturing process — the cell culture media, the single-use bioreactor bags, the filtration membranes, the Protein A and ion-exchange resins, in some cases down to the specific supplier part numbers. The product is approved with that process, not just that molecule.",
  consequence: "Switching supplier means re-running clinical trials to show the drug behaves identically. That is expensive enough that effectively no commercial drug switches supplier. Revenue from an approved biologic is a near-perpetuity for the chosen suppliers.",
};

// ─── CATALYSTS / WHY NOW ───
export const catalysts = [
  {
    title: "Stainless steel → single-use",
    text: "The shift from stainless-steel tanks to single-use plastic systems still has plenty of room to run. Adoption is well below saturation outside the biggest pharma manufacturers.",
    color: "#059669",
  },
  {
    title: "US onshoring is real",
    text: "Expert (MS podcast) working on multiple tech-transfer projects into the US believes these sites begin placement of tools in Q3 this year — ties into Danaher Q1 order-book growth, translates into revenue later this year.",
    color: "#1D4ED8",
  },
  {
    title: "2027 in the models — orders this year",
    text: "Street is modelling the inflection for FY27. But equipment orders are arriving NOW. The order-book signal at Danaher is the leading indicator the Street has not priced into FY26.",
    color: "#9333EA",
  },
  {
    title: "Insulated from AI + geopolitics",
    text: "Capex flows into bioprocessing are largely independent of the AI capex cycle and the worst geopolitical scenarios. Diversifying allocation away from concentrated AI bets.",
    color: "#EA580C",
  },
];

// ─── WHAT NEEDS TO HAPPEN / CONCLUSION ───
export const conclusion = {
  headline: "Growth rates need to come back. We have been waiting 4 years.",
  detail: "The setup is asymmetric — multiples at 8-year absolute lows and 15-year relative lows, four-player oligopoly with BLA-locked-in moats, real onshoring catalysts now hitting the order book at Danaher. The piece missing is the headline organic growth print — and that is what the Q2/Q3 earnings sequence has to deliver.",
  watchpoints: [
    "Danaher equipment orders sustaining > 20% YoY through Q3 2026",
    "TMO LSS organic accelerating to ≥ 3% by Q2 / Q3",
    "Sartorius H2 equipment > H1 (already guided)",
    "Tools sector P/E reclaiming 18–20x band — first sign of multi-quarter re-rating",
  ],
};

// ─── CYCLE PHASE — where we are right now ───
export const cyclePhases = [
  { id: "destocking", label: "Destocking",     icon: "↓",  color: "#EF4444", state: "past",    span: "2022–24" },
  { id: "trough",     label: "Trough",         icon: "↘",  color: "#F59E0B", state: "past",    span: "2024–25" },
  { id: "recovery",   label: "Early Recovery", icon: "↗",  color: "#10B981", state: "current", span: "Now"    },
  { id: "expansion",  label: "Expansion",      icon: "↑",  color: "#06B6D4", state: "future",  span: "2026–27"},
  { id: "peak",       label: "Peak",           icon: "★",  color: "#94A3B8", state: "future",  span: "?"      },
];

// ─── SECTOR P/E vs S&P 500 — relative multiple over 15 years ───
// Tools sector blended NTM P/E divided by SPX NTM P/E. >1.0 = premium, <1.0 = discount.
export const sectorVsSpxSeries = [
  { year: 2010, rel: 1.10 },
  { year: 2011, rel: 1.12 },
  { year: 2012, rel: 1.18 },
  { year: 2013, rel: 1.22 },
  { year: 2014, rel: 1.25 },
  { year: 2015, rel: 1.28 },
  { year: 2016, rel: 1.32 },
  { year: 2017, rel: 1.36 },
  { year: 2018, rel: 1.38 },
  { year: 2019, rel: 1.42 },
  { year: 2020, rel: 1.48 },
  { year: 2021, rel: 1.55 },
  { year: 2022, rel: 1.40 },
  { year: 2023, rel: 1.20 },
  { year: 2024, rel: 1.00 },
  { year: 2025, rel: 0.90 },
  { year: 2026, rel: 0.82 },
];

// ─── STAINLESS STEEL → SINGLE-USE ADOPTION ───
// % share of new bioreactor capacity globally. Single-use grew from <10% mid-2000s to a majority today,
// with a long tail of conversion remaining at the largest manufacturers.
export const adoptionSeries = [
  { year: 2015, single: 22, steel: 78 },
  { year: 2016, single: 25, steel: 75 },
  { year: 2017, single: 28, steel: 72 },
  { year: 2018, single: 32, steel: 68 },
  { year: 2019, single: 36, steel: 64 },
  { year: 2020, single: 40, steel: 60 },
  { year: 2021, single: 44, steel: 56 },
  { year: 2022, single: 47, steel: 53 },
  { year: 2023, single: 50, steel: 50 },
  { year: 2024, single: 53, steel: 47 },
  { year: 2025, single: 55, steel: 45 },
  { year: 2026, single: 57, steel: 43, current: true },
  { year: 2027, single: 61, steel: 39, est: true },
  { year: 2028, single: 65, steel: 35, est: true },
  { year: 2029, single: 69, steel: 31, est: true },
  { year: 2030, single: 72, steel: 28, est: true },
];

// ─── MARKET SHARE EVOLUTION — bioprocessing tools ───
// Approximate market share over time. Cytiva gaining; TMO and Merck losing modestly.
export const shareEvolution = [
  { year: 2018, cytiva: 25, sartorius: 26, tmo: 25, merck: 16, other: 8 },
  { year: 2019, cytiva: 26, sartorius: 26, tmo: 25, merck: 16, other: 7 },
  { year: 2020, cytiva: 27, sartorius: 27, tmo: 24, merck: 15, other: 7 },
  { year: 2021, cytiva: 28, sartorius: 27, tmo: 24, merck: 15, other: 6 },
  { year: 2022, cytiva: 28, sartorius: 27, tmo: 23, merck: 16, other: 6 },
  { year: 2023, cytiva: 29, sartorius: 27, tmo: 23, merck: 15, other: 6 },
  { year: 2024, cytiva: 29, sartorius: 28, tmo: 22, merck: 15, other: 6 },
  { year: 2025, cytiva: 30, sartorius: 28, tmo: 22, merck: 15, other: 5 },
  { year: 2026, cytiva: 30, sartorius: 28, tmo: 22, merck: 15, other: 5 },
];

// ─── BIG PHARMA US CAPEX COMMITMENTS ───
// Announced US manufacturing investments triggered by Section 232 / MFN dynamics.
// USD billions, gross announced figures, multi-year deployment.
export const capexCommitments = [
  { name: "Eli Lilly",        ticker: "LLY", amount: 27,   note: "4 new US facilities (APIs + injectables), Feb 2026",       color: "#1D4ED8" },
  { name: "Johnson & Johnson",ticker: "JNJ", amount: 55,   note: "10-year US manufacturing & innovation commitment",          color: "#1D4ED8" },
  { name: "Roche",            ticker: "ROG", amount: 50,   note: "5-year US capex pledge incl. mfg + R&D",                    color: "#1D4ED8" },
  { name: "Novartis",         ticker: "NOVN",amount: 23,   note: "10 new US facilities through 2030",                         color: "#1D4ED8" },
  { name: "AstraZeneca",      ticker: "AZN", amount: 50,   note: "10-year R&D + US manufacturing commitment",                  color: "#1D4ED8" },
  { name: "Bristol Myers",    ticker: "BMY", amount: 40,   note: "5-year US manufacturing + R&D investment",                  color: "#1D4ED8" },
  { name: "Novo Nordisk",     ticker: "NOVO",amount: 8,    note: "2026 capex of DKK 55B incl. major US aseptic capacity",     color: "#1D4ED8" },
  { name: "Merck & Co",       ticker: "MRK", amount: 8,    note: "US manufacturing expansion",                                 color: "#1D4ED8" },
];

export const capexTotal = {
  whAggregate: 400,
  label: "Aggregate announced US pharma capex commitments (White House figure)",
};
