// TMO End-Market Health & Customer Spending Capacity
// Bottom-up bucket-by-bucket research note · 20 May 2026
// Source data structured for the End Markets tab.

export const endMarketsIntro = "TMO's customer base is collectively healthier than 6 months ago and materially healthier than 12 months ago, but the recovery is narrow and lopsided. Bioproduction and clinical research are inflecting up; pharma instrumentation is mid-single-digit positive; diagnostics is flat-to-down on weak respiratory and China VBP; academic & government remains the single weak bucket and is unlikely to inflect inside 12 months.";

export const endMarketsTldr = [
  "TMO's customer base is collectively healthier than 6 months ago, materially healthier than 12 months ago — but the recovery is narrow and lopsided.",
  "Bloomberg/BI 3–4% organic frame for FY26 is defensible but biased bearish. Weighted bucket math implies +3.5–4.5%, biased high if bioproduction equipment compounds.",
  "Bioproduction recovery is real and durable but not symmetric. Consumables decisively re-rated higher; equipment now turning (Danaher equipment orders +>30% YoY).",
];

// ─── BUCKET SCORECARD (one-page summary) ───
export const bucketScorecard = [
  { id: "pharma", name: "Pharma & Biotech",     weight: 57, demand: "Accelerating",        capacity: "Expanding (large) · Adequate (mid)",   outlook: "MSD–HSD organic growth",      vs6m: "Better",            color: "#1D4ED8" },
  { id: "academic", name: "Academic & Govt",    weight: 17, demand: "Decelerating",         capacity: "Constrained",                          outlook: "Flat to LSD declines",         vs6m: "Unchanged",          color: "#9333EA" },
  { id: "industrial", name: "Industrial & Applied", weight: 13, demand: "Stable → Accelerating", capacity: "Adequate",                         outlook: "LSD–MSD organic growth",       vs6m: "Modestly Better",    color: "#059669" },
  { id: "diagnostics", name: "Diagnostics & Healthcare", weight: 13, demand: "Stable",      capacity: "Adequate ex-China",                    outlook: "Flat to LSD in 2026",          vs6m: "Marginally Worse",   color: "#EA580C" },
];

// ─── BUCKET DETAIL ───
export const buckets = {
  pharma: {
    id: "pharma",
    name: "Pharma & Biotech",
    weight: 57,
    color: "#1D4ED8",
    headline: "Inflecting up. Bioproduction and clinical research lead.",
    whatTMOSells: "Concentrated in Life Sciences Solutions (~$10B FY25, bioproduction + Gibco media + viral vector / CGT) and Laboratory Products & Biopharma Services (~$23B FY25, Patheon CDMO + PPD + newly closed Clario). Smaller pharma exposure in Analytical Instruments (Orbitrap, Glacios cryo-TEM, chromatography for QA/QC) and Specialty Diagnostics. By revenue and margin, this is by some distance TMO's most important end market.",
    q1Read: "Q1 2026 mid-single digits, with bioproduction and clinical research called out as principal growth drivers. Marc Casper framed the H2 ramp as comp- and day-driven, not 'a change in underlying market conditions' — consistent with BI's read that the FY26 guide raise is 'largely Clario-driven.' The directional signal underneath the comp, however, is decisively constructive.",
    peerCheck: [
      { peer: "Danaher",          ticker: "DHR",  signal: "+>30% equipment orders YoY",  detail: "First quarter of YoY equipment order growth in nearly two years. Biotech core sales +7%; bioprocessing consumables HSD; China double-digit. 'Early stages of a multi-year investment cycle.'", color: "positive" },
      { peer: "Sartorius",        ticker: "SRT",  signal: "BPS +8.1% cc",                detail: "Bioprocess Solutions consumables driving growth; equipment soft as expected; H2 stronger than H1; FY26 BPS guidance 6–10% reaffirmed.", color: "positive" },
      { peer: "Merck KGaA",       ticker: "MRK",  signal: "Process Solutions +16%",       detail: "First quarter above €1B since Q1 2023. Pull-forward in APAC inflated Q1; underlying H2 run-rate ~10%. Raised FY26 group EBITDA to €5.7–6.1B.", color: "positive" },
      { peer: "Repligen",         ticker: "RGEN", signal: "+11% organic / analytics +50%", detail: "Chromatography +25%; China nearly doubled YoY; emerging biotech customers +20%; CDMOs +mid-teens. FY26 organic guide 9–13% reaffirmed.", color: "positive" },
      { peer: "Revvity",          ticker: "RVTY", signal: "Pharma/biotech low double-digit", detail: "Strongest performance since early 2023. First positive US academic growth since Q2 2023.", color: "positive" },
      { peer: "Agilent",          ticker: "A",    signal: "Pharma +7%, biotech DD",       detail: "Q2 guide includes weather-delayed Q1 revenue.", color: "positive" },
      { peer: "IQVIA",            ticker: "IQV",  signal: "$2.5B Q1 net new bookings",    detail: "R&DS revenue +6.2%; double-digit YoY NNB growth; backlog $34.2B record; book-to-bill 1.04x, TTM 1.11x. EBP funding $25B Q1, ~2x YoY.", color: "positive" },
      { peer: "Charles River",    ticker: "CRL",  signal: "DSA b-t-b 1.04x",              detail: "Proposal volumes +HSD across global biopharma and biotech; biotech net bookings at 'highest levels in more than two years.'", color: "positive" },
      { peer: "Waters (pharma)",  ticker: "WAT",  signal: "+14% YoY",                     detail: "China >+50%, Asia ~30%, Americas/Europe HSD. Corroborates large-pharma instrumentation strength.", color: "positive" },
      { peer: "Bio-Rad",          ticker: "BIO",  signal: "Life Science −4.3% cc",        detail: "Process Chromatography down DD — anomalous against universal strength elsewhere. Share-loss / mix story, not market signal.", color: "negative" },
    ],
    leadingIndicators: [
      {
        title: "Top-20 large pharma R&D and capex",
        text: "R&D budgets flat-to-up LSD in 2026. Bigger swing is capex re-acceleration into US manufacturing driven by MFN/tariff dynamics. Novo Nordisk Q1 2026: capex around DKK 55B in 2026 (vs DKK 60B 2025) 'reflecting the expansion of the global supply chain.' Eli Lilly Feb 2026: $27B in four new US manufacturing facilities — more than doubles domestic spending since 2020, bringing total to over $50B. White House reports ~$400B in aggregate new domestic pharma investment commitments triggered by Section 232 pressure. Capex migrating from 'delayed/cancelled' in 2024 to 'on-site execution' in 2026–27.",
      },
      {
        title: "Biotech VC and capital markets — bifurcated picture",
        text: "Q1 2026 biotech VC (JPM / DealForma): Seed/Series A 50 deals at $2.3B — first-time biotech financings on course for worst year since pre-pandemic. Series B+ 51 deals at $4.5B — higher than Q1 2024 and Q1 2025. HSBC Innovation Banking: 'recalibration of risk; investors favouring quality over quantity.' XBI closed Q1 ~$134 after ~35% 2025 rally (75% off April 2025 trough). IQVIA EBP funding $25B Q1, ~2x YoY — the most reliable buy-side signal on biotech spending capacity flowing back into clinical operations.",
      },
      {
        title: "GLP-1, ADC, and cell/gene therapy capacity",
        text: "Three structural tailwinds for bioproduction over next 24 months. (1) GLP-1 fill-finish capacity expansion: Lilly's $27B US footprint and Novo's DKK 55B 2026 capex into API + aseptic capacity reach full ramp late 2026 with multi-year tail. (2) ADC pipeline: Merck KGaA's Mobius ADC Reactor won INTERPHEX 2025 'Best in Show' — symptomatic of where customer capex is going. (3) CGT manufacturing: Cytiva and Sartorius flagged renewed CGT spending; Sartorius launched Eveo cell therapy manufacturing platform Q1 2026.",
      },
      {
        title: "Bioproduction destocking status",
        text: "Definitively concluded. Sartorius CEO: equipment soft Q1, Q2 stronger and H2 stronger than H1; consumables already 8–10%+. Merck KGaA Process Solutions back above €1B/Q for the first time since Q1 2023. Repligen 11% organic + analytics +50% confirms not just destock-end but volume growth at install base. Cytiva (DHR) equipment orders +>30% YoY is the cleanest signal next-cycle leg has begun.",
      },
      {
        title: "China biotech / BIOSECURE",
        text: "BIOSECURE legislation dormant; regulatory chill on US biotech using Chinese CDMOs (WuXi, BGI) persists informally, modestly tailwinding Western CDMO/bioproduction names. China local bioprocessing recovered — Danaher cited 'notable strength in China' double-digit bioprocessing; Repligen China nearly doubled; Merck KGaA Q1 was APAC-led; Waters >+50%.",
      },
      {
        title: "MFN drug pricing & tariffs",
        text: "April 2, 2026 Section 232 executive order: default 100% tariff on imported branded pharmaceuticals effective 31 Jul 2026 (29 Sep for smaller manufacturers), 0% for companies with signed MFN agreements. 17 of 17 large pharma have signed MFN deals. Practical implication for TMO: capex appetite is up, not down — the price of avoiding tariffs is US capex commitment. Generics, biosimilars, orphan drugs exempt. Long-term ROIC impaired by price controls, but the 12–24m effect is capex-positive for tools and bioproduction suppliers.",
      },
    ],
    customerCapacity: "Aggregate balance sheet of top-20 pharma is excellent — strong FCF, tight IG spreads, tariff-relief deals provide 3-year MFN exemptions in exchange for committed capex. Spending capacity is expanding, not constrained. Emerging biotech is bifurcated: late-stage names with de-risked assets have funding access; early-stage seed/Series A is constrained (pre-pandemic low pace). For TMO, the relevant cohort is mid-to-late-stage biotech — better-funded than 12 months ago.",
    scorecard: {
      demand: "Accelerating",
      capacity: "Expanding (large pharma) · Adequate (mid/late biotech) · Constrained (early biotech)",
      fy26: "+5.0% to +6.0%",
      fy27: "+6.0% to +7.0%",
      swing: [
        "Speed at which Danaher's +30% equipment orders translate to TMO bioproduction orders (TMO doesn't disclose equivalent KPI)",
        "Patheon / Clario integration",
        "MFN-related capex deferral if drugmakers re-evaluate ROI math",
        "Emerging biotech early-stage funding remaining depressed beyond H1 2026",
      ],
    },
  },

  academic: {
    id: "academic",
    name: "Academic & Government",
    weight: 17,
    color: "#9333EA",
    headline: "Still stalled. Unlikely to inflect inside 12 months.",
    whatTMOSells: "Analytical Instruments (cryo-EM, mass spec, chromatography, electron microscopy) into NIH-funded labs, university cores, EU national labs, China CAS institutes. Life Sciences Solutions consumables into academic research. Research & Safety market channel (Fisher Scientific catalog/distribution) — biggest single revenue line into academic labs. TMO's most price-inelastic-on-the-downside bucket: when grants get cut, instrument purchases get deferred fastest.",
    q1Read: "TMO Q1 2026: Academic & Government revenue declined low single digits, with management citing 'muted macro conditions in the US and China.' Marc Casper expressed 'confidence in upcoming product launches' but did not call a turn.",
    peerCheck: [
      { peer: "Agilent",       ticker: "A",    signal: "Academia/Govt −8%",           detail: "Q2 guidance assumes 'mid-single-digit decline.'", color: "negative" },
      { peer: "Bruker",        ticker: "BRKR", signal: "Organic −4.4%",                detail: "US academic demand, tariff and FX still pressured Q1. APAC −LDD, China >−20%. Reconfirmed FY26 guide; CEO expects return to organic growth in Q2.", color: "negative" },
      { peer: "Bio-Rad",       ticker: "BIO",  signal: "Life Science −4.3% cc",        detail: "'Primarily impacted by academic research funding constraints in the Americas.'", color: "negative" },
      { peer: "Mettler-Toledo", ticker: "MTD",  signal: "Pipettes declined",            detail: "'Soft demand from academia and biotech customers' (Kaltenbach).", color: "negative" },
      { peer: "Revvity",       ticker: "RVTY", signal: "First +US academic since Q2'23", detail: "Modest, but a directional turn. Isolated against four negative peers.", color: "positive" },
    ],
    leadingIndicators: [
      {
        title: "NIH FY26 appropriations",
        text: "Total enacted appropriations ~$47.5B, broadly flat real-terms. FY26 Consolidated Appropriations Act (P.L. 119-75) continues §224 prohibiting HHS from modifying indirect cost rates — the proposed 15% F&A cap was blocked by the First Circuit on 5 Jan 2026, with period to seek further review expiring 6 Apr 2026. Largest single overhang on instrument capex removed. However, Trump FY27 budget again proposes the 15% cap, recreating the overhang for the next budget cycle.",
      },
      {
        title: "NSF and DOE",
        text: "Similar protective appropriations language (P.L. 119-74 §542 and §313) requires use of negotiated ICRs in effect FY24. DOD ICR change blocked by P.L. 119-60 §230. Net: legal/legislative posture stabilised through end-FY26, but FY27 risk re-emerges in Q3 2026 budget debate.",
      },
      {
        title: "University balance sheets",
        text: "NACUBO-Commonfund 2025 study (Feb 2026 release): one-year average return for FY25 +10.9% across 657 institutions managing $944.3B. Capex flexibility intact for top-20 institutions, constrained for state schools facing legislative budget pressure. Trump administration's pressure on Harvard, Columbia, and others has chilled discretionary instrument capex.",
      },
      {
        title: "EU Horizon Europe",
        text: "Disbursements running on schedule through 2027. UK/German/French research funding stable but with no growth catalyst.",
      },
      {
        title: "China MOST and 'Made in China 2025'",
        text: "Agilent flagged 'minor government stimulus' Q1 2026 ($300M/quarter China baseline). Stimulus 2.0 not yet authorised at scale of the 2024 ~50B RMB life-science instrument program. Bruker's >20% China decline reflects the real demand environment behind the headline.",
      },
      {
        title: "Indirect cost rate policy",
        text: "Blocked but lingering. Most consequential single policy lever for academic instrument purchasing — a 15% cap would reduce most universities' annual NIH funding by 15–20% per the Congressional Research Service.",
      },
    ],
    customerCapacity: "US public universities constrained (state budgets squeezed, F&A overhang still psychologically present). US private elites adequate but cautious — FY25 endowment returns of 10.9% support continued capex but institutional posture has tilted defensive after political pressure. EU/UK universities adequate but flat-funded. China academic constrained with periodic stimulus injections.",
    scorecard: {
      demand: "Decelerating (still in mild contraction)",
      capacity: "Constrained",
      fy26: "−2% to −1%",
      fy27: "+1% to +2%",
      swing: [
        "FY27 NIH budget debate Q3–Q4 2026 (could reopen ICR overhang)",
        "China stimulus 2.0",
        "Tariff impact on instrument pricing",
      ],
    },
  },

  industrial: {
    id: "industrial",
    name: "Industrial & Applied",
    weight: 13,
    color: "#059669",
    headline: "Solid mid-cycle. Semi metrology and PFAS the bright spots.",
    whatTMOSells: "Analytical Instruments: GC-MS and ICP-MS into environmental and food labs; XRF and electron microscopy into semiconductor manufacturers and metals/mining; FTIR into industrial QC. Specialty Diagnostics: trace elemental analysis into forensic and homeland security. Fisher Scientific channel: consumables to industrial labs. Sub-end-markets include food safety, environmental/PFAS testing, semiconductor metrology, battery/EV materials testing, forensics.",
    q1Read: "TMO Q1 2026: Analytical Instruments segment organic revenue −2%, with the decline driven by academic/government, not industrial. Industrial demand was not flagged as a problem area.",
    peerCheck: [
      { peer: "Waters",        ticker: "WAT",  signal: "Industrial +3%, PFAS DD",     detail: "Asia MSD, Europe LSD, Americas flat. PFAS applications double-digit growth in Europe and China. China >+50%. Closed $18.8B BD Biosciences RMT 9 Feb 2026; BD added $520M Q1 revenue.", color: "positive" },
      { peer: "Bruker",        ticker: "BRKR", signal: "Semi metrology bookings +>20%", detail: "Now >$300M annual revenue business; bookings driven by AI demand for memory chips and advanced packaging.", color: "positive" },
      { peer: "Agilent",       ticker: "A",    signal: "Chemicals/advanced materials +9%", detail: "Materials sub-segment +>20%; food −4%; environmental/forensics flat.", color: "positive" },
      { peer: "Mettler-Toledo", ticker: "MTD",  signal: "Industrial automation strongest", detail: "Product inspection (food end-of-line) strong on attach-rate gains.", color: "positive" },
    ],
    leadingIndicators: [
      {
        title: "Global manufacturing PMI",
        text: "S&P Global US Manufacturing PMI 54.5 in April 2026 — highest since May 2022; output growth at four-year high; new orders fastest pace in four years. Chris Williamson (S&P): 'The surge in manufacturing activity in April is not the cause for cheer that at first glance it suggests. A key driving force is the need for companies to get ahead of further feared price rises and supply shortages, providing a short-term boost that could fade in the coming months.' Underlying signal expansionary but discount for stockpiling. Eurozone PMI also strengthened.",
      },
      {
        title: "PFAS regulations",
        text: "Rolling out 2026. EPA TSCA reporting period revised to 11 Jul 2025 – 11 Jan 2026 (small business deadline 11 Jul 2026). EU REACH 2.0 PFAS restriction final rule expected Spring 2026. State-level bans (California, Minnesota) creating fragmented patchwork. Unambiguously demand-positive for LC-MS/MS instruments and consumables — Waters explicitly flagged PFAS as a double-digit growth driver.",
      },
      {
        title: "Semiconductor capex — the single largest applied driver",
        text: "TSMC 2026 capex $52–56B, +27–37% YoY vs $40.9B 2025; FY26 revenue guidance raised to 'above 30%' growth. Samsung 2026 capex ~110 trillion won (~$73–74B total) with ~$40B pure semiconductor capex, up from 47.5T won 2025. Intel 2026 capex flat-to-down — the laggard. Total industry capex ~$200B, +20% YoY; memory leading. Bruker is most direct beneficiary; TMO exposure runs through electron microscopy (Verios/Helios SEM, Krios cryo-TEM) and analytical chemistry for failure analysis.",
      },
      {
        title: "Battery / EV materials testing",
        text: "Cooling vs 2023 peak; Agilent materials sub-segment +>20% indicates underlying chemistry still robust.",
      },
      {
        title: "Forensics / homeland security",
        text: "US DHS and federal law enforcement budgets stable.",
      },
    ],
    customerCapacity: "Top-20 industrial customers (semiconductor fabs, food multinationals, EPA-regulated municipal water utilities): balance sheets strong, capex appetite up. Mid-cap industrials cautious on capex but regulatory drivers (PFAS, food safety) are mandatory spend. Capacity adequate, with sub-pockets (semi metrology) expanding.",
    scorecard: {
      demand: "Stable → Accelerating (semi metrology + PFAS bright spots)",
      capacity: "Adequate",
      fy26: "+3% to +4%",
      fy27: "+4% to +5%",
      swing: [
        "Middle East war duration and tariff escalation",
        "Sustained semiconductor capex cycle through 2027",
        "PFAS regulatory enforcement timeline",
      ],
    },
  },

  diagnostics: {
    id: "diagnostics",
    name: "Diagnostics & Healthcare",
    weight: 13,
    color: "#EA580C",
    headline: "Flat. Weak respiratory comp + China VBP weighing.",
    whatTMOSells: "Specialty Diagnostics segment (~$4.5B FY25): transplant diagnostics (HLA typing), microbiology, allergy/autoimmunity (ImmunoCAP), clinical chemistry. Limited contribution from other segments via anatomical pathology slides/reagents. TMO's smallest bucket but also the lowest-growth structurally.",
    q1Read: "Specialty Diagnostics revenue declined 1% reported, −3% organic. Management cited a 'weaker respiratory season.' Operating margin actually improved 90 bps to 27.4% on productivity and mix — useful for the EPS story but not the multiple story.",
    peerCheck: [
      { peer: "LabCorp",          ticker: "LH",   signal: "Diagnostics +5.0% (org ~3%)", detail: "Organic volume +1.1% (weather ~50bps drag); requisitions +3% incl. acquisitions. Specialty testing (onc, neuro, autoimmune) growing 2–3x market rate.", color: "positive" },
      { peer: "Quest",            ticker: "DGX",  signal: "+9.2% (org +9.0%)",            detail: "Organic requisitions +10.8%; ex-Corewell/Fresenius volume +3.8%, revenue/req +2.5%. 'Growth was strong across the board, broad based across all segments.'", color: "positive" },
      { peer: "Roche Diagnostics", ticker: "ROG", signal: "+3% CER (ex-China +5%)",       detail: "APAC −5% CER on China healthcare pricing reforms. 'Diminished but continuing headwinds in China for 2026.'", color: "neutral" },
      { peer: "QuidelOrtho",      ticker: "QDEL", signal: "Weak respiratory",             detail: "'Preliminary revenue primarily driven by a weaker respiratory season, with US ILI visits down ~30% YoY.'", color: "negative" },
      { peer: "Bio-Rad Clin Dx",  ticker: "BIO",  signal: "−4.1% cc",                     detail: "$11M direct hit from Middle East conflict (EMEA).", color: "negative" },
      { peer: "Revvity Dx",       ticker: "RVTY", signal: "+8% reported",                 detail: "Announced divestiture of China Immunodiagnostics (6% of FY25 revenue) on policy/pricing pressure.", color: "neutral" },
    ],
    leadingIndicators: [
      {
        title: "US hospital capex (all FY26 guidance reaffirmed Q1 2026)",
        text: "HCA Healthcare FY26 capex guide $5.0–5.5B; Q1 spend $1.119B; operating cash flow $2.0B. Tenet FY26 capex guide $700–800M; Q1 $180M. UHS FY26 capex guide $950M–$1.1B 'for capital equipment, construction of new facilities, and renovations and expansions at existing hospitals'; Q1 $217M. US hospital capex is stable to up — supportive of routine reagent and analyzer demand.",
      },
      {
        title: "Reference lab volumes",
        text: "LabCorp +1.1% organic volume / Quest +3.8% organic (ex-acquisitions) is a healthy mid-cycle reading.",
      },
      {
        title: "China VBP / anti-corruption",
        text: "Continued headwind. Roche Diagnostics CEO expects 'mid-single digits' growth in 2026 with 'diminished but continuing headwinds in China for 2026.' Per Mordor Intelligence's 2026 China IVD report, provincial tenders have cut reagent prices by up to 90%; Jiangxi 2025 biochemical-reagent VBP cut average selling prices by 72%, immunoassay reagent prices falling to CNY 3–5/test from CNY 15–20. Revvity's China Immunodiagnostics divestiture (6% of total revenue) is direct read-through.",
      },
      {
        title: "NMPA GMP update",
        text: "Effective 1 Nov 2026 — adds compliance cost for IVD manufacturers in China.",
      },
      {
        title: "European NHS",
        text: "Capex flat to slightly up; no major catalyst.",
      },
    ],
    customerCapacity: "US hospitals (HCA, Tenet, UHS, NFP systems) adequate; operating cash flow healthy, capex budgets reaffirmed. US reference labs (LabCorp, Quest) strong — both generating FCF and acquiring (Corewell, Fresenius). China hospitals constrained with no visible relief in 12–24m horizon. European hospitals adequate.",
    scorecard: {
      demand: "Stable (respiratory normalises Q2+; underlying volumes healthy)",
      capacity: "Adequate ex-China · Constrained in China",
      fy26: "0% to +1%",
      fy27: "+2% to +3%",
      swing: [
        "Respiratory season Q4 2026 / Q1 2027",
        "Acceleration in China policy pressure (further VBP rounds)",
        "Transplant volumes (TMO franchise-specific)",
      ],
    },
  },
};

// ─── CROSS-BUCKET SYNTHESIS ───
export const synthesisMath = [
  { bucket: "Pharma & Biotech",          weight: 57, range: "+5.0% to +6.0%",  contribLow: 2.85, contribHigh: 3.42, color: "#1D4ED8" },
  { bucket: "Academic & Government",     weight: 17, range: "−2.0% to −1.0%",  contribLow: -0.34, contribHigh: -0.17, color: "#9333EA" },
  { bucket: "Industrial & Applied",      weight: 13, range: "+3.0% to +4.0%",  contribLow: 0.39, contribHigh: 0.52,  color: "#059669" },
  { bucket: "Diagnostics & Healthcare",  weight: 13, range: "0.0% to +1.0%",   contribLow: 0.00, contribHigh: 0.13,  color: "#EA580C" },
];

export const synthesisTotal = { lo: 2.9, hi: 3.9, street: "3–4%", bullCase: 4.5 };

export const wrongUpside = "Pharma & Biotech / Bioproduction. Setup mirrors 2017–2018, when bioproduction equipment orders led consumables by 2–3 quarters and tools-name P/Es expanded materially. If TMO's bioproduction revenue compounds at 8–10% in H2 2026 and FY27 (vs Street ~5–6%), consensus EPS for 2027 ($27.26) is 5–8% too low. Most asymmetric position in the name.";

export const wrongDownside = "Diagnostics & Healthcare. Bio-Rad, Roche, QuidelOrtho all showed China structural pressure compounding with respiratory weakness. TMO transplant diagnostics is differentiated, but headline Specialty Diagnostics segment may underperform Street ~$4.5B FY26 estimate by 1–2%.";

export const wrongSymmetric = "Academic & Government. Street appears to have correctly priced the headwind; risk is roughly symmetric.";

// ─── BIOPRODUCTION DURABILITY ───
export const bioprodDurability = [
  { title: "Consumables growing organically at all four major suppliers", text: "Cytiva HSD with China DD; Sartorius BPS +8.1% cc; Merck Process Solutions +16% (normalised ~10% H2); Repligen consumables DD; TMO LSS organic +1% but explicitly led by bioproduction." },
  { title: "Equipment is now inflecting up",                              text: "Danaher's +30% YoY equipment orders — the single most important datapoint, first quarter of positive equipment order growth in nearly two years. Sartorius reaffirms equipment H2 > H1. Merck KGaA Process Solutions bookings consistent with FY guide of ~10%." },
  { title: "Drivers are structural, not cyclical bounce-back",            text: "GLP-1 capacity (Lilly $27B + Novo DKK 55B 2026 capex), ADC pipeline expansion, CGT manufacturing build-out, US reshoring under Section 232 (~$400B announced). Brownfield happening now; greenfield to follow." },
  { title: "No evidence of a second leg of destocking",                   text: "Sartorius, Repligen, Cytiva all flagged consumables order patterns as 'normalized' with book-to-bill near 1.0 — healthy, not concerning, given shorter consumable lead times." },
  { title: "China is recovering",                                          text: "Danaher 'notable strength in China' with DD bioprocessing; Repligen China nearly doubled; Merck KGaA APAC-led; Waters >+50%." },
];

// ─── RECOMMENDATION ───
export const recHeadline = "Constructive but not deeply convinced. Buy on weakness, not at current levels.";
export const recRationale = "At $438.34, 16.1x 2027E and 14.5x 2028E (Bloomberg consensus EPS), TMO is at a meaningful discount to its historical mid-20s multiple. The bucket-by-bucket evidence supports the directional thesis but does not support the multiple-expansion thesis until the bioproduction equipment order signal flows through TMO's own disclosures (TMO does not break out bioproduction order growth — Danaher does).";

export const recActions = [
  { stage: "Initial", weight: "50%", text: "Build to 50% of target weight. Bucket-weighted organic is at the high end of consensus 3–4%, bioproduction signal corroborated by five independent peers (DHR, SRT, MRK GR, RGEN, Cytiva).", color: "#10B981" },
  { stage: "Add",     weight: "→100%", text: "On (i) Q2 2026 print showing acceleration in LSS organic to ≥3%, OR (ii) Q3 2026 print confirming bioproduction equipment order strength: build to 100% of target.", color: "#1D4ED8" },
  { stage: "Trim",    weight: "Exit", text: "Bioproduction consumables decel below 5% organic at SRT/Cytiva/RGEN · IQVIA RDS NNB < $2.0B/Q or b-t-b < 1.0 · ICR cap legal/legislative pathway reopens · MFN capex commitment reversals.", color: "#EF4444" },
];

export const upsideBenchmarks = [
  "TMO Pharma & Biotech bucket reported organic > 6% in any 2 consecutive quarters → reprice 2027 EPS to $29–30 (vs Street $27.26).",
  "Danaher Bioprocessing equipment orders sustaining > 20% YoY through Q3 2026 → confirms cycle is multi-year.",
  "IQVIA TTM book-to-bill > 1.15x → confirms clinical research backlog conversion.",
];

export const pairTrades = [
  { side: "Long TMO / Short Bio-Rad", text: "Bio-Rad process chromatography weakness vs industry strength is anomalous; FY26 guide cut to −3% to +0.5% cc revenue is worst tools guidance in the cohort." },
  { side: "Long TMO / Short MTD",     text: "On bioprocessing exposure asymmetry — less defensible. Mettler bioprocessing is small but growing nicely; better as a hedge than a paired short." },
];

// ─── CAVEATS ───
export const caveats = [
  "Q1 PMI distortion explicitly flagged by S&P Global. Chris Williamson cautioned April 2026 PMI 54.5 reflects stockpiling ahead of feared price rises — a 'short-term boost that could fade.' Real underlying demand likely closer to PMI 52.",
  "Merck KGaA Process Solutions +16% includes pull-forward. Management cautioned APAC customers brought forward orders; H2 will normalise to ~10%. Don't extrapolate Q1 linearly.",
  "MFN / Section 232 is incompletely modelled. Subject to ongoing litigation, congressional codification attempts, and confidential side deals. White House '$400B' in announced commitments is gross, not net of cancellations, and multi-year deployment.",
  "TMO does not disclose a bioproduction equipment order book-to-bill (unlike Danaher, Sartorius, Merck KGaA). Inference from peers is high-confidence but indirect.",
  "FY27 NIH ICR overhang reopens in Q3 2026 budget debate. Court win Jan 2026 is a one-cycle reprieve; structural threat of a 15% cap remains in Trump FY27 budget.",
  "Clario integration risk. Contributed only $30M / $0.01 EPS in Q1 stub. The 2026 guide raise is largely Clario-driven; integration disappointment would compress the EPS narrative without changing organic setup materially.",
  "China stimulus is volatile. Agilent's 'minor stimulus' was 30% of last year's GACC program. A stimulus 2.0 could meaningfully change academic/government bucket trajectory in either direction.",
  "Respiratory season modelling is intrinsically uncertain. Q1 2026 miss reflected ~30% lower flu visits YoY per QuidelOrtho; Q4 2026 / Q1 2027 should comp easier but is not predictable.",
  "Specialty Diagnostics margin strength (Q1 +90 bps to 27.4%) is partly mix and productivity, not demand — useful for the EPS story but not the multiple story.",
  "Bio-Rad's $738M GAAP loss in Q1 was driven by Sartorius equity stake mark-down — be careful interpreting GAAP comparables across the tools cohort.",
  "Endowment data lag. The 10.9% FY25 average return reflects fiscal years ending June 2025; capex decisions tied to FY25 endowment performance flow into instrument bookings primarily in H2 calendar 2026 and 2027 — supportive A&G signal will improve later than the bucket scorecard currently models.",
];
