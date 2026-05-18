// TMO — Financials and Setup Data
// Current setup, Q1 2026 results, BI analyst note, consensus EPS evolution,
// peer comparison, why underperforming, catalysts watchlist

export const finHeroStats = [
  { value: "$438", label: "Share price (close 18 May 2026)", color: "deepBlue" },
  { value: "16.8x", label: "NTM forward P/E — discount to historical mid-20s", color: "capRed" },
  { value: "14.5x", label: "FY28 P/E on consensus estimates", color: "green" },
  { value: "-25%", label: "Year-to-date 2026 price return", color: "orange" },
  { value: "9-13%", label: "Consensus EPS growth 2026E-2029E", color: "purple" },
  { value: "20 May", label: "Investor Day this Wednesday — key near-term catalyst", color: "deepBlue" },
];

/* ═══════════════════════════════════════════
   CURRENT SETUP NARRATIVE
   ═══════════════════════════════════════════ */
export const setupNarrative = "Thermo Fisher trades at $438 ahead of Wednesday's Investor Day, having compressed roughly 30 percent from its late-2025 high near $640. Q1 2026 results (released 23 April) beat consensus on both revenue and EPS but the stock fell 7 percent intraday — a credibility-of-management reaction to the underlying organic growth of only 1 percent reported (3 percent on management's adjusted underlying basis). The current setup is a classic compressed multiple plus consensus that still believes the algo. NTM P/E of 16.8x is well below the historical mid-20s, but consensus EPS estimates have been remarkably stable since mid-2025 despite a string of soft prints. The market is signalling 'we will not pay the historical multiple until growth visibly inflects' — which means Wednesday's Investor Day and the Q2 print in late July are the binary catalysts for re-rating.";

/* ═══════════════════════════════════════════
   Q1 2026 RESULTS RECAP
   ═══════════════════════════════════════════ */
export const q1Results = {
  date: "23 April 2026",
  headline: [
    { metric: "Revenue", value: "$11.01B", vs: "Beat (+1.3% vs cons $10.87B)", color: "green" },
    { metric: "Reported revenue growth", value: "+6% YoY", vs: "Driven by Clario + FX", color: "deepBlue" },
    { metric: "Organic revenue growth", value: "+1%", vs: "Missed (cons +1.2%)", color: "capRed" },
    { metric: "Adj EPS", value: "$5.44", vs: "Beat (+3.6% vs cons $5.25)", color: "green" },
    { metric: "Adj operating margin", value: "21.8%", vs: "Down 10bp YoY", color: "orange" },
    { metric: "GAAP operating margin", value: "16.9%", vs: "Up 30bp YoY", color: "green" },
  ],
  bridge: "Management's explanation for the 1% organic print: roughly 1pp drag from one fewer selling day versus prior year, plus roughly 1pp from revenue timing in the pharma services business. Strip those out and underlying Q1 was tracking at approximately 3% organic growth, exactly where management has guided for Q2 2026.",
  segments: [
    { name: "Life Sciences Solutions", growth: "+13% reported, +4% organic", note: "Bioproduction another quarter of excellent growth — the strongest sub-business in the company." },
    { name: "Analytical Instruments", growth: "Low single digit", note: "Pressured by academic and government weakness, China austerity, semiconductor metrology softness." },
    { name: "Specialty Diagnostics", growth: "+5% reported", note: "Stable, leadership franchises in allergy and transplant performing well." },
    { name: "Laboratory Products & Biopharma Services", growth: "Mid single digit reported", note: "Pharma Services strong; Clinical Research solid; Research and Safety Channel low single digit." },
  ],
  guidanceRaise: "Raised FY2026 revenue guidance to $47.3-$48.1bn (from $46.3-$47.2bn) — a $1bn raise at the midpoint. Adj EPS raised to $24.64-$25.12 from $24.22-$24.80, implying 8-10% growth over 2025. The raise is largely Clario-driven: Clario contributes ~$900M revenue and $0.32 EPS net of financing. Underlying organic growth guide unchanged at 3-4% for the year.",
};

/* ═══════════════════════════════════════════
   BLOOMBERG INTELLIGENCE NOTE
   ═══════════════════════════════════════════ */
export const biNote = {
  title: "Thermo Fisher Raises EPS View, But Demand Lags",
  analyst: "Adeline Zandi, Bloomberg Intelligence",
  date: "23 April 2026",
  highlights: [
    "Revenue of $11 Billion Beats Consensus by 1.5%; EPS at $5.44 Tops by 20 Cents",
    "EPS Guidance for 2026 Rises to $24.64-$25.12 From $24.22-$24.80",
    "Organic Revenue Increases 1%, Driven by 4% Gain in Lab Products & Services",
    "Operating Margin of 21.8% Declines 10 Bps, Exceeds Estimates",
  ],
  outlook: "We had slightly higher hopes for Thermo's quarter, as raising the midpoint of 2026 EPS guidance by 37 cents looks less impressive after backing out roughly 32 cents from Clario. Its unchanged 3-4% organic growth outlook suggests that demand has yet to inflect. Yet the stock slump appears to say more about expectations for a turn in demand than any deterioration in the setup and looks somewhat overdone, as EPS beat by 20 cents and Thermo showed continued ability to drive margin. Demand still feels two-speed, with biopharma strengthening, while most other markets remain sluggish. Hitting full-year guidance will still require a notable step up, though management framed the increase as more a function of easier comparisons, selling days and pharma services phasing in than a sharp improvement in demand.",
};

/* ═══════════════════════════════════════════
   CONSENSUS EPS EVOLUTION
   Reflecting the Bloomberg EEG chart
   ═══════════════════════════════════════════ */
export const consensusEvolution = {
  intro: "Three-year evolution of consensus EPS estimates for FY26, FY27, and FY28, alongside the share price. The story the chart tells: estimates have been remarkably stable since mid-2025 (with the recent tick actually marginally upward post the Q1 raise), while the share price has fully reversed from the late-2025 high near $640 back to $438. The current selloff is multiple compression, not estimate cuts.",
  current: [
    { period: "FY2026 EPS (consensus)", value: "$24.88", note: "Was ~$32 three years ago — already cut ~22% over the period" },
    { period: "FY2027 EPS (consensus)", value: "$27.26", note: "Implies +9.6% growth over FY26 — bakes in reacceleration" },
    { period: "FY2028 EPS (consensus)", value: "$30.14", note: "Implies +10.6% growth over FY27 — back-end loaded ramp" },
  ],
  insight: "The current consensus already prices in a meaningful EPS growth reacceleration: 4.6% (FY25A) → 8.8% (FY26E) → 9.6% (FY27E) → 10.6% (FY28E) → 12.6% (FY29E). This is not a blue-sky scenario — it's underpinned by 5-7% revenue growth (with Clario boosting FY26E) plus 50-75bp of annual margin expansion via PPI Business System plus buybacks. Hitting that algo requires demand inflection to show up. The cheap multiple is only cheap if you believe the consensus numbers — that's the asymmetric setup.",
};

/* ═══════════════════════════════════════════
   CURRENT VALUATION MULTIPLES
   ═══════════════════════════════════════════ */
export const multiples = {
  intro: "Current multiples versus historical averages. The valuation case rests on the gap between current discount and through-cycle multiples.",
  current: [
    { multiple: "P/E (LTM)", value: 18.93, hist: 24, color: "deepBlue" },
    { multiple: "P/E (NTM)", value: 16.79, hist: 22, color: "deepBlue" },
    { multiple: "P/E (FY26)", value: 17.62, hist: 21, color: "deepBlue" },
    { multiple: "P/E (FY27)", value: 16.08, hist: 20, color: "deepBlue" },
    { multiple: "P/E (FY28)", value: 14.54, hist: 19, color: "deepBlue" },
    { multiple: "EV/EBITDA (NTM)", value: 16.08, hist: 18, color: "green" },
    { multiple: "EV/EBITDA (FY27)", value: 15.25, hist: 17, color: "green" },
    { multiple: "EV/EBITDA (FY28)", value: 14.09, hist: 16, color: "green" },
    { multiple: "P/B (FY26)", value: 2.97, hist: 4.5, color: "orange" },
    { multiple: "EV/Revenue (NTM)", value: 4.20, hist: 5.5, color: "purple" },
    { multiple: "P/FCF (NTM)", value: 16.50, hist: 20, color: "capRed" },
  ],
  insight: "Across every valuation metric, Thermo Fisher is trading at a 20-35% discount to its 5-year historical average multiple. P/E discount is 25%, EV/EBITDA 10-15%, P/B 35%, EV/Revenue 25%. Most of the de-rating reflects sentiment about demand reacceleration credibility rather than estimate cuts.",
};

/* ═══════════════════════════════════════════
   FORECAST GROWTH
   ═══════════════════════════════════════════ */
export const growthEstimates = [
  { metric: "EPS Adj", fy25: 4.62, fy26: 8.80, fy27: 9.55, fy28: 10.55, fy29: 12.56, color: "deepBlue" },
  { metric: "Revenue", fy25: 3.91, fy26: 7.11, fy27: 5.46, fy28: 6.23, fy29: 5.95, color: "green" },
  { metric: "EBIT", fy25: 4.14, fy26: 10.05, fy27: 7.81, fy28: 7.25, fy29: 7.48, color: "orange" },
  { metric: "EBITDA", fy25: 2.72, fy26: 10.03, fy27: 8.36, fy28: 8.27, fy29: 10.11, color: "capRed" },
  { metric: "Net Income Adj", fy25: 3.13, fy26: 7.25, fy27: 8.94, fy28: 8.74, fy29: 10.54, color: "purple" },
];

/* ═══════════════════════════════════════════
   PEER COMPARISON
   ═══════════════════════════════════════════ */
export const peerComp = [
  { name: "Thermo Fisher (TMO)", ticker: "TMO US", pe: 16.8, evEbitda: 16.1, growth: "3-4%", margin: 21.8, fcf: "$6.3B", color: "#1D4ED8", note: "The discounted quality compounder. Conglomerate dilution drags multiple but creates value re-rating optionality." },
  { name: "Danaher", ticker: "DHR US", pe: 24, evEbitda: 19, growth: "4-6%", margin: 27, fcf: "$7.2B", color: "#059669", note: "Closest peer. Pure life sciences post-Veralto spin. Best-in-class capital allocation. Premium multiple fully justified by quality." },
  { name: "Sartorius", ticker: "SRT GR", pe: 28, evEbitda: 18, growth: "Recovering", margin: 27, fcf: "€350M", color: "#9333EA", note: "Pure-play bioprocessing. Highest beta to recovery. Down ~60% from peak — biggest drawdown in peer set." },
  { name: "Agilent", ticker: "A US", pe: 19, evEbitda: 14, growth: "3-5%", margin: 24, fcf: "$1.4B", color: "#EA580C", note: "Analytical instruments specialist. Pressured by academic and China weakness. No bioproduction exposure." },
  { name: "Waters", ticker: "WAT US", pe: 21, evEbitda: 16, growth: "4-6%", margin: 29, fcf: "$700M", color: "#0EA5E9", note: "Premium specialist. Highest recurring revenue mix (~50%). Fundsmith largest position — the textbook QARP profile." },
  { name: "Merck KGaA", ticker: "MRK GR", pe: 13, evEbitda: 9, growth: "3-5%", margin: 23, fcf: "€2.5B", color: "#94A3B8", note: "Diversified — Life Science segment is the tools comp. Conglomerate discount obscures pure-play valuation." },
];

export const peerReturns5Y = {
  intro: "Five-year total return comparison (Bloomberg, May 2021 - May 2026, USD). Reveals that Danaher has actually underperformed Thermo Fisher over 5 years despite premium quality reputation. Waters is the only positive performer, validating its Fundsmith ownership as the premium quality play. Sartorius drawdown reflects bioproduction destock pain.",
  data: [
    { name: "Waters", ticker: "WAT", value: 7.92, color: "#0EA5E9" },
    { name: "Thermo Fisher", ticker: "TMO", value: -2.26, color: "#1D4ED8" },
    { name: "Agilent", ticker: "A", value: -10.18, color: "#EA580C" },
    { name: "Merck KGaA", ticker: "MRK GR", value: -14.64, color: "#94A3B8" },
    { name: "Danaher", ticker: "DHR", value: -25.20, color: "#059669" },
    { name: "Sartorius", ticker: "SRT3 GR", value: -51.58, color: "#9333EA" },
  ],
};

/* ═══════════════════════════════════════════
   PEER RANKING BY ATTRIBUTE
   ═══════════════════════════════════════════ */
export const peerRankings = {
  intro: "Attribute-by-attribute ranking of the six peers. The ranking depends on what attribute you care about — different attributes produce different winners.",
  attributes: [
    {
      name: "Cleanest business model",
      ranking: ["Sartorius", "Waters", "Agilent", "Danaher", "Thermo Fisher", "Merck KGaA"],
      note: "Sartorius is the purest pure-play. Thermo Fisher has the most conglomerate complexity. Merck KGaA is hampered by non-tools segments.",
    },
    {
      name: "Biologics manufacturing supercycle exposure",
      ranking: ["Sartorius", "Danaher", "Merck KGaA", "Thermo Fisher", "Waters", "Agilent"],
      note: "Sartorius is pure-play exposure. Danaher via Cytiva. Thermo Fisher Bioproduction is ~10% of revenue but on a much larger base. Waters and Agilent have minimal direct exposure.",
    },
    {
      name: "Precision medicine and diagnostics",
      ranking: ["Danaher", "Agilent", "Thermo Fisher", "Merck KGaA", "Waters", "Sartorius"],
      note: "Danaher has the strongest diagnostics franchise. Sartorius has essentially zero diagnostics exposure.",
    },
    {
      name: "AI and digital transformation in pharma",
      ranking: ["Thermo Fisher", "Danaher", "Agilent", "Waters", "Sartorius", "Merck KGaA"],
      note: "Thermo Fisher via Clario has the most direct angle. Otherwise the AI exposure is incremental across the peer set.",
    },
    {
      name: "US pharma reshoring beneficiary",
      ranking: ["Thermo Fisher", "Danaher", "Merck KGaA", "Sartorius", "Waters", "Agilent"],
      note: "Thermo Fisher most directly positioned via the $2bn US capacity buildout and Sanofi NJ acquisition.",
    },
    {
      name: "Quality of moat / barriers to entry",
      ranking: ["Sartorius", "Waters", "Danaher", "Thermo Fisher", "Merck KGaA", "Agilent"],
      note: "Sartorius bioprocessing and Waters LC franchises have the highest-quality individual moats. Thermo Fisher dragged by Fisher channel distribution moat being weaker.",
    },
    {
      name: "Recurring revenue mix",
      ranking: ["Waters", "Sartorius", "Danaher", "Thermo Fisher", "Merck KGaA", "Agilent"],
      note: "Waters at ~50% recurring is highest. Thermo Fisher's '80% recurring' framing diluted by lower-quality Fisher channel.",
    },
    {
      name: "Growth profile (forward-looking)",
      ranking: ["Sartorius", "Thermo Fisher", "Danaher", "Merck KGaA", "Waters", "Agilent"],
      note: "Sartorius has highest beta to bioproduction recovery. Waters predictable but lower ceiling.",
    },
    {
      name: "Capital allocation track record",
      ranking: ["Danaher", "Thermo Fisher", "Waters", "Sartorius", "Agilent", "Merck KGaA"],
      note: "Danaher is the gold standard. Thermo Fisher strong but recent Clario timing and pace of M&A has drawn some scepticism.",
    },
    {
      name: "Valuation (cheapness)",
      ranking: ["Merck KGaA", "Thermo Fisher", "Agilent", "Waters", "Danaher", "Sartorius"],
      note: "Merck KGaA at ~13x trades cheapest due to conglomerate discount. Thermo Fisher cheap on quality-adjusted basis. Sartorius still expensive despite drawdown.",
    },
  ],
  composite: {
    intro: "Composite ranking weighing all attributes. The honest read is that Danaher is the better business but Thermo Fisher is the more interesting investment right now — precisely because Danaher's quality is fully priced and Thermo Fisher's discount creates the asymmetry.",
    ranking: [
      { rank: 1, name: "Danaher", note: "Highest quality, broadest thematic exposure, premium multiple fully justified. The 'pick one tools name forever' answer." },
      { rank: 2, name: "Sartorius", note: "Highest moat quality, cleanest thematic exposure, highest beta to recovery. But also highest disappointment risk." },
      { rank: 3, name: "Waters", note: "Textbook QARP profile. Premium quality at premium price. Predictable but lower-ceiling." },
      { rank: 4, name: "Thermo Fisher", note: "The 'value within quality' angle. Cheapest entry on consensus numbers. Binary on growth reacceleration." },
      { rank: 5, name: "Agilent", note: "Stuck in the middle. Solid quality, limited thematic upside, currently pressured." },
      { rank: 6, name: "Merck KGaA", note: "Diversification makes pure-play tools thesis impossible. Better as analytical input than holding." },
    ],
  },
};

/* ═══════════════════════════════════════════
   WHY THE STOCK IS UNDERPERFORMING
   Consolidated explanation
   ═══════════════════════════════════════════ */
export const underperformance = {
  intro: "Thermo Fisher is caught at the intersection of multiple overlapping pressures. None individually is fatal. But stacked on each other, they have produced a multi-quarter de-rating that the market is unwilling to reverse until growth visibly inflects.",
  reasons: [
    {
      name: "Multi-quarter organic growth credibility erosion",
      severity: "high",
      description: "The most important single driver. Over the last 6-8 quarters, Thermo Fisher has put up a string of soft organic growth prints (typically 1-2% reported), with management explaining the gap to the 3-4% medium-term algo via timing, selling days, pharma services phasing, and comp issues. Each explanation is technically correct. But the cumulative effect is that investors have lost patience and stopped giving management the benefit of the doubt on 'underlying' versus 'reported' growth. After enough quarters of 'trust us, it's really better than it looks', the market demands visible evidence before re-rating.",
    },
    {
      name: "Sector-wide derating of life sciences tools",
      severity: "high",
      description: "The whole tools complex — Danaher, Agilent, Waters, Sartorius, Bio-Rad, Avantor — has been derating since the 2021 peak. The post-COVID hangover has been longer and deeper than expected: pull-forward demand from 2020-2022 created peak earnings that were always going to roll off, but the destock has been more painful than initially modelled. Biotech funding winter cut customer base. China austerity in scientific procurement has been brutal. TMO has actually held up relatively well within the sector — Sartorius down 60%, Bio-Techne down materially — but it cannot escape the sector gravity.",
    },
    {
      name: "Academic and government end-market weakness",
      severity: "medium-high",
      description: "Trump administration's proposed cap on NIH indirect cost rates (15% vs previous 40-70% range) created a step-function fear for academic research budgets. The proposal is tied up in litigation but the chilling effect on academic capital purchases has shown up in 2025 prints across the tools complex. ~15% of Thermo Fisher revenue is exposed via Analytical Instruments and Fisher channel sales to academic and government customers.",
    },
    {
      name: "China and geopolitical headwinds",
      severity: "medium-high",
      description: "Beyond the anti-corruption austerity campaign in healthcare procurement (started 2023), dual-use restrictions on advanced instruments (electron microscopy especially) and US-China tariff escalation add structural overlays. Domestic Chinese competitors are getting more credible in low-end consumables. Q1 2026 China commentary was incrementally negative.",
    },
    {
      name: "Bioproduction recovery delays",
      severity: "medium-high",
      description: "The bioproduction destock was supposed to be largely complete by mid-2024. Then end-2024. Then mid-2025. Each quarter management signals 'we're at the inflection' and the recovery is more gradual than expected. Sartorius signals the same. There is now a real bear question about whether post-COVID 'normalised' run-rate bioproduction demand is structurally lower than the bulls assume.",
    },
    {
      name: "Rotation away from old quality compounders",
      severity: "medium",
      description: "The market has been heavily rotating into AI-exposed names and away from traditional quality compounders. Fundsmith dynamic is illustrative — cutting Microsoft, Meta, Alphabet on AI capex concerns, rotating INTO Zoetis, EssilorLuxottica, Wolters Kluwer. Thermo Fisher sits in awkward middle — old quality but not yet a rotation destination.",
    },
    {
      name: "Clario deal optics",
      severity: "medium",
      description: "The bear interpretation is 'buying growth' — the $0.32 EPS contribution from Clario is what saved the FY26 guide raise while underlying organic growth is unchanged. This plays into a longer-running narrative that Thermo Fisher's growth in recent years has been increasingly M&A-driven (PPD 2021, Olink 2023, Solventum filtration 2025, Sanofi NJ 2025, Clario 2026) rather than organic.",
    },
    {
      name: "Capex intensity ramp",
      severity: "medium",
      description: "Capex has roughly 8x'd over five years (from ~$260M in 2021 to ~$2.2bn in 2025). Most is good capex (US reshoring, Patheon expansion, bioproduction capacity) but it's pressuring near-term FCF conversion at a moment when the multi-year growth payoff hasn't yet shown up in the P&L. The 'above-trend growth from 2027-2029' framing means investors have to underwrite 1-3 more years of elevated capex before the return shows.",
    },
    {
      name: "Management succession uncertainty",
      severity: "low-medium",
      description: "Gianluca Pettiti elevated to President and Chief Operating Officer effective March 2026 — reads as succession positioning for Casper, who has been CEO since 2009 and is the architect of the entire modern franchise. Pettiti is credible but there's always a 'Casper premium' question. Doesn't have to be a big drag but caps the multiple at the margin.",
    },
  ],
};

/* ═══════════════════════════════════════════
   CATALYSTS WATCHLIST
   ═══════════════════════════════════════════ */
export const catalysts = [
  {
    date: "20 May 2026",
    name: "2026 Investor Day",
    type: "Major catalyst",
    description: "First Investor Day in several years. Expect long-term organic growth targets, capital allocation framework, AI roadmap, updated bioproduction and clinical research targets post-Clario. The binary moment for whether management can defend or upgrade the medium-term algo and restore credibility on the 3-4% organic growth bridge to 5-6% by 2027-2029.",
    impact: "high",
  },
  {
    date: "Late July 2026",
    name: "Q2 2026 earnings",
    type: "Earnings",
    description: "Management has guided Q2 organic growth to approximately 3%. Coming in at or above 3% would be the first visible confirmation that demand is inflecting per the algo. Coming in below 3% (or another 'underlying is better than reported' explanation) extends the credibility erosion.",
    impact: "high",
  },
  {
    date: "Q3 2026",
    name: "Clario integration progress",
    type: "Integration milestone",
    description: "First full quarter with Clario fully integrated. Markers to watch: revenue retention from Clario's existing customer book, cross-sell into PPD's customer base, margin profile, synergy realisation versus deal model.",
    impact: "medium",
  },
  {
    date: "October 2026",
    name: "Q3 2026 earnings",
    type: "Earnings",
    description: "Second test of the demand reacceleration thesis. Two consecutive quarters at or above 3% organic confirms the inflection. Watch China commentary, academic and government channel commentary, bioproduction order book.",
    impact: "high",
  },
  {
    date: "January 2027",
    name: "FY2026 results plus FY2027 guide",
    type: "Earnings",
    description: "Annual results plus FY27 guidance. Key questions: does management guide organic growth above 4% (a positive signal of demand inflection), maintain at 3-4% (status quo), or lower the range (bearish). Capital allocation commentary on buybacks given depressed multiple is also important.",
    impact: "high",
  },
  {
    date: "Ongoing",
    name: "Bioproduction order book / Sartorius prints",
    type: "Read-through",
    description: "Sartorius reports approximately 1-2 weeks before Thermo Fisher each quarter. Direction of travel in Sartorius bioprocessing organic growth and book-to-bill is a leading indicator for Thermo Fisher Bioproduction. Watch order book commentary specifically.",
    impact: "medium",
  },
  {
    date: "Ongoing",
    name: "NIH funding resolution",
    type: "Policy",
    description: "Resolution of the NIH indirect cost rate cap proposal (litigation pending). Any clarity on academic research budget outlook would either confirm continued pressure or remove a major overhang on the Analytical Instruments and Fisher channel businesses.",
    impact: "medium",
  },
  {
    date: "Ongoing",
    name: "GLP-1 manufacturing buildout disclosures",
    type: "Customer activity",
    description: "Eli Lilly and Novo Nordisk are committing tens of billions to new manufacturing capacity. Each announced facility creates incremental bioproduction and potentially Patheon demand. Watch capex announcements and supplier disclosures.",
    impact: "medium",
  },
];

/* ═══════════════════════════════════════════
   SMART MONEY POSITIONING
   ═══════════════════════════════════════════ */
export const smartMoney = {
  intro: "Long-only manager activity in Thermo Fisher and the broader life sciences tools peer set, based on Q1 2026 13F filings (released mid-May 2026).",
  positions: [
    {
      manager: "Polen Capital",
      style: "US-listed large-cap growth, quality compounder focus",
      action: "Adding",
      detail: "Polen Capital added Thermo Fisher in Q1 2026 alongside additions to Estée Lauder and HDFC Bank. This is the most notable quality-manager buy of the quarter — Polen is taking the counter-consensus view that the discount and quality combination is compelling. Specifically buying ahead of the Investor Day catalyst.",
      signal: "bullish",
    },
    {
      manager: "Fundsmith (Terry Smith)",
      style: "Global quality compounder, ~30 holdings",
      action: "Not held",
      detail: "Fundsmith owns Waters (largest position) but does not own Thermo Fisher. Smith has been trimming Microsoft, Meta, Alphabet on AI capex concerns and rotating into Zoetis, EssilorLuxottica, Wolters Kluwer, Intuit. Thermo Fisher hasn't made the cut — possibly because of the lower recurring revenue quality versus Waters and the conglomerate complexity.",
      signal: "neutral",
    },
    {
      manager: "Berkshire Hathaway",
      style: "Concentrated value plus quality",
      action: "Not held",
      detail: "Berkshire's Q1 2026 13F (Abel's first quarter as CEO) made a massive Alphabet add and new positions in Delta, Macy's, Lennar. Life sciences tools are not on Berkshire's radar historically.",
      signal: "neutral",
    },
    {
      manager: "Sartorius peer holders",
      style: "European quality / pure-play bioprocessing",
      action: "Mixed",
      detail: "Sartorius is held by various European quality managers (Lindsell Train, Comgest historically). Activity in Sartorius is a read-through for sentiment on bioproduction recovery and therefore for Thermo Fisher Bioproduction.",
      signal: "neutral",
    },
    {
      manager: "Capital Group, Wellington, T. Rowe Price",
      style: "Diversified institutional core holdings",
      action: "Generally trimming",
      detail: "The large diversified institutional shops have generally been net sellers across the life sciences tools complex over the past 18 months as the sector has derated. Thermo Fisher remains a core holding but position sizes have been reduced versus peak.",
      signal: "bearish",
    },
  ],
  insight: "The interesting positioning observation is the divergence between quality-specialist managers. Polen is adding (counter-consensus). Fundsmith is sitting it out (preferring Waters). Most diversified shops are trimming. The setup is essentially 'no positioning capitulation' — no flushed selloff that creates a compressed-spring snap-back, but also no obvious crowded long. Polen's add is the most directional signal, suggesting at least one credible quality manager sees the asymmetric setup.",
};
