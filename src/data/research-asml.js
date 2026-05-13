// ASML — EUV Lithography Technology Primer
// Content drawn entirely from supplied source primer. No outside additions.

export const heroStats = [
  { value: "13.5nm", label: "EUV wavelength, roughly 14x shorter than DUV at 193nm", color: "deepBlue" },
  { value: "0.02%", label: "Electrical input to usable EUV photon conversion", color: "capRed" },
  { value: "~70%", label: "Reflectivity per mirror — about 2.8 percent reach the wafer", color: "orange" },
  { value: "500,000 K", label: "Tin plasma temperature at the source", color: "purple" },
  { value: "180 tons", label: "Weight per scanner — ships in roughly 40 freight containers", color: "deepBlue" },
  { value: "20+ years", label: "No second supplier has emerged despite the effort", color: "green" },
];

export const intro = "EUV lithography is one of the most physically extreme manufacturing processes ever industrialised. Here is how it actually works, end to end.";

export const coreProblem = "To print transistor features at 7nm, 5nm, and 3nm nodes, you need a light source with a wavelength short enough to resolve them. Deep Ultraviolet (DUV) at 193nm hit its limit around 2015, even with multi-patterning tricks. EUV uses 13.5nm light, roughly 14 times shorter. The catch: at 13.5nm, basically every material absorbs the light, including air, glass, and conventional lens materials. That single constraint dictates almost every weird design choice in the machine.";

export const stages = [
  {
    id: "source",
    title: "Stage 1 — Making the light",
    subtitle: "Laser-produced plasma",
    intro: "There is no lamp or laser that natively emits at 13.5nm with useful power, so ASML manufactures it via laser-produced plasma (LPP). The process is genuinely surreal.",
    steps: [
      { label: "Droplet generator", detail: "Dispenses molten tin droplets roughly 25 microns across at approximately 50,000 per second into a vacuum chamber." },
      { label: "Pre-pulse CO₂ laser", detail: "Hits each droplet first, flattening it into a pancake shape. This dramatically improves the conversion efficiency." },
      { label: "Main-pulse CO₂ laser", detail: "Roughly 25 to 30 kilowatts, the most powerful industrial CO₂ laser ever built. Vaporises the pancake into a plasma at around 500,000 Kelvin. That plasma emits a burst of EUV photons." },
      { label: "Collector mirror", detail: "A large mirror sitting behind the plasma gathers the EUV and sends it down the beam path." },
    ],
    closing: "Conversion efficiency from electrical input to usable 13.5nm photons is roughly 0.02 percent. Almost all of the machine's energy budget is wasted heat, which is why thermal management is such a massive engineering subsystem.",
  },
  {
    id: "mirrors",
    title: "Stage 2 — Why everything must be a mirror",
    subtitle: "Bragg reflectors and brutal photon math",
    intro: "This is the conceptual key to the whole machine. At 13.5nm, photons are absorbed by glass, quartz, air, and most other materials. That means:",
    steps: [
      { label: "No lenses", detail: "Refractive optics do not work. The entire imaging system is built from mirrors." },
      { label: "No transmission through air", detail: "The full beam path operates in vacuum." },
      { label: "No conventional mirrors", detail: "A polished aluminium mirror reflects roughly zero percent of EUV. The trick is Bragg reflectors: stacks of 40 to 50 alternating molybdenum and silicon layer pairs, each pair roughly half the wavelength thick. Each layer reflects a tiny fraction. Constructive interference across the stack gets you to about 70 percent reflectivity per mirror." },
    ],
    closing: "The math is brutal. A typical EUV scanner has around 10 reflective surfaces between source and wafer. 0.70 to the power of 10 equals 2.8 percent. Roughly 97 percent of the EUV that leaves the collector never reaches the wafer. That is why the source has to be so absurdly powerful, and why every mirror is polished to sub-nanometre surface roughness. Any defect scatters precious photons.",
  },
  {
    id: "reticle",
    title: "Stage 3 — The reticle (this is the big one)",
    subtitle: "The photomask is itself a mirror",
    intro: "In DUV, the photomask is a piece of quartz with chrome patterns on it; light passes through it. In EUV, light cannot pass through anything useful, so the reticle itself is a mirror. The chip pattern is built as an absorber (typically tantalum-based) on top of a molybdenum-silicon multilayer. EUV hits the reticle and reflects back wherever the absorber is not blocking it. That reflected, patterned beam is what eventually exposes the wafer.",
    steps: [
      { label: "4x anamorphic demagnification", detail: "In High-NA systems, the reticle pattern is 4 times larger than what is printed on the wafer in one axis, 8 times in the other. Reflective geometry does not allow symmetric reduction." },
      { label: "Pellicles are extraordinarily hard", detail: "The thin protective film that keeps particles off the reticle has to be transparent to EUV in both directions and survive 600 degrees Celsius plus flash heating. Basically polysilicon membranes around 30nm thick." },
      { label: "Mask defects are catastrophic", detail: "A single absorber defect prints on every die." },
    ],
    closing: null,
  },
  {
    id: "projection",
    title: "Stage 4 — Projection and scanning",
    subtitle: "Six more mirrors and the synchronous scan",
    intro: "After reflecting off the reticle, the patterned EUV beam passes through the projection optics box (POB), typically six more curved mirrors, each precision-figured to atomic tolerances. These mirrors do the demagnification and project the pattern onto a small slit on the wafer. The exposure field is only around 26 by 33 millimetres.",
    steps: [
      { label: "Synchronous scan", detail: "The wafer and reticle scan in opposite directions at carefully matched velocities, stitching out each die one slit-width at a time." },
      { label: "Throughput", detail: "A 300mm wafer carrying around 100 dies takes the scanner about 25 to 35 seconds to expose end-to-end on a Low-NA NXE:3800E. That translates to roughly 160 to 220 wafers per hour." },
    ],
    closing: null,
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
   WHY THIS IS AN EFFECTIVE MONOPOLY
   ═══════════════════════════════════════════ */
export const monopolyClose = "Every component is at the bleeding edge: the CO₂ laser comes from Trumpf, the molybdenum-silicon optics come from Zeiss SMT (which ASML co-owns), the precision stages from ASML itself. The integration risk alone is so high that no second supplier has emerged in over 20 years of effort. Each tool ships in roughly 40 freight containers, weighs around 180 tons, and takes months to install and qualify on-site. Annual capacity is roughly 50 to 60 Low-NA tools and 5 to 10 High-NA tools.";
