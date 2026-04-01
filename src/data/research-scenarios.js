/* ─── Narrative → Portfolio Impact Map ───
   30 narratives, each impacting ≥5 of the 26 holdings.
   Direction: +1 = tailwind, -1 = headwind, 0 = mixed/ambiguous
   Updated: April 2026
*/

export const HOLDINGS = [
  { t: "NVDA", n: "Nvidia", s: "IT", co: "US" },
  { t: "TSMC", n: "Taiwan Semi", s: "IT", co: "TW" },
  { t: "AVGO", n: "Broadcom", s: "IT", co: "US" },
  { t: "MSFT", n: "Microsoft", s: "IT", co: "US" },
  { t: "GOOGL", n: "Alphabet", s: "Comm", co: "US" },
  { t: "AMZN", n: "Amazon", s: "Disc", co: "US" },
  { t: "NOW", n: "ServiceNow", s: "IT", co: "US" },
  { t: "GLW", n: "Corning", s: "IT", co: "US" },
  { t: "005930", n: "Samsung", s: "IT", co: "KR" },
  { t: "NFLX", n: "Netflix", s: "Comm", co: "US" },
  { t: "JPM", n: "JP Morgan", s: "Fin", co: "US" },
  { t: "ICE", n: "ICE", s: "Fin", co: "US" },
  { t: "MSCI", n: "MSCI", s: "Fin", co: "US" },
  { t: "6501", n: "Hitachi", s: "Ind", co: "JP" },
  { t: "SIE", n: "Siemens", s: "Ind", co: "DE" },
  { t: "VOLV", n: "Volvo", s: "Ind", co: "SE" },
  { t: "EPI", n: "Epiroc", s: "Ind", co: "SE" },
  { t: "ROK", n: "Rockwell", s: "Ind", co: "US" },
  { t: "AI", n: "Air Liquide", s: "Mat", co: "FR" },
  { t: "AKZA", n: "Akzo Nobel", s: "Mat", co: "NL" },
  { t: "9988", n: "Alibaba", s: "Disc", co: "CN" },
  { t: "0700", n: "Tencent", s: "Comm", co: "CN" },
  { t: "NOVN", n: "Novartis", s: "HC", co: "CH" },
  { t: "PFE", n: "Pfizer", s: "HC", co: "US" },
  { t: "TMO", n: "Thermo Fisher", s: "HC", co: "US" },
  { t: "VIE", n: "Veolia", s: "Util", co: "FR" },
];

export const CATS = [
  { id: "geo", label: "Geopolitics & Energy", color: "#e74c3c" },
  { id: "rates", label: "Rates & Monetary", color: "#3498db" },
  { id: "infl", label: "Inflation Path", color: "#e67e22" },
  { id: "ai", label: "AI / Technology", color: "#9b59b6" },
  { id: "mkt", label: "Market Structure", color: "#1abc9c" },
  { id: "macro", label: "Macro / Structural", color: "#7f8c8d" },
  { id: "credit", label: "Credit & Stability", color: "#c0392b" },
  { id: "sector", label: "Sector-Specific", color: "#2ecc71" },
];

export const NARRATIVES = [
  {
    id: 1, cat: "geo", name: "Hormuz escalation / $150 oil",
    desc: "Strait closure drags into summer, scarcity pricing in diesel/jet fuel, global recession risk rises sharply.",
    hits: [
      { t: "VOLV", d: -1 }, { t: "SIE", d: -1 }, { t: "AI", d: -1 }, { t: "AKZA", d: -1 },
      { t: "VIE", d: -1 }, { t: "EPI", d: 0 }, { t: "9988", d: -1 }, { t: "0700", d: -1 },
    ],
  },
  {
    id: 2, cat: "geo", name: "Hormuz reopening / ceasefire trade",
    desc: "Strait reopens, Brent collapses back to $70–80, massive rotation out of energy/defense into beaten-down growth.",
    hits: [
      { t: "VOLV", d: 1 }, { t: "SIE", d: 1 }, { t: "AI", d: 1 }, { t: "AKZA", d: 1 },
      { t: "VIE", d: 1 }, { t: "9988", d: 1 }, { t: "0700", d: 1 }, { t: "AMZN", d: 1 },
    ],
  },
  {
    id: 3, cat: "geo", name: "US-China tariff escalation",
    desc: "New rounds of tariffs or export controls hit supply chains, particularly semiconductors and consumer goods.",
    hits: [
      { t: "NVDA", d: -1 }, { t: "TSMC", d: -1 }, { t: "AVGO", d: -1 }, { t: "005930", d: -1 },
      { t: "9988", d: -1 }, { t: "0700", d: -1 }, { t: "AMZN", d: -1 },
    ],
  },
  {
    id: 4, cat: "geo", name: "Nearshoring / friendshoring acceleration",
    desc: "Supply chain diversification benefits industrials and infrastructure plays.",
    hits: [
      { t: "SIE", d: 1 }, { t: "6501", d: 1 }, { t: "ROK", d: 1 }, { t: "VOLV", d: 1 },
      { t: "EPI", d: 1 },
    ],
  },
  {
    id: 5, cat: "geo", name: "Taiwan Strait risk re-pricing",
    desc: "Markets start pricing chokepoint/invasion risk more seriously after Hormuz precedent.",
    hits: [
      { t: "TSMC", d: -1 }, { t: "NVDA", d: -1 }, { t: "AVGO", d: -1 }, { t: "005930", d: 0 },
      { t: "MSFT", d: -1 }, { t: "GOOGL", d: -1 },
    ],
  },
  {
    id: 6, cat: "rates", name: "Fed rate cuts (2–3x in H2 2026)",
    desc: "Inflation fades, Fed cuts multiple times in H2, duration rally, growth outperforms value.",
    hits: [
      { t: "MSFT", d: 1 }, { t: "GOOGL", d: 1 }, { t: "AMZN", d: 1 }, { t: "NOW", d: 1 },
      { t: "NFLX", d: 1 }, { t: "NVDA", d: 1 }, { t: "MSCI", d: 1 }, { t: "ICE", d: 1 },
      { t: "JPM", d: 0 }, { t: "AVGO", d: 1 },
    ],
  },
  {
    id: 7, cat: "rates", name: "Fed on hold indefinitely",
    desc: "Inflation too hot to cut, growth too strong to hike. ‘Higher for longer’ kills rate-sensitive sectors.",
    hits: [
      { t: "NOW", d: -1 }, { t: "MSCI", d: -1 }, { t: "MSFT", d: -1 }, { t: "AMZN", d: -1 },
      { t: "NFLX", d: 0 }, { t: "JPM", d: 1 }, { t: "ICE", d: 0 },
    ],
  },
  {
    id: 8, cat: "rates", name: "Yield curve steepening",
    desc: "Long end sells off on fiscal concerns, short end anchored. Banks benefit, growth de-rates.",
    hits: [
      { t: "JPM", d: 1 }, { t: "ICE", d: 1 }, { t: "MSCI", d: 0 }, { t: "NOW", d: -1 },
      { t: "MSFT", d: -1 }, { t: "NVDA", d: -1 },
    ],
  },
  {
    id: 9, cat: "infl", name: "Stagflation redux",
    desc: "Oil shock feeds into sticky core inflation while growth slows. 1970s comparisons intensify.",
    hits: [
      { t: "VOLV", d: -1 }, { t: "SIE", d: -1 }, { t: "AI", d: -1 }, { t: "AKZA", d: -1 },
      { t: "AMZN", d: -1 }, { t: "9988", d: -1 }, { t: "ROK", d: -1 }, { t: "EPI", d: -1 },
    ],
  },
  {
    id: 10, cat: "infl", name: "Disinflation resumes / goldilocks",
    desc: "Oil shock proves transitory, services inflation fades. Perfect environment for risk assets.",
    hits: [
      { t: "MSFT", d: 1 }, { t: "GOOGL", d: 1 }, { t: "AMZN", d: 1 }, { t: "NVDA", d: 1 },
      { t: "NOW", d: 1 }, { t: "NFLX", d: 1 }, { t: "MSCI", d: 1 },
    ],
  },
  {
    id: 11, cat: "infl", name: "Second-wave inflation (CPI 4%+)",
    desc: "Oil + tariffs + wage growth re-accelerate CPI. 2022 PTSD returns, central banks frozen.",
    hits: [
      { t: "NOW", d: -1 }, { t: "MSFT", d: -1 }, { t: "AMZN", d: -1 }, { t: "NFLX", d: -1 },
      { t: "AKZA", d: -1 }, { t: "AI", d: -1 }, { t: "VOLV", d: -1 },
    ],
  },
  {
    id: 12, cat: "ai", name: "AI monetisation proof",
    desc: "Hyperscalers show real revenue from AI products, earnings beats justify capex. Rally broadens from chips to software.",
    hits: [
      { t: "MSFT", d: 1 }, { t: "GOOGL", d: 1 }, { t: "AMZN", d: 1 }, { t: "NVDA", d: 1 },
      { t: "AVGO", d: 1 }, { t: "TSMC", d: 1 }, { t: "NOW", d: 1 }, { t: "005930", d: 1 },
      { t: "GLW", d: 1 }, { t: "6501", d: 1 },
    ],
  },
  {
    id: 13, cat: "ai", name: "AI capex disappointment",
    desc: "ROI skepticism grows, capex guidance cut. Echoes of 2000 telecom overbuild narrative.",
    hits: [
      { t: "NVDA", d: -1 }, { t: "AVGO", d: -1 }, { t: "TSMC", d: -1 }, { t: "005930", d: -1 },
      { t: "GLW", d: -1 }, { t: "MSFT", d: 0 }, { t: "GOOGL", d: 0 }, { t: "AMZN", d: 0 },
      { t: "6501", d: -1 },
    ],
  },
  {
    id: 14, cat: "ai", name: "AI disruption of legacy software",
    desc: "Agents replace SaaS tools, massive TAM destruction for incumbent enterprise software.",
    hits: [
      { t: "NOW", d: -1 }, { t: "MSCI", d: -1 }, { t: "ICE", d: 0 }, { t: "MSFT", d: 0 },
      { t: "GOOGL", d: 1 },
    ],
  },
  {
    id: 15, cat: "ai", name: "AI infrastructure / power demand",
    desc: "Data center power + cooling + connectivity demand drives re-rating across infrastructure names.",
    hits: [
      { t: "NVDA", d: 1 }, { t: "TSMC", d: 1 }, { t: "AVGO", d: 1 }, { t: "GLW", d: 1 },
      { t: "005930", d: 1 }, { t: "6501", d: 1 }, { t: "SIE", d: 1 },
    ],
  },
  {
    id: 16, cat: "ai", name: "Semiconductor cycle downturn",
    desc: "Inventory correction post-AI build, memory pricing weakens, equipment orders slow.",
    hits: [
      { t: "NVDA", d: -1 }, { t: "TSMC", d: -1 }, { t: "AVGO", d: -1 }, { t: "005930", d: -1 },
      { t: "GLW", d: -1 },
    ],
  },
  {
    id: 17, cat: "mkt", name: "Broadening rally / equal-weight leads",
    desc: "Earnings growth extends beyond Mag7, mid-caps and non-US outperform.",
    hits: [
      { t: "SIE", d: 1 }, { t: "VOLV", d: 1 }, { t: "EPI", d: 1 }, { t: "ROK", d: 1 },
      { t: "6501", d: 1 }, { t: "AKZA", d: 1 }, { t: "VIE", d: 1 }, { t: "PFE", d: 1 },
      { t: "NOVN", d: 1 }, { t: "AI", d: 1 },
    ],
  },
  {
    id: 18, cat: "mkt", name: "Concentration risk unwind",
    desc: "Top 10 stocks underperform, passive flow reversal, active management renaissance.",
    hits: [
      { t: "NVDA", d: -1 }, { t: "MSFT", d: -1 }, { t: "GOOGL", d: -1 }, { t: "AMZN", d: -1 },
      { t: "NFLX", d: -1 }, { t: "AVGO", d: -1 }, { t: "TSMC", d: -1 },
    ],
  },
  {
    id: 19, cat: "mkt", name: "Quality premium expands",
    desc: "Flight to quality in uncertainty — high ROIC, low leverage names outperform. Classic QARP environment.",
    hits: [
      { t: "MSFT", d: 1 }, { t: "GOOGL", d: 1 }, { t: "NFLX", d: 1 }, { t: "NVDA", d: 1 },
      { t: "TSMC", d: 1 }, { t: "MSCI", d: 1 }, { t: "ICE", d: 1 }, { t: "AI", d: 1 },
      { t: "NOW", d: 1 },
    ],
  },
  {
    id: 20, cat: "mkt", name: "International > US rotation",
    desc: "Valuation gap narrows, European / Asian equities re-rate. Dollar weakening supports translation.",
    hits: [
      { t: "SIE", d: 1 }, { t: "NOVN", d: 1 }, { t: "AI", d: 1 }, { t: "VIE", d: 1 },
      { t: "6501", d: 1 }, { t: "9988", d: 1 }, { t: "0700", d: 1 }, { t: "AKZA", d: 1 },
      { t: "VOLV", d: 1 }, { t: "EPI", d: 1 }, { t: "005930", d: 1 }, { t: "TSMC", d: 1 },
    ],
  },
  {
    id: 21, cat: "mkt", name: "Earnings recession / margin compression",
    desc: "Input costs (oil, wages) compress margins, revenue growth slows, negative EPS revisions.",
    hits: [
      { t: "AKZA", d: -1 }, { t: "AI", d: -1 }, { t: "VOLV", d: -1 }, { t: "SIE", d: -1 },
      { t: "EPI", d: -1 }, { t: "ROK", d: -1 }, { t: "GLW", d: -1 }, { t: "PFE", d: 0 },
      { t: "TMO", d: -1 },
    ],
  },
  {
    id: 22, cat: "macro", name: "Dollar weakening trend",
    desc: "Twin deficits + de-dollarisation + rate cuts = DXY decline. EM assets and non-US equities benefit.",
    hits: [
      { t: "NOVN", d: 1 }, { t: "SIE", d: 1 }, { t: "AI", d: 1 }, { t: "VIE", d: 1 },
      { t: "6501", d: 1 }, { t: "9988", d: 1 }, { t: "0700", d: 1 }, { t: "VOLV", d: 1 },
      { t: "EPI", d: 1 }, { t: "005930", d: 1 }, { t: "TSMC", d: 1 },
    ],
  },
  {
    id: 23, cat: "macro", name: "Dollar strength / safe-haven bid",
    desc: "Geopolitical chaos drives capital to US. Dollar smile in action, crushes non-US earnings translation.",
    hits: [
      { t: "NOVN", d: -1 }, { t: "SIE", d: -1 }, { t: "AI", d: -1 }, { t: "VIE", d: -1 },
      { t: "6501", d: -1 }, { t: "9988", d: -1 }, { t: "0700", d: -1 }, { t: "VOLV", d: -1 },
      { t: "EPI", d: -1 }, { t: "005930", d: -1 }, { t: "TSMC", d: -1 },
    ],
  },
  {
    id: 24, cat: "macro", name: "China stimulus bazooka",
    desc: "Property crisis forces major fiscal response, reflation trade, commodity demand recovery.",
    hits: [
      { t: "9988", d: 1 }, { t: "0700", d: 1 }, { t: "EPI", d: 1 }, { t: "VOLV", d: 1 },
      { t: "005930", d: 1 }, { t: "AI", d: 1 }, { t: "AKZA", d: 1 },
    ],
  },
  {
    id: 25, cat: "macro", name: "China property hard landing",
    desc: "Deflationary spiral deepens, commodity demand destruction, EM contagion.",
    hits: [
      { t: "9988", d: -1 }, { t: "0700", d: -1 }, { t: "EPI", d: -1 }, { t: "VOLV", d: -1 },
      { t: "005930", d: -1 }, { t: "AKZA", d: -1 }, { t: "AI", d: -1 },
    ],
  },
  {
    id: 26, cat: "macro", name: "Manufacturing renaissance / reshoring",
    desc: "US reshoring capex + infrastructure + defense = ISM recovery, industrials and automation outperform.",
    hits: [
      { t: "SIE", d: 1 }, { t: "6501", d: 1 }, { t: "ROK", d: 1 }, { t: "VOLV", d: 1 },
      { t: "EPI", d: 1 }, { t: "GLW", d: 1 },
    ],
  },
  {
    id: 27, cat: "macro", name: "Consumer cracks emerge",
    desc: "Lower-income stress, delinquencies rise, discretionary spending weakens.",
    hits: [
      { t: "AMZN", d: -1 }, { t: "9988", d: -1 }, { t: "NFLX", d: 0 }, { t: "AKZA", d: -1 },
      { t: "VOLV", d: -1 }, { t: "GOOGL", d: -1 },
    ],
  },
  {
    id: 28, cat: "credit", name: "Private credit contagion spreads",
    desc: "BDC redemption gates, NAV markdowns cascade, bank funding lines tighten. Broader credit crunch.",
    hits: [
      { t: "JPM", d: -1 }, { t: "ICE", d: -1 }, { t: "MSCI", d: -1 }, { t: "AMZN", d: -1 },
      { t: "NOW", d: -1 },
    ],
  },
  {
    id: 29, cat: "sector", name: "Copper / critical minerals squeeze",
    desc: "AI + electrification + defense demand vs. constrained supply. Multi-year bull market.",
    hits: [
      { t: "EPI", d: 1 }, { t: "AI", d: 0 }, { t: "SIE", d: 1 }, { t: "6501", d: 1 },
      { t: "VIE", d: 1 },
    ],
  },
  {
    id: 30, cat: "sector", name: "M&A supercycle returns",
    desc: "Deregulation + cheaper financing + CEO confidence = mega-deal wave. Banks and serial acquirers benefit.",
    hits: [
      { t: "JPM", d: 1 }, { t: "ICE", d: 1 }, { t: "MSCI", d: 1 }, { t: "AVGO", d: 1 },
      { t: "TMO", d: 1 }, { t: "NOW", d: 1 },
    ],
  },
];
