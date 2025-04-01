export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { url } = req.body;

  try {
    const response = await fetch('https://me-qr.com/api/qr', {
      method: 'POST',
      headers: {
        Authorization: `Bearer 4230495c8a668fe740c987ee91c92046a883be139efed8ca38aefaaeed685557`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: url,
        title: 'Generated via Form',
        design: {
          type: 'standard',
          color: '#000000'
        }
      })
    });

    const text = await response.text();

    try {
      const data = JSON.parse(text);

      if (response.ok) {
        return res.status(200).json({
          short_url: data.short_url,
          qr_url: data.qr_png
        });
      } else {
        return res.status(response.status).json({ error: data.message || 'QR API error' });
      }
    } catch (parseError) {
      return res.status(500).json({ error: `QR API returned invalid JSON: ${text}` });
    }
  } catch (err) {
    return res.status(500).json({ error: `Unexpected server error: ${err.message}` });
  }
}
