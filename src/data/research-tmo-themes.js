// TMO — Thematic Case Data
// Five long-term themes, platform thesis, EPS bridge, structural risks,
// Bull vs Bear synthesis

export const themesHeroStats = [
  { value: "5", label: "Secular themes underwriting the multi-year story", color: "deepBlue" },
  { value: "60%+", label: "Of pharma pipeline now biologics (versus <20% twenty years ago)", color: "green" },
  { value: "$60B+", label: "Lilly + Novo combined GLP-1 manufacturing capex commitment", color: "capRed" },
  { value: "$2B", label: "Thermo Fisher US reshoring investment (2027-2029 payoff window)", color: "orange" },
  { value: "9-12%", label: "Modelled long-term EPS CAGR (revenue + margin + buyback)", color: "purple" },
  { value: "1 contract", label: "The integrated platform pitch — one vendor for the full stack", color: "deepBlue" },
];

export const themesIntro = "Stepping back from the in-quarter noise, the long-term case for Thermo Fisher rests on five interlocking secular tailwinds. The relevant question is not whether these themes exist — they are well-rehearsed in the literature — but whether Thermo Fisher is uniquely positioned to monetise them. The answer depends on whether you view the company as a collection of independent businesses or as an integrated platform. The platform thesis is the crucial unifying argument.";

/* ═══════════════════════════════════════════
   FIVE SECULAR THEMES
   ═══════════════════════════════════════════ */
export const themes = [
  {
    name: "Biologics manufacturing supercycle",
    color: "#1D4ED8",
    summary: "The shift from small molecules to biologics is mid-cycle and the manufacturing capex implications are enormous.",
    primary: "Bioproduction (Gibco, HyClone) plus Patheon biologics drug substance and fill-finish.",
    intro: "The shift in pharmaceutical industry mix from small molecules to biologics is the single most important structural driver for Thermo Fisher, and it is still mid-cycle. Roughly 60 percent of the pharma development pipeline is now biologics (versus less than 20 percent twenty years ago), and the gap is widening because of monoclonal antibodies, antibody-drug conjugates, cell and gene therapy, mRNA platforms, and now GLP-1 peptides at industrial scale.",
    detail: "Biologics manufacturing economics are completely different from small molecules. A small molecule plant might cost $200-500 million and uses commodity chemistry. A modern biologics facility costs $2-5 billion and requires specialised cell culture media, single-use bioreactor systems, downstream purification (chromatography resins, filtration), and aseptic fill-finish capacity — exactly Thermo Fisher's bioproduction and Patheon footprint. Industry capex on biologics manufacturing capacity is running at 15-20 percent annual growth and has been since the late 2010s.",
    subthemes: [
      { name: "GLP-1 peptide manufacturing scale-up", desc: "Lilly and Novo have committed over $60 billion combined to new manufacturing capacity. Roche, Pfizer, AstraZeneca, Amgen entering the space will follow. Every gram of GLP-1 peptide needs cell culture media, fill-finish capacity, and commercial supply chain infrastructure." },
      { name: "Antibody-drug conjugates", desc: "ADCs are the highest-growth modality in oncology and require specialised conjugation chemistry and fill-finish. Patheon has been positioning here through targeted capability expansion." },
      { name: "Cell and gene therapy", desc: "Brammer Bio (acquired 2019 for $1.7 billion) gave Thermo Fisher viral vector manufacturing capability. CGT is small in absolute revenue today but among the fastest-growing manufacturing modalities." },
      { name: "mRNA and next-gen vaccines", desc: "The COVID-era mRNA infrastructure (which Thermo Fisher served via partnerships with Pfizer and Moderna) is being repurposed for cancer vaccines, RSV, and other emerging applications." },
    ],
    conclusion: "This is the cleanest long-term thesis for Thermo Fisher. The company is one of three global oligopolists in bioproduction tools (with Cytiva and Sartorius), and the customer base — global biopharma — is investing in capacity at a multi-decade high. The arms dealer position via Bioproduction is the highest-quality way to capture this; the Patheon CDMO position is meaningful but secondary.",
  },
  {
    name: "Pharma services outsourcing (CDMO megatrend)",
    color: "#059669",
    summary: "Big pharma has been progressively shifting from in-house manufacturing to outsourcing, and the trend is accelerating.",
    primary: "Patheon (Pharma Services).",
    intro: "Big pharma has been progressively shifting from 'make everything in-house' to 'outsource non-core manufacturing' for thirty years, and the trend is accelerating. The economic logic is straightforward — molecule launches are increasingly biologic, increasingly complex, increasingly geographically dispersed, and increasingly require specialised capabilities that do not justify in-house buildout for any single asset.",
    detail: "Patheon (acquired 2017 for $7.2 billion) is now one of the largest CDMOs globally, with end-to-end capabilities from drug substance to drug product to commercial packaging. The new Sanofi sterile fill-finish site in New Jersey adds modern aseptic capacity exactly where the industry needs it most for GLP-1 peptides and biologics in pre-filled syringes. The CDMO market is growing high single digits structurally, and consolidation is rewarding the scale leaders.",
    subthemes: [
      { name: "Sterile fill-finish capacity scarcity", desc: "Global aseptic fill-finish capacity is genuinely scarce. The Sanofi New Jersey acquisition gave Thermo Fisher state-of-the-art capacity in the US market." },
      { name: "China decoupling tailwind", desc: "The BIOSECURE Act and broader US-China decoupling makes Wuxi Biologics less politically viable for Western pharma. This is a clear secular tailwind for Western CDMOs including Patheon." },
      { name: "Smaller CDMOs being squeezed", desc: "Quality and capability requirements are pushing pharma toward fewer, larger CDMO relationships. TMO, Lonza, Samsung Biologics, and post-Novo Catalent emerging as the anchor providers." },
    ],
    conclusion: "Patheon is the number three or four player in biologics drug substance globally — strong but not dominant. Where Patheon is stronger is sterile fill-finish (especially with the Sanofi NJ deal), packaging, small molecule, and integrated clinical-to-commercial supply. A meaningful contributor to the manufacturing exposure but secondary to the Bioproduction arms dealer position.",
  },
  {
    name: "Drug development outsourcing and decentralisation (CRO and eClinical)",
    color: "#EA580C",
    summary: "Pharma is outsourcing more clinical trial operations to specialists with global infrastructure and digital capabilities.",
    primary: "PPD plus Clario.",
    intro: "PPD (acquired 2021 for $20.9 billion) and now Clario (closing 2026 at approximately $9 billion) anchor Thermo Fisher's clinical research franchise. The thematic logic mirrors CDMO outsourcing but on the development side: pharma is outsourcing more of its clinical trial operations to specialists who have global infrastructure, patient recruitment networks, regulatory expertise, and data systems.",
    detail: "The Clario angle is particularly interesting. Clario provides electronic clinical outcome assessment (eCOA), wearable device integration, cardiac and respiratory monitoring, medical imaging, and digital biomarker capture. This is the infrastructure for the secular shift from site-based to decentralised clinical trials. The decentralised trial market is one of the highest-growth segments in clinical research, and Clario combined with PPD's site network gives Thermo Fisher end-to-end clinical capabilities that few competitors can match.",
    subthemes: [
      { name: "Decentralised and hybrid trials", desc: "Pharma is increasingly running trials with remote or hybrid designs, requiring digital infrastructure for patient engagement, data capture, and endpoint measurement. Clario is purpose-built for this workflow." },
      { name: "Integrated drug development pitch", desc: "Pharma signs one contract for clinical trials + digital endpoints + bioproduction + commercial manufacturing. The 'Accelerator Drug Development' program is the commercial expression of this." },
      { name: "Biotech rebound benefits CROs", desc: "As biotech funding stabilises and pipeline activity picks up, the CRO market reaccelerates. PPD has scale advantages over smaller competitors in capturing this." },
    ],
    conclusion: "PPD plus Clario is one of the top three global CROs alongside IQVIA and ICON. The integration thesis with Bioproduction and Patheon is what makes this strategically distinctive — competitors lack the equivalent footprint. This is also the closest Thermo Fisher has to an 'AI in pharma' story.",
  },
  {
    name: "Personalised medicine, diagnostics and precision oncology",
    color: "#9333EA",
    summary: "The shift from blockbusters to targeted therapies drives demand across multiple Thermo Fisher businesses.",
    primary: "Specialty Diagnostics, Genetic Sciences, and selected analytical instruments.",
    intro: "The shift from blockbuster drugs to targeted therapies, companion diagnostics, and precision medicine creates demand for the full Thermo Fisher toolkit — next-generation sequencing (Ion Torrent), qPCR (Applied Biosystems), mass spec (proteomics and metabolomics), molecular diagnostics. Specialty Diagnostics (10 percent of revenue) is the smallest segment but has moats in transplant diagnostics, allergy testing (ImmunoCAP), and immunodiagnostics that compound quietly.",
    detail: "The precision oncology angle specifically — liquid biopsy infrastructure, minimal residual disease monitoring, companion diagnostics for the wave of targeted oncology drugs — drives demand across both the research portion of Life Sciences Solutions (Biosciences, Genetic Sciences) and the diagnostics business. It is a tailwind that does not get top billing in the bull case but supports mid-single-digit growth across multiple businesses.",
    subthemes: [
      { name: "Companion diagnostics", desc: "Every new targeted therapy increasingly requires a paired diagnostic test. Thermo Fisher participates through Applied Biosystems and Specialty Diagnostics." },
      { name: "Liquid biopsy and MRD monitoring", desc: "Blood-based monitoring of disease and treatment response is one of the fastest-growing diagnostic categories." },
      { name: "Newborn screening and clinical mass spec", desc: "Orbitrap and triple quadrupole mass spectrometry expanding from research applications into clinical diagnostics." },
    ],
    conclusion: "A genuine but lower-leverage theme for Thermo Fisher. The company participates broadly but is not a leader in any specific precision medicine sub-market the way it is in bioproduction or analytical instruments. Supports the multi-year growth algo without being a dominant driver.",
  },
  {
    name: "US reshoring of pharmaceutical manufacturing",
    color: "#0EA5E9",
    summary: "Multiple structural forces are pushing pharma manufacturing back onshore. Thermo Fisher is positioned to capture disproportionate share.",
    primary: "Patheon (Pharma Services) plus US-based Bioproduction capacity.",
    intro: "This is a newer but increasingly central theme. Multiple structural forces are pushing pharma manufacturing back onshore — the BIOSECURE Act and broader China decoupling, Trump tariff overhang on pharmaceutical imports, EU and UK supply security concerns, MFN drug pricing politics making it more attractive to be seen as a domestic manufacturer, and pandemic-era lessons about supply chain fragility.",
    detail: "Thermo Fisher has been very deliberate about positioning here. Significant commitments to reshoring manufacturing operations within the United States — including approximately $2 billion in announced capacity investment — are expected to drive above-trend growth from 2027 to 2029. The Sanofi New Jersey fill-finish acquisition fits this thesis exactly. If US pharma reshoring is a five-to-ten year capex cycle, Thermo Fisher is sized to capture a disproportionate share, and the recent ramp in capex (from approximately $260 million in 2021 to approximately $2.2 billion in 2025) is largely about positioning for this.",
    subthemes: [
      { name: "BIOSECURE Act passage", desc: "Restricting US pharmaceutical sponsors from using certain Chinese CDMOs creates direct shift in CDMO contracts to Western providers." },
      { name: "Tariff and supply security overlay", desc: "Tariff threats and pandemic supply lessons reinforce the structural shift even without legislative action." },
      { name: "MFN pricing politics", desc: "Drug pricing pressure makes domestic manufacturing politically protective, accelerating reshoring decisions at large pharma sponsors." },
    ],
    conclusion: "This is potentially the most underappreciated theme in the long-term story because it is specific to the US-listed CDMO platform and does not benefit competitors that lack a domestic footprint (Wuxi, Samsung, even Lonza to some extent). Payoff window is 2027-2029.",
  },
];

/* ═══════════════════════════════════════════
   PLATFORM THESIS — THE UNIFYING ARGUMENT
   ═══════════════════════════════════════════ */
export const platformThesis = {
  intro: "The single most important point for the long-term case is not any individual theme — it is that Thermo Fisher is the only player that touches all of them under one roof. A big pharma company building out a biologic launch needs cell culture media (Bioproduction), clinical trial operations (PPD), digital endpoints (Clario), drug substance manufacturing (Patheon), fill-finish (Patheon), commercial packaging (Patheon), companion diagnostics (Specialty Diagnostics), and ongoing lab supplies (Fisher channel). Thermo Fisher can quote all of it. Competitors win individual pieces — Cytiva on bioproduction, IQVIA on CRO, Lonza on CDMO, Roche on diagnostics — but no one else has the full stack.",
  stages: [
    { name: "Drug discovery", tmoOffer: "Invitrogen reagents, mass spec, cryo-EM, Fisher distribution channel" },
    { name: "Preclinical development", tmoOffer: "Analytical services through PPD preclinical labs, instruments, reagents" },
    { name: "Clinical trials", tmoOffer: "PPD trial operations + Clario digital endpoints (one of top 3 CROs globally)" },
    { name: "Process development", tmoOffer: "Gibco cell culture media, HyClone bioreactor systems, Patheon process development" },
    { name: "Commercial drug substance", tmoOffer: "Bioproduction inputs to every manufacturer + Patheon contract manufacturing" },
    { name: "Sterile fill-finish", tmoOffer: "Patheon (recently expanded with Sanofi NJ site)" },
    { name: "Quality control", tmoOffer: "Orbitrap mass spec, HPLC, electron microscopy for biologics characterisation" },
    { name: "Companion diagnostics", tmoOffer: "Specialty Diagnostics, Applied Biosystems" },
  ],
  insight: "The strategic logic is 'primary supplier consolidation' — pharma customers reducing the number of vendor relationships and increasingly preferring fewer, deeper relationships. Thermo Fisher is structurally on the winning side of that trend. Management's 'trusted partner' framing on every call is essentially the platform thesis dressed in corporate language. The 2026 Clario acquisition specifically doubles down on this — Thermo Fisher is betting that the cross-sell across bioproduction, pharma services, and clinical research is valuable enough to justify maintaining the complete portfolio rather than spinning off pieces for higher pure-play valuations.",
};

/* ═══════════════════════════════════════════
   EPS BRIDGE — LONG-TERM ALGO
   ═══════════════════════════════════════════ */
export const epsBridge = {
  intro: "How the long-term EPS algorithm decomposes. Each component is reasonably defensible on its own; the combined 9-12 percent EPS CAGR is roughly where 2027-2029 consensus sits.",
  components: [
    { name: "Organic revenue growth", value: 4.5, color: "#1D4ED8", note: "4-6 percent through-cycle target. Higher in Bioproduction and Patheon (high single to low double digits), mid-single in Analytical Instruments and Specialty Diagnostics, low-single in Fisher Scientific channel. Reacceleration thesis depends on bioproduction recovery delivering above-trend growth into 2027-2029." },
    { name: "Margin expansion", value: 1.5, color: "#059669", note: "50-75bp annually via PPI Business System, mix shift toward higher-margin Bioproduction and Patheon fill-finish, integration synergies from PPD and Clario. Modest by industrial standards but compounds meaningfully over time." },
    { name: "Inorganic contribution", value: 1.5, color: "#EA580C", note: "Strategic bolt-on M&A maintaining the platform breadth. Patheon, PPD, Clario have each added meaningful revenue and margin contribution. Bear interpretation: 'buying growth' rather than organic. Bull interpretation: capital allocated to highest-return uses." },
    { name: "Buyback contribution", value: 1.5, color: "#9333EA", note: "$5 billion authorisation in November 2025 plus historical $4 billion annual run-rate. At depressed multiples, buyback contribution to per-share EPS is amplified — every $1 billion spent buys back ~0.2 percent of shares at current valuation." },
    { name: "Long-term EPS CAGR", value: 9, color: "#0F172A", note: "Composite of organic + margin + buyback (mostly), with inorganic providing some incremental upside. 9-12 percent range maps reasonably well to consensus EPS growth across 2026E-2029E." },
  ],
  scenarios: {
    base: { eps: 40, multiple: 18, price: 720, note: "Base case: 9 percent EPS CAGR delivers ~$40 EPS by 2029, re-rate to historical mid-cycle 18x P/E implies ~$720 share price. Roughly 65 percent upside from current $438." },
    bull: { eps: 45, multiple: 22, price: 990, note: "Bull case: 11 percent EPS CAGR plus full re-rate to historical premium 22x P/E implies ~$990. ~125 percent upside. Requires bioproduction reacceleration to mid-teens organic growth, Clario delivering accretively, US reshoring driving above-trend growth 2027-2029." },
    bear: { eps: 33, multiple: 15, price: 495, note: "Bear case: 6 percent EPS CAGR (consensus too high), no multiple re-rate, terminal value impaired by structural headwinds. Roughly 13 percent upside from current — value trap scenario where the cheap multiple turns out to be accurate." },
  },
};

/* ═══════════════════════════════════════════
   STRUCTURAL RISKS TO THE THEMATIC CASE
   ═══════════════════════════════════════════ */
export const thematicRisks = [
  {
    name: "Biologics manufacturing capex slowdown",
    severity: "high",
    description: "If the bioproduction tailwind disappoints — excess capacity has been built, demand growth slows, GLP-1 saturation — the most strategic part of Thermo Fisher disappoints. This is the single biggest risk to the bull case because Bioproduction is where the highest-quality moat and the strongest secular growth coincide. Watch global biologics capacity utilisation, GLP-1 prescription trends versus capacity buildout, and Sartorius prints as leading indicators.",
  },
  {
    name: "Pharma R&D productivity collapse",
    severity: "high",
    description: "If pharma R&D budgets get cut materially — patent cliffs without replacement, MFN pricing erosion, IRA negotiation expansion compressing margins — the customer base shrinks. This affects research consumables, clinical research, and ultimately production. Pharma R&D as a percent of revenue has been stable at 16-19 percent for decades but is not immune to industry economics changing.",
  },
  {
    name: "Commoditisation in research consumables",
    severity: "medium",
    description: "Generic and private label competition in basic lab supplies has eroded distribution margins over time. The Fisher Scientific channel is exposed — it is the lowest-margin part of the company and the most replaceable. Amazon Business and other direct channels could continue squeezing the distribution moat.",
  },
  {
    name: "CDMO and CRO competition intensification",
    severity: "medium",
    description: "Samsung Biologics is building biologics drug substance scale aggressively. Lonza has spun off non-core businesses to focus on biologics. Catalent under Novo will likely be a more focused competitor. IQVIA continues to invest in clinical operations and data infrastructure. Thermo Fisher's scale advantage in services is real but not infinite.",
  },
  {
    name: "Technology disruption in bioprocessing",
    severity: "medium",
    description: "AI-driven drug discovery could shift the economics of clinical development (smaller, more targeted trials). Continuous manufacturing could partially displace traditional batch bioprocess infrastructure. Disruptive bioproduction technologies (microfluidic systems, continuous chromatography, cell-free synthesis) could emerge over a 10-year view. None are imminent threats but each is worth monitoring.",
  },
  {
    name: "Regulatory and political risk on pharma",
    severity: "medium",
    description: "MFN pricing, IRA negotiation expansion, broader pharma rate-cutting in the US and Europe could compress the customer base's profitability and feed through to capex restraint. Less direct than the demand risks but a real overhang on the entire life sciences tools complex.",
  },
];

/* ═══════════════════════════════════════════
   BULL VS BEAR SYNTHESIS
   Symmetric framing of the two cases on Thermo Fisher
   ═══════════════════════════════════════════ */
export const bullBearIntro = "The bull/bear framing for Thermo Fisher is genuinely symmetric — both cases are internally consistent and supported by real evidence. The binary nature of the upcoming catalysts (Investor Day, Q2 print) means the next two to three months will likely tip the balance decisively in one direction. Below is the full symmetric framing of both arguments.";

export const bullCase = {
  intro: "The bull case rests on the gap between current valuation discount and through-cycle multiples, with consensus already modelling the demand inflection — meaning the upside is structurally there if management can credibly bridge in-quarter prints to the algorithm.",
  pillars: [
    {
      name: "The de-rating is multiple, not numbers",
      description: "Consensus has already cut FY26E EPS from ~$32 to ~$25 over the last three years, and estimates have been remarkably stable since mid-2025 despite a string of soft prints. The sell-side is implicitly endorsing the management algorithm. The entire move from ~$640 to ~$438 has been pure multiple compression. At 14.5x 2028 EPS for a name that historically trades mid-20s P/E, you're getting a 30-35% discount to through-cycle multiples on a business whose quality metrics (ROIC mid-teens, ~22% adj operating margin, ~95%+ FCF conversion) haven't deteriorated.",
    },
    {
      name: "Consensus already models the demand inflection",
      description: "EPS Adj growth modelled at 4.6% (FY25A) → 8.8% (FY26E) → 9.6% (FY27E) → 10.6% (FY28E) → 12.6% (FY29E). This isn't blue-sky — it's underpinned by 5-7% revenue growth plus 50-75bp of annual margin expansion via PPI Business System plus buybacks. So you don't need heroic assumptions; you just need management to credibly bridge in-quarter optics to the run-rate trajectory the sell-side has already pencilled in. Wednesday's Investor Day is the platform to do exactly that.",
    },
    {
      name: "End markets are bifurcating in TMO's favour",
      description: "Biopharma — the most important end market (~60% of revenue including bioproduction, pharma services, and clinical research) — is strengthening per management commentary and consistent with Q1 industry trends. Bioproduction normalisation is in the rearview after the 2022-2024 destocking cycle. GLP-1 manufacturing is a secular tailwind for the bioproduction franchise. Clinical research benefits from the biotech funding environment stabilising. The weak segments (analytical instruments into academic and government, China) are the smaller share and the bar to clear is already low.",
    },
    {
      name: "Wide moat with structural switching costs",
      description: "Bioproduction is the canonical example — TMO products are designed into FDA-approved manufacturing processes, and switching requires regulatory refiling. Clinical research has scale economics. Mass spec, electron microscopy and chromatography are duopoly or oligopoly markets with technical barriers. Aftermarket consumables and services drive recurring revenue (~80% of revenue is recurring or consumable in nature), which is exactly the QARP profile.",
    },
    {
      name: "Capital allocation optionality at depressed multiple",
      description: "TMO generates $6B+ FCF annually. At current multiples, buybacks compound EPS faster. The Clario deal demonstrates continued discipline in M&A — clinical research bolt-on with clear strategic fit, accretive in Year 1. Balance sheet capacity to do more — net debt/EBITDA ~3x but de-levering naturally.",
    },
    {
      name: "Catalyst-rich next 60 days",
      description: "Investor Day on 20 May 2026 with medium-term algorithm, capital allocation framework, AI roadmap. Q2 print in late July with the ~3% organic confirmation. Both have positive asymmetry given depressed expectations — even a modestly positive print would force a re-rate.",
    },
  ],
};

export const bearCase = {
  intro: "The bear case is that the discount is accurate rather than opportunistic — that consensus EPS will need to come down further as the demand inflection keeps disappointing, making the cheap multiple a value trap rather than an entry point.",
  pillars: [
    {
      name: "Demand has not actually inflected",
      description: "Q1 organic at 1% was the latest in a multi-quarter string of soft prints. Management has explained each one away — selling days, pharma services phasing, year-on-year comp issues, FX. At some point the cumulative weight of 'timing' explanations starts to look like structural underperformance versus the algorithm. BI's Adeline Zandi captured this: the FY26 guide raise was almost entirely Clario; underlying organic guide unchanged. The bear says ex-Clario you're looking at a 1-2% organic growth business, not 3-4%, and certainly not the 5-6% the back-end of the consensus model assumes.",
    },
    {
      name: "Bioproduction recovery could be smaller and slower than consensus implies",
      description: "The 2021-22 COVID peak created supply-demand imbalances that may take years to fully clear. Biotech funding environment, while improved, is not at peak levels. Inventory destocking at customers may not be fully complete. The 'normalised' run-rate of bioproduction demand could be 20-30% below the peak that's implicitly assumed in the long-term algorithm. If the bioproduction reacceleration delivers 4-5% rather than the 8-10% the bulls assume, the whole Life Sciences Solutions segment growth fails to inflect.",
    },
    {
      name: "Academic and government headwinds are structural, not cyclical",
      description: "NIH funding uncertainty, proposed overhead caps, broader US fiscal pressure on research budgets, China austerity in scientific procurement — these end markets are ~15-20% of revenue, the Analytical Instruments segment is disproportionately exposed, and there's no clear catalyst to inflect. China specifically is in its second or third year of declining instrument demand and the geopolitical overlay limits upside.",
    },
    {
      name: "The valuation trap risk is real",
      description: "14.5x 2028 EPS is only 'cheap' if you believe the 2028 EPS. Look at what happened to 2026E — cut from ~$32 to ~$25 (-22%) over the last three years. If the demand thesis disappoints and consensus has to cut 2027E and 2028E by a similar magnitude, 'true' forward multiples are closer to 18-20x, which is in line with historical averages, not cheap. The bear thinks the sell-side has been slow to mark to market and the next leg of cuts is coming.",
    },
    {
      name: "Margin pressure is building, not easing",
      description: "Q1 2026 adj operating margin was -10bp YoY despite the PPI Business System. Management explicitly flagged 'higher inflation in future quarters that we are actively working to mitigate' — meaning higher inflation is a known headwind. Wage inflation in clinical research is a particular concern given labour-intensive PPD and Clario operations. The 50-75bp annual margin expansion that the algorithm depends on becomes much harder if inflation runs above pricing power.",
    },
    {
      name: "No positioning capitulation",
      description: "Polen and others have been adding. The stock isn't oversold by long-only ownership data — it's in steady accumulation. That means there's no compressed-spring snapback set-up; if demand disappoints, holders have to capitulate, which is a leg-lower scenario rather than a sharp recovery. The 'consensus is too optimistic' trade still has fuel.",
    },
  ],
};

export const tippingPoints = {
  intro: "The bull/bear hinges on a fairly narrow empirical question — does organic growth reaccelerate to the 3%+ range and stay there, validating the consensus algorithm? The next two to three months will provide the binary evidence.",
  points: [
    { event: "Investor Day (20 May 2026)", outcome: "Defended or upgraded medium-term algo", impact: "Bull validation", color: "green" },
    { event: "Investor Day (20 May 2026)", outcome: "Algo trimmed or non-committal", impact: "Bear validation", color: "red" },
    { event: "Q2 2026 print (late July)", outcome: "Organic growth at or above 3%", impact: "Bull validation", color: "green" },
    { event: "Q2 2026 print (late July)", outcome: "Another 'underlying is better than reported' explanation", impact: "Bear validation", color: "red" },
    { event: "Bioproduction order book trends", outcome: "Sartorius prints positive, TMO Bioproduction inflecting", impact: "Bull validation", color: "green" },
    { event: "Bioproduction order book trends", outcome: "Continued sluggish, destock excuses persist", impact: "Bear validation", color: "red" },
  ],
  qarpRead: "For a QARP framework specifically, the quality is unambiguously intact — the moat, returns, FCF, and capital discipline haven't changed. The valuation is now in QARP-attractive territory on consensus. The single open question is growth — and that's a binary near-term event. This is exactly the kind of setup where a small starter ahead of the event, with room to add post-event, is the typical institutional positioning. Polen Capital appears to have done exactly that in Q1.",
};

/* ═══════════════════════════════════════════
   3 LONG-TERM THEMATIC TAILWINDS
   Designed for meeting talking points — visual, focused, dynamic
   ═══════════════════════════════════════════ */

export const tailwindsIntro = "Three structural tailwinds that underwrite the multi-year case for Thermo Fisher. Each is durable (decade-plus), each is independently confirmable from public data, and each has a specific Thermo Fisher franchise positioned to capture it. Together they cover the full investment narrative — the underlying industry shift, the strategic business model evolution, and the geopolitical overlay.";

export const tailwinds = [
  {
    /* ─── TAILWIND 1: BIOLOGICS SUPERCYCLE ─── */
    number: 1,
    name: "The Biologics Manufacturing Supercycle",
    tagline: "Medicine is shifting from chemistry to biology — and every biologic needs a 15-20 year supplier",
    colorKey: "green",

    heroStat: { value: "60%", label: "of pharma pipeline now biologics", sub: "Up from less than 20% twenty years ago" },

    structuralShift: "Two decades ago, pharmaceutical research was dominated by small-molecule chemistry — pills synthesised in chemical plants. Today, the most valuable drugs are biologics: monoclonal antibodies, antibody-drug conjugates, cell and gene therapies, mRNA vaccines, and now GLP-1 peptides at industrial scale. Biologics are manufactured by genetically engineered cells in bioreactors, requiring entirely different inputs (cell culture media, single-use bioreactor systems, downstream purification chromatography) than small molecules. The pipeline mix has crossed over: roughly 60% of pharmaceuticals in development today are biologics. Industry capex on biologic manufacturing capacity is running at 15-20% annual growth — and the GLP-1 build-out alone is unprecedented in pharmaceutical history.",

    /* Pipeline shift visualization data */
    pipelineShift: [
      { period: "2005", smallMolecule: 80, biologic: 20 },
      { period: "2015", smallMolecule: 55, biologic: 45 },
      { period: "2025", smallMolecule: 40, biologic: 60 },
      { period: "2030E", smallMolecule: 30, biologic: 70 },
    ],

    glp1Stats: [
      { value: "$60B+", label: "Lilly + Novo combined GLP-1 capex commitment" },
      { value: "5x", label: "Cell culture media demand from GLP-1 manufacturing" },
      { value: "Roche, AZ, Pfizer", label: "Entering the GLP-1 race — second wave of capex" },
    ],

    tmoPlaysIt: {
      summary: "Thermo Fisher's Bioproduction franchise is the 'arms dealer' of biologic drug manufacturing. The company doesn't make the drug — it sells the critical inputs that everyone else uses to make it. Whoever wins the manufacturing race, Thermo Fisher participates in the upside.",
      products: [
        {
          name: "Gibco cell culture media",
          desc: "The proprietary nutrient broth that feeds genetically engineered cells. Each commercial biologic drug uses a specific Gibco formulation — locked in at FDA filing for the 15-20 year commercial life of the drug.",
          economics: "50%+ gross margins",
        },
        {
          name: "HyClone single-use bioreactor systems",
          desc: "Pre-sterilised disposable bag manufacturing vessels (1L to 2,000L). The architecture that replaced stainless steel and enabled rapid global capacity buildout. Consumable bags = annuity revenue per approved drug.",
          economics: "Recurring consumable revenue",
        },
        {
          name: "Downstream purification",
          desc: "Filtration and chromatography for separating drug protein from cell culture. Expanded position via the 2025 acquisition of Solventum's filtration and separation business.",
          economics: "Locked into FDA process",
        },
      ],
    },

    benefit: {
      summary: "Bioproduction is roughly 10% of Thermo Fisher revenue (estimated $4-5 billion) but carries an outsized share of strategic value. The combination of FDA process lock-in, oligopoly supply (TMO / Cytiva / Sartorius), and structural end-market growth makes it the highest-quality individual franchise in the company.",
      metrics: [
        { value: "$4-5B", label: "Annual bioproduction revenue", color: "green" },
        { value: "50%+", label: "Gross margins on cell culture media", color: "green" },
        { value: "15-20yr", label: "Customer lock-in per approved drug", color: "deepBlue" },
        { value: "Low double-digit", label: "Through-cycle organic growth", color: "orange" },
      ],
    },

    talkingPoints: [
      "60% of pharma pipeline is now biologics — up from less than 20% twenty years ago. The mix shift is structural, not cyclical.",
      "Once a biologic drug is FDA-approved using Thermo Fisher cell culture media, the customer is locked in for 15-20 years. Switching requires regulatory refiling.",
      "Lilly and Novo Nordisk have committed over $60 billion combined to GLP-1 manufacturing capacity. Every gram of GLP-1 peptide needs Thermo Fisher inputs.",
      "Bioproduction is a global triopoly — Thermo Fisher (Gibco/HyClone), Cytiva (inside Danaher), and Sartorius. New entrants face years of qualification work.",
    ],
  },

  {
    /* ─── TAILWIND 2: PHARMA OUTSOURCING ─── */
    number: 2,
    name: "The Pharma Outsourcing Megatrend",
    tagline: "Pharma is shifting from 'make everything in-house' to outsourcing the value chain — and Thermo Fisher is the only player with the full stack",
    colorKey: "deepBlue",

    heroStat: { value: "$140B+", label: "Global pharma outsourcing market", sub: "Growing 8-10% annually, accelerating consolidation" },

    structuralShift: "For thirty years, big pharma has been progressively outsourcing more of its value chain — first contract sales, then chemistry manufacturing, then clinical trial operations, increasingly now drug substance manufacturing and digital trial infrastructure. The drivers are unchanged but intensifying: drug launches are increasingly biologic (specialised capabilities not worth in-house buildout for any single asset), pipelines are increasingly global (specialist regional infrastructure needed), and pharmaceutical sponsors are under pressure to do more with less. The result is a structural shift in the industry's operating model — and the contract development and manufacturing organisations (CDMOs) plus contract research organisations (CROs) that capture this work are consolidating into a smaller number of larger, more capable platforms. Quality and capability requirements are squeezing out smaller players. The winners are the integrated providers.",

    outsourcingGrowth: [
      { year: "2015", value: 75 },
      { year: "2020", value: 100 },
      { year: "2025", value: 140 },
      { year: "2030E", value: 210 },
    ],

    tmoPlaysIt: {
      summary: "Thermo Fisher is the only company globally that operates at scale across both contract drug manufacturing (Patheon) and contract clinical research (PPD + Clario). Big pharma can sign a single master service agreement and outsource the entire drug development and commercial supply chain to one vendor.",
      products: [
        {
          name: "Patheon (Pharma Services / CDMO)",
          desc: "Contract drug substance manufacturing, sterile fill-finish, packaging, clinical trial supply. ~50 facilities globally. Acquired 2017 for $7.2bn. Particularly strong in sterile fill-finish (critical for GLP-1 peptides and biologics).",
          economics: "$7-8bn revenue",
        },
        {
          name: "PPD (Clinical Research / CRO)",
          desc: "End-to-end clinical trial operations — site selection, patient recruitment, data management, regulatory submissions. One of top 3 CROs globally alongside IQVIA and ICON. Acquired 2021 for $20.9bn.",
          economics: "Top 3 globally",
        },
        {
          name: "Clario (eClinical / digital endpoints)",
          desc: "Digital endpoint measurement — electronic clinical outcome assessment, wearable integration, cardiac and respiratory monitoring. The infrastructure for decentralised clinical trials. Acquired 2026 for ~$9bn.",
          economics: "AI-pharma angle",
        },
      ],
    },

    benefit: {
      summary: "Combined, Patheon and PPD/Clario generate roughly $15 billion in revenue — and the integrated platform commands premium positioning that pure-play competitors cannot easily match. The 'Accelerator Drug Development' programme is the commercial expression of this thesis: sign one contract, get clinical trials, digital endpoints, drug substance manufacturing, and commercial fill-finish from one vendor.",
      metrics: [
        { value: "$15B+", label: "Combined services revenue", color: "deepBlue" },
        { value: "Top 3", label: "Position in both CDMO and CRO", color: "deepBlue" },
        { value: "Mid-single", label: "Through-cycle organic growth, accelerating", color: "green" },
        { value: "Only player", label: "With both CDMO and CRO at scale", color: "orange" },
      ],
    },

    talkingPoints: [
      "Pharma outsourcing is now a $140 billion global market growing 8-10% annually — and accelerating consolidation toward the largest providers.",
      "Thermo Fisher is the only company globally with leading positions in BOTH contract drug manufacturing (Patheon) AND contract clinical research (PPD + Clario).",
      "The BIOSECURE Act is actively pushing US pharmaceutical sponsors away from Chinese CDMOs like Wuxi Biologics — direct tailwind for Western providers including Patheon.",
      "Big pharma signs one master service agreement and outsources clinical trials, manufacturing, and fill-finish to a single vendor. Lonza, Catalent, Samsung, IQVIA all win pieces — Thermo Fisher is the only one with the full stack.",
    ],
  },

  {
    /* ─── TAILWIND 3: US RESHORING ─── */
    number: 3,
    name: "US Pharmaceutical Manufacturing Reshoring",
    tagline: "Pharma supply chains are coming back onshore — and Thermo Fisher has committed $2 billion to capture the window",
    colorKey: "orange",

    heroStat: { value: "$2B", label: "Thermo Fisher US capacity investment", sub: "Reshoring window is 2027-2029 per management" },

    structuralShift: "Multiple structural forces are simultaneously pushing pharmaceutical manufacturing back onshore in the US. The BIOSECURE Act, formally introduced in 2024 and steadily advancing, restricts US federal contracts with Chinese biotech and CDMO providers including Wuxi Biologics, Wuxi AppTec, BGI Genomics, MGI Tech, and Complete Genomics. Trump administration tariffs on pharmaceutical imports have added direct cost pressure. Post-pandemic supply chain security concerns have made executives wary of single-source international supply for critical medicines. Most Favoured Nation drug pricing politics make it more attractive for pharma to be seen as a domestic manufacturer. The result is a multi-year capex cycle as Western pharmaceutical companies build out US manufacturing capacity that they previously would have outsourced to Asia. This is potentially the most underappreciated of the three tailwinds because it is specific to companies with a substantial US manufacturing footprint — and Thermo Fisher is structurally one of the largest beneficiaries.",

    capexRamp: [
      { year: "2021", value: 0.26 },
      { year: "2022", value: 0.85 },
      { year: "2023", value: 1.40 },
      { year: "2024", value: 1.95 },
      { year: "2025", value: 2.21 },
    ],

    tmoPlaysIt: {
      summary: "Thermo Fisher has been preparing for this window for several years. The $2 billion US capacity investment programme, the Sanofi New Jersey sterile fill-finish acquisition, and ongoing Patheon facility expansions position the company to capture disproportionate share as Western pharma reshores manufacturing.",
      products: [
        {
          name: "Sanofi NJ sterile fill-finish site",
          desc: "Acquired in 2025. State-of-the-art aseptic manufacturing capacity in New Jersey. Adds critical fill-finish capability exactly where the industry needs it for GLP-1 peptides and biologics in pre-filled syringes.",
          economics: "Major reshoring asset",
        },
        {
          name: "$2bn US capacity programme",
          desc: "Multi-site investment in US bioproduction, Patheon manufacturing, and clinical research infrastructure. Management has framed this as driving above-trend growth from 2027-2029.",
          economics: "Above-trend 2027-2029",
        },
        {
          name: "Existing US footprint",
          desc: "Thermo Fisher already operates 100+ US manufacturing and service facilities across all segments. The reshoring tailwind benefits the existing installed base — not just the new capex.",
          economics: "100+ US facilities",
        },
      ],
    },

    benefit: {
      summary: "Management has explicitly framed the $2 billion US capacity programme as driving above-trend growth from 2027 to 2029. If the reshoring window plays out as expected, this could add 100-200 basis points to organic revenue growth for several years — exactly when the broader bioproduction reacceleration thesis is also expected to materialise.",
      metrics: [
        { value: "$2.0B", label: "US capacity investment commitment", color: "orange" },
        { value: "8x", label: "Capex ramp since 2021 ($260M → $2.2B)", color: "capRed" },
        { value: "100+", label: "Existing US manufacturing sites", color: "deepBlue" },
        { value: "2027-2029", label: "Management's above-trend growth window", color: "green" },
      ],
    },

    talkingPoints: [
      "Thermo Fisher has committed $2 billion to US capacity expansion — management explicitly framed this as driving above-trend growth in 2027-2029.",
      "The BIOSECURE Act is restricting US contracts with Wuxi Biologics and other Chinese CDMOs. Direct beneficiaries are Western providers with US footprint — Thermo Fisher fits perfectly.",
      "Capex has ramped 8x since 2021 (from $260 million to $2.2 billion). This is a deliberate strategic bet on the reshoring window.",
      "The Sanofi New Jersey fill-finish acquisition gave Thermo Fisher state-of-the-art aseptic capacity in the US — exactly where GLP-1 manufacturers need it.",
    ],
  },
];

/* Interconnection / why these three together */
export const tailwindsConnection = "The three tailwinds reinforce each other. The biologics manufacturing supercycle (Tailwind 1) creates the underlying demand. The pharma outsourcing megatrend (Tailwind 2) means more of that demand flows to platforms like Thermo Fisher rather than in-house pharma manufacturing. And the US reshoring trend (Tailwind 3) determines that the work goes to providers with substantial US capacity rather than Asian CDMOs. Thermo Fisher is positioned to capture all three simultaneously — and arguably is the single best-positioned name globally on the combined thesis.";
