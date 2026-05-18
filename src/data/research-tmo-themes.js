// TMO — Thematic Case Data
// Five long-term themes, platform thesis, EPS bridge, structural risks

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
