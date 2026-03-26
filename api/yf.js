export const config = { runtime: 'edge' };

export default async function handler(req) {
  const url = new URL(req.url);
  // Strip /api/yf prefix, forward the rest to Yahoo Finance
  const path = url.pathname.replace(/^\/api\/yf/, '') + url.search;
  const yfUrl = 'https://query1.finance.yahoo.com' + path;

  try {
    const res = await fetch(yfUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });
    const body = await res.text();
    return new Response(body, {
      status: res.status,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
