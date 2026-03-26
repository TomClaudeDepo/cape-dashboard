import { useState, useEffect, useCallback } from "react";
import { Fs, Fn } from "../theme";
import { holdings } from "../data/portfolio";
import { indices as fallbackIndices, currencies as fallbackCurrencies, yields, commodities as fallbackCommodities, topHL, holdNews, YF_INDICES, YF_FX, YF_COMMODITIES } from "../data/market";
import { fetchQuotes, fetchNews, clearCache } from "../api/yahoo";
import { Card, Label, Pill, Tickers, LiveDot, RefreshTimer, Skeleton } from "../components/shared";
import IntradayChart from "../components/IntradayChart";

// Format price for display
const fmtPrice = (v, decimals = 2) => v == null ? "\u2014" : v.toLocaleString("en", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

// Merge live data with fallback
function toLiveItem(yf, fallback, prefix = "") {
  if (!yf) return fallback;
  return { name: fallback.name, val: prefix + fmtPrice(yf.price, yf.price > 100 ? 0 : yf.price > 10 ? 2 : 4), chg: yf.changePct ?? fallback.chg, symbol: yf.symbol };
}

export default function MarketsPg({ T }) {
  const [liveIndices, setLiveIndices] = useState(null);
  const [liveFx, setLiveFx] = useState(null);
  const [liveCommodities, setLiveCommodities] = useState(null);
  const [holdingQuotes, setHoldingQuotes] = useState(null);
  const [liveNews, setLiveNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(null);
  const [expandedChart, setExpandedChart] = useState(null);
  const [expandedNews, setExpandedNews] = useState(null);
  const [newsAnalysis, setNewsAnalysis] = useState({});
  const [analyzingNews, setAnalyzingNews] = useState(null);
  const [isLive, setIsLive] = useState(false);

  const refresh = useCallback(async () => {
    clearCache();
    setLoading(true);
    const allSymbols = [...YF_INDICES.map(i => i.symbol), ...YF_FX.map(f => f.symbol), ...YF_COMMODITIES.map(c => c.symbol)];
    const holdSymbols = holdings.slice(0, 26).map(h => h.t);

    const [quotesData, holdData, newsData] = await Promise.all([
      fetchQuotes(allSymbols),
      fetchQuotes(holdSymbols),
      fetchNews("stock market today", 10),
    ]);

    if (quotesData) {
      setIsLive(true);
      const bySymbol = Object.fromEntries(quotesData.map(q => [q.symbol, q]));
      setLiveIndices(YF_INDICES.map((idx, i) => toLiveItem(bySymbol[idx.symbol], fallbackIndices[i])));
      setLiveFx(YF_FX.map((fx, i) => toLiveItem(bySymbol[fx.symbol], fallbackCurrencies[i])));
      setLiveCommodities(YF_COMMODITIES.map((c, i) => toLiveItem(bySymbol[c.symbol], fallbackCommodities[i], c.prefix)));
    } else {
      setIsLive(false);
    }

    if (holdData) {
      const bySymbol = Object.fromEntries(holdData.map(q => [q.symbol, q]));
      setHoldingQuotes(bySymbol);
    }

    setLiveNews(newsData);
    setLastRefresh(new Date());
    setLoading(false);
  }, []);

  useEffect(() => { refresh() }, [refresh]);

  // Merge holding quotes with portfolio data for movers
  const holdingMovers = holdings.map(h => {
    const q = holdingQuotes?.[h.t];
    return { name: h.name, ticker: h.t, wt: h.wt, chg: q?.changePct ?? 0, price: q?.price, live: !!q };
  }).sort((a, b) => b.chg - a.chg);

  const topMovers = holdingMovers.slice(0, 5);
  const bottomMovers = holdingMovers.slice(-5).reverse();

  // Analyse a headline's relevance to the fund
  const analyzeHeadline = (title, idx) => {
    if (expandedNews === idx) { setExpandedNews(null); return }
    setExpandedNews(idx);
    if (newsAnalysis[idx]) return; // already cached

    setAnalyzingNews(idx);
    // Keyword-based fund relevance engine (instant, no API needed)
    const lower = title.toLowerCase();
    const relevant = [];
    const holdingKeywords = {
      "NVIDIA": ["nvidia", "nvda", "gpu", "ai chip", "gtc", "jensen"],
      "TAIWAN SEMI": ["tsmc", "taiwan semi", "cowos", "foundry", "chip"],
      "SAMSUNG": ["samsung", "hbm", "memory", "dram"],
      "MICROSOFT": ["microsoft", "msft", "azure", "copilot", "openai"],
      "AMAZON": ["amazon", "amzn", "aws", "e-commerce"],
      "ALPHABET": ["google", "alphabet", "googl", "search", "youtube"],
      "NETFLIX": ["netflix", "nflx", "streaming"],
      "JP MORGAN": ["jpmorgan", "jp morgan", "jpm", "dimon", "bank"],
      "NOVARTIS": ["novartis", "pharma", "drug approval", "fda"],
      "PFIZER": ["pfizer", "pfe", "vaccine", "pharmaceutical"],
      "ALIBABA": ["alibaba", "baba", "china tech", "ant group"],
      "TENCENT": ["tencent", "wechat", "gaming"],
      "BROADCOM": ["broadcom", "avgo", "vmware"],
      "SERVICENOW": ["servicenow", "now", "saas"],
      "AIR LIQUIDE": ["air liquide", "industrial gas"],
      "HITACHI": ["hitachi", "japan industrial"],
      "VOLVO": ["volvo", "truck", "heavy vehicle"],
      "EPIROC": ["epiroc", "mining equipment"],
    };
    for (const [name, keywords] of Object.entries(holdingKeywords)) {
      if (keywords.some(k => lower.includes(k))) {
        const h = holdings.find(x => x.name === name);
        if (h) relevant.push({ name, wt: h.wt, ticker: h.t });
      }
    }
    // Sector/macro keywords
    const themes = [];
    if (lower.match(/fed|rate|inflation|cpi|pce|hawkish|dovish|cut/)) themes.push({ tag: "Rates/Fed", impact: "Affects duration-sensitive positions. Higher rates favour Financials (13.7% wt), pressure growth multiples (IT 26.6% wt)." });
    if (lower.match(/oil|brent|opec|crude|energy/)) themes.push({ tag: "Oil/Energy", impact: "Fund has no direct energy exposure. Rising oil pressures industrial margins (Volvo, Epiroc: 7.8% wt) but benefits from USD strength (65% exposure)." });
    if (lower.match(/china|beijing|tariff|trade war|xi/)) themes.push({ tag: "China/Trade", impact: "Alibaba + Tencent = 8.1% wt. Samsung exposed via South Korea. Direct trade risk for Hitachi (Japan) and Epiroc (Sweden export)." });
    if (lower.match(/tech|semiconductor|ai |artificial intelligence|chip/)) themes.push({ tag: "Tech/AI", impact: "IT is largest sector at 26.6% wt. NVIDIA, TSMC, Samsung, Broadcom, ServiceNow directly exposed. Tech sentiment critical for fund alpha." });
    if (lower.match(/recession|gdp|slowdown|employment|jobs|layoff/)) themes.push({ tag: "Growth/Recession", impact: "Cyclical tilt (Industrials 15.3%, Cons Disc 8.2%) vulnerable. Healthcare (14.1%) and Utilities (2.5%) provide defensiveness." });
    if (lower.match(/eur|dollar|forex|currency|fx |usd/)) themes.push({ tag: "FX", impact: "65% USD exposure. EUR weakness benefits NAV. SEK (7.8%), HKD (8.1%), JPY (4.6%) are secondary FX risks." });

    const analysis = {
      relevant,
      themes,
      summary: relevant.length > 0
        ? `Directly relevant to ${relevant.map(r => r.name).join(", ")} (${relevant.reduce((s, r) => s + r.wt, 0).toFixed(1)}% combined weight).`
        : themes.length > 0
          ? `No direct holding match, but thematically relevant via ${themes.map(t => t.tag).join(", ")}.`
          : "Low direct relevance to current portfolio positions. Monitor for second-order effects.",
    };

    setTimeout(() => { // Small delay for UX feel
      setNewsAnalysis(prev => ({ ...prev, [idx]: analysis }));
      setAnalyzingNews(null);
    }, 300);
  };

  const displayIndices = liveIndices || fallbackIndices.map(i => ({ ...i, symbol: null }));
  const displayFx = liveFx || fallbackCurrencies.map(f => ({ ...f, symbol: null }));
  const displayCommodities = liveCommodities || fallbackCommodities.map(c => ({ ...c, symbol: null }));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 10 }}>
        <div>
          <h1 style={{ fontFamily: Fs, fontSize: 28, fontWeight: 300, color: T.text, margin: 0 }}>Markets</h1>
          <p style={{ fontSize: 12, color: T.textTer, marginTop: 6, fontFamily: Fn }}>
            {lastRefresh ? `Last updated ${lastRefresh.toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}` : "Loading..."}
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <LiveDot active={isLive} T={T} />
            <Pill T={T} color={isLive ? T.green : T.capRed} bg={isLive ? T.greenBg : T.redBg}>{isLive ? "Live" : "Offline"}</Pill>
          </div>
          <RefreshTimer seconds={60} onRefresh={refresh} T={T} />
        </div>
      </div>

      {/* Morning Brief — Comprehensive */}
      <Card T={T} style={{ marginBottom: 20, boxShadow: `inset 4px 0 0 ${T.capRed}, ${T.shadow}` }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          <Pill T={T} color={T.capRed} bg={T.redBg}>MORNING BRIEF</Pill>
          <Pill T={T}>23 Mar 2026</Pill>
          <Pill T={T} color={T.purple} bg={T.purple100}>For Cape Equity Fund</Pill>
        </div>
        <div style={{ fontFamily: Fn, fontSize: 18, fontWeight: 500, color: T.text, lineHeight: 1.5, marginBottom: 14 }}>Middle East escalation drives risk-off; S&amp;P breaks 200-day MA — fund positioned defensively</div>

        <div style={{ fontSize: 13, color: T.textSec, lineHeight: 1.8, fontFamily: Fn }}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 600, color: T.text, marginBottom: 4, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>Macro &amp; Geopolitics</div>
            S&amp;P 500 fell -1.51% to 6,506, decisively breaking its 200-day moving average for the first time since Oct 2023. Nasdaq -2.01% nearing correction territory. The sell-off was triggered by an escalation in the Iran-Israel conflict, with the Pentagon reportedly preparing ground deployment options. Brent surged +3.3% to $112, the highest since 2022. Gold pulled back -1.8% to $4,502 on profit-taking despite risk-off sentiment. Fed held rates at the March meeting with hawkish guidance — cuts unlikely near-term as oil-driven inflation risks re-emerge.
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 600, color: T.text, marginBottom: 4, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>Direct Fund Impact</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ background: T.redBg, borderRadius: T.radiusSm, padding: "10px 12px" }}>
                <div style={{ fontWeight: 600, color: T.capRed, fontSize: 11 }}>Headwinds</div>
                <ul style={{ margin: "6px 0 0", paddingLeft: 16, fontSize: 12, color: T.textSec, lineHeight: 1.7 }}>
                  <li><strong>NVIDIA, TSMC, Samsung</strong> (14.7% wt) — Tech selloff pressure, though GTC catalysts provide near-term support for NVDA</li>
                  <li><strong>Volvo, Epiroc</strong> (7.8% wt) — Industrials exposed to oil-driven margin compression</li>
                  <li><strong>USD strength</strong> — 65% USD exposure benefits EUR-denominated NAV, but hurts SEK/JPY positions (-0.77% FX drag)</li>
                </ul>
              </div>
              <div style={{ background: T.greenBg, borderRadius: T.radiusSm, padding: "10px 12px" }}>
                <div style={{ fontWeight: 600, color: T.green, fontSize: 11 }}>Tailwinds</div>
                <ul style={{ margin: "6px 0 0", paddingLeft: 16, fontSize: 12, color: T.textSec, lineHeight: 1.7 }}>
                  <li><strong>JP Morgan, ICE, MSCI</strong> (13.7% wt) — Financials benefit from higher-for-longer rates + volatility</li>
                  <li><strong>Novartis, Pfizer</strong> (9.4% wt) — Healthcare defensive positioning in risk-off</li>
                  <li><strong>Alibaba, Tencent</strong> (8.1% wt) — China decoupled from ME risk, Hang Seng only -0.36%</li>
                </ul>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 600, color: T.text, marginBottom: 4, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>Key Events This Week</div>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "4px 12px", fontSize: 12 }}>
              <Pill T={T}>Mon 24</Pill><span>Flash PMIs (EU, US) — watch for industrial slowdown signals</span>
              <Pill T={T}>Tue 25</Pill><span><strong>Novartis ex-div</strong> CHF 3.50/sh — 4.59% wt position</span>
              <Pill T={T}>Wed 26</Pill><span>US Consumer Confidence — gauge of spending outlook (Amazon, Alibaba)</span>
              <Pill T={T}>Thu 27</Pill><span>US GDP revision Q4 — watch for stagflation narrative</span>
              <Pill T={T}>Fri 28</Pill><span>PCE inflation — the Fed's preferred gauge; critical for rate path</span>
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 600, color: T.text, marginBottom: 4, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>Action Items</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                { icon: "🔴", text: "Review Volvo (-8.66% unrealised) — oil/industrial margin thesis under pressure. Consider trimming if Brent sustains >$110." },
                { icon: "🟡", text: "Monitor NVIDIA post-GTC — $1T revenue target is bullish but tech tape is weak. Position at 4.89% is near max." },
                { icon: "🟢", text: "Alibaba + Tencent (8.1% wt) outperforming in risk-off. China stimulus catalyst intact — consider adding on weakness." },
                { icon: "🟢", text: "Cash at 2.4% (€10.3M) — low but adequate. No immediate need to raise unless drawdown accelerates beyond -5% from peak." },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 12, lineHeight: 1.6 }}>
                  <span style={{ flexShrink: 0, fontSize: 10, marginTop: 2 }}>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Live News — click to expand with fund impact */}
      <Card T={T} style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <Label T={T} style={{ marginBottom: 0 }}>{liveNews ? "Live Headlines" : "Headlines"}</Label>
          <span style={{ fontSize: 10, color: T.textTer, fontFamily: Fn, fontStyle: "italic" }}>Click any headline for fund impact</span>
        </div>
        {loading && !liveNews ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[0,1,2,3].map(i => <Skeleton key={i} height={18} T={T} />)}
          </div>
        ) : (liveNews || topHL).map((h, i) => {
          const isLiveItem = !!h.title && !!h.publisher;
          const title = h.title;
          const time = isLiveItem && h.providerPublishTime
            ? h.providerPublishTime.toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" })
            : h.time || "";
          const isExpanded = expandedNews === i;
          const analysis = newsAnalysis[i];
          const isAnalyzing = analyzingNews === i;

          return (
            <div key={i}>
              <div
                onClick={() => analyzeHeadline(title, i)}
                style={{
                  display: "flex", gap: 10, padding: "10px 8px", borderRadius: T.radiusSm, fontSize: 12, fontFamily: Fn,
                  alignItems: "center", transition: "background 0.15s", cursor: "pointer",
                  background: isExpanded ? T.pillBg : "transparent",
                }}
                onMouseEnter={e => { if (!isExpanded) e.currentTarget.style.background = T.rowHover }}
                onMouseLeave={e => { if (!isExpanded) e.currentTarget.style.background = "transparent" }}
              >
                <span style={{ color: T.textTer, minWidth: 42, fontSize: 10 }}>{time}</span>
                <span style={{ flex: 1, color: T.text, fontWeight: isExpanded ? 500 : 400 }}>{title}</span>
                {isLiveItem ? (
                  <span style={{ fontSize: 9, color: T.textTer, flexShrink: 0 }}>{h.publisher}</span>
                ) : (
                  <Pill T={T}>{h.tag}</Pill>
                )}
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke={T.textTer} strokeWidth="1.5" strokeLinecap="round" style={{ flexShrink: 0, transition: "transform 0.2s", transform: isExpanded ? "rotate(180deg)" : "rotate(0)" }}>
                  <polyline points="4,6 8,10 12,6" />
                </svg>
              </div>

              {/* Expanded analysis panel */}
              {isExpanded && (
                <div style={{ padding: "12px 12px 12px 54px", animation: "fadeIn 0.2s ease" }}>
                  {isAnalyzing ? (
                    <div style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 11, color: T.textTer, fontFamily: Fn }}>
                      {[0,1,2].map(j => <div key={j} style={{ width: 5, height: 5, borderRadius: "50%", background: T.purple, animation: "pulse 1.2s ease " + j * 0.2 + "s infinite" }} />)}
                      <span style={{ marginLeft: 4 }}>Analysing relevance...</span>
                    </div>
                  ) : analysis ? (
                    <div style={{ background: T.bg, borderRadius: T.radiusSm, padding: "14px 16px", border: "1px solid " + T.border }}>
                      {/* Summary */}
                      <div style={{ fontSize: 12, color: T.text, fontFamily: Fn, fontWeight: 500, marginBottom: 10, lineHeight: 1.6 }}>
                        {analysis.summary}
                      </div>

                      {/* Relevant holdings */}
                      {analysis.relevant.length > 0 && (
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
                          {analysis.relevant.map((r, j) => (
                            <Pill key={j} T={T} color={T.capRed} bg={T.redBg}>{r.name} ({r.wt.toFixed(1)}%)</Pill>
                          ))}
                        </div>
                      )}

                      {/* Theme impacts */}
                      {analysis.themes.map((theme, j) => (
                        <div key={j} style={{ fontSize: 11, color: T.textSec, fontFamily: Fn, lineHeight: 1.7, marginBottom: j < analysis.themes.length - 1 ? 8 : 0 }}>
                          <Pill T={T} color={T.purple} bg={T.purple100}>{theme.tag}</Pill>
                          <span style={{ marginLeft: 8 }}>{theme.impact}</span>
                        </div>
                      ))}

                      {/* Link to source */}
                      {isLiveItem && h.link && (
                        <div style={{ marginTop: 10, paddingTop: 8, borderTop: "1px solid " + T.border }}>
                          <a href={h.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: T.purple, fontFamily: Fn, textDecoration: "none" }}
                            onClick={e => e.stopPropagation()}>
                            Read full article at {h.publisher} &rarr;
                          </a>
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          );
        })}
      </Card>

      {/* Indices with click-to-expand chart */}
      <Card T={T} style={{ marginBottom: 12 }}>
        <Label T={T}>Indices {isLive && <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>&middot; click for intraday</span>}</Label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(" + Math.min(displayIndices.length, 4) + ",1fr)", gap: 10 }}>
          {displayIndices.map((it, i) => {
            const sym = YF_INDICES[i]?.symbol;
            const isExpanded = expandedChart === sym;
            return (
              <div key={i} onClick={() => sym && setExpandedChart(isExpanded ? null : sym)} style={{ padding: "12px 14px", background: isExpanded ? (T.greenBg) : T.pillBg, borderRadius: T.radiusSm, cursor: sym ? "pointer" : "default", transition: "all 0.2s", border: isExpanded ? "1px solid " + T.green + "33" : "1px solid transparent" }}>
                <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn }}>{it.name}</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: T.text, fontFamily: Fn, marginTop: 3, fontFeatureSettings: '"tnum"' }}>{it.val}</div>
                <div style={{ marginTop: 4 }}>
                  <Pill T={T} color={it.chg >= 0 ? T.green : T.capRed} bg={it.chg >= 0 ? T.greenBg : T.redBg}>{it.chg >= 0 ? "+" : ""}{it.chg.toFixed(2)}% 1d</Pill>
                </div>
              </div>
            );
          })}
        </div>
        {expandedChart && (
          <div style={{ marginTop: 12, animation: "fadeIn 0.2s ease" }}>
            <IntradayChart symbol={expandedChart} name={YF_INDICES.find(i => i.symbol === expandedChart)?.name} T={T} />
          </div>
        )}
      </Card>

      {/* FX & Yields + Commodities */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 12, marginBottom: 12 }}>
        <Card T={T} style={{ marginBottom: 0 }}>
          <Label T={T}>FX</Label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }}>
            {displayFx.map((it, i) => (
              <div key={i} style={{ padding: "12px 14px", background: T.pillBg, borderRadius: T.radiusSm }}>
                <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn }}>{it.name}</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: T.text, fontFamily: Fn, marginTop: 3, fontFeatureSettings: '"tnum"' }}>{it.val}</div>
                <div style={{ marginTop: 4 }}><Pill T={T} color={it.chg >= 0 ? T.green : T.capRed} bg={it.chg >= 0 ? T.greenBg : T.redBg}>{it.chg >= 0 ? "+" : ""}{it.chg.toFixed(2)}%</Pill></div>
              </div>
            ))}
          </div>
        </Card>
        <Card T={T} style={{ marginBottom: 0 }}>
          <Label T={T}>Yields</Label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }}>
            {yields.map((it, i) => (
              <div key={i} style={{ padding: "12px 14px", background: T.pillBg, borderRadius: T.radiusSm }}>
                <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn }}>{it.name}</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: T.text, fontFamily: Fn, marginTop: 3, fontFeatureSettings: '"tnum"' }}>{it.val}</div>
                <div style={{ marginTop: 4 }}><Pill T={T} color={it.chg >= 0 ? T.green : T.capRed} bg={it.chg >= 0 ? T.greenBg : T.redBg}>{it.chg >= 0 ? "+" : ""}{it.chg}bp 1d</Pill></div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Commodities */}
      <Card T={T} style={{ marginBottom: 20 }}>
        <Label T={T}>Commodities (USD)</Label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
          {displayCommodities.map((it, i) => {
            const sym = YF_COMMODITIES[i]?.symbol;
            const isExpanded = expandedChart === sym;
            return (
              <div key={i} onClick={() => sym && setExpandedChart(isExpanded ? null : sym)} style={{ padding: "12px 14px", background: isExpanded ? T.greenBg : T.pillBg, borderRadius: T.radiusSm, cursor: sym ? "pointer" : "default", transition: "all 0.2s", border: isExpanded ? "1px solid " + T.green + "33" : "1px solid transparent" }}>
                <div style={{ fontSize: 10, color: T.textTer, fontFamily: Fn }}>{it.name}</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: T.text, fontFamily: Fn, marginTop: 3, fontFeatureSettings: '"tnum"' }}>{it.val}</div>
                <div style={{ marginTop: 4 }}><Pill T={T} color={it.chg >= 0 ? T.green : T.capRed} bg={it.chg >= 0 ? T.greenBg : T.redBg}>{it.chg >= 0 ? "+" : ""}{it.chg.toFixed(2)}%</Pill></div>
              </div>
            );
          })}
        </div>
        {expandedChart && YF_COMMODITIES.find(c => c.symbol === expandedChart) && (
          <div style={{ marginTop: 12, animation: "fadeIn 0.2s ease" }}>
            <IntradayChart symbol={expandedChart} T={T} />
          </div>
        )}
      </Card>

      {/* Portfolio Movers */}
      {holdingQuotes && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20, animation: "fadeIn 0.3s ease" }}>
          <Card T={T}>
            <Label T={T}>Portfolio Gainers Today</Label>
            {topMovers.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", borderRadius: T.radiusSm, fontSize: 12, fontFamily: Fn, transition: "background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = T.rowHover} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <div>
                  <span style={{ color: T.text, fontWeight: 500 }}>{m.name}</span>
                  <span style={{ color: T.textTer, fontSize: 10, marginLeft: 6 }}>{m.wt.toFixed(1)}%</span>
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  {m.price && <span style={{ fontSize: 11, color: T.textTer, fontFeatureSettings: '"tnum"', fontFamily: Fn }}>{fmtPrice(m.price)}</span>}
                  <Pill T={T} color={T.green} bg={T.greenBg}>{m.chg >= 0 ? "+" : ""}{m.chg.toFixed(2)}%</Pill>
                </div>
              </div>
            ))}
          </Card>
          <Card T={T}>
            <Label T={T}>Portfolio Losers Today</Label>
            {bottomMovers.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", borderRadius: T.radiusSm, fontSize: 12, fontFamily: Fn, transition: "background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = T.rowHover} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <div>
                  <span style={{ color: T.text, fontWeight: 500 }}>{m.name}</span>
                  <span style={{ color: T.textTer, fontSize: 10, marginLeft: 6 }}>{m.wt.toFixed(1)}%</span>
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  {m.price && <span style={{ fontSize: 11, color: T.textTer, fontFeatureSettings: '"tnum"', fontFamily: Fn }}>{fmtPrice(m.price)}</span>}
                  <Pill T={T} color={T.capRed} bg={T.redBg}>{m.chg >= 0 ? "+" : ""}{m.chg.toFixed(2)}%</Pill>
                </div>
              </div>
            ))}
          </Card>
        </div>
      )}

      {/* Holdings Heat Map */}
      <Card T={T} style={{ marginBottom: 20 }}>
        <Label T={T}>Portfolio Heat Map {holdingQuotes ? "\u2014 Today's Move" : "\u2014 Unrealised P&L"}</Label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: 4 }}>
          {holdings.map((h, i) => {
            const q = holdingQuotes?.[h.t];
            const chg = q?.changePct ?? h.up * 0.01; // fall back to unrealized % as proxy
            const intensity = Math.min(Math.abs(chg) / 5, 1); // Normalize: 5% = full saturation
            const isPos = chg >= 0;
            const bg = isPos
              ? `rgba(${parseInt(T.green.slice(1, 3), 16) || 4},${parseInt(T.green.slice(3, 5), 16) || 120},${parseInt(T.green.slice(5, 7), 16) || 87},${0.1 + intensity * 0.5})`
              : `rgba(${parseInt(T.capRed.slice(1, 3), 16) || 155},${parseInt(T.capRed.slice(3, 5), 16) || 27},${parseInt(T.capRed.slice(5, 7), 16) || 27},${0.1 + intensity * 0.5})`;
            const [hov, setHov] = useState(false);
            return (
              <div key={i} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
                background: bg, borderRadius: T.radiusSm, padding: "10px 8px", textAlign: "center",
                transition: "transform 0.15s, box-shadow 0.15s", cursor: "default",
                transform: hov ? "scale(1.05)" : "scale(1)",
                boxShadow: hov ? T.shadowLg : "none",
                position: "relative",
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: T.text, fontFamily: Fn, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{h.name}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: isPos ? T.green : T.capRed, fontFamily: Fn, marginTop: 2, fontFeatureSettings: '"tnum"' }}>
                  {isPos ? "+" : ""}{(chg * (holdingQuotes ? 1 : 100)).toFixed(2)}%
                </div>
                {hov && (
                  <div style={{
                    position: "absolute", bottom: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)",
                    background: T.card, boxShadow: T.shadowLg, borderRadius: 8, padding: "8px 12px",
                    fontSize: 10, fontFamily: Fn, whiteSpace: "nowrap", zIndex: 10, animation: "fadeIn 0.1s ease",
                    border: "1px solid " + T.border,
                  }}>
                    <div style={{ fontWeight: 600, color: T.text }}>{h.name}</div>
                    <div style={{ color: T.textTer, marginTop: 2 }}>{h.t} &middot; {h.wt.toFixed(1)}% wt</div>
                    {q && <div style={{ color: T.textSec, marginTop: 2 }}>Price: {fmtPrice(q.price)}</div>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Portfolio Company News */}
      <Card T={T}>
        <Label T={T}>Portfolio company news &mdash; 7 days</Label>
        {holdNews.map((h, i) => (
          <div key={i} style={{ display: "flex", gap: 10, padding: "10px 8px", borderRadius: T.radiusSm, fontSize: 12, fontFamily: Fn, alignItems: "flex-start", transition: "background 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = T.rowHover} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            <div style={{ minWidth: 72 }}>
              <span style={{ fontWeight: 700, color: T.text }}>{h.co}</span><br />
              <span style={{ fontSize: 10, color: T.textTer }}>{h.dt}</span>
            </div>
            <span style={{ flex: 1, color: T.textSec }}>{h.title}</span>
            <Pill T={T} color={h.imp ? T.green : T.textTer} bg={h.imp ? T.greenBg : T.pillBg}>{h.imp ? "Positive" : "Neutral"}</Pill>
          </div>
        ))}
      </Card>
    </div>
  );
}
