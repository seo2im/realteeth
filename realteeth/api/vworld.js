export const config = {
  runtime: 'nodejs',
  regions: ['icn1'],
};

export default async function handler(req, res) {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const url = new URL(req.url, `https://${req.headers.host}`);
    const targetUrl = `https://api.vworld.kr/req/address${url.search}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Host: 'api.vworld.kr',
        'User-Agent': 'Mozilla/5.0 (compatible; Vercel Serverless)',
        Connection: 'close',
      },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const text = await response.text();
    try {
      return res.status(response.status).json(JSON.parse(text));
    } catch (_) {
      return res.status(500).json({ error: 'Failed to parse response', responseText: text });
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      return res
        .status(504)
        .json({ error: 'Gateway Timeout', message: 'Vworld API request timed out' });
    }
    return res
      .status(500)
      .json({ error: 'Failed to fetch from Vworld API', message: error.message });
  }
}
