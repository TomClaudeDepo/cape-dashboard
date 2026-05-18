// TMO (Thermo Fisher Scientific) — Business Primer Data
// Pure business education — no financials, no valuations
// Focus on the blockbuster products and offerings that drive the investment thesis

export const heroStats = [
  { value: "$44.6B", label: "FY2025 revenue across four operating segments", color: "deepBlue" },
  { value: "57%", label: "Pharma and biotech share of end-market revenue", color: "capRed" },
  { value: "~400k", label: "Customers globally — no single customer above 10%", color: "green" },
  { value: "~80%", label: "Revenue described as recurring or consumable", color: "orange" },
  { value: "125k", label: "Global employees serving 50+ countries", color: "purple" },
  { value: "20+ years", label: "Of disciplined M&A under Casper since 2009", color: "deepBlue" },
];

/* ═══════════════════════════════════════════
   BUSINESS DESCRIPTION
   ═══════════════════════════════════════════ */
export const businessDescription = [
  "Thermo Fisher Scientific is the largest life sciences tools and services company in the world. Headquartered in Waltham, Massachusetts, it sells the instruments, consumables, software, contract services, and clinical research capabilities that pharmaceutical companies, biotechs, hospitals, government laboratories, and academic researchers use to discover, develop, manufacture, and deliver new medicines and diagnostics. Annual revenue in FY2025 was $44.56 billion, generated from a portfolio of roughly 400,000 customers across more than 50 countries.",
  "The modern company was created in 2006 when Thermo Electron and Fisher Scientific merged in a stock-for-stock combination, bringing together two complementary franchises — Thermo Electron's portfolio of analytical instruments and life sciences technologies, and Fisher Scientific's industry-leading distribution channel for laboratory supplies and consumables. Since then the company has expanded aggressively through M&A, most notably acquiring Life Technologies in 2014 ($13.6 billion, adding Gibco bioproduction and Applied Biosystems genetic analysis), FEI in 2016 ($4.2 billion, the global leader in electron microscopy), Patheon in 2017 ($7.2 billion, contract drug manufacturing), PPD in 2021 ($20.9 billion, clinical research services), and Clario in 2026 ($9 billion, eClinical digital endpoints).",
  "What distinguishes Thermo Fisher from any other life sciences company is breadth. A single large pharmaceutical customer might use Thermo Fisher cell culture media to manufacture a biologic drug, contract Thermo Fisher to run the clinical trials, contract Thermo Fisher again to manufacture the commercial drug substance and fill the vials, use Thermo Fisher mass spectrometers for quality control, buy Thermo Fisher reagents for internal research, and source basic lab supplies through the Fisher Scientific channel. No competitor offers the full stack under one roof. That platform position is the core strategic asset.",
  "End-market exposure is heavily weighted to pharma and biotech (57 percent of revenue), with the balance roughly split between academic and government laboratories (15 percent), industrial and applied markets such as forensics, food safety, and environmental testing (14 percent), and diagnostics and healthcare customers (14 percent). The company has no material customer concentration — its largest single customer represents less than 10 percent of revenue, which is itself a quality marker.",
];

/* ═══════════════════════════════════════════
   BUSINESS SEGMENTS
   ═══════════════════════════════════════════ */
export const segmentsProse = "Thermo Fisher reports in four operating segments. The structure is partly historical (reflecting prior acquisitions) and partly functional (distinguishing tools, distribution, services, and diagnostics). Understanding what sits where is essential to understanding the company.";

export const segments = [
  {
    name: "Laboratory Products & Biopharma Services",
    share: 52,
    color: "#1D4ED8",
    description: "The largest segment by revenue, this is actually three distinct businesses combined under one reporting umbrella. First, the Fisher Scientific distribution channel — pipettes, glassware, gloves, basic chemicals, third-party lab equipment — which acts as the one-stop shop for laboratory supplies across academic, industrial, and pharma research customers. Second, Pharma Services (the Patheon brand), a global contract development and manufacturing organisation that produces drug substance and drug product, with particular strength in sterile fill-finish, packaging, and clinical trial supply. Third, Clinical Research (PPD plus Clario), a contract research organisation that manages clinical trials end-to-end and now offers digital endpoint measurement capabilities for decentralised trials.",
    growthNote: "Growth dynamics differ sharply across the three sub-businesses. The Fisher Scientific channel grows at low-to-mid single digits — it tracks lab activity broadly and faces ongoing margin pressure from private label and direct competitors. Pharma Services / Patheon has been the swing factor in recent years, with growth driven by GLP-1 fill-finish capacity, biologics drug substance, and the US reshoring of pharmaceutical manufacturing. The 2025 acquisition of Sanofi's New Jersey sterile fill-finish site expanded the segment's aseptic capacity at exactly the right moment. Clinical Research is mid-to-high single digit growth, accelerated by the Clario acquisition closing in 2026.",
    costNote: "Cost structure varies by sub-business. The Fisher Scientific channel has the lowest gross margins (low-30s percent) because it is fundamentally a distribution business with limited proprietary content. Pharma Services has higher gross margins (mid-30s to low-40s percent) but requires significant ongoing capital expenditure on manufacturing facilities — Patheon operates around 50 manufacturing and service sites globally. Clinical Research is labour-intensive, with operating margins more sensitive to wage inflation and trial activity than the rest of the company.",
  },
  {
    name: "Life Sciences Solutions",
    share: 22,
    color: "#059669",
    description: "The crown-jewel segment from a moat and growth perspective, housing the Bioproduction franchise (cell culture media, single-use bioreactors, downstream purification), Biosciences (research reagents, antibodies, cell biology consumables, primarily under the Invitrogen brand), and Genetic Sciences (qPCR, Sanger sequencing, microarrays, plus the Ion Torrent next-generation sequencing platform). Bioproduction is the most important sub-business strategically — it sells the cell culture media and single-use bioreactor systems that go directly into commercial biologic drug manufacturing.",
    growthNote: "Bioproduction is the highest-growth sub-business in the company through the cycle, historically growing at low double digits driven by the secular shift from small molecule to biologic drugs. After a difficult 2022 to 2024 inventory destock following the COVID-driven peak, growth is reaccelerating into 2026 on GLP-1 manufacturing scale-up, biologics pipeline expansion, and cell and gene therapy commercialisation. Biosciences and Genetic Sciences grow at mid-single-digit rates with cyclical sensitivity to biotech R&D funding levels.",
    costNote: "Life Sciences Solutions carries the highest gross margins in the company — typically 50 percent or better — reflecting the proprietary nature of cell culture media formulations, the regulated switching costs in bioproduction, and the consumables economics in research reagents. Capital intensity is moderate; the main investments are in manufacturing capacity for media and single-use systems, and in R&D for new product development.",
  },
  {
    name: "Analytical Instruments",
    share: 16,
    color: "#EA580C",
    description: "The segment houses Thermo Fisher's high-end laboratory instrumentation business. Three main product families: chromatography and mass spectrometry (HPLC systems, the proprietary Orbitrap mass spec platform, gas chromatography, ion chromatography), electron microscopy (cryo-EM, transmission electron microscopy, scanning electron microscopy under the Thermo Scientific brand acquired with FEI in 2016), and chemical and materials analysis (X-ray diffraction, atomic spectroscopy, elemental analysers). End markets span pharma quality control, academic structural biology, semiconductor metrology, environmental and food safety testing, and industrial materials characterisation.",
    growthNote: "Analytical Instruments has been the most cyclically pressured segment over 2024 to 2026. Academic and government budget constraints (NIH funding overhang, Chinese austerity in scientific procurement, European fiscal pressures), pharma R&D capex restraint, and semiconductor industry softness in the metrology piece have all weighed on demand for new instrument placements. The recurring revenue piece (service contracts, consumables on installed base) has been more resilient, growing low single digits even through the downturn.",
    costNote: "Instruments carry moderate gross margins (40-45 percent typical) reflecting the proprietary technology in mass spec and electron microscopy, offset by the more competitive pricing dynamics in standard chromatography. Operating margins are below the corporate average due to the segment's higher R&D intensity (some of the most expensive instruments take a decade to develop) and the fixed cost base of global service organisations.",
  },
  {
    name: "Specialty Diagnostics",
    share: 10,
    color: "#9333EA",
    description: "The smallest segment, comprising clinical diagnostics consumables and instruments, immunodiagnostics (allergy and autoimmune testing through the ImmunoCAP platform), microbiology, transplant diagnostics, and the healthcare market channel (a clinical equivalent of the Fisher Scientific distribution business serving hospital laboratories and physician offices). Specific franchises include Phadia (allergy testing), One Lambda (transplant), and Oxoid (microbiology).",
    growthNote: "Specialty Diagnostics is the slowest-growth segment, typically expanding at low-to-mid single digits with limited cyclicality. The allergy testing franchise is the highest-quality piece — leading global position, recurring consumable revenue, well-protected by clinical workflows. Transplant diagnostics has a similar profile in a niche but durable end market. The slower-growth pieces are the basic clinical diagnostics consumables and the healthcare channel distribution, which face competitive pressure from larger diagnostics specialists.",
    costNote: "Specialty Diagnostics carries the highest operating margins in the company, often 27 to 30 percent versus the corporate average around 22 percent. This reflects the recurring consumable revenue mix, the niche nature of the leading franchises, and lower capital intensity. The segment is a quiet compounder rather than a growth engine.",
  },
];

/* ═══════════════════════════════════════════
   END MARKETS AND GEOGRAPHY
   ═══════════════════════════════════════════ */
export const endMarkets = [
  { name: "Pharma & Biotech", share: 57, color: "#1D4ED8", description: "The dominant customer base. Includes both research and development spending (lab supplies, reagents, instruments, contract research) and manufacturing spending (cell culture media, single-use bioreactor systems, contract drug manufacturing, fill-finish). Within pharma and biotech, the customer mix spans large pharma (Pfizer, Roche, AstraZeneca, Amgen, Lilly, Novo, Merck and others), mid-cap and emerging biotech (thousands of smaller customers), and cell and gene therapy specialists. Demand cycles with biopharma R&D budgets and manufacturing capacity expansion." },
  { name: "Academic & Government", share: 15, color: "#EA580C", description: "Research universities, national laboratories, government agencies (NIH, CDC, DOE, DOD in the US; similar institutions globally), and foundation-funded research. Most exposed to Analytical Instruments demand (mass spec, electron microscopy purchases) and to research consumables through the Fisher Scientific channel. Currently under cyclical pressure from NIH funding uncertainty, Chinese austerity in scientific procurement, and European fiscal constraints." },
  { name: "Industrial & Applied", share: 14, color: "#9333EA", description: "Forensics laboratories, environmental testing organisations, food safety testing, semiconductor manufacturing (metrology applications for advanced node inspection), materials characterisation, and homeland security. Generally lower-growth but more stable than academic and government — driven by regulatory requirements (food safety, drug testing, environmental monitoring) rather than discretionary research budgets." },
  { name: "Diagnostics & Healthcare", share: 14, color: "#059669", description: "Hospital laboratories, reference labs, physician offices, and clinical research customers. Includes both Specialty Diagnostics products (allergy, transplant, microbiology) sold directly to clinical customers and the healthcare distribution channel that delivers consumables and equipment to point-of-care settings. Driven by clinical testing volumes and demographic trends rather than R&D budgets." },
];

export const researchVsProduction = {
  intro: "A useful way to cut through the segment structure is to ask: how much of Thermo Fisher's revenue ultimately goes into research (drug discovery, basic science, instrument-driven analysis) versus production (commercial drug manufacturing, fill-finish, packaging)? The answer reveals the strategic asymmetry inside the company.",
  buckets: [
    { name: "Research-oriented businesses", share: 50, color: "#1D4ED8", detail: "Biosciences and Genetic Sciences (research reagents, qPCR, sequencing) within LSS, Analytical Instruments segment (mass spec, electron microscopy, chromatography) end-to-end, and the Research and Safety Market Channel (Fisher Scientific distribution serving research labs) within LP&BS. Approximately half of company revenue serves research and development workflows rather than commercial production." },
    { name: "Production-oriented businesses", share: 25, color: "#059669", detail: "Bioproduction within LSS (cell culture media, single-use bioreactors, downstream purification — sold directly into commercial biologic drug manufacturing) plus Pharma Services / Patheon within LP&BS (drug substance manufacturing, sterile fill-finish, packaging). Approximately a quarter of company revenue goes directly into making approved medicines at commercial scale." },
    { name: "Clinical Research bridge", share: 12, color: "#EA580C", detail: "PPD plus the newly acquired Clario, sitting in LP&BS. Clinical research management spans the drug development workflow — designing, recruiting, and operating clinical trials for biopharma sponsors. It sits between research and production conceptually; the trial activity itself uses research consumables, while the output (clinical data) supports regulatory approval for commercial manufacturing." },
    { name: "Diagnostics and applied", share: 13, color: "#9333EA", detail: "Specialty Diagnostics segment plus parts of Analytical Instruments going into industrial and applied markets. Not strictly research or production in the pharmaceutical sense, but driven by similar high-quality regulated demand." },
  ],
  insight: "The strategic point: research-oriented revenue is the larger absolute bucket, but production-oriented revenue is where the moat, the growth, and the bull case live. Bioproduction and Pharma Services have higher gross margins (50 percent plus versus high-30s for research consumables), much higher switching costs (FDA process lock-in versus academic preference), and the structural tailwinds (GLP-1 manufacturing, biologics supercycle, US reshoring) play directly into those businesses. The corporate-level multiple is dragged down by the larger but lower-quality research and distribution pieces — which is part of why TMO trades at a discount to pure-play Sartorius or to Danaher (which has shed its lower-quality businesses).",
};

/* ═══════════════════════════════════════════
   BLOCKBUSTER PRODUCT PRIMERS
   Three deep-dives modelled on the ASML EUV primer
   ═══════════════════════════════════════════ */

// ─── PRIMER 1: BIOPRODUCTION ───
export const bioproduction = {
  title: "Bioproduction",
  subtitle: "The arms dealer of biologic drug manufacturing",
  color: "green",
  heroStats: [
    { value: "$4-5B", label: "Estimated annual revenue (within Life Sciences Solutions)" },
    { value: "~50%+", label: "Gross margins on cell culture media" },
    { value: "Triopoly", label: "TMO / Cytiva (Danaher) / Sartorius globally" },
    { value: "15-20yr", label: "Typical product lifecycle per approved drug" },
    { value: "Switching = refile", label: "Changing media requires FDA regulatory amendment" },
    { value: "GLP-1", label: "Manufacturing scale-up is the current commercial tailwind" },
  ],
  intro: "Bioproduction is the most important single product family to Thermo Fisher's investment thesis. It is the 'arms dealer' position in biologic drug manufacturing — Thermo Fisher does not make the drug, it sells the critical inputs that everyone else uses to make the drug. The customer base spans every major pharmaceutical manufacturer in the world plus every CDMO (Lonza, Catalent, Samsung Biologics, Wuxi Biologics) that produces biologics on contract. Whoever wins the biologics manufacturing race, Thermo Fisher participates in the upside through media and bioreactor sales.",
  coreProblem: "Modern biologic drugs — monoclonal antibodies, GLP-1 peptides like semaglutide and tirzepatide, antibody-drug conjugates, cell and gene therapies, mRNA vaccines — are manufactured by genetically engineered cells (typically CHO cells, Chinese hamster ovary lines) grown in bioreactors. The cells consume a precisely formulated nutrient broth (the 'media') and secrete the drug protein, which is then purified through a series of chromatography and filtration steps. Every part of this process is locked into the drug's FDA approval — the specific media composition, the bioreactor type, the purification resins. Switching any input means filing a regulatory amendment with the FDA, which can take 12 to 24 months and risks delaying drug supply. The supplier captured at FDA filing time effectively wins a 15 to 20 year annuity.",
  stages: [
    {
      id: "media",
      title: "Stage 1 — Cell culture media",
      subtitle: "The proprietary nutrient broth",
      content: "Cell culture media is the most strategic product in the bioproduction stack. A modern media formulation contains 80 to 100 distinct components — amino acids, sugars, vitamins, trace minerals, lipids, growth factors, buffering agents — each at precise concentrations optimised for a specific cell line and product. Thermo Fisher sells media under the Gibco and HyClone brands, with the Gibco brand specifically dominant in commercial biologics manufacturing.",
      detail: "Two flavours exist. Off-the-shelf catalogue media (Gibco's standardised formulations) is sold widely into research and early-stage development. Custom media — formulated specifically for a customer's proprietary cell line and process — is the commercial gold mine. Once a custom media is designed-in during process development, validated in clinical trials, and submitted in the FDA Biologics License Application, switching is essentially impossible without a regulatory refile. The pharmaceutical company will pay whatever Thermo Fisher charges for that specific media for the entire commercial life of the drug, which can extend 20 years or more. Every batch of every approved biologic globally uses media — typically thousands of litres per batch — and biologics manufacturers run hundreds of batches per year.",
    },
    {
      id: "bioreactor",
      title: "Stage 2 — Single-use bioreactor systems",
      subtitle: "The disposable manufacturing vessel",
      content: "Modern biologics manufacturing has largely shifted from stainless steel bioreactors to single-use bioreactor systems — pre-sterilised disposable bags inside a structural support frame. Thermo Fisher sells the HyClone single-use bioreactor systems (1L to 2,000L scale) plus the consumable bags, tubing, filters, and sensors that feed into them.",
      detail: "Why single-use won: stainless steel bioreactors require expensive cleaning validation, multi-day downtime between batches, and dedicated facilities per product. A single-use bag is sterilised once at the factory, used once, then discarded. This collapses facility build time from years to months, allows multi-product flexibility within a single facility, and is the structural enabler of the rapid biologics manufacturing capacity buildout underway globally. Once a customer designs-in a specific bioreactor system to a commercial drug process, the consumable bag and accessories revenue is captured for the life of the product — much like the printer-cartridge model but operating over decades and at much higher absolute dollar volumes.",
    },
    {
      id: "purification",
      title: "Stage 3 — Downstream purification",
      subtitle: "Chromatography resins, filtration, and separation",
      content: "After the cells produce the drug protein in the bioreactor, it must be separated and purified to pharmaceutical-grade purity. This requires a sequence of unit operations: cell harvesting and clarification (filtration), capture chromatography (typically Protein A affinity resin to bind the antibody and discard everything else), polishing chromatography (ion exchange to remove final impurities), and viral inactivation and removal (filtration through nanofilters).",
      detail: "Thermo Fisher participates across this entire downstream sequence. The 2025 acquisition of Solventum's Filtration and Separation business expanded the company's position in tangential flow filtration and other separation technologies, strengthening the downstream offer. Like media and bioreactor systems, downstream purification components are typically designed-in during process development and locked into the FDA filing — making this another consumable annuity tied to commercial drug volumes.",
    },
    {
      id: "moat",
      title: "Stage 4 — Why the moat is structural",
      subtitle: "FDA process lock-in plus oligopoly supply",
      content: "Three structural features make bioproduction one of the highest-quality moats in industrials. First, FDA process lock-in: once a biologic drug is approved using a specific media, bioreactor system, and purification chain, those inputs cannot be changed without a regulatory amendment that risks supply disruption. The supplier captured at approval owns the revenue for the commercial life of the drug.",
      detail: "Second, oligopoly supply: only three companies globally have the scale, quality systems, and regulatory expertise to supply commercial biologics manufacturing at scale — Thermo Fisher (Gibco/HyClone), Cytiva (the Danaher subsidiary, formerly GE Healthcare Life Sciences), and Sartorius. Repligen plays in specific specialist niches (Protein A resins, certain filtration products). New entrants face years of qualification work plus a customer base unwilling to take regulatory risk on unproven suppliers. Third, the customer base is itself growing structurally: every approved new biologic adds incremental bioproduction demand, every capacity expansion at Lilly, Novo, Roche, Pfizer, Amgen, and others creates new media and bioreactor purchases, and the GLP-1 scale-up specifically is one of the largest single-product manufacturing capacity buildouts in pharmaceutical history.",
    },
    {
      id: "commercial",
      title: "Stage 5 — Commercial position and current tailwinds",
      subtitle: "GLP-1, biologics pipeline, US reshoring",
      content: "Bioproduction is roughly 10 percent of Thermo Fisher revenue (estimated $4-5 billion annually within the Life Sciences Solutions segment), but it carries an outsized share of strategic importance. The current cyclical position: the 2022-2024 inventory destock at biotech customers (driven by post-COVID demand normalisation) compressed bioproduction growth from low-double-digits to flat-to-down. By 2025 destocking was largely complete; 2026 should see growth reaccelerate to mid-to-high single digits with line of sight to low double digits as GLP-1 manufacturing volumes ramp.",
      detail: "Three specific tailwinds drive the medium-term thesis. GLP-1 manufacturing scale-up: Eli Lilly and Novo Nordisk are committing over $60 billion combined to new manufacturing capacity for semaglutide, tirzepatide, and follow-on molecules — each gram of GLP-1 peptide requires cell culture media and downstream purification consumables. Biologics pipeline depth: roughly 60 percent of the global pharmaceutical development pipeline is now biologics (up from less than 20 percent twenty years ago), with antibody-drug conjugates and cell and gene therapy modalities particularly capital-intensive on the manufacturing side. US pharma reshoring: the BIOSECURE Act, tariff overhangs, and supply-security concerns are accelerating onshore biologics manufacturing capacity, and Thermo Fisher's $2 billion US capacity investment plus the Sanofi New Jersey fill-finish acquisition position the company to capture disproportionate share.",
    },
  ],
};

// ─── PRIMER 2: ORBITRAP MASS SPECTROMETRY ───
export const orbitrap = {
  title: "Orbitrap Mass Spectrometry",
  subtitle: "The proprietary mass analyser that dominates high-resolution life sciences",
  color: "deepBlue",
  heroStats: [
    { value: "$1B+", label: "Estimated annual Orbitrap revenue" },
    { value: "240,000+", label: "Resolving power at the high end (Astral generation)" },
    { value: "1ppm", label: "Mass accuracy — best in commercial mass spec" },
    { value: "2005", label: "Year of first commercial Orbitrap launch" },
    { value: "Monopoly", label: "TMO is the sole supplier of Orbitrap technology" },
    { value: "Patent + know-how", label: "Combined IP moat blocks substitution" },
  ],
  intro: "The Orbitrap mass analyser is the crown jewel of Thermo Fisher's Analytical Instruments segment and arguably the most impressive piece of pure scientific engineering anywhere in the portfolio. Invented by the Russian physicist Alexander Makarov in the late 1990s and commercialised by Thermo Scientific starting in 2005, the Orbitrap is a fundamentally novel mass analyser design that achieves the highest mass accuracy and resolving power of any commercial mass spectrometer. There is no equivalent product anywhere — Bruker, Waters, Agilent, and SCIEX all sell mass spectrometers, but the Orbitrap technology specifically is unique to Thermo Fisher.",
  coreProblem: "Mass spectrometry measures the mass-to-charge ratio of ionised molecules, and that mass measurement allows scientists to identify and quantify what is in a sample. The technique is fundamental to proteomics (identifying proteins in cells and tissues), metabolomics (measuring metabolites), pharmaceutical quality control (verifying drug structure and purity), drug discovery (screening compound libraries), clinical diagnostics (newborn screening, therapeutic drug monitoring), and environmental analysis. The harder problem is high-resolution mass spectrometry — distinguishing molecules with very similar but not identical masses, which requires resolving power and mass accuracy beyond what conventional mass analysers can achieve. The Orbitrap solves that problem better than any alternative technology.",
  stages: [
    {
      id: "physics",
      title: "Stage 1 — How the Orbitrap actually works",
      subtitle: "Ion oscillation in an electrostatic field",
      content: "The Orbitrap traps ions in an electrostatic field between a central spindle-shaped electrode and an outer barrel-shaped electrode. Ions injected tangentially into this field orbit around the central electrode while simultaneously oscillating axially along its length. The axial oscillation frequency depends only on the mass-to-charge ratio of the ion, not on initial velocity or position.",
      detail: "By measuring the axial oscillation frequency — using image current detection on segments of the outer electrode — the instrument can determine the mass-to-charge ratio with extraordinary precision. Because the measurement is frequency-based rather than time-of-flight or magnetic-field-based, it achieves resolving power exceeding 240,000 at the high end and mass accuracy of approximately 1 part per million. No other commercial mass analyser matches this combination of resolution, accuracy, and dynamic range.",
    },
    {
      id: "instrument",
      title: "Stage 2 — The complete Orbitrap instrument family",
      subtitle: "Hybrid architectures and the Astral breakthrough",
      content: "In practice, Orbitrap mass analysers are integrated into hybrid instruments that combine multiple analyser stages. The classic configuration is a quadrupole mass filter coupled to an Orbitrap, which allows selective ion isolation followed by high-resolution mass measurement. More complex instruments add an ion trap or a collision cell for fragmentation experiments (tandem mass spectrometry), enabling structural characterisation alongside mass measurement.",
      detail: "The 2023 launch of the Astral mass analyser was a meaningful generational advance — pairing the Orbitrap with a new asymmetric track lossless analyser that adds parallel acquisition capability, dramatically increasing the speed of large-scale proteomics experiments. Current flagship instruments under the Thermo Scientific brand include the Orbitrap Ascend BioPharma, the Orbitrap Exploris series, the Orbitrap Astral, and the Q Exactive series, with prices ranging from approximately $400,000 for entry-level systems to over $1.5 million for top-of-line research instruments.",
    },
    {
      id: "applications",
      title: "Stage 3 — Where Orbitrap dominates commercially",
      subtitle: "Proteomics, pharma QC, clinical, biotech R&D",
      content: "The Orbitrap has captured dominant share in several specific high-value applications. In proteomics — large-scale identification and quantification of proteins in biological samples — the Orbitrap is the standard instrument for academic and pharmaceutical research worldwide. In pharma quality control, Orbitrap instruments are increasingly used for impurity characterisation, structural elucidation, and biologics characterisation where traditional triple-quadrupole instruments lack the resolution needed for modern complex therapeutics.",
      detail: "In clinical mass spectrometry, the Orbitrap is the technology of choice for newborn screening, therapeutic drug monitoring of complex drugs, and biomarker discovery. In drug discovery, the high resolution enables small-molecule identification in compound screening libraries with minimal ambiguity. The 2018 introduction of high-throughput methodologies (Acquire X, AcquireBP) extended Orbitrap usage into routine biopharma quality control where speed had previously been a barrier. Each new application reinforces the installed base, which in turn drives recurring revenue from service contracts, consumables, software upgrades, and replacement instruments.",
    },
    {
      id: "moat",
      title: "Stage 4 — Why no one has cloned the Orbitrap",
      subtitle: "Patents expiring, but the know-how moat persists",
      content: "Why hasn't a competitor replicated the Orbitrap? The original Makarov patents from the late 1990s have been expiring through the 2020s, so legal IP protection is no longer the primary barrier. The real moat is two decades of accumulated manufacturing know-how and continuous engineering improvement. Building an Orbitrap that achieves the specified resolution and mass accuracy in commercial production volumes is extraordinarily difficult — the electrode geometry must be machined to micron-level tolerances, the vacuum systems must achieve ultra-high purity, the electronics must measure femto-amp image currents reliably across millions of acquisitions.",
      detail: "Bruker, Waters, Agilent, and SCIEX have all attempted to develop competing high-resolution architectures (Bruker's timsTOF, Waters' Synapt, SCIEX's ZenoTOF), and each has its niche, but none has captured the combined resolution and accuracy of the Orbitrap in the same commercial form factor. Beyond hardware, Thermo Fisher has built a software ecosystem around Orbitrap (Xcalibur, Proteome Discoverer, Compound Discoverer) and a community of trained users — 20 years of customer accumulation, methods development, peer-reviewed publications, and academic collaborations create network effects that compound the technology lead. The Astral breakthrough in 2023 demonstrated the company's ongoing R&D commitment — Orbitrap is not a legacy product, it is an actively advancing platform.",
    },
  ],
};

// ─── PRIMER 3: CRYO-ELECTRON MICROSCOPY ───
export const cryoem = {
  title: "Cryo-Electron Microscopy",
  subtitle: "Nobel Prize technology, now the backbone of structural biology",
  color: "purple",
  heroStats: [
    { value: "$1B+", label: "Estimated annual cryo-EM revenue across all instrument tiers" },
    { value: "2017", label: "Year cryo-EM won the Nobel Prize in Chemistry" },
    { value: "$5-10M", label: "Price per top-end Krios cryo-EM instrument" },
    { value: "~1.2Å", label: "Best-in-class resolution on modern Krios systems" },
    { value: "Near-monopoly", label: "TMO holds dominant share in high-end cryo-EM" },
    { value: "Pharma adopting", label: "Drug discovery applications drive next demand wave" },
  ],
  intro: "Cryo-electron microscopy — cryo-EM — is the imaging technique that won the 2017 Nobel Prize in Chemistry and has revolutionised structural biology over the last decade. Thermo Fisher became the global leader after acquiring the Dutch electron microscopy company FEI in 2016 for $4.2 billion, integrating the FEI portfolio into the Thermo Scientific brand. The company now holds near-monopolistic position in the high-end cryo-EM market, with the flagship Krios instrument selling for $5-10 million each and a global installed base spanning every major academic structural biology centre, every leading pharmaceutical company R&D site, and a growing list of contract research organisations.",
  coreProblem: "To design drugs that bind to proteins, scientists need to know the three-dimensional structure of those proteins. Historically, the dominant technique for solving protein structures was X-ray crystallography — purify the protein, grow crystals, shine X-rays through the crystals, and reconstruct the structure from diffraction patterns. The problem is that many of the most pharmacologically interesting proteins (membrane proteins like G-protein coupled receptors, large protein complexes, conformationally flexible proteins) cannot be crystallised. X-ray crystallography simply does not work for them. Cryo-EM solves this problem: it images proteins directly in solution, frozen instantaneously to preserve their natural state, with no crystallisation required.",
  stages: [
    {
      id: "vitrification",
      title: "Stage 1 — Vitrification: freezing protein in solution",
      subtitle: "Capturing structure without crystallisation",
      content: "The first step in cryo-EM is sample preparation through vitrification. A purified protein solution is pipetted onto a specialised grid (a thin support with regular holes covered by carbon film) and blotted to leave a thin film of liquid containing protein molecules in random orientations. The grid is then plunge-frozen into liquid ethane at approximately minus 180 degrees Celsius — fast enough that water vitrifies into amorphous glass rather than forming ice crystals, which would destroy the protein structure and the electron transparency of the sample.",
      detail: "Thermo Fisher sells dedicated vitrification instruments (the Vitrobot Mark IV) that automate this process with controlled temperature, humidity, and blotting time — critical because reproducible sample preparation is the single biggest practical obstacle to high-resolution cryo-EM. The frozen grids are then transferred to the cryo-electron microscope under continuous cryogenic conditions to preserve the sample state throughout imaging.",
    },
    {
      id: "imaging",
      title: "Stage 2 — Electron beam imaging at near-atomic resolution",
      subtitle: "The Krios cryo-EM instrument",
      content: "The flagship Thermo Scientific Krios cryo-electron microscope accelerates electrons to 300 kilovolts and focuses them through a column of electromagnetic lenses onto the frozen sample. The electrons either pass through the sample, scatter off it, or both — and the resulting transmitted electron pattern is captured on a direct electron detector below the sample. Each protein particle in the grid produces a faint two-dimensional projection image; modern cryo-EM workflows collect thousands to hundreds of thousands of such particle images per experiment.",
      detail: "The Krios is essentially a research instrument the size of a small room — it incorporates an autoloader for frozen grid handling, automated electron-optical alignment, a phase plate for contrast enhancement, the direct electron detector (typically Thermo Scientific Falcon or Gatan K3 cameras), and an energy filter for inelastic electron rejection. Above the Krios in capability sits the Krios G4, the workhorse of pharmaceutical cryo-EM. Below it sits the Glacios, a more accessible 200kV cryo-EM that is increasingly common in pharma R&D sites as a screening tool ahead of higher-resolution Krios sessions. Each Krios installation includes Thermo Fisher service contracts, ongoing software licensing, sample preparation consumables, and detector replacements — a substantial recurring revenue tail per installed instrument.",
    },
    {
      id: "reconstruction",
      title: "Stage 3 — Computational structure determination",
      subtitle: "From particle images to 3D atomic model",
      content: "The two-dimensional particle images collected by the cryo-electron microscope are computationally combined to reconstruct the three-dimensional structure. Each particle is identified, classified by orientation, and averaged with other particles in the same orientation to enhance signal. The averaged class images at multiple orientations are then back-projected into a three-dimensional density map. From this density map, an atomic model of the protein can be fitted and refined.",
      detail: "This computational pipeline is itself a major workload — modern cryo-EM datasets generate terabytes of raw images per session, requiring high-performance computing infrastructure and specialised software (RELION, cryoSPARC, ChimeraX, Phenix). Thermo Fisher has been integrating computational workflows into its instrument package and partnering with software providers to streamline the path from sample to structure. The resolution revolution since approximately 2013 — driven by the combination of direct electron detectors and improved reconstruction algorithms — has pushed routinely achievable cryo-EM resolution from approximately 4 angstroms to better than 2 angstroms, putting cryo-EM in direct competition with X-ray crystallography for structural detail while removing the crystallisation constraint.",
    },
    {
      id: "applications",
      title: "Stage 4 — Why cryo-EM matters for drug discovery",
      subtitle: "The pharmaceutical industry adoption curve",
      content: "Three categories of protein targets are particularly important for cryo-EM in drug discovery. G-protein coupled receptors (GPCRs) — the most drugged target family in pharmaceutical history, representing approximately 35 percent of approved drugs — are membrane proteins that resist crystallisation but yield readily to cryo-EM. Large protein complexes — ribosomes, spliceosomes, ion channels, kinase regulatory complexes — are essentially impossible to crystallise but routine for cryo-EM. Conformationally flexible proteins where multiple states matter for function — cryo-EM can resolve multiple conformations from a single dataset.",
      detail: "Every major pharmaceutical company now operates cryo-EM facilities or contracts to specialised cryo-EM service providers. The shift accelerated dramatically over 2018-2023 as the technique matured and resolution became routinely high enough for structure-based drug design. The structural biology research community uses cryo-EM heavily, and as the academic-trained next generation of structural biologists moves into pharmaceutical R&D, the technique adoption deepens. Thermo Fisher's near-monopoly in the high-end (Krios, Krios G4, Glacios) plus the integrated workflow products (Vitrobot, Aquilos cryo-FIB for sample thinning, Falcon detectors) makes the company the default choice for any major cryo-EM installation. Combined with the long replacement cycle (instruments are typically used 8-12 years), this is a durable franchise with quietly compounding installed base economics.",
    },
  ],
};

/* ═══════════════════════════════════════════
   SERVICES CAPABILITIES PRIMER
   Patheon (CDMO) + PPD/Clario (CRO/eClinical)
   ═══════════════════════════════════════════ */
export const services = {
  title: "Pharma Services and Clinical Research",
  subtitle: "The integrated drug development and manufacturing platform",
  intro: "Beyond the product franchises, Thermo Fisher operates two large service businesses that anchor the 'integrated platform' thesis. Together Patheon (Pharma Services) and PPD plus Clario (Clinical Research) generate roughly $15 billion in revenue and form the backbone of the company's pitch to pharmaceutical customers: outsource the entire drug development and commercial supply chain to a single vendor.",
  patheon: {
    name: "Patheon — Pharma Services",
    intro: "Patheon is Thermo Fisher's contract development and manufacturing organisation (CDMO), acquired in 2017 for $7.2 billion. The business produces both drug substance (the active pharmaceutical ingredient) and drug product (the formulated dose — tablets, capsules, injectables, vials) on a contract basis for pharmaceutical sponsors. Patheon operates approximately 50 facilities globally with capabilities across small molecule, biologics, sterile fill-finish, and packaging.",
    activities: [
      { name: "Drug substance manufacturing", desc: "Production of active pharmaceutical ingredients — both small molecule (chemical synthesis) and biologics (cell-based production using cell culture media from the Bioproduction business, which creates an internal cross-sell). Includes process development, scale-up, GMP manufacturing for clinical trial supply, and commercial supply at scale." },
      { name: "Sterile fill-finish", desc: "Filling pharmaceutical products into sterile vials, pre-filled syringes, cartridges, and increasingly auto-injector formats. This is the highest-value Patheon capability — fill-finish capacity is genuinely scarce globally, particularly for biologics and peptides like GLP-1 drugs. The 2025 acquisition of Sanofi's New Jersey aseptic site dramatically expanded capacity here." },
      { name: "Drug product formulation and packaging", desc: "Solid dose manufacturing (tablets, capsules), packaging (blister packs, bottles), and labelling and serialisation for commercial distribution. Lower-value-add than fill-finish but high-volume." },
      { name: "Clinical trial supply", desc: "Manufacturing investigational drug for clinical trials, including specialised packaging for blinded studies, distribution to trial sites, returns and reconciliation." },
    ],
    position: "Patheon is one of the largest CDMOs globally, competing with Lonza, Catalent (now owned by Novo Holdings), Samsung Biologics, and Wuxi Biologics. Position varies by capability — Patheon is particularly strong in sterile fill-finish (recently expanded with the Sanofi NJ site), in small molecule, and in clinical trial supply. In biologics drug substance manufacturing the company is the number three or four player behind Lonza and Samsung Biologics. The current strategic tailwinds — GLP-1 fill-finish demand, US pharma reshoring driven by BIOSECURE Act and tariff concerns, and structural CDMO outsourcing growth — directly benefit Patheon's positioning.",
  },
  ppd: {
    name: "PPD plus Clario — Clinical Research",
    intro: "PPD (Pharmaceutical Product Development) was acquired in 2021 for $20.9 billion and is one of the world's largest contract research organisations (CROs), running clinical trials end-to-end for pharmaceutical and biotech sponsors. The 2026 acquisition of Clario (closing in 2026, approximately $9 billion) added eClinical and digital endpoint measurement capabilities that complement the PPD trial operations footprint.",
    activities: [
      { name: "Clinical trial operations", desc: "PPD provides the full operational infrastructure to run clinical trials globally — protocol design support, site selection and management, patient recruitment, monitoring, data management, biostatistics, medical writing, regulatory submissions. PPD operates in over 100 countries with roughly 30,000 employees globally." },
      { name: "Laboratory services", desc: "Central laboratory services for clinical trials — processing patient samples, running biomarker assays, genomic testing, bioanalytical work. PPD operates one of the largest networks of central laboratories globally." },
      { name: "Digital endpoint measurement (Clario)", desc: "Clario specifically provides electronic clinical outcome assessment (eCOA), wearable device integration, cardiac and respiratory monitoring, medical imaging, and digital biomarker capture. This is the infrastructure for the secular shift from site-based to decentralised clinical trials." },
      { name: "Regulatory and post-approval services", desc: "Regulatory affairs consulting, pharmacovigilance (safety surveillance), real-world evidence generation, market access support. Increasingly important as clinical development becomes more regulatory-intensive." },
    ],
    position: "PPD plus Clario is one of the top three global CROs, competing primarily with IQVIA and ICON. The strategic logic of the Clario acquisition is the same as the integrated platform thesis at the corporate level — bundling trial operations (PPD) with digital endpoints (Clario) creates a more complete offer that competitors cannot easily match without their own digital endpoint capability. The bull case here connects to the broader AI in pharma narrative: as clinical trials become more data-intensive, more decentralised, and more digitally instrumented, the combined PPD plus Clario footprint becomes structurally more valuable.",
  },
  platform: "The connecting strategic logic across Bioproduction, Patheon, and PPD/Clario is the 'integrated drug development and manufacturing' pitch. A pharmaceutical company developing a new biologic could in theory contract every step separately — pick a CRO for clinical trials, a CDMO for drug substance, a different specialist for fill-finish, separate suppliers for cell culture media and bioreactors, additional vendors for clinical lab services and digital endpoints. Or it could sign one master service agreement with Thermo Fisher and get everything end-to-end. The bull case argues that pharma is increasingly preferring fewer deeper vendor relationships — and Thermo Fisher is the only player with the full stack.",
};

/* ═══════════════════════════════════════════
   VALUE CHAIN
   ═══════════════════════════════════════════ */
export const valueChainIntro = "Thermo Fisher participates across the entire pharmaceutical and life sciences value chain, but the strategic and economic value is heavily concentrated at certain stages. Understanding where Thermo Fisher captures the most economic rent is essential to understanding the investment thesis.";

export const valueChainStages = [
  {
    stage: "Discovery research",
    tmoRole: "support",
    description: "Earliest stage of drug development — target identification, hit discovery, lead optimisation. Performed in pharma and biotech R&D labs and academic settings.",
    tmoNote: "Thermo Fisher participates extensively via research consumables (Invitrogen reagents, cell biology products), analytical instruments (mass spec, electron microscopy for structural biology), and the Fisher Scientific distribution channel for general lab supplies. Important but commoditised — competitive against Merck KGaA Life Science, Bio-Techne, Agilent, and many smaller specialists. Margins are decent but not the franchise's strongest position.",
  },
  {
    stage: "Preclinical development",
    tmoRole: "support",
    description: "Toxicology studies, pharmacokinetics, formulation development before clinical trials begin.",
    tmoNote: "Thermo Fisher provides analytical services through PPD's preclinical lab business plus instruments and reagents through normal channels. A meaningful but not dominant position.",
  },
  {
    stage: "Clinical trials",
    tmoRole: "own",
    description: "Phase I, II, and III clinical trials testing safety and efficacy in human subjects. The largest investment category in pharmaceutical development, typically representing 60-70 percent of total R&D spending.",
    tmoNote: "PPD is one of the top three global CROs. Clario adds digital endpoints and eClinical capabilities. This is one of Thermo Fisher's strongest competitive positions — only IQVIA and ICON have comparable global trial operations scale. The integrated PPD plus Clario offer is structurally hard to replicate.",
  },
  {
    stage: "Manufacturing process development",
    tmoRole: "own",
    description: "Developing the scalable manufacturing process for the approved drug — the cell line, the media, the bioreactor parameters, the purification chain, the formulation, the fill-finish process.",
    tmoNote: "Bioproduction is critical here — the cell culture media and single-use bioreactor systems chosen during process development are typically locked into the FDA filing. Whoever wins the supplier slot at this stage owns the commercial revenue for the life of the drug. Thermo Fisher's Gibco media franchise dominates this stage.",
  },
  {
    stage: "Commercial drug substance manufacturing",
    tmoRole: "orchestrate",
    description: "Large-scale production of the active pharmaceutical ingredient for commercial sale.",
    tmoNote: "Two business lines play here. Bioproduction sells the inputs (media, bioreactor systems, purification consumables) to every major manufacturer including the CDMOs. Patheon provides drug substance manufacturing on a contract basis, competing with Lonza, Catalent, and Samsung Biologics. The 'arms dealer' position via Bioproduction is structurally cleaner than the CDMO position via Patheon, but both contribute revenue.",
  },
  {
    stage: "Sterile fill-finish and packaging",
    tmoRole: "own",
    description: "Filling sterile vials, syringes, and other final dosage forms, then packaging for commercial distribution.",
    tmoNote: "Patheon is one of the largest global fill-finish providers, recently expanded with the Sanofi New Jersey site. This is genuinely scarce global capacity, particularly for biologics and peptide fill-finish (GLP-1 drugs being the obvious current example). One of Patheon's strongest competitive positions.",
  },
  {
    stage: "Quality control and release testing",
    tmoRole: "own",
    description: "Analytical testing of every manufactured batch to verify identity, purity, potency, and safety before commercial release.",
    tmoNote: "Thermo Fisher dominates pharmaceutical quality control through the Analytical Instruments segment — Orbitrap mass spec for impurity characterisation, HPLC for routine assay, electron microscopy for biologics characterisation. Highly recurring service contract and consumable revenue tied to installed instrument base.",
  },
  {
    stage: "Distribution and commercial supply",
    tmoRole: "support",
    description: "Getting approved drug from manufacturing to patients.",
    tmoNote: "Limited Thermo Fisher participation — this is dominated by specialist pharmaceutical distributors (McKesson, AmerisourceBergen, Cardinal Health, Cencora) and the pharmaceutical companies themselves. Some clinical trial supply distribution through PPD, but commercial drug distribution is not a Thermo Fisher business.",
  },
  {
    stage: "Post-approval and clinical diagnostics",
    tmoRole: "support",
    description: "Companion diagnostics, real-world evidence, therapeutic drug monitoring, biomarker tracking once the drug is on market.",
    tmoNote: "Specialty Diagnostics participates here in specific niches (allergy, transplant, ImmunoCAP). Smaller business overall but high quality. Genetic Sciences also plays in companion diagnostics.",
  },
];

/* ═══════════════════════════════════════════
   COMPETITIVE POSITION
   ═══════════════════════════════════════════ */
export const competitorIntro = "Thermo Fisher is a conglomerate competing against different peer sets in different sub-businesses. There is no single peer that mirrors the corporate-level structure. The most useful framing is segment-by-segment.";

export const competitors = [
  {
    name: "Danaher (DHR)",
    hq: "USA",
    highlight: false,
    strengths: "The closest large-cap peer. Post-Veralto spin in 2023, Danaher is a focused life sciences and diagnostics company. Cytiva (formerly GE Healthcare Life Sciences) is the global number one in bioprocessing tools and is the direct competitor to Thermo Fisher Bioproduction. Beckman Coulter, Leica, Sciex, and Phenomenex cover Analytical Instruments territory. Danaher's diagnostics franchise (Beckman, Radiometer, Cepheid, Leica Biosystems) is significantly larger than Thermo Fisher's Specialty Diagnostics. Best-in-class capital allocation track record under the DBS operating system.",
    weaknesses: "No CDMO equivalent to Patheon. No CRO equivalent to PPD. No distribution channel equivalent to Fisher Scientific. Trades at premium multiple (typically 22-26x forward P/E) so less upside than Thermo Fisher's current discounted multiple — but quality is unambiguously high.",
  },
  {
    name: "Sartorius (SRT GR)",
    hq: "Germany",
    highlight: false,
    strengths: "The pure-play bioprocessing comp. Bioprocess Solutions segment (single-use bioreactors, filtration, cell culture media, purification chromatography) represents roughly 80 percent of revenue and is the direct head-to-head with Thermo Fisher Gibco and Cytiva. Highest beta to bioproduction reacceleration of any large-cap peer. The cleanest read on bioproduction industry dynamics — when Sartorius prints, Thermo Fisher Bioproduction is moving in the same direction.",
    weaknesses: "Smaller than Thermo Fisher (around €3-3.5 billion revenue versus $44 billion). Got hit hardest in the 2022-2024 bioproduction destock — down approximately 60 percent from peak. Premium valuation historically (25-30x EV/EBITDA) means recovery is partially priced in.",
  },
  {
    name: "Agilent Technologies (A)",
    hq: "USA",
    highlight: false,
    strengths: "The cleanest peer to Thermo Fisher Analytical Instruments segment. Global leader in liquid chromatography systems, strong position in mass spectrometry, cell analysis, pathology and diagnostics. Provides a real-time read on academic and government laboratory demand and on pharma R&D capex on analytical equipment.",
    weaknesses: "Zero bioproduction exposure. No CDMO or CRO businesses. Limited diagnostics presence. The most concentrated bet on analytical instruments in the peer set — which is also the most pressured part of the life sciences tools complex currently. Currently dealing with significant China and academic market headwinds.",
  },
  {
    name: "Waters Corporation (WAT)",
    hq: "USA",
    highlight: false,
    strengths: "The premium specialist in analytical instruments. Global leader in liquid chromatography systems and a major player in mass spectrometry. Highest recurring revenue mix in the peer set (around 50 percent from consumables and services), highly sticky pharma quality control franchise. The textbook QARP profile in the tools space — Fundsmith's largest position is Waters, which is the validation of the quality compounder framing.",
    weaknesses: "Smallest of the peers (around $3 billion revenue). No bioproduction, no diagnostics, no CDMO, no CRO, no distribution. Highly concentrated on pharma QC and academic and applied markets. Lower growth ceiling than Thermo Fisher or the bioprocessing names.",
  },
  {
    name: "Merck KGaA (MRK GR)",
    hq: "Germany",
    highlight: false,
    strengths: "The third pole in the bioprocessing triopoly via the Life Science segment (formerly MilliporeSigma in the US). Strong in bioprocessing media, lab chemicals (Sigma-Aldrich legacy), and lab water systems. Diversified parent company also has pharma and electronics businesses, which complicates the comparison but also means lower volatility on the tools side.",
    weaknesses: "Hard to isolate the tools business from the diversified corporate structure. Pharma and electronics segments create non-tools volatility. Less pure-play than the others for investors wanting bioprocessing or analytical instruments exposure specifically.",
  },
  {
    name: "Lonza (LONN SW)",
    hq: "Switzerland",
    highlight: false,
    strengths: "The leading global biologics CDMO and the closest direct competitor to Thermo Fisher Patheon. Strong position in biologics drug substance manufacturing, particularly for monoclonal antibodies. Has been the swing factor in the broader CDMO industry over the past decade.",
    weaknesses: "Not a peer at the corporate level — pure CDMO, no bioprocessing tools, no analytical instruments, no CRO. Useful primarily as a comp for the Patheon piece of Thermo Fisher specifically.",
  },
];

/* ═══════════════════════════════════════════
   MOAT ANALYSIS
   ═══════════════════════════════════════════ */
export const moatIntro = "Thermo Fisher's moat is heterogeneous across the portfolio. Some businesses (Bioproduction, high-end Analytical Instruments) have genuinely best-in-class structural moats. Other businesses (Fisher Scientific distribution, parts of Specialty Diagnostics) have more modest competitive advantages. The composite moat is the weighted average — strong enough to deliver mid-teens ROIC sustainably but diluted by the lower-quality pieces.";

export const moats = [
  {
    title: "FDA process lock-in (Bioproduction)",
    category: "Switching Costs",
    strength: 5,
    description: "Once a biologic drug is approved using specific Thermo Fisher cell culture media, single-use bioreactor systems, and downstream purification components, switching any input requires an FDA regulatory amendment that can take 12-24 months and risks supply disruption. The supplier captured at FDA filing time effectively owns the commercial revenue for the 15-20 year life of the drug. This is one of the highest-quality switching cost moats anywhere in industrials.",
  },
  {
    title: "Orbitrap technology monopoly",
    category: "Intangible Assets",
    strength: 5,
    description: "The Orbitrap mass analyser is uniquely Thermo Fisher's. Two decades of accumulated engineering know-how in manufacturing the precision electrode geometry, vacuum systems, and detection electronics required to achieve the specified resolution and mass accuracy at commercial volumes. Patents are largely expiring but the manufacturing and software ecosystem moat persists. No competitor has replicated the technology despite multi-decade efforts.",
  },
  {
    title: "Cryo-EM near-monopoly",
    category: "Intangible Assets",
    strength: 5,
    description: "Following the FEI acquisition in 2016, Thermo Fisher has near-monopolistic position in the high-end cryo-electron microscopy market. The Krios platform is the standard instrument for academic structural biology and pharmaceutical cryo-EM globally. Installed base economics are powerful — service contracts, consumable detectors, software upgrades extend revenue across 10-12 year instrument lifecycles.",
  },
  {
    title: "Scale economies in distribution",
    category: "Scale Economies",
    strength: 4,
    description: "The Fisher Scientific channel serves hundreds of thousands of customer accounts globally with one-stop convenience that smaller distributors cannot match. Around 14,000 sales personnel, integrated logistics, and the breadth of catalogue (over 2,500 supplier brands distributed through Fisher) create real network advantages. The moat is real but weaker than the proprietary technology moats above — distribution is more replicable than mass spec or cell culture media.",
  },
  {
    title: "Integrated platform breadth",
    category: "Network Effects",
    strength: 4,
    description: "No competitor offers the full stack across bioproduction, pharma services, clinical research, analytical instruments, research consumables, and diagnostics. For large pharma customers wanting to consolidate vendor relationships, Thermo Fisher is structurally the most complete vendor in the industry. This platform effect is hard to quantify but increasingly relevant as pharma simplifies its supply chain.",
  },
  {
    title: "Recurring revenue base",
    category: "Customer Economics",
    strength: 4,
    description: "Around 80 percent of revenue is described as recurring or consumable. Consumables on installed instrument bases (mass spec, electron microscopy service contracts, Orbitrap consumables, cryo-EM detectors), recurring cell culture media and bioreactor consumables locked into commercial drug manufacturing, multi-year CDMO and CRO contracts, and routine lab supplies all create stable revenue floors. The corporate-level recurring revenue mix is excellent quality but somewhat diluted by the lower-stickiness Fisher Scientific distribution business — adjusted closer to 65-70 percent truly sticky recurring.",
  },
  {
    title: "M&A and integration capability",
    category: "Operational",
    strength: 4,
    description: "Under Marc Casper since 2009, Thermo Fisher has executed a series of major acquisitions (Life Technologies 2014, FEI 2016, Patheon 2017, PPD 2021, Clario 2026) that have been mostly successful in delivering synergies and operating leverage. The PPI Business System provides a structured framework for post-acquisition integration analogous to Danaher's DBS. Capital allocation track record is generally strong, though recent Clario timing has drawn some scepticism.",
  },
  {
    title: "Customer fragmentation reduces concentration risk",
    category: "Customer Economics",
    strength: 4,
    description: "No single customer represents more than 10 percent of revenue (not disclosed by SEC threshold, which is itself the proof). Approximately 400,000 customers globally span every major pharma, every major biotech, every major academic centre, and a long tail of industrial and applied markets. This is a meaningful quality advantage versus more concentrated tools or services peers, and a structural buffer against any single customer relationship deteriorating.",
  },
];
