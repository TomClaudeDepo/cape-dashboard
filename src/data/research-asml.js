// ASML — EUV Lithography Technology Primer
// Step-by-step content. Each micro-step has a number, title, explanation, and fun fact.

export const heroStats = [
  { value: "13.5nm", label: "EUV wavelength, roughly 14x shorter than DUV at 193nm", color: "deepBlue" },
  { value: "0.02%", label: "Electrical input to usable EUV photon conversion", color: "capRed" },
  { value: "~70%", label: "Reflectivity per mirror — about 2.8 percent reach the wafer", color: "orange" },
  { value: "500,000 K", label: "Tin plasma temperature at the source", color: "purple" },
  { value: "180 tons", label: "Weight per scanner — ships in roughly 40 freight containers", color: "deepBlue" },
  { value: "20+ years", label: "No second supplier has emerged despite the effort", color: "green" },
];

export const intro = "EUV lithography is one of the most physically extreme manufacturing processes ever industrialised. Below, the photon's journey from molten tin to patterned silicon, broken down into every meaningful step.";

export const coreProblem = "To print transistor features at 7nm, 5nm, and 3nm nodes, you need a light source with a wavelength short enough to resolve them. Deep Ultraviolet (DUV) at 193nm hit its limit around 2015, even with multi-patterning tricks. Extreme Ultraviolet (EUV) uses 13.5nm light, roughly 14 times shorter. The catch: at 13.5nm, basically every material absorbs the light, including air, glass, and conventional lens materials. That single constraint dictates almost every weird design choice in the machine.";

/* ═══════════════════════════════════════════
   STAGE 1 — SOURCE (Making the light)
   ═══════════════════════════════════════════ */
export const sourceSteps = [
  {
    id: "S1",
    title: "Tin droplet generator",
    explanation: "A heated reservoir holds molten tin just above its melting point. A precision nozzle dispenses droplets into the vacuum chamber at roughly fifty thousand per second. Each droplet is about twenty-five microns wide, around a third the width of a human hair.",
    funFact: "Tin melts at 232 degrees Celsius. The reservoir is held just above this. Twenty-five microns is roughly a third the width of a human hair.",
  },
  {
    id: "S2",
    title: "Droplet in flight",
    explanation: "Once dispensed, a single droplet falls through the chamber on a precisely tracked trajectory. Two lasers are pre-positioned along its path, a pre-pulse on one side and a main pulse on the other, both waiting to fire at exactly the right millisecond.",
    funFact: "There are around fifty thousand droplets crossing the chamber every second. You are watching one of them.",
  },
  {
    id: "S3",
    title: "Pre-pulse strike",
    explanation: "A lower-power CO₂ laser pulse hits the droplet first, deforming it from a sphere into a thin pancake. This shape change is not cosmetic. A flattened droplet absorbs the main pulse far more efficiently than a sphere does.",
    funFact: "Pancaking the droplet roughly doubles the EUV conversion efficiency compared to hitting a sphere directly.",
  },
  {
    id: "S4",
    title: "Main pulse strike",
    explanation: "The main CO₂ laser, running at twenty-five to thirty kilowatts, fires into the pancake. The impact happens in nanoseconds. The energy density is high enough to ionise the tin completely.",
    funFact: "This is the most powerful industrial CO₂ laser ever built. Built by Trumpf, used nowhere else on Earth.",
  },
  {
    id: "S5",
    title: "Plasma formation",
    explanation: "The pancake transforms into a tin plasma at roughly half a million Kelvin. This plasma radiates EUV photons at 13.5nm in all directions for a fraction of a microsecond before cooling. The cycle then repeats with the next droplet.",
    funFact: "Roughly eighty-five times hotter than the surface of the sun, which sits at around 5,800 K.",
  },
  {
    id: "S6",
    title: "Collector mirror",
    explanation: "A large parabolic Molybdenum-Silicon (Mo/Si) mirror sits behind the plasma. It catches the EUV photons radiating away from the plasma and redirects them toward the rest of the optical path. Without it, ninety-nine percent of the emitted EUV would be wasted to chamber walls.",
    funFact: "Only about 0.02 percent of the electrical input becomes usable EUV. Almost everything else is waste heat to manage.",
  },
];

/* ═══════════════════════════════════════════
   STAGE 2 — MIRRORS (Why everything must be a mirror)
   ═══════════════════════════════════════════ */
export const mirrorSteps = [
  {
    id: "M1",
    title: "Bragg multilayer cross-section",
    explanation: "A polished aluminium mirror reflects roughly zero percent of EUV. The workaround is a Bragg reflector: a stack of forty to fifty alternating Mo and Si layer pairs, each pair tuned to roughly half the EUV wavelength. Each layer reflects a small fraction. The stack does the rest.",
    funFact: "A single conventional metal mirror reflects almost no EUV. The Bragg stack gets you to about seventy percent.",
  },
  {
    id: "M2",
    title: "Constructive interference",
    explanation: "At each Mo-Si interface a small portion of the incoming wave reflects. Layer thicknesses are tuned so that these dozens of partial reflections all arrive back at the surface in phase. They add together constructively. The result is the seventy percent total reflectivity, far higher than any single material could deliver.",
    funFact: "Each Mo/Si pair is around 6.8 nanometres thick, roughly twenty to thirty atoms in total.",
  },
  {
    id: "M3",
    title: "Reflectivity decay through the optical path",
    explanation: "Seventy percent per mirror sounds high until you multiply. A typical EUV scanner has roughly ten reflective surfaces between source and wafer. Compounding 0.70 ten times leaves you with about 2.8 percent. The math forces the source to be brutally overpowered.",
    funFact: "About ninety-seven percent of the photons that leave the collector never reach the wafer.",
  },
  {
    id: "M4",
    title: "Sub-nanometre polishing",
    explanation: "Any surface defect on a Bragg mirror scatters photons out of the useful path. At 13.5nm, the tolerable roughness is well below a single nanometre, ideally a few atoms peak-to-valley. Zeiss SMT produces these mirrors. No other firm in the world can.",
    funFact: "Smoother than the curvature of the Earth scaled down to a coin. Defects scatter photons you cannot afford to lose.",
  },
];

/* ═══════════════════════════════════════════
   STAGE 3 — RETICLE (The mask is itself a mirror)
   ═══════════════════════════════════════════ */
export const reticleSteps = [
  {
    id: "R1",
    title: "The reflective reticle",
    explanation: "In DUV, the photomask is quartz with chrome patterns and light passes through it. In EUV, light cannot pass through anything useful. So the reticle itself is built as a Mo/Si Bragg mirror with the chip pattern etched on top as a tantalum-based absorber. EUV reflects back only where the absorber is absent.",
    funFact: "In DUV, light passes through the mask. In EUV, the mask is itself a mirror with the chip pattern etched as an absorber.",
  },
  {
    id: "R2",
    title: "The pellicle",
    explanation: "A pellicle is a thin protective membrane stretched on a frame above the reticle. Its job is to intercept airborne particles before they reach the reticle surface. Because the absorber pattern reflects on every die exposed, even a single particle on the reticle would print as a defect across the whole wafer.",
    funFact: "The pellicle is around thirty nanometres thick. It has to survive flash heating above 600 degrees Celsius without sagging or fogging.",
  },
  {
    id: "R3",
    title: "Anamorphic demagnification",
    explanation: "Low-NA reduces the reticle 4x in both axes. High-NA forces 4x in one axis and 8x in the other. Asymmetry is not a design preference but a physical necessity. At 0.55 numerical aperture, a symmetric reflective system would not fit inside the available envelope without incoming and outgoing beams interfering.",
    funFact: "The 4x by 8x split was forced by geometry. At 0.55 NA you cannot fit a symmetric reflective system in the available envelope.",
  },
];

/* ═══════════════════════════════════════════
   STAGE 4 — PROJECTION & WAFER
   ═══════════════════════════════════════════ */
export const projectionSteps = [
  {
    id: "P1",
    title: "Projection optics box",
    explanation: "After bouncing off the reticle, the patterned EUV beam enters the Projection Optics Box (POB). Six curved Mo/Si mirrors are arranged in a folded path that does the final demagnification and projects the pattern onto the wafer. The beam zigzags through them on its way down.",
    funFact: "Each of the six mirrors is precision-figured to atomic tolerances. Zeiss SMT is the only firm in the world that produces them at this scale.",
  },
  {
    id: "P2",
    title: "The exposure slit",
    explanation: "The POB does not project a full die at once. It exposes a slit-shaped field measuring roughly twenty-six by thirty-three millimetres. A wafer carries dozens of dies, and the scanner steps across them one at a time, exposing each in a single slit-scan pass.",
    funFact: "A 300mm wafer carries about 100 dies. Each die is exposed in twenty-five to thirty-five seconds.",
  },
  {
    id: "P3",
    title: "Synchronous reticle and wafer scan",
    explanation: "Within each die, the reticle and the wafer scan in opposite directions at carefully matched velocities. The reticle moves one way, the wafer the other, and the POB projects the pattern continuously through the slit as both stages glide past. It is a choreographed mechanical ballet.",
    funFact: "The stages track each other to single-digit nanometre accuracy. Any drift larger than a few atoms ruins the exposure.",
  },
  {
    id: "P4",
    title: "The printed wafer",
    explanation: "Once the exposure completes, the wafer comes out coated in patterned photoresist. Subsequent develop, etch, and deposition steps turn that pattern into actual circuit features. Then the wafer comes back to a scanner for the next layer.",
    funFact: "A leading-edge logic chip needs dozens of EUV layers, each with its own reticle, alignment, exposure, and develop cycle.",
  },
  {
    id: "P5",
    title: "Throughput",
    explanation: "A Low-NA NXE:3800E moves roughly 160 to 220 wafers per hour through the tool. Around the clock that is roughly five thousand wafers per day per scanner. Each unit costs around two hundred million dollars and ASML builds fewer than sixty per year.",
    funFact: "Roughly five thousand wafers per day per tool, running twenty-four-seven. ASML ships fewer than sixty Low-NA tools per year.",
  },
];

/* ═══════════════════════════════════════════
   PRODUCT GENERATIONS
   ═══════════════════════════════════════════ */
export const productComparison = [
  { spec: "Numerical aperture", lowNa: "0.33", highNa: "0.55" },
  { spec: "Resolution", lowNa: "~13nm", highNa: "~8nm" },
  { spec: "Optical config", lowNa: "Symmetric", highNa: "Anamorphic (4x / 8x)" },
  { spec: "Price per tool", lowNa: "~$200M", highNa: "~$380M" },
  { spec: "Annual capacity", lowNa: "~50-60 tools", highNa: "~5-10 tools" },
  { spec: "Status", lowNa: "Volume production", highNa: "First customer shipments (Intel, TSMC)" },
];

export const highNaNote = "High-NA is what enables sub-2nm logic without multi-patterning. The anamorphic design (different magnification in X versus Y) was forced by the geometry: at 0.55 NA you cannot fit a symmetric reflective system in the available physical envelope without the incoming and outgoing beams interfering.";

/* ═══════════════════════════════════════════
   MONOPOLY CLOSE
   ═══════════════════════════════════════════ */
export const monopolyClose = "Every component is at the bleeding edge: the CO₂ laser comes from Trumpf, the Mo/Si optics come from Zeiss SMT (which ASML co-owns), the precision stages from ASML itself. The integration risk alone is so high that no second supplier has emerged in over twenty years of effort. Each tool ships in roughly forty freight containers, weighs around 180 tons, and takes months to install and qualify on-site. Annual capacity is roughly fifty to sixty Low-NA tools and five to ten High-NA tools.";

/* ═══════════════════════════════════════════
   COMPETITORS — Threat landscape
   ═══════════════════════════════════════════ */
export const competitorIntro = "The monopoly is real but not unchallenged. Four categories of competitor exist, each with a distinct threat profile. None are positioned to displace ASML at the leading edge in the next five years, and most are not really trying to.";

export const competitorStats = [
  { value: "0", label: "Credible challengers at the leading edge today", color: "deepBlue" },
  { value: "~250W", label: "Source power required for commercial EUV. Chinese LDP prototypes sit at 50-100W", color: "capRed" },
  { value: "2028", label: "Earliest realistic date for a Chinese commercial-grade EUV tool on fab floors", color: "orange" },
  { value: "Memory only", label: "Where Canon's nanoimprint is genuinely competitive. Logic remains untouchable for it", color: "purple" },
];

/* Coverage matrix: each player's effective reach across market segments.
   Segments: Memory (NAND/DRAM), Mature logic (≥14nm), Advanced logic (7-3nm), Cutting edge (≤2nm)
   Coverage value: 0 = none, 0.3 = niche, 0.6 = meaningful, 1.0 = dominant
   Notes are per-segment short labels. */
export const coverageSegments = [
  { id: "memory",   label: "Memory",         sub: "NAND / DRAM" },
  { id: "mature",   label: "Mature logic",   sub: "≥14nm" },
  { id: "advanced", label: "Advanced logic", sub: "7nm – 3nm" },
  { id: "edge",     label: "Cutting edge",   sub: "≤2nm" },
];

export const coveragePlayers = [
  { name: "ASML",                   color: "green",    coverage: [0.7, 1.0, 1.0, 1.0], notes: ["Some share",  "Strong",         "Dominant",        "Effective monopoly"] },
  { name: "Canon NIL",              color: "deepBlue", coverage: [1.0, 0.3, 0.0, 0.0], notes: ["Active, Kioxia", "Limited",      "Not viable",       "Not viable"] },
  { name: "Chinese LDP-EUV",        color: "capRed",   coverage: [0.0, 0.6, 0.7, 0.0], notes: ["Not the target", "2028+ China",  "~2029 China",      "No High-NA path"] },
  { name: "SSMB-EUV",               color: "purple",   coverage: [0.0, 0.0, 0.2, 0.2], notes: ["Not the target", "Not the target", "R&D, 2035+",     "R&D, 2035+"] },
  { name: "E-beam / DUV / Prinano", color: "orange",   coverage: [0.5, 0.3, 0.0, 0.0], notes: ["Niche",       "DUV stopgap",     "Yields collapse",  "No path"] },
];

export const competitors = [
  {
    id: "C1",
    name: "Canon Nanoimprint Lithography",
    short: "Canon NIL",
    badge: "Closest commercially shipping alternative",
    color: "deepBlue",
    tool: "FPA-1200NZ2C",
    firstShipped: "Shipping since late 2024",
    approach: "Stamp-and-print. A patterned mask is pressed onto resist-coated wafers, transferring the pattern mechanically. No 13.5nm light source needed, which removes the single biggest cost driver in EUV.",
    angle: "Roughly an order of magnitude cheaper per tool than EUV at $150M+. Canon claims up to 90% lower energy consumption since there is no source plasma to power. Lead customer is Kioxia. Canon itself does not position the tool as a direct EUV competitor.",
    targets: "Resolution down to 14nm. Logic chips comparable to current AMD, Intel, and Nvidia processors are achievable in principle, but the throughput economics do not support it.",
    breaks: [
      "Throughput. Each NIL cell processes one wafer at a time on a 1.3 second imprint cycle, fundamentally below EUV scanners running at 200+ wafers per hour.",
      "Defect control. Any defect on the stamp mask replicates onto every wafer. There is no statistical averaging across exposures.",
      "Pattern complexity. Slower and less suitable for the irregular features of processors and SoCs. Works for NAND flash where the patterns repeat.",
    ],
    horizon: "Shipping today for memory. Never a threat at the cutting edge of logic.",
    horizonShort: "Today / memory only",
    threatToASML: "Low. Different tool category. Takes a slice of memory share that EUV was unlikely to win on cost grounds anyway.",
  },
  {
    id: "C2",
    name: "Chinese LDP-based EUV",
    short: "Huawei / SiCarrier / SMIC",
    badge: "Closest direct technical replication",
    color: "capRed",
    tool: "LDP prototype, Shenzhen",
    firstShipped: "Prototype validated late 2025",
    approach: "Laser-induced discharge plasma rather than ASML's laser-produced plasma. Tin is evaporated between electrodes and ionised via high-voltage discharge to emit at 13.5nm. Theoretically simpler architecture than ASML's CO2-laser-vaporised-tin path.",
    angle: "Whole-of-nation effort coordinated by Huawei and Shenzhen SiCarrier. Geopolitically motivated rather than commercially motivated. The tool is not intended for export. The aim is to cap SMIC's downside, not to take ASML's TAM.",
    targets: "Initial reports suggest the prototype is the foundation for a commercial-grade tool expected to reach fab floors by 2028. The stated goal is to remove the need for expensive DUV multi-patterning by around 2029.",
    breaks: [
      "Source power. Prototypes generate 50-100W. Commercial EUV needs 250W or more.",
      "Optics. Zeiss still holds a significant lead in precision multilayer mirrors. Replicating sub-nanometre figure tolerances at scale is a decade-plus problem in its own right.",
      "Masks and photoresists. Real bottlenecks remain beyond the light source.",
      "No High-NA. The Chinese path is Low-NA only. No domestic line of sight to 0.55 NA anamorphic optics.",
      "Track record. CSIS notes that prior Chinese 5nm claims have repeatedly been disproven. SMIC's existing 7nm capability was built on stockpiled ASML DUV machines rather than indigenous breakthroughs.",
    ],
    horizon: "Domestic Chinese fabs by 2028 at the earliest. Not exported. No High-NA roadmap.",
    horizonShort: "2028+ / China only",
    threatToASML: "Indirect. Reduces SMIC's structural disadvantage inside China but does not contest export markets. The real risk to ASML is losing access to the Chinese market entirely as Beijing's bifurcated stack matures, not losing share to a credible global challenger.",
  },
  {
    id: "C3",
    name: "SSMB-EUV",
    short: "Tsinghua / SIOM",
    badge: "The wild card",
    color: "purple",
    tool: "Pre-prototype research programme",
    firstShipped: "National research initiative",
    approach: "Steady-state microbunching EUV. A centralised synchrotron-like accelerator generates EUV light that could in principle feed multiple lithography tools simultaneously.",
    angle: "If it works at scale, it would invert the current architecture. Instead of one source per tool, one accelerator powers many. A scaling advantage that single-source EUV cannot match.",
    targets: "Still pre-prototype for production use. Led by the Shanghai Institute of Optics and Fine Mechanics with Tsinghua University.",
    breaks: [
      "Not demonstrated at production scale.",
      "Capital and physical footprint of a synchrotron-class source is non-trivial. The economics depend entirely on multi-tool throughput materialising.",
      "Mask, optics, and photoresist gaps remain whether the source is LPP, LDP, or SSMB.",
    ],
    horizon: "10+ years if it works at all.",
    horizonShort: "2035+ / theoretical",
    threatToASML: "Low this decade. Worth tracking as a structural threat to the EUV business model if it ever matures, since the per-tool light source is currently one of ASML's largest moats.",
  },
];

export const otherChallenges = [
  {
    name: "E-beam (China's Xizhi)",
    description: "Draws circuits directly onto the wafer with a focused electron beam, no masks required. Maskless and flexible, but throughput collapses against scanner-based exposure. Used for mask-making and small-batch R&D, not volume production.",
  },
  {
    name: "Multi-patterning DUV",
    description: "How SMIC currently produces 7nm. Yields collapse below 5nm and the cost curve diverges from EUV badly. A stopgap, not a destination.",
  },
  {
    name: "Prinano (China NIL)",
    description: "Domestic Chinese answer to Canon's nanoimprint. Memory-focused profile, same throughput and defect-replication issues. Same conclusion: not a leading-edge logic alternative.",
  },
];

export const moatBottomLine = "The advanced logic monopoly is intact through at least 2028-2030. Nanoimprint takes some memory share but is a different tool category. Chinese LDP-EUV will eventually serve domestic fabs and remove a chunk of SMIC's structural disadvantage, but it does not address export markets, includes no High-NA capability, and faces real metrology, mask, and photoresist gaps beyond the light source. ASML operates as a system integrator on a Western IP ecosystem, particularly Zeiss optics, with decades of accumulated expertise. The integration moat is the harder part to replicate, not the physics. The real risk to ASML is geopolitical: losing access to the Chinese market entirely as Beijing's bifurcated stack matures, not losing High-NA share to a credible global challenger.";
