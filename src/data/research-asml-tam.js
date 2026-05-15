/* ════════════════════════════════════════════════════════════════════════════
   ASML — TOTAL ADDRESSABLE MARKET 2025-2030
   Constructed bottom-up from primary sources.
   Cross-checked against ASML CMD 2024 €44-60B 2030 envelope.
   ════════════════════════════════════════════════════════════════════════════ */

export const tamSummary =
  "Two independent constructions — top-down (semis revenue × capex intensity × litho share × ASML share) and bottom-up (fab-by-fab tool aggregation) — converge on €50-52B for 2030. That sits in the lower half of ASML's €44-60B Capital Markets Day envelope, ~3% below the Morningstar-anchored €54B consensus midpoint. The €60B bull case requires three correlated factors to all trend favourably at once; the data does not yet warrant that conjunction.";

/* ─── Headline snapshot ─── */
export const snapshot = {
  today: { value: "€32.7B", label: "2025 ACTUAL", note: "+15.4% YoY (Q4 2025 6-K)" },
  guide: { value: "€36-40B", label: "2026 GUIDE", note: "Q1 2026 raise from €34-39B" },
  base:  { value: "€50-52B", label: "2030 BASE", note: "Below €54B Bloomberg consensus" },
  bull:  { value: "€58-60B", label: "2030 BULL", note: "Requires three drivers to align" },
};

/* ─── Bridge 2025 → 2030 (Base case €52B) ─── */
export const bridge = [
  { label: "2025 actual", value: 32.7, type: "anchor" },
  { label: "Node migration (EUV layers per wafer)",   delta: 7.0, type: "pos" },
  { label: "Leading-edge capacity expansion",         delta: 5.0, type: "pos" },
  { label: "High-NA ASP mix",                         delta: 3.0, type: "pos" },
  { label: "Installed Base Management compounding",   delta: 3.0, type: "pos" },
  { label: "Re-shoring inefficiency premium",         delta: 1.0, type: "pos" },
  { label: "Cyclical normalisation",                  delta: -1.0, type: "neg" },
  { label: "Competitive substitution (low-end DUV)",  delta: -0.5, type: "neg" },
  { label: "2030 base case",                          value: 50.2, type: "anchor" },
];

/* ─── Top-down construction (historicals + 2030 scenarios) ─── */
export const topDownSeries = [
  // Year, semi rev $B, capex int %, WFE $B, litho/WFE %, ASML share %, ASML systems $B, IBM $B, total $B
  { year: 2015, semi: 335, capexInt: 19, wfe: 33,  lithoShare: 18, asmlShare: 80, systems: 5,  ibm: 1.7, total: 7  },
  { year: 2020, semi: 440, capexInt: 26, wfe: 63,  lithoShare: 22, asmlShare: 88, systems: 12, ibm: 4.1, total: 16 },
  { year: 2024, semi: 630, capexInt: 28, wfe: 104, lithoShare: 26, asmlShare: 90, systems: 24, ibm: 7.0, total: 31, scenario: "A" },
  { year: 2025, semi: 796, capexInt: 21, wfe: 116, lithoShare: 26, asmlShare: 90, systems: 27, ibm: 8.8, total: 36, scenario: "A" },
  { year: "2030 Bear", semi: 950,  capexInt: 16, wfe: 106, lithoShare: 24, asmlShare: 85, systems: 22, ibm: 9,  total: 31, scenario: "bear" },
  { year: "2030 Base", semi: 1100, capexInt: 19, wfe: 157, lithoShare: 28, asmlShare: 92, systems: 40, ibm: 13, total: 53, scenario: "base" },
  { year: "2030 Bull", semi: 1300, capexInt: 22, wfe: 223, lithoShare: 32, asmlShare: 95, systems: 68, ibm: 18, total: 86, scenario: "bull" },
];

/* ─── Technology segmentation ─── */
export const techSegments = [
  { id: "lowna",   name: "Low-NA EUV",   sub: "NXE:3800E + successors",     y24: 7.5,  y25: 9.5,  y30: 19.5, cagr: "13-18%", margin: "GM accretive",   colorKey: "capRed" },
  { id: "highna",  name: "High-NA EUV",  sub: "EXE:5000 / 5200",            y24: 0.8,  y25: 2.1,  y30: 8.0,  cagr: "25-35%", margin: "Dilutive (ramp)", colorKey: "purple" },
  { id: "duvi",    name: "DUV immersion",sub: "NXT:2100 family",            y24: 10.5, y25: 10.0, y30: 12.0, cagr: "2-5%",   margin: "At average",      colorKey: "deepBlue" },
  { id: "duvdry",  name: "DUV dry",      sub: "KrF, ArF dry, i-line",       y24: 2.3,  y25: 2.0,  y30: 2.8,  cagr: "4-7%",   margin: "Below average",   colorKey: "orange" },
  { id: "mi",      name: "Metrology",    sub: "YieldStar, HMI",             y24: 0.65, y25: 0.83, y30: 1.8,  cagr: "13-19%", margin: "At/above avg",    colorKey: "moss" },
  { id: "ibm",     name: "Installed Base",sub: "Service, upgrades, spares", y24: 6.49, y25: 8.19, y30: 12.0, cagr: "6-10%",  margin: "GM accretive",    colorKey: "green" },
];

/* ─── End application demand (from ASML CMD 2024 Exhibit 99.3) ─── */
export const endApps = [
  { name: "Servers / DC / AI compute",        y25: 156, y30: 361, cagr: "18%", intensity: "0.15-0.25", note: "Single largest marginal driver", colorKey: "capRed" },
  { name: "Smartphone",                       y25: 149, y30: 192, cagr: "5%",  intensity: "0.06-0.10", note: "Modest growth, high litho mix",  colorKey: "deepBlue" },
  { name: "Wired/Wireless Infrastructure",    y25: 92,  y30: 112, cagr: "4%",  intensity: "0.05-0.08", note: "Steady; not a swing factor",     colorKey: "purple" },
  { name: "Industrial Electronics",           y25: 76,  y30: 114, cagr: "9%",  intensity: "0.03-0.05", note: "Volume-rich, intensity-poor",    colorKey: "moss" },
  { name: "Personal Computing",               y25: 70,  y30: 83,  cagr: "3%",  intensity: "0.05-0.08", note: "Flat in real terms",             colorKey: "orange" },
  { name: "Consumer Electronics",             y25: 84,  y30: 120, cagr: "7%",  intensity: "0.04-0.06", note: "Diffuse, mature nodes",          colorKey: "textSec" },
  { name: "Automotive",                       y25: 53,  y30: 70,  cagr: "6%",  intensity: "0.02-0.04", note: "Wafer volumes; KrF/i-line only", colorKey: "green" },
];

/* ─── Customer concentration (most important table) ─── */
export const customers = [
  {
    name: "TSMC", region: "Taiwan", capex25: "$40.9B", capex2628: "$55-65B",
    cum2530: "$320-360B", lithoPct: "30-35%", wallet: "90-95%",
    nodes: "N3 ramp · N2 H2-25 · A16 H2-26 · A14 ~2028",
    note: "Single largest swing factor. 2026 capex +27-37%. ~40% of cumulative ASML 6-year revenue.",
    confidence: "High", tone: "pos",
  },
  {
    name: "Samsung Foundry", region: "Korea/US", capex25: "$3.3-5B", capex2628: "$8-12B",
    cum2530: "$50-70B", lithoPct: "25-30%", wallet: "85-95%",
    nodes: "SF3 prod · SF2 ramp H2-26 · Taylor TX 2026+",
    note: "Capex halved 2025. Bull case needs Tesla/Dojo wins and 2nm yield recovery.",
    confidence: "Medium", tone: "neu",
  },
  {
    name: "Samsung Memory", region: "Korea", capex25: "$33-36B", capex2628: "$35-45B",
    cum2530: "$220-260B", lithoPct: "12-15%", wallet: "80-90%",
    nodes: "1a/1b/1c DRAM · V9 NAND · HBM4",
    note: "Pyeongtaek P5 slip is the largest single timing risk to memory bull case.",
    confidence: "Medium", tone: "neu",
  },
  {
    name: "Intel Foundry", region: "US/EU", capex25: "$18B gross", capex2628: "$15-20B",
    cum2530: "$100-140B", lithoPct: "25-35%", wallet: "95-100%",
    nodes: "18A HVM 2025 · 14A 2027+ (at risk)",
    note: "Largest High-NA buyer through 2026. 14A may be paused absent foundry customer (per 10-Q).",
    confidence: "Medium", tone: "neg",
  },
  {
    name: "SK Hynix", region: "Korea", capex25: "$20B", capex2628: "$25-30B",
    cum2530: "$150-180B", lithoPct: "10-13%", wallet: "75-85%",
    nodes: "1b/1c DRAM · HBM4 Q4-25 · M15X live Oct 2025",
    note: "First High-NA at memory maker (EXE:5200B Sept 2025). Highest litho intensity ramp.",
    confidence: "High", tone: "pos",
  },
  {
    name: "Micron", region: "US/Asia", capex25: "$13.8B", capex2628: "$18-22B",
    cum2530: "$110-140B", lithoPct: "10-13%", wallet: "75-85%",
    nodes: "1-gamma EUV first deployment",
    note: "First EUV layer at 1-gamma. Boise/NY mega-fab schedules support 2027-30 upside.",
    confidence: "High", tone: "pos",
  },
  {
    name: "SMIC", region: "China", capex25: "$7.5B", capex2628: "$7-8B",
    cum2530: "$45-50B", lithoPct: "15-20%", wallet: "30-50%",
    nodes: "N+1/N+2 ~7nm via DUV multi-patterning",
    note: "No EUV access. Restricted to KrF/i-line and pre-licensed NXT immersion.",
    confidence: "Low", tone: "neg",
  },
  {
    name: "CXMT", region: "China", capex25: "$7-10B", capex2628: "$8-12B",
    cum2530: "$50-70B", lithoPct: "10-15%", wallet: "30-50%",
    nodes: "17nm DDR4/DDR5",
    note: "DUV only. STAR Market IPO Dec 2025. Domestic equipment substitution rising.",
    confidence: "Low", tone: "neg",
  },
  {
    name: "YMTC", region: "China", capex25: "$3-5B", capex2628: "$3-5B",
    cum2530: "$20-30B", lithoPct: "<5%", wallet: "Negligible",
    nodes: "232L / 294L NAND",
    note: "Entity List restricted. Effectively zero EUV/advanced ASML exposure.",
    confidence: "Low", tone: "neg",
  },
  {
    name: "Hua Hong", region: "China", capex25: "$2.0B", capex2628: "$1.5-2.5B",
    cum2530: "$10-15B", lithoPct: "15-20%", wallet: "40-60%",
    nodes: "28/22nm transition",
    note: "Mature DUV only. Big Fund III supported.",
    confidence: "Medium", tone: "neu",
  },
  {
    name: "Kioxia / SanDisk", region: "Japan", capex25: "$2-2.5B", capex2628: "$3-4B",
    cum2530: "$18-25B", lithoPct: "<5%", wallet: "<5%",
    nodes: "BiCS8 / BiCS9 NAND",
    note: "NAND is litho-light. Canon NIL competes here at niche layers.",
    confidence: "High", tone: "neu",
  },
  {
    name: "GlobalFoundries", region: "US/EU", capex25: "$1.5-2B", capex2628: "$1.5-2B",
    cum2530: "$10-15B", lithoPct: "10-15%", wallet: "70-85%",
    nodes: "12LP+, 22FDX",
    note: "No leading-edge plans. Specialty-foundry model.",
    confidence: "High", tone: "neu",
  },
  {
    name: "UMC", region: "Taiwan/Sing", capex25: "$1.8B", capex2628: "$1.5-2B",
    cum2530: "$12-15B", lithoPct: "15-20%", wallet: "85%",
    nodes: "22/28nm + Intel 12nm JV",
    note: "Joint development with Intel. Modest ASML contribution.",
    confidence: "High", tone: "neu",
  },
  {
    name: "Rapidus", region: "Japan", capex25: "$3B", capex2628: "$3-4B",
    cum2530: "$18-22B", lithoPct: "25-35%", wallet: "100%",
    nodes: "2nm GAA pilot 2025 · HVM 2H-2027",
    note: "100% EUV. METI backed. Risk: customer pipeline still nascent.",
    confidence: "Medium", tone: "neu",
  },
];

/* ─── Geographic mix (system sales by region) ─── */
export const geoMix = [
  { region: "China",    y24: 41, y26: 20, y30: 20, policy: "BIS Oct '22/'23/'24 · Dutch export rules Sep '23 + Jan '24" },
  { region: "Taiwan",   y24: 15, y26: 28, y30: 30, policy: "Taiwan Industrial Innovation Statute Art. 10-2" },
  { region: "Korea",    y24: 20, y26: 24, y30: 26, policy: "K-Chips Act · Yongin cluster KRW 622T over 20yr" },
  { region: "USA",      y24: 10, y26: 17, y30: 20, policy: "CHIPS Act $39B manufacturing pool (~$36B finalised)" },
  { region: "Japan",    y24: 6,  y26: 9,  y30: 10, policy: "METI ~¥4T FY21-23 · ¥10T pledged through FY30" },
  { region: "Europe+RoW", y24: 8, y26: 7, y30: 6,  policy: "EU Chips Act €43B · Intel Magdeburg cancelled · ESMC Dresden" },
];

/* ─── Risk scenarios (quantified downsides) ─── */
export const risks = [
  {
    title: "Memory-led downturn",
    probability: "~20%",
    revHit: "-€5 to 6B",
    landingTAM: "€44-46B",
    body: "2023 memory WFE fell 46%. Memory = 39% of 2024 ASML system revenue, 51% Q1 2026 by units. ASML less exposed than AMAT/LRCX: EUV order books 4-5 quarters ahead, IBM counter-cyclical. Lands at the low end of company guidance.",
    color: "orange",
  },
  {
    title: "China decoupling extreme",
    probability: "~25-30%",
    revHit: "-€3 to 5B (net)",
    landingTAM: "€47-49B",
    body: "Full decoupling: zero China systems + 50% service tail = €10-12B gross hit. Realistic recapture 50-70% from TSMC/Samsung/SK Hynix who are capacity-constrained. MATCH Act pass-probability rising; assigned ~25-30% through 2030.",
    color: "capRed",
  },
  {
    title: "AI capex digestion (2027-28)",
    probability: "~30%",
    revHit: "-€5 to 7B",
    landingTAM: "€45-47B",
    body: "Hyperscaler 2026 capex $660-725B (~75% AI). The 2022 crypto-crash analog produced 20-25% leading-edge WFE compression in 2023. A 2027-28 digestion phase compresses EUV bookings ~15% and TSMC N3/N2 utilisation.",
    color: "purple",
  },
  {
    title: "Competitive entry (EUV alternative)",
    probability: "Low",
    revHit: "-€0.8 to 1B",
    landingTAM: "€51B (mostly base)",
    body: "Nikon abandoned EUV ~2018. Canon NIL is niche (Kioxia memory). SMEE 28nm DUV in development. Realistic 5-10% share-loss haircut at low-end DUV only, ~zero at EUV. ~30 years of R&D and unique Zeiss SMT optics partnership protect the moat.",
    color: "deepBlue",
  },
];

/* ─── Leading indicators dashboard ─── */
export const leadingIndicators = [
  { metric: "TSMC monthly revenue",                source: "TSMC IR",                       cadence: "Monthly",   correlation: "High",  note: "Single best leading indicator" },
  { metric: "Nvidia datacenter revenue + guide",   source: "Nvidia 10-Q",                   cadence: "Quarterly", correlation: "High",  note: "Drives leading-edge logic capex" },
  { metric: "Hyperscaler aggregate capex",         source: "MSFT/META/GOOG/AMZN/ORCL 10-Qs",cadence: "Quarterly", correlation: "High",  note: "2026E aggregate $660-725B" },
  { metric: "SEMI Worldwide Billings",             source: "SEMI WWSEMS",                   cadence: "Monthly",   correlation: "High",  note: "6-9 month lead on ASML revenue" },
  { metric: "SK Hynix capex + HBM order book",     source: "SK Hynix earnings",             cadence: "Quarterly", correlation: "High",  note: "HBM cycle driver" },
  { metric: "KLA process control billings",        source: "KLA earnings",                  cadence: "Quarterly", correlation: "High",  note: "3-6 month lead on tool installs" },
  { metric: "Samsung memory capex + 2nm progress", source: "Samsung Electronics earnings",  cadence: "Quarterly", correlation: "Med-Hi",note: "Foundry recovery signal" },
  { metric: "AMAT China revenue mix",              source: "Applied Materials earnings",    cadence: "Quarterly", correlation: "Medium",note: "Proxy for China WFE direction" },
  { metric: "DRAM contract ASP",                   source: "TrendForce / DRAMeXchange",     cadence: "Monthly",   correlation: "Medium",note: "Memory profitability → memory capex" },
  { metric: "SMIC capex + 7nm capacity",           source: "SMIC results / Chinese press",  cadence: "Quarterly", correlation: "Medium",note: "China mature/advanced DUV" },
];

/* ─── External forecast validation ─── */
export const externalForecasts = [
  { source: "ASML CMD 2024 (company)",         tam2030: "€44-60B",      date: "Nov 14, 2024", note: "Three scenarios: 44 / 52 / 60" },
  { source: "Yole 'Status of WFE 2025'",       tam2030: "~€52B implied",date: "Aug 2025",     note: "WFE $184B · 26% litho × 92% ASML + IBM" },
  { source: "Morningstar",                     tam2030: "€54B",         date: "Nov 2024",     note: "Bloomberg-consensus midpoint anchor" },
  { source: "Morgan Stanley (Simpson)",        tam2030: "€55B+",        date: "Jan 2026",     note: "Implied via 2027E €46.8B" },
  { source: "BofA",                            tam2030: "€50-60B implied", date: "Apr 2026",  note: "Via 2028 EPS €50.58" },
  { source: "Bernstein",                       tam2030: "Upper half",   date: "Mar 2026",     note: "€1,971 PT — high of street" },
  { source: "Cape Capital (this construction)",tam2030: "€50-52B base", date: "May 2026",     note: "Two-method bottom-up convergence" },
];

/* ─── The Net / bottom line ─── */
export const bottomLine =
  "Anchor at €50-52B for 2030, not €54-56B. The bull case requires WFE >$170B, litho share >30%, and High-NA penetration >25% — a low-probability conjunction since faster High-NA partially offsets capacity demand. China is mostly already in the model post Q1 2026's 19% share; residual risk is MATCH Act and domestic equipment substitution. The underappreciated structural driver is Installed Base Management: ~17% five-year CAGR, counter-cyclical, GM-accretive. At current ~25x 2026 EV/EBITDA the mid case delivers low-double-digit IRR; risk-reward is asymmetric to the downside on a 12-24 month view.";
