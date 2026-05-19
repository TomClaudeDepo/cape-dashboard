// TMO — Product map + Canadian-Railways style valuation table
// One-stop data for the "what they do" product visual and the headline val table.

/* ═══════════════════════════════════════════
   PRODUCT MAP — TEST TUBES TO TRIALS
   The visual flow showing TMO's full-stack offering
   ═══════════════════════════════════════════ */
export const productMapIntro = "Thermo Fisher's competitive distinctiveness is that it owns the entire pharma development and manufacturing value chain — from the test tube in a basic-research lab to the digital endpoint in a Phase 3 trial. Most peers play in one or two slices. TMO plays in all of them. The map below shows the full stack.";

export const productStack = [
  {
    stage: "1",
    name: "Lab supplies & consumables",
    sub: "Test tubes, pipettes, reagents, lab plastics",
    desc: "Fisher Scientific channel — the lab supply backbone. Every academic, biotech, hospital, and pharma research lab buys lab plastics, reagents, and consumables. TMO is the largest distributor globally. Defensive, recurring, low-margin but scale-advantaged.",
    color: "#0EA5E9",
    products: ["Fisher Scientific channel", "Invitrogen reagents", "Nalgene labware", "Gibco cell culture media (research)"],
    revBucket: "Fisher channel ~ $9-10bn / ~22%",
    end: "Academic, biotech, pharma R&D, hospital labs",
  },
  {
    stage: "2",
    name: "Research instruments",
    sub: "Mass spec, sequencing, cryo-EM, qPCR",
    desc: "High-end analytical instruments used in drug discovery and basic research. Orbitrap mass spec is the franchise crown jewel — a multi-decade gold standard in proteomics. Ion Torrent NGS, Applied Biosystems qPCR, and cryo-electron microscopy round out the lineup.",
    color: "#1D4ED8",
    products: ["Orbitrap mass spec", "Ion Torrent NGS", "Applied Biosystems qPCR", "Cryo-EM (Krios, Glacios)", "Electron microscopy"],
    revBucket: "Analytical Instruments ~ $7-8bn / ~17%",
    end: "Pharma discovery, academic research, applied markets",
  },
  {
    stage: "3",
    name: "Specialty diagnostics",
    sub: "Allergy, transplant, immunodiagnostics",
    desc: "The smallest segment but with deep moats. ImmunoCAP is the global standard for allergy testing. One Lambda is the leader in transplant diagnostics. Recurring clinical lab revenue with limited cyclicality.",
    color: "#9333EA",
    products: ["ImmunoCAP allergy testing", "One Lambda transplant diagnostics", "Newborn screening", "Clinical mass spec"],
    revBucket: "Specialty Diagnostics ~ $4-5bn / ~10%",
    end: "Hospitals, reference labs, clinical labs",
  },
  {
    stage: "4",
    name: "Clinical trials & CRO",
    sub: "PPD + Clario",
    desc: "PPD (acquired 2021, $20.9bn) runs Phase 1-4 clinical trials for pharma. Clario (closing 2026, ~$9bn) provides electronic clinical outcome assessment, wearable integration, cardiac monitoring, medical imaging, and digital biomarkers. Together — one of the top three CROs globally.",
    color: "#EA580C",
    products: ["PPD clinical research operations", "Clario eCOA + digital endpoints", "Wearables / DCT infrastructure", "Bioanalytical services"],
    revBucket: "Clinical Research (PPD + Clario) ~ $7-8bn / ~17%",
    end: "Pharma development teams (Phase 1-4)",
  },
  {
    stage: "5",
    name: "Bioproduction — the arms dealer",
    sub: "Cell culture media, single-use, purification",
    desc: "Gibco cell culture media, HyClone bioreactors, purification chromatography resins. TMO is one of three global oligopolists (with Cytiva and Sartorius). Sold to every biologics manufacturer on earth — including CDMOs that compete with TMO's own Patheon. The arms dealer position.",
    color: "#059669",
    products: ["Gibco cell culture media", "HyClone single-use bioreactors", "POROS chromatography resins", "Pierce filtration", "Single-use assemblies"],
    revBucket: "Bioproduction (in LSS) ~ $4-5bn / ~10%",
    end: "All biologics manufacturers (pharma + CDMOs)",
  },
  {
    stage: "6",
    name: "Drug substance manufacturing",
    sub: "Patheon biologics + small molecule",
    desc: "Patheon (acquired 2017, $7.2bn). Contract manufactures the active pharmaceutical ingredient for pharma clients — biologics drug substance via Patheon's biologics facilities, small molecule API via traditional sites. Third or fourth player globally in biologics drug substance.",
    color: "#DC2626",
    products: ["Biologics drug substance", "Small molecule API", "Cell + gene therapy manufacturing (Brammer Bio)", "ADC conjugation"],
    revBucket: "Patheon drug substance (in PSS) ~ $3-4bn / ~8%",
    end: "Pharma & biotech clinical and commercial supply",
  },
  {
    stage: "7",
    name: "Sterile fill-finish + packaging",
    sub: "Patheon final dosage form",
    desc: "Fill-finish is where biologics get put into vials, pre-filled syringes, and auto-injectors. The Sanofi NJ acquisition (2025) added best-in-class sterile aseptic capacity in the US — perfectly timed for the GLP-1 pre-filled syringe boom and US reshoring. The most strategically important capacity in the company today.",
    color: "#F59E0B",
    products: ["Sterile fill-finish (vials + pre-filled syringes)", "Sanofi NJ site", "Cold chain packaging", "Auto-injector assembly"],
    revBucket: "Fill-finish + packaging (in PSS) ~ $3-4bn / ~8%",
    end: "Pharma commercial supply, especially biologics + GLP-1",
  },
  {
    stage: "8",
    name: "Commercial supply chain & channel",
    sub: "Distribution to point of use",
    desc: "Fisher channel also serves the commercial side — distributing pharma products, lab supplies, and consumables to hospitals and end users. Closes the loop from R&D back to the customer.",
    color: "#64748B",
    products: ["Fisher Healthcare distribution", "Cold chain logistics", "Channel services"],
    revBucket: "Channel + services (cross-segment) ~ $3-4bn / ~8%",
    end: "Hospitals, clinical labs, retail",
  },
];

export const productMapInsight = "The 'arms dealer' angle is the most important framing. TMO Bioproduction (cell culture media, single-use systems, chromatography resins) is sold to EVERY biologics manufacturer on earth — including TMO's own competitor CDMOs (Lonza, Samsung Biologics, post-Novo Catalent). Wuxi Biologics buys TMO bioproduction inputs. Roche, AstraZeneca, Pfizer, Amgen, Lilly, Novo all buy them. This is the highest-quality competitive position in the company — TMO captures value from biologics manufacturing growth regardless of which manufacturer wins the customer.";

/* ═══════════════════════════════════════════
   CANADIAN-RAILWAYS-STYLE VALUATION TABLE
   Two views: (1) TMO multiples vs own history, (2) TMO vs peers
   ═══════════════════════════════════════════ */
export const valHistory = [
  { metric: "P/E (NTM)", current: "16.8x", avg5y: "22x", low5y: "16x", high5y: "30x", vsAvg: "-24%" },
  { metric: "P/E (FY26)", current: "17.6x", avg5y: "21x", low5y: "16x", high5y: "27x", vsAvg: "-16%" },
  { metric: "P/E (FY27)", current: "16.1x", avg5y: "20x", low5y: "15x", high5y: "25x", vsAvg: "-19%" },
  { metric: "P/E (FY28)", current: "14.5x", avg5y: "19x", low5y: "14x", high5y: "24x", vsAvg: "-24%" },
  { metric: "EV/EBITDA (NTM)", current: "16.1x", avg5y: "18x", low5y: "14x", high5y: "22x", vsAvg: "-11%" },
  { metric: "EV/EBITDA (FY27)", current: "15.3x", avg5y: "17x", low5y: "13x", high5y: "21x", vsAvg: "-10%" },
  { metric: "EV/EBITDA (FY28)", current: "14.1x", avg5y: "16x", low5y: "12x", high5y: "20x", vsAvg: "-12%" },
  { metric: "EV/Revenue (NTM)", current: "4.2x", avg5y: "5.5x", low5y: "3.5x", high5y: "8x", vsAvg: "-24%" },
  { metric: "P/FCF (NTM)", current: "16.5x", avg5y: "20x", low5y: "15x", high5y: "26x", vsAvg: "-18%" },
  { metric: "P/B (FY26)", current: "3.0x", avg5y: "4.5x", low5y: "2.8x", high5y: "6.5x", vsAvg: "-33%" },
];

export const peerValTable = [
  { peer: "Thermo Fisher (TMO)", ticker: "TMO US", fwdPE: "16.8x", fy27PE: "16.1x", evEbitda: "16.1x", evRev: "4.2x", growth: "3-4%", opMargin: "21.8%", fcfYield: "3.8%", note: "Cheapest large-cap on quality-adjusted basis" },
  { peer: "Danaher", ticker: "DHR US", fwdPE: "24x", fy27PE: "21x", evEbitda: "19x", evRev: "5.2x", growth: "4-6%", opMargin: "27%", fcfYield: "4.2%", note: "Pure-play premium; quality fully priced" },
  { peer: "Sartorius", ticker: "SRT GR", fwdPE: "28x", fy27PE: "22x", evEbitda: "18x", evRev: "5.8x", growth: "6-10% recovering", opMargin: "27%", fcfYield: "2.3%", note: "Pure-play; highest beta to bioproduction recovery" },
  { peer: "Agilent", ticker: "A US", fwdPE: "19x", fy27PE: "17x", evEbitda: "14x", evRev: "3.8x", growth: "3-5%", opMargin: "24%", fcfYield: "5.0%", note: "Analytical instruments specialist; no bioproduction" },
  { peer: "Waters", ticker: "WAT US", fwdPE: "21x", fy27PE: "19x", evEbitda: "16x", evRev: "5.4x", growth: "4-6%", opMargin: "29%", fcfYield: "4.5%", note: "Premium QARP; ~50% recurring; Fundsmith largest position" },
  { peer: "Merck KGaA", ticker: "MRK GR", fwdPE: "13x", fy27PE: "12x", evEbitda: "9x", evRev: "2.4x", growth: "3-5%", opMargin: "23%", fcfYield: "7.5%", note: "Diversified conglomerate; cheapest but Life Science is just one segment" },
];

export const valInsight = "TMO trades at roughly a 25% discount to its own 5-year average multiple AND at a substantial discount to its closest pure-play peer (Danaher), despite owning a uniquely broad cross-section of the same secular themes that justify Danaher's premium. The setup mirrors the asymmetry we identified in Canadian National in early 2025: a high-quality cyclical compounder where the multiple has compressed during a cycle trough, with consensus EPS estimates that have held remarkably stable despite the de-rating. The cheap multiple is only cheap if you believe the consensus numbers — that's the asymmetric setup, and the cyclical-trough indicators on the dedicated tab argue that consensus is reasonable rather than aggressive.";
