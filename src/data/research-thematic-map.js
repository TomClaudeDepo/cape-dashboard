// Cape Equity Fund — Global Thematic Portfolio Construction Map
// 56 Structural Themes | 10 GICS Sectors | ~160 Companies | March 2026

export const macrodynamics = [
  {
    id: "electrification",
    title: "Electrification & Power",
    short: "Electrification",
    icon: "⚡",
    color: "#F59E0B",
    sectors: 7,
    desc: "Rising electricity demand, grid investment ($5.8T through 2035), energy transition, AI data centre demand reaching 134 GW by 2030",
  },
  {
    id: "ai",
    title: "Digitisation & AI Diffusion",
    short: "AI Diffusion",
    icon: "🧠",
    color: "#818CF8",
    sectors: 8,
    desc: "AI investment and adoption, semiconductor demand, data centre build-out, cyber risk — touches ~8 of 10 sectors",
  },
  {
    id: "demography",
    title: "Demography & Health",
    short: "Demography",
    icon: "🌍",
    color: "#34D399",
    sectors: 6,
    desc: "Population ageing, obesity/chronic disease burden, emerging-market middle-class expansion",
  },
];

export const superThemes = [
  {
    id: "electrification-infra",
    title: "Electrification Infrastructure",
    sectors: 7,
    color: "#F59E0B",
    desc: "Grid spending of $5.8T through 2035, AI data centre demand reaching 134 GW by 2030, and 70% of global transmission lines being 25+ years old collectively drive the largest infrastructure investment cycle since post-WWII electrification.",
    companies: ["SU", "VRT", "ETN", "ABB", "CEG", "NEE", "NGG", "BKR", "LNG", "FCX", "LIN", "BYD", "TSLA"],
  },
  {
    id: "ai-diffusion",
    title: "AI Diffusion",
    sectors: 8,
    color: "#818CF8",
    desc: "AI drives compute demand (IT), drug discovery (Health Care), fraud detection (Financials), predictive maintenance (Industrials), personalised advertising (Comm Services), AI-powered grid management (Utilities), precision agriculture (Materials), and e-commerce personalisation (Consumer Discretionary).",
    companies: ["NVDA", "AVGO", "MSFT", "GOOGL", "PANW", "CRWD", "NOW", "META", "NFLX", "CEG", "LLY"],
  },
  {
    id: "multipolar",
    title: "Multipolar World & Supply-Chain Resilience",
    sectors: 6,
    color: "#EF4444",
    desc: "Reshoring, nearshoring, defence spending, critical mineral sovereignty, and energy security are all manifestations of the same geopolitical fragmentation.",
    companies: ["RHM", "BA.", "RTX", "LNG", "FCX", "TSM", "ASML", "MELI"],
  },
];

export const multiVectorCompounders = [
  { ticker: "SU", name: "Schneider Electric", hq: "France", themes: ["Electrification", "Grid Infrastructure", "Data Centre Power", "Automation", "IoT"] },
  { ticker: "GOOGL", name: "Alphabet", hq: "US", themes: ["AI Advertising", "Cloud Computing", "CTV", "YouTube Streaming", "AI Compute"] },
  { ticker: "CEG", name: "Constellation Energy", hq: "US", themes: ["Data Centre Power", "Nuclear Renaissance", "Regulated Rate Base", "Decarbonisation"] },
  { ticker: "ETN", name: "Eaton Corp", hq: "US/Ireland", themes: ["Grid Infrastructure", "Data Centre Cooling", "Reshoring Capex", "EV Charging"] },
  { ticker: "NESN", name: "Nestlé", hq: "Switzerland", themes: ["Premiumisation", "Pet Economy", "Health/Wellness", "EM Penetration", "Functional Nutrition"] },
  { ticker: "BKR", name: "Baker Hughes", hq: "US", themes: ["DC Gas-to-Power", "LNG Infrastructure", "Energy Technology", "AI Integration"] },
  { ticker: "MSFT", name: "Microsoft", hq: "US", themes: ["Cloud/AI Platform", "Enterprise Software", "Cybersecurity", "Edge Computing"] },
];

export const sectors = [
  {
    id: "it",
    name: "Information Technology",
    short: "IT",
    stocks: 7,
    weight: 25,
    color: "#818CF8",
    colorBg: "rgba(129,140,248,0.08)",
    keyThemes: "AI compute, semis, cloud, cyber, enterprise AI, DC power, edge/IoT",
    themes: [
      {
        name: "AI Compute Infrastructure",
        type: "SECULAR",
        desc: "Hyperscalers deploying massive GPU clusters and custom accelerators. Reasoning models and agentic AI drive compute demand structurally higher.",
        companies: [
          { ticker: "NVDA", name: "NVIDIA", hq: "US", why: "~80% AI accelerator share; Q2 FY26 revenue $46.7B (+56% YoY); CUDA ecosystem; ~73% gross margins" },
          { ticker: "AVGO", name: "Broadcom", hq: "US", why: "AI semiconductor revenue $8.4B (+106% YoY); $73B AI backlog; 6 custom XPU customers" },
          { ticker: "ANET", name: "Arista Networks", hq: "US", why: "AI networking revenue doubling to $3.25B in 2026; 47.5% operating margin" },
        ],
      },
      {
        name: "Semiconductor Foundry & Equipment",
        type: "SECULAR + CYCLICAL",
        desc: "TSMC capex rising 30-37% to $52-56B; global wafer fab equipment spending $135-145B. Advanced packaging expanding 60%+ YoY.",
        companies: [
          { ticker: "TSM", name: "TSMC", hq: "Taiwan", why: "~60% global foundry share; near-monopoly in advanced logic; 62-65% gross margins; ROIC 25%+" },
          { ticker: "ASML", name: "ASML", hq: "Netherlands", why: "100% EUV lithography monopoly; sole High-NA EUV supplier; ~52% gross margins" },
          { ticker: "AMAT", name: "Applied Materials", hq: "US", why: "Broadest deposition/etch portfolio; advanced packaging leadership" },
        ],
      },
      {
        name: "Cloud Computing & AI-as-a-Service",
        type: "SECULAR",
        desc: "Cloud market exceeds $800B, growing 20-25%. GenAI cloud services grew 140-180%.",
        companies: [
          { ticker: "MSFT", name: "Microsoft", hq: "US", why: "Azure +39% YoY; AI revenue run rate ~$13B heading to $25B; 47% operating margin" },
          { ticker: "GOOGL", name: "Alphabet", hq: "US", why: "Google Cloud $12.5B quarterly (+26%); proprietary TPU cost advantages; $80B+ parent FCF" },
        ],
      },
      {
        name: "Cybersecurity Proliferation",
        type: "SECULAR",
        desc: "Market ~$248B growing 12-14% CAGR. AI-powered threats and platform consolidation drive non-discretionary spend.",
        companies: [
          { ticker: "PANW", name: "Palo Alto Networks", hq: "US", why: "Next-Gen Security ARR $5.9B (+29%); platformisation strategy winning" },
          { ticker: "CRWD", name: "CrowdStrike", hq: "US", why: "FY26 revenue $4.81B (+22%); fastest to $5B ARR; 30%+ FCF growth" },
        ],
      },
      {
        name: "Enterprise AI Software",
        type: "SECULAR",
        desc: "AI copilots embedding in 80% of enterprise apps by 2026. Agentic AI moving from pilot to production.",
        companies: [
          { ticker: "NOW", name: "ServiceNow", hq: "US", why: "Subscription revenue +19.5% YoY; 57% FCF margin; AI ACV surpassing $600M" },
          { ticker: "SAP", name: "SAP", hq: "Germany", why: "Cloud revenue growing 25%+; dominant in mission-critical ERP; S/4HANA migration" },
        ],
      },
      {
        name: "Data Centre Power & Cooling",
        type: "SECULAR + CYCLICAL",
        desc: "Data centres projected to require $6.7T cumulative capex by 2030. Liquid cooling now baseline for AI racks.",
        companies: [
          { ticker: "SU", name: "Schneider Electric", hq: "France", why: "Global leader in DC power management; comprehensive UPS/PDU/cooling portfolio" },
          { ticker: "VRT", name: "Vertiv Holdings", hq: "US", why: "Q4 organic orders +252% YoY; $15B backlog; FY26 revenue guided +28%" },
        ],
      },
      {
        name: "Edge Computing & IoT",
        type: "SECULAR",
        desc: "Edge AI processing enables real-time inference at the device level. 5G/6G connectivity enables industrial IoT.",
        companies: [
          { ticker: "CDNS", name: "Cadence Design", hq: "US", why: "EDA + IP for complex chip design; high switching costs" },
          { ticker: "ARM", name: "Arm Holdings", hq: "UK", why: "CPU IP ecosystem powering virtually all mobile/edge devices; royalty model" },
        ],
      },
    ],
  },
  {
    id: "health",
    name: "Health Care",
    short: "Health",
    stocks: 3,
    weight: 14,
    color: "#34D399",
    colorBg: "rgba(52,211,153,0.08)",
    keyThemes: "GLP-1, oncology, medtech, tools/biosimilars, digital health, biotech M&A",
    themes: [
      {
        name: "GLP-1/Obesity Revolution",
        type: "SECULAR",
        desc: "2026 marks the oral GLP-1 inflection. Medicare coverage begins mid-2026. Obesity/diabetes ecosystem expansion is the defining healthcare theme.",
        companies: [
          { ticker: "LLY", name: "Eli Lilly", hq: "US", why: "60.5% US obesity/diabetes market share; revenue guidance $80-83B (+25% YoY)" },
          { ticker: "NVO", name: "Novo Nordisk", hq: "Denmark", why: "GLP-1 pioneer; first-to-market with oral Wegovy pill; valuation compression" },
          { ticker: "DXCM", name: "DexCom", hq: "US", why: "CGM adoption accelerating; companion device to GLP-1 therapy" },
        ],
      },
      {
        name: "Oncology Innovation",
        type: "SECULAR",
        desc: "ADC market projected at $16B by 2030; 180+ ADC programs and 600+ bispecific candidates.",
        companies: [
          { ticker: "AZN", name: "AstraZeneca", hq: "UK", why: "2025 revenue $58.6B; Enhertu ($2.78B, +40%); targeting $80B revenue by 2030" },
          { ticker: "4568", name: "Daiichi Sankyo", hq: "Japan", why: "ADC revolution architect; proprietary DXd platform with 5 clinical-stage ADCs" },
          { ticker: "MRK", name: "Merck & Co.", hq: "US", why: "Immuno-oncology leader (Keytruda); sustained multi-year cashflows" },
        ],
      },
      {
        name: "MedTech & Surgical Robotics",
        type: "SECULAR",
        desc: "Robotic penetration below 10% globally. AI diagnostics and data-driven personalised care increasingly standard.",
        companies: [
          { ticker: "ISRG", name: "Intuitive Surgical", hq: "US", why: "60%+ market share; 11,000+ installed systems; 85% recurring revenue" },
          { ticker: "SYK", name: "Stryker", hq: "US", why: "#1 in orthopedic robotics via Mako (3,000+ systems); 8-9.5% organic growth" },
        ],
      },
      {
        name: "Life-Science Tools & Biosimilars",
        type: "SECULAR + CYCLICAL",
        desc: "Biosimilars market growing from $38-42B to $120-210B by 2034 as $300B of branded biologics lose patent protection.",
        companies: [
          { ticker: "TMO", name: "Thermo Fisher", hq: "US", why: "Consumables/instruments platform; recurring revenue model; global R&D enabler" },
          { ticker: "DHR", name: "Danaher", hq: "US", why: "DBS-driven platform + recurring revenue; life sciences + diagnostics" },
          { ticker: "SDZ", name: "Sandoz Group", hq: "Switzerland", why: "Global #1 biosimilars; $3.29B revenue (+15% CER); 27 pipeline assets" },
        ],
      },
      {
        name: "Digital Health & AI Diagnostics",
        type: "SECULAR",
        desc: "66% of US physicians now use AI tools. FHIR interoperability mandates and cloud migration drive structural IT spending.",
        companies: [
          { ticker: "VEEV", name: "Veeva Systems", hq: "US", why: "Dominant life sciences cloud platform; 40% operating cash flow margin" },
          { ticker: "IQV", name: "IQVIA", hq: "US", why: "World's largest CRO + healthcare data analytics; proprietary datasets" },
        ],
      },
      {
        name: "Biotech & Patent-Cliff Renewal",
        type: "CYCLICAL",
        desc: "$200B+ blockbuster revenue facing patent cliff 2026-2029. Big Pharma holds ~$1T cash for M&A.",
        companies: [
          { ticker: "VRTX", name: "Vertex Pharma", hq: "US", why: "$10B+ CF franchise; suzetrigine (first new non-opioid pain class)" },
          { ticker: "REGN", name: "Regeneron", hq: "US", why: "World-class antibody discovery; Dupixent $14B+ global sales" },
        ],
      },
    ],
  },
  {
    id: "financials",
    name: "Financials",
    short: "Financials",
    stocks: 3,
    weight: 14,
    color: "#60A5FA",
    colorBg: "rgba(96,165,250,0.08)",
    keyThemes: "Alternatives, insurance, payments, capital markets, EM banking, infra/data",
    themes: [
      {
        name: "Alternative Asset Management",
        type: "SECULAR",
        desc: "Democratisation of private markets and institutional allocation increases drive multi-decade growth. Private credit has become a $1.5T+ asset class.",
        companies: [
          { ticker: "BX", name: "Blackstone", hq: "US", why: "$1.275T AUM; 48% in perpetual vehicles; record $239B annual inflows" },
          { ticker: "APO", name: "Apollo Global", hq: "US", why: "~$840B AUM targeting $1.5T by 2029; unique Athene insurance integration" },
          { ticker: "KKR", name: "KKR", hq: "US", why: "AUM surpassing $1.3T (5-year CAGR 24.2%); ~80% recurring fee earnings" },
          { ticker: "BAM", name: "Brookfield AM", hq: "Canada", why: "Real assets + infrastructure + credit; renewable power expertise" },
        ],
      },
      {
        name: "Insurance & Reinsurance",
        type: "CYCLICAL + STRUCTURAL",
        desc: "Six-year hard market driven by climate losses, social inflation, nuclear verdicts.",
        companies: [
          { ticker: "MUV2", name: "Munich Re", hq: "Germany", why: "Record profit; 80% P&C combined ratio; targeting ROE 18%+" },
          { ticker: "CB", name: "Chubb", hq: "US/Switzerland", why: "81-86% combined ratio vs. 96% industry; earnings up 84% over 3 years" },
          { ticker: "ALV", name: "Allianz", hq: "Germany", why: "Diversified P&C + life insurer; global scale" },
        ],
      },
      {
        name: "Digital Payments",
        type: "SECULAR",
        desc: "Multi-decade cash displacement runway. Embedded payments, cross-border digitisation, real-time settlement expand TAM.",
        companies: [
          { ticker: "V", name: "Visa", hq: "US", why: "FY25 net revenue $40B (+11%); dominant network; inflation-resistant model" },
          { ticker: "MA", name: "Mastercard", hq: "US", why: "Revenue +17% YoY; value-added services +25%; operating margin 58.8%" },
          { ticker: "ADYEN", name: "Adyen", hq: "Netherlands", why: "Enterprise merchant acquiring platform; unified commerce; global scale" },
        ],
      },
      {
        name: "Capital Markets & M&A",
        type: "CYCLICAL",
        desc: "Global M&A hit $4.5T in 2025 (+38% YoY). Trading revenues elevated by geopolitical volatility.",
        companies: [
          { ticker: "JPM", name: "JPMorgan Chase", hq: "US", why: "#1 global investment bank; 15%+ CET1 fortress balance sheet" },
          { ticker: "GS", name: "Goldman Sachs", hq: "US", why: "#1 in global M&A league tables (>$1T advised in 2025)" },
          { ticker: "MS", name: "Morgan Stanley", hq: "US", why: "$6.49T client assets; wealth pre-tax margin record 31%" },
        ],
      },
      {
        name: "EM Banking & Digital Penetration",
        type: "SECULAR",
        desc: "India credit-to-GDP ~55% vs. US ~200%. UPI processes 20B transactions monthly.",
        companies: [
          { ticker: "HDB", name: "HDFC Bank", hq: "India", why: "India's largest private bank; ~$135B market cap; premier franchise" },
          { ticker: "IBN", name: "ICICI Bank", hq: "India", why: "ROA >2.3%; clean balance sheet; digital-first strategy" },
        ],
      },
      {
        name: "Market Infrastructure & Data",
        type: "SECULAR",
        desc: "$84T intergenerational wealth transfer drives wealth management platforms. AI-driven risk management adds structural demand.",
        companies: [
          { ticker: "BLK", name: "BlackRock", hq: "US", why: "$11.6T AUM; Aladdin platform; index + alternatives distribution" },
          { ticker: "LSEG", name: "London Stock Exchange", hq: "UK", why: "Trading + data; Refinitiv integration; global financial data platform" },
          { ticker: "ICE", name: "Intercontinental Exchange", hq: "US", why: "Futures + data; mortgage technology platform" },
        ],
      },
    ],
  },
  {
    id: "industrials",
    name: "Industrials",
    short: "Industrials",
    stocks: 5,
    weight: 18,
    color: "#F97316",
    colorBg: "rgba(249,115,22,0.08)",
    keyThemes: "Defence, electrification, automation, aerospace, reshoring, DC construction",
    themes: [
      {
        name: "European Defence Rearmament",
        type: "SECULAR",
        desc: "EU ReArm Europe plan leverages up to €800B+. Germany's 2026 defence budget ~€108B (+25%). Budgets growing 6.8% annually through 2035.",
        companies: [
          { ticker: "RHM", name: "Rheinmetall", hq: "Germany", why: "Europe's largest defence company; FY25 sales €9.9B (+29%); €64B order backlog" },
          { ticker: "BA.", name: "BAE Systems", hq: "UK", why: "Diversified air/sea/land/cyber; ~45% US DoD revenue; record backlog" },
          { ticker: "RTX", name: "RTX (Raytheon)", hq: "US", why: "Pratt & Whitney engines + defence systems; global scale" },
        ],
      },
      {
        name: "Electrification & Grid Supercycle",
        type: "SECULAR",
        desc: "Grid spending $5.8T through 2035. AI data centres add 465 TWh demand by 2030. 70% of global T-lines 25+ years old.",
        companies: [
          { ticker: "SU", name: "Schneider Electric", hq: "France", why: "Global leader in energy management; mid-20s% DC UPS share" },
          { ticker: "ETN", name: "Eaton Corp", hq: "US/Ireland", why: "Data centre orders +70% YoY; $9.5B Boyd Thermal acquisition" },
          { ticker: "ABB", name: "ABB", hq: "Switzerland", why: "Electrification + robotics + automation; global industrial infrastructure" },
        ],
      },
      {
        name: "Factory Automation & Industry 4.0",
        type: "SECULAR",
        desc: "Market ~$54B growing to $94B by 2031. Labour shortages, reshoring, and productivity pressure.",
        companies: [
          { ticker: "6954", name: "FANUC", hq: "Japan", why: "World's largest industrial robot/CNC maker; 30%+ operating margins" },
          { ticker: "SIE", name: "Siemens", hq: "Germany", why: "Global automation leader; Digital Industries + Smart Infrastructure" },
          { ticker: "ROK", name: "Rockwell Automation", hq: "US", why: "Pure-play industrial automation; direct reshoring capex beneficiary" },
        ],
      },
      {
        name: "Aerospace Aftermarket Super-Cycle",
        type: "SECULAR + CYCLICAL",
        desc: "Aftermarket MRO ~$139B; aging fleet (13.4 years average), delivery delays extending fleet lives.",
        companies: [
          { ticker: "GE", name: "GE Aerospace", hq: "US", why: "World's largest jet engine maker; FY25 profit $8.7B (+32%); $190B backlog" },
          { ticker: "SAF", name: "Safran", hq: "France", why: "FY25 revenue €31.3B (+14.7%); propulsion margins 23%; LEAP aftermarket tripling" },
          { ticker: "TDG", name: "TransDigm", hq: "US", why: "90% proprietary products; 52.4% EBITDA margin; sole-source pricing power" },
        ],
      },
      {
        name: "Supply-Chain Reshoring",
        type: "SECULAR",
        desc: "CHIPS Act ($280B), IRA incentives, geopolitical supply chain diversification.",
        companies: [
          { ticker: "DG", name: "Vinci", hq: "France", why: "Infrastructure + concessions model; global construction and engineering scale" },
          { ticker: "J", name: "Jacobs Solutions", hq: "US", why: "Engineering + infrastructure services; grid/water/transport capex exposure" },
        ],
      },
      {
        name: "Data Centre Construction",
        type: "SECULAR",
        desc: "$3T global data centre investment by 2030. AI rack densities surged to 100-150kW.",
        companies: [
          { ticker: "VRT", name: "Vertiv", hq: "US", why: "Pure-play DC power/cooling; record $15B backlog (+109% YoY)" },
        ],
      },
    ],
  },
  {
    id: "consdisc",
    name: "Consumer Discretionary",
    short: "Cons. Disc.",
    stocks: 2,
    weight: 8,
    color: "#EC4899",
    colorBg: "rgba(236,72,153,0.08)",
    keyThemes: "Luxury, e-commerce, experiences, EVs, wellness brands, home improvement",
    themes: [
      {
        name: "Luxury Resilience",
        type: "SECULAR + CYCLICAL",
        desc: "Global personal luxury goods market $484B, returning to 3-5% growth.",
        companies: [
          { ticker: "RMS", name: "Hermès", hq: "France", why: "41.4% operating margin; scarcity model with unmatched pricing power" },
          { ticker: "RACE", name: "Ferrari", hq: "Italy", why: "24% ROIC, 38% EBITDA margin; only 13,663 cars produced; order backlog to 2028" },
          { ticker: "MC", name: "LVMH", hq: "France", why: "Largest luxury portfolio; pricing power + global distribution" },
        ],
      },
      {
        name: "E-Commerce & Digital Logistics",
        type: "SECULAR",
        desc: "Global e-commerce reaching ~$7T. Competition shifting to logistics, AI, and ecosystem integration.",
        companies: [
          { ticker: "AMZN", name: "Amazon", hq: "US", why: "$2.6T market cap; dominant fulfilment infrastructure; AWS + advertising" },
          { ticker: "MELI", name: "MercadoLibre", hq: "Argentina", why: "LatAm dominant e-commerce + fintech; 10-year revenue CAGR ~47%" },
        ],
      },
      {
        name: "Experience Economy & Travel",
        type: "CYCLICAL + SECULAR",
        desc: "Structural shift from goods to experiences. Luxury travel fastest-growing subsegment.",
        companies: [
          { ticker: "BKNG", name: "Booking Holdings", hq: "US", why: "Record Q4: $6.35B revenue; only 16x 2026E earnings; asset-light model" },
          { ticker: "ABNB", name: "Airbnb", hq: "US", why: "Alternative lodging network; global travel platform" },
        ],
      },
      {
        name: "Global EV Transition",
        type: "SECULAR",
        desc: "EVs now >20% of global new car sales. China at ~60% of volume. Battery cost declines enabling affordable models.",
        companies: [
          { ticker: "1211", name: "BYD", hq: "China", why: "World's #1 EV maker; 4.6M NEVs in 2025; vertically integrated" },
          { ticker: "TSLA", name: "Tesla", hq: "US", why: "EV scale + energy storage + software; autonomous driving optionality" },
        ],
      },
      {
        name: "Athletic & Wellness Brands",
        type: "SECULAR",
        desc: "Athleisure market ~$473B growing at 9.4% CAGR.",
        companies: [
          { ticker: "LULU", name: "Lululemon", hq: "Canada", why: "58.3% gross margin; international growth robust" },
          { ticker: "ONON", name: "On Holding", hq: "Switzerland", why: "Fastest-growing premium performance brand; revenue growth consistently >25%" },
        ],
      },
      {
        name: "Home Improvement",
        type: "CYCLICAL + STRUCTURAL",
        desc: "Efficiency retrofits and housing pressures support renovation cycles.",
        companies: [
          { ticker: "HD", name: "Home Depot", hq: "US", why: "DIY/pro contractor scale; renovation beneficiary as rates ease" },
        ],
      },
    ],
  },
  {
    id: "commsvc",
    name: "Communication Services",
    short: "Comm. Svcs",
    stocks: 3,
    weight: 13,
    color: "#A78BFA",
    colorBg: "rgba(167,139,250,0.08)",
    keyThemes: "AI advertising, streaming/gaming, 5G/6G, CTV, creator economy",
    themes: [
      {
        name: "AI-Powered Digital Advertising",
        type: "SECULAR",
        desc: "AI transforming targeting, creative generation, and measurement. Google's Gemini generated 70M creative assets in Q4 2025.",
        companies: [
          { ticker: "GOOGL", name: "Alphabet", hq: "US", why: "FY25 revenue $402.8B; ad revenue $294.7B; $73.3B FCF" },
          { ticker: "META", name: "Meta Platforms", hq: "US", why: "FY25 revenue $201B (+28%); 3.58B daily active people; 41% operating margin" },
        ],
      },
      {
        name: "Streaming & Gaming Profitability",
        type: "CYCLICAL → STRUCTURAL",
        desc: "Streaming pivoted to margin expansion. Ad-supported subs now 57% of sign-ups. Gaming $386B market.",
        companies: [
          { ticker: "NFLX", name: "Netflix", hq: "US", why: "FY25 revenue $45.2B; 29.5% operating margin; 325M+ subscribers" },
          { ticker: "SPOT", name: "Spotify", hq: "Sweden", why: "751M MAUs; first annual net profit; gross margin record 33.1%" },
          { ticker: "0700", name: "Tencent", hq: "China", why: "World's largest gaming company; domestic game revenue +18%; WeChat 1.3B+" },
        ],
      },
      {
        name: "5G/6G Telecom Infrastructure",
        type: "SECULAR",
        desc: "~74% of world online. 5G fixed wireless disrupting cable broadband.",
        companies: [
          { ticker: "TMUS", name: "T-Mobile US", hq: "US", why: "Industry-best ~9% service revenue growth; 6.4M+ broadband customers" },
          { ticker: "DTE", name: "Deutsche Telekom", hq: "Germany", why: "Europe's largest telecom; majority T-Mobile US owner (~48.4% stake)" },
          { ticker: "BHARTIARTL", name: "Bharti Airtel", hq: "India", why: "India mobile data growth; 5G rollout beneficiary" },
        ],
      },
      {
        name: "Interactive Entertainment",
        type: "SECULAR",
        desc: "$386B market growing at 12.5% CAGR. AI integration in development.",
        companies: [
          { ticker: "TTWO", name: "Take-Two Interactive", hq: "US", why: "GTA, NBA 2K franchises; GTA VI among largest entertainment launches ever" },
          { ticker: "7974", name: "Nintendo", hq: "Japan", why: "Console + IP model; franchise longevity; Switch 2 launch cycle" },
        ],
      },
      {
        name: "CTV & Creator Economy",
        type: "SECULAR",
        desc: "US CTV spending projected at $37.95B (+14.5%). Creator economy $200-250B+ globally.",
        companies: [
          { ticker: "RBLX", name: "Roblox", hq: "US", why: "FY25 revenue $4.9B (+36%); 137M+ DAUs (+69%); 18+ cohort growing >50%" },
        ],
      },
    ],
  },
  {
    id: "energy",
    name: "Energy",
    short: "Energy",
    stocks: 0,
    weight: 0,
    color: "#F59E0B",
    colorBg: "rgba(245,158,11,0.08)",
    keyThemes: "LNG/security, discipline, gas-to-power, CCUS/hydrogen, nuclear, OFS",
    themes: [
      {
        name: "LNG Supercycle & Energy Security",
        type: "SECULAR",
        desc: "Global LNG demand ~441 MTPA in 2026 (+8.5%). European phaseout of Russian gas by Nov 2027.",
        companies: [
          { ticker: "LNG", name: "Cheniere Energy", hq: "US", why: "Largest US LNG exporter; stock up 50%+ YTD; 95%+ contracted" },
          { ticker: "TTE", name: "TotalEnergies", hq: "France", why: "3rd-largest global LNG player; 70%+ LNG cash flow growth by 2030" },
          { ticker: "SHEL", name: "Shell", hq: "UK", why: "Global LNG portfolio + trading expertise; integrated cashflows" },
        ],
      },
      {
        name: "Capital Discipline & Returns",
        type: "CYCLICAL + STRUCTURAL",
        desc: "Majors returning >40% of operating cash flows. Sub-$40/bbl breakevens across top producers.",
        companies: [
          { ticker: "XOM", name: "ExxonMobil", hq: "US", why: "Returned $36B+ to shareholders; Guyana >900K bpd; lowest-cost portfolio" },
          { ticker: "COP", name: "ConocoPhillips", hq: "US", why: "Largest pure-play E&P; 2026 production 2.23-2.26 Mbpd; sub-$40 breakeven" },
        ],
      },
      {
        name: "AI/DC Power & Gas-to-Power",
        type: "SECULAR",
        desc: "US data centre demand reaching 75.8 GW. Natural gas at 42% of US power generation.",
        companies: [
          { ticker: "BKR", name: "Baker Hughes", hq: "US", why: "$35.9B record backlog; IET segment 20% EBITDA margin; 1.2 GW DC power booked" },
        ],
      },
      {
        name: "Hydrogen & Carbon Capture",
        type: "SECULAR",
        desc: "CCUS market projected at 30% CAGR from $3.5B to $22B by 2033.",
        companies: [
          { ticker: "OXY", name: "Occidental Petroleum", hq: "US", why: "STRATOS (world's largest DAC plant) on track for 2026 commercial operations" },
        ],
      },
      {
        name: "Nuclear Power Renaissance",
        type: "SECULAR",
        desc: "~15 reactors expected online globally in 2026. Clean baseload capacity complements renewables.",
        companies: [
          { ticker: "CCJ", name: "Cameco", hq: "Canada", why: "World's largest publicly traded uranium producer; supply-constrained market" },
        ],
      },
      {
        name: "Oilfield Services & Offshore",
        type: "CYCLICAL",
        desc: "Subsea spending exceeding $35B/year. Offshore FIDs $107B in 2026.",
        companies: [
          { ticker: "SLB", name: "SLB", hq: "US", why: "World's largest OFS company; $4B+ shareholder returns for 2026" },
        ],
      },
    ],
  },
  {
    id: "materials",
    name: "Materials",
    short: "Materials",
    stocks: 2,
    weight: 6,
    color: "#FB923C",
    colorBg: "rgba(251,146,60,0.08)",
    keyThemes: "Copper, industrial gases, specialty chemicals, lithium, building materials, gold",
    themes: [
      {
        name: "Copper Supercycle",
        type: "SECULAR",
        desc: "Demand swelling to 42Mt by 2040 with 10Mt supply shortfall. New mines take 20-30 years.",
        companies: [
          { ticker: "FCX", name: "Freeport-McMoRan", hq: "US", why: "World's largest publicly traded copper producer; innovative leaching technology" },
          { ticker: "BHP", name: "BHP Group", hq: "Australia", why: "Operates Escondida (world's largest copper mine); 1.8-2.0Mt target" },
          { ticker: "RIO", name: "Rio Tinto", hq: "UK", why: "Copper/aluminium scale; diversified mining; critical minerals exposure" },
        ],
      },
      {
        name: "Industrial Gases",
        type: "SECULAR",
        desc: "$120-126B market growing 5-6% CAGR. Oligopolistic structure (top 3 control 75-80%).",
        companies: [
          { ticker: "LIN", name: "Linde", hq: "Ireland", why: "World's #1; ~$210-227B cap; 20.3% profit margin; ROIC ~17.8%" },
          { ticker: "AI", name: "Air Liquide", hq: "France", why: "#2 globally; 40+ consecutive years of dividend increases" },
        ],
      },
      {
        name: "Specialty Chemicals",
        type: "CYCLICAL + STRUCTURAL",
        desc: "Electronics materials booming on AI/semiconductor buildout.",
        companies: [
          { ticker: "SHW", name: "Sherwin-Williams", hq: "US", why: "Largest US architectural paint; 4,800+ owned stores; pricing power" },
          { ticker: "4063", name: "Shin-Etsu Chemical", hq: "Japan", why: "Semiconductor-grade materials; specialty chemistry for advanced nodes" },
        ],
      },
      {
        name: "Battery Materials & Lithium",
        type: "SECULAR + CYCLICAL",
        desc: "Lithium rebounded ~85% from 2025 lows. BESS demand for lithium jumped 71%.",
        companies: [
          { ticker: "ALB", name: "Albemarle", hq: "US", why: "World's largest lithium producer; top-tier assets (Atacama, Greenbushes)" },
          { ticker: "MP", name: "MP Materials", hq: "US", why: "Only active US rare earth mine; DoD 15% stake" },
        ],
      },
      {
        name: "Building Materials & Green Steel",
        type: "SECULAR",
        desc: "Decarbonisation of heavy industry: cement is a key abatement target.",
        companies: [
          { ticker: "HOLN", name: "Holcim", hq: "Switzerland", why: "Low-carbon cement/solutions pivot; circular construction leader" },
          { ticker: "CRH", name: "CRH", hq: "Ireland", why: "Aggregates/asphalt + pricing power; infrastructure beneficiary" },
          { ticker: "NUE", name: "Nucor", hq: "US", why: "EAF steel recycling model; lowest-cost US steel; reshoring beneficiary" },
        ],
      },
      {
        name: "Gold & Precious Metals",
        type: "STRUCTURAL + CYCLICAL",
        desc: "Central bank buying ~585t/quarter. De-dollarisation and geopolitical risk drive structural bid.",
        companies: [
          { ticker: "NEM", name: "Newmont", hq: "US", why: "World's largest gold miner; 31.3% profit margin" },
          { ticker: "AEM", name: "Agnico Eagle", hq: "Canada", why: "Premier quality miner; 30%+ ROIC at current prices; Tier-1 assets" },
        ],
      },
    ],
  },
  {
    id: "consstap",
    name: "Consumer Staples",
    short: "Cons. Staples",
    stocks: 0,
    weight: 0,
    color: "#10B981",
    colorBg: "rgba(16,185,129,0.08)",
    keyThemes: "Premiumisation, EM consumer, health/wellness, pet economy, value retail",
    themes: [
      {
        name: "Premiumisation in F&B",
        type: "SECULAR",
        desc: "Premium spirits projected to nearly double to $951B by 2030.",
        companies: [
          { ticker: "NESN", name: "Nestlé", hq: "Switzerland", why: "World's largest food company; premium coffee, health science, pet care" },
          { ticker: "RI", name: "Pernod Ricard", hq: "France", why: "27% operating margin vs. 12.1% industry; premium-or-exit strategy" },
          { ticker: "DGE", name: "Diageo", hq: "UK", why: "Premium spirits portfolio; global distribution scale; pricing power" },
        ],
      },
      {
        name: "EM Consumer Growth",
        type: "SECULAR",
        desc: "India GDP growth 7.5% in 2026. Middle-class expansion in India, Africa, Southeast Asia.",
        companies: [
          { ticker: "ULVR", name: "Unilever", hq: "UK", why: "58% EM revenue; targeting US+India from 33% to 45% of sales" },
          { ticker: "CL", name: "Colgate-Palmolive", hq: "US", why: "Global oral care #1; EM organic sales +4.5%; 60.1% gross margins" },
        ],
      },
      {
        name: "Health & Functional Nutrition",
        type: "SECULAR",
        desc: "45% of consumers prioritise nutrition over price. Gen Z/Millennials pay 20-30% premiums for clean label.",
        companies: [
          { ticker: "BN", name: "Danone", hq: "France", why: "Pure-play health food: #1 dairy/plant-based, #2 specialised nutrition" },
        ],
      },
      {
        name: "Pet Humanisation Economy",
        type: "SECULAR",
        desc: "Global pet care $273B, projected $497B by 2034. 94M US households own pets.",
        companies: [
          { ticker: "NESN", name: "Nestlé (Purina)", hq: "Switzerland", why: "World's #2 pet food; brands span mass to super-premium" },
        ],
      },
      {
        name: "Value Retail & Private Label",
        type: "CYCLICAL + STRUCTURAL",
        desc: "US private label hit record $282.8B (+3.3%); 53% of consumers choose private label predominantly.",
        companies: [
          { ticker: "COST", name: "Costco", hq: "US", why: "Kirkland Signature dominance; 92.7% US renewal rate; 79.6M paid households" },
          { ticker: "WMT", name: "Walmart", hq: "US", why: "FY26 revenue >$713B; global e-commerce +24%; private label in >50% of US households" },
        ],
      },
    ],
  },
  {
    id: "utilities",
    name: "Utilities",
    short: "Utilities",
    stocks: 1,
    weight: 2,
    color: "#14B8A6",
    colorBg: "rgba(20,184,166,0.08)",
    keyThemes: "DC power, grid/smart grid, nuclear, renewables/storage, rate base, water",
    themes: [
      {
        name: "AI Data Centre Power Demand",
        type: "SECULAR",
        desc: "Hyperscalers signing multi-billion, long-dated PPAs. Load growth at 2-3% annually vs. near-zero in 2005-2019.",
        companies: [
          { ticker: "CEG", name: "Constellation Energy", hq: "US", why: "Largest US nuclear fleet (32.4 GW nuclear, 55 GW total); 20-year PPAs" },
          { ticker: "AEP", name: "American Electric Power", hq: "US", why: "Nation's largest transmission system (40,000 miles); 18 GW committed DC demand" },
        ],
      },
      {
        name: "Grid Modernisation & Smart Grids",
        type: "SECULAR",
        desc: "$5.8T global grid investment forecast 2026-2035. 70% of US power transformers 25+ years old.",
        companies: [
          { ticker: "NGG", name: "National Grid", hq: "UK/US", why: "Pure-play T&D; £70B+ investment plan to FY31; ~10% asset growth CAGR" },
          { ticker: "IBE", name: "Iberdrola", hq: "Spain", why: "World's second-largest utility (>€135B cap); €47B capex plan" },
        ],
      },
      {
        name: "Nuclear Renaissance",
        type: "SECULAR",
        desc: "~15 reactors expected online globally in 2026. US executive orders mandate SMR deployment.",
        companies: [
          { ticker: "CEG", name: "Constellation Energy", hq: "US", why: "Restarting Crane Clean Energy Center (TMI) with Microsoft PPA" },
          { ticker: "SO", name: "Southern Company", hq: "US", why: "Only US utility with new-build nuclear experience (Vogtle 3&4)" },
        ],
      },
      {
        name: "Renewable Integration & Storage",
        type: "SECULAR",
        desc: "Solar/wind share rising from 17% to 27% by 2030.",
        companies: [
          { ticker: "NEE", name: "NextEra Energy", hq: "US", why: "Largest US electric utility ($174B cap); largest NA clean energy developer" },
          { ticker: "IBE", name: "Iberdrola", hq: "Spain", why: "World's largest wind operator (45,263 MW); 12B for ~12 GW new renewables" },
        ],
      },
      {
        name: "Regulated Rate Base Growth",
        type: "STRUCTURAL",
        desc: "After decade of flat load, US electricity demand grows ~2%+. 6-10% rate base CAGRs.",
        companies: [
          { ticker: "DUK", name: "Duke Energy", hq: "US", why: "$100B+ 5-year capex plan; multi-year rate plan mechanism" },
          { ticker: "NEE", name: "NextEra Energy", hq: "US", why: "Florida Power & Light serves 12M+ in fastest-growing large US state" },
        ],
      },
      {
        name: "Water & Climate Resilience",
        type: "SECULAR",
        desc: "Water scarcity and SDG gaps persist. Regulated investment cycles and essential-service demand.",
        companies: [
          { ticker: "AWK", name: "American Water Works", hq: "US", why: "Regulated water; infrastructure investment needs; essential service" },
        ],
      },
    ],
  },
];

export const illustrativePortfolio = [
  { sector: "Info Tech", s1: { t: "NVDA", l: "AI compute" }, s2: { t: "MSFT", l: "cloud + AI" }, s3: { t: "ASML", l: "semi equip." } },
  { sector: "Health Care", s1: { t: "LLY", l: "GLP-1" }, s2: { t: "AZN", l: "oncology/ADCs" }, s3: { t: "ISRG", l: "medtech robotics" } },
  { sector: "Financials", s1: { t: "BX", l: "alternatives" }, s2: { t: "V", l: "payments" }, s3: { t: "HDB", l: "EM banking" } },
  { sector: "Industrials", s1: { t: "SU", l: "electrification" }, s2: { t: "SAF", l: "aerospace" }, s3: { t: "RHM", l: "defence" } },
  { sector: "Cons. Disc.", s1: { t: "BKNG", l: "experience" }, s2: { t: "MELI", l: "EM e-comm" }, s3: { t: "RMS", l: "luxury" } },
  { sector: "Cons. Staples", s1: { t: "NESN", l: "premium+pet" }, s2: { t: "COST", l: "value retail" }, s3: null },
  { sector: "Energy", s1: { t: "LNG", l: "LNG" }, s2: { t: "XOM", l: "discipline+CCS" }, s3: null },
  { sector: "Materials", s1: { t: "LIN", l: "ind. gases" }, s2: { t: "FCX", l: "copper" }, s3: { t: "NEM", l: "gold" } },
  { sector: "Comm. Svcs", s1: { t: "GOOGL", l: "AI ads+cloud" }, s2: { t: "NFLX", l: "streaming" }, s3: null },
  { sector: "Utilities", s1: { t: "CEG", l: "nuclear+DC" }, s2: { t: "NEE", l: "renewables" }, s3: null },
];

export const geoBreakdown = [
  { region: "United States", weight: "55-60%", color: "#60A5FA" },
  { region: "Europe", weight: "25-30%", color: "#818CF8" },
  { region: "Asia-Pacific", weight: "10%", color: "#34D399" },
  { region: "Emerging Markets", weight: "5-10%", color: "#F59E0B" },
];

// Logo URL helper — uses Clearbit for clean company logos
export function logoUrl(ticker, name) {
  const domainMap = {
    "NVDA": "nvidia.com", "AVGO": "broadcom.com", "ANET": "arista.com",
    "TSM": "tsmc.com", "ASML": "asml.com", "AMAT": "appliedmaterials.com",
    "MSFT": "microsoft.com", "GOOGL": "google.com",
    "PANW": "paloaltonetworks.com", "CRWD": "crowdstrike.com",
    "NOW": "servicenow.com", "SAP": "sap.com",
    "SU": "se.com", "VRT": "vertiv.com",
    "CDNS": "cadence.com", "ARM": "arm.com",
    "LLY": "lilly.com", "NVO": "novonordisk.com", "DXCM": "dexcom.com",
    "AZN": "astrazeneca.com", "MRK": "merck.com",
    "ISRG": "intuitive.com", "SYK": "stryker.com",
    "TMO": "thermofisher.com", "DHR": "danaher.com", "SDZ": "sandoz.com",
    "VEEV": "veeva.com", "IQV": "iqvia.com",
    "VRTX": "vrtx.com", "REGN": "regeneron.com",
    "BX": "blackstone.com", "APO": "apollo.com", "KKR": "kkr.com", "BAM": "brookfield.com",
    "MUV2": "munichre.com", "CB": "chubb.com", "ALV": "allianz.com",
    "V": "visa.com", "MA": "mastercard.com", "ADYEN": "adyen.com",
    "JPM": "jpmorganchase.com", "GS": "goldmansachs.com", "MS": "morganstanley.com",
    "HDB": "hdfcbank.com", "IBN": "icicibank.com",
    "BLK": "blackrock.com", "LSEG": "lseg.com", "ICE": "ice.com",
    "RHM": "rheinmetall.com", "BA.": "baesystems.com", "RTX": "rtx.com",
    "ETN": "eaton.com", "ABB": "abb.com",
    "6954": "fanuc.com", "SIE": "siemens.com", "ROK": "rockwellautomation.com",
    "GE": "geaerospace.com", "SAF": "safran-group.com", "TDG": "transdigm.com",
    "DG": "vinci.com", "J": "jacobs.com",
    "RMS": "hermes.com", "RACE": "ferrari.com", "MC": "lvmh.com",
    "AMZN": "amazon.com", "MELI": "mercadolibre.com",
    "BKNG": "booking.com", "ABNB": "airbnb.com",
    "1211": "byd.com", "TSLA": "tesla.com",
    "LULU": "lululemon.com", "ONON": "on-running.com",
    "HD": "homedepot.com",
    "META": "meta.com", "NFLX": "netflix.com", "SPOT": "spotify.com",
    "0700": "tencent.com",
    "TMUS": "t-mobile.com", "DTE": "telekom.com", "BHARTIARTL": "airtel.in",
    "TTWO": "take2games.com", "7974": "nintendo.com",
    "RBLX": "roblox.com",
    "LNG": "cheniere.com", "TTE": "totalenergies.com", "SHEL": "shell.com",
    "XOM": "exxonmobil.com", "COP": "conocophillips.com",
    "BKR": "bakerhughes.com", "OXY": "oxy.com",
    "CCJ": "cameco.com", "SLB": "slb.com",
    "FCX": "fcx.com", "BHP": "bhp.com", "RIO": "riotinto.com",
    "LIN": "linde.com", "AI": "airliquide.com",
    "SHW": "sherwin-williams.com", "4063": "shinetsu.co.jp",
    "ALB": "albemarle.com", "MP": "mpmaterials.com",
    "HOLN": "holcim.com", "CRH": "crh.com", "NUE": "nucor.com",
    "NEM": "newmont.com", "AEM": "agnicoeagle.com",
    "NESN": "nestle.com", "RI": "pernod-ricard.com", "DGE": "diageo.com",
    "ULVR": "unilever.com", "CL": "colgate.com",
    "BN": "danone.com", "COST": "costco.com", "WMT": "walmart.com",
    "CEG": "constellationenergy.com", "AEP": "aep.com",
    "NGG": "nationalgrid.com", "IBE": "iberdrola.com",
    "SO": "southerncompany.com", "NEE": "nexteraenergy.com",
    "DUK": "duke-energy.com", "AWK": "amwater.com",
    "4568": "daiichisankyo.com",
  };
  const domain = domainMap[ticker];
  if (domain) return `https://logo.clearbit.com/${domain}?size=80`;
  return null;
}
