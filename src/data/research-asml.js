// ASML Holding NV — Research Data
// Founded on supplied EUV lithography primer plus verified FY25 financial frame

export const heroStats = [
  { value: "€32.7B", label: "FY 2025 revenue, up 16 percent year-on-year", color: "deepBlue" },
  { value: "52.8%", label: "FY 2025 gross margin", color: "green" },
  { value: "€38.8B", label: "Year-end 2025 backlog (record high)", color: "capRed" },
  { value: "48", label: "EUV systems shipped in 2025", color: "deepBlue" },
  { value: "13.5nm", label: "EUV wavelength, roughly 14x shorter than DUV", color: "orange" },
  { value: "~0.02%", label: "Electrical input to usable EUV photon conversion", color: "purple" },
];

/* ═══════════════════════════════════════════
   BUSINESS DESCRIPTION
   ═══════════════════════════════════════════ */
export const businessDescription = [
  "ASML Holding is the Dutch photolithography company that designs and builds the machines that print transistor patterns onto silicon wafers. Headquartered in Veldhoven, Netherlands, it is the sole supplier in the world of Extreme Ultraviolet (EUV) lithography systems, the equipment required to manufacture every leading-edge logic chip at 7 nanometre and below, and every advanced DRAM and high-bandwidth memory product. There is no second supplier.",
  "ASML's business model rests on two product families. Deep Ultraviolet (DUV) systems use 193 nanometre light and remain the workhorse of the industry, handling the dozens of non-critical layers in any modern chip. EUV systems use 13.5 nanometre light and address the few critical layers that define the most advanced nodes. EUV systems carry an average selling price of roughly $200 million for the Low-NA generation and around $380 million for High-NA. DUV immersion systems sell for $70 to $100 million.",
  "The company shipped 48 EUV systems in 2025 alongside 131 DUV immersion tools. FY 2025 revenue reached €32.7 billion at a 52.8 percent gross margin, with year-end backlog hitting a record €38.8 billion. Q4 2025 bookings of €13.2 billion were the highest in the company's history, with €7.4 billion of that being EUV. ASML guided FY 2026 revenue to €34 to €39 billion and reaffirmed a 2030 outlook of €44 to €60 billion in annual revenue, with High-NA expected to account for roughly a quarter of EUV revenue by 2028.",
  "The structural setup is unusual. ASML has an effective monopoly on the gating constraint of modern semiconductor manufacturing, which is itself the gating constraint of artificial intelligence compute capacity. Its three end customers (TSMC, Samsung, and Intel) cannot substitute the product, and no second supplier has emerged in over twenty years of effort. The investment question is therefore not whether the moat exists. It is how to price growth, cyclicality, geopolitical exposure, and the company's own willingness to share economics with the customer base.",
];

/* ═══════════════════════════════════════════
   EUV PRIMER — the supplied content, structured
   ═══════════════════════════════════════════ */
export const euvProblemIntro = "Extreme Ultraviolet lithography is one of the most physically extreme manufacturing processes ever industrialised. Understanding why ASML's monopoly is durable starts with understanding why every design choice in the machine is forced by a single physical constraint.";

export const euvCoreProblem = "To print transistor features at 7nm, 5nm, and 3nm nodes, a light source needs a wavelength short enough to resolve them. Deep Ultraviolet (DUV) at 193 nanometres hit its resolution limit around 2015, even with multi-patterning workarounds. EUV uses 13.5 nanometre light, roughly 14 times shorter. The catch: at 13.5 nanometres, basically every material absorbs the light, including air, glass, and conventional lens materials. That single constraint dictates almost every weird design choice in the machine.";

export const euvStages = [
  {
    id: "source",
    title: "Stage 1 — Making the light",
    subtitle: "Laser-produced plasma at 500,000 K",
    content: "There is no lamp or laser that natively emits at 13.5 nanometres with useful power, so ASML manufactures it via laser-produced plasma. The process is genuinely surreal.",
    steps: [
      { label: "Droplet generator", detail: "Dispenses molten tin droplets roughly 25 microns across at approximately 50,000 per second into a vacuum chamber." },
      { label: "Pre-pulse CO₂ laser", detail: "Hits each droplet first, flattening it into a pancake shape, which dramatically improves the EUV conversion efficiency." },
      { label: "Main-pulse CO₂ laser", detail: "Roughly 25 to 30 kilowatts, the most powerful industrial CO₂ laser ever built. Vaporises the pancake into a plasma at around 500,000 Kelvin. That plasma emits a burst of EUV photons." },
      { label: "Collector mirror", detail: "Sits behind the plasma and gathers the EUV photons, sending them down the beam path." },
    ],
    insight: "Conversion efficiency from electrical input to usable 13.5nm photons is roughly 0.02 percent. Almost all of the machine's energy budget is wasted heat, which is why thermal management is such a massive engineering subsystem.",
  },
  {
    id: "mirrors",
    title: "Stage 2 — Why everything must be a mirror",
    subtitle: "Bragg reflectors and the brutal photon math",
    content: "At 13.5 nanometres, photons are absorbed by glass, quartz, air, and most other materials. That single fact reshapes the entire optical system:",
    steps: [
      { label: "No lenses", detail: "Refractive optics do not work. The entire imaging system is built from mirrors." },
      { label: "No transmission through air", detail: "The full beam path operates in vacuum." },
      { label: "No conventional mirrors", detail: "A polished aluminium mirror reflects roughly zero percent of EUV. The trick is Bragg reflectors: stacks of 40 to 50 alternating molybdenum and silicon layer pairs, each pair roughly half the wavelength thick. Each layer reflects a tiny fraction. Constructive interference across the stack gets you to about 70 percent reflectivity per mirror." },
    ],
    insight: "The math is brutal. A typical EUV scanner has roughly 10 reflective surfaces between source and wafer. 0.70 to the power of 10 equals 2.8 percent. Roughly 97 percent of the EUV that leaves the collector never reaches the wafer. That is why the source has to be so absurdly powerful, and why every mirror is polished to sub-nanometre surface roughness. Any defect scatters precious photons.",
  },
  {
    id: "reticle",
    title: "Stage 3 — The reticle (this is the big one)",
    subtitle: "Why the photomask itself is a mirror",
    content: "In DUV, the photomask is a piece of quartz with chrome patterns on it. Light passes through it. In EUV, light cannot pass through anything useful, so the reticle itself is a mirror. The chip pattern is built as an absorber (typically tantalum-based) on top of a molybdenum-silicon multilayer. EUV hits the reticle and reflects back wherever the absorber is not blocking it. That reflected, patterned beam is what eventually exposes the wafer.",
    steps: [
      { label: "4x anamorphic demagnification", detail: "In High-NA systems, the reticle pattern is 4 times larger than what is printed on the wafer in one axis, and 8 times larger in the other. Reflective geometry does not allow symmetric reduction." },
      { label: "Pellicles are extraordinarily hard", detail: "The thin protective film that keeps particles off the reticle has to be transparent to EUV in both directions and survive flash heating above 600 degrees Celsius. Practically, this means polysilicon membranes around 30 nanometres thick." },
      { label: "Mask defects are catastrophic", detail: "A single absorber defect prints on every die that uses that reticle. Mask inspection and repair is its own multi-billion-dollar adjacent industry." },
    ],
    insight: "Reticle handling is one of the most underappreciated engineering challenges in the EUV ecosystem. Pellicles, inspection, and metrology around the mask are independently active R&D areas, and ASML's grip on the surrounding workflow extends beyond just the scanner itself.",
  },
  {
    id: "projection",
    title: "Stage 4 — Projection and scanning",
    subtitle: "Six more mirrors and the synchronous scan",
    content: "After reflecting off the reticle, the patterned EUV beam passes through the projection optics box, typically six more curved mirrors, each precision-figured to atomic tolerances. These mirrors do the demagnification and project the pattern onto a small slit on the wafer. The exposure field is only about 26 by 33 millimetres.",
    steps: [
      { label: "Synchronous scan", detail: "The wafer and reticle scan in opposite directions at carefully matched velocities, stitching out each die one slit-width at a time." },
      { label: "Throughput", detail: "A 300mm wafer carrying around 100 dies takes a Low-NA NXE:3800E scanner about 25 to 35 seconds to expose end-to-end. That translates to roughly 160 to 220 wafers per hour." },
      { label: "Stage precision", detail: "The wafer stage tracks the reticle stage to single-digit nanometre accuracy across an exposure that lasts seconds, on a wafer that is heating, expanding, and moving at high velocity. This is ASML's own core competence, distinct from the optics that come from Zeiss." },
    ],
    insight: "The synchronous wafer and reticle stages are arguably the most overlooked piece of ASML's IP. The optics get the attention, but the precision motion control is what physically prints the pattern, and it is built almost entirely in-house in Veldhoven.",
  },
];

/* ═══════════════════════════════════════════
   PRODUCT GENERATIONS
   ═══════════════════════════════════════════ */
export const productGenIntro = "ASML's EUV product line splits into two generations. The Low-NA (Numerical Aperture) family is in volume production today and enables 7nm down to 3nm logic. The High-NA family is what unlocks sub-2nm logic without resorting to multi-patterning. High-NA shipped its first customer tool in 2024, with Intel and TSMC as anchor users.";

export const productComparison = [
  { spec: "Numerical aperture", lowNa: "0.33", highNa: "0.55" },
  { spec: "Resolution", lowNa: "~13 nanometres", highNa: "~8 nanometres" },
  { spec: "Optical configuration", lowNa: "Symmetric", highNa: "Anamorphic (4x by 8x)" },
  { spec: "Approximate price per tool", lowNa: "~$200 million", highNa: "~$380 million" },
  { spec: "Annual production capacity", lowNa: "~50-60 tools per year", highNa: "~5-10 tools per year" },
  { spec: "Status", lowNa: "Volume production", highNa: "First customer shipments (Intel, TSMC)" },
];

export const highNaInsight = "The anamorphic design (different magnification in X versus Y) was forced by the geometry. At 0.55 numerical aperture, you cannot fit a symmetric reflective system in the available physical envelope without the incoming and outgoing beams interfering with each other. ASML's response was not to make the system bigger. It was to break the symmetry. That decision cascades through reticle handling, alignment, metrology, and software, and is one of the reasons High-NA is not just a bigger Low-NA but effectively a new platform.";

/* ═══════════════════════════════════════════
   MONOPOLY ANALYSIS
   ═══════════════════════════════════════════ */
export const monopolyIntro = "ASML's monopoly is not a single advantage. It is a stack of overlapping advantages that each, on their own, would constitute a strong moat. Together they have prevented any serious second supplier from emerging despite more than two decades of attempts, billions of dollars of government-backed effort, and direct customer interest in funding an alternative.";

export const monopolyPillars = [
  {
    title: "Every critical component is a single-supplier specialty",
    strength: 5,
    category: "Supplier Concentration",
    description: "The 25 to 30 kilowatt industrial CO₂ laser comes from Trumpf in Germany. The molybdenum-silicon multilayer optics come from Zeiss SMT, which ASML co-owns through a 24.9 percent stake taken in 2016. The precision stages come from ASML itself. There is no second supplier for any of the three critical subsystems. A would-be competitor would have to either replicate or replace each one. Trumpf alone took roughly two decades to industrialise the source laser, with ASML co-funding the development.",
  },
  {
    title: "Integration risk has prevented every serious alternative attempt",
    strength: 5,
    category: "System Integration",
    description: "Even with all three subsystems available, integrating them into a working scanner at the required precision is the harder problem. The synchronous wafer-and-reticle scan requires single-digit nanometre stage accuracy at high velocity, in vacuum, with active thermal compensation across a system that dissipates kilowatts of waste heat. No second supplier has emerged in over 20 years of effort, including Nikon and Canon (both well-funded, both committed) and various government-backed initiatives. The integration risk alone is so high that the market has effectively ceased to attract new entrants.",
  },
  {
    title: "Customer concentration runs both ways",
    strength: 4,
    category: "Two-Sided Lock-In",
    description: "ASML sells primarily to three customers: TSMC, Samsung, and Intel. That concentration would normally be a weakness. In this case it works in ASML's favour because those three customers also have only one supplier. TSMC's 2nm node requires High-NA. Samsung's HBM4 roadmap requires EUV layer counts that only ASML can supply. Intel's 18A and 14A nodes are built around the High-NA shipments it has already taken delivery on. Neither side can walk away. The natural equilibrium is co-investment, not arm's-length pricing.",
  },
  {
    title: "Service and installed base management is a captive annuity",
    strength: 4,
    category: "Recurring Revenue",
    description: "Each EUV system ships in roughly 40 freight containers, weighs around 180 tons, and takes months to install and qualify on-site. Once installed, ASML's Installed Base Management business handles upgrades, optics swaps, service contracts, and field options. This segment generated revenue growth of 27 percent year-on-year in Q3 2025 and produced over €2 billion in quarterly revenue. The installed base of more than 1,500 systems creates a recurring revenue stream that is structurally insulated from the cyclicality of new system orders.",
  },
  {
    title: "R&D spend at scale is its own barrier",
    strength: 4,
    category: "Innovation Moat",
    description: "ASML's annual R&D spend runs above €4 billion. The next-largest semiconductor capital equipment competitor (Applied Materials) spends a fraction of that on lithography-adjacent research because it does not compete in lithography. ASML reinvests this into High-NA development, hyper-NA (next-generation, post-2030), source power improvements, and pellicle technology. Catching up is not a one-shot capital expense. It is a perpetual operating commitment that even sovereign-scale investment programs have struggled to sustain.",
  },
  {
    title: "Geopolitical export controls are a double-edged sword",
    strength: 3,
    category: "Risk Factor",
    description: "Dutch and US export controls prohibit ASML from shipping EUV systems to China, and increasingly restrict advanced DUV immersion systems as well. This locks in the customer base for Western fabs (good for ASML's near-term pricing power) but also caps the addressable market and creates a structural incentive for China to fund a domestic alternative. SMEE in Shanghai is the public face of the Chinese effort, but progress on EUV remains years away from commercial relevance. The risk is not that China closes the gap on this product. It is that the buyer base for ASML's most advanced systems is permanently bifurcated.",
  },
];

/* ═══════════════════════════════════════════
   COMPONENT SUPPLIERS
   ═══════════════════════════════════════════ */
export const supplierIntro = "ASML is the prime contractor and integrator, but the actual EUV machine is a product of a small ecosystem of specialised suppliers, most of whom are themselves effective monopolies in their niche.";

export const suppliers = [
  { name: "Trumpf", country: "Germany", role: "Drive laser", detail: "The 25-30 kW CO₂ pre-pulse and main-pulse laser system that vaporises tin droplets. Took roughly two decades of joint development with ASML to industrialise. No alternative supplier exists at this power level." },
  { name: "Zeiss SMT", country: "Germany", role: "Optics", detail: "Designs and manufactures the molybdenum-silicon Bragg multilayer mirrors. Surfaces are polished to sub-nanometre roughness across mirrors that can be hundreds of millimetres across. ASML acquired a 24.9 percent stake in 2016 to lock in the relationship for High-NA and beyond." },
  { name: "Cymer", country: "USA (ASML subsidiary)", role: "Source plasma technology", detail: "Cymer was the pioneer of laser-produced plasma EUV sources. ASML acquired it in 2013 for $2.5 billion specifically to bring the source physics in-house. Now operates as a fully owned subsidiary." },
  { name: "VDL Group", country: "Netherlands", role: "Mechanical subassemblies", detail: "Builds chassis, vacuum chambers, and mechanical subsystems. Located near ASML's Veldhoven campus and effectively a captive supplier." },
  { name: "ASML in-house", country: "Netherlands", role: "Stages, control systems, integration", detail: "Wafer and reticle stages, software, alignment systems, metrology, and final integration. This is the work that converts a collection of subsystems into a functioning scanner, and is ASML's deepest IP." },
];

/* ═══════════════════════════════════════════
   RISKS
   ═══════════════════════════════════════════ */
export const riskIntro = "ASML's monopoly is durable, but the share price is not insensitive. The principal risks are not about losing customers to a competitor. They are about the magnitude and timing of the cycle, the willingness of governments to constrain the addressable market, and the rate at which advanced node capex converts into ASML revenue.";

export const risks = [
  {
    title: "Cyclicality of semiconductor capex",
    category: "Cyclicality",
    severity: "High",
    description: "ASML revenue tracks the capital expenditure cycles of TSMC, Samsung, and Intel. Those cycles can move 30 to 50 percent peak-to-trough. The 2025 bookings strength reflects AI infrastructure demand, but the company explicitly noted that 2026 growth is not guaranteed. A pause in customer capex, even a temporary one, compresses earnings significantly. The installed base service revenue cushions but does not eliminate the cycle.",
  },
  {
    title: "China revenue is structurally capped and shrinking",
    category: "Geopolitical",
    severity: "Medium-High",
    description: "China accounted for a substantial portion of ASML's DUV revenue in 2023 and 2024 as Chinese fabs front-loaded purchases ahead of expanding export controls. That tailwind is fading. EUV is prohibited entirely. Advanced immersion DUV is increasingly restricted. The medium-term path is for China revenue to compress as the existing backlog ships, with no obvious offset in geographic mix. This is a known headwind, not a surprise risk.",
  },
  {
    title: "Customer co-investment dynamics shift economic share",
    category: "Pricing Power",
    severity: "Medium",
    description: "TSMC, Samsung, and Intel are not passive customers. They co-invest in R&D, take prepayments against future shipments, and increasingly negotiate volume agreements. The natural risk is not that ASML loses pricing power suddenly. It is that the customer base extracts a larger share of the technology surplus over time, particularly as High-NA scales and the depreciation per wafer becomes a more meaningful line item in customer P&Ls.",
  },
  {
    title: "High-NA adoption pace is uncertain",
    category: "Product Cycle",
    severity: "Medium",
    description: "High-NA is technically operational at three customers as of mid-2025, but the ramp to volume manufacturing usage is gated by customer node timing. Intel 18A and 14A use High-NA. TSMC has taken first systems. Samsung is later. If customer node ramps slip, High-NA revenue back-end-loads, and the 2028 target of High-NA being roughly 25 percent of EUV revenue gets pushed out. This is a pacing risk, not a thesis-breaking one.",
  },
  {
    title: "Concentration risk in supplier base",
    category: "Operational",
    severity: "Low-Medium",
    description: "The same supplier concentration that protects ASML's monopoly is also a single point of failure. A serious disruption at Trumpf or Zeiss would not just delay ASML production. It would have no contingency plan, because no second supplier exists. This is a low-probability but high-consequence risk that ASML manages through deep co-investment and physical co-location of engineering teams.",
  },
];

/* ═══════════════════════════════════════════
   KEY TAKEAWAY
   ═══════════════════════════════════════════ */
export const keyTakeaway = "ASML is one of the cleanest examples in public markets of a structural monopoly on a critical input that has no substitute. The investment debate is not about the moat. It is about what to pay for it, how to underwrite cyclicality, and how to think about the long-run share of economic rent that flows to ASML versus its three customers. The supplied EUV primer makes clear why the moat exists. The financial frame makes clear that the market understands this, and that pricing it correctly is harder than identifying it.";
