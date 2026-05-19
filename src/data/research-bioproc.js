// Bioprocessing Value Chain — Tools, CDMOs, Innovators, End Market
// Designed as data backbone for the interactive value chain diagram.
//
// Content manifest:
//   - heroStats: 4-6 high-level stats for the header
//   - modalities: filter taxonomy with colors
//   - layers: 4 vertical columns of the diagram
//   - nodes: every entity in the value chain (tools, manufacturing, innovators, end market)
//   - flows: explicit connections, with modality tags
//   - intro / dynamics / makeVsBuy / closingThoughts: prose for the Key Dynamics tab

export const heroStats = [
  { value: "~$100B", label: "Global CDMO market addressable to Lonza & peers", color: "capRed" },
  { value: "~70%", label: "Of biopharma manufacturing now outsourced to CDMOs", color: "deepBlue" },
  { value: "~12% CAGR", label: "CDMO market growth projected through 2030", color: "green" },
  { value: "~80%", label: "ADC dev & manufacturing outsourced — highest of any modality", color: "orange" },
  { value: "~4", label: "Top CDMOs control the lion's share of large-molecule capacity", color: "purple" },
  { value: "~3", label: "Bioprocessing tool vendors dominate consumables: TMO, SRT, DHR", color: "deepBlue" },
];

// Modality filter taxonomy — colors must reference theme tokens (T[colorKey])
export const modalities = [
  { id: "all", label: "All modalities", color: "textSec" },
  { id: "bio", label: "Biologics (mAbs)", color: "deepBlue" },
  { id: "adc", label: "ADCs / Bioconjugates", color: "capRed" },
  { id: "cgt", label: "Cell & Gene", color: "purple" },
  { id: "mrna", label: "mRNA / Vaccines", color: "orange" },
];

export const layers = [
  { id: "tools",   title: "Tools & Equipment",  subtitle: "Picks-and-shovels",                xCenter: 130,  width: 170 },
  { id: "mfg",     title: "Manufacturing",       subtitle: "In-house or outsourced (CDMOs)",   xCenter: 430,  width: 200 },
  { id: "ip",      title: "Drug Innovators",     subtitle: "Own the IP and patient relationship", xCenter: 760, width: 200 },
  { id: "end",     title: "End Market",          subtitle: "Payors and patients",              xCenter: 1010, width: 140 },
];

// Each node lives in one layer. yCenter is in SVG units (viewBox 0..600 tall).
// `mods` = which modalities this entity meaningfully touches (drives filter logic).
export const nodes = [
  // ─── TOOLS & EQUIPMENT (col 1) ─────────────────────────────────
  {
    id: "tmo", layer: "tools", yCenter: 90,
    name: "Thermo Fisher", ticker: "TMO", color: "deepBlue",
    mods: ["bio", "adc", "cgt", "mrna"],
    role: "Diversified life-sciences tools + bioproduction consumables + Patheon CDMO",
    detail: {
      revenue: "~$44.6B (2025)",
      cap: "~$165B",
      hq: "Waltham, MA",
      exposure: "Bioproduction ~25% of group; also clinical research, lab equipment, diagnostics",
      assets: "Patheon (CDMO arm), Gibco media, single-use bioreactors, cell culture",
      relationships: "Sells to virtually every CDMO and pharma — including Lonza, Samsung Bio, WuXi",
      thesis: "Arms-dealer to the biologics manufacturing supercycle. Currently de-rated to ~16.8x fwd P/E despite quality compounder profile.",
    },
  },
  {
    id: "srt", layer: "tools", yCenter: 200,
    name: "Sartorius", ticker: "SRT3.DE", color: "deepBlue",
    mods: ["bio", "adc", "cgt", "mrna"],
    role: "Pure-play bioprocessing — single-use systems, filtration, cell culture",
    detail: {
      revenue: "~€3.4B (2024) — pure bioprocessing",
      cap: "~€16B",
      hq: "Göttingen, Germany",
      exposure: "Bioprocess Solutions ~75% of group; Lab Products & Services ~25%",
      assets: "Single-use bioreactors, Sartoclear filters, Octet bio-layer interferometry",
      relationships: "Equipment baseline at virtually every CDMO and biotech in-house facility",
      thesis: "Cleanest pure-play exposure to biologics manufacturing growth. Premium multiple, but bioproduction destock has bottomed.",
    },
  },
  {
    id: "dhr", layer: "tools", yCenter: 310,
    name: "Danaher", ticker: "DHR", color: "deepBlue",
    mods: ["bio", "adc", "cgt", "mrna"],
    role: "Cytiva + Pall + Beckman + Aldevron — full bioprocessing stack",
    detail: {
      revenue: "~$23.9B (2024)",
      cap: "~$170B",
      hq: "Washington, DC",
      exposure: "Biotechnology + Life Sciences segments ~60% of group; Diagnostics ~30%",
      assets: "Cytiva (formerly GE Healthcare LS), Pall, Beckman Coulter, Aldevron (plasmid DNA)",
      relationships: "Cytiva is a near-monopoly in protein A resins; Aldevron supplies most mRNA/cell & gene developers",
      thesis: "Most diversified bioprocessing platform. DBS operating system + serial M&A track record. Currently in cyclical valuation trough.",
    },
  },
  {
    id: "rgen", layer: "tools", yCenter: 420,
    name: "Repligen", ticker: "RGEN", color: "deepBlue",
    mods: ["bio", "cgt"],
    role: "Specialty consumables — filtration, chromatography, analytics",
    detail: {
      revenue: "~$640M (2024)",
      cap: "~$8B",
      hq: "Waltham, MA",
      exposure: "100% bioprocessing — filtration, chromatography, process analytics",
      assets: "Tangential flow filtration, OPUS columns, Spectrum Plus",
      relationships: "Smaller, more focused exposure — sells to most major CDMOs and biologics innovators",
      thesis: "Pure-play, highest beta to bioprocessing recovery. Smaller scale means less defensive in downturns.",
    },
  },

  // ─── MANUFACTURING (col 2) ─────────────────────────────────
  {
    id: "inhouse", layer: "mfg", yCenter: 80,
    name: "In-house manufacturing", sub: "Roche, Lilly, Novartis, J&J, Pfizer", color: "textSec",
    mods: ["bio", "adc", "mrna"],
    role: "Big Pharma still manufactures most of its own commercial biologics",
    detail: {
      revenue: "n/a — internal cost centre, not service revenue",
      cap: "—",
      hq: "Globally distributed",
      exposure: "Roche/Genentech (until Vacaville sale), Lilly, Pfizer, BMS, AstraZeneca",
      assets: "Captive biologics plants in US, Ireland, Switzerland, Singapore",
      relationships: "These facilities are TMO/Sartorius/Danaher's biggest customer base — far larger than CDMOs in aggregate",
      thesis: "The make-vs-buy decision sits here. Roche divesting Vacaville signals a structural shift toward outsourcing even from the most vertically integrated pharma.",
    },
  },
  {
    id: "lonza", layer: "mfg", yCenter: 200,
    name: "Lonza", ticker: "LONN.SW", color: "capRed",
    mods: ["bio", "adc", "cgt"],
    role: "Pure-play CDMO — biologics, ADCs, cell & gene leadership",
    detail: {
      revenue: "CHF 6.5B (2025, +21.7% CER)",
      cap: "~CHF 37B",
      hq: "Basel, Switzerland",
      exposure: "Integrated Biologics ~55%, Advanced Synthesis (incl. bioconjugates) ~25%, Specialized Modalities ~20%",
      assets: "Visp (CH), Vacaville (US, $1.2bn from Roche), Portsmouth NH, Slough, Singapore, Porriño, Geleen, Oss",
      relationships: "Roche, Vertex (Casgevy), BMS (Synaffix), Moderna, Avidity ($620M 2026-28), bluebird, BigHat",
      thesis: "#1 ADC CDMO globally. Vacaville ramp gives ~10yr revenue visibility. C&G rebounded in Q1'26. Stock at low end of 15-20x EV/EBITDA range.",
    },
  },
  {
    id: "samsung", layer: "mfg", yCenter: 295,
    name: "Samsung Biologics", ticker: "207940.KS", color: "capRed",
    mods: ["bio"],
    role: "Largest mAb capacity globally — pure mammalian focus",
    detail: {
      revenue: "~KRW 4.5T (2024)",
      cap: "~KRW 75T",
      hq: "Incheon, South Korea",
      exposure: "Almost entirely mammalian biologics (mAbs) at very large scale",
      assets: "Plant 1-4 in Incheon Songdo; Plant 5 commissioning (724kL total, largest globally)",
      relationships: "Pfizer, BMS, Roche, Novartis, Eli Lilly — typically the largest single-customer contracts in CDMO",
      thesis: "Pure capacity play with structurally lower cost base than Lonza. Less diversified — limited ADC, no real cell & gene presence.",
    },
  },
  {
    id: "wuxi", layer: "mfg", yCenter: 390,
    name: "WuXi Biologics", ticker: "2269.HK", color: "capRed",
    mods: ["bio", "adc"],
    role: "Largest Chinese CDMO — under BIOSECURE pressure",
    detail: {
      revenue: "~RMB 21B (2024)",
      cap: "~$25B",
      hq: "Shanghai / Hong Kong",
      exposure: "Biologics ~80%, ADCs growing fast via WuXi XDC subsidiary",
      assets: "Wuxi, Shanghai, Hangzhou, Chengdu, Singapore (under construction), Ireland (Dundalk)",
      relationships: "Historically: most US biotech early-phase. BIOSECURE Act forces US clients to migrate or face penalties.",
      thesis: "Structural loser of BIOSECURE / supply-chain decoupling. Migration tailwind for Lonza & Samsung Bio is multi-year.",
    },
  },
  {
    id: "ctlt", layer: "mfg", yCenter: 480,
    name: "Catalent", sub: "Novo Holdings (private since 2024)", color: "capRed",
    mods: ["bio", "mrna", "cgt"],
    role: "Diversified CDMO — fill-finish, drug product, gene therapy",
    detail: {
      revenue: "~$4.2B (2024 before take-private)",
      cap: "Private (taken private at $16.5B EV by Novo Holdings)",
      hq: "Somerset, NJ",
      exposure: "Biologics + Pharma & Consumer Health + Cell, Gene & Other Novel Modalities",
      assets: "Bloomington IN (fill-finish), Anagni IT, Brussels, Madison WI (cell & gene)",
      relationships: "Now primarily serving Novo Nordisk (GLP-1 fill-finish capacity) plus legacy contracts",
      thesis: "Effectively removed as competitive force — Novo has redirected capacity for its own GLP-1 needs. Strategic positive for remaining CDMOs.",
    },
  },

  // ─── DRUG INNOVATORS (col 3) ─────────────────────────────────
  {
    id: "pharma", layer: "ip", yCenter: 90,
    name: "Big Pharma", sub: "Roche, Lilly, Pfizer, BMS, AZ, JNJ, GSK, Novartis", color: "purple",
    mods: ["bio", "adc", "mrna"],
    role: "Established pharma — large pipelines, mixed make-vs-buy strategies",
    detail: {
      revenue: "Top 10 pharma ~$700B aggregate (2024)",
      cap: "~$3T aggregate",
      hq: "US / Europe / Japan dominant",
      exposure: "Increasingly biologic — mAbs, ADCs, biosimilars; some mRNA via Pfizer/BioNTech & Moderna co-development",
      assets: "Mix of large captive plants and growing CDMO outsourcing",
      relationships: "Roche divested Vacaville to Lonza; BMS uses Synaffix linker IP; Pfizer/Seagen ADCs partly with Lonza",
      thesis: "Outsourcing intensity rising as biologic complexity (ADCs, bispecifics) outpaces internal capability investment.",
    },
  },
  {
    id: "biotech_bio", layer: "ip", yCenter: 215,
    name: "Biotech (Biologics)", sub: "Regeneron, Vertex, Amgen, Argenx, BioNTech", color: "purple",
    mods: ["bio"],
    role: "Biologics-native biotechs — typically outsource manufacturing",
    detail: {
      revenue: "Highly variable — Regeneron ~$13B, Vertex ~$11B, BioNTech ~$3B",
      cap: "Highly variable — $20B to $100B+ for the top names",
      hq: "US (Boston/SF/Tarrytown) + German hubs",
      exposure: "Mostly mammalian biologics, increasing modality breadth",
      assets: "Limited captive capacity; some flagship sites (Regeneron Rensselaer NY)",
      relationships: "Primary CDMO customers — Lonza, Samsung Bio, WuXi most common partners",
      thesis: "These customers drive ~30-40% of merchant CDMO demand. Less captive capacity = more reliance on outsourced manufacturing.",
    },
  },
  {
    id: "biotech_cgt", layer: "ip", yCenter: 315,
    name: "Biotech (Cell & Gene)", sub: "Vertex/CRISPR Tx, BMS Juno, bluebird, Gilead Kite", color: "purple",
    mods: ["cgt"],
    role: "Cell & gene therapy developers — manufacturing is the rate-limiter, not the science",
    detail: {
      revenue: "Casgevy still ramping (~$50M YTD), other approved cell therapies $200M-$1B",
      cap: "Wide range; CRISPR Tx ~$5B, bluebird ~$50M (delisted-grade)",
      hq: "Cambridge MA, San Francisco, Switzerland",
      exposure: "Autologous cell therapy (Casgevy, Kymriah, Yescarta), allogeneic, gene editing",
      assets: "Mix of in-house GMP facilities (Vertex Memphis) + CDMO partnerships (Lonza Geleen)",
      relationships: "Vertex-Lonza Casgevy (3rd facility approved); Charles River Memphis; RoslinCT Edinburgh; Bristol/J&J in-house",
      thesis: "Most fragmented manufacturing landscape — autologous economics force decentralized capacity. CDMO opportunity is real but smaller per molecule.",
    },
  },
  {
    id: "biotech_mrna", layer: "ip", yCenter: 415,
    name: "Biotech (mRNA)", sub: "Moderna, BioNTech, CureVac", color: "purple",
    mods: ["mrna"],
    role: "mRNA developers — vaccine + emerging therapeutic applications",
    detail: {
      revenue: "Moderna ~$3B (2024, down from COVID peak); BioNTech ~$3B",
      cap: "Moderna ~$10B, BioNTech ~$25B",
      hq: "Cambridge MA, Mainz Germany",
      exposure: "Vaccines (COVID, RSV, flu), oncology mRNA, rare disease",
      assets: "Moderna Norwood MA, Marlborough; BioNTech Mainz, Marburg",
      relationships: "Moderna-Lonza historical partnership; Aldevron (DHR) primary plasmid supplier; Catalent fill-finish",
      thesis: "Post-COVID normalization complete. New product cycles (combo flu/COVID, oncology) will define next leg of demand for CDMOs.",
    },
  },

  // ─── END MARKET (col 4) ─────────────────────────────────
  {
    id: "patients", layer: "end", yCenter: 230,
    name: "Patients", sub: "Hospitals, clinics, infusion centres", color: "green",
    mods: ["bio", "adc", "cgt", "mrna"],
    role: "Drug recipients — concentrated in specialty/hospital settings for biologics",
    detail: {
      revenue: "n/a — receiving end of value chain",
      cap: "—",
      hq: "—",
      exposure: "Biologics increasingly outpatient infusion; ADCs hospital oncology; cell therapy specialty centres only",
      assets: "—",
      relationships: "Site-of-care economics determine therapy uptake (e.g., infusion centre capacity limits Casgevy ramp)",
      thesis: "Site-of-care concentration is becoming a growth bottleneck for high-complexity therapies, especially cell & gene.",
    },
  },
  {
    id: "payors", layer: "end", yCenter: 360,
    name: "Payors", sub: "PBMs, governments, insurers", color: "green",
    mods: ["bio", "adc", "cgt", "mrna"],
    role: "Where the money originates — drives net pricing for the entire chain",
    detail: {
      revenue: "n/a — pricing power node",
      cap: "—",
      hq: "—",
      exposure: "US (Medicare/Medicaid + commercial), EU (single-payer), Japan, China",
      assets: "—",
      relationships: "IRA negotiation, ICER, NICE — increasing willingness to negotiate biologic pricing",
      thesis: "Net pricing pressure intensifies, but absolute volume growth (biologic share of approvals >70%) more than offsets.",
    },
  },
];

// Flow connections — drawn between adjacent layers
// Each flow tagged with modality (used for filter highlighting)
export const flows = [
  // Tools → Manufacturing (all tools sell to all manufacturers, but with modality emphasis)
  { from: "tmo", to: "inhouse", mods: ["bio","adc","mrna"] },
  { from: "tmo", to: "lonza",   mods: ["bio","adc","cgt"] },
  { from: "tmo", to: "samsung", mods: ["bio"] },
  { from: "tmo", to: "wuxi",    mods: ["bio","adc"] },
  { from: "tmo", to: "ctlt",    mods: ["bio","mrna","cgt"] },
  { from: "srt", to: "inhouse", mods: ["bio","adc","mrna"] },
  { from: "srt", to: "lonza",   mods: ["bio","adc","cgt"] },
  { from: "srt", to: "samsung", mods: ["bio"] },
  { from: "srt", to: "wuxi",    mods: ["bio","adc"] },
  { from: "srt", to: "ctlt",    mods: ["bio","mrna","cgt"] },
  { from: "dhr", to: "inhouse", mods: ["bio","adc","mrna"] },
  { from: "dhr", to: "lonza",   mods: ["bio","adc","cgt"] },
  { from: "dhr", to: "samsung", mods: ["bio"] },
  { from: "dhr", to: "wuxi",    mods: ["bio","adc"] },
  { from: "dhr", to: "ctlt",    mods: ["bio","mrna","cgt"] },
  { from: "rgen", to: "inhouse", mods: ["bio","cgt"] },
  { from: "rgen", to: "lonza",   mods: ["bio","cgt"] },
  { from: "rgen", to: "samsung", mods: ["bio"] },
  { from: "rgen", to: "wuxi",    mods: ["bio"] },
  { from: "rgen", to: "ctlt",    mods: ["bio","cgt"] },

  // Manufacturing → Innovators (these are the "service" flows — CDMOs sell to innovators)
  // In-house is who does it for themselves: only Big Pharma + some Biotech (Biologics)
  { from: "inhouse", to: "pharma",       mods: ["bio","adc","mrna"] },
  { from: "inhouse", to: "biotech_bio",  mods: ["bio"] },
  // Lonza: serves all categories
  { from: "lonza", to: "pharma",        mods: ["bio","adc","cgt"] },
  { from: "lonza", to: "biotech_bio",   mods: ["bio"] },
  { from: "lonza", to: "biotech_cgt",   mods: ["cgt"] },
  { from: "lonza", to: "biotech_mrna",  mods: ["mrna"] },
  // Samsung: biologics only
  { from: "samsung", to: "pharma",       mods: ["bio"] },
  { from: "samsung", to: "biotech_bio",  mods: ["bio"] },
  // WuXi: bio + ADCs
  { from: "wuxi", to: "pharma",       mods: ["bio","adc"] },
  { from: "wuxi", to: "biotech_bio",  mods: ["bio"] },
  // Catalent: bio + mrna + some cell&gene
  { from: "ctlt", to: "pharma",        mods: ["bio","mrna"] },
  { from: "ctlt", to: "biotech_bio",   mods: ["bio"] },
  { from: "ctlt", to: "biotech_mrna",  mods: ["mrna"] },
  { from: "ctlt", to: "biotech_cgt",   mods: ["cgt"] },

  // Innovators → End market (drug product flows to patients, money from payors)
  { from: "pharma",       to: "patients", mods: ["bio","adc","mrna"] },
  { from: "biotech_bio",  to: "patients", mods: ["bio"] },
  { from: "biotech_cgt",  to: "patients", mods: ["cgt"] },
  { from: "biotech_mrna", to: "patients", mods: ["mrna"] },
  { from: "pharma",       to: "payors",   mods: ["bio","adc","mrna"] },
  { from: "biotech_bio",  to: "payors",   mods: ["bio"] },
  { from: "biotech_cgt",  to: "payors",   mods: ["cgt"] },
  { from: "biotech_mrna", to: "payors",   mods: ["mrna"] },
];

// ──────────────────────────────────────────────────────────────────
// Written content for the Key Dynamics tab
// ──────────────────────────────────────────────────────────────────

export const intro = [
  "Biologic drugs — monoclonal antibodies, antibody-drug conjugates, cell and gene therapies, mRNA — now represent more than 70% of new drug approvals. The infrastructure that makes them possible is a tightly interconnected ecosystem of innovators, manufacturers, and tool suppliers, each capturing a distinct slice of the value created.",
  "This page maps that ecosystem. The diagram visualises four layers — picks-and-shovels tool vendors on the left, contract manufacturing in the middle, drug innovators owning the IP, and the end market on the right. The arrows show where money and product flow, and the filters let you isolate a single modality at a time.",
  "The structural question for investors is not which layer is best, but which layer captures the most durable economics. Tool vendors are agnostic to the make-vs-buy decision — they sell equipment whether the drug is manufactured in-house or at a CDMO. CDMOs benefit from the rising outsourcing share. Innovators capture the largest absolute economic rent but bear all the R&D risk. The end market is where pricing pressure lives.",
];

export const dynamics = [
  {
    title: "The picks-and-shovels are the most stable franchise",
    body: "Thermo Fisher, Sartorius, and Danaher (via Cytiva, Pall, Beckman, Aldevron) supply the consumables — bioreactors, media, single-use systems, chromatography resins, plasmid DNA — that every biologic requires. Their TAM is the sum of all in-house and outsourced biologic manufacturing, not either-or. This is the broadest base in the ecosystem, and it is structurally insulated from the make-vs-buy decision that buffets CDMOs.",
  },
  {
    title: "CDMOs are consolidating into a four-name market",
    body: "Lonza, Samsung Biologics, WuXi Biologics, and Catalent historically defined the large-molecule CDMO market. With Catalent absorbed by Novo Holdings (now primarily serving Novo's own GLP-1 fill-finish needs) and WuXi facing BIOSECURE-driven customer migration, the contestable opportunity has collapsed into a two-horse race between Lonza and Samsung Biologics for new commercial-scale biologics business. That is an extraordinary competitive setup for the remaining two.",
  },
  {
    title: "BIOSECURE is the most underappreciated structural shift",
    body: "US legislation restricting government-contract use of Chinese CDMOs (effective Jan 2027 unless delayed) forces US biotechs to migrate manufacturing away from WuXi Biologics. The migration is multi-year — biologic tech transfers take 18-36 months — and the practical effect is a slow-burn tailwind for Lonza and Samsung Biologics, plus a one-off capacity tightness in the interim.",
  },
  {
    title: "ADCs are the single hottest manufacturing pocket",
    body: "Antibody-drug conjugates require three orthogonal capabilities: large-scale mammalian biologics (the antibody), highly potent small-molecule synthesis (the payload and linker), and integrated bioconjugation (combining them safely). Very few players can do all three at commercial scale — Lonza is the clear leader, with WuXi XDC second. Roughly 80% of ADC development and manufacturing is outsourced, the highest outsourcing rate of any modality. Capacity is sold out years in advance.",
  },
  {
    title: "Cell & gene is real but structurally different",
    body: "Autologous cell therapy economics — cells from one patient, processed, returned to the same patient — break the traditional manufacturing scale curve. The result is a highly fragmented landscape of specialised CDMOs (Lonza, Charles River, RoslinCT, in-house Vertex) with smaller per-molecule revenue but very high margins. Casgevy is the lead commercial example. The opportunity is real but smaller in aggregate dollar terms than biologics.",
  },
  {
    title: "Roche's Vacaville divestiture is a signal, not an outlier",
    body: "When Roche sold its 750-employee Vacaville mammalian biologics plant to Lonza for $1.2bn in late 2024, it broke a 40-year norm of Big Pharma keeping commercial-scale biologics in-house. The strategic logic was clean: capacity utilisation problems internally, but a CDMO can run the same asset for multiple customers at higher utilisation. Expect more divestitures from pharma over the next 5 years — every one is incremental TAM for the remaining CDMOs.",
  },
];

export const makeVsBuy = {
  title: "The make-vs-buy economics",
  body: "Big Pharma still manufactures most of its commercial biologics in-house. Roche, Eli Lilly, Pfizer, BMS, AstraZeneca, J&J — all run captive plants that dwarf any single CDMO's footprint. The reason for outsourcing is not capability — it is capacity flexibility and capital efficiency. A pharma company building a $1B greenfield biologic plant carries the full asset and labour overhead even when the program fails or volumes ramp slower than expected. A CDMO can amortise the same asset across multiple customers, achieving higher utilisation and lower unit cost. For modalities where capability gaps exist — ADCs, cell & gene, mRNA — outsourcing is closer to 80%. For mature mAbs, it is closer to 50%. The overall outsourcing rate is currently ~70% and rising.",
};

export const closingThoughts = "The investable conclusion: picks-and-shovels (TMO, Sartorius, Danaher) offer the broadest exposure with the most defensible economics; CDMOs (Lonza, Samsung Biologics) offer levered exposure to the outsourcing tailwind with capacity-cycle risk; innovators offer the largest reward but with single-molecule risk concentration. Position size accordingly.";
