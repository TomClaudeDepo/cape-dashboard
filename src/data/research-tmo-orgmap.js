// TMO Organisation Map — Segments → Sub-businesses → Product lines & brands
// Designed for educational use: every leaf has a "plain" explanation alongside the technical one.
// Source: TMO FY2025 10-K (filed 26 Feb 2026), FY2025 Annual Report to Shareholders, and segment filings.

export const orgMapIntro = "Thermo Fisher reports in four operating segments, each of which contains several sub-businesses, each of which sells a portfolio of specific instruments, consumables, or services. The chart below maps that structure end-to-end. Click any node to read a plain-English explanation of what the business actually does and what its products are used for. The four segment colours are used consistently throughout the dashboard.";

/* ═══════════════════════════════════════════
   GLOSSARY OF TECHNICAL TERMS
   Plain-English definitions used as hover tooltips throughout the org map.
   Keys are lower-case and used to match terms in the {{glossary:key|displayed text}} syntax.
   ═══════════════════════════════════════════ */
export const glossary = {
  reagents: "Chemicals or biological substances used to detect, measure, or trigger a reaction in an experiment. Think of them as the consumable 'ingredients' a lab needs to do almost any biological test.",
  consumables: "Single-use lab supplies (plates, tubes, pipette tips, chemicals) that get used up and reordered. The razor-blade half of the razor-and-blade economics that life sciences tools companies love.",
  assay: "A standardised laboratory test for measuring the amount or activity of something — for example, an assay that detects whether a particular virus is present in a blood sample.",
  pcr: "Polymerase Chain Reaction. A technique that copies a small piece of DNA millions of times so it can be detected. Invented in 1983, this is the basic technique behind most COVID tests, paternity tests, and forensic DNA analysis.",
  qpcr: "Quantitative PCR. A version of PCR that measures the amount of DNA in real time as it's being copied, not just whether it's present. Used wherever you need to know not 'is this gene there?' but 'how much of it is there?'",
  ngs: "Next-Generation Sequencing. The set of technologies that read the order of letters in DNA millions of times faster and cheaper than the original Sanger method. The reason genome costs collapsed from ~$3bn (2003) to ~$200 (today).",
  sanger: "Sanger sequencing. The original (1977) method for reading DNA, still used today for short, accurate reads — confirming a single edit, verifying a cloned gene. Slower than NGS but more accurate per individual read.",
  capillary: "Capillary electrophoresis. A technique that pulls DNA fragments through a thin tube using electricity, separating them by size. Used in Sanger sequencing and forensic DNA analysis.",
  microarray: "A microscope-slide-sized chip dotted with thousands of known DNA sequences. Used to scan a sample to see which of those known sequences are present — older technology than NGS but cheaper for routine screening.",
  bioreactor: "A vessel where living cells (usually genetically engineered) are grown at large scale to produce a drug. A 2,000-litre bioreactor full of CHO cells producing antibodies is the heart of every biologic drug factory.",
  singleUse: "Single-use bioreactor. Instead of a stainless-steel tank that needs cleaning between batches, a sterile plastic bag inside a support frame is used once and thrown away. Reduces cleaning validation, contamination risk, and changeover time.",
  cellCulture: "Growing animal or microbial cells in a controlled liquid environment outside the body. Cell culture is how every biologic drug is manufactured — the cells produce the drug, you purify it out.",
  cellCultureMedia: "The liquid food and growth factors that keep cultured cells alive and productive. Recipes are highly proprietary; switching media in a regulated drug process requires FDA approval.",
  upstream: "The 'cell-growing' half of biologic manufacturing — culturing cells in bioreactors so they secrete the drug.",
  downstream: "The 'purification' half of biologic manufacturing — separating the drug from cells, debris, and impurities through filtration and chromatography columns.",
  biologic: "A drug made by living cells rather than chemical synthesis. Antibodies, hormones, vaccines, gene therapies are all biologics. They are 20-100x larger molecules than traditional pills.",
  smallMolecule: "A traditional chemically-synthesised drug, like aspirin or statins. Small enough to be absorbed as a pill, easier and cheaper to manufacture than biologics.",
  cdmo: "Contract Development and Manufacturing Organisation. A company that makes drugs (or develops manufacturing processes) on behalf of pharma clients who don't want to build their own factories. Patheon is the CDMO inside Thermo Fisher.",
  cro: "Contract Research Organisation. A company that runs clinical trials on behalf of pharma clients — recruiting patients, running the trial, managing the data. PPD is the CRO inside Thermo Fisher.",
  fillFinish: "The last step of biologic drug manufacturing: taking the purified drug substance and filling it into the actual vials, syringes, or auto-injectors that get shipped. Highly specialised because contamination at this stage means recalls.",
  aseptic: "Sterile processing. Manufacturing under conditions that prevent microbial contamination — gowns, gloves, isolators, HEPA-filtered air. Required for any injectable drug.",
  glp1: "Glucagon-Like Peptide-1. The hormone class behind Ozempic, Wegovy, Mounjaro, Zepbound — the obesity and diabetes drugs that have driven explosive biopharma manufacturing demand since 2022.",
  mab: "Monoclonal antibody. An engineered protein designed to bind to a single target — most cancer immunotherapies (Keytruda, Opdivo, Humira-class drugs) are mAbs. The biggest commercial biologic drug class.",
  gmp: "Good Manufacturing Practice. The set of FDA-enforced standards for how regulated drugs must be made — covering documentation, equipment validation, contamination controls. GMP-grade products cost more but are the only kind a pharma client can actually use.",
  cellGeneTherapy: "Treatments that work by modifying a patient's cells or genes. CAR-T cancer therapies and Vertex's sickle cell therapy are commercial examples. Manufacturing is bespoke per patient, very high value-per-dose.",
  chromatography: "A separation technique where a mixture is pulled through a special material that holds different components for different lengths of time, separating them. Used for everything from drug purification to testing your urine for performance-enhancing substances.",
  hplc: "High-Performance Liquid Chromatography. A pressurised version of chromatography for separating dissolved compounds. The workhorse instrument in any pharma quality-control lab.",
  uhplc: "Ultra-High-Performance Liquid Chromatography. A higher-pressure, faster version of HPLC. Vanquish is Thermo Fisher's UHPLC line.",
  gc: "Gas Chromatography. Chromatography for compounds that can be turned into vapour — used for petrochemicals, fragrances, environmental pollutants.",
  massSpec: "Mass Spectrometry. An instrument that weighs molecules with extraordinary precision, identifying them by their exact mass. Combined with chromatography, it can detect billions of different compounds in tiny samples.",
  orbitrap: "Thermo Fisher's flagship high-resolution mass spectrometer architecture, invented in 2005. The Orbitrap detects subtle mass differences down to a few parts per million — the gold standard for proteomics and complex small-molecule analysis.",
  tripleQuad: "Triple quadrupole mass spectrometer. A different mass-spec architecture optimised for high-volume routine testing of known compounds (drug residues in food, pharma quality control) rather than discovery.",
  proteomics: "The large-scale study of all the proteins in a biological sample. Like genomics for DNA, but harder, because proteins can be modified in millions of ways and you can't amplify them like DNA.",
  metabolomics: "The study of all the small-molecule metabolites in a sample — sugars, lipids, amino acids. Mass spec is the workhorse instrument.",
  ftir: "Fourier Transform Infrared spectroscopy. An instrument that identifies chemicals by the way they absorb infrared light — used for everything from polymer analysis to airport-security drug detection.",
  raman: "Raman spectroscopy. Identifies chemicals by how they scatter laser light. Non-destructive and can see through plastic — used to verify pharmaceutical raw materials through their packaging.",
  xrf: "X-Ray Fluorescence. A handheld technique for identifying elements (metals, alloys) by exciting them with X-rays and measuring what they emit back. Niton is Thermo Fisher's brand.",
  em: "Electron Microscopy. Uses a beam of electrons (not light) to image samples at atomic resolution. Light microscopes max out at ~200nm; electron microscopes resolve below 0.1nm.",
  tem: "Transmission Electron Microscope. Shoots electrons through an ultra-thin slice of sample to image its internal structure. Used in cryo-EM, semiconductor failure analysis, materials science.",
  sem: "Scanning Electron Microscope. Scans an electron beam across a sample's surface to build a 3D-like image. Standard tool in semiconductor manufacturing, forensics, materials engineering.",
  cryoEm: "Cryo-Electron Microscopy. TEM imaging of biological samples frozen in glass-like ice, so their native structure is preserved. Revolutionised structural biology in the 2010s; the 2017 Nobel chemistry prize.",
  fib: "Focused Ion Beam. A microscope that uses a beam of ions (instead of electrons) to mill or modify samples at the nanoscale — used heavily in semiconductor manufacturing to fix or analyse chips.",
  dualBeam: "An instrument combining SEM (imaging with electrons) and FIB (cutting with ions) into one tool. Industry standard for semiconductor failure analysis at advanced nodes.",
  immunoassay: "Any test that uses antibodies to detect a specific molecule — like a pregnancy test (which detects hCG with antibodies) or an allergy test.",
  allergen: "A substance that triggers an allergic reaction (peanut protein, cat dander, ragweed pollen). ImmunoCAP measures patient blood IgE responses to hundreds of specific allergens.",
  hla: "Human Leukocyte Antigen. The genetic 'markers' on the surface of every cell that the immune system uses to distinguish 'self' from 'foreign'. Matching donor and recipient HLA is critical in organ transplants — One Lambda is the leader.",
  cultureMedia: "Nutrient broths and gels used to grow bacteria, fungi, or other microbes in a lab for identification or research. Oxoid is the leading brand.",
  pcrDiagnostic: "A PCR-based diagnostic test that detects DNA or RNA of a pathogen (or genetic mutation) in a patient sample. Most molecular diagnostics are PCR-based.",
  brahms: "B·R·A·H·M·S, a German immunodiagnostics brand owned by Thermo Fisher, best known for procalcitonin — a biomarker that tells doctors whether an infection is bacterial (needs antibiotics) or viral (does not).",
  ldt: "Laboratory-Developed Test. A diagnostic test developed and performed by a single laboratory rather than sold as an FDA-cleared kit. A regulatory grey area that the FDA has been trying to tighten.",
  pgs: "Pharma Services Group. Thermo Fisher's commercial CDMO division — the rebranded Patheon. Operates ~50 sites globally for drug substance, drug product, and packaging.",
  pcrPlatform: "A specific machine that runs PCR reactions — like ABI's QuantStudio or 7500 — combined with the consumables and software needed to run defined assays.",
  iva: "In Vitro Diagnostic. A test performed on a sample taken from the body (blood, urine, tissue), as opposed to imaging or measurements taken from the body directly.",
};

/* ═══════════════════════════════════════════
   ORG HIERARCHY
   Segments → Sub-businesses → Product/brand leaves
   FY2025 revenue from 10-K filed 26 Feb 2026.
   ═══════════════════════════════════════════ */

export const orgTree = [
  /* ─────────────────────────────────────────────
     1) LABORATORY PRODUCTS & BIOPHARMA SERVICES
     ─────────────────────────────────────────── */
  {
    id: "lpbs",
    name: "Laboratory Products & Biopharma Services",
    short: "LPBS",
    share: 52,
    revenue: "$23.98B",
    color: "#1D4ED8",
    plainEnglish: "The biggest segment by revenue — actually three very different businesses bolted together. (1) Fisher Scientific, the giant lab-supply distribution channel that sells pipettes, gloves, glassware and reagents to almost every working scientist in the developed world. (2) Patheon (rebranded Pharma Services Group), a contract drug manufacturer that makes pills and biologic drugs on behalf of pharma companies. (3) PPD (plus the 2026-acquired Clario), a contract research organisation that runs clinical trials for pharma companies.",
    description: "Largest reporting segment by revenue, organised around four sub-businesses: laboratory products (own-brand consumables and equipment), research and safety market channel (distribution), pharma services (drug manufacturing for pharma clients), and clinical research (clinical trial services). Strategic rationale for grouping these is that they all serve the same large pharma and biotech customer base across the drug development and commercialisation workflow.",
    children: [
      {
        id: "labprod",
        name: "Laboratory Products",
        plainEnglish: "Thermo Fisher's own-branded laboratory equipment and consumables — freezers, centrifuges, incubators, plastic test tubes, glassware, reagents, chemicals. The 'stuff every lab buys' part of the company.",
        description: "Self-manufactured laboratory consumables, equipment, and chemicals sold under Thermo Scientific, Nalgene, Nunc, and other own brands. Used across life science research, drug discovery and development.",
        children: [
          { id: "nalgene", name: "Nalgene", desc: "Industry-standard {{singleUse|plastic}} laboratory bottles, carboys, and containers — the iconic white-and-blue water bottles started as lab supplies before becoming a consumer brand.", plain: "The original lab plastic bottle brand. If you've owned a Nalgene water bottle, you've owned a piece of lab-supply company kit that escaped into the consumer world." },
          { id: "nunc", name: "Nunc", desc: "Sterile {{cellCulture|cell culture}} plasticware — multi-well plates, flasks, dishes. The default consumable substrate for growing cells in any biology lab.", plain: "The plastic dishes that cells are grown in. Every cell biology experiment uses some piece of Nunc plastic." },
          { id: "forma", name: "Forma & Heratherm", desc: "Ultra-low-temperature freezers, incubators, CO₂ chambers, ovens. Forma is the leader in -80°C biological sample storage; Heratherm is the heating-and-incubation brand.", plain: "The fridges, freezers and ovens that every life science lab needs to store samples and grow cells. -80°C freezers are how vaccines and biological samples are kept stable." },
          { id: "sorvall", name: "Sorvall & Heraeus", desc: "High-performance centrifuges for separating biological samples by spinning them at very high speeds. Sorvall is the historic brand, Heraeus is the European partner.", plain: "Spinning machines that separate liquids and solids in a sample — say, separating blood plasma from blood cells. Every biology and clinical lab has them." },
          { id: "barnstead", name: "Barnstead", desc: "Ultrapure water purification systems for laboratory use — distillation, deionisation, reverse osmosis. Critical for any analytical work where contamination matters.", plain: "Machines that turn tap water into ultra-pure water clean enough for sensitive experiments. Lab water has to be much cleaner than drinking water." },
          { id: "thermo-reagents", name: "Thermo Scientific reagents & chemicals", desc: "Bulk laboratory chemicals, buffers, solvents, and {{reagents|reagents}} sold under the Thermo Scientific master brand to general research customers.", plain: "The basic chemicals and solutions that every lab uses — buffer solutions, solvents, acids, bases. The bulk supplies that fill the shelves of any working laboratory." },
          { id: "pierce", name: "Pierce Protein Biology", desc: "{{reagents|Reagents}} and kits for protein purification, detection, and quantification — ELISA kits, antibody labels, protein {{assay|assays}}.", plain: "Specialised kits for working with proteins in biology research — for example, kits that let scientists detect how much of a specific protein is in their sample." },
        ],
      },
      {
        id: "rsmc",
        name: "Research & Safety Market Channel",
        plainEnglish: "The Fisher Scientific distribution business. Fisher's catalogue lists products from over 2,500 supplier brands, sold to academic, industrial, and pharma research customers globally. Think of it as the Amazon of the lab supply world — Fisher doesn't make most of what it sells, but it's the most efficient way for a scientist to buy it.",
        description: "Global distribution channel selling Thermo Fisher's self-manufactured products alongside ~2,500 third-party supplier brands on a private-label and resale basis. Largely the legacy Fisher Scientific business, with margins lower than the rest of the company but customer relationships exceptionally sticky.",
        children: [
          { id: "fishersci", name: "Fisher Scientific channel", desc: "Direct sales force (~14,000 globally), online ordering platform, and physical distribution network reaching academic, industrial, and pharma laboratories. The one-stop shop for everyday lab supplies.", plain: "The catalogue and ordering system that researchers use to buy lab supplies. If you walk into any biology or chemistry lab in America, the shelves will be stocked from Fisher orders." },
          { id: "fisher-healthcare", name: "Fisher Healthcare", desc: "Clinical equivalent of the Fisher Scientific channel — serves hospital laboratories, reference labs, and physician offices with diagnostic kits, {{consumables|consumables}}, and equipment.", plain: "Same idea as Fisher Scientific, but for hospitals and clinical labs instead of research labs. Lower-growth, more stable demand." },
          { id: "fisher-safety", name: "Fisher Safety", desc: "Workplace safety supplies — respirators, gloves, lab coats, eye protection, first-aid supplies. Industrial customer base alongside laboratory.", plain: "Safety gear and supplies for laboratories and industrial workplaces. Got a huge boost during COVID for obvious reasons." },
          { id: "unitylabs", name: "Unity Lab Services", desc: "Onsite laboratory management, instrument repair, calibration, and asset management services. Wraps services around the equipment Fisher sells.", plain: "The 'we will manage your whole lab for you' service — repair contracts, equipment management, calibration. Sticky recurring revenue." },
        ],
      },
      {
        id: "pharma",
        name: "Pharma Services (Patheon)",
        plainEnglish: "The contract drug manufacturing business — Thermo Fisher makes drugs on behalf of pharma companies who don't want to (or can't) build their own factories. Operates around 50 sites globally. The acquisition of Sanofi's New Jersey sterile fill-finish site in 2025 added critical capacity at the moment GLP-1 demand exploded.",
        description: "Global {{cdmo|CDMO}} platform under the Patheon master brand, organised around drug substance manufacturing ({{smallMolecule|small molecule}} APIs and {{biologic|biologic}} bulk), drug product manufacturing (tablets, capsules, sterile injectables), {{fillFinish|fill-finish}}, packaging, and clinical trial supply services. ~50 manufacturing and service sites globally.",
        children: [
          { id: "drug-substance-sm", name: "Small Molecule Drug Substance", desc: "Manufacturing the active pharmaceutical ingredient (API) of traditional chemically-synthesised drugs at commercial scale, including controlled substances, high-potency APIs, and complex chemistry.", plain: "Making the actual drug compound for traditional pills — the chemistry side of pharma manufacturing. Less glamorous than biologics but still huge." },
          { id: "drug-substance-bio", name: "Biologics Drug Substance", desc: "Manufacturing {{biologic|biologic}} drug substances ({{mab|antibodies}}, recombinant proteins, vaccines) at commercial scale using {{bioreactor|bioreactor}}-based {{cellCulture|cell culture}} and {{downstream|downstream}} purification.", plain: "Making the actual antibody or protein drug from live cells in giant tanks. The high-growth part of the business — GLP-1s, immuno-oncology antibodies, and the next generation of drugs all flow through here." },
          { id: "sterile-ff", name: "Sterile Fill-Finish", desc: "Filling sterile injectable drugs into vials, pre-filled syringes, and auto-injectors under {{aseptic|aseptic}} conditions. Highly specialised — contamination at this stage means recalls and FDA inspections.", plain: "The very last step before a biologic drug is shipped to patients — putting the liquid drug into the actual syringe or vial. Has to be done in cleanrooms because any bacteria getting in could be lethal. {{glp1|GLP-1}}s like Ozempic need huge fill-finish capacity." },
          { id: "drug-product", name: "Drug Product (Solid Dose)", desc: "Tablet and capsule manufacturing, including controlled release, soft gel, and complex oral dosage forms. Lower-growth but stable cash-flow business.", plain: "Pressing pills and filling capsules. The basic mass-production of drugs in pill form, which is still how most prescriptions are dispensed." },
          { id: "clinical-supply", name: "Clinical Trial Supply", desc: "Manufacturing, packaging, labelling, and distributing investigational drugs to clinical trial sites worldwide, with full chain-of-custody and regulatory documentation.", plain: "When a pharma company runs a clinical trial in 30 countries, someone has to make the trial drug, label it correctly in each language, and ship it to thousands of sites. That's this business." },
          { id: "viral-vector", name: "Viral Vector & Cell Therapy Services", desc: "Contract manufacturing for {{cellGeneTherapy|cell and gene therapy}} sponsors — viral vector production, plasmid DNA, autologous cell therapy manufacturing.", plain: "Making the very specialised viruses and modified cells used in gene therapies and CAR-T cancer treatments. Bespoke, expensive, and growing fast." },
          { id: "pharma-packaging", name: "Pharmaceutical Packaging", desc: "Primary and secondary pharmaceutical packaging, including blister packs, bottles, cartons, leaflets, and serialisation for {{gmp|GMP}} traceability.", plain: "The actual bottles, blister packs, and boxes that pills come in — plus printing the leaflets and putting it all together in a regulated way." },
        ],
      },
      {
        id: "clinical-research",
        name: "Clinical Research (PPD + Clario)",
        plainEnglish: "The clinical trial services business — designing, recruiting patients for, and running clinical trials on behalf of pharma companies. PPD was acquired in 2021 for $20.9bn and is the second-largest pure-play CRO globally. Clario was acquired in 2026 for $9bn and added eClinical and digital endpoint capabilities — wearables, ePRO, central cardiac and respiratory monitoring.",
        description: "End-to-end {{cro|CRO}} platform offering Phase I-IV clinical development services, central laboratory testing, regulatory affairs, biostatistics, medical writing, and (post-Clario) digital endpoint and patient-monitoring capabilities for decentralised trials. Second-largest global CRO behind IQVIA on revenue, comparable to Icon and Parexel.",
        children: [
          { id: "ppd-clinical", name: "PPD Clinical Development", desc: "Phase I through Phase IV trial management — site identification and activation, patient recruitment, monitoring, data management, biostatistics, medical writing, regulatory submissions.", plain: "The bread-and-butter clinical trial business — running drug trials for pharma. Phase I (early safety, small) through Phase IV (post-approval monitoring, very large)." },
          { id: "ppd-lab", name: "PPD Laboratory Services", desc: "Central laboratory services for clinical trials — sample collection logistics, biomarker analysis, bioanalytical assays, GMP testing.", plain: "The lab work that happens during clinical trials — analysing blood samples from trial patients to see whether the drug is working and isn't causing harm." },
          { id: "ppd-real-world", name: "PPD Real-World Evidence", desc: "Post-approval studies, registries, real-world data analytics, payer evidence generation — proving a drug's value once it's on the market.", plain: "Studies done after a drug is approved, to prove to insurers and regulators that it works in the real world (not just in the clean conditions of a trial)." },
          { id: "clario-ecoa", name: "Clario eCOA & ePRO", desc: "Electronic Clinical Outcome Assessment and electronic Patient-Reported Outcome platforms — patient-facing apps that collect symptom data, pain scores, quality-of-life metrics directly during trials.", plain: "Apps and tools that let trial patients report their symptoms from home, instead of having to come into the clinic. Decentralised trials run on this kind of technology." },
          { id: "clario-imaging", name: "Clario Medical Imaging", desc: "Centralised medical imaging core lab — collecting, reading, and interpreting MRI, CT, PET, and ultrasound scans across multi-site trials with consistent standards.", plain: "When a drug trial uses brain scans or tumour scans as the measure of whether the drug is working, all the scans from all the sites get sent to one specialist lab that reads them consistently. That's Clario." },
          { id: "clario-cardio", name: "Clario Cardiac Safety", desc: "Centralised ECG, cardiac monitoring, and arrhythmia detection for clinical trials — required for many new drugs to demonstrate they don't cause heart-rhythm side effects.", plain: "Heart-monitoring services for clinical trials. Many drug candidates fail because they cause heart-rhythm problems; Clario does the specialist monitoring that detects this." },
          { id: "clario-respiratory", name: "Clario Respiratory", desc: "Centralised spirometry and respiratory function testing for clinical trials in asthma, COPD, and other lung-disease drug development.", plain: "Specialist lung-function testing for trials of asthma drugs and other respiratory medicines." },
        ],
      },
    ],
  },

  /* ─────────────────────────────────────────────
     2) LIFE SCIENCES SOLUTIONS
     ─────────────────────────────────────────── */
  {
    id: "lss",
    name: "Life Sciences Solutions",
    short: "LSS",
    share: 22,
    revenue: "$10.37B",
    color: "#059669",
    plainEnglish: "The 'crown jewels' from a profit and growth perspective. Houses three franchises: Bioproduction (cell culture media and single-use bioreactors that go into making biologic drugs), Biosciences (research reagents and tools for protein/cell biology) and Genetic Sciences (PCR, sequencing and DNA-analysis instruments). Bioproduction is the most strategically important sub-business in the entire company — exposed directly to the GLP-1 manufacturing boom.",
    description: "Three sub-businesses producing {{reagents|reagents}}, {{consumables|consumables}}, and instruments for biological research, drug discovery and biologic drug manufacturing. Highest gross-margin segment in the company (50%+), with bioproduction the highest-growth franchise.",
    children: [
      {
        id: "bioproduction",
        name: "Bioproduction",
        plainEnglish: "The single most important sub-business in Thermo Fisher from a growth and quality standpoint. Sells the cell culture media (the liquid food cells eat) and single-use bioreactors (the disposable plastic bags cells are grown in) that go directly into commercial manufacturing of biologic drugs. Competes against Cytiva (owned by Danaher) and Sartorius in a global triopoly. Switching costs are extraordinary — once a drug is approved using a specific media, changing it requires an FDA filing.",
        description: "Sells {{cellCultureMedia|cell culture media}}, {{singleUse|single-use bioreactor}} systems, {{downstream|downstream}} purification consumables, and {{upstream|upstream}}/{{downstream|downstream}} process analytics to {{biologic|biologic}} drug manufacturers. Triopoly market: TMO / Cytiva (Danaher) / Sartorius. ~$4-5bn revenue inside LSS.",
        children: [
          { id: "gibco", name: "Gibco cell culture media", desc: "Industry-leading {{cellCultureMedia|cell culture media}} for {{biologic|biologic}} drug manufacturing and bioscience research. Proprietary formulations including high-performance CHO media used by most major {{mab|monoclonal antibody}} manufacturers globally.", plain: "The 'food' that the cells used to make biologic drugs eat in their bioreactors. Proprietary recipe, very profitable. Most of the world's antibody drugs are made by cells grown on Gibco media. Once a pharma company picks a Gibco media for a new drug, switching is nearly impossible without re-filing with the FDA." },
          { id: "hyclone", name: "HyClone bioproduction", desc: "Sister brand to Gibco focused on {{gmp|GMP}}-grade media for large-scale bioproduction, especially in vaccines and Asia-Pacific markets.", plain: "Same idea as Gibco but a separate brand line, more focused on the very large-scale industrial bioproduction customers." },
          { id: "single-use-tech", name: "Single-Use Bioreactor Systems", desc: "{{singleUse|Single-use bioreactor}} bags, mixers, and supporting hardware from 50ml to 2,000L. Branded as the HyPerforma family. Replaces traditional stainless-steel tanks for many applications.", plain: "Sterile plastic bags that go inside a metal frame and replace stainless-steel tanks for growing cells. Get used once and thrown out, which saves a ton of cleaning time between batches. Big secular growth as pharma shifts away from stainless steel." },
          { id: "downstream-purif", name: "Downstream Purification", desc: "{{chromatography|Chromatography}} resins, filtration systems, and tangential flow filtration consumables for purifying {{biologic|biologic}} drugs out of {{cellCulture|cell culture}} fluid.", plain: "The filtration and chromatography supplies that separate the actual drug from cell debris, after the cells have made it. Less of a star than the upstream (cell-growing) side but still a meaningful business." },
          { id: "process-analytics", name: "Process Analytics & PAT", desc: "Inline and at-line sensors for monitoring {{cellCulture|cell culture}} conditions ({{biologic|pH}}, dissolved oxygen, cell density, metabolites) in real-time during {{bioreactor|bioreactor}} runs.", plain: "Sensors that monitor what's happening inside bioreactors in real time — are the cells healthy, are they producing the drug at the right rate. Critical for making drug manufacturing more reliable and FDA-compliant." },
        ],
      },
      {
        id: "biosciences",
        name: "Biosciences",
        plainEnglish: "Research-grade reagents, antibodies, and cell biology consumables sold mostly under the Invitrogen brand. The 'shopping list' for any working biology researcher — enzymes, cell stains, antibodies for detecting specific proteins, kits for transferring genes into cells.",
        description: "Sells research-grade {{reagents|reagents}}, antibodies, {{cellCulture|cell culture}} {{consumables|consumables}}, protein {{assay|assays}}, and molecular biology kits primarily under the Invitrogen brand. Highest-margin part of LSS but more exposed to discretionary academic and biotech research spending.",
        children: [
          { id: "invitrogen", name: "Invitrogen molecular biology", desc: "Comprehensive portfolio of research-grade enzymes, transfection {{reagents|reagents}}, antibodies, fluorescent labels (Alexa Fluor), and protein analysis kits. The default brand for everyday molecular and cell biology research.", plain: "The most commonly used brand of reagents in biology research labs. If you've worked in a biology lab in the last 20 years, you've used Invitrogen products almost every day." },
          { id: "alexa-fluor", name: "Alexa Fluor dyes", desc: "Family of fluorescent dyes used to label antibodies, DNA, and other biomolecules for microscopy and flow cytometry. Spans the visible and near-infrared spectrum with high quantum yield.", plain: "Very bright, stable glow-in-the-dark dyes used to tag specific proteins or DNA so they can be seen under a microscope or measured in a flow cytometer. Hundreds of variants for different colours." },
          { id: "gibco-research", name: "Gibco research-grade media", desc: "Research-grade {{cellCulture|cell culture}} media (as distinct from GMP bioproduction media). DMEM, RPMI, Opti-MEM and other classical formulations.", plain: "Same Gibco brand as the bioproduction one, but the research-grade version sold to academic and biotech researchers who are growing cells in their labs for experiments, not making drugs." },
          { id: "antibodies", name: "Antibodies portfolio", desc: "Catalogue of >100,000 primary and secondary antibodies for research use, sold for Western blots, immunohistochemistry, flow cytometry, ELISA. Includes recombinant and monoclonal options.", plain: "Researchers use antibodies to detect specific proteins in their samples — TMO sells a massive catalogue of them, one for almost every known human protein." },
          { id: "biosci-instr", name: "Bench-top instruments", desc: "Compact bench instruments for {{assay|assays}} — Qubit fluorometer for nucleic acid quantification, EVOS imaging systems, Countess cell counters.", plain: "Small instruments that sit on the bench in a research lab. Quick measurements of how much DNA is in a sample, simple imaging, automated cell counting." },
          { id: "qubit", name: "Qubit fluorometer", desc: "Quick fluorescence-based quantification of DNA, RNA, and protein concentration in small samples. Replaced UV absorbance ({{microarray|NanoDrop}}) for sequencing-prep workflows.", plain: "A small, simple machine that measures exactly how much DNA is in a tube. Standard in every sequencing lab." },
        ],
      },
      {
        id: "genetic-sci",
        name: "Genetic Sciences",
        plainEnglish: "The DNA-analysis instruments and consumables business — PCR machines, qPCR, Sanger sequencing, microarrays, and the Ion Torrent next-gen sequencing platform. Sells mostly under the Applied Biosystems brand, the legacy 1980s-90s brand that ran the Human Genome Project.",
        description: "{{pcr|PCR}}, {{qpcr|qPCR}}, {{sanger|Sanger}} sequencing, {{microarray|microarrays}}, and {{ngs|NGS}} platforms under the Applied Biosystems brand. Steady mid-single-digit grower; lost the discovery-NGS battle to Illumina but holds strong positions in targeted and clinical sequencing applications.",
        children: [
          { id: "abi-quantstudio", name: "Applied Biosystems QuantStudio", desc: "Real-time {{qpcr|qPCR}} platform family from research benchtop to high-throughput clinical. Used for gene expression, genotyping, and {{pcrDiagnostic|infectious disease testing}}.", plain: "PCR machines that not only copy DNA but measure how much of a specific gene is present in real time. The 7500 series and QuantStudio are workhorse instruments in basically every molecular biology lab." },
          { id: "taqman", name: "TaqMan assays", desc: "Pre-validated qPCR {{assay|assays}} for specific genes, single-nucleotide polymorphisms, and pathogens. Hundreds of thousands of catalogue assays plus custom design.", plain: "Pre-made test kits for detecting specific genes or pathogens with PCR. If a lab wants to test for a particular flu strain, there's a ready-made TaqMan kit for it." },
          { id: "ion-torrent", name: "Ion Torrent NGS", desc: "Semiconductor-based {{ngs|next-generation sequencing}} platform. Faster turnaround than Illumina, lower throughput; entrenched in targeted clinical applications, oncology panels, and infectious disease.", plain: "DNA sequencing machines based on semiconductor technology rather than optics. Lost the high-end battle against Illumina but still strong in specific clinical applications, especially small focused panels for cancer." },
          { id: "seqstudio", name: "SeqStudio (Sanger CE)", desc: "{{capillary|Capillary electrophoresis}} platform for {{sanger|Sanger}} sequencing and fragment analysis. Standard tool for verifying genetic edits, forensic DNA analysis, paternity testing.", plain: "Smaller, modern version of the old Sanger sequencing machines. Slow compared to modern sequencers but ultra-accurate for short pieces of DNA — used in clinical and forensic labs." },
          { id: "axiom", name: "Axiom microarrays", desc: "{{microarray|Microarray}} platform for genotyping — large-scale studies looking at known {{microarray|genetic variants}} across hundreds of thousands of samples. Used heavily in agrigenomics and biobank studies.", plain: "Genotyping chips that can check a sample for tens of thousands of known DNA variants at once. Used heavily in crop and livestock breeding, plus very large human studies like the UK Biobank." },
          { id: "absolute-q", name: "Absolute Q digital PCR", desc: "Digital {{pcr|PCR}} platform that partitions a single sample into thousands of micro-reactions to count individual DNA molecules absolutely (not relative to a standard).", plain: "A more advanced PCR technique that actually counts individual DNA molecules in a sample, rather than measuring them relative to a calibration curve. Used where extreme precision is needed." },
        ],
      },
    ],
  },

  /* ─────────────────────────────────────────────
     3) ANALYTICAL INSTRUMENTS
     ─────────────────────────────────────────── */
  {
    id: "ai",
    name: "Analytical Instruments",
    short: "AI",
    share: 16,
    revenue: "$7.55B",
    color: "#EA580C",
    plainEnglish: "The 'big science instruments' segment — the most R&D-intensive part of the company. Three sub-businesses: Chromatography & Mass Spectrometry (the analytical workhorses of every pharma quality-control and proteomics lab), Chemical Analysis (industrial and field analyzers — XRF guns, FTIR, Raman), and Electron Microscopy (the FEI-acquired business, including the cryo-EM platform that has near-monopolistic position in structural biology).",
    description: "Three sub-businesses: chromatography and mass spectrometry, chemical analysis, and electron microscopy. Sells the highest-value instruments in the company — flagship mass spectrometers and cryo-electron microscopes routinely cost $1-5m each — with consumables, software, and service contracts attached.",
    children: [
      {
        id: "cms",
        name: "Chromatography & Mass Spectrometry",
        plainEnglish: "The CMS business sells the analytical instruments that measure 'what's in this sample' at extraordinary sensitivity. Mass spectrometry, especially the Orbitrap platform invented by Alexander Makarov in 2005, is Thermo's flagship technology — used in pharma quality control, drug discovery proteomics, and environmental contaminant testing.",
        description: "{{hplc|HPLC}}, {{uhplc|UHPLC}}, {{gc|GC}}, ion chromatography, and {{massSpec|mass spectrometry}} platforms — including the flagship {{orbitrap|Orbitrap}} family. Used in pharma quality control, biomedical research, environmental testing, food safety, forensics.",
        children: [
          { id: "orbitrap", name: "Orbitrap mass spectrometers", desc: "Family of high-resolution {{orbitrap|Orbitrap}} {{massSpec|mass spectrometers}} including Exploris, Ascend, Astral. Industry standard for {{proteomics|proteomics}}, drug metabolism studies, biomarker discovery.", plain: "Thermo Fisher's flagship product line — extremely high-precision instruments that can weigh individual molecules in a sample with stunning accuracy. The Orbitrap Astral, launched in 2023, has been the breakthrough instrument in single-cell proteomics." },
          { id: "tsq", name: "TSQ Triple Quadrupole MS", desc: "{{tripleQuad|Triple quadrupole}} {{massSpec|mass spectrometers}} optimised for high-throughput targeted analysis of known compounds — pharma quality control, food safety, doping testing.", plain: "A different kind of mass spec — less powerful than Orbitrap but much faster and cheaper, optimised for routine testing where you know what compound you're looking for and just need to measure how much is there. Used in pharma QC and food safety labs everywhere." },
          { id: "iliad", name: "Iliad Triple Quad MS", desc: "Recently-launched (2024) successor to the Altis/Quantis {{tripleQuad|triple-quad}} line with improved sensitivity and throughput for routine quantitative {{massSpec|mass spec}}.", plain: "The newest, faster generation of routine mass spec for pharma quality control and applied testing. Launched 2024." },
          { id: "vanquish", name: "Vanquish UHPLC", desc: "{{uhplc|Ultra-high-performance liquid chromatography}} platform — runs separations at very high pressure for faster and higher-resolution analysis than traditional {{hplc|HPLC}}.", plain: "The 'pump and column' system that prepares samples before they go into a mass spec, by separating mixtures into individual components. UHPLC is the modern, faster, higher-resolution version of HPLC." },
          { id: "dionex-ic", name: "Dionex ion chromatography", desc: "Chromatography platform specialised for separating and quantifying inorganic ions — chloride, fluoride, sulfate, ammonium — in water, food, and pharmaceutical samples.", plain: "Specialised chromatography for measuring inorganic salts in water and food samples. Workhorse in water-quality testing and pharma." },
          { id: "trace-gc", name: "TRACE Gas Chromatography", desc: "{{gc|Gas chromatography}} platform for volatile and semi-volatile compound analysis — petrochemicals, fragrances, environmental pollutants, residual solvents in pharma.", plain: "Chromatography for stuff that can be turned into vapour. Used heavily in petrochemicals, fragrances, and pollution testing." },
        ],
      },
      {
        id: "chemanalysis",
        name: "Chemical Analysis",
        plainEnglish: "The 'industrial and field analyzers' business. Hand-held XRF guns for metal sorting, FTIR and Raman spectrometers for material identification, process spectroscopy for refineries and chemical plants, and Niton-branded hand-held analyzers for scrap metal recycling and homeland security applications.",
        description: "Industrial and field-portable analytical instruments — handheld {{xrf|XRF}} analyzers (Niton), {{ftir|FTIR}}, {{raman|Raman}} spectrometers, near-infrared (NIR) process spectroscopy, environmental and process monitoring instruments. Mostly applied-markets exposure.",
        children: [
          { id: "niton", name: "Niton handheld XRF", desc: "Handheld {{xrf|X-ray fluorescence}} analyzers for metal alloy identification, scrap metal sorting, mining exploration, and lead-paint screening.", plain: "Handheld gun-shaped devices that identify which metal alloy something is just by pointing them at it. Used heavily in scrap metal recycling, mining, and to check whether old paint contains lead." },
          { id: "ftir-instr", name: "FTIR & Raman spectroscopy", desc: "{{ftir|Fourier-transform infrared}} and {{raman|Raman}} spectrometers for chemical identification — Nicolet (FTIR) and DXR (Raman) brand lines. Used for polymers, pharma raw materials, materials science.", plain: "Two different techniques for chemically identifying unknown materials. Used to verify pharma raw materials, check polymer composition, identify suspicious substances in airports." },
          { id: "process-nir", name: "Process Spectroscopy (NIR)", desc: "Inline near-infrared spectrometers for continuous monitoring of chemical processes in refineries, polymer plants, and pharmaceutical manufacturing.", plain: "Spectroscopy instruments built into chemical and pharma production lines, monitoring composition in real time so the operators can spot problems early." },
          { id: "iris-icp", name: "iCAP ICP-MS / ICP-OES", desc: "Inductively-coupled plasma {{massSpec|mass spectrometers}} for trace metal analysis at parts-per-trillion sensitivity. Used in environmental, food, semiconductor, and pharmaceutical purity testing.", plain: "Specialised mass spectrometers that detect trace metals at incredibly low concentrations — used to test water for heavy metal contamination or to check semiconductor materials for impurities." },
          { id: "env-process", name: "Environmental & Air Quality", desc: "Continuous emissions monitoring systems (CEMS), ambient air-quality instruments, water-quality sensors. Sold to industrial polluters, environmental agencies, regulatory testing labs.", plain: "Instruments that continuously monitor what comes out of smokestacks and pipes, plus general air and water quality monitoring. Sold to power plants, refineries, and the EPA-equivalents worldwide." },
        ],
      },
      {
        id: "em",
        name: "Electron Microscopy",
        plainEnglish: "The FEI business, acquired in 2016 for $4.2bn. The crown jewel is the Krios cryo-electron microscope — the world's standard instrument for structural biology — and the dual-beam SEM/FIB instruments used in semiconductor manufacturing for advanced-node failure analysis. Near-monopolistic position in cryo-EM globally.",
        description: "{{tem|Transmission}} ({{cryoEm|cryo-EM}}, materials TEM), {{sem|scanning electron microscopes}}, and {{dualBeam|dual-beam SEM/FIB}} instruments. Three end markets: structural biology (academia and pharma), materials science, and semiconductor (process control, failure analysis). FEI was acquired in 2016 and remains an effective monopoly in high-end cryo-EM.",
        children: [
          { id: "krios", name: "Krios cryo-TEM", desc: "Flagship {{cryoEm|cryo-electron microscope}} for biological structural biology. Resolves protein structures at near-atomic resolution; standard instrument for pharma cryo-EM and academic structural biology cores.", plain: "The world's standard instrument for figuring out the atomic-level 3D shape of proteins — including drug targets. Sells for $5-10m a unit. Every major pharma company has at least one." },
          { id: "glacios", name: "Glacios cryo-TEM", desc: "Lower-cost {{cryoEm|cryo-TEM}} platform for screening and routine structural biology — sits below Krios in performance and price.", plain: "Smaller, cheaper sibling of the Krios — for labs that need cryo-EM but don't need the absolute top-end resolution." },
          { id: "talos", name: "Talos & Spectra TEM", desc: "Materials science {{tem|transmission electron microscopes}} for semiconductor failure analysis, advanced materials characterisation, nanotechnology research.", plain: "Materials-science version of the cryo-EM microscopes — used to image samples like semiconductor chips, new materials, or batteries down to atomic resolution." },
          { id: "helios-dualbeam", name: "Helios DualBeam", desc: "{{dualBeam|Dual-beam SEM/FIB}} platform combining {{sem|scanning electron microscopy}} with a {{fib|focused ion beam}}. Industry-standard tool for semiconductor failure analysis and 3D imaging at advanced process nodes.", plain: "Instrument that combines an electron microscope and an ion 'milling' beam in one tool — used to literally slice into a microchip layer by layer, image each layer, and figure out what went wrong. Critical for advanced semiconductor manufacturing." },
          { id: "apreo-sem", name: "Apreo SEM", desc: "High-performance {{sem|scanning electron microscope}} for materials and life sciences imaging — wider-purpose tool than the dual-beam instruments.", plain: "Standalone SEM for materials science and biology — a less-specialised tool than the dual-beam but used much more widely." },
          { id: "verios-sem", name: "Verios SEM", desc: "Ultra-high-resolution {{sem|scanning electron microscope}} for semiconductor metrology and inspection at advanced process nodes (3nm and below).", plain: "The most precise SEM in the line — used specifically for inspecting and measuring the very smallest features on the latest semiconductor chips." },
        ],
      },
    ],
  },

  /* ─────────────────────────────────────────────
     4) SPECIALTY DIAGNOSTICS
     ─────────────────────────────────────────── */
  {
    id: "sd",
    name: "Specialty Diagnostics",
    short: "SD",
    share: 10,
    revenue: "$4.68B",
    color: "#9333EA",
    plainEnglish: "The smallest segment but the highest operating-margin one (~28% versus ~22% corporate average). Five sub-businesses serving clinical labs and hospitals: Clinical Diagnostics consumables, ImmunoDiagnostics (allergy and autoimmune testing through ImmunoCAP), Microbiology (culture media and pathogen detection), Transplant Diagnostics (One Lambda is the world leader in HLA typing for organ transplants), and the Healthcare Market Channel (clinical equivalent of the Fisher Scientific distribution channel).",
    description: "Five sub-businesses: clinical diagnostics, immunodiagnostics, microbiology, transplant diagnostics, and healthcare market channel. Slowest growth but highest operating margins in the company. Recurring {{consumables|consumable}} revenue with niche but durable market positions across most franchises.",
    children: [
      {
        id: "clindx",
        name: "Clinical Diagnostics",
        plainEnglish: "Clinical-lab reagents and kits for routine hospital testing — drug-of-abuse screens, therapeutic drug monitoring, thyroid testing, sepsis screening, multiple myeloma diagnosis. Includes The Binding Site (acquired 2022), the leading franchise in serum free light chain testing for blood cancers.",
        description: "{{iva|In vitro diagnostic}} {{reagents|reagents}}, calibrators, controls, and protein-detection {{assay|assays}} for routine clinical laboratory testing — drug-of-abuse, therapeutic drug monitoring, thyroid function, tumour markers, multiple myeloma.",
        children: [
          { id: "binding-site", name: "The Binding Site", desc: "Acquired 2022 for $2.6bn. Leading franchise in free light chain {{assay|assays}} for multiple myeloma diagnosis and monitoring (Freelite, Hevylite). Reference standard in haematology labs globally.", plain: "Specialist diagnostics company acquired in 2022, focused on blood tests for multiple myeloma — a blood cancer. Their Freelite test is the global reference standard." },
          { id: "brahms-pct", name: "B·R·A·H·M·S Procalcitonin", desc: "{{brahms|B·R·A·H·M·S}} procalcitonin {{assay|assay}} — biomarker that distinguishes bacterial from viral infections, helping hospitals avoid unnecessary antibiotic use.", plain: "A blood test that tells doctors whether a patient's infection is bacterial (needs antibiotics) or viral (doesn't). Major tool in fighting antibiotic over-prescription." },
          { id: "drug-monitoring", name: "Therapeutic Drug Monitoring", desc: "Clinical {{iva|IVD}} {{assay|assays}} measuring blood concentrations of drugs (immunosuppressants, antiepileptics, antibiotics) where the right dose has to be precisely managed.", plain: "Blood tests for drugs where the dose has to be precisely right — too little doesn't work, too much is toxic. Used heavily for transplant patients on immunosuppressants." },
          { id: "drugs-of-abuse", name: "Drugs-of-Abuse Screening", desc: "Clinical {{assay|assays}} for screening biological samples for illegal drugs, opioids, and prescription drug abuse — used in clinical, workplace and forensic settings.", plain: "Drug-testing kits used in workplace drug screening, hospital toxicology, and emergency rooms." },
        ],
      },
      {
        id: "immunodx",
        name: "ImmunoDiagnostics (Phadia)",
        plainEnglish: "The Phadia/ImmunoCAP allergy and autoimmunity testing franchise. World leader in specific-IgE allergy testing — measuring exactly which proteins (peanut Ara h 2, cat Fel d 1, ragweed pollen) a patient is allergic to from a single blood draw. Highly defensible: built into allergy and immunology clinical workflows globally, large catalogue of validated allergens, recurring consumable revenue.",
        description: "{{immunoassay|Immunoassay}}-based blood testing systems for allergy ({{allergen|specific-IgE}}, ImmunoCAP), autoimmune diseases (EliA platform), and infectious disease serology. Phadia is the global leader in specific-IgE allergy testing.",
        children: [
          { id: "immunocap", name: "ImmunoCAP allergy testing", desc: "{{immunoassay|Immunoassay}} platform measuring patient-specific IgE antibodies against {{allergen|allergens}} — over 750 individual allergen tests catalogued from peanut components to specific pollens and animal proteins.", plain: "Blood test that finds out exactly what a patient is allergic to. Instead of skin-prick tests, a single blood draw tests against hundreds of specific allergens — peanut, cat dander, specific pollens. Phadia/ImmunoCAP is the global standard." },
          { id: "elia", name: "EliA autoimmunity", desc: "Companion platform for autoimmune disease serology — testing for autoantibodies against the patient's own proteins to diagnose lupus, rheumatoid arthritis, vasculitis, and similar conditions.", plain: "Same platform as ImmunoCAP but for autoimmune diseases — detecting whether a patient's immune system is attacking their own body, which is what causes diseases like lupus or rheumatoid arthritis." },
          { id: "phadia-instr", name: "Phadia laboratory systems", desc: "Phadia 250, 1000, 2500 — automated processing systems that run ImmunoCAP and EliA {{assay|assays}} at hospital-laboratory scale.", plain: "The actual machines that run the allergy and autoimmunity blood tests in hospital labs. Razor-and-blade economics — sell the instrument once, then run thousands of tests on it." },
        ],
      },
      {
        id: "micro",
        name: "Microbiology (Oxoid / Remel)",
        plainEnglish: "Culture media, collection systems, and pathogen detection consumables for clinical microbiology labs. Oxoid is the leading global brand of dehydrated and prepared {{cultureMedia|culture media}}. Stable business — clinical microbiology testing volumes don't change much year to year — but high-quality recurring consumable revenue.",
        description: "Dehydrated and prepared {{cultureMedia|culture media}}, sample collection and transport systems, automated identification instruments, susceptibility testing systems. Oxoid (UK-origin) is the master brand for media; Remel for ready-to-use plates and reagents.",
        children: [
          { id: "oxoid", name: "Oxoid culture media", desc: "Dehydrated and prepared {{cultureMedia|culture media}} for growing and identifying bacteria, fungi, and other microbes in clinical and food-testing laboratories.", plain: "The nutrient gels and broths that microbiology labs use to grow bacteria from patient samples to identify what's causing an infection." },
          { id: "remel", name: "Remel ready-to-use", desc: "Ready-poured agar plates, identification kits, antibiotic susceptibility discs — pre-made products that save labs the time of preparing media themselves.", plain: "Pre-poured plates of growth media so the lab doesn't have to prepare them. Convenience product within microbiology." },
          { id: "sensititre", name: "Sensititre antimicrobial susceptibility", desc: "Microbroth dilution {{assay|assays}} for antimicrobial susceptibility testing — determines which antibiotics will work against a patient's specific infection. Reference-standard method in clinical microbiology.", plain: "Once a lab knows which bacteria is causing an infection, the next step is finding which antibiotic will kill it. Sensititre is the test that does this — important amid rising antibiotic resistance." },
          { id: "oxoid-pathogen", name: "Pathogen Detection Kits", desc: "Rapid antigen and molecular kits for detecting specific pathogens — Listeria, Salmonella, MRSA — used in food testing and clinical microbiology.", plain: "Specific tests for nasty bacteria like Listeria or Salmonella, used by food companies and hospitals." },
        ],
      },
      {
        id: "transplant",
        name: "Transplant Diagnostics (One Lambda)",
        plainEnglish: "One Lambda is the world leader in HLA typing — the genetic matching that determines whether a donor organ will be accepted or rejected by the recipient. Acquired in 2012; effectively monopolistic in its niche. Recurring revenue, embedded in transplant clinical workflows globally, high-quality compounder.",
        description: "{{hla|Human leukocyte antigen}} typing reagents, antibody screening kits, and software for the organ-transplant market. Pre-transplant donor-recipient compatibility testing and post-transplant antibody monitoring.",
        children: [
          { id: "labtype", name: "LABType HLA typing", desc: "{{hla|HLA}} typing {{reagents|reagents}} based on Luminex bead technology — molecular characterisation of donor and recipient tissue types for transplant matching.", plain: "Tests that read the immune-system 'fingerprint' of an organ donor and an organ recipient to predict whether the recipient's body will reject the new organ. Critical step in every kidney, liver, and heart transplant." },
          { id: "labscreen", name: "LABScreen antibody detection", desc: "Single-antigen bead {{assay|assays}} for detecting and characterising HLA antibodies in transplant recipients before and after transplant — predicts and monitors immune rejection.", plain: "Tests for the antibodies that signal a transplant patient is starting to reject their new organ. Allows doctors to adjust treatment before damage is done." },
          { id: "fusion", name: "Fusion HLA software", desc: "Bioinformatics platform for HLA typing data analysis, donor-recipient matching, and post-transplant monitoring across transplant centres.", plain: "The software that transplant centres use to manage all their HLA typing data and match donors with recipients." },
        ],
      },
      {
        id: "hmc",
        name: "Healthcare Market Channel",
        plainEnglish: "Clinical distribution business — the hospital-and-clinical-lab equivalent of Fisher Scientific. Sells consumables, kits, equipment, and reagents (most made by third parties) to hospital labs, reference labs, physician offices and other clinical settings. Lower-growth distribution business; meaningful $1.79B revenue line.",
        description: "Clinical-market distribution channel selling {{iva|IVD}} {{consumables|consumables}}, kits, {{reagents|reagents}}, and equipment from Thermo Fisher and third-party suppliers to hospital laboratories, reference laboratories, physician offices, and clinical testing facilities.",
        children: [
          { id: "fisher-clin", name: "Fisher HealthCare distribution", desc: "Distribution platform reaching hospital and clinical laboratory customers globally — wide catalogue of diagnostic supplies, lab plastics, and equipment from Thermo Fisher and third-party brands.", plain: "Same idea as Fisher Scientific but for clinical and hospital labs. The plumbing that delivers all the test kits and supplies to hospital labs." },
          { id: "fisher-clin-pos", name: "Point-of-Care distribution", desc: "Distribution into point-of-care testing settings — physician offices, urgent care clinics, retail clinics — for rapid {{iva|diagnostic tests}}.", plain: "Distribution of rapid diagnostic tests (like rapid flu, strep, COVID tests) to doctor's offices and clinics where results are needed immediately." },
        ],
      },
    ],
  },
];

/* ═══════════════════════════════════════════
   GLOSSARY CATEGORIES — for the searchable list view
   ═══════════════════════════════════════════ */
export const glossaryCategories = [
  {
    title: "Drug manufacturing",
    keys: ["biologic", "smallMolecule", "cellCulture", "cellCultureMedia", "bioreactor", "singleUse", "upstream", "downstream", "cdmo", "cro", "fillFinish", "aseptic", "gmp", "mab", "glp1", "cellGeneTherapy", "pgs"],
  },
  {
    title: "Genetics & molecular biology",
    keys: ["pcr", "qpcr", "ngs", "sanger", "capillary", "microarray", "pcrDiagnostic", "pcrPlatform"],
  },
  {
    title: "Chromatography & mass spec",
    keys: ["chromatography", "hplc", "uhplc", "gc", "massSpec", "orbitrap", "tripleQuad", "proteomics", "metabolomics"],
  },
  {
    title: "Spectroscopy & microscopy",
    keys: ["ftir", "raman", "xrf", "em", "tem", "sem", "cryoEm", "fib", "dualBeam"],
  },
  {
    title: "Diagnostics & immunology",
    keys: ["reagents", "consumables", "assay", "immunoassay", "allergen", "hla", "cultureMedia", "brahms", "ldt", "iva"],
  },
];
