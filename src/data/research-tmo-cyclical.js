// TMO — Cyclical Trough KPIs
// Indicators that suggest the life-sciences-tools downturn is troughing.
// Sources: Sartorius Q1 2026 release, KeyBanc sector note Dec 2025, BI, S&P, PitchBook 4Q25.

export const cyclicalIntro = "The bear case rests on the assumption that the post-COVID tools downturn is structural. The bull case rests on the assumption that it's a cyclical destock that is now troughing. This page collects the indicators that materially favour the cyclical-trough read. None is conclusive in isolation. Taken together they build a credible picture that the worst of the destocking and biotech-funding winter is behind us, and that 2026 is the inflection year.";

/* ═══════════════════════════════════════════
   HEADLINE TROUGH SIGNALS
   ═══════════════════════════════════════════ */
export const troughSignals = [
  {
    name: "Sartorius bioprocess consumables back to high single digit",
    metric: "+9-10%",
    period: "Q1 2026 constant currency",
    direction: "up",
    detail: "Sartorius Stedim Biotech (the cleanest bioprocessing pure-play and a leading indicator for Thermo Fisher Bioproduction) reported Q1 2026 group revenue +7.5% cc with the Bioprocess Solutions division up ~9% on consumables strength and North American order momentum. Management framed Q4 2025 order intake as 'on par with exceptionally strong Q4 2024' and said the company entered 2026 with a strong order book. Book-to-bill 'well above 1'. This is the most important external read-through.",
    importance: "high",
  },
  {
    name: "TMO Bioproduction +20% YoY in Q3 2025",
    metric: "+20%",
    period: "Q3 2025",
    direction: "up",
    detail: "Per KeyBanc sector note (Dec 2025), Thermo Fisher's Bioproduction sub-business grew 20% YoY in Q3 2025 — far above the corporate organic run rate. The Q1 2026 print continued the strength: Life Sciences Solutions delivered +13% reported / +4% organic with management calling out 'another quarter of excellent growth' in Bioproduction. Bioproduction is the highest-quality part of the business and the cleanest read on customer biologics capex.",
    importance: "high",
  },
  {
    name: "Danaher bioprocessing consumables high single digit",
    metric: "HSD%",
    period: "Q4 2025 / FY26 guide",
    direction: "up",
    detail: "Danaher (Cytiva) confirmed bioprocessing consumables back to high-single-digit growth in late 2025 and held that view into 2026 guidance. FY26 core revenue guide of 3-6% is conservative versus what consumables-strength alone would imply. Capital equipment remains flat — this is the standard cycle pattern (consumables turn first, equipment lags 2-3 quarters).",
    importance: "high",
  },
  {
    name: "Destocking explicitly described as over",
    metric: "Cycle stage",
    period: "Late 2025 / Q1 2026",
    direction: "up",
    detail: "S&P Global commentary on Sartorius (Aug 2025): 'phase-out of customer destocking' supporting 6.5-7.5% revenue growth in 2025 and 8.5-9.0% in 2026. Danaher analyst commentary (Feb 2026): 'the inventory destocking that plagued 2023 is over'. KeyBanc (Dec 2025) titled their sector piece around recovery for 2026, citing 'after three challenging years marked by destocking and funding constraints, the sector showed signs of recovery in Q3 2025 earnings'. The language has shifted from 'destocking is easing but not fully completed' (April 2025) to 'destocking is over' (early 2026).",
    importance: "high",
  },
  {
    name: "XBI up 35-36% in 2025",
    metric: "+35-36%",
    period: "Calendar 2025",
    direction: "up",
    detail: "The S&P Biotech ETF (XBI) finished 2025 up roughly 35-36% — outpacing the S&P 500 (+16%) and Nasdaq (+20%). XBI hit $120 in Q4 2025, a level not seen since the 2021 bubble peak. Biotech equity strength is the leading indicator for biotech R&D budgets and capital equipment purchases (typically 6-9 month lag). The strength has continued into 2026 with XBI near 52-week highs in April.",
    importance: "high",
  },
  {
    name: "Biotech IPO window reopened",
    metric: "$1.2bn / 3 days",
    period: "February 2026",
    direction: "up",
    detail: "Four biotech IPOs raised $1.2bn in three days in February 2026. Eikon Therapeutics led with a $381m offering — the largest biotech IPO since 2024. After the 2022-2023 IPO drought and muted 2025 (just 4% of total IPO proceeds), the window is now meaningfully open. This recycles capital back to VCs and funds the next leg of biotech R&D spending.",
    importance: "medium-high",
  },
  {
    name: "Blackstone Life Sciences Fund VI closed at $6.3bn",
    metric: "$6.3bn",
    period: "Q1 2026",
    direction: "up",
    detail: "Blackstone Life Sciences raised its sixth fund at $6.3bn in Q1 2026 — a new benchmark for the sector and a signal of confidence in deploying large-scale capital. This adds meaningful dry powder to a sector that had been capital-starved through 2023-2024. Biopharma VC deal value rose for the second consecutive quarter in Q4 2025.",
    importance: "medium",
  },
  {
    name: "Repligen — three consecutive quarters of DD top-line growth",
    metric: "Three quarters",
    period: "Q3 25 - Q1 26",
    direction: "up",
    detail: "Repligen — a small-cap bioprocessing pure-play with very high beta to the cycle — has reported three consecutive quarters of double-digit top-line growth per KeyBanc. The small caps typically lead larger players by one to two quarters because their order book is shorter-duration and more sensitive to incremental demand. This is a credible early signal.",
    importance: "medium",
  },
  {
    name: "Biopharma VC deal value rising — concentration into later stage",
    metric: "$24.6bn / 2025",
    period: "Full year 2025",
    direction: "stable-up",
    detail: "Biopharma VC raised $24.6bn in 2025 (vs $27.8bn in 2024) — broadly stable, but concentration shifted into larger, later-stage rounds. 80 venture rounds surpassed $100m in 2025. PitchBook's Q4 2025 read was 'continued, albeit disciplined' recovery in 2026. Capital is more disciplined than in 2021 — concentrated on de-risked clinical assets — but it is flowing.",
    importance: "medium",
  },
  {
    name: "Capital equipment lag — still bottoming",
    metric: "Flat",
    period: "Q1 2026",
    direction: "stable",
    detail: "The honest data point on the other side of the trough thesis: capital equipment sales (large one-time purchases of instruments) remain flat in early 2026. Danaher and Sartorius both flagged this. This is the standard cycle pattern (consumables turn first, equipment lags 2-3 quarters), but it means TMO's Analytical Instruments segment will likely continue to drag corporate organic growth in the near term even as Bioproduction accelerates.",
    importance: "medium",
  },
];

/* ═══════════════════════════════════════════
   PRIOR-CYCLE COMPARISON
   How long do destock cycles last?
   ═══════════════════════════════════════════ */
export const priorCycle = {
  intro: "Historical perspective. The 2008-09 destocking cycle in life sciences tools lasted roughly 5-6 quarters. The 2015-16 China austerity cycle lasted roughly 6-7 quarters. The current post-COVID destocking cycle has now run roughly 10-12 quarters depending on how you date its start (late 2022 / early 2023). It is one of the longest destocking cycles on record for the sector — explained by the unusually large COVID-era pull-forward demand and the additional overlay of biotech funding winter and China austerity. The fact that we are now seeing consumables-led recovery indicators turning across multiple players suggests we are at the late stage of an extended cycle rather than the early stage of a new structural decline.",
  cycles: [
    { period: "2008-09 GFC destock", length: "5-6Q", trigger: "Lehman / global recession", recovery: "V-shaped — consumables back in ~9 months" },
    { period: "2015-16 China austerity", length: "6-7Q", trigger: "China healthcare procurement clampdown", recovery: "U-shaped — China remained drag for ~2 years" },
    { period: "2022-2026 post-COVID destock", length: "10-12Q (in progress)", trigger: "COVID pull-forward unwind + biotech funding winter + China austerity overlay", recovery: "Now (consumables turning Q4 25 / Q1 26)" },
  ],
};

/* ═══════════════════════════════════════════
   WHAT WOULD CONFIRM OR INVALIDATE
   ═══════════════════════════════════════════ */
export const confirmInvalidate = {
  confirm: [
    "Q2 2026 print at or above 3% organic for TMO (late July 2026)",
    "Sartorius Q2 2026 book-to-bill stays >1.0x — confirms order momentum sustaining",
    "TMO Analytical Instruments organic turns positive — confirms equipment lag closing",
    "China commentary turns incrementally less negative on Q2 calls",
    "Biotech IPO cadence sustains into H2 2026 (vs February burst fading)",
  ],
  invalidate: [
    "Q2 2026 TMO print delivers another 'underlying is better than reported' explanation",
    "Sartorius equipment business deteriorates further (cycle taking another leg down)",
    "China imposes new dual-use restrictions on advanced instruments",
    "Biotech IPO window closes again (a la 2022 retracement)",
    "NIH funding cuts crystallise in actual academic capex reduction",
  ],
};
