// NVO (Novo Nordisk) — Research Data
// Competitive landscape vs Lilly and the broader incretin field
// Sources: SEC 10-K/10-Q/8-K/6-K/20-F, FDA Orange Book, ClinicalTrials.gov, NEJM/Lancet/JAMA, NICE TAs, company press

/* ═══════════════════════════════════════════
   HERO STATS
   ═══════════════════════════════════════════ */
export const heroStats = [
  { value: "11.7x", label: "NVO forward P/E (vs LLY 28.6x)", color: "capRed" },
  { value: "39.4%", label: "NVO US incretin TRx share Q1'26 (from 78% in Q2'23)", color: "capRed" },
  { value: "-11%", label: "NVO US Operations CER growth Q1'26", color: "capRed" },
  { value: "$349", label: "Wegovy NovoCare cash-pay (was $1,349 list)", color: "orange" },
  { value: "0.96x", label: "FY25 NVO GLP-1 / LLY tirzepatide ratio (Lilly overtook)", color: "orange" },
  { value: "~50", label: "Indian semaglutide generics launched in 1 week post-LoE", color: "purple" },
];

/* ═══════════════════════════════════════════
   THESIS — Top 10 Datapoints (variant perception)
   ═══════════════════════════════════════════ */
export const topDatapoints = [
  { metric: "LLY tirzepatide ÷ NVO GLP-1 ratio FY25", value: "0.96x", striking: "Lilly overtook Novo in combined incretin revenue in FY25; ratio was 25.2x in 2022.", implication: "The 'GLP-1 = Novo' framing is two years stale; thesis must reflect Lilly as the larger franchise." },
  { metric: "LLY US incretin TRx share Q1-2026", value: "60.1% vs NVO 39.4%", striking: "Lilly share tripled in 11 quarters; Mounjaro now leads T2D segment 51% to 49%.", implication: "Share inflection is not slowing; Wegovy oral pill (Jan'26) is a temporary new-Rx counter, not a TRx fix." },
  { metric: "NVO US Operations CER Q1-2026", value: "-11%", striking: "First full year of negative US growth; volume cannot offset the price reset.", implication: "DTC self-pay channel mix is a structural margin hit, not a transition cost." },
  { metric: "Wegovy NovoCare cash-pay path", value: "$499 → $349 in 8 months", striking: "Branded cash-pay collapsed from $1,349 list to ~26% of list in eight months.", implication: "Realized US price is now the single most important variable in NVO's 12-month earnings model." },
  { metric: "Zepbound LillyDirect vial path", value: "$549 → $299 in 16 months", striking: "Lilly preempted CVS Caremark formulary loss with deeper DTC cuts.", implication: "Lilly's DTC pricing power lets it absorb formulary loss; NVO has less optionality on the other side." },
  { metric: "India semaglutide generic pricing", value: "Natco vials 92% below Wegovy", striking: "~50 generics launched within one week of March 21 2026 expiry across IN, BR, MX, CN.", implication: "Indian, Brazilian, Mexican and Chinese erosion is a 2026 event, not 2031; ROW ramp is also at risk." },
  { metric: "NVO forward P/E Q1-2026", value: "11.7x vs LLY 28.6x; sector ~17x", striking: "NVO trades at a 32% discount to its sector and 59% discount to LLY on forward earnings.", implication: "Either the market has fully priced the value-trap, or there is upside if 2026 surprises positively on price." },
  { metric: "Trump MFN voluntary deal price", value: "Wegovy Medicare $245; TrumpRx $346–350", striking: "~82% list-price haircut for Medicare; opens Medicare obesity coverage at MFN.", implication: "Adds patients (volume) but unit economics deteriorate sharply. Net effect ambiguous." },
  { metric: "Compounded semaglutide shipment decline", value: "-90% Jun'24 to Jun'25", striking: "Shortage resolution and Novo's litigation campaign decisively closed the compounded leak.", implication: "Branded recapture has materialized but at lower realized prices via cash-pay channels." },
  { metric: "evoke + evoke+ Alzheimer's failure", value: "CDR-SB primary not met (Nov 24 2025)", striking: "Removes one of the largest blue-sky options in the bull thesis.", implication: "Forces a recalibration of NVO's pipeline value relative to Lilly's retatrutide / MariTide-class options." },
];

/* ═══════════════════════════════════════════
   THESIS — Concluding Observations
   ═══════════════════════════════════════════ */
export const concludingObservations = [
  {
    num: "01",
    title: "Lilly already won FY2025 on revenue, FY2026 on share momentum",
    body: "The relevant question is no longer 'can Lilly catch up' but 'where does Novo's share floor sit when retatrutide and orforglipron pen expansions hit'. The catalyst calendar is asymmetric, with seven of the next eight quarters' major readouts being Lilly assets.",
  },
  {
    num: "02",
    title: "The 2026 generic wave is materially under-modeled",
    body: "Indian, Brazilian, Mexican and Chinese semaglutide expirations were already March 2026 events. Roughly 50 Indian brands at 50 to 92% discounts mean a faster rest-of-world ramp now flows to brand revenue at minimal incremental price. The implicit ROW assumption in Goldman's $95bn 2030 obesity total addressable market and JPM's 'one-third ex-US' splits is increasingly untenable.",
  },
  {
    num: "03",
    title: "NVO de-rating to ~12x forward P/E may now over-discount the realized-price reset",
    body: "Versus the MSCI ACWI Health Care benchmark at ~17x, the discount is consistent with the QARP screen. Pricing may now over-discount the reset, given that DTC cash-pay channels stabilized in Q1 2026 and the IRA and MFN price points are now visible to the market. The base case thesis is no longer 'can Novo defend share'. It is 'is the FY26 negative growth guidance the trough or the new run-rate'. The catalyst calendar through 2027-Q2 is the first place to look for an answer.",
  },
];

/* ═══════════════════════════════════════════
   COMPETITION — Approved + Phase 2+ Asset Map
   ═══════════════════════════════════════════ */
export const assetMap = [
  // Approved
  { drug: "Semaglutide", brand: "Ozempic / Wegovy / Rybelsus", company: "Novo Nordisk", stage: "Approved", indications: "T2D, AOM, CV, CKD, MASH", weightLoss: "−14.9% (STEP-1)", status: "approved" },
  { drug: "Tirzepatide", brand: "Mounjaro / Zepbound", company: "Eli Lilly", stage: "Approved", indications: "T2D, AOM, OSA, HFpEF-obesity", weightLoss: "−20.9% (SURMOUNT-1)", status: "approved" },
  { drug: "Wegovy 7.2 mg HD", brand: "Wegovy HD", company: "Novo Nordisk", stage: "Approved Mar 2026", indications: "AOM", weightLoss: "−20.7% (STEP UP TPE)", status: "approved" },
  { drug: "Orforglipron", brand: "Foundayo", company: "Eli Lilly", stage: "Approved Apr 2026 (CNPV)", indications: "AOM (oral)", weightLoss: "−12.4% (ATTAIN-1)", status: "approved" },
  { drug: "Mazdutide", brand: "—", company: "Innovent (China only)", stage: "Approved 2025", indications: "AOM, T2D", weightLoss: "−12.5% (GLORY-1, 6mg)", status: "approved" },
  { drug: "Liraglutide", brand: "Victoza / Saxenda + generics", company: "NVO + Teva + Hikma", stage: "Off-patent", indications: "T2D, AOM (generic)", weightLoss: "—", status: "approved" },
  { drug: "Dulaglutide", brand: "Trulicity", company: "Eli Lilly", stage: "Approved (LoE 2027)", indications: "T2D", weightLoss: "—", status: "approved" },
  // Phase 3 race
  { drug: "Retatrutide", brand: "—", company: "Eli Lilly", stage: "Phase 3 (TRIUMPH-1/-2/-3/-5)", indications: "AOM, T2D, OSA, knee OA", weightLoss: "−24.2% (Ph2 12mg)", status: "phase3" },
  { drug: "CagriSema", brand: "—", company: "Novo Nordisk", stage: "NDA filed Dec 2025", indications: "AOM (PDUFA 2026-Q4)", weightLoss: "−22.7% (REDEFINE-1 TPE)", status: "phase3" },
  { drug: "Amycretin SC + oral", brand: "—", company: "Novo Nordisk", stage: "Phase 3 starts 2026-Q2", indications: "AOM", weightLoss: "−22.0% (SC 20mg)", status: "phase3" },
  { drug: "MariTide", brand: "—", company: "Amgen", stage: "Phase 3 (MARITIME-1/-2)", indications: "AOM, T2D", weightLoss: "−19.9% (Ph2)", status: "phase3" },
  { drug: "VK2735 SC", brand: "—", company: "Viking Therapeutics", stage: "Phase 3 (VANQUISH-1)", indications: "AOM", weightLoss: "−14.7% (Ph2 13wk)", status: "phase3" },
  { drug: "VK2735 oral", brand: "—", company: "Viking Therapeutics", stage: "Phase 2/3", indications: "AOM", weightLoss: "−12.2% (VENTURE-Oral)", status: "phase3" },
  { drug: "Survodutide", brand: "—", company: "Boehringer / Zealand", stage: "Phase 3 (SYNCHRONIZE / LIVERAGE)", indications: "AOM, MASH", weightLoss: "−14.9% (Ph2 4.8mg)", status: "phase3" },
  { drug: "CT-388", brand: "—", company: "Roche / Carmot", stage: "Phase 3 starts 2026-Q1", indications: "AOM, T2D", weightLoss: "Ph2 ongoing", status: "phase3" },
  { drug: "MET-097i", brand: "—", company: "Pfizer / Metsera", stage: "Phase 3 starts 2026-Q2", indications: "AOM (weekly + monthly)", weightLoss: "Ph2 ongoing", status: "phase3" },
  { drug: "Pemvidutide", brand: "—", company: "Altimmune", stage: "Phase 2 (MOMENTUM)", indications: "AOM, MASH", weightLoss: "−15.6% (2.4mg)", status: "phase2" },
  { drug: "Eloralintide", brand: "—", company: "Eli Lilly", stage: "Phase 2", indications: "AOM (amylin)", weightLoss: "−20.1% (top arm)", status: "phase2" },
  { drug: "Bimagrumab + sema", brand: "—", company: "Eli Lilly", stage: "Phase 2 (BELIEVE)", indications: "AOM combo (lean mass)", weightLoss: "−22.1%", status: "phase2" },
  { drug: "AZD5004", brand: "—", company: "AstraZeneca", stage: "Phase 2b (VISTA)", indications: "AOM, T2D (oral)", weightLoss: "Ph2 readout 2026", status: "phase2" },
];

/* ═══════════════════════════════════════════
   COMPETITION — Quarterly Revenue (USD millions)
   NVO converted at ~6.62 DKK/USD avg (FY25)
   ═══════════════════════════════════════════ */
// Each entry: { q, ozempic, wegovy, rybelsus, victoza, mounjaro, zepbound }
export const quarterlyRevenue = [
  { q: "Q1'22", ozempic: 1418, wegovy: 102, rybelsus: 178, victoza: 235, mounjaro: 0,    zepbound: 0 },
  { q: "Q2'22", ozempic: 1738, wegovy: 187, rybelsus: 217, victoza: 213, mounjaro: 16,   zepbound: 0 },
  { q: "Q3'22", ozempic: 2014, wegovy: 250, rybelsus: 247, victoza: 200, mounjaro: 187,  zepbound: 0 },
  { q: "Q4'22", ozempic: 2432, wegovy: 289, rybelsus: 290, victoza: 188, mounjaro: 279,  zepbound: 0 },
  { q: "Q1'23", ozempic: 2728, wegovy: 670, rybelsus: 313, victoza: 175, mounjaro: 568,  zepbound: 0 },
  { q: "Q2'23", ozempic: 3122, wegovy: 1131, rybelsus: 354, victoza: 165, mounjaro: 980,  zepbound: 0 },
  { q: "Q3'23", ozempic: 3540, wegovy: 1370, rybelsus: 397, victoza: 138, mounjaro: 1409, zepbound: 0 },
  { q: "Q4'23", ozempic: 4290, wegovy: 1413, rybelsus: 480, victoza: 116, mounjaro: 2206, zepbound: 176 },
  { q: "Q1'24", ozempic: 4031, wegovy: 1352, rybelsus: 533, victoza: 105, mounjaro: 1806, zepbound: 517 },
  { q: "Q2'24", ozempic: 4365, wegovy: 1786, rybelsus: 526,  victoza: 92,  mounjaro: 3091, zepbound: 1243 },
  { q: "Q3'24", ozempic: 4248, wegovy: 2477, rybelsus: 525,  victoza: 81,  mounjaro: 3115, zepbound: 1257 },
  { q: "Q4'24", ozempic: 4503, wegovy: 3002, rybelsus: 638,  victoza: 75,  mounjaro: 3528, zepbound: 1908 },
  { q: "Q1'25", ozempic: 4566, wegovy: 2750, rybelsus: 660,  victoza: 60,  mounjaro: 3839, zepbound: 2311 },
  { q: "Q2'25", ozempic: 4785, wegovy: 3180, rybelsus: 700,  victoza: 50,  mounjaro: 5200, zepbound: 3380 },
  { q: "Q3'25", ozempic: 4640, wegovy: 3460, rybelsus: 740,  victoza: 50,  mounjaro: 6520, zepbound: 3580 },
  { q: "Q4'25", ozempic: 4800, wegovy: 3800, rybelsus: 760,  victoza: 50,  mounjaro: 7640, zepbound: 4250 },
  { q: "Q1'26", ozempic: 4205, wegovy: 3098, rybelsus: 691,  victoza: 114, mounjaro: 8662, zepbound: 4160 },
];

/* ═══════════════════════════════════════════
   COMPETITION — Annual Revenue & Crossover (USD bn)
   ═══════════════════════════════════════════ */
export const annualRevenue = [
  { year: "2019", nvoTotal: 18.3, nvoGLP1: 5.5,  llyTotal: 22.3, llyTirz: 0,   ratio: null },
  { year: "2020", nvoTotal: 19.1, nvoGLP1: 7.2,  llyTotal: 24.5, llyTirz: 0,   ratio: null },
  { year: "2021", nvoTotal: 22.0, nvoGLP1: 10.4, llyTotal: 28.3, llyTirz: 0,   ratio: null },
  { year: "2022", nvoTotal: 25.1, nvoGLP1: 13.8, llyTotal: 28.5, llyTirz: 0.55, ratio: 25.2 },
  { year: "2023", nvoTotal: 33.7, nvoGLP1: 21.8, llyTotal: 34.1, llyTirz: 5.19, ratio: 4.20 },
  { year: "2024", nvoTotal: 41.5, nvoGLP1: 29.8, llyTotal: 45.0, llyTirz: 16.20, ratio: 1.84 },
  { year: "2025", nvoTotal: 46.7, nvoGLP1: 35.0, llyTotal: 60.4, llyTirz: 36.5, ratio: 0.96 },
];

/* ═══════════════════════════════════════════
   COMPETITION — US Incretin TRx Share by Quarter
   ═══════════════════════════════════════════ */
export const usShareData = [
  { q: "Q2'23", lly: 22, nvo: 78 },
  { q: "Q3'23", lly: 28, nvo: 72 },
  { q: "Q4'23", lly: 33, nvo: 67 },
  { q: "Q1'24", lly: 38, nvo: 62 },
  { q: "Q2'24", lly: 42, nvo: 58 },
  { q: "Q3'24", lly: 45, nvo: 55 },
  { q: "Q4'24", lly: 48.3, nvo: 51.7 },
  { q: "Q1'25", lly: 53.3, nvo: 46.1 },
  { q: "Q2'25", lly: 57.0, nvo: 42.6 },
  { q: "Q3'25", lly: 57.9, nvo: 41.7 },
  { q: "Q4'25", lly: 60.5, nvo: 39.1 },
  { q: "Q1'26", lly: 60.1, nvo: 39.4 },
];

/* ═══════════════════════════════════════════
   COMPETITION — Realized Price Decomposition
   ═══════════════════════════════════════════ */
export const priceDecomp = [
  { q: "Q2'23", llyUS: 0,    nvoUS: 47 },
  { q: "Q3'23", llyUS: 12,   nvoUS: 41 },
  { q: "Q4'23", llyUS: 27,   nvoUS: 35 },
  { q: "Q1'24", llyUS: 18,   nvoUS: 28 },
  { q: "Q2'24", llyUS: 8,    nvoUS: 21 },
  { q: "Q3'24", llyUS: 0,    nvoUS: 14 },
  { q: "Q4'24", llyUS: -7,   nvoUS: 6  },
  { q: "Q1'25", llyUS: -8,   nvoUS: 1  },
  { q: "Q2'25", llyUS: -10,  nvoUS: -2 },
  { q: "Q3'25", llyUS: -15,  nvoUS: -5 },
  { q: "Q4'25", llyUS: -7,   nvoUS: -7 },
  { q: "Q1'26", llyUS: -7,   nvoUS: -11 },
];

/* ═══════════════════════════════════════════
   COMPETITION — DTC Cash-Pay Walks (Wegovy + Zepbound)
   ═══════════════════════════════════════════ */
export const dtcWalks = [
  { date: "Aug'24", wegovy: null, zepbound: 549, label: "Zepbound vials launched" },
  { date: "Mar'25", wegovy: 499,  zepbound: 549, label: "NovoCare Pharmacy launched" },
  { date: "Jun'25", wegovy: 499,  zepbound: 499, label: "Zepbound all-doses cut" },
  { date: "Nov'25", wegovy: 349,  zepbound: 499, label: "Wegovy cut + MFN deal signed" },
  { date: "Dec'25", wegovy: 349,  zepbound: 449, label: "Zepbound cut to $299–$449" },
  { date: "Jan'26", wegovy: 299,  zepbound: 449, label: "Wegovy oral pill $149–$299" },
  { date: "Feb'26", wegovy: 299,  zepbound: 299, label: "Zepbound KwikPen from $299" },
  { date: "May'26", wegovy: 299,  zepbound: 299, label: "Stabilizing" },
];

/* ═══════════════════════════════════════════
   COMPETITION — Geographic Revenue Mix (interactive pies)
   ═══════════════════════════════════════════ */
export const geoMixNVO = [
  { name: "US Operations",      share: 56.0, color: "#9B1B1B" },
  { name: "EUCAN",              share: 21.4, color: "#1D4ED8" },
  { name: "Emerging Markets",   share: 9.8,  color: "#EA580C" },
  { name: "APAC",               share: 6.7,  color: "#047857" },
  { name: "Region China",       share: 6.0,  color: "#4338CA" },
];
export const geoMixLLY = [
  { name: "United States",      share: 66.7, color: "#9B1B1B" },
  { name: "Europe",             share: 17.7, color: "#1D4ED8" },
  { name: "Other foreign",      share: 9.3,  color: "#EA580C" },
  { name: "China",              share: 3.0,  color: "#4338CA" },
  { name: "Japan",              share: 3.3,  color: "#047857" },
];

/* ═══════════════════════════════════════════
   PATENT CLIFF — Semaglutide Expiry by Jurisdiction
   ═══════════════════════════════════════════ */
export const patentExpiry = [
  { country: "Canada",   year: 2020, status: "Lapsed", color: "capRed", note: "CA2601784C lapsed after a missed 2020 maintenance fee. Dr Reddy's approved Apr 29 2026; Apotex May 1 2026; Sandoz pricing up to 70% below brand." },
  { country: "India",    year: 2026, status: "Mar 2026", color: "capRed", note: "IN 262697 expired Mar 20 2026. ~50 generics launched within one week (Dr Reddy's, Sun, Alkem, Zydus, Mankind, Lupin, Natco). Pricing 50–92% below Wegovy." },
  { country: "Brazil",   year: 2026, status: "Mar 2026", color: "capRed", note: "Compound expired Mar 2026, no SPC. Domestic generics ramping." },
  { country: "China",    year: 2026, status: "Mar 2026", color: "orange", note: "CN101133082B Mar 20 2026. CNIPA rejected NVO PTE Sep 25 2025. 11 NDAs filed. Sino-Swiss FTA 6-yr data exclusivity may delay launches to 2H 2026." },
  { country: "Mexico",   year: 2026, status: "Mar 2026", color: "capRed", note: "Compound expired Mar 2026, no SPC. Domestic and import generics expected." },
  { country: "Japan",    year: 2031, status: "~2031",   color: "green",  note: "Compound to ~2031, pediatric / SPC details to confirm." },
  { country: "EU5",      year: 2031, status: "Mar 2031", color: "green",  note: "EP1969004 base Mar 20 2026 + SPC ~Mar 20 2031 (DE, FR, UK, IT, ES)." },
  { country: "United Kingdom", year: 2031, status: "Mar 2031", color: "green", note: "Aligned with EU SPC term ~Mar 20 2031." },
  { country: "United States",  year: 2031, status: "Dec 2031", color: "green", note: "US 8,129,343 base Mar 2026 + PTE/PTA → Dec 5 2031 per NVO 20-F FY2024." },
];

export const indiaGenerics = [
  { brand: "Obeda",       company: "Dr Reddy's", discount: "~80% below Wegovy" },
  { brand: "Noveltreat / Sematrinity", company: "Sun Pharma", discount: "~75% below Wegovy" },
  { brand: "Semasize",    company: "Alkem",      discount: "~70% below Wegovy" },
  { brand: "Semaglyn",    company: "Zydus",      discount: "~70% below Wegovy" },
  { brand: "Samakind",    company: "Mankind",    discount: "~75% below Wegovy" },
  { brand: "Semanext",    company: "Lupin",      discount: "~60% below Wegovy" },
  { brand: "Natco vials", company: "Natco",      discount: "~92% below Wegovy (₹1,290 vs ₹16,400/mo)" },
];

/* ═══════════════════════════════════════════
   PATENT CLIFF — Compounded GLP-1 Dynamic
   ═══════════════════════════════════════════ */
export const compoundedTimeline = [
  { date: "Jul 2023", event: "FDA adds liraglutide to shortage list (still 'limited availability')", color: "orange" },
  { date: "Oct 2 2024", event: "FDA resolves tirzepatide shortage", color: "green" },
  { date: "Dec 19 2024", event: "FDA Declaratory Order reaffirms tirzepatide delisting after OFA litigation", color: "green" },
  { date: "Feb 21 2025", event: "FDA resolves semaglutide shortage", color: "green" },
  { date: "Mar 5 2025", event: "Judge Pittman denies tirzepatide PI; NovoCare Wegovy launches at $499", color: "green" },
  { date: "Apr 23 2025", event: "Lilly files suits against Strive, Empower, Mochi, Fella, Henry Meds", color: "purple" },
  { date: "Apr 24 2025", event: "Pittman denies semaglutide PI", color: "green" },
  { date: "May 7 2025", event: "Tirzepatide final ruling upheld", color: "green" },
  { date: "Jun 2025", event: "Lilly secures 12+ permanent injunctions (Holland & Knight)", color: "purple" },
  { date: "Aug 4 2025", event: "Novo files 12-defendant batch suit", color: "purple" },
  { date: "Feb 9 2026", event: "Novo files patent infringement vs Hims & Hers (D. Del.)", color: "capRed" },
  { date: "Apr 2026", event: "FDA proposes excluding sema/tirz/lira from §503B Bulks List permanently", color: "deepBlue" },
];

/* ═══════════════════════════════════════════
   PIPELINE — Catalyst Calendar (May 2026 → May 2028)
   ═══════════════════════════════════════════ */
export const catalysts = [
  { quarter: "2026-Q2", asset: "Orforglipron (Foundayo)",   company: "LLY", event: "US obesity launch",                impact: "high"   },
  { quarter: "2026-Q2", asset: "Survodutide",                company: "BI/Zealand", event: "SYNCHRONIZE-1 ADA full readout", impact: "high"   },
  { quarter: "2026-Q2", asset: "AZD5004",                    company: "AZN", event: "VISTA Phase 2b readout",          impact: "medium" },
  { quarter: "2026-Q2", asset: "Retatrutide",                company: "LLY", event: "TRANSCEND-T2D-1 ADA",              impact: "medium" },
  { quarter: "2026-Q2", asset: "MET-097i",                   company: "PFE/Metsera", event: "Phase 3 weekly start",     impact: "medium" },
  { quarter: "2026-Q2", asset: "Amycretin SC + oral",        company: "NVO", event: "Phase 3 starts",                   impact: "high"   },
  { quarter: "2026-Q3", asset: "Orforglipron",               company: "LLY", event: "T2D NDA filing",                   impact: "high"   },
  { quarter: "2026-Q3", asset: "Retatrutide",                company: "LLY", event: "TRIUMPH-1 readout",                impact: "high"   },
  { quarter: "2026-Q3", asset: "Retatrutide",                company: "LLY", event: "TRIUMPH-2 readout",                impact: "high"   },
  { quarter: "2026-Q4", asset: "MET-097i",                   company: "PFE/Metsera", event: "Phase 3 monthly start",    impact: "medium" },
  { quarter: "2026-Q4", asset: "CagriSema",                  company: "NVO", event: "PDUFA",                            impact: "high"   },
  { quarter: "2026-Q4", asset: "Retatrutide",                company: "LLY", event: "TRIUMPH-5 + OSA + NDA filing",     impact: "high"   },
  { quarter: "2026-Q4", asset: "Survodutide",                company: "BI/Zealand", event: "SYNCHRONIZE-2 readout",     impact: "high"   },
  { quarter: "2027-Q1", asset: "MariTide",                   company: "AMGN", event: "MARITIME-1/-2 readouts",          impact: "high"   },
  { quarter: "2027-Q1", asset: "Survodutide",                company: "BI/Zealand", event: "NDA filing",                impact: "medium" },
  { quarter: "2027-Q2", asset: "VK2735 SC",                  company: "VKTX", event: "VANQUISH-1 readout",              impact: "high"   },
  { quarter: "2027-Q2", asset: "Survodutide",                company: "BI/Zealand", event: "LIVERAGE MASH readout",     impact: "medium" },
  { quarter: "2027-Q2", asset: "Bimagrumab + sema",          company: "LLY", event: "Phase 2 combo readout",            impact: "low"    },
  { quarter: "2027-Q4", asset: "CagriSema",                  company: "NVO", event: "REDEFINE-3 CVOT (~2027–2028)",     impact: "high"   },
  { quarter: "2027-Q4", asset: "VK2735 SC",                  company: "VKTX", event: "VANQUISH-2 readout",              impact: "medium" },
];

/* ═══════════════════════════════════════════
   PIPELINE — Clinical Efficacy Comparison
   ═══════════════════════════════════════════ */
export const efficacyData = [
  { drug: "Tirzepatide SURMOUNT-3 (lifestyle)",  weightLoss: 26.6, company: "LLY",   trial: "Ph3", aeDisc: 6.7  },
  { drug: "Tirzepatide SURMOUNT-4 (maintenance)",weightLoss: 25.3, company: "LLY",   trial: "Ph3", aeDisc: 5.0  },
  { drug: "Retatrutide 12mg",                    weightLoss: 24.2, company: "LLY",   trial: "Ph2", aeDisc: 16.0 },
  { drug: "CagriSema (REDEFINE-1 TPE)",          weightLoss: 22.7, company: "NVO",   trial: "Ph3", aeDisc: 6.0  },
  { drug: "Bimagrumab + sema (BELIEVE)",         weightLoss: 22.1, company: "LLY",   trial: "Ph2", aeDisc: 7.0  },
  { drug: "Amycretin SC 20mg",                   weightLoss: 22.0, company: "NVO",   trial: "Ph1b", aeDisc: 8.0  },
  { drug: "Tirzepatide SURMOUNT-1 (15mg)",       weightLoss: 20.9, company: "LLY",   trial: "Ph3", aeDisc: 6.2  },
  { drug: "Wegovy 7.2mg HD (STEP UP TPE)",       weightLoss: 20.7, company: "NVO",   trial: "Ph3", aeDisc: 4.0  },
  { drug: "Eloralintide top arm",                weightLoss: 20.1, company: "LLY",   trial: "Ph2", aeDisc: 8.0  },
  { drug: "MariTide",                            weightLoss: 19.9, company: "AMGN",  trial: "Ph2", aeDisc: 27.0 },
  { drug: "Pemvidutide 2.4mg",                   weightLoss: 15.6, company: "ALT",   trial: "Ph2", aeDisc: 19.6 },
  { drug: "Semaglutide STEP-1",                  weightLoss: 14.9, company: "NVO",   trial: "Ph3", aeDisc: 4.5  },
  { drug: "Survodutide 4.8mg",                   weightLoss: 14.9, company: "BI/Zea",trial: "Ph2", aeDisc: 24.6 },
  { drug: "VK2735 SC (VENTURE 13wk)",            weightLoss: 14.7, company: "VKTX",  trial: "Ph2", aeDisc: 6.0  },
  { drug: "Mazdutide 6mg (GLORY-1)",             weightLoss: 12.5, company: "Innovent", trial: "Ph3", aeDisc: 5.0 },
  { drug: "Orforglipron 36mg (ATTAIN-1)",        weightLoss: 12.4, company: "LLY",   trial: "Ph3", aeDisc: 24.4 },
  { drug: "VK2735 oral (VENTURE-Oral)",          weightLoss: 12.2, company: "VKTX",  trial: "Ph2", aeDisc: 8.0  },
];

/* ═══════════════════════════════════════════
   PIPELINE — Indication Expansion Race
   ═══════════════════════════════════════════ */
export const indicationReadouts = [
  { year: 2023, trial: "SELECT", drug: "Semaglutide",  indication: "CV (T2D/obesity)", result: "20% RRR MACE", outcome: "positive", company: "NVO", note: "FDA Wegovy CV indication Mar 2024" },
  { year: 2024, trial: "FLOW",   drug: "Semaglutide",  indication: "CKD-T2D",          result: "24% RRR",       outcome: "positive", company: "NVO", note: "FDA Ozempic CKD indication Jan 2025" },
  { year: 2024, trial: "STEP-HFpEF", drug: "Semaglutide", indication: "HFpEF",         result: "KCCQ +7.8",     outcome: "positive", company: "NVO" },
  { year: 2024, trial: "SUMMIT", drug: "Tirzepatide",  indication: "HFpEF-obesity",    result: "38% RRR",       outcome: "positive", company: "LLY", note: "FDA Zepbound HFpEF Jun 2025" },
  { year: 2024, trial: "SURMOUNT-OSA", drug: "Tirzepatide", indication: "OSA",         result: "Met endpoints", outcome: "positive", company: "LLY", note: "FDA Zepbound OSA Dec 2024" },
  { year: 2024, trial: "SYNERGY-NASH", drug: "Tirzepatide", indication: "MASH (Ph2)",  result: "Met endpoints", outcome: "positive", company: "LLY" },
  { year: 2025, trial: "SOUL",   drug: "Oral semaglutide", indication: "CV",           result: "14% RRR",       outcome: "positive", company: "NVO" },
  { year: 2025, trial: "ESSENCE", drug: "Semaglutide", indication: "MASH",             result: "Met endpoints", outcome: "positive", company: "NVO", note: "FDA accelerated Wegovy MASH Aug 2025" },
  { year: 2025, trial: "REDEFINE-1", drug: "CagriSema", indication: "AOM",             result: "−22.7% wt",     outcome: "positive", company: "NVO" },
  { year: 2025, trial: "ATTAIN-1", drug: "Orforglipron", indication: "AOM",            result: "−12.4% wt",     outcome: "positive", company: "LLY" },
  { year: 2025, trial: "ACHIEVE-1/-2/-3", drug: "Orforglipron", indication: "T2D",     result: "Met endpoints", outcome: "positive", company: "LLY" },
  { year: 2025, trial: "SURPASS-CVOT", drug: "Tirzepatide", indication: "CV vs dula",  result: "Non-inferior",  outcome: "positive", company: "LLY" },
  { year: 2025, trial: "TRIUMPH-4", drug: "Retatrutide", indication: "AOM + knee OA",  result: "−28.7% wt",     outcome: "positive", company: "LLY" },
  { year: 2025, trial: "evoke + evoke+", drug: "Oral semaglutide", indication: "Early Alzheimer's", result: "CDR-SB primary failed", outcome: "negative", company: "NVO", note: "Extension halted Nov 24 2025" },
];

/* ═══════════════════════════════════════════
   ADJACENT THREATS
   ═══════════════════════════════════════════ */
export const adjacentThreats = [
  { category: "Bariatric surgery", detail: "270,089 US procedures in 2023 (sleeve 157,254; RYGB 63,132; revisions 32,267; ESG 4,587). Down 3.5% YoY but ASMBS sees rebound as GLP-1 discontinuers convert.", direction: "complement" },
  { category: "Telehealth platforms", detail: "HIMS booked >$225M GLP-1 revenue 2024, guided $725M for 2025; FY24 total revenue $1.5bn. Ro, Noom, Calibrate, Found, Mochi, Eden, Henry Meds — complementary not substitutive.", direction: "complement" },
  { category: "Generic liraglutide", detail: "Teva Victoza authorized generic Jun 2024; Hikma launched Dec 23 2024; Teva Saxenda generic approved Aug 29 2025 at ~30% discount. First-ever generic GLP-1 indicated for weight loss.", direction: "substitute" },
  { category: "WeightWatchers", detail: "Filed Chapter 11 May 6 2025, emerged Jun 24 2025, eliminating $1.15bn debt. Direct evidence of GLP-1 displacing lifestyle programs.", direction: "displaced" },
  { category: "Plenity (Gelesis)", detail: "Chapter 7 Oct 30 2023; assets sold to Theras Group Jul 2024.", direction: "displaced" },
  { category: "Older oral Rx", detail: "Contrave (Currax) +>50% YoY revenue 2024 in price-sensitive niche; phentermine generics >3M US Rx 2023 at ~$10–30/mo.", direction: "complement" },
  { category: "RNAi / gene editing", detail: "Wave (WVE-INHBE), Arrowhead (ARO-INHBE NCT06700538), Regeneron (GPR75) at Phase 1 with potential 5–10 year disruption.", direction: "long-tail" },
];

/* ═══════════════════════════════════════════
   OPERATIONS — Manufacturing Capex
   ═══════════════════════════════════════════ */
export const capexNVO = [
  { site: "Kalundborg, DK",   investment: 6.2, type: "API",          year: "2024–28" },
  { site: "Hillerød, DK",     investment: 2.8, type: "API + QC",     year: "2024–27" },
  { site: "Chartres, FR",     investment: 2.4, type: "Fill-finish",  year: "2024–27" },
  { site: "Clayton, NC",      investment: 4.1, type: "Fill-finish",  year: "2023–27" },
  { site: "Bagsværd, DK",     investment: 0.8, type: "Various",      year: "2023–26" },
  { site: "Køge, DK",         investment: 0.2, type: "Raw materials",year: "2024–26" },
  { site: "Catalent (3 sites)", investment: 11.0, type: "Acquired Dec 2024", year: "2024" },
];
export const capexLLY = [
  { site: "Lebanon LEAP, IN",  investment: 9.0, type: "API tirzepatide",      year: "2022–26" },
  { site: "Concord, NC",       investment: 2.0, type: "Fill-finish",          year: "2022–26" },
  { site: "RTP, NC",           investment: 0.92, type: "Fill-finish",         year: "2021–24" },
  { site: "Pleasant Prairie, WI", investment: 4.0, type: "Fill-finish",        year: "2023–27" },
  { site: "Alzey, DE",         investment: 2.5, type: "API",                  year: "2022–27" },
  { site: "Goochland, VA",     investment: 5.0, type: "ADCs",                 year: "2025–28" },
  { site: "Houston, TX",       investment: 6.5, type: "Orforglipron",         year: "2025–28" },
  { site: "Lebanon Foundry, IN", investment: 4.5, type: "Medicine Foundry",   year: "2024–28" },
  { site: "Kinsale, IE",       investment: 0.8, type: "Peptide",              year: "2024–25" },
  { site: "Limerick, IE",      investment: 2.0, type: "Production",           year: "2024–26" },
];

/* ═══════════════════════════════════════════
   OPERATIONS — Pricing & Reimbursement Milestones
   ═══════════════════════════════════════════ */
export const pricingPolicy = [
  { date: "Jan 2024", event: "LillyDirect launches", category: "DTC" },
  { date: "Aug 27 2024", event: "LillyDirect Zepbound vials at $349/$499", category: "DTC" },
  { date: "Mar 5 2025", event: "NovoCare Pharmacy launches Wegovy at $499", category: "DTC" },
  { date: "May 12 2025", event: "Trump signs MFN executive order", category: "Policy" },
  { date: "Jun 16 2025", event: "Zepbound vials cut to $499 all doses", category: "DTC" },
  { date: "Jul 1 2025", event: "CVS Caremark drops Zepbound (Wegovy preferred)", category: "PBM" },
  { date: "Nov 3 2025", event: "Wegovy cut to $349 ($199 intro for two lowest doses)", category: "DTC" },
  { date: "Nov 6 2025", event: "MFN voluntary deals announced — Wegovy Medicare $245; TrumpRx $346–350", category: "Policy" },
  { date: "Nov 25 2025", event: "CMS publishes Maximum Fair Prices for IRA IPAY 2027", category: "Policy" },
  { date: "Dec 1 2025", event: "Zepbound cut to $299/$399/$449", category: "DTC" },
  { date: "Jan 5 2026", event: "Wegovy oral pill launches at $149–$299", category: "DTC" },
  { date: "Jan 1 2027", event: "IRA Maximum Fair Price effective for semaglutide (9-yr clock)", category: "Policy" },
  { date: "Feb 23 2026", event: "Zepbound KwikPen multi-dose pen launches from $299", category: "DTC" },
  { date: "Apr 2026", event: "All 17 of 17 targeted manufacturers signed MFN by April; Medicare obesity coverage opens at MFN with $50/mo co-pay", category: "Policy" },
];

/* ═══════════════════════════════════════════
   OPERATIONS — Geographic Penetration
   ═══════════════════════════════════════════ */
export const geoPenetration = [
  { region: "United States",   t2dPatients: "~10–11M unique GLP-1 patients (IQVIA Q2'25)", obesity: "~17% of GLP-1 use is AOM (~1.7–1.9M)", note: "Highest penetration globally" },
  { region: "EU5",             t2dPatients: "~1.8–2.2M T2D",          obesity: "~0.6–0.9M AOM (UK alone 1.6M per Walsh 2025)", note: "NVO EUCAN GLP-1 share T2D 11.9% (vs 8.9% prior)" },
  { region: "China",           t2dPatients: "~0.6–0.8M T2D",          obesity: "~0.05–0.1M AOM",                          note: "Wegovy launched Jun 2024 self-pay; Mounjaro approved May 2024" },
  { region: "Japan",           t2dPatients: "Reimbursed Feb 2024",    obesity: "BMI ≥35 only",                            note: "Limited rollout" },
  { region: "India + Brazil",  t2dPatients: "<0.5M combined obesity 2025", obesity: "Rapid 2030 ramp expected with generic entry", note: "Generics from Mar 2026" },
];

/* ═══════════════════════════════════════════
   OPERATIONS — Sell-Side TAM 2030 Forecasts
   ═══════════════════════════════════════════ */
export const tamForecasts = [
  { bank: "Goldman Sachs",   year2030: 95,  label: "Aug 2025 (cut from $130bn)", scope: "Obesity only" },
  { bank: "Morgan Stanley",  year2030: 105, label: "2024 base case",              scope: "Obesity only" },
  { bank: "Morgan Stanley",  year2030: 144, label: "2024 bull case",              scope: "Obesity only" },
  { bank: "JPMorgan",        year2030: 100, label: "Early 2030s",                 scope: "Obesity only" },
  { bank: "JPMorgan",        year2030: 200, label: "Jan 2026 incretin TAM",      scope: "Obesity + T2D" },
  { bank: "UBS",             year2030: 130, label: "Apr 2026 (cut from $150bn+)",scope: "GLP-1 (~$80bn AOM + ~$50bn T2D)" },
  { bank: "Leerink",         year2030: 158, label: "2032E (earlier)",            scope: "Obesity only" },
  { bank: "Bernstein",       year2030: 200, label: "2035 bull",                   scope: "Obesity + T2D" },
  { bank: "Barclays Field",  year2030: 200, label: "Aug 2023",                    scope: "Semaglutide-class only" },
];

/* ═══════════════════════════════════════════
   OPERATIONS — Financial Quality Comparison
   ═══════════════════════════════════════════ */
export const financialQuality = [
  { metric: "Revenue (USD bn)",      nvo20: 19.1, nvo25: 46.7, lly20: 24.5, lly25: 65.2 },
  { metric: "Operating margin %",    nvo20: 42.6, nvo25: 41.3, lly20: 23.7, lly25: 40.4 },
  { metric: "Net margin %",          nvo20: 33.2, nvo25: 33.1, lly20: 25.2, lly25: 31.7 },
  { metric: "ROIC %",                nvo20: 75,   nvo25: 24.5, lly20: 14,   lly25: 25.2 },
  { metric: "FCF margin %",          nvo20: 22.5, nvo25: 9.2,  lly20: 7,    lly25: 16   },
  { metric: "R&D / sales %",         nvo20: 12.2, nvo25: 16.8, lly20: 24.4, lly25: 20.5 },
  { metric: "Capex / sales %",       nvo20: 5,    nvo25: 19.5, lly20: 5,    lly25: 16   },
  { metric: "Net debt / EBITDA",     nvo20: -0.2, nvo25: 0.66, lly20: 0.5,  lly25: 1.25 },
];

/* ═══════════════════════════════════════════
   OPERATIONS — Valuation Multiples Time Series
   ═══════════════════════════════════════════ */
export const valuationSeries = [
  { q: "Q2'23", nvoFwdPE: 33.0, llyFwdPE: 50.0 },
  { q: "Q3'23", nvoFwdPE: 36.0, llyFwdPE: 52.0 },
  { q: "Q4'23", nvoFwdPE: 37.5, llyFwdPE: 53.4 },
  { q: "Q1'24", nvoFwdPE: 42.0, llyFwdPE: 60.0 },
  { q: "Q2'24", nvoFwdPE: 38.0, llyFwdPE: 55.0 },
  { q: "Q3'24", nvoFwdPE: 32.0, llyFwdPE: 48.0 },
  { q: "Q4'24", nvoFwdPE: 27.2, llyFwdPE: 35.1 },
  { q: "Q1'25", nvoFwdPE: 22.0, llyFwdPE: 38.0 },
  { q: "Q2'25", nvoFwdPE: 18.5, llyFwdPE: 41.0 },
  { q: "Q3'25", nvoFwdPE: 16.0, llyFwdPE: 44.0 },
  { q: "Q4'25", nvoFwdPE: 14.1, llyFwdPE: 46.8 },
  { q: "Q1'26", nvoFwdPE: 11.7, llyFwdPE: 28.6 },
];

/* ═══════════════════════════════════════════
   PRESCRIPTIONS — US weekly TRx, Mounjaro / Zepbound / Wegovy
   IQVIA NPA via @semodough; Novo and Lilly disclosed run-rates;
   Leerink / Jefferies / Barclays / BMO weekly tracker for pill launch
   ═══════════════════════════════════════════ */
// Sparse public anchors. x = week ending date (ISO). Plotted as line series.
export const usWeeklyTRx = [
  { date: "2024-01-26", week: "W04'24", mounjaro: 291225, zepbound: 22335,  wegovy: null },
  { date: "2024-03-08", week: "W10'24", mounjaro: null,   zepbound: 77590,  wegovy: null },
  { date: "2024-05-03", week: "W18'24", mounjaro: null,   zepbound: null,   wegovy: 130000 }, // Novo Q1'24 run-rate anchor
  { date: "2025-01-23", week: "W04'25", mounjaro: null,   zepbound: null,   wegovy: 200000 }, // Novo Q4'24 anchor
  { date: "2025-04-11", week: "W15'25", mounjaro: 530200, zepbound: 339800, wegovy: null },
  { date: "2025-04-18", week: "W16'25", mounjaro: 533900, zepbound: 338900, wegovy: null },
  { date: "2025-09-05", week: "W36'25", mounjaro: 638000, zepbound: 429000, wegovy: 284000 },
  { date: "2026-01-23", week: "W04'26", mounjaro: null,   zepbound: null,   wegovy: 230000 }, // Novo FY25 anchor (week ending 23 Jan 26)
  { date: "2026-04-17", week: "W16'26", mounjaro: null,   zepbound: null,   wegovy: 270000 }, // Novo Q1'26 anchor (week ending 17 Apr 26)
];

/* ═══════════════════════════════════════════
   PRESCRIPTIONS — Wegovy oral pill launch curve (US weekly TRx)
   Launched 5 Jan 2026; first 17 weeks ramp
   ═══════════════════════════════════════════ */
export const wegovyPillLaunch = [
  { week: "W01'26", weekEnd: "2026-01-09", trx: 3071,   source: "Leerink / IQVIA NPA" },
  { week: "W02'26", weekEnd: "2026-01-16", trx: 18410,  source: "Jefferies / IQVIA NPA" },
  { week: "W03'26", weekEnd: "2026-01-23", trx: 26109,  source: "Barclays / IQVIA NPA" },
  { week: "W17'26", weekEnd: "2026-04-24", trx: 135000, source: "BMO press estimate" },
];

/* ═══════════════════════════════════════════
   PRESCRIPTIONS — Wegovy US weekly Rx run-rate (Novo's own disclosure)
   Quarterly anchors from interim reports — "as of" date in note
   ═══════════════════════════════════════════ */
export const wegovyRunRate = [
  { period: "Q1'24", date: "Jan 2024",     injectable: 130000, pill: null,   note: "Q1 2024 Interim Report" },
  { period: "Q4'24", date: "Jan 2025",     injectable: 200000, pill: null,   note: "FY 2024 Interim Report" },
  { period: "Q3'25", date: "Q3 2025",      injectable: 270000, pill: null,   note: "9M 2025 Interim Report" },
  { period: "Q4'25", date: "23 Jan 2026",  injectable: 230000, pill: null,   note: "FY 2025 Interim Report" },
  { period: "Q1'26", date: "17 Apr 2026",  injectable: 270000, pill: 200000, note: "Q1 2026 Interim Report; pill launched 5 Jan 2026" },
];

/* ═══════════════════════════════════════════
   PRESCRIPTIONS — US monthly TRx, long view
   2022 baseline through Feb 2024; from JAMA Health Forum (Scannell 2024)
   and JAMA Network Open (Berning 2025); IQVIA NPA PayerTrak
   Values in thousands of scripts per month
   ═══════════════════════════════════════════ */
export const usMonthlyTRxLong = [
  { month: "Jan'22", date: "2022-01", ozempic: 472,  wegovy: null, mounjaro: null, zepbound: null, saxenda: null },
  { month: "Dec'22", date: "2022-12", ozempic: null, wegovy: 36,   mounjaro: null, zepbound: null, saxenda: null },
  { month: "Jan'23", date: "2023-01", ozempic: null, wegovy: 158,  mounjaro: null, zepbound: null, saxenda: null },
  { month: "May'23", date: "2023-05", ozempic: null, wegovy: 520,  mounjaro: null, zepbound: null, saxenda: null },
  { month: "Aug'23", date: "2023-08", ozempic: 1969, wegovy: null, mounjaro: null, zepbound: null, saxenda: null },
  { month: "Dec'23", date: "2023-12", ozempic: null, wegovy: null, mounjaro: null, zepbound: null, saxenda: null },
  { month: "Feb'24", date: "2024-02", ozempic: 2000, wegovy: 420,  mounjaro: 1200, zepbound: 250,  saxenda: 110 },
];

/* ═══════════════════════════════════════════
   PRESCRIPTIONS — Patients on therapy (Novo, millions)
   From Novo annual / interim "patients reached" disclosures
   ═══════════════════════════════════════════ */
export const novoPatientsOnTherapy = [
  { period: "FY'24", obesityM: 2.2, diabetesM: 43.0 },
  { period: "FY'25", obesityM: 3.6, diabetesM: 42.0 },
  { period: "Q1'26", obesityM: 4.1, diabetesM: 41.2 },
];

/* ═══════════════════════════════════════════
   PRESCRIPTIONS — Global obesity GLP-1 value share by quarter
   Computed from quarterly product net sales (Wegovy+Saxenda vs Zepbound)
   ═══════════════════════════════════════════ */
export const obesityValueShare = [
  { q: "Q4'23", novo: 89.5, lilly: 10.5, source: "Computed: Wegovy ~$1130M + Saxenda ~$370M vs Zepbound $176M" },
  { q: "Q4'24", novo: 56.0, lilly: 44.0, source: "Computed: Wegovy ~$2200M + Saxenda ~$220M vs Zepbound $1907M" },
  { q: "Q3'25", novo: 47.7, lilly: 52.3, source: "Computed: Q3 inflection — Zepbound overtakes Wegovy globally" },
  { q: "Q4'25", novo: 44.5, lilly: 55.5, source: "Computed: Wegovy $3303M + Saxenda $88M vs Zepbound $4261M" },
  { q: "Q1'26", novo: 41.3, lilly: 58.7, source: "Computed: Wegovy $2858M + Saxenda $66M vs Zepbound $4160M" },
];

/* ═══════════════════════════════════════════
   PRESCRIPTIONS — US Lilly TRx share-of-market (their own disclosure)
   T2D: Mounjaro vs other US T2D incretin analogs
   AOM: Zepbound vs other US branded anti-obesity
   ═══════════════════════════════════════════ */
export const llyTRxShareOfMarket = [
  { q: "Q3'25", t2dMounjaro: 45, t2dNbrxMounjaro: 54, aomZepbound: 63, aomNbrxZepbound: 71 },
  { q: "Q4'25", t2dMounjaro: null, t2dNbrxMounjaro: null, aomZepbound: 64, aomNbrxZepbound: null },
];

/* ═══════════════════════════════════════════
   PRESCRIPTIONS — YoY sales growth by product, Q1 2026
   ═══════════════════════════════════════════ */
export const q1_26GrowthYoY = [
  { product: "Mounjaro",      company: "LLY", growthPct: 125, color: "deepBlue" },
  { product: "Zepbound",      company: "LLY", growthPct: 80,  color: "deepBlue" },
  { product: "Wegovy inj.",   company: "NVO", growthPct: 12,  color: "capRed" },
  { product: "Ozempic US",    company: "NVO", growthPct: -8,  color: "capRed" },
  { product: "Trulicity",     company: "LLY", growthPct: -34, color: "purple" },
  { product: "Victoza",       company: "NVO", growthPct: -45, color: "purple" },
];

/* ═══════════════════════════════════════════
   PRESCRIPTIONS — Critical data gaps flagged by CI memo
   ═══════════════════════════════════════════ */
export const dataGaps = [
  { gap: "Pre-2023 Novo product-by-region quarterly data", note: "Exists in Appendix 5/6 of each interim report; not retrieved this pass." },
  { gap: "Lilly per-product country-level revenue", note: "Lilly does not disclose. Only US vs. Outside-US in 10-Q/10-K." },
  { gap: "Weekly TRx anchors for Ozempic, Trulicity, Rybelsus, Saxenda 2024–2026", note: "Sporadic in public; institutional dashboard requires direct IQVIA NPA Weekly subscription." },
  { gap: "NBRx by week", note: "Essentially absent in public. Closest anchors: Novo Wegovy 25k/wk NBRx (May 2024) and Lilly Q3'25 SOM percentages." },
  { gap: "Payer mix splits", note: "Neither Novo nor Lilly discloses commercial / Medicare / Medicaid / cash splits." },
  { gap: "Mazdutide actual sales", note: "Innovent has not yet broken out Xinermei. Only Morningstar projection (~$84m FY2025)." },
  { gap: "Wegovy pill revenue split", note: "Novo has not yet disaggregated pill from Wegovy franchise total in Q1 2026." },
];
