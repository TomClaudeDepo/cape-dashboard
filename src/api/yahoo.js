// Yahoo Finance API client with 60s cache layer
// In dev: Vite proxy at /yf. In production: Vercel Edge Function at /api/yf.
const YF_PREFIX = import.meta.env.DEV ? '/yf' : '/api/yf';
const cache = new Map();
const CACHE_TTL = 60_000;

function cached(key, fetcher) {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.ts < CACHE_TTL) return Promise.resolve(entry.data);
  return fetcher().then(data => {
    if (data) cache.set(key, { data, ts: Date.now() });
    return data;
  });
}

export async function fetchQuotes(symbols) {
  const key = "quotes:" + symbols.join(",");
  return cached(key, async () => {
    try {
      const res = await fetch(`${YF_PREFIX}/v7/finance/quote?symbols=${symbols.join(",")}`);
      if (!res.ok) return null;
      const json = await res.json();
      const results = json?.quoteResponse?.result;
      if (!results) return null;
      return results.map(q => ({
        symbol: q.symbol,
        name: q.shortName || q.longName || q.symbol,
        price: q.regularMarketPrice,
        change: q.regularMarketChange,
        changePct: q.regularMarketChangePercent,
        prevClose: q.regularMarketPreviousClose,
        marketState: q.marketState, // PRE, REGULAR, POST, CLOSED
        currency: q.currency,
        volume: q.regularMarketVolume,
      }));
    } catch (e) {
      console.warn("Yahoo quotes error:", e.message);
      return null;
    }
  });
}

export async function fetchChart(symbol, range = "1d", interval = "5m") {
  const key = `chart:${symbol}:${range}:${interval}`;
  return cached(key, async () => {
    try {
      const res = await fetch(`${YF_PREFIX}/v8/finance/chart/${encodeURIComponent(symbol)}?range=${range}&interval=${interval}`);
      if (!res.ok) return null;
      const json = await res.json();
      const result = json?.chart?.result?.[0];
      if (!result) return null;
      const timestamps = result.timestamp || [];
      const closes = result.indicators?.quote?.[0]?.close || [];
      return timestamps.map((t, i) => ({
        time: t * 1000,
        close: closes[i],
      })).filter(p => p.close != null);
    } catch (e) {
      console.warn("Yahoo chart error:", e.message);
      return null;
    }
  });
}

export async function fetchNews(query, count = 8) {
  const key = `news:${query}:${count}`;
  return cached(key, async () => {
    try {
      const res = await fetch(`${YF_PREFIX}/v1/finance/search?q=${encodeURIComponent(query)}&newsCount=${count}&quotesCount=0`);
      if (!res.ok) return null;
      const json = await res.json();
      return (json?.news || []).map(n => ({
        title: n.title,
        publisher: n.publisher,
        link: n.link,
        providerPublishTime: n.providerPublishTime ? new Date(n.providerPublishTime * 1000) : null,
        thumbnail: n.thumbnail?.resolutions?.[0]?.url,
      }));
    } catch (e) {
      console.warn("Yahoo news error:", e.message);
      return null;
    }
  });
}

// Clear cache (for manual refresh)
export function clearCache() {
  cache.clear();
}
